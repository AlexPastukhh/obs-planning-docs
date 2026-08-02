// ==UserScript==
// @name         OBS Linked Notes Prototype
// @namespace    https://github.com/AlexPastukhh/obs-planning-docs
// @version      0.4.2-prototype
// @description  Repository Notes, file preview and GitHub-backed file categories with explicit verified remote actions.
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
    normalizeCanonicalRepositoryPath,
    normalizeRepositoryPath,
    repositoryRelativePath,
    normalizeRepositoryTarget,
    explicitAnchorExists,
    resolveRepositoryTarget,
    repositoryTargetToString
  };
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

/* src/category-definition-codec.js */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const CATEGORY_V1_MARKER_PREFIX = '<!-- obs-file-category:v1 ';
  const CATEGORY_V2_MARKER_PREFIX = '<!-- obs-file-category:v2 ';
  const CATEGORY_MARKER_SUFFIX = ' -->';
  const IMPLIED_START = '<!-- obs-file-category:implied:start -->';
  const IMPLIED_END = '<!-- obs-file-category:implied:end -->';
  const FILES_START = '<!-- obs-file-category:files:start -->';
  const FILES_END = '<!-- obs-file-category:files:end -->';

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

  function escapeMarkdownLabel(value) {
    return String(value == null ? '' : value).replace(/\\/g, '\\\\').replace(/\[/g, '\\[').replace(/\]/g, '\\]');
  }

  function normalizeLinkItems(items, key) {
    const result = [];
    const seen = new Set();
    for (const item of Array.isArray(items) ? items : []) {
      const target = String(item && item[key] || '').trim().replace(/\\/g, '/');
      if (!target || seen.has(target)) continue;
      if (/^[a-zA-Z]:\//.test(target) || target.startsWith('/') || target.includes('://') || /[?#]/.test(target)) {
        throw new TypeError(`Category link must be a portable repository-relative Markdown path: ${target}`);
      }
      seen.add(target);
      result.push({ ...item, [key]: target, label: String(item && item.label || target).trim() || target });
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
    const decoded = target.split('/').map((segment) => {
      if (segment === '.' || segment === '..') return segment;
      let value;
      try { value = decodeURIComponent(segment.replace(/%(?![0-9A-Fa-f]{2})/g, '%25')); }
      catch (error) { throw new Error(`Category link target has invalid percent encoding: ${target}`); }
      if (!value || /[\\/?#\u0000-\u001f\u007f]/.test(value)) throw new Error(`Category link target contains an invalid path segment: ${target}`);
      return value;
    }).join('/');
    return decoded;
  }

  function renderLinks(items) {
    return items.length ? items.map((item) => `- [${escapeMarkdownLabel(item.label)}](<${encodeMarkdownTarget(item.target)}>)`).join('\n') : '_None._';
  }

  function encodeCategoryDefinition(input = {}) {
    const id = normalizeCategoryId(input.id || input.name);
    const name = normalizeCategoryName(input.name || id);
    const description = String(input.description == null ? '' : input.description).replace(/\r\n/g, '\n').replace(/\r/g, '\n').replace(/\n+$/g, '');
    const implied = normalizeLinkItems(input.impliedCategories, 'target');
    const files = normalizeLinkItems(input.files, 'target');
    const metadata = JSON.stringify({ schemaVersion: 2, id, name });
    const descriptionBlock = description ? `${description}\n\n` : '';
    return `${CATEGORY_V2_MARKER_PREFIX}${metadata}${CATEGORY_MARKER_SUFFIX}\n\n# ${name}\n\n${descriptionBlock}${IMPLIED_START}\n## Implied categories\n\n${renderLinks(implied)}\n${IMPLIED_END}\n\n${FILES_START}\n## Files\n\n${renderLinks(files)}\n${FILES_END}\n`;
  }

  function parseMarker(markdown) {
    const first = String(markdown || '').split(/\r?\n/, 1)[0];
    const prefix = first.startsWith(CATEGORY_V2_MARKER_PREFIX) ? CATEGORY_V2_MARKER_PREFIX
      : first.startsWith(CATEGORY_V1_MARKER_PREFIX) ? CATEGORY_V1_MARKER_PREFIX : '';
    if (!prefix || !first.endsWith(CATEGORY_MARKER_SUFFIX)) throw new Error('Markdown is not an obs-file-category definition.');
    let metadata;
    try { metadata = JSON.parse(first.slice(prefix.length, -CATEGORY_MARKER_SUFFIX.length)); }
    catch (error) { throw new Error(`Category marker JSON is invalid: ${error.message}`); }
    const schemaVersion = Number(metadata && metadata.schemaVersion);
    const expected = prefix === CATEGORY_V2_MARKER_PREFIX ? 2 : 1;
    if (schemaVersion !== expected) throw new Error('Unsupported category definition schema.');
    return { schemaVersion, id: normalizeCategoryId(metadata.id), name: normalizeCategoryName(metadata.name) };
  }

  function parseMarkdownLinks(text) {
    const result = [];
    for (const line of String(text || '').split(/\r?\n/)) {
      const match = line.match(/^\s*-\s+\[((?:\\.|[^\]])*)\]\((.*)\)\s*$/);
      if (!match) continue;
      const label = match[1].replace(/\\([\\\[\]])/g, '$1');
      const target = decodeMarkdownTarget(match[2]);
      result.push({ label, target });
    }
    return normalizeLinkItems(result, 'target');
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
    const description = body.slice(heading[0].length, impliedIndex).replace(/^\n+|\n+$/g, '');
    return {
      schemaVersion: 1,
      id: marker.id,
      name: marker.name,
      description,
      impliedCategories: parseMarkdownLinks(body.slice(impliedIndex + impliedHeading.length, filesIndex)),
      files: parseMarkdownLinks(body.slice(filesIndex + filesHeading.length))
    };
  }

  function findManagedRegion(body, startMarker, endMarker, label) {
    const start = body.indexOf(startMarker);
    const end = body.indexOf(endMarker);
    if (start < 0 || end < 0 || end <= start) throw new Error(`${label} managed boundaries are missing or out of order.`);
    if (body.indexOf(startMarker, start + startMarker.length) >= 0 || body.indexOf(endMarker, end + endMarker.length) >= 0) {
      throw new Error(`${label} managed boundaries are duplicated.`);
    }
    return { start, end, contentStart: start + startMarker.length, content: body.slice(start + startMarker.length, end) };
  }

  function decodeV2(source, marker) {
    const { body, heading } = bodyAndHeading(source);
    const implied = findManagedRegion(body, IMPLIED_START, IMPLIED_END, 'Implied categories');
    const files = findManagedRegion(body, FILES_START, FILES_END, 'Files');
    if (implied.start < heading[0].length || files.start <= implied.end) throw new Error('Category managed boundaries are out of order.');
    const description = body.slice(heading[0].length, implied.start).replace(/^\n+|\n+$/g, '');
    return {
      schemaVersion: 2,
      id: marker.id,
      name: marker.name,
      description,
      impliedCategories: parseMarkdownLinks(implied.content),
      files: parseMarkdownLinks(files.content)
    };
  }

  function decodeCategoryDefinition(markdown) {
    const source = String(markdown == null ? '' : markdown).replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    const marker = parseMarker(source);
    return marker.schemaVersion === 2 ? decodeV2(source, marker) : decodeV1(source, marker);
  }

  function isCategoryDefinitionMarkdown(markdown) {
    const source = String(markdown || '');
    return source.startsWith(CATEGORY_V1_MARKER_PREFIX) || source.startsWith(CATEGORY_V2_MARKER_PREFIX);
  }

  function categoryFileName(id) { return `${normalizeCategoryId(id)}.md`; }

  return {
    CATEGORY_MARKER_PREFIX: CATEGORY_V2_MARKER_PREFIX,
    CATEGORY_V1_MARKER_PREFIX,
    CATEGORY_V2_MARKER_PREFIX,
    IMPLIED_START,
    IMPLIED_END,
    FILES_START,
    FILES_END,
    normalizeCategoryId,
    normalizeCategoryName,
    encodeCategoryDefinition,
    decodeCategoryDefinition,
    isCategoryDefinitionMarkdown,
    categoryFileName,
    encodeMarkdownTarget,
    decodeMarkdownTarget
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
  function validationFor(source, path) {
    if (!source) return { status: 'unchecked', message: 'File target was not validated.' };
    const value = source instanceof Map ? source.get(path) : source[path];
    if (!value) return { status: 'unchecked', message: 'File target was not validated.' };
    if (typeof value === 'string') return { status: value, message: '' };
    return { status: String(value.status || 'unchecked'), message: String(value.message || '') };
  }

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
      const record = { ...definition, path, sha: String(raw.sha || ''), htmlUrl: String(raw.htmlUrl || ''), explicitFiles: [], impliedCategoryIds: [], brokenLinks: [] };
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

    for (const category of categories.values()) {
      const fileSeen = new Set();
      for (const link of category.files || []) {
        const path = resolveRelative(category.path, link.target);
        if (!path) {
          const issue = { kind: 'file_link_invalid', path: category.path, target: link.target, message: `Invalid member-file link in ${category.path}: ${link.target}.` };
          category.brokenLinks.push(issue); errors.push(issue); continue;
        }
        if (!fileSeen.has(path)) {
          fileSeen.add(path);
          const validation = validationFor(options.fileValidation, path);
          const file = { path, label: link.label || path, validation: validation.status, validationMessage: validation.message };
          category.explicitFiles.push(file);
          if (validation.status === 'missing') {
            const issue = { kind: 'broken_file_link', path: category.path, targetPath: path, message: `Member file does not exist: ${path}.` };
            category.brokenLinks.push(issue); errors.push(issue);
          } else if (validation.status === 'inaccessible') {
            errors.push({ kind: 'inaccessible_file_link', path: category.path, targetPath: path, message: validation.message || `Member file could not be validated: ${path}.` });
          } else if (validation.status === 'unchecked') {
            errors.push({ kind: 'unchecked_file_link', path: category.path, targetPath: path, message: validation.message || `Member file was not validated: ${path}.` });
          }
        }
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
    for (const category of categories.values()) {
      for (const file of category.explicitFiles) {
        const entry = memberships.get(file.path) || { path: file.path, explicit: new Set(), derived: new Set(), validation: file.validation, validationMessage: file.validationMessage };
        entry.explicit.add(category.id);
        if (entry.validation === 'unchecked' && file.validation !== 'unchecked') {
          entry.validation = file.validation; entry.validationMessage = file.validationMessage;
        }
        memberships.set(file.path, entry);
      }
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

    function filesForCategory(id) {
      const result = [];
      for (const entry of memberships.values()) {
        if (entry.explicit.has(id)) result.push({ path: entry.path, membership: 'explicit', validation: entry.validation, validationMessage: entry.validationMessage });
        else if (entry.derived.has(id)) result.push({ path: entry.path, membership: 'derived', validation: entry.validation, validationMessage: entry.validationMessage });
      }
      return result.sort((a, b) => a.path.localeCompare(b.path));
    }

    return { categories, byPath, memberships, errors, cycles, filesForCategory, resolveRelative };
  }

  return { buildRepositoryCategoryIndex };
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

    _rootUrl() {
      return `${this.apiBase}/repos/${encodeURIComponent(this.owner)}/${encodeURIComponent(this.repo)}/contents?ref=${encodeURIComponent(this.branch)}`;
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
    const right = width >= 960
      ? Math.min(320, Math.max(220, Math.round(width * 0.2)))
      : edge;
    const bottom = height >= 520
      ? Math.min(144, Math.max(96, Math.round(height * 0.14)))
      : edge;
    return {
      edge,
      right,
      bottom,
      width: Math.max(240, Math.min(980, width - right - edge)),
      height: Math.max(240, Math.min(760, height - bottom - edge))
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
        categories: [],
        selectedCategoryId: '',
        categoryEditor: { id: '', name: '', description: '', impliedCategoryIds: [], group: '' },
        categoryFiles: [],
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
      this._draftTimer = null;
      this._onViewportChange = () => this._positionPanel();
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
      if (typeof window !== 'undefined') {
        window.addEventListener('resize', this._onViewportChange, { passive: true });
        if (window.visualViewport) window.visualViewport.addEventListener('resize', this._onViewportChange, { passive: true });
      }
      this.render();
    }

    dispose() {
      this.persistAllDraftsNow().catch(() => {});
      document.removeEventListener('keydown', this._onDocumentKeydown, true);
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

    _positionPanel() {
      const panel = this.shadow && this.shadow.querySelector('.panel');
      if (!panel || typeof window === 'undefined') return;
      const viewport = window.visualViewport || window;
      const layout = panelViewportLayout(viewport.width || window.innerWidth, viewport.height || window.innerHeight);
      panel.style.right = `${layout.right}px`;
      panel.style.bottom = `${layout.bottom}px`;
      panel.style.width = `${layout.width}px`;
      panel.style.height = `${layout.height}px`;
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
          <span>${escapeHtml(category.group ? `${category.group} · ` : '')}${category.explicitFileCount} explicit file(s)</span>
        </button>`).join('') || '<div class="empty">No category definitions cached.</div>';
      const sidebarBody = surface === 'notes' ? notesHtml : surface === 'files' ? repositoryEntriesHtml : categoriesHtml;
      const sidebarToolbar = surface === 'notes'
        ? `<input data-role="search" placeholder="Search Notes (Enter)" value="${escapeHtml(this.state.search)}" ${disabled}><button data-action="new" ${disabled}>New</button>`
        : surface === 'files'
          ? `<button data-action="browse-root" ${activeWorkspace && !busy ? '' : 'disabled'}>Browse root</button><button data-action="browse-up" ${this.state.repositoryPath && !busy ? '' : 'disabled'}>Up</button>`
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
      const breadcrumbs = (this.state.repositoryBreadcrumbs || []).map((item) => `<button data-browse-path="${escapeHtml(item.path)}" ${disabled}>${escapeHtml(item.label)}</button>`).join('<span>/</span>');
      const fileSurface = `
        <div class="editor-toolbar">
          <button data-action="browse-root" ${activeWorkspace && !busy ? '' : 'disabled'}>Browse root</button>
          <button data-action="browse-up" ${this.state.repositoryPath && !busy ? '' : 'disabled'}>Up</button>
          <button class="primary" data-action="open-file-github" ${preview && !busy ? '' : 'disabled'}>Open on GitHub</button>
          <button data-action="close" ${disabled}>Close</button>
        </div>
        <div class="file-context"><div class="breadcrumbs">${breadcrumbs || '<span>/</span>'}</div><div>${escapeHtml(this.state.repositoryPath || '/')}</div></div>
        ${preview ? `<section class="file-preview">
          <h3>${escapeHtml(preview.path)}</h3>
          <div class="hint">${escapeHtml(preview.kind)} · ${escapeHtml(preview.size || 0)} bytes · SHA ${escapeHtml(preview.sha || '')}</div>
          ${preview.kind === 'text' ? `<pre>${escapeHtml(preview.content || '')}</pre>` : `<div class="remote-context">${escapeHtml(preview.message || 'Preview unavailable. Open on GitHub.')}</div>`}
        </section>` : '<div class="empty">Select a file to view it here. Every selected file also has an Open on GitHub action.</div>'}`;
      const categoryEditor = this.state.categoryEditor || { id: '', name: '', description: '', impliedCategoryIds: [], group: '' };
      const categoryFilesHtml = (this.state.categoryFiles || []).map((file) => `<div class="category-file-row">
          <button data-category-file-open="${escapeHtml(file.path)}" ${disabled}>${escapeHtml(file.path)}</button>
          <span>${escapeHtml(file.membership)} · ${escapeHtml(file.validation || 'unchecked')}</span>
          ${file.membership === 'explicit' ? `<button data-category-file-remove="${escapeHtml(file.path)}" ${disabled}>Remove</button>` : ''}
          ${file.validationMessage ? `<small>${escapeHtml(file.validationMessage)}</small>` : ''}
        </div>`).join('') || '<div class="empty">No files in this category.</div>';
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
            <button data-action="save-category-group" ${categoryEditor.id && !busy ? '' : 'disabled'}>Save local group</button>
            <button data-action="assign-preview-category" ${categoryEditor.id && preview && this.state.categoryAssignmentAllowed && !busy ? '' : 'disabled'}>Assign selected file</button>
            <span class="hint">Category definitions and file links are stored in GitHub. UX groups are local-only.</span>
          </div>
          <h3>Files</h3><div class="category-files">${categoryFilesHtml}</div>
          ${categoryErrorsHtml ? `<h3>Category model issues</h3><div class="category-errors">${categoryErrorsHtml}</div>` : ''}
        </section>`;
      const notesSurface = `
        <div class="editor-toolbar">
          <button class="primary" data-action="save-local" ${current && !busy ? '' : 'disabled'}>Save local</button>
          <button class="primary" data-action="save-remote" ${current && activeWorkspace && !busy ? '' : 'disabled'}>Save GitHub</button>
          <button data-action="copy-remote" ${current && activeWorkspace && this.state.remoteTargetMismatch && !busy ? '' : 'disabled'}>Copy to chat workspace</button>
          ${recoveryButtons}
          <button class="danger" data-action="delete" ${current && !busy ? '' : 'disabled'}>Delete local</button>
          <button data-action="close" ${disabled}>Close</button>
        </div>
        ${current ? `
          <input data-role="title" placeholder="Optional title" value="${escapeHtml(current.title || '')}" ${disabled}>
          <textarea data-role="body" placeholder="Markdown Note body" ${disabled}>${escapeHtml(current.body || '')}</textarea>
          ${remoteInfo}
          ${remoteSummary}
          <section><h3>Links</h3><div class="links">${linksHtml}</div>
            <div class="add-link">
              <select data-role="link-type" ${disabled}><option value="repository">Repository path</option><option value="note">Note ID</option><option value="url">Portable URL</option></select>
              <input data-role="link-target" placeholder="sibling.md, ../root.md or #explicit-anchor" ${disabled}>
              <input data-role="link-label" placeholder="Optional label" ${disabled}>
              <button data-action="add-link" ${disabled}>Add link</button>
            </div>
          </section>` : '<div class="empty">Create or select a Note.</div>'}`;
      const activeSurface = surface === 'files' ? fileSurface : surface === 'categories' ? categorySurface : notesSurface;

      this.shadow.innerHTML = `
        <style>
          :host { all: initial; --bg:#111318; --surface:#191c23; --surface-2:#20242d; --surface-3:#292e39; --border:#3b4250; --text:#eef1f6; --muted:#aab2c0; --accent:#8eb4ff; --success:#79d69a; --danger:#ff8d8d; }
          *, *::before, *::after { box-sizing: border-box; }
          button, input, textarea, select { font: 13px/1.35 system-ui, sans-serif; }
          .launcher { position: fixed; right: 102px; bottom: 18px; z-index: 2147483647; border: 1px solid #343a46; border-radius: 999px; padding: 10px 15px; background: #202123; color: #fff; box-shadow: 0 5px 18px rgba(0,0,0,.42); cursor: pointer; }
          .panel { position: fixed; right: 12px; bottom: 96px; z-index: 2147483647; width: min(980px, calc(100vw - 24px)); height: min(760px, calc(100dvh - 108px)); max-width: calc(100vw - 24px); max-height: calc(100dvh - 24px); min-width: 0; min-height: 0; display: ${this.open ? 'grid' : 'none'}; grid-template-columns: 260px minmax(0, 1fr); grid-template-rows: minmax(0, 1fr); background: var(--bg); color: var(--text); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; box-shadow: 0 14px 42px rgba(0,0,0,.55); font: 13px/1.4 system-ui, sans-serif; color-scheme: dark; }
          .sidebar { display: flex; flex-direction: column; min-width: 0; min-height: 0; overflow: hidden; background: var(--surface); border-right: 1px solid var(--border); }
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
          .main { min-width: 0; min-height: 0; overflow: hidden; display: flex; flex-direction: column; }
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
          .workspace-manager-panel { margin-top: 10px; }
          @media (max-width: 700px) { .panel { grid-template-columns: minmax(0, 1fr); grid-template-rows: auto minmax(0, 1fr); } .sidebar { max-height: 190px; border-right: 0; border-bottom: 1px solid var(--border); } .add-link, .workspace-bar, .settings-grid { grid-template-columns: 1fr; } }
        </style>
        <button class="launcher" data-action="toggle" ${disabled}>Docs</button>
        <section class="panel" aria-label="Repository Documentation Workspace Prototype" aria-busy="${busy ? 'true' : 'false'}">
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
          </main>
        </section>`;

      this._positionLauncher();
      this._positionPanel();
      const details = this.shadow.querySelector('[data-role="workspace-manager"]');
      if (details) details.ontoggle = () => { this.workspaceManagerOpen = details.open; };
      const title = this.shadow.querySelector('[data-role="title"]');
      const body = this.shadow.querySelector('[data-role="body"]');
      if (title) title.oninput = () => this._scheduleDraftPersist();
      if (body) body.oninput = () => this._scheduleDraftPersist();
      this.shadow.querySelectorAll('[data-workspace-field]').forEach((input) => {
        input.oninput = () => { this.workspaceEditorDirty = true; this._captureWorkspaceIntoState(); };
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
      const categoryFromForm = () => ({
        id: (this.shadow.querySelector('[data-role="category-id"]') || {}).value || '',
        name: (this.shadow.querySelector('[data-role="category-name"]') || {}).value || '',
        description: (this.shadow.querySelector('[data-role="category-description"]') || {}).value || '',
        impliedCategoryIds: (((this.shadow.querySelector('[data-role="category-implies"]') || {}).value || '').split(',').map((value) => value.trim()).filter(Boolean)),
        group: (this.shadow.querySelector('[data-role="category-group"]') || {}).value || ''
      });
      const saveCategory = this.shadow.querySelector('[data-action="save-category"]');
      if (saveCategory) saveCategory.onclick = () => this._call('onSaveCategory', categoryFromForm());
      const saveCategoryGroup = this.shadow.querySelector('[data-action="save-category-group"]');
      if (saveCategoryGroup) saveCategoryGroup.onclick = () => { const category = categoryFromForm(); return this._call('onSetCategoryGroup', category.id, category.group); };
      const assignPreview = this.shadow.querySelector('[data-action="assign-preview-category"]');
      if (assignPreview) assignPreview.onclick = () => this._call('onAssignCategory', categoryEditor.id, preview && preview.path);
      this.shadow.querySelectorAll('[data-category-file-open]').forEach((button) => { button.onclick = () => this._withAllDrafts('onOpenRepositoryEntry', { path: button.dataset.categoryFileOpen, type: 'file' }); });
      this.shadow.querySelectorAll('[data-category-file-remove]').forEach((button) => { button.onclick = () => this._call('onUnassignCategory', categoryEditor.id, button.dataset.categoryFileRemove); });
    }

  }

  return {
    LinkedNotesUI,
    escapeHtml,
    launcherRightOffset,
    panelViewportLayout,
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
      this.surface = 'notes';
      this.repositoryPath = '';
      this.repositoryEntries = [];
      this.repositoryPreview = null;
      this.categorySnapshot = { definitions: [], diagnostics: [], fileValidation: {}, groups: {}, refreshedAt: '' };
      this.categoryIndex = this._emptyCategoryIndex();
      this.selectedCategoryId = '';
      this.categoryContextWorkspaceId = '';
      this.categoryContextKey = '';
      this.categoryContextRequiresRefresh = false;
      this.categoryContextsRequiringRefresh = new Set();
      this.workspaceContextGeneration = 0;
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
      return {
        surface: this.surface,
        repositoryPath: this.repositoryPath,
        repositoryEntries: this.repositoryEntries,
        repositoryBreadcrumbs: this.api.repositoryBreadcrumbs ? this.api.repositoryBreadcrumbs(this.repositoryPath) : [],
        repositoryPreview: this.repositoryPreview,
        categories,
        selectedCategoryId: selected ? selected.id : '',
        categoryEditor: selected ? {
          id: selected.id,
          name: selected.name,
          description: selected.description,
          impliedCategoryIds: selected.impliedCategoryIds,
          group: selected.group
        } : { id: '', name: '', description: '', impliedCategoryIds: [], group: '' },
        categoryFiles: selectedRecord && this.categoryIndex.filesForCategory ? this.categoryIndex.filesForCategory(selected.id) : [],
        categoryErrors: [
          ...(Array.isArray(this.categorySnapshot.diagnostics) ? this.categorySnapshot.diagnostics : []),
          ...(this.categoryIndex && Array.isArray(this.categoryIndex.errors) ? this.categoryIndex.errors : [])
        ],
        categoryRefreshedAt: this.categorySnapshot.refreshedAt || '',
        categoryAssignmentAllowed
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
      this.ui.setState({ ...this._workspaceUiState(), ...this._remoteUiState(), ...this._categoryUiState(), ...patch });
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
      await this._loadCategoryCache();
      this._setUi({ status: status || 'Workspace and category context refreshed from Tampermonkey storage.' });
      return this.workspaceState;
    }


    _emptyCategoryIndex() {
      return this.api.buildRepositoryCategoryIndex
        ? this.api.buildRepositoryCategoryIndex([])
        : { categories: new Map(), filesForCategory: () => [], errors: [] };
    }

    _resetWorkspaceDerivedContext() {
      this.repositoryPath = '';
      this.repositoryEntries = [];
      this.repositoryPreview = null;
      this.categorySnapshot = { definitions: [], diagnostics: [], fileValidation: {}, groups: {}, refreshedAt: '' };
      this.categoryIndex = this._emptyCategoryIndex();
      this.selectedCategoryId = '';
      this.categoryContextWorkspaceId = '';
      this.categoryContextKey = '';
    }

    async _loadCategoryCache() {
      const workspace = this._activeWorkspace();
      const contextKey = this._categoryContextKey(workspace);
      const previousWorkspaceId = this.categoryContextWorkspaceId;
      const previousContextKey = this.categoryContextKey;
      const targetChangedInPlace = Boolean(workspace && previousWorkspaceId === workspace.id && previousContextKey && previousContextKey !== contextKey);
      if (targetChangedInPlace) this.categoryContextsRequiringRefresh.add(contextKey);
      const generation = ++this.workspaceContextGeneration;
      this._resetWorkspaceDerivedContext();
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
        groups: snapshot.groups && typeof snapshot.groups === 'object' ? snapshot.groups : {},
        refreshedAt: String(snapshot.refreshedAt || '')
      };
      this.categoryIndex = this.api.buildRepositoryCategoryIndex
        ? this.api.buildRepositoryCategoryIndex(this.categorySnapshot.definitions, { fileValidation: this.categorySnapshot.fileValidation })
        : this._emptyCategoryIndex();
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
      await this.refreshWorkspaceState('Workspace and category context refreshed when Documentation Workspace opened.');
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
      this.categorySnapshot = { definitions: [], diagnostics: [], fileValidation: {}, groups: {}, refreshedAt: '' };
      this.categoryIndex = api.buildRepositoryCategoryIndex ? api.buildRepositoryCategoryIndex([]) : { categories: new Map(), filesForCategory: () => [], errors: [] };
      this.selectedCategoryId = '';
      this.categoryContextWorkspaceId = '';
      this.categoryContextKey = '';
      this.categoryContextRequiresRefresh = false;
      this.categoryContextsRequiringRefresh.clear();
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


    setSurface(surface) {
      const allowed = new Set(['notes', 'files', 'categories']);
      const next = String(surface || 'notes');
      if (!allowed.has(next)) throw new Error(`Unsupported workspace surface: ${next}`);
      this.surface = next;
      this._setUi({ status: `${next[0].toUpperCase()}${next.slice(1)} surface opened. Remote access remains explicit.` });
      return next;
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
        this.surface = 'files';
        this._setUi({ status: preview.kind === 'text' ? `Opened ${file.path} read-only.` : preview.message });
        return this.repositoryPreview;
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
      const filePaths = Array.from(initialIndex.memberships.keys()).sort();
      const validationLimit = 100;
      const fileValidation = {};
      const validationPaths = filePaths.slice(0, validationLimit);
      const pathsByParent = new Map();
      for (const path of validationPaths) {
        const slash = path.lastIndexOf('/');
        const parent = slash >= 0 ? path.slice(0, slash) : '';
        const group = pathsByParent.get(parent) || [];
        group.push(path);
        pathsByParent.set(parent, group);
      }
      for (const [parent, paths] of pathsByParent.entries()) {
        try {
          const directoryEntries = await client.listDirectory(parent, { missingAsEmpty: true, maxEntries: 200 });
          const files = new Set(directoryEntries.filter((entry) => entry.type === 'file').map((entry) => entry.path));
          for (const path of paths) {
            fileValidation[path] = files.has(path)
              ? { status: 'verified', message: 'Repository file exists.' }
              : { status: 'missing', message: `Repository file does not exist: ${path}.` };
          }
        } catch (error) {
          for (const path of paths) fileValidation[path] = { status: 'inaccessible', message: String(error && error.message || error) };
        }
      }
      if (filePaths.length > validationLimit) {
        for (const path of filePaths.slice(validationLimit)) fileValidation[path] = { status: 'unchecked', message: 'Target was not checked because the validation limit was reached.' };
        diagnostics.push({ kind: 'incomplete_file_validation', path: basePath, message: `Validated ${validationLimit} of ${filePaths.length} unique member-file targets.` });
      }

      const refreshedAt = new Date().toISOString();
      let snapshot = {
        definitions,
        diagnostics,
        fileValidation,
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
      this.categoryIndex = this.api.buildRepositoryCategoryIndex(definitions, { fileValidation });
      if (this.selectedCategoryId && !this.categoryIndex.categories.has(this.selectedCategoryId)) this.selectedCategoryId = '';
      this.surface = 'categories';
      const issueCount = diagnostics.length + this.categoryIndex.errors.length;
      const summary = `definitions ${definitions.length}; skipped ${skipped}; issues ${issueCount}; validated files ${Math.min(filePaths.length, validationLimit)}/${filePaths.length}`;
      this._setUi({ categoryRefreshSummary: summary, status: `Category refresh complete: ${summary}. No remote writes were performed.` });
      return { definitions: definitions.length, skipped, errors: diagnostics.length, modelErrors: this.categoryIndex.errors.length, diagnostics: [...diagnostics, ...this.categoryIndex.errors] };
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
      this.surface = 'categories';
      this._setUi({ status: value ? `Category opened: ${this.categoryIndex.categories.get(value).name}.` : 'New category form ready.' });
      return value ? this.categoryIndex.categories.get(value) : null;
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
        const previous = existing ? existing.definition : { files: [], impliedCategories: [] };
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
        for (const link of unresolvedPrevious) {
          if (!impliedCategories.some((item) => item.target === link.target)) impliedCategories.push(link);
        }
        const content = this.api.encodeCategoryDefinition({
          id,
          name: input.name,
          description: input.description,
          impliedCategories,
          files: previous.files || []
        });
        await client.saveVerified({
          path,
          content,
          baseSha: existing ? existing.sha : '',
          message: `${existing ? 'Update' : 'Create'} file category ${input.name || id}`
        });
        await this._refreshCategoriesUnlocked(client, workspace);
        this.selectedCategoryId = id;
        if (input.group !== undefined) await this.setCategoryGroup(id, input.group, { silent: true });
        this._setUi({ status: `Category ${input.name || id} saved and verified by read-back.` });
        return this.categoryIndex.categories.get(id);
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
        files: kept
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
      if (this.current) {
        const refreshed = notes.find((item) => item.id === this.current.id) || await this.store.get(this.current.id);
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
