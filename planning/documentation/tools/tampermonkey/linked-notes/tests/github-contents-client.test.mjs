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


test('listDirectory returns validated direct entries and never performs writes', async () => {
  const calls = [];
  const client = clientWith(async (request) => {
    calls.push(request);
    return response(200, [
      { type: 'file', path: 'notes/a.md', name: 'a.md', sha: 'sha-a', size: 42, html_url: 'https://example.test/a' },
      { type: 'dir', path: 'notes/nested', name: 'nested', sha: 'sha-dir', size: 0 }
    ]);
  });
  const result = await client.listDirectory('notes');
  assert.deepEqual(result.map((entry) => [entry.type, entry.path]), [['file', 'notes/a.md'], ['dir', 'notes/nested']]);
  assert.deepEqual(calls.map((call) => call.method), ['GET']);
});

test('listDirectory treats a missing Notes folder as empty only after the selected branch root is readable', async () => {
  const calls = [];
  const client = clientWith(async (request) => {
    calls.push(request.url);
    if (request.url.includes('/contents/notes')) return response(404, { message: 'Not Found' });
    return response(200, [{ type: 'file', path: 'README.md', name: 'README.md' }]);
  });
  assert.deepEqual(await client.listDirectory('notes', { missingAsEmpty: true }), []);
  assert.equal(calls.length, 2);
  await assert.rejects(() => client.listDirectory('notes'), (error) => error.kind === 'not_found');
});

test('listDirectory does not hide an inaccessible repository or branch behind an empty-folder result', async () => {
  const client = clientWith(async () => response(404, { message: 'Not Found' }));
  await assert.rejects(() => client.listDirectory('notes', { missingAsEmpty: true }), (error) => error.kind === 'not_found');
});

test('listDirectory rejects file payloads, escaped entries and excessive folders', async () => {
  await assert.rejects(
    () => clientWith(async () => response(200, { type: 'file', path: 'notes/a.md' })).listDirectory('notes'),
    (error) => error.kind === 'invalid_response'
  );
  await assert.rejects(
    () => clientWith(async () => response(200, [{ type: 'file', path: 'outside/a.md', name: 'a.md' }])).listDirectory('notes'),
    (error) => error.kind === 'invalid_response'
  );
  await assert.rejects(
    () => clientWith(async () => response(200, [{ type: 'file', path: 'notes/a.md', name: 'a.md' }, { type: 'file', path: 'notes/b.md', name: 'b.md' }])).listDirectory('notes', { maxEntries: 1 }),
    (error) => error.kind === 'limit_exceeded'
  );
});

test('listDirectory supports repository root and rejects non-direct root entries', async () => {
  const urls = [];
  const client = clientWith(async (request) => {
    urls.push(request.url);
    return response(200, [
      { type: 'file', path: 'README.md', name: 'README.md', size: 10 },
      { type: 'dir', path: 'docs', name: 'docs', size: 0 }
    ]);
  });
  const result = await client.listDirectory('');
  assert.deepEqual(result.map((entry) => entry.path), ['README.md', 'docs']);
  assert.match(urls[0], /\/contents\?ref=test$/);

  await assert.rejects(
    () => clientWith(async () => response(200, [{ type: 'file', path: 'docs/a.md', name: 'a.md' }])).listDirectory(''),
    (error) => error.kind === 'invalid_response'
  );
});

test('read returns file name, size and download metadata for preview policy', async () => {
  const client = clientWith(async () => response(200, {
    type: 'file', path: 'docs/a.md', name: 'a.md', size: 17, sha: 'sha-a',
    content: api.utf8ToBase64('content'), html_url: 'https://example.test/a', download_url: 'https://raw.example.test/a'
  }));
  const result = await client.read('docs/a.md');
  assert.equal(result.name, 'a.md');
  assert.equal(result.size, 17);
  assert.equal(result.downloadUrl, 'https://raw.example.test/a');
});

test('readMetadata accepts file payload without inline content', async () => {
  const client = clientWith(async () => response(200, {
    type: 'file', path: 'large.bin', name: 'large.bin', size: 900000, sha: 'sha-large', html_url: 'https://example.test/large'
  }));
  const result = await client.readMetadata('large.bin');
  assert.equal(result.path, 'large.bin');
  assert.equal(result.size, 900000);
  assert.equal(result.contentAvailable, false);
});

