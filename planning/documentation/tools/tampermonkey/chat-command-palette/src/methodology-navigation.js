(function (root, factory) {
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  root.ObsPlanningHelper=Object.assign(root.ObsPlanningHelper||{},api);
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';

  const VIEW_IDS=Object.freeze({ALL:'ALL',GENERAL:'GENERAL',USE_CASES:'USE_CASES',TARGET_MODULES:'TARGET_MODULES',LENSES:'LENSES',TOOLS:'TOOLS'});
  const VIEW_META=Object.freeze({
    GENERAL:{label:'General',order:0},USE_CASES:{label:'Use Cases',order:10},TARGET_MODULES:{label:'Target Modules',order:20},LENSES:{label:'Lenses',order:30},TOOLS:{label:'Tools / Repository',order:40}
  });
  function kindLabelFor(entry){if(entry?.semanticKind==='USE_CASE')return`${entry.semanticScope||'Core'} UC`;if(entry?.semanticKind==='TARGET_MODULE')return`${entry.semanticScope||'Core'} TM`;if(entry?.semanticKind==='LENS')return`${entry.semanticScope||'Core'} Lens`;if(entry?.commandCategory==='TOOL')return'Tool';return'General';}
  function semanticNavigation(entry){
    const group=entry?.presentationGroup;if(group){const viewId=String(group.viewId||'').toUpperCase(),meta=VIEW_META[viewId]||{label:viewId||'General',order:90};return{viewId,viewLabel:meta.label,viewOrder:meta.order,sectionId:String(group.id||'UNGROUPED'),sectionLabel:String(group.label||'Other / Ungrouped'),sectionOrder:Number(group.order)||0,itemOrder:Number(group.itemOrder)||0,kindLabel:kindLabelFor(entry)};}
    if(entry?.semanticKind==='USE_CASE')return{viewId:VIEW_IDS.USE_CASES,viewLabel:'Use Cases',viewOrder:10,sectionId:String(entry.semanticScope||'Core').toUpperCase(),sectionLabel:entry.semanticScope||'Core',sectionOrder:entry.semanticScope==='Documentation'?0:10,itemOrder:Number(entry.semanticOrder)||0,kindLabel:`${entry.semanticScope||'Core'} UC`};
    if(entry?.semanticKind==='TARGET_MODULE')return{viewId:VIEW_IDS.TARGET_MODULES,viewLabel:'Target Modules',viewOrder:20,sectionId:String(entry.semanticScope||'Core').toUpperCase(),sectionLabel:entry.semanticScope==='SDS'?'Profile · SDS':'IDTSPE Core',sectionOrder:entry.semanticScope==='Core'?0:10,itemOrder:Number(entry.semanticOrder)||0,kindLabel:`${entry.semanticScope||'Core'} TM`};
    if(entry?.semanticKind==='LENS')return{viewId:VIEW_IDS.LENSES,viewLabel:'Lenses',viewOrder:30,sectionId:String(entry.semanticScope||'Core').toUpperCase(),sectionLabel:entry.semanticScope==='SDS'?'Profile · SDS':'IDTSPE Core',sectionOrder:entry.semanticScope==='Core'?0:10,itemOrder:Number(entry.semanticOrder)||0,kindLabel:`${entry.semanticScope||'Core'} Lens`};
    if(entry?.commandCategory==='TOOL')return{viewId:VIEW_IDS.TOOLS,viewLabel:'Tools / Repository',viewOrder:40,sectionId:'TOOLS',sectionLabel:'Tools / Repository',sectionOrder:0,itemOrder:0,kindLabel:'Tool'};
    return{viewId:VIEW_IDS.GENERAL,viewLabel:'General',viewOrder:0,sectionId:'GENERAL',sectionLabel:'General',sectionOrder:0,itemOrder:0,kindLabel:'General'};
  }
  // Compatibility fallbacks are read-only: imported legacy records may still expose helperPresentation,
  // while current navigation is derived from semantic identity plus repository-backed presentation groups.
  function legacyPresentation(entry){return entry?.helperPresentation||entry?.definition?.helperPresentation||null;}
  function primaryNavigation(entry){return entry?.semanticKind||entry?.commandCategory?semanticNavigation(entry):(legacyPresentation(entry)?.navigation||semanticNavigation(entry));}
  function relatedNavigation(){return[];}
  function allNavigationRows(entries){return(entries||[]).filter((entry)=>entry?.palette!==false).map((entry)=>({entry,nav:primaryNavigation(entry),related:false}));}
  function methodologyViewDefinitions(entries){const rows=allNavigationRows(entries),counts=new Map();for(const row of rows)counts.set(row.nav.viewId,(counts.get(row.nav.viewId)||0)+1);return Object.entries(VIEW_META).filter(([id])=>counts.has(id)).map(([id,meta])=>({id,label:meta.label,order:meta.order,count:counts.get(id)||0})).sort((a,b)=>a.order-b.order);}
  function methodologyPrimaryIds(entries,viewId){return allNavigationRows(entries).filter((row)=>row.nav.viewId===viewId).map((row)=>row.entry.id);}
  function methodologyRelatedIds(){return[];}
  function buildMethodologyViewGroups(entries,viewId){const sectionMap=new Map();for(const row of allNavigationRows(entries).filter((item)=>item.nav.viewId===viewId)){const nav=row.nav,key=nav.sectionId;if(!sectionMap.has(key))sectionMap.set(key,{id:key,label:nav.sectionLabel,order:Number(nav.sectionOrder)||0,entries:[]});sectionMap.get(key).entries.push({...row.entry,__methodologyNav:{...nav,viewId,sectionId:key,related:false}});}const sections=[...sectionMap.values()].sort((a,b)=>a.order-b.order||a.label.localeCompare(b.label));for(const section of sections)section.entries.sort((a,b)=>(Number(a.__methodologyNav?.itemOrder)||0)-(Number(b.__methodologyNav?.itemOrder)||0)||String(a.label||a.id).localeCompare(String(b.label||b.id)));return sections.filter((section)=>section.entries.length);}
  function normalizeSelectedGroupIds(groups,selected){const keys=(groups||[]).map((group)=>String(group.id)),allowed=new Set(keys),values=Array.isArray(selected)?[...new Set(selected.map(String).filter((id)=>allowed.has(id)))]:[];return !values.length||values.length===keys.length?null:values;}
  function toggleSelectedGroupId(groups,selected,id){const keys=(groups||[]).map((group)=>String(group.id)),key=String(id||'');if(!keys.includes(key))return normalizeSelectedGroupIds(groups,selected);if(!Array.isArray(selected))return[key];const next=new Set(normalizeSelectedGroupIds(groups,selected)||[]);if(next.has(key))next.delete(key);else next.add(key);return normalizeSelectedGroupIds(groups,[...next]);}
  function filterGroupsBySelection(groups,selected){const normalized=normalizeSelectedGroupIds(groups,selected);if(!normalized)return[...(groups||[])];const keep=new Set(normalized);return(groups||[]).filter((group)=>keep.has(String(group.id)));}
  function buildAllMethodologyGroups(entries){const views=methodologyViewDefinitions(entries),groups=[];for(const view of views)for(const group of buildMethodologyViewGroups(entries,view.id))groups.push({...group,id:`${view.id}::${group.id}`,sourceGroupId:group.id,viewId:view.id,viewLabel:view.label,order:view.order*1000+group.order});return groups.sort((a,b)=>a.order-b.order||a.label.localeCompare(b.label));}

  return{METHODOLOGY_VIEW_IDS:VIEW_IDS,semanticNavigation,methodologyViewDefinitions,methodologyPrimaryIds,methodologyRelatedIds,buildMethodologyViewGroups,buildAllMethodologyGroups,normalizeSelectedGroupIds,toggleSelectedGroupId,filterGroupsBySelection};
});
