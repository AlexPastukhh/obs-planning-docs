import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const api = Object.assign(
  {},
  require('../src/linked-notes-core.js'),
  require('../src/note-markdown-codec.js'),
  require('../src/repository-target.js'),
  require('../src/github-contents-client.js')
);
const appApi = require('../src/linked-notes-app.js');

class MemoryStore {
  constructor(notes = []) { this.map = new Map(notes.map((note) => [note.id, structuredClone(note)])); }
  async put(note) { this.map.set(note.id, structuredClone(note)); return note; }
  async get(id) { return this.map.has(id) ? structuredClone(this.map.get(id)) : null; }
  async delete(id) { this.map.delete(id); }
  async list() { return [...this.map.values()].map((value) => structuredClone(value)); }
  async search() { return this.list(); }
}

class FakeUI {
  constructor() { this.last = {}; this.history = []; }
  setState(patch) { this.last = { ...this.last, ...patch }; this.history.push(structuredClone(patch)); }
  mount() {}
  dispose() {}
}

function verifiedNote(overrides = {}) {
  const local = api.createNote({ id: 'note-a', title: 'A', body: 'Body' }, '2026-01-01T00:00:00.000Z');
  return api.markSavedVerified(local, {
    owner: 'owner-a', repo: 'repo-a', branch: 'branch-a', path: 'prototype-fixtures/linked-notes/a.md',
    sha: 'sha-a', verifiedHash: 'hash-a', htmlUrl: 'https://example.test/a', ...overrides
  }, '2026-01-01T00:01:00.000Z');
}

function makeApp({ note, settings, client, confirmAction = () => true }) {
  const store = new MemoryStore(note ? [note] : []);
  const ui = new FakeUI();
  let clientCalls = 0;
  const app = new appApi.LinkedNotesApp({
    api,
    store,
    ui,
    settings,
    confirmAction,
    clientFactory: async () => { clientCalls += 1; return client; },
    getValue: async () => 'token',
    setValue: async () => {}
  });
  app.current = note || null;
  return { app, store, ui, clientCalls: () => clientCalls };
}

test('regular save blocks repository or branch switch before any network call', async () => {
  const note = verifiedNote();
  const { app, store, clientCalls } = makeApp({
    note,
    settings: { owner: 'owner-b', repo: 'repo-b', branch: 'branch-b', basePath: 'prototype-fixtures/linked-notes', hasToken: true },
    client: {}
  });
  await app.saveRemote(note);
  const saved = await store.get(note.id);
  assert.equal(saved.state, api.NOTE_STATES.CONFLICT);
  assert.match(saved.stateMessage, /Copy to current target/);
  assert.equal(clientCalls(), 0);
});

test('previously verified remote 404 becomes remote_deleted and is not recreated', async () => {
  const note = verifiedNote();
  let writes = 0;
  const client = {
    async read() { const error = new Error('Not Found'); error.kind = 'not_found'; throw error; },
    async saveVerified() { writes += 1; throw new Error('must not write'); }
  };
  const { app, store } = makeApp({
    note,
    settings: { owner: 'owner-a', repo: 'repo-a', branch: 'branch-a', basePath: 'prototype-fixtures/linked-notes', hasToken: true },
    client
  });
  await app.saveRemote(note);
  const saved = await store.get(note.id);
  assert.equal(saved.state, api.NOTE_STATES.REMOTE_DELETED);
  assert.equal(writes, 0);
});

test('new unbound Note does not overwrite an existing configured target', async () => {
  const note = api.createNote({ id: 'note-new', title: 'A', body: 'Body' });
  let writes = 0;
  const client = {
    async read() { return { path: 'prototype-fixtures/linked-notes/a-notenew.md', sha: 'existing' }; },
    async saveVerified() { writes += 1; }
  };
  const { app, store } = makeApp({
    note,
    settings: { owner: 'owner-a', repo: 'repo-a', branch: 'branch-a', basePath: 'prototype-fixtures/linked-notes', hasToken: true },
    client
  });
  await app.saveRemote(note);
  const saved = await store.get(note.id);
  assert.equal(saved.state, api.NOTE_STATES.CONFLICT);
  assert.match(saved.stateMessage, /already exists/);
  assert.equal(writes, 0);
});

