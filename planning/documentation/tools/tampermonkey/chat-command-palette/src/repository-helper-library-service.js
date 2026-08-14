(function (root, factory) {
  const api = factory(root.ObsPlanningHelper || (typeof require === 'function' ? require('./helper-library-codec.js') : {}));
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsPlanningHelper = Object.assign(root.ObsPlanningHelper || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function (deps) {
  'use strict';

  function conflict(message){const error=new Error(message);error.kind='conflict';return error;}
  function sourceKey(identity){return `${identity.owner.toLowerCase()}/${identity.repo.toLowerCase()}@${identity.branch}`;}

  class RepositoryHelperLibraryService {
    constructor(client){this.client=client;}
    _identity(){const identity={owner:String(this.client?.owner||'').trim(),repo:String(this.client?.repo||'').trim(),branch:String(this.client?.branch||'').trim()};if(!identity.owner||!identity.repo||!identity.branch)throw new TypeError('Repository client identity is incomplete.');return{...identity,sourceKey:sourceKey(identity)};}
    _normalizeIdentity(value){if(!value||typeof value!=='object')throw new TypeError('Library preview is missing repository identity.');const identity={owner:String(value.owner||'').trim(),repo:String(value.repo||'').trim(),branch:String(value.branch||'').trim()};if(!identity.owner||!identity.repo||!identity.branch)throw new TypeError('Library preview repository identity is incomplete.');const key=sourceKey(identity);if(String(value.sourceKey||'')!==key)throw new TypeError('Library preview repository source key is invalid.');return{...identity,sourceKey:key};}
    async _list(kind){const path=deps.HELPER_LIBRARY_PATHS[kind];let entries;try{entries=await this.client.listDirectory(path);}catch(error){if(error?.kind==='not_found')return[];throw error;}const pattern=deps.helperLibraryFilePattern(kind);return entries.filter((entry)=>entry.type==='file'&&pattern.test(entry.name)).sort((a,b)=>a.name.localeCompare(b.name));}
    async loadKind(kind){const files=await this._list(kind);const result=[];for(const entry of files){const file=await this.client.read(entry.path);const item=deps.parseHelperLibraryDocument(file.content,{kind,path:entry.path});result.push({...item,__sha:file.sha,__path:entry.path});}return result;}
    async loadAll(){const commands=await this.loadKind(deps.HELPER_LIBRARY_KINDS.COMMAND);const prompts=await this.loadKind(deps.HELPER_LIBRARY_KINDS.PROMPT);return[...commands,...prompts];}
    async previewSave(value){const item=deps.normalizeHelperLibraryItem(value);const path=deps.helperLibraryTargetPath(item);let current=null;try{current=await this.client.read(path);deps.parseHelperLibraryDocument(current.content,{kind:item.kind,path});}catch(error){if(error?.kind!=='not_found')throw error;current=null;}return{repository:this._identity(),item,path,action:current?'update':'create',baseSha:current?.sha||''};}
    _normalizePreview(plan){if(!plan||typeof plan!=='object')throw new TypeError('A helper-library Preview plan is required before Save.');const repository=this._normalizeIdentity(plan.repository);const item=deps.normalizeHelperLibraryItem(plan.item);const path=deps.helperLibraryTargetPath(item);if(String(plan.path||'')!==path)throw new TypeError('Helper-library target changed after Preview.');const action=String(plan.action||''),baseSha=String(plan.baseSha||'');if(action==='create'&&baseSha)throw new TypeError('Create helper-library preview unexpectedly contains a base SHA.');if(action==='update'&&!baseSha)throw new TypeError('Update helper-library preview is missing its base SHA.');if(action!=='create'&&action!=='update')throw new TypeError('Unknown helper-library preview action.');return{repository,item,path,action,baseSha};}
    async savePreviewPlan(plan){const preview=this._normalizePreview(plan);const identity=this._identity();if(identity.sourceKey!==preview.repository.sourceKey)throw conflict(`Repository target changed since Preview (${preview.repository.sourceKey} -> ${identity.sourceKey}). Nothing was written; preview again.`);let current=null;try{current=await this.client.read(preview.path);}catch(error){if(error?.kind!=='not_found')throw error;}
      if(preview.action==='create'&&current)throw conflict(`Repository helper-library item appeared after Preview: ${preview.path}. Nothing was written; preview again.`);
      if(preview.action==='update'&&(!current||current.sha!==preview.baseSha))throw conflict(`Repository helper-library item changed after Preview: ${preview.path}. Nothing was written; preview again.`);
      if(current)deps.parseHelperLibraryDocument(current.content,{kind:preview.item.kind,path:preview.path});
      const content=deps.renderHelperLibraryDocument(preview.item);const write=await this.client.saveVerified({path:preview.path,content,baseSha:preview.baseSha,message:`${preview.action==='create'?'Add':'Update'} Planning Helper ${preview.item.kind} ${preview.item.title}`});return{ok:true,action:preview.action,path:preview.path,sha:write.sha,item:preview.item,recoveredAfterUnknownWrite:Boolean(write.recoveredAfterUnknownWrite)};
    }
  }

  return { RepositoryHelperLibraryService, helperLibraryRepositorySourceKey:sourceKey };
});
