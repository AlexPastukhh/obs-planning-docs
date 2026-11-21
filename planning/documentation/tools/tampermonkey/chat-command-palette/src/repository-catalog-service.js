(function (root, factory) {
  const api=factory(typeof require==='function'?Object.assign({},require('./semantic-projections.js'),root.ObsPlanningHelper||{}):(root.ObsPlanningHelper||{}));
  if(typeof module==='object'&&module.exports)module.exports=api;
  root.ObsPlanningHelper=Object.assign(root.ObsPlanningHelper||{},api);
})(typeof globalThis!=='undefined'?globalThis:this,function(deps){
  'use strict';

  const USE_CASE_CATALOG_PATH='planning/documentation/tools/tampermonkey/chat-command-palette/seed/use-cases.json';
  const SEMANTIC_COMPONENT_CATALOG_PATH='planning/documentation/tools/tampermonkey/chat-command-palette/seed/semantic-components.json';
  const SCENARIO_CATALOG_PATH='planning/documentation/tools/tampermonkey/chat-command-palette/seed/scenarios.json';
  const CATALOG_ORDER_PATH='planning/documentation/tools/tampermonkey/chat-command-palette/catalog-order.json';
  const CATALOG_ORDER_KIND='planning-helper-catalog-order';
  const CATALOG_ORDER_SCHEMA_VERSION=6;

  function normalizeIdOrder(value,label){const result=[];for(const raw of Array.isArray(value)?value:[]){const id=String(raw||'').trim();if(!id)continue;if(/[\r\n\u0000-\u001f\u007f]/.test(id))throw new TypeError(`${label} contains unsafe id.`);if(!result.includes(id))result.push(id);}return result;}
  const LEGACY_COMMAND_CATEGORIES=[{"id":"GENERAL","label":"General","order":0},{"id":"IDTSPE_PASS","label":"IDTSPE Pass","order":10},{"id":"USE_CASES","label":"Use Cases","order":20},{"id":"TARGET_MODULES","label":"Target Modules","order":30},{"id":"LENSES","label":"Lenses","order":40},{"id":"TOOLS","label":"Tools / Repository","order":50}];
  function normalizeCommandCategory(value,index){
    const id=String(value?.id||'').trim().toUpperCase(),label=String(value?.label||'').trim();
    if(!/^[A-Z][A-Z0-9_-]*$/.test(id)||id==='ALL')throw new TypeError('Category requires a safe non-reserved id.');
    if(!label||/[\r\n\u0000-\u001f\u007f]/.test(label))throw new TypeError('Category requires a safe label.');
    return{id,label,order:Number.isFinite(Number(value.order))?Number(value.order):index*10};
  }
  function normalizeCommandGroup(value,index){const input=value&&typeof value==='object'?value:{},id=String(input.id||'').trim(),viewId=String(input.viewId||'').trim().toUpperCase(),label=String(input.label||'').trim();if(!id||/[\r\n\u0000-\u001f\u007f]/.test(id))throw new TypeError(`commandGroups[${index}] requires a safe id.`);if(!/^[A-Z][A-Z0-9_-]*$/.test(viewId))throw new TypeError(`commandGroups[${index}] requires a viewId.`);if(!label||/[\r\n\u0000-\u001f\u007f]/.test(label))throw new TypeError(`commandGroups[${index}] requires a safe label.`);const order=Number.isFinite(Number(input.order))?Number(input.order):index*10,items=normalizeIdOrder(input.items,`commandGroups[${index}].items`);return{id,viewId,label,order,items};}
  function normalizeItemGroup(value,index,field){
    const id=String(value?.id||'').trim(),label=String(value?.label||'').trim();
    if(!/^[a-z0-9][a-z0-9._-]{0,79}$/.test(id)||id.length>(field==='promptGroups'?64:80)||['all','ungrouped'].includes(id))
      throw new TypeError(`${field}[${index}] requires a safe non-reserved id.`);
    if(!label||/[\r\n\u0000-\u001f\u007f]/.test(label))throw new TypeError(`${field}[${index}] requires a safe label.`);
    return{id,label,items:normalizeIdOrder(value?.items,`${field}[${index}].items`)};
  }
  function normalizePromptGroup(value,index){return normalizeItemGroup(value,index,'promptGroups');}
  function normalizeItemGroups(groups,field){
    const normalized=groups.map((group,index)=>normalizeItemGroup(group,index,field));
    if(new Set(normalized.map(group=>group.id)).size!==normalized.length)throw new TypeError(`Duplicate group ids in ${field}.`);
    const membership=new Set();
    for(const group of normalized)for(const id of group.items){
      if(membership.has(id))throw new TypeError(`${id} belongs to multiple groups in ${field}.`);
      membership.add(id);
    }
    return normalized;
  }
  function groupKind(field){return field==='promptGroups'?'prompt group':'RDG group';}
  function promptGroupForId(order,id){return(order?.promptGroups||[]).find(group=>(group.items||[]).includes(id))||null;}
  function createItemGroupInOrder(value,label,field='promptGroups'){
    const order=normalizeCatalogOrder(value),name=String(label||'').trim();
    const slug=name.toLowerCase().normalize('NFKD').replace(/[^a-z0-9._-]+/g,'-').replace(/^-+|-+$/g,'').slice(0,64);
    const fallback=()=>{let hash=2166136261;for(const char of name){hash=Math.imul(hash^char.codePointAt(0),16777619)>>>0;}return`group-${hash.toString(36)}`;};
    const id=slug||fallback();
    if(!name||/[\r\n\u0000-\u001f\u007f]/.test(name)||!id||['all','ungrouped'].includes(id))throw new TypeError('Group requires a nonempty safe name.');
    if(order[field].some(group=>group.id===id))throw new TypeError(`Group already exists: ${id}`);
    return normalizeCatalogOrder({...order,[field]:[...order[field],{id,label:name,items:[]}]});
  }
  function renameItemGroupInOrder(value,id,label,field='promptGroups'){
    const order=normalizeCatalogOrder(value),name=String(label||'').trim();
    if(!name||/[\r\n\u0000-\u001f\u007f]/.test(name))throw new TypeError('Group requires a safe label.');
    if(!order[field].some(group=>group.id===id))throw new Error(`Unknown ${groupKind(field)}: ${id}`);
    return normalizeCatalogOrder({...order,[field]:order[field].map(group=>group.id===id?{...group,label:name}:group)});
  }
  function deleteItemGroupInOrder(value,id,field='promptGroups'){
    const order=normalizeCatalogOrder(value);
    if(!order[field].some(group=>group.id===id))throw new Error(`Unknown ${groupKind(field)}: ${id}`);
    return normalizeCatalogOrder({...order,[field]:order[field].filter(group=>group.id!==id)});
  }
  function assignItemGroupInOrder(value,itemId,groupId,field='promptGroups'){
    const order=normalizeCatalogOrder(value),id=String(itemId||'').trim(),target=String(groupId||'').trim();
    if(!id)throw new TypeError('An item id is required.');
    if(target&&!order[field].some(group=>group.id===target))throw new Error(`Unknown ${groupKind(field)}: ${target}`);
    const groups=order[field].map(group=>({...group,items:group.items.filter(item=>item!==id)}));
    if(target)groups.find(group=>group.id===target).items.push(id);
    return normalizeCatalogOrder({...order,[field]:groups});
  }
  function moveItemGroupInOrder(value,id,delta,field='promptGroups'){
    const order=normalizeCatalogOrder(value),groups=[...order[field]],index=groups.findIndex(group=>group.id===id);
    if(index<0)throw new Error(`Unknown ${groupKind(field)}: ${id}`);
    const target=Math.max(0,Math.min(groups.length-1,index+(delta<0?-1:1)));
    if(index!==target){const[group]=groups.splice(index,1);groups.splice(target,0,group);}
    return normalizeCatalogOrder({...order,[field]:groups});
  }
  function normalizeCatalogOrder(value={}){const input=value&&typeof value==='object'?value:{},version=input.schemaVersion==null?1:Number(input.schemaVersion);if(![1,2,3,4,5,CATALOG_ORDER_SCHEMA_VERSION].includes(version))throw new TypeError(`Unsupported catalog-order schemaVersion: ${input.schemaVersion}`);if(input.kind!=null&&String(input.kind)!==CATALOG_ORDER_KIND)throw new TypeError(`Unsupported catalog-order kind: ${input.kind}`);const commandGroups=(Array.isArray(input.commandGroups)?input.commandGroups:[]).map(normalizeCommandGroup),groupIds=commandGroups.map((group)=>group.id);if(new Set(groupIds).size!==groupIds.length)throw new TypeError('Duplicate command-group ids.');const categories=(version<5?[...LEGACY_COMMAND_CATEGORIES,...[...new Set(commandGroups.map(g=>g.viewId))].filter(id=>!LEGACY_COMMAND_CATEGORIES.some(c=>c.id===id)).map((id,i)=>({id,label:id,order:60+i*10}))]:input.categories);
    if(!Array.isArray(categories)||!categories.length)throw new TypeError('At least one category is required.');
    const normalizedCategories=categories.map(normalizeCommandCategory),categoryIds=new Set(normalizedCategories.map(c=>c.id));
    if(categoryIds.size!==normalizedCategories.length)throw new TypeError('Duplicate category ids.');
    for(const group of commandGroups)if(!categoryIds.has(group.viewId))throw new TypeError('Unknown category for group '+group.id+': '+group.viewId);
    const fallbackCategoryId=version<5?'GENERAL':String(input.fallbackCategoryId||'');
    if(!categoryIds.has(fallbackCategoryId))throw new TypeError('Unknown fallback category.');
    const promptGroups=normalizeItemGroups(Array.isArray(input.promptGroups)?input.promptGroups:[],'promptGroups');
    if(input.rdgGroups!==undefined&&!Array.isArray(input.rdgGroups))throw new TypeError('rdgGroups must be an array.');
    const rdgGroups=input.rdgGroups===undefined?{}:{rdgGroups:normalizeItemGroups(input.rdgGroups,'rdgGroups')};
    const membership=new Map();for(const group of commandGroups)for(const id of group.items){if(membership.has(id))throw new TypeError(`Command card ${id} belongs to multiple groups: ${membership.get(id)}, ${group.id}.`);membership.set(id,group.id);}return{schemaVersion:CATALOG_ORDER_SCHEMA_VERSION,kind:CATALOG_ORDER_KIND,categories:normalizedCategories,fallbackCategoryId,commands:normalizeIdOrder(input.commands,'commands'),useCases:normalizeIdOrder(input.useCases,'useCases'),scenarios:normalizeIdOrder(input.scenarios,'scenarios'),prompts:normalizeIdOrder(input.prompts,'prompts'),commandGroups,promptGroups,...rdgGroups};}
  function renderCatalogOrder(value){return JSON.stringify(normalizeCatalogOrder(value),null,2)+'\n';}

  function parseSeed(text,{path,kind,normalize,label}){let value;try{value=JSON.parse(String(text||''));}catch(error){throw new TypeError(`Invalid ${label} repository catalog JSON at ${path}: ${error.message}`);}if(!value||value.schemaVersion!==1||value.kind!==kind||!Array.isArray(value.items))throw new TypeError(`Invalid ${label} repository catalog shape at ${path}.`);const items=normalize(value.items);if(!items.length)throw new TypeError(`${label} repository catalog is empty at ${path}.`);return{schemaVersion:1,kind,generatedFrom:String(value.generatedFrom||''),items};}
  function parseUseCaseCatalog(text,path=USE_CASE_CATALOG_PATH){const parsed=parseSeed(text,{path,kind:'use-case-seed',normalize:deps.normalizeUseCaseDefinitions,label:'Use-Case'});return{...parsed,useCases:parsed.items};}
  function parseSemanticComponentCatalog(text,path=SEMANTIC_COMPONENT_CATALOG_PATH){const parsed=parseSeed(text,{path,kind:'semantic-component-seed',normalize:deps.normalizeSemanticComponents,label:'semantic-component'});return{...parsed,components:parsed.items};}
  function parseScenarioCatalog(text,path=SCENARIO_CATALOG_PATH){const parsed=parseSeed(text,{path,kind:'scenario-seed',normalize:deps.normalizeScenarios,label:'Scenario'});return{...parsed,scenarios:parsed.items};}
  function parseCatalogOrder(text,path=CATALOG_ORDER_PATH){let value;try{value=JSON.parse(String(text||''));}catch(error){throw new TypeError(`Invalid catalog-order JSON at ${path}: ${error.message}`);}return normalizeCatalogOrder(value);}

  class RepositoryCatalogService{
    constructor(client){this.client=client;}
    async readUseCases(){const remote=await this.client.read(USE_CASE_CATALOG_PATH);const parsed=parseUseCaseCatalog(remote.content);return{path:USE_CASE_CATALOG_PATH,sha:String(remote.sha||''),useCases:parsed.useCases,generatedFrom:parsed.generatedFrom,rawContent:remote.content.replace(/\r\n?/g,'\n')};}
    async readSemanticComponents(){const remote=await this.client.read(SEMANTIC_COMPONENT_CATALOG_PATH);const parsed=parseSemanticComponentCatalog(remote.content);return{path:SEMANTIC_COMPONENT_CATALOG_PATH,sha:String(remote.sha||''),components:parsed.components,generatedFrom:parsed.generatedFrom,rawContent:remote.content.replace(/\r\n?/g,'\n')};}
    async readScenarios(){const remote=await this.client.read(SCENARIO_CATALOG_PATH);const parsed=parseScenarioCatalog(remote.content);return{path:SCENARIO_CATALOG_PATH,sha:String(remote.sha||''),scenarios:parsed.scenarios,generatedFrom:parsed.generatedFrom,rawContent:remote.content.replace(/\r\n?/g,'\n')};}
    async readOrder(){try{const remote=await this.client.read(CATALOG_ORDER_PATH);return{path:CATALOG_ORDER_PATH,sha:String(remote.sha||''),order:parseCatalogOrder(remote.content),rawContent:remote.content.replace(/\r\n?/g,'\n')};}catch(error){if(error?.kind==='not_found')return{path:CATALOG_ORDER_PATH,sha:'',order:normalizeCatalogOrder({}),rawContent:''};throw error;}}
    async saveOrder(value){const order=normalizeCatalogOrder(value),content=renderCatalogOrder(order);let existing=null;try{const remote=await this.client.read(CATALOG_ORDER_PATH);existing={sha:String(remote.sha||''),rawContent:remote.content.replace(/\r\n?/g,'\n')};}catch(error){if(error?.kind!=='not_found')throw error;}if(existing&&existing.rawContent===content)return{ok:true,action:'noop',path:CATALOG_ORDER_PATH,sha:existing.sha,order,rawContent:content};const action=existing?'update':'create';const write=await this.client.saveVerified({path:CATALOG_ORDER_PATH,content,baseSha:existing?.sha||'',message:`${action==='create'?'Add':'Update'} Planning Helper catalog order`});return{ok:true,action,path:CATALOG_ORDER_PATH,sha:String(write.sha||''),order,rawContent:content,recoveredAfterUnknownWrite:Boolean(write.recoveredAfterUnknownWrite),recoveredAfterConflict:Boolean(write.recoveredAfterConflict)};}
  }

  return{USE_CASE_CATALOG_PATH,SEMANTIC_COMPONENT_CATALOG_PATH,SCENARIO_CATALOG_PATH,CATALOG_ORDER_PATH,CATALOG_ORDER_KIND,CATALOG_ORDER_SCHEMA_VERSION,normalizeCatalogOrder,normalizePromptGroup,promptGroupForId,createPromptGroupInOrder:createItemGroupInOrder,renamePromptGroupInOrder:renameItemGroupInOrder,deletePromptGroupInOrder:deleteItemGroupInOrder,assignPromptGroupInOrder:assignItemGroupInOrder,movePromptGroupInOrder:moveItemGroupInOrder,createItemGroupInOrder,renameItemGroupInOrder,deleteItemGroupInOrder,assignItemGroupInOrder,moveItemGroupInOrder,renderCatalogOrder,parseUseCaseCatalog,parseSemanticComponentCatalog,parseScenarioCatalog,parseCatalogOrder,RepositoryCatalogService};
});
