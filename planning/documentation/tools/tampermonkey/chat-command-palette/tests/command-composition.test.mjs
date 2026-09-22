import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const catalog=require('../src/command-catalog.js');

const moduleRoot=path.resolve(import.meta.dirname,'..');
const repoRoot=path.resolve(moduleRoot,'../../../../..');
const commands=JSON.parse(fs.readFileSync(path.join(moduleRoot,'seed','commands.json'),'utf8')).items;
const byId=new Map(commands.map((command)=>[command.id,command]));

function closure(id,seen=new Set()){
  const command=byId.get(id);
  if(!command)return seen;
  for(const included of command.includes||[]){
    if(seen.has(included))continue;
    seen.add(included);
    closure(included,seen);
  }
  return seen;
}
function read(rel){return fs.readFileSync(path.join(repoRoot,rel),'utf8');}
const base=['idtspe.work','idtspe.port-composition.recheck','idtspe.port.trace'];

test('every Planning Command composition reaches the mandatory methodology Use-Case registry recheck',()=>{
  assert.ok(byId.has('methodology.use_cases.recheck'));
  for(const command of commands){
    if(command.id==='methodology.use_cases.recheck')continue;
    assert.ok(closure(command.id).has('methodology.use_cases.recheck'),command.id);
  }
});

test('normal IDTSPE work exposes trace, UC recheck and Port Composition recheck as first-class dependencies',()=>{
  assert.deepEqual(byId.get('idtspe.port.trace').includes,['methodology.use_cases.recheck']);
  assert.deepEqual(byId.get('idtspe.compose-current-work').includes,['idtspe.port.trace','methodology.use_cases.recheck']);
  assert.deepEqual(byId.get('idtspe.port-composition.recheck').includes,['idtspe.port.trace','methodology.use_cases.recheck','idtspe.compose-current-work']);
  assert.deepEqual(byId.get('idtspe.work').includes,['idtspe.port.trace','methodology.use_cases.recheck','idtspe.compose-current-work','idtspe.port-composition.recheck']);
});

test('specialized IDTSPE commands expose the base frame directly, not only transitively',()=>{
  const excluded=new Set(['idtspe.work','idtspe.port.trace','idtspe.compose-current-work','idtspe.port-composition.recheck','idtspe.trace.inline','idtspe.trace.artifact','idtspe.bootstrap']);
  for(const command of commands){
    const binding=command.methodologyBinding||{};
    if(binding.methodologyRuntime!=='IDTSPE'||excluded.has(command.id)||binding.surfaceKind==='BOOTSTRAP')continue;
    for(const id of base)assert.ok(command.includes.includes(id),`${command.id} missing ${id}`);
  }
});

test('Target Module and Lens prefixes expose full base plus their named port/meta-model path',()=>{
  assert.deepEqual(byId.get('idtspe.port.target').includes,[...base]);
  assert.deepEqual(byId.get('idtspe.target-module.apply').includes,[...base,'idtspe.port.target']);
  assert.deepEqual(byId.get('idtspe.port.lens').includes,[...base]);
  assert.deepEqual(byId.get('idtspe.lens.apply').includes,[...base,'idtspe.port.lens']);
  assert.deepEqual(byId.get('idtspe.lenses.select').includes,[...base,'idtspe.port.lens']);
  for(const command of commands){
    const binding=command.methodologyBinding||{};
    if(['TARGET_MODULE','TARGET_MODULE_FOCUSED'].includes(binding.surfaceKind)){
      for(const id of [...base,'idtspe.port.target','idtspe.target-module.apply'])assert.ok(command.includes.includes(id),`${command.id} missing ${id}`);
    }
    if(binding.surfaceKind==='LENS'){
      for(const id of [...base,'idtspe.port.lens','idtspe.lens.apply'])assert.ok(command.includes.includes(id),`${command.id} missing ${id}`);
    }
  }
});

test('composition expansion is full-DAG first and produces dependencies-before-dependent order',()=>{
  const expanded=catalog.expandCommandComposition(commands,['tmcmd.screen']);
  const pos=new Map(expanded.order.map((id,index)=>[id,index]));
  for(const [id,command] of expanded.nodes.map((d)=>[d.id,d]))for(const dep of command.includes||[])assert.ok(pos.get(dep)<pos.get(id),`${dep} must precede ${id}`);
  assert.equal(expanded.order.at(-1),'tmcmd.screen');
  assert.ok(pos.get('idtspe.port.trace')<pos.get('idtspe.work'));
  assert.ok(pos.get('idtspe.compose-current-work')<pos.get('idtspe.port-composition.recheck'));
  assert.ok(pos.get('idtspe.port-composition.recheck')<pos.get('idtspe.work'));
  assert.ok(pos.get('idtspe.port.target')<pos.get('idtspe.target-module.apply'));
});

