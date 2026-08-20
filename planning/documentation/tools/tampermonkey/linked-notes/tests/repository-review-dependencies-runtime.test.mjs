import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
require('../src/repository-local-change-store.js');
require('../src/review-dependency-markers.js');
require('../src/review-dependency-registry.js');
require('../src/review-dependency-fingerprint.js');
require('../src/repository-review-dependency-service.js');
const runtime = require('../src/repository-review-dependencies-runtime.js');
const api = globalThis.ObsLinkedNotes;

function missing(path) { const error = new Error(`Not found: ${path}`); error.kind = 'not_found'; return error; }
function makeClient(initial = {}) {
  const files = new Map(Object.entries(initial).map(([path, value], index) => [path, { path, content: String(value), sha: `sha-${index + 1}` }]));
  return {
    files,
    async read(path) { const file = files.get(path); if (!file) throw missing(path); return { ...file }; },
    async readBytes(path, options = {}) { const file = files.get(path); if (!file) throw missing(path); const bytes = new TextEncoder().encode(file.content); if (options.maxBytes && bytes.byteLength > options.maxBytes) throw new Error('too large'); return { path, sha: file.sha, bytes, size: bytes.byteLength }; }
  };
}

function makeClasses(client) {
  class FakeUI { constructor() { this.handlers = {}; this.state = {}; } render() {} }
  class FakeApp {
    constructor() {
      this.api = api;
      this.ui = new FakeUI();
      this.workspace = { id: 'w', owner: 'Org', repo: 'Docs', branch: 'main' };
      this.referenceObjectLocalState = { schemaVersion: 2, files: [] };
      this.repositoryPreview = null;
      this.surface = 'files';
    }
    _activeWorkspace() { return this.workspace; }
    _client() { return Promise.resolve(client); }
    async _ensureReferenceObjectLocalStateCurrent() { return this.referenceObjectLocalState; }
    async _stageRepositoryTextChange(path, baseSha, content, options = {}) {
      this.referenceObjectLocalState = api.upsertRepositoryLocalChange(this.referenceObjectLocalState, { path, baseSha, payloadKind: 'text', content, source: options.source || 'test', operation: baseSha ? 'update' : 'create' });
      return api.repositoryLocalChangeMap(this.referenceObjectLocalState).get(path);
    }
    _workspaceUiState() { return { surface: this.surface, repositoryPreview: this.repositoryPreview }; }
    _setUi(patch = {}) { this.ui.state = { ...this.ui.state, ...this._workspaceUiState(), ...patch }; }
    _runFilesWorkspaceRead(label, work) { return Promise.resolve().then(work); }
    async start() { this._setUi(); return true; }
    async selectWorkspace() { return this.workspace; }
    async openRepositoryEntry(entry) { const file = api.repositoryLocalChangeMap(this.referenceObjectLocalState).get(entry.path); const source = file ? { content: file.content, sha: file.baseSha } : await client.read(entry.path); this.repositoryPreview = { kind: 'text', path: entry.path, content: source.content, sha: source.sha }; this._setUi(); return this.repositoryPreview; }
  }
  return { FakeApp, FakeUI };
}

test('runtime creates a local relation with an unreviewed consumer marker and no remote write', async () => {
  const client = makeClient({ 'docs/a.md': 'Source', 'docs/b.md': 'Consumer' });
  const { FakeApp, FakeUI } = makeClasses(client);
  assert.equal(runtime.installRepositoryReviewDependencies({ LinkedNotesApp: FakeApp, LinkedNotesUI: FakeUI }), true);
  const app = new FakeApp();
  await app.start();
  assert.equal(typeof app.ui.handlers.onCreateReviewDependencyLocal, 'function');
  const created = await app.createReviewDependencyLocal({ id: 'rd_ab01', sourcePath: 'docs/a.md', consumerPath: 'docs/b.md', reason: 'B depends on A.' });
  assert.equal(created.id, 'rd_ab01');
  const pending = api.repositoryLocalChangeMap(app.referenceObjectLocalState);
  assert.ok(pending.has('.linked-notes/review-dependencies.json'));
  assert.match(pending.get('docs/b.md').content, /obs-review:dependency id="rd_ab01"/);
  assert.doesNotMatch(pending.get('docs/b.md').content, /against=/);
  assert.equal(created.diagnostics.relations[0].status, 'needs-review');
});

