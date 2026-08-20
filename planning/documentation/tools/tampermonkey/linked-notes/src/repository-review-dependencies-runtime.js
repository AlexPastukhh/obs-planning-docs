(function (root, factory) {
  const api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
  if (root.ObsLinkedNotes && root.ObsLinkedNotes.LinkedNotesApp && root.ObsLinkedNotes.LinkedNotesUI) {
    try { api.installRepositoryReviewDependencies(root.ObsLinkedNotes); } catch (error) { /* bootstrap reports failures later */ }
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function (root) {
  'use strict';

  const APP_PATCH = '__obsRepositoryReviewDependenciesAppV1';
  const UI_PATCH = '__obsRepositoryReviewDependenciesUiV1';

  function apiOrThrow(app) {
    const api = app && app.api || root.ObsLinkedNotes || {};
    const required = [
      'createReviewDependencyId', 'decodeReviewDependencyRegistry', 'encodeReviewDependencyRegistry',
      'upsertReviewDependency', 'removeReviewDependency', 'reviewDependencyById',
      'diagnoseReviewDependencies', 'readReviewDependencyRegistrySnapshot',
      'addReviewDependencyRelationMarker', 'completeReviewDependencyMarker', 'removeReviewDependencyRelationMarker',
      'repositoryTextOverlays', 'repositoryLocalChangeMap', 'normalizeRepositoryLocalPath'
    ];
    for (const name of required) if (typeof api[name] !== 'function') throw new Error(`Review Dependency runtime dependency is unavailable: ${name}.`);
    return api;
  }

  function escapeHtml(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  }

  async function effectiveText(app, path) {
    const api = apiOrThrow(app);
    await app._ensureReferenceObjectLocalStateCurrent({ silent: true });
    const pending = api.repositoryLocalChangeMap(app.referenceObjectLocalState).get(path);
    if (pending && pending.payloadKind === 'text') return { path, sha: pending.baseSha, content: pending.content, local: true };
    const client = await app._client(app._activeWorkspace());
    const file = await (client.read ? client.read(path) : client.readBytes(path));
    if (file.bytes) return { path, sha: String(file.sha || ''), content: new TextDecoder('utf-8', { fatal: true }).decode(file.bytes), local: false };
    return { path, sha: String(file.sha || ''), content: String(file.content == null ? '' : file.content), local: false };
  }

  function patchApp(App) {
    if (!App || !App.prototype || App.prototype[APP_PATCH]) return false;
    Object.defineProperty(App.prototype, APP_PATCH, { value: true });
    const originalStart = App.prototype.start;
    const originalUiState = App.prototype._workspaceUiState;
    const originalSelectWorkspace = App.prototype.selectWorkspace;
    const originalOpenRepositoryEntry = App.prototype.openRepositoryEntry;
    const originalStageRepositoryChange = App.prototype._stageRepositoryChange;

    App.prototype._reviewDependencyRegistryPath = function reviewDependencyRegistryPath() {
      return (this.api || root.ObsLinkedNotes || {}).DEFAULT_REVIEW_DEPENDENCY_REGISTRY_PATH || '.linked-notes/review-dependencies.json';
    };

    App.prototype._reviewDependencyUiState = function reviewDependencyUiState() {
      const result = this.reviewDependencyDiagnostics;
      const byPath = {};
      for (const file of result && result.files || []) byPath[file.path] = { current: file.current, needsReview: file.needsReview, unresolved: file.unresolved, relations: file.relations };
      const currentPath = this.repositoryPreview && this.repositoryPreview.path || '';
      return {
        reviewDependencies: result && result.relations || [],
        reviewDependenciesLoaded: Boolean(result),
        reviewDependencyRegistryPath: this._reviewDependencyRegistryPath(),
        reviewDependencyByPath: byPath,
        reviewDependencyCurrentFile: byPath[currentPath] || null,
        reviewDependencyNeedsReviewCount: Number(result && result.needsReviewCount || 0),
        reviewDependencyUnresolvedCount: Number(result && result.unresolvedCount || 0)
      };
    };

    if (typeof originalUiState === 'function') App.prototype._workspaceUiState = function reviewDependencyWorkspaceUiState(...args) {
      return { ...originalUiState.apply(this, args), ...this._reviewDependencyUiState() };
    };

    App.prototype.refreshReviewDependencies = async function refreshReviewDependencies(options = {}) {
      const api = apiOrThrow(this);
      await this._ensureReferenceObjectLocalStateCurrent({ silent: true });
      const run = async () => api.diagnoseReviewDependencies({
        client: await this._client(this._activeWorkspace()),
        registryPath: this._reviewDependencyRegistryPath(),
        overlays: api.repositoryTextOverlays(this.referenceObjectLocalState)
      });
      const result = options.silent && typeof this._runFilesWorkspaceRead === 'function'
        ? await this._runFilesWorkspaceRead('Checking Review Dependencies…', run)
        : await run();
      if (!result || result.cancelled) return result;
      this.reviewDependencyDiagnostics = result;
      this._setUi({ status: `Review Dependencies checked: ${result.needsReviewCount} need review, ${result.unresolvedCount} unresolved.` });
      return result;
    };

    App.prototype._loadReviewDependencyRegistry = async function loadReviewDependencyRegistry() {
      const api = apiOrThrow(this);
      await this._ensureReferenceObjectLocalStateCurrent({ silent: true });
      return api.readReviewDependencyRegistrySnapshot(
        await this._client(this._activeWorkspace()),
        this._reviewDependencyRegistryPath(),
        api.repositoryTextOverlays(this.referenceObjectLocalState)
      );
    };

    App.prototype.createReviewDependencyLocal = async function createReviewDependencyLocal(input = {}) {
      const api = apiOrThrow(this);
      const sourcePath = api.normalizeRepositoryLocalPath(input.sourcePath);
      const consumerPath = api.normalizeRepositoryLocalPath(input.consumerPath);
      const reason = String(input.reason == null ? '' : input.reason).trim() || 'Depends on this source file.';
      const reviewScope = String(input.reviewScope == null ? '' : input.reviewScope).trim();
      const id = input.id ? api.normalizeReviewDependencyId(input.id) : api.createReviewDependencyId();
      const registrySnapshot = await this._loadReviewDependencyRegistry();
      if (registrySnapshot.registry.dependencies.some((item) => item.sourcePath === sourcePath && item.consumerPath === consumerPath)) throw new Error(`Review Dependency already exists: ${sourcePath} → ${consumerPath}.`);
      await effectiveText(this, sourcePath);
      const consumer = await effectiveText(this, consumerPath);
      const registry = api.upsertReviewDependency(registrySnapshot.registry, { id, sourcePath, consumerPath, reason, reviewScope });
      const consumerContent = api.addReviewDependencyRelationMarker(consumer.content, id);
      await this._stageRepositoryTextChange(this._reviewDependencyRegistryPath(), registrySnapshot.sha, api.encodeReviewDependencyRegistry(registry), { source: 'review-dependency', allowLarger: true, silent: true, message: `Register Review Dependency ${id}` });
      await this._stageRepositoryTextChange(consumerPath, consumer.sha, consumerContent, { source: 'review-dependency', silent: true, message: `Add Review Dependency marker ${id}` });
      this.reviewDependencyDiagnostics = null;
      const result = await this.refreshReviewDependencies({ silent: true });
      this._setUi({ status: `Review Dependency ${id} created locally and requires review. GitHub was not changed.` });
      return { id, relation: api.reviewDependencyById(registry, id), diagnostics: result };
    };

    App.prototype.editReviewDependencyLocal = async function editReviewDependencyLocal(id, input = {}) {
      const api = apiOrThrow(this);
      const registrySnapshot = await this._loadReviewDependencyRegistry();
      const current = api.reviewDependencyById(registrySnapshot.registry, id);
      if (!current) throw new Error(`Review Dependency not found: ${id}.`);
      const next = api.upsertReviewDependency(registrySnapshot.registry, {
        ...current,
        reason: String(input.reason == null ? current.reason : input.reason).trim() || 'Depends on this source file.',
        reviewScope: String(input.reviewScope == null ? current.reviewScope || '' : input.reviewScope).trim()
      });
      await this._stageRepositoryTextChange(this._reviewDependencyRegistryPath(), registrySnapshot.sha, api.encodeReviewDependencyRegistry(next), { source: 'review-dependency', allowLarger: true, silent: true, message: `Edit Review Dependency ${id}` });
      this.reviewDependencyDiagnostics = null;
      await this.refreshReviewDependencies({ silent: true });
      this._setUi({ status: `Review Dependency ${id} metadata updated locally. Review acknowledgement was not changed.` });
      return api.reviewDependencyById(next, id);
    };

    App.prototype.removeReviewDependencyLocal = async function removeReviewDependencyLocal(id) {
      const api = apiOrThrow(this);
      const registrySnapshot = await this._loadReviewDependencyRegistry();
      const relation = api.reviewDependencyById(registrySnapshot.registry, id);
      if (!relation) throw new Error(`Review Dependency not found: ${id}.`);
      const consumer = await effectiveText(this, relation.consumerPath);
      const nextRegistry = api.removeReviewDependency(registrySnapshot.registry, id);
      const nextConsumer = api.removeReviewDependencyRelationMarker(consumer.content, id);
      await this._stageRepositoryTextChange(this._reviewDependencyRegistryPath(), registrySnapshot.sha, api.encodeReviewDependencyRegistry(nextRegistry), { source: 'review-dependency', allowLarger: true, silent: true, message: `Remove Review Dependency ${id}` });
      if (nextConsumer !== consumer.content) await this._stageRepositoryTextChange(relation.consumerPath, consumer.sha, nextConsumer, { source: 'review-dependency', silent: true, message: `Remove Review Dependency marker ${id}` });
      this.reviewDependencyDiagnostics = null;
      await this.refreshReviewDependencies({ silent: true });
      this._setUi({ status: `Review Dependency ${id} removed locally. GitHub was not changed.` });
      return relation;
    };

    App.prototype.completeReviewDependencyLocal = async function completeReviewDependencyLocal(id) {
      const api = apiOrThrow(this);
      const diagnostics = await this.refreshReviewDependencies({ silent: true });
      const relation = diagnostics.relations.find((item) => item.id === id);
      if (!relation) throw new Error(`Review Dependency not found: ${id}.`);
      if (!relation.currentFingerprint) throw new Error(`Current source fingerprint is unavailable for ${id}.`);
      const consumer = await effectiveText(this, relation.consumerPath);
      const content = api.completeReviewDependencyMarker(consumer.content, id, relation.currentFingerprint);
      await this._stageRepositoryTextChange(relation.consumerPath, consumer.sha, content, { source: 'review-dependency', silent: true, message: `Complete review for ${id}` });
      this.reviewDependencyDiagnostics = null;
      const result = await this.refreshReviewDependencies({ silent: true });
      this._setUi({ status: `Review Dependency ${id} marked complete against ${relation.currentFingerprint}${relation.sourceLocal ? ' (pending local source state)' : ''}.` });
      return result.relations.find((item) => item.id === id) || null;
    };

    App.prototype.openReviewDependencyPath = async function openReviewDependencyPath(path) {
      return this.openRepositoryEntry({ type: 'file', path, name: path.split('/').pop() });
    };


    if (typeof originalStageRepositoryChange === 'function') App.prototype._stageRepositoryChange = async function reviewDependencyStageRepositoryChange(...args) {
      const result = await originalStageRepositoryChange.apply(this, args);
      this.reviewDependencyDiagnostics = null;
      return result;
    };

    if (typeof originalOpenRepositoryEntry === 'function') App.prototype.openRepositoryEntry = async function reviewDependencyOpenRepositoryEntry(...args) {
      const result = await originalOpenRepositoryEntry.apply(this, args);
      if (result && result.kind === 'text' && !this.reviewDependencyDiagnostics) {
        try { await this.refreshReviewDependencies({ silent: true }); } catch (error) { /* explicit refresh remains available */ }
      }
      return result;
    };

    if (typeof originalSelectWorkspace === 'function') App.prototype.selectWorkspace = async function reviewDependencySelectWorkspace(...args) {
      const result = await originalSelectWorkspace.apply(this, args);
      this.reviewDependencyDiagnostics = null;
      return result;
    };

    App.prototype.start = async function reviewDependencyStart(...args) {
      if (this.ui && this.ui.handlers) {
        this.ui.handlers.onRefreshReviewDependencies = () => this.refreshReviewDependencies();
        this.ui.handlers.onCreateReviewDependencyLocal = (input) => this.createReviewDependencyLocal(input);
        this.ui.handlers.onEditReviewDependencyLocal = (id, input) => this.editReviewDependencyLocal(id, input);
        this.ui.handlers.onRemoveReviewDependencyLocal = (id) => this.removeReviewDependencyLocal(id);
        this.ui.handlers.onCompleteReviewDependencyLocal = (id) => this.completeReviewDependencyLocal(id);
        this.ui.handlers.onOpenReviewDependencyPath = (path) => this.openReviewDependencyPath(path);
      }
      return originalStart.apply(this, args);
    };
    return true;
  }

  function createFromPrompts(ui) {
    if (typeof window === 'undefined' || typeof window.prompt !== 'function') return;
    const current = ui.state.repositoryPreview && ui.state.repositoryPreview.path || '';
    const sourcePath = window.prompt('Source repository path', current);
    if (sourcePath == null) return;
    const consumerPath = window.prompt('Consumer repository path', '');
    if (consumerPath == null) return;
    const reason = window.prompt('Why does the consumer depend on the source?', 'Depends on this source file.');
    if (reason == null) return;
    const reviewScope = window.prompt('Optional review scope (what exactly should be checked)', '');
    if (reviewScope == null) return;
    ui._call('onCreateReviewDependencyLocal', { sourcePath, consumerPath, reason, reviewScope }).catch(() => {});
  }

  function editFromPrompts(ui, relation) {
    if (typeof window === 'undefined' || typeof window.prompt !== 'function') return;
    const reason = window.prompt('Dependency reason', relation.reason || 'Depends on this source file.');
    if (reason == null) return;
    const reviewScope = window.prompt('Optional review scope', relation.reviewScope || '');
    if (reviewScope == null) return;
    ui._call('onEditReviewDependencyLocal', relation.id, { reason, reviewScope }).catch(() => {});
  }

  function renderMenu(ui, details) {
    const state = ui.state || {};
    const relations = Array.isArray(state.reviewDependencies) ? state.reviewDependencies : [];
    const rows = relations.map((item) => {
      const badge = item.status === 'current' ? 'current' : item.status === 'needs-review' ? 'NEEDS REVIEW' : 'UNRESOLVED';
      const pending = item.sourceLocal ? ' · source pending local' : '';
      return `<div data-review-dependency-row="${escapeHtml(item.id)}" style="padding:8px 0;border-top:1px solid rgba(127,127,127,.25)"><strong>${escapeHtml(item.id)}</strong> · <b>${escapeHtml(badge)}</b>${escapeHtml(pending)}<br><small>${escapeHtml(item.sourcePath)} → ${escapeHtml(item.consumerPath)}</small><div style="margin-top:4px">${escapeHtml(item.reason)}</div>${item.reviewScope ? `<small>Review scope: ${escapeHtml(item.reviewScope)}</small>` : ''}<div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:6px"><button data-review-open-source="${escapeHtml(item.id)}">Open source</button><button data-review-open-consumer="${escapeHtml(item.id)}">Open consumer</button><button data-review-complete="${escapeHtml(item.id)}" ${item.status === 'unresolved' ? 'disabled' : ''}>Review complete</button><button data-review-edit="${escapeHtml(item.id)}">Edit</button><button data-review-remove="${escapeHtml(item.id)}">Remove</button></div></div>`;
    }).join('') || '<div class="hint">No Review Dependencies loaded.</div>';
    details.innerHTML = `<summary>Review dependencies ▾${state.reviewDependencyNeedsReviewCount ? ` · ${state.reviewDependencyNeedsReviewCount} need review` : ''}</summary><div style="padding:10px;min-width:520px;max-width:720px"><div style="display:flex;gap:6px;flex-wrap:wrap"><button data-review-create>+ Add dependency</button><button data-review-refresh>Refresh</button></div><small>Registry: <code>${escapeHtml(state.reviewDependencyRegistryPath || '.linked-notes/review-dependencies.json')}</code>. Completion records the current source SHA-256 in the consumer marker; it does not perform the semantic review automatically.</small>${rows}</div>`;
    details.querySelector('[data-review-create]')?.addEventListener('click', () => createFromPrompts(ui));
    details.querySelector('[data-review-refresh]')?.addEventListener('click', () => ui._call('onRefreshReviewDependencies').catch(() => {}));
    for (const button of details.querySelectorAll('[data-review-open-source]')) button.addEventListener('click', () => { const item = relations.find((row) => row.id === button.dataset.reviewOpenSource); if (item) ui._call('onOpenReviewDependencyPath', item.sourcePath).catch(() => {}); });
    for (const button of details.querySelectorAll('[data-review-open-consumer]')) button.addEventListener('click', () => { const item = relations.find((row) => row.id === button.dataset.reviewOpenConsumer); if (item) ui._call('onOpenReviewDependencyPath', item.consumerPath).catch(() => {}); });
    for (const button of details.querySelectorAll('[data-review-complete]')) button.addEventListener('click', () => ui._call('onCompleteReviewDependencyLocal', button.dataset.reviewComplete).catch(() => {}));
    for (const button of details.querySelectorAll('[data-review-edit]')) button.addEventListener('click', () => { const item = relations.find((row) => row.id === button.dataset.reviewEdit); if (item) editFromPrompts(ui, item); });
    for (const button of details.querySelectorAll('[data-review-remove]')) button.addEventListener('click', () => {
      const id = button.dataset.reviewRemove;
      if (typeof window === 'undefined' || typeof window.confirm !== 'function' || window.confirm(`Remove Review Dependency ${id}?`)) ui._call('onRemoveReviewDependencyLocal', id).catch(() => {});
    });
  }

  function enhanceMenu(ui) {
    if (!ui.shadow || typeof document === 'undefined') return;
    const host = ui.shadow.querySelector('.surface-tabs') || ui.shadow.querySelector('.editor-toolbar');
    if (!host) return;
    let details = host.querySelector('[data-review-dependencies-menu]');
    if (!details) {
      details = document.createElement('details');
      details.dataset.reviewDependenciesMenu = '1';
      details.addEventListener('toggle', () => {
        if (details.open && !ui.state.reviewDependenciesLoaded) ui._call('onRefreshReviewDependencies').catch(() => {});
      });
      host.appendChild(details);
    }
    renderMenu(ui, details);
  }

  function enhanceWarnings(ui) {
    if (!ui.shadow || ui.state.surface !== 'files') return;
    const byPath = ui.state.reviewDependencyByPath || {};
    ui.shadow.querySelectorAll('[data-repository-entry]').forEach((button) => {
      const summary = byPath[button.dataset.repositoryEntry];
      if (!summary || (!summary.needsReview && !summary.unresolved) || button.querySelector('[data-review-dependency-badge]')) return;
      const badge = document.createElement('span');
      badge.dataset.reviewDependencyBadge = '1';
      badge.style.cssText = 'margin-left:6px;color:#b35b00;font-weight:700';
      badge.textContent = `⚠ ${summary.needsReview ? `${summary.needsReview} review` : `${summary.unresolved} unresolved`}`;
      button.appendChild(badge);
    });
    const current = ui.state.reviewDependencyCurrentFile;
    const preview = ui.shadow.querySelector('.file-preview');
    if (current && preview && (current.needsReview || current.unresolved) && !preview.querySelector('[data-review-dependency-warning]')) {
      const warning = document.createElement('div');
      warning.dataset.reviewDependencyWarning = '1';
      warning.className = 'remote-context mismatch';
      warning.textContent = `Review Dependency warning: ${current.needsReview} relation(s) need review and ${current.unresolved} are unresolved for this file.`;
      preview.insertBefore(warning, preview.firstChild);
    }
  }

  function patchUi(UI) {
    if (!UI || !UI.prototype || UI.prototype[UI_PATCH]) return false;
    Object.defineProperty(UI.prototype, UI_PATCH, { value: true });
    const originalRender = UI.prototype.render;
    UI.prototype.render = function reviewDependencyRender(...args) {
      const result = originalRender.apply(this, args);
      if (this.shadow && typeof document !== 'undefined') {
        enhanceMenu(this);
        enhanceWarnings(this);
      }
      return result;
    };
    return true;
  }

  function installRepositoryReviewDependencies(api = root.ObsLinkedNotes || {}) {
    if (!api || !api.LinkedNotesApp || !api.LinkedNotesUI) return false;
    const app = patchApp(api.LinkedNotesApp);
    const ui = patchUi(api.LinkedNotesUI);
    return app || ui;
  }

  return { installRepositoryReviewDependencies };
});
