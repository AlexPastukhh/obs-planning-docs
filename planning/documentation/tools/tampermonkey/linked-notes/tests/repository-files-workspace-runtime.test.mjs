import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const core = require('../src/repository-files-workspace-core.js');
const fileTemplates = require('../src/repository-file-templates.js');
const runtime = require('../src/repository-files-workspace-runtime.js');

function missing(message = 'missing') {
  const error = new Error(message);
  error.kind = 'not_found';
  return error;
}

function makeClient(initial = {}) {
  const files = new Map();
  const directories = new Map();
  const writes = [];
  const lists = [];
  for (const [path, value] of Object.entries(initial.files || {})) {
    const bytes = value.bytes instanceof Uint8Array ? value.bytes : new TextEncoder().encode(value.content || '');
    files.set(path, { path, name: path.split('/').pop(), sha: value.sha || `sha-${path}`, size: bytes.byteLength, bytes });
  }
  for (const [path, entries] of Object.entries(initial.directories || {})) directories.set(path, entries.map((entry) => ({ ...entry })));
  function rebuildDirectory(path) {
    const prefix = path ? `${path}/` : '';
    const seen = new Map();
    for (const file of files.values()) {
      if (!file.path.startsWith(prefix)) continue;
      const rest = file.path.slice(prefix.length);
      if (!rest || rest.includes('/')) {
        const first = rest.split('/')[0];
        if (first) seen.set(first, { type: 'dir', path: prefix ? `${path}/${first}` : first, name: first, size: 0, sha: '' });
      } else seen.set(rest, { type: 'file', path: file.path, name: file.name, size: file.size, sha: file.sha, htmlUrl: '' });
    }
    return [...seen.values()];
  }
  return {
    files, directories, writes, lists,
    async listDirectory(path) {
      lists.push(path);
      if (files.has(path)) { const e = new Error('not a directory'); e.kind = 'invalid_response'; throw e; }
      if (directories.has(path)) return directories.get(path).map((entry) => ({ ...entry }));
      const computed = rebuildDirectory(path);
      if (computed.length || path === '') return computed;
      throw missing(`Directory not found: ${path}`);
    },
    async readMetadata(path) {
      const file = files.get(path);
      if (!file) throw missing(`File not found: ${path}`);
      return { type: 'file', path, name: file.name, sha: file.sha, size: file.size, htmlUrl: '' };
    },
    async readBytes(path) {
      const file = files.get(path);
      if (!file) throw missing(`File not found: ${path}`);
      return { type: 'file', path, name: file.name, sha: file.sha, size: file.size, bytes: new Uint8Array(file.bytes), htmlUrl: '' };
    },
    async saveBytesVerified({ path, bytes, baseSha = '' }) {
      if (baseSha) throw new Error('test client only supports create');
      if (files.has(path)) { const e = new Error(`exists: ${path}`); e.kind = 'conflict'; throw e; }
      const copy = new Uint8Array(bytes);
      const record = { path, name: path.split('/').pop(), sha: `new-${writes.length + 1}`, size: copy.byteLength, bytes: copy };
      files.set(path, record);
      writes.push({ path, bytes: copy });
      return { ...record, verifiedHash: `hash-${path}` };
    }
  };
}

