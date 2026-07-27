import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const api = require('../src/workspace-context.js');

test('repository input accepts owner/repo and GitHub repository URLs', () => {
  assert.deepEqual(api.parseGitHubRepositoryInput('AlexPastukhh/gdoc'), { owner: 'AlexPastukhh', repo: 'gdoc' });
  assert.deepEqual(api.parseGitHubRepositoryInput('https://github.com/AlexPastukhh/obs-planning-docs.git/'), { owner: 'AlexPastukhh', repo: 'obs-planning-docs' });
});

test('repository input rejects non-root, non-GitHub and malformed targets', () => {
  assert.throws(() => api.parseGitHubRepositoryInput('https://example.com/a/b'), /github\.com/);
  assert.throws(() => api.parseGitHubRepositoryInput('https://github.com/a/b/issues'), /repository root/);
  assert.throws(() => api.parseGitHubRepositoryInput('only-one-part'), /owner\/repository/);
  assert.throws(() => api.parseGitHubRepositoryInput('https://github.com/a/b?tab=readme'), /query/);
});

test('workspace normalization produces reusable repository context', () => {
  const workspace = api.normalizeWorkspace({
    id: 'workspace-gdoc',
    name: 'GDoc',
    repositoryInput: 'https://github.com/AlexPastukhh/gdoc',
    branch: 'linked-notes-prototype-test',
    basePath: 'prototype-fixtures/linked-notes'
  }, '2026-07-27T00:00:00.000Z');
  assert.equal(workspace.owner, 'AlexPastukhh');
  assert.equal(workspace.repo, 'gdoc');
  assert.equal(api.workspaceTargetLabel(workspace), 'AlexPastukhh/gdoc@linked-notes-prototype-test:prototype-fixtures/linked-notes');
});

test('workspace base path preserves repository-relative safety', () => {
  assert.equal(api.cleanWorkspaceBasePath('notes\\nested'), 'notes/nested');
  assert.throws(() => api.cleanWorkspaceBasePath('../notes'), /\. or \.\./);
  assert.throws(() => api.cleanWorkspaceBasePath('notes//nested'), /empty/);
  assert.throws(() => api.cleanWorkspaceBasePath('https://github.com/a/b'), /URL/);
});

test('chat key uses the stable conversation route and ignores a new-chat route', () => {
  assert.equal(api.chatKeyFromLocation({ pathname: '/c/abc-123' }), 'chat:abc-123');
  assert.equal(api.chatKeyFromLocation({ pathname: '/g/g-foo/c/conversation-id' }), 'chat:conversation-id');
  assert.equal(api.chatKeyFromLocation({ pathname: '/' }), '');
  assert.equal(api.chatKeyFromLocation({ pathname: '/new' }), '');
});
