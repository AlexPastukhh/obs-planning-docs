import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const semantic=require('../src/semantic-projections.js');
globalThis.ObsPlanningHelper={...semantic};
const repo=require('../src/repository-catalog-service.js');
const useCases=require('../seed/use-cases.json').items;

test('repository Use-Case catalog parser validates generated shape',()=>{const u=repo.parseUseCaseCatalog(JSON.stringify({schemaVersion:1,kind:'use-case-seed',generatedFrom:'x',items:useCases}));assert.equal(u.useCases.length,useCases.length);assert.ok(!u.useCases.some((item)=>String(item.id||'').startsWith('UC-RPKG-')))});

test('catalog order normalizes unique stable IDs and rejects wrong kind',()=>{const o=repo.normalizeCatalogOrder({commands:['A','B','A'],useCases:['U']});assert.deepEqual(o.commands,['A','B']);assert.throws(()=>repo.parseCatalogOrder(JSON.stringify({schemaVersion:1,kind:'wrong',commands:[]})),/Unsupported catalog-order kind/)});

test('readOrder treats absent GitHub order as an empty valid order',async()=>{const client={async read(){const e=new Error('missing');e.kind='not_found';throw e}};const service=new repo.RepositoryCatalogService(client);const result=await service.readOrder();assert.equal(result.sha,'');assert.deepEqual(result.order.commands,[])});

test('saveOrder exact no-op performs no write',async()=>{let writes=0;const existing=repo.renderCatalogOrder({commands:['a']});const client={async read(){return{sha:'s1',content:existing}},async saveVerified(){writes++;throw new Error('unexpected')}};const service=new repo.RepositoryCatalogService(client);const result=await service.saveOrder({commands:['a']});assert.equal(result.action,'noop');assert.equal(writes,0)});


test('catalog order schema v2 round-trips presentation-only command groups',()=>{
  const value=repo.normalizeCatalogOrder({schemaVersion:2,commands:['A','B'],commandGroups:[{id:'g.one',viewId:'GENERAL',label:'One',order:0,items:['A']},{id:'g.two',viewId:'GENERAL',label:'Two',order:1,items:['B']}]});
  assert.equal(value.schemaVersion,2);
  assert.deepEqual(value.commandGroups.map((group)=>group.id),['g.one','g.two']);
  const parsed=repo.parseCatalogOrder(repo.renderCatalogOrder(value));
  assert.deepEqual(parsed.commandGroups,value.commandGroups);
});

test('catalog order rejects one command card assigned to multiple presentation groups',()=>{
  assert.throws(()=>repo.normalizeCatalogOrder({schemaVersion:2,commandGroups:[{id:'g.one',viewId:'GENERAL',label:'One',items:['A']},{id:'g.two',viewId:'GENERAL',label:'Two',items:['A']}]}),/multiple groups/i);
});
