(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsPlanningHelper = Object.assign(root.ObsPlanningHelper || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const OPEN = '[PLANNING_COMMAND_DEFINITION]';
  const CLOSE = '[/PLANNING_COMMAND_DEFINITION]';
  const SCHEMA_VERSION = 1;
  const COMMANDS_PATH = 'planning/commands';
  const allowedKeys = new Set([
    'schemaVersion', 'id', 'file', 'command', 'englishName', 'commandFamily',
    'description', 'meaning', 'activeContextBehavior', 'traversalReadMode',
    'ownerFiles', 'expectedOutput', 'permissionMode', 'keyReminders',
    'userTarget', 'palette', 'refinements'
  ]);

  function assert(condition, message) {
    if (!condition) throw new TypeError(message);
  }

  function nonEmpty(value, field) {
    const text = String(value == null ? '' : value).trim();
    assert(text, `${field} is required.`);
    return text;
  }

  function singleLine(value, field) {
    const text = nonEmpty(value, field);
    assert(!/[\r\n\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(text), `${field} must be one safe text line.`);
    return text;
  }

  function stringArray(value, field, options = {}) {
    assert(Array.isArray(value), `${field} must be an array.`);
    const reader = options.singleLine === false ? nonEmpty : singleLine;
    const result = value.map((item, index) => reader(item, `${field}[${index}]`));
    if (options.nonEmpty) assert(result.length > 0, `${field} must not be empty.`);
    return result;
  }

  function validateRepositoryPath(value, field = 'repository path') {
    const text = singleLine(value, field);
    assert(!text.includes('\\'), `${field} must use forward slashes.`);
    assert(!text.startsWith('/') && !text.startsWith('//') && !/^[a-zA-Z]:\//.test(text), `${field} must be repository-relative.`);
    assert(!text.includes('://') && !/[?#`]/.test(text), `${field} contains URL, query, fragment or backtick syntax.`);
    const parts = text.split('/');
    assert(parts.every((part) => part && part !== '.' && part !== '..'), `${field} contains an invalid path segment.`);
    return parts.join('/');
  }

  function validateId(value, field = 'id') {
    const id = singleLine(value, field);
    assert(/^[a-z0-9][a-z0-9._-]*$/.test(id), `${field} must use lowercase safe identifier characters.`);
    return id;
  }

  function validateFileName(value) {
    const file = nonEmpty(value, 'file');
    assert(file.endsWith('.command.md'), 'file must end with .command.md.');
    assert(!file.includes('/') && !file.includes('\\'), 'file must be a direct-child filename.');
    assert(file !== 'README.command.md', 'README.command.md is reserved.');
    assert(!file.includes('..'), 'file must not contain ..');
    assert(/^[a-z0-9][a-z0-9._-]*\.command\.md$/.test(file), 'file must use lowercase safe filename characters.');
    return file;
  }

  function normalizeRefinement(raw, index) {
    assert(raw && typeof raw === 'object' && !Array.isArray(raw), `refinements[${index}] must be an object.`);
    const known = new Set(['id', 'label', 'description', 'readRequired', 'instruction']);
    for (const key of Object.keys(raw)) assert(known.has(key), `Unknown refinement field: ${key}`);
    return {
      id: validateId(raw.id, `refinements[${index}].id`),
      label: singleLine(raw.label, `refinements[${index}].label`),
      description: singleLine(raw.description, `refinements[${index}].description`),
      readRequired: stringArray(raw.readRequired, `refinements[${index}].readRequired`, { nonEmpty: true }).map((path, pathIndex) => validateRepositoryPath(path, `refinements[${index}].readRequired[${pathIndex}]`)),
      instruction: singleLine(raw.instruction, `refinements[${index}].instruction`)
    };
  }

  function normalizeCommandDefinition(raw, options = {}) {
    assert(raw && typeof raw === 'object' && !Array.isArray(raw), 'Command definition must be a JSON object.');
    for (const key of Object.keys(raw)) assert(allowedKeys.has(key), `Unknown command definition field: ${key}`);
    assert(Number(raw.schemaVersion) === SCHEMA_VERSION, `schemaVersion must be ${SCHEMA_VERSION}.`);
    const command = singleLine(raw.command, 'command');
    const family = stringArray(raw.commandFamily, 'commandFamily', { nonEmpty: true });
    assert(family.includes(command), 'commandFamily must contain the canonical command exactly.');
    assert(new Set(family).size === family.length, 'commandFamily must not contain duplicate aliases.');
    const file = validateFileName(raw.file);
    if (options.actualFile) assert(file === options.actualFile, `Definition file ${file} does not match actual filename ${options.actualFile}.`);
    const refinementsRaw = raw.refinements == null ? [] : raw.refinements;
    assert(Array.isArray(refinementsRaw), 'refinements must be an array.');
    const refinements = refinementsRaw.map(normalizeRefinement);
    assert(new Set(refinements.map((item) => item.id)).size === refinements.length, 'refinement ids must be unique within a command.');
    assert(typeof raw.palette === 'boolean', 'palette must be boolean.');
    return {
      schemaVersion: SCHEMA_VERSION,
      id: validateId(raw.id, 'id'),
      file,
      command,
      englishName: singleLine(raw.englishName, 'englishName'),
      commandFamily: family,
      description: singleLine(raw.description, 'description'),
      meaning: singleLine(raw.meaning, 'meaning'),
      activeContextBehavior: singleLine(raw.activeContextBehavior, 'activeContextBehavior'),
      traversalReadMode: singleLine(raw.traversalReadMode, 'traversalReadMode'),
      ownerFiles: stringArray(raw.ownerFiles, 'ownerFiles').map((path, index) => validateRepositoryPath(path, `ownerFiles[${index}]`)),
      expectedOutput: singleLine(raw.expectedOutput, 'expectedOutput'),
      permissionMode: singleLine(raw.permissionMode, 'permissionMode'),
      keyReminders: stringArray(raw.keyReminders, 'keyReminders', { nonEmpty: true }),
      userTarget: singleLine(raw.userTarget, 'userTarget'),
      palette: raw.palette,
      refinements
    };
  }

  function extractDefinitionBlocks(text) {
    const source = String(text == null ? '' : text);
    const blocks = [];
    let cursor = 0;
    while (cursor < source.length) {
      const open = source.indexOf(OPEN, cursor);
      const closeBefore = source.indexOf(CLOSE, cursor);
      if (closeBefore !== -1 && (open === -1 || closeBefore < open)) throw new TypeError('Unexpected closing PLANNING_COMMAND_DEFINITION marker.');
      if (open === -1) break;
      const nested = source.indexOf(OPEN, open + OPEN.length);
      const close = source.indexOf(CLOSE, open + OPEN.length);
      if (close === -1) throw new TypeError('Unclosed PLANNING_COMMAND_DEFINITION marker.');
      if (nested !== -1 && nested < close) throw new TypeError('Nested PLANNING_COMMAND_DEFINITION blocks are not allowed.');
      blocks.push(source.slice(open + OPEN.length, close).trim());
      cursor = close + CLOSE.length;
    }
    return blocks;
  }

  function parseJsonBlock(block, options = {}) {
    let raw;
    try { raw = JSON.parse(block); }
    catch (error) { throw new TypeError(`Invalid command definition JSON: ${error.message}`); }
    return normalizeCommandDefinition(raw, options);
  }

  function parseCommandDefinitionDocument(text, options = {}) {
    const blocks = extractDefinitionBlocks(text);
    assert(blocks.length === 1, `Command document must contain exactly one definition block; found ${blocks.length}.`);
    const actualFile = options.path ? String(options.path).replace(/\\/g, '/').split('/').pop() : options.actualFile;
    const definition = parseJsonBlock(blocks[0], { actualFile });
    return { ...definition, sourcePath: options.path ? String(options.path).replace(/\\/g, '/') : `${COMMANDS_PATH}/${definition.file}` };
  }

  function parseCommandDefinitionBatch(text) {
    const blocks = extractDefinitionBlocks(text);
    assert(blocks.length > 0, 'No PLANNING_COMMAND_DEFINITION blocks found.');
    const definitions = blocks.map((block) => parseJsonBlock(block));
    const ids = new Set();
    const commands = new Set();
    const files = new Set();
    for (const definition of definitions) {
      assert(!ids.has(definition.id), `Duplicate command id in batch: ${definition.id}`);
      assert(!commands.has(definition.command), `Duplicate canonical command in batch: ${definition.command}`);
      assert(!files.has(definition.file), `Duplicate command file in batch: ${definition.file}`);
      ids.add(definition.id); commands.add(definition.command); files.add(definition.file);
    }
    return definitions;
  }

  function toSerializable(definition) {
    const normalized = normalizeCommandDefinition(definition);
    return {
      schemaVersion: normalized.schemaVersion,
      id: normalized.id,
      file: normalized.file,
      command: normalized.command,
      englishName: normalized.englishName,
      commandFamily: normalized.commandFamily,
      description: normalized.description,
      meaning: normalized.meaning,
      activeContextBehavior: normalized.activeContextBehavior,
      traversalReadMode: normalized.traversalReadMode,
      ownerFiles: normalized.ownerFiles,
      expectedOutput: normalized.expectedOutput,
      permissionMode: normalized.permissionMode,
      keyReminders: normalized.keyReminders,
      userTarget: normalized.userTarget,
      palette: normalized.palette,
      refinements: normalized.refinements
    };
  }

  function titleFromEnglishName(name) {
    return String(name).split(/\s+/).filter(Boolean).map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  function renderCommandDefinitionDocument(definition) {
    const normalized = toSerializable(definition);
    return [
      `# ${titleFromEnglishName(normalized.englishName)}`,
      '',
      'Status: active project command definition',
      'Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.',
      '',
      OPEN,
      JSON.stringify(normalized, null, 2),
      CLOSE,
      ''
    ].join('\n');
  }

  function commandPathForDefinition(definition) {
    return `${COMMANDS_PATH}/${validateFileName(definition.file)}`;
  }

  return {
    COMMAND_DEFINITION_OPEN: OPEN,
    COMMAND_DEFINITION_CLOSE: CLOSE,
    COMMAND_DEFINITION_SCHEMA_VERSION: SCHEMA_VERSION,
    COMMANDS_PATH,
    extractDefinitionBlocks,
    normalizeCommandDefinition,
    parseCommandDefinitionDocument,
    parseCommandDefinitionBatch,
    renderCommandDefinitionDocument,
    commandPathForDefinition,
    toSerializable,
    validateRepositoryPath,
    validateId
  };
});