test('explicit copy creates only an absent current target and rebinds after verification', async () => {
  const note = verifiedNote();
  let writeArgs = null;
  const client = {
    async read() { const error = new Error('Not Found'); error.kind = 'not_found'; throw error; },
    async saveVerified(args) {
      writeArgs = args;
      return { path: args.path, sha: 'sha-b', verifiedHash: 'hash-b', htmlUrl: 'https://example.test/b', recoveredAfterUnknownWrite: false };
    }
  };
  const { app, store } = makeApp({
    note,
    settings: { owner: 'owner-b', repo: 'repo-b', branch: 'branch-b', basePath: 'copied-notes', hasToken: true },
    client
  });
  await app.copyRemote(note);
  const saved = await store.get(note.id);
  assert.equal(writeArgs.baseSha, '');
  assert.equal(writeArgs.path, 'copied-notes/a.md');
  assert.equal(saved.state, api.NOTE_STATES.SAVED_VERIFIED);
  assert.deepEqual(
    { owner: saved.remote.owner, repo: saved.remote.repo, branch: saved.remote.branch, path: saved.remote.path },
    { owner: 'owner-b', repo: 'repo-b', branch: 'branch-b', path: 'copied-notes/a.md' }
  );
});

test('recheck accepts the current SHA only when exact remote content matches local content', async () => {
  const note = verifiedNote();
  const content = api.encodeNoteMarkdown(note);
  const client = {
    async read() { return { path: note.remote.path, sha: 'sha-current', content, htmlUrl: 'https://example.test/current' }; }
  };
  const { app, store } = makeApp({
    note,
    settings: { owner: 'owner-a', repo: 'repo-a', branch: 'branch-a', basePath: 'prototype-fixtures/linked-notes', hasToken: true },
    client
  });
  await app.recheckRemote(note);
  const saved = await store.get(note.id);
  assert.equal(saved.state, api.NOTE_STATES.SAVED_VERIFIED);
  assert.equal(saved.remote.sha, 'sha-current');
  assert.equal(saved.remote.verifiedHash, await api.sha256Hex(content));
});

test('recheck keeps conflict when remote content differs', async () => {
  const note = verifiedNote();
  const client = {
    async read() { return { path: note.remote.path, sha: 'sha-current', content: 'different', htmlUrl: '' }; }
  };
  const { app, store } = makeApp({
    note,
    settings: { owner: 'owner-a', repo: 'repo-a', branch: 'branch-a', basePath: 'prototype-fixtures/linked-notes', hasToken: true },
    client
  });
  await app.recheckRemote(note);
  assert.equal((await store.get(note.id)).state, api.NOTE_STATES.CONFLICT);
});

test('load remote creates a local backup before replacing conflicting literal content', async () => {
  const note = api.markConflict(api.updateNote(verifiedNote(), { codecExtra: { localOnly: 'backup-me' } }), 'Conflict');
  const remoteNote = api.createNote({
    id: note.id,
    title: 'Remote title',
    body: 'Remote body\n',
    codecExtra: { futureField: 'preserve-me' }
  });
  const remoteContent = api.encodeNoteMarkdown(remoteNote);
  const client = {
    async read() { return { path: note.remote.path, sha: 'sha-remote', content: remoteContent, htmlUrl: 'https://example.test/remote' }; }
  };
  const { app, store } = makeApp({
    note,
    settings: { owner: 'owner-a', repo: 'repo-a', branch: 'branch-a', basePath: 'prototype-fixtures/linked-notes', hasToken: true },
    client
  });
  await app.loadRemote(note);
  const loaded = await store.get(note.id);
  const all = await store.list();
  const backup = all.find((item) => item.id !== note.id);
  assert.equal(loaded.title, 'Remote title');
  assert.equal(loaded.body, 'Remote body\n');
  assert.equal(loaded.remote.sha, 'sha-remote');
  assert.equal(loaded.state, api.NOTE_STATES.SAVED_VERIFIED);
  assert.deepEqual(loaded.codecExtra, { futureField: 'preserve-me' });
  assert.deepEqual(api.decodeNoteMarkdown(api.encodeNoteMarkdown(loaded)).codecExtra, { futureField: 'preserve-me' });
  assert.ok(backup);
  assert.equal(backup.body, 'Body');
  assert.deepEqual(backup.codecExtra, { localOnly: 'backup-me' });
  assert.match(backup.title, /local conflict backup/);
});


