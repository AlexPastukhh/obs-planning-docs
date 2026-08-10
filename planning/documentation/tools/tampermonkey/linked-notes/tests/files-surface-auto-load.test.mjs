import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { LinkedNotesApp } = require('../src/linked-notes-app.js');

class FakeUI {
  constructor() {
    this.last = {};
    this.history = [];
  }

  setState(patch) {
    this.last = { ...this.last, ...patch };
    this.history.push(structuredClone(patch));
  }

  mount() {}
  dispose() {}
}

function createApp(options = {}) {
  const calls = [];
  let attempt = 0;
  const entries = Array.isArray(options.entries) ? options.entries : [
    { type: 'dir', name: 'docs', path: 'docs' }
  ];
  const client = {
    async listDirectory(path) {
      calls.push(path);
      attempt += 1;
      if (options.failFirst && attempt === 1) throw new Error('Temporary repository read failure.');
      return structuredClone(entries);
    }
  };
  const ui = new FakeUI();
  const app = new LinkedNotesApp({
    api: {},
    store: {},
    ui,
    clientFactory: async () => client,
    ...(options.withoutWorkspace ? {} : {
      settings: {
        owner: 'owner-a',
        repo: 'repo-a',
        branch: 'main',
        hasToken: true
      }
    })
  });
  return { app, calls, ui };
}

test('first explicit Files opening loads repository root automatically', async () => {
  const { app, calls } = createApp();
  await app.setSurface('files');
  assert.deepEqual(calls, ['']);
  assert.equal(app.repositoryBrowseLoaded, true);
  assert.equal(app.repositoryPath, '');
  assert.equal(app.repositoryEntries.length, 1);
  assert.equal(app.surface, 'files');
});

test('returning to Files preserves the loaded directory without another root read', async () => {
  const { app, calls } = createApp();
  await app.setSurface('files');
  await app.browseRepository('docs');
  await app.setSurface('notes');
  await app.setSurface('files');
  assert.deepEqual(calls, ['', 'docs']);
  assert.equal(app.repositoryPath, 'docs');
  assert.equal(app.repositoryBrowseLoaded, true);
});

test('an empty repository root is still treated as loaded', async () => {
  const { app, calls } = createApp({ entries: [] });
  await app.setSurface('files');
  await app.setSurface('notes');
  await app.setSurface('files');
  assert.deepEqual(calls, ['']);
  assert.deepEqual(app.repositoryEntries, []);
  assert.equal(app.repositoryBrowseLoaded, true);
});

test('a failed initial read remains retryable on the next explicit Files opening', async () => {
  const { app, calls } = createApp({ failFirst: true });
  await assert.rejects(() => app.setSurface('files'), /Temporary repository read failure/);
  assert.equal(app.repositoryBrowseLoaded, false);
  await app.setSurface('notes');
  await app.setSurface('files');
  assert.deepEqual(calls, ['', '']);
  assert.equal(app.repositoryBrowseLoaded, true);
});

test('workspace-derived context reset requires one new initial root read', async () => {
  const { app, calls } = createApp();
  await app.setSurface('files');
  app._resetWorkspaceDerivedContext();
  assert.equal(app.repositoryBrowseLoaded, false);
  await app.setSurface('files');
  assert.deepEqual(calls, ['', '']);
  assert.equal(app.repositoryBrowseLoaded, true);
});

test('opening Files without a workspace performs no repository request', async () => {
  const { app, calls } = createApp({ withoutWorkspace: true });
  await app.setSurface('files');
  assert.deepEqual(calls, []);
  assert.equal(app.surface, 'files');
  assert.equal(app.repositoryBrowseLoaded, false);
});
