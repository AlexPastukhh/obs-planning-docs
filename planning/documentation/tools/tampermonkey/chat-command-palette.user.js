// ==UserScript==
// @name         Reusable Chat Planning Helper
// @namespace    https://github.com/AlexPastukhh/obs/reusable-docs
// @version      0.39.5-repository-command-registry
// @description  RAM-first OBS Planning Helper with semantic Commands, canonical Scenarios, prompts and explicit repository actions.
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
// Runtime source: planning/documentation/tools/tampermonkey/chat-command-palette/src/**
// GitHub command authority: planning/commands/*.command.md
// GitHub Use-Case projection root: planning/documentation/use-case-registry-map.md -> mapped current scoped methodology Use-Case registries only.
// seed/use-cases.json is the build-verified GitHub-backed Use-Case projection used for explicit Hard Reload.
// GitHub UI-order source: planning/documentation/tools/tampermonkey/chat-command-palette/catalog-order.json
// Local snapshot is the working cache; current command/semantic/scenario catalogs are not embedded in this userscript.
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
    'userTarget', 'palette', 'refinements', 'helperPresentation', 'methodologyBinding'
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

  function normalizeHelperNavigation(raw, field) {
    assert(raw && typeof raw === 'object' && !Array.isArray(raw), `${field} must be an object.`);
    const known = new Set(['viewId','viewLabel','viewOrder','sectionId','sectionLabel','sectionOrder','itemOrder','kindLabel','badges','parentId','related']);
    for (const key of Object.keys(raw)) assert(known.has(key), `Unknown ${field} field: ${key}`);
    const integer=(value,name)=>{const n=Number(value);assert(Number.isInteger(n)&&n>=0,`${name} must be a non-negative integer.`);return n;};
    const result={
      viewId: singleLine(raw.viewId, `${field}.viewId`),
      viewLabel: singleLine(raw.viewLabel, `${field}.viewLabel`),
      viewOrder: integer(raw.viewOrder??0, `${field}.viewOrder`),
      sectionId: singleLine(raw.sectionId, `${field}.sectionId`),
      sectionLabel: singleLine(raw.sectionLabel, `${field}.sectionLabel`),
      sectionOrder: integer(raw.sectionOrder, `${field}.sectionOrder`),
      itemOrder: integer(raw.itemOrder, `${field}.itemOrder`),
      kindLabel: singleLine(raw.kindLabel, `${field}.kindLabel`),
      badges: raw.badges==null?[]:stringArray(raw.badges, `${field}.badges`)
    };
    if(raw.parentId!=null)result.parentId=validateId(raw.parentId,`${field}.parentId`);
    if(raw.related!=null){assert(typeof raw.related==='boolean',`${field}.related must be boolean.`);result.related=raw.related;}
    return result;
  }

  function normalizeMethodologyBinding(raw) {
    if(raw==null)return null;
    assert(raw&&typeof raw==='object'&&!Array.isArray(raw),'methodologyBinding must be an object.');
    const known=new Set(['methodologyRuntime','profile','surfaceKind','targetModuleId','lensId','parentSurface','hostTargetPolicy']);
    for(const key of Object.keys(raw))assert(known.has(key),`Unknown methodologyBinding field: ${key}`);
    const runtime=singleLine(raw.methodologyRuntime,'methodologyBinding.methodologyRuntime');
    assert(runtime==='IDTSPE','methodologyBinding.methodologyRuntime must be IDTSPE.');
    const kinds=new Set(['BOOTSTRAP','WORK_MODE','TARGET_MODULE','TARGET_MODULE_FOCUSED','LENS','ORCHESTRATION','VALIDATOR']);
    const policies=new Set(['CREATE_OR_REUSE_TARGET','RESOLVE_OR_REUSE_TARGET','NONE']);
    const surfaceKind=singleLine(raw.surfaceKind,'methodologyBinding.surfaceKind');assert(kinds.has(surfaceKind),'methodologyBinding.surfaceKind is invalid.');
    const hostTargetPolicy=singleLine(raw.hostTargetPolicy,'methodologyBinding.hostTargetPolicy');assert(policies.has(hostTargetPolicy),'methodologyBinding.hostTargetPolicy is invalid.');
    const profile=raw.profile==null?null:singleLine(raw.profile,'methodologyBinding.profile');
    const targetModuleId=raw.targetModuleId==null?null:singleLine(raw.targetModuleId,'methodologyBinding.targetModuleId');
    if(targetModuleId!=null)assert(/^TM-[A-Z0-9-]+$/.test(targetModuleId),'methodologyBinding.targetModuleId must be TM-*.');
    const lensId=raw.lensId==null?null:singleLine(raw.lensId,'methodologyBinding.lensId');
    if(lensId!=null)assert(/^LENS-[A-Z0-9-]+$/.test(lensId),'methodologyBinding.lensId must be LENS-*.');
    const parentSurface=raw.parentSurface==null?null:validateId(raw.parentSurface,'methodologyBinding.parentSurface');
    if(surfaceKind==='TARGET_MODULE'||surfaceKind==='TARGET_MODULE_FOCUSED')assert(targetModuleId,'Target Module surfaces require methodologyBinding.targetModuleId.');
    if(surfaceKind==='LENS')assert(lensId,'Lens surfaces require methodologyBinding.lensId.');
    return{methodologyRuntime:runtime,profile,surfaceKind,targetModuleId,lensId,parentSurface,hostTargetPolicy};
  }

  function normalizeHelperPresentation(raw) {
    if (raw == null) return null;
    assert(raw && typeof raw === 'object' && !Array.isArray(raw), 'helperPresentation must be an object.');
    const known = new Set(['whenToUse', 'whatYouGet', 'navigation', 'relatedNavigation']);
    for (const key of Object.keys(raw)) assert(known.has(key), `Unknown helperPresentation field: ${key}`);
    const result={
      whenToUse: singleLine(raw.whenToUse, 'helperPresentation.whenToUse'),
      whatYouGet: singleLine(raw.whatYouGet, 'helperPresentation.whatYouGet')
    };
    if(raw.navigation!=null)result.navigation=normalizeHelperNavigation(raw.navigation,'helperPresentation.navigation');
    if(raw.relatedNavigation!=null){assert(Array.isArray(raw.relatedNavigation),'helperPresentation.relatedNavigation must be an array.');result.relatedNavigation=raw.relatedNavigation.map((item,index)=>normalizeHelperNavigation(item,`helperPresentation.relatedNavigation[${index}]`));}
    return result;
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
      helperPresentation: normalizeHelperPresentation(raw.helperPresentation),
      methodologyBinding: normalizeMethodologyBinding(raw.methodologyBinding),
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
      ...(normalized.helperPresentation ? { helperPresentation: normalized.helperPresentation } : {}),
      ...(normalized.methodologyBinding ? { methodologyBinding: normalized.methodologyBinding } : {}),
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
      'context:',
      `  ${definition.activeContextBehavior}`,
      '',
      'result:',
      `  ${definition.expectedOutput}`,
      '',
      'essence:',
      `  ${definition.meaning}`,
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
  function buildUseCaseInvocationEntry(genericDefinition,useCase){return{id:useCaseInvocationCommandId(useCase.id),entityType:'use-case-invocation-command',useCaseId:useCase.id,label:useCase.label,command:useCase.label,englishName:`invoke use case · ${useCase.label}`,description:`Manual invocation of ${useCase.id} through its current canonical owner route`,adaptiveBody:buildUseCaseInvocationBody(genericDefinition,useCase,MODE.ADAPTIVE),fullBody:buildUseCaseInvocationBody(genericDefinition,useCase,MODE.FULL),refinementBodies:[],stateLabel:'Generated UC invocation · canonical registry remains authority'};}

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
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  root.ObsPlanningHelper=Object.assign(root.ObsPlanningHelper||{},api);
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';

  // Use Cases/Target Modules/Lenses are semantic classifications inside the Commands
  // surface. USE_CASES remains exported only as a compatibility symbol for older caches/tests.
  const SURFACES=Object.freeze({COMMANDS:'Commands',SCENARIOS:'Scenarios',PROMPTS:'Prompts',USE_CASES:'Use Cases'});
  const MODE=Object.freeze({ADAPTIVE:'adaptive',FULL:'full'});
  const SEMANTIC_KINDS=Object.freeze({USE_CASE:'USE_CASE',TARGET_MODULE:'TARGET_MODULE',LENS:'LENS'});
  const PROVENANCE=Object.freeze({DIRECT:'DIRECT CURRENT',GENERIC:'GENERIC CURRENT',GENERATED:'GENERATED'});

  function safeLine(value,label){const text=String(value==null?'':value).trim();if(!text)throw new TypeError(`${label} is required.`);if(/[\r\n\u0000-\u001f\u007f]/.test(text))throw new TypeError(`${label} must be one safe line.`);return text;}
  function safePath(value,label){const text=safeLine(value,label).replace(/\\/g,'/');if(text.startsWith('/')||text.includes('://')||text.split('/').some((part)=>!part||part==='.'||part==='..'))throw new TypeError(`${label} must be a safe repository-relative path.`);return text;}
  function uniqueStrings(values,reader){const out=[];for(const raw of Array.isArray(values)?values:[]){const value=reader(raw);if(!out.includes(value))out.push(value);}return out;}

  function normalizeUseCaseDefinition(value){
    if(!value||typeof value!=='object')throw new TypeError('Use-Case definition must be an object.');
    const id=safeLine(value.id,'Use-Case id');if(!/^UC-[A-Z0-9-]+$/.test(id))throw new TypeError(`Invalid Use-Case id: ${id}`);
    const label=safeLine(value.label,`${id} label`),description=String(value.description||label).trim();
    const sources=uniqueStrings(value.sources,(v)=>safePath(v,`${id} source`));if(!sources.length)throw new TypeError(`Use-Case source registry is required: ${id}`);
    const instruction=String(value.instruction||'').trim();if(!instruction)throw new TypeError(`Use-Case instruction is required: ${id}`);
    const target=String(value.target||`<${label} target>`).trim(),commandId=String(value.commandId||'').trim();
    const result={id,label,description,sources,instruction,target,manualInvocation:value.manualInvocation!==false,trigger:String(value.trigger||'').trim(),result:String(value.result||'').trim()};if(commandId)result.commandId=commandId;return result;
  }
  function normalizeUseCaseDefinitions(values){const definitions=(Array.isArray(values)?values:[]).map(normalizeUseCaseDefinition);const ids=definitions.map((entry)=>entry.id);if(new Set(ids).size!==ids.length)throw new TypeError('Duplicate Use-Case ids in local/repository catalog.');return definitions;}

  function normalizeSemanticComponent(value){
    if(!value||typeof value!=='object')throw new TypeError('Semantic component must be an object.');
    const id=safeLine(value.id,'Semantic component id'),kind=safeLine(value.kind,`${id} kind`),scope=safeLine(value.scope||'Core',`${id} scope`);
    if(!Object.values(SEMANTIC_KINDS).includes(kind))throw new TypeError(`Unsupported semantic component kind: ${kind}`);
    if(kind===SEMANTIC_KINDS.USE_CASE&&!/^UC-[A-Z0-9-]+$/.test(id))throw new TypeError(`Invalid Use-Case component id: ${id}`);
    if(kind===SEMANTIC_KINDS.TARGET_MODULE&&!/^TM-[A-Z0-9-]+$/.test(id))throw new TypeError(`Invalid Target Module component id: ${id}`);
    if(kind===SEMANTIC_KINDS.LENS&&!/^LENS-[A-Z0-9-]+$/.test(id))throw new TypeError(`Invalid Lens component id: ${id}`);
    const label=safeLine(value.label||id,`${id} label`),actionLabel=safeLine(value.actionLabel||label,`${id} actionLabel`),description=String(value.description||label).trim();
    const sources=uniqueStrings(value.sources,(v)=>safePath(v,`${id} source`));if(!sources.length)throw new TypeError(`Semantic component sources are required: ${id}`);
    const aliases=uniqueStrings(value.aliases||[],(v)=>safeLine(v,`${id} alias`));
    const context=String(value.context||'').trim(),result=String(value.result||'').trim(),essence=String(value.essence||description||label).trim();
    return{id,kind,scope,label,actionLabel,description,context,result,essence,sources,aliases,commandId:String(value.commandId||'').trim(),invocation:String(value.invocation||'').trim(),target:String(value.target||`<${label} target>`).trim()};
  }
  function normalizeSemanticComponents(values){const out=(Array.isArray(values)?values:[]).map(normalizeSemanticComponent),ids=out.map((x)=>x.id);if(new Set(ids).size!==ids.length)throw new TypeError('Duplicate semantic component ids.');return out;}

  function normalizeScenario(value){
    if(!value||typeof value!=='object')throw new TypeError('Scenario must be an object.');
    const id=safeLine(value.id,'Scenario id');if(!/^SCN-[A-Z0-9-]+$/.test(id))throw new TypeError(`Invalid Scenario id: ${id}`);
    const type=safeLine(value.type||'FOCUSED',`${id} type`),title=safeLine(value.title,`${id} title`),entryRoute=String(value.entryRoute||'').trim(),assumptions=(Array.isArray(value.assumptions)?value.assumptions:[]).map((x)=>String(x||'').trim()).filter(Boolean);
    const steps=(Array.isArray(value.steps)?value.steps:[]).map((step)=>{const sid=safeLine(step.id,`${id} step id`),stitle=safeLine(step.title,`${sid} title`),semanticRefs=uniqueStrings(step.semanticRefs||[],(x)=>safeLine(x,`${sid} semantic ref`)),canonicalText=String(step.canonicalText||'').trim();return{id:sid,title:stitle,semanticRefs,canonicalText};});
    if(!steps.length)throw new TypeError(`Scenario must contain steps: ${id}`);return{id,type,title,entryRoute,assumptions,steps,canonicalIntro:String(value.canonicalIntro||'').trim(),source:String(value.source||'').trim()};
  }
  function normalizeScenarios(values){const out=(Array.isArray(values)?values:[]).map(normalizeScenario),ids=out.map((x)=>x.id);if(new Set(ids).size!==ids.length)throw new TypeError('Duplicate scenario ids.');return out;}

  function readRule(mode,kind){if(mode===MODE.FULL)return [`Full ${kind} reading is required for this invocation.`,'Read every listed source, resolve the selected current entry and follow the complete relevant owner route.','Read materially defining principles/workflows/templates/integration rules reached by that route.','Do not expand into unrelated families.','Full changes read depth only; it does not expand permissions.'];return [`Use remembered ${kind} context only while clearly sufficient.`,'Resolve/read listed sources and the current owner route when not current, uncertain, changed or challenged.','Do not rely only on this compact prompt when ownership/status/boundaries are uncertain.'];}
  function buildSemanticBody(kind,definition,mode){
    const normalized=kind==='use_case'?normalizeUseCaseDefinition(definition):normalizeSemanticComponent(definition),marker=kind==='use_case'?'PLANNING_USE_CASE':'PLANNING_SEMANTIC_ENTRY',idField=kind==='use_case'?'use_case_id':`${kind}_id`;
    const lines=[`[${marker}]`,`${idField}:`,`  ${normalized.id}`,'',`${kind}:`,`  ${normalized.label}`,'','mode:',`  ${mode}`];
    if(kind==='use_case')lines.push('','semantic_owner:','  Use this Use Case as the current functional methodology-use guide: decide which methodology/documentation actions and components are relevant to the current situation, then follow the selected owner route. The Use Case does not replace specialized Target Module, Lens, profile or repository semantics.');
    else lines.push('','semantic_owner:',`  Resolve and use ${normalized.id} as the current ${normalized.kind==='TARGET_MODULE'?'Target Module':'Lens'} owner. This Helper row is an invocation projection only.`);
    lines.push('','source_of_truth:',...(normalized.sources||[]).map((s)=>`  - \`${s}\``));
    if(kind==='use_case')lines.push('','route_resolution:','  Resolve this exact current Use-Case entry. Follow its current owner route and then the current owner links/read-order to every principle, workflow, template and integration rule materially defining this Use Case. Do not treat this Helper body as a frozen list of all future owner paths.');
    lines.push('','read_rule:',...readRule(mode,kind).map((x)=>`  ${x}`));
    if(kind==='use_case')lines.push('','instruction:',`  ${normalized.instruction}`);
    else if(normalized.invocation)lines.push('','canonical_invocation:',`  ${normalized.invocation}`);
    if(kind==='use_case')lines.push('','permission:','  Methodology-navigation/read context only. Use-Case activation does not grant executable-command, repository-mutation, archive, commit or push permission and does not itself perform specialized Target/Lens work.');
    else lines.push('','permission:','  Semantic invocation only. Mutation/test/package/commit/push permission is not granted by this projection; use the selected owner and host/session authority.');
    lines.push('','user_target:',`  ${normalized.target}`,`[/${marker}]`);return lines.join('\n');
  }
  function buildSemanticEntries(useCases=[]){const definitions=normalizeUseCaseDefinitions(useCases);return{[SURFACES.USE_CASES]:definitions.map((d)=>({...d,adaptiveBody:buildSemanticBody('use_case',d,MODE.ADAPTIVE),fullBody:buildSemanticBody('use_case',d,MODE.FULL)}))};}

  function semanticCardId(component){const c=normalizeSemanticComponent(component);return`${c.kind===SEMANTIC_KINDS.USE_CASE?'uc':c.kind===SEMANTIC_KINDS.TARGET_MODULE?'tm':'lens'}:${c.id}`;}
  function kindLabel(component){const c=normalizeSemanticComponent(component);return`${c.scope} ${c.kind===SEMANTIC_KINDS.USE_CASE?'UC':c.kind===SEMANTIC_KINDS.TARGET_MODULE?'TM':'Lens'}`;}
  function fullSemanticLabel(component){const c=normalizeSemanticComponent(component);return`${c.actionLabel} · ${kindLabel(c)} · ${c.id}`;}
  function componentMatchDefinition(component,definition){const c=component,d=definition||{},binding=d.methodologyBinding||{};if(c.kind===SEMANTIC_KINDS.USE_CASE)return Boolean(c.commandId)&&d.id===c.commandId;if(c.kind===SEMANTIC_KINDS.TARGET_MODULE)return binding.targetModuleId===c.id;if(c.kind===SEMANTIC_KINDS.LENS)return binding.lensId===c.id;return false;}
  function chooseDirectDefinition(component,definitions){const matches=(definitions||[]).filter((d)=>d.palette!==false&&componentMatchDefinition(component,d));if(!matches.length)return null;if(component.commandId){const exact=matches.find((d)=>d.id===component.commandId);if(exact)return exact;}if(component.kind===SEMANTIC_KINDS.TARGET_MODULE){const primary=matches.filter((d)=>d.methodologyBinding?.surfaceKind==='TARGET_MODULE');if(primary.length===1)return primary[0];if(primary.length>1)return primary.find((d)=>!String(d.description||'').toLowerCase().includes('legacy'))||primary[0];}if(matches.length===1)return matches[0];return null;}
  function entryRefs(entry){return new Set([entry.canonicalId,...(entry.scenarioRefs||[])].filter(Boolean));}
  function scenarioUsesForEntry(entry,scenarios){const refs=entryRefs(entry),uses=[];for(const scenario of scenarios||[])for(const step of scenario.steps||[])if((step.semanticRefs||[]).some((ref)=>refs.has(ref)))uses.push({scenarioId:scenario.id,scenarioTitle:scenario.title,stepId:step.id,stepTitle:step.title});return uses;}
  function attachScenarioUses(entries,scenarios){return(entries||[]).map((entry)=>({...entry,scenarioUses:scenarioUsesForEntry(entry,scenarios)}));}
  function commandEquivalentsForScenarioStep(entries,step){const refs=new Set(step?.semanticRefs||[]);return(entries||[]).filter((entry)=>[...entryRefs(entry)].some((ref)=>refs.has(ref)));}

  return{SURFACES,MODE,SEMANTIC_KINDS,SEMANTIC_PROVENANCE:PROVENANCE,normalizeUseCaseDefinition,normalizeUseCaseDefinitions,normalizeSemanticComponent,normalizeSemanticComponents,normalizeScenario,normalizeScenarios,buildSemanticBody,buildSemanticEntries,semanticCardId,kindLabel,fullSemanticLabel,chooseDirectDefinition,scenarioUsesForEntry,attachScenarioUses,commandEquivalentsForScenarioStep};
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

  const PATCH_START='[PLANNING_HELPER_PATCH]',PATCH_END='[/PLANNING_HELPER_PATCH]';
  const PATCH_COLLECTIONS=Object.freeze(['commands','helperItems','useCases','semanticComponents','scenarios']);

  function normalizePatchSection(value,label){const input=value==null?{}:value;if(!input||typeof input!=='object'||Array.isArray(input))throw new TypeError(`${label} must be an object.`);for(const key of Object.keys(input))if(!PATCH_COLLECTIONS.includes(key))throw new TypeError(`Unsupported ${label} field: ${key}`);const out={};for(const key of PATCH_COLLECTIONS){const items=input[key]==null?[]:input[key];if(!Array.isArray(items))throw new TypeError(`${label}.${key} must be an array.`);out[key]=items;}return out;}
  function parsePlanningHelperPatch(source){const blocks=[...String(source||'').matchAll(/\[PLANNING_HELPER_PATCH\]\s*([\s\S]*?)\s*\[\/PLANNING_HELPER_PATCH\]/g)];if(blocks.length>1)throw new TypeError('Only one PLANNING_HELPER_PATCH block is allowed per import.');if(!blocks.length)return null;let raw;try{raw=JSON.parse(blocks[0][1]);}catch(error){throw new TypeError(`Invalid PLANNING_HELPER_PATCH JSON: ${error.message||String(error)}`);}if(!raw||typeof raw!=='object'||Array.isArray(raw))throw new TypeError('PLANNING_HELPER_PATCH must contain one JSON object.');if(Number(raw.schemaVersion)!==1)throw new TypeError(`Unsupported PLANNING_HELPER_PATCH schemaVersion: ${raw.schemaVersion}`);for(const key of Object.keys(raw))if(!['schemaVersion','upsert','delete','catalogOrder'].includes(key))throw new TypeError(`Unsupported PLANNING_HELPER_PATCH field: ${key}`);const upsert=normalizePatchSection(raw.upsert,'upsert'),del=normalizePatchSection(raw.delete,'delete');for(const key of PATCH_COLLECTIONS)for(const item of del[key])if(typeof item!=='string'||!item.trim())throw new TypeError(`delete.${key} must contain non-empty string keys.`);return{schemaVersion:1,upsert,delete:del,catalogOrder:raw.catalogOrder==null?null:raw.catalogOrder};}

  function parseChatImport(text) {
    const source=String(text || '');
    const definitions=source.includes('[PLANNING_COMMAND_DEFINITION]') ? deps.parseCommandDefinitionBatch(source) : [];
    const helperItems=source.includes('[PLANNING_HELPER_LIBRARY_ITEM]') ? deps.parseHelperLibraryBatch(source) : [];
    const patch=source.includes(PATCH_START)?parsePlanningHelperPatch(source):null;
    if(!definitions.length&&!helperItems.length&&!patch)throw new TypeError('No planning-command definitions, helper-library items or Planning Helper patch found.');
    if(definitions.length)deps.validateCommandCatalog(definitions);
    return { definitions, helperItems, patch };
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

  return { PATCH_START, PATCH_END, parsePlanningHelperPatch, parseChatImport, buildRecoveryRequest };
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
    _repoUrl(path) { return `${this.apiBase}/repos/${encodeURIComponent(this.owner)}/${encodeURIComponent(this.repo)}/${String(path || '').replace(/^\/+/, '')}`; }
    _branchRefPath() { return `git/refs/heads/${this.branch.split('/').map(encodeURIComponent).join('/')}`; }
    async getBranchHead() { const payload=await this._request('GET',this._repoUrl(`git/ref/heads/${this.branch.split('/').map(encodeURIComponent).join('/')}`));const sha=String(payload?.object?.sha||'');if(!sha)throw new GitHubClientError('invalid_response','GitHub branch ref response is missing commit SHA.');return sha; }
    async getGitCommit(sha) { const value=String(sha||'').trim();if(!/^[0-9a-f]{40}$/i.test(value))throw new TypeError('Git commit SHA is required.');const payload=await this._request('GET',this._repoUrl(`git/commits/${encodeURIComponent(value)}`));const treeSha=String(payload?.tree?.sha||'');if(!treeSha)throw new GitHubClientError('invalid_response','GitHub commit response is missing tree SHA.');return{sha:String(payload?.sha||value),treeSha}; }
    async createGitBlob(content) { const payload=await this._request('POST',this._repoUrl('git/blobs'),{content:String(content),encoding:'utf-8'});const sha=String(payload?.sha||'');if(!sha)throw new GitHubClientError('invalid_response','GitHub blob response is missing SHA.');return sha; }
    async createGitTree(baseTreeSha,entries) { const base=String(baseTreeSha||'').trim();if(!base)throw new TypeError('Base tree SHA is required.');const tree=(entries||[]).map((entry)=>({path:normalizeGitHubContentPath(entry.path),mode:'100644',type:'blob',sha:String(entry.sha||'')}));if(!tree.length||tree.some((entry)=>!entry.sha))throw new TypeError('Git tree entries require path and blob SHA.');const payload=await this._request('POST',this._repoUrl('git/trees'),{base_tree:base,tree});const sha=String(payload?.sha||'');if(!sha)throw new GitHubClientError('invalid_response','GitHub tree response is missing SHA.');return sha; }
    async createGitCommit(message,treeSha,parentSha) { const payload=await this._request('POST',this._repoUrl('git/commits'),{message:String(message||'Publish Planning Helper local changes'),tree:String(treeSha||''),parents:[String(parentSha||'')]});const sha=String(payload?.sha||'');if(!sha)throw new GitHubClientError('invalid_response','GitHub commit response is missing SHA.');return sha; }
    async updateBranchRef(commitSha) { const sha=String(commitSha||'').trim();try{await this._request('PATCH',this._repoUrl(this._branchRefPath()),{sha,force:false});return{sha,recoveredAfterUnknownWrite:false};}catch(error){if(!(error instanceof GitHubClientError)||error.kind!=='network_unknown')throw error;let head='';try{head=await this.getBranchHead();}catch(verifyError){throw new GitHubClientError('verification_unknown','GitHub branch update result is unknown and current branch head could not be verified.',{cause:error,verificationCause:verifyError,commitSha:sha});}if(head===sha)return{sha,recoveredAfterUnknownWrite:true};throw new GitHubClientError('verification_unknown','GitHub branch update result is unknown and branch head does not equal the prepared commit.',{cause:error,commitSha:sha,remoteHead:head});} }
    async publishFilesAtomic({files,message,expectedHeadSha}) { const rows=(files||[]).map((file)=>({path:normalizeGitHubContentPath(file.path),content:String(file.content)}));if(!rows.length)throw new TypeError('At least one file is required for atomic publish.');if(new Set(rows.map((row)=>row.path.toLowerCase())).size!==rows.length)throw new TypeError('Atomic publish contains duplicate repository paths.');const expected=String(expectedHeadSha||'').trim(),head=await this.getBranchHead();if(expected&&head!==expected)throw new GitHubClientError('conflict','GitHub branch changed after publish preview; nothing was published.',{expectedHead:expected,remoteHead:head});const base=await this.getGitCommit(head),blobs=[];for(const row of rows)blobs.push({path:row.path,sha:await this.createGitBlob(row.content)});const treeSha=await this.createGitTree(base.treeSha,blobs),commitSha=await this.createGitCommit(message,treeSha,head);let refResult;try{refResult=await this.updateBranchRef(commitSha);}catch(error){if(error instanceof GitHubClientError&&error.kind==='conflict')throw new GitHubClientError('conflict','GitHub branch advanced before the atomic publish could update the ref; nothing was published.',{cause:error,expectedHead:head,preparedCommit:commitSha});throw error;}const verifiedHead=await this.getBranchHead();if(verifiedHead!==commitSha)throw new GitHubClientError('verification_unknown','Atomic publish created a commit, but the branch head could not be verified as that commit.',{commitSha,remoteHead:verifiedHead});return{ok:true,commitSha,previousHeadSha:head,recoveredAfterUnknownWrite:Boolean(refResult.recoveredAfterUnknownWrite),files:rows.map((row)=>row.path)}; }
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
  const api=factory(typeof require==='function'?Object.assign({},require('./semantic-projections.js'),root.ObsPlanningHelper||{}):(root.ObsPlanningHelper||{}));
  if(typeof module==='object'&&module.exports)module.exports=api;
  root.ObsPlanningHelper=Object.assign(root.ObsPlanningHelper||{},api);
})(typeof globalThis!=='undefined'?globalThis:this,function(deps){
  'use strict';

  const USE_CASE_CATALOG_PATH='planning/documentation/tools/tampermonkey/chat-command-palette/seed/use-cases.json';
  const SEMANTIC_COMPONENT_CATALOG_PATH='planning/documentation/tools/tampermonkey/chat-command-palette/seed/semantic-components.json';
  const SCENARIO_CATALOG_PATH='planning/documentation/tools/tampermonkey/chat-command-palette/seed/scenarios.json';
  const CATALOG_ORDER_PATH='planning/documentation/tools/tampermonkey/chat-command-palette/catalog-order.json';
  const CATALOG_ORDER_KIND='planning-helper-catalog-order';
  const CATALOG_ORDER_SCHEMA_VERSION=4;

  function normalizeIdOrder(value,label){const result=[];for(const raw of Array.isArray(value)?value:[]){const id=String(raw||'').trim();if(!id)continue;if(/[\r\n\u0000-\u001f\u007f]/.test(id))throw new TypeError(`${label} contains unsafe id.`);if(!result.includes(id))result.push(id);}return result;}
  function normalizeCommandGroup(value,index){const input=value&&typeof value==='object'?value:{},id=String(input.id||'').trim(),viewId=String(input.viewId||'').trim().toUpperCase(),label=String(input.label||'').trim();if(!id||/[\r\n\u0000-\u001f\u007f]/.test(id))throw new TypeError(`commandGroups[${index}] requires a safe id.`);if(!/^[A-Z_]+$/.test(viewId))throw new TypeError(`commandGroups[${index}] requires a viewId.`);if(!label||/[\r\n\u0000-\u001f\u007f]/.test(label))throw new TypeError(`commandGroups[${index}] requires a safe label.`);const order=Number.isFinite(Number(input.order))?Number(input.order):index*10,items=normalizeIdOrder(input.items,`commandGroups[${index}].items`);return{id,viewId,label,order,items};}
  function normalizeCatalogOrder(value={}){const input=value&&typeof value==='object'?value:{},version=input.schemaVersion==null?1:Number(input.schemaVersion);if(![1,2,3,CATALOG_ORDER_SCHEMA_VERSION].includes(version))throw new TypeError(`Unsupported catalog-order schemaVersion: ${input.schemaVersion}`);if(input.kind!=null&&String(input.kind)!==CATALOG_ORDER_KIND)throw new TypeError(`Unsupported catalog-order kind: ${input.kind}`);const commandGroups=(Array.isArray(input.commandGroups)?input.commandGroups:[]).map(normalizeCommandGroup),groupIds=commandGroups.map((group)=>group.id);if(new Set(groupIds).size!==groupIds.length)throw new TypeError('Duplicate command-group ids.');const membership=new Map();for(const group of commandGroups)for(const id of group.items){if(membership.has(id))throw new TypeError(`Command card ${id} belongs to multiple groups: ${membership.get(id)}, ${group.id}.`);membership.set(id,group.id);}return{schemaVersion:CATALOG_ORDER_SCHEMA_VERSION,kind:CATALOG_ORDER_KIND,commands:normalizeIdOrder(input.commands,'commands'),useCases:normalizeIdOrder(input.useCases,'useCases'),scenarios:normalizeIdOrder(input.scenarios,'scenarios'),prompts:normalizeIdOrder(input.prompts,'prompts'),commandGroups};}
  function renderCatalogOrder(value){return JSON.stringify(normalizeCatalogOrder(value),null,2)+'\n';}

  function parseSeed(text,{path,kind,normalize,label}){let value;try{value=JSON.parse(String(text||''));}catch(error){throw new TypeError(`Invalid ${label} repository catalog JSON at ${path}: ${error.message}`);}if(!value||value.schemaVersion!==1||value.kind!==kind||!Array.isArray(value.items))throw new TypeError(`Invalid ${label} repository catalog shape at ${path}.`);const items=normalize(value.items);if(!items.length)throw new TypeError(`${label} repository catalog is empty at ${path}.`);return{schemaVersion:1,kind,generatedFrom:String(value.generatedFrom||''),items};}
  function parseUseCaseCatalog(text,path=USE_CASE_CATALOG_PATH){const parsed=parseSeed(text,{path,kind:'use-case-seed',normalize:deps.normalizeUseCaseDefinitions,label:'Use-Case'});return{...parsed,useCases:parsed.items};}
  function parseSemanticComponentCatalog(text,path=SEMANTIC_COMPONENT_CATALOG_PATH){const parsed=parseSeed(text,{path,kind:'semantic-component-seed',normalize:deps.normalizeSemanticComponents,label:'semantic-component'});return{...parsed,components:parsed.items};}
  function parseScenarioCatalog(text,path=SCENARIO_CATALOG_PATH){const parsed=parseSeed(text,{path,kind:'scenario-seed',normalize:deps.normalizeScenarios,label:'Scenario'});return{...parsed,scenarios:parsed.items};}
  function parseCatalogOrder(text,path=CATALOG_ORDER_PATH){let value;try{value=JSON.parse(String(text||''));}catch(error){throw new TypeError(`Invalid catalog-order JSON at ${path}: ${error.message}`);}return normalizeCatalogOrder(value);}

  class RepositoryCatalogService{
    constructor(client){this.client=client;}
    async readUseCases(){const remote=await this.client.read(USE_CASE_CATALOG_PATH);const parsed=parseUseCaseCatalog(remote.content);return{path:USE_CASE_CATALOG_PATH,sha:String(remote.sha||''),useCases:parsed.useCases,generatedFrom:parsed.generatedFrom,rawContent:remote.content.replace(/\r\n?/g,'\n')};}
    async readSemanticComponents(){const remote=await this.client.read(SEMANTIC_COMPONENT_CATALOG_PATH);const parsed=parseSemanticComponentCatalog(remote.content);return{path:SEMANTIC_COMPONENT_CATALOG_PATH,sha:String(remote.sha||''),components:parsed.components,generatedFrom:parsed.generatedFrom,rawContent:remote.content.replace(/\r\n?/g,'\n')};}
    async readScenarios(){const remote=await this.client.read(SCENARIO_CATALOG_PATH);const parsed=parseScenarioCatalog(remote.content);return{path:SCENARIO_CATALOG_PATH,sha:String(remote.sha||''),scenarios:parsed.scenarios,generatedFrom:parsed.generatedFrom,rawContent:remote.content.replace(/\r\n?/g,'\n')};}
    async readOrder(){try{const remote=await this.client.read(CATALOG_ORDER_PATH);return{path:CATALOG_ORDER_PATH,sha:String(remote.sha||''),order:parseCatalogOrder(remote.content),rawContent:remote.content.replace(/\r\n?/g,'\n')};}catch(error){if(error?.kind==='not_found')return{path:CATALOG_ORDER_PATH,sha:'',order:normalizeCatalogOrder({}),rawContent:''};throw error;}}
    async saveOrder(value){const order=normalizeCatalogOrder(value),content=renderCatalogOrder(order);let existing=null;try{const remote=await this.client.read(CATALOG_ORDER_PATH);existing={sha:String(remote.sha||''),rawContent:remote.content.replace(/\r\n?/g,'\n')};}catch(error){if(error?.kind!=='not_found')throw error;}if(existing&&existing.rawContent===content)return{ok:true,action:'noop',path:CATALOG_ORDER_PATH,sha:existing.sha,order,rawContent:content};const action=existing?'update':'create';const write=await this.client.saveVerified({path:CATALOG_ORDER_PATH,content,baseSha:existing?.sha||'',message:`${action==='create'?'Add':'Update'} Planning Helper catalog order`});return{ok:true,action,path:CATALOG_ORDER_PATH,sha:String(write.sha||''),order,rawContent:content,recoveredAfterUnknownWrite:Boolean(write.recoveredAfterUnknownWrite),recoveredAfterConflict:Boolean(write.recoveredAfterConflict)};}
  }

  return{USE_CASE_CATALOG_PATH,SEMANTIC_COMPONENT_CATALOG_PATH,SCENARIO_CATALOG_PATH,CATALOG_ORDER_PATH,CATALOG_ORDER_KIND,CATALOG_ORDER_SCHEMA_VERSION,normalizeCatalogOrder,renderCatalogOrder,parseUseCaseCatalog,parseSemanticComponentCatalog,parseScenarioCatalog,parseCatalogOrder,RepositoryCatalogService};
});

