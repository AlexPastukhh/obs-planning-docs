// ==UserScript==
// @name         Reusable Chat Planning Helper
// @namespace    https://github.com/AlexPastukhh/obs/reusable-docs
// @version      0.32.1-repository-command-registry
// @description  RAM-first OBS Planning Helper with GitHub-backed Directions, Commands, Use Cases, prompts and explicit repository actions.
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
// GitHub Direction/Use-Case authority: planning/direction-registry.md + current canonical Use-Case registries under planning/** (case-insensitive filename; legacy/historical compatibility indexes excluded).
// seed/directions.json + seed/use-cases.json are build-verified GitHub-backed projections used for explicit Hard Reload.
// GitHub UI-order source: planning/documentation/tools/tampermonkey/chat-command-palette/catalog-order.json
// Local snapshot is the working cache; current Direction/Command/Use-Case catalogs are not embedded in this userscript.
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
    'userTarget', 'palette', 'refinements', 'directionIds', 'helperPresentation', 'methodologyBinding'
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
      directionIds: raw.directionIds == null ? [] : stringArray(raw.directionIds, 'directionIds').map((id,index)=>{const value=singleLine(id,`directionIds[${index}]`);assert(/^DIR-[A-Z0-9-]+$/.test(value),`directionIds[${index}] must be a DIR-* id.`);return value;}),
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
      ...(normalized.directionIds.length ? { directionIds: normalized.directionIds } : {}),
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
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  root.ObsPlanningHelper=Object.assign(root.ObsPlanningHelper||{},api);
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';

  const SURFACES=Object.freeze({COMMANDS:'Commands',USE_CASES:'Use Cases',PROMPTS:'Prompts'});
  const MODE=Object.freeze({ADAPTIVE:'adaptive',FULL:'full'});

  function safeLine(value,label){const text=String(value==null?'':value).trim();if(!text)throw new TypeError(`${label} is required.`);if(/[\r\n\u0000-\u001f\u007f]/.test(text))throw new TypeError(`${label} must be one safe line.`);return text;}
  function safePath(value,label){const text=safeLine(value,label).replace(/\\/g,'/');if(text.startsWith('/')||text.includes('://')||text.split('/').some((part)=>!part||part==='.'||part==='..'))throw new TypeError(`${label} must be a safe repository-relative path.`);return text;}
  function uniqueStrings(values,reader){const out=[];for(const raw of Array.isArray(values)?values:[]){const value=reader(raw);if(!out.includes(value))out.push(value);}return out;}

  function normalizeDirectionDefinition(value){const input=value&&typeof value==='object'?value:{};const id=safeLine(input.id,'Direction id');if(!/^DIR-[A-Z0-9-]+$/.test(id))throw new TypeError(`Invalid Direction id: ${id}`);const label=safeLine(input.label,'Direction label');const description=String(input.description||label).trim();const sources=uniqueStrings(input.sources,(v)=>safePath(v,`${id} source`));if(!sources.length)throw new TypeError(`Direction source is required: ${id}`);return{id,label,description,sources};}
  function normalizeDirectionDefinitions(values){const definitions=(Array.isArray(values)?values:[]).map(normalizeDirectionDefinition);const ids=definitions.map((entry)=>entry.id);if(new Set(ids).size!==ids.length)throw new TypeError('Duplicate Direction ids in local/repository catalog.');return definitions;}

  function normalizeUseCaseDefinition(value){
    if(!value||typeof value!=='object')throw new TypeError('Use-Case definition must be an object.');
    const id=safeLine(value.id,'Use-Case id');if(!/^UC-[A-Z0-9-]+$/.test(id))throw new TypeError(`Invalid Use-Case id: ${id}`);
    const label=safeLine(value.label,`${id} label`),description=String(value.description||label).trim();
    const sources=uniqueStrings(value.sources,(v)=>safePath(v,`${id} source`));if(!sources.length)throw new TypeError(`Use-Case source registry is required: ${id}`);
    const instruction=String(value.instruction||'').trim();if(!instruction)throw new TypeError(`Use-Case instruction is required: ${id}`);
    const target=String(value.target||`<${label} target>`).trim(),directionId=safeLine(value.directionId,`${id} directionId`);if(!/^DIR-[A-Z0-9-]+$/.test(directionId))throw new TypeError(`Invalid Use-Case Direction id: ${directionId}`);
    const commandId=String(value.commandId||'').trim();
    const result={id,label,description,sources,instruction,target,directionId,manualInvocation:value.manualInvocation!==false,trigger:String(value.trigger||'').trim(),result:String(value.result||'').trim()};if(commandId)result.commandId=commandId;return result;
  }
  function normalizeUseCaseDefinitions(values){const definitions=(Array.isArray(values)?values:[]).map(normalizeUseCaseDefinition);const ids=definitions.map((entry)=>entry.id);if(new Set(ids).size!==ids.length)throw new TypeError('Duplicate Use-Case ids in local/repository catalog.');return definitions;}
  function directionIdsForCommand(definition,useCases=[]){const linked=[...new Set(normalizeUseCaseDefinitions(useCases).filter((item)=>item.commandId===definition?.id).map((item)=>item.directionId))];if(linked.length)return linked;return uniqueStrings(definition?.directionIds,(v)=>safeLine(v,'command directionId')).filter((id)=>/^DIR-[A-Z0-9-]+$/.test(id));}

  function readRule(mode,kind){if(mode===MODE.FULL)return [`Full ${kind} reading is required for this invocation.`,'Read every listed source, resolve the selected current entry and follow the complete relevant owner route.','Read materially defining principles/workflows/templates/integration rules reached by that route.','Do not expand into unrelated families.','Full changes read depth only; it does not expand permissions.'];return [`Use remembered ${kind} context only while clearly sufficient.`,'Resolve/read listed sources and the current owner route when not current, uncertain, changed or challenged.','Do not rely only on this compact prompt when ownership/status/boundaries are uncertain.'];}
  function buildSemanticBody(kind,definition,mode){
    const normalized=kind==='use_case'?normalizeUseCaseDefinition(definition):definition,marker=kind==='use_case'?'PLANNING_USE_CASE':'PLANNING_SEMANTIC_ENTRY',idField=kind==='use_case'?'use_case_id':`${kind}_id`;
    const lines=[`[${marker}]`,`${idField}:`,`  ${normalized.id}`,'',`${kind}:`,`  ${normalized.label}`,'','mode:',`  ${mode}`];
    if(kind==='use_case')lines.push('','semantic_owner:','  Work in this Use Case as the current semantic planning unit. Neighboring responsibilities are inputs/integration context unless the selected owner route explicitly requires them.');
    lines.push('','source_of_truth:',...(normalized.sources||[]).map((s)=>`  - \`${s}\``));
    if(kind==='use_case')lines.push('','route_resolution:','  Resolve this exact current Use-Case entry. Follow its current Main Owner / Owner Route and then the current owner links/read-order to every principle, workflow, template and integration rule materially defining this Use Case. Do not treat this Helper body as a frozen list of all future owner paths.');
    lines.push('','read_rule:',...readRule(mode,kind).map((x)=>`  ${x}`),'','instruction:',`  ${normalized.instruction}`);
    if(kind==='use_case')lines.push('','permission:','  Semantic planning/read context only. Use-Case activation does not grant executable-command, repository-mutation, archive, commit or push permission.');
    lines.push('','user_target:',`  ${normalized.target}`,`[/${marker}]`);return lines.join('\n');
  }
  function buildSemanticEntries(useCases=[]){const definitions=normalizeUseCaseDefinitions(useCases);return{[SURFACES.USE_CASES]:definitions.map((d)=>({...d,adaptiveBody:buildSemanticBody('use_case',d,MODE.ADAPTIVE),fullBody:buildSemanticBody('use_case',d,MODE.FULL)}))};}

  return{SURFACES,MODE,normalizeDirectionDefinition,normalizeDirectionDefinitions,normalizeUseCaseDefinition,normalizeUseCaseDefinitions,directionIdsForCommand,buildSemanticBody,buildSemanticEntries};
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
  const api=factory(typeof require==='function'?Object.assign({},require('./semantic-projections.js'),root.ObsPlanningHelper||{}):(root.ObsPlanningHelper||{}));
  if(typeof module==='object'&&module.exports)module.exports=api;
  root.ObsPlanningHelper=Object.assign(root.ObsPlanningHelper||{},api);
})(typeof globalThis!=='undefined'?globalThis:this,function(deps){
  'use strict';

  const DIRECTION_CATALOG_PATH='planning/documentation/tools/tampermonkey/chat-command-palette/seed/directions.json';
  const USE_CASE_CATALOG_PATH='planning/documentation/tools/tampermonkey/chat-command-palette/seed/use-cases.json';
  const CATALOG_ORDER_PATH='planning/documentation/tools/tampermonkey/chat-command-palette/catalog-order.json';
  const CATALOG_ORDER_KIND='planning-helper-catalog-order';

  function normalizeIdOrder(value,label){const result=[];for(const raw of Array.isArray(value)?value:[]){const id=String(raw||'').trim();if(!id)continue;if(/[\r\n\u0000-\u001f\u007f]/.test(id))throw new TypeError(`${label} contains unsafe id.`);if(!result.includes(id))result.push(id);}return result;}
  function normalizeCatalogOrder(value={}){const input=value&&typeof value==='object'?value:{};if(input.schemaVersion!=null&&Number(input.schemaVersion)!==1)throw new TypeError(`Unsupported catalog-order schemaVersion: ${input.schemaVersion}`);if(input.kind!=null&&String(input.kind)!==CATALOG_ORDER_KIND)throw new TypeError(`Unsupported catalog-order kind: ${input.kind}`);return{schemaVersion:1,kind:CATALOG_ORDER_KIND,directions:normalizeIdOrder(input.directions,'directions'),commands:normalizeIdOrder(input.commands,'commands'),useCases:normalizeIdOrder(input.useCases,'useCases'),prompts:normalizeIdOrder(input.prompts,'prompts')};}
  function renderCatalogOrder(value){return JSON.stringify(normalizeCatalogOrder(value),null,2)+'\n';}

  function parseDirectionCatalog(text,path=DIRECTION_CATALOG_PATH){let value;try{value=JSON.parse(String(text||''));}catch(error){throw new TypeError(`Invalid Direction repository catalog JSON at ${path}: ${error.message}`);}if(!value||value.schemaVersion!==1||value.kind!=='direction-seed'||!Array.isArray(value.items))throw new TypeError(`Invalid Direction repository catalog shape at ${path}.`);const directions=deps.normalizeDirectionDefinitions(value.items);if(!directions.length)throw new TypeError(`Direction repository catalog is empty at ${path}.`);return{schemaVersion:1,kind:'direction-seed',generatedFrom:String(value.generatedFrom||''),directions};}
  function parseUseCaseCatalog(text,path=USE_CASE_CATALOG_PATH){let value;try{value=JSON.parse(String(text||''));}catch(error){throw new TypeError(`Invalid Use-Case repository catalog JSON at ${path}: ${error.message}`);}if(!value||value.schemaVersion!==1||value.kind!=='use-case-seed'||!Array.isArray(value.items))throw new TypeError(`Invalid Use-Case repository catalog shape at ${path}.`);const useCases=deps.normalizeUseCaseDefinitions(value.items);if(!useCases.length)throw new TypeError(`Use-Case repository catalog is empty at ${path}.`);return{schemaVersion:1,kind:'use-case-seed',generatedFrom:String(value.generatedFrom||''),useCases};}
  function parseCatalogOrder(text,path=CATALOG_ORDER_PATH){let value;try{value=JSON.parse(String(text||''));}catch(error){throw new TypeError(`Invalid catalog-order JSON at ${path}: ${error.message}`);}return normalizeCatalogOrder(value);}

  class RepositoryCatalogService{
    constructor(client){this.client=client;}
    async readDirections(){const remote=await this.client.read(DIRECTION_CATALOG_PATH);const parsed=parseDirectionCatalog(remote.content);return{path:DIRECTION_CATALOG_PATH,sha:String(remote.sha||''),directions:parsed.directions,generatedFrom:parsed.generatedFrom,rawContent:remote.content.replace(/\r\n?/g,'\n')};}
    async readUseCases(){const remote=await this.client.read(USE_CASE_CATALOG_PATH);const parsed=parseUseCaseCatalog(remote.content);return{path:USE_CASE_CATALOG_PATH,sha:String(remote.sha||''),useCases:parsed.useCases,generatedFrom:parsed.generatedFrom,rawContent:remote.content.replace(/\r\n?/g,'\n')};}
    async readOrder(){try{const remote=await this.client.read(CATALOG_ORDER_PATH);return{path:CATALOG_ORDER_PATH,sha:String(remote.sha||''),order:parseCatalogOrder(remote.content),rawContent:remote.content.replace(/\r\n?/g,'\n')};}catch(error){if(error?.kind==='not_found')return{path:CATALOG_ORDER_PATH,sha:'',order:normalizeCatalogOrder({}),rawContent:''};throw error;}}
    async saveOrder(value){const order=normalizeCatalogOrder(value),content=renderCatalogOrder(order);let existing=null;try{const remote=await this.client.read(CATALOG_ORDER_PATH);existing={sha:String(remote.sha||''),rawContent:remote.content.replace(/\r\n?/g,'\n')};}catch(error){if(error?.kind!=='not_found')throw error;}if(existing&&existing.rawContent===content)return{ok:true,action:'noop',path:CATALOG_ORDER_PATH,sha:existing.sha,order,rawContent:content};const action=existing?'update':'create';const write=await this.client.saveVerified({path:CATALOG_ORDER_PATH,content,baseSha:existing?.sha||'',message:`${action==='create'?'Add':'Update'} Planning Helper catalog order`});return{ok:true,action,path:CATALOG_ORDER_PATH,sha:String(write.sha||''),order,rawContent:content,recoveredAfterUnknownWrite:Boolean(write.recoveredAfterUnknownWrite),recoveredAfterConflict:Boolean(write.recoveredAfterConflict)};}
  }

  return{DIRECTION_CATALOG_PATH,USE_CASE_CATALOG_PATH,CATALOG_ORDER_PATH,CATALOG_ORDER_KIND,normalizeCatalogOrder,renderCatalogOrder,parseDirectionCatalog,parseUseCaseCatalog,parseCatalogOrder,RepositoryCatalogService};
});

