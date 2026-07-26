import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const core = require('../src/linked-notes-core.js');

const T0 = '2026-01-01T00:00:00.000Z';
const T1 = '2026-01-01T00:01:00.000Z';

function verifiedResult(overrides = {}) {
  return {
    owner: 'owner-a',
    repo: 'repo-a',
    branch: 'notes-test',
    path: 'notes/a.md',
    sha: 'abc',
    verifiedHash: 'def',
    htmlUrl: 'https://example.test/a',
    ...overrides
  };
}

test('creates a stable local Note with literal content', () => {
  const note = core.createNote({ id: 'note-1', title: 'Заметка', body: 'literal **Markdown**' }, T0);
  assert.equal(note.id, 'note-1');
  assert.equal(note.title, 'Заметка');
  assert.equal(note.body, 'literal **Markdown**');
  assert.equal(note.state, core.NOTE_STATES.LOCAL_DRAFT);
  assert.equal(note.createdAt, T0);
});


test('preserves codecExtra through normalization and updates', () => {
  const note = core.createNote({
    id: 'note-extra',
    title: 'Extra',
    codecExtra: { futureField: 'keep', nested: { value: 1 } }
  }, T0);
  assert.deepEqual(note.codecExtra, { futureField: 'keep', nested: { value: 1 } });
  const updated = core.updateNote(note, { body: 'Changed' }, T1);
  assert.deepEqual(updated.codecExtra, { futureField: 'keep', nested: { value: 1 } });
});

test('rejects imported URL links that are not portable HTTP(S)', () => {
  assert.throws(
    () => core.normalizeNote({
      id: 'note-bad-url',
      links: [{ id: 'bad', type: core.LINK_TYPES.URL, target: { url: 'javascript:alert(1)' } }]
    }),
    /portable HTTP\(S\)/
  );
  assert.doesNotThrow(() => core.normalizeLink({
    id: 'good', type: core.LINK_TYPES.URL, target: { url: 'https://example.test/path' }
  }));
});

test('verified Note stores complete immutable remote target identity', () => {
  const note = core.createNote({ id: 'note-2', title: 'A', body: 'Body' }, T0);
  const verified = core.markSavedVerified(note, verifiedResult(), T1);
  assert.equal(verified.state, core.NOTE_STATES.SAVED_VERIFIED);
  assert.deepEqual(verified.remote, {
    owner: 'owner-a',
    repo: 'repo-a',
    branch: 'notes-test',
    path: 'notes/a.md',
    sha: 'abc',
    verifiedHash: 'def',
    verifiedAt: T1,
    htmlUrl: 'https://example.test/a'
  });
  assert.equal(core.hasCompleteRemoteIdentity(verified.remote), true);
  assert.equal(core.sameRemoteTarget(verified.remote, verifiedResult({ sha: 'other', verifiedHash: 'other' })), true);
  assert.equal(core.sameRemoteTarget(verified.remote, verifiedResult({ branch: 'other' })), false);
});

test('verified Note becomes changed_after_save only after durable content change', () => {
  const note = core.createNote({ id: 'note-3', title: 'A', body: 'Body' }, T0);
  const verified = core.markSavedVerified(note, verifiedResult(), T1);
  const unchanged = core.updateNote(verified, { title: 'A', body: 'Body', links: [] }, T1);
  assert.equal(unchanged.state, core.NOTE_STATES.SAVED_VERIFIED);
  const changed = core.updateNote(verified, { body: 'Body changed' }, T1);
  assert.equal(changed.state, core.NOTE_STATES.CHANGED_AFTER_SAVE);
});

test('link resolution metadata does not mark verified durable content as changed', () => {
  const note = core.createNote({
    id: 'note-r',
    links: [{ id: 'link-r', type: 'repository', target: { path: 'docs/a.md' }, resolution: 'unchecked' }]
  }, T0);
  const verified = core.markSavedVerified(note, verifiedResult(), T1);
  const resolved = core.setLinkResolution(verified, 'link-r', 'resolved', 'Resolved locally.', T1);
  assert.equal(resolved.state, core.NOTE_STATES.SAVED_VERIFIED);
  assert.equal(resolved.links[0].resolution, 'resolved');
});

test('adds and removes a Note link without copying target state', () => {
  const note = core.createNote({ id: 'note-a' }, T0);
  const linked = core.addLink(note, {
    id: 'link-a-b', type: core.LINK_TYPES.NOTE, target: { noteId: 'note-b' }, label: 'B'
  }, T1);
  assert.equal(linked.links.length, 1);
  assert.deepEqual(linked.links[0].target, { noteId: 'note-b' });
  const removed = core.removeLink(linked, 'link-a-b', T1);
  assert.equal(removed.links.length, 0);
});

test('rejects malformed links and incomplete verified save results', () => {
  assert.throws(() => core.normalizeLink({ type: 'repository', target: {} }), /target\.path/);
  assert.throws(() => core.normalizeLink({ type: 'note', target: {} }), /target\.noteId/);
  assert.throws(() => core.normalizeLink({ type: 'unknown', target: {} }), /Unsupported/);
  assert.throws(() => core.markSavedVerified(core.createNote({ id: 'note-x' }), { path: 'a.md', sha: 's', verifiedHash: 'h' }), /owner, repo, branch/);
});

test('target identity may be recoverable before SHA/hash verification is complete', () => {
  const provisional = { owner: 'o', repo: 'r', branch: 'b', path: 'notes/a.md', sha: 'write-response-sha' };
  assert.equal(core.hasRemoteTargetIdentity(provisional), true);
  assert.equal(core.hasCompleteRemoteIdentity(provisional), false);
});

test('fileSlug remains portable and keeps stable id suffix', () => {
  assert.equal(core.fileSlug('Моя Note / Draft', 'note-1234567890'), 'моя-note-draft-1234567890.md');
});
