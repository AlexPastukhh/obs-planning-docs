import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require=createRequire(import.meta.url);
const moduleRoot=path.dirname(fileURLToPath(import.meta.url));
const repoRoot=path.resolve(moduleRoot,'../../../../..');
const commandsDir=path.join(repoRoot,'planning','commands');
const outputPath=path.resolve(moduleRoot,'..','chat-command-palette.user.js');
const check=process.argv.includes('--check');
const codec=require('./src/command-definition-codec.js');
const catalog=require('./src/command-catalog.js');
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

function build(){
  const definitions=readCommands();
  const header=`// ==UserScript==\n// @name         Reusable Chat Planning Helper\n// @namespace    https://github.com/AlexPastukhh/obs/reusable-docs\n// @version      ${pkg.version}-repository-command-registry\n// @description  RAM-first OBS Planning Helper with editable real Planning Commands, prompts and explicit GitHub actions.\n// @author       Reusable docs layer\n// @match        https://chatgpt.com/*\n// @match        https://chat.openai.com/*\n// @run-at       document-idle\n// @grant        GM_getValue\n// @grant        GM_setValue\n// @grant        GM_xmlhttpRequest\n// @connect      api.github.com\n// ==/UserScript==\n\n// GENERATED FILE — DO NOT EDIT MANUALLY.\n// Source: planning/documentation/tools/tampermonkey/chat-command-palette/src/**\n// Planning commands: planning/commands/*.command.md\n// Prompt library: planning/helper-library/prompts/ (helper-library/commands is legacy compatibility)\n// Build: node planning/documentation/tools/tampermonkey/chat-command-palette/build-chat-command-palette.mjs\n\n`;
  const modules=sourceFiles.map((relative)=>fs.readFileSync(path.join(moduleRoot,relative),'utf8').trimEnd()).join('\n\n');
  const bootstrap=`\n\n(function(){\n  'use strict';\n  const commands=${JSON.stringify(definitions,null,2)};\n  const api=globalThis.ObsPlanningHelper;\n  if(!api||typeof api.startPlanningHelper!=='function')throw new Error('OBS Planning Helper runtime was not built correctly.');\n  api.startPlanningHelper({bundledCommands:commands}).catch((error)=>console.error('[OBS Planning Helper startup]',error));\n})();\n`;
  return header+modules+bootstrap;
}

const expected=build();
if(check){
  const actual=fs.existsSync(outputPath)?fs.readFileSync(outputPath,'utf8'):'';
  if(actual!==expected){console.error(`Generated userscript is stale: ${path.relative(repoRoot,outputPath)}`);process.exit(1)}
  console.log('Generated userscript matches source and command catalog.');
}else{
  fs.writeFileSync(outputPath,expected,'utf8');
  console.log(`Built ${path.relative(repoRoot,outputPath)}`);
}
