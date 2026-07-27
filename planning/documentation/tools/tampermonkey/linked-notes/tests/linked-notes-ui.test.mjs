import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const api = require('../src/linked-notes-ui.js');

test('launcher is shifted left by its measured width plus a gap', () => {
  assert.equal(api.launcherRightOffset(66), 94);
  assert.equal(api.launcherRightOffset(0), 28);
});

test('Escape closes only an open idle panel', () => {
  assert.equal(api.shouldCloseOnEscape({ key: 'Escape' }, { open: true, busy: false }), true);
  assert.equal(api.shouldCloseOnEscape({ key: 'Escape' }, { open: true, busy: true }), false);
  assert.equal(api.shouldCloseOnEscape({ key: 'Enter' }, { open: true, busy: false }), false);
  assert.equal(api.shouldCloseOnEscape({ key: 'Escape' }, { open: false, busy: false }), false);
});

test('a dirty workspace form survives unrelated rerenders and external workspace refreshes', () => {
  const captured = {
    id: '',
    name: 'Unsaved workspace',
    repositoryInput: 'AlexPastukhh/gdoc',
    branch: 'feature',
    basePath: 'notes/draft'
  };
  const incoming = {
    id: 'workspace-saved',
    name: 'Saved workspace',
    repositoryInput: 'AlexPastukhh/obs-planning-docs',
    branch: 'main',
    basePath: 'planning/notes'
  };
  const merged = api.mergeWorkspaceEditorPatch(captured, true, { workspaceEditor: incoming, status: 'External refresh' });
  assert.deepEqual(merged.workspaceEditor, captured);
  assert.equal(merged.status, 'External refresh');
});

test('an explicit workspace-editor replacement clears the preserved draft', () => {
  const captured = { id: '', name: 'Unsaved workspace' };
  const incoming = { id: 'workspace-saved', name: 'Saved workspace' };
  const merged = api.mergeWorkspaceEditorPatch(captured, true, {
    workspaceEditor: incoming,
    replaceWorkspaceEditor: true
  });
  assert.deepEqual(merged.workspaceEditor, incoming);
});

test('a clean workspace form follows the current active workspace', () => {
  const captured = { id: '', name: '' };
  const incoming = { id: 'workspace-saved', name: 'Saved workspace' };
  const merged = api.mergeWorkspaceEditorPatch(captured, false, { workspaceEditor: incoming });
  assert.deepEqual(merged.workspaceEditor, incoming);
});
