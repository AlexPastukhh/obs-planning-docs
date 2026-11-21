import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {JSDOM} from 'jsdom';
const require=createRequire(import.meta.url);
const {createPlanningHelperUi}=require('../src/planning-helper-ui.js');
const {normalizeCatalogOrder,createItemGroupInOrder,renameItemGroupInOrder,deleteItemGroupInOrder,
  assignItemGroupInOrder,moveItemGroupInOrder,renderCatalogOrder,parseCatalogOrder}=require('../src/repository-catalog-service.js');
const ref=key=>({role:'lens',lensKey:key,modelProfile:'rdg-decision-v1'});
const text='Примени RDG work. python3 -B tools/rdg-agent.py lens --lens work --model-profile rdg-decision-v1';
const bootstrapText='Начни RDG с orient и work. rdg-agent.py lens --lens orient; rdg-agent.py lens --lens work';
const command={id:'rdg.lens.work',kind:'lens-launcher',title:'Work',description:'RDG Work',
  groupId:'lenses',lensRefs:[ref('work')],insertText:text};
const bootstrap={id:'rdg.command.bootstrap',kind:'workflow',title:'Bootstrap',description:'Начать работу',
  groupId:'start',lensRefs:[ref('orient'),ref('work')],insertText:bootstrapText};
const groups=[{id:'start',title:'Начало работы',description:'Вход в работу'},
  {id:'lenses',title:'Линзы',description:'Адресные методики'}];
const cache={catalogRevision:'a'.repeat(64),savedAt:'2026-11-18T02:00:00Z',groups,
  commands:[bootstrap,command]};
const flush=()=>new Promise(resolve=>setTimeout(resolve,0));

