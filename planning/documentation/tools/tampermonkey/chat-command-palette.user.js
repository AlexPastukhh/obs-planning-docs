// ==UserScript==
// @name         Reusable Chat Planning Helper
// @namespace    https://github.com/AlexPastukhh/obs/reusable-docs
// @version      0.25.0-repository-command-registry
// @description  RAM-first OBS Planning Helper with explicit GitHub check/save/sync for commands and prompts.
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
        '  Start from `planning/command-routing.md`.',
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
      '  Start from `planning/command-routing.md`.',
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

  const SURFACES = Object.freeze({ ORIENTATION:'Orientation', DIRECTIONS:'Directions', USE_CASES:'Use Cases', COMMANDS:'Commands', LOCAL_COMMANDS:'Local Cmds', PROMPTS:'Prompts' });
  const MODE = Object.freeze({ ADAPTIVE:'adaptive', FULL:'full' });

  const ORIENTATION_DEFINITIONS=[{
    id:'OBS-PLANNING-ORIENTATION',label:'OBS Planning Orientation',description:'repository → Direction → semantic registry/owner',
    sources:['planning/README.md','planning/AI-WORKING-CONTRACT.md','planning/direction-registry.md','planning/use-case-registry.md'],
    instruction:'Explain the current repository architecture and help select a Direction / semantic capability / canonical owner. Workspace methodology uses Use Cases; Applications use Scenario Catalogs. Commands are optional shortcuts.',target:'<repository/planning context>'
  }];

  const DIRECTION_DEFINITIONS=[
    {id:'DIR-REPOSITORY',label:'Orient In And Work With The Repository',description:'root repository capabilities',sources:['planning/direction-registry.md','planning/use-case-registry.md'],instruction:'Establish repository-wide semantic context and select the relevant Use Case.',target:'<repository task>'},
    {id:'DIR-PLAN-SOLUTION',label:'Plan A Solution / Workflow / Application',description:'whole solution → concept/prototype → current behavior → domain/delivery',sources:['planning/direction-registry.md','planning/documentation/application-planning/direction-registry.md','planning/documentation/application-planning/use-case-registry.md'],instruction:'Plan the whole solution first; when own Application responsibility exists, use the current selected planning Use Case such as Prototype, Scenario, Domain, Slice Strategy or one Slice. Rough walkthroughs are ordinary discovery techniques.',target:'<solution/application target>'},
    {id:'DIR-PLAN-WORKSPACE',label:'Plan / Review Workspace Capabilities',description:'Workspace UC → rules → vertical realization',sources:['planning/direction-registry.md','planning/documentation/workspace-planning/direction-registry.md','planning/documentation/workspace-planning/use-case-registry.md'],instruction:'Plan evolving Workspace capability changes through the selected Workspace Use Case. Keep Step 1/2/3 inside that UC, reuse generic UC identity and Architecture owners, and do not treat the Helper as semantic authority.',target:'<Workspace capability target>'},
    {id:'DIR-PLAN-ARCHITECTURE',label:'Plan / Review Workspace Architecture',description:'architecture state, paths, pressure, decisions and evolution',sources:['planning/direction-registry.md','planning/documentation/architecture-planning/direction-registry.md','planning/documentation/architecture-planning/use-case-registry.md'],instruction:'Use Architecture Planning to review current architecture, paths/change pressure and material decisions from canonical Workspace UCs and architecture-relevant candidates. Do not treat architecture-input discovery as canonical Workspace UC establishment/change authority.',target:'<Workspace architecture target>'},
    {id:'DIR-PLAN-TESTING',label:'Plan / Review Verification And Testing',description:'testing strategy, proof design and actual evidence review',sources:['planning/direction-registry.md','planning/documentation/testing-planning/direction-registry.md','planning/documentation/testing-planning/use-case-registry.md'],instruction:'Select Testing Strategy, Test Design or Current Test Coverage/Evidence Review. Tests remain evidence, not semantic authority.',target:'<testing target>'},
    {id:'DIR-DOCUMENTATION',label:'Use And Maintain Repository Documentation',description:'documentation governance',sources:['planning/direction-registry.md','planning/documentation/direction-registry.md','planning/documentation/use-case-registry.md'],instruction:'Select the documentation Use Case and follow reusable documentation governance/owner rules.',target:'<documentation target>'},
    {id:'DIR-DOCUMENTATION-WORKBENCH',label:'Develop And Maintain Documentation Workbench',description:'project-local documentation workbench',sources:['planning/direction-registry.md','planning/areas/documentation-workbench/direction-registry.md','planning/areas/documentation-workbench/use-case-registry.md'],instruction:'Establish current Workbench Use Case / Scenario context; historical Planning Item/Draft sources are provenance only.',target:'<workbench target>'},
    {id:'DIR-PLANNING-RUNTIME',label:'Use The OBS Planning Runtime',description:'dashboard/session runtime',sources:['planning/direction-registry.md','planning/areas/planning-system/direction-registry.md','planning/areas/planning-system/use-case-registry.md'],instruction:'Establish current planning-runtime capability without conflating runtime mechanics with reusable methodology.',target:'<planning runtime target>'},
    {id:'DIR-PLANNING-HELPER',label:'Use And Maintain Planning Helper',description:'helper application',sources:['planning/direction-registry.md','planning/documentation/tools/tampermonkey/chat-command-palette/direction-registry.md','planning/documentation/tools/tampermonkey/chat-command-palette/scenarios/README.md'],instruction:'Use the Planning Helper Scenario Catalog and Scenario owners; helper remains projection/runtime, not planning authority.',target:'<Planning Helper target>'},
    {id:'DIR-LINKED-NOTES',label:'Use And Maintain Linked Notes',description:'Linked Notes application',sources:['planning/direction-registry.md','planning/documentation/tools/tampermonkey/linked-notes/direction-registry.md','planning/documentation/tools/tampermonkey/linked-notes/scenarios/README.md'],instruction:'Use the Linked Notes Scenario Catalog and detailed Scenario owners.',target:'<Linked Notes target>'},
    {id:'DIR-REPLACEMENT-PACKAGE-APP',label:'Apply / Review / Finalize Replacement Packages',description:'replacement package consumer app',sources:['planning/direction-registry.md','planning/documentation/tools/replacement-package-app/direction-registry.md','planning/documentation/tools/replacement-package-app/USE-CASE-REGISTRY.md'],instruction:'Use Replacement Package App Use Cases and detailed Scenario owners; do not redefine producer command semantics.',target:'<replacement package app target>'}
  ];

  const USE_CASE_DEFINITIONS=[{"id":"UC-REPO-ORIENT","label":"Orient In Repository And Resolve Work Route","description":"natural repository discovery","sources":["planning/use-case-registry.md"],"instruction":"Read the canonical Use-Case entry, follow its owner route and preserve its boundaries. Do not treat helper projection as semantic authority.","target":"<Orient In Repository And Resolve Work Route target>"},{"id":"UC-REPO-CURRENT-STATE","label":"Report Current Repository / Planning State","description":"open canonical Use-Case entry","commandId":"current_state.report"},{"id":"UC-REPO-PLAN-NEXT","label":"Plan The Next Concrete Step","description":"open canonical Use-Case entry","commandId":"plan.now"},{"id":"UC-REPO-RECHECK-CONTEXT","label":"Recheck Current Context Before Continuing","description":"open canonical Use-Case entry","commandId":"context_recheck.apply"},{"id":"UC-REPO-CRITICAL-REVIEW","label":"Critically Review A Claim / Plan / Diff","description":"open canonical Use-Case entry","commandId":"critical_review.apply"},{"id":"UC-REPO-USE-ARCHIVE-SOURCE","label":"Use An Explicit Archive As Read Source","description":"open canonical Use-Case entry","commandId":"archive_source.use"},{"id":"UC-REPO-DEFINE-PARALLEL-SCOPES","label":"Define / Maintain Fixed Parallel-Work Scopes","description":"open canonical Use-Case entry","sources":["planning/use-case-registry.md","parallel-work-scope-registry.md"],"instruction":"Read the root Scope Registry and reusable scope/log workflow. Change registered boundaries only as an explicit repository-architecture update; do not repartition scopes ad hoc.","target":"<parallel-scope architecture target>"},{"id":"UC-REPO-PARALLEL-WORK","label":"Work In Registered Parallel Scope(s)","description":"open canonical Use-Case entry","commandId":"parallel_workspace.start"},{"id":"UC-PLAN-REALITY","label":"Understand Current Workflow And Reality","description":"checked current reality before solution choice","sources":["planning/documentation/application-planning/use-case-registry.md"],"instruction":"Resolve this exact canonical Use-Case entry, follow its current owner route, keep this Use Case as the active planning focus and preserve neighboring-owner boundaries.","target":"<Understand Current Workflow And Reality target>"},{"id":"UC-PLAN-COLLECT-IDEAS","label":"Collect And Review Ideas From Selected Source","description":"command-backed Idea collection/review","commandId":"ideas.collect"},{"id":"UC-PLAN-SOLUTION","label":"Plan / Review Whole Solution Or Workflow","description":"integrated real-world solution/workflow choice","sources":["planning/documentation/application-planning/use-case-registry.md"],"instruction":"Resolve this exact canonical Use-Case entry, follow its current owner route, keep this Use Case as the active planning focus and preserve neighboring-owner boundaries.","target":"<Plan / Review Whole Solution Or Workflow target>"},{"id":"UC-PLAN-RESEARCH","label":"Research Existing Solutions / Alternatives","description":"proportional evidence gathering for solution choice","sources":["planning/documentation/application-planning/use-case-registry.md"],"instruction":"Resolve this exact canonical Use-Case entry, follow its current owner route, keep this Use Case as the active planning focus and preserve neighboring-owner boundaries.","target":"<Research Existing Solutions / Alternatives target>"},{"id":"UC-PLAN-APP-CONCEPT","label":"Plan / Review Application Concept","description":"custom-app value/feasibility candidate before detailed behavior","sources":["planning/documentation/application-planning/use-case-registry.md"],"instruction":"Resolve this exact canonical Use-Case entry, follow its current owner route, keep this Use Case as the active planning focus and preserve neighboring-owner boundaries.","target":"<Plan / Review Application Concept target>"},{"id":"UC-PLAN-APPLICATION","label":"Establish Application Responsibility","description":"selected application inside/outside responsibility boundary","sources":["planning/documentation/application-planning/use-case-registry.md"],"instruction":"Resolve this exact canonical Use-Case entry, follow its current owner route, keep this Use Case as the active planning focus and preserve neighboring-owner boundaries.","target":"<Establish Application Responsibility target>"},{"id":"UC-PLAN-PROTOTYPE","label":"Prototype Application Experience / Workflow","description":"provisional interaction/workflow scenarios/screens and evidence","sources":["planning/documentation/application-planning/use-case-registry.md"],"instruction":"Resolve the Prototype Use-Case entry and follow the complete current Prototype owner route. Focus on provisional Prototype Scenarios/Screens, Requirements/DATA/Behavior findings and evidence; treat rough walkthroughs only as discovery techniques and do not promote prototype artifacts to canonical Scenario/Screen truth automatically.","target":"<Prototype Application Experience / Workflow target>"},{"id":"UC-PLAN-SCENARIO-DISCOVERY","label":"Discover Application Scenarios","description":"current Need/result behavioral boundaries","sources":["planning/documentation/application-planning/use-case-registry.md"],"instruction":"Resolve the Scenario Discovery Use-Case entry and follow its current owner route. Focus on current meaningful Need/result boundaries; use prototype/rough-walkthrough evidence only as input and keep commands/actions/implementation operations from becoming Scenarios mechanically.","target":"<Discover Application Scenarios target>"},{"id":"UC-PLAN-SCENARIO","label":"Draft / Review Detailed Scenario","description":"canonical detailed current behavior + DATA/Behavior/Requirements","sources":["planning/documentation/application-planning/use-case-registry.md"],"instruction":"Resolve this exact canonical Use-Case entry, follow its current owner route, keep this Use Case as the active planning focus and preserve neighboring-owner boundaries.","target":"<Draft / Review Detailed Scenario target>"},{"id":"UC-PLAN-DOMAIN-DISCOVERY","label":"Discover Domain Evidence / Candidates","description":"evidence-backed Domain concepts, lifecycle, invariants and consistency candidates","sources":["planning/documentation/application-planning/use-case-registry.md"],"instruction":"Resolve this exact canonical Use-Case entry and follow domain-discovery-workflow.md. Discover evidence and candidates without silently selecting Domain authority.","target":"<Domain discovery target>"},{"id":"UC-PLAN-REALIZATION","label":"Review High-Level Application Realization","description":"high-level runtime/persistence/integration feasibility review","sources":["planning/documentation/application-planning/use-case-registry.md"],"instruction":"Resolve this exact canonical Use-Case entry and follow application-realization-workflow.md. Review representative realization paths without letting implementation convenience redefine upstream semantics.","target":"<Application realization target>"},{"id":"UC-PLAN-DOMAIN","label":"Plan / Review Domain","description":"stable semantics, invariants and justified variation","sources":["planning/documentation/application-planning/use-case-registry.md"],"instruction":"Resolve the Domain Use-Case entry and follow the complete current Domain planning route. Focus on stable semantics, current Requirements/Scenarios, invariants vs policies, justified Change Axes and premature-generalization checks; do not redesign upstream behavior silently.","target":"<Plan / Review Domain target>"},{"id":"UC-PLAN-SLICE-STRATEGY","label":"Plan / Review Slice Strategy","description":"vertical implementation decomposition/order","sources":["planning/documentation/application-planning/use-case-registry.md"],"instruction":"Resolve this exact canonical Use-Case entry, follow its current owner route, keep this Use Case as the active planning focus and preserve neighboring-owner boundaries.","target":"<Plan / Review Slice Strategy target>"},{"id":"UC-PLAN-SLICE","label":"Plan / Review One Implementation Slice","description":"one selected separately deliverable/checkable increment","sources":["planning/documentation/application-planning/use-case-registry.md"],"instruction":"Resolve this exact canonical Use-Case entry, follow its current owner route, keep this Use Case as the active planning focus and preserve neighboring-owner boundaries.","target":"<Plan / Review One Implementation Slice target>"},{"id":"UC-PLAN-GOAL-MAP","label":"Maintain A Reusable Goal Map","description":"current compact goal/work-direction view","sources":["planning/documentation/application-planning/use-case-registry.md","planning/documentation/application-planning/goal-map.md"],"instruction":"Use the reusable Goal Map only as a current/forward-looking working picture; keep independent semantic meaning in its canonical owners and history in scope logs.","target":"<goal/work direction>"},{"id":"UC-PLAN-CONSISTENCY","label":"Review Cross-Scenario / Screen / Requirement / Domain / Slice Consistency","description":"cross-owner contradiction/change-impact review","sources":["planning/documentation/application-planning/use-case-registry.md"],"instruction":"Resolve this exact canonical Use-Case entry, follow its current owner route, keep this Use Case as the active planning focus and preserve neighboring-owner boundaries.","target":"<Review Cross-Scenario / Screen / Requirement / Domain / Slice Consistency target>"},{"id":"UC-DOC-ORIENT","label":"Bootstrap Reusable Documentation Governance","description":"open reusable documentation bootstrap command","commandId":"documentation_principles.read"},{"id":"UC-DOC-FIND-OWNER","label":"Determine Where Information Belongs","description":"open canonical Use-Case entry","sources":["planning/documentation/use-case-registry.md"],"instruction":"Read the canonical Use-Case entry, follow its owner route and preserve its boundaries. Do not treat helper projection as semantic authority.","target":"<Determine Where Information Belongs target>"},{"id":"UC-DOC-PLAN-UPDATE","label":"Plan A Documentation Update","description":"open canonical Use-Case entry","sources":["planning/documentation/use-case-registry.md"],"instruction":"Read the canonical Use-Case entry, follow its owner route and preserve its boundaries. Do not treat helper projection as semantic authority.","target":"<Plan A Documentation Update target>"},{"id":"UC-DOC-UPDATE","label":"Perform An Approved Documentation Update","description":"open canonical Use-Case entry","sources":["planning/documentation/use-case-registry.md"],"instruction":"Read the canonical Use-Case entry, follow its owner route and preserve its boundaries. Do not treat helper projection as semantic authority.","target":"<Perform An Approved Documentation Update target>"},{"id":"UC-DOC-PLAN-FILE-UPDATE","label":"Plan Concrete File / Docs / Code Update","description":"open canonical Use-Case entry","commandId":"file_update.plan"},{"id":"UC-DOC-BUILD-REPLACEMENT-PACKAGE","label":"Build Replacement Package","description":"open canonical Use-Case entry","commandId":"replacement_archive.create"},{"id":"UC-DOC-BUILD-REVIEWABLE-ARCHIVE","label":"Build Legacy Review-Diff Archive Route","description":"open canonical Use-Case entry","commandId":"replacement_archive.review_diff.create"},{"id":"UC-DOC-REVIEW-DIFF","label":"Semantically Review A Repository ReviewDiff","description":"semantic ReviewDiff correctness review","sources":["planning/documentation/use-case-registry.md"],"instruction":"Read the canonical Use-Case entry, follow its owner route and preserve its boundaries. Do not treat helper projection as semantic authority.","target":"<Semantically Review A Repository ReviewDiff target>"},{"id":"UC-DOC-REVISE-RETURNED-FILES","label":"Reconcile User-Returned Files","description":"open canonical Use-Case entry","commandId":"returned_files.revise"},{"id":"UC-DOC-MAINTAIN-NAVIGATION","label":"Maintain Repository Documentation Navigation","description":"open canonical Use-Case entry","sources":["planning/documentation/use-case-registry.md"],"instruction":"Read the canonical Use-Case entry, follow its owner route and preserve navigation-vs-semantic-owner boundaries. Do not treat helper projection as semantic authority.","target":"<Maintain Repository Documentation Navigation target>"},{"id":"UC-DOC-MAINTAIN-REGISTRIES","label":"Maintain Directions And Use Cases","description":"open canonical Use-Case entry","sources":["planning/documentation/use-case-registry.md"],"instruction":"Read the canonical Use-Case entry, follow its owner route and preserve its boundaries. Do not treat helper projection as semantic authority.","target":"<Maintain Directions And Use Cases target>"},{"id":"UC-DOC-MAINTAIN-COMMAND","label":"Create Or Maintain Command Routing","description":"open canonical Use-Case entry","commandId":"command.plan"},{"id":"UC-DOC-REVIEW-COVERAGE","label":"Review Repository Navigation / Use-Case Coverage","description":"open canonical Use-Case entry","sources":["planning/documentation/use-case-registry.md"],"instruction":"Read the canonical Use-Case entry, follow its owner route and preserve its boundaries. Do not treat helper projection as semantic authority.","target":"<Review Repository Navigation / Use-Case Coverage target>"},{"id":"UC-DOC-REVIEW-EXAMPLES","label":"Review Practical Example Coverage","description":"open canonical Use-Case entry","sources":["planning/documentation/use-case-registry.md"],"instruction":"Read the canonical Use-Case entry, follow its owner route and preserve its boundaries. Do not treat helper projection as semantic authority.","target":"<Review Practical Example Coverage target>"},{"id":"UC-DOC-RECONCILE-STATUS","label":"Reconcile Documentation / Owner Status","description":"open canonical Use-Case entry","sources":["planning/documentation/use-case-registry.md"],"instruction":"Read the canonical Use-Case entry, follow its owner route and preserve its boundaries. Do not treat helper projection as semantic authority.","target":"<Reconcile Documentation / Owner Status target>"},{"id":"UC-DW-DOC-REF","label":"Repository Documentation Change And Reference Review","description":"open canonical Use-Case entry","sources":["planning/areas/documentation-workbench/use-case-registry.md"],"instruction":"Read the canonical Use-Case entry, follow its owner route and preserve its boundaries. Do not treat helper projection as semantic authority.","target":"<Repository Documentation Change And Reference Review target>"},{"id":"UC-DW-PLANNING-TO-REPOSITORY","label":"Planning Meaning To Repository","description":"open canonical Use-Case entry","sources":["planning/areas/documentation-workbench/use-case-registry.md"],"instruction":"Read the canonical Use-Case entry, follow its owner route and preserve its boundaries. Do not treat helper projection as semantic authority.","target":"<Planning Meaning To Repository target>"},{"id":"UC-PR-END-SESSION","label":"End Active Planning Session","description":"open canonical Use-Case entry","commandId":"session.end"},{"id":"UC-PLAN-WORKSPACE-ESTABLISH-UC","label":"Establish Workspace Use Case","description":"establish one justified new Workspace capability through proportional Step 1/2/3 planning","sources":["planning/documentation/workspace-planning/use-case-registry.md"],"instruction":"Resolve this exact Workspace Planning Use-Case entry, follow its Establish workflow/current owner route and preserve generic UC/Architecture authority boundaries.","target":"<candidate Workspace capability>"},{"id":"UC-PLAN-WORKSPACE-CHANGE-UC","label":"Review / Change Workspace Use Case","description":"integrate selected change meaning into one existing Workspace UC through proportional Step 1/2/3 planning","sources":["planning/documentation/workspace-planning/use-case-registry.md"],"instruction":"Resolve this exact Workspace Planning Use-Case entry, follow its Review/Change workflow/current owner route and keep all selected Ideas for the UC in one integrated target.","target":"<existing Workspace UC change>"},{"id":"UC-PLAN-WORKSPACE-REVIEW-TOPOLOGY","label":"Review Workspace Use-Case Topology","description":"review multi-UC boundaries/relations when coherent topology is independently useful","sources":["planning/documentation/workspace-planning/use-case-registry.md"],"instruction":"Resolve this exact proportional Workspace Planning topology Use Case. Activate it for real multi-UC boundary/relationship/topology concerns, not merely because one Idea affects several independent UCs.","target":"<multi-UC topology concern>"},{"id":"UC-PLAN-ARCH-STATE","label":"Understand / Review Workspace Architecture State","description":"current architecture state and maintainability review","sources":["planning/documentation/architecture-planning/use-case-registry.md"],"instruction":"Resolve this exact Architecture Planning Use-Case entry and follow its current owner route.","target":"<architecture state target>"},{"id":"UC-PLAN-ARCH-PATH","label":"Trace / Evaluate Architecture-Relevant Path","description":"trace understanding, change or runtime path as architecture evidence","sources":["planning/documentation/architecture-planning/use-case-registry.md"],"instruction":"Resolve this exact Architecture Planning Use-Case entry and follow its current owner route.","target":"<architecture path target>"},{"id":"UC-PLAN-ARCH-PRESSURE","label":"Establish / Review Workspace Change Pressure","description":"evidence-backed change pressure, axes and hot paths","sources":["planning/documentation/architecture-planning/use-case-registry.md"],"instruction":"Resolve this exact Architecture Planning Use-Case entry and follow its current owner route; consume Workspace Use-Case discovery when needed.","target":"<architecture pressure target>"},{"id":"UC-PLAN-ARCH-DECISION","label":"Plan / Review One Material Architecture Decision","description":"compare and select one material architecture choice","sources":["planning/documentation/architecture-planning/use-case-registry.md"],"instruction":"Resolve this exact Architecture Planning Use-Case entry and follow its current owner route; route selected meaning to the narrowest real semantic owner.","target":"<architecture decision target>"},{"id":"UC-PLAN-ARCH-EVOLUTION","label":"Plan / Review Workspace Architecture Evolution","description":"coordinated multi-decision architecture evolution","sources":["planning/documentation/architecture-planning/use-case-registry.md"],"instruction":"Resolve this exact Architecture Planning Use-Case entry and follow its current owner route.","target":"<architecture evolution target>"},{"id":"UC-PLAN-ARCH-WORKSPACE-USES","label":"Discover / Review Workspace Use Cases","description":"architecture-relevant Workspace capability discovery","sources":["planning/documentation/architecture-planning/use-case-registry.md"],"instruction":"Resolve this exact Architecture Planning Use-Case entry and follow workspace-use-case-discovery-workflow.md.","target":"<Workspace uses target>"},{"id":"UC-PLAN-TEST-STRATEGY","label":"Establish / Review Testing Strategy","description":"shared/cross-Slice testing strategy","sources":["planning/documentation/testing-planning/use-case-registry.md"],"instruction":"Resolve this Testing Planning Use Case and follow its strategy owner route.","target":"<testing strategy target>"},{"id":"UC-PLAN-TEST-DESIGN","label":"Plan / Review Verification For Selected Behavior","description":"Behavior-to-Test proof design","sources":["planning/documentation/testing-planning/use-case-registry.md"],"instruction":"Resolve this Testing Planning Use Case and follow test-design-workflow.md.","target":"<behavior proof target>"},{"id":"UC-PLAN-TEST-COVERAGE","label":"Review Current Test Coverage / Evidence","description":"audit actual current test evidence","sources":["planning/documentation/testing-planning/use-case-registry.md"],"instruction":"Resolve this Testing Planning Use Case and inspect actual evidence; plans/test names do not prove coverage.","target":"<coverage review target>"},{"id":"UC-DOC-CONFIGURE-REVIEW-DEPENDENCIES","label":"Configure Required Dependency Reviews","description":"register source changes that must signal consumer review","sources":["planning/documentation/use-case-registry.md","planning/documentation/review-dependency-planning-workflow.md"],"instruction":"Configure a semantic source→consumer review obligation; use Linked Notes as the selected mechanism when implemented. Do not perform or propagate semantic edits automatically.","target":"<review dependency target>"},{"id":"UC-RPKG-APPLY","label":"Apply Verified Replacement Package","description":"open canonical Use-Case entry","sources":["planning/documentation/tools/replacement-package-app/USE-CASE-REGISTRY.md"],"instruction":"Read the canonical Use-Case entry, follow its owner route and preserve its boundaries. Do not treat helper projection as semantic authority.","target":"<Apply Verified Replacement Package target>"},{"id":"UC-RPKG-REVIEW","label":"Inspect Current ChangeSet Review State","description":"open canonical Use-Case entry","sources":["planning/documentation/tools/replacement-package-app/USE-CASE-REGISTRY.md"],"instruction":"Read the canonical Use-Case entry, follow its owner route and preserve its boundaries. Do not treat helper projection as semantic authority.","target":"<Inspect Current ChangeSet Review State target>"},{"id":"UC-RPKG-FINALIZE","label":"Finalize Current ChangeSet","description":"open canonical Use-Case entry","sources":["planning/documentation/tools/replacement-package-app/USE-CASE-REGISTRY.md"],"instruction":"Read the canonical Use-Case entry, follow its owner route and preserve its boundaries. Do not treat helper projection as semantic authority.","target":"<Finalize Current ChangeSet target>"},{"id":"UC-RPKG-EXPORT-REPOSITORY","label":"Export Repository Snapshot ZIP","description":"open canonical Use-Case entry","sources":["planning/documentation/tools/replacement-package-app/USE-CASE-REGISTRY.md"],"instruction":"Read the canonical Use-Case entry, follow its owner route and preserve its boundaries. Do not treat helper projection as semantic authority.","target":"<Export Repository Snapshot ZIP target>"},{"id":"UC-RPKG-DELIVER-REVIEW","label":"Deliver Current ReviewDiff to ChatGPT","description":"open canonical Use-Case entry","sources":["planning/documentation/tools/replacement-package-app/USE-CASE-REGISTRY.md"],"instruction":"Read the canonical Use-Case entry, follow its owner route and preserve its boundaries. Do not treat helper projection as semantic authority.","target":"<Deliver Current ReviewDiff to ChatGPT target>"},{"id":"UC-RPKG-ATTACH-SNAPSHOT","label":"Attach Repository Snapshot to ChatGPT","description":"open canonical Use-Case entry","sources":["planning/documentation/tools/replacement-package-app/USE-CASE-REGISTRY.md"],"instruction":"Read the canonical Use-Case entry, follow its owner route and preserve its boundaries. Do not treat helper projection as semantic authority.","target":"<Attach Repository Snapshot to ChatGPT target>"}];

  function markerFor(kind){if(kind==='orientation')return'PLANNING_ORIENTATION';if(kind==='direction')return'PLANNING_DIRECTION';return'PLANNING_USE_CASE';}
  function readRule(mode,kind){
    if(mode===MODE.FULL)return [`Full ${kind} reading is required for this invocation.`,'Read every listed source, resolve the selected current entry and follow the complete relevant owner route.','Read materially defining principles/workflows/templates/integration rules reached by that route.','Do not expand into unrelated families.','Full changes read depth only; it does not expand permissions.'];
    return [`Use remembered ${kind} context only while clearly sufficient.`,'Resolve/read listed sources and the current owner route when not current, uncertain, changed or challenged.','Do not rely only on this compact prompt when ownership/status/boundaries are uncertain.'];
  }
  function buildSemanticBody(kind,definition,mode){
    const marker=markerFor(kind),idField=kind==='use_case'?'use_case_id':`${kind}_id`;
    const lines=[`[${marker}]`,`${idField}:`,`  ${definition.id}`,'',`${kind}:`,`  ${definition.label}`,'','mode:',`  ${mode}`];
    if(kind==='use_case')lines.push('','focus:','  Work in this Use Case. Neighboring responsibilities are inputs/integration context unless the selected owner route explicitly requires them.');
    lines.push('','source_of_truth:',...(definition.sources||[]).map(s=>`  - \`${s}\``));
    if(kind==='use_case')lines.push('','route_resolution:','  Resolve this exact current Use-Case entry. Follow its current Main Owner / Owner Route and then the current owner links/read-order to every principle, workflow, template and integration rule materially defining this Use Case. Do not treat this Helper body as a frozen list of all future owner paths.');
    lines.push('','read_rule:',...readRule(mode,kind).map(x=>`  ${x}`),'','instruction:',`  ${definition.instruction}`);
    if(kind==='use_case')lines.push('','permission:','  Semantic planning/read context only. Use-Case activation does not grant executable-command, repository-mutation, archive, commit or push permission.');
    lines.push('','user_target:',`  ${definition.target}`,`[/${marker}]`);
    return lines.join('\n');
  }
  function buildSemanticEntries(){return {[SURFACES.ORIENTATION]:ORIENTATION_DEFINITIONS.map(d=>({...d,adaptiveBody:buildSemanticBody('orientation',d,MODE.ADAPTIVE),fullBody:buildSemanticBody('orientation',d,MODE.FULL)})),[SURFACES.DIRECTIONS]:DIRECTION_DEFINITIONS.map(d=>({...d,adaptiveBody:buildSemanticBody('direction',d,MODE.ADAPTIVE),fullBody:buildSemanticBody('direction',d,MODE.FULL)})),[SURFACES.USE_CASES]:USE_CASE_DEFINITIONS.map(d=>d.commandId?{...d}:{...d,adaptiveBody:buildSemanticBody('use_case',d,MODE.ADAPTIVE),fullBody:buildSemanticBody('use_case',d,MODE.FULL)})};}
  return {SURFACES,ORIENTATION_DEFINITIONS,DIRECTION_DEFINITIONS,USE_CASE_DEFINITIONS,buildSemanticBody,buildSemanticEntries};
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


  function parseHelperLibraryBatch(text) {
    const source=String(text || '').replace(/\r\n?/g,'\n');
    const open=`[${HELPER_LIBRARY_MARKER}]`, close=`[/${HELPER_LIBRARY_MARKER}]`;
    const lines=source.split('\n');
    const blocks=[];
    for(let index=0;index<lines.length;index++){
      if(lines[index]!==open)continue;
      const end=lines.indexOf(close,index+1);
      assert(end>index, 'Unclosed helper-library marker block.');
      let parsed;
      try{parsed=JSON.parse(lines.slice(index+1,end).join('\n').trim());}
      catch(error){throw new TypeError(`Invalid helper-library JSON: ${error.message}`);}
      blocks.push(normalizeHelperLibraryItem(parsed));
      index=end;
    }
    const seen=new Set();
    for(const item of blocks){const key=`${item.kind}:${item.id}`;assert(!seen.has(key),`Duplicate helper-library item in batch: ${key}`);seen.add(key);}
    return blocks;
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
      '', 'source_of_truth:', '  Start from `planning/command-routing.md`.', '  Then follow the currently registered command route and linked owner files.',
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

  return { HELPER_LIBRARY_SCHEMA_VERSION, HELPER_LIBRARY_MARKER, HELPER_LIBRARY_ROOT, HELPER_LIBRARY_KINDS, HELPER_LIBRARY_PATHS, HELPER_LIBRARY_SUFFIXES, LEGACY_LOCAL_STORAGE_KEY, makeHelperLibraryId, normalizeHelperLibraryItem, normalizeHelperLibraryCollection, helperLibraryTargetPath, helperLibraryFilePattern, renderHelperLibraryDocument, parseHelperLibraryDocument, parseHelperLibraryBatch, legacyProjectionToHelperItem, parseLegacyProjectionRegistry, mergeHelperLibrary };
});

