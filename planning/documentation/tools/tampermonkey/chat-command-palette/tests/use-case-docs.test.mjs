import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const repoRoot=path.resolve(root,'../../../../..');
const registry=fs.readFileSync(path.join(root,'USE-CASE-REGISTRY.md'),'utf8');
const map=fs.readFileSync(path.join(root,'USE-CASE-MAP.md'),'utf8');
const ids=['UC-PH-DISCOVER','UC-PH-USE','UC-PH-MANAGE-LOCAL','UC-PH-IMPORT','UC-PH-CHECK-REPOSITORY','UC-PH-SYNC','UC-PH-PUBLISH','UC-PH-RECOVER'];
function links(text){return [...text.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)].map((m)=>m[1]).filter((value)=>!/^https?:/.test(value));}
function resolveLink(base,link){const [filePart,fragment='']=link.split('#');const file=filePart?path.resolve(path.dirname(base),filePart):base;return{file,fragment};}
function slug(text){return text.toLowerCase().trim().replace(/[^a-z0-9\s-]/g,'').replace(/\s/g,'-');}
function anchors(text){const result=new Set([...text.matchAll(/<a\s+id="([^"]+)"/g)].map((m)=>m[1]));for(const match of text.matchAll(/^#{1,6}\s+(.+)$/gm))result.add(slug(match[1].replace(/`/g,'')));return result;}

test('registry and map contain the same exact canonical UC-PH set',()=>{const extract=(text)=>new Set([...text.matchAll(/`(UC-PH-[A-Z-]+)`/g)].map((m)=>m[1]));assert.deepEqual([...extract(registry)].sort(),ids.slice().sort());assert.deepEqual([...extract(map)].sort(),ids.slice().sort())});

test('all local Markdown links in registry/map/manual acceptance resolve to files and anchors',()=>{for(const rel of ['USE-CASE-REGISTRY.md','USE-CASE-MAP.md','MANUAL-ACCEPTANCE.md']){const base=path.join(root,rel),text=fs.readFileSync(base,'utf8');for(const link of links(text)){const {file,fragment}=resolveLink(base,link);assert.ok(fs.existsSync(file),`${rel}: missing link target ${link}`);if(fragment){const target=fs.readFileSync(file,'utf8');assert.ok(anchors(target).has(fragment),`${rel}: missing anchor ${fragment} in ${path.relative(repoRoot,file)}`)}}}});

test('every canonical map section exposes concrete implementation, tests and manual acceptance',()=>{for(const id of ids){const anchor=id.toLowerCase();const start=map.indexOf(`<a id="${anchor}"></a>`);assert.ok(start>=0,`missing map anchor ${anchor}`);const next=map.indexOf('<a id="uc-ph-',start+1);const section=map.slice(start,next<0?map.length:next);assert.match(section,/\*\*Primary implementation:\*\*/);assert.match(section,/src\//);assert.match(section,/\*\*Automated evidence:\*\*/);assert.match(section,/tests\//);assert.match(section,/\*\*Manual acceptance:\*\*/);assert.match(section,/MANUAL-ACCEPTANCE\.md#/);}});
