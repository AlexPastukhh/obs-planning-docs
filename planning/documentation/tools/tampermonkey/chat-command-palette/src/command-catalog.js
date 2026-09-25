(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsPlanningHelper = Object.assign(root.ObsPlanningHelper || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const COMMANDS_PATH='planning/commands';
  function assert(condition, message) { if (!condition) throw new TypeError(message); }
  function commandPath(definition){return `${COMMANDS_PATH}/${definition.file}`;}

  function commandExecutionReferences(definition){return[...(definition?.includes||[]),...(definition?.processCalls||[]).map(call=>call.commandPath)];}

  function validateCommandCatalog(definitions, options = {}) {
    assert(Array.isArray(definitions), 'Command catalog must be an array.');
    const byId = new Map();
    const byCommand = new Map();
    const byAlias = new Map();
    const byFile = new Map();
    const byPath = new Map();
    for (const definition of definitions) {
      assert(definition && typeof definition === 'object', 'Catalog contains an invalid definition.');
      if (byId.has(definition.id)) throw new TypeError(`Duplicate command id: ${definition.id}`);
      if (byCommand.has(definition.command)) throw new TypeError(`Duplicate canonical command: ${definition.command}`);
      if (byFile.has(definition.file)) throw new TypeError(`Duplicate command file: ${definition.file}`);
      const path=commandPath(definition);
      if(byPath.has(path))throw new TypeError(`Duplicate command path: ${path}`);
      byId.set(definition.id, definition);
      byCommand.set(definition.command, definition);
      byFile.set(definition.file, definition);
      byPath.set(path, definition);
      for (const alias of definition.commandFamily || []) {
        if (byAlias.has(alias) && byAlias.get(alias).id !== definition.id) {
          throw new TypeError(`Ambiguous command alias ${alias}: ${byAlias.get(alias).id} vs ${definition.id}`);
        }
        byAlias.set(alias, definition);
      }
    }
    const allowMissingIncludes = options.allowMissingIncludes === true;
    for (const definition of definitions) for (const includedPath of commandExecutionReferences(definition)) {
      const included=byPath.get(includedPath);
      if (!included) {
        if (!allowMissingIncludes) throw new TypeError(`Unknown included command path or process call ${includedPath} in ${definition.id}`);
        continue;
      }
      if (included.id === definition.id) throw new TypeError(`Command ${definition.id} cannot include or call itself.`);
    }
    const visiting=new Set(),visited=new Set();
    function visit(id,stack=[]){
      if(visited.has(id))return;
      if(visiting.has(id))throw new TypeError(`Command include cycle / process-call cycle: ${[...stack,id].join(' -> ')}`);
      visiting.add(id);
      const definition=byId.get(id);
      for(const includedPath of commandExecutionReferences(definition)){const included=byPath.get(includedPath);if(included)visit(included.id,[...stack,id]);}
      visiting.delete(id);visited.add(id);
    }
    for(const definition of definitions)visit(definition.id);
    return { definitions: [...definitions], byId, byCommand, byAlias, byFile, byPath };
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
    const catalog=validateCommandCatalog(definitions,{allowMissingIncludes:true});
    const roots=[...new Set((Array.isArray(rootIds)?rootIds:[rootIds]).map(String).filter(Boolean))];
    for(const id of roots)assert(catalog.byId.has(id),`Unknown composition root command id: ${id}`);
    // Unrelated incomplete local drafts do not invalidate a fully resolved invocation.
    const checked=new Set();
    function checkReachable(definition){
      if(checked.has(definition.id))return;checked.add(definition.id);
      for(const path of commandExecutionReferences(definition)){
        const child=catalog.byPath.get(path);assert(child,`Unknown command execution path ${path} in ${definition.id}`);checkReachable(child);
      }
    }
    for(const id of roots)checkReachable(catalog.byId.get(id));
    const seen=new Set(),order=[];
    function visit(definition){
      if(seen.has(definition.id))return;
      for(const includedPath of definition.includes||[]){const included=catalog.byPath.get(includedPath);if(included)visit(included);}
      seen.add(definition.id);order.push(definition.id);
    }
    for(const id of roots)visit(catalog.byId.get(id));
    const nodes=order.map((id)=>catalog.byId.get(id));
    const contributions=[];
    for(const node of nodes){
      for(const item of node.compositionContributions||[])contributions.push({...item,sourceCommandId:node.id});
      const binding=node.methodologyBinding||{};
      if(binding.targetModuleId)contributions.push({kind:'SELECTED_TARGET_MODULE',value:binding.targetModuleId,why:'Registered Target Module selection contributed by command methodologyBinding before semantic execution.',sourceCommandId:node.id});
      if(binding.lensId)contributions.push({kind:'SELECTED_LENS',value:binding.lensId,why:'Registered Lens selection contributed by command methodologyBinding before semantic execution.',sourceCommandId:node.id});
    }
    const unique=[],seenContrib=new Set();for(const item of contributions){const key=`${item.kind}|${item.value}|${item.sourceCommandId}`;if(!seenContrib.has(key)){seenContrib.add(key);unique.push(item);}}
    const hasAffectedRecheck=unique.some((item)=>item.kind==='REVIEW_COVERAGE_MODE'&&item.value==='LOCAL_AFFECTED_RECHECK');
    const effective=hasAffectedRecheck?unique.filter((item)=>!(item.kind==='REVIEW_COVERAGE_MODE'&&item.value==='CURRENT_BASIS')):unique;
    return{rootIds:roots,order,nodes,contributions:effective,byId:catalog.byId,byPath:catalog.byPath,paths:nodes.map(commandPath)};
  }

  // Inventory is fully discovered before execution; child plans remain deferred.
  // Each call occurrence is activated by the executor at its owner point, not by this projection.
  function expandCommandInvocation(definitions,rootIds){
    const initial=expandCommandComposition(definitions,rootIds),processCalls=[],seen=new Set();
    function scan(plan){for(const node of plan.nodes){if(seen.has(node.id))continue;seen.add(node.id);
      for(const call of node.processCalls||[]){const child=initial.byPath.get(call.commandPath),composition=expandCommandComposition(definitions,[child.id]);processCalls.push({...call,callerId:node.id,composition});scan(composition);}
    }}scan(initial);return{initial,processCalls};
  }

  function explicitAnchorCount(source,anchor){
    const text=String(source||'').replace(/<!--[\s\S]*?-->/g,'');let fence=null,count=0;
    for(const line of text.split(/\r?\n/)){
      const marker=line.match(/^ {0,3}(\x60{3,}|~{3,})/);
      if(marker){if(!fence)fence={char:marker[1][0],length:marker[1].length};else if(marker[1][0]===fence.char&&marker[1].length>=fence.length&&line.slice(marker[0].length).trim()==='')fence=null;continue;}
      if(fence||/^(?: {4}|\t)/.test(line))continue;
      const visible=line.replace(/(\x60+).*?\1/g,'');
      for(const match of visible.matchAll(/(?<!\\)<a\s+id=["']([^"']+)["']\s*>\s*<\/a>/gi))if(match[1]===anchor)count++;
    }return count;
  }
  function validateProcessCallPoint(source,at){
    const count=explicitAnchorCount(source,at.anchor);
    assert(count===1,'Expected one process-call owner anchor '+at.path+'#'+at.anchor+'; found '+count+'.');
  }

  function commandReferencePaths(definition) {
    const paths = new Set();
    for (const call of definition?.processCalls || []) paths.add(call.at.path);
    for (const owner of definition?.ownerFiles || []) paths.add(owner);
    for (const ref of definition?.ownerRefs || []) if(ref?.path) paths.add(ref.path);
    for (const refinement of definition?.refinements || []) {
      for (const owner of refinement?.readRequired || []) paths.add(owner);
    }
    return [...paths].sort();
  }

  return { validateCommandCatalog, visibleCommandDefinitions, stripRuntimeCommandMetadata, replaceDefinitionsByFile, expandCommandComposition, expandCommandInvocation, explicitAnchorCount, validateProcessCallPoint, commandReferencePaths };
});
