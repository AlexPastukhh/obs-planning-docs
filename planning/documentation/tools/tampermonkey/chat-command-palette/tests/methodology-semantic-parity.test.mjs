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
  assert.match(text,/actor-to-Benefit journey/i);
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
    'planning/documentation/idtspe-methodology/active/idtspe-core/shared/idtspe-unit-and-target-step-result-model.md',
    'planning/documentation/application-planning/templates/IMPLEMENTATION-SLICE-DRAFT-TEMPLATE.md'
  ];
  for(const rel of files){
    const text=read(rel);
    for(const id of ['RU-SLICE-01','RU-SLICE-02','RU-SLICE-03','RU-SLICE-04','RU-SLICE-05']) assert.match(text,new RegExp(id),`${rel}: missing ${id}`);
    assert.doesNotMatch(text,/RU-SSTRAT/,`${rel}: stale RU-SSTRAT`);
  }
});

test('active SDS registries expose 13 Target Modules and 8 Lenses, excluding retired stubs',()=>{
  const tm=read('planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/README.md');
  const activeTms=[...tm.matchAll(/^\| \[`(TM-[^`]+)`\]\([^)]+\.md\)/gm)].map((m)=>m[1]);
  assert.equal(activeTms.length,13);
  const lens=read('planning/documentation/idtspe-methodology/active/profiles/sds/lenses/README.md');
  const activeLenses=[...lens.matchAll(/^\| \[`(LENS-[^`]+)`\]\([^)]+\.md\)/gm)].map((m)=>m[1]);
  assert.equal(activeLenses.length,8);
  for(const id of ['TM-REQUIREMENT','TM-SLICE-STRATEGY','TM-CROSS-CUTTING-CONCERN','TM-TEST-DESIGN','TM-TEST-STRATEGY']){
    assert.equal(activeTms.includes(id),false,`${id}: retired stub leaked into active registry`);
    const stub=read(`planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/${id}.md`);
    assert.match(stub,/RETIRED — not an active SDS Target Module/);
    assert.match(stub,/excluded from the active SDS Target Module registry/);
  }
});

test('semantic contracts use registry-driven parity instead of frozen obsolete counts',()=>{
  for(const rel of [
    'planning/documentation/idtspe-methodology/active/idtspe-core/lenses/LENS-MODEL.md',
    'planning/documentation/idtspe-methodology/active/idtspe-core/shared/idtspe-unit-and-target-step-result-model.md'
  ]){
    const text=read(rel);
    assert.doesNotMatch(text,/12\/12 SDS|12 SDS Target|6\/6 SDS|6 SDS-specific reusable Lenses|11 Core \+ 6 SDS/i,rel);
    assert.match(text,/registry/i,`${rel}: parity should be registry-driven`);
  }
});

test('Session interaction contract is ambient bootstrap, not a mandatory command-routing hop',()=>{
  const session=read('planning/session/session-runtime-contract.md');
  const coreCommands=read('planning/documentation/idtspe-methodology/active/idtspe-core/shared/idtspe-command-surface-contract.md');
  const registryMap=read('planning/documentation/use-case-registry-map.md');
  assert.match(session,/must-understand at session bootstrap or safe context restoration/i);
  assert.match(session,/must not route through Session/i);
  assert.match(coreCommands,/inheritance, not routing/i);
  assert.match(coreCommands,/routes directly to its current semantic owner/i);
  assert.match(registryMap,/is\s+\*\*not\*\*\s+another row in this functional methodology-routing map/i);
});

test('Evolution Step keeps Feature target state direct and Evolution Impact bounded to peer/supporting subjects',()=>{
  const evo=read('planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-EVOLUTION-STEP.md');
  assert.match(evo,/`RU-EVO-02` \| Evolution Impact/);
  assert.match(evo,/Every represented `NEW` or `CHANGED` Feature on the active candidate\/selected Step route uses the ordinary complete `TM-FEATURE` \*\*Feature Definition\*\* contract/);
  assert.match(evo,/Feature does not use `RU-EVO-02` as its primary future mechanism/);
  const ruLine=evo.split('\n').find((line)=>line.includes('| `RU-EVO-02` |')) ?? '';
  assert.match(ruLine,/Scenario\/Screen\/Domain\/Slice\/Shared/);
  assert.doesNotMatch(ruLine,/Feature|Application/);
});



