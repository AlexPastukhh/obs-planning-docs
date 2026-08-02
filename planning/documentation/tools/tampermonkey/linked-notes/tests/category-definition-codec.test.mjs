import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const api = require('../src/category-definition-codec.js');

test('category definition v3 round-trips literal description and typed visible links', () => {
  const markdown = api.encodeCategoryDefinition({
    id: 'asp-net-core',
    name: 'ASP.NET Core',
    description: 'Server framework.\n\nKeep this literal.',
    impliedCategories: [{ label: 'Programming', target: './programming.md' }],
    files: [{ label: 'API overview', target: '../docs/api.md' }],
    notes: [{ label: 'Runtime Note', target: '../notes/runtime.md', noteId: 'note-runtime' }]
  });
  assert.match(markdown, /obs-file-category:v3/);
  assert.match(markdown, /obs-file-category:implied:start/);
  assert.match(markdown, /\[Programming\]\(<\.\/programming\.md>\)/);
  assert.match(markdown, /\[API overview\]\(<\.\.\/docs\/api\.md>\)/);
  assert.match(markdown, /obs-category-note:note-runtime/);
  assert.deepEqual(api.decodeCategoryDefinition(markdown), {
    schemaVersion: 3,
    id: 'asp-net-core',
    name: 'ASP.NET Core',
    description: 'Server framework.\n\nKeep this literal.',
    impliedCategories: [{ label: 'Programming', target: './programming.md' }],
    files: [{ label: 'API overview', target: '../docs/api.md' }],
    notes: [{ label: 'Runtime Note', target: '../notes/runtime.md', noteId: 'note-runtime' }]
  });
});

test('managed-looking headings remain literal description content in v3', () => {
  const description = 'Intro.\n\n## Implied categories\n\nThis is prose.\n\n## Files\n\nStill prose.';
  const markdown = api.encodeCategoryDefinition({ id: 'literal', name: 'Literal', description, files: [] });
  const decoded = api.decodeCategoryDefinition(markdown);
  assert.equal(decoded.description, description);
  assert.deepEqual(decoded.files, []);
  assert.deepEqual(decoded.impliedCategories, []);
  assert.deepEqual(decoded.notes, []);
});

test('legacy v1 and v2 definitions remain readable and re-encode deterministically as v3', () => {
  const legacy = '<!-- obs-file-category:v1 {"schemaVersion":1,"id":"legacy","name":"Legacy"} -->\n\n# Legacy\n\nOld description.\n\n## Implied categories\n\n_None._\n\n## Files\n\n- [Readme](../README.md)\n';
  const decoded = api.decodeCategoryDefinition(legacy);
  assert.equal(decoded.schemaVersion, 1);
  assert.equal(decoded.description, 'Old description.');
  assert.deepEqual(decoded.files, [{ label: 'Readme', target: '../README.md' }]);
  const upgraded = api.encodeCategoryDefinition(decoded);
  assert.match(upgraded, /obs-file-category:v3/);
  assert.equal(api.decodeCategoryDefinition(upgraded).description, 'Old description.');
});

test('malformed v3 managed boundaries are explicit', () => {
  const markdown = api.encodeCategoryDefinition({ id: 'broken', name: 'Broken' }).replace(api.FILES_END, '');
  assert.throws(() => api.decodeCategoryDefinition(markdown), /Files managed boundaries/);
});

test('category identities and links are portable', () => {
  assert.equal(api.normalizeCategoryId(' ASP.NET Core '), 'asp.net-core');
  assert.equal(api.categoryFileName('Programming'), 'programming.md');
  assert.throws(() => api.encodeCategoryDefinition({ name: 'X', files: [{ target: 'https://example.com/x' }] }), /repository-relative/);
});

test('ordinary Markdown is not decoded as a category definition', () => {
  assert.equal(api.isCategoryDefinitionMarkdown('# Ordinary'), false);
  assert.throws(() => api.decodeCategoryDefinition('# Ordinary'), /not an obs-file-category/);
});


test('category link destinations round-trip portable filenames with Markdown-significant characters', () => {
  const targets = [
    '../docs/foo(bar).md',
    '../docs/a b.md',
    '../docs/name[1].md',
    '../docs/Пример.md',
    '../docs/100%.md'
  ];
  const markdown = api.encodeCategoryDefinition({
    id: 'portable-paths',
    name: 'Portable Paths',
    files: targets.map((target) => ({ label: target.slice(target.lastIndexOf('/') + 1), target }))
  });
  assert.match(markdown, /foo%28bar%29\.md/);
  assert.match(markdown, /a%20b\.md/);
  assert.match(markdown, /name%5B1%5D\.md/);
  assert.match(markdown, /%D0%9F/);
  assert.match(markdown, /100%25\.md/);
  assert.deepEqual(api.decodeCategoryDefinition(markdown).files.map((item) => item.target), targets);
});

test('legacy plain Markdown destinations with parentheses remain readable', () => {
  const markdown = '<!-- obs-file-category:v1 {"schemaVersion":1,"id":"legacy-path","name":"Legacy Path"} -->\n\n# Legacy Path\n\nDescription.\n\n## Implied categories\n\n_None._\n\n## Files\n\n- [File](../docs/foo(bar).md)\n';
  assert.deepEqual(api.decodeCategoryDefinition(markdown).files, [{ label: 'File', target: '../docs/foo(bar).md' }]);
});

test('legacy raw percent signs remain literal while encoded percent signs decode', () => {
  const raw = '<!-- obs-file-category:v1 {"schemaVersion":1,"id":"percent","name":"Percent"} -->\n\n# Percent\n\nDescription.\n\n## Implied categories\n\n_None._\n\n## Files\n\n- [Raw](../docs/100%.md)\n- [Encoded](../docs/a%20b.md)\n';
  assert.deepEqual(api.decodeCategoryDefinition(raw).files.map((item) => item.target), ['../docs/100%.md', '../docs/a b.md']);
});


test('legacy v2 managed definitions gain an empty Notes region on v3 save', () => {
  const v2 = '<!-- obs-file-category:v2 {\"schemaVersion\":2,\"id\":\"v2\",\"name\":\"V2\"} -->\n\n# V2\n\nDescription.\n\n<!-- obs-file-category:implied:start -->\n## Implied categories\n\n_None._\n<!-- obs-file-category:implied:end -->\n\n<!-- obs-file-category:files:start -->\n## Files\n\n- [A](<../docs/a.md>)\n<!-- obs-file-category:files:end -->\n';
  const decoded = api.decodeCategoryDefinition(v2);
  assert.equal(decoded.schemaVersion, 2);
  assert.deepEqual(decoded.notes, []);
  const upgraded = api.encodeCategoryDefinition(decoded);
  assert.match(upgraded, /obs-file-category:v3/);
  assert.match(upgraded, /obs-file-category:notes:start/);
});
