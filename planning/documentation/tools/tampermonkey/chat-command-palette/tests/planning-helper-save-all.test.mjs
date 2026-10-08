import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const codec=require('../src/command-definition-codec.js');
const catalog=require('../src/command-catalog.js');
const helper=require('../src/helper-library-codec.js');
const body=require('../src/command-body.js');
const semantic=require('../src/semantic-projections.js');
const repositoryCatalog=require('../src/repository-catalog-service.js');
const state=require('../src/planning-helper-state.js');
let environment;
class FakeCommandService {
  async save(definition){environment.commandWrites.push(definition.id);return{
    rawContent:codec.renderCommandDefinitionDocument(definition),sha:`sha-command-${definition.id}`};}
}
class FakeHelperService {
  async save(item){
    environment.helperWrites.push({kind:item.kind,id:item.id,text:item.text});
    if(environment.remoteGate)await environment.remoteGate.promise;
    if(environment.failId===item.id)throw new Error(`Simulated GitHub failure: ${item.id}`);
    return{rawContent:helper.renderHelperLibraryDocument(item),sha:`sha-helper-${item.id}`};
  }
}
let uiCallbacks;
globalThis.ObsPlanningHelper={...codec,...catalog,...helper,...body,...semantic,...repositoryCatalog,...state,
  createPlanningHelperUi(options){uiCallbacks=options;return{dispose(){}};},
  async loadOrMigratePlanningHelperLocalSnapshot(){return{snapshot:environment.stored};},
  async savePlanningHelperLocalSnapshot(next){
    environment.localWrites++;
    if(environment.failLocalAt===environment.localWrites)throw new Error('Simulated local write failure');
    if(environment.localGate){const gate=environment.localGate;environment.localGate=null;await gate.promise;}
    environment.stored=state.normalizePlanningHelperLocalSnapshot(next);
    return environment.stored;
  },
  async loadRepositorySettings(){return{owner:'example',repo:'test',branch:'main'};},
  async loadGitHubToken(){return'test-token';},
  createGmTransport(){return{};},
  GitHubContentsClient:class {},RepositoryCommandService:FakeCommandService,
  RepositoryHelperLibraryService:FakeHelperService
};
const originalSaveOrder=repositoryCatalog.RepositoryCatalogService.prototype.saveOrder;
repositoryCatalog.RepositoryCatalogService.prototype.saveOrder=async function(order){
  environment.orderWrites++;
  return{order,sha:'sha-order-updated',action:'update'};
};
globalThis.GM_xmlhttpRequest=()=>{};
const runtime=require('../src/planning-helper-runtime.js');
function item(id,text){return helper.normalizeHelperLibraryItem({kind:'module',id,title:id,text,
  createdAt:'2026-10-01T00:00:00Z',updatedAt:'2026-10-01T00:00:00Z'});}
