import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const local = require('../src/reference-object-local-store.js');

test('local Reference Object state is scoped by exact workspace repository and branch', () => {
  const a = local.referenceObjectLocalStoreKey({ id: 'w', owner: 'Org', repo: 'Docs', branch: 'main' });
  const b = local.referenceObjectLocalStoreKey({ id: 'w', owner: 'Org', repo: 'Docs', branch: 'dev' });
  assert.notEqual(a, b);
});

test('local drafts upsert and remove without losing exact base SHA', () => {
  let state = local.normalizeReferenceObjectLocalState(null);
  state = local.upsertReferenceObjectLocalDraft(state, { path: 'a.md', baseSha: 'sha-a', content: 'one' });
  state = local.upsertReferenceObjectLocalDraft(state, { path: 'a.md', baseSha: 'sha-a', content: 'two' });
  assert.deepEqual(state.files.map(({ path, baseSha, content }) => ({ path, baseSha, content })), [{ path: 'a.md', baseSha: 'sha-a', content: 'two' }]);
  state = local.removeReferenceObjectLocalDraft(state, 'a.md');
  assert.equal(state.files.length, 0);
});

test('local drafts preserve original line endings byte-for-byte', () => {
  let state = local.normalizeReferenceObjectLocalState(null);
  const content = 'a\r\nb\r\n';
  state = local.upsertReferenceObjectLocalDraft(state, { path: 'crlf.md', baseSha: 'sha-crlf', content });
  assert.equal(state.files[0].content, content);
  assert.deepEqual([...new TextEncoder().encode(state.files[0].content)], [...new TextEncoder().encode(content)]);
});
