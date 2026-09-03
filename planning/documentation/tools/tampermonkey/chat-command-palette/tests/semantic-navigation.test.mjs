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
function walk(dir,result=[]){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,entry.name);if(entry.isDirectory())walk(p,result);else if(entry.isFile()&&entry.name.toLowerCase()==='use-case-registry.md')result.push(p)}return result}
function canonicalUcIds(){const ids=[];for(const file of walk(path.join(repoRoot,'planning'))){const lines=fs.readFileSync(file,'utf8').split(/\r?\n/),status=String(lines.find((line)=>/^Status:/i.test(line))||'').toLowerCase();if(status.includes('legacy')||status.includes('historical')||status.includes('compatibility'))continue;for(const line of lines){let m=line.match(/^#{2,3} `((?:UC-[A-Z0-9-]+))` — /);if(!m)m=line.match(/^\| `((?:UC-[A-Z0-9-]+))` \|/);if(m&&!ids.includes(m[1]))ids.push(m[1])}}return ids}
function exactCaseExists(rel){let current=repoRoot;for(const segment of rel.split('/')){if(!fs.existsSync(current))return false;const names=fs.readdirSync(current);if(!names.includes(segment))return false;current=path.join(current,segment)}return fs.existsSync(current)}

test('generated Use-Case seed contains every current canonical UC exactly once',()=>{const expected=canonicalUcIds(),actual=useCases.map((u)=>u.id);assert.equal(new Set(actual).size,actual.length);assert.deepEqual([...actual].sort(),[...expected].sort());assert.equal(actual.length,expected.length);assert.ok(!actual.some((id)=>id.startsWith('UC-RPKG-')),'legacy Replacement Package App capability IDs must not be projected as current UCs')});

test('all generated semantic source paths exist with exact repository casing',()=>{for(const definition of useCases)for(const source of definition.sources||[])assert.ok(exactCaseExists(source),`${definition.id}: missing/exact-case-invalid source ${source}`)});


test('Use-Case semantic bodies remain thin owner-route projections with explicit permission boundary',()=>{const domain=useCases.find((u)=>u.id==='UC-PLAN-DOMAIN');assert.ok(domain);for(const mode of ['adaptive','full']){const body=semantic.buildSemanticBody('use_case',domain,mode);assert.match(body,/\[PLANNING_USE_CASE\]/);assert.match(body,/use_case_id:\n  UC-PLAN-DOMAIN/);assert.match(body,/route_resolution:/);assert.match(body,/current owner route/);assert.match(body,/Semantic planning\/read context only/)}assert.match(semantic.buildSemanticBody('use_case',domain,'full'),/Full use_case reading is required/)});


test('current scoped Use Cases and standalone command routes remain independently discoverable',()=>{for(const id of ['UC-REPO-PLAN-UPDATE','UC-REPO-BUILD-REPLACEMENT-PACKAGE','UC-REPO-REVIEW-DIFF','UC-PLAN-ARCH-WORKSPACE-USES','UC-PLAN-DOMAIN','UC-PLAN-SLICE','UC-PLAN-TEST-PLAN','UC-PLAN-ORIENT'])assert.ok(useCases.some((u)=>u.id===id),id);for(const retired of ['UC-REPO-ORIENT','UC-REPO-CURRENT-STATE','UC-REPO-PLAN-NEXT','UC-REPO-REFINE-CURRENT-PLAN','UC-REPO-AUDIT-REVIEW','UC-REPO-CRITICAL-REVIEW','UC-REPO-REVIEW-PLANNING-FINDINGS','UC-REPO-DEFINE-PARALLEL-SCOPES','UC-REPO-PARALLEL-WORK','UC-REPO-USE-ARCHIVE-SOURCE'])assert.ok(!useCases.some((u)=>u.id===retired),retired);for(const file of ['review-audit.command.md','discover-workspace-use-cases.command.md','plan-domain.command.md','plan-application-slice.command.md','plan-practical-testing.command.md','bootstrap-application-sds-planning.command.md'])assert.ok(fs.existsSync(path.join(repoRoot,'planning/commands',file)),file);const audit=codec.parseCommandDefinitionDocument(read('planning/commands/review-audit.command.md'));assert.equal(audit.id,'review_audit.recheck');assert.ok(audit.ownerFiles.includes('planning/documentation/review-audit-workflow.md'));assert.doesNotMatch(audit.meaning,/UC-REPO-AUDIT-REVIEW/)});

test('Application Realization projection is generic while its owner carries runtime/architecture handoff semantics',()=>{const realization=useCases.find((u)=>u.id==='UC-PLAN-REALIZATION');assert.ok(realization);assert.equal(realization.label,'Review / Compare High-Level Application Realization');assert.match(realization.instruction,/current canonical registry/);assert.doesNotMatch(realization.instruction,/hardcoded|pre-Domain comparative evidence/);const owner=read('planning/documentation/application-planning/application-realization-workflow.md');assert.match(owner,/Architecture Cost Handoff/);assert.match(owner,/runtime/i)});



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

test('Test Strategy stays lightweight and conditional instead of mirroring test code',()=>{const owner=read('planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-TEST-STRATEGY.md');assert.match(owner,/shared proof strategy/i);assert.match(owner,/Do not mirror every concrete test class\/helper/i);assert.match(owner,/one compact|one `RU-TSTRAT-01`|RU-TSTRAT-01/i);const command=codec.parseCommandDefinitionDocument(read('planning/commands/plan-testing-strategy.command.md'));assert.match(command.expectedOutput,/compact Shared Proof Strategy/i);assert.match(command.helperPresentation.whatYouGet,/small shared proof strategy/i)});



test('generic IDTSPE command surfaces depend on Core command-surface authority rather than SDS profile authority',()=>{
  const coreOwner='planning/documentation/idtspe-methodology/active/idtspe-core/shared/idtspe-command-surface-contract.md';
  const sdsOwner='planning/documentation/idtspe-methodology/active/profiles/sds/shared/idtspe-command-surface-contract.md';
  const files=['bootstrap-idtspe.command.md','work-through-idtspe.command.md','idtspe-next.command.md','idtspe-continue.command.md','review-idtspe-consistency.command.md','plan-pre-update.command.md','realize-exact-result.command.md','select-idtspe-lenses.command.md','apply-idtspe-lens.command.md','check-documentation-representation.command.md','check-linked-notes-justification.command.md'];
  for(const file of files){const command=codec.parseCommandDefinitionDocument(read(`planning/commands/${file}`));assert.ok(command.ownerFiles.includes(coreOwner),`${command.id}: missing Core command-surface owner`);assert.ok(!command.ownerFiles.includes(sdsOwner),`${command.id}: generic Core surface depends on SDS command owner`);}
  const core=read(coreOwner);assert.match(core,/Generic Core Surface Inventory — 11/);assert.match(core,/CREATE_OR_REUSE_TARGET/);assert.match(core,/RESOLVE_OR_REUSE_TARGET/);
  const sds=read(sdsOwner);assert.match(sds,/SDS Profile Command Surface Extension/);assert.match(sds,/generic IDTSPE Core surfaces are owned separately/i);
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
  assert.equal(files.length,17);
  for(const rel of files){const text=read(rel);assert.equal((text.match(/^## Knowledge Basis$/gm)||[]).length,1,rel);assert.match(text,/^## Artifact \/ File Implications$/m,rel);}
  const proof=read('planning/documentation/idtspe-methodology/active/idtspe-core/lenses/reusable/LENS-TEST-PROOF-EVIDENCE.md');
  assert.match(proof,/Testing Knowledge Basis/);assert.match(proof,/theoretical-modules\/testing\/README\.md/);
});

test('artifact guidance ownership keeps Target-result AP separate from Lens-produced supporting guidance',()=>{
  const tmDir=path.join(repoRoot,'planning/documentation/idtspe-methodology/active/profiles/sds/target-modules');
  const lensRoots=[path.join(repoRoot,'planning/documentation/idtspe-methodology/active/idtspe-core/lenses'),path.join(repoRoot,'planning/documentation/idtspe-methodology/active/profiles/sds/lenses')];
  const markdown=(dir)=>{const out=[];for(const e of fs.readdirSync(dir,{withFileTypes:true})){const q=path.join(dir,e.name);if(e.isDirectory())out.push(...markdown(q));else if(e.isFile()&&e.name.endsWith('.md'))out.push(q)}return out};
  const ap=fs.readdirSync(tmDir).filter((n)=>/^TM-.*\.md$/.test(n)).flatMap((n)=>[...fs.readFileSync(path.join(tmDir,n),'utf8').matchAll(/^ID: (AP-[A-Z0-9-]+)$/gm)].map((m)=>m[1]));
  const coreTmDir=path.join(repoRoot,'planning/documentation/idtspe-methodology/active/idtspe-core/target-modules');
  const coreAp=fs.readdirSync(coreTmDir).filter((n)=>/^TM-.*\.md$/.test(n)).flatMap((n)=>[...fs.readFileSync(path.join(coreTmDir,n),'utf8').matchAll(/^ID: (AP-[A-Z0-9-]+)$/gm)].map((m)=>m[1]));
  const ag=lensRoots.flatMap(markdown).flatMap((f)=>[...fs.readFileSync(f,'utf8').matchAll(/^ID: (AG-[A-Z0-9-]+)$/gm)].map((m)=>m[1]));
  assert.equal(ap.length,25);assert.equal(new Set(ap).size,25);assert.deepEqual(coreAp,['AP-PUPDATE-01']);assert.equal(ap.length+coreAp.length,26);assert.equal(ag.length,22);assert.equal(new Set(ag).size,22);
  for(const retired of ['AP-DOM-02','AP-SLICE-03','AP-FE-03','AP-WEUC-01','AP-WEUC-02','AG-L5-02'])assert.ok(!ap.includes(retired)&&!ag.includes(retired),retired);
  for(const retiredFile of ['TM-DOMAIN-DRAFT.md','TM-FRONTEND-SLICE.md','TM-WEUC.md'])assert.equal(fs.existsSync(path.join(tmDir,retiredFile)),false,retiredFile);
  const l5=read('planning/documentation/idtspe-methodology/active/profiles/sds/lenses/frequent/LENS-WORKSPACE-EVOLUTION-ARCHITECTURE.md');assert.doesNotMatch(l5,/ID: AG-L5-02/);assert.match(l5,/physically separate `<owner>\.evolution\.md`/);
  const domain=read('planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-DOMAIN-DISCOVERY.md');assert.match(domain,/Domain \/ Aggregate Modeling/);assert.match(domain,/SUPPORTING \/ SHALLOW/);assert.match(domain,/RU-DOM-01/);
  const slice=read('planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-IMPLEMENTATION-SLICE.md');assert.match(slice,/RU-SLICE-04.*Evolution Steps/);assert.match(slice,/Codebase Integration Path is not a Result Unit/);assert.match(slice,/Implementation Outlook/);
});

test('generic Lens commands expose applicability scan and selected-Lens dispatch without fixed Lens ownership',()=>{
  const select=codec.parseCommandDefinitionDocument(read('planning/commands/select-idtspe-lenses.command.md'));
  const apply=codec.parseCommandDefinitionDocument(read('planning/commands/apply-idtspe-lens.command.md'));
  assert.equal(select.id,'idtspe.lenses.select');assert.equal(apply.id,'idtspe.lens.apply');
  for(const command of [select,apply]){assert.equal(command.methodologyBinding?.surfaceKind,'ORCHESTRATION');assert.equal(command.methodologyBinding?.lensId,null);}
  assert.equal(select.methodologyBinding?.hostTargetPolicy,'CREATE_OR_REUSE_TARGET');
  assert.equal(apply.methodologyBinding?.hostTargetPolicy,'RESOLVE_OR_REUSE_TARGET');
  assert.match(select.meaning,/TF-06A LENS_SET/);assert.match(select.keyReminders.join(' '),/Local Target Contract/);
  assert.match(apply.meaning,/Knowledge Basis/);assert.match(apply.keyReminders.join(' '),/does not create a Lens-owned Target/);
});


test('canonical SDS authority is singular and legacy Mini/Modular/Full commands are hidden representation preferences',()=>{
  assert.equal(fs.existsSync(path.join(repoRoot,'planning/documentation/profiles/sds-planning-profiles.md')),false);
  assert.equal(fs.existsSync(path.join(repoRoot,'planning/documentation/profiles/scenario-domain-slice-docs-profile.md')),false);
  const map=read('planning/documentation/idtspe-methodology/active/profiles/sds/ARTIFACT-PLACEMENT-MAP.md');
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
  assert.match(command.meaning,/TM-\*/);
  assert.match(command.meaning,/LENS-\*/);
  assert.match(command.meaning,/Ambiguous or unknown selectors are not guessed/i);
  const sdsTm=read('planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/README.md');
  const coreLens=read('planning/documentation/idtspe-methodology/active/idtspe-core/lenses/README.md');
  const sdsLens=read('planning/documentation/idtspe-methodology/active/profiles/sds/lenses/README.md');
  for(const alias of ['application','scenario','domain','slice-strategy','slice','crosscut'])assert.match(sdsTm,new RegExp('`'+alias+'`'));
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
  const add=(alias,id,source)=>{assert.match(alias,/^[a-z0-9-]+$/,`${source}: invalid alias ${alias}`);aliases.push({alias,id,source})};

  const sdsTm=read('planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/README.md');
  for(const line of sdsTm.split(/\r?\n/)){
    const m=line.match(/^\| \[`(TM-[A-Z0-9-]+)`\]\([^)]*\) \| `([a-z0-9-]+)` \|/);
    if(m)add(m[2],m[1],'SDS Target Module registry');
  }
  assert.equal(aliases.filter((x)=>x.source==='SDS Target Module registry').length,12);

  const coreTm=read('planning/documentation/idtspe-methodology/active/idtspe-core/target-modules/README.md');
  for(const m of coreTm.matchAll(/^idtspe ([a-z0-9-]+) <scope>\n→ (TM-[A-Z0-9-]+)$/gm))add(m[1],m[2],'Core Target Module registry');
  assert.equal(aliases.filter((x)=>x.source==='Core Target Module registry').length,2);

  for(const [source,rel] of [
    ['Core Lens registry','planning/documentation/idtspe-methodology/active/idtspe-core/lenses/README.md'],
    ['SDS Lens registry','planning/documentation/idtspe-methodology/active/profiles/sds/lenses/README.md']
  ]){
    for(const line of read(rel).split(/\r?\n/)){
      const m=line.match(/^([a-z0-9-]+)\s+→\s+(LENS-[A-Z0-9-]+)$/);
      if(m)add(m[1],m[2],source);
    }
  }
  assert.equal(aliases.filter((x)=>x.source==='Core Lens registry').length,11);
  assert.equal(aliases.filter((x)=>x.source==='SDS Lens registry').length,6);

  const byAlias=new Map();
  for(const item of aliases){
    const prior=byAlias.get(item.alias);
    assert.equal(prior,undefined,`idtspe alias collision: ${item.alias} -> ${prior?.id} / ${item.id}`);
    byAlias.set(item.alias,item);
  }
  assert.equal(byAlias.size,31);

  for(const [alias,id] of [
    ['scenario','TM-SCENARIO-PLANNING'],
    ['slice','TM-IMPLEMENTATION-SLICE'],
    ['pre-update','TM-PRE-UPDATE-PLAN'],
    ['ddd','LENS-DOMAIN-MODELING-DDD'],
    ['l5','LENS-WORKSPACE-EVOLUTION-ARCHITECTURE'],
    ['representation','LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY']
  ])assert.equal(byAlias.get(alias)?.id,id,alias);
});
