(function (root, factory) {
  const api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
  if (root.ObsLinkedNotes && root.ObsLinkedNotes.LinkedNotesApp && root.ObsLinkedNotes.LinkedNotesUI) {
    try { api.installFullAppStateExport(root.ObsLinkedNotes); } catch (error) { /* bootstrap reports failures later */ }
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function (root) {
  'use strict';

  const APP_PATCH = '__obsFullAppStateExportAppV1';
  const UI_PATCH = '__obsFullAppStateExportUiV1';
  const SNAPSHOT_DB_NAMES = ['obsLinkedNotesPrototype', 'obsLinkedNotesPrototypeAssets'];
  const APP_INDEXED_DB_PREFIX = 'obsLinkedNotesPrototype';
  const UI_APP_BINDINGS = new WeakMap();
  const APP_SNAPSHOTS = new WeakMap();

  function apiOrThrow(app) {
    const api = app && app.api || root.ObsLinkedNotes || {};
    const required = ['isApplicationGmKey', 'createFullAppStateEnvelope', 'buildChatSafeFullAppState', 'formatFullAppStateForChat', 'sanitizeLiveControlRecord'];
    for (const name of required) if (typeof api[name] !== 'function') throw new Error(`Full App State export dependency is unavailable: ${name}.`);
    return api;
  }

  function errorText(error) { return String(error && error.message || error || 'Unknown error'); }

  async function listApplicationGmValues(app) {
    const api = apiOrThrow(app);
    if (typeof GM_listValues !== 'function') throw new Error('GM_listValues is unavailable. Reinstall the generated userscript with the full-state grant.');
    const allKeys = await Promise.resolve(GM_listValues());
    const keys = (Array.isArray(allKeys) ? allKeys : []).map(String).filter((key) => api.isApplicationGmKey(key)).sort();
    const values = {};
    for (const key of keys) values[key] = await app.getValue(key, null);
    return values;
  }

  async function existingIndexedDbNames(indexedDB) {
    if (!indexedDB || typeof indexedDB.open !== 'function') return { supported: false, names: [] };
    if (typeof indexedDB.databases !== 'function') return { supported: false, names: [] };
    const records = await indexedDB.databases();
    return { supported: true, names: (Array.isArray(records) ? records : []).map((item) => String(item && item.name || '')).filter(Boolean) };
  }

  async function openExistingDatabase(indexedDB, name, knownNames) {
    if (!knownNames.includes(name)) return null;
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(name);
      request.onerror = () => reject(request.error || new Error(`Unable to open IndexedDB ${name}.`));
      request.onsuccess = () => resolve(request.result);
      request.onupgradeneeded = () => {
        try { request.transaction.abort(); } catch (error) { /* best effort */ }
        reject(new Error(`Refusing to create or upgrade IndexedDB ${name} during read-only export.`));
      };
    });
  }

  async function dumpObjectStore(db, storeName) {
    return new Promise((resolve, reject) => {
      let tx;
      try { tx = db.transaction(storeName, 'readonly'); }
      catch (error) { reject(error); return; }
      const request = tx.objectStore(storeName).getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error || new Error(`Unable to read IndexedDB store ${storeName}.`));
      tx.onabort = () => reject(tx.error || new Error(`IndexedDB store ${storeName} read aborted.`));
    });
  }

  async function dumpIndexedDbState(indexedDB) {
    const inventory = await existingIndexedDbNames(indexedDB);
    if (!inventory.supported) {
      return {
        inventorySupported: false,
        databases: {},
        note: 'indexedDB.databases() is unavailable, so unopened databases were not opened because export must remain read-only.'
      };
    }
    const databases = {};
    const applicationNames = inventory.names.filter((name) => name.startsWith(APP_INDEXED_DB_PREFIX)).sort();
    const names = [...new Set([...SNAPSHOT_DB_NAMES, ...applicationNames])].sort();
    for (const name of names) {
      if (!inventory.names.includes(name)) {
        databases[name] = { present: false, stores: {} };
        continue;
      }
      const db = await openExistingDatabase(indexedDB, name, inventory.names);
      try {
        const stores = {};
        for (const storeName of Array.from(db.objectStoreNames || []).sort()) stores[storeName] = await dumpObjectStore(db, storeName);
        databases[name] = { present: true, version: Number(db.version) || 0, stores };
      } finally { if (db) db.close(); }
    }
    return { inventorySupported: true, discoveredApplicationDatabases: applicationNames, databases };
  }

  const APP_HANDLE_KEYS = ['api', 'store', 'pendingAssetStore', 'workspaceStore', 'categoryStore', 'ui', 'clientFactory', 'clipboardWriter', 'confirmAction', 'locationProvider', 'setIntervalFn', 'clearIntervalFn', 'routeTimer', 'feedbackActionHandlers', 'mediaLoaders'];
  const UI_HANDLE_KEYS = ['handlers', 'host', 'shadow', '_draftTimer', '_onViewportChange', '_onDocumentKeydown', '__fullAppStateApp'];

  function omittedHandleSummary(object, keys) {
    return keys.map((key) => {
      const value = object ? object[key] : undefined;
      return { key, present: value !== undefined && value !== null, valueType: value == null ? String(value) : value && value.constructor && value.constructor.name || typeof value };
    });
  }

  function ownState(object, exclude = []) {
    const skip = new Set(exclude);
    const output = {};
    for (const key of Object.keys(object || {}).sort()) if (!skip.has(key)) output[key] = object[key];
    return output;
  }

  function liveControlRecord(control, index) {
    const dataset = control && control.dataset || {};
    const record = {
      index,
      tag: String(control && control.tagName || '').toLowerCase(),
      type: String(control && control.type || ''),
      role: String(dataset.role || ''),
      action: String(dataset.action || ''),
      workspaceField: String(dataset.workspaceField || ''),
      name: String(control && control.name || ''),
      placeholder: String(control && control.placeholder || ''),
      value: control && 'value' in control ? String(control.value == null ? '' : control.value) : '',
      checked: Boolean(control && control.checked),
      disabled: Boolean(control && control.disabled)
    };
    if (control && control.multiple && control.options) record.selectedValues = Array.from(control.options).filter((option) => option.selected).map((option) => String(option.value));
    return record;
  }

  function captureStorageAdapterRuntime(app) {
    const store = app && app.store;
    const pending = app && app.pendingAssetStore;
    const workspace = app && app.workspaceStore;
    const category = app && app.categoryStore;
    return {
      notes: store ? { dbName: store.dbName || '', storeName: store.storeName || '', version: Number(store.version) || 0 } : null,
      pendingAssets: pending ? { dbName: pending.dbName || '', storeName: pending.storeName || '', version: Number(pending.version) || 0, memoryFallback: pending.memory instanceof Map ? pending.memory : null } : null,
      workspace: workspace ? { writerId: workspace.writerId || '', lockTtlMs: workspace.lockTtlMs, lockSettleMs: workspace.lockSettleMs, lockRetryMs: workspace.lockRetryMs, maxLockAttempts: workspace.maxLockAttempts } : null,
      categories: category ? { writerId: category.writerId || '', lockTtlMs: category.lockTtlMs, lockSettleMs: category.lockSettleMs, lockRetryMs: category.lockRetryMs, maxLockAttempts: category.maxLockAttempts } : null
    };
  }

  function captureUiRuntime(ui, api) {
    const controls = ui && ui.shadow && typeof ui.shadow.querySelectorAll === 'function'
      ? Array.from(ui.shadow.querySelectorAll('input, textarea, select')).map((control, index) => api.sanitizeLiveControlRecord(liveControlRecord(control, index)))
      : [];
    return {
      state: ui && ui.state || null,
      flags: ownState(ui, UI_HANDLE_KEYS),
      liveControls: controls,
      omittedImplementationHandles: omittedHandleSummary(ui, UI_HANDLE_KEYS)
    };
  }

  function captureAppRuntime(app) {
    return {
      state: ownState(app, APP_HANDLE_KEYS),
      omittedImplementationHandles: omittedHandleSummary(app, APP_HANDLE_KEYS)
    };
  }

  async function collectFullAppState(app) {
    const api = apiOrThrow(app);
    const collectorErrors = [];
    let gmValues = {};
    try { gmValues = await listApplicationGmValues(app); }
    catch (error) { collectorErrors.push({ source: 'gm', message: errorText(error) }); }
    let indexedDb = {};
    try { indexedDb = await dumpIndexedDbState(typeof indexedDB !== 'undefined' ? indexedDB : null); }
    catch (error) { collectorErrors.push({ source: 'indexedDb', message: errorText(error) }); indexedDb = { error: errorText(error) }; }
    return api.createFullAppStateEnvelope({
      generatedAt: new Date().toISOString(),
      gmValues,
      indexedDb,
      runtime: {
        app: captureAppRuntime(app),
        ui: captureUiRuntime(app.ui, api),
        storageAdapters: captureStorageAdapterRuntime(app)
      },
      collectorErrors,
      diagnosticNotes: [
        'Snapshot collection is local/read-only and does not perform GitHub reads or writes.',
        'DOM nodes, functions, timers, transports and other implementation handles are represented as omitted/non-serializable state rather than copied as executable values.'
      ]
    });
  }

  function copyText(app, text) {
    if (!app || typeof app.clipboardWriter !== 'function') return Promise.reject(new Error('Clipboard writer is unavailable.'));
    return app.clipboardWriter(String(text));
  }

  function patchApp(App) {
    if (!App || !App.prototype || App.prototype[APP_PATCH]) return false;
    Object.defineProperty(App.prototype, APP_PATCH, { value: true, configurable: false, enumerable: false, writable: false });
    const originalStart = App.prototype.start;
    App.prototype.buildFullAppStateSnapshot = async function buildFullAppStateSnapshot() {
      const snapshot = await collectFullAppState(this);
      APP_SNAPSHOTS.set(this, snapshot);
      return snapshot;
    };
    App.prototype.copyFullAppStateJson = async function copyFullAppStateJson() {
      const snapshot = await this.buildFullAppStateSnapshot();
      const text = JSON.stringify(snapshot, null, 2);
      await copyText(this, text);
      return { bytes: new TextEncoder().encode(text).byteLength, snapshot };
    };
    App.prototype.copyFullAppStateForChat = async function copyFullAppStateForChat() {
      const api = apiOrThrow(this);
      const snapshot = await this.buildFullAppStateSnapshot();
      const text = api.formatFullAppStateForChat(snapshot);
      await copyText(this, text);
      return { bytes: new TextEncoder().encode(text).byteLength, snapshot: api.buildChatSafeFullAppState(snapshot) };
    };
    if (typeof originalStart === 'function') {
      App.prototype.start = async function fullAppStateStart(...args) {
        const result = await originalStart.apply(this, args);
        if (this.ui) UI_APP_BINDINGS.set(this.ui, this);
        return result;
      };
    }
    return true;
  }

  function button(text, action) {
    const element = document.createElement('button');
    element.type = 'button';
    element.textContent = text;
    element.dataset.fullAppStateAction = action;
    return element;
  }

  function closeModal(ui) {
    const existing = ui && ui.shadow && ui.shadow.querySelector('[data-full-app-state-modal]');
    if (existing) existing.remove();
  }

  function renderSnapshotPreview(modal, snapshot) {
    const appGm = snapshot && snapshot.persistent && snapshot.persistent.gm || {};
    const dbs = snapshot && snapshot.persistent && snapshot.persistent.indexedDb && snapshot.persistent.indexedDb.databases || {};
    const notes = dbs.obsLinkedNotesPrototype && dbs.obsLinkedNotesPrototype.stores && dbs.obsLinkedNotesPrototype.stores.notes || [];
    const assets = dbs.obsLinkedNotesPrototypeAssets && dbs.obsLinkedNotesPrototypeAssets.stores && dbs.obsLinkedNotesPrototypeAssets.stores.assets || [];
    const raw = JSON.stringify(snapshot, null, 2);
    const preview = JSON.stringify((root.ObsLinkedNotes || {}).buildChatSafeFullAppState ? root.ObsLinkedNotes.buildChatSafeFullAppState(snapshot) : snapshot, null, 2);
    const summary = modal.querySelector('[data-full-app-state-summary]');
    if (summary) summary.textContent = `Snapshot ${snapshot.generatedAt || ''} · FULL ${new TextEncoder().encode(raw).byteLength} bytes · ${Array.isArray(appGm.keys) ? appGm.keys.length : 0} GM key(s) · ${Array.isArray(notes) ? notes.length : 0} Note(s) · ${Array.isArray(assets) ? assets.length : 0} asset(s)`;
    const pre = modal.querySelector('[data-full-app-state-preview]');
    if (pre) pre.textContent = preview;
  }

  async function refreshModal(ui, modal) {
    const app = UI_APP_BINDINGS.get(ui);
    if (!app) throw new Error('Full App State app binding is unavailable. Reopen Linked Notes.');
    const status = modal.querySelector('[data-full-app-state-status]');
    if (status) status.textContent = 'Collecting local state…';
    const snapshot = await app.buildFullAppStateSnapshot();
    renderSnapshotPreview(modal, snapshot);
    if (status) status.textContent = 'Ready. No GitHub request or local write was performed.';
    return snapshot;
  }

  function openModal(ui) {
    closeModal(ui);
    const modal = document.createElement('div');
    modal.dataset.fullAppStateModal = '1';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-label', 'Full App State');
    modal.innerHTML = `<div data-full-app-state-card><div data-full-app-state-head><strong>Full App State</strong><button data-full-app-state-action="close">Close</button></div><div class="hint" data-full-app-state-summary>Snapshot not collected yet.</div><div data-full-app-state-actions><button data-full-app-state-action="refresh">Refresh</button><button class="primary" data-full-app-state-action="copy-chat">Copy for ChatGPT</button><button data-full-app-state-action="copy-full">Copy FULL JSON</button></div><div class="hint" data-full-app-state-status>Local/read-only export. Authentication secrets are always redacted.</div><details open><summary>Chat-safe snapshot preview</summary><pre data-full-app-state-preview></pre></details></div>`;
    Object.assign(modal.style, { position: 'fixed', inset: '24px', zIndex: '2147483647', background: 'rgba(0,0,0,.38)', display: 'grid', placeItems: 'center' });
    const card = modal.querySelector('[data-full-app-state-card]');
    Object.assign(card.style, { width: 'min(1200px, calc(100vw - 64px))', height: 'min(860px, calc(100vh - 64px))', background: 'var(--panel, #fff)', color: 'var(--text, #111)', border: '1px solid var(--border, #bbb)', borderRadius: '12px', padding: '12px', display: 'grid', gridTemplateRows: 'auto auto auto auto minmax(0,1fr)', gap: '8px', boxShadow: '0 18px 50px rgba(0,0,0,.35)' });
    Object.assign(modal.querySelector('[data-full-app-state-head]').style, { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' });
    Object.assign(modal.querySelector('[data-full-app-state-actions]').style, { display: 'flex', flexWrap: 'wrap', gap: '8px' });
    const details = modal.querySelector('details');
    Object.assign(details.style, { minHeight: '0', overflow: 'auto' });
    const pre = modal.querySelector('[data-full-app-state-preview]');
    Object.assign(pre.style, { whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', fontSize: '12px' });
    modal.querySelector('[data-full-app-state-action="close"]').onclick = () => closeModal(ui);
    modal.querySelector('[data-full-app-state-action="refresh"]').onclick = () => refreshModal(ui, modal).catch((error) => { modal.querySelector('[data-full-app-state-status]').textContent = `Error: ${errorText(error)}`; });
    modal.querySelector('[data-full-app-state-action="copy-full"]').onclick = async () => {
      try { const app = UI_APP_BINDINGS.get(ui); if (!app) throw new Error('Full App State app binding is unavailable.'); const result = await app.copyFullAppStateJson(); modal.querySelector('[data-full-app-state-status]').textContent = `FULL JSON copied (${result.bytes} bytes). Credentials are redacted.`; renderSnapshotPreview(modal, APP_SNAPSHOTS.get(app) || result.snapshot); }
      catch (error) { modal.querySelector('[data-full-app-state-status]').textContent = `Copy failed: ${errorText(error)}`; }
    };
    modal.querySelector('[data-full-app-state-action="copy-chat"]').onclick = async () => {
      try { const app = UI_APP_BINDINGS.get(ui); if (!app) throw new Error('Full App State app binding is unavailable.'); const result = await app.copyFullAppStateForChat(); modal.querySelector('[data-full-app-state-status]').textContent = `ChatGPT copy copied (${result.bytes} bytes). Raw binary bytes omitted; credentials redacted.`; renderSnapshotPreview(modal, APP_SNAPSHOTS.get(app)); }
      catch (error) { modal.querySelector('[data-full-app-state-status]').textContent = `Copy failed: ${errorText(error)}`; }
    };
    ui.shadow.appendChild(modal);
    refreshModal(ui, modal).catch((error) => { modal.querySelector('[data-full-app-state-status]').textContent = `Error: ${errorText(error)}`; });
  }

  function enhanceUi(ui) {
    if (!ui || !ui.shadow || !ui.open) return;
    const bar = ui.shadow.querySelector('.workspace-bar');
    if (!bar || bar.querySelector('[data-full-app-state-action="open"]')) return;
    const open = button('App state', 'open');
    open.onclick = () => openModal(ui);
    bar.appendChild(open);
  }

  function patchUi(UI) {
    if (!UI || !UI.prototype || UI.prototype[UI_PATCH]) return false;
    Object.defineProperty(UI.prototype, UI_PATCH, { value: true, configurable: false, enumerable: false, writable: false });
    const originalRender = UI.prototype.render;
    UI.prototype.render = function fullAppStateRender(...args) {
      const result = originalRender.apply(this, args);
      try { enhanceUi(this); } catch (error) { /* state export must never break the primary UI */ }
      return result;
    };
    return true;
  }

  function installFullAppStateExport(namespace = root.ObsLinkedNotes || {}) {
    const appPatched = patchApp(namespace.LinkedNotesApp);
    const uiPatched = patchUi(namespace.LinkedNotesUI);
    return { appPatched, uiPatched };
  }

  return {
    SNAPSHOT_DB_NAMES,
    APP_INDEXED_DB_PREFIX,
    existingIndexedDbNames,
    dumpIndexedDbState,
    ownState,
    liveControlRecord,
    captureStorageAdapterRuntime,
    captureUiRuntime,
    captureAppRuntime,
    collectFullAppState,
    installFullAppStateExport
  };
});
