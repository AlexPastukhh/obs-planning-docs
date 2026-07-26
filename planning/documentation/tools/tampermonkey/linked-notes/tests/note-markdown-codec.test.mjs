import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const codec = require('../src/note-markdown-codec.js');

test('round-trips Unicode title, literal body and structured links exactly', () => {
  const note = {
    id: 'note-русский',
    title: 'Проверка -- title',
    body: 'Первая строка\n\n```js\nconst x = 1;\n```\n',
    links: [
      { id: 'l1', type: 'repository', label: 'Фрагмент', target: { path: 'docs/a.md', anchor: 'stable-a' } },
      { id: 'l2', type: 'note', label: 'B', target: { noteId: 'note-b' } }
    ],
    codecExtra: { futureField: 'preserved' }
  };
  const markdown = codec.encodeNoteMarkdown(note);
  assert.match(markdown, /^<!-- obs-linked-note:v1 /);
  assert.equal(markdown.split('\n', 1)[0].includes('Проверка -- title'), false, 'double hyphen is escaped inside metadata');
  const decoded = codec.decodeNoteMarkdown(markdown);
  assert.equal(decoded.id, note.id);
  assert.equal(decoded.title, note.title);
  assert.equal(decoded.body, note.body);
  assert.deepEqual(decoded.links.map(({ resolution, resolutionMessage, ...link }) => link), note.links);
  assert.equal(decoded.codecExtra.futureField, 'preserved');
});

for (const count of [0, 1, 2, 3]) {
  test(`preserves exactly ${count} trailing newline(s)`, () => {
    const body = `Body${'\n'.repeat(count)}`;
    const markdown = codec.encodeNoteMarkdown({ id: `note-${count}`, title: 'T', body, links: [] });
    assert.equal(codec.decodeNoteMarkdown(markdown).body, body);
  });
}

test('preserves CRLF and a body-leading BOM as literal user content', () => {
  const body = '\uFEFFline 1\r\nline 2\r\n';
  const markdown = codec.encodeNoteMarkdown({ id: 'note-crlf', title: '', body, links: [] });
  assert.equal(codec.decodeNoteMarkdown(markdown).body, body);
});

test('untitled Note keeps body without consuming first heading', () => {
  const body = '# User heading\n\nBody';
  const markdown = codec.encodeNoteMarkdown({ id: 'note-u', title: '', body, links: [] });
  const decoded = codec.decodeNoteMarkdown(markdown);
  assert.equal(decoded.body, body);
});

test('rejects non-linked-note Markdown and invalid body length', () => {
  assert.equal(codec.isLinkedNoteMarkdown('# Ordinary file'), false);
  assert.throws(() => codec.decodeNoteMarkdown('# Ordinary file'), /Missing/);
  const invalid = '<!-- obs-linked-note:v1 {"schemaVersion":1,"id":"x","title":"","bodyLength":99,"links":[],"extra":{}} -->\nbody\n';
  assert.throws(() => codec.decodeNoteMarkdown(invalid), /bodyLength/);
});
