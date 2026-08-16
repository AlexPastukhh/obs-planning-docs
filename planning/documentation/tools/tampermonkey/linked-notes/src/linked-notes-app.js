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
      this.clipboardWriter = options.clipboardWriter || ((text) => {
        const writer = this.api && this.api.writeTampermonkeyClipboardText;
        if (typeof writer !== 'function') return Promise.reject(new Error('Clipboard writer is unavailable.'));
        return writer(text);
      });
      this.confirmAction = options.confirmAction || ((message) => (typeof window !== 'undefined' && typeof window.confirm === 'function' ? window.confirm(message) : false));
      this.locationProvider = options.locationProvider || (() => (typeof location !== 'undefined' ? location : { pathname: '' }));
      this.setIntervalFn = options.setIntervalFn || ((fn, ms) => setInterval(fn, ms));
      this.clearIntervalFn = options.clearIntervalFn || ((id) => clearInterval(id));
      this.routePollMs = options.routePollMs || 750;
      this.store = options.store || new api.IndexedDbNoteStore();
      this.pendingAssetStore = options.pendingAssetStore || (api.PendingNoteAssetStore ? new api.PendingNoteAssetStore() : null);
      this.workspaceStore = options.workspaceStore || (api.WorkspaceStore ? new api.WorkspaceStore({ api, getValue: this.getValue, setValue: this.setValue }) : null);
      this.categoryStore = options.categoryStore || (api.CategoryCacheStore ? new api.CategoryCacheStore({ getValue: this.getValue, setValue: this.setValue }) : null);
      this.ui = options.ui || new api.LinkedNotesUI({
        onNew: () => this.newNote(),
        onSelect: (id) => this.selectNote(id),
        onSearch: (query) => this.refreshList(query),
        onDraftChange: (note) => this.saveDraft(note),
        onOpen: () => this.openPanel(),
        onRefreshRemote: () => this.refreshRemoteWorkspace(),
        onSetSurface: (surface) => this.setSurface(surface),
        onBrowseRepository: (path) => this.browseRepository(path),
        onOpenRepositoryEntry: (entry) => this.openRepositoryEntry(entry),
        onOpenRepositoryFileInGitHub: (path) => this.openRepositoryFileInGitHub(path),
        onBeginRepositoryFileCreate: () => this.beginRepositoryFileCreate(),
        onBeginRepositoryFolderCreate: () => this.beginRepositoryFolderCreate(),
        onBeginRepositoryFileEdit: () => this.beginRepositoryFileEdit(),
        onCancelRepositoryEditor: () => this.cancelRepositoryEditor(),
        onSaveRepositoryEditor: (input) => this.saveRepositoryEditor(input),
        onApplyFileCategories: (path, ids) => this.applyFileCategories(path, ids),
        onCopyRepositoryHeadingLink: (item) => {
          const markdown = item && item.markdown ? String(item.markdown) : '';
          if (!markdown) return Promise.reject(new Error('Heading link is unavailable.'));
          return this.clipboardWriter(markdown);
        },
        onRefreshCategories: () => this.refreshCategories(),
        onSelectCategory: (id) => this.selectCategory(id),
        onSaveCategory: (category) => this.saveCategory(category),
        onAssignCategory: (categoryId, path) => this.assignCategory(categoryId, path),
        onUnassignCategory: (categoryId, path) => this.unassignCategory(categoryId, path),
        onSetCategoryGroup: (categoryId, groupName) => this.setCategoryGroup(categoryId, groupName),
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
        onOpenLink: (linkId) => this.openLink(linkId),
        onSetNoteViewMode: (mode, note) => this.setNoteViewMode(mode, note),
        onSetFileViewMode: (mode) => this.setFileViewMode(mode),
        onOpenRenderedLink: (target, source) => this.openRenderedLink(target, source),
        onOpenTargetPicker: (request) => this.openTargetPicker(request),
        onCloseTargetPicker: () => this.closeTargetPicker(),
        onSetTargetPickerTab: (tab) => this.setTargetPickerTab(tab),
        onBrowseTargetPicker: (path) => this.browseTargetPicker(path),
        onSearchTargetPicker: (query, depth) => this.searchTargetPicker(query, depth),
        onToggleTargetPicker: (target) => this.toggleTargetPickerTarget(target),
        onApplyTargetPicker: (input) => this.applyTargetPicker(input),
        onSetNoteCategories: (note, ids) => this.setNoteCategoryIntent(note, ids),
        onInsertImage: (note, input) => this.insertNoteImage(note, input),
        onRemovePendingImage: (note, assetId) => this.removePendingNoteImage(note, assetId),
        onUpdateTransferDraft: (input) => this.updateTransferDraft(input),
        onPrepareTransfer: (note, input) => this.prepareTransfer(note, input),
        onExecuteTransfer: (note) => this.executePreparedTransfer(note),
        onTransferNote: (note, input) => this.transferNoteToMarkdown(note, input),
        onDismissFeedback: (id) => this.dismissFeedback(id),
        onFeedbackAction: (id) => this.runFeedbackAction(id)
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
      this.surface = 'notes';
      this.repositoryPath = '';
      this.repositoryEntries = [];
      this.repositoryPreview = null;
      this.repositoryBrowseLoaded = false;
      this.repositoryEditor = { mode: 'none', parentPath: '', path: '', name: '', content: '', baseSha: '' };
      this.fileCategoryDraftIds = [];
      this.categorySnapshot = { definitions: [], diagnostics: [], fileValidation: {}, noteValidation: {}, groups: {}, refreshedAt: '' };
      this.categoryIndex = this._emptyCategoryIndex();
      this.selectedCategoryId = '';
      this.categoryContextWorkspaceId = '';
      this.categoryContextKey = '';
      this.categoryContextRequiresRefresh = false;
      this.categoryContextsRequiringRefresh = new Set();
      this.workspaceContextGeneration = 0;
      this.noteRelationIndex = this.api.buildNoteRelationIndex ? this.api.buildNoteRelationIndex([]) : null;
      this.noteViewMode = 'edit';
      this.fileViewMode = 'rendered';
      this.noteRendered = null;
      this.fileRendered = null;
      this.mediaLoaders = { note: null, file: null };
      this.feedback = [];
      this.targetPicker = { open: false, mode: '', tab: 'files', query: '', depth: '2', currentPath: '', entries: [], fileResults: [], noteResults: [], selected: [], truncated: false, summary: '', cursorStart: 0, cursorEnd: 0 };
      this.categoryDraftTargets = [];
      this.pendingAssets = [];
      this.transferDraft = { targetPath: '', targetDirectory: '', fileName: 'copied-note.md', mode: 'create', plan: null };
      this.transferPlan = null;
      this.transferRetry = null;
      this.noteMarkdownRetry = null;
      this.feedbackActionHandlers = new Map();
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


    _categoryContextKey(workspace = this._activeWorkspace()) {
      if (!workspace) return '';
      if (typeof this.api.workspaceCategoryContextKey === 'function') return this.api.workspaceCategoryContextKey(workspace);
      return JSON.stringify([workspace.id, String(workspace.owner || '').toLowerCase(), String(workspace.repo || '').toLowerCase(), workspace.branch || 'main', workspace.categoryBasePath || this.api.DEFAULT_CATEGORY_BASE_PATH || 'categories']);
    }

    _workspaceRuntimeContextKey(workspace = this._activeWorkspace()) {
      if (!workspace) return '';
      return JSON.stringify([
        String(workspace.id || '').trim(),
        String(workspace.owner || '').trim().toLowerCase(),
        String(workspace.repo || '').trim().replace(/\.git$/i, '').toLowerCase(),
        String(workspace.branch || 'main').trim() || 'main',
        String(workspace.basePath || '').trim(),
        String(workspace.categoryBasePath || this.api.DEFAULT_CATEGORY_BASE_PATH || 'categories').trim()
      ]);
    }

    _sameRepositoryContext(left, right) {
      if (typeof this.api.sameRepositoryContext === 'function') return this.api.sameRepositoryContext(left, right);
      if (!left || !right) return false;
      return String(left.owner || '').toLowerCase() === String(right.owner || '').toLowerCase()
        && String(left.repo || '').replace(/\.git$/i, '').toLowerCase() === String(right.repo || '').replace(/\.git$/i, '').toLowerCase()
        && String(left.branch || 'main') === String(right.branch || 'main');
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
      if (!workspace) return {
        id: '', name: '', repositoryInput: '', branch: 'main',
        basePath: this.api.DEFAULT_WORKSPACE_BASE_PATH || 'prototype-fixtures/linked-notes',
        categoryBasePath: this.api.DEFAULT_CATEGORY_BASE_PATH || 'categories'
      };
      return {
        id: workspace.id,
        name: workspace.name,
        repositoryInput: `${workspace.owner}/${workspace.repo}`,
        branch: workspace.branch,
        basePath: workspace.basePath,
        categoryBasePath: workspace.categoryBasePath || this.api.DEFAULT_CATEGORY_BASE_PATH || 'categories'
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


    _categoryUiState() {
      const categories = this.categoryIndex && this.categoryIndex.categories
        ? Array.from(this.categoryIndex.categories.values()).map((category) => ({
          id: category.id,
          name: category.name,
          description: category.description || '',
          path: category.path,
          sha: category.sha || '',
          htmlUrl: category.htmlUrl || '',
          explicitFileCount: (category.explicitFiles || []).length,
          explicitNoteCount: (category.explicitNotes || []).length,
          impliedCategoryIds: category.impliedCategoryIds || [],
          brokenLinks: category.brokenLinks || [],
          group: this.categorySnapshot.groups && this.categorySnapshot.groups[category.id] || ''
        })).sort((left, right) => left.name.localeCompare(right.name))
        : [];
      const selected = categories.find((category) => category.id === this.selectedCategoryId) || null;
      const selectedRecord = selected && this.categoryIndex.categories ? this.categoryIndex.categories.get(selected.id) : null;
      const activeWorkspace = this._activeWorkspace();
      const previewContext = this.repositoryPreview && this.repositoryPreview.context;
      const categoryAssignmentAllowed = Boolean(
        selected
        && this.repositoryPreview
        && this.repositoryPreview.path
        && activeWorkspace
        && this._sameRepositoryContext(previewContext, activeWorkspace)
        && this.categoryContextKey
        && this.categoryContextKey === this._categoryContextKey(activeWorkspace)
        && !this.categoryContextRequiresRefresh
      );
      const indexedSelectedTargets = selectedRecord ? [
        ...(selectedRecord.explicitFiles || []).map((item) => ({ type: 'file', path: item.path, name: item.label || item.path, label: item.label || item.path })),
        ...(selectedRecord.explicitNotes || []).map((item) => ({ type: 'note', path: item.path, noteId: item.noteId || '', name: item.label || item.path, label: item.label || item.path }))
      ] : [];
      const selectedTargets = [...this.categoryDraftTargets];
      const noteCategoryIds = this.current
        ? (this.api.normalizeCategoryIds ? this.api.normalizeCategoryIds(this.current.categoryIds) : (this.current.categoryIds || []))
        : [];
      const backlinks = this.current && this.noteRelationIndex && this.noteRelationIndex.incomingForNote
        ? this.noteRelationIndex.incomingForNote(this.current.id)
        : [];
      const filePreviewSameWorkspace = Boolean(
        this.repositoryPreview
        && this.repositoryPreview.path
        && activeWorkspace
        && this._sameRepositoryContext(this.repositoryPreview.context, activeWorkspace)
      );
      const fileEditAllowed = Boolean(filePreviewSameWorkspace && this.repositoryPreview.kind === 'text');
      const fileCategoryAssignmentAllowed = Boolean(
        filePreviewSameWorkspace
        && this.categoryContextKey
        && this.categoryContextKey === this._categoryContextKey(activeWorkspace)
        && !this.categoryContextRequiresRefresh
      );
      return {
        surface: this.surface,
        repositoryPath: this.repositoryPath,
        repositoryEntries: this.repositoryEntries,
        repositoryBreadcrumbs: this.api.repositoryBreadcrumbs ? this.api.repositoryBreadcrumbs(this.repositoryPath) : [],
        repositoryPreview: this.repositoryPreview,
        repositoryEditor: this.repositoryEditor,
        fileCategoryIds: this.fileCategoryDraftIds,
        fileEditAllowed,
        fileCategoryAssignmentAllowed,
        fileViewMode: this.fileViewMode,
        fileRendered: this.fileRendered,
        noteViewMode: this.noteViewMode,
        noteRendered: this.noteRendered,
        feedback: this.feedback,
        targetPicker: this.targetPicker,
        categories,
        noteCategoryIds,
        noteBacklinks: backlinks,
        selectedCategoryId: selected ? selected.id : '',
        categoryEditor: selected ? {
          id: selected.id,
          name: selected.name,
          description: selected.description,
          impliedCategoryIds: selected.impliedCategoryIds,
          group: selected.group,
          selectedTargets
        } : { id: '', name: '', description: '', impliedCategoryIds: [], group: '', selectedTargets: [] },
        categoryFiles: selectedRecord && this.categoryIndex.filesForCategory ? this.categoryIndex.filesForCategory(selected.id) : [],
        categoryNotes: selectedRecord && this.categoryIndex.notesForCategory ? this.categoryIndex.notesForCategory(selected.id) : [],
        categoryErrors: [
          ...(Array.isArray(this.categorySnapshot.diagnostics) ? this.categorySnapshot.diagnostics : []),
          ...(this.categoryIndex && Array.isArray(this.categoryIndex.errors) ? this.categoryIndex.errors : [])
        ],
        categoryRefreshedAt: this.categorySnapshot.refreshedAt || '',
        categoryAssignmentAllowed,
        pendingAssets: this.pendingAssets,
        transferDraft: this.transferDraft
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

    _feedbackScope() {
      return this.surface === 'files' ? 'files' : this.surface === 'categories' ? 'categories' : 'notes';
    }

    _pushFeedback(feedback) {
      const item = this.api.createFeedback ? this.api.createFeedback(feedback) : { id: feedback.id || `feedback-${Date.now()}`, scope: feedback.scope || this._feedbackScope(), severity: feedback.severity || 'error', title: feedback.title || 'Status', message: feedback.message || '', target: feedback.target || '', details: feedback.details || '', actions: feedback.actions || [], partialResults: feedback.partialResults || [], dismissible: true };
      this.feedback = this.api.replaceFeedback ? this.api.replaceFeedback(this.feedback, item) : [...this.feedback.filter((existing) => existing.id !== item.id), item];
      return item;
    }

    dismissFeedback(id) {
      const item = this.feedback.find((feedback) => feedback && feedback.id === id);
      for (const action of item && Array.isArray(item.actions) ? item.actions : []) this.feedbackActionHandlers.delete(action.id);
      this.feedback = this.api.dismissFeedback ? this.api.dismissFeedback(this.feedback, id) : this.feedback.filter((feedback) => feedback.id !== id);
      this._setUi();
    }

    _feedbackAction(id, label, handler) {
      const actionId = String(id || '').trim();
      if (!actionId || typeof handler !== 'function') throw new Error('A feedback action requires an ID and handler.');
      this.feedbackActionHandlers.set(actionId, handler);
      return { id: actionId, label: String(label || 'Retry') };
    }

    _attachFeedbackActions(error, actions = []) {
      if (!error || typeof error !== 'object') return error;
      error.feedbackActions = actions.filter(Boolean);
      return error;
    }

    async runFeedbackAction(id) {
      const actionId = String(id || '').trim();
      const handler = this.feedbackActionHandlers.get(actionId);
      if (!handler) throw new Error(`Feedback action is no longer available: ${actionId || 'unknown'}.`);
      return handler();
    }

    _feedbackFromError(error, input = {}) {
      const item = this.api.feedbackFromError
        ? this.api.feedbackFromError(error, { scope: input.scope || this._feedbackScope(), ...input })
        : { id: input.id || 'last-error', scope: input.scope || this._feedbackScope(), severity: 'error', title: input.title || 'Action failed', message: String(error && error.message || error), target: input.target || '', details: String(error && error.kind || ''), actions: input.actions || [], partialResults: error && error.partialResults || [] };
      this._pushFeedback(item);
      this._setUi({ status: `Error: ${item.message}` });
      return item;
    }

    _disposeMediaLoader(kind) {
      const key = kind === 'file' ? 'file' : 'note';
      const loader = this.mediaLoaders && this.mediaLoaders[key];
      if (loader && typeof loader.dispose === 'function') loader.dispose();
      if (!this.mediaLoaders) this.mediaLoaders = { note: null, file: null };
      this.mediaLoaders[key] = null;
    }

    _disposeAllMediaLoaders() {
      this._disposeMediaLoader('note');
      this._disposeMediaLoader('file');
    }

    _setUi(patch = {}) {
      this.ui.setState({ ...this._workspaceUiState(), ...this._remoteUiState(), ...this._categoryUiState(), ...patch });
    }

    async _runRemoteOperation(label, work) {
      if (this.remoteOperation) throw new Error(`Remote operation already in progress: ${this.remoteOperation}`);
      this.remoteOperation = label;
      this._setUi({ busy: true, status: label });
      try { return await work(); }
      catch (error) {
        this._feedbackFromError(error, { id: `operation-${this._feedbackScope()}`, scope: this._feedbackScope(), title: label.replace(/…$/, '') || 'Remote action failed' });
        throw error;
      }
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

    async refreshWorkspaceState(status, options = {}) {
      if (!this.workspaceStore) return this.workspaceState;
      const previousRuntimeContextKey = this._workspaceRuntimeContextKey(this._activeWorkspace());
      this.workspaceState = await this.workspaceStore.load();
      await this._chooseWorkspaceForCurrentChat();
      const nextRuntimeContextKey = this._workspaceRuntimeContextKey(this._activeWorkspace());
      await this._loadCategoryCache({
        preserveRepositoryState: Boolean(options.preserveRepositoryState && previousRuntimeContextKey && previousRuntimeContextKey === nextRuntimeContextKey)
      });
      this._setUi({ status: status || 'Workspace and category context refreshed from Tampermonkey storage.' });
      return this.workspaceState;
    }


    _emptyCategoryIndex() {
      return this.api.buildRepositoryCategoryIndex
        ? this.api.buildRepositoryCategoryIndex([])
        : { categories: new Map(), filesForCategory: () => [], notesForCategory: () => [], explicitCategoryIdsForTarget: () => [], errors: [] };
    }

    _resetWorkspaceDerivedContext(options = {}) {
      if (!options.preserveRepositoryState) {
        this._disposeMediaLoader('file');
        this.fileRendered = null;
      }
      if (options.disposeNoteMedia) {
        this._disposeMediaLoader('note');
        this.noteRendered = null;
      }
      if (!options.preserveRepositoryState) {
        this.repositoryPath = '';
        this.repositoryEntries = [];
        this.repositoryPreview = null;
        this.repositoryBrowseLoaded = false;
        this.repositoryEditor = { mode: 'none', parentPath: '', path: '', name: '', content: '', baseSha: '' };
        this.fileCategoryDraftIds = [];
      }
      this.categorySnapshot = { definitions: [], diagnostics: [], fileValidation: {}, noteValidation: {}, groups: {}, refreshedAt: '' };
      this.categoryIndex = this._emptyCategoryIndex();
      this.selectedCategoryId = '';
      this.categoryContextWorkspaceId = '';
      this.categoryContextKey = '';
      this.transferPlan = null;
      this.transferRetry = null;
      this.noteMarkdownRetry = null;
      this.transferDraft = { ...this.transferDraft, targetPath: '', plan: null };
    }

    async _loadCategoryCache(options = {}) {
      const workspace = this._activeWorkspace();
      const contextKey = this._categoryContextKey(workspace);
      const previousWorkspaceId = this.categoryContextWorkspaceId;
      const previousContextKey = this.categoryContextKey;
      const targetChangedInPlace = Boolean(workspace && previousWorkspaceId === workspace.id && previousContextKey && previousContextKey !== contextKey);
      const workspaceContextChanged = Boolean(previousContextKey && previousContextKey !== contextKey)
        || Boolean(previousWorkspaceId && previousWorkspaceId !== (workspace ? workspace.id : ''));
      const preserveRepositoryState = Boolean(
        options.preserveRepositoryState
        && workspace
        && previousWorkspaceId === workspace.id
        && previousContextKey === contextKey
        && !workspaceContextChanged
      );
      if (targetChangedInPlace) this.categoryContextsRequiringRefresh.add(contextKey);
      const generation = ++this.workspaceContextGeneration;
      this._resetWorkspaceDerivedContext({ disposeNoteMedia: workspaceContextChanged, preserveRepositoryState });
      this.categoryContextRequiresRefresh = Boolean(contextKey && this.categoryContextsRequiringRefresh.has(contextKey));
      this._setUi({ categoryRefreshSummary: '' });
      if (!workspace || !this.categoryStore) {
        if (!workspace) this.categoryContextRequiresRefresh = false;
        this.categoryContextWorkspaceId = workspace ? workspace.id : '';
        this.categoryContextKey = contextKey;
        return this.categorySnapshot;
      }
      const snapshot = await this.categoryStore.load(contextKey, targetChangedInPlace ? {} : { legacyWorkspaceId: workspace.id });
      const currentWorkspace = this._activeWorkspace();
      if (generation !== this.workspaceContextGeneration || !currentWorkspace || this._categoryContextKey(currentWorkspace) !== contextKey) return null;
      this.categorySnapshot = {
        definitions: Array.isArray(snapshot.definitions) ? snapshot.definitions : [],
        diagnostics: Array.isArray(snapshot.diagnostics) ? snapshot.diagnostics : [],
        fileValidation: snapshot.fileValidation && typeof snapshot.fileValidation === 'object' ? snapshot.fileValidation : {},
        noteValidation: snapshot.noteValidation && typeof snapshot.noteValidation === 'object' ? snapshot.noteValidation : {},
        groups: snapshot.groups && typeof snapshot.groups === 'object' ? snapshot.groups : {},
        refreshedAt: String(snapshot.refreshedAt || '')
      };
      this.categoryIndex = this.api.buildRepositoryCategoryIndex
        ? this.api.buildRepositoryCategoryIndex(this.categorySnapshot.definitions, { fileValidation: this.categorySnapshot.fileValidation, noteValidation: this.categorySnapshot.noteValidation })
        : this._emptyCategoryIndex();
      if (preserveRepositoryState && this.repositoryPreview && this.repositoryPreview.path && this._sameRepositoryContext(this.repositoryPreview.context, workspace) && this.categoryIndex.explicitCategoryIdsForTarget) {
        this.fileCategoryDraftIds = this.categoryIndex.explicitCategoryIdsForTarget('file', this.repositoryPreview.path);
      }
      this.categoryContextWorkspaceId = workspace.id;
      this.categoryContextKey = contextKey;
      return this.categorySnapshot;
    }

    _requireCategoryContext(workspace = this._activeWorkspace()) {
      if (!workspace) throw new Error('Select or create a GitHub workspace first.');
      const contextKey = this._categoryContextKey(workspace);
      if (this.categoryContextRequiresRefresh || !this.categoryContextWorkspaceId || this.categoryContextWorkspaceId !== workspace.id || this.activeWorkspaceId !== workspace.id || !this.categoryContextKey || this.categoryContextKey !== contextKey) {
        throw new Error('Category context is stale for the active repository target. Refresh categories before writing.');
      }
      return workspace;
    }

    async openPanel() {
      await this.refreshWorkspaceState('Workspace and category context refreshed when Documentation Workspace opened.', { preserveRepositoryState: true });
      this._setUi();
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
      await this._loadCategoryCache();
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
      await this._loadPendingAssets(this.current);
      await this._loadCategoryCache();
      this._setUi({ replaceWorkspaceEditor: true, status: this._activeWorkspace() ? 'Documentation Workspace ready. Remote reads and writes remain explicit.' : 'Local Notes ready. Create a GitHub workspace before remote access.' });
      this._startRouteWatch();
    }

    dispose() {
      if (this.routeTimer) this.clearIntervalFn(this.routeTimer);
      this.routeTimer = null;
      this.surface = 'notes';
      this.repositoryPath = '';
      this.repositoryEntries = [];
      this.repositoryPreview = null;
      this.repositoryBrowseLoaded = false;
      this.repositoryEditor = { mode: 'none', parentPath: '', path: '', name: '', content: '', baseSha: '' };
      this.fileCategoryDraftIds = [];
      this.categorySnapshot = { definitions: [], diagnostics: [], fileValidation: {}, noteValidation: {}, groups: {}, refreshedAt: '' };
      this.categoryIndex = this.api.buildRepositoryCategoryIndex ? this.api.buildRepositoryCategoryIndex([]) : { categories: new Map(), filesForCategory: () => [], notesForCategory: () => [], errors: [] };
      this.selectedCategoryId = '';
      this.categoryContextWorkspaceId = '';
      this.categoryContextKey = '';
      this.categoryContextRequiresRefresh = false;
      this.categoryContextsRequiringRefresh.clear();
      this._disposeAllMediaLoaders();
      this.noteRendered = null;
      this.fileRendered = null;
      this.pendingAssets = [];
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
      await this._loadCategoryCache();
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
      await this._loadCategoryCache();
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
      await this._loadCategoryCache();
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


    async setSurface(surface) {
      const allowed = new Set(['notes', 'files', 'categories']);
      const next = String(surface || 'notes');
      if (!allowed.has(next)) throw new Error(`Unsupported workspace surface: ${next}`);
      this.surface = next;
      this._setUi({ status: `${next[0].toUpperCase()}${next.slice(1)} surface opened. Remote access remains explicit.` });
      if (next === 'files' && !this.repositoryBrowseLoaded && this._activeWorkspace()) {
        await this.browseRepository('');
      }
      return next;
    }

    async _renderMarkdownDocument(markdown, sourcePath, context, kind) {
      const mediaKind = kind === 'file' ? 'file' : 'note';
      const rendered = this.api.renderRichMarkdown ? this.api.renderRichMarkdown(markdown) : { html: `<pre>${String(markdown || '')}</pre>`, resources: [], links: [] };
      this._disposeMediaLoader(mediaKind);
      let imageResults = [];
      if (rendered.resources && rendered.resources.length) {
        const pending = rendered.resources.filter((resource) => /^obs-pending-image:/.test(String(resource.target || '')));
        const repositoryResources = rendered.resources.filter((resource) => !/^obs-pending-image:/.test(String(resource.target || '')));
        let loader = null;
        try {
          let client = null;
          if (repositoryResources.length && context && context.owner && context.repo && context.branch && sourcePath && this.api.RepositoryMediaLoader) client = await this._client(context);
          if ((pending.length || client) && this.api.RepositoryMediaLoader) {
            loader = new this.api.RepositoryMediaLoader({ readBytes: client ? (path, options) => client.readBytes(path, options) : async () => { throw new Error('Repository context is unavailable.'); } });
            this.mediaLoaders[mediaKind] = loader;
          }
          for (const resource of pending) {
            try {
              const id = String(resource.target).slice('obs-pending-image:'.length);
              const asset = this.pendingAssetStore ? await this.pendingAssetStore.get(id) : null;
              if (!asset) throw new Error('Pending image bytes are unavailable.');
              const blob = new Blob([asset.bytes], { type: asset.mimeType });
              const objectUrl = loader.createObjectUrl(blob);
              loader.urls.add(objectUrl);
              imageResults.push({ id: resource.id, status: 'loaded', path: resource.target, objectUrl, mime: asset.mimeType, size: asset.size, localPending: true });
            } catch (error) { imageResults.push({ id: resource.id, status: 'error', target: resource.target, message: String(error && error.message || error) }); }
          }
          if (repositoryResources.length) {
            if (client && loader) imageResults.push(...await loader.loadAll(repositoryResources, { sourcePath }));
            else imageResults.push(...repositoryResources.map((resource) => ({ id: resource.id, status: resource.external ? 'external_blocked' : 'unavailable', target: resource.target, message: resource.external ? 'External image loading requires an explicit action.' : 'Repository context is unavailable for this image.' })));
          }
        } catch (error) {
          this._disposeMediaLoader(mediaKind);
          imageResults = rendered.resources.map((resource) => ({ id: resource.id, status: 'error', target: resource.target, message: String(error && error.message || error) }));
        }
      }
      return { ...rendered, imageResults, source: { path: sourcePath || '', context: context ? { owner: context.owner, repo: context.repo, branch: context.branch } : null } };
    }

    async _renderCurrentNote(note = this.current) {
      if (!note) { this._disposeMediaLoader('note'); this.noteRendered = null; return null; }
      const remote = this.api.normalizeRemote(note.remote);
      let context = null;
      let sourcePath = '';
      if (this.api.hasRemoteTargetIdentity(remote)) {
        context = remote;
        sourcePath = remote.path;
      } else {
        const workspace = this._activeWorkspace();
        if (workspace) {
          context = workspace;
          try { sourcePath = this._configuredTarget(note).path; } catch (error) { sourcePath = ''; }
        }
      }
      this.noteRendered = await this._renderMarkdownDocument(note.body || '', sourcePath, context, 'note');
      return this.noteRendered;
    }

    async _renderCurrentFile() {
      const preview = this.repositoryPreview;
      if (!preview || preview.kind !== 'text' || !/\.md(?:own)?$/i.test(preview.path || '')) { this._disposeMediaLoader('file'); this.fileRendered = null; return null; }
      this.fileRendered = await this._renderMarkdownDocument(preview.content || '', preview.path, preview.context, 'file');
      return this.fileRendered;
    }

    async setNoteViewMode(mode, note) {
      const allowed = new Set(['edit', 'preview', 'split']);
      if (!allowed.has(mode)) throw new Error(`Unsupported Note view mode: ${mode}`);
      if (note) await this.saveDraft(note);
      this.noteViewMode = mode;
      if (mode !== 'edit') await this._renderCurrentNote(this.current);
      else { this._disposeMediaLoader('note'); this.noteRendered = null; }
      this._setUi({ status: `Note view: ${mode}.` });
      return mode;
    }

    async setFileViewMode(mode) {
      if (!new Set(['rendered', 'source']).has(mode)) throw new Error(`Unsupported file view mode: ${mode}`);
      this.fileViewMode = mode;
      if (mode === 'rendered') await this._renderCurrentFile();
      else { this._disposeMediaLoader('file'); this.fileRendered = null; }
      this._setUi({ status: `File view: ${mode}.` });
      return mode;
    }

    async openRenderedLink(target, source = {}) {
      const value = String(target || '').trim();
      if (!value) return;
      if (this.api.isPortableUrl && this.api.isPortableUrl(value)) {
        window.open(value, '_blank', 'noopener,noreferrer');
        return;
      }
      if (value.startsWith('#')) {
        this._setUi({ status: `Rendered anchor requested: ${value}.` });
        return;
      }
      const sourcePath = String(source.path || '');
      const context = source.context || this._activeWorkspace();
      if (!sourcePath || !context) throw new Error('Rendered repository link has no source repository context.');
      const resolved = this.api.normalizeMarkdownRepositoryTarget ? this.api.normalizeMarkdownRepositoryTarget(sourcePath, value) : this.api.normalizeRepositoryTarget(sourcePath, value);
      const noteTarget = this.noteRelationIndex && this.noteRelationIndex.byId
        ? Array.from(this.noteRelationIndex.byId.values()).find((note) => {
          const remote = this.api.normalizeRemote(note.remote);
          return remote.path === resolved.path && this._sameRepositoryContext(remote, context);
        }) : null;
      if (noteTarget) return this.selectNote(noteTarget.id);
      return this.openRepositoryEntry({ type: 'file', path: resolved.path, name: resolved.path.slice(resolved.path.lastIndexOf('/') + 1) }, context);
    }

    async setNoteCategoryIntent(note, ids) {
      if (!note) throw new Error('No Note is selected.');
      const draft = await this.saveDraft({ ...note, categoryIds: this.api.normalizeCategoryIds ? this.api.normalizeCategoryIds(ids) : ids, categoryIntentPending: true });
      this.current = draft;
      await this.refreshList();
      this._setUi({ status: 'Note category selection saved locally. Save GitHub to apply repository category memberships.' });
      return draft.categoryIds;
    }

    async openTargetPicker(request = {}) {
      const mode = String(request.mode || 'note-link');
      if (!new Set(['note-link', 'category-members', 'transfer-target']).has(mode)) throw new Error(`Unsupported target-picker mode: ${mode}`);
      const transferMode = request.transferMode === 'append' ? 'append' : 'create';
      const selected = mode === 'category-members'
        ? [...(Array.isArray(request.initialTargets) ? request.initialTargets : this.categoryDraftTargets)]
        : mode === 'transfer-target' && transferMode === 'append' && this.transferDraft.targetPath
          ? [{ type: 'file', path: this.transferDraft.targetPath, name: this.transferDraft.targetPath.slice(this.transferDraft.targetPath.lastIndexOf('/') + 1), label: this.transferDraft.targetPath }]
          : [];
      this.targetPicker = {
        open: true,
        mode,
        transferMode,
        fileName: String(request.fileName || this.transferDraft.fileName || 'copied-note.md'),
        tab: 'files',
        query: '',
        depth: '2',
        currentPath: mode === 'transfer-target' && transferMode === 'create' ? String(this.transferDraft.targetDirectory || '') : '',
        entries: [],
        fileResults: [],
        noteResults: [],
        selected,
        truncated: false,
        summary: '',
        cursorStart: Number(request.cursorStart || 0),
        cursorEnd: Number(request.cursorEnd || request.cursorStart || 0)
      };
      await this.browseTargetPicker(this.targetPicker.currentPath);
      return this.targetPicker;
    }

    closeTargetPicker() {
      this.targetPicker = { ...this.targetPicker, open: false };
      this._setUi({ status: 'Target picker closed; current selection was preserved until the next picker action.' });
    }

    setTargetPickerTab(tab) {
      const value = String(tab || 'files');
      if (!new Set(['files', 'notes', 'selected']).has(value)) throw new Error(`Unsupported target-picker tab: ${value}`);
      this.targetPicker = { ...this.targetPicker, tab: value };
      this._setUi();
      return value;
    }

    async browseTargetPicker(path = '') {
      if (!this.targetPicker.open) throw new Error('Target picker is not open.');
      return this._runRemoteOperation('Reading target-picker folder…', async () => {
        const workspace = this._activeWorkspace();
        if (!workspace) throw new Error('Select a GitHub workspace before choosing repository files.');
        const normalized = this.api.normalizeBrowserPath ? this.api.normalizeBrowserPath(path) : String(path || '');
        const client = await this._client(workspace);
        const entries = await client.listDirectory(normalized, { maxEntries: 200 });
        this.targetPicker = { ...this.targetPicker, currentPath: normalized, entries: this.api.sortRepositoryEntries ? this.api.sortRepositoryEntries(entries) : entries, fileResults: [], query: '', truncated: false, summary: `${entries.length} direct entries.` };
        this._setUi({ status: `Target picker folder loaded: ${normalized || '/'}.` });
        return entries;
      });
    }

    async searchTargetPicker(query, depth) {
      if (!this.targetPicker.open) throw new Error('Target picker is not open.');
      return this._runRemoteOperation('Searching repository targets…', async () => {
        const workspace = this._activeWorkspace();
        if (!workspace) throw new Error('Select a GitHub workspace before searching files.');
        const client = await this._client(workspace);
        const result = await this.api.searchRepositoryTargets({
          query,
          depth,
          rootPath: this.targetPicker.currentPath,
          listDirectory: (path, options) => client.listDirectory(path, options)
        });
        const allNotes = await this.store.search('');
        const noteResults = this.api.searchNotesByName ? this.api.searchNotesByName(allNotes, query) : allNotes.filter((note) => String(note.title || '').toLowerCase().includes(String(query || '').toLowerCase()));
        this.targetPicker = {
          ...this.targetPicker,
          query: String(query || ''),
          depth: String(depth == null ? '2' : depth),
          fileResults: result.results,
          noteResults,
          truncated: result.truncated,
          summary: `${result.results.length} file result(s); ${noteResults.length} Note result(s); scanned ${result.scannedFolders} folder(s)${result.truncated ? `; incomplete (${result.truncationReason})` : ''}.`
        };
        this._setUi({ status: `Target search complete. ${this.targetPicker.summary}` });
        return this.targetPicker;
      });
    }

    toggleTargetPickerTarget(target = {}) {
      if (!this.targetPicker.open) throw new Error('Target picker is not open.');
      const type = String(target.type || 'file');
      const normalized = type === 'note'
        ? { type: 'note', noteId: String(target.noteId || target.id || ''), path: String(target.path || target.remotePath || ''), name: String(target.name || target.title || 'Untitled Note'), label: String(target.label || target.name || target.title || 'Untitled Note') }
        : { type: 'file', path: this.api.normalizeCanonicalRepositoryPath(target.path, 'Selected repository file'), name: String(target.name || target.path || ''), label: String(target.label || target.name || target.path || '') };
      const key = type === 'note' ? `note:${normalized.noteId || normalized.path}` : `file:${normalized.path}`;
      let selected = [...this.targetPicker.selected];
      if (this.targetPicker.mode === 'transfer-target') {
        if (type !== 'file' || !/\.md$/i.test(normalized.path)) throw new Error('Transfer append targets must be Markdown files.');
        selected = selected.some((item) => item.type === 'file' && item.path === normalized.path) ? [] : [normalized];
      } else {
        const index = selected.findIndex((item) => (item.type === 'note' ? `note:${item.noteId || item.path}` : `file:${item.path}`) === key);
        if (index >= 0) selected.splice(index, 1); else selected.push(normalized);
      }
      this.targetPicker = { ...this.targetPicker, selected };
      this._setUi({ status: `${selected.length} target(s) selected.` });
      return selected;
    }

    async applyTargetPicker(input = {}) {
      if (!this.targetPicker.open) throw new Error('Target picker is not open.');
      if (this.targetPicker.mode === 'category-members') {
        this.categoryDraftTargets = [...this.targetPicker.selected];
        this.targetPicker = { ...this.targetPicker, open: false };
        this._setUi({ status: `${this.categoryDraftTargets.length} initial category member(s) selected.` });
        return this.categoryDraftTargets;
      }
      if (this.targetPicker.mode === 'transfer-target') {
        const transferMode = this.targetPicker.transferMode === 'append' ? 'append' : 'create';
        let targetPath = '';
        let targetDirectory = this.targetPicker.currentPath || '';
        let fileName = String(input.fileName || this.targetPicker.fileName || this.transferDraft.fileName || 'copied-note.md').trim();
        if (transferMode === 'append') {
          if (this.targetPicker.selected.length !== 1 || this.targetPicker.selected[0].type !== 'file') throw new Error('Select exactly one existing Markdown file for append mode.');
          targetPath = this.api.normalizeCanonicalRepositoryPath(this.targetPicker.selected[0].path, 'Transfer target path');
          if (!/\.md$/i.test(targetPath)) throw new Error('Transfer append target must be a Markdown file.');
          targetDirectory = targetPath.includes('/') ? targetPath.slice(0, targetPath.lastIndexOf('/')) : '';
          fileName = targetPath.slice(targetPath.lastIndexOf('/') + 1);
        } else {
          if (!/^[^/\\]+\.md$/i.test(fileName) || /[?#\u0000-\u001f\u007f]/.test(fileName)) throw new Error('Enter one safe Markdown filename ending in .md.');
          targetPath = this.api.normalizeCanonicalRepositoryPath(`${targetDirectory ? `${targetDirectory}/` : ''}${fileName}`, 'Transfer target path');
        }
        this.transferPlan = null;
        this.transferRetry = null;
        this.transferDraft = { targetPath, targetDirectory, fileName, mode: transferMode, plan: null };
        this.targetPicker = { ...this.targetPicker, open: false, selected: [] };
        this._setUi({ status: `Transfer target selected: ${targetPath}. Prepare the transfer plan before writing.` });
        return this.transferDraft;
      }
      if (!this.current) throw new Error('Select a Note before inserting links.');
      let note = await this.saveDraft(this.current);
      const sourceTarget = this.api.hasRemoteTargetIdentity(note.remote) ? this.api.normalizeRemote(note.remote) : this._configuredTarget(note);
      const lines = [];
      for (const selected of this.targetPicker.selected) {
        if (selected.type === 'note') {
          const targetNote = await this.store.get(selected.noteId);
          if (!targetNote) throw new Error(`Selected Note no longer exists: ${selected.noteId}`);
          const remote = this.api.normalizeRemote(targetNote.remote);
          if (!this.api.hasRemoteTargetIdentity(remote) || !this._sameRepositoryContext(remote, sourceTarget)) throw new Error(`Selected Note is not verified in the same repository and branch: ${targetNote.title || targetNote.id}`);
          const relative = this.api.repositoryRelativePath(sourceTarget.path, remote.path);
          const encoded = this.api.encodeMarkdownTarget ? this.api.encodeMarkdownTarget(relative) : relative;
          const label = String(targetNote.title || targetNote.id).replace(/\\/g, '\\\\').replace(/\[/g, '\\[').replace(/\]/g, '\\]');
          lines.push(`- [${label}](<${encoded}>)`);
          note = this.api.addLink(note, { type: 'note', label: targetNote.title || targetNote.id, target: { noteId: targetNote.id, owner: remote.owner, repo: remote.repo, branch: remote.branch, path: remote.path }, resolution: 'resolved', resolutionMessage: 'Selected through target picker.' });
        } else {
          const workspace = this._activeWorkspace();
          if (!workspace || !this._sameRepositoryContext(workspace, sourceTarget)) throw new Error('The selected file and Note must use the same repository and branch.');
          const relative = this.api.repositoryRelativePath(sourceTarget.path, selected.path);
          const label = selected.label || selected.name || selected.path;
          const encoded = this.api.encodeMarkdownTarget ? this.api.encodeMarkdownTarget(relative) : relative;
          const escapedLabel = String(label).replace(/\\/g, '\\\\').replace(/\[/g, '\\[').replace(/\]/g, '\\]');
          lines.push(`- [${escapedLabel}](<${encoded}>)`);
          note = this.api.addLink(note, { type: 'repository', label, target: { owner: sourceTarget.owner, repo: sourceTarget.repo, branch: sourceTarget.branch, path: selected.path }, resolution: 'unchecked', resolutionMessage: 'Selected through target picker.' });
        }
      }
      const insertion = lines.join('\n');
      const start = Math.max(0, Math.min(note.body.length, this.targetPicker.cursorStart));
      const end = Math.max(start, Math.min(note.body.length, this.targetPicker.cursorEnd));
      const prefix = start > 0 && note.body[start - 1] !== '\n' ? '\n' : '';
      const suffix = end < note.body.length && note.body[end] !== '\n' ? '\n' : '';
      note = this.api.updateNote(note, { body: `${note.body.slice(0, start)}${prefix}${insertion}${suffix}${note.body.slice(end)}` });
      await this.store.put(note);
      this.current = note;
      this.targetPicker = { ...this.targetPicker, open: false, selected: [] };
      this.noteRelationIndex = this.api.buildNoteRelationIndex ? this.api.buildNoteRelationIndex(await this.store.search('')) : this.noteRelationIndex;
      if (this.noteViewMode !== 'edit') await this._renderCurrentNote(note);
      await this.refreshList();
      this._setUi({ replaceCurrent: true, status: `${lines.length} managed link(s) inserted into the Note.` });
      return note;
    }

    async browseRepository(path = '') {
      return this._runRemoteOperation('Reading repository folder…', async () => {
        const workspace = this._activeWorkspace();
        if (!workspace) throw new Error('Select or create a GitHub workspace before browsing files.');
        const normalized = this.api.normalizeBrowserPath ? this.api.normalizeBrowserPath(path) : String(path || '');
        const client = await this._client(workspace);
        const entries = await client.listDirectory(normalized, { maxEntries: 200 });
        this.repositoryPath = normalized;
        this.repositoryEntries = this.api.sortRepositoryEntries ? this.api.sortRepositoryEntries(entries) : entries;
        this.repositoryPreview = null;
        this.repositoryEditor = { mode: 'none', parentPath: normalized, path: '', name: '', content: '', baseSha: '' };
        this.fileCategoryDraftIds = [];
        this.repositoryBrowseLoaded = true;
        this._disposeMediaLoader('file');
        this.fileRendered = null;
        this.surface = 'files';
        this._setUi({ status: `Repository folder loaded: ${normalized || '/'}. ${entries.length} direct entries.` });
        return this.repositoryEntries;
      });
    }

    async openRepositoryEntry(entry, contextOverride = null) {
      if (!entry || !entry.path) throw new Error('Repository entry is required.');
      const listedEntry = !contextOverride && Array.isArray(this.repositoryEntries)
        ? this.repositoryEntries.find((candidate) => candidate && candidate.path === entry.path)
        : null;
      entry = listedEntry ? { ...entry, ...listedEntry } : entry;
      if (entry.type === 'dir') {
        if (contextOverride) throw new Error('Cross-workspace directory browsing is not supported from a Note link.');
        return this.browseRepository(entry.path);
      }
      return this._runRemoteOperation('Reading repository file…', async () => {
        const workspace = contextOverride || this._activeWorkspace();
        if (!workspace) throw new Error('Select or create a GitHub workspace before opening files.');
        const maxBytes = this.api.DEFAULT_PREVIEW_MAX_BYTES || (512 * 1024);
        let file;
        if (Number(entry.size) > maxBytes) {
          file = {
            path: entry.path,
            name: entry.name || entry.path.slice(entry.path.lastIndexOf('/') + 1),
            size: Number(entry.size) || 0,
            sha: String(entry.sha || ''),
            content: null,
            htmlUrl: String(entry.htmlUrl || '')
          };
        } else {
          const client = await this._client(workspace);
          file = await client.read(entry.path, { allowMissingContent: true });
        }
        const preview = this.api.classifyFilePreview
          ? this.api.classifyFilePreview(file, { maxBytes })
          : { kind: typeof file.content === 'string' ? 'text' : 'unsupported', path: file.path, size: file.size || 0, content: file.content || '', message: 'Read-only repository preview.' };
        this.repositoryPreview = {
          ...preview,
          sha: file.sha,
          name: file.name || entry.name || file.path.slice(file.path.lastIndexOf('/') + 1),
          htmlUrl: file.htmlUrl || entry.htmlUrl || (this.api.buildGitHubHtmlUrl ? this.api.buildGitHubHtmlUrl(workspace, file.path, 'file') : ''),
          context: { owner: workspace.owner, repo: workspace.repo, branch: workspace.branch }
        };
        this.repositoryEditor = { mode: 'none', parentPath: file.path.includes('/') ? file.path.slice(0, file.path.lastIndexOf('/')) : '', path: '', name: '', content: '', baseSha: '' };
        const activeWorkspace = this._activeWorkspace();
        const categoryContextCurrent = Boolean(
          this.categoryIndex
          && this.categoryIndex.explicitCategoryIdsForTarget
          && this.categoryContextKey
          && activeWorkspace
          && this.categoryContextKey === this._categoryContextKey(activeWorkspace)
          && this._sameRepositoryContext(workspace, activeWorkspace)
          && !this.categoryContextRequiresRefresh
        );
        this.fileCategoryDraftIds = categoryContextCurrent
          ? this.categoryIndex.explicitCategoryIdsForTarget('file', file.path)
          : [];
        this.surface = 'files';
        this._disposeMediaLoader('file');
        this.fileRendered = null;
        if (this.fileViewMode === 'rendered' && preview.kind === 'text' && /\.md(?:own)?$/i.test(file.path || '')) await this._renderCurrentFile();
        this._setUi({ replaceFileCategoryIds: true, status: preview.kind === 'text' ? `Opened ${file.path}.` : preview.message });
        return this.repositoryPreview;
      });
    }

    beginRepositoryFileCreate() {
      const workspace = this._activeWorkspace();
      if (!workspace) throw new Error('Select or create a GitHub workspace before creating files.');
      this.repositoryEditor = { mode: 'create', parentPath: this.repositoryPath || '', path: '', name: '', content: '', baseSha: '' };
      this.surface = 'files';
      this._setUi({ replaceFileEditor: true, status: `New text file in ${this.repositoryPath || '/'}. Nothing is written until Save.` });
      return this.repositoryEditor;
    }

    beginRepositoryFolderCreate() {
      const workspace = this._activeWorkspace();
      if (!workspace) throw new Error('Select or create a GitHub workspace before creating folders.');
      this.repositoryEditor = { mode: 'folder', parentPath: this.repositoryPath || '', path: '', name: '', content: '', baseSha: '' };
      this.surface = 'files';
      this._setUi({ replaceFileEditor: true, status: `New folder in ${this.repositoryPath || '/'}. GitHub will track it through .gitkeep.` });
      return this.repositoryEditor;
    }

    async beginRepositoryFileEdit() {
      return this._runRemoteOperation('Preparing repository text editor…', async () => {
        const workspace = this._activeWorkspace();
        const preview = this.repositoryPreview;
        if (!workspace || !preview || !preview.path || !this._sameRepositoryContext(preview.context, workspace)) {
          throw new Error('Open a file from the active workspace before editing it.');
        }
        if (preview.kind !== 'text') throw new Error('Only supported bounded text files can be edited in this prototype.');
        const client = await this._client(workspace);
        const maxBytes = this.api.DEFAULT_TEXT_FILE_MAX_BYTES || this.api.DEFAULT_PREVIEW_MAX_BYTES || (512 * 1024);
        const file = await client.readBytes(preview.path, { maxBytes });
        const content = this.api.decodeUtf8Bytes(file.bytes, { fatal: true, message: 'Repository file is not valid UTF-8 and cannot be edited safely.' });
        this.repositoryEditor = {
          mode: 'edit',
          parentPath: preview.path.includes('/') ? preview.path.slice(0, preview.path.lastIndexOf('/')) : '',
          path: preview.path,
          name: preview.name || preview.path.slice(preview.path.lastIndexOf('/') + 1),
          content,
          baseSha: file.sha || preview.sha || ''
        };
        this.fileViewMode = 'source';
        this.surface = 'files';
        this._setUi({ replaceFileEditor: true, status: `Editing ${preview.path}. Remote content is unchanged until Save.` });
        return this.repositoryEditor;
      });
    }

    cancelRepositoryEditor() {
      this.repositoryEditor = { mode: 'none', parentPath: this.repositoryPath || '', path: '', name: '', content: '', baseSha: '' };
      this._setUi({ replaceFileEditor: true, status: 'Repository file edit cancelled; no remote write was performed.' });
      return this.repositoryEditor;
    }

    _markCategoryContextStaleForRepositoryPath(path, workspace = this._activeWorkspace()) {
      if (!workspace || !path) return false;
      const categoryBase = this._categoryBasePath(workspace);
      if (path !== categoryBase && !path.startsWith(`${categoryBase}/`)) return false;
      const contextKey = this._categoryContextKey(workspace);
      this.categoryContextsRequiringRefresh.add(contextKey);
      this.categoryContextRequiresRefresh = true;
      return true;
    }

    async saveRepositoryEditor(input = {}) {
      const requested = { ...(this.repositoryEditor || {}), ...(input || {}) };
      const mode = requested.mode;
      if (!['create', 'edit', 'folder'].includes(mode)) throw new Error('No repository file or folder edit is active.');
      return this._runRemoteOperation(mode === 'folder' ? 'Creating repository folder…' : 'Saving repository text file…', async () => {
        const workspace = this._activeWorkspace();
        if (!workspace) throw new Error('Select or create a GitHub workspace before writing files.');
        const client = await this._client(workspace);
        const normalizePath = (value) => this.api.normalizeBrowserPath ? this.api.normalizeBrowserPath(value, { allowRoot: false }) : String(value || '');
        const parentPath = this.api.normalizeBrowserPath ? this.api.normalizeBrowserPath(requested.parentPath || '') : String(requested.parentPath || '');
        let result;
        if (mode === 'folder') {
          if (!this.api.createRepositoryFolder) throw new Error('Repository folder writer is unavailable.');
          result = await this.api.createRepositoryFolder({
            client,
            normalizePath,
            parentPath,
            name: requested.name,
            placeholderName: '.gitkeep'
          });
          this._markCategoryContextStaleForRepositoryPath(result.placeholderPath, workspace);
          const entries = await client.listDirectory(parentPath, { maxEntries: 200 });
          this.repositoryPath = parentPath;
          this.repositoryEntries = this.api.sortRepositoryEntries ? this.api.sortRepositoryEntries(entries) : entries;
          this.repositoryPreview = null;
          this.repositoryBrowseLoaded = true;
          this.repositoryEditor = { mode: 'none', parentPath, path: '', name: '', content: '', baseSha: '' };
          this.fileCategoryDraftIds = [];
          this.surface = 'files';
          this._setUi({ replaceFileEditor: true, status: `Folder ${result.folderPath} created and verified through ${result.placeholderPath}.` });
          return result;
        }

        if (!this.api.saveRepositoryTextFile) throw new Error('Repository text-file writer is unavailable.');
        result = await this.api.saveRepositoryTextFile({
          client,
          normalizePath,
          mode,
          parentPath,
          path: requested.path,
          name: requested.name,
          content: requested.content,
          baseSha: requested.baseSha,
          maxBytes: this.api.DEFAULT_TEXT_FILE_MAX_BYTES || this.api.DEFAULT_PREVIEW_MAX_BYTES || (512 * 1024)
        });
        this._markCategoryContextStaleForRepositoryPath(result.path, workspace);
        const parent = result.path.includes('/') ? result.path.slice(0, result.path.lastIndexOf('/')) : '';
        const entries = await client.listDirectory(parent, { maxEntries: 200 });
        this.repositoryPath = parent;
        this.repositoryEntries = this.api.sortRepositoryEntries ? this.api.sortRepositoryEntries(entries) : entries;
        const preview = this.api.classifyFilePreview
          ? this.api.classifyFilePreview({ path: result.path, name: result.path.slice(result.path.lastIndexOf('/') + 1), size: result.size, sha: result.sha, content: result.content, htmlUrl: result.htmlUrl }, { maxBytes: this.api.DEFAULT_PREVIEW_MAX_BYTES || (512 * 1024) })
          : { kind: 'text', path: result.path, size: result.size, content: result.content, message: 'Repository text file.' };
        this.repositoryPreview = {
          ...preview,
          sha: result.sha || '',
          name: result.path.slice(result.path.lastIndexOf('/') + 1),
          htmlUrl: result.htmlUrl || (this.api.buildGitHubHtmlUrl ? this.api.buildGitHubHtmlUrl(workspace, result.path, 'file') : ''),
          context: { owner: workspace.owner, repo: workspace.repo, branch: workspace.branch }
        };
        this.repositoryBrowseLoaded = true;
        this.repositoryEditor = { mode: 'none', parentPath: parent, path: '', name: '', content: '', baseSha: '' };
        const categoryContextCurrent = Boolean(
          this.categoryIndex
          && this.categoryIndex.explicitCategoryIdsForTarget
          && this.categoryContextKey
          && this.categoryContextKey === this._categoryContextKey(workspace)
          && !this.categoryContextRequiresRefresh
        );
        this.fileCategoryDraftIds = categoryContextCurrent
          ? this.categoryIndex.explicitCategoryIdsForTarget('file', result.path)
          : [];
        this.fileViewMode = 'source';
        this._disposeMediaLoader('file');
        this.fileRendered = null;
        this.surface = 'files';
        this._setUi({ replaceFileEditor: true, replaceFileCategoryIds: true, status: `${mode === 'edit' ? 'Updated' : 'Created'} ${result.path}; exact remote read-back verified.` });
        return result;
      });
    }

    async applyFileCategories(filePath, ids = this.fileCategoryDraftIds) {
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

        try {
          const client = await this._client(workspace);
          await this._refreshCategoriesUnlocked(client, workspace);
        } catch (error) {
          results.push({ target: this._categoryBasePath(workspace), status: 'failed', message: `Final category refresh failed: ${String(error && error.message || error)}` });
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
        this._setUi({ replaceFileCategoryIds: true, status: changes.length ? `${changes.length} file category membership change(s) verified.` : 'File category memberships were already up to date.' });
        return results;
      });
    }

    openRepositoryFileInGitHub(path) {
      const workspace = this.repositoryPreview && this.repositoryPreview.context || this._activeWorkspace();
      if (!workspace) throw new Error('Select a GitHub workspace first.');
      const target = String(path || (this.repositoryPreview && this.repositoryPreview.path) || '').trim();
      if (!target) throw new Error('Select a repository file first.');
      const url = this.api.buildGitHubHtmlUrl
        ? this.api.buildGitHubHtmlUrl(workspace, target, 'file')
        : `https://github.com/${encodeURIComponent(workspace.owner)}/${encodeURIComponent(workspace.repo)}/blob/${encodeURIComponent(workspace.branch)}/${encodeGitHubPath(target)}`;
      if (typeof window !== 'undefined' && typeof window.open === 'function') window.open(url, '_blank', 'noopener,noreferrer');
      return url;
    }

    _categoryBasePath(workspace = this._activeWorkspace()) {
      if (!workspace) throw new Error('Select or create a GitHub workspace first.');
      return cleanBasePath(workspace.categoryBasePath || this.api.DEFAULT_CATEGORY_BASE_PATH || 'categories');
    }

    async _repositoryEntryMetadata(client, path) {
      const canonical = this.api.normalizeCanonicalRepositoryPath(path, 'Repository file path');
      const slash = canonical.lastIndexOf('/');
      const parent = slash >= 0 ? canonical.slice(0, slash) : '';
      const entries = await client.listDirectory(parent, { missingAsEmpty: true, maxEntries: 200 });
      const entry = entries.find((candidate) => candidate && candidate.path === canonical);
      if (!entry || entry.type !== 'file') {
        const error = new Error(`Repository file does not exist: ${canonical}.`);
        error.kind = 'not_found';
        throw error;
      }
      return entry;
    }

    async _refreshCategoriesUnlocked(client, workspace) {
      const contextKey = this._categoryContextKey(workspace);
      const basePath = this._categoryBasePath(workspace);
      const entries = await client.listDirectory(basePath, { missingAsEmpty: true, maxEntries: 100 });
      const markdownEntries = entries.filter((entry) => entry.type === 'file' && /\.md$/i.test(entry.name || entry.path));
      const definitions = [];
      const diagnostics = [];
      let skipped = 0;
      let bytes = 0;
      const maxBytes = 1024 * 1024;
      for (const entry of markdownEntries) {
        if (Number(entry.size || 0) > maxBytes) {
          skipped += 1;
          diagnostics.push({ kind: 'oversized_definition', path: entry.path, message: `Category definition exceeds the ${maxBytes}-byte refresh limit.` });
          continue;
        }
        try {
          const file = await client.read(entry.path);
          bytes += new TextEncoder().encode(file.content).byteLength;
          if (bytes > maxBytes) throw new Error(`Category refresh exceeded the ${maxBytes}-byte prototype limit.`);
          if (!this.api.isCategoryDefinitionMarkdown(file.content)) {
            skipped += 1;
            diagnostics.push({ kind: 'ordinary_markdown_skipped', path: file.path, message: 'Markdown file has no obs-file-category marker and was skipped.' });
            continue;
          }
          try {
            const definition = this.api.decodeCategoryDefinition(file.content);
            definitions.push({ path: file.path, sha: file.sha, htmlUrl: file.htmlUrl, definition });
          } catch (error) {
            diagnostics.push({ kind: 'malformed_definition', path: file.path, message: String(error && error.message || error) });
          }
        } catch (error) {
          if (String(error && error.message || '').includes('prototype limit')) throw error;
          diagnostics.push({ kind: 'definition_read_error', path: entry.path, message: String(error && error.message || error), errorKind: String(error && error.kind || '') });
        }
      }

      const initialIndex = this.api.buildRepositoryCategoryIndex(definitions);
      const memberEntries = Array.from(initialIndex.memberships.values());
      const filePaths = memberEntries.filter((entry) => entry.type === 'file').map((entry) => entry.path).sort();
      const notePaths = memberEntries.filter((entry) => entry.type === 'note').map((entry) => entry.path).sort();
      const validationLimit = 100;
      const uniqueTargets = [];
      const seenTargets = new Set();
      for (const entry of memberEntries) {
        const key = `${entry.type}:${entry.path}`;
        if (seenTargets.has(key)) continue;
        seenTargets.add(key);
        uniqueTargets.push({ type: entry.type, path: entry.path });
      }
      uniqueTargets.sort((left, right) => left.path.localeCompare(right.path) || left.type.localeCompare(right.type));
      const selectedTargets = uniqueTargets.slice(0, validationLimit);
      const fileValidation = {};
      const noteValidation = {};
      const pathsByParent = new Map();
      for (const target of selectedTargets) {
        const slash = target.path.lastIndexOf('/');
        const parent = slash >= 0 ? target.path.slice(0, slash) : '';
        const group = pathsByParent.get(parent) || [];
        group.push(target);
        pathsByParent.set(parent, group);
      }
      for (const [parent, targets] of pathsByParent.entries()) {
        try {
          const directoryEntries = await client.listDirectory(parent, { missingAsEmpty: true, maxEntries: 200 });
          const files = new Set(directoryEntries.filter((entry) => entry.type === 'file').map((entry) => entry.path));
          for (const target of targets) {
            const targetMap = target.type === 'note' ? noteValidation : fileValidation;
            targetMap[target.path] = files.has(target.path)
              ? { status: 'verified', message: target.type === 'note' ? 'Repository Note file exists.' : 'Repository file exists.' }
              : { status: 'missing', message: `${target.type === 'note' ? 'Repository Note' : 'Repository file'} does not exist: ${target.path}.` };
          }
        } catch (error) {
          for (const target of targets) {
            const targetMap = target.type === 'note' ? noteValidation : fileValidation;
            targetMap[target.path] = { status: 'inaccessible', message: String(error && error.message || error) };
          }
        }
      }
      if (uniqueTargets.length > validationLimit) {
        for (const target of uniqueTargets.slice(validationLimit)) {
          const targetMap = target.type === 'note' ? noteValidation : fileValidation;
          targetMap[target.path] = { status: 'unchecked', message: 'Target was not checked because the validation limit was reached.' };
        }
        diagnostics.push({ kind: 'incomplete_member_validation', path: basePath, message: `Validated ${validationLimit} of ${uniqueTargets.length} unique file/Note category targets.` });
      }

      const refreshedAt = new Date().toISOString();
      let snapshot = {
        definitions,
        diagnostics,
        fileValidation,
        noteValidation,
        groups: this.categorySnapshot && this.categorySnapshot.groups || {},
        refreshedAt
      };
      if (this.categoryStore) {
        snapshot = typeof this.categoryStore.saveDefinitions === 'function'
          ? await this.categoryStore.saveDefinitions(contextKey, snapshot)
          : await this.categoryStore.save(contextKey, snapshot);
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
      const summary = `definitions ${definitions.length}; skipped ${skipped}; issues ${issueCount}; validated targets ${Math.min(uniqueTargets.length, validationLimit)}/${uniqueTargets.length}`;
      this._setUi({ categoryRefreshSummary: summary, status: `Category refresh complete: ${summary}. No remote writes were performed.` });
      return { definitions: definitions.length, skipped, errors: diagnostics.length, modelErrors: this.categoryIndex.errors.length, diagnostics: [...diagnostics, ...this.categoryIndex.errors] };
    }

    async _hydrateNoteCategoryIntentsFromIndex(workspace = this._activeWorkspace()) {
      if (!workspace || !this.categoryIndex || !this.categoryIndex.explicitCategoryIdsForTarget) return;
      const notes = await this.store.list();
      for (const note of notes) {
        const normalized = this.api.normalizeNote(note);
        if (normalized.categoryIntentPending) continue;
        const remote = this.api.normalizeRemote(normalized.remote);
        if (!this.api.hasRemoteTargetIdentity(remote) || !this._sameRepositoryContext(remote, workspace)) continue;
        const categoryIds = this.categoryIndex.explicitCategoryIdsForTarget('note', remote.path);
        const next = this.api.updateNote(normalized, { categoryIds, categoryIntentPending: false });
        if (JSON.stringify(next.categoryIds) !== JSON.stringify(normalized.categoryIds) || normalized.categoryIntentPending) await this.store.put(next);
        if (this.current && this.current.id === next.id) this.current = next;
      }
    }

    async refreshCategories() {
      return this._runRemoteOperation('Reading category definitions from GitHub…', async () => {
        const workspace = this._activeWorkspace();
        if (!workspace) throw new Error('Select or create a GitHub workspace before refreshing categories.');
        const client = await this._client(workspace);
        return this._refreshCategoriesUnlocked(client, workspace);
      });
    }

    selectCategory(id) {
      const value = String(id || '');
      if (value && !this.categoryIndex.categories.has(value)) throw new Error(`Category not found: ${value}`);
      this.selectedCategoryId = value;
      const record = value ? this.categoryIndex.categories.get(value) : null;
      this.categoryDraftTargets = record ? [
        ...(record.explicitFiles || []).map((item) => ({ type: 'file', path: item.path, name: item.label || item.path, label: item.label || item.path })),
        ...(record.explicitNotes || []).map((item) => ({ type: 'note', path: item.path, noteId: item.noteId || '', name: item.label || item.path, label: item.label || item.path }))
      ] : [];
      this.surface = 'categories';
      this.feedback = this.feedback.filter((item) => item.scope !== 'categories');
      this._setUi({ replaceCategoryEditor: true, status: value ? `Category opened: ${record.name}.` : 'New category form ready.' });
      return record;
    }

    _categoryDefinitionRecord(id) {
      const value = String(id || '');
      const indexed = this.categoryIndex.categories.get(value);
      if (!indexed) return null;
      const snapshot = (this.categorySnapshot.definitions || []).find((entry) => entry.path === indexed.path);
      return snapshot ? { ...snapshot, indexed } : null;
    }

    _categoryLinksForIds(sourcePath, ids) {
      const links = [];
      for (const id of Array.isArray(ids) ? ids : []) {
        const target = this.categoryIndex.categories.get(String(id));
        if (!target) throw new Error(`Implied category not found: ${id}`);
        links.push({ label: target.name, target: this.api.repositoryRelativePath(sourcePath, target.path) });
      }
      return links;
    }

    async _categoryMemberLinks(definitionPath, targets, workspace) {
      const files = [];
      const notes = [];
      const seen = new Set();
      for (const target of Array.isArray(targets) ? targets : []) {
        if (!target || !target.type) continue;
        if (target.type === 'file') {
          const path = this.api.normalizeCanonicalRepositoryPath(target.path, 'Categorized repository file');
          const key = `file:${path}`;
          if (seen.has(key)) continue;
          seen.add(key);
          files.push({ label: target.label || target.name || path.slice(path.lastIndexOf('/') + 1), target: this.api.repositoryRelativePath(definitionPath, path) });
        } else if (target.type === 'note') {
          const note = target.noteId ? await this.store.get(target.noteId) : null;
          const remote = note ? this.api.normalizeRemote(note.remote) : { owner: target.owner, repo: target.repo, branch: target.branch, path: target.path };
          if (!this.api.hasRemoteTargetIdentity(remote)) throw new Error(`Selected Note must be saved and verified in GitHub before category assignment: ${target.name || target.noteId || target.path || 'Untitled Note'}.`);
          if (!this._sameRepositoryContext(remote, workspace)) throw new Error(`Selected Note belongs to another repository or branch: ${note && (note.title || note.id) || target.path}.`);
          const key = `note:${remote.path}`;
          if (seen.has(key)) continue;
          seen.add(key);
          notes.push({ label: note && (note.title || note.id) || target.label || target.name || remote.path, target: this.api.repositoryRelativePath(definitionPath, remote.path), noteId: note ? note.id : String(target.noteId || '') });
        }
      }
      return { files, notes };
    }

    async saveCategory(input = {}) {
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
          } catch (error) {
            return true;
          }
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
        await client.saveVerified({
          path,
          content,
          baseSha: existing ? existing.sha : '',
          message: `${existing ? 'Update' : 'Create'} repository category ${input.name || id}`
        });
        await this._refreshCategoriesUnlocked(client, workspace);
        this.selectedCategoryId = id;
        const saved = this.categoryIndex.categories.get(id);
        this.categoryDraftTargets = saved ? [
          ...(saved.explicitFiles || []).map((item) => ({ type: 'file', path: item.path, name: item.label || item.path, label: item.label || item.path })),
          ...(saved.explicitNotes || []).map((item) => ({ type: 'note', path: item.path, noteId: item.noteId || '', name: item.label || item.path, label: item.label || item.path }))
        ] : [];
        if (input.group !== undefined) await this.setCategoryGroup(id, input.group, { silent: true });
        this.feedback = this.feedback.filter((item) => item.scope !== 'categories');
        this._pushFeedback({ id: 'category-save-success', scope: 'categories', severity: 'success', title: 'Category saved', message: `${input.name || id} and ${this.categoryDraftTargets.length} membership target(s) were verified by read-back.` });
        this._setUi({ replaceCategoryEditor: true, status: `Category ${input.name || id} saved and verified by read-back.` });
        return saved;
      });
    }

    _assertCategoryAssignmentTarget(filePath, workspace = this._requireCategoryContext()) {
      const canonicalFile = this.api.normalizeCanonicalRepositoryPath(filePath, 'Categorized repository file');
      const preview = this.repositoryPreview;
      if (!preview || !preview.path || this.api.normalizeCanonicalRepositoryPath(preview.path, 'Selected repository file') !== canonicalFile) {
        throw new Error('Select the repository file in the Files surface before assigning a category.');
      }
      if (!this._sameRepositoryContext(preview.context, workspace)) {
        throw new Error('The selected file belongs to a different repository or branch than the active category workspace. Cross-repository category assignment is blocked.');
      }
      return canonicalFile;
    }

    async _writeCategoryMembership(categoryId, filePath, remove) {
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
      await client.saveVerified({
        path: record.path,
        content,
        baseSha: record.sha,
        message: `${remove ? 'Remove' : 'Add'} ${canonicalFile} ${remove ? 'from' : 'to'} category ${record.definition.name}`
      });
      await this._refreshCategoriesUnlocked(client, workspace);
      this.selectedCategoryId = categoryId;
      this._setUi({ status: `${canonicalFile} ${remove ? 'removed from' : 'assigned to'} ${record.definition.name}; category definition verified by read-back.` });
      return this.categoryIndex.categories.get(categoryId);
    }

    async assignCategory(categoryId, filePath) {
      return this._runRemoteOperation('Assigning file category…', () => this._writeCategoryMembership(categoryId, filePath, false));
    }

    async unassignCategory(categoryId, filePath) {
      return this._runRemoteOperation('Removing file category…', () => this._writeCategoryMembership(categoryId, filePath, true));
    }

    async setCategoryGroup(categoryId, groupName, options = {}) {
      const workspace = this._requireCategoryContext();
      if (!this.categoryStore) return;
      if (!this.categoryIndex.categories.has(categoryId)) throw new Error(`Category not found: ${categoryId}`);
      const value = String(groupName || '').trim();
      const contextKey = this._categoryContextKey(workspace);
      const nextGroups = { ...(this.categorySnapshot.groups || {}) };
      if (value) nextGroups[categoryId] = value;
      else delete nextGroups[categoryId];
      this.categorySnapshot = typeof this.categoryStore.setCategoryGroup === 'function'
        ? await this.categoryStore.setCategoryGroup(contextKey, categoryId, value)
        : typeof this.categoryStore.setGroups === 'function'
          ? await this.categoryStore.setGroups(contextKey, nextGroups)
          : await this.categoryStore.save(contextKey, { ...this.categorySnapshot, groups: nextGroups });
      if (!options.silent) this._setUi({ status: value ? `Local category group saved: ${value}.` : 'Local category group removed.' });
      return value;
    }

    async refreshList(query = this.search) {
      this.search = String(query || '');
      const notes = await this.store.search(this.search);
      const allNotes = typeof this.store.list === 'function' ? await this.store.list() : await this.store.search('');
      this.noteRelationIndex = this.api.buildNoteRelationIndex ? this.api.buildNoteRelationIndex(allNotes) : this.noteRelationIndex;
      if (this.current) {
        const refreshed = allNotes.find((item) => item.id === this.current.id) || await this.store.get(this.current.id);
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
      const normalized = this.api.normalizeNote(note);
      const previous = this.current && this.current.id === normalized.id ? this.api.normalizeNote(this.current) : normalized;
      const categoryIds = this.api.normalizeCategoryIds ? this.api.normalizeCategoryIds(note.categoryIds) : (note.categoryIds || []);
      const categoryChanged = JSON.stringify(categoryIds) !== JSON.stringify(previous.categoryIds || []);
      const next = this.api.updateNote(normalized, {
        title: note.title,
        body: note.body,
        links: note.links,
        categoryIds,
        categoryIntentPending: categoryChanged ? true : Boolean(note.categoryIntentPending)
      });
      await this.store.put(next);
      this.current = next;
      return next;
    }

    async newNote() {
      const note = this.api.createNote({ categoryIds: [] });
      await this.store.put(note);
      this.current = note;
      this._disposeMediaLoader('note');
      this.noteRendered = null;
      this.noteViewMode = 'edit';
      this.transferPlan = null;
      this.transferRetry = null;
      this.noteMarkdownRetry = null;
      this.transferDraft = { ...this.transferDraft, targetPath: '', plan: null };
      await this._loadPendingAssets(note);
      await this.refreshList();
      this._setUi({ replaceCurrent: true, status: 'New local Note created. Categories may be selected before the first GitHub save.' });
    }

    async selectNote(id) {
      const note = await this.store.get(id);
      if (!note) throw new Error(`Note not found: ${id}`);
      this.current = this.api.normalizeNote(note);
      this.transferPlan = null;
      this.transferRetry = null;
      this.noteMarkdownRetry = null;
      this.transferDraft = { ...this.transferDraft, targetPath: '', plan: null };
      await this._loadPendingAssets(this.current);
      if (this.noteViewMode !== 'edit') await this._renderCurrentNote(this.current);
      else { this._disposeMediaLoader('note'); this.noteRendered = null; }
      this._setUi({ current: this.current, replaceCurrent: true, status: `Opened ${this.current.title || 'Untitled Note'}.` });
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

    async _loadPendingAssets(note = this.current) {
      if (!note || !this.pendingAssetStore || typeof this.pendingAssetStore.listByNote !== 'function') {
        this.pendingAssets = [];
        return this.pendingAssets;
      }
      this.pendingAssets = await this.pendingAssetStore.listByNote(note.id);
      return this.pendingAssets;
    }

    async _imageInputBytes(input = {}) {
      if (input.bytes) return this.api.toUint8Array(input.bytes);
      const file = input.file;
      if (!file) throw new Error('Select or paste an image first.');
      if (typeof file.arrayBuffer === 'function') return new Uint8Array(await file.arrayBuffer());
      if (file.bytes) return this.api.toUint8Array(file.bytes);
      throw new Error('The browser did not provide readable image bytes.');
    }

    async insertNoteImage(note, input = {}) {
      if (!note) throw new Error('Select a Note before inserting an image.');
      if (!this.pendingAssetStore) throw new Error('Pending image storage is not available.');
      const draft = await this.saveDraft(note);
      const file = input.file || {};
      const bytes = await this._imageInputBytes(input);
      const asset = this.api.createPendingNoteAsset({
        noteId: draft.id,
        name: input.name || file.name || 'image',
        type: input.type || file.type || '',
        bytes,
        alt: input.alt || String(file.name || 'image').replace(/\.[^.]+$/, '')
      });
      await this.pendingAssetStore.put(asset);
      const start = Math.max(0, Number.isInteger(input.cursorStart) ? input.cursorStart : String(draft.body || '').length);
      const end = Math.max(start, Number.isInteger(input.cursorEnd) ? input.cursorEnd : start);
      const before = String(draft.body || '').slice(0, start);
      const after = String(draft.body || '').slice(end);
      const prefix = before && !before.endsWith('\n') ? '\n' : '';
      const suffix = after && !after.startsWith('\n') ? '\n' : '';
      const body = `${before}${prefix}${this.api.pendingImageMarkdown(asset)}${suffix}${after}`;
      const next = this.api.updateNote(draft, { body });
      await this.store.put(next);
      this.current = next;
      await this._loadPendingAssets(next);
      await this.refreshList();
      this._setUi({ replaceCurrent: true, status: 'Image staged locally. Save GitHub to upload and verify the asset.' });
      return asset;
    }

    async removePendingNoteImage(note, assetId) {
      if (!note) throw new Error('Select a Note first.');
      const draft = await this.saveDraft(note);
      const id = String(assetId || '').trim();
      const pattern = new RegExp(`!?\\[[^\\]]*\\]\\(\\s*<?obs-pending-image:${id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}>?(?:\\s+["'][^"']*["'])?\\s*\\)`, 'g');
      const body = String(draft.body || '').replace(pattern, '').replace(/\n{3,}/g, '\n\n');
      const next = this.api.updateNote(draft, { body });
      await this.store.put(next);
      if (this.pendingAssetStore) await this.pendingAssetStore.delete(id);
      this.current = next;
      await this._loadPendingAssets(next);
      await this.refreshList();
      this._setUi({ replaceCurrent: true, status: 'Pending image removed locally.' });
      return next;
    }

    async _preparePendingAssets(note, target, client) {
      const ids = this.api.pendingAssetIds ? this.api.pendingAssetIds(note.body) : [];
      if (!ids.length) return { remoteNote: note, assets: [], replacements: new Map() };
      if (!this.pendingAssetStore) throw new Error('Pending image storage is unavailable; the Note cannot be saved remotely.');
      const replacements = new Map();
      const results = [];
      for (const id of ids) {
        let asset = null;
        try {
          asset = await this.pendingAssetStore.get(id);
          if (!asset || asset.noteId !== note.id) throw new Error(`Pending image data is missing: ${id}.`);
          const desiredPath = asset.verifiedPath || this.api.noteAssetPath(target.path, asset.fileName);
          const result = await this.api.ensureRepositoryAsset({
            client,
            path: desiredPath,
            bytes: asset.bytes,
            maxBytes: this.api.DEFAULT_MAX_IMAGE_BYTES,
            message: `Add image for linked Note ${note.title || note.id}`
          });
          const relative = this.api.repositoryRelativePath(target.path, result.path);
          replacements.set(id, relative);
          const updatedAsset = { ...asset, state: 'verified', stateMessage: 'Repository image verified by read-back.', plannedPath: desiredPath, verifiedPath: result.path, verifiedSha: result.sha || '', verifiedHash: result.verifiedHash || '', updatedAt: new Date().toISOString() };
          await this.pendingAssetStore.put(updatedAsset);
          results.push({ target: result.path, status: result.status || 'verified', message: result.collision ? 'Collision-safe path selected and verified.' : 'Repository image verified.' });
        } catch (error) {
          const targetPath = asset && (asset.verifiedPath || asset.plannedPath || asset.fileName) || `pending:${id}`;
          throw this._appendPartialResults(error, results, { target: targetPath, status: 'failed', message: String(error && error.message || error) });
        }
      }
      const body = this.api.replacePendingImageTargets(note.body, replacements);
      return { remoteNote: this.api.normalizeNote({ ...note, body }), assets: results, replacements };
    }

    async _finalizePendingAssets(noteId, ids) {
      if (!this.pendingAssetStore) return;
      for (const id of ids || []) await this.pendingAssetStore.delete(id);
      if (this.current && this.current.id === noteId) await this._loadPendingAssets(this.current);
    }

    _appendPartialResults(error, results = [], extra = null) {
      const existing = Array.isArray(error && error.partialResults) ? error.partialResults : [];
      const combined = [...existing, ...results, ...(extra ? [extra] : [])];
      const seen = new Set();
      const normalized = [];
      for (const item of combined) {
        if (!item) continue;
        const value = { target: String(item.target || ''), status: String(item.status || 'failed'), message: String(item.message || '') };
        const key = `${value.status}\u0000${value.target}\u0000${value.message}`;
        if (seen.has(key)) continue;
        seen.add(key);
        normalized.push(value);
      }
      if (error && typeof error === 'object') error.partialResults = normalized;
      return error;
    }

    async _recoverOrRetryTextWrite({ client, path, content, baseSha = '', message, beforeWrite = null }) {
      let current = null;
      try {
        current = await client.read(path);
      } catch (error) {
        if (!error || error.kind !== 'not_found') throw error;
      }

      if (current && current.content === content) {
        return {
          path: current.path || path,
          sha: current.sha || '',
          htmlUrl: current.htmlUrl || '',
          verifiedHash: this.api.sha256Hex ? await this.api.sha256Hex(content) : '',
          recoveredAfterUnknownWrite: true,
          recoveredWithoutWrite: true
        };
      }

      if (current) {
        if (!baseSha || current.sha !== baseSha) {
          const error = new Error(baseSha
            ? 'The remote Markdown changed after the failed or unverified write. Refresh and review before retrying.'
            : 'The remote Markdown path now exists with different content. No overwrite was attempted.');
          error.kind = 'conflict';
          error.details = { path, expectedBaseSha: baseSha, currentSha: current.sha || '' };
          throw error;
        }
      } else if (baseSha) {
        const error = new Error('The remote Markdown target disappeared after the failed or unverified write. No recreate was attempted.');
        error.kind = 'remote_deleted';
        error.details = { path, expectedBaseSha: baseSha };
        throw error;
      }

      if (typeof beforeWrite === 'function') await beforeWrite();
      return client.saveVerified({ path, content, baseSha: current ? current.sha : '', message });
    }

    _noteDraftSnapshot(note) {
      const value = this.api.normalizeNote(note);
      return JSON.stringify({
        id: value.id,
        title: value.title,
        body: value.body,
        links: value.links,
        categoryIds: value.categoryIds,
        categoryIntentPending: Boolean(value.categoryIntentPending),
        codecExtra: value.codecExtra
      });
    }

    _noteMarkdownRetryAction(note) {
      return this._feedbackAction('retry-note-markdown', 'Verify or retry Note Markdown', () => this.retryNoteMarkdown(this.current || note));
    }

    async _verifiedTransferSource(note) {
      const local = await this.saveLocal(note);
      const bound = this.api.normalizeRemote(local.remote);
      if (!this.api.hasCompleteRemoteIdentity(bound)) throw new Error('Image-aware transfer requires a verified repository Note.');
      const workspace = this._activeWorkspace();
      if (!workspace || !this._sameRepositoryContext(bound, workspace)) throw new Error('The first transfer slice supports only the Note repository and branch selected by the active workspace.');
      if ((this.api.pendingAssetIds ? this.api.pendingAssetIds(local.body) : []).length) throw new Error('Save and verify pending images before transferring the Note.');
      if (local.state !== this.api.NOTE_STATES.SAVED_VERIFIED) throw new Error('Save and verify the current Note before transferring it.');
      const client = await this._client(bound);
      const expectedSourceContent = this.api.encodeNoteMarkdown(local);
      let sourceRemote;
      try { sourceRemote = await client.read(bound.path); }
      catch (error) { throw new Error(`Unable to verify the source Note before transfer: ${error && error.message || error}`); }
      if (!sourceRemote || sourceRemote.sha !== bound.sha || sourceRemote.content !== expectedSourceContent) throw new Error('The source Note no longer matches its last verified GitHub base. Refresh, reconcile or save it before transfer.');
      return { local, bound, client, sourceRemote, sourceMarkdown: this.api.visibleNoteMarkdown(local) };
    }

    async _readTransferTarget(client, targetPath, mode) {
      if (mode === 'create') {
        try {
          const existing = typeof client.readMetadata === 'function' ? await client.readMetadata(targetPath) : await client.read(targetPath, { allowMissingContent: true });
          if (existing) throw new Error('Transfer target already exists. Choose append mode or another path.');
        } catch (error) {
          if (error && error.kind === 'not_found') return null;
          throw error;
        }
        return null;
      }
      let targetBytes;
      try { targetBytes = await client.readBytes(targetPath, { maxBytes: 2 * 1024 * 1024 }); }
      catch (error) {
        if (error && error.kind === 'not_found') throw new Error('Append target does not exist. Choose create mode or an existing Markdown file.');
        throw error;
      }
      const content = this.api.decodeUtf8Bytes
        ? this.api.decodeUtf8Bytes(targetBytes.bytes, { fatal: true, message: `Append target is not valid UTF-8 and cannot be modified safely: ${targetPath}` })
        : new TextDecoder('utf-8', { fatal: true }).decode(targetBytes.bytes);
      return { ...targetBytes, content };
    }

    _normalizedTransferInput(input = {}) {
      const mode = input.mode === 'append' ? 'append' : 'create';
      const targetPath = this.api.normalizeCanonicalRepositoryPath(String(input.targetPath || this.transferDraft.targetPath || '').trim(), 'Transfer target path');
      if (!/\.md$/i.test(targetPath)) throw new Error('Transfer target must end in .md.');
      return { mode, targetPath };
    }

    updateTransferDraft(input = {}) {
      const mode = input.mode === 'append' ? 'append' : 'create';
      const fileName = String(input.fileName || this.transferDraft.fileName || 'copied-note.md');
      const changed = mode !== this.transferDraft.mode || fileName !== this.transferDraft.fileName;
      this.transferPlan = null;
      this.transferRetry = null;
      this.transferDraft = { ...this.transferDraft, mode, fileName, targetPath: changed ? '' : this.transferDraft.targetPath, plan: null };
      this._setUi({ status: changed ? 'Transfer target choice changed. Choose a target and prepare a new preview.' : '' });
      return this.transferDraft;
    }

    async prepareTransfer(note, input = {}) {
      return this._runRemoteOperation('Preparing image-aware transfer preview…', () => this._prepareTransferUnlocked(note, input));
    }

    _prepareTransferAgainAction(note) {
      return this._feedbackAction('prepare-transfer-again', 'Prepare transfer again', () => this.prepareTransfer(this.current || note, this.transferDraft || {}));
    }

    _retryTransferMarkdownAction(note) {
      return this._feedbackAction('retry-transfer-markdown', 'Verify or retry target Markdown', () => this.retryTransferMarkdown(this.current || note));
    }

    async _prepareTransferUnlocked(note, input = {}) {
      const { mode, targetPath } = this._normalizedTransferInput(input);
      const source = await this._verifiedTransferSource(note);
      if (targetPath === source.bound.path) throw new Error('Transfer target must differ from the source Note path.');
      const targetRemote = await this._readTransferTarget(source.client, targetPath, mode);
      const plan = this.api.buildImageAwareTransferPlan({
        api: this.api,
        sourcePath: source.bound.path,
        targetPath,
        sourceMarkdown: source.sourceMarkdown,
        targetMarkdown: targetRemote ? targetRemote.content : '',
        mode
      });
      const loadedAssets = [];
      const partialResults = [...plan.diagnostics];
      for (const asset of plan.assets) {
        try {
          const sourceAsset = await source.client.readBytes(asset.sourcePath, { maxBytes: this.api.DEFAULT_MAX_IMAGE_BYTES });
          const sourceMime = this.api.mimeTypeForImagePath ? this.api.mimeTypeForImagePath(asset.sourcePath) : '';
          this.api.validateImageInput({ type: sourceMime, bytes: sourceAsset.bytes }, { maxBytes: this.api.DEFAULT_MAX_IMAGE_BYTES });
          loadedAssets.push({ ...asset, bytes: sourceAsset.bytes, sourceSha: sourceAsset.sha || '', sourceVerifiedHash: sourceAsset.verifiedHash || '' });
        } catch (error) {
          partialResults.push({ target: asset.sourcePath, status: 'failed', message: String(error && error.message || error) });
        }
      }

      const assets = [];
      if (loadedAssets.length) {
        try {
          const batchPlans = await this.api.planRepositoryAssets({
            client: source.client,
            assets: loadedAssets.map((asset) => ({ key: asset.sourcePath, path: asset.desiredPath, bytes: asset.bytes })),
            maxBytes: this.api.DEFAULT_MAX_IMAGE_BYTES
          });
          for (let index = 0; index < loadedAssets.length; index += 1) {
            const asset = loadedAssets[index];
            const expectedPlan = batchPlans[index];
            const status = expectedPlan.status === 'reused' ? 'reuse' : expectedPlan.collision ? 'suffix' : 'copy';
            assets.push({ ...asset, expectedPlan });
            partialResults.push({ target: expectedPlan.path, status, message: `${status === 'reuse' ? 'Byte-identical target will be reused' : status === 'suffix' ? 'Different-byte or reserved-path collision; safe suffixed path will be created' : 'New repository asset will be copied'} from ${asset.sourcePath}.` });
          }
        } catch (error) {
          partialResults.push({ target: targetPath, status: 'failed', message: `Unable to reserve the complete target asset plan: ${String(error && error.message || error)}` });
        }
      }

      const ready = !plan.blocked && loadedAssets.length === plan.assets.length && assets.length === loadedAssets.length && !partialResults.some((item) => item.status === 'failed');
      const planId = `transfer-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
      this.transferRetry = null;
      this.transferPlan = ready ? {
        planId,
        noteId: source.local.id,
        repository: { owner: source.bound.owner, repo: source.bound.repo, branch: source.bound.branch },
        sourcePath: source.bound.path,
        sourceSha: source.bound.sha,
        sourceContent: this.api.encodeNoteMarkdown(source.local),
        sourceMarkdown: source.sourceMarkdown,
        targetPath,
        targetSha: targetRemote ? targetRemote.sha : '',
        targetContent: targetRemote ? targetRemote.content : '',
        mode,
        plan,
        assets,
        partialResults
      } : null;
      const summary = {
        planId,
        ready,
        sourcePath: source.bound.path,
        targetPath,
        mode,
        targetState: targetRemote ? `existing @ ${targetRemote.sha}` : 'absent',
        assets: assets.map((asset) => ({ sourcePath: asset.sourcePath, targetPath: asset.expectedPlan.path, status: asset.expectedPlan.status === 'reused' ? 'reuse' : asset.expectedPlan.collision ? 'suffix' : 'copy' })),
        diagnostics: plan.diagnostics
      };
      this.transferDraft = { ...this.transferDraft, targetPath, mode, plan: summary };
      this._pushFeedback({ id: 'note-image-transfer-preview', scope: 'notes', severity: ready ? 'info' : 'error', title: ready ? 'Transfer preview ready' : 'Transfer preview blocked', message: ready ? `${assets.length} repository image asset(s) planned. All target paths are reserved before execution.` : 'Resolve blocked or failed image rows, then prepare the preview again. No repository write occurred.', target: targetPath, partialResults, actions: ready ? [] : [this._prepareTransferAgainAction(note)] });
      this._setUi({ status: ready ? 'Transfer preview ready. No repository write has occurred.' : 'Transfer preview is blocked. No repository write has occurred.' });
      return summary;
    }

    async executePreparedTransfer(note) {
      return this._runRemoteOperation('Executing reviewed Note and image transfer…', () => this._executePreparedTransferUnlocked(note));
    }

    async _executePreparedTransferUnlocked(note) {
      const prepared = this.transferPlan;
      if (!prepared || !prepared.planId) throw new Error('Prepare and review the transfer preview before execution.');
      const source = await this._verifiedTransferSource(note);
      const prepareAgain = () => [this._prepareTransferAgainAction(note)];
      if (source.local.id !== prepared.noteId || source.bound.path !== prepared.sourcePath || source.bound.sha !== prepared.sourceSha || this.api.encodeNoteMarkdown(source.local) !== prepared.sourceContent || source.sourceMarkdown !== prepared.sourceMarkdown) {
        const error = new Error('The source Note changed after the transfer preview. Prepare the transfer again.');
        error.kind = 'plan_stale';
        throw this._attachFeedbackActions(error, prepareAgain());
      }
      const targetRemote = await this._readTransferTarget(source.client, prepared.targetPath, prepared.mode);
      if ((targetRemote ? targetRemote.sha : '') !== prepared.targetSha || (targetRemote ? targetRemote.content : '') !== prepared.targetContent) {
        const error = new Error('The target Markdown changed after the transfer preview. Prepare the transfer again.');
        error.kind = 'plan_stale';
        throw this._attachFeedbackActions(error, prepareAgain());
      }

      for (const asset of prepared.assets) {
        let currentSource;
        try { currentSource = await source.client.readBytes(asset.sourcePath, { maxBytes: this.api.DEFAULT_MAX_IMAGE_BYTES }); }
        catch (cause) {
          const error = new Error(`The source image is no longer readable: ${asset.sourcePath}. Prepare the transfer again.`);
          error.kind = 'plan_stale';
          error.cause = cause;
          error.partialResults = [{ target: asset.sourcePath, status: 'stale', message: String(cause && cause.message || cause) }];
          throw this._attachFeedbackActions(error, prepareAgain());
        }
        if ((asset.sourceSha && currentSource.sha !== asset.sourceSha) || !this.api.bytesEqual(currentSource.bytes, asset.bytes)) {
          const error = new Error(`The source image changed after the transfer preview: ${asset.sourcePath}. Prepare the transfer again.`);
          error.kind = 'plan_stale';
          error.partialResults = [{ target: asset.sourcePath, status: 'stale', message: `Expected source SHA ${asset.sourceSha || 'unknown'}; current SHA ${currentSource.sha || 'unknown'}.` }];
          throw this._attachFeedbackActions(error, prepareAgain());
        }
      }

      const currentPlans = await this.api.planRepositoryAssets({
        client: source.client,
        assets: prepared.assets.map((asset) => ({ key: asset.sourcePath, path: asset.desiredPath, bytes: asset.bytes })),
        maxBytes: this.api.DEFAULT_MAX_IMAGE_BYTES
      });
      for (let index = 0; index < prepared.assets.length; index += 1) {
        const asset = prepared.assets[index];
        const currentPlan = currentPlans[index];
        if (!currentPlan || currentPlan.path !== asset.expectedPlan.path || currentPlan.status !== asset.expectedPlan.status) {
          const error = new Error(`The target asset plan changed for ${asset.sourcePath}. Prepare the transfer again before any writes.`);
          error.kind = 'plan_stale';
          error.partialResults = [{ target: asset.expectedPlan.path, status: 'stale', message: `Expected ${asset.expectedPlan.status}; now ${currentPlan ? `${currentPlan.status} at ${currentPlan.path}` : 'unavailable'}.` }];
          throw this._attachFeedbackActions(error, prepareAgain());
        }
      }

      const actualPaths = new Map();
      const partialResults = [...prepared.plan.diagnostics];
      for (const asset of prepared.assets) {
        try {
          const written = await this.api.ensureRepositoryAsset({
            client: source.client,
            path: asset.desiredPath,
            bytes: asset.bytes,
            maxBytes: this.api.DEFAULT_MAX_IMAGE_BYTES,
            expectedPlan: asset.expectedPlan,
            message: `Copy image for ${prepared.targetPath}`
          });
          actualPaths.set(asset.sourcePath, written.path);
          partialResults.push({ target: written.path, status: written.status || 'created', message: `${written.status === 'reused' ? 'Byte-identical asset reused' : 'Repository asset copied and verified'} from ${asset.sourcePath}.` });
        } catch (error) {
          const enriched = this._appendPartialResults(error, partialResults, { target: asset.sourcePath, status: 'failed', message: String(error && error.message || error) });
          throw this._attachFeedbackActions(enriched, prepareAgain());
        }
      }
      const content = this.api.finalizeImageAwareTransfer(prepared.plan, actualPaths, this.api);
      let result;
      try {
        result = await source.client.saveVerified({ path: prepared.targetPath, content, baseSha: prepared.targetSha, message: `${prepared.mode === 'append' ? 'Append' : 'Create'} Markdown from linked Note ${source.local.title || source.local.id}` });
      } catch (error) {
        const enriched = this._appendPartialResults(error, partialResults, { target: prepared.targetPath, status: 'failed', message: `Target Markdown was not verified: ${String(error && error.message || error)}` });
        this.transferRetry = {
          prepared,
          content,
          actualPaths: Array.from(actualPaths.entries()),
          partialResults: enriched.partialResults || partialResults
        };
        throw this._attachFeedbackActions(enriched, [this._retryTransferMarkdownAction(note), this._prepareTransferAgainAction(note)]);
      }
      partialResults.push({ target: prepared.targetPath, status: 'verified', message: 'Target Markdown verified by read-back.' });
      this.transferPlan = null;
      this.transferRetry = null;
      this.transferDraft = { ...this.transferDraft, targetPath: prepared.targetPath, mode: prepared.mode, plan: { ...(this.transferDraft.plan || {}), ready: false, completed: true } };
      this._pushFeedback({ id: 'note-image-transfer', scope: 'notes', severity: 'success', title: 'Note and images copied', message: `${prepared.assets.length} repository image asset(s) processed.`, target: prepared.targetPath, partialResults });
      this._setUi({ status: 'Image-aware Markdown transfer verified.' });
      return { ...result, partialResults, assetCount: prepared.assets.length };
    }

    async retryTransferMarkdown(note) {
      return this._runRemoteOperation('Verifying or retrying target Markdown…', () => this._retryTransferMarkdownUnlocked(note));
    }

    async _retryTransferMarkdownUnlocked(note) {
      const retry = this.transferRetry;
      if (!retry || !retry.prepared || !retry.content) throw new Error('No failed target-Markdown stage is available to verify or retry. Prepare the transfer again.');
      const prepared = retry.prepared;
      const prepareAgain = () => [this._prepareTransferAgainAction(note)];
      const client = await this._client(prepared.repository || this._repositoryContext(note));
      const actualPaths = new Map(retry.actualPaths || []);

      for (const asset of prepared.assets) {
        const targetPath = actualPaths.get(asset.sourcePath);
        if (!targetPath) {
          const error = new Error(`A verified target-asset path is missing for ${asset.sourcePath}. Prepare the transfer again.`);
          error.kind = 'plan_stale';
          throw this._attachFeedbackActions(error, prepareAgain());
        }
        let targetAsset;
        try { targetAsset = await client.readBytes(targetPath, { maxBytes: this.api.DEFAULT_MAX_IMAGE_BYTES }); }
        catch (cause) {
          const error = new Error(`A previously verified target asset is no longer readable: ${targetPath}. Prepare the transfer again.`);
          error.kind = 'plan_stale';
          error.cause = cause;
          throw this._attachFeedbackActions(error, prepareAgain());
        }
        if (!this.api.bytesEqual(targetAsset.bytes, asset.bytes)) {
          const error = new Error(`A previously verified target asset changed before Markdown recovery: ${targetPath}. Prepare the transfer again.`);
          error.kind = 'plan_stale';
          throw this._attachFeedbackActions(error, prepareAgain());
        }
      }

      let result;
      try {
        result = await this._recoverOrRetryTextWrite({
          client,
          path: prepared.targetPath,
          content: retry.content,
          baseSha: prepared.targetSha,
          message: `${prepared.mode === 'append' ? 'Append' : 'Create'} Markdown from linked Note ${note && (note.title || note.id) || prepared.noteId}`,
          beforeWrite: async () => {
            const source = await this._verifiedTransferSource(note);
            if (source.local.id !== prepared.noteId || source.bound.path !== prepared.sourcePath || source.bound.sha !== prepared.sourceSha || this.api.encodeNoteMarkdown(source.local) !== prepared.sourceContent || source.sourceMarkdown !== prepared.sourceMarkdown) {
              const error = new Error('The source Note changed after the failed transfer. Prepare the transfer again.');
              error.kind = 'plan_stale';
              throw error;
            }
            for (const asset of prepared.assets) {
              const sourceAsset = await source.client.readBytes(asset.sourcePath, { maxBytes: this.api.DEFAULT_MAX_IMAGE_BYTES });
              if ((asset.sourceSha && sourceAsset.sha !== asset.sourceSha) || !this.api.bytesEqual(sourceAsset.bytes, asset.bytes)) {
                const error = new Error(`The source image changed after the failed transfer: ${asset.sourcePath}. Prepare the transfer again.`);
                error.kind = 'plan_stale';
                throw error;
              }
            }
          }
        });
      } catch (error) {
        const enriched = this._appendPartialResults(error, retry.partialResults || [], { target: prepared.targetPath, status: 'failed', message: `Target Markdown verification/retry did not complete: ${String(error && error.message || error)}` });
        const actions = error && (error.kind === 'conflict' || error.kind === 'remote_deleted' || error.kind === 'plan_stale')
          ? prepareAgain()
          : [this._retryTransferMarkdownAction(note), this._prepareTransferAgainAction(note)];
        throw this._attachFeedbackActions(enriched, actions);
      }
      const verificationMessage = result.recoveredWithoutWrite
        ? 'Target Markdown was already present with the exact intended content and was verified without another write.'
        : 'Target Markdown was written and verified by read-back on retry.';
      const partialResults = [...(retry.partialResults || []).filter((item) => !(item.target === prepared.targetPath && item.status === 'failed')), { target: prepared.targetPath, status: 'verified', message: verificationMessage }];
      this.transferPlan = null;
      this.transferRetry = null;
      this.transferDraft = { ...this.transferDraft, targetPath: prepared.targetPath, mode: prepared.mode, plan: { ...(this.transferDraft.plan || {}), ready: false, completed: true } };
      this._pushFeedback({ id: 'note-image-transfer', scope: 'notes', severity: 'success', title: result.recoveredWithoutWrite ? 'Target Markdown verified' : 'Target Markdown retry succeeded', message: 'Previously verified image assets were reused without rewriting them.', target: prepared.targetPath, partialResults });
      this._setUi({ status: result.recoveredWithoutWrite ? 'Target Markdown verified after an unknown write result.' : 'Target Markdown verified without repeating asset writes.' });
      return { ...result, partialResults, assetCount: prepared.assets.length };
    }

    async transferNoteToMarkdown(note, input = {}) {
      return this.prepareTransfer(note, input);
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
      await this.openRepositoryEntry({ type: 'file', path: canonicalPath, name: canonicalPath.slice(canonicalPath.lastIndexOf('/') + 1) }, context);
      if (link.target.anchor) this._setUi({ status: `Opened ${canonicalPath} in the app. Requested anchor: #${link.target.anchor}. Use Open on GitHub for anchored browser navigation.` });
    }

    async _persistRemoteState(note, status) {
      await this.store.put(note);
      this.current = note;
      await this.refreshList();
      this._setUi({ status: status || note.stateMessage });
      return note;
    }

    async _setNoteMembershipInCategory(categoryId, note, shouldInclude, client, workspace) {
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
      if (!shouldInclude && !found) return { target: categoryId, status: 'unchanged', message: 'Note was not an explicit member.' };
      const content = this.api.encodeCategoryDefinition({
        id: definition.id,
        name: definition.name,
        description: definition.description,
        impliedCategories: definition.impliedCategories || [],
        files: definition.files || [],
        notes: kept
      });
      if (content === latestFile.content) return { target: categoryId, status: 'unchanged', message: 'Membership already matched.' };
      await client.saveVerified({
        path: record.path,
        content,
        baseSha: latestFile.sha,
        message: `${shouldInclude ? 'Add' : 'Remove'} Note ${note.title || note.id} ${shouldInclude ? 'to' : 'from'} category ${definition.name}`
      });
      return { target: categoryId, status: 'completed', message: shouldInclude ? 'Note assigned and verified.' : 'Note unassigned and verified.' };
    }

    async _syncNoteCategories(note) {
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
      await this._refreshCategoriesUnlocked(client, workspace);
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
    }

    async saveRemote(note) {
      return this._runRemoteOperation('Saving and verifying the configured GitHub target…', () => this._saveRemoteUnlocked(note));
    }

    async retryNoteMarkdown(note) {
      return this._runRemoteOperation('Verifying or retrying Note Markdown…', () => this._retryNoteMarkdownUnlocked(note));
    }

    async _retryNoteMarkdownUnlocked(note) {
      const retry = this.noteMarkdownRetry;
      if (!retry || !retry.noteId || !retry.content) throw new Error('No failed Note-Markdown stage is available to verify or retry. Save the Note again.');
      const current = await this.store.get(retry.noteId) || this.api.normalizeNote(note);
      if (!current || current.id !== retry.noteId) throw new Error('The Note for this recovery action is no longer available.');
      const currentSnapshot = this._noteDraftSnapshot(current);
      const client = await this._client(retry.target);
      let result;
      try {
        result = await this._recoverOrRetryTextWrite({
          client,
          path: retry.target.path,
          content: retry.content,
          baseSha: retry.baseSha,
          message: `${retry.baseSha ? 'Update' : 'Create'} linked Note ${current.title || current.id}`,
          beforeWrite: async () => {
            if (currentSnapshot !== retry.localSnapshot) {
              const error = new Error('The local Note changed after the failed or unverified write. The older Markdown will not be written again.');
              error.kind = 'plan_stale';
              throw error;
            }
          }
        });
      } catch (error) {
        const enriched = this._appendPartialResults(error, retry.assetResults || [], { target: retry.target.path, status: 'failed', message: `Note Markdown verification/retry did not complete: ${String(error && error.message || error)}` });
        const actions = error && (error.kind === 'conflict' || error.kind === 'remote_deleted' || error.kind === 'plan_stale')
          ? []
          : [this._noteMarkdownRetryAction(current)];
        throw this._attachFeedbackActions(enriched, actions);
      }

      let settled;
      if (currentSnapshot === retry.localSnapshot) {
        settled = this.api.markSavedVerified(retry.remoteNote, { ...retry.target, ...result });
        await this._persistRemoteState(settled, result.recoveredWithoutWrite ? 'Remote Note content verified after an unknown write result.' : 'Remote Note Markdown verified on retry.');
        await this._finalizePendingAssets(settled.id, retry.pendingIds || []);
      } else {
        settled = this.api.updateNote(current, {
          remote: { ...retry.target, ...result },
          state: this.api.NOTE_STATES.CHANGED_AFTER_SAVE,
          stateMessage: 'The previously intended remote Note was verified; newer local edits remain unsaved.'
        });
        await this._persistRemoteState(settled, settled.stateMessage);
      }
      const partialResults = [...(retry.assetResults || []), { target: retry.target.path, status: 'verified', message: result.recoveredWithoutWrite ? 'Exact intended Note Markdown was found and verified without another write.' : 'Note Markdown was written and verified on retry.' }];
      this.noteMarkdownRetry = null;
      this._pushFeedback({ id: 'note-image-save', scope: 'notes', severity: 'success', title: result.recoveredWithoutWrite ? 'Note Markdown verified' : 'Note Markdown retry succeeded', message: currentSnapshot === retry.localSnapshot ? 'The Note and its previously verified image assets are now verified.' : 'The remote result was verified; newer local edits were preserved.', target: retry.target.path, partialResults });
      if (currentSnapshot === retry.localSnapshot) {
        try { await this._syncNoteCategories(settled); } catch (categoryError) {
          const pending = this.api.updateNote(settled, { state: this.api.NOTE_STATES.SAVED_VERIFIED, stateMessage: categoryError.message, categoryIntentPending: true });
          await this._persistRemoteState(pending, categoryError.message);
          throw categoryError;
        }
      }
      return this.current && this.current.id === settled.id ? this.current : settled;
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

      const pendingIds = this.api.pendingAssetIds ? this.api.pendingAssetIds(local.body) : [];
      let prepared;
      try { prepared = await this._preparePendingAssets(local, target, client); }
      catch (error) {
        throw this._attachFeedbackActions(error, [this._feedbackAction('retry-note-save-assets', 'Retry failed image save', () => this.saveRemote(this.current || local))]);
      }
      local = this.api.markSaving(local);
      await this.store.put(local);
      this.current = local;
      await this.refreshList();
      const content = this.api.encodeNoteMarkdown(prepared.remoteNote);
      let result;
      try {
        result = await client.saveVerified({
          path: target.path,
          content,
          baseSha: remote ? remote.sha : '',
          message: `${remote ? 'Update' : 'Create'} linked Note ${local.title || local.id}`
        });
      } catch (error) {
        this.noteMarkdownRetry = {
          noteId: local.id,
          localSnapshot: this._noteDraftSnapshot(local),
          remoteNote: prepared.remoteNote,
          target: { ...target },
          baseSha: remote ? remote.sha : '',
          content,
          pendingIds: [...pendingIds],
          assetResults: [...prepared.assets]
        };
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
        const enriched = this._appendPartialResults(error, prepared.assets, { target: target.path, status: 'failed', message: `Note Markdown was not verified: ${String(error && error.message || error)}` });
        throw this._attachFeedbackActions(enriched, [this._noteMarkdownRetryAction(local)]);
      }

      this.noteMarkdownRetry = null;
      local = this.api.markSavedVerified(prepared.remoteNote, { ...target, ...result });
      await this._persistRemoteState(local, result.recoveredAfterUnknownWrite ? 'Remote content verified after an initially unknown write result.' : 'Remote save verified by read-back.');
      await this._finalizePendingAssets(local.id, pendingIds);
      if (prepared.assets.length) this._pushFeedback({ id: 'note-image-save', scope: 'notes', severity: 'success', title: 'Note images saved', message: `${prepared.assets.length} image asset(s) were verified before the Note write.`, partialResults: prepared.assets });
      try {
        const categoryResults = await this._syncNoteCategories(local);
        if (categoryResults.length) this._pushFeedback({ id: 'note-category-sync', scope: 'notes', severity: 'success', title: 'Note and categories saved', message: `${categoryResults.length} category membership change(s) were verified.`, partialResults: categoryResults });
        return this.current && this.current.id === local.id ? this.current : local;
      } catch (categoryError) {
        const verified = this.current && this.current.id === local.id ? this.current : local;
        const pending = this.api.updateNote(verified, { state: this.api.NOTE_STATES.SAVED_VERIFIED, stateMessage: categoryError.message, categoryIntentPending: true });
        await this._persistRemoteState(pending, categoryError.message);
        throw categoryError;
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
      const pendingIds = this.api.pendingAssetIds ? this.api.pendingAssetIds(local.body) : [];
      let prepared;
      try { prepared = await this._preparePendingAssets(local, target, client); }
      catch (error) {
        throw this._attachFeedbackActions(error, [this._feedbackAction('retry-note-copy-assets', 'Retry failed image copy', () => this.copyRemote(this.current || local))]);
      }
      local = this.api.markSaving(local, 'Copying to the explicitly selected target…');
      await this.store.put(local);
      this.current = local;
      await this.refreshList();
      const content = this.api.encodeNoteMarkdown(prepared.remoteNote);
      try {
        const result = await client.saveVerified({
          path: target.path,
          content,
          baseSha: '',
          message: `Copy linked Note ${local.title || local.id}`
        });
        local = this.api.markSavedVerified(prepared.remoteNote, { ...target, ...result });
        const persisted = await this._persistRemoteState(local, 'Remote copy verified by read-back. The old remote file was not deleted.');
        await this._finalizePendingAssets(local.id, pendingIds);
        return persisted;
      } catch (error) {
        local = error.kind === 'conflict'
          ? this.api.markConflict(local, error.message)
          : this.api.markSaveFailed(local, error.message);
        await this._persistRemoteState(local);
        const enriched = this._appendPartialResults(error, prepared.assets, { target: target.path, status: 'failed', message: `Copied Note Markdown was not verified: ${String(error && error.message || error)}` });
        throw this._attachFeedbackActions(enriched, [this._feedbackAction('retry-note-copy-markdown', 'Retry copied Note Markdown only', () => this.copyRemote(this.current || local))]);
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
        if ((this.api.pendingAssetIds ? this.api.pendingAssetIds(note && note.body) : []).length) {
          throw new Error('Save or remove pending images before loading remote content; otherwise their local bytes could be detached from the Note body.');
        }
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
        const pendingIds = this.api.pendingAssetIds ? this.api.pendingAssetIds(local.body) : [];
        let prepared;
        try { prepared = await this._preparePendingAssets(local, bound, client); }
        catch (error) {
          throw this._attachFeedbackActions(error, [this._feedbackAction('retry-note-overwrite-assets', 'Retry failed image save', () => this.overwriteRemote(this.current || local))]);
        }
        local = this.api.markSaving(local, remote ? 'Explicitly overwriting the current bound remote base…' : 'Explicitly restoring the missing bound remote target…');
        await this.store.put(local);
        this.current = local;
        await this.refreshList();
        const content = this.api.encodeNoteMarkdown(prepared.remoteNote);
        try {
          const result = await client.saveVerified({
            path: bound.path,
            content,
            baseSha: remote ? remote.sha : '',
            message: `${remote ? 'Reconcile' : 'Restore'} linked Note ${local.title || local.id}`
          });
          local = this.api.markSavedVerified(prepared.remoteNote, { ...bound, ...result });
          const persisted = await this._persistRemoteState(local, remote ? 'Bound remote explicitly overwritten and verified by read-back.' : 'Missing bound remote explicitly restored and verified by read-back.');
          await this._finalizePendingAssets(local.id, pendingIds);
          return persisted;
        } catch (error) {
          local = error.kind === 'conflict'
            ? this.api.markConflict(local, error.message)
            : this.api.markSaveFailed(local, error.message);
          await this._persistRemoteState(local);
          const enriched = this._appendPartialResults(error, prepared.assets, { target: bound.path, status: 'failed', message: `Bound Note Markdown was not verified: ${String(error && error.message || error)}` });
          throw this._attachFeedbackActions(enriched, [this._feedbackAction('retry-note-overwrite-markdown', 'Retry bound Note Markdown only', () => this.overwriteRemote(this.current || local))]);
        }
      });
    }

    async deleteNote(id) {
      if (!id) return;
      if (typeof window !== 'undefined' && !window.confirm('Delete this local Note? Remote repository content is not deleted.')) return;
      await this.store.delete(id);
      if (this.pendingAssetStore && typeof this.pendingAssetStore.deleteForNote === 'function') await this.pendingAssetStore.deleteForNote(id);
      this.current = null;
      this.pendingAssets = [];
      this._disposeMediaLoader('note');
      this.noteRendered = null;
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