test('Proposal Target Result forms an ordinary candidate Target Instance before semantic selection without granting realization authority',()=>{
  const proposal=read('planning/documentation/idtspe-methodology/active/idtspe-core/shared/proposal-and-decision-lifecycle-contract.md');
  const target=read('planning/documentation/idtspe-methodology/active/idtspe-core/shared/target-type-instance-source-and-relation-model.md');
  const scenario=read('planning/documentation/idtspe-methodology/active/idtspe-core/shared/methodology-use-case-scenario-map.md');
  const evo=read('planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-EVOLUTION-STEP.md');
  assert.match(proposal,/form the same complete candidate Target Instance before semantic selection/);
  assert.match(target,/candidate Target Instance.*ordinary Target Instance/is);
  assert.match(target,/complete Module-defined Unit inventory/);
  assert.match(scenario,/form an ordinary candidate Target Instance through the applicable Target Module before semantic selection/);
  assert.match(evo,/Selection\/authorization is intentionally not stored as an internal readiness blocker inside a Proposal Target Result/);
  assert.match(evo,/Actual realization execution still requires the applicable external selection\/authorization in addition to `READY`/);
});

test('Requirement Type remains optional and Evolution concern analysis routes established transition obligations to RU-EVO-05',()=>{
  const requirement=read('planning/documentation/idtspe-methodology/active/profiles/sds/shared/requirement-classification-and-representation-contract.md');
  const registry=read('planning/documentation/idtspe-methodology/active/profiles/sds/shared/methodology-registry-directory.md');
  const evo=read('planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-EVOLUTION-STEP.md');
  assert.match(requirement,/not mandatory for every Requirement/);
  assert.match(registry,/use Type only when materially useful/);
  assert.match(evo,/RU-EVO-03` owns the \*\*concern \/ analysis pressure\*\*/);
  assert.match(evo,/one-time transition\/proof must-hold whose natural subject is the Step\s*→ RU-EVO-05 Transition \/ Proof Obligation/);
});

test('current-owner reverse Evolution Impact has one shared SDS contract and owner-local Units only specialize it',()=>{
  const shared=read('planning/documentation/idtspe-methodology/active/profiles/sds/shared/current-owner-evolution-impact-projection-contract.md');
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
  const impact=read('planning/documentation/idtspe-methodology/active/profiles/sds/shared/current-owner-evolution-impact-projection-contract.md');
  assert.match(map,/Map owns only registry\/routing\/projection behavior/);
  assert.match(map,/Projection Source Contracts/);
  assert.match(map,/reads and projects, but does not independently define or recompute/);
  assert.match(map,/leave active future projection/);
  assert.match(map,/realized predecessor \/ lineage reference/i);
  assert.match(impact,/Step realized\/materialized[\s\S]*remove it from active future-impact projection/);
});

test('SDS registry routes temporal semantics instead of becoming a second semantic owner',()=>{
  const evo=read('planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-EVOLUTION-STEP.md');
  const placement=read('planning/documentation/idtspe-methodology/active/profiles/sds/ARTIFACT-PLACEMENT-MAP.md');
  const registry=read('planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/README.md');
  assert.doesNotMatch(evo,/continuing continuation/);
  assert.doesNotMatch(placement,/continuing continuation/);
  assert.match(registry,/Core \/ Temporal Conformance Routing/);
  assert.match(registry,/does not restate those contracts/);
  assert.match(registry,/Current-Owner Evolution Impact Projection Contract/);
  assert.doesNotMatch(registry,/## Temporal Hosting Rule/);
});



test('Core distinguishes Target Work Units from Core State Units without one peer result inventory',()=>{
  const unit=read('planning/documentation/idtspe-methodology/active/idtspe-core/shared/idtspe-unit-and-target-step-result-model.md');
  assert.match(unit,/Target Work Unit/);
  assert.match(unit,/Core State Unit/);
  assert.match(unit,/not one common peer `IDTSPE Unit` inventory/i);
  assert.match(unit,/Target Step Result[\s\S]*Target Work Unit Result Content/);
  assert.match(unit,/Core State Unit[\s\S]*not.*automatic.*Target Step Result/is);
  assert.match(unit,/Module-defined Unit/);
  assert.match(unit,/Contextual Unit/);
});

test('Source model uses consumer-side Source State Units and keeps TF-04 runtime Source Set distinct from Source Contract archetype',()=>{
  const target=read('planning/documentation/idtspe-methodology/active/idtspe-core/shared/target-type-instance-source-and-relation-model.md');
  const formation=read('planning/documentation/idtspe-methodology/active/idtspe-core/shared/resolution-slot-and-target-formation-resolution-set.md');
  const module=read('planning/documentation/idtspe-methodology/active/idtspe-core/shared/target-module-model.md');
  assert.match(target,/Source Subject/);
  assert.match(target,/Source State Unit/);
  assert.match(target,/consumer-side typed Core State Unit\/binding/);
  assert.match(target,/Target Relation[\s\S]*≠ Source relation/);
  assert.match(formation,/TF-04 SOURCE_SET[\s\S]*actual typed Source Set[\s\S]*Source State Units \/ consumer bindings/);
  assert.doesNotMatch(formation,/TF-04 SOURCE_SET[\s\S]{0,300}Value:\s*\n\s*typed Source Contract/);
  assert.match(module,/Source Contract archetype[\s\S]*runtime `TF-04 SOURCE_SET` resolves the concrete Target's actual Source Set/);
});

test('Documentation responsibility map routes to canonical owners without replacing Documentation role semantics',()=>{
  const principles=read('planning/documentation/principles-and-terminology.md');
  const active=read('planning/documentation/idtspe-methodology/active/README.md');
  const map=read('planning/documentation/idtspe-methodology/active/METHODOLOGY-RESPONSIBILITY-MAP.md');
  assert.match(principles,/## Responsibility Map/);
  assert.match(principles,/routing mapping.*not the semantic body/is);
  assert.match(active,/METHODOLOGY-RESPONSIBILITY-MAP\.md/);
  assert.match(map,/Target Work Unit mechanics; Core State Unit relation/);
  assert.match(map,/target-type-instance-source-and-relation-model\.md/);
  assert.match(map,/resolution-slot-and-target-formation-resolution-set\.md/);
  assert.match(map,/Target Module \/ Unit Contract \/ Source Contract archetype/);
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
  const unit=read('planning/documentation/idtspe-methodology/active/idtspe-core/shared/idtspe-unit-and-target-step-result-model.md');
  const shell=read('planning/documentation/idtspe-methodology/active/idtspe-core/IDTSPE-SHELL.md');
  const target=read('planning/documentation/idtspe-methodology/active/idtspe-core/shared/target-type-instance-source-and-relation-model.md');
  const map=read('planning/documentation/idtspe-methodology/active/idtspe-core/IDTSPE-CORE-MAP.md');
  for(const [rel,text] of [['unit',unit],['shell',shell],['target',target],['map',map]]){
    assert.match(text,/complete Module-defined Unit inventory/i,`${rel}: missing complete Unit inventory topology`);
  }
  assert.doesNotMatch(unit,/Target Step Result\s*= coherent projection\/composition of applicable Target Work Unit Result Content/i);
  assert.doesNotMatch(shell,/Target Step Result composed from applicable Unit Result Content/i);
  assert.doesNotMatch(target,/Target Step Result[\s\S]{0,180}= composition\/projection of applicable/i);
  assert.match(unit,/Proposal Target Result[\s\S]*candidate Target Instance[\s\S]*Current Result Content/is);
});

test('Visual and Reference Knowledge representations keep omitted Module-defined Units visible and bind Unit methodology',()=>{
  const visualInv=read('planning/documentation/idtspe-methodology/active/profiles/visual-production-2d/shared/VISUAL-PRODUCTION-INVARIANTS.md');
  const visualTpl=read('planning/documentation/idtspe-methodology/active/profiles/visual-production-2d/templates/TARGET-INSTANCE.template.md');
  const rkTpl=read('planning/documentation/idtspe-methodology/active/profiles/reference-knowledge/templates/TARGET-INSTANCE.template.md');
  assert.match(visualInv,/concrete Target result keeps the Unit heading\/identity visible with its concise omission reason/i);
  assert.match(visualInv,/not Unit non-existence/i);
  for(const [rel,text] of [['visual template',visualTpl],['reference template',rkTpl]]){
    assert.match(text,/complete Module-defined Unit inventory/i,`${rel}: missing complete Unit inventory`);
    assert.match(text,/\*\*Methodology:\*\* \[exact reusable Unit owner\]/,`${rel}: missing methodology binding placeholder`);
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
  const unit=read('planning/documentation/idtspe-methodology/active/idtspe-core/shared/idtspe-unit-and-target-step-result-model.md');
  const tm=read('planning/documentation/idtspe-methodology/active/idtspe-core/shared/target-module-model.md');
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
  const visualRule=read('planning/documentation/idtspe-methodology/active/profiles/visual-production-2d/shared/UNIT-SELECTION-AND-LENS-CHECKPOINTS.md');
  assert.match(visualRule,/do not decide whether the Unit exists/);
  assert.match(visualRule,/normal Proposal\/Decision authority only when the disposition itself is a material unresolved choice/);
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
  const tm=read('planning/documentation/idtspe-methodology/active/idtspe-core/shared/target-module-model.md');
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
