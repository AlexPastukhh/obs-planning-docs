import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';

const require=createRequire(import.meta.url);
const codec=require('../src/command-definition-codec.js');
const catalog=require('../src/command-catalog.js');
const helper=require('../src/helper-library-codec.js');
const body=require('../src/command-body.js');
const semantic=require('../src/semantic-projections.js');
const repositoryCatalog=require('../src/repository-catalog-service.js');
globalThis.ObsPlanningHelper=Object.assign({},codec,catalog,helper,body,semantic,repositoryCatalog);
const state=require('../src/planning-helper-state.js');
Object.assign(globalThis.ObsPlanningHelper,state);
const runtime=require('../src/planning-helper-runtime.js');

const moduleRoot=path.resolve(import.meta.dirname,'..');
const repoRoot=path.resolve(moduleRoot,'../../../../..');
const commands=require('../seed/commands.json').items;
const useCases=require('../seed/use-cases.json').items;
const components=require('../seed/semantic-components.json').items;
const scenarios=require('../seed/scenarios.json').items;
const catalogOrder=require('../catalog-order.json');

function memory(){
  const snapshot=state.normalizePlanningHelperLocalSnapshot({
    schemaVersion:state.LOCAL_SNAPSHOT_SCHEMA_VERSION,
    planningCommands:commands.map((definition)=>state.normalizeCommandRecord({definition,repositoryKnown:true})),
    helperItems:[],useCases,semanticComponents:components,scenarios,catalogOrder
  });
  return runtime.materializeSnapshot(snapshot);
}

function equivalentIds(step){return (step.commandEquivalents||[]).map((entry)=>entry.id).sort();}

test('canonical working scenarios remain command-free semantic examples',()=>{
  const sourcePath=path.join(repoRoot,'planning/documentation/idtspe-methodology/active/idtspe-core/shared/methodology-use-case-scenario-map.md');
  const source=fs.readFileSync(sourcePath,'utf8');
  const detailed=source.slice(source.indexOf('## 5. `SCN-01`'));
  for(const command of commands){
    if(!command.id)continue;
    assert.equal(detailed.includes(command.id),false,`canonical scenario text contains direct command id ${command.id}`);
  }
  assert.doesNotMatch(detailed,/planning\/commands\/[^\s`]+\.command\.md/);
  assert.doesNotMatch(detailed,/\[(?:Run|Body|Scenarios(?:\s+\d+)?)\]/);
  for(const scenario of scenarios){
    for(const step of scenario.steps){
      for(const ref of step.semanticRefs){
        assert.equal(commands.some((command)=>command.id===ref),false,`${step.id} uses a direct command id as semantic ref: ${ref}`);
      }
    }
  }
});

test('scenario-to-command projection is precise and keeps show-next distinct from continue',()=>{
  const m=memory();
  const scn01=m.scenarioEntries.find((scenario)=>scenario.id==='SCN-01');
  assert.ok(scn01);
  assert.deepEqual(equivalentIds(scn01.steps.find((step)=>step.id==='SCN-01-S2')),[
    'idtspe.continue','idtspe.next','uc:UC-IDTSPE-COMPOSE-CURRENT-WORK'
  ]);
  assert.deepEqual(equivalentIds(scn01.steps.find((step)=>step.id==='SCN-01-S3')),[
    'idtspe.lenses.select'
  ]);
  const next=m.commandEntries.find((entry)=>entry.id==='idtspe.next');
  const cont=m.commandEntries.find((entry)=>entry.id==='idtspe.continue');
  assert.equal(next.scenarioUses.length,1);
  assert.equal(cont.scenarioUses.length,1);
  assert.equal(next.scenarioUses[0].stepId,'SCN-01-S2');
  assert.equal(cont.scenarioUses[0].stepId,'SCN-01-S2');
  assert.match(next.definition.meaning,/show|next|propos/i);
  assert.match(cont.definition.meaning,/perform|continue|ordinary action/i);
});

test('tool/repository scenario mappings do not create an automatic archive-source chain',()=>{
  const m=memory();
  const scn06=m.scenarioEntries.find((scenario)=>scenario.id==='SCN-06');
  assert.ok(scn06);
  assert.deepEqual(equivalentIds(scn06.steps.find((step)=>step.id==='SCN-06-S2')),['replacement_archive.create']);
  assert.deepEqual(equivalentIds(scn06.steps.find((step)=>step.id==='SCN-06-S3')),['critical_review.apply','idtspe.review_consistency']);
  const archiveSource=m.commandEntries.find((entry)=>entry.id==='archive_source.use');
  assert.ok(archiveSource);
  assert.deepEqual(archiveSource.scenarioUses,[]);
});

test('Scenarios 0 is valid and every reverse use resolves to an actual projected step',()=>{
  const m=memory();
  assert.ok(m.commandEntries.some((entry)=>(entry.scenarioUses||[]).length===0));
  const scenarioById=new Map(m.scenarioEntries.map((scenario)=>[scenario.id,scenario]));
  for(const entry of m.commandEntries){
    for(const use of entry.scenarioUses||[]){
      const scenario=scenarioById.get(use.scenarioId);assert.ok(scenario,`${entry.id}: missing scenario ${use.scenarioId}`);
      const step=scenario.steps.find((candidate)=>candidate.id===use.stepId);assert.ok(step,`${entry.id}: missing step ${use.stepId}`);
      assert.ok((step.commandEquivalents||[]).some((candidate)=>candidate.id===entry.id),`${entry.id}: reverse index is not symmetric at ${use.stepId}`);
    }
  }
});

test('Pre-Update is one Core TM semantic card with old phrases as aliases, not duplicate primary commands',()=>{
  const m=memory();
  const rows=m.commandEntries.filter((entry)=>entry.canonicalId==='TM-PRE-UPDATE-PLAN');
  assert.equal(rows.length,1);
  const row=rows[0];
  assert.equal(row.id,'tm:TM-PRE-UPDATE-PLAN');
  assert.match(row.label,/План обновления · Core TM · TM-PRE-UPDATE-PLAN/);
  assert.equal(commands.some((command)=>command.id==='file_update.plan'),false);
  assert.ok(row.definition.commandFamily.includes('составь предапдейт план'));
  assert.ok(row.definition.commandFamily.includes('план файл-обновление'));
});