function makeAppClass(client, storage = new Map()) {
  class FakeUI {
    constructor() { this.handlers = {}; this.state = {}; }
    render() {}
    mount() {}
  }
  class FakeApp {
    constructor() {
      this.api = {
        ...core,
        ...fileTemplates,
        DEFAULT_TEXT_FILE_MAX_BYTES: 512 * 1024,
        DEFAULT_PREVIEW_MAX_BYTES: 512 * 1024,
        DEFAULT_COPY_MAX_BYTES: core.DEFAULT_COPY_MAX_BYTES,
        DEFAULT_COPY_MAX_FILES: core.DEFAULT_COPY_MAX_FILES,
        decodeUtf8Bytes(bytes) { return new TextDecoder('utf-8', { fatal: true }).decode(bytes); },
        async saveRepositoryTextFile(options) {
          const path = options.parentPath ? `${options.parentPath}/${options.name}` : options.name;
          try { await options.client.readMetadata(path); const e = new Error(`exists: ${path}`); e.kind = 'conflict'; throw e; } catch (error) { if (error.kind !== 'not_found') throw error; }
          const bytes = new TextEncoder().encode(String(options.content || ''));
          const result = await options.client.saveBytesVerified({ path, bytes, baseSha: '' });
          return { ...result, content: String(options.content || ''), size: bytes.byteLength };
        }
      };
      this.workspaceById = {
        a: { id: 'a', owner: 'Org', repo: 'DocsA', branch: 'main', basePath: 'notes-a', categoryBasePath: 'categories' },
        b: { id: 'b', owner: 'Org', repo: 'DocsB', branch: 'main', basePath: 'notes-b', categoryBasePath: 'categories' }
      };
      this.workspace = this.workspaceById.a;
      this.ui = new FakeUI();
      this.ui.state = { workspaces: Object.values(this.workspaceById), activeWorkspaceId: 'a', surface: 'files' };
      this.getValue = async (key, fallback) => storage.has(key) ? storage.get(key) : fallback;
      this.setValue = async (key, value) => { storage.set(key, JSON.parse(JSON.stringify(value))); };
      this.repositoryPath = '';
      this.repositoryEntries = [];
      this.repositoryPreview = null;
      this.repositoryEditor = { mode: 'none', parentPath: '', path: '', name: '', content: '', baseSha: '' };
      this.categoryIndex = { categories: new Map(), explicitCategoryIdsForTarget: () => [] };
      this.categoryContextRequiresRefresh = false;
      this.fileCategoryDraftIds = [];
      this.status = '';
      this.opened = [];
      this.appliedCategories = [];
      this.surface = 'files';
      this.clipboard = [];
      this.clipboardWriter = async (text) => { this.clipboard.push(text); };
      this.readOperations = [];
      this.remoteOperations = [];
    }
    _activeWorkspace() { return this.workspace; }
    _sameRepositoryContext(a, b) { return Boolean(a && b && a.owner === b.owner && a.repo === b.repo && a.branch === b.branch); }
    _client() { return Promise.resolve(client); }
    _setUi(patch) { this.status = patch.status || this.status; this.ui.state = { ...this.ui.state, ...patch, repositoryPath: this.repositoryPath, repositoryPreview: this.repositoryPreview, repositoryEditor: this.repositoryEditor, surface: this.surface }; }
    _runRemoteOperation(label, fn) { this.remoteOperations.push(label); return Promise.resolve().then(fn); }
    _runCancelableRepositoryRead(kind, label, fn) {
      this.readOperations.push({ kind, label });
      if (this.cancelNextRead) { this.cancelNextRead = false; return Promise.resolve({ cancelled: true }); }
      return Promise.resolve().then(fn);
    }
    _markCategoryContextStaleForRepositoryPath() { return false; }
    async start() { this.started = true; return true; }
    async browseRepository(path = '') {
      this.repositoryPath = path;
      this.repositoryEntries = await client.listDirectory(path, { maxEntries: 200 });
      this.repositoryPreview = null;
      this.surface = 'files';
      return this.repositoryEntries;
    }
    async openRepositoryEntry(entry) { this.opened.push(entry.path); this.repositoryPreview = { path: entry.path, name: entry.name, kind: 'text', context: this.workspace }; return this.repositoryPreview; }
    beginRepositoryFileCreate() { this.repositoryEditor = { mode: 'create', parentPath: this.repositoryPath, path: '', name: '', content: '', baseSha: '' }; return this.repositoryEditor; }
    cancelRepositoryEditor() { this.repositoryEditor = { mode: 'none', parentPath: this.repositoryPath, path: '', name: '', content: '', baseSha: '' }; return this.repositoryEditor; }
    async saveRepositoryEditor(input = {}) {
      const requested = { ...this.repositoryEditor, ...input };
      const path = requested.parentPath ? `${requested.parentPath}/${requested.name}` : requested.name;
      const bytes = new TextEncoder().encode(requested.content || '');
      await client.saveBytesVerified({ path, bytes, baseSha: '' });
      this.repositoryPreview = { path, name: requested.name, kind: 'text', context: this.workspace };
      this.repositoryEditor = { mode: 'none', parentPath: requested.parentPath, path: '', name: '', content: '', baseSha: '' };
      return { path, content: requested.content || '', size: bytes.byteLength, sha: client.files.get(path).sha };
    }
    async refreshCategories() { this.categoryIndex = { categories: new Map([['system', { id: 'system' }]]), explicitCategoryIdsForTarget: () => [] }; this.categoryContextRequiresRefresh = false; return true; }
    async applyFileCategories(path, ids) { this.appliedCategories.push({ path, ids: [...ids] }); return true; }
    async selectWorkspace(id) {
      if (!this.workspaceById[id]) throw new Error(`Unknown workspace: ${id}`);
      this.workspace = this.workspaceById[id];
      this.ui.state.activeWorkspaceId = id;
      return this.workspace;
    }
    async saveWorkspace(workspace) {
      const next = { ...workspace };
      this.workspaceById[next.id] = next;
      this.workspace = next;
      this.ui.state.workspaces = Object.values(this.workspaceById);
      this.ui.state.activeWorkspaceId = next.id;
      return next;
    }
    async deleteWorkspace(id) {
      delete this.workspaceById[id];
      const next = Object.values(this.workspaceById)[0] || null;
      this.workspace = next;
      this.ui.state.workspaces = Object.values(this.workspaceById);
      this.ui.state.activeWorkspaceId = next ? next.id : '';
      return next;
    }
    async openPanel() { this.openedPanel = true; return true; }
    async setSurface(surface) { this.surface = surface; return surface; }
  }
  return { FakeApp, FakeUI };
}

