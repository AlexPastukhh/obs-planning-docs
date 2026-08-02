(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const DEFAULT_PREVIEW_MAX_BYTES = 512 * 1024;
  const TEXT_EXTENSIONS = new Set([
    'md','markdown','txt','json','jsonc','js','mjs','cjs','ts','tsx','jsx','css','scss','less','html','htm','xml','svg',
    'yml','yaml','toml','ini','cfg','conf','env','properties','csv','tsv','sql','graphql','gql','sh','bash','zsh','fish',
    'ps1','psm1','psd1','bat','cmd','py','rb','php','java','kt','kts','go','rs','c','h','cc','cpp','hpp','cs','csproj',
    'fs','fsx','vb','sln','gradle','dockerfile','gitignore','gitattributes','editorconfig','lock'
  ]);

  function normalizeBrowserPath(value, options = {}) {
    const text = String(value == null ? '' : value).replace(/\\/g, '/').trim().replace(/^\/+|\/+$/g, '');
    if (!text && options.allowRoot !== false) return '';
    if (!text) throw new TypeError('Repository path is required.');
    if (/^[a-zA-Z]:\//.test(text) || text.startsWith('//') || /^file:\/\//i.test(text) || text.includes('://')) throw new TypeError('Repository path must be repository-relative.');
    if (/[?#]/.test(text) || /[\u0000-\u001f\u007f]/.test(text)) throw new TypeError('Repository path contains unsupported syntax.');
    const segments = text.split('/');
    if (segments.some((segment) => !segment || segment === '.' || segment === '..')) throw new TypeError('Repository path contains an empty, . or .. segment.');
    return segments.join('/');
  }

  function parentRepositoryPath(path) {
    const normalized = normalizeBrowserPath(path);
    if (!normalized) return '';
    const index = normalized.lastIndexOf('/');
    return index < 0 ? '' : normalized.slice(0, index);
  }

  function repositoryBreadcrumbs(path) {
    const normalized = normalizeBrowserPath(path);
    const result = [{ label: '/', path: '' }];
    if (!normalized) return result;
    const parts = normalized.split('/');
    let current = '';
    for (const part of parts) {
      current = current ? `${current}/${part}` : part;
      result.push({ label: part, path: current });
    }
    return result;
  }

  function buildGitHubHtmlUrl(context, path, type = 'file') {
    const owner = String(context && context.owner || '').trim();
    const repo = String(context && context.repo || '').trim();
    const branch = String(context && context.branch || '').trim();
    if (!owner || !repo || !branch) throw new TypeError('GitHub owner, repository and branch are required.');
    const normalized = normalizeBrowserPath(path);
    const encodedPath = normalized.split('/').map(encodeURIComponent).join('/');
    const mode = type === 'dir' ? 'tree' : 'blob';
    const suffix = encodedPath ? `/${encodedPath}` : '';
    return `https://github.com/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/${mode}/${encodeURIComponent(branch)}${suffix}`;
  }

  function extensionOf(name) {
    const lower = String(name || '').toLowerCase();
    const base = lower.slice(lower.lastIndexOf('/') + 1);
    if (TEXT_EXTENSIONS.has(base)) return base;
    const index = base.lastIndexOf('.');
    return index < 0 ? '' : base.slice(index + 1);
  }

  function looksBinary(text) {
    const value = String(text == null ? '' : text);
    if (value.includes('\u0000')) return true;
    const sample = value.slice(0, 8192);
    if (!sample) return false;
    let suspicious = 0;
    for (const char of sample) {
      const code = char.charCodeAt(0);
      if ((code < 9 || (code > 13 && code < 32)) && code !== 27) suspicious += 1;
    }
    return suspicious / sample.length > 0.02;
  }

  function previewLimit(options = {}) {
    return Number(options.maxBytes) > 0 ? Number(options.maxBytes) : DEFAULT_PREVIEW_MAX_BYTES;
  }
  function isPreviewTooLarge(file, options = {}) { return Number(file && file.size) > previewLimit(options); }

  function classifyFilePreview(file, options = {}) {
    const maxBytes = previewLimit(options);
    const size = Number(file && file.size) || 0;
    const path = normalizeBrowserPath(file && (file.path || file.name));
    const name = path.slice(path.lastIndexOf('/') + 1);
    if (size > maxBytes) return { kind: 'too_large', path, size, maxBytes, content: '', message: `File is ${size} bytes; preview limit is ${maxBytes}.` };
    const hasContent = file && typeof file.content === 'string';
    if (!hasContent) return { kind: 'unsupported', path, size, maxBytes, content: '', message: 'Inline text content is unavailable. Open the file on GitHub.' };
    const content = file.content;
    const extension = extensionOf(name);
    const knownText = TEXT_EXTENSIONS.has(extension) || !extension;
    if (looksBinary(content) || (!knownText && /\ufffd/.test(content))) return { kind: 'unsupported', path, size, maxBytes, content: '', message: 'Binary or unsupported file. Open it on GitHub.' };
    return { kind: 'text', path, size, maxBytes, content, message: 'Read-only repository text preview.' };
  }

  function sortRepositoryEntries(entries) {
    return [...(Array.isArray(entries) ? entries : [])].sort((left, right) => {
      const leftDir = left && left.type === 'dir' ? 0 : 1;
      const rightDir = right && right.type === 'dir' ? 0 : 1;
      if (leftDir !== rightDir) return leftDir - rightDir;
      return String(left && (left.name || left.path) || '').localeCompare(String(right && (right.name || right.path) || ''), undefined, { sensitivity: 'base' });
    });
  }

  return {
    DEFAULT_PREVIEW_MAX_BYTES,
    normalizeBrowserPath,
    parentRepositoryPath,
    repositoryBreadcrumbs,
    buildGitHubHtmlUrl,
    classifyFilePreview,
    isPreviewTooLarge,
    sortRepositoryEntries,
    looksBinary
  };
});
