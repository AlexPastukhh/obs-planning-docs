import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
require('../src/repository-local-change-store.js');
require('../src/github-contents-client.js');
const publisher = require('../src/repository-change-publisher.js');
const store = globalThis.ObsLinkedNotes;

test('current-file publisher writes and clears only the explicitly open path', async () => {
  let state = store.upsertRepositoryLocalChange(null, { path: 'a.md', baseSha: 'sha-a', content: 'A', source: 'editor' });
  state = store.upsertRepositoryLocalChange(state, { path: 'b.md', baseSha: 'sha-b', content: 'B', source: 'editor' });
  const writes = [];
  const result = await publisher.publishCurrentRepositoryChange({
    state,
    path: 'a.md',
    client: { saveVerified: async (input) => { writes.push(input); return { sha: 'new-a' }; } }
  });
  assert.deepEqual(writes.map((item) => item.path), ['a.md']);
  assert.deepEqual(result.state.files.map((item) => item.path), ['b.md']);
});

test('all publisher requires the atomic Git Data entrypoint and clears only after success', async () => {
  const state = store.upsertRepositoryLocalChange(null, { path: 'a.md', baseSha: 'sha-a', content: 'A' });
  await assert.rejects(() => publisher.publishAllRepositoryChanges({ state, client: { saveVerified: async () => ({}) } }), /sequential Contents writes are not used/);
  const calls = [];
  const result = await publisher.publishAllRepositoryChanges({ state, client: { saveChangesCommitVerified: async (input) => { calls.push(input); return { commitSha: 'commit', paths: ['a.md'] }; } } });
  assert.equal(calls.length, 1);
  assert.equal(result.state.files.length, 0);
});
