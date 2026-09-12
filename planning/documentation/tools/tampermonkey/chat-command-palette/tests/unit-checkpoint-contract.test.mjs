import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);

const moduleRoot=path.resolve(import.meta.dirname,'..');
const repoRoot=path.resolve(moduleRoot,'../../../../..');
const components=require('../seed/semantic-components.json').items;

function readRepo(rel){return fs.readFileSync(path.join(repoRoot,rel),'utf8');}

test('generic Result Unit contract owns Opening/In-Unit/Closing applicability semantics',()=>{
  const rel='planning/documentation/idtspe-methodology/active/idtspe-core/shared/idtspe-unit-and-target-step-result-model.md';
  const text=readRepo(rel);
  assert.match(text,/Unit Applicability Envelope/i);
  assert.match(text,/Opening Unit Checkpoint/);
  assert.match(text,/In-Unit Applicability Check/);
  assert.match(text,/Closing Unit Checkpoint/);
  assert.match(text,/not the only moments|not.*only.*moments|may be repeated.*during/i);
  assert.match(text,/cached|reuse/i);
  assert.match(text,/NO_ADDITIONAL_LENS|mandatory Lens selection/i);
  assert.match(text,/reopen|refine/i);
});

test('every current Core/SDS Target Module explicitly wraps every processing-envelope Result Unit with Opening and Closing checkpoints',()=>{
  const modules=components.filter((component)=>component.kind==='TARGET_MODULE');
  assert.equal(modules.length,15);
  for(const component of modules){
    const owner=component.sources.at(-1),text=readRepo(owner);
    const units=[...text.matchAll(/^#### `([^`]+)` processing envelope$/gm)].map((match)=>match[1]);
    assert.ok(units.length>0,`${component.id}: no explicit Result Unit processing envelopes`);
    const unique=[...new Set(units)];
    assert.equal(unique.length,units.length,`${component.id}: duplicate processing-envelope heading`);
    for(const unit of units){
      assert.ok(text.includes('Opening Unit Checkpoint — `'+unit+'`'),`${component.id}/${unit}: missing Opening checkpoint`);
      assert.ok(text.includes('Closing Unit Checkpoint — `'+unit+'`'),`${component.id}/${unit}: missing Closing checkpoint`);
    }
  }
});

test('Pre-Update stays a Core one-unit optional Target Module and no duplicate Aggregate/plural-Slice module is active',()=>{
  const pre=components.find((component)=>component.id==='TM-PRE-UPDATE-PLAN');
  assert.ok(pre);assert.equal(pre.scope,'Core');
  const preText=readRepo(pre.sources.at(-1));
  assert.deepEqual([...preText.matchAll(/^#### `([^`]+)` processing envelope$/gm)].map((match)=>match[1]),['RU-PUPDATE-01']);
  assert.match(preText,/optional/i);
  assert.match(preText,/reviewable/i);
  assert.equal(components.some((component)=>component.id==='TM-AGGREGATE-DISCOVERY'),false);
  assert.equal(components.some((component)=>component.id==='TM-SLICE-STRATEGY'),false);
  const domain=components.find((component)=>component.id==='TM-DOMAIN-DISCOVERY');
  assert.ok(domain);assert.match(readRepo(domain.sources.at(-1)),/Aggregate/);
  const slice=components.find((component)=>component.id==='TM-IMPLEMENTATION-SLICE');
  assert.ok(slice);assert.match(readRepo(slice.sources.at(-1)),/This Target discovers \*\*one\*\* bounded Slice candidate|one\W+bounded Slice candidate/i);
});
