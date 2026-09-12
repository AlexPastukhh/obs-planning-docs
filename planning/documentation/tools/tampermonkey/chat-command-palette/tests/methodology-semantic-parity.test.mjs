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
  assert.match(text,/Scenario journey/i);
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

test('active SDS registries expose 13 Target Modules and 7 Lenses, excluding retired stubs',()=>{
  const tm=read('planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/README.md');
  const activeTms=[...tm.matchAll(/^\| \[`(TM-[^`]+)`\]\([^)]+\.md\)/gm)].map((m)=>m[1]);
  assert.equal(activeTms.length,13);
  const lens=read('planning/documentation/idtspe-methodology/active/profiles/sds/lenses/README.md');
  const activeLenses=[...lens.matchAll(/^\| \[`(LENS-[^`]+)`\]\([^)]+\.md\)/gm)].map((m)=>m[1]);
  assert.equal(activeLenses.length,7);
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
