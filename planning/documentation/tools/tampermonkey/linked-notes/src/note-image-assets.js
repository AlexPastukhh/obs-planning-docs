(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const PENDING_IMAGE_SCHEME = 'obs-pending-image:';
  const DEFAULT_MAX_IMAGE_BYTES = 10 * 1024 * 1024;
  const MIME_EXTENSIONS = Object.freeze({
    'image/png': '.png',
    'image/jpeg': '.jpg',
    'image/webp': '.webp',
    'image/gif': '.gif'
  });

  function createAssetId() {
    const cryptoObject = typeof globalThis !== 'undefined' ? globalThis.crypto : null;
    const value = cryptoObject && typeof cryptoObject.randomUUID === 'function'
      ? cryptoObject.randomUUID()
      : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
    return `asset-${value}`;
  }

  function toUint8Array(value) {
    if (value instanceof Uint8Array) return new Uint8Array(value);
    if (value instanceof ArrayBuffer) return new Uint8Array(value.slice(0));
    if (ArrayBuffer.isView(value)) return new Uint8Array(value.buffer.slice(value.byteOffset, value.byteOffset + value.byteLength));
    if (Array.isArray(value)) return Uint8Array.from(value);
    throw new TypeError('Image bytes must be an ArrayBuffer or Uint8Array.');
  }

  function sanitizeFileStem(value) {
    const raw = String(value || 'image')
      .normalize('NFKC')
      .replace(/[\\/?#\u0000-\u001f\u007f]+/g, '-')
      .replace(/\s+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 80);
    return raw || 'image';
  }

  function mimeTypeForImagePath(path) {
    const value = String(path || '').toLowerCase().split(/[?#]/, 1)[0];
    if (value.endsWith('.png')) return 'image/png';
    if (value.endsWith('.jpg') || value.endsWith('.jpeg')) return 'image/jpeg';
    if (value.endsWith('.webp')) return 'image/webp';
    if (value.endsWith('.gif')) return 'image/gif';
    return '';
  }

  function fileNameForImage(name, mimeType) {
    const type = String(mimeType || '').toLowerCase();
    const extension = MIME_EXTENSIONS[type];
    if (!extension) throw new Error(`Unsupported image type: ${type || '<empty>'}.`);
    const source = String(name || '').replace(/\\/g, '/');
    const leaf = source.slice(source.lastIndexOf('/') + 1);
    const dot = leaf.lastIndexOf('.');
    const stem = sanitizeFileStem(dot > 0 ? leaf.slice(0, dot) : leaf);
    return `${stem}${extension}`;
  }

  function matchesImageSignature(bytes, mimeType) {
    const value = bytes instanceof Uint8Array ? bytes : toUint8Array(bytes);
    const type = String(mimeType || '').toLowerCase();
    if (type === 'image/png') return value.length >= 8 && [137, 80, 78, 71, 13, 10, 26, 10].every((byte, index) => value[index] === byte);
    if (type === 'image/jpeg') return value.length >= 3 && value[0] === 0xff && value[1] === 0xd8 && value[2] === 0xff;
    if (type === 'image/gif') {
      if (value.length < 6) return false;
      const header = String.fromCharCode(...value.subarray(0, 6));
      return header === 'GIF87a' || header === 'GIF89a';
    }
    if (type === 'image/webp') {
      if (value.length < 12) return false;
      return String.fromCharCode(...value.subarray(0, 4)) === 'RIFF' && String.fromCharCode(...value.subarray(8, 12)) === 'WEBP';
    }
    return false;
  }

  function validateImageInput(input, options = {}) {
    const type = String(input && input.type || '').toLowerCase();
    if (!MIME_EXTENSIONS[type]) throw new Error('Only PNG, JPEG, WebP and GIF images are supported.');
    const bytes = toUint8Array(input && input.bytes);
    const maxBytes = Number(options.maxBytes) > 0 ? Number(options.maxBytes) : DEFAULT_MAX_IMAGE_BYTES;
    if (!bytes.byteLength) throw new Error('The selected image is empty.');
    if (!matchesImageSignature(bytes, type)) throw new Error('The selected bytes do not match the declared image format.');
    if (bytes.byteLength > maxBytes) throw new Error(`The selected image is ${bytes.byteLength} bytes; the limit is ${maxBytes}.`);
    return { type, bytes, maxBytes };
  }

  function createPendingNoteAsset(input = {}, options = {}) {
    const validated = validateImageInput(input, options);
    const id = String(input.id || '').trim() || createAssetId();
    const noteId = String(input.noteId || '').trim();
    if (!noteId) throw new Error('Pending image requires a Note id.');
    return {
      id,
      noteId,
      fileName: fileNameForImage(input.name, validated.type),
      originalName: String(input.name || ''),
      mimeType: validated.type,
      size: validated.bytes.byteLength,
      bytes: validated.bytes,
      alt: String(input.alt || '').replace(/[\r\n]+/g, ' ').trim(),
      title: String(input.title || '').replace(/[\r\n]+/g, ' ').trim(),
      createdAt: String(input.createdAt || new Date().toISOString()),
      updatedAt: String(input.updatedAt || new Date().toISOString()),
      state: String(input.state || 'pending'),
      stateMessage: String(input.stateMessage || ''),
      plannedPath: String(input.plannedPath || ''),
      verifiedPath: String(input.verifiedPath || ''),
      verifiedSha: String(input.verifiedSha || ''),
      verifiedHash: String(input.verifiedHash || '')
    };
  }

  function pendingImageTarget(assetId) {
    const id = String(assetId || '').trim();
    if (!id || /[\s<>()]/.test(id)) throw new Error('Pending image id is invalid.');
    return `${PENDING_IMAGE_SCHEME}${id}`;
  }

  function pendingImageMarkdown(asset) {
    const alt = String(asset && asset.alt || '').replace(/([\\\]])/g, '\\$1');
    const title = String(asset && asset.title || '').replace(/(["\\])/g, '\\$1');
    return `![${alt}](<${pendingImageTarget(asset && asset.id)}>${title ? ` "${title}"` : ''})`;
  }

  function pendingAssetIds(markdown) {
    const text = String(markdown || '');
    const pattern = /obs-pending-image:([A-Za-z0-9._~-]+)/g;
    const result = [];
    const seen = new Set();
    let match;
    while ((match = pattern.exec(text))) {
      if (!seen.has(match[1])) { seen.add(match[1]); result.push(match[1]); }
    }
    return result;
  }

  function encodeMarkdownPath(path) {
    return String(path || '').split('/').map((segment) => {
      if (segment === '.' || segment === '..') return segment;
      return encodeURIComponent(segment).replace(/%2F/gi, '/');
    }).join('/');
  }

  function replacePendingImageTargets(markdown, replacements) {
    const map = replacements instanceof Map ? replacements : new Map(Object.entries(replacements || {}));
    return String(markdown || '').replace(/obs-pending-image:([A-Za-z0-9._~-]+)/g, (whole, id) => {
      const target = map.get(id);
      return target ? encodeMarkdownPath(target) : whole;
    });
  }

  function noteAssetFolder(notePath) {
    const path = String(notePath || '').replace(/\\/g, '/').trim();
    if (!path || !/\.md$/i.test(path)) throw new Error('A Markdown Note path is required for image assets.');
    return `${path.replace(/\.md$/i, '')}.assets`;
  }

  function noteAssetPath(notePath, fileName) {
    const leaf = String(fileName || '').replace(/\\/g, '/').split('/').pop();
    if (!leaf || /[/?#\\\u0000-\u001f\u007f]/.test(leaf) || leaf === '.' || leaf === '..') throw new Error('Image filename is invalid.');
    return `${noteAssetFolder(notePath)}/${leaf}`;
  }

  return {
    PENDING_IMAGE_SCHEME,
    DEFAULT_MAX_IMAGE_BYTES,
    MIME_EXTENSIONS,
    createAssetId,
    toUint8Array,
    sanitizeFileStem,
    mimeTypeForImagePath,
    fileNameForImage,
    matchesImageSignature,
    validateImageInput,
    createPendingNoteAsset,
    pendingImageTarget,
    pendingImageMarkdown,
    pendingAssetIds,
    encodeMarkdownPath,
    replacePendingImageTargets,
    noteAssetFolder,
    noteAssetPath
  };
});
