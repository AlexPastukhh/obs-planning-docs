(function (root, factory) {
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  root.ObsPlanningHelper=Object.assign(root.ObsPlanningHelper||{},api);
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';

  const SURFACES=Object.freeze({COMMANDS:'Commands',USE_CASES:'Use Cases',PROMPTS:'Prompts'});
  const MODE=Object.freeze({ADAPTIVE:'adaptive',FULL:'full'});

  function safeLine(value,label){const text=String(value==null?'':value).trim();if(!text)throw new TypeError(`${label} is required.`);if(/[\r\n\u0000-\u001f\u007f]/.test(text))throw new TypeError(`${label} must be one safe line.`);return text;}
  function safePath(value,label){const text=safeLine(value,label).replace(/\\/g,'/');if(text.startsWith('/')||text.includes('://')||text.split('/').some((part)=>!part||part==='.'||part==='..'))throw new TypeError(`${label} must be a safe repository-relative path.`);return text;}
  function uniqueStrings(values,reader){const out=[];for(const raw of Array.isArray(values)?values:[]){const value=reader(raw);if(!out.includes(value))out.push(value);}return out;}

  function normalizeDirectionDefinition(value){const input=value&&typeof value==='object'?value:{};const id=safeLine(input.id,'Direction id');if(!/^DIR-[A-Z0-9-]+$/.test(id))throw new TypeError(`Invalid Direction id: ${id}`);const label=safeLine(input.label,'Direction label');const description=String(input.description||label).trim();const sources=uniqueStrings(input.sources,(v)=>safePath(v,`${id} source`));if(!sources.length)throw new TypeError(`Direction source is required: ${id}`);return{id,label,description,sources};}
  function normalizeDirectionDefinitions(values){const definitions=(Array.isArray(values)?values:[]).map(normalizeDirectionDefinition);const ids=definitions.map((entry)=>entry.id);if(new Set(ids).size!==ids.length)throw new TypeError('Duplicate Direction ids in local/repository catalog.');return definitions;}

  function normalizeUseCaseDefinition(value){
    if(!value||typeof value!=='object')throw new TypeError('Use-Case definition must be an object.');
    const id=safeLine(value.id,'Use-Case id');if(!/^UC-[A-Z0-9-]+$/.test(id))throw new TypeError(`Invalid Use-Case id: ${id}`);
    const label=safeLine(value.label,`${id} label`),description=String(value.description||label).trim();
    const sources=uniqueStrings(value.sources,(v)=>safePath(v,`${id} source`));if(!sources.length)throw new TypeError(`Use-Case source registry is required: ${id}`);
    const instruction=String(value.instruction||'').trim();if(!instruction)throw new TypeError(`Use-Case instruction is required: ${id}`);
    const target=String(value.target||`<${label} target>`).trim(),directionId=safeLine(value.directionId,`${id} directionId`);if(!/^DIR-[A-Z0-9-]+$/.test(directionId))throw new TypeError(`Invalid Use-Case Direction id: ${directionId}`);
    const commandId=String(value.commandId||'').trim();
    const result={id,label,description,sources,instruction,target,directionId,manualInvocation:value.manualInvocation!==false,trigger:String(value.trigger||'').trim(),result:String(value.result||'').trim()};if(commandId)result.commandId=commandId;return result;
  }
  function normalizeUseCaseDefinitions(values){const definitions=(Array.isArray(values)?values:[]).map(normalizeUseCaseDefinition);const ids=definitions.map((entry)=>entry.id);if(new Set(ids).size!==ids.length)throw new TypeError('Duplicate Use-Case ids in local/repository catalog.');return definitions;}
  function directionIdsForCommand(definition,useCases=[]){const linked=[...new Set(normalizeUseCaseDefinitions(useCases).filter((item)=>item.commandId===definition?.id).map((item)=>item.directionId))];if(linked.length)return linked;return uniqueStrings(definition?.directionIds,(v)=>safeLine(v,'command directionId')).filter((id)=>/^DIR-[A-Z0-9-]+$/.test(id));}

  function readRule(mode,kind){if(mode===MODE.FULL)return [`Full ${kind} reading is required for this invocation.`,'Read every listed source, resolve the selected current entry and follow the complete relevant owner route.','Read materially defining principles/workflows/templates/integration rules reached by that route.','Do not expand into unrelated families.','Full changes read depth only; it does not expand permissions.'];return [`Use remembered ${kind} context only while clearly sufficient.`,'Resolve/read listed sources and the current owner route when not current, uncertain, changed or challenged.','Do not rely only on this compact prompt when ownership/status/boundaries are uncertain.'];}
  function buildSemanticBody(kind,definition,mode){
    const normalized=kind==='use_case'?normalizeUseCaseDefinition(definition):definition,marker=kind==='use_case'?'PLANNING_USE_CASE':'PLANNING_SEMANTIC_ENTRY',idField=kind==='use_case'?'use_case_id':`${kind}_id`;
    const lines=[`[${marker}]`,`${idField}:`,`  ${normalized.id}`,'',`${kind}:`,`  ${normalized.label}`,'','mode:',`  ${mode}`];
    if(kind==='use_case')lines.push('','semantic_owner:','  Work in this Use Case as the current semantic planning unit. Neighboring responsibilities are inputs/integration context unless the selected owner route explicitly requires them.');
    lines.push('','source_of_truth:',...(normalized.sources||[]).map((s)=>`  - \`${s}\``));
    if(kind==='use_case')lines.push('','route_resolution:','  Resolve this exact current Use-Case entry. Follow its current Main Owner / Owner Route and then the current owner links/read-order to every principle, workflow, template and integration rule materially defining this Use Case. Do not treat this Helper body as a frozen list of all future owner paths.');
    lines.push('','read_rule:',...readRule(mode,kind).map((x)=>`  ${x}`),'','instruction:',`  ${normalized.instruction}`);
    if(kind==='use_case')lines.push('','permission:','  Semantic planning/read context only. Use-Case activation does not grant executable-command, repository-mutation, archive, commit or push permission.');
    lines.push('','user_target:',`  ${normalized.target}`,`[/${marker}]`);return lines.join('\n');
  }
  function buildSemanticEntries(useCases=[]){const definitions=normalizeUseCaseDefinitions(useCases);return{[SURFACES.USE_CASES]:definitions.map((d)=>({...d,adaptiveBody:buildSemanticBody('use_case',d,MODE.ADAPTIVE),fullBody:buildSemanticBody('use_case',d,MODE.FULL)}))};}

  return{SURFACES,MODE,normalizeDirectionDefinition,normalizeDirectionDefinitions,normalizeUseCaseDefinition,normalizeUseCaseDefinitions,directionIdsForCommand,buildSemanticBody,buildSemanticEntries};
});
