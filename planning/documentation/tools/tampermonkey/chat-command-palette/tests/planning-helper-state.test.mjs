import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const commandCodec=require('../src/command-definition-codec.js');
const catalog=require('../src/command-catalog.js');
const helper=require('../src/helper-library-codec.js');
const semantic=require('../src/semantic-projections.js');
const repositoryCatalog=require('../src/repository-catalog-service.js');
Object.assign(globalThis,{ObsPlanningHelper:{...commandCodec,...catalog,...helper,...semantic,...repositoryCatalog}});
const state=require('../src/planning-helper-state.js');
const def=commandCodec.normalizeCommandDefinition({schemaVersion:1,id:'demo.create',file:'demo.command.md',command:'demo',englishName:'demo',commandFamily:['demo'],description:'d',meaning:'m',activeContextBehavior:'a',traversalReadMode:'t',ownerFiles:[],expectedOutput:'o',permissionMode:'read-only',keyReminders:['r'],userTarget:'<t>',palette:true,refinements:[]});
const prompt=helper.normalizeHelperLibraryItem({kind:'prompt',id:'p',title:'P',text:'prompt',createdAt:'2026-01-01T00:00:00Z',updatedAt:'2026-01-01T00:00:00Z'});
async function withGm(initial,fn){const oldGet=globalThis.GM_getValue,oldSet=globalThis.GM_setValue;const values=new Map(Object.entries(initial||{}));let gets=0,sets=0;globalThis.GM_getValue=async(key,fallback)=>{gets++;return values.has(key)?values.get(key):fallback};globalThis.GM_setValue=async(key,value)=>{sets++;values.set(key,value)};try{return await fn(values,()=>({gets,sets}))}finally{if(oldGet===undefined)delete globalThis.GM_getValue;else globalThis.GM_getValue=oldGet;if(oldSet===undefined)delete globalThis.GM_setValue;else globalThis.GM_setValue=oldSet;}}

test('unified local snapshot v9 stores command/helper raw text plus semantic/scenario catalog fields',async()=>withGm({},async()=>{const saved=await state.savePlanningHelperLocalSnapshot({schemaVersion:state.LOCAL_SNAPSHOT_SCHEMA_VERSION,planningCommands:[{definition:def,repositoryKnown:true}],helperItems:[{item:prompt,repositoryKnown:false}],useCases:[],semanticComponents:[],scenarios:[],catalogOrder:{commands:['demo.create']}});assert.equal(saved.schemaVersion,state.LOCAL_SNAPSHOT_SCHEMA_VERSION);assert.equal(saved.commandCacheSchemaVersion,state.COMMAND_CACHE_SCHEMA_VERSION);assert.ok(saved.planningCommands[0].rawContent.includes('[PLANNING_COMMAND_DEFINITION]'));assert.ok(saved.helperItems[0].rawContent.includes('[PLANNING_HELPER_LIBRARY_ITEM]'));assert.deepEqual(saved.catalogOrder.commands,['demo.create']);assert.equal('hiddenCommandIds' in saved,false);assert.equal('hiddenUseCaseIds' in saved,false);const loaded=await state.loadPlanningHelperLocalSnapshot();assert.equal(loaded.planningCommands[0].definition.id,'demo.create');assert.equal(loaded.helperItems[0].item.text,'prompt')}));

test('warm v9 snapshot load is one GM read and never silently fetches or injects bundled catalogs',async()=>{const payload=state.normalizePlanningHelperLocalSnapshot({schemaVersion:state.LOCAL_SNAPSHOT_SCHEMA_VERSION,savedAt:'2026-01-01T00:00:00Z',planningCommands:[{definition:def,repositoryKnown:true}],helperItems:[],useCases:[],catalogOrder:{}});await withGm({[state.PLANNING_HELPER_STATE_KEYS.localSnapshot]:payload},async(_values,counters)=>{const result=await state.loadOrMigratePlanningHelperLocalSnapshot();assert.equal(result.migrated,false);assert.equal(result.seededCommands,0);assert.deepEqual(result.snapshot.planningCommands.map((r)=>r.definition.id),['demo.create']);assert.equal('hiddenCommandIds' in result.snapshot,false);assert.equal(counters().gets,1)})});

