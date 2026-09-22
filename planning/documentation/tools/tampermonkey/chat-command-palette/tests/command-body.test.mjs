import test from 'node:test'; import assert from 'node:assert/strict'; import { createRequire } from 'node:module'; const require=createRequire(import.meta.url); const body=require('../src/command-body.js');
const d={id:'file_update.plan',file:'plan-file-update.command.md',command:'план файл-обновление',englishName:'plan file update',commandFamily:['план файл-обновление','plan file update'],activeContextBehavior:'When one file update must be planned.',expectedOutput:'One bounded update plan.',meaning:'Plan the exact file update without editing.',keyReminders:['No edits.'],userTarget:'<target>',palette:true,refinements:[]};
test('adaptive body points through root Command Routing and command definition',()=>{const text=body.buildCommandBody(d,body.MODE.ADAPTIVE);assert.match(text,/Start from `planning\/command-routing\.md`/);assert.match(text,/planning\/commands\/plan-file-update\.command\.md/);assert.match(text,/english_name:\n  plan file update/);assert.match(text,/context:\n  When one file update must be planned/);assert.match(text,/result:\n  One bounded update plan/);assert.match(text,/essence:\n  Plan the exact file update without editing/)});
test('full body requires fresh full route',()=>assert.match(body.buildCommandBody(d,body.MODE.FULL),/Full route reading is required/));


test('generated UC invocation body routes through generic command and exact UC',()=>{const generic={file:'invoke-use-case.command.md',keyReminders:['Keep authority in UC owner.']};const uc={id:'UC-PLAN-TEST-PLAN',label:'Plan Practical Testing / Acceptance',description:'practical plan',sources:['planning/documentation/testing-planning/use-case-registry.md'],target:'<test target>'};const text=body.buildUseCaseInvocationBody(generic,uc,'adaptive');assert.match(text,/planning\/commands\/invoke-use-case\.command\.md/);assert.match(text,/UC-PLAN-TEST-PLAN/);assert.match(text,/testing-planning\/use-case-registry\.md/);});


test('command body derives included-by from the canonical include DAG without a second relation',()=>{
  const base={...d,id:'base.cmd',file:'base.command.md',includes:[]};
  const child={...d,id:'child.cmd',file:'child.command.md',includes:['planning/commands/base.command.md']};
  const text=body.buildCommandBody(base,body.MODE.ADAPTIVE,{definitions:[base,child]});
  assert.match(text,/included_by_derived:[\s\S]*child\.cmd/);
  assert.match(text,/`includes` remains the single canonical command dependency relation/);
});
