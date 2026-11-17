import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {JSDOM} from 'jsdom';
const require=createRequire(import.meta.url);
const {createPlanningHelperUi}=require('../src/planning-helper-ui.js');
const text='Примени линзу RDG work. python3 -B tools/rdg-agent.py lens --lens work --model-profile rdg-decision-v1';
const command={id:'rdg.lens.work',kind:'lens-launcher',title:'Work',description:'RDG Work',lensRef:{role:'lens',lensKey:'work',modelProfile:'rdg-decision-v1'},insertText:text};
const cache={catalogRevision:'a'.repeat(64),savedAt:'2026-11-17T02:00:00Z',commands:[command]};
const flush=()=>new Promise(resolve=>setTimeout(resolve,0));

test('RDG command UI renders cached entries, searches, refreshes, inserts exact text and preserves Planning Commands',async()=>{
  const dom=new JSDOM('<!doctype html><html><body></body></html>',{url:'https://chatgpt.com/c/rdg-test',pretendToBeVisual:true});
  const globals=['window','document','localStorage','MutationObserver','HTMLElement','Element','Node','Event'];
  const prior=globals.map(key=>[key,Object.getOwnPropertyDescriptor(globalThis,key)]);
  for(const key of globals)Object.defineProperty(globalThis,key,{configurable:true,writable:true,value:key==='window'?dom.window:dom.window[key]});
  let ui;
  try{
    let loads=0,refreshes=0;const insertions=[],copies=[];
    ui=createPlanningHelperUi({
      surfaces:{LENSES:'Линзы',COMMANDS:'Commands',SCENARIOS:'Scenarios',PROMPTS:'Prompts'},
      commandEntries:[{id:'legacy',label:'Existing Planning Command',text:'legacy body'}],
      onLoadRdgCommands:async()=>{loads++;return cache;},
      onRefreshRdgCommands:async()=>{refreshes++;return {...cache,catalogRevision:'b'.repeat(64),commands:[command]};},
      onInsertRdgCommand:async(value)=>{insertions.push(value);return 'RDG text inserted';},
      onCopyPlain:async(value)=>{copies.push(value);return true;},
    });
    ui.setOpen(true);
    await flush();await flush();
    const root=ui.root;
    assert.equal(loads,1);
    assert.equal(root.querySelector('[data-surface="Линзы"]')?.getAttribute('aria-selected'),'true');
    assert.equal(root.querySelectorAll('.row[data-entry-id="rdg.lens.work"]').length,1);
    assert.match(root.querySelector('.non-command-body').textContent,/1 · кэш от/);
    root.querySelector('[data-entry-id="rdg.lens.work"] .run-action').click();
    await flush();
    assert.deepEqual(insertions,[text]);
    root.querySelector('[data-entry-id="rdg.lens.work"] .copy').click();
    await flush();
    assert.deepEqual(copies,[text]);
    const search=root.querySelector('.search');
    search.value='absent';search.dispatchEvent(new dom.window.Event('input',{bubbles:true}));
    assert.equal(root.querySelectorAll('.row[data-entry-id]').length,0);
    search.value='work';search.dispatchEvent(new dom.window.Event('input',{bubbles:true}));
    assert.equal(root.querySelectorAll('.row[data-entry-id]').length,1);
    root.querySelector('.rdg-refresh').click();await flush();await flush();
    assert.equal(refreshes,1);
    assert.match(root.querySelector('.non-command-body').textContent,/bbbbbbbbbbbb/);
    root.querySelector('.legacy-commands').click();
    assert.equal(root.querySelector('.legacy-commands').textContent,'← Линзы');
    assert.equal(root.querySelector('.rdg-refresh').style.display,'none');
    root.querySelector('.legacy-commands').click();
    assert.equal(root.querySelector('.legacy-commands').textContent,'Planning Commands');
    assert.equal(root.querySelector('.rdg-refresh').style.display,'inline-block');
    assert.equal(loads,1);
    assert.equal(refreshes,1);
  }finally{
    ui?.dispose();
    for(const [key,descriptor] of prior){
      if(descriptor)Object.defineProperty(globalThis,key,descriptor);
      else delete globalThis[key];
    }
    dom.window.close();
  }
});
