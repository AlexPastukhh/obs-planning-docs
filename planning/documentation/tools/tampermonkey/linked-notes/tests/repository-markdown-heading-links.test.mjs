import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const here = dirname(fileURLToPath(import.meta.url));
const api = require('../src/repository-markdown-heading-links.js');

test('extracts ATX and Setext headings in document order with hierarchy levels', () => {
  const headings = api.extractRepositoryMarkdownHeadings('# Combat\n\nExposure\n--------\n### Noise and visibility\n');
  assert.deepEqual(headings, [
    { level: 1, text: 'Combat', anchor: 'combat' },
    { level: 2, text: 'Exposure', anchor: 'exposure' },
    { level: 3, text: 'Noise and visibility', anchor: 'noise-and-visibility' }
  ]);
});

test('accounts for headings inside block quotes and list items in duplicate allocation', () => {
  const headings = api.extractRepositoryMarkdownHeadings('> ## Combat\n\n- Combat\n  ------\n\n## Combat\n');
  assert.deepEqual(headings.map(({ level, text, anchor }) => ({ level, text, anchor })), [
    { level: 2, text: 'Combat', anchor: 'combat' },
    { level: 2, text: 'Combat', anchor: 'combat-1' },
    { level: 2, text: 'Combat', anchor: 'combat-2' }
  ]);
});

test('does not misread lazy block quote or list paragraph continuations as Setext headings', () => {
  const markdown = '> quoted\nlazy continuation\n===\n\n- listed\nlazy continuation\n---\n\n## Real\n';
  assert.deepEqual(api.extractRepositoryMarkdownHeadings(markdown), [{ level: 2, text: 'Real', anchor: 'real' }]);
});

test('ignores headings inside fenced and indented code', () => {
  const headings = api.extractRepositoryMarkdownHeadings('# Real\n```md\n# Fenced\n```\n    ## Indented\n~~~\n### Tilde fenced\n~~~\n## Also real\n');
  assert.deepEqual(headings.map((item) => item.text), ['Real', 'Also real']);
});

test('removes inline Markdown formatting and decodes basic entities while retaining heading text', () => {
  const headings = api.extractRepositoryMarkdownHeadings('## **Risk** &amp; [reward](./reward.md) with `code`\n');
  assert.deepEqual(headings, [{ level: 2, text: 'Risk & reward with code', anchor: 'risk--reward-with-code' }]);
});

test('uses the browser HTML parser for HTML5 named entities outside code spans while keeping code-span entities literal', () => {
  const replacements = new Map([
    ['&copy;', '©'],
    ['&AElig;', 'Æ'],
    ['&ngE;', '≧̸'],
    ['&amp;', '&']
  ]);
  const documentLike = {
    createElement(name) {
      assert.equal(name, 'textarea');
      let decoded = '';
      return {
        set innerHTML(value) {
          decoded = String(value).replace(/&(?:copy|AElig|ngE|amp);/g, (entity) => replacements.get(entity) || entity);
        },
        get value() { return decoded; }
      };
    }
  };

  const visible = api.stripRepositoryHeadingMarkdown('Outside &copy; `&copy;` &ngE;', { documentLike });
  assert.equal(visible, 'Outside © &copy; ≧̸');

  const headings = api.extractRepositoryMarkdownHeadings('## Name &AElig; `&amp;`\n', { documentLike });
  assert.deepEqual(headings, [{ level: 2, text: 'Name Æ &amp;', anchor: 'name-æ-amp' }]);
});

test('normalizes code spans before anchor generation without parsing their Markdown or character references', () => {
  const headings = api.extractRepositoryMarkdownHeadings('## Code `` *x* &amp; `y` ``\n');
  assert.deepEqual(headings, [{ level: 2, text: 'Code *x* &amp; `y`', anchor: 'code-x-amp-y' }]);
});

