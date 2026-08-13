(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const DEFAULT_REPOSITORY_TEMPLATE_ROOT = '.linked-notes/templates';
  const DEFAULT_REPOSITORY_TEMPLATE_MAX_FILES = 100;
  const REPOSITORY_TEMPLATE_SUFFIX = '.template.md';
  const TEMPLATE_HEADER = '<!-- obs-template';

  function normalizeRepositoryTemplatePath(value, options = {}) {
    const allowRoot = Boolean(options.allowRoot);
    const raw = String(value == null ? '' : value).replace(/\\/g, '/').trim().replace(/\/+$/g, '');
    if (!raw) {
      if (allowRoot) return '';
      throw new TypeError('Repository template path is required.');
    }
    if (raw.startsWith('/') || /^[A-Za-z]:\//.test(raw) || raw.includes('://') || /[?#\u0000-\u001f\u007f]/.test(raw)) throw new TypeError('Repository template path must be repository-relative.');
    const parts = raw.split('/');
    if (parts.some((part) => !part || part === '.' || part === '..')) throw new TypeError('Repository template path contains an empty, . or .. segment.');
    return parts.join('/');
  }

  function normalizeRepositoryTemplateRoot(value = DEFAULT_REPOSITORY_TEMPLATE_ROOT) {
    return normalizeRepositoryTemplatePath(value);
  }

  function isRepositoryFileTemplatePath(path, options = {}) {
    let canonical;
    let rootPath;
    try {
      canonical = normalizeRepositoryTemplatePath(path);
      rootPath = normalizeRepositoryTemplateRoot(options.rootPath || DEFAULT_REPOSITORY_TEMPLATE_ROOT);
    } catch (error) { return false; }
    const prefix = `${rootPath}/`;
    if (!canonical.startsWith(prefix)) return false;
    const relative = canonical.slice(prefix.length);
    if (!relative || relative.includes('/')) return false;
    if (!relative.endsWith(REPOSITORY_TEMPLATE_SUFFIX)) return false;
    return relative.length > REPOSITORY_TEMPLATE_SUFFIX.length;
  }

  function normalizeRepositoryFileTemplateCandidatePath(path, options = {}) {
    const canonical = normalizeRepositoryTemplatePath(path);
    if (!isRepositoryFileTemplatePath(canonical, options)) throw new TypeError(`Template file must be a direct ${REPOSITORY_TEMPLATE_SUFFIX} child of ${normalizeRepositoryTemplateRoot(options.rootPath || DEFAULT_REPOSITORY_TEMPLATE_ROOT)}: ${canonical}.`);
    return canonical;
  }

  function repositoryTemplateNameKey(value) {
    return String(value == null ? '' : value).trim().toLowerCase();
  }

  function parseRepositoryTemplateMetadata(raw) {
    const metadata = {};
    const seen = new Set();
    const lines = String(raw == null ? '' : raw).split(/\r\n|\n|\r/);
    for (const sourceLine of lines) {
      const line = sourceLine.trim();
      if (!line) continue;
      const match = /^([A-Za-z][A-Za-z0-9_-]*):[ \t]*(.*)$/.exec(line);
      if (!match) throw new Error(`Invalid obs-template metadata line: ${sourceLine}.`);
      const key = match[1];
      const value = match[2].trim();
      if (key !== 'name') throw new Error(`Unsupported obs-template metadata field: ${key}.`);
      if (seen.has(key)) throw new Error(`Duplicate obs-template metadata field: ${key}.`);
      seen.add(key);
      metadata[key] = value;
    }
    if (!metadata.name) throw new Error('obs-template metadata requires a non-empty name field.');
    return { name: metadata.name };
  }

  function parseRepositoryFileTemplate(text, options = {}) {
    const source = String(text == null ? '' : text);
    const path = options.path ? normalizeRepositoryFileTemplateCandidatePath(options.path, options) : '';
    const bom = source.charCodeAt(0) === 0xFEFF ? 1 : 0;
    if (!source.startsWith(TEMPLATE_HEADER, bom)) throw new Error('Template file must start with an obs-template metadata block.');
    let metadataStart = bom + TEMPLATE_HEADER.length;
    if (source.startsWith('\r\n', metadataStart)) metadataStart += 2;
    else if (source[metadataStart] === '\n' || source[metadataStart] === '\r') metadataStart += 1;
    else throw new Error('obs-template opening marker must be followed by a newline.');
    const close = source.indexOf('-->', metadataStart);
    if (close < 0) throw new Error('obs-template metadata block is not closed.');
    const metadata = parseRepositoryTemplateMetadata(source.slice(metadataStart, close));
    let bodyStart = close + 3;
    if (source.startsWith('\r\n', bodyStart)) bodyStart += 2;
    else if (source[bodyStart] === '\n' || source[bodyStart] === '\r') bodyStart += 1;
    const body = source.slice(bodyStart);
    return {
      path,
      name: metadata.name,
      body,
      sha: String(options.sha || ''),
      metadataStart: bom,
      bodyStart
    };
  }

  function finalizeRepositoryFileTemplates(records) {
    const candidates = Array.isArray(records) ? records.filter(Boolean).map((record) => ({ ...record, name: String(record.name || '').trim(), path: String(record.path || '').trim() })) : [];
    const counts = new Map();
    for (const item of candidates) {
      const key = repositoryTemplateNameKey(item.name);
      if (!key) continue;
      counts.set(key, (counts.get(key) || 0) + 1);
    }
    const diagnostics = [];
    const templates = [];
    for (const item of candidates) {
      const key = repositoryTemplateNameKey(item.name);
      if (!key) {
        diagnostics.push({ path: item.path, kind: 'invalid_name', message: `Template ${item.path || '(unknown path)'} has no display name.` });
        continue;
      }
      if ((counts.get(key) || 0) > 1) {
        diagnostics.push({ path: item.path, kind: 'duplicate_name', message: `Duplicate template name "${item.name}". Rename one template metadata name before using it.` });
        continue;
      }
      templates.push(item);
    }
    templates.sort((left, right) => left.name.localeCompare(right.name) || left.path.localeCompare(right.path));
    diagnostics.sort((left, right) => String(left.path || '').localeCompare(String(right.path || '')) || String(left.message || '').localeCompare(String(right.message || '')));
    return { templates, diagnostics };
  }

  return {
    DEFAULT_REPOSITORY_TEMPLATE_ROOT,
    DEFAULT_REPOSITORY_TEMPLATE_MAX_FILES,
    REPOSITORY_TEMPLATE_SUFFIX,
    normalizeRepositoryTemplatePath,
    isRepositoryFileTemplatePath,
    normalizeRepositoryFileTemplateCandidatePath,
    parseRepositoryFileTemplate,
    finalizeRepositoryFileTemplates,
    repositoryTemplateNameKey
  };
});
