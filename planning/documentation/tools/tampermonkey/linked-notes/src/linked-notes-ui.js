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

  function launcherRightOffset(width, edge = 18, gap = 10) {
    const measured = Number.isFinite(Number(width)) ? Math.max(0, Number(width)) : 0;
    return Math.ceil(edge + measured + gap);
  }

  function panelViewportLayout(viewportWidth, viewportHeight) {
    const width = Number.isFinite(Number(viewportWidth)) ? Math.max(0, Number(viewportWidth)) : 0;
    const height = Number.isFinite(Number(viewportHeight)) ? Math.max(0, Number(viewportHeight)) : 0;
    const edge = 12;
    const right = width >= 960
      ? Math.min(320, Math.max(220, Math.round(width * 0.2)))
      : edge;
    const bottom = height >= 520
      ? Math.min(144, Math.max(96, Math.round(height * 0.14)))
      : edge;
    return {
      edge,
      right,
      bottom,
      width: Math.max(240, Math.min(980, width - right - edge)),
      height: Math.max(240, Math.min(760, height - bottom - edge))
    };
  }

  function shouldCloseOnEscape(event, state) {
    return Boolean(event && event.key === 'Escape' && state && state.open && !state.busy);
  }

  function blankWorkspaceEditor(defaultBasePath = 'prototype-fixtures/linked-notes') {
    return { id: '', name: '', repositoryInput: '', branch: 'main', basePath: defaultBasePath, categoryBasePath: 'categories' };
  }

  function mergeWorkspaceEditorPatch(captured, dirty, patch = {}) {
    const nextPatch = { ...patch };
    if (captured && dirty && nextPatch.workspaceEditor && !nextPatch.replaceWorkspaceEditor) {
      nextPatch.workspaceEditor = captured;
    }
    return nextPatch;
  }

  class LinkedNotesUI {
    constructor(handlers = {}) {
      this.handlers = handlers;
      this.state = {
        notes: [],
        current: null,
        search: '',
        status: 'Ready.',
        workspaces: [],
        activeWorkspaceId: '',
        defaultWorkspaceId: '',
        workspaceEditor: blankWorkspaceEditor(),
        workspaceTargetLabel: '',
        chatContextLabel: 'New chat / default workspace',
        hasToken: false,
        remoteTargetMismatch: false,
        remoteTargetLabel: '',
        remoteRecoveryAvailable: false,
        remoteRefreshSummary: '',
        surface: 'notes',
        repositoryPath: '',
        repositoryEntries: [],
        repositoryBreadcrumbs: [{ label: '/', path: '' }],
        repositoryPreview: null,
        categories: [],
        selectedCategoryId: '',
        categoryEditor: { id: '', name: '', description: '', impliedCategoryIds: [], group: '' },
        categoryFiles: [],
        categoryErrors: [],
        categoryRefreshSummary: '',
        categoryRefreshedAt: '',
        busy: false
      };
      this.host = null;
      this.shadow = null;
      this.open = false;
      this.workspaceManagerOpen = false;
      this.workspaceEditorDirty = false;
      this._draftTimer = null;
      this._onViewportChange = () => this._positionPanel();
      this._onDocumentKeydown = (event) => {
        if (!shouldCloseOnEscape(event, { open: this.open, busy: this.state.busy })) return;
        event.preventDefault();
        event.stopPropagation();
        this.persistAllDraftsNow().then(() => {
          this.open = false;
          this.render();
        }).catch(() => {});
      };
    }

    mount() {
      if (this.host && this.host.isConnected) return;
      this.host = document.createElement('div');
      this.host.id = 'obs-linked-notes-prototype-host';
      this.host.style.all = 'initial';
      document.documentElement.appendChild(this.host);
      this.shadow = this.host.attachShadow({ mode: 'open' });
      document.addEventListener('keydown', this._onDocumentKeydown, true);
      if (typeof window !== 'undefined') {
        window.addEventListener('resize', this._onViewportChange, { passive: true });
        if (window.visualViewport) window.visualViewport.addEventListener('resize', this._onViewportChange, { passive: true });
      }
      this.render();
    }

    dispose() {
      this.persistAllDraftsNow().catch(() => {});
      document.removeEventListener('keydown', this._onDocumentKeydown, true);
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', this._onViewportChange);
        if (window.visualViewport) window.visualViewport.removeEventListener('resize', this._onViewportChange);
      }
      if (this.host) this.host.remove();
      this.host = null;
      this.shadow = null;
    }

    persistDraftNow() {
      return this._persistDraftNow();
    }

    workspaceDraftState() {
      return {
        editor: { ...(this.state.workspaceEditor || blankWorkspaceEditor()) },
        dirty: Boolean(this.workspaceEditorDirty)
      };
    }

    async persistAllDraftsNow() {
      this._captureWorkspaceIntoState();
      await this._persistDraftNow();
      return this.workspaceDraftState();
    }

    _captureDraftIntoState() {
      const draft = this._draftFromForm();
      if (draft) this.state.current = draft;
      return draft;
    }

    _workspaceFromForm() {
      if (!this.shadow) return this.state.workspaceEditor;
      const value = (name) => {
        const input = this.shadow.querySelector(`[data-workspace-field="${name}"]`);
        return input ? input.value.trim() : '';
      };
      return {
        id: value('id'),
        name: value('name'),
        repositoryInput: value('repositoryInput'),
        branch: value('branch') || 'main',
        basePath: value('basePath') || 'prototype-fixtures/linked-notes',
        categoryBasePath: value('categoryBasePath') || 'categories'
      };
    }

    _captureWorkspaceIntoState() {
      const editor = this._workspaceFromForm();
      if (editor) this.state.workspaceEditor = editor;
      return editor;
    }

    setState(patch) {
      const captured = this._captureDraftIntoState();
      const capturedWorkspace = this._captureWorkspaceIntoState();
      let nextPatch = { ...patch };
      if (captured && nextPatch.current && nextPatch.current.id === captured.id && !this.state.busy && !nextPatch.replaceCurrent) {
        nextPatch.current = { ...nextPatch.current, title: captured.title, body: captured.body };
      }
      nextPatch = mergeWorkspaceEditorPatch(capturedWorkspace, this.workspaceEditorDirty, nextPatch);
      if (nextPatch.replaceWorkspaceEditor) this.workspaceEditorDirty = false;
      delete nextPatch.replaceCurrent;
      delete nextPatch.replaceWorkspaceEditor;
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

    async _withAllDrafts(name, ...args) {
      await this.persistAllDraftsNow();
      return this._call(name, ...args);
    }

    _positionLauncher() {
      const launcher = this.shadow && this.shadow.querySelector('[data-action="toggle"]');
      if (!launcher) return;
      const apply = () => {
        const width = launcher.getBoundingClientRect ? launcher.getBoundingClientRect().width : launcher.offsetWidth;
        launcher.style.right = `${launcherRightOffset(width)}px`;
      };
      if (typeof requestAnimationFrame === 'function') requestAnimationFrame(apply);
      else apply();
    }

    _positionPanel() {
      const panel = this.shadow && this.shadow.querySelector('.panel');
      if (!panel || typeof window === 'undefined') return;
      const viewport = window.visualViewport || window;
      const layout = panelViewportLayout(viewport.width || window.innerWidth, viewport.height || window.innerHeight);
      panel.style.right = `${layout.right}px`;
      panel.style.bottom = `${layout.bottom}px`;
      panel.style.width = `${layout.width}px`;
      panel.style.height = `${layout.height}px`;
    }

    render() {
      if (!this.shadow) return;
      const current = this.state.current;
      const busy = Boolean(this.state.busy);
      const disabled = busy ? 'disabled' : '';
      const surface = this.state.surface || 'notes';
      const links = current && Array.isArray(current.links) ? current.links : [];
      const activeWorkspace = this.state.workspaces.find((workspace) => workspace.id === this.state.activeWorkspaceId) || null;
      const editor = this.state.workspaceEditor || blankWorkspaceEditor();
      const editorMatchesActive = Boolean(activeWorkspace && editor.id && editor.id === activeWorkspace.id);
      const workspaceOptions = this.state.workspaces.map((workspace) => {
        const suffix = workspace.id === this.state.defaultWorkspaceId ? ' · default' : '';
        return `<option value="${escapeHtml(workspace.id)}" ${workspace.id === this.state.activeWorkspaceId ? 'selected' : ''}>${escapeHtml(workspace.name || `${workspace.owner}/${workspace.repo}`)}${suffix}</option>`;
      }).join('');
      const notesHtml = this.state.notes.map((note) => `
        <button class="note-row ${current && current.id === note.id ? 'active' : ''}" data-note-id="${escapeHtml(note.id)}" ${disabled}>
          <strong>${escapeHtml(note.title || 'Untitled Note')}</strong>
          <span>${escapeHtml(note.state || 'local_draft')}</span>
        </button>`).join('') || '<div class="empty">No Notes yet.</div>';
      const repositoryEntriesHtml = (this.state.repositoryEntries || []).map((entry) => `
        <button class="note-row" data-repository-entry="${escapeHtml(entry.path)}" data-entry-type="${escapeHtml(entry.type)}" data-entry-size="${escapeHtml(entry.size || 0)}" data-entry-sha="${escapeHtml(entry.sha || '')}" data-entry-html-url="${escapeHtml(entry.htmlUrl || '')}" ${disabled}>
          <strong>${entry.type === 'dir' ? '📁 ' : '📄 '}${escapeHtml(entry.name || entry.path)}</strong>
          <span>${escapeHtml(entry.type)}${entry.type === 'file' ? ` · ${escapeHtml(entry.size || 0)} bytes` : ''}</span>
        </button>`).join('') || '<div class="empty">Press Browse root or select a folder.</div>';
      const categoriesHtml = (this.state.categories || []).map((category) => `
        <button class="note-row ${category.id === this.state.selectedCategoryId ? 'active' : ''}" data-category-id="${escapeHtml(category.id)}" ${disabled}>
          <strong>${escapeHtml(category.name)}</strong>
          <span>${escapeHtml(category.group ? `${category.group} · ` : '')}${category.explicitFileCount} explicit file(s)</span>
        </button>`).join('') || '<div class="empty">No category definitions cached.</div>';
      const sidebarBody = surface === 'notes' ? notesHtml : surface === 'files' ? repositoryEntriesHtml : categoriesHtml;
      const sidebarToolbar = surface === 'notes'
        ? `<input data-role="search" placeholder="Search Notes (Enter)" value="${escapeHtml(this.state.search)}" ${disabled}><button data-action="new" ${disabled}>New</button>`
        : surface === 'files'
          ? `<button data-action="browse-root" ${activeWorkspace && !busy ? '' : 'disabled'}>Browse root</button><button data-action="browse-up" ${this.state.repositoryPath && !busy ? '' : 'disabled'}>Up</button>`
          : `<button data-action="refresh-categories" ${activeWorkspace && this.state.hasToken && !busy ? '' : 'disabled'}>Refresh</button><button data-action="new-category" ${disabled}>New</button>`;
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
        ? `<div class="remote-context ${this.state.remoteTargetMismatch ? 'mismatch' : ''}"><strong>Bound remote:</strong> ${escapeHtml(this.state.remoteTargetLabel)}${this.state.remoteTargetMismatch ? '<br><span>The chat workspace points elsewhere. Regular Save GitHub is blocked.</span>' : ''}</div>`
        : '<div class="remote-context">No verified remote target yet.</div>';
      const remoteSummary = this.state.remoteRefreshSummary
        ? `<div class="remote-summary"><strong>Last GitHub refresh:</strong> ${escapeHtml(this.state.remoteRefreshSummary)}</div>`
        : '';
      const recoveryButtons = current && this.state.remoteRecoveryAvailable
        ? `<button data-action="recheck-remote" ${disabled}>Recheck remote</button>
           <button data-action="load-remote" ${disabled}>Load remote</button>
           <button class="danger" data-action="overwrite-remote" ${disabled}>Restore/overwrite bound remote</button>`
        : '';
      const preview = this.state.repositoryPreview;
      const breadcrumbs = (this.state.repositoryBreadcrumbs || []).map((item) => `<button data-browse-path="${escapeHtml(item.path)}" ${disabled}>${escapeHtml(item.label)}</button>`).join('<span>/</span>');
      const fileSurface = `
        <div class="editor-toolbar">
          <button data-action="browse-root" ${activeWorkspace && !busy ? '' : 'disabled'}>Browse root</button>
          <button data-action="browse-up" ${this.state.repositoryPath && !busy ? '' : 'disabled'}>Up</button>
          <button class="primary" data-action="open-file-github" ${preview && !busy ? '' : 'disabled'}>Open on GitHub</button>
          <button data-action="close" ${disabled}>Close</button>
        </div>
        <div class="file-context"><div class="breadcrumbs">${breadcrumbs || '<span>/</span>'}</div><div>${escapeHtml(this.state.repositoryPath || '/')}</div></div>
        ${preview ? `<section class="file-preview">
          <h3>${escapeHtml(preview.path)}</h3>
          <div class="hint">${escapeHtml(preview.kind)} · ${escapeHtml(preview.size || 0)} bytes · SHA ${escapeHtml(preview.sha || '')}</div>
          ${preview.kind === 'text' ? `<pre>${escapeHtml(preview.content || '')}</pre>` : `<div class="remote-context">${escapeHtml(preview.message || 'Preview unavailable. Open on GitHub.')}</div>`}
        </section>` : '<div class="empty">Select a file to view it here. Every selected file also has an Open on GitHub action.</div>'}`;
      const categoryEditor = this.state.categoryEditor || { id: '', name: '', description: '', impliedCategoryIds: [], group: '' };
      const categoryFilesHtml = (this.state.categoryFiles || []).map((file) => `<div class="category-file-row">
          <button data-category-file-open="${escapeHtml(file.path)}" ${disabled}>${escapeHtml(file.path)}</button>
          <span>${escapeHtml(file.membership)} · ${escapeHtml(file.validation || 'unchecked')}</span>
          ${file.membership === 'explicit' ? `<button data-category-file-remove="${escapeHtml(file.path)}" ${disabled}>Remove</button>` : ''}
          ${file.validationMessage ? `<small>${escapeHtml(file.validationMessage)}</small>` : ''}
        </div>`).join('') || '<div class="empty">No files in this category.</div>';
      const categoryErrorsHtml = (this.state.categoryErrors || []).map((error) => {
        const path = error && (error.path || error.targetPath) ? `<code>${escapeHtml(error.path || error.targetPath)}</code> · ` : '';
        const kind = error && error.kind ? `<strong>${escapeHtml(error.kind)}</strong>: ` : '';
        return `<div class="error-row">${path}${kind}${escapeHtml(error && (error.message || error.errorKind) || error)}</div>`;
      }).join('');
      const categorySurface = `
        <div class="editor-toolbar">
          <button data-action="refresh-categories" ${activeWorkspace && this.state.hasToken && !busy ? '' : 'disabled'}>Refresh categories</button>
          <button data-action="new-category" ${disabled}>New category</button>
          <button class="primary" data-action="save-category" ${activeWorkspace && !busy ? '' : 'disabled'}>Save category</button>
          <button data-action="close" ${disabled}>Close</button>
        </div>
        ${this.state.categoryRefreshSummary ? `<div class="remote-summary"><strong>Last category refresh:</strong> ${escapeHtml(this.state.categoryRefreshSummary)}</div>` : ''}
        <section class="category-editor">
          <div class="settings-grid">
            <label class="field"><span>Category id</span><input data-role="category-id" value="${escapeHtml(categoryEditor.id || '')}" placeholder="asp-net-core" ${categoryEditor.id ? 'readonly' : ''} ${disabled}></label>
            <label class="field"><span>Category name</span><input data-role="category-name" value="${escapeHtml(categoryEditor.name || '')}" placeholder="ASP.NET Core" ${disabled}></label>
            <label class="field wide"><span>Description</span><textarea data-role="category-description" placeholder="Literal Markdown category description" ${disabled}>${escapeHtml(categoryEditor.description || '')}</textarea></label>
            <label class="field"><span>Implicit categories</span><input data-role="category-implies" value="${escapeHtml((categoryEditor.impliedCategoryIds || []).join(', '))}" placeholder="programming, web" ${disabled}></label>
            <label class="field"><span>Local UX group</span><input data-role="category-group" value="${escapeHtml(categoryEditor.group || '')}" placeholder="Development technologies" ${disabled}></label>
          </div>
          <div class="category-actions">
            <button data-action="save-category-group" ${categoryEditor.id && !busy ? '' : 'disabled'}>Save local group</button>
            <button data-action="assign-preview-category" ${categoryEditor.id && preview && this.state.categoryAssignmentAllowed && !busy ? '' : 'disabled'}>Assign selected file</button>
            <span class="hint">Category definitions and file links are stored in GitHub. UX groups are local-only.</span>
          </div>
          <h3>Files</h3><div class="category-files">${categoryFilesHtml}</div>
          ${categoryErrorsHtml ? `<h3>Category model issues</h3><div class="category-errors">${categoryErrorsHtml}</div>` : ''}
        </section>`;
      const notesSurface = `
        <div class="editor-toolbar">
          <button class="primary" data-action="save-local" ${current && !busy ? '' : 'disabled'}>Save local</button>
          <button class="primary" data-action="save-remote" ${current && activeWorkspace && !busy ? '' : 'disabled'}>Save GitHub</button>
          <button data-action="copy-remote" ${current && activeWorkspace && this.state.remoteTargetMismatch && !busy ? '' : 'disabled'}>Copy to chat workspace</button>
          ${recoveryButtons}
          <button class="danger" data-action="delete" ${current && !busy ? '' : 'disabled'}>Delete local</button>
          <button data-action="close" ${disabled}>Close</button>
        </div>
        ${current ? `
          <input data-role="title" placeholder="Optional title" value="${escapeHtml(current.title || '')}" ${disabled}>
          <textarea data-role="body" placeholder="Markdown Note body" ${disabled}>${escapeHtml(current.body || '')}</textarea>
          ${remoteInfo}
          ${remoteSummary}
          <section><h3>Links</h3><div class="links">${linksHtml}</div>
            <div class="add-link">
              <select data-role="link-type" ${disabled}><option value="repository">Repository path</option><option value="note">Note ID</option><option value="url">Portable URL</option></select>
              <input data-role="link-target" placeholder="sibling.md, ../root.md or #explicit-anchor" ${disabled}>
              <input data-role="link-label" placeholder="Optional label" ${disabled}>
              <button data-action="add-link" ${disabled}>Add link</button>
            </div>
          </section>` : '<div class="empty">Create or select a Note.</div>'}`;
      const activeSurface = surface === 'files' ? fileSurface : surface === 'categories' ? categorySurface : notesSurface;

      this.shadow.innerHTML = `
        <style>
          :host { all: initial; --bg:#111318; --surface:#191c23; --surface-2:#20242d; --surface-3:#292e39; --border:#3b4250; --text:#eef1f6; --muted:#aab2c0; --accent:#8eb4ff; --success:#79d69a; --danger:#ff8d8d; }
          *, *::before, *::after { box-sizing: border-box; }
          button, input, textarea, select { font: 13px/1.35 system-ui, sans-serif; }
          .launcher { position: fixed; right: 102px; bottom: 18px; z-index: 2147483647; border: 1px solid #343a46; border-radius: 999px; padding: 10px 15px; background: #202123; color: #fff; box-shadow: 0 5px 18px rgba(0,0,0,.42); cursor: pointer; }
          .panel { position: fixed; right: 12px; bottom: 96px; z-index: 2147483647; width: min(980px, calc(100vw - 24px)); height: min(760px, calc(100dvh - 108px)); max-width: calc(100vw - 24px); max-height: calc(100dvh - 24px); min-width: 0; min-height: 0; display: ${this.open ? 'grid' : 'none'}; grid-template-columns: 260px minmax(0, 1fr); grid-template-rows: minmax(0, 1fr); background: var(--bg); color: var(--text); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; box-shadow: 0 14px 42px rgba(0,0,0,.55); font: 13px/1.4 system-ui, sans-serif; color-scheme: dark; }
          .sidebar { display: flex; flex-direction: column; min-width: 0; min-height: 0; overflow: hidden; background: var(--surface); border-right: 1px solid var(--border); }
          .toolbar, .editor-toolbar, .status, .workspace-bar, .surface-tabs { padding: 10px; border-bottom: 1px solid var(--border); }
          .toolbar { display: grid; grid-template-columns: 1fr auto; gap: 7px; }
          .workspace-bar { display: grid; grid-template-columns: minmax(180px, 260px) minmax(0, 1fr) auto auto; gap: 8px; align-items: center; background: var(--surface); }
          .surface-tabs { display: flex; gap: 7px; background: var(--surface-2); }
          .surface-tabs button.active { outline: 2px solid var(--accent); }
          .workspace-summary { color: var(--muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
          input, textarea, select { width: 100%; border: 1px solid var(--border); border-radius: 6px; padding: 7px; background: var(--surface-2); color: var(--text); }
          input::placeholder, textarea::placeholder { color: #7f8999; }
          button { border: 1px solid var(--border); border-radius: 6px; padding: 6px 9px; background: var(--surface-2); color: var(--text); cursor: pointer; }
          button:hover:not(:disabled) { background: var(--surface-3); }
          button.primary { background: #315b9d; color: #fff; border-color: #4a78bd; }
          button.danger { color: var(--danger); }
          button:disabled, input:disabled, textarea:disabled, select:disabled { opacity: .5; cursor: not-allowed; }
          .notes { flex: 1 1 0; min-height: 0; overflow-y: auto; overscroll-behavior: contain; scrollbar-gutter: stable; padding: 7px; }
          .note-row { width: 100%; display: flex; flex-direction: column; align-items: flex-start; margin-bottom: 6px; text-align: left; }
          .note-row span { color: var(--muted); font-size: 11px; }
          .note-row.active { outline: 2px solid var(--success); }
          .main { min-width: 0; min-height: 0; overflow: hidden; display: flex; flex-direction: column; }
          .editor-toolbar { display: flex; gap: 7px; flex-wrap: wrap; background: var(--surface); margin: -12px -12px 0; }
          .editor { flex: 1 1 0; display: grid; align-content: start; grid-template-rows: auto; min-height: 0; gap: 8px; padding: 12px 12px 72px; overflow-y: auto; overscroll-behavior: contain; scrollbar-gutter: stable; }
          textarea { min-height: 220px; resize: vertical; font-family: ui-monospace, SFMono-Regular, Consolas, monospace; }
          .links { display: grid; gap: 6px; }
          .link-row { display: grid; grid-template-columns: minmax(0,1fr) auto auto auto; gap: 6px; align-items: center; border: 1px solid var(--border); border-radius: 7px; padding: 6px; background: var(--surface); }
          .link-row small { grid-column: 1 / -1; color: var(--muted); }
          .link-open { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; text-align: left; }
          .link-status { font-size: 11px; padding: 2px 5px; border-radius: 4px; background: var(--surface-3); }
          .link-status.resolved { background: #173d2a; color: #a9efc0; }
          .link-status.unresolved, .link-status.invalid { background: #4a2323; color: #ffc1c1; }
          .add-link { display: grid; grid-template-columns: 120px 1fr 160px auto; gap: 6px; }
          details { border: 1px solid var(--border); border-radius: 7px; padding: 8px; background: var(--surface); }
          summary { cursor: pointer; color: var(--text); }
          .settings-grid { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 8px; margin-top: 9px; }
          .field { display: grid; gap: 4px; color: var(--muted); }
          .field.wide { grid-column: 1 / -1; }
          .workspace-actions, .token-actions, .category-actions { display: flex; gap: 7px; flex-wrap: wrap; align-items: center; }
          .target-preview, .file-context { border: 1px solid var(--border); border-radius: 6px; padding: 7px; color: var(--muted); word-break: break-word; background: var(--surface-2); }
          .remote-context { border: 1px solid var(--border); border-radius: 7px; padding: 7px; color: var(--muted); word-break: break-word; background: var(--surface); }
          .remote-context.mismatch { border-color: #9b5a5a; background: #351f22; color: #ffb8b8; }
          .remote-summary { border: 1px solid #365f83; border-radius: 7px; padding: 7px; color: #c7ddf3; word-break: break-word; background: #162636; }
          .status { margin-top: auto; background: var(--surface-2); color: var(--muted); word-break: break-word; }
          .empty, .hint { color: var(--muted); }
          .empty { padding: 8px; }
          h3 { margin: 0 0 7px; font: 600 15px/1.3 system-ui, sans-serif; }
          .hint { font-size: 12px; }
          .breadcrumbs { display: flex; flex-wrap: wrap; gap: 4px; align-items: center; margin-bottom: 6px; }
          .file-preview pre { white-space: pre-wrap; word-break: break-word; margin: 8px 0; padding: 10px; border: 1px solid var(--border); border-radius: 7px; background: #0e1014; max-height: 480px; overflow: auto; }
          .category-file-row { display: grid; grid-template-columns: minmax(0,1fr) auto auto; gap: 6px; margin-bottom: 6px; align-items: center; }
          .category-file-row button:first-child { text-align: left; overflow: hidden; text-overflow: ellipsis; }
          .category-file-row span { color: var(--muted); }
          .error-row { border: 1px solid #8b5050; background: #351f22; color: #ffb8b8; padding: 6px; border-radius: 6px; margin-bottom: 5px; }
          .workspace-manager-panel { margin-top: 10px; }
          @media (max-width: 700px) { .panel { grid-template-columns: minmax(0, 1fr); grid-template-rows: auto minmax(0, 1fr); } .sidebar { max-height: 190px; border-right: 0; border-bottom: 1px solid var(--border); } .add-link, .workspace-bar, .settings-grid { grid-template-columns: 1fr; } }
        </style>
        <button class="launcher" data-action="toggle" ${disabled}>Docs</button>
        <section class="panel" aria-label="Repository Documentation Workspace Prototype" aria-busy="${busy ? 'true' : 'false'}">
          <aside class="sidebar">
            <div class="toolbar">${sidebarToolbar}</div>
            <div class="notes">${sidebarBody}</div>
            <div class="status">${escapeHtml(this.state.status)}</div>
          </aside>
          <main class="main">
            <div class="workspace-bar">
              <select data-role="workspace-select" ${disabled}>${workspaceOptions || '<option value="">No saved workspace</option>'}</select>
              <div class="workspace-summary" title="${escapeHtml(this.state.workspaceTargetLabel)}">${escapeHtml(activeWorkspace ? `${this.state.chatContextLabel} · ${this.state.workspaceTargetLabel}` : 'Create a workspace before remote access.')}</div>
              <button data-action="refresh-github" ${activeWorkspace && this.state.hasToken && !busy ? '' : 'disabled'}>Refresh Notes</button>
              <button data-action="manage-workspaces" ${disabled}>Manage workspaces</button>
            </div>
            <div class="surface-tabs">
              <button data-surface="notes" class="${surface === 'notes' ? 'active' : ''}" ${disabled}>Notes</button>
              <button data-surface="files" class="${surface === 'files' ? 'active' : ''}" ${disabled}>Files</button>
              <button data-surface="categories" class="${surface === 'categories' ? 'active' : ''}" ${disabled}>Categories</button>
            </div>
            <div class="editor">${activeSurface}
              <details class="workspace-manager-panel" data-role="workspace-manager" ${this.workspaceManagerOpen ? 'open' : ''}>
                <summary>Manage GitHub workspaces</summary>
                <p class="hint">A workspace is a reusable repository, branch, Notes folder and Categories folder. Refresh Notes reads direct Markdown children from the Notes folder. Missing parent folders appear automatically with the first explicit Save GitHub; saving a workspace alone does not write remotely.</p>
                <div class="settings-grid">
                  <input type="hidden" data-workspace-field="id" value="${escapeHtml(editor.id || '')}">
                  <label class="field"><span>Workspace name</span><input data-workspace-field="name" placeholder="GDoc" value="${escapeHtml(editor.name || '')}" ${disabled}></label>
                  <label class="field"><span>Repository</span><input data-workspace-field="repositoryInput" placeholder="AlexPastukhh/gdoc or https://github.com/AlexPastukhh/gdoc" value="${escapeHtml(editor.repositoryInput || '')}" ${disabled}></label>
                  <label class="field"><span>Branch</span><input data-workspace-field="branch" placeholder="main" value="${escapeHtml(editor.branch || 'main')}" ${disabled}></label>
                  <label class="field"><span>Notes folder</span><input data-workspace-field="basePath" placeholder="prototype-fixtures/linked-notes" value="${escapeHtml(editor.basePath || 'prototype-fixtures/linked-notes')}" ${disabled}></label>
                  <label class="field"><span>Categories folder</span><input data-workspace-field="categoryBasePath" placeholder="categories" value="${escapeHtml(editor.categoryBasePath || 'categories')}" ${disabled}></label>
                  <div class="target-preview"><strong>Target:</strong> ${escapeHtml(this.state.workspaceTargetLabel || 'Complete the workspace fields and save.')}</div>
                  <div class="workspace-actions wide">
                    <button data-action="new-workspace" ${disabled}>New workspace</button>
                    <button class="primary" data-action="save-workspace" ${disabled}>Save workspace</button>
                    <button data-action="set-default-workspace" ${editorMatchesActive && activeWorkspace.id !== this.state.defaultWorkspaceId && !busy ? '' : 'disabled'}>Set as default</button>
                    <button class="danger" data-action="delete-workspace" ${editorMatchesActive && !busy ? '' : 'disabled'}>Delete workspace</button>
                  </div>
                  <label class="field wide"><span>Shared fine-grained GitHub token</span><input data-role="shared-token" type="password" placeholder="${this.state.hasToken ? 'Token stored — enter a value only to replace it' : 'Fine-grained token used by all workspaces'}" ${disabled}></label>
                  <div class="token-actions wide">
                    <button data-action="save-token" ${disabled}>Save shared token</button>
                    <button class="danger" data-action="clear-token" ${this.state.hasToken && !busy ? '' : 'disabled'}>Clear shared token</button>
                    <span class="hint">${this.state.hasToken ? 'A shared token is stored privately in Tampermonkey.' : 'No token is stored.'}</span>
                  </div>
                </div>
              </details>
            </div>
          </main>
        </section>`;

      this._positionLauncher();
      this._positionPanel();
      const details = this.shadow.querySelector('[data-role="workspace-manager"]');
      if (details) details.ontoggle = () => { this.workspaceManagerOpen = details.open; };
      const title = this.shadow.querySelector('[data-role="title"]');
      const body = this.shadow.querySelector('[data-role="body"]');
      if (title) title.oninput = () => this._scheduleDraftPersist();
      if (body) body.oninput = () => this._scheduleDraftPersist();
      this.shadow.querySelectorAll('[data-workspace-field]').forEach((input) => {
        input.oninput = () => { this.workspaceEditorDirty = true; this._captureWorkspaceIntoState(); };
      });

      const toggle = this.shadow.querySelector('[data-action="toggle"]');
      if (toggle) toggle.onclick = async () => { await this.persistAllDraftsNow(); if (!this.open) await this._call('onOpen'); this.open = !this.open; this.render(); };
      this.shadow.querySelectorAll('[data-action="close"]').forEach((close) => { close.onclick = async () => { await this.persistAllDraftsNow(); this.open = false; this.render(); }; });
      this.shadow.querySelectorAll('[data-surface]').forEach((button) => { button.onclick = () => this._withAllDrafts('onSetSurface', button.dataset.surface); });
      const create = this.shadow.querySelector('[data-action="new"]');
      if (create) create.onclick = () => this._withDraft('onNew');
      const search = this.shadow.querySelector('[data-role="search"]');
      if (search) search.onkeydown = (event) => { if (event.key === 'Enter') this._withDraft('onSearch', search.value); };
      this.shadow.querySelectorAll('[data-note-id]').forEach((button) => { button.onclick = () => this._withDraft('onSelect', button.dataset.noteId); });
      const workspaceSelect = this.shadow.querySelector('[data-role="workspace-select"]');
      if (workspaceSelect) workspaceSelect.onchange = () => this._withAllDrafts('onSelectWorkspace', workspaceSelect.value, this.workspaceDraftState());
      const refreshGitHub = this.shadow.querySelector('[data-action="refresh-github"]');
      if (refreshGitHub) refreshGitHub.onclick = () => this._withAllDrafts('onRefreshRemote');
      const manageWorkspaces = this.shadow.querySelector('[data-action="manage-workspaces"]');
      if (manageWorkspaces) manageWorkspaces.onclick = async () => { await this.persistAllDraftsNow(); this.workspaceManagerOpen = true; this.render(); const editorScroll = this.shadow.querySelector('.editor'); const manager = this.shadow.querySelector('[data-role="workspace-manager"]'); if (manager) { manager.open = true; if (editorScroll) editorScroll.scrollTop = Math.max(0, manager.offsetTop - 12); } };
      const newWorkspace = this.shadow.querySelector('[data-action="new-workspace"]');
      if (newWorkspace) newWorkspace.onclick = () => this._withAllDrafts('onNewWorkspace', this.workspaceDraftState());
      const saveWorkspace = this.shadow.querySelector('[data-action="save-workspace"]');
      if (saveWorkspace) saveWorkspace.onclick = () => this._withAllDrafts('onSaveWorkspace', this._workspaceFromForm());
      const setDefault = this.shadow.querySelector('[data-action="set-default-workspace"]');
      if (setDefault) setDefault.onclick = () => this._withAllDrafts('onSetDefaultWorkspace', this.state.activeWorkspaceId);
      const deleteWorkspace = this.shadow.querySelector('[data-action="delete-workspace"]');
      if (deleteWorkspace) deleteWorkspace.onclick = () => this._withAllDrafts('onDeleteWorkspace', this.state.activeWorkspaceId);
      const saveToken = this.shadow.querySelector('[data-action="save-token"]');
      if (saveToken) saveToken.onclick = async () => { await this.persistAllDraftsNow(); const token = this.shadow.querySelector('[data-role="shared-token"]'); return this._call('onSaveToken', token ? token.value : ''); };
      const clearToken = this.shadow.querySelector('[data-action="clear-token"]');
      if (clearToken) clearToken.onclick = () => this._withAllDrafts('onClearToken');
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
      if (add) add.onclick = () => { const type = this.shadow.querySelector('[data-role="link-type"]').value; const target = this.shadow.querySelector('[data-role="link-target"]').value.trim(); const label = this.shadow.querySelector('[data-role="link-label"]').value; this._call('onAddLink', this._draftFromForm(), { type, target, label }); };
      this.shadow.querySelectorAll('[data-remove-link]').forEach((button) => { button.onclick = () => this._call('onRemoveLink', this._draftFromForm(), button.dataset.removeLink); });
      this.shadow.querySelectorAll('[data-resolve-link]').forEach((button) => { button.onclick = () => this._call('onResolveLink', this._draftFromForm(), button.dataset.resolveLink); });
      this.shadow.querySelectorAll('[data-open-link]').forEach((button) => { button.onclick = () => this._withDraft('onOpenLink', button.dataset.openLink); });
      this.shadow.querySelectorAll('[data-action="browse-root"]').forEach((button) => { button.onclick = () => this._withAllDrafts('onBrowseRepository', ''); });
      this.shadow.querySelectorAll('[data-action="browse-up"]').forEach((button) => { button.onclick = () => { const path = String(this.state.repositoryPath || ''); const next = path.includes('/') ? path.slice(0, path.lastIndexOf('/')) : ''; return this._withAllDrafts('onBrowseRepository', next); }; });
      this.shadow.querySelectorAll('[data-browse-path]').forEach((button) => { button.onclick = () => this._withAllDrafts('onBrowseRepository', button.dataset.browsePath); });
      this.shadow.querySelectorAll('[data-repository-entry]').forEach((button) => { button.onclick = () => this._withAllDrafts('onOpenRepositoryEntry', {
        path: button.dataset.repositoryEntry,
        type: button.dataset.entryType,
        name: button.querySelector('strong') ? button.querySelector('strong').textContent.replace(/^[📁📄]\s*/, '').trim() : button.textContent.trim(),
        size: Number(button.dataset.entrySize || 0),
        sha: button.dataset.entrySha || '',
        htmlUrl: button.dataset.entryHtmlUrl || ''
      }); });
      const openGitHub = this.shadow.querySelector('[data-action="open-file-github"]');
      if (openGitHub) openGitHub.onclick = () => this._call('onOpenRepositoryFileInGitHub', preview && preview.path);
      this.shadow.querySelectorAll('[data-action="refresh-categories"]').forEach((button) => { button.onclick = () => this._withAllDrafts('onRefreshCategories'); });
      this.shadow.querySelectorAll('[data-action="new-category"]').forEach((button) => { button.onclick = () => this._call('onSelectCategory', ''); });
      this.shadow.querySelectorAll('[data-category-id]').forEach((button) => { button.onclick = () => this._call('onSelectCategory', button.dataset.categoryId); });
      const categoryFromForm = () => ({
        id: (this.shadow.querySelector('[data-role="category-id"]') || {}).value || '',
        name: (this.shadow.querySelector('[data-role="category-name"]') || {}).value || '',
        description: (this.shadow.querySelector('[data-role="category-description"]') || {}).value || '',
        impliedCategoryIds: (((this.shadow.querySelector('[data-role="category-implies"]') || {}).value || '').split(',').map((value) => value.trim()).filter(Boolean)),
        group: (this.shadow.querySelector('[data-role="category-group"]') || {}).value || ''
      });
      const saveCategory = this.shadow.querySelector('[data-action="save-category"]');
      if (saveCategory) saveCategory.onclick = () => this._call('onSaveCategory', categoryFromForm());
      const saveCategoryGroup = this.shadow.querySelector('[data-action="save-category-group"]');
      if (saveCategoryGroup) saveCategoryGroup.onclick = () => { const category = categoryFromForm(); return this._call('onSetCategoryGroup', category.id, category.group); };
      const assignPreview = this.shadow.querySelector('[data-action="assign-preview-category"]');
      if (assignPreview) assignPreview.onclick = () => this._call('onAssignCategory', categoryEditor.id, preview && preview.path);
      this.shadow.querySelectorAll('[data-category-file-open]').forEach((button) => { button.onclick = () => this._withAllDrafts('onOpenRepositoryEntry', { path: button.dataset.categoryFileOpen, type: 'file' }); });
      this.shadow.querySelectorAll('[data-category-file-remove]').forEach((button) => { button.onclick = () => this._call('onUnassignCategory', categoryEditor.id, button.dataset.categoryFileRemove); });
    }

  }

  return {
    LinkedNotesUI,
    escapeHtml,
    launcherRightOffset,
    panelViewportLayout,
    shouldCloseOnEscape,
    blankWorkspaceEditor,
    mergeWorkspaceEditorPatch
  };
});
