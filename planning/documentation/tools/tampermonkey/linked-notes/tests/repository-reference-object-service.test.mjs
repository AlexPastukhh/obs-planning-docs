import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const markers = require('../src/reference-object-markers.js');
const registryApi = require('../src/reference-object-registry.js');
const service = require('../src/repository-reference-object-service.js');

function missing(path) { const error = new Error(`missing: ${path}`); error.kind = 'not_found'; return error; }

function makeClient(initial = {}) {
  const files = new Map();
  const writes = [];
  const reads = [];
  const lists = [];
  let seq = 0;
  for (const [path, content] of Object.entries(initial)) files.set(path, { path, content, sha: `sha-${++seq}` });
  function list(path) {
    const prefix = path ? `${path}/` : '';
    const children = new Map();
    for (const file of files.values()) {
      if (!file.path.startsWith(prefix)) continue;
      const rest = file.path.slice(prefix.length);
      if (!rest) continue;
      const slash = rest.indexOf('/');
      if (slash >= 0) {
        const name = rest.slice(0, slash);
        children.set(`d:${name}`, { type: 'dir', name, path: prefix ? `${path}/${name}` : name, size: 0, sha: '' });
      } else {
        const bytes = new TextEncoder().encode(file.content);
        children.set(`f:${rest}`, { type: 'file', name: rest, path: file.path, size: bytes.byteLength, sha: file.sha });
      }
    }
    if (!children.size && path) throw missing(path);
    return [...children.values()];
  }
  return {
    files, writes, reads, lists,
    async listDirectory(path) { lists.push(path); return list(path); },
    async readBytes(path) {
      reads.push(path);
      const file = files.get(path); if (!file) throw missing(path);
      const bytes = new TextEncoder().encode(file.content);
      return { path, name: path.split('/').pop(), sha: file.sha, size: bytes.byteLength, bytes };
    },
    async readMetadata(path) {
      const file = files.get(path); if (!file) throw missing(path);
      return { type: 'file', path, sha: file.sha, size: new TextEncoder().encode(file.content).byteLength };
    },
    async saveVerified({ path, content, baseSha }) {
      const current = files.get(path);
      if (baseSha) {
        if (!current || current.sha !== baseSha) { const error = new Error(`conflict: ${path}`); error.kind = 'conflict'; throw error; }
      } else if (current) { const error = new Error(`exists: ${path}`); error.kind = 'conflict'; throw error; }
      const sha = `new-${++seq}`;
      files.set(path, { path, content, sha });
      writes.push({ path, content, baseSha });
      return { path, content, sha };
    }
  };
}

function definitionsFile() {
  return registryApi.encodeReferenceObjectRegistry({ schemaVersion: 1, objects: [{ id: 'ro_damage1', name: 'Base damage', definition: { path: 'game/combat.md' }, uses: [{ path: 'game/zombie.md', line: 1, lineOccurrence: 1 }] }] });
}

test('Check uses is read-only and reports stale/current materializations', async () => {
  const client = makeClient({
    '.linked-notes/reference-objects.json': definitionsFile(),
    'game/combat.md': `Damage ${markers.formatReferenceDefinition('ro_damage1', '30')}`,
    'game/zombie.md': `${markers.formatReferenceUse('ro_damage1', '25')} / ${markers.formatReferenceUse('ro_damage1', '30')}`
  });
  const result = await service.checkReferenceObjectUses({ client, objectId: 'ro_damage1' });
  assert.deepEqual(result.uses.map((item) => item.status), ['stale', 'current']);
  assert.deepEqual(result.uses.map((item) => item.lineOccurrence), [1, 2]);
  assert.equal(client.writes.length, 0);
  assert.equal(result.currentValue, '30');
});

test('local update changes only stale marker inner values and rebuilds use index', async () => {
  const client = makeClient({
    '.linked-notes/reference-objects.json': definitionsFile(),
    'game/combat.md': markers.formatReferenceDefinition('ro_damage1', '30'),
    'game/zombie.md': `${markers.formatReferenceUse('ro_damage1', '25')} / ${markers.formatReferenceUse('ro_damage1', '30')}`
  });
  const check = await service.checkReferenceObjectUses({ client, objectId: 'ro_damage1' });
  const plan = service.buildReferenceObjectLocalUpdate(check);
  assert.equal(plan.staleCount, 1);
  assert.equal(plan.files.length, 1);
  assert.equal(plan.files[0].content, `${markers.formatReferenceUse('ro_damage1', '30')} / ${markers.formatReferenceUse('ro_damage1', '30')}`);
  assert.deepEqual(plan.uses, [{ path: 'game/zombie.md', line: 1, lineOccurrence: 1 }, { path: 'game/zombie.md', line: 1, lineOccurrence: 2 }]);
  assert.equal(client.writes.length, 0);
});

