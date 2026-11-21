(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  root.ObsPlanningHelper=Object.assign(root.ObsPlanningHelper||{},api);
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';

  const ORIGIN='http://localhost:18880';
  const KEY='obsPlanningHelper:rdgLiveCommandCatalog';
  const REQUEST_PREFIX=KEY+':request:';
  const REQUEST_TIMEOUT=30000;
  const UUID=/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/;
  const SESSION=/^\/session\/([A-Za-z0-9_-]{43})\/$/;
  const ID=/^[a-z][a-z0-9-]{0,79}$/;
  const COMMAND_ID=/^rdg\.command\.[a-z][a-z0-9-]{0,79}$/;
  const SECRET=/(?:ghp_[A-Za-z0-9]{20}|Bearer\s+[A-Za-z0-9._~+/-]{16}|-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY|rdg_[A-Za-z0-9_-]{40,100})/i;
  const KINDS=new Set(['lens-launcher','workflow','instruction']);
  function exactFields(value,fields){
    return value&&typeof value==='object'&&!Array.isArray(value)&&
      Object.keys(value).length===fields.length&&fields.every(field=>Object.hasOwn(value,field));
  }
  function safeText(value,max,multiline=false){
    const controls=multiline?/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/:/[\x00-\x1f\x7f]/;
    return typeof value==='string'&&!!value.trim()&&Array.from(value).length<=max&&
      !SECRET.test(value)&&!controls.test(value);
  }
  function identifier(value){
    return typeof value==='string'&&ID.test(value);
  }
  function validateRdgCommandCatalog(value){
    if(!exactFields(value,['schemaVersion','namespaceId','complete','revision','groups','commands'])||
       value.schemaVersion!==1||value.complete!==true||typeof value.namespaceId!=='string'||
       !UUID.test(value.namespaceId)||!Number.isSafeInteger(value.revision)||value.revision<0||
       !Array.isArray(value.groups)||value.groups.length>30||
       !Array.isArray(value.commands)||value.commands.length>250||
       (value.revision===0&&(value.groups.length||value.commands.length)))
      throw new Error('Ответ каталога RDG неполный или несовместимый.');

    const groupIds=new Set();
    for(const group of value.groups){
      if(!exactFields(group,['id','title','description'])||
         !identifier(group.id)||['all','ungrouped'].includes(group.id)||groupIds.has(group.id)||
         !safeText(group.title,160)||!safeText(group.description,500,true))
        throw new Error('Некорректная группа команд RDG.');
      groupIds.add(group.id);
    }

    const commandIds=new Set();
    for(const command of value.commands){
      if(!exactFields(command,['id','kind','title','description','groupId','lensRefs','insertText'])||
         typeof command.id!=='string'||commandIds.has(command.id)||!KINDS.has(command.kind)||
         (command.groupId!==null&&!groupIds.has(command.groupId))||
         !safeText(command.title,300)||!safeText(command.description,1200,true)||
         !safeText(command.insertText,8000,true)||!Array.isArray(command.lensRefs)||command.lensRefs.length>12)
        throw new Error('Некорректная команда RDG.');
      const keys=new Set();
      for(const ref of command.lensRefs){
        if(!exactFields(ref,['role','lensKey','modelProfile'])||ref.role!=='lens'||
           ref.modelProfile!=='rdg-decision-v1'||!identifier(ref.lensKey)||keys.has(ref.lensKey))
          throw new Error('Некорректная ссылка на линзу RDG.');
        keys.add(ref.lensKey);
      }
      const validKind=command.kind==='lens-launcher'?
        keys.size===1&&command.id==='rdg.lens.'+command.lensRefs[0].lensKey:
        COMMAND_ID.test(command.id)&&(command.kind==='instruction'||keys.size>0);
      if(!validKind)throw new Error('Некорректный тип или идентификатор команды RDG.');
      commandIds.add(command.id);
    }
    return value;
  }

  const EDIT_OPS=new Set(['group_create','group_edit','group_move','group_delete',
    'command_create','command_edit','command_move','command_delete']);
  function validMutation(value){
    return exactFields(value,['namespaceId','revision','steps'])&&typeof value.namespaceId==='string'&&
      UUID.test(value.namespaceId)&&Number.isSafeInteger(value.revision)&&value.revision>0&&
      Array.isArray(value.steps)&&value.steps.length>0&&value.steps.length<=100&&
      value.steps.every(step=>step&&EDIT_OPS.has(step.op));
  }

  function currentStorage(){
    if(typeof GM_getValue!=='function'||typeof GM_setValue!=='function'||
       typeof GM_deleteValue!=='function'||typeof GM_addValueChangeListener!=='function'||
       typeof GM_removeValueChangeListener!=='function'||typeof GM_openInTab!=='function')
      throw new Error('Обновите разрешения в шапке Tampermonkey Local Loader и перезагрузите страницу.');
    return {
      get:key=>GM_getValue(key,null),
      set:(key,value)=>GM_setValue(key,value),
      remove:key=>GM_deleteValue(key),
      listen:(key,callback)=>{
        const listener=GM_addValueChangeListener(key,(_key,_before,after,remote)=>{
          if(remote)callback(after);
        });
        return ()=>GM_removeValueChangeListener(listener);
      }
    };
  }

  async function rdgCommandRequest({
    storage=currentStorage(),
    openTab=url=>GM_openInTab(url,{active:true}),
    requestId=globalThis.crypto.randomUUID(),
    timeoutMs=REQUEST_TIMEOUT,mutation=null
  }={}){
    const key=REQUEST_PREFIX+requestId;
    if(mutation!==null&&!validMutation(mutation))throw new Error('Некорректный запрос редактирования каталога RDG.');
    await storage.set(key,{expiresAt:Date.now()+timeoutMs,...(mutation?{mutation}:{})});
    let tab,timer,unlisten,completed=false;
    try{
      const response=await new Promise((resolve,reject)=>{
        unlisten=storage.listen(key,result=>{
          if(result?.ok===true||result?.ok===false)resolve(result);
        });
        const timeoutMessage=mutation?
          'Ответ на запись RDG не получен. Обновите каталог, чтобы проверить результат перед повтором.':
          'RDG не ответил. Войдите во вкладке RDG и повторите обновление.';
        timer=setTimeout(()=>reject(new Error(timeoutMessage)),timeoutMs);
        tab=openTab(ORIGIN+'/#obs-helper-catalog='+requestId);
        if(!tab)throw new Error('Tampermonkey не смог открыть вкладку RDG.');
      });
      completed=true;
      if(!response.ok)throw new Error(response.message);
      return response.catalog;
    }finally{
      clearTimeout(timer);
      unlisten?.();
      if(completed)tab?.close();
      await storage.remove(key);
    }
  }

  async function serveRdgCatalogRequest({url=location.href,storage=currentStorage(),fetchCatalog=fetch}={}){
    const page=new URL(url);
    const session=SESSION.exec(page.pathname);
    const requestId=page.hash.slice('#obs-helper-catalog='.length);
    if(page.origin!==ORIGIN||!session||!page.hash.startsWith('#obs-helper-catalog=')||!UUID.test(requestId))
      return;
    const key=REQUEST_PREFIX+requestId;
    const pending=await storage.get(key);
    if(!Number.isFinite(pending?.expiresAt)||pending.expiresAt<=Date.now())return;
    const request=async message=>{
      const response=await fetchCatalog(new URL('command',page).href,{
        method:'POST',credentials:'same-origin',mode:'same-origin',cache:'no-store',redirect:'error',
        headers:{'Content-Type':'application/json','X-RDG-Session':session[1]},
        body:JSON.stringify(message)
      });
      if(!response.ok){
        let code='';
        try{
          const data=await response.json();
          if(typeof data.error==='string'&&/^[A-Z][A-Z0-9_ ]{0,150}$/.test(data.error))code=' · '+data.error;
        }catch(_){}
        throw new Error('RDG API · HTTP '+response.status+code);
      }
      return response.json();
    };
    let reply;
    try{
      const mutation=pending.mutation;
      const catalog=mutation===undefined?await request({method:'chat_catalog'}):
        await applyCatalogEdit(request,mutation);
      reply={ok:true,catalog:validateRdgCommandCatalog(catalog)};
    }catch(error){
      const message=error?.message||'';
      reply={ok:false,message:message.startsWith('RDG API · ')||message.startsWith('Каталог RDG ')?message:
        'Не удалось выполнить запрос через браузерную сессию RDG.'};
    }
    if(pending.expiresAt>Date.now()&&(await storage.get(key))?.expiresAt===pending.expiresAt)
      await storage.set(key,reply);
  }

  async function applyCatalogEdit(request,mutation){
    if(!validMutation(mutation))throw new Error('Каталог RDG отклонил запрос редактирования.');
    const catalog=validateRdgCommandCatalog(await request({method:'chat_catalog'}));
    if(catalog.namespaceId!==mutation.namespaceId||catalog.revision!==mutation.revision)
      throw new Error('Каталог RDG изменился. Обновите список и откройте редактор снова.');
    const schema=await request({method:'schema',op:'chat_catalog_edit'});
    const draft=schema.request;
    if(draft?.op!=='chat_catalog_edit'||draft.expectedCatalogRevision!==mutation.revision||
       typeof draft.transactionId!=='string'||!UUID.test(draft.transactionId))
      throw new Error('Каталог RDG изменился. Обновите список и откройте редактор снова.');
    const transaction={...draft,note:'Изменение команд и групп из Planning Helper',steps:mutation.steps};
    const preview=await request({method:'preflight',request:transaction});
    if(preview?.accepted!==false||!preview.inputBinding)
      throw new Error('Каталог RDG не подтвердил предварительную проверку.');
    const result=await request({method:'apply',request:transaction,expectedInputBinding:preview.inputBinding});
    if(result?.published!==true)
      throw new Error('Каталог RDG не подтвердил публикацию. Проверьте результат обновлением.');
    const receipt=await request({method:'receipt',transactionId:transaction.transactionId});
    if(receipt?.published!==true||!receipt.participants?.some(row=>row.owner?.kind==='chatCommandCatalog'))
      throw new Error('Каталог RDG не подтвердил квитанцию записи. Проверьте результат обновлением.');
    const latest=validateRdgCommandCatalog(await request({method:'chat_catalog'}));
    if(latest.namespaceId!==mutation.namespaceId||latest.revision<=mutation.revision)
      throw new Error('Каталог RDG не вернул сохранённую ревизию. Проверьте результат обновлением.');
    return latest;
  }

  function editRdgCommandCatalog(catalog,steps){
    const mutation={namespaceId:catalog.namespaceId,revision:catalog.revision,steps};
    return refreshRdgCommandCache(currentStorage(),()=>rdgCommandRequest({mutation}));
  }

  async function loadRdgCommandCache(storage=currentStorage()){
    try{
      const value=await storage.get(KEY);
      if(!value||typeof value.savedAt!=='string')return null;
      const {savedAt,...catalog}=value;
      return {...validateRdgCommandCatalog(catalog),savedAt};
    }catch(_){return null;}
  }
  async function refreshRdgCommandCache(storage=currentStorage(),request=rdgCommandRequest){
    const catalog=validateRdgCommandCatalog(await request());
    const previous=await loadRdgCommandCache(storage);
    if(previous?.namespaceId===catalog.namespaceId&&previous.revision>catalog.revision)return previous;
    const fresh={...catalog,savedAt:new Date().toISOString()};
    await storage.set(KEY,fresh);
    const saved=await loadRdgCommandCache(storage);
    if(saved?.namespaceId===fresh.namespaceId&&saved.revision>=fresh.revision)return saved;
    throw new Error('Не удалось подтвердить сохранение каталога RDG.');
  }
  return {RDG_BROWSER_ORIGIN:ORIGIN,RDG_COMMAND_CACHE_KEY:KEY,
    validateRdgCommandCatalog,loadRdgCommandCache,refreshRdgCommandCache,editRdgCommandCatalog,rdgCommandRequest,serveRdgCatalogRequest};
});
