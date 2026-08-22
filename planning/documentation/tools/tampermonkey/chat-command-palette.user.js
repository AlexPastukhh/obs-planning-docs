// ==UserScript==
// @name         Reusable Chat Planning Helper
// @namespace    https://github.com/AlexPastukhh/obs/reusable-docs
// @version      0.29.1-repository-command-registry
// @description  RAM-first OBS Planning Helper with editable real Planning Commands, prompts and explicit GitHub actions.
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
// Local seed catalogs: planning/documentation/tools/tampermonkey/chat-command-palette/seed/commands.json + seed/use-cases.json
// Planning-command authority: planning/commands/*.command.md
// Use-Case authority: every current canonical planning/**/use-case-registry.md; Helper projection/UC-invocation rows are generated.
// Prompt library: planning/helper-library/prompts/ (helper-library/commands is legacy compatibility)
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

  function buildUseCaseInvocationBody(genericDefinition,useCase,mode=MODE.ADAPTIVE){
    const full=mode===MODE.FULL;
    return [
      '[PLANNING_COMMAND]',
      'Read this whole command body before answering.',
      'Do not ignore `key_reminders`.',
      '',
      'command:',
      `  ${useCase.label}`,
      '',
      'english_name:',
      `  invoke use case · ${useCase.label}`,
      '',
      'command_definition:',
      `  planning/commands/${genericDefinition.file}`,
      '',
      'use_case_id:',
      `  ${useCase.id}`,
      '',
      'source_of_truth:',
      '  Start from `planning/command-routing.md`.',
      `  Then read \`planning/commands/${genericDefinition.file}\` and resolve \`${useCase.id}\` in \`${useCase.sources[0]}\`.`,
      '  Follow the current UC owner route; the Helper projection is not semantic authority.',
      '',
      'route_read_rule:',
      `  ${full?'Read the complete relevant current owner route for this UC.':'Read or reread the selected UC route when it is not current, remembered or certain.'}`,
      '  Do not expand permissions merely because the UC is selected.',
      '',
      'key_reminders:',
      ...genericDefinition.keyReminders.map((item)=>`  - ${item}`),
      `  - Current UC result: ${useCase.description||useCase.label}`,
      '',
      'user_target:',
      `  ${useCase.target||'<current target>'}`,
      '',
      '[/PLANNING_COMMAND]'
    ].join('\n');
  }

  function useCaseInvocationCommandId(useCaseId){return `uc.invoke.${String(useCaseId||'').toLowerCase()}`;}
  function buildUseCaseInvocationEntry(genericDefinition,useCase){return{id:useCaseInvocationCommandId(useCase.id),entityType:'use-case-invocation-command',useCaseId:useCase.id,label:useCase.label,command:useCase.label,englishName:`invoke use case · ${useCase.label}`,description:`Manual invocation of ${useCase.id} through its current canonical owner route`,directionIds:[useCase.directionId],adaptiveBody:buildUseCaseInvocationBody(genericDefinition,useCase,MODE.ADAPTIVE),fullBody:buildUseCaseInvocationBody(genericDefinition,useCase,MODE.FULL),refinementBodies:[],stateLabel:'Generated UC invocation · canonical registry remains authority'};}

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

  return { MODE, commandReadBlock, buildCommandBody, buildRefinementBody, buildUseCaseInvocationBody, useCaseInvocationCommandId, buildUseCaseInvocationEntry, buildCommandEntry, buildCommandEntries };
});