test('multiple roots share one merged dependency DAG',()=>{
  const expanded=catalog.expandCommandComposition(commands,['tmcmd.screen','lenscmd.simplicity.check','idtspe.review']);
  assert.equal(new Set(expanded.order).size,expanded.order.length);
  for(const id of ['methodology.use_cases.recheck','idtspe.port.trace','idtspe.port-composition.recheck','idtspe.work'])assert.equal(expanded.order.filter((x)=>x===id).length,1,id);
  assert.ok(expanded.order.includes('idtspe.port.target'));
  assert.ok(expanded.order.includes('idtspe.port.lens'));
  assert.ok(expanded.order.includes('idtspe.port.validation'));
});

test('composition planning collects declarative contributions from the complete DAG before semantic execution',()=>{
  const expanded=catalog.expandCommandComposition(commands,['tmcmd.screen']);
  assert.ok(expanded.contributions.some((item)=>item.kind==='WORKING_TRACE_REQUIRED'&&item.value==='P-02'));
  assert.ok(expanded.contributions.some((item)=>item.kind==='PORT_CAPABILITY_REQUIREMENT'&&item.value==='TARGET'));
  assert.ok(expanded.contributions.some((item)=>item.kind==='SELECTED_TARGET_MODULE'&&item.value==='TM-SCREEN'));
});

test('trace configuration refines P-02 without forcing substantive IDTSPE work',()=>{
  for(const id of ['idtspe.trace.inline','idtspe.trace.artifact']){
    const command=byId.get(id);
    assert.deepEqual(command.includes,['idtspe.port.trace']);
    assert.ok(!closure(id).has('idtspe.work'),id);
    assert.ok(!closure(id).has('idtspe.port-composition.recheck'),id);
    assert.ok(closure(id).has('methodology.use_cases.recheck'),id);
  }
});

test('review prerequisites precede review while Finding and Need disposition remain downstream outputs',()=>{
  const review=byId.get('idtspe.review');
  assert.ok(review.includes.includes('idtspe.lenses.apply-selected'));
  assert.ok(!review.includes.includes('idtspe.findings.review'));
  assert.ok(!review.includes.includes('idtspe.needs.review'));
  const consistency=byId.get('idtspe.review_consistency');
  assert.ok(!consistency.includes.includes('idtspe.findings.review'));
  assert.ok(review.ownerRefs.some((ref)=>ref.responsibilityId==='RESOLUTION.FINDING-DISPOSITION'&&ref.readMode==='ON_DEMAND'));
  assert.ok(review.ownerRefs.some((ref)=>ref.responsibilityId==='RESOLUTION.NEED-CANDIDATE-DISPOSITION'&&ref.readMode==='ON_DEMAND'));
});

test('selected Lens application is a separate operation after selection',()=>{
  const apply=byId.get('idtspe.lenses.apply-selected');
  assert.ok(apply.includes.includes('idtspe.lenses.select'));
  assert.ok(apply.includes.includes('idtspe.port.lens'));
  assert.ok(!apply.includes.includes('idtspe.lens.apply'));
});

test('Target port owns bounded Target formation while Target Module apply explicitly references Unit mechanics',()=>{
  const target=byId.get('idtspe.port.target');
  const apply=byId.get('idtspe.target-module.apply');
  assert.ok(target.ownerFiles.some((x)=>x.endsWith('/RESOLUTION-SLOT-AND-TARGET-FORMATION-SET.md')));
  assert.ok(!target.ownerFiles.some((x)=>x.endsWith('/TARGET-MODULE-MODEL.md')));
  for(const rid of ['TARGET-MODULE.META-MODEL','TARGET-MODULE.DISCOVERY','TWU.UNIT-CONTRACT','TWU.COLLECTION-CONTRACT','TWU.SLOT-CONTRACT','TWU.RUNTIME-PROJECTION','TWU.APPLICABILITY-DISPOSITION','TWU.TARGET-STEP-RESULT']){
    assert.ok(apply.ownerRefs.some((ref)=>ref.responsibilityId===rid),rid);
  }
});

