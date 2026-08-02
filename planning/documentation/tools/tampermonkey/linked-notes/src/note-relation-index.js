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