function deferred(){let resolve;const promise=new Promise(r=>{resolve=r;});return{promise,resolve};}
function initial(records=[],orderSha='sha-existing-order'){
  return state.normalizePlanningHelperLocalSnapshot({schemaVersion:state.LOCAL_SNAPSHOT_SCHEMA_VERSION,
    planningCommands:[],helperItems:records.map(({id,text,known=false})=>state.normalizeHelperRecord({
      item:item(id,text),repositoryKnown:known,repositorySha:known?`sha-helper-${id}`:''})),
    useCases:[],semanticComponents:[],scenarios:[],catalogOrder:{},catalogOrderSha:orderSha});
}
async function mount(snapshot){
  environment={stored:snapshot,helperWrites:[],commandWrites:[],orderWrites:0,localWrites:0,
    localGate:null,remoteGate:null,failId:'',failLocalAt:0};
  const instance=await runtime.startPlanningHelper();
  return{env:environment,instance,ui:uiCallbacks};
}
test('two concurrent local edits preserve both items instead of overwriting stale snapshots',async()=>{
  const{env,instance,ui}=await mount(initial());
  try{
    env.localGate=deferred();const gate=env.localGate;
    const first=ui.onSaveLocalLibraryItem({kind:'module',id:'first',title:'first',text:'A'});
    const second=ui.onSaveLocalLibraryItem({kind:'module',id:'second',title:'second',text:'B'});
    await Promise.resolve();gate.resolve();await Promise.all([first,second]);
    assert.deepEqual(instance.getLocalLibrary().map(x=>x.id).sort(),['first','second']);
    assert.equal(env.localWrites,2);
  }finally{instance.dispose();}
});
test('Save all waits for a still-running local edit and publishes its newest text',async()=>{
  const{env,instance,ui}=await mount(initial());
  try{
    env.localGate=deferred();const gate=env.localGate;
    const local=ui.onSaveLocalLibraryItem({kind:'module',id:'new',title:'new',text:'latest edit'});
    const publishing=ui.onSaveAllRepository();
    await Promise.resolve();assert.equal(env.helperWrites.length,0);
    gate.resolve();await local;
    const result=await publishing;
    assert.equal(result.ok,true);assert.equal(result.savedModules,1);
    assert.deepEqual(env.helperWrites.map(x=>x.text),['latest edit']);
    assert.equal(instance.getSnapshot().helperItems[0].repositoryKnown,true);
  }finally{instance.dispose();}
});
test('Save all retains verified progress after partial GitHub failure and retries only pending items',async()=>{
  const{env,instance,ui}=await mount(initial([{id:'one',text:'1'},{id:'two',text:'2'}]));
  try{
    env.failId='two';const result=await ui.onSaveAllRepository();
    assert.equal(result.ok,false);assert.equal(result.action,'save-all-partial');
    assert.equal(result.savedModules,1);assert.match(result.failedItem,/two/);
    assert.equal(result.localSnapshotUpdated,true);
    const records=instance.getSnapshot().helperItems;
    assert.equal(records.find(x=>x.item.id==='one').repositoryKnown,true);
    assert.equal(records.find(x=>x.item.id==='two').repositoryKnown,false);
    env.failId='';const retry=await ui.onSaveAllRepository();
    assert.equal(retry.ok,true);assert.equal(retry.savedModules,1);
    assert.deepEqual(env.helperWrites.map(x=>x.id),['one','two','two']);
  }finally{instance.dispose();}
});
test('local edit during a slow GitHub write is applied afterwards and remains pending',async()=>{
  const{env,instance,ui}=await mount(initial([{id:'one',text:'original'}]));
  try{
    env.remoteGate=deferred();const gate=env.remoteGate;
    const publishing=ui.onSaveAllRepository();
    for(let i=0;i<40&&env.helperWrites.length===0;i++)await Promise.resolve();
    assert.equal(env.helperWrites.length,1,'GitHub save must already be in flight');
    const editing=ui.onSaveLocalLibraryItem({kind:'module',id:'one',title:'one',text:'newer'});
    gate.resolve();env.remoteGate=null;
    await publishing;await editing;
    const record=instance.getSnapshot().helperItems[0];
    assert.equal(record.item.text,'newer');assert.equal(record.repositoryKnown,false);
  }finally{instance.dispose();}
});
test('already verified GitHub SHA is not compared to unrelated JSON fingerprints',async()=>{
  const{env,instance,ui}=await mount(initial([{id:'clean',text:'unchanged',known:true}]));
  try{const result=await ui.onSaveAllRepository();assert.equal(result.action,'noop');assert.equal(env.helperWrites.length,0);}
  finally{instance.dispose();}
});
test('an order-only Save all durably records its GitHub SHA',async()=>{
  const{env,instance,ui}=await mount(initial([],''));
  try{const result=await ui.onSaveAllRepository();assert.equal(result.savedOrder,true);
    assert.equal(env.orderWrites,1);assert.equal(instance.getSnapshot().catalogOrderSha,'sha-order-updated');}
  finally{instance.dispose();}
});

test('failure to persist a confirmed remote save is reported, not disguised as a failed GitHub write',async()=>{
  const{env,instance,ui}=await mount(initial([{id:'one',text:'1'}]));
  try{
    env.failLocalAt=1;
    const result=await ui.onSaveAllRepository();
    assert.equal(result.ok,false);assert.equal(result.savedModules,1);
    assert.equal(result.localSnapshotUpdated,false);
    assert.match(result.error.message,/local write failure/);
    assert.equal(instance.getSnapshot().helperItems[0].repositoryKnown,false);
    env.failLocalAt=0;
    const retry=await ui.onSaveAllRepository();
    assert.equal(retry.ok,true);
    assert.equal(instance.getSnapshot().helperItems[0].repositoryKnown,true);
  }finally{instance.dispose();}
});

test('single-item GitHub save waits for local edit and receives latest content',async()=>{
  const{env,instance,ui}=await mount(initial([{id:'one',text:'original',known:true}]));
  try{
    env.localGate=deferred();const gate=env.localGate;
    const editing=ui.onSaveLocalLibraryItem({kind:'module',id:'one',title:'one',text:'fresh'});
    const publishing=ui.onSaveRepositoryEntity({type:'helper',kind:'module',id:'one'});
    gate.resolve();await editing;await publishing;
    assert.deepEqual(env.helperWrites.map(x=>x.text),['fresh']);
    assert.equal(instance.getSnapshot().helperItems[0].repositoryKnown,true);
  }finally{instance.dispose();}
});
