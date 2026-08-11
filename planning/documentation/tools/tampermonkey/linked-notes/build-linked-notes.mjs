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
  'src/runtime-responsiveness.js',
];

const header = `// ==UserScript==
// @name         OBS Linked Notes Prototype
// @namespace    https://github.com/AlexPastukhh/obs-planning-docs
// @version      0.7.1-prototype
// @description  Repository Notes plus responsive refresh controls, text-file authoring, heading-link copy, searchable categories, rich Markdown and GitHub actions.
// @author       OBS planning prototype
// @match        https://chatgpt.com/*
// @match        https://chat.openai.com/*
// @run-at       document-idle
// @grant        GM_getValue
// @grant        GM_setValue
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
