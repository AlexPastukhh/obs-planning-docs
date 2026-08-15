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
