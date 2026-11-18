(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  root.ObsPlanningHelper=Object.assign(root.ObsPlanningHelper||{},api);
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';

  // V2 has an independent key; never mistake an existing V1 lens-only cache for
  // a complete general command catalog. Existing OBS local state is untouched.
  const KEY='obsPlanningHelper:v2:rdgCommandCatalog';
  const URL='https://raw.githubusercontent.com/AlexPastukhh/rd-graphs/main/kit/helper-commands/catalog-v2.json';
  const ID=/^rdg\.lens\.([a-z][a-z0-9-]{0,79})$/;
  const COMMAND_ID=/^rdg\.command\.[a-z][a-z0-9-]{0,79}$/;
  const GROUP_ID=/^[a-z][a-z0-9-]{0,79}$/;
  const DIGEST=/^[0-9a-f]{64}$/;
  const SECRET=/(?:ghp_[A-Za-z0-9]{20}|Bearer\s+[A-Za-z0-9._~+/-]{16}|-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY)/i;
  const KINDS=new Set(['lens-launcher','workflow','instruction']);
  function exactFields(value,fields){
    return value&&typeof value==='object'&&!Array.isArray(value)&&
      Object.keys(value).length===fields.length&&Object.keys(value).every(field=>fields.includes(field));
  }
  function nonsecret(value,max){
    return typeof value==='string'&&!!value.trim()&&value.length<=max&&!SECRET.test(value);
  }
  function validateRdgCommandCatalog(value){
    if(!exactFields(value,['schemaVersion','kind','complete','catalogRevision','groups','commands'])||
       value.schemaVersion!==2||value.kind!=='rdg-chat-commands'||value.complete!==true||
       !DIGEST.test(value.catalogRevision||'')||!Array.isArray(value.groups)||
       value.groups.length<1||value.groups.length>30||!Array.isArray(value.commands)||
       value.commands.length<1||value.commands.length>250)
      throw new Error('RDG v2 command catalog is incomplete or incompatible; previous cache retained');
    const groupIds=new Set(),groups=[];
    for(const raw of value.groups){
      if(!exactFields(raw,['id','title','description'])||
         typeof raw.id!=='string'||!GROUP_ID.test(raw.id)||groupIds.has(raw.id)||
         !nonsecret(raw.title,160)||!nonsecret(raw.description,500))
        throw new Error('Invalid RDG command group');
      groupIds.add(raw.id);
      groups.push({id:raw.id,title:raw.title,description:raw.description});
    }
    const ids=new Set(),lensKeys=new Set(),commands=[];
    for(const raw of value.commands){
      if(!exactFields(raw,['id','kind','title','description','groupId','lensRefs','insertText'])||
         typeof raw.id!=='string'||ids.has(raw.id)||!KINDS.has(raw.kind)||
         !groupIds.has(raw.groupId)||!nonsecret(raw.title,300)||
         !nonsecret(raw.description,1200)||!nonsecret(raw.insertText,8000)||
         !Array.isArray(raw.lensRefs)||raw.lensRefs.length>12)
        throw new Error('Invalid RDG command fields or group');
      const match=ID.exec(raw.id);
      const isLens=raw.kind==='lens-launcher';
      if(isLens?(!match||raw.lensRefs.length!==1):
        (!COMMAND_ID.test(raw.id)||(raw.kind==='workflow'&&raw.lensRefs.length<1)))
        throw new Error('Invalid RDG command kind or identity');
      const refs=[],seenRefs=new Set();
      for(const ref of raw.lensRefs){
        if(!exactFields(ref,['role','lensKey','modelProfile'])||
           ref.role!=='lens'||typeof ref.lensKey!=='string'||!GROUP_ID.test(ref.lensKey)||
           ref.modelProfile!=='rdg-decision-v1'||seenRefs.has(ref.lensKey)||
           !raw.insertText.includes('rdg-agent.py lens --lens '+ref.lensKey))
          throw new Error('Invalid RDG command lens reference');
        refs.push({role:ref.role,lensKey:ref.lensKey,modelProfile:ref.modelProfile});
        seenRefs.add(ref.lensKey);
      }
      if(isLens){
        if(refs[0].lensKey!==match[1]||lensKeys.has(match[1]))
          throw new Error('Duplicate or mismatched RDG lens launcher');
        lensKeys.add(match[1]);
      }
      ids.add(raw.id);
      commands.push({id:raw.id,kind:raw.kind,title:raw.title,description:raw.description,
        groupId:raw.groupId,lensRefs:refs,insertText:raw.insertText});
    }
    return {schemaVersion:2,kind:value.kind,complete:true,
      catalogRevision:value.catalogRevision,groups,commands};
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
      const {savedAt,...manifest}=value;
      return {...validateRdgCommandCatalog(manifest),savedAt};
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
