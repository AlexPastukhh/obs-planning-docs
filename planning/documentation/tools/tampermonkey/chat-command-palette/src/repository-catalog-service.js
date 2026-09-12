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

  function normalizeIdOrder(value,label){const result=[];for(const raw of Array.isArray(value)?value:[]){const id=String(raw||'').trim();if(!id)continue;if(/[\r\n\u0000-\u001f\u007f]/.test(id))throw new TypeError(`${label} contains unsafe id.`);if(!result.includes(id))result.push(id);}return result;}
  function normalizeCatalogOrder(value={}){const input=value&&typeof value==='object'?value:{};if(input.schemaVersion!=null&&Number(input.schemaVersion)!==1)throw new TypeError(`Unsupported catalog-order schemaVersion: ${input.schemaVersion}`);if(input.kind!=null&&String(input.kind)!==CATALOG_ORDER_KIND)throw new TypeError(`Unsupported catalog-order kind: ${input.kind}`);return{schemaVersion:1,kind:CATALOG_ORDER_KIND,commands:normalizeIdOrder(input.commands,'commands'),useCases:normalizeIdOrder(input.useCases,'useCases'),scenarios:normalizeIdOrder(input.scenarios,'scenarios'),prompts:normalizeIdOrder(input.prompts,'prompts')};}
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

  return{USE_CASE_CATALOG_PATH,SEMANTIC_COMPONENT_CATALOG_PATH,SCENARIO_CATALOG_PATH,CATALOG_ORDER_PATH,CATALOG_ORDER_KIND,normalizeCatalogOrder,renderCatalogOrder,parseUseCaseCatalog,parseSemanticComponentCatalog,parseScenarioCatalog,parseCatalogOrder,RepositoryCatalogService};
});
