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
