import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const require = createRequire(import.meta.url);
const here = dirname(fileURLToPath(import.meta.url));
const runtime = require('../src/runtime-responsiveness.js');

function fakeApi() {
  class GitHubClientError extends Error {
    constructor(kind, message, details = {}) {
      super(message);
      this.kind = kind;
      this.details = details;
    }
  }
  return { GitHubClientError };
}

test('abortable GM transport preserves the GitHub response shape', async () => {
  const calls = [];
  const progress = [];
  const transport = runtime.createAbortableGmTransport((details) => {
    calls.push(details);
    queueMicrotask(() => details.onload({ status: 200, responseText: '{"ok":true}', response: null, responseHeaders: 'x-test: yes' }));
    return { abort() {} };
  }, fakeApi());
  transport.setProgressListener((value) => progress.push(value));
  const result = await transport({ method: 'GET', url: 'https://api.github.test/example', headers: { Accept: 'application/json' } });
  assert.equal(calls.length, 1);
  assert.equal(result.status, 200);
  assert.equal(result.text, '{"ok":true}');
  assert.equal(result.headers, 'x-test: yes');
  assert.equal(progress.at(-1).finished, 1);
  assert.equal(progress.at(-1).pending, 0);
});

test('abortAll calls the real GM request abort handle and reports an intentional cancellation', async () => {
  let details;
  let abortCalls = 0;
  const transport = runtime.createAbortableGmTransport((value) => {
    details = value;
    return {
      abort() {
        abortCalls += 1;
        queueMicrotask(() => details.onabort());
      }
    };
  }, fakeApi());
  const pending = transport({ method: 'GET', url: 'https://api.github.test/slow' });
  assert.equal(transport.abortAll(), 1);
  await assert.rejects(pending, (error) => error && error.kind === 'aborted' && /cancelled/i.test(error.message));
  assert.equal(abortCalls, 1);
  await assert.rejects(transport({ method: 'GET', url: 'https://api.github.test/after-cancel' }), (error) => error && error.kind === 'aborted');
});

test('Notes refresh cancellation propagates aborted reads before local reconciliation and clears transient feedback from any active surface', async () => {
  for (const surface of ['notes', 'files', 'categories']) {
    const api = fakeApi();
    let pendingDetails = null;
    let abortCalls = 0;
    let putCalls = 0;

    const transport = runtime.createAbortableGmTransport((details) => {
      pendingDetails = details;
      return {
        abort() {
          abortCalls += 1;
          queueMicrotask(() => details.onabort());
        }
      };
    }, api);

    class FakeLinkedNotesApp {
      constructor() {
        this.api = api;
        this.surface = surface;
        this.feedback = [{ id: 'keep-me', scope: surface, severity: 'info', message: 'Existing feedback' }];
        this.remoteOperation = null;
        this.current = null;
        this.lastUi = {};
        this.store = {
          list: async () => [],
          get: async () => null,
          search: async () => [],
          put: async () => { putCalls += 1; }
        };
        this.client = {
          transport,
          listDirectory: async () => [{ type: 'file', name: 'note.md', path: 'notes/note.md', size: 16 }],
          read: async (path) => {
            await transport({ method: 'GET', url: `https://api.github.test/${path}` });
            return { path, sha: 'remote-sha', content: '# Note', htmlUrl: '' };
          }
        };
      }

      _activeWorkspace() { return { owner: 'owner', repo: 'repo', branch: 'main', basePath: 'notes' }; }
      async _client() { return this.client; }
      _feedbackScope() { return this.surface; }
      _setUi(patch = {}) { this.lastUi = { ...this.lastUi, ...patch }; }
      _feedbackFromError(error, input = {}) {
        const item = { id: input.id || 'last-error', scope: input.scope || this._feedbackScope(), severity: 'error', message: String(error && error.message || error) };
        this.feedback = [...this.feedback.filter((existing) => existing.id !== item.id), item];
        this._setUi({ status: `Error: ${item.message}` });
        return item;
      }
      async _runRemoteOperation(label, work) {
        this.remoteOperation = label;
        this._setUi({ busy: true, status: label });
        try { return await work(); }
        catch (error) {
          this._feedbackFromError(error, { id: `operation-${this._feedbackScope()}`, scope: this._feedbackScope(), title: label });
          throw error;
        }
        finally { this.remoteOperation = null; this._setUi({ busy: false }); }
      }
      refreshRemoteWorkspace() { throw new Error('Runtime patch was not installed.'); }
      refreshCategories() { return Promise.resolve({}); }
      refreshList() { return Promise.resolve(); }
    }

    api.LinkedNotesApp = FakeLinkedNotesApp;
    runtime.installLinkedNotesRuntimeResponsiveness(api);
    const app = new FakeLinkedNotesApp();
    const pending = app.refreshRemoteWorkspace();

    for (let attempt = 0; attempt < 20 && !pendingDetails; attempt += 1) {
      await new Promise((resolve) => setTimeout(resolve, 0));
    }
    assert.ok(pendingDetails, `The Notes refresh should reach a pending GitHub read from ${surface}.`);
    assert.equal(app.cancelReadOnlyOperation(), true);

    const result = await pending;
    assert.deepEqual(result, { cancelled: true });
    assert.equal(abortCalls, 1);
    assert.equal(putCalls, 0, 'Cancelled remote snapshots must not be reconciled into the local Note store.');
    assert.deepEqual(app.feedback.map((item) => item.id), ['keep-me'], `Intentional cancellation from ${surface} must not leave transient operation feedback.`);
    assert.match(String(app.lastUi.status || ''), /cancelled/i);
  }
});

