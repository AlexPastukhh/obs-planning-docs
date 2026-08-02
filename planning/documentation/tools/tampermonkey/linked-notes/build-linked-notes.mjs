import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const outputPath = join(here, 'linked-notes-prototype.user.js');
const sourceFiles = [
  'src/linked-notes-core.js',
  'src/note-markdown-codec.js',
  'src/repository-target.js',
  'src/repository-file-browser.js',
  'src/category-definition-codec.js',
  'src/repository-category-index.js',
  'src/category-cache-store.js',
  'src/indexeddb-note-store.js',
  'src/github-contents-client.js',
  'src/remote-note-reconcile.js',
  'src/workspace-context.js',
  'src/workspace-store.js',
  'src/linked-notes-ui.js',
  'src/linked-notes-app.js'
];

const header = `// ==UserScript==
// @name         OBS Linked Notes Prototype
// @namespace    https://github.com/AlexPastukhh/obs-planning-docs
// @version      0.4.2-prototype
// @description  Repository Notes, file preview and GitHub-backed file categories with explicit verified remote actions.
// @author       OBS planning prototype
// @match        https://chatgpt.com/*
// @match        https://chat.openai.com/*
// @run-at       document-idle
// @grant        GM_getValue
// @grant        GM_setValue
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
