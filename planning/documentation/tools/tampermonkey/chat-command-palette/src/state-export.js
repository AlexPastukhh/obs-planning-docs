(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  root.ObsPlanningHelper=Object.assign(root.ObsPlanningHelper||{},api);
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const START='[OBS_PLANNING_HELPER_STATE]',END='[/OBS_PLANNING_HELPER_STATE]';
  const SAFE_SNAPSHOT_KEYS=['schemaVersion','commandCacheSchemaVersion','savedAt','planningCommands','helperItems',
    'useCases','useCaseCatalogSha','semanticComponents','semanticComponentCatalogSha','scenarios',
    'scenarioCatalogSha','catalogOrder','catalogOrderSha','suppressedRepository','favoriteCommandIds','favoriteUseCaseIds'];
  function inventory(snapshot,settings){
    const s=snapshot||{},order=s.catalogOrder||{},helpers=s.helperItems||[],commands=s.planningCommands||[];
    const members=new Map();for(const group of order.promptGroups||[])for(const id of group.items||[])members.set(id,group.id);
    const prompts=helpers.filter(r=>r.item?.kind==='prompt').map(r=>({
      id:r.item.id,title:r.item.title,group:members.get(`helper-library:prompt:${r.item.id}`)||'ungrouped',
      pending:!r.repositoryKnown,repositorySha:r.repositorySha||null,chars:(r.item.text||'').length,
      updatedAt:r.item.updatedAt||null
    }));
    const modules=helpers.filter(r=>r.item?.kind==='module').map(r=>({id:r.item.id,title:r.item.title,
      pending:!r.repositoryKnown,repositorySha:r.repositorySha||null,chars:(r.item.text||'').length}));
    const helperCommands=helpers.filter(r=>r.item?.kind==='command').map(r=>({id:r.item.id,title:r.item.title,pending:!r.repositoryKnown}));
    const commandEntries=commands.map(r=>({id:r.definition?.id,path:r.path,pending:!r.repositoryKnown}));
    const pending={commands:commandEntries.filter(r=>r.pending).length,prompts:prompts.filter(r=>r.pending).length,
      modules:modules.filter(r=>r.pending).length,helperCommands:helperCommands.filter(r=>r.pending).length,
      catalogOrder:!s.catalogOrderSha};
    const groups=(order.promptGroups||[]).map(g=>({id:g.id,label:g.label,promptIds:(g.items||[]).slice()}));
    const owner=String(settings?.owner||''),repo=String(settings?.repo||''),branch=String(settings?.branch||'');
    return{repository:{owner,repo,branch},localSnapshotSavedAt:s.savedAt||null,snapshotSchemaVersion:s.schemaVersion||null,
      counts:{prompts:prompts.length,modules:modules.length,helperCommands:helperCommands.length,
        commands:commandEntries.length,scenarios:(s.scenarios||[]).length,useCases:(s.useCases||[]).length,
        semanticComponents:(s.semanticComponents||[]).length,promptGroups:groups.length},
      pending,repositoryOrderSha:s.catalogOrderSha||null,groups,prompts,modules,helperCommands,
      commands:commandEntries,scenarios:(s.scenarios||[]).map(x=>({id:x.id,title:x.title})),
      useCases:(s.useCases||[]).map(x=>({id:x.id,label:x.label})),
      semanticComponents:(s.semanticComponents||[]).map(x=>({id:x.id,kind:x.kind,label:x.label})),
      favoriteCommandIds:[...(s.favoriteCommandIds||[])],favoriteUseCaseIds:[...(s.favoriteUseCaseIds||[])],
      suppressedRepository:s.suppressedRepository||{}};
  }
  function exportPlanningHelperState(snapshot,settings,mode='summary'){
    if(!['summary','full'].includes(mode))throw new TypeError('Unknown state export mode.');
    const state=inventory(snapshot,settings);
    const result={exportVersion:1,mode,generatedAt:new Date().toISOString(),...state};
    if(mode==='full'){
      // The token is stored under a separate GM key. Explicitly copy only state
      // fields: do not copy arbitrary keys or credentials into the export.
      result.localSnapshot=Object.fromEntries(SAFE_SNAPSHOT_KEYS.filter(k=>
        Object.prototype.hasOwnProperty.call(snapshot||{},k)).map(k=>[k,snapshot[k]]));
    }
    return `${START}\n${JSON.stringify(result,null,mode==='full'?0:2)}\n${END}`;
  }
  return{exportPlanningHelperState,inventoryPlanningHelperState:inventory};
});