(function (root, factory) {
  const api=factory(typeof require==='function'?Object.assign({},require('./command-definition-codec.js'),require('./command-catalog.js'),require('./helper-library-codec.js'),require('./semantic-projections.js'),require('./repository-catalog-service.js'),root.ObsPlanningHelper||{}):(root.ObsPlanningHelper||{}));
  if(typeof module==='object'&&module.exports)module.exports=api;
  root.ObsPlanningHelper=Object.assign(root.ObsPlanningHelper||{},api);
})(typeof globalThis!=='undefined'?globalThis:this,function(deps){
  'use strict';

  const KEYS=Object.freeze({settings:'obsPlanningHelper:v1:repositorySettings',token:'obsPlanningHelper:v1:githubToken',localSnapshot:'obsPlanningHelper:v2:localSnapshot'});
  const LEGACY_KEYS=Object.freeze({commandCache:'obsPlanningHelper:v1:commandCatalogCache',localLibrary:'obsPlanningHelper:v1:localLibrary',repositoryLibraryCache:'obsPlanningHelper:v1:repositoryLibraryCache'});
  const LOCAL_SNAPSHOT_SCHEMA_VERSION=8;
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
  function normalizeSuppressedRepository(value){const input=value&&typeof value==='object'?value:{};return{commands:normalizeIdList(input.commands,'suppressedRepository.commands'),helperItems:normalizeIdList(input.helperItems,'suppressedRepository.helperItems'),useCases:normalizeIdList(input.useCases,'suppressedRepository.useCases'),semanticComponents:normalizeIdList(input.semanticComponents,'suppressedRepository.semanticComponents'),scenarios:normalizeIdList(input.scenarios,'suppressedRepository.scenarios')};}
  function normalizeCommandRecord(value){const input=value&&typeof value==='object'?value:{},definition=deps.normalizeCommandDefinition(input.definition||input),path=deps.commandPathForDefinition(definition);if(input.path&&String(input.path)!==path)throw new TypeError(`Planning-command snapshot path mismatch: ${input.path}`);const rawContent=String(input.rawContent||deps.renderCommandDefinitionDocument(definition)).replace(/\r\n?/g,'\n'),parsed=deps.parseCommandDefinitionDocument(rawContent,{path});if(JSON.stringify(deps.toSerializable(deps.stripRuntimeCommandMetadata(parsed)))!==JSON.stringify(deps.toSerializable(definition)))throw new TypeError(`Planning-command snapshot raw content does not match definition: ${definition.id}`);const repositorySha=String(input.repositorySha||'').trim(),repositoryKnown=Boolean(input.repositoryKnown||repositorySha),repositoryTracked=Boolean(input.repositoryTracked||repositoryKnown);return{definition,path,rawContent,repositoryKnown,repositoryTracked,repositorySha};}
  function normalizeHelperRecord(value){const input=value&&typeof value==='object'?value:{},item=deps.normalizeHelperLibraryItem(input.item||input),path=deps.helperLibraryTargetPath(item);if(input.path&&String(input.path)!==path)throw new TypeError(`Helper-library snapshot path mismatch: ${input.path}`);const rawContent=String(input.rawContent||deps.renderHelperLibraryDocument(item)).replace(/\r\n?/g,'\n'),parsed=deps.parseHelperLibraryDocument(rawContent,{kind:item.kind,path});if(JSON.stringify(parsed)!==JSON.stringify(item))throw new TypeError(`Helper-library snapshot raw content does not match item: ${item.kind}:${item.id}`);const repositorySha=String(input.repositorySha||'').trim();return{item,path,rawContent,repositoryKnown:Boolean(input.repositoryKnown||repositorySha),repositorySha};}
  function stripLegacyCommandDirectionPlacement(value){const input=value&&typeof value==='object'?value:{},definition={...(input.definition||input)};delete definition.directionIds;return{...input,definition,rawContent:''};}
  function normalizePlanningHelperLocalSnapshot(value){
    if(!value||typeof value!=='object'||![1,2,3,4,5,6,7,LOCAL_SNAPSHOT_SCHEMA_VERSION].includes(value.schemaVersion))throw new TypeError('Unsupported Planning Helper local snapshot schema.');
    const rawCommands=value.schemaVersion<5?(value.planningCommands||[]).map(stripLegacyCommandDirectionPlacement):(value.planningCommands||[]);
    const planningCommands=rawCommands.map(normalizeCommandRecord).sort((a,b)=>a.path.localeCompare(b.path));
    const helperItems=(value.helperItems||[]).map(normalizeHelperRecord).sort((a,b)=>a.path.localeCompare(b.path));
    const useCases=deps.normalizeUseCaseDefinitions(value.useCases||[]),useCaseCatalogSha=String(value.useCaseCatalogSha||'').trim();
    const semanticComponents=deps.normalizeSemanticComponents(value.semanticComponents||[]),semanticComponentCatalogSha=String(value.semanticComponentCatalogSha||'').trim();
    const scenarios=deps.normalizeScenarios(value.scenarios||[]),scenarioCatalogSha=String(value.scenarioCatalogSha||'').trim();
    const catalogOrder=deps.normalizeCatalogOrder(value.catalogOrder||{}),catalogOrderSha=String(value.catalogOrderSha||'').trim();
    const suppressedRepository=normalizeSuppressedRepository(value.suppressedRepository||{});
    const favoriteCommandIds=normalizeIdList(value.favoriteCommandIds,'favoriteCommandIds'),favoriteUseCaseIds=normalizeIdList(value.favoriteUseCaseIds,'favoriteUseCaseIds');
    deps.validateCommandCatalog(planningCommands.map((record)=>record.definition));
    if(new Set(planningCommands.map((record)=>record.path)).size!==planningCommands.length)throw new TypeError('Duplicate planning-command path in local snapshot.');
    if(new Set(helperItems.map((record)=>record.path)).size!==helperItems.length)throw new TypeError('Duplicate helper-library path in local snapshot.');
    if(planningCommands.some((record)=>suppressedRepository.commands.includes(record.path)))throw new TypeError('A planning command cannot be both present and repository-suppressed.');
    if(helperItems.some((record)=>suppressedRepository.helperItems.includes(record.path)))throw new TypeError('A helper-library item cannot be both present and repository-suppressed.');
    if(useCases.some((entry)=>suppressedRepository.useCases.includes(entry.id)))throw new TypeError('A Use Case cannot be both present and repository-suppressed.');
    if(semanticComponents.some((entry)=>suppressedRepository.semanticComponents.includes(entry.id)))throw new TypeError('A semantic component cannot be both present and repository-suppressed.');
    if(scenarios.some((entry)=>suppressedRepository.scenarios.includes(entry.id)))throw new TypeError('A Scenario cannot be both present and repository-suppressed.');
    return{schemaVersion:LOCAL_SNAPSHOT_SCHEMA_VERSION,savedAt:cleanIso(value.savedAt,''),planningCommands,helperItems,useCases,useCaseCatalogSha,semanticComponents,semanticComponentCatalogSha,scenarios,scenarioCatalogSha,catalogOrder,catalogOrderSha,suppressedRepository,favoriteCommandIds,favoriteUseCaseIds};
  }
  async function loadPlanningHelperLocalSnapshot(){const value=await gmGet(KEYS.localSnapshot,null);return value==null?null:normalizePlanningHelperLocalSnapshot(value);}
  async function savePlanningHelperLocalSnapshot(value){const normalized=normalizePlanningHelperLocalSnapshot({...value,schemaVersion:LOCAL_SNAPSHOT_SCHEMA_VERSION,savedAt:value?.savedAt||new Date().toISOString()}),payload={...normalized,savedAt:new Date().toISOString()};await gmSet(KEYS.localSnapshot,payload);const checked=await gmGet(KEYS.localSnapshot,null),normalizedChecked=normalizePlanningHelperLocalSnapshot(checked);if(JSON.stringify(normalizedChecked)!==JSON.stringify(payload))throw new Error('Planning Helper local snapshot write-back verification failed.');return payload;}

  function commandRecordsFromDefinitions(definitions,repositoryKnown=true){return(definitions||[]).map((definition)=>normalizeCommandRecord({definition,repositoryKnown,repositoryTracked:repositoryKnown}));}
  function helperKey(item){return`${item.kind}:${item.id}`;}
  async function loadOrMigratePlanningHelperLocalSnapshot(){
    const existingRaw=await gmGet(KEYS.localSnapshot,null),warnings=[];
    if(existingRaw!=null){const existing=normalizePlanningHelperLocalSnapshot(existingRaw),needsWrite=existingRaw.schemaVersion!==LOCAL_SNAPSHOT_SCHEMA_VERSION,snapshot=needsWrite?await savePlanningHelperLocalSnapshot(existing):existing;if(needsWrite&&(!existing.semanticComponents.length||!existing.scenarios.length))warnings.push('Planning Helper local snapshot migrated. Commands, semantic components and scenarios are GitHub-backed; use Hard Reload GitHub to restore current repository projections.');return{snapshot,migrated:needsWrite,seededCommands:0,warnings};}
    let definitions=[];
    try{const legacy=await gmGet(LEGACY_KEYS.commandCache,null);if(legacy&&legacy.schemaVersion===1&&Array.isArray(legacy.definitions)){definitions=legacy.definitions.map((definition)=>{const next={...definition};delete next.directionIds;return next;});deps.validateCommandCatalog(definitions);}}catch(error){warnings.push(`Legacy planning-command cache ignored: ${error.message||String(error)}`);}deps.validateCommandCatalog(definitions);
    const helperByKey=new Map();
    try{const repoCache=await gmGet(LEGACY_KEYS.repositoryLibraryCache,null),records=repoCache?.schemaVersion===2&&Array.isArray(repoCache.records)?repoCache.records:repoCache?.schemaVersion===1&&Array.isArray(repoCache.items)?repoCache.items.map((item)=>({item})):[];for(const record of records){const item=deps.normalizeHelperLibraryItem(record.item||record);helperByKey.set(helperKey(item),normalizeHelperRecord({item,repositoryKnown:true,repositorySha:record.sha||''}));}}catch(error){warnings.push(`Legacy repository-library cache ignored: ${error.message||String(error)}`);}
    try{const local=await gmGet(LEGACY_KEYS.localLibrary,null);if(local&&local.schemaVersion===1&&Array.isArray(local.items))for(const raw of local.items){const item=deps.normalizeHelperLibraryItem(raw),key=helperKey(item),previous=helperByKey.get(key);helperByKey.set(key,normalizeHelperRecord({item,repositoryKnown:Boolean(previous?.repositoryKnown),repositorySha:previous?.repositorySha||''}));}}catch(error){warnings.push(`Legacy local helper library ignored: ${error.message||String(error)}`);}
    try{let raw='';try{raw=typeof localStorage!=='undefined'?localStorage.getItem(deps.LEGACY_LOCAL_STORAGE_KEY)||'':'';}catch(_){}if(raw){for(const item of deps.parseLegacyProjectionRegistry(raw)){const key=helperKey(item);if(!helperByKey.has(key))helperByKey.set(key,normalizeHelperRecord({item,repositoryKnown:false}));}}}catch(error){warnings.push(`Legacy page-local command projections ignored: ${error.message||String(error)}`);}
    const snapshot=await savePlanningHelperLocalSnapshot({schemaVersion:LOCAL_SNAPSHOT_SCHEMA_VERSION,planningCommands:commandRecordsFromDefinitions(definitions,true),helperItems:[...helperByKey.values()],useCases:[],useCaseCatalogSha:'',semanticComponents:[],semanticComponentCatalogSha:'',scenarios:[],scenarioCatalogSha:'',catalogOrder:deps.normalizeCatalogOrder({}),catalogOrderSha:'',suppressedRepository:{},favoriteCommandIds:[],favoriteUseCaseIds:[]});
    warnings.push('Commands, semantic components and scenarios are repository-backed catalogs. Use Hard Reload GitHub to populate/restore them from the configured repository.');
    return{snapshot,migrated:true,seededCommands:definitions.length,warnings};
  }

  function readPanelPosition(){try{const parsed=JSON.parse(localStorage.getItem(POSITION_KEY)||'{}');return{left:Number.isFinite(parsed.left)?parsed.left:null,top:Number.isFinite(parsed.top)?parsed.top:null,width:Number.isFinite(parsed.width)?parsed.width:null,height:Number.isFinite(parsed.height)?parsed.height:null};}catch(_){return{left:null,top:null,width:null,height:null};}}
  function savePanelPosition(position){try{localStorage.setItem(POSITION_KEY,JSON.stringify({left:position.left,top:position.top,width:position.width,height:position.height}));}catch(_){} }

  return{PLANNING_HELPER_STATE_KEYS:KEYS,PLANNING_HELPER_LEGACY_STATE_KEYS:LEGACY_KEYS,PLANNING_HELPER_DEFAULT_SETTINGS:DEFAULT_SETTINGS,LOCAL_SNAPSHOT_SCHEMA_VERSION,normalizeSettings,validateRepositorySettings,normalizeSuppressedRepository,loadRepositorySettings,saveRepositorySettings,loadGitHubToken,saveGitHubToken,normalizeCommandRecord,normalizeHelperRecord,normalizePlanningHelperLocalSnapshot,loadPlanningHelperLocalSnapshot,savePlanningHelperLocalSnapshot,loadOrMigratePlanningHelperLocalSnapshot,commandRecordsFromDefinitions,readPanelPosition,savePanelPosition};
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
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  root.ObsPlanningHelper=Object.assign(root.ObsPlanningHelper||{},api);
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';

  const VIEW_IDS=Object.freeze({ALL:'ALL',GENERAL:'GENERAL',USE_CASES:'USE_CASES',TARGET_MODULES:'TARGET_MODULES',LENSES:'LENSES',TOOLS:'TOOLS'});
  const VIEW_META=Object.freeze({
    GENERAL:{label:'General',order:0},USE_CASES:{label:'Use Cases',order:10},TARGET_MODULES:{label:'Target Modules',order:20},LENSES:{label:'Lenses',order:30},TOOLS:{label:'Tools / Repository',order:40}
  });
  function kindLabelFor(entry){if(entry?.semanticKind==='USE_CASE')return`${entry.semanticScope||'Core'} UC`;if(entry?.semanticKind==='TARGET_MODULE')return`${entry.semanticScope||'Core'} TM`;if(entry?.semanticKind==='LENS')return`${entry.semanticScope||'Core'} Lens`;if(entry?.commandCategory==='TOOL')return'Tool';return'General';}
  function semanticNavigation(entry){
    const group=entry?.presentationGroup;if(group){const viewId=String(group.viewId||'').toUpperCase(),meta=VIEW_META[viewId]||{label:viewId||'General',order:90};return{viewId,viewLabel:meta.label,viewOrder:meta.order,sectionId:String(group.id||'UNGROUPED'),sectionLabel:String(group.label||'Other / Ungrouped'),sectionOrder:Number(group.order)||0,itemOrder:Number(group.itemOrder)||0,kindLabel:kindLabelFor(entry)};}
    if(entry?.semanticKind==='USE_CASE')return{viewId:VIEW_IDS.USE_CASES,viewLabel:'Use Cases',viewOrder:10,sectionId:String(entry.semanticScope||'Core').toUpperCase(),sectionLabel:entry.semanticScope||'Core',sectionOrder:entry.semanticScope==='Documentation'?0:10,itemOrder:Number(entry.semanticOrder)||0,kindLabel:`${entry.semanticScope||'Core'} UC`};
    if(entry?.semanticKind==='TARGET_MODULE')return{viewId:VIEW_IDS.TARGET_MODULES,viewLabel:'Target Modules',viewOrder:20,sectionId:String(entry.semanticScope||'Core').toUpperCase(),sectionLabel:entry.semanticScope==='SDS'?'Profile · SDS':'IDTSPE Core',sectionOrder:entry.semanticScope==='Core'?0:10,itemOrder:Number(entry.semanticOrder)||0,kindLabel:`${entry.semanticScope||'Core'} TM`};
    if(entry?.semanticKind==='LENS')return{viewId:VIEW_IDS.LENSES,viewLabel:'Lenses',viewOrder:30,sectionId:String(entry.semanticScope||'Core').toUpperCase(),sectionLabel:entry.semanticScope==='SDS'?'Profile · SDS':'IDTSPE Core',sectionOrder:entry.semanticScope==='Core'?0:10,itemOrder:Number(entry.semanticOrder)||0,kindLabel:`${entry.semanticScope||'Core'} Lens`};
    if(entry?.commandCategory==='TOOL')return{viewId:VIEW_IDS.TOOLS,viewLabel:'Tools / Repository',viewOrder:40,sectionId:'TOOLS',sectionLabel:'Tools / Repository',sectionOrder:0,itemOrder:0,kindLabel:'Tool'};
    return{viewId:VIEW_IDS.GENERAL,viewLabel:'General',viewOrder:0,sectionId:'GENERAL',sectionLabel:'General',sectionOrder:0,itemOrder:0,kindLabel:'General'};
  }
  // Compatibility fallbacks are read-only: imported legacy records may still expose helperPresentation,
  // while current navigation is derived from semantic identity plus repository-backed presentation groups.
  function legacyPresentation(entry){return entry?.helperPresentation||entry?.definition?.helperPresentation||null;}
  function primaryNavigation(entry){return entry?.semanticKind||entry?.commandCategory?semanticNavigation(entry):(legacyPresentation(entry)?.navigation||semanticNavigation(entry));}
  function relatedNavigation(){return[];}
  function allNavigationRows(entries){return(entries||[]).filter((entry)=>entry?.palette!==false).map((entry)=>({entry,nav:primaryNavigation(entry),related:false}));}
  function methodologyViewDefinitions(entries){const rows=allNavigationRows(entries),counts=new Map();for(const row of rows)counts.set(row.nav.viewId,(counts.get(row.nav.viewId)||0)+1);return Object.entries(VIEW_META).filter(([id])=>counts.has(id)).map(([id,meta])=>({id,label:meta.label,order:meta.order,count:counts.get(id)||0})).sort((a,b)=>a.order-b.order);}
  function methodologyPrimaryIds(entries,viewId){return allNavigationRows(entries).filter((row)=>row.nav.viewId===viewId).map((row)=>row.entry.id);}
  function methodologyRelatedIds(){return[];}
  function buildMethodologyViewGroups(entries,viewId){const sectionMap=new Map();for(const row of allNavigationRows(entries).filter((item)=>item.nav.viewId===viewId)){const nav=row.nav,key=nav.sectionId;if(!sectionMap.has(key))sectionMap.set(key,{id:key,label:nav.sectionLabel,order:Number(nav.sectionOrder)||0,entries:[]});sectionMap.get(key).entries.push({...row.entry,__methodologyNav:{...nav,viewId,sectionId:key,related:false}});}const sections=[...sectionMap.values()].sort((a,b)=>a.order-b.order||a.label.localeCompare(b.label));for(const section of sections)section.entries.sort((a,b)=>(Number(a.__methodologyNav?.itemOrder)||0)-(Number(b.__methodologyNav?.itemOrder)||0)||String(a.label||a.id).localeCompare(String(b.label||b.id)));return sections.filter((section)=>section.entries.length);}
  function normalizeSelectedGroupIds(groups,selected){const keys=(groups||[]).map((group)=>String(group.id)),allowed=new Set(keys),values=Array.isArray(selected)?[...new Set(selected.map(String).filter((id)=>allowed.has(id)))]:[];return !values.length||values.length===keys.length?null:values;}
  function toggleSelectedGroupId(groups,selected,id){const keys=(groups||[]).map((group)=>String(group.id)),key=String(id||'');if(!keys.includes(key))return normalizeSelectedGroupIds(groups,selected);if(!Array.isArray(selected))return[key];const next=new Set(normalizeSelectedGroupIds(groups,selected)||[]);if(next.has(key))next.delete(key);else next.add(key);return normalizeSelectedGroupIds(groups,[...next]);}
  function filterGroupsBySelection(groups,selected){const normalized=normalizeSelectedGroupIds(groups,selected);if(!normalized)return[...(groups||[])];const keep=new Set(normalized);return(groups||[]).filter((group)=>keep.has(String(group.id)));}
  function buildAllMethodologyGroups(entries){const views=methodologyViewDefinitions(entries),groups=[];for(const view of views)for(const group of buildMethodologyViewGroups(entries,view.id))groups.push({...group,id:`${view.id}::${group.id}`,sourceGroupId:group.id,viewId:view.id,viewLabel:view.label,order:view.order*1000+group.order});return groups.sort((a,b)=>a.order-b.order||a.label.localeCompare(b.label));}

  return{METHODOLOGY_VIEW_IDS:VIEW_IDS,semanticNavigation,methodologyViewDefinitions,methodologyPrimaryIds,methodologyRelatedIds,buildMethodologyViewGroups,buildAllMethodologyGroups,normalizeSelectedGroupIds,toggleSelectedGroupId,filterGroupsBySelection};
});

