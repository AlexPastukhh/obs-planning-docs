import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const reader = require('../src/chat-response-reader.js');

function text(value) {
  return { nodeType: 3, nodeValue: String(value), textContent: String(value), parentNode: null };
}
function element(tag, attrs = {}, children = []) {
  const node = {
    nodeType: 1,
    tagName: String(tag).toUpperCase(),
    nodeName: String(tag).toUpperCase(),
    childNodes: [],
    parentNode: null,
    className: attrs.class || '',
    open: Boolean(attrs.open),
    getAttribute(name) { return Object.prototype.hasOwnProperty.call(attrs, name) ? String(attrs[name]) : null; },
    hasAttribute(name) { return Object.prototype.hasOwnProperty.call(attrs, name); },
    textContent: ''
  };
  node.childNodes = children;
  for (const child of children) if (child && typeof child === 'object') child.parentNode = node;
  Object.defineProperty(node, 'textContent', { get() { return node.childNodes.map((child) => String(child && child.textContent != null ? child.textContent : child && child.nodeValue || '')).join(''); } });
  return node;
}

test('reader state keeps exact pasted Markdown and explicit source accuracy', () => {
  const source = '<details>\r\n<summary>A</summary>\r\n\r\nBody\r\n</details>';
  const state = reader.createChatResponseReaderState({ open: true, mode: 'rendered', sourceKind: 'paste', markdown: source });
  assert.equal(state.markdown, source);
  assert.equal(state.sourceAccuracy, 'exact');
  assert.equal(state.sourceKind, 'paste');
});

test('source accuracy is invariant: chat DOM is always derived and paste is always exact', () => {
  const derived = reader.createChatResponseReaderState({ sourceKind: 'chat-dom', sourceAccuracy: 'exact', markdown: 'DOM text' });
  assert.equal(derived.sourceAccuracy, 'derived');
  const pasted = reader.createChatResponseReaderState({ sourceKind: 'paste', sourceAccuracy: 'derived', markdown: 'Pasted text' });
  assert.equal(pasted.sourceAccuracy, 'exact');
});


test('DOM-derived serializer reconstructs common Markdown and preserves details intent', () => {
  const tree = element('article', {}, [
    element('h2', {}, [text('Answer')]),
    element('p', {}, [text('Before '), element('strong', {}, [text('bold')])]),
    element('details', { open: '' }, [
      element('summary', {}, [text('More')]),
      element('p', {}, [text('Inside')])
    ]),
    element('pre', {}, [element('code', { class: 'language-js' }, [text('const x = 1;')])])
  ]);
  const result = reader.serializeChatResponseDom(tree);
  assert.match(result.markdown, /^## Answer/m);
  assert.match(result.markdown, /Before \*\*bold\*\*/);
  assert.match(result.markdown, /<details open>/);
  assert.match(result.markdown, /<summary>More<\/summary>/);
  assert.match(result.markdown, /```js\nconst x = 1;\n```/);
});

test('injected Reader action buttons are excluded from DOM-derived Markdown', () => {
  const tree = element('div', {}, [
    element('p', {}, [text('Actual response')]),
    element('button', { 'data-obs-chat-response-reader-action': '1' }, [text('Open in Reader')])
  ]);
  const result = reader.serializeChatResponseDom(tree);
  assert.equal(result.markdown, 'Actual response');
  assert.doesNotMatch(result.markdown, /Open in Reader/);
});

test('unsafe DOM links do not become active Markdown destinations', () => {
  const tree = element('p', {}, [
    element('a', { href: 'javascript:alert(1)' }, [text('bad')]),
    text(' and '),
    element('a', { href: 'https://example.com/a' }, [text('good')])
  ]);
  const result = reader.serializeChatResponseDom(tree);
  assert.match(result.markdown, /^bad and \[good\]\(https:\/\/example\.com\/a\)$/);
  assert.doesNotMatch(result.markdown, /javascript:/i);
});

test('unknown DOM elements remain readable and produce extraction diagnostics', () => {
  const tree = element('custom-thing', {}, [text('Visible')]);
  const result = reader.serializeChatResponseDom(tree);
  assert.equal(result.markdown, 'Visible');
  assert.equal(result.diagnostics[0].kind, 'unrecognized-element');
  assert.equal(result.diagnostics[0].tag, 'custom-thing');
});
