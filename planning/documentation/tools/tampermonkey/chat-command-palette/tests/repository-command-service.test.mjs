import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const codec=require('../src/command-definition-codec.js');
const {RepositoryCommandService}=require('../src/repository-command-service.js');
function def(id='one',command='one'){return codec.normalizeCommandDefinition({schemaVersion:1,id,file:`${id}.command.md`,command,englishName:`${id} english`,commandFamily:[command],description:'desc',meaning:'meaning',activeContextBehavior:'active',traversalReadMode:'targeted',ownerFiles:[],expectedOutput:'output',permissionMode:'read-only',keyReminders:['remember'],userTarget:'<target>',palette:true,refinements:[]})}
function remoteRecord(definition,sha='sha'){const path=codec.commandPathForDefinition(definition);return{type:'file',path,name:definition.file,sha,content:codec.renderCommandDefinitionDocument(definition)}}
function fakeClient(records=[]){const map=new Map(records.map((record)=>[record.path,record]));const calls={list:0,read:0,save:[]};return{calls,client:{async listDirectory(path){calls.list++;return[...map.values()].map(({type,path,name,sha})=>({type,path,name,sha}))},async read(path){calls.read++;const row=map.get(path);if(!row){const e=new Error('missing');e.kind='not_found';throw e;}return{path,sha:row.sha,content:row.content}},async saveVerified(input){calls.save.push(input);const sha=`saved-${calls.save.length}`;map.set(input.path,{type:'file',path:input.path,name:input.path.split('/').pop(),sha,content:input.content});return{path:input.path,sha,content:input.content}}}}}

test('listRemote compares direct command names without fetching file bodies',async()=>{const a=def('a','a'),{client,calls}=fakeClient([remoteRecord(a,'s1')]);const service=new RepositoryCommandService(client);const rows=await service.listRemote();assert.deepEqual(rows.map((row)=>[row.name,row.sha]),[['a.command.md','s1']]);assert.equal(calls.list,1);assert.equal(calls.read,0)});

test('readRemote parses one remote command and keeps SHA/raw content',async()=>{const a=def('a','a'),{client}=fakeClient([remoteRecord(a,'s1')]);const row=await new RepositoryCommandService(client).readRemote('planning/commands/a.command.md');assert.equal(row.definition.id,'a');assert.equal(row.sha,'s1');assert.match(row.rawContent,/PLANNING_COMMAND_DEFINITION/)});

test('save creates a missing command after validating the complete remote catalog',async()=>{const a=def('a','a'),b=def('b','b'),{client,calls}=fakeClient([remoteRecord(a,'s1')]);const result=await new RepositoryCommandService(client).save(b);assert.equal(result.action,'create');assert.equal(calls.save.length,1);assert.equal(calls.save[0].baseSha,'');assert.equal(calls.save[0].path,'planning/commands/b.command.md')});

test('save updates by current remote SHA and no-ops when exact bytes already match',async()=>{const a=def('a','a'),row=remoteRecord(a,'s1'),first=fakeClient([row]);const service1=new RepositoryCommandService(first.client);const noop=await service1.save(a);assert.equal(noop.action,'noop');assert.equal(first.calls.save.length,0);const changed={...a,description:'changed'};const second=fakeClient([row]);const updated=await new RepositoryCommandService(second.client).save(changed);assert.equal(updated.action,'update');assert.equal(second.calls.save[0].baseSha,'s1')});

test('save refuses a command that would make the remote command catalog ambiguous',async()=>{const a=def('a','shared'),{client,calls}=fakeClient([remoteRecord(a,'s1')]);const b=def('b','shared');await assert.rejects(()=>new RepositoryCommandService(client).save(b),/Duplicate canonical command/);assert.equal(calls.save.length,0)});

test('save propagates same-content conflict recovery evidence',async()=>{const a=def('a','a'),row=remoteRecord(a,'s1'),{client}=fakeClient([row]);client.saveVerified=async(input)=>({path:input.path,sha:'fresh',content:input.content,recoveredAfterConflict:true});const changed={...a,description:'changed'};const result=await new RepositoryCommandService(client).save(changed);assert.equal(result.recoveredAfterConflict,true);assert.equal(result.sha,'fresh')});

test('save rejects missing, duplicate and example-only process points before repository mutation',async()=>{
  const b=def('b','b'),a={...def('a','a'),processCalls:[{id:'check',commandPath:'planning/commands/b.command.md',at:{path:'planning/process.md',anchor:'handoff'},when:'At handoff',context:'Current basis'}]};
  const anchor='<a id="handoff"></a>';
  for(const content of [null,'# No anchor',anchor+'\n'+anchor,'~~~~md\n'+anchor+'\n~~~~','````md\n'+anchor+'\n````','    '+anchor,'`'+anchor+'`']){
    const {client,calls}=fakeClient([remoteRecord(b)]),read=client.read;
    client.read=async path=>path==='planning/process.md'&&content!==null?{content,sha:'owner'}:read(path);
    await assert.rejects(()=>new RepositoryCommandService(client).save(a),/missing|Expected one process-call owner anchor/);
    assert.equal(calls.save.length,0);
  }
});

test('save validates process points, preserves calls and reads a shared owner once',async()=>{
  const point={path:'planning/process.md',anchor:'handoff'},call={id:'first',commandPath:'planning/commands/b.command.md',at:point,when:'At handoff',context:'Current basis'},a={...def('a','a'),processCalls:[call,{...call,id:'second',at:{...point,anchor:'after'}}]},b=def('b','b');
  const {client,calls}=fakeClient([remoteRecord(b)]),read=client.read;let ownerReads=0;
  client.read=async path=>{if(path!=='planning/process.md')return read(path);ownerReads++;return{content:'<a id="handoff"></a>\n<a id="after"></a>',sha:'owner'};};
  const result=await new RepositoryCommandService(client).save(a);
  assert.equal(result.action,'create');assert.equal(ownerReads,1);assert.equal(calls.save.length,1);
  assert.deepEqual(codec.parseCommandDefinitionDocument(calls.save[0].content).processCalls,a.processCalls);
});

test('save validates deferred points inherited from reachable included commands',async()=>{
  const c=def('c','c'),b={...def('b','b'),processCalls:[{id:'nested',commandPath:'planning/commands/c.command.md',at:{path:'planning/missing.md',anchor:'handoff'},when:'At handoff',context:'Current basis'}]},a={...def('a','a'),includes:['planning/commands/b.command.md']};
  const {client,calls}=fakeClient([remoteRecord(b),remoteRecord(c)]);
  await assert.rejects(()=>new RepositoryCommandService(client).save(a),/missing/);
  assert.equal(calls.save.length,0);
});
