import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const markers = require('../src/reference-object-markers.js');
const registryApi = require('../src/reference-object-registry.js');
const localStore = require('../src/reference-object-local-store.js');
const service = require('../src/repository-reference-object-service.js');
const runtime = require('../src/repository-reference-objects-runtime.js');

const api = { ...markers, ...registryApi, ...localStore, ...service };
const registryPath = registryApi.DEFAULT_REFERENCE_OBJECT_REGISTRY_PATH;

function missing(path) {
  const error = new Error(`Not found: ${path}`);
  error.kind = 'not_found';
  return error;
}

function makeClient(initial = {}) {
  const files = new Map();
  const writes = [];
  let serial = 0;
  for (const [path, value] of Object.entries(initial)) {
    const content = String(value && value.content != null ? value.content : value || '');
    files.set(path, { path, content, sha: value && value.sha || `sha-${++serial}` });
  }
  const bytesOf = (content) => new TextEncoder().encode(content);
  const listDirectory = async (path = '') => {
    const prefix = path ? `${path}/` : '';
    const entries = new Map();
    for (const file of files.values()) {
      if (!file.path.startsWith(prefix)) continue;
      const rest = file.path.slice(prefix.length);
      if (!rest) continue;
      const slash = rest.indexOf('/');
      if (slash >= 0) {
        const name = rest.slice(0, slash);
        entries.set(`d:${name}`, { type: 'dir', path: prefix ? `${path}/${name}` : name, name, size: 0, sha: '' });
      } else {
        entries.set(`f:${rest}`, { type: 'file', path: file.path, name: rest, size: bytesOf(file.content).byteLength, sha: file.sha, htmlUrl: '' });
      }
    }
    if (!entries.size && path) throw missing(path);
    return [...entries.values()].sort((a, b) => a.path.localeCompare(b.path));
  };
  return {
    files, writes, listDirectory,
    async readMetadata(path) {
      const file = files.get(path);
      if (!file) throw missing(path);
      return { type: 'file', path, name: path.split('/').pop(), sha: file.sha, size: bytesOf(file.content).byteLength, htmlUrl: '' };
    },
    async readBytes(path, options = {}) {
      const file = files.get(path);
      if (!file) throw missing(path);
      const bytes = bytesOf(file.content);
      if (options.maxBytes && bytes.byteLength > options.maxBytes) throw new Error(`too large: ${path}`);
      return { type: 'file', path, name: path.split('/').pop(), sha: file.sha, size: bytes.byteLength, bytes, htmlUrl: '' };
    },
    async read(path) {
      const file = files.get(path);
      if (!file) throw missing(path);
      return { path, content: file.content, sha: file.sha, size: bytesOf(file.content).byteLength, htmlUrl: '' };
    },
    async saveVerified({ path, content, baseSha = '' }) {
      const current = files.get(path);
      if (baseSha) {
        if (!current || current.sha !== baseSha) { const error = new Error(`conflict: ${path}`); error.kind = 'conflict'; throw error; }
      } else if (current) { const error = new Error(`exists: ${path}`); error.kind = 'conflict'; throw error; }
      const sha = `saved-${++serial}`;
      files.set(path, { path, content: String(content), sha });
      writes.push({ path, content: String(content), baseSha });
      return { path, content: String(content), sha, size: bytesOf(String(content)).byteLength, htmlUrl: '' };
    }
  };
}

