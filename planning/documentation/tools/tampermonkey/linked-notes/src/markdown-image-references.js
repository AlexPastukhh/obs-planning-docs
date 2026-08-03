(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  function mergeRanges(ranges) {
    const sorted = (Array.isArray(ranges) ? ranges : [])
      .filter((range) => range && Number.isInteger(range.start) && Number.isInteger(range.end) && range.end > range.start)
      .sort((left, right) => left.start - right.start || left.end - right.end);
    const merged = [];
    for (const range of sorted) {
      const previous = merged[merged.length - 1];
      if (!previous || range.start > previous.end) merged.push({ start: range.start, end: range.end });
      else if (range.end > previous.end) previous.end = range.end;
    }
    return merged;
  }

  function stripBlockquotePrefix(line) {
    let value = String(line || '');
    while (/^[ ]{0,3}>[ \t]?/.test(value)) value = value.replace(/^[ ]{0,3}>[ \t]?/, '');
    return value;
  }

  function rawHtmlCodeLikeRanges(text, protectedRanges = []) {
    const ranges = [];
    const open = [];
    const tags = /<\/?(pre|code|textarea|script|style)\b[^>]*>/gi;
    let match;
    while ((match = tags.exec(text))) {
      if (insideRanges(match.index, protectedRanges) || isEscaped(text, match.index)) continue;
      const raw = match[0];
      const tag = String(match[1] || '').toLowerCase();
      const closing = /^<\//.test(raw);
      const selfClosing = /\/\s*>$/.test(raw);
      if (!closing) {
        if (!selfClosing) open.push({ tag, start: match.index });
        continue;
      }
      let openIndex = -1;
      for (let index = open.length - 1; index >= 0; index -= 1) {
        if (open[index].tag === tag) { openIndex = index; break; }
      }
      if (openIndex < 0) continue;
      const entry = open[openIndex];
      open.splice(openIndex, 1);
      ranges.push({ start: entry.start, end: tags.lastIndex });
    }
    for (const entry of open) ranges.push({ start: entry.start, end: text.length });
    return mergeRanges(ranges);
  }

  function markdownCodeRanges(markdown) {
    const text = String(markdown || '');
    const ranges = [];
    const lines = text.split(/(?<=\n)/);
    let offset = 0;
    let fence = null;

    for (const line of lines) {
      const body = line.replace(/[\r\n]+$/, '');
      const normalized = stripBlockquotePrefix(body);
      if (fence) {
        const closing = normalized.match(/^ {0,3}(`{3,}|~{3,})[ \t]*$/);
        if (closing && closing[1][0] === fence.char && closing[1].length >= fence.length) {
          ranges.push({ start: fence.start, end: offset + line.length });
          fence = null;
        }
        offset += line.length;
        continue;
      }

      const opening = normalized.match(/^ {0,3}(`{3,}|~{3,})/);
      if (opening) {
        fence = { char: opening[1][0], length: opening[1].length, start: offset };
        offset += line.length;
        continue;
      }

      if (/^(?: {4}|\t)/.test(normalized)) ranges.push({ start: offset, end: offset + line.length });
      offset += line.length;
    }
    if (fence) ranges.push({ start: fence.start, end: text.length });

    const comments = /<!--[\s\S]*?(?:-->|$)/g;
    let comment;
    while ((comment = comments.exec(text))) ranges.push({ start: comment.index, end: comments.lastIndex });

    let protectedRanges = mergeRanges(ranges);
    for (let index = 0; index < text.length; index += 1) {
      if (text[index] !== '`' || isEscaped(text, index) || insideRanges(index, protectedRanges)) continue;
      let ticks = 1;
      while (text[index + ticks] === '`') ticks += 1;
      let cursor = index + ticks;
      let closingEnd = -1;
      while (cursor < text.length) {
        if (text[cursor] !== '`' || insideRanges(cursor, protectedRanges)) { cursor += 1; continue; }
        let run = 1;
        while (text[cursor + run] === '`') run += 1;
        if (run === ticks) { closingEnd = cursor + run; break; }
        cursor += run;
      }
      if (closingEnd > index) {
        ranges.push({ start: index, end: closingEnd });
        protectedRanges = mergeRanges(ranges);
        index = closingEnd - 1;
      }
    }

    protectedRanges = mergeRanges(ranges);
    ranges.push(...rawHtmlCodeLikeRanges(text, protectedRanges));
    return mergeRanges(ranges);
  }

  function insideRanges(index, ranges) {
    return ranges.some((range) => index >= range.start && index < range.end);
  }

  function isEscaped(text, index) {
    let count = 0;
    for (let cursor = index - 1; cursor >= 0 && text[cursor] === '\\'; cursor -= 1) count += 1;
    return count % 2 === 1;
  }

  function unescapeMarkdown(value) {
    return String(value || '').replace(/\\([!"#$%&'()*+,\-./:;<=>?@[\]^_`{|}~\\])/g, '$1');
  }

  function normalizeReferenceLabel(value) {
    return unescapeMarkdown(value).trim().replace(/\s+/g, ' ').toLowerCase();
  }

  function parseBracket(text, openIndex) {
    if (text[openIndex] !== '[') return null;
    let depth = 1;
    for (let index = openIndex + 1; index < text.length; index += 1) {
      const char = text[index];
      if (char === '\\') { index += 1; continue; }
      if (char === '[') depth += 1;
      else if (char === ']') {
        depth -= 1;
        if (depth === 0) return { value: text.slice(openIndex + 1, index), end: index + 1 };
      }
      if (char === '\n' || char === '\r') return null;
    }
    return null;
  }

  function skipWhitespace(text, index) {
    while (index < text.length && /[ \t\r\n]/.test(text[index])) index += 1;
    return index;
  }

  function parseQuotedTitle(text, index) {
    const opener = text[index];
    const closer = opener === '(' ? ')' : opener;
    if (!new Set(['"', "'", '(']).has(opener)) return null;
    let value = '';
    for (let cursor = index + 1; cursor < text.length; cursor += 1) {
      const char = text[cursor];
      if (char === '\\' && cursor + 1 < text.length) {
        value += text[cursor + 1];
        cursor += 1;
        continue;
      }
      if (char === closer) return { value, end: cursor + 1 };
      if (char === '\n' || char === '\r') return null;
      value += char;
    }
    return null;
  }

  function parseDestinationAndTitle(text, index, closingRequired) {
    let cursor = skipWhitespace(text, index);
    let source = '';
    if (text[cursor] === '<') {
      const start = ++cursor;
      while (cursor < text.length && text[cursor] !== '>') {
        if (text[cursor] === '\n' || text[cursor] === '\r') return null;
        if (text[cursor] === '\\' && cursor + 1 < text.length) cursor += 2;
        else cursor += 1;
      }
      if (text[cursor] !== '>') return null;
      source = unescapeMarkdown(text.slice(start, cursor));
      cursor += 1;
    } else {
      const start = cursor;
      let depth = 0;
      while (cursor < text.length) {
        const char = text[cursor];
        if (char === '\\' && cursor + 1 < text.length) { cursor += 2; continue; }
        if (char === '(') { depth += 1; cursor += 1; continue; }
        if (char === ')') {
          if (depth === 0) break;
          depth -= 1;
          cursor += 1;
          continue;
        }
        if ((char === ' ' || char === '\t' || char === '\r' || char === '\n') && depth === 0) break;
        cursor += 1;
      }
      if (cursor === start) return null;
      source = unescapeMarkdown(text.slice(start, cursor));
    }
    const afterSource = cursor;
    cursor = skipWhitespace(text, cursor);
    let title = '';
    if (cursor > afterSource && new Set(['"', "'", '(']).has(text[cursor])) {
      const parsedTitle = parseQuotedTitle(text, cursor);
      if (!parsedTitle) return null;
      title = parsedTitle.value;
      cursor = skipWhitespace(text, parsedTitle.end);
    }
    if (closingRequired) {
      if (text[cursor] !== ')') return null;
      cursor += 1;
    }
    return { source, title, end: cursor };
  }

  function parseReferenceDefinitions(text, codeRanges) {
    const definitions = new Map();
    const lines = text.split(/(?<=\n)/);
    let offset = 0;
    for (const line of lines) {
      if (insideRanges(offset, codeRanges)) { offset += line.length; continue; }
      const body = line.replace(/[\r\n]+$/, '');
      const match = body.match(/^[ ]{0,3}\[([^\]]+)\]:[ \t]*(.*)$/);
      if (match) {
        const label = normalizeReferenceLabel(match[1]);
        const parsed = parseDestinationAndTitle(match[2], 0, false);
        if (label && parsed && skipWhitespace(match[2], parsed.end) === match[2].length && !definitions.has(label)) {
          definitions.set(label, { source: parsed.source, title: parsed.title, start: offset, end: offset + body.length });
        }
      }
      offset += line.length;
    }
    return definitions;
  }

  function parseMarkdownImages(markdown) {
    const text = String(markdown || '');
    const refs = [];
    const codeRanges = markdownCodeRanges(text);
    const definitions = parseReferenceDefinitions(text, codeRanges);
    const claimed = [];

    for (let index = 0; index < text.length - 1; index += 1) {
      if (text[index] !== '!' || text[index + 1] !== '[' || isEscaped(text, index) || insideRanges(index, codeRanges)) continue;
      const alt = parseBracket(text, index + 1);
      if (!alt) {
        refs.push({ kind: 'unsupported', start: index, end: Math.min(text.length, index + 2), raw: text.slice(index, index + 2), source: '', message: 'Unsupported or malformed Markdown image syntax.' });
        continue;
      }
      let cursor = alt.end;
      let parsed = null;
      if (text[cursor] === '(') {
        const destination = parseDestinationAndTitle(text, cursor + 1, true);
        if (destination) parsed = { source: destination.source, title: destination.title, end: destination.end, syntax: 'inline' };
      } else if (text[cursor] === '[') {
        const label = parseBracket(text, cursor);
        if (label) {
          const normalized = normalizeReferenceLabel(label.value || alt.value);
          const definition = definitions.get(normalized);
          if (definition) parsed = { source: definition.source, title: definition.title, end: label.end, syntax: label.value ? 'reference' : 'collapsed-reference', referenceLabel: normalized };
        }
      } else {
        const normalized = normalizeReferenceLabel(alt.value);
        const definition = definitions.get(normalized);
        if (definition) parsed = { source: definition.source, title: definition.title, end: alt.end, syntax: 'shortcut-reference', referenceLabel: normalized };
      }
      if (!parsed) {
        refs.push({ kind: 'unsupported', start: index, end: alt.end, raw: text.slice(index, alt.end), alt: unescapeMarkdown(alt.value), source: '', message: 'Unsupported or unresolved Markdown image syntax.' });
        claimed.push({ start: index, end: alt.end });
        index = alt.end - 1;
        continue;
      }
      const ref = {
        kind: 'markdown',
        start: index,
        end: parsed.end,
        raw: text.slice(index, parsed.end),
        alt: unescapeMarkdown(alt.value),
        source: parsed.source,
        title: parsed.title || '',
        syntax: parsed.syntax,
        referenceLabel: parsed.referenceLabel || ''
      };
      refs.push(ref);
      claimed.push({ start: ref.start, end: ref.end });
      index = parsed.end - 1;
    }

    const html = /<img\b([^>]*?)\bsrc\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))([^>]*)>/gi;
    let match;
    while ((match = html.exec(text))) {
      if (insideRanges(match.index, codeRanges) || claimed.some((range) => match.index >= range.start && match.index < range.end)) continue;
      refs.push({ kind: 'html', start: match.index, end: html.lastIndex, raw: match[0], source: match[2] || match[3] || match[4] || '', prefix: match[1] || '', suffix: match[5] || '' });
    }
    return refs.sort((a, b) => a.start - b.start || a.end - b.end);
  }

  function classifyImageReference(ref, sourcePath, api) {
    if (ref && ref.kind === 'unsupported') return { ...ref, targetType: 'invalid', message: ref.message || 'Unsupported image syntax.' };
    const value = String(ref && ref.source || '').trim();
    if (!value) return { ...ref, targetType: 'invalid', message: 'Image source is empty.' };
    if (/^obs-pending-image:/i.test(value)) return { ...ref, targetType: 'pending', assetId: value.slice(value.indexOf(':') + 1) };
    if (api && typeof api.isPortableUrl === 'function' && api.isPortableUrl(value)) return { ...ref, targetType: 'external', url: value };
    try {
      const normalized = api.normalizeMarkdownRepositoryTarget(sourcePath, value);
      if (normalized.type !== 'repository') return { ...ref, targetType: 'external', url: normalized.url || value };
      return { ...ref, targetType: 'repository', path: normalized.path };
    } catch (error) {
      return { ...ref, targetType: 'invalid', message: error.message };
    }
  }

  function replaceReferenceSource(ref, destination) {
    const encoded = String(destination || '');
    if (ref.kind === 'html') {
      return ref.raw.replace(/\bsrc\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/i, `src="${encoded.replace(/&/g, '&amp;').replace(/"/g, '&quot;')}"`);
    }
    if (ref.kind !== 'markdown') return ref.raw;
    const alt = String(ref.alt || '').replace(/([\\\]])/g, '\\$1');
    const title = String(ref.title || '').replace(/(["\\])/g, '\\$1');
    return `![${alt}](<${encoded}>${title ? ` "${title}"` : ''})`;
  }

  function rewriteImageReferences(markdown, replacements) {
    const text = String(markdown || '');
    const map = replacements instanceof Map ? replacements : new Map(Object.entries(replacements || {}));
    const refs = parseMarkdownImages(text);
    let output = text;
    for (let index = refs.length - 1; index >= 0; index -= 1) {
      const ref = refs[index];
      if (ref.kind === 'unsupported') continue;
      const replacement = map.get(ref.source);
      if (!replacement) continue;
      output = `${output.slice(0, ref.start)}${replaceReferenceSource(ref, replacement)}${output.slice(ref.end)}`;
    }
    return output;
  }

  return {
    markdownCodeRanges,
    insideRanges,
    normalizeReferenceLabel,
    parseReferenceDefinitions,
    parseMarkdownImages,
    classifyImageReference,
    replaceReferenceSource,
    rewriteImageReferences
  };
});
