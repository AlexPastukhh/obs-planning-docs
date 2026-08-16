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

test('GitHub client supports explicit list/read/update with exact read-back verification',()=>{const client=read('src/github-contents-client.js');assert.match(client,/async listDirectory\(path\)/);assert.match(client,/async read\(path\)/);assert.match(client,/async saveVerified/);assert.match(client,/read-back content does not match/)});

test('composer fix remains direct Range insertion and never regresses to insertText execCommand',()=>{const source=read('src/composer-insertion.js');assert.match(source,/range\.insertNode\(node\)/);assert.doesNotMatch(source,/execCommand\('insertText'/)});

test('Planning Helper has canonical application registry and map owners',()=>{const registry=fs.readFileSync(path.join(root,'USE-CASE-REGISTRY.md'),'utf8');const map=fs.readFileSync(path.join(root,'USE-CASE-MAP.md'),'utf8');for(const id of ['UC-PH-DISCOVER','UC-PH-USE','UC-PH-MANAGE-LOCAL','UC-PH-IMPORT','UC-PH-CHECK-REPOSITORY','UC-PH-SYNC','UC-PH-PUBLISH','UC-PH-RECOVER']){assert.match(registry,new RegExp(id));assert.match(map,new RegExp(id))}assert.doesNotMatch(registry,/UC-0[1-9]/);assert.match(map,/Primary implementation/);assert.match(map,/Automated evidence/);assert.match(map,/Manual acceptance/)});

test('root routing docs point to the Planning Helper application registry and map',()=>{const rootUcm=fs.readFileSync(path.join(repoRoot,'planning/planning-use-case-map.md'),'utf8');assert.match(rootUcm,/chat-command-palette\/USE-CASE-REGISTRY\.md/);assert.match(rootUcm,/chat-command-palette\/USE-CASE-MAP\.md/)});

test('UI distinguishes same-path inventory from content equality and remote-success local-persistence warning',()=>{const ui=read('src/planning-helper-ui.js');assert.match(ui,/same-path/);assert.match(ui,/Remote state is verified, but local repository-evidence metadata could not be saved/);assert.doesNotMatch(ui,/common \${b\.common}/)});


test('repository source changes clear old-source evidence before new settings become active',()=>{const runtime=read('src/planning-helper-runtime.js');const start=runtime.indexOf('async function saveSettings(settings,token)');const end=runtime.indexOf('const ui=deps.createPlanningHelperUi',start);const body=runtime.slice(start,end);const clear=body.indexOf('persist(clearRepositoryEvidence(snapshot))');const token=body.indexOf('saveGitHubToken(token)');const settings=body.indexOf('saveRepositorySettings(candidate)');assert.ok(clear>=0&&token>clear&&settings>token)});
