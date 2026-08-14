import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require=createRequire(import.meta.url);
const codec=require('../src/helper-library-codec.js');

test('helper library renders and parses exact command and prompt documents',()=>{
  const command=codec.normalizeHelperLibraryItem({kind:'command',id:'my-command',title:'My command',text:'do the thing',createdAt:'2026-08-15T00:00:00Z',updatedAt:'2026-08-15T00:00:00Z'});
  const text=codec.renderHelperLibraryDocument(command);
  assert.deepEqual(codec.parseHelperLibraryDocument(text,{path:'planning/helper-library/commands/my-command.helper-command.md'}),command);
  const prompt=codec.normalizeHelperLibraryItem({kind:'prompt',id:'review-prompt',title:'Review',text:'Review this carefully.'});
  assert.equal(codec.helperLibraryTargetPath(prompt),'planning/helper-library/prompts/review-prompt.prompt.md');
});

test('helper library rejects path drift and unsupported fields',()=>{
  const item=codec.normalizeHelperLibraryItem({kind:'prompt',id:'one',title:'One',text:'Text'});
  const text=codec.renderHelperLibraryDocument(item);
  assert.throws(()=>codec.parseHelperLibraryDocument(text,{path:'planning/helper-library/prompts/two.prompt.md'}),/path does not match/);
  const bad=text.replace('"updatedAt":','"secret": "nope",\n  "updatedAt":');
  assert.throws(()=>codec.parseHelperLibraryDocument(bad),/Unsupported helper-library field: secret/);
});

test('legacy local command projections migrate to exact local helper commands',()=>{
  const raw=JSON.stringify({schemaVersion:1,commands:[{id:'local:old:1',command:'мой локальный тест',englishName:'my local test',family:'`мой локальный тест` / `my test`',reminders:['keep literal'],target:'<target>',createdAt:'2026-08-14T00:00:00Z',updatedAt:'2026-08-14T01:00:00Z'}]});
  const [item]=codec.parseLegacyProjectionRegistry(raw,{now:'2026-08-15T00:00:00Z'});
  assert.equal(item.kind,'command');
  assert.equal(item.title,'my local test');
  assert.match(item.text,/\[PLANNING_COMMAND\]/);
  assert.match(item.text,/мой локальный тест/);
  assert.match(item.text,/keep literal/);
  assert.match(item.id,/^[a-z0-9][a-z0-9._-]+$/);
});

test('local helper items override repository items with the same kind and id',()=>{
  const remote=codec.normalizeHelperLibraryItem({kind:'prompt',id:'x',title:'Remote',text:'remote'});
  const local=codec.normalizeHelperLibraryItem({kind:'prompt',id:'x',title:'Local',text:'local'});
  const [merged]=codec.mergeHelperLibrary([remote],[local]);
  assert.equal(merged.text,'local');
  assert.equal(merged.source,'local+repo');
  assert.equal(merged.hasLocal,true);
  assert.equal(merged.hasRepo,true);
});


test('helper library preserves leading and trailing prompt whitespace while normalizing CRLF',()=>{
  const item=codec.normalizeHelperLibraryItem({kind:'prompt',id:'whitespace',title:'Whitespace',text:'  first\r\nsecond  \r\n'});
  assert.equal(item.text,'  first\nsecond  \n');
  const roundTrip=codec.parseHelperLibraryDocument(codec.renderHelperLibraryDocument(item),{path:'planning/helper-library/prompts/whitespace.prompt.md'});
  assert.equal(roundTrip.text,item.text);
});

test('helper library marker tokens inside arbitrary prompt text do not collide with document markers',()=>{
  const item=codec.normalizeHelperLibraryItem({kind:'prompt',id:'marker-text',title:'Marker text',text:'Mention [PLANNING_HELPER_LIBRARY_ITEM] and [/PLANNING_HELPER_LIBRARY_ITEM] literally.'});
  const roundTrip=codec.parseHelperLibraryDocument(codec.renderHelperLibraryDocument(item),{path:'planning/helper-library/prompts/marker-text.prompt.md'});
  assert.equal(roundTrip.text,item.text);
});

test('helper library title is a single printable line',()=>{
  assert.throws(()=>codec.normalizeHelperLibraryItem({kind:'prompt',id:'bad-title',title:'Bad\nTitle',text:'ok'}),/one printable line/);
});
