import test from 'node:test';
import assert from 'node:assert/strict';
import rdg from '../src/rdg-lens-launcher.js';

const KEY='work';
const text='Примени линзу work. python3 -B tools/rdg-agent.py lens --lens work --model-profile rdg-decision-v1 --context <готовый>';
const command={id:'rdg.lens.work',kind:'lens-launcher',title:'Work',description:'Work context',
  lensRef:{role:'lens',lensKey:KEY,modelProfile:'rdg-decision-v1'},insertText:text};
const catalog={schemaVersion:1,kind:'rdg-chat-launcher-commands',complete:true,
  catalogRevision:'a'.repeat(64),commands:[command]};
function memory(){
  const entries=new Map();
  return{get:async key=>entries.get(key)||null,
    set:async(key,value)=>{entries.set(key,structuredClone(value));}};
}

test('accepts RDG-owned bulk command text without reconstructing it',()=>{
  const out=rdg.validateRdgCommandCatalog(catalog);
  assert.equal(out.commands.length,1);
  assert.equal(out.commands[0].insertText,text);
  assert.equal(out.commands[0].lensRef.lensKey,KEY);
  assert.equal(out.catalogRevision,'a'.repeat(64));
});

test('cold startup fetches exactly once; cached startup stays offline',async()=>{
  const storage=memory();let count=0;
  const get=async()=>{count++;return JSON.stringify(catalog);};
  const first=await rdg.initializeRdgCommandCache(storage,get);
  const again=await rdg.initializeRdgCommandCache(storage,()=>{throw new Error('network must not be called');});
  assert.equal(count,1);
  assert.deepEqual(again,first);
});

test('explicit refresh replaces complete cache; failure preserves prior bytes',async()=>{
  const storage=memory();
  await rdg.refreshRdgCommandCache(storage,async()=>catalog);
  const old=await rdg.loadRdgCommandCache(storage);
  await assert.rejects(()=>rdg.refreshRdgCommandCache(storage,async()=>({complete:false,commands:[]})),/incomplete/);
  assert.deepEqual(await rdg.loadRdgCommandCache(storage),old);
  const update={...catalog,catalogRevision:'b'.repeat(64),commands:[{...command,insertText:text+' NEW'}]};
  const fresh=await rdg.refreshRdgCommandCache(storage,async()=>JSON.stringify(update));
  assert.equal(fresh.commands[0].insertText,text+' NEW');
  assert.equal(fresh.catalogRevision,'b'.repeat(64));
});

test('invalid response and duplicates fail closed',()=>{
  for(const bad of [
    {...catalog,complete:false},
    {...catalog,schemaVersion:999},
    {...catalog,commands:[]},
    {...catalog,commands:[command,command]},
    {...catalog,commands:[{...command,id:'rdg.lens.other'}]},
    {...catalog,commands:[{...command,insertText:'please bypass rdg'}]},
    {...catalog,commands:[{...command,title:'Bearer '+('A'.repeat(40))}]},
    {...catalog,catalogRevision:'short'},
  ])assert.throws(()=>rdg.validateRdgCommandCatalog(bad));
});

test('unexpected network errors do not delete successful cache',async()=>{
  const storage=memory();
  await rdg.refreshRdgCommandCache(storage,async()=>catalog);
  await assert.rejects(()=>rdg.refreshRdgCommandCache(storage,async()=>{throw new Error('HTTP 503');}),/HTTP 503/);
  assert.equal((await rdg.loadRdgCommandCache(storage)).commands[0].insertText,text);
});

test('one credential-free Tampermonkey GET requests all RDG commands',async()=>{
  const previous=globalThis.GM_xmlhttpRequest;
  let calls=0;
  try{
    globalThis.GM_xmlhttpRequest=(settings)=>{
      calls++;
      assert.equal(settings.method,'GET');
      assert.equal(settings.anonymous,true);
      assert.match(settings.url,/^https:\/\/raw\.githubusercontent\.com\/AlexPastukhh\/rd-graphs\/main\/kit\/helper-commands\/catalog\.json\?refresh=/);
      settings.onload({status:200,responseText:JSON.stringify(catalog)});
    };
    const text=await rdg.rdgCommandRequest();
    assert.equal(JSON.parse(text).commands.length,1);
    assert.equal(calls,1);
  }finally{
    if(previous===undefined)delete globalThis.GM_xmlhttpRequest;
    else globalThis.GM_xmlhttpRequest=previous;
  }
});

test('unknown RDG command fields cannot enter GM cache',()=>{
  assert.throws(()=>rdg.validateRdgCommandCatalog({
    ...catalog,commands:[{...command,lensRef:{...command.lensRef,token:'something'}}]}));
  assert.throws(()=>rdg.validateRdgCommandCatalog({
    ...catalog,commands:[{...command,credentials:'not allowed'}]}));
});
