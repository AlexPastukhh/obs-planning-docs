// ==UserScript==
// @name         OBS Linked Notes Prototype
// @namespace    https://github.com/AlexPastukhh/obs-planning-docs
// @version      0.2.2-prototype
// @description  Local-first linked Markdown Notes with route-safe explicit per-chat context and verified writes.
// @author       OBS planning prototype
// @match        https://chatgpt.com/*
// @match        https://chat.openai.com/*
// @run-at       document-idle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @connect      api.github.com
// ==/UserScript==

/* src/linked-notes-core.js */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const NOTE_STATES = Object.freeze({
    LOCAL_DRAFT: 'local_draft',
    READY: 'ready',
    SAVING: 'saving',
    SAVED_VERIFIED: 'saved_verified',
    CHANGED_AFTER_SAVE: 'changed_after_save',
    CONFLICT: 'conflict',
    REMOTE_DELETED: 'remote_deleted',
    SAVE_FAILED: 'save_failed',
    UNRESOLVED: 'unresolved'
  });

  const LINK_TYPES = Object.freeze({
    REPOSITORY: 'repository',
    NOTE: 'note',
    URL: 'url'
  });

  function nowIso(now) {
    return (now instanceof Date ? now : new Date(now || Date.now())).toISOString();
  }

  function createId(prefix = 'note') {
    const cryptoObject = typeof globalThis !== 'undefined' ? globalThis.crypto : null;
    const value = cryptoObject && typeof cryptoObject.randomUUID === 'function'
      ? cryptoObject.randomUUID()
      : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
    return `${prefix}-${value}`;
  }

  function normalizeString(value) {
    return typeof value === 'string' ? value : '';
  }

  function isPortableHttpUrl(value) {
    try {
      const parsed = new URL(normalizeString(value).trim());
      return (parsed.protocol === 'https:' || parsed.protocol === 'http:') && Boolean(parsed.hostname);
    } catch (error) {
      return false;
    }
  }

  function normalizeCodecExtra(value) {
    return value && typeof value === 'object' && !Array.isArray(value) ? { ...value } : {};
  }

  function portableLink(link) {
    return {
      id: normalizeString(link && link.id).trim(),
      type: normalizeString(link && link.type).trim(),
      label: normalizeString(link && link.label),
      target: link && link.target && typeof link.target === 'object' ? { ...link.target } : {}
    };
  }

  function normalizeLink(link) {
    if (!link || typeof link !== 'object') throw new TypeError('Link must be an object.');
    const type = normalizeString(link.type).trim();
    if (!Object.values(LINK_TYPES).includes(type)) throw new TypeError(`Unsupported link type: ${type || '<empty>'}`);
    const target = link.target && typeof link.target === 'object' ? { ...link.target } : {};
    if (type === LINK_TYPES.REPOSITORY && !normalizeString(target.path).trim()) {
      throw new TypeError('Repository link requires target.path.');
    }
    if (type === LINK_TYPES.NOTE && !normalizeString(target.noteId).trim()) {
      throw new TypeError('Note link requires target.noteId.');
    }
    if (type === LINK_TYPES.URL) {
      const url = normalizeString(target.url).trim();
      if (!isPortableHttpUrl(url)) {
        throw new TypeError('URL link requires a portable HTTP(S) target.url.');
      }
      target.url = url;
    }
    return {
      id: normalizeString(link.id).trim() || createId('link'),
      type,
      label: normalizeString(link.label),
      target,
      resolution: normalizeString(link.resolution).trim() || 'unchecked',
      resolutionMessage: normalizeString(link.resolutionMessage)
    };
  }

  function normalizeRemote(remote) {
    const source = remote && typeof remote === 'object' ? remote : {};
    return {
      owner: normalizeString(source.owner).trim(),
      repo: normalizeString(source.repo).trim(),
      branch: normalizeString(source.branch).trim(),
      path: normalizeString(source.path).trim(),
      sha: normalizeString(source.sha).trim(),
      verifiedHash: normalizeString(source.verifiedHash).trim(),
      verifiedAt: normalizeString(source.verifiedAt),
      htmlUrl: normalizeString(source.htmlUrl)
    };
  }

  function hasAnyRemoteIdentity(remote) {
    const value = normalizeRemote(remote);
    return Boolean(value.owner || value.repo || value.branch || value.path || value.sha || value.verifiedHash || value.verifiedAt || value.htmlUrl);
  }

  function hasRemoteTargetIdentity(remote) {
    const value = normalizeRemote(remote);
    return Boolean(value.owner && value.repo && value.branch && value.path);
  }

  function hasCompleteRemoteIdentity(remote) {
    const value = normalizeRemote(remote);
    return Boolean(hasRemoteTargetIdentity(value) && value.sha && value.verifiedHash);
  }

  function sameRemoteTarget(left, right) {
    const a = normalizeRemote(left);
    const b = normalizeRemote(right);
    return a.owner === b.owner && a.repo === b.repo && a.branch === b.branch && a.path === b.path;
  }

  function normalizeNote(note) {
    if (!note || typeof note !== 'object') throw new TypeError('Note must be an object.');
    const id = normalizeString(note.id).trim();
    if (!id) throw new TypeError('Note id is required.');
    const createdAt = normalizeString(note.createdAt) || nowIso();
    const updatedAt = normalizeString(note.updatedAt) || createdAt;
    const state = normalizeString(note.state) || NOTE_STATES.LOCAL_DRAFT;
    if (!Object.values(NOTE_STATES).includes(state)) throw new TypeError(`Unsupported note state: ${state}`);
    return {
      id,
      title: normalizeString(note.title),
      body: normalizeString(note.body),
      links: Array.isArray(note.links) ? note.links.map(normalizeLink) : [],
      codecExtra: normalizeCodecExtra(note.codecExtra),
      state,
      stateMessage: normalizeString(note.stateMessage),
      createdAt,
      updatedAt,
      remote: normalizeRemote(note.remote),
      schemaVersion: 1
    };
  }

  function createNote(input = {}, now) {
    const timestamp = nowIso(now);
    return normalizeNote({
      id: normalizeString(input.id).trim() || createId('note'),
      title: input.title,
      body: input.body,
      links: input.links,
      codecExtra: input.codecExtra,
      state: input.state || NOTE_STATES.LOCAL_DRAFT,
      stateMessage: input.stateMessage,
      createdAt: input.createdAt || timestamp,
      updatedAt: input.updatedAt || timestamp,
      remote: input.remote
    });
  }

  function withUpdatedState(note, patch, now) {
    const current = normalizeNote(note);
    return normalizeNote({ ...current, ...patch, updatedAt: nowIso(now) });
  }

  function durableLinks(links) {
    return (Array.isArray(links) ? links : []).map((link) => portableLink(normalizeLink(link)));
  }

  function updateNote(note, patch = {}, now) {
    const current = normalizeNote(note);
    const contentChanged = (Object.prototype.hasOwnProperty.call(patch, 'title') && normalizeString(patch.title) !== current.title)
      || (Object.prototype.hasOwnProperty.call(patch, 'body') && normalizeString(patch.body) !== current.body)
      || (Object.prototype.hasOwnProperty.call(patch, 'links') && JSON.stringify(durableLinks(patch.links)) !== JSON.stringify(durableLinks(current.links)));
    let state = patch.state || current.state;
    if (contentChanged && current.state === NOTE_STATES.SAVED_VERIFIED && !patch.state) {
      state = NOTE_STATES.CHANGED_AFTER_SAVE;
    }
    return normalizeNote({
      ...current,
      ...patch,
      state,
      updatedAt: nowIso(now),
      remote: patch.remote ? { ...current.remote, ...patch.remote } : current.remote
    });
  }

  function addLink(note, link, now) {
    const current = normalizeNote(note);
    const normalized = normalizeLink(link);
    if (current.links.some((item) => item.id === normalized.id)) {
      throw new Error(`Duplicate link id: ${normalized.id}`);
    }
    return updateNote(current, { links: [...current.links, normalized] }, now);
  }

  function removeLink(note, linkId, now) {
    const current = normalizeNote(note);
    const nextLinks = current.links.filter((item) => item.id !== linkId);
    if (nextLinks.length === current.links.length) return current;
    return updateNote(current, { links: nextLinks }, now);
  }

  function markSaving(note, message = 'Saving to repository…', now) {
    return withUpdatedState(note, { state: NOTE_STATES.SAVING, stateMessage: message }, now);
  }

  function markSavedVerified(note, result, now) {
    if (!result || !result.owner || !result.repo || !result.branch || !result.path || !result.sha || !result.verifiedHash) {
      throw new TypeError('Verified save result requires owner, repo, branch, path, sha and verifiedHash.');
    }
    const timestamp = nowIso(now);
    return withUpdatedState(note, {
      state: NOTE_STATES.SAVED_VERIFIED,
      stateMessage: 'Remote content verified by read-back.',
      remote: {
        owner: normalizeString(result.owner).trim(),
        repo: normalizeString(result.repo).trim(),
        branch: normalizeString(result.branch).trim(),
        path: normalizeString(result.path).trim(),
        sha: normalizeString(result.sha).trim(),
        verifiedHash: normalizeString(result.verifiedHash).trim(),
        verifiedAt: timestamp,
        htmlUrl: normalizeString(result.htmlUrl)
      }
    }, timestamp);
  }

  function markConflict(note, message, now) {
    return withUpdatedState(note, {
      state: NOTE_STATES.CONFLICT,
      stateMessage: normalizeString(message) || 'Remote base changed; reload or reconcile before retry.'
    }, now);
  }

  function markRemoteDeleted(note, message, now) {
    return withUpdatedState(note, {
      state: NOTE_STATES.REMOTE_DELETED,
      stateMessage: normalizeString(message) || 'The previously verified remote target is missing; it will not be recreated automatically.'
    }, now);
  }

  function markSaveFailed(note, message, now) {
    return withUpdatedState(note, {
      state: NOTE_STATES.SAVE_FAILED,
      stateMessage: normalizeString(message) || 'Remote save failed; local content is preserved.'
    }, now);
  }

  function markUnresolved(note, message, now) {
    return withUpdatedState(note, {
      state: NOTE_STATES.UNRESOLVED,
      stateMessage: normalizeString(message) || 'One or more targets are unresolved.'
    }, now);
  }

  function setLinkResolution(note, linkId, resolution, message = '', now) {
    const current = normalizeNote(note);
    const links = current.links.map((item) => item.id === linkId
      ? { ...item, resolution, resolutionMessage: message }
      : item);
    return updateNote(current, { links }, now);
  }

  function fileSlug(title, id) {
    const normalized = normalizeString(title)
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9\u0400-\u04ff]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 48) || 'note';
    const shortId = normalizeString(id).replace(/[^a-zA-Z0-9]/g, '').slice(-10) || 'unknown';
    return `${normalized}-${shortId}.md`;
  }

  return {
    NOTE_STATES,
    LINK_TYPES,
    createId,
    createNote,
    normalizeNote,
    normalizeLink,
    portableLink,
    durableLinks,
    normalizeRemote,
    hasAnyRemoteIdentity,
    hasRemoteTargetIdentity,
    hasCompleteRemoteIdentity,
    sameRemoteTarget,
    updateNote,
    addLink,
    removeLink,
    markSaving,
    markSavedVerified,
    markConflict,
    markRemoteDeleted,
    markSaveFailed,
    markUnresolved,
    setLinkResolution,
    fileSlug
  };
});