test('Review complete writes current source fingerprint and metadata edit does not acknowledge', async () => {
  const client = makeClient({ 'docs/a.md': 'Source', 'docs/b.md': 'Consumer' });
  const { FakeApp, FakeUI } = makeClasses(client);
  runtime.installRepositoryReviewDependencies({ LinkedNotesApp: FakeApp, LinkedNotesUI: FakeUI });
  const app = new FakeApp();
  await app.start();
  await app.createReviewDependencyLocal({ id: 'rd_ab01', sourcePath: 'docs/a.md', consumerPath: 'docs/b.md', reason: 'Original.' });
  await app.editReviewDependencyLocal('rd_ab01', { reason: 'Updated reason.' });
  let consumer = api.repositoryLocalChangeMap(app.referenceObjectLocalState).get('docs/b.md').content;
  assert.doesNotMatch(consumer, /against=/);
  const result = await app.completeReviewDependencyLocal('rd_ab01');
  assert.equal(result.status, 'current');
  consumer = api.repositoryLocalChangeMap(app.referenceObjectLocalState).get('docs/b.md').content;
  assert.match(consumer, /against="sha256:[a-f0-9]{64}"/);
});

test('pending source change makes a completed dependency need review again', async () => {
  const client = makeClient({ 'docs/a.md': 'Source v1', 'docs/b.md': 'Consumer' });
  const { FakeApp, FakeUI } = makeClasses(client);
  runtime.installRepositoryReviewDependencies({ LinkedNotesApp: FakeApp, LinkedNotesUI: FakeUI });
  const app = new FakeApp();
  await app.start();
  await app.createReviewDependencyLocal({ id: 'rd_ab01', sourcePath: 'docs/a.md', consumerPath: 'docs/b.md', reason: 'Depends.' });
  await app.completeReviewDependencyLocal('rd_ab01');
  await app._stageRepositoryTextChange('docs/a.md', client.files.get('docs/a.md').sha, 'Source v2', { source: 'file-editor' });
  const check = await app.refreshReviewDependencies({ silent: true });
  assert.equal(check.relations[0].status, 'needs-review');
  assert.equal(check.relations[0].sourceLocal, true);
});

test('existing Review Dependencies menu rerenders from updated UI state without duplicating the menu', () => {
  const previousDocument = globalThis.document;
  class FakeButton {
    addEventListener() {}
  }
  class FakeDetails {
    constructor() {
      this.dataset = {};
      this.open = false;
      this.innerHTML = '';
      this.toggleListenerCount = 0;
    }
    addEventListener(name) { if (name === 'toggle') this.toggleListenerCount += 1; }
    querySelector(selector) {
      if (selector === '[data-review-create]' || selector === '[data-review-refresh]') return new FakeButton();
      return null;
    }
    querySelectorAll() { return []; }
  }
  const host = {
    children: [],
    querySelector(selector) {
      if (selector !== '[data-review-dependencies-menu]') return null;
      return this.children.find((item) => item.dataset && item.dataset.reviewDependenciesMenu) || null;
    },
    appendChild(child) { this.children.push(child); return child; }
  };
  const shadow = {
    querySelector(selector) {
      if (selector === '.surface-tabs') return host;
      return null;
    },
    querySelectorAll() { return []; }
  };
  class MenuUI {
    constructor() {
      this.shadow = shadow;
      this.handlers = {};
      this.state = { surface: 'files', reviewDependencies: [], reviewDependenciesLoaded: false, reviewDependencyNeedsReviewCount: 0 };
    }
    render() {}
    _call() { return Promise.resolve(); }
  }
  class MenuApp {}

  try {
    globalThis.document = { createElement(tag) { assert.equal(tag, 'details'); return new FakeDetails(); } };
    assert.equal(runtime.installRepositoryReviewDependencies({ LinkedNotesApp: MenuApp, LinkedNotesUI: MenuUI }), true);
    const ui = new MenuUI();
    ui.render();
    assert.equal(host.children.length, 1);
    const details = host.children[0];
    assert.match(details.innerHTML, /No Review Dependencies loaded/);
    assert.equal(details.toggleListenerCount, 1);

    ui.state = {
      ...ui.state,
      reviewDependenciesLoaded: true,
      reviewDependencyNeedsReviewCount: 1,
      reviewDependencies: [{
        id: 'rd_ab01',
        sourcePath: 'docs/a.md',
        consumerPath: 'docs/b.md',
        reason: 'B depends on A.',
        status: 'needs-review',
        sourceLocal: false
      }]
    };
    ui.render();

    assert.equal(host.children.length, 1, 'rerender must reuse the existing details element');
    assert.equal(details.toggleListenerCount, 1, 'rerender must not duplicate the persistent toggle listener');
    assert.match(details.innerHTML, /rd_ab01/);
    assert.match(details.innerHTML, /NEEDS REVIEW/);
    assert.match(details.innerHTML, /1 need review/);
    assert.doesNotMatch(details.innerHTML, /No Review Dependencies loaded/);
  } finally {
    if (previousDocument === undefined) delete globalThis.document;
    else globalThis.document = previousDocument;
  }
});
