import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require=createRequire(import.meta.url); const codec=require('../src/command-definition-codec.js');
const base={schemaVersion:1,id:'demo.test',file:'demo.command.md',command:'демо',englishName:'demo',commandFamily:['демо','demo'],description:'demo command',meaning:'test',activeContextBehavior:'use active context',traversalReadMode:'targeted',ownerFiles:[],expectedOutput:'answer',permissionMode:'read-only',keyReminders:['Do not write.'],userTarget:'<target>',palette:true,refinements:[]};
const block=(obj=base)=>`[PLANNING_COMMAND_DEFINITION]\n${JSON.stringify(obj,null,2)}\n[/PLANNING_COMMAND_DEFINITION]`;
test('parses one document',()=>{const d=codec.parseCommandDefinitionDocument(`# Demo\n\n${block()}`,{path:'planning/commands/demo.command.md'});assert.equal(d.command,'демо');assert.equal(d.file,'demo.command.md')});
test('parses multiple blocks with prose around them',()=>{const b={...base,id:'demo.two',file:'two.command.md',command:'два',englishName:'two',commandFamily:['два','two']};const defs=codec.parseCommandDefinitionBatch(`text\n${block()}\nmore\n${block(b)}\nend`);assert.equal(defs.length,2)});
test('rejects duplicate canonical command in batch',()=>assert.throws(()=>codec.parseCommandDefinitionBatch(`${block()}\n${block({...base,id:'other',file:'other.command.md'})}`),/Duplicate canonical command/));
test('rejects unclosed marker',()=>assert.throws(()=>codec.parseCommandDefinitionBatch('[PLANNING_COMMAND_DEFINITION]\n{}'),/Unclosed/));
test('rejects canonical missing from family',()=>assert.throws(()=>codec.parseCommandDefinitionBatch(block({...base,commandFamily:['demo']})),/must contain/));
test('rejects nested file path',()=>assert.throws(()=>codec.parseCommandDefinitionBatch(block({...base,file:'nested/demo.command.md'})),/direct-child/));

test('rejects multiline command fields and unsafe owner paths',()=>{assert.throws(()=>codec.parseCommandDefinitionBatch(block({...base,command:'demo\ncommand',commandFamily:['demo\ncommand']})),/one safe text line/);assert.throws(()=>codec.parseCommandDefinitionBatch(block({...base,ownerFiles:['../outside.md']})),/invalid path segment/)});

test('rejects retired Direction placement metadata',()=>{assert.throws(()=>codec.parseCommandDefinitionBatch(block({...base,directionIds:['DIR-PLAN-SOLUTION']})),/Unknown command definition field: directionIds/)});

test('normalizes and serializes command includes',()=>{const d=codec.normalizeCommandDefinition({...base,includes:['base.command']});assert.deepEqual(d.includes,['base.command']);const parsed=codec.parseCommandDefinitionDocument(codec.renderCommandDefinitionDocument(d));assert.deepEqual(parsed.includes,['base.command']);});
test('rejects duplicate or unsafe command includes',()=>{assert.throws(()=>codec.normalizeCommandDefinition({...base,includes:['x','x']}),/duplicate/);assert.throws(()=>codec.normalizeCommandDefinition({...base,includes:['bad id']}),/safe identifier|invalid/i);});


test('normalizes and serializes structured command ownerRefs with why/role/readMode',()=>{const ownerRefs=[{responsibilityId:'TEST.OWNER',path:'planning/test.md',anchor:'owner-anchor',why:'Needed for the command-specific owner contract.',role:'PRIMARY_OWNER',readMode:'REQUIRED'}];const d=codec.normalizeCommandDefinition({...base,ownerRefs});assert.deepEqual(d.ownerRefs,ownerRefs);const parsed=codec.parseCommandDefinitionDocument(codec.renderCommandDefinitionDocument(d));assert.deepEqual(parsed.ownerRefs,ownerRefs);});
test('rejects invalid ownerRefs roles and unsafe anchors',()=>{assert.throws(()=>codec.normalizeCommandDefinition({...base,ownerRefs:[{responsibilityId:'X',path:'planning/x.md',anchor:'bad anchor',why:'why',role:'PRIMARY_OWNER',readMode:'REQUIRED'}]}),/anchor/);assert.throws(()=>codec.normalizeCommandDefinition({...base,ownerRefs:[{responsibilityId:'X',path:'planning/x.md',anchor:'x',why:'why',role:'BAD',readMode:'REQUIRED'}]}),/role/);});


test('normalizes and serializes structured composition contributions',()=>{
  const value={...base,compositionContributions:[{kind:'PORT_CAPABILITY_REQUIREMENT',value:'TARGET',why:'Target capability must be known before Port Composition Refresh.'}]};
  const parsed=codec.parseCommandDefinitionDocument(block(value));
  assert.deepEqual(parsed.compositionContributions,value.compositionContributions);
  const rendered=codec.renderCommandDefinitionDocument(codec.normalizeCommandDefinition(value));
  assert.match(rendered,/compositionContributions/);
});

test('rejects invalid composition contribution kinds',()=>{
  assert.throws(()=>codec.parseCommandDefinitionDocument(block({...base,compositionContributions:[{kind:'UNKNOWN',value:'X',why:'bad'}]})),/compositionContributions\[0\]\.kind is invalid/);
});
