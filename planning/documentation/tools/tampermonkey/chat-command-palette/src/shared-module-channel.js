(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  root.ObsPlanningHelper=Object.assign(root.ObsPlanningHelper||{},api);
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const CHANNEL='fortis-shared-helper-text-modules-v1';
  const ID=/^[a-z0-9][a-z0-9._-]{0,79}$/;
  let running=null;
  function projectItems(snapshot,kind){
    const items=(snapshot?.helperItems||[]).map(record=>record?.item||record)
      .filter(m=>m?.kind===kind&&typeof m.id==='string'&&ID.test(m.id)&&
        typeof m.title==='string'&&typeof m.text==='string')
      .map(m=>({id:m.id,title:m.title,text:m.text,updatedAt:m.updatedAt||''}));
    if(items.length>2000||items.some(m=>m.title.length>300||m.text.length>100000)||
       new Set(items.map(m=>m.id)).size!==items.length||
       items.reduce((n,m)=>n+m.text.length,0)>600000)
      throw new Error('Shared module catalog exceeds safe limits');
    return items;
  }
  function projectModules(snapshot){return projectItems(snapshot,'module');}
  function projectPrompts(snapshot){return projectItems(snapshot,'prompt');}
  function createHelperModuleChannel({readSnapshot,Channel=typeof BroadcastChannel==='function'?BroadcastChannel:null}={}){
    if(!Channel||typeof readSnapshot!=='function')return null;
    const channel=new Channel(CHANNEL);
    let stopped=false;
    let reads=Promise.resolve();
    async function publish(){
      if(stopped)return;
      // Serializes GM-backed snapshot reads to avoid publishing stale catalog.
      reads=reads.catch(()=>{}).then(async()=>{
        const snapshot=await readSnapshot();
        if(stopped||!snapshot)return;
        channel.postMessage({protocol:CHANNEL,type:'catalog',modules:projectModules(snapshot),prompts:projectPrompts(snapshot)});
      });
      try{await reads;}catch(e){/* do not interfere with verified Helper writes */}
    }
    const listener=event=>{
      if(event?.data?.protocol===CHANNEL&&event.data.type==='request')void publish();
    };
    if(typeof channel.addEventListener==='function')channel.addEventListener('message',listener);
    else channel.onmessage=listener;
    return {publish,close(){
      stopped=true;
      channel.close?.();
    }};
  }
  function startSharedModuleChannel(readSnapshot){
    if(running)return running;
    running=createHelperModuleChannel({readSnapshot});
    void running?.publish();
    return running;
  }
  function publishSharedModuleCatalog(){void running?.publish();}
  return {SHARED_MODULE_CHANNEL:CHANNEL,projectModules,projectPrompts,createHelperModuleChannel,
    startSharedModuleChannel,publishSharedModuleCatalog};
});
