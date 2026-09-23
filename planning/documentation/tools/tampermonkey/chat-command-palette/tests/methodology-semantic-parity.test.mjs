import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const moduleRoot=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const repoRoot=path.resolve(moduleRoot,'../../../../..');
const commands=JSON.parse(fs.readFileSync(path.join(moduleRoot,'seed','commands.json'),'utf8')).items;
const byId=new Map(commands.map((entry)=>[entry.id,entry]));
const read=(rel)=>fs.readFileSync(path.join(repoRoot,rel),'utf8');
const commandText=(id)=>{
  const d=byId.get(id); assert.ok(d,`missing ${id}`);
  return [d.meaning,d.expectedOutput,d.helperPresentation?.whenToUse,d.helperPresentation?.whatYouGet].filter(Boolean).join('\n');
};

test('Scenario primary command matches journey-composition ownership',()=>{
  const d=byId.get('application_scenario.plan'); assert.ok(d);
  assert.equal(d.methodologyBinding?.targetModuleId,'TM-SCENARIO-PLANNING');
  const text=commandText('application_scenario.plan');
  assert.match(text,/actor\/external journey/i);
  assert.match(text,/Benefit manifestation\/closure|Benefits may manifest or close/i);
  assert.match(text,/Feature/);
  assert.doesNotMatch(text,/Scenario Behavior|DATA\s*\+\s*Behavior Items|Development\/Change Outlook/i);
});

test('Domain commands distinguish transient discovery from optional durable owner',()=>{
  assert.equal(byId.get('application_domain.discover')?.methodologyBinding?.targetModuleId,'TM-DOMAIN-DISCOVERY');
  assert.equal(byId.get('application_domain.plan')?.methodologyBinding?.targetModuleId,'TM-DOMAIN-OWNER');
  assert.match(commandText('application_domain.plan'),/durable Domain/i);
  assert.match(commandText('application_domain.discover'),/transient Domain/i);
  assert.doesNotMatch(commandText('application_domain.plan'),/same (?:recurring )?Target family/i);
});

test('Slice primary commands use current RU-SLICE surface',()=>{
  const text=commandText('application_slice.plan');
  for(const id of ['RU-SLICE-01','RU-SLICE-02','RU-SLICE-03','RU-SLICE-04','RU-SLICE-05']) assert.match(text,new RegExp(id));
  assert.doesNotMatch(text,/RU-SSTRAT/);
  assert.doesNotMatch(commandText('tmcmd.slice.implementation.detail'),/Uses\/ownership boundary|optional Runtime Path and Evolution Steps/i);
});

test('Screen primary command composes Feature and Scenario journey spatial meaning',()=>{
  const text=commandText('tmcmd.screen');
  assert.match(text,/Feature/);
  assert.match(text,/Feature\/Scenario participation/i);
  assert.doesNotMatch(text,/Scenario behavior requires/i);
});

test('Slice RU schema stays in parity across TM, Core example and supporting template',()=>{
  const files=[
    'planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-IMPLEMENTATION-SLICE.md',
    'planning/documentation/idtspe-methodology/active/idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md',
    'planning/documentation/application-planning/templates/IMPLEMENTATION-SLICE-DRAFT-TEMPLATE.md'
  ];
  for(const rel of files){
    const text=read(rel);
    for(const id of ['RU-SLICE-01','RU-SLICE-02','RU-SLICE-03','RU-SLICE-04','RU-SLICE-05']) assert.match(text,new RegExp(id),`${rel}: missing ${id}`);
    assert.doesNotMatch(text,/RU-SSTRAT/,`${rel}: stale RU-SSTRAT`);
  }
});

test('active SDS registries expose 13 Target Modules and 8 Lenses, excluding retired stubs',()=>{
  const tm=read('planning/documentation/idtspe-methodology/active/profiles/sds/registries/TARGET-MODULE-REGISTRY.md');
  const activeTms=[...tm.matchAll(/^\| \[`(TM-[^`]+)`\]\([^)]+\.md\)/gm)].map((m)=>m[1]);
  assert.equal(activeTms.length,13);
  const lens=read('planning/documentation/idtspe-methodology/active/profiles/sds/registries/LENS-REGISTRY.md');
  const activeLenses=[...lens.matchAll(/^\| \[`(LENS-[^`]+)`\]\([^)]+\.md\)/gm)].map((m)=>m[1]);
  assert.equal(activeLenses.length,8);
  for(const id of ['TM-REQUIREMENT','TM-SLICE-STRATEGY','TM-CROSS-CUTTING-CONCERN','TM-TEST-DESIGN','TM-TEST-STRATEGY']){
    assert.equal(activeTms.includes(id),false,`${id}: retired identity leaked into active registry`);
    assert.match(tm,new RegExp(`\| \`${id}\` \| RETIRE`),`${id}: retirement route must remain explicit in the registry`);
  }
});

