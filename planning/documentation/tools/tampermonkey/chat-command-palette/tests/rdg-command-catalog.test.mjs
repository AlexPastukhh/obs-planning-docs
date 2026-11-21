import test from 'node:test';
import assert from 'node:assert/strict';
import rdg from '../src/rdg-command-catalog.js';

const namespaceId='8a77ddd6-df99-4f77-8af9-e60735327db4';
const requestId='460a0e01-511f-44d8-9606-d0ac38fc81bc';
const session='S'.repeat(43);
const groups=[{id:'lenses',title:'Структурированные линзы',description:'Подбор линз'}];
const ref={role:'lens',lensKey:'work',modelProfile:'rdg-decision-v1'};
const command={id:'rdg.lens.work',kind:'lens-launcher',title:'Work',
  description:'СТРУКТУРИРОВАННАЯ ЛИНЗА · Провести работу от постановки до результата.',
  groupId:'lenses',lensRefs:[ref],insertText:'Команда RDG с текущим текстом.\n\nВторая строка.  '};
const catalog={schemaVersion:1,namespaceId,complete:true,revision:2,groups,commands:[command]};

function memory(){
  const entries=new Map(), listeners=new Map();
  return {
    get:async key=>structuredClone(entries.get(key)??null),
    set:async(key,value)=>{
      entries.set(key,structuredClone(value));
      listeners.get(key)?.(structuredClone(value));
    },
    remove:async key=>entries.delete(key),
    listen:(key,notify)=>{
      listeners.set(key,notify);
      return ()=>listeners.delete(key);
    },
    size:()=>entries.size
  };
}

test('refresh reads through the authenticated RDG tab and caches the complete response',async()=>{
  const storage=memory();
  let calls=0,closed=false,worker;
  const result=await rdg.refreshRdgCommandCache(storage,()=>rdg.rdgCommandRequest({
    storage,requestId,
    openTab:url=>{
      assert.equal(url,rdg.RDG_BROWSER_ORIGIN+'/#obs-helper-catalog='+requestId);
      worker=rdg.serveRdgCatalogRequest({
        url:rdg.RDG_BROWSER_ORIGIN+'/session/'+session+'/'+new URL(url).hash, storage,
        fetchCatalog:async(address,options)=>{
          calls++;
          assert.equal(address,rdg.RDG_BROWSER_ORIGIN+'/session/'+session+'/command');
          assert.equal(options.method,'POST');
          assert.equal(options.credentials,'same-origin');
          assert.equal(options.redirect,'error');
          assert.deepEqual(options.headers,{'Content-Type':'application/json','X-RDG-Session':session});
          assert.deepEqual(JSON.parse(options.body),{method:'chat_catalog'});
          return {ok:true,json:async()=>catalog};
        }
      });
      return {close:()=>{closed=true;}};
    }
  }));
  await worker;
  assert.equal(calls,1);
  assert.equal(closed,true);
  assert.equal(storage.size(),1);
  assert.equal(result.revision,2);
  assert.equal(result.commands[0].insertText,command.insertText);
  assert.equal(result.commands[0].description,command.description);
  assert.deepEqual(await rdg.loadRdgCommandCache(storage),result);
});

test('startup uses its own live cache key and ignores the previous public snapshot',async()=>{
  const storage=memory();
  const oldKey='obsPlanningHelper:v2:rdgCommandCatalog';
  await storage.set(oldKey,{catalogRevision:'public snapshot'});
  assert.equal(await rdg.loadRdgCommandCache(storage),null);
  await rdg.refreshRdgCommandCache(storage,async()=>catalog);
  assert.equal((await rdg.loadRdgCommandCache(storage)).revision,2);
  assert.deepEqual(await storage.get(oldKey),{catalogRevision:'public snapshot'});
});

