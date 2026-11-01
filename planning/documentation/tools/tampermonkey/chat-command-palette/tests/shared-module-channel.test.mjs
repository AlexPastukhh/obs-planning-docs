import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require=createRequire(import.meta.url);
const {createHelperModuleChannel,projectModules,SHARED_MODULE_CHANNEL}=
  require('../src/shared-module-channel.js');

class Channel {
  static instances=new Set();
  constructor(name){this.name=name;this.closed=false;Channel.instances.add(this);}
  addEventListener(kind,fn){if(kind==='message')this.onmessage=fn;}
  postMessage(data){
    for(const instance of Channel.instances)
      if(instance!==this&&!instance.closed&&instance.name===this.name)
        instance.onmessage?.({data:structuredClone(data)});
  }
  close(){this.closed=true;Channel.instances.delete(this);}
}
function snapshot(text,sha=''){
  return {helperItems:[{
    item:{schemaVersion:1,kind:'module',id:'helper.shared',
      title:'Shared',text,updatedAt:'2026-10-19T00:00:00.000Z'},
    repositoryKnown:Boolean(sha),repositorySha:sha
  },{item:{kind:'prompt',id:'not-a-module',title:'Prompt',text:'Not shared'}},
  {item:{kind:'command',id:'not-a-module',title:'Command',text:'Never share'}}]};
}
test('Helper GM snapshot is the one source; notifier has request/read-only projection',async()=>{
  Channel.instances.clear();
  let actual=snapshot('Первый текст');
  let reads=0;
  const helper=createHelperModuleChannel({
    readSnapshot:async()=>{reads++;return actual;},Channel
  });
  const receiver=new Channel(SHARED_MODULE_CHANNEL);
  const received=[];
  receiver.onmessage=e=>{if(e.data.type==='catalog')received.push(e.data.modules);};
  receiver.postMessage({protocol:SHARED_MODULE_CHANNEL,type:'request'});
  await new Promise(resolve=>setImmediate(resolve));
  assert.equal(received.length,1);
  assert.deepEqual(received[0].map(m=>m.id),['helper.shared']);
  assert.equal(received[0][0].text,'Первый текст');
  // simulate regular local Helper edit, then a GitHub Sync missing / Reload save
  actual=snapshot('После изменения в Helper');
  await helper.publish();
  assert.equal(received.at(-1)[0].text,'После изменения в Helper');
  actual=snapshot('После GitHub Sync missing','verified-sha');
  await helper.publish();
  assert.equal(received.at(-1)[0].text,'После GitHub Sync missing');
  assert.ok(reads>=3);
  assert.ok(!JSON.stringify(received).includes('verified-sha')); // no GitHub token/metadata
  assert.ok(received.every(entries=>entries.length===1));
  receiver.close();helper.close();
});

test('helper never publishes an unreadable or oversized module catalog',async()=>{
  Channel.instances.clear();
  let current={helperItems:Array.from({length:2001},(_,i)=>({
    item:{kind:'module',id:'m'+i,title:'large',text:'sample'}
  }))};
  const helper=createHelperModuleChannel({
    readSnapshot:async()=>current,Channel});
  const receiver=new Channel(SHARED_MODULE_CHANNEL);
  const packets=[];
  receiver.onmessage=e=>packets.push(e.data);
  await helper.publish();
  assert.equal(packets.length,0);
  current=snapshot('fixed');
  await helper.publish();
  assert.equal(packets.length,1);
  receiver.close();helper.close();
});

test('request cannot mutate Helper snapshot or invoke GitHub actions',async()=>{
  Channel.instances.clear();
  const state=snapshot('original');
  const helper=createHelperModuleChannel({readSnapshot:async()=>state,Channel});
  const receiver=new Channel(SHARED_MODULE_CHANNEL);
  receiver.postMessage({protocol:SHARED_MODULE_CHANNEL,type:'upsert',
    modules:[{id:'helper.shared',text:'malicious update'}]});
  await new Promise(resolve=>setImmediate(resolve));
  assert.equal(state.helperItems[0].item.text,'original');
  receiver.close();helper.close();
});


test('prompt projection is additive; legacy module fields stay exact and command/auth fields stay private',async()=>{
  Channel.instances.clear();
  const state=snapshot('Module body');
  state.helperItems[1].item.text='Prompt [[module:helper.shared]]';
  state.helperItems[1].secret='must-not-leak';
  const helper=createHelperModuleChannel({readSnapshot:async()=>state,Channel});
  const receiver=new Channel(SHARED_MODULE_CHANNEL),packets=[];
  receiver.onmessage=e=>packets.push(e.data);
  await helper.publish();
  const packet=packets[0];
  assert.deepEqual(packet.modules,projectModules(state));
  assert.deepEqual(packet.prompts,[{id:'not-a-module',title:'Prompt',text:'Prompt [[module:helper.shared]]',updatedAt:''}]);
  assert.doesNotMatch(JSON.stringify(packet),/must-not-leak|Never share/);
  helper.close();receiver.close();
});

test('oversized prompt projection is rejected without sending partial module-only success',async()=>{
  Channel.instances.clear();
  const state=snapshot('Module body');state.helperItems[1].item.text='x'.repeat(100001);
  const helper=createHelperModuleChannel({readSnapshot:async()=>state,Channel});
  const receiver=new Channel(SHARED_MODULE_CHANNEL),packets=[];
  receiver.onmessage=e=>packets.push(e.data);
  await helper.publish();assert.equal(packets.length,0);
  state.helperItems[1].item.text='fixed';await helper.publish();assert.equal(packets.length,1);
  helper.close();receiver.close();
});
