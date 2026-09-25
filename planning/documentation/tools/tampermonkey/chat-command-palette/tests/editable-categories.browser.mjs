import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import {createServer} from 'node:http';
const require=createRequire(import.meta.url),{chromium}=require(process.env.PLANNING_HELPER_PLAYWRIGHT_PATH||'playwright');
const server=createServer((req,res)=>{res.setHeader('Content-Type','text/html');res.end('<!doctype html><title>Editable categories</title>');});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
let browser;
try{
  browser=await chromium.launch({headless:true,...(process.env.PLANNING_HELPER_BROWSER_CHANNEL?{channel:process.env.PLANNING_HELPER_BROWSER_CHANNEL}:{})});
  const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  const modules=['command-definition-codec','command-catalog','command-body','semantic-projections','helper-library-codec','chat-recovery','github-contents-client','repository-command-service','repository-helper-library-service','repository-catalog-service','planning-helper-state','composer-insertion','methodology-navigation','command-side-effects','planning-helper-ui','planning-helper-runtime'];
  const definitions=require('../seed/commands.json').items,order=require('../catalog-order.json');
  const useCases=require('../seed/use-cases.json').items.filter(uc=>uc.id==='UC-DOC-PLAN-DOCUMENTATION-CHANGE');
  async function mount(){
    await page.goto(`http://127.0.0.1:${server.address().port}`);
    await page.evaluate(()=>{
      window.GM_getValue=(key,fallback)=>JSON.parse(localStorage.getItem('gm:'+key)||'null')??fallback;
      window.GM_setValue=(key,value)=>localStorage.setItem('gm:'+key,JSON.stringify(value));
      window.GM_xmlhttpRequest=()=>{throw new Error('Unexpected network operation');};
      localStorage.setItem('obs-planning-helper-position-v2',JSON.stringify({left:10,top:10,width:1380,height:920}));
    });
    for(const name of modules)await page.addScriptTag({path:fileURLToPath(new URL('../src/'+name+'.js',import.meta.url))});
    await page.evaluate(async({definitions,order,useCases})=>{
      const api=ObsPlanningHelper;
      if(!GM_getValue(api.PLANNING_HELPER_STATE_KEYS.localSnapshot,null))await api.savePlanningHelperLocalSnapshot({schemaVersion:api.LOCAL_SNAPSHOT_SCHEMA_VERSION,planningCommands:definitions.map(d=>api.normalizeCommandRecord({definition:d})),useCases,catalogOrder:order,favoriteCommandIds:['tmcmd.pre.update']});
      window.runtime=await api.startPlanningHelper();
    },{definitions,order,useCases});
    await page.locator('#obs-planning-helper-host').locator('.launcher').click();
  }
  await mount();const root=page.locator('#obs-planning-helper-host');
  await root.locator('[data-command-view="USE_CASES"]').click();
  const documentationCard=root.locator('[data-entry-id="uc:UC-DOC-PLAN-DOCUMENTATION-CHANGE"]');
  assert.equal(await documentationCard.count(),1);
  await documentationCard.locator('.command-card-label').click();
  assert.match(await root.locator('.process-call-contract').textContent(),/doc-helper-impact-before-handoff/);
  assert.equal(await root.locator('[data-entry-id="documentation.change.plan"]').count(),0);
  async function manager(){await root.locator('.manage-categories').click();}
  await manager();await root.locator('.category-create input').fill('Мои проверки');await root.locator('.category-create-action').click();
  await page.waitForFunction(()=>runtime.getSnapshot().catalogOrder.categories.some(c=>c.label==='Мои проверки'));
  const id=await page.evaluate(()=>runtime.getSnapshot().catalogOrder.categories.find(c=>c.label==='Мои проверки').id);
  assert.equal(await root.locator(`[data-command-view="${id}"]`).isVisible(),true);
  await root.locator(`[data-command-view="${id}"]`).click();
  assert.equal(await root.locator('.command-view[aria-selected="true"] .command-view-count').textContent(),'0');
  await manager();await root.locator(`[data-category-id="${id}"] input`).fill('QA');await root.locator(`[data-category-id="${id}"] .category-save`).click();
  await manager();await root.locator(`[data-category-id="${id}"] .category-up`).click();
  assert.equal(await page.evaluate(id=>runtime.getSnapshot().catalogOrder.categories.at(-2).id===id,id),true);
  // Move an existing favorite card using its real detail-pane selector.
  await root.locator('.favorite-group .command-card-label').click();
  await root.locator('.detail-category-select').selectOption(id);
  await page.waitForFunction(id=>runtime.getSnapshot().catalogOrder.commandGroups.some(g=>g.viewId===id&&g.items.includes('tmcmd.pre.update')),id);
  assert.equal(await root.locator('.favorite-group .command-card').count(),1);
  assert.ok(await root.locator('.process-call-contract').count()>0);
  assert.match(await root.locator('.contract-box').first().textContent(),/recheck-methodology-use-cases\.command\.md/);
  // Create then move a group through the real management UI.
  await root.locator('.manage-groups').click();
  await root.getByPlaceholder('Group name').fill('A group');
  await root.locator('.group-editor-actions button').filter({hasText:/^Create$/}).click();
  const groupId=await page.evaluate(()=>runtime.getSnapshot().catalogOrder.commandGroups.find(g=>g.label==='A group').id);
  await root.locator('.manage-groups').click();
  const rows=root.locator('.group-editor');
  for(let i=0;i<await rows.count();i++)if(await rows.nth(i).locator('input').inputValue()==='A group'){
    await rows.nth(i).getByLabel('Group category').selectOption('GENERAL');await rows.nth(i).locator('.group-move-category').click();break;
  }
  assert.equal(await page.evaluate(id=>runtime.getSnapshot().catalogOrder.commandGroups.find(g=>g.id===id).viewId,groupId),'GENERAL');
  // Restart reads real GM snapshot (not mocked callback state).
  await mount();assert.equal(await root.locator(`[data-command-view="${id}"] .command-view-label`).textContent(),'QA');
  assert.equal(await root.locator('.favorite-group .command-card').count(),1);
  await manager();const row=root.locator(`[data-category-id="${id}"]`);await row.getByLabel('Move contents to').selectOption('GENERAL');await row.locator('.category-delete').click();
  await page.waitForFunction(id=>!runtime.getSnapshot().catalogOrder.categories.some(c=>c.id===id),id);
  assert.equal(await root.locator(`[data-command-view="${id}"]`).count(),0);
  assert.equal(await page.evaluate(()=>runtime.getSnapshot().catalogOrder.commandGroups.find(g=>g.items.includes('tmcmd.pre.update')).viewId),'GENERAL');
  assert.equal(await root.locator('.favorite-group .command-card').count(),1);
  await mount();assert.equal(await root.locator(`[data-command-view="${id}"]`).count(),0);
  await root.locator('.favorite-group .command-card-label').click();
  assert.match(await root.locator('.process-call-contract').textContent(),/helper-impact-before-plan-handoff/);
  // Favorite arrows use real runtime persistence independently of the catalog layout.
  await page.evaluate(async()=>{for(const id of ['helper.impact.check','helper.command.add'])await runtime.toggleFavoriteCommand(id);});
  await mount();
  const favorites=root.locator('.favorite-group'),favoriteIds=()=>favorites.locator('.command-card').evaluateAll(rows=>rows.map(row=>row.dataset.entryId));
  const initial=['tmcmd.pre.update','helper.impact.check','helper.command.add'];
  assert.deepEqual(await favoriteIds(),initial);
  const catalogBefore=await page.evaluate(()=>runtime.getSnapshot().catalogOrder);
  assert.equal(await favorites.locator('.command-card').first().locator('.favorite-up').isDisabled(),true);
  assert.equal(await favorites.locator('.command-card').last().locator('.favorite-down').isDisabled(),true);
  assert.equal(await root.locator('.command-group:not(.favorite-group) .favorite-order-controls').count(),0);
  await favorites.locator('[data-entry-id="helper.impact.check"] .command-card-label').click();
  const titleBefore=await root.locator('.command-detail-title').textContent();
  await root.locator('[data-meaning="context"] summary').click();
  await page.waitForFunction(()=>document.querySelector('#obs-planning-helper-host').shadowRoot.querySelector('[data-meaning="context"]').open);
  const down=favorites.locator('[data-entry-id="helper.impact.check"] .favorite-down');
  await down.scrollIntoViewIfNeeded();
  const scrollBefore=await root.evaluate(host=>{const s=host.shadowRoot;s.querySelector('.command-list').scrollTop=25;s.querySelector('.command-detail').scrollTop=35;s.querySelector('.command-sidebar').scrollTop=40;return ['.command-list','.command-detail','.command-sidebar'].map(sel=>s.querySelector(sel).scrollTop);});
  await down.click();
  assert.deepEqual(await favoriteIds(),['tmcmd.pre.update','helper.command.add','helper.impact.check']);
  assert.equal(await root.locator('.command-detail-title').textContent(),titleBefore);
  assert.equal(await root.locator('[data-meaning="context"]').getAttribute('open'),'');
  assert.deepEqual(await root.evaluate(host=>['.command-list','.command-detail','.command-sidebar'].map(sel=>host.shadowRoot.querySelector(sel).scrollTop)),scrollBefore);
  assert.equal(await root.evaluate(host=>host.shadowRoot.activeElement.className),'favorite-up');
  await favorites.locator('[data-entry-id="helper.impact.check"] .favorite-up').press('Enter');
  assert.deepEqual(await favoriteIds(),initial);
  assert.deepEqual(await page.evaluate(()=>runtime.getSnapshot().catalogOrder),catalogBefore);
  await root.locator('.search').fill('helper.');
  assert.deepEqual(await favoriteIds(),['helper.impact.check','helper.command.add']);
  assert.equal(await favorites.locator('.command-card').first().locator('.favorite-up').isDisabled(),true);
  await favorites.locator('[data-entry-id="helper.command.add"] .favorite-up').click();
  await root.locator('.search').fill('');
  assert.deepEqual(await favoriteIds(),['tmcmd.pre.update','helper.command.add','helper.impact.check']);
  await root.locator('[data-command-view="TARGET_MODULES"]').click();
  assert.deepEqual(await favoriteIds(),['tmcmd.pre.update','helper.command.add','helper.impact.check']);
  await mount();
  assert.deepEqual(await favoriteIds(),['tmcmd.pre.update','helper.command.add','helper.impact.check']);
  console.log('PASS: Favorite arrows, keyboard, bounds, filtered moves, independent persisted order, selection and scroll');
  if(process.env.PLANNING_HELPER_CATEGORIES_SCREENSHOT)await page.screenshot({path:process.env.PLANNING_HELPER_CATEGORIES_SCREENSHOT});
  assert.deepEqual(errors,[]);
  console.log('PASS: create/rename/reorder empty categories, card/group moves, restart persistence, delete with transfer, Favorites, deferred call inspector, no network operations');
}finally{await browser?.close();await new Promise(resolve=>server.close(resolve));}
