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

  function base64ToUtf8(value) {
    const compact = String(value || '').replace(/\s+/g, '');
    let bytes;
    if (typeof atob === 'function') bytes = Uint8Array.from(atob(compact), (char) => char.charCodeAt(0));
    else if (typeof Buffer !== 'undefined') bytes = Uint8Array.from(Buffer.from(compact, 'base64'));
    else throw new Error('No base64 decoder available.');
    try { return new TextDecoder('utf-8', { fatal:true }).decode(bytes); }
    catch (error) { throw new GitHubClientError('invalid_utf8', 'Repository text is not valid UTF-8.', { cause:error }); }
  }

  function statusKind(status) {
    if (status === 401) return 'auth'; if (status === 403) return 'permission'; if (status === 404) return 'not_found'; if (status === 409 || status === 422) return 'conflict'; if (status >= 500) return 'remote_failure'; return 'request_failed';
  }

  function createGmTransport(gmRequest) {
    if (typeof gmRequest !== 'function') throw new TypeError('GM_xmlhttpRequest is required.');
    return (request) => new Promise((resolve, reject) => gmRequest({
      method: request.method, url: request.url, headers: request.headers, data: request.body, timeout: request.timeoutMs || 20000,
      onload: (response) => resolve({ status: response.status, text: response.responseText || '' }),
      ontimeout: () => reject(new GitHubClientError('network_unknown', 'GitHub request timed out; remote state must be read before retrying.')),
      onerror: (error) => reject(new GitHubClientError('network_unknown', 'GitHub request failed; remote state may be unknown.', { cause: error })),
      onabort: () => reject(new GitHubClientError('network_unknown', 'GitHub request aborted; remote state may be unknown.'))
    }));
  }

  class GitHubContentsClient {
    constructor(options = {}) {
      this.owner = String(options.owner || '').trim(); this.repo = String(options.repo || '').trim(); this.branch = String(options.branch || 'main').trim(); this.token = String(options.token || '').trim(); this.transport = options.transport; this.apiBase = String(options.apiBase || 'https://api.github.com').replace(/\/$/, '');
      if (!this.owner || !this.repo || !this.branch) throw new TypeError('GitHub owner, repo and branch are required.');
      if (typeof this.transport !== 'function') throw new TypeError('GitHub transport is required.');
    }
    _url(path, withRef = true) { const normalized = normalizeGitHubContentPath(path); const encoded = normalized.split('/').map(encodeURIComponent).join('/'); return `${this.apiBase}/repos/${encodeURIComponent(this.owner)}/${encodeURIComponent(this.repo)}/contents/${encoded}${withRef ? `?ref=${encodeURIComponent(this.branch)}` : ''}`; }
    _headers() { const headers = { Accept:'application/vnd.github+json', 'X-GitHub-Api-Version':'2022-11-28' }; if (this.token) headers.Authorization = `Bearer ${this.token}`; return headers; }
    async _request(method, url, body) {
      let response;
      try { response = await this.transport({ method, url, headers:{ ...this._headers(), ...(body ? {'Content-Type':'application/json'} : {}) }, body: body ? JSON.stringify(body) : undefined, timeoutMs:20000 }); }
      catch (error) { if (error instanceof GitHubClientError) throw error; throw new GitHubClientError('network_unknown', error && error.message ? error.message : 'GitHub network request failed.', { cause:error }); }
      let payload = null; try { payload = response.text ? JSON.parse(response.text) : null; } catch (error) { throw new GitHubClientError('invalid_response', `GitHub returned invalid JSON: ${error.message}`); }
      if (response.status < 200 || response.status >= 300) throw new GitHubClientError(statusKind(response.status), payload && payload.message ? payload.message : `GitHub request failed with status ${response.status}.`, { status:response.status, payload });
      return payload;
    }
    async listDirectory(path) {
      const normalized = normalizeGitHubContentPath(path); const payload = await this._request('GET', this._url(normalized, true)); if (!Array.isArray(payload)) throw new GitHubClientError('invalid_response','GitHub Contents response is not a directory listing.');
      if (payload.length > 200) throw new GitHubClientError('limit_exceeded', 'GitHub directory contains more than 200 direct entries.');
      return payload.map((entry) => { const entryPath=normalizeGitHubContentPath(entry.path); if (!entryPath.startsWith(`${normalized}/`) || entryPath.slice(normalized.length+1).includes('/')) throw new GitHubClientError('invalid_response','GitHub directory returned an entry outside the requested direct-child scope.'); return { type:String(entry.type || ''), path:entryPath, name:String(entry.name || ''), sha:String(entry.sha || ''), size:Number(entry.size || 0), htmlUrl:String(entry.html_url || '') }; });
    }
    async read(path) {
      const normalized = normalizeGitHubContentPath(path); const payload = await this._request('GET', this._url(normalized, true)); if (!payload || payload.type !== 'file' || typeof payload.content !== 'string') throw new GitHubClientError('invalid_response','GitHub Contents response is not a UTF-8 file.');
      return { path:normalizeGitHubContentPath(payload.path || normalized), sha:String(payload.sha || ''), content:base64ToUtf8(payload.content), htmlUrl:String(payload.html_url || '') };
    }
    async write({ path, content, baseSha = '', message }) {
      const normalized = normalizeGitHubContentPath(path); const body = { message:String(message || `Update ${normalized}`), content:utf8ToBase64(content), branch:this.branch }; if (baseSha) body.sha = baseSha;
      const payload = await this._request('PUT', this._url(normalized, false), body); return { path:normalizeGitHubContentPath(payload && payload.content ? payload.content.path : normalized), sha:String(payload && payload.content ? payload.content.sha || '' : ''), htmlUrl:String(payload && payload.content ? payload.content.html_url || '' : '') };
    }
    async saveVerified({ path, content, baseSha = '', message }) {
      const normalized = normalizeGitHubContentPath(path); let writeResult;
      try { writeResult = await this.write({ path:normalized, content, baseSha, message }); }
      catch (error) {
        if (!(error instanceof GitHubClientError) || error.kind !== 'network_unknown') throw error;
        try { const after = await this.read(normalized); if (after.content === content) return { ...after, recoveredAfterUnknownWrite:true }; } catch (_) {}
        throw error;
      }
      let readBack; try { readBack = await this.read(normalized); } catch (error) { throw new GitHubClientError('verification_unknown','GitHub accepted the write, but read-back verification failed.', { cause:error, writeResult }); }
      if (readBack.content !== content) throw new GitHubClientError('verification_mismatch','Remote read-back content does not match the intended repository file.', { writeResult });
      return { ...readBack, recoveredAfterUnknownWrite:false };
    }
  }

  return { GitHubClientError, GitHubContentsClient, createGmTransport, normalizeGitHubContentPath, utf8ToBase64, base64ToUtf8, statusKind };
});
