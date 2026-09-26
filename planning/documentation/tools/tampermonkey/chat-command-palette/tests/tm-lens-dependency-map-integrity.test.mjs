import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const moduleRoot=path.resolve(import.meta.dirname,'..');
const repoRoot=path.resolve(moduleRoot,'../../../../..');
const components=JSON.parse(fs.readFileSync(path.join(moduleRoot,'seed','semantic-components.json'),'utf8')).items
  .filter((component)=>component.kind==='TARGET_MODULE'||component.kind==='LENS');
const read=(rel)=>fs.readFileSync(path.join(repoRoot,rel),'utf8');
const mapRel='planning/documentation/idtspe-methodology/active/navigation/TARGET-MODULE-LENS-DEPENDENCY-MAP.md';
const integrityRel='planning/documentation/idtspe-methodology/active/navigation/TARGET-MODULE-LENS-DEPENDENCY-MAP-INTEGRITY.md';
const allowedTypes=new Set(['RESTATES','CONTEXTUALIZES','EXTENDS','REPRESENTS','MIGRATES']);
const componentByOwnerPath=new Map(components.map((component)=>[path.resolve(repoRoot,component.sources.at(-1)),component.id]));

function anchors(text){
  const ids=new Set([...text.matchAll(/(?:id|name)=["']([^"']+)["']/g)].map((match)=>match[1]));
  const counts=new Map();
  for(const match of text.matchAll(/^#{1,6}\s+(.+)$/gm)){
    const slug=match[1].trim().toLowerCase().replace(/<[^>]*>/g,'').replace(/[^\p{L}\p{N}_\-\s]/gu,'').replace(/\s/g,'-');
    const n=counts.get(slug)||0;counts.set(slug,n+1);ids.add(slug+(n?'-'+n:''));
  }
  return ids;
}

function resolveHref(fromRel,href){
  const [rawPath,fragment='']=href.split('#');
  const base=path.resolve(repoRoot,path.dirname(fromRel));
  const target=path.resolve(base,decodeURI(rawPath||path.basename(fromRel)));
  assert.ok(target.startsWith(repoRoot+path.sep),`${fromRel}: dependency owner escapes repository: ${href}`);
  assert.ok(fs.existsSync(target),`${fromRel}: dependency owner missing: ${href}`);
  if(fragment&&target.endsWith('.md'))assert.ok(anchors(fs.readFileSync(target,'utf8')).has(decodeURIComponent(fragment)),`${fromRel}: dependency owner anchor missing: ${href}`);
  return {target,fragment:decodeURIComponent(fragment)};
}

function edgeKey(edge){return [edge.consumer,edge.type,edge.responsibility||'',edge.target,edge.fragment||''].join('\u0000');}

function parseSourceDependencies(component){
  const ownerRel=component.sources.at(-1),text=read(ownerRel),found=[];
  const compact=/^>\s*-\s*`(RESTATES|CONTEXTUALIZES|EXTENDS|REPRESENTS|MIGRATES)`\s+\[([^\]]+)\]\(([^)]+)\)(?:\s*[—-]\s*`([^`]+)`)?[^\n]*$/gm;
  const structured=/^>\s*Semantic Owner Dependency\s*\r?\n>\s*Type:\s*`?(RESTATES|CONTEXTUALIZES|EXTENDS|REPRESENTS|MIGRATES)`?\s*\r?\n>\s*Responsibility:\s*`([^`]+)`\s*\r?\n>\s*Owner:\s*\[([^\]]+)\]\(([^)]+)\)[^\n]*$/gm;
  const compactStructured=/^>\s*-\s*Type:\s*`?(RESTATES|CONTEXTUALIZES|EXTENDS|REPRESENTS|MIGRATES)`?\s*;\s*Responsibility:\s*`([^`]+)`\s*;\s*Owner:\s*\[([^\]]+)\]\(([^)]+)\)[^\n]*$/gm;
  for(const match of text.matchAll(compact))found.push({index:match.index,type:match[1],label:match[2],href:match[3],responsibility:match[4]||''});
  for(const match of text.matchAll(structured))found.push({index:match.index,type:match[1],responsibility:match[2],label:match[3],href:match[4]});
  for(const match of text.matchAll(compactStructured))found.push({index:match.index,type:match[1],responsibility:match[2],label:match[3],href:match[4]});
  const seen=new Set(),edges=[];
  for(const item of found.sort((a,b)=>a.index-b.index)){
    const signature=[item.type,item.responsibility,item.href,item.label].join('\u0000');
    if(seen.has(signature))continue;
    seen.add(signature);
    assert.ok(allowedTypes.has(item.type),`${component.id}: unsupported Semantic Owner Dependency type ${item.type}`);
    const resolved=resolveHref(ownerRel,item.href),targetComponent=componentByOwnerPath.get(resolved.target)||'';
    assert.ok(item.responsibility||targetComponent,`${component.id}: dependency without Responsibility ID must target a current TM/Lens component`);
    edges.push({consumer:component.id,type:item.type,responsibility:item.responsibility,target:resolved.target,fragment:resolved.fragment,targetComponent});
  }
  const keys=edges.map(edgeKey);
  assert.equal(new Set(keys).size,keys.length,`${component.id}: duplicate exact Semantic Owner Dependency declaration`);
  return edges;
}

function parseForwardMap(){
  const lines=read(mapRel).split(/\r?\n/),edges=[],seenComponents=new Set();let active=false;
  for(const line of lines){
    if(line==='## Complete Forward Projection'){active=true;continue;}
    if(line==='## Projection Integrity'){active=false;break;}
    if(!active)continue;
    const empty=line.match(/^\| `(TM-[A-Z0-9-]+|LENS-[A-Z0-9-]+)` \| — \| — \| — \| — \|$/);
    if(empty){seenComponents.add(empty[1]);continue;}
    const row=line.match(/^\| `(TM-[A-Z0-9-]+|LENS-[A-Z0-9-]+)` \| `([A-Z]+)` \| (`([^`]+)`|—) \| \[([^\]]+)\]\(([^)]+)\) \| (`(TM-[A-Z0-9-]+|LENS-[A-Z0-9-]+)`|—) \|$/);
    if(!row)continue;
    const [,consumer,type,,responsibilityRaw,,href,,targetComponentRaw]=row;
    assert.ok(allowedTypes.has(type),`${consumer}: map contains unsupported dependency type ${type}`);
    const resolved=resolveHref(mapRel,href),targetComponent=targetComponentRaw||'';
    const actualTargetComponent=componentByOwnerPath.get(resolved.target)||'';
    assert.equal(targetComponent,actualTargetComponent,`${consumer}: wrong target-component projection for ${href}`);
    edges.push({consumer,type,responsibility:responsibilityRaw||'',target:resolved.target,fragment:resolved.fragment,targetComponent});
    seenComponents.add(consumer);
  }
  return {edges,seenComponents};
}

