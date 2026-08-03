import test from 'node:test';
import assert from 'node:assert/strict';
import api from '../src/pending-note-asset-store.js';

test('memory fallback persists, lists and deletes pending Note assets', async () => {
  const store = new api.PendingNoteAssetStore({ indexedDB: null });
  await store.put({ id: 'a', noteId: 'n1', bytes: Uint8Array.from([1]), createdAt: '2026-01-01' });
  await store.put({ id: 'b', noteId: 'n2', bytes: Uint8Array.from([2]), createdAt: '2026-01-02' });
  assert.equal((await store.get('a')).bytes[0], 1);
  assert.deepEqual((await store.listByNote('n1')).map((item) => item.id), ['a']);
  await store.deleteForNote('n1');
  assert.equal(await store.get('a'), null);
  assert.notEqual(await store.get('b'), null);
});
