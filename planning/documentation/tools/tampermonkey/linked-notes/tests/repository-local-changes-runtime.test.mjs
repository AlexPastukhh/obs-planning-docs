import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const source = require('node:fs').readFileSync(new URL('../src/repository-local-changes-runtime.js', import.meta.url), 'utf8');
require('../src/repository-local-change-store.js');
require('../src/github-contents-client.js');
require('../src/repository-change-publisher.js');
const runtime = require('../src/repository-local-changes-runtime.js');

test('local-first runtime exposes separate current and all publishers', () => {
  assert.match(source, /updateCurrentRepositoryFileGitHub/);
  assert.match(source, /updateAllRepositoryChangesGitHub/);
  assert.match(source, /publishCurrentRepositoryChange/);
  assert.match(source, /publishAllRepositoryChanges/);
  assert.doesNotMatch(source, /Order GitHub/);
});

test('local-first runtime overrides file, structure and copy business actions with staging', () => {
  assert.match(source, /App\.prototype\.saveRepositoryEditor = async function localFirst/);
  assert.match(source, /App\.prototype\.applyRepositoryStructure = async function localFirst/);
  assert.match(source, /App\.prototype\.applyRepositoryCopy = async function localFirst/);
  assert.match(source, /_stageRepositoryBinaryChange/);
});

test('pending new paths are projected into the browsable repository tree', () => {
  const api = globalThis.ObsLinkedNotes;
  const state = api.upsertRepositoryLocalChange(null, { path: 'docs/new/file.md', content: 'local', source: 'editor' });
  const app = { api: { ...api, normalizeFilesWorkspacePath: (value, options = {}) => !value && options.allowRoot ? '' : api.normalizeRepositoryLocalPath(value), sortRepositoryEntries: (entries) => entries.sort((a, b) => a.path.localeCompare(b.path)) }, referenceObjectLocalState: state };
  const root = runtime.mergePendingRepositoryEntries(app, '', []);
  assert.deepEqual(root.map((entry) => [entry.type, entry.path, entry.localPending]), [['dir', 'docs', true]]);
  const docs = runtime.mergePendingRepositoryEntries(app, 'docs', []);
  assert.deepEqual(docs.map((entry) => [entry.type, entry.path, entry.localPending]), [['dir', 'docs/new', true]]);
  const nested = runtime.mergePendingRepositoryEntries(app, 'docs/new', []);
  assert.deepEqual(nested.map((entry) => [entry.type, entry.path, entry.localPending]), [['file', 'docs/new/file.md', true]]);
});

test('Save locally is enabled from activeWorkspaceId/workspaces without requiring a token', () => {
  const previousDocument = globalThis.document;
  const editorSave = { textContent: '', disabled: true };
  const shadow = {
    querySelector(selector) {
      if (selector === '.repository-editor [data-action="save-repository-editor"]') return editorSave;
      return null;
    }
  };
  class FakeApp {}
  class FakeUI {
    constructor() {
      this.handlers = {};
      this.shadow = shadow;
      this.state = {
        surface: 'files',
        busy: false,
        hasToken: false,
        activeWorkspaceId: 'a',
        workspaces: [{ id: 'a', owner: 'Org', repo: 'Docs', branch: 'main' }],
        repositoryEditor: { mode: 'create' }
      };
    }
    render() { return true; }
  }

  try {
    globalThis.document = { createElement() { throw new Error('toolbar controls should not be created in this test'); } };
    assert.equal(runtime.installRepositoryLocalChanges({ LinkedNotesApp: FakeApp, LinkedNotesUI: FakeUI }), true);
    const ui = new FakeUI();

    ui.render();
    assert.equal(editorSave.textContent, 'Save locally');
    assert.equal(editorSave.disabled, false, 'selected workspace must enable local save even when no GitHub token is present');

    ui.state.busy = true;
    ui.render();
    assert.equal(editorSave.disabled, true, 'busy state must disable local save');

    ui.state.busy = false;
    ui.state.activeWorkspaceId = 'missing';
    ui.render();
    assert.equal(editorSave.disabled, true, 'missing active workspace must disable local save');
  } finally {
    if (previousDocument === undefined) delete globalThis.document;
    else globalThis.document = previousDocument;
  }
});

test('Definitions File current-only publication is guarded when a canonical definition is also pending', () => {
  assert.match(source, /Definitions File cannot be published alone while canonical definition path\(s\) are pending/);
  assert.match(source, /Use Update all so dependency review acknowledgements and the definitions they were checked against publish coherently/);
});
