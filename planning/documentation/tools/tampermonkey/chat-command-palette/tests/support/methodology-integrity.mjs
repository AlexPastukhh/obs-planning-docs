import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

export const HARD_INTEGRITY_TEST_NOTE=`HARD METHODOLOGY INTEGRITY TESTS\n\nThese tests guard against accidental partial changes. A failure does not automatically mean the intended methodology change is wrong. Inspect canonical authority first; if the change was intentional, update affected declarations/projections consistently. Do not weaken or update the test merely to make it pass. Tests validate declared authority; they do not define it.`;

export function integrityMessage({invariant,source,problem,check=''}){
  return `[Methodology Integrity]\nInvariant: ${invariant}\nSource: ${source}\nProblem: ${problem}\n\nWhat this usually means:\n  Something may have been added, removed, renamed, moved or rebound without updating all dependent declarations/projections.\n\nWhat to check:\n  1. Was the canonical methodology change intentional?\n  2. Is the canonical owner/declaration correct?\n  3. Are dependent projections/consumers updated consistently?\n  4. If accidental, restore the intended declaration.${check?`\n  5. ${check}`:''}\n\nDo not update/weaken the test merely to make it pass.`;
}

export function assertIntegrity(condition,details){
  assert.ok(condition,integrityMessage(details));
}

