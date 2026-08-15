(function (root, factory) {
  const api = factory(root.ObsPlanningHelper || {});
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsPlanningHelper = Object.assign(root.ObsPlanningHelper || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function (deps) {
  'use strict';

  const INSTANCE_DISPOSE_KEY='__obsPlanningHelperDisposeV2';
  const LEGACY_DISPOSE_KEYS=['__obsCommandHelperDisposeV1'];
  function cleanDefinitions(definitions){return definitions.map((definition)=>deps.stripRuntimeCommandMetadata(definition));}
  function remoteItems(records){return deps.repositoryLibraryRecordsToItems(records||[]);}
  function upsertRemoteRecord(records,record){const path=String(record?.path||'');if(!path)throw new TypeError('Repository helper-library cache record is missing path.');return[...(records||[]).filter((entry)=>String(entry.path||'')!==path),record].sort((a,b)=>String(a.path||'').localeCompare(String(b.path||'')));}

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
    let remoteLibraryRecords=[];
    let remoteLibraryLastSyncedAt='';
    let startupWarnings=[];
    try{const migration=await deps.migrateLegacyLocalCommandProjections();if(migration.added)startupWarnings.push(`Migrated ${migration.added} legacy local command projection(s) into Planning Helper GM storage.`);if(migration.warning)startupWarnings.push(migration.warning);}catch(error){startupWarnings.push(`Legacy local command migration failed: ${error.message||String(error)}`);}
    try{localLibrary=await deps.loadLocalHelperLibrary();}catch(error){startupWarnings.push(`Local helper library could not be loaded: ${error.message||String(error)}`);localLibrary=[];}
    try{const cache=await deps.loadCommandCatalogCache(initialSettings);if(cache&&Array.isArray(cache.definitions)){deps.validateCommandCatalog(cache.definitions);currentDefinitions=cache.definitions;}}catch(error){console.warn('[OBS Planning Helper] Ignoring invalid command cache:',error);}
    try{const cache=await deps.loadRepositoryHelperLibraryCache(initialSettings);if(cache){remoteLibraryRecords=cache.records;remoteLibraryLastSyncedAt=cache.lastSyncedAt||'';}}catch(error){console.warn('[OBS Planning Helper] Ignoring invalid helper-library cache:',error);}

    function commandEntries(){return deps.buildCommandEntries(currentDefinitions);}
    function localCommandEntries(){return buildLibraryEntries(deps.HELPER_LIBRARY_KINDS.COMMAND,remoteItems(remoteLibraryRecords),localLibrary);}
    function promptEntries(){return buildLibraryEntries(deps.HELPER_LIBRARY_KINDS.PROMPT,remoteItems(remoteLibraryRecords),localLibrary);}
    function libraryUiState(){return{localCommandEntries:localCommandEntries(),promptEntries:promptEntries()};}

    async function makeClient(){const settings=await deps.loadRepositorySettings();const token=await deps.loadGitHubToken();if(typeof GM_xmlhttpRequest!=='function')throw new Error('GM_xmlhttpRequest is unavailable; reinstall the generated Planning Helper userscript and accept its GM grants.');const transport=deps.createGmTransport(GM_xmlhttpRequest);return{client:new deps.GitHubContentsClient({...settings,token,transport}),settings};}
    async function makeCommandService(){const {client,settings}=await makeClient();return{service:new deps.RepositoryCommandService(client,{commandsPath:deps.COMMANDS_PATH}),settings};}
    async function makeLibraryService(){const {client,settings}=await makeClient();return{service:new deps.RepositoryHelperLibraryService(client),settings};}

    async function refreshCommandsUnlocked(){const {service,settings}=await makeCommandService();const definitions=await service.loadCatalog();const clean=cleanDefinitions(definitions);deps.validateCommandCatalog(clean);currentDefinitions=clean;await deps.saveCommandCatalogCache(clean,settings);return{commandEntries:commandEntries(),count:clean.length,visible:clean.filter((definition)=>definition.palette).length};}
    async function refreshLibraryUnlocked(){const {service,settings}=await makeLibraryService();const synced=await service.syncAll(remoteLibraryRecords);remoteLibraryRecords=synced.records;remoteLibraryLastSyncedAt=synced.syncedAt;await deps.saveRepositoryHelperLibraryCache(remoteLibraryRecords,settings,{lastSyncedAt:remoteLibraryLastSyncedAt});const items=remoteItems(remoteLibraryRecords);return{...libraryUiState(),count:items.length,commands:items.filter((item)=>item.kind===deps.HELPER_LIBRARY_KINDS.COMMAND).length,prompts:items.filter((item)=>item.kind===deps.HELPER_LIBRARY_KINDS.PROMPT).length,fetched:synced.fetched,reused:synced.reused,removed:synced.removed,syncedAt:synced.syncedAt};}

    async function refreshCommands(){return repositoryLock.run('Refresh repository commands',refreshCommandsUnlocked);}
    async function previewDefinitions(definitions){return repositoryLock.run('Preview repository commands',async()=>{const{service}=await makeCommandService();return service.previewDefinitions(definitions);});}
    async function saveDefinitions(previewPlan){return repositoryLock.run('Save repository commands',async()=>{const{service}=await makeCommandService();const result=await service.savePreviewPlan(previewPlan);try{const refreshed=await refreshCommandsUnlocked();return{...result,commandEntries:refreshed.commandEntries};}catch(error){return{...result,refreshError:error.message||String(error),commandEntries:commandEntries()};}});}
    async function refreshLibrary(){return repositoryLock.run('Refresh helper library',refreshLibraryUnlocked);}

    async function saveLocalLibraryItem(value){const now=new Date().toISOString();const current=localLibrary.find((item)=>item.kind===value.kind&&item.id===value.id);const normalized=deps.normalizeHelperLibraryItem({...value,createdAt:current?.createdAt||value.createdAt||now,updatedAt:now});const saved=await deps.upsertLocalHelperLibraryItem(normalized);localLibrary=saved.items;return{item:saved.item,...libraryUiState()};}
    async function deleteLocalLibraryItem(kind,id){localLibrary=await deps.removeLocalHelperLibraryItem(kind,id);return libraryUiState();}
    async function previewLibraryItem(kind,id){return repositoryLock.run('Preview helper-library save',async()=>{localLibrary=await deps.loadLocalHelperLibrary();const item=localLibrary.find((entry)=>entry.kind===kind&&entry.id===id);if(!item)throw new Error('Only a local helper-library item can be saved to the repository.');const{service}=await makeLibraryService();return service.previewSave(item);});}
    async function saveLibraryItem(plan){return repositoryLock.run('Save helper-library item',async()=>{localLibrary=await deps.loadLocalHelperLibrary();const previewItem=deps.normalizeHelperLibraryItem(plan?.item||{});const current=localLibrary.find((entry)=>entry.kind===previewItem.kind&&entry.id===previewItem.id);if(!current||JSON.stringify(current)!==JSON.stringify(previewItem)){const error=new Error('Local helper-library item changed since Preview. Nothing was written; preview again.');error.kind='conflict';throw error;}const{service,settings}=await makeLibraryService();const result=await service.savePreviewPlan(plan);remoteLibraryRecords=upsertRemoteRecord(remoteLibraryRecords,result.record);let cacheError='';try{await deps.saveRepositoryHelperLibraryCache(remoteLibraryRecords,settings,{lastSyncedAt:remoteLibraryLastSyncedAt});}catch(error){cacheError=error.message||String(error);}return{...result,...libraryUiState(),cacheError};});}

    async function onInsert(text,success,id){await new Promise((resolve)=>requestAnimationFrame(resolve));const result=deps.insertIntoComposer(text,id);if(result.ok)return success;const copied=await deps.copyText(text);return copied?`Direct insertion failed (${result.reason}). Copied to clipboard — paste manually.`:`Direct insertion failed (${result.reason}) and clipboard copy also failed.`;}
    async function loadSettings(){return{settings:await deps.loadRepositorySettings(),token:await deps.loadGitHubToken()};}
    async function saveSettings(settings,token){return repositoryLock.run('Save repository settings',async()=>{const previous=await deps.loadRepositorySettings();const next=await deps.saveRepositorySettings(settings);await deps.saveGitHubToken(token);const sourceChanged=deps.repositorySourceKey(previous)!==deps.repositorySourceKey(next);if(sourceChanged){currentDefinitions=bundled;remoteLibraryRecords=[];remoteLibraryLastSyncedAt='';return{sourceChanged:true,commandEntries:commandEntries(),...libraryUiState()};}return{sourceChanged:false};});}

    const ui=deps.createPlanningHelperUi({surfaces:deps.SURFACES,semanticEntries,commandEntries:commandEntries(),...libraryUiState(),position:deps.readPanelPosition(),onSavePosition:deps.savePanelPosition,onInsert,onCopy:deps.copyText,onRefreshCommands:refreshCommands,parseDefinitions:deps.parseCommandDefinitionBatch,onPreviewDefinitions:previewDefinitions,onSaveDefinitions:saveDefinitions,onRefreshLibrary:refreshLibrary,onSaveLocalLibraryItem:saveLocalLibraryItem,onDeleteLocalLibraryItem:deleteLocalLibraryItem,onPreviewLibraryItem:previewLibraryItem,onSaveLibraryItem:saveLibraryItem,onLoadSettings:loadSettings,onSaveSettings:saveSettings,startupWarnings});
    function dispose(){ui?.dispose();if(globalThis[INSTANCE_DISPOSE_KEY]===dispose)delete globalThis[INSTANCE_DISPOSE_KEY];for(const key of LEGACY_DISPOSE_KEYS)if(globalThis[key]===dispose)delete globalThis[key];}
    globalThis[INSTANCE_DISPOSE_KEY]=dispose;
    return{dispose,refreshRemote:refreshCommands,refreshLibrary,getDefinitions:()=>[...currentDefinitions],getLocalLibrary:()=>[...localLibrary],getRemoteLibrary:()=>remoteItems(remoteLibraryRecords),getRepositoryLibraryCache:()=>({records:[...remoteLibraryRecords],lastSyncedAt:remoteLibraryLastSyncedAt}),getRepositoryOperation:()=>repositoryLock.active()};
  }

  return { startPlanningHelper, createRepositoryOperationLock, buildLibraryEntries };
});
