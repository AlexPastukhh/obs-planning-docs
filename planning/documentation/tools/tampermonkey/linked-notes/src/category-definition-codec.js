(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const CATEGORY_V1_MARKER_PREFIX = '<!-- obs-file-category:v1 ';
  const CATEGORY_V2_MARKER_PREFIX = '<!-- obs-file-category:v2 ';
  const CATEGORY_MARKER_SUFFIX = ' -->';
  const IMPLIED_START = '<!-- obs-file-category:implied:start -->';
  const IMPLIED_END = '<!-- obs-file-category:implied:end -->';
  const FILES_START = '<!-- obs-file-category:files:start -->';
  const FILES_END = '<!-- obs-file-category:files:end -->';

  function normalizeCategoryId(value) {
    const text = String(value == null ? '' : value).trim().toLowerCase()
      .normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9._-]+/g, '-').replace(/^-+|-+$/g, '').replace(/-{2,}/g, '-');
    if (!text || text.length > 80) throw new TypeError('Category id must contain portable letters, digits, dots, underscores or hyphens.');
    return text;
  }

  function normalizeCategoryName(value) {
    const text = String(value == null ? '' : value).trim();
    if (!text) throw new TypeError('Category name is required.');
    if (/\r|\n/.test(text)) throw new TypeError('Category name must be one line.');
    return text;
  }

  function escapeMarkdownLabel(value) {
    return String(value == null ? '' : value).replace(/\\/g, '\\\\').replace(/\[/g, '\\[').replace(/\]/g, '\\]');
  }

  function normalizeLinkItems(items, key) {
    const result = [];
    const seen = new Set();
    for (const item of Array.isArray(items) ? items : []) {
      const target = String(item && item[key] || '').trim().replace(/\\/g, '/');
      if (!target || seen.has(target)) continue;
      if (/^[a-zA-Z]:\//.test(target) || target.startsWith('/') || target.includes('://') || /[?#]/.test(target)) {
        throw new TypeError(`Category link must be a portable repository-relative Markdown path: ${target}`);
      }
      seen.add(target);
      result.push({ ...item, [key]: target, label: String(item && item.label || target).trim() || target });
    }
    return result;
  }

  function encodeMarkdownTarget(value) {
    const target = String(value == null ? '' : value).trim().replace(/\\/g, '/');
    return target.split('/').map((segment) => {
      if (segment === '.' || segment === '..') return segment;
      return encodeURIComponent(segment).replace(/[!'()*]/g, (character) => `%${character.charCodeAt(0).toString(16).toUpperCase()}`);
    }).join('/');
  }

  function decodeMarkdownTarget(value) {
    let target = String(value == null ? '' : value).trim();
    if (target.startsWith('<') && target.endsWith('>')) target = target.slice(1, -1);
    const decoded = target.split('/').map((segment) => {
      if (segment === '.' || segment === '..') return segment;
      let value;
      try { value = decodeURIComponent(segment.replace(/%(?![0-9A-Fa-f]{2})/g, '%25')); }
      catch (error) { throw new Error(`Category link target has invalid percent encoding: ${target}`); }
      if (!value || /[\\/?#\u0000-\u001f\u007f]/.test(value)) throw new Error(`Category link target contains an invalid path segment: ${target}`);
      return value;
    }).join('/');
    return decoded;
  }

  function renderLinks(items) {
    return items.length ? items.map((item) => `- [${escapeMarkdownLabel(item.label)}](<${encodeMarkdownTarget(item.target)}>)`).join('\n') : '_None._';
  }

  function encodeCategoryDefinition(input = {}) {
    const id = normalizeCategoryId(input.id || input.name);
    const name = normalizeCategoryName(input.name || id);
    const description = String(input.description == null ? '' : input.description).replace(/\r\n/g, '\n').replace(/\r/g, '\n').replace(/\n+$/g, '');
    const implied = normalizeLinkItems(input.impliedCategories, 'target');
    const files = normalizeLinkItems(input.files, 'target');
    const metadata = JSON.stringify({ schemaVersion: 2, id, name });
    const descriptionBlock = description ? `${description}\n\n` : '';
    return `${CATEGORY_V2_MARKER_PREFIX}${metadata}${CATEGORY_MARKER_SUFFIX}\n\n# ${name}\n\n${descriptionBlock}${IMPLIED_START}\n## Implied categories\n\n${renderLinks(implied)}\n${IMPLIED_END}\n\n${FILES_START}\n## Files\n\n${renderLinks(files)}\n${FILES_END}\n`;
  }

  function parseMarker(markdown) {
    const first = String(markdown || '').split(/\r?\n/, 1)[0];
    const prefix = first.startsWith(CATEGORY_V2_MARKER_PREFIX) ? CATEGORY_V2_MARKER_PREFIX
      : first.startsWith(CATEGORY_V1_MARKER_PREFIX) ? CATEGORY_V1_MARKER_PREFIX : '';
    if (!prefix || !first.endsWith(CATEGORY_MARKER_SUFFIX)) throw new Error('Markdown is not an obs-file-category definition.');
    let metadata;
    try { metadata = JSON.parse(first.slice(prefix.length, -CATEGORY_MARKER_SUFFIX.length)); }
    catch (error) { throw new Error(`Category marker JSON is invalid: ${error.message}`); }
    const schemaVersion = Number(metadata && metadata.schemaVersion);
    const expected = prefix === CATEGORY_V2_MARKER_PREFIX ? 2 : 1;
    if (schemaVersion !== expected) throw new Error('Unsupported category definition schema.');
    return { schemaVersion, id: normalizeCategoryId(metadata.id), name: normalizeCategoryName(metadata.name) };
  }

  function parseMarkdownLinks(text) {
    const result = [];
    for (const line of String(text || '').split(/\r?\n/)) {
      const match = line.match(/^\s*-\s+\[((?:\\.|[^\]])*)\]\((.*)\)\s*$/);
      if (!match) continue;
      const label = match[1].replace(/\\([\\\[\]])/g, '$1');
      const target = decodeMarkdownTarget(match[2]);
      result.push({ label, target });
    }
    return normalizeLinkItems(result, 'target');
  }

  function bodyAndHeading(source) {
    const newline = source.indexOf('\n');
    const body = (newline < 0 ? '' : source.slice(newline + 1)).replace(/^\n+/, '');
    const heading = body.match(/^#\s+(.+)\n/);
    if (!heading) throw new Error('Category definition title is missing.');
    return { body, heading };
  }

  function decodeV1(source, marker) {
    const { body, heading } = bodyAndHeading(source);
    const impliedHeading = '\n## Implied categories\n';
    const filesHeading = '\n## Files\n';
    const impliedIndex = body.indexOf(impliedHeading);
    const filesIndex = body.indexOf(filesHeading);
    if (impliedIndex < 0 || filesIndex < 0 || filesIndex <= impliedIndex) throw new Error('Legacy category managed sections are missing or out of order.');
    const description = body.slice(heading[0].length, impliedIndex).replace(/^\n+|\n+$/g, '');
    return {
      schemaVersion: 1,
      id: marker.id,
      name: marker.name,
      description,
      impliedCategories: parseMarkdownLinks(body.slice(impliedIndex + impliedHeading.length, filesIndex)),
      files: parseMarkdownLinks(body.slice(filesIndex + filesHeading.length))
    };
  }

  function findManagedRegion(body, startMarker, endMarker, label) {
    const start = body.indexOf(startMarker);
    const end = body.indexOf(endMarker);
    if (start < 0 || end < 0 || end <= start) throw new Error(`${label} managed boundaries are missing or out of order.`);
    if (body.indexOf(startMarker, start + startMarker.length) >= 0 || body.indexOf(endMarker, end + endMarker.length) >= 0) {
      throw new Error(`${label} managed boundaries are duplicated.`);
    }
    return { start, end, contentStart: start + startMarker.length, content: body.slice(start + startMarker.length, end) };
  }

  function decodeV2(source, marker) {
    const { body, heading } = bodyAndHeading(source);
    const implied = findManagedRegion(body, IMPLIED_START, IMPLIED_END, 'Implied categories');
    const files = findManagedRegion(body, FILES_START, FILES_END, 'Files');
    if (implied.start < heading[0].length || files.start <= implied.end) throw new Error('Category managed boundaries are out of order.');
    const description = body.slice(heading[0].length, implied.start).replace(/^\n+|\n+$/g, '');
    return {
      schemaVersion: 2,
      id: marker.id,
      name: marker.name,
      description,
      impliedCategories: parseMarkdownLinks(implied.content),
      files: parseMarkdownLinks(files.content)
    };
  }

  function decodeCategoryDefinition(markdown) {
    const source = String(markdown == null ? '' : markdown).replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    const marker = parseMarker(source);
    return marker.schemaVersion === 2 ? decodeV2(source, marker) : decodeV1(source, marker);
  }

  function isCategoryDefinitionMarkdown(markdown) {
    const source = String(markdown || '');
    return source.startsWith(CATEGORY_V1_MARKER_PREFIX) || source.startsWith(CATEGORY_V2_MARKER_PREFIX);
  }

  function categoryFileName(id) { return `${normalizeCategoryId(id)}.md`; }

  return {
    CATEGORY_MARKER_PREFIX: CATEGORY_V2_MARKER_PREFIX,
    CATEGORY_V1_MARKER_PREFIX,
    CATEGORY_V2_MARKER_PREFIX,
    IMPLIED_START,
    IMPLIED_END,
    FILES_START,
    FILES_END,
    normalizeCategoryId,
    normalizeCategoryName,
    encodeCategoryDefinition,
    decodeCategoryDefinition,
    isCategoryDefinitionMarkdown,
    categoryFileName,
    encodeMarkdownTarget,
    decodeMarkdownTarget
  };
});