(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsPlanningHelper = Object.assign(root.ObsPlanningHelper || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const SURFACES = Object.freeze({ COMMANDS:'Commands', USE_CASES:'Use Cases', PROMPTS:'Prompts' });
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

  // BEGIN GENERATED CURRENT USE CASE PROJECTIONS
  const USE_CASE_DEFINITIONS=[
    {
      "id": "UC-DOC-BUILD-REPLACEMENT-PACKAGE",
      "label": "Build Replacement Package",
      "description": "package an approved exact file transition for a local consumer",
      "sources": [
        "planning/documentation/use-case-registry.md"
      ],
      "instruction": "Resolve UC-DOC-BUILD-REPLACEMENT-PACKAGE in the current canonical registry and follow its current owner route (build-replacement-archive-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Build Replacement Package target>",
      "directionId": "DIR-DOCUMENTATION",
      "manualInvocation": true,
      "trigger": "approved file transition + exact touched base",
      "result": "protocol-valid ZIP + OBS-ACTION",
      "commandId": "replacement_archive.create"
    },
    {
      "id": "UC-DOC-BUILD-REVIEWABLE-ARCHIVE",
      "label": "Build Legacy Review-Diff Archive Route",
      "description": "support the explicitly selected legacy repo-stored/clipboard diff-transfer package route",
      "sources": [
        "planning/documentation/use-case-registry.md"
      ],
      "instruction": "Resolve UC-DOC-BUILD-REVIEWABLE-ARCHIVE in the current canonical registry and follow its current owner route (reviewable-agent-output-and-commands-workflow.md + review-diff-file-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Build Legacy Review-Diff Archive Route target>",
      "directionId": "DIR-DOCUMENTATION",
      "manualInvocation": true,
      "trigger": "user explicitly selects legacy review-diff package mode",
      "result": "route-owned archive + transfer/capture instructions",
      "commandId": "replacement_archive.review_diff.create"
    },
    {
      "id": "UC-DOC-CONFIGURE-REVIEW-DEPENDENCIES",
      "label": "Configure Required Dependency Reviews",
      "description": "register semantic source→consumer relationships whose source changes must signal explicit downstream review",
      "sources": [
        "planning/documentation/use-case-registry.md"
      ],
      "instruction": "Resolve UC-DOC-CONFIGURE-REVIEW-DEPENDENCIES in the current canonical registry and follow its current owner route (review-dependency-planning-workflow.md + Linked Notes mechanism when available). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Configure Required Dependency Reviews target>",
      "directionId": "DIR-DOCUMENTATION",
      "manualInvocation": true,
      "trigger": "a meaningful dependency should not rely on human memory to notice downstream impact",
      "result": "explicit Review Dependency with source, consumer(s), reason/scope and freshness/review tracking route"
    },
    {
      "id": "UC-DOC-ESTABLISH-DEPENDENCY",
      "label": "Establish Semantic Dependency",
      "description": "decide/classify one meaningful semantic dependency and its owner/handoff",
      "sources": [
        "planning/documentation/use-case-registry.md"
      ],
      "instruction": "Resolve UC-DOC-ESTABLISH-DEPENDENCY in the current canonical registry and follow its current owner route (review-dependency-planning-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Establish Semantic Dependency target>",
      "directionId": "DIR-DOCUMENTATION",
      "manualInvocation": true,
      "trigger": "one owner/result materially depends on another",
      "result": "selected semantic dependency intent/classification + affected owners + realization need when any"
    },
    {
      "id": "UC-DOC-FIND-OWNER",
      "label": "Determine Where Information Belongs",
      "description": "place meaning in the narrowest non-duplicated owner zone",
      "sources": [
        "planning/documentation/use-case-registry.md"
      ],
      "instruction": "Resolve UC-DOC-FIND-OWNER in the current canonical registry and follow its current owner route (documentation-responsibility-zone-review-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Determine Where Information Belongs target>",
      "directionId": "DIR-DOCUMENTATION",
      "manualInvocation": true,
      "trigger": "content/file responsibility is unclear",
      "result": "reusable/project classification + narrow canonical owner"
    },
    {
      "id": "UC-DOC-MAINTAIN-COMMAND",
      "label": "Create / Maintain Planning Command",
      "description": "create or change a registered executable shortcut without turning it into semantic authority",
      "sources": [
        "planning/documentation/use-case-registry.md"
      ],
      "instruction": "Resolve UC-DOC-MAINTAIN-COMMAND in the current canonical registry and follow its current owner route (command-planning-workflow.md + command-routing-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Create / Maintain Planning Command target>",
      "directionId": "DIR-DOCUMENTATION",
      "manualInvocation": true,
      "trigger": "a new command is useful or an existing command route/definition must change",
      "result": "validated current planning/commands/*.command.md definition + correct semantic-entry/owner route + explicit output/permission boundary",
      "commandId": "command.plan"
    },
    {
      "id": "UC-DOC-MAINTAIN-NAVIGATION",
      "label": "Maintain Repository Documentation Navigation",
      "description": "maintain natural README/index/Direction-to-applicable-semantic-entry discovery routes without duplicating semantic bodies",
      "sources": [
        "planning/documentation/use-case-registry.md"
      ],
      "instruction": "Resolve UC-DOC-MAINTAIN-NAVIGATION in the current canonical registry and follow its current owner route (architecture principles + responsibility map + affected README/index/navigation owners; validate with coverage-review workflow). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Maintain Repository Documentation Navigation target>",
      "directionId": "DIR-DOCUMENTATION",
      "manualInvocation": true,
      "trigger": "a capability/behavior/owner is added, moved, renamed, retired or otherwise changes how readers should discover current meaning",
      "result": "affected navigation/read-order owners lead naturally to current Direction → primary semantic registry → Workspace/methodology Use Case or Application Scenario → canonical owner routes"
    },
    {
      "id": "UC-DOC-MAINTAIN-PROMPT",
      "label": "Create / Maintain Reusable Prompt",
      "description": "create/review/change reusable AI bootstrap/diagnostic/helper insertion text that navigates current owners without becoming authority",
      "sources": [
        "planning/documentation/use-case-registry.md"
      ],
      "instruction": "Resolve UC-DOC-MAINTAIN-PROMPT in the current canonical registry and follow its current owner route (prompt-maintenance-workflow.md + planning/helper-library/README.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Create / Maintain Reusable Prompt target>",
      "directionId": "DIR-DOCUMENTATION",
      "manualInvocation": true,
      "trigger": "a reusable prompt is needed or an existing prompt is stale/duplicative/misrouting",
      "result": "valid current prompt with explicit profile, owner-navigation boundary and proportional output/evidence contract"
    },
    {
      "id": "UC-DOC-MAINTAIN-REGISTRIES",
      "label": "Maintain Directions And Use Cases",
      "description": "keep semantic Direction/Use-Case capability contracts current and complete",
      "sources": [
        "planning/documentation/use-case-registry.md"
      ],
      "instruction": "Resolve UC-DOC-MAINTAIN-REGISTRIES in the current canonical registry and follow its current owner route (direction-and-use-case-registry-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Maintain Directions And Use Cases target>",
      "directionId": "DIR-DOCUMENTATION",
      "manualInvocation": true,
      "trigger": "semantic capability/direction meaning changes",
      "result": "complete current registry entries + correct semantic parent/owner/handoff links"
    },
    {
      "id": "UC-DOC-MAINTAIN-SHARED-EXACT-MEANING",
      "label": "Maintain Shared Exact Meaning",
      "description": "preserve one exact literal/shared definition across consumers when exact synchronization is truly required",
      "sources": [
        "planning/documentation/use-case-registry.md"
      ],
      "instruction": "Resolve UC-DOC-MAINTAIN-SHARED-EXACT-MEANING in the current canonical registry and follow its current owner route (review-dependency-planning-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Maintain Shared Exact Meaning target>",
      "directionId": "DIR-DOCUMENTATION",
      "manualInvocation": true,
      "trigger": "repeated exact text/definition must remain synchronized",
      "result": "canonical exact meaning + synchronized consumers through the narrowest suitable mechanism"
    },
    {
      "id": "UC-DOC-ORIENT",
      "label": "Bootstrap Reusable Documentation Governance",
      "description": "load reusable documentation methodology and resolve the applicable documentation capability/owners",
      "sources": [
        "planning/documentation/use-case-registry.md"
      ],
      "instruction": "Resolve UC-DOC-ORIENT in the current canonical registry and follow its current owner route (documentation-principles-read-workflow.md + architecture principles + responsibility map + this registry). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Bootstrap Reusable Documentation Governance target>",
      "directionId": "DIR-DOCUMENTATION",
      "manualInvocation": true,
      "trigger": "a new chat/session starts documentation work, reusable documentation principles are explicitly requested, or ownership/governance is uncertain",
      "result": "reusable principles loaded + applicable UC-DOC-* and canonical reusable/current owners identified + permission boundary understood",
      "commandId": "documentation_principles.read"
    },
    {
      "id": "UC-DOC-PLAN-FILE-UPDATE",
      "label": "Plan Concrete File / Docs / Code Update",
      "description": "translate selected meaning into one concrete ordered file transition",
      "sources": [
        "planning/documentation/use-case-registry.md"
      ],
      "instruction": "Resolve UC-DOC-PLAN-FILE-UPDATE in the current canonical registry and follow its current owner route (file-update-overview-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Plan Concrete File / Docs / Code Update target>",
      "directionId": "DIR-DOCUMENTATION",
      "manualInvocation": true,
      "trigger": "selected meaning needs concrete file transition",
      "result": "ordered File Update Plan",
      "commandId": "file_update.plan"
    },
    {
      "id": "UC-DOC-PLAN-UPDATE",
      "label": "Plan A Documentation Update",
      "description": "plan a material documentation change through the affected Workspace UC(s), semantic rules/owners and vertical realization before execution",
      "sources": [
        "planning/documentation/use-case-registry.md"
      ],
      "instruction": "Resolve UC-DOC-PLAN-UPDATE in the current canonical registry and follow its current owner route (documentation-update-plan-workflow.md → workspace-planning/ as needed → file-update workflow only when an explicit ordered concrete file plan is selected). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Plan A Documentation Update target>",
      "directionId": "DIR-DOCUMENTATION",
      "manualInvocation": true,
      "trigger": "material docs change needs integrated semantic/owner/realization review",
      "result": "checked UC-centric documentation target plan to the selected depth, including exact affected-file surface when Step 3 is selected"
    },
    {
      "id": "UC-DOC-RECONCILE-STATUS",
      "label": "Reconcile Documentation / Owner Status",
      "description": "resolve inconsistent active/current/deferred/retired state",
      "sources": [
        "planning/documentation/use-case-registry.md"
      ],
      "instruction": "Resolve UC-DOC-RECONCILE-STATUS in the current canonical registry and follow its current owner route (status-reconciliation-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Reconcile Documentation / Owner Status target>",
      "directionId": "DIR-DOCUMENTATION",
      "manualInvocation": true,
      "trigger": "owner/status labels or routes may disagree",
      "result": "explicit reconciled status + owner route"
    },
    {
      "id": "UC-DOC-REVIEW-COVERAGE",
      "label": "Review Repository Navigation / Semantic Coverage",
      "description": "verify that Workspace/methodology capabilities, Application behavior and canonical owners are naturally discoverable through the correct semantic registry",
      "sources": [
        "planning/documentation/use-case-registry.md"
      ],
      "instruction": "Resolve UC-DOC-REVIEW-COVERAGE in the current canonical registry and follow its current owner route (repository-navigation-and-use-case-coverage-review-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Review Repository Navigation / Semantic Coverage target>",
      "directionId": "DIR-DOCUMENTATION",
      "manualInvocation": true,
      "trigger": "repository discoverability/semantic coverage may be incomplete",
      "result": "uncovered Workspace/methodology UCs, uncovered Application Scenarios, orphan owners, broken routes and incomplete semantic contracts identified with maintenance/planning handoffs"
    },
    {
      "id": "UC-DOC-REVIEW-CURRENT-CONSISTENCY",
      "label": "Review Current Semantic Consistency",
      "description": "verify that current reusable/project owners, registries, templates and projections agree on selected meaning",
      "sources": [
        "planning/documentation/use-case-registry.md"
      ],
      "instruction": "Resolve UC-DOC-REVIEW-CURRENT-CONSISTENCY in the current canonical registry and follow its current owner route (current-semantic-consistency-review-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Review Current Semantic Consistency target>",
      "directionId": "DIR-DOCUMENTATION",
      "manualInvocation": true,
      "trigger": "a material methodology change or consistency concern may leave stale/duplicated/conflicting current semantics",
      "result": "checked contradictions/stale duplicates/orphan routes + selected corrective owner updates"
    },
    {
      "id": "UC-DOC-REVIEW-DEPENDENCY-COVERAGE",
      "label": "Review Dependency Coverage",
      "description": "determine whether material semantic dependencies that must not rely on memory are represented/reviewable",
      "sources": [
        "planning/documentation/use-case-registry.md"
      ],
      "instruction": "Resolve UC-DOC-REVIEW-DEPENDENCY-COVERAGE in the current canonical registry and follow its current owner route (review-dependency-planning-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Review Dependency Coverage target>",
      "directionId": "DIR-DOCUMENTATION",
      "manualInvocation": true,
      "trigger": "completeness of dependency handling materially affects correctness",
      "result": "missing/weak/duplicate dependency findings + treatment route"
    },
    {
      "id": "UC-DOC-REVIEW-DEPENDENTS",
      "label": "Review Semantic Dependents",
      "description": "review known consumers/dependents after material upstream change",
      "sources": [
        "planning/documentation/use-case-registry.md"
      ],
      "instruction": "Resolve UC-DOC-REVIEW-DEPENDENTS in the current canonical registry and follow its current owner route (review-dependency-planning-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Review Semantic Dependents target>",
      "directionId": "DIR-DOCUMENTATION",
      "manualInvocation": true,
      "trigger": "selected source meaning changed or dependency review is explicitly requested/needed for correctness",
      "result": "checked affected dependents + stale/current findings + required repairs"
    },
    {
      "id": "UC-DOC-REVIEW-DIFF",
      "label": "Semantically Review A Repository ReviewDiff",
      "description": "determine whether an applied/proposed repository transition is correct, necessary and integrated",
      "sources": [
        "planning/documentation/use-case-registry.md"
      ],
      "instruction": "Resolve UC-DOC-REVIEW-DIFF in the current canonical registry and follow its current owner route (review-diff-review-workflow.md + affected current owners + shared Idea owners). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Semantically Review A Repository ReviewDiff target>",
      "directionId": "DIR-DOCUMENTATION",
      "manualInvocation": true,
      "trigger": "ReviewDiff is pasted/attached/delivered/selected for review",
      "result": "checked findings + selected corrective plan when needed + Current-Plan-relative Q/R/P + ReviewDiff verdict",
      "commandId": "critical_review.apply"
    },
    {
      "id": "UC-DOC-REVIEW-EXAMPLES",
      "label": "Review Practical Example Coverage",
      "description": "decide whether reusable meaning needs a demonstration and where it belongs",
      "sources": [
        "planning/documentation/use-case-registry.md"
      ],
      "instruction": "Resolve UC-DOC-REVIEW-EXAMPLES in the current canonical registry and follow its current owner route (example-coverage-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Review Practical Example Coverage target>",
      "directionId": "DIR-DOCUMENTATION",
      "manualInvocation": true,
      "trigger": "reusable method/template needs demonstration review",
      "result": "example need / owner / boundary decision"
    },
    {
      "id": "UC-DOC-REVISE-RETURNED-FILES",
      "label": "Reconcile User-Returned Files",
      "description": "reconcile externally edited/reviewed files into complete current artifacts",
      "sources": [
        "planning/documentation/use-case-registry.md"
      ],
      "instruction": "Resolve UC-DOC-REVISE-RETURNED-FILES in the current canonical registry and follow its current owner route (reviewable-agent-output-and-commands-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Reconcile User-Returned Files target>",
      "directionId": "DIR-DOCUMENTATION",
      "manualInvocation": true,
      "trigger": "user returns edited files for revision",
      "result": "complete reconciled files",
      "commandId": "returned_files.revise"
    },
    {
      "id": "UC-DOC-UPDATE",
      "label": "Perform An Approved Documentation Update",
      "description": "apply already selected documentation meaning to current owners",
      "sources": [
        "planning/documentation/use-case-registry.md"
      ],
      "instruction": "Resolve UC-DOC-UPDATE in the current canonical registry and follow its current owner route (documentation-update-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Perform An Approved Documentation Update target>",
      "directionId": "DIR-DOCUMENTATION",
      "manualInvocation": true,
      "trigger": "selected meaning is authorized for docs change",
      "result": "current owners updated consistently"
    },
    {
      "id": "UC-DW-DOC-REF",
      "label": "Repository Documentation Change And Reference Review",
      "description": "change repository documentation while preserving stable navigation/reference meaning and affected-use review.",
      "sources": [
        "planning/areas/documentation-workbench/use-case-registry.md"
      ],
      "instruction": "Resolve UC-DW-DOC-REF in the current canonical registry and follow its current owner route (repository-documentation-change-and-reference-review-workflow.md + [SCN-DW-DOC-REF](scenarios/SCN-DW-DOC-REF.md).). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Repository Documentation Change And Reference Review target>",
      "directionId": "DIR-DOCUMENTATION-WORKBENCH",
      "manualInvocation": true,
      "trigger": "repository file/folder/stable section is selected for direct documentation work or accepted planning meaning is ready for materialization.",
      "result": "complete changed Markdown/docs with validated stable links and explicit affected-use review state, or an explicit unresolved/deferred result."
    },
    {
      "id": "UC-DW-PLANNING-TO-REPOSITORY",
      "label": "Planning Meaning To Repository",
      "description": "turn selected current planning meaning into a reviewable repository realization/handoff without forcing a duplicate planning layer.",
      "sources": [
        "planning/areas/documentation-workbench/use-case-registry.md"
      ],
      "instruction": "Resolve UC-DW-PLANNING-TO-REPOSITORY in the current canonical registry and follow its current owner route (planning-meaning-to-repository-workflow.md + shared Idea/Workspace-planning owners + File Update owners only when that explicit route is selected + [SCN-DW-PLANNING-TO-REPOSITORY](scenarios/SCN-DW-PLANNING-TO-REPOSITORY.md).). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Planning Meaning To Repository target>",
      "directionId": "DIR-DOCUMENTATION-WORKBENCH",
      "manualInvocation": true,
      "trigger": "selected source/current owners/Ideas/current conclusions require integration and repository file handoff.",
      "result": "reconciled current planning meaning plus a concrete reviewable repository realization/handoff surface to the selected depth; an ordered File Update Plan is included only when that separate capability is selected/useful, otherwise an explicit unresolved/deferred state is allowed."
    },
    {
      "id": "UC-PLAN-APP-CONCEPT",
      "label": "Plan / Review Application Concept",
      "description": "evaluate whether/how own application behavior would simplify the real-world workflow before detailed application planning",
      "sources": [
        "planning/documentation/application-planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-PLAN-APP-CONCEPT in the current canonical registry and follow its current owner route (planning principles + whole-solution workflow + Concept template). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Plan / Review Application Concept target>",
      "directionId": "DIR-PLAN-SOLUTION",
      "manualInvocation": true,
      "trigger": "custom application is a material candidate, or application creation is confirmed but concept/value/feasibility is not grounded",
      "result": "reviewed Application Concept + Concept Features + feasibility/rough effort/maintenance picture + viable-alternative comparison + current worth-it conclusion"
    },
    {
      "id": "UC-PLAN-APPLICATION",
      "label": "Establish Application Responsibility",
      "description": "establish the exact application boundary when the selected whole solution includes own application behavior or that responsibility is already confirmed",
      "sources": [
        "planning/documentation/application-planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-PLAN-APPLICATION in the current canonical registry and follow its current owner route (planning principles + whole-solution workflow). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Establish Application Responsibility target>",
      "directionId": "DIR-PLAN-SOLUTION",
      "manualInvocation": true,
      "trigger": "selected solution/Concept includes own application behavior, or external context already confirms it",
      "result": "explicit application responsibility/boundary"
    },
    {
      "id": "UC-PLAN-ARCH-DECISION",
      "label": "Plan / Review One Material Architecture Decision",
      "description": "select/review one architecture choice by its correctness and effects on important current/future Workspace paths",
      "sources": [
        "planning/documentation/architecture-planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-PLAN-ARCH-DECISION in the current canonical registry and follow its current owner route (architecture-decision-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Plan / Review One Material Architecture Decision target>",
      "directionId": "DIR-PLAN-ARCHITECTURE",
      "manualInvocation": true,
      "trigger": "one material architecture pressure/problem/choice is ready for explicit comparison",
      "result": "selected Architecture Decision + Intent + affected-path conclusion + Rejected Complexity + Revisit Trigger when useful"
    },
    {
      "id": "UC-PLAN-ARCH-DISCOVER-WEUC",
      "label": "Discover Contextual Workspace Evolution Use Cases",
      "description": "discover bounded future Workspace-evolution work instances against a concrete current owner/change surface",
      "sources": [
        "planning/documentation/architecture-planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-PLAN-ARCH-DISCOVER-WEUC in the current canonical registry and follow its current owner route (workspace-evolution-use-case-discovery-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Discover Contextual Workspace Evolution Use Cases target>",
      "directionId": "DIR-PLAN-ARCHITECTURE",
      "manualInvocation": true,
      "trigger": "explicit WEUC/evolvability discovery is requested or Architecture planning needs contextual future-change evidence for a sufficiently concrete area",
      "result": "contextual WEUC instances + expected Workspace Change Path + likelihood/value/timing evidence + friction/fan-out/risk + architecture-handoff yes/no"
    },
    {
      "id": "UC-PLAN-ARCH-EVOLUTION",
      "label": "Plan / Review Workspace Architecture Evolution",
      "description": "select a coherent target architecture change when several related decisions/risks must move together",
      "sources": [
        "planning/documentation/architecture-planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-PLAN-ARCH-EVOLUTION in the current canonical registry and follow its current owner route (architecture-evolution-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Plan / Review Workspace Architecture Evolution target>",
      "directionId": "DIR-PLAN-ARCHITECTURE",
      "manualInvocation": true,
      "trigger": "current Architecture State and accumulated pressure require coordinated multi-decision evolution",
      "result": "selected target architecture/evolution direction + boundaries/transition constraints + routed downstream realization work"
    },
    {
      "id": "UC-PLAN-ARCH-PATH",
      "label": "Trace / Evaluate Architecture-Relevant Path",
      "description": "understand what must actually be understood, changed or executed for one material result and expose architecture cost/pressure",
      "sources": [
        "planning/documentation/architecture-planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-PLAN-ARCH-PATH in the current canonical registry and follow its current owner route (architecture-path-analysis-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Trace / Evaluate Architecture-Relevant Path target>",
      "directionId": "DIR-PLAN-ARCHITECTURE",
      "manualInvocation": true,
      "trigger": "one Workspace UC, important Workspace Change Case, Extension-derived future UC or Application Scenario needs path analysis",
      "result": "checked Workspace Understanding Path, Workspace Change Path or Runtime Realization Path + qualitative architecture findings"
    },
    {
      "id": "UC-PLAN-ARCH-PRESSURE",
      "label": "Establish / Review Workspace Change Pressure",
      "description": "determine where important current/future work creates architecture pressure and which generalized Change Axes are evidence-backed",
      "sources": [
        "planning/documentation/architecture-planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-PLAN-ARCH-PRESSURE in the current canonical registry and follow its current owner route (architecture-change-pressure-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Establish / Review Workspace Change Pressure target>",
      "directionId": "DIR-PLAN-ARCHITECTURE",
      "manualInvocation": true,
      "trigger": "Workspace architecture must account for important UCs, Workspace Change Cases, Extensions, constraints or observed history",
      "result": "Change Pressure picture + evidence-backed Change Axes/confidence + Change Hot Paths + material architecture findings"
    },
    {
      "id": "UC-PLAN-ARCH-STATE",
      "label": "Understand / Review Workspace Architecture State",
      "description": "establish an inspectable current architecture baseline and identify material architecture/maintainability concerns relative to important Workspace work",
      "sources": [
        "planning/documentation/architecture-planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-PLAN-ARCH-STATE in the current canonical registry and follow its current owner route (architecture-state-review-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Understand / Review Workspace Architecture State target>",
      "directionId": "DIR-PLAN-ARCHITECTURE",
      "manualInvocation": true,
      "trigger": "current Workspace architecture needs orientation/review or an architecture baseline is needed before further work",
      "result": "current Architecture State + Architecture Intent where known + intentional/accidental/speculative/legacy complexity findings + Maintainability Risks / revisit triggers when material"
    },
    {
      "id": "UC-PLAN-ARCH-WORKSPACE-USES",
      "label": "Discover / Review Workspace Use Cases",
      "description": "establish the architecture-relevant current-work picture from canonical Workspace UCs plus explicit candidate useful results without taking canonical UC lifecycle authority",
      "sources": [
        "planning/documentation/architecture-planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-PLAN-ARCH-WORKSPACE-USES in the current canonical registry and follow its current owner route (workspace-use-case-discovery-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Discover / Review Workspace Use Cases target>",
      "directionId": "DIR-PLAN-ARCHITECTURE",
      "manualInvocation": true,
      "trigger": "explicit important-work picture is needed or current/future Workspace work has materially changed",
      "result": "important current canonical Workspace UCs + architecture-relevant candidate useful results/future UC candidates + relevance/frequency evidence when useful + canonical Workspace Planning handoff when establishment/change/topology is required"
    },
    {
      "id": "UC-PLAN-COLLECT-IDEAS",
      "label": "Collect And Review Ideas From Selected Source",
      "description": "extract/review answer-seeking Ideas while preserving non-Idea context",
      "sources": [
        "planning/documentation/application-planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-PLAN-COLLECT-IDEAS in the current canonical registry and follow its current owner route (shared Idea owners). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Collect And Review Ideas From Selected Source target>",
      "directionId": "DIR-PLAN-SOLUTION",
      "manualInvocation": true,
      "trigger": "selected source contains answer-seeking Ideas",
      "result": "reviewed Ideas + Q/R/P + conclusions",
      "commandId": "ideas.collect"
    },
    {
      "id": "UC-PLAN-CONSISTENCY",
      "label": "Review Cross-Scenario / Screen / Requirement / Domain / Slice Consistency",
      "description": "detect contradictions/change impact across current behavioral/spatial/requirement/conceptual/delivery owners",
      "sources": [
        "planning/documentation/application-planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-PLAN-CONSISTENCY in the current canonical registry and follow its current owner route (complete selected owners + detailed-planning contract). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Review Cross-Scenario / Screen / Requirement / Domain / Slice Consistency target>",
      "directionId": "DIR-PLAN-SOLUTION",
      "manualInvocation": true,
      "trigger": "multiple owners may conflict or one owner changed materially",
      "result": "explicit contradictions/corrections/review state"
    },
    {
      "id": "UC-PLAN-DOMAIN",
      "label": "Plan / Review Domain",
      "description": "compare/refine/select/review the simplest explicit conceptual language/lifecycle/rules/boundaries that supports current meaning and cheap justified evolution",
      "sources": [
        "planning/documentation/application-planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-PLAN-DOMAIN in the current canonical registry and follow its current owner route (domain-planning-workflow.md + Domain template). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Plan / Review Domain target>",
      "directionId": "DIR-PLAN-SOLUTION",
      "manualInvocation": true,
      "trigger": "Domain candidates/meaning are sufficiently understood and separate Domain ownership materially improves clarity/consistency/change cost",
      "result": "selected Domain meaning + current Scenario/Requirement coverage + justified variation/invariant decisions + verification meaning + draft-state review"
    },
    {
      "id": "UC-PLAN-DOMAIN-DISCOVERY",
      "label": "Discover Domain Evidence / Candidates",
      "description": "discover evidence-backed concepts/identity/lifecycle/rules/invariants/policies/consistency candidates before selecting a current Domain model",
      "sources": [
        "planning/documentation/application-planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-PLAN-DOMAIN-DISCOVERY in the current canonical registry and follow its current owner route (domain-discovery-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Discover Domain Evidence / Candidates target>",
      "directionId": "DIR-PLAN-SOLUTION",
      "manualInvocation": true,
      "trigger": "current Scenario/DATA/Behavior/Requirements contain enough semantic complexity that explicit discovery materially helps",
      "result": "Domain evidence + candidates + invariant/policy findings + integrated Domain Variants when material"
    },
    {
      "id": "UC-PLAN-PROTOTYPE",
      "label": "Prototype Application Experience / Workflow",
      "description": "cheaply test/refine provisional user interaction, Scenario boundaries, Screens and Requirements before canonical detailed behavior/spatial ownership",
      "sources": [
        "planning/documentation/application-planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-PLAN-PROTOTYPE in the current canonical registry and follow its current owner route (prototype-planning-workflow.md + Prototype Plan/Result templates). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Prototype Application Experience / Workflow target>",
      "directionId": "DIR-PLAN-SOLUTION",
      "manualInvocation": true,
      "trigger": "Application Concept/responsibility exists but important interaction/workflow/spatial uncertainty remains",
      "result": "reviewed Prototype Plan/Result with Prototype Scenarios/Screens + evidence-backed candidate Requirements/DATA/Behavior/Change-Axis findings and handoff"
    },
    {
      "id": "UC-PLAN-REALITY",
      "label": "Understand Current Workflow And Reality",
      "description": "establish checked present reality before solution selection when it matters",
      "sources": [
        "planning/documentation/application-planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-PLAN-REALITY in the current canonical registry and follow its current owner route (solution-and-scenario-planning-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Understand Current Workflow And Reality target>",
      "directionId": "DIR-PLAN-SOLUTION",
      "manualInvocation": true,
      "trigger": "current context materially affects solution choice",
      "result": "descriptive checked Current Reality"
    },
    {
      "id": "UC-PLAN-REALIZATION",
      "label": "Review / Compare High-Level Application Realization",
      "description": "provide bounded realization evidence for representative selected meaning or serious candidate Domain variants when technical feasibility/cost/performance/consistency can materially affect selection",
      "sources": [
        "planning/documentation/application-planning/use-case-registry.md"
      ],
      "instruction": "Resolve this exact canonical Use-Case entry and follow application-realization-workflow.md. Review or compare representative realization paths when material, including pre-Domain comparative evidence, without letting implementation convenience or this projection become Domain authority.",
      "target": "<Review / Compare High-Level Application Realization target>",
      "directionId": "DIR-PLAN-SOLUTION",
      "manualInvocation": true,
      "trigger": "current application/Domain meaning needs a high-level stress check, or grounded Domain candidates cannot be selected confidently without comparative realization evidence",
      "result": "high-level realization picture or candidate comparison + representative Runtime/Implementation Paths + material feasibility/cost/constraint/upstream findings"
    },
    {
      "id": "UC-PLAN-RESEARCH",
      "label": "Research Existing Solutions / Alternatives",
      "description": "reduce a material evidence gap affecting whole-solution choice",
      "sources": [
        "planning/documentation/application-planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-PLAN-RESEARCH in the current canonical registry and follow its current owner route (selected solution/current owner + checked sources). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Research Existing Solutions / Alternatives target>",
      "directionId": "DIR-PLAN-SOLUTION",
      "manualInvocation": true,
      "trigger": "material evidence gap affects solution choice",
      "result": "checked options/evidence/disposition"
    },
    {
      "id": "UC-PLAN-SCENARIO",
      "label": "Draft / Review Detailed Scenario",
      "description": "own detailed observable behavior and local/shared supporting planning for one meaningful current Scenario",
      "sources": [
        "planning/documentation/application-planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-PLAN-SCENARIO in the current canonical registry and follow its current owner route (detailed-planning/README.md + Scenario template). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Draft / Review Detailed Scenario target>",
      "directionId": "DIR-PLAN-SOLUTION",
      "manualInvocation": true,
      "trigger": "one Scenario boundary is meaningful enough for detail",
      "result": "current Scenario workspace with behavior owner + relevant Ideas/DATA/Behavior/Visual/Requirements + draft-state review"
    },
    {
      "id": "UC-PLAN-SCENARIO-DISCOVERY",
      "label": "Discover Application Scenarios",
      "description": "identify independently meaningful user-visible Need/result behavior boundaries for the selected Application responsibility",
      "sources": [
        "planning/documentation/application-planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-PLAN-SCENARIO-DISCOVERY in the current canonical registry and follow its current owner route (planning workflow + prototype workflow when used). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Discover Application Scenarios target>",
      "directionId": "DIR-PLAN-SOLUTION",
      "manualInvocation": true,
      "trigger": "selected Application responsibility or prototype findings need current behavioral boundaries",
      "result": "current Scenario inventory/boundaries + material Future Scenario Ideas/Change Axes when discovered"
    },
    {
      "id": "UC-PLAN-SLICE",
      "label": "Plan / Review One Implementation Slice",
      "description": "plan one selected separately deliverable/checkable implementation increment",
      "sources": [
        "planning/documentation/application-planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-PLAN-SLICE in the current canonical registry and follow its current owner route (slice-planning-workflow.md + Implementation Slice template). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Plan / Review One Implementation Slice target>",
      "directionId": "DIR-PLAN-SOLUTION",
      "manualInvocation": true,
      "trigger": "one Slice boundary is selected and behavior/domain meaning is understood enough",
      "result": "integrated Slice plan + optional implementation-part/visual/verification plans"
    },
    {
      "id": "UC-PLAN-SLICE-STRATEGY",
      "label": "Plan / Review Slice Strategy",
      "description": "select implementation decomposition/order into useful vertical separately deliverable/checkable increments",
      "sources": [
        "planning/documentation/application-planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-PLAN-SLICE-STRATEGY in the current canonical registry and follow its current owner route (slice-planning-workflow.md + Slice Strategy template). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Plan / Review Slice Strategy target>",
      "directionId": "DIR-PLAN-SOLUTION",
      "manualInvocation": true,
      "trigger": "implementation is large/uncertain enough that decomposition/order materially matters",
      "result": "selected Slice decomposition/order + dependencies + delivery/learning/risk rationale"
    },
    {
      "id": "UC-PLAN-SOLUTION",
      "label": "Plan / Review Whole Solution Or Workflow",
      "description": "select/evaluate the best integrated whole answer before assuming custom application work",
      "sources": [
        "planning/documentation/application-planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-PLAN-SOLUTION in the current canonical registry and follow its current owner route (solution-and-scenario-planning-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Plan / Review Whole Solution Or Workflow target>",
      "directionId": "DIR-PLAN-SOLUTION",
      "manualInvocation": true,
      "trigger": "Need requires integrated answer",
      "result": "current whole Solution/Workflow Variant + integration conclusion"
    },
    {
      "id": "UC-PLAN-TEST-COVERAGE",
      "label": "Review Current Test Coverage / Evidence",
      "description": "check whether actual current tests/evidence really prove current selected meaning",
      "sources": [
        "planning/documentation/testing-planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-PLAN-TEST-COVERAGE in the current canonical registry and follow its current owner route (test-coverage-review-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Review Current Test Coverage / Evidence target>",
      "directionId": "DIR-PLAN-TESTING",
      "manualInvocation": true,
      "trigger": "current tests/evidence must be trusted, changed or audited",
      "result": "behavior→actual-evidence mapping + missing/weak/stale/duplicated/wrong-layer findings"
    },
    {
      "id": "UC-PLAN-TEST-DESIGN",
      "label": "Plan / Review Verification For Selected Behavior",
      "description": "decide how selected Scenario/Requirement/Domain/Slice behavior will be convincingly proved",
      "sources": [
        "planning/documentation/testing-planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-PLAN-TEST-DESIGN in the current canonical registry and follow its current owner route (test-design-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Plan / Review Verification For Selected Behavior target>",
      "directionId": "DIR-PLAN-TESTING",
      "manualInvocation": true,
      "trigger": "selected behavior is understood enough to design proof",
      "result": "Behavior-to-Test Trace + selected layers + concrete assertions + risk/boundary decisions"
    },
    {
      "id": "UC-PLAN-TEST-PLAN",
      "label": "Plan Practical Testing / Acceptance",
      "description": "assemble a practical operated proof plan for one meaningful application/change result across selected behaviors",
      "sources": [
        "planning/documentation/testing-planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-PLAN-TEST-PLAN in the current canonical registry and follow its current owner route (practical-testing-plan-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Plan Practical Testing / Acceptance target>",
      "directionId": "DIR-PLAN-TESTING",
      "manualInvocation": true,
      "trigger": "selected behavior/proof choices are grounded enough that a real practical verification pass or campaign is useful",
      "result": "Practical Testing Plan with acceptance cards, operator/environment/setup/actions/evidence/pass-fail and campaign scope when needed"
    },
    {
      "id": "UC-PLAN-TEST-STRATEGY",
      "label": "Establish / Review Testing Strategy",
      "description": "establish shared/cross-Slice proof responsibilities and avoid duplicated/missing coverage",
      "sources": [
        "planning/documentation/testing-planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-PLAN-TEST-STRATEGY in the current canonical registry and follow its current owner route (testing-strategy-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Establish / Review Testing Strategy target>",
      "directionId": "DIR-PLAN-TESTING",
      "manualInvocation": true,
      "trigger": "testing responsibility spans several Slices/layers or shared harness/data/isolation/E2E policy materially matters",
      "result": "current testing strategy + layer responsibilities + shared proof/data/isolation boundaries"
    },
    {
      "id": "UC-PLAN-WORKSPACE-CHANGE-UC",
      "label": "Review / Change Workspace Use Case",
      "description": "integrate all currently selected change meaning for one existing Workspace UC into one coherent Target UC and realization plan.",
      "sources": [
        "planning/documentation/workspace-planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-PLAN-WORKSPACE-CHANGE-UC in the current canonical registry and follow its current owner route ([review-change-workspace-use-case-workflow.md](review-change-workspace-use-case-workflow.md) + [workspace-planning-principles-and-terminology.md](workspace-planning-principles-and-terminology.md)). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Review / Change Workspace Use Case target>",
      "directionId": "DIR-PLAN-WORKSPACE",
      "manualInvocation": true,
      "trigger": "Ideas, requirements, evidence, corrections or change pressure materially affect a current Workspace Use Case.",
      "result": "the current UC is intentionally unchanged, or one integrated Target UC plan is established to the selected planning depth: Target UC meaning at Step 1, plus Step-2 semantic rules and Step-3 vertical realization/file surface only when those depths are selected and reviewed."
    },
    {
      "id": "UC-PLAN-WORKSPACE-ESTABLISH-UC",
      "label": "Establish Workspace Use Case",
      "description": "determine whether a useful Workspace result needs a new Use Case and, when justified, establish one coherent target UC contract and owner route.",
      "sources": [
        "planning/documentation/workspace-planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-PLAN-WORKSPACE-ESTABLISH-UC in the current canonical registry and follow its current owner route ([establish-workspace-use-case-workflow.md](establish-workspace-use-case-workflow.md) + [workspace-planning-principles-and-terminology.md](workspace-planning-principles-and-terminology.md)). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Establish Workspace Use Case target>",
      "directionId": "DIR-PLAN-WORKSPACE",
      "manualInvocation": true,
      "trigger": "a Need, Idea, Extension or observed Workspace result is not clearly owned by a current Workspace Use Case.",
      "result": "either an existing UC is confirmed as the correct owner and work hands off to UC-PLAN-WORKSPACE-CHANGE-UC, or one justified new Target UC contract + graph placement is established, with Step-2 semantic meaning and Step-3 vertical realization/file surface included only when those depths are selected and reviewed."
    },
    {
      "id": "UC-PLAN-WORKSPACE-REVIEW-TOPOLOGY",
      "label": "Review Workspace Use-Case Topology",
      "description": "produce a coherent graph/boundary model when several Workspace Use Cases must be reviewed together.",
      "sources": [
        "planning/documentation/workspace-planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-PLAN-WORKSPACE-REVIEW-TOPOLOGY in the current canonical registry and follow its current owner route ([review-workspace-use-case-topology-workflow.md](review-workspace-use-case-topology-workflow.md) + [workspace-planning-principles-and-terminology.md](workspace-planning-principles-and-terminology.md)). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Review Workspace Use-Case Topology target>",
      "directionId": "DIR-PLAN-WORKSPACE",
      "manualInvocation": true,
      "trigger": "overlap, split/merge/extraction pressure, changed dependencies/handoffs, or a cross-cutting Idea that creates a material boundary/relationship question affects several UCs and makes coherent topology review independently useful.",
      "result": "coherent selected UC boundaries + semantic relationships + one local Target UC projection for every affected UC, with Step-2/Step-3 meaning and cross-UC/cross-Slice architecture findings included only to the selected/reviewed depth."
    },
    {
      "id": "UC-PR-END-SESSION",
      "label": "End Active Planning Session",
      "description": "close the active operational planning session/day consistently and expose the resulting next state.",
      "sources": [
        "planning/areas/planning-system/use-case-registry.md"
      ],
      "instruction": "Resolve UC-PR-END-SESSION in the current canonical registry and follow its current owner route ([end-session-command-workflow.md](end-session-command-workflow.md) + [SCN-PR-END-SESSION](scenarios/SCN-PR-END-SESSION.md).). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<End Active Planning Session target>",
      "directionId": "DIR-PLANNING-RUNTIME",
      "manualInvocation": true,
      "trigger": "user explicitly ends the active session/day workflow.",
      "result": "current operational session state is closed/logged according to the runtime workflow and next state is explicit.",
      "commandId": "session.end"
    },
    {
      "id": "UC-REPO-AUDIT-REVIEW",
      "label": "Audit Review Coverage And Quality",
      "description": "report what was actually reviewed, how sufficient it was and what a repeat review added",
      "sources": [
        "planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-REPO-AUDIT-REVIEW in the current canonical registry and follow its current owner route (documentation/review-audit-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Audit Review Coverage And Quality target>",
      "directionId": "DIR-REPOSITORY",
      "manualInvocation": true,
      "trigger": "user asks what was checked / to recheck, or a broad coverage/quality claim needs evidence",
      "result": "checked files/semantic units + quality/sufficiency + partial/unchecked + review delta + next useful checks"
    },
    {
      "id": "UC-REPO-CRITICAL-REVIEW",
      "label": "Critically Review A Claim / Plan / Diff",
      "description": "truth-seek against a target instead of accepting it as given",
      "sources": [
        "planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-REPO-CRITICAL-REVIEW in the current canonical registry and follow its current owner route (shared Idea owners + selected target/current owners + documentation/review-diff-review-workflow.md when target is ReviewDiff). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Critically Review A Claim / Plan / Diff target>",
      "directionId": "DIR-REPOSITORY",
      "manualInvocation": true,
      "trigger": "target should be tested as hypothesis",
      "result": "supported strengths/issues/counterevidence/conclusion; material corrective Ideas reviewed proportionally",
      "commandId": "critical_review.apply"
    },
    {
      "id": "UC-REPO-CURRENT-STATE",
      "label": "Report Current Repository / Planning State",
      "description": "report checked current state without inventing certainty",
      "sources": [
        "planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-REPO-CURRENT-STATE in the current canonical registry and follow its current owner route (this registry → documentation/status-reconciliation-workflow.md → selected current owners). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Report Current Repository / Planning State target>",
      "directionId": "DIR-REPOSITORY",
      "manualInvocation": true,
      "trigger": "state/status question",
      "result": "checked known/local/unknown state + next safe action",
      "commandId": "current_state.report"
    },
    {
      "id": "UC-REPO-DEFINE-PARALLEL-SCOPES",
      "label": "Define / Maintain Fixed Parallel-Work Scopes",
      "description": "establish stable repository areas that can be worked independently in parallel",
      "sources": [
        "planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-REPO-DEFINE-PARALLEL-SCOPES in the current canonical registry and follow its current owner route (../parallel-work-scope-registry.md + documentation/parallel-work-scope-and-action-log-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Define / Maintain Fixed Parallel-Work Scopes target>",
      "directionId": "DIR-REPOSITORY",
      "manualInvocation": true,
      "trigger": "repository scope boundaries/log locations need initial definition or explicit structural change",
      "result": "current root Scope Registry + canonical log at every active scope root"
    },
    {
      "id": "UC-REPO-ORIENT",
      "label": "Orient In Repository And Resolve Work Route",
      "description": "find the correct semantic route before material work",
      "sources": [
        "planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-REPO-ORIENT in the current canonical registry and follow its current owner route (README.md → planning/README.md → registries). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Orient In Repository And Resolve Work Route target>",
      "directionId": "DIR-REPOSITORY",
      "manualInvocation": true,
      "trigger": "new/uncertain repository task",
      "result": "relevant Direction, Use Case, owners and governance identified",
      "commandId": "governance.development"
    },
    {
      "id": "UC-REPO-PARALLEL-WORK",
      "label": "Work In Registered Parallel Scope(s)",
      "description": "run one workstream using already registered independent scope boundaries",
      "sources": [
        "planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-REPO-PARALLEL-WORK in the current canonical registry and follow its current owner route (../parallel-work-scope-registry.md + documentation/parallel-work-scope-and-action-log-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Work In Registered Parallel Scope(s) target>",
      "directionId": "DIR-REPOSITORY",
      "manualInvocation": true,
      "trigger": "work should proceed in parallel or scope ownership matters",
      "result": "selected registered scope(s), canonical scope log, cross-scope references when needed",
      "commandId": "parallel_workspace.start"
    },
    {
      "id": "UC-REPO-PLAN-NEXT",
      "label": "Plan The Next Concrete Step",
      "description": "select one justified next action from current context",
      "sources": [
        "planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-REPO-PLAN-NEXT in the current canonical registry and follow its current owner route (selected Direction/Use Case/current owners). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Plan The Next Concrete Step target>",
      "directionId": "DIR-REPOSITORY",
      "manualInvocation": true,
      "trigger": "active context needs immediate next planning step",
      "result": "one justified next step + unresolved blockers",
      "commandId": "plan.now"
    },
    {
      "id": "UC-REPO-REFINE-CURRENT-PLAN",
      "label": "Refine The Current Plan",
      "description": "integrate material clarification/change into one accumulating current plan through the selected semantic owner",
      "sources": [
        "planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-REPO-REFINE-CURRENT-PLAN in the current canonical registry and follow its current owner route (documentation/progressive-plan-refinement-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Refine The Current Plan target>",
      "directionId": "DIR-REPOSITORY",
      "manualInvocation": true,
      "trigger": "current planning meaning needs refinement, deeper review or directed continuation",
      "result": "updated current semantic owner(s) + truthful reviewed/partial/unchecked state + attached Q/R/P only when material"
    },
    {
      "id": "UC-REPO-REVIEW-PLANNING-FINDINGS",
      "label": "Review Planning Findings / Q/R/P Completeness",
      "description": "detect/deduplicate material unresolved deltas attached to current semantic owners",
      "sources": [
        "planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-REPO-REVIEW-PLANNING-FINDINGS in the current canonical registry and follow its current owner route (documentation/planning-findings-review-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Review Planning Findings / Q/R/P Completeness target>",
      "directionId": "DIR-REPOSITORY",
      "manualInvocation": true,
      "trigger": "completeness of current planning findings materially matters",
      "result": "owner-attached active findings + missing/duplicate/obsolete finding corrections"
    },
    {
      "id": "UC-REPO-USE-ARCHIVE-SOURCE",
      "label": "Use An Explicit Archive As Read Source",
      "description": "establish a bounded readable source snapshot",
      "sources": [
        "planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-REPO-USE-ARCHIVE-SOURCE in the current canonical registry and follow its current owner route (selected archive + applicable owners). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Use An Explicit Archive As Read Source target>",
      "directionId": "DIR-REPOSITORY",
      "manualInvocation": true,
      "trigger": "user selects archive/snapshot for reading",
      "result": "checked source identity/coverage + source-bounded work context",
      "commandId": "archive_source.use"
    },
    {
      "id": "UC-RPKG-APPLY",
      "label": "Apply Verified Replacement Package",
      "description": "Apply Verified Replacement Package",
      "sources": [
        "planning/documentation/tools/replacement-package-app/USE-CASE-REGISTRY.md"
      ],
      "instruction": "Resolve UC-RPKG-APPLY in the current canonical registry and follow its current owner route. Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Apply Verified Replacement Package target>",
      "directionId": "",
      "manualInvocation": true,
      "trigger": "",
      "result": ""
    },
    {
      "id": "UC-RPKG-ATTACH-SNAPSHOT",
      "label": "Attach Repository Snapshot to ChatGPT",
      "description": "Attach Repository Snapshot to ChatGPT",
      "sources": [
        "planning/documentation/tools/replacement-package-app/USE-CASE-REGISTRY.md"
      ],
      "instruction": "Resolve UC-RPKG-ATTACH-SNAPSHOT in the current canonical registry and follow its current owner route. Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Attach Repository Snapshot to ChatGPT target>",
      "directionId": "",
      "manualInvocation": true,
      "trigger": "",
      "result": ""
    },
    {
      "id": "UC-RPKG-DELIVER-REVIEW",
      "label": "Deliver Current ReviewDiff to ChatGPT",
      "description": "Deliver Current ReviewDiff to ChatGPT",
      "sources": [
        "planning/documentation/tools/replacement-package-app/USE-CASE-REGISTRY.md"
      ],
      "instruction": "Resolve UC-RPKG-DELIVER-REVIEW in the current canonical registry and follow its current owner route. Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Deliver Current ReviewDiff to ChatGPT target>",
      "directionId": "",
      "manualInvocation": true,
      "trigger": "",
      "result": ""
    },
    {
      "id": "UC-RPKG-EXPORT-REPOSITORY",
      "label": "Export Repository Snapshot ZIP",
      "description": "Export Repository Snapshot ZIP",
      "sources": [
        "planning/documentation/tools/replacement-package-app/USE-CASE-REGISTRY.md"
      ],
      "instruction": "Resolve UC-RPKG-EXPORT-REPOSITORY in the current canonical registry and follow its current owner route. Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Export Repository Snapshot ZIP target>",
      "directionId": "",
      "manualInvocation": true,
      "trigger": "",
      "result": ""
    },
    {
      "id": "UC-RPKG-FINALIZE",
      "label": "Finalize Current ChangeSet",
      "description": "Finalize Current ChangeSet",
      "sources": [
        "planning/documentation/tools/replacement-package-app/USE-CASE-REGISTRY.md"
      ],
      "instruction": "Resolve UC-RPKG-FINALIZE in the current canonical registry and follow its current owner route. Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Finalize Current ChangeSet target>",
      "directionId": "",
      "manualInvocation": true,
      "trigger": "",
      "result": ""
    },
    {
      "id": "UC-RPKG-REVIEW",
      "label": "Inspect Current ChangeSet Review State",
      "description": "Inspect Current ChangeSet Review State",
      "sources": [
        "planning/documentation/tools/replacement-package-app/USE-CASE-REGISTRY.md"
      ],
      "instruction": "Resolve UC-RPKG-REVIEW in the current canonical registry and follow its current owner route. Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Inspect Current ChangeSet Review State target>",
      "directionId": "",
      "manualInvocation": true,
      "trigger": "",
      "result": ""
    }
  ];
  // END GENERATED CURRENT USE CASE PROJECTIONS

  function directionIdForUseCase(definition){
    const id=String(definition?.id||'');
    if(id.startsWith('UC-REPO-'))return 'DIR-REPOSITORY';
    if(id.startsWith('UC-PLAN-WORKSPACE-'))return 'DIR-PLAN-WORKSPACE';
    if(id.startsWith('UC-PLAN-ARCH-'))return 'DIR-PLAN-ARCHITECTURE';
    if(id.startsWith('UC-PLAN-TEST-'))return 'DIR-PLAN-TESTING';
    if(id.startsWith('UC-PLAN-'))return 'DIR-PLAN-SOLUTION';
    if(id.startsWith('UC-DOC-'))return 'DIR-DOCUMENTATION';
    if(id.startsWith('UC-DW-'))return 'DIR-DOCUMENTATION-WORKBENCH';
    if(id.startsWith('UC-PR-'))return 'DIR-PLANNING-RUNTIME';
    if(id.startsWith('UC-RPKG-'))return 'DIR-REPLACEMENT-PACKAGE-APP';
    return '';
  }

  function directionIdForOwnerPath(path){
    const value=String(path||'');
    if(value.includes('planning/documentation/tools/tampermonkey/chat-command-palette/'))return 'DIR-PLANNING-HELPER';
    if(value.includes('planning/documentation/tools/tampermonkey/linked-notes/'))return 'DIR-LINKED-NOTES';
    if(value.includes('planning/documentation/tools/replacement-package-app/'))return 'DIR-REPLACEMENT-PACKAGE-APP';
    if(value.includes('planning/documentation/application-planning/'))return 'DIR-PLAN-SOLUTION';
    if(value.includes('planning/documentation/workspace-planning/'))return 'DIR-PLAN-WORKSPACE';
    if(value.includes('planning/documentation/architecture-planning/'))return 'DIR-PLAN-ARCHITECTURE';
    if(value.includes('planning/documentation/testing-planning/'))return 'DIR-PLAN-TESTING';
    if(value.includes('planning/areas/documentation-workbench/'))return 'DIR-DOCUMENTATION-WORKBENCH';
    if(value.includes('planning/areas/planning-system/')||value.includes('planning/dashboard/')||value.startsWith('-Planning/'))return 'DIR-PLANNING-RUNTIME';
    if(value.includes('planning/documentation/'))return 'DIR-DOCUMENTATION';
    if(value.startsWith('planning/')||value==='parallel-work-scope-registry.md')return 'DIR-REPOSITORY';
    return '';
  }

  for(const definition of USE_CASE_DEFINITIONS)definition.directionId=directionIdForUseCase(definition);

  function directionIdsForCommand(definition){
    const linked=[...new Set(USE_CASE_DEFINITIONS.filter((item)=>item.commandId===definition?.id).map((item)=>item.directionId).filter(Boolean))];
    if(linked.length)return linked;
    const inferred=[];
    for(const path of definition?.ownerFiles||[]){const id=directionIdForOwnerPath(path);if(id&&!inferred.includes(id))inferred.push(id);}
    return inferred.length?inferred:['DIR-REPOSITORY'];
  }

  function markerFor(kind){if(kind==='orientation')return'PLANNING_ORIENTATION';if(kind==='direction')return'PLANNING_DIRECTION';return'PLANNING_USE_CASE';}
  function readRule(mode,kind){
    if(mode===MODE.FULL)return [`Full ${kind} reading is required for this invocation.`,'Read every listed source, resolve the selected current entry and follow the complete relevant owner route.','Read materially defining principles/workflows/templates/integration rules reached by that route.','Do not expand into unrelated families.','Full changes read depth only; it does not expand permissions.'];
    return [`Use remembered ${kind} context only while clearly sufficient.`,'Resolve/read listed sources and the current owner route when not current, uncertain, changed or challenged.','Do not rely only on this compact prompt when ownership/status/boundaries are uncertain.'];
  }
  function buildSemanticBody(kind,definition,mode){
    const marker=markerFor(kind),idField=kind==='use_case'?'use_case_id':`${kind}_id`;
    const lines=[`[${marker}]`,`${idField}:`,`  ${definition.id}`,'',`${kind}:`,`  ${definition.label}`,'','mode:',`  ${mode}`];
    if(kind==='use_case')lines.push('','semantic_owner:','  Work in this Use Case as the current semantic planning unit. Neighboring responsibilities are inputs/integration context unless the selected owner route explicitly requires them.');
    lines.push('','source_of_truth:',...(definition.sources||[]).map(s=>`  - \`${s}\``));
    if(kind==='use_case')lines.push('','route_resolution:','  Resolve this exact current Use-Case entry. Follow its current Main Owner / Owner Route and then the current owner links/read-order to every principle, workflow, template and integration rule materially defining this Use Case. Do not treat this Helper body as a frozen list of all future owner paths.');
    lines.push('','read_rule:',...readRule(mode,kind).map(x=>`  ${x}`),'','instruction:',`  ${definition.instruction}`);
    if(kind==='use_case')lines.push('','permission:','  Semantic planning/read context only. Use-Case activation does not grant executable-command, repository-mutation, archive, commit or push permission.');
    lines.push('','user_target:',`  ${definition.target}`,`[/${marker}]`);
    return lines.join('\n');
  }
  function buildSemanticEntries(){return {[SURFACES.USE_CASES]:USE_CASE_DEFINITIONS.map(d=>({...d,adaptiveBody:buildSemanticBody('use_case',d,MODE.ADAPTIVE),fullBody:buildSemanticBody('use_case',d,MODE.FULL)}))};}
  return {SURFACES,ORIENTATION_DEFINITIONS,DIRECTION_DEFINITIONS,USE_CASE_DEFINITIONS,directionIdForUseCase,directionIdsForCommand,buildSemanticBody,buildSemanticEntries};
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
  const LOCAL_SNAPSHOT_SCHEMA_VERSION=2;
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
  function normalizeIdList(value,label){const result=[];for(const raw of Array.isArray(value)?value:[]){const id=String(raw||'').trim();if(!id)continue;if(/[\r\n\u0000-\u001f\u007f]/.test(id))throw new TypeError(`${label} contains unsafe id.`);if(!result.includes(id))result.push(id);}return result.sort();}
  function normalizeCommandRecord(value){
    const input=value&&typeof value==='object'?value:{};
    const definition=deps.normalizeCommandDefinition(input.definition||input);
    const path=deps.commandPathForDefinition(definition);
    if(input.path&&String(input.path)!==path)throw new TypeError(`Planning-command snapshot path mismatch: ${input.path}`);
    const rawContent=String(input.rawContent||deps.renderCommandDefinitionDocument(definition)).replace(/\r\n?/g,'\n');
    const parsed=deps.parseCommandDefinitionDocument(rawContent,{path});
    if(JSON.stringify(deps.toSerializable(deps.stripRuntimeCommandMetadata(parsed)))!==JSON.stringify(deps.toSerializable(definition)))throw new TypeError(`Planning-command snapshot raw content does not match definition: ${definition.id}`);
    const repositorySha=String(input.repositorySha||'').trim();const repositoryKnown=Boolean(input.repositoryKnown||repositorySha);const repositoryTracked=Boolean(input.repositoryTracked||repositoryKnown);return{definition,path,rawContent,repositoryKnown,repositoryTracked,repositorySha};
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
    if(!value||typeof value!=='object'||![1,LOCAL_SNAPSHOT_SCHEMA_VERSION].includes(value.schemaVersion))throw new TypeError('Unsupported Planning Helper local snapshot schema.');
    const planningCommands=(value.planningCommands||[]).map(normalizeCommandRecord).sort((a,b)=>a.path.localeCompare(b.path));
    const helperItems=(value.helperItems||[]).map(normalizeHelperRecord).sort((a,b)=>a.path.localeCompare(b.path));
    const hiddenCommandIds=normalizeIdList(value.hiddenCommandIds,'hiddenCommandIds');
    const hiddenUseCaseIds=normalizeIdList(value.hiddenUseCaseIds,'hiddenUseCaseIds');
    deps.validateCommandCatalog(planningCommands.map((record)=>record.definition));
    if(new Set(planningCommands.map((record)=>record.path)).size!==planningCommands.length)throw new TypeError('Duplicate planning-command path in local snapshot.');
    if(new Set(helperItems.map((record)=>record.path)).size!==helperItems.length)throw new TypeError('Duplicate helper-library path in local snapshot.');
    if(planningCommands.some((record)=>hiddenCommandIds.includes(record.definition.id)))throw new TypeError('A planning command cannot be both visible and locally deleted.');
    return{schemaVersion:LOCAL_SNAPSHOT_SCHEMA_VERSION,savedAt:cleanIso(value.savedAt,''),planningCommands,helperItems,hiddenCommandIds,hiddenUseCaseIds};
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

  function commandRecordsFromDefinitions(definitions,repositoryKnown=true){return(definitions||[]).map((definition)=>normalizeCommandRecord({definition,repositoryKnown,repositoryTracked:repositoryKnown}));}
  function helperKey(item){return`${item.kind}:${item.id}`;}
  function mergeBundledCommandSeed(snapshot,bundledCommands){
    const current=normalizePlanningHelperLocalSnapshot(snapshot);
    const hidden=new Set(current.hiddenCommandIds||[]);
    const byId=new Map(current.planningCommands.map((record)=>[record.definition.id,record]));
    let added=0;
    for(const raw of bundledCommands||[]){const definition=deps.normalizeCommandDefinition(raw);if(hidden.has(definition.id)||byId.has(definition.id))continue;const record=normalizeCommandRecord({definition,repositoryKnown:true,repositoryTracked:true});byId.set(definition.id,record);added++;}
    const next=normalizePlanningHelperLocalSnapshot({...current,planningCommands:[...byId.values()]});
    return{snapshot:next,added};
  }
  async function loadOrMigratePlanningHelperLocalSnapshot(bundledCommands){
    const existingRaw=await gmGet(KEYS.localSnapshot,null);
    const warnings=[];
    if(existingRaw!=null){
      const existing=normalizePlanningHelperLocalSnapshot(existingRaw);
      const merged=mergeBundledCommandSeed(existing,bundledCommands||[]);
      const needsWrite=existingRaw.schemaVersion!==LOCAL_SNAPSHOT_SCHEMA_VERSION||merged.added>0;
      const snapshot=needsWrite?await savePlanningHelperLocalSnapshot(merged.snapshot):existing;
      if(merged.added)warnings.push(`Planning Helper added ${merged.added} current bundled command(s) to the local snapshot; locally deleted command IDs stayed deleted.`);
      return{snapshot,migrated:existingRaw.schemaVersion!==LOCAL_SNAPSHOT_SCHEMA_VERSION,seededCommands:merged.added,warnings};
    }
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
    const snapshot=await savePlanningHelperLocalSnapshot({schemaVersion:LOCAL_SNAPSHOT_SCHEMA_VERSION,planningCommands:commandRecordsFromDefinitions(definitions,true),helperItems:[...helperByKey.values()],hiddenCommandIds:[],hiddenUseCaseIds:[]});
    return{snapshot,migrated:true,seededCommands:definitions.length,warnings};
  }

  function readPanelPosition(){try{const parsed=JSON.parse(localStorage.getItem(POSITION_KEY)||'{}');return{left:Number.isFinite(parsed.left)?parsed.left:null,top:Number.isFinite(parsed.top)?parsed.top:null};}catch(_){return{left:null,top:null};}}
  function savePanelPosition(position){try{localStorage.setItem(POSITION_KEY,JSON.stringify({left:position.left,top:position.top}));}catch(_){} }

  return { PLANNING_HELPER_STATE_KEYS:KEYS, PLANNING_HELPER_LEGACY_STATE_KEYS:LEGACY_KEYS, PLANNING_HELPER_DEFAULT_SETTINGS:DEFAULT_SETTINGS, LOCAL_SNAPSHOT_SCHEMA_VERSION, normalizeSettings, validateRepositorySettings, loadRepositorySettings, saveRepositorySettings, loadGitHubToken, saveGitHubToken, normalizeCommandRecord, normalizeHelperRecord, normalizePlanningHelperLocalSnapshot, loadPlanningHelperLocalSnapshot, savePlanningHelperLocalSnapshot, loadOrMigratePlanningHelperLocalSnapshot, mergeBundledCommandSeed, commandRecordsFromDefinitions, readPanelPosition, savePanelPosition };
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


  function groupEntriesByDirections(entries,directions){
    const groups=(directions||[]).map((direction)=>({id:direction.id,label:direction.label,description:direction.description||'',entries:[]}));
    const byId=new Map(groups.map((group)=>[group.id,group]));
    const ungrouped=[];
    for(const entry of entries||[]){
      const ids=[...new Set([...(entry.directionIds||[]),entry.directionId].filter(Boolean))];
      let placed=false;
      for(const id of ids){const group=byId.get(id);if(group){group.entries.push(entry);placed=true;}}
      if(!placed)ungrouped.push(entry);
    }
    const result=groups.filter((group)=>group.entries.length);
    if(ungrouped.length)result.push({id:'OTHER',label:'Other / legacy compatibility',description:'Commands or projections without a current semantic Direction mapping.',entries:ungrouped});
    return result;
  }

  function createPlanningHelperUi(options={}){
    const SURFACES=options.surfaces||deps.SURFACES;document.getElementById(HOST_ID)?.remove();document.getElementById('obs-command-helper-host')?.remove();
    const host=document.createElement('div');host.id=HOST_ID;document.documentElement.appendChild(host);const root=host.attachShadow({mode:'open'});const saved=options.position||{left:null,top:null};let left=saved.left??Math.max(12,window.innerWidth-560),top=saved.top??Math.max(12,window.innerHeight-760);let activeSurface=SURFACES.COMMANDS,commandEntries=[...(options.commandEntries||[])],promptEntries=[...(options.promptEntries||[])],useCaseEntries=[...(options.useCaseEntries||[])];const directionDefinitions=[...(options.directionDefinitions||[])];let focusCommandId=null,activeOverlay=null,isOpen=false,statusTimer=null,insertionBusy=false,operationBusy=false,dashboardOpen=document.documentElement.dataset.obsPlanningDashboardOpen==='true',lastToggleToken=document.documentElement.dataset.obsPlanningCommandsToggle||'';
    root.innerHTML=`<style>:host{all:initial}*{box-sizing:border-box}button,input,textarea{font:inherit}.launcher{position:fixed;right:18px;bottom:22px;z-index:2147483647;border:1px solid #64748b;border-radius:999px;padding:9px 13px;background:#111827;color:#f8fafc;font:700 12px system-ui;cursor:pointer}.panel{position:fixed;left:${left}px;top:${top}px;z-index:2147483647;width:min(580px,calc(100vw - 24px));max-height:min(88vh,900px);display:none;flex-direction:column;overflow:hidden;border:1px solid #475569;border-radius:14px;background:#0b1220;color:#f8fafc;box-shadow:0 20px 60px rgba(0,0,0,.5);font:13px/1.4 system-ui}.panel[data-open=true]{display:flex}.header{display:flex;align-items:center;gap:8px;padding:10px;background:#111b2e;border-bottom:1px solid #334155;cursor:grab}.title{flex:1}.title-main{font-weight:800}.title-sub{color:#94a3b8;font-size:11px}.tabs{display:grid;grid-template-columns:repeat(3,1fr);gap:4px;padding:7px}.tab,.tool{padding:7px}.tab[aria-selected=true]{background:#1d4ed8}.surface-tools{display:flex;gap:6px;padding:7px 8px;border-top:1px solid #1e293b;border-bottom:1px solid #1e293b;flex-wrap:wrap}.search-wrap{padding:8px}.search{width:100%;padding:8px;background:#020817;color:#fff;border:1px solid #334155;border-radius:8px}.body{overflow:auto;padding:8px}.direction-group{margin:6px 0;border:1px solid #26364f;border-radius:10px;background:#0d1728}.direction-group>summary{cursor:pointer;padding:8px 10px;font-weight:800;list-style:none}.direction-group>summary::-webkit-details-marker{display:none}.direction-group>summary::before{content:'▸';display:inline-block;width:16px;color:#94a3b8}.direction-group[open]>summary::before{content:'▾'}.direction-meta{display:block;margin-left:16px;color:#94a3b8;font-size:11px;font-weight:400}.direction-entries{padding:0 7px 7px 20px}.row{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:7px;margin:4px 0}.insert{padding:8px;text-align:left;min-width:0}.row-label{display:block;font-weight:750;overflow:hidden;text-overflow:ellipsis}.row-meta{display:block;color:#94a3b8;font-size:11px}.actions{display:flex;gap:5px;flex-wrap:wrap;justify-content:flex-end}button{border:1px solid #475569;border-radius:8px;background:#17243a;color:#f8fafc;cursor:pointer}button:hover,button:focus-visible{background:#243750}button:disabled{opacity:.55;cursor:wait}.copy,.full,.refinement,.edit-library,.edit-command,.delete-library,.delete-command,.reload-command,.open-command,.repo-library,.repo-command{padding:5px 8px}.delete-library,.delete-command{color:#fecaca}.status{margin:0 8px 8px;padding:8px;border-radius:8px;background:#172554;color:#bfdbfe;white-space:pre-wrap}.empty{padding:18px;color:#94a3b8;text-align:center}.overlay{position:fixed;inset:0;z-index:2147483647;background:rgba(2,8,23,.72);display:flex;align-items:center;justify-content:center;padding:18px}.modal{width:min(780px,96vw);max-height:90vh;overflow:auto;background:#0b1220;color:#f8fafc;border:1px solid #475569;border-radius:14px;padding:14px;font:13px/1.45 system-ui}.modal h2{margin:0 0 8px}.modal p{color:#cbd5e1}.modal textarea{width:100%;min-height:320px;padding:10px;background:#020817;color:#f8fafc;border:1px solid #475569;border-radius:8px;font:12px/1.45 ui-monospace,monospace}.modal input{width:100%;padding:8px;background:#020817;color:#fff;border:1px solid #475569;border-radius:8px}.fields{display:grid;grid-template-columns:1fr 1fr;gap:8px}.field{display:grid;gap:4px}.field-wide{grid-column:1/-1}.modal-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:10px}.preview{margin-top:10px;padding:10px;border:1px solid #334155;border-radius:8px;background:#07101f;white-space:pre-wrap}.danger{color:#fecaca}.ok{color:#bbf7d0}</style><button class="launcher" type="button">Planning</button><section class="panel" data-open="false"><div class="header"><div class="title"><div class="title-main">OBS Planning Helper</div><div class="title-sub">RAM-first · clipboard-first insert · explicit GitHub actions</div></div><button class="close" type="button">×</button></div><div class="tabs">${Object.values(SURFACES).map((surface)=>`<button class="tab" type="button" data-surface="${surface}" aria-selected="false">${surface}</button>`).join('')}</div><div class="surface-tools"><button class="tool new-library" type="button">New</button><button class="tool import-chat" type="button">Import from ChatGPT</button><button class="tool restore-chat" type="button">Restore from GitHub copy</button><button class="tool recovery-request" type="button">Copy recovery request</button><button class="tool check-github" type="button">Check GitHub</button><button class="tool sync-github" type="button">Sync missing</button><button class="tool settings" type="button">Repository settings</button></div><div class="search-wrap"><input class="search" type="search" placeholder="Search current surface…"></div><div class="body"></div></section>`;
    const launcher=root.querySelector('.launcher'),panel=root.querySelector('.panel'),header=root.querySelector('.header'),closeButton=root.querySelector('.close'),searchInput=root.querySelector('.search'),body=root.querySelector('.body'),tabButtons=[...root.querySelectorAll('.tab')],newLibraryButton=root.querySelector('.new-library'),checkGithubButton=root.querySelector('.check-github'),syncGithubButton=root.querySelector('.sync-github');
    function isLibrarySurface(surface){return surface===SURFACES.PROMPTS;}function isRepositorySurface(surface){return surface===SURFACES.COMMANDS||surface===SURFACES.PROMPTS;}function libraryKindForSurface(){return deps.HELPER_LIBRARY_KINDS.PROMPT;}function entriesForSurface(surface){if(surface===SURFACES.COMMANDS)return commandEntries;if(surface===SURFACES.PROMPTS)return promptEntries;if(surface===SURFACES.USE_CASES)return useCaseEntries;return[];}
    function setCommandEntries(entries){commandEntries=[...(entries||[])];if(activeSurface===SURFACES.COMMANDS)renderEntries(searchInput.value);}function setUseCaseEntries(entries){useCaseEntries=[...(entries||[])];if(activeSurface===SURFACES.USE_CASES)renderEntries(searchInput.value);}function setLibraryEntries(result={}){if(result.promptEntries)promptEntries=[...result.promptEntries];if(activeSurface===SURFACES.PROMPTS)renderEntries(searchInput.value);}function applyState(result={}){if(result.commandEntries)setCommandEntries(result.commandEntries);if(result.useCaseEntries)setUseCaseEntries(result.useCaseEntries);setLibraryEntries(result);}
    function showStatus(message,timeout=5200){root.querySelector('.status')?.remove();if(statusTimer!==null)clearTimeout(statusTimer);const status=document.createElement('div');status.className='status';status.textContent=String(message);panel.appendChild(status);statusTimer=setTimeout(()=>{status.remove();statusTimer=null;},timeout);}function setBusy(){root.querySelectorAll('button').forEach((button)=>{if(!button.classList.contains('close'))button.disabled=insertionBusy||operationBusy;});}
    async function insertBody(text,success,id){if(insertionBusy)return;insertionBusy=true;setBusy();try{showStatus(await options.onInsert(text,success,id)||success);}finally{insertionBusy=false;setBusy();}}
    function switchSurface(surface,commandId=null){activeSurface=surface;focusCommandId=commandId;searchInput.value='';tabButtons.forEach((button)=>button.setAttribute('aria-selected',String(button.dataset.surface===surface)));newLibraryButton.style.display=(surface===SURFACES.COMMANDS||surface===SURFACES.PROMPTS)?'inline-block':'none';newLibraryButton.textContent=surface===SURFACES.PROMPTS?'New prompt':'New command';checkGithubButton.style.display=isRepositorySurface(surface)?'inline-block':'none';syncGithubButton.style.display=isRepositorySurface(surface)?'inline-block':'none';renderEntries('');}
    function setOpen(value){isOpen=Boolean(value);if(!isOpen&&activeOverlay){activeOverlay.remove();activeOverlay=null;}panel.dataset.open=String(isOpen);launcher.style.display=isOpen||dashboardOpen?'none':'block';if(isOpen){keepPanelInViewport();renderEntries(searchInput.value);}}
    function repositoryReference(entry){if(activeSurface===SURFACES.COMMANDS&&entry.entityType==='planning-command')return{type:'planning-command',id:entry.id};if(entry.entityType==='legacy-helper-command'||activeSurface===SURFACES.PROMPTS)return{type:'helper',kind:entry.libraryKind,id:entry.libraryId};return null;}
    async function saveRepositoryEntry(entry){const reference=repositoryReference(entry);if(!reference)return;operationBusy=true;setBusy();try{showStatus(`Saving to GitHub: ${entry.title||entry.command||entry.label}…`,8000);const result=await options.onSaveRepositoryEntity(reference);applyState(result);const localWarning=result.localSnapshotUpdated===false?`\nRemote state is verified, but local repository-evidence metadata could not be saved: ${result.localSnapshotError||'unknown local persistence error'}. Run Check GitHub before relying on the local verification indicator.`:'';const outcome=result.replacedMalformedRemote?'GitHub invalid helper file repaired and verified':result.recoveredAfterConflict?'GitHub already contains intended content; verification recovered after concurrent/stale-SHA change':result.action==='noop'?'GitHub already matches':'GitHub saved';showStatus(`${outcome}: ${result.path}\nSHA: ${result.sha||'<none>'}${localWarning}`,localWarning?12000:8000);}catch(error){showStatus(repositorySaveFailureMessage(error),9000);}finally{operationBusy=false;setBusy();}}
    function entryMatches(entry,q){return !q||[entry.id,entry.label,entry.command||'',entry.description||'',entry.englishName||'',entry.text||'',...(entry.commandFamily||[])].join(' ').toLowerCase().includes(q);}
    function appendEntryRow(entry,parent){const row=document.createElement('div');row.className='row';const main=document.createElement('button');main.type='button';main.className='insert';const label=document.createElement('span');label.className='row-label';label.textContent=activeSurface===SURFACES.COMMANDS?(entry.entityType==='planning-command'?`${entry.englishName} · ${entry.command}`:entry.label):entry.label;const meta=document.createElement('span');meta.className='row-meta';meta.textContent=entry.entityType==='planning-command'?[entry.stateLabel,entry.description].filter(Boolean).join(' · '):(entry.description||entry.id);main.append(label,meta);const actions=document.createElement('div');actions.className='actions';
      if(activeSurface===SURFACES.PROMPTS||entry.entityType==='legacy-helper-command'){main.addEventListener('click',()=>insertBody(entry.text,`Inserted: ${entry.title}`,entry.id));const copy=document.createElement('button');copy.className='copy';copy.textContent='Copy';copy.addEventListener('click',async()=>showStatus(await options.onCopy(entry.text)?`Copied: ${entry.title}`:'Clipboard copy failed.'));const edit=document.createElement('button');edit.className='edit-library';edit.textContent='Edit';edit.addEventListener('click',()=>openLibraryEditor(entry));const repo=document.createElement('button');repo.className='repo-library';repo.textContent='Save GitHub';repo.addEventListener('click',()=>saveRepositoryEntry(entry));const remove=document.createElement('button');remove.className='delete-library';remove.textContent='Delete';remove.addEventListener('click',()=>deleteLocalLibrary(entry));actions.append(copy,edit,repo,remove);
      }else{main.addEventListener('click',()=>insertBody(entry.adaptiveBody,`Inserted: ${entry.label||entry.command} · Adaptive`,entry.id));const full=document.createElement('button');full.className='full';full.textContent='Full';full.addEventListener('click',()=>insertBody(entry.fullBody,`Inserted: ${entry.label||entry.command} · Full`,entry.id));actions.append(full);if(activeSurface===SURFACES.COMMANDS)for(const refinement of entry.refinementBodies||[]){const button=document.createElement('button');button.className='refinement';button.textContent=refinement.label;button.addEventListener('click',()=>insertBody(refinement.body,`Inserted refinement: ${entry.command} · ${refinement.label}`,`${entry.id}:${refinement.id}`));actions.append(button);}const copy=document.createElement('button');copy.className='copy';copy.textContent='Copy';copy.addEventListener('click',async()=>showStatus(await options.onCopy(entry.adaptiveBody)?`Copied: ${entry.label||entry.command}`:'Clipboard copy failed.'));actions.append(copy);if(activeSurface===SURFACES.COMMANDS){if(entry.entityType==='planning-command'){const edit=document.createElement('button');edit.className='edit-command';edit.textContent='Edit';edit.addEventListener('click',()=>openCommandEditor(entry));const repo=document.createElement('button');repo.className='repo-command';repo.textContent='Save GitHub';repo.addEventListener('click',()=>saveRepositoryEntry(entry));actions.append(edit,repo);if(entry.repositoryTracked){const reload=document.createElement('button');reload.className='reload-command';reload.textContent='Reload GitHub';reload.addEventListener('click',()=>reloadRepositoryCommand(entry));actions.append(reload);}}const remove=document.createElement('button');remove.className='delete-command';remove.textContent='Delete';remove.title=entry.entityType==='use-case-invocation-command'?'Hide only this generated UC invocation command locally; the Use Case remains visible and canonical registry/owner is untouched.':'Remove only from this Helper local snapshot; repository file is untouched.';remove.addEventListener('click',()=>deleteLocalCommand(entry));actions.append(remove);}else if(activeSurface===SURFACES.USE_CASES){const remove=document.createElement('button');remove.className='delete-command';remove.textContent='Delete';remove.title='Remove only from this Helper local snapshot; canonical Use-Case registries/owners are untouched.';remove.addEventListener('click',()=>deleteLocalUseCase(entry));actions.append(remove);}}
      row.append(main,actions);parent.appendChild(row);if(entry.id===focusCommandId)setTimeout(()=>{main.focus();row.scrollIntoView({block:'nearest'});focusCommandId=null;},0);}
    function renderEntries(query){const q=String(query||'').trim().toLowerCase();const all=entriesForSurface(activeSurface);body.textContent='';if(activeSurface===SURFACES.COMMANDS||activeSurface===SURFACES.USE_CASES){const groups=groupEntriesByDirections(all,directionDefinitions);let shown=0;for(const group of groups){const groupMatch=!q||[group.id,group.label,group.description].join(' ').toLowerCase().includes(q);const entries=group.entries.filter((entry)=>groupMatch||entryMatches(entry,q));if(!entries.length)continue;shown+=entries.length;const details=document.createElement('details');details.className='direction-group';details.dataset.direction=group.id;details.open=Boolean(q)||entries.some((entry)=>entry.id===focusCommandId);const summary=document.createElement('summary');summary.textContent=`${group.label} (${entries.length})`;const meta=document.createElement('span');meta.className='direction-meta';meta.textContent=group.id;summary.appendChild(meta);const nested=document.createElement('div');nested.className='direction-entries';for(const entry of entries)appendEntryRow(entry,nested);details.append(summary,nested);body.appendChild(details);}if(!shown){const empty=document.createElement('div');empty.className='empty';empty.textContent='No matching entries.';body.appendChild(empty);}return;}const entries=all.filter((entry)=>entryMatches(entry,q));if(!entries.length){const empty=document.createElement('div');empty.className='empty';empty.textContent='No matching entries.';body.appendChild(empty);return;}for(const entry of entries)appendEntryRow(entry,body);}

    function makeOverlay(title){activeOverlay?.remove();const overlay=document.createElement('div');overlay.className='overlay';const modal=document.createElement('section');modal.className='modal';const h=document.createElement('h2');h.textContent=title;modal.appendChild(h);overlay.appendChild(modal);root.appendChild(overlay);activeOverlay=overlay;overlay.addEventListener('click',(event)=>{if(event.target===overlay&&!operationBusy){overlay.remove();activeOverlay=null;}});return{overlay,modal};}
    async function openImport(mode){const restoring=mode==='restore';const{overlay,modal}=makeOverlay(restoring?'Restore local snapshot from GitHub copy':'Import new/changed items from ChatGPT');const intro=document.createElement('p');intro.textContent=restoring?'Paste the complete exact marker set returned by ChatGPT after it read GitHub. Restore reconciles repository-backed local records to that complete set, removes stale repository-backed records that are absent from it, preserves local-only unbacked records, and makes zero GitHub requests/writes.':'Paste planning-command definition and/or helper-library marker blocks from ChatGPT. Import changes only the local RAM/snapshot state. Use Save GitHub explicitly on a row when you want to create or update its repository file.';const textarea=document.createElement('textarea');textarea.placeholder='[PLANNING_COMMAND_DEFINITION]\n{ ... }\n[/PLANNING_COMMAND_DEFINITION]\n\n[PLANNING_HELPER_LIBRARY_ITEM]\n{ ... }\n[/PLANNING_HELPER_LIBRARY_ITEM]';const preview=document.createElement('div');preview.className='preview';preview.textContent='Not parsed yet.';const actions=document.createElement('div');actions.className='modal-actions';const cancel=document.createElement('button');cancel.textContent='Cancel';const parse=document.createElement('button');parse.textContent='Preview local import';const apply=document.createElement('button');apply.textContent=restoring?'Restore locally':'Import locally';apply.disabled=true;actions.append(cancel,parse,apply);modal.append(intro,textarea,preview,actions);let ready=false;cancel.addEventListener('click',()=>{if(!operationBusy){overlay.remove();activeOverlay=null;}});textarea.addEventListener('input',()=>{ready=false;apply.disabled=true;preview.textContent='Input changed. Preview again.';});parse.addEventListener('click',()=>{try{const result=options.onPreviewChatImport(textarea.value,mode);preview.textContent=`${result.parsed.definitions.length} planning command(s), ${result.parsed.helperItems.length} helper item(s).\n\n${result.lines.join('\n')}`;preview.className='preview ok';ready=true;apply.disabled=false;}catch(error){preview.textContent=error.message||String(error);preview.className='preview danger';ready=false;apply.disabled=true;}});apply.addEventListener('click',async()=>{if(!ready)return;operationBusy=true;setBusy();textarea.disabled=true;try{const result=await options.onApplyChatImport(textarea.value,mode);applyState(result);const failures=result.errors||[];preview.textContent=restoring?`Restored locally and reconciled repository-backed records. GitHub requests: 0.`:`Imported locally: ${result.createdLocal||0} new local record(s). GitHub requests: 0.`;preview.className='preview ok';showStatus(restoring?'Local snapshot restored/reconciled from pasted GitHub copy; no GitHub request was made.':'Local import completed. Use Save GitHub explicitly for repository persistence.',8000);}catch(error){preview.textContent=error.message||String(error);preview.className='preview danger';}finally{operationBusy=false;textarea.disabled=false;setBusy();}});}
    function newCommandDefinitionTemplate(){return{schemaVersion:1,id:'new.command.id',file:'new-command.command.md',command:'new command',englishName:'new command',commandFamily:['new command'],description:'compact palette description',meaning:'route meaning; semantic authority remains in current owners',activeContextBehavior:'Use current context when sufficient; otherwise resolve the current route.',traversalReadMode:'Targeted/full according to owner route.',ownerFiles:['planning/documentation/command-routing-workflow.md'],expectedOutput:'<expected command output>',permissionMode:'read-only',keyReminders:['Read the current command definition and ownerFiles; do not treat this draft or Helper as semantic authority.'],userTarget:'<target>',palette:true,refinements:[]};}
    async function openCommandEditor(entry=null){const{overlay,modal}=makeOverlay(entry?'Edit planning command':'New planning command');const intro=document.createElement('p');intro.textContent=entry?'Edit the real structured planning-command definition. Save local creates a draft in the unified snapshot; Save GitHub on the row publishes it through the validated planning/commands route. Existing command id/file are immutable in this editor.':'Create a real Planning Command draft. This does not register or grant its permissions until Save GitHub succeeds against the current repository command catalog.';const textWrap=document.createElement('label');textWrap.className='field field-wide';textWrap.innerHTML='<span>Planning command definition JSON</span>';const textarea=document.createElement('textarea');textarea.value=JSON.stringify(entry?.definition||newCommandDefinitionTemplate(),null,2);textWrap.append(textarea);const note=document.createElement('p');note.textContent='The Helper validates the complete local command catalog. Command meaning remains owned by planning/commands/*.command.md + ownerFiles after repository save; keep workflow algorithms in owners rather than duplicating them here.';const actions=document.createElement('div');actions.className='modal-actions';const cancel=document.createElement('button');cancel.textContent='Cancel';const save=document.createElement('button');save.textContent='Save local draft';actions.append(cancel,save);modal.append(intro,textWrap,note,actions);cancel.addEventListener('click',()=>{overlay.remove();activeOverlay=null;});save.addEventListener('click',async()=>{try{const result=await options.onSaveLocalCommandDefinition(textarea.value,entry?.id||'');applyState(result);overlay.remove();activeOverlay=null;showStatus(result.unchanged?'No command-definition change. Repository evidence preserved. GitHub requests: 0.':'Planning command draft saved locally. GitHub requests: 0.');}catch(error){showStatus(error.message||String(error),8000);}});}
    async function reloadRepositoryCommand(entry){operationBusy=true;setBusy();try{showStatus(`Reloading current GitHub command: ${entry.command}…`,8000);const result=await options.onReloadRepositoryCommand(entry.id);applyState(result);showStatus(`Reloaded from GitHub: ${result.path}
SHA: ${result.sha||'<none>'}`,8000);}catch(error){showStatus(`GitHub reload failed: ${error.message||String(error)}`,9000);}finally{operationBusy=false;setBusy();}}
    async function deleteLocalCommand(entry){try{const result=await options.onDeleteLocalCommand(entry.id);applyState(result);showStatus('Removed command from this Helper local snapshot. Repository file unchanged. GitHub requests: 0.');}catch(error){showStatus(error.message||String(error),7000);}}
    async function deleteLocalUseCase(entry){try{const result=await options.onDeleteLocalUseCase(entry.id);applyState(result);showStatus('Removed Use Case from this Helper local snapshot. Canonical registry/owners unchanged. GitHub requests: 0.');}catch(error){showStatus(error.message||String(error),7000);}}
    async function openLibraryEditor(entry=null){const kind=entry?.libraryKind||libraryKindForSurface(activeSurface);const{overlay,modal}=makeOverlay(entry?(entry.entityType==='legacy-helper-command'?'Edit legacy helper insertion':'Edit prompt'):'New prompt');const fields=document.createElement('div');fields.className='fields';const titleWrap=document.createElement('label');titleWrap.className='field field-wide';titleWrap.innerHTML='<span>Title</span>';const title=document.createElement('input');title.value=entry?.title||'';titleWrap.append(title);const textWrap=document.createElement('label');textWrap.className='field field-wide';textWrap.innerHTML='<span>Exact insertion text</span>';const textarea=document.createElement('textarea');textarea.value=entry?.text||'';textWrap.append(textarea);const note=document.createElement('p');note.textContent='Save local changes the RAM/local snapshot only. After saving, use Save GitHub on the row when repository persistence is wanted.';const actions=document.createElement('div');actions.className='modal-actions';const cancel=document.createElement('button');cancel.textContent='Cancel';const save=document.createElement('button');save.textContent='Save local';actions.append(cancel,save);modal.append(titleWrap,textWrap,note,actions);cancel.addEventListener('click',()=>{overlay.remove();activeOverlay=null;});save.addEventListener('click',async()=>{try{const result=await options.onSaveLocalLibraryItem({kind,id:entry?.libraryId||'',title:title.value,text:textarea.value,createdAt:entry?.createdAt||''});setLibraryEntries(result);overlay.remove();activeOverlay=null;showStatus(result.unchanged?'No local content change. Repository evidence preserved. GitHub requests: 0.':'Saved locally. GitHub requests: 0.');}catch(error){showStatus(error.message||String(error),7000);}});}
    async function deleteLocalLibrary(entry){try{const result=await options.onDeleteLocalLibraryItem(entry.libraryKind,entry.libraryId);setLibraryEntries(result);showStatus('Removed from local snapshot. GitHub requests: 0.');}catch(error){showStatus(error.message||String(error),7000);}}
    async function copyRecoveryRequest(){try{const text=await options.onGetRecoveryRequest();showStatus(await options.onCopy(text)?'Recovery request copied. Paste it into ChatGPT; then paste ChatGPT’s marker blocks into Restore from GitHub copy.':'Could not copy the recovery request.',9000);}catch(error){showStatus(error.message||String(error),7000);}}
    async function openSettings(){const{overlay,modal}=makeOverlay('Repository settings');let current;try{current=await options.onLoadSettings();}catch(error){showStatus(error.message||String(error));return;}const fields=document.createElement('div');fields.className='fields';function add(labelText,value,type='text',wide=false){const wrap=document.createElement('label');wrap.className=`field${wide?' field-wide':''}`;const span=document.createElement('span');span.textContent=labelText;const input=document.createElement('input');input.type=type;input.value=value||'';wrap.append(span,input);fields.append(wrap);return input;}const owner=add('Owner',current.settings.owner),repo=add('Repository',current.settings.repo),branch=add('Branch',current.settings.branch),token=add('GitHub token — used only by explicit Check GitHub / Sync missing / Reload GitHub / Save GitHub actions',current.token,'password',true);const note=document.createElement('p');note.textContent='Normal startup/search/insert/copy/edit/import remains RAM/local-only. GitHub reads and writes happen only after an explicit Check GitHub, Sync missing, Reload GitHub or Save GitHub action. Sync missing downloads only repository paths absent locally; it never overwrites a same-path local record. Reload GitHub is the explicit same-path command refresh. Delete remains local-only.';const actions=document.createElement('div');actions.className='modal-actions';const cancel=document.createElement('button');cancel.textContent='Cancel';const save=document.createElement('button');save.textContent='Save settings';actions.append(cancel,save);modal.append(fields,note,actions);cancel.addEventListener('click',()=>{overlay.remove();activeOverlay=null;});save.addEventListener('click',async()=>{operationBusy=true;setBusy();try{const result=await options.onSaveSettings({owner:owner.value,repo:repo.value,branch:branch.value},token.value);applyState(result);overlay.remove();activeOverlay=null;showStatus(result.sourceChanged?'Repository settings saved. Repository evidence metadata was cleared before the source changed.':'Repository settings saved.');}catch(error){showStatus(error.message||String(error),7000);}finally{operationBusy=false;setBusy();}});}
    function shortPaths(paths){const rows=(paths||[]).map((path)=>String(path).split('/').pop());return rows.length?rows.join(', '):'—';}
    function inventoryText(result){const i=result.inventory;function line(label,b){return`${label}: local ${b.local}, GitHub ${b.remote}, same-path ${b.common}\n  local-only: ${shortPaths(b.localOnly)}\n  GitHub-only: ${shortPaths(b.remoteOnly)}${b.knownChanged?.length?`\n  known SHA changed: ${shortPaths(b.knownChanged)}`:''}`;}return`Repository: ${result.settings.owner}/${result.settings.repo}@${result.settings.branch}\n\n${line('Planning commands',i.planningCommands)}\n\n${line('Helper commands',i.helperCommands)}\n\n${line('Prompts',i.prompts)}`;}
    async function checkRepository(){operationBusy=true;setBusy();try{showStatus('Checking GitHub names/counts…',9000);const result=await options.onCheckRepository();const{overlay,modal}=makeOverlay('GitHub inventory check');const pre=document.createElement('div');pre.className='preview ok';pre.textContent=inventoryText(result);const actions=document.createElement('div');actions.className='modal-actions';const close=document.createElement('button');close.textContent='Close';close.addEventListener('click',()=>{overlay.remove();activeOverlay=null;});actions.append(close);modal.append(pre,actions);showStatus('GitHub inventory checked. Local snapshot was not changed.',7000);}catch(error){showStatus(`GitHub check failed: ${error.message||String(error)}`,9000);}finally{operationBusy=false;setBusy();}}
    async function syncMissingRepository(){operationBusy=true;setBusy();try{showStatus('Syncing GitHub-only records into local snapshot…',9000);const result=await options.onSyncMissingRepository();applyState(result);showStatus(`Sync complete: ${result.addedCommands||0} planning command(s), ${result.addedHelperCommands||0} helper command(s), ${result.addedPrompts||0} prompt(s) added locally. Existing local paths were not overwritten.`,9000);}catch(error){showStatus(`GitHub sync failed: ${error.message||String(error)}`,9000);}finally{operationBusy=false;setBusy();}}
    function keepPanelInViewport(){const width=panel.offsetWidth||580,height=panel.offsetHeight||720;left=Math.min(Math.max(left,8),Math.max(8,window.innerWidth-width-8));top=Math.min(Math.max(top,8),Math.max(8,window.innerHeight-height-8));panel.style.left=`${left}px`;panel.style.top=`${top}px`;}
    function enableDragging(){let pointerId=null,startX=0,startY=0,startLeft=0,startTop=0;function down(event){if(event.button!==0||event.target.closest('button'))return;pointerId=event.pointerId;startX=event.clientX;startY=event.clientY;const rect=panel.getBoundingClientRect();startLeft=rect.left;startTop=rect.top;header.setPointerCapture(pointerId);}function move(event){if(pointerId!==event.pointerId)return;left=startLeft+event.clientX-startX;top=startTop+event.clientY-startY;keepPanelInViewport();}function finish(event){if(pointerId===null)return;try{header.releasePointerCapture(pointerId);}catch(_){}pointerId=null;options.onSavePosition?.({left,top});}header.addEventListener('pointerdown',down);header.addEventListener('pointermove',move);header.addEventListener('pointerup',finish);header.addEventListener('pointercancel',finish);return()=>{header.removeEventListener('pointerdown',down);header.removeEventListener('pointermove',move);header.removeEventListener('pointerup',finish);header.removeEventListener('pointercancel',finish);};}
    function consumeToggle(token){const next=String(token||'');if(next&&next!==lastToggleToken){lastToggleToken=next;setOpen(!isOpen);}}function handleShortcut(event){if(event.repeat)return;if(event.key==='Escape'&&activeOverlay&&!operationBusy){activeOverlay.remove();activeOverlay=null;return;}if(event.altKey&&!event.ctrlKey&&!event.metaKey&&event.key==='F2'){event.preventDefault();setOpen(!isOpen);}else if(event.key==='Escape'&&isOpen)setOpen(false);}
    const observer=new MutationObserver((mutations)=>{for(const mutation of mutations){if(mutation.attributeName==='data-obs-planning-dashboard-open'){dashboardOpen=document.documentElement.dataset.obsPlanningDashboardOpen==='true';launcher.style.display=isOpen||dashboardOpen?'none':'block';}if(mutation.attributeName==='data-obs-planning-commands-toggle')consumeToggle(document.documentElement.dataset.obsPlanningCommandsToggle);}});observer.observe(document.documentElement,{attributes:true,attributeFilter:['data-obs-planning-dashboard-open','data-obs-planning-commands-toggle']});
    tabButtons.forEach((button)=>button.addEventListener('click',()=>switchSurface(button.dataset.surface)));launcher.addEventListener('click',()=>setOpen(true));closeButton.addEventListener('click',()=>setOpen(false));searchInput.addEventListener('input',()=>renderEntries(searchInput.value));newLibraryButton.addEventListener('click',()=>activeSurface===SURFACES.COMMANDS?openCommandEditor():openLibraryEditor());root.querySelector('.import-chat').addEventListener('click',()=>openImport('import'));root.querySelector('.restore-chat').addEventListener('click',()=>openImport('restore'));root.querySelector('.recovery-request').addEventListener('click',copyRecoveryRequest);checkGithubButton.addEventListener('click',checkRepository);syncGithubButton.addEventListener('click',syncMissingRepository);root.querySelector('.settings').addEventListener('click',openSettings);window.addEventListener('resize',keepPanelInViewport);window.addEventListener('keydown',handleShortcut,true);const disableDragging=enableDragging();switchSurface(SURFACES.COMMANDS);if(options.startupWarnings?.length)setTimeout(()=>showStatus(options.startupWarnings.join('\n'),9000),100);
    function dispose(){if(statusTimer!==null)clearTimeout(statusTimer);observer.disconnect();disableDragging();window.removeEventListener('resize',keepPanelInViewport);window.removeEventListener('keydown',handleShortcut,true);host.remove();}
    return{setCommandEntries,setUseCaseEntries,setLibraryEntries,switchSurface,setOpen,showStatus,dispose,host,root};
  }
  return{createPlanningHelperUi,repositorySaveFailureMessage,groupEntriesByDirections};
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
    const hiddenUseCaseIds=new Set(snapshot.hiddenUseCaseIds||[]);
    const definitions=commandRecords.map((record)=>record.definition);
    deps.validateCommandCatalog(definitions);
    const commandByFile=new Map(commandRecords.map((record)=>[record.definition.file,record]));
    const commandById=new Map(commandRecords.map((record)=>[record.definition.id,record]));
    const helperByKey=new Map(helperRecords.map((record)=>[helperKey(record.item),record]));
    const planningEntries=deps.buildCommandEntries(definitions).map((entry)=>{const record=commandById.get(entry.id);const stateLabel=record?.repositoryKnown?'Registered · repository content verified':record?.repositoryTracked?'Registered · local draft changed':'New command draft · not registered';return{...entry,entityType:'planning-command',definition:record?.definition||null,rawContent:record?.rawContent||'',repositoryPath:record?.path||'',repositoryKnown:Boolean(record?.repositoryKnown),repositoryTracked:Boolean(record?.repositoryTracked),repositorySha:record?.repositorySha||'',stateLabel,directionIds:deps.directionIdsForCommand(record?.definition||entry)};});
    const genericInvoke=definitions.find((definition)=>definition.id==='use_case.invoke')||{file:'invoke-use-case.command.md',keyReminders:['The selected Use Case registry entry and current owner route are semantic authority; this generated Helper row is invocation only.','Do not infer repository mutation, archive, commit or push permission from UC activation.']};
    const visibleCommandIds=new Set(planningEntries.map((entry)=>entry.id));
    const hiddenCommandIds=new Set(snapshot.hiddenCommandIds||[]);
    const invocationEntries=deps.USE_CASE_DEFINITIONS.filter((uc)=>!(uc.commandId&&visibleCommandIds.has(uc.commandId))).map((uc)=>deps.buildUseCaseInvocationEntry(genericInvoke,uc)).filter((entry)=>!hiddenCommandIds.has(entry.id));
    const helperEntries=helperRecords.map((record)=>{const item=record.item;const evidence=record.repositorySha?'local · GitHub SHA verified':record.repositoryKnown?'local · repository-backed content; SHA unverified':'local · repository match not verified';return{id:`helper-library:${item.kind}:${item.id}`,entityType:item.kind===deps.HELPER_LIBRARY_KINDS.COMMAND?'legacy-helper-command':'prompt',libraryId:item.id,libraryKind:item.kind,label:item.kind===deps.HELPER_LIBRARY_KINDS.COMMAND?`Legacy insertion · ${item.title}`:item.title,title:item.title,description:item.kind===deps.HELPER_LIBRARY_KINDS.COMMAND?`Legacy helper-command compatibility · ${evidence}`:evidence,text:item.text,adaptiveBody:item.text,repositoryPath:record.path,repositoryKnown:Boolean(record.repositoryKnown),repositoryTracked:Boolean(record.repositoryKnown),repositorySha:record.repositorySha||'',createdAt:item.createdAt,updatedAt:item.updatedAt};});
    const legacyCommandEntries=helperEntries.filter((entry)=>entry.libraryKind===deps.HELPER_LIBRARY_KINDS.COMMAND);
    const useCaseEntries=(deps.buildSemanticEntries()[deps.SURFACES.USE_CASES]||[]).filter((entry)=>!hiddenUseCaseIds.has(entry.id));
    return{commandRecords,helperRecords,commandByFile,commandById,helperByKey,commandEntries:[...planningEntries,...invocationEntries,...legacyCommandEntries],localCommandEntries:legacyCommandEntries,promptEntries:helperEntries.filter((entry)=>entry.libraryKind===deps.HELPER_LIBRARY_KINDS.PROMPT),useCaseEntries};
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
      const rendered=deps.renderCommandDefinitionDocument(normalized);const unchanged=Boolean(previous)&&previous.rawContent===rendered;const record=deps.normalizeCommandRecord({definition:normalized,rawContent:rendered,repositoryKnown:mode==='restore'?true:(unchanged&&Boolean(previous?.repositoryKnown)),repositoryTracked:mode==='restore'?true:Boolean(previous?.repositoryTracked||previous?.repositoryKnown),repositorySha:mode==='restore'?'':(unchanged?previous?.repositorySha||'':'')});
      commandMap.set(normalized.file,record);if(mode==='import'&&!previous)newCommandRecords.push(record);
    }
    for(const itemValue of parsed.helperItems||[]){const item=deps.normalizeHelperLibraryItem(itemValue),key=helperKey(item),previous=current.helperByKey.get(key),rendered=deps.renderHelperLibraryDocument(item),unchanged=Boolean(previous)&&previous.rawContent===rendered;const record=deps.normalizeHelperRecord({item,rawContent:rendered,repositoryKnown:mode==='restore'?true:(unchanged&&Boolean(previous?.repositoryKnown)),repositoryTracked:mode==='restore'?true:Boolean(previous?.repositoryTracked||previous?.repositoryKnown),repositorySha:mode==='restore'?'':(unchanged?previous?.repositorySha||'':'')});helperMap.set(key,record);if(mode==='import'&&!previous)newHelperRecords.push(record);}
    const restoredCommandIds=new Set((parsed.definitions||[]).map((definition)=>deps.normalizeCommandDefinition(definition).id));
    const next={schemaVersion:deps.LOCAL_SNAPSHOT_SCHEMA_VERSION,savedAt:new Date().toISOString(),planningCommands:[...commandMap.values()],helperItems:[...helperMap.values()],hiddenCommandIds:(snapshot.hiddenCommandIds||[]).filter((id)=>!restoredCommandIds.has(id)),hiddenUseCaseIds:[...(snapshot.hiddenUseCaseIds||[])]};
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


  function prepareLocalCommandSave(snapshot,value,existingId=''){
    const memory=materializeSnapshot(snapshot);
    const raw=typeof value==='string'?JSON.parse(value):(value&&typeof value==='object'?value:{});
    const definition=deps.normalizeCommandDefinition(raw);
    const previous=existingId?memory.commandById.get(String(existingId)):null;
    if(existingId&&!previous)throw new Error(`Planning command not found: ${existingId}`);
    if(previous&&(definition.id!==previous.definition.id||definition.file!==previous.definition.file))throw new TypeError('Editing an existing command cannot change its id or file. Create a new command draft instead.');
    const collisionByFile=memory.commandRecords.find((record)=>record.definition.file===definition.file&&record.definition.id!==definition.id);
    if(collisionByFile)throw new TypeError(`Planning command file ${definition.file} already belongs to ${collisionByFile.definition.id}.`);
    const collisionById=memory.commandRecords.find((record)=>record.definition.id===definition.id&&record.definition.file!==definition.file);
    if(collisionById)throw new TypeError(`Planning command id ${definition.id} already belongs to ${collisionById.definition.file}.`);
    const rawContent=deps.renderCommandDefinitionDocument(definition);
    if(previous&&previous.rawContent===rawContent)return{changed:false,definition:previous.definition,record:previous,snapshot};
    const record=deps.normalizeCommandRecord({definition,rawContent,repositoryKnown:false,repositoryTracked:Boolean(previous?.repositoryTracked||previous?.repositoryKnown),repositorySha:''});
    const records=[...memory.commandRecords.filter((entry)=>entry.definition.id!==definition.id),record];
    deps.validateCommandCatalog(records.map((entry)=>entry.definition));
    return{changed:true,definition,record,snapshot:{...snapshot,planningCommands:records,hiddenCommandIds:(snapshot.hiddenCommandIds||[]).filter((id)=>id!==definition.id)}};
  }

  function deleteLocalCommandFromSnapshot(snapshot,id){
    const memory=materializeSnapshot(snapshot),value=String(id||'').trim(),record=memory.commandById.get(value);
    const invocation=deps.USE_CASE_DEFINITIONS.some((uc)=>deps.useCaseInvocationCommandId(uc.id)===value);
    if(!record&&!invocation)throw new Error(`Planning/UC invocation command not found: ${value||'<empty>'}`);
    return deps.normalizePlanningHelperLocalSnapshot({...snapshot,planningCommands:record?memory.commandRecords.filter((entry)=>entry.definition.id!==value):memory.commandRecords,hiddenCommandIds:[...new Set([...(snapshot.hiddenCommandIds||[]),value])]});
  }

  function deleteLocalUseCaseFromSnapshot(snapshot,id){
    const value=String(id||'').trim();if(!deps.USE_CASE_DEFINITIONS.some((entry)=>entry.id===value))throw new Error(`Use Case not found: ${value||'<empty>'}`);
    return deps.normalizePlanningHelperLocalSnapshot({...snapshot,hiddenUseCaseIds:[...new Set([...(snapshot.hiddenUseCaseIds||[]),value])]});
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
    return deps.normalizePlanningHelperLocalSnapshot({...snapshot,planningCommands:memory.commandRecords.map((record)=>deps.normalizeCommandRecord({...record,repositoryKnown:false,repositoryTracked:false,repositorySha:''})),helperItems:memory.helperRecords.map((record)=>deps.normalizeHelperRecord({...record,repositoryKnown:false,repositorySha:''}))});
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
    for(const remote of remoteRecords.commands||[]){if(commandMap.has(remote.path))continue;const record=deps.normalizeCommandRecord({definition:remote.definition,path:remote.path,rawContent:remote.rawContent,repositoryKnown:true,repositoryTracked:true,repositorySha:remote.sha});commandMap.set(record.path,record);addedCommands.push(record);}
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
    const bundledUseCases=Array.isArray(options.bundledUseCases)?options.bundledUseCases:[];
    if(bundledUseCases.length){const expected=deps.USE_CASE_DEFINITIONS.map((entry)=>entry.id).sort(),actual=bundledUseCases.map((entry)=>String(entry?.id||'')).sort();if(JSON.stringify(actual)!==JSON.stringify(expected))throw new Error('Bundled Use-Case seed catalog does not match current semantic projections.');}
    const repositoryLock=createRepositoryOperationLock();
    const loaded=await deps.loadOrMigratePlanningHelperLocalSnapshot(bundled);let snapshot=loaded.snapshot;let memory=materializeSnapshot(snapshot);const startupWarnings=[...(loaded.warnings||[])];if(loaded.migrated)startupWarnings.push('Planning Helper migrated existing local caches into one RAM-first local snapshot.');
    function uiState(){return{commandEntries:memory.commandEntries,localCommandEntries:memory.localCommandEntries,promptEntries:memory.promptEntries,useCaseEntries:memory.useCaseEntries};}
    async function persist(next){snapshot=await deps.savePlanningHelperLocalSnapshot(next);memory=materializeSnapshot(snapshot);return uiState();}
    async function makeClient(){const settings=await deps.loadRepositorySettings();const token=await deps.loadGitHubToken();if(typeof GM_xmlhttpRequest!=='function')throw new Error('GM_xmlhttpRequest is unavailable; reinstall the generated Planning Helper userscript and accept its GM grants.');return{client:new deps.GitHubContentsClient({...settings,token,transport:deps.createGmTransport(GM_xmlhttpRequest)}),settings,token};}
    async function makeServices(){const{client,settings}=await makeClient();return{commandService:new deps.RepositoryCommandService(client,{commandsPath:deps.COMMANDS_PATH}),helperService:new deps.RepositoryHelperLibraryService(client),settings};}

    async function applyChatText(text,mode='import'){
      return repositoryLock.run(mode==='restore'?'Restore local snapshot':'Import chat items',async()=>{const parsed=deps.parseChatImport(text);const merged=mergeChatImport(snapshot,parsed,mode);await persist(merged.snapshot);return{ok:true,mode,createdLocal:merged.newCommandRecords.length+merged.newHelperRecords.length,removedRepositoryCommands:merged.removedRepositoryCommands||0,removedRepositoryHelperItems:merged.removedRepositoryHelperItems||0,errors:[],...uiState()};});
    }

    async function saveLocalCommandDefinition(value,existingId=''){const prepared=prepareLocalCommandSave(snapshot,value,existingId);if(!prepared.changed)return{definition:prepared.definition,unchanged:true,...uiState()};const state=await persist(prepared.snapshot);return{definition:prepared.definition,unchanged:false,...state};}
    async function deleteLocalCommand(id){return persist(deleteLocalCommandFromSnapshot(snapshot,id));}
    async function deleteLocalUseCase(id){return persist(deleteLocalUseCaseFromSnapshot(snapshot,id));}
    async function reloadRepositoryCommand(id){return repositoryLock.run('Reload planning command from GitHub',async()=>{const{commandService,settings}=await makeServices();const record=memory.commandById.get(String(id||''));if(!record)throw new Error(`Planning command not found: ${id||'<empty>'}`);const remote=await commandService.readRemote(record.path);const replacement=deps.normalizeCommandRecord({definition:remote.definition,path:remote.path,rawContent:remote.rawContent,repositoryKnown:true,repositoryTracked:true,repositorySha:remote.sha});const records=memory.commandRecords.map((entry)=>entry.definition.id===record.definition.id?replacement:entry);deps.validateCommandCatalog(records.map((entry)=>entry.definition));const state=await persist({...snapshot,planningCommands:records});return{settings,path:remote.path,sha:remote.sha,...state};});}
    async function saveLocalLibraryItem(value){const prepared=prepareLocalHelperSave(snapshot,value);if(!prepared.changed)return{item:prepared.item,unchanged:true,...uiState()};const state=await persist(prepared.snapshot);return{item:prepared.item,unchanged:false,...state};}
    async function deleteLocalLibraryItem(kind,id){const key=`${kind}:${id}`;const next={...snapshot,helperItems:memory.helperRecords.filter((record)=>helperKey(record.item)!==key)};return persist(next);}

    async function checkRepository(){return repositoryLock.run('Check GitHub inventory',async()=>{const{commandService,helperService,settings}=await makeServices();const commands=await commandService.listRemote();const helperItems=await helperService.listRemoteAll();return{settings,inventory:compareRepositoryInventory(snapshot,{commands,helperItems}),remoteCatalog:{commands,helperItems}};});}

    async function syncMissingRepository(){return repositoryLock.run('Sync missing from GitHub',async()=>{const{commandService,helperService,settings}=await makeServices();const commands=await commandService.listRemote();const helperItems=await helperService.listRemoteAll();const inventory=compareRepositoryInventory(snapshot,{commands,helperItems});const commandMissing=new Set(inventory.planningCommands.remoteOnly),helperMissing=new Set([...inventory.helperCommands.remoteOnly,...inventory.prompts.remoteOnly]);const remoteCommands=[],remoteHelpers=[];for(const entry of commands)if(commandMissing.has(entry.path))remoteCommands.push(await commandService.readRemote(entry.path));for(const entry of helperItems)if(helperMissing.has(entry.path))remoteHelpers.push(await helperService.readRemote(entry.path));const merged=mergeRemoteMissing(snapshot,{commands:remoteCommands,helperItems:remoteHelpers});await persist(merged.snapshot);return{settings,addedCommands:merged.addedCommands.length,addedHelperCommands:merged.addedHelpers.filter((record)=>record.item.kind===deps.HELPER_LIBRARY_KINDS.COMMAND).length,addedPrompts:merged.addedHelpers.filter((record)=>record.item.kind===deps.HELPER_LIBRARY_KINDS.PROMPT).length,inventoryBefore:inventory,...uiState()};});}

    async function saveRepositoryEntity(reference){return repositoryLock.run('Save item to GitHub',async()=>{const{commandService,helperService,settings}=await makeServices();const type=String(reference?.type||'');let result,next;if(type==='planning-command'){const record=memory.commandById.get(String(reference.id||''));if(!record)throw new Error(`Local planning command not found: ${reference?.id||'<empty>'}`);result=await commandService.save(record.definition);next={...snapshot,planningCommands:memory.commandRecords.map((entry)=>entry.path===record.path?deps.normalizeCommandRecord({...entry,rawContent:result.rawContent,repositoryKnown:true,repositoryTracked:true,repositorySha:result.sha}):entry)};}else if(type==='helper'){const key=`${reference?.kind}:${reference?.id}`;const record=memory.helperByKey.get(key);if(!record)throw new Error(`Local helper item not found: ${key}`);result=await helperService.save(record.item);next={...snapshot,helperItems:memory.helperRecords.map((entry)=>entry.path===record.path?deps.normalizeHelperRecord({...entry,rawContent:result.rawContent,repositoryKnown:true,repositoryTracked:true,repositorySha:result.sha}):entry)};}else throw new TypeError(`Unsupported repository entity type: ${type||'<empty>'}`);return persistVerifiedRepositoryResult(persist,next,result,settings,uiState);});}

    async function getRecoveryRequest(){const settings=await deps.loadRepositorySettings();return deps.buildRecoveryRequest(settings);}
    async function loadSettings(){return{settings:await deps.loadRepositorySettings(),token:await deps.loadGitHubToken()};}
    async function saveSettings(settings,token){return repositoryLock.run('Save repository settings',async()=>{const previous=await deps.loadRepositorySettings();const candidate=deps.validateRepositorySettings(settings);const sourceChanged=repositorySettingsKey(previous)!==repositorySettingsKey(candidate);if(sourceChanged)await persist(clearRepositoryEvidence(snapshot));await deps.saveGitHubToken(token);await deps.saveRepositorySettings(candidate);return{sourceChanged,...uiState()};});}

    const ui=deps.createPlanningHelperUi({surfaces:deps.SURFACES,directionDefinitions:deps.DIRECTION_DEFINITIONS,...uiState(),position:deps.readPanelPosition(),onSavePosition:deps.savePanelPosition,onInsert:(text,success,id)=>insertWithClipboard(text,success,id),onCopy:deps.copyText,onPreviewChatImport:(text,mode)=>previewChatImport(snapshot,text,mode),onApplyChatImport:applyChatText,onGetRecoveryRequest:getRecoveryRequest,onSaveLocalCommandDefinition:saveLocalCommandDefinition,onDeleteLocalCommand:deleteLocalCommand,onDeleteLocalUseCase:deleteLocalUseCase,onReloadRepositoryCommand:reloadRepositoryCommand,onSaveLocalLibraryItem:saveLocalLibraryItem,onDeleteLocalLibraryItem:deleteLocalLibraryItem,onCheckRepository:checkRepository,onSyncMissingRepository:syncMissingRepository,onSaveRepositoryEntity:saveRepositoryEntity,onLoadSettings:loadSettings,onSaveSettings:saveSettings,startupWarnings});
    function dispose(){ui?.dispose();if(globalThis[INSTANCE_DISPOSE_KEY]===dispose)delete globalThis[INSTANCE_DISPOSE_KEY];for(const key of LEGACY_DISPOSE_KEYS)if(globalThis[key]===dispose)delete globalThis[key];}
    globalThis[INSTANCE_DISPOSE_KEY]=dispose;
    return{dispose,getSnapshot:()=>snapshot,getDefinitions:()=>memory.commandRecords.map((record)=>record.definition),getLocalLibrary:()=>memory.helperRecords.map((record)=>record.item),previewChatImport:(text,mode)=>previewChatImport(snapshot,text,mode),applyChatImport:applyChatText,saveLocalCommandDefinition,deleteLocalCommand,deleteLocalUseCase,reloadRepositoryCommand,checkRepository,syncMissingRepository,saveRepositoryEntity,getRepositoryOperation:()=>repositoryLock.active()};
  }

  return{startPlanningHelper,createRepositoryOperationLock,materializeSnapshot,mergeChatImport,previewChatImport,compareRepositoryInventory,mergeRemoteMissing,prepareLocalCommandSave,deleteLocalCommandFromSnapshot,deleteLocalUseCaseFromSnapshot,prepareLocalHelperSave,clearRepositoryEvidence,persistVerifiedRepositoryResult,insertWithClipboard};
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
    "description": "collect/review Ideas and update integrated current planning",
    "meaning": "Extract coherent Ideas/provenance from the selected source, preserve material non-Idea context, review necessity/better routes, resolve the affected Workspace Use Cases or Application Scenarios, and integrate selected meaning into one current plan. Q/R/P is derived only as an owner-attached unresolved/adverse delta; it is never the planning root.",
    "activeContextBehavior": "Use the explicitly selected or clearly active current source. When a current integrated plan is clearly selected, use it as the current baseline and update it rather than starting a parallel plan. For Workspace/documentation planning use UCDS (Use Case → Domain/Rules → Vertical Slice/Realization) proportionally: once the UC boundary is sufficiently grounded, normally review Step 1 + Step 2; Step 1 may stand alone while the target UC picture remains materially unresolved; include Step 3 when explicitly requested or realization is sufficiently grounded/useful. For Application planning use SDS (Scenario → Domain/Rules → Slice) proportionally. Mini is a compact representation; Modular separates owners/order as the plan grows; Full SDS uses the detailed SDS profile. Ask only when source/current-plan identity is genuinely missing or ambiguous.",
    "traversalReadMode": "Targeted/full by source size, current-plan/current-owner uncertainty, affected useful results and selected planning depth.",
    "ownerFiles": [
      "planning/documentation/idea-planning-principles-and-terminology.md",
      "planning/documentation/idea-review-and-planning-workflow.md",
      "planning/documentation/IDEA-REVIEW-TEMPLATE.md",
      "planning/documentation/ai-reviewability-and-directed-planning-principles.md",
      "planning/documentation/direction-and-use-case-registry-workflow.md",
      "planning/documentation/workspace-planning/workspace-planning-principles-and-terminology.md",
      "planning/documentation/workspace-planning/WORKSPACE-USE-CASE-PLANNING-TEMPLATE.md",
      "planning/documentation/profiles/sds-planning-profiles.md"
    ],
    "expectedOutput": "Source/Baseline/Real-Life Basis + Key Points + Related Ideas/provenance + affected Workspace UC/Application Scenario Current→Target planning in proportional UCDS/SDS + attached Q/R/P only when material unresolved deltas remain + Review Order lens only when useful + execution order/versions when selected + cross-unit review + Current Overall Conclusions + only genuinely unselected Better Routes.",
    "permissionMode": "read-only",
    "keyReminders": [
      "Use the explicitly selected or clearly active current source; do not silently select an earlier archive, ledger or message.",
      "When a current integrated plan is clearly active, update that plan as baseline; do not create an append-only command-result ledger or parallel Goal Map.",
      "Ordinary chat text controls requested scope/depth/lens. Do not create a persistent Focus/H0-H1-H2 state or a command for each modifier.",
      "Not every source statement is an Idea; preserve relevant Existing Reality, constraints, decisions, corrections and questions with their proper meaning.",
      "Perform every mandatory Idea review check, but do not manufacture objections, risks or refinements merely to populate fields.",
      "Actively test whether each Idea deserves implementation and whether a genuinely simpler or better route exists.",
      "Idea remains the generic Idea entity; do not create Scenario Idea, Workspace-UC Idea, File-Update Idea or other context-specific Idea types.",
      "For material selected change, resolve affected existing/new Workspace UCs or Application Scenarios using current semantic owners and normal independent-usefulness/Scenario-boundary rules.",
      "Several Ideas affecting one UC/Scenario converge into one integrated target for that unit; one cross-cutting Idea is reviewed once and referenced from affected units with local impact only.",
      "For Workspace/documentation planning use UCDS: Step 1 Use Case → Step 2 Domain/Rules → Step 3 Vertical Slice/Realization. For Application planning use SDS: Scenario → Domain/Rules → Slice. The semantic rules do not become weaker in Mini form.",
      "Use planning dependency direction upstream → downstream. Preserve early later-step insight as provisional context, but do not let downstream convenience normally define upstream meaning.",
      "For Workspace/documentation planning, Step 1 + Step 2 is the normal default once the UC boundary is sufficiently grounded; Step 1 may stand alone while the target UC picture is materially unresolved; include Step 3 when explicitly requested or realization is sufficiently grounded/useful.",
      "Plan from Need/situation → UC/Scenario → Current→Target. Derive Q/R/P only after a concrete owner/current planned state exists; do not walk a FIND queue.",
      "Execution order is the selected route through planned work; represent genuine parallelism/dependencies rather than forcing a total order. Application execution order may group Slices by versions/releases.",
      "Current State normally uses a high-level summary + direct current-owner links. Target changed/new semantic meaning must be complete enough that implementation does not invent missing decisions; keep Current→Target Transition separate.",
      "When several UCs/Slices are affected, review their combined architecture effect, classify cross-Slice overlap and challenge the number/necessity of shared coordination owners.",
      "The command is an orchestration shortcut, not semantic authority. Read affected current UC/Scenario/Domain/Architecture owners instead of copying their contracts into the command.",
      "Potential Simplifications / Better Routes contains only not-yet-selected candidate changes to Current Plan and is removed once a candidate is selected.",
      "Apply Key Points / Review Priority and built-in recheck before returning material output; `крит` remains an optional separate adversarial review.",
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
    "id": "use_case.invoke",
    "file": "invoke-use-case.command.md",
    "command": "вызови юзкейс",
    "englishName": "invoke use case",
    "commandFamily": [
      "вызови юзкейс",
      "invoke use case"
    ],
    "description": "invoke one current canonical Use Case",
    "meaning": "Invoke one selected current canonical Use Case through its exact current registry entry and owner route. This command is a thin invocation layer and never duplicates or overrides UC semantics.",
    "activeContextBehavior": "Use the explicitly selected UC ID and current user target. Resolve that exact current canonical registry entry and follow its owner route; ask only when the UC identity or target is genuinely missing or ambiguous.",
    "traversalReadMode": "Targeted/full according to the selected UC owner route and current target.",
    "ownerFiles": [
      "planning/documentation/direction-and-use-case-registry-workflow.md"
    ],
    "expectedOutput": "The selected Use Case result for the current user target, using current owner semantics and preserving its permission boundary.",
    "permissionMode": "read-only-unless-selected-uc-route-explicitly-authorizes-more",
    "keyReminders": [
      "The selected Use Case registry entry and current owner route are semantic authority; this generic command is invocation only.",
      "Use the exact UC ID supplied by the generated Helper command row and resolve it in the current canonical registry before material work.",
      "Do not infer repository mutation, archive, commit or push permission from UC activation; executable permission remains route-specific.",
      "If a dedicated bespoke Planning Command already owns this UC invocation, use that command instead of this generic route."
    ],
    "userTarget": "<UC id + concrete target>",
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
    "description": "legacy context recheck",
    "meaning": "Legacy explicit recheck shortcut; current material answers use built-in current-target and integration recheck before return.",
    "activeContextBehavior": "If explicitly invoked for compatibility, recheck the selected current target using the current reviewability principles; do not treat this shortcut as a separate current planning capability.",
    "traversalReadMode": "Targeted/full by risk and current owner uncertainty.",
    "ownerFiles": [
      "planning/documentation/ai-reviewability-and-directed-planning-principles.md"
    ],
    "expectedOutput": "Corrected current answer/review only when material new findings exist; otherwise a compact confirmation that no material omission was found.",
    "permissionMode": "read-only",
    "keyReminders": [
      "This command is legacy compatibility, not the current reviewability architecture.",
      "Use current canonical owners and checked evidence rather than rereading prior prose as authority.",
      "Preserve accepted decisions and constraints unless evidence challenges them.",
      "Do not edit files, create archives, commit or push."
    ],
    "userTarget": "<legacy explicit recheck target>",
    "palette": false,
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
  const useCases=[
  {
    "id": "UC-DOC-BUILD-REPLACEMENT-PACKAGE",
    "label": "Build Replacement Package",
    "description": "package an approved exact file transition for a local consumer",
    "sources": [
      "planning/documentation/use-case-registry.md"
    ],
    "instruction": "Resolve UC-DOC-BUILD-REPLACEMENT-PACKAGE in the current canonical registry and follow its current owner route (build-replacement-archive-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Build Replacement Package target>",
    "directionId": "DIR-DOCUMENTATION",
    "manualInvocation": true,
    "commandId": "replacement_archive.create"
  },
  {
    "id": "UC-DOC-BUILD-REVIEWABLE-ARCHIVE",
    "label": "Build Legacy Review-Diff Archive Route",
    "description": "support the explicitly selected legacy repo-stored/clipboard diff-transfer package route",
    "sources": [
      "planning/documentation/use-case-registry.md"
    ],
    "instruction": "Resolve UC-DOC-BUILD-REVIEWABLE-ARCHIVE in the current canonical registry and follow its current owner route (reviewable-agent-output-and-commands-workflow.md + review-diff-file-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Build Legacy Review-Diff Archive Route target>",
    "directionId": "DIR-DOCUMENTATION",
    "manualInvocation": true,
    "commandId": "replacement_archive.review_diff.create"
  },
  {
    "id": "UC-DOC-CONFIGURE-REVIEW-DEPENDENCIES",
    "label": "Configure Required Dependency Reviews",
    "description": "register semantic source→consumer relationships whose source changes must signal explicit downstream review",
    "sources": [
      "planning/documentation/use-case-registry.md"
    ],
    "instruction": "Resolve UC-DOC-CONFIGURE-REVIEW-DEPENDENCIES in the current canonical registry and follow its current owner route (review-dependency-planning-workflow.md + Linked Notes mechanism when available). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Configure Required Dependency Reviews target>",
    "directionId": "DIR-DOCUMENTATION",
    "manualInvocation": true
  },
  {
    "id": "UC-DOC-ESTABLISH-DEPENDENCY",
    "label": "Establish Semantic Dependency",
    "description": "decide/classify one meaningful semantic dependency and its owner/handoff",
    "sources": [
      "planning/documentation/use-case-registry.md"
    ],
    "instruction": "Resolve UC-DOC-ESTABLISH-DEPENDENCY in the current canonical registry and follow its current owner route (review-dependency-planning-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Establish Semantic Dependency target>",
    "directionId": "DIR-DOCUMENTATION",
    "manualInvocation": true
  },
  {
    "id": "UC-DOC-FIND-OWNER",
    "label": "Determine Where Information Belongs",
    "description": "place meaning in the narrowest non-duplicated owner zone",
    "sources": [
      "planning/documentation/use-case-registry.md"
    ],
    "instruction": "Resolve UC-DOC-FIND-OWNER in the current canonical registry and follow its current owner route (documentation-responsibility-zone-review-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Determine Where Information Belongs target>",
    "directionId": "DIR-DOCUMENTATION",
    "manualInvocation": true
  },
  {
    "id": "UC-DOC-MAINTAIN-COMMAND",
    "label": "Create / Maintain Planning Command",
    "description": "create or change a registered executable shortcut without turning it into semantic authority",
    "sources": [
      "planning/documentation/use-case-registry.md"
    ],
    "instruction": "Resolve UC-DOC-MAINTAIN-COMMAND in the current canonical registry and follow its current owner route (command-planning-workflow.md + command-routing-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Create / Maintain Planning Command target>",
    "directionId": "DIR-DOCUMENTATION",
    "manualInvocation": true,
    "commandId": "command.plan"
  },
  {
    "id": "UC-DOC-MAINTAIN-NAVIGATION",
    "label": "Maintain Repository Documentation Navigation",
    "description": "maintain natural README/index/Direction-to-applicable-semantic-entry discovery routes without duplicating semantic bodies",
    "sources": [
      "planning/documentation/use-case-registry.md"
    ],
    "instruction": "Resolve UC-DOC-MAINTAIN-NAVIGATION in the current canonical registry and follow its current owner route (architecture principles + responsibility map + affected README/index/navigation owners; validate with coverage-review workflow). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Maintain Repository Documentation Navigation target>",
    "directionId": "DIR-DOCUMENTATION",
    "manualInvocation": true
  },
  {
    "id": "UC-DOC-MAINTAIN-PROMPT",
    "label": "Create / Maintain Reusable Prompt",
    "description": "create/review/change reusable AI bootstrap/diagnostic/helper insertion text that navigates current owners without becoming authority",
    "sources": [
      "planning/documentation/use-case-registry.md"
    ],
    "instruction": "Resolve UC-DOC-MAINTAIN-PROMPT in the current canonical registry and follow its current owner route (prompt-maintenance-workflow.md + planning/helper-library/README.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Create / Maintain Reusable Prompt target>",
    "directionId": "DIR-DOCUMENTATION",
    "manualInvocation": true
  },
  {
    "id": "UC-DOC-MAINTAIN-REGISTRIES",
    "label": "Maintain Directions And Use Cases",
    "description": "keep semantic Direction/Use-Case capability contracts current and complete",
    "sources": [
      "planning/documentation/use-case-registry.md"
    ],
    "instruction": "Resolve UC-DOC-MAINTAIN-REGISTRIES in the current canonical registry and follow its current owner route (direction-and-use-case-registry-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Maintain Directions And Use Cases target>",
    "directionId": "DIR-DOCUMENTATION",
    "manualInvocation": true
  },
  {
    "id": "UC-DOC-MAINTAIN-SHARED-EXACT-MEANING",
    "label": "Maintain Shared Exact Meaning",
    "description": "preserve one exact literal/shared definition across consumers when exact synchronization is truly required",
    "sources": [
      "planning/documentation/use-case-registry.md"
    ],
    "instruction": "Resolve UC-DOC-MAINTAIN-SHARED-EXACT-MEANING in the current canonical registry and follow its current owner route (review-dependency-planning-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Maintain Shared Exact Meaning target>",
    "directionId": "DIR-DOCUMENTATION",
    "manualInvocation": true
  },
  {
    "id": "UC-DOC-ORIENT",
    "label": "Bootstrap Reusable Documentation Governance",
    "description": "load reusable documentation methodology and resolve the applicable documentation capability/owners",
    "sources": [
      "planning/documentation/use-case-registry.md"
    ],
    "instruction": "Resolve UC-DOC-ORIENT in the current canonical registry and follow its current owner route (documentation-principles-read-workflow.md + architecture principles + responsibility map + this registry). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Bootstrap Reusable Documentation Governance target>",
    "directionId": "DIR-DOCUMENTATION",
    "manualInvocation": true,
    "commandId": "documentation_principles.read"
  },
  {
    "id": "UC-DOC-PLAN-FILE-UPDATE",
    "label": "Plan Concrete File / Docs / Code Update",
    "description": "translate selected meaning into one concrete ordered file transition",
    "sources": [
      "planning/documentation/use-case-registry.md"
    ],
    "instruction": "Resolve UC-DOC-PLAN-FILE-UPDATE in the current canonical registry and follow its current owner route (file-update-overview-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Plan Concrete File / Docs / Code Update target>",
    "directionId": "DIR-DOCUMENTATION",
    "manualInvocation": true,
    "commandId": "file_update.plan"
  },
  {
    "id": "UC-DOC-PLAN-UPDATE",
    "label": "Plan A Documentation Update",
    "description": "plan a material documentation change through the affected Workspace UC(s), semantic rules/owners and vertical realization before execution",
    "sources": [
      "planning/documentation/use-case-registry.md"
    ],
    "instruction": "Resolve UC-DOC-PLAN-UPDATE in the current canonical registry and follow its current owner route (documentation-update-plan-workflow.md → workspace-planning/ as needed → file-update workflow only when an explicit ordered concrete file plan is selected). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Plan A Documentation Update target>",
    "directionId": "DIR-DOCUMENTATION",
    "manualInvocation": true
  },
  {
    "id": "UC-DOC-RECONCILE-STATUS",
    "label": "Reconcile Documentation / Owner Status",
    "description": "resolve inconsistent active/current/deferred/retired state",
    "sources": [
      "planning/documentation/use-case-registry.md"
    ],
    "instruction": "Resolve UC-DOC-RECONCILE-STATUS in the current canonical registry and follow its current owner route (status-reconciliation-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Reconcile Documentation / Owner Status target>",
    "directionId": "DIR-DOCUMENTATION",
    "manualInvocation": true
  },
  {
    "id": "UC-DOC-REVIEW-COVERAGE",
    "label": "Review Repository Navigation / Semantic Coverage",
    "description": "verify that Workspace/methodology capabilities, Application behavior and canonical owners are naturally discoverable through the correct semantic registry",
    "sources": [
      "planning/documentation/use-case-registry.md"
    ],
    "instruction": "Resolve UC-DOC-REVIEW-COVERAGE in the current canonical registry and follow its current owner route (repository-navigation-and-use-case-coverage-review-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Review Repository Navigation / Semantic Coverage target>",
    "directionId": "DIR-DOCUMENTATION",
    "manualInvocation": true
  },
  {
    "id": "UC-DOC-REVIEW-CURRENT-CONSISTENCY",
    "label": "Review Current Semantic Consistency",
    "description": "verify that current reusable/project owners, registries, templates and projections agree on selected meaning",
    "sources": [
      "planning/documentation/use-case-registry.md"
    ],
    "instruction": "Resolve UC-DOC-REVIEW-CURRENT-CONSISTENCY in the current canonical registry and follow its current owner route (current-semantic-consistency-review-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Review Current Semantic Consistency target>",
    "directionId": "DIR-DOCUMENTATION",
    "manualInvocation": true
  },
  {
    "id": "UC-DOC-REVIEW-DEPENDENCY-COVERAGE",
    "label": "Review Dependency Coverage",
    "description": "determine whether material semantic dependencies that must not rely on memory are represented/reviewable",
    "sources": [
      "planning/documentation/use-case-registry.md"
    ],
    "instruction": "Resolve UC-DOC-REVIEW-DEPENDENCY-COVERAGE in the current canonical registry and follow its current owner route (review-dependency-planning-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Review Dependency Coverage target>",
    "directionId": "DIR-DOCUMENTATION",
    "manualInvocation": true
  },
  {
    "id": "UC-DOC-REVIEW-DEPENDENTS",
    "label": "Review Semantic Dependents",
    "description": "review known consumers/dependents after material upstream change",
    "sources": [
      "planning/documentation/use-case-registry.md"
    ],
    "instruction": "Resolve UC-DOC-REVIEW-DEPENDENTS in the current canonical registry and follow its current owner route (review-dependency-planning-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Review Semantic Dependents target>",
    "directionId": "DIR-DOCUMENTATION",
    "manualInvocation": true
  },
  {
    "id": "UC-DOC-REVIEW-DIFF",
    "label": "Semantically Review A Repository ReviewDiff",
    "description": "determine whether an applied/proposed repository transition is correct, necessary and integrated",
    "sources": [
      "planning/documentation/use-case-registry.md"
    ],
    "instruction": "Resolve UC-DOC-REVIEW-DIFF in the current canonical registry and follow its current owner route (review-diff-review-workflow.md + affected current owners + shared Idea owners). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Semantically Review A Repository ReviewDiff target>",
    "directionId": "DIR-DOCUMENTATION",
    "manualInvocation": true,
    "commandId": "critical_review.apply"
  },
  {
    "id": "UC-DOC-REVIEW-EXAMPLES",
    "label": "Review Practical Example Coverage",
    "description": "decide whether reusable meaning needs a demonstration and where it belongs",
    "sources": [
      "planning/documentation/use-case-registry.md"
    ],
    "instruction": "Resolve UC-DOC-REVIEW-EXAMPLES in the current canonical registry and follow its current owner route (example-coverage-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Review Practical Example Coverage target>",
    "directionId": "DIR-DOCUMENTATION",
    "manualInvocation": true
  },
  {
    "id": "UC-DOC-REVISE-RETURNED-FILES",
    "label": "Reconcile User-Returned Files",
    "description": "reconcile externally edited/reviewed files into complete current artifacts",
    "sources": [
      "planning/documentation/use-case-registry.md"
    ],
    "instruction": "Resolve UC-DOC-REVISE-RETURNED-FILES in the current canonical registry and follow its current owner route (reviewable-agent-output-and-commands-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Reconcile User-Returned Files target>",
    "directionId": "DIR-DOCUMENTATION",
    "manualInvocation": true,
    "commandId": "returned_files.revise"
  },
  {
    "id": "UC-DOC-UPDATE",
    "label": "Perform An Approved Documentation Update",
    "description": "apply already selected documentation meaning to current owners",
    "sources": [
      "planning/documentation/use-case-registry.md"
    ],
    "instruction": "Resolve UC-DOC-UPDATE in the current canonical registry and follow its current owner route (documentation-update-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Perform An Approved Documentation Update target>",
    "directionId": "DIR-DOCUMENTATION",
    "manualInvocation": true
  },
  {
    "id": "UC-DW-DOC-REF",
    "label": "Repository Documentation Change And Reference Review",
    "description": "change repository documentation while preserving stable navigation/reference meaning and affected-use review.",
    "sources": [
      "planning/areas/documentation-workbench/use-case-registry.md"
    ],
    "instruction": "Resolve UC-DW-DOC-REF in the current canonical registry and follow its current owner route (repository-documentation-change-and-reference-review-workflow.md + [SCN-DW-DOC-REF](scenarios/SCN-DW-DOC-REF.md).). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Repository Documentation Change And Reference Review target>",
    "directionId": "DIR-DOCUMENTATION-WORKBENCH",
    "manualInvocation": true
  },
  {
    "id": "UC-DW-PLANNING-TO-REPOSITORY",
    "label": "Planning Meaning To Repository",
    "description": "turn selected current planning meaning into a reviewable repository realization/handoff without forcing a duplicate planning layer.",
    "sources": [
      "planning/areas/documentation-workbench/use-case-registry.md"
    ],
    "instruction": "Resolve UC-DW-PLANNING-TO-REPOSITORY in the current canonical registry and follow its current owner route (planning-meaning-to-repository-workflow.md + shared Idea/Workspace-planning owners + File Update owners only when that explicit route is selected + [SCN-DW-PLANNING-TO-REPOSITORY](scenarios/SCN-DW-PLANNING-TO-REPOSITORY.md).). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Planning Meaning To Repository target>",
    "directionId": "DIR-DOCUMENTATION-WORKBENCH",
    "manualInvocation": true
  },
  {
    "id": "UC-PLAN-APP-CONCEPT",
    "label": "Plan / Review Application Concept",
    "description": "evaluate whether/how own application behavior would simplify the real-world workflow before detailed application planning",
    "sources": [
      "planning/documentation/application-planning/use-case-registry.md"
    ],
    "instruction": "Resolve UC-PLAN-APP-CONCEPT in the current canonical registry and follow its current owner route (planning principles + whole-solution workflow + Concept template). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Plan / Review Application Concept target>",
    "directionId": "DIR-PLAN-SOLUTION",
    "manualInvocation": true
  },
  {
    "id": "UC-PLAN-APPLICATION",
    "label": "Establish Application Responsibility",
    "description": "establish the exact application boundary when the selected whole solution includes own application behavior or that responsibility is already confirmed",
    "sources": [
      "planning/documentation/application-planning/use-case-registry.md"
    ],
    "instruction": "Resolve UC-PLAN-APPLICATION in the current canonical registry and follow its current owner route (planning principles + whole-solution workflow). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Establish Application Responsibility target>",
    "directionId": "DIR-PLAN-SOLUTION",
    "manualInvocation": true
  },
  {
    "id": "UC-PLAN-ARCH-DECISION",
    "label": "Plan / Review One Material Architecture Decision",
    "description": "select/review one architecture choice by its correctness and effects on important current/future Workspace paths",
    "sources": [
      "planning/documentation/architecture-planning/use-case-registry.md"
    ],
    "instruction": "Resolve UC-PLAN-ARCH-DECISION in the current canonical registry and follow its current owner route (architecture-decision-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Plan / Review One Material Architecture Decision target>",
    "directionId": "DIR-PLAN-ARCHITECTURE",
    "manualInvocation": true
  },
  {
    "id": "UC-PLAN-ARCH-DISCOVER-WEUC",
    "label": "Discover Contextual Workspace Evolution Use Cases",
    "description": "discover bounded future Workspace-evolution work instances against a concrete current owner/change surface",
    "sources": [
      "planning/documentation/architecture-planning/use-case-registry.md"
    ],
    "instruction": "Resolve UC-PLAN-ARCH-DISCOVER-WEUC in the current canonical registry and follow its current owner route (workspace-evolution-use-case-discovery-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Discover Contextual Workspace Evolution Use Cases target>",
    "directionId": "DIR-PLAN-ARCHITECTURE",
    "manualInvocation": true
  },
  {
    "id": "UC-PLAN-ARCH-EVOLUTION",
    "label": "Plan / Review Workspace Architecture Evolution",
    "description": "select a coherent target architecture change when several related decisions/risks must move together",
    "sources": [
      "planning/documentation/architecture-planning/use-case-registry.md"
    ],
    "instruction": "Resolve UC-PLAN-ARCH-EVOLUTION in the current canonical registry and follow its current owner route (architecture-evolution-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Plan / Review Workspace Architecture Evolution target>",
    "directionId": "DIR-PLAN-ARCHITECTURE",
    "manualInvocation": true
  },
  {
    "id": "UC-PLAN-ARCH-PATH",
    "label": "Trace / Evaluate Architecture-Relevant Path",
    "description": "understand what must actually be understood, changed or executed for one material result and expose architecture cost/pressure",
    "sources": [
      "planning/documentation/architecture-planning/use-case-registry.md"
    ],
    "instruction": "Resolve UC-PLAN-ARCH-PATH in the current canonical registry and follow its current owner route (architecture-path-analysis-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Trace / Evaluate Architecture-Relevant Path target>",
    "directionId": "DIR-PLAN-ARCHITECTURE",
    "manualInvocation": true
  },
  {
    "id": "UC-PLAN-ARCH-PRESSURE",
    "label": "Establish / Review Workspace Change Pressure",
    "description": "determine where important current/future work creates architecture pressure and which generalized Change Axes are evidence-backed",
    "sources": [
      "planning/documentation/architecture-planning/use-case-registry.md"
    ],
    "instruction": "Resolve UC-PLAN-ARCH-PRESSURE in the current canonical registry and follow its current owner route (architecture-change-pressure-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Establish / Review Workspace Change Pressure target>",
    "directionId": "DIR-PLAN-ARCHITECTURE",
    "manualInvocation": true
  },
  {
    "id": "UC-PLAN-ARCH-STATE",
    "label": "Understand / Review Workspace Architecture State",
    "description": "establish an inspectable current architecture baseline and identify material architecture/maintainability concerns relative to important Workspace work",
    "sources": [
      "planning/documentation/architecture-planning/use-case-registry.md"
    ],
    "instruction": "Resolve UC-PLAN-ARCH-STATE in the current canonical registry and follow its current owner route (architecture-state-review-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Understand / Review Workspace Architecture State target>",
    "directionId": "DIR-PLAN-ARCHITECTURE",
    "manualInvocation": true
  },
  {
    "id": "UC-PLAN-ARCH-WORKSPACE-USES",
    "label": "Discover / Review Workspace Use Cases",
    "description": "establish the architecture-relevant current-work picture from canonical Workspace UCs plus explicit candidate useful results without taking canonical UC lifecycle authority",
    "sources": [
      "planning/documentation/architecture-planning/use-case-registry.md"
    ],
    "instruction": "Resolve UC-PLAN-ARCH-WORKSPACE-USES in the current canonical registry and follow its current owner route (workspace-use-case-discovery-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Discover / Review Workspace Use Cases target>",
    "directionId": "DIR-PLAN-ARCHITECTURE",
    "manualInvocation": true
  },
  {
    "id": "UC-PLAN-COLLECT-IDEAS",
    "label": "Collect And Review Ideas From Selected Source",
    "description": "extract/review answer-seeking Ideas while preserving non-Idea context",
    "sources": [
      "planning/documentation/application-planning/use-case-registry.md"
    ],
    "instruction": "Resolve UC-PLAN-COLLECT-IDEAS in the current canonical registry and follow its current owner route (shared Idea owners). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Collect And Review Ideas From Selected Source target>",
    "directionId": "DIR-PLAN-SOLUTION",
    "manualInvocation": true,
    "commandId": "ideas.collect"
  },
  {
    "id": "UC-PLAN-CONSISTENCY",
    "label": "Review Cross-Scenario / Screen / Requirement / Domain / Slice Consistency",
    "description": "detect contradictions/change impact across current behavioral/spatial/requirement/conceptual/delivery owners",
    "sources": [
      "planning/documentation/application-planning/use-case-registry.md"
    ],
    "instruction": "Resolve UC-PLAN-CONSISTENCY in the current canonical registry and follow its current owner route (complete selected owners + detailed-planning contract). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Review Cross-Scenario / Screen / Requirement / Domain / Slice Consistency target>",
    "directionId": "DIR-PLAN-SOLUTION",
    "manualInvocation": true
  },
  {
    "id": "UC-PLAN-DOMAIN",
    "label": "Plan / Review Domain",
    "description": "compare/refine/select/review the simplest explicit conceptual language/lifecycle/rules/boundaries that supports current meaning and cheap justified evolution",
    "sources": [
      "planning/documentation/application-planning/use-case-registry.md"
    ],
    "instruction": "Resolve UC-PLAN-DOMAIN in the current canonical registry and follow its current owner route (domain-planning-workflow.md + Domain template). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Plan / Review Domain target>",
    "directionId": "DIR-PLAN-SOLUTION",
    "manualInvocation": true
  },
  {
    "id": "UC-PLAN-DOMAIN-DISCOVERY",
    "label": "Discover Domain Evidence / Candidates",
    "description": "discover evidence-backed concepts/identity/lifecycle/rules/invariants/policies/consistency candidates before selecting a current Domain model",
    "sources": [
      "planning/documentation/application-planning/use-case-registry.md"
    ],
    "instruction": "Resolve UC-PLAN-DOMAIN-DISCOVERY in the current canonical registry and follow its current owner route (domain-discovery-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Discover Domain Evidence / Candidates target>",
    "directionId": "DIR-PLAN-SOLUTION",
    "manualInvocation": true
  },
  {
    "id": "UC-PLAN-PROTOTYPE",
    "label": "Prototype Application Experience / Workflow",
    "description": "cheaply test/refine provisional user interaction, Scenario boundaries, Screens and Requirements before canonical detailed behavior/spatial ownership",
    "sources": [
      "planning/documentation/application-planning/use-case-registry.md"
    ],
    "instruction": "Resolve UC-PLAN-PROTOTYPE in the current canonical registry and follow its current owner route (prototype-planning-workflow.md + Prototype Plan/Result templates). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Prototype Application Experience / Workflow target>",
    "directionId": "DIR-PLAN-SOLUTION",
    "manualInvocation": true
  },
  {
    "id": "UC-PLAN-REALITY",
    "label": "Understand Current Workflow And Reality",
    "description": "establish checked present reality before solution selection when it matters",
    "sources": [
      "planning/documentation/application-planning/use-case-registry.md"
    ],
    "instruction": "Resolve UC-PLAN-REALITY in the current canonical registry and follow its current owner route (solution-and-scenario-planning-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Understand Current Workflow And Reality target>",
    "directionId": "DIR-PLAN-SOLUTION",
    "manualInvocation": true
  },
  {
    "id": "UC-PLAN-REALIZATION",
    "label": "Review / Compare High-Level Application Realization",
    "description": "provide bounded realization evidence for representative selected meaning or serious candidate Domain variants when technical feasibility/cost/performance/consistency can materially affect selection",
    "sources": [
      "planning/documentation/application-planning/use-case-registry.md"
    ],
    "instruction": "Resolve this exact canonical Use-Case entry and follow application-realization-workflow.md. Review or compare representative realization paths when material, including pre-Domain comparative evidence, without letting implementation convenience or this projection become Domain authority.",
    "target": "<Review / Compare High-Level Application Realization target>",
    "directionId": "DIR-PLAN-SOLUTION",
    "manualInvocation": true
  },
  {
    "id": "UC-PLAN-RESEARCH",
    "label": "Research Existing Solutions / Alternatives",
    "description": "reduce a material evidence gap affecting whole-solution choice",
    "sources": [
      "planning/documentation/application-planning/use-case-registry.md"
    ],
    "instruction": "Resolve UC-PLAN-RESEARCH in the current canonical registry and follow its current owner route (selected solution/current owner + checked sources). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Research Existing Solutions / Alternatives target>",
    "directionId": "DIR-PLAN-SOLUTION",
    "manualInvocation": true
  },
  {
    "id": "UC-PLAN-SCENARIO",
    "label": "Draft / Review Detailed Scenario",
    "description": "own detailed observable behavior and local/shared supporting planning for one meaningful current Scenario",
    "sources": [
      "planning/documentation/application-planning/use-case-registry.md"
    ],
    "instruction": "Resolve UC-PLAN-SCENARIO in the current canonical registry and follow its current owner route (detailed-planning/README.md + Scenario template). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Draft / Review Detailed Scenario target>",
    "directionId": "DIR-PLAN-SOLUTION",
    "manualInvocation": true
  },
  {
    "id": "UC-PLAN-SCENARIO-DISCOVERY",
    "label": "Discover Application Scenarios",
    "description": "identify independently meaningful user-visible Need/result behavior boundaries for the selected Application responsibility",
    "sources": [
      "planning/documentation/application-planning/use-case-registry.md"
    ],
    "instruction": "Resolve UC-PLAN-SCENARIO-DISCOVERY in the current canonical registry and follow its current owner route (planning workflow + prototype workflow when used). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Discover Application Scenarios target>",
    "directionId": "DIR-PLAN-SOLUTION",
    "manualInvocation": true
  },
  {
    "id": "UC-PLAN-SLICE",
    "label": "Plan / Review One Implementation Slice",
    "description": "plan one selected separately deliverable/checkable implementation increment",
    "sources": [
      "planning/documentation/application-planning/use-case-registry.md"
    ],
    "instruction": "Resolve UC-PLAN-SLICE in the current canonical registry and follow its current owner route (slice-planning-workflow.md + Implementation Slice template). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Plan / Review One Implementation Slice target>",
    "directionId": "DIR-PLAN-SOLUTION",
    "manualInvocation": true
  },
  {
    "id": "UC-PLAN-SLICE-STRATEGY",
    "label": "Plan / Review Slice Strategy",
    "description": "select implementation decomposition/order into useful vertical separately deliverable/checkable increments",
    "sources": [
      "planning/documentation/application-planning/use-case-registry.md"
    ],
    "instruction": "Resolve UC-PLAN-SLICE-STRATEGY in the current canonical registry and follow its current owner route (slice-planning-workflow.md + Slice Strategy template). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Plan / Review Slice Strategy target>",
    "directionId": "DIR-PLAN-SOLUTION",
    "manualInvocation": true
  },
  {
    "id": "UC-PLAN-SOLUTION",
    "label": "Plan / Review Whole Solution Or Workflow",
    "description": "select/evaluate the best integrated whole answer before assuming custom application work",
    "sources": [
      "planning/documentation/application-planning/use-case-registry.md"
    ],
    "instruction": "Resolve UC-PLAN-SOLUTION in the current canonical registry and follow its current owner route (solution-and-scenario-planning-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Plan / Review Whole Solution Or Workflow target>",
    "directionId": "DIR-PLAN-SOLUTION",
    "manualInvocation": true
  },
  {
    "id": "UC-PLAN-TEST-COVERAGE",
    "label": "Review Current Test Coverage / Evidence",
    "description": "check whether actual current tests/evidence really prove current selected meaning",
    "sources": [
      "planning/documentation/testing-planning/use-case-registry.md"
    ],
    "instruction": "Resolve UC-PLAN-TEST-COVERAGE in the current canonical registry and follow its current owner route (test-coverage-review-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Review Current Test Coverage / Evidence target>",
    "directionId": "DIR-PLAN-TESTING",
    "manualInvocation": true
  },
  {
    "id": "UC-PLAN-TEST-DESIGN",
    "label": "Plan / Review Verification For Selected Behavior",
    "description": "decide how selected Scenario/Requirement/Domain/Slice behavior will be convincingly proved",
    "sources": [
      "planning/documentation/testing-planning/use-case-registry.md"
    ],
    "instruction": "Resolve UC-PLAN-TEST-DESIGN in the current canonical registry and follow its current owner route (test-design-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Plan / Review Verification For Selected Behavior target>",
    "directionId": "DIR-PLAN-TESTING",
    "manualInvocation": true
  },
  {
    "id": "UC-PLAN-TEST-PLAN",
    "label": "Plan Practical Testing / Acceptance",
    "description": "assemble a practical operated proof plan for one meaningful application/change result across selected behaviors",
    "sources": [
      "planning/documentation/testing-planning/use-case-registry.md"
    ],
    "instruction": "Resolve UC-PLAN-TEST-PLAN in the current canonical registry and follow its current owner route (practical-testing-plan-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Plan Practical Testing / Acceptance target>",
    "directionId": "DIR-PLAN-TESTING",
    "manualInvocation": true
  },
  {
    "id": "UC-PLAN-TEST-STRATEGY",
    "label": "Establish / Review Testing Strategy",
    "description": "establish shared/cross-Slice proof responsibilities and avoid duplicated/missing coverage",
    "sources": [
      "planning/documentation/testing-planning/use-case-registry.md"
    ],
    "instruction": "Resolve UC-PLAN-TEST-STRATEGY in the current canonical registry and follow its current owner route (testing-strategy-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Establish / Review Testing Strategy target>",
    "directionId": "DIR-PLAN-TESTING",
    "manualInvocation": true
  },
  {
    "id": "UC-PLAN-WORKSPACE-CHANGE-UC",
    "label": "Review / Change Workspace Use Case",
    "description": "integrate all currently selected change meaning for one existing Workspace UC into one coherent Target UC and realization plan.",
    "sources": [
      "planning/documentation/workspace-planning/use-case-registry.md"
    ],
    "instruction": "Resolve UC-PLAN-WORKSPACE-CHANGE-UC in the current canonical registry and follow its current owner route ([review-change-workspace-use-case-workflow.md](review-change-workspace-use-case-workflow.md) + [workspace-planning-principles-and-terminology.md](workspace-planning-principles-and-terminology.md)). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Review / Change Workspace Use Case target>",
    "directionId": "DIR-PLAN-WORKSPACE",
    "manualInvocation": true
  },
  {
    "id": "UC-PLAN-WORKSPACE-ESTABLISH-UC",
    "label": "Establish Workspace Use Case",
    "description": "determine whether a useful Workspace result needs a new Use Case and, when justified, establish one coherent target UC contract and owner route.",
    "sources": [
      "planning/documentation/workspace-planning/use-case-registry.md"
    ],
    "instruction": "Resolve UC-PLAN-WORKSPACE-ESTABLISH-UC in the current canonical registry and follow its current owner route ([establish-workspace-use-case-workflow.md](establish-workspace-use-case-workflow.md) + [workspace-planning-principles-and-terminology.md](workspace-planning-principles-and-terminology.md)). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Establish Workspace Use Case target>",
    "directionId": "DIR-PLAN-WORKSPACE",
    "manualInvocation": true
  },
  {
    "id": "UC-PLAN-WORKSPACE-REVIEW-TOPOLOGY",
    "label": "Review Workspace Use-Case Topology",
    "description": "produce a coherent graph/boundary model when several Workspace Use Cases must be reviewed together.",
    "sources": [
      "planning/documentation/workspace-planning/use-case-registry.md"
    ],
    "instruction": "Resolve UC-PLAN-WORKSPACE-REVIEW-TOPOLOGY in the current canonical registry and follow its current owner route ([review-workspace-use-case-topology-workflow.md](review-workspace-use-case-topology-workflow.md) + [workspace-planning-principles-and-terminology.md](workspace-planning-principles-and-terminology.md)). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Review Workspace Use-Case Topology target>",
    "directionId": "DIR-PLAN-WORKSPACE",
    "manualInvocation": true
  },
  {
    "id": "UC-PR-END-SESSION",
    "label": "End Active Planning Session",
    "description": "close the active operational planning session/day consistently and expose the resulting next state.",
    "sources": [
      "planning/areas/planning-system/use-case-registry.md"
    ],
    "instruction": "Resolve UC-PR-END-SESSION in the current canonical registry and follow its current owner route ([end-session-command-workflow.md](end-session-command-workflow.md) + [SCN-PR-END-SESSION](scenarios/SCN-PR-END-SESSION.md).). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<End Active Planning Session target>",
    "directionId": "DIR-PLANNING-RUNTIME",
    "manualInvocation": true,
    "commandId": "session.end"
  },
  {
    "id": "UC-REPO-AUDIT-REVIEW",
    "label": "Audit Review Coverage And Quality",
    "description": "report what was actually reviewed, how sufficient it was and what a repeat review added",
    "sources": [
      "planning/use-case-registry.md"
    ],
    "instruction": "Resolve UC-REPO-AUDIT-REVIEW in the current canonical registry and follow its current owner route (documentation/review-audit-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Audit Review Coverage And Quality target>",
    "directionId": "DIR-REPOSITORY",
    "manualInvocation": true
  },
  {
    "id": "UC-REPO-CRITICAL-REVIEW",
    "label": "Critically Review A Claim / Plan / Diff",
    "description": "truth-seek against a target instead of accepting it as given",
    "sources": [
      "planning/use-case-registry.md"
    ],
    "instruction": "Resolve UC-REPO-CRITICAL-REVIEW in the current canonical registry and follow its current owner route (shared Idea owners + selected target/current owners + documentation/review-diff-review-workflow.md when target is ReviewDiff). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Critically Review A Claim / Plan / Diff target>",
    "directionId": "DIR-REPOSITORY",
    "manualInvocation": true,
    "commandId": "critical_review.apply"
  },
  {
    "id": "UC-REPO-CURRENT-STATE",
    "label": "Report Current Repository / Planning State",
    "description": "report checked current state without inventing certainty",
    "sources": [
      "planning/use-case-registry.md"
    ],
    "instruction": "Resolve UC-REPO-CURRENT-STATE in the current canonical registry and follow its current owner route (this registry → documentation/status-reconciliation-workflow.md → selected current owners). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Report Current Repository / Planning State target>",
    "directionId": "DIR-REPOSITORY",
    "manualInvocation": true,
    "commandId": "current_state.report"
  },
  {
    "id": "UC-REPO-DEFINE-PARALLEL-SCOPES",
    "label": "Define / Maintain Fixed Parallel-Work Scopes",
    "description": "establish stable repository areas that can be worked independently in parallel",
    "sources": [
      "planning/use-case-registry.md"
    ],
    "instruction": "Resolve UC-REPO-DEFINE-PARALLEL-SCOPES in the current canonical registry and follow its current owner route (../parallel-work-scope-registry.md + documentation/parallel-work-scope-and-action-log-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Define / Maintain Fixed Parallel-Work Scopes target>",
    "directionId": "DIR-REPOSITORY",
    "manualInvocation": true
  },
  {
    "id": "UC-REPO-ORIENT",
    "label": "Orient In Repository And Resolve Work Route",
    "description": "find the correct semantic route before material work",
    "sources": [
      "planning/use-case-registry.md"
    ],
    "instruction": "Resolve UC-REPO-ORIENT in the current canonical registry and follow its current owner route (README.md → planning/README.md → registries). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Orient In Repository And Resolve Work Route target>",
    "directionId": "DIR-REPOSITORY",
    "manualInvocation": true,
    "commandId": "governance.development"
  },
  {
    "id": "UC-REPO-PARALLEL-WORK",
    "label": "Work In Registered Parallel Scope(s)",
    "description": "run one workstream using already registered independent scope boundaries",
    "sources": [
      "planning/use-case-registry.md"
    ],
    "instruction": "Resolve UC-REPO-PARALLEL-WORK in the current canonical registry and follow its current owner route (../parallel-work-scope-registry.md + documentation/parallel-work-scope-and-action-log-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Work In Registered Parallel Scope(s) target>",
    "directionId": "DIR-REPOSITORY",
    "manualInvocation": true,
    "commandId": "parallel_workspace.start"
  },
  {
    "id": "UC-REPO-PLAN-NEXT",
    "label": "Plan The Next Concrete Step",
    "description": "select one justified next action from current context",
    "sources": [
      "planning/use-case-registry.md"
    ],
    "instruction": "Resolve UC-REPO-PLAN-NEXT in the current canonical registry and follow its current owner route (selected Direction/Use Case/current owners). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Plan The Next Concrete Step target>",
    "directionId": "DIR-REPOSITORY",
    "manualInvocation": true,
    "commandId": "plan.now"
  },
  {
    "id": "UC-REPO-REFINE-CURRENT-PLAN",
    "label": "Refine The Current Plan",
    "description": "integrate material clarification/change into one accumulating current plan through the selected semantic owner",
    "sources": [
      "planning/use-case-registry.md"
    ],
    "instruction": "Resolve UC-REPO-REFINE-CURRENT-PLAN in the current canonical registry and follow its current owner route (documentation/progressive-plan-refinement-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Refine The Current Plan target>",
    "directionId": "DIR-REPOSITORY",
    "manualInvocation": true
  },
  {
    "id": "UC-REPO-REVIEW-PLANNING-FINDINGS",
    "label": "Review Planning Findings / Q/R/P Completeness",
    "description": "detect/deduplicate material unresolved deltas attached to current semantic owners",
    "sources": [
      "planning/use-case-registry.md"
    ],
    "instruction": "Resolve UC-REPO-REVIEW-PLANNING-FINDINGS in the current canonical registry and follow its current owner route (documentation/planning-findings-review-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Review Planning Findings / Q/R/P Completeness target>",
    "directionId": "DIR-REPOSITORY",
    "manualInvocation": true
  },
  {
    "id": "UC-REPO-USE-ARCHIVE-SOURCE",
    "label": "Use An Explicit Archive As Read Source",
    "description": "establish a bounded readable source snapshot",
    "sources": [
      "planning/use-case-registry.md"
    ],
    "instruction": "Resolve UC-REPO-USE-ARCHIVE-SOURCE in the current canonical registry and follow its current owner route (selected archive + applicable owners). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Use An Explicit Archive As Read Source target>",
    "directionId": "DIR-REPOSITORY",
    "manualInvocation": true,
    "commandId": "archive_source.use"
  },
  {
    "id": "UC-RPKG-APPLY",
    "label": "Apply Verified Replacement Package",
    "description": "Apply Verified Replacement Package",
    "sources": [
      "planning/documentation/tools/replacement-package-app/USE-CASE-REGISTRY.md"
    ],
    "instruction": "Resolve UC-RPKG-APPLY in the current canonical registry and follow its current owner route. Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Apply Verified Replacement Package target>",
    "directionId": "",
    "manualInvocation": true
  },
  {
    "id": "UC-RPKG-ATTACH-SNAPSHOT",
    "label": "Attach Repository Snapshot to ChatGPT",
    "description": "Attach Repository Snapshot to ChatGPT",
    "sources": [
      "planning/documentation/tools/replacement-package-app/USE-CASE-REGISTRY.md"
    ],
    "instruction": "Resolve UC-RPKG-ATTACH-SNAPSHOT in the current canonical registry and follow its current owner route. Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Attach Repository Snapshot to ChatGPT target>",
    "directionId": "",
    "manualInvocation": true
  },
  {
    "id": "UC-RPKG-DELIVER-REVIEW",
    "label": "Deliver Current ReviewDiff to ChatGPT",
    "description": "Deliver Current ReviewDiff to ChatGPT",
    "sources": [
      "planning/documentation/tools/replacement-package-app/USE-CASE-REGISTRY.md"
    ],
    "instruction": "Resolve UC-RPKG-DELIVER-REVIEW in the current canonical registry and follow its current owner route. Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Deliver Current ReviewDiff to ChatGPT target>",
    "directionId": "",
    "manualInvocation": true
  },
  {
    "id": "UC-RPKG-EXPORT-REPOSITORY",
    "label": "Export Repository Snapshot ZIP",
    "description": "Export Repository Snapshot ZIP",
    "sources": [
      "planning/documentation/tools/replacement-package-app/USE-CASE-REGISTRY.md"
    ],
    "instruction": "Resolve UC-RPKG-EXPORT-REPOSITORY in the current canonical registry and follow its current owner route. Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Export Repository Snapshot ZIP target>",
    "directionId": "",
    "manualInvocation": true
  },
  {
    "id": "UC-RPKG-FINALIZE",
    "label": "Finalize Current ChangeSet",
    "description": "Finalize Current ChangeSet",
    "sources": [
      "planning/documentation/tools/replacement-package-app/USE-CASE-REGISTRY.md"
    ],
    "instruction": "Resolve UC-RPKG-FINALIZE in the current canonical registry and follow its current owner route. Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Finalize Current ChangeSet target>",
    "directionId": "",
    "manualInvocation": true
  },
  {
    "id": "UC-RPKG-REVIEW",
    "label": "Inspect Current ChangeSet Review State",
    "description": "Inspect Current ChangeSet Review State",
    "sources": [
      "planning/documentation/tools/replacement-package-app/USE-CASE-REGISTRY.md"
    ],
    "instruction": "Resolve UC-RPKG-REVIEW in the current canonical registry and follow its current owner route. Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
    "target": "<Inspect Current ChangeSet Review State target>",
    "directionId": "",
    "manualInvocation": true
  }
];
  const api=globalThis.ObsPlanningHelper;if(!api||typeof api.startPlanningHelper!=='function')throw new Error('OBS Planning Helper runtime was not built correctly.');api.startPlanningHelper({bundledCommands:commands,bundledUseCases:useCases}).catch((error)=>console.error('[OBS Planning Helper startup]',error));
})();
