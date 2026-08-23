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
const codec=require('../src/command-definition-codec.js');
const directions=semantic.normalizeDirectionDefinitions(JSON.parse(fs.readFileSync(path.join(moduleRoot,'seed/directions.json'),'utf8')).items);
const useCases=semantic.normalizeUseCaseDefinitions(JSON.parse(fs.readFileSync(path.join(moduleRoot,'seed/use-cases.json'),'utf8')).items);
const read=(rel)=>fs.readFileSync(path.join(repoRoot,rel),'utf8');
function walk(dir,result=[]){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,entry.name);if(entry.isDirectory())walk(p,result);else if(entry.isFile()&&entry.name.toLowerCase()==='use-case-registry.md')result.push(p)}return result}
function canonicalUcIds(){const ids=[];for(const file of walk(path.join(repoRoot,'planning'))){const lines=fs.readFileSync(file,'utf8').split(/\r?\n/),status=String(lines.find((line)=>/^Status:/i.test(line))||'').toLowerCase();if(status.includes('legacy')||status.includes('historical')||status.includes('compatibility'))continue;for(const line of lines){let m=line.match(/^#{2,3} `((?:UC-[A-Z0-9-]+))` — /);if(!m)m=line.match(/^\| `((?:UC-[A-Z0-9-]+))` \|/);if(m&&!ids.includes(m[1]))ids.push(m[1])}}return ids}
function canonicalDirectionIds(){const ids=[];for(const line of read('planning/direction-registry.md').split(/\r?\n/)){const m=line.match(/^\| `((?:DIR-[A-Z0-9-]+))` \|/);if(m&&!ids.includes(m[1]))ids.push(m[1])}return ids}
function exactCaseExists(rel){let current=repoRoot;for(const segment of rel.split('/')){if(!fs.existsSync(current))return false;const names=fs.readdirSync(current);if(!names.includes(segment))return false;current=path.join(current,segment)}return fs.existsSync(current)}

test('generated Direction seed contains every current root Direction exactly once',()=>{const expected=canonicalDirectionIds(),actual=directions.map((d)=>d.id);assert.equal(new Set(actual).size,actual.length);assert.deepEqual([...actual].sort(),[...expected].sort());assert.equal(actual.length,11)});

test('generated Use-Case seed contains every current canonical UC exactly once',()=>{const expected=canonicalUcIds(),actual=useCases.map((u)=>u.id);assert.equal(new Set(actual).size,actual.length);assert.deepEqual([...actual].sort(),[...expected].sort());assert.equal(actual.length,expected.length);assert.ok(!actual.some((id)=>id.startsWith('UC-RPKG-')),'legacy Replacement Package App capability IDs must not be projected as current UCs')});

test('all generated semantic source paths exist with exact repository casing',()=>{for(const definition of [...directions,...useCases])for(const source of definition.sources||[])assert.ok(exactCaseExists(source),`${definition.id}: missing/exact-case-invalid source ${source}`)});

test('every current Use Case resolves through exactly one current Direction',()=>{const ids=new Set(directions.map((d)=>d.id));for(const uc of useCases)assert.ok(ids.has(uc.directionId),`${uc.id}: missing current Direction`)});

test('Use-Case semantic bodies remain thin owner-route projections with explicit permission boundary',()=>{const domain=useCases.find((u)=>u.id==='UC-PLAN-DOMAIN');assert.ok(domain);for(const mode of ['adaptive','full']){const body=semantic.buildSemanticBody('use_case',domain,mode);assert.match(body,/\[PLANNING_USE_CASE\]/);assert.match(body,/use_case_id:\n  UC-PLAN-DOMAIN/);assert.match(body,/route_resolution:/);assert.match(body,/current Main Owner \/ Owner Route/);assert.match(body,/Semantic planning\/read context only/)}assert.match(semantic.buildSemanticBody('use_case',domain,'full'),/Full use_case reading is required/)});

test('all visible repository commands resolve through at least one current Direction',()=>{const directionIds=new Set(directions.map((d)=>d.id)),commandDir=path.join(repoRoot,'planning','commands');for(const name of fs.readdirSync(commandDir).filter((n)=>n.endsWith('.command.md'))){const definition=codec.parseCommandDefinitionDocument(fs.readFileSync(path.join(commandDir,name),'utf8'));if(definition.palette!==true)continue;const ids=semantic.directionIdsForCommand(definition,useCases);assert.ok(ids.length,`${definition.id}: no Direction`);for(const id of ids)assert.ok(directionIds.has(id),`${definition.id}: unknown Direction ${id}`)}});

test('important direct command-backed UCs resolve to their bespoke command routes',()=>{for(const [id,commandId] of [['UC-REPO-AUDIT-REVIEW','review_audit.recheck'],['UC-PLAN-ARCH-WORKSPACE-USES','workspace_uses.discover'],['UC-PLAN-ARCH-DISCOVER-WEUC','architecture_weuc.discover'],['UC-PLAN-DOMAIN','application_domain.plan'],['UC-PLAN-SLICE','application_slice.plan'],['UC-PLAN-TEST-PLAN','practical_testing.plan'],['UC-DOC-ORIENT','documentation_principles.read']]){const uc=useCases.find((u)=>u.id===id);assert.ok(uc,id);assert.equal(uc.commandId,commandId,id)}});

test('Application Realization projection is generic while its owner carries runtime/architecture handoff semantics',()=>{const realization=useCases.find((u)=>u.id==='UC-PLAN-REALIZATION');assert.ok(realization);assert.equal(realization.label,'Review / Compare High-Level Application Realization');assert.match(realization.instruction,/current canonical registry/);assert.doesNotMatch(realization.instruction,/hardcoded|pre-Domain comparative evidence/);const owner=read('planning/documentation/application-planning/application-realization-workflow.md');assert.match(owner,/Architecture Cost Handoff/);assert.match(owner,/runtime/i)});

test('SDS profiles keep same quality and explicit Step 0–4 with pre-implementation test planning',()=>{const text=read('planning/documentation/profiles/sds-planning-profiles.md');assert.match(text,/same planning-quality contract/i);assert.match(text,/STEP 0 — WHY \/ SOLUTION DISCOVERY/);assert.match(text,/Scenario DATA/);assert.match(text,/Behavior Items/);assert.match(text,/application-plan\.md/);assert.match(text,/domain-draft\.md/);assert.match(text,/slices\.md/);assert.match(text,/contextual WEUC Instances/);assert.match(text,/Test Design/);assert.match(text,/Practical Test Plan/);assert.match(text,/STEP 4 — PRACTICAL REALIZATION FEEDBACK/);assert.match(text,/actual evidence/i);assert.doesNotMatch(text,/Goal Map/i)});

test('semantic runtime source contains no maintained current Direction/UC catalog identities',()=>{const source=fs.readFileSync(path.join(moduleRoot,'src/semantic-projections.js'),'utf8');for(const identity of ['UC-PLAN-DOMAIN','UC-REPO-CURRENT-STATE','DIR-PLAN-SOLUTION','application_domain.plan'])assert.doesNotMatch(source,new RegExp(identity.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')));assert.match(source,/normalizeDirectionDefinitions/);assert.match(source,/normalizeUseCaseDefinitions/)});