test('runtime auto-opens exact folder-name Markdown index and wires Files handlers', async () => {
  const client = makeClient({ directories: { 'game': [{ type: 'file', path: 'game/game.md', name: 'game.md', size: 4, sha: 'index' }, { type: 'file', path: 'game/other.md', name: 'other.md', size: 1, sha: 'other' }] } });
  const { FakeApp, FakeUI } = makeAppClass(client);
  const api = { LinkedNotesApp: FakeApp, LinkedNotesUI: FakeUI };
  assert.equal(runtime.installRepositoryFilesWorkspace(api), true);
  const app = new FakeApp();
  await app.start();
  await app.browseRepository('game');
  assert.deepEqual(app.opened, ['game/game.md']);
  assert.equal(typeof app.ui.handlers.onNavigateFilesLocation, 'function');
  assert.equal(typeof app.ui.handlers.onPreviewRepositoryStructure, 'function');
  assert.equal(typeof app.ui.handlers.onLoadRepositoryFileTemplates, 'function');
  assert.equal(typeof app.ui.handlers.onBeginRepositoryFileCreateFromTemplate, 'function');
  app.ui.mount();
  app.ui.__filesWorkspaceTopPopup = 'locations';
  assert.equal(typeof app.ui.__closeFilesWorkspaceTopPopupForPanelMove, 'function');
  app.ui.__closeFilesWorkspaceTopPopupForPanelMove();
  assert.equal(app.ui.__filesWorkspaceTopPopup, '', 'panel movement hook must close a portaled popup before the window moves');
});

test('Locations opens pasted repository-relative folders/files with bounded resolution and leaves state unchanged on invalid or missing paths', async () => {
  const client = makeClient({ files: {
    'docs/readme.md': { content: '# Readme', sha: 'readme' },
    'docs/sub/item.md': { content: '# Item', sha: 'item' }
  } });
  const { FakeApp, FakeUI } = makeAppClass(client);
  runtime.installRepositoryFilesWorkspace({ LinkedNotesApp: FakeApp, LinkedNotesUI: FakeUI });
  const app = new FakeApp();
  await app.start();

  await app.navigateRepositoryFilesLocation('path', 'docs/sub');
  assert.equal(app.repositoryPath, 'docs/sub');
  assert.deepEqual(client.lists, ['docs', 'docs/sub']);

  client.lists.length = 0;
  await app.navigateRepositoryFilesLocation('path', 'docs/readme.md');
  assert.equal(app.repositoryPath, 'docs');
  assert.equal(app.repositoryPreview.path, 'docs/readme.md');
  assert.deepEqual(app.opened.at(-1), 'docs/readme.md');
  assert.deepEqual(client.lists, ['docs', 'docs']);

  client.lists.length = 0;
  await app.navigateRepositoryFilesLocation('path', '/');
  assert.equal(app.repositoryPath, '');
  assert.deepEqual(client.lists, ['']);

  client.lists.length = 0;
  app.repositoryPath = 'docs';
  app.repositoryPreview = { path: 'docs/readme.md', name: 'readme.md' };
  const before = { path: app.repositoryPath, preview: app.repositoryPreview.path };
  await assert.rejects(() => app.navigateRepositoryFilesLocation('path', 'missing/path.md'), /not found/i);
  assert.deepEqual({ path: app.repositoryPath, preview: app.repositoryPreview.path }, before);
  assert.deepEqual(client.lists, ['missing']);
  for (const invalid of ['../escape', '/absolute/path', 'https://example.com/file.md', 'C:\\temp\\file.md']) {
    await assert.rejects(() => app.navigateRepositoryFilesLocation('path', invalid));
    assert.deepEqual({ path: app.repositoryPath, preview: app.repositoryPreview.path }, before);
  }
  assert.deepEqual(client.lists, ['missing'], 'invalid paths must be rejected before repository reads');
});

test('Locations prefers exact pending-local paths without metadata discovery', async () => {
  const client = makeClient({ directories: { drafts: [] } });
  const { FakeApp, FakeUI } = makeAppClass(client);
  runtime.installRepositoryFilesWorkspace({ LinkedNotesApp: FakeApp, LinkedNotesUI: FakeUI });
  const app = new FakeApp();
  await app.start();
  app.referenceObjectLocalState = { files: [{ path: 'drafts/new.md', content: 'pending', baseSha: '' }] };
  await app.navigateRepositoryFilesLocation('path', 'drafts/new.md');
  assert.equal(app.repositoryPath, 'drafts');
  assert.equal(app.opened.at(-1), 'drafts/new.md');
  assert.deepEqual(client.lists, ['drafts'], 'exact pending file must skip the parent metadata-resolution read');
});

