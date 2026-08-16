(function (root, factory) {
  const api=factory(root.ObsPlanningHelper||(typeof require==='function'?Object.assign({},require('./command-definition-codec.js'),require('./command-catalog.js')):{}));
  if(typeof module==='object'&&module.exports)module.exports=api;
  root.ObsPlanningHelper=Object.assign(root.ObsPlanningHelper||{},api);
})(typeof globalThis!=='undefined'?globalThis:this,function(deps){
  'use strict';
  const COMMANDS_PATH=deps.COMMANDS_PATH||'planning/commands';
  const COMMAND_FILE_PATTERN=/^[a-z0-9][a-z0-9._-]*\.command\.md$/;

  class RepositoryCommandService{
    constructor(client,options={}){this.client=client;this.commandsPath=options.commandsPath||COMMANDS_PATH;if(this.commandsPath!==COMMANDS_PATH)throw new TypeError(`Command writes are confined to ${COMMANDS_PATH}.`);}
    _target(definition){const normalized=deps.normalizeCommandDefinition(definition);if(!COMMAND_FILE_PATTERN.test(normalized.file))throw new TypeError('Invalid command filename.');return{definition:normalized,path:`${this.commandsPath}/${normalized.file}`};}
    async createOnly(definition){
      const target=this._target(definition);const content=deps.renderCommandDefinitionDocument(target.definition);
      const write=await this.client.create({path:target.path,content,message:`Add planning command ${target.definition.command}`});
      return{ok:true,action:'create',path:target.path,command:target.definition.command,sha:String(write.sha||''),definition:target.definition,rawContent:content};
    }
    async createOnlyBatch(definitions){
      deps.validateCommandCatalog(definitions||[]);const results=[];
      for(const definition of definitions||[]){try{results.push(await this.createOnly(definition));}catch(error){results.push({ok:false,action:'create',path:`${this.commandsPath}/${definition.file}`,command:definition.command,error:error?.message||String(error),kind:error?.kind||'error'});}}
      return{ok:results.every((row)=>row.ok),results};
    }
  }
  return{RepositoryCommandService};
});
