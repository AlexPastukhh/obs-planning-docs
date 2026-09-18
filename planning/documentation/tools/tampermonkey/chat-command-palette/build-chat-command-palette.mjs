import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require=createRequire(import.meta.url);
const moduleRoot=path.dirname(fileURLToPath(import.meta.url));
const repoRoot=path.resolve(moduleRoot,'../../../../..');
const commandsDir=path.join(repoRoot,'planning','commands');
const outputPath=path.resolve(moduleRoot,'..','chat-command-palette.user.js');
const seedDir=path.join(moduleRoot,'seed');
const commandSeedPath=path.join(seedDir,'commands.json');
const useCaseSeedPath=path.join(seedDir,'use-cases.json');
const semanticComponentSeedPath=path.join(seedDir,'semantic-components.json');
const scenarioSeedPath=path.join(seedDir,'scenarios.json');
const useCaseRegistryMapPath='planning/documentation/use-case-registry-map.md';
const scenarioSourcePaths=[
  'planning/documentation/idtspe-methodology/active/idtspe-core/shared/methodology-use-case-scenario-map.md',
  'planning/documentation/repository-scenarios/SCN-06-BUILD-AND-VERIFY-REPLACEMENT-PACKAGE.md'
];
const coreTargetRegistryPath='planning/documentation/idtspe-methodology/active/idtspe-core/target-modules/README.md';
const sdsTargetRegistryPath='planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/README.md';
const coreLensRegistryPath='planning/documentation/idtspe-methodology/active/idtspe-core/lenses/README.md';
const sdsLensRegistryPath='planning/documentation/idtspe-methodology/active/profiles/sds/lenses/README.md';
const check=process.argv.includes('--check');
const codec=require('./src/command-definition-codec.js');
const catalog=require('./src/command-catalog.js');
const semantic=require('./src/semantic-projections.js');
const pkg=JSON.parse(fs.readFileSync(path.join(moduleRoot,'package.json'),'utf8'));
const sourceFiles=['src/command-definition-codec.js','src/command-catalog.js','src/command-body.js','src/semantic-projections.js','src/helper-library-codec.js','src/chat-recovery.js','src/github-contents-client.js','src/repository-command-service.js','src/repository-helper-library-service.js','src/repository-catalog-service.js','src/planning-helper-state.js','src/composer-insertion.js','src/methodology-navigation.js','src/command-side-effects.js','src/planning-helper-ui.js','src/planning-helper-runtime.js'];

