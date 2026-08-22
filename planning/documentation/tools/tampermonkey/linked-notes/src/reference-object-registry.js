(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const DEFAULT_REFERENCE_OBJECT_REGISTRY_PATH = '.linked-notes/reference-objects.json';
  const REFERENCE_REVIEW_FINGERPRINT_PATTERN = /^sha256:[a-f0-9]{64}$/;

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

  function normalizeLocation(value, label) {
    const path = normalizePath(value && value.path, `${label} path`);
    const line = Math.max(1, Math.trunc(Number(value && value.line) || 1));
    const lineOccurrence = Math.max(1, Math.trunc(Number(value && value.lineOccurrence) || 1));
    return { path, line, lineOccurrence };
  }

  function normalizeUse(value) {
    return normalizeLocation(value, 'Reference use');
  }

  function normalizeDependencyNumber(value) {
    const number = Math.trunc(Number(value));
    if (!Number.isSafeInteger(number) || number < 1 || number > 999999999) throw new TypeError(`Invalid Reference Object dependency number: ${String(value == null ? '' : value) || '(empty)'}.`);
    return number;
  }

  function normalizeReviewedAgainst(value) {
    const fingerprint = String(value == null ? '' : value).trim().toLowerCase();
    if (!fingerprint) return '';
    if (!REFERENCE_REVIEW_FINGERPRINT_PATTERN.test(fingerprint)) throw new TypeError(`Invalid Reference Object dependency fingerprint: ${fingerprint}.`);
    return fingerprint;
  }

  function normalizeDependency(value) {
    const location = normalizeLocation(value, 'Reference dependency');
    const dep = normalizeDependencyNumber(value && value.dep);
    const reviewedAgainst = normalizeReviewedAgainst(value && value.reviewedAgainst);
    const reviewedFragment = normalizeReviewedAgainst(value && value.reviewedFragment);
    return { dep, ...location, ...(reviewedAgainst ? { reviewedAgainst } : {}), ...(reviewedFragment ? { reviewedFragment } : {}) };
  }

  function compareUses(left, right) {
    return left.path.localeCompare(right.path) || left.line - right.line || left.lineOccurrence - right.lineOccurrence;
  }

  function compareDependencies(left, right) {
    return left.path.localeCompare(right.path) || left.dep - right.dep || left.line - right.line || left.lineOccurrence - right.lineOccurrence;
  }

  function normalizeObject(value) {
    const id = normalizeId(value && value.id);
    const name = String(value && value.name || '').trim();
    if (!name) throw new TypeError(`Reference Object ${id} requires a display name.`);
    const definitionPath = normalizePath(value && value.definition && value.definition.path, 'Reference definition path');
    const seenUses = new Set();
    const uses = [];
    for (const raw of Array.isArray(value && value.uses) ? value.uses : []) {
      const use = normalizeUse(raw);
      const key = `${use.path}\u0000${use.line}\u0000${use.lineOccurrence}`;
      if (seenUses.has(key)) continue;
      seenUses.add(key);
      uses.push(use);
    }
    uses.sort(compareUses);
    const seenDependencies = new Set();
    const depends = [];
    for (const raw of Array.isArray(value && value.depends) ? value.depends : []) {
      const dependency = normalizeDependency(raw);
      const key = `${dependency.path}\u0000${dependency.dep}`;
      if (seenDependencies.has(key)) throw new Error(`Duplicate Reference Object dependency ${dependency.path} #${dependency.dep} for ${id}.`);
      seenDependencies.add(key);
      depends.push(dependency);
    }
    depends.sort(compareDependencies);
    return { id, name, definition: { path: definitionPath }, uses, depends };
  }

  function emptyReferenceObjectRegistry() {
    return { schemaVersion: 2, objects: [] };
  }

  function normalizeReferenceObjectRegistry(value) {
    const source = value && typeof value === 'object' ? value : {};
    const seen = new Set();
    const dependencyLocations = new Map();
    const objects = [];
    for (const raw of Array.isArray(source.objects) ? source.objects : []) {
      const object = normalizeObject(raw);
      if (seen.has(object.id)) throw new Error(`Duplicate Reference Object id in definitions file: ${object.id}.`);
      seen.add(object.id);
      for (const dependency of object.depends) {
        const key = `${dependency.path}\u0000${dependency.dep}`;
        if (dependencyLocations.has(key)) throw new Error(`Reference Object dependency number ${dependency.dep} is assigned to more than one object in ${dependency.path}.`);
        dependencyLocations.set(key, object.id);
      }
      objects.push(object);
    }
    objects.sort((left, right) => left.name.localeCompare(right.name) || left.id.localeCompare(right.id));
    return { schemaVersion: 2, objects };
  }

  function decodeReferenceObjectRegistry(text) {
    const source = String(text == null ? '' : text).trim();
    if (!source) return emptyReferenceObjectRegistry();
    let parsed;
    try { parsed = JSON.parse(source); } catch (error) { throw new Error(`Definitions File is not valid JSON: ${error.message}`); }
    const version = Number(parsed && parsed.schemaVersion);
    if (version !== 1 && version !== 2) throw new Error(`Unsupported Definitions File schemaVersion: ${parsed && parsed.schemaVersion}.`);
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
    return normalizeReferenceObjectRegistry({ schemaVersion: 2, objects });
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
    return normalizeReferenceObjectRegistry({ schemaVersion: 2, objects });
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
    return normalizeReferenceObjectRegistry({ schemaVersion: 2, objects });
  }

  function replaceReferenceObjectDependencies(registry, id, depends) {
    const stableId = normalizeId(id);
    const current = normalizeReferenceObjectRegistry(registry);
    let found = false;
    const objects = current.objects.map((object) => {
      if (object.id !== stableId) return object;
      found = true;
      return normalizeObject({ ...object, depends: Array.isArray(depends) ? depends : [] });
    });
    if (!found) throw new Error(`Reference Object not found: ${stableId}.`);
    return normalizeReferenceObjectRegistry({ schemaVersion: 2, objects });
  }

  function setReferenceObjectDependencyReviewedAgainst(registry, id, path, dep, reviewedAgainst, location = {}) {
    const stableId = normalizeId(id);
    const normalizedPath = normalizePath(path, 'Reference dependency path');
    const dependencyNumber = normalizeDependencyNumber(dep);
    const fingerprint = normalizeReviewedAgainst(reviewedAgainst);
    const fragmentFingerprint = normalizeReviewedAgainst(location && location.reviewedFragment);
    const current = normalizeReferenceObjectRegistry(registry);
    let found = false;
    const objects = current.objects.map((object) => {
      if (object.id !== stableId) return object;
      const depends = object.depends.map((dependency) => {
        if (dependency.path !== normalizedPath || dependency.dep !== dependencyNumber) return dependency;
        found = true;
        return normalizeDependency({ ...dependency, ...location, path: normalizedPath, dep: dependencyNumber, reviewedAgainst: fingerprint, ...(fragmentFingerprint ? { reviewedFragment: fragmentFingerprint } : {}) });
      });
      return normalizeObject({ ...object, depends });
    });
    if (!found) throw new Error(`Reference Object dependency not found: ${stableId} at ${normalizedPath} #${dependencyNumber}.`);
    return normalizeReferenceObjectRegistry({ schemaVersion: 2, objects });
  }

  function referenceObjectUsageKey(use) {
    const normalized = normalizeUse(use);
    return `${normalized.path}:${normalized.line}:${normalized.lineOccurrence}`;
  }

  function referenceObjectDependencyKey(dependency) {
    const normalized = normalizeDependency(dependency);
    return `${normalized.path}:dep-${normalized.dep}`;
  }

  return {
    DEFAULT_REFERENCE_OBJECT_REGISTRY_PATH,
    REFERENCE_REVIEW_FINGERPRINT_PATTERN,
    emptyReferenceObjectRegistry,
    normalizeReferenceObjectRegistry,
    decodeReferenceObjectRegistry,
    encodeReferenceObjectRegistry,
    referenceObjectById,
    upsertReferenceObject,
    renameReferenceObject,
    replaceReferenceObjectUses,
    replaceReferenceObjectDependencies,
    setReferenceObjectDependencyReviewedAgainst,
    referenceObjectUsageKey,
    referenceObjectDependencyKey
  };
});
