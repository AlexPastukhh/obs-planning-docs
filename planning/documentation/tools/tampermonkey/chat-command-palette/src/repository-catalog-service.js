(function (root, factory) {
  const api=factory(typeof require==='function'?Object.assign({},require('./semantic-projections.js'),root.ObsPlanningHelper||{}):(root.ObsPlanningHelper||{}));
  if(typeof module==='object'&&module.exports)module.exports=api;
  root.ObsPlanningHelper=Object.assign(root.ObsPlanningHelper||{},api);
})(typeof globalThis!=='undefined'?globalThis:this,function(deps){
  'use strict';

  const DIRECTION_CATALOG_PATH='planning/documentation/tools/tampermonkey/chat-command-palette/seed/directions.json';
  const USE_CASE_CATALOG_PATH='planning/documentation/tools/tampermonkey/chat-command-palette/seed/use-cases.json';
  const CATALOG_ORDER_PATH='planning/documentation/tools/tampermonkey/chat-command-palette/catalog-order.json';
  const CATALOG_ORDER_KIND='planning-helper-catalog-order';

  function normalizeIdOrder(value,label){const result=[];for(const raw of Array.isArray(value)?value:[]){const id=String(raw||'').trim();if(!id)continue;if(/[\r\n\u0000-\u001f\u007f]/.test(id))throw new TypeError(`${label} contains unsafe id.`);if(!result.includes(id))result.push(id);}return result;}
  function normalizeCatalogOrder(value={}){const input=value&&typeof value==='object'?value:{};if(input.schemaVersion!=null&&Number(input.schemaVersion)!==1)throw new TypeError(`Unsupported catalog-order schemaVersion: ${input.schemaVersion}`);if(input.kind!=null&&String(input.kind)!==CATALOG_ORDER_KIND)throw new TypeError(`Unsupported catalog-order kind: ${input.kind}`);return{schemaVersion:1,kind:CATALOG_ORDER_KIND,directions:normalizeIdOrder(input.directions,'directions'),commands:normalizeIdOrder(input.commands,'commands'),useCases:normalizeIdOrder(input.useCases,'useCases'),prompts:normalizeIdOrder(input.prompts,'prompts')};}
  function renderCatalogOrder(value){return JSON.stringify(normalizeCatalogOrder(value),null,2)+'\n';}

  function parseDirectionCatalog(text,path=DIRECTION_CATALOG_PATH){let value;try{value=JSON.parse(String(text||''));}catch(error){throw new TypeError(`Invalid Direction repository catalog JSON at ${path}: ${error.message}`);}if(!value||value.schemaVersion!==1||value.kind!=='direction-seed'||!Array.isArray(value.items))throw new TypeError(`Invalid Direction repository catalog shape at ${path}.`);const directions=deps.normalizeDirectionDefinitions(value.items);if(!directions.length)throw new TypeError(`Direction repository catalog is empty at ${path}.`);return{schemaVersion:1,kind:'direction-seed',generatedFrom:String(value.generatedFrom||''),directions};}
  function parseUseCaseCatalog(text,path=USE_CASE_CATALOG_PATH){let value;try{value=JSON.parse(String(text||''));}catch(error){throw new TypeError(`Invalid Use-Case repository catalog JSON at ${path}: ${error.message}`);}if(!value||value.schemaVersion!==1||value.kind!=='use-case-seed'||!Array.isArray(value.items))throw new TypeError(`Invalid Use-Case repository catalog shape at ${path}.`);const useCases=deps.normalizeUseCaseDefinitions(value.items);if(!useCases.length)throw new TypeError(`Use-Case repository catalog is empty at ${path}.`);return{schemaVersion:1,kind:'use-case-seed',generatedFrom:String(value.generatedFrom||''),useCases};}
  function parseCatalogOrder(text,path=CATALOG_ORDER_PATH){let value;try{value=JSON.parse(String(text||''));}catch(error){throw new TypeError(`Invalid catalog-order JSON at ${path}: ${error.message}`);}return normalizeCatalogOrder(value);}

  class RepositoryCatalogService{
    constructor(client){this.client=client;}
    async readDirections(){const remote=await this.client.read(DIRECTION_CATALOG_PATH);const parsed=parseDirectionCatalog(remote.content);return{path:DIRECTION_CATALOG_PATH,sha:String(remote.sha||''),directions:parsed.directions,generatedFrom:parsed.generatedFrom,rawContent:remote.content.replace(/\r\n?/g,'\n')};}
    async readUseCases(){const remote=await this.client.read(USE_CASE_CATALOG_PATH);const parsed=parseUseCaseCatalog(remote.content);return{path:USE_CASE_CATALOG_PATH,sha:String(remote.sha||''),useCases:parsed.useCases,generatedFrom:parsed.generatedFrom,rawContent:remote.content.replace(/\r\n?/g,'\n')};}
    async readOrder(){try{const remote=await this.client.read(CATALOG_ORDER_PATH);return{path:CATALOG_ORDER_PATH,sha:String(remote.sha||''),order:parseCatalogOrder(remote.content),rawContent:remote.content.replace(/\r\n?/g,'\n')};}catch(error){if(error?.kind==='not_found')return{path:CATALOG_ORDER_PATH,sha:'',order:normalizeCatalogOrder({}),rawContent:''};throw error;}}
    async saveOrder(value){const order=normalizeCatalogOrder(value),content=renderCatalogOrder(order);let existing=null;try{const remote=await this.client.read(CATALOG_ORDER_PATH);existing={sha:String(remote.sha||''),rawContent:remote.content.replace(/\r\n?/g,'\n')};}catch(error){if(error?.kind!=='not_found')throw error;}if(existing&&existing.rawContent===content)return{ok:true,action:'noop',path:CATALOG_ORDER_PATH,sha:existing.sha,order,rawContent:content};const action=existing?'update':'create';const write=await this.client.saveVerified({path:CATALOG_ORDER_PATH,content,baseSha:existing?.sha||'',message:`${action==='create'?'Add':'Update'} Planning Helper catalog order`});return{ok:true,action,path:CATALOG_ORDER_PATH,sha:String(write.sha||''),order,rawContent:content,recoveredAfterUnknownWrite:Boolean(write.recoveredAfterUnknownWrite),recoveredAfterConflict:Boolean(write.recoveredAfterConflict)};}
  }

  return{DIRECTION_CATALOG_PATH,USE_CASE_CATALOG_PATH,CATALOG_ORDER_PATH,CATALOG_ORDER_KIND,normalizeCatalogOrder,renderCatalogOrder,parseDirectionCatalog,parseUseCaseCatalog,parseCatalogOrder,RepositoryCatalogService};
});
