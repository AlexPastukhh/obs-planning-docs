(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  class LinkedNotesUI {
    constructor(handlers = {}) {
      this.handlers = handlers;
      this.state = {
        notes: [],
        current: null,
        search: '',
        status: 'Ready.',
        settings: { owner: '', repo: '', branch: 'main', basePath: 'prototype-fixtures/linked-notes', hasToken: false },
        remoteTargetMismatch: false,
        remoteTargetLabel: '',
        remoteRecoveryAvailable: false,
        busy: false
      };
      this.host = null;
      this.shadow = null;
      this.open = false;
      this._draftTimer = null;
    }

    mount() {
      if (this.host && this.host.isConnected) return;
      this.host = document.createElement('div');
      this.host.id = 'obs-linked-notes-prototype-host';
      this.host.style.all = 'initial';
      document.documentElement.appendChild(this.host);
      this.shadow = this.host.attachShadow({ mode: 'open' });
      this.render();
    }

    dispose() {
      this._persistDraftNow().catch(() => {});
      if (this.host) this.host.remove();
      this.host = null;
      this.shadow = null;
    }

    _captureDraftIntoState() {
      const draft = this._draftFromForm();
      if (draft) this.state.current = draft;
      return draft;
    }

    setState(patch) {
      const captured = this._captureDraftIntoState();
      const nextPatch = { ...patch };
      if (captured && nextPatch.current && nextPatch.current.id === captured.id && !this.state.busy && !nextPatch.replaceCurrent) {
        nextPatch.current = { ...nextPatch.current, title: captured.title, body: captured.body };
      }
      delete nextPatch.replaceCurrent;
      this.state = { ...this.state, ...nextPatch };
      this.render();
    }

    _draftFromForm() {
      if (!this.shadow || !this.state.current) return null;
      const title = this.shadow.querySelector('[data-role="title"]');
      const body = this.shadow.querySelector('[data-role="body"]');
      return {
        ...this.state.current,
        title: title ? title.value : this.state.current.title || '',
        body: body ? body.value : this.state.current.body || ''
      };
    }

    _settingsFromForm() {
      const value = (name) => {
        const input = this.shadow.querySelector(`[data-setting="${name}"]`);
        return input ? input.value.trim() : '';
      };
      return {
        owner: value('owner'),
        repo: value('repo'),
        branch: value('branch') || 'main',
        basePath: value('basePath') || 'prototype-fixtures/linked-notes',
        token: value('token')
      };
    }

    async _call(name, ...args) {
      const fn = this.handlers[name];
      if (typeof fn !== 'function') return undefined;
      try {
        return await fn(...args);
      } catch (error) {
        this.setState({ status: `Error: ${error.message || error}` });
        throw error;
      }
    }

    _scheduleDraftPersist() {
      const draft = this._captureDraftIntoState();
      if (!draft) return;
      if (this._draftTimer) clearTimeout(this._draftTimer);
      this._draftTimer = setTimeout(() => {
        this._draftTimer = null;
        this._call('onDraftChange', this.state.current).catch(() => {});
      }, 300);
    }

    async _persistDraftNow() {
      if (this._draftTimer) {
        clearTimeout(this._draftTimer);
        this._draftTimer = null;
      }
      const draft = this._captureDraftIntoState();
      if (draft) await this._call('onDraftChange', draft);
      return draft;
    }

    async _withDraft(name, ...args) {
      await this._persistDraftNow();
      return this._call(name, ...args);
    }

    render() {
      if (!this.shadow) return;
      const current = this.state.current;
      const busy = Boolean(this.state.busy);
      const disabled = busy ? 'disabled' : '';
      const links = current && Array.isArray(current.links) ? current.links : [];
      const notesHtml = this.state.notes.map((note) => `
        <button class="note-row ${current && current.id === note.id ? 'active' : ''}" data-note-id="${escapeHtml(note.id)}" ${disabled}>
          <strong>${escapeHtml(note.title || 'Untitled Note')}</strong>
          <span>${escapeHtml(note.state || 'local_draft')}</span>
        </button>`).join('') || '<div class="empty">No Notes yet.</div>';
      const linksHtml = links.map((link) => {
        const target = link.type === 'repository'
          ? `${link.target.path || ''}${link.target.anchor ? `#${link.target.anchor}` : ''}`
          : link.type === 'note' ? link.target.noteId || '' : link.target.url || '';
        return `<div class="link-row">
          <button class="link-open" data-open-link="${escapeHtml(link.id)}" title="Open target" ${disabled}>${escapeHtml(link.label || target || link.type)}</button>
          <span class="link-status ${escapeHtml(link.resolution || 'unchecked')}">${escapeHtml(link.resolution || 'unchecked')}</span>
          <button data-resolve-link="${escapeHtml(link.id)}" ${disabled}>Check</button>
          <button data-remove-link="${escapeHtml(link.id)}" ${disabled}>Remove</button>
          ${link.resolutionMessage ? `<small>${escapeHtml(link.resolutionMessage)}</small>` : ''}
        </div>`;
      }).join('') || '<div class="empty">No links.</div>';
      const remoteInfo = this.state.remoteTargetLabel
        ? `<div class="remote-context ${this.state.remoteTargetMismatch ? 'mismatch' : ''}"><strong>Bound remote:</strong> ${escapeHtml(this.state.remoteTargetLabel)}${this.state.remoteTargetMismatch ? '<br><span>Current settings point elsewhere. Regular Save GitHub is blocked.</span>' : ''}</div>`
        : '<div class="remote-context">No verified remote target yet.</div>';
      const recoveryButtons = current && this.state.remoteRecoveryAvailable
        ? `<button data-action="recheck-remote" ${disabled}>Recheck remote</button>
           <button data-action="load-remote" ${disabled}>Load remote</button>
           <button class="danger" data-action="overwrite-remote" ${disabled}>Restore/overwrite bound remote</button>`
        : '';

      this.shadow.innerHTML = `
        <style>
          :host { all: initial; }
          *, *::before, *::after { box-sizing: border-box; }
          button, input, textarea, select { font: 13px/1.35 system-ui, sans-serif; }
          .launcher { position: fixed; right: 18px; bottom: 18px; z-index: 2147483646; border: 0; border-radius: 999px; padding: 10px 15px; background: #202123; color: #fff; box-shadow: 0 5px 18px rgba(0,0,0,.28); cursor: pointer; }
          .panel { position: fixed; right: 18px; bottom: 66px; z-index: 2147483646; width: min(920px, calc(100vw - 36px)); height: min(720px, calc(100vh - 92px)); display: ${this.open ? 'grid' : 'none'}; grid-template-columns: 250px 1fr; background: #fff; color: #202123; border: 1px solid #c8c8c8; border-radius: 12px; overflow: hidden; box-shadow: 0 14px 42px rgba(0,0,0,.3); font: 13px/1.4 system-ui, sans-serif; }
          .sidebar { display: flex; flex-direction: column; min-width: 0; background: #f4f4f4; border-right: 1px solid #ddd; }
          .toolbar, .editor-toolbar, .status, .settings { padding: 10px; border-bottom: 1px solid #ddd; }
          .toolbar { display: grid; grid-template-columns: 1fr auto; gap: 7px; }
          .toolbar input, input, textarea, select { width: 100%; border: 1px solid #aaa; border-radius: 6px; padding: 7px; background: #fff; color: #111; }
          button { border: 1px solid #aaa; border-radius: 6px; padding: 6px 9px; background: #fff; color: #222; cursor: pointer; }
          button.primary { background: #202123; color: #fff; border-color: #202123; }
          button.danger { color: #a00; }
          button:disabled, input:disabled, textarea:disabled, select:disabled { opacity: .55; cursor: not-allowed; }
          .notes { overflow: auto; padding: 7px; }
          .note-row { width: 100%; display: flex; flex-direction: column; align-items: flex-start; margin-bottom: 6px; text-align: left; }
          .note-row span { color: #666; font-size: 11px; }
          .note-row.active { outline: 2px solid #5a7; }
          .main { min-width: 0; display: flex; flex-direction: column; }
          .editor-toolbar { display: flex; gap: 7px; flex-wrap: wrap; }
          .editor { display: grid; grid-template-rows: auto 1fr auto auto auto; min-height: 0; gap: 8px; padding: 12px; overflow: auto; }
          textarea { min-height: 220px; resize: vertical; font-family: ui-monospace, SFMono-Regular, Consolas, monospace; }
          .links { display: grid; gap: 6px; }
          .link-row { display: grid; grid-template-columns: minmax(0,1fr) auto auto auto; gap: 6px; align-items: center; border: 1px solid #ddd; border-radius: 7px; padding: 6px; }
          .link-row small { grid-column: 1 / -1; color: #555; }
          .link-open { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; text-align: left; }
          .link-status { font-size: 11px; padding: 2px 5px; border-radius: 4px; background: #eee; }
          .link-status.resolved { background: #dff5e4; }
          .link-status.unresolved, .link-status.invalid { background: #ffe1de; }
          .add-link { display: grid; grid-template-columns: 120px 1fr 160px auto; gap: 6px; }
          details { border: 1px solid #ddd; border-radius: 7px; padding: 6px; }
          .settings-grid { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 7px; margin-top: 7px; }
          .remote-context { border: 1px solid #ddd; border-radius: 7px; padding: 7px; color: #555; word-break: break-word; }
          .remote-context.mismatch { border-color: #c66; background: #fff0ee; color: #711; }
          .status { margin-top: auto; background: #fafafa; word-break: break-word; }
          .empty { color: #777; padding: 8px; }
          h3 { margin: 0 0 7px; font: 600 15px/1.3 system-ui, sans-serif; }
          @media (max-width: 680px) { .panel { grid-template-columns: 1fr; } .sidebar { max-height: 190px; border-right: 0; border-bottom: 1px solid #ddd; } .add-link { grid-template-columns: 1fr; } .settings-grid { grid-template-columns: 1fr; } }
        </style>
        <button class="launcher" data-action="toggle" ${disabled}>Notes</button>
        <section class="panel" aria-label="Linked Notes Prototype" aria-busy="${busy ? 'true' : 'false'}">
          <aside class="sidebar">
            <div class="toolbar"><input data-role="search" placeholder="Search Notes (Enter)" value="${escapeHtml(this.state.search)}" ${disabled}><button data-action="new" ${disabled}>New</button></div>
            <div class="notes">${notesHtml}</div>
            <div class="status">${escapeHtml(this.state.status)}</div>
          </aside>
          <main class="main">
            <div class="editor-toolbar">
              <button class="primary" data-action="save-local" ${current && !busy ? '' : 'disabled'}>Save local</button>
              <button class="primary" data-action="save-remote" ${current && !busy ? '' : 'disabled'}>Save GitHub</button>
              <button data-action="copy-remote" ${current && this.state.remoteTargetMismatch && !busy ? '' : 'disabled'}>Copy to current target</button>
              ${recoveryButtons}
              <button class="danger" data-action="delete" ${current && !busy ? '' : 'disabled'}>Delete local</button>
              <button data-action="close" ${disabled}>Close</button>
            </div>
            <div class="editor">
              ${current ? `
                <input data-role="title" placeholder="Optional title" value="${escapeHtml(current.title || '')}" ${disabled}>
                <textarea data-role="body" placeholder="Markdown Note body" ${disabled}>${escapeHtml(current.body || '')}</textarea>
                ${remoteInfo}
                <section><h3>Links</h3><div class="links">${linksHtml}</div>
                  <div class="add-link">
                    <select data-role="link-type" ${disabled}><option value="repository">Repository path</option><option value="note">Note ID</option><option value="url">Portable URL</option></select>
                    <input data-role="link-target" placeholder="sibling.md, ../root.md or #explicit-anchor" ${disabled}>
                    <input data-role="link-label" placeholder="Optional label" ${disabled}>
                    <button data-action="add-link" ${disabled}>Add link</button>
                  </div>
                </section>` : '<div class="empty">Create or select a Note.</div>'}
              <details>
                <summary>GitHub test settings</summary>
                <div class="settings-grid">
                  <input data-setting="owner" placeholder="owner" value="${escapeHtml(this.state.settings.owner || '')}" ${disabled}>
                  <input data-setting="repo" placeholder="repository" value="${escapeHtml(this.state.settings.repo || '')}" ${disabled}>
                  <input data-setting="branch" placeholder="test branch" value="${escapeHtml(this.state.settings.branch || 'main')}" ${disabled}>
                  <input data-setting="basePath" placeholder="prototype-fixtures/linked-notes" value="${escapeHtml(this.state.settings.basePath || '')}" ${disabled}>
                  <input data-setting="token" type="password" placeholder="Fine-grained token${this.state.settings.hasToken ? ' (stored)' : ''}" ${disabled}>
                  <button data-action="save-settings" ${disabled}>Save settings</button>
                </div>
              </details>
            </div>
          </main>
        </section>`;

      const title = this.shadow.querySelector('[data-role="title"]');
      const body = this.shadow.querySelector('[data-role="body"]');
      if (title) title.oninput = () => this._scheduleDraftPersist();
      if (body) body.oninput = () => this._scheduleDraftPersist();

      const toggle = this.shadow.querySelector('[data-action="toggle"]');
      if (toggle) toggle.onclick = async () => {
        await this._persistDraftNow();
        this.open = !this.open;
        this.render();
      };
      const close = this.shadow.querySelector('[data-action="close"]');
      if (close) close.onclick = async () => {
        await this._persistDraftNow();
        this.open = false;
        this.render();
      };
      const create = this.shadow.querySelector('[data-action="new"]');
      if (create) create.onclick = () => this._withDraft('onNew');
      const search = this.shadow.querySelector('[data-role="search"]');
      if (search) search.onkeydown = (event) => { if (event.key === 'Enter') this._withDraft('onSearch', search.value); };
      this.shadow.querySelectorAll('[data-note-id]').forEach((button) => {
        button.onclick = () => this._withDraft('onSelect', button.dataset.noteId);
      });
      const saveLocal = this.shadow.querySelector('[data-action="save-local"]');
      if (saveLocal) saveLocal.onclick = () => this._call('onSaveLocal', this._draftFromForm());
      const saveRemote = this.shadow.querySelector('[data-action="save-remote"]');
      if (saveRemote) saveRemote.onclick = () => this._call('onSaveRemote', this._draftFromForm());
      const copyRemote = this.shadow.querySelector('[data-action="copy-remote"]');
      if (copyRemote) copyRemote.onclick = () => this._call('onCopyRemote', this._draftFromForm());
      const recheckRemote = this.shadow.querySelector('[data-action="recheck-remote"]');
      if (recheckRemote) recheckRemote.onclick = () => this._call('onRecheckRemote', this._draftFromForm());
      const loadRemote = this.shadow.querySelector('[data-action="load-remote"]');
      if (loadRemote) loadRemote.onclick = () => this._call('onLoadRemote', this._draftFromForm());
      const overwriteRemote = this.shadow.querySelector('[data-action="overwrite-remote"]');
      if (overwriteRemote) overwriteRemote.onclick = () => this._call('onOverwriteRemote', this._draftFromForm());
      const remove = this.shadow.querySelector('[data-action="delete"]');
      if (remove) remove.onclick = () => this._call('onDelete', current && current.id);
      const add = this.shadow.querySelector('[data-action="add-link"]');
      if (add) add.onclick = () => {
        const type = this.shadow.querySelector('[data-role="link-type"]').value;
        const target = this.shadow.querySelector('[data-role="link-target"]').value.trim();
        const label = this.shadow.querySelector('[data-role="link-label"]').value;
        this._call('onAddLink', this._draftFromForm(), { type, target, label });
      };
      this.shadow.querySelectorAll('[data-remove-link]').forEach((button) => {
        button.onclick = () => this._call('onRemoveLink', this._draftFromForm(), button.dataset.removeLink);
      });
      this.shadow.querySelectorAll('[data-resolve-link]').forEach((button) => {
        button.onclick = () => this._call('onResolveLink', this._draftFromForm(), button.dataset.resolveLink);
      });
      this.shadow.querySelectorAll('[data-open-link]').forEach((button) => {
        button.onclick = () => this._withDraft('onOpenLink', button.dataset.openLink);
      });
      const saveSettings = this.shadow.querySelector('[data-action="save-settings"]');
      if (saveSettings) saveSettings.onclick = () => this._withDraft('onSaveSettings', this._settingsFromForm());
    }
  }

  return { LinkedNotesUI, escapeHtml };
});
