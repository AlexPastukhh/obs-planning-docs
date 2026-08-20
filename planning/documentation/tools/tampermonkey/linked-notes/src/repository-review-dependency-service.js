(function (root, factory) {
  const api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function (root) {
  'use strict';

  const DEFAULT_MAX_FILE_BYTES = 512 * 1024;

  function core() {
    const api = root.ObsLinkedNotes || {};
    const required = [
      'decodeReviewDependencyRegistry', 'encodeReviewDependencyRegistry', 'reviewDependencyById',
      'parseReviewDependencyMarkers', 'appendReviewDependencyMarker', 'setReviewDependencyAgainst',
      'removeReviewDependencyMarker', 'reviewDependencySourceFingerprint'
    ];
    for (const name of required) if (typeof api[name] !== 'function') throw new Error(`Review Dependency dependency is unavailable: ${name}.`);
    return api;
  }

  function overlayMap(overlays) {
    const map = new Map();
    for (const item of Array.isArray(overlays) ? overlays : []) {
      if (!item || !item.path || item.payloadKind === 'binary') continue;
      map.set(String(item.path), { path: String(item.path), baseSha: String(item.baseSha || ''), content: String(item.content == null ? '' : item.content), local: true });
    }
    return map;
  }

  function isNotFound(error) { return Boolean(error && error.kind === 'not_found'); }

  function decodeUtf8(bytes, path) {
    try { return new TextDecoder('utf-8', { fatal: true }).decode(bytes); }
    catch (error) { throw new Error(`Review Dependency file cannot be decoded as strict UTF-8: ${path}.`); }
  }

  async function readTextFile(client, path, options = {}) {
    const maxBytes = Number(options.maxBytes) > 0 ? Number(options.maxBytes) : DEFAULT_MAX_FILE_BYTES;
    if (client && typeof client.readBytes === 'function') {
      const file = await client.readBytes(path, { maxBytes });
      return { path: file.path || path, sha: String(file.sha || ''), content: decodeUtf8(file.bytes, path), local: false };
    }
    if (client && typeof client.read === 'function') {
      const file = await client.read(path);
      const content = String(file.content == null ? '' : file.content);
      if (new TextEncoder().encode(content).byteLength > maxBytes) throw new Error(`Review Dependency file exceeds ${maxBytes} bytes: ${path}.`);
      return { path: file.path || path, sha: String(file.sha || ''), content, local: false };
    }
    throw new Error('Repository client has no bounded text reader.');
  }

  async function readEffectiveText(client, path, overlays) {
    const local = overlayMap(overlays).get(path);
    if (local) return local;
    return readTextFile(client, path);
  }

  async function readReviewDependencyRegistrySnapshot(client, registryPath, overlays) {
    const api = core();
    const path = String(registryPath || api.DEFAULT_REVIEW_DEPENDENCY_REGISTRY_PATH || '.linked-notes/review-dependencies.json');
    const local = overlayMap(overlays).get(path);
    if (local) return { path, sha: local.baseSha, content: local.content, registry: api.decodeReviewDependencyRegistry(local.content), local: true, missing: false };
    try {
      const file = await readTextFile(client, path);
      return { path, sha: file.sha, content: file.content, registry: api.decodeReviewDependencyRegistry(file.content), local: false, missing: false };
    } catch (error) {
      if (!isNotFound(error)) throw error;
      return { path, sha: '', content: '', registry: api.emptyReviewDependencyRegistry ? api.emptyReviewDependencyRegistry() : { schemaVersion: 1, dependencies: [] }, local: false, missing: true };
    }
  }

  async function diagnoseReviewDependencies(options = {}) {
    const api = core();
    const client = options.client;
    const registryPath = String(options.registryPath || api.DEFAULT_REVIEW_DEPENDENCY_REGISTRY_PATH || '.linked-notes/review-dependencies.json');
    const overlays = Array.isArray(options.overlays) ? options.overlays : [];
    const registrySnapshot = await readReviewDependencyRegistrySnapshot(client, registryPath, overlays);
    const sourceCache = new Map();
    const consumerCache = new Map();
    const results = [];

    async function sourceSnapshot(path) {
      if (!sourceCache.has(path)) sourceCache.set(path, readEffectiveText(client, path, overlays).then(async (file) => ({ ...file, fingerprint: await api.reviewDependencySourceFingerprint(file.content) })));
      return sourceCache.get(path);
    }
    async function consumerSnapshot(path) {
      if (!consumerCache.has(path)) consumerCache.set(path, readEffectiveText(client, path, overlays).then((file) => ({ ...file, parsed: api.parseReviewDependencyMarkers(file.content) })));
      return consumerCache.get(path);
    }

    for (const relation of registrySnapshot.registry.dependencies) {
      let source = null;
      let consumer = null;
      let status = 'unresolved';
      let message = '';
      let against = '';
      try { source = await sourceSnapshot(relation.sourcePath); }
      catch (error) { message = `Source unavailable: ${error.message}`; }
      try { consumer = await consumerSnapshot(relation.consumerPath); }
      catch (error) { message = message || `Consumer unavailable: ${error.message}`; }
      if (source && consumer) {
        const matches = consumer.parsed.markers.filter((marker) => marker.id === relation.id);
        const markerDiagnostics = consumer.parsed.diagnostics.filter((item) => !item.id || item.id === relation.id);
        if (markerDiagnostics.length) message = markerDiagnostics.map((item) => item.message).join(' ');
        else if (matches.length !== 1) message = `Expected exactly one consumer marker; found ${matches.length}.`;
        else {
          against = matches[0].against || '';
          status = against && against === source.fingerprint ? 'current' : 'needs-review';
          message = status === 'current' ? 'Reviewed against current source state.' : (against ? 'Source changed since the last completed review.' : 'Review has not been completed yet.');
        }
      }
      results.push({
        ...relation,
        status,
        message,
        against,
        currentFingerprint: source && source.fingerprint || '',
        sourceLocal: Boolean(source && source.local),
        consumerLocal: Boolean(consumer && consumer.local),
        sourceSha: source && source.sha || '',
        consumerSha: consumer && consumer.sha || ''
      });
    }

    const filesMap = new Map();
    for (const item of results) {
      if (!filesMap.has(item.consumerPath)) filesMap.set(item.consumerPath, { path: item.consumerPath, current: 0, needsReview: 0, unresolved: 0, relations: [] });
      const row = filesMap.get(item.consumerPath);
      if (item.status === 'current') row.current += 1;
      else if (item.status === 'needs-review') row.needsReview += 1;
      else row.unresolved += 1;
      row.relations.push(item.id);
    }
    return {
      registryPath,
      registrySnapshot,
      relations: results,
      files: [...filesMap.values()].sort((a, b) => a.path.localeCompare(b.path)),
      currentCount: results.filter((item) => item.status === 'current').length,
      needsReviewCount: results.filter((item) => item.status === 'needs-review').length,
      unresolvedCount: results.filter((item) => item.status === 'unresolved').length
    };
  }

  function addRelationMarker(content, relationId) {
    return core().appendReviewDependencyMarker(content, relationId, '');
  }

  function completeReviewMarker(content, relationId, fingerprint) {
    return core().setReviewDependencyAgainst(content, relationId, fingerprint);
  }

  function removeRelationMarker(content, relationId) {
    return core().removeReviewDependencyMarker(content, relationId);
  }

  return {
    readReviewDependencyTextFile: readTextFile,
    readReviewDependencyRegistrySnapshot,
    diagnoseReviewDependencies,
    addReviewDependencyRelationMarker: addRelationMarker,
    completeReviewDependencyMarker: completeReviewMarker,
    removeReviewDependencyRelationMarker: removeRelationMarker
  };
});
