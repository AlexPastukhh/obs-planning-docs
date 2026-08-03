(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  function bytesEqual(left, right) {
    const a = left instanceof Uint8Array ? left : new Uint8Array(left || []);
    const b = right instanceof Uint8Array ? right : new Uint8Array(right || []);
    if (a.byteLength !== b.byteLength) return false;
    for (let index = 0; index < a.byteLength; index += 1) if (a[index] !== b[index]) return false;
    return true;
  }

  function suffixedPath(path, index) {
    const value = String(path || '');
    const slash = value.lastIndexOf('/');
    const folder = slash === -1 ? '' : value.slice(0, slash + 1);
    const name = slash === -1 ? value : value.slice(slash + 1);
    const dot = name.lastIndexOf('.');
    const stem = dot > 0 ? name.slice(0, dot) : name;
    const ext = dot > 0 ? name.slice(dot) : '';
    return `${folder}${stem}-${index}${ext}`;
  }

  async function readExisting(client, path, bytes, options = {}) {
    try {
      return await client.readBytes(path, { maxBytes: Math.max(bytes.byteLength, options.maxBytes || 0) || undefined });
    } catch (error) {
      if (error && error.kind === 'not_found') return null;
      throw error;
    }
  }

  async function planRepositoryAssets(options = {}) {
    const client = options.client;
    if (!client || typeof client.readBytes !== 'function') throw new TypeError('A GitHub client with binary read support is required.');
    const inputs = Array.isArray(options.assets) ? options.assets : [];
    const maxAttempts = Number.isInteger(options.maxAttempts) && options.maxAttempts > 0 ? options.maxAttempts : 100;
    const reservations = new Map();
    const plans = [];

    for (let inputIndex = 0; inputIndex < inputs.length; inputIndex += 1) {
      const input = inputs[inputIndex] || {};
      const bytes = input.bytes instanceof Uint8Array ? input.bytes : new Uint8Array(input.bytes || []);
      const originalPath = String(input.path || '');
      if (!originalPath) throw new Error('Repository image path is required.');
      let selected = null;

      for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
        const path = attempt === 0 ? originalPath : suffixedPath(originalPath, attempt + 1);
        const reserved = reservations.get(path);
        if (reserved) {
          if (bytesEqual(reserved.bytes, bytes)) {
            selected = {
              key: input.key == null ? String(inputIndex) : String(input.key),
              path,
              sha: reserved.sha || '',
              verifiedHash: reserved.verifiedHash || '',
              htmlUrl: reserved.htmlUrl || '',
              status: 'reused',
              collision: attempt > 0,
              requiresWrite: false,
              reserved: true,
              reservedBy: reserved.key
            };
            break;
          }
          continue;
        }

        const existing = await readExisting(client, path, bytes, options);
        if (existing && bytesEqual(existing.bytes, bytes)) {
          selected = {
            key: input.key == null ? String(inputIndex) : String(input.key),
            path,
            sha: existing.sha || '',
            verifiedHash: existing.verifiedHash || '',
            htmlUrl: existing.htmlUrl || '',
            status: 'reused',
            collision: attempt > 0,
            requiresWrite: false,
            reserved: false,
            reservedBy: ''
          };
          reservations.set(path, { key: selected.key, bytes, sha: selected.sha, verifiedHash: selected.verifiedHash, htmlUrl: selected.htmlUrl });
          break;
        }
        if (existing) continue;

        selected = {
          key: input.key == null ? String(inputIndex) : String(input.key),
          path,
          sha: '',
          verifiedHash: '',
          htmlUrl: '',
          status: 'create',
          collision: attempt > 0,
          requiresWrite: true,
          reserved: false,
          reservedBy: ''
        };
        reservations.set(path, { key: selected.key, bytes, sha: '', verifiedHash: '', htmlUrl: '' });
        break;
      }

      if (!selected) throw new Error(`Unable to choose a free repository image path after ${maxAttempts} attempts.`);
      plans.push(selected);
    }

    return plans;
  }

  async function planRepositoryAsset(options = {}) {
    const plans = await planRepositoryAssets({
      ...options,
      assets: [{ key: 'asset', path: options.path, bytes: options.bytes }]
    });
    const plan = plans[0];
    if (!plan) throw new Error('Repository image plan is unavailable.');
    const { key, reserved, reservedBy, ...single } = plan;
    return single;
  }

  function stalePlanError(expected, actual) {
    const error = new Error(`Repository image plan changed before execution: expected ${expected.status} at ${expected.path}, now ${actual.status} at ${actual.path}. Prepare the transfer again.`);
    error.kind = 'plan_stale';
    error.details = { expected, actual };
    return error;
  }

  async function ensureRepositoryAsset(options = {}) {
    const client = options.client;
    if (!client || typeof client.readBytes !== 'function' || typeof client.saveBytesVerified !== 'function') throw new TypeError('A GitHub client with binary read/write support is required.');
    const bytes = options.bytes instanceof Uint8Array ? options.bytes : new Uint8Array(options.bytes || []);
    const planned = await planRepositoryAsset(options);
    const expected = options.expectedPlan;
    if (expected && (String(expected.path || '') !== planned.path || String(expected.status || '') !== planned.status)) throw stalePlanError(expected, planned);
    if (!planned.requiresWrite) return planned;
    const result = await client.saveBytesVerified({ path: planned.path, bytes, baseSha: '', message: options.message || `Add repository image ${planned.path}` });
    return { ...result, path: planned.path, status: 'created', collision: planned.collision, requiresWrite: false };
  }

  return { bytesEqual, suffixedPath, planRepositoryAsset, planRepositoryAssets, ensureRepositoryAsset };
});
