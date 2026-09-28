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

const partial=new Set(['methodology.use_cases.recheck','session.work.maintain','session.input.intake','session.current_work.select','session.route.choose','session.state.synchronize','session.turn.finalize']);
const common=['methodology.use_cases.recheck','session.work.maintain','session.input.intake','session.current_work.select','session.route.choose'];

test('ordinary command roots share the WR entry prefix without early closure',()=>{
  catalog.validateCommandCatalog(definitions);
  for(const definition of definitions){
    const order=catalog.expandCommandComposition(definitions,[definition.id]).order;
    if(partial.has(definition.id))continue;
    let prior=-1;
    for(const id of common){const at=order.indexOf(id);assert.ok(at>prior,`${definition.id}: ${id} order`);prior=at;}
    assert.ok(!order.includes('session.state.synchronize'),`${definition.id}: WR-6 prerequisite`);
    assert.ok(!order.includes('session.turn.finalize'),`${definition.id}: WR-7 prerequisite`);
  }
});

test('selected SDS Step realization calls the focused sweep conditionally at existing owner points',()=>{
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
  assert.ok(direct.order.includes('session.route.choose'));
  assert.ok(!direct.contributions.some(x=>x.kind==='SELECTED_TARGET_MODULE'&&x.value==='TM-EVOLUTION-STEP'));
});