test('semantic contracts use registry-driven parity instead of frozen obsolete counts',()=>{
  for(const rel of [
    'planning/documentation/idtspe-methodology/active/idtspe-core/lenses/LENS-MODEL.md',
    'planning/documentation/idtspe-methodology/active/idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md'
  ]){
    const text=read(rel);
    assert.doesNotMatch(text,/12\/12 SDS|12 SDS Target|6\/6 SDS|6 SDS-specific reusable Lenses|11 Core \+ 6 SDS/i,rel);
    assert.match(text,/registry/i,`${rel}: parity should be registry-driven`);
  }
});

test('Session interaction contract is ambient bootstrap, not a mandatory command-routing hop',()=>{
  const session=read('planning/session/session-runtime-contract.md');
  const coreCommands=read('planning/documentation/idtspe-methodology/active/idtspe-core/commands/IDTSPE-COMMAND-SURFACE-CONTRACT.md');
  const registryMap=read('planning/documentation/use-case-registry-map.md');
  assert.match(session,/must-understand at session bootstrap or safe context restoration/i);
  assert.match(session,/must not route through Session/i);
  assert.match(coreCommands,/inheritance, not routing/i);
  assert.match(coreCommands,/routes directly to its current semantic owner/i);
  assert.match(registryMap,/is\s+\*\*not\*\*\s+another row in this functional methodology-routing map/i);
});

test('Evolution horizon keeps near changed Feature complete and later Feature Impact bounded',()=>{
  const evo=read('planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-EVOLUTION-STEP.md');
  assert.match(evo,/REALIZATION_NEAR.*complete Target Owner Body/);
  assert.match(evo,/LATER_HORIZON.*bounded Evolution Impact/);
  assert.match(evo,/Feature at LATER_HORIZON when a bounded Impact suffices/);
  assert.match(evo,/Never keep two competing copies of the same Feature future meaning/);
  assert.match(evo,/REALIZATION_NEAR `NEW` or `CHANGED` Feature.*complete `TM-FEATURE`/);
});

test('Proposal Target Result forms an ordinary candidate Target Instance before semantic selection without granting realization authority',()=>{
  const proposal=read('planning/documentation/idtspe-methodology/active/idtspe-core/resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md');
  const target=read('planning/documentation/idtspe-methodology/active/idtspe-core/runtime/target-work/TARGET-CONTRACT-INSTANCE-SOURCE-RELATION-MODEL.md');
  const scenario=read('planning/documentation/idtspe-methodology/active/idtspe-core/evaluation/USE-CASE-SCENARIO-MAP.md');
  const evo=read('planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-EVOLUTION-STEP.md');
  assert.match(proposal,/form the same complete candidate Target Instance before semantic selection/);
  assert.match(target,/candidate Target Instance.*ordinary Target Instance/is);
  assert.match(target,/instantiated Module-defined Unit inventory/);
  assert.match(scenario,/form an ordinary candidate Target Instance through the applicable Target Module before semantic selection/);
  assert.match(evo,/Selection\/authorization is intentionally not stored as an internal readiness blocker inside a Proposal Target Result/);
  assert.match(evo,/Actual realization execution still requires the applicable external selection\/authorization in addition to `READY`/);
});

test('Requirement Type remains optional and Evolution concern analysis routes established transition obligations to RU-EVO-05',()=>{
  const requirement=read('planning/documentation/idtspe-methodology/active/profiles/sds/profile-contracts/requirements/REQUIREMENT-CLASSIFICATION-AND-REPRESENTATION.md');
  const registry=read('planning/documentation/idtspe-methodology/active/profiles/sds/registries/METHODOLOGY-REGISTRY-DIRECTORY.md');
  const evo=read('planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-EVOLUTION-STEP.md');
  assert.match(requirement,/not mandatory for every Requirement/);
  assert.match(registry,/use Type only when materially useful/);
  assert.match(evo,/RU-EVO-03` owns the \*\*concern \/ analysis pressure\*\*/);
  assert.match(evo,/one-time transition\/proof must-hold whose natural subject is the Step\s*→ RU-EVO-05 Transition \/ Proof Obligation/);
});

test('current-owner reverse Evolution Impact has one shared SDS contract and owner-local Units only specialize it',()=>{
  const shared=read('planning/documentation/idtspe-methodology/active/profiles/sds/profile-contracts/evolution/CURRENT-OWNER-EVOLUTION-IMPACT-PROJECTION.md');
  assert.match(shared,/every \*\*concrete unrealized Evolution Step\*\*/i);
  assert.match(shared,/Selection is not the threshold/);
  assert.match(shared,/Projection depth must not exceed Step-side meaning already resolved/);
  const expectations=[
    ['planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-FEATURE.md','RU-FEAT-06'],
    ['planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-SCENARIO-PLANNING.md','RU-SCEN-02'],
    ['planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-SCREEN.md','RU-SCREEN-03'],
    ['planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-DOMAIN-OWNER.md','RU-DOWN-03'],
    ['planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-SLICE-OWNER.md','RU-SOWN-03'],
    ['planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-SHARED-IMPLEMENTATION-CAPABILITY.md','RU-SHARED-04']
  ];
  for(const [rel,id] of expectations){
    const text=read(rel);
    assert.ok(text.includes(`| \`${id}\` | Evolution Impact`),`${rel}: missing reverse Impact Unit`);
    assert.match(text,/Current-Owner Evolution Impact Projection Contract/i,`${rel}: must reference shared projection owner`);
  }
});

