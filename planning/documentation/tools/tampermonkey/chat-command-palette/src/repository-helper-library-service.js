(function (root, factory) {
  const api=factory(typeof require==='function'?Object.assign({},root.ObsPlanningHelper||{},require('./helper-library-codec.js')):(root.ObsPlanningHelper||{}));
  if(typeof module==='object'&&module.exports)module.exports=api;
  root.ObsPlanningHelper=Object.assign(root.ObsPlanningHelper||{},api);
})(typeof globalThis!=='undefined'?globalThis:this,function(deps){
  'use strict';

  function inferKindFromPath(path){const text=String(path||'');for(const kind of Object.values(deps.HELPER_LIBRARY_KINDS)){const prefix=`${deps.HELPER_LIBRARY_PATHS[kind]}/`;if(text.startsWith(prefix)&&deps.helperLibraryFilePattern(kind).test(text.slice(prefix.length)))return kind;}throw new TypeError(`Invalid helper-library repository path: ${text||'<empty>'}.`);}

  class RepositoryHelperLibraryService{
    constructor(client){this.client=client;}
    async listRemote(kind){const normalizedKind=String(kind||'');const root=deps.HELPER_LIBRARY_PATHS[normalizedKind];if(!root)throw new TypeError(`Unsupported helper-library kind: ${normalizedKind||'<empty>'}`);let entries;try{entries=await this.client.listDirectory(root);}catch(error){if(error?.kind==='not_found')return[];throw error;}const pattern=deps.helperLibraryFilePattern(normalizedKind);return entries.filter((entry)=>entry.type==='file'&&pattern.test(entry.name)).map((entry)=>({kind:normalizedKind,path:entry.path,name:entry.name,sha:String(entry.sha||'')})).sort((a,b)=>a.path.localeCompare(b.path));}
    async listRemoteAll(){const commands=await this.listRemote(deps.HELPER_LIBRARY_KINDS.COMMAND);const prompts=await this.listRemote(deps.HELPER_LIBRARY_KINDS.PROMPT);return[...commands,...prompts].sort((a,b)=>a.path.localeCompare(b.path));}
    async readRemote(path){const kind=inferKindFromPath(path);const remote=await this.client.read(path);const item=deps.parseHelperLibraryDocument(remote.content,{kind,path});return{kind,path:String(path),name:String(path).split('/').pop(),sha:String(remote.sha||''),item,rawContent:remote.content.replace(/\r\n?/g,'\n')};}
    async save(value){const item=deps.normalizeHelperLibraryItem(value);const path=deps.helperLibraryTargetPath(item);const content=deps.renderHelperLibraryDocument(item);let existing=null;try{const remote=await this.client.read(path);const parsed=deps.parseHelperLibraryDocument(remote.content,{kind:item.kind,path});existing={sha:String(remote.sha||''),item:parsed,rawContent:remote.content.replace(/\r\n?/g,'\n')};}catch(error){if(error?.kind!=='not_found')throw error;}
      if(existing&&existing.rawContent===content)return{ok:true,action:'noop',path,sha:existing.sha,item,rawContent:content};const action=existing?'update':'create';const write=await this.client.saveVerified({path,content,baseSha:existing?.sha||'',message:`${action==='create'?'Add':'Update'} Planning Helper ${item.kind} ${item.title}`});return{ok:true,action,path,sha:String(write.sha||''),item,rawContent:content,recoveredAfterUnknownWrite:Boolean(write.recoveredAfterUnknownWrite)};
    }
  }
  return{RepositoryHelperLibraryService,inferKindFromPath};
});