test('load remote rejects a codec-imported non-HTTP(S) URL before creating a backup', async () => {
  const note = api.markConflict(verifiedNote(), 'Conflict');
  const maliciousContent = api.encodeNoteMarkdown({
    id: note.id,
    title: 'Remote title',
    body: 'Remote body',
    links: [{ id: 'unsafe', type: 'url', label: 'Unsafe', target: { url: 'javascript:alert(1)' } }]
  });
  const client = {
    async read() { return { path: note.remote.path, sha: 'sha-malicious', content: maliciousContent, htmlUrl: '' }; }
  };
  const { app, store } = makeApp({
    note,
    settings: { owner: 'owner-a', repo: 'repo-a', branch: 'branch-a', basePath: 'prototype-fixtures/linked-notes', hasToken: true },
    client
  });
  await assert.rejects(() => app.loadRemote(note), /portable HTTP\(S\)/);
  const all = await store.list();
  assert.equal(all.length, 1);
  assert.equal(all[0].id, note.id);
  assert.equal(all[0].body, 'Body');
});

test('explicit overwrite reads the latest remote SHA and verifies the replacement', async () => {
  const note = api.markConflict(verifiedNote(), 'Stale SHA');
  let writeArgs;
  const client = {
    async read() { return { path: note.remote.path, sha: 'latest-sha', content: 'other', htmlUrl: '' }; },
    async saveVerified(args) {
      writeArgs = args;
      return { path: args.path, sha: 'result-sha', verifiedHash: 'result-hash', htmlUrl: 'https://example.test/result', recoveredAfterUnknownWrite: false };
    }
  };
  const { app, store } = makeApp({
    note,
    settings: { owner: 'owner-a', repo: 'repo-a', branch: 'branch-a', basePath: 'prototype-fixtures/linked-notes', hasToken: true },
    client
  });
  await app.overwriteRemote(note);
  assert.equal(writeArgs.baseSha, 'latest-sha');
  assert.equal((await store.get(note.id)).remote.sha, 'result-sha');
});

test('explicit overwrite can restore a missing bound target only after confirmation', async () => {
  const note = api.markRemoteDeleted(verifiedNote(), 'Deleted');
  let writeArgs;
  const client = {
    async read() { const error = new Error('Not Found'); error.kind = 'not_found'; throw error; },
    async saveVerified(args) {
      writeArgs = args;
      return { path: args.path, sha: 'restored-sha', verifiedHash: 'restored-hash', htmlUrl: '', recoveredAfterUnknownWrite: false };
    }
  };
  const { app, store } = makeApp({
    note,
    settings: { owner: 'owner-a', repo: 'repo-a', branch: 'branch-a', basePath: 'prototype-fixtures/linked-notes', hasToken: true },
    client,
    confirmAction: () => true
  });
  await app.overwriteRemote(note);
  assert.equal(writeArgs.baseSha, '');
  assert.equal((await store.get(note.id)).state, api.NOTE_STATES.SAVED_VERIFIED);
});

test('remote operation lock rejects a second parallel save before another client call', async () => {
  const note = verifiedNote();
  let release;
  let entered;
  const enteredPromise = new Promise((resolve) => { entered = resolve; });
  const wait = new Promise((resolve) => { release = resolve; });
  const client = {
    async read() { return { path: note.remote.path, sha: note.remote.sha, content: api.encodeNoteMarkdown(note), htmlUrl: '' }; },
    async saveVerified(args) {
      entered();
      await wait;
      return { path: args.path, sha: 'new-sha', verifiedHash: 'new-hash', htmlUrl: '', recoveredAfterUnknownWrite: false };
    }
  };
  const { app, clientCalls } = makeApp({
    note,
    settings: { owner: 'owner-a', repo: 'repo-a', branch: 'branch-a', basePath: 'prototype-fixtures/linked-notes', hasToken: true },
    client
  });
  const first = app.saveRemote(note);
  await enteredPromise;
  await assert.rejects(() => app.saveRemote(note), /already in progress/);
  assert.equal(clientCalls(), 1);
  release();
  await first;
});


