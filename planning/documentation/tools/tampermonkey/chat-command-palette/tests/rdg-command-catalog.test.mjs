import test from 'node:test';
import assert from 'node:assert/strict';
import rdg from '../src/rdg-command-catalog.js';

const text='Примени линзу RDG work. python3 -B tools/rdg-agent.py lens --lens work --model-profile rdg-decision-v1 --context <готовый>';
const ref=(key)=>({role:'lens',lensKey:key,modelProfile:'rdg-decision-v1'});
const command={id:'rdg.lens.work',kind:'lens-launcher',title:'Work',description:'Work context',
  groupId:'lenses',lensRefs:[ref('work')],insertText:text};
const bootstrapText='Начни RDG и найди задачу; прочитай rdg-agent.py lens --lens orient и rdg-agent.py lens --lens work. Не создавай Graph автоматически.';
const bootstrap={id:'rdg.command.bootstrap',kind:'workflow',title:'Начать работу с RDG',description:'Bootstrap entry',
  groupId:'start',lensRefs:[ref('orient'),ref('work')],insertText:bootstrapText};
const groups=[{id:'start',title:'Начало работы',description:'Вход в задачу'},
  {id:'lenses',title:'Линзы',description:'Прямой выбор методики'}];
const catalog={schemaVersion:2,kind:'rdg-chat-commands',complete:true,
  catalogRevision:'a'.repeat(64),groups,commands:[bootstrap,command]};
function memory(){
  const entries=new Map();
  return{get:async key=>entries.get(key)||null,
    set:async(key,value)=>{entries.set(key,structuredClone(value));}};
}

test('accepts RDG-owned bootstrap, groups and all text bytes without recomposing it',()=>{
  const out=rdg.validateRdgCommandCatalog(catalog);
  assert.equal(out.schemaVersion,2);
  assert.equal(out.commands.length,2);
  assert.deepEqual(out.groups,groups);
  assert.deepEqual(out.commands[0],bootstrap);
  assert.equal(out.commands[0].insertText,bootstrapText);
  assert.equal(out.commands[1].insertText,text);
  assert.deepEqual(out.commands[0].lensRefs.map(ref=>ref.lensKey),['orient','work']);
});

test('cold V2 startup fetches once, warm v2 cache remains offline and does not inspect V1 key',async()=>{
  const storage=memory();
  const oldKey='obsPlanningHelper:v1:rdgCommandCatalog';
  await storage.set(oldKey,{broken:'legacy'});
  let count=0;
  const get=async()=>{count++;return JSON.stringify(catalog);};
  const first=await rdg.initializeRdgCommandCache(storage,get);
  const second=await rdg.initializeRdgCommandCache(storage,()=>{throw new Error('network must not be called');});
  assert.equal(rdg.RDG_COMMAND_CACHE_KEY,'obsPlanningHelper:v2:rdgCommandCatalog');
  assert.equal(count,1);
  assert.deepEqual(second,first);
  assert.deepEqual(await storage.get(oldKey),{broken:'legacy'});
});

test('explicit refresh updates group labels and keeps previous v2 cache after failures',async()=>{
  const storage=memory();
  await rdg.refreshRdgCommandCache(storage,async()=>catalog);
  const old=await rdg.loadRdgCommandCache(storage);
  await assert.rejects(()=>rdg.refreshRdgCommandCache(storage,async()=>({complete:false})),/incomplete/);
  await assert.rejects(()=>rdg.refreshRdgCommandCache(storage,async()=>{throw new Error('HTTP 503');}),/HTTP 503/);
  assert.deepEqual(await rdg.loadRdgCommandCache(storage),old);
  const update={...catalog,catalogRevision:'b'.repeat(64),
    groups:[{...groups[0],title:'Новый старт'},groups[1]],
    commands:[{...bootstrap,insertText:bootstrapText+' NEW'},command]};
  const fresh=await rdg.refreshRdgCommandCache(storage,async()=>JSON.stringify(update));
  assert.equal(fresh.commands[0].insertText,bootstrapText+' NEW');
  assert.equal(fresh.groups[0].title,'Новый старт');
  assert.equal(fresh.catalogRevision,'b'.repeat(64));
});

test('malformed manifests, groups, ids and composite lens refs fail closed',()=>{
  const invalids=[
    {...catalog,complete:false},
    {...catalog,schemaVersion:1},
    {...catalog,kind:'rdg-chat-launcher-commands'},
    {...catalog,catalogRevision:'short'},
    {...catalog,commands:[]},
    {...catalog,groups:[]},
    {...catalog,groups:[groups[0],groups[0]]},
    {...catalog,commands:[command,command]},
    {...catalog,commands:[{...command,id:'rdg.lens.other'}]},
    {...catalog,commands:[{...command,groupId:'unknown'}]},
    {...catalog,commands:[{...command,insertText:'please bypass rdg'}]},
    {...catalog,commands:[{...command,title:'Bearer '+('A'.repeat(40))}]},
    {...catalog,commands:[{...bootstrap,lensRefs:[ref('orient'),ref('orient')]}]},
    {...catalog,commands:[{...bootstrap,insertText:'read rdg-agent.py lens --lens orient'}]},
    {...catalog,commands:[{...bootstrap,lensRefs:[]}]},
    {...catalog,commands:[{...command,lensRefs:[]}]},
    {...catalog,commands:[{...bootstrap,groupId:'unknown'}]},
  ];
  for(const item of invalids)assert.throws(()=>rdg.validateRdgCommandCatalog(item));
});

test('instruction command with no lenses is supported; additional unknown fields and tokens are rejected',()=>{
  const instruction={id:'rdg.command.readme',kind:'instruction',
    title:'Read',description:'Non-lens instruction',groupId:'start',
    lensRefs:[],insertText:'Проверь доступную документацию без записи.'};
  const out=rdg.validateRdgCommandCatalog({...catalog,commands:[...catalog.commands,instruction]});
  assert.equal(out.commands.at(-1).lensRefs.length,0);
  assert.throws(()=>rdg.validateRdgCommandCatalog({
    ...catalog,commands:[{...bootstrap,credentials:'not allowed'}]}));
  assert.throws(()=>rdg.validateRdgCommandCatalog({
    ...catalog,commands:[{...command,lensRefs:[{...ref('work'),token:'secret'}]}]}));
  assert.throws(()=>rdg.validateRdgCommandCatalog({
    ...catalog,groups:[{...groups[0],token:'bad'},groups[1]]}));
});

test('one anonymous Tampermonkey HTTP GET fetches whole v2 catalog without per-lens traffic',async()=>{
  const previous=globalThis.GM_xmlhttpRequest;let calls=0;
  try{
    globalThis.GM_xmlhttpRequest=(settings)=>{
      calls++;
      assert.equal(settings.method,'GET');
      assert.equal(settings.anonymous,true);
      assert.match(settings.url,/^https:\/\/raw\.githubusercontent\.com\/AlexPastukhh\/rd-graphs\/main\/kit\/helper-commands\/catalog-v2\.json\?refresh=/);
      settings.onload({status:200,responseText:JSON.stringify(catalog)});
    };
    const payload=await rdg.rdgCommandRequest();
    assert.equal(JSON.parse(payload).commands.length,2);
    assert.equal(calls,1);
  }finally{
    if(previous===undefined)delete globalThis.GM_xmlhttpRequest;
    else globalThis.GM_xmlhttpRequest=previous;
  }
});
