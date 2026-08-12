(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const DEFAULT_REFERENCE_OBJECT_REGISTRY_PATH = '.linked-notes/reference-objects.json';

  function normalizePath(value, label = 'Repository path') {
    const raw = String(value == null ? '' : value).replace(/\\/g, '/').trim().replace(/\/+$/g, '');
    if (!raw || raw.startsWith('/') || /^[A-Za-z]:\//.test(raw) || raw.includes('://') || /[?#\u0000-\u001f\u007f]/.test(raw)) throw new TypeError(`${label} must be a non-empty repository-relative path.`);
    const parts = raw.split('/');
    if (parts.some((part) => !part || part === '.' || part === '..')) throw new TypeError(`${label} contains an empty, . or .. segment.`);
    return parts.join('/');
  }

  function normalizeId(value) {
    const id = String(value == null ? '' : value).trim();
    if (!/^ro_[A-Za-z0-9][A-Za-z0-9_-]{2,63}$/.test(id)) throw new TypeError(`Invalid Reference Object id: ${id || '(empty)'}.`);
    return id;
  }

  function normalizeUse(value) {
    const path = normalizePath(value && value.path, 'Reference use path');
    const line = Math.max(1, Math.trunc(Number(value && value.line) || 1));
    const lineOccurrence = Math.max(1, Math.trunc(Number(value && value.lineOccurrence) || 1));
    return { path, line, lineOccurrence };
  }

  function compareUses(left, right) {
    return left.path.localeCompare(right.path) || left.line - right.line || left.lineOccurrence - right.lineOccurrence;
  }

  function normalizeObject(value) {
    const id = normalizeId(value && value.id);
    const name = String(value && value.name || '').trim();
    if (!name) throw new TypeError(`Reference Object ${id} requires a display name.`);
    const definitionPath = normalizePath(value && value.definition && value.definition.path, 'Reference definition path');
    const seen = new Set();
    const uses = [];
    for (const raw of Array.isArray(value && value.uses) ? value.uses : []) {
      const use = normalizeUse(raw);
      const key = `${use.path}\u0000${use.line}\u0000${use.lineOccurrence}`;
      if (seen.has(key)) continue;
      seen.add(key);
      uses.push(use);
    }
    uses.sort(compareUses);
    return { id, name, definition: { path: definitionPath }, uses };
  }

  function emptyReferenceObjectRegistry() {
    return { schemaVersion: 1, objects: [] };
  }

  function normalizeReferenceObjectRegistry(value) {
    const source = value && typeof value === 'object' ? value : {};
    const seen = new Set();
    const objects = [];
    for (const raw of Array.isArray(source.objects) ? source.objects : []) {
      const object = normalizeObject(raw);
      if (seen.has(object.id)) throw new Error(`Duplicate Reference Object id in definitions file: ${object.id}.`);
      seen.add(object.id);
      objects.push(object);
    }
    objects.sort((left, right) => left.name.localeCompare(right.name) || left.id.localeCompare(right.id));
    return { schemaVersion: 1, objects };
  }

  function decodeReferenceObjectRegistry(text) {
    const source = String(text == null ? '' : text).trim();
    if (!source) return emptyReferenceObjectRegistry();
    let parsed;
    try { parsed = JSON.parse(source); } catch (error) { throw new Error(`Definitions File is not valid JSON: ${error.message}`); }
    if (Number(parsed && parsed.schemaVersion) !== 1) throw new Error(`Unsupported Definitions File schemaVersion: ${parsed && parsed.schemaVersion}.`);
    return normalizeReferenceObjectRegistry(parsed);
  }

  function encodeReferenceObjectRegistry(value) {
    return `${JSON.stringify(normalizeReferenceObjectRegistry(value), null, 2)}\n`;
  }

  function referenceObjectById(registry, id) {
    const stableId = normalizeId(id);
    return normalizeReferenceObjectRegistry(registry).objects.find((object) => object.id === stableId) || null;
  }

  function upsertReferenceObject(registry, object) {
    const current = normalizeReferenceObjectRegistry(registry);
    const nextObject = normalizeObject(object);
    const objects = current.objects.filter((item) => item.id !== nextObject.id);
    objects.push(nextObject);
    return normalizeReferenceObjectRegistry({ schemaVersion: 1, objects });
  }

  function renameReferenceObject(registry, id, name) {
    const stableId = normalizeId(id);
    const display = String(name == null ? '' : name).trim();
    if (!display) throw new TypeError('Reference Object name is required.');
    const current = normalizeReferenceObjectRegistry(registry);
    let found = false;
    const objects = current.objects.map((object) => {
      if (object.id !== stableId) return object;
      found = true;
      return { ...object, name: display };
    });
    if (!found) throw new Error(`Reference Object not found: ${stableId}.`);
    return normalizeReferenceObjectRegistry({ schemaVersion: 1, objects });
  }

  function replaceReferenceObjectUses(registry, id, uses) {
    const stableId = normalizeId(id);
    const current = normalizeReferenceObjectRegistry(registry);
    let found = false;
    const objects = current.objects.map((object) => {
      if (object.id !== stableId) return object;
      found = true;
      return normalizeObject({ ...object, uses: Array.isArray(uses) ? uses : [] });
    });
    if (!found) throw new Error(`Reference Object not found: ${stableId}.`);
    return normalizeReferenceObjectRegistry({ schemaVersion: 1, objects });
  }

  function referenceObjectUsageKey(use) {
    const normalized = normalizeUse(use);
    return `${normalized.path}:${normalized.line}:${normalized.lineOccurrence}`;
  }

  return {
    DEFAULT_REFERENCE_OBJECT_REGISTRY_PATH,
    emptyReferenceObjectRegistry,
    normalizeReferenceObjectRegistry,
    decodeReferenceObjectRegistry,
    encodeReferenceObjectRegistry,
    referenceObjectById,
    upsertReferenceObject,
    renameReferenceObject,
    replaceReferenceObjectUses,
    referenceObjectUsageKey
  };
});
