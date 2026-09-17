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
  assert.match(evo,/Every selected `NEW` or `CHANGED` Feature uses the ordinary complete `TM-FEATURE` \*\*Feature Definition\*\* contract/);
  assert.match(evo,/Feature does not use `RU-EVO-02` as its primary future mechanism/);
  const ruLine=evo.split('\n').find((line)=>line.includes('| `RU-EVO-02` |')) ?? '';
  assert.match(ruLine,/Scenario\/Screen\/Domain\/Slice\/Shared/);
  assert.doesNotMatch(ruLine,/Feature|Application/);
});

test('realized Scenario Screen Domain Slice and Shared owners expose reverse Evolution Impact Units',()=>{
  const expectations=[
    ['planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-SCENARIO-PLANNING.md','RU-SCEN-02'],
    ['planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-SCREEN.md','RU-SCREEN-03'],
    ['planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-DOMAIN-OWNER.md','RU-DOWN-03'],
    ['planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-SLICE-OWNER.md','RU-SOWN-03'],
    ['planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-SHARED-IMPLEMENTATION-CAPABILITY.md','RU-SHARED-04']
  ];
  for(const [rel,id] of expectations){
    const text=read(rel);
    assert.ok(text.includes(`| \`${id}\` | Evolution Impact`),`${rel}: missing reverse Impact Unit`);
    assert.match(text,/concrete unrealized Evolution Steps/i,`${rel}: reverse Impact must point to unrealized Steps`);
  }
});

test('Evolution Steps Map removes realized Steps from active future projection but may retain compact lineage prerequisites',()=>{
  const map=read('planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-EVOLUTION-STEPS-MAP.md');
  assert.match(map,/leave active future projection/);
  assert.match(map,/realized prerequisite \/ lineage reference/i);
  assert.match(map,/not a mandatory Step-status enum/i);
  assert.match(map,/must not continue to look like pending future work/i);
  assert.match(map,/Current-owner `Evolution Impact` reverse projections likewise stop presenting that Step as active future impact/i);
});

test('Evolution wording avoids persistence and representation vocabulary collisions',()=>{
  const evo=read('planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-EVOLUTION-STEP.md');
  const placement=read('planning/documentation/idtspe-methodology/active/profiles/sds/ARTIFACT-PLACEMENT-MAP.md');
  const registry=read('planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/README.md');
  assert.doesNotMatch(evo,/continuing continuation/);
  assert.doesNotMatch(placement,/continuing continuation/);
  assert.doesNotMatch(registry,/promoted into complete Target Owner Bodies/);
  assert.match(registry,/resolved into complete Target Owner Bodies/);
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
