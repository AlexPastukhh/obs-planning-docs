import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const api = require('../src/repository-category-index.js');

function definition(path, id, extra = {}) {
  return { path, sha: `sha-${id}`, definition: { id, name: id, description: '', impliedCategories: [], files: [], ...extra } };
}

test('explicit file membership derives through implied categories with validation provenance', () => {
  const index = api.buildRepositoryCategoryIndex([
    definition('categories/programming.md', 'programming'),
    definition('categories/asp-net-core.md', 'asp-net-core', {
      impliedCategories: [{ label: 'Programming', target: './programming.md' }],
      files: [{ label: 'API', target: '../docs/api.md' }]
    })
  ], { fileValidation: { 'docs/api.md': { status: 'verified', message: 'exists' } } });
  assert.deepEqual(index.filesForCategory('asp-net-core'), [{ path: 'docs/api.md', membership: 'explicit', validation: 'verified', validationMessage: 'exists' }]);
  assert.deepEqual(index.filesForCategory('programming'), [{ path: 'docs/api.md', membership: 'derived', validation: 'verified', validationMessage: 'exists' }]);
  assert.equal(index.errors.length, 0);
});

test('duplicate ids, broken category links and cycles are path-aware', () => {
  const index = api.buildRepositoryCategoryIndex([
    definition('categories/a.md', 'a', { impliedCategories: [{ label: 'B', target: './b.md' }] }),
    definition('categories/b.md', 'b', { impliedCategories: [{ label: 'A', target: './a.md' }, { label: 'Missing', target: './missing.md' }] }),
    definition('categories/other-a.md', 'a')
  ]);
  assert.ok(index.errors.some((error) => error.kind === 'duplicate_id' && error.path === 'categories/other-a.md'));
  assert.ok(index.errors.some((error) => error.kind === 'cycle'));
  assert.ok(index.categories.get('b').brokenLinks.some((link) => link.kind === 'broken_category_link' && link.targetPath === 'categories/missing.md'));
});

test('missing, inaccessible and unchecked member files remain distinct', () => {
  const index = api.buildRepositoryCategoryIndex([
    definition('categories/a.md', 'a', {
      files: [
        { label: 'Missing', target: '../docs/missing.md' },
        { label: 'Private', target: '../docs/private.md' },
        { label: 'Later', target: '../docs/later.md' }
      ]
    })
  ], { fileValidation: {
    'docs/missing.md': { status: 'missing', message: '404' },
    'docs/private.md': { status: 'inaccessible', message: 'Forbidden' },
    'docs/later.md': { status: 'unchecked', message: 'limit' }
  } });
  assert.ok(index.errors.some((error) => error.kind === 'broken_file_link' && error.targetPath === 'docs/missing.md'));
  assert.ok(index.errors.some((error) => error.kind === 'inaccessible_file_link' && error.targetPath === 'docs/private.md'));
  assert.ok(index.errors.some((error) => error.kind === 'unchecked_file_link' && error.targetPath === 'docs/later.md'));
});
