import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const require=createRequire(import.meta.url);
const nav=require('../src/methodology-navigation.js');
const seed=JSON.parse(fs.readFileSync(path.join(import.meta.dirname,'..','seed','commands.json'),'utf8'));
const entries=seed.items;

test('methodology navigation exposes accepted primary counts from repository command metadata',()=>{
  assert.equal(nav.methodologyPrimaryIds(entries,'IDTSPE').length,9);
  assert.equal(nav.methodologyPrimaryIds(entries,'SDS').length,32);
  assert.equal(new Set([...nav.methodologyPrimaryIds(entries,'IDTSPE'),...nav.methodologyPrimaryIds(entries,'SDS')]).size,41);
});

test('SDS related consistency link reuses Core command identity without increasing primary count',()=>{
  assert.deepEqual(nav.methodologyRelatedIds(entries,'SDS'),['idtspe.review_consistency']);
  assert.equal(nav.methodologyPrimaryIds(entries,'SDS').includes('idtspe.review_consistency'),false);
});

test('documentation representation is Core while direct SDS lens section contains WEUC and Simplicity only',()=>{
  assert.equal(nav.methodologyPrimaryIds(entries,'IDTSPE').includes('lenscmd.documentation.representation.check'),true);
  const sds=nav.buildMethodologyViewGroups(entries,'SDS').find((section)=>section.id==='lens');
  assert.deepEqual(sds.entries.filter((entry)=>!entry.__methodologyNav.related).map((entry)=>entry.id),['lenscmd.weuc.check','lenscmd.simplicity.check']);
});

test('runtime navigation module is generic and contains no maintained methodology command identities',()=>{
  const source=fs.readFileSync(path.join(import.meta.dirname,'..','src','methodology-navigation.js'),'utf8');
  for(const identity of ['application_domain.plan','idtspe.bootstrap','lenscmd.weuc.check','tmcmd.crosscut'])assert.doesNotMatch(source,new RegExp(identity.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')));
  assert.match(source,/helperPresentation/);
});



test('Helper methodology view controls are derived from repository navigation metadata rather than hard-coded view identities',()=>{
  assert.deepEqual(nav.methodologyViewDefinitions(entries).map(({id,label})=>({id,label})),[
    {id:'IDTSPE',label:'IDTSPE'},
    {id:'SDS',label:'SDS — IDTSPE Profile'}
  ]);
  const ui=fs.readFileSync(path.join(import.meta.dirname,'..','src','planning-helper-ui.js'),'utf8');
  assert.match(ui,/methodologyViewDefinitions/);
  assert.match(ui,/view\.id/);
  assert.match(ui,/view\.label/);
  assert.doesNotMatch(ui,/data-command-view="IDTSPE"/);
  assert.doesNotMatch(ui,/data-command-view="SDS"/);
  assert.doesNotMatch(ui,/SDS — IDTSPE Profile/);
  assert.doesNotMatch(ui,/METHODOLOGY_VIEW_IDS\?\.IDTSPE/);
});

test('all 41 methodology surfaces carry stable IDTSPE binding separate from helper navigation',()=>{
  const primary=[...nav.methodologyPrimaryIds(entries,'IDTSPE'),...nav.methodologyPrimaryIds(entries,'SDS')];
  const byId=new Map(entries.map((entry)=>[entry.id,entry]));
  assert.equal(primary.length,41);
  for(const id of primary){const binding=byId.get(id)?.methodologyBinding;assert.ok(binding,`${id}: missing methodologyBinding`);assert.equal(binding.methodologyRuntime,'IDTSPE',id);}
  const canonical=primary.map((id)=>byId.get(id)).filter((entry)=>entry.methodologyBinding.surfaceKind==='TARGET_MODULE');
  assert.equal(canonical.length,17);
  assert.equal(new Set(canonical.map((entry)=>entry.methodologyBinding.targetModuleId)).size,17);
  const focused=primary.map((id)=>byId.get(id)).filter((entry)=>entry.methodologyBinding.surfaceKind==='TARGET_MODULE_FOCUSED');
  assert.equal(focused.length,12);
  assert.ok(focused.every((entry)=>entry.methodologyBinding.parentSurface));
  const lenses=primary.map((id)=>byId.get(id)).filter((entry)=>entry.methodologyBinding.surfaceKind==='LENS');
  assert.equal(lenses.length,4);
  assert.ok(lenses.every((entry)=>entry.methodologyBinding.lensId&&entry.methodologyBinding.hostTargetPolicy==='RESOLVE_OR_REUSE_TARGET'));
});


test('generic Lens operations are Core orchestration surfaces and do not pretend to own a fixed Lens',()=>{
  const byId=new Map(entries.map((entry)=>[entry.id,entry]));
  for(const id of ['idtspe.lenses.select','idtspe.lens.apply']){
    const entry=byId.get(id);assert.ok(entry,id);
    assert.equal(entry.methodologyBinding?.surfaceKind,'ORCHESTRATION',id);
    assert.equal(entry.methodologyBinding?.lensId,null,id);
    assert.equal(entry.helperPresentation?.navigation?.sectionId,'lens-operations',id);
  }
  assert.equal(byId.get('idtspe.lenses.select').methodologyBinding?.hostTargetPolicy,'CREATE_OR_REUSE_TARGET');
  assert.equal(byId.get('idtspe.lens.apply').methodologyBinding?.hostTargetPolicy,'RESOLVE_OR_REUSE_TARGET');
  assert.deepEqual(nav.methodologyPrimaryIds(entries,'IDTSPE').slice(5),[
    'idtspe.lenses.select','idtspe.lens.apply','lenscmd.documentation.representation.check','lenscmd.linked-notes.justify'
  ]);
});
