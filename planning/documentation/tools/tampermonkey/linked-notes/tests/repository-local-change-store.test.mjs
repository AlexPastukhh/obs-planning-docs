import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const store = require('../src/repository-local-change-store.js');

test('general local repository changes preserve the first verified base across edits', () => {
  let state = store.normalizeRepositoryLocalChangeState(null);
  state = store.upsertRepositoryLocalChange(state, { path: 'docs/a.md', baseSha: 'base-a', payloadKind: 'text', content: 'one', source: 'file-editor' });
  state = store.upsertRepositoryLocalChange(state, { path: 'docs/a.md', baseSha: 'wrong-new-base', payloadKind: 'text', content: 'two', source: 'ordered-reference-list' });
  assert.equal(state.schemaVersion, 2);
  assert.equal(state.files[0].baseSha, 'base-a');
  assert.equal(state.files[0].content, 'two');
  assert.equal(state.files[0].source, 'ordered-reference-list');
});

test('legacy text drafts normalize into the common queue without data loss', () => {
  const state = store.normalizeRepositoryLocalChangeState({ schemaVersion: 1, files: [{ path: 'a.md', baseSha: 'sha-a', content: 'a\r\nb\r\n' }] });
  assert.deepEqual(state.files.map(({ path, baseSha, payloadKind, content }) => ({ path, baseSha, payloadKind, content })), [{ path: 'a.md', baseSha: 'sha-a', payloadKind: 'text', content: 'a\r\nb\r\n' }]);
  assert.deepEqual(store.repositoryTextOverlays(state).map(({ path, content }) => ({ path, content })), [{ path: 'a.md', content: 'a\r\nb\r\n' }]);
});

test('binary changes are bounded and invalid paths are rejected', () => {
  assert.throws(() => store.upsertRepositoryLocalChange(null, { path: '../a.bin', payloadKind: 'binary', bytesBase64: 'AQ==' }), /invalid segment|repository-relative/);
  assert.throws(() => store.upsertRepositoryLocalChange(null, { path: 'a.bin', payloadKind: 'binary', bytesBase64: 'AQID' }, { maxBytes: 2 }), /aggregate limit/);
});
