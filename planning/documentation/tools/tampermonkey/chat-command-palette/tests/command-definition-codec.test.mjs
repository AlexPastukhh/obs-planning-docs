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

test('accepts optional explicit Direction placement for standalone command controls',()=>{const d=codec.parseCommandDefinitionBatch(block({...base,directionIds:['DIR-PLAN-SOLUTION']}))[0];assert.deepEqual(d.directionIds,['DIR-PLAN-SOLUTION']);assert.throws(()=>codec.parseCommandDefinitionBatch(block({...base,directionIds:['bad']})),/DIR-\* id/)});
