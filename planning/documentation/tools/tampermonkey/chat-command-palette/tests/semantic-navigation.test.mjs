import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const moduleRoot=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const repoRoot=path.resolve(moduleRoot,'../../../../..');
const semantic=require('../src/semantic-projections.js');
const codec=require('../src/command-definition-codec.js');
const useCases=semantic.normalizeUseCaseDefinitions(JSON.parse(fs.readFileSync(path.join(moduleRoot,'seed/use-cases.json'),'utf8')).items);
const read=(rel)=>fs.readFileSync(path.join(repoRoot,rel),'utf8');
function mappedMethodologyRegistryPaths(){
  const mapRel='planning/documentation/use-case-registry-map.md';
  const lines=read(mapRel).split(/\r?\n/);
  let active=false;const out=[];
  for(const line of lines){
    if(/^##\s+Registry Map\s*$/i.test(line.trim())){active=true;continue}
    if(active&&/^##\s+/.test(line.trim()))break;
    if(!active)continue;
    for(const m of line.matchAll(/\[[^\]]+\]\(([^)#]+)(?:#[^)]+)?\)/g)){
      const rel=path.posix.normalize(path.posix.join(path.posix.dirname(mapRel),m[1]));
      if(!out.includes(rel))out.push(rel);
    }
  }
  return out;
}
function canonicalMethodologyUcIds(){
  const ids=[];
  for(const rel of mappedMethodologyRegistryPaths()){
    for(const line of read(rel).split(/\r?\n/)){
      let m=line.match(/^#{2,3} `((?:UC-[A-Z0-9-]+))` — /);
      if(!m)m=line.match(/^\| `((?:UC-[A-Z0-9-]+))` \|/);
      if(m&&!ids.includes(m[1]))ids.push(m[1]);
    }
  }
  return ids;
}
function exactCaseExists(rel){let current=repoRoot;for(const segment of rel.split('/')){if(!fs.existsSync(current))return false;const names=fs.readdirSync(current);if(!names.includes(segment))return false;current=path.join(current,segment)}return fs.existsSync(current)}

test('generated Use-Case seed contains exactly the current methodology Use Cases mapped by Registry Map',()=>{const expected=canonicalMethodologyUcIds(),actual=useCases.map((u)=>u.id);assert.equal(new Set(actual).size,actual.length);assert.deepEqual([...actual].sort(),[...expected].sort());assert.equal(actual.length,19);assert.equal(actual.filter((id)=>id.startsWith('UC-DOC-')).length,12);assert.equal(actual.filter((id)=>id.startsWith('UC-IDTSPE-')).length,7);for(const id of actual)assert.ok(id.startsWith('UC-DOC-')||id.startsWith('UC-IDTSPE-'),`${id}: project/profile planning UC leaked into methodology projection`)});

test('all generated semantic source paths exist with exact repository casing',()=>{for(const definition of useCases)for(const source of definition.sources||[])assert.ok(exactCaseExists(source),`${definition.id}: missing/exact-case-invalid source ${source}`)});


test('methodology Use-Case semantic bodies remain thin owner-route projections with explicit permission boundary',()=>{const uc=useCases.find((u)=>u.id==='UC-IDTSPE-COMPOSE-CURRENT-WORK');assert.ok(uc);assert.ok(uc.sources.includes('planning/documentation/use-case-registry-map.md'));assert.ok(uc.sources.includes('planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/USE-CASE-REGISTRY.md'));for(const mode of ['adaptive','full']){const body=semantic.buildSemanticBody('use_case',uc,mode);assert.match(body,/\[PLANNING_USE_CASE\]/);assert.match(body,/use_case_id:\n  UC-IDTSPE-COMPOSE-CURRENT-WORK/);assert.match(body,/route_resolution:/);assert.match(body,/current owner route/);assert.match(body,/methodology-use/i);assert.match(body,/read context only/i)}assert.match(semantic.buildSemanticBody('use_case',uc,'full'),/Full use_case reading is required/)});


test('methodology Use Cases and standalone project/domain command routes remain independently discoverable',()=>{for(const id of ['UC-DOC-USE-REPOSITORY-GUIDANCE','UC-DOC-PLAN-DOCUMENTATION-CHANGE','UC-IDTSPE-COMPOSE-CURRENT-WORK','UC-IDTSPE-INTEGRATE-CURRENT-WORK','UC-IDTSPE-REVALIDATE-CURRENT-WORK'])assert.ok(useCases.some((u)=>u.id===id),id);for(const projectUc of ['UC-REPO-PLAN-UPDATE','UC-REPO-BUILD-REPLACEMENT-PACKAGE','UC-PLAN-ARCH-WORKSPACE-USES','UC-PLAN-DOMAIN','UC-PLAN-SLICE','UC-PLAN-TEST-PLAN'])assert.ok(!useCases.some((u)=>u.id===projectUc),`${projectUc}: project/application UC must not be projected as methodology-use UC`);for(const file of ['discover-workspace-use-cases.command.md','plan-domain.command.md','plan-application-slice.command.md','plan-practical-testing.command.md','bootstrap-application-sds-planning.command.md','build-replacement-archive.command.md'])assert.ok(fs.existsSync(path.join(repoRoot,'planning/commands',file)),file);assert.equal(fs.existsSync(path.join(repoRoot,'planning/commands/review-audit.command.md')),false);assert.equal(fs.existsSync(path.join(repoRoot,'planning/documentation/review-audit-workflow.md')),false);const recheck=codec.parseCommandDefinitionDocument(read('planning/commands/recheck-current-idtspe.command.md'));assert.equal(recheck.id,'idtspe.review.recheck');assert.equal(recheck.command,'перепроверь');assert.ok(!recheck.ownerFiles.includes('planning/documentation/review-audit-workflow.md'));});

test('project-specific Application Realization stays outside methodology Use-Case projection while its standalone owner/command remain reachable',()=>{assert.equal(useCases.some((u)=>u.id==='UC-PLAN-REALIZATION'),false);const command=codec.parseCommandDefinitionDocument(read('planning/commands/review-application-realization.command.md'));assert.equal(command.id,'application_realization.review');assert.ok(command.ownerFiles.includes('planning/documentation/application-planning/application-realization-workflow.md'));const owner=read('planning/documentation/application-planning/application-realization-workflow.md');assert.match(owner,/Architecture Cost Handoff/);assert.match(owner,/runtime/i)});



test('retired collect-ideas aliases are hidden thin routes into current IDTSPE/SDS owners, not the old Idea runtime',()=>{const files=['collect-ideas.command.md','collect-application-ideas.command.md','collect-modular-application-ideas.command.md','collect-scenario-ideas.command.md','collect-domain-ideas.command.md','collect-slice-ideas.command.md'];for(const file of files){const command=codec.parseCommandDefinitionDocument(read(`planning/commands/${file}`));assert.equal(command.palette,false,command.id);assert.match(command.description,/legacy compatibility/i,command.id);assert.match(command.meaning,/IDTSPE|Target Module/i,command.id);assert.match(command.keyReminders.join(' '),/Do not execute or revive the former collect-ideas shell/i,command.id);for(const owner of command.ownerFiles){assert.doesNotMatch(owner,/idea-planning-principles|idea-review-and-planning-workflow|IDEA-REVIEW-TEMPLATE|profiles\/sds-planning-profiles|application-planning\/use-case-registry|architecture-planning\/use-case-registry|testing-planning\/use-case-registry/,`${command.id}: legacy owner ${owner}`)}}const generic=read('planning/commands/collect-ideas.command.md');assert.match(generic,/Scope: legacy compatibility command alias/);assert.doesNotMatch(generic,/Reusable Idea, SDS\/UCDS and reviewability behavior remains/);});



test('IDTSPE and SDS bootstrap commands load governance without forming or executing Targets',()=>{
  for(const file of ['bootstrap-idtspe.command.md','bootstrap-application-sds-planning.command.md']){
    const command=codec.parseCommandDefinitionDocument(read(`planning/commands/${file}`));
    assert.equal(command.methodologyBinding?.surfaceKind,'BOOTSTRAP',command.id);
    assert.equal(command.methodologyBinding?.hostTargetPolicy,'NONE',command.id);
    assert.match(command.activeContextBehavior,/governance/i,command.id);
    assert.match(command.activeContextBehavior,/Do not perform Target Formation/i,command.id);
    assert.match(command.activeContextBehavior,/Do not .*infer CREATE\/REFINE\/EXTEND\/REVALIDATE\/REPAIR/i,command.id);
    assert.match(command.keyReminders.join(' '),/Bootstrap is governance orientation only/i,command.id);
  }
});

test('Architecture and Testing remain reachable through their current semantic owners without Direction registries',()=>{assert.ok(fs.existsSync(path.join(repoRoot,'planning/documentation/architecture-planning/use-case-registry.md')));assert.ok(fs.existsSync(path.join(repoRoot,'planning/documentation/testing-planning/use-case-registry.md')));assert.equal(fs.existsSync(path.join(repoRoot,'planning/direction-registry.md')),false)});

test('retired Test Strategy shortcut routes to current proof owners without restoring a durable Test Strategy Target',()=>{const registry=read('planning/documentation/idtspe-methodology/active/profiles/sds/registries/TARGET-MODULE-REGISTRY.md');assert.match(registry,/TM-TEST-STRATEGY.*RETIRE/i);assert.equal(fs.existsSync(path.join(repoRoot,'planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-TEST-STRATEGY.md')),false);const command=codec.parseCommandDefinitionDocument(read('planning/commands/plan-testing-strategy.command.md'));assert.equal(command.palette,false);assert.match(command.meaning,/TM-TEST-STRATEGY is retired/i);assert.match(command.meaning,/LENS-TEST-PROOF-EVIDENCE/);assert.doesNotMatch(command.expectedOutput,/durable .*Test Strategy|RU-TSTRAT/i)});



test('generic IDTSPE command surfaces depend on Core command-surface authority rather than SDS profile authority',()=>{
  const coreOwner='planning/documentation/idtspe-methodology/active/idtspe-core/commands/IDTSPE-COMMAND-SURFACE-CONTRACT.md';
  const sdsOwner='planning/documentation/idtspe-methodology/active/profiles/sds/commands/SDS-COMMAND-SURFACE-EXTENSION.md';
  const files=['bootstrap-idtspe.command.md','work-through-idtspe.command.md','idtspe-next.command.md','idtspe-continue.command.md','review-current-idtspe.command.md','review-idtspe-consistency.command.md','review-findings.command.md','idtspe-proposal.command.md','prepare-idtspe-proposals.command.md','collect-idtspe-needs.command.md','disposition-idtspe-needs.command.md','disposition-idtspe-findings.command.md','recheck-current-idtspe.command.md','plan-pre-update.command.md','realize-exact-result.command.md','select-idtspe-lenses.command.md','apply-idtspe-lens.command.md','check-documentation-representation.command.md'];
  for(const file of files){const command=codec.parseCommandDefinitionDocument(read(`planning/commands/${file}`));assert.ok(command.ownerFiles.includes(coreOwner),`${command.id}: missing Core command-surface owner`);assert.ok(!command.ownerFiles.includes(sdsOwner),`${command.id}: generic Core surface depends on SDS command owner`);}
  const core=read(coreOwner);assert.match(core,/Primary User Convenience Surface Inventory — 19/);assert.match(core,/bounded Analysis Surface/);assert.match(core,/hostTargetPolicy: NONE/);assert.match(core,/must not create a Target merely to host/i);
  const sds=read(sdsOwner);assert.match(sds,/SDS Profile Command Surface Extension/);assert.match(sds,/generic IDTSPE Core surfaces are owned separately/i);
});

test('Need collection and disposition remain separate USER/Source-grounded operations',()=>{
  const collect=codec.parseCommandDefinitionDocument(read('planning/commands/collect-idtspe-needs.command.md'));
  const disposition=codec.parseCommandDefinitionDocument(read('planning/commands/disposition-idtspe-needs.command.md'));
  assert.equal(collect.id,'idtspe.needs.collect');
  assert.equal(disposition.id,'idtspe.needs.disposition');
  assert.match(collect.meaning,/USER\/Source/i);
  assert.match(collect.activeContextBehavior,/Stop at candidate formation/i);
  assert.match(disposition.meaning,/grounded Need Candidates/i);
  const collectionOwner=read('planning/documentation/idtspe-methodology/active/idtspe-core/resolution/needs/NEED-CANDIDATE-COLLECTION.md');
  assert.match(collectionOwner,/AI improvement idea \/ preference[\s\S]*NOT a USER Need Candidate/i);
  const dispositionOwner=read('planning/documentation/idtspe-methodology/active/idtspe-core/resolution/needs/NEED-CANDIDATE-DISPOSITION.md');
  assert.match(dispositionOwner,/transient by default/i);
  assert.match(dispositionOwner,/existing TM-EVOLUTION-STEP/i);
  const compose=read('planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/compose-current-work/UC-IDTSPE-COMPOSE-CURRENT-WORK.md');
  assert.match(compose,/Need Candidate Collection[\s\S]*Need Candidate Disposition/);
  const intake=read('planning/documentation/idtspe-methodology/active/idtspe-core/runtime/interaction/USER-INPUT-DECISION-AND-ANSWER-INTAKE-RULE.md');
  assert.match(intake,/Need Candidate Collection[\s\S]*Need Candidate Disposition/);
  const coreMap=read('planning/documentation/idtspe-methodology/active/idtspe-core/navigation/IDTSPE-CORE-MAP.md');
  assert.match(coreMap,/Need Candidate Collection[\s\S]*Need Candidate Disposition/);
});

test('replacement archive producer finalizes ChangeSet continuity when APPROVABLE ReviewDiff is accepted',()=>{
  const command=codec.parseCommandDefinitionDocument(read('planning/commands/build-replacement-archive.command.md'));
  assert.match(command.meaning,/APPROVABLE.*finalized/i);
  assert.match(command.keyReminders.join(' '),/every later replacement archive starts a new changeSetId/i);
  const workflow=read('planning/documentation/build-replacement-archive-workflow.md');
  assert.match(workflow,/ReviewDiff accepted as APPROVABLE[\s\S]*ChangeSet FINALIZED \/ CLOSED/);
  assert.match(workflow,/next replacement archive[\s\S]*MUST start a new ChangeSet/i);
  assert.match(workflow,/Same logical work.*only while the ChangeSet is open/i);
});


test('semantic runtime source contains no maintained current UC catalog identities or Direction ontology',()=>{const source=fs.readFileSync(path.join(moduleRoot,'src/semantic-projections.js'),'utf8');for(const identity of ['UC-PLAN-DOMAIN','UC-REPO-PLAN-UPDATE','DIR-PLAN-SOLUTION','application_domain.plan'])assert.doesNotMatch(source,new RegExp(identity.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')));assert.doesNotMatch(source,/normalizeDirectionDefinitions|directionId|directionIds/);assert.match(source,/normalizeUseCaseDefinitions/)});


test('all reusable Lenses separate Target Inputs from explicit Knowledge Basis',()=>{
  const roots=[
    'planning/documentation/idtspe-methodology/active/idtspe-core/lenses/required',
    'planning/documentation/idtspe-methodology/active/idtspe-core/lenses/frequent',
    'planning/documentation/idtspe-methodology/active/idtspe-core/lenses/reusable',
    'planning/documentation/idtspe-methodology/active/profiles/sds/lenses/frequent',
    'planning/documentation/idtspe-methodology/active/profiles/sds/lenses/reusable'
  ];
  const files=roots.flatMap((rel)=>fs.readdirSync(path.join(repoRoot,rel)).filter((name)=>/^LENS-.*\.md$/.test(name)).map((name)=>`${rel}/${name}`));
  assert.equal(files.length,20);
  for(const rel of files){const text=read(rel);assert.equal((text.match(/^## Knowledge Basis$/gm)||[]).length,1,rel);assert.match(text,/^## Artifact \/ File Implications$/m,rel);}
  const proof=read('planning/documentation/idtspe-methodology/active/idtspe-core/lenses/reusable/LENS-TEST-PROOF-EVIDENCE.md');
  assert.match(proof,/Testing Knowledge Basis/);assert.match(proof,/knowledge-bases\/testing\/README\.md/);
});

test('artifact guidance ownership keeps Target-result AP separate from Lens-produced supporting guidance',()=>{
  const tmDir=path.join(repoRoot,'planning/documentation/idtspe-methodology/active/profiles/sds/target-modules');
  const lensRoots=[path.join(repoRoot,'planning/documentation/idtspe-methodology/active/idtspe-core/lenses'),path.join(repoRoot,'planning/documentation/idtspe-methodology/active/profiles/sds/lenses')];
  const markdown=(dir)=>{const out=[];for(const e of fs.readdirSync(dir,{withFileTypes:true})){const q=path.join(dir,e.name);if(e.isDirectory())out.push(...markdown(q));else if(e.isFile()&&e.name.endsWith('.md'))out.push(q)}return out};
  const ap=fs.readdirSync(tmDir).filter((n)=>/^TM-.*\.md$/.test(n)).flatMap((n)=>[...fs.readFileSync(path.join(tmDir,n),'utf8').matchAll(/^ID: (AP-[A-Z0-9-]+)$/gm)].map((m)=>m[1]));
  const coreTmDir=path.join(repoRoot,'planning/documentation/idtspe-methodology/active/idtspe-core/target-modules');
  const coreAp=fs.readdirSync(coreTmDir).filter((n)=>/^TM-.*\.md$/.test(n)).flatMap((n)=>[...fs.readFileSync(path.join(coreTmDir,n),'utf8').matchAll(/^ID: (AP-[A-Z0-9-]+)$/gm)].map((m)=>m[1]));
  const ag=lensRoots.flatMap(markdown).flatMap((f)=>[...fs.readFileSync(f,'utf8').matchAll(/^ID: (AG-[A-Z0-9-]+)$/gm)].map((m)=>m[1]));
  assert.equal(ap.length,8);assert.equal(new Set(ap).size,8);assert.deepEqual(coreAp,['AP-PUPDATE-01','AP-PWORK-01','AP-RFIND-01']);assert.equal(ap.length+coreAp.length,11);assert.equal(ag.length,21);assert.equal(new Set(ag).size,21);
  for(const retired of ['AP-DOM-02','AP-SLICE-03','AP-FE-03','AP-WEUC-01','AP-WEUC-02','AG-L5-02'])assert.ok(!ap.includes(retired)&&!ag.includes(retired),retired);
  for(const retiredFile of ['TM-DOMAIN-DRAFT.md','TM-FRONTEND-SLICE.md','TM-WEUC.md'])assert.equal(fs.existsSync(path.join(tmDir,retiredFile)),false,retiredFile);
  const l5=read('planning/documentation/idtspe-methodology/active/profiles/sds/lenses/frequent/LENS-WORKSPACE-EVOLUTION-ARCHITECTURE.md');assert.doesNotMatch(l5,/ID: AG-L5-02/);assert.match(l5,/`NONE_DIRECT` by default/);assert.match(l5,/natural-owner.*meaning|natural owner.*meaning/i);
  const domain=read('planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-DOMAIN-DISCOVERY.md');assert.match(domain,/Transient Domain Discovery/);assert.match(domain,/Source.*not durable Domain authority/i);assert.match(domain,/RU-DOM-01/);
  const slice=read('planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-IMPLEMENTATION-SLICE.md');assert.match(slice,/RU-SLICE-04.*Feature Integration Proof/);assert.match(slice,/RU-SLICE-05.*Evolution \/ OPEN Slice Pressure/);assert.match(slice,/working\/non-persistent by default/i);assert.match(slice,/working discovery does not become a shadow class\/call registry/i);
});

test('generic Lens commands expose applicability scan and selected-Lens dispatch without fixed Lens ownership',()=>{
  const select=codec.parseCommandDefinitionDocument(read('planning/commands/select-idtspe-lenses.command.md'));
  const apply=codec.parseCommandDefinitionDocument(read('planning/commands/apply-idtspe-lens.command.md'));
  assert.equal(select.id,'idtspe.lenses.select');assert.equal(apply.id,'idtspe.lens.apply');
  for(const command of [select,apply]){assert.equal(command.methodologyBinding?.surfaceKind,'ORCHESTRATION');assert.equal(command.methodologyBinding?.lensId,null);}
  assert.equal(select.methodologyBinding?.hostTargetPolicy,'NONE');
  assert.equal(apply.methodologyBinding?.hostTargetPolicy,'NONE');
  assert.doesNotMatch(select.meaning,/TF-06A|LENS_SET/);assert.match(select.meaning,/no fixed Target.*Lens Set/i);assert.match(select.keyReminders.join(' '),/Analysis Surface.*primary/i);
  assert.match(select.meaning,/must not create|Do not create/i);
  assert.match(select.meaning,/Lens Model, Analysis Surface, Operation, basis/i);
  assert.match(apply.meaning,/Knowledge Basis/);assert.match(apply.keyReminders.join(' '),/does not create a Lens-owned Target/);
  assert.match(apply.meaning,/supported Lens operation/i);
  const model=read('planning/documentation/idtspe-methodology/active/idtspe-core/lenses/LENS-MODEL.md');
  assert.match(model,/Current bounded Analysis Surface[\s\S]*optional natural Target/);
  assert.match(model,/Selected Lens Application[\s\S]*Lens Model, Analysis Surface, Operation, relevant basis/i);
});


test('canonical SDS authority is singular and legacy Mini/Modular/Full commands are hidden representation preferences',()=>{
  assert.equal(fs.existsSync(path.join(repoRoot,'planning/documentation/profiles/sds-planning-profiles.md')),false);
  assert.equal(fs.existsSync(path.join(repoRoot,'planning/documentation/profiles/scenario-domain-slice-docs-profile.md')),false);
  const map=read('planning/documentation/idtspe-methodology/active/profiles/sds/representation/ARTIFACT-PLACEMENT-MAP.md');
  for(const label of ['LIGHT','MIXED','COMPLEX'])assert.match(map,new RegExp(label));
  for(const file of ['work-mini-sds.command.md','work-modular-sds.command.md','work-full-sds.command.md']){
    const command=codec.parseCommandDefinitionDocument(read(`planning/commands/${file}`));
    assert.equal(command.palette,false,command.id);
    assert.match(command.description,/legacy compatibility/i,command.id);
    assert.match(command.meaning,/representation preference/i,command.id);
    assert.doesNotMatch(command.meaning,/Domain Draft|Frontend Slice|TM-WEUC/i,command.id);
  }
});

test('idtspe is one registry-driven dispatcher for ordinary work, Target Modules and Lenses',()=>{
  const command=codec.parseCommandDefinitionDocument(read('planning/commands/work-through-idtspe.command.md'));
  assert.equal(command.id,'idtspe.work');
  assert.equal(command.command,'idtspe');
  assert.ok(command.commandFamily.includes('idtspe'));
  assert.match(command.meaning,/Target Module/);
  assert.match(command.meaning,/Lens/);
  assert.match(command.activeContextBehavior,/Ambiguous or unknown selectors are not guessed/i);
  const sdsTm=read('planning/documentation/idtspe-methodology/active/profiles/sds/registries/TARGET-MODULE-REGISTRY.md');
  const coreLens=read('planning/documentation/idtspe-methodology/active/idtspe-core/lenses/LENS-REGISTRY.md');
  const sdsLens=read('planning/documentation/idtspe-methodology/active/profiles/sds/registries/LENS-REGISTRY.md');
  for(const alias of ['application','scenario','domain','slice','shared','evolution-step','evolution-map','practical-test'])assert.match(sdsTm,new RegExp('`'+alias+'`'));const activeTm=sdsTm.split('## Retired / Subsumed Baseline Modules')[0];for(const retired of ['slice-strategy','crosscut'])assert.doesNotMatch(activeTm,new RegExp('`'+retired+'`'));
  for(const alias of ['representation','dependency','test-proof','ddd','ui','l5','simplicity'])assert.match(coreLens+sdsLens,new RegExp('\\b'+alias.replace('-','\\-')+'\\b'));
});

test('generic Lens dispatcher crosses Core Finding Disposition before semantic owner or State consequences',()=>{
  const command=codec.parseCommandDefinitionDocument(read('planning/commands/apply-idtspe-lens.command.md'));
  assert.match(command.activeContextBehavior,/Finding Candidate.*Core Finding Disposition/i);
  assert.match(command.expectedOutput,/Core Finding Disposition resolves/i);
  assert.doesNotMatch(command.activeContextBehavior,/findings still return to the natural Target owner/i);
});


test('all installed idtspe Target Module and Lens aliases are globally unique and resolve to one semantic ID',()=>{
  const aliases=[];
  const add=(alias,id,source)=>{assert.match(alias,/^[a-z0-9][a-z0-9 -]*$/,`${source}: invalid alias ${alias}`);aliases.push({alias,id,source})};

  const sdsTm=read('planning/documentation/idtspe-methodology/active/profiles/sds/registries/TARGET-MODULE-REGISTRY.md');
  for(const line of sdsTm.split(/\r?\n/)){
    const m=line.match(/^\| \[`(TM-[A-Z0-9-]+)`\]\([^)]*\) \| (.+?) \|/);
    if(!m)continue;
    for(const a of m[2].matchAll(/`([a-z0-9-]+)`/g))add(a[1],m[1],'SDS Target Module registry');
  }
  assert.equal(aliases.filter((x)=>x.source==='SDS Target Module registry').length,14);

  const coreTm=read('planning/documentation/idtspe-methodology/active/idtspe-core/target-modules/TARGET-MODULE-REGISTRY.md');
  for(const m of coreTm.matchAll(/^idtspe ([a-z0-9][a-z0-9 -]*) <scope>\r?\n→ (TM-[A-Z0-9-]+)$/gm))add(m[1],m[2],'Core Target Module registry');
  assert.equal(aliases.filter((x)=>x.source==='Core Target Module registry').length,5);

  for(const [source,rel] of [
    ['Core Lens registry','planning/documentation/idtspe-methodology/active/idtspe-core/lenses/LENS-REGISTRY.md'],
    ['SDS Lens registry','planning/documentation/idtspe-methodology/active/profiles/sds/registries/LENS-REGISTRY.md']
  ]){
    for(const line of read(rel).split(/\r?\n/)){
      const m=line.match(/^([a-z0-9-]+)\s+→\s+(LENS-[A-Z0-9-]+)(?:\s+#.*)?$/);
      if(m)add(m[1],m[2],source);
    }
  }
  assert.equal(aliases.filter((x)=>x.source==='Core Lens registry').length,11);
  assert.equal(aliases.filter((x)=>x.source==='SDS Lens registry').length,9);

  const byAlias=new Map();
  for(const item of aliases){
    const prior=byAlias.get(item.alias);
    assert.equal(prior,undefined,`idtspe alias collision: ${item.alias} -> ${prior?.id} / ${item.id}`);
    byAlias.set(item.alias,item);
  }
  assert.equal(byAlias.size,39);

  for(const [alias,id] of [
    ['scenario','TM-SCENARIO-PLANNING'],
    ['slice','TM-IMPLEMENTATION-SLICE'],
    ['pre-update','TM-PRE-UPDATE-PLAN'],
    ['review-findings','TM-REVIEW-FINDINGS'],
    ['proposal-workup','TM-PROPOSAL-WORKUP'],
    ['ddd','LENS-DOMAIN-MODELING-DDD'],
    ['l5','LENS-WORKSPACE-EVOLUTION-ARCHITECTURE'],
    ['representation','LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY']
  ])assert.equal(byAlias.get(alias)?.id,id,alias);
});

test('README-owned bootstrap hierarchy keeps primary bootstrap generic and profile bootstrap incremental',()=>{
  const planning=read('planning/README.md');
  const session=read('planning/session/README.md');
  const documentation=read('planning/documentation/README.md');
  const core=read('planning/documentation/idtspe-methodology/active/idtspe-core/README.md');
  const sds=read('planning/documentation/idtspe-methodology/active/profiles/sds/README.md');
  assert.equal(fs.existsSync(path.join(repoRoot,'planning/documentation/idtspe-methodology/active/idtspe-core/BOOTSTRAP-IDTSPE.md')),false);
  assert.equal(fs.existsSync(path.join(repoRoot,'planning/documentation/idtspe-methodology/active/profiles/sds/BOOTSTRAP-SDS.md')),false);
  assert.match(planning,/## Primary Bootstrap/);
  assert.match(planning,/session\/README\.md[\s\S]*AI-WORKING-CONTRACT\.md[\s\S]*documentation\/README\.md[\s\S]*idtspe-core\/README\.md/);
  assert.match(planning,/intentionally stops before any profile/i);
  assert.doesNotMatch(planning,/profiles\/sds\/README\.md/);
  assert.match(session,/## Bootstrap/);assert.match(session,/principles-and-terminology\.md/);assert.match(session,/session-runtime-contract\.md/);
  assert.match(documentation,/## Bootstrap/);assert.match(documentation,/use-case-registry-map\.md/);
  assert.match(core,/## Bootstrap/);assert.match(core,/planning\/README\.md/);assert.match(core,/Primary bootstrap stops before profile bootstrap/);
  assert.match(sds,/## Profile Bootstrap/);assert.match(sds,/incremental/i);assert.match(sds,/planning\/README\.md/);
  assert.doesNotMatch(sds,/session\/principles-and-terminology|session-runtime-contract/);
  const coreCmd=codec.parseCommandDefinitionDocument(read('planning/commands/bootstrap-idtspe.command.md'));
  const sdsCmd=codec.parseCommandDefinitionDocument(read('planning/commands/bootstrap-application-sds-planning.command.md'));
  assert.ok(coreCmd.ownerFiles.includes('planning/README.md'));
  assert.ok(!coreCmd.ownerFiles.some((x)=>x.endsWith('/BOOTSTRAP-IDTSPE.md')));
  assert.ok(sdsCmd.ownerFiles.includes('planning/documentation/idtspe-methodology/active/profiles/sds/README.md'));
  assert.ok(!sdsCmd.ownerFiles.some((x)=>x.endsWith('/BOOTSTRAP-SDS.md')));
});


test('clean-chat routing always rechecks methodology Use-Case applicability before the narrow functional route',()=>{
  const planning=read('planning/README.md');
  const session=read('planning/session/session-runtime-contract.md');
  const repoRegistry=read('planning/use-case-registry.md');
  assert.match(planning,/any current Planning \/ repository work entry[\s\S]*UC-DOC-RESOLVE-CURRENT-USE-CASES[\s\S]*repository-specific operational work[\s\S]*planning\/use-case-registry\.md/i);
  assert.match(planning,/documentation\/use-case-registry-map\.md/i);
  assert.match(session,/ambient methodology Use-Case applicability recheck[\s\S]*Methodology Use-Case Registry Map[\s\S]*repository-specific operation: planning\/use-case-registry\.md/i);
  assert.match(repoRegistry,/Situation summary/);
  assert.match(repoRegistry,/Result summary/);
  assert.match(repoRegistry,/UC-REPO-MAINTAIN-PLANNING-COMMAND/);
});

test('proposal-driven commands remain thin routes to Session and canonical IDTSPE owners',()=>{
  const generic=codec.parseCommandDefinitionDocument(read('planning/commands/proposal-driven.command.md'));
  assert.equal(generic.id,'session.proposal_driven');
  assert.ok(generic.ownerFiles.includes('planning/session/session-runtime-contract.md'));
  assert.ok(!generic.ownerFiles.some((x)=>x.includes('proposal-and-decision-lifecycle-contract.md')));
  assert.match(generic.permissionMode,/no-mutation-grant/);

  const idtspe=codec.parseCommandDefinitionDocument(read('planning/commands/idtspe-proposal.command.md'));
  assert.equal(idtspe.id,'idtspe.proposal');
  assert.equal(idtspe.methodologyBinding?.surfaceKind,'ORCHESTRATION');
  assert.ok(idtspe.ownerFiles.includes('planning/session/session-runtime-contract.md'));
  assert.ok(idtspe.ownerFiles.includes('planning/documentation/idtspe-methodology/active/idtspe-core/resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md'));
  assert.ok(idtspe.ownerFiles.includes('planning/documentation/idtspe-methodology/active/idtspe-core/resolution/qrp/QRP-LIFECYCLE-AND-REVIEW.md'));
});


test('Core cold bootstrap is a routing/proportionality spine and keeps deep mechanics lazy',()=>{
  const core=read('planning/documentation/idtspe-methodology/active/idtspe-core/README.md');
  const bootstrap=core.slice(core.indexOf('## Bootstrap'),core.indexOf('## Functional Entry'));
  assert.match(bootstrap,/Bootstrap Spine — Required From Cold \/ Unreliable Core Context/);
  assert.match(bootstrap,/After this spine is current, Core bootstrap is sufficient/);
  assert.match(bootstrap,/Conditional Deep Reads — Required Only When The Current Composition Needs Them/);
  for(const route of ['runtime/target-work/RESPONSIBILITY-MAP.md','target-modules/RESPONSIBILITY-MAP.md','lenses/RESPONSIBILITY-MAP.md','resolution/RESPONSIBILITY-MAP.md','knowledge-bases/RESPONSIBILITY-MAP.md','representation/RESPONSIBILITY-MAP.md']){
    assert.ok(bootstrap.includes(route),`bootstrap missing lazy owner route ${route}`);
  }
  assert.match(bootstrap,/Do not read deeper Core owners merely to claim that bootstrap completed/);
});


test('Finding review surface separates impact priority from semantic resolution escalation',()=>{
  const command=codec.parseCommandDefinitionDocument(read('planning/commands/disposition-idtspe-findings.command.md'));
  assert.equal(command.id,'idtspe.findings.disposition');
  assert.equal(command.methodologyBinding?.profile,null);
  assert.equal(command.methodologyBinding?.surfaceKind,'ORCHESTRATION');
  assert.ok(command.ownerFiles.includes('planning/documentation/idtspe-methodology/active/idtspe-core/resolution/findings/FINDING-DISPOSITION.md'));
  assert.ok(!command.ownerFiles.some((x)=>x.includes('/profiles/sds/')), 'generic Finding review surface must not hard-depend on SDS');
  const finding=read('planning/documentation/idtspe-methodology/active/idtspe-core/resolution/findings/FINDING-DISPOSITION.md');
  for(const token of ['RE-0 DETERMINISTIC-CORRECTION','RE-1 LOCAL-REALIZATION-CHOICE','RE-2 CURRENT-OWNER-SEMANTIC-CHANGE','RE-3 UPSTREAM-REVALIDATION','RE-4 UPSTREAM-SEMANTIC-CHANGE'])assert.match(finding,new RegExp(token));
  assert.match(finding,/Review Priority[\s\S]*cost \/ blast radius[\s\S]*Resolution Escalation[\s\S]*semantic distance \/ authority change required/);
  assert.match(finding,/A detail at architecture depth is not automatically an architecture Decision/);
  assert.match(finding,/material Finding[\s\S]*form or refine at least one linked IDTSPE Proposal/i);
  assert.match(finding,/RE-0 deterministic[\s\S]*deterministic-correction Proposal/i);
  assert.match(finding,/RE-3 upstream revalidation[\s\S]*BLOCKED_BY_REVALIDATION/i);
  assert.match(finding,/RE-2 current-owner semantic change[\s\S]*formal IDTSPE Proposal/i);
  assert.match(finding,/RE-4 upstream semantic change[\s\S]*formal IDTSPE Proposal/i);
  assert.match(finding,/Proposal existence is independent of persistence/i);
  assert.match(finding,/GIP[\s\S]*not.*substitute[\s\S]*IDTSPE Proposal/is);
  const unit=read('planning/documentation/idtspe-methodology/active/idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md');
  assert.match(unit,/Resolution Escalation.*not.*State Unit/is);
  const review=read('planning/documentation/review-diff-review-workflow.md');
  assert.match(review,/RE-0 \/ RE-1 with a known but unapplied correction[\s\S]*NEEDS CORRECTION/);
  assert.match(review,/RE-2 \/ RE-4 with unresolved required selection[\s\S]*BLOCKED BY MATERIAL DECISION/);
});

test('Review Strategy/Coverage supports distinct Lens checks and local affected recheck after change',()=>{
  const strategy=read('planning/documentation/idtspe-methodology/active/ai-reviewability/REVIEW-STRATEGY-AND-COVERAGE-CONTRACT.md');
  assert.match(strategy,/semantic subject \/ surface[\s\S]*review perspective[\s\S]*review operation[\s\S]*relevant basis/i);
  assert.match(strategy,/Current-Pass Completeness/);
  assert.match(strategy,/Review Coverage Record/);
  assert.match(strategy,/MUST NOT intentionally defer/i);
  assert.doesNotMatch(strategy,/REVIEW\.COVERAGE-AUDIT/);
  assert.match(strategy,/LOCAL_AFFECTED/);
  assert.match(strategy,/newly exposed semantic surface/i);
  assert.match(strategy,/Lens Model, Analysis Surface, Operation, relevant basis/i);
  const rootMap=read('planning/documentation/idtspe-methodology/active/navigation/METHODOLOGY-RESPONSIBILITY-MAP.md');
  assert.match(rootMap,/REVIEW\.STRATEGY-COVERAGE/);
  const activeReadme=read('planning/documentation/idtspe-methodology/active/README.md');
  assert.match(activeReadme,/REVIEW-STRATEGY-AND-COVERAGE-CONTRACT/);
  const review=codec.parseCommandDefinitionDocument(read('planning/commands/review-current-idtspe.command.md'));
  const recheck=codec.parseCommandDefinitionDocument(read('planning/commands/recheck-current-idtspe.command.md'));
  assert.equal(review.id,'idtspe.review');
  assert.equal(recheck.id,'idtspe.review.recheck');
  assert.equal(recheck.command,'перепроверь');
  assert.equal(recheck.methodologyBinding.surfaceKind,'ORCHESTRATION');
  assert.equal(recheck.methodologyBinding.hostTargetPolicy,'NONE');
  assert.ok(!recheck.includes.includes('planning/commands/review-idtspe.command.md'));
  assert.match(review.meaning,/Finding Disposition[\s\S]*linked IDTSPE Proposal before the review is semantically complete/i);
  assert.match(review.meaning,/Proposal existence does not imply persistence or selection/i);
  assert.match(review.meaning,/Need collection is not a mandatory review stage/i);
});

test('Unit model is resolution-centric and keeps Contextual Unit result destination explicit',()=>{
  const unit=read('planning/documentation/idtspe-methodology/active/idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md');
  assert.match(unit,/Unit Resolution[\s\S]*Current Result Content/);
  assert.match(unit,/Contextual Unit[\s\S]*Result Destination/);
  assert.match(unit,/Unit-centric does not mean Unit-exclusive/);
  assert.match(unit,/material Proposal selection has Decision semantics/);
  assert.match(unit,/explicit\/durable Decision trace is proportional/);
});

test('Proposal lifecycle owns semantic impact while RE categories remain Finding-only',()=>{
  const proposal=read('planning/documentation/idtspe-methodology/active/idtspe-core/resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md');
  const finding=read('planning/documentation/idtspe-methodology/active/idtspe-core/resolution/findings/FINDING-DISPOSITION.md');
  const command=codec.parseCommandDefinitionDocument(read('planning/commands/idtspe-proposal.command.md'));
  assert.match(proposal,/## 5A\. Proposal Semantic Change Impact Review/);
  assert.match(proposal,/Resolution Escalation RE-0\.\.RE-4.*belongs to Finding Disposition only/is);
  assert.match(proposal,/Finding-to-Proposal Handoff/);
  assert.match(proposal,/every \*\*material Finding\*\*[\s\S]*MUST form or refine at least one linked IDTSPE Proposal/i);
  assert.match(proposal,/RE-3[\s\S]*BLOCKED_BY_REVALIDATION/i);
  assert.match(proposal,/does \*\*not\*\* imply physical persistence/i);
  assert.match(proposal,/GIP[\s\S]*never substitutes for it/is);
  assert.match(finding,/`RE-\*` categorizes the Finding's semantic resolution distance, not the Proposal itself/);
  assert.match(command.activeContextBehavior,/Proposal Semantic Change Impact Review/);
  assert.match(command.activeContextBehavior,/Retention\/file persistence is a separate proportional decision/i);
});

test('ReviewDiff delegates RE taxonomy to Finding owner instead of copying definitions',()=>{
  const review=read('planning/documentation/review-diff-review-workflow.md');
  assert.match(review,/RE-0\.\.RE-4.*owned \*\*only there\*\*/s);
  assert.doesNotMatch(review,/RE-0 DETERMINISTIC-CORRECTION/);
  assert.match(review,/Proposal Semantic Change Impact/);
});

test('Target Formation consumes the 0..N applied Target Module contract without narrowing to one Model',()=>{
  const formation=read('planning/documentation/idtspe-methodology/active/idtspe-core/runtime/target-work/RESOLUTION-SLOT-AND-TARGET-FORMATION-SET.md');
  const compose=read('planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/compose-current-work/UC-IDTSPE-COMPOSE-CURRENT-WORK.md');
  const runtime=read('planning/documentation/idtspe-methodology/active/idtspe-core/runtime/IDTSPE-RUNTIME-COMPOSITION-CONTRACT.md');
  assert.match(formation,/zero or more mutually compatible applicable Models/i);
  assert.match(formation,/0\.\.N Target Module Instance portions/i);
  assert.doesNotMatch(formation,/→ APPLIED\(TM-X\)/);
  assert.match(compose,/apply zero or more mutually compatible useful Target Module Models/i);
  assert.match(runtime,/0\.\.N applied Target Module Model \+ Target Module Instance portions/i);
});

test('Knowledge Basis supports Unit consumers and keeps reference-only vs applied bridge freedom',()=>{
  const kb=read('planning/documentation/idtspe-methodology/active/idtspe-core/knowledge-bases/KNOWLEDGE-BASIS-CONTRACT.md');
  assert.match(kb,/Target Module, Unit Definition, Unit Resolution Slot or Lens Evaluation/);
  assert.match(kb,/A Knowledge Basis may simply point to theory when the application is obvious/);
  assert.match(kb,/Unit Definition Knowledge Basis/);
});


test('Unit-resolution refactor preserves Decision and QRP lifecycle invariants',()=>{
  const proposal=read('planning/documentation/idtspe-methodology/active/idtspe-core/resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md');
  const qrp=read('planning/documentation/idtspe-methodology/active/idtspe-core/resolution/qrp/QRP-LIFECYCLE-AND-REVIEW.md');
  assert.match(proposal,/Decision↔Q\/R\/P relations remain many-to-many/);
  assert.match(proposal,/`Rationale \/ Why` is not Evidence/);
  assert.match(qrp,/Stable Q\/R\/P identity\/ID is proportional[\s\S]*independent addressability, cross-reference, lifecycle, review or revalidation value/);
});

test('Integration and revalidation retain pre-existing trigger and routing obligations',()=>{
  const integrate=read('planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/integrate-current-work/UC-IDTSPE-INTEGRATE-CURRENT-WORK.md');
  const revalidate=read('planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/revalidate-current-work/UC-IDTSPE-REVALIDATE-CURRENT-WORK.md');
  assert.match(integrate,/important accepted meaning is distributed across turns\/owners\/Units/);
  assert.match(integrate,/Elapsed time or message count alone is not a trigger/);
  assert.match(integrate,/Integration Checkpoint ≠ periodic timer event/);
  assert.match(integrate,/Session Runtime may expose or request the checkpoint, but Session does not own/);
  assert.match(revalidate,/Consistency Review Process/);
  assert.match(revalidate,/Use-Case Registry Map/);
  assert.match(revalidate,/reuse trustworthy unaffected scans\/components/);
  assert.match(revalidate,/Record material revalidation\/recheck state/);
  assert.match(revalidate,/Integration Checkpoint only when a coherent whole-state view is now useful/);
});

test('Methodology Usage State and Target Module driver guards survive Unit-centric topology',()=>{
  const unit=read('planning/documentation/idtspe-methodology/active/idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md');
  const moduleRule=read('planning/documentation/idtspe-methodology/active/idtspe-core/target-modules/TARGET-MODULE-STEP-RESULT-AND-QUESTION-SET-RULE.md');
  for(const token of ['Active Use Cases','Relevant Registry Traversals','Applied Components','Material Guards / Validators / Rules / Packs','Contextual Adaptations / deferred recommendations','Recheck Triggers / Re-entry']){
    assert.match(unit,new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')));
  }
  assert.match(unit,/It is not an execution log/);
  assert.match(unit,/Current Work Concern[\s\S]*Promote it into explicit Methodology Usage State only when independent addressability/);
  assert.match(moduleRule,/Reusable questions remain guidance on the natural Requirement\/Unit\/Slot subject/);
  assert.match(moduleRule,/There is no standalone `Target Question Set` semantic owner/);
});
