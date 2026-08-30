import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const sideEffects=require('../src/command-side-effects.js');

const BASE='[PLANNING_COMMAND]\ncommand:\n  давай архив\n[/PLANNING_COMMAND]';
function storage(){let value=null;return{getItem(){return value},setItem(_k,v){value=v},value(){return value}};}
const LOC={origin:'https://chatgpt.com',pathname:'/c/conversation_12345678'};

test('ordinary invocation stays byte-for-byte unchanged even when command supports optional side effects',async()=>{
  assert.equal(await sideEffects.applyCommandSideEffects('replacement_archive.create',BASE),BASE);
  assert.deepEqual(sideEffects.commandSideEffectIds('replacement_archive.create'),['capture-chat-context']);
});

test('bind invocation captures current conversation in sessionStorage and appends one-invocation OBS-ACTION requirement',async()=>{
  const token='11111111-2222-4333-8444-555555555555',s=storage();
  const result=await sideEffects.applyCommandSideEffects('replacement_archive.create',BASE,{effectIds:['capture-chat-context'],randomUUID:()=>token,storage:s,location:LOC,title:'Current work — ChatGPT',now:()=> '2026-08-30T03:00:00Z'});
  assert.ok(result.startsWith(`${BASE}\n\n[PLANNING_COMMAND_SIDE_EFFECT]\n`));
  assert.match(result,/effect:\n  capture-chat-context/);
  assert.match(result,/chatContextToken:\n  11111111-2222-4333-8444-555555555555/);
  assert.match(result,/field:\n    chatContextToken/);
  assert.match(result,/scope:\n    this-invocation-only/);
  assert.match(result,/carryForward:\n    false/);
  const stored=JSON.parse(s.value());
  assert.deepEqual(stored.captures[token],{chatContextToken:token,conversationKey:'conversation_12345678',observedTitle:'Current work',capturedAt:'2026-08-30T03:00:00Z'});
  assert.equal(result.slice(0,BASE.length),BASE);
});

test('every explicit bind invocation gets a fresh token while older captures remain available in the tab session',async()=>{
  const tokens=['aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa','bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb'],s=storage(),randomUUID=()=>tokens.shift();
  const first=await sideEffects.applyCommandSideEffects('replacement_archive.create',BASE,{effectIds:['capture-chat-context'],randomUUID,storage:s,location:LOC,title:'Chat A'});
  const second=await sideEffects.applyCommandSideEffects('replacement_archive.create',BASE,{effectIds:['capture-chat-context'],randomUUID,storage:s,location:LOC,title:'Chat A'});
  assert.notEqual(first,second);
  const captures=JSON.parse(s.value()).captures;
  assert.deepEqual(Object.keys(captures).sort(),['aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa','bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb']);
  assert.equal(captures['aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'].conversationKey,captures['bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb'].conversationKey);
});

test('bind invocation fails closed outside an ordinary chat and does not write a capture',async()=>{
  const s=storage();
  await assert.rejects(sideEffects.applyCommandSideEffects('replacement_archive.create',BASE,{effectIds:['capture-chat-context'],randomUUID:()=> 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',storage:s,location:{origin:'https://chatgpt.com',pathname:'/'},title:'ChatGPT'}),/ordinary https:\/\/chatgpt.com\/c/);
  assert.equal(s.value(),null);
});

test('unregistered, invalid-token, unknown and bodyless side effects fail instead of silently sending incomplete invocation',async()=>{
  await assert.rejects(sideEffects.applyCommandSideEffects('other.command',BASE,{effectIds:['capture-chat-context']}),/not registered/);
  await assert.rejects(sideEffects.applyCommandSideEffects('replacement_archive.create',BASE,{effectIds:['capture-chat-context'],randomUUID:()=> 'bad',storage:storage(),location:LOC}),/invalid UUID v4/);
  await assert.rejects(sideEffects.applyCommandSideEffects('demo',BASE,{effectIds:['missing'],bindings:{demo:['missing']},handlers:{}}),/Unknown command side effect/);
  await assert.rejects(sideEffects.applyCommandSideEffects('demo',BASE,{effectIds:['empty'],bindings:{demo:['empty']},handlers:{empty:async()=>({body:''})}}),/returned no body/);
});
