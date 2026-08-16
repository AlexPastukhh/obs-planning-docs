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

  function materializeSnapshot(snapshot){
    const commandRecords=[...(snapshot.planningCommands||[])];
    const helperRecords=[...(snapshot.helperItems||[])];
    const definitions=commandRecords.map((record)=>record.definition);
    deps.validateCommandCatalog(definitions);
    const commandByFile=new Map(commandRecords.map((record)=>[record.definition.file,record]));
    const commandById=new Map(commandRecords.map((record)=>[record.definition.id,record]));
    const helperByKey=new Map(helperRecords.map((record)=>[helperKey(record.item),record]));
    const commandEntries=deps.buildCommandEntries(definitions);
    const helperEntries=helperRecords.map((record)=>{const item=record.item;return{id:`helper-library:${item.kind}:${item.id}`,libraryId:item.id,libraryKind:item.kind,label:item.title,title:item.title,description:record.repositoryKnown?'local · GitHub backup exists':'local · no verified GitHub backup',text:item.text,adaptiveBody:item.text,repositoryKnown:Boolean(record.repositoryKnown),repositorySha:record.repositorySha||'',createdAt:item.createdAt,updatedAt:item.updatedAt};});
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
      const record=deps.normalizeCommandRecord({definition:normalized,repositoryKnown:mode==='restore'?true:Boolean(previous?.repositoryKnown),repositorySha:mode==='restore'?'':previous?.repositorySha||''});
      commandMap.set(normalized.file,record);if(mode==='import'&&(!previous||!previous.repositoryKnown))newCommandRecords.push(record);
    }
    for(const itemValue of parsed.helperItems||[]){const item=deps.normalizeHelperLibraryItem(itemValue),key=helperKey(item),previous=current.helperByKey.get(key);const record=deps.normalizeHelperRecord({item,repositoryKnown:mode==='restore'?true:Boolean(previous?.repositoryKnown),repositorySha:mode==='restore'?'':previous?.repositorySha||''});helperMap.set(key,record);if(mode==='import'&&(!previous||!previous.repositoryKnown))newHelperRecords.push(record);}
    const next={schemaVersion:deps.LOCAL_SNAPSHOT_SCHEMA_VERSION,savedAt:new Date().toISOString(),planningCommands:[...commandMap.values()],helperItems:[...helperMap.values()]};
    deps.normalizePlanningHelperLocalSnapshot(next);
    return{snapshot:next,newCommandRecords,newHelperRecords,removedRepositoryCommands,removedRepositoryHelperItems,parsed};
  }

  function previewChatImport(snapshot,text,mode='import'){
    const parsed=deps.parseChatImport(text);const merged=mergeChatImport(snapshot,parsed,mode);const current=materializeSnapshot(snapshot);
    const commandLines=(parsed.definitions||[]).map((definition)=>`${current.commandByFile.has(definition.file)?'LOCAL UPDATE':'NEW'} planning/commands/${definition.file}`);
    const helperLines=(parsed.helperItems||[]).map((item)=>`${current.helperByKey.has(helperKey(item))?'LOCAL UPDATE':'NEW'} ${deps.helperLibraryTargetPath(item)}`);
    const reconcileLines=mode==='restore'&&((merged.removedRepositoryCommands||0)||(merged.removedRepositoryHelperItems||0))?[`RECONCILE remove stale repository-backed local records: ${merged.removedRepositoryCommands||0} command(s), ${merged.removedRepositoryHelperItems||0} helper item(s)`]:[];
    return{...merged,lines:[...commandLines,...helperLines,...reconcileLines],mode};
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

    async function applyCreateResults(merged,commandResult,helperResult){
      const commandSuccess=new Map((commandResult?.results||[]).filter((row)=>row.ok).map((row)=>[row.path,row]));
      const helperSuccess=new Map((helperResult?.results||[]).filter((row)=>row.ok).map((row)=>[row.path,row]));
      const next={...merged.snapshot,planningCommands:merged.snapshot.planningCommands.map((record)=>commandSuccess.has(record.path)?deps.normalizeCommandRecord({...record,repositoryKnown:true,repositorySha:commandSuccess.get(record.path).sha}):record),helperItems:merged.snapshot.helperItems.map((record)=>helperSuccess.has(record.path)?deps.normalizeHelperRecord({...record,repositoryKnown:true,repositorySha:helperSuccess.get(record.path).sha}):record)};
      await persist(next);return{commandResult,helperResult,...uiState()};
    }

    async function applyChatText(text,mode='import'){
      return repositoryLock.run(mode==='restore'?'Restore local snapshot':'Import chat items',async()=>{
        const parsed=deps.parseChatImport(text);const merged=mergeChatImport(snapshot,parsed,mode);await persist(merged.snapshot);
        if(mode==='restore'||(!merged.newCommandRecords.length&&!merged.newHelperRecords.length))return{ok:true,mode,created:0,conflicts:0,errors:[],...uiState()};
        let commandResult={ok:true,results:[]},helperResult={ok:true,results:[]};
        try{
          const{client}=await makeClient();
          if(merged.newCommandRecords.length){const service=new deps.RepositoryCommandService(client,{commandsPath:deps.COMMANDS_PATH});commandResult=await service.createOnlyBatch(merged.newCommandRecords.map((record)=>record.definition));}
          if(merged.newHelperRecords.length){const service=new deps.RepositoryHelperLibraryService(client);helperResult=await service.createOnlyBatch(merged.newHelperRecords.map((record)=>record.item));}
        }catch(error){const failures=[...merged.newCommandRecords.map((record)=>({ok:false,path:record.path,error:error.message||String(error),kind:error.kind||'error'})),...merged.newHelperRecords.map((record)=>({ok:false,path:record.path,error:error.message||String(error),kind:error.kind||'error'}))];commandResult={ok:false,results:failures};helperResult={ok:true,results:[]};}
        const applied=await applyCreateResults(merged,commandResult,helperResult);const all=[...(commandResult.results||[]),...(helperResult.results||[])];return{ok:all.every((row)=>row.ok),mode,created:all.filter((row)=>row.ok).length,conflicts:all.filter((row)=>!row.ok&&row.kind==='conflict').length,errors:all.filter((row)=>!row.ok),...applied};
      });
    }

    async function saveLocalLibraryItem(value){const now=new Date().toISOString();const item=deps.normalizeHelperLibraryItem({...value,createdAt:value.createdAt||now,updatedAt:now});const key=helperKey(item),previous=memory.helperByKey.get(key);const record=deps.normalizeHelperRecord({item,repositoryKnown:Boolean(previous?.repositoryKnown),repositorySha:previous?.repositorySha||''});const next={...snapshot,helperItems:[...memory.helperRecords.filter((entry)=>helperKey(entry.item)!==key),record]};const state=await persist(next);return{item,...state};}
    async function deleteLocalLibraryItem(kind,id){const key=`${kind}:${id}`;const next={...snapshot,helperItems:memory.helperRecords.filter((record)=>helperKey(record.item)!==key)};return persist(next);}
    async function getRecoveryRequest(){const settings=await deps.loadRepositorySettings();return deps.buildRecoveryRequest(settings);}
    async function loadSettings(){return{settings:await deps.loadRepositorySettings(),token:await deps.loadGitHubToken()};}
    async function saveSettings(settings,token){return repositoryLock.run('Save repository settings',async()=>{await deps.saveRepositorySettings(settings);await deps.saveGitHubToken(token);return{sourceChanged:false};});}

    const ui=deps.createPlanningHelperUi({surfaces:deps.SURFACES,semanticEntries,...uiState(),position:deps.readPanelPosition(),onSavePosition:deps.savePanelPosition,onInsert:(text,success,id)=>insertWithClipboard(text,success,id),onCopy:deps.copyText,onPreviewChatImport:(text,mode)=>previewChatImport(snapshot,text,mode),onApplyChatImport:applyChatText,onGetRecoveryRequest:getRecoveryRequest,onSaveLocalLibraryItem:saveLocalLibraryItem,onDeleteLocalLibraryItem:deleteLocalLibraryItem,onLoadSettings:loadSettings,onSaveSettings:saveSettings,startupWarnings});
    function dispose(){ui?.dispose();if(globalThis[INSTANCE_DISPOSE_KEY]===dispose)delete globalThis[INSTANCE_DISPOSE_KEY];for(const key of LEGACY_DISPOSE_KEYS)if(globalThis[key]===dispose)delete globalThis[key];}
    globalThis[INSTANCE_DISPOSE_KEY]=dispose;
    return{dispose,getSnapshot:()=>snapshot,getDefinitions:()=>memory.commandRecords.map((record)=>record.definition),getLocalLibrary:()=>memory.helperRecords.map((record)=>record.item),previewChatImport:(text,mode)=>previewChatImport(snapshot,text,mode),applyChatImport:applyChatText,getRepositoryOperation:()=>repositoryLock.active()};
  }

  return{startPlanningHelper,createRepositoryOperationLock,materializeSnapshot,mergeChatImport,previewChatImport,insertWithClipboard};
});
