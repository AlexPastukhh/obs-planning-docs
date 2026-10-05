import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';

const require=createRequire(import.meta.url);
const codec=require('../src/command-definition-codec.js');
const catalog=require('../src/command-catalog.js');
const body=require('../src/command-body.js');
const helper=require('../src/helper-library-codec.js');
const semantic=require('../src/semantic-projections.js');
const repositoryCatalog=require('../src/repository-catalog-service.js');

let mountedOptions=null;
globalThis.ObsPlanningHelper={
  ...codec,
  ...catalog,
  ...body,
  ...helper,
  ...semantic,
  ...repositoryCatalog,
  createPlanningHelperUi(options){mountedOptions=options;return{dispose(){}};}
};
const state=require('../src/planning-helper-state.js');
Object.assign(globalThis.ObsPlanningHelper,state);
const runtime=require('../src/planning-helper-runtime.js');

function command(id='demo.create'){
  return codec.normalizeCommandDefinition({schemaVersion:1,id,file:`${id}.command.md`,command:id,englishName:id,commandFamily:[id],description:'d',meaning:'m',activeContextBehavior:'a',traversalReadMode:'t',ownerFiles:[],expectedOutput:'o',permissionMode:'read-only',keyReminders:['r'],userTarget:'<t>',palette:true,refinements:[]});
}
function prompt(){return helper.normalizeHelperLibraryItem({kind:'prompt',id:'local-prompt',title:'Local prompt',text:'keep me',createdAt:'2026-01-01T00:00:00Z',updatedAt:'2026-01-01T00:00:00Z'});}

async function withGm(initial,fn){
  const oldGet=globalThis.GM_getValue,oldSet=globalThis.GM_setValue,values=new Map(Object.entries(initial));
  globalThis.GM_getValue=async(key,fallback)=>values.has(key)?values.get(key):fallback;
  globalThis.GM_setValue=async(key,value)=>values.set(key,value);
  try{return await fn(values);}finally{if(oldGet===undefined)delete globalThis.GM_getValue;else globalThis.GM_getValue=oldGet;if(oldSet===undefined)delete globalThis.GM_setValue;else globalThis.GM_setValue=oldSet;}
}

test('startup mounts UI after discarding only an incompatible repository-backed command cache',async()=>{
  mountedOptions=null;
  const stale={...command(),compositionContributions:[{kind:'LEGACY_PORT_REQUIREMENT',value:'legacy',why:'old cache shape'}]};
  const snapshot={schemaVersion:8,savedAt:'2026-10-04T18:40:18.187Z',planningCommands:[{definition:stale,repositoryKnown:true}],helperItems:[{item:prompt(),repositoryKnown:false}],useCases:[],semanticComponents:[],scenarios:[],catalogOrder:{},favoriteCommandIds:['demo.create']};
  await withGm({[state.PLANNING_HELPER_STATE_KEYS.localSnapshot]:snapshot},async(values)=>{
    const instance=await runtime.startPlanningHelper();
    try{
      assert.ok(mountedOptions,'Planning Helper UI should mount');
      assert.deepEqual(instance.getDefinitions(),[]);
      assert.equal(instance.getLocalLibrary()[0].id,'local-prompt');
      assert.match(mountedOptions.startupWarnings.join('\n'),/Cached Planning Command catalog was incompatible/);
      assert.match(mountedOptions.startupWarnings.join('\n'),/Hard Reload GitHub/);
      const persisted=values.get(state.PLANNING_HELPER_STATE_KEYS.localSnapshot);
      assert.equal(persisted.schemaVersion,state.LOCAL_SNAPSHOT_SCHEMA_VERSION);
      assert.equal(persisted.commandCacheSchemaVersion,state.COMMAND_CACHE_SCHEMA_VERSION);
      assert.equal(persisted.planningCommands.length,0);
    }finally{instance.dispose();}
  });
});
