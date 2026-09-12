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
const navigation=require('../src/methodology-navigation.js');
const repositoryCatalog=require('../src/repository-catalog-service.js');
globalThis.ObsPlanningHelper=Object.assign({},codec,catalog,helper,body,semantic,navigation,repositoryCatalog);
const state=require('../src/planning-helper-state.js');
Object.assign(globalThis.ObsPlanningHelper,state);
const runtime=require('../src/planning-helper-runtime.js');

const moduleRoot=path.resolve(import.meta.dirname,'..');
const repoRoot=path.resolve(moduleRoot,'../../../../..');
const commands=JSON.parse(fs.readFileSync(path.join(moduleRoot,'seed','commands.json'),'utf8')).items;
const useCases=JSON.parse(fs.readFileSync(path.join(moduleRoot,'seed','use-cases.json'),'utf8')).items;
const components=JSON.parse(fs.readFileSync(path.join(moduleRoot,'seed','semantic-components.json'),'utf8')).items;
const scenarios=JSON.parse(fs.readFileSync(path.join(moduleRoot,'seed','scenarios.json'),'utf8')).items;
const order=JSON.parse(fs.readFileSync(path.join(moduleRoot,'catalog-order.json'),'utf8'));
const snapshot=state.normalizePlanningHelperLocalSnapshot({
  schemaVersion:state.LOCAL_SNAPSHOT_SCHEMA_VERSION,
  planningCommands:commands.map((definition)=>state.normalizeCommandRecord({definition,repositoryKnown:true})),
  helperItems:[],useCases,semanticComponents:components,scenarios,catalogOrder:order
});
const memory=runtime.materializeSnapshot(snapshot);
const entries=memory.commandEntries;

test('command navigation is derived from semantic identity and exposes UC/TM/Lens as classifications',()=>{
  const views=navigation.methodologyViewDefinitions(entries).map(({id,label})=>({id,label}));
  assert.deepEqual(views,[
    {id:'GENERAL',label:'General'},
    {id:'USE_CASES',label:'Use Cases'},
    {id:'TARGET_MODULES',label:'Target Modules'},
    {id:'LENSES',label:'Lenses'},
    {id:'TOOLS',label:'Tools / Repository'}
  ]);
  assert.equal(navigation.methodologyPrimaryIds(entries,'USE_CASES').length,16);
  assert.equal(navigation.methodologyPrimaryIds(entries,'TARGET_MODULES').length,15);
  assert.equal(navigation.methodologyPrimaryIds(entries,'LENSES').length,18);
});

test('every current semantic component projects to exactly one primary command card',()=>{
  for(const component of components){
    const id=semantic.semanticCardId(component),matches=entries.filter((entry)=>entry.id===id);
    assert.equal(matches.length,1,component.id);
    assert.equal(matches[0].canonicalId,component.id,component.id);
    assert.match(matches[0].label,new RegExp(component.id.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')));
    assert.ok(['DIRECT CURRENT','GENERIC CURRENT'].includes(matches[0].stateLabel),component.id);
  }
});

test('Core and SDS semantic sections come from scope/profile instead of helperPresentation navigation',()=>{
  const tm=navigation.buildMethodologyViewGroups(entries,'TARGET_MODULES');
  assert.deepEqual(tm.map((section)=>section.label),['IDTSPE Core','Profile · SDS']);
  const lenses=navigation.buildMethodologyViewGroups(entries,'LENSES');
  assert.deepEqual(lenses.map((section)=>section.label),['IDTSPE Core','Profile · SDS']);
  const source=fs.readFileSync(path.join(moduleRoot,'src','methodology-navigation.js'),'utf8');
  assert.match(source,/semanticKind/);
  assert.match(source,/semanticScope/);
  assert.match(source,/Compatibility fallbacks are read-only/);
});

test('generic Lens dispatcher stays infrastructure while concrete registered Lenses are primary cards',()=>{
  assert.equal(entries.some((entry)=>entry.id==='idtspe.lens.apply'),false);
  assert.equal(entries.some((entry)=>entry.id==='idtspe.lenses.select'),true);
  assert.equal(navigation.methodologyPrimaryIds(entries,'LENSES').every((id)=>id.startsWith('lens:LENS-')),true);
  const ddd=entries.find((entry)=>entry.id==='lens:LENS-DOMAIN-MODELING-DDD');
  assert.ok(ddd);
  assert.match(ddd.label,/SDS Lens · LENS-DOMAIN-MODELING-DDD/);
});

test('preferred command order uses stable semantic IDs and contains one Pre-Update identity',()=>{
  assert.equal(new Set(order.commands).size,order.commands.length);
  const ids=new Set(entries.map((entry)=>entry.id));
  for(const id of order.commands)assert.ok(ids.has(id),`preferred order references unknown command ${id}`);
  assert.equal(order.commands.filter((id)=>id==='tm:TM-PRE-UPDATE-PLAN').length,1);
  assert.equal(order.commands.includes('file_update.plan'),false);
  assert.equal(entries.filter((entry)=>entry.canonicalId==='TM-PRE-UPDATE-PLAN').length,1);
});

test('integration workspace is provenance-only and contains no superseded current-navigation plans',()=>{
  const dir=path.join(repoRoot,'planning/documentation/idtspe-methodology/integration');
  assert.deepEqual(fs.readdirSync(dir).sort(),['README.md']);
  const readme=fs.readFileSync(path.join(dir,'README.md'),'utf8');
  assert.match(readme,/historical migration\/provenance index/i);
  assert.match(readme,/Git history/);
  assert.match(readme,/not.*current methodology/i);
});
