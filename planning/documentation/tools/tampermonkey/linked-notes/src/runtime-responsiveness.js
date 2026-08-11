(function (root, factory) {
  const exported = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = exported;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, exported);
  if (typeof exported.installLinkedNotesRuntimeResponsiveness === 'function') {
    exported.installLinkedNotesRuntimeResponsiveness(root.ObsLinkedNotes);
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function (root) {
  'use strict';

  const INSTALL_FLAG = '__obsLinkedNotesRuntimeResponsivenessV1';
  const CATEGORY_DEFINITION_FETCH_BYTE_LIMIT = 1024 * 1024;
  const CATEGORY_MEMBER_TARGET_LIMIT = 100;
  const CATEGORY_PARENT_VALIDATION_LIMIT = 20;

  function clone(value) {
    return value == null ? value : JSON.parse(JSON.stringify(value));
  }

  function githubError(api, kind, message, details = {}) {
    if (api && typeof api.GitHubClientError === 'function') return new api.GitHubClientError(kind, message, details);
    const error = new Error(message);
    error.kind = kind;
    error.details = details;
    return error;
  }

  function cancelledError(api, message = 'GitHub read cancelled by the user.') {
    return githubError(api, 'aborted', message);
  }

  function cleanNotesBasePath(api, value) {
    if (api && typeof api.cleanWorkspaceBasePath === 'function') return api.cleanWorkspaceBasePath(value);
    const text = String(value == null ? '' : value).replace(/\\/g, '/').trim() || 'prototype-fixtures/linked-notes';
    if (/^[a-zA-Z]:\//.test(text) || text.startsWith('/') || text.startsWith('//') || /^file:\/\//i.test(text)) throw new TypeError('GitHub base path must be repository-relative.');
    if (text.includes('://')) throw new TypeError('GitHub base path must not be a URL.');
    if (/[?#]/.test(text)) throw new TypeError('GitHub base path must not contain query or fragment syntax.');
    const parts = text.split('/');
    if (parts.some((segment) => !segment || segment === '.' || segment === '..')) throw new TypeError('GitHub base path contains an empty, . or .. segment.');
    return parts.join('/');
  }

  function createAbortableGmTransport(gmRequest, api = root.ObsLinkedNotes || {}) {
    if (typeof gmRequest !== 'function') throw new TypeError('GM_xmlhttpRequest is required.');
    const handles = new Set();
    let cancelled = false;
    let progressListener = null;
    let started = 0;
    let finished = 0;

    const progress = () => ({ started, finished, pending: Math.max(0, started - finished), cancelled });
    const emitProgress = () => {
      if (typeof progressListener !== 'function') return;
      try { progressListener(progress()); } catch (error) { /* UI progress must never break transport */ }
    };

    const transport = function transport(request = {}) {
      return new Promise((resolve, reject) => {
        if (cancelled) {
          reject(cancelledError(api));
          return;
        }
        let handle = null;
        let settled = false;
        started += 1;
        emitProgress();

        const finish = (callback, value) => {
          if (settled) return;
          settled = true;
          if (handle) handles.delete(handle);
          finished += 1;
          emitProgress();
          callback(value);
        };

        const details = {
          method: request.method,
          url: request.url,
          headers: request.headers,
          data: request.body,
          timeout: request.timeoutMs || 20000,
          responseType: request.responseType || 'text',
          onload(response) {
            finish(resolve, {
              status: response.status,
              text: response.responseText || '',
              response: response.response,
              headers: response.responseHeaders || ''
            });
          },
          ontimeout() {
            finish(reject, githubError(api, 'network_unknown', 'GitHub request timed out; remote state must be read before retrying.'));
          },
          onerror(error) {
            finish(reject, githubError(api, 'network_unknown', 'GitHub network request failed; remote state may be unknown.', { cause: error }));
          },
          onabort() {
            finish(reject, cancelled
              ? cancelledError(api)
              : githubError(api, 'network_unknown', 'GitHub request was aborted; remote state may be unknown.'));
          }
        };

        try {
          handle = gmRequest(details);
          if (!settled && handle && typeof handle.abort === 'function') handles.add(handle);
          if (cancelled && handle && typeof handle.abort === 'function') {
            try { handle.abort(); } catch (error) { finish(reject, cancelledError(api)); }
          }
        } catch (error) {
          finish(reject, error instanceof Error ? error : new Error(String(error)));
        }
      });
    };

    transport.abortAll = () => {
      cancelled = true;
      const pending = [...handles];
      for (const handle of pending) {
        try { handle.abort(); } catch (error) { /* onabort or a later request boundary reports cancellation */ }
      }
      emitProgress();
      return pending.length;
    };
    transport.setProgressListener = (listener) => {
      progressListener = typeof listener === 'function' ? listener : null;
      emitProgress();
    };
    transport.getProgress = progress;
    return transport;
  }

  function replaceCategoryDefinitionRecord(snapshot, record) {
    const source = snapshot && typeof snapshot === 'object' ? snapshot : {};
    const path = String(record && record.path || '').trim();
    if (!path) throw new Error('Verified category record requires a repository path.');
    const definitions = (Array.isArray(source.definitions) ? source.definitions : []).filter((item) => item && item.path !== path);
    definitions.push(clone(record));
    definitions.sort((left, right) => String(left.path || '').localeCompare(String(right.path || '')));
    return {
      definitions,
      diagnostics: (Array.isArray(source.diagnostics) ? source.diagnostics : []).filter((item) => !item || item.path !== path),
      fileValidation: clone(source.fileValidation && typeof source.fileValidation === 'object' ? source.fileValidation : {}),
      noteValidation: clone(source.noteValidation && typeof source.noteValidation === 'object' ? source.noteValidation : {}),
      groups: clone(source.groups && typeof source.groups === 'object' ? source.groups : {}),
      refreshedAt: String(source.refreshedAt || '')
    };
  }

  function cachedCategoryDefinition(entry, definitions) {
    const path = String(entry && entry.path || '');
    const sha = String(entry && entry.sha || '');
    if (!path || !sha) return null;
    const match = (Array.isArray(definitions) ? definitions : []).find((item) => item && item.path === path && String(item.sha || '') === sha && item.definition);
    return match ? clone(match) : null;
  }

  function boundedParentValidationGroups(targets, parentLimit = CATEGORY_PARENT_VALIDATION_LIMIT) {
    const groups = new Map();
    for (const target of Array.isArray(targets) ? targets : []) {
      if (!target || !target.path) continue;
      const path = String(target.path);
      const slash = path.lastIndexOf('/');
      const parent = slash >= 0 ? path.slice(0, slash) : '';
      const group = groups.get(parent) || [];
      group.push(target);
      groups.set(parent, group);
    }
    const entries = Array.from(groups.entries()).sort((left, right) => left[0].localeCompare(right[0]));
    const limit = Math.max(0, Number(parentLimit) || 0);
    return { selected: entries.slice(0, limit), deferred: entries.slice(limit), totalParents: entries.length };
  }

  function formatReadOperation(state = {}) {
    if (!state || !state.active) return '';
    const category = state.categoryProgress;
    if (category && category.message) return String(category.message);
    const network = state.network || {};
    const finished = Math.max(0, Number(network.finished) || 0);
    const started = Math.max(finished, Number(network.started) || 0);
    const suffix = started ? ` · requests ${finished}/${started}${network.pending ? ` · ${network.pending} active` : ''}` : '';
    return `${String(state.label || 'Repository read in progress')}${suffix}`;
  }

  function publicReadOperation(operation) {
    if (!operation) return null;
    return {
      active: true,
      kind: operation.kind,
      label: operation.label,
      cancelable: operation.cancelable !== false,
      cancelRequested: Boolean(operation.cancelRequested),
      network: clone(operation.network || { started: 0, finished: 0, pending: 0, cancelled: false }),
      categoryProgress: clone(operation.categoryProgress || null)
    };
  }

  function isCancellation(error, operation) {
    return Boolean(operation && operation.cancelRequested && error && error.kind === 'aborted');
  }

  function patchLinkedNotesApp(api) {
    const App = api && api.LinkedNotesApp;
    if (!App || !App.prototype || App.prototype.__obsRuntimeResponsivenessPatched) return false;
    Object.defineProperty(App.prototype, '__obsRuntimeResponsivenessPatched', { value: true, configurable: false });

    const originalClient = App.prototype._client;
    const originalRefreshCategories = App.prototype.refreshCategories;

    App.prototype._client = async function patchedClient(context) {
      const client = await originalClient.call(this, context);
      const operation = this.__obsReadOnlyOperation;
      const transport = client && client.transport;
      if (operation && transport && typeof transport.abortAll === 'function') {
        operation.transports.add(transport);
        if (operation.kind === 'notes' && typeof transport.setProgressListener === 'function') {
          transport.setProgressListener((network) => {
            if (this.__obsReadOnlyOperation !== operation) return;
            operation.network = network;
            const now = Date.now();
            if (now - operation.lastNetworkUiAt >= 120 || Number(network.pending || 0) === 0) {
              operation.lastNetworkUiAt = now;
              this._setUi({ readOperation: publicReadOperation(operation) });
            }
          });
        }
        if (operation.cancelRequested) transport.abortAll();
      }
      return client;
    };

    App.prototype.cancelReadOnlyOperation = function cancelReadOnlyOperation() {
      const operation = this.__obsReadOnlyOperation;
      if (!operation) return false;
      if (operation.cancelable === false) {
        this._setUi({
          readOperation: publicReadOperation(operation),
          status: `${operation.label} Local reconciliation has started, so cancellation is no longer offered.`
        });
        return false;
      }
      operation.cancelRequested = true;
      let aborted = 0;
      for (const transport of operation.transports) {
        if (transport && typeof transport.abortAll === 'function') aborted += Number(transport.abortAll() || 0);
      }
      this._setUi({
        readOperation: publicReadOperation(operation),
        status: aborted ? `Cancelling ${operation.label}…` : `Cancellation requested for ${operation.label}; stopping at the next read boundary.`
      });
      return true;
    };

    App.prototype._runCancelableRepositoryRead = async function runCancelableRepositoryRead(kind, label, work) {
      if (this.__obsReadOnlyOperation) throw new Error(`Read operation already in progress: ${this.__obsReadOnlyOperation.label}`);
      const priorOperationFeedback = new Map((Array.isArray(this.feedback) ? this.feedback : [])
        .filter((item) => item && /^operation-(?:notes|files|categories)$/.test(String(item.id || '')))
        .map((item) => [String(item.id), clone(item)]));
      const operation = {
        kind: String(kind || 'read'),
        label: String(label || 'Reading repository…'),
        cancelable: true,
        cancelRequested: false,
        transports: new Set(),
        network: { started: 0, finished: 0, pending: 0, cancelled: false },
        categoryProgress: null,
        priorOperationFeedback,
        lastNetworkUiAt: 0
      };
      this.__obsReadOnlyOperation = operation;
      this._setUi({ readOperation: publicReadOperation(operation) });
      try {
        const result = await work(operation);
        if (operation.cancelRequested && operation.cancelable !== false) throw cancelledError(this.api);
        return result;
      } catch (error) {
        if (!isCancellation(error, operation)) throw error;
        const currentFeedback = Array.isArray(this.feedback) ? this.feedback : [];
        const nonOperationFeedback = currentFeedback.filter((item) => !item || !/^operation-(?:notes|files|categories)$/.test(String(item.id || '')));
        this.feedback = [...nonOperationFeedback, ...operation.priorOperationFeedback.values()].map((item) => clone(item));
        this._setUi({ status: kind === 'categories'
          ? 'Category refresh cancelled. The previously verified category snapshot remains active.'
          : 'Notes refresh cancelled. No GitHub write was performed.' });
        return { cancelled: true };
      } finally {
        for (const transport of operation.transports) {
          if (transport && typeof transport.setProgressListener === 'function') transport.setProgressListener(null);
        }
        if (this.__obsReadOnlyOperation === operation) this.__obsReadOnlyOperation = null;
        this._setUi({ readOperation: null, categoryRefreshProgress: null });
      }
    };

    App.prototype.refreshRemoteWorkspace = function responsiveRefreshRemoteWorkspace() {
      return this._runCancelableRepositoryRead('notes', 'Reading Linked Notes from GitHub…', () => this._runRemoteOperation('Reading Linked Notes from the active GitHub workspace…', async () => {
        const workspace = this._activeWorkspace();
        if (!workspace) throw new Error('Select or create a GitHub workspace before refreshing GitHub.');
        const basePath = cleanNotesBasePath(this.api, workspace.basePath);
        this._throwIfRepositoryReadCancelled();
        const client = await this._client(workspace);
        const entries = await client.listDirectory(basePath, { missingAsEmpty: true, maxEntries: 100 });
        this._throwIfRepositoryReadCancelled();
        const markdownEntries = entries.filter((entry) => entry.type === 'file' && /\.md$/i.test(entry.name || entry.path));
        const maxBytes = 2 * 1024 * 1024;
        const listedBytes = markdownEntries.reduce((sum, entry) => sum + Number(entry.size || 0), 0);
        if (listedBytes > maxBytes) throw new Error(`GitHub Notes folder is too large for one explicit refresh: ${listedBytes} bytes exceeds ${maxBytes}.`);

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
        const duplicateLocalConflicts = [];
        const unsupportedPaths = new Set();
        const conflictIds = new Set();
        for (const [path, group] of boundGroupsByPath.entries()) {
          if (group.length === 1) {
            boundByPath.set(path, group[0]);
            continue;
          }
          duplicateLocalPaths.add(path);
          for (const local of group) duplicateLocalConflicts.push({ local, path });
        }

        const snapshots = [];
        let actualBytes = 0;
        for (const entry of markdownEntries) {
          this._throwIfRepositoryReadCancelled();
          try {
            const remoteFile = await client.read(entry.path);
            this._throwIfRepositoryReadCancelled();
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
            if (error && error.kind === 'aborted') throw error;
            if (String(error && error.message || '').includes('content limit')) throw error;
            summary.errors += 1;
          }
        }

        this._throwIfRepositoryReadCancelled();
        this._lockReadOnlyOperationForLocalApply('Applying verified Notes refresh locally…');
        for (const { local, path } of duplicateLocalConflicts) {
          const conflicted = this.api.markConflict(local, `Several local Notes are bound to the same GitHub path ${path}. GitHub refresh cannot select one identity automatically.`);
          await this.store.put(conflicted);
          if (this.current && this.current.id === conflicted.id) this.current = conflicted;
          conflictIds.add(conflicted.id);
          summary.conflicts += 1;
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
              for (const boundLocal of boundGroupsByPath.get(snapshot.target.path) || []) affected.set(boundLocal.id, boundLocal);
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
            next = this.api.createNote({ id: snapshot.note.id, title: snapshot.note.title, body: snapshot.note.body, links: snapshot.note.links, codecExtra: snapshot.note.codecExtra });
            next = this.api.markSavedVerified(next, { ...snapshot.target, sha: snapshot.sha, verifiedHash: snapshot.hash, htmlUrl: snapshot.htmlUrl });
            summary.imported += 1;
          } else if (decision.action === this.api.REMOTE_RECONCILE_ACTIONS.FAST_FORWARD) {
            next = this.api.updateNote(local, { title: snapshot.note.title, body: snapshot.note.body, links: snapshot.note.links, codecExtra: snapshot.note.codecExtra });
            next = this.api.markSavedVerified(next, { ...snapshot.target, sha: snapshot.sha, verifiedHash: snapshot.hash, htmlUrl: snapshot.htmlUrl });
            summary.updated += 1;
          } else if (decision.action === this.api.REMOTE_RECONCILE_ACTIONS.UNCHANGED || decision.action === this.api.REMOTE_RECONCILE_ACTIONS.ATTACH_EXISTING) {
            next = this.api.markSavedVerified(local, { ...snapshot.target, sha: snapshot.sha, verifiedHash: snapshot.hash, htmlUrl: snapshot.htmlUrl });
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
      }));
    };

    App.prototype.refreshCategories = function responsiveRefreshCategories() {
      return this._runCancelableRepositoryRead('categories', 'Reading categories from GitHub…', () => originalRefreshCategories.call(this));
    };

    App.prototype._setCategoryRefreshProgress = function setCategoryRefreshProgress(progress) {
      const operation = this.__obsReadOnlyOperation;
      if (!operation || operation.kind !== 'categories') return;
      operation.categoryProgress = progress ? clone(progress) : null;
      this._setUi({ categoryRefreshProgress: clone(progress || null), readOperation: publicReadOperation(operation) });
    };

    App.prototype._throwIfRepositoryReadCancelled = function throwIfRepositoryReadCancelled() {
      const operation = this.__obsReadOnlyOperation;
      if (operation && operation.cancelRequested) throw cancelledError(this.api);
    };

    App.prototype._lockReadOnlyOperationForLocalApply = function lockReadOnlyOperationForLocalApply(label) {
      const operation = this.__obsReadOnlyOperation;
      if (!operation) return false;
      this._throwIfRepositoryReadCancelled();
      operation.cancelable = false;
      if (label) operation.label = String(label);
      this._setUi({ readOperation: publicReadOperation(operation) });
      return true;
    };

    App.prototype._applyVerifiedCategoryRecord = async function applyVerifiedCategoryRecord(record, workspace = this._activeWorkspace()) {
      if (!workspace) throw new Error('Select or create a GitHub workspace first.');
      const contextKey = this._categoryContextKey(workspace);
      const active = this._activeWorkspace();
      if (!active || this._categoryContextKey(active) !== contextKey) throw new Error('Workspace repository target changed before the verified category result could be applied.');
      const next = replaceCategoryDefinitionRecord(this.categorySnapshot, record);
      next.refreshedAt = new Date().toISOString();
      if (this.categoryStore) {
        if (typeof this.categoryStore.saveDefinitions === 'function') await this.categoryStore.saveDefinitions(contextKey, next);
        else await this.categoryStore.save(contextKey, next);
      }
      this.categorySnapshot = next;
      this.categoryContextWorkspaceId = workspace.id;
      this.categoryContextKey = contextKey;
      this.categoryContextsRequiringRefresh.delete(contextKey);
      this.categoryContextRequiresRefresh = false;
      this.categoryIndex = this.api.buildRepositoryCategoryIndex(next.definitions, { fileValidation: next.fileValidation, noteValidation: next.noteValidation });
      if (this.selectedCategoryId && !this.categoryIndex.categories.has(this.selectedCategoryId)) this.selectedCategoryId = '';
      if (this.repositoryPreview && this.repositoryPreview.path && this._sameRepositoryContext(this.repositoryPreview.context, workspace) && this.categoryIndex.explicitCategoryIdsForTarget) {
        this.fileCategoryDraftIds = this.categoryIndex.explicitCategoryIdsForTarget('file', this.repositoryPreview.path);
      }
      if (typeof this._hydrateNoteCategoryIntentsFromIndex === 'function') await this._hydrateNoteCategoryIntentsFromIndex(workspace);
      return this.categoryIndex.categories.get(record.definition && record.definition.id) || null;
    };

    App.prototype._refreshCategoriesUnlocked = async function responsiveCategoryRefresh(client, workspace) {
      const contextKey = this._categoryContextKey(workspace);
      const basePath = this._categoryBasePath(workspace);
      this._throwIfRepositoryReadCancelled();
      this._setCategoryRefreshProgress({ phase: 'listing', current: 0, total: 1, message: `Listing ${basePath}…` });
      const entries = await client.listDirectory(basePath, { missingAsEmpty: true, maxEntries: 100 });
      const markdownEntries = entries.filter((entry) => entry.type === 'file' && /\.md$/i.test(entry.name || entry.path));
      const previousDefinitions = this.categorySnapshot && this.categorySnapshot.definitions || [];
      const definitions = [];
      const diagnostics = [];
      let skipped = 0;
      let fetchedBytes = 0;
      let cachedCount = 0;
      let fetchedCount = 0;

      for (let index = 0; index < markdownEntries.length; index += 1) {
        this._throwIfRepositoryReadCancelled();
        const entry = markdownEntries[index];
        if (index === 0 || (index + 1) % 5 === 0 || index + 1 === markdownEntries.length) {
          this._setCategoryRefreshProgress({
            phase: 'definitions', current: index + 1, total: markdownEntries.length,
            message: `Categories: definitions ${index + 1}/${markdownEntries.length} · cached ${cachedCount} · fetched ${fetchedCount}`
          });
        }
        const cached = cachedCategoryDefinition(entry, previousDefinitions);
        if (cached) {
          definitions.push(cached);
          cachedCount += 1;
          continue;
        }
        if (Number(entry.size || 0) > CATEGORY_DEFINITION_FETCH_BYTE_LIMIT) {
          skipped += 1;
          diagnostics.push({ kind: 'oversized_definition', path: entry.path, message: `Category definition exceeds the ${CATEGORY_DEFINITION_FETCH_BYTE_LIMIT}-byte refresh limit.` });
          continue;
        }
        try {
          const file = await client.read(entry.path);
          this._throwIfRepositoryReadCancelled();
          const bytes = new TextEncoder().encode(file.content).byteLength;
          if (fetchedBytes + bytes > CATEGORY_DEFINITION_FETCH_BYTE_LIMIT) {
            const error = new Error(`Category refresh changed-definition reads exceeded the ${CATEGORY_DEFINITION_FETCH_BYTE_LIMIT}-byte prototype limit.`);
            error.kind = 'limit_exceeded';
            throw error;
          }
          fetchedBytes += bytes;
          fetchedCount += 1;
          if (!this.api.isCategoryDefinitionMarkdown(file.content)) {
            skipped += 1;
            diagnostics.push({ kind: 'ordinary_markdown_skipped', path: file.path, message: 'Markdown file has no obs-file-category marker and was skipped.' });
            continue;
          }
          try {
            definitions.push({ path: file.path, sha: file.sha, htmlUrl: file.htmlUrl, definition: this.api.decodeCategoryDefinition(file.content) });
          } catch (error) {
            diagnostics.push({ kind: 'malformed_definition', path: file.path, message: String(error && error.message || error) });
          }
        } catch (error) {
          if (error && (error.kind === 'aborted' || error.kind === 'limit_exceeded')) throw error;
          diagnostics.push({ kind: 'definition_read_error', path: entry.path, message: String(error && error.message || error), errorKind: String(error && error.kind || '') });
        }
      }

      const initialIndex = this.api.buildRepositoryCategoryIndex(definitions);
      const memberEntries = Array.from(initialIndex.memberships.values());
      const uniqueTargets = [];
      const seenTargets = new Set();
      for (const entry of memberEntries) {
        const key = `${entry.type}:${entry.path}`;
        if (seenTargets.has(key)) continue;
        seenTargets.add(key);
        uniqueTargets.push({ type: entry.type, path: entry.path });
      }
      uniqueTargets.sort((left, right) => left.path.localeCompare(right.path) || left.type.localeCompare(right.type));
      const selectedTargets = uniqueTargets.slice(0, CATEGORY_MEMBER_TARGET_LIMIT);
      const fileValidation = {};
      const noteValidation = {};
      const groups = boundedParentValidationGroups(selectedTargets, CATEGORY_PARENT_VALIDATION_LIMIT);

      let validatedParents = 0;
      for (const [parent, targets] of groups.selected) {
        this._throwIfRepositoryReadCancelled();
        validatedParents += 1;
        this._setCategoryRefreshProgress({
          phase: 'validation', current: validatedParents, total: groups.selected.length,
          message: `Categories: validating parent folders ${validatedParents}/${groups.selected.length} · ${parent || '/'}`
        });
        try {
          const directoryEntries = await client.listDirectory(parent, { missingAsEmpty: true, maxEntries: 200 });
          this._throwIfRepositoryReadCancelled();
          const files = new Set(directoryEntries.filter((entry) => entry.type === 'file').map((entry) => entry.path));
          for (const target of targets) {
            const targetMap = target.type === 'note' ? noteValidation : fileValidation;
            targetMap[target.path] = files.has(target.path)
              ? { status: 'verified', message: target.type === 'note' ? 'Repository Note file exists.' : 'Repository file exists.' }
              : { status: 'missing', message: `${target.type === 'note' ? 'Repository Note' : 'Repository file'} does not exist: ${target.path}.` };
          }
        } catch (error) {
          if (error && error.kind === 'aborted') throw error;
          for (const target of targets) {
            const targetMap = target.type === 'note' ? noteValidation : fileValidation;
            targetMap[target.path] = { status: 'inaccessible', message: String(error && error.message || error) };
          }
        }
      }

      for (const [, targets] of groups.deferred) {
        for (const target of targets) {
          const targetMap = target.type === 'note' ? noteValidation : fileValidation;
          targetMap[target.path] = { status: 'unchecked', message: `Target was not checked because the ${CATEGORY_PARENT_VALIDATION_LIMIT}-parent validation request limit was reached.` };
        }
      }
      if (groups.deferred.length) {
        diagnostics.push({
          kind: 'incomplete_parent_validation', path: basePath,
          message: `Validated ${groups.selected.length} of ${groups.totalParents} unique parent folders; remaining membership targets are visible as unchecked.`
        });
      }
      if (uniqueTargets.length > CATEGORY_MEMBER_TARGET_LIMIT) {
        for (const target of uniqueTargets.slice(CATEGORY_MEMBER_TARGET_LIMIT)) {
          const targetMap = target.type === 'note' ? noteValidation : fileValidation;
          targetMap[target.path] = { status: 'unchecked', message: `Target was not checked because the ${CATEGORY_MEMBER_TARGET_LIMIT}-target validation limit was reached.` };
        }
        diagnostics.push({ kind: 'incomplete_member_validation', path: basePath, message: `Validated at most ${CATEGORY_MEMBER_TARGET_LIMIT} of ${uniqueTargets.length} unique file/Note category targets.` });
      }

      this._throwIfRepositoryReadCancelled();
      this._lockReadOnlyOperationForLocalApply('Applying verified category refresh locally…');
      const refreshedAt = new Date().toISOString();
      const snapshot = {
        definitions,
        diagnostics,
        fileValidation,
        noteValidation,
        groups: this.categorySnapshot && this.categorySnapshot.groups || {},
        refreshedAt
      };
      this._setCategoryRefreshProgress({ phase: 'cache', current: 1, total: 1, message: 'Categories: storing the verified derived snapshot locally…' });
      if (this.categoryStore) {
        if (typeof this.categoryStore.saveDefinitions === 'function') await this.categoryStore.saveDefinitions(contextKey, snapshot);
        else await this.categoryStore.save(contextKey, snapshot);
      }
      const currentWorkspace = this._activeWorkspace();
      if (!currentWorkspace || this._categoryContextKey(currentWorkspace) !== contextKey) throw new Error('Workspace repository target changed before category refresh completed. Results were not applied.');
      this.categorySnapshot = snapshot;
      this.categoryContextWorkspaceId = workspace.id;
      this.categoryContextKey = contextKey;
      this.categoryContextsRequiringRefresh.delete(contextKey);
      this.categoryContextRequiresRefresh = false;
      this.categoryIndex = this.api.buildRepositoryCategoryIndex(definitions, { fileValidation, noteValidation });
      if (this.selectedCategoryId && !this.categoryIndex.categories.has(this.selectedCategoryId)) this.selectedCategoryId = '';
      if (this.repositoryPreview && this.repositoryPreview.path && this._sameRepositoryContext(this.repositoryPreview.context, workspace) && this.categoryIndex.explicitCategoryIdsForTarget) {
        this.fileCategoryDraftIds = this.categoryIndex.explicitCategoryIdsForTarget('file', this.repositoryPreview.path);
      }
      await this._hydrateNoteCategoryIntentsFromIndex(workspace);
      this.surface = 'categories';
      const issueCount = diagnostics.length + this.categoryIndex.errors.length;
      const summary = `definitions ${definitions.length}; cached ${cachedCount}; fetched ${fetchedCount}; skipped ${skipped}; issues ${issueCount}; validated targets ${Math.min(uniqueTargets.length, CATEGORY_MEMBER_TARGET_LIMIT)}/${uniqueTargets.length}; parent reads ${groups.selected.length}/${groups.totalParents}`;
      this._setUi({ categoryRefreshSummary: summary, status: `Category refresh complete: ${summary}. No remote writes were performed.` });
      return { definitions: definitions.length, cached: cachedCount, fetched: fetchedCount, skipped, errors: diagnostics.length, modelErrors: this.categoryIndex.errors.length, diagnostics: [...diagnostics, ...this.categoryIndex.errors] };
    };

    App.prototype.saveCategory = function responsiveSaveCategory(input = {}) {
      return this._runRemoteOperation('Saving and verifying category definition…', async () => {
        const workspace = this._requireCategoryContext();
        const client = await this._client(workspace);
        const id = this.api.normalizeCategoryId(input.id || input.name);
        const existing = this._categoryDefinitionRecord(id);
        const path = existing ? existing.path : `${this._categoryBasePath(workspace)}/${this.api.categoryFileName(id)}`;
        if (!existing) {
          try {
            await this._repositoryEntryMetadata(client, path);
            throw new Error(`Category target already exists and was not overwritten: ${path}`);
          } catch (error) {
            if (error.kind !== 'not_found') throw error;
          }
        }
        const previous = existing ? existing.definition : { files: [], notes: [], impliedCategories: [] };
        const requestedImplied = this._categoryLinksForIds(path, input.impliedCategoryIds || []);
        const unresolvedPrevious = (previous.impliedCategories || []).filter((link) => {
          try {
            const targetPath = this.api.normalizeRepositoryTarget(path, link.target).path;
            return !this.categoryIndex.byPath.has(targetPath);
          } catch (error) { return true; }
        });
        const impliedCategories = [...requestedImplied];
        for (const link of unresolvedPrevious) if (!impliedCategories.some((item) => item.target === link.target)) impliedCategories.push(link);
        const selectedTargets = Array.isArray(input.selectedTargets) ? input.selectedTargets : this.categoryDraftTargets;
        const members = await this._categoryMemberLinks(path, selectedTargets, workspace);
        const content = this.api.encodeCategoryDefinition({
          id,
          name: input.name,
          description: input.description,
          impliedCategories,
          files: members.files,
          notes: members.notes
        });
        const verified = await client.saveVerified({
          path,
          content,
          baseSha: existing ? existing.sha : '',
          message: `${existing ? 'Update' : 'Create'} repository category ${input.name || id}`
        });
        const definition = this.api.decodeCategoryDefinition(content);
        await this._applyVerifiedCategoryRecord({ path: verified.path || path, sha: verified.sha || '', htmlUrl: verified.htmlUrl || '', definition }, workspace);
        this.selectedCategoryId = id;
        const saved = this.categoryIndex.categories.get(id);
        this.categoryDraftTargets = saved ? [
          ...(saved.explicitFiles || []).map((item) => ({ type: 'file', path: item.path, name: item.label || item.path, label: item.label || item.path })),
          ...(saved.explicitNotes || []).map((item) => ({ type: 'note', path: item.path, noteId: item.noteId || '', name: item.label || item.path, label: item.label || item.path }))
        ] : [];
        if (input.group !== undefined) await this.setCategoryGroup(id, input.group, { silent: true });
        this.feedback = this.feedback.filter((item) => item.scope !== 'categories');
        this._pushFeedback({ id: 'category-save-success', scope: 'categories', severity: 'success', title: 'Category saved', message: `${input.name || id} and ${this.categoryDraftTargets.length} membership target(s) were verified by read-back. Full category refresh was not required.` });
        this._setUi({ replaceCategoryEditor: true, status: `Category ${input.name || id} saved and verified; local category index updated from the verified definition.` });
        return saved;
      });
    };

    App.prototype._writeCategoryMembership = async function responsiveWriteCategoryMembership(categoryId, filePath, remove) {
      const workspace = this._requireCategoryContext();
      const record = this._categoryDefinitionRecord(categoryId);
      if (!record) throw new Error(`Category not found: ${categoryId}. Refresh categories first.`);
      const canonicalFile = remove
        ? this.api.normalizeCanonicalRepositoryPath(filePath, 'Categorized repository file')
        : this._assertCategoryAssignmentTarget(filePath, workspace);
      const kept = [];
      let found = false;
      for (const link of record.definition.files || []) {
        let resolved = '';
        try { resolved = this.api.normalizeRepositoryTarget(record.path, link.target).path; } catch (error) { kept.push(link); continue; }
        if (resolved === canonicalFile) { found = true; if (!remove) kept.push(link); }
        else kept.push(link);
      }
      if (remove && !found) return record.indexed;
      if (!remove && !found) kept.push({ label: canonicalFile.slice(canonicalFile.lastIndexOf('/') + 1), target: this.api.repositoryRelativePath(record.path, canonicalFile) });
      const content = this.api.encodeCategoryDefinition({
        id: record.definition.id,
        name: record.definition.name,
        description: record.definition.description,
        impliedCategories: record.definition.impliedCategories,
        files: kept,
        notes: record.definition.notes || []
      });
      const client = await this._client(workspace);
      const verified = await client.saveVerified({
        path: record.path,
        content,
        baseSha: record.sha,
        message: `${remove ? 'Remove' : 'Add'} ${canonicalFile} ${remove ? 'from' : 'to'} category ${record.definition.name}`
      });
      await this._applyVerifiedCategoryRecord({ path: verified.path || record.path, sha: verified.sha || '', htmlUrl: verified.htmlUrl || record.htmlUrl || '', definition: this.api.decodeCategoryDefinition(content) }, workspace);
      this.selectedCategoryId = categoryId;
      this._setUi({ status: `${canonicalFile} ${remove ? 'removed from' : 'assigned to'} ${record.definition.name}; verified definition applied locally without a full category refresh.` });
      return this.categoryIndex.categories.get(categoryId);
    };

    App.prototype.applyFileCategories = function responsiveApplyFileCategories(filePath, ids = this.fileCategoryDraftIds) {
      return this._runRemoteOperation('Applying file category memberships…', async () => {
        const workspace = this._requireCategoryContext();
        const canonical = this._assertCategoryAssignmentTarget(filePath, workspace);
        const desiredList = this.api.normalizeCategoryIds
          ? this.api.normalizeCategoryIds(ids)
          : [...new Set((Array.isArray(ids) ? ids : []).map((id) => String(id || '').trim()).filter(Boolean))];
        for (const id of desiredList) if (!this.categoryIndex.categories.has(id)) throw new Error(`Category not found: ${id}. Refresh categories first.`);
        const desired = new Set(desiredList);
        const current = new Set(this.categoryIndex.explicitCategoryIdsForTarget ? this.categoryIndex.explicitCategoryIdsForTarget('file', canonical) : []);
        const changes = [...new Set([...desired, ...current])].filter((id) => desired.has(id) !== current.has(id));
        const results = [];
        for (const categoryId of changes) {
          try {
            await this._writeCategoryMembership(categoryId, canonical, !desired.has(categoryId));
            results.push({ target: categoryId, status: 'completed', message: desired.has(categoryId) ? 'File assigned and verified.' : 'File unassigned and verified.' });
          } catch (error) {
            results.push({ target: categoryId, status: 'failed', message: String(error && error.message || error) });
          }
        }
        const failures = results.filter((result) => result.status === 'failed');
        const explicit = this.categoryIndex.explicitCategoryIdsForTarget ? this.categoryIndex.explicitCategoryIdsForTarget('file', canonical) : [];
        this.fileCategoryDraftIds = failures.length ? desiredList : explicit;
        this.surface = 'files';
        if (failures.length) {
          const error = new Error(`${failures.length} file category update(s) failed. Completed changes remain verified; the requested selection is preserved for review/retry.`);
          error.kind = 'partial_category_update';
          error.partialResults = results;
          throw error;
        }
        this._setUi({ replaceFileCategoryIds: true, status: changes.length ? `${changes.length} file category membership change(s) verified; local category index updated without a full refresh.` : 'File category memberships were already up to date.' });
        return results;
      });
    };

    App.prototype._setNoteMembershipInCategory = async function responsiveSetNoteMembership(categoryId, note, shouldInclude, client, workspace) {
      const record = this._categoryDefinitionRecord(categoryId);
      if (!record) throw new Error(`Category not found: ${categoryId}. Refresh categories first.`);
      const remoteNote = this.api.normalizeRemote(note.remote);
      if (!this.api.hasRemoteTargetIdentity(remoteNote) || !this._sameRepositoryContext(remoteNote, workspace)) throw new Error(`Note ${note.title || note.id} is not verified in the active category repository and branch.`);
      const latestFile = await client.read(record.path);
      const definition = this.api.decodeCategoryDefinition(latestFile.content);
      const kept = [];
      let found = false;
      for (const link of definition.notes || []) {
        let resolved = '';
        try { resolved = this.api.normalizeRepositoryTarget(record.path, link.target).path; } catch (error) { kept.push(link); continue; }
        if (resolved === remoteNote.path) { found = true; if (shouldInclude) kept.push({ ...link, noteId: note.id, label: note.title || note.id }); }
        else kept.push(link);
      }
      if (shouldInclude && !found) kept.push({ label: note.title || note.id, target: this.api.repositoryRelativePath(record.path, remoteNote.path), noteId: note.id });
      if (!shouldInclude && !found) {
        await this._applyVerifiedCategoryRecord({ path: latestFile.path || record.path, sha: latestFile.sha || '', htmlUrl: latestFile.htmlUrl || record.htmlUrl || '', definition }, workspace);
        return { target: categoryId, status: 'unchanged', message: 'Note was not an explicit member.' };
      }
      const content = this.api.encodeCategoryDefinition({
        id: definition.id,
        name: definition.name,
        description: definition.description,
        impliedCategories: definition.impliedCategories || [],
        files: definition.files || [],
        notes: kept
      });
      if (content === latestFile.content) {
        await this._applyVerifiedCategoryRecord({ path: latestFile.path || record.path, sha: latestFile.sha || '', htmlUrl: latestFile.htmlUrl || record.htmlUrl || '', definition }, workspace);
        return { target: categoryId, status: 'unchanged', message: 'Membership already matched.' };
      }
      const verified = await client.saveVerified({
        path: record.path,
        content,
        baseSha: latestFile.sha,
        message: `${shouldInclude ? 'Add' : 'Remove'} Note ${note.title || note.id} ${shouldInclude ? 'to' : 'from'} category ${definition.name}`
      });
      await this._applyVerifiedCategoryRecord({ path: verified.path || record.path, sha: verified.sha || '', htmlUrl: verified.htmlUrl || latestFile.htmlUrl || '', definition: this.api.decodeCategoryDefinition(content) }, workspace);
      return { target: categoryId, status: 'completed', message: shouldInclude ? 'Note assigned and verified.' : 'Note unassigned and verified.' };
    };

    App.prototype._syncNoteCategories = async function responsiveSyncNoteCategories(note) {
      const desired = new Set(this.api.normalizeCategoryIds ? this.api.normalizeCategoryIds(note.categoryIds) : (note.categoryIds || []));
      const categoryContextCurrent = Boolean(
        this.categoryContextKey
        && !this.categoryContextRequiresRefresh
        && this.categoryContextKey === this._categoryContextKey(this._activeWorkspace())
      );
      if (!desired.size && !categoryContextCurrent) return [];
      if (!this.categoryIndex || !this.categoryIndex.explicitCategoryIdsForTarget) return [];
      const workspace = this._requireCategoryContext();
      const remote = this.api.normalizeRemote(note.remote);
      if (!this.api.hasRemoteTargetIdentity(remote) || !this._sameRepositoryContext(remote, workspace)) throw new Error('Note category membership requires a verified Note in the active repository and branch.');
      const current = new Set(this.categoryIndex.explicitCategoryIdsForTarget('note', remote.path));
      const changes = [...new Set([...desired, ...current])].filter((id) => desired.has(id) !== current.has(id));
      if (!changes.length) {
        if (note.categoryIntentPending) {
          const settled = this.api.updateNote(note, { categoryIntentPending: false });
          await this.store.put(settled);
          if (this.current && this.current.id === settled.id) this.current = settled;
        }
        return [];
      }
      const client = await this._client(workspace);
      const results = [];
      for (const categoryId of changes) {
        try { results.push(await this._setNoteMembershipInCategory(categoryId, note, desired.has(categoryId), client, workspace)); }
        catch (error) { results.push({ target: categoryId, status: 'failed', message: String(error && error.message || error) }); }
      }
      const failures = results.filter((result) => result.status === 'failed');
      if (failures.length) {
        const pending = this.api.updateNote(note, { categoryIntentPending: true });
        await this.store.put(pending);
        if (this.current && this.current.id === pending.id) this.current = pending;
        const error = new Error(`Note was saved, but ${failures.length} category membership update(s) failed.`);
        error.kind = 'partial_category_update';
        error.partialResults = results;
        throw error;
      }
      const settled = this.api.updateNote(note, { categoryIntentPending: false });
      await this.store.put(settled);
      if (this.current && this.current.id === settled.id) this.current = settled;
      return results;
    };

    return true;
  }

  function patchLinkedNotesUi(api) {
    const UI = api && api.LinkedNotesUI;
    if (!UI || !UI.prototype || UI.prototype.__obsRuntimeResponsivenessPatched) return false;
    Object.defineProperty(UI.prototype, '__obsRuntimeResponsivenessPatched', { value: true, configurable: false });
    const originalRender = UI.prototype.render;

    UI.prototype.render = function responsiveRender() {
      const result = originalRender.call(this);
      if (!this.shadow) return result;
      const busy = Boolean(this.state && this.state.busy);
      const operation = this.state && this.state.readOperation;
      const launcher = this.shadow.querySelector('[data-action="toggle"]');
      if (launcher) {
        launcher.disabled = false;
        launcher.textContent = busy ? 'Docs ⟳' : 'Docs';
        launcher.title = busy ? formatReadOperation(operation || { active: true, label: this.state.status || 'Repository operation in progress' }) : 'Repository Documentation Workspace';
        launcher.onclick = async () => {
          await this.persistAllDraftsNow();
          if (!this.open && !busy) await this._call('onOpen');
          this.open = !this.open;
          this.render();
        };
      }
      this.shadow.querySelectorAll('[data-action="close"]').forEach((close) => {
        close.disabled = false;
        close.onclick = async () => {
          await this.persistAllDraftsNow();
          this.open = false;
          this.render();
        };
      });

      if (operation && operation.active) {
        const bar = this.shadow.querySelector('.workspace-bar');
        if (bar) {
          const row = (this.shadow.ownerDocument || document).createElement('div');
          row.dataset.runtimeOperation = 'true';
          row.style.gridColumn = '1 / -1';
          row.style.display = 'flex';
          row.style.alignItems = 'center';
          row.style.gap = '8px';
          row.style.minWidth = '0';
          const label = (this.shadow.ownerDocument || document).createElement('span');
          label.style.flex = '1 1 auto';
          label.style.minWidth = '0';
          label.style.overflow = 'hidden';
          label.style.textOverflow = 'ellipsis';
          label.style.whiteSpace = 'nowrap';
          label.style.color = 'var(--muted)';
          label.textContent = formatReadOperation(operation);
          row.appendChild(label);
          const cancel = (this.shadow.ownerDocument || document).createElement('button');
          cancel.dataset.runtimeCancelRead = 'true';
          cancel.textContent = operation.cancelRequested ? 'Cancelling…' : operation.cancelable === false ? 'Applying locally…' : 'Cancel read';
          cancel.disabled = Boolean(operation.cancelRequested || !operation.cancelable);
          cancel.onclick = () => this._call('onCancelReadOnlyOperation');
          row.appendChild(cancel);
          bar.appendChild(row);
        }
      }
      return result;
    };
    return true;
  }

  function patchMount(api) {
    if (!api || typeof api.mountLinkedNotesPrototype !== 'function' || api.mountLinkedNotesPrototype.__obsRuntimeResponsivenessPatched) return false;
    const originalMount = api.mountLinkedNotesPrototype;
    const wrapped = async function responsiveMountLinkedNotesPrototype(...args) {
      const app = await originalMount.apply(this, args);
      if (app && app.ui && app.ui.handlers) app.ui.handlers.onCancelReadOnlyOperation = () => app.cancelReadOnlyOperation();
      if (app && typeof app._setUi === 'function') app._setUi({ readOperation: null, categoryRefreshProgress: null });
      return app;
    };
    Object.defineProperty(wrapped, '__obsRuntimeResponsivenessPatched', { value: true });
    api.mountLinkedNotesPrototype = wrapped;
    return true;
  }

  function installLinkedNotesRuntimeResponsiveness(api = root.ObsLinkedNotes || {}) {
    if (!api) return false;
    if (!api[INSTALL_FLAG]) Object.defineProperty(api, INSTALL_FLAG, { value: true, configurable: false });
    api.createGmTransport = (gmRequest) => createAbortableGmTransport(gmRequest, api);
    const appPatched = patchLinkedNotesApp(api);
    const uiPatched = patchLinkedNotesUi(api);
    const mountPatched = patchMount(api);
    return Boolean(appPatched || uiPatched || mountPatched);
  }

  return {
    CATEGORY_DEFINITION_FETCH_BYTE_LIMIT,
    CATEGORY_MEMBER_TARGET_LIMIT,
    CATEGORY_PARENT_VALIDATION_LIMIT,
    createAbortableGmTransport,
    replaceCategoryDefinitionRecord,
    cachedCategoryDefinition,
    boundedParentValidationGroups,
    formatReadOperation,
    installLinkedNotesRuntimeResponsiveness
  };
});
