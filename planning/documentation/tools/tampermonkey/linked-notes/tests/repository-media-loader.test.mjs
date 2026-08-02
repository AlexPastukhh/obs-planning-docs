import test from 'node:test';
import assert from 'node:assert/strict';
import api from '../src/repository-media-loader.js';

test('repository images resolve relative to the current Note or file and use object URLs', async () => {
  const readCalls = [];
  const revoked = [];
  const loader = new api.RepositoryMediaLoader({
    readBytes: async (path, options) => { readCalls.push({ path, options }); return { bytes: Uint8Array.from([1, 2, 3]), htmlUrl: 'https://github.test/file' }; },
    createObjectUrl: (blob) => `blob:test-${blob.size}`,
    revokeObjectUrl: (url) => revoked.push(url)
  });
  const result = await loader.load({ id: 'i1', type: 'image', target: '../images/a.png' }, { sourcePath: 'notes/topic/note.md' });
  assert.equal(readCalls[0].path, 'notes/images/a.png');
  assert.equal(result.objectUrl, 'blob:test-3');
  assert.equal(result.mime, 'image/png');
  loader.dispose();
  assert.deepEqual(revoked, ['blob:test-3']);
});

test('root-relative repository image paths and external blocking are explicit', async () => {
  assert.equal(api.resolveRepositoryMediaPath('notes/a.md', '/assets/x.webp'), 'assets/x.webp');
  const loader = new api.RepositoryMediaLoader({ readBytes: async () => { throw new Error('should not read'); }, createObjectUrl: () => 'blob:x', revokeObjectUrl: () => {} });
  const result = await loader.load({ id: 'e', type: 'image', target: 'https://example.com/x.png', external: true }, { sourcePath: 'notes/a.md' });
  assert.equal(result.status, 'external_blocked');
});

test('path traversal and unsupported formats are rejected', async () => {
  assert.throws(() => api.resolveRepositoryMediaPath('a.md', '../../x.png'), /escapes/);
  const loader = new api.RepositoryMediaLoader({ readBytes: async () => ({ bytes: Uint8Array.from([1]) }), createObjectUrl: () => 'blob:x', revokeObjectUrl: () => {} });
  await assert.rejects(() => loader.load({ id: 'x', type: 'image', target: 'file.exe' }, { sourcePath: 'docs/a.md' }), /Unsupported/);
});

test('repository media paths decode Markdown percent encoding before authenticated reads', async () => {
  const reads = [];
  const loader = new api.RepositoryMediaLoader({
    readBytes: async (path) => { reads.push(path); return { bytes: Uint8Array.from([1]), contentType: 'image/png' }; },
    createObjectUrl: () => 'blob:encoded',
    revokeObjectUrl: () => {}
  });
  const result = await loader.load({ id: 'encoded', type: 'image', target: '../images/My%20Image%20%28v2%29%20%5Bfinal%5D.png' }, { sourcePath: 'notes/topic/note.md' });
  assert.equal(reads[0], 'notes/images/My Image (v2) [final].png');
  assert.equal(result.path, reads[0]);
  assert.throws(() => api.resolveRepositoryMediaPath('notes/a.md', '../%2E%2E/secret.png'), /encoded traversal/);
  assert.throws(() => api.resolveRepositoryMediaPath('notes/a.md', '../images/bad%2.png'), /invalid percent encoding/);
});