test('replaces invalid numeric character references in the no-DOM fallback', () => {
  assert.equal(api.decodeRepositoryHeadingEntities('x &#0; &#x110000; y'), 'x � � y');
});

test('deduplicates anchors across mixed heading forms without colliding with natural suffixes', () => {
  const headings = api.extractRepositoryMarkdownHeadings('## Combat\n\nCombat\n------\n\n> ## Combat-1\n\n- ### Combat\n');
  assert.deepEqual(headings.map((item) => item.anchor), ['combat', 'combat-1', 'combat-1-1', 'combat-2']);
});

test('keeps Unicode letters and numbers in anchors', () => {
  const headings = api.extractRepositoryMarkdownHeadings('Риск Θ 2\n========\n');
  assert.deepEqual(headings, [{ level: 1, text: 'Риск Θ 2', anchor: 'риск-θ-2' }]);
});

test('builds ready root-relative Markdown links with encoded path segments', () => {
  const preview = { kind: 'text', path: 'game design/боевой цикл.md', content: '## Exposure\n' };
  const [link] = api.repositoryHeadingLinksForPreview(preview);
  assert.equal(link.target, '/game%20design/%D0%B1%D0%BE%D0%B5%D0%B2%D0%BE%D0%B9%20%D1%86%D0%B8%D0%BA%D0%BB.md#exposure');
  assert.equal(link.markdown, '[Exposure](/game%20design/%D0%B1%D0%BE%D0%B5%D0%B2%D0%BE%D0%B9%20%D1%86%D0%B8%D0%BA%D0%BB.md#exposure)');
});

test('rejects paths that can escape or contain fragment syntax', () => {
  assert.throws(() => api.repositoryRootHeadingTarget('../secret.md', 'x'), /inside the repository root/);
  assert.throws(() => api.repositoryRootHeadingTarget('docs/file.md#bad', 'x'), /unsupported syntax/);
});

test('returns no heading links for non-Markdown previews', () => {
  assert.deepEqual(api.repositoryHeadingLinksForPreview({ kind: 'text', path: 'docs/file.txt', content: '# Not Markdown' }), []);
});

test('legacy clipboard writer resolves only after the documented success callback', async () => {
  let callback = null;
  let resolved = false;
  const promise = api.writeTampermonkeyClipboardText('hello', {
    gmSetClipboard(data, type, cb) {
      assert.equal(data, 'hello');
      assert.equal(type, 'text');
      callback = cb;
    },
    setTimeoutFn() { return 123; },
    clearTimeoutFn(id) { assert.equal(id, 123); }
  });
  promise.then(() => { resolved = true; });
  await Promise.resolve();
  assert.equal(resolved, false);
  callback();
  await promise;
  assert.equal(resolved, true);
});

test('legacy clipboard writer rejects synchronous errors and missing success confirmation', async () => {
  await assert.rejects(api.writeTampermonkeyClipboardText('x', {
    gmSetClipboard() { throw new Error('denied'); },
    setTimeoutFn() { return 1; },
    clearTimeoutFn() {}
  }), /denied/);

  let timeoutCallback = null;
  const pending = api.writeTampermonkeyClipboardText('x', {
    gmSetClipboard() {},
    setTimeoutFn(fn) { timeoutCallback = fn; return 2; },
    clearTimeoutFn() {}
  });
  timeoutCallback();
  await assert.rejects(pending, /not confirmed/);
});


test('Files UI routes clipboard writes through the injected app boundary', async () => {
  const ui = await readFile(join(here, '..', 'src', 'linked-notes-ui.js'), 'utf8');
  const app = await readFile(join(here, '..', 'src', 'linked-notes-app.js'), 'utf8');
  assert.match(ui, /onCopyRepositoryHeadingLink/);
  assert.doesNotMatch(ui, /GM_setClipboard/);
  assert.match(app, /this\.clipboardWriter = options\.clipboardWriter/);
  assert.match(app, /onCopyRepositoryHeadingLink/);
});
