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
