import test from 'node:test';
import assert from 'node:assert/strict';
import{createRequire}from'node:module';
const require=createRequire(import.meta.url);
const command=require('../src/command-definition-codec.js');
const catalog=require('../src/command-catalog.js');
const body=require('../src/command-body.js');
const semantic=require('../src/semantic-projections.js');
const helper=require('../src/helper-library-codec.js');
const stateDeps={...command,...catalog,...helper};
Object.assign(globalThis,{ObsPlanningHelper:{...stateDeps,...body,...semantic}});
const state=require('../src/planning-helper-state.js');Object.assign(globalThis.ObsPlanningHelper,state);
const recovery=require('../src/chat-recovery.js');Object.assign(globalThis.ObsPlanningHelper,recovery);
const runtime=require('../src/planning-helper-runtime.js');
const def=(file,id,commandName)=>command.normalizeCommandDefinition({schemaVersion:1,id,file,command:commandName,englishName:id,commandFamily:[commandName],description:'d',meaning:'m',activeContextBehavior:'a',traversalReadMode:'t',ownerFiles:[],expectedOutput:'o',permissionMode:'read-only',keyReminders:['r'],userTarget:'<t>',palette:true,refinements:[]});
const base={schemaVersion:1,savedAt:'2026-01-01T00:00:00Z',planningCommands:[state.normalizeCommandRecord({definition:def('a.command.md','a','a'),repositoryKnown:true})],helperItems:[]};

test('restore mode reconciles repository-backed commands to the complete pasted GitHub set and schedules zero backups',()=>{const parsed={definitions:[def('b.command.md','b','b')],helperItems:[]};const result=runtime.mergeChatImport(base,parsed,'restore');assert.equal(result.newCommandRecords.length,0);assert.equal(result.removedRepositoryCommands,1);assert.deepEqual(result.snapshot.planningCommands.map((x)=>x.definition.id),['b']);assert.equal(result.snapshot.planningCommands[0].repositoryKnown,true)});

test('restore preserves local-only unbacked command records while removing stale repository-backed records',()=>{const local=state.normalizeCommandRecord({definition:def('local.command.md','local','local'),repositoryKnown:false});const snapshot={...base,planningCommands:[...base.planningCommands,local]};const result=runtime.mergeChatImport(snapshot,{definitions:[def('b.command.md','b','b')],helperItems:[]},'restore');assert.deepEqual(result.snapshot.planningCommands.map((x)=>x.definition.id).sort(),['b','local']);assert.equal(result.snapshot.planningCommands.find((x)=>x.definition.id==='local').repositoryKnown,false);assert.equal(result.removedRepositoryCommands,1)});


test('import mode schedules only records that are not locally repository-known',()=>{const parsed={definitions:[def('a.command.md','a','a2'),def('b.command.md','b','b')],helperItems:[]};const result=runtime.mergeChatImport(base,parsed,'import');assert.equal(result.newCommandRecords.length,1);assert.equal(result.newCommandRecords[0].definition.id,'b');assert.equal(result.snapshot.planningCommands.find(x=>x.definition.id==='a').repositoryKnown,true)});



test('prompt restore reconciles repository-backed prompts while preserving local-only prompts',()=>{const stale=state.normalizeHelperRecord({item:helper.normalizeHelperLibraryItem({kind:'prompt',id:'stale-prompt',title:'Stale prompt',text:'STALE',createdAt:'2026-01-01T00:00:00Z',updatedAt:'2026-01-01T00:00:00Z'}),repositoryKnown:true});const local=state.normalizeHelperRecord({item:helper.normalizeHelperLibraryItem({kind:'prompt',id:'local-prompt',title:'Local prompt',text:'LOCAL',createdAt:'2026-01-01T00:00:00Z',updatedAt:'2026-01-01T00:00:00Z'}),repositoryKnown:false});const prompt=helper.normalizeHelperLibraryItem({kind:'prompt',id:'restore-prompt',title:'Restore prompt',text:'PROMPT BODY',createdAt:'2026-01-01T00:00:00Z',updatedAt:'2026-01-01T00:00:00Z'});const result=runtime.mergeChatImport({...base,helperItems:[stale,local]},{definitions:[def('a.command.md','a','a')],helperItems:[prompt]},'restore');assert.equal(result.newHelperRecords.length,0);assert.equal(result.removedRepositoryHelperItems,1);assert.deepEqual(result.snapshot.helperItems.map((row)=>row.item.id).sort(),['local-prompt','restore-prompt']);assert.equal(result.snapshot.helperItems.find((row)=>row.item.id==='restore-prompt').repositoryKnown,true);assert.equal(result.snapshot.helperItems.find((row)=>row.item.id==='local-prompt').repositoryKnown,false)});

