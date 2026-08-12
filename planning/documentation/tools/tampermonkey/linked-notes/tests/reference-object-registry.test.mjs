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
  assert.deepEqual(renamed.objects[0], { id: 'ro_damage1', name: 'Default weapon damage', definition: { path: 'game/combat.md' }, uses: [] });
});

test('duplicate ids and unsafe repository paths are rejected', () => {
  assert.throws(() => registry.normalizeReferenceObjectRegistry({ schemaVersion: 1, objects: [
    { id: 'ro_damage1', name: 'A', definition: { path: 'a.md' } },
    { id: 'ro_damage1', name: 'B', definition: { path: 'b.md' } }
  ] }), /Duplicate Reference Object id/);
  assert.throws(() => registry.upsertReferenceObject(registry.emptyReferenceObjectRegistry(), { id: 'ro_damage1', name: 'A', definition: { path: '../a.md' } }), /repository-relative|invalid|contains/i);
});
