(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const DEFAULT_REFERENCE_LOCAL_MAX_BYTES = 2 * 1024 * 1024;

  function normalizeWorkspacePart(value, label) {
    const text = String(value == null ? '' : value).trim();
    if (!text) throw new TypeError(`${label} is required.`);
    return text;
  }

  function referenceObjectLocalStoreKey(workspace) {
    if (!workspace) throw new TypeError('Workspace is required.');
    const id = normalizeWorkspacePart(workspace.id || 'workspace', 'Workspace id');
    const owner = normalizeWorkspacePart(workspace.owner, 'Workspace owner').toLowerCase();
    const repo = normalizeWorkspacePart(workspace.repo, 'Workspace repository').replace(/\.git$/i, '').toLowerCase();
    const branch = normalizeWorkspacePart(workspace.branch || 'main', 'Workspace branch');
    return `obsLinkedNotesPrototype:v3:referenceObjects:${encodeURIComponent(id)}:${encodeURIComponent(owner)}:${encodeURIComponent(repo)}:${encodeURIComponent(branch)}`;
  }

  function normalizePath(value) {
    const raw = String(value == null ? '' : value).replace(/\\/g, '/').trim().replace(/\/+$/g, '');
    if (!raw || raw.startsWith('/') || /^[A-Za-z]:\//.test(raw) || raw.includes('://') || /[?#\u0000-\u001f\u007f]/.test(raw)) throw new TypeError('Local Reference Object draft path must be repository-relative.');
    const parts = raw.split('/');
    if (parts.some((part) => !part || part === '.' || part === '..')) throw new TypeError('Local Reference Object draft path contains an invalid segment.');
    return parts.join('/');
  }

  function normalizeReferenceObjectLocalState(value, options = {}) {
    const maxBytes = Number(options.maxBytes) > 0 ? Number(options.maxBytes) : DEFAULT_REFERENCE_LOCAL_MAX_BYTES;
    const source = value && typeof value === 'object' ? value : {};
    const files = [];
    const seen = new Set();
    let totalBytes = 0;
    for (const raw of Array.isArray(source.files) ? source.files : []) {
      const path = normalizePath(raw && raw.path);
      if (seen.has(path)) continue;
      seen.add(path);
      const content = String(raw && raw.content == null ? '' : raw.content);
      totalBytes += new TextEncoder().encode(content).byteLength;
      if (totalBytes > maxBytes) throw new Error(`Local Reference Object drafts exceed the ${maxBytes}-byte prototype limit.`);
      files.push({ path, baseSha: String(raw && raw.baseSha || ''), content, updatedAt: String(raw && raw.updatedAt || '') });
    }
    files.sort((left, right) => left.path.localeCompare(right.path));
    return { schemaVersion: 1, files };
  }

  function referenceObjectLocalDraftMap(state) {
    const normalized = normalizeReferenceObjectLocalState(state);
    return new Map(normalized.files.map((file) => [file.path, { ...file }]));
  }

  function upsertReferenceObjectLocalDraft(state, draft, options = {}) {
    const current = normalizeReferenceObjectLocalState(state, options);
    const path = normalizePath(draft && draft.path);
    const files = current.files.filter((file) => file.path !== path);
    files.push({ path, baseSha: String(draft && draft.baseSha || ''), content: String(draft && draft.content == null ? '' : draft.content), updatedAt: String(draft && draft.updatedAt || new Date().toISOString()) });
    return normalizeReferenceObjectLocalState({ schemaVersion: 1, files }, options);
  }

  function removeReferenceObjectLocalDraft(state, path, options = {}) {
    const canonical = normalizePath(path);
    const current = normalizeReferenceObjectLocalState(state, options);
    return normalizeReferenceObjectLocalState({ schemaVersion: 1, files: current.files.filter((file) => file.path !== canonical) }, options);
  }

  return {
    DEFAULT_REFERENCE_LOCAL_MAX_BYTES,
    referenceObjectLocalStoreKey,
    normalizeReferenceObjectLocalState,
    referenceObjectLocalDraftMap,
    upsertReferenceObjectLocalDraft,
    removeReferenceObjectLocalDraft
  };
});