(function (root, factory) {
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  root.ObsPlanningHelper=Object.assign(root.ObsPlanningHelper||{},api);
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';

  const SIDE_EFFECT_MARKER='PLANNING_COMMAND_SIDE_EFFECT';
  const CHAT_CONTEXT_STORAGE_KEY='obsPlanningHelper:chatContextCaptures:v1';
  const UUID_V4=/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  const COMMAND_SIDE_EFFECTS=Object.freeze({
    'replacement_archive.create':Object.freeze(['capture-chat-context'])
  });

  function defaultRandomUUID(){
    const cryptoApi=globalThis.crypto;
    if(!cryptoApi||typeof cryptoApi.randomUUID!=='function')throw new Error('Command side effect requires crypto.randomUUID().');
    return cryptoApi.randomUUID();
  }

  function commandSideEffectIds(commandId){return [...(COMMAND_SIDE_EFFECTS[String(commandId||'').trim()]||[])];}

  function ordinaryChatContext(locationLike=globalThis.location,title=(globalThis.document&&globalThis.document.title)||''){
    const origin=String(locationLike?.origin||'');
    const pathname=String(locationLike?.pathname||'');
    const match=pathname.match(/^\/c\/([A-Za-z0-9_-]{8,})\/?$/);
    if(origin!=='https://chatgpt.com'||!match)throw new Error('Bind this invocation requires an ordinary https://chatgpt.com/c/<conversation> tab.');
    const conversationKey=match[1];
    const observedTitle=String(title||'').replace(/\s*[|–—-]\s*ChatGPT\s*$/i,'').trim()||`Chat ${conversationKey.slice(0,8)}`;
    return{conversationKey,observedTitle};
  }

  function readCaptureStore(storage=globalThis.sessionStorage){
    if(!storage||typeof storage.getItem!=='function'||typeof storage.setItem!=='function')throw new Error('Bind this invocation requires sessionStorage in the current ChatGPT tab.');
    const raw=storage.getItem(CHAT_CONTEXT_STORAGE_KEY);
    if(!raw)return{schemaVersion:1,captures:{}};
    try{
      const parsed=JSON.parse(raw);
      if(parsed&&parsed.schemaVersion===1&&parsed.captures&&typeof parsed.captures==='object'&&!Array.isArray(parsed.captures))return parsed;
    }catch(_){}
    throw new Error('Stored ChatGPT context capture data is invalid; clear this tab session before retrying binding.');
  }

  function persistChatContextCapture(chatContextToken,context={}){
    const token=String(chatContextToken||'').trim();
    if(!UUID_V4.test(token))throw new Error('capture-chat-context requires a UUID v4 chatContextToken.');
    const storage=context.storage||globalThis.sessionStorage;
    const chat=ordinaryChatContext(context.location||globalThis.location,context.title===undefined?(globalThis.document&&globalThis.document.title)||'':context.title);
    const store=readCaptureStore(storage);
    if(Object.prototype.hasOwnProperty.call(store.captures,token))throw new Error('capture-chat-context token already exists in this tab session.');
    const capturedAt=String(typeof context.now==='function'?context.now():new Date().toISOString());
    store.captures[token]={chatContextToken:token,conversationKey:chat.conversationKey,observedTitle:chat.observedTitle,capturedAt};
    storage.setItem(CHAT_CONTEXT_STORAGE_KEY,JSON.stringify(store));
    return store.captures[token];
  }

  function buildCaptureChatContextBody(chatContextToken){
    const token=String(chatContextToken||'').trim();
    if(!UUID_V4.test(token))throw new TypeError('capture-chat-context requires a UUID v4 chatContextToken.');
    return[
      `[${SIDE_EFFECT_MARKER}]`,
      'effect:',
      '  capture-chat-context',
      '',
      'chatContextToken:',
      `  ${token}`,
      '',
      'obsAction:',
      '  required:',
      '    true',
      '  field:',
      '    chatContextToken',
      '  exactValue:',
      `    ${token}`,
      '  scope:',
      '    this-invocation-only',
      '  carryForward:',
      '    false',
      `[/${SIDE_EFFECT_MARKER}]`
    ].join('\n');
  }

  async function captureChatContextSideEffect(context={}){
    const randomUUID=typeof context.randomUUID==='function'?context.randomUUID:defaultRandomUUID;
    const chatContextToken=String(randomUUID()).trim();
    if(!UUID_V4.test(chatContextToken))throw new Error('capture-chat-context generated an invalid UUID v4 chatContextToken.');
    const capture=persistChatContextCapture(chatContextToken,context);
    return{body:buildCaptureChatContextBody(chatContextToken),chatContextToken,capture};
  }

  const DEFAULT_SIDE_EFFECT_HANDLERS=Object.freeze({'capture-chat-context':captureChatContextSideEffect});

  function normalizeEffectIds(value){
    if(value==null)return[];
    if(!Array.isArray(value))throw new TypeError('Command invocation side effects must be an array.');
    return value.map((item)=>String(item||'').trim()).filter(Boolean);
  }

  async function applyCommandSideEffects(commandId,commandBody,options={}){
    const id=String(commandId||'').trim(),base=String(commandBody==null?'':commandBody);
    const allowed=normalizeEffectIds((options.bindings||COMMAND_SIDE_EFFECTS)[id]);
    const effectIds=normalizeEffectIds(options.effectIds);
    if(!effectIds.length)return base;
    for(const effectId of effectIds)if(!allowed.includes(effectId))throw new Error(`Command side effect ${effectId} is not registered for ${id||'<empty>'}.`);
    const handlers=options.handlers||DEFAULT_SIDE_EFFECT_HANDLERS,appended=[];
    for(const effectId of effectIds){
      const handler=handlers[effectId];
      if(typeof handler!=='function')throw new Error(`Unknown command side effect: ${effectId}`);
      const result=await handler({commandId:id,commandBody:base,randomUUID:options.randomUUID,storage:options.storage,location:options.location,title:options.title,now:options.now});
      const body=typeof result==='string'?result:result?.body;
      if(typeof body!=='string'||!body.trim())throw new Error(`Command side effect ${effectId} returned no body.`);
      appended.push(body);
    }
    return[base,...appended].join('\n\n');
  }

  return{SIDE_EFFECT_MARKER,CHAT_CONTEXT_STORAGE_KEY,UUID_V4,COMMAND_SIDE_EFFECTS,DEFAULT_SIDE_EFFECT_HANDLERS,commandSideEffectIds,ordinaryChatContext,readCaptureStore,persistChatContextCapture,buildCaptureChatContextBody,captureChatContextSideEffect,applyCommandSideEffects};
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

  function favoriteEntries(entries,favoriteIds){const ids=new Set((favoriteIds||[]).map((id)=>String(id||'').trim()).filter(Boolean));return(entries||[]).filter((entry)=>ids.has(entry.id));}

  function createPlanningHelperUi(options={}){
    const SURFACES=options.surfaces||deps.SURFACES;document.getElementById(HOST_ID)?.remove();document.getElementById('obs-command-helper-host')?.remove();
    const host=document.createElement('div');host.id=HOST_ID;document.documentElement.appendChild(host);const root=host.attachShadow({mode:'open'});
    const saved=options.position||{},defaultWidth=Math.min(980,Math.max(560,window.innerWidth-32)),defaultHeight=Math.min(780,Math.max(420,window.innerHeight-32));let width=saved.width??defaultWidth,height=saved.height??defaultHeight,left=saved.left??Math.max(12,window.innerWidth-width-18),top=saved.top??Math.max(12,window.innerHeight-height-22);
    const ALL_METHODOLOGY_VIEW=deps.METHODOLOGY_VIEW_IDS?.ALL||'ALL';
    const GROUP_FILTER_KEY='obs-planning-helper-group-filter-v1',GROUP_COLLAPSE_KEY='obs-planning-helper-group-collapse-v1',ACTIVE_VIEW_KEY='obs-planning-helper-active-command-view-v1';
    let activeSurface=SURFACES.COMMANDS,activeMethodologyView=readLocalText(ACTIVE_VIEW_KEY)||null,selectedCommandId='',favoritesOnly=false,commandEntries=[...(options.commandEntries||[])],scenarioEntries=[...(options.scenarioEntries||[])],promptEntries=[...(options.promptEntries||[])],useCaseEntries=[...(options.useCaseEntries||[])],favoriteCommandIds=[...(options.favoriteCommandIds||[])],favoriteUseCaseIds=[...(options.favoriteUseCaseIds||[])],catalogOrder=options.catalogOrder||{commandGroups:[]};let activeOverlay=null,isOpen=false,statusTimer=null,operationBusy=false,insertionBusy=false,dashboardOpen=document.documentElement.dataset.obsPlanningDashboardOpen==='true',lastToggleToken=document.documentElement.dataset.obsPlanningCommandsToggle||'',resizeTimer=null,activeCommandDetail=null,commandCardNodes=new Map();
    function readLocalText(key){try{return String(localStorage.getItem(key)||'').trim();}catch(_){return'';}}
    function writeLocalText(key,value){try{if(value==null||value==='')localStorage.removeItem(key);else localStorage.setItem(key,String(value));}catch(_){}}
    function readLocalJson(key,fallback){try{const raw=localStorage.getItem(key);return raw==null?fallback:JSON.parse(raw);}catch(_){return fallback;}}
    function writeLocalJson(key,value){try{localStorage.setItem(key,JSON.stringify(value));}catch(_){}}
    function filterStateKey(viewId){return `${GROUP_FILTER_KEY}:${viewId}`;}
    function collapseStateKey(viewId,groupId){return `${GROUP_COLLAPSE_KEY}:${viewId}:${groupId}`;}


    root.innerHTML=`<style>
:host{all:initial}*{box-sizing:border-box}button,input,textarea{font:inherit}.launcher{position:fixed;right:18px;bottom:22px;z-index:2147483647;border:1px solid #64748b;border-radius:999px;padding:9px 13px;background:#111827;color:#f8fafc;font:700 12px system-ui;cursor:pointer}.panel{position:fixed;left:${left}px;top:${top}px;width:${width}px;height:${height}px;max-width:calc(100vw - 16px);max-height:calc(100vh - 16px);min-width:min(560px,calc(100vw - 16px));min-height:360px;z-index:2147483647;display:none;flex-direction:column;overflow:hidden;resize:both;border:1px solid #475569;border-radius:14px;background:#0b1220;color:#f8fafc;box-shadow:0 20px 60px rgba(0,0,0,.5);font:13px/1.4 system-ui}.panel[data-open=true]{display:flex}.header{display:flex;align-items:center;gap:8px;padding:10px;background:#111b2e;border-bottom:1px solid #334155;cursor:grab}.title{flex:1}.title-main{font-weight:800}.title-sub{color:#94a3b8;font-size:11px}.tabs{display:grid;grid-template-columns:repeat(3,1fr);gap:4px;padding:7px}.tab,.tool{padding:7px}.command-views{display:flex;gap:5px;padding:0 8px 8px}.command-view{padding:6px 9px}.command-view[aria-selected=true]{background:#0f766e}.row.focused{margin-left:22px}.row.related{opacity:.9;border-top:1px dashed #334155;padding-top:5px}.tab[aria-selected=true]{background:#1d4ed8}.surface-tools{display:flex;gap:6px;padding:7px 8px;border-top:1px solid #1e293b;border-bottom:1px solid #1e293b;flex-wrap:wrap}.search-wrap{padding:8px}.search{width:100%;padding:8px;background:#020817;color:#fff;border:1px solid #334155;border-radius:8px}.body{overflow:auto;padding:8px;min-height:0;flex:1}.entry-group{margin:6px 0;border:1px solid #26364f;border-radius:10px;background:#0d1728}.entry-head{display:flex;align-items:center;gap:6px;padding:8px 10px}.entry-head summary{cursor:pointer;list-style:none;flex:1;font-weight:800}.entry-head summary::-webkit-details-marker{display:none}.entry-meta{display:block;color:#94a3b8;font-size:11px;font-weight:400}.entry-entries{padding:0 7px 7px 20px}.row{display:grid;grid-template-columns:minmax(420px,1fr) auto;gap:8px;margin:5px 0;align-items:start}.insert{padding:8px;text-align:left;min-width:0}.row-label{display:block;font-weight:750;white-space:normal}.row-meta{display:block;color:#94a3b8;font-size:11px;margin-top:2px}.actions{display:flex;gap:5px;flex-wrap:nowrap;justify-content:flex-end;align-items:flex-start}button{border:1px solid #475569;border-radius:8px;background:#17243a;color:#f8fafc;cursor:pointer}button:hover,button:focus-visible{background:#243750}button:disabled{opacity:.55;cursor:wait}.copy,.full,.body-action,.scenario-action,.run-action,.open-command,.edit-library,.edit-command,.delete-library,.delete-command,.reload-command,.repo-library,.repo-command,.favorite-toggle,.move,.group-move,.explain-action,.group-action{padding:5px 8px}.favorite-toggle{min-width:32px;font-size:15px}.delete-library,.delete-command{color:#fecaca}.status{margin:0 8px 8px;padding:8px;border-radius:8px;background:#172554;color:#bfdbfe;white-space:pre-wrap}.empty{padding:18px;color:#94a3b8;text-align:center}.overlay{position:fixed;inset:0;z-index:2147483647;background:rgba(2,8,23,.72);display:flex;align-items:center;justify-content:center;padding:18px}.modal{width:min(820px,96vw);max-height:90vh;overflow:auto;background:#0b1220;color:#f8fafc;border:1px solid #475569;border-radius:14px;padding:14px;font:13px/1.45 system-ui}.modal h2{margin:0 0 8px}.modal p{color:#cbd5e1}.modal textarea{width:100%;min-height:360px;padding:10px;background:#020817;color:#f8fafc;border:1px solid #475569;border-radius:8px;font:12px/1.45 ui-monospace,monospace}.modal input,.modal select{width:100%;padding:8px;background:#020817;color:#fff;border:1px solid #475569;border-radius:8px}.group-level{display:inline-block;margin-left:8px;padding:1px 6px;border:1px solid #475569;border-radius:999px;color:#cbd5e1;font-size:10px;text-transform:uppercase;letter-spacing:.04em}.group-editor{display:grid;grid-template-columns:minmax(180px,1fr) 160px auto;gap:6px;align-items:center;margin:6px 0;padding:7px;border:1px solid #26364f;border-radius:8px;background:#0d1728}.group-editor-actions{display:flex;gap:5px;flex-wrap:wrap}.fields{display:grid;grid-template-columns:1fr 1fr;gap:8px}.field{display:grid;gap:4px}.field-wide{grid-column:1/-1}.modal-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:10px}.preview{margin-top:10px;padding:10px;border:1px solid #334155;border-radius:8px;background:#07101f;white-space:pre-wrap}.scenario-card{border:1px solid #26364f;border-radius:10px;background:#0d1728;margin:6px 0;padding:10px}.scenario-intro,.scenario-step-text,.body-text{white-space:pre-wrap;font:12px/1.45 ui-monospace,monospace;background:#07101f;border:1px solid #334155;border-radius:8px;padding:10px}.scenario-step{margin-top:12px}.scenario-step h3{margin:0 0 6px}.equivalents{display:flex;flex-direction:column;gap:6px;margin-top:8px}.equivalent{display:flex;gap:8px;align-items:flex-start;justify-content:space-between;border-left:3px solid #475569;padding:6px 8px;background:#0b1220}.equivalent-main{min-width:0}.danger{color:#fecaca}.ok{color:#bbf7d0}
.command-views{overflow:auto;flex-wrap:nowrap}.command-view{white-space:nowrap}.command-view-count{margin-left:5px;color:#94a3b8;font-size:10px}.command-view[aria-selected=true] .command-view-count{color:#ccfbf1}.command-group-nav{display:none;padding:8px;border-top:1px solid #1e293b;border-bottom:1px solid #1e293b;background:#0a1322}.command-group-nav[data-visible=true]{display:block}.group-nav-top{display:flex;align-items:center;gap:7px;margin-bottom:7px}.group-nav-title{font-weight:800}.group-nav-hint,.group-nav-stats{font-size:10px;color:#94a3b8}.group-nav-stats{margin-left:auto}.group-nav-actions{display:flex;gap:4px}.group-chip-list{display:flex;gap:5px;flex-wrap:wrap}.group-chip{display:inline-flex;align-items:center;gap:5px;padding:5px 7px;border-radius:8px;background:#111b2e;color:#cbd5e1}.group-chip[aria-pressed=true]{background:#164e63;border-color:#0e7490;color:#ecfeff}.group-chip.all[aria-pressed=true]{background:#334155;border-color:#64748b}.group-chip-index,.group-chip-count{font-size:10px;color:#94a3b8}.group-chip[aria-pressed=true] .group-chip-index,.group-chip[aria-pressed=true] .group-chip-count{color:#cffafe}.body.command-body{padding:0;overflow:hidden}.command-layout{display:grid;grid-template-columns:minmax(0,1.45fr) minmax(300px,.82fr);height:100%;min-height:0}.command-list{overflow:auto;padding:8px;min-width:0}.command-detail{overflow:auto;border-left:1px solid #334155;background:#08111f;padding:12px;min-width:0}.command-detail.empty-detail{color:#94a3b8;display:flex;align-items:center;justify-content:center;text-align:center}.command-detail-title{font-size:16px;font-weight:850;margin:0 0 4px}.command-detail-path{font-size:11px;color:#94a3b8;margin-bottom:10px}.meaning-box{border:1px solid #334155;border-radius:9px;background:#0d1728;padding:9px;margin:7px 0}.meaning-box h3{margin:0 0 5px;font-size:11px}.meaning-box p{margin:0;color:#cbd5e1;font-size:11px;line-height:1.45;white-space:pre-wrap}.detail-actions{display:flex;gap:5px;flex-wrap:wrap;margin:10px 0}.detail-group-field{display:grid;gap:5px;margin-top:10px}.detail-group-field label{font-size:11px;font-weight:800}.detail-group-field select{width:100%;padding:7px;background:#020817;color:#fff;border:1px solid #475569;border-radius:8px}.detail-note{color:#94a3b8;font-size:10px;margin-top:6px}.command-group{margin:7px 0;border:1px solid #26364f;border-radius:10px;background:#0d1728;overflow:hidden;scroll-margin-top:8px}.command-group-head{width:100%;display:grid;grid-template-columns:26px minmax(0,1fr) auto auto;gap:7px;align-items:center;padding:8px 9px;text-align:left;border:0;border-bottom:1px solid #26364f;border-radius:0;background:#111b2e}.command-group-order{width:24px;height:24px;border:1px solid #475569;border-radius:7px;display:grid;place-items:center;color:#94a3b8;font-size:10px}.command-group-label{font-weight:800;min-width:0}.command-group-count{font-size:10px;color:#94a3b8}.command-group-chevron{color:#94a3b8}.command-group[data-collapsed=true] .command-group-rows{display:none}.command-group[data-collapsed=true] .command-group-chevron{transform:rotate(-90deg)}.command-card{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:7px;padding:8px 9px;border-top:1px solid #1e293b;background:#0b1220;cursor:pointer}.command-card:hover{background:#101d31}.command-card[data-selected=true]{background:#10294a;box-shadow:inset 3px 0 0 #3b82f6}.command-card-label{font-weight:750}.command-card-meta{font-size:10px;color:#94a3b8;margin-top:2px}.command-card-context{display:none;font-size:10px;color:#64748b;margin-top:3px}.command-layout[data-all=true] .command-card-context{display:block}.command-card-actions{display:flex;gap:3px;align-items:start}.command-card-actions button{padding:4px 6px}.group-editor{grid-template-columns:minmax(180px,1fr) auto}.group-editor .group-level{display:none}.group-manager-note{color:#cbd5e1}.non-command-body{padding:8px;overflow:auto;height:100%}
@media(max-width:900px){.command-layout{grid-template-columns:1fr}.command-detail{display:none}.panel{min-width:min(560px,calc(100vw - 16px))}}
@media(max-width:760px){.panel{min-width:0;width:calc(100vw - 16px)!important;left:8px!important}.row{grid-template-columns:1fr}.actions{justify-content:flex-start;flex-wrap:wrap}.entry-entries{padding-left:7px}.group-nav-top{align-items:flex-start;flex-wrap:wrap}.group-nav-stats{margin-left:0}.command-group-head{grid-template-columns:24px minmax(0,1fr) auto}.command-group-count{display:none}}
</style><button class="launcher" type="button">Planning</button><section class="panel" data-open="false"><div class="header"><div class="title"><div class="title-main">OBS Planning Helper</div><div class="title-sub">local working cache · GitHub-backed semantic Commands + canonical Scenarios · explicit Hard Reload</div></div><button class="close" type="button">×</button></div><div class="tabs">${[SURFACES.COMMANDS,SURFACES.SCENARIOS,SURFACES.PROMPTS].filter(Boolean).map((surface)=>`<button class="tab" type="button" data-surface="${surface}" aria-selected="false">${surface}</button>`).join('')}</div><div class="command-views"></div><div class="surface-tools"><button class="tool new-library" type="button">New</button><button class="tool import-chat" type="button">Import</button><button class="tool restore-chat" type="button">Restore copy</button><button class="tool recovery-request" type="button">Recovery request</button><button class="tool check-github" type="button">Check GitHub</button><button class="tool sync-github" type="button">Sync missing</button><button class="tool hard-reload" type="button">Hard Reload GitHub</button><button class="tool manage-groups" type="button">Manage groups</button><button class="tool save-order" type="button">Save order GitHub</button><button class="tool publish-local" type="button">Publish local changes</button><button class="tool settings" type="button">Settings</button></div><div class="search-wrap"><input class="search" type="search" placeholder="Search current surface…"></div><div class="command-group-nav" data-visible="false"></div><div class="body"></div></section>`;

    const launcher=root.querySelector('.launcher'),panel=root.querySelector('.panel'),header=root.querySelector('.header'),closeButton=root.querySelector('.close'),searchInput=root.querySelector('.search'),body=root.querySelector('.body'),tabButtons=[...root.querySelectorAll('.tab')],commandViewBar=root.querySelector('.command-views'),commandGroupNav=root.querySelector('.command-group-nav'),newLibraryButton=root.querySelector('.new-library'),manageGroupsButton=root.querySelector('.manage-groups');
    function entriesForSurface(surface){if(surface===SURFACES.COMMANDS)return commandEntries;if(surface===SURFACES.SCENARIOS)return scenarioEntries;if(surface===SURFACES.PROMPTS)return promptEntries;if(surface===SURFACES.USE_CASES)return useCaseEntries;return[];}
    function currentMethodologyViews(){return deps.methodologyViewDefinitions?deps.methodologyViewDefinitions(commandEntries):[];}
    function normalizeActiveMethodologyView(){const views=currentMethodologyViews();if(activeMethodologyView===ALL_METHODOLOGY_VIEW)return views;if(!views.some((view)=>view.id===activeMethodologyView))activeMethodologyView=views[0]?.id||ALL_METHODOLOGY_VIEW;return views;}
    function renderMethodologyViewButtons(){const views=normalizeActiveMethodologyView();commandViewBar.innerHTML='';for(const view of views){const control=document.createElement('button');control.type='button';control.className='command-view';control.dataset.commandView=view.id;control.innerHTML='<span class="command-view-label"></span><small class="command-view-count"></small>';control.querySelector('.command-view-label').textContent=view.label;control.querySelector('.command-view-count').textContent=String(view.count||0);control.setAttribute('aria-selected',String(view.id===activeMethodologyView));control.addEventListener('click',()=>switchMethodologyView(view.id));commandViewBar.append(control);}const all=document.createElement('button');all.type='button';all.className='command-view';all.dataset.commandView=ALL_METHODOLOGY_VIEW;all.innerHTML='<span class="command-view-label">All commands</span><small class="command-view-count"></small>';all.querySelector('.command-view-count').textContent=String(commandEntries.length);all.setAttribute('aria-selected',String(activeMethodologyView===ALL_METHODOLOGY_VIEW));all.addEventListener('click',()=>switchMethodologyView(ALL_METHODOLOGY_VIEW));commandViewBar.append(all);manageGroupsButton.disabled=activeMethodologyView===ALL_METHODOLOGY_VIEW;manageGroupsButton.title=activeMethodologyView===ALL_METHODOLOGY_VIEW?'Choose a normal command tab to manage its groups.':'Create, rename, reorder or delete groups in the current command tab.';searchInput.placeholder=activeMethodologyView===ALL_METHODOLOGY_VIEW?'Search across all commands…':`Search ${views.find((view)=>view.id===activeMethodologyView)?.label||'commands'}…`; }
    function applyState(result={}){if(result.commandEntries)commandEntries=[...result.commandEntries];if(result.scenarioEntries)scenarioEntries=[...result.scenarioEntries];if(result.promptEntries)promptEntries=[...result.promptEntries];if(result.useCaseEntries)useCaseEntries=[...result.useCaseEntries];if(result.favoriteCommandIds)favoriteCommandIds=[...result.favoriteCommandIds];if(result.favoriteUseCaseIds)favoriteUseCaseIds=[...result.favoriteUseCaseIds];if(result.catalogOrder)catalogOrder=result.catalogOrder;renderMethodologyViewButtons();renderEntries(searchInput.value);}
    function setCommandEntries(entries){commandEntries=[...(entries||[])];renderMethodologyViewButtons();if(activeSurface===SURFACES.COMMANDS)renderEntries(searchInput.value);}function setScenarioEntries(entries){scenarioEntries=[...(entries||[])];if(activeSurface===SURFACES.SCENARIOS)renderEntries(searchInput.value);}function setUseCaseEntries(entries){useCaseEntries=[...(entries||[])];if(activeSurface===SURFACES.USE_CASES)renderEntries(searchInput.value);}function setLibraryEntries(result={}){if(result.promptEntries)promptEntries=[...result.promptEntries];if(activeSurface===SURFACES.PROMPTS)renderEntries(searchInput.value);}
    function showStatus(text,ms=5000){let node=root.querySelector('.status');if(!node){node=document.createElement('div');node.className='status';panel.append(node);}node.textContent=String(text||'');if(statusTimer!==null)clearTimeout(statusTimer);if(ms>0)statusTimer=setTimeout(()=>node.remove(),ms);}
    function setBusy(){for(const button of root.querySelectorAll('.surface-tools button,.actions button'))button.disabled=operationBusy||insertionBusy;}
    function setOpen(value){isOpen=Boolean(value);panel.dataset.open=String(isOpen);launcher.style.display=isOpen||dashboardOpen?'none':'block';if(isOpen)keepPanelInViewport();}
    function switchSurface(surface){activeSurface=surface;for(const button of tabButtons)button.setAttribute('aria-selected',String(button.dataset.surface===surface));commandViewBar.style.display=surface===SURFACES.COMMANDS?'flex':'none';commandGroupNav.dataset.visible=String(surface===SURFACES.COMMANDS);if(surface===SURFACES.COMMANDS)renderMethodologyViewButtons();newLibraryButton.style.display=surface===SURFACES.SCENARIOS?'none':'inline-block';manageGroupsButton.style.display=surface===SURFACES.COMMANDS?'inline-block':'none';searchInput.value='';renderEntries('');}function switchMethodologyView(view){activeMethodologyView=view;writeLocalText(ACTIVE_VIEW_KEY,view);renderMethodologyViewButtons();searchInput.value='';renderEntries('');}
    async function insertBody(text,success,id,invocation={}){if(!text||insertionBusy)return;insertionBusy=true;setBusy();try{showStatus(await options.onInsert(text,success,id,invocation),7000);}catch(error){showStatus(error.message||String(error),7000);}finally{insertionBusy=false;setBusy();}}
    async function copyBody(text,id,invocation={}){try{showStatus(await options.onCopy(text,id,invocation)?'Copied.':'Copy failed.',4000);}catch(error){showStatus(error.message||String(error),7000);}}
    function button(text,cls,handler,title=''){const b=document.createElement('button');b.type='button';b.textContent=text;b.className=cls;if(title)b.title=title;b.addEventListener('click',(event)=>{event.preventDefault();event.stopPropagation();handler(event);});return b;}
    function commandExecutionId(entry){return entry?.directCommandId||entry?.id||'';}
    function scenarioUseGroups(entry){const byId=new Map();for(const use of entry?.scenarioUses||[]){if(!byId.has(use.scenarioId))byId.set(use.scenarioId,{scenarioId:use.scenarioId,scenarioTitle:use.scenarioTitle,steps:[]});byId.get(use.scenarioId).steps.push({stepId:use.stepId,stepTitle:use.stepTitle});}return[...byId.values()];}
    function commandMetadataText(entry){const definition=entry.definition||null,binding=definition?.methodologyBinding||null;return[
      entry.provenance||entry.stateLabel?`Provenance: ${entry.provenance||entry.stateLabel}`:'',
      entry.canonicalId?`Semantic owner: ${entry.canonicalId}`:'',
      entry.semanticKind?`Kind: ${entry.semanticScope||'Core'} ${entry.semanticKind}`:'',
      entry.directCommandId?`Direct command id: ${entry.directCommandId}`:'',
      definition?.command?`Direct trigger: ${definition.command}`:'',
      definition?.commandFamily?.length?`Aliases: ${definition.commandFamily.join(' · ')}`:'',
      definition?.permissionMode?`Permission: ${definition.permissionMode}`:'',
      binding?.targetModuleId?`Target Module: ${binding.targetModuleId}`:'',
      binding?.lensId?`Lens: ${binding.lensId}`:'',
      entry.repositoryPath?`Command source: ${entry.repositoryPath}`:'',
      (entry.ownerFiles||[]).length?`Owners / sources:\n${(entry.ownerFiles||[]).map((x)=>`- ${x}`).join('\n')}`:'',
      (entry.semanticSources||[]).length?`Semantic sources:\n${(entry.semanticSources||[]).map((x)=>`- ${x}`).join('\n')}`:''
    ].filter(Boolean).join('\n\n');}
    function openCommandExplanation(entry){const{overlay,modal}=makeOverlay(`Контекст / Результат / Суть · ${entry.actionLabel||entry.label||entry.id}`);for(const [label,value] of [['Контекст',entry.context],['Результат',entry.result],['Суть',entry.essence]]){const h=document.createElement('h3');h.textContent=label;const box=document.createElement('div');box.className='preview';box.textContent=String(value||'—');modal.append(h,box);}const actions=document.createElement('div');actions.className='modal-actions';actions.append(button('Close','',()=>closeOverlay(overlay)));modal.append(actions);}
    function commandGroupsForView(viewId){return(catalogOrder?.commandGroups||[]).filter((group)=>group.viewId===viewId).sort((a,b)=>(Number(a.order)||0)-(Number(b.order)||0)||String(a.label).localeCompare(String(b.label)));}
    function commandGroupsForEntry(entry){const viewId=deps.semanticNavigation?deps.semanticNavigation(entry).viewId:'';return commandGroupsForView(viewId);}
    function activeGroupView(){if(activeMethodologyView&&activeMethodologyView!==ALL_METHODOLOGY_VIEW)return activeMethodologyView;return deps.METHODOLOGY_VIEW_IDS?.GENERAL||'GENERAL';}
    function openGroupPicker(entry){const viewId=deps.semanticNavigation?deps.semanticNavigation(entry).viewId:'GENERAL',groups=commandGroupsForEntry(entry),{overlay,modal}=makeOverlay(`Группа · ${entry.actionLabel||entry.label||entry.id}`),note=document.createElement('p');note.textContent='Grouping is presentation-only. Save order GitHub persists membership. Other / Ungrouped keeps cards visible if their group is removed.';modal.append(note);const actions=document.createElement('div');actions.className='modal-actions';const assign=async(groupId)=>{try{const result=await options.onAssignCatalogGroup(entry.id,groupId,viewId);applyState(result);closeOverlay(overlay);showStatus(groupId?'Group changed locally; use Save order GitHub to persist it.':'Moved to Other / Ungrouped locally; use Save order GitHub to persist it.',7000);}catch(error){showStatus(error.message||String(error),7000);}};actions.append(button('Other / Ungrouped','group-action',()=>assign('')));for(const group of groups)if(group.label!=='Other / Ungrouped')actions.append(button(group.label,'group-action',()=>assign(group.id)));actions.append(button('Cancel','',()=>closeOverlay(overlay)));modal.append(actions);}
    function openGroupManager(){const viewId=activeGroupView(),view=currentMethodologyViews().find((item)=>item.id===viewId),{overlay,modal}=makeOverlay(`Manage groups · ${view?.label||viewId}`),note=document.createElement('p');note.className='group-manager-note';note.textContent='One ordered presentation-group list per tab. Create, rename, reorder or delete groups. Deleting a group moves its cards to Other / Ungrouped. Collapsed/expanded state and selected group filters are personal UI state and are saved automatically.';modal.append(note);for(const group of commandGroupsForView(viewId)){const row=document.createElement('div');row.className='group-editor';const name=document.createElement('input');name.value=group.label;name.disabled=group.label==='Other / Ungrouped';const actions=document.createElement('div');actions.className='group-editor-actions';actions.append(button('Save','group-action',async()=>{try{applyState(await options.onUpdateCatalogGroup(group.id,{label:name.value}));closeOverlay(overlay);showStatus('Group updated locally; use Save order GitHub to persist it.',7000);}catch(error){showStatus(error.message||String(error),7000);}}),button('↑','group-action',async()=>{try{applyState(await options.onMoveCatalogGroup(group.id,-1));closeOverlay(overlay);showStatus('Group moved locally; use Save order GitHub to persist it.',7000);}catch(error){showStatus(error.message||String(error),7000);}}),button('↓','group-action',async()=>{try{applyState(await options.onMoveCatalogGroup(group.id,1));closeOverlay(overlay);showStatus('Group moved locally; use Save order GitHub to persist it.',7000);}catch(error){showStatus(error.message||String(error),7000);}}));if(group.label!=='Other / Ungrouped')actions.append(button('Delete','danger',async()=>{try{applyState(await options.onDeleteCatalogGroup(group.id));closeOverlay(overlay);showStatus('Group deleted locally; its cards moved to Other / Ungrouped. Use Save order GitHub to persist it.',8000);}catch(error){showStatus(error.message||String(error),7000);}}));row.append(name,actions);modal.append(row);}const h=document.createElement('h3');h.textContent='New group';const createRow=document.createElement('div');createRow.className='group-editor';const newName=document.createElement('input');newName.placeholder='Group name';const createActions=document.createElement('div');createActions.className='group-editor-actions';createActions.append(button('Create','group-action',async()=>{try{applyState(await options.onCreateCatalogGroup({viewId,label:newName.value}));closeOverlay(overlay);showStatus('Group created locally; use Save order GitHub to persist it.',7000);}catch(error){showStatus(error.message||String(error),7000);}}));createRow.append(newName,createActions);const footer=document.createElement('div');footer.className='modal-actions';footer.append(button('Close','',()=>closeOverlay(overlay)));modal.append(h,createRow,footer);}
    function openCommandBody(entry){const{overlay,modal}=makeOverlay(`Body · ${entry.label||entry.command||entry.id}`),meta=document.createElement('div');meta.className='preview ok';meta.textContent=commandMetadataText(entry)||'Semantic invocation projection.';const adaptiveTitle=document.createElement('h3');adaptiveTitle.textContent='Canonical invocation body';const pre=document.createElement('div');pre.className='body-text';pre.textContent=entry.adaptiveBody||entry.text||'';modal.append(meta,adaptiveTitle,pre);if(entry.fullBody&&entry.fullBody!==entry.adaptiveBody){const fullTitle=document.createElement('h3');fullTitle.textContent='Full-read invocation body';const full=document.createElement('div');full.className='body-text';full.textContent=entry.fullBody;modal.append(fullTitle,full);}const actions=document.createElement('div');actions.className='modal-actions';actions.append(button('Copy body','copy',()=>copyBody(entry.adaptiveBody||entry.text,commandExecutionId(entry))),button('Run','run-action',()=>insertBody(entry.adaptiveBody||entry.text,`Inserted ${entry.label||entry.id}`,commandExecutionId(entry))));if(entry.fullBody&&entry.fullBody!==entry.adaptiveBody)actions.append(button('Run Full','full',()=>insertBody(entry.fullBody,`Inserted full ${entry.label||entry.id}`,commandExecutionId(entry))));actions.append(button('Close','',()=>closeOverlay(overlay)));modal.append(actions);}
    function openCommandById(id){closeOverlay(activeOverlay);switchSurface(SURFACES.COMMANDS);searchInput.value=String(id||'');renderEntries(searchInput.value);}
    function openScenarioDetails(entry){const{overlay,modal}=makeOverlay(entry.label||`${entry.id} · ${entry.title}`),meta=document.createElement('p');meta.textContent=[`Type: ${entry.type}`,entry.entryRoute?`Entry route: ${entry.entryRoute}`:'',entry.assumptions?.length?`Assumptions: ${entry.assumptions.join(' · ')}`:''].filter(Boolean).join('\n');const intro=document.createElement('div');intro.className='scenario-intro';intro.textContent=entry.canonicalIntro||'';modal.append(meta,intro);for(const step of entry.steps||[]){const section=document.createElement('section');section.className='scenario-step';const h=document.createElement('h3');h.textContent=`${step.id} · ${step.title}`;const prose=document.createElement('div');prose.className='scenario-step-text';prose.textContent=step.canonicalText||'';section.append(h,prose);const equivalents=document.createElement('div');equivalents.className='equivalents';for(const eq of step.commandEquivalents||[]){const card=document.createElement('div');card.className='equivalent';const main=document.createElement('div');main.className='equivalent-main';const strong=document.createElement('strong');strong.textContent=eq.label||eq.id;const small=document.createElement('div');small.className='row-meta';small.textContent=[eq.provenance||eq.stateLabel,eq.canonicalId].filter(Boolean).join(' · ');main.append(strong,small);const actions=document.createElement('div');actions.className='actions';actions.append(button('Run','run-action',()=>insertBody(eq.adaptiveBody,`Inserted ${eq.label||eq.id}`,commandExecutionId(eq))),button('Body','body-action',()=>openCommandBody(eq)),button('Open command','open-command',()=>openCommandById(eq.id)));card.append(main,actions);equivalents.append(card);}if((step.commandEquivalents||[]).length){const title=document.createElement('div');title.className='row-meta';title.textContent='Derived command equivalents';section.append(title,equivalents);}modal.append(section);}const actions=document.createElement('div');actions.className='modal-actions';actions.append(button('Close','',()=>closeOverlay(overlay)));modal.append(actions);}
    function openCommandScenarios(entry){const groups=scenarioUseGroups(entry),{overlay,modal}=makeOverlay(`Scenarios · ${entry.label||entry.id}`);if(!groups.length){const empty=document.createElement('p');empty.textContent='This command has no canonical Scenario equivalents.';modal.append(empty);}for(const group of groups){const scenario=scenarioEntries.find((item)=>item.id===group.scenarioId),card=document.createElement('div');card.className='scenario-card';const title=document.createElement('strong');title.textContent=`${group.scenarioId} · ${group.scenarioTitle}`;const steps=document.createElement('div');steps.className='row-meta';steps.textContent=group.steps.map((step)=>`${step.stepId}: ${step.stepTitle}`).join('\n');const actions=document.createElement('div');actions.className='modal-actions';actions.append(button('Open scenario','scenario-action',()=>{closeOverlay(overlay);if(scenario)openScenarioDetails(scenario);else{switchSurface(SURFACES.SCENARIOS);searchInput.value=group.scenarioId;renderEntries(searchInput.value);}}));card.append(title,steps,actions);modal.append(card);}const actions=document.createElement('div');actions.className='modal-actions';actions.append(button('Close','',()=>closeOverlay(overlay)));modal.append(actions);}
    function groupsForActiveView(){const all=entriesForSurface(SURFACES.COMMANDS);return activeMethodologyView===ALL_METHODOLOGY_VIEW?(deps.buildAllMethodologyGroups?deps.buildAllMethodologyGroups(all):[]):(deps.buildMethodologyViewGroups?deps.buildMethodologyViewGroups(all,activeMethodologyView):[]);}
    function selectedGroupIds(groups){return deps.normalizeSelectedGroupIds?deps.normalizeSelectedGroupIds(groups,readLocalJson(filterStateKey(activeMethodologyView),null)):null;}
    function saveSelectedGroupIds(groups,ids){const normalized=deps.normalizeSelectedGroupIds?deps.normalizeSelectedGroupIds(groups,ids):ids;writeLocalJson(filterStateKey(activeMethodologyView),normalized);return normalized;}
    function groupCollapsed(group){return readLocalText(collapseStateKey(activeMethodologyView,group.id))==='1';}
    function setGroupCollapsed(group,value){writeLocalText(collapseStateKey(activeMethodologyView,group.id),value?'1':'0');}
    function renderGroupNavigator(groups){commandGroupNav.innerHTML='';commandGroupNav.dataset.visible=String(activeSurface===SURFACES.COMMANDS);if(activeSurface!==SURFACES.COMMANDS)return;const selected=selectedGroupIds(groups),top=document.createElement('div');top.className='group-nav-top';const title=document.createElement('span');title.className='group-nav-title';title.textContent='Groups';const hint=document.createElement('span');hint.className='group-nav-hint';hint.textContent='First group click isolates it; select more to combine.';const stats=document.createElement('span');stats.className='group-nav-stats';stats.textContent=selected?`Selected ${selected.length} / ${groups.length}`:`All ${groups.length}`;const navActions=document.createElement('span');navActions.className='group-nav-actions';const fav=button(favoritesOnly?'★ Favorites':'☆ Favorites','group-action',()=>{favoritesOnly=!favoritesOnly;renderEntries(searchInput.value);});fav.setAttribute('aria-pressed',String(favoritesOnly));navActions.append(fav,button('Expand','group-action',()=>{for(const group of visibleGroupsForSelection(groups,selected))setGroupCollapsed(group,false);renderEntries(searchInput.value);}),button('Collapse','group-action',()=>{for(const group of visibleGroupsForSelection(groups,selected))setGroupCollapsed(group,true);renderEntries(searchInput.value);}));top.append(title,hint,stats,navActions);const chips=document.createElement('div');chips.className='group-chip-list';const all=button('All groups','group-chip all',()=>{saveSelectedGroupIds(groups,null);renderEntries(searchInput.value);});all.setAttribute('aria-pressed',String(!selected));const allCount=document.createElement('span');allCount.className='group-chip-count';allCount.textContent=String(groups.length);all.append(allCount);chips.append(all);groups.forEach((group,index)=>{const label=activeMethodologyView===ALL_METHODOLOGY_VIEW?`${group.viewLabel} · ${group.label}`:group.label,chip=button(label,'group-chip',()=>{const next=deps.toggleSelectedGroupId?deps.toggleSelectedGroupId(groups,selected,group.id):(selected?.includes(group.id)?selected.filter((id)=>id!==group.id):[...(selected||[]),group.id]);saveSelectedGroupIds(groups,next);renderEntries(searchInput.value);});chip.setAttribute('aria-pressed',String(Boolean(selected?.includes(group.id))));const indexNode=document.createElement('span');indexNode.className='group-chip-index';indexNode.textContent=String(index+1);chip.prepend(indexNode);const count=document.createElement('span');count.className='group-chip-count';count.textContent=String(group.entries.length);chip.append(count);chips.append(chip);});commandGroupNav.append(top,chips);}
    function visibleGroupsForSelection(groups,selected){if(deps.filterGroupsBySelection)return deps.filterGroupsBySelection(groups,selected);if(!selected)return groups;const ids=new Set(selected);return groups.filter((group)=>ids.has(group.id));}
    function commandMatches(entry,needle){return!needle||JSON.stringify([entry.id,entry.label,entry.description,entry.command,entry.context,entry.result,entry.essence,entry.__methodologyNav?.kindLabel,entry.provenance,entry.stateLabel]).toLowerCase().includes(needle);}
    function selectCommand(entry){selectedCommandId=entry?.id||'';for(const[id,row]of commandCardNodes)row.dataset.selected=String(id===selectedCommandId);if(activeCommandDetail)renderCommandDetail(activeCommandDetail,entry||null);}
    function commandCard(entry,group){const row=document.createElement('div');row.className='command-card';row.dataset.selected=String(entry.id===selectedCommandId);commandCardNodes.set(entry.id,row);const main=document.createElement('div');const label=document.createElement('div');label.className='command-card-label';label.textContent=entry.actionLabel||entry.label||entry.command||entry.id;const meta=document.createElement('div');meta.className='command-card-meta';meta.textContent=[entry.__methodologyNav?.kindLabel,entry.description,entry.provenance||entry.stateLabel].filter(Boolean).join(' · ');main.append(label,meta);if(activeMethodologyView===ALL_METHODOLOGY_VIEW){const context=document.createElement('div');context.className='command-card-context';context.textContent=`${group.viewLabel} › ${group.label}`;main.append(context);}const actions=document.createElement('div');actions.className='command-card-actions';actions.append(button('Run','run-action',()=>insertBody(entry.adaptiveBody||entry.text,`Inserted ${entry.label||entry.id}`,commandExecutionId(entry))));const isFav=favoriteCommandIds.includes(entry.id);actions.append(button(isFav?'★':'☆','favorite-toggle',async()=>{try{applyState(await options.onToggleFavoriteCommand(entry.id));}catch(error){showStatus(error.message||String(error),7000);}},isFav?'Remove favorite':'Add favorite'));row.append(main,actions);row.addEventListener('click',(event)=>{if(event.target.closest('button'))return;selectCommand(entry);});return row;}
    function renderCommandDetail(container,entry){container.innerHTML='';if(!entry){container.classList.add('empty-detail');container.textContent='Select a command to see Context, Result, Essence and actions.';return;}container.classList.remove('empty-detail');const nav=deps.semanticNavigation?deps.semanticNavigation(entry):null,title=document.createElement('h2');title.className='command-detail-title';title.textContent=entry.actionLabel||entry.label||entry.command||entry.id;const path=document.createElement('div');path.className='command-detail-path';path.textContent=[nav?.viewLabel,nav?.sectionLabel].filter(Boolean).join(' › ');container.append(title,path);for(const [label,value] of [['Контекст',entry.context],['Результат',entry.result],['Суть',entry.essence]]){const box=document.createElement('section');box.className='meaning-box';const h=document.createElement('h3');h.textContent=label;const p=document.createElement('p');p.textContent=String(value||'—');box.append(h,p);container.append(box);}const actions=document.createElement('div');actions.className='detail-actions';const uses=scenarioUseGroups(entry);actions.append(button('Run','run-action',()=>insertBody(entry.adaptiveBody||entry.text,`Inserted ${entry.label||entry.id}`,commandExecutionId(entry))),button('Body','body-action',()=>openCommandBody(entry)),button(`Scenarios ${uses.length}`,'scenario-action',()=>openCommandScenarios(entry)));const isFav=favoriteCommandIds.includes(entry.id);actions.append(button(isFav?'★ Favorite':'☆ Favorite','favorite-toggle',async()=>{try{applyState(await options.onToggleFavoriteCommand(entry.id));}catch(error){showStatus(error.message||String(error),7000);}}));const executionId=commandExecutionId(entry),invocationEffects=typeof options.onGetInvocationSideEffects==='function'?options.onGetInvocationSideEffects(executionId):[];if(invocationEffects.includes('capture-chat-context'))actions.append(button('Bind + Run','bind-insert',()=>insertBody(entry.adaptiveBody||entry.text,`Inserted ${entry.label||entry.id} with chat binding`,executionId,{effectIds:['capture-chat-context']}),'Create a one-invocation chatContextToken.'));container.append(actions);const field=document.createElement('div');field.className='detail-group-field';const fieldLabel=document.createElement('label');fieldLabel.textContent='Group';const select=document.createElement('select'),viewId=nav?.viewId||'',groups=commandGroupsForView(viewId);for(const group of groups){const option=document.createElement('option');option.value=group.id;option.textContent=group.label;option.selected=group.id===nav?.sectionId;select.append(option);}select.addEventListener('change',async()=>{try{applyState(await options.onAssignCatalogGroup(entry.id,select.value,viewId));showStatus('Group changed locally; use Save order GitHub to persist it.',6000);}catch(error){showStatus(error.message||String(error),7000);}});field.append(fieldLabel,select);container.append(field);const note=document.createElement('div');note.className='detail-note';note.textContent='Group changes presentation only; semantic identity and ownership do not change.';container.append(note);if(entry.entityType==='planning-command'||entry.entityType==='semantic-command-direct'){const admin=document.createElement('div');admin.className='detail-actions';admin.append(button('Edit','edit-command',()=>openCommandEditor(entry)),button('Reload','reload-command',()=>reloadCommand(entry)),button('Save GitHub','repo-command',()=>saveRepository(entry)),button('Delete','delete-command',()=>deleteCommand(entry)));container.append(admin);}}
    function renderCommandSurface(needle){commandCardNodes=new Map();const groups=groupsForActiveView();renderGroupNavigator(groups);const selected=selectedGroupIds(groups),visible=visibleGroupsForSelection(groups,selected),layout=document.createElement('div');layout.className='command-layout';layout.dataset.all=String(activeMethodologyView===ALL_METHODOLOGY_VIEW);const list=document.createElement('div');list.className='command-list';const detail=document.createElement('aside');detail.className='command-detail';let visibleCount=0;for(const group of visible){const entries=group.entries.filter((entry)=>commandMatches(entry,needle)&&(!favoritesOnly||favoriteCommandIds.includes(entry.id)));if(!entries.length)continue;visibleCount+=entries.length;const section=document.createElement('section');section.className='command-group';section.dataset.collapsed=String(groupCollapsed(group));const head=document.createElement('button');head.type='button';head.className='command-group-head';const order=document.createElement('span');order.className='command-group-order';order.textContent=String(groups.indexOf(group)+1);const label=document.createElement('span');label.className='command-group-label';label.textContent=activeMethodologyView===ALL_METHODOLOGY_VIEW?`${group.viewLabel} · ${group.label}`:group.label;const count=document.createElement('span');count.className='command-group-count';count.textContent=`${entries.length} command${entries.length===1?'':'s'}`;const chev=document.createElement('span');chev.className='command-group-chevron';chev.textContent='⌄';head.append(order,label,count,chev);head.addEventListener('click',()=>{setGroupCollapsed(group,section.dataset.collapsed!=='true');renderEntries(searchInput.value);});const rows=document.createElement('div');rows.className='command-group-rows';for(const entry of entries)rows.append(commandCard(entry,group));section.append(head,rows);list.append(section);}if(!visibleCount){const empty=document.createElement('div');empty.className='empty';empty.textContent='No commands for the current search and group selection.';list.append(empty);}const visibleEntries=visible.flatMap((group)=>group.entries.filter((entry)=>commandMatches(entry,needle)&&(!favoritesOnly||favoriteCommandIds.includes(entry.id)))),selectedEntry=visibleEntries.find((entry)=>entry.id===selectedCommandId)||visibleEntries[0]||null;if(selectedEntry)selectedCommandId=selectedEntry.id;else selectedCommandId='';activeCommandDetail=detail;renderCommandDetail(detail,selectedEntry);layout.append(list,detail);body.append(layout);}
    function makeEntryRow(entry,{favorite=false}={}){const row=document.createElement('div');row.className='row';if(entry.__methodologyNav?.parentId)row.classList.add('focused');if(entry.__methodologyNav?.related)row.classList.add('related');const info=document.createElement('div');info.className='insert';info.innerHTML='<span class="row-label"></span><span class="row-meta"></span>';info.querySelector('.row-label').textContent=entry.label||entry.title||entry.command||entry.id;info.querySelector('.row-meta').textContent=[entry.__methodologyNav?.kindLabel,entry.description,entry.provenance||entry.stateLabel].filter(Boolean).join(' · ');row.append(info);const actions=document.createElement('div');actions.className='actions';
      if(activeSurface===SURFACES.COMMANDS){const uses=scenarioUseGroups(entry);actions.append(button('Run','run-action',()=>insertBody(entry.adaptiveBody||entry.text,`Inserted ${entry.label||entry.id}`,commandExecutionId(entry))),button('Смысл','explain-action',()=>openCommandExplanation(entry),'Контекст / Результат / Суть'),button('Body','body-action',()=>openCommandBody(entry)),button(`Scenarios ${uses.length}`,'scenario-action',()=>openCommandScenarios(entry)),button('Group','group-action',()=>openGroupPicker(entry),'Move this card to another presentation group'));const isFav=favoriteCommandIds.includes(entry.id);actions.append(button(isFav?'★':'☆','favorite-toggle',async()=>{try{applyState(await options.onToggleFavoriteCommand(entry.id));}catch(error){showStatus(error.message||String(error),7000);}},isFav?'Remove favorite':'Add favorite'));}
      else if(activeSurface===SURFACES.PROMPTS){actions.append(button('Run','run-action',()=>insertBody(entry.adaptiveBody||entry.text,`Inserted ${entry.label||entry.id}`,entry.id)),button('Copy','copy',()=>copyBody(entry.adaptiveBody||entry.text,entry.id)));}
      if(!favorite)actions.append(button('↑','move',()=>moveEntry(entry,-1),'Move up'),button('↓','move',()=>moveEntry(entry,1),'Move down'));
      const executionId=commandExecutionId(entry),invocationEffects=typeof options.onGetInvocationSideEffects==='function'?options.onGetInvocationSideEffects(executionId):[];if(activeSurface===SURFACES.COMMANDS&&invocationEffects.includes('capture-chat-context')){const bindInvocation={effectIds:['capture-chat-context']};actions.append(button('Bind + Run','bind-insert',()=>insertBody(entry.adaptiveBody||entry.text,`Inserted ${entry.label||entry.id} with chat binding`,executionId,bindInvocation),'Create a one-invocation chatContextToken and require only this OBS-ACTION to echo it.'));}
      if(activeSurface===SURFACES.COMMANDS&&(entry.entityType==='planning-command'||entry.entityType==='semantic-command-direct')){actions.append(button('Edit','edit-command',()=>openCommandEditor(entry)),button('Reload','reload-command',()=>reloadCommand(entry)),button('Save GitHub','repo-command',()=>saveRepository(entry)),button('Delete','delete-command',()=>deleteCommand(entry)));}
      else if(entry.entityType==='prompt'||entry.entityType==='legacy-helper-command'){actions.append(button('Edit','edit-library',()=>openLibraryEditor(entry)),button('Save GitHub','repo-library',()=>saveRepository(entry)),button('Delete','delete-library',()=>deleteLibrary(entry)));}
      row.append(actions);return row;}
    function makeScenarioRow(entry){const card=document.createElement('div');card.className='scenario-card';const title=document.createElement('strong');title.textContent=entry.label||`${entry.id} · ${entry.title}`;const meta=document.createElement('div');meta.className='row-meta';meta.textContent=[entry.type,entry.entryRoute].filter(Boolean).join(' · ');const actions=document.createElement('div');actions.className='actions';actions.append(button('Open','scenario-action',()=>openScenarioDetails(entry)));if((entry.steps||[]).some((step)=>(step.commandEquivalents||[]).length)){const count=new Set((entry.steps||[]).flatMap((step)=>(step.commandEquivalents||[]).map((eq)=>eq.id))).size;actions.append(button(`${count} command equivalents`,'body-action',()=>openScenarioDetails(entry)));}actions.append(button('↑','move',()=>moveEntry(entry,-1),'Move up'),button('↓','move',()=>moveEntry(entry,1),'Move down'));card.append(title,meta,actions);return card;}
    async function moveEntry(entry,delta){try{const result=await options.onMoveCatalogItem(activeSurface,entry.id,delta);applyState(result);showStatus('Order changed locally. Save order GitHub when this order should be durable.',5000);}catch(error){showStatus(error.message||String(error),7000);}}
    function renderEntries(query=''){body.innerHTML='';activeCommandDetail=null;commandCardNodes=new Map();const all=entriesForSurface(activeSurface),needle=String(query||'').trim().toLowerCase();body.classList.toggle('command-body',activeSurface===SURFACES.COMMANDS);if(activeSurface===SURFACES.COMMANDS){renderCommandSurface(needle);return;}commandGroupNav.dataset.visible='false';const wrapper=document.createElement('div');wrapper.className='non-command-body';const entries=needle?all.filter((entry)=>JSON.stringify([entry.id,entry.label,entry.title,entry.description,entry.command,entry.context,entry.result,entry.essence,entry.canonicalIntro,(entry.steps||[]).map((step)=>[step.title,step.canonicalText])]).toLowerCase().includes(needle)):all;if(!entries.length){const empty=document.createElement('div');empty.className='empty';empty.textContent=activeSurface===SURFACES.SCENARIOS?'No local catalog rows. Use Hard Reload GitHub to restore current repository content.':'No items.';wrapper.append(empty);body.append(wrapper);return;}if(activeSurface===SURFACES.SCENARIOS){for(const entry of entries)wrapper.append(makeScenarioRow(entry));body.append(wrapper);return;}for(const entry of entries)wrapper.append(makeEntryRow(entry));body.append(wrapper);}
    function makeOverlay(titleText){const overlay=document.createElement('div');overlay.className='overlay';const modal=document.createElement('section');modal.className='modal';const title=document.createElement('h2');title.textContent=titleText;modal.append(title);overlay.append(modal);root.append(overlay);activeOverlay=overlay;return{overlay,modal};}
    function closeOverlay(overlay){overlay.remove();if(activeOverlay===overlay)activeOverlay=null;}
    function commandDraft(){return{schemaVersion:1,id:'new.command',file:'new-command.command.md',command:'новая команда',englishName:'new command',commandFamily:['новая команда','new command'],description:'describe command',meaning:'describe command meaning',activeContextBehavior:'Use the selected current target.',traversalReadMode:'Targeted/full by current owner uncertainty.',ownerFiles:['planning/command-routing.md'],expectedOutput:'Expected result.',permissionMode:'read-only',keyReminders:['Follow the current owner route.'],userTarget:'<target>',palette:true,refinements:[]};}
    function openCommandEditor(entry=null){const{overlay,modal}=makeOverlay(entry?'Edit Planning Command':'New Planning Command');const note=document.createElement('p');note.textContent='Edit the GitHub-backed command definition locally first. Save GitHub on the row is explicit and separate.';const textarea=document.createElement('textarea');textarea.value=JSON.stringify(entry?.definition||commandDraft(),null,2);const actions=document.createElement('div');actions.className='modal-actions';actions.append(button('Cancel','',()=>closeOverlay(overlay)),button('Save local','',async()=>{try{const result=await options.onSaveLocalCommandDefinition(textarea.value,entry?.directCommandId||entry?.id||'');applyState(result);closeOverlay(overlay);showStatus(result.unchanged?'No local content change.':'Saved locally; GitHub was not changed.');}catch(error){showStatus(error.message||String(error),8000);}}));modal.append(note,textarea,actions);}
    function openLibraryEditor(entry=null){const kind=deps.HELPER_LIBRARY_KINDS.PROMPT,{overlay,modal}=makeOverlay(entry?'Edit prompt':'New prompt'),fields=document.createElement('div');fields.className='fields';const titleWrap=document.createElement('label');titleWrap.className='field field-wide';titleWrap.innerHTML='<span>Title</span>';const title=document.createElement('input');title.value=entry?.title||'';titleWrap.append(title);const textWrap=document.createElement('label');textWrap.className='field field-wide';textWrap.innerHTML='<span>Exact insertion text</span>';const textarea=document.createElement('textarea');textarea.value=entry?.text||'';textWrap.append(textarea);const note=document.createElement('p');note.textContent='Save local updates the local working cache only. Save GitHub on the row makes it durable.';const actions=document.createElement('div');actions.className='modal-actions';actions.append(button('Cancel','',()=>closeOverlay(overlay)),button('Save local','',async()=>{try{const result=await options.onSaveLocalLibraryItem({kind,id:entry?.libraryId||'',title:title.value,text:textarea.value,createdAt:entry?.createdAt||''});applyState(result);closeOverlay(overlay);showStatus(result.unchanged?'No local content change.':'Saved locally; GitHub was not changed.');}catch(error){showStatus(error.message||String(error),8000);}}));modal.append(fields,titleWrap,textWrap,note,actions);}
    async function reloadCommand(entry){operationBusy=true;setBusy();try{const result=await options.onReloadRepositoryCommand(entry.directCommandId||entry.id);applyState(result);showStatus(`Reloaded ${result.path} from GitHub.`);}catch(error){showStatus(`Reload failed: ${error.message||String(error)}`,8000);}finally{operationBusy=false;setBusy();}}
    async function saveRepository(entry){operationBusy=true;setBusy();try{const reference=(entry.entityType==='planning-command'||entry.entityType==='semantic-command-direct')?{type:'planning-command',id:entry.directCommandId||entry.id}:{type:'helper',kind:entry.libraryKind,id:entry.libraryId};const result=await options.onSaveRepositoryEntity(reference);applyState(result);showStatus(result.localSnapshotUpdated===false?`GitHub ${result.action} succeeded, but local snapshot refresh failed: ${result.localSnapshotError}`:`GitHub ${result.action}: ${result.path}`,8000);}catch(error){showStatus(repositorySaveFailureMessage(error),9000);}finally{operationBusy=false;setBusy();}}
    async function deleteCommand(entry){try{applyState(await options.onDeleteLocalCommand(entry.directCommandId||entry.id));showStatus('Removed locally. Hard Reload GitHub restores repository-backed catalog rows.');}catch(error){showStatus(error.message||String(error),7000);}}
    async function deleteUseCase(entry){try{applyState(await options.onDeleteLocalUseCase(entry.id));showStatus('Use Case removed locally. Sync missing will keep it suppressed; Hard Reload GitHub restores repository-backed catalog rows.');}catch(error){showStatus(error.message||String(error),7000);}}
    async function deleteLibrary(entry){try{applyState(await options.onDeleteLocalLibraryItem(entry.libraryKind,entry.libraryId));showStatus('Removed from local cache. GitHub was not changed.');}catch(error){showStatus(error.message||String(error),7000);}}
    function openImport(mode){const{overlay,modal}=makeOverlay(mode==='restore'?'Restore local items from ChatGPT markers':'Import local items from ChatGPT markers'),textarea=document.createElement('textarea');const preview=document.createElement('div');preview.className='preview';const actions=document.createElement('div');actions.className='modal-actions';const updatePreview=()=>{try{const result=options.onPreviewChatImport(textarea.value,mode);preview.textContent=(result.lines||[]).join('\n')||'No recognized marker blocks.';preview.className='preview ok';}catch(error){preview.textContent=error.message||String(error);preview.className='preview danger';}};textarea.addEventListener('input',updatePreview);actions.append(button('Cancel','',()=>closeOverlay(overlay)),button(mode==='restore'?'Restore local':'Import local','',async()=>{try{const result=await options.onApplyChatImport(textarea.value,mode);applyState(result);closeOverlay(overlay);showStatus(`${mode==='restore'?'Restore':'Import'} complete. GitHub requests: 0.`);}catch(error){showStatus(error.message||String(error),8000);}}));modal.append(textarea,preview,actions);updatePreview();}
    async function copyRecoveryRequest(){try{const text=await options.onGetRecoveryRequest();showStatus(await options.onCopy(text)?'Recovery request copied.':'Could not copy recovery request.',7000);}catch(error){showStatus(error.message||String(error),7000);}}
    function shortPaths(paths){const rows=(paths||[]).map((path)=>String(path).split('/').pop());return rows.length?rows.join(', '):'—';}
    function inventoryText(result){const i=result.inventory;function line(label,b){return`${label}: local ${b.local}, GitHub ${b.remote}, overlap ${b.common}\n  local-only: ${shortPaths(b.localOnly)}\n  GitHub-only: ${shortPaths(b.remoteOnly)}${b.suppressedRemote?.length?`\n  suppressed locally: ${shortPaths(b.suppressedRemote)}`:''}${b.knownChanged?.length?`\n  changed: ${shortPaths(b.knownChanged)}`:''}`;}return`Repository: ${result.settings.owner}/${result.settings.repo}@${result.settings.branch}\n\n${line('Direct command definitions',i.planningCommands)}\n\n${line('Use-Case semantic source catalog',i.useCases)}\n\n${line('Semantic component projection',i.semanticComponents)}\n\n${line('Canonical scenario projection',i.scenarios)}\n\n${line('Prompts',i.prompts)}\n\nCatalog order changed: ${i.catalogOrderChanged?'yes':'no/unknown'}`;}
    async function checkRepository(){operationBusy=true;setBusy();try{showStatus('Checking GitHub…',9000);const result=await options.onCheckRepository(),{overlay,modal}=makeOverlay('GitHub inventory check'),pre=document.createElement('div');pre.className='preview ok';pre.textContent=inventoryText(result);const actions=document.createElement('div');actions.className='modal-actions';actions.append(button('Close','',()=>closeOverlay(overlay)));modal.append(pre,actions);showStatus('GitHub inventory checked; local cache unchanged.');}catch(error){showStatus(`GitHub check failed: ${error.message||String(error)}`,9000);}finally{operationBusy=false;setBusy();}}
    async function syncMissingRepository(){operationBusy=true;setBusy();try{showStatus('Syncing GitHub-only records…',9000);const result=await options.onSyncMissingRepository();applyState(result);showStatus(`Sync complete: ${result.addedCommands||0} command(s), ${result.addedSemanticComponents||0} semantic component(s), ${result.addedScenarios||0} scenario(s), ${result.addedPrompts||0} prompt(s). Existing local same-ID/path records were not overwritten.`,9000);}catch(error){showStatus(`GitHub sync failed: ${error.message||String(error)}`,9000);}finally{operationBusy=false;setBusy();}}
    function hardReloadRepository(){const{overlay,modal}=makeOverlay('Hard Reload GitHub');const p=document.createElement('p');p.textContent='Authoritative replace-sync from GitHub: reload every direct command plus UC/TM/Lens/Scenario projection, delete local command rows that no longer exist in GitHub (including legacy helper-command rows), restore hidden GitHub rows, and replace local order/groups with GitHub catalog-order.json. Prompt-library content remains separate and is not replaced. Unsaved local command edits/grouping will be lost.';const actions=document.createElement('div');actions.className='modal-actions';actions.append(button('Cancel','',()=>closeOverlay(overlay)),button('Hard Reload','danger',async()=>{operationBusy=true;setBusy();try{const result=await options.onHardReloadRepository();applyState(result);closeOverlay(overlay);showStatus(`Hard Reload complete: ${result.commands} direct definitions, ${result.semanticComponents} semantic components, ${result.scenarios} scenarios; removed ${result.removedLegacyCommands||0} local legacy command row(s). GitHub order/groups loaded authoritatively.`,9000);}catch(error){showStatus(`Hard Reload failed: ${error.message||String(error)}`,9000);}finally{operationBusy=false;setBusy();}}));modal.append(p,actions);}
    async function saveOrder(){operationBusy=true;setBusy();try{const result=await options.onSaveCatalogOrderRepository();applyState(result);showStatus(`Catalog order ${result.action} on GitHub: ${result.path}`,8000);}catch(error){showStatus(repositorySaveFailureMessage(error),9000);}finally{operationBusy=false;setBusy();}}
    async function publishLocalChanges(){operationBusy=true;setBusy();let prepared;try{prepared=await options.onPreparePublishLocalChanges();}catch(error){showStatus(repositorySaveFailureMessage(error),9000);operationBusy=false;setBusy();return;}operationBusy=false;setBusy();if(!prepared.files.length&&!prepared.verifiedNoops.length){showStatus(prepared.skippedDeletes?`No publishable local file changes. ${prepared.skippedDeletes} local deletion/suppression(s) remain local-only.`:'No publishable local file changes.',7000);return;}const{overlay,modal}=makeOverlay('Publish local changes');const note=document.createElement('p');note.textContent=`One GitHub commit on ${prepared.settings.owner}/${prepared.settings.repo}@${prepared.branch}. Only local direct Commands, helper-library records/Prompts and catalog-order.json are publishable here. Semantic projections and repository deletes are not written.`;const preview=document.createElement('div');preview.className='preview ok';preview.textContent=(prepared.lines||[]).join('\n')||'No repository file changes.';const fields=document.createElement('div');fields.className='fields';const messageWrap=document.createElement('label');messageWrap.className='field field-wide';const messageLabel=document.createElement('span');messageLabel.textContent='Commit message';const message=document.createElement('input');message.value='Publish Planning Helper local changes';messageWrap.append(messageLabel,message);fields.append(messageWrap);const count=prepared.files.length,actions=document.createElement('div');actions.className='modal-actions';actions.append(button('Cancel','',()=>closeOverlay(overlay)),button(count?`Publish ${count} file${count===1?'':'s'} in one commit`:'Verify no-op files','',async()=>{operationBusy=true;setBusy();try{const result=await options.onPublishLocalChanges(message.value);applyState(result);closeOverlay(overlay);const summary=result.action==='commit'?`Published ${result.publishedFiles.length} file(s) in one GitHub commit ${String(result.commitSha||'').slice(0,12)}.`:`No GitHub commit was needed; ${result.verifiedNoopFiles.length} local file(s) were verified against GitHub.`;showStatus(result.localSnapshotUpdated===false?`${summary} Local snapshot refresh failed: ${result.localSnapshotError}`:summary,10000);}catch(error){showStatus(repositorySaveFailureMessage(error),10000);}finally{operationBusy=false;setBusy();}}));modal.append(note,preview,fields,actions);}
    async function openSettings(){const{overlay,modal}=makeOverlay('Repository settings');let current;try{current=await options.onLoadSettings();}catch(error){showStatus(error.message||String(error));return;}const fields=document.createElement('div');fields.className='fields';function add(labelText,value,type='text',wide=false){const wrap=document.createElement('label');wrap.className=`field${wide?' field-wide':''}`;const span=document.createElement('span');span.textContent=labelText;const input=document.createElement('input');input.type=type;input.value=value||'';wrap.append(span,input);fields.append(wrap);return input;}const owner=add('Owner',current.settings.owner),repo=add('Repository',current.settings.repo),branch=add('Branch',current.settings.branch),token=add('GitHub token — used only by explicit GitHub actions',current.token,'password',true);const note=document.createElement('p');note.textContent='Normal search/insert/copy/edit/reorder is local-only. Hard Reload is the authoritative command/semantic/scenario replace-sync: GitHub absence removes local command rows, while prompt-library content remains separate. Save order GitHub persists UI order/grouping separately from semantic content. Publish local changes batches supported local Command/Prompt/order changes into one GitHub commit.';const actions=document.createElement('div');actions.className='modal-actions';actions.append(button('Cancel','',()=>closeOverlay(overlay)),button('Save settings','',async()=>{operationBusy=true;setBusy();try{const result=await options.onSaveSettings({owner:owner.value,repo:repo.value,branch:branch.value},token.value);applyState(result);closeOverlay(overlay);showStatus(result.sourceChanged?'Repository settings saved; repository evidence cleared for the new source.':'Repository settings saved.');}catch(error){showStatus(error.message||String(error),7000);}finally{operationBusy=false;setBusy();}}));modal.append(fields,note,actions);}
    function keepPanelInViewport(){const rect=panel.getBoundingClientRect(),w=Math.min(rect.width||width,Math.max(320,window.innerWidth-16)),h=Math.min(rect.height||height,Math.max(320,window.innerHeight-16));width=w;height=h;panel.style.width=`${w}px`;panel.style.height=`${h}px`;left=Math.min(Math.max(left,8),Math.max(8,window.innerWidth-w-8));top=Math.min(Math.max(top,8),Math.max(8,window.innerHeight-h-8));panel.style.left=`${left}px`;panel.style.top=`${top}px`;}
    function persistGeometry(){const rect=panel.getBoundingClientRect();width=rect.width;height=rect.height;left=rect.left;top=rect.top;options.onSavePosition?.({left,top,width,height});}
    function enableDragging(){let pointerId=null,startX=0,startY=0,startLeft=0,startTop=0;function down(event){if(event.button!==0||event.target.closest('button'))return;pointerId=event.pointerId;startX=event.clientX;startY=event.clientY;const rect=panel.getBoundingClientRect();startLeft=rect.left;startTop=rect.top;header.setPointerCapture(pointerId);}function move(event){if(pointerId!==event.pointerId)return;left=startLeft+event.clientX-startX;top=startTop+event.clientY-startY;keepPanelInViewport();}function finish(event){if(pointerId===null)return;try{header.releasePointerCapture(pointerId);}catch(_){}pointerId=null;persistGeometry();}header.addEventListener('pointerdown',down);header.addEventListener('pointermove',move);header.addEventListener('pointerup',finish);header.addEventListener('pointercancel',finish);return()=>{header.removeEventListener('pointerdown',down);header.removeEventListener('pointermove',move);header.removeEventListener('pointerup',finish);header.removeEventListener('pointercancel',finish);};}
    const resizeObserver=typeof ResizeObserver==='function'?new ResizeObserver(()=>{if(!isOpen)return;if(resizeTimer)clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>{keepPanelInViewport();persistGeometry();},180);}):null;resizeObserver?.observe(panel);
    function consumeToggle(token){const next=String(token||'');if(next&&next!==lastToggleToken){lastToggleToken=next;setOpen(!isOpen);}}function handleShortcut(event){if(event.repeat)return;if(event.key==='Escape'&&activeOverlay&&!operationBusy){closeOverlay(activeOverlay);return;}if(event.altKey&&!event.ctrlKey&&!event.metaKey&&event.key==='F2'){event.preventDefault();setOpen(!isOpen);}else if(event.key==='Escape'&&isOpen)setOpen(false);}
    const observer=new MutationObserver((mutations)=>{for(const mutation of mutations){if(mutation.attributeName==='data-obs-planning-dashboard-open'){dashboardOpen=document.documentElement.dataset.obsPlanningDashboardOpen==='true';launcher.style.display=isOpen||dashboardOpen?'none':'block';}if(mutation.attributeName==='data-obs-planning-commands-toggle')consumeToggle(document.documentElement.dataset.obsPlanningCommandsToggle);}});observer.observe(document.documentElement,{attributes:true,attributeFilter:['data-obs-planning-dashboard-open','data-obs-planning-commands-toggle']});
    tabButtons.forEach((b)=>b.addEventListener('click',()=>switchSurface(b.dataset.surface)));launcher.addEventListener('click',()=>setOpen(true));closeButton.addEventListener('click',()=>setOpen(false));searchInput.addEventListener('input',()=>renderEntries(searchInput.value));newLibraryButton.addEventListener('click',()=>{if(activeSurface===SURFACES.COMMANDS)openCommandEditor();else if(activeSurface===SURFACES.PROMPTS)openLibraryEditor();});root.querySelector('.import-chat').addEventListener('click',()=>openImport('import'));root.querySelector('.restore-chat').addEventListener('click',()=>openImport('restore'));root.querySelector('.recovery-request').addEventListener('click',copyRecoveryRequest);root.querySelector('.check-github').addEventListener('click',checkRepository);root.querySelector('.sync-github').addEventListener('click',syncMissingRepository);root.querySelector('.hard-reload').addEventListener('click',hardReloadRepository);manageGroupsButton.addEventListener('click',openGroupManager);root.querySelector('.save-order').addEventListener('click',saveOrder);root.querySelector('.publish-local').addEventListener('click',publishLocalChanges);root.querySelector('.settings').addEventListener('click',openSettings);window.addEventListener('resize',keepPanelInViewport);window.addEventListener('keydown',handleShortcut,true);const disableDragging=enableDragging();switchSurface(SURFACES.COMMANDS);if(options.startupWarnings?.length)setTimeout(()=>showStatus(options.startupWarnings.join('\n'),10000),100);
    function dispose(){if(statusTimer!==null)clearTimeout(statusTimer);if(resizeTimer)clearTimeout(resizeTimer);resizeObserver?.disconnect();observer.disconnect();disableDragging();window.removeEventListener('resize',keepPanelInViewport);window.removeEventListener('keydown',handleShortcut,true);host.remove();}
    return{setCommandEntries,setScenarioEntries,setUseCaseEntries,setLibraryEntries,switchSurface,setOpen,showStatus,dispose,host,root};
  }

  return{createPlanningHelperUi,repositorySaveFailureMessage,favoriteEntries};
});

