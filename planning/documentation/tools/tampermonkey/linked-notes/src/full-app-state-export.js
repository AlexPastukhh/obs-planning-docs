(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const FULL_APP_STATE_KIND = 'obs-linked-notes-full-app-state';
  const FULL_APP_STATE_SCHEMA_VERSION = 1;
  const APP_GM_KEY_PREFIX = 'obsLinkedNotesPrototype:';
  const EXACT_SECRET_GM_KEYS = new Set([
    'obsLinkedNotesPrototype:v2:githubToken',
    'obsLinkedNotesPrototype:v1:githubToken'
  ]);

  function base64FromBytes(bytes) {
    const view = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes || []);
    if (typeof Buffer !== 'undefined') return Buffer.from(view).toString('base64');
    let binary = '';
    for (let index = 0; index < view.length; index += 1) binary += String.fromCharCode(view[index]);
    if (typeof btoa !== 'function') throw new Error('Base64 encoder is unavailable.');
    return btoa(binary);
  }

  function isDomLike(value) {
    return Boolean(value && typeof value === 'object' && (
      (typeof Node !== 'undefined' && value instanceof Node)
      || (value.nodeType && typeof value.nodeName === 'string')
      || (typeof Window !== 'undefined' && value instanceof Window)
    ));
  }

  function normalizeSnapshotValue(value, options = {}, seen = new WeakMap(), path = '$', diagnostics = null) {
    const mode = options.mode === 'chat' ? 'chat' : 'full';
    if (value == null || typeof value === 'string' || typeof value === 'boolean') return value;
    if (typeof value === 'number') return Number.isFinite(value) ? value : { __type: 'number', value: String(value) };
    if (typeof value === 'bigint') return { __type: 'bigint', value: String(value) };
    if (typeof value === 'undefined') return { __type: 'undefined' };
    if (typeof value === 'function') {
      if (diagnostics) diagnostics.omittedNonSerializable.push({ path, type: 'function' });
      return { __type: 'function', omitted: true, name: String(value.name || '') };
    }
    if (typeof value === 'symbol') {
      if (diagnostics) diagnostics.omittedNonSerializable.push({ path, type: 'symbol' });
      return { __type: 'symbol', omitted: true, value: String(value) };
    }
    if (isDomLike(value)) {
      if (diagnostics) diagnostics.omittedNonSerializable.push({ path, type: 'dom' });
      return { __type: 'dom', omitted: true, nodeName: String(value.nodeName || '') };
    }
    if (value instanceof Date) return { __type: 'Date', value: value.toISOString() };
    if (mode === 'chat' && value && typeof value === 'object' && typeof value.__type === 'string' && value.encoding === 'base64' && typeof value.base64 === 'string' && Number.isFinite(Number(value.byteLength))) {
      return { __type: value.__type, byteLength: Number(value.byteLength), bytesOmittedFromChatCopy: true };
    }
    if (value instanceof Uint8Array) {
      if (mode === 'chat') return { __type: 'Uint8Array', byteLength: value.byteLength, bytesOmittedFromChatCopy: true };
      return { __type: 'Uint8Array', byteLength: value.byteLength, encoding: 'base64', base64: base64FromBytes(value) };
    }
    if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
      if (mode === 'chat') return { __type: 'ArrayBuffer', byteLength: value.byteLength, bytesOmittedFromChatCopy: true };
      return { __type: 'ArrayBuffer', byteLength: value.byteLength, encoding: 'base64', base64: base64FromBytes(new Uint8Array(value)) };
    }
    if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView && ArrayBuffer.isView(value)) {
      const bytes = new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
      if (mode === 'chat') return { __type: value.constructor && value.constructor.name || 'TypedArray', byteLength: value.byteLength, bytesOmittedFromChatCopy: true };
      return { __type: value.constructor && value.constructor.name || 'TypedArray', byteLength: value.byteLength, encoding: 'base64', base64: base64FromBytes(bytes) };
    }
    if (typeof Blob !== 'undefined' && value instanceof Blob) {
      if (diagnostics) diagnostics.omittedNonSerializable.push({ path, type: 'Blob', size: value.size, mimeType: value.type || '' });
      return { __type: 'Blob', size: value.size, mimeType: value.type || '', bytesOmitted: true };
    }
    if (seen.has(value)) return { __type: 'circular', ref: seen.get(value) };
    seen.set(value, path);
    if (value instanceof Map) {
      return {
        __type: 'Map',
        entries: [...value.entries()].map(([key, item], index) => [
          normalizeSnapshotValue(key, options, seen, `${path}.<key:${index}>`, diagnostics),
          normalizeSnapshotValue(item, options, seen, `${path}.<value:${index}>`, diagnostics)
        ])
      };
    }
    if (value instanceof Set) {
      return { __type: 'Set', values: [...value.values()].map((item, index) => normalizeSnapshotValue(item, options, seen, `${path}[${index}]`, diagnostics)) };
    }
    if (Array.isArray(value)) return value.map((item, index) => normalizeSnapshotValue(item, options, seen, `${path}[${index}]`, diagnostics));
    const output = {};
    for (const key of Object.keys(value).sort()) {
      try {
        output[key] = normalizeSnapshotValue(value[key], options, seen, `${path}.${key}`, diagnostics);
      } catch (error) {
        output[key] = { __type: 'unreadable', omitted: true, error: String(error && error.message || error) };
        if (diagnostics) diagnostics.errors.push({ path: `${path}.${key}`, message: String(error && error.message || error) });
      }
    }
    return output;
  }

  function stableJsonStringify(value, space = 2) {
    return JSON.stringify(normalizeSnapshotValue(value, { mode: 'full' }), null, space);
  }

  function isApplicationGmKey(key) {
    return String(key || '').startsWith(APP_GM_KEY_PREFIX);
  }

  function isSecretGmKey(key) {
    const canonical = String(key || '');
    if (EXACT_SECRET_GM_KEYS.has(canonical)) return true;
    const tail = canonical.slice(canonical.lastIndexOf(':') + 1);
    return /^(?:githubToken|apiToken|accessToken|authToken|authenticationToken|password|credential|credentials|secret|clientSecret)$/i.test(tail);
  }

  function redactedSecretDescriptor(value) {
    const present = !(value == null || value === '');
    return {
      __type: 'redacted-secret',
      present,
      redacted: true,
      valueType: value == null ? 'null' : Array.isArray(value) ? 'array' : typeof value
    };
  }

  function redactKnownSecretsInGm(values) {
    const source = values && typeof values === 'object' ? values : {};
    const output = {};
    const redactions = [];
    for (const key of Object.keys(source).sort()) {
      if (isSecretGmKey(key)) {
        output[key] = redactedSecretDescriptor(source[key]);
        redactions.push({ path: `persistent.gm.values.${key}`, kind: 'credential', key });
      } else {
        output[key] = source[key];
      }
    }
    return { values: output, redactions };
  }

  function sanitizeLiveControlRecord(record) {
    const source = record && typeof record === 'object' ? { ...record } : {};
    const hint = `${source.type || ''} ${source.role || ''} ${source.name || ''} ${source.workspaceField || ''} ${source.placeholder || ''}`.toLowerCase();
    const secret = source.type === 'password' || /(?:github[-_ ]?token|auth(?:entication)?|credential|password|secret)/.test(hint);
    if (!secret) return source;
    const value = source.value;
    return { ...source, value: undefined, secret: redactedSecretDescriptor(value) };
  }

  function createFullAppStateEnvelope(input = {}, options = {}) {
    const diagnostics = { errors: [], omittedNonSerializable: [] };
    const gm = redactKnownSecretsInGm(input.gmValues || {});
    const snapshot = {
      kind: FULL_APP_STATE_KIND,
      schemaVersion: FULL_APP_STATE_SCHEMA_VERSION,
      generatedAt: String(input.generatedAt || new Date().toISOString()),
      security: {
        credentials: 'redacted',
        redactions: gm.redactions,
        rawAuthenticationSecretsIncluded: false
      },
      persistent: {
        gm: {
          keyPrefix: APP_GM_KEY_PREFIX,
          keys: Object.keys(gm.values).sort(),
          values: gm.values
        },
        indexedDb: input.indexedDb || {}
      },
      runtime: input.runtime || {},
      diagnostics: {
        ...diagnostics,
        collectorErrors: Array.isArray(input.collectorErrors) ? input.collectorErrors : [],
        notes: Array.isArray(input.diagnosticNotes) ? input.diagnosticNotes : []
      }
    };
    return normalizeSnapshotValue(snapshot, { mode: options.mode === 'chat' ? 'chat' : 'full' }, new WeakMap(), '$', diagnostics);
  }

  function buildChatSafeFullAppState(fullSnapshot) {
    const diagnostics = { errors: [], omittedNonSerializable: [] };
    const output = normalizeSnapshotValue(fullSnapshot, { mode: 'chat' }, new WeakMap(), '$', diagnostics);
    if (output && output.security) output.security.chatCopy = 'Raw binary payloads are omitted; credential values remain redacted.';
    if (output && output.diagnostics) {
      output.diagnostics.chatProjectionErrors = diagnostics.errors;
      output.diagnostics.chatProjectionOmissions = diagnostics.omittedNonSerializable;
    }
    return output;
  }

  function formatFullAppStateForChat(snapshot) {
    return [
      '# OBS Linked Notes Full App State Snapshot',
      '',
      'This is a read-only snapshot of application-owned local state. Authentication secrets are redacted. Raw binary payloads are omitted from this ChatGPT-oriented copy; all other captured state is retained.',
      '',
      '```json',
      JSON.stringify(buildChatSafeFullAppState(snapshot), null, 2),
      '```'
    ].join('\n');
  }

  return {
    FULL_APP_STATE_KIND,
    FULL_APP_STATE_SCHEMA_VERSION,
    APP_GM_KEY_PREFIX,
    EXACT_SECRET_GM_KEYS,
    base64FromBytes,
    normalizeSnapshotValue,
    stableJsonStringify,
    isApplicationGmKey,
    isSecretGmKey,
    redactedSecretDescriptor,
    redactKnownSecretsInGm,
    sanitizeLiveControlRecord,
    createFullAppStateEnvelope,
    buildChatSafeFullAppState,
    formatFullAppStateForChat
  };
});
