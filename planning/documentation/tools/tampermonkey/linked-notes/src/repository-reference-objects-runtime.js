(function (root, factory) {
  const api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
  if (root.ObsLinkedNotes && root.ObsLinkedNotes.LinkedNotesApp && root.ObsLinkedNotes.LinkedNotesUI) {
    try { api.installRepositoryReferenceObjects(root.ObsLinkedNotes); } catch (error) { /* bootstrap reports failures later */ }
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function (root) {
  'use strict';

  const APP_PATCH = '__obsRepositoryReferenceObjectsAppV1';
  const UI_PATCH = '__obsRepositoryReferenceObjectsUiV1';

  function apiOrThrow(app) {
    const api = app && app.api || root.ObsLinkedNotes || {};
    const required = [
      'referenceObjectLocalStoreKey', 'normalizeReferenceObjectLocalState', 'referenceObjectLocalDraftMap',
      'upsertReferenceObjectLocalDraft', 'removeReferenceObjectLocalDraft', 'findExactReferenceObjectCandidates',
      'wrapReferenceDefinitionAtCandidate', 'createReferenceObjectId', 'formatReferenceUse', 'parseReferenceMarkers',
      'decodeReferenceObjectRegistry', 'encodeReferenceObjectRegistry', 'upsertReferenceObject', 'renameReferenceObject',
      'replaceReferenceObjectUses', 'readReferenceObjectRegistrySnapshot', 'checkReferenceObjectUses',
      'buildReferenceObjectLocalUpdate', 'updateReferenceObjectUsesRemote', 'validateReferenceObjectTags',
      'proveReferenceObjectExpectedBase'
    ];
    for (const name of required) if (typeof api[name] !== 'function') throw new Error(`Reference Object runtime dependency is unavailable: ${name}.`);
    return api;
  }

  function errorText(error) {
    return String(error && error.message || error || 'Unknown error');
  }

  function sameRepository(a, b) {
    return Boolean(a && b && a.owner === b.owner && a.repo === b.repo && a.branch === b.branch);
  }

  function previewText(value, max = 120) {
    const text = String(value == null ? '' : value).replace(/\s+/g, ' ').trim();
    return text.length > max ? `${text.slice(0, max - 1)}…` : text;
  }

  function publicCheck(check) {
    if (!check) return null;
    return {
      objectId: check.objectId,
      currentValuePreview: previewText(check.currentValue),
      staleCount: check.uses.filter((item) => item.status === 'stale').length,
      currentCount: check.uses.filter((item) => item.status === 'current').length,
      indexDrift: Boolean(check.indexDrift),
      incomplete: Boolean(check.incomplete),
      blocked: Boolean(check.blocked),
      diagnostics: (check.diagnostics || []).map((item) => ({ kind: item.kind, path: item.path || '', message: item.message || '' })),
      uses: check.uses.map((use) => ({
        path: use.path,
        line: use.line,
        lineOccurrence: use.lineOccurrence,
        status: use.status,
        storedPreview: previewText(use.value),
        currentPreview: previewText(check.currentValue)
      }))
    };
  }

  function publicValidation(result) {
    if (!result) return null;
    return {
      valid: Boolean(result.valid),
      incomplete: Boolean(result.incomplete),
      counts: result.counts ? { ...result.counts } : {},
      diagnostics: (result.diagnostics || []).map((item) => ({ kind: item.kind || 'issue', path: item.path || '', objectId: item.objectId || '', message: item.message || '' }))
    };
  }


  function locateReferenceFocusOccurrence(api, content, focus) {
    if (!api || typeof api.parseReferenceMarkers !== 'function' || !focus) return null;
    const role = focus.role === 'definition' ? 'def' : focus.role === 'use' ? 'use' : String(focus.role || '');
    const id = String(focus.objectId || '');
    const line = Math.max(1, Number(focus.line) || 1);
    const lineOccurrence = Math.max(1, Number(focus.lineOccurrence) || 1);
    const parsed = api.parseReferenceMarkers(String(content == null ? '' : content));
    return parsed.occurrences.find((item) => item.role === role && item.id === id && item.line === line && item.lineOccurrence === lineOccurrence) || null;
  }

  function patchApp(App) {
    if (!App || !App.prototype || App.prototype[APP_PATCH]) return false;
    Object.defineProperty(App.prototype, APP_PATCH, { value: true, configurable: false, enumerable: false, writable: false });
    const originalStart = App.prototype.start;
    const originalSelectWorkspace = App.prototype.selectWorkspace;
    const originalSaveWorkspace = App.prototype.saveWorkspace;
    const originalDeleteWorkspace = App.prototype.deleteWorkspace;
    const originalOpenPanel = App.prototype.openPanel;
    const originalOpenRepositoryEntry = App.prototype.openRepositoryEntry;
    const originalBeginRepositoryFileEdit = App.prototype.beginRepositoryFileEdit;
    const originalSaveRepositoryEditor = App.prototype.saveRepositoryEditor;

    App.prototype._referenceObjectRegistryPath = function referenceObjectRegistryPath() {
      return String(apiOrThrow(this).DEFAULT_REFERENCE_OBJECT_REGISTRY_PATH || '.linked-notes/reference-objects.json');
    };

    App.prototype._referenceObjectLocalKey = function referenceObjectLocalKey() {
      const workspace = this._activeWorkspace();
      return workspace ? apiOrThrow(this).referenceObjectLocalStoreKey(workspace) : '';
    };

    App.prototype._referenceObjectLocalMap = function referenceObjectLocalMap() {
      return apiOrThrow(this).referenceObjectLocalDraftMap(this.referenceObjectLocalState || { schemaVersion: 1, files: [] });
    };

    App.prototype._referenceObjectUiPatch = function referenceObjectUiPatch(extra = {}) {
      const registry = this.referenceObjectRegistrySnapshot && this.referenceObjectRegistrySnapshot.registry;
      const checks = {};
      for (const [id, check] of Object.entries(this.referenceObjectChecks || {})) if (check) checks[id] = publicCheck(check);
      return {
        referenceObjectsLoaded: Boolean(this.referenceObjectsLoaded),
        referenceObjects: registry && Array.isArray(registry.objects) ? registry.objects : [],
        referenceObjectChecks: checks,
        referenceObjectValidation: publicValidation(this.referenceObjectValidation),
        referenceObjectPendingFiles: (this.referenceObjectLocalState && this.referenceObjectLocalState.files || []).map((file) => file.path),
        referenceObjectRegistryPath: this._referenceObjectRegistryPath(),
        referenceObjectFocus: this.referenceObjectFocus || null,
        ...extra
      };
    };

    App.prototype._loadReferenceObjectLocalState = async function loadReferenceObjectLocalState(options = {}) {
      const api = apiOrThrow(this);
      const key = this._referenceObjectLocalKey();
      const state = key ? api.normalizeReferenceObjectLocalState(await this.getValue(key, { schemaVersion: 1, files: [] })) : { schemaVersion: 1, files: [] };
      this.referenceObjectLocalState = state;
      this.referenceObjectLocalStateKey = key;
      this.referenceObjectsLoaded = false;
      this.referenceObjectRegistrySnapshot = null;
      this.referenceObjectChecks = {};
      this.referenceObjectValidation = null;
      this.referenceObjectFocus = null;
      if (!options.silent) this._setUi(this._referenceObjectUiPatch({ status: state.files.length ? `${state.files.length} local Reference Object draft file(s) restored for this workspace.` : 'Reference Object local state ready.' }));
      return state;
    };

    App.prototype._ensureReferenceObjectLocalStateCurrent = async function ensureReferenceObjectLocalStateCurrent(options = {}) {
      const key = this._referenceObjectLocalKey();
      if (key === this.referenceObjectLocalStateKey && this.referenceObjectLocalState) return this.referenceObjectLocalState;
      return this._loadReferenceObjectLocalState(options);
    };

    App.prototype._persistReferenceObjectLocalState = async function persistReferenceObjectLocalState(state, options = {}) {
      const api = apiOrThrow(this);
      const key = this._referenceObjectLocalKey();
      if (!key) throw new Error('Select a GitHub workspace before saving local Reference Object state.');
      const normalized = api.normalizeReferenceObjectLocalState(state);
      await this.setValue(key, normalized);
      this.referenceObjectLocalState = normalized;
      this.referenceObjectLocalStateKey = key;
      if (!options.silent) this._setUi(this._referenceObjectUiPatch());
      return normalized;
    };

    App.prototype._putReferenceObjectLocalDraft = async function putReferenceObjectLocalDraft(path, baseSha, content, options = {}) {
      const api = apiOrThrow(this);
      await this._ensureReferenceObjectLocalStateCurrent({ silent: true });
      const existing = this._referenceObjectLocalMap().get(path);
      const next = api.upsertReferenceObjectLocalDraft(this.referenceObjectLocalState, {
        path,
        baseSha: existing ? existing.baseSha : String(baseSha || ''),
        content,
        updatedAt: new Date().toISOString()
      });
      return this._persistReferenceObjectLocalState(next, options);
    };

    App.prototype._removeReferenceObjectLocalDraft = async function removeReferenceObjectLocalDraft(path, options = {}) {
      const api = apiOrThrow(this);
      await this._ensureReferenceObjectLocalStateCurrent({ silent: true });
      if (!this._referenceObjectLocalMap().has(path)) return this.referenceObjectLocalState;
      return this._persistReferenceObjectLocalState(api.removeReferenceObjectLocalDraft(this.referenceObjectLocalState, path), options);
    };

    App.prototype._referenceObjectsClient = async function referenceObjectsClient() {
      const workspace = this._activeWorkspace();
      if (!workspace) throw new Error('Select a GitHub workspace before using Reference Objects.');
      return this._client(workspace);
    };

    App.prototype._readReferenceRegistryUnlocked = async function readReferenceRegistryUnlocked() {
      await this._ensureReferenceObjectLocalStateCurrent({ silent: true });
      const client = await this._referenceObjectsClient();
      const snapshot = await apiOrThrow(this).readReferenceObjectRegistrySnapshot(client, this._referenceObjectRegistryPath(), this.referenceObjectLocalState.files);
      this.referenceObjectRegistrySnapshot = snapshot;
      this.referenceObjectsLoaded = true;
      return snapshot;
    };

    App.prototype.loadReferenceObjects = async function loadReferenceObjects(force = false) {
      await this._ensureReferenceObjectLocalStateCurrent({ silent: true });
      if (!force && this.referenceObjectsLoaded && this.referenceObjectRegistrySnapshot) {
        this._setUi(this._referenceObjectUiPatch({ status: `${this.referenceObjectRegistrySnapshot.registry.objects.length} Reference Object definition(s) loaded.` }));
        return this.referenceObjectRegistrySnapshot.registry.objects;
      }
      const run = async () => this._readReferenceRegistryUnlocked();
      const snapshot = typeof this._runFilesWorkspaceRead === 'function'
        ? await this._runFilesWorkspaceRead('Reading Reference Object Definitions File…', run)
        : await this._runRemoteOperation('Reading Reference Object Definitions File…', run);
      if (!snapshot || snapshot.cancelled) return snapshot;
      this._setUi(this._referenceObjectUiPatch({ status: `${snapshot.registry.objects.length} Reference Object definition(s) loaded from ${snapshot.local ? 'local state' : snapshot.missing ? 'an empty Definitions File state' : 'GitHub'}.` }));
      return snapshot.registry.objects;
    };

    App.prototype._ensureReferenceRegistryLoaded = async function ensureReferenceRegistryLoaded() {
      if (this.referenceObjectsLoaded && this.referenceObjectRegistrySnapshot) return this.referenceObjectRegistrySnapshot;
      const result = await this.loadReferenceObjects();
      if (result && result.cancelled) throw new Error('Reference Object Definitions File read was cancelled.');
      if (!this.referenceObjectRegistrySnapshot) throw new Error('Reference Object Definitions File is unavailable.');
      return this.referenceObjectRegistrySnapshot;
    };

    App.prototype._effectiveReferenceObjectFile = async function effectiveReferenceObjectFile(path) {
      await this._ensureReferenceObjectLocalStateCurrent({ silent: true });
      const local = this._referenceObjectLocalMap().get(path);
      if (local) return { path, content: local.content, sha: local.baseSha, baseSha: local.baseSha, local: true };
      const client = await this._referenceObjectsClient();
      const file = await client.readBytes(path, { maxBytes: apiOrThrow(this).DEFAULT_REFERENCE_SCAN_MAX_FILE_BYTES || (512 * 1024) });
      let content;
      try { content = new TextDecoder('utf-8', { fatal: true }).decode(file.bytes); }
      catch (error) { throw new Error(`Reference Object file is not strict UTF-8: ${path}.`); }
      return { path, content, sha: String(file.sha || ''), baseSha: String(file.sha || ''), local: false };
    };

    App.prototype._currentReferenceObjectSource = function currentReferenceObjectSource() {
      const editor = this.repositoryEditor || {};
      if (editor.mode === 'edit' && editor.path) return { path: editor.path, content: String(editor.content || ''), baseSha: String(editor.baseSha || ''), fromEditor: true };
      const preview = this.repositoryPreview;
      if (!preview || preview.kind !== 'text' || !preview.path || typeof preview.content !== 'string') throw new Error('Open a supported repository text file before creating a Reference Object.');
      if (!sameRepository(preview.context, this._activeWorkspace())) throw new Error('Reference Object definitions can only be created in the active workspace repository.');
      const local = this._referenceObjectLocalMap().get(preview.path);
      return local
        ? { path: preview.path, content: local.content, baseSha: local.baseSha, fromEditor: false }
        : { path: preview.path, content: preview.content, baseSha: String(preview.sha || ''), fromEditor: false };
    };

    App.prototype.findReferenceObjectCandidates = async function findReferenceObjectCandidates(value) {
      await this._ensureReferenceObjectLocalStateCurrent({ silent: true });
      const source = this._currentReferenceObjectSource();
      const candidates = apiOrThrow(this).findExactReferenceObjectCandidates(source.content, value);
      return { path: source.path, value: String(value == null ? '' : value), candidates };
    };

    App.prototype.createReferenceObjectLocal = async function createReferenceObjectLocal(input = {}) {
      const api = apiOrThrow(this);
      const name = String(input.name || '').trim();
      if (!name) throw new Error('Reference Object name is required.');
      await this._ensureReferenceRegistryLoaded();
      const source = this._currentReferenceObjectSource();
      const candidate = input.candidate || {};
      if (String(candidate.value == null ? '' : candidate.value) !== source.content.slice(Number(candidate.start), Number(candidate.end))) throw new Error('Selected exact occurrence changed. Find it again.');
      const id = api.createReferenceObjectId();
      const wrapped = api.wrapReferenceDefinitionAtCandidate(source.content, candidate, id);
      let localState = this.referenceObjectLocalState;
      const sourceExisting = api.referenceObjectLocalDraftMap(localState).get(source.path);
      localState = api.upsertReferenceObjectLocalDraft(localState, { path: source.path, baseSha: sourceExisting ? sourceExisting.baseSha : source.baseSha, content: wrapped, updatedAt: new Date().toISOString() });
      const registry = api.upsertReferenceObject(this.referenceObjectRegistrySnapshot.registry, { id, name, definition: { path: source.path }, uses: [] });
      const registryContent = api.encodeReferenceObjectRegistry(registry);
      const registryPath = this._referenceObjectRegistryPath();
      const registryExisting = api.referenceObjectLocalDraftMap(localState).get(registryPath);
      localState = api.upsertReferenceObjectLocalDraft(localState, { path: registryPath, baseSha: registryExisting ? registryExisting.baseSha : this.referenceObjectRegistrySnapshot.sha, content: registryContent, updatedAt: new Date().toISOString() });
      await this._persistReferenceObjectLocalState(localState, { silent: true });
      this.referenceObjectRegistrySnapshot = { path: registryPath, sha: registryExisting ? registryExisting.baseSha : this.referenceObjectRegistrySnapshot.sha, content: registryContent, registry, local: true };
      this.referenceObjectsLoaded = true;
      this.referenceObjectChecks = {};
      this.referenceObjectValidation = null;
      if (source.fromEditor) this.repositoryEditor = { ...this.repositoryEditor, content: wrapped };
      else if (this.repositoryPreview && this.repositoryPreview.path === source.path) {
        this.repositoryPreview = { ...this.repositoryPreview, content: wrapped, size: new TextEncoder().encode(wrapped).byteLength, localReferenceDraft: true };
        this.fileViewMode = 'source';
        this.fileRendered = null;
      }
      this._setUi(this._referenceObjectUiPatch({ replaceFileEditor: Boolean(source.fromEditor), status: `Reference Object ${name} (${id}) created locally. ${this.referenceObjectLocalState.files.length} local draft file(s) pending; GitHub was not changed.` }));
      return { id, name, definitionPath: source.path };
    };

    App.prototype.copyReferenceObjectUse = async function copyReferenceObjectUse(id) {
      const api = apiOrThrow(this);
      const snapshot = await this._ensureReferenceRegistryLoaded();
      const object = api.referenceObjectById(snapshot.registry, id);
      if (!object) throw new Error(`Reference Object not found: ${id}.`);
      const read = async () => this._effectiveReferenceObjectFile(object.definition.path);
      const file = typeof this._runFilesWorkspaceRead === 'function'
        ? await this._runFilesWorkspaceRead('Reading Reference Object definition…', read)
        : await this._runRemoteOperation('Reading Reference Object definition…', read);
      if (!file || file.cancelled) return file;
      const parsed = api.parseReferenceMarkers(file.content);
      const definitions = parsed.occurrences.filter((item) => item.role === 'def' && item.id === object.id);
      if (parsed.diagnostics.length || definitions.length !== 1) throw new Error(`Reference Object ${object.id} must have exactly one valid definition in ${object.definition.path}.`);
      const text = api.formatReferenceUse(object.id, definitions[0].value);
      await this.clipboardWriter(text);
      this._setUi(this._referenceObjectUiPatch({ status: `Reference ${object.name} copied to clipboard with its current materialized value. Paste it through normal file editing.` }));
      return text;
    };

    App.prototype.checkReferenceObjectUses = async function checkReferenceObjectUses(id) {
      const api = apiOrThrow(this);
      await this._ensureReferenceObjectLocalStateCurrent({ silent: true });
      const run = async () => {
        const client = await this._referenceObjectsClient();
        return api.checkReferenceObjectUses({ client, objectId: id, registryPath: this._referenceObjectRegistryPath(), overlays: this.referenceObjectLocalState.files });
      };
      const check = typeof this._runFilesWorkspaceRead === 'function'
        ? await this._runFilesWorkspaceRead('Checking Reference Object uses…', run)
        : await this._runRemoteOperation('Checking Reference Object uses…', run);
      if (!check || check.cancelled) return check;
      this.referenceObjectRegistrySnapshot = check.registrySnapshot;
      this.referenceObjectsLoaded = true;
      this.referenceObjectChecks = { ...(this.referenceObjectChecks || {}), [check.objectId]: check };
      const stale = check.uses.filter((item) => item.status === 'stale').length;
      this._setUi(this._referenceObjectUiPatch({ status: `Checked ${check.uses.length} use(s) for ${check.object.name}: ${stale} stale${check.incomplete ? '; scan incomplete' : ''}. No file was changed.` }));
      return check;
    };

    App.prototype.updateReferenceObjectUsesLocal = async function updateReferenceObjectUsesLocal(id) {
      const api = apiOrThrow(this);
      const check = await this.checkReferenceObjectUses(id);
      if (!check || check.cancelled) return check;
      const plan = api.buildReferenceObjectLocalUpdate(check);
      if (plan.staleCount === 0 && !check.indexDrift) {
        this._setUi(this._referenceObjectUiPatch({ status: `Reference Object ${check.object.name} is already current and its usage index matches. No local draft was created.` }));
        return plan;
      }
      let state = this.referenceObjectLocalState;
      for (const file of plan.files) {
        const existing = api.referenceObjectLocalDraftMap(state).get(file.path);
        state = api.upsertReferenceObjectLocalDraft(state, { path: file.path, baseSha: existing ? existing.baseSha : file.baseSha, content: file.content, updatedAt: new Date().toISOString() });
      }
      const registryPath = this._referenceObjectRegistryPath();
      const registryExisting = api.referenceObjectLocalDraftMap(state).get(registryPath);
      state = api.upsertReferenceObjectLocalDraft(state, { path: registryPath, baseSha: registryExisting ? registryExisting.baseSha : check.registrySnapshot.sha, content: plan.registryContent, updatedAt: new Date().toISOString() });
      await this._persistReferenceObjectLocalState(state, { silent: true });
      this.referenceObjectRegistrySnapshot = { path: registryPath, sha: registryExisting ? registryExisting.baseSha : check.registrySnapshot.sha, content: plan.registryContent, registry: plan.registry, local: true };
      this.referenceObjectsLoaded = true;
      const synthetic = {
        ...check,
        registrySnapshot: this.referenceObjectRegistrySnapshot,
        uses: plan.uses.map((use) => ({ ...use, status: 'current', value: check.currentValue })),
        indexDrift: false,
        diagnostics: (check.diagnostics || []).filter((item) => item.kind !== 'usage_index_drift')
      };
      this.referenceObjectChecks = { ...(this.referenceObjectChecks || {}), [id]: synthetic };
      const localPreview = this.repositoryPreview && api.referenceObjectLocalDraftMap(state).get(this.repositoryPreview.path);
      if (localPreview && this.repositoryPreview.kind === 'text') {
        this.repositoryPreview = { ...this.repositoryPreview, content: localPreview.content, size: new TextEncoder().encode(localPreview.content).byteLength, localReferenceDraft: true };
        this.fileViewMode = 'source';
        this.fileRendered = null;
      }
      this._setUi(this._referenceObjectUiPatch({ status: `${plan.staleCount} stale use(s) updated locally for ${check.object.name}. GitHub was not changed.` }));
      return plan;
    };

    App.prototype.updateReferenceObjectUsesGitHub = async function updateReferenceObjectUsesGitHub(id) {
      const api = apiOrThrow(this);
      await this._ensureReferenceObjectLocalStateCurrent({ silent: true });
      if (this.referenceObjectLocalState.files.length) throw new Error('Local Reference Object drafts are pending. Publish or otherwise reconcile them before an independent GitHub usage update.');
      return this._runRemoteOperation('Updating Reference Object uses on GitHub…', async () => {
        const client = await this._referenceObjectsClient();
        const result = await api.updateReferenceObjectUsesRemote({ client, objectId: id, registryPath: this._referenceObjectRegistryPath() });
        const snapshot = await api.readReferenceObjectRegistrySnapshot(client, this._referenceObjectRegistryPath(), []);
        this.referenceObjectRegistrySnapshot = snapshot;
        this.referenceObjectsLoaded = true;
        this.referenceObjectChecks = {};
        this.referenceObjectValidation = null;
        this._setUi(this._referenceObjectUiPatch({ status: `GitHub update complete for ${id}: ${result.staleCount} stale use(s) refreshed; verified writes: ${result.results.length}.` }));
        return result;
      });
    };

    App.prototype.validateReferenceObjectTags = async function validateReferenceObjectTags() {
      const api = apiOrThrow(this);
      await this._ensureReferenceObjectLocalStateCurrent({ silent: true });
      const run = async () => {
        const client = await this._referenceObjectsClient();
        return api.validateReferenceObjectTags({ client, registryPath: this._referenceObjectRegistryPath(), overlays: this.referenceObjectLocalState.files });
      };
      const result = typeof this._runFilesWorkspaceRead === 'function'
        ? await this._runFilesWorkspaceRead('Validating Reference Object tags…', run)
        : await this._runRemoteOperation('Validating Reference Object tags…', run);
      if (!result || result.cancelled) return result;
      this.referenceObjectValidation = result;
      this.referenceObjectRegistrySnapshot = result.registrySnapshot;
      this.referenceObjectsLoaded = true;
      this._setUi(this._referenceObjectUiPatch({ status: result.valid ? `Reference Object tags valid: ${result.counts.objects} object(s), ${result.counts.uses} use(s).` : `Reference Object validation found ${result.diagnostics.length} issue(s)${result.incomplete ? '; scan incomplete' : ''}. Nothing was changed.` }));
      return result;
    };

    App.prototype.renameReferenceObjectLocal = async function renameReferenceObjectLocal(id, name) {
      const api = apiOrThrow(this);
      const snapshot = await this._ensureReferenceRegistryLoaded();
      const registry = api.renameReferenceObject(snapshot.registry, id, name);
      const content = api.encodeReferenceObjectRegistry(registry);
      const path = this._referenceObjectRegistryPath();
      const existing = this._referenceObjectLocalMap().get(path);
      await this._putReferenceObjectLocalDraft(path, existing ? existing.baseSha : snapshot.sha, content, { silent: true });
      this.referenceObjectRegistrySnapshot = { path, sha: existing ? existing.baseSha : snapshot.sha, content, registry, local: true };
      this.referenceObjectsLoaded = true;
      this._setUi(this._referenceObjectUiPatch({ status: `Reference Object renamed locally to ${String(name || '').trim()}. Stable id ${id} did not change; GitHub was not changed.` }));
      return api.referenceObjectById(registry, id);
    };

    App.prototype._reindexReferenceObjectFileLocal = async function reindexReferenceObjectFileLocal(path, content, options = {}) {
      const api = apiOrThrow(this);
      if (!this.referenceObjectsLoaded || !this.referenceObjectRegistrySnapshot) {
        if (options.skipLoad) return null;
        await this._ensureReferenceRegistryLoaded();
      }
      const parsed = api.parseReferenceMarkers(content);
      if (parsed.diagnostics.length) return { diagnostics: parsed.diagnostics };
      let registry = this.referenceObjectRegistrySnapshot.registry;
      let changed = false;
      for (const object of registry.objects) {
        const existingOther = (object.uses || []).filter((use) => use.path !== path);
        const localUses = parsed.occurrences.filter((marker) => marker.role === 'use' && marker.id === object.id).map((marker) => ({ path, line: marker.line, lineOccurrence: marker.lineOccurrence }));
        const next = [...existingOther, ...localUses];
        if (JSON.stringify(next) !== JSON.stringify(object.uses || [])) {
          registry = api.replaceReferenceObjectUses(registry, object.id, next);
          changed = true;
        }
      }
      if (!changed) return { changed: false, diagnostics: [] };
      const registryPath = this._referenceObjectRegistryPath();
      const registryContent = api.encodeReferenceObjectRegistry(registry);
      const local = this._referenceObjectLocalMap().get(registryPath);
      await this._putReferenceObjectLocalDraft(registryPath, local ? local.baseSha : this.referenceObjectRegistrySnapshot.sha, registryContent, { silent: true });
      this.referenceObjectRegistrySnapshot = { path: registryPath, sha: local ? local.baseSha : this.referenceObjectRegistrySnapshot.sha, content: registryContent, registry, local: true };
      return { changed: true, diagnostics: [] };
    };

    App.prototype.saveRepositoryReferenceDraftLocal = async function saveRepositoryReferenceDraftLocal(input = {}) {
      const editor = { ...(this.repositoryEditor || {}), ...(input || {}) };
      if (editor.mode !== 'edit' || !editor.path) throw new Error('Open an existing repository text file in Edit before saving a local Reference Object draft.');
      await this._putReferenceObjectLocalDraft(editor.path, editor.baseSha, editor.content, { silent: true });
      this.repositoryEditor = { ...this.repositoryEditor, content: String(editor.content || '') };
      try { await this._reindexReferenceObjectFileLocal(editor.path, editor.content); } catch (error) { /* local file draft remains even if index read fails */ }
      this.referenceObjectChecks = {};
      this.referenceObjectValidation = null;
      this._setUi(this._referenceObjectUiPatch({ replaceFileEditor: true, status: `Saved ${editor.path} as a local Reference Object draft. GitHub was not changed.` }));
      return this._referenceObjectLocalMap().get(editor.path);
    };

    App.prototype.publishReferenceObjectLocalDraftsGitHub = async function publishReferenceObjectLocalDraftsGitHub() {
      const api = apiOrThrow(this);
      await this._ensureReferenceObjectLocalStateCurrent({ silent: true });
      if (!this.referenceObjectLocalState.files.length) {
        this._setUi(this._referenceObjectUiPatch({ status: 'No local Reference Object draft files are pending.' }));
        return [];
      }
      return this._runRemoteOperation('Publishing local Reference Object drafts to GitHub…', async () => {
        const client = await this._referenceObjectsClient();
        const registryPath = this._referenceObjectRegistryPath();
        const drafts = [...this.referenceObjectLocalState.files].sort((left, right) => (left.path === registryPath ? 1 : right.path === registryPath ? -1 : left.path.localeCompare(right.path)));
        for (const draft of drafts) await api.proveReferenceObjectExpectedBase(client, draft.path, draft.baseSha);
        const results = [];
        let state = this.referenceObjectLocalState;
        for (const draft of drafts) {
          try {
            const saved = await client.saveVerified({ path: draft.path, content: draft.content, baseSha: draft.baseSha, message: `${draft.baseSha ? 'Update' : 'Create'} Reference Object repository state ${draft.path}` });
            results.push({ target: draft.path, status: 'completed', sha: String(saved && saved.sha || ''), message: 'Exact GitHub read-back verified.' });
            state = api.removeReferenceObjectLocalDraft(state, draft.path);
            await this._persistReferenceObjectLocalState(state, { silent: true });
          } catch (error) {
            results.push({ target: draft.path, status: 'failed', message: errorText(error) });
            const partial = new Error(`Publishing local Reference Object drafts stopped after ${results.filter((item) => item.status === 'completed').length} verified file(s). Completed GitHub writes remain; pending drafts are preserved.`);
            partial.kind = 'partial_reference_object_publish';
            partial.partialResults = results;
            this._setUi(this._referenceObjectUiPatch());
            throw partial;
          }
        }
        const snapshot = await api.readReferenceObjectRegistrySnapshot(client, registryPath, []);
        this.referenceObjectRegistrySnapshot = snapshot;
        this.referenceObjectsLoaded = true;
        this.referenceObjectChecks = {};
        this.referenceObjectValidation = null;
        this._setUi(this._referenceObjectUiPatch({ status: `Published ${results.length} local Reference Object draft file(s) to GitHub with exact read-back verification.` }));
        return results;
      });
    };

    App.prototype.openReferenceObjectDefinition = async function openReferenceObjectDefinition(id) {
      const api = apiOrThrow(this);
      const snapshot = await this._ensureReferenceRegistryLoaded();
      const object = api.referenceObjectById(snapshot.registry, id);
      if (!object) throw new Error(`Reference Object not found: ${id}.`);
      const path = object.definition.path;
      const preview = await this.openRepositoryEntry({ type: 'file', path, name: path.slice(path.lastIndexOf('/') + 1) });
      const parsed = api.parseReferenceMarkers(preview && preview.content || '');
      const definition = parsed.occurrences.find((item) => item.role === 'def' && item.id === id);
      this.referenceObjectFocus = { objectId: id, path, line: definition ? definition.line : 1, lineOccurrence: definition ? definition.lineOccurrence : 1, role: 'definition' };
      this._setUi(this._referenceObjectUiPatch({ status: `Opened definition for ${object.name}: ${path}.` }));
      return preview;
    };

    App.prototype.openReferenceObjectUse = async function openReferenceObjectUse(id, use = {}) {
      const path = String(use.path || '').trim();
      if (!path) throw new Error('Reference Object use path is required.');
      const preview = await this.openRepositoryEntry({ type: 'file', path, name: path.slice(path.lastIndexOf('/') + 1) });
      this.fileViewMode = 'source';
      this.fileRendered = null;
      this.referenceObjectFocus = { objectId: id, path, line: Math.max(1, Number(use.line) || 1), lineOccurrence: Math.max(1, Number(use.lineOccurrence) || 1), role: 'use' };
      this._setUi(this._referenceObjectUiPatch({ status: `Opened ${path} at Reference Object use line ${this.referenceObjectFocus.line}, occurrence #${this.referenceObjectFocus.lineOccurrence}.` }));
      return preview;
    };

    if (typeof originalOpenRepositoryEntry === 'function') {
      App.prototype.openRepositoryEntry = async function referenceObjectsOpenRepositoryEntry(entry, contextOverride = null) {
        const result = await originalOpenRepositoryEntry.call(this, entry, contextOverride);
        if (contextOverride || !this.repositoryPreview || !this.repositoryPreview.path || this.repositoryPreview.kind !== 'text') return result;
        await this._ensureReferenceObjectLocalStateCurrent({ silent: true });
        const draft = this._referenceObjectLocalMap().get(this.repositoryPreview.path);
        if (!draft) return result;
        this.repositoryPreview = { ...this.repositoryPreview, content: draft.content, size: new TextEncoder().encode(draft.content).byteLength, sha: draft.baseSha || this.repositoryPreview.sha, localReferenceDraft: true };
        this.fileViewMode = 'source';
        this.fileRendered = null;
        this._setUi(this._referenceObjectUiPatch({ status: `Opened local Reference Object draft for ${draft.path}; GitHub base SHA is ${draft.baseSha || '(new path)'}.` }));
        return this.repositoryPreview;
      };
    }

    if (typeof originalBeginRepositoryFileEdit === 'function') {
      App.prototype.beginRepositoryFileEdit = async function referenceObjectsBeginRepositoryFileEdit(...args) {
        await this._ensureReferenceObjectLocalStateCurrent({ silent: true });
        const preview = this.repositoryPreview;
        const draft = preview && preview.path ? this._referenceObjectLocalMap().get(preview.path) : null;
        if (!draft) return originalBeginRepositoryFileEdit.apply(this, args);
        this.repositoryEditor = {
          mode: 'edit',
          parentPath: preview.path.includes('/') ? preview.path.slice(0, preview.path.lastIndexOf('/')) : '',
          path: preview.path,
          name: preview.name || preview.path.slice(preview.path.lastIndexOf('/') + 1),
          content: draft.content,
          baseSha: draft.baseSha || preview.sha || ''
        };
        this.fileViewMode = 'source';
        this.surface = 'files';
        this._setUi(this._referenceObjectUiPatch({ replaceFileEditor: true, status: `Editing local Reference Object draft ${preview.path}. Use Save local draft to stay local or normal Save to write this file to GitHub.` }));
        return this.repositoryEditor;
      };
    }

    if (typeof originalSaveRepositoryEditor === 'function') {
      App.prototype.saveRepositoryEditor = async function referenceObjectsSaveRepositoryEditor(input = {}) {
        const requested = { ...(this.repositoryEditor || {}), ...(input || {}) };
        const result = await originalSaveRepositoryEditor.call(this, input);
        if (!result || !result.path || requested.mode === 'folder') return result;
        await this._ensureReferenceObjectLocalStateCurrent({ silent: true });
        if (this._referenceObjectLocalMap().has(result.path)) await this._removeReferenceObjectLocalDraft(result.path, { silent: true });
        const content = String(result.content == null ? requested.content || '' : result.content);
        try {
          if (/obs-ref:(?:def|use)/.test(content) || this.referenceObjectsLoaded) await this._reindexReferenceObjectFileLocal(result.path, content);
        } catch (error) { /* remote file is already verified; index remains explicitly repairable */ }
        this.referenceObjectChecks = {};
        this.referenceObjectValidation = null;
        this._setUi(this._referenceObjectUiPatch({ status: `${result.path} saved to GitHub. Reference Object usage index is local until separately published when changed.` }));
        return result;
      };
    }

    async function reloadAfterWorkspaceChange(app, result) {
      await app._loadReferenceObjectLocalState();
      return result;
    }

    if (typeof originalSelectWorkspace === 'function') App.prototype.selectWorkspace = async function referenceObjectsSelectWorkspace(...args) { return reloadAfterWorkspaceChange(this, await originalSelectWorkspace.apply(this, args)); };
    if (typeof originalSaveWorkspace === 'function') App.prototype.saveWorkspace = async function referenceObjectsSaveWorkspace(...args) { return reloadAfterWorkspaceChange(this, await originalSaveWorkspace.apply(this, args)); };
    if (typeof originalDeleteWorkspace === 'function') App.prototype.deleteWorkspace = async function referenceObjectsDeleteWorkspace(...args) { return reloadAfterWorkspaceChange(this, await originalDeleteWorkspace.apply(this, args)); };
    if (typeof originalOpenPanel === 'function') App.prototype.openPanel = async function referenceObjectsOpenPanel(...args) { const result = await originalOpenPanel.apply(this, args); await this._ensureReferenceObjectLocalStateCurrent(); return result; };

    App.prototype.start = async function referenceObjectsStart(...args) {
      if (this.ui && this.ui.handlers) Object.assign(this.ui.handlers, {
        onLoadReferenceObjects: (force) => this.loadReferenceObjects(force),
        onFindReferenceObjectCandidates: (value) => this.findReferenceObjectCandidates(value),
        onCreateReferenceObjectLocal: (input) => this.createReferenceObjectLocal(input),
        onCopyReferenceObjectUse: (id) => this.copyReferenceObjectUse(id),
        onCheckReferenceObjectUses: (id) => this.checkReferenceObjectUses(id),
        onUpdateReferenceObjectUsesLocal: (id) => this.updateReferenceObjectUsesLocal(id),
        onUpdateReferenceObjectUsesGitHub: (id) => this.updateReferenceObjectUsesGitHub(id),
        onValidateReferenceObjectTags: () => this.validateReferenceObjectTags(),
        onRenameReferenceObjectLocal: (id, name) => this.renameReferenceObjectLocal(id, name),
        onSaveRepositoryReferenceDraftLocal: (input) => this.saveRepositoryReferenceDraftLocal(input),
        onPublishReferenceObjectLocalDraftsGitHub: () => this.publishReferenceObjectLocalDraftsGitHub(),
        onOpenReferenceObjectDefinition: (id) => this.openReferenceObjectDefinition(id),
        onOpenReferenceObjectUse: (id, use) => this.openReferenceObjectUse(id, use)
      });
      const result = await originalStart.apply(this, args);
      await this._loadReferenceObjectLocalState();
      return result;
    };

    return true;
  }

  function escapeHtml(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
  }

  function contextKey(ui) {
    const state = ui && ui.state || {};
    const workspace = (Array.isArray(state.workspaces) ? state.workspaces : []).find((item) => item && item.id === state.activeWorkspaceId) || null;
    if (!workspace) return String(state.activeWorkspaceId || '');
    try { return (root.ObsLinkedNotes || {}).referenceObjectLocalStoreKey(workspace); } catch (error) { return String(state.activeWorkspaceId || ''); }
  }

  function detachModals(ui) {
    if (!ui || !ui.shadow) return [];
    const nodes = [];
    ui.shadow.querySelectorAll('[data-reference-object-modal]').forEach((node) => { node.remove(); nodes.push(node); });
    return nodes;
  }

  function restoreModals(ui, nodes) {
    if (!ui || !ui.shadow) return;
    const key = contextKey(ui);
    for (const node of nodes || []) if (String(node.__referenceObjectContextKey || '') === key) ui.shadow.appendChild(node);
  }

  function appendStyle(ui) {
    if (!ui.shadow || ui.shadow.querySelector('style[data-reference-object-style]')) return;
    const style = document.createElement('style');
    style.dataset.referenceObjectStyle = '1';
    style.textContent = `
      .reference-objects-menu { position:relative; display:inline-flex; }
      .reference-objects-menu > summary { cursor:pointer; display:inline-flex; align-items:center; min-height:34px; padding:6px 10px; border:1px solid var(--border); border-radius:7px; background:var(--surface); list-style:none; }
      .reference-objects-menu > summary::-webkit-details-marker { display:none; }
      .reference-objects-panel { position:absolute; z-index:2147483646; top:calc(100% + 6px); right:0; width:min(680px,86vw); max-height:min(620px,74vh); overflow:auto; display:grid; gap:8px; padding:10px; border:1px solid var(--border); border-radius:9px; background:var(--surface-2); box-shadow:0 14px 38px rgba(0,0,0,.58); }
      .reference-object-top-actions, .reference-object-actions { display:flex; gap:6px; flex-wrap:wrap; align-items:center; }
      .reference-object-search { width:100%; }
      .reference-object-list { display:grid; gap:7px; }
      .reference-object-row { border:1px solid var(--border); border-radius:8px; padding:8px; display:grid; gap:6px; }
      .reference-object-row small { color:var(--muted); overflow-wrap:anywhere; }
      .reference-object-uses { border-top:1px solid var(--border); padding-top:5px; }
      .reference-object-use-list { display:grid; gap:4px; margin-top:5px; }
      .reference-object-use { width:100%; display:grid; grid-template-columns:auto minmax(0,1fr); gap:8px; text-align:left; align-items:start; }
      .reference-object-use.stale { background:rgba(220,174,60,.22); border-color:rgba(240,195,72,.65); }
      .reference-object-use.current { border-color:rgba(90,190,120,.5); }
      .reference-object-diagnostics { display:grid; gap:4px; max-height:180px; overflow:auto; }
      .reference-object-diagnostic { padding:5px 6px; border:1px solid var(--border); border-radius:6px; }
      .reference-object-modal-backdrop { position:absolute; inset:0; z-index:2147483647; display:grid; place-items:center; padding:18px; background:rgba(0,0,0,.72); }
      .reference-object-modal { width:min(780px,calc(100% - 16px)); max-height:calc(100% - 16px); overflow:auto; display:grid; gap:10px; padding:14px; border:1px solid var(--border); border-radius:10px; background:var(--surface-2); }
      .reference-object-modal textarea { min-height:150px; resize:vertical; }
      .reference-object-candidates { display:grid; gap:6px; max-height:320px; overflow:auto; }
      .reference-object-candidate { text-align:left; display:grid; gap:3px; }
      .reference-object-candidate.active { outline:2px solid var(--accent); }
      .reference-object-candidate code { white-space:pre-wrap; overflow-wrap:anywhere; }
      .reference-object-highlight { background:rgba(255,218,92,.28); border-radius:3px; }
      .reference-focus-occurrence { background:rgba(255,218,92,.28); outline:1px solid rgba(255,218,92,.65); border-radius:3px; }
      .reference-object-local-badge { color:#ffd86a; }
    `;
    ui.shadow.appendChild(style);
  }

  function directHandler(ui, name, ...args) {
    const handler = ui && ui.handlers && ui.handlers[name];
    if (typeof handler !== 'function') return Promise.reject(new Error(`Reference Object handler unavailable: ${name}.`));
    try { return Promise.resolve(handler(...args)); } catch (error) { return Promise.reject(error); }
  }

  function candidateContextHtml(candidate) {
    if (candidate.multiline) return `<code>${escapeHtml(previewText(candidate.value, 300))}</code>`;
    const line = String(candidate.lineText || '');
    const start = Math.max(0, Number(candidate.lineMatchStart) || 0);
    const end = Math.max(start, Number(candidate.lineMatchEnd) || start);
    return `<code>${escapeHtml(line.slice(0, start))}<span class="reference-object-highlight">${escapeHtml(line.slice(start, end))}</span>${escapeHtml(line.slice(end))}</code>`;
  }

  function openCreateModal(ui) {
    if (!ui.shadow || ui.shadow.querySelector('[data-reference-object-modal="create"]')) return;
    const backdrop = document.createElement('div');
    backdrop.className = 'reference-object-modal-backdrop';
    backdrop.dataset.referenceObjectModal = 'create';
    backdrop.__referenceObjectContextKey = contextKey(ui);
    backdrop.innerHTML = `<section class="reference-object-modal"><h3>Create Reference Object</h3><div class="hint">Paste the exact value copied from the currently open file. Find is exact only; no fuzzy matching and no GitHub write.</div><textarea data-reference-exact-value placeholder="Paste exact text / number / Markdown block"></textarea><div class="reference-object-actions"><button data-reference-find>Find exact occurrences</button><button data-reference-close>Close</button></div><div class="hint" data-reference-find-status>Choose one exact occurrence after searching.</div><div class="reference-object-candidates" data-reference-candidates></div><label class="field"><span>Reference Object name</span><input data-reference-name placeholder="Base damage"></label><button class="primary" data-reference-create disabled>Create locally</button></section>`;
    ui.shadow.appendChild(backdrop);
    const status = backdrop.querySelector('[data-reference-find-status]');
    const list = backdrop.querySelector('[data-reference-candidates]');
    const create = backdrop.querySelector('[data-reference-create]');
    let selected = null;
    backdrop.querySelector('[data-reference-close]').addEventListener('click', () => backdrop.remove());
    backdrop.querySelector('[data-reference-find]').addEventListener('click', async () => {
      selected = null; create.disabled = true; list.innerHTML = ''; status.textContent = 'Finding exact occurrences…';
      try {
        const result = await directHandler(ui, 'onFindReferenceObjectCandidates', backdrop.querySelector('[data-reference-exact-value]').value);
        const candidates = result && result.candidates || [];
        status.textContent = candidates.length ? `${candidates.length} exact occurrence(s) found in ${result.path}. Choose one.` : 'No exact occurrence found. Nothing was changed.';
        list.innerHTML = candidates.map((candidate, index) => `<button class="reference-object-candidate" data-reference-candidate="${index}"><strong>Line ${candidate.line} · occurrence ${candidate.lineOccurrence}</strong>${candidateContextHtml(candidate)}</button>`).join('');
        list.querySelectorAll('[data-reference-candidate]').forEach((button) => button.addEventListener('click', () => {
          list.querySelectorAll('[data-reference-candidate]').forEach((item) => item.classList.remove('active'));
          button.classList.add('active'); selected = candidates[Number(button.dataset.referenceCandidate)]; create.disabled = !selected;
        }));
      } catch (error) { status.textContent = `Find failed: ${errorText(error)}`; }
    });
    create.addEventListener('click', async () => {
      if (!selected) return;
      const name = backdrop.querySelector('[data-reference-name]').value;
      try {
        await ui._call('onCreateReferenceObjectLocal', { name, candidate: selected });
        backdrop.remove();
      } catch (error) { status.textContent = `Create failed: ${errorText(error)}`; }
    });
  }

  function usageListHtml(object, check) {
    const uses = check && Array.isArray(check.uses) ? check.uses : (object.uses || []).map((use) => ({ ...use, status: 'unchecked', storedPreview: '', currentPreview: '' }));
    if (!uses.length) return '<div class="hint">No indexed uses.</div>';
    return uses.map((use, index) => `<button class="reference-object-use ${escapeHtml(use.status || 'unchecked')}" data-reference-use-index="${index}" data-reference-use-object="${escapeHtml(object.id)}"><strong>${use.status === 'stale' ? '⚠' : use.status === 'current' ? '✓' : '•'}</strong><span>${escapeHtml(use.path)} : ${escapeHtml(use.line)} · #${escapeHtml(use.lineOccurrence)}${use.status === 'stale' ? `<br><small>stored: ${escapeHtml(use.storedPreview || '')}<br>current: ${escapeHtml(use.currentPreview || '')}</small>` : ''}</span></button>`).join('');
  }

  function validationHtml(validation) {
    if (!validation) return '';
    const summary = validation.valid ? `✓ Tags valid · ${validation.counts.objects || 0} object(s) · ${validation.counts.uses || 0} use(s)` : `⚠ ${validation.diagnostics.length} validation issue(s)${validation.incomplete ? ' · incomplete scan' : ''}`;
    const rows = validation.diagnostics.slice(0, 80).map((item) => `<div class="reference-object-diagnostic"><strong>${escapeHtml(item.kind)}</strong>${item.objectId ? ` · ${escapeHtml(item.objectId)}` : ''}${item.path ? `<br><code>${escapeHtml(item.path)}</code>` : ''}${item.message ? `<br><small>${escapeHtml(item.message)}</small>` : ''}</div>`).join('');
    return `<details><summary>${summary}</summary><div class="reference-object-diagnostics">${rows || '<div class="hint">No issues.</div>'}</div></details>`;
  }

  function attachReferenceObjectsMenuPanel(ui, details, panel) {
    const api = root.ObsLinkedNotes || {};
    if (!panel || typeof api.portalFilesWorkspaceDropdownPanel !== 'function') return false;
    return api.portalFilesWorkspaceDropdownPanel(ui, details, panel, {
      key: 'reference-objects',
      maxWidth: 680,
      maxHeight: 620,
      onOpen: () => {
        if (!ui.state || ui.state.referenceObjectsLoaded) return undefined;
        return ui._call('onLoadReferenceObjects', false);
      }
    });
  }

  function renderReferenceObjectMenu(ui, details) {
    const state = ui.state || {};
    const objects = Array.isArray(state.referenceObjects) ? state.referenceObjects : [];
    const checks = state.referenceObjectChecks || {};
    const pending = Array.isArray(state.referenceObjectPendingFiles) ? state.referenceObjectPendingFiles : [];
    const rows = objects.map((object) => {
      const check = checks[object.id] || null;
      const stale = check ? check.staleCount : 0;
      return `<div class="reference-object-row" data-reference-object-row data-reference-search="${escapeHtml(`${object.name} ${object.id} ${object.definition && object.definition.path || ''}`.toLowerCase())}"><div><strong>${escapeHtml(object.name)}</strong> ${stale ? `<span class="reference-object-local-badge">· ${stale} stale</span>` : ''}<br><small>${escapeHtml(object.id)} · ${escapeHtml(object.definition && object.definition.path || '')}</small></div><div class="reference-object-actions"><button data-reference-copy="${escapeHtml(object.id)}">Copy reference</button><button data-reference-open-definition="${escapeHtml(object.id)}">Open definition</button><button data-reference-check="${escapeHtml(object.id)}">Check uses</button><button data-reference-update-local="${escapeHtml(object.id)}">Update locally</button><button data-reference-update-github="${escapeHtml(object.id)}">Update GitHub</button></div><details class="reference-object-uses"><summary>▸ Uses (${escapeHtml(check ? check.uses.length : (object.uses || []).length)})</summary><div class="reference-object-use-list">${usageListHtml(object, check)}</div></details><details><summary>Rename</summary><div class="reference-object-actions"><input data-reference-rename-input="${escapeHtml(object.id)}" value="${escapeHtml(object.name)}"><button data-reference-rename="${escapeHtml(object.id)}">Save locally</button></div></details></div>`;
    }).join('') || '<div class="hint">No Reference Objects loaded.</div>';
    details.innerHTML = `<summary>Reference objects ▾${pending.length ? ` · ${pending.length} local` : ''}</summary><div class="reference-objects-panel"><div class="reference-object-top-actions"><button data-reference-create>+ Create Reference Object</button><button data-reference-refresh>Refresh list</button><button data-reference-validate>Validate tags</button><button class="primary" data-reference-publish ${pending.length ? '' : 'disabled'}>Apply local changes to GitHub</button></div><small>Definitions File: <code>${escapeHtml(state.referenceObjectRegistryPath || '.linked-notes/reference-objects.json')}</code>. Copy reference writes only to clipboard; manual paste remains explicit.</small><input class="reference-object-search" data-reference-search placeholder="Search Reference Objects…" value="${escapeHtml(ui.__referenceObjectQuery || '')}">${validationHtml(state.referenceObjectValidation)}<div class="reference-object-list">${rows}</div></div>`;
    const panel = details.querySelector('.reference-objects-panel');
    const scope = panel || details;
    const search = scope.querySelector('[data-reference-search]');
    const applyFilter = () => {
      const query = String(search && search.value || '').trim().toLowerCase();
      ui.__referenceObjectQuery = query;
      scope.querySelectorAll('[data-reference-object-row]').forEach((row) => { row.hidden = Boolean(query && !String(row.dataset.referenceSearch || '').includes(query)); });
    };
    if (search) { search.addEventListener('input', applyFilter); applyFilter(); }
    scope.querySelector('[data-reference-create]')?.addEventListener('click', () => { const api = root.ObsLinkedNotes || {}; if (typeof api.closeFilesWorkspaceTopPopup === 'function') api.closeFilesWorkspaceTopPopup(ui); openCreateModal(ui); });
    scope.querySelector('[data-reference-refresh]')?.addEventListener('click', () => ui._call('onLoadReferenceObjects', true).catch(() => {}));
    scope.querySelector('[data-reference-validate]')?.addEventListener('click', () => ui._call('onValidateReferenceObjectTags').catch(() => {}));
    scope.querySelector('[data-reference-publish]')?.addEventListener('click', () => ui._call('onPublishReferenceObjectLocalDraftsGitHub').catch(() => {}));
    scope.querySelectorAll('[data-reference-copy]').forEach((button) => button.addEventListener('click', () => ui._call('onCopyReferenceObjectUse', button.dataset.referenceCopy).catch(() => {})));
    scope.querySelectorAll('[data-reference-open-definition]').forEach((button) => button.addEventListener('click', () => ui._call('onOpenReferenceObjectDefinition', button.dataset.referenceOpenDefinition).catch(() => {})));
    scope.querySelectorAll('[data-reference-check]').forEach((button) => button.addEventListener('click', () => ui._call('onCheckReferenceObjectUses', button.dataset.referenceCheck).catch(() => {})));
    scope.querySelectorAll('[data-reference-update-local]').forEach((button) => button.addEventListener('click', () => ui._call('onUpdateReferenceObjectUsesLocal', button.dataset.referenceUpdateLocal).catch(() => {})));
    scope.querySelectorAll('[data-reference-update-github]').forEach((button) => button.addEventListener('click', () => ui._call('onUpdateReferenceObjectUsesGitHub', button.dataset.referenceUpdateGithub).catch(() => {})));
    scope.querySelectorAll('[data-reference-rename]').forEach((button) => button.addEventListener('click', () => {
      const input = Array.from(scope.querySelectorAll('[data-reference-rename-input]')).find((node) => node.dataset.referenceRenameInput === button.dataset.referenceRename);
      ui._call('onRenameReferenceObjectLocal', button.dataset.referenceRename, input && input.value).catch(() => {});
    }));
    scope.querySelectorAll('[data-reference-use-index]').forEach((button) => button.addEventListener('click', () => {
      const object = objects.find((item) => item.id === button.dataset.referenceUseObject);
      if (!object) return;
      const check = checks[object.id];
      const uses = check && check.uses || object.uses || [];
      const use = uses[Number(button.dataset.referenceUseIndex)];
      if (use) ui._call('onOpenReferenceObjectUse', object.id, use).catch(() => {});
    }));
    return panel;
  }

  function enhanceReferenceObjectsMenu(ui) {
    if (!ui.shadow || typeof document === 'undefined') return;
    const host = ui.shadow.querySelector('.surface-tabs') || ui.shadow.querySelector('.editor-toolbar');
    if (!host || host.querySelector('[data-reference-objects-menu]')) return;
    const details = document.createElement('details');
    details.className = 'reference-objects-menu';
    details.dataset.referenceObjectsMenu = '1';
    details.open = false;
    const panel = renderReferenceObjectMenu(ui, details);
    host.appendChild(details);
    attachReferenceObjectsMenuPanel(ui, details, panel);
  }

  function enhanceLocalDraftSave(ui) {
    if (!ui.shadow || ui.state.surface !== 'files') return;
    const editor = ui.state.repositoryEditor || {};
    if (editor.mode !== 'edit') return;
    const actions = ui.shadow.querySelector('.repository-editor .repository-editor-actions');
    if (!actions || actions.querySelector('[data-reference-save-local]')) return;
    const button = document.createElement('button');
    button.dataset.referenceSaveLocal = '1';
    button.textContent = 'Save local draft';
    button.addEventListener('click', () => {
      const content = ui.shadow.querySelector('[data-role="repository-file-content"]');
      ui._call('onSaveRepositoryReferenceDraftLocal', { ...editor, content: content ? content.value : editor.content || '' }).catch(() => {});
    });
    actions.insertBefore(button, actions.firstChild);
  }

  function enhanceReferenceFocus(ui) {
    if (!ui.shadow || ui.state.surface !== 'files') return;
    const focus = ui.state.referenceObjectFocus;
    const preview = ui.state.repositoryPreview;
    if (!focus || !preview || focus.path !== preview.path || ui.state.fileViewMode === 'rendered') return;
    const pre = ui.shadow.querySelector('.file-preview pre');
    if (!pre) return;
    const text = pre.textContent || '';
    const occurrence = locateReferenceFocusOccurrence(root.ObsLinkedNotes || {}, text, focus);
    if (!occurrence) return;
    pre.innerHTML = `${escapeHtml(text.slice(0, occurrence.fullStart))}<span class="reference-focus-occurrence" data-reference-focus-occurrence>${escapeHtml(text.slice(occurrence.fullStart, occurrence.fullEnd))}</span>${escapeHtml(text.slice(occurrence.fullEnd))}`;
    const target = pre.querySelector('[data-reference-focus-occurrence]');
    if (target && typeof target.scrollIntoView === 'function') setTimeout(() => target.scrollIntoView({ block: 'center', inline: 'nearest' }), 0);
  }

  function patchUi(UI) {
    if (!UI || !UI.prototype || UI.prototype[UI_PATCH]) return false;
    Object.defineProperty(UI.prototype, UI_PATCH, { value: true, configurable: false, enumerable: false, writable: false });
    const originalRender = UI.prototype.render;
    UI.prototype.render = function referenceObjectsRender(...args) {
      const modals = detachModals(this);
      let result;
      try {
        result = originalRender.apply(this, args);
        if (!this.shadow || typeof document === 'undefined') return result;
        appendStyle(this);
        enhanceReferenceObjectsMenu(this);
        enhanceLocalDraftSave(this);
        enhanceReferenceFocus(this);
        return result;
      } finally {
        restoreModals(this, modals);
      }
    };
    return true;
  }

  function installRepositoryReferenceObjects(api = root.ObsLinkedNotes || {}) {
    if (!api || !api.LinkedNotesApp || !api.LinkedNotesUI) return false;
    const appPatched = patchApp(api.LinkedNotesApp);
    const uiPatched = patchUi(api.LinkedNotesUI);
    return appPatched || uiPatched;
  }

  return { installRepositoryReferenceObjects, locateReferenceFocusOccurrence, attachReferenceObjectsMenuPanel };
});
