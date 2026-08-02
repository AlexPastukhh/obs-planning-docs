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

test('panel exposes explicit GET-only GitHub refresh and explains first-save folder creation', () => {
  const source = readFileSync(join(here, '..', 'src', 'linked-notes-ui.js'), 'utf8');
  assert.match(source, /data-action="refresh-github"/);
  assert.match(source, /onRefreshRemote/);
  assert.match(source, /Missing parent folders appear automatically with the first explicit Save GitHub/);
  assert.match(source, /Last GitHub refresh/);
});

test('panel exposes Files and Categories surfaces with in-app preview and GitHub escape hatch', () => {
  const source = readFileSync(join(here, '..', 'src', 'linked-notes-ui.js'), 'utf8');
  assert.match(source, /data-surface="files"/);
  assert.match(source, /data-surface="categories"/);
  assert.match(source, /Open on GitHub/);
  assert.match(source, /data-action="refresh-categories"/);
  assert.match(source, /data-action="assign-preview-category"/);
  assert.match(source, /Categories folder/);
  assert.match(source, /UX groups are local-only/);
});

test('category diagnostics render concrete path, kind and message', () => {
  const source = readFileSync(join(here, '..', 'src', 'linked-notes-ui.js'), 'utf8');
  assert.match(source, /error\.path \|\| error\.targetPath/);
  assert.match(source, /error\.kind/);
  assert.match(source, /validationMessage/);
});

test('repository entry buttons preserve listing metadata and cross-repository assignment is UI-disabled', () => {
  const source = readFileSync(join(here, '..', 'src', 'linked-notes-ui.js'), 'utf8');
  assert.match(source, /data-entry-size=/);
  assert.match(source, /data-entry-sha=/);
  assert.match(source, /data-entry-html-url=/);
  assert.match(source, /categoryAssignmentAllowed/);
});


test('dirty category form preserves literal fields and selected targets across error rerenders', () => {
  const captured = { id: 'new-category', name: 'Draft name', description: 'Literal **Markdown**', impliedCategoryIds: ['programming'], group: 'Group', selectedTargets: [{ type: 'file', path: 'docs/a.md' }] };
  const incoming = { id: '', name: '', description: '', impliedCategoryIds: [], group: '', selectedTargets: [] };
  const merged = api.mergeCategoryEditorPatch(captured, true, { categoryEditor: incoming, feedback: [{ severity: 'error', message: 'Conflict' }] });
  assert.equal(merged.categoryEditor.name, 'Draft name');
  assert.equal(merged.categoryEditor.description, 'Literal **Markdown**');
  assert.deepEqual(merged.categoryEditor.selectedTargets, []);
  assert.equal(merged.feedback[0].message, 'Conflict');
});

test('UI source exposes prominent contextual feedback, rich Markdown modes and shared target picker', () => {
  const source = readFileSync(join(here, '..', 'src', 'linked-notes-ui.js'), 'utf8');
  assert.match(source, /feedback-\$\{escapeHtml/);
  assert.match(source, /data-note-view="preview"/);
  assert.match(source, /data-note-view="split"/);
  assert.match(source, /data-file-view="rendered"/);
  assert.match(source, /Choose files or Notes/);
  assert.match(source, /Entire repository \(bounded\)/);
  assert.match(source, /data-note-category-id/);
});

test('Note category draft preserves unavailable selected IDs and only replaces visible choices', () => {
  assert.deepEqual(api.mergeVisibleCategorySelection(['known', 'missing'], ['known', 'other'], ['other']), ['missing', 'other']);
  assert.deepEqual(api.mergeVisibleCategorySelection(['known', 'missing'], [], []), ['known', 'missing']);
  assert.deepEqual(api.mergeVisibleCategorySelection(['missing'], ['known'], []), ['missing']);
});

test('UI source displays unavailable selected Note categories instead of clearing them', () => {
  const source = readFileSync(join(here, '..', 'src', 'linked-notes-ui.js'), 'utf8');
  assert.match(source, /Selected locally; unavailable until categories refresh succeeds/);
  assert.match(source, /categoryIds: captured\.categoryIds/);
  assert.match(source, /mergeVisibleCategorySelection\(this\.state\.current\.categoryIds/);
});
