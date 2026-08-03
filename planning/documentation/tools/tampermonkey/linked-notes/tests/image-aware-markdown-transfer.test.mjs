import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const api = Object.assign({}, require('../src/repository-target.js'), require('../src/note-image-assets.js'), require('../src/markdown-image-references.js'), require('../src/image-aware-markdown-transfer.js'));

test('plans one physical copy for duplicate repository image references and preserves external URLs', () => {
  const source = '# Note\n\n![A](../img/a.png)\n<img src="../img/a.png">\n![E](https://example.test/e.png)';
  const plan = api.buildImageAwareTransferPlan({ api, sourcePath: 'notes/n.md', targetPath: 'docs/guide.md', sourceMarkdown: source, mode: 'create' });
  assert.equal(plan.assets.length, 1);
  assert.equal(plan.assets[0].sourcePath, 'img/a.png');
  assert.equal(plan.assets[0].desiredPath, 'docs/guide.assets/a.png');
  assert.equal(plan.diagnostics[0].status, 'preserved');
  const result = api.finalizeImageAwareTransfer(plan, new Map([['img/a.png', 'docs/guide.assets/a-2.png']]), api);
  assert.equal((result.match(/guide\.assets\/a-2\.png/g) || []).length, 2);
  assert.match(result, /https:\/\/example\.test\/e\.png/);
});

test('pending or invalid images block transfer and append keeps current target content', () => {
  const plan = api.buildImageAwareTransferPlan({ api, sourcePath: 'notes/n.md', targetPath: 'docs/guide.md', sourceMarkdown: '![P](obs-pending-image:x)', targetMarkdown: '# Existing\n', mode: 'append' });
  assert.equal(plan.blocked, true);
  assert.match(plan.intendedMarkdown, /Existing/);
});

test('encoded image names round-trip spaces, brackets, parentheses, Unicode and percent signs', () => {
  const source = '![A](<../img/My%20%28x%29%20%5B%D0%91%5D%20%2525.png>)';
  const plan = api.buildImageAwareTransferPlan({ api, sourcePath: 'notes/n.md', targetPath: 'docs/Guide [1].md', sourceMarkdown: source, mode: 'create' });
  assert.equal(plan.assets[0].sourcePath, 'img/My (x) [Б] %25.png');
  const result = api.finalizeImageAwareTransfer(plan, new Map([[plan.assets[0].sourcePath, 'docs/Guide [1].assets/My (x) [Б] %25.png']]), api);
  assert.match(result, /Guide%20%5B1%5D\.assets\/My%20\(x\)%20%5B%D0%91%5D%20%2525\.png/);
});
