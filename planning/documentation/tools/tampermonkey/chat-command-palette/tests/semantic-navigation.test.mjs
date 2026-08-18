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
  ['planning/documentation/use-case-registry.md','UC-DOC-'],
  ['planning/areas/documentation-workbench/use-case-registry.md','UC-DW-'],
  ['planning/areas/planning-system/use-case-registry.md','UC-PR-'],
  ['planning/documentation/tools/tampermonkey/chat-command-palette/USE-CASE-REGISTRY.md','UC-PH-'],
  ['planning/documentation/tools/tampermonkey/linked-notes/USE-CASE-REGISTRY.md','UC-LN-'],
  ['planning/documentation/tools/replacement-package-app/USE-CASE-REGISTRY.md','UC-RPKG-']
];
function read(rel){return fs.readFileSync(path.join(repoRoot,rel),'utf8')}
function canonicalIds(rel,prefix){const text=read(rel), ids=[];for(const line of text.split(/\r?\n/)){let m=line.match(/^#{2,3} `((?:UC-[A-Z0-9-]+))` — /);if(!m)m=line.match(/^\| `((?:UC-[A-Z0-9-]+))` \|/);if(m&&m[1].startsWith(prefix)&&!ids.includes(m[1]))ids.push(m[1])}return ids}
function exactCaseExists(rel){let current=repoRoot;for(const segment of rel.split('/')){const names=fs.readdirSync(current);if(!names.includes(segment))return false;current=path.join(current,segment)}return fs.existsSync(current)}

test('semantic projection contains every current canonical Use Case exactly once',()=>{const expected=[];for(const [rel,prefix] of registries)expected.push(...canonicalIds(rel,prefix));const actual=semantic.USE_CASE_DEFINITIONS.map(d=>d.id);assert.equal(new Set(actual).size,actual.length,'duplicate projected Use-Case id');assert.deepEqual([...actual].sort(),[...new Set(expected)].sort())});

test('all semantic projection source paths exist with exact repository casing',()=>{for(const definition of [...semantic.ORIENTATION_DEFINITIONS,...semantic.DIRECTION_DEFINITIONS,...semantic.USE_CASE_DEFINITIONS])for(const source of definition.sources||[])assert.ok(exactCaseExists(source),`${definition.id}: missing/exact-case-invalid source ${source}`)});

test('root/documentation/planning table registries expose explicit complete UC contract',()=>{for(const rel of ['planning/use-case-registry.md','planning/documentation/use-case-registry.md','planning/documentation/application-planning/use-case-registry.md']){const text=read(rel);assert.match(text,/\| ID \| Name \| Status \| Parent Direction \| Purpose \| Trigger \/ input \| Result \/ end state \| Boundaries \|/i,`${rel}: incomplete table contract`)}});

test('detailed application registry entries state purpose trigger result boundaries and owner route',()=>{for(const [rel,prefix] of registries.slice(3)){const text=read(rel);for(const id of canonicalIds(rel,prefix)){const heading=new RegExp('^#{2,3} `'+id+'`.*$','m').exec(text);assert.ok(heading,`${rel}: missing detailed section for ${id}`);const after=heading.index+heading[0].length, rest=text.slice(after), next=rest.search(/^#{2,3} `UC-/m), section=text.slice(heading.index,next>=0?after+next:text.length);assert.match(section,/\*\*Status:\*\*/i,`${rel} ${id}: missing Status`);assert.match(section,/\*\*Parent Direction:\*\*/i,`${rel} ${id}: missing Parent Direction`);assert.match(section,/\*\*Purpose:\*\*/i,`${rel} ${id}: missing Purpose`);assert.match(section,/\*\*Trigger(?: \/ accepted input| \/ input|\/input)?:\*\*/i,`${rel} ${id}: missing Trigger`);assert.match(section,/\*\*Result(?: \/ end state)?:\*\*/i,`${rel} ${id}: missing Result`);assert.match(section,/\*\*Boundaries:\*\*/i,`${rel} ${id}: missing Boundaries`);assert.match(section,/\*\*Owner route:\*\*/i,`${rel} ${id}: missing Owner route`)}}});

test('application Direction registries link the real root Direction Registry, not placeholders',()=>{for(const rel of ['planning/documentation/tools/tampermonkey/chat-command-palette/direction-registry.md','planning/documentation/tools/tampermonkey/linked-notes/direction-registry.md','planning/documentation/tools/replacement-package-app/direction-registry.md']){const text=read(rel);assert.doesNotMatch(text,/<root planning direction registry>/);assert.match(text,/planning\/direction-registry\.md/)}});
test('documentation bootstrap Use Case projects to the sole stable bootstrap command identity',()=>{const orient=semantic.USE_CASE_DEFINITIONS.find((d)=>d.id==='UC-DOC-ORIENT');assert.ok(orient);assert.equal(orient.commandId,'documentation_principles.read');assert.equal(orient.label,'Bootstrap Reusable Documentation Governance')});
