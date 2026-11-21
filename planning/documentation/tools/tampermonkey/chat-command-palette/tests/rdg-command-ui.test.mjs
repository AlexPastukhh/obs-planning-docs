import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {JSDOM} from 'jsdom';
const require=createRequire(import.meta.url);
const {createPlanningHelperUi}=require('../src/planning-helper-ui.js');
const ref=key=>({role:'lens',lensKey:key,modelProfile:'rdg-decision-v1'});
const text='Примени RDG work. python3 -B tools/rdg-agent.py lens --lens work --model-profile rdg-decision-v1';
const bootstrapText='Начни RDG с orient и work. rdg-agent.py lens --lens orient; rdg-agent.py lens --lens work';
const command={id:'rdg.lens.work',kind:'lens-launcher',title:'Work',description:'RDG Work',
  groupId:'lenses',lensRefs:[ref('work')],insertText:text};
const bootstrap={id:'rdg.command.bootstrap',kind:'workflow',title:'Bootstrap',description:'Начать работу',
  groupId:'start',lensRefs:[ref('orient'),ref('work')],insertText:bootstrapText};
const groups=[{id:'start',title:'Начало работы',description:'Вход в работу'},
  {id:'lenses',title:'Линзы',description:'Адресные методики'}];
const cache={revision:1,savedAt:'2026-11-18T02:00:00Z',groups,
  commands:[bootstrap,command]};
const flush=()=>new Promise(resolve=>setTimeout(resolve,0));

