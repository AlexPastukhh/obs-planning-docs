(function (root, factory) {
  const api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
  if (root.ObsLinkedNotes && root.ObsLinkedNotes.LinkedNotesApp && root.ObsLinkedNotes.LinkedNotesUI) {
    try { api.installRepositoryReferenceStaleDiagnostics(root.ObsLinkedNotes); } catch (error) { /* bootstrap reports failures later */ }
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function (root) {
  'use strict';

  const APP_PATCH = '__obsReferenceStaleDiagnosticsAppV1';
  const UI_PATCH = '__obsReferenceStaleDiagnosticsUiV1';

  function patchApp(App) {
    if (!App || !App.prototype || App.prototype[APP_PATCH]) return false;
    Object.defineProperty(App.prototype, APP_PATCH, { value: true });
    const originalStart = App.prototype.start;
    const originalOpenRepositoryEntry = App.prototype.openRepositoryEntry;
    const originalUiState = App.prototype._workspaceUiState;

    App.prototype._referenceFreshnessUiState = function referenceFreshnessUiState() {
      const result = this.referenceFreshnessDiagnostics;
      const byPath = {};
      for (const file of result && result.files || []) byPath[file.path] = { stale: file.stale, unresolved: file.unresolved, current: file.current, dependencyCurrent: file.dependencyCurrent || 0, dependencyNeedsReview: file.dependencyNeedsReview || 0, dependencyUnresolved: file.dependencyUnresolved || 0 };
      const path = this.repositoryPreview && this.repositoryPreview.path || '';
      return {
        referenceFreshnessByPath: byPath,
        referenceCurrentFileFreshness: byPath[path] || null,
        referenceFreshnessIncomplete: Boolean(result && result.incomplete),
        referenceFreshnessChecked: Boolean(result),
        referenceStaleTotal: Number(result && result.staleCount || 0),
        referenceUnresolvedTotal: Number(result && result.unresolvedCount || 0),
        referenceDependencyNeedsReviewTotal: Number(result && result.dependencyNeedsReviewCount || 0),
        referenceDependencyUnresolvedTotal: Number(result && result.dependencyUnresolvedCount || 0)
      };
    };
    if (typeof originalUiState === 'function') App.prototype._workspaceUiState = function referenceFreshnessWorkspaceUiState(...args) { return { ...originalUiState.apply(this, args), ...this._referenceFreshnessUiState() }; };

    App.prototype.refreshReferenceFreshnessDiagnostics = async function refreshReferenceFreshnessDiagnostics(options = {}) {
      const api = this.api || root.ObsLinkedNotes || {};
      if (typeof api.diagnoseReferenceObjectFreshness !== 'function') throw new Error('Reference Object freshness diagnostic service is unavailable.');
      await this._ensureReferenceObjectLocalStateCurrent({ silent: true });
      const run = async () => api.diagnoseReferenceObjectFreshness({
        client: await this._referenceObjectsClient(),
        registryPath: this._referenceObjectRegistryPath(),
        overlays: typeof api.repositoryTextOverlays === 'function' ? api.repositoryTextOverlays(this.referenceObjectLocalState) : this.referenceObjectLocalState.files
      });
      const result = options.silent && typeof this._runFilesWorkspaceRead === 'function'
        ? await this._runFilesWorkspaceRead('Checking indexed Reference Object uses…', run)
        : await run();
      if (!result || result.cancelled) return result;
      this.referenceFreshnessDiagnostics = result;
      this._setUi({ status: `Indexed references checked: ${result.staleCount} stale and ${result.unresolvedCount} unresolved use(s); ${result.dependencyNeedsReviewCount || 0} dependent fragment(s) need review and ${result.dependencyUnresolvedCount || 0} are unresolved${result.incomplete ? '; scan incomplete' : ''}.` });
      return result;
    };

    if (typeof originalOpenRepositoryEntry === 'function') App.prototype.openRepositoryEntry = async function referenceFreshnessOpenEntry(...args) {
      const result = await originalOpenRepositoryEntry.apply(this, args);
      if (result && result.kind === 'text' && !this.referenceFreshnessDiagnostics) {
        try { await this.refreshReferenceFreshnessDiagnostics({ silent: true }); } catch (error) { /* explicit refresh remains available */ }
      }
      return result;
    };

    App.prototype.start = async function referenceFreshnessStart(...args) {
      if (this.ui && this.ui.handlers) this.ui.handlers.onRefreshReferenceFreshness = () => this.refreshReferenceFreshnessDiagnostics();
      return originalStart.apply(this, args);
    };
    return true;
  }

  function enhanceUi(ui) {
    if (!ui.shadow || ui.state.surface !== 'files' || typeof document === 'undefined') return;
    const byPath = ui.state.referenceFreshnessByPath || {};
    ui.shadow.querySelectorAll('[data-repository-entry]').forEach((button) => {
      const summary = byPath[button.dataset.repositoryEntry];
      if (!summary || (!summary.stale && !summary.unresolved && !summary.dependencyNeedsReview && !summary.dependencyUnresolved) || button.querySelector('[data-reference-stale-badge]')) return;
      const badge = document.createElement('span');
      badge.dataset.referenceStaleBadge = '1';
      badge.style.cssText = 'margin-left:6px;color:#b35b00;font-weight:700';
      badge.textContent = `⚠ ${[summary.stale ? `${summary.stale} stale use${summary.stale === 1 ? '' : 's'}` : '', summary.unresolved ? `${summary.unresolved} unresolved use${summary.unresolved === 1 ? '' : 's'}` : '', summary.dependencyNeedsReview ? `${summary.dependencyNeedsReview} review` : '', summary.dependencyUnresolved ? `${summary.dependencyUnresolved} dep unresolved` : ''].filter(Boolean).join(' · ')}`;
      button.appendChild(badge);
    });
    const toolbar = ui.shadow.querySelector('.editor .editor-toolbar') || ui.shadow.querySelector('.editor-toolbar');
    if (toolbar && !toolbar.querySelector('[data-refresh-reference-freshness]')) {
      const refresh = document.createElement('button');
      refresh.dataset.refreshReferenceFreshness = '1';
      refresh.textContent = ui.state.referenceFreshnessChecked ? `References (${Number(ui.state.referenceStaleTotal || 0)} stale · ${Number(ui.state.referenceDependencyNeedsReviewTotal || 0)} review)` : 'Check references';
      refresh.disabled = Boolean(ui.state.busy || !ui.state.hasToken);
      refresh.addEventListener('click', () => ui._call('onRefreshReferenceFreshness').catch(() => {}));
      toolbar.appendChild(refresh);
    }
    const current = ui.state.referenceCurrentFileFreshness;
    const preview = ui.shadow.querySelector('.file-preview');
    if (current && preview && (current.stale || current.unresolved || current.dependencyNeedsReview || current.dependencyUnresolved) && !preview.querySelector('[data-reference-current-warning]')) {
      const warning = document.createElement('div');
      warning.dataset.referenceCurrentWarning = '1';
      warning.className = 'remote-context mismatch';
      warning.textContent = `Reference Object warning: ${current.stale} stale / ${current.unresolved} unresolved use(s); ${current.dependencyNeedsReview || 0} dependent fragment(s) need semantic review / ${current.dependencyUnresolved || 0} unresolved. Stale uses may be synchronized explicitly; dependent fragment content is never auto-rewritten.`;
      preview.insertBefore(warning, preview.firstChild);
    }
  }

  function patchUi(UI) {
    if (!UI || !UI.prototype || UI.prototype[UI_PATCH]) return false;
    Object.defineProperty(UI.prototype, UI_PATCH, { value: true });
    const originalRender = UI.prototype.render;
    UI.prototype.render = function referenceFreshnessRender(...args) { const result = originalRender.apply(this, args); enhanceUi(this); return result; };
    return true;
  }

  function installRepositoryReferenceStaleDiagnostics(api = root.ObsLinkedNotes || {}) {
    if (!api || !api.LinkedNotesApp || !api.LinkedNotesUI) return false;
    const app = patchApp(api.LinkedNotesApp);
    const ui = patchUi(api.LinkedNotesUI);
    return app || ui;
  }

  return { installRepositoryReferenceStaleDiagnostics };
});
