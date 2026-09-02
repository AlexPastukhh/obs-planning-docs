import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const {repositorySaveFailureMessage,favoriteEntries}=require('../src/planning-helper-ui.js');

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


test('favorites project selected stable IDs without requiring semantic grouping',()=>{const entries=[{id:'a'},{id:'b'}];assert.deepEqual(favoriteEntries(entries,['b']).map((e)=>e.id),['b']);});


test('UI source exposes explicit one-shot bind actions instead of making ordinary Copy/Insert binding',async()=>{const fs=await import('node:fs');const source=fs.readFileSync(new URL('../src/planning-helper-ui.js',import.meta.url),'utf8');assert.match(source,/Bind \+ Insert/);assert.match(source,/Bind \+ Copy/);assert.match(source,/capture-chat-context/);assert.match(source,/onGetInvocationSideEffects/);});
