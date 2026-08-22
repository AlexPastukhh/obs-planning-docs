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
    const next={schemaVersion:deps.LOCAL_SNAPSHOT_SCHEMA_VERSION,savedAt:new Date().toISOString(),planningCommands:[...commandMap.values()],helperItems:[...helperMap.values()],hiddenCommandIds:(snapshot.hiddenCommandIds||[]).filter((id)=>!restoredCommandIds.has(id)),hiddenUseCaseIds:[...(snapshot.hiddenUseCaseIds||[])],favoriteCommandIds:[...(snapshot.favoriteCommandIds||[])],favoriteUseCaseIds:[...(snapshot.favoriteUseCaseIds||[])]};
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
    return deps.normalizePlanningHelperLocalSnapshot({...snapshot,planningCommands:record?memory.commandRecords.filter((entry)=>entry.definition.id!==value):memory.commandRecords,hiddenCommandIds:[...new Set([...(snapshot.hiddenCommandIds||[]),value])],favoriteCommandIds:(snapshot.favoriteCommandIds||[]).filter((id)=>id!==value)});
  }

  function deleteLocalUseCaseFromSnapshot(snapshot,id){
    const value=String(id||'').trim();if(!deps.USE_CASE_DEFINITIONS.some((entry)=>entry.id===value))throw new Error(`Use Case not found: ${value||'<empty>'}`);
    return deps.normalizePlanningHelperLocalSnapshot({...snapshot,hiddenUseCaseIds:[...new Set([...(snapshot.hiddenUseCaseIds||[]),value])],favoriteUseCaseIds:(snapshot.favoriteUseCaseIds||[]).filter((id)=>id!==value)});
  }

  function toggleFavoriteCommandInSnapshot(snapshot,id){
    const memory=materializeSnapshot(snapshot),value=String(id||'').trim();
    if(!memory.commandEntries.some((entry)=>entry.id===value))throw new Error(`Command row not found: ${value||'<empty>'}`);
    const ids=new Set(snapshot.favoriteCommandIds||[]);if(ids.has(value))ids.delete(value);else ids.add(value);
    return deps.normalizePlanningHelperLocalSnapshot({...snapshot,favoriteCommandIds:[...ids]});
  }

  function toggleFavoriteUseCaseInSnapshot(snapshot,id){
    const value=String(id||'').trim();
    if(!deps.USE_CASE_DEFINITIONS.some((entry)=>entry.id===value))throw new Error(`Use Case not found: ${value||'<empty>'}`);
    const ids=new Set(snapshot.favoriteUseCaseIds||[]);if(ids.has(value))ids.delete(value);else ids.add(value);
    return deps.normalizePlanningHelperLocalSnapshot({...snapshot,favoriteUseCaseIds:[...ids]});
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
    const restoredCommandIds=new Set(addedCommands.map((record)=>record.definition.id));
    const next=deps.normalizePlanningHelperLocalSnapshot({schemaVersion:deps.LOCAL_SNAPSHOT_SCHEMA_VERSION,savedAt:new Date().toISOString(),planningCommands:[...commandMap.values()],helperItems:[...helperMap.values()],hiddenCommandIds:(snapshot.hiddenCommandIds||[]).filter((id)=>!restoredCommandIds.has(id)),hiddenUseCaseIds:[...(snapshot.hiddenUseCaseIds||[])],favoriteCommandIds:[...(snapshot.favoriteCommandIds||[])],favoriteUseCaseIds:[...(snapshot.favoriteUseCaseIds||[])]});
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
    function uiState(){return{commandEntries:memory.commandEntries,localCommandEntries:memory.localCommandEntries,promptEntries:memory.promptEntries,useCaseEntries:memory.useCaseEntries,favoriteCommandIds:[...(snapshot.favoriteCommandIds||[])],favoriteUseCaseIds:[...(snapshot.favoriteUseCaseIds||[])]};}
    async function persist(next){snapshot=await deps.savePlanningHelperLocalSnapshot(next);memory=materializeSnapshot(snapshot);return uiState();}
    async function makeClient(){const settings=await deps.loadRepositorySettings();const token=await deps.loadGitHubToken();if(typeof GM_xmlhttpRequest!=='function')throw new Error('GM_xmlhttpRequest is unavailable; reinstall the generated Planning Helper userscript and accept its GM grants.');return{client:new deps.GitHubContentsClient({...settings,token,transport:deps.createGmTransport(GM_xmlhttpRequest)}),settings,token};}
    async function makeServices(){const{client,settings}=await makeClient();return{commandService:new deps.RepositoryCommandService(client,{commandsPath:deps.COMMANDS_PATH}),helperService:new deps.RepositoryHelperLibraryService(client),settings};}

    async function applyChatText(text,mode='import'){
      return repositoryLock.run(mode==='restore'?'Restore local snapshot':'Import chat items',async()=>{const parsed=deps.parseChatImport(text);const merged=mergeChatImport(snapshot,parsed,mode);await persist(merged.snapshot);return{ok:true,mode,createdLocal:merged.newCommandRecords.length+merged.newHelperRecords.length,removedRepositoryCommands:merged.removedRepositoryCommands||0,removedRepositoryHelperItems:merged.removedRepositoryHelperItems||0,errors:[],...uiState()};});
    }

    async function saveLocalCommandDefinition(value,existingId=''){const prepared=prepareLocalCommandSave(snapshot,value,existingId);if(!prepared.changed)return{definition:prepared.definition,unchanged:true,...uiState()};const state=await persist(prepared.snapshot);return{definition:prepared.definition,unchanged:false,...state};}
    async function deleteLocalCommand(id){return persist(deleteLocalCommandFromSnapshot(snapshot,id));}
    async function deleteLocalUseCase(id){return persist(deleteLocalUseCaseFromSnapshot(snapshot,id));}
    async function toggleFavoriteCommand(id){return persist(toggleFavoriteCommandInSnapshot(snapshot,id));}
    async function toggleFavoriteUseCase(id){return persist(toggleFavoriteUseCaseInSnapshot(snapshot,id));}
    async function reloadRepositoryCommand(id){return repositoryLock.run('Reload planning command from GitHub',async()=>{const{commandService,settings}=await makeServices();const record=memory.commandById.get(String(id||''));if(!record)throw new Error(`Planning command not found: ${id||'<empty>'}`);const remote=await commandService.readRemote(record.path);const replacement=deps.normalizeCommandRecord({definition:remote.definition,path:remote.path,rawContent:remote.rawContent,repositoryKnown:true,repositoryTracked:true,repositorySha:remote.sha});const records=memory.commandRecords.map((entry)=>entry.definition.id===record.definition.id?replacement:entry);deps.validateCommandCatalog(records.map((entry)=>entry.definition));const state=await persist({...snapshot,planningCommands:records});return{settings,path:remote.path,sha:remote.sha,...state};});}
    async function saveLocalLibraryItem(value){const prepared=prepareLocalHelperSave(snapshot,value);if(!prepared.changed)return{item:prepared.item,unchanged:true,...uiState()};const state=await persist(prepared.snapshot);return{item:prepared.item,unchanged:false,...state};}
    async function deleteLocalLibraryItem(kind,id){const key=`${kind}:${id}`;const next={...snapshot,helperItems:memory.helperRecords.filter((record)=>helperKey(record.item)!==key)};return persist(next);}

    async function checkRepository(){return repositoryLock.run('Check GitHub inventory',async()=>{const{commandService,helperService,settings}=await makeServices();const commands=await commandService.listRemote();const helperItems=await helperService.listRemoteAll();return{settings,inventory:compareRepositoryInventory(snapshot,{commands,helperItems}),remoteCatalog:{commands,helperItems}};});}

    async function syncMissingRepository(){return repositoryLock.run('Sync missing from GitHub',async()=>{const{commandService,helperService,settings}=await makeServices();const commands=await commandService.listRemote();const helperItems=await helperService.listRemoteAll();const inventory=compareRepositoryInventory(snapshot,{commands,helperItems});const commandMissing=new Set(inventory.planningCommands.remoteOnly),helperMissing=new Set([...inventory.helperCommands.remoteOnly,...inventory.prompts.remoteOnly]);const remoteCommands=[],remoteHelpers=[];for(const entry of commands)if(commandMissing.has(entry.path))remoteCommands.push(await commandService.readRemote(entry.path));for(const entry of helperItems)if(helperMissing.has(entry.path))remoteHelpers.push(await helperService.readRemote(entry.path));const merged=mergeRemoteMissing(snapshot,{commands:remoteCommands,helperItems:remoteHelpers});await persist(merged.snapshot);return{settings,addedCommands:merged.addedCommands.length,addedHelperCommands:merged.addedHelpers.filter((record)=>record.item.kind===deps.HELPER_LIBRARY_KINDS.COMMAND).length,addedPrompts:merged.addedHelpers.filter((record)=>record.item.kind===deps.HELPER_LIBRARY_KINDS.PROMPT).length,inventoryBefore:inventory,...uiState()};});}

    async function saveRepositoryEntity(reference){return repositoryLock.run('Save item to GitHub',async()=>{const{commandService,helperService,settings}=await makeServices();const type=String(reference?.type||'');let result,next;if(type==='planning-command'){const record=memory.commandById.get(String(reference.id||''));if(!record)throw new Error(`Local planning command not found: ${reference?.id||'<empty>'}`);result=await commandService.save(record.definition);next={...snapshot,planningCommands:memory.commandRecords.map((entry)=>entry.path===record.path?deps.normalizeCommandRecord({...entry,rawContent:result.rawContent,repositoryKnown:true,repositoryTracked:true,repositorySha:result.sha}):entry)};}else if(type==='helper'){const key=`${reference?.kind}:${reference?.id}`;const record=memory.helperByKey.get(key);if(!record)throw new Error(`Local helper item not found: ${key}`);result=await helperService.save(record.item);next={...snapshot,helperItems:memory.helperRecords.map((entry)=>entry.path===record.path?deps.normalizeHelperRecord({...entry,rawContent:result.rawContent,repositoryKnown:true,repositoryTracked:true,repositorySha:result.sha}):entry)};}else throw new TypeError(`Unsupported repository entity type: ${type||'<empty>'}`);return persistVerifiedRepositoryResult(persist,next,result,settings,uiState);});}

    async function getRecoveryRequest(){const settings=await deps.loadRepositorySettings();return deps.buildRecoveryRequest(settings);}
    async function loadSettings(){return{settings:await deps.loadRepositorySettings(),token:await deps.loadGitHubToken()};}
    async function saveSettings(settings,token){return repositoryLock.run('Save repository settings',async()=>{const previous=await deps.loadRepositorySettings();const candidate=deps.validateRepositorySettings(settings);const sourceChanged=repositorySettingsKey(previous)!==repositorySettingsKey(candidate);if(sourceChanged)await persist(clearRepositoryEvidence(snapshot));await deps.saveGitHubToken(token);await deps.saveRepositorySettings(candidate);return{sourceChanged,...uiState()};});}

    const ui=deps.createPlanningHelperUi({surfaces:deps.SURFACES,directionDefinitions:deps.DIRECTION_DEFINITIONS,...uiState(),position:deps.readPanelPosition(),onSavePosition:deps.savePanelPosition,onInsert:(text,success,id)=>insertWithClipboard(text,success,id),onCopy:deps.copyText,onPreviewChatImport:(text,mode)=>previewChatImport(snapshot,text,mode),onApplyChatImport:applyChatText,onGetRecoveryRequest:getRecoveryRequest,onSaveLocalCommandDefinition:saveLocalCommandDefinition,onDeleteLocalCommand:deleteLocalCommand,onDeleteLocalUseCase:deleteLocalUseCase,onToggleFavoriteCommand:toggleFavoriteCommand,onToggleFavoriteUseCase:toggleFavoriteUseCase,onReloadRepositoryCommand:reloadRepositoryCommand,onSaveLocalLibraryItem:saveLocalLibraryItem,onDeleteLocalLibraryItem:deleteLocalLibraryItem,onCheckRepository:checkRepository,onSyncMissingRepository:syncMissingRepository,onSaveRepositoryEntity:saveRepositoryEntity,onLoadSettings:loadSettings,onSaveSettings:saveSettings,startupWarnings});
    function dispose(){ui?.dispose();if(globalThis[INSTANCE_DISPOSE_KEY]===dispose)delete globalThis[INSTANCE_DISPOSE_KEY];for(const key of LEGACY_DISPOSE_KEYS)if(globalThis[key]===dispose)delete globalThis[key];}
    globalThis[INSTANCE_DISPOSE_KEY]=dispose;
    return{dispose,getSnapshot:()=>snapshot,getDefinitions:()=>memory.commandRecords.map((record)=>record.definition),getLocalLibrary:()=>memory.helperRecords.map((record)=>record.item),previewChatImport:(text,mode)=>previewChatImport(snapshot,text,mode),applyChatImport:applyChatText,saveLocalCommandDefinition,deleteLocalCommand,deleteLocalUseCase,toggleFavoriteCommand,toggleFavoriteUseCase,reloadRepositoryCommand,checkRepository,syncMissingRepository,saveRepositoryEntity,getRepositoryOperation:()=>repositoryLock.active()};
  }

  return{startPlanningHelper,createRepositoryOperationLock,materializeSnapshot,mergeChatImport,previewChatImport,compareRepositoryInventory,mergeRemoteMissing,prepareLocalCommandSave,deleteLocalCommandFromSnapshot,deleteLocalUseCaseFromSnapshot,toggleFavoriteCommandInSnapshot,toggleFavoriteUseCaseInSnapshot,prepareLocalHelperSave,clearRepositoryEvidence,persistVerifiedRepositoryResult,insertWithClipboard};
});
