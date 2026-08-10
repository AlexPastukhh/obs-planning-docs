(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const DEFAULT_TEXT_FILE_MAX_BYTES = 512 * 1024;
  const DEFAULT_FOLDER_PLACEHOLDER = '.gitkeep';

  function normalizeChildName(value, label = 'Repository name') {
    const name = String(value == null ? '' : value).trim();
    if (!name) throw new TypeError(`${label} is required.`);
    if (name === '.' || name === '..' || /[\/\\]/.test(name)) throw new TypeError(`${label} must be one path segment.`);
    if (/[?#\u0000-\u001f\u007f]/.test(name)) throw new TypeError(`${label} contains unsupported syntax.`);
    return name;
  }

  function childRepositoryPath(parentPath, name, normalizePath) {
    const child = normalizeChildName(name);
    const rawParent = String(parentPath == null ? '' : parentPath).replace(/\\/g, '/').trim().replace(/^\/+|\/+$/g, '');
    const parent = rawParent
      ? (typeof normalizePath === 'function' ? normalizePath(rawParent) : rawParent)
      : '';
    const combined = parent ? `${parent}/${child}` : child;
    return typeof normalizePath === 'function' ? normalizePath(combined) : combined;
  }

  function utf8ByteLength(value) {
    return new TextEncoder().encode(String(value == null ? '' : value)).byteLength;
  }

  function assertTextSize(content, maxBytes = DEFAULT_TEXT_FILE_MAX_BYTES) {
    const limit = Number(maxBytes) > 0 ? Number(maxBytes) : DEFAULT_TEXT_FILE_MAX_BYTES;
    const bytes = utf8ByteLength(content);
    if (bytes > limit) {
      const error = new Error(`Repository text is ${bytes} bytes; editor limit is ${limit}.`);
      error.kind = 'limit_exceeded';
      error.details = { bytes, maxBytes: limit };
      throw error;
    }
    return bytes;
  }

  async function readMetadataOrNull(client, path) {
    try {
      return await client.readMetadata(path);
    } catch (error) {
      if (error && error.kind === 'not_found') return null;
      throw error;
    }
  }

  async function assertCreateTargetAbsent(client, path) {
    const existing = await readMetadataOrNull(client, path);
    if (!existing) return;
    const error = new Error(`Repository target already exists and was not overwritten: ${path}.`);
    error.kind = 'conflict';
    error.details = { path, sha: existing.sha || '' };
    throw error;
  }

  async function saveRepositoryTextFile(options = {}) {
    const client = options.client;
    if (!client || typeof client.saveVerified !== 'function' || typeof client.readMetadata !== 'function') {
      throw new TypeError('A GitHub client with verified text write support is required.');
    }
    const normalizePath = options.normalizePath;
    if (typeof normalizePath !== 'function') throw new TypeError('A repository path normalizer is required.');
    const mode = options.mode === 'edit' ? 'edit' : 'create';
    const content = String(options.content == null ? '' : options.content);
    const size = assertTextSize(content, options.maxBytes);

    let path;
    let baseSha = '';
    if (mode === 'edit') {
      path = normalizePath(options.path);
      baseSha = String(options.baseSha || '').trim();
      if (!baseSha) throw new Error('Editing an existing repository file requires its base SHA.');
      const current = await client.readMetadata(path);
      if (!current || current.type !== 'file') throw new Error(`Repository text target is not a file: ${path}.`);
      if (String(current.sha || '') !== baseSha) {
        const error = new Error(`Repository file changed after it was opened: ${path}. Refresh before saving.`);
        error.kind = 'conflict';
        error.details = { path, expectedSha: baseSha, actualSha: String(current.sha || '') };
        throw error;
      }
    } else {
      path = childRepositoryPath(options.parentPath, options.name, normalizePath);
      await assertCreateTargetAbsent(client, path);
    }

    const result = await client.saveVerified({
      path,
      content,
      baseSha,
      message: options.message || `${mode === 'edit' ? 'Update' : 'Create'} repository file ${path}`
    });
    return { ...result, path, content, size, mode };
  }

  async function createRepositoryFolder(options = {}) {
    const client = options.client;
    if (!client || typeof client.listDirectory !== 'function' || typeof client.saveVerified !== 'function') {
      throw new TypeError('A GitHub client with directory reads and verified text writes is required.');
    }
    const normalizePath = options.normalizePath;
    if (typeof normalizePath !== 'function') throw new TypeError('A repository path normalizer is required.');
    const folderPath = childRepositoryPath(options.parentPath, options.name, normalizePath);

    try {
      await client.listDirectory(folderPath, { maxEntries: 200 });
      const error = new Error(`Repository folder already exists: ${folderPath}.`);
      error.kind = 'conflict';
      throw error;
    } catch (error) {
      if (!(error && error.kind === 'not_found')) throw error;
    }

    const placeholderName = normalizeChildName(options.placeholderName || DEFAULT_FOLDER_PLACEHOLDER, 'Folder placeholder name');
    const placeholderPath = childRepositoryPath(folderPath, placeholderName, normalizePath);
    await assertCreateTargetAbsent(client, placeholderPath);
    const result = await client.saveVerified({
      path: placeholderPath,
      content: '',
      baseSha: '',
      message: options.message || `Create repository folder ${folderPath}`
    });
    return { ...result, folderPath, placeholderPath };
  }

  return {
    DEFAULT_TEXT_FILE_MAX_BYTES,
    DEFAULT_FOLDER_PLACEHOLDER,
    normalizeChildName,
    childRepositoryPath,
    utf8ByteLength,
    assertTextSize,
    saveRepositoryTextFile,
    createRepositoryFolder
  };
});
