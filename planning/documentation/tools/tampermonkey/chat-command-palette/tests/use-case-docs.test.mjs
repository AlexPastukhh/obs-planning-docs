import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const repoRoot=path.resolve(root,'../../../../..');
const catalog=fs.readFileSync(path.join(root,'scenarios/README.md'),'utf8');
const ids=['SCN-PH-DISCOVER','SCN-PH-USE','SCN-PH-MANAGE-LOCAL','SCN-PH-IMPORT','SCN-PH-CHECK-REPOSITORY','SCN-PH-SYNC','SCN-PH-PUBLISH','SCN-PH-RECOVER'];
function links(text){return [...text.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)].map((m)=>m[1]).filter((value)=>!/^https?:/.test(value));}
function resolveLink(base,link){const [filePart,fragment='']=link.split('#');const file=filePart?path.resolve(path.dirname(base),filePart):base;return{file,fragment};}
function slug(text){return text.toLowerCase().trim().replace(/[^a-z0-9\s-]/g,'').replace(/\s/g,'-');}
function anchors(text){const result=new Set([...text.matchAll(/<a\s+id="([^"]+)"/g)].map((m)=>m[1]));for(const match of text.matchAll(/^#{1,6}\s+(.+)$/gm))result.add(slug(match[1].replace(/`/g,'')));return result;}

test('Scenario Catalog contains the exact current Planning Helper Scenario set',()=>{const found=new Set([...catalog.matchAll(/`(SCN-PH-[A-Z-]+)`/g)].map((m)=>m[1]));assert.deepEqual([...found].sort(),ids.slice().sort())});

test('all local Markdown links in Scenario Catalog/manual acceptance resolve to files and anchors',()=>{for(const rel of ['scenarios/README.md','MANUAL-ACCEPTANCE.md']){const base=path.join(root,rel),text=fs.readFileSync(base,'utf8');for(const link of links(text)){const {file,fragment}=resolveLink(base,link);assert.ok(fs.existsSync(file),`${rel}: missing link target ${link}`);if(fragment){const target=fs.readFileSync(file,'utf8');assert.ok(anchors(target).has(fragment),`${rel}: missing anchor ${fragment} in ${path.relative(repoRoot,file)}`)}}}});

test('every canonical Planning Helper Scenario exposes implementation, automated evidence and manual acceptance',()=>{for(const id of ids){const file=path.join(root,'scenarios',`${id}.md`);assert.ok(fs.existsSync(file),`missing Scenario owner ${id}`);const section=fs.readFileSync(file,'utf8');assert.match(section,/\*\*Primary implementation:\*\*/);assert.match(section,/src\//);assert.match(section,/\*\*Automated evidence:\*\*/);assert.match(section,/tests\//);assert.match(section,/\*\*Manual acceptance:\*\*/);assert.match(section,/MANUAL-ACCEPTANCE\.md#/);}});
