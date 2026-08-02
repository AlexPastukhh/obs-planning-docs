(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const DEFAULT_WORKSPACE_BASE_PATH = 'prototype-fixtures/linked-notes';
  const DEFAULT_CATEGORY_BASE_PATH = 'categories';

  function normalizeString(value) {
    return typeof value === 'string' ? value : '';
  }

  function nowIso(now) {
    return (now instanceof Date ? now : new Date(now || Date.now())).toISOString();
  }

  function createWorkspaceId() {
    const cryptoObject = typeof globalThis !== 'undefined' ? globalThis.crypto : null;
    const value = cryptoObject && typeof cryptoObject.randomUUID === 'function'
      ? cryptoObject.randomUUID()
      : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
    return `workspace-${value}`;
  }

  function cleanWorkspaceBasePath(value) {
    const text = normalizeString(value).replace(/\\/g, '/').trim() || DEFAULT_WORKSPACE_BASE_PATH;
    if (/^[a-zA-Z]:\//.test(text) || text.startsWith('/') || text.startsWith('//') || /^file:\/\//i.test(text)) {
      throw new TypeError('GitHub base path must be repository-relative.');
    }
    if (text.includes('://')) throw new TypeError('GitHub base path must not be a URL.');
    if (/[?#]/.test(text)) throw new TypeError('GitHub base path must not contain query or fragment syntax.');
    if (/[\u0000-\u001f\u007f]/.test(text)) throw new TypeError('GitHub base path contains control characters.');
    const parts = text.split('/');
    if (parts.some((segment) => !segment || segment === '.' || segment === '..')) {
      throw new TypeError('GitHub base path contains an empty, . or .. segment.');
    }
    return parts.join('/');
  }

  function validateOwner(owner) {
    const text = normalizeString(owner).trim();
    if (!/^[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})$/.test(text) || text.endsWith('-')) {
      throw new TypeError('GitHub owner must be a user or organization name.');
    }
    return text;
  }

  function validateRepo(repo) {
    const text = normalizeString(repo).trim().replace(/\.git$/i, '');
    if (!text || text.length > 100 || !/^[A-Za-z0-9._-]+$/.test(text)) {
      throw new TypeError('GitHub repository name is invalid.');
    }
    return text;
  }

  function parseGitHubRepositoryInput(value) {
    const raw = normalizeString(value).trim();
    if (!raw) throw new TypeError('Repository is required. Use owner/repository or a GitHub repository URL.');
    let owner = '';
    let repo = '';
    if (/^https?:\/\//i.test(raw)) {
      let parsed;
      try { parsed = new URL(raw); } catch (error) { throw new TypeError('Repository URL is invalid.'); }
      if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') throw new TypeError('Repository URL must use HTTP(S).');
      if (parsed.hostname.toLowerCase() !== 'github.com') throw new TypeError('Only github.com repository URLs are supported.');
      if (parsed.search || parsed.hash) throw new TypeError('Repository URL must not contain query or fragment data.');
      const parts = parsed.pathname.split('/').filter(Boolean);
      if (parts.length !== 2) throw new TypeError('Repository URL must point to one GitHub repository root.');
      [owner, repo] = parts;
    } else {
      const compact = raw.replace(/^github\.com\//i, '').replace(/^\/+|\/+$/g, '');
      const parts = compact.split('/');
      if (parts.length !== 2) throw new TypeError('Repository must use owner/repository format.');
      [owner, repo] = parts;
    }
    return { owner: validateOwner(owner), repo: validateRepo(repo) };
  }

  function normalizeWorkspace(input = {}, now) {
    const repositoryInput = normalizeString(input.repositoryInput || input.repository || '').trim();
    let owner = normalizeString(input.owner).trim();
    let repo = normalizeString(input.repo).trim();
    if (repositoryInput) ({ owner, repo } = parseGitHubRepositoryInput(repositoryInput));
    else {
      owner = validateOwner(owner);
      repo = validateRepo(repo);
    }
    const timestamp = nowIso(now);
    const id = normalizeString(input.id).trim() || createWorkspaceId();
    const createdAt = normalizeString(input.createdAt) || timestamp;
    return {
      id,
      name: normalizeString(input.name).trim() || `${owner}/${repo}`,
      owner,
      repo,
      branch: normalizeString(input.branch).trim() || 'main',
      basePath: cleanWorkspaceBasePath(input.basePath),
      categoryBasePath: cleanWorkspaceBasePath(input.categoryBasePath || DEFAULT_CATEGORY_BASE_PATH),
      createdAt,
      updatedAt: normalizeString(input.updatedAt) || timestamp,
      schemaVersion: 1
    };
  }

  function workspaceRepositoryLabel(workspace) {
    if (!workspace) return '';
    return `${normalizeString(workspace.owner).trim()}/${normalizeString(workspace.repo).trim()}`;
  }

  function workspaceTargetLabel(workspace) {
    if (!workspace || !workspace.owner || !workspace.repo || !workspace.branch || !workspace.basePath) return '';
    return `${workspace.owner}/${workspace.repo}@${workspace.branch}:notes=${workspace.basePath}; categories=${workspace.categoryBasePath || DEFAULT_CATEGORY_BASE_PATH}`;
  }


  function workspaceCategoryContextKey(workspace) {
    if (!workspace || !normalizeString(workspace.id).trim()) throw new TypeError('Workspace id is required for category context.');
    const owner = validateOwner(workspace.owner).toLowerCase();
    const repo = validateRepo(workspace.repo).toLowerCase();
    const branch = normalizeString(workspace.branch).trim() || 'main';
    if (/\r|\n|[\u0000-\u001f\u007f]/.test(branch)) throw new TypeError('GitHub branch is invalid.');
    const categoryBasePath = cleanWorkspaceBasePath(workspace.categoryBasePath || DEFAULT_CATEGORY_BASE_PATH);
    return JSON.stringify([normalizeString(workspace.id).trim(), owner, repo, branch, categoryBasePath]);
  }

  function sameRepositoryContext(left, right) {
    if (!left || !right) return false;
    return normalizeString(left.owner).trim().toLowerCase() === normalizeString(right.owner).trim().toLowerCase()
      && normalizeString(left.repo).trim().replace(/\.git$/i, '').toLowerCase() === normalizeString(right.repo).trim().replace(/\.git$/i, '').toLowerCase()
      && (normalizeString(left.branch).trim() || 'main') === (normalizeString(right.branch).trim() || 'main');
  }

  function chatKeyFromLocation(locationLike) {
    const pathname = normalizeString(locationLike && locationLike.pathname).trim();
    if (!pathname) return '';
    const parts = pathname.split('/').filter(Boolean);
    for (let index = parts.length - 2; index >= 0; index -= 1) {
      if (parts[index] === 'c' && parts[index + 1]) {
        try { return `chat:${decodeURIComponent(parts[index + 1])}`; }
        catch (error) { return `chat:${parts[index + 1]}`; }
      }
    }
    return '';
  }

  return {
    DEFAULT_WORKSPACE_BASE_PATH,
    DEFAULT_CATEGORY_BASE_PATH,
    createWorkspaceId,
    cleanWorkspaceBasePath,
    parseGitHubRepositoryInput,
    normalizeWorkspace,
    workspaceRepositoryLabel,
    workspaceTargetLabel,
    workspaceCategoryContextKey,
    sameRepositoryContext,
    chatKeyFromLocation
  };
});
