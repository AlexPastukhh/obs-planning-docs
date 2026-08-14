// ==UserScript==
// @name         Reusable Chat Planning Helper
// @namespace    https://github.com/AlexPastukhh/obs/reusable-docs
// @version      0.21.1-repository-command-registry
// @description  Modular OBS Planning Helper with planning commands, local helper commands/prompts and bounded GitHub persistence.
// @author       Reusable docs layer
// @match        https://chatgpt.com/*
// @match        https://chat.openai.com/*
// @run-at       document-idle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @connect      api.github.com
// ==/UserScript==

// GENERATED FILE — DO NOT EDIT MANUALLY.
// Source: planning/documentation/tools/tampermonkey/chat-command-palette/src/**
// Planning commands: planning/commands/*.command.md
// Helper library: planning/helper-library/{commands,prompts}/
// Build: node planning/documentation/tools/tampermonkey/chat-command-palette/build-chat-command-palette.mjs

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

(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsPlanningHelper = Object.assign(root.ObsPlanningHelper || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const MODE = Object.freeze({ ADAPTIVE: 'adaptive', FULL: 'full' });

  function commandReadBlock(definition, mode) {
    const path = `planning/commands/${definition.file}`;
    if (mode === MODE.FULL) {
      return [
        'source_of_truth:',
        '  Start from `planning/planning-use-case-map.md`.',
        `  Then read \`${path}\` and follow its complete owner route.`,
        '',
        'route_read_rule:',
        '  Full route reading is required for this invocation.',
        '  Read the root command-system entry, this command definition and every owner/workflow/template/example required by the definition.',
        '  Do this even if the command was previously used in this chat.',
        '  Do not expand into unrelated repository files.',
        '  Full does not expand permissions.'
      ];
    }
    return [
      'source_of_truth:',
      '  Start from `planning/planning-use-case-map.md`.',
      `  Then read \`${path}\` and its linked owner files for this command route.`,
      '',
      'route_read_rule:',
      '  Read or reread the route when it is not current, remembered or certain.',
      '  Do not rely only on this compact prompt when command behavior is uncertain.'
    ];
  }

  function formatFamily(family) { return (family || []).map((item) => `\`${item}\``).join(' / '); }

  function buildCommandBody(definition, mode = MODE.ADAPTIVE) {
    return [
      '[PLANNING_COMMAND]',
      'Read this whole command body before answering.',
      'Do not ignore `key_reminders`.',
      '',
      'command:',
      `  ${definition.command}`,
      '',
      'english_name:',
      `  ${definition.englishName}`,
      '',
      'command_family:',
      `  ${formatFamily(definition.commandFamily)}`,
      '',
      'command_definition:',
      `  planning/commands/${definition.file}`,
      '',
      ...commandReadBlock(definition, mode),
      '',
      'key_reminders:',
      ...(definition.keyReminders || []).map((item) => `  - ${item}`),
      '',
      'user_target:',
      `  ${definition.userTarget}`,
      '',
      '[/PLANNING_COMMAND]'
    ].join('\n');
  }

  function buildRefinementBody(definition, refinement) {
    return [
      '[PLANNING_COMMAND_REFINEMENT]',
      'command:',
      `  ${definition.command}`,
      '',
      'command_definition:',
      `  planning/commands/${definition.file}`,
      '',
      'refinement:',
      `  ${refinement.id}`,
      '',
      'read_required:',
      ...(refinement.readRequired || []).map((path) => `  - \`${path}\``),
      '',
      'instruction:',
      `  ${refinement.instruction}`,
      '',
      '[/PLANNING_COMMAND_REFINEMENT]'
    ].join('\n');
  }

  function buildCommandEntry(definition) {
    return {
      ...definition,
      label: definition.command,
      adaptiveBody: buildCommandBody(definition, MODE.ADAPTIVE),
      fullBody: buildCommandBody(definition, MODE.FULL),
      refinementBodies: (definition.refinements || []).map((refinement) => ({ ...refinement, body: buildRefinementBody(definition, refinement) }))
    };
  }

  function buildCommandEntries(definitions) { return (definitions || []).filter((definition) => definition.palette === true).map(buildCommandEntry); }

  return { MODE, commandReadBlock, buildCommandBody, buildRefinementBody, buildCommandEntry, buildCommandEntries };
});

(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsPlanningHelper = Object.assign(root.ObsPlanningHelper || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const SURFACES = Object.freeze({ ORIENTATION: 'Orientation', DIRECTIONS: 'Directions', USE_CASES: 'Use Cases', COMMANDS: 'Commands', LOCAL_COMMANDS: 'Local Cmds', PROMPTS: 'Prompts' });
  const MODE = Object.freeze({ ADAPTIVE: 'adaptive', FULL: 'full' });

  const ORIENTATION_DEFINITIONS = [{
    id: 'OBS-PLANNING-ORIENTATION', label: 'OBS Planning Orientation', description: 'architecture and context selection',
    sources: ['planning/README.md', 'planning/direction-registry.md'],
    instruction: 'Explain the current planning architecture, distinguish Directions, Use Cases and Commands, and help select the relevant context. Do not execute unrelated commands.',
    target: '<what planning context should be oriented>'
  }];

  const DIRECTION_DEFINITIONS = [
    { id:'DIR-PLAN-SOLUTION', label:'Plan A Solution Or Workflow', description:'solution/workflow planning', sources:['planning/direction-registry.md','planning/documentation/application-planning/direction-registry.md','planning/documentation/application-planning/use-case-registry.md'], instruction:'Establish this Direction as current context. Explain optional topology and the relevant Use Cases. Do not execute every branch automatically.', target:'<solution or workflow target>' },
    { id:'DIR-DETAILED-SDS', label:'Perform Detailed Scenario/Domain/Slice Planning', description:'profile-limited detailed planning', sources:['planning/direction-registry.md','planning/documentation/application-planning/direction-registry.md','planning/documentation/application-planning/use-case-registry.md','planning/documentation/profiles/scenario-domain-slice-docs-profile.md'], instruction:'Establish this profile-limited Direction. Explain Scenario/Domain/Slice topology and current owner boundaries. Do not invent prototype-depth methodology.', target:'<scenario/domain/slice target>' },
    { id:'DIR-MAINTAIN-DOCS-ROUTES', label:'Maintain Documentation, Use Cases And Commands', description:'documentation and routing', sources:['planning/direction-registry.md','planning/documentation/direction-and-use-case-registry-workflow.md','planning/planning-use-case-map.md'], instruction:'Establish documentation/registry/command maintenance context and keep registries, UCM, command definitions, workflows, templates and projection authority distinct.', target:'<documentation or routing target>' },
    { id:'DIR-DOCUMENTATION-WORKBENCH', label:'Develop And Maintain Documentation Workbench', description:'project-local product direction', sources:['planning/direction-registry.md','planning/areas/documentation-workbench/direction-registry.md','planning/areas/documentation-workbench/use-case-registry.md','planning/areas/documentation-workbench/planning-draft.md'], instruction:'Establish the Documentation Workbench Direction, current Planning Draft, accepted workflows, proposed Linked Notes workflow and deferred model boundary. Do not claim runtime implementation or accept pending item transitions.', target:'<Documentation Workbench target>' }
  ];

  const USE_CASE_DEFINITIONS = [
    { id:'UC-AP-REALITY', label:'Understand Current Workflow And Reality', description:'current reality capture', sources:['planning/documentation/application-planning/use-case-registry.md','planning/documentation/application-planning/application-planning-drafting-workflow.md'], instruction:'Establish descriptive current-reality context. Reconstruct actors, triggers, sequence, strengths, problems, risks, workarounds and unknowns without accepting future architecture.', target:'<current workflow/reality target>' },
    { id:'UC-AP-FORM-ITEMS', label:'Form Planning Items From Discussion', description:'open accepted form-items command', commandId:'planning_items.form' },
    { id:'UC-AP-FULL-PICTURE', label:'Build Or Review An Item-Backed Planning Draft', description:'item-backed planning synthesis', sources:['planning/documentation/application-planning/use-case-registry.md','planning/documentation/application-planning/application-planning-drafting-workflow.md','planning/documentation/application-planning/templates/PLANNING-DRAFT-TEMPLATE.md'], instruction:'Establish item-backed Planning Draft context. Require complete Key Scenarios and one Full Picture Matrix while preserving canonical item ownership and traceability.', target:'<Planning Draft target>' },
    { id:'UC-AP-RECONCILE', label:'Reconcile Planning Items', description:'open existing command', commandId:'planning_items.reconcile' },
    { id:'UC-AP-RESEARCH', label:'Research Existing Solutions And Alternative Workflows', description:'provisional proportional research', sources:['planning/documentation/application-planning/use-case-registry.md','planning/documentation/application-planning/application-planning-drafting-workflow.md'], instruction:'Establish provisional proportional research context. Compare checked options, coverage, strengths, limitations and disposition without creating an oversized specialized methodology.', target:'<solutions or alternative workflows to research>' },
    { id:'UC-AP-SCENARIO', label:'Draft Detailed Scenario', description:'profile-limited scenario', sources:['planning/documentation/application-planning/use-case-registry.md','planning/documentation/profiles/scenario-domain-slice-docs-profile.md'], instruction:'Establish detailed Scenario context using current profile and project-specific owners. Do not invent a new project command or prototype-depth method.', target:'<scenario target>' },
    { id:'UC-AP-DOMAIN', label:'Draft Or Review Domain', description:'profile-limited domain', sources:['planning/documentation/application-planning/use-case-registry.md','planning/documentation/profiles/scenario-domain-slice-docs-profile.md'], instruction:'Establish Domain review context for conceptual model, language and boundaries using current owners.', target:'<domain target>' },
    { id:'UC-AP-SLICE', label:'Plan Implementation Slice', description:'profile-limited slice', sources:['planning/documentation/application-planning/use-case-registry.md','planning/documentation/profiles/scenario-domain-slice-docs-profile.md'], instruction:'Establish Implementation Slice context for one separately deliverable/checkable increment aligned with accepted scenario/domain meaning.', target:'<slice target>' },
    { id:'UC-AP-SDS-CONSISTENCY', label:'Review Scenario/Domain/Slice Consistency', description:'cross-artifact consistency', sources:['planning/documentation/application-planning/use-case-registry.md','planning/documentation/profiles/scenario-domain-slice-docs-profile.md'], instruction:'Establish cross-artifact consistency review context and expose required upstream/downstream corrections.', target:'<scenario/domain/slice artifacts>' },
    { id:'UC-DW-DOC-REF', label:'Repository Documentation Change And Reference Review', description:'accepted Documentation Workbench End-To-End Workflow', sources:['planning/areas/documentation-workbench/use-case-registry.md','planning/areas/documentation-workbench/planning-draft.md','planning/areas/documentation-workbench/repository-documentation-change-and-reference-review-workflow.md'], instruction:'Establish the accepted repository documentation workflow. Keep stable navigation, explicit review-on-change meaning, bounded AI transfer and pending item clarifications distinct.', target:'<repository documentation/reference-review target>' },
    { id:'UC-DW-ITEM-FULL-PICTURE', label:'Planning Meaning To Repository', description:'accepted Documentation Workbench End-To-End Workflow', sources:['planning/areas/documentation-workbench/use-case-registry.md','planning/areas/documentation-workbench/planning-draft.md','planning/areas/documentation-workbench/planning-meaning-to-repository-workflow.md'], instruction:'Establish the full Planning Meaning To Repository workflow. Treat `сверь айтемы` as one read-only reconciliation stage rather than the whole use case.', target:'<planning meaning/repository handoff target>' },
    { id:'UC-DW-STRUCTURED-MESSAGE', label:'Structured User Message Composer', description:'supporting input capability', sources:['planning/areas/documentation-workbench/use-case-registry.md','planning/areas/documentation-workbench/planning-item-register.md','planning/planning-input-conventions.md'], instruction:'Establish structured-message composition context while preserving literal wording and free-form input. Do not make every fragment a Planning Item.', target:'<message/composition target>' }
  ];

  function markerFor(kind) {
    if (kind === 'orientation') return 'PLANNING_ORIENTATION';
    if (kind === 'direction') return 'PLANNING_DIRECTION';
    return 'PLANNING_USE_CASE';
  }

  function readRule(mode, kind) {
    if (mode === MODE.FULL) return [`Full ${kind} reading is required for this invocation.`, 'Read every listed source and the complete relevant owner route even if it was read earlier in this chat.', 'Read the relevant parent/root entry when needed.', 'Do not expand into unrelated repository families.', 'Full changes read depth only; it does not expand permissions.'];
    return [`Use current remembered ${kind} context only while it is clearly sufficient.`, 'Read the listed source and owner route when it was not read in this chat, is forgotten/uncertain, may have changed, or verification is requested.', 'Do not rely on this compact prompt when ownership, status or boundaries are uncertain.'];
  }

  function buildSemanticBody(kind, definition, mode) {
    const marker = markerFor(kind);
    const idField = kind === 'use_case' ? 'use_case_id' : `${kind}_id`;
    return [
      `[${marker}]`, `${idField}:`, `  ${definition.id}`, '', `${kind}:`, `  ${definition.label}`, '', 'mode:', `  ${mode}`, '', 'source_of_truth:',
      ...(definition.sources || []).map((source) => `  - \`${source}\``), '', 'read_rule:', ...readRule(mode, kind).map((line) => `  ${line}`), '', 'instruction:', `  ${definition.instruction}`, '', 'user_target:', `  ${definition.target}`, `[/${marker}]`
    ].join('\n');
  }

  function buildSemanticEntries() {
    return {
      [SURFACES.ORIENTATION]: ORIENTATION_DEFINITIONS.map((d) => ({ ...d, adaptiveBody: buildSemanticBody('orientation', d, MODE.ADAPTIVE), fullBody: buildSemanticBody('orientation', d, MODE.FULL) })),
      [SURFACES.DIRECTIONS]: DIRECTION_DEFINITIONS.map((d) => ({ ...d, adaptiveBody: buildSemanticBody('direction', d, MODE.ADAPTIVE), fullBody: buildSemanticBody('direction', d, MODE.FULL) })),
      [SURFACES.USE_CASES]: USE_CASE_DEFINITIONS.map((d) => d.commandId ? { ...d } : ({ ...d, adaptiveBody: buildSemanticBody('use_case', d, MODE.ADAPTIVE), fullBody: buildSemanticBody('use_case', d, MODE.FULL) }))
    };
  }

  return { SURFACES, ORIENTATION_DEFINITIONS, DIRECTION_DEFINITIONS, USE_CASE_DEFINITIONS, buildSemanticBody, buildSemanticEntries };
});

