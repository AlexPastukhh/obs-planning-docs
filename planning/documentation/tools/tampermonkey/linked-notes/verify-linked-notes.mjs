import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const syntaxPaths = [
  'build-linked-notes.mjs',
  'verify-linked-notes.mjs',
  'src/linked-notes-core.js',
  'src/note-markdown-codec.js',
  'src/repository-target.js',
  'src/indexeddb-note-store.js',
  'src/github-contents-client.js',
  'src/workspace-context.js',
  'src/workspace-store.js',
  'src/linked-notes-ui.js',
  'src/linked-notes-app.js',
  'linked-notes-prototype.user.js'
];

function run(args) {
  const result = spawnSync(process.execPath, args, { cwd: here, stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status || 1);
}

for (const path of syntaxPaths) run(['--check', join(here, path)]);
run(['--test', ...['linked-notes-core.test.mjs', 'note-markdown-codec.test.mjs', 'repository-target.test.mjs', 'github-contents-client.test.mjs', 'workspace-context.test.mjs', 'workspace-store.test.mjs', 'linked-notes-ui.test.mjs', 'linked-notes-app-policy.test.mjs'].map((name) => join(here, 'tests', name))]);
run([join(here, 'build-linked-notes.mjs'), '--check']);
console.log('Linked Notes prototype verification passed.');
