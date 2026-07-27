import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const context = require('../src/workspace-context.js');
globalThis.ObsLinkedNotes = { ...(globalThis.ObsLinkedNotes || {}), ...context };
const storeApi = require('../src/workspace-store.js');

class MemoryGM {
  constructor(initial = {}) { this.values = structuredClone(initial); }
  async get(key, fallback) {
    await Promise.resolve();
    return Object.prototype.hasOwnProperty.call(this.values, key) ? structuredClone(this.values[key]) : structuredClone(fallback);
  }
  async set(key, value) {
    await Promise.resolve();
    this.values[key] = structuredClone(value);
  }
}

function newStore(gm, writerId) {
  return new storeApi.WorkspaceStore({
    api: context,
    getValue: (key, fallback) => gm.get(key, fallback),
    setValue: (key, value) => gm.set(key, value),
    now: () => new Date('2026-07-27T00:00:00.000Z'),
    sleep: async () => { await Promise.resolve(); },
    writerId,
    lockSettleMs: 0,
    lockRetryMs: 0,
    lockTtlMs: 1000,
    maxLockAttempts: 200
  });
}

function makeStore(initial = {}) {
  const gm = new MemoryGM(initial);
  return { gm, store: newStore(gm, 'writer-a') };
}

test('v1 settings and token migrate once into one deterministic imported workspace and one shared token', async () => {
  const { gm, store } = makeStore({
    [storeApi.LEGACY_SETTINGS_KEY]: { owner: 'AlexPastukhh', repo: 'gdoc', branch: 'main', basePath: 'notes' },
    [storeApi.LEGACY_TOKEN_KEY]: 'shared-token'
  });
  const state = await store.load();
  assert.equal(state.workspaces.length, 1);
  assert.equal(state.workspaces[0].id, storeApi.LEGACY_IMPORTED_WORKSPACE_ID);
  assert.equal(state.workspaces[0].name, 'Imported workspace');
  assert.equal(state.workspaces[0].owner, 'AlexPastukhh');
  assert.equal(state.defaultWorkspaceId, state.workspaces[0].id);
  assert.equal(await store.getToken(), 'shared-token');
  assert.equal(gm.values[storeApi.LEGACY_TOKEN_KEY], 'shared-token');
  const again = await store.load();
  assert.equal(again.workspaces.length, 1);
  assert.equal(again.workspaces[0].id, storeApi.LEGACY_IMPORTED_WORKSPACE_ID);
});

test('two simultaneous first loads create one deterministic migrated workspace', async () => {
  const gm = new MemoryGM({
    [storeApi.LEGACY_SETTINGS_KEY]: { owner: 'AlexPastukhh', repo: 'gdoc', branch: 'main', basePath: 'notes' },
    [storeApi.LEGACY_TOKEN_KEY]: 'shared-token'
  });
  const a = newStore(gm, 'writer-a');
  const b = newStore(gm, 'writer-b');
  const [stateA, stateB] = await Promise.all([a.load(), b.load()]);
  assert.equal(stateA.workspaces.length, 1);
  assert.equal(stateB.workspaces.length, 1);
  assert.equal(stateA.workspaces[0].id, storeApi.LEGACY_IMPORTED_WORKSPACE_ID);
  assert.equal(stateB.workspaces[0].id, storeApi.LEGACY_IMPORTED_WORKSPACE_ID);
  assert.equal(gm.values[storeApi.STATE_KEY].workspaces.length, 1);
  assert.equal(gm.values[storeApi.MIGRATION_KEY].v1Imported, true);
});

test('partial v2 workspace state still imports the legacy shared token once', async () => {
  const existing = context.normalizeWorkspace({ name: 'Existing', repositoryInput: 'AlexPastukhh/gdoc', branch: 'main', basePath: 'notes' }, new Date('2026-07-26T00:00:00.000Z'));
  const { gm, store } = makeStore({
    [storeApi.WORKSPACES_KEY]: [existing],
    [storeApi.DEFAULT_WORKSPACE_KEY]: existing.id,
    [storeApi.LEGACY_TOKEN_KEY]: 'legacy-shared-token'
  });
  const state = await store.load();
  assert.equal(state.workspaces.length, 1);
  assert.equal(state.workspaces[0].id, existing.id);
  assert.equal(await store.getToken(), 'legacy-shared-token');
  assert.equal(gm.values[storeApi.MIGRATION_KEY].canonicalStateCreated, true);
  assert.equal(gm.values[storeApi.MIGRATION_KEY].v1Imported, false);
});

