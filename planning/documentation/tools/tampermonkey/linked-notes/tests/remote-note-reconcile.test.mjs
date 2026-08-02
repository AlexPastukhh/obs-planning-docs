import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const api = require('../src/remote-note-reconcile.js');

const target = { owner: 'o', repo: 'r', branch: 'b', path: 'notes/a.md' };
const remote = (hash = 'base', overrides = {}) => ({
  note: { id: 'note-a' },
  target: { ...target },
  hash,
  ...overrides
});
const local = (verifiedHash = 'base', overrides = {}) => ({
  id: 'note-a',
  remote: { ...target, verifiedHash },
  ...overrides
});

test('remote-only Note is imported', () => {
  assert.equal(api.classifyRemoteNote({ remote: remote() }).action, api.REMOTE_RECONCILE_ACTIONS.REMOTE_IMPORT);
});

test('verified local and remote states classify unchanged, fast-forward and local-ahead', () => {
  assert.equal(api.classifyRemoteNote({ local: local(), remote: remote(), localContentHash: 'base' }).action, api.REMOTE_RECONCILE_ACTIONS.UNCHANGED);
  assert.equal(api.classifyRemoteNote({ local: local(), remote: remote('remote-new'), localContentHash: 'base' }).action, api.REMOTE_RECONCILE_ACTIONS.FAST_FORWARD);
  assert.equal(api.classifyRemoteNote({ local: local(), remote: remote(), localContentHash: 'local-new' }).action, api.REMOTE_RECONCILE_ACTIONS.LOCAL_AHEAD);
});

test('different changes on both sides become conflict while equal content reconciles', () => {
  assert.equal(api.classifyRemoteNote({ local: local(), remote: remote('remote-new'), localContentHash: 'local-new' }).action, api.REMOTE_RECONCILE_ACTIONS.CONFLICT);
  assert.equal(api.classifyRemoteNote({ local: local(), remote: remote('same-new'), localContentHash: 'same-new' }).action, api.REMOTE_RECONCILE_ACTIONS.ATTACH_EXISTING);
});

test('same Note id at another target is never rebound automatically', () => {
  const result = api.classifyRemoteNote({ local: local(), remote: remote('base', { target: { ...target, path: 'notes/other.md' } }), localContentHash: 'base' });
  assert.equal(result.action, api.REMOTE_RECONCILE_ACTIONS.DUPLICATE_IDENTITY);
});

test('unbound same-id local Note attaches only when content is exact', () => {
  assert.equal(api.classifyRemoteNote({ local: { id: 'note-a', remote: {} }, remote: remote('same'), localContentHash: 'same' }).action, api.REMOTE_RECONCILE_ACTIONS.ATTACH_EXISTING);
  assert.equal(api.classifyRemoteNote({ local: { id: 'note-a', remote: {} }, remote: remote('remote'), localContentHash: 'local' }).action, api.REMOTE_RECONCILE_ACTIONS.DUPLICATE_IDENTITY);
});

test('remote deletion applies only to direct children bound to the same workspace', () => {
  const note = local('base');
  assert.equal(api.boundNoteMissingFromSnapshot(note, { owner: 'o', repo: 'r', branch: 'b' }, 'notes', new Set()), true);
  assert.equal(api.boundNoteMissingFromSnapshot(note, { owner: 'o', repo: 'r', branch: 'b' }, 'notes', new Set(['notes/a.md'])), false);
  assert.equal(api.boundNoteMissingFromSnapshot(note, { owner: 'other', repo: 'r', branch: 'b' }, 'notes', new Set()), false);
  assert.equal(api.boundNoteMissingFromSnapshot({ ...note, remote: { ...note.remote, path: 'notes/nested/a.md' } }, { owner: 'o', repo: 'r', branch: 'b' }, 'notes', new Set()), false);
});
