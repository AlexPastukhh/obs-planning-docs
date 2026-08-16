(function (root, factory) {
  const api=factory(root.ObsPlanningHelper||(typeof require==='function'?require('./helper-library-codec.js'):{}));
  if(typeof module==='object'&&module.exports)module.exports=api;
  root.ObsPlanningHelper=Object.assign(root.ObsPlanningHelper||{},api);
})(typeof globalThis!=='undefined'?globalThis:this,function(deps){
  'use strict';
  class RepositoryHelperLibraryService{
    constructor(client){this.client=client;}
    async createOnly(value){const item=deps.normalizeHelperLibraryItem(value);const path=deps.helperLibraryTargetPath(item);const content=deps.renderHelperLibraryDocument(item);const write=await this.client.create({path,content,message:`Add Planning Helper ${item.kind} ${item.title}`});return{ok:true,action:'create',path,sha:String(write.sha||''),item,rawContent:content};}
    async createOnlyBatch(items){const normalized=deps.normalizeHelperLibraryCollection(items||[]);const results=[];for(const item of normalized){try{results.push(await this.createOnly(item));}catch(error){results.push({ok:false,action:'create',path:deps.helperLibraryTargetPath(item),item,error:error?.message||String(error),kind:error?.kind||'error'});}}return{ok:results.every((row)=>row.ok),results};}
  }
  return{RepositoryHelperLibraryService};
});
