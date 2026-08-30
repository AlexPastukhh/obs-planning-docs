import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const sideEffects=require('../src/command-side-effects.js');

const BASE='[PLANNING_COMMAND]\ncommand:\n  давай архив\n[/PLANNING_COMMAND]';

test('commands without a registered side effect remain byte-for-byte unchanged',async()=>{
  assert.equal(await sideEffects.applyCommandSideEffects('other.command',BASE,{randomUUID:()=> 'unused'}),BASE);
});

test('replacement archive invocation appends a separate capture-chat-context body after the canonical body',async()=>{
  const token='11111111-2222-4333-8444-555555555555';
  const result=await sideEffects.applyCommandSideEffects('replacement_archive.create',BASE,{randomUUID:()=>token});
  assert.ok(result.startsWith(`${BASE}\n\n[PLANNING_COMMAND_SIDE_EFFECT]\n`));
  assert.match(result,/effect:\n  capture-chat-context/);
  assert.match(result,new RegExp(`chatContextToken:\\n  ${token}`));
  assert.ok(result.endsWith('[/PLANNING_COMMAND_SIDE_EFFECT]'));
  assert.equal(result.slice(0,BASE.length),BASE);
});

test('capture-chat-context generates a fresh token for every invocation',async()=>{
  const tokens=['aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa','bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb'];
  const randomUUID=()=>tokens.shift();
  const first=await sideEffects.applyCommandSideEffects('replacement_archive.create',BASE,{randomUUID});
  const second=await sideEffects.applyCommandSideEffects('replacement_archive.create',BASE,{randomUUID});
  assert.match(first,/aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa/);
  assert.match(second,/bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb/);
  assert.notEqual(first,second);
});

test('side-effect framework awaits arbitrary registered code and appends exactly the returned body',async()=>{
  const calls=[];
  const result=await sideEffects.applyCommandSideEffects('demo',BASE,{bindings:{demo:['one','two']},handlers:{one:async(ctx)=>{calls.push(ctx.commandId);return{body:'[ONE]\na: 1\n[/ONE]'};},two:async()=>({body:'[TWO]\nb: 2\n[/TWO]'})}});
  assert.equal(result,`${BASE}\n\n[ONE]\na: 1\n[/ONE]\n\n[TWO]\nb: 2\n[/TWO]`);
  assert.deepEqual(calls,['demo']);
});

test('configured unknown or bodyless side effects fail instead of silently sending an incomplete invocation',async()=>{
  await assert.rejects(sideEffects.applyCommandSideEffects('demo',BASE,{bindings:{demo:['missing']},handlers:{}}),/Unknown command side effect/);
  await assert.rejects(sideEffects.applyCommandSideEffects('demo',BASE,{bindings:{demo:['empty']},handlers:{empty:async()=>({body:''})}}),/returned no body/);
});