test('category definition cache is reused only for the same path and SHA', () => {
  const definitions = [{ path: 'categories/programming.md', sha: 'abc', htmlUrl: 'https://example', definition: { id: 'programming', name: 'Programming' } }];
  assert.equal(runtime.cachedCategoryDefinition({ path: 'categories/programming.md', sha: 'abc' }, definitions).definition.id, 'programming');
  assert.equal(runtime.cachedCategoryDefinition({ path: 'categories/programming.md', sha: 'changed' }, definitions), null);
  assert.equal(runtime.cachedCategoryDefinition({ path: 'categories/other.md', sha: 'abc' }, definitions), null);
});

test('verified category replacement is path-scoped and preserves unrelated derived state', () => {
  const before = {
    definitions: [
      { path: 'categories/a.md', sha: 'old-a', definition: { id: 'a' } },
      { path: 'categories/b.md', sha: 'b', definition: { id: 'b' } }
    ],
    diagnostics: [{ path: 'categories/a.md', kind: 'old' }, { path: 'categories/b.md', kind: 'keep' }],
    fileValidation: { 'docs/a.md': { status: 'verified' } },
    noteValidation: { 'notes/a.md': { status: 'verified' } },
    groups: { a: 'Core' },
    refreshedAt: 'before'
  };
  const next = runtime.replaceCategoryDefinitionRecord(before, { path: 'categories/a.md', sha: 'new-a', definition: { id: 'a', name: 'A' } });
  assert.deepEqual(next.definitions.map((item) => [item.path, item.sha]), [['categories/a.md', 'new-a'], ['categories/b.md', 'b']]);
  assert.deepEqual(next.diagnostics, [{ path: 'categories/b.md', kind: 'keep' }]);
  assert.deepEqual(next.fileValidation, before.fileValidation);
  assert.deepEqual(next.noteValidation, before.noteValidation);
  assert.deepEqual(next.groups, before.groups);
  assert.equal(before.definitions[0].sha, 'old-a');
});

test('parent validation groups are deterministically bounded', () => {
  const result = runtime.boundedParentValidationGroups([
    { type: 'file', path: 'z/a.md' },
    { type: 'file', path: 'a/one.md' },
    { type: 'note', path: 'a/two.md' },
    { type: 'file', path: 'm/three.md' }
  ], 2);
  assert.deepEqual(result.selected.map(([parent]) => parent), ['a', 'm']);
  assert.deepEqual(result.deferred.map(([parent]) => parent), ['z']);
  assert.equal(result.selected[0][1].length, 2);
  assert.equal(result.totalParents, 3);
});

test('read-operation formatter prefers semantic category progress and otherwise exposes request progress', () => {
  assert.equal(runtime.formatReadOperation({ active: false }), '');
  assert.equal(runtime.formatReadOperation({ active: true, label: 'Reading Notes', network: { started: 7, finished: 5, pending: 2 } }), 'Reading Notes · requests 5/7 · 2 active');
  assert.equal(runtime.formatReadOperation({ active: true, label: 'Reading categories', categoryProgress: { message: 'Categories: definitions 10/30 · cached 8 · fetched 2' } }), 'Categories: definitions 10/30 · cached 8 · fetched 2');
});