(function (root, factory) {
  const api=factory(typeof require==='function'?Object.assign({},require('./command-definition-codec.js'),require('./command-catalog.js'),require('./helper-library-codec.js'),require('./semantic-projections.js'),require('./repository-catalog-service.js'),root.ObsPlanningHelper||{}):(root.ObsPlanningHelper||{}));
  if(typeof module==='object'&&module.exports)module.exports=api;
  root.ObsPlanningHelper=Object.assign(root.ObsPlanningHelper||{},api);
})(typeof globalThis!=='undefined'?globalThis:this,function(deps){
  'use strict';

  const KEYS=Object.freeze({settings:'obsPlanningHelper:v1:repositorySettings',token:'obsPlanningHelper:v1:githubToken',localSnapshot:'obsPlanningHelper:v2:localSnapshot'});
  const LEGACY_KEYS=Object.freeze({commandCache:'obsPlanningHelper:v1:commandCatalogCache',localLibrary:'obsPlanningHelper:v1:localLibrary',repositoryLibraryCache:'obsPlanningHelper:v1:repositoryLibraryCache'});
  const LOCAL_SNAPSHOT_SCHEMA_VERSION=4;
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
  function normalizeCommandRecord(value){const input=value&&typeof value==='object'?value:{},definition=deps.normalizeCommandDefinition(input.definition||input),path=deps.commandPathForDefinition(definition);if(input.path&&String(input.path)!==path)throw new TypeError(`Planning-command snapshot path mismatch: ${input.path}`);const rawContent=String(input.rawContent||deps.renderCommandDefinitionDocument(definition)).replace(/\r\n?/g,'\n'),parsed=deps.parseCommandDefinitionDocument(rawContent,{path});if(JSON.stringify(deps.toSerializable(deps.stripRuntimeCommandMetadata(parsed)))!==JSON.stringify(deps.toSerializable(definition)))throw new TypeError(`Planning-command snapshot raw content does not match definition: ${definition.id}`);const repositorySha=String(input.repositorySha||'').trim(),repositoryKnown=Boolean(input.repositoryKnown||repositorySha),repositoryTracked=Boolean(input.repositoryTracked||repositoryKnown);return{definition,path,rawContent,repositoryKnown,repositoryTracked,repositorySha};}
  function normalizeHelperRecord(value){const input=value&&typeof value==='object'?value:{},item=deps.normalizeHelperLibraryItem(input.item||input),path=deps.helperLibraryTargetPath(item);if(input.path&&String(input.path)!==path)throw new TypeError(`Helper-library snapshot path mismatch: ${input.path}`);const rawContent=String(input.rawContent||deps.renderHelperLibraryDocument(item)).replace(/\r\n?/g,'\n'),parsed=deps.parseHelperLibraryDocument(rawContent,{kind:item.kind,path});if(JSON.stringify(parsed)!==JSON.stringify(item))throw new TypeError(`Helper-library snapshot raw content does not match item: ${item.kind}:${item.id}`);const repositorySha=String(input.repositorySha||'').trim();return{item,path,rawContent,repositoryKnown:Boolean(input.repositoryKnown||repositorySha),repositorySha};}
  function normalizePlanningHelperLocalSnapshot(value){
    if(!value||typeof value!=='object'||![1,2,3,LOCAL_SNAPSHOT_SCHEMA_VERSION].includes(value.schemaVersion))throw new TypeError('Unsupported Planning Helper local snapshot schema.');
    const planningCommands=(value.planningCommands||[]).map(normalizeCommandRecord).sort((a,b)=>a.path.localeCompare(b.path));
    const helperItems=(value.helperItems||[]).map(normalizeHelperRecord).sort((a,b)=>a.path.localeCompare(b.path));
    const directions=deps.normalizeDirectionDefinitions(value.directions||[]),directionCatalogSha=String(value.directionCatalogSha||'').trim();
    const useCases=deps.normalizeUseCaseDefinitions(value.useCases||[]),useCaseCatalogSha=String(value.useCaseCatalogSha||'').trim();
    const catalogOrder=deps.normalizeCatalogOrder(value.catalogOrder||{}),catalogOrderSha=String(value.catalogOrderSha||'').trim();
    const hiddenCommandIds=normalizeIdList(value.hiddenCommandIds,'hiddenCommandIds'),hiddenUseCaseIds=normalizeIdList(value.hiddenUseCaseIds,'hiddenUseCaseIds'),favoriteCommandIds=normalizeIdList(value.favoriteCommandIds,'favoriteCommandIds'),favoriteUseCaseIds=normalizeIdList(value.favoriteUseCaseIds,'favoriteUseCaseIds');
    deps.validateCommandCatalog(planningCommands.map((record)=>record.definition));
    if(new Set(planningCommands.map((record)=>record.path)).size!==planningCommands.length)throw new TypeError('Duplicate planning-command path in local snapshot.');
    if(new Set(helperItems.map((record)=>record.path)).size!==helperItems.length)throw new TypeError('Duplicate helper-library path in local snapshot.');
    if(planningCommands.some((record)=>hiddenCommandIds.includes(record.definition.id)))throw new TypeError('A planning command cannot be both visible and locally deleted.');
    const directionIds=new Set(directions.map((entry)=>entry.id));for(const useCase of useCases)if(directions.length&&!directionIds.has(useCase.directionId))throw new TypeError(`Use Case ${useCase.id} references missing local Direction ${useCase.directionId}.`);
    return{schemaVersion:LOCAL_SNAPSHOT_SCHEMA_VERSION,savedAt:cleanIso(value.savedAt,''),planningCommands,helperItems,directions,directionCatalogSha,useCases,useCaseCatalogSha,catalogOrder,catalogOrderSha,hiddenCommandIds,hiddenUseCaseIds,favoriteCommandIds,favoriteUseCaseIds};
  }
  async function loadPlanningHelperLocalSnapshot(){const value=await gmGet(KEYS.localSnapshot,null);return value==null?null:normalizePlanningHelperLocalSnapshot(value);}
  async function savePlanningHelperLocalSnapshot(value){const normalized=normalizePlanningHelperLocalSnapshot({...value,schemaVersion:LOCAL_SNAPSHOT_SCHEMA_VERSION,savedAt:value?.savedAt||new Date().toISOString()}),payload={...normalized,savedAt:new Date().toISOString()};await gmSet(KEYS.localSnapshot,payload);const checked=await gmGet(KEYS.localSnapshot,null),normalizedChecked=normalizePlanningHelperLocalSnapshot(checked);if(JSON.stringify(normalizedChecked)!==JSON.stringify(payload))throw new Error('Planning Helper local snapshot write-back verification failed.');return payload;}

  function commandRecordsFromDefinitions(definitions,repositoryKnown=true){return(definitions||[]).map((definition)=>normalizeCommandRecord({definition,repositoryKnown,repositoryTracked:repositoryKnown}));}
  function helperKey(item){return`${item.kind}:${item.id}`;}
  async function loadOrMigratePlanningHelperLocalSnapshot(){
    const existingRaw=await gmGet(KEYS.localSnapshot,null),warnings=[];
    if(existingRaw!=null){const existing=normalizePlanningHelperLocalSnapshot(existingRaw),needsWrite=existingRaw.schemaVersion!==LOCAL_SNAPSHOT_SCHEMA_VERSION,snapshot=needsWrite?await savePlanningHelperLocalSnapshot(existing):existing;if(needsWrite&&(!existing.directions.length||!existing.useCases.length))warnings.push('Planning Helper local snapshot migrated. Directions/Commands/Use Cases are GitHub-backed; use Hard Reload GitHub to restore current repository catalogs.');return{snapshot,migrated:needsWrite,seededCommands:0,warnings};}
    let definitions=[];
    try{const legacy=await gmGet(LEGACY_KEYS.commandCache,null);if(legacy&&legacy.schemaVersion===1&&Array.isArray(legacy.definitions)){deps.validateCommandCatalog(legacy.definitions);definitions=legacy.definitions;}}catch(error){warnings.push(`Legacy planning-command cache ignored: ${error.message||String(error)}`);}deps.validateCommandCatalog(definitions);
    const helperByKey=new Map();
    try{const repoCache=await gmGet(LEGACY_KEYS.repositoryLibraryCache,null),records=repoCache?.schemaVersion===2&&Array.isArray(repoCache.records)?repoCache.records:repoCache?.schemaVersion===1&&Array.isArray(repoCache.items)?repoCache.items.map((item)=>({item})):[];for(const record of records){const item=deps.normalizeHelperLibraryItem(record.item||record);helperByKey.set(helperKey(item),normalizeHelperRecord({item,repositoryKnown:true,repositorySha:record.sha||''}));}}catch(error){warnings.push(`Legacy repository-library cache ignored: ${error.message||String(error)}`);}
    try{const local=await gmGet(LEGACY_KEYS.localLibrary,null);if(local&&local.schemaVersion===1&&Array.isArray(local.items))for(const raw of local.items){const item=deps.normalizeHelperLibraryItem(raw),key=helperKey(item),previous=helperByKey.get(key);helperByKey.set(key,normalizeHelperRecord({item,repositoryKnown:Boolean(previous?.repositoryKnown),repositorySha:previous?.repositorySha||''}));}}catch(error){warnings.push(`Legacy local helper library ignored: ${error.message||String(error)}`);}
    try{let raw='';try{raw=typeof localStorage!=='undefined'?localStorage.getItem(deps.LEGACY_LOCAL_STORAGE_KEY)||'':'';}catch(_){}if(raw){for(const item of deps.parseLegacyProjectionRegistry(raw)){const key=helperKey(item);if(!helperByKey.has(key))helperByKey.set(key,normalizeHelperRecord({item,repositoryKnown:false}));}}}catch(error){warnings.push(`Legacy page-local command projections ignored: ${error.message||String(error)}`);}
    const snapshot=await savePlanningHelperLocalSnapshot({schemaVersion:LOCAL_SNAPSHOT_SCHEMA_VERSION,planningCommands:commandRecordsFromDefinitions(definitions,true),helperItems:[...helperByKey.values()],directions:[],directionCatalogSha:'',useCases:[],useCaseCatalogSha:'',catalogOrder:deps.normalizeCatalogOrder({}),catalogOrderSha:'',hiddenCommandIds:[],hiddenUseCaseIds:[],favoriteCommandIds:[],favoriteUseCaseIds:[]});
    warnings.push('Directions, Commands and Use Cases are repository-backed catalogs. Use Hard Reload GitHub to populate/restore them from the configured repository.');
    return{snapshot,migrated:true,seededCommands:definitions.length,warnings};
  }

  function readPanelPosition(){try{const parsed=JSON.parse(localStorage.getItem(POSITION_KEY)||'{}');return{left:Number.isFinite(parsed.left)?parsed.left:null,top:Number.isFinite(parsed.top)?parsed.top:null,width:Number.isFinite(parsed.width)?parsed.width:null,height:Number.isFinite(parsed.height)?parsed.height:null};}catch(_){return{left:null,top:null,width:null,height:null};}}
  function savePanelPosition(position){try{localStorage.setItem(POSITION_KEY,JSON.stringify({left:position.left,top:position.top,width:position.width,height:position.height}));}catch(_){} }

  return{PLANNING_HELPER_STATE_KEYS:KEYS,PLANNING_HELPER_LEGACY_STATE_KEYS:LEGACY_KEYS,PLANNING_HELPER_DEFAULT_SETTINGS:DEFAULT_SETTINGS,LOCAL_SNAPSHOT_SCHEMA_VERSION,normalizeSettings,validateRepositorySettings,loadRepositorySettings,saveRepositorySettings,loadGitHubToken,saveGitHubToken,normalizeCommandRecord,normalizeHelperRecord,normalizePlanningHelperLocalSnapshot,loadPlanningHelperLocalSnapshot,savePlanningHelperLocalSnapshot,loadOrMigratePlanningHelperLocalSnapshot,commandRecordsFromDefinitions,readPanelPosition,savePanelPosition};
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

  const VIEW_IDS=Object.freeze({ALL:'ALL'});
  function presentation(entry){return entry?.helperPresentation||entry?.definition?.helperPresentation||null;}
  function primaryNavigation(entry){return presentation(entry)?.navigation||null;}
  function relatedNavigation(entry){return presentation(entry)?.relatedNavigation||[];}
  function allNavigationRows(entries){
    const rows=[];
    for(const entry of entries||[]){
      const primary=primaryNavigation(entry);if(primary)rows.push({entry,nav:primary,related:false});
      for(const nav of relatedNavigation(entry))rows.push({entry,nav:{...nav,related:true},related:true});
    }
    return rows;
  }
  function methodologyViewDefinitions(entries){
    const byId=new Map();
    for(const {nav} of allNavigationRows(entries)){
      const current=byId.get(nav.viewId);
      const candidate={id:nav.viewId,label:nav.viewLabel,order:Number(nav.viewOrder)||0};
      if(!current||candidate.order<current.order)byId.set(nav.viewId,candidate);
    }
    return [...byId.values()].sort((a,b)=>a.order-b.order||a.label.localeCompare(b.label));
  }
  function methodologyPrimaryIds(entries,viewId){return allNavigationRows(entries).filter((row)=>!row.related&&row.nav.viewId===viewId).sort((a,b)=>(a.nav.sectionOrder-b.nav.sectionOrder)||(a.nav.itemOrder-b.nav.itemOrder)).map((row)=>row.entry.id);}
  function methodologyRelatedIds(entries,viewId){return allNavigationRows(entries).filter((row)=>row.related&&row.nav.viewId===viewId).sort((a,b)=>(a.nav.sectionOrder-b.nav.sectionOrder)||(a.nav.itemOrder-b.nav.itemOrder)).map((row)=>row.entry.id);}
  function buildMethodologyViewGroups(entries,viewId){
    const sectionMap=new Map();
    for(const row of allNavigationRows(entries).filter((item)=>item.nav.viewId===viewId)){
      const nav=row.nav,key=nav.sectionId;
      if(!sectionMap.has(key))sectionMap.set(key,{id:key,label:nav.sectionLabel,order:Number(nav.sectionOrder)||0,entries:[]});
      sectionMap.get(key).entries.push({...row.entry,__methodologyNav:{...nav,viewId,sectionId:key,related:row.related||Boolean(nav.related)}});
    }
    const sections=[...sectionMap.values()].sort((a,b)=>a.order-b.order||a.label.localeCompare(b.label));
    for(const section of sections)section.entries.sort((a,b)=>(a.__methodologyNav.itemOrder-b.__methodologyNav.itemOrder)||String(a.id).localeCompare(String(b.id)));
    return sections.filter((section)=>section.entries.length);
  }

  return{METHODOLOGY_VIEW_IDS:VIEW_IDS,methodologyViewDefinitions,methodologyPrimaryIds,methodologyRelatedIds,buildMethodologyViewGroups};
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
    const byId=new Map(groups.map((group)=>[group.id,group])),ungrouped=[];
    for(const entry of entries||[]){const ids=[...new Set([...(entry.directionIds||[]),entry.directionId].filter(Boolean))];let placed=false;for(const id of ids){const group=byId.get(id);if(group){group.entries.push(entry);placed=true;}}if(!placed)ungrouped.push(entry);}
    const result=groups.filter((group)=>group.entries.length);if(ungrouped.length)result.push({id:'OTHER',label:'Other / legacy compatibility',description:'Commands or projections without a current semantic Direction mapping.',entries:ungrouped});return result;
  }
  function favoriteEntries(entries,favoriteIds){const ids=new Set((favoriteIds||[]).map((id)=>String(id||'').trim()).filter(Boolean));return(entries||[]).filter((entry)=>ids.has(entry.id));}

  function createPlanningHelperUi(options={}){
    const SURFACES=options.surfaces||deps.SURFACES;document.getElementById(HOST_ID)?.remove();document.getElementById('obs-command-helper-host')?.remove();
    const host=document.createElement('div');host.id=HOST_ID;document.documentElement.appendChild(host);const root=host.attachShadow({mode:'open'});
    const saved=options.position||{},defaultWidth=Math.min(980,Math.max(560,window.innerWidth-32)),defaultHeight=Math.min(780,Math.max(420,window.innerHeight-32));let width=saved.width??defaultWidth,height=saved.height??defaultHeight,left=saved.left??Math.max(12,window.innerWidth-width-18),top=saved.top??Math.max(12,window.innerHeight-height-22);
    const ALL_METHODOLOGY_VIEW=deps.METHODOLOGY_VIEW_IDS?.ALL||'ALL';
    let activeSurface=SURFACES.COMMANDS,activeMethodologyView=null,commandEntries=[...(options.commandEntries||[])],promptEntries=[...(options.promptEntries||[])],useCaseEntries=[...(options.useCaseEntries||[])],favoriteCommandIds=[...(options.favoriteCommandIds||[])],favoriteUseCaseIds=[...(options.favoriteUseCaseIds||[])],directionDefinitions=[...(options.directionDefinitions||[])];let activeOverlay=null,isOpen=false,statusTimer=null,operationBusy=false,insertionBusy=false,dashboardOpen=document.documentElement.dataset.obsPlanningDashboardOpen==='true',lastToggleToken=document.documentElement.dataset.obsPlanningCommandsToggle||'',resizeTimer=null;

    root.innerHTML=`<style>
:host{all:initial}*{box-sizing:border-box}button,input,textarea{font:inherit}.launcher{position:fixed;right:18px;bottom:22px;z-index:2147483647;border:1px solid #64748b;border-radius:999px;padding:9px 13px;background:#111827;color:#f8fafc;font:700 12px system-ui;cursor:pointer}.panel{position:fixed;left:${left}px;top:${top}px;width:${width}px;height:${height}px;max-width:calc(100vw - 16px);max-height:calc(100vh - 16px);min-width:min(560px,calc(100vw - 16px));min-height:360px;z-index:2147483647;display:none;flex-direction:column;overflow:hidden;resize:both;border:1px solid #475569;border-radius:14px;background:#0b1220;color:#f8fafc;box-shadow:0 20px 60px rgba(0,0,0,.5);font:13px/1.4 system-ui}.panel[data-open=true]{display:flex}.header{display:flex;align-items:center;gap:8px;padding:10px;background:#111b2e;border-bottom:1px solid #334155;cursor:grab}.title{flex:1}.title-main{font-weight:800}.title-sub{color:#94a3b8;font-size:11px}.tabs{display:grid;grid-template-columns:repeat(3,1fr);gap:4px;padding:7px}.tab,.tool{padding:7px}.command-views{display:flex;gap:5px;padding:0 8px 8px}.command-view{padding:6px 9px}.command-view[aria-selected=true]{background:#0f766e}.row.focused{margin-left:22px}.row.related{opacity:.9;border-top:1px dashed #334155;padding-top:5px}.tab[aria-selected=true]{background:#1d4ed8}.surface-tools{display:flex;gap:6px;padding:7px 8px;border-top:1px solid #1e293b;border-bottom:1px solid #1e293b;flex-wrap:wrap}.search-wrap{padding:8px}.search{width:100%;padding:8px;background:#020817;color:#fff;border:1px solid #334155;border-radius:8px}.body{overflow:auto;padding:8px;min-height:0;flex:1}.favorite-group{margin:6px 0 10px;border:1px solid #64748b;border-radius:10px;background:#111b2e;padding:7px}.favorite-title{padding:2px 3px 6px;font-weight:850}.direction-group{margin:6px 0;border:1px solid #26364f;border-radius:10px;background:#0d1728}.direction-head{display:flex;align-items:center;gap:6px;padding:8px 10px}.direction-head summary{cursor:pointer;list-style:none;flex:1;font-weight:800}.direction-head summary::-webkit-details-marker{display:none}.direction-meta{display:block;color:#94a3b8;font-size:11px;font-weight:400}.direction-entries{padding:0 7px 7px 20px}.row{display:grid;grid-template-columns:minmax(420px,1fr) auto;gap:8px;margin:5px 0;align-items:start}.insert{padding:8px;text-align:left;min-width:0}.row-label{display:block;font-weight:750;white-space:normal}.row-meta{display:block;color:#94a3b8;font-size:11px;margin-top:2px}.actions{display:flex;gap:5px;flex-wrap:nowrap;justify-content:flex-end;align-items:flex-start}button{border:1px solid #475569;border-radius:8px;background:#17243a;color:#f8fafc;cursor:pointer}button:hover,button:focus-visible{background:#243750}button:disabled{opacity:.55;cursor:wait}.copy,.full,.edit-library,.edit-command,.delete-library,.delete-command,.reload-command,.repo-library,.repo-command,.favorite-toggle,.move,.direction-move{padding:5px 8px}.favorite-toggle{min-width:32px;font-size:15px}.delete-library,.delete-command{color:#fecaca}.status{margin:0 8px 8px;padding:8px;border-radius:8px;background:#172554;color:#bfdbfe;white-space:pre-wrap}.empty{padding:18px;color:#94a3b8;text-align:center}.overlay{position:fixed;inset:0;z-index:2147483647;background:rgba(2,8,23,.72);display:flex;align-items:center;justify-content:center;padding:18px}.modal{width:min(820px,96vw);max-height:90vh;overflow:auto;background:#0b1220;color:#f8fafc;border:1px solid #475569;border-radius:14px;padding:14px;font:13px/1.45 system-ui}.modal h2{margin:0 0 8px}.modal p{color:#cbd5e1}.modal textarea{width:100%;min-height:360px;padding:10px;background:#020817;color:#f8fafc;border:1px solid #475569;border-radius:8px;font:12px/1.45 ui-monospace,monospace}.modal input{width:100%;padding:8px;background:#020817;color:#fff;border:1px solid #475569;border-radius:8px}.fields{display:grid;grid-template-columns:1fr 1fr;gap:8px}.field{display:grid;gap:4px}.field-wide{grid-column:1/-1}.modal-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:10px}.preview{margin-top:10px;padding:10px;border:1px solid #334155;border-radius:8px;background:#07101f;white-space:pre-wrap}.danger{color:#fecaca}.ok{color:#bbf7d0}
@media(max-width:760px){.panel{min-width:0;width:calc(100vw - 16px)!important;left:8px!important}.row{grid-template-columns:1fr}.actions{justify-content:flex-start;flex-wrap:wrap}.direction-entries{padding-left:7px}}
</style><button class="launcher" type="button">Planning</button><section class="panel" data-open="false"><div class="header"><div class="title"><div class="title-main">OBS Planning Helper</div><div class="title-sub">local working cache · GitHub-backed Directions/Commands/Use Cases · explicit Hard Reload</div></div><button class="close" type="button">×</button></div><div class="tabs">${Object.values(SURFACES).map((surface)=>`<button class="tab" type="button" data-surface="${surface}" aria-selected="false">${surface}</button>`).join('')}</div><div class="command-views"></div><div class="surface-tools"><button class="tool new-library" type="button">New</button><button class="tool import-chat" type="button">Import</button><button class="tool restore-chat" type="button">Restore copy</button><button class="tool recovery-request" type="button">Recovery request</button><button class="tool check-github" type="button">Check GitHub</button><button class="tool sync-github" type="button">Sync missing</button><button class="tool hard-reload" type="button">Hard Reload GitHub</button><button class="tool save-order" type="button">Save order GitHub</button><button class="tool settings" type="button">Settings</button></div><div class="search-wrap"><input class="search" type="search" placeholder="Search current surface…"></div><div class="body"></div></section>`;

    const launcher=root.querySelector('.launcher'),panel=root.querySelector('.panel'),header=root.querySelector('.header'),closeButton=root.querySelector('.close'),searchInput=root.querySelector('.search'),body=root.querySelector('.body'),tabButtons=[...root.querySelectorAll('.tab')],commandViewBar=root.querySelector('.command-views'),newLibraryButton=root.querySelector('.new-library');
    function entriesForSurface(surface){if(surface===SURFACES.COMMANDS)return commandEntries;if(surface===SURFACES.PROMPTS)return promptEntries;if(surface===SURFACES.USE_CASES)return useCaseEntries;return[];}
    function currentMethodologyViews(){return deps.methodologyViewDefinitions?deps.methodologyViewDefinitions(commandEntries):[];}
    function normalizeActiveMethodologyView(){const views=currentMethodologyViews();if(activeMethodologyView===ALL_METHODOLOGY_VIEW)return views;if(!views.some((view)=>view.id===activeMethodologyView))activeMethodologyView=views[0]?.id||ALL_METHODOLOGY_VIEW;return views;}
    function renderMethodologyViewButtons(){const views=normalizeActiveMethodologyView();commandViewBar.innerHTML='';for(const view of views){const control=document.createElement('button');control.type='button';control.className='command-view';control.dataset.commandView=view.id;control.textContent=view.label;control.setAttribute('aria-selected',String(view.id===activeMethodologyView));control.addEventListener('click',()=>switchMethodologyView(view.id));commandViewBar.append(control);}const all=document.createElement('button');all.type='button';all.className='command-view';all.dataset.commandView=ALL_METHODOLOGY_VIEW;all.textContent='All commands';all.setAttribute('aria-selected',String(activeMethodologyView===ALL_METHODOLOGY_VIEW));all.addEventListener('click',()=>switchMethodologyView(ALL_METHODOLOGY_VIEW));commandViewBar.append(all);}
    function applyState(result={}){if(result.commandEntries)commandEntries=[...result.commandEntries];if(result.promptEntries)promptEntries=[...result.promptEntries];if(result.useCaseEntries)useCaseEntries=[...result.useCaseEntries];if(result.directionDefinitions)directionDefinitions=[...result.directionDefinitions];if(result.favoriteCommandIds)favoriteCommandIds=[...result.favoriteCommandIds];if(result.favoriteUseCaseIds)favoriteUseCaseIds=[...result.favoriteUseCaseIds];renderMethodologyViewButtons();renderEntries(searchInput.value);}
    function setCommandEntries(entries){commandEntries=[...(entries||[])];renderMethodologyViewButtons();if(activeSurface===SURFACES.COMMANDS)renderEntries(searchInput.value);}function setUseCaseEntries(entries){useCaseEntries=[...(entries||[])];if(activeSurface===SURFACES.USE_CASES)renderEntries(searchInput.value);}function setLibraryEntries(result={}){if(result.promptEntries)promptEntries=[...result.promptEntries];if(activeSurface===SURFACES.PROMPTS)renderEntries(searchInput.value);}
    function showStatus(text,ms=5000){let node=root.querySelector('.status');if(!node){node=document.createElement('div');node.className='status';panel.append(node);}node.textContent=String(text||'');if(statusTimer!==null)clearTimeout(statusTimer);if(ms>0)statusTimer=setTimeout(()=>node.remove(),ms);}
    function setBusy(){for(const button of root.querySelectorAll('.surface-tools button,.actions button,.direction-move'))button.disabled=operationBusy||insertionBusy;}
    function setOpen(value){isOpen=Boolean(value);panel.dataset.open=String(isOpen);launcher.style.display=isOpen||dashboardOpen?'none':'block';if(isOpen)keepPanelInViewport();}
    function switchSurface(surface){activeSurface=surface;for(const button of tabButtons)button.setAttribute('aria-selected',String(button.dataset.surface===surface));commandViewBar.style.display=surface===SURFACES.COMMANDS?'flex':'none';if(surface===SURFACES.COMMANDS)renderMethodologyViewButtons();newLibraryButton.style.display=surface===SURFACES.USE_CASES?'none':'inline-block';searchInput.value='';renderEntries('');}function switchMethodologyView(view){activeMethodologyView=view;renderMethodologyViewButtons();searchInput.value='';renderEntries('');}
    async function insertBody(text,success,id){if(!text||insertionBusy)return;insertionBusy=true;setBusy();try{showStatus(await options.onInsert(text,success,id),7000);}catch(error){showStatus(error.message||String(error),7000);}finally{insertionBusy=false;setBusy();}}
    function button(text,cls,handler,title=''){const b=document.createElement('button');b.type='button';b.textContent=text;b.className=cls;if(title)b.title=title;b.addEventListener('click',(event)=>{event.preventDefault();event.stopPropagation();handler(event);});return b;}
    function openCommandInfo(entry){const{overlay,modal}=makeOverlay(entry.label||entry.command||entry.id);const nav=entry.__methodologyNav||{},presentation=entry.helperPresentation||entry.definition?.helperPresentation||null,binding=entry.methodologyBinding||entry.definition?.methodologyBinding||null,pre=document.createElement('div');pre.className='preview ok';const bindingText=binding?[`Runtime: ${binding.methodologyRuntime}`,binding.profile?`Profile: ${binding.profile}`:'Profile: Core',`Surface kind: ${binding.surfaceKind}`,binding.targetModuleId?`Target Module: ${binding.targetModuleId}`:'',binding.lensId?`Lens: ${binding.lensId}`:'',binding.parentSurface?`Parent surface: ${binding.parentSurface}`:'',`Host Target: ${binding.hostTargetPolicy}`].filter(Boolean).join('\n'):'';pre.textContent=[nav.kindLabel?`Surface: ${nav.kindLabel}`:'',nav.badges?.length?`Badges: ${nav.badges.join(' · ')}`:'',bindingText,presentation?.whenToUse?`When To Use:\n${presentation.whenToUse}`:'',presentation?.whatYouGet?`What You Get:\n${presentation.whatYouGet}`:''].filter(Boolean).join('\n\n');const actions=document.createElement('div');actions.className='modal-actions';actions.append(button('Close','',()=>closeOverlay(overlay)));modal.append(pre,actions);}
    function renderMethodologyGroups(groups,needle){const activeView=currentMethodologyViews().find((view)=>view.id===activeMethodologyView);for(const group of groups){const entries=needle?group.entries.filter((entry)=>JSON.stringify([entry.id,entry.label,entry.description,entry.command,entry.__methodologyNav?.badges]).toLowerCase().includes(needle)):group.entries;if(!entries.length)continue;const details=document.createElement('details');details.className='direction-group';details.open=true;const head=document.createElement('div');head.className='direction-head';const summary=document.createElement('summary');summary.innerHTML='<span></span><small class="direction-meta"></small>';summary.querySelector('span').textContent=group.label;summary.querySelector('.direction-meta').textContent=activeView?`${activeView.label} navigation`:'Methodology navigation';head.append(summary);details.append(head);const rows=document.createElement('div');rows.className='direction-entries';for(const entry of entries)rows.append(makeEntryRow(entry));details.append(rows);body.append(details);}}
    function makeEntryRow(entry,{favorite=false}={}){const row=document.createElement('div');row.className='row';if(entry.__methodologyNav?.parentId)row.classList.add('focused');if(entry.__methodologyNav?.related)row.classList.add('related');const insert=document.createElement('button');insert.type='button';insert.className='insert';insert.innerHTML=`<span class="row-label"></span><span class="row-meta"></span>`;insert.querySelector('.row-label').textContent=entry.label||entry.title||entry.command||entry.id;insert.querySelector('.row-meta').textContent=[entry.__methodologyNav?.kindLabel,entry.__methodologyNav?.badges?.join(' · '),entry.description,entry.stateLabel].filter(Boolean).join(' · ');insert.addEventListener('click',()=>insertBody(entry.adaptiveBody||entry.text,`Inserted ${entry.label||entry.id}`,entry.id));row.append(insert);const actions=document.createElement('div');actions.className='actions';
      if(activeSurface===SURFACES.COMMANDS||activeSurface===SURFACES.USE_CASES){const favIds=activeSurface===SURFACES.COMMANDS?favoriteCommandIds:favoriteUseCaseIds,isFav=favIds.includes(entry.id);actions.append(button(isFav?'★':'☆','favorite-toggle',async()=>{try{const result=activeSurface===SURFACES.COMMANDS?await options.onToggleFavoriteCommand(entry.id):await options.onToggleFavoriteUseCase(entry.id);applyState(result);}catch(error){showStatus(error.message||String(error),7000);}},isFav?'Remove favorite':'Add favorite'));}
      if(!favorite){actions.append(button('↑','move',()=>moveEntry(entry,-1),'Move up'),button('↓','move',()=>moveEntry(entry,1),'Move down'));}
      if(entry.fullBody)actions.append(button('Full','full',()=>insertBody(entry.fullBody,`Inserted full ${entry.label||entry.id}`,entry.id)));
      if(entry.helperPresentation||entry.definition?.helperPresentation||entry.__methodologyNav)actions.append(button('Info','full',()=>openCommandInfo(entry),'When To Use / What You Get'));
      actions.append(button('Copy','copy',async()=>showStatus(await options.onCopy(entry.adaptiveBody||entry.text)?'Copied.':'Copy failed.',4000)));
      if(entry.entityType==='planning-command'){actions.append(button('Edit','edit-command',()=>openCommandEditor(entry)),button('Reload','reload-command',()=>reloadCommand(entry)),button('Save GitHub','repo-command',()=>saveRepository(entry)),button('Delete','delete-command',()=>deleteCommand(entry)));}
      else if(entry.entityType==='use-case-invocation-command'){actions.append(button('Delete','delete-command',()=>deleteCommand(entry)));}
      else if(activeSurface===SURFACES.USE_CASES){actions.append(button('Delete','delete-command',()=>deleteUseCase(entry)));}
      else if(entry.entityType==='prompt'||entry.entityType==='legacy-helper-command'){actions.append(button('Edit','edit-library',()=>openLibraryEditor(entry)),button('Save GitHub','repo-library',()=>saveRepository(entry)),button('Delete','delete-library',()=>deleteLibrary(entry)));}
      row.append(actions);return row;}
    async function moveEntry(entry,delta){try{const result=await options.onMoveCatalogItem(activeSurface,entry.id,delta);applyState(result);showStatus('Order changed locally. Save order GitHub when this order should be durable.',5000);}catch(error){showStatus(error.message||String(error),7000);}}
    async function moveDirection(id,delta){try{const result=await options.onMoveDirection(id,delta);applyState(result);showStatus('Direction order changed locally. Save order GitHub when this order should be durable.',5000);}catch(error){showStatus(error.message||String(error),7000);}}
    function renderEntries(query=''){body.innerHTML='';const all=entriesForSurface(activeSurface),needle=String(query||'').trim().toLowerCase();if(activeSurface===SURFACES.COMMANDS&&activeMethodologyView!==ALL_METHODOLOGY_VIEW){const groups=deps.buildMethodologyViewGroups?deps.buildMethodologyViewGroups(all,activeMethodologyView):[];const count=groups.reduce((sum,group)=>sum+group.entries.filter((entry)=>!entry.__methodologyNav?.related).length,0);if(!count){const empty=document.createElement('div');empty.className='empty';empty.textContent='No methodology command rows. Use Hard Reload GitHub to restore current repository content.';body.append(empty);return;}renderMethodologyGroups(groups,needle);return;}const entries=needle?all.filter((entry)=>JSON.stringify([entry.id,entry.label,entry.title,entry.description,entry.command]).toLowerCase().includes(needle)):all;if(!entries.length){const empty=document.createElement('div');empty.className='empty';empty.textContent=activeSurface===SURFACES.COMMANDS||activeSurface===SURFACES.USE_CASES?'No local catalog rows. Use Hard Reload GitHub to restore current repository content.':'No items.';body.append(empty);return;}
      if(activeSurface===SURFACES.COMMANDS||activeSurface===SURFACES.USE_CASES){const fav=favoriteEntries(entries,activeSurface===SURFACES.COMMANDS?favoriteCommandIds:favoriteUseCaseIds);if(fav.length){const group=document.createElement('section');group.className='favorite-group';const title=document.createElement('div');title.className='favorite-title';title.textContent='★ Favorites';group.append(title);for(const entry of fav)group.append(makeEntryRow(entry,{favorite:true}));body.append(group);}const groups=groupEntriesByDirections(entries,directionDefinitions);for(const group of groups){const details=document.createElement('details');details.className='direction-group';details.open=true;const head=document.createElement('div');head.className='direction-head';const summary=document.createElement('summary');summary.innerHTML='<span></span><small class="direction-meta"></small>';summary.querySelector('span').textContent=group.label;summary.querySelector('.direction-meta').textContent=group.description||'';head.append(summary);if(group.id!=='OTHER')head.append(button('↑','direction-move',()=>moveDirection(group.id,-1),'Move Direction up'),button('↓','direction-move',()=>moveDirection(group.id,1),'Move Direction down'));details.append(head);const rows=document.createElement('div');rows.className='direction-entries';for(const entry of group.entries)rows.append(makeEntryRow(entry));details.append(rows);body.append(details);}return;}
      for(const entry of entries)body.append(makeEntryRow(entry));
    }
    function makeOverlay(titleText){const overlay=document.createElement('div');overlay.className='overlay';const modal=document.createElement('section');modal.className='modal';const title=document.createElement('h2');title.textContent=titleText;modal.append(title);overlay.append(modal);root.append(overlay);activeOverlay=overlay;return{overlay,modal};}
    function closeOverlay(overlay){overlay.remove();if(activeOverlay===overlay)activeOverlay=null;}
    function commandDraft(){return{schemaVersion:1,id:'new.command',file:'new-command.command.md',command:'новая команда',englishName:'new command',commandFamily:['новая команда','new command'],description:'describe command',meaning:'describe command meaning',activeContextBehavior:'Use the selected current target.',traversalReadMode:'Targeted/full by current owner uncertainty.',ownerFiles:['planning/command-routing.md'],expectedOutput:'Expected result.',permissionMode:'read-only',keyReminders:['Follow the current owner route.'],userTarget:'<target>',palette:true,refinements:[]};}
    function openCommandEditor(entry=null){const{overlay,modal}=makeOverlay(entry?'Edit Planning Command':'New Planning Command');const note=document.createElement('p');note.textContent='Edit the GitHub-backed command definition locally first. Save GitHub on the row is explicit and separate.';const textarea=document.createElement('textarea');textarea.value=JSON.stringify(entry?.definition||commandDraft(),null,2);const actions=document.createElement('div');actions.className='modal-actions';actions.append(button('Cancel','',()=>closeOverlay(overlay)),button('Save local','',async()=>{try{const result=await options.onSaveLocalCommandDefinition(textarea.value,entry?.id||'');applyState(result);closeOverlay(overlay);showStatus(result.unchanged?'No local content change.':'Saved locally; GitHub was not changed.');}catch(error){showStatus(error.message||String(error),8000);}}));modal.append(note,textarea,actions);}
    function openLibraryEditor(entry=null){const kind=deps.HELPER_LIBRARY_KINDS.PROMPT,{overlay,modal}=makeOverlay(entry?'Edit prompt':'New prompt'),fields=document.createElement('div');fields.className='fields';const titleWrap=document.createElement('label');titleWrap.className='field field-wide';titleWrap.innerHTML='<span>Title</span>';const title=document.createElement('input');title.value=entry?.title||'';titleWrap.append(title);const textWrap=document.createElement('label');textWrap.className='field field-wide';textWrap.innerHTML='<span>Exact insertion text</span>';const textarea=document.createElement('textarea');textarea.value=entry?.text||'';textWrap.append(textarea);const note=document.createElement('p');note.textContent='Save local updates the local working cache only. Save GitHub on the row makes it durable.';const actions=document.createElement('div');actions.className='modal-actions';actions.append(button('Cancel','',()=>closeOverlay(overlay)),button('Save local','',async()=>{try{const result=await options.onSaveLocalLibraryItem({kind,id:entry?.libraryId||'',title:title.value,text:textarea.value,createdAt:entry?.createdAt||''});applyState(result);closeOverlay(overlay);showStatus(result.unchanged?'No local content change.':'Saved locally; GitHub was not changed.');}catch(error){showStatus(error.message||String(error),8000);}}));modal.append(fields,titleWrap,textWrap,note,actions);}
    async function reloadCommand(entry){operationBusy=true;setBusy();try{const result=await options.onReloadRepositoryCommand(entry.id);applyState(result);showStatus(`Reloaded ${result.path} from GitHub.`);}catch(error){showStatus(`Reload failed: ${error.message||String(error)}`,8000);}finally{operationBusy=false;setBusy();}}
    async function saveRepository(entry){operationBusy=true;setBusy();try{const reference=entry.entityType==='planning-command'?{type:'planning-command',id:entry.id}:{type:'helper',kind:entry.libraryKind,id:entry.libraryId};const result=await options.onSaveRepositoryEntity(reference);applyState(result);showStatus(result.localSnapshotUpdated===false?`GitHub ${result.action} succeeded, but local snapshot refresh failed: ${result.localSnapshotError}`:`GitHub ${result.action}: ${result.path}`,8000);}catch(error){showStatus(repositorySaveFailureMessage(error),9000);}finally{operationBusy=false;setBusy();}}
    async function deleteCommand(entry){try{applyState(await options.onDeleteLocalCommand(entry.id));showStatus('Removed locally. Hard Reload GitHub restores repository-backed catalog rows.');}catch(error){showStatus(error.message||String(error),7000);}}
    async function deleteUseCase(entry){try{applyState(await options.onDeleteLocalUseCase(entry.id));showStatus('Use Case hidden locally. Hard Reload GitHub restores repository-backed catalog rows.');}catch(error){showStatus(error.message||String(error),7000);}}
    async function deleteLibrary(entry){try{applyState(await options.onDeleteLocalLibraryItem(entry.libraryKind,entry.libraryId));showStatus('Removed from local cache. GitHub was not changed.');}catch(error){showStatus(error.message||String(error),7000);}}
    function openImport(mode){const{overlay,modal}=makeOverlay(mode==='restore'?'Restore local items from ChatGPT markers':'Import local items from ChatGPT markers'),textarea=document.createElement('textarea');const preview=document.createElement('div');preview.className='preview';const actions=document.createElement('div');actions.className='modal-actions';const updatePreview=()=>{try{const result=options.onPreviewChatImport(textarea.value,mode);preview.textContent=(result.lines||[]).join('\n')||'No recognized marker blocks.';preview.className='preview ok';}catch(error){preview.textContent=error.message||String(error);preview.className='preview danger';}};textarea.addEventListener('input',updatePreview);actions.append(button('Cancel','',()=>closeOverlay(overlay)),button(mode==='restore'?'Restore local':'Import local','',async()=>{try{const result=await options.onApplyChatImport(textarea.value,mode);applyState(result);closeOverlay(overlay);showStatus(`${mode==='restore'?'Restore':'Import'} complete. GitHub requests: 0.`);}catch(error){showStatus(error.message||String(error),8000);}}));modal.append(textarea,preview,actions);updatePreview();}
    async function copyRecoveryRequest(){try{const text=await options.onGetRecoveryRequest();showStatus(await options.onCopy(text)?'Recovery request copied.':'Could not copy recovery request.',7000);}catch(error){showStatus(error.message||String(error),7000);}}
    function shortPaths(paths){const rows=(paths||[]).map((path)=>String(path).split('/').pop());return rows.length?rows.join(', '):'—';}
    function inventoryText(result){const i=result.inventory;function line(label,b){return`${label}: local ${b.local}, GitHub ${b.remote}, overlap ${b.common}\n  local-only: ${shortPaths(b.localOnly)}\n  GitHub-only: ${shortPaths(b.remoteOnly)}${b.knownChanged?.length?`\n  changed: ${shortPaths(b.knownChanged)}`:''}`;}return`Repository: ${result.settings.owner}/${result.settings.repo}@${result.settings.branch}\n\n${line('Planning commands',i.planningCommands)}\n\n${line('Directions',i.directions)}\n\n${line('Use Cases',i.useCases)}\n\n${line('Prompts',i.prompts)}\n\nCatalog order changed: ${i.catalogOrderChanged?'yes':'no/unknown'}`;}
    async function checkRepository(){operationBusy=true;setBusy();try{showStatus('Checking GitHub…',9000);const result=await options.onCheckRepository(),{overlay,modal}=makeOverlay('GitHub inventory check'),pre=document.createElement('div');pre.className='preview ok';pre.textContent=inventoryText(result);const actions=document.createElement('div');actions.className='modal-actions';actions.append(button('Close','',()=>closeOverlay(overlay)));modal.append(pre,actions);showStatus('GitHub inventory checked; local cache unchanged.');}catch(error){showStatus(`GitHub check failed: ${error.message||String(error)}`,9000);}finally{operationBusy=false;setBusy();}}
    async function syncMissingRepository(){operationBusy=true;setBusy();try{showStatus('Syncing GitHub-only records…',9000);const result=await options.onSyncMissingRepository();applyState(result);showStatus(`Sync complete: ${result.addedCommands||0} command(s), ${result.addedDirections||0} Direction(s), ${result.addedUseCases||0} Use Case(s), ${result.addedPrompts||0} prompt(s). Existing local same-ID/path records were not overwritten.`,9000);}catch(error){showStatus(`GitHub sync failed: ${error.message||String(error)}`,9000);}finally{operationBusy=false;setBusy();}}
    function hardReloadRepository(){const{overlay,modal}=makeOverlay('Hard Reload GitHub');const p=document.createElement('p');p.textContent='Replace the complete local Direction, Planning Command and Use-Case catalogs with current GitHub-backed content, restore locally hidden catalog rows, and replace local catalog order with GitHub catalog-order.json. Local prompt content is not replaced. Unsaved local command edits will be lost.';const actions=document.createElement('div');actions.className='modal-actions';actions.append(button('Cancel','',()=>closeOverlay(overlay)),button('Hard Reload','danger',async()=>{operationBusy=true;setBusy();try{const result=await options.onHardReloadRepository();applyState(result);closeOverlay(overlay);showStatus(`Hard Reload complete: ${result.directions} Directions, ${result.commands} Commands, ${result.useCases} Use Cases. GitHub order loaded.`,9000);}catch(error){showStatus(`Hard Reload failed: ${error.message||String(error)}`,9000);}finally{operationBusy=false;setBusy();}}));modal.append(p,actions);}
    async function saveOrder(){operationBusy=true;setBusy();try{const result=await options.onSaveCatalogOrderRepository();applyState(result);showStatus(`Catalog order ${result.action} on GitHub: ${result.path}`,8000);}catch(error){showStatus(repositorySaveFailureMessage(error),9000);}finally{operationBusy=false;setBusy();}}
    async function openSettings(){const{overlay,modal}=makeOverlay('Repository settings');let current;try{current=await options.onLoadSettings();}catch(error){showStatus(error.message||String(error));return;}const fields=document.createElement('div');fields.className='fields';function add(labelText,value,type='text',wide=false){const wrap=document.createElement('label');wrap.className=`field${wide?' field-wide':''}`;const span=document.createElement('span');span.textContent=labelText;const input=document.createElement('input');input.type=type;input.value=value||'';wrap.append(span,input);fields.append(wrap);return input;}const owner=add('Owner',current.settings.owner),repo=add('Repository',current.settings.repo),branch=add('Branch',current.settings.branch),token=add('GitHub token — used only by explicit GitHub actions',current.token,'password',true);const note=document.createElement('p');note.textContent='Normal search/insert/copy/edit/reorder is local-only. Hard Reload is the authoritative Directions/Commands/Use-Cases recovery path. Save order GitHub persists UI order separately from semantic content.';const actions=document.createElement('div');actions.className='modal-actions';actions.append(button('Cancel','',()=>closeOverlay(overlay)),button('Save settings','',async()=>{operationBusy=true;setBusy();try{const result=await options.onSaveSettings({owner:owner.value,repo:repo.value,branch:branch.value},token.value);applyState(result);closeOverlay(overlay);showStatus(result.sourceChanged?'Repository settings saved; repository evidence cleared for the new source.':'Repository settings saved.');}catch(error){showStatus(error.message||String(error),7000);}finally{operationBusy=false;setBusy();}}));modal.append(fields,note,actions);}
    function keepPanelInViewport(){const rect=panel.getBoundingClientRect(),w=Math.min(rect.width||width,Math.max(320,window.innerWidth-16)),h=Math.min(rect.height||height,Math.max(320,window.innerHeight-16));width=w;height=h;panel.style.width=`${w}px`;panel.style.height=`${h}px`;left=Math.min(Math.max(left,8),Math.max(8,window.innerWidth-w-8));top=Math.min(Math.max(top,8),Math.max(8,window.innerHeight-h-8));panel.style.left=`${left}px`;panel.style.top=`${top}px`;}
    function persistGeometry(){const rect=panel.getBoundingClientRect();width=rect.width;height=rect.height;left=rect.left;top=rect.top;options.onSavePosition?.({left,top,width,height});}
    function enableDragging(){let pointerId=null,startX=0,startY=0,startLeft=0,startTop=0;function down(event){if(event.button!==0||event.target.closest('button'))return;pointerId=event.pointerId;startX=event.clientX;startY=event.clientY;const rect=panel.getBoundingClientRect();startLeft=rect.left;startTop=rect.top;header.setPointerCapture(pointerId);}function move(event){if(pointerId!==event.pointerId)return;left=startLeft+event.clientX-startX;top=startTop+event.clientY-startY;keepPanelInViewport();}function finish(event){if(pointerId===null)return;try{header.releasePointerCapture(pointerId);}catch(_){}pointerId=null;persistGeometry();}header.addEventListener('pointerdown',down);header.addEventListener('pointermove',move);header.addEventListener('pointerup',finish);header.addEventListener('pointercancel',finish);return()=>{header.removeEventListener('pointerdown',down);header.removeEventListener('pointermove',move);header.removeEventListener('pointerup',finish);header.removeEventListener('pointercancel',finish);};}
    const resizeObserver=typeof ResizeObserver==='function'?new ResizeObserver(()=>{if(!isOpen)return;if(resizeTimer)clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>{keepPanelInViewport();persistGeometry();},180);}):null;resizeObserver?.observe(panel);
    function consumeToggle(token){const next=String(token||'');if(next&&next!==lastToggleToken){lastToggleToken=next;setOpen(!isOpen);}}function handleShortcut(event){if(event.repeat)return;if(event.key==='Escape'&&activeOverlay&&!operationBusy){closeOverlay(activeOverlay);return;}if(event.altKey&&!event.ctrlKey&&!event.metaKey&&event.key==='F2'){event.preventDefault();setOpen(!isOpen);}else if(event.key==='Escape'&&isOpen)setOpen(false);}
    const observer=new MutationObserver((mutations)=>{for(const mutation of mutations){if(mutation.attributeName==='data-obs-planning-dashboard-open'){dashboardOpen=document.documentElement.dataset.obsPlanningDashboardOpen==='true';launcher.style.display=isOpen||dashboardOpen?'none':'block';}if(mutation.attributeName==='data-obs-planning-commands-toggle')consumeToggle(document.documentElement.dataset.obsPlanningCommandsToggle);}});observer.observe(document.documentElement,{attributes:true,attributeFilter:['data-obs-planning-dashboard-open','data-obs-planning-commands-toggle']});
    tabButtons.forEach((b)=>b.addEventListener('click',()=>switchSurface(b.dataset.surface)));launcher.addEventListener('click',()=>setOpen(true));closeButton.addEventListener('click',()=>setOpen(false));searchInput.addEventListener('input',()=>renderEntries(searchInput.value));newLibraryButton.addEventListener('click',()=>activeSurface===SURFACES.COMMANDS?openCommandEditor():openLibraryEditor());root.querySelector('.import-chat').addEventListener('click',()=>openImport('import'));root.querySelector('.restore-chat').addEventListener('click',()=>openImport('restore'));root.querySelector('.recovery-request').addEventListener('click',copyRecoveryRequest);root.querySelector('.check-github').addEventListener('click',checkRepository);root.querySelector('.sync-github').addEventListener('click',syncMissingRepository);root.querySelector('.hard-reload').addEventListener('click',hardReloadRepository);root.querySelector('.save-order').addEventListener('click',saveOrder);root.querySelector('.settings').addEventListener('click',openSettings);window.addEventListener('resize',keepPanelInViewport);window.addEventListener('keydown',handleShortcut,true);const disableDragging=enableDragging();switchSurface(SURFACES.COMMANDS);if(options.startupWarnings?.length)setTimeout(()=>showStatus(options.startupWarnings.join('\n'),10000),100);
    function dispose(){if(statusTimer!==null)clearTimeout(statusTimer);if(resizeTimer)clearTimeout(resizeTimer);resizeObserver?.disconnect();observer.disconnect();disableDragging();window.removeEventListener('resize',keepPanelInViewport);window.removeEventListener('keydown',handleShortcut,true);host.remove();}
    return{setCommandEntries,setUseCaseEntries,setLibraryEntries,switchSurface,setOpen,showStatus,dispose,host,root};
  }

  return{createPlanningHelperUi,repositorySaveFailureMessage,groupEntriesByDirections,favoriteEntries};
});