function makeClasses(client, storage = new Map()) {
  class FakeUI {
    constructor() { this.handlers = {}; this.state = {}; }
    mount() {}
    render() {}
  }
  class FakeApp {
    constructor() {
      this.api = api;
      this.workspaceById = {
        a: { id: 'a', owner: 'Org', repo: 'DocsA', branch: 'main' },
        b: { id: 'b', owner: 'Org', repo: 'DocsB', branch: 'main' }
      };
      this.workspace = this.workspaceById.a;
      this.ui = new FakeUI();
      this.ui.state = { surface: 'files', workspaces: Object.values(this.workspaceById), activeWorkspaceId: 'a' };
      this.repositoryPreview = null;
      this.repositoryEditor = { mode: 'none', parentPath: '', path: '', name: '', content: '', baseSha: '' };
      this.fileViewMode = 'source';
      this.fileRendered = null;
      this.surface = 'files';
      this.clipboard = [];
      this.clipboardWriter = async (text) => { this.clipboard.push(text); };
      this.getValue = async (key, fallback) => storage.has(key) ? structuredClone(storage.get(key)) : structuredClone(fallback);
      this.setValue = async (key, value) => { storage.set(key, structuredClone(value)); };
      this.remoteOperations = [];
      this.readOperations = [];
      this.status = '';
    }
    _activeWorkspace() { return this.workspace; }
    _client() { return Promise.resolve(client); }
    _setUi(patch = {}) {
      this.status = patch.status || this.status;
      this.ui.state = { ...this.ui.state, ...patch, surface: this.surface, repositoryPreview: this.repositoryPreview, repositoryEditor: this.repositoryEditor };
    }
    _runRemoteOperation(label, work) { this.remoteOperations.push(label); return Promise.resolve().then(work); }
    _runFilesWorkspaceRead(label, work) { this.readOperations.push(label); return Promise.resolve().then(work); }
    async start() { return true; }
    async selectWorkspace(id) { this.workspace = this.workspaceById[id]; this.ui.state.activeWorkspaceId = id; return this.workspace; }
    async saveWorkspace(workspace) { this.workspaceById[workspace.id] = { ...workspace }; this.workspace = this.workspaceById[workspace.id]; return this.workspace; }
    async deleteWorkspace(id) { delete this.workspaceById[id]; this.workspace = Object.values(this.workspaceById)[0] || null; return this.workspace; }
    async openPanel() { return true; }
    async openRepositoryEntry(entry) {
      const file = await client.read(entry.path);
      this.repositoryPreview = { path: entry.path, name: entry.name || entry.path.split('/').pop(), kind: 'text', content: file.content, sha: file.sha, context: this.workspace };
      this.repositoryEditor = { mode: 'none', parentPath: entry.path.includes('/') ? entry.path.slice(0, entry.path.lastIndexOf('/')) : '', path: '', name: '', content: '', baseSha: '' };
      this.surface = 'files';
      return this.repositoryPreview;
    }
    async beginRepositoryFileEdit() {
      const preview = this.repositoryPreview;
      const file = await client.read(preview.path);
      this.repositoryEditor = { mode: 'edit', parentPath: preview.path.includes('/') ? preview.path.slice(0, preview.path.lastIndexOf('/')) : '', path: preview.path, name: preview.name, content: file.content, baseSha: file.sha };
      return this.repositoryEditor;
    }
    async saveRepositoryEditor(input = {}) {
      const editor = { ...this.repositoryEditor, ...input };
      const saved = await client.saveVerified({ path: editor.path, content: editor.content, baseSha: editor.baseSha });
      this.repositoryPreview = { path: editor.path, name: editor.name, kind: 'text', content: editor.content, sha: saved.sha, context: this.workspace };
      this.repositoryEditor = { mode: 'none', parentPath: editor.parentPath, path: '', name: '', content: '', baseSha: '' };
      return { path: editor.path, content: editor.content, sha: saved.sha, size: new TextEncoder().encode(editor.content).byteLength };
    }
  }
  return { FakeApp, FakeUI };
}

function registryContent(object) {
  return registryApi.encodeReferenceObjectRegistry({ schemaVersion: 1, objects: [object] });
}

test('runtime wires handlers and isolates local Reference Object drafts by exact workspace', async () => {
  const client = makeClient({ 'docs/a.md': { content: 'Value 25', sha: 'a1' } });
  const storage = new Map();
  const { FakeApp, FakeUI } = makeClasses(client, storage);
  assert.equal(runtime.installRepositoryReferenceObjects({ LinkedNotesApp: FakeApp, LinkedNotesUI: FakeUI }), true);
  const app = new FakeApp();
  await app.start();
  assert.equal(typeof app.ui.handlers.onCreateReferenceObjectLocal, 'function');
  await app.openRepositoryEntry({ type: 'file', path: 'docs/a.md', name: 'a.md' });
  const found = await app.findReferenceObjectCandidates('25');
  const created = await app.createReferenceObjectLocal({ name: 'Damage', candidate: found.candidates[0] });
  assert.match(created.id, /^ro_/);
  assert.equal(app.referenceObjectLocalState.files.length, 2);
  await app.selectWorkspace('b');
  assert.equal(app.referenceObjectLocalState.files.length, 0);
  await app.selectWorkspace('a');
  assert.equal(app.referenceObjectLocalState.files.length, 2);
});

