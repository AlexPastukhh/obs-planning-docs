import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require=createRequire(import.meta.url);
const codec=require('../src/helper-library-codec.js');
Object.assign(globalThis,{ObsPlanningHelper:{...codec}});
const {RepositoryHelperLibraryService}=require('../src/repository-helper-library-service.js');

class FakeClient{
  constructor(files={},identity={}){this.files=new Map(Object.entries(files));this.owner=identity.owner||'AlexPastukhh';this.repo=identity.repo||'obs-planning-docs';this.branch=identity.branch||'main';this.writes=[];}
  async listDirectory(path){const prefix=`${path}/`;const rows=[...this.files].filter(([p])=>p.startsWith(prefix)&&!p.slice(prefix.length).includes('/')).map(([p,v])=>({type:'file',path:p,name:p.slice(prefix.length),sha:v.sha}));if(!rows.length)throw Object.assign(new Error('not found'),{kind:'not_found'});return rows;}
  async read(path){const v=this.files.get(path);if(!v)throw Object.assign(new Error('not found'),{kind:'not_found'});return{path,sha:v.sha,content:v.content};}
  async saveVerified({path,content,baseSha}){const current=this.files.get(path);if(current&&current.sha!==baseSha)throw Object.assign(new Error('conflict'),{kind:'conflict'});if(!current&&baseSha)throw Object.assign(new Error('missing'),{kind:'conflict'});if(current&&!baseSha)throw Object.assign(new Error('exists'),{kind:'conflict'});const sha=`s${this.writes.length+1}`;this.files.set(path,{sha,content});this.writes.push({path,baseSha});return{path,sha,content};}
}
const item=(kind='prompt',id='demo')=>codec.normalizeHelperLibraryItem({kind,id,title:'Demo',text:'Exact text',createdAt:'2026-08-15T00:00:00Z',updatedAt:'2026-08-15T00:00:00Z'});

test('empty helper-library directories load as an empty repository library',async()=>{const service=new RepositoryHelperLibraryService(new FakeClient());assert.deepEqual(await service.loadAll(),[]);});

test('preview/save create is path-confined and exact',async()=>{const client=new FakeClient();const service=new RepositoryHelperLibraryService(client);const plan=await service.previewSave(item('prompt','demo'));assert.equal(plan.action,'create');assert.equal(plan.path,'planning/helper-library/prompts/demo.prompt.md');assert.equal(plan.repository.sourceKey,'alexpastukhh/obs-planning-docs@main');const result=await service.savePreviewPlan(plan);assert.equal(result.ok,true);assert.equal(client.writes.length,1);assert.deepEqual(codec.parseHelperLibraryDocument(client.files.get(plan.path).content,{path:plan.path}),plan.item);});

test('stale create and stale update stop before writes',async()=>{
  const path='planning/helper-library/prompts/demo.prompt.md';const old=item('prompt','demo');const client=new FakeClient();const service=new RepositoryHelperLibraryService(client);const createPlan=await service.previewSave(old);client.files.set(path,{sha:'someone',content:codec.renderHelperLibraryDocument(old)});await assert.rejects(service.savePreviewPlan(createPlan),(error)=>error.kind==='conflict'&&/appeared/.test(error.message));assert.equal(client.writes.length,0);
  const client2=new FakeClient({[path]:{sha:'old',content:codec.renderHelperLibraryDocument(old)}});const service2=new RepositoryHelperLibraryService(client2);const updatePlan=await service2.previewSave({...old,text:'new local'});client2.files.set(path,{sha:'changed',content:codec.renderHelperLibraryDocument({...old,text:'remote changed'})});await assert.rejects(service2.savePreviewPlan(updatePlan),(error)=>error.kind==='conflict'&&/changed/.test(error.message));assert.equal(client2.writes.length,0);
});

test('repository identity is part of the helper-library preview plan',async()=>{const client=new FakeClient();const service=new RepositoryHelperLibraryService(client);const plan=await service.previewSave(item('command','demo-command'));client.branch='dev';await assert.rejects(service.savePreviewPlan(plan),(error)=>error.kind==='conflict'&&/Repository target changed/.test(error.message));assert.equal(client.writes.length,0);});
