(function (root, factory) {
  const api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function (root) {
  'use strict';

  const ORDERED_LIST_ID_PATTERN = /^orl_[a-f0-9]{12}$/;
  const ORDERED_ITEM_ID_PATTERN = /^ori_[a-f0-9]{12}$/;
  const LIST_COMMENT = /<!--\s*obs-order:list\b([\s\S]*?)-->/gi;
  const ITEM_TOKEN = /<!--\s*(\/)?obs-order:item\b([\s\S]*?)-->/gi;

  function attrs(text) {
    const result = {};
    const pattern = /([a-z][a-z0-9-]*)\s*=\s*"([^"]*)"/gi;
    let match;
    while ((match = pattern.exec(String(text || '')))) result[match[1].toLowerCase()] = match[2];
    return result;
  }

  function randomHex(length, randomSource) {
    const supplied = typeof randomSource === 'function' ? String(randomSource(length) || '').replace(/[^a-f0-9]/gi, '').toLowerCase() : '';
    if (supplied.length >= length) return supplied.slice(0, length);
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

  function normalizeId(value, pattern, label) {
    const id = String(value == null ? '' : value).trim();
    if (!pattern.test(id)) throw new TypeError(`Invalid ${label} id: ${id || '(empty)'}.`);
    return id;
  }

  function createOrderedReferenceListId(randomSource) { return `orl_${randomHex(12, randomSource)}`; }
  function createOrderedReferenceItemId(randomSource) { return `ori_${randomHex(12, randomSource)}`; }

  function normalizeOrderedSortMode(value) {
    const mode = String(value || 'natural').trim().toLowerCase();
    if (!['number', 'alphabetical', 'natural', 'custom'].includes(mode)) throw new TypeError(`Unsupported Ordered Reference List sort mode: ${mode}.`);
    return mode;
  }

  function formatOrderedReferenceListMarker(input = {}) {
    const id = normalizeId(input.id, ORDERED_LIST_ID_PATTERN, 'Ordered Reference List');
    const mode = normalizeOrderedSortMode(input.mode);
    const locale = String(input.locale || 'und').replace(/[^A-Za-z0-9-]/g, '') || 'und';
    return `<!-- obs-order:list id="${id}" mode="${mode}" locale="${locale}" -->`;
  }

  function formatOrderedReferenceItemOpen(input = {}) {
    const id = normalizeId(input.id, ORDERED_ITEM_ID_PATTERN, 'Ordered Reference Item');
    const list = normalizeId(input.list, ORDERED_LIST_ID_PATTERN, 'Ordered Reference List');
    const ref = String(input.ref || '').trim();
    if (!/^ro_[a-f0-9]{12}$/.test(ref)) throw new TypeError(`Invalid Reference Object id for Ordered Item: ${ref || '(empty)'}.`);
    const unit = input.unit === 'paragraph' ? 'paragraph' : input.unit === 'line' ? 'line' : '';
    if (!unit) throw new TypeError('Ordered Reference Item unit must be line or paragraph.');
    return `<!-- obs-order:item id="${id}" list="${list}" unit="${unit}" ref="${ref}" -->`;
  }

  function formatOrderedReferenceItem(input = {}, content = '') {
    return `${formatOrderedReferenceItemOpen(input)}${String(content == null ? '' : content)}<!-- /obs-order:item -->`;
  }

  function codeRanges(text) {
    const api = root.ObsLinkedNotes || {};
    return typeof api.markdownCodeRanges === 'function' ? api.markdownCodeRanges(text) : [];
  }

  function inRanges(offset, ranges) { return ranges.some(([start, end]) => offset >= start && offset < end); }

  function parseOrderedReferenceLists(input) {
    const text = String(input == null ? '' : input);
    const blocked = codeRanges(text);
    const diagnostics = [];
    const lists = [];
    const items = [];
    const seenLists = new Set();
    const seenItems = new Set();
    const recognizedStarts = new Set();
    let match;
    LIST_COMMENT.lastIndex = 0;
    while ((match = LIST_COMMENT.exec(text))) {
      if (inRanges(match.index, blocked)) continue;
      recognizedStarts.add(match.index);
      const values = attrs(match[1]);
      if (!ORDERED_LIST_ID_PATTERN.test(values.id || '') || !['number', 'alphabetical', 'natural', 'custom'].includes(values.mode || '')) {
        diagnostics.push({ kind: 'malformed_list', offset: match.index, message: 'Ordered Reference List marker requires valid id and mode.' });
        continue;
      }
      if (seenLists.has(values.id)) diagnostics.push({ kind: 'duplicate_list', offset: match.index, listId: values.id, message: `Duplicate Ordered Reference List marker ${values.id}.` });
      seenLists.add(values.id);
      lists.push({ id: values.id, mode: values.mode, locale: values.locale || 'und', fullStart: match.index, fullEnd: LIST_COMMENT.lastIndex });
    }

    let active = null;
    ITEM_TOKEN.lastIndex = 0;
    while ((match = ITEM_TOKEN.exec(text))) {
      if (inRanges(match.index, blocked)) continue;
      recognizedStarts.add(match.index);
      const closing = Boolean(match[1]);
      if (!closing) {
        if (active) {
          diagnostics.push({ kind: 'nested_item', offset: match.index, message: 'Ordered Reference Items cannot be nested.' });
          continue;
        }
        const values = attrs(match[2]);
        if (!ORDERED_ITEM_ID_PATTERN.test(values.id || '') || !ORDERED_LIST_ID_PATTERN.test(values.list || '') || !/^ro_[a-f0-9]{12}$/.test(values.ref || '') || !['line', 'paragraph'].includes(values.unit || '')) {
          diagnostics.push({ kind: 'malformed_item', offset: match.index, message: 'Ordered Reference Item marker requires valid id, list, unit and ref.' });
        }
        active = { values, fullStart: match.index, openEnd: ITEM_TOKEN.lastIndex };
      } else if (!active) {
        diagnostics.push({ kind: 'unexpected_item_close', offset: match.index, message: 'Closing Ordered Reference Item has no opener.' });
      } else {
        const item = {
          id: active.values.id || '', listId: active.values.list || '', unit: active.values.unit || '', refId: active.values.ref || '',
          fullStart: active.fullStart, fullEnd: ITEM_TOKEN.lastIndex, contentStart: active.openEnd, contentEnd: match.index,
          content: text.slice(active.openEnd, match.index)
        };
        if (seenItems.has(item.id)) diagnostics.push({ kind: 'duplicate_item', offset: item.fullStart, itemId: item.id, message: `Duplicate Ordered Reference Item id ${item.id}.` });
        seenItems.add(item.id);
        items.push(item);
        active = null;
      }
    }
    if (active) diagnostics.push({ kind: 'unclosed_item', offset: active.fullStart, message: 'Ordered Reference Item is not closed.' });
    const comments = /<!--[\s\S]*?-->/g;
    while ((match = comments.exec(text))) {
      if (inRanges(match.index, blocked) || !/obs-order:/i.test(match[0]) || recognizedStarts.has(match.index)) continue;
      diagnostics.push({ kind: 'malformed_ordered_marker', offset: match.index, message: 'Malformed obs-order marker comment.' });
    }
    for (const item of items) if (!seenLists.has(item.listId)) diagnostics.push({ kind: 'unknown_list', offset: item.fullStart, itemId: item.id, listId: item.listId, message: `Ordered Reference Item refers to missing list ${item.listId}.` });
    return { text, lists, items, diagnostics, codeRanges: blocked };
  }

  return {
    ORDERED_LIST_ID_PATTERN,
    ORDERED_ITEM_ID_PATTERN,
    createOrderedReferenceListId,
    createOrderedReferenceItemId,
    normalizeOrderedSortMode,
    formatOrderedReferenceListMarker,
    formatOrderedReferenceItemOpen,
    formatOrderedReferenceItem,
    parseOrderedReferenceLists
  };
});
