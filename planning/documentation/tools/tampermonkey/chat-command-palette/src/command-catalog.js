(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsPlanningHelper = Object.assign(root.ObsPlanningHelper || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  function assert(condition, message) { if (!condition) throw new TypeError(message); }

  function validateCommandCatalog(definitions) {
    assert(Array.isArray(definitions), 'Command catalog must be an array.');
    const byId = new Map();
    const byCommand = new Map();
    const byAlias = new Map();
    const byFile = new Map();
    for (const definition of definitions) {
      assert(definition && typeof definition === 'object', 'Catalog contains an invalid definition.');
      if (byId.has(definition.id)) throw new TypeError(`Duplicate command id: ${definition.id}`);
      if (byCommand.has(definition.command)) throw new TypeError(`Duplicate canonical command: ${definition.command}`);
      if (byFile.has(definition.file)) throw new TypeError(`Duplicate command file: ${definition.file}`);
      byId.set(definition.id, definition);
      byCommand.set(definition.command, definition);
      byFile.set(definition.file, definition);
      for (const alias of definition.commandFamily || []) {
        if (byAlias.has(alias) && byAlias.get(alias).id !== definition.id) {
          throw new TypeError(`Ambiguous command alias ${alias}: ${byAlias.get(alias).id} vs ${definition.id}`);
        }
        byAlias.set(alias, definition);
      }
    }
    return { definitions: [...definitions], byId, byCommand, byAlias, byFile };
  }

  function visibleCommandDefinitions(definitions) {
    return validateCommandCatalog(definitions).definitions.filter((definition) => definition.palette === true);
  }

  function stripRuntimeCommandMetadata(definition) {
    const result = {};
    for (const [key, value] of Object.entries(definition || {})) {
      if (!key.startsWith('__') && key !== 'sourcePath' && key !== 'sourceSha') result[key] = value;
    }
    return result;
  }

  function replaceDefinitionsByFile(currentDefinitions, incomingDefinitions) {
    const map = new Map((currentDefinitions || []).map((definition) => [definition.file, definition]));
    for (const definition of incomingDefinitions || []) map.set(definition.file, definition);
    return [...map.values()].sort((a, b) => a.file.localeCompare(b.file));
  }

  function commandReferencePaths(definition) {
    const paths = new Set();
    for (const owner of definition?.ownerFiles || []) paths.add(owner);
    for (const refinement of definition?.refinements || []) {
      for (const owner of refinement?.readRequired || []) paths.add(owner);
    }
    return [...paths].sort();
  }

  return { validateCommandCatalog, visibleCommandDefinitions, stripRuntimeCommandMetadata, replaceDefinitionsByFile, commandReferencePaths };
});