/* src/note-markdown-codec.js */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const START = '<!-- obs-linked-note:v1';
  const END = '-->';

  function safeJson(value) {
    return JSON.stringify(value).replace(/--/g, '\\u002d\\u002d');
  }

  function escapeHeading(value) {
    return String(value || '').replace(/\r?\n/g, ' ').trim();
  }

  function metadataFor(note, body) {
    return {
      schemaVersion: 1,
      id: note.id,
      title: note.title || '',
      bodyLength: body.length,
      links: Array.isArray(note.links) ? note.links.map((link) => ({
        id: link.id,
        type: link.type,
        label: link.label || '',
        target: { ...(link.target || {}) }
      })) : [],
      extra: note.codecExtra && typeof note.codecExtra === 'object' ? note.codecExtra : {}
    };
  }

  function visiblePrefix(title) {
    const heading = escapeHeading(title);
    return heading ? `\n# ${heading}\n\n` : '\n';
  }

  function encodeNoteMarkdown(note) {
    if (!note || !note.id) throw new TypeError('Note with stable id is required.');
    const body = typeof note.body === 'string' ? note.body : '';
    const metadata = metadataFor(note, body);
    const marker = `${START} ${safeJson(metadata)} ${END}`;
    const trailer = body.endsWith('\n') ? '' : '\n';
    return `${marker}${visiblePrefix(note.title)}${body}${trailer}`;
  }

  function parseMarker(markdown) {
    const text = String(markdown || '').replace(/^\uFEFF/, '');
    const firstLineEnd = text.indexOf('\n');
    const firstLine = (firstLineEnd === -1 ? text : text.slice(0, firstLineEnd)).trim();
    if (!firstLine.startsWith(START) || !firstLine.endsWith(END)) {
      throw new Error('Missing obs-linked-note:v1 metadata marker.');
    }
    const jsonText = firstLine.slice(START.length, -END.length).trim();
    let metadata;
    try {
      metadata = JSON.parse(jsonText);
    } catch (error) {
      throw new Error(`Invalid linked-note metadata JSON: ${error.message}`);
    }
    if (!metadata || metadata.schemaVersion !== 1 || typeof metadata.id !== 'string' || !metadata.id.trim()) {
      throw new Error('Unsupported or incomplete linked-note metadata.');
    }
    return { metadata, rest: firstLineEnd === -1 ? '' : text.slice(firstLineEnd) };
  }

  function decodeBody(metadata, rest) {
    const prefix = visiblePrefix(typeof metadata.title === 'string' ? metadata.title : '');
    if (!rest.startsWith(prefix)) {
      throw new Error('Linked-note visible title/body prefix does not match metadata.');
    }
    const content = rest.slice(prefix.length);
    if (Number.isInteger(metadata.bodyLength) && metadata.bodyLength >= 0) {
      if (metadata.bodyLength > content.length) {
        throw new Error('Linked-note bodyLength exceeds available content.');
      }
      const body = content.slice(0, metadata.bodyLength);
      const trailer = content.slice(metadata.bodyLength);
      if (trailer !== '' && trailer !== '\n') {
        throw new Error('Unexpected linked-note content after the literal body.');
      }
      return body;
    }
    // Compatibility for the initial v1 prototype files created before bodyLength existed.
    return content.replace(/\n$/, '');
  }

  function decodeNoteMarkdown(markdown) {
    const { metadata, rest } = parseMarker(markdown);
    const title = typeof metadata.title === 'string' ? metadata.title : '';
    return {
      id: metadata.id,
      title,
      body: decodeBody(metadata, rest),
      links: Array.isArray(metadata.links) ? metadata.links.map((link) => ({
        id: String(link.id || ''),
        type: String(link.type || ''),
        label: String(link.label || ''),
        target: link.target && typeof link.target === 'object' ? { ...link.target } : {},
        resolution: 'unchecked',
        resolutionMessage: ''
      })) : [],
      codecExtra: metadata.extra && typeof metadata.extra === 'object' ? { ...metadata.extra } : {},
      schemaVersion: 1
    };
  }

  function isLinkedNoteMarkdown(markdown) {
    try {
      parseMarker(markdown);
      return true;
    } catch (error) {
      return false;
    }
  }

  return {
    LINKED_NOTE_MARKER: START,
    encodeNoteMarkdown,
    decodeNoteMarkdown,
    isLinkedNoteMarkdown
  };
});

/* src/repository-target.js */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  function isPortableUrl(value) {
    try {
      const parsed = new URL(String(value));
      return parsed.protocol === 'https:' || parsed.protocol === 'http:';
    } catch (error) {
      return false;
    }
  }

  function isMachineLocalAbsolutePath(value) {
    const text = String(value || '').trim();
    return /^[a-zA-Z]:[\\/]/.test(text)
      || /^\\\\/.test(text)
      || /^file:\/\//i.test(text)
      || text.startsWith('/');
  }

  function splitTarget(value) {
    const raw = String(value || '').trim();
    if (isPortableUrl(raw)) return { kind: 'url', url: raw };
    const hashIndex = raw.indexOf('#');
    return {
      kind: 'repository',
      path: hashIndex === -1 ? raw : raw.slice(0, hashIndex),
      anchor: hashIndex === -1 ? '' : raw.slice(hashIndex + 1)
    };
  }

  function assertPathSyntax(value, { allowEmpty = false, allowRelativeSegments = false, label = 'Repository path' } = {}) {
    const text = String(value == null ? '' : value).replace(/\\/g, '/').trim();
    if (!text) {
      if (allowEmpty) return '';
      throw new Error(`${label} is required.`);
    }
    if (isMachineLocalAbsolutePath(text)) {
      throw new Error('Machine-local or absolute paths are not portable repository targets.');
    }
    if (isPortableUrl(text) || text.includes('://')) throw new Error(`${label} must not be a URL.`);
    if (/[?#]/.test(text)) throw new Error(`${label} must not contain query or fragment syntax.`);
    if(/[\u0000-\u001f\u007f]/.test(text)) throw new Error(`${label} contains control characters.`);
    const parts = text.split('/');
    if (parts.some((segment) => segment === '')) throw new Error(`${label} contains an empty path segment.`);
    if (!allowRelativeSegments && parts.some((segment) => segment === '.' || segment === '..')) {
      throw new Error(`${label} must not contain . or .. segments.`);
    }
    return text;
  }

  function normalizeCanonicalRepositoryPath(value, label = 'Repository path') {
    return assertPathSyntax(value, { label });
  }

  function normalizeSegments(parts) {
    const result = [];
    for (const segment of parts) {
      if (!segment || segment === '.') continue;
      if (segment === '..') {
        if (!result.length) throw new Error('Repository target escapes the repository root.');
        result.pop();
      } else {
        result.push(segment);
      }
    }
    return result;
  }

  function normalizeRepositoryPath(sourcePath, targetPath) {
    const source = normalizeCanonicalRepositoryPath(sourcePath, 'Source repository path');
    const rawTarget = assertPathSyntax(targetPath, {
      allowEmpty: true,
      allowRelativeSegments: true,
      label: 'Repository target path'
    });
    if (!rawTarget) return source;
    const sourceDir = source.includes('/') ? source.slice(0, source.lastIndexOf('/')) : '';
    const parts = [...(sourceDir ? sourceDir.split('/') : []), ...rawTarget.split('/')];
    const normalized = normalizeSegments(parts).join('/');
    return normalizeCanonicalRepositoryPath(normalized, 'Normalized repository target path');
  }

  function explicitAnchorExists(markdown, anchor) {
    const wanted = String(anchor || '').trim();
    if (!wanted) return true;
    const escaped = wanted.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(`<a\\s+(?:[^>]*?\\s)?id=["']${escaped}["'][^>]*>\\s*</a>`, 'i');
    return pattern.test(String(markdown || ''));
  }

  function normalizeRepositoryTarget(sourcePath, target) {
    if (typeof target !== 'string') {
      const parsed = target && typeof target === 'object' ? target : {};
      if (parsed.kind === 'url' || parsed.type === 'url') {
        if (!isPortableUrl(parsed.url)) throw new Error('Only portable HTTP(S) URLs are accepted.');
        return { type: 'url', url: String(parsed.url) };
      }
      return {
        type: 'repository',
        path: normalizeCanonicalRepositoryPath(parsed.path, 'Repository target path'),
        anchor: String(parsed.anchor || '').trim()
      };
    }
    const parsed = splitTarget(target);
    if (parsed.kind === 'url') return { type: 'url', url: parsed.url };
    return {
      type: 'repository',
      path: normalizeRepositoryPath(sourcePath, parsed.path),
      anchor: String(parsed.anchor || '').trim()
    };
  }

  function resolveRepositoryTarget({ sourcePath = '', target, files }) {
    try {
      const normalized = normalizeRepositoryTarget(sourcePath, target);
      if (normalized.type === 'url') return { status: 'resolved', target: normalized, message: 'Portable URL.' };
      if (!files) return { status: 'unchecked', target: normalized, message: 'Path normalized; content was not supplied.' };
      const has = files instanceof Map
        ? files.has(normalized.path)
        : Object.prototype.hasOwnProperty.call(files, normalized.path);
      if (!has) return { status: 'unresolved', target: normalized, message: `Missing repository file: ${normalized.path}` };
      const content = files instanceof Map ? files.get(normalized.path) : files[normalized.path];
      if (normalized.anchor && !explicitAnchorExists(content, normalized.anchor)) {
        return { status: 'unresolved', target: normalized, message: `Missing explicit anchor: #${normalized.anchor}` };
      }
      return { status: 'resolved', target: normalized, message: 'Repository target resolved.' };
    } catch (error) {
      return { status: 'invalid', target: null, message: error.message };
    }
  }

  function repositoryTargetToString(target) {
    if (!target || typeof target !== 'object') return '';
    if (target.type === 'url') return String(target.url || '');
    return `${String(target.path || '')}${target.anchor ? `#${target.anchor}` : ''}`;
  }

  return {
    isPortableUrl,
    isMachineLocalAbsolutePath,
    splitTarget,
    normalizeCanonicalRepositoryPath,
    normalizeRepositoryPath,
    normalizeRepositoryTarget,
    explicitAnchorExists,
    resolveRepositoryTarget,
    repositoryTargetToString
  };
});

/* src/indexeddb-note-store.js */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  class IndexedDbNoteStore {
    constructor(options = {}) {
      this.dbName = options.dbName || 'obsLinkedNotesPrototype';
      this.storeName = options.storeName || 'notes';
      this.version = 1;
      this.indexedDB = options.indexedDB || (typeof indexedDB !== 'undefined' ? indexedDB : null);
      this._dbPromise = null;
    }

    open() {
      if (!this.indexedDB) return Promise.reject(new Error('IndexedDB is not available.'));
      if (this._dbPromise) return this._dbPromise;
      this._dbPromise = new Promise((resolve, reject) => {
        const request = this.indexedDB.open(this.dbName, this.version);
        request.onerror = () => reject(request.error || new Error('Unable to open IndexedDB.'));
        request.onupgradeneeded = () => {
          const db = request.result;
          let store;
          if (!db.objectStoreNames.contains(this.storeName)) {
            store = db.createObjectStore(this.storeName, { keyPath: 'id' });
          } else {
            store = request.transaction.objectStore(this.storeName);
          }
          if (!store.indexNames.contains('updatedAt')) store.createIndex('updatedAt', 'updatedAt', { unique: false });
          if (!store.indexNames.contains('titleNormalized')) store.createIndex('titleNormalized', 'titleNormalized', { unique: false });
        };
        request.onsuccess = () => {
          const db = request.result;
          db.onversionchange = () => db.close();
          resolve(db);
        };
      });
      return this._dbPromise;
    }

    async _transaction(mode, operation) {
      const db = await this.open();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(this.storeName, mode);
        const store = tx.objectStore(this.storeName);
        let value;
        try {
          value = operation(store, tx);
        } catch (error) {
          reject(error);
          return;
        }
        tx.oncomplete = () => resolve(value);
        tx.onerror = () => reject(tx.error || new Error('IndexedDB transaction failed.'));
        tx.onabort = () => reject(tx.error || new Error('IndexedDB transaction aborted.'));
      });
    }

    async put(note) {
      const record = JSON.parse(JSON.stringify(note));
      record.titleNormalized = String(record.title || '').toLocaleLowerCase();
      await this._transaction('readwrite', (store) => store.put(record));
      return note;
    }

    async get(id) {
      const db = await this.open();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(this.storeName, 'readonly');
        const request = tx.objectStore(this.storeName).get(id);
        request.onsuccess = () => {
          const result = request.result || null;
          if (result) delete result.titleNormalized;
          resolve(result);
        };
        request.onerror = () => reject(request.error || new Error('Unable to read Note.'));
      });
    }

    async delete(id) {
      await this._transaction('readwrite', (store) => store.delete(id));
    }

    async list() {
      const db = await this.open();
      const notes = await new Promise((resolve, reject) => {
        const tx = db.transaction(this.storeName, 'readonly');
        const request = tx.objectStore(this.storeName).getAll();
        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => reject(request.error || new Error('Unable to list Notes.'));
      });
      return notes
        .map((record) => {
          const copy = { ...record };
          delete copy.titleNormalized;
          return copy;
        })
        .sort((a, b) => String(b.updatedAt || '').localeCompare(String(a.updatedAt || '')));
    }

    async search(query) {
      const wanted = String(query || '').trim().toLocaleLowerCase();
      const notes = await this.list();
      if (!wanted) return notes;
      return notes.filter((note) => `${note.title || ''}\n${note.body || ''}`.toLocaleLowerCase().includes(wanted));
    }

    async clear() {
      await this._transaction('readwrite', (store) => store.clear());
    }
  }

  return { IndexedDbNoteStore };
});