test('Evolution Steps Map stays a projection while Step and shared Impact contracts own semantics',()=>{
  const map=read('planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-EVOLUTION-STEPS-MAP.md');
  const impact=read('planning/documentation/idtspe-methodology/active/profiles/sds/profile-contracts/evolution/CURRENT-OWNER-EVOLUTION-IMPACT-PROJECTION.md');
  assert.match(map,/Map owns only registry\/routing\/projection behavior/);
  assert.match(map,/Projection Source Contracts/);
  assert.match(map,/reads and projects, but does not independently define or recompute/);
  assert.match(map,/leave active future projection/);
  assert.match(map,/realized predecessor \/ lineage reference/i);
  assert.match(impact,/Step realized\/materialized[\s\S]*remove it from active future-impact projection/);
});

test('SDS registry routes temporal semantics instead of becoming a second semantic owner',()=>{
  const evo=read('planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-EVOLUTION-STEP.md');
  const placement=read('planning/documentation/idtspe-methodology/active/profiles/sds/representation/ARTIFACT-PLACEMENT-MAP.md');
  const registry=read('planning/documentation/idtspe-methodology/active/profiles/sds/registries/TARGET-MODULE-REGISTRY.md');
  assert.doesNotMatch(evo,/continuing continuation/);
  assert.doesNotMatch(placement,/continuing continuation/);
  assert.match(registry,/Core \/ Temporal Conformance Routing/);
  assert.match(registry,/does not restate those contracts/);
  assert.match(registry,/Current-Owner Evolution Impact Projection Contract/);
  assert.doesNotMatch(registry,/## Temporal Hosting Rule/);
});



test('Core distinguishes Target Work Units from Core State Units without one peer result inventory',()=>{
  const unit=read('planning/documentation/idtspe-methodology/active/idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md');
  assert.match(unit,/Target Work Unit/);
  assert.match(unit,/Core State Unit/);
  assert.match(unit,/Core State Units[\s\S]*are not peer Target Work Units/i);
  assert.match(unit,/Target Step Result[\s\S]*Current Result Content/);
  assert.match(unit,/Core State Unit[\s\S]*not.*automatic.*Target Step Result/is);
  assert.match(unit,/Module-defined Unit/);
  assert.match(unit,/Contextual Unit/);
});

test('Source model uses consumer-side Source State Units and keeps TF-04 runtime Source Set distinct from Source Contract archetype',()=>{
  const target=read('planning/documentation/idtspe-methodology/active/idtspe-core/runtime/target-work/TARGET-CONTRACT-INSTANCE-SOURCE-RELATION-MODEL.md');
  const formation=read('planning/documentation/idtspe-methodology/active/idtspe-core/runtime/target-work/RESOLUTION-SLOT-AND-TARGET-FORMATION-SET.md');
  const module=read('planning/documentation/idtspe-methodology/active/idtspe-core/target-modules/TARGET-MODULE-MODEL.md');
  assert.match(target,/Source Subject/);
  assert.match(target,/Source State Unit/);
  assert.match(target,/consumer-side typed Core State Unit\/binding/);
  assert.match(target,/Target Relation[\s\S]*≠ Source relation/);
  assert.match(formation,/SOURCE_AUTHORITY[\s\S]*Source State Units\/bindings/);
  assert.match(formation,/former fixed `TF-\*` Target Formation Resolution Set is no longer the canonical Target model/);
  assert.match(module,/Source Contract archetypes[\s\S]*`SOURCE_AUTHORITY` Requirement plus `P-04 Source` resolve actual Source State Units\/bindings/);
});

test('Documentation responsibility map routes to canonical owners without replacing Documentation role semantics',()=>{
  const principles=read('planning/documentation/principles-and-terminology.md');
  const active=read('planning/documentation/idtspe-methodology/active/README.md');
  const map=read('planning/documentation/idtspe-methodology/active/navigation/METHODOLOGY-RESPONSIBILITY-MAP.md');
  assert.match(principles,/## Responsibility Map/);
  assert.match(principles,/routing mapping.*not the semantic body/is);
  assert.match(active,/METHODOLOGY-RESPONSIBILITY-MAP\.md/);
  assert.match(map,/Target Work \/ Target Formation \/ Target Instance \/ Source-Relation/);
  assert.match(map,/idtspe-core\/runtime\/target-work\/RESPONSIBILITY-MAP\.md/);
  assert.match(map,/Target Module Meta-Model \/ discovery/);
  assert.match(map,/Responsibility Map row ≠ copied semantic contract/);
});


test('Module-defined Unit visibility wording does not reintroduce materiality-gated rendering',()=>{
  const dirs=[
    'planning/documentation/idtspe-methodology/active/idtspe-core/target-modules',
    'planning/documentation/idtspe-methodology/active/profiles/sds/target-modules'
  ];
  for(const dir of dirs){
    for(const name of fs.readdirSync(path.join(repoRoot,dir)).filter((name)=>name.endsWith('.md'))){
      const rel=`${dir}/${name}`;
      const text=read(rel);
      assert.doesNotMatch(text,/\| Result Unit \| Make explicit when \|/i,`${rel}: stale materiality-gated visibility wording`);
    }
  }
  for(const rel of [
    'planning/documentation/idtspe-methodology/active/profiles/reference-knowledge/target-modules/TM-RK-10-ENTRY.md',
    'planning/documentation/idtspe-methodology/active/profiles/reference-knowledge/target-modules/TM-RK-50-LANDSCAPE-ANALYSIS.md'
  ]){
    assert.doesNotMatch(read(rel),/\*\*Applicability \/ Omission\.\*\* Include when/i,`${rel}: stale include/absence wording`);
  }
});

test('Application Definition keeps Target formation gates outside Unit omission and Domain Discovery can use candidate Step state',()=>{
  const app=read('planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-APPLICATION-DEFINITION.md');
  const domain=read('planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-DOMAIN-DISCOVERY.md');
  assert.doesNotMatch(app,/omit only if the module itself is not needed|omit only when no Application Definition Target is justified/i);
  assert.match(app,/RU-APP-01[\s\S]*no Unit-level omission after Target formation/i);
  assert.match(app,/RU-APP-04[\s\S]*no Unit-level omission after Target formation/i);
  assert.match(domain,/relevant concrete candidate\/selected Evolution Steps, preserving their planning position/i);
});

test('Core Target Step Result topology includes complete Module-defined Unit inventory and formed Contextual Units',()=>{
  const unit=read('planning/documentation/idtspe-methodology/active/idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md');
  const shell=read('planning/documentation/idtspe-methodology/active/idtspe-core/runtime/IDTSPE-RUNTIME-COMPOSITION-CONTRACT.md');
  const target=read('planning/documentation/idtspe-methodology/active/idtspe-core/runtime/target-work/TARGET-CONTRACT-INSTANCE-SOURCE-RELATION-MODEL.md');
  const map=read('planning/documentation/idtspe-methodology/active/idtspe-core/navigation/IDTSPE-CORE-MAP.md');
  for(const [rel,text] of [['unit',unit],['shell',shell],['target',target],['map',map]]){
    assert.match(text,/complete (?:instantiated )?Module-defined Unit inventory/i,`${rel}: missing complete Unit inventory topology`);
  }
  assert.doesNotMatch(unit,/Target Step Result\s*= coherent projection\/composition of applicable Target Work Unit Result Content/i);
  assert.doesNotMatch(shell,/Target Step Result composed from applicable Unit Result Content/i);
  assert.doesNotMatch(target,/Target Step Result[\s\S]{0,180}= composition\/projection of applicable/i);
  assert.match(unit,/Proposal Target Result[\s\S]*candidate Target Instance[\s\S]*Current Result Content/is);
});

test('Visual and Reference Knowledge representations keep omitted Module-defined Units visible and bind Unit methodology',()=>{
  const visualInv=read('planning/documentation/idtspe-methodology/active/profiles/visual-production-2d/profile-contracts/VISUAL-PRODUCTION-INVARIANTS.md');
  const visualTpl=read('planning/documentation/idtspe-methodology/active/profiles/visual-production-2d/representation/templates/TARGET-INSTANCE.template.md');
  const rkTpl=read('planning/documentation/idtspe-methodology/active/profiles/reference-knowledge/representation/templates/TARGET-INSTANCE.template.md');
  assert.match(visualInv,/concrete Target result keeps the Unit heading\/identity visible with its concise omission reason/i);
  assert.match(visualInv,/not Unit non-existence/i);
  for(const [rel,text] of [['visual template',visualTpl],['reference template',rkTpl]]){
    assert.match(text,/complete Module-defined Unit inventory/i,`${rel}: missing complete Unit inventory`);
    assert.match(text,/\*\*Methodology \/ Unit Definition:\*\* \[exact reusable Unit owner\]/,`${rel}: missing methodology binding placeholder`);
    assert.match(text,/RESOLVED \| OPEN \| OMITTED/,`${rel}: missing explicit Unit disposition`);
  }
  const visualDir='planning/documentation/idtspe-methodology/active/profiles/visual-production-2d/target-modules';
  for(const name of fs.readdirSync(path.join(repoRoot,visualDir)).filter((name)=>name.startsWith('TM-')&&name.endsWith('.md'))){
    const text=read(`${visualDir}/${name}`);
    assert.match(text,/## Module-defined Unit Inventory/,`${name}: inventory must be fixed Module-defined Units`);
    assert.doesNotMatch(text,/## Candidate Unit Inventory/,`${name}: candidate-Unit existence ontology must not return`);
  }
});

test('Natural Subject has one Core semantic owner while TM model and L2 only conform/evaluate',()=>{
  const unit=read('planning/documentation/idtspe-methodology/active/idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md');
  const tm=read('planning/documentation/idtspe-methodology/active/idtspe-core/target-modules/TARGET-MODULE-MODEL.md');
  const lens=read('planning/documentation/idtspe-methodology/active/idtspe-core/lenses/required/LENS-AUTHORITY-SOT-REUSE.md');
  assert.match(unit,/### Natural Subject \/ Ownership Boundary/);
  assert.match(unit,/smallest natural semantic subject/);
  assert.match(tm,/Canonical Natural Subject \/ Ownership Boundary semantics are owned by the Core/);
  assert.doesNotMatch(tm,/meaning naturally owned by another Target \/ Unit/);
  assert.match(lens,/Evaluate the material under the canonical Core/);
  assert.doesNotMatch(lens,/current Target \/ current Unit\s*→ valid local ownership candidate/);
});

test('Visual and Reference profiles use fixed Module-defined Unit inventory rather than candidate-unit existence selection',()=>{
  for(const dir of [
    'planning/documentation/idtspe-methodology/active/profiles/visual-production-2d/target-modules',
    'planning/documentation/idtspe-methodology/active/profiles/reference-knowledge/target-modules'
  ]){
    for(const name of fs.readdirSync(path.join(repoRoot,dir)).filter((n)=>n.startsWith('TM-')&&n.endsWith('.md'))){
      const text=read(`${dir}/${name}`);
      assert.match(text,/## Module-defined Unit Inventory/,`${dir}/${name}: missing fixed inventory heading`);
      assert.doesNotMatch(text,/## Candidate Unit Inventory/,`${dir}/${name}: stale candidate inventory`);
    }
  }
  const visualRule=read('planning/documentation/idtspe-methodology/active/profiles/visual-production-2d/runtime/UNIT-DISPOSITION-AND-LENS-CHECKPOINTS.md');
  assert.match(visualRule,/do not decide whether the Unit exists/);
  assert.match(visualRule,/material Finding exists: linked Proposal follows canonical Finding\/Proposal lifecycle/);
  assert.match(visualRule,/semantic Decision\/selection only when the RE route actually contains a material unresolved choice/);
  assert.doesNotMatch(visualRule,/USER selection when not already current/);
});

test('Artifact Lens references Documentation link authority instead of re-owning it',()=>{
  const principles=read('planning/documentation/principles-and-terminology.md');
  const lens=read('planning/documentation/idtspe-methodology/active/idtspe-core/lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md');
  assert.match(principles,/### Markdown Link Navigation Rule/);
  assert.match(lens,/apply the canonical Documentation \[Markdown Link Navigation Rule\]/);
  assert.match(lens,/does not redefine link\/ownership\/dependency authority semantics/);
});

test('Evolution materialization Unit accepts candidate selected and branch-assumed represented routes',()=>{
  const evo=read('planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-EVOLUTION-STEP.md');
  assert.match(evo,/represented candidate\/selected\/assumed route Target Owner Bodies/);
  assert.match(evo,/represented candidate\/selected\/assumed route planning needs them/);
});

test('Target Module model references Core runtime disposition semantics instead of re-owning them',()=>{
  const tm=read('planning/documentation/idtspe-methodology/active/idtspe-core/target-modules/TARGET-MODULE-MODEL.md');
  assert.match(tm,/Canonical runtime Unit disposition and Target Step Result composition are owned by the Core/);
  assert.match(tm,/target-family-specific composition constraints; generic runtime composition stays Core-owned/);
  assert.doesNotMatch(tm,/Material resolved Units contribute \*\*Current Result Content\*\*; material unresolved Units remain `OPEN`/);
});

test('SDS Target Modules route generic Unit disposition semantics to Core and keep only local materiality triggers',()=>{
  const dir='planning/documentation/idtspe-methodology/active/profiles/sds/target-modules';
  for(const name of fs.readdirSync(path.join(repoRoot,dir)).filter((n)=>n.startsWith('TM-')&&n.endsWith('.md'))){
    const text=read(`${dir}/${name}`);
    if(!/### Result Unit Applicability \/ Materiality/.test(text)) continue;
    assert.match(text,/Unit presence\/disposition mechanics follow the Core/,`${name}: must route generic disposition semantics to Core`);
    assert.doesNotMatch(text,/Every Module-defined Result Unit.*declared in every concrete/i,`${name}: must not re-own generic visibility rule`);
    assert.doesNotMatch(text,/Do not use bare `N\/A`/,`${name}: must not duplicate Core omission guard`);
  }
});

test('owner-local Evolution Impact processing delegates shared inclusion depth and temporal guards to one contract',()=>{
  const expectations=[
    ['TM-FEATURE.md','RU-FEAT-06'],
    ['TM-SCENARIO-PLANNING.md','RU-SCEN-02'],
    ['TM-SCREEN.md','RU-SCREEN-03'],
    ['TM-DOMAIN-OWNER.md','RU-DOWN-03'],
    ['TM-SLICE-OWNER.md','RU-SOWN-03'],
    ['TM-SHARED-IMPLEMENTATION-CAPABILITY.md','RU-SHARED-04']
  ];
  const dir='planning/documentation/idtspe-methodology/active/profiles/sds/target-modules';
  for(const [name,id] of expectations){
    const text=read(`${dir}/${name}`);
    const start=text.indexOf(`#### \`${id}\` processing envelope`);
    assert.notEqual(start,-1,`${name}: missing ${id} processing envelope`);
    const end=text.indexOf('\n\n',start+10);
    const nextEnd=text.indexOf('\n\n',end+2);
    const block=text.slice(start,nextEnd>0?nextEnd:undefined);
    assert.match(block,/Current-Owner Evolution Impact Projection Contract/,`${name}: ${id} must delegate to shared contract`);
    assert.doesNotMatch(block,/regardless of selected\/candidate|no deeper than|never copy the Target|stale\/realized Steps/,`${name}: ${id} must not restate shared projection algorithm`);
  }
});


test('Application Definition keeps Responsibility Boundary inside each Benefit and uses concise Concept/RLS semantics',()=>{
  const app=read('planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-APPLICATION-DEFINITION.md');
  const scenario=read('planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-SCENARIO-PLANNING.md');
  const lens=read('planning/documentation/idtspe-methodology/active/profiles/sds/lenses/reusable/LENS-APPLICATION-BOUNDARY-FEASIBILITY.md');
  const local=read('planning/documentation/tools/replacement-package-app/application-definition.md');
  assert.match(app,/RU-APP-03` \| Application Benefits/);
  assert.match(app,/RU-APP-04` \| Representative Real-Life Scenarios/);
  assert.match(app,/RU-APP-05` \| Application Concept/);
  assert.match(app,/RU-APP-07` \| Realization Feasibility/);
  assert.doesNotMatch(app,/\| `RU-APP-06` \| Responsibility Boundary \|/);
  assert.doesNotMatch(app,/#### `RU-APP-06` processing envelope/);
  assert.match(app,/User Need[\s\S]*User Receives[\s\S]*Responsibility Boundary[\s\S]*Additional Info/);
  assert.match(app,/Responsibility Boundary \/ Constraints` is \*\*Benefit-local\*\*/);
  assert.match(app,/Summary:[\s\S]*why it is needed \/ what overall Benefit it provides[\s\S]*How it roughly works:/i);
  assert.match(app,/How it roughly works — required; short, conceptual, not detailed behavior\/architecture/i);
  assert.match(app,/SDS\.APPLICATION-BENEFIT-BOUNDARY-CONSTRAINTS/);
  assert.match(app,/AB-X \/ BC-Y/);
  const feature=read('planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-FEATURE.md');
  assert.match(feature,/AB-\* \/ BC-\*/);
  assert.doesNotMatch(app,/How it roughly works — required when needed for comprehension/i);
  assert.match(app,/primary purpose is to make one or several Application Benefits understandable through concrete real-life situations/i);
  assert.match(app,/one Benefit may appear in several Representative RLS|One Benefit may appear in several Representative RLS/i);
  assert.match(app,/RLS must not decompose Target internals/i);
  assert.doesNotMatch(app,/Core Real-Life Scenario Position|Core vs Secondary Real-Life/);
  assert.match(scenario,/Benefit manifestation \/ closure/);
  assert.match(scenario,/Benefits remain upstream Application Definition authority/);
  assert.match(lens,/Canonical Benefit\/RLS schemas and authority are owned by/);
  assert.match(lens,/SDS\.APPLICATION-BENEFIT-BOUNDARY-CONSTRAINTS/);
  assert.match(lens,/Responsibility Boundary \/ Constraints/);
  assert.doesNotMatch(lens,/TM-APPLICATION-DEFINITION`: `RU-APP-01\.\.RU-APP-07`/);
  assert.doesNotMatch(local,/## RU-APP-0?6 .*Responsibility Boundary/);
  assert.match(local,/## RU-APP-03 — Application Benefits[\s\S]*Responsibility Boundary \/ Constraints:/);
  assert.match(local,/## RU-APP-05 — Application Concept[\s\S]*\*\*Summary:\*\*[\s\S]*\*\*How it roughly works:\*\*/);
});

test('Proposal Decision Resolution Context Lens is operational evaluator, QRPE is a view, and Carry-Forward is projection-only',()=>{
  const lens=read('planning/documentation/idtspe-methodology/active/idtspe-core/lenses/required/LENS-PROPOSAL-DECISION-RESOLUTION-CONTEXT.md');
  const life=read('planning/documentation/idtspe-methodology/active/idtspe-core/resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md');
  const qrp=read('planning/documentation/idtspe-methodology/active/idtspe-core/resolution/qrp/QRP-LIFECYCLE-AND-REVIEW.md');
  const carry=read('planning/documentation/idtspe-methodology/active/idtspe-core/resolution/continuation/RESOLUTION-CARRY-FORWARD-PROJECTION.md');
  assert.match(lens,/Activation: `REQUIRED_CORE` on a material Proposal \/ Decision surface/);
  assert.match(lens,/QRPE.*not.*new Core State kind/is);
  assert.match(lens,/Lens ≠ Proposal\/Decision lifecycle owner/);
  assert.match(life,/Candidate Review \/ Resolution Context Handoff/);
  assert.doesNotMatch(life,/Driver \/ Need fit[\s\S]*Necessity \/ Better Route/);
  assert.match(qrp,/Proposal \/ Decision QRPE Navigation/);
  assert.match(carry,/projection \/ aggregate navigation owner/);
  assert.match(carry,/Carry-Forward ≠ semantic owner/);
});

test('generic Decision capture command never grants selection authority and Proposal command uses Resolution Context Lens',()=>{
  const proposal=read('planning/commands/idtspe-proposal.command.md');
  const decisions=read('planning/commands/idtspe-decisions-capture.command.md');
  const surface=read('planning/documentation/idtspe-methodology/active/idtspe-core/commands/IDTSPE-COMMAND-SURFACE-CONTRACT.md');
  assert.match(proposal,/LENS-PROPOSAL-DECISION-RESOLUTION-CONTEXT/);
  assert.match(decisions,/"id": "idtspe.decisions.capture"/);
  assert.match(decisions,/Only actual material selections become Decision semantics|actual selected material Decisions/i);
  assert.match(decisions,/never grants selection authority|does not grant AI selection authority/i);
  assert.match(surface,/Primary User Convenience Surface Inventory — 18/);
  assert.match(surface,/idtspe\.decisions\.capture/);
});

test('formed Target Units stay present: reverse Impact, Practical Test evidence and Slice-owner identity use dispositions not Unit absence',()=>{
  const dir='planning/documentation/idtspe-methodology/active/profiles/sds/target-modules';
  for(const [name,id] of [
    ['TM-FEATURE.md','RU-FEAT-06'],['TM-SCENARIO-PLANNING.md','RU-SCEN-02'],['TM-SCREEN.md','RU-SCREEN-03'],
    ['TM-DOMAIN-OWNER.md','RU-DOWN-03'],['TM-SLICE-OWNER.md','RU-SOWN-03'],['TM-SHARED-IMPLEMENTATION-CAPABILITY.md','RU-SHARED-04']]){
    const text=read(`${dir}/${name}`);
    const line=text.split('\n').find((x)=>x.includes(`| \`${id}\` |`) && /OMITTED/.test(x));
    assert.ok(line,`${name}: ${id} must keep explicit OMITTED future/nonmaterial disposition`);
    assert.doesNotMatch(line,/omit from the Target|future Target .* omits/i);
  }
  const ptest=read(`${dir}/TM-PRACTICAL-TEST.md`);
  assert.doesNotMatch(ptest,/RU-PTEST-03` is absent until/);
  assert.match(ptest,/RU-PTEST-03` remains an instantiated Module-defined Unit/);
  const sown=read(`${dir}/TM-SLICE-OWNER.md`);
  assert.match(sown,/RU-SOWN-01[\s\S]*Target-level Slice-owner formation gate fails/i);
});


test('required Core Lens Pack includes Proposal Decision Resolution Context only on material Proposal Decision surfaces',()=>{
  const model=read('planning/documentation/idtspe-methodology/active/idtspe-core/lenses/LENS-MODEL.md');
  const registry=read('planning/documentation/idtspe-methodology/active/idtspe-core/lenses/LENS-REGISTRY.md');
  assert.match(model,/Proposal \/ Decision Resolution Context — when a material Proposal\/Decision surface exists/);
  assert.match(model,/Proposal \/ Decision Resolution Context is `NOT_APPLICABLE` when no material Proposal\/Decision surface exists/);
  assert.match(registry,/required Core Pack[\s\S]*Proposal \/ Decision Resolution Context when a material Proposal\/Decision surface exists/);
});

test('Scenario command and representation surfaces use multi-Benefit manifestation closure rather than terminal-Benefit shorthand',()=>{
  const files=[
    'planning/commands/plan-application-scenario.command.md',
    'planning/commands/collect-scenario-ideas.command.md',
    'planning/commands/discover-application-scenarios.command.md',
    'planning/documentation/application-planning/templates/SCENARIO-DRAFT-TEMPLATE.md',
    'planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-SCENARIO-PLANNING.md'
  ];
  for(const rel of files){
    const text=read(rel);
    assert.doesNotMatch(text,/terminal Benefit|actor-to-Benefit|actor-to-benefit/i,`${rel}: stale single/terminal Benefit Scenario shorthand`);
  }
  const plan=read(files[0]);
  assert.match(plan,/one-or-more Benefit manifestation\/closure points when material/);
});

test('Practical Test Unit disposition never uses Target non-formation as a Unit omission rule',()=>{
  const ptest=read('planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-PRACTICAL-TEST.md');
  const row=ptest.split('\n').find((line)=>line.includes('| `RU-PTEST-01` |') && line.includes('when a property requires observation')) ?? '';
  assert.match(row,/`OMITTED`/);
  assert.doesNotMatch(row,/omit the Practical Test Target/i);
  assert.match(row,/Target formation itself is decided before this Unit-level disposition/);
});


test('SDS Unit materiality tables use whole-Unit dispositions rather than inner-detail omission prose',()=>{
  const dir='planning/documentation/idtspe-methodology/active/profiles/sds/target-modules';
  const offenders=[];
  for(const name of fs.readdirSync(path.join(repoRoot,dir)).filter((n)=>n.startsWith('TM-')&&n.endsWith('.md'))){
    const text=read(`${dir}/${name}`);
    const table=(text.match(/\| Result Unit \| Substantive resolution is material when \| Unit disposition when substantive resolution is not material \|\n\|---\|---\|---\|\n([\s\S]*?)(?=\n\n)/)||[])[1]||'';
    if(!table) continue;
    for(const line of table.split('\n')){
      if(!/^\| `RU-/.test(line)) continue;
      const cells=line.split('|').map((v)=>v.trim());
      const disposition=cells[3]||'';
      if(!/`OMITTED`|no Unit-level omission|do not omit/i.test(disposition)) offenders.push(`${name}: ${line}`);
    }
  }
  assert.deepEqual(offenders,[]);
});

test('Exact Realization separates Target activation from formed Unit existence',()=>{
  const exact=read('planning/documentation/idtspe-methodology/active/idtspe-core/target-modules/TM-EXACT-REALIZATION.md');
  const table=(exact.match(/\| Result Unit \| Substantive resolution is material when \| Target\/Unit disposition when not material \|\n\|---\|---\|---\|\n([\s\S]*?)(?=\n\n)/)||[])[1]||'';
  const row=table.split('\n').find((line)=>line.includes('| `RU-REAL-01` |'))??'';
  assert.match(row,/always once an Exact Realization Target is formed/);
  assert.match(row,/no Unit-level omission after Target formation/);
  assert.doesNotMatch(row,/do not instantiate Exact merely/i);
});

test('supporting Scenario Screen Domain templates expose complete Module-defined inventories with methodology bindings',()=>{
  const cases=[
    ['planning/documentation/application-planning/templates/SCENARIO-DRAFT-TEMPLATE.md',['RU-SCEN-01','RU-SCEN-02','RU-SCEN-03'],'TM-SCENARIO-PLANNING'],
    ['planning/documentation/application-planning/templates/SCREEN-DRAFT-TEMPLATE.md',['RU-SCREEN-01','RU-SCREEN-02','RU-SCREEN-03'],'TM-SCREEN'],
    ['planning/documentation/application-planning/templates/DOMAIN-DRAFT-TEMPLATE.md',['RU-DOWN-01','RU-DOWN-02','RU-DOWN-03'],'TM-DOMAIN-OWNER']
  ];
  for(const [rel,units,owner] of cases){
    const text=read(rel);
    for(const unit of units) assert.match(text,new RegExp(`## ${unit.replaceAll('-','\\-')}\\b`),`${rel}: missing ${unit}`);
    assert.match(text,/\*\*Methodology:\*\*/);
    assert.match(text,new RegExp(owner));
  }
});

test('active SDS Slice examples no longer hide formed Module-defined inventory entries',()=>{
  const response=read('planning/documentation/idtspe-methodology/active/profiles/sds/examples/IDTSPE-RESPONSE-EXAMPLE.md');
  for(const id of ['RU-SLICE-01','RU-SLICE-02','RU-SLICE-03','RU-SLICE-04','RU-SLICE-05']) assert.match(response,new RegExp(id));
  const slice=read('planning/documentation/idtspe-methodology/active/profiles/sds/examples/IMPLEMENTATION-SLICE-UNIT-REFERENCE.md');
  for(const id of ['RU-SOWN-01','RU-SOWN-02','RU-SOWN-03']) assert.match(slice,new RegExp(id));
  const flow=read('planning/documentation/idtspe-methodology/active/profiles/sds/examples/SDS-WORKED-FLOW-REFERENCE.md');
  for(const id of ['RU-DOWN-01','RU-DOWN-02','RU-DOWN-03','RU-SOWN-01','RU-SOWN-02','RU-SOWN-03','RU-SHARED-01','RU-SHARED-02','RU-SHARED-03','RU-SHARED-04']) assert.match(flow,new RegExp(id));
  assert.doesNotMatch(flow,/RU-DOWN-02 Domain Implementation Requirements — only if material/);
});

test('Application Definition no longer classifies representative RLS as core surrounding alternative authority categories',()=>{
  const app=read('planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-APPLICATION-DEFINITION.md');
  assert.doesNotMatch(app,/core\/surrounding\/alternative representative real-life scenario inventory/i);
  assert.match(app,/representative real-life scenario inventory with bounded Target-contribution \/ Benefit relations/);
});
