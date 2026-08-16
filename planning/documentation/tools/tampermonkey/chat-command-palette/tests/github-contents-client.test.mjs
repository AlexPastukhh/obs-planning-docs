import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require=createRequire(import.meta.url);
const gh=require('../src/github-contents-client.js');

test('path normalization rejects escapes',()=>{
  assert.equal(gh.normalizeGitHubContentPath('planning/commands/a.command.md'),'planning/commands/a.command.md');
  assert.throws(()=>gh.normalizeGitHubContentPath('../x'),/invalid segment/);
  assert.throws(()=>gh.normalizeGitHubContentPath('https://x'),/repository-relative/);
});

test('client exposes create-only PUT and no repository read/update helpers',async()=>{
  const requests=[];
  const transport=async(req)=>{requests.push(req);return{status:201,text:JSON.stringify({content:{path:'planning/commands/a.command.md',sha:'new',html_url:'https://example.invalid/a'}})}};
  const client=new gh.GitHubContentsClient({owner:'o',repo:'r',branch:'main',transport});
  assert.equal(typeof client.read,'undefined');
  assert.equal(typeof client.listDirectory,'undefined');
  assert.equal(typeof client.write,'undefined');
  assert.equal(typeof client.saveVerified,'undefined');
  const result=await client.create({path:'planning/commands/a.command.md',content:'hello',message:'Add a'});
  assert.equal(result.sha,'new');
  assert.equal(requests.length,1);
  assert.equal(requests[0].method,'PUT');
  assert.equal(new URL(requests[0].url).search,'');
  const body=JSON.parse(requests[0].body);
  assert.equal(body.sha,undefined);
  assert.equal(Buffer.from(body.content,'base64').toString('utf8'),'hello');
});

test('existing remote path conflict stops at PUT with no follow-up request',async()=>{
  let requests=0;
  const transport=async()=>{requests++;return{status:422,text:JSON.stringify({message:'sha was not supplied'})}};
  const client=new gh.GitHubContentsClient({owner:'o',repo:'r',branch:'main',transport});
  await assert.rejects(()=>client.create({path:'planning/commands/a.command.md',content:'hello'}),(error)=>error.kind==='conflict');
  assert.equal(requests,1);
});