test('runtime source wires fast category writes, bounded refresh, real abort, cancel control, close override and Docs activity indicator', async () => {
  const source = await readFile(join(here, '..', 'src', 'runtime-responsiveness.js'), 'utf8');
  assert.match(source, /App\.prototype\.saveCategory\s*=/);
  assert.match(source, /App\.prototype\._refreshCategoriesUnlocked\s*=/);
  assert.match(source, /cachedCategoryDefinition\(/);
  assert.match(source, /CATEGORY_PARENT_VALIDATION_LIMIT\s*=\s*20/);
  assert.match(source, /transport\.abortAll\s*=/);
  assert.match(source, /error\.kind === 'aborted'/);
  assert.match(source, /_lockReadOnlyOperationForLocalApply/);
  assert.match(source, /onCancelReadOnlyOperation/);
  assert.match(source, /\[data-action="close"\]/);
  assert.match(source, /Docs ⟳/);
  assert.doesNotMatch(source, /cancel.*saveVerified|saveVerified.*cancel/i);
});

test('runtime installation re-patches constructors after same-realm userscript re-execution', () => {
  const api = fakeApi();

  class AppFirst {
    async _client() { return {}; }
    refreshCategories() { return Promise.resolve({}); }
  }
  class UiFirst { render() {} }
  const mountFirst = async () => ({ ui: { handlers: {} }, _setUi() {}, cancelReadOnlyOperation() {} });
  api.LinkedNotesApp = AppFirst;
  api.LinkedNotesUI = UiFirst;
  api.mountLinkedNotesPrototype = mountFirst;
  assert.equal(runtime.installLinkedNotesRuntimeResponsiveness(api), true);
  assert.equal(typeof AppFirst.prototype.cancelReadOnlyOperation, 'function');
  assert.equal(UiFirst.prototype.__obsRuntimeResponsivenessPatched, true);
  assert.equal(api.mountLinkedNotesPrototype.__obsRuntimeResponsivenessPatched, true);
  const firstTransportFactory = api.createGmTransport;

  class AppSecond {
    async _client() { return {}; }
    refreshCategories() { return Promise.resolve({}); }
  }
  class UiSecond { render() {} }
  const mountSecond = async () => ({ ui: { handlers: {} }, _setUi() {}, cancelReadOnlyOperation() {} });
  const overwrittenTransportFactory = () => Promise.reject(new Error('unpatched transport'));
  api.LinkedNotesApp = AppSecond;
  api.LinkedNotesUI = UiSecond;
  api.mountLinkedNotesPrototype = mountSecond;
  api.createGmTransport = overwrittenTransportFactory;

  assert.equal(runtime.installLinkedNotesRuntimeResponsiveness(api), true);
  assert.equal(typeof AppSecond.prototype.cancelReadOnlyOperation, 'function');
  assert.equal(UiSecond.prototype.__obsRuntimeResponsivenessPatched, true);
  assert.equal(api.mountLinkedNotesPrototype.__obsRuntimeResponsivenessPatched, true);
  assert.notEqual(api.createGmTransport, overwrittenTransportFactory);
  assert.notEqual(api.createGmTransport, firstTransportFactory);
  assert.equal(runtime.installLinkedNotesRuntimeResponsiveness(api), false, 'Repeated install against the same already-patched constructors should remain idempotent.');
});

test('builder loads runtime responsiveness after app and verification includes its test', async () => {
  const build = await readFile(join(here, '..', 'build-linked-notes.mjs'), 'utf8');
  const verify = await readFile(join(here, '..', 'verify-linked-notes.mjs'), 'utf8');
  const appIndex = build.indexOf("'src/linked-notes-app.js'");
  const runtimeIndex = build.indexOf("'src/runtime-responsiveness.js'");
  assert.ok(appIndex >= 0 && runtimeIndex > appIndex);
  assert.match(verify, /src\/runtime-responsiveness\.js/);
  assert.match(verify, /runtime-responsiveness\.test\.mjs/);
});
