import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const readerApi = require('../src/chat-response-reader.js');
const markdownApi = require('../src/rich-markdown-renderer.js');
globalThis.ObsLinkedNotes = { ...readerApi, ...markdownApi };
const runtime = require('../src/chat-response-reader-runtime.js');

test('Reader runtime patches App/UI, keeps state local and copies original source', async () => {
  class FakeUI {
    constructor() { this.open = false; this.shadow = null; this.renderCount = 0; }
    render() { this.renderCount += 1; }
    mount() {}
    dispose() {}
  }
  class FakeApp {
    constructor() {
      this.api = { ...readerApi, ...markdownApi };
      this.ui = new FakeUI();
      this.clipboard = [];
      this.writes = [];
      this.remoteReads = [];
      this.clipboardWriter = async (value) => { this.clipboard.push(String(value)); };
    }
    async start() { return true; }
  }
  runtime.installChatResponseReader({ LinkedNotesApp: FakeApp, LinkedNotesUI: FakeUI, ...readerApi, ...markdownApi });
  const app = new FakeApp();
  await app.start();
  const source = '<details>\n<summary>More</summary>\n\n**Body**\n\n</details>';
  const state = app.openChatResponseReader({ markdown: source, sourceKind: 'paste', sourceAccuracy: 'exact', mode: 'rendered' });
  assert.equal(state.open, true);
  assert.equal(state.markdown, source);
  assert.equal(state.sourceAccuracy, 'exact');
  assert.equal(app.ui.open, true);
  const copied = await app.copyChatResponseReaderMarkdown();
  assert.equal(copied.markdown, source);
  assert.deepEqual(app.clipboard, [source]);
  assert.deepEqual(app.writes, []);
  assert.deepEqual(app.remoteReads, []);
  const closed = app.closeChatResponseReader();
  assert.equal(closed.open, false);
  assert.equal(closed.markdown, source);
});

test('DOM-derived Reader state is explicitly marked derived', async () => {
  class FakeUI { constructor() { this.open = false; this.shadow = null; } render() {} mount() {} dispose() {} }
  class FakeApp {
    constructor() { this.api = { ...readerApi, ...markdownApi }; this.ui = new FakeUI(); this.clipboardWriter = async () => {}; }
    async start() {}
  }
  runtime.installChatResponseReader({ LinkedNotesApp: FakeApp, LinkedNotesUI: FakeUI, ...readerApi, ...markdownApi });
  const app = new FakeApp();
  await app.start();
  const message = { nodeType: 1, tagName: 'DIV', nodeName: 'DIV', childNodes: [{ nodeType: 3, nodeValue: 'Derived response', textContent: 'Derived response', parentNode: null }], getAttribute() { return null; }, hasAttribute() { return false; }, textContent: 'Derived response' };
  message.childNodes[0].parentNode = message;
  const state = app.openChatResponseReaderFromElement(message, { conversationKey: '/c/test', messageKey: 'turn-1' });
  assert.equal(state.sourceKind, 'chat-dom');
  assert.equal(state.sourceAccuracy, 'derived');
  assert.equal(state.markdown, 'Derived response');
  assert.equal(state.conversationKey, '/c/test');
  assert.equal(state.messageKey, 'turn-1');
});

test('fresh Paste mode clears a prior derived response instead of relabelling it exact', async () => {
  class FakeUI { constructor() { this.open = false; this.shadow = null; } render() {} mount() {} dispose() {} }
  class FakeApp {
    constructor() { this.api = { ...readerApi, ...markdownApi }; this.ui = new FakeUI(); this.clipboardWriter = async () => {}; }
    async start() {}
  }
  runtime.installChatResponseReader({ LinkedNotesApp: FakeApp, LinkedNotesUI: FakeUI, ...readerApi, ...markdownApi });
  const app = new FakeApp();
  await app.start();
  app.openChatResponseReader({
    markdown: 'Derived response',
    mode: 'rendered',
    sourceKind: 'chat-dom',
    sourceAccuracy: 'derived',
    conversationKey: '/c/test',
    messageKey: 'turn-1',
    renderDiagnostics: [{ kind: 'derived' }]
  });
  app.closeChatResponseReader();
  const paste = app.openChatResponseReader({ mode: 'paste', sourceKind: 'paste', sourceAccuracy: 'exact', status: 'Paste exact Markdown and render locally.' });
  assert.equal(paste.sourceKind, 'paste');
  assert.equal(paste.sourceAccuracy, 'exact');
  assert.equal(paste.markdown, '');
  assert.equal(paste.conversationKey, '');
  assert.equal(paste.messageKey, '');
  assert.equal(paste.capturedAt, '');
  assert.deepEqual(paste.renderDiagnostics, []);
});


test('Reader modal layout is wide and viewport-bounded', () => {
  assert.deepEqual(runtime.readerModalLayout(1400, 1000), { width: 1200, height: 900, inset: 24 });
  assert.deepEqual(runtime.readerModalLayout(800, 600), { width: 736, height: 536, inset: 24 });
});

test('assistant action injection is idempotent and uses semantic role discovery', () => {
  const actionSelector = '[data-obs-chat-response-reader-action]';
  const message = {
    button: null,
    querySelector(selector) { return selector === actionSelector ? this.button : null; },
    appendChild(child) { this.button = child; },
    getAttribute() { return null; },
    closest() { return null; }
  };
  const documentObject = {
    querySelectorAll(selector) { return selector === '[data-message-author-role="assistant"]' ? [message] : []; },
    createElement() {
      const attrs = {};
      return {
        style: {},
        dataset: {},
        setAttribute(name, value) { attrs[name] = value; },
        getAttribute(name) { return attrs[name] || null; },
        addEventListener() {},
        remove() {}
      };
    }
  };
  const app = { api: { ...readerApi, ...markdownApi }, ui: null, clipboardWriter: async () => {} };
  assert.equal(runtime.injectAssistantActions(app, documentObject), 1);
  assert.equal(runtime.injectAssistantActions(app, documentObject), 0);
  assert.equal(message.button.textContent, 'Open in Reader');
});
