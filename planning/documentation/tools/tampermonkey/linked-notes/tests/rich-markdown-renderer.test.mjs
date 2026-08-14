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

test('allowlisted details/summary render as native collapsible HTML with Markdown body', () => {
  const result = api.renderRichMarkdown('<details>\n<summary>**Architecture** and `code`</summary>\n\n### Inside\n\n- one\n- two\n\n</details>');
  assert.match(result.html, /<details class="obs-md-details">/);
  assert.match(result.html, /<summary class="obs-md-summary"><strong>Architecture<\/strong> and <code>code<\/code><\/summary>/);
  assert.match(result.html, /<h3>Inside<\/h3>/);
  assert.match(result.html, /<ul><li>one<\/li><li>two<\/li><\/ul>/);
});

test('details open is the only accepted details attribute', () => {
  const open = api.renderRichMarkdown('<details open>\n<summary>Open</summary>\n\nBody\n\n</details>');
  assert.match(open.html, /<details class="obs-md-details" open>/);
  const hostile = api.renderRichMarkdown('<details onclick="alert(1)">\n<summary style="color:red">Bad</summary>\n\nBody\n\n</details>');
  assert.doesNotMatch(hostile.html, /<details[^>]*onclick/i);
  assert.doesNotMatch(hostile.html, /<summary[^>]*style=/i);
  assert.match(hostile.html, /&lt;details onclick=&quot;alert\(1\)&quot;&gt;/);
});

test('details body keeps arbitrary active HTML escaped', () => {
  const result = api.renderRichMarkdown('<details>\n<summary>Safe</summary>\n\n<script>alert(1)</script>\n<iframe src="https://example.com"></iframe>\n\n</details>');
  assert.match(result.html, /<details class="obs-md-details">/);
  assert.doesNotMatch(result.html, /<script>|<iframe/i);
  assert.match(result.html, /&lt;script&gt;/);
  assert.match(result.html, /&lt;iframe/);
});

test('details syntax inside code fences stays literal code', () => {
  const result = api.renderRichMarkdown('```html\n<details open>\n<summary>Example</summary>\n</details>\n```');
  assert.doesNotMatch(result.html, /<details class="obs-md-details"/);
  assert.match(result.html, /&lt;details open&gt;/);
  assert.match(result.html, /&lt;summary&gt;Example&lt;\/summary&gt;/);
});

test('nested or malformed details blocks are rendered as inert literal HTML', () => {
  const nested = api.renderRichMarkdown('<details>\n<summary>Outer</summary>\n\n<details>\n<summary>Inner</summary>\nInner\n</details>\n\n</details>');
  assert.doesNotMatch(nested.html, /<details class="obs-md-details"/);
  assert.match(nested.html, /&lt;details&gt;/);
  const unclosed = api.renderRichMarkdown('<details>\n<summary>Missing close</summary>\n\nBody');
  assert.doesNotMatch(unclosed.html, /<details class="obs-md-details"/);
  assert.match(unclosed.html, /&lt;summary&gt;Missing close&lt;\/summary&gt;/);
});
