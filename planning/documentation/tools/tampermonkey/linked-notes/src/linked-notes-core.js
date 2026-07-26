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
