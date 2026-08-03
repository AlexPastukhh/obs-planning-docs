import test from 'node:test';
import assert from 'node:assert/strict';
import api from '../src/rich-markdown-renderer.js';

test('renders rich Markdown while preserving source as a derived projection', () => {
  const result = api.renderRichMarkdown('# Title\n\n- **one**\n- two\n\n| A | B |\n|---|---|\n| 1 | 2 |\n\n```js\nalert(1)\n```');
  assert.match(result.html, /<h1>Title<\/h1>/);
  assert.match(result.html, /<strong>one<\/strong>/);
  assert.match(result.html, /<table>/);
  assert.match(result.html, /<pre><code class="language-js">alert\(1\)<\/code><\/pre>/);
  assert.equal(result.sourceLength > 0, true);
});

test('Markdown images and whitelisted img tags become authenticated resource descriptors', () => {
  const result = api.renderRichMarkdown('![Schema](../images/a.png "Diagram")\n\n<img src="/assets/b.webp" alt="B" width="720" onerror="alert(1)" style="position:fixed">');
  assert.equal(result.resources.length, 2);
  assert.equal(result.resources[0].target, '../images/a.png');
  assert.equal(result.resources[1].width, '720');
  assert.doesNotMatch(result.html, /onerror|style=/i);
  assert.match(result.html, /data-obs-image-id="image-2"/);
});

test('unsafe URLs and arbitrary raw HTML are not executable', () => {
  const result = api.renderRichMarkdown('[bad](javascript:alert(1))\n\n<img src="javascript:alert(1)" onload="alert(2)">\n\n<script>alert(3)</script>');
  assert.doesNotMatch(result.html, /href="javascript:/i);
  assert.doesNotMatch(result.html, /<script>/i);
  assert.doesNotMatch(result.html, /onload=/i);
  assert.match(result.html, /&lt;script&gt;/);
});

test('repository and external links are distinguishable without direct navigation', () => {
  const result = api.renderRichMarkdown('[Local](../docs/a.md) and [External](https://example.com/x)');
  assert.equal(result.links.length, 2);
  assert.equal(result.links[0].external, false);
  assert.equal(result.links[1].external, true);
  assert.match(result.html, /data-obs-link-target="\.\.\/docs\/a\.md"/);
});


test('pending Note image references remain safe render resources', () => {
  const result = api.renderRichMarkdown('![Pending](obs-pending-image:asset-one)');
  assert.equal(result.resources[0].target, 'obs-pending-image:asset-one');
  assert.match(result.html, /data-obs-image-id/);
});
