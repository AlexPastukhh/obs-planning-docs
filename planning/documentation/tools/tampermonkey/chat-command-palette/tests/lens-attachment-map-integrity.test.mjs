import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const moduleRoot=path.resolve(import.meta.dirname,'..');
const repoRoot=path.resolve(moduleRoot,'../../../../..');
const components=JSON.parse(fs.readFileSync(path.join(moduleRoot,'seed','semantic-components.json'),'utf8')).items;
const read=(rel)=>fs.readFileSync(path.join(repoRoot,rel),'utf8');

const mapRel='planning/documentation/idtspe-methodology/active/profiles/sds/registries/LENS-ATTACHMENT-MAP.md';
const integrityRel='planning/documentation/idtspe-methodology/active/profiles/sds/registries/LENS-ATTACHMENT-MAP-INTEGRITY.md';
const coreLensRegistryRel='planning/documentation/idtspe-methodology/active/idtspe-core/lenses/LENS-REGISTRY.md';
const sdsLensRegistryRel='planning/documentation/idtspe-methodology/active/profiles/sds/registries/LENS-REGISTRY.md';

function parseAttachmentBlock(ownerRel,moduleId){
  const lines=read(ownerRel).split(/\r?\n/),result=new Map();
  let currentUnit=null;
  for(let i=0;i<lines.length;i++){
    const heading=lines[i].match(/^#{2,6}\s+`?(RU-[A-Z0-9-]+)`?\b/);
    if(heading)currentUnit=heading[1];
    const attachmentHeading=lines[i].trim()==='**Lens Attachments**'||/^#{2,6}\s+Lens Attachments\s*$/.test(lines[i]);
    if(!attachmentHeading)continue;
    assert.ok(currentUnit,`${moduleId}: Lens Attachments block has no preceding RU heading at ${ownerRel}:${i+1}`);
    assert.equal(result.has(currentUnit),false,`${moduleId}/${currentUnit}: duplicate Lens Attachments block`);

    const block=[];let started=false;
    for(let j=i+1;j<lines.length;j++){
      const line=lines[j];
      if(!line.trim()){
        if(started)break;
        continue;
      }
      if(/^#{1,6}\s/.test(line))break;
      started=true;block.push(line);
    }

    let mode=null,core=false;const required=[],triggered=[];
    for(const line of block){
      if(/^- \*\*Core Lens Pack:\*\* `INHERITED`/.test(line)){core=true;continue;}
      const requiredHeader=line.match(/^- \*\*REQUIRED \[([^\]]+)\]:\*\*$/);
      if(requiredHeader){
        assert.equal(requiredHeader[1],'CLOSING',`${moduleId}/${currentUnit}: map projection supports REQUIRED [CLOSING] only, found REQUIRED [${requiredHeader[1]}]`);
        mode='R';continue;
      }
      if(line==='- **TRIGGERED:**'){mode='T';continue;}
      const lensLine=line.match(/^\s{2}- \[`(LENS-[A-Z0-9-]+)`\]\([^)]+\)$/);
      if(lensLine){
        assert.ok(mode,`${moduleId}/${currentUnit}: Lens reference appears outside REQUIRED/TRIGGERED section`);
        (mode==='R'?required:triggered).push(lensLine[1]);
        continue;
      }
      assert.fail(`${moduleId}/${currentUnit}: non-declarative or unrecognized Lens Attachments line: ${line}`);
    }
    assert.equal(core,true,`${moduleId}/${currentUnit}: Core Lens Pack must be INHERITED`);
    assert.equal(new Set(required).size,required.length,`${moduleId}/${currentUnit}: duplicate REQUIRED Lens`);
    assert.equal(new Set(triggered).size,triggered.length,`${moduleId}/${currentUnit}: duplicate TRIGGERED Lens`);
    for(const id of required)assert.equal(triggered.includes(id),false,`${moduleId}/${currentUnit}: ${id} cannot be both REQUIRED and TRIGGERED`);
    result.set(currentUnit,{required:new Set(required),triggered:new Set(triggered)});
  }
  return result;
}

