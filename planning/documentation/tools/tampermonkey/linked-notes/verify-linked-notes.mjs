import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const syntaxPaths = [
  'build-linked-notes.mjs',
  'verify-linked-notes.mjs',
  'src/action-feedback.js',
  'src/linked-notes-core.js',
  'src/note-image-assets.js',
  'src/note-markdown-codec.js',
  'src/repository-target.js',
  'src/markdown-image-references.js',
  'src/image-aware-markdown-transfer.js',
  'src/repository-file-browser.js',
  'src/repository-text-file-write.js',
  'src/repository-markdown-heading-links.js',
  'src/repository-target-search.js',
  'src/rich-markdown-renderer.js',
  'src/repository-media-loader.js',
  'src/category-definition-codec.js',
  'src/repository-category-index.js',
  'src/note-relation-index.js',
  'src/category-cache-store.js',
  'src/indexeddb-note-store.js',
  'src/pending-note-asset-store.js',
  'src/github-contents-client.js',
  'src/repository-asset-write.js',
  'src/remote-note-reconcile.js',
  'src/workspace-context.js',
  'src/workspace-store.js',
  'src/linked-notes-ui.js',
  'src/linked-notes-app.js',
  'linked-notes-prototype.user.js',
];

function run(args) {
  const result = spawnSync(process.execPath, args, { cwd: here, stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status || 1);
}

for (const path of syntaxPaths) run(['--check', join(here, path)]);
run(['--test', ...['action-feedback.test.mjs', 'linked-notes-core.test.mjs', 'note-image-assets.test.mjs', 'pending-note-asset-store.test.mjs', 'note-markdown-codec.test.mjs', 'repository-target.test.mjs', 'markdown-image-references.test.mjs', 'image-aware-markdown-transfer.test.mjs', 'repository-file-browser.test.mjs', 'repository-target-search.test.mjs', 'rich-markdown-renderer.test.mjs', 'repository-media-loader.test.mjs', 'repository-asset-write.test.mjs', 'category-definition-codec.test.mjs', 'repository-category-index.test.mjs', 'note-relation-index.test.mjs', 'category-cache-store.test.mjs', 'github-contents-client.test.mjs', 'remote-note-reconcile.test.mjs', 'workspace-context.test.mjs', 'workspace-store.test.mjs', 'linked-notes-ui.test.mjs', 'linked-notes-app-policy.test.mjs', 'files-surface-auto-load.test.mjs', 'repository-text-file-write.test.mjs', 'repository-markdown-heading-links.test.mjs'].map((name) => join(here, 'tests', name))]);
run([join(here, 'build-linked-notes.mjs'), '--check']);
console.log('Linked Notes prototype verification passed.');
