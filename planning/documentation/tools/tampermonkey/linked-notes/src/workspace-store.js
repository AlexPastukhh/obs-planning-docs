(function (root, factory) {
  const api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function (root) {
  'use strict';

  const STATE_KEY = 'obsLinkedNotesPrototype:v2:workspaceState';
  const STATE_LOCK_KEY = 'obsLinkedNotesPrototype:v2:stateLock';
  const SHARED_TOKEN_KEY = 'obsLinkedNotesPrototype:v2:githubToken';
  const MIGRATION_KEY = 'obsLinkedNotesPrototype:v2:migration';

  // v0.2.0 split-state inputs. Kept for migration only and never deleted automatically.
  const WORKSPACES_KEY = 'obsLinkedNotesPrototype:v2:workspaces';
  const CHAT_WORKSPACE_MAP_KEY = 'obsLinkedNotesPrototype:v2:chatWorkspaceMap';
  const DEFAULT_WORKSPACE_KEY = 'obsLinkedNotesPrototype:v2:defaultWorkspace';

  const LEGACY_SETTINGS_KEY = 'obsLinkedNotesPrototype:v1:settings';
  const LEGACY_TOKEN_KEY = 'obsLinkedNotesPrototype:v1:githubToken';
  const LEGACY_IMPORTED_WORKSPACE_ID = 'workspace-imported-v1';

  function clone(value) {
    return value == null ? value : JSON.parse(JSON.stringify(value));
  }

  function randomId(prefix) {
    const cryptoObject = typeof globalThis !== 'undefined' ? globalThis.crypto : null;
    const value = cryptoObject && typeof cryptoObject.randomUUID === 'function'
      ? cryptoObject.randomUUID()
      : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
    return `${prefix}-${value}`;
  }

  function revisionIdentity(value) {
    const revision = value && typeof value === 'object' ? value : {};
    return `${Number(revision.number) || 0}:${String(revision.mutationId || '')}:${String(revision.writerId || '')}`;
  }

  class WorkspaceStore {
    constructor(options = {}) {
      this.api = options.api || root.ObsLinkedNotes || {};
      this.getValue = options.getValue;
      this.setValue = options.setValue;
      this.now = options.now || (() => new Date());
      this.sleep = options.sleep || ((ms) => new Promise((resolve) => setTimeout(resolve, ms)));
      this.writerId = options.writerId || randomId('workspace-writer');
      this.lockTtlMs = Number(options.lockTtlMs) > 0 ? Number(options.lockTtlMs) : 4000;
      this.lockSettleMs = Number(options.lockSettleMs) >= 0 ? Number(options.lockSettleMs) : 20;
      this.lockRetryMs = Number(options.lockRetryMs) >= 0 ? Number(options.lockRetryMs) : 15;
      this.maxLockAttempts = Number(options.maxLockAttempts) > 0 ? Number(options.maxLockAttempts) : 80;
      if (typeof this.getValue !== 'function' || typeof this.setValue !== 'function') {
        throw new TypeError('WorkspaceStore requires getValue and setValue functions.');
      }
    }

    _nowMs() {
      return new Date(this.now()).getTime();
    }

    _nowIso() {
      return new Date(this.now()).toISOString();
    }

    _normalizeRevision(value) {
      const source = value && typeof value === 'object' ? value : {};
      return {
        number: Math.max(0, Number(source.number) || 0),
        mutationId: String(source.mutationId || ''),
        writerId: String(source.writerId || ''),
        updatedAt: String(source.updatedAt || '')
      };
    }

    _sanitizeState(workspacesRaw, mapRaw, defaultRaw, revisionRaw) {
      const workspaces = [];
      const ids = new Set();
      for (const raw of Array.isArray(workspacesRaw) ? workspacesRaw : []) {
        try {
          const workspace = this.api.normalizeWorkspace(raw, raw.updatedAt || this.now());
          if (!ids.has(workspace.id)) {
            ids.add(workspace.id);
            workspaces.push(workspace);
          }
        } catch (error) {
          // Invalid local workspace records are ignored instead of becoming write targets.
        }
      }
      const chatWorkspaceMap = {};
      if (mapRaw && typeof mapRaw === 'object' && !Array.isArray(mapRaw)) {
        for (const [chatKey, workspaceId] of Object.entries(mapRaw)) {
          if (chatKey && ids.has(String(workspaceId))) chatWorkspaceMap[chatKey] = String(workspaceId);
        }
      }
      const defaultWorkspaceId = ids.has(String(defaultRaw || ''))
        ? String(defaultRaw)
        : (workspaces[0] ? workspaces[0].id : '');
      return {
        schemaVersion: 1,
        workspaces,
        chatWorkspaceMap,
        defaultWorkspaceId,
        revision: this._normalizeRevision(revisionRaw)
      };
    }

    async _readCanonicalState() {
      const raw = await this.getValue(STATE_KEY, null);
      if (!raw || typeof raw !== 'object' || Number(raw.schemaVersion) !== 1) return null;
      return this._sanitizeState(raw.workspaces, raw.chatWorkspaceMap, raw.defaultWorkspaceId, raw.revision);
    }

    async _readSplitState() {
      return this._sanitizeState(
        await this.getValue(WORKSPACES_KEY, []),
        await this.getValue(CHAT_WORKSPACE_MAP_KEY, {}),
        await this.getValue(DEFAULT_WORKSPACE_KEY, ''),
        {}
      );
    }

    async _acquireLock() {
      const token = randomId('workspace-lock');
      for (let attempt = 0; attempt < this.maxLockAttempts; attempt += 1) {
        const nowMs = this._nowMs();
        const current = await this.getValue(STATE_LOCK_KEY, null);
        const available = !current || !current.token || Number(current.expiresAt) <= nowMs;
        if (available) {
          const claim = {
            owner: this.writerId,
            token,
            expiresAt: nowMs + this.lockTtlMs,
            claimedAt: this._nowIso()
          };
          await this.setValue(STATE_LOCK_KEY, claim);
          await this.sleep(this.lockSettleMs);
          const confirmed = await this.getValue(STATE_LOCK_KEY, null);
          if (confirmed && confirmed.owner === claim.owner && confirmed.token === claim.token) return claim;
        }
        await this.sleep(this.lockRetryMs);
      }
      throw new Error('Another tab is updating Linked Notes workspaces. Retry after it finishes.');
    }

    async _renewLock(lock) {
      const current = await this.getValue(STATE_LOCK_KEY, null);
      if (!current || current.owner !== lock.owner || current.token !== lock.token) {
        throw new Error('Workspace update lock was lost to another tab. Retry the action.');
      }
      const renewed = { ...current, expiresAt: this._nowMs() + this.lockTtlMs };
      await this.setValue(STATE_LOCK_KEY, renewed);
      const confirmed = await this.getValue(STATE_LOCK_KEY, null);
      if (!confirmed || confirmed.owner !== lock.owner || confirmed.token !== lock.token) {
        throw new Error('Workspace update lock could not be renewed. Retry the action.');
      }
      return renewed;
    }

    async _releaseLock(lock) {
      const current = await this.getValue(STATE_LOCK_KEY, null);
      if (current && current.owner === lock.owner && current.token === lock.token) {
        await this.setValue(STATE_LOCK_KEY, null);
      }
    }

    async _commitState(state, previousRevision, lock) {
      await this._renewLock(lock);
      const revision = {
        number: (Number(previousRevision && previousRevision.number) || 0) + 1,
        mutationId: randomId('workspace-mutation'),
        writerId: this.writerId,
        updatedAt: this._nowIso()
      };
      const payload = {
        schemaVersion: 1,
        workspaces: clone(state.workspaces),
        chatWorkspaceMap: clone(state.chatWorkspaceMap),
        defaultWorkspaceId: state.defaultWorkspaceId || '',
        revision
      };
      await this.setValue(STATE_KEY, payload);
      await this.sleep(this.lockSettleMs);
      const currentLock = await this.getValue(STATE_LOCK_KEY, null);
      const written = await this._readCanonicalState();
      if (!currentLock || currentLock.owner !== lock.owner || currentLock.token !== lock.token) {
        throw new Error('Workspace update lock was lost before verification. Retry the action.');
      }
      if (!written || revisionIdentity(written.revision) !== revisionIdentity(revision)) {
        throw new Error('Workspace state was replaced before verification. Retry the action.');
      }
      return written;
    }

    async _ensureCanonicalState() {
      const current = await this._readCanonicalState();
      if (current) return current;
      const lock = await this._acquireLock();
      try {
        const existing = await this._readCanonicalState();
        if (existing) return existing;

        const split = await this._readSplitState();
        let state = split;
        let importedWorkspaceId = '';
        if (!state.workspaces.length) {
          const legacy = await this.getValue(LEGACY_SETTINGS_KEY, {});
          if (legacy && legacy.owner && legacy.repo) {
            const imported = this.api.normalizeWorkspace({
              id: LEGACY_IMPORTED_WORKSPACE_ID,
              name: 'Imported workspace',
              owner: legacy.owner,
              repo: legacy.repo,
              branch: legacy.branch || 'main',
              basePath: legacy.basePath || this.api.DEFAULT_WORKSPACE_BASE_PATH
            }, this.now());
            state = this._sanitizeState([imported], {}, imported.id, {});
            importedWorkspaceId = imported.id;
          }
        }
        state = await this._commitState(state, state.revision, lock);

        const existingToken = await this.getValue(SHARED_TOKEN_KEY, '');
        if (!existingToken) {
          const legacyToken = await this.getValue(LEGACY_TOKEN_KEY, '');
          if (legacyToken) await this.setValue(SHARED_TOKEN_KEY, String(legacyToken));
        }
        await this.setValue(MIGRATION_KEY, {
          canonicalStateCreated: true,
          v1Imported: Boolean(importedWorkspaceId),
          importedWorkspaceId,
          migratedAt: this._nowIso(),
          writerId: this.writerId
        });
        return state;
      } finally {
        await this._releaseLock(lock);
      }
    }

    async _mutate(mutator) {
      await this._ensureCanonicalState();
      const lock = await this._acquireLock();
      try {
        const current = await this._readCanonicalState();
        if (!current) throw new Error('Canonical workspace state is unavailable.');
        const outcome = await mutator({
          schemaVersion: 1,
          workspaces: clone(current.workspaces),
          chatWorkspaceMap: clone(current.chatWorkspaceMap),
          defaultWorkspaceId: current.defaultWorkspaceId,
          revision: current.revision
        });
        const nextState = outcome && outcome.state ? outcome.state : current;
        const sanitized = this._sanitizeState(
          nextState.workspaces,
          nextState.chatWorkspaceMap,
          nextState.defaultWorkspaceId,
          current.revision
        );
        const committed = await this._commitState(sanitized, current.revision, lock);
        return { state: committed, value: outcome ? outcome.value : undefined };
      } finally {
        await this._releaseLock(lock);
      }
    }

    async load() {
      const state = await this._ensureCanonicalState();
      return { ...state, hasToken: Boolean(await this.getValue(SHARED_TOKEN_KEY, '')) };
    }

    async upsert(input) {
      const result = await this._mutate((state) => {
        const existing = state.workspaces.find((workspace) => workspace.id === input.id);
        const workspace = this.api.normalizeWorkspace({
          ...input,
          id: existing ? existing.id : input.id,
          createdAt: existing ? existing.createdAt : input.createdAt,
          updatedAt: this._nowIso()
        }, this.now());
        const index = state.workspaces.findIndex((item) => item.id === workspace.id);
        if (index === -1) state.workspaces.push(workspace);
        else state.workspaces[index] = workspace;
        if (!state.defaultWorkspaceId) state.defaultWorkspaceId = workspace.id;
        return { state, value: workspace };
      });
      return { state: result.state, workspace: result.value };
    }

    async bindChat(chatKey, workspaceId) {
      if (!chatKey) return this.load();
      const result = await this._mutate((state) => {
        if (!state.workspaces.some((workspace) => workspace.id === workspaceId)) {
          throw new Error('Cannot bind a chat to a missing workspace.');
        }
        state.chatWorkspaceMap[chatKey] = workspaceId;
        return { state };
      });
      return result.state;
    }

    async setDefault(workspaceId) {
      const result = await this._mutate((state) => {
        if (!state.workspaces.some((workspace) => workspace.id === workspaceId)) {
          throw new Error('Cannot use a missing workspace as default.');
        }
        state.defaultWorkspaceId = workspaceId;
        return { state };
      });
      return result.state;
    }

    async remove(workspaceId) {
      const result = await this._mutate((state) => {
        const before = state.workspaces.length;
        state.workspaces = state.workspaces.filter((workspace) => workspace.id !== workspaceId);
        if (state.workspaces.length === before) throw new Error('Workspace not found.');
        const removedChatKeys = [];
        for (const [chatKey, selected] of Object.entries(state.chatWorkspaceMap)) {
          if (selected === workspaceId) {
            removedChatKeys.push(chatKey);
            delete state.chatWorkspaceMap[chatKey];
          }
        }
        if (state.defaultWorkspaceId === workspaceId) {
          state.defaultWorkspaceId = state.workspaces[0] ? state.workspaces[0].id : '';
        }
        return { state, value: removedChatKeys };
      });
      return { state: result.state, removedChatKeys: result.value };
    }

    async getToken() {
      return String(await this.getValue(SHARED_TOKEN_KEY, '') || '');
    }

    async setToken(token) {
      const value = String(token || '').trim();
      if (!value) throw new Error('Token value is empty.');
      await this.setValue(SHARED_TOKEN_KEY, value);
      return true;
    }

    async clearToken() {
      await this.setValue(SHARED_TOKEN_KEY, '');
      return false;
    }
  }

  return {
    WorkspaceStore,
    STATE_KEY,
    STATE_LOCK_KEY,
    SHARED_TOKEN_KEY,
    MIGRATION_KEY,
    WORKSPACES_KEY,
    CHAT_WORKSPACE_MAP_KEY,
    DEFAULT_WORKSPACE_KEY,
    LEGACY_SETTINGS_KEY,
    LEGACY_TOKEN_KEY,
    LEGACY_IMPORTED_WORKSPACE_ID,
    revisionIdentity
  };
});
