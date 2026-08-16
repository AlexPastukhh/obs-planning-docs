(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsPlanningHelper = Object.assign(root.ObsPlanningHelper || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  class GitHubClientError extends Error {
    constructor(kind, message, details = {}) { super(message); this.name = 'GitHubClientError'; this.kind = kind; this.status = details.status || 0; this.details = details; }
  }

  function normalizeGitHubContentPath(value) {
    const text = String(value == null ? '' : value).replace(/\\/g, '/').trim();
    if (!text) throw new TypeError('GitHub content path is required.');
    if (/^[a-zA-Z]:\//.test(text) || text.startsWith('/') || text.startsWith('//') || text.includes('://') || /[?#]/.test(text)) throw new TypeError('GitHub content path must be repository-relative.');
    const parts = text.split('/');
    if (parts.some((part) => !part || part === '.' || part === '..')) throw new TypeError('GitHub content path contains an invalid segment.');
    return parts.join('/');
  }

  function utf8ToBase64(text) {
    const bytes = new TextEncoder().encode(String(text));
    let binary = '';
    for (let i = 0; i < bytes.length; i += 0x8000) binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
    if (typeof btoa === 'function') return btoa(binary);
    if (typeof Buffer !== 'undefined') return Buffer.from(bytes).toString('base64');
    throw new Error('No base64 encoder available.');
  }

  function statusKind(status) {
    if (status === 401) return 'auth';
    if (status === 403) return 'permission';
    if (status === 404) return 'not_found';
    if (status === 409 || status === 422) return 'conflict';
    if (status >= 500) return 'remote_failure';
    return 'request_failed';
  }

  function createGmTransport(gmRequest) {
    if (typeof gmRequest !== 'function') throw new TypeError('GM_xmlhttpRequest is required.');
    return (request) => new Promise((resolve, reject) => gmRequest({
      method: request.method,
      url: request.url,
      headers: request.headers,
      data: request.body,
      timeout: request.timeoutMs || 20000,
      onload: (response) => resolve({ status: response.status, text: response.responseText || '' }),
      ontimeout: () => reject(new GitHubClientError('network_unknown', 'GitHub create request timed out; remote creation state is unknown. The Planning Helper will not read GitHub to resolve it.')),
      onerror: (error) => reject(new GitHubClientError('network_unknown', 'GitHub create request failed; remote creation state may be unknown. The Planning Helper will not read GitHub to resolve it.', { cause:error })),
      onabort: () => reject(new GitHubClientError('network_unknown', 'GitHub create request was aborted; remote creation state may be unknown. The Planning Helper will not read GitHub to resolve it.'))
    }));
  }

  class GitHubContentsClient {
    constructor(options = {}) {
      this.owner = String(options.owner || '').trim();
      this.repo = String(options.repo || '').trim();
      this.branch = String(options.branch || 'main').trim();
      this.token = String(options.token || '').trim();
      this.transport = options.transport;
      this.apiBase = String(options.apiBase || 'https://api.github.com').replace(/\/$/, '');
      if (!this.owner || !this.repo || !this.branch) throw new TypeError('GitHub owner, repo and branch are required.');
      if (typeof this.transport !== 'function') throw new TypeError('GitHub transport is required.');
    }
    _url(path) {
      const normalized = normalizeGitHubContentPath(path);
      const encoded = normalized.split('/').map(encodeURIComponent).join('/');
      return `${this.apiBase}/repos/${encodeURIComponent(this.owner)}/${encodeURIComponent(this.repo)}/contents/${encoded}`;
    }
    _headers() {
      const headers = { Accept:'application/vnd.github+json', 'X-GitHub-Api-Version':'2022-11-28' };
      if (this.token) headers.Authorization = `Bearer ${this.token}`;
      return headers;
    }
    async _putCreateOnly(url, body) {
      let response;
      try {
        response = await this.transport({ method:'PUT', url, headers:{ ...this._headers(), 'Content-Type':'application/json' }, body:JSON.stringify(body), timeoutMs:20000 });
      } catch (error) {
        if (error instanceof GitHubClientError) throw error;
        throw new GitHubClientError('network_unknown', error && error.message ? error.message : 'GitHub create request failed.', { cause:error });
      }
      let payload = null;
      try { payload = response.text ? JSON.parse(response.text) : null; }
      catch (error) { throw new GitHubClientError('invalid_response', `GitHub returned invalid JSON: ${error.message}`); }
      if (response.status < 200 || response.status >= 300) throw new GitHubClientError(statusKind(response.status), payload && payload.message ? payload.message : `GitHub create request failed with status ${response.status}.`, { status:response.status, payload });
      return payload;
    }
    async create({ path, content, message }) {
      const normalized = normalizeGitHubContentPath(path);
      const payload = await this._putCreateOnly(this._url(normalized), { message:String(message || `Add ${normalized}`), content:utf8ToBase64(content), branch:this.branch });
      const returnedPath = payload && payload.content ? normalizeGitHubContentPath(payload.content.path || normalized) : normalized;
      if (returnedPath !== normalized) throw new GitHubClientError('invalid_response', `GitHub create response changed path (${normalized} -> ${returnedPath}).`);
      return { path:normalized, sha:String(payload && payload.content ? payload.content.sha || '' : ''), htmlUrl:String(payload && payload.content ? payload.content.html_url || '' : '') };
    }
  }

  return { GitHubClientError, GitHubContentsClient, createGmTransport, normalizeGitHubContentPath, utf8ToBase64, statusKind };
});
