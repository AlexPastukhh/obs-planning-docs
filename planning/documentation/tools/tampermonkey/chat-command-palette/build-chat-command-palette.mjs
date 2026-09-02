import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require=createRequire(import.meta.url);
const moduleRoot=path.dirname(fileURLToPath(import.meta.url));
const repoRoot=path.resolve(moduleRoot,'../../../../..');
const commandsDir=path.join(repoRoot,'planning','commands');
const outputPath=path.resolve(moduleRoot,'..','chat-command-palette.user.js');
const seedDir=path.join(moduleRoot,'seed');
const commandSeedPath=path.join(seedDir,'commands.json');
const useCaseSeedPath=path.join(seedDir,'use-cases.json');
const check=process.argv.includes('--check');
const codec=require('./src/command-definition-codec.js');
const catalog=require('./src/command-catalog.js');
const semantic=require('./src/semantic-projections.js');
const pkg=JSON.parse(fs.readFileSync(path.join(moduleRoot,'package.json'),'utf8'));
const sourceFiles=['src/command-definition-codec.js','src/command-catalog.js','src/command-body.js','src/semantic-projections.js','src/helper-library-codec.js','src/chat-recovery.js','src/github-contents-client.js','src/repository-command-service.js','src/repository-helper-library-service.js','src/repository-catalog-service.js','src/planning-helper-state.js','src/composer-insertion.js','src/methodology-navigation.js','src/command-side-effects.js','src/planning-helper-ui.js','src/planning-helper-runtime.js'];

