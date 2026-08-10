import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const require = createRequire(import.meta.url);
const {
  normalizeChildName,
  childRepositoryPath,
  assertTextSize,
  saveRepositoryTextFile,
  createRepositoryFolder
} = require('../src/repository-text-file-write.js');

function normalizePath(value) {
  const text = String(value == null ? '' : value).replace(/\\/g, '/').trim().replace(/^\/+|\/+$/g, '');
  if (!text || /(^|\/)(?:\.{1,2}|)(?:\/|$)/.test(text) || /[?#\u0000-\u001f\u007f]/.test(text)) {
    if (!text) throw new TypeError('path required');
  }
  const parts = text.split('/');
  if (parts.some((item) => !item || item === '.' || item === '..')) throw new TypeError('bad path');
  return parts.join('/');
}

class FakeClient {
  constructor(files = {}, folders = []) {
    this.files = new Map(Object.entries(files).map(([path, value]) => [path, { content: value.content, sha: value.sha || `sha-${path}` }]));
    this.folders = new Set(folders);
    this.writes = [];
  }
  async readMetadata(path) {
    const value = this.files.get(path);
    if (!value) {
      const error = new Error('missing');
      error.kind = 'not_found';
      throw error;
    }
    return { type: 'file', path, sha: value.sha, size: new TextEncoder().encode(value.content).byteLength };
  }
  async listDirectory(path) {
    if (!this.folders.has(path)) {
      const error = new Error('missing');
      error.kind = 'not_found';
      throw error;
    }
    return [];
  }
  async saveVerified({ path, content, baseSha, message }) {
    const existing = this.files.get(path);
    if (baseSha && (!existing || existing.sha !== baseSha)) {
      const error = new Error('conflict');
      error.kind = 'conflict';
      throw error;
    }
    if (!baseSha && existing) {
      const error = new Error('conflict');
      error.kind = 'conflict';
      throw error;
    }
    const sha = `new-${this.writes.length + 1}`;
    this.files.set(path, { content, sha });
    this.writes.push({ path, content, baseSha, message });
    return { path, sha, htmlUrl: `https://example.invalid/${path}`, verifiedHash: 'verified' };
  }
}

test('child names are one safe repository segment', () => {
  assert.equal(normalizeChildName(' new file.md '), 'new file.md');
  assert.equal(childRepositoryPath('docs/game', 'rules.md', normalizePath), 'docs/game/rules.md');
  assert.equal(childRepositoryPath('', 'rules.md', normalizePath), 'rules.md');
  for (const value of ['', '.', '..', '../x', 'a/b', 'a\\b', 'x?y', 'x#y']) {
    assert.throws(() => normalizeChildName(value));
  }
});

test('text size is measured as UTF-8 bytes', () => {
  assert.equal(assertTextSize('é', 2), 2);
  assert.throws(() => assertTextSize('é', 1), /editor limit/);
});

test('create refuses to overwrite an existing repository file', async () => {
  const client = new FakeClient({ 'docs/a.md': { content: 'old', sha: 'old-sha' } });
  await assert.rejects(
    () => saveRepositoryTextFile({ client, normalizePath, mode: 'create', parentPath: 'docs', name: 'a.md', content: 'new' }),
    (error) => error && error.kind === 'conflict'
  );
  assert.equal(client.writes.length, 0);
});

test('edit requires the exact currently opened SHA', async () => {
  const client = new FakeClient({ 'docs/a.md': { content: 'remote', sha: 'remote-sha' } });
  await assert.rejects(
    () => saveRepositoryTextFile({ client, normalizePath, mode: 'edit', path: 'docs/a.md', baseSha: 'stale-sha', content: 'local' }),
    (error) => error && error.kind === 'conflict'
  );
  assert.equal(client.writes.length, 0);
});

test('verified create and edit return the canonical file path', async () => {
  const client = new FakeClient({ 'docs/a.md': { content: 'old', sha: 'base' } });
  const created = await saveRepositoryTextFile({ client, normalizePath, mode: 'create', parentPath: 'docs', name: 'b.md', content: 'hello' });
  assert.equal(created.path, 'docs/b.md');
  assert.equal(client.writes[0].baseSha, '');
  const edited = await saveRepositoryTextFile({ client, normalizePath, mode: 'edit', path: 'docs/a.md', baseSha: 'base', content: 'updated' });
  assert.equal(edited.path, 'docs/a.md');
  assert.equal(client.writes[1].baseSha, 'base');
});

test('folder creation writes only a .gitkeep placeholder after absence is proven', async () => {
  const client = new FakeClient();
  const result = await createRepositoryFolder({ client, normalizePath, parentPath: 'docs', name: 'new folder' });
  assert.equal(result.folderPath, 'docs/new folder');
  assert.equal(result.placeholderPath, 'docs/new folder/.gitkeep');
  assert.deepEqual(client.writes.map((item) => [item.path, item.content]), [['docs/new folder/.gitkeep', '']]);
});

test('folder creation refuses an already existing folder', async () => {
  const client = new FakeClient({}, ['docs/existing']);
  await assert.rejects(
    () => createRepositoryFolder({ client, normalizePath, parentPath: 'docs', name: 'existing' }),
    (error) => error && error.kind === 'conflict'
  );
  assert.equal(client.writes.length, 0);
});


test('generated app and UI expose repository authoring and searchable category controls', async () => {
  const here = dirname(fileURLToPath(import.meta.url));
  const app = await readFile(join(here, '..', 'src', 'linked-notes-app.js'), 'utf8');
  const ui = await readFile(join(here, '..', 'src', 'linked-notes-ui.js'), 'utf8');
  assert.match(app, /saveRepositoryEditor\(input = \{\}\)/);
  assert.match(app, /applyFileCategories\(filePath/);
  assert.match(ui, /data-action="new-repository-file"/);
  assert.match(ui, /data-action="new-repository-folder"/);
  assert.match(ui, /categoryPickerHtml\('note'/);
  assert.match(ui, /data-file-category-id/);
});