test('document preset copies template literally then applies configured category after verified create', async () => {
  const client = makeClient({ files: { 'templates/system.md': { content: '# System\n\n| A | B |\n|---|---|\n', sha: 'tpl' } } });
  const storage = new Map();
  const { FakeApp, FakeUI } = makeAppClass(client, storage);
  runtime.installRepositoryFilesWorkspace({ LinkedNotesApp: FakeApp, LinkedNotesUI: FakeUI });
  const app = new FakeApp();
  await app.start();
  await app.saveRepositoryDocumentPreset({ name: 'System', categoryId: 'system', templatePath: 'templates/system.md' });
  await app.beginRepositoryFileCreateFromPreset('system');
  assert.equal(app.repositoryEditor.content, '# System\n\n| A | B |\n|---|---|\n');
  app.repositoryEditor.name = 'new-system.md';
  const result = await app.saveRepositoryEditor(app.repositoryEditor);
  assert.equal(result.categoryApplied, true);
  assert.deepEqual(app.appliedCategories, [{ path: 'new-system.md', ids: ['system'] }]);
  assert.equal(new TextDecoder().decode(client.files.get('new-system.md').bytes), '# System\n\n| A | B |\n|---|---|\n');
});

test('repository template discovery reads only valid direct template files and reports malformed candidates without writes', async () => {
  const client = makeClient({ files: {
    '.linked-notes/templates/README.md': { content: '# Rules\n', sha: 'readme' },
    '.linked-notes/templates/character.template.md': { content: '<!-- obs-template\nname: Character\n-->\n# Character\n', sha: 'character' },
    '.linked-notes/templates/project.template.md': { content: '<!-- obs-template\nname: Project\n-->\n---\ntype: project\n---\n', sha: 'project' },
    '.linked-notes/templates/broken.template.md': { content: '<!-- obs-template\nname:\n-->\ninvalid\n', sha: 'broken' },
    '.linked-notes/templates/nested/ignored.template.md': { content: '<!-- obs-template\nname: Nested\n-->\nignored\n', sha: 'nested' }
  } });
  const { FakeApp, FakeUI } = makeAppClass(client);
  runtime.installRepositoryFilesWorkspace({ LinkedNotesApp: FakeApp, LinkedNotesUI: FakeUI });
  const app = new FakeApp();
  await app.start();
  assert.equal(app.repositoryTemplatesLoaded, false, 'start must not scan templates automatically');

  const result = await app.loadRepositoryFileTemplates();
  assert.equal(result.initialized, true);
  assert.deepEqual(app.repositoryTemplates.map((item) => item.name), ['Character', 'Project']);
  assert.ok(app.repositoryTemplateDiagnostics.some((item) => item.path.endsWith('broken.template.md')));
  assert.ok(!app.repositoryTemplates.some((item) => item.name === 'Nested'));
  assert.deepEqual(app.readOperations.at(-1), { kind: 'files', label: 'Reading repository templates…' });
  assert.equal(client.writes.length, 0);
});

test('repository template selection strips only template metadata, preserves literal body, and waits for normal Create before writing', async () => {
  const body = '---\r\ntype: character\r\n---\r\nDamage: <!-- obs-ref:use id="ro_damage" -->25<!-- /obs-ref:use -->\r\n';
  const templatePath = '.linked-notes/templates/character.template.md';
  const client = makeClient({ files: { [templatePath]: { content: `<!-- obs-template\r\nname: Character\r\n-->\r\n${body}`, sha: 'template-sha' } } });
  const { FakeApp, FakeUI } = makeAppClass(client);
  runtime.installRepositoryFilesWorkspace({ LinkedNotesApp: FakeApp, LinkedNotesUI: FakeUI });
  const app = new FakeApp();
  await app.start();

  const editor = await app.beginRepositoryFileCreateFromTemplate(templatePath);
  assert.equal(editor.repositoryTemplate.name, 'Character');
  assert.equal(app.repositoryEditor.content, body);
  assert.equal(client.writes.length, 0, 'selecting a template must be read-only');
  assert.deepEqual(app.readOperations.at(-1), { kind: 'files', label: 'Reading repository template…' });

  app.repositoryEditor.name = 'hero.md';
  await app.saveRepositoryEditor(app.repositoryEditor);
  assert.equal(client.writes.length, 1);
  assert.equal(new TextDecoder().decode(client.files.get('hero.md').bytes), body);
});

test('missing template folder is an explicit empty state and workspace switch clears the loaded template index', async () => {
  const client = makeClient();
  const { FakeApp, FakeUI } = makeAppClass(client);
  runtime.installRepositoryFilesWorkspace({ LinkedNotesApp: FakeApp, LinkedNotesUI: FakeUI });
  const app = new FakeApp();
  await app.start();

  const missing = await app.loadRepositoryFileTemplates();
  assert.equal(missing.initialized, false);
  assert.equal(app.repositoryTemplatesLoaded, true);
  assert.deepEqual(app.repositoryTemplates, []);
  assert.match(app.status, /not initialized/i);
  assert.equal(client.writes.length, 0);

  app.repositoryTemplates = [{ name: 'stale', path: '.linked-notes/templates/stale.template.md', sha: 'x' }];
  app.repositoryTemplatesLoaded = true;
  app._setUi({ repositoryTemplates: [...app.repositoryTemplates], repositoryTemplatesLoaded: true, repositoryTemplatesContextKey: app.repositoryTemplatesContextKey });
  await app.selectWorkspace('b');
  assert.equal(app.repositoryTemplatesLoaded, false);
  assert.deepEqual(app.repositoryTemplates, []);
  assert.match(app.repositoryTemplatesContextKey, /DocsB/i);
  assert.deepEqual(app.ui.state.repositoryTemplates, []);
});