test('legacy caches migrate locally without GitHub and preserve repository-known helper status',async()=>{const repoRecord={item:prompt,path:helper.helperLibraryTargetPath(prompt),sha:'abc',fetchedAt:'2026-01-01T00:00:00Z'},local={...prompt,text:'local override',updatedAt:'2026-02-01T00:00:00Z'},initial={[state.PLANNING_HELPER_LEGACY_STATE_KEYS.commandCache]:{schemaVersion:1,definitions:[def]},[state.PLANNING_HELPER_LEGACY_STATE_KEYS.repositoryLibraryCache]:{schemaVersion:2,records:[repoRecord]},[state.PLANNING_HELPER_LEGACY_STATE_KEYS.localLibrary]:{schemaVersion:1,items:[local]}};await withGm(initial,async()=>{const result=await state.loadOrMigratePlanningHelperLocalSnapshot();assert.equal(result.migrated,true);assert.equal(result.snapshot.schemaVersion,state.LOCAL_SNAPSHOT_SCHEMA_VERSION);assert.equal(result.snapshot.helperItems[0].item.text,'local override');assert.equal(result.snapshot.helperItems[0].repositoryKnown,true);assert.equal(result.snapshot.helperItems[0].repositorySha,'abc');assert.deepEqual(result.snapshot.useCases,[]);assert.match(result.warnings.join('\n'),/Hard Reload GitHub/)})});

test('stale schema-8 incompatible command cache is discarded while local state is preserved',async()=>{
  const staleDef={...def,compositionContributions:[{kind:'LEGACY_PORT_REQUIREMENT',value:'legacy',why:'old cache shape'}]};
  const stale={schemaVersion:8,savedAt:'2026-10-04T18:40:18.187Z',planningCommands:[{definition:staleDef,repositoryKnown:true}],helperItems:[{item:prompt,repositoryKnown:false}],useCases:[],semanticComponents:[],scenarios:[],catalogOrder:{commands:['demo.create']},suppressedRepository:{commands:['planning/commands/old.command.md']},favoriteCommandIds:['demo.create'],favoriteUseCaseIds:[]};
  await withGm({[state.PLANNING_HELPER_STATE_KEYS.localSnapshot]:stale},async(values)=>{
    const result=await state.loadOrMigratePlanningHelperLocalSnapshot();
    assert.equal(result.migrated,true);
    assert.equal(result.snapshot.schemaVersion,state.LOCAL_SNAPSHOT_SCHEMA_VERSION);
    assert.equal(result.snapshot.commandCacheSchemaVersion,state.COMMAND_CACHE_SCHEMA_VERSION);
    assert.deepEqual(result.snapshot.planningCommands,[]);
    assert.equal(result.snapshot.helperItems[0].item.id,'p');
    assert.deepEqual(result.snapshot.favoriteCommandIds,['demo.create']);
    assert.deepEqual(result.snapshot.suppressedRepository.commands,['planning/commands/old.command.md']);
    assert.match(result.warnings.join('\n'),/Cached Planning Command catalog was incompatible/);assert.match(result.warnings.join('\n'),/Discarded 1 repository-backed command record/);
    assert.match(result.warnings.join('\n'),/Hard Reload GitHub/);
    const persisted=values.get(state.PLANNING_HELPER_STATE_KEYS.localSnapshot);
    assert.equal(persisted.planningCommands.length,0);
    assert.equal(persisted.helperItems[0].item.id,'p');
  });
});

test('command-cache recovery preserves compatible local command drafts while dropping stale repository records',async()=>{
  const staleRepositoryDef={...def,id:'remote.old',file:'remote-old.command.md',command:'remote old',englishName:'remote old',commandFamily:['remote old'],compositionContributions:[{kind:'LEGACY_PORT_REQUIREMENT',value:'legacy',why:'old cache shape'}]};
  const localDraft=commandCodec.normalizeCommandDefinition({...def,id:'local.draft',file:'local-draft.command.md',command:'local draft',englishName:'local draft',commandFamily:['local draft']});
  const mixed={schemaVersion:8,savedAt:'2026-10-04T18:40:18.187Z',planningCommands:[{definition:staleRepositoryDef,repositoryKnown:true},{definition:localDraft,repositoryKnown:false,repositoryTracked:true}],helperItems:[{item:prompt,repositoryKnown:false}],useCases:[],semanticComponents:[],scenarios:[],catalogOrder:{},favoriteCommandIds:['local.draft']};
  await withGm({[state.PLANNING_HELPER_STATE_KEYS.localSnapshot]:mixed},async()=>{
    const result=await state.loadOrMigratePlanningHelperLocalSnapshot();
    assert.deepEqual(result.snapshot.planningCommands.map((record)=>record.definition.id),['local.draft']);
    assert.equal(result.snapshot.planningCommands[0].repositoryKnown,false);
    assert.equal(result.snapshot.planningCommands[0].repositoryTracked,true);
    assert.deepEqual(result.snapshot.favoriteCommandIds,['local.draft']);
    assert.match(result.warnings.join('\n'),/Discarded 1 repository-backed command record/);
    assert.match(result.warnings.join('\n'),/preserved 1 local command draft/);
    assert.match(result.warnings.join('\n'),/Use Sync missing/);
    assert.match(result.warnings.join('\n'),/Hard Reload replaces the command catalog and removes unsaved command drafts/);
  });
});

