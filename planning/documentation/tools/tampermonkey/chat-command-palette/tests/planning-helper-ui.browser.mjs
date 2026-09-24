// Optional real-browser regression suite; see README.md for prerequisites.
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import {createServer} from 'node:http';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLANNING_HELPER_PLAYWRIGHT_PATH||'playwright');
const server=createServer((req,res)=>{res.setHeader('Content-Type','text/html');res.end('<!doctype html><title>Planning Helper UI regression</title>');});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
let browser;
try{
  browser=await chromium.launch({headless:true,...(process.env.PLANNING_HELPER_BROWSER_CHANNEL?{channel:process.env.PLANNING_HELPER_BROWSER_CHANNEL}:{})});
  const page=await browser.newPage({viewport:{width:1440,height:1000}});
  const errors=[];page.on('pageerror',error=>errors.push(error.message));
  async function mount(){
    await page.goto(`http://127.0.0.1:${server.address().port}`);
    for(const name of ['methodology-navigation','planning-helper-ui'])await page.addScriptTag({path:fileURLToPath(new URL(`../src/${name}.js`,import.meta.url))});
    await page.evaluate(()=>{
      const views=['GENERAL','IDTSPE_PASS','USE_CASES','TARGET_MODULES','LENSES','TOOLS'];
      const entries=views.flatMap(view=>Array.from({length:18},(_,i)=>({id:`${view}-${i}`,label:`${view} command ${i}`,text:`body-${view}-${i}`,context:'Context content',result:'Result content',essence:'Essence content',presentationGroup:{id:`${view}-group-${i}`,viewId:view,label:`Group ${i}`,order:i}})));
      let favorites=['GENERAL-0','TARGET_MODULES-0'];window.insertions=[];
      window.ui=ObsPlanningHelper.createPlanningHelperUi({
        surfaces:{COMMANDS:'commands',SCENARIOS:'scenarios',PROMPTS:'prompts'},commandEntries:entries,
        favoriteCommandIds:favorites,position:{left:10,top:10,width:1380,height:920},
        onToggleFavoriteCommand:async id=>{favorites=favorites.includes(id)?favorites.filter(value=>value!==id):[...favorites,id];return{favoriteCommandIds:favorites};},
        onInsert:async(text,success,id)=>{window.insertions.push({text,id});return success;}
      });window.ui.setOpen(true);
    });
  }
  await mount();
  const root=page.locator('#obs-planning-helper-host');
  const favorite=root.locator('.favorite-group');
  const regular=root.locator('.command-group:not(.favorite-group)');
  assert.equal(await root.locator('.command-group').first().getAttribute('data-group-id'),'__favorites__');
  assert.equal(await favorite.locator('.command-card').count(),2);
  assert.equal(await root.locator('[data-entry-id="GENERAL-0"]').count(),2);
  assert.equal(await favorite.locator('[data-entry-id="TARGET_MODULES-0"] .command-card-context').isVisible(),true);
  assert.equal(await favorite.locator('[data-entry-id="TARGET_MODULES-0"] .command-card-context').textContent(),'Target Modules › Group 0');
  assert.equal(await root.locator('.meaning-box').count(),3);
  assert.equal(await root.locator('.meaning-box[open]').count(),0);
  if(process.env.PLANNING_HELPER_SCREENSHOT)await page.screenshot({path:process.env.PLANNING_HELPER_SCREENSHOT});
  await regular.locator('[data-entry-id="GENERAL-0"] .command-card-label').click();
  assert.equal(await root.locator('[data-entry-id="GENERAL-0"][data-selected="true"]').count(),2);
  await favorite.locator('[data-entry-id="TARGET_MODULES-0"] .command-card-label').click();
  assert.equal(await root.locator('.command-detail-title').textContent(),'TARGET_MODULES command 0');
  await root.locator('[data-meaning="context"] summary').click();
  await page.waitForFunction(()=>ui.root.querySelector('[data-meaning="context"]').open);
  await favorite.locator('[data-entry-id="GENERAL-0"] .command-card-label').click();
  assert.equal(await root.locator('.meaning-box[open]').count(),0);
  await favorite.locator('[data-entry-id="TARGET_MODULES-0"] .command-card-label').click();
  assert.equal(await root.locator('[data-meaning="context"]').getAttribute('open'),'');
  await favorite.locator('[data-entry-id="GENERAL-0"] .run-action').click();
  await regular.locator('[data-entry-id="GENERAL-0"] .run-action').click();
  assert.deepEqual(await page.evaluate(()=>insertions),[{text:'body-GENERAL-0',id:'GENERAL-0'},{text:'body-GENERAL-0',id:'GENERAL-0'}]);
  console.log('PASS: favorites first, duplicate selection/actions, collapsed meaning sections and per-command expansion');

  // Capture immediately before a real click after Playwright has made the target visible.
  const chip=root.locator('.group-chip').filter({hasText:'Group 8'});
  await chip.scrollIntoViewIfNeeded();
  const sidebar=root.locator('.command-sidebar');
  let before=await sidebar.evaluate(el=>el.scrollTop);assert.ok(before>0);
  await chip.click();
  assert.equal(await sidebar.evaluate(el=>el.scrollTop),before);
  assert.equal(await regular.count(),1);
  assert.equal(await favorite.locator('.command-card').count(),2);
  // Exercise category changes from a nonzero sidebar position without an automation-induced scroll.
  await page.evaluate(()=>{ui.root.querySelector('.command-sidebar').scrollTop=180;ui.root.querySelector('[data-command-view="TARGET_MODULES"]').click();});
  assert.equal(await sidebar.evaluate(el=>el.scrollTop),180);
  assert.equal(await favorite.locator('.command-card').count(),2);
  assert.equal(await root.locator('[data-entry-id="TARGET_MODULES-0"]').count(),2);
  await root.locator('.search').fill('TARGET_MODULES command 0');
  assert.equal(await sidebar.evaluate(el=>el.scrollTop),180);
  assert.equal(await favorite.locator('.command-card').count(),1);
  await root.locator('.search').fill('no-match-xyz');
  assert.equal(await root.locator('.command-group').first().getAttribute('data-group-id'),'__favorites__');
  assert.equal(await favorite.locator('.command-card').count(),0);
  await root.locator('.search').fill('');
  before=await sidebar.evaluate(el=>el.scrollTop);
  await favorite.locator('[data-entry-id="TARGET_MODULES-0"] .favorite-toggle').click();
  assert.equal(await sidebar.evaluate(el=>el.scrollTop),before);
  assert.equal(await favorite.locator('[data-entry-id="TARGET_MODULES-0"]').count(),0);
  assert.equal(await regular.locator('[data-entry-id="TARGET_MODULES-0"] .favorite-toggle').textContent(),'☆');
  await regular.locator('[data-entry-id="TARGET_MODULES-0"] .favorite-toggle').click();
  assert.equal(await favorite.locator('[data-entry-id="TARGET_MODULES-0"]').count(),1);
  console.log('PASS: sidebar scroll survives group/category/search/favorite updates; favorites span filters');

  await favorite.locator('.command-group-head').click();
  assert.equal(await favorite.getAttribute('data-collapsed'),'true');
  await page.evaluate(()=>ui.root.querySelector('[data-command-view="GENERAL"]').click());
  assert.equal(await favorite.getAttribute('data-collapsed'),'true');
  await root.locator('[data-section="categories"] summary').click();
  await page.waitForFunction(()=>localStorage.getItem('obs-planning-helper-sidebar-collapse-v1:categories')==='1');
  await root.locator('[data-section="groups"]>summary').click();
  await page.waitForFunction(()=>localStorage.getItem('obs-planning-helper-sidebar-collapse-v1:groups')==='1');
  await mount();
  assert.equal(await favorite.getAttribute('data-collapsed'),'true');
  assert.equal(await root.locator('.sidebar-section[open]').count(),0);
  assert.equal(await root.locator('.meaning-box[open]').count(),0);
  await favorite.locator('.command-group-head').focus();await page.keyboard.press('Enter');
  assert.equal(await favorite.getAttribute('data-collapsed'),'false');
  await favorite.locator('.favorite-toggle').first().click();
  await favorite.locator('.favorite-toggle').first().click();
  assert.equal(await favorite.locator('.command-card').count(),0);
  assert.equal(await root.locator('.command-group').first().getAttribute('data-group-id'),'__favorites__');
  assert.match(await favorite.textContent(),/Use ☆/);
  await root.locator('[data-section="categories"] summary').focus();await page.keyboard.press('Enter');
  assert.equal(await root.locator('[data-section="categories"]').getAttribute('open'),'');
  assert.deepEqual(errors,[]);
  console.log('PASS: collapse persistence, keyboard controls, empty Favorites; no browser errors');
}finally{await browser?.close();await new Promise(resolve=>server.close(resolve));}
