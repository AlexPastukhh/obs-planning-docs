(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const REFERENCE_OBJECT_ID_PATTERN = /^ro_[A-Za-z0-9][A-Za-z0-9_-]{2,63}$/;
  const REFERENCE_DEPENDENCY_NUMBER_PATTERN = /^[1-9][0-9]{0,8}$/;
  const MARKER_COMMENT = /<!--[\s\S]*?-->/g;

  function sourceText(value) {
    return String(value == null ? '' : value);
  }

  function markdownCodeRanges(text) {
    const ranges = [];
    const lineRanges = [];
    let start = 0;
    for (let index = 0; index <= text.length; index += 1) {
      if (index !== text.length && text[index] !== '\n' && text[index] !== '\r') continue;
      let end = index;
      let next = index;
      if (index < text.length && text[index] === '\r' && text[index + 1] === '\n') next = index + 2;
      else if (index < text.length) next = index + 1;
      lineRanges.push({ start, end, next });
      start = next;
      if (next > index) index = next - 1;
    }

    let fence = null;
    for (const line of lineRanges) {
      const value = text.slice(line.start, line.end);
      if (!fence) {
        const match = value.match(/^ {0,3}(`{3,}|~{3,})(.*)$/);
        if (!match) continue;
        fence = { start: line.start, char: match[1][0], length: match[1].length };
        continue;
      }
      const close = value.match(/^ {0,3}(`+|~+)[ \t]*$/);
      if (!close || close[1][0] !== fence.char || close[1].length < fence.length) continue;
      ranges.push([fence.start, line.next]);
      fence = null;
    }
    if (fence) ranges.push([fence.start, text.length]);

    const insideFence = (offset) => ranges.some(([rangeStart, rangeEnd]) => offset >= rangeStart && offset < rangeEnd);
    let index = 0;
    while (index < text.length) {
      if (insideFence(index) || text[index] !== '`') { index += 1; continue; }
      let runEnd = index + 1;
      while (runEnd < text.length && text[runEnd] === '`') runEnd += 1;
      const length = runEnd - index;
      let search = runEnd;
      let closeStart = -1;
      let closeEnd = -1;
      while (search < text.length) {
        if (insideFence(search) || text[search] !== '`') { search += 1; continue; }
        let candidateEnd = search + 1;
        while (candidateEnd < text.length && text[candidateEnd] === '`') candidateEnd += 1;
        if (candidateEnd - search === length) { closeStart = search; closeEnd = candidateEnd; break; }
        search = candidateEnd;
      }
      if (closeStart >= 0) {
        ranges.push([index, closeEnd]);
        index = closeEnd;
      } else {
        index = runEnd;
      }
    }
    ranges.sort((left, right) => left[0] - right[0]);
    return ranges;
  }

  function inRanges(offset, ranges) {
    return ranges.some(([start, end]) => offset >= start && offset < end);
  }

  function normalizeReferenceObjectId(value) {
    const id = String(value == null ? '' : value).trim();
    if (!REFERENCE_OBJECT_ID_PATTERN.test(id)) throw new TypeError(`Invalid Reference Object id: ${id || '(empty)'}.`);
    return id;
  }

  function normalizeReferenceDependencyNumber(value) {
    const raw = String(value == null ? '' : value).trim();
    if (!REFERENCE_DEPENDENCY_NUMBER_PATTERN.test(raw)) throw new TypeError(`Invalid Reference Object dependency number: ${raw || '(empty)'}.`);
    const number = Number(raw);
    if (!Number.isSafeInteger(number) || number < 1) throw new TypeError(`Invalid Reference Object dependency number: ${raw}.`);
    return number;
  }

  function randomHex(length, randomSource) {
    if (typeof randomSource === 'function') {
      const supplied = String(randomSource(length) || '').replace(/[^A-Fa-f0-9]/g, '').toLowerCase();
      if (supplied.length >= length) return supplied.slice(0, length);
    }
    const cryptoObject = typeof globalThis !== 'undefined' ? globalThis.crypto : null;
    if (cryptoObject && typeof cryptoObject.getRandomValues === 'function') {
      const bytes = new Uint8Array(Math.ceil(length / 2));
      cryptoObject.getRandomValues(bytes);
      return [...bytes].map((byte) => byte.toString(16).padStart(2, '0')).join('').slice(0, length);
    }
    let output = '';
    while (output.length < length) output += Math.floor(Math.random() * 0x100000000).toString(16).padStart(8, '0');
    return output.slice(0, length);
  }

  function createReferenceObjectId(randomSource) {
    return `ro_${randomHex(12, randomSource)}`;
  }

  function formatReferenceDefinition(id, value) {
    const stableId = normalizeReferenceObjectId(id);
    return `<!-- obs-ref:def id="${stableId}" -->${String(value == null ? '' : value)}<!-- /obs-ref:def -->`;
  }

  function formatReferenceUse(id, value) {
    const stableId = normalizeReferenceObjectId(id);
    return `<!-- obs-ref:use id="${stableId}" -->${String(value == null ? '' : value)}<!-- /obs-ref:use -->`;
  }

  function formatReferenceDependency(id, dependencyNumber, value) {
    const stableId = normalizeReferenceObjectId(id);
    const dep = normalizeReferenceDependencyNumber(dependencyNumber);
    return `<!-- obs-ref:depend id="${stableId}" dep="${dep}" -->${String(value == null ? '' : value)}<!-- /obs-ref:depend -->`;
  }

  async function referenceObjectValueFingerprint(value) {
    const bytes = new TextEncoder().encode(String(value == null ? '' : value));
    const cryptoObject = typeof globalThis !== 'undefined' ? globalThis.crypto : null;
    if (cryptoObject && cryptoObject.subtle && typeof cryptoObject.subtle.digest === 'function') {
      const digest = new Uint8Array(await cryptoObject.subtle.digest('SHA-256', bytes));
      return `sha256:${[...digest].map((byte) => byte.toString(16).padStart(2, '0')).join('')}`;
    }
    if (typeof require === 'function') {
      const digest = require('node:crypto').createHash('sha256').update(bytes).digest('hex');
      return `sha256:${digest}`;
    }
    throw new Error('SHA-256 is unavailable for Reference Object dependency review state.');
  }

  function lineStarts(text) {
    const starts = [0];
    for (let index = 0; index < text.length; index += 1) {
      if (text[index] === '\r') {
        if (text[index + 1] === '\n') index += 1;
        starts.push(index + 1);
      } else if (text[index] === '\n') starts.push(index + 1);
    }
    return starts;
  }

  function positionForOffset(starts, offset) {
    let low = 0;
    let high = starts.length - 1;
    while (low <= high) {
      const middle = (low + high) >> 1;
      if (starts[middle] <= offset) low = middle + 1;
      else high = middle - 1;
    }
    const index = Math.max(0, high);
    return { line: index + 1, column: offset - starts[index] + 1 };
  }

  function parseAttributes(body) {
    const attrs = {};
    const duplicates = [];
    const pattern = /([A-Za-z][A-Za-z0-9_-]*)\s*=\s*"([^"]*)"/g;
    let match;
    while ((match = pattern.exec(body))) {
      const name = match[1];
      if (Object.prototype.hasOwnProperty.call(attrs, name)) duplicates.push(name);
      else attrs[name] = match[2];
    }
    const leftover = body.replace(pattern, '').trim();
    return { attrs, leftover, duplicates };
  }

  function parseReferenceMarkers(input) {
    const text = sourceText(input);
    const starts = lineStarts(text);
    const codeRanges = markdownCodeRanges(text);
    const tokens = [];
    const diagnostics = [];
    MARKER_COMMENT.lastIndex = 0;
    let match;
    while ((match = MARKER_COMMENT.exec(text))) {
      if (inRanges(match.index, codeRanges)) continue;
      if (!/obs-ref:/i.test(match[0])) continue;
      const shape = match[0].match(/^<!--\s*(\/?)obs-ref:(def|use|depend)\b([\s\S]*?)-->$/i);
      const pos = positionForOffset(starts, match.index);
      if (!shape) {
        diagnostics.push({ kind: 'malformed_marker', offset: match.index, line: pos.line, column: pos.column, message: 'Malformed obs-ref marker comment.' });
        continue;
      }
      const closing = Boolean(shape[1]);
      const role = String(shape[2] || '').toLowerCase();
      const parsedAttrs = parseAttributes(shape[3] || '');
      if (parsedAttrs.leftover) diagnostics.push({ kind: 'malformed_marker', offset: match.index, line: pos.line, column: pos.column, message: `obs-ref:${role} marker contains unsupported syntax.` });
      for (const name of parsedAttrs.duplicates) diagnostics.push({ kind: 'duplicate_attribute', offset: match.index, line: pos.line, column: pos.column, attribute: name, message: `obs-ref:${role} marker contains duplicate ${name} attribute.` });
      const attrs = parsedAttrs.attrs;
      if (closing) {
        if (Object.keys(attrs).length || parsedAttrs.leftover) diagnostics.push({ kind: 'malformed_marker', offset: match.index, line: pos.line, column: pos.column, message: `Closing obs-ref:${role} marker cannot contain attributes.` });
        tokens.push({ start: match.index, end: MARKER_COMMENT.lastIndex, closing: true, role, id: '', dep: 0, raw: match[0] });
        continue;
      }
      const id = String(attrs.id || '').trim();
      if (!REFERENCE_OBJECT_ID_PATTERN.test(id)) diagnostics.push({ kind: 'invalid_id', offset: match.index, line: pos.line, column: pos.column, message: `Invalid ${role} Reference Object id.` });
      let dep = 0;
      const allowed = role === 'depend' ? new Set(['id', 'dep']) : new Set(['id']);
      for (const name of Object.keys(attrs)) if (!allowed.has(name)) diagnostics.push({ kind: 'unsupported_attribute', offset: match.index, line: pos.line, column: pos.column, message: `obs-ref:${role} does not support attribute ${name}.` });
      if (role === 'depend') {
        try { dep = normalizeReferenceDependencyNumber(attrs.dep); }
        catch (error) { diagnostics.push({ kind: 'invalid_dependency_number', offset: match.index, line: pos.line, column: pos.column, objectId: id, message: error.message }); }
      } else if (Object.prototype.hasOwnProperty.call(attrs, 'dep')) {
        diagnostics.push({ kind: 'unsupported_attribute', offset: match.index, line: pos.line, column: pos.column, message: `obs-ref:${role} cannot declare dep.` });
      }
      tokens.push({ start: match.index, end: MARKER_COMMENT.lastIndex, closing: false, role, id, dep, raw: match[0] });
    }

    const occurrences = [];
    const stack = [];
    for (const token of tokens) {
      const pos = positionForOffset(starts, token.start);
      if (!token.closing) {
        const parent = stack[stack.length - 1] || null;
        const allowedNestedUse = Boolean(parent && parent.role === 'depend' && token.role === 'use' && stack.length === 1);
        if (parent && !allowedNestedUse) {
          diagnostics.push({ kind: 'nested_marker', offset: token.start, line: pos.line, column: pos.column, message: `Nested obs-ref:${token.role} inside obs-ref:${parent.role} is not supported${parent.role === 'depend' ? '; only obs-ref:use may be nested inside depend' : ''}.` });
        }
        stack.push(token);
        continue;
      }
      if (!stack.length) {
        diagnostics.push({ kind: 'unexpected_close', offset: token.start, line: pos.line, column: pos.column, message: `Closing obs-ref:${token.role} has no matching opener.` });
        continue;
      }
      const active = stack[stack.length - 1];
      if (active.role !== token.role) {
        diagnostics.push({ kind: 'mismatched_close', offset: token.start, line: pos.line, column: pos.column, message: `Closing obs-ref:${token.role} does not match open obs-ref:${active.role}.` });
        stack.pop();
        continue;
      }
      stack.pop();
      const openPos = positionForOffset(starts, active.start);
      occurrences.push({
        role: active.role,
        id: active.id,
        ...(active.role === 'depend' ? { dep: active.dep } : {}),
        fullStart: active.start,
        fullEnd: token.end,
        openStart: active.start,
        openEnd: active.end,
        contentStart: active.end,
        contentEnd: token.start,
        closeStart: token.start,
        closeEnd: token.end,
        value: text.slice(active.end, token.start),
        line: openPos.line,
        column: openPos.column,
        lineOccurrence: 0
      });
    }
    for (const active of stack) {
      const pos = positionForOffset(starts, active.start);
      diagnostics.push({ kind: 'unclosed_marker', offset: active.start, line: pos.line, column: pos.column, message: `Open obs-ref:${active.role} marker is not closed.` });
    }

    const perLine = new Map();
    occurrences.sort((left, right) => left.fullStart - right.fullStart || right.fullEnd - left.fullEnd);
    for (const occurrence of occurrences) {
      const key = `${occurrence.role}\u0000${occurrence.id}\u0000${occurrence.line}`;
      const next = (perLine.get(key) || 0) + 1;
      perLine.set(key, next);
      occurrence.lineOccurrence = next;
    }
    const dependencyNumbers = new Map();
    for (const occurrence of occurrences.filter((item) => item.role === 'depend' && item.dep)) {
      if (dependencyNumbers.has(occurrence.dep)) {
        diagnostics.push({ kind: 'duplicate_dependency_number', offset: occurrence.openStart, line: occurrence.line, column: occurrence.column, objectId: occurrence.id, dep: occurrence.dep, message: `Reference Object dependency number ${occurrence.dep} is duplicated in this file.` });
      } else dependencyNumbers.set(occurrence.dep, occurrence);
    }
    return { text, occurrences, diagnostics, codeRanges };
  }

  function overlapsRange(start, end, rangeStart, rangeEnd) {
    return start < rangeEnd && end > rangeStart;
  }

  function candidateBlocked(parsed, start, end, options = {}) {
    if (parsed.codeRanges.some(([rangeStart, rangeEnd]) => overlapsRange(start, end, rangeStart, rangeEnd))) return true;
    for (const item of parsed.occurrences) {
      if (!overlapsRange(start, end, item.fullStart, item.fullEnd)) continue;
      if (options.allowContainingUses && item.role === 'use' && start <= item.fullStart && end >= item.fullEnd) continue;
      return true;
    }
    return false;
  }

  function findExactCandidates(input, exactValue, options = {}) {
    const text = sourceText(input);
    const needle = String(exactValue == null ? '' : exactValue);
    if (!needle) throw new TypeError('Paste a non-empty exact value to find Reference Object candidates.');
    const parsed = parseReferenceMarkers(text);
    if (parsed.diagnostics.length && options.allowMalformed !== true) {
      const error = new Error('Current file contains malformed Reference Object markers. Validate or repair markers before creating another Reference Object relation.');
      error.kind = 'reference_marker_invalid';
      error.diagnostics = parsed.diagnostics;
      throw error;
    }
    const starts = lineStarts(text);
    const candidates = [];
    let offset = 0;
    while (offset <= text.length - needle.length) {
      const found = text.indexOf(needle, offset);
      if (found < 0) break;
      const end = found + needle.length;
      if (!candidateBlocked(parsed, found, end, options)) {
        const pos = positionForOffset(starts, found);
        const lineStart = starts[pos.line - 1];
        const nextLineStart = pos.line < starts.length ? starts[pos.line] : text.length;
        let lineEnd = nextLineStart;
        if (lineEnd > lineStart && text[lineEnd - 1] === '\n') lineEnd -= 1;
        if (lineEnd > lineStart && text[lineEnd - 1] === '\r') lineEnd -= 1;
        candidates.push({
          start: found,
          end,
          value: needle,
          line: pos.line,
          column: pos.column,
          lineOccurrence: 0,
          lineText: text.slice(lineStart, lineEnd),
          lineMatchStart: found - lineStart,
          lineMatchEnd: end <= lineEnd ? end - lineStart : Math.max(0, lineEnd - lineStart),
          multiline: needle.includes('\n')
        });
      }
      offset = found + Math.max(needle.length, 1);
    }
    const perLine = new Map();
    for (const candidate of candidates) {
      const next = (perLine.get(candidate.line) || 0) + 1;
      perLine.set(candidate.line, next);
      candidate.lineOccurrence = next;
    }
    return candidates;
  }

  function findExactReferenceObjectCandidates(input, exactValue, options = {}) {
    return findExactCandidates(input, exactValue, options);
  }

  function findExactReferenceDependencyCandidates(input, exactValue, options = {}) {
    return findExactCandidates(input, exactValue, { ...options, allowContainingUses: true });
  }

  function wrapReferenceDefinitionAtCandidate(input, candidate, id) {
    const text = sourceText(input);
    const stableId = normalizeReferenceObjectId(id);
    const start = Number(candidate && candidate.start);
    const end = Number(candidate && candidate.end);
    if (!Number.isInteger(start) || !Number.isInteger(end) || start < 0 || end <= start || end > text.length) throw new TypeError('A valid exact occurrence must be selected.');
    const parsed = parseReferenceMarkers(text);
    if (parsed.diagnostics.length) throw new Error('Current file contains malformed Reference Object markers.');
    if (parsed.occurrences.some((item) => overlapsRange(start, end, item.fullStart, item.fullEnd))) throw new Error('Selected occurrence overlaps an existing Reference Object marker.');
    const value = text.slice(start, end);
    if (candidate && Object.prototype.hasOwnProperty.call(candidate, 'value') && String(candidate.value) !== value) throw new Error('Selected exact occurrence changed. Find candidates again.');
    return `${text.slice(0, start)}${formatReferenceDefinition(stableId, value)}${text.slice(end)}`;
  }

  function nextReferenceDependencyNumber(input) {
    const parsed = parseReferenceMarkers(input);
    if (parsed.diagnostics.length) throw new Error('Current file contains malformed Reference Object markers.');
    const used = new Set(parsed.occurrences.filter((item) => item.role === 'depend' && item.dep).map((item) => item.dep));
    let next = 1;
    while (used.has(next)) next += 1;
    return next;
  }

  function wrapReferenceDependencyAtCandidate(input, candidate, id, dependencyNumber = null) {
    const text = sourceText(input);
    const stableId = normalizeReferenceObjectId(id);
    const start = Number(candidate && candidate.start);
    const end = Number(candidate && candidate.end);
    if (!Number.isInteger(start) || !Number.isInteger(end) || start < 0 || end <= start || end > text.length) throw new TypeError('A valid exact occurrence must be selected.');
    const parsed = parseReferenceMarkers(text);
    if (parsed.diagnostics.length) throw new Error('Current file contains malformed Reference Object markers.');
    for (const item of parsed.occurrences) {
      if (!overlapsRange(start, end, item.fullStart, item.fullEnd)) continue;
      if (item.role === 'use' && start <= item.fullStart && end >= item.fullEnd) continue;
      throw new Error('Selected dependency occurrence overlaps an unsupported existing Reference Object marker.');
    }
    const value = text.slice(start, end);
    if (candidate && Object.prototype.hasOwnProperty.call(candidate, 'value') && String(candidate.value) !== value) throw new Error('Selected exact occurrence changed. Find candidates again.');
    const dep = dependencyNumber == null ? nextReferenceDependencyNumber(text) : normalizeReferenceDependencyNumber(dependencyNumber);
    if (parsed.occurrences.some((item) => item.role === 'depend' && item.dep === dep)) throw new Error(`Reference Object dependency number ${dep} already exists in this file.`);
    return `${text.slice(0, start)}${formatReferenceDependency(stableId, dep, value)}${text.slice(end)}`;
  }

  function replaceReferenceOccurrenceValues(input, replacements) {
    let text = sourceText(input);
    const ordered = (Array.isArray(replacements) ? replacements : []).map((item) => ({
      start: Number(item && item.contentStart),
      end: Number(item && item.contentEnd),
      value: String(item && item.value == null ? '' : item.value)
    })).sort((left, right) => right.start - left.start);
    let previousStart = text.length + 1;
    for (const item of ordered) {
      if (!Number.isInteger(item.start) || !Number.isInteger(item.end) || item.start < 0 || item.end < item.start || item.end > text.length) throw new TypeError('Reference occurrence replacement range is invalid.');
      if (item.end > previousStart) throw new Error('Reference occurrence replacement ranges overlap.');
      text = `${text.slice(0, item.start)}${item.value}${text.slice(item.end)}`;
      previousStart = item.start;
    }
    return text;
  }

  function referenceDefinitionsById(input, id) {
    const stableId = normalizeReferenceObjectId(id);
    return parseReferenceMarkers(input).occurrences.filter((item) => item.role === 'def' && item.id === stableId);
  }

  function referenceUsesById(input, id) {
    const stableId = normalizeReferenceObjectId(id);
    return parseReferenceMarkers(input).occurrences.filter((item) => item.role === 'use' && item.id === stableId);
  }

  function referenceDependenciesById(input, id) {
    const stableId = normalizeReferenceObjectId(id);
    return parseReferenceMarkers(input).occurrences.filter((item) => item.role === 'depend' && item.id === stableId);
  }

  return {
    REFERENCE_OBJECT_ID_PATTERN,
    REFERENCE_DEPENDENCY_NUMBER_PATTERN,
    markdownCodeRanges,
    normalizeReferenceObjectId,
    normalizeReferenceDependencyNumber,
    createReferenceObjectId,
    formatReferenceDefinition,
    formatReferenceUse,
    formatReferenceDependency,
    referenceObjectValueFingerprint,
    parseReferenceMarkers,
    findExactReferenceObjectCandidates,
    findExactReferenceDependencyCandidates,
    wrapReferenceDefinitionAtCandidate,
    wrapReferenceDependencyAtCandidate,
    nextReferenceDependencyNumber,
    replaceReferenceOccurrenceValues,
    referenceDefinitionsById,
    referenceUsesById,
    referenceDependenciesById
  };
});