(function (root, factory) {
  const api = factory(root.ObsPlanningHelper || (typeof require === 'function' ? Object.assign({}, require('./command-definition-codec.js'), require('./command-catalog.js'), require('./helper-library-codec.js')) : {}));
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsPlanningHelper = Object.assign(root.ObsPlanningHelper || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function (deps) {
  'use strict';

  function parseChatImport(text) {
    const source=String(text || '');
    const definitions=source.includes('[PLANNING_COMMAND_DEFINITION]') ? deps.parseCommandDefinitionBatch(source) : [];
    const helperItems=source.includes('[PLANNING_HELPER_LIBRARY_ITEM]') ? deps.parseHelperLibraryBatch(source) : [];
    if(!definitions.length&&!helperItems.length)throw new TypeError('No planning-command definitions or helper-library items found.');
    if(definitions.length)deps.validateCommandCatalog(definitions);
    return { definitions, helperItems };
  }

  function buildRecoveryRequest(settings) {
    const owner=String(settings?.owner || '').trim();
    const repo=String(settings?.repo || '').trim();
    const branch=String(settings?.branch || '').trim();
    if(!owner||!repo||!branch)throw new TypeError('Repository settings are required for a recovery request.');
    return [
      'I need to restore my OBS Planning Helper local snapshot from GitHub.',
      `Read the current repository ${owner}/${repo} on branch ${branch}.`,
      'Read every direct planning/commands/*.command.md file.',
      'Also read every direct planning/helper-library/commands/*.helper-command.md file and every direct planning/helper-library/prompts/*.prompt.md file that exists.',
      'This must be the complete current repository recovery set. Planning Helper Restore will reconcile its repository-backed local records to this pasted set while preserving local-only unbacked records.',
      'Return only the exact marker blocks needed by Planning Helper Restore:',
      '- every complete [PLANNING_COMMAND_DEFINITION] ... [/PLANNING_COMMAND_DEFINITION] block, unchanged;',
      '- every complete [PLANNING_HELPER_LIBRARY_ITEM] ... [/PLANNING_HELPER_LIBRARY_ITEM] block, unchanged.',
      'Do not summarize, omit, rename, reformat or wrap the result in Markdown fences. Do not invent missing items. Do not include files that no longer exist in the repository.',
      'The browser helper will restore this text locally and will not fetch GitHub itself.'
    ].join('\n');
  }

  return { parseChatImport, buildRecoveryRequest };
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
    if (status === 401) return 'auth';
    if (status === 403) return 'permission';
    if (status === 404) return 'not_found';
    if (status === 409 || status === 422) return 'conflict';
    if (status >= 500) return 'remote_failure';
    return 'request_failed';
  }

  function createGmTransport(gmRequest) {
    if (typeof gmRequest !== 'function') throw new TypeError('GM_xmlhttpRequest is required.');
    return (request) => new Promise((resolve, reject) => gmRequest({
      method: request.method,
      url: request.url,
      headers: request.headers,
      data: request.body,
      timeout: request.timeoutMs || 20000,
      onload: (response) => resolve({ status: response.status, text: response.responseText || '' }),
      ontimeout: () => reject(new GitHubClientError('network_unknown', 'GitHub request timed out; remote state may be unknown.')),
      onerror: (error) => reject(new GitHubClientError('network_unknown', 'GitHub request failed; remote state may be unknown.', { cause:error })),
      onabort: () => reject(new GitHubClientError('network_unknown', 'GitHub request was aborted; remote state may be unknown.'))
    }));
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
    _url(path, withRef = true) {
      const normalized = normalizeGitHubContentPath(path);
      const encoded = normalized.split('/').map(encodeURIComponent).join('/');
      return `${this.apiBase}/repos/${encodeURIComponent(this.owner)}/${encodeURIComponent(this.repo)}/contents/${encoded}${withRef ? `?ref=${encodeURIComponent(this.branch)}` : ''}`;
    }
    _headers() {
      const headers = { Accept:'application/vnd.github+json', 'X-GitHub-Api-Version':'2022-11-28' };
      if (this.token) headers.Authorization = `Bearer ${this.token}`;
      return headers;
    }
    async _request(method, url, body) {
      let response;
      try { response = await this.transport({ method, url, headers:{ ...this._headers(), ...(body ? {'Content-Type':'application/json'} : {}) }, body:body ? JSON.stringify(body) : undefined, timeoutMs:20000 }); }
      catch (error) { if (error instanceof GitHubClientError) throw error; throw new GitHubClientError('network_unknown', error?.message || 'GitHub network request failed.', { cause:error }); }
      let payload = null;
      try { payload = response.text ? JSON.parse(response.text) : null; }
      catch (error) { throw new GitHubClientError('invalid_response', `GitHub returned invalid JSON: ${error.message}`); }
      if (response.status < 200 || response.status >= 300) throw new GitHubClientError(statusKind(response.status), payload?.message || `GitHub request failed with status ${response.status}.`, { status:response.status, payload });
      return payload;
    }
    async listDirectory(path) {
      const normalized = normalizeGitHubContentPath(path);
      const payload = await this._request('GET', this._url(normalized, true));
      if (!Array.isArray(payload)) throw new GitHubClientError('invalid_response', 'GitHub Contents response is not a directory listing.');
      if (payload.length > 500) throw new GitHubClientError('limit_exceeded', `GitHub directory contains more than 500 direct entries: ${normalized}`);
      return payload.map((entry) => {
        const entryPath = normalizeGitHubContentPath(entry.path);
        if (!entryPath.startsWith(`${normalized}/`) || entryPath.slice(normalized.length + 1).includes('/')) throw new GitHubClientError('invalid_response', 'GitHub directory returned an entry outside the requested direct-child scope.');
        return { type:String(entry.type || ''), path:entryPath, name:String(entry.name || ''), sha:String(entry.sha || ''), size:Number(entry.size || 0), htmlUrl:String(entry.html_url || '') };
      });
    }
    async read(path) {
      const normalized = normalizeGitHubContentPath(path);
      const payload = await this._request('GET', this._url(normalized, true));
      if (!payload || payload.type !== 'file' || typeof payload.content !== 'string') throw new GitHubClientError('invalid_response', 'GitHub Contents response is not a UTF-8 file.');
      const returnedPath = normalizeGitHubContentPath(payload.path || normalized);
      if (returnedPath !== normalized) throw new GitHubClientError('invalid_response', `GitHub read response changed path (${normalized} -> ${returnedPath}).`);
      return { path:returnedPath, sha:String(payload.sha || ''), content:base64ToUtf8(payload.content), htmlUrl:String(payload.html_url || '') };
    }
    async write({ path, content, baseSha = '', message }) {
      const normalized = normalizeGitHubContentPath(path);
      const body = { message:String(message || `Update ${normalized}`), content:utf8ToBase64(content), branch:this.branch };
      if (baseSha) body.sha = String(baseSha);
      const payload = await this._request('PUT', this._url(normalized, false), body);
      const returnedPath = normalizeGitHubContentPath(payload?.content?.path || normalized);
      if (returnedPath !== normalized) throw new GitHubClientError('invalid_response', `GitHub write response changed path (${normalized} -> ${returnedPath}).`);
      return { path:returnedPath, sha:String(payload?.content?.sha || ''), htmlUrl:String(payload?.content?.html_url || '') };
    }
    async saveVerified({ path, content, baseSha = '', message }) {
      const normalized = normalizeGitHubContentPath(path);
      const intended = String(content);
      let writeResult;
      try { writeResult = await this.write({ path:normalized, content:intended, baseSha, message }); }
      catch (error) {
        const recoverable = error instanceof GitHubClientError && (error.kind === 'network_unknown' || error.kind === 'conflict');
        if (!recoverable) throw error;
        let after = null, readError = null;
        try { after = await this.read(normalized); } catch (nextError) { readError = nextError; }
        if (after?.content === intended) return { ...after, recoveredAfterUnknownWrite:error.kind === 'network_unknown', recoveredAfterConflict:error.kind === 'conflict' };
        if (error.kind === 'conflict') {
          if (readError) throw new GitHubClientError('conflict', 'GitHub rejected the stale write and the current remote content could not be verified; nothing was overwritten.', { status:error.status, cause:error, verificationCause:readError, path:normalized });
          throw new GitHubClientError('conflict', 'GitHub content changed since it was read and now differs from the intended file; nothing was overwritten.', { status:error.status, cause:error, path:normalized, remoteSha:String(after?.sha || '') });
        }
        throw error;
      }
      let readBack;
      try { readBack = await this.read(normalized); }
      catch (error) { throw new GitHubClientError('verification_unknown', 'GitHub accepted the write, but read-back verification failed.', { cause:error, writeResult }); }
      if (readBack.content !== intended) throw new GitHubClientError('verification_mismatch', 'Remote read-back content does not match the intended file.', { writeResult });
      return { ...readBack, recoveredAfterUnknownWrite:false, recoveredAfterConflict:false };
    }
    async create({ path, content, message }) { return this.saveVerified({ path, content, message }); }
  }

  return { GitHubClientError, GitHubContentsClient, createGmTransport, normalizeGitHubContentPath, utf8ToBase64, base64ToUtf8, statusKind };
});

(function (root, factory) {
  const api=factory(typeof require==='function'?Object.assign({},root.ObsPlanningHelper||{},require('./command-definition-codec.js'),require('./command-catalog.js')):(root.ObsPlanningHelper||{}));
  if(typeof module==='object'&&module.exports)module.exports=api;
  root.ObsPlanningHelper=Object.assign(root.ObsPlanningHelper||{},api);
})(typeof globalThis!=='undefined'?globalThis:this,function(deps){
  'use strict';
  const COMMANDS_PATH=deps.COMMANDS_PATH||'planning/commands';
  const COMMAND_FILE_PATTERN=/^[a-z0-9][a-z0-9._-]*\.command\.md$/;

  class RepositoryCommandService{
    constructor(client,options={}){this.client=client;this.commandsPath=options.commandsPath||COMMANDS_PATH;if(this.commandsPath!==COMMANDS_PATH)throw new TypeError(`Command repository operations are confined to ${COMMANDS_PATH}.`);}
    _target(definition){const normalized=deps.normalizeCommandDefinition(definition);if(!COMMAND_FILE_PATTERN.test(normalized.file))throw new TypeError('Invalid command filename.');return{definition:normalized,path:`${this.commandsPath}/${normalized.file}`};}
    async listRemote(){const entries=await this.client.listDirectory(this.commandsPath);return entries.filter((entry)=>entry.type==='file'&&COMMAND_FILE_PATTERN.test(entry.name)).map((entry)=>({kind:'planning-command',path:entry.path,name:entry.name,sha:String(entry.sha||'')})).sort((a,b)=>a.path.localeCompare(b.path));}
    async readRemote(path){const normalizedPath=String(path||'');const prefix=`${this.commandsPath}/`;const file=normalizedPath.startsWith(prefix)?normalizedPath.slice(prefix.length):'';if(!COMMAND_FILE_PATTERN.test(file)||normalizedPath!==`${prefix}${file}`)throw new TypeError(`Invalid repository command path: ${normalizedPath||'<empty>'}.`);const remote=await this.client.read(normalizedPath);const definition=deps.stripRuntimeCommandMetadata(deps.parseCommandDefinitionDocument(remote.content,{path:normalizedPath}));return{kind:'planning-command',path:normalizedPath,name:file,sha:String(remote.sha||''),definition,rawContent:remote.content.replace(/\r\n?/g,'\n')};}
    async loadCatalog(options={}){const entries=await this.listRemote();const records=[];for(const entry of entries)records.push(await this.readRemote(entry.path));deps.validateCommandCatalog(records.map((record)=>record.definition));if(!records.length&&!options.allowEmpty)throw new TypeError('Repository command catalog contains no direct .command.md definitions.');return records;}
    async save(definition){const target=this._target(definition);const content=deps.renderCommandDefinitionDocument(target.definition);const current=await this.loadCatalog({allowEmpty:true});const currentByPath=new Map(current.map((record)=>[record.path,record]));const existing=currentByPath.get(target.path)||null;const merged=deps.replaceDefinitionsByFile(current.map((record)=>record.definition),[target.definition]);deps.validateCommandCatalog(merged);if(existing&&existing.rawContent===content)return{ok:true,action:'noop',path:target.path,sha:existing.sha,definition:target.definition,rawContent:content};const action=existing?'update':'create';const write=await this.client.saveVerified({path:target.path,content,baseSha:existing?.sha||'',message:`${action==='create'?'Add':'Update'} planning command ${target.definition.command}`});return{ok:true,action,path:target.path,sha:String(write.sha||''),definition:target.definition,rawContent:content,recoveredAfterUnknownWrite:Boolean(write.recoveredAfterUnknownWrite),recoveredAfterConflict:Boolean(write.recoveredAfterConflict)};}
  }
  return{RepositoryCommandService,COMMAND_FILE_PATTERN};
});

(function (root, factory) {
  const api=factory(typeof require==='function'?Object.assign({},root.ObsPlanningHelper||{},require('./helper-library-codec.js')):(root.ObsPlanningHelper||{}));
  if(typeof module==='object'&&module.exports)module.exports=api;
  root.ObsPlanningHelper=Object.assign(root.ObsPlanningHelper||{},api);
})(typeof globalThis!=='undefined'?globalThis:this,function(deps){
  'use strict';

  function inferKindFromPath(path){const text=String(path||'');for(const kind of Object.values(deps.HELPER_LIBRARY_KINDS)){const prefix=`${deps.HELPER_LIBRARY_PATHS[kind]}/`;if(text.startsWith(prefix)&&deps.helperLibraryFilePattern(kind).test(text.slice(prefix.length)))return kind;}throw new TypeError(`Invalid helper-library repository path: ${text||'<empty>'}.`);}

  class RepositoryHelperLibraryService{
    constructor(client){this.client=client;}
    async listRemote(kind){const normalizedKind=String(kind||'');const root=deps.HELPER_LIBRARY_PATHS[normalizedKind];if(!root)throw new TypeError(`Unsupported helper-library kind: ${normalizedKind||'<empty>'}`);let entries;try{entries=await this.client.listDirectory(root);}catch(error){if(error?.kind==='not_found')return[];throw error;}const pattern=deps.helperLibraryFilePattern(normalizedKind);return entries.filter((entry)=>entry.type==='file'&&pattern.test(entry.name)).map((entry)=>({kind:normalizedKind,path:entry.path,name:entry.name,sha:String(entry.sha||'')})).sort((a,b)=>a.path.localeCompare(b.path));}
    async listRemoteAll(){const commands=await this.listRemote(deps.HELPER_LIBRARY_KINDS.COMMAND);const prompts=await this.listRemote(deps.HELPER_LIBRARY_KINDS.PROMPT);return[...commands,...prompts].sort((a,b)=>a.path.localeCompare(b.path));}
    async readRemote(path){const kind=inferKindFromPath(path);const remote=await this.client.read(path);const item=deps.parseHelperLibraryDocument(remote.content,{kind,path});return{kind,path:String(path),name:String(path).split('/').pop(),sha:String(remote.sha||''),item,rawContent:remote.content.replace(/\r\n?/g,'\n')};}
    async save(value){const item=deps.normalizeHelperLibraryItem(value);const path=deps.helperLibraryTargetPath(item);const content=deps.renderHelperLibraryDocument(item);let existing=null;try{const remote=await this.client.read(path);const rawContent=remote.content.replace(/\r\n?/g,'\n');try{const parsed=deps.parseHelperLibraryDocument(remote.content,{kind:item.kind,path});existing={sha:String(remote.sha||''),item:parsed,rawContent,malformed:false};}catch(parseError){existing={sha:String(remote.sha||''),item:null,rawContent,malformed:true,parseError};}}catch(error){if(error?.kind!=='not_found')throw error;}
      if(existing&&!existing.malformed&&existing.rawContent===content)return{ok:true,action:'noop',path,sha:existing.sha,item,rawContent:content};const action=existing?'update':'create';const write=await this.client.saveVerified({path,content,baseSha:existing?.sha||'',message:`${action==='create'?'Add':'Update'} Planning Helper ${item.kind} ${item.title}`});return{ok:true,action,path,sha:String(write.sha||''),item,rawContent:content,recoveredAfterUnknownWrite:Boolean(write.recoveredAfterUnknownWrite),recoveredAfterConflict:Boolean(write.recoveredAfterConflict),replacedMalformedRemote:Boolean(existing?.malformed)};
    }
  }
  return{RepositoryHelperLibraryService,inferKindFromPath};
});

(function (root, factory) {
  const api = factory(root.ObsPlanningHelper || (typeof require === 'function' ? Object.assign({}, require('./command-definition-codec.js'), require('./command-catalog.js'), require('./helper-library-codec.js')) : {}));
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsPlanningHelper = Object.assign(root.ObsPlanningHelper || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function (deps) {
  'use strict';

  const KEYS=Object.freeze({
    settings:'obsPlanningHelper:v1:repositorySettings',
    token:'obsPlanningHelper:v1:githubToken',
    localSnapshot:'obsPlanningHelper:v2:localSnapshot'
  });
  const LEGACY_KEYS=Object.freeze({
    commandCache:'obsPlanningHelper:v1:commandCatalogCache',
    localLibrary:'obsPlanningHelper:v1:localLibrary',
    repositoryLibraryCache:'obsPlanningHelper:v1:repositoryLibraryCache'
  });
  const LOCAL_SNAPSHOT_SCHEMA_VERSION=1;
  const POSITION_KEY='obs-planning-helper-position-v2';
  const DEFAULT_SETTINGS=Object.freeze({owner:'AlexPastukhh',repo:'obs-planning-docs',branch:'main'});

  function gmGetFn(){return typeof GM_getValue==='function'?GM_getValue:null;}
  function gmSetFn(){return typeof GM_setValue==='function'?GM_setValue:null;}
  async function gmGet(key,fallback){const fn=gmGetFn();return fn?await fn(key,fallback):fallback;}
  async function gmSet(key,value){const fn=gmSetFn();if(!fn)throw new Error('Tampermonkey GM_setValue is unavailable; reinstall the generated Planning Helper userscript and accept its GM grants.');await fn(key,value);}

  function normalizeSettings(value){const input=value&&typeof value==='object'?value:{};return{owner:String(input.owner==null?'':input.owner).trim(),repo:String(input.repo==null?'':input.repo).trim(),branch:String(input.branch==null?'':input.branch).trim()};}
  function validateRepositorySettings(value){const settings=normalizeSettings(value);if(!settings.owner||!settings.repo||!settings.branch)throw new TypeError('Owner, repository and branch are required.');for(const[field,text]of Object.entries(settings)){if(/[\r\n\u0000-\u001f\u007f]/.test(text))throw new TypeError(`${field} contains unsafe control characters.`);}return settings;}
  async function loadRepositorySettings(){const stored=await gmGet(KEYS.settings,null);return stored==null?{...DEFAULT_SETTINGS}:validateRepositorySettings(stored);}
  async function saveRepositorySettings(settings){const value=validateRepositorySettings(settings);await gmSet(KEYS.settings,value);return value;}
  async function loadGitHubToken(){return String(await gmGet(KEYS.token,'')||'').trim();}
  async function saveGitHubToken(token){const value=String(token||'').trim();await gmSet(KEYS.token,value);return Boolean(value);}

  function cleanIso(value,fallback=''){const text=String(value||'').trim();if(!text)return fallback;const ms=Date.parse(text);if(!Number.isFinite(ms))throw new TypeError(`Invalid snapshot timestamp: ${text}`);return new Date(ms).toISOString();}
  function normalizeCommandRecord(value){
    const input=value&&typeof value==='object'?value:{};
    const definition=deps.normalizeCommandDefinition(input.definition||input);
    const path=deps.commandPathForDefinition(definition);
    if(input.path&&String(input.path)!==path)throw new TypeError(`Planning-command snapshot path mismatch: ${input.path}`);
    const rawContent=String(input.rawContent||deps.renderCommandDefinitionDocument(definition)).replace(/\r\n?/g,'\n');
    const parsed=deps.parseCommandDefinitionDocument(rawContent,{path});
    if(JSON.stringify(deps.toSerializable(deps.stripRuntimeCommandMetadata(parsed)))!==JSON.stringify(deps.toSerializable(definition)))throw new TypeError(`Planning-command snapshot raw content does not match definition: ${definition.id}`);
    const repositorySha=String(input.repositorySha||'').trim();return{definition,path,rawContent,repositoryKnown:Boolean(input.repositoryKnown||repositorySha),repositorySha};
  }
  function normalizeHelperRecord(value){
    const input=value&&typeof value==='object'?value:{};
    const item=deps.normalizeHelperLibraryItem(input.item||input);
    const path=deps.helperLibraryTargetPath(item);
    if(input.path&&String(input.path)!==path)throw new TypeError(`Helper-library snapshot path mismatch: ${input.path}`);
    const rawContent=String(input.rawContent||deps.renderHelperLibraryDocument(item)).replace(/\r\n?/g,'\n');
    const parsed=deps.parseHelperLibraryDocument(rawContent,{kind:item.kind,path});
    if(JSON.stringify(parsed)!==JSON.stringify(item))throw new TypeError(`Helper-library snapshot raw content does not match item: ${item.kind}:${item.id}`);
    const repositorySha=String(input.repositorySha||'').trim();return{item,path,rawContent,repositoryKnown:Boolean(input.repositoryKnown||repositorySha),repositorySha};
  }
  function normalizePlanningHelperLocalSnapshot(value){
    if(!value||typeof value!=='object'||value.schemaVersion!==LOCAL_SNAPSHOT_SCHEMA_VERSION)throw new TypeError('Unsupported Planning Helper local snapshot schema.');
    const planningCommands=(value.planningCommands||[]).map(normalizeCommandRecord).sort((a,b)=>a.path.localeCompare(b.path));
    const helperItems=(value.helperItems||[]).map(normalizeHelperRecord).sort((a,b)=>a.path.localeCompare(b.path));
    deps.validateCommandCatalog(planningCommands.map((record)=>record.definition));
    if(new Set(planningCommands.map((record)=>record.path)).size!==planningCommands.length)throw new TypeError('Duplicate planning-command path in local snapshot.');
    if(new Set(helperItems.map((record)=>record.path)).size!==helperItems.length)throw new TypeError('Duplicate helper-library path in local snapshot.');
    return{schemaVersion:LOCAL_SNAPSHOT_SCHEMA_VERSION,savedAt:cleanIso(value.savedAt,''),planningCommands,helperItems};
  }
  async function loadPlanningHelperLocalSnapshot(){const value=await gmGet(KEYS.localSnapshot,null);return value==null?null:normalizePlanningHelperLocalSnapshot(value);}
  async function savePlanningHelperLocalSnapshot(value){
    const normalized=normalizePlanningHelperLocalSnapshot({...value,schemaVersion:LOCAL_SNAPSHOT_SCHEMA_VERSION,savedAt:value?.savedAt||new Date().toISOString()});
    const payload={...normalized,savedAt:new Date().toISOString()};
    await gmSet(KEYS.localSnapshot,payload);
    const checked=await gmGet(KEYS.localSnapshot,null);
    const normalizedChecked=normalizePlanningHelperLocalSnapshot(checked);
    if(JSON.stringify(normalizedChecked)!==JSON.stringify(payload))throw new Error('Planning Helper local snapshot write-back verification failed.');
    return payload;
  }

  function commandRecordsFromDefinitions(definitions,repositoryKnown=true){return(definitions||[]).map((definition)=>normalizeCommandRecord({definition,repositoryKnown}));}
  function helperKey(item){return`${item.kind}:${item.id}`;}
  async function loadOrMigratePlanningHelperLocalSnapshot(bundledCommands){
    const existing=await loadPlanningHelperLocalSnapshot();
    if(existing)return{snapshot:existing,migrated:false,warnings:[]};
    const warnings=[];
    let definitions=[...(bundledCommands||[])];
    try{
      const legacy=await gmGet(LEGACY_KEYS.commandCache,null);
      if(legacy&&legacy.schemaVersion===1&&Array.isArray(legacy.definitions)){deps.validateCommandCatalog(legacy.definitions);definitions=legacy.definitions;}
    }catch(error){warnings.push(`Legacy planning-command cache ignored: ${error.message||String(error)}`);}
    deps.validateCommandCatalog(definitions);
    const helperByKey=new Map();
    try{
      const repoCache=await gmGet(LEGACY_KEYS.repositoryLibraryCache,null);
      const records=repoCache?.schemaVersion===2&&Array.isArray(repoCache.records)?repoCache.records:repoCache?.schemaVersion===1&&Array.isArray(repoCache.items)?repoCache.items.map((item)=>({item})):[];
      for(const record of records){const item=deps.normalizeHelperLibraryItem(record.item||record);helperByKey.set(helperKey(item),normalizeHelperRecord({item,repositoryKnown:true,repositorySha:record.sha||''}));}
    }catch(error){warnings.push(`Legacy repository-library cache ignored: ${error.message||String(error)}`);}
    try{
      const local=await gmGet(LEGACY_KEYS.localLibrary,null);
      if(local&&local.schemaVersion===1&&Array.isArray(local.items))for(const raw of local.items){const item=deps.normalizeHelperLibraryItem(raw);const key=helperKey(item),previous=helperByKey.get(key);helperByKey.set(key,normalizeHelperRecord({item,repositoryKnown:Boolean(previous?.repositoryKnown),repositorySha:previous?.repositorySha||''}));}
    }catch(error){warnings.push(`Legacy local helper library ignored: ${error.message||String(error)}`);}
    try{
      let raw='';try{raw=typeof localStorage!=='undefined'?localStorage.getItem(deps.LEGACY_LOCAL_STORAGE_KEY)||'':'';}catch(_){}
      if(raw){for(const item of deps.parseLegacyProjectionRegistry(raw)){const key=helperKey(item);if(!helperByKey.has(key))helperByKey.set(key,normalizeHelperRecord({item,repositoryKnown:false}));}}
    }catch(error){warnings.push(`Legacy page-local command projections ignored: ${error.message||String(error)}`);}
    const snapshot=await savePlanningHelperLocalSnapshot({schemaVersion:LOCAL_SNAPSHOT_SCHEMA_VERSION,planningCommands:commandRecordsFromDefinitions(definitions,true),helperItems:[...helperByKey.values()]});
    return{snapshot,migrated:true,warnings};
  }

  function readPanelPosition(){try{const parsed=JSON.parse(localStorage.getItem(POSITION_KEY)||'{}');return{left:Number.isFinite(parsed.left)?parsed.left:null,top:Number.isFinite(parsed.top)?parsed.top:null};}catch(_){return{left:null,top:null};}}
  function savePanelPosition(position){try{localStorage.setItem(POSITION_KEY,JSON.stringify({left:position.left,top:position.top}));}catch(_){}}

  return { PLANNING_HELPER_STATE_KEYS:KEYS, PLANNING_HELPER_LEGACY_STATE_KEYS:LEGACY_KEYS, PLANNING_HELPER_DEFAULT_SETTINGS:DEFAULT_SETTINGS, LOCAL_SNAPSHOT_SCHEMA_VERSION, normalizeSettings, validateRepositorySettings, loadRepositorySettings, saveRepositorySettings, loadGitHubToken, saveGitHubToken, normalizeCommandRecord, normalizeHelperRecord, normalizePlanningHelperLocalSnapshot, loadPlanningHelperLocalSnapshot, savePlanningHelperLocalSnapshot, loadOrMigratePlanningHelperLocalSnapshot, commandRecordsFromDefinitions, readPanelPosition, savePanelPosition };
});

(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsPlanningHelper = Object.assign(root.ObsPlanningHelper || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  let cachedComposer=null;
  function usableCachedComposer(entry){const element=entry?.element;return Boolean(element&&element.isConnected!==false&&!element.hasAttribute?.('disabled'));}
  function isVisibleComposer(element){return Boolean(element&&element.getClientRects().length>0&&!element.hasAttribute('disabled'));}
  function clearComposerCache(){cachedComposer=null;}
  function findComposer(doc=document){
    if(usableCachedComposer(cachedComposer))return{...cachedComposer,cacheHit:true};
    cachedComposer=null;
    for(const selector of ['#prompt-textarea[contenteditable="true"]','[data-testid="composer-textarea"][contenteditable="true"]','textarea[data-testid="composer-textarea"]']){
      const element=doc.querySelector(selector);if(isVisibleComposer(element)){cachedComposer={element,selector,fallback:false};return{...cachedComposer,cacheHit:false};}
    }
    for(const selector of ['textarea[placeholder]','[contenteditable="true"][role="textbox"]'])for(const element of doc.querySelectorAll(selector))if(isVisibleComposer(element)){cachedComposer={element,selector,fallback:true};return{...cachedComposer,cacheHit:false};}
    return{element:null,selector:null,fallback:true,cacheHit:false};
  }
  function getComposerText(element){if(typeof HTMLTextAreaElement!=='undefined'&&(element instanceof HTMLTextAreaElement||element instanceof HTMLInputElement))return element.value||'';return element.textContent||'';}
  function composerDocument(element){if(element?.ownerDocument)return element.ownerDocument;if(typeof document!=='undefined')return document;return null;}
  function composerSelection(doc){if(doc&&typeof doc.getSelection==='function')return doc.getSelection();if(typeof window!=='undefined'&&typeof window.getSelection==='function')return window.getSelection();return null;}
  function dispatchInputEvent(element,data){try{element.dispatchEvent(new InputEvent('input',{bubbles:true,composed:true,inputType:'insertText',data}));}catch(_){element.dispatchEvent(new Event('input',{bubbles:true,composed:true}));}}
  function insertContenteditableText(element,text){
    const exact=String(text),doc=composerDocument(element);if(!doc||typeof doc.createRange!=='function'||typeof doc.createTextNode!=='function')return false;
    const range=doc.createRange(),node=doc.createTextNode(exact);range.selectNodeContents(element);range.collapse(false);range.insertNode(node);
    if(node.data!==exact)return false;
    if(typeof range.setStartAfter==='function'){range.setStartAfter(node);range.collapse(true);}
    const selection=composerSelection(doc);if(selection&&typeof selection.removeAllRanges==='function'&&typeof selection.addRange==='function'){selection.removeAllRanges();selection.addRange(range);}
    dispatchInputEvent(element,exact);return true;
  }
  function diagnostic(startedAt,foundAt,readAt,finishedAt,found,commandId,current,text,ok,reason){console.debug('[OBS Planning Helper insertion]',{commandId,ok,reason,selector:found.selector,fallbackSelector:found.fallback,composerCacheHit:Boolean(found.cacheHit),draftLength:current.length,bodyLength:text.length,findMs:Number((foundAt-startedAt).toFixed(2)),readMs:Number((readAt-foundAt).toFixed(2)),insertMs:Number((finishedAt-readAt).toFixed(2)),totalMs:Number((finishedAt-startedAt).toFixed(2))});}
  function insertIntoComposer(text,commandId=null){
    const body=String(text);const startedAt=performance.now();const found=findComposer();const foundAt=performance.now(),composer=found.element;
    if(!composer){console.debug('[OBS Planning Helper insertion]',{commandId,ok:false,reason:'composer-not-found',composerCacheHit:false,findMs:Number((foundAt-startedAt).toFixed(2)),bodyLength:body.length});return{ok:false,reason:'composer-not-found'};}
    let current='',readAt=foundAt;
    try{
      composer.focus();current=getComposerText(composer);readAt=performance.now();const hasText=current.trim().length>0;const addition=hasText?`\n\n${body}`:body;
      if(typeof HTMLTextAreaElement!=='undefined'&&(composer instanceof HTMLTextAreaElement||composer instanceof HTMLInputElement)){
        const next=hasText?`${current}\n\n${body}`:body;const proto=composer instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype;const setter=Object.getOwnPropertyDescriptor(proto,'value')?.set;if(setter)setter.call(composer,next);else composer.value=next;dispatchInputEvent(composer,addition);
      }else{
        const inserted=insertContenteditableText(composer,addition);
        if(!inserted){clearComposerCache();const rejectedAt=performance.now();diagnostic(startedAt,foundAt,readAt,rejectedAt,found,commandId,current,body,false,'contenteditable-direct-insert-rejected');return{ok:false,reason:'contenteditable-direct-insert-rejected'};}
      }
      const finishedAt=performance.now();diagnostic(startedAt,foundAt,readAt,finishedAt,found,commandId,current,body,true,undefined);return{ok:true,cacheHit:Boolean(found.cacheHit)};
    }catch(error){clearComposerCache();const failedAt=performance.now();diagnostic(startedAt,foundAt,readAt,failedAt,found,commandId,current,body,false,error instanceof Error?error.message:String(error));return{ok:false,reason:'composer-mutation-failed',error};}
  }
  function copyText(text){
    const exact=String(text);
    try{
      const textarea=document.createElement('textarea');textarea.value=exact;textarea.style.position='fixed';textarea.style.left='-10000px';textarea.style.top='0';textarea.style.opacity='0';textarea.setAttribute('aria-hidden','true');document.body.appendChild(textarea);textarea.focus({preventScroll:true});textarea.select();let copied=false;try{copied=Boolean(document.execCommand('copy'));}finally{textarea.remove();}if(copied)return true;
    }catch(_){}
    try{if(navigator?.clipboard?.writeText)return Promise.resolve(navigator.clipboard.writeText(exact)).then(()=>true,()=>false);}catch(_){}
    return false;
  }
  return{isVisibleComposer,findComposer,getComposerText,insertContenteditableText,insertIntoComposer,copyText,clearComposerCache};
});

(function (root, factory) {
  const api=factory(root.ObsPlanningHelper||{});
  if(typeof module==='object'&&module.exports)module.exports=api;
  root.ObsPlanningHelper=Object.assign(root.ObsPlanningHelper||{},api);
})(typeof globalThis!=='undefined'?globalThis:this,function(deps){
  'use strict';
  const HOST_ID='obs-planning-helper-host';

  function repositorySaveFailureMessage(error){
    const detail=error?.message||String(error);
    if(error?.kind==='conflict'){
      if(error?.details?.verificationCause)return `GitHub write conflicted; current remote content could not be verified; nothing was overwritten: ${detail}`;
      return `GitHub content changed and differs from intended local content; nothing was overwritten: ${detail}`;
    }
    return `GitHub save failed or could not be verified: ${detail}`;
  }

  function createPlanningHelperUi(options={}){
    const SURFACES=options.surfaces||deps.SURFACES;document.getElementById(HOST_ID)?.remove();document.getElementById('obs-command-helper-host')?.remove();
    const host=document.createElement('div');host.id=HOST_ID;document.documentElement.appendChild(host);const root=host.attachShadow({mode:'open'});const saved=options.position||{left:null,top:null};let left=saved.left??Math.max(12,window.innerWidth-560),top=saved.top??Math.max(12,window.innerHeight-760);let activeSurface=SURFACES.ORIENTATION,commandEntries=[...(options.commandEntries||[])],localCommandEntries=[...(options.localCommandEntries||[])],promptEntries=[...(options.promptEntries||[])];const semanticEntries=options.semanticEntries||{};let focusCommandId=null,activeOverlay=null,isOpen=false,statusTimer=null,insertionBusy=false,operationBusy=false,dashboardOpen=document.documentElement.dataset.obsPlanningDashboardOpen==='true',lastToggleToken=document.documentElement.dataset.obsPlanningCommandsToggle||'';
    root.innerHTML=`<style>:host{all:initial}*{box-sizing:border-box}button,input,textarea{font:inherit}.launcher{position:fixed;right:18px;bottom:22px;z-index:2147483647;border:1px solid #64748b;border-radius:999px;padding:9px 13px;background:#111827;color:#f8fafc;font:700 12px system-ui;cursor:pointer}.panel{position:fixed;left:${left}px;top:${top}px;z-index:2147483647;width:min(580px,calc(100vw - 24px));max-height:min(88vh,900px);display:none;flex-direction:column;overflow:hidden;border:1px solid #475569;border-radius:14px;background:#0b1220;color:#f8fafc;box-shadow:0 20px 60px rgba(0,0,0,.5);font:13px/1.4 system-ui}.panel[data-open=true]{display:flex}.header{display:flex;align-items:center;gap:8px;padding:10px;background:#111b2e;border-bottom:1px solid #334155;cursor:grab}.title{flex:1}.title-main{font-weight:800}.title-sub{color:#94a3b8;font-size:11px}.tabs{display:grid;grid-template-columns:repeat(3,1fr);gap:4px;padding:7px}.tab,.tool{padding:7px}.tab[aria-selected=true]{background:#1d4ed8}.surface-tools{display:flex;gap:6px;padding:7px 8px;border-top:1px solid #1e293b;border-bottom:1px solid #1e293b;flex-wrap:wrap}.search-wrap{padding:8px}.search{width:100%;padding:8px;background:#020817;color:#fff;border:1px solid #334155;border-radius:8px}.body{overflow:auto;padding:8px}.row{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:7px;margin:4px 0}.insert{padding:8px;text-align:left;min-width:0}.row-label{display:block;font-weight:750;overflow:hidden;text-overflow:ellipsis}.row-meta{display:block;color:#94a3b8;font-size:11px}.actions{display:flex;gap:5px;flex-wrap:wrap;justify-content:flex-end}button{border:1px solid #475569;border-radius:8px;background:#17243a;color:#f8fafc;cursor:pointer}button:hover,button:focus-visible{background:#243750}button:disabled{opacity:.55;cursor:wait}.copy,.full,.refinement,.edit-library,.delete-library,.open-command,.repo-library,.repo-command{padding:5px 8px}.delete-library{color:#fecaca}.status{margin:0 8px 8px;padding:8px;border-radius:8px;background:#172554;color:#bfdbfe;white-space:pre-wrap}.empty{padding:18px;color:#94a3b8;text-align:center}.overlay{position:fixed;inset:0;z-index:2147483647;background:rgba(2,8,23,.72);display:flex;align-items:center;justify-content:center;padding:18px}.modal{width:min(780px,96vw);max-height:90vh;overflow:auto;background:#0b1220;color:#f8fafc;border:1px solid #475569;border-radius:14px;padding:14px;font:13px/1.45 system-ui}.modal h2{margin:0 0 8px}.modal p{color:#cbd5e1}.modal textarea{width:100%;min-height:320px;padding:10px;background:#020817;color:#f8fafc;border:1px solid #475569;border-radius:8px;font:12px/1.45 ui-monospace,monospace}.modal input{width:100%;padding:8px;background:#020817;color:#fff;border:1px solid #475569;border-radius:8px}.fields{display:grid;grid-template-columns:1fr 1fr;gap:8px}.field{display:grid;gap:4px}.field-wide{grid-column:1/-1}.modal-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:10px}.preview{margin-top:10px;padding:10px;border:1px solid #334155;border-radius:8px;background:#07101f;white-space:pre-wrap}.danger{color:#fecaca}.ok{color:#bbf7d0}</style><button class="launcher" type="button">Planning</button><section class="panel" data-open="false"><div class="header"><div class="title"><div class="title-main">OBS Planning Helper</div><div class="title-sub">RAM-first · clipboard-first insert · explicit GitHub check/save/sync</div></div><button class="close" type="button">×</button></div><div class="tabs">${Object.values(SURFACES).map((surface)=>`<button class="tab" type="button" data-surface="${surface}" aria-selected="false">${surface}</button>`).join('')}</div><div class="surface-tools"><button class="tool new-library" type="button">New local</button><button class="tool import-chat" type="button">Import from ChatGPT</button><button class="tool restore-chat" type="button">Restore from GitHub copy</button><button class="tool recovery-request" type="button">Copy recovery request</button><button class="tool check-github" type="button">Check GitHub</button><button class="tool sync-github" type="button">Sync missing</button><button class="tool settings" type="button">Repository settings</button></div><div class="search-wrap"><input class="search" type="search" placeholder="Search current surface…"></div><div class="body"></div></section>`;
    const launcher=root.querySelector('.launcher'),panel=root.querySelector('.panel'),header=root.querySelector('.header'),closeButton=root.querySelector('.close'),searchInput=root.querySelector('.search'),body=root.querySelector('.body'),tabButtons=[...root.querySelectorAll('.tab')],newLibraryButton=root.querySelector('.new-library'),checkGithubButton=root.querySelector('.check-github'),syncGithubButton=root.querySelector('.sync-github');
    function isLibrarySurface(surface){return surface===SURFACES.LOCAL_COMMANDS||surface===SURFACES.PROMPTS;}function isRepositorySurface(surface){return surface===SURFACES.COMMANDS||isLibrarySurface(surface);}function libraryKindForSurface(surface){return surface===SURFACES.PROMPTS?deps.HELPER_LIBRARY_KINDS.PROMPT:deps.HELPER_LIBRARY_KINDS.COMMAND;}function entriesForSurface(surface){if(surface===SURFACES.COMMANDS)return commandEntries;if(surface===SURFACES.LOCAL_COMMANDS)return localCommandEntries;if(surface===SURFACES.PROMPTS)return promptEntries;return semanticEntries[surface]||[];}
    function setCommandEntries(entries){commandEntries=[...(entries||[])];if(activeSurface===SURFACES.COMMANDS)renderEntries(searchInput.value);}function setLibraryEntries(result={}){if(result.localCommandEntries)localCommandEntries=[...result.localCommandEntries];if(result.promptEntries)promptEntries=[...result.promptEntries];if(isLibrarySurface(activeSurface))renderEntries(searchInput.value);}function applyState(result={}){if(result.commandEntries)setCommandEntries(result.commandEntries);setLibraryEntries(result);}
    function showStatus(message,timeout=5200){root.querySelector('.status')?.remove();if(statusTimer!==null)clearTimeout(statusTimer);const status=document.createElement('div');status.className='status';status.textContent=String(message);panel.appendChild(status);statusTimer=setTimeout(()=>{status.remove();statusTimer=null;},timeout);}function setBusy(){root.querySelectorAll('button').forEach((button)=>{if(!button.classList.contains('close'))button.disabled=insertionBusy||operationBusy;});}
    async function insertBody(text,success,id){if(insertionBusy)return;insertionBusy=true;setBusy();try{showStatus(await options.onInsert(text,success,id)||success);}finally{insertionBusy=false;setBusy();}}
    function switchSurface(surface,commandId=null){activeSurface=surface;focusCommandId=commandId;searchInput.value='';tabButtons.forEach((button)=>button.setAttribute('aria-selected',String(button.dataset.surface===surface)));newLibraryButton.style.display=isLibrarySurface(surface)?'inline-block':'none';newLibraryButton.textContent=surface===SURFACES.PROMPTS?'New prompt':'New local command';checkGithubButton.style.display=isRepositorySurface(surface)?'inline-block':'none';syncGithubButton.style.display=isRepositorySurface(surface)?'inline-block':'none';renderEntries('');}
    function setOpen(value){isOpen=Boolean(value);if(!isOpen&&activeOverlay){activeOverlay.remove();activeOverlay=null;}panel.dataset.open=String(isOpen);launcher.style.display=isOpen||dashboardOpen?'none':'block';if(isOpen){keepPanelInViewport();renderEntries(searchInput.value);}}
    function repositoryReference(entry){if(activeSurface===SURFACES.COMMANDS)return{type:'planning-command',id:entry.id};if(isLibrarySurface(activeSurface))return{type:'helper',kind:entry.libraryKind,id:entry.libraryId};return null;}
    async function saveRepositoryEntry(entry){const reference=repositoryReference(entry);if(!reference)return;operationBusy=true;setBusy();try{showStatus(`Saving to GitHub: ${entry.title||entry.command||entry.label}…`,8000);const result=await options.onSaveRepositoryEntity(reference);applyState(result);const localWarning=result.localSnapshotUpdated===false?`\nRemote state is verified, but local repository-evidence metadata could not be saved: ${result.localSnapshotError||'unknown local persistence error'}. Run Check GitHub before relying on the local verification indicator.`:'';const outcome=result.replacedMalformedRemote?'GitHub invalid helper file repaired and verified':result.recoveredAfterConflict?'GitHub already contains intended content; verification recovered after concurrent/stale-SHA change':result.action==='noop'?'GitHub already matches':'GitHub saved';showStatus(`${outcome}: ${result.path}\nSHA: ${result.sha||'<none>'}${localWarning}`,localWarning?12000:8000);}catch(error){showStatus(repositorySaveFailureMessage(error),9000);}finally{operationBusy=false;setBusy();}}
    function renderEntries(query){const q=String(query||'').trim().toLowerCase();const entries=entriesForSurface(activeSurface).filter((entry)=>!q||[entry.id,entry.label,entry.command||'',entry.description||'',entry.englishName||'',entry.text||'',...(entry.commandFamily||[])].join(' ').toLowerCase().includes(q));body.textContent='';if(!entries.length){const empty=document.createElement('div');empty.className='empty';empty.textContent='No matching local entries.';body.appendChild(empty);return;}for(const entry of entries){const row=document.createElement('div');row.className='row';const main=document.createElement('button');main.type='button';main.className='insert';const label=document.createElement('span');label.className='row-label';label.textContent=activeSurface===SURFACES.COMMANDS?`${entry.englishName} · ${entry.command}`:entry.label;const meta=document.createElement('span');meta.className='row-meta';meta.textContent=entry.description||entry.id;main.append(label,meta);const actions=document.createElement('div');actions.className='actions';if(isLibrarySurface(activeSurface)){main.addEventListener('click',()=>insertBody(entry.text,`Inserted: ${entry.title}`,entry.id));const copy=document.createElement('button');copy.className='copy';copy.textContent='Copy';copy.addEventListener('click',async()=>showStatus(await options.onCopy(entry.text)?`Copied: ${entry.title}`:'Clipboard copy failed.'));const edit=document.createElement('button');edit.className='edit-library';edit.textContent='Edit';edit.addEventListener('click',()=>openLibraryEditor(entry));const repo=document.createElement('button');repo.className='repo-library';repo.textContent='Save GitHub';repo.addEventListener('click',()=>saveRepositoryEntry(entry));const remove=document.createElement('button');remove.className='delete-library';remove.textContent='Delete';remove.addEventListener('click',()=>deleteLocalLibrary(entry));actions.append(copy,edit,repo,remove);}else if(entry.commandId){main.addEventListener('click',()=>switchSurface(SURFACES.COMMANDS,entry.commandId));const open=document.createElement('button');open.className='open-command';open.textContent='Open Commands';open.addEventListener('click',()=>switchSurface(SURFACES.COMMANDS,entry.commandId));actions.append(open);}else{main.addEventListener('click',()=>insertBody(entry.adaptiveBody,`Inserted: ${entry.label||entry.command} · Adaptive`,entry.id));const full=document.createElement('button');full.className='full';full.textContent='Full';full.addEventListener('click',()=>insertBody(entry.fullBody,`Inserted: ${entry.label||entry.command} · Full`,entry.id));actions.append(full);if(activeSurface===SURFACES.COMMANDS)for(const refinement of entry.refinementBodies||[]){const button=document.createElement('button');button.className='refinement';button.textContent=refinement.label;button.addEventListener('click',()=>insertBody(refinement.body,`Inserted refinement: ${entry.command} · ${refinement.label}`,`${entry.id}:${refinement.id}`));actions.append(button);}const copy=document.createElement('button');copy.className='copy';copy.textContent='Copy';copy.addEventListener('click',async()=>showStatus(await options.onCopy(entry.adaptiveBody)?`Copied: ${entry.label||entry.command}`:'Clipboard copy failed.'));actions.append(copy);if(activeSurface===SURFACES.COMMANDS){const repo=document.createElement('button');repo.className='repo-command';repo.textContent='Save GitHub';repo.addEventListener('click',()=>saveRepositoryEntry(entry));actions.append(repo);}}row.append(main,actions);body.appendChild(row);if(entry.id===focusCommandId)setTimeout(()=>{main.focus();row.scrollIntoView({block:'nearest'});focusCommandId=null;},0);}}

    function makeOverlay(title){activeOverlay?.remove();const overlay=document.createElement('div');overlay.className='overlay';const modal=document.createElement('section');modal.className='modal';const h=document.createElement('h2');h.textContent=title;modal.appendChild(h);overlay.appendChild(modal);root.appendChild(overlay);activeOverlay=overlay;overlay.addEventListener('click',(event)=>{if(event.target===overlay&&!operationBusy){overlay.remove();activeOverlay=null;}});return{overlay,modal};}
    async function openImport(mode){const restoring=mode==='restore';const{overlay,modal}=makeOverlay(restoring?'Restore local snapshot from GitHub copy':'Import new/changed items from ChatGPT');const intro=document.createElement('p');intro.textContent=restoring?'Paste the complete exact marker set returned by ChatGPT after it read GitHub. Restore reconciles repository-backed local records to that complete set, removes stale repository-backed records that are absent from it, preserves local-only unbacked records, and makes zero GitHub requests/writes.':'Paste planning-command definition and/or helper-library marker blocks from ChatGPT. Import changes only the local RAM/snapshot state. Use Save GitHub explicitly on a row when you want to create or update its repository file.';const textarea=document.createElement('textarea');textarea.placeholder='[PLANNING_COMMAND_DEFINITION]\n{ ... }\n[/PLANNING_COMMAND_DEFINITION]\n\n[PLANNING_HELPER_LIBRARY_ITEM]\n{ ... }\n[/PLANNING_HELPER_LIBRARY_ITEM]';const preview=document.createElement('div');preview.className='preview';preview.textContent='Not parsed yet.';const actions=document.createElement('div');actions.className='modal-actions';const cancel=document.createElement('button');cancel.textContent='Cancel';const parse=document.createElement('button');parse.textContent='Preview local import';const apply=document.createElement('button');apply.textContent=restoring?'Restore locally':'Import locally';apply.disabled=true;actions.append(cancel,parse,apply);modal.append(intro,textarea,preview,actions);let ready=false;cancel.addEventListener('click',()=>{if(!operationBusy){overlay.remove();activeOverlay=null;}});textarea.addEventListener('input',()=>{ready=false;apply.disabled=true;preview.textContent='Input changed. Preview again.';});parse.addEventListener('click',()=>{try{const result=options.onPreviewChatImport(textarea.value,mode);preview.textContent=`${result.parsed.definitions.length} planning command(s), ${result.parsed.helperItems.length} helper item(s).\n\n${result.lines.join('\n')}`;preview.className='preview ok';ready=true;apply.disabled=false;}catch(error){preview.textContent=error.message||String(error);preview.className='preview danger';ready=false;apply.disabled=true;}});apply.addEventListener('click',async()=>{if(!ready)return;operationBusy=true;setBusy();textarea.disabled=true;try{const result=await options.onApplyChatImport(textarea.value,mode);applyState(result);const failures=result.errors||[];preview.textContent=restoring?`Restored locally and reconciled repository-backed records. GitHub requests: 0.`:`Imported locally: ${result.createdLocal||0} new local record(s). GitHub requests: 0.`;preview.className='preview ok';showStatus(restoring?'Local snapshot restored/reconciled from pasted GitHub copy; no GitHub request was made.':'Local import completed. Use Save GitHub explicitly for repository persistence.',8000);}catch(error){preview.textContent=error.message||String(error);preview.className='preview danger';}finally{operationBusy=false;textarea.disabled=false;setBusy();}});}
    async function openLibraryEditor(entry=null){const kind=entry?.libraryKind||libraryKindForSurface(activeSurface);const{overlay,modal}=makeOverlay(entry?'Edit local item':kind===deps.HELPER_LIBRARY_KINDS.PROMPT?'New prompt':'New local command');const fields=document.createElement('div');fields.className='fields';const titleWrap=document.createElement('label');titleWrap.className='field field-wide';titleWrap.innerHTML='<span>Title</span>';const title=document.createElement('input');title.value=entry?.title||'';titleWrap.append(title);const textWrap=document.createElement('label');textWrap.className='field field-wide';textWrap.innerHTML='<span>Exact insertion text</span>';const textarea=document.createElement('textarea');textarea.value=entry?.text||'';textWrap.append(textarea);const note=document.createElement('p');note.textContent='Save local changes the RAM/local snapshot only. After saving, use Save GitHub on the row when repository persistence is wanted.';const actions=document.createElement('div');actions.className='modal-actions';const cancel=document.createElement('button');cancel.textContent='Cancel';const save=document.createElement('button');save.textContent='Save local';actions.append(cancel,save);modal.append(titleWrap,textWrap,note,actions);cancel.addEventListener('click',()=>{overlay.remove();activeOverlay=null;});save.addEventListener('click',async()=>{try{const result=await options.onSaveLocalLibraryItem({kind,id:entry?.libraryId||'',title:title.value,text:textarea.value,createdAt:entry?.createdAt||''});setLibraryEntries(result);overlay.remove();activeOverlay=null;showStatus(result.unchanged?'No local content change. Repository evidence preserved. GitHub requests: 0.':'Saved locally. GitHub requests: 0.');}catch(error){showStatus(error.message||String(error),7000);}});}
    async function deleteLocalLibrary(entry){try{const result=await options.onDeleteLocalLibraryItem(entry.libraryKind,entry.libraryId);setLibraryEntries(result);showStatus('Removed from local snapshot. GitHub requests: 0.');}catch(error){showStatus(error.message||String(error),7000);}}
    async function copyRecoveryRequest(){try{const text=await options.onGetRecoveryRequest();showStatus(await options.onCopy(text)?'Recovery request copied. Paste it into ChatGPT; then paste ChatGPT’s marker blocks into Restore from GitHub copy.':'Could not copy the recovery request.',9000);}catch(error){showStatus(error.message||String(error),7000);}}
    async function openSettings(){const{overlay,modal}=makeOverlay('Repository settings');let current;try{current=await options.onLoadSettings();}catch(error){showStatus(error.message||String(error));return;}const fields=document.createElement('div');fields.className='fields';function add(labelText,value,type='text',wide=false){const wrap=document.createElement('label');wrap.className=`field${wide?' field-wide':''}`;const span=document.createElement('span');span.textContent=labelText;const input=document.createElement('input');input.type=type;input.value=value||'';wrap.append(span,input);fields.append(wrap);return input;}const owner=add('Owner',current.settings.owner),repo=add('Repository',current.settings.repo),branch=add('Branch',current.settings.branch),token=add('GitHub token — used only by explicit Check GitHub / Sync missing / Save GitHub actions',current.token,'password',true);const note=document.createElement('p');note.textContent='Normal startup/search/insert/copy/edit/import remains RAM/local-only. GitHub reads and writes happen only after an explicit Check GitHub, Sync missing or Save GitHub action. Sync missing downloads only repository paths absent locally; it never overwrites a same-path local record. Delete remains local-only.';const actions=document.createElement('div');actions.className='modal-actions';const cancel=document.createElement('button');cancel.textContent='Cancel';const save=document.createElement('button');save.textContent='Save settings';actions.append(cancel,save);modal.append(fields,note,actions);cancel.addEventListener('click',()=>{overlay.remove();activeOverlay=null;});save.addEventListener('click',async()=>{operationBusy=true;setBusy();try{const result=await options.onSaveSettings({owner:owner.value,repo:repo.value,branch:branch.value},token.value);applyState(result);overlay.remove();activeOverlay=null;showStatus(result.sourceChanged?'Repository settings saved. Repository evidence metadata was cleared before the source changed.':'Repository settings saved.');}catch(error){showStatus(error.message||String(error),7000);}finally{operationBusy=false;setBusy();}});}
    function shortPaths(paths){const rows=(paths||[]).map((path)=>String(path).split('/').pop());return rows.length?rows.join(', '):'—';}
    function inventoryText(result){const i=result.inventory;function line(label,b){return`${label}: local ${b.local}, GitHub ${b.remote}, same-path ${b.common}\n  local-only: ${shortPaths(b.localOnly)}\n  GitHub-only: ${shortPaths(b.remoteOnly)}${b.knownChanged?.length?`\n  known SHA changed: ${shortPaths(b.knownChanged)}`:''}`;}return`Repository: ${result.settings.owner}/${result.settings.repo}@${result.settings.branch}\n\n${line('Planning commands',i.planningCommands)}\n\n${line('Helper commands',i.helperCommands)}\n\n${line('Prompts',i.prompts)}`;}
    async function checkRepository(){operationBusy=true;setBusy();try{showStatus('Checking GitHub names/counts…',9000);const result=await options.onCheckRepository();const{overlay,modal}=makeOverlay('GitHub inventory check');const pre=document.createElement('div');pre.className='preview ok';pre.textContent=inventoryText(result);const actions=document.createElement('div');actions.className='modal-actions';const close=document.createElement('button');close.textContent='Close';close.addEventListener('click',()=>{overlay.remove();activeOverlay=null;});actions.append(close);modal.append(pre,actions);showStatus('GitHub inventory checked. Local snapshot was not changed.',7000);}catch(error){showStatus(`GitHub check failed: ${error.message||String(error)}`,9000);}finally{operationBusy=false;setBusy();}}
    async function syncMissingRepository(){operationBusy=true;setBusy();try{showStatus('Syncing GitHub-only records into local snapshot…',9000);const result=await options.onSyncMissingRepository();applyState(result);showStatus(`Sync complete: ${result.addedCommands||0} planning command(s), ${result.addedHelperCommands||0} helper command(s), ${result.addedPrompts||0} prompt(s) added locally. Existing local paths were not overwritten.`,9000);}catch(error){showStatus(`GitHub sync failed: ${error.message||String(error)}`,9000);}finally{operationBusy=false;setBusy();}}
    function keepPanelInViewport(){const width=panel.offsetWidth||580,height=panel.offsetHeight||720;left=Math.min(Math.max(left,8),Math.max(8,window.innerWidth-width-8));top=Math.min(Math.max(top,8),Math.max(8,window.innerHeight-height-8));panel.style.left=`${left}px`;panel.style.top=`${top}px`;}
    function enableDragging(){let pointerId=null,startX=0,startY=0,startLeft=0,startTop=0;function down(event){if(event.button!==0||event.target.closest('button'))return;pointerId=event.pointerId;startX=event.clientX;startY=event.clientY;const rect=panel.getBoundingClientRect();startLeft=rect.left;startTop=rect.top;header.setPointerCapture(pointerId);}function move(event){if(pointerId!==event.pointerId)return;left=startLeft+event.clientX-startX;top=startTop+event.clientY-startY;keepPanelInViewport();}function finish(event){if(pointerId===null)return;try{header.releasePointerCapture(pointerId);}catch(_){}pointerId=null;options.onSavePosition?.({left,top});}header.addEventListener('pointerdown',down);header.addEventListener('pointermove',move);header.addEventListener('pointerup',finish);header.addEventListener('pointercancel',finish);return()=>{header.removeEventListener('pointerdown',down);header.removeEventListener('pointermove',move);header.removeEventListener('pointerup',finish);header.removeEventListener('pointercancel',finish);};}
    function consumeToggle(token){const next=String(token||'');if(next&&next!==lastToggleToken){lastToggleToken=next;setOpen(!isOpen);}}function handleShortcut(event){if(event.repeat)return;if(event.key==='Escape'&&activeOverlay&&!operationBusy){activeOverlay.remove();activeOverlay=null;return;}if(event.altKey&&!event.ctrlKey&&!event.metaKey&&event.key==='F2'){event.preventDefault();setOpen(!isOpen);}else if(event.key==='Escape'&&isOpen)setOpen(false);}
    const observer=new MutationObserver((mutations)=>{for(const mutation of mutations){if(mutation.attributeName==='data-obs-planning-dashboard-open'){dashboardOpen=document.documentElement.dataset.obsPlanningDashboardOpen==='true';launcher.style.display=isOpen||dashboardOpen?'none':'block';}if(mutation.attributeName==='data-obs-planning-commands-toggle')consumeToggle(document.documentElement.dataset.obsPlanningCommandsToggle);}});observer.observe(document.documentElement,{attributes:true,attributeFilter:['data-obs-planning-dashboard-open','data-obs-planning-commands-toggle']});
    tabButtons.forEach((button)=>button.addEventListener('click',()=>switchSurface(button.dataset.surface)));launcher.addEventListener('click',()=>setOpen(true));closeButton.addEventListener('click',()=>setOpen(false));searchInput.addEventListener('input',()=>renderEntries(searchInput.value));newLibraryButton.addEventListener('click',()=>openLibraryEditor());root.querySelector('.import-chat').addEventListener('click',()=>openImport('import'));root.querySelector('.restore-chat').addEventListener('click',()=>openImport('restore'));root.querySelector('.recovery-request').addEventListener('click',copyRecoveryRequest);checkGithubButton.addEventListener('click',checkRepository);syncGithubButton.addEventListener('click',syncMissingRepository);root.querySelector('.settings').addEventListener('click',openSettings);window.addEventListener('resize',keepPanelInViewport);window.addEventListener('keydown',handleShortcut,true);const disableDragging=enableDragging();switchSurface(SURFACES.ORIENTATION);if(options.startupWarnings?.length)setTimeout(()=>showStatus(options.startupWarnings.join('\n'),9000),100);
    function dispose(){if(statusTimer!==null)clearTimeout(statusTimer);observer.disconnect();disableDragging();window.removeEventListener('resize',keepPanelInViewport);window.removeEventListener('keydown',handleShortcut,true);host.remove();}
    return{setCommandEntries,setLibraryEntries,switchSurface,setOpen,showStatus,dispose,host,root};
  }
  return{createPlanningHelperUi,repositorySaveFailureMessage};
});

(function (root, factory) {
  const api=factory(root.ObsPlanningHelper||{});
  if(typeof module==='object'&&module.exports)module.exports=api;
  root.ObsPlanningHelper=Object.assign(root.ObsPlanningHelper||{},api);
})(typeof globalThis!=='undefined'?globalThis:this,function(deps){
  'use strict';

  const INSTANCE_DISPOSE_KEY='__obsPlanningHelperDisposeV3';
  const LEGACY_DISPOSE_KEYS=['__obsPlanningHelperDisposeV2','__obsCommandHelperDisposeV1'];
  function createRepositoryOperationLock(){let active='';return{isBusy:()=>Boolean(active),active:()=>active,async run(label,task){if(active){const error=new Error(`Repository operation already in progress: ${active}.`);error.kind='busy';throw error;}active=String(label||'repository operation');try{return await task();}finally{active='';}}};}
  function helperKey(item){return`${item.kind}:${item.id}`;}
  function repositorySettingsKey(settings){return`${String(settings?.owner||'').trim().toLowerCase()}/${String(settings?.repo||'').trim().toLowerCase()}@${String(settings?.branch||'').trim()}`;}

  function materializeSnapshot(snapshot){
    const commandRecords=[...(snapshot.planningCommands||[])];
    const helperRecords=[...(snapshot.helperItems||[])];
    const definitions=commandRecords.map((record)=>record.definition);
    deps.validateCommandCatalog(definitions);
    const commandByFile=new Map(commandRecords.map((record)=>[record.definition.file,record]));
    const commandById=new Map(commandRecords.map((record)=>[record.definition.id,record]));
    const helperByKey=new Map(helperRecords.map((record)=>[helperKey(record.item),record]));
    const commandEntries=deps.buildCommandEntries(definitions).map((entry)=>{const record=commandById.get(entry.id);return{...entry,repositoryPath:record?.path||'',repositoryKnown:Boolean(record?.repositoryKnown),repositorySha:record?.repositorySha||''};});
    const helperEntries=helperRecords.map((record)=>{const item=record.item;const evidence=record.repositorySha?'local · GitHub SHA verified':record.repositoryKnown?'local · repository-backed content; SHA unverified':'local · repository match not verified';return{id:`helper-library:${item.kind}:${item.id}`,libraryId:item.id,libraryKind:item.kind,label:item.title,title:item.title,description:evidence,text:item.text,adaptiveBody:item.text,repositoryPath:record.path,repositoryKnown:Boolean(record.repositoryKnown),repositorySha:record.repositorySha||'',createdAt:item.createdAt,updatedAt:item.updatedAt};});
    return{commandRecords,helperRecords,commandByFile,commandById,helperByKey,commandEntries,localCommandEntries:helperEntries.filter((entry)=>entry.libraryKind===deps.HELPER_LIBRARY_KINDS.COMMAND),promptEntries:helperEntries.filter((entry)=>entry.libraryKind===deps.HELPER_LIBRARY_KINDS.PROMPT)};
  }

  function mergeChatImport(snapshot,parsed,mode='import'){
    if(mode!=='import'&&mode!=='restore')throw new TypeError(`Unsupported chat-import mode: ${mode}`);
    const current=materializeSnapshot(snapshot);
    const commandSeed=mode==='restore'?current.commandRecords.filter((record)=>!record.repositoryKnown):current.commandRecords;
    const helperSeed=mode==='restore'?current.helperRecords.filter((record)=>!record.repositoryKnown):current.helperRecords;
    const commandMap=new Map(commandSeed.map((record)=>[record.definition.file,record]));
    const helperMap=new Map(helperSeed.map((record)=>[helperKey(record.item),record]));
    const newCommandRecords=[],newHelperRecords=[];
    const restoreCommandFiles=new Set((parsed.definitions||[]).map((definition)=>deps.normalizeCommandDefinition(definition).file));
    const restoreHelperKeys=new Set((parsed.helperItems||[]).map((item)=>helperKey(deps.normalizeHelperLibraryItem(item))));
    const removedRepositoryCommands=mode==='restore'?current.commandRecords.filter((record)=>record.repositoryKnown&&!restoreCommandFiles.has(record.definition.file)).length:0;
    const removedRepositoryHelperItems=mode==='restore'?current.helperRecords.filter((record)=>record.repositoryKnown&&!restoreHelperKeys.has(helperKey(record.item))).length:0;
    for(const definition of parsed.definitions||[]){
      const normalized=deps.normalizeCommandDefinition(definition);const previous=current.commandByFile.get(normalized.file);
      const idCollision=[...commandMap.values()].find((record)=>record.definition.id===normalized.id&&record.definition.file!==normalized.file);
      if(idCollision)throw new TypeError(`Planning command id ${normalized.id} already belongs to ${idCollision.definition.file}.`);
      const rendered=deps.renderCommandDefinitionDocument(normalized);const unchanged=Boolean(previous)&&previous.rawContent===rendered;const record=deps.normalizeCommandRecord({definition:normalized,rawContent:rendered,repositoryKnown:mode==='restore'?true:(unchanged&&Boolean(previous?.repositoryKnown)),repositorySha:mode==='restore'?'':(unchanged?previous?.repositorySha||'':'')});
      commandMap.set(normalized.file,record);if(mode==='import'&&!previous)newCommandRecords.push(record);
    }
    for(const itemValue of parsed.helperItems||[]){const item=deps.normalizeHelperLibraryItem(itemValue),key=helperKey(item),previous=current.helperByKey.get(key),rendered=deps.renderHelperLibraryDocument(item),unchanged=Boolean(previous)&&previous.rawContent===rendered;const record=deps.normalizeHelperRecord({item,rawContent:rendered,repositoryKnown:mode==='restore'?true:(unchanged&&Boolean(previous?.repositoryKnown)),repositorySha:mode==='restore'?'':(unchanged?previous?.repositorySha||'':'')});helperMap.set(key,record);if(mode==='import'&&!previous)newHelperRecords.push(record);}
    const next={schemaVersion:deps.LOCAL_SNAPSHOT_SCHEMA_VERSION,savedAt:new Date().toISOString(),planningCommands:[...commandMap.values()],helperItems:[...helperMap.values()]};
    deps.normalizePlanningHelperLocalSnapshot(next);
    return{snapshot:next,newCommandRecords,newHelperRecords,removedRepositoryCommands,removedRepositoryHelperItems,parsed};
  }

  function previewChatImport(snapshot,text,mode='import'){
    const parsed=deps.parseChatImport(text);const merged=mergeChatImport(snapshot,parsed,mode);const current=materializeSnapshot(snapshot);
    const commandLines=(parsed.definitions||[]).map((definition)=>`${current.commandByFile.has(definition.file)?'LOCAL UPDATE':'NEW LOCAL'} planning/commands/${definition.file}`);
    const helperLines=(parsed.helperItems||[]).map((item)=>`${current.helperByKey.has(helperKey(item))?'LOCAL UPDATE':'NEW LOCAL'} ${deps.helperLibraryTargetPath(item)}`);
    const reconcileLines=mode==='restore'&&((merged.removedRepositoryCommands||0)||(merged.removedRepositoryHelperItems||0))?[`RECONCILE remove stale repository-backed local records: ${merged.removedRepositoryCommands||0} command(s), ${merged.removedRepositoryHelperItems||0} helper item(s)`]:[];
    return{...merged,lines:[...commandLines,...helperLines,...reconcileLines],mode};
  }

  function inventoryBucket(localRecords,remoteEntries){
    const localMap=new Map((localRecords||[]).map((record)=>[record.path,record]));
    const remoteMap=new Map((remoteEntries||[]).map((entry)=>[entry.path,entry]));
    const localOnly=[...localMap.keys()].filter((path)=>!remoteMap.has(path)).sort();
    const remoteOnly=[...remoteMap.keys()].filter((path)=>!localMap.has(path)).sort();
    const common=[...localMap.keys()].filter((path)=>remoteMap.has(path)).sort();
    const knownChanged=common.filter((path)=>{const local=localMap.get(path),remote=remoteMap.get(path);return Boolean(local.repositorySha)&&Boolean(remote.sha)&&local.repositorySha!==remote.sha;});
    return{local:localMap.size,remote:remoteMap.size,common:common.length,localOnly,remoteOnly,knownChanged};
  }

  function compareRepositoryInventory(snapshot,remoteCatalog){
    const memory=materializeSnapshot(snapshot);
    const remoteCommands=(remoteCatalog?.commands||[]).filter((entry)=>entry.kind==='planning-command');
    const remoteHelpers=remoteCatalog?.helperItems||[];
    const localHelperCommands=memory.helperRecords.filter((record)=>record.item.kind===deps.HELPER_LIBRARY_KINDS.COMMAND);
    const localPrompts=memory.helperRecords.filter((record)=>record.item.kind===deps.HELPER_LIBRARY_KINDS.PROMPT);
    return{
      planningCommands:inventoryBucket(memory.commandRecords,remoteCommands),
      helperCommands:inventoryBucket(localHelperCommands,remoteHelpers.filter((entry)=>entry.kind===deps.HELPER_LIBRARY_KINDS.COMMAND)),
      prompts:inventoryBucket(localPrompts,remoteHelpers.filter((entry)=>entry.kind===deps.HELPER_LIBRARY_KINDS.PROMPT))
    };
  }


  function prepareLocalHelperSave(snapshot,value,now=new Date().toISOString()){
    const memory=materializeSnapshot(snapshot);
    const input=value&&typeof value==='object'?value:{};
    const key=`${String(input.kind||'')}:${String(input.id||'')}`;
    const previous=input.id?memory.helperByKey.get(key):null;
    if(previous){
      const stable=deps.normalizeHelperLibraryItem({...input,kind:previous.item.kind,id:previous.item.id,createdAt:previous.item.createdAt,updatedAt:previous.item.updatedAt});
      const unchanged=stable.title===previous.item.title&&stable.text===previous.item.text;
      if(unchanged)return{changed:false,item:previous.item,record:previous,snapshot};
      const item=deps.normalizeHelperLibraryItem({...stable,updatedAt:now});
      const record=deps.normalizeHelperRecord({item,rawContent:deps.renderHelperLibraryDocument(item),repositoryKnown:false,repositorySha:''});
      return{changed:true,item,record,snapshot:{...snapshot,helperItems:[...memory.helperRecords.filter((entry)=>helperKey(entry.item)!==helperKey(item)),record]}};
    }
    const item=deps.normalizeHelperLibraryItem({...input,createdAt:input.createdAt||now,updatedAt:now});
    const record=deps.normalizeHelperRecord({item,rawContent:deps.renderHelperLibraryDocument(item),repositoryKnown:false,repositorySha:''});
    return{changed:true,item,record,snapshot:{...snapshot,helperItems:[...memory.helperRecords,record]}};
  }

  function clearRepositoryEvidence(snapshot){
    const memory=materializeSnapshot(snapshot);
    return deps.normalizePlanningHelperLocalSnapshot({...snapshot,planningCommands:memory.commandRecords.map((record)=>deps.normalizeCommandRecord({...record,repositoryKnown:false,repositorySha:''})),helperItems:memory.helperRecords.map((record)=>deps.normalizeHelperRecord({...record,repositoryKnown:false,repositorySha:''}))});
  }

  async function persistVerifiedRepositoryResult(persist,next,result,settings,uiState){
    try{await persist(next);return{settings,...result,localSnapshotUpdated:true,localSnapshotError:'',...uiState()};}
    catch(error){return{settings,...result,localSnapshotUpdated:false,localSnapshotError:error?.message||String(error),...uiState()};}
  }

  function mergeRemoteMissing(snapshot,remoteRecords={}){
    const memory=materializeSnapshot(snapshot);
    const commandMap=new Map(memory.commandRecords.map((record)=>[record.path,record]));
    const helperMap=new Map(memory.helperRecords.map((record)=>[record.path,record]));
    const addedCommands=[],addedHelpers=[];
    for(const remote of remoteRecords.commands||[]){if(commandMap.has(remote.path))continue;const record=deps.normalizeCommandRecord({definition:remote.definition,path:remote.path,rawContent:remote.rawContent,repositoryKnown:true,repositorySha:remote.sha});commandMap.set(record.path,record);addedCommands.push(record);}
    const mergedDefinitions=[...commandMap.values()].map((record)=>record.definition);deps.validateCommandCatalog(mergedDefinitions);
    for(const remote of remoteRecords.helperItems||[]){if(helperMap.has(remote.path))continue;const record=deps.normalizeHelperRecord({item:remote.item,path:remote.path,rawContent:remote.rawContent,repositoryKnown:true,repositorySha:remote.sha});helperMap.set(record.path,record);addedHelpers.push(record);}
    const next=deps.normalizePlanningHelperLocalSnapshot({schemaVersion:deps.LOCAL_SNAPSHOT_SCHEMA_VERSION,savedAt:new Date().toISOString(),planningCommands:[...commandMap.values()],helperItems:[...helperMap.values()]});
    return{snapshot:next,addedCommands,addedHelpers};
  }

  async function insertWithClipboard(text,success,id,operations=deps){
    let copied=false;
    try{const copyResult=operations.copyText(text);copied=copyResult&&typeof copyResult.then==='function'?Boolean(await copyResult):Boolean(copyResult);}catch(_){copied=false;}
    const result=operations.insertIntoComposer(text,id);
    if(result.ok)return copied?`${success} · clipboard ready`:`${success} · clipboard copy failed`;
    return copied?`Direct insertion failed (${result.reason}). The exact text is in the clipboard — paste manually.`:`Direct insertion failed (${result.reason}) and clipboard copy also failed.`;
  }

  async function startPlanningHelper(options={}){
    for(const key of [INSTANCE_DISPOSE_KEY,...LEGACY_DISPOSE_KEYS]){const previous=globalThis[key];if(typeof previous==='function'){try{previous();}catch(_){}}}
    const bundled=Array.isArray(options.bundledCommands)?options.bundledCommands:[];deps.validateCommandCatalog(bundled);
    const semanticEntries=deps.buildSemanticEntries();const repositoryLock=createRepositoryOperationLock();
    const loaded=await deps.loadOrMigratePlanningHelperLocalSnapshot(bundled);let snapshot=loaded.snapshot;let memory=materializeSnapshot(snapshot);const startupWarnings=[...(loaded.warnings||[])];if(loaded.migrated)startupWarnings.push('Planning Helper migrated existing local caches into one RAM-first local snapshot.');
    function uiState(){return{commandEntries:memory.commandEntries,localCommandEntries:memory.localCommandEntries,promptEntries:memory.promptEntries};}
    async function persist(next){snapshot=await deps.savePlanningHelperLocalSnapshot(next);memory=materializeSnapshot(snapshot);return uiState();}
    async function makeClient(){const settings=await deps.loadRepositorySettings();const token=await deps.loadGitHubToken();if(typeof GM_xmlhttpRequest!=='function')throw new Error('GM_xmlhttpRequest is unavailable; reinstall the generated Planning Helper userscript and accept its GM grants.');return{client:new deps.GitHubContentsClient({...settings,token,transport:deps.createGmTransport(GM_xmlhttpRequest)}),settings,token};}
    async function makeServices(){const{client,settings}=await makeClient();return{commandService:new deps.RepositoryCommandService(client,{commandsPath:deps.COMMANDS_PATH}),helperService:new deps.RepositoryHelperLibraryService(client),settings};}

    async function applyChatText(text,mode='import'){
      return repositoryLock.run(mode==='restore'?'Restore local snapshot':'Import chat items',async()=>{const parsed=deps.parseChatImport(text);const merged=mergeChatImport(snapshot,parsed,mode);await persist(merged.snapshot);return{ok:true,mode,createdLocal:merged.newCommandRecords.length+merged.newHelperRecords.length,removedRepositoryCommands:merged.removedRepositoryCommands||0,removedRepositoryHelperItems:merged.removedRepositoryHelperItems||0,errors:[],...uiState()};});
    }

    async function saveLocalLibraryItem(value){const prepared=prepareLocalHelperSave(snapshot,value);if(!prepared.changed)return{item:prepared.item,unchanged:true,...uiState()};const state=await persist(prepared.snapshot);return{item:prepared.item,unchanged:false,...state};}
    async function deleteLocalLibraryItem(kind,id){const key=`${kind}:${id}`;const next={...snapshot,helperItems:memory.helperRecords.filter((record)=>helperKey(record.item)!==key)};return persist(next);}

    async function checkRepository(){return repositoryLock.run('Check GitHub inventory',async()=>{const{commandService,helperService,settings}=await makeServices();const commands=await commandService.listRemote();const helperItems=await helperService.listRemoteAll();return{settings,inventory:compareRepositoryInventory(snapshot,{commands,helperItems}),remoteCatalog:{commands,helperItems}};});}

    async function syncMissingRepository(){return repositoryLock.run('Sync missing from GitHub',async()=>{const{commandService,helperService,settings}=await makeServices();const commands=await commandService.listRemote();const helperItems=await helperService.listRemoteAll();const inventory=compareRepositoryInventory(snapshot,{commands,helperItems});const commandMissing=new Set(inventory.planningCommands.remoteOnly),helperMissing=new Set([...inventory.helperCommands.remoteOnly,...inventory.prompts.remoteOnly]);const remoteCommands=[],remoteHelpers=[];for(const entry of commands)if(commandMissing.has(entry.path))remoteCommands.push(await commandService.readRemote(entry.path));for(const entry of helperItems)if(helperMissing.has(entry.path))remoteHelpers.push(await helperService.readRemote(entry.path));const merged=mergeRemoteMissing(snapshot,{commands:remoteCommands,helperItems:remoteHelpers});await persist(merged.snapshot);return{settings,addedCommands:merged.addedCommands.length,addedHelperCommands:merged.addedHelpers.filter((record)=>record.item.kind===deps.HELPER_LIBRARY_KINDS.COMMAND).length,addedPrompts:merged.addedHelpers.filter((record)=>record.item.kind===deps.HELPER_LIBRARY_KINDS.PROMPT).length,inventoryBefore:inventory,...uiState()};});}

    async function saveRepositoryEntity(reference){return repositoryLock.run('Save item to GitHub',async()=>{const{commandService,helperService,settings}=await makeServices();const type=String(reference?.type||'');let result,next;if(type==='planning-command'){const record=memory.commandById.get(String(reference.id||''));if(!record)throw new Error(`Local planning command not found: ${reference?.id||'<empty>'}`);result=await commandService.save(record.definition);next={...snapshot,planningCommands:memory.commandRecords.map((entry)=>entry.path===record.path?deps.normalizeCommandRecord({...entry,rawContent:result.rawContent,repositoryKnown:true,repositorySha:result.sha}):entry)};}else if(type==='helper'){const key=`${reference?.kind}:${reference?.id}`;const record=memory.helperByKey.get(key);if(!record)throw new Error(`Local helper item not found: ${key}`);result=await helperService.save(record.item);next={...snapshot,helperItems:memory.helperRecords.map((entry)=>entry.path===record.path?deps.normalizeHelperRecord({...entry,rawContent:result.rawContent,repositoryKnown:true,repositorySha:result.sha}):entry)};}else throw new TypeError(`Unsupported repository entity type: ${type||'<empty>'}`);return persistVerifiedRepositoryResult(persist,next,result,settings,uiState);});}

    async function getRecoveryRequest(){const settings=await deps.loadRepositorySettings();return deps.buildRecoveryRequest(settings);}
    async function loadSettings(){return{settings:await deps.loadRepositorySettings(),token:await deps.loadGitHubToken()};}
    async function saveSettings(settings,token){return repositoryLock.run('Save repository settings',async()=>{const previous=await deps.loadRepositorySettings();const candidate=deps.validateRepositorySettings(settings);const sourceChanged=repositorySettingsKey(previous)!==repositorySettingsKey(candidate);if(sourceChanged)await persist(clearRepositoryEvidence(snapshot));await deps.saveGitHubToken(token);await deps.saveRepositorySettings(candidate);return{sourceChanged,...uiState()};});}

    const ui=deps.createPlanningHelperUi({surfaces:deps.SURFACES,semanticEntries,...uiState(),position:deps.readPanelPosition(),onSavePosition:deps.savePanelPosition,onInsert:(text,success,id)=>insertWithClipboard(text,success,id),onCopy:deps.copyText,onPreviewChatImport:(text,mode)=>previewChatImport(snapshot,text,mode),onApplyChatImport:applyChatText,onGetRecoveryRequest:getRecoveryRequest,onSaveLocalLibraryItem:saveLocalLibraryItem,onDeleteLocalLibraryItem:deleteLocalLibraryItem,onCheckRepository:checkRepository,onSyncMissingRepository:syncMissingRepository,onSaveRepositoryEntity:saveRepositoryEntity,onLoadSettings:loadSettings,onSaveSettings:saveSettings,startupWarnings});
    function dispose(){ui?.dispose();if(globalThis[INSTANCE_DISPOSE_KEY]===dispose)delete globalThis[INSTANCE_DISPOSE_KEY];for(const key of LEGACY_DISPOSE_KEYS)if(globalThis[key]===dispose)delete globalThis[key];}
    globalThis[INSTANCE_DISPOSE_KEY]=dispose;
    return{dispose,getSnapshot:()=>snapshot,getDefinitions:()=>memory.commandRecords.map((record)=>record.definition),getLocalLibrary:()=>memory.helperRecords.map((record)=>record.item),previewChatImport:(text,mode)=>previewChatImport(snapshot,text,mode),applyChatImport:applyChatText,checkRepository,syncMissingRepository,saveRepositoryEntity,getRepositoryOperation:()=>repositoryLock.active()};
  }

  return{startPlanningHelper,createRepositoryOperationLock,materializeSnapshot,mergeChatImport,previewChatImport,compareRepositoryInventory,mergeRemoteMissing,prepareLocalHelperSave,clearRepositoryEvidence,persistVerifiedRepositoryResult,insertWithClipboard};
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
    "activeContextBehavior": "Use only when review-diff-file transfer is explicitly requested. This is a legacy reviewable package route: source selection, exact local-base verification, apply/diff and review behavior come from this command's own ownerFiles, not from the producer-only build replacement archive route.",
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
      "Follow this legacy route's ownerFiles for source selection, exact local-base verification, apply/diff and review.",
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
    "description": "output replacement package",
    "meaning": "Produce a replacement ZIP plus a short OBS-ACTION handoff. This is package-producer mode, not local apply/review/finalization mode and not archive read-source mode.",
    "activeContextBehavior": "Use the active approved scope and exact checked source state. An earlier-message archive is not current automatically. A source archive/snapshot may be selected for the active invocation when it is explicitly provided or selected for that invocation and, after inspection, matches the intended repository/target and completely covers the touched source. Otherwise use fully readable current repository files. Never guess touched base content.",
    "traversalReadMode": "Targeted/full depending on touched files and source certainty.",
    "ownerFiles": [
      "planning/documentation/build-replacement-archive-workflow.md"
    ],
    "expectedOutput": "One full replacement ZIP plus one short structured OBS-ACTION block; complete replacement/base payloads required by the package contract; no local apply/diff/finalization commands.",
    "permissionMode": "package-no-commit-push",
    "keyReminders": [
      "Package-producer mode, not archive read-source mode.",
      "An earlier-message archive is not current automatically.",
      "A source archive/snapshot explicitly provided or selected for the active invocation may be used only after verifying repository/target match and complete touched-source coverage.",
      "Otherwise use fully readable current repository files.",
      "Request only the minimum fresh source/snapshot when exact touched base content cannot be read reliably.",
      "Never guess expected base content for replace/delete operations.",
      "Resolve the project Scope Registry when present; every affected scope log/reference required for coherent post-Apply state is part of the package transition.",
      "When logging is active, include material Idea Review/later clarification/prior ReviewDiff correction meaning and the APPLIED target-state relation; do not defer log correctness to a later package.",
      "Produce one full replacement ZIP with PACKAGE.json, required base-files and replacement-files.",
      "Return one short OBS-ACTION whose packageId matches PACKAGE.json.",
      "Do not include clipboard/review-diff settings in OBS-ACTION.",
      "Do not apply locally, generate review/finalization commands, commit or push."
    ],
    "userTarget": "<what replacement package should include>",
    "palette": true,
    "refinements": []
  },
  {
    "schemaVersion": 1,
    "id": "ideas.collect",
    "file": "collect-ideas.command.md",
    "command": "собери идеи",
    "englishName": "collect ideas",
    "commandFamily": [
      "собери идеи",
      "collect ideas"
    ],
    "description": "collect/review Ideas and integrate affected useful-result planning",
    "meaning": "Extract coherent Ideas from the selected source, preserve material non-Idea context, perform the shared Standard Idea Review, resolve affected/new Workspace Use Cases or Application Scenarios and return one integrated plan grouped by those useful-result owners to the requested/justified planning depth.",
    "activeContextBehavior": "Use the explicitly selected or clearly active current source; ask only when the source is genuinely missing or ambiguous. Use an explicitly requested planning depth when stated. For documentation/Workspace planning, normally continue through Step 1 + Step 2 when the UC boundary is sufficiently grounded; include Step 3 only when requested or realization is sufficiently grounded. For Application behavior, use current Scenario/Application Planning owners proportionally rather than forcing the Workspace planning shape onto the application boundary.",
    "traversalReadMode": "Targeted/full by source size, current-owner uncertainty, affected useful results and selected planning depth.",
    "ownerFiles": [
      "planning/documentation/idea-planning-principles-and-terminology.md",
      "planning/documentation/idea-review-and-planning-workflow.md",
      "planning/documentation/IDEA-REVIEW-TEMPLATE.md",
      "planning/documentation/direction-and-use-case-registry-workflow.md",
      "planning/documentation/workspace-planning/workspace-planning-principles-and-terminology.md",
      "planning/documentation/workspace-planning/WORKSPACE-USE-CASE-PLANNING-TEMPLATE.md"
    ],
    "expectedOutput": "Source/Baseline + Current Plan Snapshot + early Current-Plan-relative Questions/Risks/Problems + compact cross-cutting Ideas when material + detailed groups by affected/new Workspace UC or Application Scenario, each planned to the requested/justified depth + Resolved UC Graph/Cross-UC or Cross-Slice Architecture Review when several units are materially involved + Current Overall Conclusions + only unselected Potential Simplifications/Better Routes.",
    "permissionMode": "read-only",
    "keyReminders": [
      "Use the explicitly selected or clearly active current source; do not silently select an earlier archive, ledger or message.",
      "Not every source statement is an Idea; preserve relevant Existing Reality, constraints, decisions, corrections and questions with their proper meaning.",
      "Perform every mandatory Idea review check, but do not manufacture objections, risks or refinements merely to populate fields.",
      "Actively test whether each Idea deserves implementation and whether a genuinely simpler or better route exists.",
      "Idea remains the generic Idea entity; do not create Scenario Idea, Workspace-UC Idea, File-Update Idea or other context-specific Idea types.",
      "For material selected change, resolve affected existing/new Workspace UCs or Application Scenarios using current semantic owners and normal independent-usefulness/Scenario-boundary rules.",
      "Several Ideas affecting one UC/Scenario converge into one integrated target for that unit; do not create one competing target per Idea.",
      "One cross-cutting Idea that affects several units is reviewed once and referenced from each affected unit with only its local impact.",
      "Keep Questions / Risks / Problems near the beginning after a short Current Plan Snapshot; aggregate units remain unresolved/adverse delta to Current Plan, not a confirmation log.",
      "For each affected Workspace UC, keep Step 1, Step 2 and Step 3 inside the same UC block. Preserve earlier later-step knowledge as Carry-Forward Context; do not silently finalize it before its dedicated review.",
      "For documentation/Workspace planning, Step 1 + Step 2 is the normal default once the target UC boundary is grounded. Step 1 may stand alone when the target UC/Scenario picture is still materially unresolved.",
      "Step 3 includes expected Workspace Change Path + proportional current Architecture Lens before exact files when architecture is material; do not optimize raw step/file count.",
      "Current State normally uses a high-level summary + direct current-owner links. Target changed/new semantic meaning must be complete enough that implementation does not invent missing decisions; keep Current→Target Transition separate.",
      "When several UCs/Slices are affected, review their combined architecture effect, classify cross-Slice overlap and challenge the number/necessity of shared coordination owners.",
      "The command is an orchestration shortcut, not semantic authority. Read the affected current UC/Scenario/Domain/Architecture owners instead of copying their contracts into the command.",
      "Potential Simplifications / Better Routes contains only not-yet-selected candidate changes to Current Plan and is removed once a candidate is selected.",
      "When scope logging is already active, treat the material review result as a loggable source for the next approved mutation/package; this read-only command itself does not edit logs.",
      "Do not edit repository files, create an archive, commit or push."
    ],
    "userTarget": "<source/discussion to collect Ideas from>",
    "palette": true,
    "refinements": []
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
    "ownerFiles": [
      "planning/documentation/idea-planning-principles-and-terminology.md",
      "planning/documentation/idea-review-and-planning-workflow.md",
      "planning/documentation/review-diff-review-workflow.md"
    ],
    "expectedOutput": "Truth-seeking verdict grounded in checked owners/evidence; material corrective Ideas use shared Idea review; ReviewDiff targets use the ReviewDiff semantic-review workflow.",
    "permissionMode": "read-only",
    "keyReminders": [
      "Treat target as hypothesis, not accepted truth.",
      "Use shared Idea review for material answer-seeking corrective alternatives; do not manufacture Ideas for mechanical findings.",
      "When the target is a ReviewDiff, distinguish technical integrity from semantic correctness and follow the ReviewDiff semantic-review workflow.",
      "Surface material Questions / Risks / Problems and ask the user only for genuinely unresolved material choices.",
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
      "planning/use-case-registry.md",
      "planning/documentation/status-reconciliation-workflow.md"
    ],
    "expectedOutput": "Concise current state separating repo, local and unknown, plus next safe action.",
    "permissionMode": "read-only",
    "keyReminders": [
      "Report current repo/chat/planning state from checked current owners.",
      "Separate known, local, unknown and not checked.",
      "Use Directions/Use Cases to resolve the current owner instead of a manually synchronized global state register.",
      "Do not present an unstated future plan as confirmed.",
      "Do not edit or archive unless separately requested."
    ],
    "userTarget": "<state target>",
    "palette": true,
    "refinements": []
  },
  {
    "schemaVersion": 1,
    "id": "governance.development",
    "file": "development-governance.command.md",
    "command": "режим разработки",
    "englishName": "development governance mode",
    "commandFamily": [
      "режим разработки",
      "development governance mode"
    ],
    "description": "load planning + documentation governance",
    "meaning": "Establish planning-governed application-development context and documentation governance without authorizing edits by itself.",
    "activeContextBehavior": "Use the active application/repository target when clear.",
    "traversalReadMode": "Full for governance/root planning owners; targeted for selected planning Use Cases and application Scenarios/current owners.",
    "ownerFiles": [
      "planning/AI-WORKING-CONTRACT.md",
      "planning/README.md",
      "planning/direction-registry.md",
      "planning/documentation/application-planning/application-planning-principles-and-terminology.md",
      "planning/documentation/application-planning/solution-and-scenario-planning-workflow.md",
      "planning/documentation/planning-docs-architecture-principles.md"
    ],
    "expectedOutput": "Established development governance route: selected planning Workspace Use Case and/or application Scenario/current owner plus documentation owner when docs are affected; no mutation permission implied.",
    "permissionMode": "read-only",
    "keyReminders": [
      "Develop from current selected planning meaning, not an unreviewed Idea or conversational assumption.",
      "Resolve current Direction / Application Scenario / Scenario owner before materially changing behavior.",
      "Implementation Idea is not selected architecture.",
      "Documentation changed during development must follow reusable documentation principles.",
      "Code does not silently create a second documentation owner.",
      "This command establishes working rules only; actual edits require the applicable authorization."
    ],
    "userTarget": "<application/development work in this session>",
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
      "planning/documentation/reviewable-agent-output-and-commands-workflow.md",
      "planning/documentation/documentation-update-workflow.md",
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
      "planning/documentation/command-routing-workflow.md",
      "planning/documentation/COMMAND-ROUTING-TEMPLATE.md"
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
    "meaning": "Produce one concrete file/docs/code/archive update plan from current selected planning meaning.",
    "activeContextBehavior": "Ask target/scope only when active context does not make it clear.",
    "traversalReadMode": "Reuse/targeted/full by update risk.",
    "ownerFiles": [
      "planning/documentation/idea-planning-principles-and-terminology.md",
      "planning/documentation/idea-review-and-planning-workflow.md",
      "planning/documentation/file-update-overview-workflow.md",
      "planning/documentation/FILE-UPDATE-OVERVIEW-TEMPLATE.md"
    ],
    "expectedOutput": "Idea-aware File Update Plan from one Current Selected Meaning: Current Conclusions, mandatory Current-Plan-relative Questions / Risks / Problems, unselected Potential Simplifications / Better Routes when material, then ordered concrete steps/files/checks/next action.",
    "permissionMode": "plan-only",
    "keyReminders": [
      "Plan file/docs/code/archive update only.",
      "Treat only explicit user statements and checked source facts as confirmed.",
      "Use shared Idea review only when the update contains material conceptual uncertainty; do not manufacture Idea analysis for mechanical updates.",
      "When alternatives are material, keep them as Idea Variants and identify one Current Selected Variant before concrete file steps.",
      "Possible Idea Refinements are not file edits and do not become selected changes automatically.",
      "Establish the one Current Plan from Current Selected Meaning before aggregate findings.",
      "Every real Questions / Risks / Problems unit states Current Plan, the unresolved/adverse finding, and its relation or impact on that plan; reference Related Idea IDs when applicable.",
      "Potential Simplifications / Better Routes contains only not-yet-selected candidate changes to Current Plan and states Current Plan plus Change To Current Plan; accepted simplifications belong in Current Conclusions/Update Steps instead.",
      "Do not use aggregate sections to confirm selected routes, repeat ordinary boundaries, or preserve completed reasoning.",
      "For unresolved important choices, keep current selected meaning explicit and surface alternatives/questions separately.",
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
    "command": "бутстреп документации",
    "englishName": "bootstrap reusable documentation principles",
    "commandFamily": [
      "бутстреп документации",
      "бутстреп принципов документации",
      "режим документации",
      "прочитай принципы документации",
      "прочти принципы документации",
      "принципы документации",
      "bootstrap reusable documentation principles",
      "documentation governance mode",
      "read documentation principles",
      "documentation principles",
      "docs principles"
    ],
    "description": "load reusable documentation governance",
    "meaning": "Establish reusable documentation-governance context, resolve the applicable Documentation Use Case and canonical owners, and preserve the task's permission boundary without authorizing repository edits.",
    "activeContextBehavior": "Use the active documentation/repository target when clear and resolve its UC-DOC-* + owners; if no task is active, load governance and stop ready for the next documentation task without forcing a target question.",
    "traversalReadMode": "Full when reusable governance is not current/remembered or uncertain; targeted refresh only after a current full bootstrap.",
    "ownerFiles": [
      "planning/AI-WORKING-CONTRACT.md",
      "planning/documentation/direction-registry.md",
      "planning/documentation/use-case-registry.md",
      "planning/documentation/planning-docs-architecture-principles.md",
      "planning/documentation/documentation-responsibility-map.md",
      "planning/documentation/documentation-principles-read-workflow.md"
    ],
    "expectedOutput": "Compact reusable-documentation bootstrap result: selected Documentation Use Case when applicable, reusable owners loaded, current/project owners, permission boundary and material unresolved ownership/questions; no repository mutation.",
    "permissionMode": "read-only",
    "keyReminders": [
      "Apply reusable documentation principles to documentation work after this bootstrap.",
      "Resolve DIR-DOCUMENTATION / the applicable UC-DOC-* and canonical owner before proposing a new file or moving meaning.",
      "Keep reusable methodology separate from project/current state; README/index navigation does not own full semantic bodies.",
      "Commands, examples, helper projections and implementation do not override canonical semantic owners.",
      "Use full bootstrap when governance is not current/remembered or boundaries are uncertain; targeted refresh only after a current full pass.",
      "If no active task exists, load governance and stop ready for the next documentation task instead of inventing a target.",
      "This command is read-only and does not authorize file edits, archive creation, commit or push."
    ],
    "userTarget": "<documentation work in this session or none yet>",
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
    "description": "use registered parallel-work scope",
    "meaning": "Resolve the fixed Parallel Work Scope Registry and establish one workstream inside the already registered affected scope(s), including canonical scope-log ownership for cross-scope work.",
    "activeContextBehavior": "Use the active work target when clear; otherwise ask only for the concrete workstream target needed to resolve existing registered scope(s).",
    "traversalReadMode": "Targeted/full by affected registered scope(s).",
    "ownerFiles": [
      "parallel-work-scope-registry.md",
      "planning/documentation/parallel-work-scope-and-action-log-workflow.md"
    ],
    "expectedOutput": "Selected registered parallel-work scope(s), canonical scope log for the work, cross-scope boundary/reference requirements and the route-specific next action; no ad-hoc shadow workspace.",
    "permissionMode": "scope-routing-only",
    "keyReminders": [
      "Read the root Scope Registry; do not invent or repartition scopes ad hoc.",
      "A path belongs to the deepest active registered scope root containing it.",
      "For cross-scope work choose one affected canonical log for the full record; other affected logs hold references only.",
      "This command selects scope/log routing only and does not itself authorize edits, archive creation, commit or push."
    ],
    "userTarget": "<parallel workstream target>",
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
