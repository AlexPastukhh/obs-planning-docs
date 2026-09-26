import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const codec=require('../src/command-definition-codec.js'),catalog=require('../src/command-catalog.js'),body=require('../src/command-body.js');
function def(id,extra={}){return codec.normalizeCommandDefinition({schemaVersion:1,id,file:id+'.command.md',command:id,englishName:id,commandFamily:[id],description:id,meaning:id,activeContextBehavior:'current subject',traversalReadMode:'adaptive',ownerFiles:[],expectedOutput:'result',permissionMode:'read only',keyReminders:['Preserve permissions.'],userTarget:'<subject>',palette:true,...extra});}
function call(id,target){return{id,commandPath:'planning/commands/'+target+'.command.md',at:{path:'planning/process.md',anchor:'before-handoff'},when:'When the owner gate applies.',context:'Current result and basis.'};}

test('process calls round trip; invalid point, duplicate identity and non-command target are rejected',()=>{
  const a=def('a',{processCalls:[call('check','b')]});
  assert.deepEqual(codec.parseCommandDefinitionDocument(codec.renderCommandDefinitionDocument(a)).processCalls,a.processCalls);
  assert.throws(()=>def('a',{processCalls:[call('check','b'),call('check','c')]}),/unique/);
  assert.throws(()=>def('a',{processCalls:[{...call('check','b'),at:{path:'planning/process.md'}}]}),/anchor/);
  assert.throws(()=>def('a',{processCalls:[{...call('check','b'),commandPath:'planning/process.md'}]}),/commands/);
});

test('whole graph rejects mixed recursion and missing deferred commands before execution',()=>{
  const a=def('a',{processCalls:[call('check','b')]}),b=def('b',{includes:['planning/commands/a.command.md']});
  assert.throws(()=>catalog.expandCommandInvocation([a,b],['a']),/cycle/);
  assert.throws(()=>catalog.expandCommandInvocation([a],['a']),/Unknown/);
  assert.doesNotThrow(()=>catalog.validateCommandCatalog([a],{allowMissingIncludes:true}));
  assert.match(body.buildCommandBody(a,body.MODE.ADAPTIVE,{definitions:[a]}),/INVALID \/ INCOMPLETE CATALOG/);
  assert.deepEqual(catalog.expandCommandInvocation([a,def('unrelated')],['unrelated']).initial.order,['unrelated']);
});

test('deferred child contributions stay out of initial composition; repeated points and nested calls survive',()=>{
  const common=def('common'),late=def('late',{compositionContributions:[{kind:'REVIEW_COVERAGE_MODE',value:'LOCAL_AFFECTED_RECHECK',why:'Child affected basis.'}]}),nested=def('nested');
  const b=def('b',{includes:['planning/commands/common.command.md','planning/commands/late.command.md'],processCalls:[call('nested','nested')]}),a=def('a',{includes:['planning/commands/common.command.md'],processCalls:[call('first','b'),call('second','b')],compositionContributions:[{kind:'REVIEW_COVERAGE_MODE',value:'CURRENT_BASIS',why:'Parent current basis.'}]});
  const plan=catalog.expandCommandInvocation([a,b,common,late,nested],['a']);
  assert.deepEqual(plan.initial.order,['common','a']);
  assert.deepEqual(plan.initial.contributions.map(c=>c.value),['CURRENT_BASIS']);
  const calls=plan.processCalls.filter(c=>c.callerId==='a');assert.equal(calls.length,2);
  for(const c of calls){assert.deepEqual(c.composition.order,['common','late','b']);assert.deepEqual(c.composition.contributions.map(c=>c.value),['LOCAL_AFFECTED_RECHECK']);}
  assert.ok(plan.processCalls.some(c=>c.callerId==='b'&&c.id==='nested'));
});