test('read can return metadata-only result only when explicitly allowed', async () => {
  const client = clientWith(async () => response(200, {
    type: 'file', path: 'large.md', name: 'large.md', size: 900000, sha: 'sha-large', html_url: 'https://example.test/large'
  }));
  await assert.rejects(() => client.read('large.md'), (error) => error.kind === 'content_unavailable');
  const result = await client.read('large.md', { allowMissingContent: true });
  assert.equal(result.content, null);
  assert.equal(result.contentAvailable, false);
});

test('readMetadata does not decode inline file content', async () => {
  const client = clientWith(async () => response(200, {
    type: 'file', path: 'docs/a.md', name: 'a.md', size: 12, sha: 'sha-a', content: '%%%not-base64%%%', html_url: 'https://example.test/a'
  }));
  const result = await client.readMetadata('docs/a.md');
  assert.equal(result.path, 'docs/a.md');
  assert.equal(result.contentAvailable, true);
});


test('readBytes performs authenticated bounded binary fetch without placing token in the URL', async () => {
  const calls = [];
  const client = clientWith(async (request) => {
    calls.push(request);
    if (request.responseType === 'arraybuffer') return { status: 200, text: '', response: Uint8Array.from([1, 2, 3]).buffer };
    return response(200, { type: 'file', path: 'assets/a.png', name: 'a.png', size: 3, sha: 'sha-image', html_url: 'https://example.test/a.png' });
  });
  const result = await client.readBytes('assets/a.png', { maxBytes: 10 });
  assert.deepEqual([...result.bytes], [1, 2, 3]);
  assert.equal(calls.length, 2);
  assert.ok(calls.every((call) => call.headers.Authorization === 'Bearer secret'));
  assert.ok(calls.every((call) => !call.url.includes('secret')));
  assert.equal(calls[1].responseType, 'arraybuffer');
});


test('saveBytesVerified preserves exact binary bytes and verifies read-back', async () => {
  const expected = Uint8Array.from([0, 255, 1, 2, 200]);
  const calls = [];
  const client = clientWith(async (request) => {
    calls.push(request);
    if (request.method === 'PUT') {
      const body = JSON.parse(request.body);
      assert.deepEqual([...api.base64ToBytes(body.content)], [...expected]);
      return response(200, { content: { path: 'assets/a.png', sha: 'sha-new', html_url: 'https://example.test/a.png' } });
    }
    if (request.responseType === 'arraybuffer') return { status: 200, text: '', response: expected.buffer.slice(0) };
    return response(200, { type: 'file', path: 'assets/a.png', name: 'a.png', size: expected.length, sha: 'sha-new', html_url: 'https://example.test/a.png' });
  });
  const result = await client.saveBytesVerified({ path: 'assets/a.png', bytes: expected, message: 'Add image' });
  assert.equal(result.sha, 'sha-new');
  assert.equal(result.verifiedHash, await api.sha256Bytes(expected));
  assert.equal(calls.filter((call) => call.method === 'PUT').length, 1);
});

test('saveBytesVerified reports byte mismatch', async () => {
  const client = clientWith(async (request) => {
    if (request.method === 'PUT') return response(200, { content: { path: 'assets/a.png', sha: 'sha-new' } });
    if (request.responseType === 'arraybuffer') return { status: 200, text: '', response: Uint8Array.from([9]).buffer };
    return response(200, { type: 'file', path: 'assets/a.png', size: 1, sha: 'sha-new' });
  });
  await assert.rejects(() => client.saveBytesVerified({ path: 'assets/a.png', bytes: Uint8Array.from([1]) }), (error) => error.kind === 'verification_mismatch');
});

test('strict UTF-8 decoding rejects replacement-character mutation risk', () => {
  const invalid = Uint8Array.from([0x66, 0x6f, 0x80, 0x6f]);
  assert.throws(() => api.decodeUtf8Bytes(invalid, { fatal: true }), (error) => error && error.kind === 'invalid_utf8');
  assert.equal(api.decodeUtf8Bytes(invalid), 'fo�o');
});