test('remote update preflights then writes stale files and Definitions File separately', async () => {
  const client = makeClient({
    '.linked-notes/reference-objects.json': definitionsFile(),
    'game/combat.md': markers.formatReferenceDefinition('ro_damage1', '30'),
    'game/zombie.md': markers.formatReferenceUse('ro_damage1', '25')
  });
  const result = await service.updateReferenceObjectUsesRemote({ client, objectId: 'ro_damage1' });
  assert.equal(result.staleCount, 1);
  assert.deepEqual(client.writes.map((item) => item.path), ['game/zombie.md', '.linked-notes/reference-objects.json']);
  assert.equal(client.files.get('game/zombie.md').content, markers.formatReferenceUse('ro_damage1', '30'));
  assert.deepEqual(registryApi.decodeReferenceObjectRegistry(client.files.get('.linked-notes/reference-objects.json').content).objects[0].uses, [{ path: 'game/zombie.md', line: 1, lineOccurrence: 1 }]);
});

test('validation reports duplicate definitions, unknown uses and registry drift without writes', async () => {
  const client = makeClient({
    '.linked-notes/reference-objects.json': definitionsFile(),
    'game/combat.md': `${markers.formatReferenceDefinition('ro_damage1', '30')} / ${markers.formatReferenceDefinition('ro_damage1', '31')}`,
    'game/zombie.md': markers.formatReferenceUse('ro_unknown1', 'x')
  });
  const validation = await service.validateReferenceObjectTags({ client });
  assert.equal(validation.valid, false);
  assert.ok(validation.diagnostics.some((item) => item.kind === 'duplicate_definition'));
  assert.ok(validation.diagnostics.some((item) => item.kind === 'unknown_use_id'));
  assert.ok(validation.diagnostics.some((item) => item.kind === 'usage_index_drift'));
  assert.equal(client.writes.length, 0);
});

test('effective local overlays participate in Check uses without GitHub writes', async () => {
  const client = makeClient({
    '.linked-notes/reference-objects.json': definitionsFile(),
    'game/combat.md': markers.formatReferenceDefinition('ro_damage1', '30'),
    'game/zombie.md': markers.formatReferenceUse('ro_damage1', '30')
  });
  const overlay = [{ path: 'game/combat.md', baseSha: client.files.get('game/combat.md').sha, content: markers.formatReferenceDefinition('ro_damage1', '40') }];
  const check = await service.checkReferenceObjectUses({ client, objectId: 'ro_damage1', overlays: overlay });
  assert.equal(check.currentValue, '40');
  assert.equal(check.uses[0].status, 'stale');
  assert.equal(client.writes.length, 0);
});

test('deep repository validation ignores documentation examples inside Markdown code', async () => {
  const client = makeClient({
    '.linked-notes/reference-objects.json': definitionsFile(),
    'game/combat.md': markers.formatReferenceDefinition('ro_damage1', '30'),
    'docs/reference-example.md': [
      '```text',
      markers.formatReferenceDefinition('ro_damage1', 'example-only'),
      markers.formatReferenceUse('ro_damage1', 'example-only'),
      '```',
      `Inline \`${markers.formatReferenceUse('ro_damage1', 'inline-only')}\``
    ].join('\n')
  });
  const validation = await service.deepValidateReferenceObjectTags({ client });
  assert.equal(validation.diagnostics.some((item) => item.kind === 'duplicate_definition'), false);
  assert.equal(validation.counts.definitions, 1);
  assert.equal(validation.counts.uses, 0);
  assert.equal(client.writes.length, 0);
});

test('repository freshness follows Definitions File routes without crawling unrelated files', async () => {
  const client = makeClient({
    '.linked-notes/reference-objects.json': definitionsFile(),
    'game/combat.md': markers.formatReferenceDefinition('ro_damage1', '30'),
    'game/zombie.md': markers.formatReferenceUse('ro_damage1', '25'),
    'docs/unrelated.md': markers.formatReferenceUse('ro_unknown1', 'x'),
    'deep/nested/other.md': markers.formatReferenceDefinition('ro_damage1', 'not-an-indexed-definition')
  });
  const result = await service.diagnoseReferenceObjectFreshness({ client });
  assert.equal(result.staleCount, 1);
  assert.equal(result.unresolvedCount, 0);
  assert.equal(result.scanSummary.mode, 'indexed');
  assert.deepEqual(client.lists, []);
  assert.deepEqual(client.reads, ['.linked-notes/reference-objects.json', 'game/combat.md', 'game/zombie.md']);
  assert.deepEqual(result.files.map((file) => file.path), ['game/zombie.md']);
  assert.equal(client.writes.length, 0);
});

