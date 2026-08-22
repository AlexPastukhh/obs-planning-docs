import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const moduleRoot=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const repoRoot=path.resolve(moduleRoot,'../../../../..');
const semantic=require('../src/semantic-projections.js');

const registries=[
  ['planning/use-case-registry.md','UC-REPO-'],
  ['planning/documentation/application-planning/use-case-registry.md','UC-PLAN-'],
  ['planning/documentation/workspace-planning/use-case-registry.md','UC-PLAN-WORKSPACE-'],
  ['planning/documentation/architecture-planning/use-case-registry.md','UC-PLAN-ARCH-'],
  ['planning/documentation/testing-planning/use-case-registry.md','UC-PLAN-TEST-'],
  ['planning/documentation/use-case-registry.md','UC-DOC-'],
  ['planning/areas/documentation-workbench/use-case-registry.md','UC-DW-'],
  ['planning/areas/planning-system/use-case-registry.md','UC-PR-'],
  ['planning/documentation/tools/replacement-package-app/USE-CASE-REGISTRY.md','UC-RPKG-']
];
function read(rel){return fs.readFileSync(path.join(repoRoot,rel),'utf8')}
function canonicalIds(rel,prefix){const text=read(rel), ids=[];for(const line of text.split(/\r?\n/)){let m=line.match(/^#{2,3} `((?:UC-[A-Z0-9-]+))` — /);if(!m)m=line.match(/^\| `((?:UC-[A-Z0-9-]+))` \|/);if(m&&m[1].startsWith(prefix)&&!ids.includes(m[1]))ids.push(m[1])}return ids}
function canonicalDirectionIds(rel){const text=read(rel), ids=[];for(const line of text.split(/\r?\n/)){const m=line.match(/^\| `((?:DIR-[A-Z0-9-]+))` \|/);if(m&&!ids.includes(m[1]))ids.push(m[1])}return ids}
function exactCaseExists(rel){let current=repoRoot;for(const segment of rel.split('/')){const names=fs.readdirSync(current);if(!names.includes(segment))return false;current=path.join(current,segment)}return fs.existsSync(current)}

test('semantic projection contains every current root Direction exactly once',()=>{const expected=canonicalDirectionIds('planning/direction-registry.md');const actual=semantic.DIRECTION_DEFINITIONS.map(d=>d.id);assert.equal(new Set(actual).size,actual.length,'duplicate projected Direction id');assert.deepEqual([...actual].sort(),[...new Set(expected)].sort())});

test('semantic projection contains every current canonical Use Case exactly once',()=>{const expected=[];for(const [rel,prefix] of registries)expected.push(...canonicalIds(rel,prefix));const actual=semantic.USE_CASE_DEFINITIONS.map(d=>d.id);assert.equal(new Set(actual).size,actual.length,'duplicate projected Use-Case id');assert.deepEqual([...actual].sort(),[...new Set(expected)].sort())});

test('all semantic projection source paths exist with exact repository casing',()=>{for(const definition of [...semantic.ORIENTATION_DEFINITIONS,...semantic.DIRECTION_DEFINITIONS,...semantic.USE_CASE_DEFINITIONS])for(const source of definition.sources||[])assert.ok(exactCaseExists(source),`${definition.id}: missing/exact-case-invalid source ${source}`)});

test('root/documentation/planning table registries expose explicit complete UC contract',()=>{for(const rel of ['planning/use-case-registry.md','planning/documentation/use-case-registry.md','planning/documentation/application-planning/use-case-registry.md','planning/documentation/architecture-planning/use-case-registry.md']){const text=read(rel);assert.match(text,/\| ID \| Name \| Status \| Parent Direction \| Purpose \| Trigger \/ input \| Result \/ end state \| Boundaries \|/i,`${rel}: incomplete table contract`)}});

test('migrated application Directions route to Scenario Catalogs instead of Application Use-Case registries',()=>{
  for(const rel of ['planning/documentation/tools/tampermonkey/chat-command-palette/direction-registry.md','planning/documentation/tools/tampermonkey/linked-notes/direction-registry.md']){const text=read(rel);assert.match(text,/scenarios\/README\.md/);assert.doesNotMatch(text,/USE-CASE-REGISTRY\.md/)}
  const ids=semantic.USE_CASE_DEFINITIONS.map(d=>d.id);
});

test('application Direction registries link the real root Direction Registry, not placeholders',()=>{for(const rel of ['planning/documentation/tools/tampermonkey/chat-command-palette/direction-registry.md','planning/documentation/tools/tampermonkey/linked-notes/direction-registry.md','planning/documentation/tools/replacement-package-app/direction-registry.md']){const text=read(rel);assert.doesNotMatch(text,/<root planning direction registry>/);assert.match(text,/planning\/direction-registry\.md/)}});
test('documentation bootstrap Use Case projects to the sole stable bootstrap command identity',()=>{const orient=semantic.USE_CASE_DEFINITIONS.find((d)=>d.id==='UC-DOC-ORIENT');assert.ok(orient);assert.equal(orient.commandId,'documentation_principles.read');assert.equal(orient.label,'Bootstrap Reusable Documentation Governance')});
test('reusable prompt maintenance projection uses the current maintain identity',()=>{const prompt=semantic.USE_CASE_DEFINITIONS.find((d)=>d.id==='UC-DOC-MAINTAIN-PROMPT');assert.ok(prompt);assert.equal(prompt.label,'Create / Maintain Reusable Prompt')});

test('registered parallel-work Use Cases project from canonical registries',()=>{
  const defineScopes=semantic.USE_CASE_DEFINITIONS.find((d)=>d.id==='UC-REPO-DEFINE-PARALLEL-SCOPES');
  const parallel=semantic.USE_CASE_DEFINITIONS.find((d)=>d.id==='UC-REPO-PARALLEL-WORK');
  assert.ok(defineScopes);
  assert.ok(parallel);
  assert.equal(parallel.commandId,'parallel_workspace.start');
  assert.equal(parallel.label,'Work In Registered Parallel Scope(s)');
});

test('application planning semantic projection exposes current prototype/domain/slice-strategy route',()=>{
  const ids=semantic.USE_CASE_DEFINITIONS.map((d)=>d.id);
  for(const id of ['UC-PLAN-APP-CONCEPT','UC-PLAN-PROTOTYPE','UC-PLAN-SCENARIO-DISCOVERY','UC-PLAN-SCENARIO','UC-PLAN-DOMAIN','UC-PLAN-SLICE-STRATEGY','UC-PLAN-SLICE'])assert.ok(ids.includes(id),`missing ${id}`);
});

test('Workspace Planning Direction and fundamental UCs project from current registries',()=>{
  const direction=semantic.DIRECTION_DEFINITIONS.find((d)=>d.id==='DIR-PLAN-WORKSPACE');
  assert.ok(direction);
  assert.ok((direction.sources||[]).includes('planning/documentation/workspace-planning/use-case-registry.md'));
  const ids=semantic.USE_CASE_DEFINITIONS.map((d)=>d.id);
  for(const id of ['UC-PLAN-WORKSPACE-ESTABLISH-UC','UC-PLAN-WORKSPACE-CHANGE-UC','UC-PLAN-WORKSPACE-REVIEW-TOPOLOGY'])assert.ok(ids.includes(id),`missing ${id}`);
});

test('non-command semantic Use Case body keeps one focused current-owner route and explicit permission boundary',()=>{
  const domain=semantic.USE_CASE_DEFINITIONS.find((d)=>d.id==='UC-PLAN-DOMAIN');
  assert.ok(domain);
  const adaptive=semantic.buildSemanticBody('use_case',domain,'adaptive');
  const full=semantic.buildSemanticBody('use_case',domain,'full');
  for(const body of [adaptive,full]){
    assert.match(body,/\[PLANNING_USE_CASE\]/);
    assert.match(body,/use_case_id:\n  UC-PLAN-DOMAIN/);
    assert.match(body,/semantic_owner:/);
    assert.doesNotMatch(body,/\nfocus:/);
    assert.match(body,/route_resolution:/);
    assert.match(body,/current Main Owner \/ Owner Route/);
    assert.match(body,/permission:/);
    assert.match(body,/does not grant executable-command, repository-mutation, archive, commit or push permission/);
  }
  assert.match(full,/Full use_case reading is required/);
  assert.match(full,/complete relevant owner route/);
});


test('every projected Use Case has one current Direction and command-backed UCs remain semantic insertions',()=>{
  const directionIds=new Set(semantic.DIRECTION_DEFINITIONS.map((d)=>d.id));
  for(const uc of semantic.USE_CASE_DEFINITIONS){assert.ok(directionIds.has(uc.directionId),`${uc.id}: missing current Direction`)}
  const entries=semantic.buildSemanticEntries()[semantic.SURFACES.USE_CASES];
  const current=entries.find((entry)=>entry.id==='UC-REPO-CURRENT-STATE');
  assert.ok(current?.adaptiveBody);
  assert.match(current.adaptiveBody,new RegExp('use_case_id:\\n  UC-REPO-CURRENT-STATE'));
});

test('every visible planning command resolves through at least one current Direction',()=>{
  const commandDir=path.join(repoRoot,'planning','commands');
  const codec=require('../src/command-definition-codec.js');
  const directionIds=new Set(semantic.DIRECTION_DEFINITIONS.map((d)=>d.id));
  for(const name of fs.readdirSync(commandDir).filter((name)=>name.endsWith('.command.md'))){
    const definition=codec.parseCommandDefinitionDocument(fs.readFileSync(path.join(commandDir,name),'utf8'));
    if(definition.palette!==true)continue;
    const ids=semantic.directionIdsForCommand(definition);
    assert.ok(ids.length,`${definition.id}: no Direction`);
    for(const id of ids)assert.ok(directionIds.has(id),`${definition.id}: unknown Direction ${id}`);
  }
});

test('Application Realization projection matches selected comparative pre-Domain contract',()=>{const realization=semantic.USE_CASE_DEFINITIONS.find((d)=>d.id==='UC-PLAN-REALIZATION');assert.ok(realization);assert.equal(realization.label,'Review / Compare High-Level Application Realization');assert.match(realization.description,/candidate Domain variants/);assert.match(realization.instruction,/pre-Domain comparative evidence/);assert.match(realization.instruction,/Domain authority/);});

