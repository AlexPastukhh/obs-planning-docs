(function (root, factory) {
  const api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
  if (root.ObsLinkedNotes && root.ObsLinkedNotes.LinkedNotesApp && root.ObsLinkedNotes.LinkedNotesUI) {
    try { api.installRepositoryLocalChanges(root.ObsLinkedNotes); } catch (error) { /* bootstrap reports failures later */ }
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function (root) {
  'use strict';

  const APP_PATCH = '__obsRepositoryLocalChangesAppV1';
  const UI_PATCH = '__obsRepositoryLocalChangesUiV1';

  function apiOrThrow(app) {
    const api = app && app.api || root.ObsLinkedNotes || {};
    for (const name of ['normalizeRepositoryLocalChangeState', 'repositoryLocalChangeMap', 'upsertRepositoryLocalChange', 'publishCurrentRepositoryChange', 'publishAllRepositoryChanges', 'bytesToBase64']) {
      if (typeof api[name] !== 'function') throw new Error(`Local-first repository dependency is unavailable: ${name}.`);
    }
    return api;
  }

  function pathForEditor(api, editor) {
    const mode = editor.mode;
    const parent = api.normalizeFilesWorkspacePath ? api.normalizeFilesWorkspacePath(editor.parentPath || '', { allowRoot: true }) : String(editor.parentPath || '');
    if (mode === 'edit') return api.normalizeRepositoryLocalPath(editor.path);
    const name = api.normalizeFilesWorkspacePath ? api.normalizeFilesWorkspacePath(editor.name, { allowRoot: false, label: mode === 'folder' ? 'Folder name' : 'File name' }) : String(editor.name || '');
    if (name.includes('/')) throw new Error('Name must be one repository path segment.');
    const joined = parent ? `${parent}/${name}` : name;
    return mode === 'folder' ? `${joined}/.gitkeep` : joined;
  }

  function mergePendingEntries(app, path, entries) {
    const api = apiOrThrow(app);
    const folder = api.normalizeFilesWorkspacePath ? api.normalizeFilesWorkspacePath(path || '', { allowRoot: true }) : String(path || '');
    const prefix = folder ? `${folder}/` : '';
    const merged = new Map((Array.isArray(entries) ? entries : []).map((entry) => [entry.path, { ...entry }]));
    for (const change of api.normalizeRepositoryLocalChangeState(app.referenceObjectLocalState || null).files) {
      if (!change.path.startsWith(prefix)) continue;
      const rest = change.path.slice(prefix.length);
      if (!rest) continue;
      const slash = rest.indexOf('/');
      const name = slash < 0 ? rest : rest.slice(0, slash);
      const entryPath = prefix ? `${folder}/${name}` : name;
      const directChange = slash < 0 ? change : null;
      const current = merged.get(entryPath);
      merged.set(entryPath, {
        ...(current || {}),
        type: slash < 0 ? 'file' : 'dir',
        path: entryPath,
        name,
        sha: directChange ? directChange.baseSha : String(current && current.sha || ''),
        size: directChange ? (directChange.payloadKind === 'binary' ? api.base64ToBytes(directChange.bytesBase64).byteLength : new TextEncoder().encode(directChange.content).byteLength) : Number(current && current.size || 0),
        localPending: true
      });
    }
    const values = [...merged.values()];
    return app.api.sortRepositoryEntries ? app.api.sortRepositoryEntries(values) : values.sort((left, right) => (left.type === right.type ? left.name.localeCompare(right.name) : left.type === 'dir' ? -1 : 1));
  }

  function patchApp(App) {
    if (!App || !App.prototype || App.prototype[APP_PATCH]) return false;
    Object.defineProperty(App.prototype, APP_PATCH, { value: true });
    const originalStart = App.prototype.start;
    const originalUiState = App.prototype._workspaceUiState;
    const originalOpenRepositoryEntry = App.prototype.openRepositoryEntry;
    const originalBrowseRepository = App.prototype.browseRepository;

    App.prototype._repositoryPendingUiState = function repositoryPendingUiState() {
      const state = apiOrThrow(this).normalizeRepositoryLocalChangeState(this.referenceObjectLocalState || null);
      const previewPath = this.repositoryPreview && this.repositoryPreview.path || '';
      return {
        repositoryPendingChanges: state.files.map((file) => ({ path: file.path, source: file.source, payloadKind: file.payloadKind, operation: file.operation, updatedAt: file.updatedAt })),
        repositoryPendingCount: state.files.length,
        repositoryCurrentFilePending: Boolean(previewPath && state.files.some((file) => file.path === previewPath))
      };
    };

    if (typeof originalUiState === 'function') App.prototype._workspaceUiState = function localChangesWorkspaceUiState(...args) {
      const state = originalUiState.apply(this, args);
      return { ...state, repositoryEntries: mergePendingEntries(this, state.repositoryPath || '', state.repositoryEntries), ...this._repositoryPendingUiState() };
    };

    App.prototype._openPendingRepositoryFile = function openPendingRepositoryFile(change) {
      const workspace = this._activeWorkspace();
      const binary = change.payloadKind === 'binary';
      const size = binary ? apiOrThrow(this).base64ToBytes(change.bytesBase64).byteLength : new TextEncoder().encode(change.content).byteLength;
      this.repositoryPreview = {
        kind: binary ? 'unsupported' : 'text', path: change.path, name: change.path.slice(change.path.lastIndexOf('/') + 1), size, sha: change.baseSha,
        ...(binary ? { content: null, message: 'Pending binary file; exact bytes are preserved locally and can be published.' } : { content: change.content }),
        localRepositoryChange: true, context: workspace ? { owner: workspace.owner, repo: workspace.repo, branch: workspace.branch } : null
      };
      this.repositoryPath = change.path.includes('/') ? change.path.slice(0, change.path.lastIndexOf('/')) : '';
      this.repositoryEditor = { mode: 'none', parentPath: this.repositoryPath, path: '', name: '', content: '', baseSha: '' };
      this.fileViewMode = 'source';
      this.fileRendered = null;
      this.surface = 'files';
      this._setUi({ status: `Opened pending local state for ${change.path}. GitHub was not read or changed.` });
      return this.repositoryPreview;
    };

    if (typeof originalOpenRepositoryEntry === 'function') App.prototype.openRepositoryEntry = async function localChangesOpenRepositoryEntry(entry, ...args) {
      await this._ensureReferenceObjectLocalStateCurrent({ silent: true });
      const api = apiOrThrow(this);
      const path = api.normalizeRepositoryLocalPath(entry && entry.path);
      const change = api.repositoryLocalChangeMap(this.referenceObjectLocalState).get(path);
      if (change && (!entry || entry.type !== 'dir')) return this._openPendingRepositoryFile(change);
      if (entry && entry.type === 'dir' && this.referenceObjectLocalState.files.some((file) => file.path.startsWith(`${path}/`))) return this.browseRepository(path);
      return originalOpenRepositoryEntry.call(this, entry, ...args);
    };

    if (typeof originalBrowseRepository === 'function') App.prototype.browseRepository = async function localChangesBrowseRepository(path = '', ...args) {
      await this._ensureReferenceObjectLocalStateCurrent({ silent: true });
      const api = apiOrThrow(this);
      const folder = api.normalizeFilesWorkspacePath ? api.normalizeFilesWorkspacePath(path || '', { allowRoot: true }) : String(path || '');
      const hasPending = this.referenceObjectLocalState.files.some((file) => !folder || file.path.startsWith(`${folder}/`));
      if (!hasPending) return originalBrowseRepository.call(this, path, ...args);
      const client = await this._client(this._activeWorkspace());
      let remote = [];
      try { remote = await client.listDirectory(folder, { maxEntries: 200 }); }
      catch (error) { if (!error || error.kind !== 'not_found') throw error; }
      this.repositoryPath = folder;
      this.repositoryEntries = mergePendingEntries(this, folder, remote);
      this.repositoryPreview = null;
      this.repositoryBrowseLoaded = true;
      this.surface = 'files';
      this._setUi({ status: `Repository folder ${folder || '/'} loaded with pending local entries.` });
      return this.repositoryEntries;
    };

    App.prototype._stageRepositoryChange = async function stageRepositoryChange(change, options = {}) {
      const api = apiOrThrow(this);
      await this._ensureReferenceObjectLocalStateCurrent({ silent: true });
      const previous = api.repositoryLocalChangeMap(this.referenceObjectLocalState).get(change.path);
      const next = api.upsertRepositoryLocalChange(this.referenceObjectLocalState, {
        ...change,
        baseSha: previous ? previous.baseSha : String(change.baseSha || ''),
        updatedAt: new Date().toISOString()
      });
      await this._persistReferenceObjectLocalState(next, { silent: true });
      this.referenceFreshnessDiagnostics = null;
      if (!options.silent) this._setUi({ status: `${change.path} saved locally. GitHub was not changed.` });
      return api.repositoryLocalChangeMap(next).get(change.path);
    };

    App.prototype._stageRepositoryTextChange = function stageRepositoryTextChange(path, baseSha, content, options = {}) {
      const maxBytes = this.api.DEFAULT_TEXT_FILE_MAX_BYTES || this.api.DEFAULT_PREVIEW_MAX_BYTES || (512 * 1024);
      const text = String(content == null ? '' : content);
      const size = new TextEncoder().encode(text).byteLength;
      if (size > maxBytes && !options.allowLarger) throw new Error(`Repository text file exceeds the ${maxBytes}-byte local editing limit.`);
      return this._stageRepositoryChange({ path, baseSha, payloadKind: 'text', content: text, source: options.source || 'file-editor', operation: baseSha ? 'update' : 'create', dependencies: options.dependencies || [], message: options.message || '' }, options);
    };

    App.prototype._stageRepositoryBinaryChange = function stageRepositoryBinaryChange(path, baseSha, bytes, options = {}) {
      const value = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes || []);
      return this._stageRepositoryChange({ path, baseSha, payloadKind: 'binary', bytesBase64: apiOrThrow(this).bytesToBase64(value), source: options.source || 'file-copy', operation: baseSha ? 'update' : 'create', dependencies: options.dependencies || [], message: options.message || '' }, options);
    };

    App.prototype.saveRepositoryEditor = async function localFirstSaveRepositoryEditor(input = {}) {
      const api = apiOrThrow(this);
      const editor = { ...(this.repositoryEditor || {}), ...(input || {}) };
      if (!['create', 'edit', 'folder'].includes(editor.mode)) throw new Error('No repository file or folder edit is active.');
      const path = pathForEditor(api, editor);
      const pending = api.repositoryLocalChangeMap(this.referenceObjectLocalState || null);
      if (editor.mode !== 'edit' && pending.has(path)) throw new Error(`A local change already creates ${path}.`);
      const content = editor.mode === 'folder' ? '' : String(editor.content == null ? '' : editor.content);
      const staged = await this._stageRepositoryTextChange(path, editor.mode === 'edit' ? editor.baseSha : '', content, { source: editor.mode === 'folder' ? 'folder-create' : 'file-editor', allowLarger: editor.mode === 'folder', message: `${editor.mode === 'edit' ? 'Update' : 'Create'} ${path} from local state`, silent: true });
      const parent = path.includes('/') ? path.slice(0, path.lastIndexOf('/')) : '';
      this.repositoryEditor = { mode: 'none', parentPath: parent, path: '', name: '', content: '', baseSha: '' };
      if (editor.mode !== 'folder') {
        const workspace = this._activeWorkspace();
        this.repositoryPreview = { kind: 'text', path, name: path.slice(path.lastIndexOf('/') + 1), size: new TextEncoder().encode(content).byteLength, sha: staged.baseSha, content, localRepositoryChange: true, context: workspace ? { owner: workspace.owner, repo: workspace.repo, branch: workspace.branch } : null };
        this.fileViewMode = 'source';
        this.fileRendered = null;
        try { if (typeof this._reindexReferenceObjectFileLocal === 'function') await this._reindexReferenceObjectFileLocal(path, content); } catch (error) { /* explicit validation remains available */ }
      }
      this._setUi({ replaceFileEditor: true, status: `${path} saved locally. Use Update current file or Update all to publish it to GitHub.` });
      return staged;
    };

    App.prototype.applyRepositoryStructure = async function localFirstApplyRepositoryStructure(plan) {
      const api = apiOrThrow(this);
      if (!plan || plan.kind !== 'repository-structure-plan-v1') throw new Error('Prepare a repository structure preview first.');
      const workspace = this._activeWorkspace();
      if (!workspace || !this._sameRepositoryContext(workspace, plan.workspace)) throw new Error('Workspace changed after structure preview. Preview again.');
      const fresh = await this._previewRepositoryStructureRead(plan.source);
      if (fresh.blocked) throw new Error('Repository structure has remote conflicts. Nothing was staged.');
      const targets = [...fresh.files, ...fresh.placeholders];
      const pending = api.repositoryLocalChangeMap(this.referenceObjectLocalState || null);
      for (const path of targets) if (pending.has(path)) throw new Error(`Repository structure target already has a local change: ${path}.`);
      for (const path of targets) await this._stageRepositoryTextChange(path, '', '', { source: 'structure-create', allowLarger: true, silent: true, message: `Create ${path} from local structure` });
      this._setUi({ status: `${targets.length} repository structure file(s) staged locally. GitHub was not changed.` });
      return targets.map((target) => ({ target, status: 'local', message: 'Staged locally.' }));
    };

    App.prototype.applyRepositoryCopy = async function localFirstApplyRepositoryCopy(plan) {
      const api = apiOrThrow(this);
      if (!plan || plan.kind !== 'repository-copy-plan-v1') throw new Error('Prepare a repository copy preview first.');
      const workspace = this._activeWorkspace();
      if (!workspace || !this._sameRepositoryContext(workspace, plan.workspace)) throw new Error('Workspace changed after copy preview. Preview again.');
      const fresh = await this._previewRepositoryCopyRead(plan);
      if (fresh.blocked) throw new Error('Repository copy has remote conflicts. Nothing was staged.');
      const pending = api.repositoryLocalChangeMap(this.referenceObjectLocalState || null);
      for (const mapping of fresh.mappings) if (pending.has(mapping.destinationPath)) throw new Error(`Copy destination already has a local change: ${mapping.destinationPath}.`);
      const client = await this._client(workspace);
      const results = [];
      let bytes = 0;
      for (const mapping of fresh.mappings) {
        const source = await client.readBytes(mapping.sourcePath, { maxBytes: Math.max(1, (this.api.DEFAULT_COPY_MAX_BYTES || 10 * 1024 * 1024) - bytes) });
        if (String(source.sha || '') !== mapping.sourceSha) throw new Error(`Copy source changed after preview: ${mapping.sourcePath}.`);
        bytes += source.bytes.byteLength;
        await this._stageRepositoryBinaryChange(mapping.destinationPath, '', source.bytes, { source: 'file-copy', silent: true, message: `Copy ${mapping.sourcePath} to ${mapping.destinationPath}` });
        results.push({ target: mapping.destinationPath, status: 'local', message: `${source.bytes.byteLength} bytes staged locally.` });
      }
      this._setUi({ status: `${results.length} copied file(s), ${bytes} byte(s), staged locally. GitHub was not changed.` });
      return results;
    };

    App.prototype.saveCategory = async function localFirstSaveCategory(input = {}) {
      const api = apiOrThrow(this);
      const workspace = this._requireCategoryContext();
      const client = await this._client(workspace);
      const id = this.api.normalizeCategoryId(input.id || input.name);
      const existing = this._categoryDefinitionRecord(id);
      const path = existing ? existing.path : `${this._categoryBasePath(workspace)}/${this.api.categoryFileName(id)}`;
      const pending = api.repositoryLocalChangeMap(this.referenceObjectLocalState || null).get(path);
      if (!existing && !pending) {
        try { await this._repositoryEntryMetadata(client, path); throw new Error(`Category target already exists and was not overwritten: ${path}`); }
        catch (error) { if (error.kind !== 'not_found') throw error; }
      }
      const previous = pending ? this.api.decodeCategoryDefinition(pending.content) : existing ? existing.definition : { files: [], notes: [], impliedCategories: [] };
      const requestedImplied = this._categoryLinksForIds(path, input.impliedCategoryIds || []);
      const unresolvedPrevious = (previous.impliedCategories || []).filter((link) => {
        try { return !this.categoryIndex.byPath.has(this.api.normalizeRepositoryTarget(path, link.target).path); }
        catch (error) { return true; }
      });
      const impliedCategories = [...requestedImplied];
      for (const link of unresolvedPrevious) if (!impliedCategories.some((item) => item.target === link.target)) impliedCategories.push(link);
      const members = await this._categoryMemberLinks(path, Array.isArray(input.selectedTargets) ? input.selectedTargets : this.categoryDraftTargets, workspace);
      const content = this.api.encodeCategoryDefinition({ id, name: input.name, description: input.description, impliedCategories, files: members.files, notes: members.notes });
      const baseSha = pending ? pending.baseSha : existing ? existing.sha : '';
      await this._stageRepositoryTextChange(path, baseSha, content, { source: 'category', message: `${existing ? 'Update' : 'Create'} category ${input.name || id}`, silent: true });
      if (typeof this._applyVerifiedCategoryRecord === 'function') await this._applyVerifiedCategoryRecord({ path, sha: baseSha, htmlUrl: existing && existing.htmlUrl || '', definition: this.api.decodeCategoryDefinition(content) }, workspace);
      this.selectedCategoryId = id;
      if (input.group !== undefined) await this.setCategoryGroup(id, input.group, { silent: true });
      const saved = this.categoryIndex.categories.get(id);
      this._setUi({ replaceCategoryEditor: true, status: `Category ${input.name || id} saved locally. Use Update current file or Update all from Files to publish.` });
      return saved;
    };

    App.prototype._writeCategoryMembership = async function localFirstWriteCategoryMembership(categoryId, filePath, remove) {
      const api = apiOrThrow(this);
      const workspace = this._requireCategoryContext();
      const record = this._categoryDefinitionRecord(categoryId);
      if (!record) throw new Error(`Category not found: ${categoryId}. Refresh categories first.`);
      const canonicalFile = remove ? this.api.normalizeCanonicalRepositoryPath(filePath, 'Categorized repository file') : this._assertCategoryAssignmentTarget(filePath, workspace);
      const pending = api.repositoryLocalChangeMap(this.referenceObjectLocalState || null).get(record.path);
      const definition = pending ? this.api.decodeCategoryDefinition(pending.content) : record.definition;
      const kept = [];
      let found = false;
      for (const link of definition.files || []) {
        let resolved = '';
        try { resolved = this.api.normalizeRepositoryTarget(record.path, link.target).path; } catch (error) { kept.push(link); continue; }
        if (resolved === canonicalFile) { found = true; if (!remove) kept.push(link); } else kept.push(link);
      }
      if (remove && !found) return record.indexed;
      if (!remove && !found) kept.push({ label: canonicalFile.slice(canonicalFile.lastIndexOf('/') + 1), target: this.api.repositoryRelativePath(record.path, canonicalFile) });
      const content = this.api.encodeCategoryDefinition({ id: definition.id, name: definition.name, description: definition.description, impliedCategories: definition.impliedCategories, files: kept, notes: definition.notes || [] });
      const baseSha = pending ? pending.baseSha : record.sha;
      await this._stageRepositoryTextChange(record.path, baseSha, content, { source: 'category', message: `${remove ? 'Remove' : 'Add'} ${canonicalFile} ${remove ? 'from' : 'to'} category ${definition.name}`, silent: true });
      if (typeof this._applyVerifiedCategoryRecord === 'function') await this._applyVerifiedCategoryRecord({ path: record.path, sha: baseSha, htmlUrl: record.htmlUrl || '', definition: this.api.decodeCategoryDefinition(content) }, workspace);
      this.selectedCategoryId = categoryId;
      this._setUi({ status: `${canonicalFile} ${remove ? 'removed from' : 'assigned to'} ${definition.name} locally. GitHub was not changed.` });
      return this.categoryIndex.categories.get(categoryId);
    };

    App.prototype.applyFileCategories = async function localFirstApplyFileCategories(filePath, ids = this.fileCategoryDraftIds) {
      const workspace = this._requireCategoryContext();
      const canonical = this._assertCategoryAssignmentTarget(filePath, workspace);
      const desiredList = this.api.normalizeCategoryIds ? this.api.normalizeCategoryIds(ids) : [...new Set(ids.map(String))];
      const desired = new Set(desiredList);
      const current = new Set(this.categoryIndex.explicitCategoryIdsForTarget ? this.categoryIndex.explicitCategoryIdsForTarget('file', canonical) : []);
      const changes = [...new Set([...desired, ...current])].filter((id) => desired.has(id) !== current.has(id));
      const results = [];
      for (const categoryId of changes) {
        await this._writeCategoryMembership(categoryId, canonical, !desired.has(categoryId));
        results.push({ target: categoryId, status: 'local', message: desired.has(categoryId) ? 'Assignment staged locally.' : 'Removal staged locally.' });
      }
      this.fileCategoryDraftIds = desiredList;
      this.surface = 'files';
      this._setUi({ replaceFileCategoryIds: true, status: changes.length ? `${changes.length} category membership change(s) staged locally.` : 'File category memberships were already up to date.' });
      return results;
    };

    App.prototype._setNoteMembershipInCategory = async function localFirstSetNoteMembership(categoryId, note, shouldInclude, client, workspace) {
      const api = apiOrThrow(this);
      const record = this._categoryDefinitionRecord(categoryId);
      if (!record) throw new Error(`Category not found: ${categoryId}. Refresh categories first.`);
      const remoteNote = this.api.normalizeRemote(note.remote);
      if (!this.api.hasRemoteTargetIdentity(remoteNote) || !this._sameRepositoryContext(remoteNote, workspace)) throw new Error(`Note ${note.title || note.id} is not verified in the active category repository and branch.`);
      const pending = api.repositoryLocalChangeMap(this.referenceObjectLocalState || null).get(record.path);
      const latest = pending ? { content: pending.content, sha: pending.baseSha, path: record.path, htmlUrl: record.htmlUrl || '' } : await client.read(record.path);
      const definition = this.api.decodeCategoryDefinition(latest.content);
      const kept = [];
      let found = false;
      for (const link of definition.notes || []) {
        let resolved = '';
        try { resolved = this.api.normalizeRepositoryTarget(record.path, link.target).path; } catch (error) { kept.push(link); continue; }
        if (resolved === remoteNote.path) { found = true; if (shouldInclude) kept.push({ ...link, noteId: note.id, label: note.title || note.id }); } else kept.push(link);
      }
      if (shouldInclude && !found) kept.push({ label: note.title || note.id, target: this.api.repositoryRelativePath(record.path, remoteNote.path), noteId: note.id });
      if (!shouldInclude && !found) return { target: categoryId, status: 'unchanged', message: 'Note was not an explicit member.' };
      const content = this.api.encodeCategoryDefinition({ id: definition.id, name: definition.name, description: definition.description, impliedCategories: definition.impliedCategories || [], files: definition.files || [], notes: kept });
      if (content === latest.content) return { target: categoryId, status: 'unchanged', message: 'Membership already matched.' };
      await this._stageRepositoryTextChange(record.path, latest.sha, content, { source: 'category', message: `${shouldInclude ? 'Add' : 'Remove'} Note ${note.title || note.id} ${shouldInclude ? 'to' : 'from'} category ${definition.name}`, silent: true });
      if (typeof this._applyVerifiedCategoryRecord === 'function') await this._applyVerifiedCategoryRecord({ path: record.path, sha: latest.sha, htmlUrl: latest.htmlUrl || '', definition: this.api.decodeCategoryDefinition(content) }, workspace);
      return { target: categoryId, status: 'local', message: shouldInclude ? 'Note assignment staged locally.' : 'Note removal staged locally.' };
    };

    App.prototype.updateCurrentRepositoryFileGitHub = async function updateCurrentRepositoryFileGitHub() {
      const path = this.repositoryPreview && this.repositoryPreview.path;
      if (!path) throw new Error('Open a pending repository file first.');
      return this._runRemoteOperation(`Updating ${path} on GitHub…`, async () => {
        const client = await this._client(this._activeWorkspace());
        const published = await apiOrThrow(this).publishCurrentRepositoryChange({ client, state: this.referenceObjectLocalState, path });
        await this._persistReferenceObjectLocalState(published.state, { silent: true });
        if (this.repositoryPreview && this.repositoryPreview.path === path) this.repositoryPreview = { ...this.repositoryPreview, sha: String(published.result && published.result.sha || ''), localRepositoryChange: false };
        const parent = path.includes('/') ? path.slice(0, path.lastIndexOf('/')) : '';
        let refreshError = '';
        try {
          this.repositoryPath = parent;
          this.repositoryEntries = mergePendingEntries(this, parent, await client.listDirectory(parent, { maxEntries: 200 }));
          this.repositoryBrowseLoaded = true;
        } catch (error) { refreshError = String(error && error.message || error); }
        this.referenceObjectChecks = {};
        this.referenceObjectValidation = null;
        this.referenceFreshnessDiagnostics = null;
        this._setUi({ status: `${path} updated on GitHub and verified by exact read-back.${refreshError ? ` Folder refresh failed: ${refreshError}` : ''}` });
        return published;
      });
    };

    App.prototype.updateAllRepositoryChangesGitHub = async function updateAllRepositoryChangesGitHub() {
      await this._ensureReferenceObjectLocalStateCurrent({ silent: true });
      return this._runRemoteOperation('Updating all local files on GitHub in one commit…', async () => {
        const client = await this._client(this._activeWorkspace());
        const published = await apiOrThrow(this).publishAllRepositoryChanges({ client, state: this.referenceObjectLocalState });
        await this._persistReferenceObjectLocalState(published.state, { silent: true });
        if (this.repositoryPreview && this.repositoryPreview.path) {
          try { const metadata = await client.readMetadata(this.repositoryPreview.path); this.repositoryPreview = { ...this.repositoryPreview, sha: metadata.sha, localRepositoryChange: false }; }
          catch (error) { this.repositoryPreview = { ...this.repositoryPreview, localRepositoryChange: false }; }
        }
        const folder = this.repositoryPath || '';
        let refreshError = '';
        try {
          this.repositoryEntries = mergePendingEntries(this, folder, await client.listDirectory(folder, { maxEntries: 200 }));
          this.repositoryBrowseLoaded = true;
        } catch (error) { refreshError = String(error && error.message || error); }
        this.referenceObjectsLoaded = false;
        this.referenceObjectChecks = {};
        this.referenceObjectValidation = null;
        this.referenceFreshnessDiagnostics = null;
        this.categoryContextRequiresRefresh = true;
        this._setUi({ status: `${published.result.paths.length} local file(s) updated on GitHub in commit ${published.result.commitSha.slice(0, 12)} and verified.${refreshError ? ` Folder refresh failed: ${refreshError}` : ''}` });
        return published;
      });
    };

    App.prototype.publishReferenceObjectLocalDraftsGitHub = function publishReferenceObjectLocalDraftsGitHub() { return this.updateAllRepositoryChangesGitHub(); };
    App.prototype.updateReferenceObjectUsesGitHub = async function localOnlyReferenceObjectUpdate(id) {
      const result = await this.updateReferenceObjectUsesLocal(id);
      this._setUi({ status: `Reference Object ${id} updated locally. Use the standard Update current file or Update all action for GitHub.` });
      return result;
    };

    App.prototype.start = async function localChangesStart(...args) {
      if (this.ui && this.ui.handlers) Object.assign(this.ui.handlers, {
        onUpdateCurrentRepositoryFileGitHub: () => this.updateCurrentRepositoryFileGitHub(),
        onUpdateAllRepositoryChangesGitHub: () => this.updateAllRepositoryChangesGitHub()
      });
      return originalStart.apply(this, args);
    };
    return true;
  }

  function enhanceUi(ui) {
    if (!ui.shadow || ui.state.surface !== 'files' || typeof document === 'undefined') return;
    const editorSave = ui.shadow.querySelector('.repository-editor [data-action="save-repository-editor"]');
    if (editorSave) { editorSave.textContent = ui.state.repositoryEditor && ui.state.repositoryEditor.mode === 'folder' ? 'Create locally' : 'Save locally'; editorSave.disabled = Boolean(ui.state.busy || !ui.state.activeWorkspace); }
    const toolbar = ui.shadow.querySelector('.editor .editor-toolbar') || ui.shadow.querySelector('.editor-toolbar');
    if (!toolbar || toolbar.querySelector('[data-update-all-local-changes]')) return;
    const current = document.createElement('button');
    current.dataset.updateCurrentLocalChange = '1';
    current.textContent = 'Update current file';
    current.disabled = Boolean(ui.state.busy || !ui.state.repositoryCurrentFilePending || !ui.state.hasToken);
    current.addEventListener('click', () => ui._call('onUpdateCurrentRepositoryFileGitHub').catch(() => {}));
    const all = document.createElement('button');
    all.dataset.updateAllLocalChanges = '1';
    all.textContent = `Update all (${Number(ui.state.repositoryPendingCount || 0)})`;
    all.disabled = Boolean(ui.state.busy || !ui.state.repositoryPendingCount || !ui.state.hasToken);
    all.addEventListener('click', () => ui._call('onUpdateAllRepositoryChangesGitHub').catch(() => {}));
    toolbar.append(current, all);
  }

  function patchUi(UI) {
    if (!UI || !UI.prototype || UI.prototype[UI_PATCH]) return false;
    Object.defineProperty(UI.prototype, UI_PATCH, { value: true });
    const originalRender = UI.prototype.render;
    UI.prototype.render = function localChangesRender(...args) { const result = originalRender.apply(this, args); enhanceUi(this); return result; };
    return true;
  }

  function installRepositoryLocalChanges(api = root.ObsLinkedNotes || {}) {
    if (!api || !api.LinkedNotesApp || !api.LinkedNotesUI) return false;
    const app = patchApp(api.LinkedNotesApp);
    const ui = patchUi(api.LinkedNotesUI);
    return app || ui;
  }

  return { installRepositoryLocalChanges, mergePendingRepositoryEntries: mergePendingEntries };
});
