import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  assertIntegrity,
  resolveRepoRef,
  assertCanonicalOwnerIdentity,
  buildSemanticComponentOwnerIndex
} from './support/methodology-integrity.mjs';

/*
 * HARD METHODOLOGY INTEGRITY TESTS
 *
 * These guards catch accidental partial changes across canonical owners and their consumers.
 * A failure does not automatically mean the intended methodology change is wrong: inspect the
 * canonical owner first, then update dependent projections/references if the change was intentional.
 * Do not edit expected values or weaken these guards merely to make them pass.
 * Tests validate declared authority; they do not define it. See TESTING.METHODOLOGY-INTEGRITY.
 */

const moduleRoot=path.resolve(import.meta.dirname,'..');
const repoRoot=path.resolve(moduleRoot,'../../../../..');
const commands=JSON.parse(fs.readFileSync(path.join(moduleRoot,'seed','commands.json'),'utf8')).items;
const components=JSON.parse(fs.readFileSync(path.join(moduleRoot,'seed','semantic-components.json'),'utf8')).items;
const commandSourceDir=path.join(repoRoot,'planning','commands');
const componentOwners=buildSemanticComponentOwnerIndex(components.filter((item)=>item.kind==='TARGET_MODULE'||item.kind==='LENS'));
const componentByOwnerPath=new Map([...componentOwners.values()].map((owner)=>[owner.path,owner]));
const read=(rel)=>fs.readFileSync(path.join(repoRoot,rel),'utf8');


function sourceCommandDefinitions(){
  const definitions=[];
  for(const name of fs.readdirSync(commandSourceDir).filter((entry)=>entry.endsWith('.command.md')).sort()){
    const rel=`planning/commands/${name}`,text=read(rel);
    const match=text.match(/\[PLANNING_COMMAND_DEFINITION\]\s*([\s\S]*?)\s*\[\/PLANNING_COMMAND_DEFINITION\]/);
    if(!match)continue;
    let definition;
    try{definition=JSON.parse(match[1]);}catch(error){assert.fail(`${rel}: invalid PLANNING_COMMAND_DEFINITION JSON: ${error.message}`);}
    definitions.push({rel,definition});
  }
  return definitions;
}