test('create uses exact same-line candidate, updates only local state, and Copy reference only writes clipboard', async () => {
  const client = makeClient({ 'docs/a.md': { content: 'Damage 25 / minimum 25 / fallback 25', sha: 'a1' } });
  const { FakeApp, FakeUI } = makeClasses(client);
  runtime.installRepositoryReferenceObjects({ LinkedNotesApp: FakeApp, LinkedNotesUI: FakeUI });
  const app = new FakeApp();
  await app.start();
  await app.openRepositoryEntry({ type: 'file', path: 'docs/a.md', name: 'a.md' });
  const found = await app.findReferenceObjectCandidates('25');
  assert.deepEqual(found.candidates.map((item) => item.lineOccurrence), [1, 2, 3]);
  const created = await app.createReferenceObjectLocal({ name: 'Minimum damage', candidate: found.candidates[1] });
  const localSource = app._referenceObjectLocalMap().get('docs/a.md').content;
  assert.match(localSource, new RegExp(`minimum <!-- obs-ref:def id="${created.id}" -->25<!-- /obs-ref:def -->`));
  assert.equal(client.writes.length, 0);
  const copied = await app.copyReferenceObjectUse(created.id);
  assert.equal(copied, `<!-- obs-ref:use id="${created.id}" -->25<!-- /obs-ref:use -->`);
  assert.deepEqual(app.clipboard, [copied]);
  assert.equal(client.writes.length, 0);
});

test('Check uses is read-only, stale uses turn into local drafts only on Update locally', async () => {
  const object = { id: 'ro_damage', name: 'Damage', definition: { path: 'docs/source.md' }, uses: [{ path: 'docs/use.md', line: 1, lineOccurrence: 1 }] };
  const client = makeClient({
    [registryPath]: { content: registryContent(object), sha: 'reg1' },
    'docs/source.md': { content: 'Damage <!-- obs-ref:def id="ro_damage" -->30<!-- /obs-ref:def -->', sha: 'src1' },
    'docs/use.md': { content: 'Zombie <!-- obs-ref:use id="ro_damage" -->25<!-- /obs-ref:use -->', sha: 'use1' }
  });
  const { FakeApp, FakeUI } = makeClasses(client);
  runtime.installRepositoryReferenceObjects({ LinkedNotesApp: FakeApp, LinkedNotesUI: FakeUI });
  const app = new FakeApp();
  await app.start();
  const check = await app.checkReferenceObjectUses('ro_damage');
  assert.equal(check.uses[0].status, 'stale');
  assert.equal(client.writes.length, 0);
  const plan = await app.updateReferenceObjectUsesLocal('ro_damage');
  assert.equal(plan.staleCount, 1);
  assert.equal(client.writes.length, 0);
  assert.match(app._referenceObjectLocalMap().get('docs/use.md').content, /-->30<!--/);
  assert.ok(app._referenceObjectLocalMap().has(registryPath));
});

test('independent GitHub update is blocked while local drafts are pending', async () => {
  const object = { id: 'ro_damage', name: 'Damage', definition: { path: 'docs/source.md' }, uses: [] };
  const client = makeClient({ [registryPath]: { content: registryContent(object), sha: 'reg1' }, 'docs/source.md': { content: '<!-- obs-ref:def id="ro_damage" -->30<!-- /obs-ref:def -->', sha: 'src1' } });
  const { FakeApp, FakeUI } = makeClasses(client);
  runtime.installRepositoryReferenceObjects({ LinkedNotesApp: FakeApp, LinkedNotesUI: FakeUI });
  const app = new FakeApp();
  await app.start();
  await app._putReferenceObjectLocalDraft('docs/source.md', 'src1', '<!-- obs-ref:def id="ro_damage" -->31<!-- /obs-ref:def -->');
  await assert.rejects(() => app.updateReferenceObjectUsesGitHub('ro_damage'), /Local Reference Object drafts are pending/);
  assert.equal(client.writes.length, 0);
});

