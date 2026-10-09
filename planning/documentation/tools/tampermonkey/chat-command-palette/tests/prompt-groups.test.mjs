import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const repo=require('../src/repository-catalog-service.js');
const ui=require('../src/planning-helper-ui.js');
const ids=['helper-library:prompt:p1','helper-library:prompt:p2','helper-library:prompt:p3'];
const entries=ids.map(id=>({id}));

test('legacy catalog order v5 upgrades to v6 without changing existing prompt order',()=>{
  const previous={schemaVersion:5,kind:'planning-helper-catalog-order',categories:[{id:'GENERAL',label:'General',order:0}],fallbackCategoryId:'GENERAL',commands:[],scenarios:[],prompts:ids,commandGroups:[]};
  const order=repo.normalizeCatalogOrder(previous);
  assert.equal(order.schemaVersion,6);
  assert.deepEqual(order.prompts,ids);
  assert.deepEqual(order.promptGroups,[]);
  assert.deepEqual(ui.filterPromptEntries(entries,order,'all'),entries);
  assert.deepEqual(ui.filterPromptEntries(entries,order,'ungrouped'),entries);
});

test('create, assign, filter group, show all and stable renaming',()=>{
  let order=repo.createPromptGroupInOrder(repo.normalizeCatalogOrder({}),'Review / analysis');
  const id=order.promptGroups[0].id;
  assert.equal(id,'review-analysis');
  order=repo.assignPromptGroupInOrder(order,ids[0],id);
  order=repo.assignPromptGroupInOrder(order,ids[2],id);
  assert.deepEqual(ui.filterPromptEntries(entries,order,id).map(x=>x.id),[ids[0],ids[2]]);
  assert.deepEqual(ui.filterPromptEntries(entries,order,'all'),entries);
  assert.deepEqual(ui.filterPromptEntries(entries,order,'ungrouped'),[entries[1]]);
  order=repo.renamePromptGroupInOrder(order,id,'Audit checks');
  assert.equal(order.promptGroups[0].id,id);
  assert.equal(order.promptGroups[0].label,'Audit checks');
  const persisted=repo.parseCatalogOrder(repo.renderCatalogOrder(order));
  assert.deepEqual(persisted,order);
});

test('moving between groups never duplicates membership and deleting leaves prompts visible',()=>{
  let order=repo.normalizeCatalogOrder({});
  order=repo.createPromptGroupInOrder(order,'Review');
  order=repo.createPromptGroupInOrder(order,'Delivery');
  const review=order.promptGroups[0].id,delivery=order.promptGroups[1].id;
  order=repo.assignPromptGroupInOrder(order,ids[0],review);
  order=repo.assignPromptGroupInOrder(order,ids[0],delivery);
  assert.equal(repo.promptGroupForId(order,ids[0]).id,delivery);
  assert.equal(order.promptGroups[0].items.length,0);
  order=repo.deletePromptGroupInOrder(order,delivery);
  assert.deepEqual(ui.filterPromptEntries(entries,order,'ungrouped'),entries);
  assert.deepEqual(ui.filterPromptEntries(entries,order,'all'),entries);
});

test('reorder group display, reject duplicate IDs/claims and unsafe labels',()=>{
  let order=repo.createPromptGroupInOrder(repo.normalizeCatalogOrder({}),'Alpha');
  order=repo.createPromptGroupInOrder(order,'Beta');
  order=repo.movePromptGroupInOrder(order,'beta',-1);
  assert.deepEqual(order.promptGroups.map(g=>g.id),['beta','alpha']);
  assert.throws(()=>repo.createPromptGroupInOrder(order,'Beta'),/already exists/);
  assert.throws(()=>repo.normalizeCatalogOrder({...order,promptGroups:[{id:'a',label:'A',items:[ids[0]]},{id:'b',label:'B',items:[ids[0]]}]}),/multiple groups/);
  assert.throws(()=>repo.renamePromptGroupInOrder(order,'alpha','bad\nlabel'),/safe label/);
  assert.throws(()=>repo.assignPromptGroupInOrder(order,ids[0],'unknown'),/Unknown prompt group/);
});

test('group actions are local order mutations in the runtime and do not modify prompt text',async()=>{
  const fs=await import('node:fs');const runtime=fs.readFileSync(new URL('../src/planning-helper-runtime.js',import.meta.url),'utf8');
  for(const name of ['createPromptGroup','renamePromptGroup','deletePromptGroup','assignPromptGroup','movePromptGroup']){
    assert.match(runtime,new RegExp(`async function ${name}\\(`));
    assert.match(runtime,new RegExp(`on${name[0].toUpperCase()}${name.slice(1)}`));
  }
  assert.match(runtime,/catalogOrderSha:''/);
  assert.match(runtime,/movePromptGroup,createCatalogCategory/);
  const source=fs.readFileSync(new URL('../src/planning-helper-ui.js',import.meta.url),'utf8');
  assert.match(source,/activePromptGroupId='all'/);
  assert.match(source,/promptGroupToolbar\.append\(chip\('all','All prompts'/);
  assert.match(source,/filterPromptEntries\(all,catalogOrder,activePromptGroupId\)/);
  assert.doesNotMatch(source,/Show all prompts.*Only this group/);
});


test('Cyrillic prompt-group labels are supported with safe stable IDs',()=>{
  const order=repo.createPromptGroupInOrder(repo.normalizeCatalogOrder({}),'Мои проверки');
  assert.match(order.promptGroups[0].id,/^group-[a-z0-9]+$/);
  assert.equal(order.promptGroups[0].label,'Мои проверки');
  assert.deepEqual(repo.parseCatalogOrder(repo.renderCatalogOrder(order)).promptGroups,order.promptGroups);
});
