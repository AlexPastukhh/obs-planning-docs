import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const api = require('../src/category-cache-store.js');

function memory(initial = {}) {
  const values = new Map(Object.entries(structuredClone(initial)));
  return {
    values,
    getValue: async (key, fallback) => values.has(key) ? structuredClone(values.get(key)) : structuredClone(fallback),
    setValue: async (key, value) => values.set(key, structuredClone(value))
  };
}

function store(storage, writerId) {
  return new api.CategoryCacheStore({
    ...storage,
    writerId,
    now: () => new Date('2026-08-02T00:00:00.000Z'),
    sleep: async () => {},
    lockSettleMs: 0,
    lockRetryMs: 0,
    maxLockAttempts: 100
  });
}

test('category cache is isolated by workspace and preserves local groups', async () => {
  const storage = memory();
  const one = store(storage, 'writer-one');
  await one.save('one', { definitions: [{ path: 'categories/a.md' }], groups: { a: 'Tech' }, refreshedAt: 'now' });
  await one.save('two', { definitions: [], groups: {}, refreshedAt: 'later' });
  assert.deepEqual(await one.load('one'), { definitions: [{ path: 'categories/a.md' }], diagnostics: [], fileValidation: {}, groups: { a: 'Tech' }, refreshedAt: 'now' });
  assert.deepEqual(await one.load('two'), { definitions: [], diagnostics: [], fileValidation: {}, groups: {}, refreshedAt: 'later' });
});

test('category cache can be rebuilt or cleared without touching other workspaces', async () => {
  const storage = memory();
  const one = store(storage, 'writer-one');
  await one.save('one', { definitions: [{ path: 'a' }], groups: {} });
  await one.save('two', { definitions: [{ path: 'b' }], groups: {} });
  await one.clear('one');
  assert.deepEqual((await one.load('one')).definitions, []);
  assert.deepEqual((await one.load('two')).definitions, [{ path: 'b' }]);
});

test('parallel writes to different workspaces preserve both snapshots', async () => {
  const storage = memory();
  const one = store(storage, 'writer-one');
  const two = store(storage, 'writer-two');
  await Promise.all([
    one.saveDefinitions('workspace-a', { definitions: [{ path: 'categories/a.md' }], refreshedAt: 'a' }),
    two.saveDefinitions('workspace-b', { definitions: [{ path: 'categories/b.md' }], refreshedAt: 'b' })
  ]);
  assert.deepEqual((await one.load('workspace-a')).definitions, [{ path: 'categories/a.md' }]);
  assert.deepEqual((await two.load('workspace-b')).definitions, [{ path: 'categories/b.md' }]);
});

test('parallel refresh and local group update preserve both fields', async () => {
  const storage = memory();
  const one = store(storage, 'writer-one');
  const two = store(storage, 'writer-two');
  await one.save('workspace', { definitions: [{ path: 'old.md' }], groups: { old: 'Old' } });
  await Promise.all([
    one.saveDefinitions('workspace', { definitions: [{ path: 'new.md' }], diagnostics: [{ kind: 'x' }], refreshedAt: 'new' }),
    two.setGroups('workspace', { category: 'Technology' })
  ]);
  const result = await one.load('workspace');
  assert.deepEqual(result.definitions, [{ path: 'new.md' }]);
  assert.deepEqual(result.groups, { category: 'Technology' });
  assert.deepEqual(result.diagnostics, [{ kind: 'x' }]);
});

test('legacy shared cache migrates one workspace without deleting legacy data', async () => {
  const legacy = {
    schemaVersion: 1,
    workspaces: {
      old: { definitions: [{ path: 'categories/old.md' }], groups: { old: 'Legacy' }, refreshedAt: 'legacy' }
    }
  };
  const storage = memory({ [api.LEGACY_CATEGORY_CACHE_KEY]: legacy });
  const one = store(storage, 'writer-one');
  assert.deepEqual(await one.load('old'), {
    definitions: [{ path: 'categories/old.md' }], diagnostics: [], fileValidation: {}, groups: { old: 'Legacy' }, refreshedAt: 'legacy'
  });
  assert.deepEqual(storage.values.get(api.LEGACY_CATEGORY_CACHE_KEY), legacy);
});


test('atomic category-group updates from stale tabs preserve different category ids', async () => {
  const storage = memory();
  const one = store(storage, 'writer-one');
  const two = store(storage, 'writer-two');
  await one.save('workspace', { definitions: [], groups: {} });
  const staleOne = await one.load('workspace');
  const staleTwo = await two.load('workspace');
  assert.deepEqual(staleOne.groups, {});
  assert.deepEqual(staleTwo.groups, {});
  await Promise.all([
    one.setCategoryGroup('workspace', 'asp', 'Frameworks'),
    two.setCategoryGroup('workspace', 'js', 'Languages')
  ]);
  assert.deepEqual((await one.load('workspace')).groups, { asp: 'Frameworks', js: 'Languages' });
});
