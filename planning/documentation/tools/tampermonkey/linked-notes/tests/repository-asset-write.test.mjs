import test from 'node:test';
import assert from 'node:assert/strict';
import api from '../src/repository-asset-write.js';

function fakeClient(files = {}) {
  const map = new Map(Object.entries(files).map(([path, bytes]) => [path, Uint8Array.from(bytes)]));
  return {
    map,
    async readBytes(path) { if (!map.has(path)) { const error = new Error('missing'); error.kind = 'not_found'; throw error; } return { path, sha: `sha-${path}`, bytes: map.get(path) }; },
    async saveBytesVerified({ path, bytes }) { map.set(path, Uint8Array.from(bytes)); return { path, sha: `sha-${path}`, verifiedHash: `hash-${path}` }; }
  };
}

test('creates, reuses and collision-suffixes repository assets', async () => {
  const client = fakeClient({ 'docs/a.assets/image.png': [9], 'docs/a.assets/image-2.png': [1, 2] });
  const created = await api.ensureRepositoryAsset({ client, path: 'docs/a.assets/new.png', bytes: Uint8Array.from([3]) });
  assert.equal(created.status, 'created');
  const reused = await api.ensureRepositoryAsset({ client, path: 'docs/a.assets/image-2.png', bytes: Uint8Array.from([1, 2]) });
  assert.equal(reused.status, 'reused');
  const collision = await api.ensureRepositoryAsset({ client, path: 'docs/a.assets/image.png', bytes: Uint8Array.from([4]) });
  assert.equal(collision.path, 'docs/a.assets/image-3.png');
  assert.equal(collision.collision, true);
});

test('preflight plan performs no write and execution rejects a stale collision plan', async () => {
  const client = fakeClient({ 'docs/a.assets/image.png': [9] });
  let writes = 0;
  const originalSave = client.saveBytesVerified;
  client.saveBytesVerified = async (args) => { writes += 1; return originalSave(args); };
  const plan = await api.planRepositoryAsset({ client, path: 'docs/a.assets/image.png', bytes: Uint8Array.from([4]) });
  assert.equal(plan.path, 'docs/a.assets/image-2.png');
  assert.equal(plan.status, 'create');
  assert.equal(writes, 0);
  client.map.set('docs/a.assets/image-2.png', Uint8Array.from([7]));
  await assert.rejects(
    () => api.ensureRepositoryAsset({ client, path: 'docs/a.assets/image.png', bytes: Uint8Array.from([4]), expectedPlan: plan }),
    (error) => error && error.kind === 'plan_stale'
  );
  assert.equal(writes, 0);
});

test('batch preflight reserves collision-safe paths before any write', async () => {
  const client = fakeClient();
  let writes = 0;
  const originalSave = client.saveBytesVerified;
  client.saveBytesVerified = async (args) => { writes += 1; return originalSave(args); };
  const plans = await api.planRepositoryAssets({
    client,
    assets: [
      { key: 'light', path: 'docs/guide.assets/logo.png', bytes: Uint8Array.from([1]) },
      { key: 'dark', path: 'docs/guide.assets/logo.png', bytes: Uint8Array.from([2]) }
    ]
  });
  assert.deepEqual(plans.map((plan) => [plan.path, plan.status]), [
    ['docs/guide.assets/logo.png', 'create'],
    ['docs/guide.assets/logo-2.png', 'create']
  ]);
  assert.equal(writes, 0);
});

test('batch preflight collapses identical reserved bytes to one physical target', async () => {
  const client = fakeClient();
  const bytes = Uint8Array.from([1, 2, 3]);
  const plans = await api.planRepositoryAssets({
    client,
    assets: [
      { key: 'first', path: 'docs/guide.assets/logo.png', bytes },
      { key: 'second', path: 'docs/guide.assets/logo.png', bytes }
    ]
  });
  assert.equal(plans[0].status, 'create');
  assert.equal(plans[1].status, 'reused');
  assert.equal(plans[1].reserved, true);
  const first = await api.ensureRepositoryAsset({ client, path: 'docs/guide.assets/logo.png', bytes, expectedPlan: plans[0] });
  const second = await api.ensureRepositoryAsset({ client, path: 'docs/guide.assets/logo.png', bytes, expectedPlan: plans[1] });
  assert.equal(first.status, 'created');
  assert.equal(second.status, 'reused');
  assert.equal(client.map.size, 1);
});