export function headingSlug(raw){
  return String(raw).toLowerCase().trim().replace(/<[^>]*>/g,'').replace(/[`*_~]/g,'').replace(/[^\p{L}\p{N}_\-\s]/gu,'').replace(/\s+/g,'-');
}

export function markdownAnchors(text){
  const out=new Set([...String(text).matchAll(/<a\s+(?:id|name)=["']([^"']+)["'][^>]*>/gi)].map((m)=>m[1]));
  const counts=new Map();
  for(const match of String(text).matchAll(/^#{1,6}\s+(.+)$/gm)){
    const base=headingSlug(match[1]),n=counts.get(base)||0;counts.set(base,n+1);out.add(base+(n?`-${n}`:''));
  }
  return out;
}

export function explicitAnchors(text){
  return new Set([...String(text).matchAll(/<a\s+(?:id|name)=["']([^"']+)["'][^>]*>/gi)].map((m)=>m[1]));
}

export function exactCaseExists(repoRoot,rel){
  const normalized=String(rel||'').replaceAll('\\','/').replace(/^\.\//,'');
  if(!normalized||normalized.startsWith('../')||path.posix.isAbsolute(normalized))return false;
  let current=repoRoot;
  for(const part of normalized.split('/')){
    if(!fs.existsSync(current)||!fs.statSync(current).isDirectory())return false;
    if(!fs.readdirSync(current).includes(part))return false;
    current=path.join(current,part);
  }
  return fs.existsSync(current);
}

export function resolveRepoRef(repoRoot,fromRel,href,{anchorMode='markdown',invariant='REFERENCE_RESOLUTION'}={}){
  assertIntegrity(!/^[a-z][a-z0-9+.-]*:/i.test(href),{invariant,source:fromRel,problem:`reference must be repository-local: ${href}`});
  const [rawPath,rawFragment='']=String(href).split('#');
  const targetAbs=path.resolve(repoRoot,path.dirname(fromRel),decodeURI(rawPath||path.basename(fromRel)));
  const rel=path.relative(repoRoot,targetAbs).replaceAll(path.sep,'/');
  assertIntegrity(Boolean(rel)&&!rel.startsWith('../')&&!path.isAbsolute(rel),{invariant,source:fromRel,problem:`reference escapes repository: ${href}`});
  assertIntegrity(exactCaseExists(repoRoot,rel),{invariant,source:fromRel,problem:`missing or wrong-case reference target: ${href}`});
  const fragment=decodeURIComponent(rawFragment||'');
  if(fragment){
    const text=fs.readFileSync(targetAbs,'utf8');
    const set=anchorMode==='explicit'?explicitAnchors(text):markdownAnchors(text);
    assertIntegrity(set.has(fragment),{invariant,source:fromRel,problem:`missing ${anchorMode} anchor ${fragment} in ${rel}`});
  }
  return {rel,abs:targetAbs,fragment};
}

export function anchorRegion(text,anchor){
  const source=String(text),re=/<a\s+(?:id|name)=["']([^"']+)["'][^>]*>/gi;
  const points=[...source.matchAll(re)].map((m)=>({id:m[1],index:m.index}));
  const point=points.find((item)=>item.id===anchor);
  if(!point)return'';
  const next=points.find((item)=>item.index>point.index);
  return source.slice(point.index,next?next.index:source.length);
}

export function responsibilityScopes(text){
  const source=String(text),anchors=[...source.matchAll(/<a\s+(?:id|name)=["']([^"']+)["'][^>]*>/gi)].map((m)=>({id:m[1],index:m.index}));
  const declarations=[...source.matchAll(/^Responsibility ID:\s*`([^`]+)`\s*$/gm)].map((m)=>{
    const preceding=[...anchors].reverse().find((a)=>a.index<=m.index);
    return{id:m[1],declarationIndex:m.index,anchor:preceding?.id||'',start:preceding?.index??m.index};
  }).sort((a,b)=>a.start-b.start);
  return declarations.map((item,index)=>({...item,end:declarations[index+1]?.start??source.length}));
}

export function declaredResponsibilityIds(text){
  const source=String(text),ids=new Set([...source.matchAll(/^Responsibility ID:\s*`([^`]+)`\s*$/gm)].map((m)=>m[1]));
  for(const block of source.matchAll(/^Responsibility IDs:\s*\r?\n((?:- `[^`]+`\s*\r?\n?)+)/gm)){
    for(const item of block[1].matchAll(/^- `([^`]+)`\s*$/gm))ids.add(item[1]);
  }
  return ids;
}

export function buildSemanticComponentOwnerIndex(components){
  const map=new Map();
  for(const component of components||[]){
    const ref=component?.ownerRef;
    if(!ref?.semanticId||!ref.path||!ref.anchor)continue;
    map.set(ref.semanticId,{id:ref.semanticId,path:ref.path,anchor:ref.anchor,kind:component.kind});
  }
  return map;
}

export function responsibilityCanonicalAnchors(text){
  const map=new Map();
  for(const scope of responsibilityScopes(text)){
    if(!scope.anchor)continue;
    if(!map.has(scope.id))map.set(scope.id,new Set());
    map.get(scope.id).add(scope.anchor);
  }
  return map;
}

function escapeRegExp(value){return String(value).replace(/[.*+?^${}()|[\]\\]/g,'\\$&');}

export function assertCanonicalOwnerIdentity({repoRoot,componentOwners,source,responsibilityId,path:ownerPath,anchor,anchorRole='read-entrypoint'}){
  const invariant='CANONICAL_OWNER_REFERENCE_IDENTITY';
  assertIntegrity(Boolean(responsibilityId&&ownerPath&&anchor),{invariant,source,problem:`owner reference must include responsibilityId/path/anchor: ${JSON.stringify({responsibilityId,path:ownerPath,anchor})}`});
  assertIntegrity(anchorRole==='read-entrypoint'||anchorRole==='canonical-owner',{invariant,source,problem:`unsupported anchorRole ${anchorRole}`});
  assertIntegrity(exactCaseExists(repoRoot,ownerPath),{invariant,source,problem:`owner path is missing or wrong-case: ${ownerPath}`});
  const text=fs.readFileSync(path.join(repoRoot,ownerPath),'utf8');
  assertIntegrity(explicitAnchors(text).has(anchor),{invariant,source,problem:`owner read/canonical anchor is not an explicit anchor: ${ownerPath}#${anchor}`});

  const component=componentOwners?.get(responsibilityId);
  if(component){
    assertIntegrity(component.path===ownerPath,{invariant,source,problem:`${responsibilityId} resolves canonically to ${component.path}, not ${ownerPath}`});
    if(anchorRole==='canonical-owner')assertIntegrity(component.anchor===anchor,{invariant,source,problem:`${responsibilityId} canonical owner anchor is ${component.path}#${component.anchor}, not ${ownerPath}#${anchor}`});
    return;
  }

  if(/^UC-[A-Z0-9-]+$/.test(responsibilityId)){
    assertIntegrity(new RegExp(`^#\\s+${escapeRegExp(responsibilityId)}\\b`,'m').test(text),{invariant,source,problem:`${ownerPath} does not declare Use Case ${responsibilityId}`});
    return;
  }

  const declared=declaredResponsibilityIds(text);
  assertIntegrity(declared.has(responsibilityId),{invariant,source,problem:`${responsibilityId} is not declared as a Responsibility ID in ${ownerPath}`});

  const canonicalById=responsibilityCanonicalAnchors(text);
  const ownCanonical=[...(canonicalById.get(responsibilityId)||[])];
  if(anchorRole==='canonical-owner'){
    assertIntegrity(ownCanonical.length===1,{invariant,source,problem:`${responsibilityId} must expose exactly one canonical explicit owner anchor in ${ownerPath}; found ${ownCanonical.length}`});
    assertIntegrity(anchor===ownCanonical[0],{invariant,source,problem:`${responsibilityId} canonical owner anchor is ${ownerPath}#${ownCanonical[0]}, not ${ownerPath}#${anchor}`});
    return;
  }

  for(const [otherId,anchors] of canonicalById){
    if(otherId!==responsibilityId&&anchors.has(anchor)){
      assertIntegrity(false,{invariant,source,problem:`${ownerPath}#${anchor} is the canonical owner anchor of ${otherId}, so it cannot be used as the read entrypoint for ${responsibilityId}`});
    }
  }
}
