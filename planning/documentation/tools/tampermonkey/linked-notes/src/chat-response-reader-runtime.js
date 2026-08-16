(function (root, factory) {
  const api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
  if (root.ObsLinkedNotes && root.ObsLinkedNotes.LinkedNotesApp && root.ObsLinkedNotes.LinkedNotesUI) {
    try { api.installChatResponseReader(root.ObsLinkedNotes); } catch (error) { /* primary bootstrap remains authoritative */ }
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function (root) {
  'use strict';

  const APP_PATCH = '__obsChatResponseReaderAppV1';
  const UI_PATCH = '__obsChatResponseReaderUiV1';
  const RUNTIME_KEY = '__obsChatResponseReaderRuntimeV1';
  const ACTION_ATTR = 'data-obs-chat-response-reader-action';
  const UI_APP_BINDINGS = new WeakMap();
  const ACTIVE_UIS = new Set();
  let activeApp = null;
  let observer = null;

  function apiOrThrow(app) {
    const api = app && app.api || root.ObsLinkedNotes || {};
    const required = ['createChatResponseReaderState', 'serializeChatResponseDom', 'renderRichMarkdown'];
    for (const name of required) if (typeof api[name] !== 'function') throw new Error(`Chat Response Reader dependency is unavailable: ${name}.`);
    return api;
  }

  function errorText(error) { return String(error && error.message || error || 'Unknown error'); }

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function readerModalLayout(viewportWidth, viewportHeight) {
    const width = Math.max(320, Number(viewportWidth) || 0);
    const height = Math.max(320, Number(viewportHeight) || 0);
    return {
      width: Math.min(1200, Math.max(320, width - 64)),
      height: Math.min(900, Math.max(320, height - 64)),
      inset: 24
    };
  }

  function ensureReaderState(app) {
    const api = apiOrThrow(app);
    if (!app.chatResponseReader || Number(app.chatResponseReader.schemaVersion) !== 1) {
      app.chatResponseReader = api.createChatResponseReaderState({ open: false, mode: 'paste', sourceKind: 'paste', sourceAccuracy: 'exact' });
    }
    return app.chatResponseReader;
  }

  function setReaderState(app, patch = {}) {
    const api = apiOrThrow(app);
    const current = ensureReaderState(app);
    app.chatResponseReader = api.createChatResponseReaderState({ ...current, ...patch });
    return app.chatResponseReader;
  }

  function readerSourceLabel(state) {
    if (!state) return 'No response loaded.';
    if (state.sourceKind === 'chat-dom') return state.sourceAccuracy === 'derived' ? 'Source: ChatGPT rendered DOM · derived Markdown' : 'Source: ChatGPT response';
    return 'Source: pasted Markdown · exact text';
  }

  function closeModalElement(ui) {
    const modal = ui && ui.shadow && ui.shadow.querySelector('[data-chat-response-reader-modal]');
    if (modal) modal.remove();
  }

  function renderProjection(app, modal) {
    const state = ensureReaderState(app);
    const api = apiOrThrow(app);
    const target = modal && modal.querySelector('[data-chat-response-reader-rendered]');
    if (!target) return null;
    const rendered = api.renderRichMarkdown(state.markdown || '');
    target.innerHTML = rendered.html || '<div class="empty">Nothing to render.</div>';
    for (const link of Array.from(target.querySelectorAll ? target.querySelectorAll('a') : [])) {
      link.addEventListener('click', (event) => { event.preventDefault(); event.stopPropagation(); });
      link.setAttribute('title', 'Links are inert in Chat Response Reader.');
    }
    const status = modal.querySelector('[data-chat-response-reader-status]');
    if (status) {
      const resourceNote = rendered.resources && rendered.resources.length ? ` · ${rendered.resources.length} image resource(s) remain unloaded` : '';
      status.textContent = `${state.status || 'Rendered locally.'}${resourceNote}`;
    }
    return rendered;
  }

  function updateModalMode(app, modal) {
    const state = ensureReaderState(app);
    const paste = modal.querySelector('[data-chat-response-reader-paste]');
    const rendered = modal.querySelector('[data-chat-response-reader-view]');
    const source = modal.querySelector('[data-chat-response-reader-source]');
    const textarea = modal.querySelector('[data-chat-response-reader-input]');
    if (source) source.textContent = readerSourceLabel(state);
    if (textarea && textarea.value !== state.markdown) textarea.value = state.markdown || '';
    if (paste) paste.hidden = state.mode !== 'paste';
    if (rendered) rendered.hidden = state.mode !== 'rendered';
    if (state.mode === 'rendered') renderProjection(app, modal);
  }

  function mountReaderModal(ui, app) {
    if (!ui || !ui.shadow || !app) return null;
    const current = ui.shadow.querySelector('[data-chat-response-reader-modal]');
    if (current) { updateModalMode(app, current); return current; }
    const modal = document.createElement('div');
    modal.dataset.chatResponseReaderModal = '1';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-label', 'Chat Response Reader');
    modal.innerHTML = `<div data-chat-response-reader-card><style>
      [data-chat-response-reader-card]{font:14px/1.45 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color-scheme:dark}
      [data-chat-response-reader-head],[data-chat-response-reader-actions]{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
      [data-chat-response-reader-head]{justify-content:space-between}
      [data-chat-response-reader-actions]{justify-content:flex-start}
      [data-chat-response-reader-card] button,[data-chat-response-reader-card] textarea{font:inherit}
      [data-chat-response-reader-card] button{border:1px solid var(--border,#3b4250);border-radius:7px;padding:6px 10px;background:var(--surface-2,#20242d);color:var(--text,#eef1f6);cursor:pointer}
      [data-chat-response-reader-card] button:hover{background:var(--surface-3,#292e39)}
      [data-chat-response-reader-card] button.primary{font-weight:700;background:#315b9d;color:#fff;border-color:#4a78bd}
      [data-chat-response-reader-input]{box-sizing:border-box;width:100%;height:100%;min-height:220px;resize:none;border:1px solid var(--border,#3b4250);border-radius:8px;padding:10px;background:var(--surface-2,#20242d);color:var(--text,#eef1f6)}
      [data-chat-response-reader-input]::placeholder{color:var(--muted,#aab2c0)}
      [data-chat-response-reader-view]{min-height:0;overflow:auto;border:1px solid var(--border,#3b4250);border-radius:8px;padding:16px;background:var(--surface,#191c23);color:var(--text,#eef1f6)}
      [data-chat-response-reader-rendered]{max-width:980px;margin:0 auto}
      [data-chat-response-reader-rendered] pre{overflow:auto;padding:10px;border-radius:8px;background:rgba(127,127,127,.12)}
      [data-chat-response-reader-rendered] table{border-collapse:collapse;max-width:100%;display:block;overflow:auto}
      [data-chat-response-reader-rendered] th,[data-chat-response-reader-rendered] td{border:1px solid var(--border,#3b4250);padding:6px 8px}
      [data-chat-response-reader-rendered] .obs-md-details{border:1px solid var(--border,#3b4250);border-radius:8px;padding:8px 10px;margin:10px 0}
      [data-chat-response-reader-rendered] .obs-md-summary{cursor:pointer;font-weight:650}
      [data-chat-response-reader-rendered] .obs-md-details-body{padding:6px 2px 2px 14px}
      [data-chat-response-reader-rendered] img{max-width:100%}
      [data-chat-response-reader-source],[data-chat-response-reader-status]{color:var(--muted,#aab2c0);font-size:12px}
    </style><div data-chat-response-reader-head><strong>Chat Response Reader</strong><button type="button" data-chat-response-reader-command="close">Close</button></div><div data-chat-response-reader-source></div><div data-chat-response-reader-actions><button type="button" data-chat-response-reader-command="paste">Paste Markdown</button><button type="button" class="primary" data-chat-response-reader-command="copy">Copy Markdown</button></div><div data-chat-response-reader-status>Local reader. No repository request or write is performed.</div><section data-chat-response-reader-paste><textarea data-chat-response-reader-input spellcheck="false" placeholder="Paste Markdown from ChatGPT here…"></textarea><div style="margin-top:8px"><button type="button" class="primary" data-chat-response-reader-command="render">Render pasted Markdown</button></div></section><section data-chat-response-reader-view><div data-chat-response-reader-rendered></div></section></div>`;
    const viewportWidth = typeof window !== 'undefined' ? (window.visualViewport && window.visualViewport.width || window.innerWidth || 1200) : 1200;
    const viewportHeight = typeof window !== 'undefined' ? (window.visualViewport && window.visualViewport.height || window.innerHeight || 900) : 900;
    const layout = readerModalLayout(viewportWidth, viewportHeight);
    Object.assign(modal.style, { position: 'fixed', inset: `${layout.inset}px`, zIndex: '2147483647', background: 'rgba(0,0,0,.42)', display: 'grid', placeItems: 'center' });
    const card = modal.querySelector('[data-chat-response-reader-card]');
    Object.assign(card.style, { boxSizing: 'border-box', width: `${layout.width}px`, height: `${layout.height}px`, maxWidth: 'calc(100vw - 64px)', maxHeight: 'calc(100vh - 64px)', background: 'var(--bg,#111318)', color: 'var(--text,#eef1f6)', border: '1px solid var(--border,#3b4250)', borderRadius: '12px', padding: '12px', display: 'grid', gridTemplateRows: 'auto auto auto auto minmax(0,1fr)', gap: '8px', boxShadow: '0 18px 50px rgba(0,0,0,.55)', colorScheme: 'dark' });

    modal.querySelector('[data-chat-response-reader-command="close"]').onclick = () => {
      setReaderState(app, { open: false, status: 'Reader closed.' });
      closeModalElement(ui);
    };
    modal.querySelector('[data-chat-response-reader-command="paste"]').onclick = () => {
      setReaderState(app, {
        open: true,
        mode: 'paste',
        sourceKind: 'paste',
        sourceAccuracy: 'exact',
        conversationKey: '',
        messageKey: '',
        markdown: '',
        capturedAt: '',
        renderDiagnostics: [],
        status: 'Paste exact Markdown and render locally.'
      });
      updateModalMode(app, modal);
      const textarea = modal.querySelector('[data-chat-response-reader-input]');
      if (textarea && textarea.focus) textarea.focus();
    };
    modal.querySelector('[data-chat-response-reader-command="render"]').onclick = () => {
      const textarea = modal.querySelector('[data-chat-response-reader-input]');
      setReaderState(app, {
        open: true,
        mode: 'rendered',
        sourceKind: 'paste',
        sourceAccuracy: 'exact',
        conversationKey: '',
        messageKey: '',
        markdown: textarea ? textarea.value : '',
        capturedAt: new Date().toISOString(),
        renderDiagnostics: [],
        status: 'Rendered exact pasted Markdown locally.'
      });
      updateModalMode(app, modal);
    };
    modal.querySelector('[data-chat-response-reader-command="copy"]').onclick = async () => {
      const status = modal.querySelector('[data-chat-response-reader-status]');
      try {
        const state = ensureReaderState(app);
        if (!state.markdown) throw new Error('Reader source is empty.');
        if (typeof app.clipboardWriter !== 'function') throw new Error('Clipboard writer is unavailable.');
        await app.clipboardWriter(state.markdown);
        if (status) status.textContent = `Markdown copied (${new TextEncoder().encode(state.markdown).byteLength} bytes).`;
      } catch (error) {
        if (status) status.textContent = `Copy failed: ${errorText(error)}`;
      }
    };
    ui.shadow.appendChild(modal);
    updateModalMode(app, modal);
    return modal;
  }

  function ensureUiVisible(ui) {
    if (!ui) return;
    if (!ui.open) {
      ui.open = true;
      if (typeof ui.render === 'function') ui.render();
    }
  }

  function openReader(app, input = {}) {
    const current = ensureReaderState(app);
    const hasMarkdown = Object.prototype.hasOwnProperty.call(input, 'markdown');
    const requestedKind = input.sourceKind || current.sourceKind || 'paste';
    const freshPaste = input.mode === 'paste' && requestedKind === 'paste' && !hasMarkdown;
    const markdown = freshPaste ? '' : hasMarkdown ? String(input.markdown == null ? '' : input.markdown) : current.markdown;
    const state = setReaderState(app, {
      open: true,
      mode: input.mode === 'paste' || !markdown ? 'paste' : 'rendered',
      sourceKind: freshPaste ? 'paste' : requestedKind,
      sourceAccuracy: freshPaste ? 'exact' : (input.sourceAccuracy || current.sourceAccuracy || 'exact'),
      conversationKey: freshPaste ? '' : Object.prototype.hasOwnProperty.call(input, 'conversationKey') ? String(input.conversationKey || '') : current.conversationKey,
      messageKey: freshPaste ? '' : Object.prototype.hasOwnProperty.call(input, 'messageKey') ? String(input.messageKey || '') : current.messageKey,
      markdown,
      capturedAt: freshPaste ? '' : (input.capturedAt || (markdown ? new Date().toISOString() : current.capturedAt)),
      renderDiagnostics: freshPaste ? [] : (Array.isArray(input.renderDiagnostics) ? input.renderDiagnostics : current.renderDiagnostics),
      status: String(input.status || (input.sourceKind === 'chat-dom' ? 'Rendered DOM-derived Markdown locally.' : 'Paste exact Markdown and render locally.'))
    });
    const ui = app.ui;
    if (ui) {
      ensureUiVisible(ui);
      UI_APP_BINDINGS.set(ui, app);
      mountReaderModal(ui, app);
    }
    return state;
  }

  function openReaderFromAssistantElement(app, element, metadata = {}) {
    const api = apiOrThrow(app);
    const result = api.serializeChatResponseDom(element);
    if (!result.markdown) {
      return openReader(app, {
        mode: 'paste',
        sourceKind: 'chat-dom',
        sourceAccuracy: 'derived',
        conversationKey: metadata.conversationKey || '',
        messageKey: metadata.messageKey || '',
        markdown: '',
        renderDiagnostics: result.diagnostics,
        status: 'Could not derive readable Markdown from this response. Paste exact Markdown instead.'
      });
    }
    return openReader(app, {
      mode: 'rendered',
      sourceKind: 'chat-dom',
      sourceAccuracy: 'derived',
      conversationKey: metadata.conversationKey || '',
      messageKey: metadata.messageKey || '',
      markdown: result.markdown,
      renderDiagnostics: result.diagnostics,
      status: `Rendered DOM-derived Markdown locally${result.diagnostics.length ? ` with ${result.diagnostics.length} extraction diagnostic(s)` : ''}.`
    });
  }

  function closeReader(app) {
    const state = setReaderState(app, { open: false, status: 'Reader closed.' });
    if (app.ui) closeModalElement(app.ui);
    return state;
  }

  async function copyReaderMarkdown(app) {
    const state = ensureReaderState(app);
    if (!state.markdown) throw new Error('Reader source is empty.');
    if (typeof app.clipboardWriter !== 'function') throw new Error('Clipboard writer is unavailable.');
    await app.clipboardWriter(state.markdown);
    return { bytes: new TextEncoder().encode(state.markdown).byteLength, markdown: state.markdown };
  }

  function assistantMessageNodes(documentObject = typeof document !== 'undefined' ? document : null) {
    if (!documentObject || typeof documentObject.querySelectorAll !== 'function') return [];
    return Array.from(documentObject.querySelectorAll('[data-message-author-role="assistant"]'));
  }

  function messageKeyForAssistant(element, index = 0) {
    if (!element) return `assistant-${index}`;
    const direct = attributeValue(element, 'data-message-id');
    if (direct) return direct;
    const turn = typeof element.closest === 'function' ? element.closest('[data-testid^="conversation-turn-"]') : null;
    const testId = attributeValue(turn, 'data-testid');
    return testId || `assistant-${index}`;
  }

  function attributeValue(element, name) {
    if (!element || typeof element.getAttribute !== 'function') return '';
    const value = element.getAttribute(name);
    return value == null ? '' : String(value);
  }

  function removeInjectedActions(documentObject = typeof document !== 'undefined' ? document : null) {
    if (!documentObject || typeof documentObject.querySelectorAll !== 'function') return;
    for (const element of Array.from(documentObject.querySelectorAll(`[${ACTION_ATTR}]`))) element.remove();
  }

  function injectAssistantActions(app, documentObject = typeof document !== 'undefined' ? document : null) {
    if (!app || !documentObject || typeof documentObject.createElement !== 'function') return 0;
    const messages = assistantMessageNodes(documentObject);
    let added = 0;
    messages.forEach((message, index) => {
      if (!message || typeof message.querySelector !== 'function' || message.querySelector(`[${ACTION_ATTR}]`)) return;
      const button = documentObject.createElement('button');
      button.type = 'button';
      button.setAttribute(ACTION_ATTR, '1');
      button.textContent = 'Open in Reader';
      button.title = 'Open this assistant response in OBS Linked Notes Reader';
      Object.assign(button.style, { marginTop: '6px', padding: '3px 7px', borderRadius: '6px', border: '1px solid currentColor', opacity: '.68', background: 'transparent', color: 'inherit', font: '12px/1.2 system-ui,sans-serif', cursor: 'pointer' });
      button.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        openReaderFromAssistantElement(app, message, {
          conversationKey: typeof location !== 'undefined' ? String(location.pathname || '') : '',
          messageKey: messageKeyForAssistant(message, index)
        });
      });
      message.appendChild(button);
      added += 1;
    });
    return added;
  }

  function activateObserver(app) {
    activeApp = app;
    if (observer) { observer.disconnect(); observer = null; }
    injectAssistantActions(app);
    if (typeof MutationObserver !== 'function' || typeof document === 'undefined' || !document.body) return;
    observer = new MutationObserver(() => { if (activeApp) injectAssistantActions(activeApp); });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  function attachUi(ui) {
    if (!ui || ACTIVE_UIS.has(ui) || typeof window === 'undefined' || typeof window.addEventListener !== 'function') return;
    const handler = (event) => {
      const app = UI_APP_BINDINGS.get(ui);
      if (!app || !ensureReaderState(app).open || !event || event.key !== 'Escape') return;
      event.preventDefault();
      if (typeof event.stopImmediatePropagation === 'function') event.stopImmediatePropagation();
      else if (typeof event.stopPropagation === 'function') event.stopPropagation();
      closeReader(app);
    };
    Object.defineProperty(ui, '__obsChatResponseReaderEscapeHandler', { value: handler, configurable: true, enumerable: false, writable: true });
    window.addEventListener('keydown', handler, true);
    ACTIVE_UIS.add(ui);
  }

  function detachUi(ui) {
    if (!ui || !ACTIVE_UIS.has(ui)) return;
    const handler = ui.__obsChatResponseReaderEscapeHandler;
    if (typeof window !== 'undefined' && typeof window.removeEventListener === 'function' && handler) window.removeEventListener('keydown', handler, true);
    try { delete ui.__obsChatResponseReaderEscapeHandler; } catch (error) { /* non-critical */ }
    closeModalElement(ui);
    ACTIVE_UIS.delete(ui);
  }

  function enhanceUi(ui) {
    if (!ui || !ui.shadow || !ui.open) return;
    const app = UI_APP_BINDINGS.get(ui);
    const bar = ui.shadow.querySelector('.workspace-bar');
    if (bar && app && !bar.querySelector('[data-chat-response-reader-command="open"]')) {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = 'Reader';
      button.dataset.chatResponseReaderCommand = 'open';
      button.onclick = () => openReader(app, { mode: 'paste', sourceKind: 'paste', sourceAccuracy: 'exact', status: 'Paste exact Markdown and render locally.' });
      bar.appendChild(button);
    }
    if (app && ensureReaderState(app).open) mountReaderModal(ui, app);
  }

  function bindApp(app) {
    ensureReaderState(app);
    activeApp = app;
    if (app.ui) {
      UI_APP_BINDINGS.set(app.ui, app);
      attachUi(app.ui);
      enhanceUi(app.ui);
    }
    activateObserver(app);
  }

  function disposeRuntime() {
    if (observer) { observer.disconnect(); observer = null; }
    activeApp = null;
    removeInjectedActions();
    for (const ui of Array.from(ACTIVE_UIS)) detachUi(ui);
  }

  function patchApp(App) {
    if (!App || !App.prototype) return false;
    if (!App.prototype[APP_PATCH]) {
      Object.defineProperty(App.prototype, APP_PATCH, { value: true, configurable: false, enumerable: false, writable: false });
      const originalStart = App.prototype.start;
      if (typeof originalStart === 'function') {
        App.prototype.start = async function chatResponseReaderStart(...args) {
          const result = await originalStart.apply(this, args);
          const runtime = root[RUNTIME_KEY];
          if (runtime && typeof runtime.bindApp === 'function') runtime.bindApp(this);
          return result;
        };
      }
      App.prototype.openChatResponseReader = function openChatResponseReader(input = {}) {
        const runtime = root[RUNTIME_KEY];
        if (!runtime || typeof runtime.openReader !== 'function') throw new Error('Chat Response Reader runtime is unavailable.');
        return runtime.openReader(this, input);
      };
      App.prototype.openChatResponseReaderFromElement = function openChatResponseReaderFromElement(element, metadata = {}) {
        const runtime = root[RUNTIME_KEY];
        if (!runtime || typeof runtime.openReaderFromAssistantElement !== 'function') throw new Error('Chat Response Reader runtime is unavailable.');
        return runtime.openReaderFromAssistantElement(this, element, metadata);
      };
      App.prototype.closeChatResponseReader = function closeChatResponseReader() {
        const runtime = root[RUNTIME_KEY];
        if (!runtime || typeof runtime.closeReader !== 'function') throw new Error('Chat Response Reader runtime is unavailable.');
        return runtime.closeReader(this);
      };
      App.prototype.copyChatResponseReaderMarkdown = function copyChatResponseReaderMarkdown() {
        const runtime = root[RUNTIME_KEY];
        if (!runtime || typeof runtime.copyReaderMarkdown !== 'function') throw new Error('Chat Response Reader runtime is unavailable.');
        return runtime.copyReaderMarkdown(this);
      };
    }
    return true;
  }

  function patchUi(UI) {
    if (!UI || !UI.prototype) return false;
    if (!UI.prototype[UI_PATCH]) {
      Object.defineProperty(UI.prototype, UI_PATCH, { value: true, configurable: false, enumerable: false, writable: false });
      const originalRender = UI.prototype.render;
      if (typeof originalRender === 'function') {
        UI.prototype.render = function chatResponseReaderRender(...args) {
          const result = originalRender.apply(this, args);
          const runtime = root[RUNTIME_KEY];
          if (runtime && typeof runtime.enhanceUi === 'function') {
            try { runtime.enhanceUi(this); } catch (error) { /* Reader must not break primary UI */ }
          }
          return result;
        };
      }
      const originalMount = UI.prototype.mount;
      if (typeof originalMount === 'function') {
        UI.prototype.mount = function chatResponseReaderMount(...args) {
          const result = originalMount.apply(this, args);
          const runtime = root[RUNTIME_KEY];
          if (runtime && typeof runtime.attachUi === 'function') runtime.attachUi(this);
          return result;
        };
      }
      const originalDispose = UI.prototype.dispose;
      if (typeof originalDispose === 'function') {
        UI.prototype.dispose = function chatResponseReaderDispose(...args) {
          const runtime = root[RUNTIME_KEY];
          if (runtime && typeof runtime.detachUi === 'function') runtime.detachUi(this);
          return originalDispose.apply(this, args);
        };
      }
    }
    return true;
  }

  function installChatResponseReader(namespace = root.ObsLinkedNotes || {}) {
    const prior = root[RUNTIME_KEY];
    if (prior && typeof prior.dispose === 'function') {
      try { prior.dispose(); } catch (error) { /* best effort */ }
    }
    const runtime = { dispose: disposeRuntime, bindApp, enhanceUi, attachUi, detachUi, injectAssistantActions, openReader, openReaderFromAssistantElement, closeReader, copyReaderMarkdown };
    root[RUNTIME_KEY] = runtime;
    const appPatched = patchApp(namespace.LinkedNotesApp);
    const uiPatched = patchUi(namespace.LinkedNotesUI);
    return { appPatched, uiPatched };
  }

  return {
    RUNTIME_KEY,
    ACTION_ATTR,
    readerModalLayout,
    assistantMessageNodes,
    messageKeyForAssistant,
    injectAssistantActions,
    openReader,
    openReaderFromAssistantElement,
    closeReader,
    copyReaderMarkdown,
    installChatResponseReader
  };
});
