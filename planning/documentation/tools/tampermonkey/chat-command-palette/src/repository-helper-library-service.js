(function (root, factory) {
  const api = factory(root.ObsPlanningHelper || (typeof require === 'function' ? require('./helper-library-codec.js') : {}));
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsPlanningHelper = Object.assign(root.ObsPlanningHelper || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function (deps) {
  'use strict';

  function conflict(message){const error=new Error(message);error.kind='conflict';return error;}
  function sourceKey(identity){return `${identity.owner.toLowerCase()}/${identity.repo.toLowerCase()}@${identity.branch}`;}
  function isoNow(value){return value||new Date().toISOString();}
  function cacheRecordIsReusable(record,entry,kind){
    if(!record||typeof record!=='object'||!record.item)return false;
    try{return String(record.path||'')===entry.path&&String(record.sha||'')===String(entry.sha||'')&&record.item.kind===kind&&deps.helperLibraryTargetPath(record.item)===entry.path;}catch(_){return false;}
  }

  class RepositoryHelperLibraryService {
    constructor(client){this.client=client;}
    _identity(){const identity={owner:String(this.client?.owner||'').trim(),repo:String(this.client?.repo||'').trim(),branch:String(this.client?.branch||'').trim()};if(!identity.owner||!identity.repo||!identity.branch)throw new TypeError('Repository client identity is incomplete.');return{...identity,sourceKey:sourceKey(identity)};}
    _normalizeIdentity(value){if(!value||typeof value!=='object')throw new TypeError('Library preview is missing repository identity.');const identity={owner:String(value.owner||'').trim(),repo:String(value.repo||'').trim(),branch:String(value.branch||'').trim()};if(!identity.owner||!identity.repo||!identity.branch)throw new TypeError('Library preview repository identity is incomplete.');const key=sourceKey(identity);if(String(value.sourceKey||'')!==key)throw new TypeError('Library preview repository source key is invalid.');return{...identity,sourceKey:key};}
    async _list(kind){const path=deps.HELPER_LIBRARY_PATHS[kind];let entries;try{entries=await this.client.listDirectory(path);}catch(error){if(error?.kind==='not_found')return[];throw error;}const pattern=deps.helperLibraryFilePattern(kind);return entries.filter((entry)=>entry.type==='file'&&pattern.test(entry.name)).sort((a,b)=>a.name.localeCompare(b.name));}

    async syncKind(kind,cachedRecords=[],options={}){
      const files=await this._list(kind);
      const cached=(cachedRecords||[]).filter((record)=>record?.item?.kind===kind);
      const byPath=new Map(cached.map((record)=>[String(record.path||''),record]));
      const remotePaths=new Set(files.map((entry)=>entry.path));
      const records=[];let fetched=0,reused=0;
      const fetchedAt=isoNow(options.now);
      for(const entry of files){
        const previous=byPath.get(entry.path);
        if(cacheRecordIsReusable(previous,entry,kind)){
          records.push({item:deps.normalizeHelperLibraryItem(previous.item),path:entry.path,sha:String(entry.sha||''),fetchedAt:String(previous.fetchedAt||'')});reused++;continue;
        }
        const file=await this.client.read(entry.path);
        const item=deps.parseHelperLibraryDocument(file.content,{kind,path:entry.path});
        records.push({item,path:entry.path,sha:String(file.sha||entry.sha||''),fetchedAt});fetched++;
      }
      const removed=cached.filter((record)=>!remotePaths.has(String(record.path||''))).length;
      return{records,fetched,reused,removed,listed:files.length};
    }

    async syncAll(cachedRecords=[],options={}){
      const now=isoNow(options.now);
      const commands=await this.syncKind(deps.HELPER_LIBRARY_KINDS.COMMAND,cachedRecords,{now});
      const prompts=await this.syncKind(deps.HELPER_LIBRARY_KINDS.PROMPT,cachedRecords,{now});
      return{records:[...commands.records,...prompts.records],syncedAt:now,fetched:commands.fetched+prompts.fetched,reused:commands.reused+prompts.reused,removed:commands.removed+prompts.removed,listed:commands.listed+prompts.listed};
    }

    async loadKind(kind){const result=await this.syncKind(kind,[]);return result.records.map((record)=>({...record.item,__sha:record.sha,__path:record.path,__fetchedAt:record.fetchedAt}));}
    async loadAll(){const result=await this.syncAll([]);return result.records.map((record)=>({...record.item,__sha:record.sha,__path:record.path,__fetchedAt:record.fetchedAt}));}

    async previewSave(value){const item=deps.normalizeHelperLibraryItem(value);const path=deps.helperLibraryTargetPath(item);let current=null;try{current=await this.client.read(path);deps.parseHelperLibraryDocument(current.content,{kind:item.kind,path});}catch(error){if(error?.kind!=='not_found')throw error;current=null;}return{repository:this._identity(),item,path,action:current?'update':'create',baseSha:current?.sha||''};}
    _normalizePreview(plan){if(!plan||typeof plan!=='object')throw new TypeError('A helper-library Preview plan is required before Save.');const repository=this._normalizeIdentity(plan.repository);const item=deps.normalizeHelperLibraryItem(plan.item);const path=deps.helperLibraryTargetPath(item);if(String(plan.path||'')!==path)throw new TypeError('Helper-library target changed after Preview.');const action=String(plan.action||''),baseSha=String(plan.baseSha||'');if(action==='create'&&baseSha)throw new TypeError('Create helper-library preview unexpectedly contains a base SHA.');if(action==='update'&&!baseSha)throw new TypeError('Update helper-library preview is missing its base SHA.');if(action!=='create'&&action!=='update')throw new TypeError('Unknown helper-library preview action.');return{repository,item,path,action,baseSha};}
    async savePreviewPlan(plan){const preview=this._normalizePreview(plan);const identity=this._identity();if(identity.sourceKey!==preview.repository.sourceKey)throw conflict(`Repository target changed since Preview (${preview.repository.sourceKey} -> ${identity.sourceKey}). Nothing was written; preview again.`);let current=null;try{current=await this.client.read(preview.path);}catch(error){if(error?.kind!=='not_found')throw error;}
      if(preview.action==='create'&&current)throw conflict(`Repository helper-library item appeared after Preview: ${preview.path}. Nothing was written; preview again.`);
      if(preview.action==='update'&&(!current||current.sha!==preview.baseSha))throw conflict(`Repository helper-library item changed after Preview: ${preview.path}. Nothing was written; preview again.`);
      if(current)deps.parseHelperLibraryDocument(current.content,{kind:preview.item.kind,path:preview.path});
      const content=deps.renderHelperLibraryDocument(preview.item);const write=await this.client.saveVerified({path:preview.path,content,baseSha:preview.baseSha,message:`${preview.action==='create'?'Add':'Update'} Planning Helper ${preview.item.kind} ${preview.item.title}`});const record={item:preview.item,path:preview.path,sha:write.sha,fetchedAt:new Date().toISOString()};return{ok:true,action:preview.action,path:preview.path,sha:write.sha,item:preview.item,record,recoveredAfterUnknownWrite:Boolean(write.recoveredAfterUnknownWrite)};
    }
  }

  return { RepositoryHelperLibraryService, helperLibraryRepositorySourceKey:sourceKey };
});