function readCommands(){
  const files=fs.readdirSync(commandsDir,{withFileTypes:true}).filter((entry)=>entry.isFile()&&/^[a-z0-9][a-z0-9._-]*\.command\.md$/.test(entry.name)).map((entry)=>entry.name).sort();
  const definitions=files.map((file)=>codec.parseCommandDefinitionDocument(fs.readFileSync(path.join(commandsDir,file),'utf8'),{path:`planning/commands/${file}`}));
  catalog.validateCommandCatalog(definitions);if(!definitions.length)throw new Error('No repository command definitions found.');
  for(const definition of definitions)for(const owner of catalog.commandReferencePaths(definition))if(!fs.existsSync(path.join(repoRoot,owner)))throw new Error(`Missing owner/refinement path for ${definition.id}: ${owner}`);
  return definitions.map(catalog.stripRuntimeCommandMetadata);
}
function splitRow(line){return line.trim().replace(/^\|/,'').replace(/\|$/,'').split('|').map((v)=>v.trim());}
function cleanCell(v){return String(v||'').replace(/`/g,'').trim();}
function plainCell(v){return cleanCell(String(v||'').replace(/\[([^\]]+)\]\([^)]+\)/g,'$1'));}
function compactMarkdown(v){return String(v||'').replace(/<!--.*?-->/gs,' ').replace(/`([^`]+)`/g,'$1').replace(/\[([^\]]+)\]\([^)]+\)/g,'$1').replace(/^[ \t]*[-*+]\s+/gm,'').replace(/^[ \t]*\d+\.\s+/gm,'').replace(/\s+/g,' ').trim();}
function commandIdForCell(cell,commands){const text=cleanCell(cell).toLowerCase();if(!text||text==='none'||text.startsWith('none ')||text.startsWith('supports '))return'';const matches=[];for(const def of commands)for(const aliasRaw of def.commandFamily||[]){const alias=String(aliasRaw).trim().toLowerCase();if(!alias)continue;if(text===alias||text.startsWith(`${alias} `)||text.startsWith(`${alias}.`)||text.startsWith(`${alias},`)||text.startsWith(`${alias};`)||text.startsWith(`${alias}:`))matches.push({id:def.id,alias});}matches.sort((a,b)=>b.alias.length-a.alias.length||a.id.localeCompare(b.id));return matches[0]?.id||'';}
function markdownLinkTargets(cell){const out=[];for(const match of String(cell||'').matchAll(/\[[^\]]+\]\(([^)]+)\)/g)){const target=String(match[1]||'').trim().split('#')[0];if(target&&!out.includes(target))out.push(target);}return out;}
function resolveRegistryTarget(rel,target){const value=String(target||'').trim().split('#')[0];if(!value)return'';const registryAbs=path.join(repoRoot,rel),resolved=path.resolve(path.dirname(registryAbs),value);const relative=path.relative(repoRoot,resolved).replaceAll(path.sep,'/');return relative.startsWith('../')?'':relative;}
function readUseCaseOwner(rel,ownerCell){const target=markdownLinkTargets(ownerCell)[0];if(!target)return null;const ownerRel=resolveRegistryTarget(rel,target);if(!ownerRel)return null;const ownerAbs=path.join(repoRoot,ownerRel);if(!fs.existsSync(ownerAbs)||!fs.statSync(ownerAbs).isFile())return null;const text=fs.readFileSync(ownerAbs,'utf8'),lines=text.split(/\r?\n/);function section(name){const start=lines.findIndex((line)=>new RegExp(`^##\\s+${name}\\s*$`,'i').test(line.trim()));if(start<0)return'';const out=[];for(let i=start+1;i<lines.length;i++){if(/^##\s+/.test(lines[i]))break;out.push(lines[i]);}return compactMarkdown(out.join('\n'));}return{path:ownerRel,situation:section('Situation'),result:section('Result')};}
function projectedItem(raw,rel,commands){
  const id=cleanCell(raw.id),status=cleanCell(raw.status).toLowerCase();if(!id||status.includes('retired')||status.includes('historical'))return null;
  const label=plainCell(raw.name||raw['use case']);if(!label)return null;
  const ownerCell=raw.owner||raw['owner / current route']||raw['owner route']||raw['main owner']||'',ownerInfo=readUseCaseOwner(rel,ownerCell);
  const purpose=cleanCell(raw.purpose),trigger=compactMarkdown(raw['trigger / input']||raw['trigger / accepted input'])||ownerInfo?.situation||'',result=compactMarkdown(raw['result / end state']||raw.result)||ownerInfo?.result||'';
  const owner=ownerInfo?.path||plainCell(ownerCell),related=raw['related command']||'',commandId=commandIdForCell(related,commands);
  const item={id,label,description:purpose||result||label,sources:[useCaseRegistryMapPath,rel],instruction:`Resolve ${id} through ${useCaseRegistryMapPath}, then the mapped scoped registry and current owner route${owner?` (${owner})`:''}. Preserve its methodology-use boundary and permission model; this Helper projection is invocation/navigation only.`,target:`<${label} target>`,manualInvocation:true,trigger,result};if(commandId)item.commandId=commandId;return semantic.normalizeUseCaseDefinition(item);
}
function readMappedUseCaseRegistryPaths(){
  const mapAbs=path.join(repoRoot,useCaseRegistryMapPath);if(!fs.existsSync(mapAbs))throw new Error(`Missing methodology Use-Case Registry Map: ${useCaseRegistryMapPath}`);
  const lines=fs.readFileSync(mapAbs,'utf8').split(/\r?\n/);let inRegistryMap=false;const out=[];
  for(const line of lines){
    if(/^##\s+Registry Map\s*$/i.test(line.trim())){inRegistryMap=true;continue;}
    if(inRegistryMap&&/^##\s+/.test(line.trim()))break;
    if(!inRegistryMap)continue;
    for(const target of markdownLinkTargets(line)){const rel=resolveRegistryTarget(useCaseRegistryMapPath,target);if(!rel||!rel.toLowerCase().endsWith('.md'))continue;if(!fs.existsSync(path.join(repoRoot,rel)))throw new Error(`Mapped Use-Case Registry is missing: ${rel}`);if(!out.includes(rel))out.push(rel);}
  }
  if(!out.length)throw new Error(`No scoped Use-Case registries mapped by ${useCaseRegistryMapPath}`);return out;
}
function readCanonicalUseCases(commands){
  const byId=new Map();
  function add(item,rel){if(!item)return;const previous=byId.get(item.id);if(previous)throw new Error(`Duplicate mapped Use-Case ${item.id} discovered in ${previous.rel} and ${rel}.`);byId.set(item.id,{item,rel});}
  for(const rel of readMappedUseCaseRegistryPaths()){
    const file=path.join(repoRoot,rel),lines=fs.readFileSync(file,'utf8').split(/\r?\n/),status=cleanCell(lines.find((line)=>/^Status:/i.test(line))||'').toLowerCase();if(status.includes('legacy')||status.includes('historical')||status.includes('compatibility'))throw new Error(`Registry Map points to non-current Use-Case registry: ${rel}`);let headers=null;
    for(const line of lines){if(/^\|\s*ID\s*\|/i.test(line)){headers=splitRow(line).map((x)=>cleanCell(x).toLowerCase());continue;}if(!headers||!/^\|\s*`UC-[A-Z0-9-]+`\s*\|/.test(line))continue;const cells=splitRow(line),row={};headers.forEach((h,i)=>row[h]=cells[i]||'');add(projectedItem(row,rel,commands),rel);}
    let section=null;const flush=()=>{if(section){add(projectedItem(section,rel,commands),rel);section=null;}};
    for(const line of lines){const h=line.match(/^##\s+`(UC-[A-Z0-9-]+)`\s+—\s+(.+)$/);if(h){flush();section={id:h[1],name:h[2]};continue;}if(!section)continue;const field=line.match(/^\*\*([^*]+):\*\*\s*(.*)$/);if(field)section[cleanCell(field[1]).toLowerCase()]=field[2];}
    flush();
  }
  const definitions=semantic.normalizeUseCaseDefinitions([...byId.values()].map((entry)=>entry.item));if(!definitions.length)throw new Error('No mapped methodology Use Cases discovered.');return definitions.sort((a,b)=>a.id.localeCompare(b.id));
}

const UC_COMMAND_IDS=Object.freeze({'UC-IDTSPE-COMPOSE-CURRENT-WORK':'plan.now'});
const ACTION_LABELS=Object.freeze({
  'UC-IDTSPE-COMPOSE-CURRENT-WORK':'Определить состав текущей methodology work',
  'UC-IDTSPE-INTEGRATE-CURRENT-WORK':'Интегрировать текущую работу',
  'UC-IDTSPE-MAINTAIN-CURRENT-WORK-STATE':'Поддерживать состояние текущей работы',
  'UC-IDTSPE-MAINTAIN-TARGET-MODULE':'Поддерживать Target Module',
  'UC-IDTSPE-MAINTAIN-LENS':'Поддерживать reusable Lens',
  'UC-IDTSPE-REVALIDATE-CURRENT-WORK':'Перевалидировать текущую работу',
  'UC-DOC-PLAN-DOCUMENTATION-CHANGE':'Спланировать изменение документации',
  'UC-DOC-REVIEW-DOCUMENTATION':'Проверить документацию',
  'UC-DOC-USE-REPOSITORY-GUIDANCE':'Подобрать repository guidance',
  'TM-PRE-UPDATE-PLAN':'План обновления',
  'TM-EXACT-REALIZATION':'Точная реализация',
  'TM-APPLICATION-DEFINITION':'Определить приложение',
  'TM-FEATURE':'Спланировать Feature',
  'TM-PROTOTYPE':'Спланировать Prototype',
  'TM-SCENARIO-PLANNING':'Спланировать Scenario',
  'TM-SCREEN':'Спланировать Screen',
  'TM-DOMAIN-DISCOVERY':'Исследовать Domain',
  'TM-DOMAIN-OWNER':'Сформировать Domain Owner',
  'TM-IMPLEMENTATION-SLICE':'Исследовать Implementation Slice',
  'TM-SLICE-OWNER':'Сформировать Slice Owner',
  'TM-SHARED-IMPLEMENTATION-CAPABILITY':'Спланировать Shared Capability',
  'TM-EVOLUTION-STEP':'Спланировать Evolution Step',
  'TM-EVOLUTION-STEPS-MAP':'Спланировать Evolution Map',
  'TM-PRACTICAL-TEST':'Спланировать Practical Test',
  'LENS-NEED-VALUE-SCOPE':'Need / Value / Scope',
  'LENS-AUTHORITY-SOT-REUSE':'Authority / Source of Truth / Reuse',
  'LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY':'Uncertainty / Assumptions / Reversibility',
  'LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY':'Documentation / Representation',
  'LENS-DEPENDENCY-CHANGE-IMPACT':'Dependency / Change Impact',
  'LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY':'Verifiability / Observability / Operability',
  'LENS-QUALITY-RISK-MATERIALITY':'Quality / Risk / Materiality',
  'LENS-SIMPLICITY-IMPLEMENTATION-ECONOMY':'Simplicity / Implementation Economy',
  'LENS-DOMAIN-MODELING-DDD':'Domain Modeling / DDD',
  'LENS-SLICE-VERTICALITY-INTEGRATION':'Slice Verticality / Integration',
  'LENS-PRACTICAL-EVIDENCE':'Prototype / Practical Evidence',
  'LENS-TEST-PROOF-EVIDENCE':'Test Proof / Evidence Quality',
  'LENS-APPLICATION-BOUNDARY-FEASIBILITY':'Application Boundary / Alternatives / Feasibility',
  'LENS-IMPLEMENTATION-REQUIREMENTS-DISCOVERY':'Implementation Requirements',
  'LENS-TERMS-UBIQUITOUS-LANGUAGE':'Terms / Ubiquitous Language',
  'LENS-UI-SPATIAL-FRONTEND-REALIZATION':'Screen / UI / Frontend Realization',
  'LENS-WORKSPACE-EVOLUTION-ARCHITECTURE':'Evolution Impact / Change Isolation'
});
function headingTitle(rel,id){const text=fs.readFileSync(path.join(repoRoot,rel),'utf8'),first=text.split(/\r?\n/).find((line)=>line.startsWith('# '))||id;return first.replace(/^#\s+/,'').replace(new RegExp(`^${id.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}\\s*[—-]\\s*`),'').trim()||id;}
function ownerSection(rel,names){
  const lines=fs.readFileSync(path.join(repoRoot,rel),'utf8').split(/\r?\n/),wanted=(names||[]).map((name)=>String(name).trim().toLowerCase());
  for(let i=0;i<lines.length;i++){
    const match=lines[i].match(/^(#{2,4})\s+(.+?)\s*$/);if(!match)continue;
    const title=cleanCell(match[2]).toLowerCase();if(!wanted.some((name)=>title===name||title.startsWith(`${name} —`)||title.startsWith(`${name} /`)))continue;
    const level=match[1].length,out=[];for(let j=i+1;j<lines.length;j++){const next=lines[j].match(/^(#{1,6})\s+/);if(next&&next[1].length<=level)break;out.push(lines[j]);}
    const text=compactMarkdown(out.join('\n'));if(text)return text.length>900?`${text.slice(0,897).trim()}…`:text;
  }
  return'';
}
function ownerExplanation(rel,kind,fallback=''){
  const essence=ownerSection(rel,['Purpose'])||compactMarkdown(fallback);
  if(kind==='TARGET_MODULE')return{context:ownerSection(rel,['Situation','Result Unit Applicability / Materiality','Applicability'])||compactMarkdown(fallback),result:ownerSection(rel,['Result','Target Step-Result Contract'])||compactMarkdown(fallback),essence};
  return{context:ownerSection(rel,['Applicability Gate','Applicability','Situation'])||compactMarkdown(fallback),result:ownerSection(rel,['Result','Findings / Outputs','Output / Disposition','Primary Result Units / Semantic Selectors'])||compactMarkdown(fallback),essence};
}
function relativeFromRegistry(registryPath,target){return resolveRegistryTarget(registryPath,target);}
function registryAliases(text,prefix){const map=new Map();for(const m of text.matchAll(/^\s*([^\s#][^→\n]*?)\s*→\s*(`?(?:TM|LENS)-[A-Z0-9-]+`?)/gm)){const id=cleanCell(m[2]),alias=cleanCell(m[1]).split(/\s+/)[0];if(id.startsWith(prefix)&&alias&&!map.has(id))map.set(id,alias);}return map;}
function currentTargetRows(registryPath,scope){
  const text=fs.readFileSync(path.join(repoRoot,registryPath),'utf8');let body=text;
  if(scope==='Core')body=(text.split('## Installed Generic Core Target Modules')[1]||'').split('## Generic `idtspe` Invocation Aliases')[0]||'';
  else body=(text.split('## Active SDS Target Modules')[1]||'').split('## Retired / Subsumed Baseline Modules')[0]||'';
  const rows=[],seen=new Set();
  for(const m of body.matchAll(/\[`(TM-[A-Z0-9-]+)`\]\(([^)]+)\)(?:\s*\|\s*([^|\n]+)\s*\|\s*([^\n|]+)|\s*—\s*([^\n]+))/g)){
    const id=m[1];if(seen.has(id))continue;const rel=relativeFromRegistry(registryPath,m[2]);if(!rel||!fs.existsSync(path.join(repoRoot,rel)))continue;seen.add(id);
    const aliasCell=cleanCell(m[3]||''),alias=(aliasCell.match(/`([^`]+)`/)||[])[1]||'';const description=compactMarkdown(m[4]||m[5]||headingTitle(rel,id)),explanation=ownerExplanation(rel,'TARGET_MODULE',description);
    rows.push({id,kind:'TARGET_MODULE',scope,label:headingTitle(rel,id),actionLabel:ACTION_LABELS[id]||headingTitle(rel,id),description,...explanation,sources:[registryPath,rel],aliases:alias?[alias]:[],invocation:`idtspe tm ${alias||id} <target>`,target:`<${ACTION_LABELS[id]||headingTitle(rel,id)} target>`});
  }
  if(scope==='Core'){
    // Core list is prose bullets rather than a table; ensure both current modules are captured.
    for(const id of ['TM-PRE-UPDATE-PLAN','TM-EXACT-REALIZATION'])if(!seen.has(id)){const match=body.match(new RegExp('\\[`'+id+'`\\]\\(([^)]+)\\)'));if(match){const rel=relativeFromRegistry(registryPath,match[1]),alias=id==='TM-PRE-UPDATE-PLAN'?'pre-update':'exact',description=headingTitle(rel,id),explanation=ownerExplanation(rel,'TARGET_MODULE',description);rows.push({id,kind:'TARGET_MODULE',scope,label:headingTitle(rel,id),actionLabel:ACTION_LABELS[id]||headingTitle(rel,id),description,...explanation,sources:[registryPath,rel],aliases:[alias],invocation:`idtspe tm ${alias} <target>`,target:`<${ACTION_LABELS[id]||headingTitle(rel,id)} target>`});}}
  }
  return rows;
}
function currentLensRows(registryPath,scope){
  const text=fs.readFileSync(path.join(repoRoot,registryPath),'utf8'),aliases=registryAliases(text,'LENS-');let body=text;
  if(scope==='SDS')body=(text.split('## SDS-Specific Lens Registry')[1]||'').split('## Generic `idtspe` SDS Lens Aliases')[0]||'';
  else body=text.split('## 3A. Generic `idtspe` Lens Aliases')[0]||text;
  const rows=[],seen=new Set();
  for(const m of body.matchAll(/\[`(LENS-[A-Z0-9-]+)`\]\(([^)]+)\)\s*\|\s*([^\n|]+)/g)){
    const id=m[1];if(seen.has(id))continue;const rel=relativeFromRegistry(registryPath,m[2]);if(!rel||!fs.existsSync(path.join(repoRoot,rel)))continue;seen.add(id);const alias=aliases.get(id)||'';
    const description=compactMarkdown(m[3])||headingTitle(rel,id),explanation=ownerExplanation(rel,'LENS',description);
    rows.push({id,kind:'LENS',scope,label:headingTitle(rel,id),actionLabel:ACTION_LABELS[id]||headingTitle(rel,id),description,...explanation,sources:[registryPath,rel],aliases:alias?[alias]:[],invocation:`idtspe lens ${alias||id} <target/context>`,target:`<${ACTION_LABELS[id]||headingTitle(rel,id)} analysis surface>`});
  }
  return rows;
}
function readCanonicalSemanticComponents(commands,useCases){
  const ucComponents=useCases.map((uc)=>({id:uc.id,kind:'USE_CASE',scope:uc.id.startsWith('UC-DOC-')?'Documentation':'Core',label:uc.label,actionLabel:ACTION_LABELS[uc.id]||uc.label,description:uc.description,context:uc.trigger||uc.description,result:uc.result||uc.description,essence:uc.description,sources:uc.sources,aliases:[],commandId:UC_COMMAND_IDS[uc.id]||uc.commandId||'',invocation:'',target:uc.target}));
  const all=[...ucComponents,...currentTargetRows(coreTargetRegistryPath,'Core'),...currentTargetRows(sdsTargetRegistryPath,'SDS'),...currentLensRows(coreLensRegistryPath,'Core'),...currentLensRows(sdsLensRegistryPath,'SDS')];
  return semantic.normalizeSemanticComponents(all).sort((a,b)=>a.kind.localeCompare(b.kind)||a.scope.localeCompare(b.scope)||a.id.localeCompare(b.id));
}
function readCanonicalScenarios(){
  const items=[],seen=new Set();
  for(const scenarioSourcePath of scenarioSourcePaths){
    const text=fs.readFileSync(path.join(repoRoot,scenarioSourcePath),'utf8'),presentation=new Map();
    for(const section of text.matchAll(/^##\s+(?:\d+\.\s+)?`(SCN-[A-Z0-9-]+)`[^\n]*\n([\s\S]*?)(?=^##\s+(?:\d+\.\s+)?`SCN-|(?![\s\S]))/gm)){
      const scenarioId=section[1],sectionText=section[0],firstStep=sectionText.search(/^### Step /m),marker=sectionText.search(/^\[(?:METHODOLOGY_SCENARIO|WORKING_SCENARIO)\]/m),introEnd=firstStep>=0?firstStep:(marker>=0?marker:sectionText.length),canonicalIntro=sectionText.slice(0,introEnd).trim(),steps=new Map();
      for(const step of sectionText.matchAll(/^### Step `([^`]+)`[^\n]*\n[\s\S]*?(?=^### Step |^\[(?:METHODOLOGY_SCENARIO|WORKING_SCENARIO)\]|(?![\s\S]))/gm))steps.set(step[1],step[0].trim());
      presentation.set(scenarioId,{canonicalIntro,steps});
    }
    for(const marker of ['METHODOLOGY_SCENARIO','WORKING_SCENARIO'])for(const match of text.matchAll(new RegExp(`\\[${marker}\\]\\s*([\\s\\S]*?)\\s*\\[\\/${marker}\\]`,'g'))){
      const item=JSON.parse(match[1]);if(seen.has(item.id))throw new Error(`Duplicate canonical working Scenario id: ${item.id}`);seen.add(item.id);const view=presentation.get(item.id);item.source=scenarioSourcePath;item.canonicalIntro=view?.canonicalIntro||'';item.steps=(item.steps||[]).map((step)=>({...step,canonicalText:view?.steps.get(step.id)||''}));items.push(item);
    }
  }
  const scenarios=semantic.normalizeScenarios(items);if(!scenarios.length)throw new Error(`No canonical working Scenarios found in ${scenarioSourcePaths.join(', ')}.`);for(const scenario of scenarios){if(!scenario.canonicalIntro)throw new Error(`Canonical scenario intro was not projected: ${scenario.id}`);for(const step of scenario.steps)if(!step.canonicalText)throw new Error(`Canonical scenario step prose was not projected: ${step.id}`);}return scenarios.sort((a,b)=>a.id.localeCompare(b.id));
}
function seedText(kind,items){const generatedFrom=kind==='planning-command-seed'?'planning/commands/*.command.md':kind==='use-case-seed'?`${useCaseRegistryMapPath} -> mapped current scoped methodology Use-Case registries only`:kind==='semantic-component-seed'?`${useCaseRegistryMapPath} + current Core/SDS Target Module and Lens registries`:scenarioSourcePaths.join(' + ');return JSON.stringify({schemaVersion:1,kind,generatedFrom,items},null,2)+'\n';}
function ensureSeed(pathname,expected){if(check){const actual=fs.existsSync(pathname)?fs.readFileSync(pathname,'utf8'):'';if(actual!==expected)throw new Error(`Generated seed catalog is stale: ${path.relative(repoRoot,pathname)}`);return;}fs.mkdirSync(path.dirname(pathname),{recursive:true});fs.writeFileSync(pathname,expected,'utf8');}
function build(){
  const definitions=readCommands(),useCases=readCanonicalUseCases(definitions),semanticComponents=readCanonicalSemanticComponents(definitions,useCases),scenarios=readCanonicalScenarios();
  ensureSeed(commandSeedPath,seedText('planning-command-seed',definitions));
  ensureSeed(useCaseSeedPath,seedText('use-case-seed',useCases));
  ensureSeed(semanticComponentSeedPath,seedText('semantic-component-seed',semanticComponents));
  ensureSeed(scenarioSeedPath,seedText('scenario-seed',scenarios));
  const header=`// ==UserScript==\n// @name         Reusable Chat Planning Helper\n// @namespace    https://github.com/AlexPastukhh/obs/reusable-docs\n// @version      ${pkg.version}-repository-command-registry\n// @description  RAM-first OBS Planning Helper with semantic Commands, canonical Scenarios, prompts and explicit repository actions.\n// @author       Reusable docs layer\n// @match        https://chatgpt.com/*\n// @match        https://chat.openai.com/*\n// @run-at       document-idle\n// @grant        GM_getValue\n// @grant        GM_setValue\n// @grant        GM_xmlhttpRequest\n// @connect      api.github.com\n// ==/UserScript==\n\n// GENERATED FILE — DO NOT EDIT MANUALLY.\n// Runtime source: planning/documentation/tools/tampermonkey/chat-command-palette/src/**\n// GitHub command authority: planning/commands/*.command.md\n// GitHub Use-Case projection root: planning/documentation/use-case-registry-map.md -> mapped current scoped methodology Use-Case registries only.\n// seed/use-cases.json is the build-verified GitHub-backed Use-Case projection used for explicit Hard Reload.\n// GitHub UI-order source: planning/documentation/tools/tampermonkey/chat-command-palette/catalog-order.json\n// Local snapshot is the working cache; current command/semantic/scenario catalogs are not embedded in this userscript.\n// Build: node planning/documentation/tools/tampermonkey/chat-command-palette/build-chat-command-palette.mjs\n\n`;
  const modules=sourceFiles.map((relative)=>fs.readFileSync(path.join(moduleRoot,relative),'utf8').trimEnd()).join('\n\n');
  const bootstrap=`\n\n(function(){\n  'use strict';\n  const api=globalThis.ObsPlanningHelper;if(!api||typeof api.startPlanningHelper!=='function')throw new Error('OBS Planning Helper runtime was not built correctly.');api.startPlanningHelper().catch((error)=>console.error('[OBS Planning Helper startup]',error));\n})();\n`;
  return header+modules+bootstrap;
}

const expected=build();
if(check){const current=fs.existsSync(outputPath)?fs.readFileSync(outputPath,'utf8'):'';if(current!==expected)throw new Error('Generated Planning Helper userscript is stale.');console.log('Generated userscript and GitHub-backed Command/Semantic/Scenario catalogs match current sources.');}
else{fs.writeFileSync(outputPath,expected,'utf8');console.log(`Built ${path.relative(repoRoot,outputPath)} and GitHub-backed Command/Semantic/Scenario catalogs.`);}
