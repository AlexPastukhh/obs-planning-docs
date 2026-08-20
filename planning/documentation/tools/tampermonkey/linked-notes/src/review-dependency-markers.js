(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const REVIEW_DEPENDENCY_ID_PATTERN = /^rd_[A-Za-z0-9][A-Za-z0-9_-]{2,63}$/;
  const REVIEW_FINGERPRINT_PATTERN = /^sha256:[a-f0-9]{64}$/;
  const COMMENT_PATTERN = /<!--[\s\S]*?-->/g;

  function markdownCodeRanges(text) {
    const ranges = [];
    const lines = [];
    let start = 0;
    for (let index = 0; index <= text.length; index += 1) {
      if (index !== text.length && text[index] !== '\n' && text[index] !== '\r') continue;
      let next = index;
      if (index < text.length && text[index] === '\r' && text[index + 1] === '\n') next = index + 2;
      else if (index < text.length) next = index + 1;
      lines.push({ start, end: index, next });
      start = next;
      if (next > index) index = next - 1;
    }
    let fence = null;
    for (const line of lines) {
      const value = text.slice(line.start, line.end);
      if (!fence) {
        const match = value.match(/^ {0,3}(`{3,}|~{3,})(.*)$/);
        if (match) fence = { start: line.start, char: match[1][0], length: match[1].length };
        continue;
      }
      const close = value.match(/^ {0,3}(`+|~+)[ \t]*$/);
      if (!close || close[1][0] !== fence.char || close[1].length < fence.length) continue;
      ranges.push([fence.start, line.next]);
      fence = null;
    }
    if (fence) ranges.push([fence.start, text.length]);
    const inFence = (offset) => ranges.some(([a, b]) => offset >= a && offset < b);
    let index = 0;
    while (index < text.length) {
      if (inFence(index) || text[index] !== '`') { index += 1; continue; }
      let runEnd = index + 1;
      while (runEnd < text.length && text[runEnd] === '`') runEnd += 1;
      const length = runEnd - index;
      let search = runEnd;
      let closeEnd = -1;
      while (search < text.length) {
        if (inFence(search) || text[search] !== '`') { search += 1; continue; }
        let candidateEnd = search + 1;
        while (candidateEnd < text.length && text[candidateEnd] === '`') candidateEnd += 1;
        if (candidateEnd - search === length) { closeEnd = candidateEnd; break; }
        search = candidateEnd;
      }
      if (closeEnd >= 0) { ranges.push([index, closeEnd]); index = closeEnd; }
      else index = runEnd;
    }
    return ranges.sort((a, b) => a[0] - b[0]);
  }

  function inRanges(offset, ranges) {
    return ranges.some(([start, end]) => offset >= start && offset < end);
  }

  function normalizeReviewDependencyId(value) {
    const id = String(value == null ? '' : value).trim();
    if (!REVIEW_DEPENDENCY_ID_PATTERN.test(id)) throw new TypeError(`Invalid Review Dependency id: ${id || '(empty)'}.`);
    return id;
  }

  function normalizeReviewFingerprint(value, options = {}) {
    const fingerprint = String(value == null ? '' : value).trim().toLowerCase();
    if (!fingerprint && options.allowEmpty) return '';
    if (!REVIEW_FINGERPRINT_PATTERN.test(fingerprint)) throw new TypeError(`Invalid Review Dependency fingerprint: ${fingerprint || '(empty)'}.`);
    return fingerprint;
  }

  function randomHex(length, randomSource) {
    if (typeof randomSource === 'function') {
      const value = String(randomSource(length) || '').replace(/[^a-fA-F0-9]/g, '').toLowerCase();
      if (value.length >= length) return value.slice(0, length);
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

  function createReviewDependencyId(randomSource) {
    return `rd_${randomHex(12, randomSource)}`;
  }

  function formatReviewDependencyMarker(id, against = '') {
    const stableId = normalizeReviewDependencyId(id);
    const fingerprint = normalizeReviewFingerprint(against, { allowEmpty: true });
    return `<!-- obs-review:dependency id="${stableId}"${fingerprint ? ` against="${fingerprint}"` : ''} -->`;
  }

  function parseAttributes(body) {
    const attrs = {};
    const pattern = /([A-Za-z][A-Za-z0-9_-]*)\s*=\s*"([^"]*)"/g;
    let match;
    while ((match = pattern.exec(body))) attrs[match[1]] = match[2];
    return attrs;
  }

  function parseReviewDependencyMarkers(input) {
    const text = String(input == null ? '' : input);
    const codeRanges = markdownCodeRanges(text);
    const markers = [];
    const diagnostics = [];
    COMMENT_PATTERN.lastIndex = 0;
    let match;
    while ((match = COMMENT_PATTERN.exec(text))) {
      if (inRanges(match.index, codeRanges)) continue;
      if (!/obs-review:dependency/i.test(match[0])) continue;
      const bodyMatch = match[0].match(/^<!--\s*obs-review:dependency\b([\s\S]*?)-->$/i);
      if (!bodyMatch) {
        diagnostics.push({ kind: 'malformed_marker', offset: match.index, message: 'Malformed obs-review:dependency marker.' });
        continue;
      }
      const attrs = parseAttributes(bodyMatch[1]);
      const unknown = bodyMatch[1].replace(/([A-Za-z][A-Za-z0-9_-]*)\s*=\s*"([^"]*)"/g, '').trim();
      if (unknown) diagnostics.push({ kind: 'malformed_marker', offset: match.index, message: 'Review Dependency marker contains unsupported syntax.' });
      const id = String(attrs.id || '').trim();
      const againstRaw = String(attrs.against || '').trim();
      if (!REVIEW_DEPENDENCY_ID_PATTERN.test(id)) diagnostics.push({ kind: 'invalid_id', offset: match.index, message: 'Review Dependency marker has an invalid id.' });
      if (againstRaw && !REVIEW_FINGERPRINT_PATTERN.test(againstRaw.toLowerCase())) diagnostics.push({ kind: 'invalid_fingerprint', offset: match.index, id, message: 'Review Dependency marker has an invalid against fingerprint.' });
      markers.push({
        id,
        against: againstRaw.toLowerCase(),
        start: match.index,
        end: COMMENT_PATTERN.lastIndex,
        raw: match[0]
      });
    }
    return { text, markers, diagnostics, codeRanges };
  }

  function markerById(input, id) {
    const stableId = normalizeReviewDependencyId(id);
    return parseReviewDependencyMarkers(input).markers.filter((marker) => marker.id === stableId);
  }

  function appendReviewDependencyMarker(input, id, against = '') {
    const text = String(input == null ? '' : input);
    if (markerById(text, id).length) throw new Error(`Review Dependency marker already exists: ${id}.`);
    const marker = formatReviewDependencyMarker(id, against);
    if (!text) return `${marker}\n`;
    const newline = text.endsWith('\n') || text.endsWith('\r') ? '' : '\n';
    return `${text}${newline}${marker}\n`;
  }

  function setReviewDependencyAgainst(input, id, against) {
    const stableId = normalizeReviewDependencyId(id);
    const fingerprint = normalizeReviewFingerprint(against);
    const parsed = parseReviewDependencyMarkers(input);
    const matches = parsed.markers.filter((marker) => marker.id === stableId);
    if (matches.length !== 1) throw new Error(`Review Dependency ${stableId} must have exactly one consumer marker; found ${matches.length}.`);
    const marker = matches[0];
    return `${parsed.text.slice(0, marker.start)}${formatReviewDependencyMarker(stableId, fingerprint)}${parsed.text.slice(marker.end)}`;
  }

  function removeReviewDependencyMarker(input, id) {
    const stableId = normalizeReviewDependencyId(id);
    const parsed = parseReviewDependencyMarkers(input);
    const matches = parsed.markers.filter((marker) => marker.id === stableId);
    if (!matches.length) return parsed.text;
    if (matches.length !== 1) throw new Error(`Review Dependency ${stableId} has duplicate consumer markers.`);
    const marker = matches[0];
    let start = marker.start;
    let end = marker.end;
    if (start > 0 && parsed.text[start - 1] === '\n' && (end === parsed.text.length || parsed.text[end] === '\n')) start -= 1;
    if (end < parsed.text.length && parsed.text[end] === '\n') end += 1;
    return `${parsed.text.slice(0, start)}${parsed.text.slice(end)}`;
  }

  return {
    REVIEW_DEPENDENCY_ID_PATTERN,
    REVIEW_FINGERPRINT_PATTERN,
    normalizeReviewDependencyId,
    normalizeReviewFingerprint,
    createReviewDependencyId,
    formatReviewDependencyMarker,
    parseReviewDependencyMarkers,
    appendReviewDependencyMarker,
    setReviewDependencyAgainst,
    removeReviewDependencyMarker
  };
});
