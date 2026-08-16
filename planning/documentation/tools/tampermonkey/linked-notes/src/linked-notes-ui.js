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
    const reservedRight = width >= 960
      ? Math.min(320, Math.max(220, Math.round(width * 0.2)))
      : edge;
    const reservedBottom = height >= 520
      ? Math.min(144, Math.max(96, Math.round(height * 0.14)))
      : edge;
    const panelWidth = Math.max(240, Math.min(980, width - reservedRight - edge));
    const panelHeight = Math.max(240, Math.min(760, height - reservedBottom - edge));
    return {
      edge,
      left: Math.max(edge, Math.round((width - panelWidth) / 2)),
      top: Math.max(edge, Math.round((height - panelHeight) / 2)),
      width: panelWidth,
      height: panelHeight
    };
  }

  function clampPanelPosition(left, top, panelWidth, panelHeight, viewportWidth, viewportHeight, edge = 12, viewportLeft = 0, viewportTop = 0) {
    const width = Number.isFinite(Number(viewportWidth)) ? Math.max(0, Number(viewportWidth)) : 0;
    const height = Number.isFinite(Number(viewportHeight)) ? Math.max(0, Number(viewportHeight)) : 0;
    const itemWidth = Number.isFinite(Number(panelWidth)) ? Math.max(0, Number(panelWidth)) : 0;
    const itemHeight = Number.isFinite(Number(panelHeight)) ? Math.max(0, Number(panelHeight)) : 0;
    const margin = Number.isFinite(Number(edge)) ? Math.max(0, Number(edge)) : 0;
    const originLeft = Number.isFinite(Number(viewportLeft)) ? Number(viewportLeft) : 0;
    const originTop = Number.isFinite(Number(viewportTop)) ? Number(viewportTop) : 0;
    const minLeft = originLeft + margin;
    const minTop = originTop + margin;
    const maxLeft = Math.max(minLeft, originLeft + width - margin - itemWidth);
    const maxTop = Math.max(minTop, originTop + height - margin - itemHeight);
    const requestedLeft = Number.isFinite(Number(left)) ? Number(left) : minLeft;
    const requestedTop = Number.isFinite(Number(top)) ? Number(top) : minTop;
    return {
      left: Math.round(Math.max(minLeft, Math.min(maxLeft, requestedLeft))),
      top: Math.round(Math.max(minTop, Math.min(maxTop, requestedTop)))
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

  function mergeCategoryEditorPatch(captured, dirty, patch = {}) {
    const nextPatch = { ...patch };
    if (captured && dirty && nextPatch.categoryEditor && !nextPatch.replaceCategoryEditor) {
      nextPatch.categoryEditor = {
        ...captured,
        selectedTargets: Array.isArray(nextPatch.categoryEditor.selectedTargets)
          ? nextPatch.categoryEditor.selectedTargets
          : (Array.isArray(captured.selectedTargets) ? captured.selectedTargets : [])
      };
    }
    return nextPatch;
  }

  function mergeRepositoryEditorPatch(captured, dirty, patch = {}) {
    const nextPatch = { ...patch };
    if (captured && dirty && nextPatch.repositoryEditor && !nextPatch.replaceFileEditor && nextPatch.repositoryEditor.mode !== 'none') {
      nextPatch.repositoryEditor = captured;
    }
    return nextPatch;
  }

  function mergeVisibleCategorySelection(previousIds, availableIds, checkedIds) {
    const normalize = (items) => {
      const result = [];
      const seen = new Set();
      for (const item of Array.isArray(items) ? items : []) {
        const id = String(item == null ? '' : item).trim();
        if (!id || seen.has(id)) continue;
        seen.add(id);
        result.push(id);
      }
      return result;
    };
    const previous = normalize(previousIds);
    const available = new Set(normalize(availableIds));
    const checked = normalize(checkedIds).filter((id) => available.has(id));
    return [...previous.filter((id) => !available.has(id)), ...checked];
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
        repositoryEditor: { mode: 'none', parentPath: '', path: '', name: '', content: '', baseSha: '' },
        fileCategoryIds: [],
        fileEditAllowed: false,
        fileCategoryAssignmentAllowed: false,
        categories: [],
        selectedCategoryId: '',
        categoryEditor: { id: '', name: '', description: '', impliedCategoryIds: [], group: '', selectedTargets: [] },
        categoryFiles: [],
        categoryNotes: [],
        noteCategoryIds: [],
        noteBacklinks: [],
        noteViewMode: 'edit',
        fileViewMode: 'rendered',
        noteRendered: null,
        fileRendered: null,
        pendingAssets: [],
        transferDraft: { targetPath: '', mode: 'create' },
        feedback: [],
        targetPicker: { open: false, mode: '', query: '', depth: '2', currentPath: '', entries: [], fileResults: [], noteResults: [], selected: [], truncated: false, summary: '' },
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
      this.categoryEditorDirty = false;
      this.fileEditorDirty = false;
      this.fileCategoryDirty = false;
      this._draftTimer = null;
      this.panelPlacement = { mode: 'center', left: 0, top: 0 };
      this._panelDrag = null;
      this._onPanelPointerMove = (event) => this._movePanelDrag(event);
      this._onPanelPointerEnd = (event) => this._endPanelDrag(event);
      this._onViewportChange = () => {
        if (typeof this.__closeFilesWorkspaceTopPopupForPanelMove === 'function') this.__closeFilesWorkspaceTopPopupForPanelMove();
        this._positionPanel();
      };
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
      document.addEventListener('pointermove', this._onPanelPointerMove, true);
      document.addEventListener('pointerup', this._onPanelPointerEnd, true);
      document.addEventListener('pointercancel', this._onPanelPointerEnd, true);
      if (typeof window !== 'undefined') {
        window.addEventListener('resize', this._onViewportChange, { passive: true });
        if (window.visualViewport) window.visualViewport.addEventListener('resize', this._onViewportChange, { passive: true });
      }
      this.render();
    }

    dispose() {
      this.persistAllDraftsNow().catch(() => {});
      document.removeEventListener('keydown', this._onDocumentKeydown, true);
      document.removeEventListener('pointermove', this._onPanelPointerMove, true);
      document.removeEventListener('pointerup', this._onPanelPointerEnd, true);
      document.removeEventListener('pointercancel', this._onPanelPointerEnd, true);
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
      this._captureCategoryIntoState();
      this._captureRepositoryEditorIntoState();
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

    _categoryFromForm() {
      if (!this.shadow) return this.state.categoryEditor;
      const value = (role) => {
        const input = this.shadow.querySelector(`[data-role="${role}"]`);
        return input ? input.value : '';
      };
      return {
        ...(this.state.categoryEditor || {}),
        id: value('category-id').trim(),
        name: value('category-name'),
        description: value('category-description'),
        impliedCategoryIds: value('category-implies').split(',').map((item) => item.trim()).filter(Boolean),
        group: value('category-group'),
        selectedTargets: Array.isArray(this.state.categoryEditor && this.state.categoryEditor.selectedTargets) ? [...this.state.categoryEditor.selectedTargets] : []
      };
    }

    _captureCategoryIntoState() {
      const editor = this._categoryFromForm();
      if (editor) this.state.categoryEditor = editor;
      return editor;
    }

    _repositoryEditorFromForm() {
      const editor = { ...(this.state.repositoryEditor || { mode: 'none', parentPath: '', path: '', name: '', content: '', baseSha: '' }) };
      if (!this.shadow || editor.mode === 'none') return editor;
      const name = this.shadow.querySelector('[data-role="repository-file-name"]');
      const content = this.shadow.querySelector('[data-role="repository-file-content"]');
      if (name) editor.name = name.value;
      if (content) editor.content = content.value;
      return editor;
    }

    _captureRepositoryEditorIntoState() {
      const editor = this._repositoryEditorFromForm();
      if (editor) this.state.repositoryEditor = editor;
      return editor;
    }

    _feedbackForSurface(surface) {
      return (Array.isArray(this.state.feedback) ? this.state.feedback : []).filter((item) => item && (item.scope === surface || item.scope === 'global'));
    }

    setState(patch) {
      const captured = this._captureDraftIntoState();
      const capturedWorkspace = this._captureWorkspaceIntoState();
      const capturedCategory = this._captureCategoryIntoState();
      const capturedFileEditor = this._captureRepositoryEditorIntoState();
      let nextPatch = { ...patch };
      if (captured && nextPatch.current && nextPatch.current.id === captured.id && !this.state.busy && !nextPatch.replaceCurrent) {
        nextPatch.current = { ...nextPatch.current, title: captured.title, body: captured.body, categoryIds: captured.categoryIds };
      }
      nextPatch = mergeWorkspaceEditorPatch(capturedWorkspace, this.workspaceEditorDirty, nextPatch);
      nextPatch = mergeCategoryEditorPatch(capturedCategory, this.categoryEditorDirty, nextPatch);
      nextPatch = mergeRepositoryEditorPatch(capturedFileEditor, this.fileEditorDirty, nextPatch);
      const currentPreviewPath = this.state.repositoryPreview && this.state.repositoryPreview.path || '';
      const nextPreviewPath = nextPatch.repositoryPreview ? nextPatch.repositoryPreview.path || '' : currentPreviewPath;
      if (nextPreviewPath !== currentPreviewPath) this.fileCategoryDirty = false;
      if (this.fileCategoryDirty && currentPreviewPath && nextPreviewPath === currentPreviewPath && Array.isArray(nextPatch.fileCategoryIds) && !nextPatch.replaceFileCategoryIds) {
        nextPatch.fileCategoryIds = [...(this.state.fileCategoryIds || [])];
      }
      if (nextPatch.replaceWorkspaceEditor) this.workspaceEditorDirty = false;
      if (nextPatch.replaceCategoryEditor) this.categoryEditorDirty = false;
      if (nextPatch.replaceFileEditor) this.fileEditorDirty = false;
      if (nextPatch.replaceFileCategoryIds) this.fileCategoryDirty = false;
      delete nextPatch.replaceCurrent;
      delete nextPatch.replaceWorkspaceEditor;
      delete nextPatch.replaceCategoryEditor;
      delete nextPatch.replaceFileEditor;
      delete nextPatch.replaceFileCategoryIds;
      this.state = { ...this.state, ...nextPatch };
      this.render();
    }

    _draftFromForm() {
      if (!this.shadow || !this.state.current) return null;
      const title = this.shadow.querySelector('[data-role="title"]');
      const body = this.shadow.querySelector('[data-role="body"]');
      const checkedCategoryIds = Array.from(this.shadow.querySelectorAll('[data-note-category-id]:checked')).map((input) => input.dataset.noteCategoryId);
      const availableCategoryIds = (this.state.categories || []).map((category) => category.id);
      const categoryIds = mergeVisibleCategorySelection(this.state.current.categoryIds, availableCategoryIds, checkedCategoryIds);
      return {
        ...this.state.current,
        title: title ? title.value : this.state.current.title || '',
        body: body ? body.value : this.state.current.body || '',
        categoryIds
      };
    }

    async _call(name, ...args) {
      const fn = this.handlers[name];
      if (typeof fn !== 'function') return undefined;
      try {
        return await fn(...args);
      } catch (error) {
        const scope = this.state.targetPicker && this.state.targetPicker.open ? 'picker' : (this.state.surface || 'global');
        const feedback = {
          id: `ui-${scope}-error`, scope, severity: 'error', title: 'Action failed',
          message: String(error && error.message || error), target: '', details: String(error && (error.kind || error.name) || ''),
          partialResults: Array.isArray(error && error.partialResults) ? error.partialResults : [], dismissible: true
        };
        const hasEquivalent = (this.state.feedback || []).some((item) => item && item.scope === scope && item.severity === 'error' && item.message === feedback.message);
        if (!hasEquivalent) {
          const existing = (this.state.feedback || []).filter((item) => item.id !== feedback.id);
          this.setState({ feedback: [...existing, feedback], status: `Error: ${feedback.message}` });
        }
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

    _panelViewportMetrics() {
      if (typeof window === 'undefined') return { width: 0, height: 0, left: 0, top: 0 };
      const viewport = window.visualViewport || window;
      return {
        width: Number(viewport.width || window.innerWidth || 0),
        height: Number(viewport.height || window.innerHeight || 0),
        left: Number(viewport.offsetLeft || 0),
        top: Number(viewport.offsetTop || 0)
      };
    }

    _positionPanel() {
      const panel = this.shadow && this.shadow.querySelector('.panel');
      if (!panel || typeof window === 'undefined') return;
      const viewport = this._panelViewportMetrics();
      const layout = panelViewportLayout(viewport.width, viewport.height);
      panel.style.right = 'auto';
      panel.style.bottom = 'auto';
      panel.style.width = `${layout.width}px`;
      panel.style.height = `${layout.height}px`;
      const centered = { left: viewport.left + layout.left, top: viewport.top + layout.top };
      const position = this.panelPlacement && this.panelPlacement.mode === 'custom'
        ? clampPanelPosition(this.panelPlacement.left, this.panelPlacement.top, layout.width, layout.height, viewport.width, viewport.height, layout.edge, viewport.left, viewport.top)
        : centered;
      panel.style.left = `${position.left}px`;
      panel.style.top = `${position.top}px`;
      if (this.panelPlacement && this.panelPlacement.mode === 'custom') this.panelPlacement = { mode: 'custom', ...position };
      return { ...layout, ...position };
    }

    _movePanelDrag(event) {
      const drag = this._panelDrag;
      if (!drag || !event || (drag.pointerId != null && event.pointerId != null && event.pointerId !== drag.pointerId)) return;
      const clientX = Number(event.clientX);
      const clientY = Number(event.clientY);
      if (!Number.isFinite(clientX) || !Number.isFinite(clientY)) return;
      const viewport = this._panelViewportMetrics();
      const position = clampPanelPosition(
        drag.startLeft + (clientX - drag.startX),
        drag.startTop + (clientY - drag.startY),
        drag.width,
        drag.height,
        viewport.width,
        viewport.height,
        drag.edge,
        viewport.left,
        viewport.top
      );
      drag.currentLeft = position.left;
      drag.currentTop = position.top;
      this.panelPlacement = { mode: 'custom', left: position.left, top: position.top };
      const panel = this.shadow && this.shadow.querySelector('.panel');
      if (panel && panel.style) {
        panel.style.left = `${position.left}px`;
        panel.style.top = `${position.top}px`;
        panel.style.right = 'auto';
        panel.style.bottom = 'auto';
        if (panel.dataset) panel.dataset.dragging = '1';
      }
    }

    _endPanelDrag(event) {
      const drag = this._panelDrag;
      if (!drag || (event && drag.pointerId != null && event.pointerId != null && event.pointerId !== drag.pointerId)) return;
      this._movePanelDrag(event);
      const placement = this.panelPlacement && this.panelPlacement.mode === 'custom' ? this.panelPlacement : null;
      const left = placement && Number.isFinite(Number(placement.left)) ? Number(placement.left) : (Number.isFinite(Number(drag.currentLeft)) ? Number(drag.currentLeft) : drag.startLeft);
      const top = placement && Number.isFinite(Number(placement.top)) ? Number(placement.top) : (Number.isFinite(Number(drag.currentTop)) ? Number(drag.currentTop) : drag.startTop);
      this.panelPlacement = { mode: 'custom', left: Math.round(left), top: Math.round(top) };
      const panel = this.shadow && this.shadow.querySelector('.panel');
      if (panel && panel.dataset) delete panel.dataset.dragging;
      if (drag.handle && typeof drag.handle.releasePointerCapture === 'function' && drag.pointerId != null) {
        try { drag.handle.releasePointerCapture(drag.pointerId); } catch (error) { /* pointer capture may already be released */ }
      }
      this._panelDrag = null;
    }

    _beginPanelDrag(event) {
      if (!event || (Number.isFinite(Number(event.button)) && Number(event.button) !== 0)) return;
      const panel = this.shadow && this.shadow.querySelector('.panel');
      if (!panel || typeof panel.getBoundingClientRect !== 'function') return;
      if (typeof event.preventDefault === 'function') event.preventDefault();
      if (typeof this.__closeFilesWorkspaceTopPopupForPanelMove === 'function') this.__closeFilesWorkspaceTopPopupForPanelMove();
      const rect = panel.getBoundingClientRect();
      const viewport = this._panelViewportMetrics();
      const layout = panelViewportLayout(viewport.width, viewport.height);
      this.panelPlacement = { mode: 'custom', left: Math.round(Number(rect.left) || 0), top: Math.round(Number(rect.top) || 0) };
      this._panelDrag = {
        pointerId: event.pointerId,
        startX: Number(event.clientX) || 0,
        startY: Number(event.clientY) || 0,
        startLeft: Number(rect.left) || 0,
        startTop: Number(rect.top) || 0,
        currentLeft: Number(rect.left) || 0,
        currentTop: Number(rect.top) || 0,
        width: Number(rect.width) || layout.width,
        height: Number(rect.height) || layout.height,
        edge: layout.edge,
        handle: event.currentTarget || null
      };
      if (panel.dataset) panel.dataset.dragging = '1';
      if (event.currentTarget && typeof event.currentTarget.setPointerCapture === 'function' && event.pointerId != null) {
        try { event.currentTarget.setPointerCapture(event.pointerId); } catch (error) { /* pointer capture is an optimization */ }
      }
    }

    _centerPanel() {
      this._panelDrag = null;
      this.panelPlacement = { mode: 'center', left: 0, top: 0 };
      if (typeof this.__closeFilesWorkspaceTopPopupForPanelMove === 'function') this.__closeFilesWorkspaceTopPopupForPanelMove();
      this._positionPanel();
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
          <span>${escapeHtml(category.group ? `${category.group} · ` : '')}${category.explicitFileCount} file(s) · ${category.explicitNoteCount || 0} Note(s)</span>
        </button>`).join('') || '<div class="empty">No category definitions cached.</div>';
      const sidebarBody = surface === 'notes' ? notesHtml : surface === 'files' ? repositoryEntriesHtml : categoriesHtml;
      const sidebarToolbar = surface === 'notes'
        ? `<input data-role="search" placeholder="Search Notes (Enter)" value="${escapeHtml(this.state.search)}" ${disabled}><button data-action="new" ${disabled}>New</button>`
        : surface === 'files'
          ? `<button data-action="browse-root" ${activeWorkspace && !busy ? '' : 'disabled'}>Browse root</button><button data-action="browse-up" ${this.state.repositoryPath && !busy ? '' : 'disabled'}>Up</button><button data-action="new-repository-file" ${activeWorkspace && this.state.hasToken && !busy ? '' : 'disabled'}>New file</button><button data-action="new-repository-folder" ${activeWorkspace && this.state.hasToken && !busy ? '' : 'disabled'}>New folder</button>`
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
      const surfaceFeedback = this._feedbackForSurface(surface);
      const feedbackHtml = surfaceFeedback.map((item) => `<section class="feedback feedback-${escapeHtml(item.severity || 'error')}" tabindex="-1" data-feedback-id="${escapeHtml(item.id)}">
        <div class="feedback-head"><strong>${escapeHtml(item.title || 'Status')}</strong>${item.dismissible !== false ? `<button data-dismiss-feedback="${escapeHtml(item.id)}" title="Dismiss">×</button>` : ''}</div>
        ${item.message ? `<div>${escapeHtml(item.message)}</div>` : ''}
        ${item.target ? `<code>${escapeHtml(item.target)}</code>` : ''}
        ${item.details ? `<details><summary>Details</summary><pre>${escapeHtml(item.details)}</pre></details>` : ''}
        ${(item.partialResults || []).length ? `<div class="partial-results">${item.partialResults.map((result) => `<div><strong>${escapeHtml(result.status)}</strong> · ${escapeHtml(result.target)}${result.message ? ` · ${escapeHtml(result.message)}` : ''}</div>`).join('')}</div>` : ''}
        ${(item.actions || []).length ? `<div class="feedback-actions">${item.actions.map((action) => `<button class="${action.kind === 'primary' ? 'primary' : ''}" data-feedback-action="${escapeHtml(action.id)}">${escapeHtml(action.label)}</button>`).join('')}</div>` : ''}
      </section>`).join('');
      const renderProjection = (rendered) => rendered ? `<div class="rich-markdown" data-rich-root>${rendered.html || ''}</div>` : '<div class="empty">Rendered Markdown is not available yet.</div>';
      const breadcrumbs = (this.state.repositoryBreadcrumbs || []).map((item) => `<button data-browse-path="${escapeHtml(item.path)}" ${disabled}>${escapeHtml(item.label)}</button>`).join('<span>/</span>');
      const categoryPickerHtml = (kind, selectedIds, enabled = true) => {
        const selected = [...new Set((Array.isArray(selectedIds) ? selectedIds : []).map((id) => String(id || '').trim()).filter(Boolean))];
        const available = new Set((this.state.categories || []).map((category) => category.id));
        const unavailable = selected.filter((id) => !available.has(id));
        const attribute = kind === 'file' ? 'data-file-category-id' : 'data-note-category-id';
        const choices = (this.state.categories || []).map((category) => `<label class="category-picker-row" data-category-search-text="${escapeHtml(`${category.name} ${category.id}`.toLowerCase())}"><input type="checkbox" ${attribute}="${escapeHtml(category.id)}" ${selected.includes(category.id) ? 'checked' : ''} ${enabled && !busy ? '' : 'disabled'}><span>${escapeHtml(category.name)}</span><small>${escapeHtml(category.id)}</small></label>`).join('');
        const unavailableHtml = unavailable.map((id) => `<div class="category-picker-row unavailable"><span>${escapeHtml(id)}</span><small>Selected locally; unavailable until categories refresh succeeds.</small></div>`).join('');
        const apply = kind === 'file' ? `<button class="primary" data-action="apply-file-categories" ${enabled && !busy ? '' : 'disabled'}>Apply categories</button>` : '<span class="hint">Saved with the Note on Save GitHub.</span>';
        return `<details class="category-picker" data-category-kind="${kind}"><summary><span data-category-summary>Categories · ${selected.length} selected</span></summary><div class="category-picker-popover"><input data-category-filter="${kind}" placeholder="Search categories…" ${enabled && !busy ? '' : 'disabled'}><div class="category-picker-list">${choices}${unavailableHtml || ''}</div><div class="category-picker-actions">${apply}</div></div></details>`;
      };
      const repositoryEditor = this.state.repositoryEditor || { mode: 'none', parentPath: this.state.repositoryPath || '', path: '', name: '', content: '', baseSha: '' };
      const repositoryHeadingLinkEligible = Boolean(preview && preview.kind === 'text' && typeof preview.content === 'string' && /\.md(?:own)?$/i.test(preview.path || '') && repositoryEditor.mode === 'none');
      const repositoryHeadingLinks = repositoryHeadingLinkEligible && globalThis.ObsLinkedNotes && typeof globalThis.ObsLinkedNotes.repositoryHeadingLinksForPreview === 'function'
        ? globalThis.ObsLinkedNotes.repositoryHeadingLinksForPreview(preview)
        : [];
      const repositoryHeadingLinkHtml = repositoryHeadingLinkEligible
        ? `<details class="heading-link-picker"><summary>Copy heading link</summary><div class="heading-link-popover"><div class="heading-link-list">${repositoryHeadingLinks.length ? repositoryHeadingLinks.map((heading, index) => `<div class="heading-link-row" style="padding-left:${Math.max(0, Number(heading.level || 1) - 1) * 12}px"><span>${escapeHtml(`${'#'.repeat(Math.max(1, Math.min(6, Number(heading.level || 1))))} ${heading.text}`)}</span><button data-copy-repository-heading-link="${index}">Copy</button></div>`).join('') : '<div class="empty">No Markdown headings found in this loaded file snapshot.</div>'}</div><div class="hint" data-heading-copy-status>Copies a repository-root Markdown link; no GitHub request is made.</div></div></details>`
        : '';
      const repositoryEditorHtml = repositoryEditor.mode === 'folder'
        ? `<section class="repository-editor"><h3>New folder</h3><div class="hint">Parent: ${escapeHtml(repositoryEditor.parentPath || '/')} · GitHub tracks the folder through an empty .gitkeep file.</div><label class="field"><span>Folder name</span><input data-role="repository-file-name" value="${escapeHtml(repositoryEditor.name || '')}" placeholder="new-folder" ${disabled}></label><div class="repository-editor-actions"><button class="primary" data-action="save-repository-editor" ${activeWorkspace && this.state.hasToken && !busy ? '' : 'disabled'}>Create folder</button><button data-action="cancel-repository-editor" ${disabled}>Cancel</button></div></section>`
        : repositoryEditor.mode === 'create' || repositoryEditor.mode === 'edit'
          ? `<section class="repository-editor"><h3>${repositoryEditor.mode === 'edit' ? `Edit ${escapeHtml(repositoryEditor.path)}` : 'New text file'}</h3><div class="hint">${repositoryEditor.mode === 'edit' ? `Base SHA ${escapeHtml(repositoryEditor.baseSha || '')}` : `Parent: ${escapeHtml(repositoryEditor.parentPath || '/')}`} · UTF-8 text up to 512 KiB.</div>${repositoryEditor.mode === 'create' ? `<label class="field"><span>File name</span><input data-role="repository-file-name" value="${escapeHtml(repositoryEditor.name || '')}" placeholder="document.md" ${disabled}></label>` : ''}<textarea class="repository-text-editor" data-role="repository-file-content" spellcheck="false" ${disabled}>${escapeHtml(repositoryEditor.content || '')}</textarea><div class="repository-editor-actions"><button class="primary" data-action="save-repository-editor" ${activeWorkspace && this.state.hasToken && !busy ? '' : 'disabled'}>Save</button><button data-action="cancel-repository-editor" ${disabled}>Cancel</button></div></section>`
          : '';
      const fileCategoryHtml = preview
        ? ((this.state.categories || []).length || (this.state.fileCategoryIds || []).length
          ? `<section><h3>Categories</h3>${categoryPickerHtml('file', this.state.fileCategoryIds || [], Boolean(this.state.fileCategoryAssignmentAllowed))}<div class="hint">File bytes are never modified by category assignment; category definitions remain canonical.</div></section>`
          : '<section><h3>Categories</h3><div class="empty">Refresh categories to assign them to this file.</div></section>')
        : '';
      const fileSurface = `
        <div class="editor-toolbar">
          <button data-action="browse-root" ${activeWorkspace && !busy ? '' : 'disabled'}>Browse root</button>
          <button data-action="browse-up" ${this.state.repositoryPath && !busy ? '' : 'disabled'}>Up</button>
          <button data-action="refresh-folder" ${activeWorkspace && !busy ? '' : 'disabled'}>Refresh</button>
          <button data-action="new-repository-file" ${activeWorkspace && this.state.hasToken && !busy ? '' : 'disabled'}>New file</button>
          <button data-action="new-repository-folder" ${activeWorkspace && this.state.hasToken && !busy ? '' : 'disabled'}>New folder</button>
          ${preview && preview.kind === 'text' && /\.md(?:own)?$/i.test(preview.path || '') && repositoryEditor.mode === 'none' ? `<button data-file-view="rendered" class="${this.state.fileViewMode === 'rendered' ? 'active' : ''}" ${disabled}>Rendered</button><button data-file-view="source" class="${this.state.fileViewMode === 'source' ? 'active' : ''}" ${disabled}>Source</button>` : ''}
          <button data-action="edit-repository-file" ${preview && this.state.fileEditAllowed && repositoryEditor.mode === 'none' && this.state.hasToken && !busy ? '' : 'disabled'}>Edit</button>
          ${repositoryHeadingLinkHtml}
          <button class="primary" data-action="open-file-github" ${preview && !busy ? '' : 'disabled'}>Open on GitHub</button>
          <button data-action="close" ${disabled}>Close</button>
        </div>
        ${feedbackHtml}
        <div class="file-context"><div class="breadcrumbs">${breadcrumbs || '<span>/</span>'}</div><div>${escapeHtml(this.state.repositoryPath || '/')}</div></div>
        ${repositoryEditor.mode !== 'none' ? repositoryEditorHtml : (preview ? `<section class="file-preview">
          <h3>${escapeHtml(preview.path)}</h3>
          <div class="hint">${escapeHtml(preview.kind)} · ${escapeHtml(preview.size || 0)} bytes · SHA ${escapeHtml(preview.sha || '')}</div>
          ${preview.kind === 'text'
            ? (this.state.fileViewMode === 'rendered' && /\.md(?:own)?$/i.test(preview.path || '') ? renderProjection(this.state.fileRendered) : `<pre>${escapeHtml(preview.content || '')}</pre>`)
            : `<div class="remote-context">${escapeHtml(preview.message || 'Preview unavailable. Open on GitHub.')}</div>`}
        </section>` : '<div class="empty">Select a file to view it here, or create a new text file/folder in the current directory.</div>')}
        ${repositoryEditor.mode === 'none' ? fileCategoryHtml : ''}`;
      const categoryEditor = this.state.categoryEditor || { id: '', name: '', description: '', impliedCategoryIds: [], group: '', selectedTargets: [] };
      const categoryFilesHtml = (this.state.categoryFiles || []).map((file) => `<div class="category-file-row">
          <button data-category-file-open="${escapeHtml(file.path)}" ${disabled}>${escapeHtml(file.path)}</button>
          <span>${escapeHtml(file.membership)} · ${escapeHtml(file.validation || 'unchecked')}</span>
          ${file.membership === 'explicit' ? `<button data-category-file-remove="${escapeHtml(file.path)}" ${disabled}>Remove</button>` : ''}
          ${file.validationMessage ? `<small>${escapeHtml(file.validationMessage)}</small>` : ''}
        </div>`).join('') || '<div class="empty">No files in this category.</div>';
      const categoryNotesHtml = (this.state.categoryNotes || []).map((note) => `<div class="category-file-row">
          <button data-category-note-open="${escapeHtml(note.noteId || '')}" ${note.noteId && !busy ? '' : 'disabled'}>${escapeHtml(note.label || note.path)}</button>
          <span>${escapeHtml(note.membership)} · ${escapeHtml(note.validation || 'unchecked')}</span>
          ${note.membership === 'explicit' ? `<button data-category-target-remove="note:${escapeHtml(note.noteId || note.path)}" ${disabled}>Remove</button>` : ''}
          ${note.validationMessage ? `<small>${escapeHtml(note.validationMessage)}</small>` : ''}
        </div>`).join('') || '<div class="empty">No Notes in this category.</div>';
      const categoryTargetsHtml = (categoryEditor.selectedTargets || []).map((target) => `<div class="selected-target"><span>${target.type === 'note' ? '📝' : '📄'} ${escapeHtml(target.label || target.name || target.path || target.noteId)}</span><button data-category-draft-remove="${escapeHtml(target.type)}:${escapeHtml(target.type === 'note' ? (target.noteId || target.path) : target.path)}" ${disabled}>Remove</button></div>`).join('') || '<div class="empty">No initial members selected.</div>';
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
        ${feedbackHtml}
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
            <button data-action="choose-category-targets" ${activeWorkspace && !busy ? '' : 'disabled'}>Choose files and Notes</button>
            <button data-action="save-category-group" ${categoryEditor.id && !busy ? '' : 'disabled'}>Save local group</button>
            <button data-action="assign-preview-category" ${categoryEditor.id && preview && this.state.categoryAssignmentAllowed && !busy ? '' : 'disabled'}>Assign selected file</button>
            <span class="hint">Definitions own file/Note membership. UX groups are local-only.</span>
          </div>
          <h3>Selected explicit members</h3><div class="selected-targets">${categoryTargetsHtml}</div>
          <h3>Files</h3><div class="category-files">${categoryFilesHtml}</div>
          <h3>Notes</h3><div class="category-files">${categoryNotesHtml}</div>
          ${categoryErrorsHtml ? `<h3>Category model issues</h3><div class="category-errors">${categoryErrorsHtml}</div>` : ''}
        </section>`;
      const noteCategoryHtml = (this.state.categories || []).length || (this.state.noteCategoryIds || []).length
        ? categoryPickerHtml('note', this.state.noteCategoryIds || [], Boolean(current))
        : '<div class="empty">Refresh categories to assign them to this Note.</div>';
      const backlinksHtml = (this.state.noteBacklinks || []).map((relation) => `<button data-note-backlink="${escapeHtml(relation.sourceNoteId)}" ${disabled}>${escapeHtml(relation.label || relation.sourceNoteId)}</button>`).join('') || '<div class="empty">No managed backlinks.</div>';
      const pendingAssetsHtml = (this.state.pendingAssets || []).map((asset) => `<div class="pending-asset-row">
          <span>🖼️ <strong>${escapeHtml(asset.fileName || asset.originalName || asset.id)}</strong> · ${escapeHtml(asset.mimeType || '')} · ${escapeHtml(asset.size || 0)} bytes · ${escapeHtml(asset.state || 'pending')}</span>
          ${asset.verifiedPath ? `<code>${escapeHtml(asset.verifiedPath)}</code>` : ''}
          <button data-remove-pending-image="${escapeHtml(asset.id)}" ${disabled}>Remove</button>
        </div>`).join('') || '<div class="empty">No locally staged images.</div>';
      const transferDraft = this.state.transferDraft || { targetPath: '', targetDirectory: '', fileName: 'copied-note.md', mode: 'create', plan: null };
      const transferPlan = transferDraft.plan || null;
      const transferPlanHtml = transferPlan ? `<div class="transfer-plan"><div><strong>Source:</strong> <code>${escapeHtml(transferPlan.sourcePath || '')}</code></div><div><strong>Target:</strong> <code>${escapeHtml(transferPlan.targetPath || '')}</code> · ${escapeHtml(transferPlan.mode || '')} · ${escapeHtml(transferPlan.targetState || '')}</div>${(transferPlan.assets || []).map((asset) => `<div class="transfer-plan-row"><strong>${escapeHtml(asset.status || '')}</strong> · <code>${escapeHtml(asset.sourcePath || '')}</code> → <code>${escapeHtml(asset.targetPath || '')}</code></div>`).join('')}${(transferPlan.diagnostics || []).map((item) => `<div class="transfer-plan-row"><strong>${escapeHtml(item.status || '')}</strong> · ${escapeHtml(item.source || item.target || '')} · ${escapeHtml(item.message || '')}</div>`).join('')}</div>` : '<div class="hint">Choose the target, then prepare a read-only transfer preview before any repository write.</div>';
      const notesSurface = `
        <div class="editor-toolbar">
          <button class="primary" data-action="save-local" ${current && !busy ? '' : 'disabled'}>Save local</button>
          <button class="primary" data-action="save-remote" ${current && activeWorkspace && !busy ? '' : 'disabled'}>Save GitHub</button>
          <button data-action="insert-image" ${current && !busy ? '' : 'disabled'}>Insert image</button>
          <input data-role="image-file" type="file" accept="image/png,image/jpeg,image/webp,image/gif" hidden>
          <button data-note-view="edit" class="${this.state.noteViewMode === 'edit' ? 'active' : ''}" ${disabled}>Edit</button>
          <button data-note-view="preview" class="${this.state.noteViewMode === 'preview' ? 'active' : ''}" ${disabled}>Preview</button>
          <button data-note-view="split" class="${this.state.noteViewMode === 'split' ? 'active' : ''}" ${disabled}>Split</button>
          <button data-action="copy-remote" ${current && activeWorkspace && this.state.remoteTargetMismatch && !busy ? '' : 'disabled'}>Copy to chat workspace</button>
          ${recoveryButtons}
          <button class="danger" data-action="delete" ${current && !busy ? '' : 'disabled'}>Delete local</button>
          <button data-action="close" ${disabled}>Close</button>
        </div>
        ${feedbackHtml}
        ${current ? `
          <input data-role="title" placeholder="Optional title" value="${escapeHtml(current.title || '')}" ${disabled}>
          <div class="note-mode note-mode-${escapeHtml(this.state.noteViewMode || 'edit')}">
            ${this.state.noteViewMode !== 'preview' ? `<textarea data-role="body" placeholder="Markdown Note body" ${disabled}>${escapeHtml(current.body || '')}</textarea>` : ''}
            ${this.state.noteViewMode !== 'edit' ? renderProjection(this.state.noteRendered) : ''}
          </div>
          ${remoteInfo}
          ${remoteSummary}
          <section><h3>Images</h3><div class="pending-assets">${pendingAssetsHtml}</div><div class="hint">Paste an image into the editor or use Insert image. Images remain local until Save GitHub verifies the repository asset and Note.</div></section>
          <section class="transfer-panel"><h3>Copy Note to Markdown with images</h3><div class="transfer-grid"><select data-role="transfer-mode" ${disabled}><option value="create" ${transferDraft.mode === 'create' ? 'selected' : ''}>Create new file</option><option value="append" ${transferDraft.mode === 'append' ? 'selected' : ''}>Append to existing file</option></select>${transferDraft.mode === 'create' ? `<input data-role="transfer-file-name" value="${escapeHtml(transferDraft.fileName || 'copied-note.md')}" placeholder="copied-note.md" ${disabled}>` : ''}<button data-action="choose-transfer-target" ${current && activeWorkspace && !busy ? '' : 'disabled'}>${transferDraft.mode === 'append' ? 'Choose existing Markdown' : 'Choose target folder'}</button></div><div class="target-preview"><strong>Selected target:</strong> <code>${escapeHtml(transferDraft.targetPath || 'not selected')}</code></div><div class="transfer-actions"><button data-action="prepare-transfer" ${current && activeWorkspace && transferDraft.targetPath && !busy ? '' : 'disabled'}>Prepare transfer preview</button><button class="primary" data-action="execute-transfer" ${current && activeWorkspace && transferPlan && transferPlan.ready && !busy ? '' : 'disabled'}>Execute reviewed transfer</button></div>${transferPlanHtml}<div class="hint">The first slice copies within the current repository/branch. Source Note and source images are never deleted.</div></section>
          <section><h3>Categories</h3><div class="category-choices">${noteCategoryHtml}</div><div class="hint">Selection is preserved locally; Save GitHub applies verified category-definition changes.</div></section>
          <section><h3>Managed links</h3><div class="links">${linksHtml}</div>
            <button data-action="choose-note-links" ${disabled}>Choose files or Notes</button>
          </section>
          <section><h3>Linked from</h3><div class="backlinks">${backlinksHtml}</div></section>` : '<div class="empty">Create or select a Note.</div>'}`;
      const picker = this.state.targetPicker || {};
      const transferPicker = picker.mode === 'transfer-target';
      const pickerTitle = transferPicker ? (picker.transferMode === 'append' ? 'Choose existing Markdown target' : 'Choose target folder') : 'Choose files or Notes';
      const pickerActionLabel = transferPicker ? (picker.transferMode === 'append' ? 'Use selected Markdown' : 'Use current folder') : 'Use selected targets';
      const pickerItems = (picker.query ? picker.fileResults : picker.entries || []).map((entry) => {
        if (entry.type === 'dir') return `<button class="picker-row" data-picker-dir="${escapeHtml(entry.path)}" ${disabled}>📁 ${escapeHtml(entry.name || entry.path)}</button>`;
        const key = `file:${entry.path}`;
        const checked = (picker.selected || []).some((item) => item.type === 'file' && item.path === entry.path);
        return `<label class="picker-row"><input type="checkbox" data-picker-target="${escapeHtml(key)}" data-picker-path="${escapeHtml(entry.path)}" data-picker-name="${escapeHtml(entry.name || entry.path)}" ${checked ? 'checked' : ''} ${disabled}> 📄 ${escapeHtml(entry.name || entry.path)} <small>${escapeHtml(entry.path)}</small></label>`;
      }).join('') || '<div class="empty">No file results.</div>';
      const pickerNotes = (picker.query ? (picker.noteResults || []) : (this.state.notes || [])).map((note) => {
        const checked = (picker.selected || []).some((item) => item.type === 'note' && item.noteId === note.id);
        const path = note.remote && note.remote.path || '';
        return `<label class="picker-row"><input type="checkbox" data-picker-target="note:${escapeHtml(note.id)}" data-picker-note-id="${escapeHtml(note.id)}" data-picker-path="${escapeHtml(path)}" data-picker-name="${escapeHtml(note.title || 'Untitled Note')}" ${checked ? 'checked' : ''} ${disabled}> 📝 ${escapeHtml(note.title || 'Untitled Note')} <small>${escapeHtml(path || note.id)}</small></label>`;
      }).join('') || '<div class="empty">No Note results.</div>';
      const pickerSelected = (picker.selected || []).map((item) => `<div class="selected-target"><span>${item.type === 'note' ? '📝' : '📄'} ${escapeHtml(item.label || item.name || item.path || item.noteId)}</span><button data-picker-remove="${escapeHtml(item.type)}:${escapeHtml(item.type === 'note' ? (item.noteId || item.path) : item.path)}" ${disabled}>Remove</button></div>`).join('') || '<div class="empty">Nothing selected.</div>';
      const pickerModal = picker.open ? `<div class="picker-backdrop"><section class="picker-modal" aria-modal="true" role="dialog" aria-label="Choose repository targets">
        <div class="picker-header"><strong>${escapeHtml(pickerTitle)}</strong><button data-action="close-target-picker" ${disabled}>×</button></div>
        ${this._feedbackForSurface('picker').map((item) => `<section class="feedback feedback-${escapeHtml(item.severity || 'error')}" tabindex="-1"><strong>${escapeHtml(item.title || 'Action failed')}</strong><div>${escapeHtml(item.message || '')}</div></section>`).join('')}
        <div class="picker-search"><input data-role="picker-query" value="${escapeHtml(picker.query || '')}" placeholder="Search by name"><select data-role="picker-depth"><option value="0" ${picker.depth === '0' ? 'selected' : ''}>Current folder</option><option value="1" ${picker.depth === '1' ? 'selected' : ''}>Depth 1</option><option value="2" ${picker.depth === '2' ? 'selected' : ''}>Depth 2</option><option value="3" ${picker.depth === '3' ? 'selected' : ''}>Depth 3</option><option value="5" ${picker.depth === '5' ? 'selected' : ''}>Depth 5</option><option value="entire" ${picker.depth === 'entire' ? 'selected' : ''}>Entire repository (bounded)</option></select><button data-action="picker-search" ${disabled}>Search</button></div>
        <div class="picker-tabs"><button data-picker-tab="files" class="${picker.tab === 'files' ? 'active' : ''}">Files</button>${transferPicker ? '' : `<button data-picker-tab="notes" class="${picker.tab === 'notes' ? 'active' : ''}">Notes</button>`}<button data-picker-tab="selected" class="${picker.tab === 'selected' ? 'active' : ''}">Selected (${(picker.selected || []).length})</button></div>
        <div class="picker-summary">${escapeHtml(picker.summary || picker.currentPath || '/')} ${picker.truncated ? ' · incomplete result' : ''}</div>${transferPicker && picker.transferMode === 'create' ? `<div class="picker-search"><input data-role="picker-file-name" value="${escapeHtml(picker.fileName || 'copied-note.md')}" placeholder="copied-note.md"></div>` : ''}
        <div class="picker-content" data-picker-panel="files" ${picker.tab !== 'files' ? 'hidden' : ''}>${pickerItems}</div>
        ${transferPicker ? '' : `<div class="picker-content" data-picker-panel="notes" ${picker.tab !== 'notes' ? 'hidden' : ''}>${pickerNotes}</div>`}
        <div class="picker-content" data-picker-panel="selected" ${picker.tab !== 'selected' ? 'hidden' : ''}>${pickerSelected}</div>
        <div class="picker-actions"><button class="primary" data-action="apply-target-picker" ${disabled}>${escapeHtml(pickerActionLabel)}</button><button data-action="close-target-picker" ${disabled}>Cancel</button></div>
      </section></div>` : '';
      const activeSurface = surface === 'files' ? fileSurface : surface === 'categories' ? categorySurface : notesSurface;

      this.shadow.innerHTML = `
        <style>
          :host { all: initial; --bg:#111318; --surface:#191c23; --surface-2:#20242d; --surface-3:#292e39; --border:#3b4250; --text:#eef1f6; --muted:#aab2c0; --accent:#8eb4ff; --success:#79d69a; --danger:#ff8d8d; }
          *, *::before, *::after { box-sizing: border-box; }
          button, input, textarea, select { font: 13px/1.35 system-ui, sans-serif; }
          .launcher { position: fixed; right: 102px; bottom: 18px; z-index: 2147483647; border: 1px solid #343a46; border-radius: 999px; padding: 10px 15px; background: #202123; color: #fff; box-shadow: 0 5px 18px rgba(0,0,0,.42); cursor: pointer; }
          .panel { position: fixed; left: 12px; top: 12px; right: auto; bottom: auto; z-index: 2147483647; width: min(980px, calc(100vw - 24px)); height: min(760px, calc(100dvh - 108px)); max-width: calc(100vw - 24px); max-height: calc(100dvh - 24px); min-width: 0; min-height: 0; display: ${this.open ? 'grid' : 'none'}; grid-template-columns: 260px minmax(0, 1fr); grid-template-rows: auto minmax(0, 1fr); background: var(--bg); color: var(--text); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; box-shadow: 0 14px 42px rgba(0,0,0,.55); font: 13px/1.4 system-ui, sans-serif; color-scheme: dark; }
          .panel-chrome { grid-column: 1 / -1; grid-row: 1; min-width: 0; display: flex; align-items: center; gap: 8px; padding: 6px 8px; border-bottom: 1px solid var(--border); background: #151820; }
          .panel-drag-handle { min-width: 0; flex: 1 1 auto; display: flex; align-items: center; gap: 8px; color: var(--muted); cursor: grab; user-select: none; touch-action: none; }
          .panel-drag-handle::before { content: '⋮⋮'; letter-spacing: -2px; color: var(--text); }
          .panel[data-dragging="1"] .panel-drag-handle { cursor: grabbing; }
          .panel-window-actions { display: flex; gap: 6px; margin-left: auto; }
          .panel-window-actions button { padding: 4px 8px; }
          .sidebar { grid-column: 1; grid-row: 2; display: flex; flex-direction: column; min-width: 0; min-height: 0; overflow: hidden; background: var(--surface); border-right: 1px solid var(--border); }
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
          .main { grid-column: 2; grid-row: 2; min-width: 0; min-height: 0; overflow: hidden; display: flex; flex-direction: column; }
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
          .feedback { border: 2px solid #b85b5b; background: #421f24; color: #ffe3e3; border-radius: 9px; padding: 12px; font-size: 14px; line-height: 1.45; box-shadow: 0 4px 18px rgba(0,0,0,.28); }
          .feedback-success { border-color: #3d9160; background: #173323; color: #d5ffe3; }
          .feedback-warning { border-color: #aa7b32; background: #3d2f17; color: #ffe9bd; }
          .feedback-info { border-color: #477ca9; background: #172d40; color: #d4ebff; }
          .feedback-head { display: flex; justify-content: space-between; align-items: center; gap: 8px; margin-bottom: 5px; font-size: 15px; }
          .feedback code { display: block; margin-top: 6px; color: inherit; word-break: break-word; }
          .feedback-actions { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 9px; }
          .partial-results { display: grid; gap: 4px; margin-top: 8px; }
          .rich-markdown { padding: 12px; border: 1px solid var(--border); border-radius: 8px; background: #0f1217; overflow-wrap: anywhere; min-height: 120px; }
          .rich-markdown h1, .rich-markdown h2, .rich-markdown h3, .rich-markdown h4 { margin: 1em 0 .45em; }
          .rich-markdown p { margin: .55em 0; }
          .rich-markdown pre { white-space: pre-wrap; overflow: auto; padding: 10px; background: #090b0f; border-radius: 6px; }
          .rich-markdown code { font-family: ui-monospace, SFMono-Regular, Consolas, monospace; }
          .rich-markdown table { border-collapse: collapse; width: 100%; }
          .rich-markdown th, .rich-markdown td { border: 1px solid var(--border); padding: 6px; text-align: left; }
          .rich-markdown a { color: #9ec5ff; text-decoration: underline; cursor: pointer; }
          .rich-markdown img { display: block; max-width: 100%; height: auto; margin: 10px 0; border-radius: 5px; }
          .obs-md-image-pending { min-height: 36px; border: 1px dashed var(--border); }
          .note-mode-split { display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr); gap: 10px; align-items: start; }
          .category-choices { display: flex; flex-wrap: wrap; gap: 7px; }
          .category-choice { border: 1px solid var(--border); border-radius: 999px; padding: 5px 8px; background: var(--surface-2); }
          .category-choice input { width: auto; }
          .selected-targets, .backlinks { display: grid; gap: 6px; }
          .selected-target { display: flex; align-items: center; justify-content: space-between; gap: 8px; border: 1px solid var(--border); border-radius: 6px; padding: 6px; background: var(--surface-2); }
          .pending-assets { display: grid; gap: 6px; }
          .pending-asset-row { display: grid; grid-template-columns: minmax(0,1fr) auto auto; gap: 7px; align-items: center; border: 1px solid var(--border); border-radius: 7px; padding: 7px; background: var(--surface-2); }
          .pending-asset-row code { overflow: hidden; text-overflow: ellipsis; }
          .transfer-grid { display: grid; grid-template-columns: 180px minmax(0,1fr) auto; gap: 7px; }
          .transfer-actions { display: flex; flex-wrap: wrap; gap: 7px; margin: 7px 0; }
          .transfer-plan { display: grid; gap: 5px; margin-top: 7px; padding: 7px; border: 1px solid var(--border); border-radius: 6px; background: var(--surface-2); }
          .transfer-plan-row { overflow-wrap: anywhere; }
          .repository-editor { display: grid; gap: 8px; }
          .repository-text-editor { min-height: 320px; width: 100%; resize: vertical; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; white-space: pre; }
          .repository-editor-actions, .category-picker-actions { display: flex; gap: 7px; align-items: center; flex-wrap: wrap; }
          .category-picker { position: relative; max-width: 620px; }
          .category-picker > summary { cursor: pointer; display: inline-flex; align-items: center; min-height: 34px; padding: 6px 10px; border: 1px solid var(--border); border-radius: 7px; background: var(--surface); }
          .category-picker-popover { margin-top: 6px; display: grid; gap: 7px; padding: 8px; border: 1px solid var(--border); border-radius: 8px; background: var(--surface-2); }
          .category-picker-list { max-height: 280px; overflow: auto; display: grid; gap: 4px; }
          .category-picker-row { display: grid; grid-template-columns: auto minmax(0,1fr) auto; gap: 8px; align-items: center; padding: 6px 7px; border-radius: 6px; }
          .category-picker-row:hover { background: var(--surface); }
          .category-picker-row input { width: auto; }
          .category-picker-row small { color: var(--muted); overflow-wrap: anywhere; }
          .category-picker-row.unavailable { opacity: .75; }
          .heading-link-picker { position: relative; }
          .heading-link-picker > summary { cursor: pointer; display: inline-flex; align-items: center; min-height: 34px; padding: 6px 10px; border: 1px solid var(--border); border-radius: 7px; background: var(--surface); list-style: none; }
          .heading-link-picker > summary::-webkit-details-marker { display: none; }
          .heading-link-popover { position: absolute; z-index: 45; top: calc(100% + 6px); right: 0; width: min(560px, 80vw); max-height: 380px; overflow: auto; display: grid; gap: 7px; padding: 8px; border: 1px solid var(--border); border-radius: 8px; background: var(--surface-2); box-shadow: 0 12px 30px rgba(0,0,0,.45); }
          .heading-link-list { display: grid; gap: 4px; }
          .heading-link-row { display: grid; grid-template-columns: minmax(0,1fr) auto; gap: 8px; align-items: center; padding-top: 3px; padding-bottom: 3px; }
          .heading-link-row span { min-width: 0; overflow-wrap: anywhere; }
          .picker-backdrop { position: absolute; inset: 0; z-index: 20; display: grid; place-items: center; padding: 18px; background: rgba(0,0,0,.72); }
          .main { position: relative; }
          .picker-modal { width: min(780px, 100%); max-height: 92%; display: flex; flex-direction: column; gap: 8px; padding: 12px; border: 1px solid var(--border); border-radius: 10px; background: var(--bg); box-shadow: 0 16px 45px rgba(0,0,0,.6); }
          .picker-header, .picker-actions, .picker-tabs { display: flex; gap: 7px; align-items: center; }
          .picker-header { justify-content: space-between; font-size: 15px; }
          .picker-search { display: grid; grid-template-columns: minmax(0,1fr) 180px auto; gap: 7px; }
          .picker-summary { color: var(--muted); }
          .picker-content { min-height: 160px; max-height: 380px; overflow: auto; border: 1px solid var(--border); border-radius: 7px; padding: 7px; }
          .picker-row { width: 100%; display: flex; gap: 8px; align-items: center; text-align: left; margin-bottom: 5px; padding: 7px; border: 1px solid var(--border); border-radius: 6px; background: var(--surface); }
          .picker-row input { width: auto; }
          .picker-row small { color: var(--muted); margin-left: auto; overflow: hidden; text-overflow: ellipsis; }
          .workspace-manager-panel { margin-top: 10px; }
          @media (max-width: 700px) { .panel { grid-template-columns: minmax(0, 1fr); grid-template-rows: auto auto minmax(0, 1fr); } .panel-chrome { grid-column: 1; grid-row: 1; } .sidebar { grid-column: 1; grid-row: 2; max-height: 190px; border-right: 0; border-bottom: 1px solid var(--border); } .main { grid-column: 1; grid-row: 3; } .add-link, .workspace-bar, .settings-grid, .picker-search, .note-mode-split, .transfer-grid, .pending-asset-row { grid-template-columns: 1fr; } }
        </style>
        <button class="launcher" data-action="toggle" ${disabled}>Docs</button>
        <section class="panel" aria-label="Repository Documentation Workspace Prototype" aria-busy="${busy ? 'true' : 'false'}">
          <div class="panel-chrome"><div class="panel-drag-handle" data-panel-drag-handle title="Drag Linked Notes window"><strong>Linked Notes</strong><span>drag</span></div><div class="panel-window-actions"><button data-action="center-panel" title="Put Linked Notes back in the center">Center</button></div></div>
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
            ${pickerModal}
          </main>
        </section>`;

      this._positionLauncher();
      this._positionPanel();
      const dragHandle = this.shadow.querySelector('[data-panel-drag-handle]');
      if (dragHandle) dragHandle.onpointerdown = (event) => this._beginPanelDrag(event);
      const centerPanel = this.shadow.querySelector('[data-action="center-panel"]');
      if (centerPanel) centerPanel.onclick = () => this._centerPanel();
      const details = this.shadow.querySelector('[data-role="workspace-manager"]');
      if (details) details.ontoggle = () => { this.workspaceManagerOpen = details.open; };
      const title = this.shadow.querySelector('[data-role="title"]');
      const body = this.shadow.querySelector('[data-role="body"]');
      if (title) title.oninput = () => this._scheduleDraftPersist();
      if (body) body.oninput = () => this._scheduleDraftPersist();
      this.shadow.querySelectorAll('[data-workspace-field]').forEach((input) => {
        input.oninput = () => { this.workspaceEditorDirty = true; this._captureWorkspaceIntoState(); };
      });
      this.shadow.querySelectorAll('[data-role^="category-"]').forEach((input) => { input.oninput = () => { this.categoryEditorDirty = true; this._captureCategoryIntoState(); }; });
      this.shadow.querySelectorAll('[data-note-category-id]').forEach((input) => {
        input.onchange = () => {
          const draft = this._draftFromForm();
          if (draft) this.state.current = draft;
          const root = input.closest('.category-picker');
          const summary = root && root.querySelector('[data-category-summary]');
          if (summary) summary.textContent = `Categories · ${root.querySelectorAll('[data-note-category-id]:checked').length} selected`;
        };
      });
      this.shadow.querySelectorAll('[data-role="repository-file-name"], [data-role="repository-file-content"]').forEach((input) => { input.oninput = () => { this.fileEditorDirty = true; this._captureRepositoryEditorIntoState(); }; });
      this.shadow.querySelectorAll('[data-category-filter]').forEach((input) => {
        input.oninput = () => {
          const root = input.closest('.category-picker');
          const query = String(input.value || '').trim().toLowerCase();
          if (!root) return;
          root.querySelectorAll('[data-category-search-text]').forEach((row) => { row.hidden = Boolean(query && !String(row.dataset.categorySearchText || '').includes(query)); });
        };
      });
      this.shadow.querySelectorAll('[data-file-category-id]').forEach((input) => {
        input.onchange = () => {
          const ids = Array.from(this.shadow.querySelectorAll('[data-file-category-id]:checked')).map((item) => item.dataset.fileCategoryId);
          this.state.fileCategoryIds = ids;
          this.fileCategoryDirty = true;
          const root = input.closest('.category-picker');
          const summary = root && root.querySelector('[data-category-summary]');
          if (summary) summary.textContent = `Categories · ${ids.length} selected`;
        };
      });
      this.shadow.querySelectorAll('.category-picker[data-category-kind="note"]').forEach((details) => {
        details.ontoggle = () => { if (!details.open) this._persistDraftNow().catch(() => {}); };
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
      const imageInput = this.shadow.querySelector('[data-role="image-file"]');
      const insertImage = this.shadow.querySelector('[data-action="insert-image"]');
      if (insertImage && imageInput) insertImage.onclick = () => imageInput.click();
      if (imageInput) imageInput.onchange = () => { const file = imageInput.files && imageInput.files[0]; const editor = this.shadow.querySelector('[data-role="body"]'); if (file) this._call('onInsertImage', this._draftFromForm(), { file, cursorStart: editor ? editor.selectionStart : 0, cursorEnd: editor ? editor.selectionEnd : 0 }); imageInput.value = ''; };
      const bodyEditor = this.shadow.querySelector('[data-role="body"]');
      if (bodyEditor) bodyEditor.onpaste = (event) => { const items = Array.from(event.clipboardData && event.clipboardData.items || []); const image = items.find((item) => String(item.type || '').startsWith('image/')); if (!image) return; const file = image.getAsFile(); if (!file) return; event.preventDefault(); this._call('onInsertImage', this._draftFromForm(), { file, cursorStart: bodyEditor.selectionStart, cursorEnd: bodyEditor.selectionEnd }); };
      this.shadow.querySelectorAll('[data-remove-pending-image]').forEach((button) => { button.onclick = () => this._call('onRemovePendingImage', this._draftFromForm(), button.dataset.removePendingImage); });
      const transferMode = this.shadow.querySelector('[data-role="transfer-mode"]');
      const transferFileName = this.shadow.querySelector('[data-role="transfer-file-name"]');
      if (transferMode) transferMode.onchange = () => this._call('onUpdateTransferDraft', { mode: transferMode.value, fileName: transferFileName ? transferFileName.value : ((this.state.transferDraft || {}).fileName || 'copied-note.md') });
      if (transferFileName) transferFileName.onchange = () => this._call('onUpdateTransferDraft', { mode: transferMode ? transferMode.value : 'create', fileName: transferFileName.value });
      const chooseTransferTarget = this.shadow.querySelector('[data-action="choose-transfer-target"]');
      if (chooseTransferTarget) chooseTransferTarget.onclick = () => this._call('onOpenTargetPicker', { mode: 'transfer-target', transferMode: (this.state.transferDraft || {}).mode || 'create', fileName: transferFileName ? transferFileName.value : ((this.state.transferDraft || {}).fileName || 'copied-note.md') });
      const prepareTransfer = this.shadow.querySelector('[data-action="prepare-transfer"]');
      if (prepareTransfer) prepareTransfer.onclick = () => this._call('onPrepareTransfer', this._draftFromForm(), this.state.transferDraft || {});
      const executeTransfer = this.shadow.querySelector('[data-action="execute-transfer"]');
      if (executeTransfer) executeTransfer.onclick = () => this._call('onExecuteTransfer', this._draftFromForm());
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
      this.shadow.querySelectorAll('[data-action="refresh-folder"]').forEach((button) => { button.onclick = () => this._withAllDrafts('onBrowseRepository', this.state.repositoryPath || ''); });
      this.shadow.querySelectorAll('[data-action="new-repository-file"]').forEach((button) => { button.onclick = () => this._withAllDrafts('onBeginRepositoryFileCreate'); });
      this.shadow.querySelectorAll('[data-action="new-repository-folder"]').forEach((button) => { button.onclick = () => this._withAllDrafts('onBeginRepositoryFolderCreate'); });
      this.shadow.querySelectorAll('[data-action="edit-repository-file"]').forEach((button) => { button.onclick = () => this._withAllDrafts('onBeginRepositoryFileEdit'); });
      this.shadow.querySelectorAll('[data-action="cancel-repository-editor"]').forEach((button) => { button.onclick = () => this._call('onCancelRepositoryEditor'); });
      this.shadow.querySelectorAll('[data-action="save-repository-editor"]').forEach((button) => { button.onclick = () => this._call('onSaveRepositoryEditor', this._repositoryEditorFromForm()); });
      this.shadow.querySelectorAll('[data-action="apply-file-categories"]').forEach((button) => { button.onclick = () => { const ids = Array.from(this.shadow.querySelectorAll('[data-file-category-id]:checked')).map((item) => item.dataset.fileCategoryId); this.state.fileCategoryIds = ids; return this._call('onApplyFileCategories', preview && preview.path, ids); }; });
      this.shadow.querySelectorAll('[data-copy-repository-heading-link]').forEach((button) => { button.onclick = async () => { const index = Number(button.dataset.copyRepositoryHeadingLink); const item = repositoryHeadingLinks[index]; const root = button.closest('.heading-link-picker'); const status = root && root.querySelector('[data-heading-copy-status]'); try { if (!item || !item.markdown) throw new Error('Heading link is unavailable.'); await this._call('onCopyRepositoryHeadingLink', item); if (status) status.textContent = `Copied: ${item.target}`; button.textContent = 'Copied'; } catch (error) { if (status) status.textContent = `Copy failed: ${String(error && error.message || error)}`; } }; });
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
      const categoryFromForm = () => this._categoryFromForm();
      const saveCategory = this.shadow.querySelector('[data-action="save-category"]');
      if (saveCategory) saveCategory.onclick = () => this._call('onSaveCategory', categoryFromForm());
      const saveCategoryGroup = this.shadow.querySelector('[data-action="save-category-group"]');
      if (saveCategoryGroup) saveCategoryGroup.onclick = () => { const category = categoryFromForm(); return this._call('onSetCategoryGroup', category.id, category.group); };
      const assignPreview = this.shadow.querySelector('[data-action="assign-preview-category"]');
      if (assignPreview) assignPreview.onclick = () => this._call('onAssignCategory', categoryEditor.id, preview && preview.path);
      this.shadow.querySelectorAll('[data-note-view]').forEach((button) => { button.onclick = () => this._call('onSetNoteViewMode', button.dataset.noteView, this._draftFromForm()); });
      this.shadow.querySelectorAll('[data-file-view]').forEach((button) => { button.onclick = () => this._call('onSetFileViewMode', button.dataset.fileView); });
      const chooseNoteLinks = this.shadow.querySelector('[data-action="choose-note-links"]');
      if (chooseNoteLinks) chooseNoteLinks.onclick = () => { const editor = this.shadow.querySelector('[data-role="body"]'); return this._call('onOpenTargetPicker', { mode: 'note-link', cursorStart: editor ? editor.selectionStart : 0, cursorEnd: editor ? editor.selectionEnd : 0 }); };
      const chooseCategoryTargets = this.shadow.querySelector('[data-action="choose-category-targets"]');
      if (chooseCategoryTargets) chooseCategoryTargets.onclick = () => this._call('onOpenTargetPicker', { mode: 'category-members', initialTargets: this._categoryFromForm().selectedTargets || [] });
      this.shadow.querySelectorAll('[data-dismiss-feedback]').forEach((button) => { button.onclick = () => this._call('onDismissFeedback', button.dataset.dismissFeedback); });
      this.shadow.querySelectorAll('[data-feedback-action]').forEach((button) => { button.onclick = () => this._call('onFeedbackAction', button.dataset.feedbackAction); });
      this.shadow.querySelectorAll('[data-note-backlink]').forEach((button) => { button.onclick = () => this._withDraft('onSelect', button.dataset.noteBacklink); });
      this.shadow.querySelectorAll('[data-category-note-open]').forEach((button) => { button.onclick = () => this._withDraft('onSelect', button.dataset.categoryNoteOpen); });
      const removeCategoryTarget = (identity) => {
        const editorState = this._categoryFromForm();
        editorState.selectedTargets = (editorState.selectedTargets || []).filter((target) => `${target.type}:${target.type === 'note' ? (target.noteId || target.path) : target.path}` !== identity);
        this.categoryEditorDirty = true;
        this.state.categoryEditor = editorState;
        this.render();
      };
      this.shadow.querySelectorAll('[data-category-draft-remove]').forEach((button) => { button.onclick = () => removeCategoryTarget(button.dataset.categoryDraftRemove); });
      this.shadow.querySelectorAll('[data-category-target-remove]').forEach((button) => { button.onclick = () => removeCategoryTarget(button.dataset.categoryTargetRemove); });
      this.shadow.querySelectorAll('[data-action="close-target-picker"]').forEach((button) => { button.onclick = () => this._call('onCloseTargetPicker'); });
      const pickerSearch = this.shadow.querySelector('[data-action="picker-search"]');
      if (pickerSearch) pickerSearch.onclick = () => this._call('onSearchTargetPicker', (this.shadow.querySelector('[data-role="picker-query"]') || {}).value || '', (this.shadow.querySelector('[data-role="picker-depth"]') || {}).value || '2');
      this.shadow.querySelectorAll('[data-picker-dir]').forEach((button) => { button.onclick = () => this._call('onBrowseTargetPicker', button.dataset.pickerDir); });
      this.shadow.querySelectorAll('[data-picker-target]').forEach((input) => { input.onchange = () => this._call('onToggleTargetPicker', input.dataset.pickerNoteId ? { type: 'note', noteId: input.dataset.pickerNoteId, path: input.dataset.pickerPath, name: input.dataset.pickerName } : { type: 'file', path: input.dataset.pickerPath, name: input.dataset.pickerName }); });
      this.shadow.querySelectorAll('[data-picker-remove]').forEach((button) => { button.onclick = () => { const identity = button.dataset.pickerRemove; const target = (this.state.targetPicker.selected || []).find((item) => `${item.type}:${item.type === 'note' ? (item.noteId || item.path) : item.path}` === identity); if (target) this._call('onToggleTargetPicker', target); }; });
      const applyPicker = this.shadow.querySelector('[data-action="apply-target-picker"]');
      if (applyPicker) applyPicker.onclick = () => { const fileName = this.shadow.querySelector('[data-role="picker-file-name"]'); return this._call('onApplyTargetPicker', { fileName: fileName ? fileName.value : '' }); };
      this.shadow.querySelectorAll('[data-picker-tab]').forEach((button) => { button.onclick = () => this._call('onSetTargetPickerTab', button.dataset.pickerTab); });
      const renderedState = surface === 'files' ? this.state.fileRendered : this.state.noteRendered;
      if (renderedState) {
        const imageById = new Map((renderedState.imageResults || []).map((item) => [item.id, item]));
        this.shadow.querySelectorAll('[data-obs-image-id]').forEach((image) => {
          const result = imageById.get(image.dataset.obsImageId);
          if (result && result.status === 'loaded') { image.src = result.objectUrl; image.classList.remove('obs-md-image-pending'); }
          else if (result) { image.alt = `${image.alt || 'Image'} — ${result.message || result.status}`; image.title = result.message || result.status; }
        });
        this.shadow.querySelectorAll('[data-obs-link-target]').forEach((link) => { link.onclick = (event) => { event.preventDefault(); this._call('onOpenRenderedLink', link.dataset.obsLinkTarget, renderedState.source || {}); }; });
      }
      this.shadow.querySelectorAll('[data-category-file-open]').forEach((button) => { button.onclick = () => this._withAllDrafts('onOpenRepositoryEntry', { path: button.dataset.categoryFileOpen, type: 'file' }); });
      this.shadow.querySelectorAll('[data-category-file-remove]').forEach((button) => { button.onclick = () => this._call('onUnassignCategory', categoryEditor.id, button.dataset.categoryFileRemove); });
    }

  }

  return {
    LinkedNotesUI,
    escapeHtml,
    launcherRightOffset,
    panelViewportLayout,
    clampPanelPosition,
    shouldCloseOnEscape,
    blankWorkspaceEditor,
    mergeWorkspaceEditorPatch,
    mergeCategoryEditorPatch,
    mergeRepositoryEditorPatch,
    mergeVisibleCategorySelection
  };
});