test('structure preview blocks existing files and successful apply only creates absent empty files/placeholders', async () => {
  const client = makeClient({ files: { 'docs/existing.md': { content: 'keep', sha: 'keep' } }, directories: { 'docs': [{ type: 'file', path: 'docs/existing.md', name: 'existing.md', size: 4, sha: 'keep' }] } });
  const { FakeApp, FakeUI } = makeAppClass(client);
  runtime.installRepositoryFilesWorkspace({ LinkedNotesApp: FakeApp, LinkedNotesUI: FakeUI });
  const app = new FakeApp();
  await app.start();
  app.repositoryPath = 'docs';
  const blocked = await app.previewRepositoryStructure('existing.md\nnew.md');
  assert.equal(blocked.blocked, true);
  await assert.rejects(() => app.applyRepositoryStructure(blocked), /conflicts|blocked/i);
  assert.equal(client.writes.length, 0);
  const ready = await app.previewRepositoryStructure('new.md\nempty/');
  assert.equal(ready.blocked, false);
  await app.applyRepositoryStructure(ready);
  assert.ok(client.files.has('docs/new.md'));
  assert.ok(client.files.has('docs/empty/.gitkeep'));
  assert.equal(new TextDecoder().decode(client.files.get('docs/existing.md').bytes), 'keep');
});

test('copy preflight blocks collisions before writes and successful copy preserves bytes', async () => {
  const sourceBytes = Uint8Array.from([0, 1, 2, 255, 42]);
  const client = makeClient({ files: { 'src/a.bin': { bytes: sourceBytes, sha: 'source-a' }, 'dest/a.bin': { content: 'occupied', sha: 'dest-a' } } });
  const { FakeApp, FakeUI } = makeAppClass(client);
  runtime.installRepositoryFilesWorkspace({ LinkedNotesApp: FakeApp, LinkedNotesUI: FakeUI });
  const app = new FakeApp();
  await app.start();
  const blocked = await app.previewRepositoryCopy({ sourceType: 'file', sourcePath: 'src/a.bin', destinationFolder: 'dest', destinationName: 'a.bin' });
  assert.equal(blocked.blocked, true);
  await assert.rejects(() => app.applyRepositoryCopy(blocked), /conflicts|blocked/i);
  assert.equal(client.writes.length, 0);
  const ready = await app.previewRepositoryCopy({ sourceType: 'file', sourcePath: 'src/a.bin', destinationFolder: 'copy', destinationName: 'renamed.bin' });
  assert.equal(ready.blocked, false);
  await app.applyRepositoryCopy(ready);
  assert.deepEqual([...client.files.get('copy/renamed.bin').bytes], [...sourceBytes]);
});


test('Files previews use the shared cancellable single-read lifecycle and cancellation performs no writes', async () => {
  const client = makeClient({ files: { 'src/a.md': { content: 'a', sha: 'source-a' } } });
  const { FakeApp, FakeUI } = makeAppClass(client);
  runtime.installRepositoryFilesWorkspace({ LinkedNotesApp: FakeApp, LinkedNotesUI: FakeUI });
  const app = new FakeApp();
  await app.start();

  const structure = await app.previewRepositoryStructure('new.md');
  assert.equal(structure.blocked, false);
  assert.deepEqual(app.readOperations.at(-1), { kind: 'files', label: 'Previewing repository structure…' });
  assert.equal(app.remoteOperations.at(-1), 'Previewing repository structure…');

  app.cancelNextRead = true;
  const cancelled = await app.previewRepositoryCopy({ sourceType: 'file', sourcePath: 'src/a.md', destinationFolder: 'copy', destinationName: 'a.md' });
  assert.equal(cancelled.cancelled, true);
  assert.deepEqual(app.readOperations.at(-1), { kind: 'files', label: 'Previewing repository copy…' });
  assert.match(app.status, /Files read cancelled/i);
  assert.doesNotMatch(app.status, /Notes refresh cancelled/i);
  assert.equal(client.writes.length, 0);
});

