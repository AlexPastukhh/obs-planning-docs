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
    {id:'IDTSPE_PASS',label:'IDTSPE Pass'},
    {id:'USE_CASES',label:'Use Cases'},
    {id:'TARGET_MODULES',label:'Target Modules'},
    {id:'LENSES',label:'Lenses'},
    {id:'TOOLS',label:'Tools / Repository'}
  ]);
  assert.equal(navigation.methodologyPrimaryIds(entries,'USE_CASES').length,useCases.length);
  assert.equal(navigation.methodologyPrimaryIds(entries,'TARGET_MODULES').length,components.filter((item)=>item.kind==='TARGET_MODULE').length);
  assert.equal(navigation.methodologyPrimaryIds(entries,'LENSES').length,components.filter((item)=>item.kind==='LENS').length);
});

test('every visible command card has canonical Context, Result and Essence projection',()=>{
  for(const entry of entries){
    assert.ok(String(entry.context||'').trim(),`${entry.id}: context`);
    assert.ok(String(entry.result||'').trim(),`${entry.id}: result`);
    assert.ok(String(entry.essence||'').trim(),`${entry.id}: essence`);
  }
});

test('every command card belongs to one normal tab/group and All commands is only a cross-tab projection',()=>{
  const views=navigation.methodologyViewDefinitions(entries);
  const countByView=new Map(views.map((view)=>[view.id,view.count]));
  assert.equal(countByView.get('USE_CASES'),useCases.length);
  assert.equal(countByView.get('TARGET_MODULES'),components.filter((item)=>item.kind==='TARGET_MODULE').length);
  assert.equal(countByView.get('LENSES'),components.filter((item)=>item.kind==='LENS').length);
  assert.equal([...countByView.values()].reduce((sum,count)=>sum+count,0),entries.length);
  const normalGroups=views.flatMap((view)=>navigation.buildMethodologyViewGroups(entries,view.id));
  assert.equal(normalGroups.reduce((sum,group)=>sum+group.entries.length,0),entries.length);
  const all=navigation.buildAllMethodologyGroups(entries);
  assert.equal(all.reduce((sum,group)=>sum+group.entries.length,0),entries.length);
  assert.ok(all.every((group)=>group.viewId&&group.viewLabel&&group.sourceGroupId));
});

test('group navigation selection supports isolate, multi-select and return to all',()=>{
  const groups=navigation.buildMethodologyViewGroups(entries,'GENERAL');
  let selected=navigation.toggleSelectedGroupId(groups,null,groups[1].id);
  assert.deepEqual(selected,[groups[1].id]);
  selected=navigation.toggleSelectedGroupId(groups,selected,groups[3].id);
  assert.deepEqual(new Set(selected),new Set([groups[1].id,groups[3].id]));
  assert.deepEqual(navigation.filterGroupsBySelection(groups,selected).map((group)=>group.id),[groups[1].id,groups[3].id]);
  selected=navigation.toggleSelectedGroupId(groups,selected,groups[1].id);
  assert.deepEqual(selected,[groups[3].id]);
  assert.equal(navigation.normalizeSelectedGroupIds(groups,groups.map((group)=>group.id)),null);
});
