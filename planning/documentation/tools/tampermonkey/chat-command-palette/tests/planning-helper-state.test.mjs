import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require=createRequire(import.meta.url);
const codec=require('../src/helper-library-codec.js');
Object.assign(globalThis,{ObsPlanningHelper:{...codec}});
const state=require('../src/planning-helper-state.js');
const settings={owner:'AlexPastukhh',repo:'obs-planning-docs',branch:'main'};
const prompt=codec.normalizeHelperLibraryItem({kind:'prompt',id:'cached',title:'Cached',text:'Cached text',createdAt:'2025-01-01T00:00:00Z',updatedAt:'2025-01-01T00:00:00Z'});

async function withGm(initial,fn){const oldGet=globalThis.GM_getValue,oldSet=globalThis.GM_setValue;const values=new Map(Object.entries(initial||{}));globalThis.GM_getValue=async(key,fallback)=>values.has(key)?values.get(key):fallback;globalThis.GM_setValue=async(key,value)=>{values.set(key,value)};try{return await fn(values)}finally{if(oldGet===undefined)delete globalThis.GM_getValue;else globalThis.GM_getValue=oldGet;if(oldSet===undefined)delete globalThis.GM_setValue;else globalThis.GM_setValue=oldSet;}}

test('repository helper-library cache v2 persists text and SHA without TTL expiry',async()=>withGm({},async()=>{const record={item:prompt,path:codec.helperLibraryTargetPath(prompt),sha:'abc123',fetchedAt:'2025-01-01T00:00:00.000Z'};await state.saveRepositoryHelperLibraryCache([record],settings,{lastSyncedAt:'2025-01-01T00:00:00.000Z'});const loaded=await state.loadRepositoryHelperLibraryCache(settings);assert.equal(loaded.schemaVersion,2);assert.equal(loaded.records[0].sha,'abc123');assert.equal(loaded.records[0].item.text,'Cached text');assert.equal(loaded.lastSyncedAt,'2025-01-01T00:00:00.000Z');assert.equal(loaded.records[0].fetchedAt,'2025-01-01T00:00:00.000Z');}));

test('legacy repository helper-library cache v1 remains visible and is marked for hydration on explicit refresh',async()=>{const key=state.PLANNING_HELPER_STATE_KEYS.repositoryLibraryCache;const legacy={schemaVersion:1,sourceKey:state.repositorySourceKey(settings),savedAt:'2024-01-01T00:00:00.000Z',items:[prompt]};await withGm({[key]:legacy},async()=>{const loaded=await state.loadRepositoryHelperLibraryCache(settings);assert.equal(loaded.schemaVersion,1);assert.equal(loaded.needsHydration,true);assert.equal(loaded.records[0].sha,'');assert.equal(loaded.records[0].path,codec.helperLibraryTargetPath(prompt));assert.equal(loaded.items[0].text,'Cached text');});});

test('repository helper-library cache is source-bound rather than time-bound',async()=>{const key=state.PLANNING_HELPER_STATE_KEYS.repositoryLibraryCache;const payload={schemaVersion:2,sourceKey:state.repositorySourceKey(settings),savedAt:'2020-01-01T00:00:00.000Z',lastSyncedAt:'2020-01-01T00:00:00.000Z',records:[{item:prompt,path:codec.helperLibraryTargetPath(prompt),sha:'old-sha',fetchedAt:'2020-01-01T00:00:00.000Z'}]};await withGm({[key]:payload},async()=>{assert.ok(await state.loadRepositoryHelperLibraryCache(settings));assert.equal(await state.loadRepositoryHelperLibraryCache({...settings,branch:'dev'}),null);});});