(function (root, factory) {
  const api=factory(typeof require==='function'?Object.assign({},root.ObsPlanningHelper||{},require('./repository-catalog-service.js'),require('./command-side-effects.js')):(root.ObsPlanningHelper||{}));
  if(typeof module==='object'&&module.exports)module.exports=api;
  root.ObsPlanningHelper=Object.assign(root.ObsPlanningHelper||{},api);
})(typeof globalThis!=='undefined'?globalThis:this,function(deps){
  'use strict';

  const INSTANCE_DISPOSE_KEY='__obsPlanningHelperDisposeV4';
  const LEGACY_DISPOSE_KEYS=['__obsPlanningHelperDisposeV3','__obsPlanningHelperDisposeV2','__obsCommandHelperDisposeV1'];
  function createRepositoryOperationLock(){let active='';return{isBusy:()=>Boolean(active),active:()=>active,async run(label,task){if(active){const error=new Error(`Repository operation already in progress: ${active}.`);error.kind='busy';throw error;}active=String(label||'repository operation');try{return await task();}finally{active='';}}};}
  function helperKey(item){return`${item.kind}:${item.id}`;}
  function repositorySettingsKey(settings){return`${String(settings?.owner||'').trim().toLowerCase()}/${String(settings?.repo||'').trim().toLowerCase()}@${String(settings?.branch||'').trim()}`;}
  function sortByIds(entries,ids){const order=new Map((ids||[]).map((id,index)=>[String(id),index]));function rank(entry){if(order.has(entry.id))return order.get(entry.id);if(entry.directCommandId&&order.has(entry.directCommandId))return order.get(entry.directCommandId);return Number.MAX_SAFE_INTEGER;}return[...(entries||[])].map((entry,index)=>({entry,index})).sort((a,b)=>rank(a.entry)-rank(b.entry)||a.index-b.index).map(({entry})=>entry);}
  function orderedIdsForMove(configured,currentIds){const current=[...new Set((currentIds||[]).map(String))],known=new Set(current),result=[];for(const id of configured||[])if(known.has(String(id))&&!result.includes(String(id)))result.push(String(id));for(const id of current)if(!result.includes(id))result.push(id);return result;}
  function moveId(configured,currentIds,id,delta){const order=orderedIdsForMove(configured,currentIds),value=String(id||''),index=order.indexOf(value);if(index<0)throw new Error(`Order item not found: ${value||'<empty>'}`);const target=Math.max(0,Math.min(order.length-1,index+(delta<0?-1:1)));if(target===index)return order;order.splice(index,1);order.splice(target,0,value);return order;}
  function presentationGroupForId(order,id){for(const group of order?.commandGroups||[]){const index=group.items.indexOf(String(id));if(index>=0)return{id:group.id,viewId:group.viewId,label:group.label,order:group.order,itemOrder:index};}return null;}
  function decoratePresentationGroups(entries,order){return(entries||[]).map((entry)=>{const group=presentationGroupForId(order,entry.id);return group?{...entry,presentationGroup:group}:entry;});}
  function slug(value){return String(value||'group').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'')||'group';}
  function nextGroupId(order,viewId,label){const base=`${String(viewId||'general').toLowerCase()}.${slug(label)}`,used=new Set((order.commandGroups||[]).map((group)=>group.id));if(!used.has(base))return base;let n=2;while(used.has(`${base}-${n}`))n++;return`${base}-${n}`;}
  function ensureUngroupedGroup(order,viewId){const view=String(viewId||'GENERAL').toUpperCase(),existing=order.commandGroups.find((group)=>group.viewId===view&&group.label==='Other / Ungrouped');if(existing)return existing.id;const max=Math.max(0,...order.commandGroups.filter((group)=>group.viewId===view).map((group)=>Number(group.order)||0)),id=nextGroupId(order,view,'other-ungrouped');order.commandGroups.push({id,viewId:view,label:'Other / Ungrouped',order:max+10,items:[]});return id;}
  function assignCommandGroupInOrder(value,id,groupId,viewId=''){const order=deps.normalizeCatalogOrder(value||{}),itemId=String(id||'').trim();let targetId=String(groupId||'').trim();if(!itemId)throw new Error('Command card id is required.');const current=order.commandGroups.find((group)=>group.items.includes(itemId));if(!targetId)targetId=ensureUngroupedGroup(order,viewId||current?.viewId||'GENERAL');let found=false;order.commandGroups=order.commandGroups.map((group)=>{const items=group.items.filter((item)=>item!==itemId);if(group.id===targetId){found=true;items.push(itemId);}return{...group,items};});if(!found)throw new Error(`Command group not found: ${targetId}`);return deps.normalizeCatalogOrder(order);}
  function createCommandGroupInOrder(value,{viewId,label}={}){const order=deps.normalizeCatalogOrder(value||{}),view=String(viewId||'').trim().toUpperCase(),name=String(label||'').trim();if(!view)throw new Error('Command group view is required.');if(!name)throw new Error('Command group label is required.');const max=Math.max(0,...order.commandGroups.filter((group)=>group.viewId===view).map((group)=>Number(group.order)||0));order.commandGroups.push({id:nextGroupId(order,view,name),viewId:view,label:name,order:max+10,items:[]});return deps.normalizeCatalogOrder(order);}
  function updateCommandGroupInOrder(value,groupId,{label}={}){const order=deps.normalizeCatalogOrder(value||{}),id=String(groupId||'').trim(),group=order.commandGroups.find((item)=>item.id===id);if(!group)throw new Error(`Command group not found: ${id}`);const name=label==null?group.label:String(label).trim();if(!name)throw new Error('Command group label is required.');group.label=name;return deps.normalizeCatalogOrder(order);}
  function moveCommandGroupInOrder(value,groupId,delta){const order=deps.normalizeCatalogOrder(value||{}),id=String(groupId||'').trim(),group=order.commandGroups.find((item)=>item.id===id);if(!group)throw new Error(`Command group not found: ${id}`);const siblings=order.commandGroups.filter((item)=>item.viewId===group.viewId).sort((a,b)=>(Number(a.order)||0)-(Number(b.order)||0)||a.label.localeCompare(b.label)),index=siblings.findIndex((item)=>item.id===id),target=Math.max(0,Math.min(siblings.length-1,index+(delta<0?-1:1)));if(target===index)return order;const temp=siblings[index].order;siblings[index].order=siblings[target].order;siblings[target].order=temp;return deps.normalizeCatalogOrder(order);}
  function deleteCommandGroupInOrder(value,groupId){const order=deps.normalizeCatalogOrder(value||{}),id=String(groupId||'').trim(),group=order.commandGroups.find((item)=>item.id===id);if(!group)throw new Error(`Command group not found: ${id}`);if(group.label==='Other / Ungrouped')throw new Error('Other / Ungrouped is the fallback group and cannot be deleted.');const fallbackId=ensureUngroupedGroup(order,group.viewId),fallback=order.commandGroups.find((item)=>item.id===fallbackId);fallback.items.push(...group.items.filter((item)=>!fallback.items.includes(item)));order.commandGroups=order.commandGroups.filter((item)=>item.id!==id);return deps.normalizeCatalogOrder(order);}



  const DIRECT_PRESENTATION=Object.freeze({
    'critical_review.apply':{actionLabel:'Критически проверить',tail:'General · Critical Review',scenarioRefs:['planning/documentation/review-diff-review-workflow.md']},
    'idtspe.next':{actionLabel:'Показать следующий methodology action',tail:'General · IDTSPE Next',scenarioRefs:['planning/documentation/idtspe-methodology/active/profiles/sds/shared/directed-methodology-workflow-and-next-step-resolution.md']},
    'idtspe.continue':{actionLabel:'Продолжить methodology work',tail:'General · IDTSPE Continue',scenarioRefs:['planning/documentation/idtspe-methodology/active/profiles/sds/shared/directed-methodology-workflow-and-next-step-resolution.md']},
    'review_audit.recheck':{actionLabel:'Аудировать coverage предыдущего review',tail:'General · Review Audit',scenarioRefs:['planning/documentation/review-audit-workflow.md']},
    'idtspe.review_consistency':{actionLabel:'Проверить consistency текущей работы',tail:'General · Consistency Review',scenarioRefs:['planning/documentation/idtspe-methodology/active/idtspe-core/shared/consistency-review-use-case.md']},
    'idtspe.lenses.select':{actionLabel:'Подобрать применимые Lenses',tail:'General · Lens Selection',scenarioRefs:['planning/documentation/idtspe-methodology/active/idtspe-core/lenses/README.md','planning/documentation/idtspe-methodology/active/idtspe-core/shared/idtspe-unit-and-target-step-result-model.md']},
    'replacement_archive.create':{actionLabel:'Собрать Replacement Package',tail:'Tool · UC-REPO-BUILD-REPLACEMENT-PACKAGE',category:'TOOL',scenarioRefs:['planning/use-cases/UC-REPO-BUILD-REPLACEMENT-PACKAGE.md','planning/documentation/build-replacement-archive-workflow.md']},
    'proposal_archive.create':{actionLabel:'Собрать review-only proposal archive',tail:'Tool · Proposal Archive',category:'TOOL',scenarioRefs:['planning/documentation/use-cases/UC-DOC-PLAN-DOCUMENTATION-CHANGE.md','planning/documentation/principles-and-terminology.md#use-case']},
    'archive_source.use':{actionLabel:'Использовать выбранный archive как source',tail:'Tool · Archive Source',category:'TOOL',scenarioRefs:['planning/command-routing.md#archive-read-source-boundary']},
    'helper.command.add':{actionLabel:'Создать / изменить Planning Command',tail:'Tool · Planning Command',category:'TOOL',scenarioRefs:['planning/use-cases/UC-REPO-MAINTAIN-PLANNING-COMMAND.md','planning/documentation/tampermonkey-command-projection-workflow.md']},
    'documentation.links.review':{actionLabel:'Проверить связность документации',tail:'General · Documentation Links',scenarioRefs:['planning/documentation/use-cases/UC-DOC-REVIEW-DOCUMENTATION.md','planning/documentation/principles-and-terminology.md']},
    'command.plan':{actionLabel:'Спланировать command route',tail:'General · Command Route',scenarioRefs:['planning/command-routing.md']},
    'session.proposal_driven':{actionLabel:'Включить proposal-driven gating',tail:'General · Session Interaction',scenarioRefs:['planning/session/session-runtime-contract.md']},
    'idtspe.proposal':{actionLabel:'Работать через Proposal lifecycle',tail:'General · IDTSPE Proposal Lifecycle',scenarioRefs:['planning/documentation/idtspe-methodology/active/idtspe-core/shared/proposal-and-decision-lifecycle-contract.md']},
    'idtspe.needs.review':{actionLabel:'Разобрать новые потребности',tail:'General · Need Candidate Disposition',scenarioRefs:['planning/documentation/idtspe-methodology/active/idtspe-core/shared/need-candidate-disposition-contract.md']},
    'idtspe.findings.review':{actionLabel:'Разобрать найденные проблемы',tail:'General · Finding Disposition',scenarioRefs:['planning/documentation/idtspe-methodology/active/idtspe-core/shared/finding-disposition-contract.md#resolution-escalation']},
    'idtspe.bootstrap':{actionLabel:'Загрузить IDTSPE Core',tail:'General · Bootstrap'},
    'application_sds.bootstrap':{actionLabel:'Загрузить SDS profile',tail:'General · Bootstrap'},
    'documentation_principles.read':{actionLabel:'Загрузить guidance по документации',tail:'General · Documentation Guidance'},
    'governance.development':{actionLabel:'Загрузить governance разработки',tail:'General · Development Governance'},
    'current_state.report':{actionLabel:'Показать текущее состояние',tail:'General · Current State'},
    'application_reality.review':{actionLabel:'Разобрать текущую реальность',tail:'General · Application Reality'},
    'application_research.research':{actionLabel:'Исследовать альтернативы решения',tail:'General · Solution Alternatives'},
    'application_solution.plan':{actionLabel:'Сформировать решение приложения',tail:'General · Application Solution'},
    'application_realization.review':{actionLabel:'Проверить feasibility реализации',tail:'General · Application Realization'},
    'workspace_uses.discover':{actionLabel:'Изучить Workspace Use Cases',tail:'General · Architecture Inputs'},
    'architecture_path.trace':{actionLabel:'Разобрать путь изменения системы',tail:'General · Architecture Path'},
    'architecture_pressure.review':{actionLabel:'Оценить давление на архитектуру',tail:'General · Architecture Pressure'},
    'architecture_decision.plan':{actionLabel:'Выбрать архитектурное решение',tail:'General · Architecture Decision'}
  });
  function directExplanation(entry){const definition=entry?.definition||{};return{context:String(definition.activeContextBehavior||entry.description||'').trim(),result:String(definition.expectedOutput||entry.description||'').trim(),essence:String(definition.meaning||entry.description||entry.command||entry.id||'').trim()};}
  function directPresentation(entry){const meta=DIRECT_PRESENTATION[entry.id]||{};const actionLabel=meta.actionLabel||entry.command||entry.label||entry.id,tail=meta.tail||`General · ${entry.englishName||entry.id}`;return{actionLabel,label:`${actionLabel} · ${tail}`,commandCategory:meta.category||'GENERAL',scenarioRefs:[...(meta.scenarioRefs||[])],...directExplanation(entry)};}
  function componentBody(component,useCase,mode){if(component.kind==='USE_CASE'&&useCase)return deps.buildSemanticBody('use_case',useCase,mode);return deps.buildSemanticBody(component.kind==='TARGET_MODULE'?'target_module':'lens',component,mode);}
  function useCaseSemanticComponent(useCase,previous=null){const item=deps.normalizeUseCaseDefinition(useCase),prior=previous&&previous.kind==='USE_CASE'?deps.normalizeSemanticComponent(previous):null;return deps.normalizeSemanticComponent({id:item.id,kind:'USE_CASE',scope:prior?.scope||(item.id.startsWith('UC-DOC-')?'Documentation':'Core'),label:item.label,actionLabel:prior?.actionLabel||item.label,description:item.description,context:item.trigger||item.description,result:item.result||item.description,essence:item.description,sources:item.sources,aliases:prior?.aliases||[],commandId:item.commandId||prior?.commandId||'',invocation:'',target:item.target});}
  function semanticDirectIds(component,definitions){const c=deps.normalizeSemanticComponent(component),ids=[];for(const definition of definitions||[]){if(definition.palette===false)continue;const binding=definition.methodologyBinding||{},matches=c.kind==='USE_CASE'?Boolean(c.commandId)&&definition.id===c.commandId:c.kind==='TARGET_MODULE'?binding.targetModuleId===c.id:binding.lensId===c.id;if(matches&&!ids.includes(definition.id))ids.push(definition.id);}return ids;}

  function materializeSnapshot(snapshot){
    const commandRecords=[...(snapshot.planningCommands||[])],helperRecords=[...(snapshot.helperItems||[])],useCases=deps.normalizeUseCaseDefinitions(snapshot.useCases||[]),semanticComponents=deps.normalizeSemanticComponents(snapshot.semanticComponents||[]),scenarios=deps.normalizeScenarios(snapshot.scenarios||[]),order=deps.normalizeCatalogOrder(snapshot.catalogOrder||{});
    const definitions=commandRecords.map((record)=>record.definition);deps.validateCommandCatalog(definitions);
    const commandByFile=new Map(commandRecords.map((record)=>[record.definition.file,record])),commandById=new Map(commandRecords.map((record)=>[record.definition.id,record])),helperByKey=new Map(helperRecords.map((record)=>[helperKey(record.item),record])),useCaseById=new Map(useCases.map((entry)=>[entry.id,entry]));
    const rawPlanningEntries=deps.buildCommandEntries(definitions).map((entry)=>{const record=commandById.get(entry.id),stateLabel=record?.repositoryKnown?'Registered · GitHub content verified':record?.repositoryTracked?'Registered · local draft changed':'Local command draft · not GitHub verified';return{...entry,entityType:'planning-command',definition:record?.definition||null,rawContent:record?.rawContent||'',repositoryPath:record?.path||'',repositoryKnown:Boolean(record?.repositoryKnown),repositoryTracked:Boolean(record?.repositoryTracked),repositorySha:record?.repositorySha||'',ownerFiles:[...(record?.definition?.ownerFiles||[])],stateLabel};});
    const rawEntryById=new Map(rawPlanningEntries.map((entry)=>[entry.id,entry])),consumedDirectIds=new Set(),semanticCommandEntries=[],useCaseComponentById=new Map(semanticComponents.filter((component)=>component.kind==='USE_CASE').map((component)=>[component.id,component])),effectiveSemanticComponents=[...semanticComponents.filter((component)=>component.kind!=='USE_CASE'),...useCases.map((useCase)=>useCaseSemanticComponent(useCase,useCaseComponentById.get(useCase.id)))];
    for(const component of effectiveSemanticComponents){
      const directDefinition=deps.chooseDirectDefinition(component,definitions),directEntry=directDefinition?rawEntryById.get(directDefinition.id):null;
      for(const definition of definitions)if(definition.palette!==false&&((component.kind==='USE_CASE'&&component.commandId&&definition.id===component.commandId)||(component.kind==='TARGET_MODULE'&&definition.methodologyBinding?.targetModuleId===component.id)||(component.kind==='LENS'&&definition.methodologyBinding?.lensId===component.id)))consumedDirectIds.add(definition.id);
      const adaptiveBody=directEntry?.adaptiveBody||componentBody(component,useCaseById.get(component.id),deps.MODE.ADAPTIVE),fullBody=directEntry?.fullBody||componentBody(component,useCaseById.get(component.id),deps.MODE.FULL),record=directDefinition?commandById.get(directDefinition.id):null;
      semanticCommandEntries.push({
        ...(directEntry||{}),id:deps.semanticCardId(component),entityType:directEntry?'semantic-command-direct':'semantic-command',canonicalId:component.id,semanticKind:component.kind,semanticScope:component.scope,semanticSources:[...component.sources],actionLabel:component.actionLabel,label:deps.fullSemanticLabel(component),description:component.description,context:component.context||useCaseById.get(component.id)?.trigger||component.description,result:component.result||useCaseById.get(component.id)?.result||component.description,essence:component.essence||component.description,adaptiveBody,fullBody,provenance:directEntry?deps.SEMANTIC_PROVENANCE.DIRECT:deps.SEMANTIC_PROVENANCE.GENERIC,directCommandId:directDefinition?.id||'',definition:directDefinition||null,rawContent:record?.rawContent||'',repositoryPath:record?.path||'',repositoryKnown:Boolean(record?.repositoryKnown),repositoryTracked:Boolean(record?.repositoryTracked),repositorySha:record?.repositorySha||'',ownerFiles:[...(directDefinition?.ownerFiles||component.sources)],stateLabel:directEntry?'DIRECT CURRENT':'GENERIC CURRENT'
      });
    }
    const directEntries=rawPlanningEntries.filter((entry)=>!consumedDirectIds.has(entry.id)&&entry.palette!==false).map((entry)=>({...entry,...directPresentation(entry),canonicalId:'',semanticKind:'',semanticScope:'',semanticSources:[],provenance:deps.SEMANTIC_PROVENANCE.DIRECT,stateLabel:'DIRECT CURRENT'}));
    const primaryCommands=deps.attachScenarioUses([...semanticCommandEntries,...directEntries],scenarios);
    const helperEntries=helperRecords.map((record)=>{const item=record.item,evidence=record.repositorySha?'local · GitHub SHA verified':record.repositoryKnown?'local · repository-backed content; SHA unverified':'local · repository match not verified';return{id:`helper-library:${item.kind}:${item.id}`,entityType:item.kind===deps.HELPER_LIBRARY_KINDS.COMMAND?'legacy-helper-command':'prompt',libraryId:item.id,libraryKind:item.kind,label:item.kind===deps.HELPER_LIBRARY_KINDS.COMMAND?`Legacy insertion · ${item.title}`:item.title,title:item.title,description:item.kind===deps.HELPER_LIBRARY_KINDS.COMMAND?`Legacy helper-command compatibility · ${evidence}`:evidence,text:item.text,adaptiveBody:item.text,repositoryPath:record.path,repositoryKnown:Boolean(record.repositoryKnown),repositoryTracked:Boolean(record.repositoryKnown),repositorySha:record.repositorySha||'',createdAt:item.createdAt,updatedAt:item.updatedAt};});
    const legacyCommandEntries=helperEntries.filter((entry)=>entry.libraryKind===deps.HELPER_LIBRARY_KINDS.COMMAND),groupedCommandEntries=decoratePresentationGroups([...primaryCommands,...legacyCommandEntries],order),commandEntries=sortByIds(groupedCommandEntries,order.commands),promptEntries=sortByIds(helperEntries.filter((entry)=>entry.libraryKind===deps.HELPER_LIBRARY_KINDS.PROMPT),order.prompts),legacySemanticIdByDirect=new Map(semanticCommandEntries.filter((entry)=>entry.directCommandId).map((entry)=>[entry.directCommandId,entry.id])),favoriteCommandIds=[...new Set((snapshot.favoriteCommandIds||[]).map((id)=>legacySemanticIdByDirect.get(String(id))||String(id)))];
    const scenarioEntries=sortByIds(scenarios.map((scenario)=>({...scenario,entityType:'methodology-scenario',label:`${scenario.id} · ${scenario.title}`,steps:(scenario.steps||[]).map((step)=>({...step,commandEquivalents:deps.commandEquivalentsForScenarioStep(primaryCommands,step).map((entry)=>({id:entry.id,label:entry.label,actionLabel:entry.actionLabel||entry.command||entry.label,adaptiveBody:entry.adaptiveBody||entry.text||'',fullBody:entry.fullBody||'',provenance:entry.provenance||entry.stateLabel||'',stateLabel:entry.stateLabel||'',canonicalId:entry.canonicalId||'',directCommandId:entry.directCommandId||'',entityType:entry.entityType||'',ownerFiles:[...(entry.ownerFiles||[])],repositoryPath:entry.repositoryPath||''}))}))})),order.scenarios);
    // Compatibility projection only; the UI no longer exposes Use Cases as a peer surface.
    const useCaseEntries=deps.buildSemanticEntries(useCases)[deps.SURFACES.USE_CASES]||[];
    return{commandRecords,helperRecords,useCases,semanticComponents,scenarios,order,commandByFile,commandById,helperByKey,commandEntries,localCommandEntries:sortByIds(legacyCommandEntries,order.commands),promptEntries,scenarioEntries,useCaseEntries,favoriteCommandIds,legacySemanticIdByDirect};
  }

  function suppressionState(snapshot){return deps.normalizeSuppressedRepository(snapshot?.suppressedRepository||{});}
  function withoutValue(values,value){return(values||[]).filter((item)=>item!==value);}
  function withValue(values,value){return[...new Set([...(values||[]),value])];}
  function commandDeletePath(value,current){const key=String(value||'').trim(),byId=current.commandById.get(key),byFile=current.commandByFile.get(key);if(byId)return byId.path;if(byFile)return byFile.path;if(/^planning\/commands\/[^/]+\.command\.md$/.test(key))return key;if(/^[^/]+\.command\.md$/.test(key))return`planning/commands/${key}`;throw new TypeError(`Unknown planning-command delete key: ${key||'<empty>'}. Use a current command id/file or planning/commands/<file>.command.md.`);}
  function helperDeletePath(value,current){const key=String(value||'').trim(),byKey=current.helperByKey.get(key);if(byKey)return byKey.path;if(/^planning\/helper-library\/(commands|prompts)\/[^/]+\.(helper-command|prompt)\.md$/.test(key))return key;throw new TypeError(`Unknown helper-item delete key: ${key||'<empty>'}. Use kind:id or an exact planning/helper-library path.`);}
  function sameJson(a,b){return JSON.stringify(a)===JSON.stringify(b);}
  function emptyPatch(){return{upsert:{commands:[],helperItems:[],useCases:[],semanticComponents:[],scenarios:[]},delete:{commands:[],helperItems:[],useCases:[],semanticComponents:[],scenarios:[]},catalogOrder:null};}
  function assertUniqueKeys(values,keyOf,label){const seen=new Set();for(const value of values){const key=keyOf(value);if(seen.has(key))throw new TypeError(`Duplicate ${label}: ${key}`);seen.add(key);}return seen;}
  function assertNoOverlap(upserts,deletes,label){for(const key of upserts)if(deletes.has(key))throw new TypeError(`${label} cannot be both upserted and deleted in one import: ${key}`);}
  function normalizeImportIntent(current,parsed){const patch=parsed.patch||emptyPatch(),commands=[...(parsed.definitions||[]),...(patch.upsert.commands||[])].map((value)=>deps.normalizeCommandDefinition(value)),commandPaths=assertUniqueKeys(commands,(item)=>deps.commandPathForDefinition(item),'planning-command upsert path'),commandIds=assertUniqueKeys(commands,(item)=>item.id,'planning-command upsert id'),commandDeletes=(patch.delete.commands||[]).map((value)=>commandDeletePath(value,current)),commandDeleteSet=assertUniqueKeys(commandDeletes,(value)=>value,'planning-command delete');assertNoOverlap(commandPaths,commandDeleteSet,'Planning command');
    const helperItems=[...(parsed.helperItems||[]),...(patch.upsert.helperItems||[])].map((value)=>deps.normalizeHelperLibraryItem(value)),helperPaths=assertUniqueKeys(helperItems,(item)=>deps.helperLibraryTargetPath(item),'helper-item upsert path'),helperDeletes=(patch.delete.helperItems||[]).map((value)=>helperDeletePath(value,current)),helperDeleteSet=assertUniqueKeys(helperDeletes,(value)=>value,'helper-item delete');assertNoOverlap(helperPaths,helperDeleteSet,'Helper item');
    const useCases=(patch.upsert.useCases||[]).map((value)=>deps.normalizeUseCaseDefinition(value)),useCaseIds=assertUniqueKeys(useCases,(item)=>item.id,'Use-Case upsert id'),useCaseDeletes=(patch.delete.useCases||[]).map((value)=>String(value).trim()),useCaseDeleteSet=assertUniqueKeys(useCaseDeletes,(value)=>value,'Use-Case delete id');assertNoOverlap(useCaseIds,useCaseDeleteSet,'Use Case');
    const semanticComponents=(patch.upsert.semanticComponents||[]).map((value)=>deps.normalizeSemanticComponent(value));for(const item of semanticComponents)if(item.kind==='USE_CASE')throw new TypeError(`Import Use Cases through upsert.useCases; semanticComponents is only for Target Modules and Lenses: ${item.id}`);const componentIds=assertUniqueKeys(semanticComponents,(item)=>item.id,'semantic-component upsert id'),componentDeletes=(patch.delete.semanticComponents||[]).map((value)=>String(value).trim());for(const id of componentDeletes){const existing=current.semanticComponents.find((item)=>item.id===id);if(id.startsWith('UC-')||existing?.kind==='USE_CASE')throw new TypeError(`Delete Use Cases through delete.useCases; semanticComponents is only for Target Modules and Lenses: ${id}`);}const componentDeleteSet=assertUniqueKeys(componentDeletes,(value)=>value,'semantic-component delete id');assertNoOverlap(componentIds,componentDeleteSet,'Semantic component');
    const scenarios=(patch.upsert.scenarios||[]).map((value)=>deps.normalizeScenario(value)),scenarioIds=assertUniqueKeys(scenarios,(item)=>item.id,'Scenario upsert id'),scenarioDeletes=(patch.delete.scenarios||[]).map((value)=>String(value).trim()),scenarioDeleteSet=assertUniqueKeys(scenarioDeletes,(value)=>value,'Scenario delete id');assertNoOverlap(scenarioIds,scenarioDeleteSet,'Scenario');
    return{patch,commands,commandDeletes,helperItems,helperDeletes,useCases,useCaseDeletes,semanticComponents,componentDeletes,scenarios,scenarioDeletes};}
  function mergeRestoreChatImport(snapshot,parsed){if(parsed.patch)throw new TypeError('PLANNING_HELPER_PATCH is supported by Import, not Restore.');const current=materializeSnapshot(snapshot),suppressed=suppressionState(snapshot),commandSeed=current.commandRecords.filter((record)=>!record.repositoryKnown),helperSeed=current.helperRecords.filter((record)=>!record.repositoryKnown),commandMap=new Map(commandSeed.map((record)=>[record.definition.file,record])),helperMap=new Map(helperSeed.map((record)=>[helperKey(record.item),record]));const restoreCommandFiles=new Set((parsed.definitions||[]).map((definition)=>deps.normalizeCommandDefinition(definition).file)),restoreHelperKeys=new Set((parsed.helperItems||[]).map((item)=>helperKey(deps.normalizeHelperLibraryItem(item)))),removedRepositoryCommands=current.commandRecords.filter((record)=>record.repositoryKnown&&!restoreCommandFiles.has(record.definition.file)).length,removedRepositoryHelperItems=current.helperRecords.filter((record)=>record.repositoryKnown&&!restoreHelperKeys.has(helperKey(record.item))).length;for(const definition of parsed.definitions||[]){const normalized=deps.normalizeCommandDefinition(definition),path=deps.commandPathForDefinition(normalized),idCollision=[...commandMap.values()].find((record)=>record.definition.id===normalized.id&&record.definition.file!==normalized.file);if(idCollision)throw new TypeError(`Planning command id ${normalized.id} already belongs to ${idCollision.definition.file}.`);commandMap.set(normalized.file,deps.normalizeCommandRecord({definition:normalized,path,rawContent:deps.renderCommandDefinitionDocument(normalized),repositoryKnown:true,repositoryTracked:true,repositorySha:''}));suppressed.commands=withoutValue(suppressed.commands,path);}for(const itemValue of parsed.helperItems||[]){const item=deps.normalizeHelperLibraryItem(itemValue),path=deps.helperLibraryTargetPath(item);helperMap.set(helperKey(item),deps.normalizeHelperRecord({item,path,rawContent:deps.renderHelperLibraryDocument(item),repositoryKnown:true,repositorySha:''}));suppressed.helperItems=withoutValue(suppressed.helperItems,path);}const next=deps.normalizePlanningHelperLocalSnapshot({...snapshot,planningCommands:[...commandMap.values()],helperItems:[...helperMap.values()],suppressedRepository:suppressed});return{snapshot:next,newCommandRecords:[],newHelperRecords:[],removedRepositoryCommands,removedRepositoryHelperItems,parsed,lines:[...(parsed.definitions||[]).map((definition)=>`RESTORE planning/commands/${definition.file}`),...(parsed.helperItems||[]).map((item)=>`RESTORE ${deps.helperLibraryTargetPath(item)}`),...((removedRepositoryCommands||removedRepositoryHelperItems)?[`RECONCILE remove stale repository-backed local records: ${removedRepositoryCommands} command(s), ${removedRepositoryHelperItems} helper item(s)`]:[])]};}
  function mergeImportChatPatch(snapshot,parsed){const current=materializeSnapshot(snapshot),intent=normalizeImportIntent(current,parsed),patch=intent.patch,commandMap=new Map(current.commandRecords.map((record)=>[record.path,record])),helperMap=new Map(current.helperRecords.map((record)=>[record.path,record])),useCaseMap=new Map(current.useCases.map((entry)=>[entry.id,entry])),componentMap=new Map(current.semanticComponents.map((entry)=>[entry.id,entry])),scenarioMap=new Map(current.scenarios.map((entry)=>[entry.id,entry])),suppressed=suppressionState(snapshot),lines=[],newCommandRecords=[],newHelperRecords=[];let useCasesChanged=false,componentsChanged=false,scenariosChanged=false,favoriteCommandIds=[...(snapshot.favoriteCommandIds||[])],favoriteUseCaseIds=[...(snapshot.favoriteUseCaseIds||[])];
    for(const path of intent.commandDeletes){const record=commandMap.get(path),semanticEntry=record?current.commandEntries.find((entry)=>entry.directCommandId===record.definition.id&&entry.canonicalId):null;if(record){commandMap.delete(path);lines.push(`DELETE ${path}${semanticEntry?` · semantic card ${semanticEntry.id} remains as generic projection`:''}`);favoriteCommandIds=withoutValue(favoriteCommandIds,record.definition.id);}else lines.push(`SUPPRESS ${path}`);suppressed.commands=withValue(suppressed.commands,path);}
    for(const path of intent.helperDeletes){if(helperMap.delete(path))lines.push(`DELETE ${path}`);else lines.push(`SUPPRESS ${path}`);suppressed.helperItems=withValue(suppressed.helperItems,path);}
    for(const id of intent.useCaseDeletes){if(useCaseMap.delete(id)){useCasesChanged=true;lines.push(`DELETE use-case ${id}`);}else lines.push(`SUPPRESS use-case ${id}`);suppressed.useCases=withValue(suppressed.useCases,id);suppressed.semanticComponents=withoutValue(suppressed.semanticComponents,id);favoriteUseCaseIds=withoutValue(favoriteUseCaseIds,id);favoriteCommandIds=withoutValue(favoriteCommandIds,`uc:${id}`);}
    for(const id of intent.componentDeletes){const component=componentMap.get(id);if(componentMap.delete(id)){componentsChanged=true;lines.push(`DELETE semantic-component ${id}`);}else lines.push(`SUPPRESS semantic-component ${id}`);suppressed.semanticComponents=withValue(suppressed.semanticComponents,id);if(component)favoriteCommandIds=withoutValue(favoriteCommandIds,deps.semanticCardId(component));}
    for(const id of intent.scenarioDeletes){if(scenarioMap.delete(id)){scenariosChanged=true;lines.push(`DELETE scenario ${id}`);}else lines.push(`SUPPRESS scenario ${id}`);suppressed.scenarios=withValue(suppressed.scenarios,id);}
    for(const normalized of intent.commands){const path=deps.commandPathForDefinition(normalized),previous=current.commandByFile.get(normalized.file),idCollision=[...commandMap.values()].find((record)=>record.definition.id===normalized.id&&record.path!==path);if(idCollision)throw new TypeError(`Planning command id ${normalized.id} already belongs to ${idCollision.definition.file}.`);const rendered=deps.renderCommandDefinitionDocument(normalized),unchanged=Boolean(previous)&&previous.rawContent===rendered,record=deps.normalizeCommandRecord({definition:normalized,path,rawContent:rendered,repositoryKnown:unchanged&&Boolean(previous?.repositoryKnown),repositoryTracked:Boolean(previous?.repositoryTracked||previous?.repositoryKnown),repositorySha:unchanged?previous?.repositorySha||'':''});commandMap.set(path,record);suppressed.commands=withoutValue(suppressed.commands,path);lines.push(`${previous?(unchanged?'UNCHANGED':'UPDATE'):'ADD'} ${path}`);if(!previous)newCommandRecords.push(record);}
    for(const item of intent.helperItems){const path=deps.helperLibraryTargetPath(item),previous=current.helperByKey.get(helperKey(item)),rendered=deps.renderHelperLibraryDocument(item),unchanged=Boolean(previous)&&previous.rawContent===rendered,record=deps.normalizeHelperRecord({item,path,rawContent:rendered,repositoryKnown:unchanged&&Boolean(previous?.repositoryKnown),repositorySha:unchanged?previous?.repositorySha||'':''});helperMap.set(path,record);suppressed.helperItems=withoutValue(suppressed.helperItems,path);lines.push(`${previous?(unchanged?'UNCHANGED':'UPDATE'):'ADD'} ${path}`);if(!previous)newHelperRecords.push(record);}
    for(const item of intent.useCases){const previous=current.useCases.find((entry)=>entry.id===item.id),previousComponent=current.semanticComponents.find((entry)=>entry.id===item.id&&entry.kind==='USE_CASE'),component=useCaseSemanticComponent(item,previousComponent);useCaseMap.set(item.id,item);componentMap.set(item.id,component);suppressed.useCases=withoutValue(suppressed.useCases,item.id);suppressed.semanticComponents=withoutValue(suppressed.semanticComponents,item.id);const unchanged=Boolean(previous)&&sameJson(previous,item),componentUnchanged=Boolean(previousComponent)&&sameJson(previousComponent,component);if(!unchanged)useCasesChanged=true;if(!componentUnchanged)componentsChanged=true;lines.push(`${previous?(unchanged?'UNCHANGED':'UPDATE'):'ADD'} use-case ${item.id}`);lines.push(`${previousComponent?(componentUnchanged?'UNCHANGED':'UPDATE'):'ADD'} semantic-component ${item.id} · coupled Use-Case projection`);}
    for(const item of intent.semanticComponents){const previous=current.semanticComponents.find((entry)=>entry.id===item.id);componentMap.set(item.id,item);suppressed.semanticComponents=withoutValue(suppressed.semanticComponents,item.id);const unchanged=Boolean(previous)&&sameJson(previous,item);if(!unchanged)componentsChanged=true;lines.push(`${previous?(unchanged?'UNCHANGED':'UPDATE'):'ADD'} semantic-component ${item.id}`);}
    for(const item of intent.scenarios){const previous=current.scenarios.find((entry)=>entry.id===item.id);scenarioMap.set(item.id,item);suppressed.scenarios=withoutValue(suppressed.scenarios,item.id);const unchanged=Boolean(previous)&&sameJson(previous,item);if(!unchanged)scenariosChanged=true;lines.push(`${previous?(unchanged?'UNCHANGED':'UPDATE'):'ADD'} scenario ${item.id}`);}
    let catalogOrder=snapshot.catalogOrder,catalogOrderSha=snapshot.catalogOrderSha;if(patch.catalogOrder!=null){const nextOrder=deps.normalizeCatalogOrder(patch.catalogOrder),unchanged=sameJson(deps.normalizeCatalogOrder(snapshot.catalogOrder||{}),nextOrder);catalogOrder=nextOrder;if(!unchanged)catalogOrderSha='';lines.push(`${unchanged?'UNCHANGED':'UPDATE'} catalog-order`);}
    const next=deps.normalizePlanningHelperLocalSnapshot({...snapshot,planningCommands:[...commandMap.values()],helperItems:[...helperMap.values()],useCases:[...useCaseMap.values()],useCaseCatalogSha:useCasesChanged?'':snapshot.useCaseCatalogSha,semanticComponents:[...componentMap.values()],semanticComponentCatalogSha:componentsChanged?'':snapshot.semanticComponentCatalogSha,scenarios:[...scenarioMap.values()],scenarioCatalogSha:scenariosChanged?'':snapshot.scenarioCatalogSha,catalogOrder,catalogOrderSha,suppressedRepository:suppressed,favoriteCommandIds,favoriteUseCaseIds});return{snapshot:next,newCommandRecords,newHelperRecords,removedRepositoryCommands:0,removedRepositoryHelperItems:0,parsed,lines};}
  function mergeChatImport(snapshot,parsed,mode='import'){if(mode==='restore')return mergeRestoreChatImport(snapshot,parsed);if(mode!=='import')throw new TypeError(`Unsupported chat-import mode: ${mode}`);return mergeImportChatPatch(snapshot,parsed);}
  function previewChatImport(snapshot,text,mode='import'){const parsed=deps.parseChatImport(text),merged=mergeChatImport(snapshot,parsed,mode);return{...merged,mode};}
  function inventoryBucket(localRecords,remoteEntries,suppressedPaths=[]){const suppressed=new Set(suppressedPaths||[]),localMap=new Map((localRecords||[]).map((record)=>[record.path,record])),remoteMap=new Map((remoteEntries||[]).map((entry)=>[entry.path,entry])),localOnly=[...localMap.keys()].filter((path)=>!remoteMap.has(path)).sort(),remoteOnly=[...remoteMap.keys()].filter((path)=>!localMap.has(path)&&!suppressed.has(path)).sort(),suppressedRemote=[...remoteMap.keys()].filter((path)=>!localMap.has(path)&&suppressed.has(path)).sort(),common=[...localMap.keys()].filter((path)=>remoteMap.has(path)).sort(),knownChanged=common.filter((path)=>{const local=localMap.get(path),remote=remoteMap.get(path);return Boolean(local.repositorySha)&&Boolean(remote.sha)&&local.repositorySha!==remote.sha;});return{local:localMap.size,remote:remoteMap.size,common:common.length,localOnly,remoteOnly,suppressedRemote,knownChanged};}
  function compareIdInventory(localItems,remoteItems,localSha='',remoteSha='',marker='catalog',suppressedIds=[]){const suppressed=new Set(suppressedIds||[]),localIds=(localItems||[]).map((u)=>u.id),remoteIds=(remoteItems||[]).map((u)=>u.id),localSet=new Set(localIds),remoteSet=new Set(remoteIds);return{local:localIds.length,remote:remoteIds.length,common:localIds.filter((id)=>remoteSet.has(id)).length,localOnly:localIds.filter((id)=>!remoteSet.has(id)),remoteOnly:remoteIds.filter((id)=>!localSet.has(id)&&!suppressed.has(id)),suppressedRemote:remoteIds.filter((id)=>!localSet.has(id)&&suppressed.has(id)),knownChanged:Boolean(localSha&&remoteSha&&localSha!==remoteSha)?[marker]:[]};}
  function compareUseCaseInventory(snapshot,remoteUseCases,remoteSha=''){return compareIdInventory(snapshot.useCases||[],remoteUseCases,snapshot.useCaseCatalogSha||'',remoteSha,'seed/use-cases.json',suppressionState(snapshot).useCases);}
  function compareRepositoryInventory(snapshot,remoteCatalog){const memory=materializeSnapshot(snapshot),remoteCommands=(remoteCatalog?.commands||[]).filter((entry)=>entry.kind==='planning-command'),remoteHelpers=remoteCatalog?.helperItems||[],suppressed=suppressionState(snapshot);return{planningCommands:inventoryBucket(memory.commandRecords,remoteCommands,suppressed.commands),useCases:compareUseCaseInventory(snapshot,remoteCatalog?.useCases||[],remoteCatalog?.useCaseSha||''),semanticComponents:compareIdInventory(snapshot.semanticComponents||[],remoteCatalog?.semanticComponents||[],snapshot.semanticComponentCatalogSha||'',remoteCatalog?.semanticComponentSha||'','seed/semantic-components.json',suppressed.semanticComponents),scenarios:compareIdInventory(snapshot.scenarios||[],remoteCatalog?.scenarios||[],snapshot.scenarioCatalogSha||'',remoteCatalog?.scenarioSha||'','seed/scenarios.json',suppressed.scenarios),helperCommands:inventoryBucket(memory.helperRecords.filter((record)=>record.item.kind===deps.HELPER_LIBRARY_KINDS.COMMAND),remoteHelpers.filter((entry)=>entry.kind===deps.HELPER_LIBRARY_KINDS.COMMAND),suppressed.helperItems),prompts:inventoryBucket(memory.helperRecords.filter((record)=>record.item.kind===deps.HELPER_LIBRARY_KINDS.PROMPT),remoteHelpers.filter((entry)=>entry.kind===deps.HELPER_LIBRARY_KINDS.PROMPT),suppressed.helperItems),catalogOrderChanged:Boolean(snapshot.catalogOrderSha&&remoteCatalog?.catalogOrderSha&&snapshot.catalogOrderSha!==remoteCatalog.catalogOrderSha)};}

  function prepareLocalCommandSave(snapshot,value,existingId=''){const memory=materializeSnapshot(snapshot),raw=typeof value==='string'?JSON.parse(value):(value&&typeof value==='object'?value:{}),definition=deps.normalizeCommandDefinition(raw),previous=existingId?memory.commandById.get(String(existingId)):null;if(existingId&&!previous)throw new Error(`Planning command not found: ${existingId}`);if(previous&&(definition.id!==previous.definition.id||definition.file!==previous.definition.file))throw new TypeError('Editing an existing command cannot change its id or file. Create a new command draft instead.');const collisionByFile=memory.commandRecords.find((record)=>record.definition.file===definition.file&&record.definition.id!==definition.id);if(collisionByFile)throw new TypeError(`Planning command file ${definition.file} already belongs to ${collisionByFile.definition.id}.`);const collisionById=memory.commandRecords.find((record)=>record.definition.id===definition.id&&record.definition.file!==definition.file);if(collisionById)throw new TypeError(`Planning command id ${definition.id} already belongs to ${collisionById.definition.file}.`);const rawContent=deps.renderCommandDefinitionDocument(definition);if(previous&&previous.rawContent===rawContent)return{changed:false,definition:previous.definition,record:previous,snapshot};const record=deps.normalizeCommandRecord({definition,rawContent,repositoryKnown:false,repositoryTracked:Boolean(previous?.repositoryTracked||previous?.repositoryKnown),repositorySha:''}),records=[...memory.commandRecords.filter((entry)=>entry.definition.id!==definition.id),record];deps.validateCommandCatalog(records.map((entry)=>entry.definition));const suppressed=suppressionState(snapshot);suppressed.commands=withoutValue(suppressed.commands,record.path);return{changed:true,definition,record,snapshot:{...snapshot,planningCommands:records,suppressedRepository:suppressed}};}
  function deleteLocalCommandFromSnapshot(snapshot,id){const memory=materializeSnapshot(snapshot),value=String(id||'').trim(),record=memory.commandById.get(value);if(!record)throw new Error(`Planning command not found: ${value||'<empty>'}`);const suppressed=suppressionState(snapshot);suppressed.commands=withValue(suppressed.commands,record.path);return deps.normalizePlanningHelperLocalSnapshot({...snapshot,planningCommands:memory.commandRecords.filter((entry)=>entry.definition.id!==value),suppressedRepository:suppressed,favoriteCommandIds:(snapshot.favoriteCommandIds||[]).filter((id)=>id!==value)});}
  function deleteLocalUseCaseFromSnapshot(snapshot,id){const value=String(id||'').trim();if(!(snapshot.useCases||[]).some((entry)=>entry.id===value))throw new Error(`Use Case not found: ${value||'<empty>'}`);const suppressed=suppressionState(snapshot);suppressed.useCases=withValue(suppressed.useCases,value);return deps.normalizePlanningHelperLocalSnapshot({...snapshot,useCases:(snapshot.useCases||[]).filter((entry)=>entry.id!==value),useCaseCatalogSha:'',suppressedRepository:suppressed,favoriteUseCaseIds:(snapshot.favoriteUseCaseIds||[]).filter((id)=>id!==value),favoriteCommandIds:(snapshot.favoriteCommandIds||[]).filter((id)=>id!==`uc:${value}`)});}
  function toggleFavoriteCommandInSnapshot(snapshot,id){const memory=materializeSnapshot(snapshot),value=String(id||'').trim(),entry=memory.commandEntries.find((candidate)=>candidate.id===value);if(!entry)throw new Error(`Command row not found: ${value||'<empty>'}`);const aliases=new Set([value,entry.directCommandId||''].filter(Boolean)),ids=new Set(snapshot.favoriteCommandIds||[]),isFavorite=[...aliases].some((candidate)=>ids.has(candidate))||memory.favoriteCommandIds.includes(value);for(const candidate of aliases)ids.delete(candidate);if(!isFavorite)ids.add(value);return deps.normalizePlanningHelperLocalSnapshot({...snapshot,favoriteCommandIds:[...ids]});}
  function toggleFavoriteUseCaseInSnapshot(snapshot,id){const value=String(id||'').trim();if(!(snapshot.useCases||[]).some((entry)=>entry.id===value))throw new Error(`Use Case not found: ${value||'<empty>'}`);const ids=new Set(snapshot.favoriteUseCaseIds||[]);if(ids.has(value))ids.delete(value);else ids.add(value);return deps.normalizePlanningHelperLocalSnapshot({...snapshot,favoriteUseCaseIds:[...ids]});}
  function prepareLocalHelperSave(snapshot,value,now=new Date().toISOString()){const memory=materializeSnapshot(snapshot),input=value&&typeof value==='object'?value:{},key=`${String(input.kind||'')}:${String(input.id||'')}`,previous=input.id?memory.helperByKey.get(key):null;if(previous){const stable=deps.normalizeHelperLibraryItem({...input,kind:previous.item.kind,id:previous.item.id,createdAt:previous.item.createdAt,updatedAt:previous.item.updatedAt}),unchanged=stable.title===previous.item.title&&stable.text===previous.item.text;if(unchanged)return{changed:false,item:previous.item,record:previous,snapshot};const item=deps.normalizeHelperLibraryItem({...stable,updatedAt:now}),record=deps.normalizeHelperRecord({item,rawContent:deps.renderHelperLibraryDocument(item),repositoryKnown:false,repositorySha:''});const suppressed=suppressionState(snapshot);suppressed.helperItems=withoutValue(suppressed.helperItems,record.path);return{changed:true,item,record,snapshot:{...snapshot,helperItems:[...memory.helperRecords.filter((entry)=>helperKey(entry.item)!==helperKey(item)),record],suppressedRepository:suppressed}};}const item=deps.normalizeHelperLibraryItem({...input,createdAt:input.createdAt||now,updatedAt:now}),record=deps.normalizeHelperRecord({item,rawContent:deps.renderHelperLibraryDocument(item),repositoryKnown:false,repositorySha:''});const suppressed=suppressionState(snapshot);suppressed.helperItems=withoutValue(suppressed.helperItems,record.path);return{changed:true,item,record,snapshot:{...snapshot,helperItems:[...memory.helperRecords,record],suppressedRepository:suppressed}};}
  function clearRepositoryEvidence(snapshot){const memory=materializeSnapshot(snapshot);return deps.normalizePlanningHelperLocalSnapshot({...snapshot,planningCommands:memory.commandRecords.map((record)=>deps.normalizeCommandRecord({...record,repositoryKnown:false,repositoryTracked:false,repositorySha:''})),helperItems:memory.helperRecords.map((record)=>deps.normalizeHelperRecord({...record,repositoryKnown:false,repositorySha:''})),useCaseCatalogSha:'',semanticComponentCatalogSha:'',scenarioCatalogSha:'',catalogOrderSha:'',suppressedRepository:{}});}
  function localPublishSnapshotSignature(snapshot){const normalized=deps.normalizePlanningHelperLocalSnapshot(snapshot),copy={...normalized,savedAt:''};return JSON.stringify(copy);}
  async function prepareLocalPublishPlan(snapshot,services){const{client,commandService,catalogService,settings}=services||{};if(!client||!commandService||!catalogService)throw new TypeError('Bulk publish services are incomplete.');const headSha=await client.getBranchHead(),memory=materializeSnapshot(snapshot),remoteCommands=await commandService.loadCatalog({allowEmpty:true}),remoteCommandByPath=new Map(remoteCommands.map((record)=>[record.path,record])),dirtyCommands=memory.commandRecords.filter((record)=>!record.repositoryKnown);if(dirtyCommands.length){const merged=deps.replaceDefinitionsByFile(remoteCommands.map((record)=>record.definition),dirtyCommands.map((record)=>record.definition));deps.validateCommandCatalog(merged);}const files=[],noops=[],lines=[];for(const record of dirtyCommands){const remote=remoteCommandByPath.get(record.path)||null,row={kind:'planning-command',path:record.path,content:record.rawContent,action:remote?'update':'add'};if(remote?.rawContent===record.rawContent){noops.push({...row,sha:remote.sha});lines.push(`NOOP ${record.path}`);}else{files.push(row);lines.push(`${row.action.toUpperCase()} ${record.path}`);}}for(const record of memory.helperRecords.filter((entry)=>!entry.repositoryKnown)){let remote=null;try{remote=await client.read(record.path);}catch(error){if(error?.kind!=='not_found')throw error;}const row={kind:'helper',path:record.path,content:record.rawContent,action:remote?'update':'add'};if(remote?.content.replace(/\r\n?/g,'\n')===record.rawContent){noops.push({...row,sha:String(remote.sha||'')});lines.push(`NOOP ${record.path}`);}else{files.push(row);lines.push(`${row.action.toUpperCase()} ${record.path}`);}}const remoteOrder=await catalogService.readOrder(),localOrderContent=deps.renderCatalogOrder(snapshot.catalogOrder||{}),remoteOrderContent=String(remoteOrder.rawContent||'').replace(/\r\n?/g,'\n');if(localOrderContent!==remoteOrderContent){if(snapshot.catalogOrderSha&&remoteOrder.sha&&snapshot.catalogOrderSha!==remoteOrder.sha)throw new Error('Catalog order changed on GitHub since the local verified version; Hard Reload or Save order conflict resolution is required before bulk publish.');files.push({kind:'catalog-order',path:remoteOrder.path||deps.CATALOG_ORDER_PATH,content:localOrderContent,action:remoteOrder.sha?'update':'add'});lines.push(`${remoteOrder.sha?'UPDATE':'ADD'} ${remoteOrder.path||deps.CATALOG_ORDER_PATH}`);}else if(remoteOrder.sha&&snapshot.catalogOrderSha!==remoteOrder.sha)noops.push({kind:'catalog-order',path:remoteOrder.path||deps.CATALOG_ORDER_PATH,content:localOrderContent,action:'noop',sha:remoteOrder.sha});const finalHead=await client.getBranchHead();if(finalHead!==headSha)throw new Error('GitHub branch changed while preparing bulk publish; reopen Publish local changes.');const suppressed=suppressionState(snapshot),skippedDeletes=suppressed.commands.length+suppressed.helperItems.length;if(skippedDeletes)lines.push(`SKIP ${skippedDeletes} local repository deletion/suppression(s) · repository delete is unsupported`);return{schemaVersion:1,repositoryKey:repositorySettingsKey(settings),branch:String(settings?.branch||client.branch||''),headSha,files,noops,lines,snapshotSignature:localPublishSnapshotSignature(snapshot),skippedDeletes,semanticProjectionWrites:0};}
  async function executeLocalPublishPlan(snapshot,plan,services,message='Publish Planning Helper local changes'){const{client,settings}=services||{};if(!plan||plan.schemaVersion!==1)throw new TypeError('Prepared bulk publish plan is required.');if(plan.repositoryKey!==repositorySettingsKey(settings))throw new Error('Repository settings changed after bulk publish preview; reopen Publish local changes.');if(plan.snapshotSignature!==localPublishSnapshotSignature(snapshot))throw new Error('Local Planning Helper state changed after bulk publish preview; reopen Publish local changes.');const currentHead=await client.getBranchHead();if(currentHead!==plan.headSha)throw new Error('GitHub branch changed after bulk publish preview; nothing was published.');const commitMessage=String(message||'').trim()||'Publish Planning Helper local changes';let publishResult={ok:true,commitSha:'',previousHeadSha:plan.headSha,recoveredAfterUnknownWrite:false,files:[]};if(plan.files.length)publishResult=await client.publishFilesAtomic({files:plan.files,message:commitMessage,expectedHeadSha:plan.headSha});const evidence=new Map();for(const row of [...plan.files,...plan.noops]){const remote=await client.read(row.path);const content=remote.content.replace(/\r\n?/g,'\n');if(content!==row.content)throw new Error(`Published file read-back does not match intended local content: ${row.path}`);evidence.set(row.path,String(remote.sha||''));}const memory=materializeSnapshot(snapshot),planningCommands=memory.commandRecords.map((record)=>evidence.has(record.path)?deps.normalizeCommandRecord({...record,repositoryKnown:true,repositoryTracked:true,repositorySha:evidence.get(record.path)}):record),helperItems=memory.helperRecords.map((record)=>evidence.has(record.path)?deps.normalizeHelperRecord({...record,repositoryKnown:true,repositorySha:evidence.get(record.path)}):record),orderPath=deps.CATALOG_ORDER_PATH||'planning/documentation/tools/tampermonkey/chat-command-palette/catalog-order.json',catalogOrderSha=evidence.has(orderPath)?evidence.get(orderPath):snapshot.catalogOrderSha,next=deps.normalizePlanningHelperLocalSnapshot({...snapshot,planningCommands,helperItems,catalogOrderSha});return{snapshot:next,action:plan.files.length?'commit':'noop',commitSha:publishResult.commitSha,previousHeadSha:publishResult.previousHeadSha,recoveredAfterUnknownWrite:Boolean(publishResult.recoveredAfterUnknownWrite),publishedFiles:plan.files.map((row)=>row.path),verifiedNoopFiles:plan.noops.map((row)=>row.path),skippedDeletes:plan.skippedDeletes||0};}
  async function persistVerifiedRepositoryResult(persist,next,result,settings,uiState){try{await persist(next);return{settings,...result,localSnapshotUpdated:true,localSnapshotError:'',...uiState()};}catch(error){return{settings,...result,localSnapshotUpdated:false,localSnapshotError:error?.message||String(error),...uiState()};}}
  function mergeRemoteMissing(snapshot,remoteRecords={}){const memory=materializeSnapshot(snapshot),suppressed=suppressionState(snapshot),commandSuppressed=new Set(suppressed.commands),helperSuppressed=new Set(suppressed.helperItems),useCaseSuppressed=new Set(suppressed.useCases),componentSuppressed=new Set(suppressed.semanticComponents),scenarioSuppressed=new Set(suppressed.scenarios),commandMap=new Map(memory.commandRecords.map((record)=>[record.path,record])),helperMap=new Map(memory.helperRecords.map((record)=>[record.path,record])),addedCommands=[],addedHelpers=[];for(const remote of remoteRecords.commands||[]){if(commandMap.has(remote.path)||commandSuppressed.has(remote.path))continue;const record=deps.normalizeCommandRecord({definition:remote.definition,path:remote.path,rawContent:remote.rawContent,repositoryKnown:true,repositoryTracked:true,repositorySha:remote.sha});commandMap.set(record.path,record);addedCommands.push(record);}deps.validateCommandCatalog([...commandMap.values()].map((record)=>record.definition));for(const remote of remoteRecords.helperItems||[]){if(helperMap.has(remote.path)||helperSuppressed.has(remote.path))continue;const record=deps.normalizeHelperRecord({item:remote.item,path:remote.path,rawContent:remote.rawContent,repositoryKnown:true,repositorySha:remote.sha});helperMap.set(record.path,record);addedHelpers.push(record);}const mergeById=(current,incoming,suppressedIds)=>{const map=new Map((current||[]).map((entry)=>[entry.id,entry])),added=[];for(const item of incoming||[]){if(map.has(item.id)||suppressedIds.has(item.id))continue;map.set(item.id,item);added.push(item);}return{items:[...map.values()],added};};const uc=mergeById(snapshot.useCases,remoteRecords.useCases,useCaseSuppressed),components=mergeById(snapshot.semanticComponents,remoteRecords.semanticComponents,componentSuppressed),scenarios=mergeById(snapshot.scenarios,remoteRecords.scenarios,scenarioSuppressed);const next=deps.normalizePlanningHelperLocalSnapshot({...snapshot,planningCommands:[...commandMap.values()],helperItems:[...helperMap.values()],useCases:uc.items,semanticComponents:components.items,scenarios:scenarios.items,useCaseCatalogSha:uc.added.length?'':snapshot.useCaseCatalogSha,semanticComponentCatalogSha:components.added.length?'':snapshot.semanticComponentCatalogSha,scenarioCatalogSha:scenarios.added.length?'':snapshot.scenarioCatalogSha});return{snapshot:next,addedCommands,addedHelpers,addedUseCases:uc.added,addedSemanticComponents:components.added,addedScenarios:scenarios.added};}
  async function prepareInvocationBody(text,id,invocation={},operations=deps){const body=String(text==null?'':text);if(typeof operations.applyCommandSideEffects!=='function')return body;return operations.applyCommandSideEffects(id,body,{effectIds:invocation?.effectIds||[]});}

  async function insertWithClipboard(text,success,id,operations=deps){let copied=false;try{const copyResult=operations.copyText(text);copied=copyResult&&typeof copyResult.then==='function'?Boolean(await copyResult):Boolean(copyResult);}catch(_){copied=false;}const result=operations.insertIntoComposer(text,id);if(result.ok)return copied?`${success} · clipboard ready`:`${success} · clipboard copy failed`;return copied?`Direct insertion failed (${result.reason}). The exact text is in the clipboard — paste manually.`:`Direct insertion failed (${result.reason}) and clipboard copy also failed.`;}

  async function startPlanningHelper(){
    for(const key of [INSTANCE_DISPOSE_KEY,...LEGACY_DISPOSE_KEYS]){const previous=globalThis[key];if(typeof previous==='function'){try{previous();}catch(_){}}}
    const repositoryLock=createRepositoryOperationLock(),loaded=await deps.loadOrMigratePlanningHelperLocalSnapshot();let snapshot=loaded.snapshot,memory=materializeSnapshot(snapshot),preparedLocalPublish=null;const startupWarnings=[...(loaded.warnings||[])];if(loaded.migrated)startupWarnings.push('Planning Helper migrated existing local data into the current local-cache schema.');
    function uiState(){return{commandEntries:memory.commandEntries,localCommandEntries:memory.localCommandEntries,promptEntries:memory.promptEntries,scenarioEntries:memory.scenarioEntries,useCaseEntries:memory.useCaseEntries,catalogOrder:memory.order,favoriteCommandIds:[...memory.favoriteCommandIds],favoriteUseCaseIds:[...(snapshot.favoriteUseCaseIds||[])]};}
    async function persist(next){snapshot=await deps.savePlanningHelperLocalSnapshot(next);memory=materializeSnapshot(snapshot);return uiState();}
    async function makeClient(){const settings=await deps.loadRepositorySettings(),token=await deps.loadGitHubToken();if(typeof GM_xmlhttpRequest!=='function')throw new Error('GM_xmlhttpRequest is unavailable; reinstall the generated Planning Helper userscript and accept its GM grants.');return{client:new deps.GitHubContentsClient({...settings,token,transport:deps.createGmTransport(GM_xmlhttpRequest)}),settings,token};}
    async function makeServices(){const{client,settings}=await makeClient();return{client,commandService:new deps.RepositoryCommandService(client,{commandsPath:deps.COMMANDS_PATH}),helperService:new deps.RepositoryHelperLibraryService(client),catalogService:new deps.RepositoryCatalogService(client),settings};}
    async function applyChatText(text,mode='import'){return repositoryLock.run(mode==='restore'?'Restore local snapshot':'Import chat items',async()=>{const parsed=deps.parseChatImport(text),merged=mergeChatImport(snapshot,parsed,mode);await persist(merged.snapshot);return{ok:true,mode,createdLocal:merged.newCommandRecords.length+merged.newHelperRecords.length,removedRepositoryCommands:merged.removedRepositoryCommands||0,removedRepositoryHelperItems:merged.removedRepositoryHelperItems||0,errors:[],...uiState()};});}
    async function saveLocalCommandDefinition(value,existingId=''){const prepared=prepareLocalCommandSave(snapshot,value,existingId);if(!prepared.changed)return{definition:prepared.definition,unchanged:true,...uiState()};const state=await persist(prepared.snapshot);return{definition:prepared.definition,unchanged:false,...state};}
    async function deleteLocalCommand(id){return persist(deleteLocalCommandFromSnapshot(snapshot,id));}async function deleteLocalUseCase(id){return persist(deleteLocalUseCaseFromSnapshot(snapshot,id));}async function toggleFavoriteCommand(id){return persist(toggleFavoriteCommandInSnapshot(snapshot,id));}async function toggleFavoriteUseCase(id){return persist(toggleFavoriteUseCaseInSnapshot(snapshot,id));}
    async function reloadRepositoryCommand(id){return repositoryLock.run('Reload planning command from GitHub',async()=>{const{commandService,settings}=await makeServices(),record=memory.commandById.get(String(id||''));if(!record)throw new Error(`Planning command not found: ${id||'<empty>'}`);const remote=await commandService.readRemote(record.path),replacement=deps.normalizeCommandRecord({definition:remote.definition,path:remote.path,rawContent:remote.rawContent,repositoryKnown:true,repositoryTracked:true,repositorySha:remote.sha}),records=memory.commandRecords.map((entry)=>entry.definition.id===record.definition.id?replacement:entry);deps.validateCommandCatalog(records.map((entry)=>entry.definition));const state=await persist({...snapshot,planningCommands:records});return{settings,path:remote.path,sha:remote.sha,...state};});}
    async function saveLocalLibraryItem(value){const prepared=prepareLocalHelperSave(snapshot,value);if(!prepared.changed)return{item:prepared.item,unchanged:true,...uiState()};const state=await persist(prepared.snapshot);return{item:prepared.item,unchanged:false,...state};}async function deleteLocalLibraryItem(kind,id){const key=`${kind}:${id}`;return persist({...snapshot,helperItems:memory.helperRecords.filter((record)=>helperKey(record.item)!==key)});}
    async function checkRepository(){return repositoryLock.run('Check GitHub inventory',async()=>{const{commandService,helperService,catalogService,settings}=await makeServices(),commands=await commandService.listRemote(),helperItems=await helperService.listRemoteAll(),useCaseCatalog=await catalogService.readUseCases(),semanticCatalog=await catalogService.readSemanticComponents(),scenarioCatalog=await catalogService.readScenarios(),order=await catalogService.readOrder(),remoteCatalog={commands,helperItems,useCases:useCaseCatalog.useCases,useCaseSha:useCaseCatalog.sha,semanticComponents:semanticCatalog.components,semanticComponentSha:semanticCatalog.sha,scenarios:scenarioCatalog.scenarios,scenarioSha:scenarioCatalog.sha,catalogOrderSha:order.sha};return{settings,inventory:compareRepositoryInventory(snapshot,remoteCatalog),remoteCatalog};});}
    async function syncMissingRepository(){return repositoryLock.run('Sync missing from GitHub',async()=>{const{commandService,helperService,catalogService,settings}=await makeServices(),commands=await commandService.listRemote(),helperItems=await helperService.listRemoteAll(),useCaseCatalog=await catalogService.readUseCases(),semanticCatalog=await catalogService.readSemanticComponents(),scenarioCatalog=await catalogService.readScenarios(),remoteCatalog={commands,helperItems,useCases:useCaseCatalog.useCases,useCaseSha:useCaseCatalog.sha,semanticComponents:semanticCatalog.components,semanticComponentSha:semanticCatalog.sha,scenarios:scenarioCatalog.scenarios,scenarioSha:scenarioCatalog.sha},inventory=compareRepositoryInventory(snapshot,remoteCatalog),commandMissing=new Set(inventory.planningCommands.remoteOnly),helperMissing=new Set([...inventory.helperCommands.remoteOnly,...inventory.prompts.remoteOnly]),remoteCommands=[],remoteHelpers=[];for(const entry of commands)if(commandMissing.has(entry.path))remoteCommands.push(await commandService.readRemote(entry.path));for(const entry of helperItems)if(helperMissing.has(entry.path))remoteHelpers.push(await helperService.readRemote(entry.path));const merged=mergeRemoteMissing(snapshot,{commands:remoteCommands,helperItems:remoteHelpers,useCases:useCaseCatalog.useCases.filter((entry)=>inventory.useCases.remoteOnly.includes(entry.id)),semanticComponents:semanticCatalog.components.filter((entry)=>inventory.semanticComponents.remoteOnly.includes(entry.id)),scenarios:scenarioCatalog.scenarios.filter((entry)=>inventory.scenarios.remoteOnly.includes(entry.id))});await persist(merged.snapshot);return{settings,addedCommands:merged.addedCommands.length,addedUseCases:merged.addedUseCases.length,addedSemanticComponents:merged.addedSemanticComponents.length,addedScenarios:merged.addedScenarios.length,addedHelperCommands:merged.addedHelpers.filter((record)=>record.item.kind===deps.HELPER_LIBRARY_KINDS.COMMAND).length,addedPrompts:merged.addedHelpers.filter((record)=>record.item.kind===deps.HELPER_LIBRARY_KINDS.PROMPT).length,inventoryBefore:inventory,...uiState()};});}
    async function hardReloadRepository(){return repositoryLock.run('Hard Reload GitHub catalogs',async()=>{const{commandService,catalogService,settings}=await makeServices(),commandRecords=await commandService.loadCatalog(),useCaseCatalog=await catalogService.readUseCases(),semanticCatalog=await catalogService.readSemanticComponents(),scenarioCatalog=await catalogService.readScenarios(),order=await catalogService.readOrder(),planningCommands=commandRecords.map((remote)=>deps.normalizeCommandRecord({definition:remote.definition,path:remote.path,rawContent:remote.rawContent,repositoryKnown:true,repositoryTracked:true,repositorySha:remote.sha}));deps.validateCommandCatalog(planningCommands.map((record)=>record.definition));const preservedPrompts=memory.helperRecords.filter((record)=>record.item.kind===deps.HELPER_LIBRARY_KINDS.PROMPT),removedLegacyCommands=memory.helperRecords.length-preservedPrompts.length;let next=deps.normalizePlanningHelperLocalSnapshot({...snapshot,planningCommands,helperItems:preservedPrompts,useCases:useCaseCatalog.useCases,useCaseCatalogSha:useCaseCatalog.sha,semanticComponents:semanticCatalog.components,semanticComponentCatalogSha:semanticCatalog.sha,scenarios:scenarioCatalog.scenarios,scenarioCatalogSha:scenarioCatalog.sha,catalogOrder:order.order,catalogOrderSha:order.sha,suppressedRepository:{helperItems:suppressionState(snapshot).helperItems}});const valid=materializeSnapshot(next),validCommandIds=new Set(valid.commandEntries.map((entry)=>entry.id)),validUseCaseIds=new Set(useCaseCatalog.useCases.map((entry)=>entry.id));next=deps.normalizePlanningHelperLocalSnapshot({...next,favoriteCommandIds:(next.favoriteCommandIds||[]).filter((id)=>validCommandIds.has(valid.legacySemanticIdByDirect.get(String(id))||String(id))),favoriteUseCaseIds:(next.favoriteUseCaseIds||[]).filter((id)=>validUseCaseIds.has(String(id)))});const state=await persist(next);return{settings,commands:planningCommands.length,semanticComponents:semanticCatalog.components.length,scenarios:scenarioCatalog.scenarios.length,removedLegacyCommands,orderPath:order.path,orderSha:order.sha,...state};});}
    async function moveCatalogItem(surface,id,delta){const currentIds=surface===deps.SURFACES.COMMANDS?memory.commandEntries.map((entry)=>entry.id):surface===deps.SURFACES.SCENARIOS?memory.scenarioEntries.map((entry)=>entry.id):surface===deps.SURFACES.PROMPTS?memory.promptEntries.map((entry)=>entry.id):[];if(!currentIds.length)throw new Error(`No reorderable items on ${surface}.`);const key=surface===deps.SURFACES.COMMANDS?'commands':surface===deps.SURFACES.SCENARIOS?'scenarios':'prompts',order=deps.normalizeCatalogOrder(snapshot.catalogOrder||{});order[key]=moveId(order[key],currentIds,id,delta);return persist({...snapshot,catalogOrder:order,catalogOrderSha:''});}
    async function assignCatalogGroup(id,groupId,viewId){const order=assignCommandGroupInOrder(snapshot.catalogOrder||{},id,groupId,viewId);return persist({...snapshot,catalogOrder:order,catalogOrderSha:''});}
    async function createCatalogGroup(input){const order=createCommandGroupInOrder(snapshot.catalogOrder||{},input);return persist({...snapshot,catalogOrder:order,catalogOrderSha:''});}
    async function updateCatalogGroup(groupId,input){const order=updateCommandGroupInOrder(snapshot.catalogOrder||{},groupId,input);return persist({...snapshot,catalogOrder:order,catalogOrderSha:''});}
    async function deleteCatalogGroup(groupId){const order=deleteCommandGroupInOrder(snapshot.catalogOrder||{},groupId);return persist({...snapshot,catalogOrder:order,catalogOrderSha:''});}
    async function moveCatalogGroup(groupId,delta){const order=moveCommandGroupInOrder(snapshot.catalogOrder||{},groupId,delta);return persist({...snapshot,catalogOrder:order,catalogOrderSha:''});}
    async function saveCatalogOrderRepository(){return repositoryLock.run('Save catalog order to GitHub',async()=>{const{catalogService,settings}=await makeServices(),result=await catalogService.saveOrder(snapshot.catalogOrder),state=await persist({...snapshot,catalogOrder:result.order,catalogOrderSha:result.sha});return{settings,...result,...state};});}
    async function preparePublishLocalChanges(){return repositoryLock.run('Prepare local changes publish',async()=>{const services=await makeServices(),plan=await prepareLocalPublishPlan(snapshot,services);preparedLocalPublish=plan;return{settings:services.settings,branch:plan.branch,files:plan.files.map((row)=>({path:row.path,action:row.action,kind:row.kind})),verifiedNoops:plan.noops.map((row)=>row.path),lines:plan.lines,skippedDeletes:plan.skippedDeletes,semanticProjectionWrites:0};});}
    async function publishLocalChanges(message){return repositoryLock.run('Publish local changes',async()=>{if(!preparedLocalPublish)throw new Error('Bulk publish preview is missing or stale; reopen Publish local changes.');const plan=preparedLocalPublish;preparedLocalPublish=null;const services=await makeServices(),result=await executeLocalPublishPlan(snapshot,plan,services,message);try{await persist(result.snapshot);return{settings:services.settings,...result,localSnapshotUpdated:true,localSnapshotError:'',...uiState()};}catch(error){return{settings:services.settings,...result,localSnapshotUpdated:false,localSnapshotError:error?.message||String(error),...uiState()};}});}
    async function saveRepositoryEntity(reference){return repositoryLock.run('Save item to GitHub',async()=>{const{commandService,helperService,settings}=await makeServices(),type=String(reference?.type||'');let result,next;if(type==='planning-command'){const record=memory.commandById.get(String(reference.id||''));if(!record)throw new Error(`Local planning command not found: ${reference?.id||'<empty>'}`);result=await commandService.save(record.definition);next={...snapshot,planningCommands:memory.commandRecords.map((entry)=>entry.path===record.path?deps.normalizeCommandRecord({...entry,rawContent:result.rawContent,repositoryKnown:true,repositoryTracked:true,repositorySha:result.sha}):entry)};}else if(type==='helper'){const key=`${reference?.kind}:${reference?.id}`,record=memory.helperByKey.get(key);if(!record)throw new Error(`Local helper item not found: ${key}`);result=await helperService.save(record.item);next={...snapshot,helperItems:memory.helperRecords.map((entry)=>entry.path===record.path?deps.normalizeHelperRecord({...entry,rawContent:result.rawContent,repositoryKnown:true,repositorySha:result.sha}):entry)};}else throw new TypeError(`Unsupported repository entity type: ${type||'<empty>'}`);return persistVerifiedRepositoryResult(persist,next,result,settings,uiState);});}
    async function getRecoveryRequest(){const settings=await deps.loadRepositorySettings();return deps.buildRecoveryRequest(settings);}async function loadSettings(){return{settings:await deps.loadRepositorySettings(),token:await deps.loadGitHubToken()};}async function saveSettings(settings,token){return repositoryLock.run('Save repository settings',async()=>{const previous=await deps.loadRepositorySettings(),candidate=deps.validateRepositorySettings(settings),sourceChanged=repositorySettingsKey(previous)!==repositorySettingsKey(candidate);if(sourceChanged)await persist(clearRepositoryEvidence(snapshot));await deps.saveGitHubToken(token);await deps.saveRepositorySettings(candidate);return{sourceChanged,...uiState()};});}
    const ui=deps.createPlanningHelperUi({surfaces:deps.SURFACES,...uiState(),position:deps.readPanelPosition(),onSavePosition:deps.savePanelPosition,onInsert:async(text,success,id,invocation)=>insertWithClipboard(await prepareInvocationBody(text,id,invocation),success,id),onCopy:async(text,id,invocation)=>deps.copyText(await prepareInvocationBody(text,id,invocation)),onGetInvocationSideEffects:(id)=>typeof deps.commandSideEffectIds==='function'?deps.commandSideEffectIds(id):[],onPreviewChatImport:(text,mode)=>previewChatImport(snapshot,text,mode),onApplyChatImport:applyChatText,onGetRecoveryRequest:getRecoveryRequest,onSaveLocalCommandDefinition:saveLocalCommandDefinition,onDeleteLocalCommand:deleteLocalCommand,onDeleteLocalUseCase:deleteLocalUseCase,onToggleFavoriteCommand:toggleFavoriteCommand,onToggleFavoriteUseCase:toggleFavoriteUseCase,onReloadRepositoryCommand:reloadRepositoryCommand,onSaveLocalLibraryItem:saveLocalLibraryItem,onDeleteLocalLibraryItem:deleteLocalLibraryItem,onCheckRepository:checkRepository,onSyncMissingRepository:syncMissingRepository,onHardReloadRepository:hardReloadRepository,onMoveCatalogItem:moveCatalogItem,onAssignCatalogGroup:assignCatalogGroup,onCreateCatalogGroup:createCatalogGroup,onUpdateCatalogGroup:updateCatalogGroup,onDeleteCatalogGroup:deleteCatalogGroup,onMoveCatalogGroup:moveCatalogGroup,onSaveCatalogOrderRepository:saveCatalogOrderRepository,onPreparePublishLocalChanges:preparePublishLocalChanges,onPublishLocalChanges:publishLocalChanges,onSaveRepositoryEntity:saveRepositoryEntity,onLoadSettings:loadSettings,onSaveSettings:saveSettings,startupWarnings});
    function dispose(){ui?.dispose();if(globalThis[INSTANCE_DISPOSE_KEY]===dispose)delete globalThis[INSTANCE_DISPOSE_KEY];for(const key of LEGACY_DISPOSE_KEYS)if(globalThis[key]===dispose)delete globalThis[key];}globalThis[INSTANCE_DISPOSE_KEY]=dispose;
    return{dispose,getSnapshot:()=>snapshot,getDefinitions:()=>memory.commandRecords.map((record)=>record.definition),getUseCases:()=>memory.useCases,getLocalLibrary:()=>memory.helperRecords.map((record)=>record.item),previewChatImport:(text,mode)=>previewChatImport(snapshot,text,mode),applyChatImport:applyChatText,saveLocalCommandDefinition,deleteLocalCommand,deleteLocalUseCase,toggleFavoriteCommand,toggleFavoriteUseCase,reloadRepositoryCommand,checkRepository,syncMissingRepository,hardReloadRepository,moveCatalogItem,assignCatalogGroup,createCatalogGroup,updateCatalogGroup,deleteCatalogGroup,moveCatalogGroup,saveCatalogOrderRepository,preparePublishLocalChanges,publishLocalChanges,saveRepositoryEntity,getRepositoryOperation:()=>repositoryLock.active()};
  }

  return{startPlanningHelper,createRepositoryOperationLock,materializeSnapshot,mergeChatImport,previewChatImport,compareRepositoryInventory,mergeRemoteMissing,prepareLocalCommandSave,deleteLocalCommandFromSnapshot,deleteLocalUseCaseFromSnapshot,toggleFavoriteCommandInSnapshot,toggleFavoriteUseCaseInSnapshot,prepareLocalHelperSave,clearRepositoryEvidence,localPublishSnapshotSignature,prepareLocalPublishPlan,executeLocalPublishPlan,persistVerifiedRepositoryResult,prepareInvocationBody,insertWithClipboard,sortByIds,moveId,presentationGroupForId,decoratePresentationGroups,assignCommandGroupInOrder,createCommandGroupInOrder,updateCommandGroupInOrder,deleteCommandGroupInOrder,moveCommandGroupInOrder};
});

(function(){
  'use strict';
  const api=globalThis.ObsPlanningHelper;if(!api||typeof api.startPlanningHelper!=='function')throw new Error('OBS Planning Helper runtime was not built correctly.');api.startPlanningHelper().catch((error)=>console.error('[OBS Planning Helper startup]',error));
})();