test('verification-unknown create stores a recoverable provisional target and recheck completes verification', async () => {
  const note = api.createNote({ id: 'note-new-recovery', title: 'Recovery', body: 'Body' });
  const expected = api.encodeNoteMarkdown(note);
  let phase = 'preflight';
  const client = {
    async read(path) {
      if (phase === 'preflight') {
        const error = new Error('Not Found'); error.kind = 'not_found'; throw error;
      }
      return { path, sha: 'current-sha', content: expected, htmlUrl: 'https://example.test/recovered' };
    },
    async saveVerified(args) {
      phase = 'recheck';
      throw new api.GitHubClientError('verification_unknown', 'read-back unavailable', {
        writeResult: { path: args.path, sha: 'write-response-sha', htmlUrl: 'https://example.test/write' }
      });
    }
  };
  const { app, store } = makeApp({
    note,
    settings: { owner: 'owner-a', repo: 'repo-a', branch: 'branch-a', basePath: 'prototype-fixtures/linked-notes', hasToken: true },
    client
  });
  await assert.rejects(() => app.saveRemote(note), (error) => error.kind === 'verification_unknown');
  const failed = await store.get(note.id);
  assert.equal(failed.state, api.NOTE_STATES.SAVE_FAILED);
  assert.deepEqual(
    { owner: failed.remote.owner, repo: failed.remote.repo, branch: failed.remote.branch, path: failed.remote.path },
    { owner: 'owner-a', repo: 'repo-a', branch: 'branch-a', path: appApi.configuredTargetForNote(note, { owner: 'owner-a', repo: 'repo-a', branch: 'branch-a', basePath: 'prototype-fixtures/linked-notes' }, api.fileSlug).path }
  );
  assert.equal(api.hasCompleteRemoteIdentity(failed.remote), false);
  await app.recheckRemote(failed);
  const recovered = await store.get(note.id);
  assert.equal(recovered.state, api.NOTE_STATES.SAVED_VERIFIED);
  assert.equal(recovered.remote.sha, 'current-sha');
});


test('openLink revalidates an imported URL before window.open', async () => {
  const note = api.createNote({ id: 'note-open-url' });
  const { app } = makeApp({
    note,
    settings: { owner: 'owner-a', repo: 'repo-a', branch: 'branch-a', basePath: 'prototype-fixtures/linked-notes', hasToken: true },
    client: {}
  });
  app.current = {
    ...note,
    links: [{ id: 'unsafe', type: 'url', target: { url: 'javascript:alert(1)' } }]
  };
  const previousWindow = globalThis.window;
  let opened = false;
  globalThis.window = { open() { opened = true; } };
  try {
    await assert.rejects(() => app.openLink('unsafe'), /portable HTTP\(S\)/);
    assert.equal(opened, false);
  } finally {
    if (previousWindow === undefined) delete globalThis.window;
    else globalThis.window = previousWindow;
  }
});

test('Save local preserves recoverable remote uncertainty and provisional identity', async () => {
  const provisional = api.markSaveFailed(api.createNote({
    id: 'note-provisional',
    title: 'Recovery',
    body: 'Body',
    remote: {
      owner: 'owner-a', repo: 'repo-a', branch: 'branch-a',
      path: 'prototype-fixtures/linked-notes/recovery.md', sha: 'write-response-sha'
    }
  }), 'Read-back verification is still unknown.');
  const { app, store, ui } = makeApp({
    note: provisional,
    settings: { owner: 'owner-a', repo: 'repo-a', branch: 'branch-a', basePath: 'prototype-fixtures/linked-notes', hasToken: true },
    client: {}
  });
  const saved = await app.saveLocal({ ...provisional, body: 'Locally edited body' });
  assert.equal(saved.state, api.NOTE_STATES.SAVE_FAILED);
  assert.equal(saved.stateMessage, 'Read-back verification is still unknown.');
  assert.equal(saved.remote.sha, 'write-response-sha');
  assert.equal((await store.get(saved.id)).body, 'Locally edited body');
  assert.equal(ui.last.remoteRecoveryAvailable, true);
});

test('configured target preserves the bound filename when title changes', () => {
  const note = verifiedNote();
  note.title = 'Renamed title';
  const target = appApi.configuredTargetForNote(note, {
    owner: 'owner-a', repo: 'repo-a', branch: 'branch-a', basePath: 'new-base'
  }, api.fileSlug);
  assert.equal(target.path, 'new-base/a.md');
});

test('base path rejects traversal, URL, query and empty segments', () => {
  assert.throws(() => appApi.cleanBasePath('../notes'), /\. or \.\./);
  assert.throws(() => appApi.cleanBasePath('notes//nested'), /empty/);
  assert.throws(() => appApi.cleanBasePath('https://example.test/notes'), /URL/);
  assert.throws(() => appApi.cleanBasePath('notes?ref=x'), /query/);
  assert.equal(appApi.cleanBasePath('notes\\nested'), 'notes/nested');
});
