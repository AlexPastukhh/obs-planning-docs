(function (root, factory) {
  const api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
  if (root.ObsLinkedNotes && root.ObsLinkedNotes.LinkedNotesApp && root.ObsLinkedNotes.LinkedNotesUI) {
    try { api.installRepositoryFilesWorkspace(root.ObsLinkedNotes); } catch (error) { /* bootstrap reports failures later */ }
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function (root) {
  'use strict';

  const APP_PATCH = '__obsRepositoryFilesWorkspaceAppV1';
  const UI_PATCH = '__obsRepositoryFilesWorkspaceUiV1';
  const PREFS_STATE = 'filesWorkspacePreferences';
  const PREFS_KEY_STATE = 'filesWorkspacePreferencesKey';
  const DEFAULT_PREFS = { schemaVersion: 1, folderShortcuts: [], documentPresets: [] };
  const COPY_MAX_DIRECTORIES = 60;

  function apiOrThrow(app) {
    const api = app && app.api || root.ObsLinkedNotes || {};
    if (!api.normalizeFilesWorkspacePreferences || !api.workspaceFilesPreferenceKey) throw new Error('Repository Files workspace core is unavailable.');
    return api;
  }

  function errorText(error) {
    return String(error && error.message || error || 'Unknown error');
  }

  function notFound(error) {
    return Boolean(error && error.kind === 'not_found');
  }

  function sameJson(left, right) {
    return JSON.stringify(left) === JSON.stringify(right);
  }

  function publicFilesReadOperation(operation) {
    if (!operation) return null;
    const network = operation.network || { started: 0, finished: 0, pending: 0, cancelled: false };
    return {
      active: true,
      kind: operation.kind,
      label: operation.label,
      cancelable: operation.cancelable !== false,
      cancelRequested: Boolean(operation.cancelRequested),
      network: {
        started: Math.max(0, Number(network.started) || 0),
        finished: Math.max(0, Number(network.finished) || 0),
        pending: Math.max(0, Number(network.pending) || 0),
        cancelled: Boolean(network.cancelled)
      },
      categoryProgress: operation.categoryProgress ? { ...operation.categoryProgress } : null
    };
  }

  function patchApp(App) {
    if (!App || !App.prototype || App.prototype[APP_PATCH]) return false;
    Object.defineProperty(App.prototype, APP_PATCH, { value: true, configurable: false, enumerable: false, writable: false });
    const originalStart = App.prototype.start;
    const originalClient = App.prototype._client;
    const originalBrowseRepository = App.prototype.browseRepository;
    const originalBeginRepositoryFileCreate = App.prototype.beginRepositoryFileCreate;
    const originalCancelRepositoryEditor = App.prototype.cancelRepositoryEditor;
    const originalSaveRepositoryEditor = App.prototype.saveRepositoryEditor;
    const originalSelectWorkspace = App.prototype.selectWorkspace;
    const originalSaveWorkspace = App.prototype.saveWorkspace;
    const originalDeleteWorkspace = App.prototype.deleteWorkspace;
    const originalOpenPanel = App.prototype.openPanel;

    if (typeof originalClient === 'function') {
      App.prototype._client = async function filesWorkspaceClient(context) {
        const client = await originalClient.call(this, context);
        const operation = this.__obsReadOnlyOperation;
        const transport = client && client.transport;
        if (operation && operation.kind === 'files' && transport && typeof transport.setProgressListener === 'function') {
          transport.setProgressListener((network) => {
            if (this.__obsReadOnlyOperation !== operation) return;
            operation.network = network || { started: 0, finished: 0, pending: 0, cancelled: false };
            const now = Date.now();
            if (now - Number(operation.lastNetworkUiAt || 0) >= 120 || Number(operation.network.pending || 0) === 0) {
              operation.lastNetworkUiAt = now;
              this._setUi({ readOperation: publicFilesReadOperation(operation) });
            }
          });
        }
        return client;
      };
    }

    App.prototype._filesWorkspacePreferencesKey = function filesWorkspacePreferencesKey() {
      const workspace = this._activeWorkspace();
      if (!workspace) return '';
      return apiOrThrow(this).workspaceFilesPreferenceKey(workspace);
    };

    App.prototype._loadFilesWorkspacePreferences = async function loadFilesWorkspacePreferences(options = {}) {
      const api = apiOrThrow(this);
      const key = this._filesWorkspacePreferencesKey();
      const preferences = key ? api.normalizeFilesWorkspacePreferences(await this.getValue(key, DEFAULT_PREFS)) : { ...DEFAULT_PREFS };
      this.filesWorkspacePreferences = preferences;
      this.filesWorkspacePreferencesKey = key;
      if (!options.silent && typeof this._setUi === 'function') this._setUi({ [PREFS_STATE]: preferences, [PREFS_KEY_STATE]: key });
      return preferences;
    };

    App.prototype._saveFilesWorkspacePreferences = async function saveFilesWorkspacePreferences(preferences) {
      const api = apiOrThrow(this);
      const key = this._filesWorkspacePreferencesKey();
      if (!key) throw new Error('Select a GitHub workspace before saving Files preferences.');
      const normalized = api.normalizeFilesWorkspacePreferences(preferences);
      await this.setValue(key, normalized);
      this.filesWorkspacePreferences = normalized;
      this.filesWorkspacePreferencesKey = key;
      this._setUi({ [PREFS_STATE]: normalized, [PREFS_KEY_STATE]: key });
      return normalized;
    };

    App.prototype._ensureFilesWorkspacePreferencesCurrent = async function ensureFilesWorkspacePreferencesCurrent(options = {}) {
      const key = this._filesWorkspacePreferencesKey();
      if (this.filesWorkspacePreferencesKey === key && this.filesWorkspacePreferences) {
        if (!options.silent && typeof this._setUi === 'function') this._setUi({ [PREFS_STATE]: this.filesWorkspacePreferences, [PREFS_KEY_STATE]: key });
        return this.filesWorkspacePreferences;
      }
      return this._loadFilesWorkspacePreferences(options);
    };

    App.prototype._runFilesWorkspaceRead = async function runFilesWorkspaceRead(label, work) {
      const run = () => this._runRemoteOperation(label, work);
      if (typeof this._runCancelableRepositoryRead === 'function') {
        const result = await this._runCancelableRepositoryRead('files', label, run);
        if (result && result.cancelled) {
          this._setUi({ status: `Files read cancelled: ${String(label || 'repository read').replace(/…$/, '')}. No GitHub write was performed.` });
        }
        return result;
      }
      return run();
    };

    App.prototype.addRepositoryFolderShortcut = async function addRepositoryFolderShortcut(name) {
      const api = apiOrThrow(this);
      const path = api.normalizeFilesWorkspacePath(this.repositoryPath || '', { allowRoot: true });
      if (!path) throw new Error('Repository root already has a built-in shortcut. Open a folder first.');
      const preferences = await this._loadFilesWorkspacePreferences({ silent: true });
      const shortcut = api.normalizeFolderShortcut({ name, path });
      const next = { ...preferences, folderShortcuts: api.upsertFilesWorkspacePreferenceItem(preferences.folderShortcuts, shortcut) };
      await this._saveFilesWorkspacePreferences(next);
      this._setUi({ status: `Folder shortcut saved: ${shortcut.name} → ${shortcut.path}.` });
      return shortcut;
    };

    App.prototype.removeRepositoryFolderShortcut = async function removeRepositoryFolderShortcut(id) {
      const preferences = await this._loadFilesWorkspacePreferences({ silent: true });
      const next = { ...preferences, folderShortcuts: preferences.folderShortcuts.filter((item) => item.id !== String(id || '')) };
      await this._saveFilesWorkspacePreferences(next);
      this._setUi({ status: 'Folder shortcut removed.' });
      return next;
    };

    App.prototype.saveRepositoryDocumentPreset = async function saveRepositoryDocumentPreset(input) {
      const api = apiOrThrow(this);
      const preferences = await this._loadFilesWorkspacePreferences({ silent: true });
      const preset = api.normalizeDocumentPreset(input);
      const next = { ...preferences, documentPresets: api.upsertFilesWorkspacePreferenceItem(preferences.documentPresets, preset) };
      await this._saveFilesWorkspacePreferences(next);
      this._setUi({ status: `Document preset saved: ${preset.name}.` });
      return preset;
    };

    App.prototype.removeRepositoryDocumentPreset = async function removeRepositoryDocumentPreset(id) {
      const preferences = await this._loadFilesWorkspacePreferences({ silent: true });
      const next = { ...preferences, documentPresets: preferences.documentPresets.filter((item) => item.id !== String(id || '')) };
      await this._saveFilesWorkspacePreferences(next);
      this._setUi({ status: 'Document preset removed.' });
      return next;
    };

    App.prototype.navigateRepositoryFilesLocation = async function navigateRepositoryFilesLocation(kind, value = '') {
      if (kind === 'linked-notes') {
        if (typeof this.setSurface === 'function') return this.setSurface('notes');
        this.surface = 'notes';
        this._setUi({ status: 'Linked Notes opened.' });
        return 'notes';
      }
      const workspace = this._activeWorkspace();
      if (!workspace) throw new Error('Select a GitHub workspace first.');
      let path = '';
      if (kind === 'notes') path = String(workspace.basePath || '').trim();
      else if (kind === 'shortcut') {
        const preferences = await this._loadFilesWorkspacePreferences({ silent: true });
        const shortcut = preferences.folderShortcuts.find((item) => item.id === String(value || ''));
        if (!shortcut) throw new Error('Folder shortcut no longer exists.');
        path = shortcut.path;
      }
      return this.browseRepository(path);
    };

    App.prototype.beginRepositoryFileCreateFromPreset = async function beginRepositoryFileCreateFromPreset(id) {
      if (!id || id === 'blank') {
        this.__pendingRepositoryDocumentPreset = null;
        return originalBeginRepositoryFileCreate.call(this);
      }
      const api = apiOrThrow(this);
      const preferences = await this._loadFilesWorkspacePreferences({ silent: true });
      const preset = preferences.documentPresets.find((item) => item.id === String(id));
      if (!preset) throw new Error('Document preset no longer exists.');
      return this._runRemoteOperation('Reading document template…', async () => {
        const workspace = this._activeWorkspace();
        if (!workspace) throw new Error('Select a GitHub workspace first.');
        const client = await this._client(workspace);
        const maxBytes = this.api.DEFAULT_TEXT_FILE_MAX_BYTES || this.api.DEFAULT_PREVIEW_MAX_BYTES || (512 * 1024);
        const file = await client.readBytes(preset.templatePath, { maxBytes });
        const content = this.api.decodeUtf8Bytes(file.bytes, { fatal: true, message: `Template is not valid UTF-8: ${preset.templatePath}.` });
        originalBeginRepositoryFileCreate.call(this);
        this.repositoryEditor = { ...this.repositoryEditor, content };
        this.__pendingRepositoryDocumentPreset = { ...preset, templateSha: file.sha || '' };
        this._setUi({ replaceFileEditor: true, status: `New file from ${preset.name}. Template ${preset.templatePath} copied literally; category ${preset.categoryId} will be applied after verified file creation.` });
        return this.repositoryEditor;
      });
    };

    App.prototype.copyRepositoryFileLink = async function copyRepositoryFileLink() {
      const api = apiOrThrow(this);
      const preview = this.repositoryPreview;
      if (!preview || !preview.path) throw new Error('Open a repository file first.');
      const markdown = api.repositoryRootFileMarkdownLink(preview.path, preview.name || '');
      await this.clipboardWriter(markdown);
      this._setUi({ status: `Copied file link for ${preview.path}. No GitHub request was made.` });
      return markdown;
    };

    App.prototype._listRepositoryDirectoriesForWorkspaceRead = async function listRepositoryDirectoriesForWorkspaceRead(path = '') {
      const api = apiOrThrow(this);
      const workspace = this._activeWorkspace();
      if (!workspace) throw new Error('Select a GitHub workspace first.');
      const canonical = api.normalizeFilesWorkspacePath(path, { allowRoot: true });
      const client = await this._client(workspace);
      const entries = await client.listDirectory(canonical, { maxEntries: 200 });
      return {
        path: canonical,
        directories: entries.filter((entry) => entry.type === 'dir').sort((a, b) => String(a.name || '').localeCompare(String(b.name || '')))
      };
    };

    App.prototype.listRepositoryDirectoriesForWorkspace = function listRepositoryDirectoriesForWorkspace(path = '') {
      return this._runFilesWorkspaceRead('Reading repository folders…', () => this._listRepositoryDirectoriesForWorkspaceRead(path));
    };

    App.prototype._previewRepositoryStructureRead = async function previewRepositoryStructureRead(text) {
      const api = apiOrThrow(this);
      const workspace = this._activeWorkspace();
      if (!workspace) throw new Error('Select a GitHub workspace first.');
      const parsed = api.parseRepositoryStructure(text, { basePath: this.repositoryPath || '', maxNodes: api.DEFAULT_STRUCTURE_MAX_NODES || 100 });
      const client = await this._client(workspace);
      const statuses = [];
      let blocked = false;
      const existingFolders = new Set();
      for (const folderPath of parsed.folders) {
        try {
          await client.listDirectory(folderPath, { maxEntries: 200 });
          existingFolders.add(folderPath);
          statuses.push({ type: 'folder', path: folderPath, status: 'exists', message: 'Folder already exists; it will be reused.' });
        } catch (error) {
          if (notFound(error)) statuses.push({ type: 'folder', path: folderPath, status: 'create', message: 'Folder will be created implicitly by its first file.' });
          else {
            blocked = true;
            statuses.push({ type: 'folder', path: folderPath, status: 'blocked', message: errorText(error) });
          }
        }
      }
      for (const filePath of parsed.files) {
        try {
          const current = await client.readMetadata(filePath);
          blocked = true;
          statuses.push({ type: 'file', path: filePath, status: 'conflict', message: `Existing file will not be overwritten${current && current.sha ? ` (${current.sha})` : ''}.` });
        } catch (error) {
          if (notFound(error)) statuses.push({ type: 'file', path: filePath, status: 'create', message: 'Empty file will be created.' });
          else { blocked = true; statuses.push({ type: 'file', path: filePath, status: 'blocked', message: errorText(error) }); }
        }
      }
      const placeholders = parsed.leafFolders.filter((path) => !existingFolders.has(path)).map((path) => `${path}/.gitkeep`);
      for (const placeholderPath of placeholders) {
        try {
          const current = await client.readMetadata(placeholderPath);
          blocked = true;
          statuses.push({ type: 'placeholder', path: placeholderPath, status: 'conflict', message: `Placeholder already exists and will not be overwritten${current && current.sha ? ` (${current.sha})` : ''}.` });
        } catch (error) {
          if (notFound(error)) statuses.push({ type: 'placeholder', path: placeholderPath, status: 'create', message: 'Empty .gitkeep will make the empty leaf folder repository-visible.' });
          else { blocked = true; statuses.push({ type: 'placeholder', path: placeholderPath, status: 'blocked', message: errorText(error) }); }
        }
      }
      return {
        kind: 'repository-structure-plan-v1',
        workspace: { owner: workspace.owner, repo: workspace.repo, branch: workspace.branch },
        basePath: parsed.basePath,
        source: parsed.source,
        files: parsed.files,
        folders: parsed.folders,
        placeholders,
        statuses,
        blocked
      };
    };

    App.prototype.previewRepositoryStructure = function previewRepositoryStructure(text) {
      return this._runFilesWorkspaceRead('Previewing repository structure…', () => this._previewRepositoryStructureRead(text));
    };

    App.prototype.applyRepositoryStructure = async function applyRepositoryStructure(plan) {
      const api = apiOrThrow(this);
      if (!plan || plan.kind !== 'repository-structure-plan-v1') throw new Error('Prepare a repository structure preview first.');
      return this._runRemoteOperation('Creating repository structure…', async () => {
        const workspace = this._activeWorkspace();
        if (!workspace) throw new Error('Select a GitHub workspace first.');
        if (!this._sameRepositoryContext(workspace, plan.workspace)) throw new Error('Workspace changed after structure preview. Preview again.');
        const fresh = await this._previewRepositoryStructureRead(plan.source);
        if (fresh.blocked) {
          const error = new Error('Repository structure has conflicts or blocked targets. Existing content was not changed.');
          error.kind = 'structure_conflict';
          error.partialResults = fresh.statuses;
          throw error;
        }
        if (!sameJson(fresh.files, plan.files) || !sameJson(fresh.placeholders, plan.placeholders)) throw new Error('Repository structure plan changed. Preview again.');
        const client = await this._client(workspace);
        const results = [];
        const targets = [...fresh.files.map((path) => ({ type: 'file', path })), ...fresh.placeholders.map((path) => ({ type: 'placeholder', path }))];
        for (const target of targets) {
          const parentPath = api.repositoryFilesWorkspacePathParent(target.path);
          const name = api.repositoryFilesWorkspacePathName(target.path);
          try {
            const result = await this.api.saveRepositoryTextFile({
              client,
              normalizePath: (value) => api.normalizeFilesWorkspacePath(value, { allowRoot: false }),
              mode: 'create', parentPath, name, content: '', maxBytes: 8
            });
            this._markCategoryContextStaleForRepositoryPath(result.path, workspace);
            results.push({ target: result.path, status: 'completed', message: 'Created and exact read-back verified.' });
          } catch (error) {
            results.push({ target: target.path, status: 'failed', message: errorText(error) });
            const partial = new Error(`Repository structure creation stopped after ${results.filter((item) => item.status === 'completed').length} verified write(s). Existing and completed files were not deleted or overwritten.`);
            partial.kind = 'partial_structure_create';
            partial.partialResults = results;
            throw partial;
          }
        }
        const current = api.normalizeFilesWorkspacePath(this.repositoryPath || '', { allowRoot: true });
        const entries = await client.listDirectory(current, { maxEntries: 200 });
        this.repositoryEntries = this.api.sortRepositoryEntries ? this.api.sortRepositoryEntries(entries) : entries;
        this.repositoryBrowseLoaded = true;
        this.surface = 'files';
        this._setUi({ status: `Repository structure created: ${results.length} verified empty file write(s); no existing file was changed.` });
        return results;
      });
    };

    App.prototype._collectRepositoryCopySources = async function collectRepositoryCopySources(client, sourceType, sourcePath) {
      const api = apiOrThrow(this);
      const maxFiles = api.DEFAULT_COPY_MAX_FILES || 100;
      const maxBytes = api.DEFAULT_COPY_MAX_BYTES || (10 * 1024 * 1024);
      if (sourceType === 'file') {
        const file = await client.readMetadata(sourcePath);
        if (!file || file.type !== 'file') throw new Error(`Copy source is not a file: ${sourcePath}.`);
        if (Number(file.size || 0) > maxBytes) throw new Error(`Copy source exceeds the ${maxBytes}-byte copy limit.`);
        return [{ path: sourcePath, sha: String(file.sha || ''), size: Number(file.size || 0) }];
      }
      const queue = [sourcePath];
      const files = [];
      let directories = 0;
      let totalBytes = 0;
      while (queue.length) {
        const folder = queue.shift();
        directories += 1;
        if (directories > COPY_MAX_DIRECTORIES) throw new Error(`Copy traversal exceeds the ${COPY_MAX_DIRECTORIES}-folder limit.`);
        const entries = await client.listDirectory(folder, { maxEntries: 200 });
        for (const entry of entries) {
          if (entry.type === 'dir') queue.push(entry.path);
          else if (entry.type === 'file') {
            files.push({ path: entry.path, sha: String(entry.sha || ''), size: Number(entry.size || 0) });
            totalBytes += Number(entry.size || 0);
            if (files.length > maxFiles) throw new Error(`Copy source contains more than ${maxFiles} files.`);
            if (totalBytes > maxBytes) throw new Error(`Copy source exceeds the ${maxBytes}-byte aggregate copy limit.`);
          }
        }
      }
      if (!files.length) throw new Error('Copy source folder contains no repository files.');
      return files.sort((a, b) => a.path.localeCompare(b.path));
    };

    App.prototype._previewRepositoryCopyRead = async function previewRepositoryCopyRead(input = {}) {
      const api = apiOrThrow(this);
      const workspace = this._activeWorkspace();
      if (!workspace) throw new Error('Select a GitHub workspace first.');
      const sourceType = input.sourceType === 'folder' ? 'folder' : 'file';
      const sourcePath = api.normalizeFilesWorkspacePath(input.sourcePath, { allowRoot: false, label: 'Copy source' });
      const destinationFolder = api.normalizeFilesWorkspacePath(input.destinationFolder || '', { allowRoot: true, label: 'Copy destination folder' });
      const destinationName = String(input.destinationName || '').trim() || api.repositoryFilesWorkspacePathName(sourcePath);
      if (!destinationName || /[\\/?#\u0000-\u001f\u007f]/.test(destinationName) || destinationName === '.' || destinationName === '..') throw new Error('Copy destination name must be one valid repository path segment.');
      const destinationRoot = destinationFolder ? `${destinationFolder}/${destinationName}` : destinationName;
      if (sourceType === 'folder' && (destinationRoot === sourcePath || destinationRoot.startsWith(`${sourcePath}/`))) throw new Error('A folder cannot be copied into itself or one of its descendants.');
      const client = await this._client(workspace);
      const sources = await this._collectRepositoryCopySources(client, sourceType, sourcePath);
      const mappings = sources.map((source) => ({
        sourcePath: source.path,
        sourceSha: source.sha,
        size: source.size,
        destinationPath: sourceType === 'file' ? destinationRoot : api.copyDestinationPath(sourcePath, destinationRoot, source.path)
      }));
      const statuses = [];
      let blocked = false;
      if (sourceType === 'folder') {
        try {
          await client.listDirectory(destinationRoot, { maxEntries: 200 });
          blocked = true;
          statuses.push({ target: destinationRoot, status: 'conflict', message: 'Destination folder already exists; add-only folder copy does not merge into an existing folder.' });
        } catch (error) {
          if (!notFound(error)) {
            try {
              const current = await client.readMetadata(destinationRoot);
              blocked = true;
              statuses.push({ target: destinationRoot, status: 'conflict', message: `Destination path already exists as a file and will not be overwritten${current && current.sha ? ` (${current.sha})` : ''}.` });
            } catch (metadataError) {
              if (!notFound(metadataError)) {
                blocked = true;
                statuses.push({ target: destinationRoot, status: 'blocked', message: `Unable to prove the destination root is absent: ${errorText(metadataError)}` });
              }
            }
          }
        }
      }
      const destinationParents = new Set();
      for (const mapping of mappings) {
        let parent = api.repositoryFilesWorkspacePathParent(mapping.destinationPath);
        while (parent) {
          destinationParents.add(parent);
          if (parent === destinationFolder) break;
          parent = api.repositoryFilesWorkspacePathParent(parent);
        }
      }
      for (const parent of [...destinationParents].sort()) {
        try {
          await client.listDirectory(parent, { maxEntries: 200 });
        } catch (error) {
          if (!notFound(error)) {
            blocked = true;
            statuses.push({ target: parent, status: 'blocked', message: `Destination parent is not a usable directory: ${errorText(error)}` });
          }
        }
      }
      for (const mapping of mappings) {
        try {
          const current = await client.readMetadata(mapping.destinationPath);
          blocked = true;
          statuses.push({ target: mapping.destinationPath, status: 'conflict', message: `Destination exists and will not be overwritten${current && current.sha ? ` (${current.sha})` : ''}.` });
        } catch (error) {
          if (notFound(error)) statuses.push({ target: mapping.destinationPath, status: 'create', message: 'Destination is absent.' });
          else { blocked = true; statuses.push({ target: mapping.destinationPath, status: 'blocked', message: errorText(error) }); }
        }
      }
      return {
        kind: 'repository-copy-plan-v1',
        workspace: { owner: workspace.owner, repo: workspace.repo, branch: workspace.branch },
        sourceType, sourcePath, destinationFolder, destinationName, destinationRoot, mappings, statuses, blocked,
        totalBytes: mappings.reduce((sum, item) => sum + Number(item.size || 0), 0)
      };
    };

    App.prototype.previewRepositoryCopy = function previewRepositoryCopy(input = {}) {
      return this._runFilesWorkspaceRead('Previewing repository copy…', () => this._previewRepositoryCopyRead(input));
    };

    App.prototype.applyRepositoryCopy = async function applyRepositoryCopy(plan) {
      if (!plan || plan.kind !== 'repository-copy-plan-v1') throw new Error('Prepare a repository copy preview first.');
      return this._runRemoteOperation('Copying repository content…', async () => {
        const workspace = this._activeWorkspace();
        if (!workspace) throw new Error('Select a GitHub workspace first.');
        if (!this._sameRepositoryContext(workspace, plan.workspace)) throw new Error('Workspace changed after copy preview. Preview again.');
        const fresh = await this._previewRepositoryCopyRead(plan);
        if (fresh.blocked) {
          const error = new Error('Copy destination contains conflicts or blocked paths. Nothing was written.');
          error.kind = 'copy_conflict';
          error.partialResults = fresh.statuses;
          throw error;
        }
        const originalShape = plan.mappings.map((item) => [item.sourcePath, item.sourceSha, item.destinationPath]);
        const freshShape = fresh.mappings.map((item) => [item.sourcePath, item.sourceSha, item.destinationPath]);
        if (!sameJson(originalShape, freshShape)) throw new Error('Copy source or destination plan changed. Preview again.');
        const client = await this._client(workspace);
        for (const mapping of fresh.mappings) {
          try {
            await client.readMetadata(mapping.destinationPath);
            throw new Error(`Copy destination appeared after preflight: ${mapping.destinationPath}.`);
          } catch (error) {
            if (!notFound(error)) throw error;
          }
        }
        const results = [];
        let transferredBytes = 0;
        for (const mapping of fresh.mappings) {
          try {
            const metadata = await client.readMetadata(mapping.sourcePath);
            if (String(metadata.sha || '') !== mapping.sourceSha) throw new Error(`Copy source changed after preview: ${mapping.sourcePath}.`);
            const remaining = Math.max(1, (this.api.DEFAULT_COPY_MAX_BYTES || (10 * 1024 * 1024)) - transferredBytes);
            const source = await client.readBytes(mapping.sourcePath, { maxBytes: remaining });
            if (String(source.sha || '') !== mapping.sourceSha) throw new Error(`Copy source changed while reading bytes: ${mapping.sourcePath}.`);
            const result = await client.saveBytesVerified({ path: mapping.destinationPath, bytes: source.bytes, baseSha: '', message: `Copy repository file to ${mapping.destinationPath}` });
            transferredBytes += source.bytes.byteLength;
            this._markCategoryContextStaleForRepositoryPath(mapping.destinationPath, workspace);
            results.push({ target: mapping.destinationPath, status: 'completed', message: `Copied ${source.bytes.byteLength} bytes and verified exact read-back.` });
          } catch (error) {
            results.push({ target: mapping.destinationPath, status: 'failed', message: errorText(error) });
            const partial = new Error(`Repository copy stopped after ${results.filter((item) => item.status === 'completed').length} verified file(s). Completed copies remain; no destination was overwritten or deleted.`);
            partial.kind = 'partial_repository_copy';
            partial.partialResults = results;
            throw partial;
          }
        }
        const current = apiOrThrow(this).normalizeFilesWorkspacePath(this.repositoryPath || '', { allowRoot: true });
        const entries = await client.listDirectory(current, { maxEntries: 200 });
        this.repositoryEntries = this.api.sortRepositoryEntries ? this.api.sortRepositoryEntries(entries) : entries;
        this.repositoryBrowseLoaded = true;
        this.surface = 'files';
        this._setUi({ status: `Repository copy complete: ${results.length} file(s), ${transferredBytes} byte(s), exact read-back verified.` });
        return results;
      });
    };

    if (typeof originalSelectWorkspace === 'function') {
      App.prototype.selectWorkspace = async function filesWorkspaceSelectWorkspace(...args) {
        const result = await originalSelectWorkspace.apply(this, args);
        await this._loadFilesWorkspacePreferences();
        return result;
      };
    }

    if (typeof originalSaveWorkspace === 'function') {
      App.prototype.saveWorkspace = async function filesWorkspaceSaveWorkspace(...args) {
        const result = await originalSaveWorkspace.apply(this, args);
        await this._loadFilesWorkspacePreferences();
        return result;
      };
    }

    if (typeof originalDeleteWorkspace === 'function') {
      App.prototype.deleteWorkspace = async function filesWorkspaceDeleteWorkspace(...args) {
        const result = await originalDeleteWorkspace.apply(this, args);
        await this._loadFilesWorkspacePreferences();
        return result;
      };
    }

    if (typeof originalOpenPanel === 'function') {
      App.prototype.openPanel = async function filesWorkspaceOpenPanel(...args) {
        const result = await originalOpenPanel.apply(this, args);
        await this._ensureFilesWorkspacePreferencesCurrent();
        return result;
      };
    }

    App.prototype.start = async function filesWorkspaceStart(...args) {
      if (this.ui && this.ui.handlers) {
        Object.assign(this.ui.handlers, {
          onNavigateFilesLocation: (kind, value) => this.navigateRepositoryFilesLocation(kind, value),
          onEnsureFilesWorkspacePreferences: () => this._ensureFilesWorkspacePreferencesCurrent(),
          onAddRepositoryFolderShortcut: (name) => this.addRepositoryFolderShortcut(name),
          onRemoveRepositoryFolderShortcut: (id) => this.removeRepositoryFolderShortcut(id),
          onSaveRepositoryDocumentPreset: (input) => this.saveRepositoryDocumentPreset(input),
          onRemoveRepositoryDocumentPreset: (id) => this.removeRepositoryDocumentPreset(id),
          onBeginRepositoryFileCreateFromPreset: (id) => this.beginRepositoryFileCreateFromPreset(id),
          onCopyRepositoryFileLink: () => this.copyRepositoryFileLink(),
          onListRepositoryDirectories: (path) => this.listRepositoryDirectoriesForWorkspace(path),
          onPreviewRepositoryStructure: (text) => this.previewRepositoryStructure(text),
          onApplyRepositoryStructure: (plan) => this.applyRepositoryStructure(plan),
          onPreviewRepositoryCopy: (input) => this.previewRepositoryCopy(input),
          onApplyRepositoryCopy: (plan) => this.applyRepositoryCopy(plan)
        });
      }
      const result = await originalStart.apply(this, args);
      await this._loadFilesWorkspacePreferences();
      return result;
    };

    App.prototype.browseRepository = async function filesWorkspaceBrowseRepository(path = '', ...args) {
      const entries = await originalBrowseRepository.call(this, path, ...args);
      const api = apiOrThrow(this);
      const canonical = api.normalizeFilesWorkspacePath(this.repositoryPath || path || '', { allowRoot: true });
      if (!canonical || this.__suppressFolderIndexAutoOpen) return entries;
      const candidate = api.folderIndexCandidate(canonical);
      const indexEntry = Array.isArray(this.repositoryEntries)
        ? this.repositoryEntries.find((entry) => entry && entry.type === 'file' && entry.path === candidate)
        : null;
      if (indexEntry) await this.openRepositoryEntry(indexEntry);
      return entries;
    };

    App.prototype.cancelRepositoryEditor = function filesWorkspaceCancelRepositoryEditor(...args) {
      this.__pendingRepositoryDocumentPreset = null;
      return originalCancelRepositoryEditor.apply(this, args);
    };

    App.prototype.saveRepositoryEditor = async function filesWorkspaceSaveRepositoryEditor(input = {}) {
      const mode = input && input.mode || this.repositoryEditor && this.repositoryEditor.mode;
      const pendingPreset = mode === 'create' ? this.__pendingRepositoryDocumentPreset : null;
      const result = await originalSaveRepositoryEditor.call(this, input);
      if (!pendingPreset || !result || !result.path) return result;
      this.__pendingRepositoryDocumentPreset = null;
      try {
        if (!this.categoryIndex || !this.categoryIndex.categories || !this.categoryIndex.categories.has(pendingPreset.categoryId) || this.categoryContextRequiresRefresh) {
          await this.refreshCategories();
        }
        await this.applyFileCategories(result.path, [pendingPreset.categoryId]);
        this.surface = 'files';
        this._setUi({ status: `Created ${result.path} from ${pendingPreset.name}; category ${pendingPreset.categoryId} applied and verified.` });
        return { ...result, documentPreset: pendingPreset, categoryApplied: true };
      } catch (error) {
        const partial = new Error(`File ${result.path} was created and verified from ${pendingPreset.name}, but category ${pendingPreset.categoryId} was not fully applied: ${errorText(error)}`);
        partial.kind = 'partial_document_preset_create';
        partial.partialResults = [
          { target: result.path, status: 'completed', message: 'File created and exact read-back verified.' },
          { target: pendingPreset.categoryId, status: 'failed', message: errorText(error) }
        ];
        throw partial;
      }
    };

    return true;
  }

  function callHandlerDirect(ui, name, ...args) {
    const fn = ui && ui.handlers && ui.handlers[name];
    if (typeof fn !== 'function') return Promise.reject(new Error(`Files workspace handler is unavailable: ${name}.`));
    try { return Promise.resolve(fn(...args)); } catch (error) { return Promise.reject(error); }
  }

  function appendFilesWorkspaceStyle(ui) {
    if (!ui.shadow || ui.shadow.querySelector('style[data-files-workspace-style]')) return;
    const style = document.createElement('style');
    style.dataset.filesWorkspaceStyle = '1';
    style.textContent = `
      .files-workspace-menu { position: relative; display: inline-flex; }
      .files-workspace-menu > summary { cursor:pointer; display:inline-flex; align-items:center; min-height:34px; padding:6px 10px; border:1px solid var(--border); border-radius:7px; background:var(--surface); list-style:none; }
      .files-workspace-menu > summary::-webkit-details-marker { display:none; }
      .files-workspace-menu-panel { position:absolute; z-index:48; top:calc(100% + 6px); left:0; min-width:260px; max-width:min(460px,80vw); max-height:420px; overflow:auto; display:grid; gap:6px; padding:8px; border:1px solid var(--border); border-radius:8px; background:var(--surface-2); box-shadow:0 12px 30px rgba(0,0,0,.45); }
      .files-workspace-menu-panel button { text-align:left; }
      .files-workspace-form { display:grid; gap:6px; padding-top:6px; border-top:1px solid var(--border); }
      .files-workspace-form input { width:100%; box-sizing:border-box; }
      .files-link-popover { position:fixed; z-index:2147483646; overflow:auto; display:grid; gap:7px; padding:8px; border:1px solid var(--border); border-radius:8px; background:var(--surface-2); box-shadow:0 12px 30px rgba(0,0,0,.55); }
      .files-link-list { display:grid; gap:3px; }
      .files-link-heading { width:100%; text-align:left; display:flex; gap:8px; align-items:center; white-space:normal; }
      .files-link-heading small { color:var(--muted); flex:0 0 auto; }
      .files-workspace-modal-backdrop { position:absolute; inset:0; z-index:2147483645; display:grid; place-items:center; padding:18px; background:rgba(0,0,0,.72); }
      .files-workspace-modal { width:min(760px,calc(100% - 16px)); max-height:calc(100% - 16px); overflow:auto; display:grid; gap:10px; padding:14px; border:1px solid var(--border); border-radius:10px; background:var(--surface-2); box-shadow:0 16px 46px rgba(0,0,0,.6); }
      .files-workspace-modal textarea { min-height:220px; resize:vertical; }
      .files-workspace-modal-actions { display:flex; gap:8px; flex-wrap:wrap; }
      .files-workspace-plan { display:grid; gap:4px; max-height:260px; overflow:auto; }
      .files-workspace-plan-row { display:grid; grid-template-columns:auto minmax(0,1fr); gap:8px; padding:5px 6px; border:1px solid var(--border); border-radius:6px; }
      .files-workspace-plan-row small { color:var(--muted); overflow-wrap:anywhere; }
      .files-workspace-directory-list { display:grid; gap:5px; max-height:260px; overflow:auto; }
    `;
    ui.shadow.appendChild(style);
  }

  function replaceSurfaceButton(ui, surface, label, kind) {
    const current = ui.shadow && ui.shadow.querySelector(`.surface-tabs [data-surface="${surface}"]`);
    if (!current) return null;
    const button = current.cloneNode(true);
    button.removeAttribute('data-surface');
    button.removeAttribute('class');
    button.textContent = label;
    button.disabled = Boolean(ui.state.busy);
    button.addEventListener('click', (event) => {
      event.preventDefault();
      ui._withAllDrafts('onNavigateFilesLocation', kind).catch(() => {});
    });
    current.replaceWith(button);
    return button;
  }

  function filesWorkspacePreferencesForUi(ui) {
    const state = ui && ui.state || {};
    const activeWorkspace = (Array.isArray(state.workspaces) ? state.workspaces : []).find((workspace) => workspace && workspace.id === state.activeWorkspaceId) || null;
    if (!activeWorkspace) return DEFAULT_PREFS;
    const api = root.ObsLinkedNotes || {};
    if (typeof api.workspaceFilesPreferenceKey !== 'function') return DEFAULT_PREFS;
    let expectedKey = '';
    try { expectedKey = api.workspaceFilesPreferenceKey(activeWorkspace); } catch (error) { return DEFAULT_PREFS; }
    if (state[PREFS_KEY_STATE] !== expectedKey) {
      if (ui.__filesWorkspacePreferencesLoadKey !== expectedKey) {
        ui.__filesWorkspacePreferencesLoadKey = expectedKey;
        Promise.resolve()
          .then(() => callHandlerDirect(ui, 'onEnsureFilesWorkspacePreferences'))
          .catch(() => {})
          .finally(() => {
            if (ui.__filesWorkspacePreferencesLoadKey === expectedKey) ui.__filesWorkspacePreferencesLoadKey = '';
          });
      }
      return DEFAULT_PREFS;
    }
    return state[PREFS_STATE] || DEFAULT_PREFS;
  }

  function enhanceSurfaceTabs(ui) {
    const tabs = ui.shadow && ui.shadow.querySelector('.surface-tabs');
    if (!tabs) return;
    replaceSurfaceButton(ui, 'notes', 'Notes', 'notes');
    replaceSurfaceButton(ui, 'files', 'Files', 'root');
    if (tabs.querySelector('[data-files-locations-menu]')) return;
    const preferences = filesWorkspacePreferencesForUi(ui);
    const details = document.createElement('details');
    details.className = 'files-workspace-menu';
    details.dataset.filesLocationsMenu = '1';
    const shortcutRows = (preferences.folderShortcuts || []).map((shortcut) => `<div style="display:grid;grid-template-columns:minmax(0,1fr) auto;gap:5px"><button data-files-shortcut="${escapeHtml(shortcut.id)}">${escapeHtml(shortcut.name)}<br><small>${escapeHtml(shortcut.path)}</small></button><button data-remove-files-shortcut="${escapeHtml(shortcut.id)}" title="Remove shortcut">×</button></div>`).join('');
    details.innerHTML = `<summary>Locations ▾</summary><div class="files-workspace-menu-panel"><button data-files-location="root">Root</button><button data-files-location="notes">Notes folder</button><button data-files-location="linked-notes">Linked Notes editor</button>${shortcutRows || '<div class="hint">No custom folder shortcuts.</div>'}<div class="files-workspace-form"><input data-files-shortcut-name placeholder="Shortcut name"><button data-add-files-shortcut ${ui.state.repositoryPath ? '' : 'disabled'}>Add current folder</button></div></div>`;
    details.querySelectorAll('[data-files-location]').forEach((button) => button.addEventListener('click', () => ui._withAllDrafts('onNavigateFilesLocation', button.dataset.filesLocation).catch(() => {})));
    details.querySelectorAll('[data-files-shortcut]').forEach((button) => button.addEventListener('click', () => ui._withAllDrafts('onNavigateFilesLocation', 'shortcut', button.dataset.filesShortcut).catch(() => {})));
    details.querySelectorAll('[data-remove-files-shortcut]').forEach((button) => button.addEventListener('click', () => ui._call('onRemoveRepositoryFolderShortcut', button.dataset.removeFilesShortcut).catch(() => {})));
    const add = details.querySelector('[data-add-files-shortcut]');
    if (add) add.addEventListener('click', () => {
      const input = details.querySelector('[data-files-shortcut-name]');
      ui._call('onAddRepositoryFolderShortcut', input ? input.value : '').catch(() => {});
    });
    tabs.appendChild(details);
  }

  function escapeHtml(value) {
    return String(value == null ? '' : value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function positionLinkPopover(ui, details, popover) {
    if (!ui.shadow || !details || !popover || !details.open) return;
    const main = ui.shadow.querySelector('.main') || ui.shadow.querySelector('.panel');
    const summary = details.querySelector('summary');
    if (!main || !summary || !main.getBoundingClientRect || !summary.getBoundingClientRect) return;
    const api = root.ObsLinkedNotes || {};
    if (typeof api.clampRepositoryLinkPopoverRect !== 'function') return;
    const rect = api.clampRepositoryLinkPopoverRect(summary.getBoundingClientRect(), main.getBoundingClientRect());
    popover.style.left = `${rect.left}px`;
    popover.style.top = `${rect.top}px`;
    popover.style.width = `${rect.width}px`;
    popover.style.maxHeight = `${rect.maxHeight}px`;
  }

  function enhanceCopyLink(ui) {
    if (!ui.shadow || ui.state.surface !== 'files') return;
    const preview = ui.state.repositoryPreview;
    if (!preview || !preview.path || (ui.state.repositoryEditor && ui.state.repositoryEditor.mode !== 'none')) return;
    const existing = ui.shadow.querySelector('.heading-link-picker');
    const toolbar = ui.shadow.querySelector('.editor .editor-toolbar') || ui.shadow.querySelector('.editor-toolbar');
    if (!toolbar) return;
    if (existing) existing.remove();
    if (toolbar.querySelector('[data-files-copy-link]')) return;
    const api = root.ObsLinkedNotes || {};
    const markdown = /\.md(?:own)?$/i.test(preview.path || '');
    const headings = markdown && typeof api.repositoryHeadingLinksForPreview === 'function' ? api.repositoryHeadingLinksForPreview(preview) : [];
    const details = document.createElement('details');
    details.className = 'files-workspace-menu';
    details.dataset.filesCopyLink = '1';
    details.innerHTML = `<summary>Copy link ▾</summary><div class="files-link-popover"><button data-copy-whole-file>Copy file link</button>${markdown ? `<input data-files-heading-search placeholder="Search headings"><div class="files-link-list">${headings.length ? headings.map((heading, index) => `<button class="files-link-heading" data-copy-heading="${index}" data-heading-search="${escapeHtml(`${heading.text} ${heading.anchor}`.toLowerCase())}" style="padding-left:${Math.max(0, Number(heading.level || 1) - 1) * 12 + 8}px"><small>H${Math.max(1, Math.min(6, Number(heading.level || 1)))}</small><span>${escapeHtml(heading.text)}</span></button>`).join('') : '<div class="hint">No Markdown headings found in this loaded file snapshot.</div>'}</div>` : ''}<div class="hint" data-files-link-status>Uses the already-loaded file snapshot; no GitHub request is made.</div></div>`;
    const openGithub = toolbar.querySelector('[data-action="open-file-github"]');
    if (openGithub) toolbar.insertBefore(details, openGithub); else toolbar.appendChild(details);
    const popover = details.querySelector('.files-link-popover');
    details.addEventListener('toggle', () => { if (details.open) setTimeout(() => positionLinkPopover(ui, details, popover), 0); });
    const whole = details.querySelector('[data-copy-whole-file]');
    if (whole) whole.addEventListener('click', async () => {
      try {
        await ui._call('onCopyRepositoryFileLink');
        const status = details.querySelector('[data-files-link-status]');
        if (status) status.textContent = 'File link copied.';
        details.open = false;
      } catch (error) { /* _call shows contextual error */ }
    });
    details.querySelectorAll('[data-copy-heading]').forEach((button) => button.addEventListener('click', async () => {
      try {
        const item = headings[Number(button.dataset.copyHeading)];
        await ui._call('onCopyRepositoryHeadingLink', item);
        const status = details.querySelector('[data-files-link-status]');
        if (status) status.textContent = `Heading link copied: ${item && item.text || ''}.`;
        details.open = false;
      } catch (error) { /* _call shows contextual error */ }
    }));
    const search = details.querySelector('[data-files-heading-search]');
    if (search) search.addEventListener('input', () => {
      const query = search.value.trim().toLowerCase();
      details.querySelectorAll('[data-heading-search]').forEach((button) => { button.hidden = Boolean(query && !String(button.dataset.headingSearch || '').includes(query)); });
    });
  }

  function createDocumentPresetMenu(ui, oldButton) {
    const preferences = filesWorkspacePreferencesForUi(ui);
    const details = document.createElement('details');
    details.className = 'files-workspace-menu';
    details.dataset.filesNewMenu = '1';
    const presets = (preferences.documentPresets || []).map((preset) => `<div style="display:grid;grid-template-columns:minmax(0,1fr) auto;gap:5px"><button data-document-preset="${escapeHtml(preset.id)}">${escapeHtml(preset.name)}<br><small>${escapeHtml(preset.categoryId)} · ${escapeHtml(preset.templatePath)}</small></button><button data-remove-document-preset="${escapeHtml(preset.id)}" title="Remove preset">×</button></div>`).join('');
    details.innerHTML = `<summary>New file ▾</summary><div class="files-workspace-menu-panel"><button data-document-preset="blank">Blank file</button>${presets || '<div class="hint">No document presets.</div>'}<div class="files-workspace-form"><strong>Add document preset</strong><input data-document-preset-name placeholder="Type name"><input data-document-preset-category placeholder="Category ID"><input data-document-preset-template placeholder="Template repository path" value="${escapeHtml(ui.state.repositoryPreview && ui.state.repositoryPreview.path || '')}"><button data-save-document-preset>Save preset</button></div></div>`;
    details.querySelectorAll('[data-document-preset]').forEach((button) => button.addEventListener('click', () => ui._withAllDrafts('onBeginRepositoryFileCreateFromPreset', button.dataset.documentPreset).catch(() => {})));
    details.querySelectorAll('[data-remove-document-preset]').forEach((button) => button.addEventListener('click', () => ui._call('onRemoveRepositoryDocumentPreset', button.dataset.removeDocumentPreset).catch(() => {})));
    const save = details.querySelector('[data-save-document-preset]');
    if (save) save.addEventListener('click', () => {
      const value = (selector) => { const input = details.querySelector(selector); return input ? input.value : ''; };
      ui._call('onSaveRepositoryDocumentPreset', { name: value('[data-document-preset-name]'), categoryId: value('[data-document-preset-category]'), templatePath: value('[data-document-preset-template]') }).catch(() => {});
    });
    oldButton.replaceWith(details);
  }

  function filesWorkspaceModalContextKey(ui) {
    const state = ui && ui.state || {};
    const workspace = (Array.isArray(state.workspaces) ? state.workspaces : []).find((item) => item && item.id === state.activeWorkspaceId) || null;
    const api = root.ObsLinkedNotes || {};
    if (workspace && typeof api.workspaceFilesPreferenceKey === 'function') {
      try { return api.workspaceFilesPreferenceKey(workspace); } catch (error) { /* fall through */ }
    }
    return String(state.activeWorkspaceId || '');
  }

  function detachFilesWorkspaceModals(ui) {
    if (!ui || !ui.shadow || typeof ui.shadow.querySelector !== 'function') return [];
    const nodes = [];
    for (const selector of ['[data-files-structure-modal]', '[data-files-copy-modal]']) {
      const node = ui.shadow.querySelector(selector);
      if (!node || nodes.includes(node)) continue;
      if (typeof node.remove === 'function') node.remove();
      nodes.push(node);
    }
    return nodes;
  }

  function restoreFilesWorkspaceModals(ui, nodes) {
    if (!ui || !ui.shadow || ui.state.surface !== 'files' || typeof ui.shadow.appendChild !== 'function') return;
    const contextKey = filesWorkspaceModalContextKey(ui);
    for (const node of Array.isArray(nodes) ? nodes : []) {
      if (!node) continue;
      if (String(node.__filesWorkspaceContextKey || '') !== contextKey) continue;
      ui.shadow.appendChild(node);
    }
  }

  function renderPlanRows(container, rows) {
    container.innerHTML = (Array.isArray(rows) ? rows : []).map((row) => `<div class="files-workspace-plan-row"><strong>${escapeHtml(row.status || row.type || '')}</strong><small>${escapeHtml(row.path || row.target || '')}${row.message ? `<br>${escapeHtml(row.message)}` : ''}</small></div>`).join('') || '<div class="hint">No operations.</div>';
  }

  function openStructureModal(ui) {
    if (!ui.shadow || ui.shadow.querySelector('[data-files-structure-modal]')) return;
    const backdrop = document.createElement('div');
    backdrop.className = 'files-workspace-modal-backdrop';
    backdrop.dataset.filesStructureModal = '1';
    backdrop.__filesWorkspaceContextKey = filesWorkspaceModalContextKey(ui);
    backdrop.innerHTML = `<div class="files-workspace-modal"><h3>Create add-only structure</h3><div class="hint">One repository-relative path per line. End a path with / for a folder. Blank lines and lines starting with # are ignored. Existing files are never overwritten or deleted.</div><textarea data-files-structure-text placeholder="entity/\nentity/entity.md\nentity/systems/\nentity/systems/combat.md"></textarea><div class="files-workspace-modal-actions"><button data-structure-preview>Preview</button><button class="primary" data-structure-apply disabled>Apply add-only</button><button data-structure-close>Close</button></div><div class="hint" data-structure-status>Preview performs reads only.</div><div class="files-workspace-plan" data-structure-plan></div></div>`;
    ui.shadow.appendChild(backdrop);
    let plan = null;
    const status = backdrop.querySelector('[data-structure-status]');
    const rows = backdrop.querySelector('[data-structure-plan]');
    const apply = backdrop.querySelector('[data-structure-apply]');
    backdrop.querySelector('[data-structure-close]').addEventListener('click', () => backdrop.remove());
    backdrop.querySelector('[data-structure-preview]').addEventListener('click', async () => {
      plan = null; apply.disabled = true; status.textContent = 'Reading destination state…';
      try {
        plan = await callHandlerDirect(ui, 'onPreviewRepositoryStructure', backdrop.querySelector('[data-files-structure-text]').value);
        if (!plan || plan.cancelled) {
          plan = null;
          status.textContent = 'Structure preview cancelled; nothing was written.';
          return;
        }
        renderPlanRows(rows, plan.statuses);
        apply.disabled = Boolean(plan.blocked);
        status.textContent = plan.blocked ? 'Conflicts/blocked targets found. Nothing can be written until the structure is changed.' : `Ready: ${plan.files.length} empty file(s), ${plan.placeholders.length} empty-folder placeholder(s).`;
      } catch (error) { status.textContent = `Preview failed: ${errorText(error)}`; }
    });
    apply.addEventListener('click', () => {
      if (!plan || plan.blocked) return;
      backdrop.remove();
      ui._call('onApplyRepositoryStructure', plan).catch(() => {});
    });
  }

  function openCopyModal(ui, sourceType, sourcePath) {
    if (!ui.shadow) return;
    ui.shadow.querySelector('[data-files-copy-modal]')?.remove();
    const backdrop = document.createElement('div');
    backdrop.className = 'files-workspace-modal-backdrop';
    backdrop.dataset.filesCopyModal = '1';
    backdrop.__filesWorkspaceContextKey = filesWorkspaceModalContextKey(ui);
    backdrop.innerHTML = `<div class="files-workspace-modal"><h3>Copy ${sourceType === 'folder' ? 'folder' : 'file'}</h3><div class="hint">Source: ${escapeHtml(sourcePath)}. Copy is add-only: every destination file must be absent before the first write.</div><label class="field"><span>Destination name</span><input data-copy-destination-name value="${escapeHtml((root.ObsLinkedNotes && root.ObsLinkedNotes.repositoryFilesWorkspacePathName ? root.ObsLinkedNotes.repositoryFilesWorkspacePathName(sourcePath) : sourcePath.split('/').pop()) || '')}"></label><div class="hint">Destination folder: <strong data-copy-folder-label>/</strong></div><div class="files-workspace-modal-actions"><button data-copy-up disabled>Up</button><button data-copy-use>Use this folder / Preview</button><button data-copy-close>Close</button></div><div class="files-workspace-directory-list" data-copy-directory-list></div><div class="hint" data-copy-status>Select the destination folder.</div><div class="files-workspace-plan" data-copy-plan></div><div class="files-workspace-modal-actions"><button class="primary" data-copy-apply disabled>Copy add-only</button></div></div>`;
    ui.shadow.appendChild(backdrop);
    let folder = '';
    let plan = null;
    const directoryList = backdrop.querySelector('[data-copy-directory-list]');
    const label = backdrop.querySelector('[data-copy-folder-label]');
    const up = backdrop.querySelector('[data-copy-up]');
    const status = backdrop.querySelector('[data-copy-status]');
    const planRows = backdrop.querySelector('[data-copy-plan]');
    const apply = backdrop.querySelector('[data-copy-apply]');
    const nameInput = backdrop.querySelector('[data-copy-destination-name]');
    const load = async (path) => {
      status.textContent = 'Reading folders…';
      try {
        const result = await callHandlerDirect(ui, 'onListRepositoryDirectories', path);
        if (!result || result.cancelled) {
          status.textContent = 'Folder read cancelled.';
          return;
        }
        folder = result.path || '';
        label.textContent = folder || '/';
        up.disabled = !folder;
        directoryList.innerHTML = result.directories.length ? result.directories.map((entry) => `<button data-copy-dir="${escapeHtml(entry.path)}">📁 ${escapeHtml(entry.name || entry.path)}</button>`).join('') : '<div class="hint">No child folders.</div>';
        directoryList.querySelectorAll('[data-copy-dir]').forEach((button) => button.addEventListener('click', () => load(button.dataset.copyDir)));
        status.textContent = 'Choose this folder or browse deeper.';
      } catch (error) { status.textContent = `Folder read failed: ${errorText(error)}`; }
    };
    backdrop.querySelector('[data-copy-close]').addEventListener('click', () => backdrop.remove());
    up.addEventListener('click', () => {
      const api = root.ObsLinkedNotes || {};
      const parent = folder && typeof api.repositoryFilesWorkspacePathParent === 'function' ? api.repositoryFilesWorkspacePathParent(folder) : '';
      load(parent);
    });
    backdrop.querySelector('[data-copy-use]').addEventListener('click', async () => {
      plan = null; apply.disabled = true; status.textContent = 'Preflighting the complete copy destination…';
      try {
        plan = await callHandlerDirect(ui, 'onPreviewRepositoryCopy', { sourceType, sourcePath, destinationFolder: folder, destinationName: nameInput.value });
        if (!plan || plan.cancelled) {
          plan = null;
          status.textContent = 'Copy preview cancelled; nothing was written.';
          return;
        }
        renderPlanRows(planRows, plan.statuses);
        apply.disabled = Boolean(plan.blocked);
        status.textContent = plan.blocked ? 'Destination conflicts/blocked targets found. Nothing will be written.' : `Ready: ${plan.mappings.length} file(s), ${plan.totalBytes} byte(s).`;
      } catch (error) { status.textContent = `Copy preview failed: ${errorText(error)}`; }
    });
    apply.addEventListener('click', () => {
      if (!plan || plan.blocked) return;
      backdrop.remove();
      ui._call('onApplyRepositoryCopy', plan).catch(() => {});
    });
    load('').catch(() => {});
  }

  function enhanceFilesToolbar(ui) {
    if (!ui.shadow || ui.state.surface !== 'files') return;
    ui.shadow.querySelectorAll('[data-action="new-repository-file"]').forEach((button) => {
      if (!button.closest('.files-workspace-menu')) createDocumentPresetMenu(ui, button);
    });
    const toolbar = ui.shadow.querySelector('.editor .editor-toolbar') || ui.shadow.querySelector('.editor-toolbar');
    if (!toolbar) return;
    if (!toolbar.querySelector('[data-create-repository-structure]')) {
      const structure = document.createElement('button');
      structure.dataset.createRepositoryStructure = '1';
      structure.textContent = 'Create structure';
      structure.disabled = Boolean(ui.state.busy);
      structure.addEventListener('click', () => openStructureModal(ui));
      toolbar.appendChild(structure);
    }
    const preview = ui.state.repositoryPreview;
    if (preview && preview.path && !toolbar.querySelector('[data-copy-repository-file]')) {
      const copyFile = document.createElement('button');
      copyFile.dataset.copyRepositoryFile = '1';
      copyFile.textContent = 'Copy file';
      copyFile.disabled = Boolean(ui.state.busy);
      copyFile.addEventListener('click', () => openCopyModal(ui, 'file', preview.path));
      toolbar.appendChild(copyFile);
    }
    if (ui.state.repositoryPath && !toolbar.querySelector('[data-copy-repository-folder]')) {
      const copyFolder = document.createElement('button');
      copyFolder.dataset.copyRepositoryFolder = '1';
      copyFolder.textContent = 'Copy folder';
      copyFolder.disabled = Boolean(ui.state.busy);
      copyFolder.addEventListener('click', () => openCopyModal(ui, 'folder', ui.state.repositoryPath));
      toolbar.appendChild(copyFolder);
    }
  }

  function patchUi(UI) {
    if (!UI || !UI.prototype || UI.prototype[UI_PATCH]) return false;
    Object.defineProperty(UI.prototype, UI_PATCH, { value: true, configurable: false, enumerable: false, writable: false });
    const originalMount = UI.prototype.mount;
    const originalRender = UI.prototype.render;

    UI.prototype.mount = function filesWorkspaceMount(...args) {
      const result = originalMount.apply(this, args);
      if (!this.__filesWorkspaceEscapePatched && typeof document !== 'undefined' && this._onDocumentKeydown) {
        const previous = this._onDocumentKeydown;
        document.removeEventListener('keydown', previous, true);
        this._onDocumentKeydown = (event) => {
          const openLink = this.shadow && this.shadow.querySelector('[data-files-copy-link][open]');
          if (event && event.key === 'Escape' && openLink) {
            event.preventDefault(); event.stopPropagation(); openLink.open = false; return;
          }
          return previous(event);
        };
        document.addEventListener('keydown', this._onDocumentKeydown, true);
        this.__filesWorkspaceEscapePatched = true;
      }
      if (this.shadow && !this.__filesWorkspaceOutsideClickPatched) {
        this.shadow.addEventListener('click', (event) => {
          const openLink = this.shadow && this.shadow.querySelector('[data-files-copy-link][open]');
          if (openLink && !openLink.contains(event.target)) openLink.open = false;
        });
        this.__filesWorkspaceOutsideClickPatched = true;
      }
      return result;
    };

    UI.prototype.render = function filesWorkspaceRender(...args) {
      const preservedModals = detachFilesWorkspaceModals(this);
      let result;
      try {
        result = originalRender.apply(this, args);
        if (!this.shadow || typeof document === 'undefined') return result;
        appendFilesWorkspaceStyle(this);
        enhanceSurfaceTabs(this);
        enhanceFilesToolbar(this);
        enhanceCopyLink(this);
        return result;
      } finally {
        restoreFilesWorkspaceModals(this, preservedModals);
      }
    };
    return true;
  }

  function installRepositoryFilesWorkspace(api = root.ObsLinkedNotes || {}) {
    if (!api || !api.LinkedNotesApp || !api.LinkedNotesUI) return false;
    const appPatched = patchApp(api.LinkedNotesApp);
    const uiPatched = patchUi(api.LinkedNotesUI);
    return appPatched || uiPatched;
  }

  return { installRepositoryFilesWorkspace };
});
