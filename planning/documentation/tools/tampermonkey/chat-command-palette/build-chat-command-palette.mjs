import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require=createRequire(import.meta.url);
const moduleRoot=path.dirname(fileURLToPath(import.meta.url));
const repoRoot=path.resolve(moduleRoot,'../../../../..');
const commandsDir=path.join(repoRoot,'planning','commands');
const outputPath=path.resolve(moduleRoot,'..','chat-command-palette.user.js');
const semanticPath=path.join(moduleRoot,'src','semantic-projections.js');
const seedDir=path.join(moduleRoot,'seed');
const commandSeedPath=path.join(seedDir,'commands.json');
const useCaseSeedPath=path.join(seedDir,'use-cases.json');
const check=process.argv.includes('--check');
const codec=require('./src/command-definition-codec.js');
const catalog=require('./src/command-catalog.js');
const pkg=JSON.parse(fs.readFileSync(path.join(moduleRoot,'package.json'),'utf8'));
const sourceFiles=['src/command-definition-codec.js','src/command-catalog.js','src/command-body.js','src/semantic-projections.js','src/helper-library-codec.js','src/chat-recovery.js','src/github-contents-client.js','src/repository-command-service.js','src/repository-helper-library-service.js','src/planning-helper-state.js','src/composer-insertion.js','src/planning-helper-ui.js','src/planning-helper-runtime.js'];

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
function commandIdForCell(cell,commands){const text=cleanCell(cell).toLowerCase();if(!text||text==='none'||text.startsWith('none ')||text.startsWith('supports '))return'';const matches=[];for(const def of commands)for(const aliasRaw of def.commandFamily||[]){const alias=String(aliasRaw).trim().toLowerCase();if(!alias)continue;if(text===alias||text.startsWith(`${alias} `)||text.startsWith(`${alias}.`)||text.startsWith(`${alias},`)||text.startsWith(`${alias};`)||text.startsWith(`${alias}:`))matches.push({id:def.id,alias});}matches.sort((a,b)=>b.alias.length-a.alias.length||a.id.localeCompare(b.id));return matches[0]?.id||'';}
function projectedItem(raw,rel,commands){const id=cleanCell(raw.id),status=cleanCell(raw.status).toLowerCase();if(!id||status.includes('retired')||status.includes('historical'))return null;const label=cleanCell(raw.name),directionId=cleanCell(raw['parent direction']);const purpose=cleanCell(raw.purpose),trigger=cleanCell(raw['trigger / input']||raw['trigger / accepted input']),result=cleanCell(raw['result / end state']||raw.result),owner=cleanCell(raw['owner route']||raw['main owner']),related=raw['related command']||'';const commandId=commandIdForCell(related,commands);let instruction=`Resolve ${id} in the current canonical registry and follow its current owner route${owner?` (${owner})`:''}. Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.`;if(id==='UC-PLAN-REALIZATION')instruction='Resolve this exact canonical Use-Case entry and follow application-realization-workflow.md. Review or compare representative realization paths when material, including pre-Domain comparative evidence, without letting implementation convenience or this projection become Domain authority.';const item={id,label,description:purpose||result||label,sources:[rel],instruction,target:`<${label} target>`,directionId,manualInvocation:true,trigger,result};if(commandId)item.commandId=commandId;return item;}
function readCanonicalUseCases(commands){
  const out=[];for(const file of walk(path.join(repoRoot,'planning')).sort()){
    const rel=path.relative(repoRoot,file).replaceAll(path.sep,'/'), lines=fs.readFileSync(file,'utf8').split(/\r?\n/);let headers=null;
    for(const line of lines){if(/^\|\s*ID\s*\|/i.test(line)){headers=splitRow(line).map((x)=>cleanCell(x).toLowerCase());continue;}if(!headers||!/^\|\s*`UC-[A-Z0-9-]+`\s*\|/.test(line))continue;const cells=splitRow(line), row={};headers.forEach((h,i)=>row[h]=cells[i]||'');const item=projectedItem(row,rel,commands);if(item)out.push(item);}
    let section=null;const flush=()=>{if(section){const item=projectedItem(section,rel,commands);if(item)out.push(item);section=null;}};
    for(const line of lines){const h=line.match(/^##\s+`(UC-[A-Z0-9-]+)`\s+—\s+(.+)$/);if(h){flush();section={id:h[1],name:h[2]};continue;}if(!section)continue;const field=line.match(/^\*\*([^*]+):\*\*\s*(.*)$/);if(field)section[cleanCell(field[1]).toLowerCase()]=field[2];}
    flush();
  }
  const ids=out.map(x=>x.id);if(new Set(ids).size!==ids.length)throw new Error('Duplicate canonical Use-Case IDs discovered across registries.');if(!out.length)throw new Error('No canonical Use Cases discovered.');return out.sort((a,b)=>a.id.localeCompare(b.id));
}
function projectionBlock(useCases){return `  // BEGIN GENERATED CURRENT USE CASE PROJECTIONS\n  const USE_CASE_DEFINITIONS=${JSON.stringify(useCases,null,2).split('\n').join('\n  ')};\n  // END GENERATED CURRENT USE CASE PROJECTIONS`;}
function ensureSemantic(useCases){const current=fs.readFileSync(semanticPath,'utf8');const re=/  \/\/ BEGIN GENERATED CURRENT USE CASE PROJECTIONS[\s\S]*?  \/\/ END GENERATED CURRENT USE CASE PROJECTIONS/;if(!re.test(current))throw new Error('semantic-projections.js is missing generated projection markers.');const expected=current.replace(re,projectionBlock(useCases));if(check){if(current!==expected)throw new Error('Generated semantic Use-Case projection is stale.');}else fs.writeFileSync(semanticPath,expected,'utf8');}
function seedText(kind,items){return JSON.stringify({schemaVersion:1,kind,generatedFrom:kind==='planning-command-seed'?'planning/commands/*.command.md':'all current canonical planning/**/use-case-registry.md files',items},null,2)+'\n';}
function useCaseSeedItems(useCases){return useCases.map(({trigger,result,...entry})=>entry);}
function ensureSeed(pathname,expected){if(check){const actual=fs.existsSync(pathname)?fs.readFileSync(pathname,'utf8'):'';if(actual!==expected)throw new Error(`Generated seed catalog is stale: ${path.relative(repoRoot,pathname)}`);return;}fs.mkdirSync(path.dirname(pathname),{recursive:true});fs.writeFileSync(pathname,expected,'utf8');}
function build(){
  const definitions=readCommands(),useCases=readCanonicalUseCases(definitions);ensureSemantic(useCases);delete require.cache[require.resolve('./src/semantic-projections.js')];const semantic=require('./src/semantic-projections.js');const actual=semantic.USE_CASE_DEFINITIONS.map(x=>x.id).sort(),expected=useCases.map(x=>x.id).sort();if(JSON.stringify(actual)!==JSON.stringify(expected))throw new Error('Semantic projection parity failed after generation.');
  const useCaseSeed=useCaseSeedItems(useCases);ensureSeed(commandSeedPath,seedText('planning-command-seed',definitions));ensureSeed(useCaseSeedPath,seedText('use-case-seed',useCaseSeed));
  const header=`// ==UserScript==\n// @name         Reusable Chat Planning Helper\n// @namespace    https://github.com/AlexPastukhh/obs/reusable-docs\n// @version      ${pkg.version}-repository-command-registry\n// @description  RAM-first OBS Planning Helper with editable real Planning Commands, prompts and explicit GitHub actions.\n// @author       Reusable docs layer\n// @match        https://chatgpt.com/*\n// @match        https://chat.openai.com/*\n// @run-at       document-idle\n// @grant        GM_getValue\n// @grant        GM_setValue\n// @grant        GM_xmlhttpRequest\n// @connect      api.github.com\n// ==/UserScript==\n\n// GENERATED FILE — DO NOT EDIT MANUALLY.\n// Source: planning/documentation/tools/tampermonkey/chat-command-palette/src/**\n// Local seed catalogs: planning/documentation/tools/tampermonkey/chat-command-palette/seed/commands.json + seed/use-cases.json\n// Planning-command authority: planning/commands/*.command.md\n// Use-Case authority: every current canonical planning/**/use-case-registry.md; Helper projection/UC-invocation rows are generated.\n// Prompt library: planning/helper-library/prompts/ (helper-library/commands is legacy compatibility)\n// Build: node planning/documentation/tools/tampermonkey/chat-command-palette/build-chat-command-palette.mjs\n\n`;
  const modules=sourceFiles.map((relative)=>fs.readFileSync(path.join(moduleRoot,relative),'utf8').trimEnd()).join('\n\n');const bootstrap=`\n\n(function(){\n  'use strict';\n  const commands=${JSON.stringify(definitions,null,2)};\n  const useCases=${JSON.stringify(useCaseSeed,null,2)};\n  const api=globalThis.ObsPlanningHelper;if(!api||typeof api.startPlanningHelper!=='function')throw new Error('OBS Planning Helper runtime was not built correctly.');api.startPlanningHelper({bundledCommands:commands,bundledUseCases:useCases}).catch((error)=>console.error('[OBS Planning Helper startup]',error));\n})();\n`;return header+modules+bootstrap;
}
try{const expected=build();if(check){const actual=fs.existsSync(outputPath)?fs.readFileSync(outputPath,'utf8'):'';if(actual!==expected)throw new Error(`Generated userscript is stale: ${path.relative(repoRoot,outputPath)}`);console.log('Generated userscript, registry-driven UC projection and local seeds match current sources.');}else{fs.writeFileSync(outputPath,expected,'utf8');console.log(`Built ${path.relative(repoRoot,outputPath)}, registry-driven UC projection and local seeds.`);}}catch(error){console.error(error?.message||String(error));process.exit(1)}
