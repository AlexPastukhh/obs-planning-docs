(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsPlanningHelper = Object.assign(root.ObsPlanningHelper || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  function assert(condition, message) { if (!condition) throw new TypeError(message); }

  function validateCommandCatalog(definitions, options = {}) {
    assert(Array.isArray(definitions), 'Command catalog must be an array.');
    const byId = new Map();
    const byCommand = new Map();
    const byAlias = new Map();
    const byFile = new Map();
    for (const definition of definitions) {
      assert(definition && typeof definition === 'object', 'Catalog contains an invalid definition.');
      if (byId.has(definition.id)) throw new TypeError(`Duplicate command id: ${definition.id}`);
      if (byCommand.has(definition.command)) throw new TypeError(`Duplicate canonical command: ${definition.command}`);
      if (byFile.has(definition.file)) throw new TypeError(`Duplicate command file: ${definition.file}`);
      byId.set(definition.id, definition);
      byCommand.set(definition.command, definition);
      byFile.set(definition.file, definition);
      for (const alias of definition.commandFamily || []) {
        if (byAlias.has(alias) && byAlias.get(alias).id !== definition.id) {
          throw new TypeError(`Ambiguous command alias ${alias}: ${byAlias.get(alias).id} vs ${definition.id}`);
        }
        byAlias.set(alias, definition);
      }
    }
    const allowMissingIncludes = options.allowMissingIncludes === true;
    for (const definition of definitions) for (const included of definition.includes || []) {
      if (!byId.has(included)) {
        if (!allowMissingIncludes) throw new TypeError(`Unknown included command id ${included} in ${definition.id}`);
        continue;
      }
      if (included === definition.id) throw new TypeError(`Command ${definition.id} cannot include itself.`);
    }
    const visiting=new Set(),visited=new Set();
    function visit(id,stack=[]){
      if(visited.has(id))return;
      if(visiting.has(id))throw new TypeError(`Command include cycle: ${[...stack,id].join(' -> ')}`);
      visiting.add(id);
      const definition=byId.get(id);
      for(const included of definition?.includes||[]){if(byId.has(included))visit(included,[...stack,id]);}
      visiting.delete(id);visited.add(id);
    }
    for(const definition of definitions)visit(definition.id);
    return { definitions: [...definitions], byId, byCommand, byAlias, byFile };
  }

  function visibleCommandDefinitions(definitions) {
    return validateCommandCatalog(definitions).definitions.filter((definition) => definition.palette === true);
  }

  function stripRuntimeCommandMetadata(definition) {
    const result = {};
    for (const [key, value] of Object.entries(definition || {})) {
      if (!key.startsWith('__') && key !== 'sourcePath' && key !== 'sourceSha') result[key] = value;
    }
    return result;
  }

  function replaceDefinitionsByFile(currentDefinitions, incomingDefinitions) {
    const map = new Map((currentDefinitions || []).map((definition) => [definition.file, definition]));
    for (const definition of incomingDefinitions || []) map.set(definition.file, definition);
    return [...map.values()].sort((a, b) => a.file.localeCompare(b.file));
  }



  function expandCommandComposition(definitions,rootIds){
    const catalog=validateCommandCatalog(definitions);
    const roots=[...new Set((Array.isArray(rootIds)?rootIds:[rootIds]).map(String).filter(Boolean))];
    for(const id of roots)assert(catalog.byId.has(id),`Unknown composition root command id: ${id}`);
    const seen=new Set(),order=[];
    function visit(id){
      if(seen.has(id))return;
      const definition=catalog.byId.get(id);
      for(const included of definition.includes||[])visit(included);
      seen.add(id);order.push(id);
    }
    for(const id of roots)visit(id);
    const nodes=order.map((id)=>catalog.byId.get(id));
    const contributions=[];
    for(const node of nodes){
      for(const item of node.compositionContributions||[])contributions.push({...item,sourceCommandId:node.id});
      const binding=node.methodologyBinding||{};
      if(binding.targetModuleId)contributions.push({kind:'SELECTED_TARGET_MODULE',value:binding.targetModuleId,why:'Registered Target Module selection contributed by command methodologyBinding before semantic execution.',sourceCommandId:node.id});
      if(binding.lensId)contributions.push({kind:'SELECTED_LENS',value:binding.lensId,why:'Registered Lens selection contributed by command methodologyBinding before semantic execution.',sourceCommandId:node.id});
    }
    const unique=[],seenContrib=new Set();for(const item of contributions){const key=`${item.kind}|${item.value}|${item.sourceCommandId}`;if(!seenContrib.has(key)){seenContrib.add(key);unique.push(item);}}
    return{rootIds:roots,order,nodes,contributions:unique,byId:catalog.byId};
  }

  function commandReferencePaths(definition) {
    const paths = new Set();
    for (const owner of definition?.ownerFiles || []) paths.add(owner);
    for (const ref of definition?.ownerRefs || []) if(ref?.path) paths.add(ref.path);
    for (const refinement of definition?.refinements || []) {
      for (const owner of refinement?.readRequired || []) paths.add(owner);
    }
    return [...paths].sort();
  }

  return { validateCommandCatalog, visibleCommandDefinitions, stripRuntimeCommandMetadata, replaceDefinitionsByFile, expandCommandComposition, commandReferencePaths };
});
