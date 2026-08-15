import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const outputPath = join(here, 'linked-notes-prototype.user.js');
const sourceFiles = [
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
  'src/repository-files-workspace-core.js',
  'src/repository-file-templates.js',
  'src/reference-object-markers.js',
  'src/ordered-reference-list-markers.js',
  'src/ordered-reference-list-core.js',
  'src/reference-object-registry.js',
  'src/repository-local-change-store.js',
  'src/reference-object-local-store.js',
  'src/repository-reference-object-service.js',
  'src/repository-target-search.js',
  'src/rich-markdown-renderer.js',
  'src/chat-response-reader.js',
  'src/repository-media-loader.js',
  'src/category-definition-codec.js',
  'src/repository-category-index.js',
  'src/note-relation-index.js',
  'src/category-cache-store.js',
  'src/indexeddb-note-store.js',
  'src/pending-note-asset-store.js',
  'src/github-contents-client.js',
  'src/repository-change-publisher.js',
  'src/repository-asset-write.js',
  'src/remote-note-reconcile.js',
  'src/workspace-context.js',
  'src/workspace-store.js',
  'src/full-app-state-export.js',
  'src/linked-notes-ui.js',
  'src/linked-notes-app.js',
  'src/runtime-responsiveness.js',
  'src/repository-files-workspace-runtime.js',
  'src/repository-reference-objects-runtime.js',
  'src/repository-local-changes-runtime.js',
  'src/repository-ordered-reference-lists-runtime.js',
  'src/repository-reference-stale-runtime.js',
  'src/chat-response-reader-runtime.js',
  'src/full-app-state-runtime.js',
];

const header = `// ==UserScript==
// @name         OBS Linked Notes Prototype
// @namespace    https://github.com/AlexPastukhh/obs-planning-docs
// @version      0.8.0-prototype
// @description  Local-first repository workspace with atomic GitHub updates, Ordered Reference Lists, stale-use diagnostics, linked Notes and safe Markdown.
// @author       OBS planning prototype
// @match        https://chatgpt.com/*
// @match        https://chat.openai.com/*
// @run-at       document-idle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_listValues
// @grant        GM_setClipboard
// @grant        GM_xmlhttpRequest
// @connect      api.github.com
// ==/UserScript==
`;

export async function buildUserscript() {
  const chunks = [header.trimEnd()];
  for (const source of sourceFiles) {
    const content = (await readFile(join(here, source), 'utf8')).replace(/\r\n/g, '\n').trimEnd();
    chunks.push(`\n/* ${source} */\n${content}`);
  }
  chunks.push(`
/* bootstrap */
Promise.resolve(globalThis.ObsLinkedNotes.mountLinkedNotesPrototype()).catch((error) => {
  console.error('[OBS Linked Notes Prototype] mount failed', error);
});`);
  return `${chunks.join('\n')}\n`;
}

const expected = await buildUserscript();
if (process.argv.includes('--check')) {
  let actual = '';
  try { actual = await readFile(outputPath, 'utf8'); } catch (error) { /* handled below */ }
  if (actual.replace(/\r\n/g, '\n') !== expected) {
    console.error(`Generated userscript is stale: ${relative(process.cwd(), outputPath)}`);
    process.exitCode = 1;
  } else {
    console.log('Generated userscript is current.');
  }
} else {
  await writeFile(outputPath, expected, 'utf8');
  console.log(`Built ${relative(process.cwd(), outputPath)}`);
}