function parseDirectMap(){
  const lines=read(mapRel).split(/\r?\n/),edges=[];let active=false;
  for(const line of lines){
    if(line==='## Direct TM/Lens → TM/Lens Topology'){active=true;continue;}
    if(line==='## Complete Forward Projection'){break;}
    if(!active)continue;
    const row=line.match(/^\| `(TM-[A-Z0-9-]+|LENS-[A-Z0-9-]+)` \| `([A-Z]+)` \| `(TM-[A-Z0-9-]+|LENS-[A-Z0-9-]+)` \| (`([^`]+)`|—) \| \[([^\]]+)\]\(([^)]+)\) \|$/);
    if(!row)continue;
    const [,consumer,type,targetComponent,,responsibilityRaw,,href]=row;
    const resolved=resolveHref(mapRel,href);
    assert.equal(componentByOwnerPath.get(resolved.target),targetComponent,`${consumer}: direct topology target mismatch`);
    edges.push({consumer,type,responsibility:responsibilityRaw||'',target:resolved.target,fragment:resolved.fragment,targetComponent});
  }
  return edges;
}

function sortedKeys(edges){return edges.map(edgeKey).sort();}

function componentEdges(){return components.flatMap(parseSourceDependencies);}

function assertAcyclicDirectGraph(edges){
  const graph=new Map();
  for(const edge of edges.filter((item)=>item.targetComponent)){
    if(!graph.has(edge.consumer))graph.set(edge.consumer,[]);
    graph.get(edge.consumer).push(edge.targetComponent);
  }
  const visiting=new Set(),visited=new Set();
  function visit(node,stack=[]){
    if(visiting.has(node))assert.fail(`direct TM/Lens dependency cycle: ${[...stack,node].join(' -> ')}`);
    if(visited.has(node))return;
    visiting.add(node);
    for(const child of graph.get(node)||[])visit(child,[...stack,node]);
    visiting.delete(node);visited.add(node);
  }
  for(const component of components)visit(component.id);
}

test('Target Module / Lens dependency map exactly projects all supported Semantic Owner Dependency forms',()=>{
  assert.equal(components.filter((component)=>component.kind==='TARGET_MODULE').length,33);
  assert.equal(components.filter((component)=>component.kind==='LENS').length,28);
  const expected=componentEdges(),map=parseForwardMap();
  assert.equal(components.length,61);
  assert.deepEqual(map.seenComponents,new Set(components.map((component)=>component.id)));
  assert.deepEqual(sortedKeys(map.edges),sortedKeys(expected));
  assert.equal(expected.length,101);
  assert.equal(new Set(expected.map((edge)=>edge.consumer)).size,61);
  assert.equal(components.length-new Set(expected.map((edge)=>edge.consumer)).size,0);
  assert.equal(expected.filter((edge)=>edge.targetComponent).length,5);
  assert.deepEqual(sortedKeys(parseDirectMap()),sortedKeys(expected.filter((edge)=>edge.targetComponent)));
});

test('TM/Lens dependency topology keeps generic semantics vertical and concrete-component coupling exceptional',()=>{
  const edges=componentEdges();
  const byConsumer=new Map(components.map((component)=>[component.id,edges.filter((edge)=>edge.consumer===component.id)]));
  for(const component of components){
    const expectedResponsibility=component.kind==='LENS'?'LENS.META-MODEL':'TARGET-MODULE.META-MODEL';
    const inherited=byConsumer.get(component.id).filter((edge)=>edge.responsibility===expectedResponsibility);
    assert.equal(inherited.length,1,`${component.id}: expected exactly one ${expectedResponsibility} dependency`);
    assert.equal(inherited[0].type,'EXTENDS',`${component.id}: ${expectedResponsibility} must be EXTENDS`);
  }

  const carryForward=edges.filter((edge)=>edge.responsibility==='RESOLUTION.CARRY-FORWARD');
  assert.equal(carryForward.length,9);
  assert.ok(carryForward.every((edge)=>path.basename(edge.target)==='RESOLUTION-CARRY-FORWARD-CONTRACT.md'));
  assert.ok(carryForward.every((edge)=>!edge.targetComponent),'Carry-Forward consumers must not depend on PRS TM internals');
  assert.equal(edges.filter((edge)=>edge.targetComponent==='TM-PLANNING-RESOLUTION-STATE').length,0);

  const proposalDecision=edges.filter((edge)=>edge.responsibility==='RESOLUTION.PROPOSAL-DECISION-LIFECYCLE');
  assert.equal(proposalDecision.length,5);
  assert.deepEqual([...new Set(proposalDecision.map((edge)=>edge.consumer))].sort(),[
    'LENS-PROPOSAL-DECISION-RESOLUTION-CONTEXT','TM-PLANNING-RESOLUTION-STATE','TM-PROPOSAL-WORKUP','TM-REVIEW-FINDINGS'
  ]);

  const featureEdges=byConsumer.get('TM-FEATURE');
  assert.equal(featureEdges.filter((edge)=>edge.targetComponent==='TM-EVOLUTION-STEP').length,0);
  assert.equal(featureEdges.filter((edge)=>edge.responsibility==='SDS.SEMANTIC-COMPOSITION-READINESS').length,1);

  const direct=edges.filter((edge)=>edge.targetComponent);
  assert.deepEqual(direct.map((edge)=>`${edge.consumer}->${edge.targetComponent}`).sort(),[
    'LENS-APPLICATION-BOUNDARY-FEASIBILITY->TM-APPLICATION-DEFINITION',
    'TM-CODE-REALIZATION->TM-EXACT-REALIZATION',
    'TM-EVOLUTION-STEP->TM-APPLICATION-DEFINITION',
    'TM-FEATURE->TM-APPLICATION-DEFINITION',
    'TM-SCENARIO-PLANNING->TM-APPLICATION-DEFINITION'
  ]);
  const codeExact=direct.find((edge)=>edge.consumer==='TM-CODE-REALIZATION');
  assert.equal(codeExact.type,'EXTENDS');
  assert.equal(codeExact.responsibility,'TARGET-MODULE.EXACT-REALIZATION');
  assertAcyclicDirectGraph(edges);
});

test('dependency projection remains discoverable and ordinary Markdown links do not become dependency edges',()=>{
  const map=read(mapRel),integrity=read(integrityRel);
  const activeReadme=read('planning/documentation/idtspe-methodology/active/README.md');
  const responsibility=read('planning/documentation/idtspe-methodology/active/navigation/METHODOLOGY-RESPONSIBILITY-MAP.md');
  const directory=read('planning/documentation/idtspe-methodology/active/idtspe-core/navigation/METHODOLOGY-REGISTRY-DIRECTORY.md');
  const terminology=read('planning/documentation/principles-and-terminology.md');
  const maintainTm=read('planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/maintain-target-module/UC-IDTSPE-MAINTAIN-TARGET-MODULE.md');
  const maintainLens=read('planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/maintain-lens/UC-IDTSPE-MAINTAIN-LENS.md');
  assert.match(map,/Responsibility ID: `IDTSPE\.TM-LENS-DEPENDENCY-PROJECTION`/);
  assert.match(map,/ordinary Markdown link[\s\S]*NOT a dependency edge/);
  assert.match(map,/Direct concrete-component dependencies are exceptional/);
  assert.match(integrity,/Responsibility ID: `IDTSPE\.TM-LENS-DEPENDENCY-PROJECTION-INTEGRITY`/);
  assert.match(integrity,/compact structured/);
  assert.match(activeReadme,/TARGET-MODULE-LENS-DEPENDENCY-MAP\.md/);
  assert.match(responsibility,/IDTSPE\.TM-LENS-DEPENDENCY-PROJECTION/);
  assert.match(directory,/TARGET-MODULE-LENS-DEPENDENCY-MAP\.md/);
  assert.match(terminology,/TARGET-MODULE-LENS-DEPENDENCY-MAP\.md/);
  assert.match(maintainTm,/TM-Lens Dependency Map|Target Module \/ Lens Dependency Map/);
  assert.match(maintainLens,/TM-Lens Dependency Map|Target Module \/ Lens Dependency Map/);
});

test('documentation and methodology maintenance use the dependency projection for impact discovery without making it authority',()=>{
  const revalidation=read('planning/documentation/processes/SEMANTIC-OWNER-CHANGE-REVALIDATION.process.md');
  const plan=read('planning/documentation/use-cases/UC-DOC-PLAN-DOCUMENTATION-CHANGE.md');
  const review=read('planning/documentation/use-cases/UC-DOC-REVIEW-DOCUMENTATION.md');
  const maintainLens=read('planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/maintain-lens/UC-IDTSPE-MAINTAIN-LENS.md');
  const maintainTm=read('planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/maintain-target-module/UC-IDTSPE-MAINTAIN-TARGET-MODULE.md');

  assert.match(revalidation,/Target Module \/ Lens Dependency Map[\s\S]*bounded reverse-impact index/);
  assert.match(revalidation,/follow every relevant projected edge back to its normative declaration/);
  assert.match(plan,/dependency projection for declared semantic coupling/);
  assert.match(plan,/Treat both as impact\/discovery projections only/);
  assert.match(review,/dependency projection covers declared `Semantic Owner Dependency` edges only/);

  for(const [name,text] of [['maintain Lens',maintainLens],['maintain Target Module',maintainTm]]){
    assert.match(text,/Pre-change Projection Impact Check/,`${name}: missing pre-change projection consultation`);
    assert.match(text,/consult the active Target Module \/ Lens Dependency Map/,`${name}: dependency map must be consulted before material change`);
    assert.match(text,/Merely consulting the map for impact discovery does not require rewriting it/,`${name}: consultation must not imply projection maintenance`);
    assert.match(text,/declaration[^\n]*remains normative; the map is projection only/i,`${name}: source-of-truth direction must remain explicit`);
  }
});
