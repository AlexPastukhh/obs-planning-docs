import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const repoRoot=path.resolve(root,'../../../../..');
const read=(rel)=>fs.readFileSync(path.join(root,rel),'utf8');

test('normal insert/copy path stays RAM/local and GitHub is explicit-action only',()=>{const runtime=read('src/planning-helper-runtime.js');const insert=runtime.slice(runtime.indexOf('async function insertWithClipboard'),runtime.indexOf('async function startPlanningHelper'));assert.doesNotMatch(insert,/GitHub|makeClient|makeServices|RepositoryCommandService|RepositoryHelperLibraryService/);const importBody=runtime.slice(runtime.indexOf('async function applyChatText'),runtime.indexOf('async function saveLocalLibraryItem'));assert.doesNotMatch(importBody,/makeClient|makeServices|\.save\(/);assert.match(runtime,/async function checkRepository\(\)/);assert.match(runtime,/async function syncMissingRepository\(\)/);assert.match(runtime,/async function saveRepositoryEntity\(reference\)/)});

test('UI exposes explicit GitHub check/sync/save on repository-backed surfaces',()=>{const ui=read('src/planning-helper-ui.js');assert.match(ui,/Check GitHub/);assert.match(ui,/Sync missing/);assert.match(ui,/Save GitHub/);assert.match(ui,/Sync missing downloads only repository paths absent locally/);assert.match(ui,/Local import completed\. Use Save GitHub explicitly/)});

test('GitHub client supports explicit list/read/update with exact read-back and safe conflict recovery',()=>{const client=read('src/github-contents-client.js');assert.match(client,/async listDirectory\(path\)/);assert.match(client,/async read\(path\)/);assert.match(client,/async saveVerified/);assert.match(client,/read-back content does not match/);assert.match(client,/recoveredAfterConflict/);assert.match(client,/nothing was overwritten/)});

test('composer fix remains direct Range insertion and never regresses to insertText execCommand',()=>{const source=read('src/composer-insertion.js');assert.match(source,/range\.insertNode\(node\)/);assert.doesNotMatch(source,/execCommand\('insertText'/)});

test('Planning Helper has canonical application registry and Scenario owners',()=>{const registry=fs.readFileSync(path.join(root,'USE-CASE-REGISTRY.md'),'utf8');const catalog=fs.readFileSync(path.join(root,'scenarios/README.md'),'utf8');for(const id of ['UC-PH-DISCOVER','UC-PH-USE','UC-PH-MANAGE-LOCAL','UC-PH-IMPORT','UC-PH-CHECK-REPOSITORY','UC-PH-SYNC','UC-PH-PUBLISH','UC-PH-RECOVER']){assert.match(registry,new RegExp(id));assert.match(catalog,new RegExp(id))}const scenario=fs.readFileSync(path.join(root,'scenarios/SCN-PH-DISCOVER.md'),'utf8');assert.match(scenario,/Primary implementation/);assert.match(scenario,/Automated evidence/);assert.match(scenario,/Manual acceptance/)});

test('root semantic docs point to Planning Helper Direction and Use-Case registries',()=>{const directions=fs.readFileSync(path.join(repoRoot,'planning/direction-registry.md'),'utf8');assert.match(directions,/chat-command-palette\/direction-registry\.md/);assert.match(directions,/chat-command-palette\/USE-CASE-REGISTRY\.md/)});

test('UI distinguishes inventory, recovered/repaired saves, real conflict and remote-success local-persistence warning',()=>{const ui=read('src/planning-helper-ui.js');assert.match(ui,/same-path/);assert.match(ui,/recoveredAfterConflict/);assert.match(ui,/replacedMalformedRemote/);assert.match(ui,/nothing was overwritten/);assert.match(ui,/current remote content could not be verified/);assert.match(ui,/repositorySaveFailureMessage/);assert.match(ui,/Remote state is verified, but local repository-evidence metadata could not be saved/);assert.doesNotMatch(ui,/common \${b\.common}/)});


test('repository source changes clear old-source evidence before new settings become active',()=>{const runtime=read('src/planning-helper-runtime.js');const start=runtime.indexOf('async function saveSettings(settings,token)');const end=runtime.indexOf('const ui=deps.createPlanningHelperUi',start);const body=runtime.slice(start,end);const clear=body.indexOf('persist(clearRepositoryEvidence(snapshot))');const token=body.indexOf('saveGitHubToken(token)');const settings=body.indexOf('saveRepositorySettings(candidate)');assert.ok(clear>=0&&token>clear&&settings>token)});

test('semantic projections expose collect ideas and retire active Planning Item command redirects',()=>{const source=read('src/semantic-projections.js');assert.match(source,/UC-PLAN-COLLECT-IDEAS/);assert.match(source,/ideas\.collect/);assert.doesNotMatch(source,/planning_items\.form/);assert.doesNotMatch(source,/planning_items\.reconcile/);assert.doesNotMatch(source,/UC-AP-FORM-ITEMS/);assert.doesNotMatch(source,/UC-AP-RECONCILE/)});
