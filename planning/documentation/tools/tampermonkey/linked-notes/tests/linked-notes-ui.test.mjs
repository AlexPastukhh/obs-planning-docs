import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const require = createRequire(import.meta.url);
const api = require('../src/linked-notes-ui.js');
const here = dirname(fileURLToPath(import.meta.url));

test('launcher is shifted left by its measured width plus a gap', () => {
  assert.equal(api.launcherRightOffset(66), 94);
  assert.equal(api.launcherRightOffset(0), 28);
});


test('panel reserves a bottom-right safe area on wide viewports', () => {
  assert.deepEqual(api.panelViewportLayout(1293, 638), {
    edge: 12,
    right: 259,
    bottom: 96,
    width: 980,
    height: 530
  });
});

test('panel keeps usable dimensions on compact and short viewports', () => {
  assert.deepEqual(api.panelViewportLayout(700, 600), {
    edge: 12,
    right: 12,
    bottom: 96,
    width: 676,
    height: 492
  });
  assert.deepEqual(api.panelViewportLayout(390, 480), {
    edge: 12,
    right: 12,
    bottom: 12,
    width: 366,
    height: 456
  });
});

test('panel source keeps independent scrolling and a visible workspace-manager action', () => {
  const source = readFileSync(join(here, '..', 'src', 'linked-notes-ui.js'), 'utf8');
  assert.match(source, /\.main \{[^}]*min-height: 0;[^}]*overflow: hidden;/s);
  assert.match(source, /\.editor \{[^}]*flex: 1 1 0;[^}]*overflow-y: auto;/s);
  assert.match(source, /\.notes \{[^}]*flex: 1 1 0;[^}]*overflow-y: auto;/s);
  assert.match(source, /z-index: 2147483647/);
  assert.match(source, /data-action="manage-workspaces"/);
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
