(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  root.ObsPlanningHelper=Object.assign(root.ObsPlanningHelper||{},api);
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const KEY='obsPlanningHelper:v1:rdgCommandCatalog';
  const URL='https://raw.githubusercontent.com/AlexPastukhh/rd-graphs/main/kit/helper-commands/catalog.json';
  const ID=/^rdg\.lens\.([a-z][a-z0-9-]{0,79})$/;
  const DIGEST=/^[0-9a-f]{64}$/;
  const SECRET=/(?:ghp_[A-Za-z0-9]{20}|Bearer\s+[A-Za-z0-9._~+/-]{16}|-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY)/i;
  function validateRdgCommandCatalog(value){
    if(!value||value.schemaVersion!==1||value.kind!=='rdg-chat-launcher-commands'||
       value.complete!==true||!DIGEST.test(value.catalogRevision||'')||
       !Array.isArray(value.commands)||value.commands.length<1||value.commands.length>250)
      throw new Error('RDG command catalog is incomplete or incompatible; previous cache retained');
    const ids=new Set(),keys=new Set(),commands=[];
    for(const raw of value.commands){
      if(!raw||typeof raw!=='object'||Array.isArray(raw))throw new Error('Invalid RDG command');
      const match=typeof raw.id==='string'?ID.exec(raw.id):null;
      const ref=raw.lensRef;
      if(!match||ids.has(raw.id)||Object.keys(raw).length!==6||Object.keys(raw).some(k=>!['id','kind','title','description','lensRef','insertText'].includes(k))||!ref||typeof ref!=='object'||Array.isArray(ref)||Object.keys(ref).length!==3||Object.keys(ref).some(k=>!['role','lensKey','modelProfile'].includes(k))||ref.role!=='lens'||ref.lensKey!==match[1]||
        ref.modelProfile!=='rdg-decision-v1'||keys.has(match[1])||raw.kind!=='lens-launcher')
        throw new Error('Duplicate or invalid RDG command reference');
      for(const [field,max] of [['title',300],['description',1200],['insertText',5000]]){
        if(typeof raw[field]!=='string'||!raw[field].trim()||raw[field].length>max||SECRET.test(raw[field]))
          throw new Error('Invalid RDG command field: '+field);
      }
      if(!raw.insertText.includes('rdg-agent.py lens --lens '+match[1]))
        throw new Error('RDG command does not specify supported lens read');
      ids.add(raw.id);keys.add(match[1]);
      commands.push({id:raw.id,kind:raw.kind,title:raw.title,
        description:raw.description,lensRef:{role:ref.role,lensKey:ref.lensKey,modelProfile:ref.modelProfile},insertText:raw.insertText});
    }
    return {schemaVersion:1,kind:value.kind,complete:true,
      catalogRevision:value.catalogRevision,commands};
  }
  function currentStorage(){
    if(typeof GM_getValue!=='function'||typeof GM_setValue!=='function')
      throw new Error('Tampermonkey GM storage is unavailable');
    return {get:(key)=>GM_getValue(key,null),set:(key,value)=>GM_setValue(key,value)};
  }
  function rdgCommandRequest(url=URL){
    return new Promise((resolve,reject)=>{
      if(typeof GM_xmlhttpRequest!=='function'){reject(new Error('Tampermonkey HTTP grant unavailable'));return;}
      GM_xmlhttpRequest({
        method:'GET',url:url+'?refresh='+Date.now(),anonymous:true,timeout:15000,
        headers:{Accept:'application/json','Cache-Control':'no-cache'},
        onload:r=>r.status===200?resolve(r.responseText):reject(new Error('RDG catalog HTTP '+r.status)),
        onerror:()=>reject(new Error('RDG catalog request failed')),
        ontimeout:()=>reject(new Error('RDG catalog request timed out'))
      });
    });
  }
  async function loadRdgCommandCache(storage=currentStorage()){
    try{
      const value=await storage.get(KEY);
      if(!value||typeof value!=='object'||typeof value.savedAt!=='string')return null;
      return {...validateRdgCommandCatalog(value),savedAt:value.savedAt};
    }catch(_){return null;}
  }
  async function refreshRdgCommandCache(storage=currentStorage(),request=rdgCommandRequest){
    const payload=await request();
    const parsed=typeof payload==='string'?JSON.parse(payload):payload;
    const fresh={...validateRdgCommandCatalog(parsed),savedAt:new Date().toISOString()};
    await storage.set(KEY,fresh);
    const stored=await loadRdgCommandCache(storage);
    if(!stored||JSON.stringify(stored)!==JSON.stringify(fresh))
      throw new Error('RDG cache save verification failed');
    return stored;
  }
  async function initializeRdgCommandCache(storage=currentStorage(),request=rdgCommandRequest){
    return await loadRdgCommandCache(storage)||await refreshRdgCommandCache(storage,request);
  }
  return {RDG_COMMAND_CATALOG_URL:URL,RDG_COMMAND_CACHE_KEY:KEY,
    validateRdgCommandCatalog,loadRdgCommandCache,refreshRdgCommandCache,
    initializeRdgCommandCache,rdgCommandRequest};
});