test('several workspaces share one token while chats keep independent selections', async () => {
  const { store } = makeStore();
  const first = (await store.upsert({ name: 'GDoc', repositoryInput: 'AlexPastukhh/gdoc', branch: 'main', basePath: 'notes' })).workspace;
  const second = (await store.upsert({ name: 'Planning', repositoryInput: 'AlexPastukhh/obs-planning-docs', branch: 'main', basePath: 'planning/notes' })).workspace;
  await store.setToken('one-token-for-all');
  await store.bindChat('chat:a', first.id);
  await store.bindChat('chat:b', second.id);
  const state = await store.load();
  assert.equal(state.chatWorkspaceMap['chat:a'], first.id);
  assert.equal(state.chatWorkspaceMap['chat:b'], second.id);
  assert.equal(await store.getToken(), 'one-token-for-all');
  assert.ok(state.revision.number >= 4);
});

test('simultaneous bindings from two tabs do not overwrite each other', async () => {
  const gm = new MemoryGM();
  const setup = newStore(gm, 'writer-setup');
  const first = (await setup.upsert({ name: 'GDoc', repositoryInput: 'AlexPastukhh/gdoc', branch: 'main', basePath: 'notes' })).workspace;
  const second = (await setup.upsert({ name: 'Planning', repositoryInput: 'AlexPastukhh/obs-planning-docs', branch: 'main', basePath: 'planning/notes' })).workspace;
  const tabA = newStore(gm, 'writer-tab-a');
  const tabB = newStore(gm, 'writer-tab-b');
  await Promise.all([
    tabA.bindChat('chat:a', first.id),
    tabB.bindChat('chat:b', second.id)
  ]);
  const state = await setup.load();
  assert.equal(state.chatWorkspaceMap['chat:a'], first.id);
  assert.equal(state.chatWorkspaceMap['chat:b'], second.id);
});

test('two concurrent mutations from one tab instance are serialized by distinct lock tokens', async () => {
  const gm = new MemoryGM();
  const store = newStore(gm, 'writer-one-tab');
  const first = (await store.upsert({ name: 'GDoc', repositoryInput: 'AlexPastukhh/gdoc', branch: 'main', basePath: 'notes' })).workspace;
  const second = (await store.upsert({ name: 'Planning', repositoryInput: 'AlexPastukhh/obs-planning-docs', branch: 'main', basePath: 'planning/notes' })).workspace;
  await Promise.all([
    store.bindChat('chat:a', first.id),
    store.bindChat('chat:b', second.id)
  ]);
  const state = await store.load();
  assert.equal(state.chatWorkspaceMap['chat:a'], first.id);
  assert.equal(state.chatWorkspaceMap['chat:b'], second.id);
});

test('a stale tab mutation merges with a workspace created by another tab', async () => {
  const gm = new MemoryGM();
  const setup = newStore(gm, 'writer-setup');
  const first = (await setup.upsert({ name: 'GDoc', repositoryInput: 'AlexPastukhh/gdoc', branch: 'main', basePath: 'notes' })).workspace;
  const tabA = newStore(gm, 'writer-tab-a');
  const tabB = newStore(gm, 'writer-tab-b');
  const [, created] = await Promise.all([
    tabA.bindChat('chat:a', first.id),
    tabB.upsert({ name: 'Planning', repositoryInput: 'AlexPastukhh/obs-planning-docs', branch: 'main', basePath: 'planning/notes' })
  ]);
  const state = await setup.load();
  assert.equal(state.chatWorkspaceMap['chat:a'], first.id);
  assert.ok(state.workspaces.some((workspace) => workspace.id === created.workspace.id));
});

test('deleting a workspace removes only local bindings and chooses a safe default', async () => {
  const { store } = makeStore();
  const first = (await store.upsert({ name: 'GDoc', repositoryInput: 'AlexPastukhh/gdoc', branch: 'main', basePath: 'notes' })).workspace;
  const second = (await store.upsert({ name: 'Planning', repositoryInput: 'AlexPastukhh/obs-planning-docs', branch: 'main', basePath: 'planning/notes' })).workspace;
  await store.setDefault(first.id);
  await store.bindChat('chat:a', first.id);
  await store.bindChat('chat:b', second.id);
  const result = await store.remove(first.id);
  assert.deepEqual(result.removedChatKeys, ['chat:a']);
  assert.equal(result.state.defaultWorkspaceId, second.id);
  assert.equal(result.state.chatWorkspaceMap['chat:b'], second.id);
});