test('empty Definitions File freshness check stops after the registry read', async () => {
  const client = makeClient({
    '.linked-notes/reference-objects.json': registryApi.encodeReferenceObjectRegistry({ schemaVersion: 1, objects: [] }),
    'docs/unrelated.md': markers.formatReferenceUse('ro_unknown1', 'x')
  });
  const result = await service.diagnoseReferenceObjectFreshness({ client });
  assert.equal(result.staleCount, 0);
  assert.equal(result.unresolvedCount, 0);
  assert.deepEqual(result.files, []);
  assert.deepEqual(client.lists, []);
  assert.deepEqual(client.reads, ['.linked-notes/reference-objects.json']);
});

test('Check uses reads only the indexed definition and use files', async () => {
  const client = makeClient({
    '.linked-notes/reference-objects.json': definitionsFile(),
    'game/combat.md': markers.formatReferenceDefinition('ro_damage1', '30'),
    'game/zombie.md': markers.formatReferenceUse('ro_damage1', '30'),
    'elsewhere/unindexed.md': markers.formatReferenceUse('ro_damage1', '10')
  });
  const result = await service.checkReferenceObjectUses({ client, objectId: 'ro_damage1' });
  assert.equal(result.currentValue, '30');
  assert.deepEqual(result.uses.map((item) => item.value), ['30']);
  assert.equal(result.scanSummary.mode, 'indexed');
  assert.deepEqual(client.lists, []);
  assert.deepEqual(client.reads, ['.linked-notes/reference-objects.json', 'game/combat.md', 'game/zombie.md']);
});

test('Validate tags follows only Definitions File routes and reports indexed scope', async () => {
  const client = makeClient({
    '.linked-notes/reference-objects.json': definitionsFile(),
    'game/combat.md': markers.formatReferenceDefinition('ro_damage1', '30'),
    'game/zombie.md': markers.formatReferenceUse('ro_damage1', '30'),
    'elsewhere/unindexed.md': markers.formatReferenceUse('ro_damage1', '10')
  });
  const validation = await service.validateReferenceObjectTags({ client });
  assert.equal(validation.valid, true);
  assert.equal(validation.scope, 'indexed');
  assert.equal(validation.globalIntegrity, false);
  assert.equal(validation.scanSummary.mode, 'indexed');
  assert.deepEqual(client.lists, []);
  assert.deepEqual(client.reads, ['.linked-notes/reference-objects.json', 'game/combat.md', 'game/zombie.md']);
  assert.equal(validation.counts.uses, 1);
});

test('Deep validate repo remains the explicit repository-wide integrity scan', async () => {
  const client = makeClient({
    '.linked-notes/reference-objects.json': definitionsFile(),
    'game/combat.md': markers.formatReferenceDefinition('ro_damage1', '30'),
    'game/zombie.md': markers.formatReferenceUse('ro_damage1', '30'),
    'elsewhere/unindexed.md': markers.formatReferenceUse('ro_damage1', '10')
  });
  const validation = await service.deepValidateReferenceObjectTags({ client });
  assert.equal(validation.scope, 'repository');
  assert.equal(validation.scanSummary.mode, 'repository');
  assert.ok(client.lists.length > 0);
  assert.ok(client.reads.includes('elsewhere/unindexed.md'));
  assert.ok(validation.diagnostics.some((item) => item.kind === 'usage_index_drift'));
});

test('empty Definitions File indexed validation stops after the registry read', async () => {
  const client = makeClient({
    '.linked-notes/reference-objects.json': registryApi.encodeReferenceObjectRegistry({ schemaVersion: 1, objects: [] }),
    'elsewhere/unindexed.md': markers.formatReferenceUse('ro_unknown1', '10')
  });
  const validation = await service.validateReferenceObjectTags({ client });
  assert.equal(validation.valid, true);
  assert.equal(validation.scope, 'indexed');
  assert.deepEqual(client.lists, []);
  assert.deepEqual(client.reads, ['.linked-notes/reference-objects.json']);
  assert.deepEqual(validation.counts, { objects: 0, definitions: 0, uses: 0, depends: 0, files: 0 });
});


function dependencyDefinitionsFile(reviewedAgainst = '', reviewedFragment = '') {
  return registryApi.encodeReferenceObjectRegistry({ schemaVersion: 2, objects: [{ id: 'ro_damage1', name: 'Base damage', definition: { path: 'game/combat.md' }, uses: [], depends: [{ dep: 1, path: 'game/balance.md', line: 1, lineOccurrence: 1, ...(reviewedAgainst ? { reviewedAgainst } : {}), ...(reviewedFragment ? { reviewedFragment } : {}) }] }] });
}

