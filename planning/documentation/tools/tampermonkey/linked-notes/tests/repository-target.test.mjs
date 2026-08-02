import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const targetApi = require('../src/repository-target.js');
const here = dirname(fileURLToPath(import.meta.url));
const fixtureRoot = join(here, 'fixtures/repository');

async function fixtureMap() {
  const paths = ['root.md', 'docs/current.md', 'docs/sibling.md', 'docs/nested/deep.md', 'notes/note-a.md'];
  const entries = await Promise.all(paths.map(async (path) => [path, await readFile(join(fixtureRoot, path), 'utf8')]));
  return Object.fromEntries(entries);
}

test('uses ordinary Markdown-relative semantics for bare, dot, parent and nested paths', () => {
  assert.equal(targetApi.normalizeRepositoryPath('docs/current.md', 'sibling.md'), 'docs/sibling.md');
  assert.equal(targetApi.normalizeRepositoryPath('docs/current.md', './sibling.md'), 'docs/sibling.md');
  assert.equal(targetApi.normalizeRepositoryPath('docs/current.md', '../root.md'), 'root.md');
  assert.equal(targetApi.normalizeRepositoryPath('docs/current.md', 'nested/deep.md'), 'docs/nested/deep.md');
  assert.equal(targetApi.normalizeRepositoryPath('docs/current.md', '../notes/note-a.md'), 'notes/note-a.md');
});

test('anchor-only target resolves to the current source file', () => {
  assert.deepEqual(
    targetApi.normalizeRepositoryTarget('docs/current.md', '#stable-current'),
    { type: 'repository', path: 'docs/current.md', anchor: 'stable-current' }
  );
});

test('canonical object target is not resolved relative a second time', () => {
  assert.deepEqual(
    targetApi.normalizeRepositoryTarget('docs/current.md', { path: 'docs/sibling.md', anchor: 'stable-sibling' }),
    { type: 'repository', path: 'docs/sibling.md', anchor: 'stable-sibling' }
  );
});

test('rejects machine-local, escaping, query and malformed paths', () => {
  assert.throws(() => targetApi.normalizeRepositoryPath('docs/current.md', 'C:\\tmp\\x.md'), /Machine-local/);
  assert.throws(() => targetApi.normalizeRepositoryPath('docs/current.md', '../../outside.md'), /escapes/);
  assert.throws(() => targetApi.normalizeRepositoryPath('docs/current.md', '/absolute.md'), /Machine-local/);
  assert.throws(() => targetApi.normalizeRepositoryPath('docs/current.md', 'nested//deep.md'), /empty/);
  assert.throws(() => targetApi.normalizeRepositoryPath('docs/current.md', 'sibling.md?raw=1'), /query/);
});

test('resolves files and explicit anchors without fuzzy rebinding', async () => {
  const files = await fixtureMap();
  const resolved = targetApi.resolveRepositoryTarget({
    sourcePath: 'docs/current.md', target: 'sibling.md#stable-sibling', files
  });
  assert.equal(resolved.status, 'resolved');
  const sameFile = targetApi.resolveRepositoryTarget({
    sourcePath: 'docs/current.md', target: '#stable-current', files
  });
  assert.equal(sameFile.status, 'resolved');
  const missingAnchor = targetApi.resolveRepositoryTarget({
    sourcePath: 'docs/current.md', target: 'sibling.md#renamed-anchor', files
  });
  assert.equal(missingAnchor.status, 'unresolved');
  assert.match(missingAnchor.message, /Missing explicit anchor/);
});

test('portable URL stays outside repository path normalization', () => {
  const result = targetApi.resolveRepositoryTarget({ sourcePath: 'docs/current.md', target: 'https://example.com/a#b' });
  assert.equal(result.status, 'resolved');
  assert.equal(result.target.type, 'url');
});

test('builds portable repository-relative links from category definitions to files', () => {
  assert.equal(targetApi.repositoryRelativePath('categories/asp-net-core.md', 'docs/api.md'), '../docs/api.md');
  assert.equal(targetApi.repositoryRelativePath('docs/categories/a.md', 'docs/categories/b.md'), './b.md');
  assert.equal(targetApi.repositoryRelativePath('a.md', 'nested/b.md'), './nested/b.md');
  assert.throws(() => targetApi.repositoryRelativePath('../a.md', 'b.md'), /repository-relative|\.\./);
});

test('decodes percent-encoded Markdown repository targets segment by segment', () => {
  assert.equal(targetApi.decodeRepositoryMarkdownPath('../docs/My%20File%20%28draft%29%20%5Bv2%5D.md'), '../docs/My File (draft) [v2].md');
  assert.equal(targetApi.decodeRepositoryMarkdownPath('../данные/%D1%82%D0%B5%D1%81%D1%82.md'), '../данные/тест.md');
  assert.equal(targetApi.decodeRepositoryMarkdownPath('../docs/100%25-ready.md'), '../docs/100%-ready.md');
  assert.deepEqual(
    targetApi.normalizeMarkdownRepositoryTarget('notes/topic/note.md', '../../docs/My%20File.md#stable'),
    { type: 'repository', path: 'docs/My File.md', anchor: 'stable' }
  );
});

test('rejects malformed percent encoding and encoded traversal or separators', () => {
  assert.throws(() => targetApi.decodeRepositoryMarkdownPath('../docs/bad%2.md'), /invalid percent encoding/);
  assert.throws(() => targetApi.decodeRepositoryMarkdownPath('../docs/%2E%2E/secret.md'), /encoded traversal/);
  assert.throws(() => targetApi.decodeRepositoryMarkdownPath('../docs/a%2Fb.md'), /invalid decoded path segment/);
  assert.throws(() => targetApi.decodeRepositoryMarkdownPath('../docs/a%5Cb.md'), /invalid decoded path segment/);
  assert.throws(() => targetApi.decodeRepositoryMarkdownPath('../docs/a%3Fb.md'), /invalid decoded path segment/);
  assert.throws(() => targetApi.decodeRepositoryMarkdownPath('../docs/a%23b.md'), /invalid decoded path segment/);
});
