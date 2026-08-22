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
const sourceFiles=[
  'src/command-definition-codec.js','src/command-catalog.js','src/command-body.js','src/semantic-projections.js','src/helper-library-codec.js','src/chat-recovery.js','src/github-contents-client.js','src/repository-command-service.js','src/repository-helper-library-service.js','src/planning-helper-state.js','src/composer-insertion.js','src/planning-helper-ui.js','src/planning-helper-runtime.js'
];

function readCommands(){
  const files=fs.readdirSync(commandsDir,{withFileTypes:true}).filter((entry)=>entry.isFile()&&/^[a-z0-9][a-z0-9._-]*\.command\.md$/.test(entry.name)).map((entry)=>entry.name).sort();
  const definitions=files.map((file)=>codec.parseCommandDefinitionDocument(fs.readFileSync(path.join(commandsDir,file),'utf8'),{path:`planning/commands/${file}`}));
  catalog.validateCommandCatalog(definitions);
  if(!definitions.length)throw new Error('No repository command definitions found.');
  for(const definition of definitions){
    for(const owner of catalog.commandReferencePaths(definition)){if(!fs.existsSync(path.join(repoRoot,owner)))throw new Error(`Missing owner/refinement path for ${definition.id}: ${owner}`)}
  }
  return definitions.map(catalog.stripRuntimeCommandMetadata);
}

function seedText(kind,items){return JSON.stringify({schemaVersion:1,kind,generatedFrom:kind==='planning-command-seed'?'planning/commands/*.command.md':'current canonical Use-Case registries via src/semantic-projections.js',items},null,2)+'\n';}
function useCaseSeedItems(){return semantic.USE_CASE_DEFINITIONS.map((entry)=>{const result={id:entry.id,label:entry.label,description:entry.description||'',sources:[...(entry.sources||[])],instruction:entry.instruction||'',target:entry.target||'',directionId:entry.directionId||''};if(entry.commandId)result.commandId=entry.commandId;return result;});}
function ensureSeed(pathname,expected){
  if(check){const actual=fs.existsSync(pathname)?fs.readFileSync(pathname,'utf8'):'';if(actual!==expected)throw new Error(`Generated seed catalog is stale: ${path.relative(repoRoot,pathname)}`);return;}
  fs.mkdirSync(path.dirname(pathname),{recursive:true});fs.writeFileSync(pathname,expected,'utf8');
}

function build(){
  const definitions=readCommands();
  const useCases=useCaseSeedItems();
  const commandSeed=seedText('planning-command-seed',definitions),useCaseSeed=seedText('use-case-seed',useCases);
  ensureSeed(commandSeedPath,commandSeed);ensureSeed(useCaseSeedPath,useCaseSeed);
  const header=`// ==UserScript==\n// @name         Reusable Chat Planning Helper\n// @namespace    https://github.com/AlexPastukhh/obs/reusable-docs\n// @version      ${pkg.version}-repository-command-registry\n// @description  RAM-first OBS Planning Helper with editable real Planning Commands, prompts and explicit GitHub actions.\n// @author       Reusable docs layer\n// @match        https://chatgpt.com/*\n// @match        https://chat.openai.com/*\n// @run-at       document-idle\n// @grant        GM_getValue\n// @grant        GM_setValue\n// @grant        GM_xmlhttpRequest\n// @connect      api.github.com\n// ==/UserScript==\n\n// GENERATED FILE — DO NOT EDIT MANUALLY.\n// Source: planning/documentation/tools/tampermonkey/chat-command-palette/src/**\n// Local seed catalogs: planning/documentation/tools/tampermonkey/chat-command-palette/seed/commands.json + seed/use-cases.json\n// Planning-command authority: planning/commands/*.command.md\n// Use-Case authority: current canonical Use-Case registries/owners; seed/use-cases.json is projection only.\n// Prompt library: planning/helper-library/prompts/ (helper-library/commands is legacy compatibility)\n// Build: node planning/documentation/tools/tampermonkey/chat-command-palette/build-chat-command-palette.mjs\n\n`;
  const modules=sourceFiles.map((relative)=>fs.readFileSync(path.join(moduleRoot,relative),'utf8').trimEnd()).join('\n\n');
  const bootstrap=`\n\n(function(){\n  'use strict';\n  const commands=${JSON.stringify(definitions,null,2)};\n  const useCases=${JSON.stringify(useCases,null,2)};\n  const api=globalThis.ObsPlanningHelper;\n  if(!api||typeof api.startPlanningHelper!=='function')throw new Error('OBS Planning Helper runtime was not built correctly.');\n  api.startPlanningHelper({bundledCommands:commands,bundledUseCases:useCases}).catch((error)=>console.error('[OBS Planning Helper startup]',error));\n})();\n`;
  return header+modules+bootstrap;
}

try{
  const expected=build();
  if(check){
    const actual=fs.existsSync(outputPath)?fs.readFileSync(outputPath,'utf8'):'';
    if(actual!==expected){console.error(`Generated userscript is stale: ${path.relative(repoRoot,outputPath)}`);process.exit(1)}
    console.log('Generated userscript and local command/use-case seed catalogs match current sources.');
  }else{
    fs.writeFileSync(outputPath,expected,'utf8');
    console.log(`Built ${path.relative(repoRoot,outputPath)} and refreshed local seed catalogs.`);
  }
}catch(error){console.error(error?.message||String(error));process.exit(1)}