/* src/github-contents-client.js */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  class GitHubClientError extends Error {
    constructor(kind, message, details = {}) {
      super(message);
      this.name = 'GitHubClientError';
      this.kind = kind;
      this.status = details.status || 0;
      this.details = details;
    }
  }

  function normalizeGitHubContentPath(value) {
    const text = String(value == null ? '' : value).replace(/\\/g, '/').trim();
    if (!text) throw new TypeError('GitHub content path is required.');
    if (/^[a-zA-Z]:\//.test(text) || text.startsWith('/') || text.startsWith('//') || /^file:\/\//i.test(text)) {
      throw new TypeError('GitHub content path must be repository-relative.');
    }
    if (text.includes('://')) throw new TypeError('GitHub content path must not be a URL.');
    if (/[?#]/.test(text)) throw new TypeError('GitHub content path must not contain query or fragment syntax.');
    if (/[\u0000-\u001f\u007f]/.test(text)) throw new TypeError('GitHub content path contains control characters.');
    const segments = text.split('/');
    if (segments.some((segment) => !segment || segment === '.' || segment === '..')) {
      throw new TypeError('GitHub content path contains an empty, . or .. segment.');
    }
    return segments.join('/');
  }

  function utf8ToBase64(text) {
    const bytes = new TextEncoder().encode(String(text));
    let binary = '';
    const chunk = 0x8000;
    for (let index = 0; index < bytes.length; index += chunk) {
      binary += String.fromCharCode(...bytes.subarray(index, index + chunk));
    }
    if (typeof btoa === 'function') return btoa(binary);
    if (typeof Buffer !== 'undefined') return Buffer.from(bytes).toString('base64');
    throw new Error('No base64 encoder is available.');
  }

  function base64ToUtf8(value) {
    const compact = String(value || '').replace(/\s+/g, '');
    let bytes;
    if (typeof atob === 'function') {
      const binary = atob(compact);
      bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    } else if (typeof Buffer !== 'undefined') {
      bytes = Uint8Array.from(Buffer.from(compact, 'base64'));
    } else {
      throw new Error('No base64 decoder is available.');
    }
    return new TextDecoder().decode(bytes);
  }

  async function sha256Hex(text) {
    const bytes = new TextEncoder().encode(String(text));
    const cryptoObject = typeof globalThis !== 'undefined' ? globalThis.crypto : null;
    if (cryptoObject && cryptoObject.subtle) {
      const digest = await cryptoObject.subtle.digest('SHA-256', bytes);
      return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
    }
    if (typeof require === 'function') {
      return require('node:crypto').createHash('sha256').update(bytes).digest('hex');
    }
    throw new Error('SHA-256 is not available.');
  }

  function statusKind(status) {
    if (status === 401) return 'auth';
    if (status === 403) return 'permission';
    if (status === 404) return 'not_found';
    if (status === 409 || status === 422) return 'conflict';
    if (status >= 500) return 'remote_failure';
    return 'request_failed';
  }

  function parseJson(text) {
    if (!text) return null;
    try {
      return JSON.parse(text);
    } catch (error) {
      throw new GitHubClientError('invalid_response', `GitHub returned invalid JSON: ${error.message}`);
    }
  }

  function createGmTransport(gmRequest) {
    if (typeof gmRequest !== 'function') throw new TypeError('GM_xmlhttpRequest is required.');
    return function transport(request) {
      return new Promise((resolve, reject) => {
        gmRequest({
          method: request.method,
          url: request.url,
          headers: request.headers,
          data: request.body,
          timeout: request.timeoutMs || 20000,
          onload(response) {
            resolve({ status: response.status, text: response.responseText || '', headers: response.responseHeaders || '' });
          },
          ontimeout() {
            reject(new GitHubClientError('network_unknown', 'GitHub request timed out; remote state must be read before retrying.'));
          },
          onerror(error) {
            reject(new GitHubClientError('network_unknown', 'GitHub network request failed; remote state may be unknown.', { cause: error }));
          },
          onabort() {
            reject(new GitHubClientError('network_unknown', 'GitHub request was aborted; remote state may be unknown.'));
          }
        });
      });
    };
  }

  class GitHubContentsClient {
    constructor(options = {}) {
      this.owner = String(options.owner || '').trim();
      this.repo = String(options.repo || '').trim();
      this.branch = String(options.branch || 'main').trim();
      this.token = String(options.token || '').trim();
      this.transport = options.transport;
      this.apiBase = String(options.apiBase || 'https://api.github.com').replace(/\/$/, '');
      if (!this.owner || !this.repo || !this.branch) throw new TypeError('GitHub owner, repo and branch are required.');
      if (typeof this.transport !== 'function') throw new TypeError('GitHub transport is required.');
    }

    _url(path, includeRef = true) {
      const normalized = normalizeGitHubContentPath(path);
      const encodedPath = normalized.split('/').map(encodeURIComponent).join('/');
      const ref = includeRef ? `?ref=${encodeURIComponent(this.branch)}` : '';
      return `${this.apiBase}/repos/${encodeURIComponent(this.owner)}/${encodeURIComponent(this.repo)}/contents/${encodedPath}${ref}`;
    }

    _headers() {
      const headers = {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28'
      };
      if (this.token) headers.Authorization = `Bearer ${this.token}`;
      return headers;
    }

    async _request(method, url, body) {
      let response;
      try {
        response = await this.transport({
          method,
          url,
          headers: { ...this._headers(), ...(body ? { 'Content-Type': 'application/json' } : {}) },
          body: body ? JSON.stringify(body) : undefined,
          timeoutMs: 20000
        });
      } catch (error) {
        if (error instanceof GitHubClientError) throw error;
        throw new GitHubClientError('network_unknown', error && error.message ? error.message : 'GitHub network request failed.', { cause: error });
      }
      const payload = parseJson(response.text);
      if (response.status < 200 || response.status >= 300) {
        const message = payload && payload.message ? payload.message : `GitHub request failed with status ${response.status}.`;
        throw new GitHubClientError(statusKind(response.status), message, { status: response.status, payload });
      }
      return payload;
    }

    async read(path) {
      const normalized = normalizeGitHubContentPath(path);
      const payload = await this._request('GET', this._url(normalized, true));
      if (!payload || payload.type !== 'file' || typeof payload.content !== 'string') {
        throw new GitHubClientError('invalid_response', 'GitHub Contents response is not a file.');
      }
      return {
        path: normalizeGitHubContentPath(payload.path || normalized),
        sha: payload.sha || '',
        content: base64ToUtf8(payload.content),
        htmlUrl: payload.html_url || ''
      };
    }

    async write({ path, content, baseSha = '', message }) {
      const normalized = normalizeGitHubContentPath(path);
      const body = {
        message: String(message || `Update linked Note ${normalized}`),
        content: utf8ToBase64(content),
        branch: this.branch
      };
      if (baseSha) body.sha = baseSha;
      const payload = await this._request('PUT', this._url(normalized, false), body);
      return {
        path: normalizeGitHubContentPath(payload && payload.content ? payload.content.path : normalized),
        sha: payload && payload.content ? payload.content.sha : '',
        htmlUrl: payload && payload.content ? payload.content.html_url || '' : ''
      };
    }

    async saveVerified({ path, content, baseSha = '', message }) {
      const normalized = normalizeGitHubContentPath(path);
      let writeResult;
      try {
        writeResult = await this.write({ path: normalized, content, baseSha, message });
      } catch (error) {
        if (!(error instanceof GitHubClientError) || error.kind !== 'network_unknown') throw error;
        try {
          const afterUnknown = await this.read(normalized);
          if (afterUnknown.content === content) {
            return {
              ...afterUnknown,
              verifiedHash: await sha256Hex(content),
              recoveredAfterUnknownWrite: true
            };
          }
        } catch (readError) {
          // Preserve the original unknown-write boundary.
        }
        throw error;
      }

      let readBack;
      try {
        readBack = await this.read(normalized);
      } catch (error) {
        throw new GitHubClientError('verification_unknown', 'GitHub accepted the write, but read-back verification failed. Recheck the bound remote before retrying.', {
          writeResult,
          cause: error,
          status: error && error.status ? error.status : 0
        });
      }
      if (readBack.content !== content) {
        throw new GitHubClientError('verification_mismatch', 'Remote read-back content does not match the expected Note.', {
          expectedHash: await sha256Hex(content),
          actualHash: await sha256Hex(readBack.content)
        });
      }
      return {
        path: readBack.path || writeResult.path,
        sha: readBack.sha || writeResult.sha,
        htmlUrl: readBack.htmlUrl || writeResult.htmlUrl,
        verifiedHash: await sha256Hex(content),
        recoveredAfterUnknownWrite: false
      };
    }
  }

  return {
    GitHubClientError,
    GitHubContentsClient,
    createGmTransport,
    normalizeGitHubContentPath,
    utf8ToBase64,
    base64ToUtf8,
    sha256Hex,
    statusKind
  };
});

/* src/workspace-context.js */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const DEFAULT_WORKSPACE_BASE_PATH = 'prototype-fixtures/linked-notes';

  function normalizeString(value) {
    return typeof value === 'string' ? value : '';
  }

  function nowIso(now) {
    return (now instanceof Date ? now : new Date(now || Date.now())).toISOString();
  }

  function createWorkspaceId() {
    const cryptoObject = typeof globalThis !== 'undefined' ? globalThis.crypto : null;
    const value = cryptoObject && typeof cryptoObject.randomUUID === 'function'
      ? cryptoObject.randomUUID()
      : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
    return `workspace-${value}`;
  }

  function cleanWorkspaceBasePath(value) {
    const text = normalizeString(value).replace(/\\/g, '/').trim() || DEFAULT_WORKSPACE_BASE_PATH;
    if (/^[a-zA-Z]:\//.test(text) || text.startsWith('/') || text.startsWith('//') || /^file:\/\//i.test(text)) {
      throw new TypeError('GitHub base path must be repository-relative.');
    }
    if (text.includes('://')) throw new TypeError('GitHub base path must not be a URL.');
    if (/[?#]/.test(text)) throw new TypeError('GitHub base path must not contain query or fragment syntax.');
    if (/[\u0000-\u001f\u007f]/.test(text)) throw new TypeError('GitHub base path contains control characters.');
    const parts = text.split('/');
    if (parts.some((segment) => !segment || segment === '.' || segment === '..')) {
      throw new TypeError('GitHub base path contains an empty, . or .. segment.');
    }
    return parts.join('/');
  }

  function validateOwner(owner) {
    const text = normalizeString(owner).trim();
    if (!/^[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})$/.test(text) || text.endsWith('-')) {
      throw new TypeError('GitHub owner must be a user or organization name.');
    }
    return text;
  }

  function validateRepo(repo) {
    const text = normalizeString(repo).trim().replace(/\.git$/i, '');
    if (!text || text.length > 100 || !/^[A-Za-z0-9._-]+$/.test(text)) {
      throw new TypeError('GitHub repository name is invalid.');
    }
    return text;
  }

  function parseGitHubRepositoryInput(value) {
    const raw = normalizeString(value).trim();
    if (!raw) throw new TypeError('Repository is required. Use owner/repository or a GitHub repository URL.');
    let owner = '';
    let repo = '';
    if (/^https?:\/\//i.test(raw)) {
      let parsed;
      try { parsed = new URL(raw); } catch (error) { throw new TypeError('Repository URL is invalid.'); }
      if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') throw new TypeError('Repository URL must use HTTP(S).');
      if (parsed.hostname.toLowerCase() !== 'github.com') throw new TypeError('Only github.com repository URLs are supported.');
      if (parsed.search || parsed.hash) throw new TypeError('Repository URL must not contain query or fragment data.');
      const parts = parsed.pathname.split('/').filter(Boolean);
      if (parts.length !== 2) throw new TypeError('Repository URL must point to one GitHub repository root.');
      [owner, repo] = parts;
    } else {
      const compact = raw.replace(/^github\.com\//i, '').replace(/^\/+|\/+$/g, '');
      const parts = compact.split('/');
      if (parts.length !== 2) throw new TypeError('Repository must use owner/repository format.');
      [owner, repo] = parts;
    }
    return { owner: validateOwner(owner), repo: validateRepo(repo) };
  }

  function normalizeWorkspace(input = {}, now) {
    const repositoryInput = normalizeString(input.repositoryInput || input.repository || '').trim();
    let owner = normalizeString(input.owner).trim();
    let repo = normalizeString(input.repo).trim();
    if (repositoryInput) ({ owner, repo } = parseGitHubRepositoryInput(repositoryInput));
    else {
      owner = validateOwner(owner);
      repo = validateRepo(repo);
    }
    const timestamp = nowIso(now);
    const id = normalizeString(input.id).trim() || createWorkspaceId();
    const createdAt = normalizeString(input.createdAt) || timestamp;
    return {
      id,
      name: normalizeString(input.name).trim() || `${owner}/${repo}`,
      owner,
      repo,
      branch: normalizeString(input.branch).trim() || 'main',
      basePath: cleanWorkspaceBasePath(input.basePath),
      createdAt,
      updatedAt: normalizeString(input.updatedAt) || timestamp,
      schemaVersion: 1
    };
  }

  function workspaceRepositoryLabel(workspace) {
    if (!workspace) return '';
    return `${normalizeString(workspace.owner).trim()}/${normalizeString(workspace.repo).trim()}`;
  }

  function workspaceTargetLabel(workspace) {
    if (!workspace || !workspace.owner || !workspace.repo || !workspace.branch || !workspace.basePath) return '';
    return `${workspace.owner}/${workspace.repo}@${workspace.branch}:${workspace.basePath}`;
  }

  function chatKeyFromLocation(locationLike) {
    const pathname = normalizeString(locationLike && locationLike.pathname).trim();
    if (!pathname) return '';
    const parts = pathname.split('/').filter(Boolean);
    for (let index = parts.length - 2; index >= 0; index -= 1) {
      if (parts[index] === 'c' && parts[index + 1]) {
        try { return `chat:${decodeURIComponent(parts[index + 1])}`; }
        catch (error) { return `chat:${parts[index + 1]}`; }
      }
    }
    return '';
  }

  return {
    DEFAULT_WORKSPACE_BASE_PATH,
    createWorkspaceId,
    cleanWorkspaceBasePath,
    parseGitHubRepositoryInput,
    normalizeWorkspace,
    workspaceRepositoryLabel,
    workspaceTargetLabel,
    chatKeyFromLocation
  };
});

