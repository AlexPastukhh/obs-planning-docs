import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
require('../src/review-dependency-markers.js');
require('../src/repository-local-change-store.js');
const registry = require('../src/review-dependency-registry.js');

test('registry keeps per-relation reason and optional review scope', () => {
  const value = registry.normalizeReviewDependencyRegistry({ schemaVersion: 1, dependencies: [
    { id: 'rd_beta1', sourcePath: 'docs/a.md', consumerPath: 'docs/c.md', reason: 'Terminology dependency' },
    { id: 'rd_alpha1', sourcePath: 'docs/a.md', consumerPath: 'docs/b.md', reason: 'Command behavior', reviewScope: 'Check flags and examples.' }
  ] });
  assert.deepEqual(value.dependencies.map((item) => item.id), ['rd_alpha1', 'rd_beta1']);
  assert.equal(value.dependencies[0].reviewScope, 'Check flags and examples.');
  assert.equal(registry.decodeReviewDependencyRegistry(registry.encodeReviewDependencyRegistry(value)).dependencies.length, 2);
});

test('registry supplies default reason and rejects duplicate pairs', () => {
  const single = registry.normalizeReviewDependencyRegistry({ dependencies: [{ id: 'rd_alpha1', sourcePath: 'a.md', consumerPath: 'b.md' }] });
  assert.equal(single.dependencies[0].reason, 'Depends on this source file.');
  assert.throws(() => registry.normalizeReviewDependencyRegistry({ dependencies: [
    { id: 'rd_alpha1', sourcePath: 'a.md', consumerPath: 'b.md' },
    { id: 'rd_beta1', sourcePath: 'a.md', consumerPath: 'b.md' }
  ] }), /Duplicate Review Dependency source\/consumer pair/);
});