test('offline, partial and stale responses preserve the last live cache',async()=>{
  const storage=memory();
  const before=await rdg.refreshRdgCommandCache(storage,async()=>catalog);
  await assert.rejects(()=>rdg.refreshRdgCommandCache(storage,async()=>({complete:false})),/неполный/);
  await assert.rejects(()=>rdg.refreshRdgCommandCache(storage,async()=>{throw new Error('HTTP 503');}),/HTTP 503/);
  assert.deepEqual(await rdg.refreshRdgCommandCache(storage,async()=>({...catalog,revision:1})),before);
  assert.deepEqual(await rdg.loadRdgCommandCache(storage),before);
  const changed={...catalog,revision:3,groups:[{...groups[0],title:'Новый заголовок'}],
    commands:[{...command,description:'Новый текст карточки',insertText:'Новый текст команды'}]};
  const updated=await rdg.refreshRdgCommandCache(storage,async()=>changed);
  assert.equal(updated.groups[0].title,'Новый заголовок');
  assert.equal(updated.commands[0].description,'Новый текст карточки');
  assert.deepEqual(await rdg.loadRdgCommandCache(storage),updated);
});

test('valid server catalogs can be empty or include commands without a group',()=>{
  assert.deepEqual(rdg.validateRdgCommandCatalog({...catalog,revision:0,groups:[],commands:[]}).commands,[]);
  const instruction={id:'rdg.command.readme',kind:'instruction',title:'Read',description:'Context\nMore',
    groupId:null,lensRefs:[],insertText:'Проверь документацию.'};
  assert.deepEqual(rdg.validateRdgCommandCatalog({...catalog,groups:[],commands:[instruction]}).commands,[instruction]);
});

test('invalid catalogs fail validation before a cache update',()=>{
  for(const invalid of [
    {...catalog,kind:'rdg-chat-commands'},
    {...catalog,complete:false},
    {...catalog,schemaVersion:2},
    {...catalog,namespaceId:'unknown'},
    {...catalog,revision:-1},
    {...catalog,revision:0},
    {...catalog,groups:[groups[0],groups[0]]},
    {...catalog,groups:[{...groups[0],id:'all'}]},
    {...catalog,commands:[command,command]},
    {...catalog,commands:[{...command,id:'rdg.lens.other'}]},
    {...catalog,commands:[{...command,groupId:'unknown'}]},
    {...catalog,commands:[{...command,title:'Bearer '+('A'.repeat(40))}]},
    {...catalog,commands:[{...command,lensRefs:[ref,ref]}]},
    {...catalog,commands:[{...command,lensRefs:[{...ref,token:'secret'}]}]},
    {...catalog,commands:[{...command,id:'rdg.command.multi',kind:'workflow',lensRefs:[]}]}
  ])assert.throws(()=>rdg.validateRdgCommandCatalog(invalid));
});

test('the RDG tab ignores other origins, unrelated pages and absent requests',async()=>{
  const storage=memory();
  const fetchCatalog=()=>assert.fail('unrequested fetch');
  const fragment='#obs-helper-catalog='+requestId;
  for(const url of [
    'https://example.com/session/'+session+'/'+fragment,
    'http://localhost:18881/session/'+session+'/'+fragment,
    rdg.RDG_BROWSER_ORIGIN+'/session/'+session+'/',
    rdg.RDG_BROWSER_ORIGIN+'/session/'+session+'/'+fragment,
    rdg.RDG_BROWSER_ORIGIN+'/wrong/'+fragment
  ])await rdg.serveRdgCatalogRequest({url,storage,fetchCatalog});
  assert.equal(storage.size(),0);
});

test('missing session reports a timeout and clears the temporary request',async()=>{
  const storage=memory();
  await assert.rejects(()=>rdg.rdgCommandRequest({
    storage,requestId,timeoutMs:10,openTab:()=>({close:()=>assert.fail('keep the login tab available')})
  }),/Войдите/);
  assert.equal(storage.size(),0);
});

test('the browser session reports an HTTP failure without returning its body',async()=>{
  const storage=memory();
  let worker,closed=false;
  await assert.rejects(()=>rdg.rdgCommandRequest({
    storage,requestId,openTab:url=>{
      worker=rdg.serveRdgCatalogRequest({
        url:rdg.RDG_BROWSER_ORIGIN+'/session/'+session+'/'+new URL(url).hash,storage,
        fetchCatalog:async()=>({ok:false,status:401,json:()=>assert.fail('do not expose failure body')})
      });
      return {close:()=>{closed=true;}};
    }
  }),/HTTP 401/);
  await worker;
  assert.equal(closed,true);
  assert.equal(storage.size(),0);
});
