import test from 'node:test';
import assert from 'node:assert/strict';
import api from '../src/note-image-assets.js';

test('creates a bounded pending image and portable local Markdown reference', () => {
  const asset = api.createPendingNoteAsset({ id: 'asset-one', noteId: 'note-a', name: 'My diagram.PNG', type: 'image/png', bytes: Uint8Array.from([137, 80, 78, 71, 13, 10, 26, 10]), alt: 'Diagram' });
  assert.equal(asset.fileName, 'My-diagram.png');
  assert.equal(asset.size, 8);
  assert.equal(api.pendingImageMarkdown(asset), '![Diagram](<obs-pending-image:asset-one>)');
  assert.deepEqual(api.pendingAssetIds(`before ${api.pendingImageMarkdown(asset)} after`), ['asset-one']);
});

test('infers only the bounded repository image formats from paths', () => {
  assert.equal(api.mimeTypeForImagePath('a/B.JPEG'), 'image/jpeg');
  assert.equal(api.mimeTypeForImagePath('a/b.webp'), 'image/webp');
  assert.equal(api.mimeTypeForImagePath('a/b.svg'), '');
});

test('rejects unsupported and oversized image input', () => {
  assert.throws(() => api.createPendingNoteAsset({ noteId: 'n', name: 'x.svg', type: 'image/svg+xml', bytes: [1] }), /Only PNG/);
  assert.throws(() => api.createPendingNoteAsset({ noteId: 'n', name: 'x.png', type: 'image/png', bytes: [1, 2] }), /declared image format/);
  assert.throws(() => api.createPendingNoteAsset({ noteId: 'n', name: 'x.png', type: 'image/png', bytes: [137, 80, 78, 71, 13, 10, 26, 10] }, { maxBytes: 7 }), /limit/);
});

test('resolves pending targets and uses document-owned asset folders', () => {
  const body = '![A](<obs-pending-image:a>) and <img src="obs-pending-image:b">';
  const result = api.replacePendingImageTargets(body, new Map([['a', './note.assets/a one.png'], ['b', '../assets/Б.png']]));
  assert.match(result, /note\.assets\/a%20one\.png/);
  assert.match(result, /%D0%91\.png/);
  assert.equal(api.noteAssetPath('notes/my-note.md', 'image.webp'), 'notes/my-note.assets/image.webp');
});
