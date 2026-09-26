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
    {id:'IDTSPE_PASS',label:'IDTSPE Pass'},
    {id:'USE_CASES',label:'Use Cases'},
    {id:'TARGET_MODULES',label:'Target Modules'},
    {id:'LENSES',label:'Lenses'},
    {id:'TOOLS',label:'Tools / Repository'}
  ]);
  assert.equal(navigation.methodologyPrimaryIds(entries,'USE_CASES').length,19);
  assert.equal(navigation.methodologyPrimaryIds(entries,'TARGET_MODULES').length,33);
  assert.equal(navigation.methodologyPrimaryIds(entries,'LENSES').length,28);
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

test('GitHub-backed presentation groups refine views without replacing semantic identity',()=>{
  const tm=navigation.buildMethodologyViewGroups(entries,'TARGET_MODULES');
  assert.deepEqual(tm.map((section)=>section.label),['Core Lifecycle','Application Behavior','Domain / Realization Structure','Evolution','Evidence / Experiments','2D Visual Production','Reference Knowledge']);
  const lenses=navigation.buildMethodologyViewGroups(entries,'LENSES');
  assert.deepEqual(lenses.map((section)=>section.label),['Meaning / Ownership','Risk / Uncertainty / Proof','Representation / Navigation','SDS Product / Realization','2D Visual Production','Reference Knowledge']);
  for(const entry of entries.filter((item)=>item.semanticKind)){
    assert.ok(entry.semanticScope,entry.id);
    assert.ok(entry.presentationGroup?.id,entry.id);
  }
  const source=fs.readFileSync(path.join(moduleRoot,'src','methodology-navigation.js'),'utf8');
  assert.match(source,/presentationGroup/);
  assert.match(source,/semanticKind/);
  assert.match(source,/semanticScope/);
  assert.match(source,/Compatibility fallbacks are read-only/);
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
  assert.deepEqual(views.map((view)=>[view.id,view.count]),[['GENERAL',23],['IDTSPE_PASS',37],['USE_CASES',19],['TARGET_MODULES',33],['LENSES',28],['TOOLS',7]]);
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

test('catalog-order command groups cover every current command card exactly once',()=>{
  const grouped=order.commandGroups.flatMap((group)=>group.items);
  assert.equal(new Set(grouped).size,grouped.length);
  assert.deepEqual(new Set(grouped),new Set(entries.map((entry)=>entry.id)));
});

test('generic Lens dispatcher is exposed only through IDTSPE Pass while concrete registered Lenses remain primary Lens cards',()=>{
  assert.equal(entries.some((entry)=>entry.id==='idtspe.lens.apply'),true);
  assert.equal(entries.find((entry)=>entry.id==='idtspe.lens.apply')?.presentationGroup?.viewId,'IDTSPE_PASS');
  assert.equal(entries.some((entry)=>entry.id==='idtspe.lenses.select'),true);
  assert.equal(entries.find((entry)=>entry.id==='idtspe.lenses.select')?.presentationGroup?.viewId,'IDTSPE_PASS');
  assert.equal(navigation.methodologyPrimaryIds(entries,'LENSES').every((id)=>id.startsWith('lens:LENS-')),true);
  const ddd=entries.find((entry)=>entry.id==='lens:LENS-DOMAIN-MODELING-DDD');
  assert.ok(ddd);
  assert.match(ddd.label,/SDS Lens · LENS-DOMAIN-MODELING-DDD/);
  assert.equal(navigation.methodologyPrimaryIds(entries,'IDTSPE_PASS').some((id)=>id.startsWith('tm:')||id.startsWith('lens:')),false);
});

test('Target Module aliases come only from explicit registry alias declarations',()=>{
  const domain=components.find((component)=>component.id==='TM-DOMAIN-DISCOVERY');
  assert.ok(domain);
  assert.deepEqual(domain.aliases,['domain-discovery','domain']);
  const evolution=components.find((component)=>component.id==='TM-EVOLUTION-STEP');
  assert.ok(evolution);
  assert.deepEqual(evolution.aliases,['evolution-step']);
  const visualComposition=components.find((component)=>component.id==='TM-2D-30-VISUAL-CONSTRUCTION');
  assert.ok(visualComposition);
  assert.deepEqual(visualComposition.aliases,[]);
  assert.equal(components.some((component)=>component.aliases?.includes('material')),false);
  assert.equal(components.some((component)=>component.aliases?.includes('materially')),false);
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
