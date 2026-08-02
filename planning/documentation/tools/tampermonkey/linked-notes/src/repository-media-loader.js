(function (root, factory) {
  const api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function (root) {
  'use strict';

  const DEFAULT_MEDIA_MAX_BYTES = 5 * 1024 * 1024;
  const MIME_BY_EXTENSION = Object.freeze({ png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', gif: 'image/gif', webp: 'image/webp', svg: 'image/svg+xml', avif: 'image/avif' });
  function cleanPath(value) { return String(value == null ? '' : value).replace(/\\/g, '/').trim(); }
  function isExternal(value) { try { const parsed = new URL(String(value || '')); return parsed.protocol === 'http:' || parsed.protocol === 'https:'; } catch (error) { return false; } }
  function fallbackDecodeRepositoryMarkdownPath(value) {
    const text = cleanPath(value);
    if (!text) return '';
    if (/%(?![0-9A-Fa-f]{2})/.test(text)) throw new Error(`Repository Markdown target has invalid percent encoding: ${text}`);
    const rootRelative = text.startsWith('/');
    const rawParts = text.split('/');
    const decoded = [];
    for (let index = 0; index < rawParts.length; index += 1) {
      const raw = rawParts[index];
      if (!raw) {
        if (index === 0 && rootRelative) continue;
        throw new Error('Repository Markdown target contains an empty path segment.');
      }
      if (raw === '.' || raw === '..') { decoded.push(raw); continue; }
      let segment;
      try { segment = decodeURIComponent(raw); }
      catch (error) { throw new Error(`Repository Markdown target has invalid percent encoding: ${text}`); }
      if (!segment || segment === '.' || segment === '..') throw new Error(`Repository Markdown target contains encoded traversal: ${text}`);
      if (/[\/?#\u0000-\u001f\u007f]/.test(segment)) throw new Error(`Repository Markdown target contains an invalid decoded path segment: ${text}`);
      decoded.push(segment);
    }
    const result = decoded.join('/');
    if (!result) throw new Error('Repository Markdown target path is empty.');
    return `${rootRelative ? '/' : ''}${result}`;
  }
  function decodeRepositoryMarkdownPath(value) {
    const shared = root && root.ObsLinkedNotes && root.ObsLinkedNotes.decodeRepositoryMarkdownPath;
    return typeof shared === 'function' ? shared(value) : fallbackDecodeRepositoryMarkdownPath(value);
  }
  function resolveRepositoryMediaPath(sourcePath, target) {
    const input = cleanPath(target);
    if (!input || /[?#\u0000-\u001f\u007f]/.test(input) || input.includes('://') || /^[a-zA-Z]:\//.test(input)) throw new TypeError('Repository image path must be a portable repository-relative path.');
    const raw = decodeRepositoryMarkdownPath(input);
    const base = raw.startsWith('/') ? [] : cleanPath(sourcePath).split('/').slice(0, -1);
    const pieces = raw.replace(/^\/+/, '').split('/');
    const out = [...base];
    for (const piece of pieces) {
      if (!piece || piece === '.') continue;
      if (piece === '..') { if (!out.length) throw new TypeError('Repository image path escapes the repository.'); out.pop(); }
      else out.push(piece);
    }
    if (!out.length) throw new TypeError('Repository image path is empty.');
    return out.join('/');
  }
  function mimeForPath(path, declared = '') {
    const value = String(declared || '').toLowerCase().split(';')[0].trim();
    if (value && value.startsWith('image/')) return value;
    const name = cleanPath(path).slice(cleanPath(path).lastIndexOf('/') + 1);
    const extension = name.includes('.') ? name.slice(name.lastIndexOf('.') + 1).toLowerCase() : '';
    return MIME_BY_EXTENSION[extension] || '';
  }

  class RepositoryMediaLoader {
    constructor(options = {}) {
      this.readBytes = options.readBytes;
      this.createObjectUrl = options.createObjectUrl || ((blob) => URL.createObjectURL(blob));
      this.revokeObjectUrl = options.revokeObjectUrl || ((url) => URL.revokeObjectURL(url));
      this.maxBytes = Number(options.maxBytes) > 0 ? Number(options.maxBytes) : DEFAULT_MEDIA_MAX_BYTES;
      this.urls = new Set();
      if (typeof this.readBytes !== 'function') throw new TypeError('readBytes callback is required.');
    }
    async load(resource, context = {}) {
      if (!resource || resource.type !== 'image') throw new TypeError('Image resource is required.');
      if (resource.external || isExternal(resource.target)) return { id: resource.id, status: 'external_blocked', target: resource.target, message: 'External image loading requires an explicit action.' };
      const path = resolveRepositoryMediaPath(context.sourcePath, resource.target);
      const result = await this.readBytes(path, { maxBytes: this.maxBytes });
      const bytes = result && result.bytes instanceof Uint8Array ? result.bytes : Uint8Array.from(result && result.bytes || []);
      if (bytes.byteLength > this.maxBytes) throw new Error(`Repository image is ${bytes.byteLength} bytes; media limit is ${this.maxBytes}.`);
      const mime = mimeForPath(path, result && result.contentType);
      if (!mime) throw new Error(`Unsupported repository image format: ${path}`);
      const blob = new Blob([bytes], { type: mime });
      const objectUrl = this.createObjectUrl(blob);
      this.urls.add(objectUrl);
      return { id: resource.id, status: 'loaded', path, objectUrl, mime, size: bytes.byteLength, htmlUrl: result && result.htmlUrl || '' };
    }
    async loadAll(resources, context = {}) {
      const results = [];
      for (const resource of Array.isArray(resources) ? resources : []) {
        try { results.push(await this.load(resource, context)); }
        catch (error) { results.push({ id: resource && resource.id || '', status: 'error', target: resource && resource.target || '', message: String(error && error.message || error) }); }
      }
      return results;
    }
    dispose() {
      for (const url of this.urls) { try { this.revokeObjectUrl(url); } catch (error) { /* ignore cleanup */ } }
      this.urls.clear();
    }
  }

  return { DEFAULT_MEDIA_MAX_BYTES, RepositoryMediaLoader, resolveRepositoryMediaPath, repositoryImageMimeForPath: mimeForPath };
});
