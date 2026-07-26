(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  function isPortableUrl(value) {
    try {
      const parsed = new URL(String(value));
      return parsed.protocol === 'https:' || parsed.protocol === 'http:';
    } catch (error) {
      return false;
    }
  }

  function isMachineLocalAbsolutePath(value) {
    const text = String(value || '').trim();
    return /^[a-zA-Z]:[\\/]/.test(text)
      || /^\\\\/.test(text)
      || /^file:\/\//i.test(text)
      || text.startsWith('/');
  }

  function splitTarget(value) {
    const raw = String(value || '').trim();
    if (isPortableUrl(raw)) return { kind: 'url', url: raw };
    const hashIndex = raw.indexOf('#');
    return {
      kind: 'repository',
      path: hashIndex === -1 ? raw : raw.slice(0, hashIndex),
      anchor: hashIndex === -1 ? '' : raw.slice(hashIndex + 1)
    };
  }

  function assertPathSyntax(value, { allowEmpty = false, allowRelativeSegments = false, label = 'Repository path' } = {}) {
    const text = String(value == null ? '' : value).replace(/\\/g, '/').trim();
    if (!text) {
      if (allowEmpty) return '';
      throw new Error(`${label} is required.`);
    }
    if (isMachineLocalAbsolutePath(text)) {
      throw new Error('Machine-local or absolute paths are not portable repository targets.');
    }
    if (isPortableUrl(text) || text.includes('://')) throw new Error(`${label} must not be a URL.`);
    if (/[?#]/.test(text)) throw new Error(`${label} must not contain query or fragment syntax.`);
    if(/[\u0000-\u001f\u007f]/.test(text)) throw new Error(`${label} contains control characters.`);
    const parts = text.split('/');
    if (parts.some((segment) => segment === '')) throw new Error(`${label} contains an empty path segment.`);
    if (!allowRelativeSegments && parts.some((segment) => segment === '.' || segment === '..')) {
      throw new Error(`${label} must not contain . or .. segments.`);
    }
    return text;
  }

  function normalizeCanonicalRepositoryPath(value, label = 'Repository path') {
    return assertPathSyntax(value, { label });
  }

  function normalizeSegments(parts) {
    const result = [];
    for (const segment of parts) {
      if (!segment || segment === '.') continue;
      if (segment === '..') {
        if (!result.length) throw new Error('Repository target escapes the repository root.');
        result.pop();
      } else {
        result.push(segment);
      }
    }
    return result;
  }

  function normalizeRepositoryPath(sourcePath, targetPath) {
    const source = normalizeCanonicalRepositoryPath(sourcePath, 'Source repository path');
    const rawTarget = assertPathSyntax(targetPath, {
      allowEmpty: true,
      allowRelativeSegments: true,
      label: 'Repository target path'
    });
    if (!rawTarget) return source;
    const sourceDir = source.includes('/') ? source.slice(0, source.lastIndexOf('/')) : '';
    const parts = [...(sourceDir ? sourceDir.split('/') : []), ...rawTarget.split('/')];
    const normalized = normalizeSegments(parts).join('/');
    return normalizeCanonicalRepositoryPath(normalized, 'Normalized repository target path');
  }

  function explicitAnchorExists(markdown, anchor) {
    const wanted = String(anchor || '').trim();
    if (!wanted) return true;
    const escaped = wanted.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(`<a\\s+(?:[^>]*?\\s)?id=["']${escaped}["'][^>]*>\\s*</a>`, 'i');
    return pattern.test(String(markdown || ''));
  }

  function normalizeRepositoryTarget(sourcePath, target) {
    if (typeof target !== 'string') {
      const parsed = target && typeof target === 'object' ? target : {};
      if (parsed.kind === 'url' || parsed.type === 'url') {
        if (!isPortableUrl(parsed.url)) throw new Error('Only portable HTTP(S) URLs are accepted.');
        return { type: 'url', url: String(parsed.url) };
      }
      return {
        type: 'repository',
        path: normalizeCanonicalRepositoryPath(parsed.path, 'Repository target path'),
        anchor: String(parsed.anchor || '').trim()
      };
    }
    const parsed = splitTarget(target);
    if (parsed.kind === 'url') return { type: 'url', url: parsed.url };
    return {
      type: 'repository',
      path: normalizeRepositoryPath(sourcePath, parsed.path),
      anchor: String(parsed.anchor || '').trim()
    };
  }

  function resolveRepositoryTarget({ sourcePath = '', target, files }) {
    try {
      const normalized = normalizeRepositoryTarget(sourcePath, target);
      if (normalized.type === 'url') return { status: 'resolved', target: normalized, message: 'Portable URL.' };
      if (!files) return { status: 'unchecked', target: normalized, message: 'Path normalized; content was not supplied.' };
      const has = files instanceof Map
        ? files.has(normalized.path)
        : Object.prototype.hasOwnProperty.call(files, normalized.path);
      if (!has) return { status: 'unresolved', target: normalized, message: `Missing repository file: ${normalized.path}` };
      const content = files instanceof Map ? files.get(normalized.path) : files[normalized.path];
      if (normalized.anchor && !explicitAnchorExists(content, normalized.anchor)) {
        return { status: 'unresolved', target: normalized, message: `Missing explicit anchor: #${normalized.anchor}` };
      }
      return { status: 'resolved', target: normalized, message: 'Repository target resolved.' };
    } catch (error) {
      return { status: 'invalid', target: null, message: error.message };
    }
  }

  function repositoryTargetToString(target) {
    if (!target || typeof target !== 'object') return '';
    if (target.type === 'url') return String(target.url || '');
    return `${String(target.path || '')}${target.anchor ? `#${target.anchor}` : ''}`;
  }

  return {
    isPortableUrl,
    isMachineLocalAbsolutePath,
    splitTarget,
    normalizeCanonicalRepositoryPath,
    normalizeRepositoryPath,
    normalizeRepositoryTarget,
    explicitAnchorExists,
    resolveRepositoryTarget,
    repositoryTargetToString
  };
});
