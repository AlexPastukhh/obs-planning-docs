import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const catalog=require('../src/command-catalog.js');
const bodyApi=require('../src/command-body.js');

const moduleRoot=path.resolve(import.meta.dirname,'..');
const repoRoot=path.resolve(moduleRoot,'../../../../..');
const commands=JSON.parse(fs.readFileSync(path.join(moduleRoot,'seed','commands.json'),'utf8')).items;
const byId=new Map(commands.map((command)=>[command.id,command]));
const byPath=new Map(commands.map((command)=>[`planning/commands/${command.file}`,command]));
const commandPath=(id)=>{const command=byId.get(id);assert.ok(command,`missing command ${id}`);return `planning/commands/${command.file}`;};
const paths=(ids)=>ids.map(commandPath);

function closure(id,seen=new Set()){
  const command=byId.get(id);
  if(!command)return seen;
  for(const includedPath of command.includes||[]){
    const included=byPath.get(includedPath);
    assert.ok(included,`${id}: unresolved include ${includedPath}`);
    if(seen.has(included.id))continue;
    seen.add(included.id);
    closure(included.id,seen);
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

test('all command include edges are canonical direct command-definition paths and resolve',()=>{
  for(const command of commands){
    for(const includedPath of command.includes||[]){
      assert.match(includedPath,/^planning\/commands\/[^/]+\.command\.md$/,`${command.id}: ${includedPath}`);
      assert.ok(byPath.has(includedPath),`${command.id}: unresolved ${includedPath}`);
    }
  }
});

test('mandatory Use-Case recheck applies the fundamental AI Working Boundary without a separate AI command',()=>{
  const recheck=byId.get('methodology.use_cases.recheck');
  assert.ok(recheck.ownerRefs.some((ref)=>ref.responsibilityId==='IDTSPE.UC.AI-WORKING-BOUNDARY'&&ref.readMode==='REQUIRED'));
  assert.equal(commands.some((command)=>/ai[._-]?working[._-]?boundary/i.test(command.id)),false);
  const resolver=read('planning/documentation/use-cases/UC-DOC-RESOLVE-CURRENT-USE-CASES.md');
  const boundary=read('planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/ai-working-boundary/UC-IDTSPE-AI-WORKING-BOUNDARY.md');
  assert.match(resolver,/UC-IDTSPE-AI-WORKING-BOUNDARY/);
  assert.match(boundary,/always logically active/i);
  assert.match(boundary,/does not call Planning Commands as an internal methodology mechanism/i);
});

test('normal IDTSPE work exposes trace, UC recheck and Port Composition recheck as first-class dependencies',()=>{
  assert.deepEqual(byId.get('idtspe.port.trace').includes,paths(['methodology.use_cases.recheck']));
  assert.deepEqual(byId.get('idtspe.compose-current-work').includes,paths(['idtspe.port.trace','methodology.use_cases.recheck']));
  assert.deepEqual(byId.get('idtspe.port-composition.recheck').includes,paths(['idtspe.port.trace','methodology.use_cases.recheck','idtspe.compose-current-work']));
  assert.deepEqual(byId.get('idtspe.work').includes,paths(['idtspe.port.trace','methodology.use_cases.recheck','idtspe.compose-current-work','idtspe.port-composition.recheck']));
});

test('specialized IDTSPE commands reach the shared frame transitively',()=>{
  for(const command of commands){
    const binding=command.methodologyBinding||{};
    if(binding.methodologyRuntime!=='IDTSPE'||!['TARGET_MODULE','LENS'].includes(binding.surfaceKind))continue;
    const expanded=catalog.expandCommandComposition(commands,[command.id]);
    const ids=new Set(expanded.order);
    for(const id of base)assert.ok(ids.has(id),`${command.id} missing transitive ${id}`);
  }
});

test('Target Module and Lens apply roots include their named port once',()=>{
  assert.deepEqual(byId.get('idtspe.port.target').includes,paths(base));
  assert.deepEqual(byId.get('idtspe.target-module.apply').includes,paths(['idtspe.port.target']));
  assert.deepEqual(byId.get('idtspe.port.lens').includes,paths(base));
  assert.deepEqual(byId.get('idtspe.lens.apply').includes,paths(['idtspe.port.lens']));
  for(const command of commands){
    const kind=command.methodologyBinding?.surfaceKind;
    if(kind==='TARGET_MODULE'||kind==='LENS'){
      const rootId=kind==='LENS'?'idtspe.lens.apply':'idtspe.target-module.apply';
      assert.ok(command.includes.includes(commandPath(rootId)),`${command.id} missing ${rootId}`);
      for(const id of base)assert.ok(!command.includes.includes(commandPath(id)),`${command.id} duplicates ${id}`);
    }
  }
});

test('composition expansion is full-DAG first and produces dependencies-before-dependent order',()=>{
  const expanded=catalog.expandCommandComposition(commands,['tmcmd.screen']);
  const pos=new Map(expanded.order.map((id,index)=>[id,index]));
  for(const [id,command] of expanded.nodes.map((d)=>[d.id,d]))for(const depPath of command.includes||[]){const dep=byPath.get(depPath);assert.ok(dep,depPath);assert.ok(pos.get(dep.id)<pos.get(id),`${dep.id} must precede ${id}`);}
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
    assert.deepEqual(command.includes,paths(['idtspe.port.trace']));
    assert.ok(!closure(id).has('idtspe.work'),id);
    assert.ok(!closure(id).has('idtspe.port-composition.recheck'),id);
    assert.ok(closure(id).has('methodology.use_cases.recheck'),id);
  }
});

test('review lifecycle uses existing Validation/Lens prerequisites, completes its own Findings, and keeps Needs separate',()=>{
  const review=byId.get('idtspe.review');
  assert.ok(review.includes.includes(commandPath('idtspe.lenses.apply-selected')));
  assert.ok(!review.includes.includes(commandPath('idtspe.findings.disposition')));
  assert.ok(!review.includes.includes(commandPath('idtspe.needs.collect')));
  assert.ok(!review.includes.includes(commandPath('idtspe.needs.disposition')));
  assert.ok(review.ownerRefs.some((ref)=>ref.responsibilityId==='REVIEW.STRATEGY-COVERAGE'));
  assert.ok(review.ownerRefs.some((ref)=>ref.responsibilityId==='RESOLUTION.FINDING-DISPOSITION'&&ref.readMode==='REQUIRED'));
  assert.ok(!review.ownerRefs.some((ref)=>ref.responsibilityId==='RESOLUTION.NEED-CANDIDATE-DISPOSITION'));
  const recheck=byId.get('idtspe.review.recheck');
  assert.ok(recheck);
  assert.ok(!recheck.includes.includes(commandPath('idtspe.review')));
  assert.ok(recheck.ownerRefs.some((ref)=>ref.responsibilityId==='REVIEW.STRATEGY-COVERAGE'));
  assert.equal(recheck.command,'перепроверь');
  assert.equal(recheck.methodologyBinding.surfaceKind,'ORCHESTRATION');
  assert.equal(recheck.methodologyBinding.hostTargetPolicy,'NONE');
  assert.ok(!recheck.ownerRefs.some((ref)=>ref.responsibilityId==='REVIEW.COVERAGE-AUDIT'));
  assert.equal(byId.has('review_audit.recheck'),false);
  const consistency=byId.get('idtspe.review_consistency');
  assert.equal(consistency.methodologyBinding.hostTargetPolicy,'NONE');
  assert.ok(!consistency.includes.includes(commandPath('idtspe.findings.disposition')));
});

test('focused Documentation ownership review routes Semantic DRY, owner dependencies, stable anchors and Responsibility Maps to canonical owners',()=>{
  const command=byId.get('documentation.ownership.review');
  assert.ok(command);
  for(const rid of ['UC-DOC-REVIEW-DOCUMENTATION','DOC.SEMANTIC-DRY','DOC.SEMANTIC-OWNER-DEPENDENCY','DOC.RESPONSIBILITY-MAP','DOC.EXPLICIT-STABLE-SEMANTIC-ANCHOR']){
    assert.ok(command.ownerRefs.some((ref)=>ref.responsibilityId===rid),rid);
  }
  assert.match(command.meaning,/contextual quotation\/restatement\/clarification is allowed/i);
  assert.match(command.meaning,/Semantic Owner Dependency/i);
  assert.match(command.meaning,/stable owner anchor/i);
  assert.match(command.meaning,/Responsibility Maps as routing-only/i);
  assert.match(command.expectedOutput,/material Findings with (?:their )?linked Proposal/i);
});

test('selected Lens application preserves operation identity after selection',()=>{
  const select=byId.get('idtspe.lenses.select');
  const apply=byId.get('idtspe.lenses.apply-selected');
  assert.ok(apply.includes.includes(commandPath('idtspe.lenses.select')));
  assert.ok(apply.includes.includes(commandPath('idtspe.port.lens')));
  assert.ok(!apply.includes.includes(commandPath('idtspe.lens.apply')));
  assert.match(select.meaning,/Lens Model, Analysis Surface, Operation, basis/i);
  assert.match(apply.meaning,/Lens Model, Analysis Surface, supported Operation, relevant basis/i);
  assert.match(apply.meaning,/CHECK versus CHALLENGE/i);
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


test('every direct Planning Command exposes at least one own structured canonical ownerRef with why',()=>{
  for(const command of commands){
    assert.ok(command.ownerRefs?.length,`${command.id}: ownerRefs`);
    for(const ref of command.ownerRefs){
      assert.ok(ref.responsibilityId,`${command.id}: responsibilityId`);
      assert.ok(ref.path,`${command.id}: path`);
      assert.ok(ref.anchor,`${command.id}: anchor`);
      assert.ok(ref.why,`${command.id}: why`);
      assert.ok(ref.role,`${command.id}: role`);
      assert.ok(ref.readMode,`${command.id}: readMode`);
    }
  }
});

test('Helper command body exposes effective merged DAG contributions in addition to own contributions',()=>{
  const body=bodyApi.buildCommandBody(byId.get('idtspe.work'),'adaptive',{definitions:commands});
  assert.match(body,/own_composition_contributions_pre_execution:/);
  assert.match(body,/effective_composition_contributions_pre_execution:/);
  assert.match(body,/WORKING_TRACE_REQUIRED: P-02/);
  assert.match(body,/source: idtspe\.port\.trace/);
});

test('active ReviewDiff workflow uses Generic AI Proposal terminology',()=>{
  const text=read('planning/documentation/review-diff-review-workflow.md');
  assert.doesNotMatch(text,/interaction AI Proposal/);
  assert.match(text,/Generic AI Proposal \(GIP\)/);
});

test('idtspe.work establishes one shared pass and finalizes only after dependent leaf actions',()=>{
  const command=byId.get('idtspe.work');
  assert.match(command.meaning,/establishes\/enters one shared normal Shell pass/i);
  assert.match(command.meaning,/finalization happens only after the selected leaf\/root actions/i);
  const surface=read('planning/documentation/idtspe-methodology/active/idtspe-core/commands/IDTSPE-COMMAND-SURFACE-CONTRACT.md');
  assert.match(surface,/establish\/enter one shared normal Shell pass/i);
  assert.match(surface,/finalize the pass only after selected leaf\/root actions/i);
});


test('review coverage distinguishes executed cells from reused prior coverage and critical review stays lightweight',()=>{
  const coverage=read('planning/documentation/idtspe-methodology/active/ai-reviewability/REVIEW-STRATEGY-AND-COVERAGE-CONTRACT.md');
  assert.match(coverage,/Coverage Origin/);
  assert.match(coverage,/EXECUTED_THIS_PASS/);
  assert.match(coverage,/REUSED_FROM_PRIOR/);
  assert.match(coverage,/Reuse Justification/);
  const critical=byId.get('critical_review.apply');
  assert.match(critical.meaning,/lightweight critique/i);
  assert.match(critical.meaning,/does not establish or claim complete Review Strategy\/Coverage/i);
  assert.match(critical.keyReminders.join(' '),/not an alias for idtspe\.review/i);
});


test('review coverage mode is collected before Validation/Lens dependency semantic actions',()=>{
  const review=byId.get('idtspe.review');
  const recheck=byId.get('idtspe.review.recheck');
  assert.ok(review.compositionContributions.some((x)=>x.kind==='REVIEW_COVERAGE_MODE'&&x.value==='CURRENT_BASIS'));
  assert.ok(recheck.compositionContributions.some((x)=>x.kind==='REVIEW_COVERAGE_MODE'&&x.value==='LOCAL_AFFECTED_RECHECK'));
  const expandedReview=catalog.expandCommandComposition(commands,['idtspe.review']);
  const expandedRecheck=catalog.expandCommandComposition(commands,['idtspe.review.recheck']);
  assert.ok(expandedReview.contributions.some((x)=>x.kind==='REVIEW_COVERAGE_MODE'&&x.value==='CURRENT_BASIS'&&x.sourceCommandId==='idtspe.review'));
  assert.ok(expandedRecheck.contributions.some((x)=>x.kind==='REVIEW_COVERAGE_MODE'&&x.value==='LOCAL_AFFECTED_RECHECK'&&x.sourceCommandId==='idtspe.review.recheck'));
  const coverage=read('planning/documentation/idtspe-methodology/active/ai-reviewability/REVIEW-STRATEGY-AND-COVERAGE-CONTRACT.md');
  assert.match(coverage,/before.*P-12 Validation.*P-06 Lens.*dependency actions execute/is);
  assert.match(coverage,/Review Coverage working context/i);
});

test('P-12 delegates Lens evaluation to P-06 instead of owning a duplicate Lens lifecycle',()=>{
  const runtime=read('planning/documentation/idtspe-methodology/active/idtspe-core/runtime/IDTSPE-RUNTIME-COMPOSITION-CONTRACT.md');
  assert.match(runtime,/P-06 owns the actual Lens applicability\/operation\/application lifecycle/i);
  assert.match(runtime,/P-12 routes to or reuses the corresponding P-06 selected Lens Application/i);
  assert.match(runtime,/MUST NOT independently select\/apply a second Lens lifecycle/i);
});

test('active command documentation uses operation-aware Lens Application identity',()=>{
  for(const rel of [
    'planning/commands/README.md',
    'planning/documentation/idtspe-methodology/active/idtspe-core/commands/IDTSPE-COMMAND-SURFACE-CONTRACT.md'
  ]){
    const text=read(rel);
    assert.doesNotMatch(text,/selected applicable Lens Models/);
    assert.doesNotMatch(text,/apply the currently selected applicable Lens Models/);
    assert.match(text,/Analysis Surface, Operation, basis/);
  }
});


test('consistency review establishes current-basis coverage before validation',()=>{
  const consistency=byId.get('idtspe.review_consistency');
  assert.ok(consistency.compositionContributions.some((x)=>x.kind==='REVIEW_COVERAGE_MODE'&&x.value==='CURRENT_BASIS'));
  const expanded=catalog.expandCommandComposition(commands,['idtspe.review_consistency']);
  assert.ok(expanded.contributions.some((x)=>x.kind==='REVIEW_COVERAGE_MODE'&&x.value==='CURRENT_BASIS'));
});

test('effective review coverage mode normalizes recheck over current basis',()=>{
  const expanded=catalog.expandCommandComposition(commands,['idtspe.review','idtspe.review.recheck']);
  const modes=expanded.contributions.filter((x)=>x.kind==='REVIEW_COVERAGE_MODE').map((x)=>x.value);
  assert.ok(modes.includes('LOCAL_AFFECTED_RECHECK'));
  assert.ok(!modes.includes('CURRENT_BASIS'));
});

test('review strategy leaves final Lens applicability and application selection to P-06',()=>{
  const coverage=read('planning/documentation/idtspe-methodology/active/ai-reviewability/REVIEW-STRATEGY-AND-COVERAGE-CONTRACT.md');
  assert.match(coverage,/coverage requirements, not a second Lens-applicability decision/i);
  assert.match(coverage,/P-06 Lens Meta-Model\/Registry owns whether a Lens applies/i);
});

test('P-02 exposes review coverage control-plane without becoming coverage authority',()=>{
  const trace=read('planning/documentation/idtspe-methodology/active/idtspe-core/runtime/PASS-TRACE-AND-VISIBILITY-CONTRACT.md');
  assert.match(trace,/REVIEW_COVERAGE_CONTEXT_ESTABLISHED/);
  assert.match(trace,/REVIEW_CELL_EXECUTED/);
  assert.match(trace,/REVIEW_CELL_REUSED/);
  assert.match(trace,/do \*\*not\*\* make P-02 the owner of Review Coverage/i);
});

test('pre-update review resolves plan before Validation and Lens work with distinct coverage mode',()=>{
  const review=byId.get('idtspe.review.pre_update');
  assert.ok(review);
  const expanded=catalog.expandCommandComposition(commands,[review.id]);
  const at=(id)=>expanded.order.indexOf(id);
  assert.ok(at('tmcmd.pre.update')>=0);
  assert.ok(at('tmcmd.pre.update')<at('idtspe.port.validation'));
  assert.ok(at('tmcmd.pre.update')<at('idtspe.lenses.apply-selected'));
  assert.ok(at('idtspe.port.validation')<at(review.id));
  assert.deepEqual(expanded.contributions.filter((item)=>item.kind==='REVIEW_COVERAGE_MODE').map((item)=>item.value),['PRE_UPDATE_BASIS']);
});
