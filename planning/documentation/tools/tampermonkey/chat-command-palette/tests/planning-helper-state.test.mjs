import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const commandCodec=require('../src/command-definition-codec.js');
const catalog=require('../src/command-catalog.js');
const helper=require('../src/helper-library-codec.js');
Object.assign(globalThis,{ObsPlanningHelper:{...commandCodec,...catalog,...helper}});
const state=require('../src/planning-helper-state.js');
const def=commandCodec.normalizeCommandDefinition({schemaVersion:1,id:'demo.create',file:'demo.command.md',command:'demo',englishName:'demo',commandFamily:['demo'],description:'d',meaning:'m',activeContextBehavior:'a',traversalReadMode:'t',ownerFiles:[],expectedOutput:'o',permissionMode:'read-only',keyReminders:['r'],userTarget:'<t>',palette:true,refinements:[]});
const prompt=helper.normalizeHelperLibraryItem({kind:'prompt',id:'p',title:'P',text:'prompt',createdAt:'2026-01-01T00:00:00Z',updatedAt:'2026-01-01T00:00:00Z'});
async function withGm(initial,fn){const oldGet=globalThis.GM_getValue,oldSet=globalThis.GM_setValue;const values=new Map(Object.entries(initial||{}));let gets=0,sets=0;globalThis.GM_getValue=async(key,fallback)=>{gets++;return values.has(key)?values.get(key):fallback};globalThis.GM_setValue=async(key,value)=>{sets++;values.set(key,value)};try{return await fn(values,()=>({gets,sets}))}finally{if(oldGet===undefined)delete globalThis.GM_getValue;else globalThis.GM_getValue=oldGet;if(oldSet===undefined)delete globalThis.GM_setValue;else globalThis.GM_setValue=oldSet;}}

test('unified local snapshot stores command raw text and helper text',async()=>withGm({},async()=>{const saved=await state.savePlanningHelperLocalSnapshot({schemaVersion:1,planningCommands:[{definition:def,repositoryKnown:true}],helperItems:[{item:prompt,repositoryKnown:false}]});assert.equal(saved.planningCommands[0].rawContent.includes('[PLANNING_COMMAND_DEFINITION]'),true);assert.equal(saved.helperItems[0].rawContent.includes('[PLANNING_HELPER_LIBRARY_ITEM]'),true);const loaded=await state.loadPlanningHelperLocalSnapshot();assert.equal(loaded.planningCommands[0].definition.id,'demo.create');assert.equal(loaded.helperItems[0].item.text,'prompt');}));

test('warm snapshot load is one GM read and is not repository/source bound',async()=>{const payload=state.normalizePlanningHelperLocalSnapshot({schemaVersion:1,savedAt:'2026-01-01T00:00:00Z',planningCommands:[{definition:def,repositoryKnown:true}],helperItems:[]});await withGm({[state.PLANNING_HELPER_STATE_KEYS.localSnapshot]:payload},async(_values,counters)=>{const result=await state.loadOrMigratePlanningHelperLocalSnapshot([]);assert.equal(result.migrated,false);assert.equal(result.snapshot.planningCommands.length,1);assert.equal(counters().gets,1);});});

test('legacy caches migrate locally without GitHub and preserve repo-known helper status',async()=>{const repoRecord={item:prompt,path:helper.helperLibraryTargetPath(prompt),sha:'abc',fetchedAt:'2026-01-01T00:00:00Z'};const local={...prompt,text:'local override',updatedAt:'2026-02-01T00:00:00Z'};const initial={
[state.PLANNING_HELPER_LEGACY_STATE_KEYS.commandCache]:{schemaVersion:1,definitions:[def]},
[state.PLANNING_HELPER_LEGACY_STATE_KEYS.repositoryLibraryCache]:{schemaVersion:2,records:[repoRecord]},
[state.PLANNING_HELPER_LEGACY_STATE_KEYS.localLibrary]:{schemaVersion:1,items:[local]}
};await withGm(initial,async()=>{const result=await state.loadOrMigratePlanningHelperLocalSnapshot([]);assert.equal(result.migrated,true);assert.equal(result.snapshot.helperItems[0].item.text,'local override');assert.equal(result.snapshot.helperItems[0].repositoryKnown,true);assert.equal(result.snapshot.helperItems[0].repositorySha,'abc');});});

test('repository settings do not clear or bind local snapshot',async()=>withGm({},async()=>{await state.savePlanningHelperLocalSnapshot({schemaVersion:1,planningCommands:[{definition:def,repositoryKnown:true}],helperItems:[]});await state.saveRepositorySettings({owner:'Other',repo:'Else',branch:'dev'});const loaded=await state.loadPlanningHelperLocalSnapshot();assert.equal(loaded.planningCommands[0].definition.id,'demo.create');}));


test('direct repository SHA always implies repository evidence even if legacy flag is false',()=>{const commandRecord=state.normalizeCommandRecord({definition:def,repositoryKnown:false,repositorySha:'sha-direct'});const helperRecord=state.normalizeHelperRecord({item:prompt,repositoryKnown:false,repositorySha:'sha-helper'});assert.equal(commandRecord.repositoryKnown,true);assert.equal(commandRecord.repositoryTracked,true);assert.equal(helperRecord.repositoryKnown,true)});
