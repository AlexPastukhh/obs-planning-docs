import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {resolveRepoRef} from './support/methodology-integrity.mjs';

/*
 * HARD METHODOLOGY INTEGRITY TESTS
 *
 * Failure means declared authority and a dependent projection/reference may be inconsistent.
 * Inspect canonical authority first. If the methodology change was intentional, update affected
 * projections/consumers consistently. Do not weaken/update the test merely to make it pass.
 * Tests validate declarations; they do not define methodology authority.
 * See TESTING.METHODOLOGY-INTEGRITY.
 */

const moduleRoot=path.resolve(import.meta.dirname,'..');
const repoRoot=path.resolve(moduleRoot,'../../../../..');
const commands=JSON.parse(fs.readFileSync(path.join(moduleRoot,'seed','commands.json'),'utf8')).items;
const read=(rel)=>fs.readFileSync(path.join(repoRoot,rel),'utf8');
const profileRegistryRel='planning/documentation/idtspe-methodology/active/profiles/PROFILE-REGISTRY.md';
const profileMapRel='planning/documentation/idtspe-methodology/active/profiles/RESPONSIBILITY-MAP.md';

function section(text,title,level=2){
  const marker=`${'#'.repeat(level)} ${title}`;
  const start=text.indexOf(marker);assert.notEqual(start,-1,`missing section ${marker}`);
  const bodyStart=text.indexOf('\n',start)+1;
  const next=new RegExp(`^#{1,${level}}\\s+`, 'gm');next.lastIndex=bodyStart;
  const found=next.exec(text);return text.slice(bodyStart,found?found.index:text.length);
}
function numberedLinks(sectionText){
  const links=[];
  for(const line of sectionText.split(/\r?\n/)){
    if(!/^\d+\.\s+/.test(line))continue;
    for(const match of line.matchAll(/\[[^\]]+\]\(([^)]+)\)/g))links.push(match[1]);
  }
  return links;
}
function resolveLocal(fromRel,href){
  return resolveRepoRef(repoRoot,fromRel,href,{invariant:'BOOTSTRAP_REFERENCE'}).rel;
}
function assertDeclaredReadSet(rel,heading,level=2){
  const links=numberedLinks(section(read(rel),heading,level));
  assert.equal(new Set(links).size,links.length,`${rel}: duplicate link in mandatory bootstrap read set`);
  for(const href of links)resolveLocal(rel,href);
  return links;
}
function installedProfiles(){
  const installed=section(read(profileRegistryRel),'Installed');
  const rows=[];
  for(const line of installed.split(/\r?\n/)){
    if(!line.startsWith('|')||/^\|\s*-/.test(line)||/\|\s*Profile\s*\|/.test(line))continue;
    const links=[...line.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)];
    if(!links.length)continue;
    assert.ok(links.length>=2,`${profileRegistryRel}: installed profile row must expose profile and bootstrap entry links: ${line}`);
    rows.push({label:links[0][1],profileHref:links[0][2],bootstrapHref:links[1][2]});
  }
  assert.ok(rows.length>0,'installed profile registry is empty');
  return rows;
}
function responsibilityId(text){return text.match(/^Responsibility ID:\s*`([^`]+)`\s*$/m)?.[1]||'';}
function responsibilityRows(rel){
  const rows=[];
  for(const line of read(rel).split(/\r?\n/)){
    if(!line.startsWith('|')||/^\|\s*-/.test(line))continue;
    const owner=line.match(/\[[^\]]+\]\(([^)]+)\)\s*[—-]\s*`([^`]+)`/);
    if(owner)rows.push({href:owner[1],responsibilityId:owner[2]});
  }
  return rows;
}
function compactDependencies(text){
  return [...text.matchAll(/^>\s*-\s*`([A-Z]+)`\s+\[[^\]]+\]\(([^)]+)\)(?:\s*[—-]\s*`([^`]+)`)?[^\n]*$/gm)]
    .map((m)=>({type:m[1],href:m[2],responsibilityId:m[3]||''}));
}

// Hard-integrity only: these tests validate declared topology/identity. They intentionally do not
// prescribe bootstrap size, exact file lists, wording, profile counts, or architecture beyond
// machine-resolvable contracts already declared by canonical owners/registries.

test('declared primary, Documentation and Core bootstrap read sets resolve without duplicate targets',()=>{
  const primary=assertDeclaredReadSet('planning/README.md','Primary Bootstrap');
  const documentation=assertDeclaredReadSet('planning/documentation/README.md','Bootstrap');
  const core=assertDeclaredReadSet('planning/documentation/idtspe-methodology/active/idtspe-core/README.md','Bootstrap Spine — Required From Cold / Unreliable Core Context',3);
  assert.ok(primary.length>0&&documentation.length>0&&core.length>0);
  for(const href of primary)assert.doesNotMatch(href,/(^|\/)profiles\//,`primary bootstrap must stop before profile bootstrap: ${href}`);
});

test('installed profile registry entries resolve to unique canonical profile bootstrap owners already routed by each child responsibility map',()=>{
  const ids=new Set(),paths=new Set();
  for(const row of installedProfiles()){
    resolveLocal(profileRegistryRel,row.profileHref);
    const bootstrapRel=resolveLocal(profileRegistryRel,row.bootstrapHref);
    assert.ok(!paths.has(bootstrapRel),`${row.label}: duplicate bootstrap owner ${bootstrapRel}`);paths.add(bootstrapRel);
    const text=read(bootstrapRel),id=responsibilityId(text);
    assert.ok(id,`${bootstrapRel}: missing Responsibility ID`);
    assert.ok(!ids.has(id),`${bootstrapRel}: duplicate bootstrap Responsibility ID ${id}`);ids.add(id);
    section(text,'Profile Bootstrap');
    const childMapRel=path.posix.join(path.posix.dirname(bootstrapRel),'RESPONSIBILITY-MAP.md');
    assert.ok(fs.existsSync(path.join(repoRoot,childMapRel)),`${row.label}: missing profile-local responsibility map ${childMapRel}`);
    const routed=responsibilityRows(childMapRel).filter((route)=>resolveLocal(childMapRel,route.href)===bootstrapRel);
    assert.equal(routed.length,1,`${row.label}: child responsibility map must route the canonical bootstrap owner exactly once`);
    assert.equal(routed[0].responsibilityId,id,`${row.label}: child responsibility map bootstrap Responsibility ID must match its canonical owner`);
  }
});

test('every installed profile bootstrap formally depends on the canonical installed-profile discovery owner',()=>{
  const discoveryId=responsibilityId(read(profileRegistryRel));
  assert.ok(discoveryId,`${profileRegistryRel}: missing Responsibility ID`);
  for(const row of installedProfiles()){
    const bootstrapRel=resolveLocal(profileRegistryRel,row.bootstrapHref),deps=compactDependencies(read(bootstrapRel));
    const discovery=deps.filter((dep)=>dep.responsibilityId===discoveryId&&resolveLocal(bootstrapRel,dep.href)===profileRegistryRel);
    assert.equal(discovery.length,1,`${bootstrapRel}: expected one formal dependency on canonical profile discovery owner ${discoveryId}`);
    assert.ok(discovery[0].href.includes('#'),`${bootstrapRel}: profile discovery dependency must address a stable anchor`);
  }
});

test('installed profile bootstrap read sets resolve exactly as declared and contain no duplicate links',()=>{
  for(const row of installedProfiles()){
    const bootstrapRel=resolveLocal(profileRegistryRel,row.bootstrapHref);
    assertDeclaredReadSet(bootstrapRel,'Profile Bootstrap');
  }
});

test('installed-profile responsibility routing covers every installed profile child responsibility map',()=>{
  const routed=new Set([...read(profileMapRel).matchAll(/\[[^\]]+\]\(([^)]+)\)/g)].map((m)=>resolveLocal(profileMapRel,m[1])));
  for(const row of installedProfiles()){
    const bootstrapRel=resolveLocal(profileRegistryRel,row.bootstrapHref);
    const expected=path.posix.join(path.posix.dirname(bootstrapRel),'RESPONSIBILITY-MAP.md');
    assert.ok(fs.existsSync(path.join(repoRoot,expected)),`${row.label}: missing profile-local responsibility map ${expected}`);
    assert.ok(routed.has(expected),`${row.label}: installed-profile responsibility map does not route ${expected}`);
  }
});

test('every BOOTSTRAP command uses the typed no-host/no-component binding contract',()=>{
  const bootstraps=commands.filter((command)=>command.methodologyBinding?.surfaceKind==='BOOTSTRAP');
  assert.ok(bootstraps.length>0,'no BOOTSTRAP command surfaces found');
  for(const command of bootstraps){
    const binding=command.methodologyBinding;
    assert.equal(binding.hostTargetPolicy,'NONE',`${command.id}: bootstrap command cannot host a Target`);
    assert.equal(binding.targetModuleId,null,`${command.id}: bootstrap command cannot bind a Target Module`);
    assert.equal(binding.lensId,null,`${command.id}: bootstrap command cannot bind a Lens`);
  }
});
