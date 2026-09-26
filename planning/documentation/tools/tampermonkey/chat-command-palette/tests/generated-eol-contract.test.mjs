import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const moduleRoot=path.resolve(import.meta.dirname,'..');
const repoRoot=path.resolve(moduleRoot,'../../../../..');
const attributesPath=path.join(repoRoot,'.gitattributes');
const buildSourcePath=path.join(moduleRoot,'build-chat-command-palette.mjs');
const generatedPaths=[
  'planning/documentation/tools/tampermonkey/chat-command-palette.user.js',
  'planning/documentation/tools/tampermonkey/chat-command-palette/seed/commands.json',
  'planning/documentation/tools/tampermonkey/chat-command-palette/seed/scenarios.json',
  'planning/documentation/tools/tampermonkey/chat-command-palette/seed/semantic-components.json',
  'planning/documentation/tools/tampermonkey/chat-command-palette/seed/use-cases.json'
];

test('Planning Helper generated artifacts keep a repository-level LF checkout contract',()=>{
  const attributes=fs.readFileSync(attributesPath,'utf8');
  assert.match(
    attributes,
    /^planning\/documentation\/tools\/tampermonkey\/chat-command-palette\.user\.js\s+text\s+eol=lf$/m
  );
  assert.match(
    attributes,
    /^planning\/documentation\/tools\/tampermonkey\/chat-command-palette\/seed\/\*\.json\s+text\s+eol=lf$/m
  );
});

test('committed Planning Helper generated artifacts are LF-only',()=>{
  for(const relative of generatedPaths){
    const text=fs.readFileSync(path.join(repoRoot,relative),'utf8');
    assert.equal(text.includes('\r'),false,`${relative} contains CR bytes instead of canonical LF`);
  }
});

test('Planning Helper build normalizes source-module EOL before composing the generated userscript',()=>{
  const buildSource=fs.readFileSync(buildSourcePath,'utf8');
  assert.match(
    buildSource,
    /sourceFiles\.map\(\(relative\)=>normalizeLf\(fs\.readFileSync\(path\.join\(moduleRoot,relative\),'utf8'\)\)\.trimEnd\(\)\)/
  );
});
