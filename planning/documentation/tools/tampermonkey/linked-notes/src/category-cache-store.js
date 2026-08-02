(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const LEGACY_CATEGORY_CACHE_KEY = 'obsLinkedNotesPrototype:v1:categoryCache';
  const CATEGORY_CACHE_KEY_PREFIX = 'obsLinkedNotesPrototype:v2:categoryCache:';
  const CATEGORY_GROUPS_KEY_PREFIX = 'obsLinkedNotesPrototype:v2:categoryGroups:';
  const CATEGORY_LOCK_KEY_PREFIX = 'obsLinkedNotesPrototype:v2:categoryLock:';

  function clone(value) { return value == null ? value : JSON.parse(JSON.stringify(value)); }
  function randomId(prefix) {
    const cryptoObject = typeof globalThis !== 'undefined' ? globalThis.crypto : null;
    const value = cryptoObject && typeof cryptoObject.randomUUID === 'function'
      ? cryptoObject.randomUUID()
      : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
    return `${prefix}-${value}`;
  }
  function workspaceToken(workspaceId) {
    const value = String(workspaceId || '').trim();
    if (!value) throw new Error('Workspace id is required for category cache.');
    return encodeURIComponent(value);
  }
  function revisionIdentity(value) {
    const revision = value && typeof value === 'object' ? value : {};
    return `${Number(revision.number) || 0}:${String(revision.mutationId || '')}:${String(revision.writerId || '')}`;
  }

  class CategoryCacheStore {
    constructor(options = {}) {
      this.getValue = options.getValue;
      this.setValue = options.setValue;
      this.now = options.now || (() => new Date());
      this.sleep = options.sleep || ((ms) => new Promise((resolve) => setTimeout(resolve, ms)));
      this.writerId = options.writerId || randomId('category-writer');
      this.lockTtlMs = Number(options.lockTtlMs) > 0 ? Number(options.lockTtlMs) : 4000;
      this.lockSettleMs = Number(options.lockSettleMs) >= 0 ? Number(options.lockSettleMs) : 20;
      this.lockRetryMs = Number(options.lockRetryMs) >= 0 ? Number(options.lockRetryMs) : 15;
      this.maxLockAttempts = Number(options.maxLockAttempts) > 0 ? Number(options.maxLockAttempts) : 80;
      if (typeof this.getValue !== 'function' || typeof this.setValue !== 'function') throw new TypeError('CategoryCacheStore requires getValue and setValue.');
    }

    _nowMs() { return new Date(this.now()).getTime(); }
    _nowIso() { return new Date(this.now()).toISOString(); }
    _cacheKey(workspaceId) { return `${CATEGORY_CACHE_KEY_PREFIX}${workspaceToken(workspaceId)}`; }
    _groupsKey(workspaceId) { return `${CATEGORY_GROUPS_KEY_PREFIX}${workspaceToken(workspaceId)}`; }
    _lockKey(workspaceId) { return `${CATEGORY_LOCK_KEY_PREFIX}${workspaceToken(workspaceId)}`; }
    _revision(value) {
      const source = value && typeof value === 'object' ? value : {};
      return {
        number: Math.max(0, Number(source.number) || 0),
        mutationId: String(source.mutationId || ''),
        writerId: String(source.writerId || ''),
        updatedAt: String(source.updatedAt || '')
      };
    }
    _cacheRecord(raw) {
      if (!raw || Number(raw.schemaVersion) !== 2) return null;
      return {
        schemaVersion: 2,
        definitions: clone(Array.isArray(raw.definitions) ? raw.definitions : []),
        diagnostics: clone(Array.isArray(raw.diagnostics) ? raw.diagnostics : []),
        fileValidation: clone(raw.fileValidation && typeof raw.fileValidation === 'object' ? raw.fileValidation : {}),
        refreshedAt: String(raw.refreshedAt || ''),
        revision: this._revision(raw.revision)
      };
    }
    _groupsRecord(raw) {
      if (!raw || Number(raw.schemaVersion) !== 2) return null;
      return {
        schemaVersion: 2,
        groups: clone(raw.groups && typeof raw.groups === 'object' && !Array.isArray(raw.groups) ? raw.groups : {}),
        revision: this._revision(raw.revision)
      };
    }

    async _readCache(workspaceId) { return this._cacheRecord(await this.getValue(this._cacheKey(workspaceId), null)); }
    async _readGroups(workspaceId) { return this._groupsRecord(await this.getValue(this._groupsKey(workspaceId), null)); }

    async _acquireLock(workspaceId) {
      const key = this._lockKey(workspaceId);
      const token = randomId('category-lock');
      for (let attempt = 0; attempt < this.maxLockAttempts; attempt += 1) {
        const nowMs = this._nowMs();
        const current = await this.getValue(key, null);
        if (!current || !current.token || Number(current.expiresAt) <= nowMs) {
          const claim = { owner: this.writerId, token, expiresAt: nowMs + this.lockTtlMs, claimedAt: this._nowIso() };
          await this.setValue(key, claim);
          await this.sleep(this.lockSettleMs);
          const confirmed = await this.getValue(key, null);
          if (confirmed && confirmed.owner === claim.owner && confirmed.token === claim.token) return claim;
        }
        await this.sleep(this.lockRetryMs);
      }
      throw new Error('Another tab is updating this workspace category cache. Retry after it finishes.');
    }

    async _assertLock(workspaceId, lock) {
      const key = this._lockKey(workspaceId);
      const current = await this.getValue(key, null);
      if (!current || current.owner !== lock.owner || current.token !== lock.token) throw new Error('Category cache update lock was lost to another tab. Retry the action.');
      const renewed = { ...current, expiresAt: this._nowMs() + this.lockTtlMs };
      await this.setValue(key, renewed);
      const confirmed = await this.getValue(key, null);
      if (!confirmed || confirmed.owner !== lock.owner || confirmed.token !== lock.token) throw new Error('Category cache update lock could not be renewed. Retry the action.');
    }

    async _releaseLock(workspaceId, lock) {
      const key = this._lockKey(workspaceId);
      const current = await this.getValue(key, null);
      if (current && current.owner === lock.owner && current.token === lock.token) await this.setValue(key, null);
    }

    _nextRevision(previous) {
      return {
        number: (Number(previous && previous.number) || 0) + 1,
        mutationId: randomId('category-mutation'),
        writerId: this.writerId,
        updatedAt: this._nowIso()
      };
    }

    async _writeVerified(workspaceId, key, payload, readBack, lock) {
      await this._assertLock(workspaceId, lock);
      await this.setValue(key, payload);
      await this.sleep(this.lockSettleMs);
      await this._assertLock(workspaceId, lock);
      const written = await readBack();
      if (!written || revisionIdentity(written.revision) !== revisionIdentity(payload.revision)) {
        throw new Error('Category cache state was replaced before verification. Retry the action.');
      }
      return written;
    }

    async _legacySnapshot(workspaceId, options = {}) {
      const raw = await this.getValue(LEGACY_CATEGORY_CACHE_KEY, { schemaVersion: 1, workspaces: {} });
      const value = raw && Number(raw.schemaVersion) === 1 && raw.workspaces && typeof raw.workspaces === 'object'
        ? raw.workspaces[String(options.legacyWorkspaceId || workspaceId || '')] : null;
      return value && typeof value === 'object' ? {
        definitions: clone(Array.isArray(value.definitions) ? value.definitions : []),
        diagnostics: clone(Array.isArray(value.diagnostics) ? value.diagnostics : []),
        fileValidation: clone(value.fileValidation && typeof value.fileValidation === 'object' ? value.fileValidation : {}),
        groups: clone(value.groups && typeof value.groups === 'object' ? value.groups : {}),
        refreshedAt: String(value.refreshedAt || '')
      } : { definitions: [], diagnostics: [], fileValidation: {}, groups: {}, refreshedAt: '' };
    }

    async _ensureWorkspace(workspaceId, options = {}) {
      workspaceToken(workspaceId);
      if (await this._readCache(workspaceId) && await this._readGroups(workspaceId)) return;
      const lock = await this._acquireLock(workspaceId);
      try {
        let cache = await this._readCache(workspaceId);
        let groups = await this._readGroups(workspaceId);
        if (cache && groups) return;
        const legacy = await this._legacySnapshot(workspaceId, options);
        if (!cache) {
          const payload = {
            schemaVersion: 2,
            definitions: legacy.definitions,
            diagnostics: legacy.diagnostics,
            fileValidation: legacy.fileValidation,
            refreshedAt: legacy.refreshedAt,
            revision: this._nextRevision(null)
          };
          cache = await this._writeVerified(workspaceId, this._cacheKey(workspaceId), payload, () => this._readCache(workspaceId), lock);
        }
        if (!groups) {
          const payload = { schemaVersion: 2, groups: legacy.groups, revision: this._nextRevision(null) };
          groups = await this._writeVerified(workspaceId, this._groupsKey(workspaceId), payload, () => this._readGroups(workspaceId), lock);
        }
      } finally { await this._releaseLock(workspaceId, lock); }
    }

    async load(workspaceId, options = {}) {
      await this._ensureWorkspace(workspaceId, options);
      const cache = await this._readCache(workspaceId);
      const groups = await this._readGroups(workspaceId);
      return {
        definitions: clone(cache ? cache.definitions : []),
        diagnostics: clone(cache ? cache.diagnostics : []),
        fileValidation: clone(cache ? cache.fileValidation : {}),
        groups: clone(groups ? groups.groups : {}),
        refreshedAt: cache ? cache.refreshedAt : ''
      };
    }

    async saveDefinitions(workspaceId, snapshot = {}) {
      await this._ensureWorkspace(workspaceId);
      const lock = await this._acquireLock(workspaceId);
      try {
        const current = await this._readCache(workspaceId);
        const payload = {
          schemaVersion: 2,
          definitions: clone(Array.isArray(snapshot.definitions) ? snapshot.definitions : []),
          diagnostics: clone(Array.isArray(snapshot.diagnostics) ? snapshot.diagnostics : []),
          fileValidation: clone(snapshot.fileValidation && typeof snapshot.fileValidation === 'object' ? snapshot.fileValidation : {}),
          refreshedAt: String(snapshot.refreshedAt || this._nowIso()),
          revision: this._nextRevision(current && current.revision)
        };
        await this._writeVerified(workspaceId, this._cacheKey(workspaceId), payload, () => this._readCache(workspaceId), lock);
      } finally { await this._releaseLock(workspaceId, lock); }
      return this.load(workspaceId);
    }

    async setGroups(workspaceId, groupsValue) {
      await this._ensureWorkspace(workspaceId);
      const lock = await this._acquireLock(workspaceId);
      try {
        const current = await this._readGroups(workspaceId);
        const payload = {
          schemaVersion: 2,
          groups: clone(groupsValue && typeof groupsValue === 'object' && !Array.isArray(groupsValue) ? groupsValue : {}),
          revision: this._nextRevision(current && current.revision)
        };
        await this._writeVerified(workspaceId, this._groupsKey(workspaceId), payload, () => this._readGroups(workspaceId), lock);
      } finally { await this._releaseLock(workspaceId, lock); }
      return this.load(workspaceId);
    }


    async setCategoryGroup(workspaceId, categoryId, groupName) {
      await this._ensureWorkspace(workspaceId);
      const id = String(categoryId || '').trim();
      if (!id) throw new Error('Category id is required for a local group update.');
      const lock = await this._acquireLock(workspaceId);
      try {
        const current = await this._readGroups(workspaceId);
        const groups = clone(current && current.groups || {});
        const value = String(groupName || '').trim();
        if (value) groups[id] = value;
        else delete groups[id];
        const payload = {
          schemaVersion: 2,
          groups,
          revision: this._nextRevision(current && current.revision)
        };
        await this._writeVerified(workspaceId, this._groupsKey(workspaceId), payload, () => this._readGroups(workspaceId), lock);
      } finally { await this._releaseLock(workspaceId, lock); }
      return this.load(workspaceId);
    }

    async save(workspaceId, snapshot = {}) {
      await this._ensureWorkspace(workspaceId);
      const lock = await this._acquireLock(workspaceId);
      try {
        const currentCache = await this._readCache(workspaceId);
        const currentGroups = await this._readGroups(workspaceId);
        const cachePayload = {
          schemaVersion: 2,
          definitions: clone(Array.isArray(snapshot.definitions) ? snapshot.definitions : []),
          diagnostics: clone(Array.isArray(snapshot.diagnostics) ? snapshot.diagnostics : []),
          fileValidation: clone(snapshot.fileValidation && typeof snapshot.fileValidation === 'object' ? snapshot.fileValidation : {}),
          refreshedAt: String(snapshot.refreshedAt || this._nowIso()),
          revision: this._nextRevision(currentCache && currentCache.revision)
        };
        const groupsPayload = {
          schemaVersion: 2,
          groups: clone(snapshot.groups && typeof snapshot.groups === 'object' && !Array.isArray(snapshot.groups) ? snapshot.groups : (currentGroups ? currentGroups.groups : {})),
          revision: this._nextRevision(currentGroups && currentGroups.revision)
        };
        await this._writeVerified(workspaceId, this._cacheKey(workspaceId), cachePayload, () => this._readCache(workspaceId), lock);
        await this._writeVerified(workspaceId, this._groupsKey(workspaceId), groupsPayload, () => this._readGroups(workspaceId), lock);
      } finally { await this._releaseLock(workspaceId, lock); }
      return this.load(workspaceId);
    }

    async clear(workspaceId) {
      await this._ensureWorkspace(workspaceId);
      const lock = await this._acquireLock(workspaceId);
      try {
        const currentCache = await this._readCache(workspaceId);
        const currentGroups = await this._readGroups(workspaceId);
        const cachePayload = { schemaVersion: 2, definitions: [], diagnostics: [], fileValidation: {}, refreshedAt: '', revision: this._nextRevision(currentCache && currentCache.revision) };
        const groupsPayload = { schemaVersion: 2, groups: {}, revision: this._nextRevision(currentGroups && currentGroups.revision) };
        await this._writeVerified(workspaceId, this._cacheKey(workspaceId), cachePayload, () => this._readCache(workspaceId), lock);
        await this._writeVerified(workspaceId, this._groupsKey(workspaceId), groupsPayload, () => this._readGroups(workspaceId), lock);
      } finally { await this._releaseLock(workspaceId, lock); }
    }
  }

  return {
    LEGACY_CATEGORY_CACHE_KEY,
    CATEGORY_CACHE_KEY_PREFIX,
    CATEGORY_GROUPS_KEY_PREFIX,
    CATEGORY_LOCK_KEY_PREFIX,
    CategoryCacheStore
  };
});