(function (root, factory) {
  const api=factory(typeof require==='function'?Object.assign({},root.ObsPlanningHelper||{},require('./repository-catalog-service.js')):(root.ObsPlanningHelper||{}));
  if(typeof module==='object'&&module.exports)module.exports=api;
  root.ObsPlanningHelper=Object.assign(root.ObsPlanningHelper||{},api);
})(typeof globalThis!=='undefined'?globalThis:this,function(deps){
  'use strict';

  const INSTANCE_DISPOSE_KEY='__obsPlanningHelperDisposeV4';
  const LEGACY_DISPOSE_KEYS=['__obsPlanningHelperDisposeV3','__obsPlanningHelperDisposeV2','__obsCommandHelperDisposeV1'];
  function createRepositoryOperationLock(){let active='';return{isBusy:()=>Boolean(active),active:()=>active,async run(label,task){if(active){const error=new Error(`Repository operation already in progress: ${active}.`);error.kind='busy';throw error;}active=String(label||'repository operation');try{return await task();}finally{active='';}}};}
  function helperKey(item){return`${item.kind}:${item.id}`;}
  function repositorySettingsKey(settings){return`${String(settings?.owner||'').trim().toLowerCase()}/${String(settings?.repo||'').trim().toLowerCase()}@${String(settings?.branch||'').trim()}`;}
  function sortByIds(entries,ids){const order=new Map((ids||[]).map((id,index)=>[String(id),index]));return[...(entries||[])].map((entry,index)=>({entry,index})).sort((a,b)=>{const ai=order.has(a.entry.id)?order.get(a.entry.id):Number.MAX_SAFE_INTEGER,bi=order.has(b.entry.id)?order.get(b.entry.id):Number.MAX_SAFE_INTEGER;return ai-bi||a.index-b.index;}).map(({entry})=>entry);}
  function directionDefinitionsForOrder(directions,order){return sortByIds(deps.normalizeDirectionDefinitions(directions||[]),order?.directions||[]);}
  function orderedIdsForMove(configured,currentIds){const current=[...new Set((currentIds||[]).map(String))],known=new Set(current),result=[];for(const id of configured||[])if(known.has(String(id))&&!result.includes(String(id)))result.push(String(id));for(const id of current)if(!result.includes(id))result.push(id);return result;}
  function moveId(configured,currentIds,id,delta){const order=orderedIdsForMove(configured,currentIds),value=String(id||''),index=order.indexOf(value);if(index<0)throw new Error(`Order item not found: ${value||'<empty>'}`);const target=Math.max(0,Math.min(order.length-1,index+(delta<0?-1:1)));if(target===index)return order;order.splice(index,1);order.splice(target,0,value);return order;}

  function materializeSnapshot(snapshot){
    const commandRecords=[...(snapshot.planningCommands||[])],helperRecords=[...(snapshot.helperItems||[])],directions=deps.normalizeDirectionDefinitions(snapshot.directions||[]),useCases=deps.normalizeUseCaseDefinitions(snapshot.useCases||[]),order=deps.normalizeCatalogOrder(snapshot.catalogOrder||{});
    const hiddenUseCaseIds=new Set(snapshot.hiddenUseCaseIds||[]),definitions=commandRecords.map((record)=>record.definition);deps.validateCommandCatalog(definitions);
    const commandByFile=new Map(commandRecords.map((record)=>[record.definition.file,record])),commandById=new Map(commandRecords.map((record)=>[record.definition.id,record])),helperByKey=new Map(helperRecords.map((record)=>[helperKey(record.item),record]));
    const planningEntries=deps.buildCommandEntries(definitions).map((entry)=>{const record=commandById.get(entry.id),stateLabel=record?.repositoryKnown?'Registered · GitHub content verified':record?.repositoryTracked?'Registered · local draft changed':'Local command draft · not GitHub verified';return{...entry,entityType:'planning-command',definition:record?.definition||null,rawContent:record?.rawContent||'',repositoryPath:record?.path||'',repositoryKnown:Boolean(record?.repositoryKnown),repositoryTracked:Boolean(record?.repositoryTracked),repositorySha:record?.repositorySha||'',stateLabel,directionIds:deps.directionIdsForCommand(record?.definition||entry,useCases)};});
    const genericInvoke=definitions.find((definition)=>definition.id==='use_case.invoke')||{file:'invoke-use-case.command.md',keyReminders:['The selected Use Case registry entry and current owner route are semantic authority; this generated Helper row is invocation only.','Do not infer repository mutation, archive, commit or push permission from UC activation.']};
    const visibleCommandIds=new Set(planningEntries.map((entry)=>entry.id)),hiddenCommandIds=new Set(snapshot.hiddenCommandIds||[]);
    const invocationEntries=useCases.filter((uc)=>!(uc.commandId&&visibleCommandIds.has(uc.commandId))).map((uc)=>deps.buildUseCaseInvocationEntry(genericInvoke,uc)).filter((entry)=>!hiddenCommandIds.has(entry.id));
    const helperEntries=helperRecords.map((record)=>{const item=record.item,evidence=record.repositorySha?'local · GitHub SHA verified':record.repositoryKnown?'local · repository-backed content; SHA unverified':'local · repository match not verified';return{id:`helper-library:${item.kind}:${item.id}`,entityType:item.kind===deps.HELPER_LIBRARY_KINDS.COMMAND?'legacy-helper-command':'prompt',libraryId:item.id,libraryKind:item.kind,label:item.kind===deps.HELPER_LIBRARY_KINDS.COMMAND?`Legacy insertion · ${item.title}`:item.title,title:item.title,description:item.kind===deps.HELPER_LIBRARY_KINDS.COMMAND?`Legacy helper-command compatibility · ${evidence}`:evidence,text:item.text,adaptiveBody:item.text,repositoryPath:record.path,repositoryKnown:Boolean(record.repositoryKnown),repositoryTracked:Boolean(record.repositoryKnown),repositorySha:record.repositorySha||'',createdAt:item.createdAt,updatedAt:item.updatedAt};});
    const legacyCommandEntries=helperEntries.filter((entry)=>entry.libraryKind===deps.HELPER_LIBRARY_KINDS.COMMAND),useCaseEntries=(deps.buildSemanticEntries(useCases)[deps.SURFACES.USE_CASES]||[]).filter((entry)=>!hiddenUseCaseIds.has(entry.id));
    const commandEntries=sortByIds([...planningEntries,...invocationEntries,...legacyCommandEntries],order.commands),promptEntries=sortByIds(helperEntries.filter((entry)=>entry.libraryKind===deps.HELPER_LIBRARY_KINDS.PROMPT),order.prompts),orderedUseCases=sortByIds(useCaseEntries,order.useCases);
    return{commandRecords,helperRecords,directions,useCases,order,commandByFile,commandById,helperByKey,commandEntries,localCommandEntries:sortByIds(legacyCommandEntries,order.commands),promptEntries,useCaseEntries:orderedUseCases,directionDefinitions:directionDefinitionsForOrder(directions,order)};
  }

  function mergeChatImport(snapshot,parsed,mode='import'){
    if(mode!=='import'&&mode!=='restore')throw new TypeError(`Unsupported chat-import mode: ${mode}`);const current=materializeSnapshot(snapshot),commandSeed=mode==='restore'?current.commandRecords.filter((record)=>!record.repositoryKnown):current.commandRecords,helperSeed=mode==='restore'?current.helperRecords.filter((record)=>!record.repositoryKnown):current.helperRecords,commandMap=new Map(commandSeed.map((record)=>[record.definition.file,record])),helperMap=new Map(helperSeed.map((record)=>[helperKey(record.item),record])),newCommandRecords=[],newHelperRecords=[];
    const restoreCommandFiles=new Set((parsed.definitions||[]).map((definition)=>deps.normalizeCommandDefinition(definition).file)),restoreHelperKeys=new Set((parsed.helperItems||[]).map((item)=>helperKey(deps.normalizeHelperLibraryItem(item)))),removedRepositoryCommands=mode==='restore'?current.commandRecords.filter((record)=>record.repositoryKnown&&!restoreCommandFiles.has(record.definition.file)).length:0,removedRepositoryHelperItems=mode==='restore'?current.helperRecords.filter((record)=>record.repositoryKnown&&!restoreHelperKeys.has(helperKey(record.item))).length:0;
    for(const definition of parsed.definitions||[]){const normalized=deps.normalizeCommandDefinition(definition),previous=current.commandByFile.get(normalized.file),idCollision=[...commandMap.values()].find((record)=>record.definition.id===normalized.id&&record.definition.file!==normalized.file);if(idCollision)throw new TypeError(`Planning command id ${normalized.id} already belongs to ${idCollision.definition.file}.`);const rendered=deps.renderCommandDefinitionDocument(normalized),unchanged=Boolean(previous)&&previous.rawContent===rendered,record=deps.normalizeCommandRecord({definition:normalized,rawContent:rendered,repositoryKnown:mode==='restore'?true:(unchanged&&Boolean(previous?.repositoryKnown)),repositoryTracked:mode==='restore'?true:Boolean(previous?.repositoryTracked||previous?.repositoryKnown),repositorySha:mode==='restore'?'':(unchanged?previous?.repositorySha||'':'')});commandMap.set(normalized.file,record);if(mode==='import'&&!previous)newCommandRecords.push(record);}
    for(const itemValue of parsed.helperItems||[]){const item=deps.normalizeHelperLibraryItem(itemValue),key=helperKey(item),previous=current.helperByKey.get(key),rendered=deps.renderHelperLibraryDocument(item),unchanged=Boolean(previous)&&previous.rawContent===rendered,record=deps.normalizeHelperRecord({item,rawContent:rendered,repositoryKnown:mode==='restore'?true:(unchanged&&Boolean(previous?.repositoryKnown)),repositorySha:mode==='restore'?'':(unchanged?previous?.repositorySha||'':'')});helperMap.set(key,record);if(mode==='import'&&!previous)newHelperRecords.push(record);}
    const restoredCommandIds=new Set((parsed.definitions||[]).map((definition)=>deps.normalizeCommandDefinition(definition).id)),next=deps.normalizePlanningHelperLocalSnapshot({...snapshot,planningCommands:[...commandMap.values()],helperItems:[...helperMap.values()],hiddenCommandIds:(snapshot.hiddenCommandIds||[]).filter((id)=>!restoredCommandIds.has(id))});return{snapshot:next,newCommandRecords,newHelperRecords,removedRepositoryCommands,removedRepositoryHelperItems,parsed};
  }
  function previewChatImport(snapshot,text,mode='import'){const parsed=deps.parseChatImport(text),merged=mergeChatImport(snapshot,parsed,mode),current=materializeSnapshot(snapshot),commandLines=(parsed.definitions||[]).map((definition)=>`${current.commandByFile.has(definition.file)?'LOCAL UPDATE':'NEW LOCAL'} planning/commands/${definition.file}`),helperLines=(parsed.helperItems||[]).map((item)=>`${current.helperByKey.has(helperKey(item))?'LOCAL UPDATE':'NEW LOCAL'} ${deps.helperLibraryTargetPath(item)}`),reconcileLines=mode==='restore'&&((merged.removedRepositoryCommands||0)||(merged.removedRepositoryHelperItems||0))?[`RECONCILE remove stale repository-backed local records: ${merged.removedRepositoryCommands||0} command(s), ${merged.removedRepositoryHelperItems||0} helper item(s)`]:[];return{...merged,lines:[...commandLines,...helperLines,...reconcileLines],mode};}
  function inventoryBucket(localRecords,remoteEntries){const localMap=new Map((localRecords||[]).map((record)=>[record.path,record])),remoteMap=new Map((remoteEntries||[]).map((entry)=>[entry.path,entry])),localOnly=[...localMap.keys()].filter((path)=>!remoteMap.has(path)).sort(),remoteOnly=[...remoteMap.keys()].filter((path)=>!localMap.has(path)).sort(),common=[...localMap.keys()].filter((path)=>remoteMap.has(path)).sort(),knownChanged=common.filter((path)=>{const local=localMap.get(path),remote=remoteMap.get(path);return Boolean(local.repositorySha)&&Boolean(remote.sha)&&local.repositorySha!==remote.sha;});return{local:localMap.size,remote:remoteMap.size,common:common.length,localOnly,remoteOnly,knownChanged};}
  function compareDirectionInventory(snapshot,remoteDirections,remoteSha=''){const localIds=(snapshot.directions||[]).map((d)=>d.id),remoteIds=(remoteDirections||[]).map((d)=>d.id),localSet=new Set(localIds),remoteSet=new Set(remoteIds);return{local:localIds.length,remote:remoteIds.length,common:localIds.filter((id)=>remoteSet.has(id)).length,localOnly:localIds.filter((id)=>!remoteSet.has(id)),remoteOnly:remoteIds.filter((id)=>!localSet.has(id)),knownChanged:Boolean(snapshot.directionCatalogSha&&remoteSha&&snapshot.directionCatalogSha!==remoteSha)?['seed/directions.json']:[]};}
  function compareUseCaseInventory(snapshot,remoteUseCases,remoteSha=''){const localIds=(snapshot.useCases||[]).map((u)=>u.id),remoteIds=(remoteUseCases||[]).map((u)=>u.id),localSet=new Set(localIds),remoteSet=new Set(remoteIds);return{local:localIds.length,remote:remoteIds.length,common:localIds.filter((id)=>remoteSet.has(id)).length,localOnly:localIds.filter((id)=>!remoteSet.has(id)),remoteOnly:remoteIds.filter((id)=>!localSet.has(id)),knownChanged:Boolean(snapshot.useCaseCatalogSha&&remoteSha&&snapshot.useCaseCatalogSha!==remoteSha)?['seed/use-cases.json']:[]};}
  function compareRepositoryInventory(snapshot,remoteCatalog){const memory=materializeSnapshot(snapshot),remoteCommands=(remoteCatalog?.commands||[]).filter((entry)=>entry.kind==='planning-command'),remoteHelpers=remoteCatalog?.helperItems||[],localHelperCommands=memory.helperRecords.filter((record)=>record.item.kind===deps.HELPER_LIBRARY_KINDS.COMMAND),localPrompts=memory.helperRecords.filter((record)=>record.item.kind===deps.HELPER_LIBRARY_KINDS.PROMPT);return{planningCommands:inventoryBucket(memory.commandRecords,remoteCommands),directions:compareDirectionInventory(snapshot,remoteCatalog?.directions||[],remoteCatalog?.directionSha||''),useCases:compareUseCaseInventory(snapshot,remoteCatalog?.useCases||[],remoteCatalog?.useCaseSha||''),helperCommands:inventoryBucket(localHelperCommands,remoteHelpers.filter((entry)=>entry.kind===deps.HELPER_LIBRARY_KINDS.COMMAND)),prompts:inventoryBucket(localPrompts,remoteHelpers.filter((entry)=>entry.kind===deps.HELPER_LIBRARY_KINDS.PROMPT)),catalogOrderChanged:Boolean(snapshot.catalogOrderSha&&remoteCatalog?.catalogOrderSha&&snapshot.catalogOrderSha!==remoteCatalog.catalogOrderSha)};}

  function prepareLocalCommandSave(snapshot,value,existingId=''){const memory=materializeSnapshot(snapshot),raw=typeof value==='string'?JSON.parse(value):(value&&typeof value==='object'?value:{}),definition=deps.normalizeCommandDefinition(raw),previous=existingId?memory.commandById.get(String(existingId)):null;if(existingId&&!previous)throw new Error(`Planning command not found: ${existingId}`);if(previous&&(definition.id!==previous.definition.id||definition.file!==previous.definition.file))throw new TypeError('Editing an existing command cannot change its id or file. Create a new command draft instead.');const collisionByFile=memory.commandRecords.find((record)=>record.definition.file===definition.file&&record.definition.id!==definition.id);if(collisionByFile)throw new TypeError(`Planning command file ${definition.file} already belongs to ${collisionByFile.definition.id}.`);const collisionById=memory.commandRecords.find((record)=>record.definition.id===definition.id&&record.definition.file!==definition.file);if(collisionById)throw new TypeError(`Planning command id ${definition.id} already belongs to ${collisionById.definition.file}.`);const rawContent=deps.renderCommandDefinitionDocument(definition);if(previous&&previous.rawContent===rawContent)return{changed:false,definition:previous.definition,record:previous,snapshot};const record=deps.normalizeCommandRecord({definition,rawContent,repositoryKnown:false,repositoryTracked:Boolean(previous?.repositoryTracked||previous?.repositoryKnown),repositorySha:''}),records=[...memory.commandRecords.filter((entry)=>entry.definition.id!==definition.id),record];deps.validateCommandCatalog(records.map((entry)=>entry.definition));return{changed:true,definition,record,snapshot:{...snapshot,planningCommands:records,hiddenCommandIds:(snapshot.hiddenCommandIds||[]).filter((id)=>id!==definition.id)}};}
  function deleteLocalCommandFromSnapshot(snapshot,id){const memory=materializeSnapshot(snapshot),value=String(id||'').trim(),record=memory.commandById.get(value),invocation=memory.commandEntries.some((entry)=>entry.entityType==='use-case-invocation-command'&&entry.id===value);if(!record&&!invocation)throw new Error(`Planning/UC invocation command not found: ${value||'<empty>'}`);return deps.normalizePlanningHelperLocalSnapshot({...snapshot,planningCommands:record?memory.commandRecords.filter((entry)=>entry.definition.id!==value):memory.commandRecords,hiddenCommandIds:[...new Set([...(snapshot.hiddenCommandIds||[]),value])],favoriteCommandIds:(snapshot.favoriteCommandIds||[]).filter((id)=>id!==value)});}
  function deleteLocalUseCaseFromSnapshot(snapshot,id){const value=String(id||'').trim();if(!(snapshot.useCases||[]).some((entry)=>entry.id===value))throw new Error(`Use Case not found: ${value||'<empty>'}`);return deps.normalizePlanningHelperLocalSnapshot({...snapshot,hiddenUseCaseIds:[...new Set([...(snapshot.hiddenUseCaseIds||[]),value])],favoriteUseCaseIds:(snapshot.favoriteUseCaseIds||[]).filter((id)=>id!==value)});}
  function toggleFavoriteCommandInSnapshot(snapshot,id){const memory=materializeSnapshot(snapshot),value=String(id||'').trim();if(!memory.commandEntries.some((entry)=>entry.id===value))throw new Error(`Command row not found: ${value||'<empty>'}`);const ids=new Set(snapshot.favoriteCommandIds||[]);if(ids.has(value))ids.delete(value);else ids.add(value);return deps.normalizePlanningHelperLocalSnapshot({...snapshot,favoriteCommandIds:[...ids]});}
  function toggleFavoriteUseCaseInSnapshot(snapshot,id){const value=String(id||'').trim();if(!(snapshot.useCases||[]).some((entry)=>entry.id===value))throw new Error(`Use Case not found: ${value||'<empty>'}`);const ids=new Set(snapshot.favoriteUseCaseIds||[]);if(ids.has(value))ids.delete(value);else ids.add(value);return deps.normalizePlanningHelperLocalSnapshot({...snapshot,favoriteUseCaseIds:[...ids]});}
  function prepareLocalHelperSave(snapshot,value,now=new Date().toISOString()){const memory=materializeSnapshot(snapshot),input=value&&typeof value==='object'?value:{},key=`${String(input.kind||'')}:${String(input.id||'')}`,previous=input.id?memory.helperByKey.get(key):null;if(previous){const stable=deps.normalizeHelperLibraryItem({...input,kind:previous.item.kind,id:previous.item.id,createdAt:previous.item.createdAt,updatedAt:previous.item.updatedAt}),unchanged=stable.title===previous.item.title&&stable.text===previous.item.text;if(unchanged)return{changed:false,item:previous.item,record:previous,snapshot};const item=deps.normalizeHelperLibraryItem({...stable,updatedAt:now}),record=deps.normalizeHelperRecord({item,rawContent:deps.renderHelperLibraryDocument(item),repositoryKnown:false,repositorySha:''});return{changed:true,item,record,snapshot:{...snapshot,helperItems:[...memory.helperRecords.filter((entry)=>helperKey(entry.item)!==helperKey(item)),record]}};}const item=deps.normalizeHelperLibraryItem({...input,createdAt:input.createdAt||now,updatedAt:now}),record=deps.normalizeHelperRecord({item,rawContent:deps.renderHelperLibraryDocument(item),repositoryKnown:false,repositorySha:''});return{changed:true,item,record,snapshot:{...snapshot,helperItems:[...memory.helperRecords,record]}};}
  function clearRepositoryEvidence(snapshot){const memory=materializeSnapshot(snapshot);return deps.normalizePlanningHelperLocalSnapshot({...snapshot,planningCommands:memory.commandRecords.map((record)=>deps.normalizeCommandRecord({...record,repositoryKnown:false,repositoryTracked:false,repositorySha:''})),helperItems:memory.helperRecords.map((record)=>deps.normalizeHelperRecord({...record,repositoryKnown:false,repositorySha:''})),directionCatalogSha:'',useCaseCatalogSha:'',catalogOrderSha:''});}
  async function persistVerifiedRepositoryResult(persist,next,result,settings,uiState){try{await persist(next);return{settings,...result,localSnapshotUpdated:true,localSnapshotError:'',...uiState()};}catch(error){return{settings,...result,localSnapshotUpdated:false,localSnapshotError:error?.message||String(error),...uiState()};}}
  function mergeRemoteMissing(snapshot,remoteRecords={}){const memory=materializeSnapshot(snapshot),commandMap=new Map(memory.commandRecords.map((record)=>[record.path,record])),helperMap=new Map(memory.helperRecords.map((record)=>[record.path,record])),addedCommands=[],addedHelpers=[];for(const remote of remoteRecords.commands||[]){if(commandMap.has(remote.path))continue;const record=deps.normalizeCommandRecord({definition:remote.definition,path:remote.path,rawContent:remote.rawContent,repositoryKnown:true,repositoryTracked:true,repositorySha:remote.sha});commandMap.set(record.path,record);addedCommands.push(record);}deps.validateCommandCatalog([...commandMap.values()].map((record)=>record.definition));for(const remote of remoteRecords.helperItems||[]){if(helperMap.has(remote.path))continue;const record=deps.normalizeHelperRecord({item:remote.item,path:remote.path,rawContent:remote.rawContent,repositoryKnown:true,repositorySha:remote.sha});helperMap.set(record.path,record);addedHelpers.push(record);}const existingDirections=new Map((snapshot.directions||[]).map((entry)=>[entry.id,entry])),addedDirections=[];for(const direction of remoteRecords.directions||[]){if(existingDirections.has(direction.id))continue;existingDirections.set(direction.id,direction);addedDirections.push(direction);}const existingUseCases=new Map((snapshot.useCases||[]).map((entry)=>[entry.id,entry])),addedUseCases=[];for(const uc of remoteRecords.useCases||[]){if(existingUseCases.has(uc.id))continue;existingUseCases.set(uc.id,uc);addedUseCases.push(uc);}const restoredCommandIds=new Set(addedCommands.map((record)=>record.definition.id)),restoredUseCaseIds=new Set(addedUseCases.map((entry)=>entry.id));const next=deps.normalizePlanningHelperLocalSnapshot({...snapshot,planningCommands:[...commandMap.values()],helperItems:[...helperMap.values()],directions:[...existingDirections.values()],directionCatalogSha:addedDirections.length?'':snapshot.directionCatalogSha,useCases:[...existingUseCases.values()],useCaseCatalogSha:addedUseCases.length?'':snapshot.useCaseCatalogSha,hiddenCommandIds:(snapshot.hiddenCommandIds||[]).filter((id)=>!restoredCommandIds.has(id)),hiddenUseCaseIds:(snapshot.hiddenUseCaseIds||[]).filter((id)=>!restoredUseCaseIds.has(id))});return{snapshot:next,addedCommands,addedHelpers,addedDirections,addedUseCases};}
  async function insertWithClipboard(text,success,id,operations=deps){let copied=false;try{const copyResult=operations.copyText(text);copied=copyResult&&typeof copyResult.then==='function'?Boolean(await copyResult):Boolean(copyResult);}catch(_){copied=false;}const result=operations.insertIntoComposer(text,id);if(result.ok)return copied?`${success} · clipboard ready`:`${success} · clipboard copy failed`;return copied?`Direct insertion failed (${result.reason}). The exact text is in the clipboard — paste manually.`:`Direct insertion failed (${result.reason}) and clipboard copy also failed.`;}

  async function startPlanningHelper(){
    for(const key of [INSTANCE_DISPOSE_KEY,...LEGACY_DISPOSE_KEYS]){const previous=globalThis[key];if(typeof previous==='function'){try{previous();}catch(_){}}}
    const repositoryLock=createRepositoryOperationLock(),loaded=await deps.loadOrMigratePlanningHelperLocalSnapshot();let snapshot=loaded.snapshot,memory=materializeSnapshot(snapshot);const startupWarnings=[...(loaded.warnings||[])];if(loaded.migrated)startupWarnings.push('Planning Helper migrated existing local data into the current local-cache schema.');
    function uiState(){return{commandEntries:memory.commandEntries,localCommandEntries:memory.localCommandEntries,promptEntries:memory.promptEntries,useCaseEntries:memory.useCaseEntries,directionDefinitions:memory.directionDefinitions,catalogOrder:memory.order,favoriteCommandIds:[...(snapshot.favoriteCommandIds||[])],favoriteUseCaseIds:[...(snapshot.favoriteUseCaseIds||[])]};}
    async function persist(next){snapshot=await deps.savePlanningHelperLocalSnapshot(next);memory=materializeSnapshot(snapshot);return uiState();}
    async function makeClient(){const settings=await deps.loadRepositorySettings(),token=await deps.loadGitHubToken();if(typeof GM_xmlhttpRequest!=='function')throw new Error('GM_xmlhttpRequest is unavailable; reinstall the generated Planning Helper userscript and accept its GM grants.');return{client:new deps.GitHubContentsClient({...settings,token,transport:deps.createGmTransport(GM_xmlhttpRequest)}),settings,token};}
    async function makeServices(){const{client,settings}=await makeClient();return{commandService:new deps.RepositoryCommandService(client,{commandsPath:deps.COMMANDS_PATH}),helperService:new deps.RepositoryHelperLibraryService(client),catalogService:new deps.RepositoryCatalogService(client),settings};}
    async function applyChatText(text,mode='import'){return repositoryLock.run(mode==='restore'?'Restore local snapshot':'Import chat items',async()=>{const parsed=deps.parseChatImport(text),merged=mergeChatImport(snapshot,parsed,mode);await persist(merged.snapshot);return{ok:true,mode,createdLocal:merged.newCommandRecords.length+merged.newHelperRecords.length,removedRepositoryCommands:merged.removedRepositoryCommands||0,removedRepositoryHelperItems:merged.removedRepositoryHelperItems||0,errors:[],...uiState()};});}
    async function saveLocalCommandDefinition(value,existingId=''){const prepared=prepareLocalCommandSave(snapshot,value,existingId);if(!prepared.changed)return{definition:prepared.definition,unchanged:true,...uiState()};const state=await persist(prepared.snapshot);return{definition:prepared.definition,unchanged:false,...state};}
    async function deleteLocalCommand(id){return persist(deleteLocalCommandFromSnapshot(snapshot,id));}async function deleteLocalUseCase(id){return persist(deleteLocalUseCaseFromSnapshot(snapshot,id));}async function toggleFavoriteCommand(id){return persist(toggleFavoriteCommandInSnapshot(snapshot,id));}async function toggleFavoriteUseCase(id){return persist(toggleFavoriteUseCaseInSnapshot(snapshot,id));}
    async function reloadRepositoryCommand(id){return repositoryLock.run('Reload planning command from GitHub',async()=>{const{commandService,settings}=await makeServices(),record=memory.commandById.get(String(id||''));if(!record)throw new Error(`Planning command not found: ${id||'<empty>'}`);const remote=await commandService.readRemote(record.path),replacement=deps.normalizeCommandRecord({definition:remote.definition,path:remote.path,rawContent:remote.rawContent,repositoryKnown:true,repositoryTracked:true,repositorySha:remote.sha}),records=memory.commandRecords.map((entry)=>entry.definition.id===record.definition.id?replacement:entry);deps.validateCommandCatalog(records.map((entry)=>entry.definition));const state=await persist({...snapshot,planningCommands:records});return{settings,path:remote.path,sha:remote.sha,...state};});}
    async function saveLocalLibraryItem(value){const prepared=prepareLocalHelperSave(snapshot,value);if(!prepared.changed)return{item:prepared.item,unchanged:true,...uiState()};const state=await persist(prepared.snapshot);return{item:prepared.item,unchanged:false,...state};}async function deleteLocalLibraryItem(kind,id){const key=`${kind}:${id}`;return persist({...snapshot,helperItems:memory.helperRecords.filter((record)=>helperKey(record.item)!==key)});}
    async function checkRepository(){return repositoryLock.run('Check GitHub inventory',async()=>{const{commandService,helperService,catalogService,settings}=await makeServices(),commands=await commandService.listRemote(),helperItems=await helperService.listRemoteAll(),directionCatalog=await catalogService.readDirections(),useCaseCatalog=await catalogService.readUseCases(),order=await catalogService.readOrder();return{settings,inventory:compareRepositoryInventory(snapshot,{commands,helperItems,directions:directionCatalog.directions,directionSha:directionCatalog.sha,useCases:useCaseCatalog.useCases,useCaseSha:useCaseCatalog.sha,catalogOrderSha:order.sha}),remoteCatalog:{commands,helperItems,directions:directionCatalog.directions,directionSha:directionCatalog.sha,useCases:useCaseCatalog.useCases,useCaseSha:useCaseCatalog.sha,catalogOrderSha:order.sha}};});}
    async function syncMissingRepository(){return repositoryLock.run('Sync missing from GitHub',async()=>{const{commandService,helperService,catalogService,settings}=await makeServices(),commands=await commandService.listRemote(),helperItems=await helperService.listRemoteAll(),directionCatalog=await catalogService.readDirections(),useCaseCatalog=await catalogService.readUseCases(),inventory=compareRepositoryInventory(snapshot,{commands,helperItems,directions:directionCatalog.directions,directionSha:directionCatalog.sha,useCases:useCaseCatalog.useCases,useCaseSha:useCaseCatalog.sha}),directionMissing=new Set(inventory.directions.remoteOnly),commandMissing=new Set(inventory.planningCommands.remoteOnly),helperMissing=new Set([...inventory.helperCommands.remoteOnly,...inventory.prompts.remoteOnly]),useCaseMissing=new Set(inventory.useCases.remoteOnly),remoteCommands=[],remoteHelpers=[],remoteDirections=directionCatalog.directions.filter((entry)=>directionMissing.has(entry.id)),remoteUseCases=useCaseCatalog.useCases.filter((entry)=>useCaseMissing.has(entry.id));for(const entry of commands)if(commandMissing.has(entry.path))remoteCommands.push(await commandService.readRemote(entry.path));for(const entry of helperItems)if(helperMissing.has(entry.path))remoteHelpers.push(await helperService.readRemote(entry.path));const merged=mergeRemoteMissing(snapshot,{commands:remoteCommands,helperItems:remoteHelpers,directions:remoteDirections,useCases:remoteUseCases});await persist(merged.snapshot);return{settings,addedCommands:merged.addedCommands.length,addedDirections:merged.addedDirections.length,addedUseCases:merged.addedUseCases.length,addedHelperCommands:merged.addedHelpers.filter((record)=>record.item.kind===deps.HELPER_LIBRARY_KINDS.COMMAND).length,addedPrompts:merged.addedHelpers.filter((record)=>record.item.kind===deps.HELPER_LIBRARY_KINDS.PROMPT).length,inventoryBefore:inventory,...uiState()};});}
    async function hardReloadRepository(){return repositoryLock.run('Hard Reload GitHub catalogs',async()=>{const{commandService,catalogService,settings}=await makeServices(),commandRecords=await commandService.loadCatalog(),directionCatalog=await catalogService.readDirections(),useCaseCatalog=await catalogService.readUseCases(),order=await catalogService.readOrder(),planningCommands=commandRecords.map((remote)=>deps.normalizeCommandRecord({definition:remote.definition,path:remote.path,rawContent:remote.rawContent,repositoryKnown:true,repositoryTracked:true,repositorySha:remote.sha}));deps.validateCommandCatalog(planningCommands.map((record)=>record.definition));const next=deps.normalizePlanningHelperLocalSnapshot({...snapshot,planningCommands,directions:directionCatalog.directions,directionCatalogSha:directionCatalog.sha,useCases:useCaseCatalog.useCases,useCaseCatalogSha:useCaseCatalog.sha,catalogOrder:order.order,catalogOrderSha:order.sha,hiddenCommandIds:[],hiddenUseCaseIds:[]});const state=await persist(next);return{settings,directions:directionCatalog.directions.length,commands:planningCommands.length,useCases:useCaseCatalog.useCases.length,orderPath:order.path,orderSha:order.sha,...state};});}
    async function moveCatalogItem(surface,id,delta){const currentIds=surface===deps.SURFACES.COMMANDS?memory.commandEntries.map((entry)=>entry.id):surface===deps.SURFACES.USE_CASES?memory.useCaseEntries.map((entry)=>entry.id):surface===deps.SURFACES.PROMPTS?memory.promptEntries.map((entry)=>entry.id):[];if(!currentIds.length)throw new Error(`No reorderable items on ${surface}.`);const key=surface===deps.SURFACES.COMMANDS?'commands':surface===deps.SURFACES.USE_CASES?'useCases':'prompts',order=deps.normalizeCatalogOrder(snapshot.catalogOrder||{});order[key]=moveId(order[key],currentIds,id,delta);return persist({...snapshot,catalogOrder:order,catalogOrderSha:''});}
    async function moveDirection(id,delta){const currentIds=memory.directionDefinitions.map((entry)=>entry.id),order=deps.normalizeCatalogOrder(snapshot.catalogOrder||{});order.directions=moveId(order.directions,currentIds,id,delta);return persist({...snapshot,catalogOrder:order,catalogOrderSha:''});}
    async function saveCatalogOrderRepository(){return repositoryLock.run('Save catalog order to GitHub',async()=>{const{catalogService,settings}=await makeServices(),result=await catalogService.saveOrder(snapshot.catalogOrder),state=await persist({...snapshot,catalogOrder:result.order,catalogOrderSha:result.sha});return{settings,...result,...state};});}
    async function saveRepositoryEntity(reference){return repositoryLock.run('Save item to GitHub',async()=>{const{commandService,helperService,settings}=await makeServices(),type=String(reference?.type||'');let result,next;if(type==='planning-command'){const record=memory.commandById.get(String(reference.id||''));if(!record)throw new Error(`Local planning command not found: ${reference?.id||'<empty>'}`);result=await commandService.save(record.definition);next={...snapshot,planningCommands:memory.commandRecords.map((entry)=>entry.path===record.path?deps.normalizeCommandRecord({...entry,rawContent:result.rawContent,repositoryKnown:true,repositoryTracked:true,repositorySha:result.sha}):entry)};}else if(type==='helper'){const key=`${reference?.kind}:${reference?.id}`,record=memory.helperByKey.get(key);if(!record)throw new Error(`Local helper item not found: ${key}`);result=await helperService.save(record.item);next={...snapshot,helperItems:memory.helperRecords.map((entry)=>entry.path===record.path?deps.normalizeHelperRecord({...entry,rawContent:result.rawContent,repositoryKnown:true,repositorySha:result.sha}):entry)};}else throw new TypeError(`Unsupported repository entity type: ${type||'<empty>'}`);return persistVerifiedRepositoryResult(persist,next,result,settings,uiState);});}
    async function getRecoveryRequest(){const settings=await deps.loadRepositorySettings();return deps.buildRecoveryRequest(settings);}async function loadSettings(){return{settings:await deps.loadRepositorySettings(),token:await deps.loadGitHubToken()};}async function saveSettings(settings,token){return repositoryLock.run('Save repository settings',async()=>{const previous=await deps.loadRepositorySettings(),candidate=deps.validateRepositorySettings(settings),sourceChanged=repositorySettingsKey(previous)!==repositorySettingsKey(candidate);if(sourceChanged)await persist(clearRepositoryEvidence(snapshot));await deps.saveGitHubToken(token);await deps.saveRepositorySettings(candidate);return{sourceChanged,...uiState()};});}
    const ui=deps.createPlanningHelperUi({surfaces:deps.SURFACES,...uiState(),position:deps.readPanelPosition(),onSavePosition:deps.savePanelPosition,onInsert:(text,success,id)=>insertWithClipboard(text,success,id),onCopy:deps.copyText,onPreviewChatImport:(text,mode)=>previewChatImport(snapshot,text,mode),onApplyChatImport:applyChatText,onGetRecoveryRequest:getRecoveryRequest,onSaveLocalCommandDefinition:saveLocalCommandDefinition,onDeleteLocalCommand:deleteLocalCommand,onDeleteLocalUseCase:deleteLocalUseCase,onToggleFavoriteCommand:toggleFavoriteCommand,onToggleFavoriteUseCase:toggleFavoriteUseCase,onReloadRepositoryCommand:reloadRepositoryCommand,onSaveLocalLibraryItem:saveLocalLibraryItem,onDeleteLocalLibraryItem:deleteLocalLibraryItem,onCheckRepository:checkRepository,onSyncMissingRepository:syncMissingRepository,onHardReloadRepository:hardReloadRepository,onMoveCatalogItem:moveCatalogItem,onMoveDirection:moveDirection,onSaveCatalogOrderRepository:saveCatalogOrderRepository,onSaveRepositoryEntity:saveRepositoryEntity,onLoadSettings:loadSettings,onSaveSettings:saveSettings,startupWarnings});
    function dispose(){ui?.dispose();if(globalThis[INSTANCE_DISPOSE_KEY]===dispose)delete globalThis[INSTANCE_DISPOSE_KEY];for(const key of LEGACY_DISPOSE_KEYS)if(globalThis[key]===dispose)delete globalThis[key];}globalThis[INSTANCE_DISPOSE_KEY]=dispose;
    return{dispose,getSnapshot:()=>snapshot,getDefinitions:()=>memory.commandRecords.map((record)=>record.definition),getUseCases:()=>memory.useCases,getLocalLibrary:()=>memory.helperRecords.map((record)=>record.item),previewChatImport:(text,mode)=>previewChatImport(snapshot,text,mode),applyChatImport:applyChatText,saveLocalCommandDefinition,deleteLocalCommand,deleteLocalUseCase,toggleFavoriteCommand,toggleFavoriteUseCase,reloadRepositoryCommand,checkRepository,syncMissingRepository,hardReloadRepository,moveCatalogItem,moveDirection,saveCatalogOrderRepository,saveRepositoryEntity,getRepositoryOperation:()=>repositoryLock.active()};
  }

  return{startPlanningHelper,createRepositoryOperationLock,materializeSnapshot,mergeChatImport,previewChatImport,compareRepositoryInventory,mergeRemoteMissing,prepareLocalCommandSave,deleteLocalCommandFromSnapshot,deleteLocalUseCaseFromSnapshot,toggleFavoriteCommandInSnapshot,toggleFavoriteUseCaseInSnapshot,prepareLocalHelperSave,clearRepositoryEvidence,persistVerifiedRepositoryResult,insertWithClipboard,sortByIds,moveId};
});

(function(){
  'use strict';
  const api=globalThis.ObsPlanningHelper;if(!api||typeof api.startPlanningHelper!=='function')throw new Error('OBS Planning Helper runtime was not built correctly.');api.startPlanningHelper().catch((error)=>console.error('[OBS Planning Helper startup]',error));
})();
