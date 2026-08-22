import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const registry = require('../src/reference-object-registry.js');

test('Definitions File round-trips stable ids, mutable names and rebuildable uses', () => {
  const value = registry.upsertReferenceObject(registry.emptyReferenceObjectRegistry(), {
    id: 'ro_damage1', name: 'Base damage', definition: { path: 'game/combat.md' }, uses: [
      { path: 'zombie.md', line: 9, lineOccurrence: 2 },
      { path: 'zombie.md', line: 9, lineOccurrence: 1 }
    ]
  });
  const encoded = registry.encodeReferenceObjectRegistry(value);
  const decoded = registry.decodeReferenceObjectRegistry(encoded);
  assert.deepEqual(decoded.objects[0].uses, [
    { path: 'zombie.md', line: 9, lineOccurrence: 1 },
    { path: 'zombie.md', line: 9, lineOccurrence: 2 }
  ]);
  assert.equal(encoded.includes('25'), false);
});

test('rename changes only human-readable name while stable id and definition path remain', () => {
  const base = registry.upsertReferenceObject(registry.emptyReferenceObjectRegistry(), { id: 'ro_damage1', name: 'Base damage', definition: { path: 'game/combat.md' }, uses: [] });
  const renamed = registry.renameReferenceObject(base, 'ro_damage1', 'Default weapon damage');
  assert.deepEqual(renamed.objects[0], { id: 'ro_damage1', name: 'Default weapon damage', definition: { path: 'game/combat.md' }, uses: [], depends: [] });
});

test('duplicate ids and unsafe repository paths are rejected', () => {
  assert.throws(() => registry.normalizeReferenceObjectRegistry({ schemaVersion: 1, objects: [
    { id: 'ro_damage1', name: 'A', definition: { path: 'a.md' } },
    { id: 'ro_damage1', name: 'B', definition: { path: 'b.md' } }
  ] }), /Duplicate Reference Object id/);
  assert.throws(() => registry.upsertReferenceObject(registry.emptyReferenceObjectRegistry(), { id: 'ro_damage1', name: 'A', definition: { path: '../a.md' } }), /repository-relative|invalid|contains/i);
});


test('v1 registry migrates to v2 and dependencies retain file-local identity plus review fingerprint', () => {
  const migrated = registry.decodeReferenceObjectRegistry(JSON.stringify({ schemaVersion: 1, objects: [{ id: 'ro_damage1', name: 'Base damage', definition: { path: 'game/combat.md' }, uses: [] }] }));
  assert.equal(migrated.schemaVersion, 2);
  assert.deepEqual(migrated.objects[0].depends, []);
  const reviewed = registry.replaceReferenceObjectDependencies(migrated, 'ro_damage1', [{ dep: 2, path: 'game/balance.md', line: 8, lineOccurrence: 1, reviewedAgainst: 'sha256:' + 'a'.repeat(64), reviewedFragment: 'sha256:' + 'b'.repeat(64) }]);
  const roundTrip = registry.decodeReferenceObjectRegistry(registry.encodeReferenceObjectRegistry(reviewed));
  assert.deepEqual(roundTrip.objects[0].depends, [{ dep: 2, path: 'game/balance.md', line: 8, lineOccurrence: 1, reviewedAgainst: 'sha256:' + 'a'.repeat(64), reviewedFragment: 'sha256:' + 'b'.repeat(64) }]);
});

test('dependency numbers are file-local and cannot identify two objects in the same file', () => {
  assert.throws(() => registry.normalizeReferenceObjectRegistry({ schemaVersion: 2, objects: [
    { id: 'ro_damage1', name: 'A', definition: { path: 'a.md' }, depends: [{ dep: 1, path: 'consumer.md', line: 1, lineOccurrence: 1 }] },
    { id: 'ro_speed11', name: 'B', definition: { path: 'b.md' }, depends: [{ dep: 1, path: 'consumer.md', line: 2, lineOccurrence: 1 }] }
  ] }), /dependency.*1.*consumer\.md|duplicate/i);
});
