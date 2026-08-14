import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const exportApi = require('../src/full-app-state-export.js');
globalThis.ObsLinkedNotes = { ...exportApi };
const runtime = require('../src/full-app-state-runtime.js');

test('runtime patches App/UI and copy actions stay local', async () => {
  const previousList = globalThis.GM_listValues;
  globalThis.GM_listValues = () => ['obsLinkedNotesPrototype:v2:workspaceState', 'obsLinkedNotesPrototype:v2:githubToken', 'other:key'];
  const previousIndexedDb = globalThis.indexedDB;
  globalThis.indexedDB = { databases: async () => [], open() { throw new Error('open must not be called when DB is absent'); } };
  try {
    class FakeUI {
      constructor() { this.state = { current: { id: 'n1', body: 'draft' } }; this.open = true; this.handlers = {}; this.shadow = null; }
      render() {}
    }
    class FakeApp {
      constructor() {
        this.api = { ...exportApi };
        this.ui = new FakeUI();
        this.current = { id: 'n1', body: 'draft' };
        this.remoteOperation = null;
        this.writes = [];
        this.clipboard = [];
        this.getValue = async (key) => key.endsWith('githubToken') ? 'secret-token' : { hello: 'world' };
        this.clipboardWriter = async (text) => { this.clipboard.push(text); };
      }
      async start() { return true; }
    }
    runtime.installFullAppStateExport({ LinkedNotesApp: FakeApp, LinkedNotesUI: FakeUI, ...exportApi });
    const app = new FakeApp();
    await app.start();
    const snapshot = await app.buildFullAppStateSnapshot();
    const secondSnapshot = await app.buildFullAppStateSnapshot();
    assert.equal(snapshot.persistent.gm.keys.length, 2);
    assert.equal(Object.prototype.hasOwnProperty.call(secondSnapshot.runtime.app.state, 'fullAppStateSnapshot'), false);
    assert.equal(Object.prototype.hasOwnProperty.call(secondSnapshot.runtime.app.state, 'fullAppStateSnapshotJson'), false);
    assert.equal(JSON.stringify(snapshot).includes('secret-token'), false);
    assert.equal(snapshot.persistent.indexedDb.databases.obsLinkedNotesPrototype.present, false);
    const copied = await app.copyFullAppStateForChat();
    assert.ok(copied.bytes > 0);
    assert.match(app.clipboard[0], /OBS Linked Notes Full App State Snapshot/);
    assert.equal(app.writes.length, 0);
  } finally {
    if (previousList === undefined) delete globalThis.GM_listValues; else globalThis.GM_listValues = previousList;
    if (previousIndexedDb === undefined) delete globalThis.indexedDB; else globalThis.indexedDB = previousIndexedDb;
  }
});

test('IndexedDB dump refuses to create absent databases', async () => {
  let opened = false;
  const indexedDB = { databases: async () => [{ name: 'some-other-db' }], open() { opened = true; throw new Error('must not open'); } };
  const result = await runtime.dumpIndexedDbState(indexedDB);
  assert.equal(opened, false);
  assert.equal(result.databases.obsLinkedNotesPrototype.present, false);
  assert.equal(result.databases.obsLinkedNotesPrototypeAssets.present, false);
});


test('IndexedDB dump includes future application-owned databases without opening unrelated databases', async () => {
  const opened = [];
  const fakeDb = (name) => ({ name, version: 1, objectStoreNames: [], close() {} });
  const indexedDB = {
    databases: async () => [{ name: 'obsLinkedNotesPrototypeFuture' }, { name: 'unrelated-db' }],
    open(name) {
      opened.push(name);
      const request = {};
      queueMicrotask(() => { request.result = fakeDb(name); request.onsuccess(); });
      return request;
    }
  };
  const result = await runtime.dumpIndexedDbState(indexedDB);
  assert.deepEqual(opened, ['obsLinkedNotesPrototypeFuture']);
  assert.equal(result.databases.obsLinkedNotesPrototypeFuture.present, true);
  assert.equal(Object.prototype.hasOwnProperty.call(result.databases, 'unrelated-db'), false);
});
