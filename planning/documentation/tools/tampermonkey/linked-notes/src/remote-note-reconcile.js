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