test('Check dependencies validates source acknowledgement and the indexed consumer fragment', async () => {
  const sourceFingerprint = await markers.referenceObjectValueFingerprint('30');
  const fragmentFingerprint = await markers.referenceObjectValueFingerprint('Derived conclusion');
  const client = makeClient({
    '.linked-notes/reference-objects.json': dependencyDefinitionsFile(sourceFingerprint, fragmentFingerprint),
    'game/combat.md': markers.formatReferenceDefinition('ro_damage1', '30'),
    'game/balance.md': markers.formatReferenceDependency('ro_damage1', 1, 'Derived conclusion')
  });
  const current = await service.checkReferenceObjectDependencies({ client, objectId: 'ro_damage1' });
  assert.equal(current.currentCount, 1);
  assert.equal(current.needsReviewCount, 0);
  assert.deepEqual(client.reads, ['.linked-notes/reference-objects.json', 'game/combat.md', 'game/balance.md']);

  client.reads.length = 0;
  const sourceChanged = await service.checkReferenceObjectDependencies({ client, objectId: 'ro_damage1', overlays: [{ path: 'game/combat.md', baseSha: client.files.get('game/combat.md').sha, content: markers.formatReferenceDefinition('ro_damage1', '40') }] });
  assert.equal(sourceChanged.needsReviewCount, 1);
  assert.deepEqual(client.reads, ['.linked-notes/reference-objects.json', 'game/balance.md']);

  client.reads.length = 0;
  const fragmentChanged = await service.checkReferenceObjectDependencies({ client, objectId: 'ro_damage1', overlays: [{ path: 'game/balance.md', baseSha: client.files.get('game/balance.md').sha, content: markers.formatReferenceDependency('ro_damage1', 1, 'Different conclusion') }] });
  assert.equal(fragmentChanged.needsReviewCount, 1);
  assert.deepEqual(client.reads, ['.linked-notes/reference-objects.json', 'game/combat.md']);
});

test('Check dependencies marks a missing registered fragment unresolved', async () => {
  const sourceFingerprint = await markers.referenceObjectValueFingerprint('30');
  const fragmentFingerprint = await markers.referenceObjectValueFingerprint('Derived conclusion');
  const client = makeClient({
    '.linked-notes/reference-objects.json': dependencyDefinitionsFile(sourceFingerprint, fragmentFingerprint),
    'game/combat.md': markers.formatReferenceDefinition('ro_damage1', '30'),
    'game/balance.md': 'The dependency marker was removed.'
  });
  const result = await service.checkReferenceObjectDependencies({ client, objectId: 'ro_damage1' });
  assert.equal(result.unresolvedCount, 1);
  assert.ok(result.diagnostics.some((item) => item.kind === 'dependency_marker_missing'));
});

test('Review complete validates the bounded fragment then stores source and fragment fingerprints only in registry metadata', async () => {
  const client = makeClient({
    '.linked-notes/reference-objects.json': dependencyDefinitionsFile('', ''),
    'game/combat.md': markers.formatReferenceDefinition('ro_damage1', '30'),
    'game/balance.md': markers.formatReferenceDependency('ro_damage1', 1, 'Derived conclusion')
  });
  const result = await service.completeReferenceObjectDependencyReview({ client, objectId: 'ro_damage1', path: 'game/balance.md', dep: 1 });
  assert.equal(client.writes.length, 0);
  const stored = registryApi.decodeReferenceObjectRegistry(result.registryContent).objects[0].depends[0];
  assert.equal(stored.reviewedAgainst, await markers.referenceObjectValueFingerprint('30'));
  assert.equal(stored.reviewedFragment, await markers.referenceObjectValueFingerprint('Derived conclusion'));
  assert.equal(client.files.get('game/balance.md').content.includes('sha256:'), false);
});

test('freshness exposes dependency review warnings and validates indexed consumer content', async () => {
  const sourceFingerprint = await markers.referenceObjectValueFingerprint('30');
  const oldFragmentFingerprint = await markers.referenceObjectValueFingerprint('Old conclusion');
  const client = makeClient({
    '.linked-notes/reference-objects.json': dependencyDefinitionsFile(sourceFingerprint, oldFragmentFingerprint),
    'game/combat.md': markers.formatReferenceDefinition('ro_damage1', '30'),
    'game/balance.md': markers.formatReferenceDependency('ro_damage1', 1, 'Derived conclusion')
  });
  const result = await service.diagnoseReferenceObjectFreshness({ client });
  assert.equal(result.dependencyNeedsReviewCount, 1);
  assert.deepEqual(client.reads, ['.linked-notes/reference-objects.json', 'game/combat.md', 'game/balance.md']);
  assert.equal(result.files.find((item) => item.path === 'game/balance.md').dependencyNeedsReview, 1);
});
