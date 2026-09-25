import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const repo=require('../src/repository-catalog-service.js'),nav=require('../src/methodology-navigation.js');
Object.assign(globalThis.ObsPlanningHelper,nav);
const runtime=require('../src/planning-helper-runtime.js');
const old={schemaVersion:4,commands:['tm:X','a'],commandGroups:[{id:'g',viewId:'TARGET_MODULES',label:'Models',order:0,items:['tm:X']},{id:'custom',viewId:'MY_2',label:'Custom',items:['a']}]};

test('legacy categories migrate, including custom IDs; serialization preserves empty categories',()=>{
  const order=repo.normalizeCatalogOrder(old);assert.equal(order.schemaVersion,5);
  assert.deepEqual(order.commandGroups.map(g=>g.items),[['tm:X'],['a']]);
  assert.ok(order.categories.some(c=>c.id==='MY_2'));
  const added=runtime.createCommandCategoryInOrder(order,{label:'Мои проверки'});
  const restored=repo.parseCatalogOrder(repo.renderCatalogOrder(added));assert.deepEqual(restored,added);
  assert.equal(nav.methodologyViewDefinitions([],restored.categories).length,8);
});

test('category rename/reorder, whole-group move and delete keep membership and stable card IDs',()=>{
  let order=runtime.createCommandCategoryInOrder(repo.normalizeCatalogOrder(old),{label:'Review 2'}),id=order.categories.at(-1).id;
  order=runtime.updateCommandCategoryInOrder(order,id,{label:'QA'});
  order=runtime.moveCommandCategoryInOrder(order,id,-1);assert.equal(order.categories.at(-2).id,id);
  order=runtime.updateCommandGroupInOrder(order,'g',{viewId:id});
  order=runtime.deleteCommandCategoryInOrder(order,id,'GENERAL');
  assert.deepEqual(order.commandGroups.find(g=>g.id==='g').items,['tm:X']);
  assert.equal(order.commandGroups.find(g=>g.id==='g').viewId,'GENERAL');
  assert.ok(!order.categories.some(c=>c.id===id));
  assert.deepEqual(order.commands,old.commands);
});

test('card moves across categories and deleted semantic defaults do not resurrect',()=>{
  let order=repo.normalizeCatalogOrder(old);
  order=runtime.assignCommandGroupInOrder(order,'tm:X','','MY_2');
  assert.equal(order.commandGroups.filter(g=>g.items.includes('tm:X')).length,1);
  order=runtime.deleteCommandCategoryInOrder(order,'TARGET_MODULES','MY_2');
  const entries=runtime.decoratePresentationGroups([{id:'tm:X',semanticKind:'TARGET_MODULE'},{id:'tm:NEW',semanticKind:'TARGET_MODULE'}],order);
  assert.equal(nav.semanticNavigation(entries[0]).viewId,'MY_2');
  assert.equal(nav.semanticNavigation(entries[1]).viewId,'GENERAL');
  assert.ok(!nav.methodologyViewDefinitions(entries,order.categories).some(c=>c.id==='TARGET_MODULES'));
});

test('invalid category operations fail without mutating the input; last category remains',()=>{
  const order={schemaVersion:5,categories:[{id:'ONLY',label:'Only',order:0}],fallbackCategoryId:'ONLY',commandGroups:[]},copy=structuredClone(order);
  assert.throws(()=>runtime.deleteCommandCategoryInOrder(order,'ONLY','ONLY'),/last category/);
  assert.throws(()=>runtime.createCommandGroupInOrder(order,{viewId:'MISSING',label:'New'}),/Unknown category/);
  assert.throws(()=>repo.normalizeCatalogOrder({...order,categories:[{id:'ALL',label:'All'}]}),/reserved/);
  assert.throws(()=>repo.normalizeCatalogOrder({...order,categories:[...order.categories,...order.categories]}),/Duplicate/);
  assert.deepEqual(order,copy);
});

test('All commands keeps each category together despite large or tied group ranks',()=>{
  const categories=[{id:'FIRST',label:'First',order:1},{id:'SECOND',label:'Second',order:2}];
  const entries=[{id:'a',presentationGroup:{id:'later',viewId:'FIRST',label:'Later',order:9000}},{id:'b',presentationGroup:{id:'earlier',viewId:'SECOND',label:'Earlier',order:0}}];
  assert.deepEqual(nav.buildAllMethodologyGroups(entries,categories).map(g=>g.viewId),['FIRST','SECOND']);
});
