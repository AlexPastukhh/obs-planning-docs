(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const DEFAULT_SEARCH_LIMITS = Object.freeze({ maxFolders: 80, maxRequests: 80, maxResults: 100, maxEntriesPerFolder: 200, maxDepth: 8 });
  function normalizedQuery(value) { return String(value == null ? '' : value).trim().toLocaleLowerCase(); }
  function normalizedRoot(value) { return String(value == null ? '' : value).replace(/\\/g, '/').trim().replace(/^\/+|\/+$/g, ''); }
  function normalizeDepth(value, maxDepth) {
    if (value === 'entire' || value === Infinity) return maxDepth;
    const number = Number(value);
    return Number.isInteger(number) && number >= 0 ? Math.min(number, maxDepth) : 0;
  }
  function matchesName(entry, query) {
    if (!query) return true;
    return String(entry && (entry.name || entry.path) || '').toLocaleLowerCase().includes(query);
  }

  async function searchRepositoryTargets(input = {}) {
    if (typeof input.listDirectory !== 'function') throw new TypeError('listDirectory callback is required.');
    const limits = { ...DEFAULT_SEARCH_LIMITS, ...(input.limits || {}) };
    const query = normalizedQuery(input.query);
    const rootPath = normalizedRoot(input.rootPath);
    const depth = normalizeDepth(input.depth, Number(limits.maxDepth) || DEFAULT_SEARCH_LIMITS.maxDepth);
    const queue = [{ path: rootPath, level: 0 }];
    const visited = new Set();
    const results = [];
    let requestCount = 0;
    let folderCount = 0;
    let truncated = false;
    let truncationReason = '';

    while (queue.length) {
      if (requestCount >= limits.maxRequests || folderCount >= limits.maxFolders) {
        truncated = true;
        truncationReason = requestCount >= limits.maxRequests ? 'request_limit' : 'folder_limit';
        break;
      }
      const current = queue.shift();
      if (visited.has(current.path)) continue;
      visited.add(current.path);
      requestCount += 1;
      folderCount += 1;
      const entries = await input.listDirectory(current.path, { maxEntries: limits.maxEntriesPerFolder });
      for (const entry of Array.isArray(entries) ? entries : []) {
        if (entry && entry.type === 'file' && matchesName(entry, query)) {
          results.push({
            type: 'file',
            path: String(entry.path || ''),
            name: String(entry.name || ''),
            size: Number(entry.size || 0),
            sha: String(entry.sha || ''),
            htmlUrl: String(entry.htmlUrl || ''),
            depth: current.level
          });
          if (results.length >= limits.maxResults) {
            truncated = true;
            truncationReason = 'result_limit';
            break;
          }
        }
        if (entry && entry.type === 'dir' && current.level < depth) queue.push({ path: String(entry.path || ''), level: current.level + 1 });
      }
      if (truncated && truncationReason === 'result_limit') break;
    }

    return {
      query,
      rootPath,
      requestedDepth: input.depth,
      effectiveDepth: depth,
      results: results.sort((a, b) => a.path.localeCompare(b.path, undefined, { sensitivity: 'base' })),
      scannedFolders: folderCount,
      requestCount,
      truncated,
      truncationReason,
      remainingFolders: queue.length
    };
  }

  return { DEFAULT_SEARCH_LIMITS, searchRepositoryTargets, matchesName };
});
