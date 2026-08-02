import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const api = require('../src/repository-file-browser.js');

test('repository browser normalizes root, parents and breadcrumbs', () => {
  assert.equal(api.normalizeBrowserPath(''), '');
  assert.equal(api.normalizeBrowserPath('docs/nested'), 'docs/nested');
  assert.equal(api.parentRepositoryPath('docs/nested'), 'docs');
  assert.deepEqual(api.repositoryBreadcrumbs('docs/nested'), [
    { label: '/', path: '' }, { label: 'docs', path: 'docs' }, { label: 'nested', path: 'docs/nested' }
  ]);
  assert.throws(() => api.normalizeBrowserPath('../escape'), /\.\./);
});

test('GitHub HTML URLs distinguish blobs and trees', () => {
  const context = { owner: 'Org', repo: 'Docs', branch: 'feature/x' };
  assert.equal(api.buildGitHubHtmlUrl(context, 'docs/a b.md', 'file'), 'https://github.com/Org/Docs/blob/feature%2Fx/docs/a%20b.md');
  assert.equal(api.buildGitHubHtmlUrl(context, 'docs', 'dir'), 'https://github.com/Org/Docs/tree/feature%2Fx/docs');
});

test('file preview is text, too-large, missing-inline or unsupported explicitly', () => {
  assert.equal(api.classifyFilePreview({ path: 'README.md', size: 5, content: 'hello' }).kind, 'text');
  assert.equal(api.classifyFilePreview({ path: 'large.md', size: 100, content: null }, { maxBytes: 10 }).kind, 'too_large');
  assert.equal(api.classifyFilePreview({ path: 'unknown.md', size: 5, content: null }).kind, 'unsupported');
  assert.equal(api.classifyFilePreview({ path: 'image.bin', size: 4, content: '\u0000abc' }).kind, 'unsupported');
  assert.equal(api.isPreviewTooLarge({ size: 11 }, { maxBytes: 10 }), true);
});

test('repository entries sort folders before files', () => {
  const result = api.sortRepositoryEntries([
    { type: 'file', name: 'b.md' }, { type: 'dir', name: 'z' }, { type: 'dir', name: 'a' }, { type: 'file', name: 'a.md' }
  ]);
  assert.deepEqual(result.map((item) => `${item.type}:${item.name}`), ['dir:a', 'dir:z', 'file:a.md', 'file:b.md']);
});
