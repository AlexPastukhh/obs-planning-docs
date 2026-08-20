import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
require('../src/repository-local-change-store.js');
const markers = require('../src/review-dependency-markers.js');
const registryApi = require('../src/review-dependency-registry.js');
require('../src/review-dependency-fingerprint.js');
const service = require('../src/repository-review-dependency-service.js');

function missing(path) { const error = new Error(`Not found: ${path}`); error.kind = 'not_found'; return error; }
function makeClient(initial = {}) {
  const files = new Map(Object.entries(initial).map(([path, value], index) => [path, { path, content: String(value), sha: `sha-${index + 1}` }]));
  const reads = [];
  return {
    files, reads,
    async read(path) { reads.push(path); const file = files.get(path); if (!file) throw missing(path); return { ...file }; },
    async readBytes(path, options = {}) { reads.push(path); const file = files.get(path); if (!file) throw missing(path); const bytes = new TextEncoder().encode(file.content); if (options.maxBytes && bytes.byteLength > options.maxBytes) throw new Error('too large'); return { path, sha: file.sha, bytes, size: bytes.byteLength }; }
  };
}

function registryContent() {
  return registryApi.encodeReviewDependencyRegistry({ dependencies: [
    { id: 'rd_ab01', sourcePath: 'docs/a.md', consumerPath: 'docs/b.md', reason: 'B depends on A.', reviewScope: 'Check examples.' },
    { id: 'rd_ac01', sourcePath: 'docs/a.md', consumerPath: 'docs/c.md', reason: 'C depends on A.' }
  ] });
}

test('one source is read once for multiple consumers and missing against means needs review', async () => {
  const client = makeClient({
    '.linked-notes/review-dependencies.json': registryContent(),
    'docs/a.md': 'Source meaning',
    'docs/b.md': markers.formatReviewDependencyMarker('rd_ab01'),
    'docs/c.md': markers.formatReviewDependencyMarker('rd_ac01')
  });
  const result = await service.diagnoseReviewDependencies({ client });
  assert.equal(result.needsReviewCount, 2);
  assert.equal(client.reads.filter((path) => path === 'docs/a.md').length, 1);
  assert.equal(result.relations[0].reviewScope, 'Check examples.');
});

test('matching against is current and source change makes it need review', async () => {
  const client = makeClient({
    '.linked-notes/review-dependencies.json': registryApi.encodeReviewDependencyRegistry({ dependencies: [{ id: 'rd_ab01', sourcePath: 'a.md', consumerPath: 'b.md', reason: 'Depends.' }] }),
    'a.md': 'A v1',
    'b.md': markers.formatReviewDependencyMarker('rd_ab01')
  });
  let result = await service.diagnoseReviewDependencies({ client });
  const fingerprint = result.relations[0].currentFingerprint;
  client.files.get('b.md').content = markers.setReviewDependencyAgainst(client.files.get('b.md').content, 'rd_ab01', fingerprint);
  result = await service.diagnoseReviewDependencies({ client });
  assert.equal(result.relations[0].status, 'current');
  client.files.get('a.md').content = 'A v2';
  result = await service.diagnoseReviewDependencies({ client });
  assert.equal(result.relations[0].status, 'needs-review');
});

test('pending source overlay participates before publication', async () => {
  const client = makeClient({
    '.linked-notes/review-dependencies.json': registryApi.encodeReviewDependencyRegistry({ dependencies: [{ id: 'rd_ab01', sourcePath: 'a.md', consumerPath: 'b.md', reason: 'Depends.' }] }),
    'a.md': 'remote source',
    'b.md': markers.formatReviewDependencyMarker('rd_ab01')
  });
  const remote = await service.diagnoseReviewDependencies({ client });
  const overlays = [{ path: 'a.md', baseSha: 'sha-a', content: 'pending source' }];
  const pending = await service.diagnoseReviewDependencies({ client, overlays });
  assert.notEqual(remote.relations[0].currentFingerprint, pending.relations[0].currentFingerprint);
  assert.equal(pending.relations[0].sourceLocal, true);
});

test('missing consumer marker is unresolved', async () => {
  const client = makeClient({
    '.linked-notes/review-dependencies.json': registryApi.encodeReviewDependencyRegistry({ dependencies: [{ id: 'rd_ab01', sourcePath: 'a.md', consumerPath: 'b.md', reason: 'Depends.' }] }),
    'a.md': 'source', 'b.md': 'consumer without marker'
  });
  const result = await service.diagnoseReviewDependencies({ client });
  assert.equal(result.relations[0].status, 'unresolved');
});
