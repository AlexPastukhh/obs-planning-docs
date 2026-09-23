import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const commandBody=require('../src/command-body.js');
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const repoRoot=path.resolve(root,'../../../../..');
const read=(rel)=>fs.readFileSync(path.join(root,rel),'utf8');

test('normal local insert/edit/reorder path stays local and repository access is explicit',()=>{const runtime=read('src/planning-helper-runtime.js');const insert=runtime.slice(runtime.indexOf('async function insertWithClipboard'),runtime.indexOf('async function startPlanningHelper'));assert.doesNotMatch(insert,/GitHub|makeClient|makeServices/);assert.match(runtime,/async function reloadRepositoryCommand\(id\)/);assert.match(runtime,/async function checkRepository\(\)/);assert.match(runtime,/async function syncMissingRepository\(\)/);assert.match(runtime,/async function hardReloadRepository\(\)/);assert.match(runtime,/async function moveCatalogItem/);assert.match(runtime,/async function saveCatalogOrderRepository\(\)/)});

test('UI exposes command-centric Commands/Scenarios/Prompts plus explicit GitHub recovery/order actions',()=>{const ui=read('src/planning-helper-ui.js'),semantic=read('src/semantic-projections.js');assert.match(semantic,/COMMANDS:'Commands',SCENARIOS:'Scenarios',PROMPTS:'Prompts'/);assert.doesNotMatch(semantic,/Direction|directionId|directionIds/);assert.match(ui,/SURFACES\.COMMANDS,SURFACES\.SCENARIOS,SURFACES\.PROMPTS/);assert.match(ui,/★ Favorite/);assert.match(ui,/function renderGroupNavigator/);assert.match(ui,/function renderCommandDetail/);assert.match(ui,/Hard Reload GitHub/);assert.match(ui,/Save order GitHub/);assert.match(ui,/Check GitHub/);assert.match(ui,/Sync missing/);assert.match(ui,/Save GitHub/);assert.match(ui,/onMoveCatalogItem/);assert.doesNotMatch(ui,/onMoveDirection|groupEntriesByDirections/);assert.match(ui,/resize:both/);assert.match(ui,/Math\.min\(980/);assert.match(ui,/minmax\(420px,1fr\)/);assert.match(ui,/GitHub token — used only by explicit GitHub actions/);assert.match(ui,/Normal search\/insert\/copy\/edit\/reorder is local-only/)});

test('GitHub client supports explicit read/list/save with exact read-back and safe conflict recovery',()=>{const client=read('src/github-contents-client.js');assert.match(client,/async listDirectory/);assert.match(client,/async read\(path\)/);assert.match(client,/async saveVerified/);assert.match(client,/read-back content does not match/);assert.match(client,/recoveredAfterConflict/);assert.match(client,/nothing was overwritten/)});

test('composer insertion remains direct Range insertion',()=>{const source=read('src/composer-insertion.js');assert.match(source,/range\.insertNode\(node\)/);assert.doesNotMatch(source,/execCommand\('insertText'/)});

test('Planning Helper Scenario catalog remains canonical application behavior owner',()=>{const registry=read('scenarios/README.md');for(const id of ['SCN-PH-DISCOVER','SCN-PH-USE','SCN-PH-MANAGE-LOCAL','SCN-PH-IMPORT','SCN-PH-CHECK-REPOSITORY','SCN-PH-SYNC','SCN-PH-PUBLISH','SCN-PH-RECOVER'])assert.match(registry,new RegExp(id));const scenario=read('scenarios/SCN-PH-DISCOVER.md');assert.match(scenario,/Primary implementation/);assert.match(scenario,/Automated evidence/);assert.match(scenario,/Manual acceptance/)});


test('current Scenario owners retain sidebar command-contract and stable Prompt-order behavior',()=>{
  const use=read('scenarios/SCN-PH-USE.md');
  assert.match(use,/compact left sidebar/);
  assert.match(use,/Command Contract/);
  assert.match(use,/includes\[\].*command-DAG/s);
  assert.match(use,/ownerRefs.*responsibilityId \/ role \/ readMode \/ path#anchor \/ why/s);
  assert.match(use,/includes\[\].*distinct from `ownerRefs`/s);
  assert.match(use,/presentation\/projection surface, not a semantic authority/);
  const manage=read('scenarios/SCN-PH-MANAGE-LOCAL.md');
  assert.match(manage,/direct 1-based `№` target-position moves/);
  assert.match(manage,/empty position performs no move/);
  assert.match(manage,/preserves the currently selected Prompt and the list viewport/);
  assert.match(manage,/Arrow moves restore the prior `scrollTop`/);
  assert.match(manage,/nearest scrolling rather than resetting the list to the top/);
  assert.match(manage,/local reorder itself performs no implicit repository write/);
});

test('Planning Helper repository navigation reaches current Scenario and Use-Case owners without a Direction layer',()=>{const planning=fs.readFileSync(path.join(repoRoot,'planning/README.md'),'utf8');const scenarios=read('scenarios/README.md');assert.doesNotMatch(planning,/direction-registry\.md/);assert.match(scenarios,/SCN-PH-DISCOVER/);assert.ok(fs.existsSync(path.join(repoRoot,'planning/use-case-registry.md')))});

test('UI inventory/conflict messaging distinguishes remote failure from verified-write local-persistence warning',()=>{const ui=read('src/planning-helper-ui.js');assert.match(ui,/current remote content could not be verified/);assert.match(ui,/nothing was overwritten/);assert.match(ui,/repositorySaveFailureMessage/);assert.match(ui,/succeeded, but local snapshot refresh failed/);assert.doesNotMatch(ui,/Directions/);assert.match(ui,/Semantic component projection/);assert.match(ui,/Canonical scenario projection/);assert.match(ui,/Catalog order changed/)});

test('repository source changes clear old-source evidence before new settings become active',()=>{const runtime=read('src/planning-helper-runtime.js');const start=runtime.indexOf('async function saveSettings(settings,token)'),end=runtime.indexOf('const ui=deps.createPlanningHelperUi',start),body=runtime.slice(start,end);const clear=body.indexOf('persist(clearRepositoryEvidence(snapshot))'),token=body.indexOf('saveGitHubToken(token)'),settings=body.indexOf('saveRepositorySettings(candidate)');assert.ok(clear>=0&&token>clear&&settings>token)});

test('generated userscript contains runtime but no maintained current Command/UC catalog identities',()=>{const userscript=fs.readFileSync(path.resolve(root,'../chat-command-palette.user.js'),'utf8'),semantic=read('src/semantic-projections.js'),useCaseSeed=JSON.parse(read('seed/use-cases.json'));assert.ok(useCaseSeed.items.length>0);assert.ok(!useCaseSeed.items.some((item)=>String(item.id||'').startsWith('UC-RPKG-')));for(const identity of ['UC-PLAN-DOMAIN','application_domain.plan','DIR-PLAN-SOLUTION']){assert.doesNotMatch(semantic,new RegExp(identity.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')));assert.doesNotMatch(userscript,new RegExp(identity.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')))}assert.match(semantic,/normalizeUseCaseDefinitions/);assert.doesNotMatch(semantic,/normalizeDirectionDefinitions|directionId|directionIds/);assert.match(semantic,/route_resolution/)});


test('command-maintenance helper command is projected as Tools / Repository',()=>{
  const runtime=read('src/planning-helper-runtime.js');
  assert.match(runtime,/'helper\.command\.add':\{actionLabel:'Создать \/ изменить Planning Command',tail:'Tool · Planning Command',category:'TOOL'/);
});


test('proposal archive command body is self-contained and links existing Use-Case authority',()=>{
  const proposal=JSON.parse(read('seed/commands.json')).items.find((item)=>item.id==='proposal_archive.create');
  assert.ok(proposal);
  const text=commandBody.buildCommandBody(proposal,commandBody.MODE.ADAPTIVE);
  assert.ok(text.includes('context:\n  Use the active selected proposal scope'));
  assert.ok(text.includes('result:\n  One review-only proposal ZIP'));
  assert.ok(text.includes('essence:\n  Package the currently selected proposal'));
  assert.ok(text.includes('[UC-DOC-PLAN-DOCUMENTATION-CHANGE](../documentation/use-cases/UC-DOC-PLAN-DOCUMENTATION-CHANGE.md)'));
  assert.ok(text.includes('[Use Case — Situation + Result + Process](../documentation/principles-and-terminology.md#doc-use-case)'));
  assert.match(text,/Never include PACKAGE\.json/);
  assert.match(text,/Do not apply locally, commit or push/);
});
