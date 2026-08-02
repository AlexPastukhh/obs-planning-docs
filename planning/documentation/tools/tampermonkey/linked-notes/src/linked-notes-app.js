(function (root, factory) {
  const api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function (root) {
  'use strict';

  const SETTINGS_KEY = 'obsLinkedNotesPrototype:v1:settings';
  const TOKEN_KEY = 'obsLinkedNotesPrototype:v1:githubToken';
  const DISPOSE_KEY = '__obsLinkedNotesPrototypeDisposeV1';

  async function gmGet(key, fallback) {
    if (typeof GM_getValue !== 'function') return fallback;
    return Promise.resolve(GM_getValue(key, fallback));
  }

  async function gmSet(key, value) {
    if (typeof GM_setValue !== 'function') throw new Error('GM_setValue is not available.');
    await Promise.resolve(GM_setValue(key, value));
  }

  function cleanBasePath(value) {
    const api = root.ObsLinkedNotes || {};
    if (typeof api.cleanWorkspaceBasePath === 'function') return api.cleanWorkspaceBasePath(value);
    const text = String(value == null ? '' : value).replace(/\\/g, '/').trim() || 'prototype-fixtures/linked-notes';
    if (/^[a-zA-Z]:\//.test(text) || text.startsWith('/') || text.startsWith('//') || /^file:\/\//i.test(text)) throw new TypeError('GitHub base path must be repository-relative.');
    if (text.includes('://')) throw new TypeError('GitHub base path must not be a URL.');
    if (/[?#]/.test(text)) throw new TypeError('GitHub base path must not contain query or fragment syntax.');
    const parts = text.split('/');
    if (parts.some((segment) => !segment || segment === '.' || segment === '..')) throw new TypeError('GitHub base path contains an empty, . or .. segment.');
    return parts.join('/');
  }

  function fileNameFromPath(path) {
    const clean = String(path || '').replace(/\\/g, '/').replace(/\/+$/g, '');
    const name = clean.slice(clean.lastIndexOf('/') + 1);
    if (!name || name === '.' || name === '..' || /[/?#\\]/.test(name)) return '';
    return name;
  }

  function encodeGitHubPath(path) {
    return String(path || '').split('/').map(encodeURIComponent).join('/');
  }

  function configuredTargetForNote(note, settings, fileSlug) {
    if (!settings || !settings.owner || !settings.repo) throw new Error('Select or create a GitHub workspace first.');
    const remotePath = note && note.remote ? String(note.remote.path || '') : '';
    const fileName = fileNameFromPath(remotePath) || fileSlug(note.title, note.id);
    return {
      owner: String(settings.owner || '').trim(),
      repo: String(settings.repo || '').trim(),
      branch: String(settings.branch || 'main').trim() || 'main',
      path: `${cleanBasePath(settings.basePath)}/${fileName}`
    };
  }

  function remoteTargetLabel(remote) {
    if (!remote || !remote.owner || !remote.repo || !remote.branch || !remote.path) return '';
    return `${remote.owner}/${remote.repo}@${remote.branch}:${remote.path}`;
  }

  class LinkedNotesApp {
    constructor(options = {}) {
      const api = options.api || root.ObsLinkedNotes || {};
      this.api = api;
      this.getValue = options.getValue || gmGet;
      this.setValue = options.setValue || gmSet;
      this.clientFactory = options.clientFactory || null;
      this.confirmAction = options.confirmAction || ((message) => (typeof window !== 'undefined' && typeof window.confirm === 'function' ? window.confirm(message) : false));
      this.locationProvider = options.locationProvider || (() => (typeof location !== 'undefined' ? location : { pathname: '' }));
      this.setIntervalFn = options.setIntervalFn || ((fn, ms) => setInterval(fn, ms));
      this.clearIntervalFn = options.clearIntervalFn || ((id) => clearInterval(id));
      this.routePollMs = options.routePollMs || 750;
      this.store = options.store || new api.IndexedDbNoteStore();
      this.workspaceStore = options.workspaceStore || (api.WorkspaceStore ? new api.WorkspaceStore({ api, getValue: this.getValue, setValue: this.setValue }) : null);
      this.ui = options.ui || new api.LinkedNotesUI({
        onNew: () => this.newNote(),
        onSelect: (id) => this.selectNote(id),
        onSearch: (query) => this.refreshList(query),
        onDraftChange: (note) => this.saveDraft(note),
        onOpen: () => this.openPanel(),
        onRefreshRemote: () => this.refreshRemoteWorkspace(),
        onSelectWorkspace: (id, draftState) => this.selectWorkspace(id, draftState),
        onNewWorkspace: (draftState) => this.beginNewWorkspace(draftState),
        onSaveWorkspace: (workspace) => this.saveWorkspace(workspace),
        onDeleteWorkspace: (id) => this.deleteWorkspace(id),
        onSetDefaultWorkspace: (id) => this.setDefaultWorkspace(id),
        onSaveToken: (token) => this.saveSharedToken(token),
        onClearToken: () => this.clearSharedToken(),
        onSaveLocal: (note) => this.saveLocal(note),
        onSaveRemote: (note) => this.saveRemote(note),
        onCopyRemote: (note) => this.copyRemote(note),
        onRecheckRemote: (note) => this.recheckRemote(note),
        onLoadRemote: (note) => this.loadRemote(note),
        onOverwriteRemote: (note) => this.overwriteRemote(note),
        onDelete: (id) => this.deleteNote(id),
        onAddLink: (note, input) => this.addLink(note, input),
        onRemoveLink: (note, linkId) => this.removeLink(note, linkId),
        onResolveLink: (note, linkId) => this.resolveLink(note, linkId),
        onOpenLink: (linkId) => this.openLink(linkId)
      });
      this.current = null;
      this.search = '';
      this.remoteOperation = null;
      this.workspaceState = { workspaces: [], chatWorkspaceMap: {}, defaultWorkspaceId: '', hasToken: false };
      this.activeWorkspaceId = '';
      this.currentChatKey = '';
      this.sessionWorkspaceId = '';
      this.sessionWorkspaceExplicit = false;
      this.routeTimer = null;
      if (options.settings && options.settings.owner && options.settings.repo) {
        const workspace = api.normalizeWorkspace
          ? api.normalizeWorkspace({ id: 'workspace-test', name: 'Test workspace', ...options.settings })
          : { id: 'workspace-test', name: 'Test workspace', ...options.settings };
        this.workspaceState = { workspaces: [workspace], chatWorkspaceMap: {}, defaultWorkspaceId: workspace.id, hasToken: Boolean(options.settings.hasToken) };
        this.activeWorkspaceId = workspace.id;
      }
    }

    _activeWorkspace() {
      return this.workspaceState.workspaces.find((workspace) => workspace.id === this.activeWorkspaceId) || null;
    }

    _configuredTarget(note) {
      return configuredTargetForNote(note, this._activeWorkspace(), this.api.fileSlug);
    }

    _boundTarget(note) {
      const remote = this.api.normalizeRemote(note && note.remote);
      if (!this.api.hasRemoteTargetIdentity(remote)) throw new Error('A repository owner, repository, branch and path are required for this recovery action.');
      return remote;
    }

    _workspaceEditor(workspace) {
      if (!workspace) return { id: '', name: '', repositoryInput: '', branch: 'main', basePath: this.api.DEFAULT_WORKSPACE_BASE_PATH || 'prototype-fixtures/linked-notes' };
      return {
        id: workspace.id,
        name: workspace.name,
        repositoryInput: `${workspace.owner}/${workspace.repo}`,
        branch: workspace.branch,
        basePath: workspace.basePath
      };
    }

    _workspaceUiState() {
      const active = this._activeWorkspace();
      const mapped = this.currentChatKey ? this.workspaceState.chatWorkspaceMap[this.currentChatKey] : '';
      let chatContextLabel = 'New chat / default fallback';
      if (this.currentChatKey && mapped === this.activeWorkspaceId) chatContextLabel = 'Saved for this chat';
      else if (this.currentChatKey) chatContextLabel = 'Using the default workspace; not saved for this chat';
      else if (this.sessionWorkspaceExplicit) chatContextLabel = 'Selected for this new-chat session';
      return {
        workspaces: this.workspaceState.workspaces,
        activeWorkspaceId: this.activeWorkspaceId,
        defaultWorkspaceId: this.workspaceState.defaultWorkspaceId,
        workspaceEditor: this._workspaceEditor(active),
        workspaceTargetLabel: active && this.api.workspaceTargetLabel ? this.api.workspaceTargetLabel(active) : '',
        chatContextLabel,
        hasToken: Boolean(this.workspaceState.hasToken)
      };
    }

    _remoteUiState(note = this.current) {
      if (!note) return { remoteTargetMismatch: false, remoteTargetLabel: '', remoteRecoveryAvailable: false, busy: Boolean(this.remoteOperation) };
      const remote = this.api.normalizeRemote(note.remote);
      const complete = this.api.hasCompleteRemoteIdentity(remote);
      const recoverableTarget = this.api.hasRemoteTargetIdentity(remote);
      const recoverableStates = new Set([this.api.NOTE_STATES.CONFLICT, this.api.NOTE_STATES.REMOTE_DELETED, this.api.NOTE_STATES.SAVE_FAILED]);
      const workspace = this._activeWorkspace();
      let mismatch = false;
      if (complete && workspace) mismatch = !this.api.sameRemoteTarget(remote, configuredTargetForNote(note, workspace, this.api.fileSlug));
      return {
        remoteTargetMismatch: mismatch,
        remoteTargetLabel: remoteTargetLabel(remote),
        remoteRecoveryAvailable: recoverableTarget && recoverableStates.has(note.state),
        busy: Boolean(this.remoteOperation)
      };
    }

    _setUi(patch = {}) {
      this.ui.setState({ ...this._workspaceUiState(), ...this._remoteUiState(), ...patch });
    }

    async _runRemoteOperation(label, work) {
      if (this.remoteOperation) throw new Error(`Remote operation already in progress: ${this.remoteOperation}`);
      this.remoteOperation = label;
      this._setUi({ busy: true, status: label });
      try { return await work(); }
      finally { this.remoteOperation = null; this._setUi({ busy: false }); }
    }

    async _confirm(message) {
      return Boolean(await Promise.resolve(this.confirmAction(message)));
    }

    _readChatKey() {
      return this.api.chatKeyFromLocation ? this.api.chatKeyFromLocation(this.locationProvider()) : '';
    }

    async _chooseWorkspaceForCurrentChat() {
      const state = this.workspaceState;
      const mapped = this.currentChatKey ? state.chatWorkspaceMap[this.currentChatKey] : '';
      const valid = (id) => state.workspaces.some((workspace) => workspace.id === id);
      let selected = valid(mapped) ? mapped : '';
      if (!selected && !this.currentChatKey && this.sessionWorkspaceExplicit && valid(this.sessionWorkspaceId)) selected = this.sessionWorkspaceId;
      if (!selected && valid(state.defaultWorkspaceId)) selected = state.defaultWorkspaceId;
      if (!selected && state.workspaces[0]) selected = state.workspaces[0].id;
      this.activeWorkspaceId = selected || '';
      if (!this.currentChatKey && !this.sessionWorkspaceExplicit) this.sessionWorkspaceId = this.activeWorkspaceId;
    }

    async refreshWorkspaceState(status) {
      if (!this.workspaceStore) return this.workspaceState;
      this.workspaceState = await this.workspaceStore.load();
      await this._chooseWorkspaceForCurrentChat();
      this._setUi({ status: status || 'Workspace state refreshed from Tampermonkey storage.' });
      return this.workspaceState;
    }

    async openPanel() {
      await this.refreshWorkspaceState('Workspace state refreshed when Notes opened.');
    }

    async _confirmWorkspaceDraftReset(draftState) {
      if (!draftState || !draftState.dirty) return true;
      return this._confirm('Discard unsaved changes in the workspace form?');
    }

    async beginNewWorkspace(draftState) {
      if (!await this._confirmWorkspaceDraftReset(draftState)) {
        this._setUi({ status: 'New workspace cancelled; the unsaved workspace form was preserved.' });
        return false;
      }
      this._setUi({
        workspaceEditor: this._workspaceEditor(null),
        workspaceTargetLabel: '',
        replaceWorkspaceEditor: true,
        status: 'New workspace form ready.'
      });
      return true;
    }

    async _checkRouteChange() {
      const nextChatKey = this._readChatKey();
      if (nextChatKey === this.currentChatKey || this.remoteOperation) return;
      if (this.ui && typeof this.ui.persistAllDraftsNow === 'function') await this.ui.persistAllDraftsNow();
      else if (this.ui && typeof this.ui.persistDraftNow === 'function') await this.ui.persistDraftNow();
      this.currentChatKey = nextChatKey;
      this.sessionWorkspaceId = '';
      this.sessionWorkspaceExplicit = false;
      if (this.workspaceStore) this.workspaceState = await this.workspaceStore.load();
      await this._chooseWorkspaceForCurrentChat();
      const mappedWorkspaceId = this.currentChatKey ? this.workspaceState.chatWorkspaceMap[this.currentChatKey] : '';
      const status = !this.currentChatKey
        ? 'New chat uses the default workspace until an explicit selection is made.'
        : mappedWorkspaceId
          ? 'Saved chat workspace restored.'
          : 'This chat is not linked to a workspace. The default is active until you select a workspace explicitly.';
      this._setUi({ status });
    }

    _startRouteWatch() {
      if (this.routeTimer || typeof this.setIntervalFn !== 'function') return;
      this.routeTimer = this.setIntervalFn(() => { this._checkRouteChange().catch((error) => this._setUi({ status: `Route context error: ${error.message || error}` })); }, this.routePollMs);
    }

    async start() {
      if (this.workspaceStore) this.workspaceState = await this.workspaceStore.load();
      this.currentChatKey = this._readChatKey();
      await this._chooseWorkspaceForCurrentChat();
      this.ui.mount();
      await this.refreshList('');
      this._setUi({ replaceWorkspaceEditor: true, status: this._activeWorkspace() ? 'Local Notes ready. Workspace fallback is not saved to a chat until you select it explicitly.' : 'Local Notes ready. Create a GitHub workspace before remote access.' });
      this._startRouteWatch();
    }

    dispose() {
      if (this.routeTimer) this.clearIntervalFn(this.routeTimer);
      this.routeTimer = null;
      if (this.ui) this.ui.dispose();
    }

    async selectWorkspace(workspaceId, draftState) {
      await this.refreshWorkspaceState();
      if (!this.workspaceState.workspaces.some((workspace) => workspace.id === workspaceId)) throw new Error('Workspace not found.');
      if (!await this._confirmWorkspaceDraftReset(draftState)) {
        this._setUi({ status: 'Workspace switch cancelled; the unsaved workspace form was preserved.' });
        return this._activeWorkspace();
      }
      this.activeWorkspaceId = workspaceId;
      this.sessionWorkspaceId = workspaceId;
      this.sessionWorkspaceExplicit = !this.currentChatKey;
      if (this.currentChatKey && this.workspaceStore) {
        this.workspaceState = { ...(await this.workspaceStore.bindChat(this.currentChatKey, workspaceId)), hasToken: this.workspaceState.hasToken };
      }
      this._setUi({ replaceWorkspaceEditor: true, status: this.currentChatKey ? 'Workspace selected and saved for this chat.' : 'Workspace selected for this new-chat session.' });
      return this._activeWorkspace();
    }

    async saveWorkspace(input) {
      if (!this.workspaceStore) throw new Error('Workspace storage is not available.');
      const result = await this.workspaceStore.upsert(input);
      this.workspaceState = { ...result.state, hasToken: this.workspaceState.hasToken };
      this.activeWorkspaceId = result.workspace.id;
      this.sessionWorkspaceId = result.workspace.id;
      this.sessionWorkspaceExplicit = !this.currentChatKey;
      if (this.currentChatKey) {
        this.workspaceState = { ...(await this.workspaceStore.bindChat(this.currentChatKey, result.workspace.id)), hasToken: this.workspaceState.hasToken };
      }
      this._setUi({ replaceWorkspaceEditor: true, status: `Workspace saved: ${result.workspace.name}.` });
      return result.workspace;
    }

    async setDefaultWorkspace(workspaceId) {
      if (!this.workspaceStore) throw new Error('Workspace storage is not available.');
      this.workspaceState = { ...(await this.workspaceStore.setDefault(workspaceId)), hasToken: this.workspaceState.hasToken };
      this._setUi({ status: 'Default workspace updated.' });
    }

    async deleteWorkspace(workspaceId) {
      if (!workspaceId || !this.workspaceStore) throw new Error('Workspace not found.');
      const workspace = this.workspaceState.workspaces.find((item) => item.id === workspaceId);
      const confirmed = await this._confirm(`Delete the local workspace ${workspace ? workspace.name : workspaceId}? Notes and remote repository files will not be deleted.`);
      if (!confirmed) { this._setUi({ status: 'Workspace deletion cancelled.' }); return; }
      const result = await this.workspaceStore.remove(workspaceId);
      this.workspaceState = { ...result.state, hasToken: this.workspaceState.hasToken };
      if (this.sessionWorkspaceId === workspaceId) {
        this.sessionWorkspaceId = '';
        this.sessionWorkspaceExplicit = false;
      }
      await this._chooseWorkspaceForCurrentChat();
      this._setUi({ replaceWorkspaceEditor: true, status: `Workspace deleted locally. ${result.removedChatKeys.length} chat binding(s) fell back safely; Notes and remote files were untouched.` });
    }

    async saveSharedToken(token) {
      if (!this.workspaceStore) throw new Error('Workspace storage is not available.');
      await this.workspaceStore.setToken(token);
      this.workspaceState.hasToken = true;
      this._setUi({ status: 'Shared GitHub token stored privately for all workspaces.' });
    }

    async clearSharedToken() {
      if (!this.workspaceStore) throw new Error('Workspace storage is not available.');
      const confirmed = await this._confirm('Clear the shared GitHub token from Tampermonkey storage?');
      if (!confirmed) { this._setUi({ status: 'Token clear cancelled.' }); return; }
      await this.workspaceStore.clearToken();
      this.workspaceState.hasToken = false;
      this._setUi({ status: 'Shared GitHub token cleared.' });
    }

    async refreshList(query = this.search) {
      this.search = String(query || '');
      const notes = await this.store.search(this.search);
      if (this.current) {
        const refreshed = notes.find((item) => item.id === this.current.id) || await this.store.get(this.current.id);
        if (refreshed) this.current = this.api.normalizeNote(refreshed);
      }
      this._setUi({ notes, current: this.current, search: this.search });
    }

    async refreshRemoteWorkspace() {
      return this._runRemoteOperation('Reading Linked Notes from the active GitHub workspace…', async () => {
        const workspace = this._activeWorkspace();
        if (!workspace) throw new Error('Select or create a GitHub workspace before refreshing GitHub.');
        const basePath = cleanBasePath(workspace.basePath);
        const client = await this._client(workspace);
        const entries = await client.listDirectory(basePath, { missingAsEmpty: true, maxEntries: 100 });
        const markdownEntries = entries.filter((entry) => entry.type === 'file' && /\.md$/i.test(entry.name || entry.path));
        const maxBytes = 2 * 1024 * 1024;
        const listedBytes = markdownEntries.reduce((sum, entry) => sum + Number(entry.size || 0), 0);
        if (listedBytes > maxBytes) {
          throw new Error(`GitHub Notes folder is too large for one explicit refresh: ${listedBytes} bytes exceeds ${maxBytes}.`);
        }

        const summary = {
          discovered: markdownEntries.length,
          imported: 0,
          updated: 0,
          unchanged: 0,
          localAhead: 0,
          conflicts: 0,
          deleted: 0,
          skipped: 0,
          errors: 0
        };
        const seenPaths = new Set(markdownEntries.map((entry) => String(entry.path || '').replace(/\\/g, '/')));
        const initialLocalNotes = await this.store.list();
        const boundGroupsByPath = new Map();
        for (const local of initialLocalNotes) {
          const bound = this.api.normalizeRemote(local.remote);
          if (bound.owner === workspace.owner && bound.repo === workspace.repo && bound.branch === workspace.branch && bound.path) {
            const group = boundGroupsByPath.get(bound.path) || [];
            group.push(local);
            boundGroupsByPath.set(bound.path, group);
          }
        }
        const boundByPath = new Map();
        const duplicateLocalPaths = new Set();
        const unsupportedPaths = new Set();
        const conflictIds = new Set();
        for (const [path, group] of boundGroupsByPath.entries()) {
          if (group.length === 1) {
            boundByPath.set(path, group[0]);
            continue;
          }
          duplicateLocalPaths.add(path);
          for (const local of group) {
            const conflicted = this.api.markConflict(local, `Several local Notes are bound to the same GitHub path ${path}. GitHub refresh cannot select one identity automatically.`);
            await this.store.put(conflicted);
            if (this.current && this.current.id === conflicted.id) this.current = conflicted;
            conflictIds.add(conflicted.id);
            summary.conflicts += 1;
          }
        }
        const snapshots = [];
        let actualBytes = 0;

        for (const entry of markdownEntries) {
          try {
            const remoteFile = await client.read(entry.path);
            actualBytes += new TextEncoder().encode(remoteFile.content).byteLength;
            if (actualBytes > maxBytes) throw new Error(`GitHub Notes refresh exceeded the ${maxBytes}-byte content limit.`);
            if (!this.api.isLinkedNoteMarkdown(remoteFile.content)) {
              unsupportedPaths.add(remoteFile.path || entry.path);
              summary.skipped += 1;
              continue;
            }
            const decoded = this.api.decodeNoteMarkdown(remoteFile.content);
            snapshots.push({
              note: decoded,
              content: remoteFile.content,
              hash: await this.api.sha256Hex(remoteFile.content),
              target: {
                owner: workspace.owner,
                repo: workspace.repo,
                branch: workspace.branch,
                path: remoteFile.path || entry.path
              },
              sha: remoteFile.sha,
              htmlUrl: remoteFile.htmlUrl || entry.htmlUrl || ''
            });
          } catch (error) {
            if (String(error && error.message || '').includes('content limit')) throw error;
            summary.errors += 1;
          }
        }

        const snapshotsById = new Map();
        for (const snapshot of snapshots) {
          const group = snapshotsById.get(snapshot.note.id) || [];
          group.push(snapshot);
          snapshotsById.set(snapshot.note.id, group);
        }

        for (const [noteId, group] of snapshotsById.entries()) {
          const local = await this.store.get(noteId);
          if (group.length > 1) {
            const affected = new Map();
            if (local) affected.set(local.id, local);
            for (const snapshot of group) {
              for (const boundLocal of boundGroupsByPath.get(snapshot.target.path) || []) {
                affected.set(boundLocal.id, boundLocal);
              }
            }
            if (affected.size === 0) summary.conflicts += 1;
            for (const affectedLocal of affected.values()) {
              const conflicted = this.api.markConflict(affectedLocal, `GitHub refresh found ${group.length} files with the same stable Note id ${noteId}. No file was selected automatically.`);
              await this.store.put(conflicted);
              if (this.current && this.current.id === conflicted.id) this.current = conflicted;
              if (!conflictIds.has(conflicted.id)) summary.conflicts += 1;
              conflictIds.add(conflicted.id);
            }
            summary.skipped += group.length;
            continue;
          }

          const snapshot = group[0];
          if (duplicateLocalPaths.has(snapshot.target.path)) {
            summary.skipped += 1;
            continue;
          }
          const pathBoundLocal = boundByPath.get(snapshot.target.path);
          if (pathBoundLocal && pathBoundLocal.id !== noteId) {
            const conflicted = this.api.markConflict(pathBoundLocal, `GitHub refresh found stable Note id ${noteId} at ${snapshot.target.path}, but that path is already bound locally to ${pathBoundLocal.id}.`);
            await this.store.put(conflicted);
            if (this.current && this.current.id === conflicted.id) this.current = conflicted;
            conflictIds.add(conflicted.id);
            summary.conflicts += 1;
            summary.skipped += 1;
            continue;
          }
          const localContentHash = local ? await this.api.sha256Hex(this.api.encodeNoteMarkdown(local)) : '';
          const decision = this.api.classifyRemoteNote({ local, remote: snapshot, localContentHash });
          let next = local;
          if (decision.action === this.api.REMOTE_RECONCILE_ACTIONS.REMOTE_IMPORT) {
            next = this.api.createNote({
              id: snapshot.note.id,
              title: snapshot.note.title,
              body: snapshot.note.body,
              links: snapshot.note.links,
              codecExtra: snapshot.note.codecExtra
            });
            next = this.api.markSavedVerified(next, {
              ...snapshot.target,
              sha: snapshot.sha,
              verifiedHash: snapshot.hash,
              htmlUrl: snapshot.htmlUrl
            });
            summary.imported += 1;
          } else if (decision.action === this.api.REMOTE_RECONCILE_ACTIONS.FAST_FORWARD) {
            next = this.api.updateNote(local, {
              title: snapshot.note.title,
              body: snapshot.note.body,
              links: snapshot.note.links,
              codecExtra: snapshot.note.codecExtra
            });
            next = this.api.markSavedVerified(next, {
              ...snapshot.target,
              sha: snapshot.sha,
              verifiedHash: snapshot.hash,
              htmlUrl: snapshot.htmlUrl
            });
            summary.updated += 1;
          } else if (decision.action === this.api.REMOTE_RECONCILE_ACTIONS.UNCHANGED || decision.action === this.api.REMOTE_RECONCILE_ACTIONS.ATTACH_EXISTING) {
            next = this.api.markSavedVerified(local, {
              ...snapshot.target,
              sha: snapshot.sha,
              verifiedHash: snapshot.hash,
              htmlUrl: snapshot.htmlUrl
            });
            summary.unchanged += 1;
          } else if (decision.action === this.api.REMOTE_RECONCILE_ACTIONS.LOCAL_AHEAD) {
            summary.localAhead += 1;
          } else {
            next = this.api.markConflict(local, `GitHub refresh conflict for ${snapshot.target.path}: ${decision.reason}`);
            summary.conflicts += 1;
          }

          if (next && next !== local) {
            await this.store.put(next);
            if (this.current && this.current.id === next.id) this.current = next;
          }
        }

        for (const path of unsupportedPaths) {
          const local = boundByPath.get(path);
          if (!local || conflictIds.has(local.id)) continue;
          const conflicted = this.api.markConflict(local, `The bound GitHub file ${path} is no longer valid obs-linked-note:v1 Markdown. Local content was preserved.`);
          await this.store.put(conflicted);
          if (this.current && this.current.id === conflicted.id) this.current = conflicted;
          conflictIds.add(conflicted.id);
          summary.conflicts += 1;
        }

        const localNotes = await this.store.list();
        for (const local of localNotes) {
          if (conflictIds.has(local.id)) continue;
          if (!this.api.boundNoteMissingFromSnapshot(local, workspace, basePath, seenPaths)) continue;
          const deleted = this.api.markRemoteDeleted(local, 'The bound GitHub Note is no longer present in the active workspace folder. Local content was preserved.');
          await this.store.put(deleted);
          if (this.current && this.current.id === deleted.id) this.current = deleted;
          summary.deleted += 1;
        }

        const summaryText = `found ${summary.discovered}; imported ${summary.imported}; updated ${summary.updated}; unchanged ${summary.unchanged}; local ahead ${summary.localAhead}; conflicts ${summary.conflicts}; deleted ${summary.deleted}; skipped ${summary.skipped}; errors ${summary.errors}`;
        await this.refreshList();
        this._setUi({ remoteRefreshSummary: summaryText, status: `GitHub refresh complete: ${summaryText}. No remote writes were performed.` });
        return summary;
      });
    }

    async saveDraft(note) {
      if (!note) return null;
      const next = this.api.updateNote(this.api.normalizeNote(note), {
        title: note.title,
        body: note.body,
        links: note.links
      });
      await this.store.put(next);
      this.current = next;
      return next;
    }

    async newNote() {
      const note = this.api.createNote();
      await this.store.put(note);
      this.current = note;
      await this.refreshList();
      this._setUi({ status: 'New local Note created.' });
    }

    async selectNote(id) {
      const note = await this.store.get(id);
      if (!note) throw new Error(`Note not found: ${id}`);
      this.current = this.api.normalizeNote(note);
      this._setUi({ current: this.current, status: `Opened ${this.current.title || 'Untitled Note'}.` });
    }

    async saveLocal(note) {
      if (!note) throw new Error('No Note is selected.');
      let next = await this.saveDraft(note);
      if (next.state === this.api.NOTE_STATES.LOCAL_DRAFT) {
        next = this.api.updateNote(next, { state: this.api.NOTE_STATES.READY, stateMessage: 'Saved locally.' });
        await this.store.put(next);
        this.current = next;
      }
      await this.refreshList();
      this._setUi({ status: 'Local Note saved in IndexedDB.' });
      return next;
    }

    _sourcePath(note) {
      const remote = this.api.normalizeRemote(note && note.remote);
      return remote.path || this._configuredTarget(note).path;
    }

    _repositoryContext(note) {
      const remote = this.api.normalizeRemote(note && note.remote);
      if (this.api.hasCompleteRemoteIdentity(remote)) {
        return { owner: remote.owner, repo: remote.repo, branch: remote.branch };
      }
      const workspace = this._activeWorkspace();
      return workspace ? { owner: workspace.owner, repo: workspace.repo, branch: workspace.branch } : { owner: '', repo: '', branch: '' };
    }

    async addLink(note, input) {
      if (!note) throw new Error('No Note is selected.');
      const value = String(input.target || '').trim();
      if (!value) throw new Error('Link target is required.');
      let link;
      if (input.type === this.api.LINK_TYPES.REPOSITORY) {
        const target = this.api.normalizeRepositoryTarget(this._sourcePath(note), value);
        if (target.type !== 'repository') throw new Error('Use Portable URL for external HTTP(S) links.');
        link = { type: 'repository', label: input.label, target, resolution: 'unchecked' };
      } else if (input.type === this.api.LINK_TYPES.NOTE) {
        link = { type: 'note', label: input.label, target: { noteId: value }, resolution: 'unchecked' };
      } else if (input.type === this.api.LINK_TYPES.URL) {
        if (!this.api.isPortableUrl(value)) throw new Error('Only portable HTTP(S) URLs are accepted.');
        link = { type: 'url', label: input.label, target: { url: value }, resolution: 'resolved', resolutionMessage: 'Portable URL.' };
      } else {
        throw new Error(`Unsupported link type: ${input.type}`);
      }
      const draft = await this.saveDraft(note);
      const next = this.api.addLink(draft, link);
      await this.store.put(next);
      this.current = next;
      await this.refreshList();
      this._setUi({ status: 'Link added locally.' });
    }

    async removeLink(note, linkId) {
      const draft = await this.saveDraft(note);
      const next = this.api.removeLink(draft, linkId);
      await this.store.put(next);
      this.current = next;
      await this.refreshList();
      this._setUi({ status: 'Link removed locally.' });
    }

    async _client(context) {
      const target = {
        owner: String(context.owner || '').trim(),
        repo: String(context.repo || '').trim(),
        branch: String(context.branch || '').trim()
      };
      if (!target.owner || !target.repo || !target.branch) throw new Error('Select a GitHub workspace with owner, repository and branch.');
      if (this.clientFactory) return this.clientFactory(target);
      const token = this.workspaceStore ? await this.workspaceStore.getToken() : await this.getValue(TOKEN_KEY, '');
      if (!token) throw new Error('A shared fine-grained GitHub token is required for remote access.');
      return new this.api.GitHubContentsClient({ ...target, token, transport: this.api.createGmTransport(GM_xmlhttpRequest) });
    }

    async resolveLink(note, linkId) {
      let draft = await this.saveDraft(note);
      const link = draft.links.find((item) => item.id === linkId);
      if (!link) throw new Error(`Link not found: ${linkId}`);
      let resolution = 'unresolved';
      let message = '';
      if (link.type === 'note') {
        const target = await this.store.get(link.target.noteId);
        resolution = target ? 'resolved' : 'unresolved';
        message = target ? 'Local Note target resolved.' : `Missing local Note: ${link.target.noteId}`;
      } else if (link.type === 'url') {
        resolution = this.api.isPortableUrl(link.target.url) ? 'resolved' : 'invalid';
        message = resolution === 'resolved' ? 'Portable URL.' : 'Invalid portable URL.';
      } else {
        try {
          const client = await this._client(this._repositoryContext(draft));
          const remote = await client.read(link.target.path);
          if (link.target.anchor && !this.api.explicitAnchorExists(remote.content, link.target.anchor)) {
            resolution = 'unresolved';
            message = `Missing explicit anchor: #${link.target.anchor}`;
          } else {
            resolution = 'resolved';
            message = 'GitHub repository target resolved.';
          }
        } catch (error) {
          resolution = error.kind === 'not_found' ? 'unresolved' : 'invalid';
          message = error.message || String(error);
        }
      }
      draft = this.api.setLinkResolution(draft, linkId, resolution, message);
      await this.store.put(draft);
      this.current = draft;
      await this.refreshList();
      this._setUi({ status: message });
    }

    async openLink(linkId) {
      if (!this.current) return;
      const link = this.current.links.find((item) => item.id === linkId);
      if (!link) return;
      if (link.type === 'note') {
        await this.selectNote(link.target.noteId);
        return;
      }
      if (link.type === 'url') {
        const url = String(link.target && link.target.url || '').trim();
        if (!this.api.isPortableUrl(url)) throw new Error('Only portable HTTP(S) URLs can be opened.');
        window.open(url, '_blank', 'noopener,noreferrer');
        return;
      }
      const context = this._repositoryContext(this.current);
      if (!context.owner || !context.repo || !context.branch) throw new Error('GitHub owner, repository and branch are required to open this target.');
      const canonicalPath = this.api.normalizeCanonicalRepositoryPath(link.target.path, 'Repository link path');
      const path = encodeGitHubPath(canonicalPath);
      const anchor = link.target.anchor ? `#${encodeURIComponent(link.target.anchor)}` : '';
      const url = `https://github.com/${encodeURIComponent(context.owner)}/${encodeURIComponent(context.repo)}/blob/${encodeURIComponent(context.branch)}/${path}${anchor}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    }

    async _persistRemoteState(note, status) {
      await this.store.put(note);
      this.current = note;
      await this.refreshList();
      this._setUi({ status: status || note.stateMessage });
      return note;
    }

    async saveRemote(note) {
      return this._runRemoteOperation('Saving and verifying the configured GitHub target…', () => this._saveRemoteUnlocked(note));
    }

    async _saveRemoteUnlocked(note) {
      let local = await this.saveLocal(note);
      const target = this._configuredTarget(local);
      const remoteIdentity = this.api.normalizeRemote(local.remote);
      const hasAny = this.api.hasAnyRemoteIdentity(remoteIdentity);
      const hasComplete = this.api.hasCompleteRemoteIdentity(remoteIdentity);

      if (hasAny && !hasComplete) {
        local = this.api.markConflict(local, 'Stored remote identity is incomplete. Automatic create/update is blocked; preserve the local Note and review its target.');
        return this._persistRemoteState(local);
      }
      if (hasComplete && !this.api.sameRemoteTarget(remoteIdentity, target)) {
        local = this.api.markConflict(local, 'Current GitHub settings point to a different repository, branch or path. Use Copy to current target explicitly.');
        return this._persistRemoteState(local);
      }

      const client = await this._client(target);
      let remote = null;
      try {
        remote = await client.read(target.path);
      } catch (error) {
        if (error.kind !== 'not_found') throw error;
        if (hasComplete) {
          local = this.api.markRemoteDeleted(local, 'The previously verified remote target is missing. It was not recreated automatically. Use an explicit recovery action.');
          return this._persistRemoteState(local);
        }
      }

      if (hasComplete && remote.sha !== remoteIdentity.sha) {
        local = this.api.markConflict(local, 'Remote SHA differs from the last verified local base. Recheck, load or explicitly overwrite the bound remote.');
        return this._persistRemoteState(local);
      }
      if (!hasComplete && remote) {
        local = this.api.markConflict(local, 'The configured target path already exists, but this local Note has no verified base. No blind overwrite was attempted.');
        return this._persistRemoteState(local);
      }

      local = this.api.markSaving(local);
      await this.store.put(local);
      this.current = local;
      await this.refreshList();
      const content = this.api.encodeNoteMarkdown(local);
      try {
        const result = await client.saveVerified({
          path: target.path,
          content,
          baseSha: remote ? remote.sha : '',
          message: `${remote ? 'Update' : 'Create'} linked Note ${local.title || local.id}`
        });
        local = this.api.markSavedVerified(local, { ...target, ...result });
        return this._persistRemoteState(local, result.recoveredAfterUnknownWrite ? 'Remote content verified after an initially unknown write result.' : 'Remote save verified by read-back.');
      } catch (error) {
        if (error.kind === 'verification_unknown' && !this.api.hasRemoteTargetIdentity(local.remote)) {
          const writeResult = error.details && error.details.writeResult ? error.details.writeResult : {};
          local = this.api.updateNote(local, {
            remote: {
              owner: target.owner,
              repo: target.repo,
              branch: target.branch,
              path: writeResult.path || target.path,
              sha: writeResult.sha || '',
              htmlUrl: writeResult.htmlUrl || ''
            }
          });
        }
        local = error.kind === 'conflict'
          ? this.api.markConflict(local, error.message)
          : this.api.markSaveFailed(local, error.message);
        await this._persistRemoteState(local);
        throw error;
      }
    }

    async copyRemote(note) {
      return this._runRemoteOperation('Copying and verifying the explicitly selected GitHub target…', () => this._copyRemoteUnlocked(note));
    }

    async _copyRemoteUnlocked(note) {
      let local = await this.saveLocal(note);
      const remoteIdentity = this.api.normalizeRemote(local.remote);
      if (!this.api.hasCompleteRemoteIdentity(remoteIdentity)) {
        throw new Error('Copy requires a complete previously verified remote identity. Use Save GitHub for a new Note.');
      }
      const target = this._configuredTarget(local);
      if (this.api.sameRemoteTarget(remoteIdentity, target)) {
        throw new Error('Current settings already match the bound remote target. Use Save GitHub.');
      }
      const client = await this._client(target);
      try {
        await client.read(target.path);
        local = this.api.markConflict(local, 'Copy target already exists. No overwrite was attempted.');
        return this._persistRemoteState(local);
      } catch (error) {
        if (error.kind !== 'not_found') throw error;
      }
      local = this.api.markSaving(local, 'Copying to the explicitly selected target…');
      await this.store.put(local);
      this.current = local;
      await this.refreshList();
      const content = this.api.encodeNoteMarkdown(local);
      try {
        const result = await client.saveVerified({
          path: target.path,
          content,
          baseSha: '',
          message: `Copy linked Note ${local.title || local.id}`
        });
        local = this.api.markSavedVerified(local, { ...target, ...result });
        return this._persistRemoteState(local, 'Remote copy verified by read-back. The old remote file was not deleted.');
      } catch (error) {
        local = error.kind === 'conflict'
          ? this.api.markConflict(local, error.message)
          : this.api.markSaveFailed(local, error.message);
        await this._persistRemoteState(local);
        throw error;
      }
    }

    async recheckRemote(note) {
      return this._runRemoteOperation('Rechecking the bound remote target…', async () => {
        let local = await this.saveLocal(note);
        const bound = this._boundTarget(local);
        const client = await this._client(bound);
        let remote;
        try {
          remote = await client.read(bound.path);
        } catch (error) {
          if (error.kind !== 'not_found') throw error;
          local = this.api.markRemoteDeleted(local, 'The bound remote target is missing. It was not recreated. Use Restore/overwrite bound remote only after explicit review.');
          return this._persistRemoteState(local);
        }
        const content = this.api.encodeNoteMarkdown(local);
        if (remote.content !== content) {
          local = this.api.markConflict(local, 'Bound remote content differs from the local Note. Load remote or explicitly overwrite the bound remote.');
          return this._persistRemoteState(local);
        }
        local = this.api.markSavedVerified(local, {
          ...bound,
          path: remote.path || bound.path,
          sha: remote.sha,
          verifiedHash: await this.api.sha256Hex(content),
          htmlUrl: remote.htmlUrl || bound.htmlUrl
        });
        return this._persistRemoteState(local, 'Bound remote content matches local content and is verified against the current SHA.');
      });
    }

    async loadRemote(note) {
      return this._runRemoteOperation('Loading the bound remote target…', async () => {
        const bound = this._boundTarget(note);
        const confirmed = await this._confirm('Load the bound remote Note? If local content differs, a separate local backup Note will be created first.');
        if (!confirmed) {
          this._setUi({ status: 'Load remote cancelled.' });
          return note;
        }
        let local = await this.saveLocal(note);
        const client = await this._client(bound);
        let remote;
        try {
          remote = await client.read(bound.path);
        } catch (error) {
          if (error.kind !== 'not_found') throw error;
          local = this.api.markRemoteDeleted(local, 'The bound remote target is missing. Local content was preserved.');
          return this._persistRemoteState(local);
        }
        const decoded = this.api.decodeNoteMarkdown(remote.content);
        if (decoded.id !== local.id) {
          local = this.api.markConflict(local, `Remote Note identity ${decoded.id} does not match local Note identity ${local.id}.`);
          return this._persistRemoteState(local);
        }
        const loadedLocal = this.api.updateNote(local, {
          title: decoded.title,
          body: decoded.body,
          links: decoded.links,
          codecExtra: decoded.codecExtra
        });
        const localContent = this.api.encodeNoteMarkdown(local);
        let backup = null;
        if (localContent !== remote.content) {
          backup = this.api.createNote({
            title: `${local.title || 'Untitled Note'} — local conflict backup`,
            body: local.body,
            links: local.links,
            codecExtra: local.codecExtra,
            state: this.api.NOTE_STATES.READY,
            stateMessage: `Local backup created before loading ${remoteTargetLabel(bound)}.`
          });
          await this.store.put(backup);
        }
        local = loadedLocal;
        local = this.api.markSavedVerified(local, {
          ...bound,
          path: remote.path || bound.path,
          sha: remote.sha,
          verifiedHash: await this.api.sha256Hex(remote.content),
          htmlUrl: remote.htmlUrl || bound.htmlUrl
        });
        const status = backup
          ? `Remote Note loaded and verified. Local conflict backup created: ${backup.id}.`
          : 'Remote Note loaded and verified; local content already matched.';
        return this._persistRemoteState(local, status);
      });
    }

    async overwriteRemote(note) {
      return this._runRemoteOperation('Preparing explicit bound-remote overwrite or restore…', async () => {
        const bound = this._boundTarget(note);
        const confirmed = await this._confirm(`Overwrite or restore the bound remote target ${remoteTargetLabel(bound)} with the current local Note? The current remote state will be read first and its latest SHA will be used.`);
        if (!confirmed) {
          this._setUi({ status: 'Bound-remote overwrite cancelled.' });
          return note;
        }
        let local = await this.saveLocal(note);
        const client = await this._client(bound);
        let remote = null;
        try {
          remote = await client.read(bound.path);
        } catch (error) {
          if (error.kind !== 'not_found') throw error;
        }
        local = this.api.markSaving(local, remote ? 'Explicitly overwriting the current bound remote base…' : 'Explicitly restoring the missing bound remote target…');
        await this.store.put(local);
        this.current = local;
        await this.refreshList();
        const content = this.api.encodeNoteMarkdown(local);
        try {
          const result = await client.saveVerified({
            path: bound.path,
            content,
            baseSha: remote ? remote.sha : '',
            message: `${remote ? 'Reconcile' : 'Restore'} linked Note ${local.title || local.id}`
          });
          local = this.api.markSavedVerified(local, { ...bound, ...result });
          return this._persistRemoteState(local, remote ? 'Bound remote explicitly overwritten and verified by read-back.' : 'Missing bound remote explicitly restored and verified by read-back.');
        } catch (error) {
          local = error.kind === 'conflict'
            ? this.api.markConflict(local, error.message)
            : this.api.markSaveFailed(local, error.message);
          await this._persistRemoteState(local);
          throw error;
        }
      });
    }

    async deleteNote(id) {
      if (!id) return;
      if (typeof window !== 'undefined' && !window.confirm('Delete this local Note? Remote repository content is not deleted.')) return;
      await this.store.delete(id);
      this.current = null;
      await this.refreshList();
      this._setUi({ status: 'Local Note deleted. Remote content, if any, was not deleted.' });
    }
  }

  async function mountLinkedNotesPrototype() {
    const previous = root[DISPOSE_KEY];
    if (typeof previous === 'function') {
      try { previous(); } catch (error) { /* stale instance must not block mount */ }
    }
    const app = new LinkedNotesApp();
    await app.start();
    root[DISPOSE_KEY] = () => app.dispose();
    return app;
  }

  return {
    LinkedNotesApp,
    mountLinkedNotesPrototype,
    SETTINGS_KEY,
    TOKEN_KEY,
    cleanBasePath,
    configuredTargetForNote,
    remoteTargetLabel
  };
});