test('new prompt import uses the same local-first create-only scheduling as new helper commands',()=>{const prompt=helper.normalizeHelperLibraryItem({kind:'prompt',id:'new-prompt',title:'New prompt',text:'EXACT PROMPT',createdAt:'2026-01-01T00:00:00Z',updatedAt:'2026-01-01T00:00:00Z'});const result=runtime.mergeChatImport(base,{definitions:[],helperItems:[prompt]},'import');assert.equal(result.newHelperRecords.length,1);assert.equal(result.newHelperRecords[0].path,'planning/helper-library/prompts/new-prompt.prompt.md');assert.equal(result.snapshot.helperItems.find((row)=>row.item.id==='new-prompt').item.text,'EXACT PROMPT')});

test('clipboard is ready before composer insertion and exact same text is used',async()=>{const calls=[];let release;const clipboard=new Promise((resolve)=>{release=()=>{calls.push(['clipboard-ready']);resolve(true)}});const ops={copyText(text){calls.push(['copy',text]);return clipboard},insertIntoComposer(text,id){calls.push(['insert',text,id]);return{ok:true}}};const pending=runtime.insertWithClipboard('EXACT BODY','Inserted','cmd',ops);await Promise.resolve();assert.deepEqual(calls,[['copy','EXACT BODY']]);release();const message=await pending;assert.deepEqual(calls,[['copy','EXACT BODY'],['clipboard-ready'],['insert','EXACT BODY','cmd']]);assert.match(message,/clipboard ready/)});

test('synchronous clipboard fast path inserts immediately after copy without async transport',async()=>{const calls=[];const ops={copyText(text){calls.push(['copy',text]);return true},insertIntoComposer(text,id){calls.push(['insert',text,id]);return{ok:true}}};const message=await runtime.insertWithClipboard('FAST BODY','Inserted','cmd',ops);assert.deepEqual(calls,[['copy','FAST BODY'],['insert','FAST BODY','cmd']]);assert.match(message,/clipboard ready/)});

test('failed insertion keeps exact text in clipboard for manual paste',async()=>{const calls=[];const ops={copyText(text){calls.push(text);return true},insertIntoComposer(){return{ok:false,reason:'composer-not-found'}}};const message=await runtime.insertWithClipboard('BODY','Inserted','x',ops);assert.deepEqual(calls,['BODY']);assert.match(message,/exact text is in the clipboard/i)});

test('warm start reads one local snapshot and performs zero GitHub requests; hot insert performs no further GM read',async()=>{
  const oldGet=globalThis.GM_getValue,oldSet=globalThis.GM_setValue,oldXml=globalThis.GM_xmlhttpRequest;
  const deps=globalThis.ObsPlanningHelper;
  const oldUi=deps.createPlanningHelperUi,oldCopy=deps.copyText,oldInsert=deps.insertIntoComposer;
  const payload=state.normalizePlanningHelperLocalSnapshot(base);let gets=0,githubRequests=0,capturedUi=null;
  globalThis.GM_getValue=async(key,fallback)=>{gets++;return key===state.PLANNING_HELPER_STATE_KEYS.localSnapshot?payload:fallback};
  globalThis.GM_setValue=async()=>{throw new Error('warm start should not write GM storage')};
  globalThis.GM_xmlhttpRequest=()=>{githubRequests++;throw new Error('GitHub must not be touched')};
  deps.createPlanningHelperUi=(options)=>{capturedUi=options;return{dispose(){}}};
  deps.copyText=()=>true;deps.insertIntoComposer=()=>({ok:true});
  try{
    const app=await runtime.startPlanningHelper({bundledCommands:[def('bundled.command.md','bundled','bundled')]});
    assert.equal(gets,1);assert.equal(githubRequests,0);assert.ok(capturedUi);
    await capturedUi.onInsert('BODY','Inserted','a');
    assert.equal(gets,1);assert.equal(githubRequests,0);
    app.dispose();
  }finally{
    if(oldGet===undefined)delete globalThis.GM_getValue;else globalThis.GM_getValue=oldGet;
    if(oldSet===undefined)delete globalThis.GM_setValue;else globalThis.GM_setValue=oldSet;
    if(oldXml===undefined)delete globalThis.GM_xmlhttpRequest;else globalThis.GM_xmlhttpRequest=oldXml;
    deps.createPlanningHelperUi=oldUi;deps.copyText=oldCopy;deps.insertIntoComposer=oldInsert;
  }
});
