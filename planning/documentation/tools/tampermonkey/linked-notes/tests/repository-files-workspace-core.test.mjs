import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const api = require('../src/repository-files-workspace-core.js');

test('folder index candidate uses exact folder name and does nothing for root', () => {
  assert.equal(api.folderIndexCandidate('game-planning'), 'game-planning/game-planning.md');
  assert.equal(api.folderIndexCandidate('areas/game design'), 'areas/game design/game design.md');
  assert.equal(api.folderIndexCandidate(''), '');
});

test('whole-file repository-root Markdown link encodes path and escapes label', () => {
  assert.equal(api.repositoryRootFileTarget('docs/a b(1).md'), '/docs/a%20b%281%29.md');
  assert.equal(api.repositoryRootFileMarkdownLink('docs/a b.md', 'A [B]'), '[A \\[B\\]](/docs/a%20b.md)');
});

test('workspace preferences normalize shortcuts and document presets', () => {
  const prefs = api.normalizeFilesWorkspacePreferences({
    folderShortcuts: [{ name: 'Combat', path: 'game/combat' }],
    documentPresets: [{ name: 'System', categoryId: 'system', templatePath: 'templates/system.md' }]
  });
  assert.equal(prefs.folderShortcuts[0].path, 'game/combat');
  assert.equal(prefs.documentPresets[0].categoryId, 'system');
  assert.match(api.workspaceFilesPreferenceKey({ id: 'w1', owner: 'Org', repo: 'Docs.git', branch: 'feature/x' }), /org.*docs.*feature%2Fx/);
});

test('structure parser is add-only input with implicit folders and leaf placeholders', () => {
  const plan = api.parseRepositoryStructure(`entity/\nentity/entity.md\nentity/systems/\nentity/systems/combat.md\nentity/empty/`, { basePath: 'game' });
  assert.deepEqual(plan.files, ['game/entity/entity.md', 'game/entity/systems/combat.md']);
  assert.ok(plan.folders.includes('game/entity/systems'));
  assert.deepEqual(plan.leafFolders, ['game/entity/empty']);
  assert.throws(() => api.parseRepositoryStructure('thing\nthing/file.md'), /below a file/);
  assert.throws(() => api.parseRepositoryStructure('../escape.md'), /\.\./);
});

test('copy destination mapping preserves subtree below renamed root', () => {
  assert.equal(api.copyDestinationPath('docs/source', 'archive/copy', 'docs/source/a/b.md'), 'archive/copy/a/b.md');
  assert.throws(() => api.copyDestinationPath('docs/source', 'archive/copy', 'docs/other.md'), /outside source root/);
});

test('link popover is clamped to main container instead of viewport/sidebar', () => {
  const result = api.clampRepositoryLinkPopoverRect(
    { left: 820, right: 900, top: 100, bottom: 134 },
    { left: 300, right: 920, top: 60, bottom: 700, width: 620, height: 640 }
  );
  assert.equal(result.width, 520);
  assert.ok(result.left >= 308);
  assert.ok(result.left + result.width <= 912);
});
