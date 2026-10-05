import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const catalog=require('../src/command-catalog.js');
const codec=require('../src/command-definition-codec.js');
const repoRoot=path.resolve(import.meta.dirname,'../../../../../..');
const directory=path.join(repoRoot,'planning/commands');
const definitions=fs.readdirSync(directory).filter(file=>file.endsWith('.command.md')).map(file=>codec.parseCommandDefinitionDocument(fs.readFileSync(path.join(directory,file),'utf8'),{actualFile:file}));

const retiredSessionPaths=new Set([
  'planning/commands/maintain-session-work.command.md',
  'planning/commands/intake-session-input.command.md',
  'planning/commands/select-current-turn-work.command.md',
  'planning/commands/choose-current-work-route.command.md',
  'planning/commands/prepare-current-work-record.command.md',
  'planning/commands/sweep-session-work-questions.command.md',
  'planning/commands/sync-session-state.command.md',
  'planning/commands/finalize-turn-work-record.command.md',
  'planning/commands/maintain-current-work-manifest.command.md',
  'planning/commands/maintain-session-artifacts.command.md',
  'planning/commands/maintain-session-artifacts-archive.command.md',
  'planning/commands/configure-idtspe-trace-inline.command.md',
  'planning/commands/configure-idtspe-trace-artifact.command.md',
  'planning/commands/include-idtspe-trace-port.command.md'
]);
const retiredIds=new Set(['session.work.maintain','session.input.intake','session.current_work.select','session.route.choose','session.current_work.prepare','session.current_work.question_sweep','session.state.synchronize','session.turn.finalize','idtspe.current-work.manifest.maintain','idtspe.trace.inline','idtspe.trace.artifact','idtspe.port.trace']);

test('ordinary Planning Commands have no mandatory Session/Work-Record prerequisite surface',()=>{
  catalog.validateCommandCatalog(definitions);
  for(const definition of definitions){
    for(const inc of definition.includes||[]) assert.ok(!retiredSessionPaths.has(inc),`${definition.id}: retired include ${inc}`);
    const order=catalog.expandCommandComposition(definitions,[definition.id]).order;
    for(const id of retiredIds) assert.ok(!order.includes(id),`${definition.id}: retired session/work-record node ${id}`);
  }
});

test('explicit IDTSPE work reaches Shell composition without Session routing',()=>{
  const order=catalog.expandCommandComposition(definitions,['idtspe.work']).order;
  assert.ok(order.includes('methodology.use_cases.recheck'));
  assert.ok(order.includes('idtspe.compose-current-work'));
  assert.ok(order.includes('idtspe.port-composition.recheck'));
  assert.equal(order.at(-1),'idtspe.work');
  for(const id of retiredIds) assert.ok(!order.includes(id),`idtspe.work: retired ${id}`);
});

test('selected SDS Step realization retains its component-local Question sweep',()=>{
  for(const id of ['tmcmd.sds.code.realization','tmcmd.exact.realization']){
    const invocation=catalog.expandCommandInvocation(definitions,[id]);
    const call=invocation.processCalls.find(item=>item.id==='selected-sds-evolution-step-question-sweep');
    assert.ok(call,`${id}: no conditional sweep`);
    assert.ok(call.when.includes('Only when'),`${id}: unconditional call`);
    assert.equal(call.composition.order.at(-1),'sds.evolution_step.question_sweep');
    const owner=fs.readFileSync(path.join(repoRoot,call.at.path),'utf8');
    catalog.validateProcessCallPoint(owner,call.at);
  }
  const direct=catalog.expandCommandComposition(definitions,['sds.evolution_step.question_sweep']);
  for(const id of retiredIds) assert.ok(!direct.order.includes(id));
  assert.ok(!direct.contributions.some(x=>x.kind==='SELECTED_TARGET_MODULE'&&x.value==='TM-EVOLUTION-STEP'));
});

test('Session/Work-Record facilities are explicit Helper prompts, not command definitions',()=>{
  const promptDir=path.join(repoRoot,'planning/helper-library/prompts');
  const required=[
    'session-workspace-explicit-20261005.prompt.md',
    'session-input-explicit-20261005.prompt.md',
    'session-manifest-explicit-20261005.prompt.md',
    'work-record-explicit-20261005.prompt.md',
    'question-sweep-explicit-20261005.prompt.md',
    'session-sync-explicit-20261005.prompt.md',
    'session-finalize-explicit-20261005.prompt.md',
    'session-artifacts-explicit-20261005.prompt.md',
    'work-record-inline-explicit-20261005.prompt.md',
    'work-record-artifact-explicit-20261005.prompt.md'
  ];
  for(const file of required) assert.ok(fs.existsSync(path.join(promptDir,file)),file);
  for(const id of retiredIds) assert.ok(!definitions.some(item=>item.id===id),`retired command id still registered: ${id}`);
});

test('continue-by-methodology does not reactivate retired Session/Work-Record runtime',()=>{
  const definition=definitions.find(item=>item.id==='idtspe.continue');
  assert.ok(definition,'idtspe.continue missing');
  const body=[definition.meaning,definition.activeContextBehavior,definition.expectedOutput,...(definition.keyReminders||[])].join('\n');
  for(const retiredPhrase of ['reuse its exact Work Record/S0','prepared-task pause','default preparation']){
    assert.ok(!body.includes(retiredPhrase),`idtspe.continue retains retired runtime phrase: ${retiredPhrase}`);
  }
  assert.match(definition.activeContextBehavior,/current Work Context/);
  assert.match(definition.activeContextBehavior,/separately activates|separately activated/);
});

test('optional Session/Work-Record contracts do not make Manifest or WR-1 commands mandatory',()=>{
  const sessionState=fs.readFileSync(path.join(repoRoot,'planning/session/session-state-runtime-contract.md'),'utf8');
  assert.match(sessionState,/README\.md.*general re-entry entry point/);
  assert.match(sessionState,/WORK-MANIFEST\.md.*only when the USER explicitly activated/);
  assert.ok(!sessionState.includes('Session State archive has `WORK-MANIFEST.md` as its re-entry entry point'));

  const workRecord=fs.readFileSync(path.join(repoRoot,'planning/documentation/idtspe-methodology/active/idtspe-core/runtime/WORK-RECORD-PRINCIPLES.md'),'utf8');
  assert.ok(!workRecord.includes('An included WR-1 command'));
  assert.match(workRecord,/no dedicated WR-1\/WR-2 Planning Command is required/);
});

