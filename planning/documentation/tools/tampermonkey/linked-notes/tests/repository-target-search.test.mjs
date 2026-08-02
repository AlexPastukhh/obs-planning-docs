import test from 'node:test';
import assert from 'node:assert/strict';
import api from '../src/repository-target-search.js';

const tree = {
  '': [{ type: 'dir', path: 'docs', name: 'docs' }, { type: 'file', path: 'root.md', name: 'root.md', size: 1 }],
  docs: [{ type: 'dir', path: 'docs/deep', name: 'deep' }, { type: 'file', path: 'docs/architecture.md', name: 'architecture.md', size: 2 }],
  'docs/deep': [{ type: 'dir', path: 'docs/deep/more', name: 'more' }, { type: 'file', path: 'docs/deep/architecture-notes.md', name: 'architecture-notes.md', size: 3 }],
  'docs/deep/more': [{ type: 'file', path: 'docs/deep/more/architecture-final.md', name: 'architecture-final.md', size: 4 }]
};

function listDirectory(path) { return Promise.resolve(tree[path] || []); }

test('file name search respects selected depth', async () => {
  const shallow = await api.searchRepositoryTargets({ query: 'architecture', depth: 1, listDirectory });
  assert.deepEqual(shallow.results.map((item) => item.path), ['docs/architecture.md']);
  const deep = await api.searchRepositoryTargets({ query: 'architecture', depth: 3, listDirectory });
  assert.deepEqual(deep.results.map((item) => item.path), ['docs/architecture.md', 'docs/deep/architecture-notes.md', 'docs/deep/more/architecture-final.md']);
});

test('bounded entire search reports incomplete results instead of pretending completeness', async () => {
  const result = await api.searchRepositoryTargets({ query: 'architecture', depth: 'entire', listDirectory, limits: { maxFolders: 2, maxRequests: 2, maxResults: 100, maxEntriesPerFolder: 100, maxDepth: 20 } });
  assert.equal(result.truncated, true);
  assert.equal(result.truncationReason, 'request_limit');
  assert.equal(result.requestCount, 2);
  assert.ok(result.remainingFolders > 0);
});

test('result limit is explicit and directory listing never reads file content', async () => {
  const calls = [];
  const result = await api.searchRepositoryTargets({ query: '', depth: 3, limits: { maxResults: 2, maxFolders: 20, maxRequests: 20, maxEntriesPerFolder: 100, maxDepth: 8 }, listDirectory: async (path, options) => { calls.push({ path, options }); return tree[path] || []; } });
  assert.equal(result.results.length, 2);
  assert.equal(result.truncationReason, 'result_limit');
  assert.ok(calls.every((call) => call.options.maxEntries === 100));
});
