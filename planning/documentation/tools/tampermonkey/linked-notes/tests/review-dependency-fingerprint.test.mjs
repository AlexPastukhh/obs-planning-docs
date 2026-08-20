import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const markers = require('../src/review-dependency-markers.js');
const fingerprint = require('../src/review-dependency-fingerprint.js');

const HASH_A = `sha256:${'a'.repeat(64)}`;
const HASH_B = `sha256:${'b'.repeat(64)}`;

test('fingerprint is stable across line endings', async () => {
  assert.equal(await fingerprint.reviewDependencySourceFingerprint('A\r\nB\r\n'), await fingerprint.reviewDependencySourceFingerprint('A\nB\n'));
});

test('dependency bookkeeping markers do not affect source fingerprint', async () => {
  const left = `Meaning\n${markers.formatReviewDependencyMarker('rd_alpha1', HASH_A)}\nMore`;
  const right = `Meaning\n${markers.formatReviewDependencyMarker('rd_alpha1', HASH_B)}\nMore`;
  assert.equal(await fingerprint.reviewDependencySourceFingerprint(left), await fingerprint.reviewDependencySourceFingerprint(right));
});

test('semantic text change affects source fingerprint', async () => {
  assert.notEqual(await fingerprint.reviewDependencySourceFingerprint('Meaning A'), await fingerprint.reviewDependencySourceFingerprint('Meaning B'));
});

test('marker-looking examples in code remain semantic source content', async () => {
  const left = ['```text', markers.formatReviewDependencyMarker('rd_alpha1', HASH_A), '```'].join('\n');
  const right = ['```text', markers.formatReviewDependencyMarker('rd_alpha1', HASH_B), '```'].join('\n');
  assert.notEqual(await fingerprint.reviewDependencySourceFingerprint(left), await fingerprint.reviewDependencySourceFingerprint(right));
});

test('adding a standalone bookkeeping marker does not change source fingerprint', async () => {
  const base = 'Meaning\nMore\n';
  const withMarker = `Meaning\n${markers.formatReviewDependencyMarker('rd_alpha1', HASH_A)}\nMore\n`;
  assert.equal(await fingerprint.reviewDependencySourceFingerprint(base), await fingerprint.reviewDependencySourceFingerprint(withMarker));
});
