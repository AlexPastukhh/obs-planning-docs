import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const {repositorySaveFailureMessage,groupEntriesByDirections,favoriteEntries}=require('../src/planning-helper-ui.js');

test('conflict with verified different remote reports confirmed divergence',()=>{
  const message=repositorySaveFailureMessage({kind:'conflict',message:'GitHub content changed since it was read and now differs from the intended file; nothing was overwritten.',details:{remoteSha:'fresh'}});
  assert.match(message,/content changed and differs from intended local content/);
  assert.doesNotMatch(message,/current remote content could not be verified/);
});

test('conflict whose reread fails reports unknown remote relation instead of divergence',()=>{
  const message=repositorySaveFailureMessage({kind:'conflict',message:'GitHub rejected the stale write and the current remote content could not be verified; nothing was overwritten.',details:{verificationCause:new Error('read failed')}});
  assert.match(message,/write conflicted; current remote content could not be verified/);
  assert.match(message,/nothing was overwritten/);
  assert.doesNotMatch(message,/differs from intended local content/);
});


test('direction grouping nests entries under current Directions and preserves cross-direction commands',()=>{
  const dirs=[{id:'DIR-A',label:'A'},{id:'DIR-B',label:'B'}];
  const entries=[{id:'one',directionId:'DIR-A'},{id:'two',directionIds:['DIR-A','DIR-B']},{id:'legacy'}];
  const groups=groupEntriesByDirections(entries,dirs);
  assert.deepEqual(groups.map((g)=>g.id),['DIR-A','DIR-B','OTHER']);
  assert.deepEqual(groups[0].entries.map((e)=>e.id),['one','two']);
  assert.deepEqual(groups[1].entries.map((e)=>e.id),['two']);
  assert.deepEqual(groups[2].entries.map((e)=>e.id),['legacy']);
});


test('favorites project the same rows above Directions without changing original grouping',()=>{const entries=[{id:'a',directionId:'DIR-A'},{id:'b',directionId:'DIR-A'}];assert.deepEqual(favoriteEntries(entries,['b']).map((e)=>e.id),['b']);const groups=groupEntriesByDirections(entries,[{id:'DIR-A',label:'A'}]);assert.deepEqual(groups[0].entries.map((e)=>e.id),['a','b']);});