test('incompatible local command drafts are never silently discarded by cache recovery',async()=>{
  const staleLocalDef={...def,compositionContributions:[{kind:'LEGACY_PORT_REQUIREMENT',value:'legacy',why:'local unsaved shape'}]};
  const localOnly={schemaVersion:8,planningCommands:[{definition:staleLocalDef,repositoryKnown:false,repositoryTracked:true}],helperItems:[],useCases:[],semanticComponents:[],scenarios:[],catalogOrder:{}};
  await withGm({[state.PLANNING_HELPER_STATE_KEYS.localSnapshot]:localOnly},async()=>{
    await assert.rejects(()=>state.loadOrMigratePlanningHelperLocalSnapshot(),/compositionContributions\[0\]\.kind is invalid/);
  });
});

test('command-cache schema mismatch discards commands before command decoding',async()=>{
  const current=state.normalizePlanningHelperLocalSnapshot({schemaVersion:state.LOCAL_SNAPSHOT_SCHEMA_VERSION,planningCommands:[{definition:def,repositoryKnown:true}],helperItems:[{item:prompt,repositoryKnown:false}],useCases:[],semanticComponents:[],scenarios:[],catalogOrder:{},favoriteCommandIds:['demo.create']});
  const incompatible={...current,commandCacheSchemaVersion:999};
  await withGm({[state.PLANNING_HELPER_STATE_KEYS.localSnapshot]:incompatible},async()=>{
    const result=await state.loadOrMigratePlanningHelperLocalSnapshot();
    assert.deepEqual(result.snapshot.planningCommands,[]);
    assert.equal(result.snapshot.helperItems[0].item.id,'p');
    assert.deepEqual(result.snapshot.favoriteCommandIds,['demo.create']);
    assert.match(result.warnings.join('\n'),/command-cache schema: 999/);
  });
});

test('command-cache recovery does not swallow corruption outside planningCommands',async()=>{
  const staleDef={...def,compositionContributions:[{kind:'LEGACY_PORT_REQUIREMENT',value:'legacy',why:'old cache shape'}]};
  const broken={schemaVersion:8,planningCommands:[{definition:staleDef}],helperItems:[{item:{kind:'prompt',id:''}}],useCases:[],semanticComponents:[],scenarios:[],catalogOrder:{}};
  await withGm({[state.PLANNING_HELPER_STATE_KEYS.localSnapshot]:broken},async()=>{
    await assert.rejects(()=>state.loadOrMigratePlanningHelperLocalSnapshot());
  });
});

test('repository settings do not bind or delete local snapshot',async()=>withGm({},async()=>{await state.savePlanningHelperLocalSnapshot({schemaVersion:state.LOCAL_SNAPSHOT_SCHEMA_VERSION,planningCommands:[{definition:def,repositoryKnown:true}],helperItems:[],useCases:[],semanticComponents:[],scenarios:[],catalogOrder:{}});await state.saveRepositorySettings({owner:'Other',repo:'Else',branch:'dev'});const loaded=await state.loadPlanningHelperLocalSnapshot();assert.equal(loaded.planningCommands[0].definition.id,'demo.create')}));

test('direct repository SHA always implies repository evidence even if legacy flag is false',()=>{const commandRecord=state.normalizeCommandRecord({definition:def,repositoryKnown:false,repositorySha:'sha-direct'}),helperRecord=state.normalizeHelperRecord({item:prompt,repositoryKnown:false,repositorySha:'sha-helper'});assert.equal(commandRecord.repositoryKnown,true);assert.equal(commandRecord.repositoryTracked,true);assert.equal(helperRecord.repositoryKnown,true)});

