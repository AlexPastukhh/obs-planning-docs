import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const {repositorySaveFailureMessage,favoriteEntries,commandDisplayGroups}=require('../src/planning-helper-ui.js');

test('conflict with verified different remote reports confirmed divergence',()=>{
  const message=repositorySaveFailureMessage({kind:'conflict',message:'GitHub content changed since it was read and now differs from the intended file; nothing was overwritten.',details:{remoteSha:'fresh'}});
  assert.match(message,/content changed and differs from intended local content/);
  assert.doesNotMatch(message,/current remote content could not be verified/);
});

test('conflict whose reread fails reports unknown remote relation instead of divergence',()=>{
  const message=repositorySaveFailureMessage({kind:'conflict',message:'GitHub rejected the stale write and the current remote content could not be verified; nothing was overwritten.',details:{verificationCause:new Error('read failed')}});
  assert.match(message,/write conflicted; current remote content could not be verified/);
  assert.match(message,/nothing was overwritten/);
  assert.doesNotMatch(message,/differs from intended local content/);
});


test('favorites project selected stable IDs without requiring semantic grouping',()=>{const entries=[{id:'a'},{id:'b'}];assert.deepEqual(favoriteEntries(entries,['b']).map((e)=>e.id),['b']);});


test('command cards expose Run, Body and Scenarios while optional chat binding remains explicit',async()=>{const fs=await import('node:fs');const source=fs.readFileSync(new URL('../src/planning-helper-ui.js',import.meta.url),'utf8');assert.match(source,/button\('Run'/);assert.match(source,/button\('Body'/);assert.match(source,/button\(`Scenarios \${uses\.length}`/);assert.match(source,/function openCommandBody/);assert.match(source,/function openCommandScenarios/);assert.match(source,/Bind \+ Run/);assert.match(source,/capture-chat-context/);assert.doesNotMatch(source,/highlightedCommand|highlightPlacements|autoSelectCommand/);});


test('command grouping UI exposes target group navigator and management without Primary/Advanced tiers',async()=>{const fs=await import('node:fs');const source=fs.readFileSync(new URL('../src/planning-helper-ui.js',import.meta.url),'utf8');assert.match(source,/Manage groups/);assert.match(source,/function renderGroupNavigator/);assert.match(source,/First group click isolates it/);assert.match(source,/function renderCommandSurface/);assert.match(source,/function renderCommandDetail/);assert.match(source,/GROUP_FILTER_KEY/);assert.match(source,/GROUP_COLLAPSE_KEY/);assert.match(source,/onCreateCatalogGroup/);assert.match(source,/onUpdateCatalogGroup/);assert.match(source,/onDeleteCatalogGroup/);assert.match(source,/onMoveCatalogGroup/);assert.match(source,/Other \/ Ungrouped/);assert.doesNotMatch(source,/levelSelect|SEMANTIC_COMPONENT|group\.level/);});

test('command cards avoid repeating group names outside All commands while detail keeps Tab to Group path',async()=>{const fs=await import('node:fs');const source=fs.readFileSync(new URL('../src/planning-helper-ui.js',import.meta.url),'utf8');assert.match(source,/activeMethodologyView===ALL_METHODOLOGY_VIEW/);assert.match(source,/command-card-context/);assert.match(source,/nav\?\.viewLabel,nav\?\.sectionLabel/);assert.doesNotMatch(source,/Group:\s*\$\{group\.label\}/);});


test('Favorites is first across group filters and duplicates stable command identities without changing membership',()=>{
  const a={id:'a'},b={id:'b'},hidden={id:'hidden',palette:false};
  const groups=[{id:'g',entries:[a]}];
  const projected=commandDisplayGroups(groups,[a,b,hidden],['a','b','hidden','stale']);
  assert.equal(projected[0].label,'Favorites');
  assert.deepEqual(projected[0].entries,[a,b]);
  assert.equal(projected[0].entries[0],groups[0].entries[0]);
  assert.equal(projected[1],groups[0]);
  assert.deepEqual(groups,[{id:'g',entries:[a]}]);
  assert.deepEqual(commandDisplayGroups([],[],[])[0].entries,[]);
});

test('selecting a command updates only selection/detail and does not rerender the command list',async()=>{const fs=await import('node:fs');const source=fs.readFileSync(new URL('../src/planning-helper-ui.js',import.meta.url),'utf8');const match=source.match(/function selectCommand\(entry\)\{([^}]|}(?!\s*function commandCard))*}/);assert.ok(match);assert.match(match[0],/renderCommandDetail/);assert.doesNotMatch(match[0],/renderEntries/);assert.match(source,/commandCardNodes\.set\(row,entry\.id\)/)});

test('compact command cards expose the same ordinary Run path as the detail pane',async()=>{const fs=await import('node:fs');const source=fs.readFileSync(new URL('../src/planning-helper-ui.js',import.meta.url),'utf8');const start=source.indexOf('function commandCard('),end=source.indexOf('function renderCommandDetail(',start),cardSource=source.slice(start,end);assert.match(cardSource,/button\('Run','run-action'/);assert.match(cardSource,/insertBody\(entry\.adaptiveBody\|\|entry\.text/);assert.match(cardSource,/commandExecutionId\(entry\)/)});


test('sidebar command workspace exposes command contract from includes and structured ownerRefs',async()=>{const fs=await import('node:fs');const source=fs.readFileSync(new URL('../src/planning-helper-ui.js',import.meta.url),'utf8');assert.match(source,/command-sidebar/);assert.match(source,/Categories/);assert.match(source,/Groups/);assert.match(source,/Effective command DAG/);assert.match(source,/Direct command owners/);assert.match(source,/definition\?\.includes/);assert.match(source,/definition\?\.ownerRefs/);assert.match(source,/responsibilityId/);assert.match(source,/readMode/);assert.match(source,/ref\.why/);assert.match(source,/Direct component-specific command/);});

test('sidebar shows only direct command owners when a definition exists and a component owner otherwise',async()=>{
  const fs=await import('node:fs');const source=fs.readFileSync(new URL('../src/planning-helper-ui.js',import.meta.url),'utf8');
  assert.match(source,/semanticOwner=definition\?null:/);
  assert.match(source,/id\.textContent=semanticOwner\.semanticId/);
  assert.match(source,/semanticOwner\.path.*semanticOwner\.anchor/);
  assert.match(source,/Direct command owners/);
  assert.match(source,/sources=definition\?\[\]:/);
});

test('prompt ordering exposes direct numeric position and preserves viewport on arrow or position moves',async()=>{const fs=await import('node:fs');const source=fs.readFileSync(new URL('../src/planning-helper-ui.js',import.meta.url),'utf8');assert.match(source,/position-input/);assert.match(source,/№ позиции/);assert.match(source,/onMoveCatalogItemToPosition/);assert.match(source,/captureListViewport/);assert.match(source,/restoreListViewport/);assert.match(source,/scroller\.scrollTop=viewport\.scrollTop/);assert.match(source,/scrollIntoView\(\{block:'nearest'\}\)/);assert.match(source,/selectedPromptId=entry\.id/);});

test('Favorites use personal order independently of catalog order and tolerate stale or duplicate IDs',()=>{
  const entries=[{id:'a'},{id:'b'},{id:'c'}];
  assert.deepEqual(favoriteEntries(entries,['c','missing','b','c','a']).map(e=>e.id),['c','b','a']);
  assert.deepEqual(entries.map(e=>e.id),['a','b','c']);
});


test('Prompts contains Prompts/Modules inner navigation and Save all replaces standalone order save',async()=>{const fs=await import('node:fs');const source=fs.readFileSync(new URL('../src/planning-helper-ui.js',import.meta.url),'utf8');assert.match(source,/data-library-view="prompts"/);assert.match(source,/data-library-view="modules"/);assert.match(source,/activePromptView='prompts'/);assert.match(source,/if\(surface===SURFACES\.PROMPTS\)\{activePromptView='prompts';activePromptGroupId='all';\}/);assert.match(source,/Save all GitHub/);assert.doesNotMatch(source,/Save order GitHub/);assert.match(source,/onSaveAllRepository/);assert.match(source,/resolveModules:true/);assert.match(source,/Copy ref/);});

test('Hard Reload closes its overlay before applying returned state and modules use a dedicated selected-row accent gutter',async()=>{const fs=await import('node:fs');const source=fs.readFileSync(new URL('../src/planning-helper-ui.js',import.meta.url),'utf8');const start=source.indexOf('function hardReloadRepository'),end=source.indexOf('function saveAllRepository',start),body=source.slice(start,end);assert.ok(body.indexOf('closeOverlay(overlay)')<body.indexOf('applyState(result)'));assert.match(source,/\.row\[data-selected=true\]::before/);assert.match(source,/padding-left:10px/);});

test('background activity replaces global busy freeze and repository work blocks only mutating controls',async()=>{
  const fs=await import('node:fs');const source=fs.readFileSync(new URL('../src/planning-helper-ui.js',import.meta.url),'utf8');
  assert.match(source,/backgroundTasks=new Map/);
  assert.match(source,/function runTask\(/);
  assert.match(source,/activity-spinner/);
  assert.match(source,/launcher-count/);
  assert.match(source,/function repositoryTaskActive/);
  assert.match(source,/function refreshMutationControls/);
  assert.doesNotMatch(source,/operationBusy|function setBusy\(/);
  const start=source.indexOf('function mutationControls'),end=source.indexOf('function refreshMutationControls',start),controls=source.slice(start,end);
  assert.doesNotMatch(controls,/\.tab|\.search|\.close|\.run-action|\.copy/);
});

test('action overlays are panel-scoped and release before asynchronous work starts',async()=>{
  const fs=await import('node:fs');const source=fs.readFileSync(new URL('../src/planning-helper-ui.js',import.meta.url),'utf8');
  assert.match(source,/\.overlay\{position:absolute/);
  assert.match(source,/panel\.append\(overlay\)/);
  assert.match(source,/if\(activeOverlay\)closeOverlay\(activeOverlay\)/);
  for(const [startName,endName,asyncMarker] of [
    ['function hardReloadRepository','function saveAllRepository','onHardReloadRepository'],
    ['function saveAllRepository','function openSettings','onSaveAllRepository'],
    ['function openImport','async function copyRecoveryRequest','onApplyChatImport'],
  ]){
    const start=source.indexOf(startName),end=source.indexOf(endName,start),body=source.slice(start,end);
    assert.ok(body.indexOf('closeOverlay(overlay)')>=0);
    assert.ok(body.indexOf('closeOverlay(overlay)')<body.indexOf(asyncMarker));
  }
  const bodyStart=source.indexOf('function openCommandBody'),bodyEnd=source.indexOf('function openCommandById',bodyStart),body=source.slice(bodyStart,bodyEnd);
  assert.ok(body.indexOf('closeOverlay(overlay)')<body.indexOf('copyBody('));
  assert.ok(body.indexOf('closeOverlay(overlay)')<body.indexOf('insertBody('));
  assert.match(source,/if\(event\.key==='Escape'&&activeOverlay\)\{closeOverlay\(activeOverlay\);return;\}/);
});

test('Save all does not discard click based on stale pending counts',async()=>{
  const fs=await import('node:fs');
  const source=fs.readFileSync(new URL('../src/planning-helper-ui.js',import.meta.url),'utf8');
  const section=source.slice(source.indexOf('function saveAllRepository()'),source.indexOf('function openSettings(',source.indexOf('function saveAllRepository()')));
  assert.doesNotMatch(section,/if\(!total\).*?return/);
  assert.match(section,/action:\(\)=>options\.onSaveAllRepository\(\)/);
  assert.match(section,/result\.action==='noop'/);
  assert.match(section,/result\.ok===false/);
});

test('Save all UI invokes runtime even when its last rendered pending count was zero',async()=>{
  const fs=await import('node:fs');
  const source=fs.readFileSync(new URL('../src/planning-helper-ui.js',import.meta.url),'utf8');
  const start=source.indexOf('function saveAllRepository()');
  const section=source.slice(start,source.indexOf('function openSettings(',start));
  const nodes=[],statuses=[];let calls=0,task=null;
  const element=()=>({children:[],append(...children){this.children.push(...children);}});
  const factory=new Function('pendingRepositoryWrites','makeOverlay','document','button','closeOverlay',
    'runTask','options','applyState','showStatus','repositorySaveFailureMessage',
    `${section}\nreturn saveAllRepository;`);
  const handler=factory({commands:0,prompts:0,modules:0,helperCommands:0,order:false},
    ()=>{const modal=element();nodes.push(modal);return{overlay:{},modal};},
    {createElement:element},(title,cls,callback)=>({title,click:callback}),()=>{},
    ({action,onSuccess})=>{task=Promise.resolve().then(action).then(onSuccess);return task;},
    {onSaveAllRepository:async()=>{calls++;return{ok:true,action:'noop'};}},
    ()=>{},(message)=>statuses.push(message),(error)=>String(error));
  handler();
  assert.equal(nodes.length,1,'zero stale count must still allow confirmation');
  const actions=nodes[0].children.at(-1);
  const confirm=actions.children.find((node)=>node.title==='Save all GitHub');
  assert.ok(confirm);
  confirm.click();await task;
  assert.equal(calls,1);
  assert.ok(statuses.some((message)=>message.includes('GitHub was not contacted.')));
});


test('visible helper version matches the actual generated userscript rather than the local loader',async()=>{
  const fs=await import('node:fs');
  const pkg=JSON.parse(fs.readFileSync(new URL('../package.json',import.meta.url),'utf8'));
  const ui=fs.readFileSync(new URL('../src/planning-helper-ui.js',import.meta.url),'utf8');
  const generated=fs.readFileSync(new URL('../../chat-command-palette.user.js',import.meta.url),'utf8');
  const headerVersion=generated.match(/^\/\/ @version\s+(\S+)/m)?.[1];
  assert.equal(headerVersion,`${pkg.version}-repository-command-registry`);
  assert.ok(generated.includes(`api.scriptVersion=${JSON.stringify(headerVersion)};api.startPlanningHelper()`));
  assert.match(ui,/class="helper-version" aria-label="Planning Helper version"/);
  assert.match(ui,/versionIndicator\.textContent=fullScriptVersion\?/);
  assert.match(ui,/versionIndicator\.title=fullScriptVersion\?/);
});
