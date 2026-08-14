import test from 'node:test'; import assert from 'node:assert/strict'; import { createRequire } from 'node:module'; const require=createRequire(import.meta.url); const catalog=require('../src/command-catalog.js');
const d=(id,file,command,aliases=[command])=>({id,file,command,commandFamily:aliases,palette:true});
test('validates unique catalog',()=>assert.equal(catalog.validateCommandCatalog([d('a','a.command.md','a'),d('b','b.command.md','b')]).definitions.length,2));
test('rejects duplicate id',()=>assert.throws(()=>catalog.validateCommandCatalog([d('a','a.command.md','a'),d('a','b.command.md','b')]),/Duplicate command id/));
test('rejects ambiguous alias',()=>assert.throws(()=>catalog.validateCommandCatalog([d('a','a.command.md','a',['a','shared']),d('b','b.command.md','b',['b','shared'])]),/Ambiguous command alias/));
test('replace by file keeps unlisted definitions',()=>{const result=catalog.replaceDefinitionsByFile([d('a','a.command.md','a'),d('b','b.command.md','b')],[d('a2','a.command.md','aa')]);assert.deepEqual(result.map(x=>x.command),['aa','b'])});
test('collects command owner and refinement reference paths',()=>{const definition={ownerFiles:['planning/a.md','planning/shared.md'],refinements:[{readRequired:['planning/shared.md','planning/b.md']} ]};assert.deepEqual(catalog.commandReferencePaths(definition),['planning/a.md','planning/b.md','planning/shared.md'])});
