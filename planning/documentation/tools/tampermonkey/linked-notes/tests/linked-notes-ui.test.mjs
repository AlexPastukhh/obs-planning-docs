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


test('panel starts centered while retaining bounded responsive dimensions', () => {
  assert.deepEqual(api.panelViewportLayout(1293, 638), {
    edge: 12,
    left: 157,
    top: 54,
    width: 980,
    height: 530
  });
});

test('panel keeps centered usable dimensions on compact and short viewports', () => {
  assert.deepEqual(api.panelViewportLayout(700, 600), {
    edge: 12,
    left: 12,
    top: 54,
    width: 676,
    height: 492
  });
  assert.deepEqual(api.panelViewportLayout(390, 480), {
    edge: 12,
    left: 12,
    top: 12,
    width: 366,
    height: 456
  });
});

test('custom panel placement allows horizontal edge peek while keeping a 64px recovery strip and vertical bounds', () => {
  assert.deepEqual(api.clampPanelPosition(-2000, -50, 980, 530, 1293, 638), { left: -916, top: 12 });
  assert.deepEqual(api.clampPanelPosition(3000, 999, 980, 530, 1293, 638), { left: 1229, top: 96 });
  assert.deepEqual(api.clampPanelPosition(999, 999, 300, 200, 800, 600, 12, 20, 30), { left: 756, top: 418 });
  assert.deepEqual(api.clampPanelPosition(-999, 40, 300, 200, 800, 600, 12, 20, 30), { left: -216, top: 42 });
});

test('drag uses live panel lookup so destructive rerenders cannot detach movement state', () => {
  const previousWindow = globalThis.window;
  const makePanel = (left = 157, top = 54) => ({
    style: {},
    dataset: {},
    getBoundingClientRect() { return { left, top, width: 980, height: 530 }; }
  });
  const firstPanel = makePanel();
  const secondPanel = makePanel(12, 12);
  let currentPanel = firstPanel;
  const handle = {
    captures: [], releases: [],
    setPointerCapture(id) { this.captures.push(id); },
    releasePointerCapture(id) { this.releases.push(id); }
  };
  try {
    globalThis.window = { innerWidth: 1293, innerHeight: 638, visualViewport: null };
    const ui = new api.LinkedNotesUI();
    ui.shadow = { querySelector(selector) { return selector === '.panel' ? currentPanel : null; } };
    let popupCloses = 0;
    ui.__closeFilesWorkspaceTopPopupForPanelMove = () => { popupCloses += 1; };
    ui._positionPanel();
    assert.equal(firstPanel.style.left, '157px');
    assert.equal(firstPanel.style.top, '54px');
    ui._beginPanelDrag({ button: 0, pointerId: 7, clientX: 200, clientY: 100, currentTarget: handle, preventDefault() {} });
    ui._movePanelDrag({ pointerId: 7, clientX: -2000, clientY: -500 });
    assert.deepEqual(ui.panelPlacement, { mode: 'custom', left: -916, top: 12 });
    assert.equal(firstPanel.style.left, '-916px');
    assert.equal(firstPanel.style.top, '12px');

    currentPanel = secondPanel;
    ui._positionPanel();
    assert.equal(secondPanel.style.left, '-916px', 'replacement panel must inherit the live left-edge peek placement');
    assert.equal(secondPanel.style.top, '12px');
    ui._movePanelDrag({ pointerId: 7, clientX: 3000, clientY: 300 });
    assert.equal(secondPanel.style.left, '1229px', 'pointermove must target the replacement live panel and allow right-edge peek');
    assert.equal(secondPanel.style.top, '96px');
    assert.deepEqual(ui.panelPlacement, { mode: 'custom', left: 1229, top: 96 });
    ui._endPanelDrag({ pointerId: 7, clientX: 3000, clientY: 300 });
    assert.deepEqual(ui.panelPlacement, { mode: 'custom', left: 1229, top: 96 });
    assert.equal(secondPanel.dataset.dragging, undefined);
    assert.equal(popupCloses, 1);
    assert.deepEqual(handle.captures, [7]);
    assert.deepEqual(handle.releases, [7]);

    ui._centerPanel();
    assert.deepEqual(ui.panelPlacement, { mode: 'center', left: 0, top: 0 });
    assert.equal(secondPanel.style.left, '157px');
    assert.equal(secondPanel.style.top, '54px');
    assert.equal(popupCloses, 2);
  } finally {
    if (previousWindow === undefined) delete globalThis.window;
    else globalThis.window = previousWindow;
  }
});

test('viewport changes close transient popup state before repositioning the panel', () => {
  const ui = new api.LinkedNotesUI();
  const order = [];
  ui.__closeFilesWorkspaceTopPopupForPanelMove = () => order.push('close');
  ui._positionPanel = () => order.push('position');
  ui._onViewportChange();
  assert.deepEqual(order, ['close', 'position']);
});

test('panel source keeps independent scrolling and a visible workspace-manager action', () => {
  const source = readFileSync(join(here, '..', 'src', 'linked-notes-ui.js'), 'utf8');
  assert.match(source, /\.main \{[^}]*min-height: 0;[^}]*overflow: hidden;/s);
  assert.match(source, /\.editor \{[^}]*flex: 1 1 0;[^}]*overflow-y: auto;/s);
  assert.match(source, /\.notes \{[^}]*flex: 1 1 0;[^}]*overflow-y: auto;/s);
  assert.match(source, /z-index: 2147483647/);
  assert.match(source, /data-action="manage-workspaces"/);
  assert.match(source, /data-panel-drag-handle/);
  assert.match(source, /panel-edge-grip-left/);
  assert.match(source, /panel-edge-grip-right/);
  assert.match(source, /data-action="center-panel"/);
  assert.match(source, /touch-action: none/);
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

test('UI renders and routes contextual feedback retry actions', () => {
  const source = readFileSync(join(here, '..', 'src', 'linked-notes-ui.js'), 'utf8');
  assert.match(source, /data-feedback-action=/);
  assert.match(source, /onFeedbackAction/);
  assert.match(source, /feedback-actions/);
});
