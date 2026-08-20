import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const markers = require('../src/review-dependency-markers.js');

const HASH_A = `sha256:${'a'.repeat(64)}`;

test('Review Dependency markers round-trip optional against fingerprint', () => {
  assert.equal(markers.formatReviewDependencyMarker('rd_alpha1'), '<!-- obs-review:dependency id="rd_alpha1" -->');
  assert.equal(markers.formatReviewDependencyMarker('rd_alpha1', HASH_A), `<!-- obs-review:dependency id="rd_alpha1" against="${HASH_A}" -->`);
  const parsed = markers.parseReviewDependencyMarkers(`Before\n${markers.formatReviewDependencyMarker('rd_alpha1', HASH_A)}\nAfter`);
  assert.equal(parsed.diagnostics.length, 0);
  assert.deepEqual(parsed.markers.map((item) => ({ id: item.id, against: item.against })), [{ id: 'rd_alpha1', against: HASH_A }]);
});

test('marker parser ignores examples in fenced and inline code', () => {
  const live = markers.formatReviewDependencyMarker('rd_live1');
  const text = ['```text', markers.formatReviewDependencyMarker('rd_code1'), '```', `Inline \`${markers.formatReviewDependencyMarker('rd_inline1')}\``, live].join('\n');
  const parsed = markers.parseReviewDependencyMarkers(text);
  assert.deepEqual(parsed.markers.map((item) => item.id), ['rd_live1']);
});

test('append, complete and remove mutate only the selected marker', () => {
  const appended = markers.appendReviewDependencyMarker('Body', 'rd_alpha1');
  assert.match(appended, /rd_alpha1/);
  const completed = markers.setReviewDependencyAgainst(appended, 'rd_alpha1', HASH_A);
  assert.match(completed, new RegExp(`against="${HASH_A}"`));
  assert.equal(markers.removeReviewDependencyMarker(completed, 'rd_alpha1').trim(), 'Body');
});

test('malformed fingerprints are diagnosed and rejected by formatter', () => {
  const parsed = markers.parseReviewDependencyMarkers('<!-- obs-review:dependency id="rd_alpha1" against="bad" -->');
  assert.ok(parsed.diagnostics.some((item) => item.kind === 'invalid_fingerprint'));
  assert.throws(() => markers.formatReviewDependencyMarker('rd_alpha1', 'bad'), /Invalid Review Dependency fingerprint/);
});
