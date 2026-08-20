// ==UserScript==
// @name         OBS Linked Notes Prototype
// @namespace    https://github.com/AlexPastukhh/obs-planning-docs
// @version      0.8.0-prototype
// @description  Local-first repository workspace with atomic GitHub updates, Ordered Reference Lists, stale-use diagnostics, linked Notes and safe Markdown.
// @author       OBS planning prototype
// @match        https://chatgpt.com/*
// @match        https://chat.openai.com/*
// @run-at       document-idle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_listValues
// @grant        GM_setClipboard
// @grant        GM_xmlhttpRequest
// @connect      api.github.com
// ==/UserScript==

/* src/action-feedback.js */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const FEEDBACK_SEVERITIES = Object.freeze({ INFO: 'info', SUCCESS: 'success', WARNING: 'warning', ERROR: 'error' });
  const FEEDBACK_SCOPES = Object.freeze({ GLOBAL: 'global', NOTES: 'notes', FILES: 'files', CATEGORIES: 'categories', PICKER: 'picker' });

  function text(value) { return String(value == null ? '' : value); }
  function createFeedback(input = {}) {
    const severity = Object.values(FEEDBACK_SEVERITIES).includes(input.severity) ? input.severity : FEEDBACK_SEVERITIES.ERROR;
    const scope = Object.values(FEEDBACK_SCOPES).includes(input.scope) ? input.scope : FEEDBACK_SCOPES.GLOBAL;
    const id = text(input.id).trim() || `feedback-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
    const actions = (Array.isArray(input.actions) ? input.actions : []).map((action) => ({
      id: text(action && action.id).trim(),
      label: text(action && action.label).trim(),
      kind: text(action && action.kind).trim() || 'button'
    })).filter((action) => action.id && action.label);
    const partialResults = (Array.isArray(input.partialResults) ? input.partialResults : []).map((result) => ({
      target: text(result && result.target),
      status: text(result && result.status) || 'unknown',
      message: text(result && result.message)
    }));
    return {
      id,
      scope,
      severity,
      title: text(input.title).trim() || (severity === 'error' ? 'Action failed' : 'Status'),
      message: text(input.message).trim(),
      target: text(input.target).trim(),
      details: text(input.details).trim(),
      actions,
      partialResults,
      dismissible: input.dismissible !== false,
      createdAt: text(input.createdAt).trim() || new Date().toISOString()
    };
  }

  function feedbackFromError(error, input = {}) {
    const value = error instanceof Error ? error : new Error(text(error) || 'Unknown error.');
    return createFeedback({
      ...input,
      severity: FEEDBACK_SEVERITIES.ERROR,
      message: input.message || value.message || 'Unknown error.',
      details: input.details || text(value.kind || value.name || ''),
      actions: input.actions || value.feedbackActions || [],
      partialResults: input.partialResults || value.partialResults || []
    });
  }

  function replaceFeedback(items, feedback) {
    const normalized = createFeedback(feedback);
    return [...(Array.isArray(items) ? items : []).filter((item) => item && item.id !== normalized.id), normalized];
  }

  function dismissFeedback(items, id) {
    return (Array.isArray(items) ? items : []).filter((item) => item && item.id !== id);
  }

  function feedbackForScope(items, scope) {
    return (Array.isArray(items) ? items : []).filter((item) => item && (item.scope === scope || item.scope === FEEDBACK_SCOPES.GLOBAL));
  }

  return { FEEDBACK_SEVERITIES, FEEDBACK_SCOPES, createFeedback, feedbackFromError, replaceFeedback, dismissFeedback, feedbackForScope };
});

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

  function normalizeCategoryIds(value) {
    const result = [];
    const seen = new Set();
    for (const item of Array.isArray(value) ? value : []) {
      const id = normalizeString(item).trim();
      if (!id || seen.has(id)) continue;
      seen.add(id); result.push(id);
    }
    return result.sort((left, right) => left.localeCompare(right));
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
      categoryIds: normalizeCategoryIds(note.categoryIds),
      categoryIntentPending: Boolean(note.categoryIntentPending),
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
      categoryIds: input.categoryIds,
      categoryIntentPending: Boolean(input.categoryIntentPending),
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
    const categoryIntentChanged = Object.prototype.hasOwnProperty.call(patch, 'categoryIds')
      && JSON.stringify(normalizeCategoryIds(patch.categoryIds)) !== JSON.stringify(current.categoryIds);
    let state = patch.state || current.state;
    if (contentChanged && current.state === NOTE_STATES.SAVED_VERIFIED && !patch.state) {
      state = NOTE_STATES.CHANGED_AFTER_SAVE;
    }
    return normalizeNote({
      ...current,
      ...patch,
      categoryIds: categoryIntentChanged ? normalizeCategoryIds(patch.categoryIds) : current.categoryIds,
      categoryIntentPending: Object.prototype.hasOwnProperty.call(patch, 'categoryIntentPending') ? Boolean(patch.categoryIntentPending) : (categoryIntentChanged ? true : current.categoryIntentPending),
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

  function searchNotesByName(notes, query) {
    const needle = normalizeString(query).trim().toLocaleLowerCase();
    const source = Array.isArray(notes) ? notes : [];
    return source.filter((note) => {
      if (!needle) return true;
      return normalizeString(note && note.title).toLocaleLowerCase().includes(needle);
    }).sort((left, right) => normalizeString(left && left.title).localeCompare(normalizeString(right && right.title), undefined, { sensitivity: 'base' }));
  }

  return {
    NOTE_STATES,
    LINK_TYPES,
    createId,
    createNote,
    normalizeNote,
    normalizeCategoryIds,
    searchNotesByName,
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

/* src/note-image-assets.js */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const PENDING_IMAGE_SCHEME = 'obs-pending-image:';
  const DEFAULT_MAX_IMAGE_BYTES = 10 * 1024 * 1024;
  const MIME_EXTENSIONS = Object.freeze({
    'image/png': '.png',
    'image/jpeg': '.jpg',
    'image/webp': '.webp',
    'image/gif': '.gif'
  });

  function createAssetId() {
    const cryptoObject = typeof globalThis !== 'undefined' ? globalThis.crypto : null;
    const value = cryptoObject && typeof cryptoObject.randomUUID === 'function'
      ? cryptoObject.randomUUID()
      : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
    return `asset-${value}`;
  }

  function toUint8Array(value) {
    if (value instanceof Uint8Array) return new Uint8Array(value);
    if (value instanceof ArrayBuffer) return new Uint8Array(value.slice(0));
    if (ArrayBuffer.isView(value)) return new Uint8Array(value.buffer.slice(value.byteOffset, value.byteOffset + value.byteLength));
    if (Array.isArray(value)) return Uint8Array.from(value);
    throw new TypeError('Image bytes must be an ArrayBuffer or Uint8Array.');
  }

  function sanitizeFileStem(value) {
    const raw = String(value || 'image')
      .normalize('NFKC')
      .replace(/[\\/?#\u0000-\u001f\u007f]+/g, '-')
      .replace(/\s+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 80);
    return raw || 'image';
  }

  function mimeTypeForImagePath(path) {
    const value = String(path || '').toLowerCase().split(/[?#]/, 1)[0];
    if (value.endsWith('.png')) return 'image/png';
    if (value.endsWith('.jpg') || value.endsWith('.jpeg')) return 'image/jpeg';
    if (value.endsWith('.webp')) return 'image/webp';
    if (value.endsWith('.gif')) return 'image/gif';
    return '';
  }

  function fileNameForImage(name, mimeType) {
    const type = String(mimeType || '').toLowerCase();
    const extension = MIME_EXTENSIONS[type];
    if (!extension) throw new Error(`Unsupported image type: ${type || '<empty>'}.`);
    const source = String(name || '').replace(/\\/g, '/');
    const leaf = source.slice(source.lastIndexOf('/') + 1);
    const dot = leaf.lastIndexOf('.');
    const stem = sanitizeFileStem(dot > 0 ? leaf.slice(0, dot) : leaf);
    return `${stem}${extension}`;
  }

  function matchesImageSignature(bytes, mimeType) {
    const value = bytes instanceof Uint8Array ? bytes : toUint8Array(bytes);
    const type = String(mimeType || '').toLowerCase();
    if (type === 'image/png') return value.length >= 8 && [137, 80, 78, 71, 13, 10, 26, 10].every((byte, index) => value[index] === byte);
    if (type === 'image/jpeg') return value.length >= 3 && value[0] === 0xff && value[1] === 0xd8 && value[2] === 0xff;
    if (type === 'image/gif') {
      if (value.length < 6) return false;
      const header = String.fromCharCode(...value.subarray(0, 6));
      return header === 'GIF87a' || header === 'GIF89a';
    }
    if (type === 'image/webp') {
      if (value.length < 12) return false;
      return String.fromCharCode(...value.subarray(0, 4)) === 'RIFF' && String.fromCharCode(...value.subarray(8, 12)) === 'WEBP';
    }
    return false;
  }

  function validateImageInput(input, options = {}) {
    const type = String(input && input.type || '').toLowerCase();
    if (!MIME_EXTENSIONS[type]) throw new Error('Only PNG, JPEG, WebP and GIF images are supported.');
    const bytes = toUint8Array(input && input.bytes);
    const maxBytes = Number(options.maxBytes) > 0 ? Number(options.maxBytes) : DEFAULT_MAX_IMAGE_BYTES;
    if (!bytes.byteLength) throw new Error('The selected image is empty.');
    if (!matchesImageSignature(bytes, type)) throw new Error('The selected bytes do not match the declared image format.');
    if (bytes.byteLength > maxBytes) throw new Error(`The selected image is ${bytes.byteLength} bytes; the limit is ${maxBytes}.`);
    return { type, bytes, maxBytes };
  }

  function createPendingNoteAsset(input = {}, options = {}) {
    const validated = validateImageInput(input, options);
    const id = String(input.id || '').trim() || createAssetId();
    const noteId = String(input.noteId || '').trim();
    if (!noteId) throw new Error('Pending image requires a Note id.');
    return {
      id,
      noteId,
      fileName: fileNameForImage(input.name, validated.type),
      originalName: String(input.name || ''),
      mimeType: validated.type,
      size: validated.bytes.byteLength,
      bytes: validated.bytes,
      alt: String(input.alt || '').replace(/[\r\n]+/g, ' ').trim(),
      title: String(input.title || '').replace(/[\r\n]+/g, ' ').trim(),
      createdAt: String(input.createdAt || new Date().toISOString()),
      updatedAt: String(input.updatedAt || new Date().toISOString()),
      state: String(input.state || 'pending'),
      stateMessage: String(input.stateMessage || ''),
      plannedPath: String(input.plannedPath || ''),
      verifiedPath: String(input.verifiedPath || ''),
      verifiedSha: String(input.verifiedSha || ''),
      verifiedHash: String(input.verifiedHash || '')
    };
  }

  function pendingImageTarget(assetId) {
    const id = String(assetId || '').trim();
    if (!id || /[\s<>()]/.test(id)) throw new Error('Pending image id is invalid.');
    return `${PENDING_IMAGE_SCHEME}${id}`;
  }

  function pendingImageMarkdown(asset) {
    const alt = String(asset && asset.alt || '').replace(/([\\\]])/g, '\\$1');
    const title = String(asset && asset.title || '').replace(/(["\\])/g, '\\$1');
    return `![${alt}](<${pendingImageTarget(asset && asset.id)}>${title ? ` "${title}"` : ''})`;
  }

  function pendingAssetIds(markdown) {
    const text = String(markdown || '');
    const pattern = /obs-pending-image:([A-Za-z0-9._~-]+)/g;
    const result = [];
    const seen = new Set();
    let match;
    while ((match = pattern.exec(text))) {
      if (!seen.has(match[1])) { seen.add(match[1]); result.push(match[1]); }
    }
    return result;
  }

  function encodeMarkdownPath(path) {
    return String(path || '').split('/').map((segment) => {
      if (segment === '.' || segment === '..') return segment;
      return encodeURIComponent(segment).replace(/%2F/gi, '/');
    }).join('/');
  }

  function replacePendingImageTargets(markdown, replacements) {
    const map = replacements instanceof Map ? replacements : new Map(Object.entries(replacements || {}));
    return String(markdown || '').replace(/obs-pending-image:([A-Za-z0-9._~-]+)/g, (whole, id) => {
      const target = map.get(id);
      return target ? encodeMarkdownPath(target) : whole;
    });
  }

  function noteAssetFolder(notePath) {
    const path = String(notePath || '').replace(/\\/g, '/').trim();
    if (!path || !/\.md$/i.test(path)) throw new Error('A Markdown Note path is required for image assets.');
    return `${path.replace(/\.md$/i, '')}.assets`;
  }

  function noteAssetPath(notePath, fileName) {
    const leaf = String(fileName || '').replace(/\\/g, '/').split('/').pop();
    if (!leaf || /[/?#\\\u0000-\u001f\u007f]/.test(leaf) || leaf === '.' || leaf === '..') throw new Error('Image filename is invalid.');
    return `${noteAssetFolder(notePath)}/${leaf}`;
  }

  return {
    PENDING_IMAGE_SCHEME,
    DEFAULT_MAX_IMAGE_BYTES,
    MIME_EXTENSIONS,
    createAssetId,
    toUint8Array,
    sanitizeFileStem,
    mimeTypeForImagePath,
    fileNameForImage,
    matchesImageSignature,
    validateImageInput,
    createPendingNoteAsset,
    pendingImageTarget,
    pendingImageMarkdown,
    pendingAssetIds,
    encodeMarkdownPath,
    replacePendingImageTargets,
    noteAssetFolder,
    noteAssetPath
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
    if (/obs-pending-image:[A-Za-z0-9._~-]+/.test(body)) {
      throw new Error('Note contains unresolved pending image references. Upload and verify the images before encoding remote Markdown.');
    }
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


  function decodeRepositoryMarkdownPath(value) {
    const text = String(value == null ? '' : value).replace(/\\/g, '/').trim();
    if (!text) return '';
    if (/%(?![0-9A-Fa-f]{2})/.test(text)) throw new Error(`Repository Markdown target has invalid percent encoding: ${text}`);
    const rootRelative = text.startsWith('/');
    const rawParts = text.split('/');
    const decoded = [];
    for (let index = 0; index < rawParts.length; index += 1) {
      const raw = rawParts[index];
      if (!raw) {
        if (index === 0 && rootRelative) continue;
        throw new Error('Repository Markdown target contains an empty path segment.');
      }
      if (raw === '.' || raw === '..') { decoded.push(raw); continue; }
      let segment;
      try { segment = decodeURIComponent(raw); }
      catch (error) { throw new Error(`Repository Markdown target has invalid percent encoding: ${text}`); }
      if (!segment || segment === '.' || segment === '..') throw new Error(`Repository Markdown target contains encoded traversal: ${text}`);
      if (/[\\/?#\u0000-\u001f\u007f]/.test(segment)) throw new Error(`Repository Markdown target contains an invalid decoded path segment: ${text}`);
      decoded.push(segment);
    }
    const result = decoded.join('/');
    if (!result) throw new Error('Repository Markdown target path is empty.');
    return `${rootRelative ? '/' : ''}${result}`;
  }

  function normalizeMarkdownRepositoryTarget(sourcePath, target) {
    const parsed = splitTarget(target);
    if (parsed.kind === 'url') return { type: 'url', url: parsed.url };
    const decodedPath = decodeRepositoryMarkdownPath(parsed.path);
    if (decodedPath.startsWith('/')) {
      return {
        type: 'repository',
        path: normalizeCanonicalRepositoryPath(decodedPath.replace(/^\/+/, ''), 'Repository target path'),
        anchor: String(parsed.anchor || '').trim()
      };
    }
    return {
      type: 'repository',
      path: normalizeRepositoryPath(sourcePath, decodedPath),
      anchor: String(parsed.anchor || '').trim()
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

  function repositoryRelativePath(fromPath, toPath) {
    const from = normalizeCanonicalRepositoryPath(fromPath, 'Source repository path');
    const to = normalizeCanonicalRepositoryPath(toPath, 'Target repository path');
    const fromDir = from.includes('/') ? from.slice(0, from.lastIndexOf('/')).split('/') : [];
    const toParts = to.split('/');
    let shared = 0;
    while (shared < fromDir.length && shared < toParts.length && fromDir[shared] === toParts[shared]) shared += 1;
    const up = Array(Math.max(0, fromDir.length - shared)).fill('..');
    const down = toParts.slice(shared);
    const result = [...up, ...down].join('/');
    if (!result) return `./${toParts[toParts.length - 1]}`;
    return result.startsWith('.') ? result : `./${result}`;
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
    decodeRepositoryMarkdownPath,
    normalizeMarkdownRepositoryTarget,
    normalizeCanonicalRepositoryPath,
    normalizeRepositoryPath,
    repositoryRelativePath,
    normalizeRepositoryTarget,
    explicitAnchorExists,
    resolveRepositoryTarget,
    repositoryTargetToString
  };
});

/* src/markdown-image-references.js */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  function mergeRanges(ranges) {
    const sorted = (Array.isArray(ranges) ? ranges : [])
      .filter((range) => range && Number.isInteger(range.start) && Number.isInteger(range.end) && range.end > range.start)
      .sort((left, right) => left.start - right.start || left.end - right.end);
    const merged = [];
    for (const range of sorted) {
      const previous = merged[merged.length - 1];
      if (!previous || range.start > previous.end) merged.push({ start: range.start, end: range.end });
      else if (range.end > previous.end) previous.end = range.end;
    }
    return merged;
  }

  function stripBlockquotePrefix(line) {
    let value = String(line || '');
    while (/^[ ]{0,3}>[ \t]?/.test(value)) value = value.replace(/^[ ]{0,3}>[ \t]?/, '');
    return value;
  }

  function rawHtmlCodeLikeRanges(text, protectedRanges = []) {
    const ranges = [];
    const open = [];
    const tags = /<\/?(pre|code|textarea|script|style)\b[^>]*>/gi;
    let match;
    while ((match = tags.exec(text))) {
      if (insideRanges(match.index, protectedRanges) || isEscaped(text, match.index)) continue;
      const raw = match[0];
      const tag = String(match[1] || '').toLowerCase();
      const closing = /^<\//.test(raw);
      const selfClosing = /\/\s*>$/.test(raw);
      if (!closing) {
        if (!selfClosing) open.push({ tag, start: match.index });
        continue;
      }
      let openIndex = -1;
      for (let index = open.length - 1; index >= 0; index -= 1) {
        if (open[index].tag === tag) { openIndex = index; break; }
      }
      if (openIndex < 0) continue;
      const entry = open[openIndex];
      open.splice(openIndex, 1);
      ranges.push({ start: entry.start, end: tags.lastIndex });
    }
    for (const entry of open) ranges.push({ start: entry.start, end: text.length });
    return mergeRanges(ranges);
  }

  function markdownCodeRanges(markdown) {
    const text = String(markdown || '');
    const ranges = [];
    const lines = text.split(/(?<=\n)/);
    let offset = 0;
    let fence = null;

    for (const line of lines) {
      const body = line.replace(/[\r\n]+$/, '');
      const normalized = stripBlockquotePrefix(body);
      if (fence) {
        const closing = normalized.match(/^ {0,3}(`{3,}|~{3,})[ \t]*$/);
        if (closing && closing[1][0] === fence.char && closing[1].length >= fence.length) {
          ranges.push({ start: fence.start, end: offset + line.length });
          fence = null;
        }
        offset += line.length;
        continue;
      }

      const opening = normalized.match(/^ {0,3}(`{3,}|~{3,})/);
      if (opening) {
        fence = { char: opening[1][0], length: opening[1].length, start: offset };
        offset += line.length;
        continue;
      }

      if (/^(?: {4}|\t)/.test(normalized)) ranges.push({ start: offset, end: offset + line.length });
      offset += line.length;
    }
    if (fence) ranges.push({ start: fence.start, end: text.length });

    const comments = /<!--[\s\S]*?(?:-->|$)/g;
    let comment;
    while ((comment = comments.exec(text))) ranges.push({ start: comment.index, end: comments.lastIndex });

    let protectedRanges = mergeRanges(ranges);
    for (let index = 0; index < text.length; index += 1) {
      if (text[index] !== '`' || isEscaped(text, index) || insideRanges(index, protectedRanges)) continue;
      let ticks = 1;
      while (text[index + ticks] === '`') ticks += 1;
      let cursor = index + ticks;
      let closingEnd = -1;
      while (cursor < text.length) {
        if (text[cursor] !== '`' || insideRanges(cursor, protectedRanges)) { cursor += 1; continue; }
        let run = 1;
        while (text[cursor + run] === '`') run += 1;
        if (run === ticks) { closingEnd = cursor + run; break; }
        cursor += run;
      }
      if (closingEnd > index) {
        ranges.push({ start: index, end: closingEnd });
        protectedRanges = mergeRanges(ranges);
        index = closingEnd - 1;
      }
    }

    protectedRanges = mergeRanges(ranges);
    ranges.push(...rawHtmlCodeLikeRanges(text, protectedRanges));
    return mergeRanges(ranges);
  }

  function insideRanges(index, ranges) {
    return ranges.some((range) => index >= range.start && index < range.end);
  }

  function isEscaped(text, index) {
    let count = 0;
    for (let cursor = index - 1; cursor >= 0 && text[cursor] === '\\'; cursor -= 1) count += 1;
    return count % 2 === 1;
  }

  function unescapeMarkdown(value) {
    return String(value || '').replace(/\\([!"#$%&'()*+,\-./:;<=>?@[\]^_`{|}~\\])/g, '$1');
  }

  function normalizeReferenceLabel(value) {
    return unescapeMarkdown(value).trim().replace(/\s+/g, ' ').toLowerCase();
  }

  function parseBracket(text, openIndex) {
    if (text[openIndex] !== '[') return null;
    let depth = 1;
    for (let index = openIndex + 1; index < text.length; index += 1) {
      const char = text[index];
      if (char === '\\') { index += 1; continue; }
      if (char === '[') depth += 1;
      else if (char === ']') {
        depth -= 1;
        if (depth === 0) return { value: text.slice(openIndex + 1, index), end: index + 1 };
      }
      if (char === '\n' || char === '\r') return null;
    }
    return null;
  }

  function skipWhitespace(text, index) {
    while (index < text.length && /[ \t\r\n]/.test(text[index])) index += 1;
    return index;
  }

  function parseQuotedTitle(text, index) {
    const opener = text[index];
    const closer = opener === '(' ? ')' : opener;
    if (!new Set(['"', "'", '(']).has(opener)) return null;
    let value = '';
    for (let cursor = index + 1; cursor < text.length; cursor += 1) {
      const char = text[cursor];
      if (char === '\\' && cursor + 1 < text.length) {
        value += text[cursor + 1];
        cursor += 1;
        continue;
      }
      if (char === closer) return { value, end: cursor + 1 };
      if (char === '\n' || char === '\r') return null;
      value += char;
    }
    return null;
  }

  function parseDestinationAndTitle(text, index, closingRequired) {
    let cursor = skipWhitespace(text, index);
    let source = '';
    if (text[cursor] === '<') {
      const start = ++cursor;
      while (cursor < text.length && text[cursor] !== '>') {
        if (text[cursor] === '\n' || text[cursor] === '\r') return null;
        if (text[cursor] === '\\' && cursor + 1 < text.length) cursor += 2;
        else cursor += 1;
      }
      if (text[cursor] !== '>') return null;
      source = unescapeMarkdown(text.slice(start, cursor));
      cursor += 1;
    } else {
      const start = cursor;
      let depth = 0;
      while (cursor < text.length) {
        const char = text[cursor];
        if (char === '\\' && cursor + 1 < text.length) { cursor += 2; continue; }
        if (char === '(') { depth += 1; cursor += 1; continue; }
        if (char === ')') {
          if (depth === 0) break;
          depth -= 1;
          cursor += 1;
          continue;
        }
        if ((char === ' ' || char === '\t' || char === '\r' || char === '\n') && depth === 0) break;
        cursor += 1;
      }
      if (cursor === start) return null;
      source = unescapeMarkdown(text.slice(start, cursor));
    }
    const afterSource = cursor;
    cursor = skipWhitespace(text, cursor);
    let title = '';
    if (cursor > afterSource && new Set(['"', "'", '(']).has(text[cursor])) {
      const parsedTitle = parseQuotedTitle(text, cursor);
      if (!parsedTitle) return null;
      title = parsedTitle.value;
      cursor = skipWhitespace(text, parsedTitle.end);
    }
    if (closingRequired) {
      if (text[cursor] !== ')') return null;
      cursor += 1;
    }
    return { source, title, end: cursor };
  }

  function parseReferenceDefinitions(text, codeRanges) {
    const definitions = new Map();
    const lines = text.split(/(?<=\n)/);
    let offset = 0;
    for (const line of lines) {
      if (insideRanges(offset, codeRanges)) { offset += line.length; continue; }
      const body = line.replace(/[\r\n]+$/, '');
      const match = body.match(/^[ ]{0,3}\[([^\]]+)\]:[ \t]*(.*)$/);
      if (match) {
        const label = normalizeReferenceLabel(match[1]);
        const parsed = parseDestinationAndTitle(match[2], 0, false);
        if (label && parsed && skipWhitespace(match[2], parsed.end) === match[2].length && !definitions.has(label)) {
          definitions.set(label, { source: parsed.source, title: parsed.title, start: offset, end: offset + body.length });
        }
      }
      offset += line.length;
    }
    return definitions;
  }

  function parseMarkdownImages(markdown) {
    const text = String(markdown || '');
    const refs = [];
    const codeRanges = markdownCodeRanges(text);
    const definitions = parseReferenceDefinitions(text, codeRanges);
    const claimed = [];

    for (let index = 0; index < text.length - 1; index += 1) {
      if (text[index] !== '!' || text[index + 1] !== '[' || isEscaped(text, index) || insideRanges(index, codeRanges)) continue;
      const alt = parseBracket(text, index + 1);
      if (!alt) {
        refs.push({ kind: 'unsupported', start: index, end: Math.min(text.length, index + 2), raw: text.slice(index, index + 2), source: '', message: 'Unsupported or malformed Markdown image syntax.' });
        continue;
      }
      let cursor = alt.end;
      let parsed = null;
      if (text[cursor] === '(') {
        const destination = parseDestinationAndTitle(text, cursor + 1, true);
        if (destination) parsed = { source: destination.source, title: destination.title, end: destination.end, syntax: 'inline' };
      } else if (text[cursor] === '[') {
        const label = parseBracket(text, cursor);
        if (label) {
          const normalized = normalizeReferenceLabel(label.value || alt.value);
          const definition = definitions.get(normalized);
          if (definition) parsed = { source: definition.source, title: definition.title, end: label.end, syntax: label.value ? 'reference' : 'collapsed-reference', referenceLabel: normalized };
        }
      } else {
        const normalized = normalizeReferenceLabel(alt.value);
        const definition = definitions.get(normalized);
        if (definition) parsed = { source: definition.source, title: definition.title, end: alt.end, syntax: 'shortcut-reference', referenceLabel: normalized };
      }
      if (!parsed) {
        refs.push({ kind: 'unsupported', start: index, end: alt.end, raw: text.slice(index, alt.end), alt: unescapeMarkdown(alt.value), source: '', message: 'Unsupported or unresolved Markdown image syntax.' });
        claimed.push({ start: index, end: alt.end });
        index = alt.end - 1;
        continue;
      }
      const ref = {
        kind: 'markdown',
        start: index,
        end: parsed.end,
        raw: text.slice(index, parsed.end),
        alt: unescapeMarkdown(alt.value),
        source: parsed.source,
        title: parsed.title || '',
        syntax: parsed.syntax,
        referenceLabel: parsed.referenceLabel || ''
      };
      refs.push(ref);
      claimed.push({ start: ref.start, end: ref.end });
      index = parsed.end - 1;
    }

    const html = /<img\b([^>]*?)\bsrc\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))([^>]*)>/gi;
    let match;
    while ((match = html.exec(text))) {
      if (insideRanges(match.index, codeRanges) || claimed.some((range) => match.index >= range.start && match.index < range.end)) continue;
      refs.push({ kind: 'html', start: match.index, end: html.lastIndex, raw: match[0], source: match[2] || match[3] || match[4] || '', prefix: match[1] || '', suffix: match[5] || '' });
    }
    return refs.sort((a, b) => a.start - b.start || a.end - b.end);
  }

  function classifyImageReference(ref, sourcePath, api) {
    if (ref && ref.kind === 'unsupported') return { ...ref, targetType: 'invalid', message: ref.message || 'Unsupported image syntax.' };
    const value = String(ref && ref.source || '').trim();
    if (!value) return { ...ref, targetType: 'invalid', message: 'Image source is empty.' };
    if (/^obs-pending-image:/i.test(value)) return { ...ref, targetType: 'pending', assetId: value.slice(value.indexOf(':') + 1) };
    if (api && typeof api.isPortableUrl === 'function' && api.isPortableUrl(value)) return { ...ref, targetType: 'external', url: value };
    try {
      const normalized = api.normalizeMarkdownRepositoryTarget(sourcePath, value);
      if (normalized.type !== 'repository') return { ...ref, targetType: 'external', url: normalized.url || value };
      return { ...ref, targetType: 'repository', path: normalized.path };
    } catch (error) {
      return { ...ref, targetType: 'invalid', message: error.message };
    }
  }

  function replaceReferenceSource(ref, destination) {
    const encoded = String(destination || '');
    if (ref.kind === 'html') {
      return ref.raw.replace(/\bsrc\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/i, `src="${encoded.replace(/&/g, '&amp;').replace(/"/g, '&quot;')}"`);
    }
    if (ref.kind !== 'markdown') return ref.raw;
    const alt = String(ref.alt || '').replace(/([\\\]])/g, '\\$1');
    const title = String(ref.title || '').replace(/(["\\])/g, '\\$1');
    return `![${alt}](<${encoded}>${title ? ` "${title}"` : ''})`;
  }

  function rewriteImageReferences(markdown, replacements) {
    const text = String(markdown || '');
    const map = replacements instanceof Map ? replacements : new Map(Object.entries(replacements || {}));
    const refs = parseMarkdownImages(text);
    let output = text;
    for (let index = refs.length - 1; index >= 0; index -= 1) {
      const ref = refs[index];
      if (ref.kind === 'unsupported') continue;
      const replacement = map.get(ref.source);
      if (!replacement) continue;
      output = `${output.slice(0, ref.start)}${replaceReferenceSource(ref, replacement)}${output.slice(ref.end)}`;
    }
    return output;
  }

  return {
    markdownCodeRanges,
    insideRanges,
    normalizeReferenceLabel,
    parseReferenceDefinitions,
    parseMarkdownImages,
    classifyImageReference,
    replaceReferenceSource,
    rewriteImageReferences
  };
});

/* src/image-aware-markdown-transfer.js */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  function targetAssetFolder(targetPath) {
    const path = String(targetPath || '').replace(/\\/g, '/');
    if (!/\.md$/i.test(path)) throw new Error('Transfer target must be a Markdown file.');
    return `${path.replace(/\.md$/i, '')}.assets`;
  }

  function leafName(path) {
    const value = String(path || '').replace(/\\/g, '/');
    return value.slice(value.lastIndexOf('/') + 1) || 'image';
  }

  function visibleNoteMarkdown(note) {
    const title = String(note && note.title || '').trim();
    const body = String(note && note.body || '');
    return `${title ? `# ${title}\n\n` : ''}${body}${body.endsWith('\n') || !body ? '' : '\n'}`;
  }

  function buildImageAwareTransferPlan(options = {}) {
    const api = options.api;
    if (!api || typeof api.parseMarkdownImages !== 'function' || typeof api.classifyImageReference !== 'function') throw new TypeError('Image reference APIs are required.');
    const sourcePath = String(options.sourcePath || '');
    const targetPath = String(options.targetPath || '');
    const sourceMarkdown = String(options.sourceMarkdown || '');
    const targetMarkdown = String(options.targetMarkdown || '');
    const mode = options.mode === 'append' ? 'append' : 'create';
    const references = api.parseMarkdownImages(sourceMarkdown).map((ref) => api.classifyImageReference(ref, sourcePath, api));
    const assets = [];
    const seen = new Map();
    const diagnostics = [];
    const folder = targetAssetFolder(targetPath);
    for (const ref of references) {
      if (ref.targetType === 'repository') {
        if (!seen.has(ref.path)) {
          const desiredPath = `${folder}/${leafName(ref.path)}`;
          const entry = { sourcePath: ref.path, desiredPath, references: [] };
          seen.set(ref.path, entry); assets.push(entry);
        }
        seen.get(ref.path).references.push(ref.source);
      } else if (ref.targetType === 'invalid' || ref.targetType === 'pending') {
        diagnostics.push({ status: 'blocked', source: ref.source, message: ref.message || 'Unresolved pending/invalid image cannot be transferred.' });
      } else if (ref.targetType === 'external') {
        diagnostics.push({ status: 'preserved', source: ref.source, message: 'External image URL is preserved and is not downloaded.' });
      }
    }
    const separator = targetMarkdown && !targetMarkdown.endsWith('\n') ? '\n\n' : (targetMarkdown ? '\n' : '');
    const intendedMarkdown = mode === 'append' ? `${targetMarkdown}${separator}${sourceMarkdown}` : sourceMarkdown;
    return { sourcePath, targetPath, mode, sourceMarkdown, targetMarkdown, intendedMarkdown, assets, diagnostics, blocked: diagnostics.some((item) => item.status === 'blocked') };
  }

  function finalizeImageAwareTransfer(plan, actualPaths, api) {
    const replacements = new Map();
    for (const asset of plan.assets || []) {
      const actual = actualPaths instanceof Map ? actualPaths.get(asset.sourcePath) : actualPaths && actualPaths[asset.sourcePath];
      if (!actual) continue;
      const relative = api.repositoryRelativePath(plan.targetPath, actual);
      const encoded = api.encodeMarkdownPath ? api.encodeMarkdownPath(relative) : relative;
      for (const original of asset.references || []) replacements.set(original, encoded);
    }
    const transferredSource = api.rewriteImageReferences(plan.sourceMarkdown, replacements);
    const separator = plan.targetMarkdown && !plan.targetMarkdown.endsWith('\n') ? '\n\n' : (plan.targetMarkdown ? '\n' : '');
    return plan.mode === 'append' ? `${plan.targetMarkdown}${separator}${transferredSource}` : transferredSource;
  }

  return { targetAssetFolder, visibleNoteMarkdown, buildImageAwareTransferPlan, finalizeImageAwareTransfer };
});

/* src/repository-file-browser.js */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const DEFAULT_PREVIEW_MAX_BYTES = 512 * 1024;
  const TEXT_EXTENSIONS = new Set([
    'md','markdown','txt','json','jsonc','js','mjs','cjs','ts','tsx','jsx','css','scss','less','html','htm','xml','svg',
    'yml','yaml','toml','ini','cfg','conf','env','properties','csv','tsv','sql','graphql','gql','sh','bash','zsh','fish',
    'ps1','psm1','psd1','bat','cmd','py','rb','php','java','kt','kts','go','rs','c','h','cc','cpp','hpp','cs','csproj',
    'fs','fsx','vb','sln','gradle','dockerfile','gitignore','gitattributes','editorconfig','lock'
  ]);

  function normalizeBrowserPath(value, options = {}) {
    const text = String(value == null ? '' : value).replace(/\\/g, '/').trim().replace(/^\/+|\/+$/g, '');
    if (!text && options.allowRoot !== false) return '';
    if (!text) throw new TypeError('Repository path is required.');
    if (/^[a-zA-Z]:\//.test(text) || text.startsWith('//') || /^file:\/\//i.test(text) || text.includes('://')) throw new TypeError('Repository path must be repository-relative.');
    if (/[?#]/.test(text) || /[\u0000-\u001f\u007f]/.test(text)) throw new TypeError('Repository path contains unsupported syntax.');
    const segments = text.split('/');
    if (segments.some((segment) => !segment || segment === '.' || segment === '..')) throw new TypeError('Repository path contains an empty, . or .. segment.');
    return segments.join('/');
  }

  function parentRepositoryPath(path) {
    const normalized = normalizeBrowserPath(path);
    if (!normalized) return '';
    const index = normalized.lastIndexOf('/');
    return index < 0 ? '' : normalized.slice(0, index);
  }

  function repositoryBreadcrumbs(path) {
    const normalized = normalizeBrowserPath(path);
    const result = [{ label: '/', path: '' }];
    if (!normalized) return result;
    const parts = normalized.split('/');
    let current = '';
    for (const part of parts) {
      current = current ? `${current}/${part}` : part;
      result.push({ label: part, path: current });
    }
    return result;
  }

  function buildGitHubHtmlUrl(context, path, type = 'file') {
    const owner = String(context && context.owner || '').trim();
    const repo = String(context && context.repo || '').trim();
    const branch = String(context && context.branch || '').trim();
    if (!owner || !repo || !branch) throw new TypeError('GitHub owner, repository and branch are required.');
    const normalized = normalizeBrowserPath(path);
    const encodedPath = normalized.split('/').map(encodeURIComponent).join('/');
    const mode = type === 'dir' ? 'tree' : 'blob';
    const suffix = encodedPath ? `/${encodedPath}` : '';
    return `https://github.com/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/${mode}/${encodeURIComponent(branch)}${suffix}`;
  }

  function extensionOf(name) {
    const lower = String(name || '').toLowerCase();
    const base = lower.slice(lower.lastIndexOf('/') + 1);
    if (TEXT_EXTENSIONS.has(base)) return base;
    const index = base.lastIndexOf('.');
    return index < 0 ? '' : base.slice(index + 1);
  }

  function looksBinary(text) {
    const value = String(text == null ? '' : text);
    if (value.includes('\u0000')) return true;
    const sample = value.slice(0, 8192);
    if (!sample) return false;
    let suspicious = 0;
    for (const char of sample) {
      const code = char.charCodeAt(0);
      if ((code < 9 || (code > 13 && code < 32)) && code !== 27) suspicious += 1;
    }
    return suspicious / sample.length > 0.02;
  }

  function previewLimit(options = {}) {
    return Number(options.maxBytes) > 0 ? Number(options.maxBytes) : DEFAULT_PREVIEW_MAX_BYTES;
  }
  function isPreviewTooLarge(file, options = {}) { return Number(file && file.size) > previewLimit(options); }

  function classifyFilePreview(file, options = {}) {
    const maxBytes = previewLimit(options);
    const size = Number(file && file.size) || 0;
    const path = normalizeBrowserPath(file && (file.path || file.name));
    const name = path.slice(path.lastIndexOf('/') + 1);
    if (size > maxBytes) return { kind: 'too_large', path, size, maxBytes, content: '', message: `File is ${size} bytes; preview limit is ${maxBytes}.` };
    const hasContent = file && typeof file.content === 'string';
    if (!hasContent) return { kind: 'unsupported', path, size, maxBytes, content: '', message: 'Inline text content is unavailable. Open the file on GitHub.' };
    const content = file.content;
    const extension = extensionOf(name);
    const knownText = TEXT_EXTENSIONS.has(extension) || !extension;
    if (looksBinary(content) || (!knownText && /\ufffd/.test(content))) return { kind: 'unsupported', path, size, maxBytes, content: '', message: 'Binary or unsupported file. Open it on GitHub.' };
    return { kind: 'text', path, size, maxBytes, content, message: 'Read-only repository text preview.' };
  }

  function sortRepositoryEntries(entries) {
    return [...(Array.isArray(entries) ? entries : [])].sort((left, right) => {
      const leftDir = left && left.type === 'dir' ? 0 : 1;
      const rightDir = right && right.type === 'dir' ? 0 : 1;
      if (leftDir !== rightDir) return leftDir - rightDir;
      return String(left && (left.name || left.path) || '').localeCompare(String(right && (right.name || right.path) || ''), undefined, { sensitivity: 'base' });
    });
  }

  return {
    DEFAULT_PREVIEW_MAX_BYTES,
    normalizeBrowserPath,
    parentRepositoryPath,
    repositoryBreadcrumbs,
    buildGitHubHtmlUrl,
    classifyFilePreview,
    isPreviewTooLarge,
    sortRepositoryEntries,
    looksBinary
  };
});

/* src/repository-text-file-write.js */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const DEFAULT_TEXT_FILE_MAX_BYTES = 512 * 1024;
  const DEFAULT_FOLDER_PLACEHOLDER = '.gitkeep';

  function normalizeChildName(value, label = 'Repository name') {
    const name = String(value == null ? '' : value).trim();
    if (!name) throw new TypeError(`${label} is required.`);
    if (name === '.' || name === '..' || /[\/\\]/.test(name)) throw new TypeError(`${label} must be one path segment.`);
    if (/[?#\u0000-\u001f\u007f]/.test(name)) throw new TypeError(`${label} contains unsupported syntax.`);
    return name;
  }

  function childRepositoryPath(parentPath, name, normalizePath) {
    const child = normalizeChildName(name);
    const rawParent = String(parentPath == null ? '' : parentPath).replace(/\\/g, '/').trim().replace(/^\/+|\/+$/g, '');
    const parent = rawParent
      ? (typeof normalizePath === 'function' ? normalizePath(rawParent) : rawParent)
      : '';
    const combined = parent ? `${parent}/${child}` : child;
    return typeof normalizePath === 'function' ? normalizePath(combined) : combined;
  }

  function utf8ByteLength(value) {
    return new TextEncoder().encode(String(value == null ? '' : value)).byteLength;
  }

  function assertTextSize(content, maxBytes = DEFAULT_TEXT_FILE_MAX_BYTES) {
    const limit = Number(maxBytes) > 0 ? Number(maxBytes) : DEFAULT_TEXT_FILE_MAX_BYTES;
    const bytes = utf8ByteLength(content);
    if (bytes > limit) {
      const error = new Error(`Repository text is ${bytes} bytes; editor limit is ${limit}.`);
      error.kind = 'limit_exceeded';
      error.details = { bytes, maxBytes: limit };
      throw error;
    }
    return bytes;
  }

  async function readMetadataOrNull(client, path) {
    try {
      return await client.readMetadata(path);
    } catch (error) {
      if (error && error.kind === 'not_found') return null;
      throw error;
    }
  }

  async function assertCreateTargetAbsent(client, path) {
    const existing = await readMetadataOrNull(client, path);
    if (!existing) return;
    const error = new Error(`Repository target already exists and was not overwritten: ${path}.`);
    error.kind = 'conflict';
    error.details = { path, sha: existing.sha || '' };
    throw error;
  }

  async function saveRepositoryTextFile(options = {}) {
    const client = options.client;
    if (!client || typeof client.saveVerified !== 'function' || typeof client.readMetadata !== 'function') {
      throw new TypeError('A GitHub client with verified text write support is required.');
    }
    const normalizePath = options.normalizePath;
    if (typeof normalizePath !== 'function') throw new TypeError('A repository path normalizer is required.');
    const mode = options.mode === 'edit' ? 'edit' : 'create';
    const content = String(options.content == null ? '' : options.content);
    const size = assertTextSize(content, options.maxBytes);

    let path;
    let baseSha = '';
    if (mode === 'edit') {
      path = normalizePath(options.path);
      baseSha = String(options.baseSha || '').trim();
      if (!baseSha) throw new Error('Editing an existing repository file requires its base SHA.');
      const current = await client.readMetadata(path);
      if (!current || current.type !== 'file') throw new Error(`Repository text target is not a file: ${path}.`);
      if (String(current.sha || '') !== baseSha) {
        const error = new Error(`Repository file changed after it was opened: ${path}. Refresh before saving.`);
        error.kind = 'conflict';
        error.details = { path, expectedSha: baseSha, actualSha: String(current.sha || '') };
        throw error;
      }
    } else {
      path = childRepositoryPath(options.parentPath, options.name, normalizePath);
      await assertCreateTargetAbsent(client, path);
    }

    const result = await client.saveVerified({
      path,
      content,
      baseSha,
      message: options.message || `${mode === 'edit' ? 'Update' : 'Create'} repository file ${path}`
    });
    return { ...result, path, content, size, mode };
  }

  async function createRepositoryFolder(options = {}) {
    const client = options.client;
    if (!client || typeof client.listDirectory !== 'function' || typeof client.saveVerified !== 'function') {
      throw new TypeError('A GitHub client with directory reads and verified text writes is required.');
    }
    const normalizePath = options.normalizePath;
    if (typeof normalizePath !== 'function') throw new TypeError('A repository path normalizer is required.');
    const folderPath = childRepositoryPath(options.parentPath, options.name, normalizePath);

    try {
      await client.listDirectory(folderPath, { maxEntries: 200 });
      const error = new Error(`Repository folder already exists: ${folderPath}.`);
      error.kind = 'conflict';
      throw error;
    } catch (error) {
      if (!(error && error.kind === 'not_found')) throw error;
    }

    const placeholderName = normalizeChildName(options.placeholderName || DEFAULT_FOLDER_PLACEHOLDER, 'Folder placeholder name');
    const placeholderPath = childRepositoryPath(folderPath, placeholderName, normalizePath);
    await assertCreateTargetAbsent(client, placeholderPath);
    const result = await client.saveVerified({
      path: placeholderPath,
      content: '',
      baseSha: '',
      message: options.message || `Create repository folder ${folderPath}`
    });
    return { ...result, folderPath, placeholderPath };
  }

  return {
    DEFAULT_TEXT_FILE_MAX_BYTES,
    DEFAULT_FOLDER_PLACEHOLDER,
    normalizeChildName,
    childRepositoryPath,
    utf8ByteLength,
    assertTextSize,
    saveRepositoryTextFile,
    createRepositoryFolder
  };
});

/* src/repository-markdown-heading-links.js */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  function normalizeMarkdownText(value) {
    return String(value == null ? '' : value).replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  }

  const BASIC_NAMED_ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" };

  function decodeNumericCharacterReference(match, code, radix) {
    const numeric = parseInt(code, radix);
    if (!Number.isFinite(numeric) || numeric === 0 || numeric > 0x10FFFF || (numeric >= 0xD800 && numeric <= 0xDFFF)) return '\uFFFD';
    try { return String.fromCodePoint(numeric); } catch { return '\uFFFD'; }
  }

  function decodeHeadingEntities(value, options = {}) {
    const text = String(value == null ? '' : value);
    const documentLike = options.documentLike || (typeof document !== 'undefined' ? document : null);
    if (documentLike && typeof documentLike.createElement === 'function') {
      const textarea = documentLike.createElement('textarea');
      if (textarea) {
        textarea.innerHTML = text;
        if (typeof textarea.value === 'string') return textarea.value;
        if (typeof textarea.textContent === 'string') return textarea.textContent;
      }
    }
    return text
      .replace(/&#x([0-9a-f]{1,6});/gi, (match, code) => decodeNumericCharacterReference(match, code, 16))
      .replace(/&#([0-9]{1,7});/g, (match, code) => decodeNumericCharacterReference(match, code, 10))
      .replace(/&(amp|lt|gt|quot|apos);/gi, (match, name) => BASIC_NAMED_ENTITIES[name.toLowerCase()] || match);
  }

  function codeSpanPlaceholder(index) {
    return `\uE000obs-code-span-${index}\uE001`;
  }

  function normalizeCodeSpanContent(value) {
    let text = normalizeMarkdownText(value).replace(/\n/g, ' ');
    if (/^ .* $/.test(text) && /[^ ]/.test(text)) text = text.slice(1, -1);
    return text;
  }

  function protectCodeSpans(value) {
    const source = String(value == null ? '' : value);
    const spans = [];
    let output = '';
    let index = 0;

    while (index < source.length) {
      if (source[index] !== '`') {
        output += source[index++];
        continue;
      }

      let openingEnd = index + 1;
      while (openingEnd < source.length && source[openingEnd] === '`') openingEnd += 1;
      const openingLength = openingEnd - index;
      let cursor = openingEnd;
      let closingStart = -1;
      let closingEnd = -1;

      while (cursor < source.length) {
        if (source[cursor] !== '`') {
          cursor += 1;
          continue;
        }
        let runEnd = cursor + 1;
        while (runEnd < source.length && source[runEnd] === '`') runEnd += 1;
        if (runEnd - cursor === openingLength) {
          closingStart = cursor;
          closingEnd = runEnd;
          break;
        }
        cursor = runEnd;
      }

      if (closingStart < 0) {
        output += source.slice(index, openingEnd);
        index = openingEnd;
        continue;
      }

      const token = codeSpanPlaceholder(spans.length);
      spans.push(normalizeCodeSpanContent(source.slice(openingEnd, closingStart)));
      output += token;
      index = closingEnd;
    }

    return { text: output, spans };
  }

  function restoreCodeSpans(value, spans) {
    let text = String(value == null ? '' : value);
    for (let index = 0; index < spans.length; index += 1) {
      text = text.split(codeSpanPlaceholder(index)).join(spans[index]);
    }
    return text;
  }

  function stripInlineMarkdown(value, options = {}) {
    const protectedCode = protectCodeSpans(String(value == null ? '' : value).trim());
    let text = protectedCode.text;
    text = text.replace(/[ \t]+#+[ \t]*$/, '').trim();
    text = text.replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1');
    text = text.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');
    text = text.replace(/!\[([^\]]*)\]\[[^\]]*\]/g, '$1');
    text = text.replace(/\[([^\]]+)\]\[[^\]]*\]/g, '$1');
    text = text.replace(/<[^>]+>/g, '');
    text = decodeHeadingEntities(text, options);
    text = text.replace(/\\([!"#$%&'()*+,\-./:;<=>?@[\]^_`{|}~\\])/g, '$1');
    text = text.replace(/[~*_]+/g, '');
    text = restoreCodeSpans(text, protectedCode.spans);
    return text.replace(/[ \t\n]+/g, ' ').trim();
  }

  function githubHeadingBaseAnchor(value, options = {}) {
    const text = stripInlineMarkdown(value, options).toLowerCase();
    return text
      .trim()
      .replace(/ /g, '-')
      .replace(/[^\p{L}\p{N}\p{M}_-]/gu, '');
  }

  function uniqueHeadingAnchor(base, used) {
    if (!base) return '';
    let candidate = base;
    let suffix = 1;
    while (used.has(candidate)) candidate = `${base}-${suffix++}`;
    used.add(candidate);
    return candidate;
  }

  function leadingSpaces(value) {
    const match = String(value || '').match(/^ */);
    return match ? match[0].length : 0;
  }

  function stripBlockQuotePrefix(line) {
    let rest = String(line == null ? '' : line);
    let depth = 0;
    while (true) {
      const match = rest.match(/^ {0,3}>[ \t]?/);
      if (!match) break;
      rest = rest.slice(match[0].length);
      depth += 1;
    }
    return { rest, depth };
  }

  function scanContainerLine(rawLine, state) {
    const quote = stripBlockQuotePrefix(rawLine);
    if (quote.depth !== state.quoteDepth) state.listIndents = [];
    state.quoteDepth = quote.depth;
    const rest = quote.rest;
    const blank = !rest.trim();
    if (blank) {
      return { content: '', key: `q${quote.depth}/l${state.listIndents.join('.')}`, blank: true, indentedCode: false };
    }

    const indent = leadingSpaces(rest);
    while (state.listIndents.length && indent < state.listIndents[state.listIndents.length - 1]) state.listIndents.pop();
    const base = state.listIndents.length ? state.listIndents[state.listIndents.length - 1] : 0;
    const afterBase = rest.slice(Math.min(base, rest.length));
    const list = afterBase.match(/^( {0,3})((?:[*+-])|(?:\d{1,9}[.)]))([ \t]{1,4})(.*)$/);
    if (list) {
      const contentIndent = base + list[1].length + list[2].length + list[3].length;
      state.listIndents.push(contentIndent);
      return {
        content: list[4],
        key: `q${quote.depth}/l${state.listIndents.join('.')}`,
        blank: !list[4].trim(),
        indentedCode: false
      };
    }

    if (!state.listIndents.length && indent >= 4) {
      return { content: rest, key: `q${quote.depth}/l`, blank: false, indentedCode: true };
    }

    return {
      content: state.listIndents.length ? rest.slice(base) : rest,
      key: `q${quote.depth}/l${state.listIndents.join('.')}`,
      blank: false,
      indentedCode: false
    };
  }

  function isThematicBreak(content) {
    const text = String(content || '').trim();
    if (!text) return false;
    return /^(?:\*\s*){3,}$/.test(text) || /^(?:_\s*){3,}$/.test(text) || /^(?:-\s*){3,}$/.test(text);
  }

  function canStartSetextParagraph(content) {
    const text = String(content || '');
    if (!text.trim()) return false;
    if (/^ {0,3}(?:`{3,}|~{3,})/.test(text)) return false;
    if (/^ {0,3}#{1,6}(?:[ \t]+|$)/.test(text)) return false;
    if (/^ {0,3}\[[^\]]+\]:/.test(text)) return false;
    if (/^ {0,3}<(?:address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul)(?:[ \t/>]|$)/i.test(text)) return false;
    if (isThematicBreak(text)) return false;
    return true;
  }

  function canLazyContinueContainerParagraph(rawLine) {
    const text = String(rawLine == null ? '' : rawLine);
    if (!text.trim() || /^(?: {4}|\t)/.test(text)) return false;
    if (/^ {0,3}>/.test(text)) return false;
    if (/^ {0,3}(?:`{3,}|~{3,})/.test(text)) return false;
    if (/^ {0,3}#{1,6}(?:[ \t]+|$)/.test(text)) return false;
    if (/^ {0,3}(?:(?:[*+-])|(?:\d{1,9}[.)]))(?:[ \t]+|$)/.test(text)) return false;
    if (/^ {0,3}(?:=+|-+)[ \t]*$/.test(text)) return false;
    if (/^ {0,3}\[[^\]]+\]:/.test(text)) return false;
    if (isThematicBreak(text)) return false;
    return canStartSetextParagraph(text);
  }

  function extractRepositoryMarkdownHeadings(markdown, options = {}) {
    const text = normalizeMarkdownText(markdown);
    const headings = [];
    const used = new Set();
    const state = { quoteDepth: 0, listIndents: [] };
    let fence = null;
    let paragraph = null;

    const appendHeading = (level, rawText) => {
      const displayText = stripInlineMarkdown(rawText, options);
      const base = githubHeadingBaseAnchor(rawText, options);
      const anchor = uniqueHeadingAnchor(base, used);
      if (!displayText || !anchor) return;
      headings.push({ level, text: displayText, anchor });
    };

    for (const rawLine of text.split('\n')) {
      const stateBeforeScan = { quoteDepth: state.quoteDepth, listIndents: [...state.listIndents] };
      let scanned = scanContainerLine(rawLine, state);
      if (paragraph && scanned.key !== paragraph.key && canLazyContinueContainerParagraph(rawLine)) {
        state.quoteDepth = stateBeforeScan.quoteDepth;
        state.listIndents = stateBeforeScan.listIndents;
        scanned = { content: String(rawLine).trim(), key: paragraph.key, blank: false, indentedCode: false };
      }
      const line = scanned.content;
      const opening = !scanned.indentedCode && line.match(/^ {0,3}(`{3,}|~{3,})(.*)$/);
      if (fence) {
        const closing = !scanned.indentedCode && scanned.key === fence.key && line.match(/^ {0,3}(`{3,}|~{3,})[ \t]*$/);
        if (closing && closing[1][0] === fence.char && closing[1].length >= fence.length) fence = null;
        paragraph = null;
        continue;
      }
      if (opening) {
        fence = { char: opening[1][0], length: opening[1].length, key: scanned.key };
        paragraph = null;
        continue;
      }
      if (scanned.indentedCode) {
        paragraph = null;
        continue;
      }
      if (scanned.blank) {
        paragraph = null;
        continue;
      }

      const atx = line.match(/^ {0,3}(#{1,6})(?:[ \t]+|$)(.*)$/);
      if (atx) {
        appendHeading(atx[1].length, atx[2]);
        paragraph = null;
        continue;
      }

      const setext = line.match(/^ {0,3}(=+|-+)[ \t]*$/);
      if (setext && !(setext[1] === '-')) {
        if (paragraph && paragraph.key === scanned.key && paragraph.lines.length) {
          appendHeading(setext[1][0] === '=' ? 1 : 2, paragraph.lines.join(' '));
        }
        paragraph = null;
        continue;
      }

      if (!canStartSetextParagraph(line)) {
        paragraph = null;
        continue;
      }
      if (paragraph && paragraph.key === scanned.key) paragraph.lines.push(line.trim());
      else paragraph = { key: scanned.key, lines: [line.trim()] };
    }
    return headings;
  }

  function normalizeRepositoryHeadingPath(path) {
    const text = String(path == null ? '' : path).replace(/\\/g, '/').trim().replace(/^\/+/, '');
    if (!text) throw new TypeError('Repository Markdown path is required.');
    if (/[?#\u0000-\u001f\u007f]/.test(text)) throw new TypeError('Repository Markdown path contains unsupported syntax.');
    const parts = text.split('/');
    if (parts.some((segment) => !segment || segment === '.' || segment === '..')) throw new TypeError('Repository Markdown path must remain inside the repository root.');
    return parts.join('/');
  }

  function encodeRepositoryRootPath(path) {
    return normalizeRepositoryHeadingPath(path).split('/').map((segment) => encodeURIComponent(segment).replace(/[!'()*]/g, (character) => `%${character.charCodeAt(0).toString(16).toUpperCase()}`)).join('/');
  }

  function escapeMarkdownLinkLabel(value) {
    return String(value == null ? '' : value).replace(/\\/g, '\\\\').replace(/\[/g, '\\[').replace(/\]/g, '\\]');
  }

  function repositoryRootHeadingTarget(path, anchor) {
    const normalizedAnchor = String(anchor == null ? '' : anchor).trim();
    if (!normalizedAnchor || /[\s#\u0000-\u001f\u007f]/.test(normalizedAnchor)) throw new TypeError('Repository heading anchor is invalid.');
    return `/${encodeRepositoryRootPath(path)}#${normalizedAnchor}`;
  }

  function repositoryRootHeadingMarkdownLink(path, heading) {
    if (!heading || !heading.text || !heading.anchor) throw new TypeError('Repository heading is required.');
    const target = repositoryRootHeadingTarget(path, heading.anchor);
    return `[${escapeMarkdownLinkLabel(heading.text)}](${target})`;
  }

  function repositoryHeadingLinksForPreview(preview, options = {}) {
    if (!preview || preview.kind !== 'text' || typeof preview.content !== 'string' || !/\.md(?:own)?$/i.test(String(preview.path || ''))) return [];
    return extractRepositoryMarkdownHeadings(preview.content, options).map((heading) => {
      const target = repositoryRootHeadingTarget(preview.path, heading.anchor);
      return { ...heading, target, markdown: repositoryRootHeadingMarkdownLink(preview.path, heading) };
    });
  }

  function writeTampermonkeyClipboardText(value, options = {}) {
    const writer = options.gmSetClipboard || (typeof GM_setClipboard === 'function' ? GM_setClipboard : null);
    const timeoutMs = Number.isFinite(Number(options.timeoutMs)) ? Math.max(1, Number(options.timeoutMs)) : 2000;
    const setTimeoutFn = options.setTimeoutFn || ((fn, ms) => setTimeout(fn, ms));
    const clearTimeoutFn = options.clearTimeoutFn || ((id) => clearTimeout(id));
    if (typeof writer !== 'function') return Promise.reject(new Error('GM_setClipboard is unavailable.'));

    return new Promise((resolve, reject) => {
      let settled = false;
      let timer = null;
      const finish = (error) => {
        if (settled) return;
        settled = true;
        if (timer != null) clearTimeoutFn(timer);
        if (error) reject(error);
        else resolve();
      };
      try {
        timer = setTimeoutFn(() => finish(new Error('Clipboard write was not confirmed.')), timeoutMs);
        writer(String(value == null ? '' : value), 'text', () => finish(null));
      } catch (error) {
        finish(error instanceof Error ? error : new Error(String(error)));
      }
    });
  }

  return {
    normalizeRepositoryHeadingPath,
    decodeRepositoryHeadingEntities: decodeHeadingEntities,
    stripRepositoryHeadingMarkdown: stripInlineMarkdown,
    githubHeadingBaseAnchor,
    extractRepositoryMarkdownHeadings,
    repositoryRootHeadingTarget,
    repositoryRootHeadingMarkdownLink,
    repositoryHeadingLinksForPreview,
    writeTampermonkeyClipboardText
  };
});

/* src/repository-files-workspace-core.js */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const DEFAULT_STRUCTURE_MAX_NODES = 100;
  const DEFAULT_COPY_MAX_FILES = 100;
  const DEFAULT_COPY_MAX_BYTES = 10 * 1024 * 1024;

  function normalizeSlashPath(value, options = {}) {
    const allowRoot = options.allowRoot !== false;
    const raw = String(value == null ? '' : value).replace(/\\/g, '/').trim();
    if (/^[a-zA-Z]:\//.test(raw) || raw.startsWith('/') || raw.startsWith('//') || /^file:\/\//i.test(raw) || raw.includes('://')) {
      throw new TypeError(`${options.label || 'Repository path'} must be repository-relative.`);
    }
    const text = raw.replace(/\/+$/g, '');
    if (!text) {
      if (allowRoot) return '';
      throw new TypeError(`${options.label || 'Repository path'} is required.`);
    }
    if (/[?#\u0000-\u001f\u007f]/.test(text)) throw new TypeError(`${options.label || 'Repository path'} contains unsupported syntax.`);
    const parts = text.split('/');
    if (parts.some((part) => !part || part === '.' || part === '..')) throw new TypeError(`${options.label || 'Repository path'} contains an empty, . or .. segment.`);
    return parts.join('/');
  }

  function joinRepositoryPath(parent, child) {
    const left = normalizeSlashPath(parent, { allowRoot: true });
    const right = normalizeSlashPath(child, { allowRoot: false });
    return left ? `${left}/${right}` : right;
  }

  function repositoryPathName(path) {
    const normalized = normalizeSlashPath(path, { allowRoot: false });
    return normalized.slice(normalized.lastIndexOf('/') + 1);
  }

  function repositoryPathParent(path) {
    const normalized = normalizeSlashPath(path, { allowRoot: false });
    const slash = normalized.lastIndexOf('/');
    return slash < 0 ? '' : normalized.slice(0, slash);
  }

  function folderIndexCandidate(path) {
    const normalized = normalizeSlashPath(path, { allowRoot: true });
    if (!normalized) return '';
    return `${normalized}/${repositoryPathName(normalized)}.md`;
  }

  function encodeRepositoryRootPath(path) {
    return normalizeSlashPath(path, { allowRoot: false }).split('/').map((segment) => encodeURIComponent(segment).replace(/[!'()*]/g, (character) => `%${character.charCodeAt(0).toString(16).toUpperCase()}`)).join('/');
  }

  function escapeMarkdownLinkLabel(value) {
    return String(value == null ? '' : value).replace(/\\/g, '\\\\').replace(/\[/g, '\\[').replace(/\]/g, '\\]');
  }

  function repositoryRootFileTarget(path) {
    return `/${encodeRepositoryRootPath(path)}`;
  }

  function repositoryRootFileMarkdownLink(path, label) {
    const normalized = normalizeSlashPath(path, { allowRoot: false });
    const display = String(label == null ? '' : label).trim() || repositoryPathName(normalized);
    return `[${escapeMarkdownLinkLabel(display)}](${repositoryRootFileTarget(normalized)})`;
  }

  function workspaceFilesPreferenceKey(workspace) {
    if (!workspace || !workspace.owner || !workspace.repo || !workspace.branch) throw new TypeError('Workspace repository identity is required.');
    const workspaceId = String(workspace.id || '').trim() || 'workspace';
    const owner = String(workspace.owner).trim().toLowerCase();
    const repo = String(workspace.repo).trim().replace(/\.git$/i, '').toLowerCase();
    const branch = String(workspace.branch || 'main').trim() || 'main';
    return `obsLinkedNotesPrototype:v2:filesWorkspace:${encodeURIComponent(workspaceId)}:${encodeURIComponent(owner)}:${encodeURIComponent(repo)}:${encodeURIComponent(branch)}`;
  }

  function slugId(value, fallback = 'preset') {
    const slug = String(value == null ? '' : value).trim().toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-+|-+$/g, '');
    return slug || fallback;
  }

  function normalizeFolderShortcut(input) {
    const name = String(input && input.name || '').trim();
    if (!name) throw new TypeError('Folder shortcut name is required.');
    const path = normalizeSlashPath(input && input.path, { allowRoot: false, label: 'Folder shortcut path' });
    return { id: String(input && input.id || '').trim() || slugId(`${name}-${path}`, 'folder'), name, path };
  }

  function normalizeDocumentPreset(input) {
    const name = String(input && input.name || '').trim();
    if (!name) throw new TypeError('Document preset name is required.');
    const categoryId = String(input && input.categoryId || '').trim();
    if (!categoryId) throw new TypeError('Document preset category ID is required.');
    const templatePath = normalizeSlashPath(input && input.templatePath, { allowRoot: false, label: 'Template path' });
    return { id: String(input && input.id || '').trim() || slugId(name, 'document'), name, categoryId, templatePath };
  }

  function normalizeFilesWorkspacePreferences(value) {
    const source = value && typeof value === 'object' ? value : {};
    const shortcuts = [];
    const shortcutIds = new Set();
    for (const raw of Array.isArray(source.folderShortcuts) ? source.folderShortcuts : []) {
      try {
        const item = normalizeFolderShortcut(raw);
        if (!shortcutIds.has(item.id)) { shortcutIds.add(item.id); shortcuts.push(item); }
      } catch (error) { /* invalid local preference is ignored */ }
    }
    const presets = [];
    const presetIds = new Set();
    for (const raw of Array.isArray(source.documentPresets) ? source.documentPresets : []) {
      try {
        const item = normalizeDocumentPreset(raw);
        if (!presetIds.has(item.id)) { presetIds.add(item.id); presets.push(item); }
      } catch (error) { /* invalid local preference is ignored */ }
    }
    return { schemaVersion: 1, folderShortcuts: shortcuts, documentPresets: presets };
  }

  function upsertPreferenceItem(items, next) {
    const output = Array.isArray(items) ? items.map((item) => ({ ...item })) : [];
    const index = output.findIndex((item) => item.id === next.id);
    if (index < 0) output.push(next); else output[index] = next;
    return output;
  }

  function parseRepositoryStructure(text, options = {}) {
    const maxNodes = Number(options.maxNodes) > 0 ? Number(options.maxNodes) : DEFAULT_STRUCTURE_MAX_NODES;
    const basePath = normalizeSlashPath(options.basePath || '', { allowRoot: true });
    const records = [];
    const seen = new Map();
    const lines = String(text == null ? '' : text).replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
    for (let index = 0; index < lines.length; index += 1) {
      const raw = lines[index].trim();
      if (!raw || raw.startsWith('#')) continue;
      const folder = raw.endsWith('/');
      const relative = normalizeSlashPath(folder ? raw.slice(0, -1) : raw, { allowRoot: false, label: `Structure line ${index + 1}` });
      const path = basePath ? `${basePath}/${relative}` : relative;
      const type = folder ? 'folder' : 'file';
      if (seen.has(path) && seen.get(path) !== type) throw new Error(`Structure path is both file and folder: ${relative}.`);
      if (seen.has(path)) continue;
      seen.set(path, type);
      records.push({ type, relativePath: relative, path, line: index + 1 });
      if (records.length > maxNodes) throw new Error(`Structure contains more than ${maxNodes} unique nodes.`);
    }
    if (!records.length) throw new Error('Structure is empty.');
    for (const record of records) {
      const parts = record.relativePath.split('/');
      for (let i = 1; i < parts.length; i += 1) {
        const relative = parts.slice(0, i).join('/');
        const path = basePath ? `${basePath}/${relative}` : relative;
        const known = seen.get(path);
        if (known === 'file') throw new Error(`Structure places content below a file: ${relative}.`);
        if (!known) {
          seen.set(path, 'folder');
          records.push({ type: 'folder', relativePath: relative, path, line: record.line, implicit: true });
          if (records.length > maxNodes) throw new Error(`Structure contains more than ${maxNodes} nodes including implicit folders.`);
        }
      }
    }
    records.sort((a, b) => a.path.localeCompare(b.path) || a.type.localeCompare(b.type));
    const filePaths = new Set(records.filter((record) => record.type === 'file').map((record) => record.path));
    const folderPaths = records.filter((record) => record.type === 'folder').map((record) => record.path);
    const leafFolders = folderPaths.filter((folderPath) => {
      const prefix = `${folderPath}/`;
      return !records.some((record) => record.path !== folderPath && record.path.startsWith(prefix));
    });
    return { basePath, records, files: [...filePaths].sort(), folders: [...new Set(folderPaths)].sort(), leafFolders: [...new Set(leafFolders)].sort(), source: String(text == null ? '' : text) };
  }

  function copyDestinationPath(sourceRoot, destinationRoot, sourcePath) {
    const source = normalizeSlashPath(sourceRoot, { allowRoot: false, label: 'Copy source root' });
    const destination = normalizeSlashPath(destinationRoot, { allowRoot: false, label: 'Copy destination root' });
    const target = normalizeSlashPath(sourcePath, { allowRoot: false, label: 'Copy source path' });
    if (target !== source && !target.startsWith(`${source}/`)) throw new Error(`Copy source path is outside source root: ${target}.`);
    const suffix = target === source ? '' : target.slice(source.length + 1);
    return suffix ? `${destination}/${suffix}` : destination;
  }

  function clampPopoverRect(anchorRect, containerRect, options = {}) {
    const margin = Number(options.margin) >= 0 ? Number(options.margin) : 8;
    const gap = Number(options.gap) >= 0 ? Number(options.gap) : 6;
    const maxWidth = Number(options.maxWidth) > 0 ? Number(options.maxWidth) : 520;
    const maxHeight = Number(options.maxHeight) > 0 ? Number(options.maxHeight) : 380;
    const availableWidth = Math.max(160, containerRect.width - margin * 2);
    const width = Math.min(maxWidth, availableWidth);
    const availableHeight = Math.max(140, containerRect.height - margin * 2);
    const height = Math.min(maxHeight, availableHeight);
    let left = anchorRect.left;
    left = Math.max(containerRect.left + margin, Math.min(left, containerRect.right - margin - width));
    let top = anchorRect.bottom + gap;
    if (top + height > containerRect.bottom - margin) top = Math.max(containerRect.top + margin, anchorRect.top - gap - height);
    return { left: Math.round(left), top: Math.round(top), width: Math.round(width), maxHeight: Math.round(height) };
  }

  return {
    DEFAULT_STRUCTURE_MAX_NODES,
    DEFAULT_COPY_MAX_FILES,
    DEFAULT_COPY_MAX_BYTES,
    normalizeFilesWorkspacePath: normalizeSlashPath,
    joinRepositoryFilesWorkspacePath: joinRepositoryPath,
    repositoryFilesWorkspacePathName: repositoryPathName,
    repositoryFilesWorkspacePathParent: repositoryPathParent,
    folderIndexCandidate,
    repositoryRootFileTarget,
    repositoryRootFileMarkdownLink,
    workspaceFilesPreferenceKey,
    normalizeFolderShortcut,
    normalizeDocumentPreset,
    normalizeFilesWorkspacePreferences,
    upsertFilesWorkspacePreferenceItem: upsertPreferenceItem,
    parseRepositoryStructure,
    copyDestinationPath,
    clampRepositoryLinkPopoverRect: clampPopoverRect
  };
});

/* src/repository-file-templates.js */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const DEFAULT_REPOSITORY_TEMPLATE_ROOT = '.linked-notes/templates';
  const DEFAULT_REPOSITORY_TEMPLATE_MAX_FILES = 100;
  const REPOSITORY_TEMPLATE_SUFFIX = '.template.md';
  const TEMPLATE_HEADER = '<!-- obs-template';

  function normalizeRepositoryTemplatePath(value, options = {}) {
    const allowRoot = Boolean(options.allowRoot);
    const raw = String(value == null ? '' : value).replace(/\\/g, '/').trim().replace(/\/+$/g, '');
    if (!raw) {
      if (allowRoot) return '';
      throw new TypeError('Repository template path is required.');
    }
    if (raw.startsWith('/') || /^[A-Za-z]:\//.test(raw) || raw.includes('://') || /[?#\u0000-\u001f\u007f]/.test(raw)) throw new TypeError('Repository template path must be repository-relative.');
    const parts = raw.split('/');
    if (parts.some((part) => !part || part === '.' || part === '..')) throw new TypeError('Repository template path contains an empty, . or .. segment.');
    return parts.join('/');
  }

  function normalizeRepositoryTemplateRoot(value = DEFAULT_REPOSITORY_TEMPLATE_ROOT) {
    return normalizeRepositoryTemplatePath(value);
  }

  function isRepositoryFileTemplatePath(path, options = {}) {
    let canonical;
    let rootPath;
    try {
      canonical = normalizeRepositoryTemplatePath(path);
      rootPath = normalizeRepositoryTemplateRoot(options.rootPath || DEFAULT_REPOSITORY_TEMPLATE_ROOT);
    } catch (error) { return false; }
    const prefix = `${rootPath}/`;
    if (!canonical.startsWith(prefix)) return false;
    const relative = canonical.slice(prefix.length);
    if (!relative || relative.includes('/')) return false;
    if (!relative.endsWith(REPOSITORY_TEMPLATE_SUFFIX)) return false;
    return relative.length > REPOSITORY_TEMPLATE_SUFFIX.length;
  }

  function normalizeRepositoryFileTemplateCandidatePath(path, options = {}) {
    const canonical = normalizeRepositoryTemplatePath(path);
    if (!isRepositoryFileTemplatePath(canonical, options)) throw new TypeError(`Template file must be a direct ${REPOSITORY_TEMPLATE_SUFFIX} child of ${normalizeRepositoryTemplateRoot(options.rootPath || DEFAULT_REPOSITORY_TEMPLATE_ROOT)}: ${canonical}.`);
    return canonical;
  }

  function repositoryTemplateNameKey(value) {
    return String(value == null ? '' : value).trim().toLowerCase();
  }

  function parseRepositoryTemplateMetadata(raw) {
    const metadata = {};
    const seen = new Set();
    const lines = String(raw == null ? '' : raw).split(/\r\n|\n|\r/);
    for (const sourceLine of lines) {
      const line = sourceLine.trim();
      if (!line) continue;
      const match = /^([A-Za-z][A-Za-z0-9_-]*):[ \t]*(.*)$/.exec(line);
      if (!match) throw new Error(`Invalid obs-template metadata line: ${sourceLine}.`);
      const key = match[1];
      const value = match[2].trim();
      if (key !== 'name') throw new Error(`Unsupported obs-template metadata field: ${key}.`);
      if (seen.has(key)) throw new Error(`Duplicate obs-template metadata field: ${key}.`);
      seen.add(key);
      metadata[key] = value;
    }
    if (!metadata.name) throw new Error('obs-template metadata requires a non-empty name field.');
    return { name: metadata.name };
  }

  function parseRepositoryFileTemplate(text, options = {}) {
    const source = String(text == null ? '' : text);
    const path = options.path ? normalizeRepositoryFileTemplateCandidatePath(options.path, options) : '';
    const bom = source.charCodeAt(0) === 0xFEFF ? 1 : 0;
    if (!source.startsWith(TEMPLATE_HEADER, bom)) throw new Error('Template file must start with an obs-template metadata block.');
    let metadataStart = bom + TEMPLATE_HEADER.length;
    if (source.startsWith('\r\n', metadataStart)) metadataStart += 2;
    else if (source[metadataStart] === '\n' || source[metadataStart] === '\r') metadataStart += 1;
    else throw new Error('obs-template opening marker must be followed by a newline.');
    const close = source.indexOf('-->', metadataStart);
    if (close < 0) throw new Error('obs-template metadata block is not closed.');
    const metadata = parseRepositoryTemplateMetadata(source.slice(metadataStart, close));
    let bodyStart = close + 3;
    if (source.startsWith('\r\n', bodyStart)) bodyStart += 2;
    else if (source[bodyStart] === '\n' || source[bodyStart] === '\r') bodyStart += 1;
    const body = source.slice(bodyStart);
    return {
      path,
      name: metadata.name,
      body,
      sha: String(options.sha || ''),
      metadataStart: bom,
      bodyStart
    };
  }

  function finalizeRepositoryFileTemplates(records) {
    const candidates = Array.isArray(records) ? records.filter(Boolean).map((record) => ({ ...record, name: String(record.name || '').trim(), path: String(record.path || '').trim() })) : [];
    const counts = new Map();
    for (const item of candidates) {
      const key = repositoryTemplateNameKey(item.name);
      if (!key) continue;
      counts.set(key, (counts.get(key) || 0) + 1);
    }
    const diagnostics = [];
    const templates = [];
    for (const item of candidates) {
      const key = repositoryTemplateNameKey(item.name);
      if (!key) {
        diagnostics.push({ path: item.path, kind: 'invalid_name', message: `Template ${item.path || '(unknown path)'} has no display name.` });
        continue;
      }
      if ((counts.get(key) || 0) > 1) {
        diagnostics.push({ path: item.path, kind: 'duplicate_name', message: `Duplicate template name "${item.name}". Rename one template metadata name before using it.` });
        continue;
      }
      templates.push(item);
    }
    templates.sort((left, right) => left.name.localeCompare(right.name) || left.path.localeCompare(right.path));
    diagnostics.sort((left, right) => String(left.path || '').localeCompare(String(right.path || '')) || String(left.message || '').localeCompare(String(right.message || '')));
    return { templates, diagnostics };
  }

  return {
    DEFAULT_REPOSITORY_TEMPLATE_ROOT,
    DEFAULT_REPOSITORY_TEMPLATE_MAX_FILES,
    REPOSITORY_TEMPLATE_SUFFIX,
    normalizeRepositoryTemplatePath,
    isRepositoryFileTemplatePath,
    normalizeRepositoryFileTemplateCandidatePath,
    parseRepositoryFileTemplate,
    finalizeRepositoryFileTemplates,
    repositoryTemplateNameKey
  };
});

/* src/reference-object-markers.js */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const REFERENCE_OBJECT_ID_PATTERN = /^ro_[A-Za-z0-9][A-Za-z0-9_-]{2,63}$/;
  const MARKER_TOKEN = /<!--\s*(\/?)obs-ref:(def|use)(?:\s+id="([^"]+)")?\s*-->/g;
  const MARKER_COMMENT = /<!--[\s\S]*?-->/g;

  function sourceText(value) {
    return String(value == null ? '' : value);
  }

  function markdownCodeRanges(text) {
    const ranges = [];
    const lineRanges = [];
    let start = 0;
    for (let index = 0; index <= text.length; index += 1) {
      if (index !== text.length && text[index] !== '\n' && text[index] !== '\r') continue;
      let end = index;
      let next = index;
      if (index < text.length && text[index] === '\r' && text[index + 1] === '\n') next = index + 2;
      else if (index < text.length) next = index + 1;
      lineRanges.push({ start, end, next });
      start = next;
      if (next > index) index = next - 1;
    }

    let fence = null;
    for (const line of lineRanges) {
      const value = text.slice(line.start, line.end);
      if (!fence) {
        const match = value.match(/^ {0,3}(`{3,}|~{3,})(.*)$/);
        if (!match) continue;
        fence = { start: line.start, char: match[1][0], length: match[1].length };
        continue;
      }
      const close = value.match(/^ {0,3}(`+|~+)[ \t]*$/);
      if (!close || close[1][0] !== fence.char || close[1].length < fence.length) continue;
      ranges.push([fence.start, line.next]);
      fence = null;
    }
    if (fence) ranges.push([fence.start, text.length]);

    const insideFence = (offset) => ranges.some(([rangeStart, rangeEnd]) => offset >= rangeStart && offset < rangeEnd);
    let index = 0;
    while (index < text.length) {
      if (insideFence(index) || text[index] !== '`') { index += 1; continue; }
      let runEnd = index + 1;
      while (runEnd < text.length && text[runEnd] === '`') runEnd += 1;
      const length = runEnd - index;
      let search = runEnd;
      let closeStart = -1;
      let closeEnd = -1;
      while (search < text.length) {
        if (insideFence(search) || text[search] !== '`') { search += 1; continue; }
        let candidateEnd = search + 1;
        while (candidateEnd < text.length && text[candidateEnd] === '`') candidateEnd += 1;
        if (candidateEnd - search === length) { closeStart = search; closeEnd = candidateEnd; break; }
        search = candidateEnd;
      }
      if (closeStart >= 0) {
        ranges.push([index, closeEnd]);
        index = closeEnd;
      } else {
        index = runEnd;
      }
    }
    ranges.sort((left, right) => left[0] - right[0]);
    return ranges;
  }

  function inRanges(offset, ranges) {
    return ranges.some(([start, end]) => offset >= start && offset < end);
  }

  function normalizeReferenceObjectId(value) {
    const id = String(value == null ? '' : value).trim();
    if (!REFERENCE_OBJECT_ID_PATTERN.test(id)) throw new TypeError(`Invalid Reference Object id: ${id || '(empty)'}.`);
    return id;
  }

  function randomHex(length, randomSource) {
    if (typeof randomSource === 'function') {
      const supplied = String(randomSource(length) || '').replace(/[^A-Fa-f0-9]/g, '').toLowerCase();
      if (supplied.length >= length) return supplied.slice(0, length);
    }
    const cryptoObject = typeof globalThis !== 'undefined' ? globalThis.crypto : null;
    if (cryptoObject && typeof cryptoObject.getRandomValues === 'function') {
      const bytes = new Uint8Array(Math.ceil(length / 2));
      cryptoObject.getRandomValues(bytes);
      return [...bytes].map((byte) => byte.toString(16).padStart(2, '0')).join('').slice(0, length);
    }
    let output = '';
    while (output.length < length) output += Math.floor(Math.random() * 0x100000000).toString(16).padStart(8, '0');
    return output.slice(0, length);
  }

  function createReferenceObjectId(randomSource) {
    return `ro_${randomHex(12, randomSource)}`;
  }

  function formatReferenceDefinition(id, value) {
    const stableId = normalizeReferenceObjectId(id);
    return `<!-- obs-ref:def id="${stableId}" -->${String(value == null ? '' : value)}<!-- /obs-ref:def -->`;
  }

  function formatReferenceUse(id, value) {
    const stableId = normalizeReferenceObjectId(id);
    return `<!-- obs-ref:use id="${stableId}" -->${String(value == null ? '' : value)}<!-- /obs-ref:use -->`;
  }

  function lineStarts(text) {
    const starts = [0];
    for (let index = 0; index < text.length; index += 1) {
      if (text[index] === '\r') {
        if (text[index + 1] === '\n') index += 1;
        starts.push(index + 1);
      } else if (text[index] === '\n') starts.push(index + 1);
    }
    return starts;
  }

  function positionForOffset(starts, offset) {
    let low = 0;
    let high = starts.length - 1;
    while (low <= high) {
      const middle = (low + high) >> 1;
      if (starts[middle] <= offset) low = middle + 1;
      else high = middle - 1;
    }
    const index = Math.max(0, high);
    return { line: index + 1, column: offset - starts[index] + 1 };
  }

  function parseReferenceMarkers(input) {
    const text = sourceText(input);
    const starts = lineStarts(text);
    const codeRanges = markdownCodeRanges(text);
    const tokens = [];
    const recognizedCommentStarts = new Set();
    MARKER_TOKEN.lastIndex = 0;
    let match;
    while ((match = MARKER_TOKEN.exec(text))) {
      if (inRanges(match.index, codeRanges)) continue;
      const closing = Boolean(match[1]);
      const role = match[2];
      const id = String(match[3] || '').trim();
      recognizedCommentStarts.add(match.index);
      tokens.push({ start: match.index, end: MARKER_TOKEN.lastIndex, closing, role, id, raw: match[0] });
    }

    const diagnostics = [];
    MARKER_COMMENT.lastIndex = 0;
    while ((match = MARKER_COMMENT.exec(text))) {
      if (inRanges(match.index, codeRanges)) continue;
      if (!/obs-ref:/i.test(match[0])) continue;
      if (recognizedCommentStarts.has(match.index)) continue;
      const pos = positionForOffset(starts, match.index);
      diagnostics.push({ kind: 'malformed_marker', offset: match.index, line: pos.line, column: pos.column, message: 'Malformed obs-ref marker comment.' });
    }

    const occurrences = [];
    let active = null;
    for (const token of tokens) {
      const pos = positionForOffset(starts, token.start);
      if (!token.closing) {
        if (!token.id || !REFERENCE_OBJECT_ID_PATTERN.test(token.id)) {
          diagnostics.push({ kind: 'invalid_id', offset: token.start, line: pos.line, column: pos.column, message: `Invalid ${token.role} Reference Object id.` });
        }
        if (active) {
          diagnostics.push({ kind: 'nested_marker', offset: token.start, line: pos.line, column: pos.column, message: `Nested obs-ref:${token.role} marker inside obs-ref:${active.role} is not supported.` });
          continue;
        }
        active = token;
        continue;
      }
      if (!active) {
        diagnostics.push({ kind: 'unexpected_close', offset: token.start, line: pos.line, column: pos.column, message: `Closing obs-ref:${token.role} has no matching opener.` });
        continue;
      }
      if (active.role !== token.role) {
        diagnostics.push({ kind: 'mismatched_close', offset: token.start, line: pos.line, column: pos.column, message: `Closing obs-ref:${token.role} does not match open obs-ref:${active.role}.` });
        active = null;
        continue;
      }
      const openPos = positionForOffset(starts, active.start);
      occurrences.push({
        role: active.role,
        id: active.id,
        fullStart: active.start,
        fullEnd: token.end,
        openStart: active.start,
        openEnd: active.end,
        contentStart: active.end,
        contentEnd: token.start,
        closeStart: token.start,
        closeEnd: token.end,
        value: text.slice(active.end, token.start),
        line: openPos.line,
        column: openPos.column,
        lineOccurrence: 0
      });
      active = null;
    }
    if (active) {
      const pos = positionForOffset(starts, active.start);
      diagnostics.push({ kind: 'unclosed_marker', offset: active.start, line: pos.line, column: pos.column, message: `Open obs-ref:${active.role} marker is not closed.` });
    }

    const perLine = new Map();
    occurrences.sort((left, right) => left.fullStart - right.fullStart);
    for (const occurrence of occurrences) {
      const key = `${occurrence.role}\u0000${occurrence.id}\u0000${occurrence.line}`;
      const next = (perLine.get(key) || 0) + 1;
      perLine.set(key, next);
      occurrence.lineOccurrence = next;
    }
    return { text, occurrences, diagnostics, codeRanges };
  }

  function overlapsRange(start, end, rangeStart, rangeEnd) {
    return start < rangeEnd && end > rangeStart;
  }

  function findExactReferenceObjectCandidates(input, exactValue, options = {}) {
    const text = sourceText(input);
    const needle = String(exactValue == null ? '' : exactValue);
    if (!needle) throw new TypeError('Paste a non-empty exact value to find Reference Object candidates.');
    const parsed = parseReferenceMarkers(text);
    if (parsed.diagnostics.length && options.allowMalformed !== true) {
      const error = new Error('Current file contains malformed Reference Object markers. Validate or repair markers before creating another definition.');
      error.kind = 'reference_marker_invalid';
      error.diagnostics = parsed.diagnostics;
      throw error;
    }
    const blockedRanges = [...parsed.codeRanges, ...parsed.occurrences.map((item) => [item.fullStart, item.fullEnd])];
    const starts = lineStarts(text);
    const candidates = [];
    let offset = 0;
    while (offset <= text.length - needle.length) {
      const found = text.indexOf(needle, offset);
      if (found < 0) break;
      const end = found + needle.length;
      if (!blockedRanges.some(([rangeStart, rangeEnd]) => overlapsRange(found, end, rangeStart, rangeEnd))) {
        const pos = positionForOffset(starts, found);
        const lineStart = starts[pos.line - 1];
        const nextLineStart = pos.line < starts.length ? starts[pos.line] : text.length;
        let lineEnd = nextLineStart;
        if (lineEnd > lineStart && text[lineEnd - 1] === '\n') lineEnd -= 1;
        if (lineEnd > lineStart && text[lineEnd - 1] === '\r') lineEnd -= 1;
        candidates.push({
          start: found,
          end,
          value: needle,
          line: pos.line,
          column: pos.column,
          lineOccurrence: 0,
          lineText: text.slice(lineStart, lineEnd),
          lineMatchStart: found - lineStart,
          lineMatchEnd: end <= lineEnd ? end - lineStart : Math.max(0, lineEnd - lineStart),
          multiline: needle.includes('\n')
        });
      }
      offset = found + Math.max(needle.length, 1);
    }
    const perLine = new Map();
    for (const candidate of candidates) {
      const next = (perLine.get(candidate.line) || 0) + 1;
      perLine.set(candidate.line, next);
      candidate.lineOccurrence = next;
    }
    return candidates;
  }

  function wrapReferenceDefinitionAtCandidate(input, candidate, id) {
    const text = sourceText(input);
    const stableId = normalizeReferenceObjectId(id);
    const start = Number(candidate && candidate.start);
    const end = Number(candidate && candidate.end);
    if (!Number.isInteger(start) || !Number.isInteger(end) || start < 0 || end <= start || end > text.length) throw new TypeError('A valid exact occurrence must be selected.');
    const parsed = parseReferenceMarkers(text);
    if (parsed.diagnostics.length) throw new Error('Current file contains malformed Reference Object markers.');
    if (parsed.occurrences.some((item) => overlapsRange(start, end, item.fullStart, item.fullEnd))) throw new Error('Selected occurrence overlaps an existing Reference Object marker.');
    const value = text.slice(start, end);
    if (candidate && Object.prototype.hasOwnProperty.call(candidate, 'value') && String(candidate.value) !== value) throw new Error('Selected exact occurrence changed. Find candidates again.');
    return `${text.slice(0, start)}${formatReferenceDefinition(stableId, value)}${text.slice(end)}`;
  }

  function replaceReferenceOccurrenceValues(input, replacements) {
    let text = sourceText(input);
    const ordered = (Array.isArray(replacements) ? replacements : []).map((item) => ({
      start: Number(item && item.contentStart),
      end: Number(item && item.contentEnd),
      value: String(item && item.value == null ? '' : item.value)
    })).sort((left, right) => right.start - left.start);
    let previousStart = text.length + 1;
    for (const item of ordered) {
      if (!Number.isInteger(item.start) || !Number.isInteger(item.end) || item.start < 0 || item.end < item.start || item.end > text.length) throw new TypeError('Reference occurrence replacement range is invalid.');
      if (item.end > previousStart) throw new Error('Reference occurrence replacement ranges overlap.');
      text = `${text.slice(0, item.start)}${item.value}${text.slice(item.end)}`;
      previousStart = item.start;
    }
    return text;
  }

  function referenceDefinitionsById(input, id) {
    const stableId = normalizeReferenceObjectId(id);
    return parseReferenceMarkers(input).occurrences.filter((item) => item.role === 'def' && item.id === stableId);
  }

  function referenceUsesById(input, id) {
    const stableId = normalizeReferenceObjectId(id);
    return parseReferenceMarkers(input).occurrences.filter((item) => item.role === 'use' && item.id === stableId);
  }

  return {
    REFERENCE_OBJECT_ID_PATTERN,
    markdownCodeRanges,
    normalizeReferenceObjectId,
    createReferenceObjectId,
    formatReferenceDefinition,
    formatReferenceUse,
    parseReferenceMarkers,
    findExactReferenceObjectCandidates,
    wrapReferenceDefinitionAtCandidate,
    replaceReferenceOccurrenceValues,
    referenceDefinitionsById,
    referenceUsesById
  };
});

/* src/ordered-reference-list-markers.js */
(function (root, factory) {
  const api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function (root) {
  'use strict';

  const ORDERED_LIST_ID_PATTERN = /^orl_[a-f0-9]{12}$/;
  const ORDERED_ITEM_ID_PATTERN = /^ori_[a-f0-9]{12}$/;
  const LIST_COMMENT = /<!--\s*obs-order:list\b([\s\S]*?)-->/gi;
  const ITEM_TOKEN = /<!--\s*(\/)?obs-order:item\b([\s\S]*?)-->/gi;

  function attrs(text) {
    const result = {};
    const pattern = /([a-z][a-z0-9-]*)\s*=\s*"([^"]*)"/gi;
    let match;
    while ((match = pattern.exec(String(text || '')))) result[match[1].toLowerCase()] = match[2];
    return result;
  }

  function randomHex(length, randomSource) {
    const supplied = typeof randomSource === 'function' ? String(randomSource(length) || '').replace(/[^a-f0-9]/gi, '').toLowerCase() : '';
    if (supplied.length >= length) return supplied.slice(0, length);
    const cryptoObject = typeof globalThis !== 'undefined' ? globalThis.crypto : null;
    if (cryptoObject && typeof cryptoObject.getRandomValues === 'function') {
      const bytes = new Uint8Array(Math.ceil(length / 2));
      cryptoObject.getRandomValues(bytes);
      return [...bytes].map((byte) => byte.toString(16).padStart(2, '0')).join('').slice(0, length);
    }
    let output = '';
    while (output.length < length) output += Math.floor(Math.random() * 0x100000000).toString(16).padStart(8, '0');
    return output.slice(0, length);
  }

  function normalizeId(value, pattern, label) {
    const id = String(value == null ? '' : value).trim();
    if (!pattern.test(id)) throw new TypeError(`Invalid ${label} id: ${id || '(empty)'}.`);
    return id;
  }

  function createOrderedReferenceListId(randomSource) { return `orl_${randomHex(12, randomSource)}`; }
  function createOrderedReferenceItemId(randomSource) { return `ori_${randomHex(12, randomSource)}`; }

  function normalizeOrderedSortMode(value) {
    const mode = String(value || 'natural').trim().toLowerCase();
    if (!['number', 'alphabetical', 'natural', 'custom'].includes(mode)) throw new TypeError(`Unsupported Ordered Reference List sort mode: ${mode}.`);
    return mode;
  }

  function formatOrderedReferenceListMarker(input = {}) {
    const id = normalizeId(input.id, ORDERED_LIST_ID_PATTERN, 'Ordered Reference List');
    const mode = normalizeOrderedSortMode(input.mode);
    const locale = String(input.locale || 'und').replace(/[^A-Za-z0-9-]/g, '') || 'und';
    return `<!-- obs-order:list id="${id}" mode="${mode}" locale="${locale}" -->`;
  }

  function formatOrderedReferenceItemOpen(input = {}) {
    const id = normalizeId(input.id, ORDERED_ITEM_ID_PATTERN, 'Ordered Reference Item');
    const list = normalizeId(input.list, ORDERED_LIST_ID_PATTERN, 'Ordered Reference List');
    const ref = String(input.ref || '').trim();
    if (!/^ro_[a-f0-9]{12}$/.test(ref)) throw new TypeError(`Invalid Reference Object id for Ordered Item: ${ref || '(empty)'}.`);
    const unit = input.unit === 'paragraph' ? 'paragraph' : input.unit === 'line' ? 'line' : '';
    if (!unit) throw new TypeError('Ordered Reference Item unit must be line or paragraph.');
    return `<!-- obs-order:item id="${id}" list="${list}" unit="${unit}" ref="${ref}" -->`;
  }

  function formatOrderedReferenceItem(input = {}, content = '') {
    return `${formatOrderedReferenceItemOpen(input)}${String(content == null ? '' : content)}<!-- /obs-order:item -->`;
  }

  function codeRanges(text) {
    const api = root.ObsLinkedNotes || {};
    return typeof api.markdownCodeRanges === 'function' ? api.markdownCodeRanges(text) : [];
  }

  function inRanges(offset, ranges) { return ranges.some(([start, end]) => offset >= start && offset < end); }

  function parseOrderedReferenceLists(input) {
    const text = String(input == null ? '' : input);
    const blocked = codeRanges(text);
    const diagnostics = [];
    const lists = [];
    const items = [];
    const seenLists = new Set();
    const seenItems = new Set();
    const recognizedStarts = new Set();
    let match;
    LIST_COMMENT.lastIndex = 0;
    while ((match = LIST_COMMENT.exec(text))) {
      if (inRanges(match.index, blocked)) continue;
      recognizedStarts.add(match.index);
      const values = attrs(match[1]);
      if (!ORDERED_LIST_ID_PATTERN.test(values.id || '') || !['number', 'alphabetical', 'natural', 'custom'].includes(values.mode || '')) {
        diagnostics.push({ kind: 'malformed_list', offset: match.index, message: 'Ordered Reference List marker requires valid id and mode.' });
        continue;
      }
      if (seenLists.has(values.id)) diagnostics.push({ kind: 'duplicate_list', offset: match.index, listId: values.id, message: `Duplicate Ordered Reference List marker ${values.id}.` });
      seenLists.add(values.id);
      lists.push({ id: values.id, mode: values.mode, locale: values.locale || 'und', fullStart: match.index, fullEnd: LIST_COMMENT.lastIndex });
    }

    let active = null;
    ITEM_TOKEN.lastIndex = 0;
    while ((match = ITEM_TOKEN.exec(text))) {
      if (inRanges(match.index, blocked)) continue;
      recognizedStarts.add(match.index);
      const closing = Boolean(match[1]);
      if (!closing) {
        if (active) {
          diagnostics.push({ kind: 'nested_item', offset: match.index, message: 'Ordered Reference Items cannot be nested.' });
          continue;
        }
        const values = attrs(match[2]);
        if (!ORDERED_ITEM_ID_PATTERN.test(values.id || '') || !ORDERED_LIST_ID_PATTERN.test(values.list || '') || !/^ro_[a-f0-9]{12}$/.test(values.ref || '') || !['line', 'paragraph'].includes(values.unit || '')) {
          diagnostics.push({ kind: 'malformed_item', offset: match.index, message: 'Ordered Reference Item marker requires valid id, list, unit and ref.' });
        }
        active = { values, fullStart: match.index, openEnd: ITEM_TOKEN.lastIndex };
      } else if (!active) {
        diagnostics.push({ kind: 'unexpected_item_close', offset: match.index, message: 'Closing Ordered Reference Item has no opener.' });
      } else {
        const item = {
          id: active.values.id || '', listId: active.values.list || '', unit: active.values.unit || '', refId: active.values.ref || '',
          fullStart: active.fullStart, fullEnd: ITEM_TOKEN.lastIndex, contentStart: active.openEnd, contentEnd: match.index,
          content: text.slice(active.openEnd, match.index)
        };
        if (seenItems.has(item.id)) diagnostics.push({ kind: 'duplicate_item', offset: item.fullStart, itemId: item.id, message: `Duplicate Ordered Reference Item id ${item.id}.` });
        seenItems.add(item.id);
        items.push(item);
        active = null;
      }
    }
    if (active) diagnostics.push({ kind: 'unclosed_item', offset: active.fullStart, message: 'Ordered Reference Item is not closed.' });
    const comments = /<!--[\s\S]*?-->/g;
    while ((match = comments.exec(text))) {
      if (inRanges(match.index, blocked) || !/obs-order:/i.test(match[0]) || recognizedStarts.has(match.index)) continue;
      diagnostics.push({ kind: 'malformed_ordered_marker', offset: match.index, message: 'Malformed obs-order marker comment.' });
    }
    for (const item of items) if (!seenLists.has(item.listId)) diagnostics.push({ kind: 'unknown_list', offset: item.fullStart, itemId: item.id, listId: item.listId, message: `Ordered Reference Item refers to missing list ${item.listId}.` });
    return { text, lists, items, diagnostics, codeRanges: blocked };
  }

  return {
    ORDERED_LIST_ID_PATTERN,
    ORDERED_ITEM_ID_PATTERN,
    createOrderedReferenceListId,
    createOrderedReferenceItemId,
    normalizeOrderedSortMode,
    formatOrderedReferenceListMarker,
    formatOrderedReferenceItemOpen,
    formatOrderedReferenceItem,
    parseOrderedReferenceLists
  };
});

/* src/ordered-reference-list-core.js */
(function (root, factory) {
  const api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function (root) {
  'use strict';

  function dependencies() {
    const api = root.ObsLinkedNotes || {};
    for (const name of ['parseReferenceMarkers', 'parseOrderedReferenceLists', 'createOrderedReferenceListId', 'createOrderedReferenceItemId', 'formatOrderedReferenceListMarker', 'formatOrderedReferenceItem']) {
      if (typeof api[name] !== 'function') throw new Error(`Ordered Reference List dependency is unavailable: ${name}.`);
    }
    return api;
  }

  function lineBounds(text, offset) {
    let start = Math.max(0, Math.min(text.length, Number(offset) || 0));
    while (start > 0 && text[start - 1] !== '\n' && text[start - 1] !== '\r') start -= 1;
    let end = start;
    while (end < text.length && text[end] !== '\n' && text[end] !== '\r') end += 1;
    return { start, end };
  }

  function previousLine(text, start) {
    if (start <= 0) return null;
    let end = start;
    if (text[end - 1] === '\n') {
      end -= 1;
      if (end > 0 && text[end - 1] === '\r') end -= 1;
    } else if (text[end - 1] === '\r') {
      end -= 1;
    }
    let lineStart = end;
    while (lineStart > 0 && text[lineStart - 1] !== '\n' && text[lineStart - 1] !== '\r') lineStart -= 1;
    return { start: lineStart, end };
  }

  function nextLine(text, end) {
    let start = end;
    if (text[start] === '\r') start += 1;
    if (text[start] === '\n') start += 1;
    return start < text.length ? lineBounds(text, start) : null;
  }

  function paragraphBounds(text, offset) {
    let current = lineBounds(text, offset);
    if (!text.slice(current.start, current.end).trim()) throw new Error('A Reference Object use on a blank line cannot define an Ordered paragraph item.');
    let start = current.start;
    let end = current.end;
    let prior = previousLine(text, start);
    while (prior && text.slice(prior.start, prior.end).trim()) { start = prior.start; prior = previousLine(text, start); }
    let following = nextLine(text, end);
    while (following && text.slice(following.start, following.end).trim()) { end = following.end; following = nextLine(text, end); }
    return { start, end };
  }

  function orderedReferenceUnitRange(text, occurrence, unit) {
    if (!occurrence || occurrence.role !== 'use') throw new Error('Select a Reference Object use occurrence.');
    const range = unit === 'paragraph' ? paragraphBounds(text, occurrence.fullStart) : lineBounds(text, occurrence.fullStart);
    if (occurrence.fullStart < range.start || occurrence.fullEnd > range.end) throw new Error(`Selected Reference Object use does not fit its ${unit} range.`);
    return { ...range, unit: unit === 'paragraph' ? 'paragraph' : 'line' };
  }

  function containerSignature(content) {
    const first = String(content || '').split(/\r?\n/, 1)[0];
    const match = first.match(/^(\s*(?:(?:>\s*)|(?:[-+*]\s+)|(?:\d+[.)]\s+))*)/);
    return String(match && match[1] || '').replace(/\d+(?=[.)])/g, '#');
  }

  function createOrderedReferenceList(input = {}) {
    const api = dependencies();
    const text = String(input.content == null ? '' : input.content);
    const parsedRefs = api.parseReferenceMarkers(text);
    const parsedOrdered = api.parseOrderedReferenceLists(text);
    if (parsedRefs.diagnostics.length) throw new Error('Repair malformed Reference Object markers before creating an Ordered Reference List.');
    if (parsedOrdered.diagnostics.length) throw new Error('Repair malformed Ordered Reference List markers before creating another list.');
    const selected = Array.isArray(input.selectedUses) ? input.selectedUses : [];
    if (!selected.length) throw new Error('Select at least one Reference Object use.');
    const listId = input.listId || api.createOrderedReferenceListId(input.randomSource);
    if (parsedOrdered.lists.some((list) => list.id === listId)) throw new Error(`Ordered Reference List id already exists: ${listId}.`);
    const mode = api.normalizeOrderedSortMode(input.mode || 'natural');
    const ranges = [];
    const warnings = [];
    const usedItemIds = new Set(parsedOrdered.items.map((item) => item.id));
    for (const selection of selected) {
      const occurrence = parsedRefs.occurrences.find((item) => item.role === 'use' && item.fullStart === Number(selection.fullStart));
      if (!occurrence) throw new Error('A selected Reference Object use no longer exists at the checked location.');
      const range = orderedReferenceUnitRange(text, occurrence, selection.unit === 'paragraph' ? 'paragraph' : 'line');
      const usesInRange = parsedRefs.occurrences.filter((item) => item.role === 'use' && item.fullStart >= range.start && item.fullEnd <= range.end);
      if (usesInRange.length !== 1) throw new Error(`Each Ordered Item ${range.unit} must contain exactly one Reference Object use.`);
      if (parsedOrdered.items.some((item) => range.start < item.fullEnd && range.end > item.fullStart)) throw new Error('Selected content is already inside an Ordered Reference Item.');
      const freshness = String(selection.freshness || 'unknown');
      if (freshness !== 'current') warnings.push({ kind: 'stale_or_unresolved_use', refId: occurrence.id, offset: occurrence.fullStart, freshness, message: `Ordered Item was created with a ${freshness} Reference Object use; ordering stays blocked until refreshed.` });
      let itemId = '';
      for (let attempt = 0; attempt < 8 && !itemId; attempt += 1) {
        const candidate = api.createOrderedReferenceItemId(input.randomSource);
        if (!usedItemIds.has(candidate)) itemId = candidate;
      }
      if (!itemId) throw new Error('Could not allocate a unique Ordered Reference Item id.');
      usedItemIds.add(itemId);
      ranges.push({ ...range, refId: occurrence.id, occurrence, freshness, itemId });
    }
    ranges.sort((left, right) => left.start - right.start);
    for (let index = 1; index < ranges.length; index += 1) if (ranges[index].start < ranges[index - 1].end) throw new Error('Selected Ordered Item ranges overlap. Choose one Reference Object use per line or paragraph.');
    const signatures = new Set(ranges.map((range) => containerSignature(text.slice(range.start, range.end))));
    if (signatures.size > 1) throw new Error('Selected Ordered Items use incompatible Markdown container prefixes.');
    let output = text;
    for (const range of [...ranges].reverse()) {
      const wrapped = api.formatOrderedReferenceItem({ id: range.itemId, list: listId, unit: range.unit, ref: range.refId }, text.slice(range.start, range.end));
      output = `${output.slice(0, range.start)}${wrapped}${output.slice(range.end)}`;
    }
    const insertion = ranges[0].start;
    const eol = text.includes('\r\n') ? '\r\n' : '\n';
    const separator = ranges[0].unit === 'paragraph' ? `${eol}${eol}` : eol;
    output = `${output.slice(0, insertion)}${api.formatOrderedReferenceListMarker({ id: listId, mode, locale: input.locale || 'und' })}${separator}${output.slice(insertion)}`;
    return { kind: 'ordered-reference-list-create-v1', content: output, listId, mode, itemCount: ranges.length, warnings };
  }

  function validateItemUnit(text, item) {
    const bounds = item.unit === 'paragraph' ? paragraphBounds(text, item.fullStart) : lineBounds(text, item.fullStart);
    return bounds.start === item.fullStart && bounds.end === item.fullEnd;
  }

  function inspectOrderedReferenceList(content, listId, options = {}) {
    const api = dependencies();
    const text = String(content == null ? '' : content);
    const parsed = api.parseOrderedReferenceLists(text);
    const list = parsed.lists.find((item) => item.id === listId);
    if (!list) throw new Error(`Ordered Reference List not found: ${listId}.`);
    const items = parsed.items.filter((item) => item.listId === listId).sort((left, right) => left.fullStart - right.fullStart);
    const diagnostics = [...parsed.diagnostics];
    const currentValues = options.currentValues instanceof Map ? options.currentValues : new Map(Object.entries(options.currentValues || {}));
    for (const item of items) {
      const references = api.parseReferenceMarkers(item.content);
      const uses = references.occurrences.filter((occurrence) => occurrence.role === 'use');
      if (references.diagnostics.length || uses.length !== 1 || uses[0] && uses[0].id !== item.refId) diagnostics.push({ kind: 'invalid_item_reference', itemId: item.id, message: 'Ordered Item must contain exactly its declared Reference Object use.' });
      if (!validateItemUnit(text, item)) diagnostics.push({ kind: 'invalid_item_unit', itemId: item.id, message: `Ordered Item does not occupy exactly one ${item.unit}.` });
      const expected = currentValues.get(item.refId);
      item.sortValue = expected == null ? uses[0] && uses[0].value || '' : String(expected);
      item.freshness = expected == null ? 'unresolved' : uses[0] && uses[0].value === String(expected) ? 'current' : 'stale';
      if (item.freshness !== 'current') diagnostics.push({ kind: 'stale_ordered_reference_use', itemId: item.id, refId: item.refId, message: `Ordered Item ${item.id} has a ${item.freshness} Reference Object use.` });
    }
    const signatures = new Set(items.map((item) => containerSignature(item.content)));
    if (signatures.size > 1) diagnostics.push({ kind: 'incompatible_item_containers', listId, message: 'Ordered Items use incompatible Markdown container prefixes.' });
    return { kind: 'ordered-reference-list-inspection-v1', list, items, diagnostics, blocked: diagnostics.length > 0 };
  }

  function comparatorFor(list, options = {}) {
    const locale = list.locale === 'und' ? undefined : list.locale;
    if (list.mode === 'number') return (left, right) => {
      const a = String(left.sortValue).match(/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))/);
      const b = String(right.sortValue).match(/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))/);
      if (!a || !b) { const error = new Error('Number ordering requires every current Reference Object value to start with a number.'); error.kind = 'ordered_number_guard'; throw error; }
      return Number(a[1]) - Number(b[1]);
    };
    if (list.mode === 'alphabetical') {
      const collator = new Intl.Collator(locale, { numeric: false, sensitivity: 'base' });
      return (left, right) => collator.compare(String(left.sortValue), String(right.sortValue));
    }
    if (list.mode === 'custom') {
      const order = Array.isArray(options.customOrder) ? options.customOrder.map(String) : [];
      if (!order.length) throw new Error('Custom ordering requires an explicit ordered list of exact current values; executable comparator code is not accepted.');
      const ranks = new Map();
      order.forEach((value, index) => { if (!ranks.has(value)) ranks.set(value, index); });
      return (left, right) => {
        if (!ranks.has(String(left.sortValue)) || !ranks.has(String(right.sortValue))) { const error = new Error('Custom ordering must include every exact current Reference Object value.'); error.kind = 'ordered_custom_guard'; throw error; }
        const a = ranks.get(String(left.sortValue));
        const b = ranks.get(String(right.sortValue));
        return a - b;
      };
    }
    const collator = new Intl.Collator(locale, { numeric: true, sensitivity: 'base' });
    return (left, right) => collator.compare(String(left.sortValue), String(right.sortValue));
  }

  function orderOrderedReferenceList(content, listId, options = {}) {
    const text = String(content == null ? '' : content);
    const inspection = inspectOrderedReferenceList(text, listId, options);
    if (inspection.blocked) { const error = new Error('Ordered Reference List has stale, unresolved or structurally invalid items. Refresh/repair them before ordering.'); error.kind = 'ordered_list_blocked'; error.diagnostics = inspection.diagnostics; throw error; }
    const compare = comparatorFor(inspection.list, options);
    const ranked = inspection.items.map((item, index) => ({ item, index }));
    for (const entry of ranked) compare(entry.item, entry.item);
    ranked.sort((left, right) => compare(left.item, right.item) || left.index - right.index);
    const blocks = ranked.map(({ item }) => text.slice(item.fullStart, item.fullEnd));
    let output = text;
    for (let index = inspection.items.length - 1; index >= 0; index -= 1) {
      const slot = inspection.items[index];
      output = `${output.slice(0, slot.fullStart)}${blocks[index]}${output.slice(slot.fullEnd)}`;
    }
    return { kind: 'ordered-reference-list-order-v1', content: output, listId, mode: inspection.list.mode, itemCount: inspection.items.length, changed: output !== text };
  }

  return { orderedReferenceUnitRange, createOrderedReferenceList, inspectOrderedReferenceList, orderOrderedReferenceList, orderedReferenceContainerSignature: containerSignature };
});

/* src/reference-object-registry.js */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const DEFAULT_REFERENCE_OBJECT_REGISTRY_PATH = '.linked-notes/reference-objects.json';

  function normalizePath(value, label = 'Repository path') {
    const raw = String(value == null ? '' : value).replace(/\\/g, '/').trim().replace(/\/+$/g, '');
    if (!raw || raw.startsWith('/') || /^[A-Za-z]:\//.test(raw) || raw.includes('://') || /[?#\u0000-\u001f\u007f]/.test(raw)) throw new TypeError(`${label} must be a non-empty repository-relative path.`);
    const parts = raw.split('/');
    if (parts.some((part) => !part || part === '.' || part === '..')) throw new TypeError(`${label} contains an empty, . or .. segment.`);
    return parts.join('/');
  }

  function normalizeId(value) {
    const id = String(value == null ? '' : value).trim();
    if (!/^ro_[A-Za-z0-9][A-Za-z0-9_-]{2,63}$/.test(id)) throw new TypeError(`Invalid Reference Object id: ${id || '(empty)'}.`);
    return id;
  }

  function normalizeUse(value) {
    const path = normalizePath(value && value.path, 'Reference use path');
    const line = Math.max(1, Math.trunc(Number(value && value.line) || 1));
    const lineOccurrence = Math.max(1, Math.trunc(Number(value && value.lineOccurrence) || 1));
    return { path, line, lineOccurrence };
  }

  function compareUses(left, right) {
    return left.path.localeCompare(right.path) || left.line - right.line || left.lineOccurrence - right.lineOccurrence;
  }

  function normalizeObject(value) {
    const id = normalizeId(value && value.id);
    const name = String(value && value.name || '').trim();
    if (!name) throw new TypeError(`Reference Object ${id} requires a display name.`);
    const definitionPath = normalizePath(value && value.definition && value.definition.path, 'Reference definition path');
    const seen = new Set();
    const uses = [];
    for (const raw of Array.isArray(value && value.uses) ? value.uses : []) {
      const use = normalizeUse(raw);
      const key = `${use.path}\u0000${use.line}\u0000${use.lineOccurrence}`;
      if (seen.has(key)) continue;
      seen.add(key);
      uses.push(use);
    }
    uses.sort(compareUses);
    return { id, name, definition: { path: definitionPath }, uses };
  }

  function emptyReferenceObjectRegistry() {
    return { schemaVersion: 1, objects: [] };
  }

  function normalizeReferenceObjectRegistry(value) {
    const source = value && typeof value === 'object' ? value : {};
    const seen = new Set();
    const objects = [];
    for (const raw of Array.isArray(source.objects) ? source.objects : []) {
      const object = normalizeObject(raw);
      if (seen.has(object.id)) throw new Error(`Duplicate Reference Object id in definitions file: ${object.id}.`);
      seen.add(object.id);
      objects.push(object);
    }
    objects.sort((left, right) => left.name.localeCompare(right.name) || left.id.localeCompare(right.id));
    return { schemaVersion: 1, objects };
  }

  function decodeReferenceObjectRegistry(text) {
    const source = String(text == null ? '' : text).trim();
    if (!source) return emptyReferenceObjectRegistry();
    let parsed;
    try { parsed = JSON.parse(source); } catch (error) { throw new Error(`Definitions File is not valid JSON: ${error.message}`); }
    if (Number(parsed && parsed.schemaVersion) !== 1) throw new Error(`Unsupported Definitions File schemaVersion: ${parsed && parsed.schemaVersion}.`);
    return normalizeReferenceObjectRegistry(parsed);
  }

  function encodeReferenceObjectRegistry(value) {
    return `${JSON.stringify(normalizeReferenceObjectRegistry(value), null, 2)}\n`;
  }

  function referenceObjectById(registry, id) {
    const stableId = normalizeId(id);
    return normalizeReferenceObjectRegistry(registry).objects.find((object) => object.id === stableId) || null;
  }

  function upsertReferenceObject(registry, object) {
    const current = normalizeReferenceObjectRegistry(registry);
    const nextObject = normalizeObject(object);
    const objects = current.objects.filter((item) => item.id !== nextObject.id);
    objects.push(nextObject);
    return normalizeReferenceObjectRegistry({ schemaVersion: 1, objects });
  }

  function renameReferenceObject(registry, id, name) {
    const stableId = normalizeId(id);
    const display = String(name == null ? '' : name).trim();
    if (!display) throw new TypeError('Reference Object name is required.');
    const current = normalizeReferenceObjectRegistry(registry);
    let found = false;
    const objects = current.objects.map((object) => {
      if (object.id !== stableId) return object;
      found = true;
      return { ...object, name: display };
    });
    if (!found) throw new Error(`Reference Object not found: ${stableId}.`);
    return normalizeReferenceObjectRegistry({ schemaVersion: 1, objects });
  }

  function replaceReferenceObjectUses(registry, id, uses) {
    const stableId = normalizeId(id);
    const current = normalizeReferenceObjectRegistry(registry);
    let found = false;
    const objects = current.objects.map((object) => {
      if (object.id !== stableId) return object;
      found = true;
      return normalizeObject({ ...object, uses: Array.isArray(uses) ? uses : [] });
    });
    if (!found) throw new Error(`Reference Object not found: ${stableId}.`);
    return normalizeReferenceObjectRegistry({ schemaVersion: 1, objects });
  }

  function referenceObjectUsageKey(use) {
    const normalized = normalizeUse(use);
    return `${normalized.path}:${normalized.line}:${normalized.lineOccurrence}`;
  }

  return {
    DEFAULT_REFERENCE_OBJECT_REGISTRY_PATH,
    emptyReferenceObjectRegistry,
    normalizeReferenceObjectRegistry,
    decodeReferenceObjectRegistry,
    encodeReferenceObjectRegistry,
    referenceObjectById,
    upsertReferenceObject,
    renameReferenceObject,
    replaceReferenceObjectUses,
    referenceObjectUsageKey
  };
});

/* src/repository-local-change-store.js */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const DEFAULT_REPOSITORY_LOCAL_MAX_BYTES = 16 * 1024 * 1024;

  function requiredPart(value, label) {
    const text = String(value == null ? '' : value).trim();
    if (!text) throw new TypeError(`${label} is required.`);
    return text;
  }

  function repositoryLocalChangeStoreKey(workspace) {
    if (!workspace) throw new TypeError('Workspace is required.');
    const id = requiredPart(workspace.id || 'workspace', 'Workspace id');
    const owner = requiredPart(workspace.owner, 'Workspace owner').toLowerCase();
    const repo = requiredPart(workspace.repo, 'Workspace repository').replace(/\.git$/i, '').toLowerCase();
    const branch = requiredPart(workspace.branch || 'main', 'Workspace branch');
    // Keep the v3 key so existing Reference Object drafts migrate without a copy step.
    return `obsLinkedNotesPrototype:v3:referenceObjects:${encodeURIComponent(id)}:${encodeURIComponent(owner)}:${encodeURIComponent(repo)}:${encodeURIComponent(branch)}`;
  }

  function normalizeRepositoryLocalPath(value) {
    const raw = String(value == null ? '' : value).replace(/\\/g, '/').trim().replace(/\/+$/g, '');
    if (!raw || raw.startsWith('/') || /^[A-Za-z]:\//.test(raw) || raw.includes('://') || /[?#\u0000-\u001f\u007f]/.test(raw)) throw new TypeError('Local repository change path must be repository-relative.');
    const parts = raw.split('/');
    if (parts.some((part) => !part || part === '.' || part === '..')) throw new TypeError('Local repository change path contains an invalid segment.');
    return parts.join('/');
  }

  function normalizeBase64(value) {
    const compact = String(value == null ? '' : value).replace(/\s+/g, '');
    if (compact && (!/^[A-Za-z0-9+/]*={0,2}$/.test(compact) || compact.length % 4 !== 0)) throw new TypeError('Binary local repository change must contain canonical base64 bytes.');
    return compact;
  }

  function base64ByteLength(value) {
    if (!value) return 0;
    const padding = value.endsWith('==') ? 2 : value.endsWith('=') ? 1 : 0;
    return (value.length / 4) * 3 - padding;
  }

  function normalizeRepositoryLocalChangeState(value, options = {}) {
    const maxBytes = Number(options.maxBytes) > 0 ? Number(options.maxBytes) : DEFAULT_REPOSITORY_LOCAL_MAX_BYTES;
    const source = value && typeof value === 'object' ? value : {};
    const files = [];
    const seen = new Set();
    let totalBytes = 0;
    for (const raw of Array.isArray(source.files) ? source.files : []) {
      const path = normalizeRepositoryLocalPath(raw && raw.path);
      if (seen.has(path)) continue;
      seen.add(path);
      const payloadKind = raw && raw.payloadKind === 'binary' ? 'binary' : 'text';
      const content = payloadKind === 'text' ? String(raw && raw.content == null ? '' : raw.content) : '';
      const bytesBase64 = payloadKind === 'binary' ? normalizeBase64(raw && raw.bytesBase64) : '';
      totalBytes += payloadKind === 'binary' ? base64ByteLength(bytesBase64) : new TextEncoder().encode(content).byteLength;
      if (totalBytes > maxBytes) throw new Error(`Local repository changes exceed the ${maxBytes}-byte aggregate limit.`);
      files.push({
        path,
        baseSha: String(raw && raw.baseSha || ''),
        payloadKind,
        content,
        bytesBase64,
        source: String(raw && raw.source || 'reference-object'),
        operation: String(raw && raw.operation || ((raw && raw.baseSha) ? 'update' : 'create')),
        dependencies: [...new Set((Array.isArray(raw && raw.dependencies) ? raw.dependencies : []).map(normalizeRepositoryLocalPath))].sort(),
        message: String(raw && raw.message || ''),
        updatedAt: String(raw && raw.updatedAt || '')
      });
    }
    files.sort((left, right) => left.path.localeCompare(right.path));
    return { schemaVersion: 2, files };
  }

  function repositoryLocalChangeMap(state, options = {}) {
    const normalized = normalizeRepositoryLocalChangeState(state, options);
    return new Map(normalized.files.map((file) => [file.path, { ...file, dependencies: [...file.dependencies] }]));
  }

  function upsertRepositoryLocalChange(state, change, options = {}) {
    const current = normalizeRepositoryLocalChangeState(state, options);
    const path = normalizeRepositoryLocalPath(change && change.path);
    const previous = current.files.find((file) => file.path === path);
    const files = current.files.filter((file) => file.path !== path);
    files.push({
      ...(previous || {}),
      ...(change || {}),
      path,
      baseSha: previous ? previous.baseSha : String(change && change.baseSha || ''),
      updatedAt: String(change && change.updatedAt || new Date().toISOString())
    });
    return normalizeRepositoryLocalChangeState({ schemaVersion: 2, files }, options);
  }

  function removeRepositoryLocalChange(state, path, options = {}) {
    const canonical = normalizeRepositoryLocalPath(path);
    const current = normalizeRepositoryLocalChangeState(state, options);
    return normalizeRepositoryLocalChangeState({ schemaVersion: 2, files: current.files.filter((file) => file.path !== canonical) }, options);
  }

  function repositoryTextOverlays(state, options = {}) {
    return normalizeRepositoryLocalChangeState(state, options).files
      .filter((file) => file.payloadKind === 'text')
      .map((file) => ({ path: file.path, baseSha: file.baseSha, content: file.content, source: file.source, updatedAt: file.updatedAt }));
  }

  return {
    DEFAULT_REPOSITORY_LOCAL_MAX_BYTES,
    repositoryLocalChangeStoreKey,
    normalizeRepositoryLocalPath,
    normalizeRepositoryLocalChangeState,
    repositoryLocalChangeMap,
    upsertRepositoryLocalChange,
    removeRepositoryLocalChange,
    repositoryTextOverlays
  };
});

/* src/reference-object-local-store.js */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const DEFAULT_REFERENCE_LOCAL_MAX_BYTES = 16 * 1024 * 1024;

  function shared() {
    const api = typeof globalThis !== 'undefined' ? globalThis.ObsLinkedNotes || {} : {};
    return typeof api.normalizeRepositoryLocalChangeState === 'function' ? api : null;
  }

  function normalizeWorkspacePart(value, label) {
    const text = String(value == null ? '' : value).trim();
    if (!text) throw new TypeError(`${label} is required.`);
    return text;
  }

  function referenceObjectLocalStoreKey(workspace) {
    const api = shared();
    if (api) return api.repositoryLocalChangeStoreKey(workspace);
    if (!workspace) throw new TypeError('Workspace is required.');
    const id = normalizeWorkspacePart(workspace.id || 'workspace', 'Workspace id');
    const owner = normalizeWorkspacePart(workspace.owner, 'Workspace owner').toLowerCase();
    const repo = normalizeWorkspacePart(workspace.repo, 'Workspace repository').replace(/\.git$/i, '').toLowerCase();
    const branch = normalizeWorkspacePart(workspace.branch || 'main', 'Workspace branch');
    return `obsLinkedNotesPrototype:v3:referenceObjects:${encodeURIComponent(id)}:${encodeURIComponent(owner)}:${encodeURIComponent(repo)}:${encodeURIComponent(branch)}`;
  }

  function normalizePath(value) {
    const raw = String(value == null ? '' : value).replace(/\\/g, '/').trim().replace(/\/+$/g, '');
    if (!raw || raw.startsWith('/') || /^[A-Za-z]:\//.test(raw) || raw.includes('://') || /[?#\u0000-\u001f\u007f]/.test(raw)) throw new TypeError('Local Reference Object draft path must be repository-relative.');
    const parts = raw.split('/');
    if (parts.some((part) => !part || part === '.' || part === '..')) throw new TypeError('Local Reference Object draft path contains an invalid segment.');
    return parts.join('/');
  }

  function normalizeReferenceObjectLocalState(value, options = {}) {
    const api = shared();
    if (api) return api.normalizeRepositoryLocalChangeState(value, { maxBytes: options.maxBytes || DEFAULT_REFERENCE_LOCAL_MAX_BYTES });
    const maxBytes = Number(options.maxBytes) > 0 ? Number(options.maxBytes) : DEFAULT_REFERENCE_LOCAL_MAX_BYTES;
    const source = value && typeof value === 'object' ? value : {};
    const files = [];
    const seen = new Set();
    let totalBytes = 0;
    for (const raw of Array.isArray(source.files) ? source.files : []) {
      const path = normalizePath(raw && raw.path);
      if (seen.has(path)) continue;
      seen.add(path);
      const content = String(raw && raw.content == null ? '' : raw.content);
      totalBytes += new TextEncoder().encode(content).byteLength;
      if (totalBytes > maxBytes) throw new Error(`Local Reference Object drafts exceed the ${maxBytes}-byte prototype limit.`);
      files.push({ path, baseSha: String(raw && raw.baseSha || ''), content, updatedAt: String(raw && raw.updatedAt || '') });
    }
    files.sort((left, right) => left.path.localeCompare(right.path));
    return { schemaVersion: 1, files };
  }

  function referenceObjectLocalDraftMap(state) {
    const api = shared();
    if (api) return api.repositoryLocalChangeMap(state);
    const normalized = normalizeReferenceObjectLocalState(state);
    return new Map(normalized.files.map((file) => [file.path, { ...file }]));
  }

  function upsertReferenceObjectLocalDraft(state, draft, options = {}) {
    const api = shared();
    if (api) return api.upsertRepositoryLocalChange(state, { ...(draft || {}), payloadKind: 'text', source: draft && draft.source || 'reference-object' }, { maxBytes: options.maxBytes || DEFAULT_REFERENCE_LOCAL_MAX_BYTES });
    const current = normalizeReferenceObjectLocalState(state, options);
    const path = normalizePath(draft && draft.path);
    const files = current.files.filter((file) => file.path !== path);
    files.push({ path, baseSha: String(draft && draft.baseSha || ''), content: String(draft && draft.content == null ? '' : draft.content), updatedAt: String(draft && draft.updatedAt || new Date().toISOString()) });
    return normalizeReferenceObjectLocalState({ schemaVersion: 1, files }, options);
  }

  function removeReferenceObjectLocalDraft(state, path, options = {}) {
    const api = shared();
    if (api) return api.removeRepositoryLocalChange(state, path, { maxBytes: options.maxBytes || DEFAULT_REFERENCE_LOCAL_MAX_BYTES });
    const canonical = normalizePath(path);
    const current = normalizeReferenceObjectLocalState(state, options);
    return normalizeReferenceObjectLocalState({ schemaVersion: 1, files: current.files.filter((file) => file.path !== canonical) }, options);
  }

  return {
    DEFAULT_REFERENCE_LOCAL_MAX_BYTES,
    referenceObjectLocalStoreKey,
    normalizeReferenceObjectLocalState,
    referenceObjectLocalDraftMap,
    upsertReferenceObjectLocalDraft,
    removeReferenceObjectLocalDraft
  };
});

/* src/repository-reference-object-service.js */
(function (root, factory) {
  const api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function (root) {
  'use strict';

  const DEFAULT_SCAN_MAX_DIRECTORIES = 80;
  const DEFAULT_SCAN_MAX_FILES = 300;
  const DEFAULT_SCAN_MAX_BYTES = 4 * 1024 * 1024;
  const DEFAULT_SCAN_MAX_FILE_BYTES = 512 * 1024;

  function core() {
    const api = root.ObsLinkedNotes || {};
    const required = ['parseReferenceMarkers', 'replaceReferenceOccurrenceValues', 'decodeReferenceObjectRegistry', 'encodeReferenceObjectRegistry', 'referenceObjectById', 'replaceReferenceObjectUses'];
    for (const name of required) if (typeof api[name] !== 'function') throw new Error(`Reference Object dependency is unavailable: ${name}.`);
    return api;
  }

  function errorText(error) {
    return String(error && error.message || error || 'Unknown error');
  }

  function isNotFound(error) {
    return Boolean(error && error.kind === 'not_found');
  }

  function supportedReferenceTextPath(path) {
    return /\.(?:md|markdown|mdown|txt)$/i.test(String(path || ''));
  }

  function overlayMap(overlays) {
    const map = new Map();
    for (const item of Array.isArray(overlays) ? overlays : []) {
      if (!item || !item.path) continue;
      if (item.payloadKind === 'binary') continue;
      map.set(String(item.path), { path: String(item.path), baseSha: String(item.baseSha || ''), content: String(item.content == null ? '' : item.content), local: true });
    }
    return map;
  }

  function decodeUtf8(bytes, path) {
    try { return new TextDecoder('utf-8', { fatal: true }).decode(bytes); }
    catch (error) { throw new Error(`Reference Object scan cannot decode ${path} as strict UTF-8.`); }
  }

  async function readTextFile(client, path, options = {}) {
    const maxBytes = Number(options.maxBytes) > 0 ? Number(options.maxBytes) : DEFAULT_SCAN_MAX_FILE_BYTES;
    if (client && typeof client.readBytes === 'function') {
      const file = await client.readBytes(path, { maxBytes });
      return { path: file.path || path, sha: String(file.sha || ''), size: Number(file.size || (file.bytes && file.bytes.byteLength) || 0), content: decodeUtf8(file.bytes, path), local: false };
    }
    if (client && typeof client.read === 'function') {
      const file = await client.read(path);
      const content = String(file.content == null ? '' : file.content);
      const bytes = new TextEncoder().encode(content).byteLength;
      if (bytes > maxBytes) throw new Error(`Reference Object file exceeds ${maxBytes} bytes: ${path}.`);
      return { path: file.path || path, sha: String(file.sha || ''), size: bytes, content, local: false };
    }
    throw new Error('GitHub client has no bounded text-file reader.');
  }

  async function readRegistrySnapshot(client, registryPath, overlays) {
    const api = core();
    const local = overlayMap(overlays).get(registryPath);
    if (local) {
      return { path: registryPath, sha: local.baseSha, content: local.content, registry: api.decodeReferenceObjectRegistry(local.content), local: true };
    }
    try {
      const file = await readTextFile(client, registryPath, { maxBytes: DEFAULT_SCAN_MAX_FILE_BYTES });
      return { path: registryPath, sha: file.sha, content: file.content, registry: api.decodeReferenceObjectRegistry(file.content), local: false };
    } catch (error) {
      if (!isNotFound(error)) throw error;
      return { path: registryPath, sha: '', content: '', registry: api.emptyReferenceObjectRegistry ? api.emptyReferenceObjectRegistry() : { schemaVersion: 1, objects: [] }, local: false, missing: true };
    }
  }

  async function scanRepositoryReferenceObjects(options = {}) {
    const api = core();
    const client = options.client;
    if (!client || typeof client.listDirectory !== 'function') throw new Error('Reference Object scan requires a repository directory client.');
    const registryPath = String(options.registryPath || api.DEFAULT_REFERENCE_OBJECT_REGISTRY_PATH || '.linked-notes/reference-objects.json');
    const localOverlays = overlayMap(options.overlays);
    const maxDirectories = Number(options.maxDirectories) > 0 ? Number(options.maxDirectories) : DEFAULT_SCAN_MAX_DIRECTORIES;
    const maxFiles = Number(options.maxFiles) > 0 ? Number(options.maxFiles) : DEFAULT_SCAN_MAX_FILES;
    const maxBytes = Number(options.maxBytes) > 0 ? Number(options.maxBytes) : DEFAULT_SCAN_MAX_BYTES;
    const maxFileBytes = Number(options.maxFileBytes) > 0 ? Number(options.maxFileBytes) : DEFAULT_SCAN_MAX_FILE_BYTES;
    const queue = [''];
    const visited = new Set();
    const files = [];
    const fileByPath = new Map();
    const diagnostics = [];
    let totalBytes = 0;
    let scannedFiles = 0;
    let incomplete = false;
    let truncationReason = '';

    while (queue.length) {
      const path = queue.shift();
      if (visited.has(path)) continue;
      if (visited.size >= maxDirectories) {
        incomplete = true;
        truncationReason = `directory limit ${maxDirectories}`;
        break;
      }
      visited.add(path);
      let entries;
      try { entries = await client.listDirectory(path, { maxEntries: 200 }); }
      catch (error) {
        diagnostics.push({ kind: 'directory_read_error', path, message: errorText(error) });
        incomplete = true;
        continue;
      }
      for (const entry of Array.isArray(entries) ? entries : []) {
        if (entry && entry.type === 'dir') {
          if (!visited.has(entry.path)) queue.push(entry.path);
          continue;
        }
        if (!entry || entry.type !== 'file' || !supportedReferenceTextPath(entry.path) || entry.path === registryPath) continue;
        if (scannedFiles >= maxFiles) {
          incomplete = true;
          truncationReason = `file limit ${maxFiles}`;
          queue.length = 0;
          break;
        }
        scannedFiles += 1;
        const local = localOverlays.get(entry.path);
        try {
          let snapshot;
          if (local) {
            const size = new TextEncoder().encode(local.content).byteLength;
            if (size > maxFileBytes) throw new Error(`Local draft exceeds ${maxFileBytes} bytes.`);
            snapshot = { path: entry.path, sha: local.baseSha || String(entry.sha || ''), baseSha: local.baseSha || String(entry.sha || ''), size, content: local.content, local: true };
          } else {
            if (Number(entry.size || 0) > maxFileBytes) throw new Error(`File exceeds ${maxFileBytes} bytes.`);
            const file = await readTextFile(client, entry.path, { maxBytes: maxFileBytes });
            snapshot = { ...file, baseSha: file.sha, local: false };
          }
          totalBytes += snapshot.size;
          if (totalBytes > maxBytes) {
            incomplete = true;
            truncationReason = `aggregate byte limit ${maxBytes}`;
            queue.length = 0;
            break;
          }
          const parsed = api.parseReferenceMarkers(snapshot.content);
          const record = { ...snapshot, markers: parsed.occurrences, markerDiagnostics: parsed.diagnostics };
          files.push(record);
          fileByPath.set(record.path, record);
          for (const diagnostic of parsed.diagnostics) diagnostics.push({ ...diagnostic, path: record.path });
        } catch (error) {
          diagnostics.push({ kind: 'file_scan_error', path: entry.path, message: errorText(error) });
          incomplete = true;
        }
      }
    }

    for (const local of localOverlays.values()) {
      if (local.path === registryPath || !supportedReferenceTextPath(local.path) || fileByPath.has(local.path)) continue;
      const size = new TextEncoder().encode(local.content).byteLength;
      if (size > maxFileBytes || files.length >= maxFiles || totalBytes + size > maxBytes) {
        incomplete = true;
        truncationReason = truncationReason || 'local overlay scan limit';
        diagnostics.push({ kind: 'local_overlay_skipped', path: local.path, message: 'Local Reference Object draft could not be included within scan bounds.' });
        continue;
      }
      const parsed = api.parseReferenceMarkers(local.content);
      const record = { path: local.path, sha: local.baseSha, baseSha: local.baseSha, size, content: local.content, local: true, markers: parsed.occurrences, markerDiagnostics: parsed.diagnostics };
      files.push(record);
      fileByPath.set(record.path, record);
      totalBytes += size;
      for (const diagnostic of parsed.diagnostics) diagnostics.push({ ...diagnostic, path: record.path });
    }

    files.sort((left, right) => left.path.localeCompare(right.path));
    return {
      registryPath,
      files,
      diagnostics,
      incomplete,
      truncationReason,
      scannedDirectories: visited.size,
      scannedFiles: files.length,
      totalBytes
    };
  }

  function actualUseIndex(uses) {
    return (Array.isArray(uses) ? uses : []).map((use) => ({ path: use.path, line: use.line, lineOccurrence: use.lineOccurrence })).sort((left, right) => left.path.localeCompare(right.path) || left.line - right.line || left.lineOccurrence - right.lineOccurrence);
  }

  function sameUsageIndex(left, right) {
    return JSON.stringify(actualUseIndex(left)) === JSON.stringify(actualUseIndex(right));
  }


  function indexedReferenceRoutes(objects) {
    const routes = new Map();
    const ensure = (path) => {
      const value = String(path || '').trim();
      if (!value) return null;
      if (!routes.has(value)) routes.set(value, { path: value, definitionIds: new Set(), useIds: new Set(), expectedUses: [] });
      return routes.get(value);
    };
    const source = Array.isArray(objects) ? objects : [];
    for (const object of source) {
      const route = ensure(object && object.definition && object.definition.path);
      if (route) route.definitionIds.add(String(object.id || ''));
    }
    for (const object of source) {
      const id = String(object && object.id || '');
      for (const use of Array.isArray(object && object.uses) ? object.uses : []) {
        const route = ensure(use && use.path);
        if (!route) continue;
        route.useIds.add(id);
        route.expectedUses.push({ objectId: id, path: route.path, line: Number(use && use.line) || 0, lineOccurrence: Number(use && use.lineOccurrence) || 0 });
      }
    }
    return [...routes.values()];
  }

  async function readIndexedReferenceObjectState(options, registrySnapshot, objects) {
    const api = core();
    const client = options && options.client;
    const localOverlays = overlayMap(options && options.overlays);
    const maxFiles = Number(options && options.maxFiles) > 0 ? Number(options.maxFiles) : DEFAULT_SCAN_MAX_FILES;
    const maxBytes = Number(options && options.maxBytes) > 0 ? Number(options.maxBytes) : DEFAULT_SCAN_MAX_BYTES;
    const maxFileBytes = Number(options && options.maxFileBytes) > 0 ? Number(options.maxFileBytes) : DEFAULT_SCAN_MAX_FILE_BYTES;
    const routes = indexedReferenceRoutes(objects);
    const files = [];
    const fileByPath = new Map();
    const diagnostics = [];
    let totalBytes = 0;
    let incomplete = false;
    let truncationReason = '';
    const selected = routes.slice(0, maxFiles);
    if (routes.length > maxFiles) {
      incomplete = true;
      truncationReason = `indexed file limit ${maxFiles}`;
      diagnostics.push({ kind: 'indexed_file_limit', path: registrySnapshot.path, message: `Definitions File routes ${routes.length} unique files; only ${maxFiles} can be checked in one operation.` });
    }
    for (const route of selected) {
      if (!supportedReferenceTextPath(route.path)) {
        incomplete = true;
        diagnostics.push({ kind: 'indexed_path_unsupported', path: route.path, message: 'Definitions File points to a path outside the supported Reference Object text-file set.' });
        continue;
      }
      try {
        const local = localOverlays.get(route.path);
        let snapshot;
        if (local) {
          const size = new TextEncoder().encode(local.content).byteLength;
          if (size > maxFileBytes) throw new Error(`Local pending file exceeds ${maxFileBytes} bytes.`);
          snapshot = { path: route.path, sha: local.baseSha, baseSha: local.baseSha, size, content: local.content, local: true };
        } else {
          const file = await readTextFile(client, route.path, { maxBytes: maxFileBytes });
          snapshot = { ...file, baseSha: file.sha, local: false };
        }
        if (totalBytes + snapshot.size > maxBytes) {
          incomplete = true;
          truncationReason = truncationReason || `indexed aggregate byte limit ${maxBytes}`;
          diagnostics.push({ kind: 'indexed_byte_limit', path: route.path, message: `Definitions File routed reads exceed the ${maxBytes}-byte aggregate bound.` });
          break;
        }
        totalBytes += snapshot.size;
        const parsed = api.parseReferenceMarkers(snapshot.content);
        const record = { ...snapshot, markers: parsed.occurrences, markerDiagnostics: parsed.diagnostics, route };
        files.push(record);
        fileByPath.set(record.path, record);
        for (const diagnostic of parsed.diagnostics) diagnostics.push({ ...diagnostic, path: record.path });
      } catch (error) {
        incomplete = true;
        diagnostics.push({ kind: 'indexed_file_read_error', path: route.path, message: errorText(error) });
      }
    }
    return {
      registryPath: registrySnapshot.path,
      files,
      fileByPath,
      diagnostics,
      incomplete,
      truncationReason,
      indexedPaths: routes.length,
      readFiles: files.length,
      totalBytes
    };
  }

  async function checkReferenceObjectUses(options = {}) {
    const api = core();
    const id = api.normalizeReferenceObjectId(options.objectId);
    const registryPath = String(options.registryPath || api.DEFAULT_REFERENCE_OBJECT_REGISTRY_PATH || '.linked-notes/reference-objects.json');
    const registrySnapshot = await readRegistrySnapshot(options.client, registryPath, options.overlays);
    const object = api.referenceObjectById(registrySnapshot.registry, id);
    if (!object) throw new Error(`Reference Object not found in Definitions File: ${id}.`);
    const routed = await readIndexedReferenceObjectState(options, registrySnapshot, [object]);
    const diagnostics = [...routed.diagnostics];
    const definitionFile = routed.fileByPath.get(String(object.definition && object.definition.path || ''));
    const definitions = definitionFile ? definitionFile.markers.filter((marker) => marker.role === 'def' && marker.id === id).map((marker) => ({ ...marker, path: definitionFile.path, fileSha: definitionFile.baseSha || definitionFile.sha || '', local: Boolean(definitionFile.local) })) : [];
    if (definitions.length !== 1) diagnostics.push({ kind: definitions.length ? 'duplicate_definition_at_path' : 'definition_missing', path: object.definition.path, objectId: id, message: definitions.length ? `Definitions File target contains ${definitions.length} definitions for ${id}.` : `Definition marker ${id} was not found at ${object.definition.path}.` });
    const definition = definitions.length === 1 ? definitions[0] : null;
    const currentValue = definition ? definition.value : '';
    const indexedUsePaths = new Set((Array.isArray(object.uses) ? object.uses : []).map((use) => String(use && use.path || '')).filter(Boolean));
    const uses = [];
    for (const path of indexedUsePaths) {
      const file = routed.fileByPath.get(path);
      if (!file) continue;
      for (const marker of file.markers) if (marker.role === 'use' && marker.id === id) uses.push({ ...marker, path: file.path, fileSha: file.baseSha || file.sha || '', local: Boolean(file.local) });
    }
    const classifiedUses = uses.sort((left, right) => left.path.localeCompare(right.path) || left.fullStart - right.fullStart).map((use) => ({ ...use, status: definition && use.value === currentValue ? 'current' : definition ? 'stale' : 'unresolved' }));
    const index = actualUseIndex(classifiedUses);
    const indexDrift = !sameUsageIndex(object.uses, index);
    if (indexDrift) diagnostics.push({ kind: 'usage_index_drift', objectId: id, path: registryPath, message: `Definitions File usage index differs from the markers found in its ${indexedUsePaths.size} routed use file(s). Run Deep validate repo to discover uses in unindexed files.` });
    const blocked = !definition;
    return {
      kind: 'reference-object-check-v1',
      object,
      objectId: id,
      registryPath,
      registrySnapshot,
      definition,
      currentValue,
      uses: classifiedUses,
      usageIndex: index,
      indexDrift,
      diagnostics,
      incomplete: routed.incomplete,
      truncationReason: routed.truncationReason,
      blocked,
      files: routed.files,
      scanSummary: { mode: 'indexed', directories: 0, files: routed.readFiles, bytes: routed.totalBytes, indexedPaths: routed.indexedPaths }
    };
  }

  function buildReferenceObjectLocalUpdate(check) {
    const api = core();
    if (!check || check.kind !== 'reference-object-check-v1') throw new Error('Check Reference Object uses before updating.');
    if (check.blocked) throw new Error('Reference Object definition is unresolved or duplicated; usages cannot be updated safely.');
    if (check.incomplete) throw new Error(`Reference Object check is incomplete${check.truncationReason ? ` (${check.truncationReason})` : ''}; usages cannot be updated safely.`);
    const staleByPath = new Map();
    for (const use of check.uses.filter((item) => item.status === 'stale')) {
      const group = staleByPath.get(use.path) || [];
      group.push(use);
      staleByPath.set(use.path, group);
    }
    const filePlans = [];
    const contentByPath = new Map(check.files.map((file) => [file.path, file.content]));
    for (const [path, stale] of staleByPath.entries()) {
      const file = check.files.find((item) => item.path === path);
      if (!file) throw new Error(`Checked use file is unavailable: ${path}.`);
      const content = api.replaceReferenceOccurrenceValues(file.content, stale.map((use) => ({ contentStart: use.contentStart, contentEnd: use.contentEnd, value: check.currentValue })));
      contentByPath.set(path, content);
      filePlans.push({ path, baseSha: String(file.baseSha || file.sha || ''), content, localBase: Boolean(file.local) });
    }
    const uses = [];
    for (const file of check.files) {
      const content = contentByPath.get(file.path);
      const parsed = api.parseReferenceMarkers(content);
      for (const marker of parsed.occurrences) if (marker.role === 'use' && marker.id === check.objectId) uses.push({ path: file.path, line: marker.line, lineOccurrence: marker.lineOccurrence });
    }
    uses.sort((left, right) => left.path.localeCompare(right.path) || left.line - right.line || left.lineOccurrence - right.lineOccurrence);
    const registry = api.replaceReferenceObjectUses(check.registrySnapshot.registry, check.objectId, uses);
    return { kind: 'reference-object-local-update-v1', objectId: check.objectId, files: filePlans, uses, registry, registryContent: api.encodeReferenceObjectRegistry(registry), staleCount: check.uses.filter((item) => item.status === 'stale').length };
  }

  async function proveExpectedBase(client, path, baseSha) {
    if (baseSha) {
      const metadata = await client.readMetadata(path);
      if (String(metadata && metadata.sha || '') !== String(baseSha)) throw new Error(`Remote base changed for ${path}. Expected ${baseSha}; found ${metadata && metadata.sha || '(none)'}.`);
      return metadata;
    }
    try {
      const metadata = await client.readMetadata(path);
      throw new Error(`Expected new path is no longer absent: ${path}${metadata && metadata.sha ? ` (${metadata.sha})` : ''}.`);
    } catch (error) {
      if (isNotFound(error)) return null;
      throw error;
    }
  }

  async function updateReferenceObjectUsesRemote(options = {}) {
    const api = core();
    const client = options.client;
    if (!client || typeof client.saveVerified !== 'function' || typeof client.readMetadata !== 'function') throw new Error('Remote Reference Object update requires verified text writes and metadata reads.');
    const check = await checkReferenceObjectUses({ ...options, overlays: [] });
    const plan = buildReferenceObjectLocalUpdate(check);
    const registryNeedsWrite = check.indexDrift || plan.staleCount > 0;
    for (const file of plan.files) await proveExpectedBase(client, file.path, file.baseSha);
    if (registryNeedsWrite) await proveExpectedBase(client, check.registryPath, check.registrySnapshot.sha);
    const results = [];
    for (const file of plan.files) {
      try {
        const saved = await client.saveVerified({ path: file.path, content: file.content, baseSha: file.baseSha, message: `Refresh materialized Reference Object ${check.objectId} in ${file.path}` });
        results.push({ target: file.path, status: 'completed', sha: String(saved && saved.sha || ''), message: 'Stale materialized uses updated and exact read-back verified.' });
      } catch (error) {
        results.push({ target: file.path, status: 'failed', message: errorText(error) });
        const partial = new Error(`Reference Object remote update stopped after ${results.filter((item) => item.status === 'completed').length} verified file(s). Completed writes remain.`);
        partial.kind = 'partial_reference_object_update';
        partial.partialResults = results;
        throw partial;
      }
    }
    if (registryNeedsWrite) {
      try {
        const saved = await client.saveVerified({ path: check.registryPath, content: plan.registryContent, baseSha: check.registrySnapshot.sha, message: `Refresh Reference Object usage index for ${check.objectId}` });
        results.push({ target: check.registryPath, status: 'completed', sha: String(saved && saved.sha || ''), message: 'Definitions File usage index updated and verified.' });
      } catch (error) {
        results.push({ target: check.registryPath, status: 'failed', message: errorText(error) });
        const partial = new Error('Materialized uses may already be updated, but the Definitions File index update failed. Validate tags before retrying.');
        partial.kind = 'partial_reference_object_update';
        partial.partialResults = results;
        throw partial;
      }
    }
    return { kind: 'reference-object-remote-update-result-v1', objectId: check.objectId, staleCount: plan.staleCount, results, registry: plan.registry };
  }

  function referenceValidationFromFiles(registrySnapshot, files, sourceDiagnostics, options = {}) {
    const diagnostics = [...(Array.isArray(sourceDiagnostics) ? sourceDiagnostics : [])];
    const definitionsById = new Map();
    const usesById = new Map();
    for (const file of Array.isArray(files) ? files : []) {
      for (const marker of Array.isArray(file && file.markers) ? file.markers : []) {
        const target = marker.role === 'def' ? definitionsById : usesById;
        const group = target.get(marker.id) || [];
        group.push({ ...marker, path: file.path });
        target.set(marker.id, group);
      }
    }
    const objects = Array.isArray(registrySnapshot && registrySnapshot.registry && registrySnapshot.registry.objects) ? registrySnapshot.registry.objects : [];
    const registeredIds = new Set(objects.map((object) => object.id));
    for (const [id, definitions] of definitionsById.entries()) {
      if (definitions.length > 1) diagnostics.push({ kind: 'duplicate_definition', objectId: id, path: definitions[0].path, message: `${id} has ${definitions.length} definitions in the files read by this validation.` });
      if (!registeredIds.has(id)) diagnostics.push({ kind: 'unregistered_definition', objectId: id, path: definitions[0].path, message: `${id} has a definition marker but no Definitions File record.` });
    }
    for (const object of objects) {
      const definitions = definitionsById.get(object.id) || [];
      if (!definitions.some((item) => item.path === object.definition.path)) diagnostics.push({ kind: 'registry_definition_missing', objectId: object.id, path: object.definition.path, message: 'Definitions File target does not contain the expected definition marker.' });
      if (definitions.some((item) => item.path !== object.definition.path)) diagnostics.push({ kind: 'registry_definition_wrong_path', objectId: object.id, path: object.definition.path, message: 'Definition marker also exists outside the recorded definition path among the files read by this validation.' });
      const uses = actualUseIndex(usesById.get(object.id) || []);
      if (!sameUsageIndex(object.uses, uses)) diagnostics.push({ kind: 'usage_index_drift', objectId: object.id, path: registrySnapshot.path, message: `Definitions File usage index differs from ${uses.length} use marker(s) found in the files read by this validation.` });
    }
    for (const [id, uses] of usesById.entries()) if (!registeredIds.has(id)) diagnostics.push({ kind: 'unknown_use_id', objectId: id, path: uses[0].path, message: `${uses.length} use marker(s) refer to an unknown Reference Object id.` });
    const scope = options.scope === 'repository' ? 'repository' : 'indexed';
    const incomplete = Boolean(options.incomplete);
    if (incomplete) {
      diagnostics.push({
        kind: scope === 'repository' ? 'scan_incomplete' : 'indexed_validation_incomplete',
        path: '',
        message: scope === 'repository'
          ? `Deep Reference Object validation is incomplete${options.truncationReason ? `: ${options.truncationReason}` : '.'}`
          : `Indexed Reference Object validation is incomplete${options.truncationReason ? `: ${options.truncationReason}` : '.'}`
      });
    }
    const valid = diagnostics.length === 0 && !incomplete;
    return {
      kind: 'reference-object-validation-v1',
      scope,
      globalIntegrity: scope === 'repository' && valid,
      registryPath: registrySnapshot.path,
      diagnostics,
      valid,
      incomplete,
      counts: {
        objects: objects.length,
        definitions: [...definitionsById.values()].reduce((sum, group) => sum + group.length, 0),
        uses: [...usesById.values()].reduce((sum, group) => sum + group.length, 0),
        files: Array.isArray(files) ? files.length : 0
      },
      registrySnapshot,
      scanSummary: { ...(options.scanSummary || {}) }
    };
  }

  async function validateReferenceObjectTags(options = {}) {
    const api = core();
    const registryPath = String(options.registryPath || api.DEFAULT_REFERENCE_OBJECT_REGISTRY_PATH || '.linked-notes/reference-objects.json');
    const registrySnapshot = await readRegistrySnapshot(options.client, registryPath, options.overlays);
    const objects = Array.isArray(registrySnapshot.registry.objects) ? registrySnapshot.registry.objects : [];
    if (!objects.length) {
      return referenceValidationFromFiles(registrySnapshot, [], [], {
        scope: 'indexed',
        incomplete: false,
        scanSummary: { mode: 'indexed', directories: 0, files: 0, bytes: 0, indexedPaths: 0 }
      });
    }
    const routed = await readIndexedReferenceObjectState(options, registrySnapshot, objects);
    return referenceValidationFromFiles(registrySnapshot, routed.files, routed.diagnostics, {
      scope: 'indexed',
      incomplete: routed.incomplete,
      truncationReason: routed.truncationReason,
      scanSummary: { mode: 'indexed', directories: 0, files: routed.readFiles, bytes: routed.totalBytes, indexedPaths: routed.indexedPaths }
    });
  }

  async function deepValidateReferenceObjectTags(options = {}) {
    const api = core();
    const registryPath = String(options.registryPath || api.DEFAULT_REFERENCE_OBJECT_REGISTRY_PATH || '.linked-notes/reference-objects.json');
    const registrySnapshot = await readRegistrySnapshot(options.client, registryPath, options.overlays);
    const scan = await scanRepositoryReferenceObjects({ ...options, registryPath });
    return referenceValidationFromFiles(registrySnapshot, scan.files, scan.diagnostics, {
      scope: 'repository',
      incomplete: scan.incomplete,
      truncationReason: scan.truncationReason,
      scanSummary: { mode: 'repository', directories: scan.scannedDirectories, files: scan.scannedFiles, bytes: scan.totalBytes }
    });
  }

  async function diagnoseReferenceObjectFreshness(options = {}) {
    const api = core();
    const registryPath = String(options.registryPath || api.DEFAULT_REFERENCE_OBJECT_REGISTRY_PATH || '.linked-notes/reference-objects.json');
    const registrySnapshot = await readRegistrySnapshot(options.client, registryPath, options.overlays);
    const objects = Array.isArray(registrySnapshot.registry.objects) ? registrySnapshot.registry.objects : [];
    if (!objects.length) {
      return {
        kind: 'reference-object-freshness-v1',
        files: [],
        uses: [],
        staleCount: 0,
        unresolvedCount: 0,
        incomplete: false,
        truncationReason: '',
        diagnostics: [],
        registrySnapshot,
        scanSummary: { mode: 'indexed', directories: 0, files: 0, bytes: 0, indexedPaths: 0 }
      };
    }
    const routed = await readIndexedReferenceObjectState(options, registrySnapshot, objects);
    const diagnostics = [...routed.diagnostics];
    const currentValueById = new Map();
    for (const object of objects) {
      const path = String(object.definition && object.definition.path || '');
      const file = routed.fileByPath.get(path);
      const definitions = file ? file.markers.filter((marker) => marker.role === 'def' && marker.id === object.id) : [];
      if (definitions.length === 1) currentValueById.set(object.id, definitions[0].value);
      else diagnostics.push({ kind: definitions.length ? 'duplicate_definition_at_path' : 'definition_missing', objectId: object.id, path, message: definitions.length ? `Definitions File target contains ${definitions.length} definitions for ${object.id}.` : `Definition marker ${object.id} was not found at ${path}.` });
    }
    const uses = [];
    for (const object of objects) {
      const expectedByPath = new Map();
      for (const expected of Array.isArray(object.uses) ? object.uses : []) {
        const path = String(expected && expected.path || '');
        if (!path) continue;
        const group = expectedByPath.get(path) || [];
        group.push(expected);
        expectedByPath.set(path, group);
      }
      const actualForObject = [];
      for (const [path, expected] of expectedByPath.entries()) {
        const file = routed.fileByPath.get(path);
        if (!file) {
          for (const item of expected) actualForObject.push({ path, objectId: object.id, line: Number(item.line) || 0, lineOccurrence: Number(item.lineOccurrence) || 0, value: '', currentValue: currentValueById.get(object.id) || '', status: 'unresolved', indexedMissing: true });
          continue;
        }
        const actual = file.markers.filter((marker) => marker.role === 'use' && marker.id === object.id).map((marker) => ({ path: file.path, objectId: object.id, line: marker.line, lineOccurrence: marker.lineOccurrence, value: marker.value, currentValue: currentValueById.get(object.id) || '', status: currentValueById.has(object.id) ? (marker.value === currentValueById.get(object.id) ? 'current' : 'stale') : 'unresolved' }));
        actualForObject.push(...actual);
        const missingCount = Math.max(0, expected.length - actual.length);
        for (let index = 0; index < missingCount; index += 1) {
          const item = expected[index] || {};
          actualForObject.push({ path, objectId: object.id, line: Number(item.line) || 0, lineOccurrence: Number(item.lineOccurrence) || 0, value: '', currentValue: currentValueById.get(object.id) || '', status: 'unresolved', indexedMissing: true });
        }
      }
      const actualIndex = actualUseIndex(actualForObject.filter((item) => !item.indexedMissing));
      if (!sameUsageIndex(object.uses, actualIndex)) diagnostics.push({ kind: 'usage_index_drift', objectId: object.id, path: registryPath, message: `Definitions File usage index differs from markers in the indexed use paths for ${object.id}. Run Deep validate repo for a repository-wide integrity check.` });
      uses.push(...actualForObject);
    }
    uses.sort((left, right) => left.path.localeCompare(right.path) || left.line - right.line || left.lineOccurrence - right.lineOccurrence || left.objectId.localeCompare(right.objectId));
    const fileMap = new Map();
    for (const use of uses) {
      const group = fileMap.get(use.path) || [];
      group.push(use);
      fileMap.set(use.path, group);
    }
    const files = [...fileMap.entries()].sort((left, right) => left[0].localeCompare(right[0])).map(([path, fileUses]) => ({ path, current: fileUses.filter((item) => item.status === 'current').length, stale: fileUses.filter((item) => item.status === 'stale').length, unresolved: fileUses.filter((item) => item.status === 'unresolved').length, uses: fileUses }));
    return {
      kind: 'reference-object-freshness-v1',
      files,
      uses,
      staleCount: uses.filter((item) => item.status === 'stale').length,
      unresolvedCount: uses.filter((item) => item.status === 'unresolved').length,
      incomplete: routed.incomplete,
      truncationReason: routed.truncationReason,
      diagnostics,
      registrySnapshot,
      scanSummary: { mode: 'indexed', directories: 0, files: routed.readFiles, bytes: routed.totalBytes, indexedPaths: routed.indexedPaths }
    };
  }

  return {
    DEFAULT_REFERENCE_SCAN_MAX_DIRECTORIES: DEFAULT_SCAN_MAX_DIRECTORIES,
    DEFAULT_REFERENCE_SCAN_MAX_FILES: DEFAULT_SCAN_MAX_FILES,
    DEFAULT_REFERENCE_SCAN_MAX_BYTES: DEFAULT_SCAN_MAX_BYTES,
    DEFAULT_REFERENCE_SCAN_MAX_FILE_BYTES: DEFAULT_SCAN_MAX_FILE_BYTES,
    supportedReferenceTextPath,
    readReferenceObjectRegistrySnapshot: readRegistrySnapshot,
    scanRepositoryReferenceObjects,
    checkReferenceObjectUses,
    buildReferenceObjectLocalUpdate,
    updateReferenceObjectUsesRemote,
    validateReferenceObjectTags,
    deepValidateReferenceObjectTags,
    diagnoseReferenceObjectFreshness,
    proveReferenceObjectExpectedBase: proveExpectedBase
  };
});

/* src/repository-target-search.js */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const DEFAULT_SEARCH_LIMITS = Object.freeze({ maxFolders: 80, maxRequests: 80, maxResults: 100, maxEntriesPerFolder: 200, maxDepth: 8 });
  function normalizedQuery(value) { return String(value == null ? '' : value).trim().toLocaleLowerCase(); }
  function normalizedRoot(value) { return String(value == null ? '' : value).replace(/\\/g, '/').trim().replace(/^\/+|\/+$/g, ''); }
  function normalizeDepth(value, maxDepth) {
    if (value === 'entire' || value === Infinity) return maxDepth;
    const number = Number(value);
    return Number.isInteger(number) && number >= 0 ? Math.min(number, maxDepth) : 0;
  }
  function matchesName(entry, query) {
    if (!query) return true;
    return String(entry && (entry.name || entry.path) || '').toLocaleLowerCase().includes(query);
  }

  async function searchRepositoryTargets(input = {}) {
    if (typeof input.listDirectory !== 'function') throw new TypeError('listDirectory callback is required.');
    const limits = { ...DEFAULT_SEARCH_LIMITS, ...(input.limits || {}) };
    const query = normalizedQuery(input.query);
    const rootPath = normalizedRoot(input.rootPath);
    const depth = normalizeDepth(input.depth, Number(limits.maxDepth) || DEFAULT_SEARCH_LIMITS.maxDepth);
    const queue = [{ path: rootPath, level: 0 }];
    const visited = new Set();
    const results = [];
    let requestCount = 0;
    let folderCount = 0;
    let truncated = false;
    let truncationReason = '';

    while (queue.length) {
      if (requestCount >= limits.maxRequests || folderCount >= limits.maxFolders) {
        truncated = true;
        truncationReason = requestCount >= limits.maxRequests ? 'request_limit' : 'folder_limit';
        break;
      }
      const current = queue.shift();
      if (visited.has(current.path)) continue;
      visited.add(current.path);
      requestCount += 1;
      folderCount += 1;
      const entries = await input.listDirectory(current.path, { maxEntries: limits.maxEntriesPerFolder });
      for (const entry of Array.isArray(entries) ? entries : []) {
        if (entry && entry.type === 'file' && matchesName(entry, query)) {
          results.push({
            type: 'file',
            path: String(entry.path || ''),
            name: String(entry.name || ''),
            size: Number(entry.size || 0),
            sha: String(entry.sha || ''),
            htmlUrl: String(entry.htmlUrl || ''),
            depth: current.level
          });
          if (results.length >= limits.maxResults) {
            truncated = true;
            truncationReason = 'result_limit';
            break;
          }
        }
        if (entry && entry.type === 'dir' && current.level < depth) queue.push({ path: String(entry.path || ''), level: current.level + 1 });
      }
      if (truncated && truncationReason === 'result_limit') break;
    }

    return {
      query,
      rootPath,
      requestedDepth: input.depth,
      effectiveDepth: depth,
      results: results.sort((a, b) => a.path.localeCompare(b.path, undefined, { sensitivity: 'base' })),
      scannedFolders: folderCount,
      requestCount,
      truncated,
      truncationReason,
      remainingFolders: queue.length
    };
  }

  return { DEFAULT_SEARCH_LIMITS, searchRepositoryTargets, matchesName };
});

/* src/rich-markdown-renderer.js */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function escapeAttribute(value) { return escapeHtml(value).replace(/`/g, '&#96;'); }
  function isExternalHttp(value) {
    try { const url = new URL(String(value || '')); return (url.protocol === 'http:' || url.protocol === 'https:') && Boolean(url.hostname); }
    catch (error) { return false; }
  }
  function isUnsafeScheme(value) { return /^\s*(?:javascript|vbscript|file|filesystem|chrome|data|blob):/i.test(String(value || '')); }
  function normalizeTarget(value) {
    const target = String(value == null ? '' : value).trim();
    if (!target || /[\u0000-\u001f\u007f]/.test(target) || isUnsafeScheme(target)) return '';
    if (/^obs-pending-image:[A-Za-z0-9._~-]+$/.test(target)) return target;
    if (/^[a-z][a-z0-9+.-]*:/i.test(target) && !isExternalHttp(target)) return '';
    return target;
  }
  function parseTitleTarget(raw) {
    const text = String(raw || '').trim();
    const angle = text.match(/^<([^>]+)>(?:\s+["']([^"']*)["'])?$/);
    if (angle) return { target: angle[1], title: angle[2] || '' };
    const quoted = text.match(/^(.*?)(?:\s+["']([^"']*)["'])?$/);
    return { target: quoted ? quoted[1].trim() : text, title: quoted && quoted[2] || '' };
  }
  function parseImgAttributes(source) {
    const allowed = {};
    const text = String(source || '');
    const attrPattern = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
    let match;
    while ((match = attrPattern.exec(text))) {
      const name = match[1].toLowerCase();
      const value = match[2] !== undefined ? match[2] : match[3] !== undefined ? match[3] : match[4] !== undefined ? match[4] : '';
      if (name === 'src' || name === 'alt' || name === 'title') allowed[name] = value;
      else if (name === 'loading' && /^(?:lazy|eager)$/i.test(value)) allowed.loading = value.toLowerCase();
      else if ((name === 'width' || name === 'height') && /^\d{1,4}$/.test(value)) {
        const number = Number(value);
        if (number >= 1 && number <= 4096) allowed[name] = String(number);
      }
    }
    return allowed;
  }

  function renderRichMarkdown(markdown, options = {}) {
    const source = String(markdown == null ? '' : markdown).replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    const resources = [];
    const links = [];
    let imageCounter = 0;
    let linkCounter = 0;

    function imageHtml(src, alt, title, attrs = {}) {
      const target = normalizeTarget(src);
      if (!target) return `<span class="obs-md-invalid">[blocked image: ${escapeHtml(alt || src)}]</span>`;
      const id = `image-${++imageCounter}`;
      const external = isExternalHttp(target);
      resources.push({ id, type: 'image', target, external, alt: String(alt || ''), title: String(title || ''), width: attrs.width || '', height: attrs.height || '', loading: attrs.loading || 'lazy' });
      const dimensions = `${attrs.width ? ` width="${escapeAttribute(attrs.width)}"` : ''}${attrs.height ? ` height="${escapeAttribute(attrs.height)}"` : ''}`;
      return `<img data-obs-image-id="${id}" data-obs-image-target="${escapeAttribute(target)}" alt="${escapeAttribute(alt || '')}"${title ? ` title="${escapeAttribute(title)}"` : ''}${dimensions} loading="${escapeAttribute(attrs.loading || 'lazy')}" class="obs-md-image obs-md-image-pending">`;
    }

    function linkHtml(targetRaw, label, title) {
      const target = normalizeTarget(targetRaw);
      if (!target) return `<span class="obs-md-invalid">${escapeHtml(label)}</span>`;
      const id = `link-${++linkCounter}`;
      const external = isExternalHttp(target);
      links.push({ id, target, external, title: String(title || ''), label: String(label || '') });
      return `<a href="#" data-obs-link-id="${id}" data-obs-link-target="${escapeAttribute(target)}"${title ? ` title="${escapeAttribute(title)}"` : ''}>${label}</a>`;
    }

    function inline(value) {
      let text = String(value == null ? '' : value);
      const tokens = [];
      function token(html) { const key = `\u0000${tokens.length}\u0000`; tokens.push(html); return key; }
      text = text.replace(/`([^`\n]+)`/g, (_, code) => token(`<code>${escapeHtml(code)}</code>`));
      text = text.replace(/<img\b([^>]*)>/gi, (_, attrsText) => {
        const attrs = parseImgAttributes(attrsText);
        return token(imageHtml(attrs.src || '', attrs.alt || '', attrs.title || '', attrs));
      });
      text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, raw) => {
        const parsed = parseTitleTarget(raw);
        return token(imageHtml(parsed.target, alt, parsed.title));
      });
      text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, raw) => {
        const parsed = parseTitleTarget(raw);
        return token(linkHtml(parsed.target, inline(label), parsed.title));
      });
      text = escapeHtml(text);
      text = text.replace(/\*\*([^*\n]+)\*\*/g, '<strong>$1</strong>');
      text = text.replace(/__([^_\n]+)__/g, '<strong>$1</strong>');
      text = text.replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, '<em>$1</em>');
      text = text.replace(/(?<!_)_([^_\n]+)_(?!_)/g, '<em>$1</em>');
      text = text.replace(/~~([^~\n]+)~~/g, '<del>$1</del>');
      text = text.replace(/\u0000(\d+)\u0000/g, (_, index) => tokens[Number(index)] || '');
      return text;
    }

    function isTableDivider(line) { return /^\s*\|?(?:\s*:?-{3,}:?\s*\|)+\s*:?-{3,}:?\s*\|?\s*$/.test(line); }
    function cells(line) { return line.trim().replace(/^\||\|$/g, '').split('|').map((cell) => cell.trim()); }
    function detailsOpen(line) {
      const match = String(line || '').match(/^\s*<details(?:\s+(open))?\s*>\s*$/i);
      return match ? { open: Boolean(match[1]) } : null;
    }
    function detailsSummary(line) {
      const match = String(line || '').match(/^\s*<summary>([\s\S]*?)<\/summary>\s*$/i);
      return match ? match[1] : null;
    }
    function detailsLiteralEnd(lines, start) {
      let fenced = false;
      let depth = 0;
      for (let index = start; index < lines.length; index += 1) {
        const line = String(lines[index] || '');
        if (/^\s*```/.test(line)) {
          fenced = !fenced;
          continue;
        }
        if (fenced) continue;
        if (detailsOpen(line)) depth += 1;
        else if (/^\s*<\/details>\s*$/i.test(line)) {
          depth -= 1;
          if (depth <= 0) return index + 1;
        }
      }
      return lines.length;
    }
    function parseDetailsBlock(lines, start) {
      const opening = detailsOpen(lines[start]);
      if (!opening) return null;
      let summaryIndex = start + 1;
      while (summaryIndex < lines.length && !String(lines[summaryIndex]).trim()) summaryIndex += 1;
      const summary = summaryIndex < lines.length ? detailsSummary(lines[summaryIndex]) : null;
      if (summary == null) return null;
      let fenced = false;
      let closeIndex = -1;
      for (let index = summaryIndex + 1; index < lines.length; index += 1) {
        const line = String(lines[index] || '');
        if (/^\s*```/.test(line)) {
          fenced = !fenced;
          continue;
        }
        if (fenced) continue;
        if (detailsOpen(line)) return null;
        if (/^\s*<\/details>\s*$/i.test(line)) { closeIndex = index; break; }
      }
      if (closeIndex < 0) return null;
      return {
        open: opening.open,
        summary,
        bodyLines: lines.slice(summaryIndex + 1, closeIndex),
        nextIndex: closeIndex + 1
      };
    }

    function renderLines(lines, allowDetails = true) {
      const output = [];
      let index = 0;
      let paragraph = [];
      function flushParagraph() {
        if (!paragraph.length) return;
        output.push(`<p>${inline(paragraph.join('\n')).replace(/\n/g, '<br>')}</p>`);
        paragraph = [];
      }

      while (index < lines.length) {
        const line = lines[index];
        if (allowDetails && detailsOpen(line)) {
          const block = parseDetailsBlock(lines, index);
          flushParagraph();
          if (block) {
            const bodyHtml = renderLines(block.bodyLines, false);
            output.push(`<details class="obs-md-details"${block.open ? ' open' : ''}><summary class="obs-md-summary">${inline(block.summary)}</summary><div class="obs-md-details-body">${bodyHtml}</div></details>`);
            index = block.nextIndex;
          } else {
            const nextIndex = detailsLiteralEnd(lines, index);
            output.push(`<p class="obs-md-literal-html">${escapeHtml(lines.slice(index, nextIndex).join('\n')).replace(/\n/g, '<br>')}</p>`);
            index = nextIndex;
          }
          continue;
        }
        if (/^```/.test(line)) {
          flushParagraph();
          const language = line.slice(3).trim().replace(/[^a-zA-Z0-9_+-]/g, '');
          const code = [];
          index += 1;
          while (index < lines.length && !/^```/.test(lines[index])) code.push(lines[index++]);
          if (index < lines.length) index += 1;
          output.push(`<pre><code${language ? ` class="language-${escapeAttribute(language)}"` : ''}>${escapeHtml(code.join('\n'))}</code></pre>`);
          continue;
        }
        const heading = line.match(/^(#{1,6})\s+(.+)$/);
        if (heading) { flushParagraph(); const level = heading[1].length; output.push(`<h${level}>${inline(heading[2])}</h${level}>`); index += 1; continue; }
        if (line.startsWith('>')) {
          flushParagraph(); const quoted = [];
          while (index < lines.length && /^>\s?/.test(lines[index])) quoted.push(lines[index++].replace(/^>\s?/, ''));
          output.push(`<blockquote>${quoted.map((item) => `<p>${inline(item)}</p>`).join('')}</blockquote>`); continue;
        }
        if (/^\s*[-*+]\s+/.test(line)) {
          flushParagraph(); const items = [];
          while (index < lines.length && /^\s*[-*+]\s+/.test(lines[index])) {
            const raw = lines[index++].replace(/^\s*[-*+]\s+/, '');
            const task = raw.match(/^\[([ xX])\]\s+(.*)$/);
            items.push(task ? `<li class="task"><input type="checkbox" disabled ${task[1].toLowerCase() === 'x' ? 'checked' : ''}> ${inline(task[2])}</li>` : `<li>${inline(raw)}</li>`);
          }
          output.push(`<ul>${items.join('')}</ul>`); continue;
        }
        if (/^\s*\d+[.)]\s+/.test(line)) {
          flushParagraph(); const items = [];
          while (index < lines.length && /^\s*\d+[.)]\s+/.test(lines[index])) items.push(`<li>${inline(lines[index++].replace(/^\s*\d+[.)]\s+/, ''))}</li>`);
          output.push(`<ol>${items.join('')}</ol>`); continue;
        }
        if (line.includes('|') && index + 1 < lines.length && isTableDivider(lines[index + 1])) {
          flushParagraph(); const header = cells(line); index += 2; const rows = [];
          while (index < lines.length && lines[index].includes('|') && lines[index].trim()) rows.push(cells(lines[index++]));
          output.push(`<table><thead><tr>${header.map((cell) => `<th>${inline(cell)}</th>`).join('')}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${inline(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table>`); continue;
        }
        if (/^\s*(?:---+|___+|\*\*\*+)\s*$/.test(line)) { flushParagraph(); output.push('<hr>'); index += 1; continue; }
        if (!line.trim()) { flushParagraph(); index += 1; continue; }
        paragraph.push(line); index += 1;
      }
      flushParagraph();
      return output.join('\n');
    }

    const html = renderLines(source.split('\n'), true);
    return { html, resources, links, sourceLength: source.length, safe: true, options: { allowRawImg: options.allowRawImg !== false, allowDetails: true } };
  }

  return { renderRichMarkdown, escapeRichMarkdownHtml: escapeHtml, normalizeRichMarkdownTarget: normalizeTarget, parseRichMarkdownImgAttributes: parseImgAttributes };
});

/* src/chat-response-reader.js */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const CHAT_RESPONSE_READER_SCHEMA_VERSION = 1;
  const READER_SOURCE_KINDS = new Set(['paste', 'chat-dom']);
  const READER_SOURCE_ACCURACY = new Set(['exact', 'derived']);

  function normalizeReaderSourceKind(value) {
    return READER_SOURCE_KINDS.has(String(value || '')) ? String(value) : 'paste';
  }

  function normalizeReaderSourceAccuracy(value, sourceKind = 'paste') {
    const kind = normalizeReaderSourceKind(sourceKind);
    if (kind === 'chat-dom') return 'derived';
    return 'exact';
  }

  function createChatResponseReaderState(input = {}) {
    const sourceKind = normalizeReaderSourceKind(input.sourceKind);
    return {
      schemaVersion: CHAT_RESPONSE_READER_SCHEMA_VERSION,
      open: Boolean(input.open),
      mode: input.mode === 'rendered' ? 'rendered' : 'paste',
      sourceKind,
      sourceAccuracy: normalizeReaderSourceAccuracy(input.sourceAccuracy, sourceKind),
      conversationKey: String(input.conversationKey || ''),
      messageKey: String(input.messageKey || ''),
      markdown: String(input.markdown == null ? '' : input.markdown),
      capturedAt: String(input.capturedAt || ''),
      status: String(input.status || ''),
      renderDiagnostics: Array.isArray(input.renderDiagnostics) ? input.renderDiagnostics.map((item) => ({ ...item })) : []
    };
  }

  function childNodes(node) {
    return node && node.childNodes ? Array.from(node.childNodes) : [];
  }

  function childElements(node) {
    return childNodes(node).filter((item) => item && Number(item.nodeType) === 1);
  }

  function tagName(node) {
    return String(node && (node.tagName || node.nodeName) || '').toLowerCase();
  }

  function attribute(node, name) {
    if (!node || typeof node.getAttribute !== 'function') return '';
    const value = node.getAttribute(name);
    return value == null ? '' : String(value);
  }

  function textContent(node) {
    return String(node && node.textContent != null ? node.textContent : '');
  }

  function maxBacktickRun(value) {
    let maximum = 0;
    for (const match of String(value || '').matchAll(/`+/g)) maximum = Math.max(maximum, match[0].length);
    return maximum;
  }

  function inlineCode(value) {
    const text = String(value == null ? '' : value);
    const fence = '`'.repeat(Math.max(1, maxBacktickRun(text) + 1));
    const padded = /^\s|\s$/.test(text) ? ` ${text} ` : text;
    return `${fence}${padded}${fence}`;
  }

  function safeHref(value) {
    const href = String(value || '').trim();
    if (!href || href === '#') return '';
    if (/^(?:javascript|vbscript|data|blob|file|filesystem|chrome):/i.test(href)) return '';
    return href;
  }

  function markdownTableCell(value) {
    return String(value == null ? '' : value).replace(/\|/g, '\\|').replace(/\s*\n\s*/g, ' ').trim();
  }

  function descendantRows(table) {
    const rows = [];
    const walk = (node) => {
      for (const child of childElements(node)) {
        if (tagName(child) === 'tr') rows.push(child);
        else walk(child);
      }
    };
    walk(table);
    return rows;
  }

  function serializeChatResponseDom(rootNode) {
    const diagnostics = [];

    function note(kind, detail = {}) {
      diagnostics.push({ kind, ...detail });
    }

    function serializeChildren(node, context = {}) {
      return childNodes(node).map((child) => serializeNode(child, context)).join('');
    }

    function serializeList(node, ordered) {
      const items = childElements(node).filter((child) => tagName(child) === 'li');
      return `${items.map((item, index) => {
        const body = serializeChildren(item, { listItem: true }).trim();
        const prefix = ordered ? `${index + 1}. ` : '- ';
        const lines = body.split('\n');
        return `${prefix}${lines[0] || ''}${lines.slice(1).map((line) => `\n  ${line}`).join('')}`;
      }).join('\n')}\n\n`;
    }

    function serializeTable(node) {
      const rows = descendantRows(node).map((row) => childElements(row).filter((cell) => ['th', 'td'].includes(tagName(cell))).map((cell) => markdownTableCell(serializeChildren(cell).trim())));
      if (!rows.length) return '';
      const width = Math.max(...rows.map((row) => row.length));
      const normalized = rows.map((row) => [...row, ...Array(Math.max(0, width - row.length)).fill('')]);
      const header = normalized[0];
      const body = normalized.slice(1);
      return `| ${header.join(' | ')} |\n| ${header.map(() => '---').join(' | ')} |\n${body.map((row) => `| ${row.join(' | ')} |`).join('\n')}${body.length ? '\n' : ''}\n`;
    }

    function serializeDetails(node) {
      const children = childElements(node);
      const summary = children.find((child) => tagName(child) === 'summary');
      if (!summary) {
        note('details-without-summary');
        return serializeChildren(node);
      }
      const summaryMarkdown = serializeChildren(summary).trim() || textContent(summary).trim();
      const body = childNodes(node)
        .filter((child) => child !== summary)
        .map((child) => serializeNode(child, {}))
        .join('')
        .trim();
      const open = Boolean(node && (node.open === true || (typeof node.hasAttribute === 'function' && node.hasAttribute('open'))));
      return `<details${open ? ' open' : ''}>\n<summary>${summaryMarkdown}</summary>\n\n${body}\n\n</details>\n\n`;
    }

    function serializeNode(node, context = {}) {
      if (!node) return '';
      if (Number(node.nodeType) === 3) return String(node.nodeValue != null ? node.nodeValue : textContent(node));
      if (Number(node.nodeType) !== 1) return '';
      if (typeof node.hasAttribute === 'function' && node.hasAttribute('data-obs-chat-response-reader-action')) return '';
      const tag = tagName(node);
      if (!tag) return '';

      if (['script', 'style', 'svg', 'canvas', 'noscript', 'template'].includes(tag)) {
        note('omitted-element', { tag });
        return '';
      }
      if (tag === 'br') return '\n';
      if (tag === 'hr') return '\n---\n\n';
      if (/^h[1-6]$/.test(tag)) return `${'#'.repeat(Number(tag.slice(1)))} ${serializeChildren(node).trim()}\n\n`;
      if (tag === 'p') return `${serializeChildren(node).trim()}\n\n`;
      if (tag === 'strong' || tag === 'b') return `**${serializeChildren(node)}**`;
      if (tag === 'em' || tag === 'i') return `*${serializeChildren(node)}*`;
      if (tag === 'del' || tag === 's' || tag === 'strike') return `~~${serializeChildren(node)}~~`;
      if (tag === 'code' && tagName(node.parentNode) !== 'pre') return inlineCode(textContent(node));
      if (tag === 'pre') {
        const codeChild = childElements(node).find((child) => tagName(child) === 'code');
        const content = textContent(codeChild || node).replace(/\n$/, '');
        const className = String(codeChild && codeChild.className || '');
        const languageMatch = className.match(/(?:^|\s)language-([A-Za-z0-9_+-]+)/);
        const ticks = '`'.repeat(Math.max(3, maxBacktickRun(content) + 1));
        return `${ticks}${languageMatch ? languageMatch[1] : ''}\n${content}\n${ticks}\n\n`;
      }
      if (tag === 'blockquote') {
        const body = serializeChildren(node).trim();
        return `${body.split('\n').map((line) => `> ${line}`).join('\n')}\n\n`;
      }
      if (tag === 'ul') return serializeList(node, false);
      if (tag === 'ol') return serializeList(node, true);
      if (tag === 'li') return serializeChildren(node, { listItem: true });
      if (tag === 'a') {
        const label = serializeChildren(node).trim() || textContent(node).trim();
        const href = safeHref(attribute(node, 'href'));
        if (!href) return label;
        return `[${label}](${href})`;
      }
      if (tag === 'img') {
        const alt = attribute(node, 'alt');
        const src = safeHref(attribute(node, 'src'));
        if (!src) {
          if (alt) return alt;
          note('image-without-portable-source');
          return '';
        }
        return `![${alt}](${src})`;
      }
      if (tag === 'table') return serializeTable(node);
      if (tag === 'details') return serializeDetails(node);
      if (tag === 'summary') return serializeChildren(node);
      if (tag === 'button') return '';
      if (['div', 'span', 'article', 'section', 'main', 'header', 'footer'].includes(tag)) return serializeChildren(node, context);

      note('unrecognized-element', { tag });
      return serializeChildren(node, context);
    }

    const raw = serializeNode(rootNode, {});
    const markdown = String(raw || '')
      .replace(/\u00a0/g, ' ')
      .replace(/[ \t]+\n/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
    if (!markdown) note('empty-derived-markdown');
    return { markdown, diagnostics };
  }

  return {
    CHAT_RESPONSE_READER_SCHEMA_VERSION,
    normalizeReaderSourceKind,
    normalizeReaderSourceAccuracy,
    createChatResponseReaderState,
    serializeChatResponseDom,
    inlineCode
  };
});

/* src/repository-media-loader.js */
(function (root, factory) {
  const api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function (root) {
  'use strict';

  const DEFAULT_MEDIA_MAX_BYTES = 5 * 1024 * 1024;
  const MIME_BY_EXTENSION = Object.freeze({ png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', gif: 'image/gif', webp: 'image/webp', svg: 'image/svg+xml', avif: 'image/avif' });
  function cleanPath(value) { return String(value == null ? '' : value).replace(/\\/g, '/').trim(); }
  function isExternal(value) { try { const parsed = new URL(String(value || '')); return parsed.protocol === 'http:' || parsed.protocol === 'https:'; } catch (error) { return false; } }
  function fallbackDecodeRepositoryMarkdownPath(value) {
    const text = cleanPath(value);
    if (!text) return '';
    if (/%(?![0-9A-Fa-f]{2})/.test(text)) throw new Error(`Repository Markdown target has invalid percent encoding: ${text}`);
    const rootRelative = text.startsWith('/');
    const rawParts = text.split('/');
    const decoded = [];
    for (let index = 0; index < rawParts.length; index += 1) {
      const raw = rawParts[index];
      if (!raw) {
        if (index === 0 && rootRelative) continue;
        throw new Error('Repository Markdown target contains an empty path segment.');
      }
      if (raw === '.' || raw === '..') { decoded.push(raw); continue; }
      let segment;
      try { segment = decodeURIComponent(raw); }
      catch (error) { throw new Error(`Repository Markdown target has invalid percent encoding: ${text}`); }
      if (!segment || segment === '.' || segment === '..') throw new Error(`Repository Markdown target contains encoded traversal: ${text}`);
      if (/[\/?#\u0000-\u001f\u007f]/.test(segment)) throw new Error(`Repository Markdown target contains an invalid decoded path segment: ${text}`);
      decoded.push(segment);
    }
    const result = decoded.join('/');
    if (!result) throw new Error('Repository Markdown target path is empty.');
    return `${rootRelative ? '/' : ''}${result}`;
  }
  function decodeRepositoryMarkdownPath(value) {
    const shared = root && root.ObsLinkedNotes && root.ObsLinkedNotes.decodeRepositoryMarkdownPath;
    return typeof shared === 'function' ? shared(value) : fallbackDecodeRepositoryMarkdownPath(value);
  }
  function resolveRepositoryMediaPath(sourcePath, target) {
    const input = cleanPath(target);
    if (!input || /[?#\u0000-\u001f\u007f]/.test(input) || input.includes('://') || /^[a-zA-Z]:\//.test(input)) throw new TypeError('Repository image path must be a portable repository-relative path.');
    const raw = decodeRepositoryMarkdownPath(input);
    const base = raw.startsWith('/') ? [] : cleanPath(sourcePath).split('/').slice(0, -1);
    const pieces = raw.replace(/^\/+/, '').split('/');
    const out = [...base];
    for (const piece of pieces) {
      if (!piece || piece === '.') continue;
      if (piece === '..') { if (!out.length) throw new TypeError('Repository image path escapes the repository.'); out.pop(); }
      else out.push(piece);
    }
    if (!out.length) throw new TypeError('Repository image path is empty.');
    return out.join('/');
  }
  function mimeForPath(path, declared = '') {
    const value = String(declared || '').toLowerCase().split(';')[0].trim();
    if (value && value.startsWith('image/')) return value;
    const name = cleanPath(path).slice(cleanPath(path).lastIndexOf('/') + 1);
    const extension = name.includes('.') ? name.slice(name.lastIndexOf('.') + 1).toLowerCase() : '';
    return MIME_BY_EXTENSION[extension] || '';
  }

  class RepositoryMediaLoader {
    constructor(options = {}) {
      this.readBytes = options.readBytes;
      this.createObjectUrl = options.createObjectUrl || ((blob) => URL.createObjectURL(blob));
      this.revokeObjectUrl = options.revokeObjectUrl || ((url) => URL.revokeObjectURL(url));
      this.maxBytes = Number(options.maxBytes) > 0 ? Number(options.maxBytes) : DEFAULT_MEDIA_MAX_BYTES;
      this.urls = new Set();
      if (typeof this.readBytes !== 'function') throw new TypeError('readBytes callback is required.');
    }
    async load(resource, context = {}) {
      if (!resource || resource.type !== 'image') throw new TypeError('Image resource is required.');
      if (resource.external || isExternal(resource.target)) return { id: resource.id, status: 'external_blocked', target: resource.target, message: 'External image loading requires an explicit action.' };
      const path = resolveRepositoryMediaPath(context.sourcePath, resource.target);
      const result = await this.readBytes(path, { maxBytes: this.maxBytes });
      const bytes = result && result.bytes instanceof Uint8Array ? result.bytes : Uint8Array.from(result && result.bytes || []);
      if (bytes.byteLength > this.maxBytes) throw new Error(`Repository image is ${bytes.byteLength} bytes; media limit is ${this.maxBytes}.`);
      const mime = mimeForPath(path, result && result.contentType);
      if (!mime) throw new Error(`Unsupported repository image format: ${path}`);
      const blob = new Blob([bytes], { type: mime });
      const objectUrl = this.createObjectUrl(blob);
      this.urls.add(objectUrl);
      return { id: resource.id, status: 'loaded', path, objectUrl, mime, size: bytes.byteLength, htmlUrl: result && result.htmlUrl || '' };
    }
    async loadAll(resources, context = {}) {
      const results = [];
      for (const resource of Array.isArray(resources) ? resources : []) {
        try { results.push(await this.load(resource, context)); }
        catch (error) { results.push({ id: resource && resource.id || '', status: 'error', target: resource && resource.target || '', message: String(error && error.message || error) }); }
      }
      return results;
    }
    dispose() {
      for (const url of this.urls) { try { this.revokeObjectUrl(url); } catch (error) { /* ignore cleanup */ } }
      this.urls.clear();
    }
  }

  return { DEFAULT_MEDIA_MAX_BYTES, RepositoryMediaLoader, resolveRepositoryMediaPath, repositoryImageMimeForPath: mimeForPath };
});

/* src/category-definition-codec.js */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const CATEGORY_V1_MARKER_PREFIX = '<!-- obs-file-category:v1 ';
  const CATEGORY_V2_MARKER_PREFIX = '<!-- obs-file-category:v2 ';
  const CATEGORY_V3_MARKER_PREFIX = '<!-- obs-file-category:v3 ';
  const CATEGORY_MARKER_SUFFIX = ' -->';
  const IMPLIED_START = '<!-- obs-file-category:implied:start -->';
  const IMPLIED_END = '<!-- obs-file-category:implied:end -->';
  const FILES_START = '<!-- obs-file-category:files:start -->';
  const FILES_END = '<!-- obs-file-category:files:end -->';
  const NOTES_START = '<!-- obs-file-category:notes:start -->';
  const NOTES_END = '<!-- obs-file-category:notes:end -->';
  const NOTE_ID_COMMENT_PREFIX = '<!-- obs-category-note:';
  const NOTE_ID_COMMENT_SUFFIX = ' -->';

  function normalizeCategoryId(value) {
    const text = String(value == null ? '' : value).trim().toLowerCase()
      .normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9._-]+/g, '-').replace(/^-+|-+$/g, '').replace(/-{2,}/g, '-');
    if (!text || text.length > 80) throw new TypeError('Category id must contain portable letters, digits, dots, underscores or hyphens.');
    return text;
  }

  function normalizeCategoryName(value) {
    const text = String(value == null ? '' : value).trim();
    if (!text) throw new TypeError('Category name is required.');
    if (/\r|\n/.test(text)) throw new TypeError('Category name must be one line.');
    return text;
  }

  function normalizeNoteId(value) {
    const text = String(value == null ? '' : value).trim();
    if (!text) return '';
    if (text.length > 160 || /[\r\n<>]/.test(text)) throw new TypeError('Category Note id is invalid.');
    return text;
  }

  function escapeMarkdownLabel(value) {
    return String(value == null ? '' : value).replace(/\\/g, '\\\\').replace(/\[/g, '\\[').replace(/\]/g, '\\]');
  }

  function normalizeLinkItems(items, key, options = {}) {
    const result = [];
    const seen = new Set();
    for (const item of Array.isArray(items) ? items : []) {
      const target = String(item && item[key] || '').trim().replace(/\\/g, '/');
      if (!target) continue;
      if (/^[a-zA-Z]:\//.test(target) || target.startsWith('/') || target.includes('://') || /[?#]/.test(target)) {
        throw new TypeError(`Category link must be a portable repository-relative Markdown path: ${target}`);
      }
      const noteId = options.notes ? normalizeNoteId(item && item.noteId) : '';
      const identity = options.notes ? `${target}\n${noteId}` : target;
      if (seen.has(identity)) continue;
      seen.add(identity);
      result.push({ ...item, [key]: target, label: String(item && item.label || target).trim() || target, ...(options.notes ? { noteId } : {}) });
    }
    return result;
  }

  function encodeMarkdownTarget(value) {
    const target = String(value == null ? '' : value).trim().replace(/\\/g, '/');
    return target.split('/').map((segment) => {
      if (segment === '.' || segment === '..') return segment;
      return encodeURIComponent(segment).replace(/[!'()*]/g, (character) => `%${character.charCodeAt(0).toString(16).toUpperCase()}`);
    }).join('/');
  }

  function decodeMarkdownTarget(value) {
    let target = String(value == null ? '' : value).trim();
    if (target.startsWith('<') && target.endsWith('>')) target = target.slice(1, -1);
    return target.split('/').map((segment) => {
      if (segment === '.' || segment === '..') return segment;
      let decoded;
      try { decoded = decodeURIComponent(segment.replace(/%(?![0-9A-Fa-f]{2})/g, '%25')); }
      catch (error) { throw new Error(`Category link target has invalid percent encoding: ${target}`); }
      if (!decoded || /[\\/?#\u0000-\u001f\u007f]/.test(decoded)) throw new Error(`Category link target contains an invalid path segment: ${target}`);
      return decoded;
    }).join('/');
  }

  function renderLinks(items) {
    return items.length ? items.map((item) => `- [${escapeMarkdownLabel(item.label)}](<${encodeMarkdownTarget(item.target)}>)`).join('\n') : '_None._';
  }

  function renderNoteLinks(items) {
    return items.length ? items.map((item) => {
      const comment = item.noteId ? ` ${NOTE_ID_COMMENT_PREFIX}${String(item.noteId).replace(/--/g, '\\u002d\\u002d')}${NOTE_ID_COMMENT_SUFFIX}` : '';
      return `- [${escapeMarkdownLabel(item.label)}](<${encodeMarkdownTarget(item.target)}>)${comment}`;
    }).join('\n') : '_None._';
  }

  function encodeCategoryDefinition(input = {}) {
    const id = normalizeCategoryId(input.id || input.name);
    const name = normalizeCategoryName(input.name || id);
    const description = String(input.description == null ? '' : input.description).replace(/\r\n/g, '\n').replace(/\r/g, '\n').replace(/\n+$/g, '');
    const implied = normalizeLinkItems(input.impliedCategories, 'target');
    const files = normalizeLinkItems(input.files, 'target');
    const notes = normalizeLinkItems(input.notes, 'target', { notes: true });
    const metadata = JSON.stringify({ schemaVersion: 3, id, name });
    const descriptionBlock = description ? `${description}\n\n` : '';
    return `${CATEGORY_V3_MARKER_PREFIX}${metadata}${CATEGORY_MARKER_SUFFIX}\n\n# ${name}\n\n${descriptionBlock}${IMPLIED_START}\n## Implied categories\n\n${renderLinks(implied)}\n${IMPLIED_END}\n\n${FILES_START}\n## Files\n\n${renderLinks(files)}\n${FILES_END}\n\n${NOTES_START}\n## Notes\n\n${renderNoteLinks(notes)}\n${NOTES_END}\n`;
  }

  function parseMarker(markdown) {
    const first = String(markdown || '').split(/\r?\n/, 1)[0];
    const candidates = [
      [CATEGORY_V3_MARKER_PREFIX, 3], [CATEGORY_V2_MARKER_PREFIX, 2], [CATEGORY_V1_MARKER_PREFIX, 1]
    ];
    const found = candidates.find(([prefix]) => first.startsWith(prefix));
    if (!found || !first.endsWith(CATEGORY_MARKER_SUFFIX)) throw new Error('Markdown is not an obs-file-category definition.');
    const [prefix, expected] = found;
    let metadata;
    try { metadata = JSON.parse(first.slice(prefix.length, -CATEGORY_MARKER_SUFFIX.length)); }
    catch (error) { throw new Error(`Category marker JSON is invalid: ${error.message}`); }
    if (Number(metadata && metadata.schemaVersion) !== expected) throw new Error('Unsupported category definition schema.');
    return { schemaVersion: expected, id: normalizeCategoryId(metadata.id), name: normalizeCategoryName(metadata.name) };
  }

  function parseMarkdownLinks(text, options = {}) {
    const result = [];
    for (const line of String(text || '').split(/\r?\n/)) {
      const match = line.match(/^\s*-\s+\[((?:\\.|[^\]])*)\]\((.*)\)\s*(?:<!--\s*obs-category-note:([\s\S]*?)\s*-->)?\s*$/);
      if (!match) continue;
      const label = match[1].replace(/\\([\\\[\]])/g, '$1');
      const target = decodeMarkdownTarget(match[2]);
      result.push({ label, target, ...(options.notes ? { noteId: normalizeNoteId(match[3] || '') } : {}) });
    }
    return normalizeLinkItems(result, 'target', options);
  }

  function bodyAndHeading(source) {
    const newline = source.indexOf('\n');
    const body = (newline < 0 ? '' : source.slice(newline + 1)).replace(/^\n+/, '');
    const heading = body.match(/^#\s+(.+)\n/);
    if (!heading) throw new Error('Category definition title is missing.');
    return { body, heading };
  }

  function decodeV1(source, marker) {
    const { body, heading } = bodyAndHeading(source);
    const impliedHeading = '\n## Implied categories\n';
    const filesHeading = '\n## Files\n';
    const impliedIndex = body.indexOf(impliedHeading);
    const filesIndex = body.indexOf(filesHeading);
    if (impliedIndex < 0 || filesIndex < 0 || filesIndex <= impliedIndex) throw new Error('Legacy category managed sections are missing or out of order.');
    return {
      schemaVersion: 1, id: marker.id, name: marker.name,
      description: body.slice(heading[0].length, impliedIndex).replace(/^\n+|\n+$/g, ''),
      impliedCategories: parseMarkdownLinks(body.slice(impliedIndex + impliedHeading.length, filesIndex)),
      files: parseMarkdownLinks(body.slice(filesIndex + filesHeading.length)), notes: []
    };
  }

  function findManagedRegion(body, startMarker, endMarker, label) {
    const start = body.indexOf(startMarker);
    const end = body.indexOf(endMarker);
    if (start < 0 || end < 0 || end <= start) throw new Error(`${label} managed boundaries are missing or out of order.`);
    if (body.indexOf(startMarker, start + startMarker.length) >= 0 || body.indexOf(endMarker, end + endMarker.length) >= 0) throw new Error(`${label} managed boundaries are duplicated.`);
    return { start, end, contentStart: start + startMarker.length, content: body.slice(start + startMarker.length, end) };
  }

  function decodeManaged(source, marker) {
    const { body, heading } = bodyAndHeading(source);
    const implied = findManagedRegion(body, IMPLIED_START, IMPLIED_END, 'Implied categories');
    const files = findManagedRegion(body, FILES_START, FILES_END, 'Files');
    if (implied.start < heading[0].length || files.start <= implied.end) throw new Error('Category managed boundaries are out of order.');
    let notes = null;
    if (marker.schemaVersion >= 3) {
      notes = findManagedRegion(body, NOTES_START, NOTES_END, 'Notes');
      if (notes.start <= files.end) throw new Error('Category managed boundaries are out of order.');
    }
    return {
      schemaVersion: marker.schemaVersion,
      id: marker.id,
      name: marker.name,
      description: body.slice(heading[0].length, implied.start).replace(/^\n+|\n+$/g, ''),
      impliedCategories: parseMarkdownLinks(implied.content),
      files: parseMarkdownLinks(files.content),
      notes: notes ? parseMarkdownLinks(notes.content, { notes: true }) : []
    };
  }

  function decodeCategoryDefinition(markdown) {
    const source = String(markdown == null ? '' : markdown).replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    const marker = parseMarker(source);
    return marker.schemaVersion === 1 ? decodeV1(source, marker) : decodeManaged(source, marker);
  }

  function isCategoryDefinitionMarkdown(markdown) {
    const source = String(markdown || '');
    return source.startsWith(CATEGORY_V1_MARKER_PREFIX) || source.startsWith(CATEGORY_V2_MARKER_PREFIX) || source.startsWith(CATEGORY_V3_MARKER_PREFIX);
  }

  function categoryFileName(id) { return `${normalizeCategoryId(id)}.md`; }

  return {
    CATEGORY_MARKER_PREFIX: CATEGORY_V3_MARKER_PREFIX,
    CATEGORY_V1_MARKER_PREFIX, CATEGORY_V2_MARKER_PREFIX, CATEGORY_V3_MARKER_PREFIX,
    IMPLIED_START, IMPLIED_END, FILES_START, FILES_END, NOTES_START, NOTES_END,
    normalizeCategoryId, normalizeCategoryName, encodeCategoryDefinition, decodeCategoryDefinition,
    isCategoryDefinitionMarkdown, categoryFileName, encodeMarkdownTarget, decodeMarkdownTarget
  };
});

/* src/repository-category-index.js */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  function normalizePath(value) { return String(value || '').replace(/\\/g, '/').replace(/^\.\//, ''); }
  function validationFor(source, path, fallbackMessage) {
    if (!source) return { status: 'unchecked', message: fallbackMessage };
    const value = source instanceof Map ? source.get(path) : source[path];
    if (!value) return { status: 'unchecked', message: fallbackMessage };
    if (typeof value === 'string') return { status: value, message: '' };
    return { status: String(value.status || 'unchecked'), message: String(value.message || '') };
  }
  function targetKey(type, path) { return `${type}:${path}`; }

  function buildRepositoryCategoryIndex(definitions = [], options = {}) {
    const categories = new Map();
    const byPath = new Map();
    const errors = [];
    for (const raw of Array.isArray(definitions) ? definitions : []) {
      const definition = raw && raw.definition ? raw.definition : raw;
      const path = normalizePath(raw && raw.path || definition && definition.path);
      if (!definition || !definition.id || !path) {
        errors.push({ kind: 'invalid_definition', path, message: 'Category definition identity or path is missing.' });
        continue;
      }
      if (categories.has(definition.id)) {
        errors.push({ kind: 'duplicate_id', id: definition.id, path, firstPath: categories.get(definition.id).path, message: `Duplicate category id ${definition.id}: ${categories.get(definition.id).path} and ${path}.` });
        continue;
      }
      const record = {
        ...definition,
        notes: Array.isArray(definition.notes) ? definition.notes : [],
        path,
        sha: String(raw.sha || ''),
        htmlUrl: String(raw.htmlUrl || ''),
        explicitFiles: [],
        explicitNotes: [],
        impliedCategoryIds: [],
        brokenLinks: []
      };
      categories.set(definition.id, record);
      byPath.set(path, definition.id);
    }

    function resolveRelative(sourcePath, target) {
      const sourceDir = sourcePath.includes('/') ? sourcePath.slice(0, sourcePath.lastIndexOf('/')) : '';
      const parts = [...(sourceDir ? sourceDir.split('/') : []), ...normalizePath(target).split('/')];
      const out = [];
      for (const part of parts) {
        if (!part || part === '.') continue;
        if (part === '..') { if (!out.length) return ''; out.pop(); }
        else out.push(part);
      }
      return out.join('/');
    }

    function addValidationIssue(category, type, path, validation) {
      const prefix = type === 'note' ? 'Note' : 'Member file';
      if (validation.status === 'missing') {
        const issue = { kind: type === 'note' ? 'broken_note_link' : 'broken_file_link', path: category.path, targetPath: path, message: `${prefix} does not exist: ${path}.` };
        category.brokenLinks.push(issue); errors.push(issue);
      } else if (validation.status === 'inaccessible') {
        errors.push({ kind: type === 'note' ? 'inaccessible_note_link' : 'inaccessible_file_link', path: category.path, targetPath: path, message: validation.message || `${prefix} could not be validated: ${path}.` });
      } else if (validation.status === 'unchecked') {
        errors.push({ kind: type === 'note' ? 'unchecked_note_link' : 'unchecked_file_link', path: category.path, targetPath: path, message: validation.message || `${prefix} was not validated: ${path}.` });
      }
    }

    for (const category of categories.values()) {
      const fileSeen = new Set();
      for (const link of category.files || []) {
        const path = resolveRelative(category.path, link.target);
        if (!path) {
          const issue = { kind: 'file_link_invalid', path: category.path, target: link.target, message: `Invalid member-file link in ${category.path}: ${link.target}.` };
          category.brokenLinks.push(issue); errors.push(issue); continue;
        }
        if (fileSeen.has(path)) continue;
        fileSeen.add(path);
        const validation = validationFor(options.fileValidation, path, 'File target was not validated.');
        const file = { type: 'file', path, label: link.label || path, validation: validation.status, validationMessage: validation.message };
        category.explicitFiles.push(file);
        addValidationIssue(category, 'file', path, validation);
      }

      const noteSeen = new Set();
      for (const link of category.notes || []) {
        const path = resolveRelative(category.path, link.target);
        if (!path) {
          const issue = { kind: 'note_link_invalid', path: category.path, target: link.target, noteId: String(link.noteId || ''), message: `Invalid member-Note link in ${category.path}: ${link.target}.` };
          category.brokenLinks.push(issue); errors.push(issue); continue;
        }
        const identity = `${path}\n${String(link.noteId || '')}`;
        if (noteSeen.has(identity)) continue;
        noteSeen.add(identity);
        const validation = validationFor(options.noteValidation, path, 'Note target was not validated.');
        const note = { type: 'note', path, noteId: String(link.noteId || ''), label: link.label || path, validation: validation.status, validationMessage: validation.message };
        category.explicitNotes.push(note);
        addValidationIssue(category, 'note', path, validation);
      }

      const impliedSeen = new Set();
      for (const link of category.impliedCategories || []) {
        const targetPath = resolveRelative(category.path, link.target);
        const id = byPath.get(targetPath);
        if (!id) {
          const issue = { kind: 'broken_category_link', path: category.path, target: link.target, targetPath, message: `Implied category target is missing: ${targetPath || link.target}.` };
          category.brokenLinks.push(issue); errors.push(issue); continue;
        }
        if (!impliedSeen.has(id)) { impliedSeen.add(id); category.impliedCategoryIds.push(id); }
      }
    }

    const cycles = [];
    const cycleKeys = new Set();
    const visiting = new Set();
    const visited = new Set();
    function visit(id, stack) {
      if (visiting.has(id)) {
        const start = stack.indexOf(id);
        const cycle = [...stack.slice(start), id];
        const key = cycle.join('->');
        if (!cycleKeys.has(key)) { cycleKeys.add(key); cycles.push(cycle); }
        return;
      }
      if (visited.has(id)) return;
      visiting.add(id);
      const category = categories.get(id);
      for (const next of category ? category.impliedCategoryIds : []) visit(next, [...stack, id]);
      visiting.delete(id);
      visited.add(id);
    }
    for (const id of categories.keys()) visit(id, []);
    for (const cycle of cycles) errors.push({ kind: 'cycle', ids: cycle, path: categories.get(cycle[0]) ? categories.get(cycle[0]).path : '', message: `Category implication cycle: ${cycle.join(' → ')}` });

    const cycleEdges = new Set(cycles.flatMap((cycle) => cycle.slice(0, -1).map((id, index) => `${id}->${cycle[index + 1]}`)));
    const memberships = new Map();
    function addMembership(target, categoryId) {
      const key = targetKey(target.type, target.path);
      const entry = memberships.get(key) || {
        key,
        type: target.type,
        path: target.path,
        noteId: target.noteId || '',
        label: target.label || target.path,
        explicit: new Set(),
        derived: new Set(),
        validation: target.validation,
        validationMessage: target.validationMessage
      };
      entry.explicit.add(categoryId);
      if (entry.validation === 'unchecked' && target.validation !== 'unchecked') {
        entry.validation = target.validation;
        entry.validationMessage = target.validationMessage;
      }
      memberships.set(key, entry);
    }
    for (const category of categories.values()) {
      for (const file of category.explicitFiles) addMembership(file, category.id);
      for (const note of category.explicitNotes) addMembership(note, category.id);
    }

    function ancestors(id, seen = new Set()) {
      if (seen.has(id)) return new Set();
      const nextSeen = new Set(seen); nextSeen.add(id);
      const result = new Set();
      const category = categories.get(id);
      for (const parent of category ? category.impliedCategoryIds : []) {
        if (cycleEdges.has(`${id}->${parent}`)) continue;
        result.add(parent);
        for (const ancestor of ancestors(parent, nextSeen)) result.add(ancestor);
      }
      return result;
    }
    for (const entry of memberships.values()) {
      for (const explicit of entry.explicit) for (const implied of ancestors(explicit)) if (!entry.explicit.has(implied)) entry.derived.add(implied);
    }

    function targetsForCategory(id, type) {
      const result = [];
      for (const entry of memberships.values()) {
        if (type && entry.type !== type) continue;
        const base = { type: entry.type, path: entry.path, noteId: entry.noteId, label: entry.label, validation: entry.validation, validationMessage: entry.validationMessage };
        if (entry.explicit.has(id)) result.push({ ...base, membership: 'explicit' });
        else if (entry.derived.has(id)) result.push({ ...base, membership: 'derived' });
      }
      return result.sort((a, b) => a.path.localeCompare(b.path));
    }
    function filesForCategory(id) { return targetsForCategory(id, 'file'); }
    function notesForCategory(id) { return targetsForCategory(id, 'note'); }
    function explicitCategoryIdsForTarget(type, path) {
      const entry = memberships.get(targetKey(type, normalizePath(path)));
      return entry ? [...entry.explicit].sort() : [];
    }

    return { categories, byPath, memberships, errors, cycles, filesForCategory, notesForCategory, targetsForCategory, explicitCategoryIdsForTarget, resolveRelative, targetKey };
  }

  return { buildRepositoryCategoryIndex };
});

/* src/note-relation-index.js */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  function clean(value) { return String(value == null ? '' : value).trim(); }
  function repositoryKey(target = {}) {
    const owner = clean(target.owner).toLowerCase();
    const repo = clean(target.repo).replace(/\.git$/i, '').toLowerCase();
    const branch = clean(target.branch) || 'main';
    const path = clean(target.path).replace(/\\/g, '/');
    return owner && repo && path ? `${owner}/${repo}@${branch}:${path}` : '';
  }
  function noteContext(note = {}) {
    const remote = note.remote && typeof note.remote === 'object' ? note.remote : {};
    return { owner: clean(remote.owner), repo: clean(remote.repo), branch: clean(remote.branch) || 'main' };
  }
  function pushMap(map, key, value) {
    if (!key) return;
    const items = map.get(key) || [];
    items.push(value);
    map.set(key, items);
  }

  function buildNoteRelationIndex(notes = []) {
    const byId = new Map();
    const outgoing = new Map();
    const incomingNotes = new Map();
    const incomingFiles = new Map();
    const errors = [];
    for (const note of Array.isArray(notes) ? notes : []) if (note && note.id) byId.set(String(note.id), note);
    for (const note of byId.values()) {
      const relations = [];
      const context = noteContext(note);
      for (const link of Array.isArray(note.links) ? note.links : []) {
        const base = { sourceNoteId: String(note.id), linkId: clean(link && link.id), label: clean(link && link.label), type: clean(link && link.type) };
        if (base.type === 'note') {
          const targetNoteId = clean(link && link.target && link.target.noteId);
          if (!targetNoteId) { errors.push({ kind: 'invalid_note_relation', sourceNoteId: note.id, linkId: base.linkId, message: 'Managed Note relation has no target Note id.' }); continue; }
          const relation = { ...base, targetNoteId, resolved: byId.has(targetNoteId) };
          relations.push(relation);
          pushMap(incomingNotes, targetNoteId, relation);
        } else if (base.type === 'repository') {
          const target = { ...context, ...(link && link.target || {}) };
          const key = repositoryKey(target);
          if (!key) { errors.push({ kind: 'invalid_file_relation', sourceNoteId: note.id, linkId: base.linkId, message: 'Managed repository relation has incomplete target identity.' }); continue; }
          const relation = { ...base, target, key, resolved: clean(link.resolution) === 'resolved' };
          relations.push(relation);
          pushMap(incomingFiles, key, relation);
        } else if (base.type === 'url') {
          relations.push({ ...base, target: { ...(link && link.target || {}) }, resolved: true });
        }
      }
      outgoing.set(String(note.id), relations);
    }
    return {
      byId,
      outgoing,
      incomingNotes,
      incomingFiles,
      errors,
      outgoingForNote(id) { return [...(outgoing.get(String(id)) || [])]; },
      incomingForNote(id) { return [...(incomingNotes.get(String(id)) || [])]; },
      incomingForFile(target) { return [...(incomingFiles.get(repositoryKey(target)) || [])]; },
      repositoryKey
    };
  }

  return { buildNoteRelationIndex, repositoryRelationKey: repositoryKey };
});

/* src/category-cache-store.js */
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

/* src/pending-note-asset-store.js */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  class PendingNoteAssetStore {
    constructor(options = {}) {
      this.dbName = options.dbName || 'obsLinkedNotesPrototypeAssets';
      this.storeName = options.storeName || 'assets';
      this.version = 1;
      this.indexedDB = Object.prototype.hasOwnProperty.call(options, 'indexedDB')
        ? options.indexedDB
        : (typeof indexedDB !== 'undefined' ? indexedDB : null);
      this.memory = options.memory || new Map();
      this._dbPromise = null;
    }

    open() {
      if (!this.indexedDB) return Promise.resolve(null);
      if (this._dbPromise) return this._dbPromise;
      this._dbPromise = new Promise((resolve, reject) => {
        const request = this.indexedDB.open(this.dbName, this.version);
        request.onerror = () => reject(request.error || new Error('Unable to open pending image storage.'));
        request.onupgradeneeded = () => {
          const db = request.result;
          const store = db.objectStoreNames.contains(this.storeName)
            ? request.transaction.objectStore(this.storeName)
            : db.createObjectStore(this.storeName, { keyPath: 'id' });
          if (!store.indexNames.contains('noteId')) store.createIndex('noteId', 'noteId', { unique: false });
          if (!store.indexNames.contains('updatedAt')) store.createIndex('updatedAt', 'updatedAt', { unique: false });
        };
        request.onsuccess = () => {
          const db = request.result;
          db.onversionchange = () => db.close();
          resolve(db);
        };
      });
      return this._dbPromise;
    }

    async put(asset) {
      const record = { ...asset, bytes: asset.bytes instanceof Uint8Array ? new Uint8Array(asset.bytes) : asset.bytes, updatedAt: new Date().toISOString() };
      const db = await this.open();
      if (!db) { this.memory.set(record.id, record); return record; }
      await new Promise((resolve, reject) => {
        const tx = db.transaction(this.storeName, 'readwrite');
        tx.objectStore(this.storeName).put(record);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error || new Error('Unable to store pending image.'));
        tx.onabort = () => reject(tx.error || new Error('Pending image transaction aborted.'));
      });
      return record;
    }

    async get(id) {
      const db = await this.open();
      if (!db) return this.memory.get(String(id)) || null;
      return new Promise((resolve, reject) => {
        const tx = db.transaction(this.storeName, 'readonly');
        const request = tx.objectStore(this.storeName).get(String(id));
        request.onsuccess = () => resolve(request.result || null);
        request.onerror = () => reject(request.error || new Error('Unable to read pending image.'));
      });
    }

    async listByNote(noteId) {
      const wanted = String(noteId || '');
      const db = await this.open();
      if (!db) return [...this.memory.values()].filter((asset) => asset.noteId === wanted).sort((a, b) => String(a.createdAt).localeCompare(String(b.createdAt)));
      return new Promise((resolve, reject) => {
        const tx = db.transaction(this.storeName, 'readonly');
        const index = tx.objectStore(this.storeName).index('noteId');
        const request = index.getAll(wanted);
        request.onsuccess = () => resolve((request.result || []).sort((a, b) => String(a.createdAt).localeCompare(String(b.createdAt))));
        request.onerror = () => reject(request.error || new Error('Unable to list pending images.'));
      });
    }

    async delete(id) {
      const key = String(id || '');
      const db = await this.open();
      if (!db) { this.memory.delete(key); return; }
      await new Promise((resolve, reject) => {
        const tx = db.transaction(this.storeName, 'readwrite');
        tx.objectStore(this.storeName).delete(key);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error || new Error('Unable to delete pending image.'));
      });
    }

    async deleteForNote(noteId) {
      const assets = await this.listByNote(noteId);
      for (const asset of assets) await this.delete(asset.id);
    }

    async clear() {
      const db = await this.open();
      if (!db) { this.memory.clear(); return; }
      await new Promise((resolve, reject) => {
        const tx = db.transaction(this.storeName, 'readwrite');
        tx.objectStore(this.storeName).clear();
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error || new Error('Unable to clear pending images.'));
      });
    }
  }

  return { PendingNoteAssetStore };
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

  function bytesToBase64(value) {
    const bytes = value instanceof Uint8Array ? value : new Uint8Array(value || []);
    let binary = '';
    const chunk = 0x8000;
    for (let index = 0; index < bytes.length; index += chunk) {
      binary += String.fromCharCode(...bytes.subarray(index, index + chunk));
    }
    if (typeof btoa === 'function') return btoa(binary);
    if (typeof Buffer !== 'undefined') return Buffer.from(bytes).toString('base64');
    throw new Error('No base64 encoder is available.');
  }

  function base64ToBytes(value) {
    const compact = String(value || '').replace(/\s+/g, '');
    if (typeof atob === 'function') {
      const binary = atob(compact);
      return Uint8Array.from(binary, (char) => char.charCodeAt(0));
    }
    if (typeof Buffer !== 'undefined') return Uint8Array.from(Buffer.from(compact, 'base64'));
    throw new Error('No base64 decoder is available.');
  }

  function decodeUtf8Bytes(value, options = {}) {
    const bytes = value instanceof Uint8Array ? value : new Uint8Array(value || []);
    try {
      return new TextDecoder('utf-8', { fatal: Boolean(options.fatal) }).decode(bytes);
    } catch (error) {
      throw new GitHubClientError('invalid_utf8', options.message || 'Repository text is not valid UTF-8 and cannot be modified safely.', { cause: error });
    }
  }

  function base64ToUtf8(value, options = {}) {
    return decodeUtf8Bytes(base64ToBytes(value), options);
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

  async function sha256Bytes(value) {
    const bytes = value instanceof Uint8Array ? value : new Uint8Array(value || []);
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

  function bytesEqual(left, right) {
    const a = left instanceof Uint8Array ? left : new Uint8Array(left || []);
    const b = right instanceof Uint8Array ? right : new Uint8Array(right || []);
    if (a.byteLength !== b.byteLength) return false;
    for (let index = 0; index < a.byteLength; index += 1) if (a[index] !== b[index]) return false;
    return true;
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
          responseType: request.responseType || 'text',
          onload(response) {
            resolve({ status: response.status, text: response.responseText || '', response: response.response, headers: response.responseHeaders || '' });
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

    _rootUrl() {
      return `${this.apiBase}/repos/${encodeURIComponent(this.owner)}/${encodeURIComponent(this.repo)}/contents?ref=${encodeURIComponent(this.branch)}`;
    }

    _repoApiUrl(path) {
      return `${this.apiBase}/repos/${encodeURIComponent(this.owner)}/${encodeURIComponent(this.repo)}/${String(path || '').replace(/^\/+/, '')}`;
    }

    _branchRefUrl() {
      const encoded = this.branch.split('/').map(encodeURIComponent).join('/');
      return this._repoApiUrl(`git/ref/heads/${encoded}`);
    }

    _branchRefsUrl() {
      const encoded = this.branch.split('/').map(encodeURIComponent).join('/');
      return this._repoApiUrl(`git/refs/heads/${encoded}`);
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

    async _requestRaw(url) {
      let response;
      try {
        response = await this.transport({
          method: 'GET',
          url,
          headers: { ...this._headers(), Accept: 'application/vnd.github.raw+json' },
          timeoutMs: 20000,
          responseType: 'arraybuffer'
        });
      } catch (error) {
        if (error instanceof GitHubClientError) throw error;
        throw new GitHubClientError('network_unknown', error && error.message ? error.message : 'GitHub binary request failed.', { cause: error });
      }
      if (response.status < 200 || response.status >= 300) {
        let payload = null;
        try { payload = parseJson(response.text || ''); } catch (error) { /* preserve status */ }
        const message = payload && payload.message ? payload.message : `GitHub request failed with status ${response.status}.`;
        throw new GitHubClientError(statusKind(response.status), message, { status: response.status, payload });
      }
      if (response.response instanceof ArrayBuffer) return new Uint8Array(response.response);
      if (ArrayBuffer.isView(response.response)) return new Uint8Array(response.response.buffer, response.response.byteOffset, response.response.byteLength);
      return new TextEncoder().encode(String(response.text || ''));
    }

    _fileResult(payload, normalized, options = {}) {
      if (!payload || payload.type !== 'file') {
        throw new GitHubClientError('invalid_response', 'GitHub Contents response is not a file.');
      }
      const hasInlineContent = typeof payload.content === 'string';
      if (!hasInlineContent && !options.allowMissingContent) {
        throw new GitHubClientError('content_unavailable', 'GitHub returned file metadata without inline content.', {
          path: normalizeGitHubContentPath(payload.path || normalized),
          size: Number.isFinite(Number(payload.size)) ? Math.max(0, Number(payload.size)) : 0,
          htmlUrl: payload.html_url || ''
        });
      }
      return {
        type: 'file',
        path: normalizeGitHubContentPath(payload.path || normalized),
        name: String(payload.name || normalized.slice(normalized.lastIndexOf('/') + 1)),
        sha: payload.sha || '',
        size: Number.isFinite(Number(payload.size)) ? Math.max(0, Number(payload.size)) : 0,
        content: hasInlineContent ? base64ToUtf8(payload.content) : null,
        contentAvailable: hasInlineContent,
        htmlUrl: payload.html_url || '',
        downloadUrl: payload.download_url || ''
      };
    }


    _metadataResult(payload, normalized) {
      if (!payload || payload.type !== 'file') {
        throw new GitHubClientError('invalid_response', 'GitHub Contents response is not a file.');
      }
      return {
        type: 'file',
        path: normalizeGitHubContentPath(payload.path || normalized),
        name: String(payload.name || normalized.slice(normalized.lastIndexOf('/') + 1)),
        sha: String(payload.sha || ''),
        size: Number.isFinite(Number(payload.size)) ? Math.max(0, Number(payload.size)) : 0,
        contentAvailable: typeof payload.content === 'string',
        htmlUrl: String(payload.html_url || ''),
        downloadUrl: String(payload.download_url || '')
      };
    }

    _htmlUrl(path) {
      const normalized = normalizeGitHubContentPath(path);
      const encodedPath = normalized.split('/').map(encodeURIComponent).join('/');
      return `https://github.com/${encodeURIComponent(this.owner)}/${encodeURIComponent(this.repo)}/blob/${encodeURIComponent(this.branch)}/${encodedPath}`;
    }

    async read(path, options = {}) {
      const normalized = normalizeGitHubContentPath(path);
      const payload = await this._request('GET', this._url(normalized, true));
      return this._fileResult(payload, normalized, options);
    }

    async readMetadata(path) {
      const normalized = normalizeGitHubContentPath(path);
      const payload = await this._request('GET', this._url(normalized, true));
      return this._metadataResult(payload, normalized);
    }

    async readBytes(path, options = {}) {
      const normalized = normalizeGitHubContentPath(path);
      const metadata = await this.readMetadata(normalized);
      const maxBytes = Number(options.maxBytes) > 0 ? Number(options.maxBytes) : 5 * 1024 * 1024;
      if (metadata.size > maxBytes) {
        throw new GitHubClientError('limit_exceeded', `GitHub file is ${metadata.size} bytes; media limit is ${maxBytes}.`, { path: normalized, size: metadata.size, maxBytes });
      }
      const bytes = await this._requestRaw(this._url(normalized, true));
      if (bytes.byteLength > maxBytes) {
        throw new GitHubClientError('limit_exceeded', `GitHub file response is ${bytes.byteLength} bytes; media limit is ${maxBytes}.`, { path: normalized, size: bytes.byteLength, maxBytes });
      }
      return { ...metadata, bytes, contentType: '' };
    }

    async listDirectory(path, options = {}) {
      const rawPath = String(path == null ? '' : path).replace(/\\/g, '/').trim().replace(/^\/+|\/+$/g, '');
      const normalized = rawPath ? normalizeGitHubContentPath(rawPath) : '';
      const maxEntries = Number.isInteger(options.maxEntries) && options.maxEntries > 0 ? options.maxEntries : 100;
      let payload;
      try {
        payload = await this._request('GET', normalized ? this._url(normalized, true) : this._rootUrl());
      } catch (error) {
        if (error instanceof GitHubClientError && error.kind === 'not_found' && options.missingAsEmpty) {
          // A missing folder and an inaccessible repository/branch can both return 404.
          // Verify the repository root at the selected branch before treating the folder as empty.
          const rootPayload = await this._request('GET', this._rootUrl());
          if (!Array.isArray(rootPayload)) {
            throw new GitHubClientError('invalid_response', 'GitHub repository root response is not a directory listing.');
          }
          return [];
        }
        throw error;
      }
      if (!Array.isArray(payload)) {
        throw new GitHubClientError('invalid_response', 'GitHub Contents response is not a directory listing.');
      }
      if (payload.length > maxEntries) {
        throw new GitHubClientError('limit_exceeded', `GitHub directory contains ${payload.length} entries; the explicit listing limit is ${maxEntries}.`, {
          entryCount: payload.length,
          maxEntries
        });
      }
      return payload.map((entry) => {
        if (!entry || typeof entry !== 'object' || typeof entry.path !== 'string' || !entry.type) {
          throw new GitHubClientError('invalid_response', 'GitHub directory listing contains an invalid entry.');
        }
        const entryPath = normalizeGitHubContentPath(entry.path);
        if (normalized && !entryPath.startsWith(`${normalized}/`)) {
          throw new GitHubClientError('invalid_response', 'GitHub directory entry escaped the requested folder.');
        }
        if (!normalized && entryPath.includes('/')) {
          throw new GitHubClientError('invalid_response', 'GitHub repository-root listing contains a non-direct entry.');
        }
        return {
          type: String(entry.type),
          path: entryPath,
          name: String(entry.name || entryPath.slice(entryPath.lastIndexOf('/') + 1)),
          sha: String(entry.sha || ''),
          size: Number.isFinite(Number(entry.size)) ? Math.max(0, Number(entry.size)) : 0,
          htmlUrl: String(entry.html_url || '')
        };
      });
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

    async writeBytes({ path, bytes, baseSha = '', message }) {
      const normalized = normalizeGitHubContentPath(path);
      const value = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes || []);
      const body = {
        message: String(message || `Update repository asset ${normalized}`),
        content: bytesToBase64(value),
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

    async saveBytesVerified({ path, bytes, baseSha = '', message }) {
      const normalized = normalizeGitHubContentPath(path);
      const expected = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes || []);
      let writeResult;
      try {
        writeResult = await this.writeBytes({ path: normalized, bytes: expected, baseSha, message });
      } catch (error) {
        if (!(error instanceof GitHubClientError) || error.kind !== 'network_unknown') throw error;
        try {
          const afterUnknown = await this.readBytes(normalized, { maxBytes: Math.max(expected.byteLength, 1) });
          if (bytesEqual(afterUnknown.bytes, expected)) {
            return { ...afterUnknown, verifiedHash: await sha256Bytes(expected), recoveredAfterUnknownWrite: true };
          }
        } catch (readError) { /* preserve unknown-write boundary */ }
        throw error;
      }
      let readBack;
      try {
        readBack = await this.readBytes(normalized, { maxBytes: Math.max(expected.byteLength, 1) });
      } catch (error) {
        throw new GitHubClientError('verification_unknown', 'GitHub accepted the asset write, but byte read-back verification failed.', { writeResult, cause: error, status: error && error.status ? error.status : 0 });
      }
      if (!bytesEqual(readBack.bytes, expected)) {
        throw new GitHubClientError('verification_mismatch', 'Remote asset bytes do not match the intended image.', { expectedHash: await sha256Bytes(expected), actualHash: await sha256Bytes(readBack.bytes) });
      }
      return {
        path: readBack.path || writeResult.path,
        sha: readBack.sha || writeResult.sha,
        htmlUrl: readBack.htmlUrl || writeResult.htmlUrl,
        size: readBack.size,
        verifiedHash: await sha256Bytes(expected),
        recoveredAfterUnknownWrite: false
      };
    }

    async readBranchHead() {
      const payload = await this._request('GET', this._branchRefUrl());
      const sha = String(payload && payload.object && payload.object.sha || '');
      if (!sha) throw new GitHubClientError('invalid_response', 'GitHub branch ref response has no commit SHA.');
      return { ref: String(payload.ref || `refs/heads/${this.branch}`), sha };
    }

    async readGitCommit(sha) {
      const commitSha = String(sha || '').trim();
      if (!commitSha) throw new TypeError('Git commit SHA is required.');
      const payload = await this._request('GET', this._repoApiUrl(`git/commits/${encodeURIComponent(commitSha)}`));
      const treeSha = String(payload && payload.tree && payload.tree.sha || '');
      if (!treeSha) throw new GitHubClientError('invalid_response', 'GitHub commit response has no tree SHA.');
      return { sha: String(payload.sha || commitSha), treeSha, parents: Array.isArray(payload.parents) ? payload.parents.map((item) => String(item && item.sha || '')).filter(Boolean) : [] };
    }

    async readGitTree(sha, options = {}) {
      const treeSha = String(sha || '').trim();
      if (!treeSha) throw new TypeError('Git tree SHA is required.');
      const suffix = options.recursive ? '?recursive=1' : '';
      const payload = await this._request('GET', `${this._repoApiUrl(`git/trees/${encodeURIComponent(treeSha)}`)}${suffix}`);
      if (payload && payload.truncated) throw new GitHubClientError('limit_exceeded', 'GitHub truncated the recursive tree; atomic bulk update is blocked.');
      const tree = Array.isArray(payload && payload.tree) ? payload.tree.map((item) => ({
        path: normalizeGitHubContentPath(item.path),
        mode: String(item.mode || ''),
        type: String(item.type || ''),
        sha: String(item.sha || '')
      })) : [];
      return { sha: String(payload && payload.sha || treeSha), tree };
    }

    async createGitBlob(contentBase64) {
      const content = String(contentBase64 == null ? '' : contentBase64).replace(/\s+/g, '');
      const payload = await this._request('POST', this._repoApiUrl('git/blobs'), { content, encoding: 'base64' });
      const sha = String(payload && payload.sha || '');
      if (!sha) throw new GitHubClientError('invalid_response', 'GitHub create-blob response has no SHA.');
      return { sha };
    }

    async createGitTree(baseTreeSha, entries) {
      const payload = await this._request('POST', this._repoApiUrl('git/trees'), {
        base_tree: String(baseTreeSha || ''),
        tree: (Array.isArray(entries) ? entries : []).map((entry) => ({
          path: normalizeGitHubContentPath(entry.path),
          mode: String(entry.mode || '100644'),
          type: 'blob',
          sha: String(entry.sha || '')
        }))
      });
      const sha = String(payload && payload.sha || '');
      if (!sha) throw new GitHubClientError('invalid_response', 'GitHub create-tree response has no SHA.');
      return { sha };
    }

    async createGitCommit(message, treeSha, parentSha) {
      const payload = await this._request('POST', this._repoApiUrl('git/commits'), {
        message: String(message || 'Update local repository changes'),
        tree: String(treeSha || ''),
        parents: [String(parentSha || '')]
      });
      const sha = String(payload && payload.sha || '');
      if (!sha) throw new GitHubClientError('invalid_response', 'GitHub create-commit response has no SHA.');
      return { sha };
    }

    async updateBranchRef(commitSha) {
      const expected = String(commitSha || '').trim();
      if (!expected) throw new TypeError('Git commit SHA is required.');
      try {
        const payload = await this._request('PATCH', this._branchRefsUrl(), { sha: expected, force: false });
        return { sha: String(payload && payload.object && payload.object.sha || expected), recoveredAfterUnknownWrite: false };
      } catch (error) {
        if (!(error instanceof GitHubClientError) || error.kind !== 'network_unknown') throw error;
        try {
          const head = await this.readBranchHead();
          if (head.sha === expected) return { sha: expected, recoveredAfterUnknownWrite: true };
        } catch (readError) { /* preserve the unknown ref-update boundary */ }
        throw error;
      }
    }

    async saveChangesCommitVerified({ changes, message }) {
      const input = Array.isArray(changes) ? changes : [];
      if (!input.length) throw new TypeError('At least one local repository change is required.');
      const seen = new Set();
      const normalized = input.map((change) => {
        const path = normalizeGitHubContentPath(change && change.path);
        if (seen.has(path)) throw new TypeError(`Duplicate local repository change path: ${path}.`);
        seen.add(path);
        const payloadKind = change && change.payloadKind === 'binary' ? 'binary' : 'text';
        return {
          path,
          baseSha: String(change && change.baseSha || ''),
          payloadKind,
          contentBase64: payloadKind === 'binary' ? String(change && change.bytesBase64 || '').replace(/\s+/g, '') : utf8ToBase64(change && change.content == null ? '' : change.content)
        };
      });

      const initialHead = await this.readBranchHead();
      const initialCommit = await this.readGitCommit(initialHead.sha);
      const initialTree = await this.readGitTree(initialCommit.treeSha, { recursive: true });
      const blobsByPath = new Map(initialTree.tree.filter((item) => item.type === 'blob').map((item) => [item.path, item]));
      for (const change of normalized) {
        const current = blobsByPath.get(change.path);
        if (change.baseSha && (!current || current.sha !== change.baseSha)) {
          throw new GitHubClientError('conflict', `Remote base changed for ${change.path}.`, { path: change.path, expectedSha: change.baseSha, actualSha: current && current.sha || '' });
        }
        if (!change.baseSha && current) throw new GitHubClientError('conflict', `Expected new path already exists: ${change.path}.`, { path: change.path, actualSha: current.sha });
      }

      const treeEntries = [];
      for (const change of normalized) {
        const blob = await this.createGitBlob(change.contentBase64);
        const current = blobsByPath.get(change.path);
        treeEntries.push({ path: change.path, mode: current && current.mode || '100644', sha: blob.sha });
      }
      const confirmedHead = await this.readBranchHead();
      if (confirmedHead.sha !== initialHead.sha) throw new GitHubClientError('conflict', 'Branch head changed during atomic bulk-update preparation. No branch ref was updated.', { expectedSha: initialHead.sha, actualSha: confirmedHead.sha });
      const tree = await this.createGitTree(initialCommit.treeSha, treeEntries);
      const commit = await this.createGitCommit(message || `Update ${normalized.length} local repository file(s)`, tree.sha, initialHead.sha);
      const ref = await this.updateBranchRef(commit.sha);

      const finalHead = await this.readBranchHead();
      if (finalHead.sha !== commit.sha) throw new GitHubClientError('verification_mismatch', 'Branch head does not match the atomic update commit.', { expectedSha: commit.sha, actualSha: finalHead.sha });
      const finalCommit = await this.readGitCommit(finalHead.sha);
      if (!finalCommit.parents.includes(initialHead.sha)) throw new GitHubClientError('verification_mismatch', 'Atomic update commit does not have the verified branch head as its parent.');
      const finalTree = await this.readGitTree(finalCommit.treeSha, { recursive: true });
      const finalByPath = new Map(finalTree.tree.filter((item) => item.type === 'blob').map((item) => [item.path, item.sha]));
      for (const entry of treeEntries) if (finalByPath.get(entry.path) !== entry.sha) throw new GitHubClientError('verification_mismatch', `Atomic update verification failed for ${entry.path}.`);
      return {
        kind: 'github-git-data-bulk-update-v1',
        parentSha: initialHead.sha,
        commitSha: commit.sha,
        treeSha: finalCommit.treeSha,
        paths: treeEntries.map((entry) => entry.path),
        recoveredAfterUnknownWrite: Boolean(ref.recoveredAfterUnknownWrite)
      };
    }
  }

  return {
    GitHubClientError,
    GitHubContentsClient,
    createGmTransport,
    normalizeGitHubContentPath,
    utf8ToBase64,
    bytesToBase64,
    base64ToUtf8,
    decodeUtf8Bytes,
    base64ToBytes,
    sha256Hex,
    sha256Bytes,
    bytesEqual,
    statusKind
  };
});

/* src/repository-change-publisher.js */
(function (root, factory) {
  const api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function (root) {
  'use strict';

  function dependencies() {
    const api = root.ObsLinkedNotes || {};
    for (const name of ['normalizeRepositoryLocalChangeState', 'repositoryLocalChangeMap', 'removeRepositoryLocalChange', 'base64ToBytes']) {
      if (typeof api[name] !== 'function') throw new Error(`Repository change publisher dependency is unavailable: ${name}.`);
    }
    return api;
  }

  async function publishCurrentRepositoryChange(options = {}) {
    const api = dependencies();
    const client = options.client;
    const state = api.normalizeRepositoryLocalChangeState(options.state);
    const path = api.normalizeRepositoryLocalPath(options.path);
    const change = api.repositoryLocalChangeMap(state).get(path);
    if (!change) throw new Error(`The open file has no pending local change: ${path}.`);
    let result;
    if (change.payloadKind === 'binary') {
      if (!client || typeof client.saveBytesVerified !== 'function') throw new Error('Current-file binary publisher is unavailable.');
      result = await client.saveBytesVerified({ path, bytes: api.base64ToBytes(change.bytesBase64), baseSha: change.baseSha, message: change.message || `${change.baseSha ? 'Update' : 'Create'} ${path} from local state` });
    } else {
      if (!client || typeof client.saveVerified !== 'function') throw new Error('Current-file text publisher is unavailable.');
      result = await client.saveVerified({ path, content: change.content, baseSha: change.baseSha, message: change.message || `${change.baseSha ? 'Update' : 'Create'} ${path} from local state` });
    }
    return { kind: 'repository-current-publish-v1', path, result, state: api.removeRepositoryLocalChange(state, path) };
  }

  async function publishAllRepositoryChanges(options = {}) {
    const api = dependencies();
    const client = options.client;
    const state = api.normalizeRepositoryLocalChangeState(options.state);
    if (!state.files.length) throw new Error('There are no pending local repository changes.');
    if (!client || typeof client.saveChangesCommitVerified !== 'function') throw new Error('Atomic Git Data publisher is unavailable; sequential Contents writes are not used as a fallback.');
    const result = await client.saveChangesCommitVerified({
      changes: state.files,
      message: options.message || `Update ${state.files.length} local repository file(s)`
    });
    return { kind: 'repository-all-publish-v1', result, state: api.normalizeRepositoryLocalChangeState(null) };
  }

  return { publishCurrentRepositoryChange, publishAllRepositoryChanges };
});

/* src/repository-asset-write.js */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  function bytesEqual(left, right) {
    const a = left instanceof Uint8Array ? left : new Uint8Array(left || []);
    const b = right instanceof Uint8Array ? right : new Uint8Array(right || []);
    if (a.byteLength !== b.byteLength) return false;
    for (let index = 0; index < a.byteLength; index += 1) if (a[index] !== b[index]) return false;
    return true;
  }

  function suffixedPath(path, index) {
    const value = String(path || '');
    const slash = value.lastIndexOf('/');
    const folder = slash === -1 ? '' : value.slice(0, slash + 1);
    const name = slash === -1 ? value : value.slice(slash + 1);
    const dot = name.lastIndexOf('.');
    const stem = dot > 0 ? name.slice(0, dot) : name;
    const ext = dot > 0 ? name.slice(dot) : '';
    return `${folder}${stem}-${index}${ext}`;
  }

  async function readExisting(client, path, bytes, options = {}) {
    try {
      return await client.readBytes(path, { maxBytes: Math.max(bytes.byteLength, options.maxBytes || 0) || undefined });
    } catch (error) {
      if (error && error.kind === 'not_found') return null;
      throw error;
    }
  }

  async function planRepositoryAssets(options = {}) {
    const client = options.client;
    if (!client || typeof client.readBytes !== 'function') throw new TypeError('A GitHub client with binary read support is required.');
    const inputs = Array.isArray(options.assets) ? options.assets : [];
    const maxAttempts = Number.isInteger(options.maxAttempts) && options.maxAttempts > 0 ? options.maxAttempts : 100;
    const reservations = new Map();
    const plans = [];

    for (let inputIndex = 0; inputIndex < inputs.length; inputIndex += 1) {
      const input = inputs[inputIndex] || {};
      const bytes = input.bytes instanceof Uint8Array ? input.bytes : new Uint8Array(input.bytes || []);
      const originalPath = String(input.path || '');
      if (!originalPath) throw new Error('Repository image path is required.');
      let selected = null;

      for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
        const path = attempt === 0 ? originalPath : suffixedPath(originalPath, attempt + 1);
        const reserved = reservations.get(path);
        if (reserved) {
          if (bytesEqual(reserved.bytes, bytes)) {
            selected = {
              key: input.key == null ? String(inputIndex) : String(input.key),
              path,
              sha: reserved.sha || '',
              verifiedHash: reserved.verifiedHash || '',
              htmlUrl: reserved.htmlUrl || '',
              status: 'reused',
              collision: attempt > 0,
              requiresWrite: false,
              reserved: true,
              reservedBy: reserved.key
            };
            break;
          }
          continue;
        }

        const existing = await readExisting(client, path, bytes, options);
        if (existing && bytesEqual(existing.bytes, bytes)) {
          selected = {
            key: input.key == null ? String(inputIndex) : String(input.key),
            path,
            sha: existing.sha || '',
            verifiedHash: existing.verifiedHash || '',
            htmlUrl: existing.htmlUrl || '',
            status: 'reused',
            collision: attempt > 0,
            requiresWrite: false,
            reserved: false,
            reservedBy: ''
          };
          reservations.set(path, { key: selected.key, bytes, sha: selected.sha, verifiedHash: selected.verifiedHash, htmlUrl: selected.htmlUrl });
          break;
        }
        if (existing) continue;

        selected = {
          key: input.key == null ? String(inputIndex) : String(input.key),
          path,
          sha: '',
          verifiedHash: '',
          htmlUrl: '',
          status: 'create',
          collision: attempt > 0,
          requiresWrite: true,
          reserved: false,
          reservedBy: ''
        };
        reservations.set(path, { key: selected.key, bytes, sha: '', verifiedHash: '', htmlUrl: '' });
        break;
      }

      if (!selected) throw new Error(`Unable to choose a free repository image path after ${maxAttempts} attempts.`);
      plans.push(selected);
    }

    return plans;
  }

  async function planRepositoryAsset(options = {}) {
    const plans = await planRepositoryAssets({
      ...options,
      assets: [{ key: 'asset', path: options.path, bytes: options.bytes }]
    });
    const plan = plans[0];
    if (!plan) throw new Error('Repository image plan is unavailable.');
    const { key, reserved, reservedBy, ...single } = plan;
    return single;
  }

  function stalePlanError(expected, actual) {
    const error = new Error(`Repository image plan changed before execution: expected ${expected.status} at ${expected.path}, now ${actual.status} at ${actual.path}. Prepare the transfer again.`);
    error.kind = 'plan_stale';
    error.details = { expected, actual };
    return error;
  }

  async function ensureRepositoryAsset(options = {}) {
    const client = options.client;
    if (!client || typeof client.readBytes !== 'function' || typeof client.saveBytesVerified !== 'function') throw new TypeError('A GitHub client with binary read/write support is required.');
    const bytes = options.bytes instanceof Uint8Array ? options.bytes : new Uint8Array(options.bytes || []);
    const planned = await planRepositoryAsset(options);
    const expected = options.expectedPlan;
    if (expected && (String(expected.path || '') !== planned.path || String(expected.status || '') !== planned.status)) throw stalePlanError(expected, planned);
    if (!planned.requiresWrite) return planned;
    const result = await client.saveBytesVerified({ path: planned.path, bytes, baseSha: '', message: options.message || `Add repository image ${planned.path}` });
    return { ...result, path: planned.path, status: 'created', collision: planned.collision, requiresWrite: false };
  }

  return { bytesEqual, suffixedPath, planRepositoryAsset, planRepositoryAssets, ensureRepositoryAsset };
});

/* src/remote-note-reconcile.js */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const REMOTE_RECONCILE_ACTIONS = Object.freeze({
    REMOTE_IMPORT: 'remote_import',
    UNCHANGED: 'unchanged',
    FAST_FORWARD: 'fast_forward',
    LOCAL_AHEAD: 'local_ahead',
    CONFLICT: 'conflict',
    ATTACH_EXISTING: 'attach_existing',
    DUPLICATE_IDENTITY: 'duplicate_identity',
    REMOTE_DELETED: 'remote_deleted',
    UNSUPPORTED_MARKDOWN: 'unsupported_markdown'
  });

  function normalizedTarget(value) {
    const source = value && typeof value === 'object' ? value : {};
    return {
      owner: String(source.owner || '').trim(),
      repo: String(source.repo || '').trim(),
      branch: String(source.branch || '').trim(),
      path: String(source.path || '').replace(/\\/g, '/').trim()
    };
  }

  function sameTarget(left, right) {
    const a = normalizedTarget(left);
    const b = normalizedTarget(right);
    return Boolean(a.owner && a.repo && a.branch && a.path)
      && a.owner === b.owner
      && a.repo === b.repo
      && a.branch === b.branch
      && a.path === b.path;
  }

  function classifyRemoteNote({ local = null, remote, localContentHash = '' } = {}) {
    if (!remote || !remote.note || !remote.note.id || !remote.target || !remote.hash) {
      throw new TypeError('Remote Note snapshot with note, target and hash is required.');
    }
    if (!local) return { action: REMOTE_RECONCILE_ACTIONS.REMOTE_IMPORT, reason: 'No local Note has this stable Note id.' };
    if (String(local.id || '') !== String(remote.note.id || '')) {
      return { action: REMOTE_RECONCILE_ACTIONS.DUPLICATE_IDENTITY, reason: 'Local and remote Note ids do not match.' };
    }

    const bound = local.remote && typeof local.remote === 'object' ? local.remote : {};
    const hasBoundTarget = Boolean(bound.owner && bound.repo && bound.branch && bound.path);
    const priorHash = String(bound.verifiedHash || '').trim();
    const currentLocalHash = String(localContentHash || '').trim();

    if (hasBoundTarget && !sameTarget(bound, remote.target)) {
      return { action: REMOTE_RECONCILE_ACTIONS.DUPLICATE_IDENTITY, reason: 'The same Note id is already bound to another repository target.' };
    }

    if (!hasBoundTarget) {
      if (currentLocalHash && currentLocalHash === remote.hash) {
        return { action: REMOTE_RECONCILE_ACTIONS.ATTACH_EXISTING, reason: 'Unbound local content exactly matches the discovered remote Note.' };
      }
      return { action: REMOTE_RECONCILE_ACTIONS.DUPLICATE_IDENTITY, reason: 'An unbound local Note uses the same stable id but has different content.' };
    }

    if (!priorHash) {
      return { action: REMOTE_RECONCILE_ACTIONS.CONFLICT, reason: 'The local Note has a remote target but no verified base hash.' };
    }

    const localChanged = currentLocalHash !== priorHash;
    const remoteChanged = remote.hash !== priorHash;
    if (!localChanged && !remoteChanged) return { action: REMOTE_RECONCILE_ACTIONS.UNCHANGED, reason: 'Local and remote content still match the verified base.' };
    if (!localChanged && remoteChanged) return { action: REMOTE_RECONCILE_ACTIONS.FAST_FORWARD, reason: 'Only the remote Note changed after the verified base.' };
    if (localChanged && !remoteChanged) return { action: REMOTE_RECONCILE_ACTIONS.LOCAL_AHEAD, reason: 'Only the local Note changed after the verified base.' };
    if (currentLocalHash === remote.hash) return { action: REMOTE_RECONCILE_ACTIONS.ATTACH_EXISTING, reason: 'Both sides now contain the same content.' };
    return { action: REMOTE_RECONCILE_ACTIONS.CONFLICT, reason: 'Local and remote content both changed differently after the verified base.' };
  }

  function isDirectChildPath(basePath, path) {
    const base = String(basePath || '').replace(/\\/g, '/').replace(/^\/+|\/+$/g, '');
    const target = String(path || '').replace(/\\/g, '/').replace(/^\/+|\/+$/g, '');
    if (!base || !target || !target.startsWith(`${base}/`)) return false;
    return !target.slice(base.length + 1).includes('/');
  }

  function boundNoteMissingFromSnapshot(note, workspace, basePath, seenPaths) {
    const remote = note && note.remote && typeof note.remote === 'object' ? note.remote : {};
    if (!sameTarget(
      { owner: remote.owner, repo: remote.repo, branch: remote.branch, path: remote.path },
      { owner: workspace && workspace.owner, repo: workspace && workspace.repo, branch: workspace && workspace.branch, path: remote.path }
    )) return false;
    if (!isDirectChildPath(basePath, remote.path)) return false;
    return !seenPaths.has(String(remote.path).replace(/\\/g, '/'));
  }

  return {
    REMOTE_RECONCILE_ACTIONS,
    classifyRemoteNote,
    isDirectChildPath,
    boundNoteMissingFromSnapshot,
    sameRemoteSnapshotTarget: sameTarget
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
  const DEFAULT_CATEGORY_BASE_PATH = 'categories';

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
      categoryBasePath: cleanWorkspaceBasePath(input.categoryBasePath || DEFAULT_CATEGORY_BASE_PATH),
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
    return `${workspace.owner}/${workspace.repo}@${workspace.branch}:notes=${workspace.basePath}; categories=${workspace.categoryBasePath || DEFAULT_CATEGORY_BASE_PATH}`;
  }


  function workspaceCategoryContextKey(workspace) {
    if (!workspace || !normalizeString(workspace.id).trim()) throw new TypeError('Workspace id is required for category context.');
    const owner = validateOwner(workspace.owner).toLowerCase();
    const repo = validateRepo(workspace.repo).toLowerCase();
    const branch = normalizeString(workspace.branch).trim() || 'main';
    if (/\r|\n|[\u0000-\u001f\u007f]/.test(branch)) throw new TypeError('GitHub branch is invalid.');
    const categoryBasePath = cleanWorkspaceBasePath(workspace.categoryBasePath || DEFAULT_CATEGORY_BASE_PATH);
    return JSON.stringify([normalizeString(workspace.id).trim(), owner, repo, branch, categoryBasePath]);
  }

  function sameRepositoryContext(left, right) {
    if (!left || !right) return false;
    return normalizeString(left.owner).trim().toLowerCase() === normalizeString(right.owner).trim().toLowerCase()
      && normalizeString(left.repo).trim().replace(/\.git$/i, '').toLowerCase() === normalizeString(right.repo).trim().replace(/\.git$/i, '').toLowerCase()
      && (normalizeString(left.branch).trim() || 'main') === (normalizeString(right.branch).trim() || 'main');
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
    DEFAULT_CATEGORY_BASE_PATH,
    createWorkspaceId,
    cleanWorkspaceBasePath,
    parseGitHubRepositoryInput,
    normalizeWorkspace,
    workspaceRepositoryLabel,
    workspaceTargetLabel,
    workspaceCategoryContextKey,
    sameRepositoryContext,
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

/* src/full-app-state-export.js */
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

  function panelViewportLayout(viewportWidth, viewportHeight) {
    const width = Number.isFinite(Number(viewportWidth)) ? Math.max(0, Number(viewportWidth)) : 0;
    const height = Number.isFinite(Number(viewportHeight)) ? Math.max(0, Number(viewportHeight)) : 0;
    const edge = 12;
    const reservedRight = width >= 960
      ? Math.min(320, Math.max(220, Math.round(width * 0.2)))
      : edge;
    const reservedBottom = height >= 520
      ? Math.min(144, Math.max(96, Math.round(height * 0.14)))
      : edge;
    const panelWidth = Math.max(240, Math.min(980, width - reservedRight - edge));
    const panelHeight = Math.max(240, Math.min(760, height - reservedBottom - edge));
    return {
      edge,
      left: Math.max(edge, Math.round((width - panelWidth) / 2)),
      top: Math.max(edge, Math.round((height - panelHeight) / 2)),
      width: panelWidth,
      height: panelHeight
    };
  }

  function clampPanelPosition(left, top, panelWidth, panelHeight, viewportWidth, viewportHeight, edge = 12, viewportLeft = 0, viewportTop = 0, peekVisible = 64) {
    const width = Number.isFinite(Number(viewportWidth)) ? Math.max(0, Number(viewportWidth)) : 0;
    const height = Number.isFinite(Number(viewportHeight)) ? Math.max(0, Number(viewportHeight)) : 0;
    const itemWidth = Number.isFinite(Number(panelWidth)) ? Math.max(0, Number(panelWidth)) : 0;
    const itemHeight = Number.isFinite(Number(panelHeight)) ? Math.max(0, Number(panelHeight)) : 0;
    const margin = Number.isFinite(Number(edge)) ? Math.max(0, Number(edge)) : 0;
    const originLeft = Number.isFinite(Number(viewportLeft)) ? Number(viewportLeft) : 0;
    const originTop = Number.isFinite(Number(viewportTop)) ? Number(viewportTop) : 0;
    const requestedPeek = Number.isFinite(Number(peekVisible)) ? Math.max(0, Number(peekVisible)) : 64;
    const visibleGrip = Math.min(itemWidth, Math.max(margin * 2, requestedPeek));
    const minLeft = originLeft - Math.max(0, itemWidth - visibleGrip);
    const minTop = originTop + margin;
    const maxLeft = Math.max(minLeft, originLeft + width - visibleGrip);
    const maxTop = Math.max(minTop, originTop + height - margin - itemHeight);
    const requestedLeft = Number.isFinite(Number(left)) ? Number(left) : minLeft;
    const requestedTop = Number.isFinite(Number(top)) ? Number(top) : minTop;
    return {
      left: Math.round(Math.max(minLeft, Math.min(maxLeft, requestedLeft))),
      top: Math.round(Math.max(minTop, Math.min(maxTop, requestedTop)))
    };
  }

  function shouldCloseOnEscape(event, state) {
    return Boolean(event && event.key === 'Escape' && state && state.open && !state.busy);
  }

  function blankWorkspaceEditor(defaultBasePath = 'prototype-fixtures/linked-notes') {
    return { id: '', name: '', repositoryInput: '', branch: 'main', basePath: defaultBasePath, categoryBasePath: 'categories' };
  }

  function mergeWorkspaceEditorPatch(captured, dirty, patch = {}) {
    const nextPatch = { ...patch };
    if (captured && dirty && nextPatch.workspaceEditor && !nextPatch.replaceWorkspaceEditor) {
      nextPatch.workspaceEditor = captured;
    }
    return nextPatch;
  }

  function mergeCategoryEditorPatch(captured, dirty, patch = {}) {
    const nextPatch = { ...patch };
    if (captured && dirty && nextPatch.categoryEditor && !nextPatch.replaceCategoryEditor) {
      nextPatch.categoryEditor = {
        ...captured,
        selectedTargets: Array.isArray(nextPatch.categoryEditor.selectedTargets)
          ? nextPatch.categoryEditor.selectedTargets
          : (Array.isArray(captured.selectedTargets) ? captured.selectedTargets : [])
      };
    }
    return nextPatch;
  }

  function mergeRepositoryEditorPatch(captured, dirty, patch = {}) {
    const nextPatch = { ...patch };
    if (captured && dirty && nextPatch.repositoryEditor && !nextPatch.replaceFileEditor && nextPatch.repositoryEditor.mode !== 'none') {
      nextPatch.repositoryEditor = captured;
    }
    return nextPatch;
  }

  function mergeVisibleCategorySelection(previousIds, availableIds, checkedIds) {
    const normalize = (items) => {
      const result = [];
      const seen = new Set();
      for (const item of Array.isArray(items) ? items : []) {
        const id = String(item == null ? '' : item).trim();
        if (!id || seen.has(id)) continue;
        seen.add(id);
        result.push(id);
      }
      return result;
    };
    const previous = normalize(previousIds);
    const available = new Set(normalize(availableIds));
    const checked = normalize(checkedIds).filter((id) => available.has(id));
    return [...previous.filter((id) => !available.has(id)), ...checked];
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
        remoteRefreshSummary: '',
        surface: 'notes',
        repositoryPath: '',
        repositoryEntries: [],
        repositoryBreadcrumbs: [{ label: '/', path: '' }],
        repositoryPreview: null,
        repositoryEditor: { mode: 'none', parentPath: '', path: '', name: '', content: '', baseSha: '' },
        fileCategoryIds: [],
        fileEditAllowed: false,
        fileCategoryAssignmentAllowed: false,
        categories: [],
        selectedCategoryId: '',
        categoryEditor: { id: '', name: '', description: '', impliedCategoryIds: [], group: '', selectedTargets: [] },
        categoryFiles: [],
        categoryNotes: [],
        noteCategoryIds: [],
        noteBacklinks: [],
        noteViewMode: 'edit',
        fileViewMode: 'rendered',
        noteRendered: null,
        fileRendered: null,
        pendingAssets: [],
        transferDraft: { targetPath: '', mode: 'create' },
        feedback: [],
        targetPicker: { open: false, mode: '', query: '', depth: '2', currentPath: '', entries: [], fileResults: [], noteResults: [], selected: [], truncated: false, summary: '' },
        categoryErrors: [],
        categoryRefreshSummary: '',
        categoryRefreshedAt: '',
        busy: false
      };
      this.host = null;
      this.shadow = null;
      this.open = false;
      this.workspaceManagerOpen = false;
      this.workspaceEditorDirty = false;
      this.categoryEditorDirty = false;
      this.fileEditorDirty = false;
      this.fileCategoryDirty = false;
      this._draftTimer = null;
      this.panelPlacement = { mode: 'center', left: 0, top: 0 };
      this._panelDrag = null;
      this._onPanelPointerMove = (event) => this._movePanelDrag(event);
      this._onPanelPointerEnd = (event) => this._endPanelDrag(event);
      this._onViewportChange = () => {
        if (typeof this.__closeFilesWorkspaceTopPopupForPanelMove === 'function') this.__closeFilesWorkspaceTopPopupForPanelMove();
        this._positionPanel();
      };
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
      document.addEventListener('pointermove', this._onPanelPointerMove, true);
      document.addEventListener('pointerup', this._onPanelPointerEnd, true);
      document.addEventListener('pointercancel', this._onPanelPointerEnd, true);
      if (typeof window !== 'undefined') {
        window.addEventListener('resize', this._onViewportChange, { passive: true });
        if (window.visualViewport) window.visualViewport.addEventListener('resize', this._onViewportChange, { passive: true });
      }
      this.render();
    }

    dispose() {
      this.persistAllDraftsNow().catch(() => {});
      document.removeEventListener('keydown', this._onDocumentKeydown, true);
      document.removeEventListener('pointermove', this._onPanelPointerMove, true);
      document.removeEventListener('pointerup', this._onPanelPointerEnd, true);
      document.removeEventListener('pointercancel', this._onPanelPointerEnd, true);
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', this._onViewportChange);
        if (window.visualViewport) window.visualViewport.removeEventListener('resize', this._onViewportChange);
      }
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
      this._captureCategoryIntoState();
      this._captureRepositoryEditorIntoState();
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
        basePath: value('basePath') || 'prototype-fixtures/linked-notes',
        categoryBasePath: value('categoryBasePath') || 'categories'
      };
    }

    _captureWorkspaceIntoState() {
      const editor = this._workspaceFromForm();
      if (editor) this.state.workspaceEditor = editor;
      return editor;
    }

    _categoryFromForm() {
      if (!this.shadow) return this.state.categoryEditor;
      const value = (role) => {
        const input = this.shadow.querySelector(`[data-role="${role}"]`);
        return input ? input.value : '';
      };
      return {
        ...(this.state.categoryEditor || {}),
        id: value('category-id').trim(),
        name: value('category-name'),
        description: value('category-description'),
        impliedCategoryIds: value('category-implies').split(',').map((item) => item.trim()).filter(Boolean),
        group: value('category-group'),
        selectedTargets: Array.isArray(this.state.categoryEditor && this.state.categoryEditor.selectedTargets) ? [...this.state.categoryEditor.selectedTargets] : []
      };
    }

    _captureCategoryIntoState() {
      const editor = this._categoryFromForm();
      if (editor) this.state.categoryEditor = editor;
      return editor;
    }

    _repositoryEditorFromForm() {
      const editor = { ...(this.state.repositoryEditor || { mode: 'none', parentPath: '', path: '', name: '', content: '', baseSha: '' }) };
      if (!this.shadow || editor.mode === 'none') return editor;
      const name = this.shadow.querySelector('[data-role="repository-file-name"]');
      const content = this.shadow.querySelector('[data-role="repository-file-content"]');
      if (name) editor.name = name.value;
      if (content) editor.content = content.value;
      return editor;
    }

    _captureRepositoryEditorIntoState() {
      const editor = this._repositoryEditorFromForm();
      if (editor) this.state.repositoryEditor = editor;
      return editor;
    }

    _feedbackForSurface(surface) {
      return (Array.isArray(this.state.feedback) ? this.state.feedback : []).filter((item) => item && (item.scope === surface || item.scope === 'global'));
    }

    setState(patch) {
      const captured = this._captureDraftIntoState();
      const capturedWorkspace = this._captureWorkspaceIntoState();
      const capturedCategory = this._captureCategoryIntoState();
      const capturedFileEditor = this._captureRepositoryEditorIntoState();
      let nextPatch = { ...patch };
      if (captured && nextPatch.current && nextPatch.current.id === captured.id && !this.state.busy && !nextPatch.replaceCurrent) {
        nextPatch.current = { ...nextPatch.current, title: captured.title, body: captured.body, categoryIds: captured.categoryIds };
      }
      nextPatch = mergeWorkspaceEditorPatch(capturedWorkspace, this.workspaceEditorDirty, nextPatch);
      nextPatch = mergeCategoryEditorPatch(capturedCategory, this.categoryEditorDirty, nextPatch);
      nextPatch = mergeRepositoryEditorPatch(capturedFileEditor, this.fileEditorDirty, nextPatch);
      const currentPreviewPath = this.state.repositoryPreview && this.state.repositoryPreview.path || '';
      const nextPreviewPath = nextPatch.repositoryPreview ? nextPatch.repositoryPreview.path || '' : currentPreviewPath;
      if (nextPreviewPath !== currentPreviewPath) this.fileCategoryDirty = false;
      if (this.fileCategoryDirty && currentPreviewPath && nextPreviewPath === currentPreviewPath && Array.isArray(nextPatch.fileCategoryIds) && !nextPatch.replaceFileCategoryIds) {
        nextPatch.fileCategoryIds = [...(this.state.fileCategoryIds || [])];
      }
      if (nextPatch.replaceWorkspaceEditor) this.workspaceEditorDirty = false;
      if (nextPatch.replaceCategoryEditor) this.categoryEditorDirty = false;
      if (nextPatch.replaceFileEditor) this.fileEditorDirty = false;
      if (nextPatch.replaceFileCategoryIds) this.fileCategoryDirty = false;
      delete nextPatch.replaceCurrent;
      delete nextPatch.replaceWorkspaceEditor;
      delete nextPatch.replaceCategoryEditor;
      delete nextPatch.replaceFileEditor;
      delete nextPatch.replaceFileCategoryIds;
      this.state = { ...this.state, ...nextPatch };
      this.render();
    }

    _draftFromForm() {
      if (!this.shadow || !this.state.current) return null;
      const title = this.shadow.querySelector('[data-role="title"]');
      const body = this.shadow.querySelector('[data-role="body"]');
      const checkedCategoryIds = Array.from(this.shadow.querySelectorAll('[data-note-category-id]:checked')).map((input) => input.dataset.noteCategoryId);
      const availableCategoryIds = (this.state.categories || []).map((category) => category.id);
      const categoryIds = mergeVisibleCategorySelection(this.state.current.categoryIds, availableCategoryIds, checkedCategoryIds);
      return {
        ...this.state.current,
        title: title ? title.value : this.state.current.title || '',
        body: body ? body.value : this.state.current.body || '',
        categoryIds
      };
    }

    async _call(name, ...args) {
      const fn = this.handlers[name];
      if (typeof fn !== 'function') return undefined;
      try {
        return await fn(...args);
      } catch (error) {
        const scope = this.state.targetPicker && this.state.targetPicker.open ? 'picker' : (this.state.surface || 'global');
        const feedback = {
          id: `ui-${scope}-error`, scope, severity: 'error', title: 'Action failed',
          message: String(error && error.message || error), target: '', details: String(error && (error.kind || error.name) || ''),
          partialResults: Array.isArray(error && error.partialResults) ? error.partialResults : [], dismissible: true
        };
        const hasEquivalent = (this.state.feedback || []).some((item) => item && item.scope === scope && item.severity === 'error' && item.message === feedback.message);
        if (!hasEquivalent) {
          const existing = (this.state.feedback || []).filter((item) => item.id !== feedback.id);
          this.setState({ feedback: [...existing, feedback], status: `Error: ${feedback.message}` });
        }
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

    _panelViewportMetrics() {
      if (typeof window === 'undefined') return { width: 0, height: 0, left: 0, top: 0 };
      const viewport = window.visualViewport || window;
      return {
        width: Number(viewport.width || window.innerWidth || 0),
        height: Number(viewport.height || window.innerHeight || 0),
        left: Number(viewport.offsetLeft || 0),
        top: Number(viewport.offsetTop || 0)
      };
    }

    _positionPanel() {
      const panel = this.shadow && this.shadow.querySelector('.panel');
      if (!panel || typeof window === 'undefined') return;
      const viewport = this._panelViewportMetrics();
      const layout = panelViewportLayout(viewport.width, viewport.height);
      panel.style.right = 'auto';
      panel.style.bottom = 'auto';
      panel.style.width = `${layout.width}px`;
      panel.style.height = `${layout.height}px`;
      const centered = { left: viewport.left + layout.left, top: viewport.top + layout.top };
      const position = this.panelPlacement && this.panelPlacement.mode === 'custom'
        ? clampPanelPosition(this.panelPlacement.left, this.panelPlacement.top, layout.width, layout.height, viewport.width, viewport.height, layout.edge, viewport.left, viewport.top)
        : centered;
      panel.style.left = `${position.left}px`;
      panel.style.top = `${position.top}px`;
      if (this.panelPlacement && this.panelPlacement.mode === 'custom') this.panelPlacement = { mode: 'custom', ...position };
      return { ...layout, ...position };
    }

    _movePanelDrag(event) {
      const drag = this._panelDrag;
      if (!drag || !event || (drag.pointerId != null && event.pointerId != null && event.pointerId !== drag.pointerId)) return;
      const clientX = Number(event.clientX);
      const clientY = Number(event.clientY);
      if (!Number.isFinite(clientX) || !Number.isFinite(clientY)) return;
      const viewport = this._panelViewportMetrics();
      const position = clampPanelPosition(
        drag.startLeft + (clientX - drag.startX),
        drag.startTop + (clientY - drag.startY),
        drag.width,
        drag.height,
        viewport.width,
        viewport.height,
        drag.edge,
        viewport.left,
        viewport.top
      );
      drag.currentLeft = position.left;
      drag.currentTop = position.top;
      this.panelPlacement = { mode: 'custom', left: position.left, top: position.top };
      const panel = this.shadow && this.shadow.querySelector('.panel');
      if (panel && panel.style) {
        panel.style.left = `${position.left}px`;
        panel.style.top = `${position.top}px`;
        panel.style.right = 'auto';
        panel.style.bottom = 'auto';
        if (panel.dataset) panel.dataset.dragging = '1';
      }
    }

    _endPanelDrag(event) {
      const drag = this._panelDrag;
      if (!drag || (event && drag.pointerId != null && event.pointerId != null && event.pointerId !== drag.pointerId)) return;
      this._movePanelDrag(event);
      const placement = this.panelPlacement && this.panelPlacement.mode === 'custom' ? this.panelPlacement : null;
      const left = placement && Number.isFinite(Number(placement.left)) ? Number(placement.left) : (Number.isFinite(Number(drag.currentLeft)) ? Number(drag.currentLeft) : drag.startLeft);
      const top = placement && Number.isFinite(Number(placement.top)) ? Number(placement.top) : (Number.isFinite(Number(drag.currentTop)) ? Number(drag.currentTop) : drag.startTop);
      this.panelPlacement = { mode: 'custom', left: Math.round(left), top: Math.round(top) };
      const panel = this.shadow && this.shadow.querySelector('.panel');
      if (panel && panel.dataset) delete panel.dataset.dragging;
      if (drag.handle && typeof drag.handle.releasePointerCapture === 'function' && drag.pointerId != null) {
        try { drag.handle.releasePointerCapture(drag.pointerId); } catch (error) { /* pointer capture may already be released */ }
      }
      this._panelDrag = null;
    }

    _beginPanelDrag(event) {
      if (!event || (Number.isFinite(Number(event.button)) && Number(event.button) !== 0)) return;
      const panel = this.shadow && this.shadow.querySelector('.panel');
      if (!panel || typeof panel.getBoundingClientRect !== 'function') return;
      if (typeof event.preventDefault === 'function') event.preventDefault();
      if (typeof this.__closeFilesWorkspaceTopPopupForPanelMove === 'function') this.__closeFilesWorkspaceTopPopupForPanelMove();
      const rect = panel.getBoundingClientRect();
      const viewport = this._panelViewportMetrics();
      const layout = panelViewportLayout(viewport.width, viewport.height);
      this.panelPlacement = { mode: 'custom', left: Math.round(Number(rect.left) || 0), top: Math.round(Number(rect.top) || 0) };
      this._panelDrag = {
        pointerId: event.pointerId,
        startX: Number(event.clientX) || 0,
        startY: Number(event.clientY) || 0,
        startLeft: Number(rect.left) || 0,
        startTop: Number(rect.top) || 0,
        currentLeft: Number(rect.left) || 0,
        currentTop: Number(rect.top) || 0,
        width: Number(rect.width) || layout.width,
        height: Number(rect.height) || layout.height,
        edge: layout.edge,
        handle: event.currentTarget || null
      };
      if (panel.dataset) panel.dataset.dragging = '1';
      if (event.currentTarget && typeof event.currentTarget.setPointerCapture === 'function' && event.pointerId != null) {
        try { event.currentTarget.setPointerCapture(event.pointerId); } catch (error) { /* pointer capture is an optimization */ }
      }
    }

    _centerPanel() {
      this._panelDrag = null;
      this.panelPlacement = { mode: 'center', left: 0, top: 0 };
      if (typeof this.__closeFilesWorkspaceTopPopupForPanelMove === 'function') this.__closeFilesWorkspaceTopPopupForPanelMove();
      this._positionPanel();
    }

    render() {
      if (!this.shadow) return;
      const current = this.state.current;
      const busy = Boolean(this.state.busy);
      const disabled = busy ? 'disabled' : '';
      const surface = this.state.surface || 'notes';
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
      const repositoryEntriesHtml = (this.state.repositoryEntries || []).map((entry) => `
        <button class="note-row" data-repository-entry="${escapeHtml(entry.path)}" data-entry-type="${escapeHtml(entry.type)}" data-entry-size="${escapeHtml(entry.size || 0)}" data-entry-sha="${escapeHtml(entry.sha || '')}" data-entry-html-url="${escapeHtml(entry.htmlUrl || '')}" ${disabled}>
          <strong>${entry.type === 'dir' ? '📁 ' : '📄 '}${escapeHtml(entry.name || entry.path)}</strong>
          <span>${escapeHtml(entry.type)}${entry.type === 'file' ? ` · ${escapeHtml(entry.size || 0)} bytes` : ''}</span>
        </button>`).join('') || '<div class="empty">Press Browse root or select a folder.</div>';
      const categoriesHtml = (this.state.categories || []).map((category) => `
        <button class="note-row ${category.id === this.state.selectedCategoryId ? 'active' : ''}" data-category-id="${escapeHtml(category.id)}" ${disabled}>
          <strong>${escapeHtml(category.name)}</strong>
          <span>${escapeHtml(category.group ? `${category.group} · ` : '')}${category.explicitFileCount} file(s) · ${category.explicitNoteCount || 0} Note(s)</span>
        </button>`).join('') || '<div class="empty">No category definitions cached.</div>';
      const sidebarBody = surface === 'notes' ? notesHtml : surface === 'files' ? repositoryEntriesHtml : categoriesHtml;
      const sidebarToolbar = surface === 'notes'
        ? `<input data-role="search" placeholder="Search Notes (Enter)" value="${escapeHtml(this.state.search)}" ${disabled}><button data-action="new" ${disabled}>New</button>`
        : surface === 'files'
          ? `<button data-action="browse-root" ${activeWorkspace && !busy ? '' : 'disabled'}>Browse root</button><button data-action="browse-up" ${this.state.repositoryPath && !busy ? '' : 'disabled'}>Up</button><button data-action="new-repository-file" ${activeWorkspace && this.state.hasToken && !busy ? '' : 'disabled'}>New file</button><button data-action="new-repository-folder" ${activeWorkspace && this.state.hasToken && !busy ? '' : 'disabled'}>New folder</button>`
          : `<button data-action="refresh-categories" ${activeWorkspace && this.state.hasToken && !busy ? '' : 'disabled'}>Refresh</button><button data-action="new-category" ${disabled}>New</button>`;
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
      const remoteSummary = this.state.remoteRefreshSummary
        ? `<div class="remote-summary"><strong>Last GitHub refresh:</strong> ${escapeHtml(this.state.remoteRefreshSummary)}</div>`
        : '';
      const recoveryButtons = current && this.state.remoteRecoveryAvailable
        ? `<button data-action="recheck-remote" ${disabled}>Recheck remote</button>
           <button data-action="load-remote" ${disabled}>Load remote</button>
           <button class="danger" data-action="overwrite-remote" ${disabled}>Restore/overwrite bound remote</button>`
        : '';
      const preview = this.state.repositoryPreview;
      const surfaceFeedback = this._feedbackForSurface(surface);
      const feedbackHtml = surfaceFeedback.map((item) => `<section class="feedback feedback-${escapeHtml(item.severity || 'error')}" tabindex="-1" data-feedback-id="${escapeHtml(item.id)}">
        <div class="feedback-head"><strong>${escapeHtml(item.title || 'Status')}</strong>${item.dismissible !== false ? `<button data-dismiss-feedback="${escapeHtml(item.id)}" title="Dismiss">×</button>` : ''}</div>
        ${item.message ? `<div>${escapeHtml(item.message)}</div>` : ''}
        ${item.target ? `<code>${escapeHtml(item.target)}</code>` : ''}
        ${item.details ? `<details><summary>Details</summary><pre>${escapeHtml(item.details)}</pre></details>` : ''}
        ${(item.partialResults || []).length ? `<div class="partial-results">${item.partialResults.map((result) => `<div><strong>${escapeHtml(result.status)}</strong> · ${escapeHtml(result.target)}${result.message ? ` · ${escapeHtml(result.message)}` : ''}</div>`).join('')}</div>` : ''}
        ${(item.actions || []).length ? `<div class="feedback-actions">${item.actions.map((action) => `<button class="${action.kind === 'primary' ? 'primary' : ''}" data-feedback-action="${escapeHtml(action.id)}">${escapeHtml(action.label)}</button>`).join('')}</div>` : ''}
      </section>`).join('');
      const renderProjection = (rendered) => rendered ? `<div class="rich-markdown" data-rich-root>${rendered.html || ''}</div>` : '<div class="empty">Rendered Markdown is not available yet.</div>';
      const breadcrumbs = (this.state.repositoryBreadcrumbs || []).map((item) => `<button data-browse-path="${escapeHtml(item.path)}" ${disabled}>${escapeHtml(item.label)}</button>`).join('<span>/</span>');
      const categoryPickerHtml = (kind, selectedIds, enabled = true) => {
        const selected = [...new Set((Array.isArray(selectedIds) ? selectedIds : []).map((id) => String(id || '').trim()).filter(Boolean))];
        const available = new Set((this.state.categories || []).map((category) => category.id));
        const unavailable = selected.filter((id) => !available.has(id));
        const attribute = kind === 'file' ? 'data-file-category-id' : 'data-note-category-id';
        const choices = (this.state.categories || []).map((category) => `<label class="category-picker-row" data-category-search-text="${escapeHtml(`${category.name} ${category.id}`.toLowerCase())}"><input type="checkbox" ${attribute}="${escapeHtml(category.id)}" ${selected.includes(category.id) ? 'checked' : ''} ${enabled && !busy ? '' : 'disabled'}><span>${escapeHtml(category.name)}</span><small>${escapeHtml(category.id)}</small></label>`).join('');
        const unavailableHtml = unavailable.map((id) => `<div class="category-picker-row unavailable"><span>${escapeHtml(id)}</span><small>Selected locally; unavailable until categories refresh succeeds.</small></div>`).join('');
        const apply = kind === 'file' ? `<button class="primary" data-action="apply-file-categories" ${enabled && !busy ? '' : 'disabled'}>Apply categories</button>` : '<span class="hint">Saved with the Note on Save GitHub.</span>';
        return `<details class="category-picker" data-category-kind="${kind}"><summary><span data-category-summary>Categories · ${selected.length} selected</span></summary><div class="category-picker-popover"><input data-category-filter="${kind}" placeholder="Search categories…" ${enabled && !busy ? '' : 'disabled'}><div class="category-picker-list">${choices}${unavailableHtml || ''}</div><div class="category-picker-actions">${apply}</div></div></details>`;
      };
      const repositoryEditor = this.state.repositoryEditor || { mode: 'none', parentPath: this.state.repositoryPath || '', path: '', name: '', content: '', baseSha: '' };
      const repositoryHeadingLinkEligible = Boolean(preview && preview.kind === 'text' && typeof preview.content === 'string' && /\.md(?:own)?$/i.test(preview.path || '') && repositoryEditor.mode === 'none');
      const repositoryHeadingLinks = repositoryHeadingLinkEligible && globalThis.ObsLinkedNotes && typeof globalThis.ObsLinkedNotes.repositoryHeadingLinksForPreview === 'function'
        ? globalThis.ObsLinkedNotes.repositoryHeadingLinksForPreview(preview)
        : [];
      const repositoryHeadingLinkHtml = repositoryHeadingLinkEligible
        ? `<details class="heading-link-picker"><summary>Copy heading link</summary><div class="heading-link-popover"><div class="heading-link-list">${repositoryHeadingLinks.length ? repositoryHeadingLinks.map((heading, index) => `<div class="heading-link-row" style="padding-left:${Math.max(0, Number(heading.level || 1) - 1) * 12}px"><span>${escapeHtml(`${'#'.repeat(Math.max(1, Math.min(6, Number(heading.level || 1))))} ${heading.text}`)}</span><button data-copy-repository-heading-link="${index}">Copy</button></div>`).join('') : '<div class="empty">No Markdown headings found in this loaded file snapshot.</div>'}</div><div class="hint" data-heading-copy-status>Copies a repository-root Markdown link; no GitHub request is made.</div></div></details>`
        : '';
      const repositoryEditorHtml = repositoryEditor.mode === 'folder'
        ? `<section class="repository-editor"><h3>New folder</h3><div class="hint">Parent: ${escapeHtml(repositoryEditor.parentPath || '/')} · GitHub tracks the folder through an empty .gitkeep file.</div><label class="field"><span>Folder name</span><input data-role="repository-file-name" value="${escapeHtml(repositoryEditor.name || '')}" placeholder="new-folder" ${disabled}></label><div class="repository-editor-actions"><button class="primary" data-action="save-repository-editor" ${activeWorkspace && this.state.hasToken && !busy ? '' : 'disabled'}>Create folder</button><button data-action="cancel-repository-editor" ${disabled}>Cancel</button></div></section>`
        : repositoryEditor.mode === 'create' || repositoryEditor.mode === 'edit'
          ? `<section class="repository-editor"><h3>${repositoryEditor.mode === 'edit' ? `Edit ${escapeHtml(repositoryEditor.path)}` : 'New text file'}</h3><div class="hint">${repositoryEditor.mode === 'edit' ? `Base SHA ${escapeHtml(repositoryEditor.baseSha || '')}` : `Parent: ${escapeHtml(repositoryEditor.parentPath || '/')}`} · UTF-8 text up to 512 KiB.</div>${repositoryEditor.mode === 'create' ? `<label class="field"><span>File name</span><input data-role="repository-file-name" value="${escapeHtml(repositoryEditor.name || '')}" placeholder="document.md" ${disabled}></label>` : ''}<textarea class="repository-text-editor" data-role="repository-file-content" spellcheck="false" ${disabled}>${escapeHtml(repositoryEditor.content || '')}</textarea><div class="repository-editor-actions"><button class="primary" data-action="save-repository-editor" ${activeWorkspace && this.state.hasToken && !busy ? '' : 'disabled'}>Save</button><button data-action="cancel-repository-editor" ${disabled}>Cancel</button></div></section>`
          : '';
      const fileCategoryHtml = preview
        ? ((this.state.categories || []).length || (this.state.fileCategoryIds || []).length
          ? `<section><h3>Categories</h3>${categoryPickerHtml('file', this.state.fileCategoryIds || [], Boolean(this.state.fileCategoryAssignmentAllowed))}<div class="hint">File bytes are never modified by category assignment; category definitions remain canonical.</div></section>`
          : '<section><h3>Categories</h3><div class="empty">Refresh categories to assign them to this file.</div></section>')
        : '';
      const fileSurface = `
        <div class="editor-toolbar">
          <button data-action="browse-root" ${activeWorkspace && !busy ? '' : 'disabled'}>Browse root</button>
          <button data-action="browse-up" ${this.state.repositoryPath && !busy ? '' : 'disabled'}>Up</button>
          <button data-action="refresh-folder" ${activeWorkspace && !busy ? '' : 'disabled'}>Refresh</button>
          <button data-action="new-repository-file" ${activeWorkspace && this.state.hasToken && !busy ? '' : 'disabled'}>New file</button>
          <button data-action="new-repository-folder" ${activeWorkspace && this.state.hasToken && !busy ? '' : 'disabled'}>New folder</button>
          ${preview && preview.kind === 'text' && /\.md(?:own)?$/i.test(preview.path || '') && repositoryEditor.mode === 'none' ? `<button data-file-view="rendered" class="${this.state.fileViewMode === 'rendered' ? 'active' : ''}" ${disabled}>Rendered</button><button data-file-view="source" class="${this.state.fileViewMode === 'source' ? 'active' : ''}" ${disabled}>Source</button>` : ''}
          <button data-action="edit-repository-file" ${preview && this.state.fileEditAllowed && repositoryEditor.mode === 'none' && this.state.hasToken && !busy ? '' : 'disabled'}>Edit</button>
          ${repositoryHeadingLinkHtml}
          <button class="primary" data-action="open-file-github" ${preview && !busy ? '' : 'disabled'}>Open on GitHub</button>
          <button data-action="close" ${disabled}>Close</button>
        </div>
        ${feedbackHtml}
        <div class="file-context"><div class="breadcrumbs">${breadcrumbs || '<span>/</span>'}</div><div>${escapeHtml(this.state.repositoryPath || '/')}</div></div>
        ${repositoryEditor.mode !== 'none' ? repositoryEditorHtml : (preview ? `<section class="file-preview">
          <h3>${escapeHtml(preview.path)}</h3>
          <div class="hint">${escapeHtml(preview.kind)} · ${escapeHtml(preview.size || 0)} bytes · SHA ${escapeHtml(preview.sha || '')}</div>
          ${preview.kind === 'text'
            ? (this.state.fileViewMode === 'rendered' && /\.md(?:own)?$/i.test(preview.path || '') ? renderProjection(this.state.fileRendered) : `<pre>${escapeHtml(preview.content || '')}</pre>`)
            : `<div class="remote-context">${escapeHtml(preview.message || 'Preview unavailable. Open on GitHub.')}</div>`}
        </section>` : '<div class="empty">Select a file to view it here, or create a new text file/folder in the current directory.</div>')}
        ${repositoryEditor.mode === 'none' ? fileCategoryHtml : ''}`;
      const categoryEditor = this.state.categoryEditor || { id: '', name: '', description: '', impliedCategoryIds: [], group: '', selectedTargets: [] };
      const categoryFilesHtml = (this.state.categoryFiles || []).map((file) => `<div class="category-file-row">
          <button data-category-file-open="${escapeHtml(file.path)}" ${disabled}>${escapeHtml(file.path)}</button>
          <span>${escapeHtml(file.membership)} · ${escapeHtml(file.validation || 'unchecked')}</span>
          ${file.membership === 'explicit' ? `<button data-category-file-remove="${escapeHtml(file.path)}" ${disabled}>Remove</button>` : ''}
          ${file.validationMessage ? `<small>${escapeHtml(file.validationMessage)}</small>` : ''}
        </div>`).join('') || '<div class="empty">No files in this category.</div>';
      const categoryNotesHtml = (this.state.categoryNotes || []).map((note) => `<div class="category-file-row">
          <button data-category-note-open="${escapeHtml(note.noteId || '')}" ${note.noteId && !busy ? '' : 'disabled'}>${escapeHtml(note.label || note.path)}</button>
          <span>${escapeHtml(note.membership)} · ${escapeHtml(note.validation || 'unchecked')}</span>
          ${note.membership === 'explicit' ? `<button data-category-target-remove="note:${escapeHtml(note.noteId || note.path)}" ${disabled}>Remove</button>` : ''}
          ${note.validationMessage ? `<small>${escapeHtml(note.validationMessage)}</small>` : ''}
        </div>`).join('') || '<div class="empty">No Notes in this category.</div>';
      const categoryTargetsHtml = (categoryEditor.selectedTargets || []).map((target) => `<div class="selected-target"><span>${target.type === 'note' ? '📝' : '📄'} ${escapeHtml(target.label || target.name || target.path || target.noteId)}</span><button data-category-draft-remove="${escapeHtml(target.type)}:${escapeHtml(target.type === 'note' ? (target.noteId || target.path) : target.path)}" ${disabled}>Remove</button></div>`).join('') || '<div class="empty">No initial members selected.</div>';
      const categoryErrorsHtml = (this.state.categoryErrors || []).map((error) => {
        const path = error && (error.path || error.targetPath) ? `<code>${escapeHtml(error.path || error.targetPath)}</code> · ` : '';
        const kind = error && error.kind ? `<strong>${escapeHtml(error.kind)}</strong>: ` : '';
        return `<div class="error-row">${path}${kind}${escapeHtml(error && (error.message || error.errorKind) || error)}</div>`;
      }).join('');
      const categorySurface = `
        <div class="editor-toolbar">
          <button data-action="refresh-categories" ${activeWorkspace && this.state.hasToken && !busy ? '' : 'disabled'}>Refresh categories</button>
          <button data-action="new-category" ${disabled}>New category</button>
          <button class="primary" data-action="save-category" ${activeWorkspace && !busy ? '' : 'disabled'}>Save category</button>
          <button data-action="close" ${disabled}>Close</button>
        </div>
        ${feedbackHtml}
        ${this.state.categoryRefreshSummary ? `<div class="remote-summary"><strong>Last category refresh:</strong> ${escapeHtml(this.state.categoryRefreshSummary)}</div>` : ''}
        <section class="category-editor">
          <div class="settings-grid">
            <label class="field"><span>Category id</span><input data-role="category-id" value="${escapeHtml(categoryEditor.id || '')}" placeholder="asp-net-core" ${categoryEditor.id ? 'readonly' : ''} ${disabled}></label>
            <label class="field"><span>Category name</span><input data-role="category-name" value="${escapeHtml(categoryEditor.name || '')}" placeholder="ASP.NET Core" ${disabled}></label>
            <label class="field wide"><span>Description</span><textarea data-role="category-description" placeholder="Literal Markdown category description" ${disabled}>${escapeHtml(categoryEditor.description || '')}</textarea></label>
            <label class="field"><span>Implicit categories</span><input data-role="category-implies" value="${escapeHtml((categoryEditor.impliedCategoryIds || []).join(', '))}" placeholder="programming, web" ${disabled}></label>
            <label class="field"><span>Local UX group</span><input data-role="category-group" value="${escapeHtml(categoryEditor.group || '')}" placeholder="Development technologies" ${disabled}></label>
          </div>
          <div class="category-actions">
            <button data-action="choose-category-targets" ${activeWorkspace && !busy ? '' : 'disabled'}>Choose files and Notes</button>
            <button data-action="save-category-group" ${categoryEditor.id && !busy ? '' : 'disabled'}>Save local group</button>
            <button data-action="assign-preview-category" ${categoryEditor.id && preview && this.state.categoryAssignmentAllowed && !busy ? '' : 'disabled'}>Assign selected file</button>
            <span class="hint">Definitions own file/Note membership. UX groups are local-only.</span>
          </div>
          <h3>Selected explicit members</h3><div class="selected-targets">${categoryTargetsHtml}</div>
          <h3>Files</h3><div class="category-files">${categoryFilesHtml}</div>
          <h3>Notes</h3><div class="category-files">${categoryNotesHtml}</div>
          ${categoryErrorsHtml ? `<h3>Category model issues</h3><div class="category-errors">${categoryErrorsHtml}</div>` : ''}
        </section>`;
      const noteCategoryHtml = (this.state.categories || []).length || (this.state.noteCategoryIds || []).length
        ? categoryPickerHtml('note', this.state.noteCategoryIds || [], Boolean(current))
        : '<div class="empty">Refresh categories to assign them to this Note.</div>';
      const backlinksHtml = (this.state.noteBacklinks || []).map((relation) => `<button data-note-backlink="${escapeHtml(relation.sourceNoteId)}" ${disabled}>${escapeHtml(relation.label || relation.sourceNoteId)}</button>`).join('') || '<div class="empty">No managed backlinks.</div>';
      const pendingAssetsHtml = (this.state.pendingAssets || []).map((asset) => `<div class="pending-asset-row">
          <span>🖼️ <strong>${escapeHtml(asset.fileName || asset.originalName || asset.id)}</strong> · ${escapeHtml(asset.mimeType || '')} · ${escapeHtml(asset.size || 0)} bytes · ${escapeHtml(asset.state || 'pending')}</span>
          ${asset.verifiedPath ? `<code>${escapeHtml(asset.verifiedPath)}</code>` : ''}
          <button data-remove-pending-image="${escapeHtml(asset.id)}" ${disabled}>Remove</button>
        </div>`).join('') || '<div class="empty">No locally staged images.</div>';
      const transferDraft = this.state.transferDraft || { targetPath: '', targetDirectory: '', fileName: 'copied-note.md', mode: 'create', plan: null };
      const transferPlan = transferDraft.plan || null;
      const transferPlanHtml = transferPlan ? `<div class="transfer-plan"><div><strong>Source:</strong> <code>${escapeHtml(transferPlan.sourcePath || '')}</code></div><div><strong>Target:</strong> <code>${escapeHtml(transferPlan.targetPath || '')}</code> · ${escapeHtml(transferPlan.mode || '')} · ${escapeHtml(transferPlan.targetState || '')}</div>${(transferPlan.assets || []).map((asset) => `<div class="transfer-plan-row"><strong>${escapeHtml(asset.status || '')}</strong> · <code>${escapeHtml(asset.sourcePath || '')}</code> → <code>${escapeHtml(asset.targetPath || '')}</code></div>`).join('')}${(transferPlan.diagnostics || []).map((item) => `<div class="transfer-plan-row"><strong>${escapeHtml(item.status || '')}</strong> · ${escapeHtml(item.source || item.target || '')} · ${escapeHtml(item.message || '')}</div>`).join('')}</div>` : '<div class="hint">Choose the target, then prepare a read-only transfer preview before any repository write.</div>';
      const notesSurface = `
        <div class="editor-toolbar">
          <button class="primary" data-action="save-local" ${current && !busy ? '' : 'disabled'}>Save local</button>
          <button class="primary" data-action="save-remote" ${current && activeWorkspace && !busy ? '' : 'disabled'}>Save GitHub</button>
          <button data-action="insert-image" ${current && !busy ? '' : 'disabled'}>Insert image</button>
          <input data-role="image-file" type="file" accept="image/png,image/jpeg,image/webp,image/gif" hidden>
          <button data-note-view="edit" class="${this.state.noteViewMode === 'edit' ? 'active' : ''}" ${disabled}>Edit</button>
          <button data-note-view="preview" class="${this.state.noteViewMode === 'preview' ? 'active' : ''}" ${disabled}>Preview</button>
          <button data-note-view="split" class="${this.state.noteViewMode === 'split' ? 'active' : ''}" ${disabled}>Split</button>
          <button data-action="copy-remote" ${current && activeWorkspace && this.state.remoteTargetMismatch && !busy ? '' : 'disabled'}>Copy to chat workspace</button>
          ${recoveryButtons}
          <button class="danger" data-action="delete" ${current && !busy ? '' : 'disabled'}>Delete local</button>
          <button data-action="close" ${disabled}>Close</button>
        </div>
        ${feedbackHtml}
        ${current ? `
          <input data-role="title" placeholder="Optional title" value="${escapeHtml(current.title || '')}" ${disabled}>
          <div class="note-mode note-mode-${escapeHtml(this.state.noteViewMode || 'edit')}">
            ${this.state.noteViewMode !== 'preview' ? `<textarea data-role="body" placeholder="Markdown Note body" ${disabled}>${escapeHtml(current.body || '')}</textarea>` : ''}
            ${this.state.noteViewMode !== 'edit' ? renderProjection(this.state.noteRendered) : ''}
          </div>
          ${remoteInfo}
          ${remoteSummary}
          <section><h3>Images</h3><div class="pending-assets">${pendingAssetsHtml}</div><div class="hint">Paste an image into the editor or use Insert image. Images remain local until Save GitHub verifies the repository asset and Note.</div></section>
          <section class="transfer-panel"><h3>Copy Note to Markdown with images</h3><div class="transfer-grid"><select data-role="transfer-mode" ${disabled}><option value="create" ${transferDraft.mode === 'create' ? 'selected' : ''}>Create new file</option><option value="append" ${transferDraft.mode === 'append' ? 'selected' : ''}>Append to existing file</option></select>${transferDraft.mode === 'create' ? `<input data-role="transfer-file-name" value="${escapeHtml(transferDraft.fileName || 'copied-note.md')}" placeholder="copied-note.md" ${disabled}>` : ''}<button data-action="choose-transfer-target" ${current && activeWorkspace && !busy ? '' : 'disabled'}>${transferDraft.mode === 'append' ? 'Choose existing Markdown' : 'Choose target folder'}</button></div><div class="target-preview"><strong>Selected target:</strong> <code>${escapeHtml(transferDraft.targetPath || 'not selected')}</code></div><div class="transfer-actions"><button data-action="prepare-transfer" ${current && activeWorkspace && transferDraft.targetPath && !busy ? '' : 'disabled'}>Prepare transfer preview</button><button class="primary" data-action="execute-transfer" ${current && activeWorkspace && transferPlan && transferPlan.ready && !busy ? '' : 'disabled'}>Execute reviewed transfer</button></div>${transferPlanHtml}<div class="hint">The first slice copies within the current repository/branch. Source Note and source images are never deleted.</div></section>
          <section><h3>Categories</h3><div class="category-choices">${noteCategoryHtml}</div><div class="hint">Selection is preserved locally; Save GitHub applies verified category-definition changes.</div></section>
          <section><h3>Managed links</h3><div class="links">${linksHtml}</div>
            <button data-action="choose-note-links" ${disabled}>Choose files or Notes</button>
          </section>
          <section><h3>Linked from</h3><div class="backlinks">${backlinksHtml}</div></section>` : '<div class="empty">Create or select a Note.</div>'}`;
      const picker = this.state.targetPicker || {};
      const transferPicker = picker.mode === 'transfer-target';
      const pickerTitle = transferPicker ? (picker.transferMode === 'append' ? 'Choose existing Markdown target' : 'Choose target folder') : 'Choose files or Notes';
      const pickerActionLabel = transferPicker ? (picker.transferMode === 'append' ? 'Use selected Markdown' : 'Use current folder') : 'Use selected targets';
      const pickerItems = (picker.query ? picker.fileResults : picker.entries || []).map((entry) => {
        if (entry.type === 'dir') return `<button class="picker-row" data-picker-dir="${escapeHtml(entry.path)}" ${disabled}>📁 ${escapeHtml(entry.name || entry.path)}</button>`;
        const key = `file:${entry.path}`;
        const checked = (picker.selected || []).some((item) => item.type === 'file' && item.path === entry.path);
        return `<label class="picker-row"><input type="checkbox" data-picker-target="${escapeHtml(key)}" data-picker-path="${escapeHtml(entry.path)}" data-picker-name="${escapeHtml(entry.name || entry.path)}" ${checked ? 'checked' : ''} ${disabled}> 📄 ${escapeHtml(entry.name || entry.path)} <small>${escapeHtml(entry.path)}</small></label>`;
      }).join('') || '<div class="empty">No file results.</div>';
      const pickerNotes = (picker.query ? (picker.noteResults || []) : (this.state.notes || [])).map((note) => {
        const checked = (picker.selected || []).some((item) => item.type === 'note' && item.noteId === note.id);
        const path = note.remote && note.remote.path || '';
        return `<label class="picker-row"><input type="checkbox" data-picker-target="note:${escapeHtml(note.id)}" data-picker-note-id="${escapeHtml(note.id)}" data-picker-path="${escapeHtml(path)}" data-picker-name="${escapeHtml(note.title || 'Untitled Note')}" ${checked ? 'checked' : ''} ${disabled}> 📝 ${escapeHtml(note.title || 'Untitled Note')} <small>${escapeHtml(path || note.id)}</small></label>`;
      }).join('') || '<div class="empty">No Note results.</div>';
      const pickerSelected = (picker.selected || []).map((item) => `<div class="selected-target"><span>${item.type === 'note' ? '📝' : '📄'} ${escapeHtml(item.label || item.name || item.path || item.noteId)}</span><button data-picker-remove="${escapeHtml(item.type)}:${escapeHtml(item.type === 'note' ? (item.noteId || item.path) : item.path)}" ${disabled}>Remove</button></div>`).join('') || '<div class="empty">Nothing selected.</div>';
      const pickerModal = picker.open ? `<div class="picker-backdrop"><section class="picker-modal" aria-modal="true" role="dialog" aria-label="Choose repository targets">
        <div class="picker-header"><strong>${escapeHtml(pickerTitle)}</strong><button data-action="close-target-picker" ${disabled}>×</button></div>
        ${this._feedbackForSurface('picker').map((item) => `<section class="feedback feedback-${escapeHtml(item.severity || 'error')}" tabindex="-1"><strong>${escapeHtml(item.title || 'Action failed')}</strong><div>${escapeHtml(item.message || '')}</div></section>`).join('')}
        <div class="picker-search"><input data-role="picker-query" value="${escapeHtml(picker.query || '')}" placeholder="Search by name"><select data-role="picker-depth"><option value="0" ${picker.depth === '0' ? 'selected' : ''}>Current folder</option><option value="1" ${picker.depth === '1' ? 'selected' : ''}>Depth 1</option><option value="2" ${picker.depth === '2' ? 'selected' : ''}>Depth 2</option><option value="3" ${picker.depth === '3' ? 'selected' : ''}>Depth 3</option><option value="5" ${picker.depth === '5' ? 'selected' : ''}>Depth 5</option><option value="entire" ${picker.depth === 'entire' ? 'selected' : ''}>Entire repository (bounded)</option></select><button data-action="picker-search" ${disabled}>Search</button></div>
        <div class="picker-tabs"><button data-picker-tab="files" class="${picker.tab === 'files' ? 'active' : ''}">Files</button>${transferPicker ? '' : `<button data-picker-tab="notes" class="${picker.tab === 'notes' ? 'active' : ''}">Notes</button>`}<button data-picker-tab="selected" class="${picker.tab === 'selected' ? 'active' : ''}">Selected (${(picker.selected || []).length})</button></div>
        <div class="picker-summary">${escapeHtml(picker.summary || picker.currentPath || '/')} ${picker.truncated ? ' · incomplete result' : ''}</div>${transferPicker && picker.transferMode === 'create' ? `<div class="picker-search"><input data-role="picker-file-name" value="${escapeHtml(picker.fileName || 'copied-note.md')}" placeholder="copied-note.md"></div>` : ''}
        <div class="picker-content" data-picker-panel="files" ${picker.tab !== 'files' ? 'hidden' : ''}>${pickerItems}</div>
        ${transferPicker ? '' : `<div class="picker-content" data-picker-panel="notes" ${picker.tab !== 'notes' ? 'hidden' : ''}>${pickerNotes}</div>`}
        <div class="picker-content" data-picker-panel="selected" ${picker.tab !== 'selected' ? 'hidden' : ''}>${pickerSelected}</div>
        <div class="picker-actions"><button class="primary" data-action="apply-target-picker" ${disabled}>${escapeHtml(pickerActionLabel)}</button><button data-action="close-target-picker" ${disabled}>Cancel</button></div>
      </section></div>` : '';
      const activeSurface = surface === 'files' ? fileSurface : surface === 'categories' ? categorySurface : notesSurface;

      this.shadow.innerHTML = `
        <style>
          :host { all: initial; --bg:#111318; --surface:#191c23; --surface-2:#20242d; --surface-3:#292e39; --border:#3b4250; --text:#eef1f6; --muted:#aab2c0; --accent:#8eb4ff; --success:#79d69a; --danger:#ff8d8d; }
          *, *::before, *::after { box-sizing: border-box; }
          button, input, textarea, select { font: 13px/1.35 system-ui, sans-serif; }
          .launcher { position: fixed; right: 102px; bottom: 18px; z-index: 2147483647; border: 1px solid #343a46; border-radius: 999px; padding: 10px 15px; background: #202123; color: #fff; box-shadow: 0 5px 18px rgba(0,0,0,.42); cursor: pointer; }
          .panel { position: fixed; left: 12px; top: 12px; right: auto; bottom: auto; z-index: 2147483647; width: min(980px, calc(100vw - 24px)); height: min(760px, calc(100dvh - 108px)); max-width: calc(100vw - 24px); max-height: calc(100dvh - 24px); min-width: 0; min-height: 0; display: ${this.open ? 'grid' : 'none'}; grid-template-columns: 260px minmax(0, 1fr); grid-template-rows: auto minmax(0, 1fr); background: var(--bg); color: var(--text); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; box-shadow: 0 14px 42px rgba(0,0,0,.55); font: 13px/1.4 system-ui, sans-serif; color-scheme: dark; }
          .panel-chrome { grid-column: 1 / -1; grid-row: 1; min-width: 0; display: flex; align-items: center; gap: 8px; padding: 6px 8px; border-bottom: 1px solid var(--border); background: #151820; }
          .panel-drag-handle { min-width: 0; flex: 1 1 auto; display: flex; align-items: center; gap: 8px; color: var(--muted); cursor: grab; user-select: none; touch-action: none; }
          .panel-drag-handle::before { content: '⋮⋮'; letter-spacing: -2px; color: var(--text); }
          .panel-edge-grip { flex: 0 0 22px; align-self: stretch; display: grid; place-items: center; color: var(--muted); cursor: grab; user-select: none; touch-action: none; border-radius: 5px; }
          .panel-edge-grip::before { content: '⋮'; font-weight: 700; }
          .panel-edge-grip:hover { background: var(--surface-2); color: var(--text); }
          .panel[data-dragging="1"] .panel-drag-handle, .panel[data-dragging="1"] .panel-edge-grip { cursor: grabbing; }
          .panel-window-actions { display: flex; gap: 6px; margin-left: auto; }
          .panel-window-actions button { padding: 4px 8px; }
          .sidebar { grid-column: 1; grid-row: 2; display: flex; flex-direction: column; min-width: 0; min-height: 0; overflow: hidden; background: var(--surface); border-right: 1px solid var(--border); }
          .toolbar, .editor-toolbar, .status, .workspace-bar, .surface-tabs { padding: 10px; border-bottom: 1px solid var(--border); }
          .toolbar { display: grid; grid-template-columns: 1fr auto; gap: 7px; }
          .workspace-bar { display: grid; grid-template-columns: minmax(180px, 260px) minmax(0, 1fr) auto auto; gap: 8px; align-items: center; background: var(--surface); }
          .surface-tabs { display: flex; gap: 7px; background: var(--surface-2); }
          .surface-tabs button.active { outline: 2px solid var(--accent); }
          .workspace-summary { color: var(--muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
          input, textarea, select { width: 100%; border: 1px solid var(--border); border-radius: 6px; padding: 7px; background: var(--surface-2); color: var(--text); }
          input::placeholder, textarea::placeholder { color: #7f8999; }
          button { border: 1px solid var(--border); border-radius: 6px; padding: 6px 9px; background: var(--surface-2); color: var(--text); cursor: pointer; }
          button:hover:not(:disabled) { background: var(--surface-3); }
          button.primary { background: #315b9d; color: #fff; border-color: #4a78bd; }
          button.danger { color: var(--danger); }
          button:disabled, input:disabled, textarea:disabled, select:disabled { opacity: .5; cursor: not-allowed; }
          .notes { flex: 1 1 0; min-height: 0; overflow-y: auto; overscroll-behavior: contain; scrollbar-gutter: stable; padding: 7px; }
          .note-row { width: 100%; display: flex; flex-direction: column; align-items: flex-start; margin-bottom: 6px; text-align: left; }
          .note-row span { color: var(--muted); font-size: 11px; }
          .note-row.active { outline: 2px solid var(--success); }
          .main { grid-column: 2; grid-row: 2; min-width: 0; min-height: 0; overflow: hidden; display: flex; flex-direction: column; }
          .editor-toolbar { display: flex; gap: 7px; flex-wrap: wrap; background: var(--surface); margin: -12px -12px 0; }
          .editor { flex: 1 1 0; display: grid; align-content: start; grid-template-rows: auto; min-height: 0; gap: 8px; padding: 12px 12px 72px; overflow-y: auto; overscroll-behavior: contain; scrollbar-gutter: stable; }
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
          .workspace-actions, .token-actions, .category-actions { display: flex; gap: 7px; flex-wrap: wrap; align-items: center; }
          .target-preview, .file-context { border: 1px solid var(--border); border-radius: 6px; padding: 7px; color: var(--muted); word-break: break-word; background: var(--surface-2); }
          .remote-context { border: 1px solid var(--border); border-radius: 7px; padding: 7px; color: var(--muted); word-break: break-word; background: var(--surface); }
          .remote-context.mismatch { border-color: #9b5a5a; background: #351f22; color: #ffb8b8; }
          .remote-summary { border: 1px solid #365f83; border-radius: 7px; padding: 7px; color: #c7ddf3; word-break: break-word; background: #162636; }
          .status { margin-top: auto; background: var(--surface-2); color: var(--muted); word-break: break-word; }
          .empty, .hint { color: var(--muted); }
          .empty { padding: 8px; }
          h3 { margin: 0 0 7px; font: 600 15px/1.3 system-ui, sans-serif; }
          .hint { font-size: 12px; }
          .breadcrumbs { display: flex; flex-wrap: wrap; gap: 4px; align-items: center; margin-bottom: 6px; }
          .file-preview pre { white-space: pre-wrap; word-break: break-word; margin: 8px 0; padding: 10px; border: 1px solid var(--border); border-radius: 7px; background: #0e1014; max-height: 480px; overflow: auto; }
          .category-file-row { display: grid; grid-template-columns: minmax(0,1fr) auto auto; gap: 6px; margin-bottom: 6px; align-items: center; }
          .category-file-row button:first-child { text-align: left; overflow: hidden; text-overflow: ellipsis; }
          .category-file-row span { color: var(--muted); }
          .error-row { border: 1px solid #8b5050; background: #351f22; color: #ffb8b8; padding: 6px; border-radius: 6px; margin-bottom: 5px; }
          .feedback { border: 2px solid #b85b5b; background: #421f24; color: #ffe3e3; border-radius: 9px; padding: 12px; font-size: 14px; line-height: 1.45; box-shadow: 0 4px 18px rgba(0,0,0,.28); }
          .feedback-success { border-color: #3d9160; background: #173323; color: #d5ffe3; }
          .feedback-warning { border-color: #aa7b32; background: #3d2f17; color: #ffe9bd; }
          .feedback-info { border-color: #477ca9; background: #172d40; color: #d4ebff; }
          .feedback-head { display: flex; justify-content: space-between; align-items: center; gap: 8px; margin-bottom: 5px; font-size: 15px; }
          .feedback code { display: block; margin-top: 6px; color: inherit; word-break: break-word; }
          .feedback-actions { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 9px; }
          .partial-results { display: grid; gap: 4px; margin-top: 8px; }
          .rich-markdown { padding: 12px; border: 1px solid var(--border); border-radius: 8px; background: #0f1217; overflow-wrap: anywhere; min-height: 120px; }
          .rich-markdown h1, .rich-markdown h2, .rich-markdown h3, .rich-markdown h4 { margin: 1em 0 .45em; }
          .rich-markdown p { margin: .55em 0; }
          .rich-markdown pre { white-space: pre-wrap; overflow: auto; padding: 10px; background: #090b0f; border-radius: 6px; }
          .rich-markdown code { font-family: ui-monospace, SFMono-Regular, Consolas, monospace; }
          .rich-markdown table { border-collapse: collapse; width: 100%; }
          .rich-markdown th, .rich-markdown td { border: 1px solid var(--border); padding: 6px; text-align: left; }
          .rich-markdown a { color: #9ec5ff; text-decoration: underline; cursor: pointer; }
          .rich-markdown img { display: block; max-width: 100%; height: auto; margin: 10px 0; border-radius: 5px; }
          .obs-md-image-pending { min-height: 36px; border: 1px dashed var(--border); }
          .note-mode-split { display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr); gap: 10px; align-items: start; }
          .category-choices { display: flex; flex-wrap: wrap; gap: 7px; }
          .category-choice { border: 1px solid var(--border); border-radius: 999px; padding: 5px 8px; background: var(--surface-2); }
          .category-choice input { width: auto; }
          .selected-targets, .backlinks { display: grid; gap: 6px; }
          .selected-target { display: flex; align-items: center; justify-content: space-between; gap: 8px; border: 1px solid var(--border); border-radius: 6px; padding: 6px; background: var(--surface-2); }
          .pending-assets { display: grid; gap: 6px; }
          .pending-asset-row { display: grid; grid-template-columns: minmax(0,1fr) auto auto; gap: 7px; align-items: center; border: 1px solid var(--border); border-radius: 7px; padding: 7px; background: var(--surface-2); }
          .pending-asset-row code { overflow: hidden; text-overflow: ellipsis; }
          .transfer-grid { display: grid; grid-template-columns: 180px minmax(0,1fr) auto; gap: 7px; }
          .transfer-actions { display: flex; flex-wrap: wrap; gap: 7px; margin: 7px 0; }
          .transfer-plan { display: grid; gap: 5px; margin-top: 7px; padding: 7px; border: 1px solid var(--border); border-radius: 6px; background: var(--surface-2); }
          .transfer-plan-row { overflow-wrap: anywhere; }
          .repository-editor { display: grid; gap: 8px; }
          .repository-text-editor { min-height: 320px; width: 100%; resize: vertical; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; white-space: pre; }
          .repository-editor-actions, .category-picker-actions { display: flex; gap: 7px; align-items: center; flex-wrap: wrap; }
          .category-picker { position: relative; max-width: 620px; }
          .category-picker > summary { cursor: pointer; display: inline-flex; align-items: center; min-height: 34px; padding: 6px 10px; border: 1px solid var(--border); border-radius: 7px; background: var(--surface); }
          .category-picker-popover { margin-top: 6px; display: grid; gap: 7px; padding: 8px; border: 1px solid var(--border); border-radius: 8px; background: var(--surface-2); }
          .category-picker-list { max-height: 280px; overflow: auto; display: grid; gap: 4px; }
          .category-picker-row { display: grid; grid-template-columns: auto minmax(0,1fr) auto; gap: 8px; align-items: center; padding: 6px 7px; border-radius: 6px; }
          .category-picker-row:hover { background: var(--surface); }
          .category-picker-row input { width: auto; }
          .category-picker-row small { color: var(--muted); overflow-wrap: anywhere; }
          .category-picker-row.unavailable { opacity: .75; }
          .heading-link-picker { position: relative; }
          .heading-link-picker > summary { cursor: pointer; display: inline-flex; align-items: center; min-height: 34px; padding: 6px 10px; border: 1px solid var(--border); border-radius: 7px; background: var(--surface); list-style: none; }
          .heading-link-picker > summary::-webkit-details-marker { display: none; }
          .heading-link-popover { position: absolute; z-index: 45; top: calc(100% + 6px); right: 0; width: min(560px, 80vw); max-height: 380px; overflow: auto; display: grid; gap: 7px; padding: 8px; border: 1px solid var(--border); border-radius: 8px; background: var(--surface-2); box-shadow: 0 12px 30px rgba(0,0,0,.45); }
          .heading-link-list { display: grid; gap: 4px; }
          .heading-link-row { display: grid; grid-template-columns: minmax(0,1fr) auto; gap: 8px; align-items: center; padding-top: 3px; padding-bottom: 3px; }
          .heading-link-row span { min-width: 0; overflow-wrap: anywhere; }
          .picker-backdrop { position: absolute; inset: 0; z-index: 20; display: grid; place-items: center; padding: 18px; background: rgba(0,0,0,.72); }
          .main { position: relative; }
          .picker-modal { width: min(780px, 100%); max-height: 92%; display: flex; flex-direction: column; gap: 8px; padding: 12px; border: 1px solid var(--border); border-radius: 10px; background: var(--bg); box-shadow: 0 16px 45px rgba(0,0,0,.6); }
          .picker-header, .picker-actions, .picker-tabs { display: flex; gap: 7px; align-items: center; }
          .picker-header { justify-content: space-between; font-size: 15px; }
          .picker-search { display: grid; grid-template-columns: minmax(0,1fr) 180px auto; gap: 7px; }
          .picker-summary { color: var(--muted); }
          .picker-content { min-height: 160px; max-height: 380px; overflow: auto; border: 1px solid var(--border); border-radius: 7px; padding: 7px; }
          .picker-row { width: 100%; display: flex; gap: 8px; align-items: center; text-align: left; margin-bottom: 5px; padding: 7px; border: 1px solid var(--border); border-radius: 6px; background: var(--surface); }
          .picker-row input { width: auto; }
          .picker-row small { color: var(--muted); margin-left: auto; overflow: hidden; text-overflow: ellipsis; }
          .workspace-manager-panel { margin-top: 10px; }
          @media (max-width: 700px) { .panel { grid-template-columns: minmax(0, 1fr); grid-template-rows: auto auto minmax(0, 1fr); } .panel-chrome { grid-column: 1; grid-row: 1; } .sidebar { grid-column: 1; grid-row: 2; max-height: 190px; border-right: 0; border-bottom: 1px solid var(--border); } .main { grid-column: 1; grid-row: 3; } .add-link, .workspace-bar, .settings-grid, .picker-search, .note-mode-split, .transfer-grid, .pending-asset-row { grid-template-columns: 1fr; } }
        </style>
        <button class="launcher" data-action="toggle" ${disabled}>Docs</button>
        <section class="panel" aria-label="Repository Documentation Workspace Prototype" aria-busy="${busy ? 'true' : 'false'}">
          <div class="panel-chrome"><span class="panel-edge-grip panel-edge-grip-left" data-panel-drag-handle title="Drag Linked Notes window back from an edge" aria-label="Drag Linked Notes"></span><div class="panel-drag-handle" data-panel-drag-handle title="Drag Linked Notes window"><strong>Linked Notes</strong><span>drag</span></div><div class="panel-window-actions"><button data-action="center-panel" title="Put Linked Notes back in the center">Center</button></div><span class="panel-edge-grip panel-edge-grip-right" data-panel-drag-handle title="Drag Linked Notes window back from an edge" aria-label="Drag Linked Notes"></span></div>
          <aside class="sidebar">
            <div class="toolbar">${sidebarToolbar}</div>
            <div class="notes">${sidebarBody}</div>
            <div class="status">${escapeHtml(this.state.status)}</div>
          </aside>
          <main class="main">
            <div class="workspace-bar">
              <select data-role="workspace-select" ${disabled}>${workspaceOptions || '<option value="">No saved workspace</option>'}</select>
              <div class="workspace-summary" title="${escapeHtml(this.state.workspaceTargetLabel)}">${escapeHtml(activeWorkspace ? `${this.state.chatContextLabel} · ${this.state.workspaceTargetLabel}` : 'Create a workspace before remote access.')}</div>
              <button data-action="refresh-github" ${activeWorkspace && this.state.hasToken && !busy ? '' : 'disabled'}>Refresh Notes</button>
              <button data-action="manage-workspaces" ${disabled}>Manage workspaces</button>
            </div>
            <div class="surface-tabs">
              <button data-surface="notes" class="${surface === 'notes' ? 'active' : ''}" ${disabled}>Notes</button>
              <button data-surface="files" class="${surface === 'files' ? 'active' : ''}" ${disabled}>Files</button>
              <button data-surface="categories" class="${surface === 'categories' ? 'active' : ''}" ${disabled}>Categories</button>
            </div>
            <div class="editor">${activeSurface}
              <details class="workspace-manager-panel" data-role="workspace-manager" ${this.workspaceManagerOpen ? 'open' : ''}>
                <summary>Manage GitHub workspaces</summary>
                <p class="hint">A workspace is a reusable repository, branch, Notes folder and Categories folder. Refresh Notes reads direct Markdown children from the Notes folder. Missing parent folders appear automatically with the first explicit Save GitHub; saving a workspace alone does not write remotely.</p>
                <div class="settings-grid">
                  <input type="hidden" data-workspace-field="id" value="${escapeHtml(editor.id || '')}">
                  <label class="field"><span>Workspace name</span><input data-workspace-field="name" placeholder="GDoc" value="${escapeHtml(editor.name || '')}" ${disabled}></label>
                  <label class="field"><span>Repository</span><input data-workspace-field="repositoryInput" placeholder="AlexPastukhh/gdoc or https://github.com/AlexPastukhh/gdoc" value="${escapeHtml(editor.repositoryInput || '')}" ${disabled}></label>
                  <label class="field"><span>Branch</span><input data-workspace-field="branch" placeholder="main" value="${escapeHtml(editor.branch || 'main')}" ${disabled}></label>
                  <label class="field"><span>Notes folder</span><input data-workspace-field="basePath" placeholder="prototype-fixtures/linked-notes" value="${escapeHtml(editor.basePath || 'prototype-fixtures/linked-notes')}" ${disabled}></label>
                  <label class="field"><span>Categories folder</span><input data-workspace-field="categoryBasePath" placeholder="categories" value="${escapeHtml(editor.categoryBasePath || 'categories')}" ${disabled}></label>
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
            ${pickerModal}
          </main>
        </section>`;

      this._positionLauncher();
      this._positionPanel();
      for (const dragHandle of this.shadow.querySelectorAll('[data-panel-drag-handle]')) {
        dragHandle.onpointerdown = (event) => this._beginPanelDrag(event);
      }
      const centerPanel = this.shadow.querySelector('[data-action="center-panel"]');
      if (centerPanel) centerPanel.onclick = () => this._centerPanel();
      const details = this.shadow.querySelector('[data-role="workspace-manager"]');
      if (details) details.ontoggle = () => { this.workspaceManagerOpen = details.open; };
      const title = this.shadow.querySelector('[data-role="title"]');
      const body = this.shadow.querySelector('[data-role="body"]');
      if (title) title.oninput = () => this._scheduleDraftPersist();
      if (body) body.oninput = () => this._scheduleDraftPersist();
      this.shadow.querySelectorAll('[data-workspace-field]').forEach((input) => {
        input.oninput = () => { this.workspaceEditorDirty = true; this._captureWorkspaceIntoState(); };
      });
      this.shadow.querySelectorAll('[data-role^="category-"]').forEach((input) => { input.oninput = () => { this.categoryEditorDirty = true; this._captureCategoryIntoState(); }; });
      this.shadow.querySelectorAll('[data-note-category-id]').forEach((input) => {
        input.onchange = () => {
          const draft = this._draftFromForm();
          if (draft) this.state.current = draft;
          const root = input.closest('.category-picker');
          const summary = root && root.querySelector('[data-category-summary]');
          if (summary) summary.textContent = `Categories · ${root.querySelectorAll('[data-note-category-id]:checked').length} selected`;
        };
      });
      this.shadow.querySelectorAll('[data-role="repository-file-name"], [data-role="repository-file-content"]').forEach((input) => { input.oninput = () => { this.fileEditorDirty = true; this._captureRepositoryEditorIntoState(); }; });
      this.shadow.querySelectorAll('[data-category-filter]').forEach((input) => {
        input.oninput = () => {
          const root = input.closest('.category-picker');
          const query = String(input.value || '').trim().toLowerCase();
          if (!root) return;
          root.querySelectorAll('[data-category-search-text]').forEach((row) => { row.hidden = Boolean(query && !String(row.dataset.categorySearchText || '').includes(query)); });
        };
      });
      this.shadow.querySelectorAll('[data-file-category-id]').forEach((input) => {
        input.onchange = () => {
          const ids = Array.from(this.shadow.querySelectorAll('[data-file-category-id]:checked')).map((item) => item.dataset.fileCategoryId);
          this.state.fileCategoryIds = ids;
          this.fileCategoryDirty = true;
          const root = input.closest('.category-picker');
          const summary = root && root.querySelector('[data-category-summary]');
          if (summary) summary.textContent = `Categories · ${ids.length} selected`;
        };
      });
      this.shadow.querySelectorAll('.category-picker[data-category-kind="note"]').forEach((details) => {
        details.ontoggle = () => { if (!details.open) this._persistDraftNow().catch(() => {}); };
      });

      const toggle = this.shadow.querySelector('[data-action="toggle"]');
      if (toggle) toggle.onclick = async () => { await this.persistAllDraftsNow(); if (!this.open) await this._call('onOpen'); this.open = !this.open; this.render(); };
      this.shadow.querySelectorAll('[data-action="close"]').forEach((close) => { close.onclick = async () => { await this.persistAllDraftsNow(); this.open = false; this.render(); }; });
      this.shadow.querySelectorAll('[data-surface]').forEach((button) => { button.onclick = () => this._withAllDrafts('onSetSurface', button.dataset.surface); });
      const create = this.shadow.querySelector('[data-action="new"]');
      if (create) create.onclick = () => this._withDraft('onNew');
      const search = this.shadow.querySelector('[data-role="search"]');
      if (search) search.onkeydown = (event) => { if (event.key === 'Enter') this._withDraft('onSearch', search.value); };
      this.shadow.querySelectorAll('[data-note-id]').forEach((button) => { button.onclick = () => this._withDraft('onSelect', button.dataset.noteId); });
      const workspaceSelect = this.shadow.querySelector('[data-role="workspace-select"]');
      if (workspaceSelect) workspaceSelect.onchange = () => this._withAllDrafts('onSelectWorkspace', workspaceSelect.value, this.workspaceDraftState());
      const refreshGitHub = this.shadow.querySelector('[data-action="refresh-github"]');
      if (refreshGitHub) refreshGitHub.onclick = () => this._withAllDrafts('onRefreshRemote');
      const manageWorkspaces = this.shadow.querySelector('[data-action="manage-workspaces"]');
      if (manageWorkspaces) manageWorkspaces.onclick = async () => { await this.persistAllDraftsNow(); this.workspaceManagerOpen = true; this.render(); const editorScroll = this.shadow.querySelector('.editor'); const manager = this.shadow.querySelector('[data-role="workspace-manager"]'); if (manager) { manager.open = true; if (editorScroll) editorScroll.scrollTop = Math.max(0, manager.offsetTop - 12); } };
      const newWorkspace = this.shadow.querySelector('[data-action="new-workspace"]');
      if (newWorkspace) newWorkspace.onclick = () => this._withAllDrafts('onNewWorkspace', this.workspaceDraftState());
      const saveWorkspace = this.shadow.querySelector('[data-action="save-workspace"]');
      if (saveWorkspace) saveWorkspace.onclick = () => this._withAllDrafts('onSaveWorkspace', this._workspaceFromForm());
      const setDefault = this.shadow.querySelector('[data-action="set-default-workspace"]');
      if (setDefault) setDefault.onclick = () => this._withAllDrafts('onSetDefaultWorkspace', this.state.activeWorkspaceId);
      const deleteWorkspace = this.shadow.querySelector('[data-action="delete-workspace"]');
      if (deleteWorkspace) deleteWorkspace.onclick = () => this._withAllDrafts('onDeleteWorkspace', this.state.activeWorkspaceId);
      const saveToken = this.shadow.querySelector('[data-action="save-token"]');
      if (saveToken) saveToken.onclick = async () => { await this.persistAllDraftsNow(); const token = this.shadow.querySelector('[data-role="shared-token"]'); return this._call('onSaveToken', token ? token.value : ''); };
      const clearToken = this.shadow.querySelector('[data-action="clear-token"]');
      if (clearToken) clearToken.onclick = () => this._withAllDrafts('onClearToken');
      const saveLocal = this.shadow.querySelector('[data-action="save-local"]');
      if (saveLocal) saveLocal.onclick = () => this._call('onSaveLocal', this._draftFromForm());
      const saveRemote = this.shadow.querySelector('[data-action="save-remote"]');
      if (saveRemote) saveRemote.onclick = () => this._call('onSaveRemote', this._draftFromForm());
      const imageInput = this.shadow.querySelector('[data-role="image-file"]');
      const insertImage = this.shadow.querySelector('[data-action="insert-image"]');
      if (insertImage && imageInput) insertImage.onclick = () => imageInput.click();
      if (imageInput) imageInput.onchange = () => { const file = imageInput.files && imageInput.files[0]; const editor = this.shadow.querySelector('[data-role="body"]'); if (file) this._call('onInsertImage', this._draftFromForm(), { file, cursorStart: editor ? editor.selectionStart : 0, cursorEnd: editor ? editor.selectionEnd : 0 }); imageInput.value = ''; };
      const bodyEditor = this.shadow.querySelector('[data-role="body"]');
      if (bodyEditor) bodyEditor.onpaste = (event) => { const items = Array.from(event.clipboardData && event.clipboardData.items || []); const image = items.find((item) => String(item.type || '').startsWith('image/')); if (!image) return; const file = image.getAsFile(); if (!file) return; event.preventDefault(); this._call('onInsertImage', this._draftFromForm(), { file, cursorStart: bodyEditor.selectionStart, cursorEnd: bodyEditor.selectionEnd }); };
      this.shadow.querySelectorAll('[data-remove-pending-image]').forEach((button) => { button.onclick = () => this._call('onRemovePendingImage', this._draftFromForm(), button.dataset.removePendingImage); });
      const transferMode = this.shadow.querySelector('[data-role="transfer-mode"]');
      const transferFileName = this.shadow.querySelector('[data-role="transfer-file-name"]');
      if (transferMode) transferMode.onchange = () => this._call('onUpdateTransferDraft', { mode: transferMode.value, fileName: transferFileName ? transferFileName.value : ((this.state.transferDraft || {}).fileName || 'copied-note.md') });
      if (transferFileName) transferFileName.onchange = () => this._call('onUpdateTransferDraft', { mode: transferMode ? transferMode.value : 'create', fileName: transferFileName.value });
      const chooseTransferTarget = this.shadow.querySelector('[data-action="choose-transfer-target"]');
      if (chooseTransferTarget) chooseTransferTarget.onclick = () => this._call('onOpenTargetPicker', { mode: 'transfer-target', transferMode: (this.state.transferDraft || {}).mode || 'create', fileName: transferFileName ? transferFileName.value : ((this.state.transferDraft || {}).fileName || 'copied-note.md') });
      const prepareTransfer = this.shadow.querySelector('[data-action="prepare-transfer"]');
      if (prepareTransfer) prepareTransfer.onclick = () => this._call('onPrepareTransfer', this._draftFromForm(), this.state.transferDraft || {});
      const executeTransfer = this.shadow.querySelector('[data-action="execute-transfer"]');
      if (executeTransfer) executeTransfer.onclick = () => this._call('onExecuteTransfer', this._draftFromForm());
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
      if (add) add.onclick = () => { const type = this.shadow.querySelector('[data-role="link-type"]').value; const target = this.shadow.querySelector('[data-role="link-target"]').value.trim(); const label = this.shadow.querySelector('[data-role="link-label"]').value; this._call('onAddLink', this._draftFromForm(), { type, target, label }); };
      this.shadow.querySelectorAll('[data-remove-link]').forEach((button) => { button.onclick = () => this._call('onRemoveLink', this._draftFromForm(), button.dataset.removeLink); });
      this.shadow.querySelectorAll('[data-resolve-link]').forEach((button) => { button.onclick = () => this._call('onResolveLink', this._draftFromForm(), button.dataset.resolveLink); });
      this.shadow.querySelectorAll('[data-open-link]').forEach((button) => { button.onclick = () => this._withDraft('onOpenLink', button.dataset.openLink); });
      this.shadow.querySelectorAll('[data-action="browse-root"]').forEach((button) => { button.onclick = () => this._withAllDrafts('onBrowseRepository', ''); });
      this.shadow.querySelectorAll('[data-action="browse-up"]').forEach((button) => { button.onclick = () => { const path = String(this.state.repositoryPath || ''); const next = path.includes('/') ? path.slice(0, path.lastIndexOf('/')) : ''; return this._withAllDrafts('onBrowseRepository', next); }; });
      this.shadow.querySelectorAll('[data-action="refresh-folder"]').forEach((button) => { button.onclick = () => this._withAllDrafts('onBrowseRepository', this.state.repositoryPath || ''); });
      this.shadow.querySelectorAll('[data-action="new-repository-file"]').forEach((button) => { button.onclick = () => this._withAllDrafts('onBeginRepositoryFileCreate'); });
      this.shadow.querySelectorAll('[data-action="new-repository-folder"]').forEach((button) => { button.onclick = () => this._withAllDrafts('onBeginRepositoryFolderCreate'); });
      this.shadow.querySelectorAll('[data-action="edit-repository-file"]').forEach((button) => { button.onclick = () => this._withAllDrafts('onBeginRepositoryFileEdit'); });
      this.shadow.querySelectorAll('[data-action="cancel-repository-editor"]').forEach((button) => { button.onclick = () => this._call('onCancelRepositoryEditor'); });
      this.shadow.querySelectorAll('[data-action="save-repository-editor"]').forEach((button) => { button.onclick = () => this._call('onSaveRepositoryEditor', this._repositoryEditorFromForm()); });
      this.shadow.querySelectorAll('[data-action="apply-file-categories"]').forEach((button) => { button.onclick = () => { const ids = Array.from(this.shadow.querySelectorAll('[data-file-category-id]:checked')).map((item) => item.dataset.fileCategoryId); this.state.fileCategoryIds = ids; return this._call('onApplyFileCategories', preview && preview.path, ids); }; });
      this.shadow.querySelectorAll('[data-copy-repository-heading-link]').forEach((button) => { button.onclick = async () => { const index = Number(button.dataset.copyRepositoryHeadingLink); const item = repositoryHeadingLinks[index]; const root = button.closest('.heading-link-picker'); const status = root && root.querySelector('[data-heading-copy-status]'); try { if (!item || !item.markdown) throw new Error('Heading link is unavailable.'); await this._call('onCopyRepositoryHeadingLink', item); if (status) status.textContent = `Copied: ${item.target}`; button.textContent = 'Copied'; } catch (error) { if (status) status.textContent = `Copy failed: ${String(error && error.message || error)}`; } }; });
      this.shadow.querySelectorAll('[data-browse-path]').forEach((button) => { button.onclick = () => this._withAllDrafts('onBrowseRepository', button.dataset.browsePath); });
      this.shadow.querySelectorAll('[data-repository-entry]').forEach((button) => { button.onclick = () => this._withAllDrafts('onOpenRepositoryEntry', {
        path: button.dataset.repositoryEntry,
        type: button.dataset.entryType,
        name: button.querySelector('strong') ? button.querySelector('strong').textContent.replace(/^[📁📄]\s*/, '').trim() : button.textContent.trim(),
        size: Number(button.dataset.entrySize || 0),
        sha: button.dataset.entrySha || '',
        htmlUrl: button.dataset.entryHtmlUrl || ''
      }); });
      const openGitHub = this.shadow.querySelector('[data-action="open-file-github"]');
      if (openGitHub) openGitHub.onclick = () => this._call('onOpenRepositoryFileInGitHub', preview && preview.path);
      this.shadow.querySelectorAll('[data-action="refresh-categories"]').forEach((button) => { button.onclick = () => this._withAllDrafts('onRefreshCategories'); });
      this.shadow.querySelectorAll('[data-action="new-category"]').forEach((button) => { button.onclick = () => this._call('onSelectCategory', ''); });
      this.shadow.querySelectorAll('[data-category-id]').forEach((button) => { button.onclick = () => this._call('onSelectCategory', button.dataset.categoryId); });
      const categoryFromForm = () => this._categoryFromForm();
      const saveCategory = this.shadow.querySelector('[data-action="save-category"]');
      if (saveCategory) saveCategory.onclick = () => this._call('onSaveCategory', categoryFromForm());
      const saveCategoryGroup = this.shadow.querySelector('[data-action="save-category-group"]');
      if (saveCategoryGroup) saveCategoryGroup.onclick = () => { const category = categoryFromForm(); return this._call('onSetCategoryGroup', category.id, category.group); };
      const assignPreview = this.shadow.querySelector('[data-action="assign-preview-category"]');
      if (assignPreview) assignPreview.onclick = () => this._call('onAssignCategory', categoryEditor.id, preview && preview.path);
      this.shadow.querySelectorAll('[data-note-view]').forEach((button) => { button.onclick = () => this._call('onSetNoteViewMode', button.dataset.noteView, this._draftFromForm()); });
      this.shadow.querySelectorAll('[data-file-view]').forEach((button) => { button.onclick = () => this._call('onSetFileViewMode', button.dataset.fileView); });
      const chooseNoteLinks = this.shadow.querySelector('[data-action="choose-note-links"]');
      if (chooseNoteLinks) chooseNoteLinks.onclick = () => { const editor = this.shadow.querySelector('[data-role="body"]'); return this._call('onOpenTargetPicker', { mode: 'note-link', cursorStart: editor ? editor.selectionStart : 0, cursorEnd: editor ? editor.selectionEnd : 0 }); };
      const chooseCategoryTargets = this.shadow.querySelector('[data-action="choose-category-targets"]');
      if (chooseCategoryTargets) chooseCategoryTargets.onclick = () => this._call('onOpenTargetPicker', { mode: 'category-members', initialTargets: this._categoryFromForm().selectedTargets || [] });
      this.shadow.querySelectorAll('[data-dismiss-feedback]').forEach((button) => { button.onclick = () => this._call('onDismissFeedback', button.dataset.dismissFeedback); });
      this.shadow.querySelectorAll('[data-feedback-action]').forEach((button) => { button.onclick = () => this._call('onFeedbackAction', button.dataset.feedbackAction); });
      this.shadow.querySelectorAll('[data-note-backlink]').forEach((button) => { button.onclick = () => this._withDraft('onSelect', button.dataset.noteBacklink); });
      this.shadow.querySelectorAll('[data-category-note-open]').forEach((button) => { button.onclick = () => this._withDraft('onSelect', button.dataset.categoryNoteOpen); });
      const removeCategoryTarget = (identity) => {
        const editorState = this._categoryFromForm();
        editorState.selectedTargets = (editorState.selectedTargets || []).filter((target) => `${target.type}:${target.type === 'note' ? (target.noteId || target.path) : target.path}` !== identity);
        this.categoryEditorDirty = true;
        this.state.categoryEditor = editorState;
        this.render();
      };
      this.shadow.querySelectorAll('[data-category-draft-remove]').forEach((button) => { button.onclick = () => removeCategoryTarget(button.dataset.categoryDraftRemove); });
      this.shadow.querySelectorAll('[data-category-target-remove]').forEach((button) => { button.onclick = () => removeCategoryTarget(button.dataset.categoryTargetRemove); });
      this.shadow.querySelectorAll('[data-action="close-target-picker"]').forEach((button) => { button.onclick = () => this._call('onCloseTargetPicker'); });
      const pickerSearch = this.shadow.querySelector('[data-action="picker-search"]');
      if (pickerSearch) pickerSearch.onclick = () => this._call('onSearchTargetPicker', (this.shadow.querySelector('[data-role="picker-query"]') || {}).value || '', (this.shadow.querySelector('[data-role="picker-depth"]') || {}).value || '2');
      this.shadow.querySelectorAll('[data-picker-dir]').forEach((button) => { button.onclick = () => this._call('onBrowseTargetPicker', button.dataset.pickerDir); });
      this.shadow.querySelectorAll('[data-picker-target]').forEach((input) => { input.onchange = () => this._call('onToggleTargetPicker', input.dataset.pickerNoteId ? { type: 'note', noteId: input.dataset.pickerNoteId, path: input.dataset.pickerPath, name: input.dataset.pickerName } : { type: 'file', path: input.dataset.pickerPath, name: input.dataset.pickerName }); });
      this.shadow.querySelectorAll('[data-picker-remove]').forEach((button) => { button.onclick = () => { const identity = button.dataset.pickerRemove; const target = (this.state.targetPicker.selected || []).find((item) => `${item.type}:${item.type === 'note' ? (item.noteId || item.path) : item.path}` === identity); if (target) this._call('onToggleTargetPicker', target); }; });
      const applyPicker = this.shadow.querySelector('[data-action="apply-target-picker"]');
      if (applyPicker) applyPicker.onclick = () => { const fileName = this.shadow.querySelector('[data-role="picker-file-name"]'); return this._call('onApplyTargetPicker', { fileName: fileName ? fileName.value : '' }); };
      this.shadow.querySelectorAll('[data-picker-tab]').forEach((button) => { button.onclick = () => this._call('onSetTargetPickerTab', button.dataset.pickerTab); });
      const renderedState = surface === 'files' ? this.state.fileRendered : this.state.noteRendered;
      if (renderedState) {
        const imageById = new Map((renderedState.imageResults || []).map((item) => [item.id, item]));
        this.shadow.querySelectorAll('[data-obs-image-id]').forEach((image) => {
          const result = imageById.get(image.dataset.obsImageId);
          if (result && result.status === 'loaded') { image.src = result.objectUrl; image.classList.remove('obs-md-image-pending'); }
          else if (result) { image.alt = `${image.alt || 'Image'} — ${result.message || result.status}`; image.title = result.message || result.status; }
        });
        this.shadow.querySelectorAll('[data-obs-link-target]').forEach((link) => { link.onclick = (event) => { event.preventDefault(); this._call('onOpenRenderedLink', link.dataset.obsLinkTarget, renderedState.source || {}); }; });
      }
      this.shadow.querySelectorAll('[data-category-file-open]').forEach((button) => { button.onclick = () => this._withAllDrafts('onOpenRepositoryEntry', { path: button.dataset.categoryFileOpen, type: 'file' }); });
      this.shadow.querySelectorAll('[data-category-file-remove]').forEach((button) => { button.onclick = () => this._call('onUnassignCategory', categoryEditor.id, button.dataset.categoryFileRemove); });
    }

  }

  return {
    LinkedNotesUI,
    escapeHtml,
    launcherRightOffset,
    panelViewportLayout,
    clampPanelPosition,
    shouldCloseOnEscape,
    blankWorkspaceEditor,
    mergeWorkspaceEditorPatch,
    mergeCategoryEditorPatch,
    mergeRepositoryEditorPatch,
    mergeVisibleCategorySelection
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
      this.clipboardWriter = options.clipboardWriter || ((text) => {
        const writer = this.api && this.api.writeTampermonkeyClipboardText;
        if (typeof writer !== 'function') return Promise.reject(new Error('Clipboard writer is unavailable.'));
        return writer(text);
      });
      this.confirmAction = options.confirmAction || ((message) => (typeof window !== 'undefined' && typeof window.confirm === 'function' ? window.confirm(message) : false));
      this.locationProvider = options.locationProvider || (() => (typeof location !== 'undefined' ? location : { pathname: '' }));
      this.setIntervalFn = options.setIntervalFn || ((fn, ms) => setInterval(fn, ms));
      this.clearIntervalFn = options.clearIntervalFn || ((id) => clearInterval(id));
      this.routePollMs = options.routePollMs || 750;
      this.store = options.store || new api.IndexedDbNoteStore();
      this.pendingAssetStore = options.pendingAssetStore || (api.PendingNoteAssetStore ? new api.PendingNoteAssetStore() : null);
      this.workspaceStore = options.workspaceStore || (api.WorkspaceStore ? new api.WorkspaceStore({ api, getValue: this.getValue, setValue: this.setValue }) : null);
      this.categoryStore = options.categoryStore || (api.CategoryCacheStore ? new api.CategoryCacheStore({ getValue: this.getValue, setValue: this.setValue }) : null);
      this.ui = options.ui || new api.LinkedNotesUI({
        onNew: () => this.newNote(),
        onSelect: (id) => this.selectNote(id),
        onSearch: (query) => this.refreshList(query),
        onDraftChange: (note) => this.saveDraft(note),
        onOpen: () => this.openPanel(),
        onRefreshRemote: () => this.refreshRemoteWorkspace(),
        onSetSurface: (surface) => this.setSurface(surface),
        onBrowseRepository: (path) => this.browseRepository(path),
        onOpenRepositoryEntry: (entry) => this.openRepositoryEntry(entry),
        onOpenRepositoryFileInGitHub: (path) => this.openRepositoryFileInGitHub(path),
        onBeginRepositoryFileCreate: () => this.beginRepositoryFileCreate(),
        onBeginRepositoryFolderCreate: () => this.beginRepositoryFolderCreate(),
        onBeginRepositoryFileEdit: () => this.beginRepositoryFileEdit(),
        onCancelRepositoryEditor: () => this.cancelRepositoryEditor(),
        onSaveRepositoryEditor: (input) => this.saveRepositoryEditor(input),
        onApplyFileCategories: (path, ids) => this.applyFileCategories(path, ids),
        onCopyRepositoryHeadingLink: (item) => {
          const markdown = item && item.markdown ? String(item.markdown) : '';
          if (!markdown) return Promise.reject(new Error('Heading link is unavailable.'));
          return this.clipboardWriter(markdown);
        },
        onRefreshCategories: () => this.refreshCategories(),
        onSelectCategory: (id) => this.selectCategory(id),
        onSaveCategory: (category) => this.saveCategory(category),
        onAssignCategory: (categoryId, path) => this.assignCategory(categoryId, path),
        onUnassignCategory: (categoryId, path) => this.unassignCategory(categoryId, path),
        onSetCategoryGroup: (categoryId, groupName) => this.setCategoryGroup(categoryId, groupName),
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
        onOpenLink: (linkId) => this.openLink(linkId),
        onSetNoteViewMode: (mode, note) => this.setNoteViewMode(mode, note),
        onSetFileViewMode: (mode) => this.setFileViewMode(mode),
        onOpenRenderedLink: (target, source) => this.openRenderedLink(target, source),
        onOpenTargetPicker: (request) => this.openTargetPicker(request),
        onCloseTargetPicker: () => this.closeTargetPicker(),
        onSetTargetPickerTab: (tab) => this.setTargetPickerTab(tab),
        onBrowseTargetPicker: (path) => this.browseTargetPicker(path),
        onSearchTargetPicker: (query, depth) => this.searchTargetPicker(query, depth),
        onToggleTargetPicker: (target) => this.toggleTargetPickerTarget(target),
        onApplyTargetPicker: (input) => this.applyTargetPicker(input),
        onSetNoteCategories: (note, ids) => this.setNoteCategoryIntent(note, ids),
        onInsertImage: (note, input) => this.insertNoteImage(note, input),
        onRemovePendingImage: (note, assetId) => this.removePendingNoteImage(note, assetId),
        onUpdateTransferDraft: (input) => this.updateTransferDraft(input),
        onPrepareTransfer: (note, input) => this.prepareTransfer(note, input),
        onExecuteTransfer: (note) => this.executePreparedTransfer(note),
        onTransferNote: (note, input) => this.transferNoteToMarkdown(note, input),
        onDismissFeedback: (id) => this.dismissFeedback(id),
        onFeedbackAction: (id) => this.runFeedbackAction(id)
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
      this.surface = 'notes';
      this.repositoryPath = '';
      this.repositoryEntries = [];
      this.repositoryPreview = null;
      this.repositoryBrowseLoaded = false;
      this.repositoryEditor = { mode: 'none', parentPath: '', path: '', name: '', content: '', baseSha: '' };
      this.fileCategoryDraftIds = [];
      this.categorySnapshot = { definitions: [], diagnostics: [], fileValidation: {}, noteValidation: {}, groups: {}, refreshedAt: '' };
      this.categoryIndex = this._emptyCategoryIndex();
      this.selectedCategoryId = '';
      this.categoryContextWorkspaceId = '';
      this.categoryContextKey = '';
      this.categoryContextRequiresRefresh = false;
      this.categoryContextsRequiringRefresh = new Set();
      this.workspaceContextGeneration = 0;
      this.noteRelationIndex = this.api.buildNoteRelationIndex ? this.api.buildNoteRelationIndex([]) : null;
      this.noteViewMode = 'edit';
      this.fileViewMode = 'rendered';
      this.noteRendered = null;
      this.fileRendered = null;
      this.mediaLoaders = { note: null, file: null };
      this.feedback = [];
      this.targetPicker = { open: false, mode: '', tab: 'files', query: '', depth: '2', currentPath: '', entries: [], fileResults: [], noteResults: [], selected: [], truncated: false, summary: '', cursorStart: 0, cursorEnd: 0 };
      this.categoryDraftTargets = [];
      this.pendingAssets = [];
      this.transferDraft = { targetPath: '', targetDirectory: '', fileName: 'copied-note.md', mode: 'create', plan: null };
      this.transferPlan = null;
      this.transferRetry = null;
      this.noteMarkdownRetry = null;
      this.feedbackActionHandlers = new Map();
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


    _categoryContextKey(workspace = this._activeWorkspace()) {
      if (!workspace) return '';
      if (typeof this.api.workspaceCategoryContextKey === 'function') return this.api.workspaceCategoryContextKey(workspace);
      return JSON.stringify([workspace.id, String(workspace.owner || '').toLowerCase(), String(workspace.repo || '').toLowerCase(), workspace.branch || 'main', workspace.categoryBasePath || this.api.DEFAULT_CATEGORY_BASE_PATH || 'categories']);
    }

    _workspaceRuntimeContextKey(workspace = this._activeWorkspace()) {
      if (!workspace) return '';
      return JSON.stringify([
        String(workspace.id || '').trim(),
        String(workspace.owner || '').trim().toLowerCase(),
        String(workspace.repo || '').trim().replace(/\.git$/i, '').toLowerCase(),
        String(workspace.branch || 'main').trim() || 'main',
        String(workspace.basePath || '').trim(),
        String(workspace.categoryBasePath || this.api.DEFAULT_CATEGORY_BASE_PATH || 'categories').trim()
      ]);
    }

    _sameRepositoryContext(left, right) {
      if (typeof this.api.sameRepositoryContext === 'function') return this.api.sameRepositoryContext(left, right);
      if (!left || !right) return false;
      return String(left.owner || '').toLowerCase() === String(right.owner || '').toLowerCase()
        && String(left.repo || '').replace(/\.git$/i, '').toLowerCase() === String(right.repo || '').replace(/\.git$/i, '').toLowerCase()
        && String(left.branch || 'main') === String(right.branch || 'main');
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
      if (!workspace) return {
        id: '', name: '', repositoryInput: '', branch: 'main',
        basePath: this.api.DEFAULT_WORKSPACE_BASE_PATH || 'prototype-fixtures/linked-notes',
        categoryBasePath: this.api.DEFAULT_CATEGORY_BASE_PATH || 'categories'
      };
      return {
        id: workspace.id,
        name: workspace.name,
        repositoryInput: `${workspace.owner}/${workspace.repo}`,
        branch: workspace.branch,
        basePath: workspace.basePath,
        categoryBasePath: workspace.categoryBasePath || this.api.DEFAULT_CATEGORY_BASE_PATH || 'categories'
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


    _categoryUiState() {
      const categories = this.categoryIndex && this.categoryIndex.categories
        ? Array.from(this.categoryIndex.categories.values()).map((category) => ({
          id: category.id,
          name: category.name,
          description: category.description || '',
          path: category.path,
          sha: category.sha || '',
          htmlUrl: category.htmlUrl || '',
          explicitFileCount: (category.explicitFiles || []).length,
          explicitNoteCount: (category.explicitNotes || []).length,
          impliedCategoryIds: category.impliedCategoryIds || [],
          brokenLinks: category.brokenLinks || [],
          group: this.categorySnapshot.groups && this.categorySnapshot.groups[category.id] || ''
        })).sort((left, right) => left.name.localeCompare(right.name))
        : [];
      const selected = categories.find((category) => category.id === this.selectedCategoryId) || null;
      const selectedRecord = selected && this.categoryIndex.categories ? this.categoryIndex.categories.get(selected.id) : null;
      const activeWorkspace = this._activeWorkspace();
      const previewContext = this.repositoryPreview && this.repositoryPreview.context;
      const categoryAssignmentAllowed = Boolean(
        selected
        && this.repositoryPreview
        && this.repositoryPreview.path
        && activeWorkspace
        && this._sameRepositoryContext(previewContext, activeWorkspace)
        && this.categoryContextKey
        && this.categoryContextKey === this._categoryContextKey(activeWorkspace)
        && !this.categoryContextRequiresRefresh
      );
      const indexedSelectedTargets = selectedRecord ? [
        ...(selectedRecord.explicitFiles || []).map((item) => ({ type: 'file', path: item.path, name: item.label || item.path, label: item.label || item.path })),
        ...(selectedRecord.explicitNotes || []).map((item) => ({ type: 'note', path: item.path, noteId: item.noteId || '', name: item.label || item.path, label: item.label || item.path }))
      ] : [];
      const selectedTargets = [...this.categoryDraftTargets];
      const noteCategoryIds = this.current
        ? (this.api.normalizeCategoryIds ? this.api.normalizeCategoryIds(this.current.categoryIds) : (this.current.categoryIds || []))
        : [];
      const backlinks = this.current && this.noteRelationIndex && this.noteRelationIndex.incomingForNote
        ? this.noteRelationIndex.incomingForNote(this.current.id)
        : [];
      const filePreviewSameWorkspace = Boolean(
        this.repositoryPreview
        && this.repositoryPreview.path
        && activeWorkspace
        && this._sameRepositoryContext(this.repositoryPreview.context, activeWorkspace)
      );
      const fileEditAllowed = Boolean(filePreviewSameWorkspace && this.repositoryPreview.kind === 'text');
      const fileCategoryAssignmentAllowed = Boolean(
        filePreviewSameWorkspace
        && this.categoryContextKey
        && this.categoryContextKey === this._categoryContextKey(activeWorkspace)
        && !this.categoryContextRequiresRefresh
      );
      return {
        surface: this.surface,
        repositoryPath: this.repositoryPath,
        repositoryEntries: this.repositoryEntries,
        repositoryBreadcrumbs: this.api.repositoryBreadcrumbs ? this.api.repositoryBreadcrumbs(this.repositoryPath) : [],
        repositoryPreview: this.repositoryPreview,
        repositoryEditor: this.repositoryEditor,
        fileCategoryIds: this.fileCategoryDraftIds,
        fileEditAllowed,
        fileCategoryAssignmentAllowed,
        fileViewMode: this.fileViewMode,
        fileRendered: this.fileRendered,
        noteViewMode: this.noteViewMode,
        noteRendered: this.noteRendered,
        feedback: this.feedback,
        targetPicker: this.targetPicker,
        categories,
        noteCategoryIds,
        noteBacklinks: backlinks,
        selectedCategoryId: selected ? selected.id : '',
        categoryEditor: selected ? {
          id: selected.id,
          name: selected.name,
          description: selected.description,
          impliedCategoryIds: selected.impliedCategoryIds,
          group: selected.group,
          selectedTargets
        } : { id: '', name: '', description: '', impliedCategoryIds: [], group: '', selectedTargets: [] },
        categoryFiles: selectedRecord && this.categoryIndex.filesForCategory ? this.categoryIndex.filesForCategory(selected.id) : [],
        categoryNotes: selectedRecord && this.categoryIndex.notesForCategory ? this.categoryIndex.notesForCategory(selected.id) : [],
        categoryErrors: [
          ...(Array.isArray(this.categorySnapshot.diagnostics) ? this.categorySnapshot.diagnostics : []),
          ...(this.categoryIndex && Array.isArray(this.categoryIndex.errors) ? this.categoryIndex.errors : [])
        ],
        categoryRefreshedAt: this.categorySnapshot.refreshedAt || '',
        categoryAssignmentAllowed,
        pendingAssets: this.pendingAssets,
        transferDraft: this.transferDraft
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

    _feedbackScope() {
      return this.surface === 'files' ? 'files' : this.surface === 'categories' ? 'categories' : 'notes';
    }

    _pushFeedback(feedback) {
      const item = this.api.createFeedback ? this.api.createFeedback(feedback) : { id: feedback.id || `feedback-${Date.now()}`, scope: feedback.scope || this._feedbackScope(), severity: feedback.severity || 'error', title: feedback.title || 'Status', message: feedback.message || '', target: feedback.target || '', details: feedback.details || '', actions: feedback.actions || [], partialResults: feedback.partialResults || [], dismissible: true };
      this.feedback = this.api.replaceFeedback ? this.api.replaceFeedback(this.feedback, item) : [...this.feedback.filter((existing) => existing.id !== item.id), item];
      return item;
    }

    dismissFeedback(id) {
      const item = this.feedback.find((feedback) => feedback && feedback.id === id);
      for (const action of item && Array.isArray(item.actions) ? item.actions : []) this.feedbackActionHandlers.delete(action.id);
      this.feedback = this.api.dismissFeedback ? this.api.dismissFeedback(this.feedback, id) : this.feedback.filter((feedback) => feedback.id !== id);
      this._setUi();
    }

    _feedbackAction(id, label, handler) {
      const actionId = String(id || '').trim();
      if (!actionId || typeof handler !== 'function') throw new Error('A feedback action requires an ID and handler.');
      this.feedbackActionHandlers.set(actionId, handler);
      return { id: actionId, label: String(label || 'Retry') };
    }

    _attachFeedbackActions(error, actions = []) {
      if (!error || typeof error !== 'object') return error;
      error.feedbackActions = actions.filter(Boolean);
      return error;
    }

    async runFeedbackAction(id) {
      const actionId = String(id || '').trim();
      const handler = this.feedbackActionHandlers.get(actionId);
      if (!handler) throw new Error(`Feedback action is no longer available: ${actionId || 'unknown'}.`);
      return handler();
    }

    _feedbackFromError(error, input = {}) {
      const item = this.api.feedbackFromError
        ? this.api.feedbackFromError(error, { scope: input.scope || this._feedbackScope(), ...input })
        : { id: input.id || 'last-error', scope: input.scope || this._feedbackScope(), severity: 'error', title: input.title || 'Action failed', message: String(error && error.message || error), target: input.target || '', details: String(error && error.kind || ''), actions: input.actions || [], partialResults: error && error.partialResults || [] };
      this._pushFeedback(item);
      this._setUi({ status: `Error: ${item.message}` });
      return item;
    }

    _disposeMediaLoader(kind) {
      const key = kind === 'file' ? 'file' : 'note';
      const loader = this.mediaLoaders && this.mediaLoaders[key];
      if (loader && typeof loader.dispose === 'function') loader.dispose();
      if (!this.mediaLoaders) this.mediaLoaders = { note: null, file: null };
      this.mediaLoaders[key] = null;
    }

    _disposeAllMediaLoaders() {
      this._disposeMediaLoader('note');
      this._disposeMediaLoader('file');
    }

    _setUi(patch = {}) {
      this.ui.setState({ ...this._workspaceUiState(), ...this._remoteUiState(), ...this._categoryUiState(), ...patch });
    }

    async _runRemoteOperation(label, work) {
      if (this.remoteOperation) throw new Error(`Remote operation already in progress: ${this.remoteOperation}`);
      this.remoteOperation = label;
      this._setUi({ busy: true, status: label });
      try { return await work(); }
      catch (error) {
        this._feedbackFromError(error, { id: `operation-${this._feedbackScope()}`, scope: this._feedbackScope(), title: label.replace(/…$/, '') || 'Remote action failed' });
        throw error;
      }
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

    async refreshWorkspaceState(status, options = {}) {
      if (!this.workspaceStore) return this.workspaceState;
      const previousRuntimeContextKey = this._workspaceRuntimeContextKey(this._activeWorkspace());
      this.workspaceState = await this.workspaceStore.load();
      await this._chooseWorkspaceForCurrentChat();
      const nextRuntimeContextKey = this._workspaceRuntimeContextKey(this._activeWorkspace());
      await this._loadCategoryCache({
        preserveRepositoryState: Boolean(options.preserveRepositoryState && previousRuntimeContextKey && previousRuntimeContextKey === nextRuntimeContextKey)
      });
      this._setUi({ status: status || 'Workspace and category context refreshed from Tampermonkey storage.' });
      return this.workspaceState;
    }


    _emptyCategoryIndex() {
      return this.api.buildRepositoryCategoryIndex
        ? this.api.buildRepositoryCategoryIndex([])
        : { categories: new Map(), filesForCategory: () => [], notesForCategory: () => [], explicitCategoryIdsForTarget: () => [], errors: [] };
    }

    _resetWorkspaceDerivedContext(options = {}) {
      if (!options.preserveRepositoryState) {
        this._disposeMediaLoader('file');
        this.fileRendered = null;
      }
      if (options.disposeNoteMedia) {
        this._disposeMediaLoader('note');
        this.noteRendered = null;
      }
      if (!options.preserveRepositoryState) {
        this.repositoryPath = '';
        this.repositoryEntries = [];
        this.repositoryPreview = null;
        this.repositoryBrowseLoaded = false;
        this.repositoryEditor = { mode: 'none', parentPath: '', path: '', name: '', content: '', baseSha: '' };
        this.fileCategoryDraftIds = [];
      }
      this.categorySnapshot = { definitions: [], diagnostics: [], fileValidation: {}, noteValidation: {}, groups: {}, refreshedAt: '' };
      this.categoryIndex = this._emptyCategoryIndex();
      this.selectedCategoryId = '';
      this.categoryContextWorkspaceId = '';
      this.categoryContextKey = '';
      this.transferPlan = null;
      this.transferRetry = null;
      this.noteMarkdownRetry = null;
      this.transferDraft = { ...this.transferDraft, targetPath: '', plan: null };
    }

    async _loadCategoryCache(options = {}) {
      const workspace = this._activeWorkspace();
      const contextKey = this._categoryContextKey(workspace);
      const previousWorkspaceId = this.categoryContextWorkspaceId;
      const previousContextKey = this.categoryContextKey;
      const targetChangedInPlace = Boolean(workspace && previousWorkspaceId === workspace.id && previousContextKey && previousContextKey !== contextKey);
      const workspaceContextChanged = Boolean(previousContextKey && previousContextKey !== contextKey)
        || Boolean(previousWorkspaceId && previousWorkspaceId !== (workspace ? workspace.id : ''));
      const preserveRepositoryState = Boolean(
        options.preserveRepositoryState
        && workspace
        && previousWorkspaceId === workspace.id
        && previousContextKey === contextKey
        && !workspaceContextChanged
      );
      if (targetChangedInPlace) this.categoryContextsRequiringRefresh.add(contextKey);
      const generation = ++this.workspaceContextGeneration;
      this._resetWorkspaceDerivedContext({ disposeNoteMedia: workspaceContextChanged, preserveRepositoryState });
      this.categoryContextRequiresRefresh = Boolean(contextKey && this.categoryContextsRequiringRefresh.has(contextKey));
      this._setUi({ categoryRefreshSummary: '' });
      if (!workspace || !this.categoryStore) {
        if (!workspace) this.categoryContextRequiresRefresh = false;
        this.categoryContextWorkspaceId = workspace ? workspace.id : '';
        this.categoryContextKey = contextKey;
        return this.categorySnapshot;
      }
      const snapshot = await this.categoryStore.load(contextKey, targetChangedInPlace ? {} : { legacyWorkspaceId: workspace.id });
      const currentWorkspace = this._activeWorkspace();
      if (generation !== this.workspaceContextGeneration || !currentWorkspace || this._categoryContextKey(currentWorkspace) !== contextKey) return null;
      this.categorySnapshot = {
        definitions: Array.isArray(snapshot.definitions) ? snapshot.definitions : [],
        diagnostics: Array.isArray(snapshot.diagnostics) ? snapshot.diagnostics : [],
        fileValidation: snapshot.fileValidation && typeof snapshot.fileValidation === 'object' ? snapshot.fileValidation : {},
        noteValidation: snapshot.noteValidation && typeof snapshot.noteValidation === 'object' ? snapshot.noteValidation : {},
        groups: snapshot.groups && typeof snapshot.groups === 'object' ? snapshot.groups : {},
        refreshedAt: String(snapshot.refreshedAt || '')
      };
      this.categoryIndex = this.api.buildRepositoryCategoryIndex
        ? this.api.buildRepositoryCategoryIndex(this.categorySnapshot.definitions, { fileValidation: this.categorySnapshot.fileValidation, noteValidation: this.categorySnapshot.noteValidation })
        : this._emptyCategoryIndex();
      if (preserveRepositoryState && this.repositoryPreview && this.repositoryPreview.path && this._sameRepositoryContext(this.repositoryPreview.context, workspace) && this.categoryIndex.explicitCategoryIdsForTarget) {
        this.fileCategoryDraftIds = this.categoryIndex.explicitCategoryIdsForTarget('file', this.repositoryPreview.path);
      }
      this.categoryContextWorkspaceId = workspace.id;
      this.categoryContextKey = contextKey;
      return this.categorySnapshot;
    }

    _requireCategoryContext(workspace = this._activeWorkspace()) {
      if (!workspace) throw new Error('Select or create a GitHub workspace first.');
      const contextKey = this._categoryContextKey(workspace);
      if (this.categoryContextRequiresRefresh || !this.categoryContextWorkspaceId || this.categoryContextWorkspaceId !== workspace.id || this.activeWorkspaceId !== workspace.id || !this.categoryContextKey || this.categoryContextKey !== contextKey) {
        throw new Error('Category context is stale for the active repository target. Refresh categories before writing.');
      }
      return workspace;
    }

    async openPanel() {
      await this.refreshWorkspaceState('Workspace and category context refreshed when Documentation Workspace opened.', { preserveRepositoryState: true });
      this._setUi();
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
      await this._loadCategoryCache();
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
      await this._loadPendingAssets(this.current);
      await this._loadCategoryCache();
      this._setUi({ replaceWorkspaceEditor: true, status: this._activeWorkspace() ? 'Documentation Workspace ready. Remote reads and writes remain explicit.' : 'Local Notes ready. Create a GitHub workspace before remote access.' });
      this._startRouteWatch();
    }

    dispose() {
      if (this.routeTimer) this.clearIntervalFn(this.routeTimer);
      this.routeTimer = null;
      this.surface = 'notes';
      this.repositoryPath = '';
      this.repositoryEntries = [];
      this.repositoryPreview = null;
      this.repositoryBrowseLoaded = false;
      this.repositoryEditor = { mode: 'none', parentPath: '', path: '', name: '', content: '', baseSha: '' };
      this.fileCategoryDraftIds = [];
      this.categorySnapshot = { definitions: [], diagnostics: [], fileValidation: {}, noteValidation: {}, groups: {}, refreshedAt: '' };
      this.categoryIndex = this.api.buildRepositoryCategoryIndex ? this.api.buildRepositoryCategoryIndex([]) : { categories: new Map(), filesForCategory: () => [], notesForCategory: () => [], errors: [] };
      this.selectedCategoryId = '';
      this.categoryContextWorkspaceId = '';
      this.categoryContextKey = '';
      this.categoryContextRequiresRefresh = false;
      this.categoryContextsRequiringRefresh.clear();
      this._disposeAllMediaLoaders();
      this.noteRendered = null;
      this.fileRendered = null;
      this.pendingAssets = [];
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
      await this._loadCategoryCache();
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
      await this._loadCategoryCache();
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
      await this._loadCategoryCache();
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


    async setSurface(surface) {
      const allowed = new Set(['notes', 'files', 'categories']);
      const next = String(surface || 'notes');
      if (!allowed.has(next)) throw new Error(`Unsupported workspace surface: ${next}`);
      this.surface = next;
      this._setUi({ status: `${next[0].toUpperCase()}${next.slice(1)} surface opened. Remote access remains explicit.` });
      if (next === 'files' && !this.repositoryBrowseLoaded && this._activeWorkspace()) {
        await this.browseRepository('');
      }
      return next;
    }

    async _renderMarkdownDocument(markdown, sourcePath, context, kind) {
      const mediaKind = kind === 'file' ? 'file' : 'note';
      const rendered = this.api.renderRichMarkdown ? this.api.renderRichMarkdown(markdown) : { html: `<pre>${String(markdown || '')}</pre>`, resources: [], links: [] };
      this._disposeMediaLoader(mediaKind);
      let imageResults = [];
      if (rendered.resources && rendered.resources.length) {
        const pending = rendered.resources.filter((resource) => /^obs-pending-image:/.test(String(resource.target || '')));
        const repositoryResources = rendered.resources.filter((resource) => !/^obs-pending-image:/.test(String(resource.target || '')));
        let loader = null;
        try {
          let client = null;
          if (repositoryResources.length && context && context.owner && context.repo && context.branch && sourcePath && this.api.RepositoryMediaLoader) client = await this._client(context);
          if ((pending.length || client) && this.api.RepositoryMediaLoader) {
            loader = new this.api.RepositoryMediaLoader({ readBytes: client ? (path, options) => client.readBytes(path, options) : async () => { throw new Error('Repository context is unavailable.'); } });
            this.mediaLoaders[mediaKind] = loader;
          }
          for (const resource of pending) {
            try {
              const id = String(resource.target).slice('obs-pending-image:'.length);
              const asset = this.pendingAssetStore ? await this.pendingAssetStore.get(id) : null;
              if (!asset) throw new Error('Pending image bytes are unavailable.');
              const blob = new Blob([asset.bytes], { type: asset.mimeType });
              const objectUrl = loader.createObjectUrl(blob);
              loader.urls.add(objectUrl);
              imageResults.push({ id: resource.id, status: 'loaded', path: resource.target, objectUrl, mime: asset.mimeType, size: asset.size, localPending: true });
            } catch (error) { imageResults.push({ id: resource.id, status: 'error', target: resource.target, message: String(error && error.message || error) }); }
          }
          if (repositoryResources.length) {
            if (client && loader) imageResults.push(...await loader.loadAll(repositoryResources, { sourcePath }));
            else imageResults.push(...repositoryResources.map((resource) => ({ id: resource.id, status: resource.external ? 'external_blocked' : 'unavailable', target: resource.target, message: resource.external ? 'External image loading requires an explicit action.' : 'Repository context is unavailable for this image.' })));
          }
        } catch (error) {
          this._disposeMediaLoader(mediaKind);
          imageResults = rendered.resources.map((resource) => ({ id: resource.id, status: 'error', target: resource.target, message: String(error && error.message || error) }));
        }
      }
      return { ...rendered, imageResults, source: { path: sourcePath || '', context: context ? { owner: context.owner, repo: context.repo, branch: context.branch } : null } };
    }

    async _renderCurrentNote(note = this.current) {
      if (!note) { this._disposeMediaLoader('note'); this.noteRendered = null; return null; }
      const remote = this.api.normalizeRemote(note.remote);
      let context = null;
      let sourcePath = '';
      if (this.api.hasRemoteTargetIdentity(remote)) {
        context = remote;
        sourcePath = remote.path;
      } else {
        const workspace = this._activeWorkspace();
        if (workspace) {
          context = workspace;
          try { sourcePath = this._configuredTarget(note).path; } catch (error) { sourcePath = ''; }
        }
      }
      this.noteRendered = await this._renderMarkdownDocument(note.body || '', sourcePath, context, 'note');
      return this.noteRendered;
    }

    async _renderCurrentFile() {
      const preview = this.repositoryPreview;
      if (!preview || preview.kind !== 'text' || !/\.md(?:own)?$/i.test(preview.path || '')) { this._disposeMediaLoader('file'); this.fileRendered = null; return null; }
      this.fileRendered = await this._renderMarkdownDocument(preview.content || '', preview.path, preview.context, 'file');
      return this.fileRendered;
    }

    async setNoteViewMode(mode, note) {
      const allowed = new Set(['edit', 'preview', 'split']);
      if (!allowed.has(mode)) throw new Error(`Unsupported Note view mode: ${mode}`);
      if (note) await this.saveDraft(note);
      this.noteViewMode = mode;
      if (mode !== 'edit') await this._renderCurrentNote(this.current);
      else { this._disposeMediaLoader('note'); this.noteRendered = null; }
      this._setUi({ status: `Note view: ${mode}.` });
      return mode;
    }

    async setFileViewMode(mode) {
      if (!new Set(['rendered', 'source']).has(mode)) throw new Error(`Unsupported file view mode: ${mode}`);
      this.fileViewMode = mode;
      if (mode === 'rendered') await this._renderCurrentFile();
      else { this._disposeMediaLoader('file'); this.fileRendered = null; }
      this._setUi({ status: `File view: ${mode}.` });
      return mode;
    }

    async openRenderedLink(target, source = {}) {
      const value = String(target || '').trim();
      if (!value) return;
      if (this.api.isPortableUrl && this.api.isPortableUrl(value)) {
        window.open(value, '_blank', 'noopener,noreferrer');
        return;
      }
      if (value.startsWith('#')) {
        this._setUi({ status: `Rendered anchor requested: ${value}.` });
        return;
      }
      const sourcePath = String(source.path || '');
      const context = source.context || this._activeWorkspace();
      if (!sourcePath || !context) throw new Error('Rendered repository link has no source repository context.');
      const resolved = this.api.normalizeMarkdownRepositoryTarget ? this.api.normalizeMarkdownRepositoryTarget(sourcePath, value) : this.api.normalizeRepositoryTarget(sourcePath, value);
      const noteTarget = this.noteRelationIndex && this.noteRelationIndex.byId
        ? Array.from(this.noteRelationIndex.byId.values()).find((note) => {
          const remote = this.api.normalizeRemote(note.remote);
          return remote.path === resolved.path && this._sameRepositoryContext(remote, context);
        }) : null;
      if (noteTarget) return this.selectNote(noteTarget.id);
      return this.openRepositoryEntry({ type: 'file', path: resolved.path, name: resolved.path.slice(resolved.path.lastIndexOf('/') + 1) }, context);
    }

    async setNoteCategoryIntent(note, ids) {
      if (!note) throw new Error('No Note is selected.');
      const draft = await this.saveDraft({ ...note, categoryIds: this.api.normalizeCategoryIds ? this.api.normalizeCategoryIds(ids) : ids, categoryIntentPending: true });
      this.current = draft;
      await this.refreshList();
      this._setUi({ status: 'Note category selection saved locally. Save GitHub to apply repository category memberships.' });
      return draft.categoryIds;
    }

    async openTargetPicker(request = {}) {
      const mode = String(request.mode || 'note-link');
      if (!new Set(['note-link', 'category-members', 'transfer-target']).has(mode)) throw new Error(`Unsupported target-picker mode: ${mode}`);
      const transferMode = request.transferMode === 'append' ? 'append' : 'create';
      const selected = mode === 'category-members'
        ? [...(Array.isArray(request.initialTargets) ? request.initialTargets : this.categoryDraftTargets)]
        : mode === 'transfer-target' && transferMode === 'append' && this.transferDraft.targetPath
          ? [{ type: 'file', path: this.transferDraft.targetPath, name: this.transferDraft.targetPath.slice(this.transferDraft.targetPath.lastIndexOf('/') + 1), label: this.transferDraft.targetPath }]
          : [];
      this.targetPicker = {
        open: true,
        mode,
        transferMode,
        fileName: String(request.fileName || this.transferDraft.fileName || 'copied-note.md'),
        tab: 'files',
        query: '',
        depth: '2',
        currentPath: mode === 'transfer-target' && transferMode === 'create' ? String(this.transferDraft.targetDirectory || '') : '',
        entries: [],
        fileResults: [],
        noteResults: [],
        selected,
        truncated: false,
        summary: '',
        cursorStart: Number(request.cursorStart || 0),
        cursorEnd: Number(request.cursorEnd || request.cursorStart || 0)
      };
      await this.browseTargetPicker(this.targetPicker.currentPath);
      return this.targetPicker;
    }

    closeTargetPicker() {
      this.targetPicker = { ...this.targetPicker, open: false };
      this._setUi({ status: 'Target picker closed; current selection was preserved until the next picker action.' });
    }

    setTargetPickerTab(tab) {
      const value = String(tab || 'files');
      if (!new Set(['files', 'notes', 'selected']).has(value)) throw new Error(`Unsupported target-picker tab: ${value}`);
      this.targetPicker = { ...this.targetPicker, tab: value };
      this._setUi();
      return value;
    }

    async browseTargetPicker(path = '') {
      if (!this.targetPicker.open) throw new Error('Target picker is not open.');
      return this._runRemoteOperation('Reading target-picker folder…', async () => {
        const workspace = this._activeWorkspace();
        if (!workspace) throw new Error('Select a GitHub workspace before choosing repository files.');
        const normalized = this.api.normalizeBrowserPath ? this.api.normalizeBrowserPath(path) : String(path || '');
        const client = await this._client(workspace);
        const entries = await client.listDirectory(normalized, { maxEntries: 200 });
        this.targetPicker = { ...this.targetPicker, currentPath: normalized, entries: this.api.sortRepositoryEntries ? this.api.sortRepositoryEntries(entries) : entries, fileResults: [], query: '', truncated: false, summary: `${entries.length} direct entries.` };
        this._setUi({ status: `Target picker folder loaded: ${normalized || '/'}.` });
        return entries;
      });
    }

    async searchTargetPicker(query, depth) {
      if (!this.targetPicker.open) throw new Error('Target picker is not open.');
      return this._runRemoteOperation('Searching repository targets…', async () => {
        const workspace = this._activeWorkspace();
        if (!workspace) throw new Error('Select a GitHub workspace before searching files.');
        const client = await this._client(workspace);
        const result = await this.api.searchRepositoryTargets({
          query,
          depth,
          rootPath: this.targetPicker.currentPath,
          listDirectory: (path, options) => client.listDirectory(path, options)
        });
        const allNotes = await this.store.search('');
        const noteResults = this.api.searchNotesByName ? this.api.searchNotesByName(allNotes, query) : allNotes.filter((note) => String(note.title || '').toLowerCase().includes(String(query || '').toLowerCase()));
        this.targetPicker = {
          ...this.targetPicker,
          query: String(query || ''),
          depth: String(depth == null ? '2' : depth),
          fileResults: result.results,
          noteResults,
          truncated: result.truncated,
          summary: `${result.results.length} file result(s); ${noteResults.length} Note result(s); scanned ${result.scannedFolders} folder(s)${result.truncated ? `; incomplete (${result.truncationReason})` : ''}.`
        };
        this._setUi({ status: `Target search complete. ${this.targetPicker.summary}` });
        return this.targetPicker;
      });
    }

    toggleTargetPickerTarget(target = {}) {
      if (!this.targetPicker.open) throw new Error('Target picker is not open.');
      const type = String(target.type || 'file');
      const normalized = type === 'note'
        ? { type: 'note', noteId: String(target.noteId || target.id || ''), path: String(target.path || target.remotePath || ''), name: String(target.name || target.title || 'Untitled Note'), label: String(target.label || target.name || target.title || 'Untitled Note') }
        : { type: 'file', path: this.api.normalizeCanonicalRepositoryPath(target.path, 'Selected repository file'), name: String(target.name || target.path || ''), label: String(target.label || target.name || target.path || '') };
      const key = type === 'note' ? `note:${normalized.noteId || normalized.path}` : `file:${normalized.path}`;
      let selected = [...this.targetPicker.selected];
      if (this.targetPicker.mode === 'transfer-target') {
        if (type !== 'file' || !/\.md$/i.test(normalized.path)) throw new Error('Transfer append targets must be Markdown files.');
        selected = selected.some((item) => item.type === 'file' && item.path === normalized.path) ? [] : [normalized];
      } else {
        const index = selected.findIndex((item) => (item.type === 'note' ? `note:${item.noteId || item.path}` : `file:${item.path}`) === key);
        if (index >= 0) selected.splice(index, 1); else selected.push(normalized);
      }
      this.targetPicker = { ...this.targetPicker, selected };
      this._setUi({ status: `${selected.length} target(s) selected.` });
      return selected;
    }

    async applyTargetPicker(input = {}) {
      if (!this.targetPicker.open) throw new Error('Target picker is not open.');
      if (this.targetPicker.mode === 'category-members') {
        this.categoryDraftTargets = [...this.targetPicker.selected];
        this.targetPicker = { ...this.targetPicker, open: false };
        this._setUi({ status: `${this.categoryDraftTargets.length} initial category member(s) selected.` });
        return this.categoryDraftTargets;
      }
      if (this.targetPicker.mode === 'transfer-target') {
        const transferMode = this.targetPicker.transferMode === 'append' ? 'append' : 'create';
        let targetPath = '';
        let targetDirectory = this.targetPicker.currentPath || '';
        let fileName = String(input.fileName || this.targetPicker.fileName || this.transferDraft.fileName || 'copied-note.md').trim();
        if (transferMode === 'append') {
          if (this.targetPicker.selected.length !== 1 || this.targetPicker.selected[0].type !== 'file') throw new Error('Select exactly one existing Markdown file for append mode.');
          targetPath = this.api.normalizeCanonicalRepositoryPath(this.targetPicker.selected[0].path, 'Transfer target path');
          if (!/\.md$/i.test(targetPath)) throw new Error('Transfer append target must be a Markdown file.');
          targetDirectory = targetPath.includes('/') ? targetPath.slice(0, targetPath.lastIndexOf('/')) : '';
          fileName = targetPath.slice(targetPath.lastIndexOf('/') + 1);
        } else {
          if (!/^[^/\\]+\.md$/i.test(fileName) || /[?#\u0000-\u001f\u007f]/.test(fileName)) throw new Error('Enter one safe Markdown filename ending in .md.');
          targetPath = this.api.normalizeCanonicalRepositoryPath(`${targetDirectory ? `${targetDirectory}/` : ''}${fileName}`, 'Transfer target path');
        }
        this.transferPlan = null;
        this.transferRetry = null;
        this.transferDraft = { targetPath, targetDirectory, fileName, mode: transferMode, plan: null };
        this.targetPicker = { ...this.targetPicker, open: false, selected: [] };
        this._setUi({ status: `Transfer target selected: ${targetPath}. Prepare the transfer plan before writing.` });
        return this.transferDraft;
      }
      if (!this.current) throw new Error('Select a Note before inserting links.');
      let note = await this.saveDraft(this.current);
      const sourceTarget = this.api.hasRemoteTargetIdentity(note.remote) ? this.api.normalizeRemote(note.remote) : this._configuredTarget(note);
      const lines = [];
      for (const selected of this.targetPicker.selected) {
        if (selected.type === 'note') {
          const targetNote = await this.store.get(selected.noteId);
          if (!targetNote) throw new Error(`Selected Note no longer exists: ${selected.noteId}`);
          const remote = this.api.normalizeRemote(targetNote.remote);
          if (!this.api.hasRemoteTargetIdentity(remote) || !this._sameRepositoryContext(remote, sourceTarget)) throw new Error(`Selected Note is not verified in the same repository and branch: ${targetNote.title || targetNote.id}`);
          const relative = this.api.repositoryRelativePath(sourceTarget.path, remote.path);
          const encoded = this.api.encodeMarkdownTarget ? this.api.encodeMarkdownTarget(relative) : relative;
          const label = String(targetNote.title || targetNote.id).replace(/\\/g, '\\\\').replace(/\[/g, '\\[').replace(/\]/g, '\\]');
          lines.push(`- [${label}](<${encoded}>)`);
          note = this.api.addLink(note, { type: 'note', label: targetNote.title || targetNote.id, target: { noteId: targetNote.id, owner: remote.owner, repo: remote.repo, branch: remote.branch, path: remote.path }, resolution: 'resolved', resolutionMessage: 'Selected through target picker.' });
        } else {
          const workspace = this._activeWorkspace();
          if (!workspace || !this._sameRepositoryContext(workspace, sourceTarget)) throw new Error('The selected file and Note must use the same repository and branch.');
          const relative = this.api.repositoryRelativePath(sourceTarget.path, selected.path);
          const label = selected.label || selected.name || selected.path;
          const encoded = this.api.encodeMarkdownTarget ? this.api.encodeMarkdownTarget(relative) : relative;
          const escapedLabel = String(label).replace(/\\/g, '\\\\').replace(/\[/g, '\\[').replace(/\]/g, '\\]');
          lines.push(`- [${escapedLabel}](<${encoded}>)`);
          note = this.api.addLink(note, { type: 'repository', label, target: { owner: sourceTarget.owner, repo: sourceTarget.repo, branch: sourceTarget.branch, path: selected.path }, resolution: 'unchecked', resolutionMessage: 'Selected through target picker.' });
        }
      }
      const insertion = lines.join('\n');
      const start = Math.max(0, Math.min(note.body.length, this.targetPicker.cursorStart));
      const end = Math.max(start, Math.min(note.body.length, this.targetPicker.cursorEnd));
      const prefix = start > 0 && note.body[start - 1] !== '\n' ? '\n' : '';
      const suffix = end < note.body.length && note.body[end] !== '\n' ? '\n' : '';
      note = this.api.updateNote(note, { body: `${note.body.slice(0, start)}${prefix}${insertion}${suffix}${note.body.slice(end)}` });
      await this.store.put(note);
      this.current = note;
      this.targetPicker = { ...this.targetPicker, open: false, selected: [] };
      this.noteRelationIndex = this.api.buildNoteRelationIndex ? this.api.buildNoteRelationIndex(await this.store.search('')) : this.noteRelationIndex;
      if (this.noteViewMode !== 'edit') await this._renderCurrentNote(note);
      await this.refreshList();
      this._setUi({ replaceCurrent: true, status: `${lines.length} managed link(s) inserted into the Note.` });
      return note;
    }

    async browseRepository(path = '') {
      return this._runRemoteOperation('Reading repository folder…', async () => {
        const workspace = this._activeWorkspace();
        if (!workspace) throw new Error('Select or create a GitHub workspace before browsing files.');
        const normalized = this.api.normalizeBrowserPath ? this.api.normalizeBrowserPath(path) : String(path || '');
        const client = await this._client(workspace);
        const entries = await client.listDirectory(normalized, { maxEntries: 200 });
        this.repositoryPath = normalized;
        this.repositoryEntries = this.api.sortRepositoryEntries ? this.api.sortRepositoryEntries(entries) : entries;
        this.repositoryPreview = null;
        this.repositoryEditor = { mode: 'none', parentPath: normalized, path: '', name: '', content: '', baseSha: '' };
        this.fileCategoryDraftIds = [];
        this.repositoryBrowseLoaded = true;
        this._disposeMediaLoader('file');
        this.fileRendered = null;
        this.surface = 'files';
        this._setUi({ status: `Repository folder loaded: ${normalized || '/'}. ${entries.length} direct entries.` });
        return this.repositoryEntries;
      });
    }

    async openRepositoryEntry(entry, contextOverride = null) {
      if (!entry || !entry.path) throw new Error('Repository entry is required.');
      const listedEntry = !contextOverride && Array.isArray(this.repositoryEntries)
        ? this.repositoryEntries.find((candidate) => candidate && candidate.path === entry.path)
        : null;
      entry = listedEntry ? { ...entry, ...listedEntry } : entry;
      if (entry.type === 'dir') {
        if (contextOverride) throw new Error('Cross-workspace directory browsing is not supported from a Note link.');
        return this.browseRepository(entry.path);
      }
      return this._runRemoteOperation('Reading repository file…', async () => {
        const workspace = contextOverride || this._activeWorkspace();
        if (!workspace) throw new Error('Select or create a GitHub workspace before opening files.');
        const maxBytes = this.api.DEFAULT_PREVIEW_MAX_BYTES || (512 * 1024);
        let file;
        if (Number(entry.size) > maxBytes) {
          file = {
            path: entry.path,
            name: entry.name || entry.path.slice(entry.path.lastIndexOf('/') + 1),
            size: Number(entry.size) || 0,
            sha: String(entry.sha || ''),
            content: null,
            htmlUrl: String(entry.htmlUrl || '')
          };
        } else {
          const client = await this._client(workspace);
          file = await client.read(entry.path, { allowMissingContent: true });
        }
        const preview = this.api.classifyFilePreview
          ? this.api.classifyFilePreview(file, { maxBytes })
          : { kind: typeof file.content === 'string' ? 'text' : 'unsupported', path: file.path, size: file.size || 0, content: file.content || '', message: 'Read-only repository preview.' };
        this.repositoryPreview = {
          ...preview,
          sha: file.sha,
          name: file.name || entry.name || file.path.slice(file.path.lastIndexOf('/') + 1),
          htmlUrl: file.htmlUrl || entry.htmlUrl || (this.api.buildGitHubHtmlUrl ? this.api.buildGitHubHtmlUrl(workspace, file.path, 'file') : ''),
          context: { owner: workspace.owner, repo: workspace.repo, branch: workspace.branch }
        };
        this.repositoryEditor = { mode: 'none', parentPath: file.path.includes('/') ? file.path.slice(0, file.path.lastIndexOf('/')) : '', path: '', name: '', content: '', baseSha: '' };
        const activeWorkspace = this._activeWorkspace();
        const categoryContextCurrent = Boolean(
          this.categoryIndex
          && this.categoryIndex.explicitCategoryIdsForTarget
          && this.categoryContextKey
          && activeWorkspace
          && this.categoryContextKey === this._categoryContextKey(activeWorkspace)
          && this._sameRepositoryContext(workspace, activeWorkspace)
          && !this.categoryContextRequiresRefresh
        );
        this.fileCategoryDraftIds = categoryContextCurrent
          ? this.categoryIndex.explicitCategoryIdsForTarget('file', file.path)
          : [];
        this.surface = 'files';
        this._disposeMediaLoader('file');
        this.fileRendered = null;
        if (this.fileViewMode === 'rendered' && preview.kind === 'text' && /\.md(?:own)?$/i.test(file.path || '')) await this._renderCurrentFile();
        this._setUi({ replaceFileCategoryIds: true, status: preview.kind === 'text' ? `Opened ${file.path}.` : preview.message });
        return this.repositoryPreview;
      });
    }

    beginRepositoryFileCreate() {
      const workspace = this._activeWorkspace();
      if (!workspace) throw new Error('Select or create a GitHub workspace before creating files.');
      this.repositoryEditor = { mode: 'create', parentPath: this.repositoryPath || '', path: '', name: '', content: '', baseSha: '' };
      this.surface = 'files';
      this._setUi({ replaceFileEditor: true, status: `New text file in ${this.repositoryPath || '/'}. Nothing is written until Save.` });
      return this.repositoryEditor;
    }

    beginRepositoryFolderCreate() {
      const workspace = this._activeWorkspace();
      if (!workspace) throw new Error('Select or create a GitHub workspace before creating folders.');
      this.repositoryEditor = { mode: 'folder', parentPath: this.repositoryPath || '', path: '', name: '', content: '', baseSha: '' };
      this.surface = 'files';
      this._setUi({ replaceFileEditor: true, status: `New folder in ${this.repositoryPath || '/'}. GitHub will track it through .gitkeep.` });
      return this.repositoryEditor;
    }

    async beginRepositoryFileEdit() {
      return this._runRemoteOperation('Preparing repository text editor…', async () => {
        const workspace = this._activeWorkspace();
        const preview = this.repositoryPreview;
        if (!workspace || !preview || !preview.path || !this._sameRepositoryContext(preview.context, workspace)) {
          throw new Error('Open a file from the active workspace before editing it.');
        }
        if (preview.kind !== 'text') throw new Error('Only supported bounded text files can be edited in this prototype.');
        const client = await this._client(workspace);
        const maxBytes = this.api.DEFAULT_TEXT_FILE_MAX_BYTES || this.api.DEFAULT_PREVIEW_MAX_BYTES || (512 * 1024);
        const file = await client.readBytes(preview.path, { maxBytes });
        const content = this.api.decodeUtf8Bytes(file.bytes, { fatal: true, message: 'Repository file is not valid UTF-8 and cannot be edited safely.' });
        this.repositoryEditor = {
          mode: 'edit',
          parentPath: preview.path.includes('/') ? preview.path.slice(0, preview.path.lastIndexOf('/')) : '',
          path: preview.path,
          name: preview.name || preview.path.slice(preview.path.lastIndexOf('/') + 1),
          content,
          baseSha: file.sha || preview.sha || ''
        };
        this.fileViewMode = 'source';
        this.surface = 'files';
        this._setUi({ replaceFileEditor: true, status: `Editing ${preview.path}. Remote content is unchanged until Save.` });
        return this.repositoryEditor;
      });
    }

    cancelRepositoryEditor() {
      this.repositoryEditor = { mode: 'none', parentPath: this.repositoryPath || '', path: '', name: '', content: '', baseSha: '' };
      this._setUi({ replaceFileEditor: true, status: 'Repository file edit cancelled; no remote write was performed.' });
      return this.repositoryEditor;
    }

    _markCategoryContextStaleForRepositoryPath(path, workspace = this._activeWorkspace()) {
      if (!workspace || !path) return false;
      const categoryBase = this._categoryBasePath(workspace);
      if (path !== categoryBase && !path.startsWith(`${categoryBase}/`)) return false;
      const contextKey = this._categoryContextKey(workspace);
      this.categoryContextsRequiringRefresh.add(contextKey);
      this.categoryContextRequiresRefresh = true;
      return true;
    }

    async saveRepositoryEditor(input = {}) {
      const requested = { ...(this.repositoryEditor || {}), ...(input || {}) };
      const mode = requested.mode;
      if (!['create', 'edit', 'folder'].includes(mode)) throw new Error('No repository file or folder edit is active.');
      return this._runRemoteOperation(mode === 'folder' ? 'Creating repository folder…' : 'Saving repository text file…', async () => {
        const workspace = this._activeWorkspace();
        if (!workspace) throw new Error('Select or create a GitHub workspace before writing files.');
        const client = await this._client(workspace);
        const normalizePath = (value) => this.api.normalizeBrowserPath ? this.api.normalizeBrowserPath(value, { allowRoot: false }) : String(value || '');
        const parentPath = this.api.normalizeBrowserPath ? this.api.normalizeBrowserPath(requested.parentPath || '') : String(requested.parentPath || '');
        let result;
        if (mode === 'folder') {
          if (!this.api.createRepositoryFolder) throw new Error('Repository folder writer is unavailable.');
          result = await this.api.createRepositoryFolder({
            client,
            normalizePath,
            parentPath,
            name: requested.name,
            placeholderName: '.gitkeep'
          });
          this._markCategoryContextStaleForRepositoryPath(result.placeholderPath, workspace);
          const entries = await client.listDirectory(parentPath, { maxEntries: 200 });
          this.repositoryPath = parentPath;
          this.repositoryEntries = this.api.sortRepositoryEntries ? this.api.sortRepositoryEntries(entries) : entries;
          this.repositoryPreview = null;
          this.repositoryBrowseLoaded = true;
          this.repositoryEditor = { mode: 'none', parentPath, path: '', name: '', content: '', baseSha: '' };
          this.fileCategoryDraftIds = [];
          this.surface = 'files';
          this._setUi({ replaceFileEditor: true, status: `Folder ${result.folderPath} created and verified through ${result.placeholderPath}.` });
          return result;
        }

        if (!this.api.saveRepositoryTextFile) throw new Error('Repository text-file writer is unavailable.');
        result = await this.api.saveRepositoryTextFile({
          client,
          normalizePath,
          mode,
          parentPath,
          path: requested.path,
          name: requested.name,
          content: requested.content,
          baseSha: requested.baseSha,
          maxBytes: this.api.DEFAULT_TEXT_FILE_MAX_BYTES || this.api.DEFAULT_PREVIEW_MAX_BYTES || (512 * 1024)
        });
        this._markCategoryContextStaleForRepositoryPath(result.path, workspace);
        const parent = result.path.includes('/') ? result.path.slice(0, result.path.lastIndexOf('/')) : '';
        const entries = await client.listDirectory(parent, { maxEntries: 200 });
        this.repositoryPath = parent;
        this.repositoryEntries = this.api.sortRepositoryEntries ? this.api.sortRepositoryEntries(entries) : entries;
        const preview = this.api.classifyFilePreview
          ? this.api.classifyFilePreview({ path: result.path, name: result.path.slice(result.path.lastIndexOf('/') + 1), size: result.size, sha: result.sha, content: result.content, htmlUrl: result.htmlUrl }, { maxBytes: this.api.DEFAULT_PREVIEW_MAX_BYTES || (512 * 1024) })
          : { kind: 'text', path: result.path, size: result.size, content: result.content, message: 'Repository text file.' };
        this.repositoryPreview = {
          ...preview,
          sha: result.sha || '',
          name: result.path.slice(result.path.lastIndexOf('/') + 1),
          htmlUrl: result.htmlUrl || (this.api.buildGitHubHtmlUrl ? this.api.buildGitHubHtmlUrl(workspace, result.path, 'file') : ''),
          context: { owner: workspace.owner, repo: workspace.repo, branch: workspace.branch }
        };
        this.repositoryBrowseLoaded = true;
        this.repositoryEditor = { mode: 'none', parentPath: parent, path: '', name: '', content: '', baseSha: '' };
        const categoryContextCurrent = Boolean(
          this.categoryIndex
          && this.categoryIndex.explicitCategoryIdsForTarget
          && this.categoryContextKey
          && this.categoryContextKey === this._categoryContextKey(workspace)
          && !this.categoryContextRequiresRefresh
        );
        this.fileCategoryDraftIds = categoryContextCurrent
          ? this.categoryIndex.explicitCategoryIdsForTarget('file', result.path)
          : [];
        this.fileViewMode = 'source';
        this._disposeMediaLoader('file');
        this.fileRendered = null;
        this.surface = 'files';
        this._setUi({ replaceFileEditor: true, replaceFileCategoryIds: true, status: `${mode === 'edit' ? 'Updated' : 'Created'} ${result.path}; exact remote read-back verified.` });
        return result;
      });
    }

    async applyFileCategories(filePath, ids = this.fileCategoryDraftIds) {
      return this._runRemoteOperation('Applying file category memberships…', async () => {
        const workspace = this._requireCategoryContext();
        const canonical = this._assertCategoryAssignmentTarget(filePath, workspace);
        const desiredList = this.api.normalizeCategoryIds
          ? this.api.normalizeCategoryIds(ids)
          : [...new Set((Array.isArray(ids) ? ids : []).map((id) => String(id || '').trim()).filter(Boolean))];
        for (const id of desiredList) if (!this.categoryIndex.categories.has(id)) throw new Error(`Category not found: ${id}. Refresh categories first.`);
        const desired = new Set(desiredList);
        const current = new Set(this.categoryIndex.explicitCategoryIdsForTarget ? this.categoryIndex.explicitCategoryIdsForTarget('file', canonical) : []);
        const changes = [...new Set([...desired, ...current])].filter((id) => desired.has(id) !== current.has(id));
        const results = [];
        for (const categoryId of changes) {
          try {
            await this._writeCategoryMembership(categoryId, canonical, !desired.has(categoryId));
            results.push({ target: categoryId, status: 'completed', message: desired.has(categoryId) ? 'File assigned and verified.' : 'File unassigned and verified.' });
          } catch (error) {
            results.push({ target: categoryId, status: 'failed', message: String(error && error.message || error) });
          }
        }

        try {
          const client = await this._client(workspace);
          await this._refreshCategoriesUnlocked(client, workspace);
        } catch (error) {
          results.push({ target: this._categoryBasePath(workspace), status: 'failed', message: `Final category refresh failed: ${String(error && error.message || error)}` });
        }

        const failures = results.filter((result) => result.status === 'failed');
        const explicit = this.categoryIndex.explicitCategoryIdsForTarget ? this.categoryIndex.explicitCategoryIdsForTarget('file', canonical) : [];
        this.fileCategoryDraftIds = failures.length ? desiredList : explicit;
        this.surface = 'files';
        if (failures.length) {
          const error = new Error(`${failures.length} file category update(s) failed. Completed changes remain verified; the requested selection is preserved for review/retry.`);
          error.kind = 'partial_category_update';
          error.partialResults = results;
          throw error;
        }
        this._setUi({ replaceFileCategoryIds: true, status: changes.length ? `${changes.length} file category membership change(s) verified.` : 'File category memberships were already up to date.' });
        return results;
      });
    }

    openRepositoryFileInGitHub(path) {
      const workspace = this.repositoryPreview && this.repositoryPreview.context || this._activeWorkspace();
      if (!workspace) throw new Error('Select a GitHub workspace first.');
      const target = String(path || (this.repositoryPreview && this.repositoryPreview.path) || '').trim();
      if (!target) throw new Error('Select a repository file first.');
      const url = this.api.buildGitHubHtmlUrl
        ? this.api.buildGitHubHtmlUrl(workspace, target, 'file')
        : `https://github.com/${encodeURIComponent(workspace.owner)}/${encodeURIComponent(workspace.repo)}/blob/${encodeURIComponent(workspace.branch)}/${encodeGitHubPath(target)}`;
      if (typeof window !== 'undefined' && typeof window.open === 'function') window.open(url, '_blank', 'noopener,noreferrer');
      return url;
    }

    _categoryBasePath(workspace = this._activeWorkspace()) {
      if (!workspace) throw new Error('Select or create a GitHub workspace first.');
      return cleanBasePath(workspace.categoryBasePath || this.api.DEFAULT_CATEGORY_BASE_PATH || 'categories');
    }

    async _repositoryEntryMetadata(client, path) {
      const canonical = this.api.normalizeCanonicalRepositoryPath(path, 'Repository file path');
      const slash = canonical.lastIndexOf('/');
      const parent = slash >= 0 ? canonical.slice(0, slash) : '';
      const entries = await client.listDirectory(parent, { missingAsEmpty: true, maxEntries: 200 });
      const entry = entries.find((candidate) => candidate && candidate.path === canonical);
      if (!entry || entry.type !== 'file') {
        const error = new Error(`Repository file does not exist: ${canonical}.`);
        error.kind = 'not_found';
        throw error;
      }
      return entry;
    }

    async _refreshCategoriesUnlocked(client, workspace) {
      const contextKey = this._categoryContextKey(workspace);
      const basePath = this._categoryBasePath(workspace);
      const entries = await client.listDirectory(basePath, { missingAsEmpty: true, maxEntries: 100 });
      const markdownEntries = entries.filter((entry) => entry.type === 'file' && /\.md$/i.test(entry.name || entry.path));
      const definitions = [];
      const diagnostics = [];
      let skipped = 0;
      let bytes = 0;
      const maxBytes = 1024 * 1024;
      for (const entry of markdownEntries) {
        if (Number(entry.size || 0) > maxBytes) {
          skipped += 1;
          diagnostics.push({ kind: 'oversized_definition', path: entry.path, message: `Category definition exceeds the ${maxBytes}-byte refresh limit.` });
          continue;
        }
        try {
          const file = await client.read(entry.path);
          bytes += new TextEncoder().encode(file.content).byteLength;
          if (bytes > maxBytes) throw new Error(`Category refresh exceeded the ${maxBytes}-byte prototype limit.`);
          if (!this.api.isCategoryDefinitionMarkdown(file.content)) {
            skipped += 1;
            diagnostics.push({ kind: 'ordinary_markdown_skipped', path: file.path, message: 'Markdown file has no obs-file-category marker and was skipped.' });
            continue;
          }
          try {
            const definition = this.api.decodeCategoryDefinition(file.content);
            definitions.push({ path: file.path, sha: file.sha, htmlUrl: file.htmlUrl, definition });
          } catch (error) {
            diagnostics.push({ kind: 'malformed_definition', path: file.path, message: String(error && error.message || error) });
          }
        } catch (error) {
          if (String(error && error.message || '').includes('prototype limit')) throw error;
          diagnostics.push({ kind: 'definition_read_error', path: entry.path, message: String(error && error.message || error), errorKind: String(error && error.kind || '') });
        }
      }

      const initialIndex = this.api.buildRepositoryCategoryIndex(definitions);
      const memberEntries = Array.from(initialIndex.memberships.values());
      const filePaths = memberEntries.filter((entry) => entry.type === 'file').map((entry) => entry.path).sort();
      const notePaths = memberEntries.filter((entry) => entry.type === 'note').map((entry) => entry.path).sort();
      const validationLimit = 100;
      const uniqueTargets = [];
      const seenTargets = new Set();
      for (const entry of memberEntries) {
        const key = `${entry.type}:${entry.path}`;
        if (seenTargets.has(key)) continue;
        seenTargets.add(key);
        uniqueTargets.push({ type: entry.type, path: entry.path });
      }
      uniqueTargets.sort((left, right) => left.path.localeCompare(right.path) || left.type.localeCompare(right.type));
      const selectedTargets = uniqueTargets.slice(0, validationLimit);
      const fileValidation = {};
      const noteValidation = {};
      const pathsByParent = new Map();
      for (const target of selectedTargets) {
        const slash = target.path.lastIndexOf('/');
        const parent = slash >= 0 ? target.path.slice(0, slash) : '';
        const group = pathsByParent.get(parent) || [];
        group.push(target);
        pathsByParent.set(parent, group);
      }
      for (const [parent, targets] of pathsByParent.entries()) {
        try {
          const directoryEntries = await client.listDirectory(parent, { missingAsEmpty: true, maxEntries: 200 });
          const files = new Set(directoryEntries.filter((entry) => entry.type === 'file').map((entry) => entry.path));
          for (const target of targets) {
            const targetMap = target.type === 'note' ? noteValidation : fileValidation;
            targetMap[target.path] = files.has(target.path)
              ? { status: 'verified', message: target.type === 'note' ? 'Repository Note file exists.' : 'Repository file exists.' }
              : { status: 'missing', message: `${target.type === 'note' ? 'Repository Note' : 'Repository file'} does not exist: ${target.path}.` };
          }
        } catch (error) {
          for (const target of targets) {
            const targetMap = target.type === 'note' ? noteValidation : fileValidation;
            targetMap[target.path] = { status: 'inaccessible', message: String(error && error.message || error) };
          }
        }
      }
      if (uniqueTargets.length > validationLimit) {
        for (const target of uniqueTargets.slice(validationLimit)) {
          const targetMap = target.type === 'note' ? noteValidation : fileValidation;
          targetMap[target.path] = { status: 'unchecked', message: 'Target was not checked because the validation limit was reached.' };
        }
        diagnostics.push({ kind: 'incomplete_member_validation', path: basePath, message: `Validated ${validationLimit} of ${uniqueTargets.length} unique file/Note category targets.` });
      }

      const refreshedAt = new Date().toISOString();
      let snapshot = {
        definitions,
        diagnostics,
        fileValidation,
        noteValidation,
        groups: this.categorySnapshot && this.categorySnapshot.groups || {},
        refreshedAt
      };
      if (this.categoryStore) {
        snapshot = typeof this.categoryStore.saveDefinitions === 'function'
          ? await this.categoryStore.saveDefinitions(contextKey, snapshot)
          : await this.categoryStore.save(contextKey, snapshot);
      }
      const currentWorkspace = this._activeWorkspace();
      if (!currentWorkspace || this._categoryContextKey(currentWorkspace) !== contextKey) throw new Error('Workspace repository target changed before category refresh completed. Results were not applied.');
      this.categorySnapshot = snapshot;
      this.categoryContextWorkspaceId = workspace.id;
      this.categoryContextKey = contextKey;
      this.categoryContextsRequiringRefresh.delete(contextKey);
      this.categoryContextRequiresRefresh = false;
      this.categoryIndex = this.api.buildRepositoryCategoryIndex(definitions, { fileValidation, noteValidation });
      if (this.selectedCategoryId && !this.categoryIndex.categories.has(this.selectedCategoryId)) this.selectedCategoryId = '';
      if (this.repositoryPreview && this.repositoryPreview.path && this._sameRepositoryContext(this.repositoryPreview.context, workspace) && this.categoryIndex.explicitCategoryIdsForTarget) {
        this.fileCategoryDraftIds = this.categoryIndex.explicitCategoryIdsForTarget('file', this.repositoryPreview.path);
      }
      await this._hydrateNoteCategoryIntentsFromIndex(workspace);
      this.surface = 'categories';
      const issueCount = diagnostics.length + this.categoryIndex.errors.length;
      const summary = `definitions ${definitions.length}; skipped ${skipped}; issues ${issueCount}; validated targets ${Math.min(uniqueTargets.length, validationLimit)}/${uniqueTargets.length}`;
      this._setUi({ categoryRefreshSummary: summary, status: `Category refresh complete: ${summary}. No remote writes were performed.` });
      return { definitions: definitions.length, skipped, errors: diagnostics.length, modelErrors: this.categoryIndex.errors.length, diagnostics: [...diagnostics, ...this.categoryIndex.errors] };
    }

    async _hydrateNoteCategoryIntentsFromIndex(workspace = this._activeWorkspace()) {
      if (!workspace || !this.categoryIndex || !this.categoryIndex.explicitCategoryIdsForTarget) return;
      const notes = await this.store.list();
      for (const note of notes) {
        const normalized = this.api.normalizeNote(note);
        if (normalized.categoryIntentPending) continue;
        const remote = this.api.normalizeRemote(normalized.remote);
        if (!this.api.hasRemoteTargetIdentity(remote) || !this._sameRepositoryContext(remote, workspace)) continue;
        const categoryIds = this.categoryIndex.explicitCategoryIdsForTarget('note', remote.path);
        const next = this.api.updateNote(normalized, { categoryIds, categoryIntentPending: false });
        if (JSON.stringify(next.categoryIds) !== JSON.stringify(normalized.categoryIds) || normalized.categoryIntentPending) await this.store.put(next);
        if (this.current && this.current.id === next.id) this.current = next;
      }
    }

    async refreshCategories() {
      return this._runRemoteOperation('Reading category definitions from GitHub…', async () => {
        const workspace = this._activeWorkspace();
        if (!workspace) throw new Error('Select or create a GitHub workspace before refreshing categories.');
        const client = await this._client(workspace);
        return this._refreshCategoriesUnlocked(client, workspace);
      });
    }

    selectCategory(id) {
      const value = String(id || '');
      if (value && !this.categoryIndex.categories.has(value)) throw new Error(`Category not found: ${value}`);
      this.selectedCategoryId = value;
      const record = value ? this.categoryIndex.categories.get(value) : null;
      this.categoryDraftTargets = record ? [
        ...(record.explicitFiles || []).map((item) => ({ type: 'file', path: item.path, name: item.label || item.path, label: item.label || item.path })),
        ...(record.explicitNotes || []).map((item) => ({ type: 'note', path: item.path, noteId: item.noteId || '', name: item.label || item.path, label: item.label || item.path }))
      ] : [];
      this.surface = 'categories';
      this.feedback = this.feedback.filter((item) => item.scope !== 'categories');
      this._setUi({ replaceCategoryEditor: true, status: value ? `Category opened: ${record.name}.` : 'New category form ready.' });
      return record;
    }

    _categoryDefinitionRecord(id) {
      const value = String(id || '');
      const indexed = this.categoryIndex.categories.get(value);
      if (!indexed) return null;
      const snapshot = (this.categorySnapshot.definitions || []).find((entry) => entry.path === indexed.path);
      return snapshot ? { ...snapshot, indexed } : null;
    }

    _categoryLinksForIds(sourcePath, ids) {
      const links = [];
      for (const id of Array.isArray(ids) ? ids : []) {
        const target = this.categoryIndex.categories.get(String(id));
        if (!target) throw new Error(`Implied category not found: ${id}`);
        links.push({ label: target.name, target: this.api.repositoryRelativePath(sourcePath, target.path) });
      }
      return links;
    }

    async _categoryMemberLinks(definitionPath, targets, workspace) {
      const files = [];
      const notes = [];
      const seen = new Set();
      for (const target of Array.isArray(targets) ? targets : []) {
        if (!target || !target.type) continue;
        if (target.type === 'file') {
          const path = this.api.normalizeCanonicalRepositoryPath(target.path, 'Categorized repository file');
          const key = `file:${path}`;
          if (seen.has(key)) continue;
          seen.add(key);
          files.push({ label: target.label || target.name || path.slice(path.lastIndexOf('/') + 1), target: this.api.repositoryRelativePath(definitionPath, path) });
        } else if (target.type === 'note') {
          const note = target.noteId ? await this.store.get(target.noteId) : null;
          const remote = note ? this.api.normalizeRemote(note.remote) : { owner: target.owner, repo: target.repo, branch: target.branch, path: target.path };
          if (!this.api.hasRemoteTargetIdentity(remote)) throw new Error(`Selected Note must be saved and verified in GitHub before category assignment: ${target.name || target.noteId || target.path || 'Untitled Note'}.`);
          if (!this._sameRepositoryContext(remote, workspace)) throw new Error(`Selected Note belongs to another repository or branch: ${note && (note.title || note.id) || target.path}.`);
          const key = `note:${remote.path}`;
          if (seen.has(key)) continue;
          seen.add(key);
          notes.push({ label: note && (note.title || note.id) || target.label || target.name || remote.path, target: this.api.repositoryRelativePath(definitionPath, remote.path), noteId: note ? note.id : String(target.noteId || '') });
        }
      }
      return { files, notes };
    }

    async saveCategory(input = {}) {
      return this._runRemoteOperation('Saving and verifying category definition…', async () => {
        const workspace = this._requireCategoryContext();
        const client = await this._client(workspace);
        const id = this.api.normalizeCategoryId(input.id || input.name);
        const existing = this._categoryDefinitionRecord(id);
        const path = existing ? existing.path : `${this._categoryBasePath(workspace)}/${this.api.categoryFileName(id)}`;
        if (!existing) {
          try {
            await this._repositoryEntryMetadata(client, path);
            throw new Error(`Category target already exists and was not overwritten: ${path}`);
          } catch (error) {
            if (error.kind !== 'not_found') throw error;
          }
        }
        const previous = existing ? existing.definition : { files: [], notes: [], impliedCategories: [] };
        const requestedImplied = this._categoryLinksForIds(path, input.impliedCategoryIds || []);
        const unresolvedPrevious = (previous.impliedCategories || []).filter((link) => {
          try {
            const targetPath = this.api.normalizeRepositoryTarget(path, link.target).path;
            return !this.categoryIndex.byPath.has(targetPath);
          } catch (error) {
            return true;
          }
        });
        const impliedCategories = [...requestedImplied];
        for (const link of unresolvedPrevious) if (!impliedCategories.some((item) => item.target === link.target)) impliedCategories.push(link);
        const selectedTargets = Array.isArray(input.selectedTargets) ? input.selectedTargets : this.categoryDraftTargets;
        const members = await this._categoryMemberLinks(path, selectedTargets, workspace);
        const content = this.api.encodeCategoryDefinition({
          id,
          name: input.name,
          description: input.description,
          impliedCategories,
          files: members.files,
          notes: members.notes
        });
        await client.saveVerified({
          path,
          content,
          baseSha: existing ? existing.sha : '',
          message: `${existing ? 'Update' : 'Create'} repository category ${input.name || id}`
        });
        await this._refreshCategoriesUnlocked(client, workspace);
        this.selectedCategoryId = id;
        const saved = this.categoryIndex.categories.get(id);
        this.categoryDraftTargets = saved ? [
          ...(saved.explicitFiles || []).map((item) => ({ type: 'file', path: item.path, name: item.label || item.path, label: item.label || item.path })),
          ...(saved.explicitNotes || []).map((item) => ({ type: 'note', path: item.path, noteId: item.noteId || '', name: item.label || item.path, label: item.label || item.path }))
        ] : [];
        if (input.group !== undefined) await this.setCategoryGroup(id, input.group, { silent: true });
        this.feedback = this.feedback.filter((item) => item.scope !== 'categories');
        this._pushFeedback({ id: 'category-save-success', scope: 'categories', severity: 'success', title: 'Category saved', message: `${input.name || id} and ${this.categoryDraftTargets.length} membership target(s) were verified by read-back.` });
        this._setUi({ replaceCategoryEditor: true, status: `Category ${input.name || id} saved and verified by read-back.` });
        return saved;
      });
    }

    _assertCategoryAssignmentTarget(filePath, workspace = this._requireCategoryContext()) {
      const canonicalFile = this.api.normalizeCanonicalRepositoryPath(filePath, 'Categorized repository file');
      const preview = this.repositoryPreview;
      if (!preview || !preview.path || this.api.normalizeCanonicalRepositoryPath(preview.path, 'Selected repository file') !== canonicalFile) {
        throw new Error('Select the repository file in the Files surface before assigning a category.');
      }
      if (!this._sameRepositoryContext(preview.context, workspace)) {
        throw new Error('The selected file belongs to a different repository or branch than the active category workspace. Cross-repository category assignment is blocked.');
      }
      return canonicalFile;
    }

    async _writeCategoryMembership(categoryId, filePath, remove) {
      const workspace = this._requireCategoryContext();
      const record = this._categoryDefinitionRecord(categoryId);
      if (!record) throw new Error(`Category not found: ${categoryId}. Refresh categories first.`);
      const canonicalFile = remove
        ? this.api.normalizeCanonicalRepositoryPath(filePath, 'Categorized repository file')
        : this._assertCategoryAssignmentTarget(filePath, workspace);
      const kept = [];
      let found = false;
      for (const link of record.definition.files || []) {
        let resolved = '';
        try { resolved = this.api.normalizeRepositoryTarget(record.path, link.target).path; } catch (error) { kept.push(link); continue; }
        if (resolved === canonicalFile) { found = true; if (!remove) kept.push(link); }
        else kept.push(link);
      }
      if (remove && !found) return record.indexed;
      if (!remove && !found) kept.push({ label: canonicalFile.slice(canonicalFile.lastIndexOf('/') + 1), target: this.api.repositoryRelativePath(record.path, canonicalFile) });
      const content = this.api.encodeCategoryDefinition({
        id: record.definition.id,
        name: record.definition.name,
        description: record.definition.description,
        impliedCategories: record.definition.impliedCategories,
        files: kept,
        notes: record.definition.notes || []
      });
      const client = await this._client(workspace);
      await client.saveVerified({
        path: record.path,
        content,
        baseSha: record.sha,
        message: `${remove ? 'Remove' : 'Add'} ${canonicalFile} ${remove ? 'from' : 'to'} category ${record.definition.name}`
      });
      await this._refreshCategoriesUnlocked(client, workspace);
      this.selectedCategoryId = categoryId;
      this._setUi({ status: `${canonicalFile} ${remove ? 'removed from' : 'assigned to'} ${record.definition.name}; category definition verified by read-back.` });
      return this.categoryIndex.categories.get(categoryId);
    }

    async assignCategory(categoryId, filePath) {
      return this._runRemoteOperation('Assigning file category…', () => this._writeCategoryMembership(categoryId, filePath, false));
    }

    async unassignCategory(categoryId, filePath) {
      return this._runRemoteOperation('Removing file category…', () => this._writeCategoryMembership(categoryId, filePath, true));
    }

    async setCategoryGroup(categoryId, groupName, options = {}) {
      const workspace = this._requireCategoryContext();
      if (!this.categoryStore) return;
      if (!this.categoryIndex.categories.has(categoryId)) throw new Error(`Category not found: ${categoryId}`);
      const value = String(groupName || '').trim();
      const contextKey = this._categoryContextKey(workspace);
      const nextGroups = { ...(this.categorySnapshot.groups || {}) };
      if (value) nextGroups[categoryId] = value;
      else delete nextGroups[categoryId];
      this.categorySnapshot = typeof this.categoryStore.setCategoryGroup === 'function'
        ? await this.categoryStore.setCategoryGroup(contextKey, categoryId, value)
        : typeof this.categoryStore.setGroups === 'function'
          ? await this.categoryStore.setGroups(contextKey, nextGroups)
          : await this.categoryStore.save(contextKey, { ...this.categorySnapshot, groups: nextGroups });
      if (!options.silent) this._setUi({ status: value ? `Local category group saved: ${value}.` : 'Local category group removed.' });
      return value;
    }

    async refreshList(query = this.search) {
      this.search = String(query || '');
      const notes = await this.store.search(this.search);
      const allNotes = typeof this.store.list === 'function' ? await this.store.list() : await this.store.search('');
      this.noteRelationIndex = this.api.buildNoteRelationIndex ? this.api.buildNoteRelationIndex(allNotes) : this.noteRelationIndex;
      if (this.current) {
        const refreshed = allNotes.find((item) => item.id === this.current.id) || await this.store.get(this.current.id);
        if (refreshed) this.current = this.api.normalizeNote(refreshed);
      }
      this._setUi({ notes, current: this.current, search: this.search });
    }

    async refreshRemoteWorkspace() {
      return this._runRemoteOperation('Reading Linked Notes from the active GitHub workspace…', async () => {
        const workspace = this._activeWorkspace();
        if (!workspace) throw new Error('Select or create a GitHub workspace before refreshing GitHub.');
        const basePath = cleanBasePath(workspace.basePath);
        const client = await this._client(workspace);
        const entries = await client.listDirectory(basePath, { missingAsEmpty: true, maxEntries: 100 });
        const markdownEntries = entries.filter((entry) => entry.type === 'file' && /\.md$/i.test(entry.name || entry.path));
        const maxBytes = 2 * 1024 * 1024;
        const listedBytes = markdownEntries.reduce((sum, entry) => sum + Number(entry.size || 0), 0);
        if (listedBytes > maxBytes) {
          throw new Error(`GitHub Notes folder is too large for one explicit refresh: ${listedBytes} bytes exceeds ${maxBytes}.`);
        }

        const summary = {
          discovered: markdownEntries.length,
          imported: 0,
          updated: 0,
          unchanged: 0,
          localAhead: 0,
          conflicts: 0,
          deleted: 0,
          skipped: 0,
          errors: 0
        };
        const seenPaths = new Set(markdownEntries.map((entry) => String(entry.path || '').replace(/\\/g, '/')));
        const initialLocalNotes = await this.store.list();
        const boundGroupsByPath = new Map();
        for (const local of initialLocalNotes) {
          const bound = this.api.normalizeRemote(local.remote);
          if (bound.owner === workspace.owner && bound.repo === workspace.repo && bound.branch === workspace.branch && bound.path) {
            const group = boundGroupsByPath.get(bound.path) || [];
            group.push(local);
            boundGroupsByPath.set(bound.path, group);
          }
        }
        const boundByPath = new Map();
        const duplicateLocalPaths = new Set();
        const unsupportedPaths = new Set();
        const conflictIds = new Set();
        for (const [path, group] of boundGroupsByPath.entries()) {
          if (group.length === 1) {
            boundByPath.set(path, group[0]);
            continue;
          }
          duplicateLocalPaths.add(path);
          for (const local of group) {
            const conflicted = this.api.markConflict(local, `Several local Notes are bound to the same GitHub path ${path}. GitHub refresh cannot select one identity automatically.`);
            await this.store.put(conflicted);
            if (this.current && this.current.id === conflicted.id) this.current = conflicted;
            conflictIds.add(conflicted.id);
            summary.conflicts += 1;
          }
        }
        const snapshots = [];
        let actualBytes = 0;

        for (const entry of markdownEntries) {
          try {
            const remoteFile = await client.read(entry.path);
            actualBytes += new TextEncoder().encode(remoteFile.content).byteLength;
            if (actualBytes > maxBytes) throw new Error(`GitHub Notes refresh exceeded the ${maxBytes}-byte content limit.`);
            if (!this.api.isLinkedNoteMarkdown(remoteFile.content)) {
              unsupportedPaths.add(remoteFile.path || entry.path);
              summary.skipped += 1;
              continue;
            }
            const decoded = this.api.decodeNoteMarkdown(remoteFile.content);
            snapshots.push({
              note: decoded,
              content: remoteFile.content,
              hash: await this.api.sha256Hex(remoteFile.content),
              target: {
                owner: workspace.owner,
                repo: workspace.repo,
                branch: workspace.branch,
                path: remoteFile.path || entry.path
              },
              sha: remoteFile.sha,
              htmlUrl: remoteFile.htmlUrl || entry.htmlUrl || ''
            });
          } catch (error) {
            if (String(error && error.message || '').includes('content limit')) throw error;
            summary.errors += 1;
          }
        }

        const snapshotsById = new Map();
        for (const snapshot of snapshots) {
          const group = snapshotsById.get(snapshot.note.id) || [];
          group.push(snapshot);
          snapshotsById.set(snapshot.note.id, group);
        }

        for (const [noteId, group] of snapshotsById.entries()) {
          const local = await this.store.get(noteId);
          if (group.length > 1) {
            const affected = new Map();
            if (local) affected.set(local.id, local);
            for (const snapshot of group) {
              for (const boundLocal of boundGroupsByPath.get(snapshot.target.path) || []) {
                affected.set(boundLocal.id, boundLocal);
              }
            }
            if (affected.size === 0) summary.conflicts += 1;
            for (const affectedLocal of affected.values()) {
              const conflicted = this.api.markConflict(affectedLocal, `GitHub refresh found ${group.length} files with the same stable Note id ${noteId}. No file was selected automatically.`);
              await this.store.put(conflicted);
              if (this.current && this.current.id === conflicted.id) this.current = conflicted;
              if (!conflictIds.has(conflicted.id)) summary.conflicts += 1;
              conflictIds.add(conflicted.id);
            }
            summary.skipped += group.length;
            continue;
          }

          const snapshot = group[0];
          if (duplicateLocalPaths.has(snapshot.target.path)) {
            summary.skipped += 1;
            continue;
          }
          const pathBoundLocal = boundByPath.get(snapshot.target.path);
          if (pathBoundLocal && pathBoundLocal.id !== noteId) {
            const conflicted = this.api.markConflict(pathBoundLocal, `GitHub refresh found stable Note id ${noteId} at ${snapshot.target.path}, but that path is already bound locally to ${pathBoundLocal.id}.`);
            await this.store.put(conflicted);
            if (this.current && this.current.id === conflicted.id) this.current = conflicted;
            conflictIds.add(conflicted.id);
            summary.conflicts += 1;
            summary.skipped += 1;
            continue;
          }
          const localContentHash = local ? await this.api.sha256Hex(this.api.encodeNoteMarkdown(local)) : '';
          const decision = this.api.classifyRemoteNote({ local, remote: snapshot, localContentHash });
          let next = local;
          if (decision.action === this.api.REMOTE_RECONCILE_ACTIONS.REMOTE_IMPORT) {
            next = this.api.createNote({
              id: snapshot.note.id,
              title: snapshot.note.title,
              body: snapshot.note.body,
              links: snapshot.note.links,
              codecExtra: snapshot.note.codecExtra
            });
            next = this.api.markSavedVerified(next, {
              ...snapshot.target,
              sha: snapshot.sha,
              verifiedHash: snapshot.hash,
              htmlUrl: snapshot.htmlUrl
            });
            summary.imported += 1;
          } else if (decision.action === this.api.REMOTE_RECONCILE_ACTIONS.FAST_FORWARD) {
            next = this.api.updateNote(local, {
              title: snapshot.note.title,
              body: snapshot.note.body,
              links: snapshot.note.links,
              codecExtra: snapshot.note.codecExtra
            });
            next = this.api.markSavedVerified(next, {
              ...snapshot.target,
              sha: snapshot.sha,
              verifiedHash: snapshot.hash,
              htmlUrl: snapshot.htmlUrl
            });
            summary.updated += 1;
          } else if (decision.action === this.api.REMOTE_RECONCILE_ACTIONS.UNCHANGED || decision.action === this.api.REMOTE_RECONCILE_ACTIONS.ATTACH_EXISTING) {
            next = this.api.markSavedVerified(local, {
              ...snapshot.target,
              sha: snapshot.sha,
              verifiedHash: snapshot.hash,
              htmlUrl: snapshot.htmlUrl
            });
            summary.unchanged += 1;
          } else if (decision.action === this.api.REMOTE_RECONCILE_ACTIONS.LOCAL_AHEAD) {
            summary.localAhead += 1;
          } else {
            next = this.api.markConflict(local, `GitHub refresh conflict for ${snapshot.target.path}: ${decision.reason}`);
            summary.conflicts += 1;
          }

          if (next && next !== local) {
            await this.store.put(next);
            if (this.current && this.current.id === next.id) this.current = next;
          }
        }

        for (const path of unsupportedPaths) {
          const local = boundByPath.get(path);
          if (!local || conflictIds.has(local.id)) continue;
          const conflicted = this.api.markConflict(local, `The bound GitHub file ${path} is no longer valid obs-linked-note:v1 Markdown. Local content was preserved.`);
          await this.store.put(conflicted);
          if (this.current && this.current.id === conflicted.id) this.current = conflicted;
          conflictIds.add(conflicted.id);
          summary.conflicts += 1;
        }

        const localNotes = await this.store.list();
        for (const local of localNotes) {
          if (conflictIds.has(local.id)) continue;
          if (!this.api.boundNoteMissingFromSnapshot(local, workspace, basePath, seenPaths)) continue;
          const deleted = this.api.markRemoteDeleted(local, 'The bound GitHub Note is no longer present in the active workspace folder. Local content was preserved.');
          await this.store.put(deleted);
          if (this.current && this.current.id === deleted.id) this.current = deleted;
          summary.deleted += 1;
        }

        const summaryText = `found ${summary.discovered}; imported ${summary.imported}; updated ${summary.updated}; unchanged ${summary.unchanged}; local ahead ${summary.localAhead}; conflicts ${summary.conflicts}; deleted ${summary.deleted}; skipped ${summary.skipped}; errors ${summary.errors}`;
        await this.refreshList();
        this._setUi({ remoteRefreshSummary: summaryText, status: `GitHub refresh complete: ${summaryText}. No remote writes were performed.` });
        return summary;
      });
    }

    async saveDraft(note) {
      if (!note) return null;
      const normalized = this.api.normalizeNote(note);
      const previous = this.current && this.current.id === normalized.id ? this.api.normalizeNote(this.current) : normalized;
      const categoryIds = this.api.normalizeCategoryIds ? this.api.normalizeCategoryIds(note.categoryIds) : (note.categoryIds || []);
      const categoryChanged = JSON.stringify(categoryIds) !== JSON.stringify(previous.categoryIds || []);
      const next = this.api.updateNote(normalized, {
        title: note.title,
        body: note.body,
        links: note.links,
        categoryIds,
        categoryIntentPending: categoryChanged ? true : Boolean(note.categoryIntentPending)
      });
      await this.store.put(next);
      this.current = next;
      return next;
    }

    async newNote() {
      const note = this.api.createNote({ categoryIds: [] });
      await this.store.put(note);
      this.current = note;
      this._disposeMediaLoader('note');
      this.noteRendered = null;
      this.noteViewMode = 'edit';
      this.transferPlan = null;
      this.transferRetry = null;
      this.noteMarkdownRetry = null;
      this.transferDraft = { ...this.transferDraft, targetPath: '', plan: null };
      await this._loadPendingAssets(note);
      await this.refreshList();
      this._setUi({ replaceCurrent: true, status: 'New local Note created. Categories may be selected before the first GitHub save.' });
    }

    async selectNote(id) {
      const note = await this.store.get(id);
      if (!note) throw new Error(`Note not found: ${id}`);
      this.current = this.api.normalizeNote(note);
      this.transferPlan = null;
      this.transferRetry = null;
      this.noteMarkdownRetry = null;
      this.transferDraft = { ...this.transferDraft, targetPath: '', plan: null };
      await this._loadPendingAssets(this.current);
      if (this.noteViewMode !== 'edit') await this._renderCurrentNote(this.current);
      else { this._disposeMediaLoader('note'); this.noteRendered = null; }
      this._setUi({ current: this.current, replaceCurrent: true, status: `Opened ${this.current.title || 'Untitled Note'}.` });
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

    async _loadPendingAssets(note = this.current) {
      if (!note || !this.pendingAssetStore || typeof this.pendingAssetStore.listByNote !== 'function') {
        this.pendingAssets = [];
        return this.pendingAssets;
      }
      this.pendingAssets = await this.pendingAssetStore.listByNote(note.id);
      return this.pendingAssets;
    }

    async _imageInputBytes(input = {}) {
      if (input.bytes) return this.api.toUint8Array(input.bytes);
      const file = input.file;
      if (!file) throw new Error('Select or paste an image first.');
      if (typeof file.arrayBuffer === 'function') return new Uint8Array(await file.arrayBuffer());
      if (file.bytes) return this.api.toUint8Array(file.bytes);
      throw new Error('The browser did not provide readable image bytes.');
    }

    async insertNoteImage(note, input = {}) {
      if (!note) throw new Error('Select a Note before inserting an image.');
      if (!this.pendingAssetStore) throw new Error('Pending image storage is not available.');
      const draft = await this.saveDraft(note);
      const file = input.file || {};
      const bytes = await this._imageInputBytes(input);
      const asset = this.api.createPendingNoteAsset({
        noteId: draft.id,
        name: input.name || file.name || 'image',
        type: input.type || file.type || '',
        bytes,
        alt: input.alt || String(file.name || 'image').replace(/\.[^.]+$/, '')
      });
      await this.pendingAssetStore.put(asset);
      const start = Math.max(0, Number.isInteger(input.cursorStart) ? input.cursorStart : String(draft.body || '').length);
      const end = Math.max(start, Number.isInteger(input.cursorEnd) ? input.cursorEnd : start);
      const before = String(draft.body || '').slice(0, start);
      const after = String(draft.body || '').slice(end);
      const prefix = before && !before.endsWith('\n') ? '\n' : '';
      const suffix = after && !after.startsWith('\n') ? '\n' : '';
      const body = `${before}${prefix}${this.api.pendingImageMarkdown(asset)}${suffix}${after}`;
      const next = this.api.updateNote(draft, { body });
      await this.store.put(next);
      this.current = next;
      await this._loadPendingAssets(next);
      await this.refreshList();
      this._setUi({ replaceCurrent: true, status: 'Image staged locally. Save GitHub to upload and verify the asset.' });
      return asset;
    }

    async removePendingNoteImage(note, assetId) {
      if (!note) throw new Error('Select a Note first.');
      const draft = await this.saveDraft(note);
      const id = String(assetId || '').trim();
      const pattern = new RegExp(`!?\\[[^\\]]*\\]\\(\\s*<?obs-pending-image:${id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}>?(?:\\s+["'][^"']*["'])?\\s*\\)`, 'g');
      const body = String(draft.body || '').replace(pattern, '').replace(/\n{3,}/g, '\n\n');
      const next = this.api.updateNote(draft, { body });
      await this.store.put(next);
      if (this.pendingAssetStore) await this.pendingAssetStore.delete(id);
      this.current = next;
      await this._loadPendingAssets(next);
      await this.refreshList();
      this._setUi({ replaceCurrent: true, status: 'Pending image removed locally.' });
      return next;
    }

    async _preparePendingAssets(note, target, client) {
      const ids = this.api.pendingAssetIds ? this.api.pendingAssetIds(note.body) : [];
      if (!ids.length) return { remoteNote: note, assets: [], replacements: new Map() };
      if (!this.pendingAssetStore) throw new Error('Pending image storage is unavailable; the Note cannot be saved remotely.');
      const replacements = new Map();
      const results = [];
      for (const id of ids) {
        let asset = null;
        try {
          asset = await this.pendingAssetStore.get(id);
          if (!asset || asset.noteId !== note.id) throw new Error(`Pending image data is missing: ${id}.`);
          const desiredPath = asset.verifiedPath || this.api.noteAssetPath(target.path, asset.fileName);
          const result = await this.api.ensureRepositoryAsset({
            client,
            path: desiredPath,
            bytes: asset.bytes,
            maxBytes: this.api.DEFAULT_MAX_IMAGE_BYTES,
            message: `Add image for linked Note ${note.title || note.id}`
          });
          const relative = this.api.repositoryRelativePath(target.path, result.path);
          replacements.set(id, relative);
          const updatedAsset = { ...asset, state: 'verified', stateMessage: 'Repository image verified by read-back.', plannedPath: desiredPath, verifiedPath: result.path, verifiedSha: result.sha || '', verifiedHash: result.verifiedHash || '', updatedAt: new Date().toISOString() };
          await this.pendingAssetStore.put(updatedAsset);
          results.push({ target: result.path, status: result.status || 'verified', message: result.collision ? 'Collision-safe path selected and verified.' : 'Repository image verified.' });
        } catch (error) {
          const targetPath = asset && (asset.verifiedPath || asset.plannedPath || asset.fileName) || `pending:${id}`;
          throw this._appendPartialResults(error, results, { target: targetPath, status: 'failed', message: String(error && error.message || error) });
        }
      }
      const body = this.api.replacePendingImageTargets(note.body, replacements);
      return { remoteNote: this.api.normalizeNote({ ...note, body }), assets: results, replacements };
    }

    async _finalizePendingAssets(noteId, ids) {
      if (!this.pendingAssetStore) return;
      for (const id of ids || []) await this.pendingAssetStore.delete(id);
      if (this.current && this.current.id === noteId) await this._loadPendingAssets(this.current);
    }

    _appendPartialResults(error, results = [], extra = null) {
      const existing = Array.isArray(error && error.partialResults) ? error.partialResults : [];
      const combined = [...existing, ...results, ...(extra ? [extra] : [])];
      const seen = new Set();
      const normalized = [];
      for (const item of combined) {
        if (!item) continue;
        const value = { target: String(item.target || ''), status: String(item.status || 'failed'), message: String(item.message || '') };
        const key = `${value.status}\u0000${value.target}\u0000${value.message}`;
        if (seen.has(key)) continue;
        seen.add(key);
        normalized.push(value);
      }
      if (error && typeof error === 'object') error.partialResults = normalized;
      return error;
    }

    async _recoverOrRetryTextWrite({ client, path, content, baseSha = '', message, beforeWrite = null }) {
      let current = null;
      try {
        current = await client.read(path);
      } catch (error) {
        if (!error || error.kind !== 'not_found') throw error;
      }

      if (current && current.content === content) {
        return {
          path: current.path || path,
          sha: current.sha || '',
          htmlUrl: current.htmlUrl || '',
          verifiedHash: this.api.sha256Hex ? await this.api.sha256Hex(content) : '',
          recoveredAfterUnknownWrite: true,
          recoveredWithoutWrite: true
        };
      }

      if (current) {
        if (!baseSha || current.sha !== baseSha) {
          const error = new Error(baseSha
            ? 'The remote Markdown changed after the failed or unverified write. Refresh and review before retrying.'
            : 'The remote Markdown path now exists with different content. No overwrite was attempted.');
          error.kind = 'conflict';
          error.details = { path, expectedBaseSha: baseSha, currentSha: current.sha || '' };
          throw error;
        }
      } else if (baseSha) {
        const error = new Error('The remote Markdown target disappeared after the failed or unverified write. No recreate was attempted.');
        error.kind = 'remote_deleted';
        error.details = { path, expectedBaseSha: baseSha };
        throw error;
      }

      if (typeof beforeWrite === 'function') await beforeWrite();
      return client.saveVerified({ path, content, baseSha: current ? current.sha : '', message });
    }

    _noteDraftSnapshot(note) {
      const value = this.api.normalizeNote(note);
      return JSON.stringify({
        id: value.id,
        title: value.title,
        body: value.body,
        links: value.links,
        categoryIds: value.categoryIds,
        categoryIntentPending: Boolean(value.categoryIntentPending),
        codecExtra: value.codecExtra
      });
    }

    _noteMarkdownRetryAction(note) {
      return this._feedbackAction('retry-note-markdown', 'Verify or retry Note Markdown', () => this.retryNoteMarkdown(this.current || note));
    }

    async _verifiedTransferSource(note) {
      const local = await this.saveLocal(note);
      const bound = this.api.normalizeRemote(local.remote);
      if (!this.api.hasCompleteRemoteIdentity(bound)) throw new Error('Image-aware transfer requires a verified repository Note.');
      const workspace = this._activeWorkspace();
      if (!workspace || !this._sameRepositoryContext(bound, workspace)) throw new Error('The first transfer slice supports only the Note repository and branch selected by the active workspace.');
      if ((this.api.pendingAssetIds ? this.api.pendingAssetIds(local.body) : []).length) throw new Error('Save and verify pending images before transferring the Note.');
      if (local.state !== this.api.NOTE_STATES.SAVED_VERIFIED) throw new Error('Save and verify the current Note before transferring it.');
      const client = await this._client(bound);
      const expectedSourceContent = this.api.encodeNoteMarkdown(local);
      let sourceRemote;
      try { sourceRemote = await client.read(bound.path); }
      catch (error) { throw new Error(`Unable to verify the source Note before transfer: ${error && error.message || error}`); }
      if (!sourceRemote || sourceRemote.sha !== bound.sha || sourceRemote.content !== expectedSourceContent) throw new Error('The source Note no longer matches its last verified GitHub base. Refresh, reconcile or save it before transfer.');
      return { local, bound, client, sourceRemote, sourceMarkdown: this.api.visibleNoteMarkdown(local) };
    }

    async _readTransferTarget(client, targetPath, mode) {
      if (mode === 'create') {
        try {
          const existing = typeof client.readMetadata === 'function' ? await client.readMetadata(targetPath) : await client.read(targetPath, { allowMissingContent: true });
          if (existing) throw new Error('Transfer target already exists. Choose append mode or another path.');
        } catch (error) {
          if (error && error.kind === 'not_found') return null;
          throw error;
        }
        return null;
      }
      let targetBytes;
      try { targetBytes = await client.readBytes(targetPath, { maxBytes: 2 * 1024 * 1024 }); }
      catch (error) {
        if (error && error.kind === 'not_found') throw new Error('Append target does not exist. Choose create mode or an existing Markdown file.');
        throw error;
      }
      const content = this.api.decodeUtf8Bytes
        ? this.api.decodeUtf8Bytes(targetBytes.bytes, { fatal: true, message: `Append target is not valid UTF-8 and cannot be modified safely: ${targetPath}` })
        : new TextDecoder('utf-8', { fatal: true }).decode(targetBytes.bytes);
      return { ...targetBytes, content };
    }

    _normalizedTransferInput(input = {}) {
      const mode = input.mode === 'append' ? 'append' : 'create';
      const targetPath = this.api.normalizeCanonicalRepositoryPath(String(input.targetPath || this.transferDraft.targetPath || '').trim(), 'Transfer target path');
      if (!/\.md$/i.test(targetPath)) throw new Error('Transfer target must end in .md.');
      return { mode, targetPath };
    }

    updateTransferDraft(input = {}) {
      const mode = input.mode === 'append' ? 'append' : 'create';
      const fileName = String(input.fileName || this.transferDraft.fileName || 'copied-note.md');
      const changed = mode !== this.transferDraft.mode || fileName !== this.transferDraft.fileName;
      this.transferPlan = null;
      this.transferRetry = null;
      this.transferDraft = { ...this.transferDraft, mode, fileName, targetPath: changed ? '' : this.transferDraft.targetPath, plan: null };
      this._setUi({ status: changed ? 'Transfer target choice changed. Choose a target and prepare a new preview.' : '' });
      return this.transferDraft;
    }

    async prepareTransfer(note, input = {}) {
      return this._runRemoteOperation('Preparing image-aware transfer preview…', () => this._prepareTransferUnlocked(note, input));
    }

    _prepareTransferAgainAction(note) {
      return this._feedbackAction('prepare-transfer-again', 'Prepare transfer again', () => this.prepareTransfer(this.current || note, this.transferDraft || {}));
    }

    _retryTransferMarkdownAction(note) {
      return this._feedbackAction('retry-transfer-markdown', 'Verify or retry target Markdown', () => this.retryTransferMarkdown(this.current || note));
    }

    async _prepareTransferUnlocked(note, input = {}) {
      const { mode, targetPath } = this._normalizedTransferInput(input);
      const source = await this._verifiedTransferSource(note);
      if (targetPath === source.bound.path) throw new Error('Transfer target must differ from the source Note path.');
      const targetRemote = await this._readTransferTarget(source.client, targetPath, mode);
      const plan = this.api.buildImageAwareTransferPlan({
        api: this.api,
        sourcePath: source.bound.path,
        targetPath,
        sourceMarkdown: source.sourceMarkdown,
        targetMarkdown: targetRemote ? targetRemote.content : '',
        mode
      });
      const loadedAssets = [];
      const partialResults = [...plan.diagnostics];
      for (const asset of plan.assets) {
        try {
          const sourceAsset = await source.client.readBytes(asset.sourcePath, { maxBytes: this.api.DEFAULT_MAX_IMAGE_BYTES });
          const sourceMime = this.api.mimeTypeForImagePath ? this.api.mimeTypeForImagePath(asset.sourcePath) : '';
          this.api.validateImageInput({ type: sourceMime, bytes: sourceAsset.bytes }, { maxBytes: this.api.DEFAULT_MAX_IMAGE_BYTES });
          loadedAssets.push({ ...asset, bytes: sourceAsset.bytes, sourceSha: sourceAsset.sha || '', sourceVerifiedHash: sourceAsset.verifiedHash || '' });
        } catch (error) {
          partialResults.push({ target: asset.sourcePath, status: 'failed', message: String(error && error.message || error) });
        }
      }

      const assets = [];
      if (loadedAssets.length) {
        try {
          const batchPlans = await this.api.planRepositoryAssets({
            client: source.client,
            assets: loadedAssets.map((asset) => ({ key: asset.sourcePath, path: asset.desiredPath, bytes: asset.bytes })),
            maxBytes: this.api.DEFAULT_MAX_IMAGE_BYTES
          });
          for (let index = 0; index < loadedAssets.length; index += 1) {
            const asset = loadedAssets[index];
            const expectedPlan = batchPlans[index];
            const status = expectedPlan.status === 'reused' ? 'reuse' : expectedPlan.collision ? 'suffix' : 'copy';
            assets.push({ ...asset, expectedPlan });
            partialResults.push({ target: expectedPlan.path, status, message: `${status === 'reuse' ? 'Byte-identical target will be reused' : status === 'suffix' ? 'Different-byte or reserved-path collision; safe suffixed path will be created' : 'New repository asset will be copied'} from ${asset.sourcePath}.` });
          }
        } catch (error) {
          partialResults.push({ target: targetPath, status: 'failed', message: `Unable to reserve the complete target asset plan: ${String(error && error.message || error)}` });
        }
      }

      const ready = !plan.blocked && loadedAssets.length === plan.assets.length && assets.length === loadedAssets.length && !partialResults.some((item) => item.status === 'failed');
      const planId = `transfer-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
      this.transferRetry = null;
      this.transferPlan = ready ? {
        planId,
        noteId: source.local.id,
        repository: { owner: source.bound.owner, repo: source.bound.repo, branch: source.bound.branch },
        sourcePath: source.bound.path,
        sourceSha: source.bound.sha,
        sourceContent: this.api.encodeNoteMarkdown(source.local),
        sourceMarkdown: source.sourceMarkdown,
        targetPath,
        targetSha: targetRemote ? targetRemote.sha : '',
        targetContent: targetRemote ? targetRemote.content : '',
        mode,
        plan,
        assets,
        partialResults
      } : null;
      const summary = {
        planId,
        ready,
        sourcePath: source.bound.path,
        targetPath,
        mode,
        targetState: targetRemote ? `existing @ ${targetRemote.sha}` : 'absent',
        assets: assets.map((asset) => ({ sourcePath: asset.sourcePath, targetPath: asset.expectedPlan.path, status: asset.expectedPlan.status === 'reused' ? 'reuse' : asset.expectedPlan.collision ? 'suffix' : 'copy' })),
        diagnostics: plan.diagnostics
      };
      this.transferDraft = { ...this.transferDraft, targetPath, mode, plan: summary };
      this._pushFeedback({ id: 'note-image-transfer-preview', scope: 'notes', severity: ready ? 'info' : 'error', title: ready ? 'Transfer preview ready' : 'Transfer preview blocked', message: ready ? `${assets.length} repository image asset(s) planned. All target paths are reserved before execution.` : 'Resolve blocked or failed image rows, then prepare the preview again. No repository write occurred.', target: targetPath, partialResults, actions: ready ? [] : [this._prepareTransferAgainAction(note)] });
      this._setUi({ status: ready ? 'Transfer preview ready. No repository write has occurred.' : 'Transfer preview is blocked. No repository write has occurred.' });
      return summary;
    }

    async executePreparedTransfer(note) {
      return this._runRemoteOperation('Executing reviewed Note and image transfer…', () => this._executePreparedTransferUnlocked(note));
    }

    async _executePreparedTransferUnlocked(note) {
      const prepared = this.transferPlan;
      if (!prepared || !prepared.planId) throw new Error('Prepare and review the transfer preview before execution.');
      const source = await this._verifiedTransferSource(note);
      const prepareAgain = () => [this._prepareTransferAgainAction(note)];
      if (source.local.id !== prepared.noteId || source.bound.path !== prepared.sourcePath || source.bound.sha !== prepared.sourceSha || this.api.encodeNoteMarkdown(source.local) !== prepared.sourceContent || source.sourceMarkdown !== prepared.sourceMarkdown) {
        const error = new Error('The source Note changed after the transfer preview. Prepare the transfer again.');
        error.kind = 'plan_stale';
        throw this._attachFeedbackActions(error, prepareAgain());
      }
      const targetRemote = await this._readTransferTarget(source.client, prepared.targetPath, prepared.mode);
      if ((targetRemote ? targetRemote.sha : '') !== prepared.targetSha || (targetRemote ? targetRemote.content : '') !== prepared.targetContent) {
        const error = new Error('The target Markdown changed after the transfer preview. Prepare the transfer again.');
        error.kind = 'plan_stale';
        throw this._attachFeedbackActions(error, prepareAgain());
      }

      for (const asset of prepared.assets) {
        let currentSource;
        try { currentSource = await source.client.readBytes(asset.sourcePath, { maxBytes: this.api.DEFAULT_MAX_IMAGE_BYTES }); }
        catch (cause) {
          const error = new Error(`The source image is no longer readable: ${asset.sourcePath}. Prepare the transfer again.`);
          error.kind = 'plan_stale';
          error.cause = cause;
          error.partialResults = [{ target: asset.sourcePath, status: 'stale', message: String(cause && cause.message || cause) }];
          throw this._attachFeedbackActions(error, prepareAgain());
        }
        if ((asset.sourceSha && currentSource.sha !== asset.sourceSha) || !this.api.bytesEqual(currentSource.bytes, asset.bytes)) {
          const error = new Error(`The source image changed after the transfer preview: ${asset.sourcePath}. Prepare the transfer again.`);
          error.kind = 'plan_stale';
          error.partialResults = [{ target: asset.sourcePath, status: 'stale', message: `Expected source SHA ${asset.sourceSha || 'unknown'}; current SHA ${currentSource.sha || 'unknown'}.` }];
          throw this._attachFeedbackActions(error, prepareAgain());
        }
      }

      const currentPlans = await this.api.planRepositoryAssets({
        client: source.client,
        assets: prepared.assets.map((asset) => ({ key: asset.sourcePath, path: asset.desiredPath, bytes: asset.bytes })),
        maxBytes: this.api.DEFAULT_MAX_IMAGE_BYTES
      });
      for (let index = 0; index < prepared.assets.length; index += 1) {
        const asset = prepared.assets[index];
        const currentPlan = currentPlans[index];
        if (!currentPlan || currentPlan.path !== asset.expectedPlan.path || currentPlan.status !== asset.expectedPlan.status) {
          const error = new Error(`The target asset plan changed for ${asset.sourcePath}. Prepare the transfer again before any writes.`);
          error.kind = 'plan_stale';
          error.partialResults = [{ target: asset.expectedPlan.path, status: 'stale', message: `Expected ${asset.expectedPlan.status}; now ${currentPlan ? `${currentPlan.status} at ${currentPlan.path}` : 'unavailable'}.` }];
          throw this._attachFeedbackActions(error, prepareAgain());
        }
      }

      const actualPaths = new Map();
      const partialResults = [...prepared.plan.diagnostics];
      for (const asset of prepared.assets) {
        try {
          const written = await this.api.ensureRepositoryAsset({
            client: source.client,
            path: asset.desiredPath,
            bytes: asset.bytes,
            maxBytes: this.api.DEFAULT_MAX_IMAGE_BYTES,
            expectedPlan: asset.expectedPlan,
            message: `Copy image for ${prepared.targetPath}`
          });
          actualPaths.set(asset.sourcePath, written.path);
          partialResults.push({ target: written.path, status: written.status || 'created', message: `${written.status === 'reused' ? 'Byte-identical asset reused' : 'Repository asset copied and verified'} from ${asset.sourcePath}.` });
        } catch (error) {
          const enriched = this._appendPartialResults(error, partialResults, { target: asset.sourcePath, status: 'failed', message: String(error && error.message || error) });
          throw this._attachFeedbackActions(enriched, prepareAgain());
        }
      }
      const content = this.api.finalizeImageAwareTransfer(prepared.plan, actualPaths, this.api);
      let result;
      try {
        result = await source.client.saveVerified({ path: prepared.targetPath, content, baseSha: prepared.targetSha, message: `${prepared.mode === 'append' ? 'Append' : 'Create'} Markdown from linked Note ${source.local.title || source.local.id}` });
      } catch (error) {
        const enriched = this._appendPartialResults(error, partialResults, { target: prepared.targetPath, status: 'failed', message: `Target Markdown was not verified: ${String(error && error.message || error)}` });
        this.transferRetry = {
          prepared,
          content,
          actualPaths: Array.from(actualPaths.entries()),
          partialResults: enriched.partialResults || partialResults
        };
        throw this._attachFeedbackActions(enriched, [this._retryTransferMarkdownAction(note), this._prepareTransferAgainAction(note)]);
      }
      partialResults.push({ target: prepared.targetPath, status: 'verified', message: 'Target Markdown verified by read-back.' });
      this.transferPlan = null;
      this.transferRetry = null;
      this.transferDraft = { ...this.transferDraft, targetPath: prepared.targetPath, mode: prepared.mode, plan: { ...(this.transferDraft.plan || {}), ready: false, completed: true } };
      this._pushFeedback({ id: 'note-image-transfer', scope: 'notes', severity: 'success', title: 'Note and images copied', message: `${prepared.assets.length} repository image asset(s) processed.`, target: prepared.targetPath, partialResults });
      this._setUi({ status: 'Image-aware Markdown transfer verified.' });
      return { ...result, partialResults, assetCount: prepared.assets.length };
    }

    async retryTransferMarkdown(note) {
      return this._runRemoteOperation('Verifying or retrying target Markdown…', () => this._retryTransferMarkdownUnlocked(note));
    }

    async _retryTransferMarkdownUnlocked(note) {
      const retry = this.transferRetry;
      if (!retry || !retry.prepared || !retry.content) throw new Error('No failed target-Markdown stage is available to verify or retry. Prepare the transfer again.');
      const prepared = retry.prepared;
      const prepareAgain = () => [this._prepareTransferAgainAction(note)];
      const client = await this._client(prepared.repository || this._repositoryContext(note));
      const actualPaths = new Map(retry.actualPaths || []);

      for (const asset of prepared.assets) {
        const targetPath = actualPaths.get(asset.sourcePath);
        if (!targetPath) {
          const error = new Error(`A verified target-asset path is missing for ${asset.sourcePath}. Prepare the transfer again.`);
          error.kind = 'plan_stale';
          throw this._attachFeedbackActions(error, prepareAgain());
        }
        let targetAsset;
        try { targetAsset = await client.readBytes(targetPath, { maxBytes: this.api.DEFAULT_MAX_IMAGE_BYTES }); }
        catch (cause) {
          const error = new Error(`A previously verified target asset is no longer readable: ${targetPath}. Prepare the transfer again.`);
          error.kind = 'plan_stale';
          error.cause = cause;
          throw this._attachFeedbackActions(error, prepareAgain());
        }
        if (!this.api.bytesEqual(targetAsset.bytes, asset.bytes)) {
          const error = new Error(`A previously verified target asset changed before Markdown recovery: ${targetPath}. Prepare the transfer again.`);
          error.kind = 'plan_stale';
          throw this._attachFeedbackActions(error, prepareAgain());
        }
      }

      let result;
      try {
        result = await this._recoverOrRetryTextWrite({
          client,
          path: prepared.targetPath,
          content: retry.content,
          baseSha: prepared.targetSha,
          message: `${prepared.mode === 'append' ? 'Append' : 'Create'} Markdown from linked Note ${note && (note.title || note.id) || prepared.noteId}`,
          beforeWrite: async () => {
            const source = await this._verifiedTransferSource(note);
            if (source.local.id !== prepared.noteId || source.bound.path !== prepared.sourcePath || source.bound.sha !== prepared.sourceSha || this.api.encodeNoteMarkdown(source.local) !== prepared.sourceContent || source.sourceMarkdown !== prepared.sourceMarkdown) {
              const error = new Error('The source Note changed after the failed transfer. Prepare the transfer again.');
              error.kind = 'plan_stale';
              throw error;
            }
            for (const asset of prepared.assets) {
              const sourceAsset = await source.client.readBytes(asset.sourcePath, { maxBytes: this.api.DEFAULT_MAX_IMAGE_BYTES });
              if ((asset.sourceSha && sourceAsset.sha !== asset.sourceSha) || !this.api.bytesEqual(sourceAsset.bytes, asset.bytes)) {
                const error = new Error(`The source image changed after the failed transfer: ${asset.sourcePath}. Prepare the transfer again.`);
                error.kind = 'plan_stale';
                throw error;
              }
            }
          }
        });
      } catch (error) {
        const enriched = this._appendPartialResults(error, retry.partialResults || [], { target: prepared.targetPath, status: 'failed', message: `Target Markdown verification/retry did not complete: ${String(error && error.message || error)}` });
        const actions = error && (error.kind === 'conflict' || error.kind === 'remote_deleted' || error.kind === 'plan_stale')
          ? prepareAgain()
          : [this._retryTransferMarkdownAction(note), this._prepareTransferAgainAction(note)];
        throw this._attachFeedbackActions(enriched, actions);
      }
      const verificationMessage = result.recoveredWithoutWrite
        ? 'Target Markdown was already present with the exact intended content and was verified without another write.'
        : 'Target Markdown was written and verified by read-back on retry.';
      const partialResults = [...(retry.partialResults || []).filter((item) => !(item.target === prepared.targetPath && item.status === 'failed')), { target: prepared.targetPath, status: 'verified', message: verificationMessage }];
      this.transferPlan = null;
      this.transferRetry = null;
      this.transferDraft = { ...this.transferDraft, targetPath: prepared.targetPath, mode: prepared.mode, plan: { ...(this.transferDraft.plan || {}), ready: false, completed: true } };
      this._pushFeedback({ id: 'note-image-transfer', scope: 'notes', severity: 'success', title: result.recoveredWithoutWrite ? 'Target Markdown verified' : 'Target Markdown retry succeeded', message: 'Previously verified image assets were reused without rewriting them.', target: prepared.targetPath, partialResults });
      this._setUi({ status: result.recoveredWithoutWrite ? 'Target Markdown verified after an unknown write result.' : 'Target Markdown verified without repeating asset writes.' });
      return { ...result, partialResults, assetCount: prepared.assets.length };
    }

    async transferNoteToMarkdown(note, input = {}) {
      return this.prepareTransfer(note, input);
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
      await this.openRepositoryEntry({ type: 'file', path: canonicalPath, name: canonicalPath.slice(canonicalPath.lastIndexOf('/') + 1) }, context);
      if (link.target.anchor) this._setUi({ status: `Opened ${canonicalPath} in the app. Requested anchor: #${link.target.anchor}. Use Open on GitHub for anchored browser navigation.` });
    }

    async _persistRemoteState(note, status) {
      await this.store.put(note);
      this.current = note;
      await this.refreshList();
      this._setUi({ status: status || note.stateMessage });
      return note;
    }

    async _setNoteMembershipInCategory(categoryId, note, shouldInclude, client, workspace) {
      const record = this._categoryDefinitionRecord(categoryId);
      if (!record) throw new Error(`Category not found: ${categoryId}. Refresh categories first.`);
      const remoteNote = this.api.normalizeRemote(note.remote);
      if (!this.api.hasRemoteTargetIdentity(remoteNote) || !this._sameRepositoryContext(remoteNote, workspace)) throw new Error(`Note ${note.title || note.id} is not verified in the active category repository and branch.`);
      const latestFile = await client.read(record.path);
      const definition = this.api.decodeCategoryDefinition(latestFile.content);
      const kept = [];
      let found = false;
      for (const link of definition.notes || []) {
        let resolved = '';
        try { resolved = this.api.normalizeRepositoryTarget(record.path, link.target).path; } catch (error) { kept.push(link); continue; }
        if (resolved === remoteNote.path) { found = true; if (shouldInclude) kept.push({ ...link, noteId: note.id, label: note.title || note.id }); }
        else kept.push(link);
      }
      if (shouldInclude && !found) kept.push({ label: note.title || note.id, target: this.api.repositoryRelativePath(record.path, remoteNote.path), noteId: note.id });
      if (!shouldInclude && !found) return { target: categoryId, status: 'unchanged', message: 'Note was not an explicit member.' };
      const content = this.api.encodeCategoryDefinition({
        id: definition.id,
        name: definition.name,
        description: definition.description,
        impliedCategories: definition.impliedCategories || [],
        files: definition.files || [],
        notes: kept
      });
      if (content === latestFile.content) return { target: categoryId, status: 'unchanged', message: 'Membership already matched.' };
      await client.saveVerified({
        path: record.path,
        content,
        baseSha: latestFile.sha,
        message: `${shouldInclude ? 'Add' : 'Remove'} Note ${note.title || note.id} ${shouldInclude ? 'to' : 'from'} category ${definition.name}`
      });
      return { target: categoryId, status: 'completed', message: shouldInclude ? 'Note assigned and verified.' : 'Note unassigned and verified.' };
    }

    async _syncNoteCategories(note) {
      const desired = new Set(this.api.normalizeCategoryIds ? this.api.normalizeCategoryIds(note.categoryIds) : (note.categoryIds || []));
      const categoryContextCurrent = Boolean(
        this.categoryContextKey
        && !this.categoryContextRequiresRefresh
        && this.categoryContextKey === this._categoryContextKey(this._activeWorkspace())
      );
      if (!desired.size && !categoryContextCurrent) return [];
      if (!this.categoryIndex || !this.categoryIndex.explicitCategoryIdsForTarget) return [];
      const workspace = this._requireCategoryContext();
      const remote = this.api.normalizeRemote(note.remote);
      if (!this.api.hasRemoteTargetIdentity(remote) || !this._sameRepositoryContext(remote, workspace)) throw new Error('Note category membership requires a verified Note in the active repository and branch.');
      const current = new Set(this.categoryIndex.explicitCategoryIdsForTarget('note', remote.path));
      const changes = [...new Set([...desired, ...current])].filter((id) => desired.has(id) !== current.has(id));
      if (!changes.length) {
        if (note.categoryIntentPending) {
          const settled = this.api.updateNote(note, { categoryIntentPending: false });
          await this.store.put(settled);
          if (this.current && this.current.id === settled.id) this.current = settled;
        }
        return [];
      }
      const client = await this._client(workspace);
      const results = [];
      for (const categoryId of changes) {
        try { results.push(await this._setNoteMembershipInCategory(categoryId, note, desired.has(categoryId), client, workspace)); }
        catch (error) { results.push({ target: categoryId, status: 'failed', message: String(error && error.message || error) }); }
      }
      await this._refreshCategoriesUnlocked(client, workspace);
      const failures = results.filter((result) => result.status === 'failed');
      if (failures.length) {
        const pending = this.api.updateNote(note, { categoryIntentPending: true });
        await this.store.put(pending);
        if (this.current && this.current.id === pending.id) this.current = pending;
        const error = new Error(`Note was saved, but ${failures.length} category membership update(s) failed.`);
        error.kind = 'partial_category_update';
        error.partialResults = results;
        throw error;
      }
      const settled = this.api.updateNote(note, { categoryIntentPending: false });
      await this.store.put(settled);
      if (this.current && this.current.id === settled.id) this.current = settled;
      return results;
    }

    async saveRemote(note) {
      return this._runRemoteOperation('Saving and verifying the configured GitHub target…', () => this._saveRemoteUnlocked(note));
    }

    async retryNoteMarkdown(note) {
      return this._runRemoteOperation('Verifying or retrying Note Markdown…', () => this._retryNoteMarkdownUnlocked(note));
    }

    async _retryNoteMarkdownUnlocked(note) {
      const retry = this.noteMarkdownRetry;
      if (!retry || !retry.noteId || !retry.content) throw new Error('No failed Note-Markdown stage is available to verify or retry. Save the Note again.');
      const current = await this.store.get(retry.noteId) || this.api.normalizeNote(note);
      if (!current || current.id !== retry.noteId) throw new Error('The Note for this recovery action is no longer available.');
      const currentSnapshot = this._noteDraftSnapshot(current);
      const client = await this._client(retry.target);
      let result;
      try {
        result = await this._recoverOrRetryTextWrite({
          client,
          path: retry.target.path,
          content: retry.content,
          baseSha: retry.baseSha,
          message: `${retry.baseSha ? 'Update' : 'Create'} linked Note ${current.title || current.id}`,
          beforeWrite: async () => {
            if (currentSnapshot !== retry.localSnapshot) {
              const error = new Error('The local Note changed after the failed or unverified write. The older Markdown will not be written again.');
              error.kind = 'plan_stale';
              throw error;
            }
          }
        });
      } catch (error) {
        const enriched = this._appendPartialResults(error, retry.assetResults || [], { target: retry.target.path, status: 'failed', message: `Note Markdown verification/retry did not complete: ${String(error && error.message || error)}` });
        const actions = error && (error.kind === 'conflict' || error.kind === 'remote_deleted' || error.kind === 'plan_stale')
          ? []
          : [this._noteMarkdownRetryAction(current)];
        throw this._attachFeedbackActions(enriched, actions);
      }

      let settled;
      if (currentSnapshot === retry.localSnapshot) {
        settled = this.api.markSavedVerified(retry.remoteNote, { ...retry.target, ...result });
        await this._persistRemoteState(settled, result.recoveredWithoutWrite ? 'Remote Note content verified after an unknown write result.' : 'Remote Note Markdown verified on retry.');
        await this._finalizePendingAssets(settled.id, retry.pendingIds || []);
      } else {
        settled = this.api.updateNote(current, {
          remote: { ...retry.target, ...result },
          state: this.api.NOTE_STATES.CHANGED_AFTER_SAVE,
          stateMessage: 'The previously intended remote Note was verified; newer local edits remain unsaved.'
        });
        await this._persistRemoteState(settled, settled.stateMessage);
      }
      const partialResults = [...(retry.assetResults || []), { target: retry.target.path, status: 'verified', message: result.recoveredWithoutWrite ? 'Exact intended Note Markdown was found and verified without another write.' : 'Note Markdown was written and verified on retry.' }];
      this.noteMarkdownRetry = null;
      this._pushFeedback({ id: 'note-image-save', scope: 'notes', severity: 'success', title: result.recoveredWithoutWrite ? 'Note Markdown verified' : 'Note Markdown retry succeeded', message: currentSnapshot === retry.localSnapshot ? 'The Note and its previously verified image assets are now verified.' : 'The remote result was verified; newer local edits were preserved.', target: retry.target.path, partialResults });
      if (currentSnapshot === retry.localSnapshot) {
        try { await this._syncNoteCategories(settled); } catch (categoryError) {
          const pending = this.api.updateNote(settled, { state: this.api.NOTE_STATES.SAVED_VERIFIED, stateMessage: categoryError.message, categoryIntentPending: true });
          await this._persistRemoteState(pending, categoryError.message);
          throw categoryError;
        }
      }
      return this.current && this.current.id === settled.id ? this.current : settled;
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

      const pendingIds = this.api.pendingAssetIds ? this.api.pendingAssetIds(local.body) : [];
      let prepared;
      try { prepared = await this._preparePendingAssets(local, target, client); }
      catch (error) {
        throw this._attachFeedbackActions(error, [this._feedbackAction('retry-note-save-assets', 'Retry failed image save', () => this.saveRemote(this.current || local))]);
      }
      local = this.api.markSaving(local);
      await this.store.put(local);
      this.current = local;
      await this.refreshList();
      const content = this.api.encodeNoteMarkdown(prepared.remoteNote);
      let result;
      try {
        result = await client.saveVerified({
          path: target.path,
          content,
          baseSha: remote ? remote.sha : '',
          message: `${remote ? 'Update' : 'Create'} linked Note ${local.title || local.id}`
        });
      } catch (error) {
        this.noteMarkdownRetry = {
          noteId: local.id,
          localSnapshot: this._noteDraftSnapshot(local),
          remoteNote: prepared.remoteNote,
          target: { ...target },
          baseSha: remote ? remote.sha : '',
          content,
          pendingIds: [...pendingIds],
          assetResults: [...prepared.assets]
        };
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
        const enriched = this._appendPartialResults(error, prepared.assets, { target: target.path, status: 'failed', message: `Note Markdown was not verified: ${String(error && error.message || error)}` });
        throw this._attachFeedbackActions(enriched, [this._noteMarkdownRetryAction(local)]);
      }

      this.noteMarkdownRetry = null;
      local = this.api.markSavedVerified(prepared.remoteNote, { ...target, ...result });
      await this._persistRemoteState(local, result.recoveredAfterUnknownWrite ? 'Remote content verified after an initially unknown write result.' : 'Remote save verified by read-back.');
      await this._finalizePendingAssets(local.id, pendingIds);
      if (prepared.assets.length) this._pushFeedback({ id: 'note-image-save', scope: 'notes', severity: 'success', title: 'Note images saved', message: `${prepared.assets.length} image asset(s) were verified before the Note write.`, partialResults: prepared.assets });
      try {
        const categoryResults = await this._syncNoteCategories(local);
        if (categoryResults.length) this._pushFeedback({ id: 'note-category-sync', scope: 'notes', severity: 'success', title: 'Note and categories saved', message: `${categoryResults.length} category membership change(s) were verified.`, partialResults: categoryResults });
        return this.current && this.current.id === local.id ? this.current : local;
      } catch (categoryError) {
        const verified = this.current && this.current.id === local.id ? this.current : local;
        const pending = this.api.updateNote(verified, { state: this.api.NOTE_STATES.SAVED_VERIFIED, stateMessage: categoryError.message, categoryIntentPending: true });
        await this._persistRemoteState(pending, categoryError.message);
        throw categoryError;
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
      const pendingIds = this.api.pendingAssetIds ? this.api.pendingAssetIds(local.body) : [];
      let prepared;
      try { prepared = await this._preparePendingAssets(local, target, client); }
      catch (error) {
        throw this._attachFeedbackActions(error, [this._feedbackAction('retry-note-copy-assets', 'Retry failed image copy', () => this.copyRemote(this.current || local))]);
      }
      local = this.api.markSaving(local, 'Copying to the explicitly selected target…');
      await this.store.put(local);
      this.current = local;
      await this.refreshList();
      const content = this.api.encodeNoteMarkdown(prepared.remoteNote);
      try {
        const result = await client.saveVerified({
          path: target.path,
          content,
          baseSha: '',
          message: `Copy linked Note ${local.title || local.id}`
        });
        local = this.api.markSavedVerified(prepared.remoteNote, { ...target, ...result });
        const persisted = await this._persistRemoteState(local, 'Remote copy verified by read-back. The old remote file was not deleted.');
        await this._finalizePendingAssets(local.id, pendingIds);
        return persisted;
      } catch (error) {
        local = error.kind === 'conflict'
          ? this.api.markConflict(local, error.message)
          : this.api.markSaveFailed(local, error.message);
        await this._persistRemoteState(local);
        const enriched = this._appendPartialResults(error, prepared.assets, { target: target.path, status: 'failed', message: `Copied Note Markdown was not verified: ${String(error && error.message || error)}` });
        throw this._attachFeedbackActions(enriched, [this._feedbackAction('retry-note-copy-markdown', 'Retry copied Note Markdown only', () => this.copyRemote(this.current || local))]);
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
        if ((this.api.pendingAssetIds ? this.api.pendingAssetIds(note && note.body) : []).length) {
          throw new Error('Save or remove pending images before loading remote content; otherwise their local bytes could be detached from the Note body.');
        }
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
        const pendingIds = this.api.pendingAssetIds ? this.api.pendingAssetIds(local.body) : [];
        let prepared;
        try { prepared = await this._preparePendingAssets(local, bound, client); }
        catch (error) {
          throw this._attachFeedbackActions(error, [this._feedbackAction('retry-note-overwrite-assets', 'Retry failed image save', () => this.overwriteRemote(this.current || local))]);
        }
        local = this.api.markSaving(local, remote ? 'Explicitly overwriting the current bound remote base…' : 'Explicitly restoring the missing bound remote target…');
        await this.store.put(local);
        this.current = local;
        await this.refreshList();
        const content = this.api.encodeNoteMarkdown(prepared.remoteNote);
        try {
          const result = await client.saveVerified({
            path: bound.path,
            content,
            baseSha: remote ? remote.sha : '',
            message: `${remote ? 'Reconcile' : 'Restore'} linked Note ${local.title || local.id}`
          });
          local = this.api.markSavedVerified(prepared.remoteNote, { ...bound, ...result });
          const persisted = await this._persistRemoteState(local, remote ? 'Bound remote explicitly overwritten and verified by read-back.' : 'Missing bound remote explicitly restored and verified by read-back.');
          await this._finalizePendingAssets(local.id, pendingIds);
          return persisted;
        } catch (error) {
          local = error.kind === 'conflict'
            ? this.api.markConflict(local, error.message)
            : this.api.markSaveFailed(local, error.message);
          await this._persistRemoteState(local);
          const enriched = this._appendPartialResults(error, prepared.assets, { target: bound.path, status: 'failed', message: `Bound Note Markdown was not verified: ${String(error && error.message || error)}` });
          throw this._attachFeedbackActions(enriched, [this._feedbackAction('retry-note-overwrite-markdown', 'Retry bound Note Markdown only', () => this.overwriteRemote(this.current || local))]);
        }
      });
    }

    async deleteNote(id) {
      if (!id) return;
      if (typeof window !== 'undefined' && !window.confirm('Delete this local Note? Remote repository content is not deleted.')) return;
      await this.store.delete(id);
      if (this.pendingAssetStore && typeof this.pendingAssetStore.deleteForNote === 'function') await this.pendingAssetStore.deleteForNote(id);
      this.current = null;
      this.pendingAssets = [];
      this._disposeMediaLoader('note');
      this.noteRendered = null;
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

/* src/runtime-responsiveness.js */
(function (root, factory) {
  const exported = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = exported;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, exported);
  if (typeof exported.installLinkedNotesRuntimeResponsiveness === 'function') {
    exported.installLinkedNotesRuntimeResponsiveness(root.ObsLinkedNotes);
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function (root) {
  'use strict';

  const INSTALL_FLAG = '__obsLinkedNotesRuntimeResponsivenessV1';
  const CATEGORY_DEFINITION_FETCH_BYTE_LIMIT = 1024 * 1024;
  const CATEGORY_MEMBER_TARGET_LIMIT = 100;
  const CATEGORY_PARENT_VALIDATION_LIMIT = 20;

  function clone(value) {
    return value == null ? value : JSON.parse(JSON.stringify(value));
  }

  function githubError(api, kind, message, details = {}) {
    if (api && typeof api.GitHubClientError === 'function') return new api.GitHubClientError(kind, message, details);
    const error = new Error(message);
    error.kind = kind;
    error.details = details;
    return error;
  }

  function cancelledError(api, message = 'GitHub read cancelled by the user.') {
    return githubError(api, 'aborted', message);
  }

  function cleanNotesBasePath(api, value) {
    if (api && typeof api.cleanWorkspaceBasePath === 'function') return api.cleanWorkspaceBasePath(value);
    const text = String(value == null ? '' : value).replace(/\\/g, '/').trim() || 'prototype-fixtures/linked-notes';
    if (/^[a-zA-Z]:\//.test(text) || text.startsWith('/') || text.startsWith('//') || /^file:\/\//i.test(text)) throw new TypeError('GitHub base path must be repository-relative.');
    if (text.includes('://')) throw new TypeError('GitHub base path must not be a URL.');
    if (/[?#]/.test(text)) throw new TypeError('GitHub base path must not contain query or fragment syntax.');
    const parts = text.split('/');
    if (parts.some((segment) => !segment || segment === '.' || segment === '..')) throw new TypeError('GitHub base path contains an empty, . or .. segment.');
    return parts.join('/');
  }

  function createAbortableGmTransport(gmRequest, api = root.ObsLinkedNotes || {}) {
    if (typeof gmRequest !== 'function') throw new TypeError('GM_xmlhttpRequest is required.');
    const handles = new Set();
    let cancelled = false;
    let progressListener = null;
    let started = 0;
    let finished = 0;

    const progress = () => ({ started, finished, pending: Math.max(0, started - finished), cancelled });
    const emitProgress = () => {
      if (typeof progressListener !== 'function') return;
      try { progressListener(progress()); } catch (error) { /* UI progress must never break transport */ }
    };

    const transport = function transport(request = {}) {
      return new Promise((resolve, reject) => {
        if (cancelled) {
          reject(cancelledError(api));
          return;
        }
        let handle = null;
        let settled = false;
        started += 1;
        emitProgress();

        const finish = (callback, value) => {
          if (settled) return;
          settled = true;
          if (handle) handles.delete(handle);
          finished += 1;
          emitProgress();
          callback(value);
        };

        const details = {
          method: request.method,
          url: request.url,
          headers: request.headers,
          data: request.body,
          timeout: request.timeoutMs || 20000,
          responseType: request.responseType || 'text',
          onload(response) {
            finish(resolve, {
              status: response.status,
              text: response.responseText || '',
              response: response.response,
              headers: response.responseHeaders || ''
            });
          },
          ontimeout() {
            finish(reject, githubError(api, 'network_unknown', 'GitHub request timed out; remote state must be read before retrying.'));
          },
          onerror(error) {
            finish(reject, githubError(api, 'network_unknown', 'GitHub network request failed; remote state may be unknown.', { cause: error }));
          },
          onabort() {
            finish(reject, cancelled
              ? cancelledError(api)
              : githubError(api, 'network_unknown', 'GitHub request was aborted; remote state may be unknown.'));
          }
        };

        try {
          handle = gmRequest(details);
          if (!settled && handle && typeof handle.abort === 'function') handles.add(handle);
          if (cancelled && handle && typeof handle.abort === 'function') {
            try { handle.abort(); } catch (error) { finish(reject, cancelledError(api)); }
          }
        } catch (error) {
          finish(reject, error instanceof Error ? error : new Error(String(error)));
        }
      });
    };

    transport.abortAll = () => {
      cancelled = true;
      const pending = [...handles];
      for (const handle of pending) {
        try { handle.abort(); } catch (error) { /* onabort or a later request boundary reports cancellation */ }
      }
      emitProgress();
      return pending.length;
    };
    transport.setProgressListener = (listener) => {
      progressListener = typeof listener === 'function' ? listener : null;
      emitProgress();
    };
    transport.getProgress = progress;
    return transport;
  }

  function replaceCategoryDefinitionRecord(snapshot, record) {
    const source = snapshot && typeof snapshot === 'object' ? snapshot : {};
    const path = String(record && record.path || '').trim();
    if (!path) throw new Error('Verified category record requires a repository path.');
    const definitions = (Array.isArray(source.definitions) ? source.definitions : []).filter((item) => item && item.path !== path);
    definitions.push(clone(record));
    definitions.sort((left, right) => String(left.path || '').localeCompare(String(right.path || '')));
    return {
      definitions,
      diagnostics: (Array.isArray(source.diagnostics) ? source.diagnostics : []).filter((item) => !item || item.path !== path),
      fileValidation: clone(source.fileValidation && typeof source.fileValidation === 'object' ? source.fileValidation : {}),
      noteValidation: clone(source.noteValidation && typeof source.noteValidation === 'object' ? source.noteValidation : {}),
      groups: clone(source.groups && typeof source.groups === 'object' ? source.groups : {}),
      refreshedAt: String(source.refreshedAt || '')
    };
  }

  function cachedCategoryDefinition(entry, definitions) {
    const path = String(entry && entry.path || '');
    const sha = String(entry && entry.sha || '');
    if (!path || !sha) return null;
    const match = (Array.isArray(definitions) ? definitions : []).find((item) => item && item.path === path && String(item.sha || '') === sha && item.definition);
    return match ? clone(match) : null;
  }

  function boundedParentValidationGroups(targets, parentLimit = CATEGORY_PARENT_VALIDATION_LIMIT) {
    const groups = new Map();
    for (const target of Array.isArray(targets) ? targets : []) {
      if (!target || !target.path) continue;
      const path = String(target.path);
      const slash = path.lastIndexOf('/');
      const parent = slash >= 0 ? path.slice(0, slash) : '';
      const group = groups.get(parent) || [];
      group.push(target);
      groups.set(parent, group);
    }
    const entries = Array.from(groups.entries()).sort((left, right) => left[0].localeCompare(right[0]));
    const limit = Math.max(0, Number(parentLimit) || 0);
    return { selected: entries.slice(0, limit), deferred: entries.slice(limit), totalParents: entries.length };
  }

  function formatReadOperation(state = {}) {
    if (!state || !state.active) return '';
    const category = state.categoryProgress;
    if (category && category.message) return String(category.message);
    const network = state.network || {};
    const finished = Math.max(0, Number(network.finished) || 0);
    const started = Math.max(finished, Number(network.started) || 0);
    const suffix = started ? ` · requests ${finished}/${started}${network.pending ? ` · ${network.pending} active` : ''}` : '';
    return `${String(state.label || 'Repository read in progress')}${suffix}`;
  }

  function publicReadOperation(operation) {
    if (!operation) return null;
    return {
      active: true,
      kind: operation.kind,
      label: operation.label,
      cancelable: operation.cancelable !== false,
      cancelRequested: Boolean(operation.cancelRequested),
      network: clone(operation.network || { started: 0, finished: 0, pending: 0, cancelled: false }),
      categoryProgress: clone(operation.categoryProgress || null)
    };
  }

  function isCancellation(error, operation) {
    return Boolean(operation && operation.cancelRequested && error && error.kind === 'aborted');
  }

  function patchLinkedNotesApp(api) {
    const App = api && api.LinkedNotesApp;
    if (!App || !App.prototype || App.prototype.__obsRuntimeResponsivenessPatched) return false;
    Object.defineProperty(App.prototype, '__obsRuntimeResponsivenessPatched', { value: true, configurable: false });

    const originalClient = App.prototype._client;
    const originalRefreshCategories = App.prototype.refreshCategories;

    App.prototype._client = async function patchedClient(context) {
      const client = await originalClient.call(this, context);
      const operation = this.__obsReadOnlyOperation;
      const transport = client && client.transport;
      if (operation && transport && typeof transport.abortAll === 'function') {
        operation.transports.add(transport);
        if (operation.kind === 'notes' && typeof transport.setProgressListener === 'function') {
          transport.setProgressListener((network) => {
            if (this.__obsReadOnlyOperation !== operation) return;
            operation.network = network;
            const now = Date.now();
            if (now - operation.lastNetworkUiAt >= 120 || Number(network.pending || 0) === 0) {
              operation.lastNetworkUiAt = now;
              this._setUi({ readOperation: publicReadOperation(operation) });
            }
          });
        }
        if (operation.cancelRequested) transport.abortAll();
      }
      return client;
    };

    App.prototype.cancelReadOnlyOperation = function cancelReadOnlyOperation() {
      const operation = this.__obsReadOnlyOperation;
      if (!operation) return false;
      if (operation.cancelable === false) {
        this._setUi({
          readOperation: publicReadOperation(operation),
          status: `${operation.label} Local reconciliation has started, so cancellation is no longer offered.`
        });
        return false;
      }
      operation.cancelRequested = true;
      let aborted = 0;
      for (const transport of operation.transports) {
        if (transport && typeof transport.abortAll === 'function') aborted += Number(transport.abortAll() || 0);
      }
      this._setUi({
        readOperation: publicReadOperation(operation),
        status: aborted ? `Cancelling ${operation.label}…` : `Cancellation requested for ${operation.label}; stopping at the next read boundary.`
      });
      return true;
    };

    App.prototype._runCancelableRepositoryRead = async function runCancelableRepositoryRead(kind, label, work) {
      if (this.__obsReadOnlyOperation) throw new Error(`Read operation already in progress: ${this.__obsReadOnlyOperation.label}`);
      const priorOperationFeedback = new Map((Array.isArray(this.feedback) ? this.feedback : [])
        .filter((item) => item && /^operation-(?:notes|files|categories)$/.test(String(item.id || '')))
        .map((item) => [String(item.id), clone(item)]));
      const operation = {
        kind: String(kind || 'read'),
        label: String(label || 'Reading repository…'),
        cancelable: true,
        cancelRequested: false,
        transports: new Set(),
        network: { started: 0, finished: 0, pending: 0, cancelled: false },
        categoryProgress: null,
        priorOperationFeedback,
        lastNetworkUiAt: 0
      };
      this.__obsReadOnlyOperation = operation;
      this._setUi({ readOperation: publicReadOperation(operation) });
      try {
        const result = await work(operation);
        if (operation.cancelRequested && operation.cancelable !== false) throw cancelledError(this.api);
        return result;
      } catch (error) {
        if (!isCancellation(error, operation)) throw error;
        const currentFeedback = Array.isArray(this.feedback) ? this.feedback : [];
        const nonOperationFeedback = currentFeedback.filter((item) => !item || !/^operation-(?:notes|files|categories)$/.test(String(item.id || '')));
        this.feedback = [...nonOperationFeedback, ...operation.priorOperationFeedback.values()].map((item) => clone(item));
        this._setUi({ status: kind === 'categories'
          ? 'Category refresh cancelled. The previously verified category snapshot remains active.'
          : 'Notes refresh cancelled. No GitHub write was performed.' });
        return { cancelled: true };
      } finally {
        for (const transport of operation.transports) {
          if (transport && typeof transport.setProgressListener === 'function') transport.setProgressListener(null);
        }
        if (this.__obsReadOnlyOperation === operation) this.__obsReadOnlyOperation = null;
        this._setUi({ readOperation: null, categoryRefreshProgress: null });
      }
    };

    App.prototype.refreshRemoteWorkspace = function responsiveRefreshRemoteWorkspace() {
      return this._runCancelableRepositoryRead('notes', 'Reading Linked Notes from GitHub…', () => this._runRemoteOperation('Reading Linked Notes from the active GitHub workspace…', async () => {
        const workspace = this._activeWorkspace();
        if (!workspace) throw new Error('Select or create a GitHub workspace before refreshing GitHub.');
        const basePath = cleanNotesBasePath(this.api, workspace.basePath);
        this._throwIfRepositoryReadCancelled();
        const client = await this._client(workspace);
        const entries = await client.listDirectory(basePath, { missingAsEmpty: true, maxEntries: 100 });
        this._throwIfRepositoryReadCancelled();
        const markdownEntries = entries.filter((entry) => entry.type === 'file' && /\.md$/i.test(entry.name || entry.path));
        const maxBytes = 2 * 1024 * 1024;
        const listedBytes = markdownEntries.reduce((sum, entry) => sum + Number(entry.size || 0), 0);
        if (listedBytes > maxBytes) throw new Error(`GitHub Notes folder is too large for one explicit refresh: ${listedBytes} bytes exceeds ${maxBytes}.`);

        const summary = {
          discovered: markdownEntries.length,
          imported: 0,
          updated: 0,
          unchanged: 0,
          localAhead: 0,
          conflicts: 0,
          deleted: 0,
          skipped: 0,
          errors: 0
        };
        const seenPaths = new Set(markdownEntries.map((entry) => String(entry.path || '').replace(/\\/g, '/')));
        const initialLocalNotes = await this.store.list();
        const boundGroupsByPath = new Map();
        for (const local of initialLocalNotes) {
          const bound = this.api.normalizeRemote(local.remote);
          if (bound.owner === workspace.owner && bound.repo === workspace.repo && bound.branch === workspace.branch && bound.path) {
            const group = boundGroupsByPath.get(bound.path) || [];
            group.push(local);
            boundGroupsByPath.set(bound.path, group);
          }
        }
        const boundByPath = new Map();
        const duplicateLocalPaths = new Set();
        const duplicateLocalConflicts = [];
        const unsupportedPaths = new Set();
        const conflictIds = new Set();
        for (const [path, group] of boundGroupsByPath.entries()) {
          if (group.length === 1) {
            boundByPath.set(path, group[0]);
            continue;
          }
          duplicateLocalPaths.add(path);
          for (const local of group) duplicateLocalConflicts.push({ local, path });
        }

        const snapshots = [];
        let actualBytes = 0;
        for (const entry of markdownEntries) {
          this._throwIfRepositoryReadCancelled();
          try {
            const remoteFile = await client.read(entry.path);
            this._throwIfRepositoryReadCancelled();
            actualBytes += new TextEncoder().encode(remoteFile.content).byteLength;
            if (actualBytes > maxBytes) throw new Error(`GitHub Notes refresh exceeded the ${maxBytes}-byte content limit.`);
            if (!this.api.isLinkedNoteMarkdown(remoteFile.content)) {
              unsupportedPaths.add(remoteFile.path || entry.path);
              summary.skipped += 1;
              continue;
            }
            const decoded = this.api.decodeNoteMarkdown(remoteFile.content);
            snapshots.push({
              note: decoded,
              content: remoteFile.content,
              hash: await this.api.sha256Hex(remoteFile.content),
              target: {
                owner: workspace.owner,
                repo: workspace.repo,
                branch: workspace.branch,
                path: remoteFile.path || entry.path
              },
              sha: remoteFile.sha,
              htmlUrl: remoteFile.htmlUrl || entry.htmlUrl || ''
            });
          } catch (error) {
            if (error && error.kind === 'aborted') throw error;
            if (String(error && error.message || '').includes('content limit')) throw error;
            summary.errors += 1;
          }
        }

        this._throwIfRepositoryReadCancelled();
        this._lockReadOnlyOperationForLocalApply('Applying verified Notes refresh locally…');
        for (const { local, path } of duplicateLocalConflicts) {
          const conflicted = this.api.markConflict(local, `Several local Notes are bound to the same GitHub path ${path}. GitHub refresh cannot select one identity automatically.`);
          await this.store.put(conflicted);
          if (this.current && this.current.id === conflicted.id) this.current = conflicted;
          conflictIds.add(conflicted.id);
          summary.conflicts += 1;
        }
        const snapshotsById = new Map();
        for (const snapshot of snapshots) {
          const group = snapshotsById.get(snapshot.note.id) || [];
          group.push(snapshot);
          snapshotsById.set(snapshot.note.id, group);
        }

        for (const [noteId, group] of snapshotsById.entries()) {
          const local = await this.store.get(noteId);
          if (group.length > 1) {
            const affected = new Map();
            if (local) affected.set(local.id, local);
            for (const snapshot of group) {
              for (const boundLocal of boundGroupsByPath.get(snapshot.target.path) || []) affected.set(boundLocal.id, boundLocal);
            }
            if (affected.size === 0) summary.conflicts += 1;
            for (const affectedLocal of affected.values()) {
              const conflicted = this.api.markConflict(affectedLocal, `GitHub refresh found ${group.length} files with the same stable Note id ${noteId}. No file was selected automatically.`);
              await this.store.put(conflicted);
              if (this.current && this.current.id === conflicted.id) this.current = conflicted;
              if (!conflictIds.has(conflicted.id)) summary.conflicts += 1;
              conflictIds.add(conflicted.id);
            }
            summary.skipped += group.length;
            continue;
          }

          const snapshot = group[0];
          if (duplicateLocalPaths.has(snapshot.target.path)) {
            summary.skipped += 1;
            continue;
          }
          const pathBoundLocal = boundByPath.get(snapshot.target.path);
          if (pathBoundLocal && pathBoundLocal.id !== noteId) {
            const conflicted = this.api.markConflict(pathBoundLocal, `GitHub refresh found stable Note id ${noteId} at ${snapshot.target.path}, but that path is already bound locally to ${pathBoundLocal.id}.`);
            await this.store.put(conflicted);
            if (this.current && this.current.id === conflicted.id) this.current = conflicted;
            conflictIds.add(conflicted.id);
            summary.conflicts += 1;
            summary.skipped += 1;
            continue;
          }
          const localContentHash = local ? await this.api.sha256Hex(this.api.encodeNoteMarkdown(local)) : '';
          const decision = this.api.classifyRemoteNote({ local, remote: snapshot, localContentHash });
          let next = local;
          if (decision.action === this.api.REMOTE_RECONCILE_ACTIONS.REMOTE_IMPORT) {
            next = this.api.createNote({ id: snapshot.note.id, title: snapshot.note.title, body: snapshot.note.body, links: snapshot.note.links, codecExtra: snapshot.note.codecExtra });
            next = this.api.markSavedVerified(next, { ...snapshot.target, sha: snapshot.sha, verifiedHash: snapshot.hash, htmlUrl: snapshot.htmlUrl });
            summary.imported += 1;
          } else if (decision.action === this.api.REMOTE_RECONCILE_ACTIONS.FAST_FORWARD) {
            next = this.api.updateNote(local, { title: snapshot.note.title, body: snapshot.note.body, links: snapshot.note.links, codecExtra: snapshot.note.codecExtra });
            next = this.api.markSavedVerified(next, { ...snapshot.target, sha: snapshot.sha, verifiedHash: snapshot.hash, htmlUrl: snapshot.htmlUrl });
            summary.updated += 1;
          } else if (decision.action === this.api.REMOTE_RECONCILE_ACTIONS.UNCHANGED || decision.action === this.api.REMOTE_RECONCILE_ACTIONS.ATTACH_EXISTING) {
            next = this.api.markSavedVerified(local, { ...snapshot.target, sha: snapshot.sha, verifiedHash: snapshot.hash, htmlUrl: snapshot.htmlUrl });
            summary.unchanged += 1;
          } else if (decision.action === this.api.REMOTE_RECONCILE_ACTIONS.LOCAL_AHEAD) {
            summary.localAhead += 1;
          } else {
            next = this.api.markConflict(local, `GitHub refresh conflict for ${snapshot.target.path}: ${decision.reason}`);
            summary.conflicts += 1;
          }
          if (next && next !== local) {
            await this.store.put(next);
            if (this.current && this.current.id === next.id) this.current = next;
          }
        }

        for (const path of unsupportedPaths) {
          const local = boundByPath.get(path);
          if (!local || conflictIds.has(local.id)) continue;
          const conflicted = this.api.markConflict(local, `The bound GitHub file ${path} is no longer valid obs-linked-note:v1 Markdown. Local content was preserved.`);
          await this.store.put(conflicted);
          if (this.current && this.current.id === conflicted.id) this.current = conflicted;
          conflictIds.add(conflicted.id);
          summary.conflicts += 1;
        }

        const localNotes = await this.store.list();
        for (const local of localNotes) {
          if (conflictIds.has(local.id)) continue;
          if (!this.api.boundNoteMissingFromSnapshot(local, workspace, basePath, seenPaths)) continue;
          const deleted = this.api.markRemoteDeleted(local, 'The bound GitHub Note is no longer present in the active workspace folder. Local content was preserved.');
          await this.store.put(deleted);
          if (this.current && this.current.id === deleted.id) this.current = deleted;
          summary.deleted += 1;
        }

        const summaryText = `found ${summary.discovered}; imported ${summary.imported}; updated ${summary.updated}; unchanged ${summary.unchanged}; local ahead ${summary.localAhead}; conflicts ${summary.conflicts}; deleted ${summary.deleted}; skipped ${summary.skipped}; errors ${summary.errors}`;
        await this.refreshList();
        this._setUi({ remoteRefreshSummary: summaryText, status: `GitHub refresh complete: ${summaryText}. No remote writes were performed.` });
        return summary;
      }));
    };

    App.prototype.refreshCategories = function responsiveRefreshCategories() {
      return this._runCancelableRepositoryRead('categories', 'Reading categories from GitHub…', () => originalRefreshCategories.call(this));
    };

    App.prototype._setCategoryRefreshProgress = function setCategoryRefreshProgress(progress) {
      const operation = this.__obsReadOnlyOperation;
      if (!operation || operation.kind !== 'categories') return;
      operation.categoryProgress = progress ? clone(progress) : null;
      this._setUi({ categoryRefreshProgress: clone(progress || null), readOperation: publicReadOperation(operation) });
    };

    App.prototype._throwIfRepositoryReadCancelled = function throwIfRepositoryReadCancelled() {
      const operation = this.__obsReadOnlyOperation;
      if (operation && operation.cancelRequested) throw cancelledError(this.api);
    };

    App.prototype._lockReadOnlyOperationForLocalApply = function lockReadOnlyOperationForLocalApply(label) {
      const operation = this.__obsReadOnlyOperation;
      if (!operation) return false;
      this._throwIfRepositoryReadCancelled();
      operation.cancelable = false;
      if (label) operation.label = String(label);
      this._setUi({ readOperation: publicReadOperation(operation) });
      return true;
    };

    App.prototype._applyVerifiedCategoryRecord = async function applyVerifiedCategoryRecord(record, workspace = this._activeWorkspace()) {
      if (!workspace) throw new Error('Select or create a GitHub workspace first.');
      const contextKey = this._categoryContextKey(workspace);
      const active = this._activeWorkspace();
      if (!active || this._categoryContextKey(active) !== contextKey) throw new Error('Workspace repository target changed before the verified category result could be applied.');
      const next = replaceCategoryDefinitionRecord(this.categorySnapshot, record);
      next.refreshedAt = new Date().toISOString();
      if (this.categoryStore) {
        if (typeof this.categoryStore.saveDefinitions === 'function') await this.categoryStore.saveDefinitions(contextKey, next);
        else await this.categoryStore.save(contextKey, next);
      }
      this.categorySnapshot = next;
      this.categoryContextWorkspaceId = workspace.id;
      this.categoryContextKey = contextKey;
      this.categoryContextsRequiringRefresh.delete(contextKey);
      this.categoryContextRequiresRefresh = false;
      this.categoryIndex = this.api.buildRepositoryCategoryIndex(next.definitions, { fileValidation: next.fileValidation, noteValidation: next.noteValidation });
      if (this.selectedCategoryId && !this.categoryIndex.categories.has(this.selectedCategoryId)) this.selectedCategoryId = '';
      if (this.repositoryPreview && this.repositoryPreview.path && this._sameRepositoryContext(this.repositoryPreview.context, workspace) && this.categoryIndex.explicitCategoryIdsForTarget) {
        this.fileCategoryDraftIds = this.categoryIndex.explicitCategoryIdsForTarget('file', this.repositoryPreview.path);
      }
      if (typeof this._hydrateNoteCategoryIntentsFromIndex === 'function') await this._hydrateNoteCategoryIntentsFromIndex(workspace);
      return this.categoryIndex.categories.get(record.definition && record.definition.id) || null;
    };

    App.prototype._refreshCategoriesUnlocked = async function responsiveCategoryRefresh(client, workspace) {
      const contextKey = this._categoryContextKey(workspace);
      const basePath = this._categoryBasePath(workspace);
      this._throwIfRepositoryReadCancelled();
      this._setCategoryRefreshProgress({ phase: 'listing', current: 0, total: 1, message: `Listing ${basePath}…` });
      const entries = await client.listDirectory(basePath, { missingAsEmpty: true, maxEntries: 100 });
      const markdownEntries = entries.filter((entry) => entry.type === 'file' && /\.md$/i.test(entry.name || entry.path));
      const previousDefinitions = this.categorySnapshot && this.categorySnapshot.definitions || [];
      const definitions = [];
      const diagnostics = [];
      let skipped = 0;
      let fetchedBytes = 0;
      let cachedCount = 0;
      let fetchedCount = 0;

      for (let index = 0; index < markdownEntries.length; index += 1) {
        this._throwIfRepositoryReadCancelled();
        const entry = markdownEntries[index];
        if (index === 0 || (index + 1) % 5 === 0 || index + 1 === markdownEntries.length) {
          this._setCategoryRefreshProgress({
            phase: 'definitions', current: index + 1, total: markdownEntries.length,
            message: `Categories: definitions ${index + 1}/${markdownEntries.length} · cached ${cachedCount} · fetched ${fetchedCount}`
          });
        }
        const cached = cachedCategoryDefinition(entry, previousDefinitions);
        if (cached) {
          definitions.push(cached);
          cachedCount += 1;
          continue;
        }
        if (Number(entry.size || 0) > CATEGORY_DEFINITION_FETCH_BYTE_LIMIT) {
          skipped += 1;
          diagnostics.push({ kind: 'oversized_definition', path: entry.path, message: `Category definition exceeds the ${CATEGORY_DEFINITION_FETCH_BYTE_LIMIT}-byte refresh limit.` });
          continue;
        }
        try {
          const file = await client.read(entry.path);
          this._throwIfRepositoryReadCancelled();
          const bytes = new TextEncoder().encode(file.content).byteLength;
          if (fetchedBytes + bytes > CATEGORY_DEFINITION_FETCH_BYTE_LIMIT) {
            const error = new Error(`Category refresh changed-definition reads exceeded the ${CATEGORY_DEFINITION_FETCH_BYTE_LIMIT}-byte prototype limit.`);
            error.kind = 'limit_exceeded';
            throw error;
          }
          fetchedBytes += bytes;
          fetchedCount += 1;
          if (!this.api.isCategoryDefinitionMarkdown(file.content)) {
            skipped += 1;
            diagnostics.push({ kind: 'ordinary_markdown_skipped', path: file.path, message: 'Markdown file has no obs-file-category marker and was skipped.' });
            continue;
          }
          try {
            definitions.push({ path: file.path, sha: file.sha, htmlUrl: file.htmlUrl, definition: this.api.decodeCategoryDefinition(file.content) });
          } catch (error) {
            diagnostics.push({ kind: 'malformed_definition', path: file.path, message: String(error && error.message || error) });
          }
        } catch (error) {
          if (error && (error.kind === 'aborted' || error.kind === 'limit_exceeded')) throw error;
          diagnostics.push({ kind: 'definition_read_error', path: entry.path, message: String(error && error.message || error), errorKind: String(error && error.kind || '') });
        }
      }

      const initialIndex = this.api.buildRepositoryCategoryIndex(definitions);
      const memberEntries = Array.from(initialIndex.memberships.values());
      const uniqueTargets = [];
      const seenTargets = new Set();
      for (const entry of memberEntries) {
        const key = `${entry.type}:${entry.path}`;
        if (seenTargets.has(key)) continue;
        seenTargets.add(key);
        uniqueTargets.push({ type: entry.type, path: entry.path });
      }
      uniqueTargets.sort((left, right) => left.path.localeCompare(right.path) || left.type.localeCompare(right.type));
      const selectedTargets = uniqueTargets.slice(0, CATEGORY_MEMBER_TARGET_LIMIT);
      const fileValidation = {};
      const noteValidation = {};
      const groups = boundedParentValidationGroups(selectedTargets, CATEGORY_PARENT_VALIDATION_LIMIT);

      let validatedParents = 0;
      for (const [parent, targets] of groups.selected) {
        this._throwIfRepositoryReadCancelled();
        validatedParents += 1;
        this._setCategoryRefreshProgress({
          phase: 'validation', current: validatedParents, total: groups.selected.length,
          message: `Categories: validating parent folders ${validatedParents}/${groups.selected.length} · ${parent || '/'}`
        });
        try {
          const directoryEntries = await client.listDirectory(parent, { missingAsEmpty: true, maxEntries: 200 });
          this._throwIfRepositoryReadCancelled();
          const files = new Set(directoryEntries.filter((entry) => entry.type === 'file').map((entry) => entry.path));
          for (const target of targets) {
            const targetMap = target.type === 'note' ? noteValidation : fileValidation;
            targetMap[target.path] = files.has(target.path)
              ? { status: 'verified', message: target.type === 'note' ? 'Repository Note file exists.' : 'Repository file exists.' }
              : { status: 'missing', message: `${target.type === 'note' ? 'Repository Note' : 'Repository file'} does not exist: ${target.path}.` };
          }
        } catch (error) {
          if (error && error.kind === 'aborted') throw error;
          for (const target of targets) {
            const targetMap = target.type === 'note' ? noteValidation : fileValidation;
            targetMap[target.path] = { status: 'inaccessible', message: String(error && error.message || error) };
          }
        }
      }

      for (const [, targets] of groups.deferred) {
        for (const target of targets) {
          const targetMap = target.type === 'note' ? noteValidation : fileValidation;
          targetMap[target.path] = { status: 'unchecked', message: `Target was not checked because the ${CATEGORY_PARENT_VALIDATION_LIMIT}-parent validation request limit was reached.` };
        }
      }
      if (groups.deferred.length) {
        diagnostics.push({
          kind: 'incomplete_parent_validation', path: basePath,
          message: `Validated ${groups.selected.length} of ${groups.totalParents} unique parent folders; remaining membership targets are visible as unchecked.`
        });
      }
      if (uniqueTargets.length > CATEGORY_MEMBER_TARGET_LIMIT) {
        for (const target of uniqueTargets.slice(CATEGORY_MEMBER_TARGET_LIMIT)) {
          const targetMap = target.type === 'note' ? noteValidation : fileValidation;
          targetMap[target.path] = { status: 'unchecked', message: `Target was not checked because the ${CATEGORY_MEMBER_TARGET_LIMIT}-target validation limit was reached.` };
        }
        diagnostics.push({ kind: 'incomplete_member_validation', path: basePath, message: `Validated at most ${CATEGORY_MEMBER_TARGET_LIMIT} of ${uniqueTargets.length} unique file/Note category targets.` });
      }

      this._throwIfRepositoryReadCancelled();
      this._lockReadOnlyOperationForLocalApply('Applying verified category refresh locally…');
      const refreshedAt = new Date().toISOString();
      const snapshot = {
        definitions,
        diagnostics,
        fileValidation,
        noteValidation,
        groups: this.categorySnapshot && this.categorySnapshot.groups || {},
        refreshedAt
      };
      this._setCategoryRefreshProgress({ phase: 'cache', current: 1, total: 1, message: 'Categories: storing the verified derived snapshot locally…' });
      if (this.categoryStore) {
        if (typeof this.categoryStore.saveDefinitions === 'function') await this.categoryStore.saveDefinitions(contextKey, snapshot);
        else await this.categoryStore.save(contextKey, snapshot);
      }
      const currentWorkspace = this._activeWorkspace();
      if (!currentWorkspace || this._categoryContextKey(currentWorkspace) !== contextKey) throw new Error('Workspace repository target changed before category refresh completed. Results were not applied.');
      this.categorySnapshot = snapshot;
      this.categoryContextWorkspaceId = workspace.id;
      this.categoryContextKey = contextKey;
      this.categoryContextsRequiringRefresh.delete(contextKey);
      this.categoryContextRequiresRefresh = false;
      this.categoryIndex = this.api.buildRepositoryCategoryIndex(definitions, { fileValidation, noteValidation });
      if (this.selectedCategoryId && !this.categoryIndex.categories.has(this.selectedCategoryId)) this.selectedCategoryId = '';
      if (this.repositoryPreview && this.repositoryPreview.path && this._sameRepositoryContext(this.repositoryPreview.context, workspace) && this.categoryIndex.explicitCategoryIdsForTarget) {
        this.fileCategoryDraftIds = this.categoryIndex.explicitCategoryIdsForTarget('file', this.repositoryPreview.path);
      }
      await this._hydrateNoteCategoryIntentsFromIndex(workspace);
      this.surface = 'categories';
      const issueCount = diagnostics.length + this.categoryIndex.errors.length;
      const summary = `definitions ${definitions.length}; cached ${cachedCount}; fetched ${fetchedCount}; skipped ${skipped}; issues ${issueCount}; validated targets ${Math.min(uniqueTargets.length, CATEGORY_MEMBER_TARGET_LIMIT)}/${uniqueTargets.length}; parent reads ${groups.selected.length}/${groups.totalParents}`;
      this._setUi({ categoryRefreshSummary: summary, status: `Category refresh complete: ${summary}. No remote writes were performed.` });
      return { definitions: definitions.length, cached: cachedCount, fetched: fetchedCount, skipped, errors: diagnostics.length, modelErrors: this.categoryIndex.errors.length, diagnostics: [...diagnostics, ...this.categoryIndex.errors] };
    };

    App.prototype.saveCategory = function responsiveSaveCategory(input = {}) {
      return this._runRemoteOperation('Saving and verifying category definition…', async () => {
        const workspace = this._requireCategoryContext();
        const client = await this._client(workspace);
        const id = this.api.normalizeCategoryId(input.id || input.name);
        const existing = this._categoryDefinitionRecord(id);
        const path = existing ? existing.path : `${this._categoryBasePath(workspace)}/${this.api.categoryFileName(id)}`;
        if (!existing) {
          try {
            await this._repositoryEntryMetadata(client, path);
            throw new Error(`Category target already exists and was not overwritten: ${path}`);
          } catch (error) {
            if (error.kind !== 'not_found') throw error;
          }
        }
        const previous = existing ? existing.definition : { files: [], notes: [], impliedCategories: [] };
        const requestedImplied = this._categoryLinksForIds(path, input.impliedCategoryIds || []);
        const unresolvedPrevious = (previous.impliedCategories || []).filter((link) => {
          try {
            const targetPath = this.api.normalizeRepositoryTarget(path, link.target).path;
            return !this.categoryIndex.byPath.has(targetPath);
          } catch (error) { return true; }
        });
        const impliedCategories = [...requestedImplied];
        for (const link of unresolvedPrevious) if (!impliedCategories.some((item) => item.target === link.target)) impliedCategories.push(link);
        const selectedTargets = Array.isArray(input.selectedTargets) ? input.selectedTargets : this.categoryDraftTargets;
        const members = await this._categoryMemberLinks(path, selectedTargets, workspace);
        const content = this.api.encodeCategoryDefinition({
          id,
          name: input.name,
          description: input.description,
          impliedCategories,
          files: members.files,
          notes: members.notes
        });
        const verified = await client.saveVerified({
          path,
          content,
          baseSha: existing ? existing.sha : '',
          message: `${existing ? 'Update' : 'Create'} repository category ${input.name || id}`
        });
        const definition = this.api.decodeCategoryDefinition(content);
        await this._applyVerifiedCategoryRecord({ path: verified.path || path, sha: verified.sha || '', htmlUrl: verified.htmlUrl || '', definition }, workspace);
        this.selectedCategoryId = id;
        const saved = this.categoryIndex.categories.get(id);
        this.categoryDraftTargets = saved ? [
          ...(saved.explicitFiles || []).map((item) => ({ type: 'file', path: item.path, name: item.label || item.path, label: item.label || item.path })),
          ...(saved.explicitNotes || []).map((item) => ({ type: 'note', path: item.path, noteId: item.noteId || '', name: item.label || item.path, label: item.label || item.path }))
        ] : [];
        if (input.group !== undefined) await this.setCategoryGroup(id, input.group, { silent: true });
        this.feedback = this.feedback.filter((item) => item.scope !== 'categories');
        this._pushFeedback({ id: 'category-save-success', scope: 'categories', severity: 'success', title: 'Category saved', message: `${input.name || id} and ${this.categoryDraftTargets.length} membership target(s) were verified by read-back. Full category refresh was not required.` });
        this._setUi({ replaceCategoryEditor: true, status: `Category ${input.name || id} saved and verified; local category index updated from the verified definition.` });
        return saved;
      });
    };

    App.prototype._writeCategoryMembership = async function responsiveWriteCategoryMembership(categoryId, filePath, remove) {
      const workspace = this._requireCategoryContext();
      const record = this._categoryDefinitionRecord(categoryId);
      if (!record) throw new Error(`Category not found: ${categoryId}. Refresh categories first.`);
      const canonicalFile = remove
        ? this.api.normalizeCanonicalRepositoryPath(filePath, 'Categorized repository file')
        : this._assertCategoryAssignmentTarget(filePath, workspace);
      const kept = [];
      let found = false;
      for (const link of record.definition.files || []) {
        let resolved = '';
        try { resolved = this.api.normalizeRepositoryTarget(record.path, link.target).path; } catch (error) { kept.push(link); continue; }
        if (resolved === canonicalFile) { found = true; if (!remove) kept.push(link); }
        else kept.push(link);
      }
      if (remove && !found) return record.indexed;
      if (!remove && !found) kept.push({ label: canonicalFile.slice(canonicalFile.lastIndexOf('/') + 1), target: this.api.repositoryRelativePath(record.path, canonicalFile) });
      const content = this.api.encodeCategoryDefinition({
        id: record.definition.id,
        name: record.definition.name,
        description: record.definition.description,
        impliedCategories: record.definition.impliedCategories,
        files: kept,
        notes: record.definition.notes || []
      });
      const client = await this._client(workspace);
      const verified = await client.saveVerified({
        path: record.path,
        content,
        baseSha: record.sha,
        message: `${remove ? 'Remove' : 'Add'} ${canonicalFile} ${remove ? 'from' : 'to'} category ${record.definition.name}`
      });
      await this._applyVerifiedCategoryRecord({ path: verified.path || record.path, sha: verified.sha || '', htmlUrl: verified.htmlUrl || record.htmlUrl || '', definition: this.api.decodeCategoryDefinition(content) }, workspace);
      this.selectedCategoryId = categoryId;
      this._setUi({ status: `${canonicalFile} ${remove ? 'removed from' : 'assigned to'} ${record.definition.name}; verified definition applied locally without a full category refresh.` });
      return this.categoryIndex.categories.get(categoryId);
    };

    App.prototype.applyFileCategories = function responsiveApplyFileCategories(filePath, ids = this.fileCategoryDraftIds) {
      return this._runRemoteOperation('Applying file category memberships…', async () => {
        const workspace = this._requireCategoryContext();
        const canonical = this._assertCategoryAssignmentTarget(filePath, workspace);
        const desiredList = this.api.normalizeCategoryIds
          ? this.api.normalizeCategoryIds(ids)
          : [...new Set((Array.isArray(ids) ? ids : []).map((id) => String(id || '').trim()).filter(Boolean))];
        for (const id of desiredList) if (!this.categoryIndex.categories.has(id)) throw new Error(`Category not found: ${id}. Refresh categories first.`);
        const desired = new Set(desiredList);
        const current = new Set(this.categoryIndex.explicitCategoryIdsForTarget ? this.categoryIndex.explicitCategoryIdsForTarget('file', canonical) : []);
        const changes = [...new Set([...desired, ...current])].filter((id) => desired.has(id) !== current.has(id));
        const results = [];
        for (const categoryId of changes) {
          try {
            await this._writeCategoryMembership(categoryId, canonical, !desired.has(categoryId));
            results.push({ target: categoryId, status: 'completed', message: desired.has(categoryId) ? 'File assigned and verified.' : 'File unassigned and verified.' });
          } catch (error) {
            results.push({ target: categoryId, status: 'failed', message: String(error && error.message || error) });
          }
        }
        const failures = results.filter((result) => result.status === 'failed');
        const explicit = this.categoryIndex.explicitCategoryIdsForTarget ? this.categoryIndex.explicitCategoryIdsForTarget('file', canonical) : [];
        this.fileCategoryDraftIds = failures.length ? desiredList : explicit;
        this.surface = 'files';
        if (failures.length) {
          const error = new Error(`${failures.length} file category update(s) failed. Completed changes remain verified; the requested selection is preserved for review/retry.`);
          error.kind = 'partial_category_update';
          error.partialResults = results;
          throw error;
        }
        this._setUi({ replaceFileCategoryIds: true, status: changes.length ? `${changes.length} file category membership change(s) verified; local category index updated without a full refresh.` : 'File category memberships were already up to date.' });
        return results;
      });
    };

    App.prototype._setNoteMembershipInCategory = async function responsiveSetNoteMembership(categoryId, note, shouldInclude, client, workspace) {
      const record = this._categoryDefinitionRecord(categoryId);
      if (!record) throw new Error(`Category not found: ${categoryId}. Refresh categories first.`);
      const remoteNote = this.api.normalizeRemote(note.remote);
      if (!this.api.hasRemoteTargetIdentity(remoteNote) || !this._sameRepositoryContext(remoteNote, workspace)) throw new Error(`Note ${note.title || note.id} is not verified in the active category repository and branch.`);
      const latestFile = await client.read(record.path);
      const definition = this.api.decodeCategoryDefinition(latestFile.content);
      const kept = [];
      let found = false;
      for (const link of definition.notes || []) {
        let resolved = '';
        try { resolved = this.api.normalizeRepositoryTarget(record.path, link.target).path; } catch (error) { kept.push(link); continue; }
        if (resolved === remoteNote.path) { found = true; if (shouldInclude) kept.push({ ...link, noteId: note.id, label: note.title || note.id }); }
        else kept.push(link);
      }
      if (shouldInclude && !found) kept.push({ label: note.title || note.id, target: this.api.repositoryRelativePath(record.path, remoteNote.path), noteId: note.id });
      if (!shouldInclude && !found) {
        await this._applyVerifiedCategoryRecord({ path: latestFile.path || record.path, sha: latestFile.sha || '', htmlUrl: latestFile.htmlUrl || record.htmlUrl || '', definition }, workspace);
        return { target: categoryId, status: 'unchanged', message: 'Note was not an explicit member.' };
      }
      const content = this.api.encodeCategoryDefinition({
        id: definition.id,
        name: definition.name,
        description: definition.description,
        impliedCategories: definition.impliedCategories || [],
        files: definition.files || [],
        notes: kept
      });
      if (content === latestFile.content) {
        await this._applyVerifiedCategoryRecord({ path: latestFile.path || record.path, sha: latestFile.sha || '', htmlUrl: latestFile.htmlUrl || record.htmlUrl || '', definition }, workspace);
        return { target: categoryId, status: 'unchanged', message: 'Membership already matched.' };
      }
      const verified = await client.saveVerified({
        path: record.path,
        content,
        baseSha: latestFile.sha,
        message: `${shouldInclude ? 'Add' : 'Remove'} Note ${note.title || note.id} ${shouldInclude ? 'to' : 'from'} category ${definition.name}`
      });
      await this._applyVerifiedCategoryRecord({ path: verified.path || record.path, sha: verified.sha || '', htmlUrl: verified.htmlUrl || latestFile.htmlUrl || '', definition: this.api.decodeCategoryDefinition(content) }, workspace);
      return { target: categoryId, status: 'completed', message: shouldInclude ? 'Note assigned and verified.' : 'Note unassigned and verified.' };
    };

    App.prototype._syncNoteCategories = async function responsiveSyncNoteCategories(note) {
      const desired = new Set(this.api.normalizeCategoryIds ? this.api.normalizeCategoryIds(note.categoryIds) : (note.categoryIds || []));
      const categoryContextCurrent = Boolean(
        this.categoryContextKey
        && !this.categoryContextRequiresRefresh
        && this.categoryContextKey === this._categoryContextKey(this._activeWorkspace())
      );
      if (!desired.size && !categoryContextCurrent) return [];
      if (!this.categoryIndex || !this.categoryIndex.explicitCategoryIdsForTarget) return [];
      const workspace = this._requireCategoryContext();
      const remote = this.api.normalizeRemote(note.remote);
      if (!this.api.hasRemoteTargetIdentity(remote) || !this._sameRepositoryContext(remote, workspace)) throw new Error('Note category membership requires a verified Note in the active repository and branch.');
      const current = new Set(this.categoryIndex.explicitCategoryIdsForTarget('note', remote.path));
      const changes = [...new Set([...desired, ...current])].filter((id) => desired.has(id) !== current.has(id));
      if (!changes.length) {
        if (note.categoryIntentPending) {
          const settled = this.api.updateNote(note, { categoryIntentPending: false });
          await this.store.put(settled);
          if (this.current && this.current.id === settled.id) this.current = settled;
        }
        return [];
      }
      const client = await this._client(workspace);
      const results = [];
      for (const categoryId of changes) {
        try { results.push(await this._setNoteMembershipInCategory(categoryId, note, desired.has(categoryId), client, workspace)); }
        catch (error) { results.push({ target: categoryId, status: 'failed', message: String(error && error.message || error) }); }
      }
      const failures = results.filter((result) => result.status === 'failed');
      if (failures.length) {
        const pending = this.api.updateNote(note, { categoryIntentPending: true });
        await this.store.put(pending);
        if (this.current && this.current.id === pending.id) this.current = pending;
        const error = new Error(`Note was saved, but ${failures.length} category membership update(s) failed.`);
        error.kind = 'partial_category_update';
        error.partialResults = results;
        throw error;
      }
      const settled = this.api.updateNote(note, { categoryIntentPending: false });
      await this.store.put(settled);
      if (this.current && this.current.id === settled.id) this.current = settled;
      return results;
    };

    return true;
  }

  function patchLinkedNotesUi(api) {
    const UI = api && api.LinkedNotesUI;
    if (!UI || !UI.prototype || UI.prototype.__obsRuntimeResponsivenessPatched) return false;
    Object.defineProperty(UI.prototype, '__obsRuntimeResponsivenessPatched', { value: true, configurable: false });
    const originalRender = UI.prototype.render;

    UI.prototype.render = function responsiveRender() {
      const result = originalRender.call(this);
      if (!this.shadow) return result;
      const busy = Boolean(this.state && this.state.busy);
      const operation = this.state && this.state.readOperation;
      const launcher = this.shadow.querySelector('[data-action="toggle"]');
      if (launcher) {
        launcher.disabled = false;
        launcher.textContent = busy ? 'Docs ⟳' : 'Docs';
        launcher.title = busy ? formatReadOperation(operation || { active: true, label: this.state.status || 'Repository operation in progress' }) : 'Repository Documentation Workspace';
        launcher.onclick = async () => {
          await this.persistAllDraftsNow();
          if (!this.open && !busy) await this._call('onOpen');
          this.open = !this.open;
          this.render();
        };
      }
      this.shadow.querySelectorAll('[data-action="close"]').forEach((close) => {
        close.disabled = false;
        close.onclick = async () => {
          await this.persistAllDraftsNow();
          this.open = false;
          this.render();
        };
      });

      if (operation && operation.active) {
        const bar = this.shadow.querySelector('.workspace-bar');
        if (bar) {
          const row = (this.shadow.ownerDocument || document).createElement('div');
          row.dataset.runtimeOperation = 'true';
          row.style.gridColumn = '1 / -1';
          row.style.display = 'flex';
          row.style.alignItems = 'center';
          row.style.gap = '8px';
          row.style.minWidth = '0';
          const label = (this.shadow.ownerDocument || document).createElement('span');
          label.style.flex = '1 1 auto';
          label.style.minWidth = '0';
          label.style.overflow = 'hidden';
          label.style.textOverflow = 'ellipsis';
          label.style.whiteSpace = 'nowrap';
          label.style.color = 'var(--muted)';
          label.textContent = formatReadOperation(operation);
          row.appendChild(label);
          const cancel = (this.shadow.ownerDocument || document).createElement('button');
          cancel.dataset.runtimeCancelRead = 'true';
          cancel.textContent = operation.cancelRequested ? 'Cancelling…' : operation.cancelable === false ? 'Applying locally…' : 'Cancel read';
          cancel.disabled = Boolean(operation.cancelRequested || !operation.cancelable);
          cancel.onclick = () => this._call('onCancelReadOnlyOperation');
          row.appendChild(cancel);
          bar.appendChild(row);
        }
      }
      return result;
    };
    return true;
  }

  function patchMount(api) {
    if (!api || typeof api.mountLinkedNotesPrototype !== 'function' || api.mountLinkedNotesPrototype.__obsRuntimeResponsivenessPatched) return false;
    const originalMount = api.mountLinkedNotesPrototype;
    const wrapped = async function responsiveMountLinkedNotesPrototype(...args) {
      const app = await originalMount.apply(this, args);
      if (app && app.ui && app.ui.handlers) app.ui.handlers.onCancelReadOnlyOperation = () => app.cancelReadOnlyOperation();
      if (app && typeof app._setUi === 'function') app._setUi({ readOperation: null, categoryRefreshProgress: null });
      return app;
    };
    Object.defineProperty(wrapped, '__obsRuntimeResponsivenessPatched', { value: true });
    api.mountLinkedNotesPrototype = wrapped;
    return true;
  }

  function installLinkedNotesRuntimeResponsiveness(api = root.ObsLinkedNotes || {}) {
    if (!api) return false;
    if (!api[INSTALL_FLAG]) Object.defineProperty(api, INSTALL_FLAG, { value: true, configurable: false });
    api.createGmTransport = (gmRequest) => createAbortableGmTransport(gmRequest, api);
    const appPatched = patchLinkedNotesApp(api);
    const uiPatched = patchLinkedNotesUi(api);
    const mountPatched = patchMount(api);
    return Boolean(appPatched || uiPatched || mountPatched);
  }

  return {
    CATEGORY_DEFINITION_FETCH_BYTE_LIMIT,
    CATEGORY_MEMBER_TARGET_LIMIT,
    CATEGORY_PARENT_VALIDATION_LIMIT,
    createAbortableGmTransport,
    replaceCategoryDefinitionRecord,
    cachedCategoryDefinition,
    boundedParentValidationGroups,
    formatReadOperation,
    installLinkedNotesRuntimeResponsiveness
  };
});

/* src/repository-files-workspace-runtime.js */
(function (root, factory) {
  const api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
  if (root.ObsLinkedNotes && root.ObsLinkedNotes.LinkedNotesApp && root.ObsLinkedNotes.LinkedNotesUI) {
    try { api.installRepositoryFilesWorkspace(root.ObsLinkedNotes); } catch (error) { /* bootstrap reports failures later */ }
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function (root) {
  'use strict';

  const APP_PATCH = '__obsRepositoryFilesWorkspaceAppV1';
  const UI_PATCH = '__obsRepositoryFilesWorkspaceUiV1';
  const PREFS_STATE = 'filesWorkspacePreferences';
  const PREFS_KEY_STATE = 'filesWorkspacePreferencesKey';
  const DEFAULT_PREFS = { schemaVersion: 1, folderShortcuts: [], documentPresets: [] };
  const COPY_MAX_DIRECTORIES = 60;
  const TOP_POPUP_Z_INDEX = 2147483647;

  function apiOrThrow(app) {
    const api = app && app.api || root.ObsLinkedNotes || {};
    if (!api.normalizeFilesWorkspacePreferences || !api.workspaceFilesPreferenceKey) throw new Error('Repository Files workspace core is unavailable.');
    return api;
  }

  function templateApiOrThrow(app) {
    const api = apiOrThrow(app);
    if (!api.parseRepositoryFileTemplate || !api.isRepositoryFileTemplatePath || !api.finalizeRepositoryFileTemplates) throw new Error('Repository file template support is unavailable.');
    return api;
  }

  function errorText(error) {
    return String(error && error.message || error || 'Unknown error');
  }

  function notFound(error) {
    return Boolean(error && error.kind === 'not_found');
  }

  function sameJson(left, right) {
    return JSON.stringify(left) === JSON.stringify(right);
  }

  function publicFilesReadOperation(operation) {
    if (!operation) return null;
    const network = operation.network || { started: 0, finished: 0, pending: 0, cancelled: false };
    return {
      active: true,
      kind: operation.kind,
      label: operation.label,
      cancelable: operation.cancelable !== false,
      cancelRequested: Boolean(operation.cancelRequested),
      network: {
        started: Math.max(0, Number(network.started) || 0),
        finished: Math.max(0, Number(network.finished) || 0),
        pending: Math.max(0, Number(network.pending) || 0),
        cancelled: Boolean(network.cancelled)
      },
      categoryProgress: operation.categoryProgress ? { ...operation.categoryProgress } : null
    };
  }

  function patchApp(App) {
    if (!App || !App.prototype || App.prototype[APP_PATCH]) return false;
    Object.defineProperty(App.prototype, APP_PATCH, { value: true, configurable: false, enumerable: false, writable: false });
    const originalStart = App.prototype.start;
    const originalClient = App.prototype._client;
    const originalBrowseRepository = App.prototype.browseRepository;
    const originalBeginRepositoryFileCreate = App.prototype.beginRepositoryFileCreate;
    const originalCancelRepositoryEditor = App.prototype.cancelRepositoryEditor;
    const originalSaveRepositoryEditor = App.prototype.saveRepositoryEditor;
    const originalSelectWorkspace = App.prototype.selectWorkspace;
    const originalSaveWorkspace = App.prototype.saveWorkspace;
    const originalDeleteWorkspace = App.prototype.deleteWorkspace;
    const originalOpenPanel = App.prototype.openPanel;

    if (typeof originalClient === 'function') {
      App.prototype._client = async function filesWorkspaceClient(context) {
        const client = await originalClient.call(this, context);
        const operation = this.__obsReadOnlyOperation;
        const transport = client && client.transport;
        if (operation && operation.kind === 'files' && transport && typeof transport.setProgressListener === 'function') {
          transport.setProgressListener((network) => {
            if (this.__obsReadOnlyOperation !== operation) return;
            operation.network = network || { started: 0, finished: 0, pending: 0, cancelled: false };
            const now = Date.now();
            if (now - Number(operation.lastNetworkUiAt || 0) >= 120 || Number(operation.network.pending || 0) === 0) {
              operation.lastNetworkUiAt = now;
              this._setUi({ readOperation: publicFilesReadOperation(operation) });
            }
          });
        }
        return client;
      };
    }

    App.prototype._filesWorkspacePreferencesKey = function filesWorkspacePreferencesKey() {
      const workspace = this._activeWorkspace();
      if (!workspace) return '';
      return apiOrThrow(this).workspaceFilesPreferenceKey(workspace);
    };

    App.prototype._loadFilesWorkspacePreferences = async function loadFilesWorkspacePreferences(options = {}) {
      const api = apiOrThrow(this);
      const key = this._filesWorkspacePreferencesKey();
      const preferences = key ? api.normalizeFilesWorkspacePreferences(await this.getValue(key, DEFAULT_PREFS)) : { ...DEFAULT_PREFS };
      this.filesWorkspacePreferences = preferences;
      this.filesWorkspacePreferencesKey = key;
      if (!options.silent && typeof this._setUi === 'function') this._setUi({ [PREFS_STATE]: preferences, [PREFS_KEY_STATE]: key });
      return preferences;
    };

    App.prototype._saveFilesWorkspacePreferences = async function saveFilesWorkspacePreferences(preferences) {
      const api = apiOrThrow(this);
      const key = this._filesWorkspacePreferencesKey();
      if (!key) throw new Error('Select a GitHub workspace before saving Files preferences.');
      const normalized = api.normalizeFilesWorkspacePreferences(preferences);
      await this.setValue(key, normalized);
      this.filesWorkspacePreferences = normalized;
      this.filesWorkspacePreferencesKey = key;
      this._setUi({ [PREFS_STATE]: normalized, [PREFS_KEY_STATE]: key });
      return normalized;
    };

    App.prototype._ensureFilesWorkspacePreferencesCurrent = async function ensureFilesWorkspacePreferencesCurrent(options = {}) {
      const key = this._filesWorkspacePreferencesKey();
      if (this.filesWorkspacePreferencesKey === key && this.filesWorkspacePreferences) {
        if (!options.silent && typeof this._setUi === 'function') this._setUi({ [PREFS_STATE]: this.filesWorkspacePreferences, [PREFS_KEY_STATE]: key });
        return this.filesWorkspacePreferences;
      }
      return this._loadFilesWorkspacePreferences(options);
    };

    App.prototype._runFilesWorkspaceRead = async function runFilesWorkspaceRead(label, work) {
      const run = () => this._runRemoteOperation(label, work);
      if (typeof this._runCancelableRepositoryRead === 'function') {
        const result = await this._runCancelableRepositoryRead('files', label, run);
        if (result && result.cancelled) {
          this._setUi({ status: `Files read cancelled: ${String(label || 'repository read').replace(/…$/, '')}. No GitHub write was performed.` });
        }
        return result;
      }
      return run();
    };

    App.prototype._clearRepositoryFileTemplates = function clearRepositoryFileTemplates(options = {}) {
      const contextKey = this._filesWorkspacePreferencesKey();
      this.repositoryTemplatesContextKey = contextKey;
      this.repositoryTemplatesLoaded = false;
      this.repositoryTemplatesInitialized = false;
      this.repositoryTemplates = [];
      this.repositoryTemplateDiagnostics = [];
      this.repositoryTemplatesIncomplete = false;
      const patch = {
        repositoryTemplatesContextKey: contextKey,
        repositoryTemplatesLoaded: false,
        repositoryTemplatesInitialized: false,
        repositoryTemplates: [],
        repositoryTemplateDiagnostics: [],
        repositoryTemplatesIncomplete: false
      };
      if (!options.silent) this._setUi(patch);
      return patch;
    };

    App.prototype._ensureRepositoryFileTemplateContext = function ensureRepositoryFileTemplateContext(options = {}) {
      const contextKey = this._filesWorkspacePreferencesKey();
      if (this.repositoryTemplatesContextKey !== contextKey) this._clearRepositoryFileTemplates(options);
      return contextKey;
    };

    App.prototype._readRepositoryFileTemplatesUnlocked = async function readRepositoryFileTemplatesUnlocked(contextKey) {
      const api = templateApiOrThrow(this);
      const workspace = this._activeWorkspace();
      if (!workspace) throw new Error('Select a GitHub workspace before loading repository templates.');
      const rootPath = api.DEFAULT_REPOSITORY_TEMPLATE_ROOT || '.linked-notes/templates';
      const maxFiles = Math.max(1, Number(api.DEFAULT_REPOSITORY_TEMPLATE_MAX_FILES) || 100);
      const client = await this._client(workspace);
      let entries;
      try {
        entries = await client.listDirectory(rootPath, { maxEntries: 200 });
      } catch (error) {
        if (notFound(error)) return { contextKey, rootPath, initialized: false, loaded: true, incomplete: false, templates: [], diagnostics: [] };
        throw error;
      }
      const candidates = (Array.isArray(entries) ? entries : [])
        .filter((entry) => entry && entry.type === 'file' && api.isRepositoryFileTemplatePath(entry.path || `${rootPath}/${entry.name || ''}`))
        .map((entry) => ({ ...entry, path: String(entry.path || `${rootPath}/${entry.name || ''}`) }))
        .sort((left, right) => left.path.localeCompare(right.path));
      const diagnostics = [];
      const parsed = [];
      const selected = candidates.slice(0, maxFiles);
      const incomplete = candidates.length > maxFiles;
      if (incomplete) diagnostics.push({ path: rootPath, kind: 'template_limit', message: `Template discovery is incomplete: found ${candidates.length} candidate files, limit is ${maxFiles}.` });
      const maxBytes = this.api.DEFAULT_TEXT_FILE_MAX_BYTES || this.api.DEFAULT_PREVIEW_MAX_BYTES || (512 * 1024);
      for (const entry of selected) {
        try {
          const file = await client.readBytes(entry.path, { maxBytes });
          const text = this.api.decodeUtf8Bytes(file.bytes, { fatal: true, message: `Template is not valid UTF-8: ${entry.path}.` });
          const item = api.parseRepositoryFileTemplate(text, { path: entry.path, sha: file.sha || entry.sha || '' });
          parsed.push({ path: item.path, name: item.name, sha: item.sha });
        } catch (error) {
          diagnostics.push({ path: entry.path, kind: 'invalid_template', message: errorText(error) });
        }
      }
      const finalized = api.finalizeRepositoryFileTemplates(parsed);
      return {
        contextKey,
        rootPath,
        initialized: true,
        loaded: true,
        incomplete,
        templates: finalized.templates.map((item) => ({ path: item.path, name: item.name, sha: item.sha || '' })),
        diagnostics: [...diagnostics, ...finalized.diagnostics]
      };
    };

    App.prototype.loadRepositoryFileTemplates = async function loadRepositoryFileTemplates(force = false) {
      const contextKey = this._ensureRepositoryFileTemplateContext({ silent: true });
      if (!contextKey) throw new Error('Select a GitHub workspace before loading repository templates.');
      if (!force && this.repositoryTemplatesLoaded && this.repositoryTemplatesContextKey === contextKey) {
        this._setUi({
          repositoryTemplatesContextKey: contextKey,
          repositoryTemplatesLoaded: true,
          repositoryTemplatesInitialized: Boolean(this.repositoryTemplatesInitialized),
          repositoryTemplates: [...(this.repositoryTemplates || [])],
          repositoryTemplateDiagnostics: [...(this.repositoryTemplateDiagnostics || [])],
          repositoryTemplatesIncomplete: Boolean(this.repositoryTemplatesIncomplete)
        });
        return { templates: [...(this.repositoryTemplates || [])], diagnostics: [...(this.repositoryTemplateDiagnostics || [])], initialized: Boolean(this.repositoryTemplatesInitialized), incomplete: Boolean(this.repositoryTemplatesIncomplete) };
      }
      const result = await this._runFilesWorkspaceRead('Reading repository templates…', () => this._readRepositoryFileTemplatesUnlocked(contextKey));
      if (!result || result.cancelled) return result;
      if (this._filesWorkspacePreferencesKey() !== contextKey) return { cancelled: true, staleContext: true };
      this.repositoryTemplatesContextKey = contextKey;
      this.repositoryTemplatesLoaded = true;
      this.repositoryTemplatesInitialized = Boolean(result.initialized);
      this.repositoryTemplates = [...(result.templates || [])];
      this.repositoryTemplateDiagnostics = [...(result.diagnostics || [])];
      this.repositoryTemplatesIncomplete = Boolean(result.incomplete);
      const status = !result.initialized
        ? `Repository templates are not initialized in this workspace. Expected ${result.rootPath}. No GitHub write was performed.`
        : `Loaded ${this.repositoryTemplates.length} repository template(s) from ${result.rootPath}${this.repositoryTemplateDiagnostics.length ? `; ${this.repositoryTemplateDiagnostics.length} diagnostic(s)` : ''}. No GitHub write was performed.`;
      this._setUi({
        repositoryTemplatesContextKey: contextKey,
        repositoryTemplatesLoaded: true,
        repositoryTemplatesInitialized: this.repositoryTemplatesInitialized,
        repositoryTemplates: [...this.repositoryTemplates],
        repositoryTemplateDiagnostics: [...this.repositoryTemplateDiagnostics],
        repositoryTemplatesIncomplete: this.repositoryTemplatesIncomplete,
        status
      });
      return result;
    };

    App.prototype.beginRepositoryFileCreateFromTemplate = async function beginRepositoryFileCreateFromTemplate(path = '') {
      if (!path || path === 'blank') {
        this.__pendingRepositoryDocumentPreset = null;
        return originalBeginRepositoryFileCreate.call(this);
      }
      const api = templateApiOrThrow(this);
      const templatePath = api.normalizeRepositoryFileTemplateCandidatePath(path);
      const contextKey = this._ensureRepositoryFileTemplateContext({ silent: true });
      const workspace = this._activeWorkspace();
      if (!workspace || !contextKey) throw new Error('Select a GitHub workspace before using repository templates.');
      const result = await this._runFilesWorkspaceRead('Reading repository template…', async () => {
        const client = await this._client(workspace);
        const maxBytes = this.api.DEFAULT_TEXT_FILE_MAX_BYTES || this.api.DEFAULT_PREVIEW_MAX_BYTES || (512 * 1024);
        const file = await client.readBytes(templatePath, { maxBytes });
        const text = this.api.decodeUtf8Bytes(file.bytes, { fatal: true, message: `Template is not valid UTF-8: ${templatePath}.` });
        const template = api.parseRepositoryFileTemplate(text, { path: templatePath, sha: file.sha || '' });
        if (this._filesWorkspacePreferencesKey() !== contextKey) throw new Error('Workspace changed while the repository template was being read. Open New file again.');
        originalBeginRepositoryFileCreate.call(this);
        this.repositoryEditor = { ...this.repositoryEditor, content: template.body };
        this.__pendingRepositoryDocumentPreset = null;
        this._setUi({ replaceFileEditor: true, status: `New file from template ${template.name}. obs-template metadata was removed and the template body was copied literally. No GitHub write was performed.` });
        return { ...this.repositoryEditor, repositoryTemplate: { path: template.path, name: template.name, sha: template.sha } };
      });
      return result;
    };

    App.prototype.openRepositoryTemplatesFolder = async function openRepositoryTemplatesFolder() {
      const api = templateApiOrThrow(this);
      return this.browseRepository(api.DEFAULT_REPOSITORY_TEMPLATE_ROOT || '.linked-notes/templates');
    };

    App.prototype.addRepositoryFolderShortcut = async function addRepositoryFolderShortcut(name) {
      const api = apiOrThrow(this);
      const path = api.normalizeFilesWorkspacePath(this.repositoryPath || '', { allowRoot: true });
      if (!path) throw new Error('Repository root already has a built-in shortcut. Open a folder first.');
      const preferences = await this._loadFilesWorkspacePreferences({ silent: true });
      const shortcut = api.normalizeFolderShortcut({ name, path });
      const next = { ...preferences, folderShortcuts: api.upsertFilesWorkspacePreferenceItem(preferences.folderShortcuts, shortcut) };
      await this._saveFilesWorkspacePreferences(next);
      this._setUi({ status: `Folder shortcut saved: ${shortcut.name} → ${shortcut.path}.` });
      return shortcut;
    };

    App.prototype.removeRepositoryFolderShortcut = async function removeRepositoryFolderShortcut(id) {
      const preferences = await this._loadFilesWorkspacePreferences({ silent: true });
      const next = { ...preferences, folderShortcuts: preferences.folderShortcuts.filter((item) => item.id !== String(id || '')) };
      await this._saveFilesWorkspacePreferences(next);
      this._setUi({ status: 'Folder shortcut removed.' });
      return next;
    };

    App.prototype.saveRepositoryDocumentPreset = async function saveRepositoryDocumentPreset(input) {
      const api = apiOrThrow(this);
      const preferences = await this._loadFilesWorkspacePreferences({ silent: true });
      const preset = api.normalizeDocumentPreset(input);
      const next = { ...preferences, documentPresets: api.upsertFilesWorkspacePreferenceItem(preferences.documentPresets, preset) };
      await this._saveFilesWorkspacePreferences(next);
      this._setUi({ status: `Document preset saved: ${preset.name}.` });
      return preset;
    };

    App.prototype.removeRepositoryDocumentPreset = async function removeRepositoryDocumentPreset(id) {
      const preferences = await this._loadFilesWorkspacePreferences({ silent: true });
      const next = { ...preferences, documentPresets: preferences.documentPresets.filter((item) => item.id !== String(id || '')) };
      await this._saveFilesWorkspacePreferences(next);
      this._setUi({ status: 'Document preset removed.' });
      return next;
    };

    App.prototype._repositoryFilesLocationPendingEntry = async function repositoryFilesLocationPendingEntry(path) {
      if (!path) return { type: 'dir', path: '', name: '' };
      if (typeof this._ensureReferenceObjectLocalStateCurrent === 'function') await this._ensureReferenceObjectLocalStateCurrent({ silent: true });
      const files = this.referenceObjectLocalState && Array.isArray(this.referenceObjectLocalState.files) ? this.referenceObjectLocalState.files : [];
      if (files.some((item) => item && item.path === path)) return { type: 'file', path, name: path.slice(path.lastIndexOf('/') + 1), localRepositoryChange: true };
      if (files.some((item) => item && typeof item.path === 'string' && item.path.startsWith(`${path}/`))) return { type: 'dir', path, name: path.slice(path.lastIndexOf('/') + 1), localRepositoryChange: true };
      return null;
    };

    App.prototype._resolveRepositoryFilesLocation = async function resolveRepositoryFilesLocation(value) {
      const api = apiOrThrow(this);
      const raw = String(value == null ? '' : value).trim();
      const path = raw === '/' || raw === '' ? '' : api.normalizeFilesWorkspacePath(raw, { allowRoot: false, label: 'Repository location' });
      if (!path) return { type: 'dir', path: '', name: '' };
      const current = (Array.isArray(this.repositoryEntries) ? this.repositoryEntries : []).find((entry) => entry && entry.path === path);
      if (current) return { ...current };
      const pending = await this._repositoryFilesLocationPendingEntry(path);
      if (pending) return pending;
      const workspace = this._activeWorkspace();
      if (!workspace) throw new Error('Select a GitHub workspace first.');
      const parent = api.repositoryFilesWorkspacePathParent(path);
      const resolve = async () => {
        const client = await this._client(workspace);
        let entries = [];
        try { entries = await client.listDirectory(parent, { maxEntries: 200 }); }
        catch (error) { if (!notFound(error)) throw error; }
        return (entries || []).find((entry) => entry && entry.path === path) || null;
      };
      const entry = await this._runFilesWorkspaceRead('Resolving repository location…', resolve);
      if (entry && entry.cancelled) return entry;
      if (!entry) {
        const error = new Error(`Repository path not found: ${path}.`);
        error.kind = 'not_found';
        throw error;
      }
      return entry;
    };

    App.prototype._openResolvedRepositoryFilesLocation = async function openResolvedRepositoryFilesLocation(entry) {
      const api = apiOrThrow(this);
      if (!entry || entry.cancelled) return entry;
      const path = api.normalizeFilesWorkspacePath(entry.path || '', { allowRoot: true, label: 'Repository location' });
      if (!path || entry.type === 'dir') return this.browseRepository(path);
      const parent = api.repositoryFilesWorkspacePathParent(path);
      const previousSuppress = Boolean(this.__suppressFolderIndexAutoOpen);
      this.__suppressFolderIndexAutoOpen = true;
      try { await this.browseRepository(parent); }
      finally { this.__suppressFolderIndexAutoOpen = previousSuppress; }
      const listed = (Array.isArray(this.repositoryEntries) ? this.repositoryEntries : []).find((item) => item && item.path === path && item.type !== 'dir');
      return this.openRepositoryEntry(listed || entry);
    };

    App.prototype.navigateRepositoryFilesLocation = async function navigateRepositoryFilesLocation(kind, value = '') {
      if (kind === 'linked-notes') {
        if (typeof this.setSurface === 'function') return this.setSurface('notes');
        this.surface = 'notes';
        this._setUi({ status: 'Linked Notes opened.' });
        return 'notes';
      }
      const workspace = this._activeWorkspace();
      if (!workspace) throw new Error('Select a GitHub workspace first.');
      if (kind === 'path') {
        const entry = await this._resolveRepositoryFilesLocation(value);
        return this._openResolvedRepositoryFilesLocation(entry);
      }
      let path = '';
      if (kind === 'notes') path = String(workspace.basePath || '').trim();
      else if (kind === 'shortcut') {
        const preferences = await this._loadFilesWorkspacePreferences({ silent: true });
        const shortcut = preferences.folderShortcuts.find((item) => item.id === String(value || ''));
        if (!shortcut) throw new Error('Folder shortcut no longer exists.');
        path = shortcut.path;
      }
      return this.browseRepository(path);
    };

    App.prototype.beginRepositoryFileCreateFromPreset = async function beginRepositoryFileCreateFromPreset(id) {
      if (!id || id === 'blank') {
        this.__pendingRepositoryDocumentPreset = null;
        return originalBeginRepositoryFileCreate.call(this);
      }
      const api = apiOrThrow(this);
      const preferences = await this._loadFilesWorkspacePreferences({ silent: true });
      const preset = preferences.documentPresets.find((item) => item.id === String(id));
      if (!preset) throw new Error('Document preset no longer exists.');
      return this._runRemoteOperation('Reading document template…', async () => {
        const workspace = this._activeWorkspace();
        if (!workspace) throw new Error('Select a GitHub workspace first.');
        const client = await this._client(workspace);
        const maxBytes = this.api.DEFAULT_TEXT_FILE_MAX_BYTES || this.api.DEFAULT_PREVIEW_MAX_BYTES || (512 * 1024);
        const file = await client.readBytes(preset.templatePath, { maxBytes });
        const content = this.api.decodeUtf8Bytes(file.bytes, { fatal: true, message: `Template is not valid UTF-8: ${preset.templatePath}.` });
        originalBeginRepositoryFileCreate.call(this);
        this.repositoryEditor = { ...this.repositoryEditor, content };
        this.__pendingRepositoryDocumentPreset = { ...preset, templateSha: file.sha || '' };
        this._setUi({ replaceFileEditor: true, status: `New file from ${preset.name}. Template ${preset.templatePath} copied literally; category ${preset.categoryId} will be applied after verified file creation.` });
        return this.repositoryEditor;
      });
    };

    App.prototype.copyRepositoryFileLink = async function copyRepositoryFileLink() {
      const api = apiOrThrow(this);
      const preview = this.repositoryPreview;
      if (!preview || !preview.path) throw new Error('Open a repository file first.');
      const markdown = api.repositoryRootFileMarkdownLink(preview.path, preview.name || '');
      await this.clipboardWriter(markdown);
      this._setUi({ status: `Copied file link for ${preview.path}. No GitHub request was made.` });
      return markdown;
    };

    App.prototype._listRepositoryDirectoriesForWorkspaceRead = async function listRepositoryDirectoriesForWorkspaceRead(path = '') {
      const api = apiOrThrow(this);
      const workspace = this._activeWorkspace();
      if (!workspace) throw new Error('Select a GitHub workspace first.');
      const canonical = api.normalizeFilesWorkspacePath(path, { allowRoot: true });
      const client = await this._client(workspace);
      const entries = await client.listDirectory(canonical, { maxEntries: 200 });
      return {
        path: canonical,
        directories: entries.filter((entry) => entry.type === 'dir').sort((a, b) => String(a.name || '').localeCompare(String(b.name || '')))
      };
    };

    App.prototype.listRepositoryDirectoriesForWorkspace = function listRepositoryDirectoriesForWorkspace(path = '') {
      return this._runFilesWorkspaceRead('Reading repository folders…', () => this._listRepositoryDirectoriesForWorkspaceRead(path));
    };

    App.prototype._previewRepositoryStructureRead = async function previewRepositoryStructureRead(text) {
      const api = apiOrThrow(this);
      const workspace = this._activeWorkspace();
      if (!workspace) throw new Error('Select a GitHub workspace first.');
      const parsed = api.parseRepositoryStructure(text, { basePath: this.repositoryPath || '', maxNodes: api.DEFAULT_STRUCTURE_MAX_NODES || 100 });
      const client = await this._client(workspace);
      const statuses = [];
      let blocked = false;
      const existingFolders = new Set();
      for (const folderPath of parsed.folders) {
        try {
          await client.listDirectory(folderPath, { maxEntries: 200 });
          existingFolders.add(folderPath);
          statuses.push({ type: 'folder', path: folderPath, status: 'exists', message: 'Folder already exists; it will be reused.' });
        } catch (error) {
          if (notFound(error)) statuses.push({ type: 'folder', path: folderPath, status: 'create', message: 'Folder will be created implicitly by its first file.' });
          else {
            blocked = true;
            statuses.push({ type: 'folder', path: folderPath, status: 'blocked', message: errorText(error) });
          }
        }
      }
      for (const filePath of parsed.files) {
        try {
          const current = await client.readMetadata(filePath);
          blocked = true;
          statuses.push({ type: 'file', path: filePath, status: 'conflict', message: `Existing file will not be overwritten${current && current.sha ? ` (${current.sha})` : ''}.` });
        } catch (error) {
          if (notFound(error)) statuses.push({ type: 'file', path: filePath, status: 'create', message: 'Empty file will be created.' });
          else { blocked = true; statuses.push({ type: 'file', path: filePath, status: 'blocked', message: errorText(error) }); }
        }
      }
      const placeholders = parsed.leafFolders.filter((path) => !existingFolders.has(path)).map((path) => `${path}/.gitkeep`);
      for (const placeholderPath of placeholders) {
        try {
          const current = await client.readMetadata(placeholderPath);
          blocked = true;
          statuses.push({ type: 'placeholder', path: placeholderPath, status: 'conflict', message: `Placeholder already exists and will not be overwritten${current && current.sha ? ` (${current.sha})` : ''}.` });
        } catch (error) {
          if (notFound(error)) statuses.push({ type: 'placeholder', path: placeholderPath, status: 'create', message: 'Empty .gitkeep will make the empty leaf folder repository-visible.' });
          else { blocked = true; statuses.push({ type: 'placeholder', path: placeholderPath, status: 'blocked', message: errorText(error) }); }
        }
      }
      return {
        kind: 'repository-structure-plan-v1',
        workspace: { owner: workspace.owner, repo: workspace.repo, branch: workspace.branch },
        basePath: parsed.basePath,
        source: parsed.source,
        files: parsed.files,
        folders: parsed.folders,
        placeholders,
        statuses,
        blocked
      };
    };

    App.prototype.previewRepositoryStructure = function previewRepositoryStructure(text) {
      return this._runFilesWorkspaceRead('Previewing repository structure…', () => this._previewRepositoryStructureRead(text));
    };

    App.prototype.applyRepositoryStructure = async function applyRepositoryStructure(plan) {
      const api = apiOrThrow(this);
      if (!plan || plan.kind !== 'repository-structure-plan-v1') throw new Error('Prepare a repository structure preview first.');
      return this._runRemoteOperation('Creating repository structure…', async () => {
        const workspace = this._activeWorkspace();
        if (!workspace) throw new Error('Select a GitHub workspace first.');
        if (!this._sameRepositoryContext(workspace, plan.workspace)) throw new Error('Workspace changed after structure preview. Preview again.');
        const fresh = await this._previewRepositoryStructureRead(plan.source);
        if (fresh.blocked) {
          const error = new Error('Repository structure has conflicts or blocked targets. Existing content was not changed.');
          error.kind = 'structure_conflict';
          error.partialResults = fresh.statuses;
          throw error;
        }
        if (!sameJson(fresh.files, plan.files) || !sameJson(fresh.placeholders, plan.placeholders)) throw new Error('Repository structure plan changed. Preview again.');
        const client = await this._client(workspace);
        const results = [];
        const targets = [...fresh.files.map((path) => ({ type: 'file', path })), ...fresh.placeholders.map((path) => ({ type: 'placeholder', path }))];
        for (const target of targets) {
          const parentPath = api.repositoryFilesWorkspacePathParent(target.path);
          const name = api.repositoryFilesWorkspacePathName(target.path);
          try {
            const result = await this.api.saveRepositoryTextFile({
              client,
              normalizePath: (value) => api.normalizeFilesWorkspacePath(value, { allowRoot: false }),
              mode: 'create', parentPath, name, content: '', maxBytes: 8
            });
            this._markCategoryContextStaleForRepositoryPath(result.path, workspace);
            results.push({ target: result.path, status: 'completed', message: 'Created and exact read-back verified.' });
          } catch (error) {
            results.push({ target: target.path, status: 'failed', message: errorText(error) });
            const partial = new Error(`Repository structure creation stopped after ${results.filter((item) => item.status === 'completed').length} verified write(s). Existing and completed files were not deleted or overwritten.`);
            partial.kind = 'partial_structure_create';
            partial.partialResults = results;
            throw partial;
          }
        }
        const current = api.normalizeFilesWorkspacePath(this.repositoryPath || '', { allowRoot: true });
        const entries = await client.listDirectory(current, { maxEntries: 200 });
        this.repositoryEntries = this.api.sortRepositoryEntries ? this.api.sortRepositoryEntries(entries) : entries;
        this.repositoryBrowseLoaded = true;
        this.surface = 'files';
        this._setUi({ status: `Repository structure created: ${results.length} verified empty file write(s); no existing file was changed.` });
        return results;
      });
    };

    App.prototype._collectRepositoryCopySources = async function collectRepositoryCopySources(client, sourceType, sourcePath) {
      const api = apiOrThrow(this);
      const maxFiles = api.DEFAULT_COPY_MAX_FILES || 100;
      const maxBytes = api.DEFAULT_COPY_MAX_BYTES || (10 * 1024 * 1024);
      if (sourceType === 'file') {
        const file = await client.readMetadata(sourcePath);
        if (!file || file.type !== 'file') throw new Error(`Copy source is not a file: ${sourcePath}.`);
        if (Number(file.size || 0) > maxBytes) throw new Error(`Copy source exceeds the ${maxBytes}-byte copy limit.`);
        return [{ path: sourcePath, sha: String(file.sha || ''), size: Number(file.size || 0) }];
      }
      const queue = [sourcePath];
      const files = [];
      let directories = 0;
      let totalBytes = 0;
      while (queue.length) {
        const folder = queue.shift();
        directories += 1;
        if (directories > COPY_MAX_DIRECTORIES) throw new Error(`Copy traversal exceeds the ${COPY_MAX_DIRECTORIES}-folder limit.`);
        const entries = await client.listDirectory(folder, { maxEntries: 200 });
        for (const entry of entries) {
          if (entry.type === 'dir') queue.push(entry.path);
          else if (entry.type === 'file') {
            files.push({ path: entry.path, sha: String(entry.sha || ''), size: Number(entry.size || 0) });
            totalBytes += Number(entry.size || 0);
            if (files.length > maxFiles) throw new Error(`Copy source contains more than ${maxFiles} files.`);
            if (totalBytes > maxBytes) throw new Error(`Copy source exceeds the ${maxBytes}-byte aggregate copy limit.`);
          }
        }
      }
      if (!files.length) throw new Error('Copy source folder contains no repository files.');
      return files.sort((a, b) => a.path.localeCompare(b.path));
    };

    App.prototype._previewRepositoryCopyRead = async function previewRepositoryCopyRead(input = {}) {
      const api = apiOrThrow(this);
      const workspace = this._activeWorkspace();
      if (!workspace) throw new Error('Select a GitHub workspace first.');
      const sourceType = input.sourceType === 'folder' ? 'folder' : 'file';
      const sourcePath = api.normalizeFilesWorkspacePath(input.sourcePath, { allowRoot: false, label: 'Copy source' });
      const destinationFolder = api.normalizeFilesWorkspacePath(input.destinationFolder || '', { allowRoot: true, label: 'Copy destination folder' });
      const destinationName = String(input.destinationName || '').trim() || api.repositoryFilesWorkspacePathName(sourcePath);
      if (!destinationName || /[\\/?#\u0000-\u001f\u007f]/.test(destinationName) || destinationName === '.' || destinationName === '..') throw new Error('Copy destination name must be one valid repository path segment.');
      const destinationRoot = destinationFolder ? `${destinationFolder}/${destinationName}` : destinationName;
      if (sourceType === 'folder' && (destinationRoot === sourcePath || destinationRoot.startsWith(`${sourcePath}/`))) throw new Error('A folder cannot be copied into itself or one of its descendants.');
      const client = await this._client(workspace);
      const sources = await this._collectRepositoryCopySources(client, sourceType, sourcePath);
      const mappings = sources.map((source) => ({
        sourcePath: source.path,
        sourceSha: source.sha,
        size: source.size,
        destinationPath: sourceType === 'file' ? destinationRoot : api.copyDestinationPath(sourcePath, destinationRoot, source.path)
      }));
      const statuses = [];
      let blocked = false;
      if (sourceType === 'folder') {
        try {
          await client.listDirectory(destinationRoot, { maxEntries: 200 });
          blocked = true;
          statuses.push({ target: destinationRoot, status: 'conflict', message: 'Destination folder already exists; add-only folder copy does not merge into an existing folder.' });
        } catch (error) {
          if (!notFound(error)) {
            try {
              const current = await client.readMetadata(destinationRoot);
              blocked = true;
              statuses.push({ target: destinationRoot, status: 'conflict', message: `Destination path already exists as a file and will not be overwritten${current && current.sha ? ` (${current.sha})` : ''}.` });
            } catch (metadataError) {
              if (!notFound(metadataError)) {
                blocked = true;
                statuses.push({ target: destinationRoot, status: 'blocked', message: `Unable to prove the destination root is absent: ${errorText(metadataError)}` });
              }
            }
          }
        }
      }
      const destinationParents = new Set();
      for (const mapping of mappings) {
        let parent = api.repositoryFilesWorkspacePathParent(mapping.destinationPath);
        while (parent) {
          destinationParents.add(parent);
          if (parent === destinationFolder) break;
          parent = api.repositoryFilesWorkspacePathParent(parent);
        }
      }
      for (const parent of [...destinationParents].sort()) {
        try {
          await client.listDirectory(parent, { maxEntries: 200 });
        } catch (error) {
          if (!notFound(error)) {
            blocked = true;
            statuses.push({ target: parent, status: 'blocked', message: `Destination parent is not a usable directory: ${errorText(error)}` });
          }
        }
      }
      for (const mapping of mappings) {
        try {
          const current = await client.readMetadata(mapping.destinationPath);
          blocked = true;
          statuses.push({ target: mapping.destinationPath, status: 'conflict', message: `Destination exists and will not be overwritten${current && current.sha ? ` (${current.sha})` : ''}.` });
        } catch (error) {
          if (notFound(error)) statuses.push({ target: mapping.destinationPath, status: 'create', message: 'Destination is absent.' });
          else { blocked = true; statuses.push({ target: mapping.destinationPath, status: 'blocked', message: errorText(error) }); }
        }
      }
      return {
        kind: 'repository-copy-plan-v1',
        workspace: { owner: workspace.owner, repo: workspace.repo, branch: workspace.branch },
        sourceType, sourcePath, destinationFolder, destinationName, destinationRoot, mappings, statuses, blocked,
        totalBytes: mappings.reduce((sum, item) => sum + Number(item.size || 0), 0)
      };
    };

    App.prototype.previewRepositoryCopy = function previewRepositoryCopy(input = {}) {
      return this._runFilesWorkspaceRead('Previewing repository copy…', () => this._previewRepositoryCopyRead(input));
    };

    App.prototype.applyRepositoryCopy = async function applyRepositoryCopy(plan) {
      if (!plan || plan.kind !== 'repository-copy-plan-v1') throw new Error('Prepare a repository copy preview first.');
      return this._runRemoteOperation('Copying repository content…', async () => {
        const workspace = this._activeWorkspace();
        if (!workspace) throw new Error('Select a GitHub workspace first.');
        if (!this._sameRepositoryContext(workspace, plan.workspace)) throw new Error('Workspace changed after copy preview. Preview again.');
        const fresh = await this._previewRepositoryCopyRead(plan);
        if (fresh.blocked) {
          const error = new Error('Copy destination contains conflicts or blocked paths. Nothing was written.');
          error.kind = 'copy_conflict';
          error.partialResults = fresh.statuses;
          throw error;
        }
        const originalShape = plan.mappings.map((item) => [item.sourcePath, item.sourceSha, item.destinationPath]);
        const freshShape = fresh.mappings.map((item) => [item.sourcePath, item.sourceSha, item.destinationPath]);
        if (!sameJson(originalShape, freshShape)) throw new Error('Copy source or destination plan changed. Preview again.');
        const client = await this._client(workspace);
        for (const mapping of fresh.mappings) {
          try {
            await client.readMetadata(mapping.destinationPath);
            throw new Error(`Copy destination appeared after preflight: ${mapping.destinationPath}.`);
          } catch (error) {
            if (!notFound(error)) throw error;
          }
        }
        const results = [];
        let transferredBytes = 0;
        for (const mapping of fresh.mappings) {
          try {
            const metadata = await client.readMetadata(mapping.sourcePath);
            if (String(metadata.sha || '') !== mapping.sourceSha) throw new Error(`Copy source changed after preview: ${mapping.sourcePath}.`);
            const remaining = Math.max(1, (this.api.DEFAULT_COPY_MAX_BYTES || (10 * 1024 * 1024)) - transferredBytes);
            const source = await client.readBytes(mapping.sourcePath, { maxBytes: remaining });
            if (String(source.sha || '') !== mapping.sourceSha) throw new Error(`Copy source changed while reading bytes: ${mapping.sourcePath}.`);
            const result = await client.saveBytesVerified({ path: mapping.destinationPath, bytes: source.bytes, baseSha: '', message: `Copy repository file to ${mapping.destinationPath}` });
            transferredBytes += source.bytes.byteLength;
            this._markCategoryContextStaleForRepositoryPath(mapping.destinationPath, workspace);
            results.push({ target: mapping.destinationPath, status: 'completed', message: `Copied ${source.bytes.byteLength} bytes and verified exact read-back.` });
          } catch (error) {
            results.push({ target: mapping.destinationPath, status: 'failed', message: errorText(error) });
            const partial = new Error(`Repository copy stopped after ${results.filter((item) => item.status === 'completed').length} verified file(s). Completed copies remain; no destination was overwritten or deleted.`);
            partial.kind = 'partial_repository_copy';
            partial.partialResults = results;
            throw partial;
          }
        }
        const current = apiOrThrow(this).normalizeFilesWorkspacePath(this.repositoryPath || '', { allowRoot: true });
        const entries = await client.listDirectory(current, { maxEntries: 200 });
        this.repositoryEntries = this.api.sortRepositoryEntries ? this.api.sortRepositoryEntries(entries) : entries;
        this.repositoryBrowseLoaded = true;
        this.surface = 'files';
        this._setUi({ status: `Repository copy complete: ${results.length} file(s), ${transferredBytes} byte(s), exact read-back verified.` });
        return results;
      });
    };

    if (typeof originalSelectWorkspace === 'function') {
      App.prototype.selectWorkspace = async function filesWorkspaceSelectWorkspace(...args) {
        const result = await originalSelectWorkspace.apply(this, args);
        await this._loadFilesWorkspacePreferences();
        this._clearRepositoryFileTemplates();
        return result;
      };
    }

    if (typeof originalSaveWorkspace === 'function') {
      App.prototype.saveWorkspace = async function filesWorkspaceSaveWorkspace(...args) {
        const result = await originalSaveWorkspace.apply(this, args);
        await this._loadFilesWorkspacePreferences();
        this._clearRepositoryFileTemplates();
        return result;
      };
    }

    if (typeof originalDeleteWorkspace === 'function') {
      App.prototype.deleteWorkspace = async function filesWorkspaceDeleteWorkspace(...args) {
        const result = await originalDeleteWorkspace.apply(this, args);
        await this._loadFilesWorkspacePreferences();
        this._clearRepositoryFileTemplates();
        return result;
      };
    }

    if (typeof originalOpenPanel === 'function') {
      App.prototype.openPanel = async function filesWorkspaceOpenPanel(...args) {
        const result = await originalOpenPanel.apply(this, args);
        await this._ensureFilesWorkspacePreferencesCurrent();
        this._ensureRepositoryFileTemplateContext();
        return result;
      };
    }

    App.prototype.start = async function filesWorkspaceStart(...args) {
      if (this.ui && this.ui.handlers) {
        Object.assign(this.ui.handlers, {
          onNavigateFilesLocation: (kind, value) => this.navigateRepositoryFilesLocation(kind, value),
          onEnsureFilesWorkspacePreferences: () => this._ensureFilesWorkspacePreferencesCurrent(),
          onAddRepositoryFolderShortcut: (name) => this.addRepositoryFolderShortcut(name),
          onRemoveRepositoryFolderShortcut: (id) => this.removeRepositoryFolderShortcut(id),
          onSaveRepositoryDocumentPreset: (input) => this.saveRepositoryDocumentPreset(input),
          onRemoveRepositoryDocumentPreset: (id) => this.removeRepositoryDocumentPreset(id),
          onBeginRepositoryFileCreateFromPreset: (id) => this.beginRepositoryFileCreateFromPreset(id),
          onLoadRepositoryFileTemplates: (force) => this.loadRepositoryFileTemplates(Boolean(force)),
          onBeginRepositoryFileCreateFromTemplate: (path) => this.beginRepositoryFileCreateFromTemplate(path),
          onOpenRepositoryTemplatesFolder: () => this.openRepositoryTemplatesFolder(),
          onCopyRepositoryFileLink: () => this.copyRepositoryFileLink(),
          onListRepositoryDirectories: (path) => this.listRepositoryDirectoriesForWorkspace(path),
          onPreviewRepositoryStructure: (text) => this.previewRepositoryStructure(text),
          onApplyRepositoryStructure: (plan) => this.applyRepositoryStructure(plan),
          onPreviewRepositoryCopy: (input) => this.previewRepositoryCopy(input),
          onApplyRepositoryCopy: (plan) => this.applyRepositoryCopy(plan)
        });
      }
      const result = await originalStart.apply(this, args);
      await this._loadFilesWorkspacePreferences();
      this._clearRepositoryFileTemplates();
      return result;
    };

    App.prototype.browseRepository = async function filesWorkspaceBrowseRepository(path = '', ...args) {
      const entries = await originalBrowseRepository.call(this, path, ...args);
      const api = apiOrThrow(this);
      const canonical = api.normalizeFilesWorkspacePath(this.repositoryPath || path || '', { allowRoot: true });
      if (!canonical || this.__suppressFolderIndexAutoOpen) return entries;
      const candidate = api.folderIndexCandidate(canonical);
      const indexEntry = Array.isArray(this.repositoryEntries)
        ? this.repositoryEntries.find((entry) => entry && entry.type === 'file' && entry.path === candidate)
        : null;
      if (indexEntry) await this.openRepositoryEntry(indexEntry);
      return entries;
    };

    App.prototype.cancelRepositoryEditor = function filesWorkspaceCancelRepositoryEditor(...args) {
      this.__pendingRepositoryDocumentPreset = null;
      return originalCancelRepositoryEditor.apply(this, args);
    };

    App.prototype.saveRepositoryEditor = async function filesWorkspaceSaveRepositoryEditor(input = {}) {
      const mode = input && input.mode || this.repositoryEditor && this.repositoryEditor.mode;
      const pendingPreset = mode === 'create' ? this.__pendingRepositoryDocumentPreset : null;
      const result = await originalSaveRepositoryEditor.call(this, input);
      if (!pendingPreset || !result || !result.path) return result;
      this.__pendingRepositoryDocumentPreset = null;
      try {
        if (!this.categoryIndex || !this.categoryIndex.categories || !this.categoryIndex.categories.has(pendingPreset.categoryId) || this.categoryContextRequiresRefresh) {
          await this.refreshCategories();
        }
        await this.applyFileCategories(result.path, [pendingPreset.categoryId]);
        this.surface = 'files';
        this._setUi({ status: `Created ${result.path} from ${pendingPreset.name}; category ${pendingPreset.categoryId} applied and verified.` });
        return { ...result, documentPreset: pendingPreset, categoryApplied: true };
      } catch (error) {
        const partial = new Error(`File ${result.path} was created and verified from ${pendingPreset.name}, but category ${pendingPreset.categoryId} was not fully applied: ${errorText(error)}`);
        partial.kind = 'partial_document_preset_create';
        partial.partialResults = [
          { target: result.path, status: 'completed', message: 'File created and exact read-back verified.' },
          { target: pendingPreset.categoryId, status: 'failed', message: errorText(error) }
        ];
        throw partial;
      }
    };

    return true;
  }

  function callHandlerDirect(ui, name, ...args) {
    const fn = ui && ui.handlers && ui.handlers[name];
    if (typeof fn !== 'function') return Promise.reject(new Error(`Files workspace handler is unavailable: ${name}.`));
    try { return Promise.resolve(fn(...args)); } catch (error) { return Promise.reject(error); }
  }

  function appendFilesWorkspaceStyle(ui) {
    if (!ui.shadow || ui.shadow.querySelector('style[data-files-workspace-style]')) return;
    const style = document.createElement('style');
    style.dataset.filesWorkspaceStyle = '1';
    style.textContent = `
      .files-workspace-menu { position: relative; display: inline-flex; }
      .files-workspace-menu > summary { cursor:pointer; display:inline-flex; align-items:center; min-height:34px; padding:6px 10px; border:1px solid var(--border); border-radius:7px; background:var(--surface); list-style:none; }
      .files-workspace-menu > summary::-webkit-details-marker { display:none; }
      .files-workspace-popup-layer { position:fixed; inset:0; z-index:${TOP_POPUP_Z_INDEX}; pointer-events:none; overflow:visible; color:var(--text); font:13px/1.4 system-ui,sans-serif; color-scheme:dark; }
      .files-workspace-popup-layer > .files-workspace-menu-panel,
      .files-workspace-popup-layer > .reference-objects-panel { position:fixed !important; pointer-events:auto; margin:0; }
      .files-workspace-menu-panel { position:absolute; z-index:48; top:calc(100% + 6px); left:0; min-width:260px; max-width:min(460px,80vw); max-height:420px; overflow:auto; display:grid; gap:6px; padding:8px; border:1px solid var(--border); border-radius:8px; background:var(--surface-2); box-shadow:0 12px 30px rgba(0,0,0,.45); }
      .files-workspace-menu-panel button { text-align:left; }
      .files-workspace-form { display:grid; gap:6px; padding-top:6px; border-top:1px solid var(--border); }
      .files-workspace-form input { width:100%; box-sizing:border-box; }
      .files-link-popover { position:fixed; z-index:2147483646; overflow:auto; display:grid; gap:7px; padding:8px; border:1px solid var(--border); border-radius:8px; background:var(--surface-2); box-shadow:0 12px 30px rgba(0,0,0,.55); }
      .files-link-list { display:grid; gap:3px; }
      .files-link-heading { width:100%; text-align:left; display:flex; gap:8px; align-items:center; white-space:normal; }
      .files-link-heading small { color:var(--muted); flex:0 0 auto; }
      .files-workspace-modal-backdrop { position:absolute; inset:0; z-index:2147483647; display:grid; place-items:center; padding:18px; background:rgba(0,0,0,.72); }
      .files-workspace-modal { width:min(760px,calc(100% - 16px)); max-height:calc(100% - 16px); overflow:auto; display:grid; gap:10px; padding:14px; border:1px solid var(--border); border-radius:10px; background:var(--surface-2); box-shadow:0 16px 46px rgba(0,0,0,.6); }
      .files-workspace-modal textarea { min-height:220px; resize:vertical; }
      .files-workspace-modal-actions { display:flex; gap:8px; flex-wrap:wrap; }
      .files-workspace-plan { display:grid; gap:4px; max-height:260px; overflow:auto; }
      .files-workspace-plan-row { display:grid; grid-template-columns:auto minmax(0,1fr); gap:8px; padding:5px 6px; border:1px solid var(--border); border-radius:6px; }
      .files-workspace-plan-row small { color:var(--muted); overflow-wrap:anywhere; }
      .files-workspace-directory-list { display:grid; gap:5px; max-height:260px; overflow:auto; }
    `;
    ui.shadow.appendChild(style);
  }

  function filesWorkspacePopupContainerRect(ui) {
    if (!ui || !ui.shadow) return null;
    const container = ui.shadow.querySelector && (ui.shadow.querySelector('.main') || ui.shadow.querySelector('.panel'));
    if (container && typeof container.getBoundingClientRect === 'function') return container.getBoundingClientRect();
    const host = ui.shadow.host;
    if (host && typeof host.getBoundingClientRect === 'function') return host.getBoundingClientRect();
    if (typeof window !== 'undefined' && Number(window.innerWidth) > 0 && Number(window.innerHeight) > 0) {
      return { left: 0, top: 0, right: Number(window.innerWidth), bottom: Number(window.innerHeight), width: Number(window.innerWidth), height: Number(window.innerHeight) };
    }
    return null;
  }

  function fallbackFilesWorkspacePopupRect(anchorRect, containerRect, options = {}) {
    const margin = Number(options.margin) >= 0 ? Number(options.margin) : 8;
    const gap = Number(options.gap) >= 0 ? Number(options.gap) : 6;
    const maxWidth = Number(options.maxWidth) > 0 ? Number(options.maxWidth) : 460;
    const maxHeight = Number(options.maxHeight) > 0 ? Number(options.maxHeight) : 420;
    const width = Math.min(maxWidth, Math.max(160, Number(containerRect.width) - margin * 2));
    const height = Math.min(maxHeight, Math.max(140, Number(containerRect.height) - margin * 2));
    const left = Math.max(Number(containerRect.left) + margin, Math.min(Number(anchorRect.left), Number(containerRect.right) - margin - width));
    let top = Number(anchorRect.bottom) + gap;
    if (top + height > Number(containerRect.bottom) - margin) top = Math.max(Number(containerRect.top) + margin, Number(anchorRect.top) - gap - height);
    return { left: Math.round(left), top: Math.round(top), width: Math.round(width), maxHeight: Math.round(height) };
  }

  function validFilesWorkspacePopupRect(rect) {
    return Boolean(rect && ['left', 'top', 'width', 'maxHeight'].every((key) => Number.isFinite(Number(rect[key]))));
  }

  function positionFilesWorkspaceDropdownPanel(ui, anchorOrDetails, panel, options = {}) {
    if (!ui || !ui.shadow || !anchorOrDetails || !panel) return null;
    const anchor = typeof anchorOrDetails.getBoundingClientRect === 'function'
      ? anchorOrDetails
      : (typeof anchorOrDetails.querySelector === 'function' ? anchorOrDetails.querySelector('summary') : null);
    if (!anchor || typeof anchor.getBoundingClientRect !== 'function') return null;
    const containerRect = filesWorkspacePopupContainerRect(ui);
    if (!containerRect) return null;
    const anchorRect = anchor.getBoundingClientRect();
    const api = root.ObsLinkedNotes || {};
    let rect = null;
    if (typeof api.clampRepositoryLinkPopoverRect === 'function') {
      try {
        rect = api.clampRepositoryLinkPopoverRect(anchorRect, containerRect, {
          margin: Number(options.margin) >= 0 ? Number(options.margin) : 8,
          gap: Number(options.gap) >= 0 ? Number(options.gap) : 6,
          maxWidth: Number(options.maxWidth) > 0 ? Number(options.maxWidth) : 460,
          maxHeight: Number(options.maxHeight) > 0 ? Number(options.maxHeight) : 420
        });
      } catch (error) { rect = null; }
    }
    if (!validFilesWorkspacePopupRect(rect)) rect = fallbackFilesWorkspacePopupRect(anchorRect, containerRect, options);
    panel.style.position = 'fixed';
    panel.style.left = `${rect.left}px`;
    panel.style.top = `${rect.top}px`;
    panel.style.width = `${rect.width}px`;
    panel.style.maxHeight = `${rect.maxHeight}px`;
    panel.style.right = 'auto';
    return rect;
  }

  function ensureFilesWorkspacePopupLayer(ui) {
    if (!ui || !ui.shadow || typeof document === 'undefined') return null;
    let layer = typeof ui.shadow.querySelector === 'function' ? ui.shadow.querySelector('[data-files-workspace-popup-layer]') : null;
    if (layer) return layer;
    layer = document.createElement('div');
    layer.className = 'files-workspace-popup-layer';
    layer.dataset.filesWorkspacePopupLayer = '1';
    layer.style.zIndex = String(TOP_POPUP_Z_INDEX);
    ui.shadow.appendChild(layer);
    return layer;
  }

  function filesWorkspaceTopPopupContextKey(ui) {
    const state = ui && ui.state || {};
    return `${String(state.activeWorkspaceId || '')}::${String(state.surface || '')}`;
  }

  function ensureFilesWorkspaceTopPopupContext(ui) {
    const context = filesWorkspaceTopPopupContextKey(ui);
    if (ui.__filesWorkspaceTopPopupContext !== context) {
      ui.__filesWorkspaceTopPopupContext = context;
      ui.__filesWorkspaceTopPopup = '';
    }
    return context;
  }

  function syncFilesWorkspaceTopPopupPanels(ui) {
    if (!ui || !ui.shadow || typeof ui.shadow.querySelectorAll !== 'function') return;
    ensureFilesWorkspaceTopPopupContext(ui);
    const openKey = String(ui.__filesWorkspaceTopPopup || '');
    for (const item of ui.shadow.querySelectorAll('[data-files-workspace-popup-panel]')) {
      item.hidden = String(item.dataset && item.dataset.filesWorkspacePopupKey || '') !== openKey;
    }
  }

  function closeFilesWorkspaceTopPopup(ui) {
    if (!ui) return;
    ensureFilesWorkspaceTopPopupContext(ui);
    ui.__filesWorkspaceTopPopup = '';
    syncFilesWorkspaceTopPopupPanels(ui);
  }

  function filesWorkspaceEventInsideTopPopup(event) {
    const path = event && typeof event.composedPath === 'function' ? event.composedPath() : [];
    for (const node of path) {
      if (!node) continue;
      if (node.dataset && (node.dataset.filesWorkspacePopupAnchor || node.dataset.filesWorkspacePopupPanel)) return true;
      if (typeof node.matches === 'function' && node.matches('[data-files-workspace-popup-anchor],[data-files-workspace-popup-panel]')) return true;
    }
    const target = event && event.target;
    return Boolean(target && typeof target.closest === 'function' && (target.closest('[data-files-workspace-popup-anchor]') || target.closest('[data-files-workspace-popup-panel]')));
  }

  function portalFilesWorkspaceDropdownPanel(ui, details, panel, options = {}) {
    if (!ui || !ui.shadow || !details || !panel) return false;
    const layer = ensureFilesWorkspacePopupLayer(ui);
    if (!layer) return false;
    const anchor = typeof details.querySelector === 'function' ? details.querySelector('summary') : null;
    if (!anchor || typeof anchor.addEventListener !== 'function') return false;
    const key = String(options.key || details.dataset && (details.dataset.filesLocationsMenu ? 'locations' : details.dataset.filesNewMenu ? 'new-file' : details.dataset.referenceObjectsMenu ? 'reference-objects' : '') || '').trim();
    if (!key) return false;
    ensureFilesWorkspaceTopPopupContext(ui);
    details.open = false;
    details.dataset.filesWorkspacePopupAnchor = '1';
    anchor.dataset.filesWorkspacePopupAnchor = '1';
    anchor.dataset.filesWorkspacePopupKey = key;
    panel.dataset.filesWorkspacePopupPanel = '1';
    panel.dataset.filesWorkspacePopupKey = key;
    layer.appendChild(panel);

    const sync = () => {
      ensureFilesWorkspaceTopPopupContext(ui);
      const open = String(ui.__filesWorkspaceTopPopup || '') === key;
      panel.hidden = !open;
      if (!open) return;
      positionFilesWorkspaceDropdownPanel(ui, anchor, panel, options);
      if (typeof setTimeout === 'function') setTimeout(() => {
        if (String(ui.__filesWorkspaceTopPopup || '') === key) positionFilesWorkspaceDropdownPanel(ui, anchor, panel, options);
      }, 0);
    };

    anchor.addEventListener('click', (event) => {
      if (event && typeof event.preventDefault === 'function') event.preventDefault();
      ensureFilesWorkspaceTopPopupContext(ui);
      const opening = String(ui.__filesWorkspaceTopPopup || '') !== key;
      ui.__filesWorkspaceTopPopup = opening ? key : '';
      syncFilesWorkspaceTopPopupPanels(ui);
      sync();
      if (opening && typeof options.onOpen === 'function') {
        try { Promise.resolve(options.onOpen()).catch(() => {}); } catch (error) { /* opening the popup itself must remain usable */ }
      }
    });
    sync();
    return true;
  }

  function replaceSurfaceButton(ui, surface, label, kind) {
    const current = ui.shadow && ui.shadow.querySelector(`.surface-tabs [data-surface="${surface}"]`);
    if (!current) return null;
    const button = current.cloneNode(true);
    button.removeAttribute('data-surface');
    button.removeAttribute('class');
    button.textContent = label;
    button.disabled = Boolean(ui.state.busy);
    button.addEventListener('click', (event) => {
      event.preventDefault();
      ui._withAllDrafts('onNavigateFilesLocation', kind).catch(() => {});
    });
    current.replaceWith(button);
    return button;
  }

  function filesWorkspacePreferencesForUi(ui) {
    const state = ui && ui.state || {};
    const activeWorkspace = (Array.isArray(state.workspaces) ? state.workspaces : []).find((workspace) => workspace && workspace.id === state.activeWorkspaceId) || null;
    if (!activeWorkspace) return DEFAULT_PREFS;
    const api = root.ObsLinkedNotes || {};
    if (typeof api.workspaceFilesPreferenceKey !== 'function') return DEFAULT_PREFS;
    let expectedKey = '';
    try { expectedKey = api.workspaceFilesPreferenceKey(activeWorkspace); } catch (error) { return DEFAULT_PREFS; }
    if (state[PREFS_KEY_STATE] !== expectedKey) {
      if (ui.__filesWorkspacePreferencesLoadKey !== expectedKey) {
        ui.__filesWorkspacePreferencesLoadKey = expectedKey;
        Promise.resolve()
          .then(() => callHandlerDirect(ui, 'onEnsureFilesWorkspacePreferences'))
          .catch(() => {})
          .finally(() => {
            if (ui.__filesWorkspacePreferencesLoadKey === expectedKey) ui.__filesWorkspacePreferencesLoadKey = '';
          });
      }
      return DEFAULT_PREFS;
    }
    return state[PREFS_STATE] || DEFAULT_PREFS;
  }

  function enhanceSurfaceTabs(ui) {
    const tabs = ui.shadow && ui.shadow.querySelector('.surface-tabs');
    if (!tabs) return;
    replaceSurfaceButton(ui, 'notes', 'Notes', 'notes');
    replaceSurfaceButton(ui, 'files', 'Files', 'root');
    if (tabs.querySelector('[data-files-locations-menu]')) return;
    const preferences = filesWorkspacePreferencesForUi(ui);
    const details = document.createElement('details');
    details.className = 'files-workspace-menu';
    details.dataset.filesLocationsMenu = '1';
    const shortcutRows = (preferences.folderShortcuts || []).map((shortcut) => `<div style="display:grid;grid-template-columns:minmax(0,1fr) auto;gap:5px"><button data-files-shortcut="${escapeHtml(shortcut.id)}">${escapeHtml(shortcut.name)}<br><small>${escapeHtml(shortcut.path)}</small></button><button data-remove-files-shortcut="${escapeHtml(shortcut.id)}" title="Remove shortcut">×</button></div>`).join('');
    details.innerHTML = `<summary>Locations ▾</summary><div class="files-workspace-menu-panel"><button data-files-location="root">Root</button><button data-files-location="notes">Notes folder</button><button data-files-location="linked-notes">Linked Notes editor</button><div class="files-workspace-form"><input data-files-location-path placeholder="Repository path…" value="${escapeHtml(ui.__filesLocationPathDraft || '')}"><button data-open-files-location-path>Open</button></div>${shortcutRows || '<div class="hint">No custom folder shortcuts.</div>'}<div class="files-workspace-form"><input data-files-shortcut-name placeholder="Shortcut name"><button data-add-files-shortcut ${ui.state.repositoryPath ? '' : 'disabled'}>Add current folder</button></div></div>`;
    const panel = details.querySelector('.files-workspace-menu-panel');
    const scope = panel || details;
    scope.querySelectorAll('[data-files-location]').forEach((button) => button.addEventListener('click', () => { closeFilesWorkspaceTopPopup(ui); ui._withAllDrafts('onNavigateFilesLocation', button.dataset.filesLocation).catch(() => {}); }));
    const locationPath = scope.querySelector('[data-files-location-path]');
    const openLocationPath = () => {
      if (!locationPath) return Promise.resolve();
      ui.__filesLocationPathDraft = locationPath.value;
      return ui._withAllDrafts('onNavigateFilesLocation', 'path', locationPath.value).then((result) => { if (!(result && result.cancelled)) closeFilesWorkspaceTopPopup(ui); return result; }).catch(() => undefined);
    };
    if (locationPath) {
      locationPath.addEventListener('input', () => { ui.__filesLocationPathDraft = locationPath.value; });
      locationPath.addEventListener('keydown', (event) => { if (event.key !== 'Enter') return; event.preventDefault(); openLocationPath(); });
    }
    scope.querySelector('[data-open-files-location-path]')?.addEventListener('click', () => { openLocationPath(); });
    scope.querySelectorAll('[data-files-shortcut]').forEach((button) => button.addEventListener('click', () => { closeFilesWorkspaceTopPopup(ui); ui._withAllDrafts('onNavigateFilesLocation', 'shortcut', button.dataset.filesShortcut).catch(() => {}); }));
    scope.querySelectorAll('[data-remove-files-shortcut]').forEach((button) => button.addEventListener('click', () => ui._call('onRemoveRepositoryFolderShortcut', button.dataset.removeFilesShortcut).catch(() => {})));
    const add = scope.querySelector('[data-add-files-shortcut]');
    if (add) add.addEventListener('click', () => {
      const input = scope.querySelector('[data-files-shortcut-name]');
      ui._call('onAddRepositoryFolderShortcut', input ? input.value : '').catch(() => {});
    });
    tabs.appendChild(details);
    if (panel) portalFilesWorkspaceDropdownPanel(ui, details, panel, { key: 'locations', maxWidth: 460, maxHeight: 420 });
  }

  function escapeHtml(value) {
    return String(value == null ? '' : value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function positionLinkPopover(ui, details, popover) {
    if (!ui.shadow || !details || !popover || !details.open) return;
    const main = ui.shadow.querySelector('.main') || ui.shadow.querySelector('.panel');
    const summary = details.querySelector('summary');
    if (!main || !summary || !main.getBoundingClientRect || !summary.getBoundingClientRect) return;
    const api = root.ObsLinkedNotes || {};
    if (typeof api.clampRepositoryLinkPopoverRect !== 'function') return;
    const rect = api.clampRepositoryLinkPopoverRect(summary.getBoundingClientRect(), main.getBoundingClientRect());
    popover.style.left = `${rect.left}px`;
    popover.style.top = `${rect.top}px`;
    popover.style.width = `${rect.width}px`;
    popover.style.maxHeight = `${rect.maxHeight}px`;
  }

  function enhanceCopyLink(ui) {
    if (!ui.shadow || ui.state.surface !== 'files') return;
    const preview = ui.state.repositoryPreview;
    if (!preview || !preview.path || (ui.state.repositoryEditor && ui.state.repositoryEditor.mode !== 'none')) return;
    const existing = ui.shadow.querySelector('.heading-link-picker');
    const toolbar = ui.shadow.querySelector('.editor .editor-toolbar') || ui.shadow.querySelector('.editor-toolbar');
    if (!toolbar) return;
    if (existing) existing.remove();
    if (toolbar.querySelector('[data-files-copy-link]')) return;
    const api = root.ObsLinkedNotes || {};
    const markdown = /\.md(?:own)?$/i.test(preview.path || '');
    const headings = markdown && typeof api.repositoryHeadingLinksForPreview === 'function' ? api.repositoryHeadingLinksForPreview(preview) : [];
    const details = document.createElement('details');
    details.className = 'files-workspace-menu';
    details.dataset.filesCopyLink = '1';
    details.innerHTML = `<summary>Copy link ▾</summary><div class="files-link-popover"><button data-copy-whole-file>Copy file link</button>${markdown ? `<input data-files-heading-search placeholder="Search headings"><div class="files-link-list">${headings.length ? headings.map((heading, index) => `<button class="files-link-heading" data-copy-heading="${index}" data-heading-search="${escapeHtml(`${heading.text} ${heading.anchor}`.toLowerCase())}" style="padding-left:${Math.max(0, Number(heading.level || 1) - 1) * 12 + 8}px"><small>H${Math.max(1, Math.min(6, Number(heading.level || 1)))}</small><span>${escapeHtml(heading.text)}</span></button>`).join('') : '<div class="hint">No Markdown headings found in this loaded file snapshot.</div>'}</div>` : ''}<div class="hint" data-files-link-status>Uses the already-loaded file snapshot; no GitHub request is made.</div></div>`;
    const openGithub = toolbar.querySelector('[data-action="open-file-github"]');
    if (openGithub) toolbar.insertBefore(details, openGithub); else toolbar.appendChild(details);
    const popover = details.querySelector('.files-link-popover');
    details.addEventListener('toggle', () => { if (details.open) setTimeout(() => positionLinkPopover(ui, details, popover), 0); });
    const whole = details.querySelector('[data-copy-whole-file]');
    if (whole) whole.addEventListener('click', async () => {
      try {
        await ui._call('onCopyRepositoryFileLink');
        const status = details.querySelector('[data-files-link-status]');
        if (status) status.textContent = 'File link copied.';
        details.open = false;
      } catch (error) { /* _call shows contextual error */ }
    });
    details.querySelectorAll('[data-copy-heading]').forEach((button) => button.addEventListener('click', async () => {
      try {
        const item = headings[Number(button.dataset.copyHeading)];
        await ui._call('onCopyRepositoryHeadingLink', item);
        const status = details.querySelector('[data-files-link-status]');
        if (status) status.textContent = `Heading link copied: ${item && item.text || ''}.`;
        details.open = false;
      } catch (error) { /* _call shows contextual error */ }
    }));
    const search = details.querySelector('[data-files-heading-search]');
    if (search) search.addEventListener('input', () => {
      const query = search.value.trim().toLowerCase();
      details.querySelectorAll('[data-heading-search]').forEach((button) => { button.hidden = Boolean(query && !String(button.dataset.headingSearch || '').includes(query)); });
    });
  }

  function repositoryTemplateStateForUi(ui) {
    const state = ui && ui.state || {};
    const contextKey = filesWorkspaceModalContextKey(ui);
    const current = String(state.repositoryTemplatesContextKey || '') === contextKey;
    return {
      contextKey,
      loaded: current && Boolean(state.repositoryTemplatesLoaded),
      initialized: current && Boolean(state.repositoryTemplatesInitialized),
      incomplete: current && Boolean(state.repositoryTemplatesIncomplete),
      templates: current && Array.isArray(state.repositoryTemplates) ? state.repositoryTemplates : [],
      diagnostics: current && Array.isArray(state.repositoryTemplateDiagnostics) ? state.repositoryTemplateDiagnostics : []
    };
  }

  function repositoryTemplatePopupKey(button, index = 0) {
    const closest = button && typeof button.closest === 'function' ? button.closest.bind(button) : null;
    const slot = closest && closest('.sidebar') ? 'sidebar'
      : closest && closest('.editor') ? 'editor'
        : `slot-${Math.max(0, Number(index) || 0)}`;
    return `new-file:${slot}`;
  }

  function createRepositoryTemplateMenu(ui, oldButton, popupKey) {
    const state = repositoryTemplateStateForUi(ui);
    const details = document.createElement('details');
    details.className = 'files-workspace-menu';
    details.dataset.filesNewMenu = '1';
    const rows = state.templates.map((template) => `<button data-repository-template="${escapeHtml(template.path)}"><strong>${escapeHtml(template.name)}</strong><br><small>${escapeHtml(template.path)}</small></button>`).join('');
    const empty = !state.loaded
      ? '<div class="hint">Open this menu to load repository templates.</div>'
      : !state.initialized
        ? '<div class="hint">Templates are not initialized in this workspace. Expected <code>.linked-notes/templates/</code>.</div>'
        : '<div class="hint">No valid <code>*.template.md</code> templates found.</div>';
    const diagnostics = state.diagnostics.length
      ? `<div class="hint"><strong>Template diagnostics (${state.diagnostics.length})${state.incomplete ? ' · incomplete' : ''}</strong>${state.diagnostics.slice(0, 6).map((item) => `<br>${escapeHtml(item.path || '')}: ${escapeHtml(item.message || '')}`).join('')}${state.diagnostics.length > 6 ? `<br>… ${state.diagnostics.length - 6} more` : ''}</div>`
      : '';
    details.innerHTML = `<summary>New file ▾</summary><div class="files-workspace-menu-panel"><button data-repository-template="blank">Blank file</button><div class="hint"><strong>Repository templates</strong><br><code>.linked-notes/templates/*.template.md</code></div>${rows || empty}${diagnostics}<div class="files-workspace-form"><button data-refresh-repository-templates>Refresh templates</button><button data-open-repository-templates-folder>Open templates folder</button></div></div>`;
    const panel = details.querySelector('.files-workspace-menu-panel');
    const scope = panel || details;
    scope.querySelectorAll('[data-repository-template]').forEach((button) => button.addEventListener('click', () => {
      closeFilesWorkspaceTopPopup(ui);
      ui._withAllDrafts('onBeginRepositoryFileCreateFromTemplate', button.dataset.repositoryTemplate).catch(() => {});
    }));
    scope.querySelector('[data-refresh-repository-templates]')?.addEventListener('click', () => ui._call('onLoadRepositoryFileTemplates', true).catch(() => {}));
    scope.querySelector('[data-open-repository-templates-folder]')?.addEventListener('click', () => {
      closeFilesWorkspaceTopPopup(ui);
      ui._call('onOpenRepositoryTemplatesFolder').catch(() => {});
    });
    oldButton.replaceWith(details);
    if (panel) portalFilesWorkspaceDropdownPanel(ui, details, panel, {
      key: String(popupKey || 'new-file:slot-0'),
      maxWidth: 520,
      maxHeight: 520,
      onOpen: () => {
        const current = repositoryTemplateStateForUi(ui);
        if (current.loaded) return undefined;
        return ui._call('onLoadRepositoryFileTemplates', false);
      }
    });
  }

  function filesWorkspaceModalContextKey(ui) {
    const state = ui && ui.state || {};
    const workspace = (Array.isArray(state.workspaces) ? state.workspaces : []).find((item) => item && item.id === state.activeWorkspaceId) || null;
    const api = root.ObsLinkedNotes || {};
    if (workspace && typeof api.workspaceFilesPreferenceKey === 'function') {
      try { return api.workspaceFilesPreferenceKey(workspace); } catch (error) { /* fall through */ }
    }
    return String(state.activeWorkspaceId || '');
  }

  function detachFilesWorkspaceModals(ui) {
    if (!ui || !ui.shadow || typeof ui.shadow.querySelector !== 'function') return [];
    const nodes = [];
    for (const selector of ['[data-files-structure-modal]', '[data-files-copy-modal]']) {
      const node = ui.shadow.querySelector(selector);
      if (!node || nodes.includes(node)) continue;
      if (typeof node.remove === 'function') node.remove();
      nodes.push(node);
    }
    return nodes;
  }

  function restoreFilesWorkspaceModals(ui, nodes) {
    if (!ui || !ui.shadow || ui.state.surface !== 'files' || typeof ui.shadow.appendChild !== 'function') return;
    const contextKey = filesWorkspaceModalContextKey(ui);
    for (const node of Array.isArray(nodes) ? nodes : []) {
      if (!node) continue;
      if (String(node.__filesWorkspaceContextKey || '') !== contextKey) continue;
      ui.shadow.appendChild(node);
    }
  }

  function renderPlanRows(container, rows) {
    container.innerHTML = (Array.isArray(rows) ? rows : []).map((row) => `<div class="files-workspace-plan-row"><strong>${escapeHtml(row.status || row.type || '')}</strong><small>${escapeHtml(row.path || row.target || '')}${row.message ? `<br>${escapeHtml(row.message)}` : ''}</small></div>`).join('') || '<div class="hint">No operations.</div>';
  }

  function openStructureModal(ui) {
    if (!ui.shadow || ui.shadow.querySelector('[data-files-structure-modal]')) return;
    const backdrop = document.createElement('div');
    backdrop.className = 'files-workspace-modal-backdrop';
    backdrop.dataset.filesStructureModal = '1';
    backdrop.__filesWorkspaceContextKey = filesWorkspaceModalContextKey(ui);
    backdrop.innerHTML = `<div class="files-workspace-modal"><h3>Create add-only structure</h3><div class="hint">One repository-relative path per line. End a path with / for a folder. Blank lines and lines starting with # are ignored. Existing files are never overwritten or deleted.</div><textarea data-files-structure-text placeholder="entity/\nentity/entity.md\nentity/systems/\nentity/systems/combat.md"></textarea><div class="files-workspace-modal-actions"><button data-structure-preview>Preview</button><button class="primary" data-structure-apply disabled>Apply add-only</button><button data-structure-close>Close</button></div><div class="hint" data-structure-status>Preview performs reads only.</div><div class="files-workspace-plan" data-structure-plan></div></div>`;
    ui.shadow.appendChild(backdrop);
    let plan = null;
    const status = backdrop.querySelector('[data-structure-status]');
    const rows = backdrop.querySelector('[data-structure-plan]');
    const apply = backdrop.querySelector('[data-structure-apply]');
    backdrop.querySelector('[data-structure-close]').addEventListener('click', () => backdrop.remove());
    backdrop.querySelector('[data-structure-preview]').addEventListener('click', async () => {
      plan = null; apply.disabled = true; status.textContent = 'Reading destination state…';
      try {
        plan = await callHandlerDirect(ui, 'onPreviewRepositoryStructure', backdrop.querySelector('[data-files-structure-text]').value);
        if (!plan || plan.cancelled) {
          plan = null;
          status.textContent = 'Structure preview cancelled; nothing was written.';
          return;
        }
        renderPlanRows(rows, plan.statuses);
        apply.disabled = Boolean(plan.blocked);
        status.textContent = plan.blocked ? 'Conflicts/blocked targets found. Nothing can be written until the structure is changed.' : `Ready: ${plan.files.length} empty file(s), ${plan.placeholders.length} empty-folder placeholder(s).`;
      } catch (error) { status.textContent = `Preview failed: ${errorText(error)}`; }
    });
    apply.addEventListener('click', () => {
      if (!plan || plan.blocked) return;
      backdrop.remove();
      ui._call('onApplyRepositoryStructure', plan).catch(() => {});
    });
  }

  function openCopyModal(ui, sourceType, sourcePath) {
    if (!ui.shadow) return;
    ui.shadow.querySelector('[data-files-copy-modal]')?.remove();
    const backdrop = document.createElement('div');
    backdrop.className = 'files-workspace-modal-backdrop';
    backdrop.dataset.filesCopyModal = '1';
    backdrop.__filesWorkspaceContextKey = filesWorkspaceModalContextKey(ui);
    backdrop.innerHTML = `<div class="files-workspace-modal"><h3>Copy ${sourceType === 'folder' ? 'folder' : 'file'}</h3><div class="hint">Source: ${escapeHtml(sourcePath)}. Copy is add-only: every destination file must be absent before the first write.</div><label class="field"><span>Destination name</span><input data-copy-destination-name value="${escapeHtml((root.ObsLinkedNotes && root.ObsLinkedNotes.repositoryFilesWorkspacePathName ? root.ObsLinkedNotes.repositoryFilesWorkspacePathName(sourcePath) : sourcePath.split('/').pop()) || '')}"></label><div class="hint">Destination folder: <strong data-copy-folder-label>/</strong></div><div class="files-workspace-modal-actions"><button data-copy-up disabled>Up</button><button data-copy-use>Use this folder / Preview</button><button data-copy-close>Close</button></div><div class="files-workspace-directory-list" data-copy-directory-list></div><div class="hint" data-copy-status>Select the destination folder.</div><div class="files-workspace-plan" data-copy-plan></div><div class="files-workspace-modal-actions"><button class="primary" data-copy-apply disabled>Copy add-only</button></div></div>`;
    ui.shadow.appendChild(backdrop);
    let folder = '';
    let plan = null;
    const directoryList = backdrop.querySelector('[data-copy-directory-list]');
    const label = backdrop.querySelector('[data-copy-folder-label]');
    const up = backdrop.querySelector('[data-copy-up]');
    const status = backdrop.querySelector('[data-copy-status]');
    const planRows = backdrop.querySelector('[data-copy-plan]');
    const apply = backdrop.querySelector('[data-copy-apply]');
    const nameInput = backdrop.querySelector('[data-copy-destination-name]');
    const load = async (path) => {
      status.textContent = 'Reading folders…';
      try {
        const result = await callHandlerDirect(ui, 'onListRepositoryDirectories', path);
        if (!result || result.cancelled) {
          status.textContent = 'Folder read cancelled.';
          return;
        }
        folder = result.path || '';
        label.textContent = folder || '/';
        up.disabled = !folder;
        directoryList.innerHTML = result.directories.length ? result.directories.map((entry) => `<button data-copy-dir="${escapeHtml(entry.path)}">📁 ${escapeHtml(entry.name || entry.path)}</button>`).join('') : '<div class="hint">No child folders.</div>';
        directoryList.querySelectorAll('[data-copy-dir]').forEach((button) => button.addEventListener('click', () => load(button.dataset.copyDir)));
        status.textContent = 'Choose this folder or browse deeper.';
      } catch (error) { status.textContent = `Folder read failed: ${errorText(error)}`; }
    };
    backdrop.querySelector('[data-copy-close]').addEventListener('click', () => backdrop.remove());
    up.addEventListener('click', () => {
      const api = root.ObsLinkedNotes || {};
      const parent = folder && typeof api.repositoryFilesWorkspacePathParent === 'function' ? api.repositoryFilesWorkspacePathParent(folder) : '';
      load(parent);
    });
    backdrop.querySelector('[data-copy-use]').addEventListener('click', async () => {
      plan = null; apply.disabled = true; status.textContent = 'Preflighting the complete copy destination…';
      try {
        plan = await callHandlerDirect(ui, 'onPreviewRepositoryCopy', { sourceType, sourcePath, destinationFolder: folder, destinationName: nameInput.value });
        if (!plan || plan.cancelled) {
          plan = null;
          status.textContent = 'Copy preview cancelled; nothing was written.';
          return;
        }
        renderPlanRows(planRows, plan.statuses);
        apply.disabled = Boolean(plan.blocked);
        status.textContent = plan.blocked ? 'Destination conflicts/blocked targets found. Nothing will be written.' : `Ready: ${plan.mappings.length} file(s), ${plan.totalBytes} byte(s).`;
      } catch (error) { status.textContent = `Copy preview failed: ${errorText(error)}`; }
    });
    apply.addEventListener('click', () => {
      if (!plan || plan.blocked) return;
      backdrop.remove();
      ui._call('onApplyRepositoryCopy', plan).catch(() => {});
    });
    load('').catch(() => {});
  }

  function enhanceFilesToolbar(ui) {
    if (!ui.shadow || ui.state.surface !== 'files') return;
    ui.shadow.querySelectorAll('[data-action="new-repository-file"]').forEach((button, index) => {
      if (!button.closest('.files-workspace-menu')) createRepositoryTemplateMenu(ui, button, repositoryTemplatePopupKey(button, index));
    });
    const toolbar = ui.shadow.querySelector('.editor .editor-toolbar') || ui.shadow.querySelector('.editor-toolbar');
    if (!toolbar) return;
    if (!toolbar.querySelector('[data-create-repository-structure]')) {
      const structure = document.createElement('button');
      structure.dataset.createRepositoryStructure = '1';
      structure.textContent = 'Create structure';
      structure.disabled = Boolean(ui.state.busy);
      structure.addEventListener('click', () => openStructureModal(ui));
      toolbar.appendChild(structure);
    }
    const preview = ui.state.repositoryPreview;
    if (preview && preview.path && !toolbar.querySelector('[data-copy-repository-file]')) {
      const copyFile = document.createElement('button');
      copyFile.dataset.copyRepositoryFile = '1';
      copyFile.textContent = 'Copy file';
      copyFile.disabled = Boolean(ui.state.busy);
      copyFile.addEventListener('click', () => openCopyModal(ui, 'file', preview.path));
      toolbar.appendChild(copyFile);
    }
    if (ui.state.repositoryPath && !toolbar.querySelector('[data-copy-repository-folder]')) {
      const copyFolder = document.createElement('button');
      copyFolder.dataset.copyRepositoryFolder = '1';
      copyFolder.textContent = 'Copy folder';
      copyFolder.disabled = Boolean(ui.state.busy);
      copyFolder.addEventListener('click', () => openCopyModal(ui, 'folder', ui.state.repositoryPath));
      toolbar.appendChild(copyFolder);
    }
  }

  function patchUi(UI) {
    if (!UI || !UI.prototype || UI.prototype[UI_PATCH]) return false;
    Object.defineProperty(UI.prototype, UI_PATCH, { value: true, configurable: false, enumerable: false, writable: false });
    const originalMount = UI.prototype.mount;
    const originalRender = UI.prototype.render;
    const originalDispose = UI.prototype.dispose;

    UI.prototype.mount = function filesWorkspaceMount(...args) {
      const result = originalMount.apply(this, args);
      this.__closeFilesWorkspaceTopPopupForPanelMove = () => closeFilesWorkspaceTopPopup(this);
      if (!this.__filesWorkspaceEscapePatched && typeof document !== 'undefined' && this._onDocumentKeydown) {
        const previous = this._onDocumentKeydown;
        document.removeEventListener('keydown', previous, true);
        this._onDocumentKeydown = (event) => {
          if (event && event.key === 'Escape' && this.__filesWorkspaceTopPopup) {
            event.preventDefault(); event.stopPropagation(); closeFilesWorkspaceTopPopup(this); return;
          }
          const openLink = this.shadow && this.shadow.querySelector('[data-files-copy-link][open]');
          if (event && event.key === 'Escape' && openLink) {
            event.preventDefault(); event.stopPropagation(); openLink.open = false; return;
          }
          return previous(event);
        };
        document.addEventListener('keydown', this._onDocumentKeydown, true);
        this.__filesWorkspaceEscapePatched = true;
      }
      if (typeof document !== 'undefined' && !this.__filesWorkspaceOutsidePointerPatched) {
        this.__filesWorkspaceOutsidePointerHandler = (event) => {
          if (!this.__filesWorkspaceTopPopup || filesWorkspaceEventInsideTopPopup(event)) return;
          closeFilesWorkspaceTopPopup(this);
        };
        document.addEventListener('pointerdown', this.__filesWorkspaceOutsidePointerHandler, true);
        this.__filesWorkspaceOutsidePointerPatched = true;
      }
      if (this.shadow && !this.__filesWorkspaceOutsideClickPatched) {
        this.shadow.addEventListener('click', (event) => {
          const target = event && event.target;
          const openLink = this.shadow && this.shadow.querySelector('[data-files-copy-link][open]');
          if (openLink && !openLink.contains(target)) openLink.open = false;
        });
        this.__filesWorkspaceOutsideClickPatched = true;
      }
      return result;
    };

    UI.prototype.dispose = function filesWorkspaceDispose(...args) {
      if (this.__filesWorkspaceOutsidePointerHandler && typeof document !== 'undefined') {
        document.removeEventListener('pointerdown', this.__filesWorkspaceOutsidePointerHandler, true);
      }
      this.__filesWorkspaceOutsidePointerHandler = null;
      this.__filesWorkspaceOutsidePointerPatched = false;
      return typeof originalDispose === 'function' ? originalDispose.apply(this, args) : undefined;
    };

    UI.prototype.render = function filesWorkspaceRender(...args) {
      const preservedModals = detachFilesWorkspaceModals(this);
      let result;
      try {
        result = originalRender.apply(this, args);
        if (!this.shadow || typeof document === 'undefined') return result;
        appendFilesWorkspaceStyle(this);
        enhanceSurfaceTabs(this);
        enhanceFilesToolbar(this);
        enhanceCopyLink(this);
        return result;
      } finally {
        restoreFilesWorkspaceModals(this, preservedModals);
      }
    };
    return true;
  }

  function installRepositoryFilesWorkspace(api = root.ObsLinkedNotes || {}) {
    if (!api || !api.LinkedNotesApp || !api.LinkedNotesUI) return false;
    const appPatched = patchApp(api.LinkedNotesApp);
    const uiPatched = patchUi(api.LinkedNotesUI);
    return appPatched || uiPatched;
  }

  return { installRepositoryFilesWorkspace, positionFilesWorkspaceDropdownPanel, portalFilesWorkspaceDropdownPanel, closeFilesWorkspaceTopPopup, filesWorkspaceEventInsideTopPopup };
});

/* src/repository-reference-objects-runtime.js */
(function (root, factory) {
  const api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
  if (root.ObsLinkedNotes && root.ObsLinkedNotes.LinkedNotesApp && root.ObsLinkedNotes.LinkedNotesUI) {
    try { api.installRepositoryReferenceObjects(root.ObsLinkedNotes); } catch (error) { /* bootstrap reports failures later */ }
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function (root) {
  'use strict';

  const APP_PATCH = '__obsRepositoryReferenceObjectsAppV1';
  const UI_PATCH = '__obsRepositoryReferenceObjectsUiV1';

  function apiOrThrow(app) {
    const api = app && app.api || root.ObsLinkedNotes || {};
    const required = [
      'referenceObjectLocalStoreKey', 'normalizeReferenceObjectLocalState', 'referenceObjectLocalDraftMap',
      'upsertReferenceObjectLocalDraft', 'removeReferenceObjectLocalDraft', 'findExactReferenceObjectCandidates',
      'wrapReferenceDefinitionAtCandidate', 'createReferenceObjectId', 'formatReferenceUse', 'parseReferenceMarkers',
      'decodeReferenceObjectRegistry', 'encodeReferenceObjectRegistry', 'upsertReferenceObject', 'renameReferenceObject',
      'replaceReferenceObjectUses', 'readReferenceObjectRegistrySnapshot', 'checkReferenceObjectUses',
      'buildReferenceObjectLocalUpdate', 'updateReferenceObjectUsesRemote', 'validateReferenceObjectTags',
      'deepValidateReferenceObjectTags', 'proveReferenceObjectExpectedBase'
    ];
    for (const name of required) if (typeof api[name] !== 'function') throw new Error(`Reference Object runtime dependency is unavailable: ${name}.`);
    return api;
  }

  function errorText(error) {
    return String(error && error.message || error || 'Unknown error');
  }

  function sameRepository(a, b) {
    return Boolean(a && b && a.owner === b.owner && a.repo === b.repo && a.branch === b.branch);
  }

  function previewText(value, max = 120) {
    const text = String(value == null ? '' : value).replace(/\s+/g, ' ').trim();
    return text.length > max ? `${text.slice(0, max - 1)}…` : text;
  }

  function publicCheck(check) {
    if (!check) return null;
    return {
      objectId: check.objectId,
      currentValuePreview: previewText(check.currentValue),
      staleCount: check.uses.filter((item) => item.status === 'stale').length,
      currentCount: check.uses.filter((item) => item.status === 'current').length,
      indexDrift: Boolean(check.indexDrift),
      incomplete: Boolean(check.incomplete),
      blocked: Boolean(check.blocked),
      diagnostics: (check.diagnostics || []).map((item) => ({ kind: item.kind, path: item.path || '', message: item.message || '' })),
      uses: check.uses.map((use) => ({
        path: use.path,
        line: use.line,
        lineOccurrence: use.lineOccurrence,
        status: use.status,
        storedPreview: previewText(use.value),
        currentPreview: previewText(check.currentValue)
      }))
    };
  }

  function publicValidation(result) {
    if (!result) return null;
    return {
      valid: Boolean(result.valid),
      incomplete: Boolean(result.incomplete),
      scope: result.scope === 'repository' ? 'repository' : 'indexed',
      globalIntegrity: Boolean(result.globalIntegrity),
      scanSummary: result.scanSummary ? { ...result.scanSummary } : {},
      counts: result.counts ? { ...result.counts } : {},
      diagnostics: (result.diagnostics || []).map((item) => ({ kind: item.kind || 'issue', path: item.path || '', objectId: item.objectId || '', message: item.message || '' }))
    };
  }


  function locateReferenceFocusOccurrence(api, content, focus) {
    if (!api || typeof api.parseReferenceMarkers !== 'function' || !focus) return null;
    const role = focus.role === 'definition' ? 'def' : focus.role === 'use' ? 'use' : String(focus.role || '');
    const id = String(focus.objectId || '');
    const line = Math.max(1, Number(focus.line) || 1);
    const lineOccurrence = Math.max(1, Number(focus.lineOccurrence) || 1);
    const parsed = api.parseReferenceMarkers(String(content == null ? '' : content));
    return parsed.occurrences.find((item) => item.role === role && item.id === id && item.line === line && item.lineOccurrence === lineOccurrence) || null;
  }

  function patchApp(App) {
    if (!App || !App.prototype || App.prototype[APP_PATCH]) return false;
    Object.defineProperty(App.prototype, APP_PATCH, { value: true, configurable: false, enumerable: false, writable: false });
    const originalStart = App.prototype.start;
    const originalSelectWorkspace = App.prototype.selectWorkspace;
    const originalSaveWorkspace = App.prototype.saveWorkspace;
    const originalDeleteWorkspace = App.prototype.deleteWorkspace;
    const originalOpenPanel = App.prototype.openPanel;
    const originalOpenRepositoryEntry = App.prototype.openRepositoryEntry;
    const originalBeginRepositoryFileEdit = App.prototype.beginRepositoryFileEdit;
    const originalSaveRepositoryEditor = App.prototype.saveRepositoryEditor;

    App.prototype._referenceObjectRegistryPath = function referenceObjectRegistryPath() {
      return String(apiOrThrow(this).DEFAULT_REFERENCE_OBJECT_REGISTRY_PATH || '.linked-notes/reference-objects.json');
    };

    App.prototype._referenceObjectLocalKey = function referenceObjectLocalKey() {
      const workspace = this._activeWorkspace();
      return workspace ? apiOrThrow(this).referenceObjectLocalStoreKey(workspace) : '';
    };

    App.prototype._referenceObjectLocalMap = function referenceObjectLocalMap() {
      return apiOrThrow(this).referenceObjectLocalDraftMap(this.referenceObjectLocalState || { schemaVersion: 1, files: [] });
    };

    App.prototype._referenceObjectUiPatch = function referenceObjectUiPatch(extra = {}) {
      const registry = this.referenceObjectRegistrySnapshot && this.referenceObjectRegistrySnapshot.registry;
      const checks = {};
      for (const [id, check] of Object.entries(this.referenceObjectChecks || {})) if (check) checks[id] = publicCheck(check);
      return {
        referenceObjectsLoaded: Boolean(this.referenceObjectsLoaded),
        referenceObjects: registry && Array.isArray(registry.objects) ? registry.objects : [],
        referenceObjectChecks: checks,
        referenceObjectValidation: publicValidation(this.referenceObjectValidation),
        referenceObjectPendingFiles: (this.referenceObjectLocalState && this.referenceObjectLocalState.files || []).map((file) => file.path),
        referenceObjectRegistryPath: this._referenceObjectRegistryPath(),
        referenceObjectFocus: this.referenceObjectFocus || null,
        ...extra
      };
    };

    App.prototype._loadReferenceObjectLocalState = async function loadReferenceObjectLocalState(options = {}) {
      const api = apiOrThrow(this);
      const key = this._referenceObjectLocalKey();
      const state = key ? api.normalizeReferenceObjectLocalState(await this.getValue(key, { schemaVersion: 1, files: [] })) : { schemaVersion: 1, files: [] };
      this.referenceObjectLocalState = state;
      this.referenceObjectLocalStateKey = key;
      this.referenceObjectsLoaded = false;
      this.referenceObjectRegistrySnapshot = null;
      this.referenceObjectChecks = {};
      this.referenceObjectValidation = null;
      this.referenceObjectFocus = null;
      if (!options.silent) this._setUi(this._referenceObjectUiPatch({ status: state.files.length ? `${state.files.length} pending local repository file(s) restored for this workspace.` : 'Local repository change state ready.' }));
      return state;
    };

    App.prototype._ensureReferenceObjectLocalStateCurrent = async function ensureReferenceObjectLocalStateCurrent(options = {}) {
      const key = this._referenceObjectLocalKey();
      if (key === this.referenceObjectLocalStateKey && this.referenceObjectLocalState) return this.referenceObjectLocalState;
      return this._loadReferenceObjectLocalState(options);
    };

    App.prototype._persistReferenceObjectLocalState = async function persistReferenceObjectLocalState(state, options = {}) {
      const api = apiOrThrow(this);
      const key = this._referenceObjectLocalKey();
      if (!key) throw new Error('Select a GitHub workspace before saving local Reference Object state.');
      const normalized = api.normalizeReferenceObjectLocalState(state);
      await this.setValue(key, normalized);
      this.referenceObjectLocalState = normalized;
      this.referenceObjectLocalStateKey = key;
      if (!options.silent) this._setUi(this._referenceObjectUiPatch());
      return normalized;
    };

    App.prototype._putReferenceObjectLocalDraft = async function putReferenceObjectLocalDraft(path, baseSha, content, options = {}) {
      const api = apiOrThrow(this);
      await this._ensureReferenceObjectLocalStateCurrent({ silent: true });
      const existing = this._referenceObjectLocalMap().get(path);
      const next = api.upsertReferenceObjectLocalDraft(this.referenceObjectLocalState, {
        path,
        baseSha: existing ? existing.baseSha : String(baseSha || ''),
        content,
        updatedAt: new Date().toISOString()
      });
      return this._persistReferenceObjectLocalState(next, options);
    };

    App.prototype._removeReferenceObjectLocalDraft = async function removeReferenceObjectLocalDraft(path, options = {}) {
      const api = apiOrThrow(this);
      await this._ensureReferenceObjectLocalStateCurrent({ silent: true });
      if (!this._referenceObjectLocalMap().has(path)) return this.referenceObjectLocalState;
      return this._persistReferenceObjectLocalState(api.removeReferenceObjectLocalDraft(this.referenceObjectLocalState, path), options);
    };

    App.prototype._referenceObjectsClient = async function referenceObjectsClient() {
      const workspace = this._activeWorkspace();
      if (!workspace) throw new Error('Select a GitHub workspace before using Reference Objects.');
      return this._client(workspace);
    };

    App.prototype._readReferenceRegistryUnlocked = async function readReferenceRegistryUnlocked() {
      await this._ensureReferenceObjectLocalStateCurrent({ silent: true });
      const client = await this._referenceObjectsClient();
      const snapshot = await apiOrThrow(this).readReferenceObjectRegistrySnapshot(client, this._referenceObjectRegistryPath(), this.referenceObjectLocalState.files);
      this.referenceObjectRegistrySnapshot = snapshot;
      this.referenceObjectsLoaded = true;
      return snapshot;
    };

    App.prototype.loadReferenceObjects = async function loadReferenceObjects(force = false) {
      await this._ensureReferenceObjectLocalStateCurrent({ silent: true });
      if (!force && this.referenceObjectsLoaded && this.referenceObjectRegistrySnapshot) {
        this._setUi(this._referenceObjectUiPatch({ status: `${this.referenceObjectRegistrySnapshot.registry.objects.length} Reference Object definition(s) loaded.` }));
        return this.referenceObjectRegistrySnapshot.registry.objects;
      }
      const run = async () => this._readReferenceRegistryUnlocked();
      const snapshot = typeof this._runFilesWorkspaceRead === 'function'
        ? await this._runFilesWorkspaceRead('Reading Reference Object Definitions File…', run)
        : await this._runRemoteOperation('Reading Reference Object Definitions File…', run);
      if (!snapshot || snapshot.cancelled) return snapshot;
      this._setUi(this._referenceObjectUiPatch({ status: `${snapshot.registry.objects.length} Reference Object definition(s) loaded from ${snapshot.local ? 'local state' : snapshot.missing ? 'an empty Definitions File state' : 'GitHub'}.` }));
      return snapshot.registry.objects;
    };

    App.prototype._ensureReferenceRegistryLoaded = async function ensureReferenceRegistryLoaded() {
      if (this.referenceObjectsLoaded && this.referenceObjectRegistrySnapshot) return this.referenceObjectRegistrySnapshot;
      const result = await this.loadReferenceObjects();
      if (result && result.cancelled) throw new Error('Reference Object Definitions File read was cancelled.');
      if (!this.referenceObjectRegistrySnapshot) throw new Error('Reference Object Definitions File is unavailable.');
      return this.referenceObjectRegistrySnapshot;
    };

    App.prototype._effectiveReferenceObjectFile = async function effectiveReferenceObjectFile(path) {
      await this._ensureReferenceObjectLocalStateCurrent({ silent: true });
      const local = this._referenceObjectLocalMap().get(path);
      if (local) return { path, content: local.content, sha: local.baseSha, baseSha: local.baseSha, local: true };
      const client = await this._referenceObjectsClient();
      const file = await client.readBytes(path, { maxBytes: apiOrThrow(this).DEFAULT_REFERENCE_SCAN_MAX_FILE_BYTES || (512 * 1024) });
      let content;
      try { content = new TextDecoder('utf-8', { fatal: true }).decode(file.bytes); }
      catch (error) { throw new Error(`Reference Object file is not strict UTF-8: ${path}.`); }
      return { path, content, sha: String(file.sha || ''), baseSha: String(file.sha || ''), local: false };
    };

    App.prototype._currentReferenceObjectSource = function currentReferenceObjectSource() {
      const editor = this.repositoryEditor || {};
      if (editor.mode === 'edit' && editor.path) return { path: editor.path, content: String(editor.content || ''), baseSha: String(editor.baseSha || ''), fromEditor: true };
      const preview = this.repositoryPreview;
      if (!preview || preview.kind !== 'text' || !preview.path || typeof preview.content !== 'string') throw new Error('Open a supported repository text file before creating a Reference Object.');
      if (!sameRepository(preview.context, this._activeWorkspace())) throw new Error('Reference Object definitions can only be created in the active workspace repository.');
      const local = this._referenceObjectLocalMap().get(preview.path);
      return local
        ? { path: preview.path, content: local.content, baseSha: local.baseSha, fromEditor: false }
        : { path: preview.path, content: preview.content, baseSha: String(preview.sha || ''), fromEditor: false };
    };

    App.prototype.findReferenceObjectCandidates = async function findReferenceObjectCandidates(value) {
      await this._ensureReferenceObjectLocalStateCurrent({ silent: true });
      const source = this._currentReferenceObjectSource();
      const candidates = apiOrThrow(this).findExactReferenceObjectCandidates(source.content, value);
      return { path: source.path, value: String(value == null ? '' : value), candidates };
    };

    App.prototype.createReferenceObjectLocal = async function createReferenceObjectLocal(input = {}) {
      const api = apiOrThrow(this);
      const name = String(input.name || '').trim();
      if (!name) throw new Error('Reference Object name is required.');
      await this._ensureReferenceRegistryLoaded();
      const source = this._currentReferenceObjectSource();
      const candidate = input.candidate || {};
      if (String(candidate.value == null ? '' : candidate.value) !== source.content.slice(Number(candidate.start), Number(candidate.end))) throw new Error('Selected exact occurrence changed. Find it again.');
      const id = api.createReferenceObjectId();
      const wrapped = api.wrapReferenceDefinitionAtCandidate(source.content, candidate, id);
      let localState = this.referenceObjectLocalState;
      const sourceExisting = api.referenceObjectLocalDraftMap(localState).get(source.path);
      localState = api.upsertReferenceObjectLocalDraft(localState, { path: source.path, baseSha: sourceExisting ? sourceExisting.baseSha : source.baseSha, content: wrapped, updatedAt: new Date().toISOString() });
      const registry = api.upsertReferenceObject(this.referenceObjectRegistrySnapshot.registry, { id, name, definition: { path: source.path }, uses: [] });
      const registryContent = api.encodeReferenceObjectRegistry(registry);
      const registryPath = this._referenceObjectRegistryPath();
      const registryExisting = api.referenceObjectLocalDraftMap(localState).get(registryPath);
      localState = api.upsertReferenceObjectLocalDraft(localState, { path: registryPath, baseSha: registryExisting ? registryExisting.baseSha : this.referenceObjectRegistrySnapshot.sha, content: registryContent, updatedAt: new Date().toISOString() });
      await this._persistReferenceObjectLocalState(localState, { silent: true });
      this.referenceObjectRegistrySnapshot = { path: registryPath, sha: registryExisting ? registryExisting.baseSha : this.referenceObjectRegistrySnapshot.sha, content: registryContent, registry, local: true };
      this.referenceObjectsLoaded = true;
      this.referenceObjectChecks = {};
      this.referenceObjectValidation = null;
      if (source.fromEditor) this.repositoryEditor = { ...this.repositoryEditor, content: wrapped };
      else if (this.repositoryPreview && this.repositoryPreview.path === source.path) {
        this.repositoryPreview = { ...this.repositoryPreview, content: wrapped, size: new TextEncoder().encode(wrapped).byteLength, localReferenceDraft: true };
        this.fileViewMode = 'source';
        this.fileRendered = null;
      }
      this._setUi(this._referenceObjectUiPatch({ replaceFileEditor: Boolean(source.fromEditor), status: `Reference Object ${name} (${id}) created locally. ${this.referenceObjectLocalState.files.length} local draft file(s) pending; GitHub was not changed.` }));
      return { id, name, definitionPath: source.path };
    };

    App.prototype.copyReferenceObjectUse = async function copyReferenceObjectUse(id) {
      const api = apiOrThrow(this);
      const snapshot = await this._ensureReferenceRegistryLoaded();
      const object = api.referenceObjectById(snapshot.registry, id);
      if (!object) throw new Error(`Reference Object not found: ${id}.`);
      const read = async () => this._effectiveReferenceObjectFile(object.definition.path);
      const file = typeof this._runFilesWorkspaceRead === 'function'
        ? await this._runFilesWorkspaceRead('Reading Reference Object definition…', read)
        : await this._runRemoteOperation('Reading Reference Object definition…', read);
      if (!file || file.cancelled) return file;
      const parsed = api.parseReferenceMarkers(file.content);
      const definitions = parsed.occurrences.filter((item) => item.role === 'def' && item.id === object.id);
      if (parsed.diagnostics.length || definitions.length !== 1) throw new Error(`Reference Object ${object.id} must have exactly one valid definition in ${object.definition.path}.`);
      const text = api.formatReferenceUse(object.id, definitions[0].value);
      await this.clipboardWriter(text);
      this._setUi(this._referenceObjectUiPatch({ status: `Reference ${object.name} copied to clipboard with its current materialized value. Paste it through normal file editing.` }));
      return text;
    };

    App.prototype.checkReferenceObjectUses = async function checkReferenceObjectUses(id) {
      const api = apiOrThrow(this);
      await this._ensureReferenceObjectLocalStateCurrent({ silent: true });
      const run = async () => {
        const client = await this._referenceObjectsClient();
        return api.checkReferenceObjectUses({ client, objectId: id, registryPath: this._referenceObjectRegistryPath(), overlays: this.referenceObjectLocalState.files });
      };
      const check = typeof this._runFilesWorkspaceRead === 'function'
        ? await this._runFilesWorkspaceRead('Checking Reference Object uses…', run)
        : await this._runRemoteOperation('Checking Reference Object uses…', run);
      if (!check || check.cancelled) return check;
      this.referenceObjectRegistrySnapshot = check.registrySnapshot;
      this.referenceObjectsLoaded = true;
      this.referenceObjectChecks = { ...(this.referenceObjectChecks || {}), [check.objectId]: check };
      const stale = check.uses.filter((item) => item.status === 'stale').length;
      this._setUi(this._referenceObjectUiPatch({ status: `Checked ${check.uses.length} use(s) for ${check.object.name}: ${stale} stale${check.incomplete ? '; scan incomplete' : ''}. No file was changed.` }));
      return check;
    };

    App.prototype.updateReferenceObjectUsesLocal = async function updateReferenceObjectUsesLocal(id) {
      const api = apiOrThrow(this);
      const check = await this.checkReferenceObjectUses(id);
      if (!check || check.cancelled) return check;
      const plan = api.buildReferenceObjectLocalUpdate(check);
      if (plan.staleCount === 0 && !check.indexDrift) {
        this._setUi(this._referenceObjectUiPatch({ status: `Reference Object ${check.object.name} is already current and its usage index matches. No local draft was created.` }));
        return plan;
      }
      let state = this.referenceObjectLocalState;
      for (const file of plan.files) {
        const existing = api.referenceObjectLocalDraftMap(state).get(file.path);
        state = api.upsertReferenceObjectLocalDraft(state, { path: file.path, baseSha: existing ? existing.baseSha : file.baseSha, content: file.content, updatedAt: new Date().toISOString() });
      }
      const registryPath = this._referenceObjectRegistryPath();
      const registryExisting = api.referenceObjectLocalDraftMap(state).get(registryPath);
      state = api.upsertReferenceObjectLocalDraft(state, { path: registryPath, baseSha: registryExisting ? registryExisting.baseSha : check.registrySnapshot.sha, content: plan.registryContent, updatedAt: new Date().toISOString() });
      await this._persistReferenceObjectLocalState(state, { silent: true });
      this.referenceObjectRegistrySnapshot = { path: registryPath, sha: registryExisting ? registryExisting.baseSha : check.registrySnapshot.sha, content: plan.registryContent, registry: plan.registry, local: true };
      this.referenceObjectsLoaded = true;
      const synthetic = {
        ...check,
        registrySnapshot: this.referenceObjectRegistrySnapshot,
        uses: plan.uses.map((use) => ({ ...use, status: 'current', value: check.currentValue })),
        indexDrift: false,
        diagnostics: (check.diagnostics || []).filter((item) => item.kind !== 'usage_index_drift')
      };
      this.referenceObjectChecks = { ...(this.referenceObjectChecks || {}), [id]: synthetic };
      const localPreview = this.repositoryPreview && api.referenceObjectLocalDraftMap(state).get(this.repositoryPreview.path);
      if (localPreview && this.repositoryPreview.kind === 'text') {
        this.repositoryPreview = { ...this.repositoryPreview, content: localPreview.content, size: new TextEncoder().encode(localPreview.content).byteLength, localReferenceDraft: true };
        this.fileViewMode = 'source';
        this.fileRendered = null;
      }
      this._setUi(this._referenceObjectUiPatch({ status: `${plan.staleCount} stale use(s) updated locally for ${check.object.name}. GitHub was not changed.` }));
      return plan;
    };

    App.prototype.updateReferenceObjectUsesGitHub = async function updateReferenceObjectUsesGitHub(id) {
      const api = apiOrThrow(this);
      await this._ensureReferenceObjectLocalStateCurrent({ silent: true });
      if (this.referenceObjectLocalState.files.length) throw new Error('Local Reference Object drafts are pending. Publish or otherwise reconcile them before an independent GitHub usage update.');
      return this._runRemoteOperation('Updating Reference Object uses on GitHub…', async () => {
        const client = await this._referenceObjectsClient();
        const result = await api.updateReferenceObjectUsesRemote({ client, objectId: id, registryPath: this._referenceObjectRegistryPath() });
        const snapshot = await api.readReferenceObjectRegistrySnapshot(client, this._referenceObjectRegistryPath(), []);
        this.referenceObjectRegistrySnapshot = snapshot;
        this.referenceObjectsLoaded = true;
        this.referenceObjectChecks = {};
        this.referenceObjectValidation = null;
        this._setUi(this._referenceObjectUiPatch({ status: `GitHub update complete for ${id}: ${result.staleCount} stale use(s) refreshed; verified writes: ${result.results.length}.` }));
        return result;
      });
    };

    App.prototype.validateReferenceObjectTags = async function validateReferenceObjectTags() {
      const api = apiOrThrow(this);
      await this._ensureReferenceObjectLocalStateCurrent({ silent: true });
      const run = async () => {
        const client = await this._referenceObjectsClient();
        return api.validateReferenceObjectTags({ client, registryPath: this._referenceObjectRegistryPath(), overlays: this.referenceObjectLocalState.files });
      };
      const label = 'Validating indexed Reference Object tags…';
      const result = typeof this._runFilesWorkspaceRead === 'function'
        ? await this._runFilesWorkspaceRead(label, run)
        : await this._runRemoteOperation(label, run);
      if (!result || result.cancelled) return result;
      this.referenceObjectValidation = result;
      this.referenceObjectRegistrySnapshot = result.registrySnapshot;
      this.referenceObjectsLoaded = true;
      this._setUi(this._referenceObjectUiPatch({ status: result.valid ? `Indexed Reference Object tags valid: ${result.counts.objects} object(s), ${result.counts.uses} use(s). Unrelated repository files were not scanned.` : `Indexed Reference Object validation found ${result.diagnostics.length} issue(s)${result.incomplete ? '; indexed check incomplete' : ''}. Nothing was changed.` }));
      return result;
    };

    App.prototype.deepValidateReferenceObjectTags = async function deepValidateReferenceObjectTags() {
      const api = apiOrThrow(this);
      await this._ensureReferenceObjectLocalStateCurrent({ silent: true });
      const run = async () => {
        const client = await this._referenceObjectsClient();
        return api.deepValidateReferenceObjectTags({ client, registryPath: this._referenceObjectRegistryPath(), overlays: this.referenceObjectLocalState.files });
      };
      const label = 'Deep-validating Reference Object tags…';
      const result = typeof this._runFilesWorkspaceRead === 'function'
        ? await this._runFilesWorkspaceRead(label, run)
        : await this._runRemoteOperation(label, run);
      if (!result || result.cancelled) return result;
      this.referenceObjectValidation = result;
      this.referenceObjectRegistrySnapshot = result.registrySnapshot;
      this.referenceObjectsLoaded = true;
      this._setUi(this._referenceObjectUiPatch({ status: result.valid ? `Deep Reference Object validation passed: ${result.counts.objects} object(s), ${result.counts.uses} use(s), ${result.counts.files} file(s) scanned.` : `Deep Reference Object validation found ${result.diagnostics.length} issue(s)${result.incomplete ? '; repository scan incomplete' : ''}. Nothing was changed.` }));
      return result;
    };

    App.prototype.renameReferenceObjectLocal = async function renameReferenceObjectLocal(id, name) {
      const api = apiOrThrow(this);
      const snapshot = await this._ensureReferenceRegistryLoaded();
      const registry = api.renameReferenceObject(snapshot.registry, id, name);
      const content = api.encodeReferenceObjectRegistry(registry);
      const path = this._referenceObjectRegistryPath();
      const existing = this._referenceObjectLocalMap().get(path);
      await this._putReferenceObjectLocalDraft(path, existing ? existing.baseSha : snapshot.sha, content, { silent: true });
      this.referenceObjectRegistrySnapshot = { path, sha: existing ? existing.baseSha : snapshot.sha, content, registry, local: true };
      this.referenceObjectsLoaded = true;
      this._setUi(this._referenceObjectUiPatch({ status: `Reference Object renamed locally to ${String(name || '').trim()}. Stable id ${id} did not change; GitHub was not changed.` }));
      return api.referenceObjectById(registry, id);
    };

    App.prototype._reindexReferenceObjectFileLocal = async function reindexReferenceObjectFileLocal(path, content, options = {}) {
      const api = apiOrThrow(this);
      if (!this.referenceObjectsLoaded || !this.referenceObjectRegistrySnapshot) {
        if (options.skipLoad) return null;
        await this._ensureReferenceRegistryLoaded();
      }
      const parsed = api.parseReferenceMarkers(content);
      if (parsed.diagnostics.length) return { diagnostics: parsed.diagnostics };
      let registry = this.referenceObjectRegistrySnapshot.registry;
      let changed = false;
      for (const object of registry.objects) {
        const existingOther = (object.uses || []).filter((use) => use.path !== path);
        const localUses = parsed.occurrences.filter((marker) => marker.role === 'use' && marker.id === object.id).map((marker) => ({ path, line: marker.line, lineOccurrence: marker.lineOccurrence }));
        const next = [...existingOther, ...localUses];
        if (JSON.stringify(next) !== JSON.stringify(object.uses || [])) {
          registry = api.replaceReferenceObjectUses(registry, object.id, next);
          changed = true;
        }
      }
      if (!changed) return { changed: false, diagnostics: [] };
      const registryPath = this._referenceObjectRegistryPath();
      const registryContent = api.encodeReferenceObjectRegistry(registry);
      const local = this._referenceObjectLocalMap().get(registryPath);
      await this._putReferenceObjectLocalDraft(registryPath, local ? local.baseSha : this.referenceObjectRegistrySnapshot.sha, registryContent, { silent: true });
      this.referenceObjectRegistrySnapshot = { path: registryPath, sha: local ? local.baseSha : this.referenceObjectRegistrySnapshot.sha, content: registryContent, registry, local: true };
      return { changed: true, diagnostics: [] };
    };

    App.prototype.saveRepositoryReferenceDraftLocal = async function saveRepositoryReferenceDraftLocal(input = {}) {
      const editor = { ...(this.repositoryEditor || {}), ...(input || {}) };
      if (editor.mode !== 'edit' || !editor.path) throw new Error('Open an existing repository text file in Edit before saving a local Reference Object draft.');
      await this._putReferenceObjectLocalDraft(editor.path, editor.baseSha, editor.content, { silent: true });
      this.repositoryEditor = { ...this.repositoryEditor, content: String(editor.content || '') };
      try { await this._reindexReferenceObjectFileLocal(editor.path, editor.content); } catch (error) { /* local file draft remains even if index read fails */ }
      this.referenceObjectChecks = {};
      this.referenceObjectValidation = null;
      this._setUi(this._referenceObjectUiPatch({ replaceFileEditor: true, status: `Saved ${editor.path} as a local Reference Object draft. GitHub was not changed.` }));
      return this._referenceObjectLocalMap().get(editor.path);
    };

    App.prototype.publishReferenceObjectLocalDraftsGitHub = async function publishReferenceObjectLocalDraftsGitHub() {
      const api = apiOrThrow(this);
      await this._ensureReferenceObjectLocalStateCurrent({ silent: true });
      if (!this.referenceObjectLocalState.files.length) {
        this._setUi(this._referenceObjectUiPatch({ status: 'No local Reference Object draft files are pending.' }));
        return [];
      }
      return this._runRemoteOperation('Publishing local Reference Object drafts to GitHub…', async () => {
        const client = await this._referenceObjectsClient();
        const registryPath = this._referenceObjectRegistryPath();
        const drafts = [...this.referenceObjectLocalState.files].sort((left, right) => (left.path === registryPath ? 1 : right.path === registryPath ? -1 : left.path.localeCompare(right.path)));
        for (const draft of drafts) await api.proveReferenceObjectExpectedBase(client, draft.path, draft.baseSha);
        const results = [];
        let state = this.referenceObjectLocalState;
        for (const draft of drafts) {
          try {
            const saved = await client.saveVerified({ path: draft.path, content: draft.content, baseSha: draft.baseSha, message: `${draft.baseSha ? 'Update' : 'Create'} Reference Object repository state ${draft.path}` });
            results.push({ target: draft.path, status: 'completed', sha: String(saved && saved.sha || ''), message: 'Exact GitHub read-back verified.' });
            state = api.removeReferenceObjectLocalDraft(state, draft.path);
            await this._persistReferenceObjectLocalState(state, { silent: true });
          } catch (error) {
            results.push({ target: draft.path, status: 'failed', message: errorText(error) });
            const partial = new Error(`Publishing local Reference Object drafts stopped after ${results.filter((item) => item.status === 'completed').length} verified file(s). Completed GitHub writes remain; pending drafts are preserved.`);
            partial.kind = 'partial_reference_object_publish';
            partial.partialResults = results;
            this._setUi(this._referenceObjectUiPatch());
            throw partial;
          }
        }
        const snapshot = await api.readReferenceObjectRegistrySnapshot(client, registryPath, []);
        this.referenceObjectRegistrySnapshot = snapshot;
        this.referenceObjectsLoaded = true;
        this.referenceObjectChecks = {};
        this.referenceObjectValidation = null;
        this._setUi(this._referenceObjectUiPatch({ status: `Published ${results.length} local Reference Object draft file(s) to GitHub with exact read-back verification.` }));
        return results;
      });
    };

    App.prototype.openReferenceObjectDefinition = async function openReferenceObjectDefinition(id) {
      const api = apiOrThrow(this);
      const snapshot = await this._ensureReferenceRegistryLoaded();
      const object = api.referenceObjectById(snapshot.registry, id);
      if (!object) throw new Error(`Reference Object not found: ${id}.`);
      const path = object.definition.path;
      const preview = await this.openRepositoryEntry({ type: 'file', path, name: path.slice(path.lastIndexOf('/') + 1) });
      const parsed = api.parseReferenceMarkers(preview && preview.content || '');
      const definition = parsed.occurrences.find((item) => item.role === 'def' && item.id === id);
      this.referenceObjectFocus = { objectId: id, path, line: definition ? definition.line : 1, lineOccurrence: definition ? definition.lineOccurrence : 1, role: 'definition' };
      this._setUi(this._referenceObjectUiPatch({ status: `Opened definition for ${object.name}: ${path}.` }));
      return preview;
    };

    App.prototype.openReferenceObjectUse = async function openReferenceObjectUse(id, use = {}) {
      const path = String(use.path || '').trim();
      if (!path) throw new Error('Reference Object use path is required.');
      const preview = await this.openRepositoryEntry({ type: 'file', path, name: path.slice(path.lastIndexOf('/') + 1) });
      this.fileViewMode = 'source';
      this.fileRendered = null;
      this.referenceObjectFocus = { objectId: id, path, line: Math.max(1, Number(use.line) || 1), lineOccurrence: Math.max(1, Number(use.lineOccurrence) || 1), role: 'use' };
      this._setUi(this._referenceObjectUiPatch({ status: `Opened ${path} at Reference Object use line ${this.referenceObjectFocus.line}, occurrence #${this.referenceObjectFocus.lineOccurrence}.` }));
      return preview;
    };

    if (typeof originalOpenRepositoryEntry === 'function') {
      App.prototype.openRepositoryEntry = async function referenceObjectsOpenRepositoryEntry(entry, contextOverride = null) {
        const result = await originalOpenRepositoryEntry.call(this, entry, contextOverride);
        if (contextOverride || !this.repositoryPreview || !this.repositoryPreview.path || this.repositoryPreview.kind !== 'text') return result;
        await this._ensureReferenceObjectLocalStateCurrent({ silent: true });
        const draft = this._referenceObjectLocalMap().get(this.repositoryPreview.path);
        if (!draft) return result;
        this.repositoryPreview = { ...this.repositoryPreview, content: draft.content, size: new TextEncoder().encode(draft.content).byteLength, sha: draft.baseSha || this.repositoryPreview.sha, localReferenceDraft: true };
        this.fileViewMode = 'source';
        this.fileRendered = null;
        this._setUi(this._referenceObjectUiPatch({ status: `Opened pending local state for ${draft.path}; GitHub base SHA is ${draft.baseSha || '(new path)'}.` }));
        return this.repositoryPreview;
      };
    }

    if (typeof originalBeginRepositoryFileEdit === 'function') {
      App.prototype.beginRepositoryFileEdit = async function referenceObjectsBeginRepositoryFileEdit(...args) {
        await this._ensureReferenceObjectLocalStateCurrent({ silent: true });
        const preview = this.repositoryPreview;
        const draft = preview && preview.path ? this._referenceObjectLocalMap().get(preview.path) : null;
        if (!draft) return originalBeginRepositoryFileEdit.apply(this, args);
        this.repositoryEditor = {
          mode: 'edit',
          parentPath: preview.path.includes('/') ? preview.path.slice(0, preview.path.lastIndexOf('/')) : '',
          path: preview.path,
          name: preview.name || preview.path.slice(preview.path.lastIndexOf('/') + 1),
          content: draft.content,
          baseSha: draft.baseSha || preview.sha || ''
        };
        this.fileViewMode = 'source';
        this.surface = 'files';
        this._setUi(this._referenceObjectUiPatch({ replaceFileEditor: true, status: `Editing pending local state for ${preview.path}. Save locally, then use Update current file or Update all.` }));
        return this.repositoryEditor;
      };
    }

    if (typeof originalSaveRepositoryEditor === 'function') {
      App.prototype.saveRepositoryEditor = async function referenceObjectsSaveRepositoryEditor(input = {}) {
        const requested = { ...(this.repositoryEditor || {}), ...(input || {}) };
        const result = await originalSaveRepositoryEditor.call(this, input);
        if (!result || !result.path || requested.mode === 'folder') return result;
        await this._ensureReferenceObjectLocalStateCurrent({ silent: true });
        if (this._referenceObjectLocalMap().has(result.path)) await this._removeReferenceObjectLocalDraft(result.path, { silent: true });
        const content = String(result.content == null ? requested.content || '' : result.content);
        try {
          if (/obs-ref:(?:def|use)/.test(content) || this.referenceObjectsLoaded) await this._reindexReferenceObjectFileLocal(result.path, content);
        } catch (error) { /* remote file is already verified; index remains explicitly repairable */ }
        this.referenceObjectChecks = {};
        this.referenceObjectValidation = null;
        this._setUi(this._referenceObjectUiPatch({ status: `${result.path} saved to GitHub. Reference Object usage index is local until separately published when changed.` }));
        return result;
      };
    }

    async function reloadAfterWorkspaceChange(app, result) {
      await app._loadReferenceObjectLocalState();
      return result;
    }

    if (typeof originalSelectWorkspace === 'function') App.prototype.selectWorkspace = async function referenceObjectsSelectWorkspace(...args) { return reloadAfterWorkspaceChange(this, await originalSelectWorkspace.apply(this, args)); };
    if (typeof originalSaveWorkspace === 'function') App.prototype.saveWorkspace = async function referenceObjectsSaveWorkspace(...args) { return reloadAfterWorkspaceChange(this, await originalSaveWorkspace.apply(this, args)); };
    if (typeof originalDeleteWorkspace === 'function') App.prototype.deleteWorkspace = async function referenceObjectsDeleteWorkspace(...args) { return reloadAfterWorkspaceChange(this, await originalDeleteWorkspace.apply(this, args)); };
    if (typeof originalOpenPanel === 'function') App.prototype.openPanel = async function referenceObjectsOpenPanel(...args) { const result = await originalOpenPanel.apply(this, args); await this._ensureReferenceObjectLocalStateCurrent(); return result; };

    App.prototype.start = async function referenceObjectsStart(...args) {
      if (this.ui && this.ui.handlers) Object.assign(this.ui.handlers, {
        onLoadReferenceObjects: (force) => this.loadReferenceObjects(force),
        onFindReferenceObjectCandidates: (value) => this.findReferenceObjectCandidates(value),
        onCreateReferenceObjectLocal: (input) => this.createReferenceObjectLocal(input),
        onCopyReferenceObjectUse: (id) => this.copyReferenceObjectUse(id),
        onCheckReferenceObjectUses: (id) => this.checkReferenceObjectUses(id),
        onUpdateReferenceObjectUsesLocal: (id) => this.updateReferenceObjectUsesLocal(id),
        onUpdateReferenceObjectUsesGitHub: (id) => this.updateReferenceObjectUsesGitHub(id),
        onValidateReferenceObjectTags: () => this.validateReferenceObjectTags(),
        onDeepValidateReferenceObjectTags: () => this.deepValidateReferenceObjectTags(),
        onRenameReferenceObjectLocal: (id, name) => this.renameReferenceObjectLocal(id, name),
        onSaveRepositoryReferenceDraftLocal: (input) => this.saveRepositoryReferenceDraftLocal(input),
        onPublishReferenceObjectLocalDraftsGitHub: () => this.publishReferenceObjectLocalDraftsGitHub(),
        onOpenReferenceObjectDefinition: (id) => this.openReferenceObjectDefinition(id),
        onOpenReferenceObjectUse: (id, use) => this.openReferenceObjectUse(id, use)
      });
      const result = await originalStart.apply(this, args);
      await this._loadReferenceObjectLocalState();
      return result;
    };

    return true;
  }

  function escapeHtml(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
  }

  function contextKey(ui) {
    const state = ui && ui.state || {};
    const workspace = (Array.isArray(state.workspaces) ? state.workspaces : []).find((item) => item && item.id === state.activeWorkspaceId) || null;
    if (!workspace) return String(state.activeWorkspaceId || '');
    try { return (root.ObsLinkedNotes || {}).referenceObjectLocalStoreKey(workspace); } catch (error) { return String(state.activeWorkspaceId || ''); }
  }

  function detachModals(ui) {
    if (!ui || !ui.shadow) return [];
    const nodes = [];
    ui.shadow.querySelectorAll('[data-reference-object-modal]').forEach((node) => { node.remove(); nodes.push(node); });
    return nodes;
  }

  function restoreModals(ui, nodes) {
    if (!ui || !ui.shadow) return;
    const key = contextKey(ui);
    for (const node of nodes || []) if (String(node.__referenceObjectContextKey || '') === key) ui.shadow.appendChild(node);
  }

  function appendStyle(ui) {
    if (!ui.shadow || ui.shadow.querySelector('style[data-reference-object-style]')) return;
    const style = document.createElement('style');
    style.dataset.referenceObjectStyle = '1';
    style.textContent = `
      .reference-objects-menu { position:relative; display:inline-flex; }
      .reference-objects-menu > summary { cursor:pointer; display:inline-flex; align-items:center; min-height:34px; padding:6px 10px; border:1px solid var(--border); border-radius:7px; background:var(--surface); list-style:none; }
      .reference-objects-menu > summary::-webkit-details-marker { display:none; }
      .reference-objects-panel { position:absolute; z-index:2147483646; top:calc(100% + 6px); right:0; width:min(680px,86vw); max-height:min(620px,74vh); overflow:auto; display:grid; gap:8px; padding:10px; border:1px solid var(--border); border-radius:9px; background:var(--surface-2); box-shadow:0 14px 38px rgba(0,0,0,.58); }
      .reference-object-top-actions, .reference-object-actions { display:flex; gap:6px; flex-wrap:wrap; align-items:center; }
      .reference-object-search { width:100%; }
      .reference-object-list { display:grid; gap:7px; }
      .reference-object-row { border:1px solid var(--border); border-radius:8px; padding:8px; display:grid; gap:6px; }
      .reference-object-row small { color:var(--muted); overflow-wrap:anywhere; }
      .reference-object-uses { border-top:1px solid var(--border); padding-top:5px; }
      .reference-object-use-list { display:grid; gap:4px; margin-top:5px; }
      .reference-object-use { width:100%; display:grid; grid-template-columns:auto minmax(0,1fr); gap:8px; text-align:left; align-items:start; }
      .reference-object-use.stale { background:rgba(220,174,60,.22); border-color:rgba(240,195,72,.65); }
      .reference-object-use.current { border-color:rgba(90,190,120,.5); }
      .reference-object-diagnostics { display:grid; gap:4px; max-height:180px; overflow:auto; }
      .reference-object-diagnostic { padding:5px 6px; border:1px solid var(--border); border-radius:6px; }
      .reference-object-modal-backdrop { position:absolute; inset:0; z-index:2147483647; display:grid; place-items:center; padding:18px; background:rgba(0,0,0,.72); }
      .reference-object-modal { width:min(780px,calc(100% - 16px)); max-height:calc(100% - 16px); overflow:auto; display:grid; gap:10px; padding:14px; border:1px solid var(--border); border-radius:10px; background:var(--surface-2); }
      .reference-object-modal textarea { min-height:150px; resize:vertical; }
      .reference-object-candidates { display:grid; gap:6px; max-height:320px; overflow:auto; }
      .reference-object-candidate { text-align:left; display:grid; gap:3px; }
      .reference-object-candidate.active { outline:2px solid var(--accent); }
      .reference-object-candidate code { white-space:pre-wrap; overflow-wrap:anywhere; }
      .reference-object-highlight { background:rgba(255,218,92,.28); border-radius:3px; }
      .reference-focus-occurrence { background:rgba(255,218,92,.28); outline:1px solid rgba(255,218,92,.65); border-radius:3px; }
      .reference-object-local-badge { color:#ffd86a; }
    `;
    ui.shadow.appendChild(style);
  }

  function directHandler(ui, name, ...args) {
    const handler = ui && ui.handlers && ui.handlers[name];
    if (typeof handler !== 'function') return Promise.reject(new Error(`Reference Object handler unavailable: ${name}.`));
    try { return Promise.resolve(handler(...args)); } catch (error) { return Promise.reject(error); }
  }

  function candidateContextHtml(candidate) {
    if (candidate.multiline) return `<code>${escapeHtml(previewText(candidate.value, 300))}</code>`;
    const line = String(candidate.lineText || '');
    const start = Math.max(0, Number(candidate.lineMatchStart) || 0);
    const end = Math.max(start, Number(candidate.lineMatchEnd) || start);
    return `<code>${escapeHtml(line.slice(0, start))}<span class="reference-object-highlight">${escapeHtml(line.slice(start, end))}</span>${escapeHtml(line.slice(end))}</code>`;
  }

  function openCreateModal(ui) {
    if (!ui.shadow || ui.shadow.querySelector('[data-reference-object-modal="create"]')) return;
    const backdrop = document.createElement('div');
    backdrop.className = 'reference-object-modal-backdrop';
    backdrop.dataset.referenceObjectModal = 'create';
    backdrop.__referenceObjectContextKey = contextKey(ui);
    backdrop.innerHTML = `<section class="reference-object-modal"><h3>Create Reference Object</h3><div class="hint">Paste the exact value copied from the currently open file. Find is exact only; no fuzzy matching and no GitHub write.</div><textarea data-reference-exact-value placeholder="Paste exact text / number / Markdown block"></textarea><div class="reference-object-actions"><button data-reference-find>Find exact occurrences</button><button data-reference-close>Close</button></div><div class="hint" data-reference-find-status>Choose one exact occurrence after searching.</div><div class="reference-object-candidates" data-reference-candidates></div><label class="field"><span>Reference Object name</span><input data-reference-name placeholder="Base damage"></label><button class="primary" data-reference-create disabled>Create locally</button></section>`;
    ui.shadow.appendChild(backdrop);
    const status = backdrop.querySelector('[data-reference-find-status]');
    const list = backdrop.querySelector('[data-reference-candidates]');
    const create = backdrop.querySelector('[data-reference-create]');
    let selected = null;
    backdrop.querySelector('[data-reference-close]').addEventListener('click', () => backdrop.remove());
    backdrop.querySelector('[data-reference-find]').addEventListener('click', async () => {
      selected = null; create.disabled = true; list.innerHTML = ''; status.textContent = 'Finding exact occurrences…';
      try {
        const result = await directHandler(ui, 'onFindReferenceObjectCandidates', backdrop.querySelector('[data-reference-exact-value]').value);
        const candidates = result && result.candidates || [];
        status.textContent = candidates.length ? `${candidates.length} exact occurrence(s) found in ${result.path}. Choose one.` : 'No exact occurrence found. Nothing was changed.';
        list.innerHTML = candidates.map((candidate, index) => `<button class="reference-object-candidate" data-reference-candidate="${index}"><strong>Line ${candidate.line} · occurrence ${candidate.lineOccurrence}</strong>${candidateContextHtml(candidate)}</button>`).join('');
        list.querySelectorAll('[data-reference-candidate]').forEach((button) => button.addEventListener('click', () => {
          list.querySelectorAll('[data-reference-candidate]').forEach((item) => item.classList.remove('active'));
          button.classList.add('active'); selected = candidates[Number(button.dataset.referenceCandidate)]; create.disabled = !selected;
        }));
      } catch (error) { status.textContent = `Find failed: ${errorText(error)}`; }
    });
    create.addEventListener('click', async () => {
      if (!selected) return;
      const name = backdrop.querySelector('[data-reference-name]').value;
      try {
        await ui._call('onCreateReferenceObjectLocal', { name, candidate: selected });
        backdrop.remove();
      } catch (error) { status.textContent = `Create failed: ${errorText(error)}`; }
    });
  }

  function usageListHtml(object, check) {
    const uses = check && Array.isArray(check.uses) ? check.uses : (object.uses || []).map((use) => ({ ...use, status: 'unchecked', storedPreview: '', currentPreview: '' }));
    if (!uses.length) return '<div class="hint">No indexed uses.</div>';
    return uses.map((use, index) => `<button class="reference-object-use ${escapeHtml(use.status || 'unchecked')}" data-reference-use-index="${index}" data-reference-use-object="${escapeHtml(object.id)}"><strong>${use.status === 'stale' ? '⚠' : use.status === 'current' ? '✓' : '•'}</strong><span>${escapeHtml(use.path)} : ${escapeHtml(use.line)} · #${escapeHtml(use.lineOccurrence)}${use.status === 'stale' ? `<br><small>stored: ${escapeHtml(use.storedPreview || '')}<br>current: ${escapeHtml(use.currentPreview || '')}</small>` : ''}</span></button>`).join('');
  }

  function validationHtml(validation) {
    if (!validation) return '';
    const repository = validation.scope === 'repository';
    const label = repository ? 'Repository tags' : 'Indexed tags';
    const incomplete = validation.incomplete ? (repository ? ' · incomplete repository scan' : ' · incomplete indexed check') : '';
    const summary = validation.valid ? `✓ ${label} valid · ${validation.counts.objects || 0} object(s) · ${validation.counts.uses || 0} use(s)` : `⚠ ${validation.diagnostics.length} ${repository ? 'deep' : 'indexed'} validation issue(s)${incomplete}`;
    const rows = validation.diagnostics.slice(0, 80).map((item) => `<div class="reference-object-diagnostic"><strong>${escapeHtml(item.kind)}</strong>${item.objectId ? ` · ${escapeHtml(item.objectId)}` : ''}${item.path ? `<br><code>${escapeHtml(item.path)}</code>` : ''}${item.message ? `<br><small>${escapeHtml(item.message)}</small>` : ''}</div>`).join('');
    return `<details><summary>${summary}</summary><div class="reference-object-diagnostics">${rows || '<div class="hint">No issues.</div>'}</div></details>`;
  }

  function attachReferenceObjectsMenuPanel(ui, details, panel) {
    const api = root.ObsLinkedNotes || {};
    if (!panel || typeof api.portalFilesWorkspaceDropdownPanel !== 'function') return false;
    return api.portalFilesWorkspaceDropdownPanel(ui, details, panel, {
      key: 'reference-objects',
      maxWidth: 680,
      maxHeight: 620,
      onOpen: () => {
        if (!ui.state || ui.state.referenceObjectsLoaded) return undefined;
        return ui._call('onLoadReferenceObjects', false);
      }
    });
  }

  function renderReferenceObjectMenu(ui, details) {
    const state = ui.state || {};
    const objects = Array.isArray(state.referenceObjects) ? state.referenceObjects : [];
    const checks = state.referenceObjectChecks || {};
    const pending = Array.isArray(state.referenceObjectPendingFiles) ? state.referenceObjectPendingFiles : [];
    const rows = objects.map((object) => {
      const check = checks[object.id] || null;
      const stale = check ? check.staleCount : 0;
      return `<div class="reference-object-row" data-reference-object-row data-reference-search="${escapeHtml(`${object.name} ${object.id} ${object.definition && object.definition.path || ''}`.toLowerCase())}"><div><strong>${escapeHtml(object.name)}</strong> ${stale ? `<span class="reference-object-local-badge">· ${stale} stale</span>` : ''}<br><small>${escapeHtml(object.id)} · ${escapeHtml(object.definition && object.definition.path || '')}</small></div><div class="reference-object-actions"><button data-reference-copy="${escapeHtml(object.id)}">Copy reference</button><button data-reference-open-definition="${escapeHtml(object.id)}">Open definition</button><button data-reference-check="${escapeHtml(object.id)}">Check uses</button><button data-reference-update-local="${escapeHtml(object.id)}">Update locally</button></div><details class="reference-object-uses"><summary>▸ Uses (${escapeHtml(check ? check.uses.length : (object.uses || []).length)})</summary><div class="reference-object-use-list">${usageListHtml(object, check)}</div></details><details><summary>Rename</summary><div class="reference-object-actions"><input data-reference-rename-input="${escapeHtml(object.id)}" value="${escapeHtml(object.name)}"><button data-reference-rename="${escapeHtml(object.id)}">Save locally</button></div></details></div>`;
    }).join('') || '<div class="hint">No Reference Objects loaded.</div>';
    details.innerHTML = `<summary>Reference objects ▾${pending.length ? ` · ${pending.length} local` : ''}</summary><div class="reference-objects-panel"><div class="reference-object-top-actions"><button data-reference-create>+ Create Reference Object</button><button data-reference-refresh>Refresh list</button><button data-reference-validate>Validate tags</button><button data-reference-deep-validate>Deep validate repo</button></div><small>Definitions File: <code>${escapeHtml(state.referenceObjectRegistryPath || '.linked-notes/reference-objects.json')}</code>. Validate tags checks only indexed definition/use paths; Deep validate repo performs the bounded repository-wide integrity scan. Reference Object actions are local; use the standard Update current file or Update all action to publish.</small><input class="reference-object-search" data-reference-search placeholder="Search Reference Objects…" value="${escapeHtml(ui.__referenceObjectQuery || '')}">${validationHtml(state.referenceObjectValidation)}<div class="reference-object-list">${rows}</div></div>`;
    const panel = details.querySelector('.reference-objects-panel');
    const scope = panel || details;
    const search = scope.querySelector('[data-reference-search]');
    const applyFilter = () => {
      const query = String(search && search.value || '').trim().toLowerCase();
      ui.__referenceObjectQuery = query;
      scope.querySelectorAll('[data-reference-object-row]').forEach((row) => { row.hidden = Boolean(query && !String(row.dataset.referenceSearch || '').includes(query)); });
    };
    if (search) { search.addEventListener('input', applyFilter); applyFilter(); }
    scope.querySelector('[data-reference-create]')?.addEventListener('click', () => { const api = root.ObsLinkedNotes || {}; if (typeof api.closeFilesWorkspaceTopPopup === 'function') api.closeFilesWorkspaceTopPopup(ui); openCreateModal(ui); });
    scope.querySelector('[data-reference-refresh]')?.addEventListener('click', () => ui._call('onLoadReferenceObjects', true).catch(() => {}));
    scope.querySelector('[data-reference-validate]')?.addEventListener('click', () => ui._call('onValidateReferenceObjectTags').catch(() => {}));
    scope.querySelector('[data-reference-deep-validate]')?.addEventListener('click', () => ui._call('onDeepValidateReferenceObjectTags').catch(() => {}));
    scope.querySelectorAll('[data-reference-copy]').forEach((button) => button.addEventListener('click', () => ui._call('onCopyReferenceObjectUse', button.dataset.referenceCopy).catch(() => {})));
    scope.querySelectorAll('[data-reference-open-definition]').forEach((button) => button.addEventListener('click', () => ui._call('onOpenReferenceObjectDefinition', button.dataset.referenceOpenDefinition).catch(() => {})));
    scope.querySelectorAll('[data-reference-check]').forEach((button) => button.addEventListener('click', () => ui._call('onCheckReferenceObjectUses', button.dataset.referenceCheck).catch(() => {})));
    scope.querySelectorAll('[data-reference-update-local]').forEach((button) => button.addEventListener('click', () => ui._call('onUpdateReferenceObjectUsesLocal', button.dataset.referenceUpdateLocal).catch(() => {})));
    scope.querySelectorAll('[data-reference-rename]').forEach((button) => button.addEventListener('click', () => {
      const input = Array.from(scope.querySelectorAll('[data-reference-rename-input]')).find((node) => node.dataset.referenceRenameInput === button.dataset.referenceRename);
      ui._call('onRenameReferenceObjectLocal', button.dataset.referenceRename, input && input.value).catch(() => {});
    }));
    scope.querySelectorAll('[data-reference-use-index]').forEach((button) => button.addEventListener('click', () => {
      const object = objects.find((item) => item.id === button.dataset.referenceUseObject);
      if (!object) return;
      const check = checks[object.id];
      const uses = check && check.uses || object.uses || [];
      const use = uses[Number(button.dataset.referenceUseIndex)];
      if (use) ui._call('onOpenReferenceObjectUse', object.id, use).catch(() => {});
    }));
    return panel;
  }

  function enhanceReferenceObjectsMenu(ui) {
    if (!ui.shadow || typeof document === 'undefined') return;
    const host = ui.shadow.querySelector('.surface-tabs') || ui.shadow.querySelector('.editor-toolbar');
    if (!host || host.querySelector('[data-reference-objects-menu]')) return;
    const details = document.createElement('details');
    details.className = 'reference-objects-menu';
    details.dataset.referenceObjectsMenu = '1';
    details.open = false;
    const panel = renderReferenceObjectMenu(ui, details);
    host.appendChild(details);
    attachReferenceObjectsMenuPanel(ui, details, panel);
  }

  function enhanceLocalDraftSave(ui) {
    if (!ui.shadow || ui.state.surface !== 'files') return;
    const editor = ui.state.repositoryEditor || {};
    if (editor.mode !== 'edit') return;
    const actions = ui.shadow.querySelector('.repository-editor .repository-editor-actions');
    if (!actions || actions.querySelector('[data-reference-save-local]')) return;
    const button = document.createElement('button');
    button.dataset.referenceSaveLocal = '1';
    button.textContent = 'Save local draft';
    button.addEventListener('click', () => {
      const content = ui.shadow.querySelector('[data-role="repository-file-content"]');
      ui._call('onSaveRepositoryReferenceDraftLocal', { ...editor, content: content ? content.value : editor.content || '' }).catch(() => {});
    });
    actions.insertBefore(button, actions.firstChild);
  }

  function enhanceReferenceFocus(ui) {
    if (!ui.shadow || ui.state.surface !== 'files') return;
    const focus = ui.state.referenceObjectFocus;
    const preview = ui.state.repositoryPreview;
    if (!focus || !preview || focus.path !== preview.path || ui.state.fileViewMode === 'rendered') return;
    const pre = ui.shadow.querySelector('.file-preview pre');
    if (!pre) return;
    const text = pre.textContent || '';
    const occurrence = locateReferenceFocusOccurrence(root.ObsLinkedNotes || {}, text, focus);
    if (!occurrence) return;
    pre.innerHTML = `${escapeHtml(text.slice(0, occurrence.fullStart))}<span class="reference-focus-occurrence" data-reference-focus-occurrence>${escapeHtml(text.slice(occurrence.fullStart, occurrence.fullEnd))}</span>${escapeHtml(text.slice(occurrence.fullEnd))}`;
    const target = pre.querySelector('[data-reference-focus-occurrence]');
    if (target && typeof target.scrollIntoView === 'function') setTimeout(() => target.scrollIntoView({ block: 'center', inline: 'nearest' }), 0);
  }

  function patchUi(UI) {
    if (!UI || !UI.prototype || UI.prototype[UI_PATCH]) return false;
    Object.defineProperty(UI.prototype, UI_PATCH, { value: true, configurable: false, enumerable: false, writable: false });
    const originalRender = UI.prototype.render;
    UI.prototype.render = function referenceObjectsRender(...args) {
      const modals = detachModals(this);
      let result;
      try {
        result = originalRender.apply(this, args);
        if (!this.shadow || typeof document === 'undefined') return result;
        appendStyle(this);
        enhanceReferenceObjectsMenu(this);
        enhanceReferenceFocus(this);
        return result;
      } finally {
        restoreModals(this, modals);
      }
    };
    return true;
  }

  function installRepositoryReferenceObjects(api = root.ObsLinkedNotes || {}) {
    if (!api || !api.LinkedNotesApp || !api.LinkedNotesUI) return false;
    const appPatched = patchApp(api.LinkedNotesApp);
    const uiPatched = patchUi(api.LinkedNotesUI);
    return appPatched || uiPatched;
  }

  return { installRepositoryReferenceObjects, locateReferenceFocusOccurrence, attachReferenceObjectsMenuPanel };
});

/* src/repository-local-changes-runtime.js */
(function (root, factory) {
  const api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
  if (root.ObsLinkedNotes && root.ObsLinkedNotes.LinkedNotesApp && root.ObsLinkedNotes.LinkedNotesUI) {
    try { api.installRepositoryLocalChanges(root.ObsLinkedNotes); } catch (error) { /* bootstrap reports failures later */ }
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function (root) {
  'use strict';

  const APP_PATCH = '__obsRepositoryLocalChangesAppV1';
  const UI_PATCH = '__obsRepositoryLocalChangesUiV1';

  function apiOrThrow(app) {
    const api = app && app.api || root.ObsLinkedNotes || {};
    for (const name of ['normalizeRepositoryLocalChangeState', 'repositoryLocalChangeMap', 'upsertRepositoryLocalChange', 'publishCurrentRepositoryChange', 'publishAllRepositoryChanges', 'bytesToBase64']) {
      if (typeof api[name] !== 'function') throw new Error(`Local-first repository dependency is unavailable: ${name}.`);
    }
    return api;
  }

  function pathForEditor(api, editor) {
    const mode = editor.mode;
    const parent = api.normalizeFilesWorkspacePath ? api.normalizeFilesWorkspacePath(editor.parentPath || '', { allowRoot: true }) : String(editor.parentPath || '');
    if (mode === 'edit') return api.normalizeRepositoryLocalPath(editor.path);
    const name = api.normalizeFilesWorkspacePath ? api.normalizeFilesWorkspacePath(editor.name, { allowRoot: false, label: mode === 'folder' ? 'Folder name' : 'File name' }) : String(editor.name || '');
    if (name.includes('/')) throw new Error('Name must be one repository path segment.');
    const joined = parent ? `${parent}/${name}` : name;
    return mode === 'folder' ? `${joined}/.gitkeep` : joined;
  }

  function mergePendingEntries(app, path, entries) {
    const api = apiOrThrow(app);
    const folder = api.normalizeFilesWorkspacePath ? api.normalizeFilesWorkspacePath(path || '', { allowRoot: true }) : String(path || '');
    const prefix = folder ? `${folder}/` : '';
    const merged = new Map((Array.isArray(entries) ? entries : []).map((entry) => [entry.path, { ...entry }]));
    for (const change of api.normalizeRepositoryLocalChangeState(app.referenceObjectLocalState || null).files) {
      if (!change.path.startsWith(prefix)) continue;
      const rest = change.path.slice(prefix.length);
      if (!rest) continue;
      const slash = rest.indexOf('/');
      const name = slash < 0 ? rest : rest.slice(0, slash);
      const entryPath = prefix ? `${folder}/${name}` : name;
      const directChange = slash < 0 ? change : null;
      const current = merged.get(entryPath);
      merged.set(entryPath, {
        ...(current || {}),
        type: slash < 0 ? 'file' : 'dir',
        path: entryPath,
        name,
        sha: directChange ? directChange.baseSha : String(current && current.sha || ''),
        size: directChange ? (directChange.payloadKind === 'binary' ? api.base64ToBytes(directChange.bytesBase64).byteLength : new TextEncoder().encode(directChange.content).byteLength) : Number(current && current.size || 0),
        localPending: true
      });
    }
    const values = [...merged.values()];
    return app.api.sortRepositoryEntries ? app.api.sortRepositoryEntries(values) : values.sort((left, right) => (left.type === right.type ? left.name.localeCompare(right.name) : left.type === 'dir' ? -1 : 1));
  }

  function patchApp(App) {
    if (!App || !App.prototype || App.prototype[APP_PATCH]) return false;
    Object.defineProperty(App.prototype, APP_PATCH, { value: true });
    const originalStart = App.prototype.start;
    const originalUiState = App.prototype._workspaceUiState;
    const originalOpenRepositoryEntry = App.prototype.openRepositoryEntry;
    const originalBrowseRepository = App.prototype.browseRepository;

    App.prototype._repositoryPendingUiState = function repositoryPendingUiState() {
      const state = apiOrThrow(this).normalizeRepositoryLocalChangeState(this.referenceObjectLocalState || null);
      const previewPath = this.repositoryPreview && this.repositoryPreview.path || '';
      return {
        repositoryPendingChanges: state.files.map((file) => ({ path: file.path, source: file.source, payloadKind: file.payloadKind, operation: file.operation, updatedAt: file.updatedAt })),
        repositoryPendingCount: state.files.length,
        repositoryCurrentFilePending: Boolean(previewPath && state.files.some((file) => file.path === previewPath))
      };
    };

    if (typeof originalUiState === 'function') App.prototype._workspaceUiState = function localChangesWorkspaceUiState(...args) {
      const state = originalUiState.apply(this, args);
      return { ...state, repositoryEntries: mergePendingEntries(this, state.repositoryPath || '', state.repositoryEntries), ...this._repositoryPendingUiState() };
    };

    App.prototype._openPendingRepositoryFile = function openPendingRepositoryFile(change) {
      const workspace = this._activeWorkspace();
      const binary = change.payloadKind === 'binary';
      const size = binary ? apiOrThrow(this).base64ToBytes(change.bytesBase64).byteLength : new TextEncoder().encode(change.content).byteLength;
      this.repositoryPreview = {
        kind: binary ? 'unsupported' : 'text', path: change.path, name: change.path.slice(change.path.lastIndexOf('/') + 1), size, sha: change.baseSha,
        ...(binary ? { content: null, message: 'Pending binary file; exact bytes are preserved locally and can be published.' } : { content: change.content }),
        localRepositoryChange: true, context: workspace ? { owner: workspace.owner, repo: workspace.repo, branch: workspace.branch } : null
      };
      this.repositoryPath = change.path.includes('/') ? change.path.slice(0, change.path.lastIndexOf('/')) : '';
      this.repositoryEditor = { mode: 'none', parentPath: this.repositoryPath, path: '', name: '', content: '', baseSha: '' };
      this.fileViewMode = 'source';
      this.fileRendered = null;
      this.surface = 'files';
      this._setUi({ status: `Opened pending local state for ${change.path}. GitHub was not read or changed.` });
      return this.repositoryPreview;
    };

    if (typeof originalOpenRepositoryEntry === 'function') App.prototype.openRepositoryEntry = async function localChangesOpenRepositoryEntry(entry, ...args) {
      await this._ensureReferenceObjectLocalStateCurrent({ silent: true });
      const api = apiOrThrow(this);
      const path = api.normalizeRepositoryLocalPath(entry && entry.path);
      const change = api.repositoryLocalChangeMap(this.referenceObjectLocalState).get(path);
      if (change && (!entry || entry.type !== 'dir')) return this._openPendingRepositoryFile(change);
      if (entry && entry.type === 'dir' && this.referenceObjectLocalState.files.some((file) => file.path.startsWith(`${path}/`))) return this.browseRepository(path);
      return originalOpenRepositoryEntry.call(this, entry, ...args);
    };

    if (typeof originalBrowseRepository === 'function') App.prototype.browseRepository = async function localChangesBrowseRepository(path = '', ...args) {
      await this._ensureReferenceObjectLocalStateCurrent({ silent: true });
      const api = apiOrThrow(this);
      const folder = api.normalizeFilesWorkspacePath ? api.normalizeFilesWorkspacePath(path || '', { allowRoot: true }) : String(path || '');
      const hasPending = this.referenceObjectLocalState.files.some((file) => !folder || file.path.startsWith(`${folder}/`));
      if (!hasPending) return originalBrowseRepository.call(this, path, ...args);
      const client = await this._client(this._activeWorkspace());
      let remote = [];
      try { remote = await client.listDirectory(folder, { maxEntries: 200 }); }
      catch (error) { if (!error || error.kind !== 'not_found') throw error; }
      this.repositoryPath = folder;
      this.repositoryEntries = mergePendingEntries(this, folder, remote);
      this.repositoryPreview = null;
      this.repositoryBrowseLoaded = true;
      this.surface = 'files';
      this._setUi({ status: `Repository folder ${folder || '/'} loaded with pending local entries.` });
      return this.repositoryEntries;
    };

    App.prototype._stageRepositoryChange = async function stageRepositoryChange(change, options = {}) {
      const api = apiOrThrow(this);
      await this._ensureReferenceObjectLocalStateCurrent({ silent: true });
      const previous = api.repositoryLocalChangeMap(this.referenceObjectLocalState).get(change.path);
      const next = api.upsertRepositoryLocalChange(this.referenceObjectLocalState, {
        ...change,
        baseSha: previous ? previous.baseSha : String(change.baseSha || ''),
        updatedAt: new Date().toISOString()
      });
      await this._persistReferenceObjectLocalState(next, { silent: true });
      this.referenceFreshnessDiagnostics = null;
      if (!options.silent) this._setUi({ status: `${change.path} saved locally. GitHub was not changed.` });
      return api.repositoryLocalChangeMap(next).get(change.path);
    };

    App.prototype._stageRepositoryTextChange = function stageRepositoryTextChange(path, baseSha, content, options = {}) {
      const maxBytes = this.api.DEFAULT_TEXT_FILE_MAX_BYTES || this.api.DEFAULT_PREVIEW_MAX_BYTES || (512 * 1024);
      const text = String(content == null ? '' : content);
      const size = new TextEncoder().encode(text).byteLength;
      if (size > maxBytes && !options.allowLarger) throw new Error(`Repository text file exceeds the ${maxBytes}-byte local editing limit.`);
      return this._stageRepositoryChange({ path, baseSha, payloadKind: 'text', content: text, source: options.source || 'file-editor', operation: baseSha ? 'update' : 'create', dependencies: options.dependencies || [], message: options.message || '' }, options);
    };

    App.prototype._stageRepositoryBinaryChange = function stageRepositoryBinaryChange(path, baseSha, bytes, options = {}) {
      const value = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes || []);
      return this._stageRepositoryChange({ path, baseSha, payloadKind: 'binary', bytesBase64: apiOrThrow(this).bytesToBase64(value), source: options.source || 'file-copy', operation: baseSha ? 'update' : 'create', dependencies: options.dependencies || [], message: options.message || '' }, options);
    };

    App.prototype.saveRepositoryEditor = async function localFirstSaveRepositoryEditor(input = {}) {
      const api = apiOrThrow(this);
      const editor = { ...(this.repositoryEditor || {}), ...(input || {}) };
      if (!['create', 'edit', 'folder'].includes(editor.mode)) throw new Error('No repository file or folder edit is active.');
      const path = pathForEditor(api, editor);
      const pending = api.repositoryLocalChangeMap(this.referenceObjectLocalState || null);
      if (editor.mode !== 'edit' && pending.has(path)) throw new Error(`A local change already creates ${path}.`);
      const content = editor.mode === 'folder' ? '' : String(editor.content == null ? '' : editor.content);
      const staged = await this._stageRepositoryTextChange(path, editor.mode === 'edit' ? editor.baseSha : '', content, { source: editor.mode === 'folder' ? 'folder-create' : 'file-editor', allowLarger: editor.mode === 'folder', message: `${editor.mode === 'edit' ? 'Update' : 'Create'} ${path} from local state`, silent: true });
      const parent = path.includes('/') ? path.slice(0, path.lastIndexOf('/')) : '';
      this.repositoryEditor = { mode: 'none', parentPath: parent, path: '', name: '', content: '', baseSha: '' };
      if (editor.mode !== 'folder') {
        const workspace = this._activeWorkspace();
        this.repositoryPreview = { kind: 'text', path, name: path.slice(path.lastIndexOf('/') + 1), size: new TextEncoder().encode(content).byteLength, sha: staged.baseSha, content, localRepositoryChange: true, context: workspace ? { owner: workspace.owner, repo: workspace.repo, branch: workspace.branch } : null };
        this.fileViewMode = 'source';
        this.fileRendered = null;
        try { if (typeof this._reindexReferenceObjectFileLocal === 'function') await this._reindexReferenceObjectFileLocal(path, content); } catch (error) { /* explicit validation remains available */ }
      }
      this._setUi({ replaceFileEditor: true, status: `${path} saved locally. Use Update current file or Update all to publish it to GitHub.` });
      return staged;
    };

    App.prototype.applyRepositoryStructure = async function localFirstApplyRepositoryStructure(plan) {
      const api = apiOrThrow(this);
      if (!plan || plan.kind !== 'repository-structure-plan-v1') throw new Error('Prepare a repository structure preview first.');
      const workspace = this._activeWorkspace();
      if (!workspace || !this._sameRepositoryContext(workspace, plan.workspace)) throw new Error('Workspace changed after structure preview. Preview again.');
      const fresh = await this._previewRepositoryStructureRead(plan.source);
      if (fresh.blocked) throw new Error('Repository structure has remote conflicts. Nothing was staged.');
      const targets = [...fresh.files, ...fresh.placeholders];
      const pending = api.repositoryLocalChangeMap(this.referenceObjectLocalState || null);
      for (const path of targets) if (pending.has(path)) throw new Error(`Repository structure target already has a local change: ${path}.`);
      for (const path of targets) await this._stageRepositoryTextChange(path, '', '', { source: 'structure-create', allowLarger: true, silent: true, message: `Create ${path} from local structure` });
      this._setUi({ status: `${targets.length} repository structure file(s) staged locally. GitHub was not changed.` });
      return targets.map((target) => ({ target, status: 'local', message: 'Staged locally.' }));
    };

    App.prototype.applyRepositoryCopy = async function localFirstApplyRepositoryCopy(plan) {
      const api = apiOrThrow(this);
      if (!plan || plan.kind !== 'repository-copy-plan-v1') throw new Error('Prepare a repository copy preview first.');
      const workspace = this._activeWorkspace();
      if (!workspace || !this._sameRepositoryContext(workspace, plan.workspace)) throw new Error('Workspace changed after copy preview. Preview again.');
      const fresh = await this._previewRepositoryCopyRead(plan);
      if (fresh.blocked) throw new Error('Repository copy has remote conflicts. Nothing was staged.');
      const pending = api.repositoryLocalChangeMap(this.referenceObjectLocalState || null);
      for (const mapping of fresh.mappings) if (pending.has(mapping.destinationPath)) throw new Error(`Copy destination already has a local change: ${mapping.destinationPath}.`);
      const client = await this._client(workspace);
      const results = [];
      let bytes = 0;
      for (const mapping of fresh.mappings) {
        const source = await client.readBytes(mapping.sourcePath, { maxBytes: Math.max(1, (this.api.DEFAULT_COPY_MAX_BYTES || 10 * 1024 * 1024) - bytes) });
        if (String(source.sha || '') !== mapping.sourceSha) throw new Error(`Copy source changed after preview: ${mapping.sourcePath}.`);
        bytes += source.bytes.byteLength;
        await this._stageRepositoryBinaryChange(mapping.destinationPath, '', source.bytes, { source: 'file-copy', silent: true, message: `Copy ${mapping.sourcePath} to ${mapping.destinationPath}` });
        results.push({ target: mapping.destinationPath, status: 'local', message: `${source.bytes.byteLength} bytes staged locally.` });
      }
      this._setUi({ status: `${results.length} copied file(s), ${bytes} byte(s), staged locally. GitHub was not changed.` });
      return results;
    };

    App.prototype.saveCategory = async function localFirstSaveCategory(input = {}) {
      const api = apiOrThrow(this);
      const workspace = this._requireCategoryContext();
      const client = await this._client(workspace);
      const id = this.api.normalizeCategoryId(input.id || input.name);
      const existing = this._categoryDefinitionRecord(id);
      const path = existing ? existing.path : `${this._categoryBasePath(workspace)}/${this.api.categoryFileName(id)}`;
      const pending = api.repositoryLocalChangeMap(this.referenceObjectLocalState || null).get(path);
      if (!existing && !pending) {
        try { await this._repositoryEntryMetadata(client, path); throw new Error(`Category target already exists and was not overwritten: ${path}`); }
        catch (error) { if (error.kind !== 'not_found') throw error; }
      }
      const previous = pending ? this.api.decodeCategoryDefinition(pending.content) : existing ? existing.definition : { files: [], notes: [], impliedCategories: [] };
      const requestedImplied = this._categoryLinksForIds(path, input.impliedCategoryIds || []);
      const unresolvedPrevious = (previous.impliedCategories || []).filter((link) => {
        try { return !this.categoryIndex.byPath.has(this.api.normalizeRepositoryTarget(path, link.target).path); }
        catch (error) { return true; }
      });
      const impliedCategories = [...requestedImplied];
      for (const link of unresolvedPrevious) if (!impliedCategories.some((item) => item.target === link.target)) impliedCategories.push(link);
      const members = await this._categoryMemberLinks(path, Array.isArray(input.selectedTargets) ? input.selectedTargets : this.categoryDraftTargets, workspace);
      const content = this.api.encodeCategoryDefinition({ id, name: input.name, description: input.description, impliedCategories, files: members.files, notes: members.notes });
      const baseSha = pending ? pending.baseSha : existing ? existing.sha : '';
      await this._stageRepositoryTextChange(path, baseSha, content, { source: 'category', message: `${existing ? 'Update' : 'Create'} category ${input.name || id}`, silent: true });
      if (typeof this._applyVerifiedCategoryRecord === 'function') await this._applyVerifiedCategoryRecord({ path, sha: baseSha, htmlUrl: existing && existing.htmlUrl || '', definition: this.api.decodeCategoryDefinition(content) }, workspace);
      this.selectedCategoryId = id;
      if (input.group !== undefined) await this.setCategoryGroup(id, input.group, { silent: true });
      const saved = this.categoryIndex.categories.get(id);
      this._setUi({ replaceCategoryEditor: true, status: `Category ${input.name || id} saved locally. Use Update current file or Update all from Files to publish.` });
      return saved;
    };

    App.prototype._writeCategoryMembership = async function localFirstWriteCategoryMembership(categoryId, filePath, remove) {
      const api = apiOrThrow(this);
      const workspace = this._requireCategoryContext();
      const record = this._categoryDefinitionRecord(categoryId);
      if (!record) throw new Error(`Category not found: ${categoryId}. Refresh categories first.`);
      const canonicalFile = remove ? this.api.normalizeCanonicalRepositoryPath(filePath, 'Categorized repository file') : this._assertCategoryAssignmentTarget(filePath, workspace);
      const pending = api.repositoryLocalChangeMap(this.referenceObjectLocalState || null).get(record.path);
      const definition = pending ? this.api.decodeCategoryDefinition(pending.content) : record.definition;
      const kept = [];
      let found = false;
      for (const link of definition.files || []) {
        let resolved = '';
        try { resolved = this.api.normalizeRepositoryTarget(record.path, link.target).path; } catch (error) { kept.push(link); continue; }
        if (resolved === canonicalFile) { found = true; if (!remove) kept.push(link); } else kept.push(link);
      }
      if (remove && !found) return record.indexed;
      if (!remove && !found) kept.push({ label: canonicalFile.slice(canonicalFile.lastIndexOf('/') + 1), target: this.api.repositoryRelativePath(record.path, canonicalFile) });
      const content = this.api.encodeCategoryDefinition({ id: definition.id, name: definition.name, description: definition.description, impliedCategories: definition.impliedCategories, files: kept, notes: definition.notes || [] });
      const baseSha = pending ? pending.baseSha : record.sha;
      await this._stageRepositoryTextChange(record.path, baseSha, content, { source: 'category', message: `${remove ? 'Remove' : 'Add'} ${canonicalFile} ${remove ? 'from' : 'to'} category ${definition.name}`, silent: true });
      if (typeof this._applyVerifiedCategoryRecord === 'function') await this._applyVerifiedCategoryRecord({ path: record.path, sha: baseSha, htmlUrl: record.htmlUrl || '', definition: this.api.decodeCategoryDefinition(content) }, workspace);
      this.selectedCategoryId = categoryId;
      this._setUi({ status: `${canonicalFile} ${remove ? 'removed from' : 'assigned to'} ${definition.name} locally. GitHub was not changed.` });
      return this.categoryIndex.categories.get(categoryId);
    };

    App.prototype.applyFileCategories = async function localFirstApplyFileCategories(filePath, ids = this.fileCategoryDraftIds) {
      const workspace = this._requireCategoryContext();
      const canonical = this._assertCategoryAssignmentTarget(filePath, workspace);
      const desiredList = this.api.normalizeCategoryIds ? this.api.normalizeCategoryIds(ids) : [...new Set(ids.map(String))];
      const desired = new Set(desiredList);
      const current = new Set(this.categoryIndex.explicitCategoryIdsForTarget ? this.categoryIndex.explicitCategoryIdsForTarget('file', canonical) : []);
      const changes = [...new Set([...desired, ...current])].filter((id) => desired.has(id) !== current.has(id));
      const results = [];
      for (const categoryId of changes) {
        await this._writeCategoryMembership(categoryId, canonical, !desired.has(categoryId));
        results.push({ target: categoryId, status: 'local', message: desired.has(categoryId) ? 'Assignment staged locally.' : 'Removal staged locally.' });
      }
      this.fileCategoryDraftIds = desiredList;
      this.surface = 'files';
      this._setUi({ replaceFileCategoryIds: true, status: changes.length ? `${changes.length} category membership change(s) staged locally.` : 'File category memberships were already up to date.' });
      return results;
    };

    App.prototype._setNoteMembershipInCategory = async function localFirstSetNoteMembership(categoryId, note, shouldInclude, client, workspace) {
      const api = apiOrThrow(this);
      const record = this._categoryDefinitionRecord(categoryId);
      if (!record) throw new Error(`Category not found: ${categoryId}. Refresh categories first.`);
      const remoteNote = this.api.normalizeRemote(note.remote);
      if (!this.api.hasRemoteTargetIdentity(remoteNote) || !this._sameRepositoryContext(remoteNote, workspace)) throw new Error(`Note ${note.title || note.id} is not verified in the active category repository and branch.`);
      const pending = api.repositoryLocalChangeMap(this.referenceObjectLocalState || null).get(record.path);
      const latest = pending ? { content: pending.content, sha: pending.baseSha, path: record.path, htmlUrl: record.htmlUrl || '' } : await client.read(record.path);
      const definition = this.api.decodeCategoryDefinition(latest.content);
      const kept = [];
      let found = false;
      for (const link of definition.notes || []) {
        let resolved = '';
        try { resolved = this.api.normalizeRepositoryTarget(record.path, link.target).path; } catch (error) { kept.push(link); continue; }
        if (resolved === remoteNote.path) { found = true; if (shouldInclude) kept.push({ ...link, noteId: note.id, label: note.title || note.id }); } else kept.push(link);
      }
      if (shouldInclude && !found) kept.push({ label: note.title || note.id, target: this.api.repositoryRelativePath(record.path, remoteNote.path), noteId: note.id });
      if (!shouldInclude && !found) return { target: categoryId, status: 'unchanged', message: 'Note was not an explicit member.' };
      const content = this.api.encodeCategoryDefinition({ id: definition.id, name: definition.name, description: definition.description, impliedCategories: definition.impliedCategories || [], files: definition.files || [], notes: kept });
      if (content === latest.content) return { target: categoryId, status: 'unchanged', message: 'Membership already matched.' };
      await this._stageRepositoryTextChange(record.path, latest.sha, content, { source: 'category', message: `${shouldInclude ? 'Add' : 'Remove'} Note ${note.title || note.id} ${shouldInclude ? 'to' : 'from'} category ${definition.name}`, silent: true });
      if (typeof this._applyVerifiedCategoryRecord === 'function') await this._applyVerifiedCategoryRecord({ path: record.path, sha: latest.sha, htmlUrl: latest.htmlUrl || '', definition: this.api.decodeCategoryDefinition(content) }, workspace);
      return { target: categoryId, status: 'local', message: shouldInclude ? 'Note assignment staged locally.' : 'Note removal staged locally.' };
    };

    App.prototype.updateCurrentRepositoryFileGitHub = async function updateCurrentRepositoryFileGitHub() {
      const path = this.repositoryPreview && this.repositoryPreview.path;
      if (!path) throw new Error('Open a pending repository file first.');
      return this._runRemoteOperation(`Updating ${path} on GitHub…`, async () => {
        const client = await this._client(this._activeWorkspace());
        const published = await apiOrThrow(this).publishCurrentRepositoryChange({ client, state: this.referenceObjectLocalState, path });
        await this._persistReferenceObjectLocalState(published.state, { silent: true });
        if (this.repositoryPreview && this.repositoryPreview.path === path) this.repositoryPreview = { ...this.repositoryPreview, sha: String(published.result && published.result.sha || ''), localRepositoryChange: false };
        const parent = path.includes('/') ? path.slice(0, path.lastIndexOf('/')) : '';
        let refreshError = '';
        try {
          this.repositoryPath = parent;
          this.repositoryEntries = mergePendingEntries(this, parent, await client.listDirectory(parent, { maxEntries: 200 }));
          this.repositoryBrowseLoaded = true;
        } catch (error) { refreshError = String(error && error.message || error); }
        this.referenceObjectChecks = {};
        this.referenceObjectValidation = null;
        this.referenceFreshnessDiagnostics = null;
        this._setUi({ status: `${path} updated on GitHub and verified by exact read-back.${refreshError ? ` Folder refresh failed: ${refreshError}` : ''}` });
        return published;
      });
    };

    App.prototype.updateAllRepositoryChangesGitHub = async function updateAllRepositoryChangesGitHub() {
      await this._ensureReferenceObjectLocalStateCurrent({ silent: true });
      return this._runRemoteOperation('Updating all local files on GitHub in one commit…', async () => {
        const client = await this._client(this._activeWorkspace());
        const published = await apiOrThrow(this).publishAllRepositoryChanges({ client, state: this.referenceObjectLocalState });
        await this._persistReferenceObjectLocalState(published.state, { silent: true });
        if (this.repositoryPreview && this.repositoryPreview.path) {
          try { const metadata = await client.readMetadata(this.repositoryPreview.path); this.repositoryPreview = { ...this.repositoryPreview, sha: metadata.sha, localRepositoryChange: false }; }
          catch (error) { this.repositoryPreview = { ...this.repositoryPreview, localRepositoryChange: false }; }
        }
        const folder = this.repositoryPath || '';
        let refreshError = '';
        try {
          this.repositoryEntries = mergePendingEntries(this, folder, await client.listDirectory(folder, { maxEntries: 200 }));
          this.repositoryBrowseLoaded = true;
        } catch (error) { refreshError = String(error && error.message || error); }
        this.referenceObjectsLoaded = false;
        this.referenceObjectChecks = {};
        this.referenceObjectValidation = null;
        this.referenceFreshnessDiagnostics = null;
        this.categoryContextRequiresRefresh = true;
        this._setUi({ status: `${published.result.paths.length} local file(s) updated on GitHub in commit ${published.result.commitSha.slice(0, 12)} and verified.${refreshError ? ` Folder refresh failed: ${refreshError}` : ''}` });
        return published;
      });
    };

    App.prototype.publishReferenceObjectLocalDraftsGitHub = function publishReferenceObjectLocalDraftsGitHub() { return this.updateAllRepositoryChangesGitHub(); };
    App.prototype.updateReferenceObjectUsesGitHub = async function localOnlyReferenceObjectUpdate(id) {
      const result = await this.updateReferenceObjectUsesLocal(id);
      this._setUi({ status: `Reference Object ${id} updated locally. Use the standard Update current file or Update all action for GitHub.` });
      return result;
    };

    App.prototype.start = async function localChangesStart(...args) {
      if (this.ui && this.ui.handlers) Object.assign(this.ui.handlers, {
        onUpdateCurrentRepositoryFileGitHub: () => this.updateCurrentRepositoryFileGitHub(),
        onUpdateAllRepositoryChangesGitHub: () => this.updateAllRepositoryChangesGitHub()
      });
      return originalStart.apply(this, args);
    };
    return true;
  }

  function enhanceUi(ui) {
    if (!ui.shadow || ui.state.surface !== 'files' || typeof document === 'undefined') return;
    const state = ui.state || {};
    const activeWorkspace = (Array.isArray(state.workspaces) ? state.workspaces : [])
      .find((workspace) => workspace && workspace.id === state.activeWorkspaceId) || null;
    const editorSave = ui.shadow.querySelector('.repository-editor [data-action="save-repository-editor"]');
    if (editorSave) {
      editorSave.textContent = state.repositoryEditor && state.repositoryEditor.mode === 'folder' ? 'Create locally' : 'Save locally';
      editorSave.disabled = Boolean(state.busy || !activeWorkspace);
    }
    const toolbar = ui.shadow.querySelector('.editor .editor-toolbar') || ui.shadow.querySelector('.editor-toolbar');
    if (!toolbar || toolbar.querySelector('[data-update-all-local-changes]')) return;
    const current = document.createElement('button');
    current.dataset.updateCurrentLocalChange = '1';
    current.textContent = 'Update current file';
    current.disabled = Boolean(ui.state.busy || !ui.state.repositoryCurrentFilePending || !ui.state.hasToken);
    current.addEventListener('click', () => ui._call('onUpdateCurrentRepositoryFileGitHub').catch(() => {}));
    const all = document.createElement('button');
    all.dataset.updateAllLocalChanges = '1';
    all.textContent = `Update all (${Number(ui.state.repositoryPendingCount || 0)})`;
    all.disabled = Boolean(ui.state.busy || !ui.state.repositoryPendingCount || !ui.state.hasToken);
    all.addEventListener('click', () => ui._call('onUpdateAllRepositoryChangesGitHub').catch(() => {}));
    toolbar.append(current, all);
  }

  function patchUi(UI) {
    if (!UI || !UI.prototype || UI.prototype[UI_PATCH]) return false;
    Object.defineProperty(UI.prototype, UI_PATCH, { value: true });
    const originalRender = UI.prototype.render;
    UI.prototype.render = function localChangesRender(...args) { const result = originalRender.apply(this, args); enhanceUi(this); return result; };
    return true;
  }

  function installRepositoryLocalChanges(api = root.ObsLinkedNotes || {}) {
    if (!api || !api.LinkedNotesApp || !api.LinkedNotesUI) return false;
    const app = patchApp(api.LinkedNotesApp);
    const ui = patchUi(api.LinkedNotesUI);
    return app || ui;
  }

  return { installRepositoryLocalChanges, mergePendingRepositoryEntries: mergePendingEntries };
});

/* src/repository-ordered-reference-lists-runtime.js */
(function (root, factory) {
  const api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
  if (root.ObsLinkedNotes && root.ObsLinkedNotes.LinkedNotesApp && root.ObsLinkedNotes.LinkedNotesUI) {
    try { api.installRepositoryOrderedReferenceLists(root.ObsLinkedNotes); } catch (error) { /* bootstrap reports failures later */ }
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function (root) {
  'use strict';

  const APP_PATCH = '__obsOrderedReferenceListsAppV1';
  const UI_PATCH = '__obsOrderedReferenceListsUiV1';

  function apiOrThrow(app) {
    const api = app && app.api || root.ObsLinkedNotes || {};
    for (const name of ['parseReferenceMarkers', 'parseOrderedReferenceLists', 'createOrderedReferenceList', 'orderOrderedReferenceList', 'referenceObjectById']) if (typeof api[name] !== 'function') throw new Error(`Ordered Reference List runtime dependency is unavailable: ${name}.`);
    return api;
  }

  function escapeHtml(value) { return String(value == null ? '' : value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character])); }
  function errorText(error) { return String(error && error.message || error || 'Unknown error'); }

  function patchApp(App) {
    if (!App || !App.prototype || App.prototype[APP_PATCH]) return false;
    Object.defineProperty(App.prototype, APP_PATCH, { value: true });
    const originalStart = App.prototype.start;

    App.prototype._orderedCurrentText = function orderedCurrentText() {
      const preview = this.repositoryPreview;
      if (!preview || preview.kind !== 'text' || typeof preview.content !== 'string') throw new Error('Open a text file in the Files surface first.');
      return { path: preview.path, baseSha: String(preview.sha || ''), content: preview.content };
    };

    App.prototype.prepareOrderedReferenceList = async function prepareOrderedReferenceList() {
      const api = apiOrThrow(this);
      const current = this._orderedCurrentText();
      const parsed = api.parseReferenceMarkers(current.content);
      if (parsed.diagnostics.length) throw new Error('Repair malformed Reference Object markers in the open file first.');
      const uses = parsed.occurrences.filter((item) => item.role === 'use');
      if (!uses.length) throw new Error('The open file has no Reference Object uses.');
      const snapshot = await this._ensureReferenceRegistryLoaded();
      const objects = new Map(snapshot.registry.objects.map((object) => [object.id, object]));
      const checkById = new Map();
      for (const id of [...new Set(uses.map((use) => use.id))]) {
        try { checkById.set(id, await this.checkReferenceObjectUses(id)); }
        catch (error) { checkById.set(id, null); }
      }
      const prepared = uses.map((use) => {
        const check = checkById.get(use.id);
        const checked = check && check.uses.find((item) => item.path === current.path && item.line === use.line && item.lineOccurrence === use.lineOccurrence);
        return {
          fullStart: use.fullStart,
          id: use.id,
          name: objects.get(use.id) && objects.get(use.id).name || use.id,
          line: use.line,
          lineOccurrence: use.lineOccurrence,
          value: use.value,
          currentValue: check ? check.currentValue : '',
          freshness: checked ? checked.status : 'unresolved'
        };
      });
      this._setUi({ status: `Checked ${prepared.length} Reference Object use(s) in ${current.path}; stale uses remain selectable but will block ordering.` });
      return { path: current.path, uses: prepared };
    };

    App.prototype.createOrderedReferenceListLocal = async function createOrderedReferenceListLocal(input = {}) {
      const api = apiOrThrow(this);
      const current = this._orderedCurrentText();
      const result = api.createOrderedReferenceList({ content: current.content, selectedUses: input.selectedUses, mode: input.mode, locale: input.locale || 'und' });
      await this._stageRepositoryTextChange(current.path, current.baseSha, result.content, { source: 'ordered-reference-list', message: `Create Ordered Reference List ${result.listId} in ${current.path}`, silent: true });
      this.repositoryPreview = { ...this.repositoryPreview, content: result.content, size: new TextEncoder().encode(result.content).byteLength, localRepositoryChange: true };
      this.fileViewMode = 'source';
      this.fileRendered = null;
      try { await this._reindexReferenceObjectFileLocal(current.path, result.content); } catch (error) { /* validation remains explicit */ }
      this._setUi({ status: `Ordered Reference List ${result.listId} created locally with ${result.itemCount} item(s)${result.warnings.length ? `; ${result.warnings.length} stale/unresolved warning(s), ordering blocked until refreshed` : ''}.` });
      return result;
    };

    App.prototype.orderReferenceListLocal = async function orderReferenceListLocal(input = {}) {
      const api = apiOrThrow(this);
      const current = this._orderedCurrentText();
      const parsed = api.parseOrderedReferenceLists(current.content);
      const listId = String(input.listId || parsed.lists[0] && parsed.lists[0].id || '');
      if (!listId) throw new Error('The open file has no Ordered Reference List.');
      const items = parsed.items.filter((item) => item.listId === listId);
      const currentValues = new Map();
      for (const id of [...new Set(items.map((item) => item.refId))]) {
        const check = await this.checkReferenceObjectUses(id);
        if (!check || check.blocked || check.incomplete) throw new Error(`Reference Object ${id} could not be checked completely.`);
        currentValues.set(id, check.currentValue);
      }
      const result = api.orderOrderedReferenceList(current.content, listId, { currentValues, customOrder: input.customOrder || [] });
      if (!result.changed) { this._setUi({ status: `Ordered Reference List ${listId} is already in the requested order.` }); return result; }
      await this._stageRepositoryTextChange(current.path, current.baseSha, result.content, { source: 'ordered-reference-list', message: `Order ${listId} in ${current.path}`, silent: true });
      this.repositoryPreview = { ...this.repositoryPreview, content: result.content, size: new TextEncoder().encode(result.content).byteLength, localRepositoryChange: true };
      this.fileViewMode = 'source';
      this.fileRendered = null;
      try { await this._reindexReferenceObjectFileLocal(current.path, result.content); } catch (error) { /* validation remains explicit */ }
      this._setUi({ status: `Ordered Reference List ${listId} ordered locally by ${result.mode}. GitHub was not changed.` });
      return result;
    };

    App.prototype.start = async function orderedReferenceListsStart(...args) {
      if (this.ui && this.ui.handlers) Object.assign(this.ui.handlers, {
        onPrepareOrderedReferenceList: () => this.prepareOrderedReferenceList(),
        onCreateOrderedReferenceListLocal: (input) => this.createOrderedReferenceListLocal(input),
        onOrderReferenceListLocal: (input) => this.orderReferenceListLocal(input)
      });
      return originalStart.apply(this, args);
    };
    return true;
  }

  function modalShell(title) {
    const backdrop = document.createElement('div');
    backdrop.className = 'ordered-reference-modal-backdrop';
    backdrop.innerHTML = `<section class="ordered-reference-modal"><header><strong>${escapeHtml(title)}</strong><button data-close>×</button></header><div data-body></div><div class="hint" data-status></div></section>`;
    backdrop.querySelector('[data-close]').addEventListener('click', () => backdrop.remove());
    backdrop.addEventListener('click', (event) => { if (event.target === backdrop) backdrop.remove(); });
    document.body.appendChild(backdrop);
    return backdrop;
  }

  async function openCreateModal(ui) {
    const modal = modalShell('Create Ordered Reference List');
    const body = modal.querySelector('[data-body]');
    const status = modal.querySelector('[data-status]');
    status.textContent = 'Checking Reference Object uses for freshness…';
    try {
      const prepared = await ui._call('onPrepareOrderedReferenceList');
      body.innerHTML = `<label>Sort mode <select data-mode><option value="natural">Natural</option><option value="number">Number (leading number required)</option><option value="alphabetical">Alphabetical</option><option value="custom">Custom exact-value order</option></select></label><div class="ordered-reference-use-list">${prepared.uses.map((use, index) => `<label class="ordered-reference-use ${use.freshness !== 'current' ? 'stale' : ''}"><input type="checkbox" data-use="${index}"><span><strong>${escapeHtml(use.name)}</strong> · line ${use.line}${use.lineOccurrence > 1 ? ` #${use.lineOccurrence}` : ''}<br><small>${escapeHtml(use.value)} · ${escapeHtml(use.freshness)}</small></span><select data-unit="${index}"><option value="line">Line</option><option value="paragraph">Paragraph</option></select></label>`).join('')}</div><button class="primary" data-create>Create locally</button>`;
      status.textContent = 'Stale/unresolved uses may be wrapped, but the list cannot be ordered until they are current.';
      body.querySelector('[data-create]').addEventListener('click', async () => {
        const selectedUses = prepared.uses.flatMap((use, index) => body.querySelector(`[data-use="${index}"]`).checked ? [{ fullStart: use.fullStart, freshness: use.freshness, unit: body.querySelector(`[data-unit="${index}"]`).value }] : []);
        status.textContent = 'Creating local markers…';
        try { await ui._call('onCreateOrderedReferenceListLocal', { selectedUses, mode: body.querySelector('[data-mode]').value }); modal.remove(); }
        catch (error) { status.textContent = `Create failed: ${errorText(error)}`; }
      });
    } catch (error) { status.textContent = `Freshness check failed: ${errorText(error)}`; }
  }

  function openOrderModal(ui, parsed) {
    const modal = modalShell('Order locally');
    const body = modal.querySelector('[data-body]');
    const status = modal.querySelector('[data-status]');
    body.innerHTML = `<label>List <select data-list>${parsed.lists.map((list) => `<option value="${escapeHtml(list.id)}">${escapeHtml(`${list.id} · ${list.mode}`)}</option>`).join('')}</select></label><label>Custom order, one exact current value per line<textarea data-custom placeholder="Only used by custom mode"></textarea></label><button class="primary" data-order>Order locally</button>`;
    body.querySelector('[data-order]').addEventListener('click', async () => {
      status.textContent = 'Checking current Reference Object values and ordering…';
      try {
        await ui._call('onOrderReferenceListLocal', { listId: body.querySelector('[data-list]').value, customOrder: body.querySelector('[data-custom]').value.split(/\r?\n/).filter((line) => line.length) });
        modal.remove();
      } catch (error) { status.textContent = `Ordering blocked: ${errorText(error)}`; }
    });
  }

  function appendStyle(ui) {
    if (!ui.shadow || ui.shadow.querySelector('[data-ordered-reference-style]')) return;
    const css = `.ordered-reference-modal-backdrop{position:fixed;inset:0;z-index:2147483647;background:rgba(0,0,0,.58);display:grid;place-items:center;padding:20px}.ordered-reference-modal{width:min(760px,96vw);max-height:90vh;overflow:auto;background:#fff;color:#202124;border-radius:12px;padding:16px;box-shadow:0 18px 60px rgba(0,0,0,.4)}.ordered-reference-modal header{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}.ordered-reference-modal label{display:block;margin:10px 0}.ordered-reference-modal select,.ordered-reference-modal textarea{margin-left:8px}.ordered-reference-modal textarea{display:block;width:100%;min-height:90px;margin:6px 0}.ordered-reference-use{display:grid!important;grid-template-columns:auto 1fr auto;gap:10px;align-items:center;padding:8px;border:1px solid #ddd;border-radius:8px}.ordered-reference-use.stale{border-color:#c77a00;background:#fff7e6}.ordered-reference-use-list{display:grid;gap:7px;max-height:50vh;overflow:auto}`;
    const style = document.createElement('style');
    style.dataset.orderedReferenceStyle = '1';
    style.textContent = css;
    ui.shadow.appendChild(style);
    if (!document.getElementById('obs-ordered-reference-modal-style')) {
      const globalStyle = document.createElement('style');
      globalStyle.id = 'obs-ordered-reference-modal-style';
      globalStyle.textContent = css;
      document.head.appendChild(globalStyle);
    }
  }

  function enhanceUi(ui) {
    if (!ui.shadow || ui.state.surface !== 'files' || typeof document === 'undefined') return;
    appendStyle(ui);
    const preview = ui.state.repositoryPreview;
    if (!preview || preview.kind !== 'text' || typeof preview.content !== 'string') return;
    const toolbar = ui.shadow.querySelector('.editor .editor-toolbar') || ui.shadow.querySelector('.editor-toolbar');
    if (!toolbar || toolbar.querySelector('[data-create-ordered-reference-list]')) return;
    const create = document.createElement('button');
    create.dataset.createOrderedReferenceList = '1';
    create.textContent = 'Create Ordered List';
    create.disabled = Boolean(ui.state.busy);
    create.addEventListener('click', () => openCreateModal(ui));
    toolbar.appendChild(create);
    const parsed = (root.ObsLinkedNotes || {}).parseOrderedReferenceLists(preview.content);
    if (parsed.lists.length) {
      const order = document.createElement('button');
      order.dataset.orderReferenceList = '1';
      order.textContent = 'Order locally';
      order.disabled = Boolean(ui.state.busy);
      order.addEventListener('click', () => openOrderModal(ui, parsed));
      toolbar.appendChild(order);
    }
  }

  function patchUi(UI) {
    if (!UI || !UI.prototype || UI.prototype[UI_PATCH]) return false;
    Object.defineProperty(UI.prototype, UI_PATCH, { value: true });
    const originalRender = UI.prototype.render;
    UI.prototype.render = function orderedReferenceListsRender(...args) { const result = originalRender.apply(this, args); enhanceUi(this); return result; };
    return true;
  }

  function installRepositoryOrderedReferenceLists(api = root.ObsLinkedNotes || {}) {
    if (!api || !api.LinkedNotesApp || !api.LinkedNotesUI) return false;
    const app = patchApp(api.LinkedNotesApp);
    const ui = patchUi(api.LinkedNotesUI);
    return app || ui;
  }

  return { installRepositoryOrderedReferenceLists };
});

/* src/repository-reference-stale-runtime.js */
(function (root, factory) {
  const api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
  if (root.ObsLinkedNotes && root.ObsLinkedNotes.LinkedNotesApp && root.ObsLinkedNotes.LinkedNotesUI) {
    try { api.installRepositoryReferenceStaleDiagnostics(root.ObsLinkedNotes); } catch (error) { /* bootstrap reports failures later */ }
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function (root) {
  'use strict';

  const APP_PATCH = '__obsReferenceStaleDiagnosticsAppV1';
  const UI_PATCH = '__obsReferenceStaleDiagnosticsUiV1';

  function patchApp(App) {
    if (!App || !App.prototype || App.prototype[APP_PATCH]) return false;
    Object.defineProperty(App.prototype, APP_PATCH, { value: true });
    const originalStart = App.prototype.start;
    const originalOpenRepositoryEntry = App.prototype.openRepositoryEntry;
    const originalUiState = App.prototype._workspaceUiState;

    App.prototype._referenceFreshnessUiState = function referenceFreshnessUiState() {
      const result = this.referenceFreshnessDiagnostics;
      const byPath = {};
      for (const file of result && result.files || []) byPath[file.path] = { stale: file.stale, unresolved: file.unresolved, current: file.current };
      const path = this.repositoryPreview && this.repositoryPreview.path || '';
      return {
        referenceFreshnessByPath: byPath,
        referenceCurrentFileFreshness: byPath[path] || null,
        referenceFreshnessIncomplete: Boolean(result && result.incomplete),
        referenceFreshnessChecked: Boolean(result),
        referenceStaleTotal: Number(result && result.staleCount || 0),
        referenceUnresolvedTotal: Number(result && result.unresolvedCount || 0)
      };
    };
    if (typeof originalUiState === 'function') App.prototype._workspaceUiState = function referenceFreshnessWorkspaceUiState(...args) { return { ...originalUiState.apply(this, args), ...this._referenceFreshnessUiState() }; };

    App.prototype.refreshReferenceFreshnessDiagnostics = async function refreshReferenceFreshnessDiagnostics(options = {}) {
      const api = this.api || root.ObsLinkedNotes || {};
      if (typeof api.diagnoseReferenceObjectFreshness !== 'function') throw new Error('Reference Object freshness diagnostic service is unavailable.');
      await this._ensureReferenceObjectLocalStateCurrent({ silent: true });
      const run = async () => api.diagnoseReferenceObjectFreshness({
        client: await this._referenceObjectsClient(),
        registryPath: this._referenceObjectRegistryPath(),
        overlays: typeof api.repositoryTextOverlays === 'function' ? api.repositoryTextOverlays(this.referenceObjectLocalState) : this.referenceObjectLocalState.files
      });
      const result = options.silent && typeof this._runFilesWorkspaceRead === 'function'
        ? await this._runFilesWorkspaceRead('Checking indexed Reference Object uses…', run)
        : await run();
      if (!result || result.cancelled) return result;
      this.referenceFreshnessDiagnostics = result;
      this._setUi({ status: `Indexed reference freshness checked: ${result.staleCount} stale, ${result.unresolvedCount} unresolved use(s)${result.incomplete ? '; scan incomplete' : ''}.` });
      return result;
    };

    if (typeof originalOpenRepositoryEntry === 'function') App.prototype.openRepositoryEntry = async function referenceFreshnessOpenEntry(...args) {
      const result = await originalOpenRepositoryEntry.apply(this, args);
      if (result && result.kind === 'text' && !this.referenceFreshnessDiagnostics) {
        try { await this.refreshReferenceFreshnessDiagnostics({ silent: true }); } catch (error) { /* explicit refresh remains available */ }
      }
      return result;
    };

    App.prototype.start = async function referenceFreshnessStart(...args) {
      if (this.ui && this.ui.handlers) this.ui.handlers.onRefreshReferenceFreshness = () => this.refreshReferenceFreshnessDiagnostics();
      return originalStart.apply(this, args);
    };
    return true;
  }

  function enhanceUi(ui) {
    if (!ui.shadow || ui.state.surface !== 'files' || typeof document === 'undefined') return;
    const byPath = ui.state.referenceFreshnessByPath || {};
    ui.shadow.querySelectorAll('[data-repository-entry]').forEach((button) => {
      const summary = byPath[button.dataset.repositoryEntry];
      if (!summary || (!summary.stale && !summary.unresolved) || button.querySelector('[data-reference-stale-badge]')) return;
      const badge = document.createElement('span');
      badge.dataset.referenceStaleBadge = '1';
      badge.style.cssText = 'margin-left:6px;color:#b35b00;font-weight:700';
      badge.textContent = `⚠ ${summary.stale ? `${summary.stale} stale` : `${summary.unresolved} unresolved`}`;
      button.appendChild(badge);
    });
    const toolbar = ui.shadow.querySelector('.editor .editor-toolbar') || ui.shadow.querySelector('.editor-toolbar');
    if (toolbar && !toolbar.querySelector('[data-refresh-reference-freshness]')) {
      const refresh = document.createElement('button');
      refresh.dataset.refreshReferenceFreshness = '1';
      refresh.textContent = ui.state.referenceFreshnessChecked ? `Stale uses (${Number(ui.state.referenceStaleTotal || 0)})` : 'Check stale uses';
      refresh.disabled = Boolean(ui.state.busy || !ui.state.hasToken);
      refresh.addEventListener('click', () => ui._call('onRefreshReferenceFreshness').catch(() => {}));
      toolbar.appendChild(refresh);
    }
    const current = ui.state.referenceCurrentFileFreshness;
    const preview = ui.shadow.querySelector('.file-preview');
    if (current && preview && (current.stale || current.unresolved) && !preview.querySelector('[data-reference-current-warning]')) {
      const warning = document.createElement('div');
      warning.dataset.referenceCurrentWarning = '1';
      warning.className = 'remote-context mismatch';
      warning.textContent = `Reference Object warning: ${current.stale} stale and ${current.unresolved} unresolved use(s) in this file. Review surrounding meaning before updating locally.`;
      preview.insertBefore(warning, preview.firstChild);
    }
  }

  function patchUi(UI) {
    if (!UI || !UI.prototype || UI.prototype[UI_PATCH]) return false;
    Object.defineProperty(UI.prototype, UI_PATCH, { value: true });
    const originalRender = UI.prototype.render;
    UI.prototype.render = function referenceFreshnessRender(...args) { const result = originalRender.apply(this, args); enhanceUi(this); return result; };
    return true;
  }

  function installRepositoryReferenceStaleDiagnostics(api = root.ObsLinkedNotes || {}) {
    if (!api || !api.LinkedNotesApp || !api.LinkedNotesUI) return false;
    const app = patchApp(api.LinkedNotesApp);
    const ui = patchUi(api.LinkedNotesUI);
    return app || ui;
  }

  return { installRepositoryReferenceStaleDiagnostics };
});

/* src/chat-response-reader-runtime.js */
(function (root, factory) {
  const api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
  if (root.ObsLinkedNotes && root.ObsLinkedNotes.LinkedNotesApp && root.ObsLinkedNotes.LinkedNotesUI) {
    try { api.installChatResponseReader(root.ObsLinkedNotes); } catch (error) { /* primary bootstrap remains authoritative */ }
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function (root) {
  'use strict';

  const APP_PATCH = '__obsChatResponseReaderAppV1';
  const UI_PATCH = '__obsChatResponseReaderUiV1';
  const RUNTIME_KEY = '__obsChatResponseReaderRuntimeV1';
  const ACTION_ATTR = 'data-obs-chat-response-reader-action';
  const UI_APP_BINDINGS = new WeakMap();
  const ACTIVE_UIS = new Set();
  let activeApp = null;
  let observer = null;

  function apiOrThrow(app) {
    const api = app && app.api || root.ObsLinkedNotes || {};
    const required = ['createChatResponseReaderState', 'serializeChatResponseDom', 'renderRichMarkdown'];
    for (const name of required) if (typeof api[name] !== 'function') throw new Error(`Chat Response Reader dependency is unavailable: ${name}.`);
    return api;
  }

  function errorText(error) { return String(error && error.message || error || 'Unknown error'); }

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function readerModalLayout(viewportWidth, viewportHeight) {
    const width = Math.max(320, Number(viewportWidth) || 0);
    const height = Math.max(320, Number(viewportHeight) || 0);
    return {
      width: Math.min(1200, Math.max(320, width - 64)),
      height: Math.min(900, Math.max(320, height - 64)),
      inset: 24
    };
  }

  function ensureReaderState(app) {
    const api = apiOrThrow(app);
    if (!app.chatResponseReader || Number(app.chatResponseReader.schemaVersion) !== 1) {
      app.chatResponseReader = api.createChatResponseReaderState({ open: false, mode: 'paste', sourceKind: 'paste', sourceAccuracy: 'exact' });
    }
    return app.chatResponseReader;
  }

  function setReaderState(app, patch = {}) {
    const api = apiOrThrow(app);
    const current = ensureReaderState(app);
    app.chatResponseReader = api.createChatResponseReaderState({ ...current, ...patch });
    return app.chatResponseReader;
  }

  function readerSourceLabel(state) {
    if (!state) return 'No response loaded.';
    if (state.sourceKind === 'chat-dom') return state.sourceAccuracy === 'derived' ? 'Source: ChatGPT rendered DOM · derived Markdown' : 'Source: ChatGPT response';
    return 'Source: pasted Markdown · exact text';
  }

  function closeModalElement(ui) {
    const modal = ui && ui.shadow && ui.shadow.querySelector('[data-chat-response-reader-modal]');
    if (modal) modal.remove();
  }

  function renderProjection(app, modal) {
    const state = ensureReaderState(app);
    const api = apiOrThrow(app);
    const target = modal && modal.querySelector('[data-chat-response-reader-rendered]');
    if (!target) return null;
    const rendered = api.renderRichMarkdown(state.markdown || '');
    target.innerHTML = rendered.html || '<div class="empty">Nothing to render.</div>';
    for (const link of Array.from(target.querySelectorAll ? target.querySelectorAll('a') : [])) {
      link.addEventListener('click', (event) => { event.preventDefault(); event.stopPropagation(); });
      link.setAttribute('title', 'Links are inert in Chat Response Reader.');
    }
    const status = modal.querySelector('[data-chat-response-reader-status]');
    if (status) {
      const resourceNote = rendered.resources && rendered.resources.length ? ` · ${rendered.resources.length} image resource(s) remain unloaded` : '';
      status.textContent = `${state.status || 'Rendered locally.'}${resourceNote}`;
    }
    return rendered;
  }

  function updateModalMode(app, modal) {
    const state = ensureReaderState(app);
    const paste = modal.querySelector('[data-chat-response-reader-paste]');
    const rendered = modal.querySelector('[data-chat-response-reader-view]');
    const source = modal.querySelector('[data-chat-response-reader-source]');
    const textarea = modal.querySelector('[data-chat-response-reader-input]');
    if (source) source.textContent = readerSourceLabel(state);
    if (textarea && textarea.value !== state.markdown) textarea.value = state.markdown || '';
    if (paste) paste.hidden = state.mode !== 'paste';
    if (rendered) rendered.hidden = state.mode !== 'rendered';
    if (state.mode === 'rendered') renderProjection(app, modal);
  }

  function mountReaderModal(ui, app) {
    if (!ui || !ui.shadow || !app) return null;
    const current = ui.shadow.querySelector('[data-chat-response-reader-modal]');
    if (current) { updateModalMode(app, current); return current; }
    const modal = document.createElement('div');
    modal.dataset.chatResponseReaderModal = '1';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-label', 'Chat Response Reader');
    modal.innerHTML = `<div data-chat-response-reader-card><style>
      [data-chat-response-reader-card]{font:14px/1.45 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color-scheme:dark}
      [data-chat-response-reader-head],[data-chat-response-reader-actions]{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
      [data-chat-response-reader-head]{justify-content:space-between}
      [data-chat-response-reader-actions]{justify-content:flex-start}
      [data-chat-response-reader-card] button,[data-chat-response-reader-card] textarea{font:inherit}
      [data-chat-response-reader-card] button{border:1px solid var(--border,#3b4250);border-radius:7px;padding:6px 10px;background:var(--surface-2,#20242d);color:var(--text,#eef1f6);cursor:pointer}
      [data-chat-response-reader-card] button:hover{background:var(--surface-3,#292e39)}
      [data-chat-response-reader-card] button.primary{font-weight:700;background:#315b9d;color:#fff;border-color:#4a78bd}
      [data-chat-response-reader-input]{box-sizing:border-box;width:100%;height:100%;min-height:220px;resize:none;border:1px solid var(--border,#3b4250);border-radius:8px;padding:10px;background:var(--surface-2,#20242d);color:var(--text,#eef1f6)}
      [data-chat-response-reader-input]::placeholder{color:var(--muted,#aab2c0)}
      [data-chat-response-reader-view]{min-height:0;overflow:auto;border:1px solid var(--border,#3b4250);border-radius:8px;padding:16px;background:var(--surface,#191c23);color:var(--text,#eef1f6)}
      [data-chat-response-reader-rendered]{max-width:980px;margin:0 auto}
      [data-chat-response-reader-rendered] pre{overflow:auto;padding:10px;border-radius:8px;background:rgba(127,127,127,.12)}
      [data-chat-response-reader-rendered] table{border-collapse:collapse;max-width:100%;display:block;overflow:auto}
      [data-chat-response-reader-rendered] th,[data-chat-response-reader-rendered] td{border:1px solid var(--border,#3b4250);padding:6px 8px}
      [data-chat-response-reader-rendered] .obs-md-details{border:1px solid var(--border,#3b4250);border-radius:8px;padding:8px 10px;margin:10px 0}
      [data-chat-response-reader-rendered] .obs-md-summary{cursor:pointer;font-weight:650}
      [data-chat-response-reader-rendered] .obs-md-details-body{padding:6px 2px 2px 14px}
      [data-chat-response-reader-rendered] img{max-width:100%}
      [data-chat-response-reader-source],[data-chat-response-reader-status]{color:var(--muted,#aab2c0);font-size:12px}
    </style><div data-chat-response-reader-head><strong>Chat Response Reader</strong><button type="button" data-chat-response-reader-command="close">Close</button></div><div data-chat-response-reader-source></div><div data-chat-response-reader-actions><button type="button" data-chat-response-reader-command="paste">Paste Markdown</button><button type="button" class="primary" data-chat-response-reader-command="copy">Copy Markdown</button></div><div data-chat-response-reader-status>Local reader. No repository request or write is performed.</div><section data-chat-response-reader-paste><textarea data-chat-response-reader-input spellcheck="false" placeholder="Paste Markdown from ChatGPT here…"></textarea><div style="margin-top:8px"><button type="button" class="primary" data-chat-response-reader-command="render">Render pasted Markdown</button></div></section><section data-chat-response-reader-view><div data-chat-response-reader-rendered></div></section></div>`;
    const viewportWidth = typeof window !== 'undefined' ? (window.visualViewport && window.visualViewport.width || window.innerWidth || 1200) : 1200;
    const viewportHeight = typeof window !== 'undefined' ? (window.visualViewport && window.visualViewport.height || window.innerHeight || 900) : 900;
    const layout = readerModalLayout(viewportWidth, viewportHeight);
    Object.assign(modal.style, { position: 'fixed', inset: `${layout.inset}px`, zIndex: '2147483647', background: 'rgba(0,0,0,.42)', display: 'grid', placeItems: 'center' });
    const card = modal.querySelector('[data-chat-response-reader-card]');
    Object.assign(card.style, { boxSizing: 'border-box', width: `${layout.width}px`, height: `${layout.height}px`, maxWidth: 'calc(100vw - 64px)', maxHeight: 'calc(100vh - 64px)', background: 'var(--bg,#111318)', color: 'var(--text,#eef1f6)', border: '1px solid var(--border,#3b4250)', borderRadius: '12px', padding: '12px', display: 'grid', gridTemplateRows: 'auto auto auto auto minmax(0,1fr)', gap: '8px', boxShadow: '0 18px 50px rgba(0,0,0,.55)', colorScheme: 'dark' });

    modal.querySelector('[data-chat-response-reader-command="close"]').onclick = () => {
      setReaderState(app, { open: false, status: 'Reader closed.' });
      closeModalElement(ui);
    };
    modal.querySelector('[data-chat-response-reader-command="paste"]').onclick = () => {
      setReaderState(app, {
        open: true,
        mode: 'paste',
        sourceKind: 'paste',
        sourceAccuracy: 'exact',
        conversationKey: '',
        messageKey: '',
        markdown: '',
        capturedAt: '',
        renderDiagnostics: [],
        status: 'Paste exact Markdown and render locally.'
      });
      updateModalMode(app, modal);
      const textarea = modal.querySelector('[data-chat-response-reader-input]');
      if (textarea && textarea.focus) textarea.focus();
    };
    modal.querySelector('[data-chat-response-reader-command="render"]').onclick = () => {
      const textarea = modal.querySelector('[data-chat-response-reader-input]');
      setReaderState(app, {
        open: true,
        mode: 'rendered',
        sourceKind: 'paste',
        sourceAccuracy: 'exact',
        conversationKey: '',
        messageKey: '',
        markdown: textarea ? textarea.value : '',
        capturedAt: new Date().toISOString(),
        renderDiagnostics: [],
        status: 'Rendered exact pasted Markdown locally.'
      });
      updateModalMode(app, modal);
    };
    modal.querySelector('[data-chat-response-reader-command="copy"]').onclick = async () => {
      const status = modal.querySelector('[data-chat-response-reader-status]');
      try {
        const state = ensureReaderState(app);
        if (!state.markdown) throw new Error('Reader source is empty.');
        if (typeof app.clipboardWriter !== 'function') throw new Error('Clipboard writer is unavailable.');
        await app.clipboardWriter(state.markdown);
        if (status) status.textContent = `Markdown copied (${new TextEncoder().encode(state.markdown).byteLength} bytes).`;
      } catch (error) {
        if (status) status.textContent = `Copy failed: ${errorText(error)}`;
      }
    };
    ui.shadow.appendChild(modal);
    updateModalMode(app, modal);
    return modal;
  }

  function ensureUiVisible(ui) {
    if (!ui) return;
    if (!ui.open) {
      ui.open = true;
      if (typeof ui.render === 'function') ui.render();
    }
  }

  function openReader(app, input = {}) {
    const current = ensureReaderState(app);
    const hasMarkdown = Object.prototype.hasOwnProperty.call(input, 'markdown');
    const requestedKind = input.sourceKind || current.sourceKind || 'paste';
    const freshPaste = input.mode === 'paste' && requestedKind === 'paste' && !hasMarkdown;
    const markdown = freshPaste ? '' : hasMarkdown ? String(input.markdown == null ? '' : input.markdown) : current.markdown;
    const state = setReaderState(app, {
      open: true,
      mode: input.mode === 'paste' || !markdown ? 'paste' : 'rendered',
      sourceKind: freshPaste ? 'paste' : requestedKind,
      sourceAccuracy: freshPaste ? 'exact' : (input.sourceAccuracy || current.sourceAccuracy || 'exact'),
      conversationKey: freshPaste ? '' : Object.prototype.hasOwnProperty.call(input, 'conversationKey') ? String(input.conversationKey || '') : current.conversationKey,
      messageKey: freshPaste ? '' : Object.prototype.hasOwnProperty.call(input, 'messageKey') ? String(input.messageKey || '') : current.messageKey,
      markdown,
      capturedAt: freshPaste ? '' : (input.capturedAt || (markdown ? new Date().toISOString() : current.capturedAt)),
      renderDiagnostics: freshPaste ? [] : (Array.isArray(input.renderDiagnostics) ? input.renderDiagnostics : current.renderDiagnostics),
      status: String(input.status || (input.sourceKind === 'chat-dom' ? 'Rendered DOM-derived Markdown locally.' : 'Paste exact Markdown and render locally.'))
    });
    const ui = app.ui;
    if (ui) {
      ensureUiVisible(ui);
      UI_APP_BINDINGS.set(ui, app);
      mountReaderModal(ui, app);
    }
    return state;
  }

  function openReaderFromAssistantElement(app, element, metadata = {}) {
    const api = apiOrThrow(app);
    const result = api.serializeChatResponseDom(element);
    if (!result.markdown) {
      return openReader(app, {
        mode: 'paste',
        sourceKind: 'chat-dom',
        sourceAccuracy: 'derived',
        conversationKey: metadata.conversationKey || '',
        messageKey: metadata.messageKey || '',
        markdown: '',
        renderDiagnostics: result.diagnostics,
        status: 'Could not derive readable Markdown from this response. Paste exact Markdown instead.'
      });
    }
    return openReader(app, {
      mode: 'rendered',
      sourceKind: 'chat-dom',
      sourceAccuracy: 'derived',
      conversationKey: metadata.conversationKey || '',
      messageKey: metadata.messageKey || '',
      markdown: result.markdown,
      renderDiagnostics: result.diagnostics,
      status: `Rendered DOM-derived Markdown locally${result.diagnostics.length ? ` with ${result.diagnostics.length} extraction diagnostic(s)` : ''}.`
    });
  }

  function closeReader(app) {
    const state = setReaderState(app, { open: false, status: 'Reader closed.' });
    if (app.ui) closeModalElement(app.ui);
    return state;
  }

  async function copyReaderMarkdown(app) {
    const state = ensureReaderState(app);
    if (!state.markdown) throw new Error('Reader source is empty.');
    if (typeof app.clipboardWriter !== 'function') throw new Error('Clipboard writer is unavailable.');
    await app.clipboardWriter(state.markdown);
    return { bytes: new TextEncoder().encode(state.markdown).byteLength, markdown: state.markdown };
  }

  function assistantMessageNodes(documentObject = typeof document !== 'undefined' ? document : null) {
    if (!documentObject || typeof documentObject.querySelectorAll !== 'function') return [];
    return Array.from(documentObject.querySelectorAll('[data-message-author-role="assistant"]'));
  }

  function messageKeyForAssistant(element, index = 0) {
    if (!element) return `assistant-${index}`;
    const direct = attributeValue(element, 'data-message-id');
    if (direct) return direct;
    const turn = typeof element.closest === 'function' ? element.closest('[data-testid^="conversation-turn-"]') : null;
    const testId = attributeValue(turn, 'data-testid');
    return testId || `assistant-${index}`;
  }

  function attributeValue(element, name) {
    if (!element || typeof element.getAttribute !== 'function') return '';
    const value = element.getAttribute(name);
    return value == null ? '' : String(value);
  }

  function removeInjectedActions(documentObject = typeof document !== 'undefined' ? document : null) {
    if (!documentObject || typeof documentObject.querySelectorAll !== 'function') return;
    for (const element of Array.from(documentObject.querySelectorAll(`[${ACTION_ATTR}]`))) element.remove();
  }

  function injectAssistantActions(app, documentObject = typeof document !== 'undefined' ? document : null) {
    if (!app || !documentObject || typeof documentObject.createElement !== 'function') return 0;
    const messages = assistantMessageNodes(documentObject);
    let added = 0;
    messages.forEach((message, index) => {
      if (!message || typeof message.querySelector !== 'function' || message.querySelector(`[${ACTION_ATTR}]`)) return;
      const button = documentObject.createElement('button');
      button.type = 'button';
      button.setAttribute(ACTION_ATTR, '1');
      button.textContent = 'Open in Reader';
      button.title = 'Open this assistant response in OBS Linked Notes Reader';
      Object.assign(button.style, { marginTop: '6px', padding: '3px 7px', borderRadius: '6px', border: '1px solid currentColor', opacity: '.68', background: 'transparent', color: 'inherit', font: '12px/1.2 system-ui,sans-serif', cursor: 'pointer' });
      button.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        openReaderFromAssistantElement(app, message, {
          conversationKey: typeof location !== 'undefined' ? String(location.pathname || '') : '',
          messageKey: messageKeyForAssistant(message, index)
        });
      });
      message.appendChild(button);
      added += 1;
    });
    return added;
  }

  function activateObserver(app) {
    activeApp = app;
    if (observer) { observer.disconnect(); observer = null; }
    injectAssistantActions(app);
    if (typeof MutationObserver !== 'function' || typeof document === 'undefined' || !document.body) return;
    observer = new MutationObserver(() => { if (activeApp) injectAssistantActions(activeApp); });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  function attachUi(ui) {
    if (!ui || ACTIVE_UIS.has(ui) || typeof window === 'undefined' || typeof window.addEventListener !== 'function') return;
    const handler = (event) => {
      const app = UI_APP_BINDINGS.get(ui);
      if (!app || !ensureReaderState(app).open || !event || event.key !== 'Escape') return;
      event.preventDefault();
      if (typeof event.stopImmediatePropagation === 'function') event.stopImmediatePropagation();
      else if (typeof event.stopPropagation === 'function') event.stopPropagation();
      closeReader(app);
    };
    Object.defineProperty(ui, '__obsChatResponseReaderEscapeHandler', { value: handler, configurable: true, enumerable: false, writable: true });
    window.addEventListener('keydown', handler, true);
    ACTIVE_UIS.add(ui);
  }

  function detachUi(ui) {
    if (!ui || !ACTIVE_UIS.has(ui)) return;
    const handler = ui.__obsChatResponseReaderEscapeHandler;
    if (typeof window !== 'undefined' && typeof window.removeEventListener === 'function' && handler) window.removeEventListener('keydown', handler, true);
    try { delete ui.__obsChatResponseReaderEscapeHandler; } catch (error) { /* non-critical */ }
    closeModalElement(ui);
    ACTIVE_UIS.delete(ui);
  }

  function enhanceUi(ui) {
    if (!ui || !ui.shadow || !ui.open) return;
    const app = UI_APP_BINDINGS.get(ui);
    const bar = ui.shadow.querySelector('.workspace-bar');
    if (bar && app && !bar.querySelector('[data-chat-response-reader-command="open"]')) {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = 'Reader';
      button.dataset.chatResponseReaderCommand = 'open';
      button.onclick = () => openReader(app, { mode: 'paste', sourceKind: 'paste', sourceAccuracy: 'exact', status: 'Paste exact Markdown and render locally.' });
      bar.appendChild(button);
    }
    if (app && ensureReaderState(app).open) mountReaderModal(ui, app);
  }

  function bindApp(app) {
    ensureReaderState(app);
    activeApp = app;
    if (app.ui) {
      UI_APP_BINDINGS.set(app.ui, app);
      attachUi(app.ui);
      enhanceUi(app.ui);
    }
    activateObserver(app);
  }

  function disposeRuntime() {
    if (observer) { observer.disconnect(); observer = null; }
    activeApp = null;
    removeInjectedActions();
    for (const ui of Array.from(ACTIVE_UIS)) detachUi(ui);
  }

  function patchApp(App) {
    if (!App || !App.prototype) return false;
    if (!App.prototype[APP_PATCH]) {
      Object.defineProperty(App.prototype, APP_PATCH, { value: true, configurable: false, enumerable: false, writable: false });
      const originalStart = App.prototype.start;
      if (typeof originalStart === 'function') {
        App.prototype.start = async function chatResponseReaderStart(...args) {
          const result = await originalStart.apply(this, args);
          const runtime = root[RUNTIME_KEY];
          if (runtime && typeof runtime.bindApp === 'function') runtime.bindApp(this);
          return result;
        };
      }
      App.prototype.openChatResponseReader = function openChatResponseReader(input = {}) {
        const runtime = root[RUNTIME_KEY];
        if (!runtime || typeof runtime.openReader !== 'function') throw new Error('Chat Response Reader runtime is unavailable.');
        return runtime.openReader(this, input);
      };
      App.prototype.openChatResponseReaderFromElement = function openChatResponseReaderFromElement(element, metadata = {}) {
        const runtime = root[RUNTIME_KEY];
        if (!runtime || typeof runtime.openReaderFromAssistantElement !== 'function') throw new Error('Chat Response Reader runtime is unavailable.');
        return runtime.openReaderFromAssistantElement(this, element, metadata);
      };
      App.prototype.closeChatResponseReader = function closeChatResponseReader() {
        const runtime = root[RUNTIME_KEY];
        if (!runtime || typeof runtime.closeReader !== 'function') throw new Error('Chat Response Reader runtime is unavailable.');
        return runtime.closeReader(this);
      };
      App.prototype.copyChatResponseReaderMarkdown = function copyChatResponseReaderMarkdown() {
        const runtime = root[RUNTIME_KEY];
        if (!runtime || typeof runtime.copyReaderMarkdown !== 'function') throw new Error('Chat Response Reader runtime is unavailable.');
        return runtime.copyReaderMarkdown(this);
      };
    }
    return true;
  }

  function patchUi(UI) {
    if (!UI || !UI.prototype) return false;
    if (!UI.prototype[UI_PATCH]) {
      Object.defineProperty(UI.prototype, UI_PATCH, { value: true, configurable: false, enumerable: false, writable: false });
      const originalRender = UI.prototype.render;
      if (typeof originalRender === 'function') {
        UI.prototype.render = function chatResponseReaderRender(...args) {
          const result = originalRender.apply(this, args);
          const runtime = root[RUNTIME_KEY];
          if (runtime && typeof runtime.enhanceUi === 'function') {
            try { runtime.enhanceUi(this); } catch (error) { /* Reader must not break primary UI */ }
          }
          return result;
        };
      }
      const originalMount = UI.prototype.mount;
      if (typeof originalMount === 'function') {
        UI.prototype.mount = function chatResponseReaderMount(...args) {
          const result = originalMount.apply(this, args);
          const runtime = root[RUNTIME_KEY];
          if (runtime && typeof runtime.attachUi === 'function') runtime.attachUi(this);
          return result;
        };
      }
      const originalDispose = UI.prototype.dispose;
      if (typeof originalDispose === 'function') {
        UI.prototype.dispose = function chatResponseReaderDispose(...args) {
          const runtime = root[RUNTIME_KEY];
          if (runtime && typeof runtime.detachUi === 'function') runtime.detachUi(this);
          return originalDispose.apply(this, args);
        };
      }
    }
    return true;
  }

  function installChatResponseReader(namespace = root.ObsLinkedNotes || {}) {
    const prior = root[RUNTIME_KEY];
    if (prior && typeof prior.dispose === 'function') {
      try { prior.dispose(); } catch (error) { /* best effort */ }
    }
    const runtime = { dispose: disposeRuntime, bindApp, enhanceUi, attachUi, detachUi, injectAssistantActions, openReader, openReaderFromAssistantElement, closeReader, copyReaderMarkdown };
    root[RUNTIME_KEY] = runtime;
    const appPatched = patchApp(namespace.LinkedNotesApp);
    const uiPatched = patchUi(namespace.LinkedNotesUI);
    return { appPatched, uiPatched };
  }

  return {
    RUNTIME_KEY,
    ACTION_ATTR,
    readerModalLayout,
    assistantMessageNodes,
    messageKeyForAssistant,
    injectAssistantActions,
    openReader,
    openReaderFromAssistantElement,
    closeReader,
    copyReaderMarkdown,
    installChatResponseReader
  };
});

/* src/full-app-state-runtime.js */
(function (root, factory) {
  const api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
  if (root.ObsLinkedNotes && root.ObsLinkedNotes.LinkedNotesApp && root.ObsLinkedNotes.LinkedNotesUI) {
    try { api.installFullAppStateExport(root.ObsLinkedNotes); } catch (error) { /* bootstrap reports failures later */ }
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function (root) {
  'use strict';

  const APP_PATCH = '__obsFullAppStateExportAppV1';
  const UI_PATCH = '__obsFullAppStateExportUiV1';
  const SNAPSHOT_DB_NAMES = ['obsLinkedNotesPrototype', 'obsLinkedNotesPrototypeAssets'];
  const APP_INDEXED_DB_PREFIX = 'obsLinkedNotesPrototype';
  const UI_APP_BINDINGS = new WeakMap();
  const APP_SNAPSHOTS = new WeakMap();

  function apiOrThrow(app) {
    const api = app && app.api || root.ObsLinkedNotes || {};
    const required = ['isApplicationGmKey', 'createFullAppStateEnvelope', 'buildChatSafeFullAppState', 'formatFullAppStateForChat', 'sanitizeLiveControlRecord'];
    for (const name of required) if (typeof api[name] !== 'function') throw new Error(`Full App State export dependency is unavailable: ${name}.`);
    return api;
  }

  function errorText(error) { return String(error && error.message || error || 'Unknown error'); }

  async function listApplicationGmValues(app) {
    const api = apiOrThrow(app);
    if (typeof GM_listValues !== 'function') throw new Error('GM_listValues is unavailable. Reinstall the generated userscript with the full-state grant.');
    const allKeys = await Promise.resolve(GM_listValues());
    const keys = (Array.isArray(allKeys) ? allKeys : []).map(String).filter((key) => api.isApplicationGmKey(key)).sort();
    const values = {};
    for (const key of keys) values[key] = await app.getValue(key, null);
    return values;
  }

  async function existingIndexedDbNames(indexedDB) {
    if (!indexedDB || typeof indexedDB.open !== 'function') return { supported: false, names: [] };
    if (typeof indexedDB.databases !== 'function') return { supported: false, names: [] };
    const records = await indexedDB.databases();
    return { supported: true, names: (Array.isArray(records) ? records : []).map((item) => String(item && item.name || '')).filter(Boolean) };
  }

  async function openExistingDatabase(indexedDB, name, knownNames) {
    if (!knownNames.includes(name)) return null;
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(name);
      request.onerror = () => reject(request.error || new Error(`Unable to open IndexedDB ${name}.`));
      request.onsuccess = () => resolve(request.result);
      request.onupgradeneeded = () => {
        try { request.transaction.abort(); } catch (error) { /* best effort */ }
        reject(new Error(`Refusing to create or upgrade IndexedDB ${name} during read-only export.`));
      };
    });
  }

  async function dumpObjectStore(db, storeName) {
    return new Promise((resolve, reject) => {
      let tx;
      try { tx = db.transaction(storeName, 'readonly'); }
      catch (error) { reject(error); return; }
      const request = tx.objectStore(storeName).getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error || new Error(`Unable to read IndexedDB store ${storeName}.`));
      tx.onabort = () => reject(tx.error || new Error(`IndexedDB store ${storeName} read aborted.`));
    });
  }

  async function dumpIndexedDbState(indexedDB) {
    const inventory = await existingIndexedDbNames(indexedDB);
    if (!inventory.supported) {
      return {
        inventorySupported: false,
        databases: {},
        note: 'indexedDB.databases() is unavailable, so unopened databases were not opened because export must remain read-only.'
      };
    }
    const databases = {};
    const applicationNames = inventory.names.filter((name) => name.startsWith(APP_INDEXED_DB_PREFIX)).sort();
    const names = [...new Set([...SNAPSHOT_DB_NAMES, ...applicationNames])].sort();
    for (const name of names) {
      if (!inventory.names.includes(name)) {
        databases[name] = { present: false, stores: {} };
        continue;
      }
      const db = await openExistingDatabase(indexedDB, name, inventory.names);
      try {
        const stores = {};
        for (const storeName of Array.from(db.objectStoreNames || []).sort()) stores[storeName] = await dumpObjectStore(db, storeName);
        databases[name] = { present: true, version: Number(db.version) || 0, stores };
      } finally { if (db) db.close(); }
    }
    return { inventorySupported: true, discoveredApplicationDatabases: applicationNames, databases };
  }

  const APP_HANDLE_KEYS = ['api', 'store', 'pendingAssetStore', 'workspaceStore', 'categoryStore', 'ui', 'clientFactory', 'clipboardWriter', 'confirmAction', 'locationProvider', 'setIntervalFn', 'clearIntervalFn', 'routeTimer', 'feedbackActionHandlers', 'mediaLoaders'];
  const UI_HANDLE_KEYS = ['handlers', 'host', 'shadow', '_draftTimer', '_onViewportChange', '_onDocumentKeydown', '__fullAppStateApp'];

  function omittedHandleSummary(object, keys) {
    return keys.map((key) => {
      const value = object ? object[key] : undefined;
      return { key, present: value !== undefined && value !== null, valueType: value == null ? String(value) : value && value.constructor && value.constructor.name || typeof value };
    });
  }

  function ownState(object, exclude = []) {
    const skip = new Set(exclude);
    const output = {};
    for (const key of Object.keys(object || {}).sort()) if (!skip.has(key)) output[key] = object[key];
    return output;
  }

  function liveControlRecord(control, index) {
    const dataset = control && control.dataset || {};
    const record = {
      index,
      tag: String(control && control.tagName || '').toLowerCase(),
      type: String(control && control.type || ''),
      role: String(dataset.role || ''),
      action: String(dataset.action || ''),
      workspaceField: String(dataset.workspaceField || ''),
      name: String(control && control.name || ''),
      placeholder: String(control && control.placeholder || ''),
      value: control && 'value' in control ? String(control.value == null ? '' : control.value) : '',
      checked: Boolean(control && control.checked),
      disabled: Boolean(control && control.disabled)
    };
    if (control && control.multiple && control.options) record.selectedValues = Array.from(control.options).filter((option) => option.selected).map((option) => String(option.value));
    return record;
  }

  function captureStorageAdapterRuntime(app) {
    const store = app && app.store;
    const pending = app && app.pendingAssetStore;
    const workspace = app && app.workspaceStore;
    const category = app && app.categoryStore;
    return {
      notes: store ? { dbName: store.dbName || '', storeName: store.storeName || '', version: Number(store.version) || 0 } : null,
      pendingAssets: pending ? { dbName: pending.dbName || '', storeName: pending.storeName || '', version: Number(pending.version) || 0, memoryFallback: pending.memory instanceof Map ? pending.memory : null } : null,
      workspace: workspace ? { writerId: workspace.writerId || '', lockTtlMs: workspace.lockTtlMs, lockSettleMs: workspace.lockSettleMs, lockRetryMs: workspace.lockRetryMs, maxLockAttempts: workspace.maxLockAttempts } : null,
      categories: category ? { writerId: category.writerId || '', lockTtlMs: category.lockTtlMs, lockSettleMs: category.lockSettleMs, lockRetryMs: category.lockRetryMs, maxLockAttempts: category.maxLockAttempts } : null
    };
  }

  function captureUiRuntime(ui, api) {
    const controls = ui && ui.shadow && typeof ui.shadow.querySelectorAll === 'function'
      ? Array.from(ui.shadow.querySelectorAll('input, textarea, select')).map((control, index) => api.sanitizeLiveControlRecord(liveControlRecord(control, index)))
      : [];
    return {
      state: ui && ui.state || null,
      flags: ownState(ui, UI_HANDLE_KEYS),
      liveControls: controls,
      omittedImplementationHandles: omittedHandleSummary(ui, UI_HANDLE_KEYS)
    };
  }

  function captureAppRuntime(app) {
    return {
      state: ownState(app, APP_HANDLE_KEYS),
      omittedImplementationHandles: omittedHandleSummary(app, APP_HANDLE_KEYS)
    };
  }

  async function collectFullAppState(app) {
    const api = apiOrThrow(app);
    const collectorErrors = [];
    let gmValues = {};
    try { gmValues = await listApplicationGmValues(app); }
    catch (error) { collectorErrors.push({ source: 'gm', message: errorText(error) }); }
    let indexedDb = {};
    try { indexedDb = await dumpIndexedDbState(typeof indexedDB !== 'undefined' ? indexedDB : null); }
    catch (error) { collectorErrors.push({ source: 'indexedDb', message: errorText(error) }); indexedDb = { error: errorText(error) }; }
    return api.createFullAppStateEnvelope({
      generatedAt: new Date().toISOString(),
      gmValues,
      indexedDb,
      runtime: {
        app: captureAppRuntime(app),
        ui: captureUiRuntime(app.ui, api),
        storageAdapters: captureStorageAdapterRuntime(app)
      },
      collectorErrors,
      diagnosticNotes: [
        'Snapshot collection is local/read-only and does not perform GitHub reads or writes.',
        'DOM nodes, functions, timers, transports and other implementation handles are represented as omitted/non-serializable state rather than copied as executable values.'
      ]
    });
  }

  function copyText(app, text) {
    if (!app || typeof app.clipboardWriter !== 'function') return Promise.reject(new Error('Clipboard writer is unavailable.'));
    return app.clipboardWriter(String(text));
  }

  function patchApp(App) {
    if (!App || !App.prototype || App.prototype[APP_PATCH]) return false;
    Object.defineProperty(App.prototype, APP_PATCH, { value: true, configurable: false, enumerable: false, writable: false });
    const originalStart = App.prototype.start;
    App.prototype.buildFullAppStateSnapshot = async function buildFullAppStateSnapshot() {
      const snapshot = await collectFullAppState(this);
      APP_SNAPSHOTS.set(this, snapshot);
      return snapshot;
    };
    App.prototype.copyFullAppStateJson = async function copyFullAppStateJson() {
      const snapshot = await this.buildFullAppStateSnapshot();
      const text = JSON.stringify(snapshot, null, 2);
      await copyText(this, text);
      return { bytes: new TextEncoder().encode(text).byteLength, snapshot };
    };
    App.prototype.copyFullAppStateForChat = async function copyFullAppStateForChat() {
      const api = apiOrThrow(this);
      const snapshot = await this.buildFullAppStateSnapshot();
      const text = api.formatFullAppStateForChat(snapshot);
      await copyText(this, text);
      return { bytes: new TextEncoder().encode(text).byteLength, snapshot: api.buildChatSafeFullAppState(snapshot) };
    };
    if (typeof originalStart === 'function') {
      App.prototype.start = async function fullAppStateStart(...args) {
        const result = await originalStart.apply(this, args);
        if (this.ui) UI_APP_BINDINGS.set(this.ui, this);
        return result;
      };
    }
    return true;
  }

  function button(text, action) {
    const element = document.createElement('button');
    element.type = 'button';
    element.textContent = text;
    element.dataset.fullAppStateAction = action;
    return element;
  }

  function closeModal(ui) {
    const existing = ui && ui.shadow && ui.shadow.querySelector('[data-full-app-state-modal]');
    if (existing) existing.remove();
  }

  function renderSnapshotPreview(modal, snapshot) {
    const appGm = snapshot && snapshot.persistent && snapshot.persistent.gm || {};
    const dbs = snapshot && snapshot.persistent && snapshot.persistent.indexedDb && snapshot.persistent.indexedDb.databases || {};
    const notes = dbs.obsLinkedNotesPrototype && dbs.obsLinkedNotesPrototype.stores && dbs.obsLinkedNotesPrototype.stores.notes || [];
    const assets = dbs.obsLinkedNotesPrototypeAssets && dbs.obsLinkedNotesPrototypeAssets.stores && dbs.obsLinkedNotesPrototypeAssets.stores.assets || [];
    const raw = JSON.stringify(snapshot, null, 2);
    const preview = JSON.stringify((root.ObsLinkedNotes || {}).buildChatSafeFullAppState ? root.ObsLinkedNotes.buildChatSafeFullAppState(snapshot) : snapshot, null, 2);
    const summary = modal.querySelector('[data-full-app-state-summary]');
    if (summary) summary.textContent = `Snapshot ${snapshot.generatedAt || ''} · FULL ${new TextEncoder().encode(raw).byteLength} bytes · ${Array.isArray(appGm.keys) ? appGm.keys.length : 0} GM key(s) · ${Array.isArray(notes) ? notes.length : 0} Note(s) · ${Array.isArray(assets) ? assets.length : 0} asset(s)`;
    const pre = modal.querySelector('[data-full-app-state-preview]');
    if (pre) pre.textContent = preview;
  }

  async function refreshModal(ui, modal) {
    const app = UI_APP_BINDINGS.get(ui);
    if (!app) throw new Error('Full App State app binding is unavailable. Reopen Linked Notes.');
    const status = modal.querySelector('[data-full-app-state-status]');
    if (status) status.textContent = 'Collecting local state…';
    const snapshot = await app.buildFullAppStateSnapshot();
    renderSnapshotPreview(modal, snapshot);
    if (status) status.textContent = 'Ready. No GitHub request or local write was performed.';
    return snapshot;
  }

  function openModal(ui) {
    closeModal(ui);
    const modal = document.createElement('div');
    modal.dataset.fullAppStateModal = '1';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-label', 'Full App State');
    modal.innerHTML = `<div data-full-app-state-card><div data-full-app-state-head><strong>Full App State</strong><button data-full-app-state-action="close">Close</button></div><div class="hint" data-full-app-state-summary>Snapshot not collected yet.</div><div data-full-app-state-actions><button data-full-app-state-action="refresh">Refresh</button><button class="primary" data-full-app-state-action="copy-chat">Copy for ChatGPT</button><button data-full-app-state-action="copy-full">Copy FULL JSON</button></div><div class="hint" data-full-app-state-status>Local/read-only export. Authentication secrets are always redacted.</div><details open><summary>Chat-safe snapshot preview</summary><pre data-full-app-state-preview></pre></details></div>`;
    Object.assign(modal.style, { position: 'fixed', inset: '24px', zIndex: '2147483647', background: 'rgba(0,0,0,.38)', display: 'grid', placeItems: 'center' });
    const card = modal.querySelector('[data-full-app-state-card]');
    Object.assign(card.style, { width: 'min(1200px, calc(100vw - 64px))', height: 'min(860px, calc(100vh - 64px))', background: 'var(--panel, #fff)', color: 'var(--text, #111)', border: '1px solid var(--border, #bbb)', borderRadius: '12px', padding: '12px', display: 'grid', gridTemplateRows: 'auto auto auto auto minmax(0,1fr)', gap: '8px', boxShadow: '0 18px 50px rgba(0,0,0,.35)' });
    Object.assign(modal.querySelector('[data-full-app-state-head]').style, { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' });
    Object.assign(modal.querySelector('[data-full-app-state-actions]').style, { display: 'flex', flexWrap: 'wrap', gap: '8px' });
    const details = modal.querySelector('details');
    Object.assign(details.style, { minHeight: '0', overflow: 'auto' });
    const pre = modal.querySelector('[data-full-app-state-preview]');
    Object.assign(pre.style, { whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', fontSize: '12px' });
    modal.querySelector('[data-full-app-state-action="close"]').onclick = () => closeModal(ui);
    modal.querySelector('[data-full-app-state-action="refresh"]').onclick = () => refreshModal(ui, modal).catch((error) => { modal.querySelector('[data-full-app-state-status]').textContent = `Error: ${errorText(error)}`; });
    modal.querySelector('[data-full-app-state-action="copy-full"]').onclick = async () => {
      try { const app = UI_APP_BINDINGS.get(ui); if (!app) throw new Error('Full App State app binding is unavailable.'); const result = await app.copyFullAppStateJson(); modal.querySelector('[data-full-app-state-status]').textContent = `FULL JSON copied (${result.bytes} bytes). Credentials are redacted.`; renderSnapshotPreview(modal, APP_SNAPSHOTS.get(app) || result.snapshot); }
      catch (error) { modal.querySelector('[data-full-app-state-status]').textContent = `Copy failed: ${errorText(error)}`; }
    };
    modal.querySelector('[data-full-app-state-action="copy-chat"]').onclick = async () => {
      try { const app = UI_APP_BINDINGS.get(ui); if (!app) throw new Error('Full App State app binding is unavailable.'); const result = await app.copyFullAppStateForChat(); modal.querySelector('[data-full-app-state-status]').textContent = `ChatGPT copy copied (${result.bytes} bytes). Raw binary bytes omitted; credentials redacted.`; renderSnapshotPreview(modal, APP_SNAPSHOTS.get(app)); }
      catch (error) { modal.querySelector('[data-full-app-state-status]').textContent = `Copy failed: ${errorText(error)}`; }
    };
    ui.shadow.appendChild(modal);
    refreshModal(ui, modal).catch((error) => { modal.querySelector('[data-full-app-state-status]').textContent = `Error: ${errorText(error)}`; });
  }

  function enhanceUi(ui) {
    if (!ui || !ui.shadow || !ui.open) return;
    const bar = ui.shadow.querySelector('.workspace-bar');
    if (!bar || bar.querySelector('[data-full-app-state-action="open"]')) return;
    const open = button('App state', 'open');
    open.onclick = () => openModal(ui);
    bar.appendChild(open);
  }

  function patchUi(UI) {
    if (!UI || !UI.prototype || UI.prototype[UI_PATCH]) return false;
    Object.defineProperty(UI.prototype, UI_PATCH, { value: true, configurable: false, enumerable: false, writable: false });
    const originalRender = UI.prototype.render;
    UI.prototype.render = function fullAppStateRender(...args) {
      const result = originalRender.apply(this, args);
      try { enhanceUi(this); } catch (error) { /* state export must never break the primary UI */ }
      return result;
    };
    return true;
  }

  function installFullAppStateExport(namespace = root.ObsLinkedNotes || {}) {
    const appPatched = patchApp(namespace.LinkedNotesApp);
    const uiPatched = patchUi(namespace.LinkedNotesUI);
    return { appPatched, uiPatched };
  }

  return {
    SNAPSHOT_DB_NAMES,
    APP_INDEXED_DB_PREFIX,
    existingIndexedDbNames,
    dumpIndexedDbState,
    ownState,
    liveControlRecord,
    captureStorageAdapterRuntime,
    captureUiRuntime,
    captureAppRuntime,
    collectFullAppState,
    installFullAppStateExport
  };
});

/* bootstrap */
Promise.resolve(globalThis.ObsLinkedNotes.mountLinkedNotesPrototype()).catch((error) => {
  console.error('[OBS Linked Notes Prototype] mount failed', error);
});