function parseMap(){
  const text=read(mapRel),lines=text.split(/\r?\n/),keys=new Map(),modules=new Map();
  let inAdditionalKeys=false,inProjection=false,currentModule=null;
  for(const line of lines){
    if(line==='### Additional Lens keys used by this projection'){inAdditionalKeys=true;continue;}
    if(line==='## Unit Attachment Projection'){inAdditionalKeys=false;inProjection=true;continue;}
    if(line.startsWith('## Profile-context boundary')){inProjection=false;currentModule=null;}
    if(inAdditionalKeys){
      const m=line.match(/^\| `([A-Z0-9]+)` \| `(LENS-[A-Z0-9-]+)` \|/);
      if(m){assert.equal(keys.has(m[1]),false,`duplicate map key ${m[1]}`);keys.set(m[1],m[2]);}
    }
    if(!inProjection)continue;
    const moduleHeading=line.match(/^### `(TM-[A-Z0-9-]+)`$/);
    if(moduleHeading){
      currentModule=moduleHeading[1];assert.equal(modules.has(currentModule),false,`duplicate map module ${currentModule}`);modules.set(currentModule,new Map());continue;
    }
    const row=line.match(/^\| `(RU-[A-Z0-9-]+)` \| (.*?) \| (.*?) \|$/);
    if(!row)continue;
    assert.ok(currentModule,`map Unit ${row[1]} appears before a module heading`);
    const unitRows=modules.get(currentModule);assert.equal(unitRows.has(row[1]),false,`${currentModule}/${row[1]} duplicate map row`);
    const parseCell=(cell)=>cell==='—'||cell.trim()===''?[]:[...cell.matchAll(/`([A-Z0-9]+)`/g)].map((m)=>m[1]);
    const r=parseCell(row[2]),t=parseCell(row[3]);
    assert.equal(new Set(r).size,r.length,`${currentModule}/${row[1]} duplicate R key`);
    assert.equal(new Set(t).size,t.length,`${currentModule}/${row[1]} duplicate T key`);
    for(const key of [...r,...t])assert.ok(keys.has(key),`${currentModule}/${row[1]} references unknown map key ${key}`);
    for(const key of r)assert.equal(t.includes(key),false,`${currentModule}/${row[1]} key ${key} cannot be both R and T`);
    unitRows.set(row[1],{required:new Set(r.map((key)=>keys.get(key))),triggered:new Set(t.map((key)=>keys.get(key)))});
  }
  return {keys,modules};
}

function registeredLensIds(rel){
  return new Set([...read(rel).matchAll(/^\| \[`(LENS-[A-Z0-9-]+)`\]/gm)].map((m)=>m[1]));
}

function sorted(set){return [...set].sort();}

test('SDS Lens Attachment Map is an exact projection of current Core+SDS Unit owners',()=>{
  const map=parseMap();
  const targetModules=components.filter((component)=>component.kind==='TARGET_MODULE'&&['Core','SDS'].includes(component.scope));
  assert.equal(targetModules.filter((component)=>component.scope==='Core').length,5);
  assert.equal(targetModules.filter((component)=>component.scope==='SDS').length,14);
  assert.deepEqual(new Set(map.modules.keys()),new Set(targetModules.map((component)=>component.id)));

  const registered=new Set([...registeredLensIds(coreLensRegistryRel),...registeredLensIds(sdsLensRegistryRel)]);
  assert.ok(registered.size>=20,'expected current Core+SDS Lens registries');
  for(const lensId of map.keys.values())assert.ok(registered.has(lensId),`map key resolves to unknown/unregistered Lens ${lensId}`);

  let unitCount=0,requiredCount=0,triggeredCount=0;
  for(const component of targetModules){
    const ownerRel=component.sources.at(-1),expected=parseAttachmentBlock(ownerRel,component.id),projected=map.modules.get(component.id);
    assert.ok(projected,`${component.id}: missing map module section`);
    assert.deepEqual(new Set(projected.keys()),new Set(expected.keys()),`${component.id}: map Unit inventory drift`);
    for(const [unitId,ownerAttachments] of expected){
      const row=projected.get(unitId);assert.ok(row,`${component.id}/${unitId}: missing map row`);
      assert.deepEqual(sorted(row.required),sorted(ownerAttachments.required),`${component.id}/${unitId}: REQUIRED projection drift`);
      assert.deepEqual(sorted(row.triggered),sorted(ownerAttachments.triggered),`${component.id}/${unitId}: TRIGGERED projection drift`);
      for(const lensId of [...ownerAttachments.required,...ownerAttachments.triggered])assert.ok(registered.has(lensId),`${component.id}/${unitId}: owner references unknown/unregistered Lens ${lensId}`);
      unitCount++;requiredCount+=ownerAttachments.required.size;triggeredCount+=ownerAttachments.triggered.size;
    }
  }
  assert.equal(unitCount,58);
  assert.equal(requiredCount,52);
  assert.equal(triggeredCount,177);
});

test('Lens attachment projection integrity owner preserves source-of-truth direction and discoverability',()=>{
  const integrity=read(integrityRel),map=read(mapRel);
  const directory=read('planning/documentation/idtspe-methodology/active/profiles/sds/registries/METHODOLOGY-REGISTRY-DIRECTORY.md');
  const responsibility=read('planning/documentation/idtspe-methodology/active/profiles/sds/RESPONSIBILITY-MAP.md');
  assert.match(integrity,/Responsibility ID: `SDS\.LENS-ATTACHMENT-PROJECTION-INTEGRITY`/);
  assert.match(integrity,/concrete Target Module Unit owner \/ Lens Attachments block[\s\S]*→ normative predictable attachment[\s\S]*→ projected into LENS-ATTACHMENT-MAP/);
  assert.match(integrity,/Unit owners are normative|map disagrees with a Unit owner, repair the map/i);
  assert.match(map,/LENS-ATTACHMENT-MAP-INTEGRITY\.md/);
  assert.match(directory,/LENS-ATTACHMENT-MAP-INTEGRITY\.md/);
  assert.match(responsibility,/SDS\.LENS-ATTACHMENT-PROJECTION-INTEGRITY/);
});

test('documentation and methodology maintenance treat attachment projections as bounded impact indexes and maintain them only from normative inputs',()=>{
  const revalidation=read('planning/documentation/processes/SEMANTIC-OWNER-CHANGE-REVALIDATION.process.md');
  const plan=read('planning/documentation/use-cases/UC-DOC-PLAN-DOCUMENTATION-CHANGE.md');
  const review=read('planning/documentation/use-cases/UC-DOC-REVIEW-DOCUMENTATION.md');
  const maintainLens=read('planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/maintain-lens/UC-IDTSPE-MAINTAIN-LENS.md');
  const maintainTm=read('planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/maintain-target-module/UC-IDTSPE-MAINTAIN-TARGET-MODULE.md');

  for(const [name,text] of [['revalidation',revalidation],['plan',plan],['review',review],['maintain Lens',maintainLens],['maintain Target Module',maintainTm]]){
    assert.match(text,/active[- ]profile[^\n]*(?:Unit→Lens|attachment projection)|attachment projection[^\n]*active[- ]profile/i,`${name}: must route through applicable active-profile attachment projection`);
    assert.match(text,/predictable(?: Unit↔Lens)? attachment/i,`${name}: must bound attachment-map coverage to predictable attachments`);
    assert.match(text,/registry[^\n]*(?:context-emergent|unexpected)|(?:context-emergent|unexpected)[^\n]*registry/i,`${name}: must preserve registry-driven discovery outside the projection`);
  }

  assert.match(maintainLens,/## Lens Attachment Projection Handoff/);
  assert.match(maintainTm,/## Lens Attachment Projection Handoff/);
  assert.match(maintainLens,/Concrete Unit attachment owners remain normative; the map remains projection only/);
  assert.match(maintainTm,/Unit attachment declaration remains normative; the map remains projection only/);
  assert.match(revalidation,/consulting a map for impact discovery does not by itself require rewriting it/);
  assert.match(plan,/Include map maintenance\/integrity work only when the change can alter the maps' normative projection inputs/);
  assert.match(review,/Do not run or demand full projection integrity merely because a review consulted a map/);

  const genericDocs=[revalidation,plan,review,maintainLens,maintainTm].join('\n');
  assert.doesNotMatch(genericDocs,/profiles\/sds\/registries\/LENS-ATTACHMENT-MAP\.md/i,'Core/general workflows must not hard-code the SDS attachment-map path');
});
