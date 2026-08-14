import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const moduleRoot = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(moduleRoot, '../../../../..');
const codec = require('./src/command-definition-codec.js');
const catalog = require('./src/command-catalog.js');
const sources = fs.readdirSync(path.join(moduleRoot, 'src'))
  .filter((name) => name.endsWith('.js'))
  .sort()
  .map((name) => path.join(moduleRoot, 'src', name));
const tests = fs.readdirSync(path.join(moduleRoot, 'tests'))
  .filter((name) => name.endsWith('.test.mjs'))
  .sort()
  .map((name) => path.join(moduleRoot, 'tests', name));
const generated = path.resolve(moduleRoot, '..', 'chat-command-palette.user.js');

function runNode(args) {
  const result = spawnSync(process.execPath, args, { stdio: 'inherit', shell: false });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status || 1);
}

function runTests() {
  if (!tests.length) throw new Error('No Planning Helper tests were found.');
  runNode(['--test', ...tests]);
}

if (process.argv.includes('--tests-only')) {
  runTests();
  process.exit(0);
}

for (const file of [...sources, generated]) runNode(['--check', file]);

const commandsDir = path.join(repoRoot, 'planning', 'commands');
const defs = fs.readdirSync(commandsDir)
  .filter((name) => /^[a-z0-9][a-z0-9._-]*\.command\.md$/.test(name))
  .sort()
  .map((name) => codec.parseCommandDefinitionDocument(
    fs.readFileSync(path.join(commandsDir, name), 'utf8'),
    { path: `planning/commands/${name}` }
  ));

catalog.validateCommandCatalog(defs);
if (!defs.length) throw new Error('No repository command definitions found.');
for (const definition of defs) {
  for (const owner of catalog.commandReferencePaths(definition)) {
    if (!fs.existsSync(path.join(repoRoot, owner))) throw new Error(`Missing owner/refinement path for ${definition.id}: ${owner}`);
  }
}

runTests();
runNode([path.join(moduleRoot, 'build-chat-command-palette.mjs'), '--check']);
console.log(`Planning Helper verify passed: ${defs.length} command definitions, ${sources.length} source modules, ${tests.length} test files.`);