test('publishing local drafts preflights all bases and writes Definitions File last', async () => {
  const object = { id: 'ro_damage', name: 'Damage', definition: { path: 'docs/source.md' }, uses: [] };
  const client = makeClient({ [registryPath]: { content: registryContent(object), sha: 'reg1' }, 'docs/source.md': { content: '<!-- obs-ref:def id="ro_damage" -->30<!-- /obs-ref:def -->', sha: 'src1' } });
  const { FakeApp, FakeUI } = makeClasses(client);
  runtime.installRepositoryReferenceObjects({ LinkedNotesApp: FakeApp, LinkedNotesUI: FakeUI });
  const app = new FakeApp();
  await app.start();
  await app._putReferenceObjectLocalDraft('docs/source.md', 'src1', '<!-- obs-ref:def id="ro_damage" -->31<!-- /obs-ref:def -->', { silent: true });
  const renamed = registryApi.renameReferenceObject(registryApi.decodeReferenceObjectRegistry(client.files.get(registryPath).content), 'ro_damage', 'New damage');
  await app._putReferenceObjectLocalDraft(registryPath, 'reg1', registryApi.encodeReferenceObjectRegistry(renamed), { silent: true });
  const result = await app.publishReferenceObjectLocalDraftsGitHub();
  assert.equal(result.length, 2);
  assert.deepEqual(client.writes.map((item) => item.path), ['docs/source.md', registryPath]);
  assert.equal(app.referenceObjectLocalState.files.length, 0);
  assert.match(client.files.get('docs/source.md').content, /-->31<!--/);
});

test('manual pasted use saved locally is reindexed into the local Definitions File', async () => {
  const object = { id: 'ro_damage', name: 'Damage', definition: { path: 'docs/source.md' }, uses: [] };
  const client = makeClient({
    [registryPath]: { content: registryContent(object), sha: 'reg1' },
    'docs/source.md': { content: '<!-- obs-ref:def id="ro_damage" -->30<!-- /obs-ref:def -->', sha: 'src1' },
    'docs/use.md': { content: 'Zombie damage: ', sha: 'use1' }
  });
  const { FakeApp, FakeUI } = makeClasses(client);
  runtime.installRepositoryReferenceObjects({ LinkedNotesApp: FakeApp, LinkedNotesUI: FakeUI });
  const app = new FakeApp();
  await app.start();
  await app.loadReferenceObjects();
  await app.openRepositoryEntry({ type: 'file', path: 'docs/use.md', name: 'use.md' });
  await app.beginRepositoryFileEdit();
  app.repositoryEditor.content += '<!-- obs-ref:use id="ro_damage" -->30<!-- /obs-ref:use -->';
  await app.saveRepositoryReferenceDraftLocal(app.repositoryEditor);
  assert.equal(client.writes.length, 0);
  const localRegistry = registryApi.decodeReferenceObjectRegistry(app._referenceObjectLocalMap().get(registryPath).content);
  assert.deepEqual(registryApi.referenceObjectById(localRegistry, 'ro_damage').uses, [{ path: 'docs/use.md', line: 1, lineOccurrence: 1 }]);
});

test('same-line usage focus resolves the requested occurrence rather than only the line', () => {
  const text = `${markers.formatReferenceUse('ro_damage', '10')} / ${markers.formatReferenceUse('ro_damage', '20')} / ${markers.formatReferenceUse('ro_damage', '30')}`;
  const second = runtime.locateReferenceFocusOccurrence(api, text, { objectId: 'ro_damage', role: 'use', line: 1, lineOccurrence: 2 });
  assert.ok(second);
  assert.equal(second.value, '20');
  assert.equal(text.slice(second.fullStart, second.fullEnd), markers.formatReferenceUse('ro_damage', '20'));
  const third = runtime.locateReferenceFocusOccurrence(api, text, { objectId: 'ro_damage', role: 'use', line: 1, lineOccurrence: 3 });
  assert.equal(third.value, '30');
  assert.notEqual(second.fullStart, third.fullStart);
});

