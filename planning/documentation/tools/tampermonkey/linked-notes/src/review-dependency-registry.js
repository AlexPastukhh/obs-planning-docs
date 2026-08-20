(function (root, factory) {
  const api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function (root) {
  'use strict';

  const DEFAULT_REVIEW_DEPENDENCY_REGISTRY_PATH = '.linked-notes/review-dependencies.json';

  function apiOrThrow() {
    const api = root.ObsLinkedNotes || {};
    if (typeof api.normalizeReviewDependencyId !== 'function') throw new Error('Review Dependency marker API is unavailable.');
    return api;
  }

  function normalizePath(value) {
    const api = root.ObsLinkedNotes || {};
    if (typeof api.normalizeRepositoryLocalPath === 'function') return api.normalizeRepositoryLocalPath(value);
    const path = String(value == null ? '' : value).replace(/\\/g, '/').trim().replace(/\/+$/g, '');
    if (!path || path.startsWith('/') || /^[A-Za-z]:\//.test(path) || path.includes('://') || /[?#\u0000-\u001f\u007f]/.test(path)) throw new TypeError('Review Dependency path must be repository-relative.');
    const parts = path.split('/');
    if (parts.some((part) => !part || part === '.' || part === '..')) throw new TypeError('Review Dependency path contains an invalid segment.');
    return parts.join('/');
  }

  function normalizeRelation(value) {
    const api = apiOrThrow();
    const source = value && typeof value === 'object' ? value : {};
    const id = api.normalizeReviewDependencyId(source.id);
    const sourcePath = normalizePath(source.sourcePath || source.source && source.source.path);
    const consumerPath = normalizePath(source.consumerPath || source.consumer && source.consumer.path);
    if (sourcePath === consumerPath) throw new TypeError('Review Dependency source and consumer must be different files.');
    const reason = String(source.reason == null ? '' : source.reason).trim() || 'Depends on this source file.';
    const reviewScope = String(source.reviewScope == null ? '' : source.reviewScope).trim();
    return { id, sourcePath, consumerPath, reason, ...(reviewScope ? { reviewScope } : {}) };
  }

  function emptyReviewDependencyRegistry() {
    return { schemaVersion: 1, dependencies: [] };
  }

  function normalizeReviewDependencyRegistry(value) {
    const source = value && typeof value === 'object' ? value : {};
    const ids = new Set();
    const pairs = new Set();
    const dependencies = [];
    for (const raw of Array.isArray(source.dependencies) ? source.dependencies : []) {
      const relation = normalizeRelation(raw);
      if (ids.has(relation.id)) throw new Error(`Duplicate Review Dependency id: ${relation.id}.`);
      const pair = `${relation.sourcePath}\u0000${relation.consumerPath}`;
      if (pairs.has(pair)) throw new Error(`Duplicate Review Dependency source/consumer pair: ${relation.sourcePath} → ${relation.consumerPath}.`);
      ids.add(relation.id);
      pairs.add(pair);
      dependencies.push(relation);
    }
    dependencies.sort((a, b) => a.sourcePath.localeCompare(b.sourcePath) || a.consumerPath.localeCompare(b.consumerPath) || a.id.localeCompare(b.id));
    return { schemaVersion: 1, dependencies };
  }

  function decodeReviewDependencyRegistry(text) {
    const raw = String(text == null ? '' : text).trim();
    if (!raw) return emptyReviewDependencyRegistry();
    let parsed;
    try { parsed = JSON.parse(raw); } catch (error) { throw new Error(`Review Dependency registry is not valid JSON: ${error.message}`); }
    if (Number(parsed && parsed.schemaVersion) !== 1) throw new Error(`Unsupported Review Dependency registry schemaVersion: ${parsed && parsed.schemaVersion}.`);
    return normalizeReviewDependencyRegistry(parsed);
  }

  function encodeReviewDependencyRegistry(value) {
    return `${JSON.stringify(normalizeReviewDependencyRegistry(value), null, 2)}\n`;
  }

  function reviewDependencyById(registry, id) {
    const stableId = apiOrThrow().normalizeReviewDependencyId(id);
    return normalizeReviewDependencyRegistry(registry).dependencies.find((item) => item.id === stableId) || null;
  }

  function upsertReviewDependency(registry, relation) {
    const current = normalizeReviewDependencyRegistry(registry);
    const next = normalizeRelation(relation);
    return normalizeReviewDependencyRegistry({ schemaVersion: 1, dependencies: [...current.dependencies.filter((item) => item.id !== next.id), next] });
  }

  function removeReviewDependency(registry, id) {
    const stableId = apiOrThrow().normalizeReviewDependencyId(id);
    const current = normalizeReviewDependencyRegistry(registry);
    if (!current.dependencies.some((item) => item.id === stableId)) throw new Error(`Review Dependency not found: ${stableId}.`);
    return normalizeReviewDependencyRegistry({ schemaVersion: 1, dependencies: current.dependencies.filter((item) => item.id !== stableId) });
  }

  return {
    DEFAULT_REVIEW_DEPENDENCY_REGISTRY_PATH,
    normalizeReviewDependencyRelation: normalizeRelation,
    emptyReviewDependencyRegistry,
    normalizeReviewDependencyRegistry,
    decodeReviewDependencyRegistry,
    encodeReviewDependencyRegistry,
    reviewDependencyById,
    upsertReviewDependency,
    removeReviewDependency
  };
});
