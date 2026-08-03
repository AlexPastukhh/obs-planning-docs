import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const refs = require('../src/markdown-image-references.js');
const target = require('../src/repository-target.js');
const api = { ...refs, ...target };

test('parses Markdown and img references and classifies repository, external and pending sources', () => {
  const parsed = refs.parseMarkdownImages('![A](../img/a.png)\n<img src="/assets/b.webp" alt="B">\n![E](https://example.test/e.png)\n![P](obs-pending-image:x)');
  assert.equal(parsed.length, 4);
  assert.equal(refs.classifyImageReference(parsed[0], 'docs/a.md', api).path, 'img/a.png');
  assert.equal(refs.classifyImageReference(parsed[1], 'docs/a.md', api).path, 'assets/b.webp');
  assert.equal(refs.classifyImageReference(parsed[2], 'docs/a.md', api).targetType, 'external');
  assert.equal(refs.classifyImageReference(parsed[3], 'docs/a.md', api).targetType, 'pending');
});

test('rewrites both Markdown and img sources without changing unrelated text', () => {
  const source = '![A](../img/a.png "T") and <img src="../img/b.png" alt="B">';
  const result = refs.rewriteImageReferences(source, new Map([['../img/a.png', './guide.assets/a.png'], ['../img/b.png', './guide.assets/b.png']]));
  assert.match(result, /<\.\/guide\.assets\/a\.png>/);
  assert.match(result, /src="\.\/guide\.assets\/b\.png"/);
  assert.match(result, /and/);
});


test('does not treat fenced or inline code examples as transferable images', () => {
  const markdown = 'real ![A](a.png)\n\n```md\n![Example](example.png)\n<img src="example-2.png">\n```\n\n`![Inline](inline.png)`';
  const refs = api.parseMarkdownImages(markdown);
  assert.deepEqual(refs.map((ref) => ref.source), ['a.png']);
});

test('supports reference, collapsed, shortcut, balanced-parenthesis, escaped and angle destinations', () => {
  const markdown = [
    '![Reference][diagram]',
    '![Collapsed][]',
    '![Shortcut]',
    '![Balanced](../img/result(1).png)',
    '![Escaped](../img/result\\(2\\).png "Escaped title")',
    '![Angle](<../img/a b.png> "Angle title")',
    '',
    '[diagram]: ../img/diagram.png "Reference title"',
    '[collapsed]: ../img/collapsed.png',
    '[shortcut]: ../img/shortcut.png'
  ].join('\n');
  const parsed = refs.parseMarkdownImages(markdown);
  assert.deepEqual(parsed.map((item) => item.source), [
    '../img/diagram.png',
    '../img/collapsed.png',
    '../img/shortcut.png',
    '../img/result(1).png',
    '../img/result(2).png',
    '../img/a b.png'
  ]);
  assert.deepEqual(parsed.map((item) => item.syntax), ['reference', 'collapsed-reference', 'shortcut-reference', 'inline', 'inline', 'inline']);
  assert.equal(parsed[0].title, 'Reference title');
  assert.equal(parsed[4].title, 'Escaped title');
});

test('rewrites reference occurrences inline and uses the first repeated definition', () => {
  const markdown = '![One][asset] and ![Two][asset]\n\n[asset]: ../img/first.png\n[asset]: ../img/second.png';
  const parsed = refs.parseMarkdownImages(markdown);
  assert.deepEqual(parsed.map((item) => item.source), ['../img/first.png', '../img/first.png']);
  const rewritten = refs.rewriteImageReferences(markdown, new Map([['../img/first.png', 'guide.assets/first.png']]));
  assert.match(rewritten, /!\[One\]\(<guide\.assets\/first\.png>\)/);
  assert.match(rewritten, /!\[Two\]\(<guide\.assets\/first\.png>\)/);
});

test('ignores definitions and image-like examples inside fenced and inline code', () => {
  const markdown = [
    '![Real][real]',
    '',
    '[real]: real.png',
    '',
    '```md',
    '![Fake][fake]',
    '[fake]: fake.png',
    '```',
    '`![Inline][inline]`',
    '[inline]: inline.png'
  ].join('\n');
  assert.deepEqual(refs.parseMarkdownImages(markdown).map((item) => item.source), ['real.png']);
});

test('malformed or unresolved image syntax is explicit instead of silently complete', () => {
  const parsed = refs.parseMarkdownImages('![Missing][no-definition]\n![Broken](../img/a.png');
  assert.equal(parsed.length, 2);
  assert.ok(parsed.every((item) => refs.classifyImageReference(item, 'docs/a.md', api).targetType === 'invalid'));
});

test('ignores image examples inside blockquoted fenced code', () => {
  const markdown = [
    '![Real](real.png)',
    '',
    '> ```md',
    '> ![Example](example.png)',
    '> <img src="example-2.png">',
    '> ```'
  ].join('\n');
  assert.deepEqual(refs.parseMarkdownImages(markdown).map((item) => item.source), ['real.png']);
});

test('ignores multiline code spans, indented code and HTML comments', () => {
  const markdown = [
    '![Real](real.png)',
    '',
    '`example',
    '![Inline multiline](inline.png)`',
    '',
    '    ![Indented](indented.png)',
    '',
    '<!-- ![Commented](commented.png) -->',
    '<!--',
    '<img src="commented-2.png">',
    '-->'
  ].join('\n');
  assert.deepEqual(refs.parseMarkdownImages(markdown).map((item) => item.source), ['real.png']);
});

test('ignores image examples inside raw HTML code-like containers', () => {
  const markdown = [
    '![Real](real.png)',
    '<pre>![Pre](pre.png)</pre>',
    '<code>![Code](code.png)</code>',
    '<textarea>![Textarea](textarea.png)</textarea>',
    '<script>const sample = "![Script](script.png)";</script>',
    '<style>/* ![Style](style.png) */</style>',
    '<pre><img src="pre-html.png"></pre>'
  ].join('\n');
  assert.deepEqual(refs.parseMarkdownImages(markdown).map((item) => item.source), ['real.png']);
});

test('an unclosed raw HTML code-like container protects the remainder', () => {
  const markdown = '![Real](real.png)\n<pre>\n![Example](example.png)\n<img src="example-2.png">';
  assert.deepEqual(refs.parseMarkdownImages(markdown).map((item) => item.source), ['real.png']);
});

test('inline code containing a pre tag does not hide a later real image', () => {
  const markdown = '`<pre>`\n\n![Real](real.png)';
  assert.deepEqual(refs.parseMarkdownImages(markdown).map((item) => item.source), ['real.png']);
});

test('inline code containing a code tag does not hide an image later on the line', () => {
  const markdown = 'Text `<code>` then ![Real](real.png)';
  assert.deepEqual(refs.parseMarkdownImages(markdown).map((item) => item.source), ['real.png']);
});

test('escaped raw code-like tag does not protect following Markdown', () => {
  const markdown = '\\<textarea>\n![Real](real.png)';
  assert.deepEqual(refs.parseMarkdownImages(markdown).map((item) => item.source), ['real.png']);
});

test('raw pre container hides only its sample and preserves a later real image', () => {
  const markdown = [
    '<pre>',
    '![Example](example.png)',
    '</pre>',
    '',
    '![Real](real.png)'
  ].join('\n');
  assert.deepEqual(refs.parseMarkdownImages(markdown).map((item) => item.source), ['real.png']);
});