function parseLensAttachments(component){
  const ownerRel=component.ownerRef?.path||component.sources?.at(-1);
  if(!ownerRel)return[];
  const lines=read(ownerRel).split(/\r?\n/),refs=[];
  let currentUnit='',inside=false,mode='';
  for(let i=0;i<lines.length;i++){
    const heading=lines[i].match(/^#{2,6}\s+`?(RU-[A-Z0-9-]+)`?\b/);if(heading){currentUnit=heading[1];inside=false;mode='';}
    if(lines[i].trim()==='**Lens Attachments**'||/^#{2,6}\s+Lens Attachments\s*$/.test(lines[i])){inside=true;mode='';continue;}
    if(!inside)continue;
    if(!lines[i].trim()||/^#{1,6}\s/.test(lines[i])){if(lines[i].trim())inside=false;continue;}
    if(/^- \*\*REQUIRED \[[^\]]+\]:\*\*$/.test(lines[i])){mode='REQUIRED';continue;}
    if(lines[i]==='- **TRIGGERED:**'){mode='TRIGGERED';continue;}
    const m=lines[i].match(/^\s{2}- \[`(LENS-[A-Z0-9-]+)`\]\(([^)]+)\)$/);
    if(m)refs.push({unit:currentUnit,lensId:m[1],href:m[2],mode,line:i+1});
  }
  return refs.map((ref)=>({...ref,ownerRel}));
}

function parseSemanticDependencies(component){
  const ownerRel=component.ownerRef?.path||component.sources?.at(-1),text=read(ownerRel),found=[];
  const compact=/^>\s*-\s*`(RESTATES|CONTEXTUALIZES|EXTENDS|REPRESENTS|MIGRATES)`\s+\[([^\]]+)\]\(([^)]+)\)(?:\s*[—-]\s*`([^`]+)`)?[^\n]*$/gm;
  const structured=/^>\s*Semantic Owner Dependency\s*\r?\n>\s*Type:\s*`?(RESTATES|CONTEXTUALIZES|EXTENDS|REPRESENTS|MIGRATES)`?\s*\r?\n>\s*Responsibility:\s*`([^`]+)`\s*\r?\n>\s*Owner:\s*\[([^\]]+)\]\(([^)]+)\)[^\n]*$/gm;
  const compactStructured=/^>\s*-\s*Type:\s*`?(RESTATES|CONTEXTUALIZES|EXTENDS|REPRESENTS|MIGRATES)`?\s*;\s*Responsibility:\s*`([^`]+)`\s*;\s*Owner:\s*\[([^\]]+)\]\(([^)]+)\)[^\n]*$/gm;
  for(const m of text.matchAll(compact))found.push({index:m.index,type:m[1],label:m[2],href:m[3],responsibilityId:m[4]||''});
  for(const m of text.matchAll(structured))found.push({index:m.index,type:m[1],responsibilityId:m[2],label:m[3],href:m[4]});
  for(const m of text.matchAll(compactStructured))found.push({index:m.index,type:m[1],responsibilityId:m[2],label:m[3],href:m[4]});
  const seen=new Set(),out=[];
  for(const item of found.sort((a,b)=>a.index-b.index)){
    const key=[item.type,item.responsibilityId,item.href,item.label].join('\0');
    if(seen.has(key))continue;seen.add(key);out.push({...item,ownerRel});
  }
  return out;
}

test('every source command direct ownerRef binds owner identity to its canonical path and a valid non-conflicting read entrypoint',()=>{
  const sourceDefinitions=sourceCommandDefinitions();
  assertIntegrity(sourceDefinitions.length===commands.length,{invariant:'COMMAND_OWNER_REF_SOURCE_COVERAGE',source:'planning/commands/*.command.md',problem:`source command definitions (${sourceDefinitions.length}) do not match generated command inventory (${commands.length})`});
  const sourceIds=new Set(sourceDefinitions.map(({definition})=>definition.id)),seedIds=new Set(commands.map((command)=>command.id));
  assertIntegrity(sourceIds.size===seedIds.size&&[...sourceIds].every((id)=>seedIds.has(id)),{invariant:'COMMAND_OWNER_REF_SOURCE_COVERAGE',source:'planning/commands/*.command.md',problem:'source command IDs and generated command IDs differ'});
  for(const {rel,definition} of sourceDefinitions){
    for(const ref of definition.ownerRefs||[]){
      assertCanonicalOwnerIdentity({repoRoot,componentOwners,source:`${rel} :: ${definition.id}`,responsibilityId:ref.responsibilityId,path:ref.path,anchor:ref.anchor,anchorRole:'read-entrypoint'});
    }
  }
});

test('every declared Unit Lens Attachment href resolves to the same canonical Lens named by the attachment',()=>{
  for(const component of components.filter((item)=>item.kind==='TARGET_MODULE')){
    for(const ref of parseLensAttachments(component)){
      const resolved=resolveRepoRef(repoRoot,ref.ownerRel,ref.href,{anchorMode:'explicit',invariant:'LENS_ATTACHMENT_CANONICAL_REFERENCE'});
      const expected=componentOwners.get(ref.lensId);
      assertIntegrity(Boolean(expected),{invariant:'LENS_ATTACHMENT_CANONICAL_REFERENCE',source:`${ref.ownerRel}:${ref.line}`,problem:`${ref.lensId} is not a registered current Lens owner`});
      assertIntegrity(resolved.rel===expected.path&&(!resolved.fragment||resolved.fragment===expected.anchor),{invariant:'LENS_ATTACHMENT_CANONICAL_REFERENCE',source:`${ref.ownerRel}:${ref.line}`,problem:`${ref.lensId} points to ${resolved.rel}${resolved.fragment?`#${resolved.fragment}`:''}, canonical owner is ${expected.path}#${expected.anchor}`});
    }
  }
});

test('every typed Semantic Owner Dependency resolves to the canonical owner anchor for its declared Responsibility ID',()=>{
  for(const component of components.filter((item)=>item.kind==='TARGET_MODULE'||item.kind==='LENS')){
    for(const dep of parseSemanticDependencies(component)){
      const resolved=resolveRepoRef(repoRoot,dep.ownerRel,dep.href,{invariant:'SEMANTIC_OWNER_DEPENDENCY_REFERENCE'});
      if(dep.responsibilityId){
        assertCanonicalOwnerIdentity({repoRoot,componentOwners,source:`${dep.ownerRel} :: ${component.id}`,responsibilityId:dep.responsibilityId,path:resolved.rel,anchor:resolved.fragment,anchorRole:'canonical-owner'});
      }else{
        const target=componentByOwnerPath.get(resolved.rel);
        assertIntegrity(Boolean(target)&&target.anchor===resolved.fragment,{invariant:'SEMANTIC_OWNER_DEPENDENCY_REFERENCE',source:`${dep.ownerRel} :: ${component.id}`,problem:`dependency without Responsibility ID must resolve directly to a current TM/Lens owner, got ${dep.href}`});
      }
    }
  }
});