test('folder copy blocks an already-existing destination root before any write', async () => {
  const client = makeClient({
    files: { 'src/a.md': { content: 'source', sha: 'source-a' } },
    directories: { 'dest/existing': [] }
  });
  const { FakeApp, FakeUI } = makeAppClass(client);
  runtime.installRepositoryFilesWorkspace({ LinkedNotesApp: FakeApp, LinkedNotesUI: FakeUI });
  const app = new FakeApp();
  await app.start();

  const blocked = await app.previewRepositoryCopy({ sourceType: 'folder', sourcePath: 'src', destinationFolder: 'dest', destinationName: 'existing' });
  assert.equal(blocked.blocked, true);
  assert.ok(blocked.statuses.some((item) => item.target === 'dest/existing' && item.status === 'conflict'));
  await assert.rejects(() => app.applyRepositoryCopy(blocked), /conflicts|blocked/i);
  assert.equal(client.writes.length, 0);
});

test('workspace switch reloads exact workspace-scoped shortcuts and document presets', async () => {
  const client = makeClient();
  const storage = new Map();
  const { FakeApp, FakeUI } = makeAppClass(client, storage);
  runtime.installRepositoryFilesWorkspace({ LinkedNotesApp: FakeApp, LinkedNotesUI: FakeUI });
  const app = new FakeApp();
  await app.start();

  await app.saveRepositoryDocumentPreset({ name: 'A type', categoryId: 'a-category', templatePath: 'templates/a.md' });
  app.repositoryPath = 'area-a';
  await app.addRepositoryFolderShortcut('A folder');
  assert.deepEqual(app.filesWorkspacePreferences.documentPresets.map((item) => item.name), ['A type']);
  assert.deepEqual(app.filesWorkspacePreferences.folderShortcuts.map((item) => item.name), ['A folder']);

  await app.selectWorkspace('b');
  assert.deepEqual(app.filesWorkspacePreferences.documentPresets, []);
  assert.deepEqual(app.filesWorkspacePreferences.folderShortcuts, []);
  await app.saveRepositoryDocumentPreset({ name: 'B type', categoryId: 'b-category', templatePath: 'templates/b.md' });
  app.repositoryPath = 'area-b';
  await app.addRepositoryFolderShortcut('B folder');
  assert.deepEqual(app.filesWorkspacePreferences.documentPresets.map((item) => item.name), ['B type']);
  assert.deepEqual(app.filesWorkspacePreferences.folderShortcuts.map((item) => item.name), ['B folder']);

  await app.selectWorkspace('a');
  assert.deepEqual(app.filesWorkspacePreferences.documentPresets.map((item) => item.name), ['A type']);
  assert.deepEqual(app.filesWorkspacePreferences.folderShortcuts.map((item) => item.name), ['A folder']);
  assert.match(app.ui.state.filesWorkspacePreferencesKey, /DocsA/i);
});

test('UI enhancement replaces the real Files sidebar New file action with the repository-template menu', () => {
  const previousDocument = globalThis.document;
  class FakeElement {
    constructor(tag = 'div') {
      this.tag = tag;
      this.dataset = {};
      this.children = [];
      this.replacement = null;
      this.open = false;
      this.style = {};
    }
    addEventListener() {}
    appendChild(child) { this.children.push(child); return child; }
    querySelector() { return null; }
    querySelectorAll() { return []; }
    closest() { return null; }
    replaceWith(node) { this.replacement = node; }
    remove() {}
    set innerHTML(value) { this._innerHTML = value; }
    get innerHTML() { return this._innerHTML || ''; }
  }

  try {
    globalThis.document = {
      createElement(tag) { return new FakeElement(tag); },
      addEventListener() {},
      removeEventListener() {}
    };
    const client = makeClient();
    const base = makeAppClass(client);
    const newFileButton = new FakeElement('button');
    const editorToolbar = new FakeElement('div');
    const shadow = new FakeElement('shadow');
    shadow.querySelectorAll = (selector) => selector === '[data-action="new-repository-file"]' ? [newFileButton] : [];
    shadow.querySelector = (selector) => {
      if (selector === '.editor .editor-toolbar' || selector === '.editor-toolbar') return editorToolbar;
      return null;
    };

    class DomUI {
      constructor() {
        this.handlers = {};
        this.shadow = shadow;
        this.state = {
          surface: 'files',
          busy: false,
          workspaces: [],
          activeWorkspaceId: '',
          repositoryPath: '',
          repositoryPreview: null,
          repositoryEditor: { mode: 'none' }
        };
      }
      mount() {}
      render() {}
    }

    runtime.installRepositoryFilesWorkspace({ LinkedNotesApp: base.FakeApp, LinkedNotesUI: DomUI });
    const ui = new DomUI();
    ui.render();
    assert.ok(newFileButton.replacement);
    assert.equal(newFileButton.replacement.dataset.filesNewMenu, '1');
    assert.match(newFileButton.replacement.innerHTML, /Blank file/);
    assert.match(newFileButton.replacement.innerHTML, /Repository templates/);
    assert.doesNotMatch(newFileButton.replacement.innerHTML, /Add document preset/);
  } finally {
    if (previousDocument === undefined) delete globalThis.document;
    else globalThis.document = previousDocument;
  }
});

