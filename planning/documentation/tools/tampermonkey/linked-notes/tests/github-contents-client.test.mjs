import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const api = require('../src/github-contents-client.js');

function response(status, payload) {
  return { status, text: JSON.stringify(payload) };
}

function clientWith(transport) {
  return new api.GitHubContentsClient({ owner: 'o', repo: 'r', branch: 'test', token: 'secret', transport });
}

test('read decodes UTF-8 content', async () => {
  const client = clientWith(async () => response(200, {
    type: 'file', path: 'notes/a.md', sha: 'sha-a', content: api.utf8ToBase64('Привет'), html_url: 'https://example.test/a'
  }));
  const result = await client.read('notes/a.md');
  assert.equal(result.content, 'Привет');
  assert.equal(result.sha, 'sha-a');
});

test('saveVerified writes with SHA and verifies exact read-back', async () => {
  const calls = [];
  const content = 'Hello\n';
  const client = clientWith(async (request) => {
    calls.push(request);
    if (request.method === 'PUT') {
      const body = JSON.parse(request.body);
      assert.equal(body.sha, 'base-sha');
      assert.equal(api.base64ToUtf8(body.content), content);
      return response(200, { content: { path: 'notes/a.md', sha: 'new-sha', html_url: 'https://example.test/a' } });
    }
    return response(200, { type: 'file', path: 'notes/a.md', sha: 'new-sha', content: api.utf8ToBase64(content), html_url: 'https://example.test/a' });
  });
  const result = await client.saveVerified({ path: 'notes/a.md', content, baseSha: 'base-sha', message: 'Update A' });
  assert.equal(result.sha, 'new-sha');
  assert.equal(result.recoveredAfterUnknownWrite, false);
  assert.equal(calls.length, 2);
});

test('maps conflict and permission responses', async () => {
  await assert.rejects(() => clientWith(async () => response(409, { message: 'Conflict' })).write({ path: 'a.md', content: 'x' }), (error) => error.kind === 'conflict');
  await assert.rejects(() => clientWith(async () => response(403, { message: 'Forbidden' })).read('a.md'), (error) => error.kind === 'permission');
});

test('unknown write result is recovered only when read-back matches', async () => {
  let first = true;
  const content = 'Recovered\n';
  const client = clientWith(async (request) => {
    if (request.method === 'PUT' && first) {
      first = false;
      throw new api.GitHubClientError('network_unknown', 'timeout');
    }
    return response(200, { type: 'file', path: 'notes/a.md', sha: 'sha-r', content: api.utf8ToBase64(content) });
  });
  const result = await client.saveVerified({ path: 'notes/a.md', content, message: 'Create A' });
  assert.equal(result.recoveredAfterUnknownWrite, true);
});

test('successful write followed by failed read-back reports verification_unknown', async () => {
  const client = clientWith(async (request) => {
    if (request.method === 'PUT') return response(200, { content: { path: 'notes/a.md', sha: 'new-sha' } });
    throw new api.GitHubClientError('network_unknown', 'offline');
  });
  await assert.rejects(
    () => client.saveVerified({ path: 'notes/a.md', content: 'Expected' }),
    (error) => error.kind === 'verification_unknown' && error.details.writeResult.sha === 'new-sha'
  );
});

test('read-back mismatch is explicit', async () => {
  const client = clientWith(async (request) => request.method === 'PUT'
    ? response(200, { content: { path: 'notes/a.md', sha: 'new-sha' } })
    : response(200, { type: 'file', path: 'notes/a.md', sha: 'new-sha', content: api.utf8ToBase64('Different') }));
  await assert.rejects(() => client.saveVerified({ path: 'notes/a.md', content: 'Expected' }), (error) => error.kind === 'verification_mismatch');
});

test('GitHub client independently rejects traversal and URL-like content paths', async () => {
  const client = clientWith(async () => { throw new Error('transport must not run'); });
  await assert.rejects(() => client.read('../outside.md'), /\. or \.\./);
  await assert.rejects(() => client.read('notes//a.md'), /empty/);
  await assert.rejects(() => client.write({ path: 'https://example.test/a.md', content: 'x' }), /URL/);
  assert.equal(api.normalizeGitHubContentPath('notes\\nested\\a.md'), 'notes/nested/a.md');
});