(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsPlanningHelper = Object.assign(root.ObsPlanningHelper || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const HELPER_LIBRARY_SCHEMA_VERSION = 1;
  const HELPER_LIBRARY_MARKER = 'PLANNING_HELPER_LIBRARY_ITEM';
  const HELPER_LIBRARY_ROOT = 'planning/helper-library';
  const HELPER_LIBRARY_KINDS = Object.freeze({ COMMAND:'command', PROMPT:'prompt' });
  const HELPER_LIBRARY_PATHS = Object.freeze({ command:`${HELPER_LIBRARY_ROOT}/commands`, prompt:`${HELPER_LIBRARY_ROOT}/prompts` });
  const HELPER_LIBRARY_SUFFIXES = Object.freeze({ command:'.helper-command.md', prompt:'.prompt.md' });
  const ID_PATTERN = /^[a-z0-9][a-z0-9._-]{0,79}$/;
  const LEGACY_LOCAL_STORAGE_KEY = 'obs-planning-helper-command-projections-v1';

  function assert(condition, message) { if (!condition) throw new TypeError(message); }
  function hashText(value) { let hash=2166136261; for (const ch of String(value || '')) { hash^=ch.codePointAt(0); hash=Math.imul(hash,16777619); } return (hash>>>0).toString(36); }
  function slugify(value) {
    const slug=String(value || '').normalize('NFKD').toLowerCase().replace(/[^a-z0-9._-]+/g,'-').replace(/^-+|-+$/g,'').slice(0,56);
    return slug || `item-${hashText(value)}`;
  }
  function makeHelperLibraryId(title, text='') { const base=slugify(title); const suffix=hashText(`${title}\n${text}`).slice(0,8); return `${base.slice(0,Math.max(1,79-suffix.length))}-${suffix}`.slice(0,80).replace(/-+$/,''); }
  function normalizeIso(value, fallback) { const text=String(value || '').trim(); if (!text) return fallback; const ms=Date.parse(text); assert(Number.isFinite(ms), `Invalid helper-library timestamp: ${text}`); return new Date(ms).toISOString(); }
  function normalizeKind(value) { const kind=String(value || '').trim(); assert(kind===HELPER_LIBRARY_KINDS.COMMAND || kind===HELPER_LIBRARY_KINDS.PROMPT, `Unsupported helper-library kind: ${kind || '<empty>'}`); return kind; }

  function normalizeHelperLibraryItem(value, options={}) {
    assert(value && typeof value==='object', 'Helper-library item must be an object.');
    const kind=normalizeKind(options.kind || value.kind);
    const title=String(value.title || '').trim();
    const text=String(value.text == null ? '' : value.text).replace(/\r\n?/g,'\n');
    assert(title.length>0 && title.length<=160, 'Helper-library title must contain 1..160 characters.');
    assert(!/[\r\n\u0000-\u001f\u007f]/.test(title), 'Helper-library title must be one printable line.');
    assert(text.trim().length>0 && text.length<=100000, 'Helper-library text must contain 1..100000 characters and cannot be whitespace-only.');
    const id=String(value.id || options.id || makeHelperLibraryId(title,text)).trim();
    assert(ID_PATTERN.test(id), `Invalid helper-library id: ${id || '<empty>'}`);
    const now=options.now || new Date().toISOString();
    const createdAt=normalizeIso(value.createdAt, now);
    const updatedAt=normalizeIso(value.updatedAt, now);
    return { schemaVersion:HELPER_LIBRARY_SCHEMA_VERSION, kind, id, title, text, createdAt, updatedAt };
  }

  function helperLibraryTargetPath(item) {
    const normalized=normalizeHelperLibraryItem(item);
    return `${HELPER_LIBRARY_PATHS[normalized.kind]}/${normalized.id}${HELPER_LIBRARY_SUFFIXES[normalized.kind]}`;
  }

  function helperLibraryFilePattern(kind) {
    const suffix=HELPER_LIBRARY_SUFFIXES[normalizeKind(kind)].replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
    return new RegExp(`^[a-z0-9][a-z0-9._-]{0,79}${suffix}$`);
  }

  function renderHelperLibraryDocument(item) {
    const normalized=normalizeHelperLibraryItem(item);
    const kindLabel=normalized.kind===HELPER_LIBRARY_KINDS.COMMAND?'Helper Command':'Prompt';
    return `# ${kindLabel} — ${normalized.title}\n\nStatus: active Planning Helper library item\nScope: exact insertion text; not planning-command authority.\n\n[${HELPER_LIBRARY_MARKER}]\n${JSON.stringify(normalized,null,2)}\n[/${HELPER_LIBRARY_MARKER}]\n`;
  }

  function extractMarker(text) {
    const source=String(text || '').replace(/\r\n?/g,'\n');
    const open=`[${HELPER_LIBRARY_MARKER}]`, close=`[/${HELPER_LIBRARY_MARKER}]`;
    const lines=source.split('\n');
    const opens=[], closes=[];
    for(let index=0;index<lines.length;index++){
      if(lines[index]===open)opens.push(index);
      if(lines[index]===close)closes.push(index);
    }
    assert(opens.length===1 && closes.length===1 && closes[0]>opens[0], 'Helper-library document must contain exactly one line-delimited marker block.');
    return lines.slice(opens[0]+1,closes[0]).join('\n').trim();
  }

  function parseHelperLibraryDocument(text, options={}) {
    let parsed; try { parsed=JSON.parse(extractMarker(text)); } catch (error) { throw new TypeError(`Invalid helper-library JSON: ${error.message}`); }
    const allowed=new Set(['schemaVersion','kind','id','title','text','createdAt','updatedAt']);
    for (const key of Object.keys(parsed || {})) assert(allowed.has(key), `Unsupported helper-library field: ${key}`);
    assert(parsed.schemaVersion===HELPER_LIBRARY_SCHEMA_VERSION, `Unsupported helper-library schemaVersion: ${parsed.schemaVersion}`);
    const item=normalizeHelperLibraryItem(parsed, options.kind ? {kind:options.kind} : {});
    if (options.path) assert(String(options.path)===helperLibraryTargetPath(item), `Helper-library document path does not match item id/kind: ${options.path}`);
    return item;
  }

  function normalizeHelperLibraryCollection(items) {
    assert(Array.isArray(items), 'Helper-library collection must be an array.');
    const result=items.map((item)=>normalizeHelperLibraryItem(item));
    const seen=new Set();
    for (const item of result) { const key=`${item.kind}:${item.id}`; assert(!seen.has(key), `Duplicate helper-library item: ${key}`); seen.add(key); }
    return result;
  }

  function planningCommandProjectionText(value) {
    const command=String(value.command || '').trim();
    const englishName=String(value.englishName || '').trim();
    const family=String(value.family || '').trim();
    const target=String(value.target || '').trim();
    const reminders=Array.isArray(value.reminders)?value.reminders.map((item)=>String(item).trim()).filter(Boolean):[];
    assert(command && englishName && family && target && reminders.length, 'Legacy local command projection is incomplete.');
    assert(family.includes(command), 'Legacy local command family does not include its canonical command.');
    return [
      '[PLANNING_COMMAND]',
      'Read this whole command body before answering.',
      'Do not ignore `key_reminders`.',
      '', 'command:', `  ${command}`,
      '', 'english_name:', `  ${englishName}`,
      '', 'command_family:', `  ${family}`,
      '', 'source_of_truth:', '  Start from `planning/planning-use-case-map.md`.', '  Then follow the currently registered command route and linked owner files.',
      '', 'route_read_rule:', '  Read or reread the route when it is not current, remembered or certain.', '  Do not rely only on this compact local projection when command behavior is uncertain.',
      '', 'key_reminders:', ...reminders.map((item)=>`  - ${item}`),
      '', 'user_target:', `  ${target}`,
      '', '[/PLANNING_COMMAND]'
    ].join('\n');
  }

  function legacyProjectionToHelperItem(value, options={}) {
    const text=planningCommandProjectionText(value);
    const title=String(value.englishName || value.command || 'Local command').trim();
    const legacyId=String(value.id || '').trim();
    const id=ID_PATTERN.test(legacyId)?legacyId:makeHelperLibraryId(title,text);
    return normalizeHelperLibraryItem({ kind:HELPER_LIBRARY_KINDS.COMMAND, id, title, text, createdAt:value.createdAt, updatedAt:value.updatedAt }, { now:options.now });
  }

  function parseLegacyProjectionRegistry(raw, options={}) {
    if (!raw) return [];
    let parsed; try { parsed=typeof raw==='string'?JSON.parse(raw):raw; } catch (error) { throw new TypeError(`Legacy local command registry is invalid JSON: ${error.message}`); }
    assert(parsed && parsed.schemaVersion===1 && Array.isArray(parsed.commands), 'Unsupported legacy local command registry schema.');
    return normalizeHelperLibraryCollection(parsed.commands.map((item)=>legacyProjectionToHelperItem(item,options)));
  }

  function mergeHelperLibrary(remoteItems, localItems) {
    const remote=normalizeHelperLibraryCollection(remoteItems || []), local=normalizeHelperLibraryCollection(localItems || []);
    const byKey=new Map();
    for (const item of remote) byKey.set(`${item.kind}:${item.id}`, { ...item, source:'repo', hasRepo:true, hasLocal:false });
    for (const item of local) {
      const key=`${item.kind}:${item.id}`, previous=byKey.get(key);
      byKey.set(key,{ ...item, source:previous?'local+repo':'local', hasRepo:Boolean(previous), hasLocal:true });
    }
    return [...byKey.values()].sort((a,b)=>a.kind.localeCompare(b.kind)||a.title.localeCompare(b.title)||a.id.localeCompare(b.id));
  }

  return { HELPER_LIBRARY_SCHEMA_VERSION, HELPER_LIBRARY_MARKER, HELPER_LIBRARY_ROOT, HELPER_LIBRARY_KINDS, HELPER_LIBRARY_PATHS, HELPER_LIBRARY_SUFFIXES, LEGACY_LOCAL_STORAGE_KEY, makeHelperLibraryId, normalizeHelperLibraryItem, normalizeHelperLibraryCollection, helperLibraryTargetPath, helperLibraryFilePattern, renderHelperLibraryDocument, parseHelperLibraryDocument, legacyProjectionToHelperItem, parseLegacyProjectionRegistry, mergeHelperLibrary };
});

