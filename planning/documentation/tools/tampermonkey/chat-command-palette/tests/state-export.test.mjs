import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const state=require('../src/state-export.js');
const order={promptGroups:[{id:'group',label:'Проверки',items:['helper-library:prompt:p']}],prompts:['helper-library:prompt:p']};
const snapshot={schemaVersion:9,savedAt:'2026-10-10T00:00:00Z',catalogOrder:order,catalogOrderSha:'',
  helperItems:[{item:{kind:'prompt',id:'p',title:'Тестовый промпт',text:'local-only private instructions',updatedAt:'2026-10-10T00:00:00Z'},repositoryKnown:false,repositorySha:''},
    {item:{kind:'module',id:'m',title:'Audit',text:'module-body'},repositoryKnown:true,repositorySha:'blobsha'}],
  planningCommands:[{definition:{id:'c',name:'Command',body:'command body'},path:'planning/commands/c.command.md',repositoryKnown:true}],
  scenarios:[{id:'scn',title:'Scenario'}],useCases:[{id:'uc',label:'Use case'}],semanticComponents:[{id:'comp',kind:'LENS',label:'Lens'}],
  favoriteCommandIds:['c'],favoriteUseCaseIds:['uc'],suppressedRepository:{helperItems:['hidden']},
  githubToken:'TOP_SECRET_SHOULD_NOT_EXPORT',accessToken:'ALSO_SECRET'};
const settings={owner:'owner',repo:'repo',branch:'main',token:'HIDDEN_TOKEN',password:'HIDDEN_PASSWORD'};
function parsed(text){assert.match(text,/^\[OBS_PLANNING_HELPER_STATE\]\n/);return JSON.parse(text.split('\n').slice(1,-1).join('\n'));}
test('compact ChatGPT state lists grouped prompts and all subsystem counts without prompt bodies or tokens',()=>{
  const raw=state.exportPlanningHelperState(snapshot,settings,'summary'),data=parsed(raw);
  assert.equal(data.mode,'summary');
  assert.equal(data.groups[0].label,'Проверки');
  assert.equal(data.prompts[0].group,'group');
  assert.equal(data.prompts[0].title,'Тестовый промпт');
  assert.equal(data.pending.prompts,1);
  assert.equal(data.pending.catalogOrder,true);
  assert.deepEqual(data.counts,{prompts:1,modules:1,helperCommands:0,commands:1,scenarios:1,useCases:1,semanticComponents:1,promptGroups:1});
  assert.deepEqual(data.repository,{owner:'owner',repo:'repo',branch:'main'});
  assert.equal(data.localSnapshot,undefined);
  for(const secret of ['TOP_SECRET_SHOULD_NOT_EXPORT','ALSO_SECRET','HIDDEN_TOKEN','HIDDEN_PASSWORD','local-only private instructions'])assert.ok(!raw.includes(secret),secret);
});
test('full ChatGPT export includes exact local content and grouping but explicitly omits auth fields',()=>{
  const raw=state.exportPlanningHelperState(snapshot,settings,'full'),data=parsed(raw);
  assert.equal(data.localSnapshot.helperItems[0].item.text,'local-only private instructions');
  assert.equal(data.localSnapshot.planningCommands[0].definition.id,'c');
  assert.deepEqual(data.localSnapshot.catalogOrder.promptGroups,order.promptGroups);
  assert.deepEqual(data.localSnapshot.suppressedRepository,{helperItems:['hidden']});
  for(const secret of ['TOP_SECRET_SHOULD_NOT_EXPORT','ALSO_SECRET','HIDDEN_TOKEN','HIDDEN_PASSWORD'])assert.ok(!raw.includes(secret),secret);
  assert.throws(()=>state.exportPlanningHelperState(snapshot,settings,'unknown'),/Unknown/);
});
