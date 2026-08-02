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
