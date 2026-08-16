(function (root, factory) {
  const api=factory(typeof require==='function'?Object.assign({},root.ObsPlanningHelper||{},require('./command-definition-codec.js'),require('./command-catalog.js')):(root.ObsPlanningHelper||{}));
  if(typeof module==='object'&&module.exports)module.exports=api;
  root.ObsPlanningHelper=Object.assign(root.ObsPlanningHelper||{},api);
})(typeof globalThis!=='undefined'?globalThis:this,function(deps){
  'use strict';
  const COMMANDS_PATH=deps.COMMANDS_PATH||'planning/commands';
  const COMMAND_FILE_PATTERN=/^[a-z0-9][a-z0-9._-]*\.command\.md$/;

  class RepositoryCommandService{
    constructor(client,options={}){this.client=client;this.commandsPath=options.commandsPath||COMMANDS_PATH;if(this.commandsPath!==COMMANDS_PATH)throw new TypeError(`Command repository operations are confined to ${COMMANDS_PATH}.`);}
    _target(definition){const normalized=deps.normalizeCommandDefinition(definition);if(!COMMAND_FILE_PATTERN.test(normalized.file))throw new TypeError('Invalid command filename.');return{definition:normalized,path:`${this.commandsPath}/${normalized.file}`};}
    async listRemote(){const entries=await this.client.listDirectory(this.commandsPath);return entries.filter((entry)=>entry.type==='file'&&COMMAND_FILE_PATTERN.test(entry.name)).map((entry)=>({kind:'planning-command',path:entry.path,name:entry.name,sha:String(entry.sha||'')})).sort((a,b)=>a.path.localeCompare(b.path));}
    async readRemote(path){const normalizedPath=String(path||'');const prefix=`${this.commandsPath}/`;const file=normalizedPath.startsWith(prefix)?normalizedPath.slice(prefix.length):'';if(!COMMAND_FILE_PATTERN.test(file)||normalizedPath!==`${prefix}${file}`)throw new TypeError(`Invalid repository command path: ${normalizedPath||'<empty>'}.`);const remote=await this.client.read(normalizedPath);const definition=deps.stripRuntimeCommandMetadata(deps.parseCommandDefinitionDocument(remote.content,{path:normalizedPath}));return{kind:'planning-command',path:normalizedPath,name:file,sha:String(remote.sha||''),definition,rawContent:remote.content.replace(/\r\n?/g,'\n')};}
    async loadCatalog(options={}){const entries=await this.listRemote();const records=[];for(const entry of entries)records.push(await this.readRemote(entry.path));deps.validateCommandCatalog(records.map((record)=>record.definition));if(!records.length&&!options.allowEmpty)throw new TypeError('Repository command catalog contains no direct .command.md definitions.');return records;}
    async save(definition){const target=this._target(definition);const content=deps.renderCommandDefinitionDocument(target.definition);const current=await this.loadCatalog({allowEmpty:true});const currentByPath=new Map(current.map((record)=>[record.path,record]));const existing=currentByPath.get(target.path)||null;const merged=deps.replaceDefinitionsByFile(current.map((record)=>record.definition),[target.definition]);deps.validateCommandCatalog(merged);if(existing&&existing.rawContent===content)return{ok:true,action:'noop',path:target.path,sha:existing.sha,definition:target.definition,rawContent:content};const action=existing?'update':'create';const write=await this.client.saveVerified({path:target.path,content,baseSha:existing?.sha||'',message:`${action==='create'?'Add':'Update'} planning command ${target.definition.command}`});return{ok:true,action,path:target.path,sha:String(write.sha||''),definition:target.definition,rawContent:content,recoveredAfterUnknownWrite:Boolean(write.recoveredAfterUnknownWrite)};}
  }
  return{RepositoryCommandService,COMMAND_FILE_PATTERN};
});
