(function (root, factory) {
  const api=factory(typeof require==='function'?Object.assign({},root.ObsPlanningHelper||{},require('./helper-library-codec.js')):(root.ObsPlanningHelper||{}));
  if(typeof module==='object'&&module.exports)module.exports=api;
  root.ObsPlanningHelper=Object.assign(root.ObsPlanningHelper||{},api);
})(typeof globalThis!=='undefined'?globalThis:this,function(deps){
  'use strict';

  const MODULE_REFERENCE_PATTERN=/\[\[module:([a-z0-9][a-z0-9._-]{0,79})\]\]/g;
  const DEFAULT_MAX_DEPTH=24;
  const DEFAULT_MAX_LENGTH=100000;

  function moduleReference(id){
    const value=String(id||'').trim();
    if(!/^[a-z0-9][a-z0-9._-]{0,79}$/.test(value))throw new TypeError(`Invalid module id: ${value||'<empty>'}`);
    return `[[module:${value}]]`;
  }

  function findModuleReferences(text){
    const out=[];
    for(const match of String(text==null?'':text).matchAll(MODULE_REFERENCE_PATTERN))out.push(match[1]);
    return out;
  }

  function resolveModuleReferences(text,items,options={}){
    const maxDepth=Number.isInteger(options.maxDepth)&&options.maxDepth>0?options.maxDepth:DEFAULT_MAX_DEPTH;
    const maxLength=Number.isInteger(options.maxLength)&&options.maxLength>0?options.maxLength:DEFAULT_MAX_LENGTH;
    const modules=new Map();
    for(const raw of items||[]){
      const item=raw?.item||raw;
      if(!item||item.kind!==deps.HELPER_LIBRARY_KINDS.MODULE)continue;
      if(modules.has(item.id))throw new TypeError(`Duplicate module id: ${item.id}`);
      modules.set(item.id,item);
    }
    function expand(value,stack){
      if(stack.length>maxDepth)throw new Error(`Module expansion exceeds ${maxDepth} nested levels: ${stack.join(' → ')}`);
      const output=String(value==null?'':value).replace(MODULE_REFERENCE_PATTERN,(reference,id)=>{
        const module=modules.get(id);
        if(!module)throw new Error(`Unresolved module reference: ${reference}`);
        if(stack.includes(id))throw new Error(`Module reference cycle: ${[...stack,id].join(' → ')}`);
        return expand(module.text,[...stack,id]);
      });
      if(output.length>maxLength)throw new Error(`Resolved text exceeds ${maxLength} characters.`);
      return output;
    }
    const source=String(text==null?'':text),references=findModuleReferences(source),resolved=expand(source,[]);
    return{text:resolved,references};
  }

  return{MODULE_REFERENCE_PATTERN,DEFAULT_MAX_DEPTH,DEFAULT_MAX_LENGTH,moduleReference,findModuleReferences,resolveModuleReferences};
});