/* src/workspace-store.js */
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

/* src/linked-notes-ui.js */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function launcherRightOffset(width, edge = 18, gap = 10) {
    const measured = Number.isFinite(Number(width)) ? Math.max(0, Number(width)) : 0;
    return Math.ceil(edge + measured + gap);
  }

  function shouldCloseOnEscape(event, state) {
    return Boolean(event && event.key === 'Escape' && state && state.open && !state.busy);
  }

  function blankWorkspaceEditor(defaultBasePath = 'prototype-fixtures/linked-notes') {
    return { id: '', name: '', repositoryInput: '', branch: 'main', basePath: defaultBasePath };
  }

  function mergeWorkspaceEditorPatch(captured, dirty, patch = {}) {
    const nextPatch = { ...patch };
    if (captured && dirty && nextPatch.workspaceEditor && !nextPatch.replaceWorkspaceEditor) {
      nextPatch.workspaceEditor = captured;
    }
    return nextPatch;
  }

  class LinkedNotesUI {
    constructor(handlers = {}) {
      this.handlers = handlers;
      this.state = {
        notes: [],
        current: null,
        search: '',
        status: 'Ready.',
        workspaces: [],
        activeWorkspaceId: '',
        defaultWorkspaceId: '',
        workspaceEditor: blankWorkspaceEditor(),
        workspaceTargetLabel: '',
        chatContextLabel: 'New chat / default workspace',
        hasToken: false,
        remoteTargetMismatch: false,
        remoteTargetLabel: '',
        remoteRecoveryAvailable: false,
        busy: false
      };
      this.host = null;
      this.shadow = null;
      this.open = false;
      this.workspaceManagerOpen = false;
      this.workspaceEditorDirty = false;
      this._draftTimer = null;
      this._onDocumentKeydown = (event) => {
        if (!shouldCloseOnEscape(event, { open: this.open, busy: this.state.busy })) return;
        event.preventDefault();
        event.stopPropagation();
        this.persistAllDraftsNow().then(() => {
          this.open = false;
          this.render();
        }).catch(() => {});
      };
    }

    mount() {
      if (this.host && this.host.isConnected) return;
      this.host = document.createElement('div');
      this.host.id = 'obs-linked-notes-prototype-host';
      this.host.style.all = 'initial';
      document.documentElement.appendChild(this.host);
      this.shadow = this.host.attachShadow({ mode: 'open' });
      document.addEventListener('keydown', this._onDocumentKeydown, true);
      this.render();
    }

    dispose() {
      this.persistAllDraftsNow().catch(() => {});
      document.removeEventListener('keydown', this._onDocumentKeydown, true);
      if (this.host) this.host.remove();
      this.host = null;
      this.shadow = null;
    }

    persistDraftNow() {
      return this._persistDraftNow();
    }

    workspaceDraftState() {
      return {
        editor: { ...(this.state.workspaceEditor || blankWorkspaceEditor()) },
        dirty: Boolean(this.workspaceEditorDirty)
      };
    }

    async persistAllDraftsNow() {
      this._captureWorkspaceIntoState();
      await this._persistDraftNow();
      return this.workspaceDraftState();
    }

    _captureDraftIntoState() {
      const draft = this._draftFromForm();
      if (draft) this.state.current = draft;
      return draft;
    }

    _workspaceFromForm() {
      if (!this.shadow) return this.state.workspaceEditor;
      const value = (name) => {
        const input = this.shadow.querySelector(`[data-workspace-field="${name}"]`);
        return input ? input.value.trim() : '';
      };
      return {
        id: value('id'),
        name: value('name'),
        repositoryInput: value('repositoryInput'),
        branch: value('branch') || 'main',
        basePath: value('basePath') || 'prototype-fixtures/linked-notes'
      };
    }

    _captureWorkspaceIntoState() {
      const editor = this._workspaceFromForm();
      if (editor) this.state.workspaceEditor = editor;
      return editor;
    }

    setState(patch) {
      const captured = this._captureDraftIntoState();
      const capturedWorkspace = this._captureWorkspaceIntoState();
      let nextPatch = { ...patch };
      if (captured && nextPatch.current && nextPatch.current.id === captured.id && !this.state.busy && !nextPatch.replaceCurrent) {
        nextPatch.current = { ...nextPatch.current, title: captured.title, body: captured.body };
      }
      nextPatch = mergeWorkspaceEditorPatch(capturedWorkspace, this.workspaceEditorDirty, nextPatch);
      if (nextPatch.replaceWorkspaceEditor) this.workspaceEditorDirty = false;
      delete nextPatch.replaceCurrent;
      delete nextPatch.replaceWorkspaceEditor;
      this.state = { ...this.state, ...nextPatch };
      this.render();
    }

    _draftFromForm() {
      if (!this.shadow || !this.state.current) return null;
      const title = this.shadow.querySelector('[data-role="title"]');
      const body = this.shadow.querySelector('[data-role="body"]');
      return {
        ...this.state.current,
        title: title ? title.value : this.state.current.title || '',
        body: body ? body.value : this.state.current.body || ''
      };
    }

    async _call(name, ...args) {
      const fn = this.handlers[name];
      if (typeof fn !== 'function') return undefined;
      try {
        return await fn(...args);
      } catch (error) {
        this.setState({ status: `Error: ${error.message || error}` });
        throw error;
      }
    }

    _scheduleDraftPersist() {
      const draft = this._captureDraftIntoState();
      if (!draft) return;
      if (this._draftTimer) clearTimeout(this._draftTimer);
      this._draftTimer = setTimeout(() => {
        this._draftTimer = null;
        this._call('onDraftChange', this.state.current).catch(() => {});
      }, 300);
    }

    async _persistDraftNow() {
      if (this._draftTimer) {
        clearTimeout(this._draftTimer);
        this._draftTimer = null;
      }
      const draft = this._captureDraftIntoState();
      if (draft) await this._call('onDraftChange', draft);
      return draft;
    }

    async _withDraft(name, ...args) {
      await this._persistDraftNow();
      return this._call(name, ...args);
    }

    async _withAllDrafts(name, ...args) {
      await this.persistAllDraftsNow();
      return this._call(name, ...args);
    }

    _positionLauncher() {
      const launcher = this.shadow && this.shadow.querySelector('[data-action="toggle"]');
      if (!launcher) return;
      const apply = () => {
        const width = launcher.getBoundingClientRect ? launcher.getBoundingClientRect().width : launcher.offsetWidth;
        launcher.style.right = `${launcherRightOffset(width)}px`;
      };
      if (typeof requestAnimationFrame === 'function') requestAnimationFrame(apply);
      else apply();
    }

    render() {
      if (!this.shadow) return;
      const current = this.state.current;
      const busy = Boolean(this.state.busy);
      const disabled = busy ? 'disabled' : '';
      const links = current && Array.isArray(current.links) ? current.links : [];
      const activeWorkspace = this.state.workspaces.find((workspace) => workspace.id === this.state.activeWorkspaceId) || null;
      const editor = this.state.workspaceEditor || blankWorkspaceEditor();
      const editorMatchesActive = Boolean(activeWorkspace && editor.id && editor.id === activeWorkspace.id);
      const workspaceOptions = this.state.workspaces.map((workspace) => {
        const suffix = workspace.id === this.state.defaultWorkspaceId ? ' · default' : '';
        return `<option value="${escapeHtml(workspace.id)}" ${workspace.id === this.state.activeWorkspaceId ? 'selected' : ''}>${escapeHtml(workspace.name || `${workspace.owner}/${workspace.repo}`)}${suffix}</option>`;
      }).join('');
      const notesHtml = this.state.notes.map((note) => `
        <button class="note-row ${current && current.id === note.id ? 'active' : ''}" data-note-id="${escapeHtml(note.id)}" ${disabled}>
          <strong>${escapeHtml(note.title || 'Untitled Note')}</strong>
          <span>${escapeHtml(note.state || 'local_draft')}</span>
        </button>`).join('') || '<div class="empty">No Notes yet.</div>';
      const linksHtml = links.map((link) => {
        const target = link.type === 'repository'
          ? `${link.target.path || ''}${link.target.anchor ? `#${link.target.anchor}` : ''}`
          : link.type === 'note' ? link.target.noteId || '' : link.target.url || '';
        return `<div class="link-row">
          <button class="link-open" data-open-link="${escapeHtml(link.id)}" title="Open target" ${disabled}>${escapeHtml(link.label || target || link.type)}</button>
          <span class="link-status ${escapeHtml(link.resolution || 'unchecked')}">${escapeHtml(link.resolution || 'unchecked')}</span>
          <button data-resolve-link="${escapeHtml(link.id)}" ${disabled}>Check</button>
          <button data-remove-link="${escapeHtml(link.id)}" ${disabled}>Remove</button>
          ${link.resolutionMessage ? `<small>${escapeHtml(link.resolutionMessage)}</small>` : ''}
        </div>`;
      }).join('') || '<div class="empty">No links.</div>';
      const remoteInfo = this.state.remoteTargetLabel
        ? `<div class="remote-context ${this.state.remoteTargetMismatch ? 'mismatch' : ''}"><strong>Bound remote:</strong> ${escapeHtml(this.state.remoteTargetLabel)}${this.state.remoteTargetMismatch ? '<br><span>The chat workspace points elsewhere. Regular Save GitHub is blocked.</span>' : ''}</div>`
        : '<div class="remote-context">No verified remote target yet.</div>';
      const recoveryButtons = current && this.state.remoteRecoveryAvailable
        ? `<button data-action="recheck-remote" ${disabled}>Recheck remote</button>
           <button data-action="load-remote" ${disabled}>Load remote</button>
           <button class="danger" data-action="overwrite-remote" ${disabled}>Restore/overwrite bound remote</button>`
        : '';

      this.shadow.innerHTML = `
        <style>
          :host { all: initial; --bg:#111318; --surface:#191c23; --surface-2:#20242d; --surface-3:#292e39; --border:#3b4250; --text:#eef1f6; --muted:#aab2c0; --accent:#8eb4ff; --success:#79d69a; --danger:#ff8d8d; }
          *, *::before, *::after { box-sizing: border-box; }
          button, input, textarea, select { font: 13px/1.35 system-ui, sans-serif; }
          .launcher { position: fixed; right: 102px; bottom: 18px; z-index: 2147483646; border: 1px solid #343a46; border-radius: 999px; padding: 10px 15px; background: #202123; color: #fff; box-shadow: 0 5px 18px rgba(0,0,0,.42); cursor: pointer; }
          .panel { position: fixed; right: 18px; bottom: 66px; z-index: 2147483646; width: min(980px, calc(100vw - 36px)); height: min(760px, calc(100vh - 92px)); display: ${this.open ? 'grid' : 'none'}; grid-template-columns: 260px 1fr; background: var(--bg); color: var(--text); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; box-shadow: 0 14px 42px rgba(0,0,0,.55); font: 13px/1.4 system-ui, sans-serif; color-scheme: dark; }
          .sidebar { display: flex; flex-direction: column; min-width: 0; background: var(--surface); border-right: 1px solid var(--border); }
          .toolbar, .editor-toolbar, .status, .workspace-bar { padding: 10px; border-bottom: 1px solid var(--border); }
          .toolbar { display: grid; grid-template-columns: 1fr auto; gap: 7px; }
          .workspace-bar { display: grid; grid-template-columns: minmax(180px, 260px) 1fr; gap: 8px; align-items: center; background: var(--surface); }
          .workspace-summary { color: var(--muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
          input, textarea, select { width: 100%; border: 1px solid var(--border); border-radius: 6px; padding: 7px; background: var(--surface-2); color: var(--text); }
          input::placeholder, textarea::placeholder { color: #7f8999; }
          button { border: 1px solid var(--border); border-radius: 6px; padding: 6px 9px; background: var(--surface-2); color: var(--text); cursor: pointer; }
          button:hover:not(:disabled) { background: var(--surface-3); }
          button.primary { background: #315b9d; color: #fff; border-color: #4a78bd; }
          button.danger { color: var(--danger); }
          button:disabled, input:disabled, textarea:disabled, select:disabled { opacity: .5; cursor: not-allowed; }
          .notes { overflow: auto; padding: 7px; }
          .note-row { width: 100%; display: flex; flex-direction: column; align-items: flex-start; margin-bottom: 6px; text-align: left; }
          .note-row span { color: var(--muted); font-size: 11px; }
          .note-row.active { outline: 2px solid var(--success); }
          .main { min-width: 0; display: flex; flex-direction: column; }
          .editor-toolbar { display: flex; gap: 7px; flex-wrap: wrap; background: var(--surface); }
          .editor { display: grid; grid-template-rows: auto 1fr auto auto auto; min-height: 0; gap: 8px; padding: 12px; overflow: auto; }
          textarea { min-height: 220px; resize: vertical; font-family: ui-monospace, SFMono-Regular, Consolas, monospace; }
          .links { display: grid; gap: 6px; }
          .link-row { display: grid; grid-template-columns: minmax(0,1fr) auto auto auto; gap: 6px; align-items: center; border: 1px solid var(--border); border-radius: 7px; padding: 6px; background: var(--surface); }
          .link-row small { grid-column: 1 / -1; color: var(--muted); }
          .link-open { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; text-align: left; }
          .link-status { font-size: 11px; padding: 2px 5px; border-radius: 4px; background: var(--surface-3); }
          .link-status.resolved { background: #173d2a; color: #a9efc0; }
          .link-status.unresolved, .link-status.invalid { background: #4a2323; color: #ffc1c1; }
          .add-link { display: grid; grid-template-columns: 120px 1fr 160px auto; gap: 6px; }
          details { border: 1px solid var(--border); border-radius: 7px; padding: 8px; background: var(--surface); }
          summary { cursor: pointer; color: var(--text); }
          .settings-grid { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 8px; margin-top: 9px; }
          .field { display: grid; gap: 4px; color: var(--muted); }
          .field.wide { grid-column: 1 / -1; }
          .workspace-actions, .token-actions { display: flex; gap: 7px; flex-wrap: wrap; align-items: center; }
          .target-preview { grid-column: 1 / -1; border: 1px solid var(--border); border-radius: 6px; padding: 7px; color: var(--muted); word-break: break-word; background: var(--surface-2); }
          .remote-context { border: 1px solid var(--border); border-radius: 7px; padding: 7px; color: var(--muted); word-break: break-word; background: var(--surface); }
          .remote-context.mismatch { border-color: #9b5a5a; background: #351f22; color: #ffb8b8; }
          .status { margin-top: auto; background: var(--surface-2); color: var(--muted); word-break: break-word; }
          .empty { color: var(--muted); padding: 8px; }
          h3 { margin: 0 0 7px; font: 600 15px/1.3 system-ui, sans-serif; }
          .hint { color: var(--muted); font-size: 12px; }
          @media (max-width: 700px) { .panel { grid-template-columns: 1fr; } .sidebar { max-height: 190px; border-right: 0; border-bottom: 1px solid var(--border); } .add-link, .workspace-bar, .settings-grid { grid-template-columns: 1fr; } }
        </style>
        <button class="launcher" data-action="toggle" ${disabled}>Notes</button>
        <section class="panel" aria-label="Linked Notes Prototype" aria-busy="${busy ? 'true' : 'false'}">
          <aside class="sidebar">
            <div class="toolbar"><input data-role="search" placeholder="Search Notes (Enter)" value="${escapeHtml(this.state.search)}" ${disabled}><button data-action="new" ${disabled}>New</button></div>
            <div class="notes">${notesHtml}</div>
            <div class="status">${escapeHtml(this.state.status)}</div>
          </aside>
          <main class="main">
            <div class="workspace-bar">
              <select data-role="workspace-select" ${disabled}>
                ${workspaceOptions || '<option value="">No saved workspace</option>'}
              </select>
              <div class="workspace-summary" title="${escapeHtml(this.state.workspaceTargetLabel)}">${escapeHtml(activeWorkspace ? `${this.state.chatContextLabel} · ${this.state.workspaceTargetLabel}` : 'Create a workspace before remote access.')}</div>
            </div>
            <div class="editor-toolbar">
              <button class="primary" data-action="save-local" ${current && !busy ? '' : 'disabled'}>Save local</button>
              <button class="primary" data-action="save-remote" ${current && activeWorkspace && !busy ? '' : 'disabled'}>Save GitHub</button>
              <button data-action="copy-remote" ${current && activeWorkspace && this.state.remoteTargetMismatch && !busy ? '' : 'disabled'}>Copy to chat workspace</button>
              ${recoveryButtons}
              <button class="danger" data-action="delete" ${current && !busy ? '' : 'disabled'}>Delete local</button>
              <button data-action="close" ${disabled}>Close</button>
            </div>
            <div class="editor">
              ${current ? `
                <input data-role="title" placeholder="Optional title" value="${escapeHtml(current.title || '')}" ${disabled}>
                <textarea data-role="body" placeholder="Markdown Note body" ${disabled}>${escapeHtml(current.body || '')}</textarea>
                ${remoteInfo}
                <section><h3>Links</h3><div class="links">${linksHtml}</div>
                  <div class="add-link">
                    <select data-role="link-type" ${disabled}><option value="repository">Repository path</option><option value="note">Note ID</option><option value="url">Portable URL</option></select>
                    <input data-role="link-target" placeholder="sibling.md, ../root.md or #explicit-anchor" ${disabled}>
                    <input data-role="link-label" placeholder="Optional label" ${disabled}>
                    <button data-action="add-link" ${disabled}>Add link</button>
                  </div>
                </section>` : '<div class="empty">Create or select a Note.</div>'}
              <details data-role="workspace-manager" ${this.workspaceManagerOpen ? 'open' : ''}>
                <summary>Manage GitHub workspaces</summary>
                <p class="hint">A workspace is a reusable repository, branch and Notes folder. The shared token is stored once for all workspaces.</p>
                <div class="settings-grid">
                  <input type="hidden" data-workspace-field="id" value="${escapeHtml(editor.id || '')}">
                  <label class="field"><span>Workspace name</span><input data-workspace-field="name" placeholder="GDoc" value="${escapeHtml(editor.name || '')}" ${disabled}></label>
                  <label class="field"><span>Repository</span><input data-workspace-field="repositoryInput" placeholder="AlexPastukhh/gdoc or https://github.com/AlexPastukhh/gdoc" value="${escapeHtml(editor.repositoryInput || '')}" ${disabled}></label>
                  <label class="field"><span>Branch</span><input data-workspace-field="branch" placeholder="main" value="${escapeHtml(editor.branch || 'main')}" ${disabled}></label>
                  <label class="field"><span>Notes folder</span><input data-workspace-field="basePath" placeholder="prototype-fixtures/linked-notes" value="${escapeHtml(editor.basePath || 'prototype-fixtures/linked-notes')}" ${disabled}></label>
                  <div class="target-preview"><strong>Target:</strong> ${escapeHtml(this.state.workspaceTargetLabel || 'Complete the workspace fields and save.')}</div>
                  <div class="workspace-actions wide">
                    <button data-action="new-workspace" ${disabled}>New workspace</button>
                    <button class="primary" data-action="save-workspace" ${disabled}>Save workspace</button>
                    <button data-action="set-default-workspace" ${editorMatchesActive && activeWorkspace.id !== this.state.defaultWorkspaceId && !busy ? '' : 'disabled'}>Set as default</button>
                    <button class="danger" data-action="delete-workspace" ${editorMatchesActive && !busy ? '' : 'disabled'}>Delete workspace</button>
                  </div>
                  <label class="field wide"><span>Shared fine-grained GitHub token</span><input data-role="shared-token" type="password" placeholder="${this.state.hasToken ? 'Token stored — enter a value only to replace it' : 'Fine-grained token used by all workspaces'}" ${disabled}></label>
                  <div class="token-actions wide">
                    <button data-action="save-token" ${disabled}>Save shared token</button>
                    <button class="danger" data-action="clear-token" ${this.state.hasToken && !busy ? '' : 'disabled'}>Clear shared token</button>
                    <span class="hint">${this.state.hasToken ? 'A shared token is stored privately in Tampermonkey.' : 'No token is stored.'}</span>
                  </div>
                </div>
              </details>
            </div>
          </main>
        </section>`;

      this._positionLauncher();
      const details = this.shadow.querySelector('[data-role="workspace-manager"]');
      if (details) details.ontoggle = () => { this.workspaceManagerOpen = details.open; };
      const title = this.shadow.querySelector('[data-role="title"]');
      const body = this.shadow.querySelector('[data-role="body"]');
      if (title) title.oninput = () => this._scheduleDraftPersist();
      if (body) body.oninput = () => this._scheduleDraftPersist();
      this.shadow.querySelectorAll('[data-workspace-field]').forEach((input) => {
        input.oninput = () => {
          this.workspaceEditorDirty = true;
          this._captureWorkspaceIntoState();
        };
      });

      const toggle = this.shadow.querySelector('[data-action="toggle"]');
      if (toggle) toggle.onclick = async () => {
        await this.persistAllDraftsNow();
        if (!this.open) await this._call('onOpen');
        this.open = !this.open;
        this.render();
      };
      const close = this.shadow.querySelector('[data-action="close"]');
      if (close) close.onclick = async () => {
        await this.persistAllDraftsNow();
        this.open = false;
        this.render();
      };
      const create = this.shadow.querySelector('[data-action="new"]');
      if (create) create.onclick = () => this._withDraft('onNew');
      const search = this.shadow.querySelector('[data-role="search"]');
      if (search) search.onkeydown = (event) => { if (event.key === 'Enter') this._withDraft('onSearch', search.value); };
      this.shadow.querySelectorAll('[data-note-id]').forEach((button) => {
        button.onclick = () => this._withDraft('onSelect', button.dataset.noteId);
      });
      const workspaceSelect = this.shadow.querySelector('[data-role="workspace-select"]');
      if (workspaceSelect) workspaceSelect.onchange = () => this._withAllDrafts('onSelectWorkspace', workspaceSelect.value, this.workspaceDraftState());
      const newWorkspace = this.shadow.querySelector('[data-action="new-workspace"]');
      if (newWorkspace) newWorkspace.onclick = () => this._withAllDrafts('onNewWorkspace', this.workspaceDraftState());
      const saveWorkspace = this.shadow.querySelector('[data-action="save-workspace"]');
      if (saveWorkspace) saveWorkspace.onclick = () => this._withAllDrafts('onSaveWorkspace', this._workspaceFromForm());
      const setDefault = this.shadow.querySelector('[data-action="set-default-workspace"]');
      if (setDefault) setDefault.onclick = () => this._withAllDrafts('onSetDefaultWorkspace', this.state.activeWorkspaceId);
      const deleteWorkspace = this.shadow.querySelector('[data-action="delete-workspace"]');
      if (deleteWorkspace) deleteWorkspace.onclick = () => this._withAllDrafts('onDeleteWorkspace', this.state.activeWorkspaceId);
      const saveToken = this.shadow.querySelector('[data-action="save-token"]');
      if (saveToken) saveToken.onclick = async () => {
        await this.persistAllDraftsNow();
        const token = this.shadow.querySelector('[data-role="shared-token"]');
        return this._call('onSaveToken', token ? token.value : '');
      };
      const clearToken = this.shadow.querySelector('[data-action="clear-token"]');
      if (clearToken) clearToken.onclick = () => this._withAllDrafts('onClearToken');
      const saveLocal = this.shadow.querySelector('[data-action="save-local"]');
      if (saveLocal) saveLocal.onclick = () => this._call('onSaveLocal', this._draftFromForm());
      const saveRemote = this.shadow.querySelector('[data-action="save-remote"]');
      if (saveRemote) saveRemote.onclick = () => this._call('onSaveRemote', this._draftFromForm());
      const copyRemote = this.shadow.querySelector('[data-action="copy-remote"]');
      if (copyRemote) copyRemote.onclick = () => this._call('onCopyRemote', this._draftFromForm());
      const recheckRemote = this.shadow.querySelector('[data-action="recheck-remote"]');
      if (recheckRemote) recheckRemote.onclick = () => this._call('onRecheckRemote', this._draftFromForm());
      const loadRemote = this.shadow.querySelector('[data-action="load-remote"]');
      if (loadRemote) loadRemote.onclick = () => this._call('onLoadRemote', this._draftFromForm());
      const overwriteRemote = this.shadow.querySelector('[data-action="overwrite-remote"]');
      if (overwriteRemote) overwriteRemote.onclick = () => this._call('onOverwriteRemote', this._draftFromForm());
      const remove = this.shadow.querySelector('[data-action="delete"]');
      if (remove) remove.onclick = () => this._call('onDelete', current && current.id);
      const add = this.shadow.querySelector('[data-action="add-link"]');
      if (add) add.onclick = () => {
        const type = this.shadow.querySelector('[data-role="link-type"]').value;
        const target = this.shadow.querySelector('[data-role="link-target"]').value.trim();
        const label = this.shadow.querySelector('[data-role="link-label"]').value;
        this._call('onAddLink', this._draftFromForm(), { type, target, label });
      };
      this.shadow.querySelectorAll('[data-remove-link]').forEach((button) => {
        button.onclick = () => this._call('onRemoveLink', this._draftFromForm(), button.dataset.removeLink);
      });
      this.shadow.querySelectorAll('[data-resolve-link]').forEach((button) => {
        button.onclick = () => this._call('onResolveLink', this._draftFromForm(), button.dataset.resolveLink);
      });
      this.shadow.querySelectorAll('[data-open-link]').forEach((button) => {
        button.onclick = () => this._withDraft('onOpenLink', button.dataset.openLink);
      });
    }
  }

  return {
    LinkedNotesUI,
    escapeHtml,
    launcherRightOffset,
    shouldCloseOnEscape,
    blankWorkspaceEditor,
    mergeWorkspaceEditorPatch
  };
});

