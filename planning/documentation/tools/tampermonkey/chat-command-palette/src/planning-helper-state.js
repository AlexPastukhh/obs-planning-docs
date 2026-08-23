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