test('RDG Commands UI groups bootstrap and lenses like Prompts; exact insert, search, refresh and legacy remain independent',async()=>{
  const dom=new JSDOM('<!doctype html><html><body></body></html>',{
    url:'https://chatgpt.com/c/rdg-test',pretendToBeVisual:true
  });
  const globals=['window','document','localStorage','MutationObserver','HTMLElement','Element','Node','Event','confirm'];
  const prior=globals.map(key=>[key,Object.getOwnPropertyDescriptor(globalThis,key)]);
  for(const key of globals)Object.defineProperty(globalThis,key,{
    configurable:true,writable:true,value:key==='window'?dom.window:key==='confirm'?()=>true:dom.window[key]
  });
  let ui;
  try{
    let loads=0,refreshes=0;
    const insertions=[],copies=[],edits=[];
    ui=createPlanningHelperUi({
      surfaces:{RDG_COMMANDS:'Команды',COMMANDS:'Commands',SCENARIOS:'Scenarios',PROMPTS:'Prompts'},
      commandEntries:[{id:'legacy',label:'Existing Planning Command',text:'legacy body'}],
      onLoadRdgCommands:async()=>{loads++;return cache;},
      onRefreshRdgCommands:async()=>{refreshes++;
        return {...cache,revision:2,groups:[{...groups[0],title:'Старт'},groups[1]],
          commands:[bootstrap,{...command,description:'СТРУКТУРИРОВАННАЯ ЛИНЗА · Проверенное превью',groupId:null}]};
      },
      onEditRdgCatalog:async(snapshot,steps)=>{
        edits.push({revision:snapshot.revision,steps});
        let groups=[...snapshot.groups],commands=[...snapshot.commands];
        for(const {op,beforeId,...fields} of steps){
          if(op==='group_create')groups.push(fields);
          if(op==='group_edit')groups=groups.map(row=>row.id===fields.id?{...row,...fields.changes}:row);
          if(op==='group_move'){
            const group=groups.find(row=>row.id===fields.id);
            groups=groups.filter(row=>row.id!==fields.id);
            groups.splice(beforeId?groups.findIndex(row=>row.id===beforeId):groups.length,0,group);
          }
          if(op==='group_delete'){
            groups=groups.filter(row=>row.id!==fields.id);
            commands=commands.map(row=>row.groupId===fields.id?{...row,groupId:null}:row);
          }
          if(op==='command_create')commands.push(fields);
          if(op==='command_edit')commands=commands.map(row=>row.id===fields.id?{...row,...fields.changes}:row);
          if(op==='command_move')commands=commands.map(row=>row.id===fields.id?{...row,groupId:fields.groupId}:row);
          if(op==='command_delete')commands=commands.filter(row=>row.id!==fields.id);
        }
        return {...snapshot,revision:snapshot.revision+1,groups,commands};
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
    assert.match(root.querySelector('.non-command-body').textContent,/версия 2/);
    assert.equal(root.querySelector('[data-rdg-group="start"] .rdg-group-title').textContent,'Старт · 1');
    root.querySelector('.rdg-group-chip[data-rdg-group="ungrouped"]').click();
    assert.equal(root.querySelector('[data-rdg-group="ungrouped"] .rdg-group-title').textContent,'Без группы · 1');
    assert.match(root.querySelector('[data-entry-id="rdg.lens.work"] .row-meta').textContent,/^СТРУКТУРИРОВАННАЯ ЛИНЗА · Проверенное превью/);

    root.querySelector('[data-entry-id="rdg.lens.work"] .rdg-edit-command').click();
    root.querySelector('[name="command-preview"]').value='Проверенное превью после записи';
    root.querySelector('.rdg-save').click();
    await flush();await flush();
    assert.deepEqual(edits[0],{revision:2,steps:[{op:'command_edit',id:'rdg.lens.work',
      changes:{description:'Проверенное превью после записи'}}]});
    assert.match(root.querySelector('[data-entry-id="rdg.lens.work"] .row-meta').textContent,/^Проверенное превью после записи/);
    root.querySelector('.rdg-manage-groups').click();
    root.querySelector('.rdg-group-create').click();
    root.querySelector('[name="group-id"]').value='review';
    root.querySelector('[name="group-title"]').value='Проверка';
    root.querySelector('[name="group-description"]').value='Юзкейсы проверки';
    root.querySelector('.rdg-save').click();
    await flush();await flush();
    assert.deepEqual(edits[1],{revision:3,steps:[{op:'group_create',id:'review',title:'Проверка',
      description:'Юзкейсы проверки',beforeId:null}]});
    assert.match(root.querySelector('.rdg-group-chip[data-rdg-group="review"]').textContent,/Проверка/);

    root.querySelector('.rdg-manage-groups').click();
    [...root.querySelectorAll('.rdg-group-edit')].at(-1).click();
    root.querySelector('[name="group-title"]').value='Проверенные юзкейсы';
    root.querySelector('[name="group-position"]').value='1';
    root.querySelector('.rdg-save').click();
    await flush();await flush();
    assert.deepEqual(edits[2].steps,[
      {op:'group_edit',id:'review',changes:{title:'Проверенные юзкейсы',description:'Юзкейсы проверки'}},
      {op:'group_move',id:'review',beforeId:'start'}
    ]);

    root.querySelector('.rdg-group-chip[data-rdg-group="review"]').click();
    root.querySelector('.rdg-new-command').click();
    root.querySelector('.rdg-save').click();
    assert.match(root.querySelector('.modal [role="alert"]').textContent,/ID должен/);
    root.querySelector('[name="command-id"]').value='assess';
    root.querySelector('[name="command-title"]').value='Оценить';
    root.querySelector('[name="command-preview"]').value='Проверить результат';
    root.querySelector('[name="command-text"]').value='Проверь результат.  ';
    root.querySelector('.rdg-save').click();
    await flush();await flush();
    assert.deepEqual(edits[3].steps,[{op:'command_create',id:'rdg.command.assess',groupId:'review',
      beforeId:null,kind:'instruction',title:'Оценить',description:'Проверить результат',lensRefs:[],
      insertText:'Проверь результат.  '}]);

    root.querySelector('[data-entry-id="rdg.command.assess"] .rdg-edit-command').click();
    const groupInput=root.querySelector('[name="command-group"]');
    groupInput.value='start';
    groupInput.dispatchEvent(new dom.window.Event('change',{bubbles:true}));
    root.querySelector('.rdg-save').click();
    await flush();await flush();
    assert.deepEqual(edits[4].steps,[{op:'command_move',id:'rdg.command.assess',groupId:'start',beforeId:null}]);
    root.querySelector('.rdg-group-chip[data-rdg-group="start"]').click();
    root.querySelector('[data-entry-id="rdg.command.assess"] .rdg-edit-command').click();
    root.querySelector('.rdg-delete').click();
    await flush();await flush();
    assert.deepEqual(edits[5].steps,[{op:'command_delete',id:'rdg.command.assess'}]);
    root.querySelector('.rdg-manage-groups').click();
    root.querySelector('.rdg-group-edit').click();
    root.querySelector('.rdg-delete').click();
    await flush();await flush();
    assert.deepEqual(edits[6].steps,[{op:'group_delete',id:'review'}]);

    root.querySelector('.legacy-commands').click();
    assert.equal(root.querySelector('.legacy-commands').textContent,'← Команды');
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