test('installer patches newly replaced constructors on same namespace while leaving already-patched prototypes idempotent', () => {
  const c1 = makeClient();
  const first = makeAppClass(c1);
  const namespace = { LinkedNotesApp: first.FakeApp, LinkedNotesUI: first.FakeUI };
  assert.equal(runtime.installRepositoryFilesWorkspace(namespace), true);
  assert.equal(runtime.installRepositoryFilesWorkspace(namespace), false);
  const second = makeAppClass(makeClient());
  namespace.LinkedNotesApp = second.FakeApp;
  namespace.LinkedNotesUI = second.FakeUI;
  assert.equal(runtime.installRepositoryFilesWorkspace(namespace), true);
  assert.equal(typeof second.FakeApp.prototype.previewRepositoryCopy, 'function');
});

test('Files read transport publishes request progress through the shared read-operation state', async () => {
  const client = makeClient();
  let listener = null;
  client.transport = {
    setProgressListener(next) { listener = next; },
    abortAll() { return 0; }
  };
  const { FakeApp, FakeUI } = makeAppClass(client);
  runtime.installRepositoryFilesWorkspace({ LinkedNotesApp: FakeApp, LinkedNotesUI: FakeUI });
  const app = new FakeApp();
  await app.start();
  app.__obsReadOnlyOperation = {
    kind: 'files',
    label: 'Previewing repository copy…',
    cancelable: true,
    cancelRequested: false,
    network: { started: 0, finished: 0, pending: 0, cancelled: false },
    categoryProgress: null,
    lastNetworkUiAt: 0
  };

  await app._client();
  assert.equal(typeof listener, 'function');
  listener({ started: 3, finished: 1, pending: 2, cancelled: false });
  assert.equal(app.ui.state.readOperation.kind, 'files');
  assert.deepEqual(app.ui.state.readOperation.network, { started: 3, finished: 1, pending: 2, cancelled: false });
});

test('open Files modal survives destructive base rerenders and is dropped after workspace context changes', () => {
  const previousDocument = globalThis.document;
  class FakeNode {
    constructor(tag = 'div') {
      this.tag = tag;
      this.dataset = {};
      this.style = {};
      this.textContent = '';
      this.parent = null;
    }
    addEventListener() {}
    remove() { if (this.parent && this.parent.modal === this) this.parent.modal = null; this.parent = null; }
  }
  const workspaceA = { id: 'a', owner: 'Org', repo: 'DocsA', branch: 'main' };
  const workspaceB = { id: 'b', owner: 'Org', repo: 'DocsB', branch: 'main' };
  const modal = new FakeNode('modal');
  modal.__filesWorkspaceContextKey = core.workspaceFilesPreferenceKey(workspaceA);
  const shadow = {
    modal,
    styleNode: null,
    querySelector(selector) {
      if (selector === '[data-files-structure-modal]') return this.modal;
      if (selector === '[data-files-copy-modal]') return null;
      if (selector === 'style[data-files-workspace-style]') return this.styleNode;
      if (selector === '.surface-tabs' || selector === '.editor .editor-toolbar' || selector === '.editor-toolbar') return null;
      return null;
    },
    querySelectorAll() { return []; },
    appendChild(node) {
      if (node && node.dataset && node.dataset.filesWorkspaceStyle) this.styleNode = node;
      else { this.modal = node; node.parent = this; }
      return node;
    },
    addEventListener() {}
  };
  modal.parent = shadow;

  try {
    globalThis.document = {
      createElement(tag) { return new FakeNode(tag); },
      addEventListener() {},
      removeEventListener() {}
    };
    const base = makeAppClass(makeClient());
    class DestructiveUI {
      constructor() {
        this.handlers = {};
        this.shadow = shadow;
        this.state = {
          surface: 'files', busy: false, activeWorkspaceId: 'a', workspaces: [workspaceA, workspaceB],
          repositoryPath: '', repositoryPreview: null, repositoryEditor: { mode: 'none' }
        };
      }
      mount() {}
      render() { shadow.modal = null; shadow.styleNode = null; return true; }
    }

    runtime.installRepositoryFilesWorkspace({ LinkedNotesApp: base.FakeApp, LinkedNotesUI: DestructiveUI });
    const ui = new DestructiveUI();
    ui.render();
    assert.equal(shadow.modal, modal, 'modal node must be reattached after base render replaces shadow.innerHTML');
    assert.match(shadow.styleNode.textContent, /files-workspace-popup-layer[^}]*color:var\(--text\)/, 'portaled popup layer must inherit the Linked Notes foreground');
    assert.match(shadow.styleNode.textContent, /files-workspace-popup-layer[^}]*color-scheme:dark/, 'portaled popup layer must retain dark native-control theming');

    shadow.modal = modal;
    modal.parent = shadow;
    ui.state.activeWorkspaceId = 'b';
    ui.render();
    assert.equal(shadow.modal, null, 'modal from the previous repository context must not survive a workspace switch');
  } finally {
    if (previousDocument === undefined) delete globalThis.document;
    else globalThis.document = previousDocument;
  }
});