/* src/linked-notes-app.js */
(function (root, factory) {
  const api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function (root) {
  'use strict';

  const SETTINGS_KEY = 'obsLinkedNotesPrototype:v1:settings';
  const TOKEN_KEY = 'obsLinkedNotesPrototype:v1:githubToken';
  const DISPOSE_KEY = '__obsLinkedNotesPrototypeDisposeV1';

  async function gmGet(key, fallback) {
    if (typeof GM_getValue !== 'function') return fallback;
    return Promise.resolve(GM_getValue(key, fallback));
  }

  async function gmSet(key, value) {
    if (typeof GM_setValue !== 'function') throw new Error('GM_setValue is not available.');
    await Promise.resolve(GM_setValue(key, value));
  }

  function cleanBasePath(value) {
    const api = root.ObsLinkedNotes || {};
    if (typeof api.cleanWorkspaceBasePath === 'function') return api.cleanWorkspaceBasePath(value);
    const text = String(value == null ? '' : value).replace(/\\/g, '/').trim() || 'prototype-fixtures/linked-notes';
    if (/^[a-zA-Z]:\//.test(text) || text.startsWith('/') || text.startsWith('//') || /^file:\/\//i.test(text)) throw new TypeError('GitHub base path must be repository-relative.');
    if (text.includes('://')) throw new TypeError('GitHub base path must not be a URL.');
    if (/[?#]/.test(text)) throw new TypeError('GitHub base path must not contain query or fragment syntax.');
    const parts = text.split('/');
    if (parts.some((segment) => !segment || segment === '.' || segment === '..')) throw new TypeError('GitHub base path contains an empty, . or .. segment.');
    return parts.join('/');
  }

  function fileNameFromPath(path) {
    const clean = String(path || '').replace(/\\/g, '/').replace(/\/+$/g, '');
    const name = clean.slice(clean.lastIndexOf('/') + 1);
    if (!name || name === '.' || name === '..' || /[/?#\\]/.test(name)) return '';
    return name;
  }

  function encodeGitHubPath(path) {
    return String(path || '').split('/').map(encodeURIComponent).join('/');
  }

  function configuredTargetForNote(note, settings, fileSlug) {
    if (!settings || !settings.owner || !settings.repo) throw new Error('Select or create a GitHub workspace first.');
    const remotePath = note && note.remote ? String(note.remote.path || '') : '';
    const fileName = fileNameFromPath(remotePath) || fileSlug(note.title, note.id);
    return {
      owner: String(settings.owner || '').trim(),
      repo: String(settings.repo || '').trim(),
      branch: String(settings.branch || 'main').trim() || 'main',
      path: `${cleanBasePath(settings.basePath)}/${fileName}`
    };
  }

  function remoteTargetLabel(remote) {
    if (!remote || !remote.owner || !remote.repo || !remote.branch || !remote.path) return '';
    return `${remote.owner}/${remote.repo}@${remote.branch}:${remote.path}`;
  }

  class LinkedNotesApp {
    constructor(options = {}) {
      const api = options.api || root.ObsLinkedNotes || {};
      this.api = api;
      this.getValue = options.getValue || gmGet;
      this.setValue = options.setValue || gmSet;
      this.clientFactory = options.clientFactory || null;
      this.confirmAction = options.confirmAction || ((message) => (typeof window !== 'undefined' && typeof window.confirm === 'function' ? window.confirm(message) : false));
      this.locationProvider = options.locationProvider || (() => (typeof location !== 'undefined' ? location : { pathname: '' }));
      this.setIntervalFn = options.setIntervalFn || ((fn, ms) => setInterval(fn, ms));
      this.clearIntervalFn = options.clearIntervalFn || ((id) => clearInterval(id));
      this.routePollMs = options.routePollMs || 750;
      this.store = options.store || new api.IndexedDbNoteStore();
      this.workspaceStore = options.workspaceStore || (api.WorkspaceStore ? new api.WorkspaceStore({ api, getValue: this.getValue, setValue: this.setValue }) : null);
      this.ui = options.ui || new api.LinkedNotesUI({
        onNew: () => this.newNote(),
        onSelect: (id) => this.selectNote(id),
        onSearch: (query) => this.refreshList(query),
        onDraftChange: (note) => this.saveDraft(note),
        onOpen: () => this.openPanel(),
        onSelectWorkspace: (id, draftState) => this.selectWorkspace(id, draftState),
        onNewWorkspace: (draftState) => this.beginNewWorkspace(draftState),
        onSaveWorkspace: (workspace) => this.saveWorkspace(workspace),
        onDeleteWorkspace: (id) => this.deleteWorkspace(id),
        onSetDefaultWorkspace: (id) => this.setDefaultWorkspace(id),
        onSaveToken: (token) => this.saveSharedToken(token),
        onClearToken: () => this.clearSharedToken(),
        onSaveLocal: (note) => this.saveLocal(note),
        onSaveRemote: (note) => this.saveRemote(note),
        onCopyRemote: (note) => this.copyRemote(note),
        onRecheckRemote: (note) => this.recheckRemote(note),
        onLoadRemote: (note) => this.loadRemote(note),
        onOverwriteRemote: (note) => this.overwriteRemote(note),
        onDelete: (id) => this.deleteNote(id),
        onAddLink: (note, input) => this.addLink(note, input),
        onRemoveLink: (note, linkId) => this.removeLink(note, linkId),
        onResolveLink: (note, linkId) => this.resolveLink(note, linkId),
        onOpenLink: (linkId) => this.openLink(linkId)
      });
      this.current = null;
      this.search = '';
      this.remoteOperation = null;
      this.workspaceState = { workspaces: [], chatWorkspaceMap: {}, defaultWorkspaceId: '', hasToken: false };
      this.activeWorkspaceId = '';
      this.currentChatKey = '';
      this.sessionWorkspaceId = '';
      this.sessionWorkspaceExplicit = false;
      this.routeTimer = null;
      if (options.settings && options.settings.owner && options.settings.repo) {
        const workspace = api.normalizeWorkspace
          ? api.normalizeWorkspace({ id: 'workspace-test', name: 'Test workspace', ...options.settings })
          : { id: 'workspace-test', name: 'Test workspace', ...options.settings };
        this.workspaceState = { workspaces: [workspace], chatWorkspaceMap: {}, defaultWorkspaceId: workspace.id, hasToken: Boolean(options.settings.hasToken) };
        this.activeWorkspaceId = workspace.id;
      }
    }

    _activeWorkspace() {
      return this.workspaceState.workspaces.find((workspace) => workspace.id === this.activeWorkspaceId) || null;
    }

    _configuredTarget(note) {
      return configuredTargetForNote(note, this._activeWorkspace(), this.api.fileSlug);
    }

    _boundTarget(note) {
      const remote = this.api.normalizeRemote(note && note.remote);
      if (!this.api.hasRemoteTargetIdentity(remote)) throw new Error('A repository owner, repository, branch and path are required for this recovery action.');
      return remote;
    }

    _workspaceEditor(workspace) {
      if (!workspace) return { id: '', name: '', repositoryInput: '', branch: 'main', basePath: this.api.DEFAULT_WORKSPACE_BASE_PATH || 'prototype-fixtures/linked-notes' };
      return {
        id: workspace.id,
        name: workspace.name,
        repositoryInput: `${workspace.owner}/${workspace.repo}`,
        branch: workspace.branch,
        basePath: workspace.basePath
      };
    }

    _workspaceUiState() {
      const active = this._activeWorkspace();
      const mapped = this.currentChatKey ? this.workspaceState.chatWorkspaceMap[this.currentChatKey] : '';
      let chatContextLabel = 'New chat / default fallback';
      if (this.currentChatKey && mapped === this.activeWorkspaceId) chatContextLabel = 'Saved for this chat';
      else if (this.currentChatKey) chatContextLabel = 'Using the default workspace; not saved for this chat';
      else if (this.sessionWorkspaceExplicit) chatContextLabel = 'Selected for this new-chat session';
      return {
        workspaces: this.workspaceState.workspaces,
        activeWorkspaceId: this.activeWorkspaceId,
        defaultWorkspaceId: this.workspaceState.defaultWorkspaceId,
        workspaceEditor: this._workspaceEditor(active),
        workspaceTargetLabel: active && this.api.workspaceTargetLabel ? this.api.workspaceTargetLabel(active) : '',
        chatContextLabel,
        hasToken: Boolean(this.workspaceState.hasToken)
      };
    }

    _remoteUiState(note = this.current) {
      if (!note) return { remoteTargetMismatch: false, remoteTargetLabel: '', remoteRecoveryAvailable: false, busy: Boolean(this.remoteOperation) };
      const remote = this.api.normalizeRemote(note.remote);
      const complete = this.api.hasCompleteRemoteIdentity(remote);
      const recoverableTarget = this.api.hasRemoteTargetIdentity(remote);
      const recoverableStates = new Set([this.api.NOTE_STATES.CONFLICT, this.api.NOTE_STATES.REMOTE_DELETED, this.api.NOTE_STATES.SAVE_FAILED]);
      const workspace = this._activeWorkspace();
      let mismatch = false;
      if (complete && workspace) mismatch = !this.api.sameRemoteTarget(remote, configuredTargetForNote(note, workspace, this.api.fileSlug));
      return {
        remoteTargetMismatch: mismatch,
        remoteTargetLabel: remoteTargetLabel(remote),
        remoteRecoveryAvailable: recoverableTarget && recoverableStates.has(note.state),
        busy: Boolean(this.remoteOperation)
      };
    }

    _setUi(patch = {}) {
      this.ui.setState({ ...this._workspaceUiState(), ...this._remoteUiState(), ...patch });
    }

    async _runRemoteOperation(label, work) {
      if (this.remoteOperation) throw new Error(`Remote operation already in progress: ${this.remoteOperation}`);
      this.remoteOperation = label;
      this._setUi({ busy: true, status: label });
      try { return await work(); }
      finally { this.remoteOperation = null; this._setUi({ busy: false }); }
    }

    async _confirm(message) {
      return Boolean(await Promise.resolve(this.confirmAction(message)));
    }

    _readChatKey() {
      return this.api.chatKeyFromLocation ? this.api.chatKeyFromLocation(this.locationProvider()) : '';
    }

    async _chooseWorkspaceForCurrentChat() {
      const state = this.workspaceState;
      const mapped = this.currentChatKey ? state.chatWorkspaceMap[this.currentChatKey] : '';
      const valid = (id) => state.workspaces.some((workspace) => workspace.id === id);
      let selected = valid(mapped) ? mapped : '';
      if (!selected && !this.currentChatKey && this.sessionWorkspaceExplicit && valid(this.sessionWorkspaceId)) selected = this.sessionWorkspaceId;
      if (!selected && valid(state.defaultWorkspaceId)) selected = state.defaultWorkspaceId;
      if (!selected && state.workspaces[0]) selected = state.workspaces[0].id;
      this.activeWorkspaceId = selected || '';
      if (!this.currentChatKey && !this.sessionWorkspaceExplicit) this.sessionWorkspaceId = this.activeWorkspaceId;
    }

    async refreshWorkspaceState(status) {
      if (!this.workspaceStore) return this.workspaceState;
      this.workspaceState = await this.workspaceStore.load();
      await this._chooseWorkspaceForCurrentChat();
      this._setUi({ status: status || 'Workspace state refreshed from Tampermonkey storage.' });
      return this.workspaceState;
    }

    async openPanel() {
      await this.refreshWorkspaceState('Workspace state refreshed when Notes opened.');
    }

    async _confirmWorkspaceDraftReset(draftState) {
      if (!draftState || !draftState.dirty) return true;
      return this._confirm('Discard unsaved changes in the workspace form?');
    }

    async beginNewWorkspace(draftState) {
      if (!await this._confirmWorkspaceDraftReset(draftState)) {
        this._setUi({ status: 'New workspace cancelled; the unsaved workspace form was preserved.' });
        return false;
      }
      this._setUi({
        workspaceEditor: this._workspaceEditor(null),
        workspaceTargetLabel: '',
        replaceWorkspaceEditor: true,
        status: 'New workspace form ready.'
      });
      return true;
    }

    async _checkRouteChange() {
      const nextChatKey = this._readChatKey();
      if (nextChatKey === this.currentChatKey || this.remoteOperation) return;
      if (this.ui && typeof this.ui.persistAllDraftsNow === 'function') await this.ui.persistAllDraftsNow();
      else if (this.ui && typeof this.ui.persistDraftNow === 'function') await this.ui.persistDraftNow();
      this.currentChatKey = nextChatKey;
      this.sessionWorkspaceId = '';
      this.sessionWorkspaceExplicit = false;
      if (this.workspaceStore) this.workspaceState = await this.workspaceStore.load();
      await this._chooseWorkspaceForCurrentChat();
      const mappedWorkspaceId = this.currentChatKey ? this.workspaceState.chatWorkspaceMap[this.currentChatKey] : '';
      const status = !this.currentChatKey
        ? 'New chat uses the default workspace until an explicit selection is made.'
        : mappedWorkspaceId
          ? 'Saved chat workspace restored.'
          : 'This chat is not linked to a workspace. The default is active until you select a workspace explicitly.';
      this._setUi({ status });
    }

    _startRouteWatch() {
      if (this.routeTimer || typeof this.setIntervalFn !== 'function') return;
      this.routeTimer = this.setIntervalFn(() => { this._checkRouteChange().catch((error) => this._setUi({ status: `Route context error: ${error.message || error}` })); }, this.routePollMs);
    }

    async start() {
      if (this.workspaceStore) this.workspaceState = await this.workspaceStore.load();
      this.currentChatKey = this._readChatKey();
      await this._chooseWorkspaceForCurrentChat();
      this.ui.mount();
      await this.refreshList('');
      this._setUi({ replaceWorkspaceEditor: true, status: this._activeWorkspace() ? 'Local Notes ready. Workspace fallback is not saved to a chat until you select it explicitly.' : 'Local Notes ready. Create a GitHub workspace before remote access.' });
      this._startRouteWatch();
    }

    dispose() {
      if (this.routeTimer) this.clearIntervalFn(this.routeTimer);
      this.routeTimer = null;
      if (this.ui) this.ui.dispose();
    }

    async selectWorkspace(workspaceId, draftState) {
      await this.refreshWorkspaceState();
      if (!this.workspaceState.workspaces.some((workspace) => workspace.id === workspaceId)) throw new Error('Workspace not found.');
      if (!await this._confirmWorkspaceDraftReset(draftState)) {
        this._setUi({ status: 'Workspace switch cancelled; the unsaved workspace form was preserved.' });
        return this._activeWorkspace();
      }
      this.activeWorkspaceId = workspaceId;
      this.sessionWorkspaceId = workspaceId;
      this.sessionWorkspaceExplicit = !this.currentChatKey;
      if (this.currentChatKey && this.workspaceStore) {
        this.workspaceState = { ...(await this.workspaceStore.bindChat(this.currentChatKey, workspaceId)), hasToken: this.workspaceState.hasToken };
      }
      this._setUi({ replaceWorkspaceEditor: true, status: this.currentChatKey ? 'Workspace selected and saved for this chat.' : 'Workspace selected for this new-chat session.' });
      return this._activeWorkspace();
    }

    async saveWorkspace(input) {
      if (!this.workspaceStore) throw new Error('Workspace storage is not available.');
      const result = await this.workspaceStore.upsert(input);
      this.workspaceState = { ...result.state, hasToken: this.workspaceState.hasToken };
      this.activeWorkspaceId = result.workspace.id;
      this.sessionWorkspaceId = result.workspace.id;
      this.sessionWorkspaceExplicit = !this.currentChatKey;
      if (this.currentChatKey) {
        this.workspaceState = { ...(await this.workspaceStore.bindChat(this.currentChatKey, result.workspace.id)), hasToken: this.workspaceState.hasToken };
      }
      this._setUi({ replaceWorkspaceEditor: true, status: `Workspace saved: ${result.workspace.name}.` });
      return result.workspace;
    }

    async setDefaultWorkspace(workspaceId) {
      if (!this.workspaceStore) throw new Error('Workspace storage is not available.');
      this.workspaceState = { ...(await this.workspaceStore.setDefault(workspaceId)), hasToken: this.workspaceState.hasToken };
      this._setUi({ status: 'Default workspace updated.' });
    }

    async deleteWorkspace(workspaceId) {
      if (!workspaceId || !this.workspaceStore) throw new Error('Workspace not found.');
      const workspace = this.workspaceState.workspaces.find((item) => item.id === workspaceId);
      const confirmed = await this._confirm(`Delete the local workspace ${workspace ? workspace.name : workspaceId}? Notes and remote repository files will not be deleted.`);
      if (!confirmed) { this._setUi({ status: 'Workspace deletion cancelled.' }); return; }
      const result = await this.workspaceStore.remove(workspaceId);
      this.workspaceState = { ...result.state, hasToken: this.workspaceState.hasToken };
      if (this.sessionWorkspaceId === workspaceId) {
        this.sessionWorkspaceId = '';
        this.sessionWorkspaceExplicit = false;
      }
      await this._chooseWorkspaceForCurrentChat();
      this._setUi({ replaceWorkspaceEditor: true, status: `Workspace deleted locally. ${result.removedChatKeys.length} chat binding(s) fell back safely; Notes and remote files were untouched.` });
    }

    async saveSharedToken(token) {
      if (!this.workspaceStore) throw new Error('Workspace storage is not available.');
      await this.workspaceStore.setToken(token);
      this.workspaceState.hasToken = true;
      this._setUi({ status: 'Shared GitHub token stored privately for all workspaces.' });
    }

    async clearSharedToken() {
      if (!this.workspaceStore) throw new Error('Workspace storage is not available.');
      const confirmed = await this._confirm('Clear the shared GitHub token from Tampermonkey storage?');
      if (!confirmed) { this._setUi({ status: 'Token clear cancelled.' }); return; }
      await this.workspaceStore.clearToken();
      this.workspaceState.hasToken = false;
      this._setUi({ status: 'Shared GitHub token cleared.' });
    }

    async refreshList(query = this.search) {
      this.search = String(query || '');
      const notes = await this.store.search(this.search);
      if (this.current) {
        const refreshed = notes.find((item) => item.id === this.current.id) || await this.store.get(this.current.id);
        if (refreshed) this.current = this.api.normalizeNote(refreshed);
      }
      this._setUi({ notes, current: this.current, search: this.search });
    }

    async saveDraft(note) {
      if (!note) return null;
      const next = this.api.updateNote(this.api.normalizeNote(note), {
        title: note.title,
        body: note.body,
        links: note.links
      });
      await this.store.put(next);
      this.current = next;
      return next;
    }

    async newNote() {
      const note = this.api.createNote();
      await this.store.put(note);
      this.current = note;
      await this.refreshList();
      this._setUi({ status: 'New local Note created.' });
    }

    async selectNote(id) {
      const note = await this.store.get(id);
      if (!note) throw new Error(`Note not found: ${id}`);
      this.current = this.api.normalizeNote(note);
      this._setUi({ current: this.current, status: `Opened ${this.current.title || 'Untitled Note'}.` });
    }

    async saveLocal(note) {
      if (!note) throw new Error('No Note is selected.');
      let next = await this.saveDraft(note);
      if (next.state === this.api.NOTE_STATES.LOCAL_DRAFT) {
        next = this.api.updateNote(next, { state: this.api.NOTE_STATES.READY, stateMessage: 'Saved locally.' });
        await this.store.put(next);
        this.current = next;
      }
      await this.refreshList();
      this._setUi({ status: 'Local Note saved in IndexedDB.' });
      return next;
    }

    _sourcePath(note) {
      const remote = this.api.normalizeRemote(note && note.remote);
      return remote.path || this._configuredTarget(note).path;
    }

    _repositoryContext(note) {
      const remote = this.api.normalizeRemote(note && note.remote);
      if (this.api.hasCompleteRemoteIdentity(remote)) {
        return { owner: remote.owner, repo: remote.repo, branch: remote.branch };
      }
      const workspace = this._activeWorkspace();
      return workspace ? { owner: workspace.owner, repo: workspace.repo, branch: workspace.branch } : { owner: '', repo: '', branch: '' };
    }

    async addLink(note, input) {
      if (!note) throw new Error('No Note is selected.');
      const value = String(input.target || '').trim();
      if (!value) throw new Error('Link target is required.');
      let link;
      if (input.type === this.api.LINK_TYPES.REPOSITORY) {
        const target = this.api.normalizeRepositoryTarget(this._sourcePath(note), value);
        if (target.type !== 'repository') throw new Error('Use Portable URL for external HTTP(S) links.');
        link = { type: 'repository', label: input.label, target, resolution: 'unchecked' };
      } else if (input.type === this.api.LINK_TYPES.NOTE) {
        link = { type: 'note', label: input.label, target: { noteId: value }, resolution: 'unchecked' };
      } else if (input.type === this.api.LINK_TYPES.URL) {
        if (!this.api.isPortableUrl(value)) throw new Error('Only portable HTTP(S) URLs are accepted.');
        link = { type: 'url', label: input.label, target: { url: value }, resolution: 'resolved', resolutionMessage: 'Portable URL.' };
      } else {
        throw new Error(`Unsupported link type: ${input.type}`);
      }
      const draft = await this.saveDraft(note);
      const next = this.api.addLink(draft, link);
      await this.store.put(next);
      this.current = next;
      await this.refreshList();
      this._setUi({ status: 'Link added locally.' });
    }

    async removeLink(note, linkId) {
      const draft = await this.saveDraft(note);
      const next = this.api.removeLink(draft, linkId);
      await this.store.put(next);
      this.current = next;
      await this.refreshList();
      this._setUi({ status: 'Link removed locally.' });
    }

    async _client(context) {
      const target = {
        owner: String(context.owner || '').trim(),
        repo: String(context.repo || '').trim(),
        branch: String(context.branch || '').trim()
      };
      if (!target.owner || !target.repo || !target.branch) throw new Error('Select a GitHub workspace with owner, repository and branch.');
      if (this.clientFactory) return this.clientFactory(target);
      const token = this.workspaceStore ? await this.workspaceStore.getToken() : await this.getValue(TOKEN_KEY, '');
      if (!token) throw new Error('A shared fine-grained GitHub token is required for remote access.');
      return new this.api.GitHubContentsClient({ ...target, token, transport: this.api.createGmTransport(GM_xmlhttpRequest) });
    }

    async resolveLink(note, linkId) {
      let draft = await this.saveDraft(note);
      const link = draft.links.find((item) => item.id === linkId);
      if (!link) throw new Error(`Link not found: ${linkId}`);
      let resolution = 'unresolved';
      let message = '';
      if (link.type === 'note') {
        const target = await this.store.get(link.target.noteId);
        resolution = target ? 'resolved' : 'unresolved';
        message = target ? 'Local Note target resolved.' : `Missing local Note: ${link.target.noteId}`;
      } else if (link.type === 'url') {
        resolution = this.api.isPortableUrl(link.target.url) ? 'resolved' : 'invalid';
        message = resolution === 'resolved' ? 'Portable URL.' : 'Invalid portable URL.';
      } else {
        try {
          const client = await this._client(this._repositoryContext(draft));
          const remote = await client.read(link.target.path);
          if (link.target.anchor && !this.api.explicitAnchorExists(remote.content, link.target.anchor)) {
            resolution = 'unresolved';
            message = `Missing explicit anchor: #${link.target.anchor}`;
          } else {
            resolution = 'resolved';
            message = 'GitHub repository target resolved.';
          }
        } catch (error) {
          resolution = error.kind === 'not_found' ? 'unresolved' : 'invalid';
          message = error.message || String(error);
        }
      }
      draft = this.api.setLinkResolution(draft, linkId, resolution, message);
      await this.store.put(draft);
      this.current = draft;
      await this.refreshList();
      this._setUi({ status: message });
    }

    async openLink(linkId) {
      if (!this.current) return;
      const link = this.current.links.find((item) => item.id === linkId);
      if (!link) return;
      if (link.type === 'note') {
        await this.selectNote(link.target.noteId);
        return;
      }
      if (link.type === 'url') {
        const url = String(link.target && link.target.url || '').trim();
        if (!this.api.isPortableUrl(url)) throw new Error('Only portable HTTP(S) URLs can be opened.');
        window.open(url, '_blank', 'noopener,noreferrer');
        return;
      }
      const context = this._repositoryContext(this.current);
      if (!context.owner || !context.repo || !context.branch) throw new Error('GitHub owner, repository and branch are required to open this target.');
      const canonicalPath = this.api.normalizeCanonicalRepositoryPath(link.target.path, 'Repository link path');
      const path = encodeGitHubPath(canonicalPath);
      const anchor = link.target.anchor ? `#${encodeURIComponent(link.target.anchor)}` : '';
      const url = `https://github.com/${encodeURIComponent(context.owner)}/${encodeURIComponent(context.repo)}/blob/${encodeURIComponent(context.branch)}/${path}${anchor}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    }

    async _persistRemoteState(note, status) {
      await this.store.put(note);
      this.current = note;
      await this.refreshList();
      this._setUi({ status: status || note.stateMessage });
      return note;
    }

    async saveRemote(note) {
      return this._runRemoteOperation('Saving and verifying the configured GitHub target…', () => this._saveRemoteUnlocked(note));
    }

    async _saveRemoteUnlocked(note) {
      let local = await this.saveLocal(note);
      const target = this._configuredTarget(local);
      const remoteIdentity = this.api.normalizeRemote(local.remote);
      const hasAny = this.api.hasAnyRemoteIdentity(remoteIdentity);
      const hasComplete = this.api.hasCompleteRemoteIdentity(remoteIdentity);

      if (hasAny && !hasComplete) {
        local = this.api.markConflict(local, 'Stored remote identity is incomplete. Automatic create/update is blocked; preserve the local Note and review its target.');
        return this._persistRemoteState(local);
      }
      if (hasComplete && !this.api.sameRemoteTarget(remoteIdentity, target)) {
        local = this.api.markConflict(local, 'Current GitHub settings point to a different repository, branch or path. Use Copy to current target explicitly.');
        return this._persistRemoteState(local);
      }

      const client = await this._client(target);
      let remote = null;
      try {
        remote = await client.read(target.path);
      } catch (error) {
        if (error.kind !== 'not_found') throw error;
        if (hasComplete) {
          local = this.api.markRemoteDeleted(local, 'The previously verified remote target is missing. It was not recreated automatically. Use an explicit recovery action.');
          return this._persistRemoteState(local);
        }
      }

      if (hasComplete && remote.sha !== remoteIdentity.sha) {
        local = this.api.markConflict(local, 'Remote SHA differs from the last verified local base. Recheck, load or explicitly overwrite the bound remote.');
        return this._persistRemoteState(local);
      }
      if (!hasComplete && remote) {
        local = this.api.markConflict(local, 'The configured target path already exists, but this local Note has no verified base. No blind overwrite was attempted.');
        return this._persistRemoteState(local);
      }

      local = this.api.markSaving(local);
      await this.store.put(local);
      this.current = local;
      await this.refreshList();
      const content = this.api.encodeNoteMarkdown(local);
      try {
        const result = await client.saveVerified({
          path: target.path,
          content,
          baseSha: remote ? remote.sha : '',
          message: `${remote ? 'Update' : 'Create'} linked Note ${local.title || local.id}`
        });
        local = this.api.markSavedVerified(local, { ...target, ...result });
        return this._persistRemoteState(local, result.recoveredAfterUnknownWrite ? 'Remote content verified after an initially unknown write result.' : 'Remote save verified by read-back.');
      } catch (error) {
        if (error.kind === 'verification_unknown' && !this.api.hasRemoteTargetIdentity(local.remote)) {
          const writeResult = error.details && error.details.writeResult ? error.details.writeResult : {};
          local = this.api.updateNote(local, {
            remote: {
              owner: target.owner,
              repo: target.repo,
              branch: target.branch,
              path: writeResult.path || target.path,
              sha: writeResult.sha || '',
              htmlUrl: writeResult.htmlUrl || ''
            }
          });
        }
        local = error.kind === 'conflict'
          ? this.api.markConflict(local, error.message)
          : this.api.markSaveFailed(local, error.message);
        await this._persistRemoteState(local);
        throw error;
      }
    }

    async copyRemote(note) {
      return this._runRemoteOperation('Copying and verifying the explicitly selected GitHub target…', () => this._copyRemoteUnlocked(note));
    }

    async _copyRemoteUnlocked(note) {
      let local = await this.saveLocal(note);
      const remoteIdentity = this.api.normalizeRemote(local.remote);
      if (!this.api.hasCompleteRemoteIdentity(remoteIdentity)) {
        throw new Error('Copy requires a complete previously verified remote identity. Use Save GitHub for a new Note.');
      }
      const target = this._configuredTarget(local);
      if (this.api.sameRemoteTarget(remoteIdentity, target)) {
        throw new Error('Current settings already match the bound remote target. Use Save GitHub.');
      }
      const client = await this._client(target);
      try {
        await client.read(target.path);
        local = this.api.markConflict(local, 'Copy target already exists. No overwrite was attempted.');
        return this._persistRemoteState(local);
      } catch (error) {
        if (error.kind !== 'not_found') throw error;
      }
      local = this.api.markSaving(local, 'Copying to the explicitly selected target…');
      await this.store.put(local);
      this.current = local;
      await this.refreshList();
      const content = this.api.encodeNoteMarkdown(local);
      try {
        const result = await client.saveVerified({
          path: target.path,
          content,
          baseSha: '',
          message: `Copy linked Note ${local.title || local.id}`
        });
        local = this.api.markSavedVerified(local, { ...target, ...result });
        return this._persistRemoteState(local, 'Remote copy verified by read-back. The old remote file was not deleted.');
      } catch (error) {
        local = error.kind === 'conflict'
          ? this.api.markConflict(local, error.message)
          : this.api.markSaveFailed(local, error.message);
        await this._persistRemoteState(local);
        throw error;
      }
    }

    async recheckRemote(note) {
      return this._runRemoteOperation('Rechecking the bound remote target…', async () => {
        let local = await this.saveLocal(note);
        const bound = this._boundTarget(local);
        const client = await this._client(bound);
        let remote;
        try {
          remote = await client.read(bound.path);
        } catch (error) {
          if (error.kind !== 'not_found') throw error;
          local = this.api.markRemoteDeleted(local, 'The bound remote target is missing. It was not recreated. Use Restore/overwrite bound remote only after explicit review.');
          return this._persistRemoteState(local);
        }
        const content = this.api.encodeNoteMarkdown(local);
        if (remote.content !== content) {
          local = this.api.markConflict(local, 'Bound remote content differs from the local Note. Load remote or explicitly overwrite the bound remote.');
          return this._persistRemoteState(local);
        }
        local = this.api.markSavedVerified(local, {
          ...bound,
          path: remote.path || bound.path,
          sha: remote.sha,
          verifiedHash: await this.api.sha256Hex(content),
          htmlUrl: remote.htmlUrl || bound.htmlUrl
        });
        return this._persistRemoteState(local, 'Bound remote content matches local content and is verified against the current SHA.');
      });
    }

    async loadRemote(note) {
      return this._runRemoteOperation('Loading the bound remote target…', async () => {
        const bound = this._boundTarget(note);
        const confirmed = await this._confirm('Load the bound remote Note? If local content differs, a separate local backup Note will be created first.');
        if (!confirmed) {
          this._setUi({ status: 'Load remote cancelled.' });
          return note;
        }
        let local = await this.saveLocal(note);
        const client = await this._client(bound);
        let remote;
        try {
          remote = await client.read(bound.path);
        } catch (error) {
          if (error.kind !== 'not_found') throw error;
          local = this.api.markRemoteDeleted(local, 'The bound remote target is missing. Local content was preserved.');
          return this._persistRemoteState(local);
        }
        const decoded = this.api.decodeNoteMarkdown(remote.content);
        if (decoded.id !== local.id) {
          local = this.api.markConflict(local, `Remote Note identity ${decoded.id} does not match local Note identity ${local.id}.`);
          return this._persistRemoteState(local);
        }
        const loadedLocal = this.api.updateNote(local, {
          title: decoded.title,
          body: decoded.body,
          links: decoded.links,
          codecExtra: decoded.codecExtra
        });
        const localContent = this.api.encodeNoteMarkdown(local);
        let backup = null;
        if (localContent !== remote.content) {
          backup = this.api.createNote({
            title: `${local.title || 'Untitled Note'} — local conflict backup`,
            body: local.body,
            links: local.links,
            codecExtra: local.codecExtra,
            state: this.api.NOTE_STATES.READY,
            stateMessage: `Local backup created before loading ${remoteTargetLabel(bound)}.`
          });
          await this.store.put(backup);
        }
        local = loadedLocal;
        local = this.api.markSavedVerified(local, {
          ...bound,
          path: remote.path || bound.path,
          sha: remote.sha,
          verifiedHash: await this.api.sha256Hex(remote.content),
          htmlUrl: remote.htmlUrl || bound.htmlUrl
        });
        const status = backup
          ? `Remote Note loaded and verified. Local conflict backup created: ${backup.id}.`
          : 'Remote Note loaded and verified; local content already matched.';
        return this._persistRemoteState(local, status);
      });
    }

    async overwriteRemote(note) {
      return this._runRemoteOperation('Preparing explicit bound-remote overwrite or restore…', async () => {
        const bound = this._boundTarget(note);
        const confirmed = await this._confirm(`Overwrite or restore the bound remote target ${remoteTargetLabel(bound)} with the current local Note? The current remote state will be read first and its latest SHA will be used.`);
        if (!confirmed) {
          this._setUi({ status: 'Bound-remote overwrite cancelled.' });
          return note;
        }
        let local = await this.saveLocal(note);
        const client = await this._client(bound);
        let remote = null;
        try {
          remote = await client.read(bound.path);
        } catch (error) {
          if (error.kind !== 'not_found') throw error;
        }
        local = this.api.markSaving(local, remote ? 'Explicitly overwriting the current bound remote base…' : 'Explicitly restoring the missing bound remote target…');
        await this.store.put(local);
        this.current = local;
        await this.refreshList();
        const content = this.api.encodeNoteMarkdown(local);
        try {
          const result = await client.saveVerified({
            path: bound.path,
            content,
            baseSha: remote ? remote.sha : '',
            message: `${remote ? 'Reconcile' : 'Restore'} linked Note ${local.title || local.id}`
          });
          local = this.api.markSavedVerified(local, { ...bound, ...result });
          return this._persistRemoteState(local, remote ? 'Bound remote explicitly overwritten and verified by read-back.' : 'Missing bound remote explicitly restored and verified by read-back.');
        } catch (error) {
          local = error.kind === 'conflict'
            ? this.api.markConflict(local, error.message)
            : this.api.markSaveFailed(local, error.message);
          await this._persistRemoteState(local);
          throw error;
        }
      });
    }

    async deleteNote(id) {
      if (!id) return;
      if (typeof window !== 'undefined' && !window.confirm('Delete this local Note? Remote repository content is not deleted.')) return;
      await this.store.delete(id);
      this.current = null;
      await this.refreshList();
      this._setUi({ status: 'Local Note deleted. Remote content, if any, was not deleted.' });
    }
  }

  async function mountLinkedNotesPrototype() {
    const previous = root[DISPOSE_KEY];
    if (typeof previous === 'function') {
      try { previous(); } catch (error) { /* stale instance must not block mount */ }
    }
    const app = new LinkedNotesApp();
    await app.start();
    root[DISPOSE_KEY] = () => app.dispose();
    return app;
  }

  return {
    LinkedNotesApp,
    mountLinkedNotesPrototype,
    SETTINGS_KEY,
    TOKEN_KEY,
    cleanBasePath,
    configuredTargetForNote,
    remoteTargetLabel
  };
});

/* bootstrap */
Promise.resolve(globalThis.ObsLinkedNotes.mountLinkedNotesPrototype()).catch((error) => {
  console.error('[OBS Linked Notes Prototype] mount failed', error);
});