test('Update locally is a true no-op when values and usage index are already current', async () => {
  const object = { id: 'ro_damage', name: 'Damage', definition: { path: 'docs/source.md' }, uses: [{ path: 'docs/use.md', line: 1, lineOccurrence: 1 }] };
  const client = makeClient({
    [registryPath]: { content: registryContent(object), sha: 'reg1' },
    'docs/source.md': { content: '<!-- obs-ref:def id="ro_damage" -->30<!-- /obs-ref:def -->', sha: 'src1' },
    'docs/use.md': { content: '<!-- obs-ref:use id="ro_damage" -->30<!-- /obs-ref:use -->', sha: 'use1' }
  });
  const { FakeApp, FakeUI } = makeClasses(client);
  runtime.installRepositoryReferenceObjects({ LinkedNotesApp: FakeApp, LinkedNotesUI: FakeUI });
  const app = new FakeApp();
  await app.start();
  const plan = await app.updateReferenceObjectUsesLocal('ro_damage');
  assert.equal(plan.staleCount, 0);
  assert.equal(app.referenceObjectLocalState.files.length, 0);
  assert.equal(client.writes.length, 0);
  assert.match(app.status, /No local draft was created/);
});

test('Open definition records the actual definition line for exact focus', async () => {
  const object = { id: 'ro_damage', name: 'Damage', definition: { path: 'docs/source.md' }, uses: [] };
  const client = makeClient({
    [registryPath]: { content: registryContent(object), sha: 'reg1' },
    'docs/source.md': { content: 'Heading\n\nValue <!-- obs-ref:def id="ro_damage" -->30<!-- /obs-ref:def -->\n', sha: 'src1' }
  });
  const { FakeApp, FakeUI } = makeClasses(client);
  runtime.installRepositoryReferenceObjects({ LinkedNotesApp: FakeApp, LinkedNotesUI: FakeUI });
  const app = new FakeApp();
  await app.start();
  await app.openReferenceObjectDefinition('ro_damage');
  assert.equal(app.referenceObjectFocus.line, 3);
  assert.equal(app.referenceObjectFocus.lineOccurrence, 1);
});

test('Reference Objects menu uses explicit shared popup state and loads only on explicit open', async () => {
  const namespace = globalThis.ObsLinkedNotes || (globalThis.ObsLinkedNotes = {});
  const previous = namespace.portalFilesWorkspaceDropdownPanel;
  let captured = null;
  namespace.portalFilesWorkspaceDropdownPanel = (ui, details, panel, options) => {
    captured = { ui, details, panel, options };
    return true;
  };
  try {
    const calls = [];
    const ui = {
      state: { referenceObjectsLoaded: false },
      _call(name, ...args) { calls.push([name, ...args]); return Promise.resolve(); }
    };
    const details = {};
    const panel = {};
    assert.equal(runtime.attachReferenceObjectsMenuPanel(ui, details, panel), true);
    assert.equal(captured.ui, ui);
    assert.equal(captured.details, details);
    assert.equal(captured.panel, panel);
    assert.equal(captured.options.key, 'reference-objects');
    assert.equal(captured.options.maxWidth, 680);
    assert.equal(captured.options.maxHeight, 620);
    await captured.options.onOpen();
    assert.deepEqual(calls, [['onLoadReferenceObjects', false]]);
    ui.state.referenceObjectsLoaded = true;
    await captured.options.onOpen();
    assert.equal(calls.length, 1, 'reconstructed/open loaded menus must not start another load automatically');
  } finally {
    if (previous === undefined) delete namespace.portalFilesWorkspaceDropdownPanel;
    else namespace.portalFilesWorkspaceDropdownPanel = previous;
  }
});