test('shared top popup stays above the base panel, survives destructive rerender, reopens after errors, and falls back when clamp throws', async () => {
  const previousDocument = globalThis.document;
  const namespace = globalThis.ObsLinkedNotes || (globalThis.ObsLinkedNotes = {});
  const previousClamp = namespace.clampRepositoryLinkPopoverRect;
  class FakeElement {
    constructor(tag = 'div') {
      this.tag = tag;
      this.dataset = {};
      this.style = {};
      this.children = [];
      this.parent = null;
      this.hidden = false;
      this.open = false;
      this.listeners = new Map();
    }
    addEventListener(name, fn) { this.listeners.set(name, fn); }
    appendChild(child) {
      if (child.parent && Array.isArray(child.parent.children)) child.parent.children = child.parent.children.filter((item) => item !== child);
      child.parent = this;
      this.children.push(child);
      return child;
    }
    querySelector() { return null; }
    querySelectorAll() { return []; }
  }

  const main = new FakeElement('main');
  main.getBoundingClientRect = () => ({ left: 300, right: 1100, top: 0, bottom: 700, width: 800, height: 700 });
  let layer = null;
  const shadow = {
    host: null,
    querySelector(selector) {
      if (selector === '[data-files-workspace-popup-layer]') return layer;
      if (selector === '.main') return main;
      if (selector === '.panel') return null;
      return null;
    },
    querySelectorAll(selector) {
      if (selector === '[data-files-workspace-popup-panel]') return layer ? layer.children.filter((item) => item.dataset && item.dataset.filesWorkspacePopupPanel) : [];
      return [];
    },
    appendChild(node) {
      if (node.dataset && node.dataset.filesWorkspacePopupLayer) layer = node;
      return node;
    }
  };

  const makeMenu = () => {
    const summary = new FakeElement('summary');
    summary.getBoundingClientRect = () => ({ left: 900, right: 1020, top: 80, bottom: 114, width: 120, height: 34 });
    const details = new FakeElement('details');
    details.querySelector = (selector) => selector === 'summary' ? summary : null;
    const panel = new FakeElement('panel');
    return { summary, details, panel };
  };

  try {
    globalThis.document = { createElement(tag) { return new FakeElement(tag); } };
    namespace.clampRepositoryLinkPopoverRect = () => { throw new Error('synthetic layout failure'); };
    const ui = { shadow, state: { activeWorkspaceId: 'a', surface: 'files' } };
    let opens = 0;
    const first = makeMenu();
    assert.equal(runtime.portalFilesWorkspaceDropdownPanel(ui, first.details, first.panel, { key: 'locations', maxWidth: 680, maxHeight: 420, onOpen: () => { opens += 1; } }), true);
    assert.ok(layer, 'portal layer must be attached directly to the Shadow root');
    assert.equal(layer.style.zIndex, '2147483647', 'shared popup layer must not sit below the base Linked Notes panel');
    assert.equal(first.panel.hidden, true);

    first.summary.listeners.get('click')({ preventDefault() {} });
    assert.equal(ui.__filesWorkspaceTopPopup, 'locations');
    assert.equal(first.panel.hidden, false);
    assert.equal(opens, 1);
    assert.equal(first.panel.style.position, 'fixed', 'fallback positioning must survive a throwing clamp helper');
    const left = Number.parseFloat(first.panel.style.left);
    const width = Number.parseFloat(first.panel.style.width);
    assert.ok(left >= 308);
    assert.ok(left + width <= 1092);

    // Simulate base render replacing the entire Shadow DOM. Explicit popup state remains on the UI object.
    layer = null;
    const second = makeMenu();
    assert.equal(runtime.portalFilesWorkspaceDropdownPanel(ui, second.details, second.panel, { key: 'locations', maxWidth: 680, maxHeight: 420, onOpen: () => { opens += 1; } }), true);
    assert.equal(second.panel.hidden, false, 'the same popup must be reconstructed open after destructive render');
    assert.equal(opens, 1, 'reconstruction must not rerun the network/load onOpen hook');

    second.summary.listeners.get('click')({ preventDefault() {} });
    assert.equal(ui.__filesWorkspaceTopPopup, '');
    assert.equal(second.panel.hidden, true);
    second.summary.listeners.get('click')({ preventDefault() {} });
    assert.equal(ui.__filesWorkspaceTopPopup, 'locations');
    assert.equal(second.panel.hidden, false);
    assert.equal(opens, 2, 'a later explicit reopen must run onOpen again');
  } finally {
    if (previousClamp === undefined) delete namespace.clampRepositoryLinkPopoverRect;
    else namespace.clampRepositoryLinkPopoverRect = previousClamp;
    if (previousDocument === undefined) delete globalThis.document;
    else globalThis.document = previousDocument;
  }
});
