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

test('canonical working scenarios remain command-free semantic examples across methodology and repository owners',()=>{
  const sourcePaths=[...new Set(scenarios.map((scenario)=>scenario.source))];
  assert.ok(sourcePaths.length>=2,'working Scenarios should aggregate more than one canonical owner source');
  for(const relative of sourcePaths){
    const source=fs.readFileSync(path.join(repoRoot,relative),'utf8');
    for(const command of commands){
      if(!command.id)continue;
      assert.equal(source.includes(command.id),false,`${relative} contains direct command id ${command.id}`);
    }
    assert.doesNotMatch(source,/planning\/commands\/[^\s`]+\.command\.md/);
    assert.doesNotMatch(source,/\[(?:Run|Body|Scenarios(?:\s+\d+)?)\]/);
  }
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
  assert.deepEqual(equivalentIds(scn01.steps.find((step)=>step.id==='SCN-01-S1N')),['idtspe.needs.review']);
  assert.deepEqual(equivalentIds(scn01.steps.find((step)=>step.id==='SCN-01-S2')),[
    'idtspe.continue','idtspe.next','uc:UC-IDTSPE-COMPOSE-CURRENT-WORK'
  ]);
  assert.deepEqual(equivalentIds(scn01.steps.find((step)=>step.id==='SCN-01-S3')),[
    'idtspe.lenses.select'
  ]);
  assert.deepEqual(equivalentIds(scn01.steps.find((step)=>step.id==='SCN-01-S3R')),[
    'critical_review.apply'
  ]);
  const next=m.commandEntries.find((entry)=>entry.id==='idtspe.next');
  const cont=m.commandEntries.find((entry)=>entry.id==='idtspe.continue');
  assert.deepEqual(next.scenarioUses.map((use)=>use.stepId),['SCN-01-S1','SCN-01-S2']);
  assert.deepEqual(cont.scenarioUses.map((use)=>use.stepId),['SCN-01-S1','SCN-01-S2']);
  assert.match(next.definition.meaning,/show|next|propos/i);
  assert.match(cont.definition.meaning,/perform|continue|ordinary action/i);
  assert.deepEqual(equivalentIds(scn01.steps.find((step)=>step.id==='SCN-01-S3F')),['idtspe.findings.review']);
});

test('critical-review scenario separates challenge, finding disposition, semantic proposal and revalidation',()=>{
  const m=memory(),scn03=m.scenarioEntries.find((scenario)=>scenario.id==='SCN-03');
  assert.ok(scn03);
  assert.deepEqual(equivalentIds(scn03.steps.find((step)=>step.id==='SCN-03-S1')),['critical_review.apply','lens:LENS-AUTHORITY-SOT-REUSE','lens:LENS-DEPENDENCY-CHANGE-IMPACT','lens:LENS-NEED-VALUE-SCOPE','lens:LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY']);
  assert.deepEqual(equivalentIds(scn03.steps.find((step)=>step.id==='SCN-03-S1D')),['idtspe.findings.review']);
  assert.deepEqual(equivalentIds(scn03.steps.find((step)=>step.id==='SCN-03-S1P')),['idtspe.proposal']);
  assert.deepEqual(equivalentIds(scn03.steps.find((step)=>step.id==='SCN-03-S2')),['idtspe.review_consistency','uc:UC-IDTSPE-REVALIDATE-CURRENT-WORK']);
  assert.deepEqual(equivalentIds(scn03.steps.find((step)=>step.id==='SCN-03-S3')),['review_audit.recheck']);
});

test('need-candidate scenario entry projects the dedicated Need review command before Evolution Step formation',()=>{
  const m=memory(),scn02=m.scenarioEntries.find((scenario)=>scenario.id==='SCN-02');
  assert.ok(scn02);
  assert.deepEqual(equivalentIds(scn02.steps.find((step)=>step.id==='SCN-02-S0N')),['idtspe.needs.review']);
  assert.equal(equivalentIds(scn02.steps.find((step)=>step.id==='SCN-02-S0')).includes('idtspe.needs.review'),false);
  const needs=m.commandEntries.find((entry)=>entry.id==='idtspe.needs.review');
  assert.ok(needs);
  assert.deepEqual(needs.scenarioUses.map((use)=>use.stepId).sort(),['SCN-01-S1N','SCN-02-S0N']);
});

test('finding-escalation scenario keeps deterministic repair command-free and separates RE-3 revalidation from RE-4 selection',()=>{
  const m=memory(),scn07=m.scenarioEntries.find((scenario)=>scenario.id==='SCN-07');
  assert.ok(scn07);
  assert.deepEqual(equivalentIds(scn07.steps.find((step)=>step.id==='SCN-07-S1')),['idtspe.findings.review']);
  assert.deepEqual(equivalentIds(scn07.steps.find((step)=>step.id==='SCN-07-S2')),[]);
  assert.deepEqual(equivalentIds(scn07.steps.find((step)=>step.id==='SCN-07-S3')),['idtspe.proposal']);
  assert.deepEqual(equivalentIds(scn07.steps.find((step)=>step.id==='SCN-07-S4')),['uc:UC-IDTSPE-REVALIDATE-CURRENT-WORK']);
  assert.deepEqual(equivalentIds(scn07.steps.find((step)=>step.id==='SCN-07-S4P')),['idtspe.proposal']);
  assert.deepEqual(equivalentIds(scn07.steps.find((step)=>step.id==='SCN-07-S5')),['lens:LENS-IMPLEMENTATION-REQUIREMENTS-DISCOVERY']);
  assert.match(scn07.steps.find((step)=>step.id==='SCN-07-S1').canonicalText,/RE-0\.\.RE-4|RE-0.*RE-4/s);
  assert.equal(equivalentIds(scn07.steps.find((step)=>step.id==='SCN-07-S2')).includes('session.proposal_driven'),false);
});

test('tool/repository scenario is repository-owned and archive read-source remains an explicit conditional branch',()=>{
  const m=memory();
  const scn06=m.scenarioEntries.find((scenario)=>scenario.id==='SCN-06');
  assert.ok(scn06);
  assert.equal(scn06.source,'planning/documentation/repository-scenarios/SCN-06-BUILD-AND-VERIFY-REPLACEMENT-PACKAGE.md');
  assert.deepEqual(equivalentIds(scn06.steps.find((step)=>step.id==='SCN-06-S1A')),['archive_source.use']);
  assert.deepEqual(equivalentIds(scn06.steps.find((step)=>step.id==='SCN-06-S2')),['replacement_archive.create']);
  assert.deepEqual(equivalentIds(scn06.steps.find((step)=>step.id==='SCN-06-S3')),['critical_review.apply','idtspe.review_consistency']);
  const archiveSource=m.commandEntries.find((entry)=>entry.id==='archive_source.use');
  assert.ok(archiveSource);
  assert.deepEqual(archiveSource.scenarioUses.map((use)=>use.stepId),['SCN-06-S1A']);
  assert.deepEqual(archiveSource.scenarioRefs,['planning/command-routing.md#archive-read-source-boundary']);
  const packageProducer=m.commandEntries.find((entry)=>entry.id==='replacement_archive.create');
  assert.ok(packageProducer);
  assert.equal(packageProducer.scenarioUses.some((use)=>use.stepId==='SCN-06-S1A'),false);
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


test('Exact scenario exposes Representation only as a conditional semantic Lens step',()=>{
  const m=memory(),scn04=m.scenarioEntries.find((scenario)=>scenario.id==='SCN-04');
  assert.ok(scn04);
  assert.deepEqual(equivalentIds(scn04.steps.find((step)=>step.id==='SCN-04-S1R')),[
    'lens:LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY'
  ]);
});

test('bare idtspe and generic Lens apply are visible IDTSPE Pass composition surfaces',()=>{
  const m=memory();
  assert.ok(commands.some((command)=>command.id==='idtspe.work'&&command.palette===true));
  assert.ok(commands.some((command)=>command.id==='idtspe.lens.apply'&&command.palette===true));
  assert.equal(m.commandEntries.find((entry)=>entry.id==='idtspe.work')?.presentationGroup?.viewId,'IDTSPE_PASS');
  assert.equal(m.commandEntries.find((entry)=>entry.id==='idtspe.lens.apply')?.presentationGroup?.viewId,'IDTSPE_PASS');
  assert.ok(m.commandEntries.some((entry)=>entry.id==='uc:UC-IDTSPE-COMPOSE-CURRENT-WORK'));
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
