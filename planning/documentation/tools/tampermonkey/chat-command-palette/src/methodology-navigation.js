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