function readCommands(){
  const files=fs.readdirSync(commandsDir,{withFileTypes:true}).filter((entry)=>entry.isFile()&&/^[a-z0-9][a-z0-9._-]*\.command\.md$/.test(entry.name)).map((entry)=>entry.name).sort();
  const definitions=files.map((file)=>codec.parseCommandDefinitionDocument(fs.readFileSync(path.join(commandsDir,file),'utf8'),{path:`planning/commands/${file}`}));
  catalog.validateCommandCatalog(definitions);if(!definitions.length)throw new Error('No repository command definitions found.');
  for(const definition of definitions)for(const owner of catalog.commandReferencePaths(definition))if(!fs.existsSync(path.join(repoRoot,owner)))throw new Error(`Missing owner/refinement path for ${definition.id}: ${owner}`);
  return definitions.map(catalog.stripRuntimeCommandMetadata);
}
function walk(dir,result=[]){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,entry.name);if(entry.isDirectory())walk(p,result);else if(entry.isFile()&&entry.name.toLowerCase()==='use-case-registry.md')result.push(p);}return result;}
function splitRow(line){return line.trim().replace(/^\|/,'').replace(/\|$/,'').split('|').map((v)=>v.trim());}
function cleanCell(v){return String(v||'').replace(/`/g,'').trim();}
function plainCell(v){return cleanCell(String(v||'').replace(/\[([^\]]+)\]\([^)]+\)/g,'$1'));}
function compactMarkdown(v){return String(v||'').replace(/<!--.*?-->/gs,' ').replace(/`([^`]+)`/g,'$1').replace(/\[([^\]]+)\]\([^)]+\)/g,'$1').replace(/^[ \t]*[-*+]\s+/gm,'').replace(/^[ \t]*\d+\.\s+/gm,'').replace(/\s+/g,' ').trim();}
function commandIdForCell(cell,commands){const text=cleanCell(cell).toLowerCase();if(!text||text==='none'||text.startsWith('none ')||text.startsWith('supports '))return'';const matches=[];for(const def of commands)for(const aliasRaw of def.commandFamily||[]){const alias=String(aliasRaw).trim().toLowerCase();if(!alias)continue;if(text===alias||text.startsWith(`${alias} `)||text.startsWith(`${alias}.`)||text.startsWith(`${alias},`)||text.startsWith(`${alias};`)||text.startsWith(`${alias}:`))matches.push({id:def.id,alias});}matches.sort((a,b)=>b.alias.length-a.alias.length||a.id.localeCompare(b.id));return matches[0]?.id||'';}
function markdownLinkTargets(cell){const out=[];for(const match of String(cell||'').matchAll(/\[[^\]]+\]\(([^)]+)\)/g)){const target=String(match[1]||'').trim().split('#')[0];if(target&&!out.includes(target))out.push(target);}return out;}
function resolveRegistryTarget(rel,target){const value=String(target||'').trim().split('#')[0];if(!value)return'';const registryAbs=path.join(repoRoot,rel),resolved=path.resolve(path.dirname(registryAbs),value);const relative=path.relative(repoRoot,resolved).replaceAll(path.sep,'/');return relative.startsWith('../')?'':relative;}
function readUseCaseOwner(rel,ownerCell){const target=markdownLinkTargets(ownerCell)[0];if(!target)return null;const ownerRel=resolveRegistryTarget(rel,target);if(!ownerRel)return null;const ownerAbs=path.join(repoRoot,ownerRel);if(!fs.existsSync(ownerAbs)||!fs.statSync(ownerAbs).isFile())return null;const text=fs.readFileSync(ownerAbs,'utf8'),lines=text.split(/\r?\n/);function section(name){const start=lines.findIndex((line)=>new RegExp(`^##\\s+${name}\\s*$`,'i').test(line.trim()));if(start<0)return'';const out=[];for(let i=start+1;i<lines.length;i++){if(/^##\s+/.test(lines[i]))break;out.push(lines[i]);}return compactMarkdown(out.join('\n'));}return{path:ownerRel,situation:section('Situation'),result:section('Result')};}
function projectedItem(raw,rel,commands){
  const id=cleanCell(raw.id),status=cleanCell(raw.status).toLowerCase();if(!id||status.includes('retired')||status.includes('historical'))return null;
  const label=plainCell(raw.name||raw['use case']);if(!label)return null;
  const ownerCell=raw.owner||raw['owner / current route']||raw['owner route']||raw['main owner']||'',ownerInfo=readUseCaseOwner(rel,ownerCell);
  const purpose=cleanCell(raw.purpose),trigger=compactMarkdown(raw['trigger / input']||raw['trigger / accepted input'])||ownerInfo?.situation||'',result=compactMarkdown(raw['result / end state']||raw.result)||ownerInfo?.result||'';
  const owner=ownerInfo?.path||plainCell(ownerCell),related=raw['related command']||'',commandId=commandIdForCell(related,commands),instruction=`Resolve ${id} in the current canonical registry and follow its current owner route${owner?` (${owner})`:''}. Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.`;
  const item={id,label,description:purpose||result||label,sources:[rel],instruction,target:`<${label} target>`,manualInvocation:true,trigger,result};if(commandId)item.commandId=commandId;return semantic.normalizeUseCaseDefinition(item);
}
function readCanonicalUseCases(commands){
  const byId=new Map(),rootRegistry='planning/use-case-registry.md';
  function add(item,rel){if(!item)return;const previous=byId.get(item.id);if(!previous){byId.set(item.id,{item,rel});return;}const same=previous.item.label===item.label&&previous.item.trigger===item.trigger&&previous.item.result===item.result;if(!same)throw new Error(`Conflicting canonical Use-Case ${item.id} discovered in ${previous.rel} and ${rel}.`);if(previous.rel===rootRegistry&&rel!==rootRegistry)byId.set(item.id,{item,rel});else if(previous.rel!==rootRegistry&&rel!==rootRegistry&&previous.rel!==rel)throw new Error(`Duplicate non-root canonical Use-Case ${item.id} discovered in ${previous.rel} and ${rel}.`);}
  for(const file of walk(path.join(repoRoot,'planning')).sort()){
    const rel=path.relative(repoRoot,file).replaceAll(path.sep,'/'),lines=fs.readFileSync(file,'utf8').split(/\r?\n/),status=cleanCell(lines.find((line)=>/^Status:/i.test(line))||'').toLowerCase();if(status.includes('legacy')||status.includes('historical')||status.includes('compatibility'))continue;let headers=null;
    for(const line of lines){if(/^\|\s*ID\s*\|/i.test(line)){headers=splitRow(line).map((x)=>cleanCell(x).toLowerCase());continue;}if(!headers||!/^\|\s*`UC-[A-Z0-9-]+`\s*\|/.test(line))continue;const cells=splitRow(line),row={};headers.forEach((h,i)=>row[h]=cells[i]||'');add(projectedItem(row,rel,commands),rel);}
    let section=null;const flush=()=>{if(section){add(projectedItem(section,rel,commands),rel);section=null;}};
    for(const line of lines){const h=line.match(/^##\s+`(UC-[A-Z0-9-]+)`\s+—\s+(.+)$/);if(h){flush();section={id:h[1],name:h[2]};continue;}if(!section)continue;const field=line.match(/^\*\*([^*]+):\*\*\s*(.*)$/);if(field)section[cleanCell(field[1]).toLowerCase()]=field[2];}
    flush();
  }
  const definitions=semantic.normalizeUseCaseDefinitions([...byId.values()].map((entry)=>entry.item));if(!definitions.length)throw new Error('No canonical Use Cases discovered.');return definitions.sort((a,b)=>a.id.localeCompare(b.id));
}
function seedText(kind,items){const generatedFrom=kind==='planning-command-seed'?'planning/commands/*.command.md':'all current canonical Use-Case registries under planning/** (case-insensitive filename; legacy/historical compatibility indexes excluded; root aggregation may repeat scoped entries)';return JSON.stringify({schemaVersion:1,kind,generatedFrom,items},null,2)+'\n';}
function ensureSeed(pathname,expected){if(check){const actual=fs.existsSync(pathname)?fs.readFileSync(pathname,'utf8'):'';if(actual!==expected)throw new Error(`Generated seed catalog is stale: ${path.relative(repoRoot,pathname)}`);return;}fs.mkdirSync(path.dirname(pathname),{recursive:true});fs.writeFileSync(pathname,expected,'utf8');}
function build(){
  const definitions=readCommands(),useCases=readCanonicalUseCases(definitions);
  ensureSeed(commandSeedPath,seedText('planning-command-seed',definitions));ensureSeed(useCaseSeedPath,seedText('use-case-seed',useCases));
  const header=`// ==UserScript==\n// @name         Reusable Chat Planning Helper\n// @namespace    https://github.com/AlexPastukhh/obs/reusable-docs\n// @version      ${pkg.version}-repository-command-registry\n// @description  RAM-first OBS Planning Helper with GitHub-backed Commands, Use Cases, prompts and explicit repository actions.\n// @author       Reusable docs layer\n// @match        https://chatgpt.com/*\n// @match        https://chat.openai.com/*\n// @run-at       document-idle\n// @grant        GM_getValue\n// @grant        GM_setValue\n// @grant        GM_xmlhttpRequest\n// @connect      api.github.com\n// ==/UserScript==\n\n// GENERATED FILE — DO NOT EDIT MANUALLY.\n// Runtime source: planning/documentation/tools/tampermonkey/chat-command-palette/src/**\n// GitHub command authority: planning/commands/*.command.md\n// GitHub Use-Case authority: current canonical Use-Case registries under planning/** (case-insensitive filename; legacy/historical compatibility indexes excluded).\n// seed/use-cases.json is the build-verified GitHub-backed Use-Case projection used for explicit Hard Reload.\n// GitHub UI-order source: planning/documentation/tools/tampermonkey/chat-command-palette/catalog-order.json\n// Local snapshot is the working cache; current Command/Use-Case catalogs are not embedded in this userscript.\n// Build: node planning/documentation/tools/tampermonkey/chat-command-palette/build-chat-command-palette.mjs\n\n`;
  const modules=sourceFiles.map((relative)=>fs.readFileSync(path.join(moduleRoot,relative),'utf8').trimEnd()).join('\n\n');
  const bootstrap=`\n\n(function(){\n  'use strict';\n  const api=globalThis.ObsPlanningHelper;if(!api||typeof api.startPlanningHelper!=='function')throw new Error('OBS Planning Helper runtime was not built correctly.');api.startPlanningHelper().catch((error)=>console.error('[OBS Planning Helper startup]',error));\n})();\n`;
  return header+modules+bootstrap;
}

const expected=build();
if(check){const current=fs.existsSync(outputPath)?fs.readFileSync(outputPath,'utf8'):'';if(current!==expected)throw new Error('Generated Planning Helper userscript is stale.');console.log('Generated userscript and GitHub-backed Command/Use-Case catalogs match current sources.');}
else{fs.writeFileSync(outputPath,expected,'utf8');console.log(`Built ${path.relative(repoRoot,outputPath)} and GitHub-backed Command/Use-Case catalogs.`);}