test('schema-1 snapshot migrates to schema 9 without losing content and initializes new catalog fields',async()=>{const legacy={schemaVersion:1,savedAt:'2026-01-01T00:00:00Z',planningCommands:[{definition:def,repositoryKnown:true}],helperItems:[]};await withGm({[state.PLANNING_HELPER_STATE_KEYS.localSnapshot]:legacy},async()=>{const result=await state.loadOrMigratePlanningHelperLocalSnapshot();assert.equal(result.migrated,true);assert.equal(result.snapshot.schemaVersion,state.LOCAL_SNAPSHOT_SCHEMA_VERSION);assert.equal('hiddenCommandIds' in result.snapshot,false);assert.equal('hiddenUseCaseIds' in result.snapshot,false);assert.deepEqual(result.snapshot.favoriteCommandIds,[]);assert.deepEqual(result.snapshot.favoriteUseCaseIds,[]);assert.deepEqual(result.snapshot.useCases,[]);assert.deepEqual(result.snapshot.semanticComponents,[]);assert.deepEqual(result.snapshot.scenarios,[]);assert.deepEqual(result.snapshot.catalogOrder.commands,[])})});

test('schema-2/3 snapshots migrate to schema 9 and discard retired hidden tombstones while preserving favorites',async()=>{for(const version of [2,3]){const legacy={schemaVersion:version,savedAt:'2026-01-01T00:00:00Z',planningCommands:[{definition:def,repositoryKnown:true}],helperItems:[],hiddenCommandIds:['hidden'],hiddenUseCaseIds:['UC-X'],favoriteCommandIds:version===3?['demo.create']:[],favoriteUseCaseIds:version===3?['UC-X']:[]};await withGm({[state.PLANNING_HELPER_STATE_KEYS.localSnapshot]:legacy},async()=>{const result=await state.loadOrMigratePlanningHelperLocalSnapshot();assert.equal(result.snapshot.schemaVersion,state.LOCAL_SNAPSHOT_SCHEMA_VERSION);assert.equal('hiddenCommandIds' in result.snapshot,false);assert.equal('hiddenUseCaseIds' in result.snapshot,false);assert.deepEqual(result.snapshot.favoriteCommandIds,version===3?['demo.create']:[])})}});

test('legacy schema-4 snapshot drops retired Direction placement from command definitions',async()=>{const legacyDef={...def,directionIds:['DIR-REPOSITORY']};const legacy={schemaVersion:4,savedAt:'2026-01-01T00:00:00Z',planningCommands:[{definition:legacyDef,repositoryKnown:true}],helperItems:[],useCases:[],catalogOrder:{}};await withGm({[state.PLANNING_HELPER_STATE_KEYS.localSnapshot]:legacy},async()=>{const result=await state.loadOrMigratePlanningHelperLocalSnapshot();assert.equal(result.snapshot.schemaVersion,state.LOCAL_SNAPSHOT_SCHEMA_VERSION);assert.equal('directionIds' in result.snapshot.planningCommands[0].definition,false)})});

test('schema-5 snapshot migrates to schema 9 and initializes semantic/scenario catalogs',async()=>{const legacy={schemaVersion:5,savedAt:'2026-01-01T00:00:00Z',planningCommands:[{definition:def,repositoryKnown:true}],helperItems:[],useCases:[],catalogOrder:{commands:['demo.create']},favoriteCommandIds:['demo.create']};await withGm({[state.PLANNING_HELPER_STATE_KEYS.localSnapshot]:legacy},async()=>{const result=await state.loadOrMigratePlanningHelperLocalSnapshot();assert.equal(result.migrated,true);assert.equal(result.snapshot.schemaVersion,state.LOCAL_SNAPSHOT_SCHEMA_VERSION);assert.deepEqual(result.snapshot.semanticComponents,[]);assert.deepEqual(result.snapshot.scenarios,[]);assert.deepEqual(result.snapshot.favoriteCommandIds,['demo.create']);assert.match(result.warnings.join('\n'),/Hard Reload GitHub/)})});

test('schema-6 snapshot migrates to schema 9 with empty repository suppression',async()=>{const legacy={schemaVersion:6,savedAt:'2026-01-01T00:00:00Z',planningCommands:[{definition:def,repositoryKnown:true}],helperItems:[],useCases:[],semanticComponents:[],scenarios:[],catalogOrder:{}};await withGm({[state.PLANNING_HELPER_STATE_KEYS.localSnapshot]:legacy},async()=>{const result=await state.loadOrMigratePlanningHelperLocalSnapshot();assert.equal(result.migrated,true);assert.deepEqual(result.snapshot.suppressedRepository,{commands:[],helperItems:[],useCases:[],semanticComponents:[],scenarios:[]})})});

