import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),moduleRoot=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),root=path.resolve(moduleRoot,'../../../../..');
const semantic=require('../src/semantic-projections.js'),body=require('../src/command-body.js'),codec=require('../src/command-definition-codec.js');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const active='planning/documentation/idtspe-methodology/active/',core=active+'idtspe-core/',sample=core+'examples/review-proposal-pre-update/',snapshot=active+'profiles/sds/examples/study-tab-launcher/';
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const items=JSON.parse(fs.readFileSync(path.join(moduleRoot,'seed/semantic-components.json'),'utf8')).items;
const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(d,e.name)):[path.join(d,e.name)]);
function hrefs(text){const clean=text.replace(/^```[^\n]*\n[\s\S]*?^```\s*$/gm,'');return [...clean.matchAll(/!?\[[^\]\n]*\]\((<[^>]+>|[^\s)]+)[^)]*\)|^\s*\[[^\]\n]+\]:\s*(<[^>]+>|[^\s]+)/gm)].map(m=>(m[1]||m[2]).replace(/^<|>$/g,''));}
function anchors(text){const ids=new Set([...text.matchAll(/(?:id|name)=["']([^"']+)["']/g)].map(m=>m[1]));const counts=new Map();for(const m of text.matchAll(/^#{1,6}\s+(.+)$/gm)){const slug=m[1].trim().toLowerCase().replace(/<[^>]*>/g,'').replace(/[^\p{L}\p{N}_\-\s]/gu,'').replace(/\s/g,'-');const n=counts.get(slug)||0;counts.set(slug,n+1);ids.add(slug+(n?'-'+n:''));}return ids;}
function checkLinks(file,{historical=false}={}){const errors=[];for(const href of hrefs(fs.readFileSync(file,'utf8'))){if(/^(https?:|mailto:|app:|obsidian:|vscode:|data:|\/\/)/i.test(href))continue;if(historical&&(/^sandbox:\/mnt\/data\//.test(href)||href==='...'||href==='direction-registry.md'&&file.endsWith('use-case-registry.pre-fundamental-uc.md')))continue;if(/^[A-Za-z]:/.test(href)){errors.push('absolute workspace link '+href);continue;}const [p,anchor]=href.split('#');let dest=path.resolve(path.dirname(file),decodeURI(p||''));if(!p)dest=file;if(!dest.startsWith(root+path.sep)){errors.push('outside package '+href);continue;}if(!fs.existsSync(dest)){errors.push('missing '+href);continue;}if(anchor&&dest.endsWith('.md')&&!anchors(fs.readFileSync(dest,'utf8')).has(decodeURIComponent(anchor)))errors.push('missing anchor '+href);}return errors.map(e=>path.relative(root,file)+': '+e);}

test('all registered Core aliases survive generated metadata and runtime normalization',()=>{
 const registry=read(core+'target-modules/TARGET-MODULE-REGISTRY.md');
 const mappings=[...registry.matchAll(/^idtspe ([a-z0-9][a-z0-9 ._-]*) <scope>\r?\n→ (TM-[A-Z0-9-]+)$/gm)];
 assert.equal(mappings.length,5);
 for(const [,alias,id] of mappings){const found=items.filter(i=>i.id===id);assert.equal(found.length,1);assert.deepEqual(found[0].aliases,[alias]);const normalized=semantic.normalizeSemanticComponent(found[0]);assert.deepEqual(normalized.aliases,[alias]);assert.equal(normalized.invocation,`idtspe tm ${id} <target>`);}
});

test('example-reading command and adaptive/full owner invocations preserve read-only guidance',()=>{
 const command=codec.parseCommandDefinitionDocument(read('planning/commands/read-methodology-examples.command.md'),{path:'planning/commands/read-methodology-examples.command.md'});
 assert.equal(command.id,'documentation.examples.read');assert.equal(command.permissionMode,'read-only');assert.ok(!command.methodologyBinding);
 assert.deepEqual(command.includes,['planning/commands/recheck-methodology-use-cases.command.md']);
 const uc=JSON.parse(fs.readFileSync(path.join(moduleRoot,'seed/use-cases.json'),'utf8')).items[0];
 for(const mode of ['adaptive','full'])for(const text of [body.buildCommandBody(command,mode),body.buildUseCaseInvocationBody({file:'invoke-use-case.command.md',keyReminders:[]},uc,mode),semantic.buildSemanticBody('use_case',uc,mode),semantic.buildSemanticBody('target_module',items.find(i=>i.id==='TM-REVIEW-FINDINGS'),mode),semantic.buildSemanticBody('lens',items.find(i=>i.id==='LENS-AUTHORITY-SOT-REUSE'),mode)])assert.match(text,/principles-and-terminology\.md#doc-example-reading/);
 assert.match(read('planning/documentation/principles-and-terminology.md'),/id="doc-example-reading"/);
});

test('dated Launcher copy and frozen review basis match their recorded hashes',()=>{
 const manifest=JSON.parse(read(snapshot+'snapshot-manifest.json'));
 const docs=manifest.files.filter(f=>f.kind==='live'&&f.source.startsWith('planning/documentation/'));
 assert.equal(docs.length,38);assert.equal(new Set(manifest.files.map(f=>f.file)).size,manifest.files.length);
 for(const f of manifest.files){const bytes=fs.readFileSync(path.join(root,snapshot,f.file));assert.equal(sha(bytes),f.copiedSha256,f.file);if(!f.linkRewrites&&!f.editorialRevisions?.length)assert.equal(f.sourceSha256,f.copiedSha256,f.file);if(f.editorialRevisions?.length)assert.equal(f.editorialRevisions.at(-1).afterSha256,f.copiedSha256,f.file);}
 for(const f of JSON.parse(read(sample+'source-basis/manifest.json')).files)assert.equal(sha(fs.readFileSync(path.join(root,sample,'source-basis',f.file))),f.sha256,f.file);
 // Historical embedded modules must not become duplicate active cards.
 assert.equal(items.filter(i=>i.id==='TM-SCENARIO-PLANNING').length,1);
 assert.ok(items.every(i=>!JSON.stringify(i.sources).includes('/examples/')));
});

test('new example entry paths and copied application owner links resolve locally',()=>{
 const files=[...walk(path.join(root,sample)).filter(p=>p.endsWith('.md')),path.join(root,active,'profiles/sds/examples/README.md'),path.join(root,snapshot,'README.md'),...walk(path.join(root,snapshot,'project/planning/documentation')).filter(p=>p.endsWith('.md')&&!p.includes(path.join('documentation','idtspe-methodology')))];
 const errors=files.flatMap(f=>checkLinks(f));assert.deepEqual(errors,[]);
 const owners=[...walk(path.join(root,core,'target-modules')),...walk(path.join(root,active,'profiles/sds/target-modules'))].filter(p=>p.endsWith('.md')&&fs.readFileSync(p,'utf8').includes('examples/study-tab-launcher')||p.endsWith('.md')&&fs.readFileSync(p,'utf8').includes('examples/review-proposal-pre-update'));
 assert.equal(owners.length,14);assert.ok(owners.some(f=>f.endsWith('TM-PLANNING-RESOLUTION-STATE.md')));assert.deepEqual(owners.flatMap(f=>checkLinks(f)),[]);
});

test('copied application links resolve to canonical repository owners without nested methodology',()=>{
 const manifest=JSON.parse(read(snapshot+'snapshot-manifest.json'));
 assert.equal(manifest.methodologyBinding.mode,'same-repository-canonical-owners');
 assert.ok(!fs.existsSync(path.join(root,snapshot,'project/planning/documentation/idtspe-methodology')));
 assert.ok(!fs.existsSync(path.join(root,snapshot,'source-context')));
 for(const f of manifest.files.filter(f=>f.file.endsWith('.md'))){
  const full=path.join(root,snapshot,f.file);
  for(const href of hrefs(fs.readFileSync(full,'utf8'))){
   if(/^(?:[a-z][a-z0-9+.-]*:|#)/i.test(href))continue;
   const target=path.resolve(path.dirname(full),decodeURI(href.split('#')[0]));
   if(target.includes(path.join('documentation','idtspe-methodology'))&&!target.startsWith(path.join(root,snapshot)))assert.ok(target.startsWith(path.join(root,'planning/documentation/idtspe-methodology')),href);
  }
 }
 const errors=manifest.files.filter(f=>f.file.endsWith('.md')).flatMap(f=>checkLinks(path.join(root,snapshot,f.file)));
 assert.deepEqual(errors,[]);
});

test('full documentation example command exposes both copied entry points without requiring a Target',()=>{
 const command=codec.parseCommandDefinitionDocument(read('planning/commands/read-full-documentation-example.command.md'),{path:'planning/commands/read-full-documentation-example.command.md'});
 assert.equal(command.id,'documentation.example.full.read');
 assert.equal(command.permissionMode,'read-only');
 assert.ok(!command.methodologyBinding);
 assert.deepEqual(command.includes,['planning/commands/recheck-methodology-use-cases.command.md']);
 for(const entry of [snapshot+'README.md',snapshot+'project/planning/documentation/README.md']){
  assert.ok(command.ownerFiles.includes(entry));assert.ok(fs.existsSync(path.join(root,entry)));
  for(const mode of ['adaptive','full'])assert.ok(body.buildCommandBody(command,mode).includes(entry));
 }
 assert.match(command.activeContextBehavior,/no existing Target/);
 assert.match(command.expectedOutput,/current versus unrealized/);
 assert.match(command.expectedOutput,/do not claim all files were read/);
});

test('Concept-first Application Definition inventory agrees across active models and examples while Lens stays routing-neutral',()=>{
 const expected=['05','02','03','04','07'];
 const modulePath=active+'profiles/sds/target-modules/TM-APPLICATION-DEFINITION.md';
 for(const file of [modulePath]){
  const text=read(file),inventory=text.slice(text.indexOf('| Result Unit | Meaning |'),text.indexOf('### Result Unit Applicability'));
  assert.deepEqual([...inventory.matchAll(/^\| `RU-APP-(\d+)`/gm)].map(m=>m[1]),expected,file);
  assert.deepEqual([...text.matchAll(/^#### `RU-APP-(\d+)` processing envelope/gm)].map(m=>m[1]),expected,file);
  assert.match(text,/<a id="application-definition-identity"><\/a>\r?\n### Application Concept/);
 }
 for(const file of [snapshot+'project/planning/documentation/application-definition.md','planning/documentation/tools/replacement-package-app/application-definition.md','planning/documentation/tools/tampermonkey/chat-command-palette/application-definition.proposal.md'])assert.deepEqual([...read(file).matchAll(/^## RU-APP-(\d+)/gm)].map(m=>m[1]),expected,file);
 const proposal=read('planning/documentation/tools/tampermonkey/chat-command-palette/application-definition.proposal.md');
 assert.match(proposal,/OPEN \/ unselected/);
 assert.doesNotMatch(proposal,/APP-PH \/ RU-APP-01/);
 const lensText=read('planning/documentation/idtspe-methodology/active/profiles/sds/lenses/reusable/LENS-APPLICATION-BOUNDARY-FEASIBILITY.md');
 assert.match(lensText,/Unit attachment remains owned by the relevant Target Module Unit definitions/);
 assert.doesNotMatch(lensText,/RU-APP-05, RU-APP-02, RU-APP-03, RU-APP-04, RU-APP-07/,'Lens must not own the concrete Application Unit inventory');
});

test('Study Tab Launcher live SDS example stays aligned with current realization and Practical Evidence contracts',()=>{
 const base=snapshot+'project/planning/documentation/';
 const practicalModel=read(active+'profiles/sds/target-modules/TM-PRACTICAL-TEST.md');
 const inventory=practicalModel.slice(practicalModel.indexOf('| Result Unit | Meaning |'),practicalModel.indexOf('### Result Unit Applicability'));
 const expectedHeadings=[...inventory.matchAll(/^\| `RU-PTEST-(\d+)` \| ([^|]+?) \|$/gm)].map(([,id,meaning])=>`RU-PTEST-${id} — ${meaning.split(' — ')[0].trim()}`);
 const campaignBlock=(practicalModel.match(/When repeated variants\/environments form a material practical campaign[\s\S]*?```text\r?\n([\s\S]*?)```/)||[])[1]||'';
 const campaignFields=campaignBlock.split(/\r?\n/).map(s=>s.trim()).filter(Boolean);
 assert.ok(campaignFields.length>=4,'TM-PRACTICAL-TEST should declare the material campaign boundary fields');
 for(const file of ['practical-tests/installed-browser-vscode-handoff.md','practical-tests/project-succession-multi-window.md']){
  const text=read(base+file);
  const headings=[...text.matchAll(/^## (RU-PTEST-\d+ — .+)$/gm)].map(m=>m[1]);
  assert.deepEqual(headings,expectedHeadings,file);
  assert.match(text,/^### Campaign boundary$/m,file);
  for(const field of campaignFields){
   const escaped=field.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
   assert.match(text,new RegExp(`\\*\\*${escaped}:\\*\\*`,'i'),`${file}: missing campaign field ${field}`);
  }
 }
 const evolution=read(base+'evolution/unrealized/close-superseded-project-windows.md');
 assert.match(evolution,/TM-CODE-REALIZATION\.md/);
 assert.doesNotMatch(evolution,/Literal endpoint\/class\/config\/test topology remains Core Exact territory|Literal test cases\/files belong to Core Exact/);
 const projectReadme=read(base+'README.md');
 assert.match(projectReadme,/Latest retained historical SDS methodology conformance review/);
 assert.doesNotMatch(projectReadme,/\[Current SDS methodology conformance review\]/);
 assert.doesNotMatch(projectReadme,/live as `DEC-\*` blocks in their natural Feature, Domain, Slice or Shared owners/);
 assert.match(projectReadme,/separate Decision record is retained only when the Core Carry-Forward/);
 const exampleReadme=read(snapshot+'README.md');
 assert.match(exampleReadme,/TM-CODE-REALIZATION/);
 assert.match(exampleReadme,/TM-CODE-REALIZATION[\s\S]{0,500}source\/test code[\s\S]{0,200}Code Realization Target/i);
});
