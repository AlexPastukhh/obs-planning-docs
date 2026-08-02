(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  class GitHubClientError extends Error {
    constructor(kind, message, details = {}) {
      super(message);
      this.name = 'GitHubClientError';
      this.kind = kind;
      this.status = details.status || 0;
      this.details = details;
    }
  }

  function normalizeGitHubContentPath(value) {
    const text = String(value == null ? '' : value).replace(/\\/g, '/').trim();
    if (!text) throw new TypeError('GitHub content path is required.');
    if (/^[a-zA-Z]:\//.test(text) || text.startsWith('/') || text.startsWith('//') || /^file:\/\//i.test(text)) {
      throw new TypeError('GitHub content path must be repository-relative.');
    }
    if (text.includes('://')) throw new TypeError('GitHub content path must not be a URL.');
    if (/[?#]/.test(text)) throw new TypeError('GitHub content path must not contain query or fragment syntax.');
    if (/[\u0000-\u001f\u007f]/.test(text)) throw new TypeError('GitHub content path contains control characters.');
    const segments = text.split('/');
    if (segments.some((segment) => !segment || segment === '.' || segment === '..')) {
      throw new TypeError('GitHub content path contains an empty, . or .. segment.');
    }
    return segments.join('/');
  }

  function utf8ToBase64(text) {
    const bytes = new TextEncoder().encode(String(text));
    let binary = '';
    const chunk = 0x8000;
    for (let index = 0; index < bytes.length; index += chunk) {
      binary += String.fromCharCode(...bytes.subarray(index, index + chunk));
    }
    if (typeof btoa === 'function') return btoa(binary);
    if (typeof Buffer !== 'undefined') return Buffer.from(bytes).toString('base64');
    throw new Error('No base64 encoder is available.');
  }

  function base64ToUtf8(value) {
    const compact = String(value || '').replace(/\s+/g, '');
    let bytes;
    if (typeof atob === 'function') {
      const binary = atob(compact);
      bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    } else if (typeof Buffer !== 'undefined') {
      bytes = Uint8Array.from(Buffer.from(compact, 'base64'));
    } else {
      throw new Error('No base64 decoder is available.');
    }
    return new TextDecoder().decode(bytes);
  }

  async function sha256Hex(text) {
    const bytes = new TextEncoder().encode(String(text));
    const cryptoObject = typeof globalThis !== 'undefined' ? globalThis.crypto : null;
    if (cryptoObject && cryptoObject.subtle) {
      const digest = await cryptoObject.subtle.digest('SHA-256', bytes);
      return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
    }
    if (typeof require === 'function') {
      return require('node:crypto').createHash('sha256').update(bytes).digest('hex');
    }
    throw new Error('SHA-256 is not available.');
  }

  function statusKind(status) {
    if (status === 401) return 'auth';
    if (status === 403) return 'permission';
    if (status === 404) return 'not_found';
    if (status === 409 || status === 422) return 'conflict';
    if (status >= 500) return 'remote_failure';
    return 'request_failed';
  }

  function parseJson(text) {
    if (!text) return null;
    try {
      return JSON.parse(text);
    } catch (error) {
      throw new GitHubClientError('invalid_response', `GitHub returned invalid JSON: ${error.message}`);
    }
  }

  function createGmTransport(gmRequest) {
    if (typeof gmRequest !== 'function') throw new TypeError('GM_xmlhttpRequest is required.');
    return function transport(request) {
      return new Promise((resolve, reject) => {
        gmRequest({
          method: request.method,
          url: request.url,
          headers: request.headers,
          data: request.body,
          timeout: request.timeoutMs || 20000,
          onload(response) {
            resolve({ status: response.status, text: response.responseText || '', headers: response.responseHeaders || '' });
          },
          ontimeout() {
            reject(new GitHubClientError('network_unknown', 'GitHub request timed out; remote state must be read before retrying.'));
          },
          onerror(error) {
            reject(new GitHubClientError('network_unknown', 'GitHub network request failed; remote state may be unknown.', { cause: error }));
          },
          onabort() {
            reject(new GitHubClientError('network_unknown', 'GitHub request was aborted; remote state may be unknown.'));
          }
        });
      });
    };
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

    _url(path, includeRef = true) {
      const normalized = normalizeGitHubContentPath(path);
      const encodedPath = normalized.split('/').map(encodeURIComponent).join('/');
      const ref = includeRef ? `?ref=${encodeURIComponent(this.branch)}` : '';
      return `${this.apiBase}/repos/${encodeURIComponent(this.owner)}/${encodeURIComponent(this.repo)}/contents/${encodedPath}${ref}`;
    }

    _rootUrl() {
      return `${this.apiBase}/repos/${encodeURIComponent(this.owner)}/${encodeURIComponent(this.repo)}/contents?ref=${encodeURIComponent(this.branch)}`;
    }

    _headers() {
      const headers = {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28'
      };
      if (this.token) headers.Authorization = `Bearer ${this.token}`;
      return headers;
    }

    async _request(method, url, body) {
      let response;
      try {
        response = await this.transport({
          method,
          url,
          headers: { ...this._headers(), ...(body ? { 'Content-Type': 'application/json' } : {}) },
          body: body ? JSON.stringify(body) : undefined,
          timeoutMs: 20000
        });
      } catch (error) {
        if (error instanceof GitHubClientError) throw error;
        throw new GitHubClientError('network_unknown', error && error.message ? error.message : 'GitHub network request failed.', { cause: error });
      }
      const payload = parseJson(response.text);
      if (response.status < 200 || response.status >= 300) {
        const message = payload && payload.message ? payload.message : `GitHub request failed with status ${response.status}.`;
        throw new GitHubClientError(statusKind(response.status), message, { status: response.status, payload });
      }
      return payload;
    }

    async read(path) {
      const normalized = normalizeGitHubContentPath(path);
      const payload = await this._request('GET', this._url(normalized, true));
      if (!payload || payload.type !== 'file' || typeof payload.content !== 'string') {
        throw new GitHubClientError('invalid_response', 'GitHub Contents response is not a file.');
      }
      return {
        path: normalizeGitHubContentPath(payload.path || normalized),
        sha: payload.sha || '',
        content: base64ToUtf8(payload.content),
        htmlUrl: payload.html_url || ''
      };
    }

    async listDirectory(path, options = {}) {
      const normalized = normalizeGitHubContentPath(path);
      const maxEntries = Number.isInteger(options.maxEntries) && options.maxEntries > 0 ? options.maxEntries : 100;
      let payload;
      try {
        payload = await this._request('GET', this._url(normalized, true));
      } catch (error) {
        if (error instanceof GitHubClientError && error.kind === 'not_found' && options.missingAsEmpty) {
          // A missing folder and an inaccessible repository/branch can both return 404.
          // Verify the repository root at the selected branch before treating the folder as empty.
          const rootPayload = await this._request('GET', this._rootUrl());
          if (!Array.isArray(rootPayload)) {
            throw new GitHubClientError('invalid_response', 'GitHub repository root response is not a directory listing.');
          }
          return [];
        }
        throw error;
      }
      if (!Array.isArray(payload)) {
        throw new GitHubClientError('invalid_response', 'GitHub Contents response is not a directory listing.');
      }
      if (payload.length > maxEntries) {
        throw new GitHubClientError('limit_exceeded', `GitHub Notes folder contains ${payload.length} entries; the explicit refresh limit is ${maxEntries}.`, {
          entryCount: payload.length,
          maxEntries
        });
      }
      return payload.map((entry) => {
        if (!entry || typeof entry !== 'object' || typeof entry.path !== 'string' || !entry.type) {
          throw new GitHubClientError('invalid_response', 'GitHub directory listing contains an invalid entry.');
        }
        const entryPath = normalizeGitHubContentPath(entry.path);
        if (!entryPath.startsWith(`${normalized}/`)) {
          throw new GitHubClientError('invalid_response', 'GitHub directory entry escaped the requested Notes folder.');
        }
        return {
          type: String(entry.type),
          path: entryPath,
          name: String(entry.name || entryPath.slice(entryPath.lastIndexOf('/') + 1)),
          sha: String(entry.sha || ''),
          size: Number.isFinite(Number(entry.size)) ? Math.max(0, Number(entry.size)) : 0,
          htmlUrl: String(entry.html_url || '')
        };
      });
    }

    async write({ path, content, baseSha = '', message }) {
      const normalized = normalizeGitHubContentPath(path);
      const body = {
        message: String(message || `Update linked Note ${normalized}`),
        content: utf8ToBase64(content),
        branch: this.branch
      };
      if (baseSha) body.sha = baseSha;
      const payload = await this._request('PUT', this._url(normalized, false), body);
      return {
        path: normalizeGitHubContentPath(payload && payload.content ? payload.content.path : normalized),
        sha: payload && payload.content ? payload.content.sha : '',
        htmlUrl: payload && payload.content ? payload.content.html_url || '' : ''
      };
    }

    async saveVerified({ path, content, baseSha = '', message }) {
      const normalized = normalizeGitHubContentPath(path);
      let writeResult;
      try {
        writeResult = await this.write({ path: normalized, content, baseSha, message });
      } catch (error) {
        if (!(error instanceof GitHubClientError) || error.kind !== 'network_unknown') throw error;
        try {
          const afterUnknown = await this.read(normalized);
          if (afterUnknown.content === content) {
            return {
              ...afterUnknown,
              verifiedHash: await sha256Hex(content),
              recoveredAfterUnknownWrite: true
            };
          }
        } catch (readError) {
          // Preserve the original unknown-write boundary.
        }
        throw error;
      }

      let readBack;
      try {
        readBack = await this.read(normalized);
      } catch (error) {
        throw new GitHubClientError('verification_unknown', 'GitHub accepted the write, but read-back verification failed. Recheck the bound remote before retrying.', {
          writeResult,
          cause: error,
          status: error && error.status ? error.status : 0
        });
      }
      if (readBack.content !== content) {
        throw new GitHubClientError('verification_mismatch', 'Remote read-back content does not match the expected Note.', {
          expectedHash: await sha256Hex(content),
          actualHash: await sha256Hex(readBack.content)
        });
      }
      return {
        path: readBack.path || writeResult.path,
        sha: readBack.sha || writeResult.sha,
        htmlUrl: readBack.htmlUrl || writeResult.htmlUrl,
        verifiedHash: await sha256Hex(content),
        recoveredAfterUnknownWrite: false
      };
    }
  }

  return {
    GitHubClientError,
    GitHubContentsClient,
    createGmTransport,
    normalizeGitHubContentPath,
    utf8ToBase64,
    base64ToUtf8,
    sha256Hex,
    statusKind
  };
});
