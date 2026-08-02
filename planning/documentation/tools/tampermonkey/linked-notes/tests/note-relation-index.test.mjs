import test from 'node:test';
import assert from 'node:assert/strict';
import api from '../src/note-relation-index.js';

const notes = [
  { id: 'a', remote: { owner: 'Org', repo: 'Docs', branch: 'main', path: 'notes/a.md' }, links: [
    { id: 'l1', type: 'note', label: 'B', target: { noteId: 'b' } },
    { id: 'l2', type: 'repository', label: 'API', target: { path: 'docs/api.md' }, resolution: 'resolved' }
  ] },
  { id: 'b', remote: { owner: 'Org', repo: 'Docs', branch: 'main', path: 'notes/b.md' }, links: [] }
];

test('managed Note metadata rebuilds outgoing relations and backlinks', () => {
  const index = api.buildNoteRelationIndex(notes);
  assert.equal(index.outgoingForNote('a').length, 2);
  assert.equal(index.incomingForNote('b')[0].sourceNoteId, 'a');
  assert.equal(index.incomingForFile({ owner: 'org', repo: 'docs', branch: 'main', path: 'docs/api.md' })[0].linkId, 'l2');
});

test('missing Note target remains an explicit unresolved relation', () => {
  const index = api.buildNoteRelationIndex([{ id: 'a', links: [{ id: 'x', type: 'note', target: { noteId: 'missing' } }] }]);
  assert.equal(index.outgoingForNote('a')[0].resolved, false);
  assert.equal(index.incomingForNote('missing').length, 1);
});
