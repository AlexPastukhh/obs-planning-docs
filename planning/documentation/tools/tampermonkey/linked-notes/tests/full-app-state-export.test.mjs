import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const state = require('../src/full-app-state-export.js');

test('FULL snapshot includes binary bytes as base64 while chat copy omits only raw bytes', () => {
  const full = state.createFullAppStateEnvelope({ gmValues: {}, indexedDb: { assets: [{ id: 'a', bytes: new Uint8Array([1, 2, 255]) }] }, runtime: {} });
  assert.equal(full.persistent.indexedDb.assets[0].bytes.__type, 'Uint8Array');
  assert.equal(full.persistent.indexedDb.assets[0].bytes.base64, 'AQL/');
  const chat = state.buildChatSafeFullAppState(full);
  assert.equal(chat.persistent.indexedDb.assets[0].bytes.byteLength, 3);
  assert.equal(chat.persistent.indexedDb.assets[0].bytes.bytesOmittedFromChatCopy, true);
  assert.equal('base64' in chat.persistent.indexedDb.assets[0].bytes, false);
});

test('credential GM keys are redacted while lock tokens remain visible', () => {
  const full = state.createFullAppStateEnvelope({ gmValues: {
    'obsLinkedNotesPrototype:v2:githubToken': 'ghp-super-secret',
    'obsLinkedNotesPrototype:v2:stateLock': { token: 'lock-token', owner: 'writer' },
    'obsLinkedNotesPrototype:v9:apiToken': 'future-secret',
    'obsLinkedNotesPrototype:v2:workspaceState': { note: 'the word token is ordinary content' }
  } });
  assert.deepEqual(full.persistent.gm.values['obsLinkedNotesPrototype:v2:githubToken'], { __type: 'redacted-secret', present: true, redacted: true, valueType: 'string' });
  assert.equal(full.persistent.gm.values['obsLinkedNotesPrototype:v2:stateLock'].token, 'lock-token');
  assert.match(full.persistent.gm.values['obsLinkedNotesPrototype:v2:workspaceState'].note, /token/);
  assert.equal(JSON.stringify(full).includes('ghp-super-secret'), false);
});

test('unknown future application-owned GM keys are recognized automatically', () => {
  assert.equal(state.isApplicationGmKey('obsLinkedNotesPrototype:v9:newState:abc'), true);
  assert.equal(state.isApplicationGmKey('anotherUserscript:key'), false);
});

test('live secret controls are redacted while ordinary controls keep exact value', () => {
  const token = state.sanitizeLiveControlRecord({ type: 'password', role: 'shared-token', value: 'secret' });
  const normal = state.sanitizeLiveControlRecord({ type: 'text', role: 'title', value: 'token budget' });
  assert.equal(token.secret.redacted, true);
  assert.equal(token.secret.present, true);
  assert.equal(token.value, undefined);
  assert.equal(normal.value, 'token budget');
});

test('circular and function state is represented instead of throwing', () => {
  const input = { a: 1, fn() {} };
  input.self = input;
  const full = state.createFullAppStateEnvelope({ runtime: input });
  assert.equal(full.runtime.self.__type, 'circular');
  assert.equal(full.runtime.fn.__type, 'function');
});
