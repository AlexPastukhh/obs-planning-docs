(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const DEFAULT_REPOSITORY_LOCAL_MAX_BYTES = 16 * 1024 * 1024;

  function requiredPart(value, label) {
    const text = String(value == null ? '' : value).trim();
    if (!text) throw new TypeError(`${label} is required.`);
    return text;
  }

  function repositoryLocalChangeStoreKey(workspace) {
    if (!workspace) throw new TypeError('Workspace is required.');
    const id = requiredPart(workspace.id || 'workspace', 'Workspace id');
    const owner = requiredPart(workspace.owner, 'Workspace owner').toLowerCase();
    const repo = requiredPart(workspace.repo, 'Workspace repository').replace(/\.git$/i, '').toLowerCase();
    const branch = requiredPart(workspace.branch || 'main', 'Workspace branch');
    // Keep the v3 key so existing Reference Object drafts migrate without a copy step.
    return `obsLinkedNotesPrototype:v3:referenceObjects:${encodeURIComponent(id)}:${encodeURIComponent(owner)}:${encodeURIComponent(repo)}:${encodeURIComponent(branch)}`;
  }

  function normalizeRepositoryLocalPath(value) {
    const raw = String(value == null ? '' : value).replace(/\\/g, '/').trim().replace(/\/+$/g, '');
    if (!raw || raw.startsWith('/') || /^[A-Za-z]:\//.test(raw) || raw.includes('://') || /[?#\u0000-\u001f\u007f]/.test(raw)) throw new TypeError('Local repository change path must be repository-relative.');
    const parts = raw.split('/');
    if (parts.some((part) => !part || part === '.' || part === '..')) throw new TypeError('Local repository change path contains an invalid segment.');
    return parts.join('/');
  }

  function normalizeBase64(value) {
    const compact = String(value == null ? '' : value).replace(/\s+/g, '');
    if (compact && (!/^[A-Za-z0-9+/]*={0,2}$/.test(compact) || compact.length % 4 !== 0)) throw new TypeError('Binary local repository change must contain canonical base64 bytes.');
    return compact;
  }

  function base64ByteLength(value) {
    if (!value) return 0;
    const padding = value.endsWith('==') ? 2 : value.endsWith('=') ? 1 : 0;
    return (value.length / 4) * 3 - padding;
  }

  function normalizeRepositoryLocalChangeState(value, options = {}) {
    const maxBytes = Number(options.maxBytes) > 0 ? Number(options.maxBytes) : DEFAULT_REPOSITORY_LOCAL_MAX_BYTES;
    const source = value && typeof value === 'object' ? value : {};
    const files = [];
    const seen = new Set();
    let totalBytes = 0;
    for (const raw of Array.isArray(source.files) ? source.files : []) {
      const path = normalizeRepositoryLocalPath(raw && raw.path);
      if (seen.has(path)) continue;
      seen.add(path);
      const payloadKind = raw && raw.payloadKind === 'binary' ? 'binary' : 'text';
      const content = payloadKind === 'text' ? String(raw && raw.content == null ? '' : raw.content) : '';
      const bytesBase64 = payloadKind === 'binary' ? normalizeBase64(raw && raw.bytesBase64) : '';
      totalBytes += payloadKind === 'binary' ? base64ByteLength(bytesBase64) : new TextEncoder().encode(content).byteLength;
      if (totalBytes > maxBytes) throw new Error(`Local repository changes exceed the ${maxBytes}-byte aggregate limit.`);
      files.push({
        path,
        baseSha: String(raw && raw.baseSha || ''),
        payloadKind,
        content,
        bytesBase64,
        source: String(raw && raw.source || 'reference-object'),
        operation: String(raw && raw.operation || ((raw && raw.baseSha) ? 'update' : 'create')),
        dependencies: [...new Set((Array.isArray(raw && raw.dependencies) ? raw.dependencies : []).map(normalizeRepositoryLocalPath))].sort(),
        message: String(raw && raw.message || ''),
        updatedAt: String(raw && raw.updatedAt || '')
      });
    }
    files.sort((left, right) => left.path.localeCompare(right.path));
    return { schemaVersion: 2, files };
  }

  function repositoryLocalChangeMap(state, options = {}) {
    const normalized = normalizeRepositoryLocalChangeState(state, options);
    return new Map(normalized.files.map((file) => [file.path, { ...file, dependencies: [...file.dependencies] }]));
  }

  function upsertRepositoryLocalChange(state, change, options = {}) {
    const current = normalizeRepositoryLocalChangeState(state, options);
    const path = normalizeRepositoryLocalPath(change && change.path);
    const previous = current.files.find((file) => file.path === path);
    const files = current.files.filter((file) => file.path !== path);
    files.push({
      ...(previous || {}),
      ...(change || {}),
      path,
      baseSha: previous ? previous.baseSha : String(change && change.baseSha || ''),
      updatedAt: String(change && change.updatedAt || new Date().toISOString())
    });
    return normalizeRepositoryLocalChangeState({ schemaVersion: 2, files }, options);
  }

  function removeRepositoryLocalChange(state, path, options = {}) {
    const canonical = normalizeRepositoryLocalPath(path);
    const current = normalizeRepositoryLocalChangeState(state, options);
    return normalizeRepositoryLocalChangeState({ schemaVersion: 2, files: current.files.filter((file) => file.path !== canonical) }, options);
  }

  function repositoryTextOverlays(state, options = {}) {
    return normalizeRepositoryLocalChangeState(state, options).files
      .filter((file) => file.payloadKind === 'text')
      .map((file) => ({ path: file.path, baseSha: file.baseSha, content: file.content, source: file.source, updatedAt: file.updatedAt }));
  }

  return {
    DEFAULT_REPOSITORY_LOCAL_MAX_BYTES,
    repositoryLocalChangeStoreKey,
    normalizeRepositoryLocalPath,
    normalizeRepositoryLocalChangeState,
    repositoryLocalChangeMap,
    upsertRepositoryLocalChange,
    removeRepositoryLocalChange,
    repositoryTextOverlays
  };
});
