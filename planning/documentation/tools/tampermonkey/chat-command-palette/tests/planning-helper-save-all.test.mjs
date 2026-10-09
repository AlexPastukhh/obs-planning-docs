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
    if(environment.failId===item.id){const error=new Error(`Simulated GitHub failure: ${item.id}`);if(environment.failKind)error.kind=environment.failKind;throw error;}
    return{action:environment.noopId===item.id?'noop':'update',rawContent:helper.renderHelperLibraryDocument(item),sha:`sha-helper-${item.id}`};
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
    localGate:null,remoteGate:null,failId:'',failKind:'',noopId:'',failLocalAt:0};
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


test('prompt groups persist separately from prompt files and Save all publishes catalog order',async()=>{
  const{env,instance,ui}=await mount(initial());
  try{
    const saved=await ui.onSaveLocalLibraryItem({kind:'prompt',id:'grouped',title:'Grouped prompt',text:'Keep source intact'});
    const promptId=`helper-library:prompt:${saved.item.id}`;
    await ui.onCreatePromptGroup('Review');
    await ui.onAssignPromptGroup(promptId,'review');
    assert.deepEqual(instance.getSnapshot().catalogOrder.promptGroups,[{id:'review',label:'Review',items:[promptId]}]);
    assert.equal(instance.getSnapshot().catalogOrderSha,'');
    assert.equal(instance.getLocalLibrary().find(x=>x.id==='grouped').text,'Keep source intact');
    const result=await ui.onSaveAllRepository();
    assert.equal(result.ok,true);assert.equal(result.savedPrompts,1);assert.equal(result.savedOrder,true);
    assert.equal(env.orderWrites,1);
    assert.equal(instance.getSnapshot().catalogOrderSha,'sha-order-updated');
    await ui.onRenamePromptGroup('review','Review and analysis');
    await ui.onDeletePromptGroup('review');
    assert.equal(instance.getSnapshot().catalogOrderSha,'');
    assert.deepEqual(instance.getSnapshot().catalogOrder.promptGroups,[]);
    assert.equal(instance.getLocalLibrary().find(x=>x.id==='grouped').text,'Keep source intact');
  }finally{instance.dispose();}
});

test('simultaneous prompt group edits and local prompt creation are serialized',async()=>{
  const{env,instance,ui}=await mount(initial());
  try{
    env.localGate=deferred();const gate=env.localGate;
    const saved=ui.onSaveLocalLibraryItem({kind:'prompt',id:'fresh',title:'Fresh',text:'Latest'});
    const grouped=ui.onCreatePromptGroup('Review');
    gate.resolve();await Promise.all([saved,grouped]);
    await ui.onAssignPromptGroup('helper-library:prompt:fresh','review');
    assert.equal(instance.getSnapshot().catalogOrder.promptGroups[0].items[0],'helper-library:prompt:fresh');
    assert.equal(instance.getLocalLibrary()[0].text,'Latest');
  }finally{instance.dispose();}
});


test('Save all publishes a catalog upgraded from v5 even if no prompt text changed',async()=>{
  const stored=initial([{id:'clean',text:'unchanged',known:true}],'old-v5-remote-sha');
  const oldOrder={...stored.catalogOrder,schemaVersion:5};delete oldOrder.promptGroups;
  const migrated=state.normalizePlanningHelperLocalSnapshot({...stored,catalogOrder:oldOrder});
  assert.equal(migrated.catalogOrderSha,'');
  const{env,instance,ui}=await mount(migrated);
  try{
    const result=await ui.onSaveAllRepository();
    assert.equal(result.ok,true);
    assert.equal(result.savedOrder,true);
    assert.equal(result.savedHelperItems,0);
    assert.equal(env.orderWrites,1);
    assert.equal(env.helperWrites.length,0);
    assert.equal(instance.getSnapshot().catalogOrderSha,'sha-order-updated');
  }finally{instance.dispose();}
});


test('one unverified module does not prevent Save all from publishing a new prompt',async()=>{
  const{env,instance,ui}=await mount(initial([{id:'review.reader-overview',text:'module changed'}]));
  try{
    const local=await ui.onSaveLocalLibraryItem({kind:'prompt',id:'test-prompt-123',title:'This is test prompt 123',text:'A newly created prompt'});
    assert.equal(local.item.id,'test-prompt-123');
    env.failId='review.reader-overview';
    env.failKind='verification_mismatch';
    const result=await ui.onSaveAllRepository();
    assert.equal(result.ok,false);
    assert.equal(result.action,'save-all-partial');
    assert.equal(result.savedPrompts,1);
    assert.equal(result.savedModules,0);
    assert.equal(result.savedOrder,true);
    assert.ok(result.failedItems.some(path=>path.includes('review.reader-overview')));
    const items=instance.getSnapshot().helperItems;
    assert.equal(items.find(record=>record.item.id==='test-prompt-123').repositoryKnown,true);
    assert.equal(items.find(record=>record.item.id==='review.reader-overview').repositoryKnown,false);
    assert.deepEqual(env.helperWrites.map(row=>row.id),['review.reader-overview','test-prompt-123']);
  }finally{instance.dispose();}
});


test('Save all acknowledges previously uploaded helpers without counting them as new writes',async()=>{
  const {env,instance,ui}=await mount(initial([{id:'already',text:'on GitHub'},{id:'newer',text:'new local edit'}]));
  try{
    env.noopId='already';
    const result=await ui.onSaveAllRepository();
    assert.equal(result.ok,true);
    assert.equal(result.savedModules,1);
    assert.equal(result.savedHelperItems,1);
    assert.equal(result.alreadyOnGitHub,1);
    assert.deepEqual(env.helperWrites.map(x=>x.id),['already','newer']);
    assert.ok(instance.getSnapshot().helperItems.every(x=>x.repositoryKnown));
    const repeated=await ui.onSaveAllRepository();
    assert.equal(repeated.action,'noop');
    assert.equal(env.helperWrites.length,2);
  }finally{instance.dispose();}
});
