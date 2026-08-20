(function (root, factory) {
  const api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function (root) {
  'use strict';

  function apiOrThrow() {
    const api = root.ObsLinkedNotes || {};
    if (typeof api.parseReviewDependencyMarkers !== 'function') throw new Error('Review Dependency marker parser is unavailable.');
    return api;
  }

  function normalizeReviewDependencySourceText(input) {
    const text = String(input == null ? '' : input);
    const parsed = apiOrThrow().parseReviewDependencyMarkers(text);
    const ranges = [...parsed.markers].map((marker) => {
      let start = marker.start;
      let end = marker.end;
      const lineStart = Math.max(text.lastIndexOf('\n', marker.start - 1), text.lastIndexOf('\r', marker.start - 1)) + 1;
      let lineEnd = text.length;
      for (let index = marker.end; index < text.length; index += 1) {
        if (text[index] === '\n' || text[index] === '\r') { lineEnd = index; break; }
      }
      if (!text.slice(lineStart, marker.start).trim() && !text.slice(marker.end, lineEnd).trim()) {
        start = lineStart;
        end = lineEnd;
        if (end < text.length && text[end] === '\r' && text[end + 1] === '\n') end += 2;
        else if (end < text.length) end += 1;
      }
      return { start, end };
    }).sort((a, b) => b.start - a.start);
    let stripped = text;
    for (const range of ranges) stripped = `${stripped.slice(0, range.start)}${stripped.slice(range.end)}`;
    return stripped.replace(/\r\n?/g, '\n');
  }

  async function sha256Hex(input) {
    const bytes = new TextEncoder().encode(String(input == null ? '' : input));
    const cryptoObject = typeof globalThis !== 'undefined' ? globalThis.crypto : null;
    if (!cryptoObject || !cryptoObject.subtle || typeof cryptoObject.subtle.digest !== 'function') throw new Error('SHA-256 Web Crypto is unavailable.');
    const digest = new Uint8Array(await cryptoObject.subtle.digest('SHA-256', bytes));
    return [...digest].map((byte) => byte.toString(16).padStart(2, '0')).join('');
  }

  async function reviewDependencySourceFingerprint(input) {
    return `sha256:${await sha256Hex(normalizeReviewDependencySourceText(input))}`;
  }

  return { normalizeReviewDependencySourceText, reviewDependencySourceFingerprint };
});