(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsPlanningHelper = Object.assign(root.ObsPlanningHelper || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  class GitHubClientError extends Error {
    constructor(kind, message, details = {}) { super(message); this.name = 'GitHubClientError'; this.kind = kind; this.status = details.status || 0; this.details = details; }
  }

  function normalizeGitHubContentPath(value) {
    const text = String(value == null ? '' : value).replace(/\\/g, '/').trim();
    if (!text) throw new TypeError('GitHub content path is required.');
    if (/^[a-zA-Z]:\//.test(text) || text.startsWith('/') || text.startsWith('//') || text.includes('://') || /[?#]/.test(text)) throw new TypeError('GitHub content path must be repository-relative.');
    const parts = text.split('/');
    if (parts.some((part) => !part || part === '.' || part === '..')) throw new TypeError('GitHub content path contains an invalid segment.');
    return parts.join('/');
  }

  function utf8ToBase64(text) {
    const bytes = new TextEncoder().encode(String(text));
    let binary = '';
    for (let i = 0; i < bytes.length; i += 0x8000) binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
    if (typeof btoa === 'function') return btoa(binary);
    if (typeof Buffer !== 'undefined') return Buffer.from(bytes).toString('base64');
    throw new Error('No base64 encoder available.');
  }

  function base64ToUtf8(value) {
    const compact = String(value || '').replace(/\s+/g, '');
    let bytes;
    if (typeof atob === 'function') bytes = Uint8Array.from(atob(compact), (char) => char.charCodeAt(0));
    else if (typeof Buffer !== 'undefined') bytes = Uint8Array.from(Buffer.from(compact, 'base64'));
    else throw new Error('No base64 decoder available.');
    try { return new TextDecoder('utf-8', { fatal:true }).decode(bytes); }
    catch (error) { throw new GitHubClientError('invalid_utf8', 'Repository text is not valid UTF-8.', { cause:error }); }
  }

  function statusKind(status) {
    if (status === 401) return 'auth'; if (status === 403) return 'permission'; if (status === 404) return 'not_found'; if (status === 409 || status === 422) return 'conflict'; if (status >= 500) return 'remote_failure'; return 'request_failed';
  }

  function createGmTransport(gmRequest) {
    if (typeof gmRequest !== 'function') throw new TypeError('GM_xmlhttpRequest is required.');
    return (request) => new Promise((resolve, reject) => gmRequest({
      method: request.method, url: request.url, headers: request.headers, data: request.body, timeout: request.timeoutMs || 20000,
      onload: (response) => resolve({ status: response.status, text: response.responseText || '' }),
      ontimeout: () => reject(new GitHubClientError('network_unknown', 'GitHub request timed out; remote state must be read before retrying.')),
      onerror: (error) => reject(new GitHubClientError('network_unknown', 'GitHub request failed; remote state may be unknown.', { cause: error })),
      onabort: () => reject(new GitHubClientError('network_unknown', 'GitHub request aborted; remote state may be unknown.'))
    }));
  }

  class GitHubContentsClient {
    constructor(options = {}) {
      this.owner = String(options.owner || '').trim(); this.repo = String(options.repo || '').trim(); this.branch = String(options.branch || 'main').trim(); this.token = String(options.token || '').trim(); this.transport = options.transport; this.apiBase = String(options.apiBase || 'https://api.github.com').replace(/\/$/, '');
      if (!this.owner || !this.repo || !this.branch) throw new TypeError('GitHub owner, repo and branch are required.');
      if (typeof this.transport !== 'function') throw new TypeError('GitHub transport is required.');
    }
    _url(path, withRef = true) { const normalized = normalizeGitHubContentPath(path); const encoded = normalized.split('/').map(encodeURIComponent).join('/'); return `${this.apiBase}/repos/${encodeURIComponent(this.owner)}/${encodeURIComponent(this.repo)}/contents/${encoded}${withRef ? `?ref=${encodeURIComponent(this.branch)}` : ''}`; }
    _headers() { const headers = { Accept:'application/vnd.github+json', 'X-GitHub-Api-Version':'2022-11-28' }; if (this.token) headers.Authorization = `Bearer ${this.token}`; return headers; }
    async _request(method, url, body) {
      let response;
      try { response = await this.transport({ method, url, headers:{ ...this._headers(), ...(body ? {'Content-Type':'application/json'} : {}) }, body: body ? JSON.stringify(body) : undefined, timeoutMs:20000 }); }
      catch (error) { if (error instanceof GitHubClientError) throw error; throw new GitHubClientError('network_unknown', error && error.message ? error.message : 'GitHub network request failed.', { cause:error }); }
      let payload = null; try { payload = response.text ? JSON.parse(response.text) : null; } catch (error) { throw new GitHubClientError('invalid_response', `GitHub returned invalid JSON: ${error.message}`); }
      if (response.status < 200 || response.status >= 300) throw new GitHubClientError(statusKind(response.status), payload && payload.message ? payload.message : `GitHub request failed with status ${response.status}.`, { status:response.status, payload });
      return payload;
    }
    async listDirectory(path) {
      const normalized = normalizeGitHubContentPath(path); const payload = await this._request('GET', this._url(normalized, true)); if (!Array.isArray(payload)) throw new GitHubClientError('invalid_response','GitHub Contents response is not a directory listing.');
      if (payload.length > 200) throw new GitHubClientError('limit_exceeded', 'GitHub directory contains more than 200 direct entries.');
      return payload.map((entry) => { const entryPath=normalizeGitHubContentPath(entry.path); if (!entryPath.startsWith(`${normalized}/`) || entryPath.slice(normalized.length+1).includes('/')) throw new GitHubClientError('invalid_response','GitHub directory returned an entry outside the requested direct-child scope.'); return { type:String(entry.type || ''), path:entryPath, name:String(entry.name || ''), sha:String(entry.sha || ''), size:Number(entry.size || 0), htmlUrl:String(entry.html_url || '') }; });
    }
    async read(path) {
      const normalized = normalizeGitHubContentPath(path); const payload = await this._request('GET', this._url(normalized, true)); if (!payload || payload.type !== 'file' || typeof payload.content !== 'string') throw new GitHubClientError('invalid_response','GitHub Contents response is not a UTF-8 file.');
      return { path:normalizeGitHubContentPath(payload.path || normalized), sha:String(payload.sha || ''), content:base64ToUtf8(payload.content), htmlUrl:String(payload.html_url || '') };
    }
    async write({ path, content, baseSha = '', message }) {
      const normalized = normalizeGitHubContentPath(path); const body = { message:String(message || `Update ${normalized}`), content:utf8ToBase64(content), branch:this.branch }; if (baseSha) body.sha = baseSha;
      const payload = await this._request('PUT', this._url(normalized, false), body); return { path:normalizeGitHubContentPath(payload && payload.content ? payload.content.path : normalized), sha:String(payload && payload.content ? payload.content.sha || '' : ''), htmlUrl:String(payload && payload.content ? payload.content.html_url || '' : '') };
    }
    async saveVerified({ path, content, baseSha = '', message }) {
      const normalized = normalizeGitHubContentPath(path); let writeResult;
      try { writeResult = await this.write({ path:normalized, content, baseSha, message }); }
      catch (error) {
        if (!(error instanceof GitHubClientError) || error.kind !== 'network_unknown') throw error;
        try { const after = await this.read(normalized); if (after.content === content) return { ...after, recoveredAfterUnknownWrite:true }; } catch (_) {}
        throw error;
      }
      let readBack; try { readBack = await this.read(normalized); } catch (error) { throw new GitHubClientError('verification_unknown','GitHub accepted the write, but read-back verification failed.', { cause:error, writeResult }); }
      if (readBack.content !== content) throw new GitHubClientError('verification_mismatch','Remote read-back content does not match the intended repository file.', { writeResult });
      return { ...readBack, recoveredAfterUnknownWrite:false };
    }
  }

  return { GitHubClientError, GitHubContentsClient, createGmTransport, normalizeGitHubContentPath, utf8ToBase64, base64ToUtf8, statusKind };
});

(function (root, factory) {
  const api = factory(root.ObsPlanningHelper || (typeof require === 'function' ? Object.assign({}, require('./command-definition-codec.js'), require('./command-catalog.js')) : {}));
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsPlanningHelper = Object.assign(root.ObsPlanningHelper || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function (deps) {
  'use strict';
  const COMMANDS_PATH = deps.COMMANDS_PATH || 'planning/commands';
  const COMMAND_FILE_PATTERN = /^[a-z0-9][a-z0-9._-]*\.command\.md$/;

  function conflict(message) { const error = new Error(message); error.kind = 'conflict'; return error; }
  function sameSnapshot(left, right) { return JSON.stringify(left) === JSON.stringify(right); }
  function repositorySourceKey(identity) { return `${identity.owner.toLowerCase()}/${identity.repo.toLowerCase()}@${identity.branch}`; }

  class RepositoryCommandService {
    constructor(client, options = {}) {
      this.client = client;
      this.commandsPath = options.commandsPath || COMMANDS_PATH;
      if (this.commandsPath !== COMMANDS_PATH) throw new TypeError(`Command writes are confined to ${COMMANDS_PATH}.`);
    }
    _target(file) { if (!COMMAND_FILE_PATTERN.test(String(file || ''))) throw new TypeError('Invalid command filename.'); return `${this.commandsPath}/${file}`; }
    _repositoryIdentity() {
      const identity={ owner:String(this.client?.owner || '').trim(), repo:String(this.client?.repo || '').trim(), branch:String(this.client?.branch || '').trim() };
      if (!identity.owner || !identity.repo || !identity.branch) throw new TypeError('Repository client identity is incomplete.');
      return { ...identity, sourceKey:repositorySourceKey(identity) };
    }
    _normalizeRepositoryIdentity(value) {
      if (!value || typeof value!=='object') throw new TypeError('Preview plan is missing repository identity.');
      const identity={ owner:String(value.owner || '').trim(), repo:String(value.repo || '').trim(), branch:String(value.branch || '').trim() };
      if (!identity.owner || !identity.repo || !identity.branch) throw new TypeError('Preview repository identity is incomplete.');
      const sourceKey=repositorySourceKey(identity);
      if (String(value.sourceKey || '') !== sourceKey) throw new TypeError('Preview repository source key does not match its owner/repository/branch identity.');
      return { ...identity, sourceKey };
    }
    _snapshotFromDefinitions(definitions) { return (definitions || []).map((definition) => ({ path:definition.__path || this._target(definition.file), sha:String(definition.__sha || '') })).sort((a,b) => a.path.localeCompare(b.path)); }
    async _readCatalogSnapshot() { const entries=await this.client.listDirectory(this.commandsPath); return entries.filter((entry)=>entry.type==='file'&&COMMAND_FILE_PATTERN.test(entry.name)).map((entry)=>({path:entry.path,sha:String(entry.sha||'')})).sort((a,b)=>a.path.localeCompare(b.path)); }
    async loadCatalog(options = {}) {
      const entries = await this.client.listDirectory(this.commandsPath);
      const commandFiles = entries.filter((entry) => entry.type === 'file' && COMMAND_FILE_PATTERN.test(entry.name)).sort((a,b) => a.name.localeCompare(b.name));
      const definitions = [];
      for (const entry of commandFiles) {
        const file = await this.client.read(entry.path);
        const definition = deps.parseCommandDefinitionDocument(file.content, { path:entry.path });
        definitions.push({ ...definition, __sha:file.sha, __path:entry.path });
      }
      deps.validateCommandCatalog(definitions);
      if (!definitions.length && !options.allowEmpty) throw new TypeError('Repository command catalog contains no direct .command.md definitions.');
      return definitions;
    }
    async _validateReferencedOwners(incoming) {
      const paths = new Set();
      for (const definition of incoming || []) for (const path of deps.commandReferencePaths(definition)) paths.add(path);
      for (const path of [...paths].sort()) await this.client.read(path);
    }
    _normalizePreviewPlan(plan) {
      if (!plan || typeof plan !== 'object' || !Array.isArray(plan.items) || !Array.isArray(plan.catalogSnapshot)) throw new TypeError('A repository command Preview plan is required before Save.');
      if (!plan.items.length) throw new TypeError('Preview plan contains no command definitions.');
      const repository=this._normalizeRepositoryIdentity(plan.repository);
      const items = plan.items.map((item, index) => {
        if (!item || typeof item !== 'object') throw new TypeError(`Preview item ${index} is invalid.`);
        const definition = deps.normalizeCommandDefinition(item.definition);
        const path = this._target(definition.file);
        if (String(item.path || '') !== path) throw new TypeError(`Preview target changed for ${definition.file}. Run Parse & Preview again.`);
        const action = String(item.action || '');
        const baseSha = String(item.baseSha || '');
        if (action === 'create' && baseSha) throw new TypeError(`Create preview unexpectedly contains a base SHA for ${path}.`);
        if (action === 'update' && !baseSha) throw new TypeError(`Update preview is missing its base SHA for ${path}.`);
        if (action !== 'create' && action !== 'update') throw new TypeError(`Unknown preview action for ${path}.`);
        return { definition, path, action, baseSha };
      });
      deps.validateCommandCatalog(items.map((item) => item.definition));
      if (new Set(items.map((item) => item.path)).size !== items.length) throw new TypeError('Preview plan contains duplicate command targets.');
      const catalogSnapshot = plan.catalogSnapshot.map((item, index) => {
        if (!item || typeof item !== 'object') throw new TypeError(`Catalog snapshot item ${index} is invalid.`);
        const path = String(item.path || '');
        const prefix = `${this.commandsPath}/`;
        const file = path.startsWith(prefix) ? path.slice(prefix.length) : '';
        if (!COMMAND_FILE_PATTERN.test(file) || path !== this._target(file)) throw new TypeError(`Catalog snapshot contains an invalid command path: ${path || '<empty>'}.`);
        const sha = String(item.sha || '');
        if (!sha) throw new TypeError(`Catalog snapshot is missing SHA for ${path}.`);
        return { path, sha };
      }).sort((a,b) => a.path.localeCompare(b.path));
      if (new Set(catalogSnapshot.map((item) => item.path)).size !== catalogSnapshot.length) throw new TypeError('Catalog snapshot contains duplicate command paths.');
      return { repository, items, catalogSnapshot };
    }
    async previewDefinitions(incoming) {
      deps.validateCommandCatalog(incoming);
      const current = await this.loadCatalog({ allowEmpty:true });
      const currentByFile = new Map(current.map((definition) => [definition.file, definition]));
      const merged = deps.replaceDefinitionsByFile(current, incoming);
      deps.validateCommandCatalog(merged);
      await this._validateReferencedOwners(incoming);
      return {
        repository:this._repositoryIdentity(),
        items: incoming.map((definition) => ({ definition, path:this._target(definition.file), action:currentByFile.has(definition.file) ? 'update' : 'create', baseSha:currentByFile.get(definition.file)?.__sha || '' })),
        catalogSnapshot: this._snapshotFromDefinitions(current)
      };
    }
    async savePreviewPlan(plan) {
      const preview = this._normalizePreviewPlan(plan);
      const currentRepository=this._repositoryIdentity();
      if (currentRepository.sourceKey !== preview.repository.sourceKey) throw conflict(`Repository target changed since Preview (${preview.repository.sourceKey} -> ${currentRepository.sourceKey}). Nothing was written; run Parse & Preview again.`);
      await this._validateReferencedOwners(preview.items.map((item) => item.definition));
      const currentSnapshot = await this._readCatalogSnapshot();
      if (!sameSnapshot(currentSnapshot, preview.catalogSnapshot)) throw conflict('Repository command catalog changed since Preview. Nothing was written; run Parse & Preview again.');
      const results = [];
      for (const item of preview.items) {
        const content = deps.renderCommandDefinitionDocument(item.definition);
        try {
          const write = await this.client.saveVerified({ path:item.path, content, baseSha:item.baseSha, message:`${item.action === 'create' ? 'Add' : 'Update'} planning command ${item.definition.command}` });
          results.push({ ok:true, action:item.action, path:item.path, command:item.definition.command, sha:write.sha, recoveredAfterUnknownWrite:Boolean(write.recoveredAfterUnknownWrite) });
        } catch (error) {
          results.push({ ok:false, action:item.action, path:item.path, command:item.definition.command, error:error && error.message ? error.message : String(error), kind:error && error.kind ? error.kind : 'error' });
          return { ok:false, results, remaining:preview.items.slice(results.length).map((rest) => rest.path) };
        }
      }
      return { ok:true, results, remaining:[] };
    }
  }

  return { RepositoryCommandService, repositorySourceKey };
});

(function (root, factory) {
  const api = factory(root.ObsPlanningHelper || (typeof require === 'function' ? require('./helper-library-codec.js') : {}));
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsPlanningHelper = Object.assign(root.ObsPlanningHelper || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function (deps) {
  'use strict';

  function conflict(message){const error=new Error(message);error.kind='conflict';return error;}
  function sourceKey(identity){return `${identity.owner.toLowerCase()}/${identity.repo.toLowerCase()}@${identity.branch}`;}

  class RepositoryHelperLibraryService {
    constructor(client){this.client=client;}
    _identity(){const identity={owner:String(this.client?.owner||'').trim(),repo:String(this.client?.repo||'').trim(),branch:String(this.client?.branch||'').trim()};if(!identity.owner||!identity.repo||!identity.branch)throw new TypeError('Repository client identity is incomplete.');return{...identity,sourceKey:sourceKey(identity)};}
    _normalizeIdentity(value){if(!value||typeof value!=='object')throw new TypeError('Library preview is missing repository identity.');const identity={owner:String(value.owner||'').trim(),repo:String(value.repo||'').trim(),branch:String(value.branch||'').trim()};if(!identity.owner||!identity.repo||!identity.branch)throw new TypeError('Library preview repository identity is incomplete.');const key=sourceKey(identity);if(String(value.sourceKey||'')!==key)throw new TypeError('Library preview repository source key is invalid.');return{...identity,sourceKey:key};}
    async _list(kind){const path=deps.HELPER_LIBRARY_PATHS[kind];let entries;try{entries=await this.client.listDirectory(path);}catch(error){if(error?.kind==='not_found')return[];throw error;}const pattern=deps.helperLibraryFilePattern(kind);return entries.filter((entry)=>entry.type==='file'&&pattern.test(entry.name)).sort((a,b)=>a.name.localeCompare(b.name));}
    async loadKind(kind){const files=await this._list(kind);const result=[];for(const entry of files){const file=await this.client.read(entry.path);const item=deps.parseHelperLibraryDocument(file.content,{kind,path:entry.path});result.push({...item,__sha:file.sha,__path:entry.path});}return result;}
    async loadAll(){const commands=await this.loadKind(deps.HELPER_LIBRARY_KINDS.COMMAND);const prompts=await this.loadKind(deps.HELPER_LIBRARY_KINDS.PROMPT);return[...commands,...prompts];}
    async previewSave(value){const item=deps.normalizeHelperLibraryItem(value);const path=deps.helperLibraryTargetPath(item);let current=null;try{current=await this.client.read(path);deps.parseHelperLibraryDocument(current.content,{kind:item.kind,path});}catch(error){if(error?.kind!=='not_found')throw error;current=null;}return{repository:this._identity(),item,path,action:current?'update':'create',baseSha:current?.sha||''};}
    _normalizePreview(plan){if(!plan||typeof plan!=='object')throw new TypeError('A helper-library Preview plan is required before Save.');const repository=this._normalizeIdentity(plan.repository);const item=deps.normalizeHelperLibraryItem(plan.item);const path=deps.helperLibraryTargetPath(item);if(String(plan.path||'')!==path)throw new TypeError('Helper-library target changed after Preview.');const action=String(plan.action||''),baseSha=String(plan.baseSha||'');if(action==='create'&&baseSha)throw new TypeError('Create helper-library preview unexpectedly contains a base SHA.');if(action==='update'&&!baseSha)throw new TypeError('Update helper-library preview is missing its base SHA.');if(action!=='create'&&action!=='update')throw new TypeError('Unknown helper-library preview action.');return{repository,item,path,action,baseSha};}
    async savePreviewPlan(plan){const preview=this._normalizePreview(plan);const identity=this._identity();if(identity.sourceKey!==preview.repository.sourceKey)throw conflict(`Repository target changed since Preview (${preview.repository.sourceKey} -> ${identity.sourceKey}). Nothing was written; preview again.`);let current=null;try{current=await this.client.read(preview.path);}catch(error){if(error?.kind!=='not_found')throw error;}
      if(preview.action==='create'&&current)throw conflict(`Repository helper-library item appeared after Preview: ${preview.path}. Nothing was written; preview again.`);
      if(preview.action==='update'&&(!current||current.sha!==preview.baseSha))throw conflict(`Repository helper-library item changed after Preview: ${preview.path}. Nothing was written; preview again.`);
      if(current)deps.parseHelperLibraryDocument(current.content,{kind:preview.item.kind,path:preview.path});
      const content=deps.renderHelperLibraryDocument(preview.item);const write=await this.client.saveVerified({path:preview.path,content,baseSha:preview.baseSha,message:`${preview.action==='create'?'Add':'Update'} Planning Helper ${preview.item.kind} ${preview.item.title}`});return{ok:true,action:preview.action,path:preview.path,sha:write.sha,item:preview.item,recoveredAfterUnknownWrite:Boolean(write.recoveredAfterUnknownWrite)};
    }
  }

  return { RepositoryHelperLibraryService, helperLibraryRepositorySourceKey:sourceKey };
});

(function (root, factory) {
  const api = factory(root.ObsPlanningHelper || (typeof require === 'function' ? require('./helper-library-codec.js') : {}));
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsPlanningHelper = Object.assign(root.ObsPlanningHelper || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function (deps) {
  'use strict';

  const KEYS = Object.freeze({
    settings:'obsPlanningHelper:v1:repositorySettings',
    token:'obsPlanningHelper:v1:githubToken',
    cache:'obsPlanningHelper:v1:commandCatalogCache',
    localLibrary:'obsPlanningHelper:v1:localLibrary',
    repositoryLibraryCache:'obsPlanningHelper:v1:repositoryLibraryCache'
  });
  const POSITION_KEY='obs-planning-helper-position-v2';
  const DEFAULT_SETTINGS=Object.freeze({owner:'AlexPastukhh',repo:'obs-planning-docs',branch:'main'});

  function gmGetFn(){return typeof GM_getValue==='function'?GM_getValue:null;}
  function gmSetFn(){return typeof GM_setValue==='function'?GM_setValue:null;}
  async function gmGet(key,fallback){const fn=gmGetFn();return fn?await fn(key,fallback):fallback;}
  async function gmSet(key,value){const fn=gmSetFn();if(!fn)throw new Error('Tampermonkey GM_setValue is unavailable; reinstall the generated Planning Helper userscript and accept its GM grants.');await fn(key,value);}

  function normalizeSettings(value){const input=value&&typeof value==='object'?value:{};return{owner:String(input.owner==null?'':input.owner).trim(),repo:String(input.repo==null?'':input.repo).trim(),branch:String(input.branch==null?'':input.branch).trim()};}
  function validateRepositorySettings(value){const settings=normalizeSettings(value);if(!settings.owner||!settings.repo||!settings.branch)throw new TypeError('Owner, repository and branch are required and cannot be replaced by defaults when saving settings.');for(const[field,text]of Object.entries(settings)){if(/[\r\n\u0000-\u001f\u007f]/.test(text))throw new TypeError(`${field} contains unsafe control characters.`);}return settings;}
  function repositorySourceKey(settings){const value=validateRepositorySettings(settings);return`${value.owner.toLowerCase()}/${value.repo.toLowerCase()}@${value.branch}`;}
  async function loadRepositorySettings(){const stored=await gmGet(KEYS.settings,null);return stored==null?{...DEFAULT_SETTINGS}:validateRepositorySettings(stored);}
  async function saveRepositorySettings(settings){const value=validateRepositorySettings(settings);await gmSet(KEYS.settings,value);return value;}
  async function loadGitHubToken(){return String(await gmGet(KEYS.token,'')||'').trim();}
  async function saveGitHubToken(token){const value=String(token||'').trim();await gmSet(KEYS.token,value);return Boolean(value);}
  async function loadCommandCatalogCache(settings){const value=await gmGet(KEYS.cache,null);if(!value||typeof value!=='object'||value.schemaVersion!==1)return null;return value.sourceKey===repositorySourceKey(settings)?value:null;}
  async function saveCommandCatalogCache(definitions,settings){await gmSet(KEYS.cache,{schemaVersion:1,sourceKey:repositorySourceKey(settings),savedAt:new Date().toISOString(),definitions});}

  async function loadLocalHelperLibrary(){const value=await gmGet(KEYS.localLibrary,null);if(value==null)return[];if(!value||value.schemaVersion!==1||!Array.isArray(value.items))throw new TypeError('Unsupported Planning Helper local-library schema.');return deps.normalizeHelperLibraryCollection(value.items);}
  async function saveLocalHelperLibrary(items){const normalized=deps.normalizeHelperLibraryCollection(items);const payload={schemaVersion:1,items:normalized};await gmSet(KEYS.localLibrary,payload);const checked=await gmGet(KEYS.localLibrary,null);if(!checked||checked.schemaVersion!==1||JSON.stringify(checked.items)!==JSON.stringify(normalized))throw new Error('Planning Helper local-library write-back verification failed.');return normalized;}
  async function upsertLocalHelperLibraryItem(value){const item=deps.normalizeHelperLibraryItem(value);const current=await loadLocalHelperLibrary();const key=`${item.kind}:${item.id}`;const next=[...current.filter((entry)=>`${entry.kind}:${entry.id}`!==key),item];return{item,items:await saveLocalHelperLibrary(next)};}
  async function removeLocalHelperLibraryItem(kind,id){const current=await loadLocalHelperLibrary();const key=`${kind}:${id}`;const next=current.filter((entry)=>`${entry.kind}:${entry.id}`!==key);return saveLocalHelperLibrary(next);}
  async function loadRepositoryHelperLibraryCache(settings){const value=await gmGet(KEYS.repositoryLibraryCache,null);if(!value||value.schemaVersion!==1||!Array.isArray(value.items)||value.sourceKey!==repositorySourceKey(settings))return null;return{...value,items:deps.normalizeHelperLibraryCollection(value.items)};}
  async function saveRepositoryHelperLibraryCache(items,settings){const normalized=deps.normalizeHelperLibraryCollection(items.map((item)=>{const copy={...item};delete copy.__sha;delete copy.__path;return copy;}));await gmSet(KEYS.repositoryLibraryCache,{schemaVersion:1,sourceKey:repositorySourceKey(settings),savedAt:new Date().toISOString(),items:normalized});}

  async function migrateLegacyLocalCommandProjections(){let raw='';try{raw=typeof localStorage!=='undefined'?localStorage.getItem(deps.LEGACY_LOCAL_STORAGE_KEY)||'':'';}catch(_){}if(!raw)return{added:0,warning:null};let legacy;try{legacy=deps.parseLegacyProjectionRegistry(raw);}catch(error){return{added:0,warning:`Legacy local commands were not migrated: ${error.message||String(error)}`};}if(!legacy.length)return{added:0,warning:null};const current=await loadLocalHelperLibrary();const keys=new Set(current.map((item)=>`${item.kind}:${item.id}`));const additions=legacy.filter((item)=>!keys.has(`${item.kind}:${item.id}`));if(additions.length)await saveLocalHelperLibrary([...current,...additions]);return{added:additions.length,warning:null};}

  function readPanelPosition(){try{const parsed=JSON.parse(localStorage.getItem(POSITION_KEY)||'{}');return{left:Number.isFinite(parsed.left)?parsed.left:null,top:Number.isFinite(parsed.top)?parsed.top:null};}catch(_){return{left:null,top:null};}}
  function savePanelPosition(position){try{localStorage.setItem(POSITION_KEY,JSON.stringify({left:position.left,top:position.top}));}catch(_){}}

  return { PLANNING_HELPER_STATE_KEYS:KEYS, PLANNING_HELPER_DEFAULT_SETTINGS:DEFAULT_SETTINGS, normalizeSettings, validateRepositorySettings, repositorySourceKey, loadRepositorySettings, saveRepositorySettings, loadGitHubToken, saveGitHubToken, loadCommandCatalogCache, saveCommandCatalogCache, loadLocalHelperLibrary, saveLocalHelperLibrary, upsertLocalHelperLibraryItem, removeLocalHelperLibraryItem, loadRepositoryHelperLibraryCache, saveRepositoryHelperLibraryCache, migrateLegacyLocalCommandProjections, readPanelPosition, savePanelPosition };
});

(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsPlanningHelper = Object.assign(root.ObsPlanningHelper || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  function isVisibleComposer(element) { return Boolean(element && element.getClientRects().length > 0 && !element.hasAttribute('disabled')); }
  function findComposer(doc = document) {
    for (const selector of ['#prompt-textarea[contenteditable="true"]','[data-testid="composer-textarea"][contenteditable="true"]','textarea[data-testid="composer-textarea"]']) {
      const element=doc.querySelector(selector); if (isVisibleComposer(element)) return { element, selector, fallback:false };
    }
    for (const selector of ['textarea[placeholder]','[contenteditable="true"][role="textbox"]']) {
      for (const element of doc.querySelectorAll(selector)) if (isVisibleComposer(element)) return { element, selector, fallback:true };
    }
    return { element:null, selector:null, fallback:true };
  }
  function getComposerText(element) { if (typeof HTMLTextAreaElement !== 'undefined' && (element instanceof HTMLTextAreaElement || element instanceof HTMLInputElement)) return element.value || ''; return element.textContent || ''; }
  function moveCaretToEnd(element) { const selection=window.getSelection(); if (!selection) return; const range=document.createRange(); range.selectNodeContents(element); range.collapse(false); selection.removeAllRanges(); selection.addRange(range); }
  function dispatchInputEvent(element, data) { try { element.dispatchEvent(new InputEvent('input',{bubbles:true,composed:true,inputType:'insertText',data})); } catch (_) { element.dispatchEvent(new Event('input',{bubbles:true,composed:true})); } }
  function diagnostic(startedAt, foundAt, readAt, finishedAt, found, commandId, current, text, ok, reason) {
    console.debug('[OBS Planning Helper insertion]',{
      commandId,ok,reason,selector:found.selector,fallbackSelector:found.fallback,draftLength:current.length,bodyLength:text.length,
      findMs:Number((foundAt-startedAt).toFixed(2)),readMs:Number((readAt-foundAt).toFixed(2)),insertMs:Number((finishedAt-readAt).toFixed(2)),totalMs:Number((finishedAt-startedAt).toFixed(2))
    });
  }
  function insertIntoComposer(text, commandId=null) {
    const startedAt=performance.now(); const found=findComposer(); const foundAt=performance.now(); const composer=found.element;
    if (!composer) { console.debug('[OBS Planning Helper insertion]',{commandId,ok:false,reason:'composer-not-found',findMs:Number((foundAt-startedAt).toFixed(2)),bodyLength:text.length}); return {ok:false,reason:'composer-not-found'}; }
    let current=''; let readAt=foundAt;
    try {
      composer.focus(); current=getComposerText(composer); readAt=performance.now(); const hasText=current.trim().length>0; const addition=hasText?`\n\n${text}`:text;
      if (typeof HTMLTextAreaElement !== 'undefined' && (composer instanceof HTMLTextAreaElement || composer instanceof HTMLInputElement)) {
        const next=hasText?`${current}\n\n${text}`:text; const proto=composer instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype; const setter=Object.getOwnPropertyDescriptor(proto,'value')?.set; if (setter) setter.call(composer,next); else composer.value=next; dispatchInputEvent(composer,addition);
      } else {
        moveCaretToEnd(composer); let inserted=false; try { inserted=document.execCommand('insertText',false,addition); } catch (_) { inserted=false; }
        if (!inserted) { const rejectedAt=performance.now(); diagnostic(startedAt,foundAt,readAt,rejectedAt,found,commandId,current,text,false,'contenteditable-insert-rejected'); return {ok:false,reason:'contenteditable-insert-rejected'}; }
      }
      const finishedAt=performance.now(); diagnostic(startedAt,foundAt,readAt,finishedAt,found,commandId,current,text,true,undefined); return {ok:true};
    } catch (error) {
      const failedAt=performance.now(); diagnostic(startedAt,foundAt,readAt,failedAt,found,commandId,current,text,false,error instanceof Error ? error.message : String(error)); return {ok:false,reason:'composer-mutation-failed',error};
    }
  }
  async function copyText(text) {
    try { await navigator.clipboard.writeText(text); return true; }
    catch (_) { const textarea=document.createElement('textarea'); textarea.value=text; textarea.style.position='fixed'; textarea.style.opacity='0'; document.body.appendChild(textarea); textarea.select(); let copied=false; try { copied=document.execCommand('copy'); } finally { textarea.remove(); } return copied; }
  }
  return { isVisibleComposer, findComposer, getComposerText, insertIntoComposer, copyText };
});

(function (root, factory) {
  const api = factory(root.ObsPlanningHelper || {});
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsPlanningHelper = Object.assign(root.ObsPlanningHelper || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function (deps) {
  'use strict';

  const HOST_ID='obs-planning-helper-host';

  function createPlanningHelperUi(options={}) {
    const SURFACES=options.surfaces||deps.SURFACES;
    document.getElementById(HOST_ID)?.remove();document.getElementById('obs-command-helper-host')?.remove();
    const host=document.createElement('div');host.id=HOST_ID;document.documentElement.appendChild(host);const root=host.attachShadow({mode:'open'});
    const saved=options.position||{left:null,top:null};let left=saved.left??Math.max(12,window.innerWidth-560);let top=saved.top??Math.max(12,window.innerHeight-760);
    let activeSurface=SURFACES.ORIENTATION;let commandEntries=[...(options.commandEntries||[])];let localCommandEntries=[...(options.localCommandEntries||[])];let promptEntries=[...(options.promptEntries||[])];const semanticEntries=options.semanticEntries||{};let focusCommandId=null;let activeOverlay=null;let isOpen=false;let dashboardOpen=document.documentElement.dataset.obsPlanningDashboardOpen==='true';let lastToggleToken=document.documentElement.dataset.obsPlanningCommandsToggle||'';let statusTimer=null;let insertionBusy=false;let repositoryBusy=false;let repositoryBusyLabel='';

    root.innerHTML=`<style>
:host{all:initial}*{box-sizing:border-box}button,input,textarea{font:inherit}.launcher{position:fixed;right:18px;bottom:22px;z-index:2147483647;border:1px solid rgba(148,163,184,.42);border-radius:999px;padding:9px 13px;background:#111827;color:#f8fafc;font:700 12px/1 system-ui,sans-serif;cursor:pointer;box-shadow:0 8px 24px rgba(0,0,0,.35)}.panel{position:fixed;left:${left}px;top:${top}px;z-index:2147483647;width:min(560px,calc(100vw - 24px));max-height:min(88vh,900px);display:none;flex-direction:column;overflow:hidden;border:1px solid rgba(148,163,184,.35);border-radius:14px;background:#0b1220;color:#f8fafc;box-shadow:0 20px 60px rgba(0,0,0,.5);font:13px/1.4 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}.panel[data-open=true]{display:flex}.header{display:flex;align-items:center;gap:8px;padding:10px;background:#111b2e;border-bottom:1px solid rgba(148,163,184,.2);cursor:grab;user-select:none}.title{flex:1;min-width:0}.title-main{font-weight:800}.title-sub{color:#94a3b8;font-size:11px}.close{width:30px;height:30px}.tabs{display:grid;grid-template-columns:repeat(3,1fr);gap:4px;padding:7px;border-bottom:1px solid rgba(148,163,184,.16)}button{border:1px solid rgba(148,163,184,.3);border-radius:8px;background:#17243a;color:#f8fafc;cursor:pointer}button:hover,button:focus-visible{background:#243750;outline:none}button:disabled{opacity:.55;cursor:wait}.tab{padding:7px 4px;font-size:11px}.tab[aria-selected=true]{background:#1d4ed8;border-color:#60a5fa}.surface-tools{display:none;gap:6px;padding:7px 8px;border-bottom:1px solid rgba(148,163,184,.16);flex-wrap:wrap}.surface-tools[data-visible=true]{display:flex}.tool{padding:6px 8px}.search-wrap{padding:8px;border-bottom:1px solid rgba(148,163,184,.16)}.search{width:100%;padding:8px 9px;border:1px solid rgba(148,163,184,.3);border-radius:8px;background:#020817;color:#f8fafc}.body{overflow:auto;padding:8px}.row{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:7px;margin:4px 0}.insert{min-width:0;padding:8px;text-align:left}.row-label{display:block;font-weight:750;overflow:hidden;text-overflow:ellipsis}.row-meta{display:block;color:#94a3b8;font-size:11px}.actions{display:flex;flex-wrap:wrap;gap:6px;justify-content:flex-end}.full,.refinement,.copy,.open-command,.edit-library,.repo-library,.delete-library{padding:5px 8px}.full{color:#bfdbfe;border-color:rgba(96,165,250,.5)}.refinement{color:#ddd6fe;border-color:rgba(167,139,250,.5)}.open-command{color:#bbf7d0;border-color:rgba(74,222,128,.5)}.repo-library{color:#fde68a;border-color:rgba(250,204,21,.5)}.delete-library{color:#fecaca;border-color:rgba(248,113,113,.5)}.status{margin:0 8px 8px;padding:8px;border-radius:8px;background:rgba(37,99,235,.18);color:#bfdbfe;white-space:pre-wrap}.empty{padding:18px;color:#94a3b8;text-align:center}.overlay{position:fixed;inset:0;z-index:2147483647;background:rgba(2,8,23,.72);display:flex;align-items:center;justify-content:center;padding:18px}.modal{width:min(760px,96vw);max-height:90vh;overflow:auto;background:#0b1220;color:#f8fafc;border:1px solid rgba(148,163,184,.4);border-radius:14px;box-shadow:0 24px 70px rgba(0,0,0,.55);padding:14px;font:13px/1.45 system-ui,sans-serif}.modal h2{margin:0 0 8px;font-size:17px}.modal p{color:#cbd5e1}.modal textarea{width:100%;min-height:300px;padding:10px;border:1px solid rgba(148,163,184,.35);border-radius:8px;background:#020817;color:#f8fafc;font:12px/1.45 ui-monospace,SFMono-Regular,Consolas,monospace}.modal input{width:100%;padding:8px;border:1px solid rgba(148,163,184,.35);border-radius:8px;background:#020817;color:#f8fafc}.fields{display:grid;grid-template-columns:1fr 1fr;gap:8px}.field{display:grid;gap:4px}.field-wide{grid-column:1/-1}.modal-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:10px}.preview{margin-top:10px;padding:10px;border:1px solid rgba(148,163,184,.25);border-radius:8px;background:#07101f;white-space:pre-wrap}.danger{color:#fecaca}.ok{color:#bbf7d0}
</style><button class="launcher" type="button">Planning</button><section class="panel" data-open="false" aria-label="OBS planning helper"><div class="header"><div class="title"><div class="title-main">OBS Planning Helper</div><div class="title-sub">Planning routes · local commands · prompts · repository backup</div></div><button class="close" type="button" title="Close">×</button></div><div class="tabs" role="tablist">${Object.values(SURFACES).map((surface)=>`<button class="tab" type="button" role="tab" data-surface="${surface}" aria-selected="false">${surface}</button>`).join('')}</div><div class="surface-tools command-tools"><button class="tool refresh" type="button">Refresh repo</button><button class="tool import" type="button">Add / Update planning commands</button><button class="tool settings" type="button">Repository settings</button></div><div class="surface-tools library-tools"><button class="tool new-library" type="button">New</button><button class="tool refresh-library" type="button">Refresh repo library</button><button class="tool settings-library" type="button">Repository settings</button></div><div class="search-wrap"><input class="search" type="search" placeholder="Search current surface…" autocomplete="off"></div><div class="body"></div></section>`;

    const launcher=root.querySelector('.launcher'),panel=root.querySelector('.panel'),header=root.querySelector('.header'),closeButton=root.querySelector('.close'),searchInput=root.querySelector('.search'),body=root.querySelector('.body'),commandTools=root.querySelector('.command-tools'),libraryTools=root.querySelector('.library-tools'),tabButtons=[...root.querySelectorAll('.tab')];

    function isLibrarySurface(surface){return surface===SURFACES.LOCAL_COMMANDS||surface===SURFACES.PROMPTS;}
    function libraryKindForSurface(surface){return surface===SURFACES.PROMPTS?deps.HELPER_LIBRARY_KINDS.PROMPT:deps.HELPER_LIBRARY_KINDS.COMMAND;}
    function entriesForSurface(surface){if(surface===SURFACES.COMMANDS)return commandEntries;if(surface===SURFACES.LOCAL_COMMANDS)return localCommandEntries;if(surface===SURFACES.PROMPTS)return promptEntries;return semanticEntries[surface]||[];}
    function setCommandEntries(entries){commandEntries=[...(entries||[])];if(activeSurface===SURFACES.COMMANDS)renderEntries(searchInput.value);}
    function setLibraryEntries(result={}){if(result.localCommandEntries)localCommandEntries=[...result.localCommandEntries];if(result.promptEntries)promptEntries=[...result.promptEntries];if(isLibrarySurface(activeSurface))renderEntries(searchInput.value);}
    function switchSurface(surface,commandId=null){activeSurface=surface;focusCommandId=commandId;searchInput.value='';tabButtons.forEach((button)=>button.setAttribute('aria-selected',String(button.dataset.surface===surface)));commandTools.dataset.visible=String(surface===SURFACES.COMMANDS);libraryTools.dataset.visible=String(isLibrarySurface(surface));const newButton=root.querySelector('.new-library');if(newButton)newButton.textContent=surface===SURFACES.PROMPTS?'New prompt':'New local command';renderEntries('');}
    function setOpen(next){const requested=Boolean(next);if(!requested&&repositoryBusy){showStatus(`${repositoryBusyLabel||'Repository operation'} is still running. Wait for it to finish before closing the helper.`,7000);return;}isOpen=requested;if(!isOpen&&activeOverlay)closeOverlay(activeOverlay);panel.dataset.open=String(isOpen);launcher.style.display=isOpen||dashboardOpen?'none':'block';if(isOpen){keepPanelInViewport();switchSurface(activeSurface);window.setTimeout(()=>searchInput.focus(),0);}}
    function showStatus(message,timeout=4200){root.querySelector('.status')?.remove();if(statusTimer!==null)window.clearTimeout(statusTimer);const status=document.createElement('div');status.className='status';status.textContent=String(message);panel.appendChild(status);statusTimer=window.setTimeout(()=>{status.remove();statusTimer=null;},timeout);}
    function setBusy(busy){insertionBusy=Boolean(busy);root.querySelectorAll('.insert,.full,.refinement,.open-command,.edit-library,.repo-library,.delete-library,.copy').forEach((button)=>{button.disabled=insertionBusy;});root.querySelectorAll('.tool').forEach((button)=>{button.disabled=repositoryBusy||insertionBusy;});}
    function setRepositoryBusy(busy,label=''){repositoryBusy=Boolean(busy);repositoryBusyLabel=repositoryBusy?String(label||'Repository operation'):'';root.querySelectorAll('.tool,.repo-library').forEach((button)=>{button.disabled=repositoryBusy||insertionBusy;});}
    async function runRepositoryOperation(label,task){if(repositoryBusy){const error=new Error(`Repository operation already in progress: ${repositoryBusyLabel}.`);error.kind='busy';throw error;}setRepositoryBusy(true,label);try{return await task();}finally{setRepositoryBusy(false);}}
    async function insertBody(text,success,id){if(insertionBusy){showStatus('Insertion is already in progress.');return;}setBusy(true);try{const message=await options.onInsert(text,success,id);showStatus(message||success);}finally{setBusy(false);}}

    function renderEntries(query){
      const normalized=String(query||'').trim().toLowerCase();const entries=entriesForSurface(activeSurface).filter((entry)=>!normalized||[entry.id,entry.label,entry.command||'',entry.description,entry.englishName||'',entry.text||'',...(entry.commandFamily||[]),...(entry.sources||[])].join(' ').toLowerCase().includes(normalized));body.textContent='';
      if(!entries.length){const empty=document.createElement('div');empty.className='empty';empty.textContent=isLibrarySurface(activeSurface)?'No local/repository library items yet.':'No matching entries.';body.appendChild(empty);return;}
      for(const entry of entries){
        const row=document.createElement('div');row.className='row';const main=document.createElement('button');main.type='button';main.className='insert';const label=document.createElement('span');label.className='row-label';label.textContent=activeSurface===SURFACES.COMMANDS?`${entry.englishName} · ${entry.command||entry.label}`:entry.label;const meta=document.createElement('span');meta.className='row-meta';meta.textContent=entry.description||entry.id;main.append(label,meta);const actions=document.createElement('div');actions.className='actions';
        if(isLibrarySurface(activeSurface)){
          main.title='Insert exact saved text';main.addEventListener('click',()=>insertBody(entry.text,`Inserted: ${entry.title}`,entry.id));
          const copy=document.createElement('button');copy.type='button';copy.className='copy';copy.textContent='Copy';copy.addEventListener('click',async()=>showStatus(await options.onCopy(entry.text)?`Copied: ${entry.title}`:'Clipboard copy failed.'));actions.append(copy);
          const edit=document.createElement('button');edit.type='button';edit.className='edit-library';edit.textContent=entry.hasLocal?'Edit':'Save local';edit.addEventListener('click',()=>openLibraryEditor(entry));actions.append(edit);
          if(entry.hasLocal){const repo=document.createElement('button');repo.type='button';repo.className='repo-library';repo.textContent='Repo';repo.title='Preview and save this local item to the configured GitHub repository';repo.addEventListener('click',()=>openLibraryRepoSave(entry));actions.append(repo);const remove=document.createElement('button');remove.type='button';remove.className='delete-library';remove.textContent='Delete local';remove.addEventListener('click',()=>deleteLocalLibrary(entry));actions.append(remove);}
        } else if(entry.commandId){
          main.title='Open the related accepted command';main.addEventListener('click',()=>switchSurface(SURFACES.COMMANDS,entry.commandId));const open=document.createElement('button');open.type='button';open.className='open-command';open.textContent='Open Commands';open.addEventListener('click',()=>switchSurface(SURFACES.COMMANDS,entry.commandId));actions.append(open);
        } else {
          main.title='Insert Adaptive body';main.addEventListener('click',()=>insertBody(entry.adaptiveBody,`Inserted: ${entry.label||entry.command} · Adaptive`,entry.id));const full=document.createElement('button');full.type='button';full.className='full';full.textContent='Full';full.addEventListener('click',()=>insertBody(entry.fullBody,`Inserted: ${entry.label||entry.command} · Full`,entry.id));actions.append(full);if(activeSurface===SURFACES.COMMANDS)for(const refinement of entry.refinementBodies||[]){const button=document.createElement('button');button.type='button';button.className='refinement';button.textContent=refinement.label;button.title=refinement.description;button.addEventListener('click',()=>insertBody(refinement.body,`Inserted refinement: ${entry.command} · ${refinement.label}`,`${entry.id}:${refinement.id}`));actions.append(button);}const copy=document.createElement('button');copy.type='button';copy.className='copy';copy.textContent='Copy';copy.addEventListener('click',async()=>showStatus(await options.onCopy(entry.adaptiveBody)?`Copied: ${entry.label||entry.command} · Adaptive`:'Clipboard copy failed.'));actions.append(copy);
        }
        row.append(main,actions);body.appendChild(row);if(entry.id===focusCommandId){window.setTimeout(()=>{main.focus();row.scrollIntoView({block:'nearest'});focusCommandId=null;},0);}
      }
    }

    function closeOverlay(overlay){if(repositoryBusy&&overlay===activeOverlay){showStatus(`${repositoryBusyLabel||'Repository operation'} is still running. Wait for it to finish before closing this dialog.`,7000);return false;}if(overlay===activeOverlay)activeOverlay=null;overlay?.remove();return true;}
    function makeOverlay(title){if(activeOverlay&&!closeOverlay(activeOverlay))return null;const overlay=document.createElement('div');overlay.className='overlay';const modal=document.createElement('section');modal.className='modal';const h=document.createElement('h2');h.textContent=title;modal.appendChild(h);overlay.appendChild(modal);root.appendChild(overlay);activeOverlay=overlay;overlay.addEventListener('click',(event)=>{if(event.target===overlay)closeOverlay(overlay);});return{overlay,modal};}

    async function openImport(){
      const made=makeOverlay('Add / Update repository planning commands');if(!made)return;const{overlay,modal}=made;const intro=document.createElement('p');intro.textContent='This is the planning-command registry (route/owners), not the local helper library. Paste one or more [PLANNING_COMMAND_DEFINITION] blocks. Parse & Preview captures repository identity, catalog snapshot and update SHAs; Save uses that exact plan.';const textarea=document.createElement('textarea');textarea.placeholder='[PLANNING_COMMAND_DEFINITION]\n{ ... }\n[/PLANNING_COMMAND_DEFINITION]';const preview=document.createElement('div');preview.className='preview';preview.textContent='Not parsed yet.';const actions=document.createElement('div');actions.className='modal-actions';const cancel=document.createElement('button');cancel.textContent='Cancel';const parse=document.createElement('button');parse.textContent='Parse & Preview';const save=document.createElement('button');save.textContent='Save to GitHub';save.disabled=true;actions.append(cancel,parse,save);modal.append(intro,textarea,preview,actions);let parsed=null,savePlan=null;
      textarea.addEventListener('input',()=>{if(parsed||savePlan){parsed=null;savePlan=null;save.disabled=true;preview.textContent='Input changed. Parse & Preview again before saving.';preview.className='preview';}});cancel.addEventListener('click',()=>closeOverlay(overlay));
      parse.addEventListener('click',async()=>{save.disabled=true;savePlan=null;parsed=null;textarea.disabled=true;cancel.disabled=true;parse.disabled=true;try{await runRepositoryOperation('Repository Preview',async()=>{parsed=options.parseDefinitions(textarea.value);preview.textContent=`${parsed.length} valid planning command definition(s). Checking repository…`;const plan=await options.onPreviewDefinitions(parsed);if(!plan||!Array.isArray(plan.items)||!plan.repository?.sourceKey)throw new Error('Repository Preview returned an invalid save plan.');savePlan=plan;const source=`Repository: ${plan.repository.owner}/${plan.repository.repo}@${plan.repository.branch}`;preview.textContent=source+'\n\n'+plan.items.map((row)=>`${row.action.toUpperCase()}  ${row.path}\n  ${row.definition.englishName} · ${row.definition.command}${row.baseSha?`\n  base SHA: ${row.baseSha}`:'\n  expects: absent'}`).join('\n\n');preview.className='preview ok';});}catch(error){parsed=null;savePlan=null;preview.textContent=error.message||String(error);preview.className='preview danger';}finally{textarea.disabled=false;cancel.disabled=false;parse.disabled=false;save.disabled=!savePlan;}});
      save.addEventListener('click',async()=>{if(!savePlan)return;const plan=savePlan;savePlan=null;parsed=null;textarea.disabled=true;cancel.disabled=true;parse.disabled=true;save.disabled=true;try{await runRepositoryOperation('Repository Save',async()=>{const result=await options.onSaveDefinitions(plan);const lines=result.results.map((row)=>`${row.ok?'OK':'FAIL'} ${row.action} ${row.path}${row.error?` — ${row.error}`:''}`);preview.textContent=`Repository: ${plan.repository.owner}/${plan.repository.repo}@${plan.repository.branch}\n\n`+lines.join('\n')+(result.remaining?.length?`\nNot written: ${result.remaining.join(', ')}`:'')+(result.refreshError?`\nRefresh warning: ${result.refreshError}`:'');preview.className=`preview ${result.ok?'ok':'danger'}`;if(result.commandEntries)setCommandEntries(result.commandEntries);showStatus(result.ok?`Saved and verified ${result.results.length} planning command file(s).`:'Planning-command save stopped after a partial/failed GitHub result; Preview again before retry.',7000);});}catch(error){preview.textContent=`${error.message||String(error)}\nParse & Preview again before saving.`;preview.className='preview danger';}finally{textarea.disabled=false;cancel.disabled=false;parse.disabled=false;}});
    }

    async function openLibraryEditor(entry=null){
      const kind=entry?.libraryKind||libraryKindForSurface(activeSurface);const made=makeOverlay(entry?(entry.hasLocal?'Edit local item':'Save repository item locally'):(kind===deps.HELPER_LIBRARY_KINDS.PROMPT?'New prompt':'New local command'));if(!made)return;const{overlay,modal}=made;const fields=document.createElement('div');fields.className='fields';const titleWrap=document.createElement('label');titleWrap.className='field field-wide';const titleLabel=document.createElement('span');titleLabel.textContent='Title';const title=document.createElement('input');title.value=entry?.title||'';titleWrap.append(titleLabel,title);fields.append(titleWrap);const textLabel=document.createElement('label');textLabel.className='field field-wide';const span=document.createElement('span');span.textContent=kind===deps.HELPER_LIBRARY_KINDS.PROMPT?'Prompt text':'Command text (inserted exactly as saved)';const textarea=document.createElement('textarea');textarea.value=entry?.text||'';textLabel.append(span,textarea);fields.append(textLabel);const note=document.createElement('p');note.textContent='Save local stores this exact text in Planning Helper GM storage. It does not create a planning/commands route. Use the Repo button on the saved row for a separate SHA-aware repository write.';const actions=document.createElement('div');actions.className='modal-actions';const cancel=document.createElement('button');cancel.textContent='Cancel';const save=document.createElement('button');save.textContent='Save local';actions.append(cancel,save);modal.append(fields,note,actions);cancel.addEventListener('click',()=>closeOverlay(overlay));save.addEventListener('click',async()=>{title.disabled=true;textarea.disabled=true;cancel.disabled=true;save.disabled=true;try{const result=await options.onSaveLocalLibraryItem({kind,id:entry?.libraryId||'',title:title.value,text:textarea.value,createdAt:entry?.createdAt||''});setLibraryEntries(result);closeOverlay(overlay);showStatus(`${kind==='prompt'?'Prompt':'Local command'} saved locally.`);}catch(error){showStatus(error.message||String(error),7000);}finally{title.disabled=false;textarea.disabled=false;cancel.disabled=false;save.disabled=false;}});
    }

    async function deleteLocalLibrary(entry){if(!entry?.hasLocal)return;try{const result=await options.onDeleteLocalLibraryItem(entry.libraryKind,entry.libraryId);setLibraryEntries(result);showStatus(`Local copy removed: ${entry.title}${entry.hasRepo?' · repository copy remains visible':''}.`);}catch(error){showStatus(error.message||String(error),7000);}}

    async function openLibraryRepoSave(entry){
      if(!entry?.hasLocal)return;const made=makeOverlay(`Save ${entry.libraryKind} to repository`);if(!made)return;const{overlay,modal}=made;const intro=document.createElement('p');intro.textContent='This writes one local helper-library item, not a planning command. Preview captures repository identity and the target file SHA/absence. If the target changes before Save, the write stops.';const preview=document.createElement('div');preview.className='preview';preview.textContent='Checking repository…';const actions=document.createElement('div');actions.className='modal-actions';const cancel=document.createElement('button');cancel.textContent='Cancel';const save=document.createElement('button');save.textContent='Save to GitHub';save.disabled=true;actions.append(cancel,save);modal.append(intro,preview,actions);cancel.addEventListener('click',()=>closeOverlay(overlay));let plan=null;
      try{await runRepositoryOperation('Preview helper-library save',async()=>{plan=await options.onPreviewLibraryItem(entry.libraryKind,entry.libraryId);preview.textContent=`Repository: ${plan.repository.owner}/${plan.repository.repo}@${plan.repository.branch}\n\n${plan.action.toUpperCase()}  ${plan.path}\n${plan.baseSha?`base SHA: ${plan.baseSha}`:'expects: absent'}\n\n${entry.title}`;preview.className='preview ok';save.disabled=false;});}catch(error){preview.textContent=error.message||String(error);preview.className='preview danger';return;}
      save.addEventListener('click',async()=>{if(!plan)return;const exact=plan;plan=null;cancel.disabled=true;save.disabled=true;try{await runRepositoryOperation('Save helper-library item',async()=>{const result=await options.onSaveLibraryItem(exact);setLibraryEntries(result);preview.textContent=`OK ${result.action} ${result.path}\nSHA: ${result.sha}${result.refreshError?`\nRefresh warning: ${result.refreshError}`:''}`;preview.className='preview ok';showStatus(`Saved and verified repository ${entry.libraryKind}: ${entry.title}.`);});}catch(error){preview.textContent=`${error.message||String(error)}\nPreview again before retrying.`;preview.className='preview danger';}finally{cancel.disabled=false;}});
    }

    async function openSettings(){
      const made=makeOverlay('Repository settings');if(!made)return;const{overlay,modal}=made;let current;try{current=await options.onLoadSettings();}catch(error){closeOverlay(overlay);showStatus(error.message||String(error),7000);return;}const fields=document.createElement('div');fields.className='fields';function add(labelText,value,type='text',wide=false){const wrap=document.createElement('label');wrap.className=`field${wide?' field-wide':''}`;const label=document.createElement('span');label.textContent=labelText;const input=document.createElement('input');input.type=type;input.value=value||'';wrap.append(label,input);fields.appendChild(wrap);return input;}const owner=add('Owner',current.settings.owner),repo=add('Repository',current.settings.repo),branch=add('Branch',current.settings.branch),token=add('GitHub token (Planning Helper GM storage only)',current.token,'password',true);const note=document.createElement('p');note.textContent='Planning commands may write only planning/commands/*.command.md. Local helper commands/prompts may write only planning/helper-library/commands/*.helper-command.md and planning/helper-library/prompts/*.prompt.md. Blank owner/repository/branch values are rejected.';const actions=document.createElement('div');actions.className='modal-actions';const cancel=document.createElement('button');cancel.textContent='Cancel';const save=document.createElement('button');save.textContent='Save settings';actions.append(cancel,save);modal.append(fields,note,actions);cancel.addEventListener('click',()=>closeOverlay(overlay));save.addEventListener('click',async()=>{for(const input of[owner,repo,branch,token])input.disabled=true;cancel.disabled=true;save.disabled=true;try{await runRepositoryOperation('Save repository settings',async()=>{const result=await options.onSaveSettings({owner:owner.value,repo:repo.value,branch:branch.value},token.value);if(result?.commandEntries)setCommandEntries(result.commandEntries);setLibraryEntries(result);showStatus(result?.sourceChanged?'Repository target changed. Bundled planning commands restored and repository helper library cleared; use Refresh on the desired surfaces.':'Repository settings saved.');});closeOverlay(overlay);}catch(error){showStatus(error.message||String(error),7000);}finally{for(const input of[owner,repo,branch,token])input.disabled=false;cancel.disabled=false;save.disabled=false;}});
    }

    async function refreshCommands(){try{await runRepositoryOperation('Refresh repository commands',async()=>{showStatus('Refreshing repository planning commands…',7000);const result=await options.onRefreshCommands();setCommandEntries(result.commandEntries);showStatus(`Repository planning commands refreshed: ${result.count} definitions (${result.visible} visible).`);});}catch(error){showStatus(`Repository refresh failed: ${error.message||error}`,7000);}}
    async function refreshLibrary(){try{await runRepositoryOperation('Refresh helper library',async()=>{showStatus('Refreshing repository helper library…',7000);const result=await options.onRefreshLibrary();setLibraryEntries(result);showStatus(`Repository helper library refreshed: ${result.commands} command(s), ${result.prompts} prompt(s).`);});}catch(error){showStatus(`Helper-library refresh failed: ${error.message||error}`,7000);}}

    function keepPanelInViewport(){const width=panel.offsetWidth||560,height=panel.offsetHeight||720;left=Math.min(Math.max(left,8),Math.max(8,window.innerWidth-width-8));top=Math.min(Math.max(top,8),Math.max(8,window.innerHeight-height-8));panel.style.left=`${left}px`;panel.style.top=`${top}px`;}
    function enableDragging(){let pointerId=null,startX=0,startY=0,startLeft=0,startTop=0;function down(event){if(event.button!==0||event.target===closeButton||event.target.closest('button'))return;pointerId=event.pointerId;startX=event.clientX;startY=event.clientY;const rect=panel.getBoundingClientRect();startLeft=rect.left;startTop=rect.top;header.setPointerCapture(pointerId);event.preventDefault();}function move(event){if(pointerId!==event.pointerId)return;left=startLeft+event.clientX-startX;top=startTop+event.clientY-startY;keepPanelInViewport();event.preventDefault();}function finish(event){if(pointerId===null)return;try{header.releasePointerCapture(pointerId);}catch(_){}pointerId=null;options.onSavePosition?.({left,top});event.preventDefault();}header.addEventListener('pointerdown',down);header.addEventListener('pointermove',move);header.addEventListener('pointerup',finish);header.addEventListener('pointercancel',finish);return()=>{header.removeEventListener('pointerdown',down);header.removeEventListener('pointermove',move);header.removeEventListener('pointerup',finish);header.removeEventListener('pointercancel',finish);};}
    function handleShortcut(event){if(event.repeat)return;if(event.key==='Escape'&&activeOverlay){event.preventDefault();event.stopPropagation();closeOverlay(activeOverlay);return;}if(event.altKey&&!event.ctrlKey&&!event.metaKey&&event.key==='F2'){event.preventDefault();event.stopPropagation();setOpen(!isOpen);}else if(event.key==='Escape'&&isOpen){event.preventDefault();event.stopPropagation();setOpen(false);}}
    function syncDashboardVisibility(){dashboardOpen=document.documentElement.dataset.obsPlanningDashboardOpen==='true';launcher.style.display=isOpen||dashboardOpen?'none':'block';}
    function consumeToggle(token){const next=String(token||'');if(!next||next===lastToggleToken)return;lastToggleToken=next;setOpen(!isOpen);}
    const observer=new MutationObserver((mutations)=>{for(const mutation of mutations){if(mutation.attributeName==='data-obs-planning-dashboard-open')syncDashboardVisibility();if(mutation.attributeName==='data-obs-planning-commands-toggle')consumeToggle(document.documentElement.dataset.obsPlanningCommandsToggle);}});observer.observe(document.documentElement,{attributes:true,attributeFilter:['data-obs-planning-dashboard-open','data-obs-planning-commands-toggle']});
    function handleDashboardVisibility(event){dashboardOpen=Boolean(event?.detail?.open);launcher.style.display=isOpen||dashboardOpen?'none':'block';}function handleCommandsToggle(event){consumeToggle(event?.detail?.token);}
    tabButtons.forEach((button)=>button.addEventListener('click',()=>switchSurface(button.dataset.surface)));launcher.addEventListener('click',()=>setOpen(true));closeButton.addEventListener('click',()=>setOpen(false));searchInput.addEventListener('input',()=>renderEntries(searchInput.value));root.querySelector('.refresh').addEventListener('click',refreshCommands);root.querySelector('.import').addEventListener('click',openImport);root.querySelector('.settings').addEventListener('click',openSettings);root.querySelector('.settings-library').addEventListener('click',openSettings);root.querySelector('.refresh-library').addEventListener('click',refreshLibrary);root.querySelector('.new-library').addEventListener('click',()=>openLibraryEditor());window.addEventListener('resize',keepPanelInViewport);window.addEventListener('keydown',handleShortcut,true);window.addEventListener('obs-planning-dashboard-visibility',handleDashboardVisibility);window.addEventListener('obs-planning-commands-toggle',handleCommandsToggle);const disableDragging=enableDragging();switchSurface(SURFACES.ORIENTATION);
    if(Array.isArray(options.startupWarnings)&&options.startupWarnings.length)window.setTimeout(()=>showStatus(options.startupWarnings.join('\n'),9000),100);

    function dispose(){if(statusTimer!==null)window.clearTimeout(statusTimer);observer.disconnect();disableDragging();window.removeEventListener('resize',keepPanelInViewport);window.removeEventListener('keydown',handleShortcut,true);window.removeEventListener('obs-planning-dashboard-visibility',handleDashboardVisibility);window.removeEventListener('obs-planning-commands-toggle',handleCommandsToggle);host.remove();}
    return{setCommandEntries,setLibraryEntries,switchSurface,setOpen,showStatus,dispose,host,root};
  }

  return { createPlanningHelperUi };
});

(function (root, factory) {
  const api = factory(root.ObsPlanningHelper || {});
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsPlanningHelper = Object.assign(root.ObsPlanningHelper || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function (deps) {
  'use strict';

  const INSTANCE_DISPOSE_KEY='__obsPlanningHelperDisposeV2';
  const LEGACY_DISPOSE_KEYS=['__obsCommandHelperDisposeV1'];
  function cleanDefinitions(definitions){return definitions.map((definition)=>deps.stripRuntimeCommandMetadata(definition));}
  function cleanLibrary(items){return deps.normalizeHelperLibraryCollection((items||[]).map((item)=>{const copy={...item};delete copy.__sha;delete copy.__path;delete copy.source;delete copy.hasRepo;delete copy.hasLocal;return copy;}));}

  function createRepositoryOperationLock(){let active='';return{isBusy:()=>Boolean(active),active:()=>active,async run(label,task){const next=String(label||'repository operation');if(active){const error=new Error(`Repository operation already in progress: ${active}.`);error.kind='busy';throw error;}active=next;try{return await task();}finally{active='';}}};}

  function buildLibraryEntries(kind, remoteItems, localItems){
    return deps.mergeHelperLibrary(remoteItems,localItems).filter((item)=>item.kind===kind).map((item)=>({
      id:`helper-library:${item.kind}:${item.id}`,
      libraryId:item.id,
      libraryKind:item.kind,
      label:item.title,
      title:item.title,
      description:item.source==='local+repo'?'local override · repository copy exists':item.source==='local'?'local only':'repository only',
      text:item.text,
      adaptiveBody:item.text,
      source:item.source,
      hasLocal:item.hasLocal,
      hasRepo:item.hasRepo,
      createdAt:item.createdAt,
      updatedAt:item.updatedAt
    }));
  }

  async function startPlanningHelper(options={}) {
    for(const key of [INSTANCE_DISPOSE_KEY,...LEGACY_DISPOSE_KEYS]){const previous=globalThis[key];if(typeof previous==='function'){try{previous();}catch(_){}}}
    const bundled=Array.isArray(options.bundledCommands)?options.bundledCommands:[];deps.validateCommandCatalog(bundled);
    const semanticEntries=deps.buildSemanticEntries();
    const initialSettings=await deps.loadRepositorySettings();
    const repositoryLock=createRepositoryOperationLock();
    let currentDefinitions=bundled;
    let localLibrary=[];
    let remoteLibrary=[];
    let startupWarnings=[];
    try{const migration=await deps.migrateLegacyLocalCommandProjections();if(migration.added)startupWarnings.push(`Migrated ${migration.added} legacy local command projection(s) into Planning Helper GM storage.`);if(migration.warning)startupWarnings.push(migration.warning);}catch(error){startupWarnings.push(`Legacy local command migration failed: ${error.message||String(error)}`);}
    try{localLibrary=await deps.loadLocalHelperLibrary();}catch(error){startupWarnings.push(`Local helper library could not be loaded: ${error.message||String(error)}`);localLibrary=[];}
    try{const cache=await deps.loadCommandCatalogCache(initialSettings);if(cache&&Array.isArray(cache.definitions)){deps.validateCommandCatalog(cache.definitions);currentDefinitions=cache.definitions;}}catch(error){console.warn('[OBS Planning Helper] Ignoring invalid command cache:',error);}
    try{const cache=await deps.loadRepositoryHelperLibraryCache(initialSettings);if(cache)remoteLibrary=cache.items;}catch(error){console.warn('[OBS Planning Helper] Ignoring invalid helper-library cache:',error);}

    function commandEntries(){return deps.buildCommandEntries(currentDefinitions);}
    function localCommandEntries(){return buildLibraryEntries(deps.HELPER_LIBRARY_KINDS.COMMAND,remoteLibrary,localLibrary);}
    function promptEntries(){return buildLibraryEntries(deps.HELPER_LIBRARY_KINDS.PROMPT,remoteLibrary,localLibrary);}
    function libraryUiState(){return{localCommandEntries:localCommandEntries(),promptEntries:promptEntries()};}

    async function makeClient(){const settings=await deps.loadRepositorySettings();const token=await deps.loadGitHubToken();if(typeof GM_xmlhttpRequest!=='function')throw new Error('GM_xmlhttpRequest is unavailable; reinstall the generated Planning Helper userscript and accept its GM grants.');const transport=deps.createGmTransport(GM_xmlhttpRequest);return{client:new deps.GitHubContentsClient({...settings,token,transport}),settings};}
    async function makeCommandService(){const {client,settings}=await makeClient();return{service:new deps.RepositoryCommandService(client,{commandsPath:deps.COMMANDS_PATH}),settings};}
    async function makeLibraryService(){const {client,settings}=await makeClient();return{service:new deps.RepositoryHelperLibraryService(client),settings};}

    async function refreshCommandsUnlocked(){const {service,settings}=await makeCommandService();const definitions=await service.loadCatalog();const clean=cleanDefinitions(definitions);deps.validateCommandCatalog(clean);currentDefinitions=clean;await deps.saveCommandCatalogCache(clean,settings);return{commandEntries:commandEntries(),count:clean.length,visible:clean.filter((definition)=>definition.palette).length};}
    async function refreshLibraryUnlocked(){const {service,settings}=await makeLibraryService();const items=await service.loadAll();remoteLibrary=cleanLibrary(items);await deps.saveRepositoryHelperLibraryCache(remoteLibrary,settings);return{...libraryUiState(),count:remoteLibrary.length,commands:remoteLibrary.filter((item)=>item.kind===deps.HELPER_LIBRARY_KINDS.COMMAND).length,prompts:remoteLibrary.filter((item)=>item.kind===deps.HELPER_LIBRARY_KINDS.PROMPT).length};}

    async function refreshCommands(){return repositoryLock.run('Refresh repository commands',refreshCommandsUnlocked);}
    async function previewDefinitions(definitions){return repositoryLock.run('Preview repository commands',async()=>{const{service}=await makeCommandService();return service.previewDefinitions(definitions);});}
    async function saveDefinitions(previewPlan){return repositoryLock.run('Save repository commands',async()=>{const{service}=await makeCommandService();const result=await service.savePreviewPlan(previewPlan);try{const refreshed=await refreshCommandsUnlocked();return{...result,commandEntries:refreshed.commandEntries};}catch(error){return{...result,refreshError:error.message||String(error),commandEntries:commandEntries()};}});}
    async function refreshLibrary(){return repositoryLock.run('Refresh helper library',refreshLibraryUnlocked);}

    async function saveLocalLibraryItem(value){const now=new Date().toISOString();const current=localLibrary.find((item)=>item.kind===value.kind&&item.id===value.id);const normalized=deps.normalizeHelperLibraryItem({...value,createdAt:current?.createdAt||value.createdAt||now,updatedAt:now});const saved=await deps.upsertLocalHelperLibraryItem(normalized);localLibrary=saved.items;return{item:saved.item,...libraryUiState()};}
    async function deleteLocalLibraryItem(kind,id){localLibrary=await deps.removeLocalHelperLibraryItem(kind,id);return libraryUiState();}
    async function previewLibraryItem(kind,id){return repositoryLock.run('Preview helper-library save',async()=>{localLibrary=await deps.loadLocalHelperLibrary();const item=localLibrary.find((entry)=>entry.kind===kind&&entry.id===id);if(!item)throw new Error('Only a local helper-library item can be saved to the repository.');const{service}=await makeLibraryService();return service.previewSave(item);});}
    async function saveLibraryItem(plan){return repositoryLock.run('Save helper-library item',async()=>{localLibrary=await deps.loadLocalHelperLibrary();const previewItem=deps.normalizeHelperLibraryItem(plan?.item||{});const current=localLibrary.find((entry)=>entry.kind===previewItem.kind&&entry.id===previewItem.id);if(!current||JSON.stringify(current)!==JSON.stringify(previewItem)){const error=new Error('Local helper-library item changed since Preview. Nothing was written; preview again.');error.kind='conflict';throw error;}const{service}=await makeLibraryService();const result=await service.savePreviewPlan(plan);try{const refreshed=await refreshLibraryUnlocked();return{...result,...refreshed};}catch(error){return{...result,...libraryUiState(),refreshError:error.message||String(error)};}});}

    async function onInsert(text,success,id){await new Promise((resolve)=>requestAnimationFrame(resolve));const result=deps.insertIntoComposer(text,id);if(result.ok)return success;const copied=await deps.copyText(text);return copied?`Direct insertion failed (${result.reason}). Copied to clipboard — paste manually.`:`Direct insertion failed (${result.reason}) and clipboard copy also failed.`;}
    async function loadSettings(){return{settings:await deps.loadRepositorySettings(),token:await deps.loadGitHubToken()};}
    async function saveSettings(settings,token){return repositoryLock.run('Save repository settings',async()=>{const previous=await deps.loadRepositorySettings();const next=await deps.saveRepositorySettings(settings);await deps.saveGitHubToken(token);const sourceChanged=deps.repositorySourceKey(previous)!==deps.repositorySourceKey(next);if(sourceChanged){currentDefinitions=bundled;remoteLibrary=[];return{sourceChanged:true,commandEntries:commandEntries(),...libraryUiState()};}return{sourceChanged:false};});}

    const ui=deps.createPlanningHelperUi({surfaces:deps.SURFACES,semanticEntries,commandEntries:commandEntries(),...libraryUiState(),position:deps.readPanelPosition(),onSavePosition:deps.savePanelPosition,onInsert,onCopy:deps.copyText,onRefreshCommands:refreshCommands,parseDefinitions:deps.parseCommandDefinitionBatch,onPreviewDefinitions:previewDefinitions,onSaveDefinitions:saveDefinitions,onRefreshLibrary:refreshLibrary,onSaveLocalLibraryItem:saveLocalLibraryItem,onDeleteLocalLibraryItem:deleteLocalLibraryItem,onPreviewLibraryItem:previewLibraryItem,onSaveLibraryItem:saveLibraryItem,onLoadSettings:loadSettings,onSaveSettings:saveSettings,startupWarnings});
    function dispose(){ui?.dispose();if(globalThis[INSTANCE_DISPOSE_KEY]===dispose)delete globalThis[INSTANCE_DISPOSE_KEY];for(const key of LEGACY_DISPOSE_KEYS)if(globalThis[key]===dispose)delete globalThis[key];}
    globalThis[INSTANCE_DISPOSE_KEY]=dispose;
    return{dispose,refreshRemote:refreshCommands,refreshLibrary,getDefinitions:()=>[...currentDefinitions],getLocalLibrary:()=>[...localLibrary],getRemoteLibrary:()=>[...remoteLibrary],getRepositoryOperation:()=>repositoryLock.active()};
  }

  return { startPlanningHelper, createRepositoryOperationLock, buildLibraryEntries };
});

(function(){
  'use strict';
  const commands=[
  {
    "schemaVersion": 1,
    "id": "replacement_archive.review_diff.create",
    "file": "build-archive-with-review-diff.command.md",
    "command": "давай архив с review diff file",
    "englishName": "build archive with review diff",
    "commandFamily": [
      "давай архив с review diff file",
      "give arch rev dif",
      "archive with review diff file"
    ],
    "description": "output package + repo review diff",
    "meaning": "Produce a replacement archive plus the explicitly requested repository-stored review diff flow.",
    "activeContextBehavior": "Use only when review-diff-file transfer is explicitly requested. Apply the same source-selection and local-base verification rules as build replacement archive.",
    "traversalReadMode": "Targeted/full depending on touched files.",
    "ownerFiles": [
      "planning/documentation/reviewable-agent-output-and-commands-workflow.md",
      "planning/documentation/review-diff-file-workflow.md",
      "planning/documentation/documentation-update-workflow.md"
    ],
    "expectedOutput": "Replacement archive plus the approved review-diff-file flow; reviewed diff before commit/push.",
    "permissionMode": "package-no-commit-push",
    "keyReminders": [
      "Output-package mode with review-diff-file transfer explicitly requested.",
      "Apply the same source-selection and exact local-base verification rules as build replacement archive.",
      "Use the review-diff-file workflow only for the approved repository-stored diff path.",
      "Produce full replacement files and apply/diff commands.",
      "Do not commit or push before the pasted diff is reviewed."
    ],
    "userTarget": "<what archive/package and review diff should include>",
    "palette": false,
    "refinements": []
  },
  {
    "schemaVersion": 1,
    "id": "replacement_archive.create",
    "file": "build-replacement-archive.command.md",
    "command": "давай архив",
    "englishName": "build replacement archive",
    "commandFamily": [
      "давай архив",
      "собери архив",
      "give arch",
      "replacement package"
    ],
    "description": "output package",
    "meaning": "Produce a full replacement archive/package. This is output-package mode, not archive read-source mode.",
    "activeContextBehavior": "Use active approved scope. Earlier-message archives are not current automatically; a same-message archive is current for the invocation. Otherwise use fully readable current repository files.",
    "traversalReadMode": "Targeted/full depending on touched files and source certainty.",
    "ownerFiles": [
      "planning/documentation/reviewable-agent-output-and-commands-workflow.md",
      "planning/documentation/documentation-update-workflow.md"
    ],
    "expectedOutput": "Full replacement archive plus apply/diff commands in chat; complete replacement files; reviewed diff before commit/push.",
    "permissionMode": "package-no-commit-push",
    "keyReminders": [
      "Output-package mode, not archive read-source mode.",
      "An earlier-message archive is not current automatically.",
      "A source archive attached with this command is current for this invocation.",
      "Otherwise use fully readable current repository files.",
      "Request a fresh archive only when size/tool limits prevent reliable reading.",
      "The apply stage must still verify exact local base blobs before changes.",
      "Produce a full replacement archive.",
      "Give apply/diff commands in chat.",
      "Use git add -N for new files before diff capture.",
      "Ask user to paste diff before commit.",
      "Do not commit or push."
    ],
    "userTarget": "<what archive/package should include>",
    "palette": true,
    "refinements": [
      {
        "id": "archive_command_format",
        "label": "Cmd fmt",
        "description": "reread archive command-format docs",
        "readRequired": [
          "planning/planning-use-case-map.md",
          "planning/documentation/reviewable-agent-output-and-commands-workflow.md",
          "planning/documentation/documentation-update-workflow.md"
        ],
        "instruction": "Reread these files, validate every user-facing PowerShell Git command in the current answer against their archive command-format rules, and rewrite any non-compliant command."
      }
    ]
  },
  {
    "schemaVersion": 1,
    "id": "critical_review.apply",
    "file": "critical-review.command.md",
    "command": "крит",
    "englishName": "critical review",
    "commandFamily": [
      "крит",
      "crit",
      "critical review"
    ],
    "description": "critical review",
    "meaning": "Critically evaluate the target/diff/plan/claim as a hypothesis rather than accepted truth.",
    "activeContextBehavior": "Use the provided target; ask only if the target is missing.",
    "traversalReadMode": "Targeted/full by risk and evidence needs.",
    "ownerFiles": [],
    "expectedOutput": "Honest verdict with strengths, weaknesses, risks, assumptions and alternatives.",
    "permissionMode": "read-only",
    "keyReminders": [
      "Treat target as hypothesis, not accepted truth.",
      "Give honest verdict with risks and assumptions.",
      "Do not edit files, create archives, commit or push."
    ],
    "userTarget": "<what should be critically reviewed>",
    "palette": true,
    "refinements": []
  },
  {
    "schemaVersion": 1,
    "id": "current_state.report",
    "file": "current-state.command.md",
    "command": "положняк",
    "englishName": "current state",
    "commandFamily": [
      "положняк",
      "polozh",
      "current state"
    ],
    "description": "current state",
    "meaning": "Report current operational repo/chat/planning state.",
    "activeContextBehavior": "Use active area/work item if clear.",
    "traversalReadMode": "Targeted source checks for state claims.",
    "ownerFiles": [
      "planning/root-source-sync-register.md"
    ],
    "expectedOutput": "Concise current state separating repo, local and unknown, plus next safe action.",
    "permissionMode": "read-only",
    "keyReminders": [
      "Report current repo/chat/planning state.",
      "Separate known, local, unknown and not checked.",
      "Do not present an unstated future plan as confirmed; show important open questions and conservative fallbacks.",
      "Do not edit or archive unless separately requested."
    ],
    "userTarget": "<state target>",
    "palette": true,
    "refinements": []
  },
  {
    "schemaVersion": 1,
    "id": "session.end",
    "file": "end-session.command.md",
    "command": "конец",
    "englishName": "end session",
    "commandFamily": [
      "конец",
      "конец сессии",
      "end session"
    ],
    "description": "operational end session",
    "meaning": "Add exactly one completed normal session to the existing active operational day.",
    "activeContextBehavior": "Read planning/dashboard/index.md; require active_session_day and matching active_day/operational dates; ask only for missing final D/F/Points.",
    "traversalReadMode": "Targeted: index → active operational day → end-session workflow → Day File Template → Real Reward Work Loop Workflow.",
    "ownerFiles": [
      "planning/areas/planning-system/end-session-command-workflow.md",
      "planning/dashboard/index.md",
      "-Planning/Templates/Day File Template.md",
      "-Planning/Workflows/Real Reward Work Loop Workflow.md"
    ],
    "expectedOutput": "Full replacement archive containing only the active operational-day file plus apply/diff commands; user pastes diff before commit.",
    "permissionMode": "package-no-commit-push",
    "keyReminders": [
      "Require an existing active_session_day from planning/dashboard/index.md.",
      "Require matching active_day and operational dates.",
      "Ask only for missing final D/F/Points.",
      "Produce a full replacement archive containing only the active operational-day file plus apply/diff commands.",
      "Ask user to paste the diff before commit.",
      "Do not commit or push."
    ],
    "userTarget": "<final D/F/Points or active end-session target>",
    "palette": false,
    "refinements": []
  },
  {
    "schemaVersion": 1,
    "id": "planning_items.form",
    "file": "form-items.command.md",
    "command": "сформируй айтемы",
    "englishName": "form items",
    "commandFamily": [
      "сформируй айтемы",
      "form items"
    ],
    "description": "full-message Planning Item formation",
    "meaning": "Form complete reviewable Planning Items from the selected discussion/message/file/ledger.",
    "activeContextBehavior": "Use the explicitly selected or clearly active current source; ask only when missing or ambiguous.",
    "traversalReadMode": "Targeted/full by source size and current-owner uncertainty.",
    "ownerFiles": [
      "planning/documentation/application-planning/planning-item-formation-workflow.md",
      "planning/documentation/application-planning/templates/PLANNING-ITEM-REVIEW-TEMPLATE.md",
      "planning/planning-input-conventions.md"
    ],
    "expectedOutput": "Complete Planning Items For Review with complete source context, Source Contributions and transformations.",
    "permissionMode": "read-only",
    "keyReminders": [
      "Use the explicitly selected or clearly active current source; do not silently select an earlier archive, ledger or message.",
      "Preserve complete source messages, accumulating item meanings and typed Source Contributions.",
      "Perform a proportional current-owner check and show Current, Incoming and Resulting meanings for non-trivial transformations.",
      "Preserve optional relation-backed Implementation Ideas as separate Planning Items rather than copied text.",
      "Explicit review remains required.",
      "Do not edit repository files, create an archive, commit or push."
    ],
    "userTarget": "<source/discussion to form items from>",
    "palette": true,
    "refinements": []
  },
  {
    "schemaVersion": 1,
    "id": "command.plan",
    "file": "plan-command.command.md",
    "command": "спланируй команду",
    "englishName": "plan command",
    "commandFamily": [
      "спланируй команду",
      "plan command"
    ],
    "description": "plan command",
    "meaning": "Plan a command route and its documentation changes without implementing it.",
    "activeContextBehavior": "Ask which command only when the target command is unclear.",
    "traversalReadMode": "Documentation-principles preflight, then targeted/full command-route reads.",
    "ownerFiles": [
      "planning/documentation/documentation-principles-read-workflow.md",
      "planning/documentation/file-update-overview-workflow.md",
      "planning/documentation/FILE-UPDATE-OVERVIEW-TEMPLATE.md",
      "planning/documentation/command-planning-workflow.md",
      "planning/documentation/use-case-map-workflow.md",
      "planning/documentation/USE-CASE-MAP-TEMPLATE.md"
    ],
    "expectedOutput": "Command family/type/English name/owner/registry/example/projection plan followed by План файл-обновление.",
    "permissionMode": "plan-only",
    "keyReminders": [
      "Plan a command route only.",
      "Run the documentation-principles preflight.",
      "Produce a file-update plan and read command-specific owners.",
      "Tampermonkey is projection, not source of truth.",
      "Do not edit files, create an archive, commit or push."
    ],
    "userTarget": "<what command route should be planned>",
    "palette": true,
    "refinements": []
  },
  {
    "schemaVersion": 1,
    "id": "file_update.plan",
    "file": "plan-file-update.command.md",
    "command": "план файл-обновление",
    "englishName": "plan file update",
    "commandFamily": [
      "план файл-обновление",
      "спланируй обновление файлов",
      "спланируй архив",
      "plan file update",
      "archive plan"
    ],
    "description": "file plan",
    "meaning": "Produce a concrete file/docs/code/archive update plan.",
    "activeContextBehavior": "Ask target/scope only when active context does not make it clear.",
    "traversalReadMode": "Reuse/targeted/full by update risk.",
    "ownerFiles": [
      "planning/documentation/file-update-overview-workflow.md",
      "planning/documentation/FILE-UPDATE-OVERVIEW-TEMPLATE.md"
    ],
    "expectedOutput": "Plan with files, responsibilities, what/why/boundaries/checks/next action.",
    "permissionMode": "plan-only",
    "keyReminders": [
      "Plan file/docs/code/archive update only.",
      "Treat only explicit user statements and checked source facts as confirmed.",
      "For important unknowns, show prioritized questions with one conservative fallback instruction.",
      "End with `План файл-обновление` in planned mode.",
      "Do not edit files.",
      "Do not create archive unless separately requested."
    ],
    "userTarget": "<what update/archive should be planned>",
    "palette": true,
    "refinements": []
  },
  {
    "schemaVersion": 1,
    "id": "plan.now",
    "file": "plan-now.command.md",
    "command": "планируй",
    "englishName": "plan now",
    "commandFamily": [
      "планируй",
      "plan now"
    ],
    "description": "plan now",
    "meaning": "Plan the next concrete step now from active context.",
    "activeContextBehavior": "Use active context if available; otherwise ask for target.",
    "traversalReadMode": "Reuse/targeted by uncertainty.",
    "ownerFiles": [],
    "expectedOutput": "Concrete next step/scope/boundary/evidence/next action.",
    "permissionMode": "plan-only",
    "keyReminders": [
      "Plan the next concrete step now.",
      "Treat only explicit user statements and checked source facts as confirmed.",
      "For important unknowns, show prioritized questions with one conservative fallback instruction.",
      "State scope, boundary, evidence and next action.",
      "Do not edit files or create archive unless separately requested."
    ],
    "userTarget": "<what should be planned>",
    "palette": true,
    "refinements": []
  },
  {
    "schemaVersion": 1,
    "id": "documentation_principles.read",
    "file": "read-documentation-principles.command.md",
    "command": "прочитай принципы документации",
    "englishName": "read documentation principles",
    "commandFamily": [
      "прочитай принципы документации",
      "прочти принципы документации",
      "принципы документации",
      "read documentation principles",
      "documentation principles",
      "docs principles"
    ],
    "description": "documentation preflight",
    "meaning": "Perform the documentation architecture/ownership/update preflight.",
    "activeContextBehavior": "Use active documentation task if clear; otherwise report the reusable read path and ask only for target when needed.",
    "traversalReadMode": "Full when not read/remembered or uncertain; targeted refresh only after a current full pass.",
    "ownerFiles": [
      "planning/documentation/documentation-principles-read-workflow.md",
      "planning/documentation/planning-docs-architecture-principles.md",
      "planning/documentation/documentation-responsibility-map.md"
    ],
    "expectedOutput": "Read-only checked/not-checked/authority/owner-zone/read-route/boundary report.",
    "permissionMode": "read-only",
    "keyReminders": [
      "Read-only documentation architecture, ownership and update preflight.",
      "Use full mode when the route has not been read, is not remembered, or ownership/boundaries are uncertain.",
      "Use targeted refresh only after a current full pass.",
      "Report Checked, Not checked, Authority/layer, Correct owner zone, Required route read and Boundaries.",
      "Do not edit files, create an archive, commit or push."
    ],
    "userTarget": "<documentation task or owner question>",
    "palette": true,
    "refinements": []
  },
  {
    "schemaVersion": 1,
    "id": "context_recheck.apply",
    "file": "recheck-context.command.md",
    "command": "обс",
    "englishName": "recheck context",
    "commandFamily": [
      "обс",
      "chat rech",
      "recheck"
    ],
    "description": "context recheck",
    "meaning": "Recheck prior answer/context/sources/diff before continuing.",
    "activeContextBehavior": "Use current conversation target; ask if unclear.",
    "traversalReadMode": "Targeted/full by risk.",
    "ownerFiles": [],
    "expectedOutput": "Corrected answer/review with uncertainty stated.",
    "permissionMode": "read-only",
    "keyReminders": [
      "Re-check relevant prior discussion.",
      "Preserve accepted decisions and constraints.",
      "State what was checked and what remains unavailable."
    ],
    "userTarget": "<what discussion/context should be rechecked>",
    "palette": true,
    "refinements": []
  },
  {
    "schemaVersion": 1,
    "id": "planning_items.reconcile",
    "file": "reconcile-planning-items.command.md",
    "command": "сверь айтемы",
    "englishName": "reconcile planning items",
    "commandFamily": [
      "сверь айтемы",
      "сверь айтемы с документацией",
      "проверь айтемы по репозиторию",
      "reconcile planning items",
      "reconcile items"
    ],
    "description": "workflow integrity + traceable item transformations",
    "meaning": "Reconcile selected working/local/unprocessed Planning Items against current owners and workflow integrity.",
    "activeContextBehavior": "Use the clearly active item set or same-message attached item source; ask only when missing or ambiguous.",
    "traversalReadMode": "Targeted/full by independent End-To-End Workflow or affected non-workflow review object.",
    "ownerFiles": [
      "planning/documentation/application-planning/application-planning-drafting-workflow.md"
    ],
    "expectedOutput": "Read-only reconciliation with workflow-integrity verdicts, traceable transformations and resulting canonical item set.",
    "permissionMode": "read-only",
    "keyReminders": [
      "Reconcile the selected working, local or unprocessed Planning Items with relevant current repository documentation.",
      "Identify each genuinely independent End-To-End Workflow and each affected non-workflow primary review object.",
      "For every End-To-End Workflow, trace trigger, preconditions, mandatory stages, branches/loops, review gates and result/end state, then report the workflow-integrity verdict.",
      "Do not split one mandatory workflow into peer workflow candidates or slices. If one owns a missing mandatory stage, combine the slices or reclassify them as supporting artifacts.",
      "Treat Planning Drafts, models, views, terminology, root summaries and capability/detail slices as supporting or non-workflow primary review objects unless they have an independent trigger-to-result lifecycle.",
      "Review several End-To-End Workflows separately only when each is independently traversable; then check cross-workflow and resulting-item-set consistency.",
      "Show the complete before/after workflow or non-workflow review object, including changed and preserved parts, purpose, boundaries, conflicts and unresolved choices.",
      "For each selected workflow/review object, show the current canonical item set, incoming meanings with semantic names and IDs only as secondary traceability, proposed actions and the resulting canonical item set.",
      "For every non-trivial transformation, show original/current item(s), every incoming/expanding/correcting meaning and resulting item(s) separately in one small variable-row table; use — where a field does not apply and do not show only the result.",
      "Do not assume one incoming item becomes one new canonical item: it may keep, update, rename, add, merge, split, move, link, defer, supersede, remove or reject meaning.",
      "Preserve relevant hypothesis, risk, key-situation and prototype/test context through item transformations; report a compact prototype/risk follow-up without creating a prototype or accepting architecture.",
      "Do not edit files, update item registers, create an archive, commit or push."
    ],
    "userTarget": "<which items or item source should be reconciled>",
    "palette": true,
    "refinements": []
  },
  {
    "schemaVersion": 1,
    "id": "returned_files.revise",
    "file": "revise-returned-files.command.md",
    "command": "обн",
    "englishName": "revise returned files",
    "commandFamily": [
      "обн",
      "upd"
    ],
    "description": "revise returned files",
    "meaning": "Review user-edited returned Markdown/docs/planning-draft files and produce complete revised versions.",
    "activeContextBehavior": "Same-message returned files are the selected working versions; compare with clearly matching prior versions when available.",
    "traversalReadMode": "Full read of every returned file; targeted read of matching prior versions and relevant owners/templates.",
    "ownerFiles": [
      "planning/documentation/reviewable-agent-output-and-commands-workflow.md"
    ],
    "expectedOutput": "Complete revised affected files plus compact significant-adjustment and unresolved-conflict summary.",
    "permissionMode": "response-only",
    "keyReminders": [
      "Treat same-message returned files as the selected working versions.",
      "Read every returned file completely.",
      "Compare with clearly matching prior versions when available.",
      "Preserve deliberate user edits unless they conflict with checked owner/safety rules or same-message clarification.",
      "Return complete revised files, not isolated fragments.",
      "Do not edit the repository, create an archive, commit or push unless separately requested."
    ],
    "userTarget": "<returned files and clarification to revise>",
    "palette": false,
    "refinements": []
  },
  {
    "schemaVersion": 1,
    "id": "parallel_workspace.start",
    "file": "start-parallel-work.command.md",
    "command": "начни параллельную работу",
    "englishName": "start parallel work",
    "commandFamily": [
      "начни параллельную работу",
      "start parallel work",
      "parallel workspace"
    ],
    "description": "parallel workspace",
    "meaning": "Start or plan one staging-only parallel workspace.",
    "activeContextBehavior": "Ask scope if no concrete agent/workstream target.",
    "traversalReadMode": "Targeted/full by workspace scope.",
    "ownerFiles": [
      "planning/documentation/parallel-work/README.md",
      "planning/documentation/parallel-work/parallel-workflow.md",
      "planning/documentation/parallel-work/PARALLEL-WORKSPACE-TEMPLATE.md"
    ],
    "expectedOutput": "Parallel workspace plan/package when requested; no direct canonical-doc edits.",
    "permissionMode": "staging-only",
    "keyReminders": [
      "Start one staging-only workspace only for a concrete target.",
      "Do not edit shared canonical docs directly from workspace phase.",
      "Do not create aggregate sync until a sync-candidate workspace exists."
    ],
    "userTarget": "<parallel agent/workstream target>",
    "palette": true,
    "refinements": []
  },
  {
    "schemaVersion": 1,
    "id": "archive_source.use",
    "file": "use-archive.command.md",
    "command": "арх",
    "englishName": "use archive",
    "commandFamily": [
      "арх",
      "из архива",
      "added arch",
      "use archive"
    ],
    "description": "archive source",
    "meaning": "Treat an explicitly selected archive as the read-source snapshot.",
    "activeContextBehavior": "Use only the archive explicitly selected for this invocation and state identity/freshness limits.",
    "traversalReadMode": "Archive read-source mode; targeted/full depending on question.",
    "ownerFiles": [],
    "expectedOutput": "Answer/review/plan from the selected archive; no replacement package unless separately requested.",
    "permissionMode": "read-only",
    "keyReminders": [
      "Read-source mode, not output-package mode.",
      "Use only the archive explicitly selected for this invocation.",
      "Do not silently treat an earlier-message archive as current.",
      "Do not create replacement archive unless separately requested.",
      "State archive freshness/source limits when relevant."
    ],
    "userTarget": "<what should be checked from archive>",
    "palette": true,
    "refinements": []
  }
];
  const api=globalThis.ObsPlanningHelper;
  if(!api||typeof api.startPlanningHelper!=='function')throw new Error('OBS Planning Helper runtime was not built correctly.');
  api.startPlanningHelper({bundledCommands:commands}).catch((error)=>console.error('[OBS Planning Helper startup]',error));
})();
