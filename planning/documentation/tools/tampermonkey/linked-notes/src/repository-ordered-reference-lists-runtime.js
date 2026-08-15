(function (root, factory) {
  const api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
  if (root.ObsLinkedNotes && root.ObsLinkedNotes.LinkedNotesApp && root.ObsLinkedNotes.LinkedNotesUI) {
    try { api.installRepositoryOrderedReferenceLists(root.ObsLinkedNotes); } catch (error) { /* bootstrap reports failures later */ }
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function (root) {
  'use strict';

  const APP_PATCH = '__obsOrderedReferenceListsAppV1';
  const UI_PATCH = '__obsOrderedReferenceListsUiV1';

  function apiOrThrow(app) {
    const api = app && app.api || root.ObsLinkedNotes || {};
    for (const name of ['parseReferenceMarkers', 'parseOrderedReferenceLists', 'createOrderedReferenceList', 'orderOrderedReferenceList', 'referenceObjectById']) if (typeof api[name] !== 'function') throw new Error(`Ordered Reference List runtime dependency is unavailable: ${name}.`);
    return api;
  }

  function escapeHtml(value) { return String(value == null ? '' : value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character])); }
  function errorText(error) { return String(error && error.message || error || 'Unknown error'); }

  function patchApp(App) {
    if (!App || !App.prototype || App.prototype[APP_PATCH]) return false;
    Object.defineProperty(App.prototype, APP_PATCH, { value: true });
    const originalStart = App.prototype.start;

    App.prototype._orderedCurrentText = function orderedCurrentText() {
      const preview = this.repositoryPreview;
      if (!preview || preview.kind !== 'text' || typeof preview.content !== 'string') throw new Error('Open a text file in the Files surface first.');
      return { path: preview.path, baseSha: String(preview.sha || ''), content: preview.content };
    };

    App.prototype.prepareOrderedReferenceList = async function prepareOrderedReferenceList() {
      const api = apiOrThrow(this);
      const current = this._orderedCurrentText();
      const parsed = api.parseReferenceMarkers(current.content);
      if (parsed.diagnostics.length) throw new Error('Repair malformed Reference Object markers in the open file first.');
      const uses = parsed.occurrences.filter((item) => item.role === 'use');
      if (!uses.length) throw new Error('The open file has no Reference Object uses.');
      const snapshot = await this._ensureReferenceRegistryLoaded();
      const objects = new Map(snapshot.registry.objects.map((object) => [object.id, object]));
      const checkById = new Map();
      for (const id of [...new Set(uses.map((use) => use.id))]) {
        try { checkById.set(id, await this.checkReferenceObjectUses(id)); }
        catch (error) { checkById.set(id, null); }
      }
      const prepared = uses.map((use) => {
        const check = checkById.get(use.id);
        const checked = check && check.uses.find((item) => item.path === current.path && item.line === use.line && item.lineOccurrence === use.lineOccurrence);
        return {
          fullStart: use.fullStart,
          id: use.id,
          name: objects.get(use.id) && objects.get(use.id).name || use.id,
          line: use.line,
          lineOccurrence: use.lineOccurrence,
          value: use.value,
          currentValue: check ? check.currentValue : '',
          freshness: checked ? checked.status : 'unresolved'
        };
      });
      this._setUi({ status: `Checked ${prepared.length} Reference Object use(s) in ${current.path}; stale uses remain selectable but will block ordering.` });
      return { path: current.path, uses: prepared };
    };

    App.prototype.createOrderedReferenceListLocal = async function createOrderedReferenceListLocal(input = {}) {
      const api = apiOrThrow(this);
      const current = this._orderedCurrentText();
      const result = api.createOrderedReferenceList({ content: current.content, selectedUses: input.selectedUses, mode: input.mode, locale: input.locale || 'und' });
      await this._stageRepositoryTextChange(current.path, current.baseSha, result.content, { source: 'ordered-reference-list', message: `Create Ordered Reference List ${result.listId} in ${current.path}`, silent: true });
      this.repositoryPreview = { ...this.repositoryPreview, content: result.content, size: new TextEncoder().encode(result.content).byteLength, localRepositoryChange: true };
      this.fileViewMode = 'source';
      this.fileRendered = null;
      try { await this._reindexReferenceObjectFileLocal(current.path, result.content); } catch (error) { /* validation remains explicit */ }
      this._setUi({ status: `Ordered Reference List ${result.listId} created locally with ${result.itemCount} item(s)${result.warnings.length ? `; ${result.warnings.length} stale/unresolved warning(s), ordering blocked until refreshed` : ''}.` });
      return result;
    };

    App.prototype.orderReferenceListLocal = async function orderReferenceListLocal(input = {}) {
      const api = apiOrThrow(this);
      const current = this._orderedCurrentText();
      const parsed = api.parseOrderedReferenceLists(current.content);
      const listId = String(input.listId || parsed.lists[0] && parsed.lists[0].id || '');
      if (!listId) throw new Error('The open file has no Ordered Reference List.');
      const items = parsed.items.filter((item) => item.listId === listId);
      const currentValues = new Map();
      for (const id of [...new Set(items.map((item) => item.refId))]) {
        const check = await this.checkReferenceObjectUses(id);
        if (!check || check.blocked || check.incomplete) throw new Error(`Reference Object ${id} could not be checked completely.`);
        currentValues.set(id, check.currentValue);
      }
      const result = api.orderOrderedReferenceList(current.content, listId, { currentValues, customOrder: input.customOrder || [] });
      if (!result.changed) { this._setUi({ status: `Ordered Reference List ${listId} is already in the requested order.` }); return result; }
      await this._stageRepositoryTextChange(current.path, current.baseSha, result.content, { source: 'ordered-reference-list', message: `Order ${listId} in ${current.path}`, silent: true });
      this.repositoryPreview = { ...this.repositoryPreview, content: result.content, size: new TextEncoder().encode(result.content).byteLength, localRepositoryChange: true };
      this.fileViewMode = 'source';
      this.fileRendered = null;
      try { await this._reindexReferenceObjectFileLocal(current.path, result.content); } catch (error) { /* validation remains explicit */ }
      this._setUi({ status: `Ordered Reference List ${listId} ordered locally by ${result.mode}. GitHub was not changed.` });
      return result;
    };

    App.prototype.start = async function orderedReferenceListsStart(...args) {
      if (this.ui && this.ui.handlers) Object.assign(this.ui.handlers, {
        onPrepareOrderedReferenceList: () => this.prepareOrderedReferenceList(),
        onCreateOrderedReferenceListLocal: (input) => this.createOrderedReferenceListLocal(input),
        onOrderReferenceListLocal: (input) => this.orderReferenceListLocal(input)
      });
      return originalStart.apply(this, args);
    };
    return true;
  }

  function modalShell(title) {
    const backdrop = document.createElement('div');
    backdrop.className = 'ordered-reference-modal-backdrop';
    backdrop.innerHTML = `<section class="ordered-reference-modal"><header><strong>${escapeHtml(title)}</strong><button data-close>×</button></header><div data-body></div><div class="hint" data-status></div></section>`;
    backdrop.querySelector('[data-close]').addEventListener('click', () => backdrop.remove());
    backdrop.addEventListener('click', (event) => { if (event.target === backdrop) backdrop.remove(); });
    document.body.appendChild(backdrop);
    return backdrop;
  }

  async function openCreateModal(ui) {
    const modal = modalShell('Create Ordered Reference List');
    const body = modal.querySelector('[data-body]');
    const status = modal.querySelector('[data-status]');
    status.textContent = 'Checking Reference Object uses for freshness…';
    try {
      const prepared = await ui._call('onPrepareOrderedReferenceList');
      body.innerHTML = `<label>Sort mode <select data-mode><option value="natural">Natural</option><option value="number">Number (leading number required)</option><option value="alphabetical">Alphabetical</option><option value="custom">Custom exact-value order</option></select></label><div class="ordered-reference-use-list">${prepared.uses.map((use, index) => `<label class="ordered-reference-use ${use.freshness !== 'current' ? 'stale' : ''}"><input type="checkbox" data-use="${index}"><span><strong>${escapeHtml(use.name)}</strong> · line ${use.line}${use.lineOccurrence > 1 ? ` #${use.lineOccurrence}` : ''}<br><small>${escapeHtml(use.value)} · ${escapeHtml(use.freshness)}</small></span><select data-unit="${index}"><option value="line">Line</option><option value="paragraph">Paragraph</option></select></label>`).join('')}</div><button class="primary" data-create>Create locally</button>`;
      status.textContent = 'Stale/unresolved uses may be wrapped, but the list cannot be ordered until they are current.';
      body.querySelector('[data-create]').addEventListener('click', async () => {
        const selectedUses = prepared.uses.flatMap((use, index) => body.querySelector(`[data-use="${index}"]`).checked ? [{ fullStart: use.fullStart, freshness: use.freshness, unit: body.querySelector(`[data-unit="${index}"]`).value }] : []);
        status.textContent = 'Creating local markers…';
        try { await ui._call('onCreateOrderedReferenceListLocal', { selectedUses, mode: body.querySelector('[data-mode]').value }); modal.remove(); }
        catch (error) { status.textContent = `Create failed: ${errorText(error)}`; }
      });
    } catch (error) { status.textContent = `Freshness check failed: ${errorText(error)}`; }
  }

  function openOrderModal(ui, parsed) {
    const modal = modalShell('Order locally');
    const body = modal.querySelector('[data-body]');
    const status = modal.querySelector('[data-status]');
    body.innerHTML = `<label>List <select data-list>${parsed.lists.map((list) => `<option value="${escapeHtml(list.id)}">${escapeHtml(`${list.id} · ${list.mode}`)}</option>`).join('')}</select></label><label>Custom order, one exact current value per line<textarea data-custom placeholder="Only used by custom mode"></textarea></label><button class="primary" data-order>Order locally</button>`;
    body.querySelector('[data-order]').addEventListener('click', async () => {
      status.textContent = 'Checking current Reference Object values and ordering…';
      try {
        await ui._call('onOrderReferenceListLocal', { listId: body.querySelector('[data-list]').value, customOrder: body.querySelector('[data-custom]').value.split(/\r?\n/).filter((line) => line.length) });
        modal.remove();
      } catch (error) { status.textContent = `Ordering blocked: ${errorText(error)}`; }
    });
  }

  function appendStyle(ui) {
    if (!ui.shadow || ui.shadow.querySelector('[data-ordered-reference-style]')) return;
    const css = `.ordered-reference-modal-backdrop{position:fixed;inset:0;z-index:2147483647;background:rgba(0,0,0,.58);display:grid;place-items:center;padding:20px}.ordered-reference-modal{width:min(760px,96vw);max-height:90vh;overflow:auto;background:#fff;color:#202124;border-radius:12px;padding:16px;box-shadow:0 18px 60px rgba(0,0,0,.4)}.ordered-reference-modal header{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}.ordered-reference-modal label{display:block;margin:10px 0}.ordered-reference-modal select,.ordered-reference-modal textarea{margin-left:8px}.ordered-reference-modal textarea{display:block;width:100%;min-height:90px;margin:6px 0}.ordered-reference-use{display:grid!important;grid-template-columns:auto 1fr auto;gap:10px;align-items:center;padding:8px;border:1px solid #ddd;border-radius:8px}.ordered-reference-use.stale{border-color:#c77a00;background:#fff7e6}.ordered-reference-use-list{display:grid;gap:7px;max-height:50vh;overflow:auto}`;
    const style = document.createElement('style');
    style.dataset.orderedReferenceStyle = '1';
    style.textContent = css;
    ui.shadow.appendChild(style);
    if (!document.getElementById('obs-ordered-reference-modal-style')) {
      const globalStyle = document.createElement('style');
      globalStyle.id = 'obs-ordered-reference-modal-style';
      globalStyle.textContent = css;
      document.head.appendChild(globalStyle);
    }
  }

  function enhanceUi(ui) {
    if (!ui.shadow || ui.state.surface !== 'files' || typeof document === 'undefined') return;
    appendStyle(ui);
    const preview = ui.state.repositoryPreview;
    if (!preview || preview.kind !== 'text' || typeof preview.content !== 'string') return;
    const toolbar = ui.shadow.querySelector('.editor .editor-toolbar') || ui.shadow.querySelector('.editor-toolbar');
    if (!toolbar || toolbar.querySelector('[data-create-ordered-reference-list]')) return;
    const create = document.createElement('button');
    create.dataset.createOrderedReferenceList = '1';
    create.textContent = 'Create Ordered List';
    create.disabled = Boolean(ui.state.busy);
    create.addEventListener('click', () => openCreateModal(ui));
    toolbar.appendChild(create);
    const parsed = (root.ObsLinkedNotes || {}).parseOrderedReferenceLists(preview.content);
    if (parsed.lists.length) {
      const order = document.createElement('button');
      order.dataset.orderReferenceList = '1';
      order.textContent = 'Order locally';
      order.disabled = Boolean(ui.state.busy);
      order.addEventListener('click', () => openOrderModal(ui, parsed));
      toolbar.appendChild(order);
    }
  }

  function patchUi(UI) {
    if (!UI || !UI.prototype || UI.prototype[UI_PATCH]) return false;
    Object.defineProperty(UI.prototype, UI_PATCH, { value: true });
    const originalRender = UI.prototype.render;
    UI.prototype.render = function orderedReferenceListsRender(...args) { const result = originalRender.apply(this, args); enhanceUi(this); return result; };
    return true;
  }

  function installRepositoryOrderedReferenceLists(api = root.ObsLinkedNotes || {}) {
    if (!api || !api.LinkedNotesApp || !api.LinkedNotesUI) return false;
    const app = patchApp(api.LinkedNotesApp);
    const ui = patchUi(api.LinkedNotesUI);
    return app || ui;
  }

  return { installRepositoryOrderedReferenceLists };
});
