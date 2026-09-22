(function (root, factory) {
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  root.ObsPlanningHelper=Object.assign(root.ObsPlanningHelper||{},api);
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';

  // Use Cases/Target Modules/Lenses are semantic classifications inside the Commands
  // surface. USE_CASES remains exported only as a compatibility symbol for older caches/tests.
  const SURFACES=Object.freeze({COMMANDS:'Commands',SCENARIOS:'Scenarios',PROMPTS:'Prompts',USE_CASES:'Use Cases'});
  const MODE=Object.freeze({ADAPTIVE:'adaptive',FULL:'full'});
  const SEMANTIC_KINDS=Object.freeze({USE_CASE:'USE_CASE',TARGET_MODULE:'TARGET_MODULE',LENS:'LENS'});
  const PROVENANCE=Object.freeze({DIRECT:'DIRECT CURRENT',GENERIC:'GENERIC CURRENT',GENERATED:'GENERATED'});

  function safeLine(value,label){const text=String(value==null?'':value).trim();if(!text)throw new TypeError(`${label} is required.`);if(/[\r\n\u0000-\u001f\u007f]/.test(text))throw new TypeError(`${label} must be one safe line.`);return text;}
  function safePath(value,label){const text=safeLine(value,label).replace(/\\/g,'/');if(text.startsWith('/')||text.includes('://')||text.split('/').some((part)=>!part||part==='.'||part==='..'))throw new TypeError(`${label} must be a safe repository-relative path.`);return text;}
  function uniqueStrings(values,reader){const out=[];for(const raw of Array.isArray(values)?values:[]){const value=reader(raw);if(!out.includes(value))out.push(value);}return out;}

  function normalizeUseCaseDefinition(value){
    if(!value||typeof value!=='object')throw new TypeError('Use-Case definition must be an object.');
    const id=safeLine(value.id,'Use-Case id');if(!/^UC-[A-Z0-9-]+$/.test(id))throw new TypeError(`Invalid Use-Case id: ${id}`);
    const label=safeLine(value.label,`${id} label`),description=String(value.description||label).trim();
    const sources=uniqueStrings(value.sources,(v)=>safePath(v,`${id} source`));if(!sources.length)throw new TypeError(`Use-Case source registry is required: ${id}`);
    const instruction=String(value.instruction||'').trim();if(!instruction)throw new TypeError(`Use-Case instruction is required: ${id}`);
    const target=String(value.target||`<${label} target>`).trim(),commandId=String(value.commandId||'').trim();
    const result={id,label,description,sources,instruction,target,manualInvocation:value.manualInvocation!==false,trigger:String(value.trigger||'').trim(),result:String(value.result||'').trim()};if(commandId)result.commandId=commandId;return result;
  }
  function normalizeUseCaseDefinitions(values){const definitions=(Array.isArray(values)?values:[]).map(normalizeUseCaseDefinition);const ids=definitions.map((entry)=>entry.id);if(new Set(ids).size!==ids.length)throw new TypeError('Duplicate Use-Case ids in local/repository catalog.');return definitions;}

  function normalizeSemanticComponent(value){
    if(!value||typeof value!=='object')throw new TypeError('Semantic component must be an object.');
    const id=safeLine(value.id,'Semantic component id'),kind=safeLine(value.kind,`${id} kind`),scope=safeLine(value.scope||'Core',`${id} scope`);
    if(!Object.values(SEMANTIC_KINDS).includes(kind))throw new TypeError(`Unsupported semantic component kind: ${kind}`);
    if(kind===SEMANTIC_KINDS.USE_CASE&&!/^UC-[A-Z0-9-]+$/.test(id))throw new TypeError(`Invalid Use-Case component id: ${id}`);
    if(kind===SEMANTIC_KINDS.TARGET_MODULE&&!/^TM-[A-Z0-9-]+$/.test(id))throw new TypeError(`Invalid Target Module component id: ${id}`);
    if(kind===SEMANTIC_KINDS.LENS&&!/^LENS-[A-Z0-9-]+$/.test(id))throw new TypeError(`Invalid Lens component id: ${id}`);
    const label=safeLine(value.label||id,`${id} label`),actionLabel=safeLine(value.actionLabel||label,`${id} actionLabel`),description=String(value.description||label).trim();
    const sources=uniqueStrings(value.sources,(v)=>safePath(v,`${id} source`));if(!sources.length)throw new TypeError(`Semantic component sources are required: ${id}`);
    const aliases=uniqueStrings(value.aliases||[],(v)=>safeLine(v,`${id} alias`));
    const context=String(value.context||'').trim(),result=String(value.result||'').trim(),essence=String(value.essence||description||label).trim();
    const ownerRef=value.ownerRef&&typeof value.ownerRef==='object'?{semanticId:safeLine(value.ownerRef.semanticId||id,`${id} ownerRef semanticId`),path:safePath(value.ownerRef.path,`${id} ownerRef path`),anchor:safeLine(value.ownerRef.anchor,`${id} ownerRef anchor`),why:safeLine(value.ownerRef.why,`${id} ownerRef why`),role:safeLine(value.ownerRef.role||'PRIMARY_OWNER',`${id} ownerRef role`),readMode:safeLine(value.ownerRef.readMode||'REQUIRED',`${id} ownerRef readMode`)}:null;
    return{id,kind,scope,label,actionLabel,description,context,result,essence,sources,aliases,ownerRef,commandId:String(value.commandId||'').trim(),invocation:String(value.invocation||'').trim(),target:String(value.target||`<${label} target>`).trim()};
  }
  function normalizeSemanticComponents(values){const out=(Array.isArray(values)?values:[]).map(normalizeSemanticComponent),ids=out.map((x)=>x.id);if(new Set(ids).size!==ids.length)throw new TypeError('Duplicate semantic component ids.');return out;}

  function normalizeScenario(value){
    if(!value||typeof value!=='object')throw new TypeError('Scenario must be an object.');
    const id=safeLine(value.id,'Scenario id');if(!/^SCN-[A-Z0-9-]+$/.test(id))throw new TypeError(`Invalid Scenario id: ${id}`);
    const type=safeLine(value.type||'FOCUSED',`${id} type`),title=safeLine(value.title,`${id} title`),entryRoute=String(value.entryRoute||'').trim(),assumptions=(Array.isArray(value.assumptions)?value.assumptions:[]).map((x)=>String(x||'').trim()).filter(Boolean);
    const steps=(Array.isArray(value.steps)?value.steps:[]).map((step)=>{const sid=safeLine(step.id,`${id} step id`),stitle=safeLine(step.title,`${sid} title`),semanticRefs=uniqueStrings(step.semanticRefs||[],(x)=>safeLine(x,`${sid} semantic ref`)),canonicalText=String(step.canonicalText||'').trim();return{id:sid,title:stitle,semanticRefs,canonicalText};});
    if(!steps.length)throw new TypeError(`Scenario must contain steps: ${id}`);return{id,type,title,entryRoute,assumptions,steps,canonicalIntro:String(value.canonicalIntro||'').trim(),source:String(value.source||'').trim()};
  }
  function normalizeScenarios(values){const out=(Array.isArray(values)?values:[]).map(normalizeScenario),ids=out.map((x)=>x.id);if(new Set(ids).size!==ids.length)throw new TypeError('Duplicate scenario ids.');return out;}

  function readRule(mode,kind){if(mode===MODE.FULL)return [`Full ${kind} reading is required for this invocation.`,'Read every listed source, resolve the selected current entry and follow the complete relevant owner route.','Read materially defining principles/workflows/templates/integration rules reached by that route.','Do not expand into unrelated families.','Full changes read depth only; it does not expand permissions.'];return [`Use remembered ${kind} context only while clearly sufficient.`,'Resolve/read listed sources and the current owner route when not current, uncertain, changed or challenged.','Do not rely only on this compact prompt when ownership/status/boundaries are uncertain.'];}
  function buildSemanticBody(kind,definition,mode){
    const normalized=kind==='use_case'?normalizeUseCaseDefinition(definition):normalizeSemanticComponent(definition),marker=kind==='use_case'?'PLANNING_USE_CASE':'PLANNING_SEMANTIC_ENTRY',idField=kind==='use_case'?'use_case_id':`${kind}_id`;
    const lines=[`[${marker}]`,`${idField}:`,`  ${normalized.id}`,'',`${kind}:`,`  ${normalized.label}`,'','mode:',`  ${mode}`];
    if(kind==='use_case')lines.push('','semantic_owner:','  Use this Use Case as the current functional methodology-use guide: decide which methodology/documentation actions and components are relevant to the current situation, then follow the selected owner route. The Use Case does not replace specialized Target Module, Lens, profile or repository semantics.','', 'command_composition:', '  - methodology.use_cases.recheck', `  - ${normalized.id} (selected Use-Case owner/process)`, '  Fully resolve the registry-level applicability composition first. Selecting this Use Case does not execute every other Use Case; if this selected process later enters normal IDTSPE Shell work, its natural route supplies idtspe.work and the current Port Composition refresh.');
    else {
      lines.push('','semantic_owner:',`  Resolve and use ${normalized.id} as the current ${normalized.kind==='TARGET_MODULE'?'Target Module':'Lens'} owner. This Helper row is an invocation projection only.`);
      const isTarget=normalized.kind===SEMANTIC_KINDS.TARGET_MODULE;
      const base=isTarget?'idtspe.target-module.apply':'idtspe.lens.apply';
      const port=isTarget?'idtspe.port.target':'idtspe.port.lens';
      lines.push('','command_composition:',
        '  - idtspe.work',
        '  - idtspe.port-composition.recheck',
        '  - idtspe.port.trace',
        `  - ${port}`,
        `  - ${base}`,
        `  - ${normalized.id} (semantic owner selection)`,
        '  Fully expand ALL selected roots/includes before semantic execution, merge/deduplicate one DAG, collect explicit component/capability contributions, then execute dependencies before dependents. This concrete semantic component is the leaf action on its branch.');
      const ref=normalized.ownerRef;lines.push('','own_canonical_refs:',ref?`  - ${ref.semanticId} → \`${ref.path}#${ref.anchor}\` | role: ${ref.role}; read: ${ref.readMode}; why: ${ref.why}`:'  - resolve concrete component owner from current registry; shared registry/Meta-Model/port refs come from included commands.');
    }
    lines.push('','source_of_truth:',...(normalized.sources||[]).map((s)=>`  - \`${s}\``));
    if(kind==='use_case')lines.push('','route_resolution:','  Resolve this exact current Use-Case entry. Follow its current owner route and then the current owner links/read-order to every principle, workflow, template and integration rule materially defining this Use Case. Do not treat this Helper body as a frozen list of all future owner paths.');
    lines.push('','read_rule:',...readRule(mode,kind).map((x)=>`  ${x}`));
    if(kind==='use_case')lines.push('','instruction:',`  ${normalized.instruction}`);
    else if(normalized.invocation)lines.push('','canonical_invocation:',`  ${normalized.invocation}`);
    if(kind==='use_case')lines.push('','permission:','  Methodology-navigation/read context only. Use-Case activation does not grant executable-command, repository-mutation, archive, commit or push permission and does not itself perform specialized Target/Lens work.');
    else lines.push('','permission:','  Semantic invocation only. Mutation/test/package/commit/push permission is not granted by this projection; use the selected owner and host/session authority.');
    lines.push('','user_target:',`  ${normalized.target}`,`[/${marker}]`);return lines.join('\n');
  }
  function buildSemanticEntries(useCases=[]){const definitions=normalizeUseCaseDefinitions(useCases);return{[SURFACES.USE_CASES]:definitions.map((d)=>({...d,adaptiveBody:buildSemanticBody('use_case',d,MODE.ADAPTIVE),fullBody:buildSemanticBody('use_case',d,MODE.FULL)}))};}

  function semanticCardId(component){const c=normalizeSemanticComponent(component);return`${c.kind===SEMANTIC_KINDS.USE_CASE?'uc':c.kind===SEMANTIC_KINDS.TARGET_MODULE?'tm':'lens'}:${c.id}`;}
  function kindLabel(component){const c=normalizeSemanticComponent(component);return`${c.scope} ${c.kind===SEMANTIC_KINDS.USE_CASE?'UC':c.kind===SEMANTIC_KINDS.TARGET_MODULE?'TM':'Lens'}`;}
  function fullSemanticLabel(component){const c=normalizeSemanticComponent(component);return`${c.actionLabel} · ${kindLabel(c)} · ${c.id}`;}
  function componentMatchDefinition(component,definition){const c=component,d=definition||{},binding=d.methodologyBinding||{};if(c.kind===SEMANTIC_KINDS.USE_CASE)return Boolean(c.commandId)&&d.id===c.commandId;if(c.kind===SEMANTIC_KINDS.TARGET_MODULE)return binding.targetModuleId===c.id;if(c.kind===SEMANTIC_KINDS.LENS)return binding.lensId===c.id;return false;}
  function chooseDirectDefinition(component,definitions){const matches=(definitions||[]).filter((d)=>d.palette!==false&&componentMatchDefinition(component,d));if(!matches.length)return null;if(component.commandId){const exact=matches.find((d)=>d.id===component.commandId);if(exact)return exact;}if(component.kind===SEMANTIC_KINDS.TARGET_MODULE){const primary=matches.filter((d)=>d.methodologyBinding?.surfaceKind==='TARGET_MODULE');if(primary.length===1)return primary[0];if(primary.length>1)return primary.find((d)=>!String(d.description||'').toLowerCase().includes('legacy'))||primary[0];}if(matches.length===1)return matches[0];return null;}
  function entryRefs(entry){return new Set([entry.canonicalId,...(entry.scenarioRefs||[])].filter(Boolean));}
  function scenarioUsesForEntry(entry,scenarios){const refs=entryRefs(entry),uses=[];for(const scenario of scenarios||[])for(const step of scenario.steps||[])if((step.semanticRefs||[]).some((ref)=>refs.has(ref)))uses.push({scenarioId:scenario.id,scenarioTitle:scenario.title,stepId:step.id,stepTitle:step.title});return uses;}
  function attachScenarioUses(entries,scenarios){return(entries||[]).map((entry)=>({...entry,scenarioUses:scenarioUsesForEntry(entry,scenarios)}));}
  function commandEquivalentsForScenarioStep(entries,step){const refs=new Set(step?.semanticRefs||[]);return(entries||[]).filter((entry)=>[...entryRefs(entry)].some((ref)=>refs.has(ref)));}

  return{SURFACES,MODE,SEMANTIC_KINDS,SEMANTIC_PROVENANCE:PROVENANCE,normalizeUseCaseDefinition,normalizeUseCaseDefinitions,normalizeSemanticComponent,normalizeSemanticComponents,normalizeScenario,normalizeScenarios,buildSemanticBody,buildSemanticEntries,semanticCardId,kindLabel,fullSemanticLabel,chooseDirectDefinition,scenarioUsesForEntry,attachScenarioUses,commandEquivalentsForScenarioStep};
});
