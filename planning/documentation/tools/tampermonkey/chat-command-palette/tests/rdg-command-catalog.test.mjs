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

test('the browser session reports an HTTP failure without exposing free-form response text',async()=>{
  const storage=memory();
  let worker,closed=false;
  await assert.rejects(()=>rdg.rdgCommandRequest({
    storage,requestId,openTab:url=>{
      worker=rdg.serveRdgCatalogRequest({
        url:rdg.RDG_BROWSER_ORIGIN+'/session/'+session+'/'+new URL(url).hash,storage,
        fetchCatalog:async()=>({ok:false,status:401,json:async()=>({error:'free-form internal response'})})
      });
      return {close:()=>{closed=true;}};
    }
  }),/HTTP 401/);
  await worker;
  assert.equal(closed,true);
  assert.equal(storage.size(),0);
});

test('an editor request uses the authenticated catalog transaction and verifies its receipt and readback',async()=>{
  const storage=memory();
  const steps=[{op:'group_edit',id:'lenses',changes:{title:'New title'}}];
  const transactionId='e7ea6eae-128e-49bf-8d07-36c07d877a8c';
  const binding={sha256:'test-binding'};
  const revised={...catalog,revision:3,groups:[{...groups[0],title:'New title'}]};
  const seen=[];
  let worker;
  const result=await rdg.rdgCommandRequest({
    storage,requestId,mutation:{namespaceId,revision:2,steps},
    openTab:url=>{
      worker=rdg.serveRdgCatalogRequest({
        url:rdg.RDG_BROWSER_ORIGIN+'/session/'+session+'/'+new URL(url).hash,storage,
        fetchCatalog:async(address,options)=>{
          assert.equal(address,rdg.RDG_BROWSER_ORIGIN+'/session/'+session+'/command');
          const message=JSON.parse(options.body);
          seen.push(message);
          let value;
          switch(message.method){
            case 'chat_catalog':value=seen.length===1?catalog:revised;break;
            case 'schema':value={request:{op:'chat_catalog_edit',expectedCatalogRevision:2,transactionId,note:'',steps:[]}};break;
            case 'preflight':value={accepted:false,inputBinding:binding};break;
            case 'apply':value={published:true};break;
            case 'receipt':value={published:true,participants:[{owner:{kind:'chatCommandCatalog'}}]};break;
            default:assert.fail('unexpected RDG operation '+message.method);
          }
          return {ok:true,json:async()=>value};
        }
      });
      return {close(){}};
    }
  });
  await worker;
  assert.deepEqual(seen.map(r=>r.method),['chat_catalog','schema','preflight','apply','receipt','chat_catalog']);
  assert.deepEqual(seen[1],{method:'schema',op:'chat_catalog_edit'});
  assert.deepEqual(seen[2].request.steps,steps);
  assert.deepEqual(seen[3],{method:'apply',request:seen[2].request,expectedInputBinding:binding});
  assert.deepEqual(seen[4],{method:'receipt',transactionId});
  assert.deepEqual(result,revised);
});

test('stale catalog editors stop at read and arbitrary operations never reach the RDG tab',async()=>{
  const storage=memory();
  const steps=[{op:'group_edit',id:'lenses',changes:{title:'New title'}}];
  const seen=[];
  let worker;
  await assert.rejects(rdg.rdgCommandRequest({
    storage,requestId,mutation:{namespaceId,revision:1,steps},
    openTab:url=>{
      worker=rdg.serveRdgCatalogRequest({
        url:rdg.RDG_BROWSER_ORIGIN+'/session/'+session+'/'+new URL(url).hash,storage,
        fetchCatalog:async(_address,options)=>{
          seen.push(JSON.parse(options.body).method);
          return {ok:true,json:async()=>catalog};
        }
      });
      return {close(){}};
    }
  }),/изменился/);
  await worker;
  assert.deepEqual(seen,['chat_catalog']);
  await assert.rejects(rdg.rdgCommandRequest({
    storage,requestId,mutation:{namespaceId,revision:2,steps:[{op:'lock_remove'}]},
    openTab:()=>assert.fail('unexpected authenticated tab')
  }),/Некорректный/);
  assert.equal(storage.size(),0);
});

test('an editor request removed during preflight cannot apply afterwards',async()=>{
  const storage=memory();
  const messages=[];
  let worker;
  const transactionId='e7ea6eae-128e-49bf-8d07-36c07d877a8c';
  await assert.rejects(rdg.rdgCommandRequest({
    storage,requestId,timeoutMs:45,mutation:{namespaceId,revision:2,
      steps:[{op:'group_edit',id:'lenses',changes:{title:'Expired change'}}]},
    openTab:url=>{
      worker=rdg.serveRdgCatalogRequest({
        url:rdg.RDG_BROWSER_ORIGIN+'/session/'+session+'/'+new URL(url).hash,storage,
        fetchCatalog:async(_address,options)=>{
          const message=JSON.parse(options.body);
          messages.push(message.method);
          let value;
          if(message.method==='chat_catalog')value=catalog;
          else if(message.method==='schema')value={request:{op:'chat_catalog_edit',expectedCatalogRevision:2,transactionId}};
          else if(message.method==='preflight'){
            await storage.remove(rdg.RDG_COMMAND_CACHE_KEY+':request:'+requestId);
            value={accepted:false,inputBinding:{sha256:'fixture'}};
          }else assert.fail('late apply is forbidden');
          return {ok:true,json:async()=>value};
        }
      });
      return {close(){}};
    }
  }),/Ответ на запись RDG не получен/);
  await worker;
  assert.deepEqual(messages,['chat_catalog','schema','preflight']);
  assert.equal(storage.size(),0);
});