test('schema-7 snapshot migrates to schema 9 and drops stale hidden markers',async()=>{const legacy={schemaVersion:7,savedAt:'2026-01-01T00:00:00Z',planningCommands:[{definition:def,repositoryKnown:true}],helperItems:[],useCases:[],semanticComponents:[],scenarios:[],catalogOrder:{},suppressedRepository:{},hiddenCommandIds:['demo.create'],hiddenUseCaseIds:['UC-X'],favoriteCommandIds:['demo.create']};await withGm({[state.PLANNING_HELPER_STATE_KEYS.localSnapshot]:legacy},async(values)=>{const result=await state.loadOrMigratePlanningHelperLocalSnapshot();assert.equal(result.migrated,true);assert.equal(result.snapshot.schemaVersion,state.LOCAL_SNAPSHOT_SCHEMA_VERSION);assert.equal('hiddenCommandIds' in result.snapshot,false);assert.equal('hiddenUseCaseIds' in result.snapshot,false);assert.deepEqual(result.snapshot.favoriteCommandIds,['demo.create']);const persisted=values.get(state.PLANNING_HELPER_STATE_KEYS.localSnapshot);assert.equal('hiddenCommandIds' in persisted,false);assert.equal('hiddenUseCaseIds' in persisted,false)})});

test('current normalization ignores retired hidden markers so present objects stay present',()=>{const snapshot=state.normalizePlanningHelperLocalSnapshot({schemaVersion:state.LOCAL_SNAPSHOT_SCHEMA_VERSION,planningCommands:[{definition:def,repositoryKnown:true}],helperItems:[],useCases:[],semanticComponents:[],scenarios:[],catalogOrder:{},hiddenCommandIds:['demo.create'],hiddenUseCaseIds:['UC-X']});assert.equal(snapshot.planningCommands[0].definition.id,'demo.create');assert.equal('hiddenCommandIds' in snapshot,false);assert.equal('hiddenUseCaseIds' in snapshot,false)});

test('snapshot rejects an entity that is both present and repository-suppressed',()=>{assert.throws(()=>state.normalizePlanningHelperLocalSnapshot({schemaVersion:state.LOCAL_SNAPSHOT_SCHEMA_VERSION,planningCommands:[{definition:def}],helperItems:[],useCases:[],semanticComponents:[],scenarios:[],catalogOrder:{},suppressedRepository:{commands:['planning/commands/demo.command.md']}}),/both present and repository-suppressed/)});

test('panel geometry persists width and height in addition to position',()=>{const old=globalThis.localStorage;const map=new Map();globalThis.localStorage={getItem:(k)=>map.get(k)||null,setItem:(k,v)=>map.set(k,v)};try{state.savePanelPosition({left:10,top:20,width:900,height:700});assert.deepEqual(state.readPanelPosition(),{left:10,top:20,width:900,height:700})}finally{if(old===undefined)delete globalThis.localStorage;else globalThis.localStorage=old}});


test('catalog-order version upgrade invalidates cached remote SHA, without losing prompt and command order',()=>{
  const order=repositoryCatalog.normalizeCatalogOrder({commands:['demo.create'],prompts:['helper-library:prompt:p']});
  const legacy={...order,schemaVersion:5};delete legacy.promptGroups;
  const upgraded=state.normalizePlanningHelperLocalSnapshot({
    schemaVersion:state.LOCAL_SNAPSHOT_SCHEMA_VERSION,planningCommands:[],helperItems:[{item:prompt,repositoryKnown:true}],
    useCases:[],semanticComponents:[],scenarios:[],catalogOrder:legacy,catalogOrderSha:'sha-of-old-remote-v5'});
  assert.equal(upgraded.catalogOrder.schemaVersion,repositoryCatalog.CATALOG_ORDER_SCHEMA_VERSION);
  assert.equal(upgraded.catalogOrderSha,'','old remote sha must not certify newly serialized content');
  assert.deepEqual(upgraded.catalogOrder.commands,['demo.create']);
  assert.deepEqual(upgraded.catalogOrder.prompts,['helper-library:prompt:p']);
  const again=state.normalizePlanningHelperLocalSnapshot({...upgraded,catalogOrderSha:'sha-new-v6'});
  assert.equal(again.catalogOrderSha,'sha-new-v6','current-version remote evidence must remain valid');
});