test('RDG Commands UI groups bootstrap and lenses like Prompts; exact insert, search, refresh and legacy remain independent',async()=>{
  const dom=new JSDOM('<!doctype html><html><body></body></html>',{
    url:'https://chatgpt.com/c/rdg-test',pretendToBeVisual:true
  });
  const globals=['window','document','localStorage','MutationObserver','HTMLElement','Element','Node','Event'];
  const prior=globals.map(key=>[key,Object.getOwnPropertyDescriptor(globalThis,key)]);
  for(const key of globals)Object.defineProperty(globalThis,key,{
    configurable:true,writable:true,value:key==='window'?dom.window:dom.window[key]
  });
  let ui;
  const previousConfirm=globalThis.confirm;
  globalThis.confirm=()=>true;
  try{
    let loads=0,refreshes=0;
    const insertions=[],copies=[];
    let order=normalizeCatalogOrder({promptGroups:[{id:'personal',label:'Personal',items:['prompt-one']}]});
    const operations={create:createItemGroupInOrder,rename:renameItemGroupInOrder,
      remove:deleteItemGroupInOrder,assign:assignItemGroupInOrder,move:moveItemGroupInOrder};
    const editGroups=async(defaults,operation,...args)=>{
      const base=order.rdgGroups===undefined?{...order,rdgGroups:defaults}:order;
      order=parseCatalogOrder(renderCatalogOrder(operations[operation](base,...args,'rdgGroups')));
      return{catalogOrder:order};
    };
    ui=createPlanningHelperUi({
      surfaces:{RDG_COMMANDS:'Команды',COMMANDS:'Commands',SCENARIOS:'Scenarios',PROMPTS:'Prompts'},
      commandEntries:[{id:'legacy',label:'Existing Planning Command',text:'legacy body'}],
      onLoadRdgCommands:async()=>{loads++;return cache;},
      catalogOrder:order,
      onEditRdgGroups:editGroups,
      onRefreshRdgCommands:async()=>{refreshes++;
        return {...cache,catalogRevision:'b'.repeat(64),groups:[{...groups[0],title:'Старт'},groups[1]]};
      },
      onInsertRdgCommand:async(value)=>{insertions.push(value);return 'RDG text inserted';},
      onCopyPlain:async(value)=>{copies.push(value);return true;},
    });
    ui.setOpen(true);await flush();await flush();
    const root=ui.root;
    assert.equal(loads,1);
    assert.equal(root.querySelector('[data-surface="Команды"]')?.getAttribute('aria-selected'),'true');
    assert.equal(root.querySelectorAll('.rdg-command-group').length,2);
    assert.equal(root.querySelector('[data-rdg-group="start"] .rdg-group-title').textContent,'Начало работы · 1');
    assert.equal(root.querySelector('[data-rdg-group="lenses"] .rdg-group-title').textContent,'Линзы · 1');
    assert.equal(root.querySelectorAll('.row[data-entry-id]').length,2);
    assert.match(root.querySelector('.non-command-body').textContent,/2 · кэш от/);
    assert.equal(root.querySelectorAll('.rdg-group-chip').length,3);
    root.querySelector('[data-entry-id="rdg.command.bootstrap"] .run-action').click();
    await flush();assert.deepEqual(insertions,[bootstrapText]);
    root.querySelector('[data-entry-id="rdg.lens.work"] .copy').click();
    await flush();assert.deepEqual(copies,[text]);

    root.querySelector('.rdg-group-chip[data-rdg-group="lenses"]').click();
    assert.equal(root.querySelectorAll('.row[data-entry-id]').length,1);
    assert.equal(root.querySelectorAll('.row[data-entry-id="rdg.command.bootstrap"]').length,0);
    root.querySelector('.rdg-group-chip[data-rdg-group="all"]').click();
    const search=root.querySelector('.search');
    search.value='absent';search.dispatchEvent(new dom.window.Event('input',{bubbles:true}));
    assert.equal(root.querySelectorAll('.row[data-entry-id]').length,0);
    search.value='orient';search.dispatchEvent(new dom.window.Event('input',{bubbles:true}));
    assert.equal(root.querySelectorAll('.row[data-entry-id="rdg.command.bootstrap"]').length,1);
    search.value='';search.dispatchEvent(new dom.window.Event('input',{bubbles:true}));
    root.querySelector('.rdg-refresh').click();await flush();await flush();
    assert.equal(refreshes,1);
    assert.match(root.querySelector('.non-command-body').textContent,/bbbbbbbbbbbb/);
    assert.equal(root.querySelector('[data-rdg-group="start"] .rdg-group-title').textContent,'Старт · 1');

    root.querySelector('.legacy-commands').click();
    assert.equal(root.querySelector('.legacy-commands').textContent,'← Команды');
    assert.equal(root.querySelector('.rdg-refresh').style.display,'none');
    root.querySelector('.legacy-commands').click();
    assert.equal(root.querySelector('.legacy-commands').textContent,'Planning Commands');
    assert.equal(root.querySelector('.rdg-refresh').style.display,'inline-block');
    assert.equal(loads,1);
    assert.equal(refreshes,1);

    const click=text=>{
      const control=[...root.querySelectorAll('button')].find(button=>button.textContent===text);
      assert(control,text);control.click();
    };
    const manage=()=>click('Управлять группами');
    manage();
    root.querySelector('[aria-label="Название новой группы RDG"]').value='Черновики';
    click('Создать группу');await flush();
    const created=order.rdgGroups.find(group=>group.label==='Черновики');
    assert(created);
    assert.equal(root.querySelector(`.rdg-group-chip[data-rdg-group="${created.id}"] small`).textContent,'0');
    root.querySelector('[data-entry-id="rdg.lens.work"] .prompt-group-pick').click();
    root.querySelector('[aria-label="Группа команды RDG"]').value=created.id;
    click('Переместить');await flush();
    assert.deepEqual(order.rdgGroups.find(group=>group.id===created.id).items,[command.id]);
    manage();
    const createdRow=()=>root.querySelector(`[data-rdg-edit-group="${created.id}"]`);
    createdRow().querySelector('input').value='Свои линзы';
    createdRow().querySelector('button').click();await flush();
    manage();
    createdRow().querySelector('[aria-label="Переместить группу вверх"]').click();await flush();
    assert.deepEqual(order.rdgGroups.map(group=>group.label),['Старт','Свои линзы','Линзы']);
    root.querySelector('.rdg-refresh').click();await flush();await flush();
    assert.equal(root.querySelector(`.rdg-group-chip[data-rdg-group="${created.id}"] small`).textContent,'1');
    manage();
    [...createdRow().querySelectorAll('button')].find(button=>button.textContent==='Удалить').click();await flush();
    root.querySelector('.rdg-group-chip[data-rdg-group="ungrouped"]').click();
    assert.deepEqual([...root.querySelectorAll('.row[data-entry-id]')].map(row=>row.dataset.entryId),[command.id]);
    assert.equal(order.rdgGroups.some(group=>group.items.includes(command.id)),false);
    assert.equal(order.promptGroups[0].items[0],'prompt-one');
    assert.equal(root.querySelector('.save-all').style.display,'');
  }finally{
    if(previousConfirm===undefined)delete globalThis.confirm;
    else globalThis.confirm=previousConfirm;
    ui?.dispose();
    for(const [key,descriptor] of prior){
      if(descriptor)Object.defineProperty(globalThis,key,descriptor);
      else delete globalThis[key];
    }
    dom.window.close();
  }
});