test('IDTSPE Pass command own refs explain why each added canonical reference is needed',()=>{
  const order=JSON.parse(fs.readFileSync(path.join(moduleRoot,'catalog-order.json'),'utf8'));
  const ids=order.commandGroups.filter((g)=>g.viewId==='IDTSPE_PASS').flatMap((g)=>g.items);
  for(const id of ids){
    const command=byId.get(id);assert.ok(command,id);
    assert.ok(command.ownerRefs?.length,`${id}: ownerRefs`);
    for(const ref of command.ownerRefs){
      assert.ok(ref.responsibilityId,`${id}: responsibilityId`);
      assert.ok(ref.path,`${id}: path`);
      assert.ok(ref.why,`${id}: why`);
      assert.ok(ref.role,`${id}: role`);
    }
  }
});

test('P-02 owns one incremental working trace that is reused for composition orientation and final visibility',()=>{
  const trace=read('planning/documentation/idtspe-methodology/active/idtspe-core/runtime/PASS-TRACE-AND-VISIBILITY-CONTRACT.md');
  assert.match(trace,/Working Orientation Surface/);
  assert.match(trace,/Incremental-First Principle/);
  assert.match(trace,/selected root commands\/components/);
  assert.match(trace,/same.*trace/is);
  assert.match(trace,/Do not create a second watch\/to-do\/ledger file/i);
  assert.match(trace,/final trace MUST NOT normally be reconstructed from model memory/i);
  assert.match(trace,/This is a recovery path only/i);
});

test('Target Module Instance cardinality is explicit without creating a second Target',()=>{
  const meta=read('planning/documentation/idtspe-methodology/active/idtspe-core/target-modules/TARGET-MODULE-MODEL.md');
  const relation=read('planning/documentation/idtspe-methodology/active/idtspe-core/runtime/target-work/TARGET-CONTRACT-INSTANCE-SOURCE-RELATION-MODEL.md');
  for(const text of [meta,relation]){
    assert.match(text,/0\.\.N.*Target Module Instance/is);
    assert.match(text,/not (?:another|a second) Target/i);
    assert.match(text,/Merely consulting.*Model.*does not.*(?:instantiate|create an Instance)/is);
  }
});

test('active Lens selection no longer depends on historical TF-06A or a fixed LENS_SET field',()=>{
  for(const rel of [
    'planning/command-routing.md',
    'planning/commands/README.md',
    'planning/commands/select-idtspe-lenses.command.md',
    'planning/documentation/idtspe-methodology/active/idtspe-core/runtime/IDTSPE-RUNTIME-COMPOSITION-CONTRACT.md'
  ]){
    const text=read(rel);
    assert.doesNotMatch(text,/TF-06A|LENS_SET/,rel);
  }
});

test('every structured command ownerRef resolves to an existing file and anchor',()=>{
  const headingSlug=(value)=>value
    .toLowerCase()
    .replace(/<[^>]+>/g,'')
    .replace(/[`*_~]/g,'')
    .replace(/[^\p{L}\p{N}_\- ]/gu,'')
    .trim()
    .replace(/\s+/g,'-')
    .replace(/-+/g,'-');
  const cache=new Map();
  const anchorsFor=(rel)=>{
    if(cache.has(rel))return cache.get(rel);
    const abs=path.join(repoRoot,rel);
    assert.ok(fs.existsSync(abs),`missing ownerRef file: ${rel}`);
    const text=fs.readFileSync(abs,'utf8');
    const anchors=new Set([...text.matchAll(/<a\s+id=["']([^"']+)["']\s*>/gi)].map((m)=>m[1]));
    for(const line of text.split(/\r?\n/)){
      const match=line.match(/^#{1,6}\s+(.+)$/);
      if(match)anchors.add(headingSlug(match[1]));
    }
    cache.set(rel,anchors);
    return anchors;
  };
  for(const command of commands){
    for(const ref of command.ownerRefs||[]){
      assert.ok(ref.anchor,`${command.id}: ownerRef ${ref.responsibilityId} must use an exact anchor`);
      assert.ok(anchorsFor(ref.path).has(ref.anchor),`${command.id}: missing anchor ${ref.path}#${ref.anchor}`);
    }
  }
});
