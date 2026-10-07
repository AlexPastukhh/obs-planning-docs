import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const resolver=require('../src/helper-module-resolver.js');
const module=(id,text)=>({kind:'module',id,title:id,text});

test('module references resolve recursively and repeated references expand independently',()=>{const items=[module('a','A [[module:b]]'),module('b','B')];const result=resolver.resolveModuleReferences('X [[module:a]] / [[module:b]]',items);assert.equal(result.text,'X A B / B');assert.deepEqual(result.references,['a','b']);assert.deepEqual(resolver.findModuleReferences('[[module:a]] + [[module:a]]'),['a','a']);assert.equal(resolver.moduleReference('a'),'[[module:a]]');});

test('module resolver fails closed for missing references, cycles and unsafe ids',()=>{assert.throws(()=>resolver.resolveModuleReferences('[[module:missing]]',[]),/Unresolved module reference: \[\[module:missing\]\]/);assert.throws(()=>resolver.resolveModuleReferences('[[module:a]]',[module('a','[[module:b]]'),module('b','[[module:a]]')]),/Module reference cycle: a → b → a/);assert.throws(()=>resolver.moduleReference('Bad ID'),/Invalid module id/);});
