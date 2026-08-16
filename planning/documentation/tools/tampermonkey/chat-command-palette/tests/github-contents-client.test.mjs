import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const {GitHubContentsClient,GitHubClientError}=require('../src/github-contents-client.js');
const b64=(text)=>Buffer.from(text,'utf8').toString('base64');
function clientWith(handler){const calls=[];return{calls,client:new GitHubContentsClient({owner:'o',repo:'r',branch:'main',token:'t',transport:async(req)=>{calls.push(req);return handler(req,calls.length-1);}})}}

test('listDirectory and read are explicit GET operations with branch ref',async()=>{const{client,calls}=clientWith((req)=>req.url.includes('/contents/planning/commands?')?{status:200,text:JSON.stringify([{type:'file',path:'planning/commands/a.command.md',name:'a.command.md',sha:'sha-a',size:10}])}:{status:200,text:JSON.stringify({type:'file',path:'planning/commands/a.command.md',sha:'sha-a',content:b64('hello')})});const list=await client.listDirectory('planning/commands');assert.equal(list[0].sha,'sha-a');const file=await client.read('planning/commands/a.command.md');assert.equal(file.content,'hello');assert.equal(calls.length,2);assert.ok(calls.every((call)=>call.method==='GET'&&call.url.includes('ref=main')))});

test('saveVerified updates with base SHA and verifies exact read-back',async()=>{const{client,calls}=clientWith((req)=>{if(req.method==='PUT')return{status:200,text:JSON.stringify({content:{path:'planning/x.md',sha:'new'}})};return{status:200,text:JSON.stringify({type:'file',path:'planning/x.md',sha:'new',content:b64('exact')})}});const result=await client.saveVerified({path:'planning/x.md',content:'exact',baseSha:'old',message:'Update x'});assert.equal(result.sha,'new');const body=JSON.parse(calls[0].body);assert.equal(body.sha,'old');assert.equal(body.branch,'main');assert.equal(calls[1].method,'GET')});

test('404 is classified as not_found without hiding other failures',async()=>{const{client}=clientWith(()=>({status:404,text:JSON.stringify({message:'Not Found'})}));await assert.rejects(()=>client.read('planning/missing.md'),(error)=>error instanceof GitHubClientError&&error.kind==='not_found');});

test('client construction performs no network request',()=>{let calls=0;new GitHubContentsClient({owner:'o',repo:'r',branch:'main',transport:async()=>{calls++;return{status:500,text:'{}'}}});assert.equal(calls,0)});
