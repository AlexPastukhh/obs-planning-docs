(function (root, factory) {
  const api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function (root) {
  'use strict';

  function dependencies() {
    const api = root.ObsLinkedNotes || {};
    for (const name of ['parseReferenceMarkers', 'parseOrderedReferenceLists', 'createOrderedReferenceListId', 'createOrderedReferenceItemId', 'formatOrderedReferenceListMarker', 'formatOrderedReferenceItem']) {
      if (typeof api[name] !== 'function') throw new Error(`Ordered Reference List dependency is unavailable: ${name}.`);
    }
    return api;
  }

  function lineBounds(text, offset) {
    let start = Math.max(0, Math.min(text.length, Number(offset) || 0));
    while (start > 0 && text[start - 1] !== '\n' && text[start - 1] !== '\r') start -= 1;
    let end = start;
    while (end < text.length && text[end] !== '\n' && text[end] !== '\r') end += 1;
    return { start, end };
  }

  function previousLine(text, start) {
    if (start <= 0) return null;
    let end = start;
    if (text[end - 1] === '\n') {
      end -= 1;
      if (end > 0 && text[end - 1] === '\r') end -= 1;
    } else if (text[end - 1] === '\r') {
      end -= 1;
    }
    let lineStart = end;
    while (lineStart > 0 && text[lineStart - 1] !== '\n' && text[lineStart - 1] !== '\r') lineStart -= 1;
    return { start: lineStart, end };
  }

  function nextLine(text, end) {
    let start = end;
    if (text[start] === '\r') start += 1;
    if (text[start] === '\n') start += 1;
    return start < text.length ? lineBounds(text, start) : null;
  }

  function paragraphBounds(text, offset) {
    let current = lineBounds(text, offset);
    if (!text.slice(current.start, current.end).trim()) throw new Error('A Reference Object use on a blank line cannot define an Ordered paragraph item.');
    let start = current.start;
    let end = current.end;
    let prior = previousLine(text, start);
    while (prior && text.slice(prior.start, prior.end).trim()) { start = prior.start; prior = previousLine(text, start); }
    let following = nextLine(text, end);
    while (following && text.slice(following.start, following.end).trim()) { end = following.end; following = nextLine(text, end); }
    return { start, end };
  }

  function orderedReferenceUnitRange(text, occurrence, unit) {
    if (!occurrence || occurrence.role !== 'use') throw new Error('Select a Reference Object use occurrence.');
    const range = unit === 'paragraph' ? paragraphBounds(text, occurrence.fullStart) : lineBounds(text, occurrence.fullStart);
    if (occurrence.fullStart < range.start || occurrence.fullEnd > range.end) throw new Error(`Selected Reference Object use does not fit its ${unit} range.`);
    return { ...range, unit: unit === 'paragraph' ? 'paragraph' : 'line' };
  }

  function containerSignature(content) {
    const first = String(content || '').split(/\r?\n/, 1)[0];
    const match = first.match(/^(\s*(?:(?:>\s*)|(?:[-+*]\s+)|(?:\d+[.)]\s+))*)/);
    return String(match && match[1] || '').replace(/\d+(?=[.)])/g, '#');
  }

  function createOrderedReferenceList(input = {}) {
    const api = dependencies();
    const text = String(input.content == null ? '' : input.content);
    const parsedRefs = api.parseReferenceMarkers(text);
    const parsedOrdered = api.parseOrderedReferenceLists(text);
    if (parsedRefs.diagnostics.length) throw new Error('Repair malformed Reference Object markers before creating an Ordered Reference List.');
    if (parsedOrdered.diagnostics.length) throw new Error('Repair malformed Ordered Reference List markers before creating another list.');
    const selected = Array.isArray(input.selectedUses) ? input.selectedUses : [];
    if (!selected.length) throw new Error('Select at least one Reference Object use.');
    const listId = input.listId || api.createOrderedReferenceListId(input.randomSource);
    if (parsedOrdered.lists.some((list) => list.id === listId)) throw new Error(`Ordered Reference List id already exists: ${listId}.`);
    const mode = api.normalizeOrderedSortMode(input.mode || 'natural');
    const ranges = [];
    const warnings = [];
    const usedItemIds = new Set(parsedOrdered.items.map((item) => item.id));
    for (const selection of selected) {
      const occurrence = parsedRefs.occurrences.find((item) => item.role === 'use' && item.fullStart === Number(selection.fullStart));
      if (!occurrence) throw new Error('A selected Reference Object use no longer exists at the checked location.');
      const range = orderedReferenceUnitRange(text, occurrence, selection.unit === 'paragraph' ? 'paragraph' : 'line');
      const usesInRange = parsedRefs.occurrences.filter((item) => item.role === 'use' && item.fullStart >= range.start && item.fullEnd <= range.end);
      if (usesInRange.length !== 1) throw new Error(`Each Ordered Item ${range.unit} must contain exactly one Reference Object use.`);
      if (parsedOrdered.items.some((item) => range.start < item.fullEnd && range.end > item.fullStart)) throw new Error('Selected content is already inside an Ordered Reference Item.');
      const freshness = String(selection.freshness || 'unknown');
      if (freshness !== 'current') warnings.push({ kind: 'stale_or_unresolved_use', refId: occurrence.id, offset: occurrence.fullStart, freshness, message: `Ordered Item was created with a ${freshness} Reference Object use; ordering stays blocked until refreshed.` });
      let itemId = '';
      for (let attempt = 0; attempt < 8 && !itemId; attempt += 1) {
        const candidate = api.createOrderedReferenceItemId(input.randomSource);
        if (!usedItemIds.has(candidate)) itemId = candidate;
      }
      if (!itemId) throw new Error('Could not allocate a unique Ordered Reference Item id.');
      usedItemIds.add(itemId);
      ranges.push({ ...range, refId: occurrence.id, occurrence, freshness, itemId });
    }
    ranges.sort((left, right) => left.start - right.start);
    for (let index = 1; index < ranges.length; index += 1) if (ranges[index].start < ranges[index - 1].end) throw new Error('Selected Ordered Item ranges overlap. Choose one Reference Object use per line or paragraph.');
    const signatures = new Set(ranges.map((range) => containerSignature(text.slice(range.start, range.end))));
    if (signatures.size > 1) throw new Error('Selected Ordered Items use incompatible Markdown container prefixes.');
    let output = text;
    for (const range of [...ranges].reverse()) {
      const wrapped = api.formatOrderedReferenceItem({ id: range.itemId, list: listId, unit: range.unit, ref: range.refId }, text.slice(range.start, range.end));
      output = `${output.slice(0, range.start)}${wrapped}${output.slice(range.end)}`;
    }
    const insertion = ranges[0].start;
    const eol = text.includes('\r\n') ? '\r\n' : '\n';
    const separator = ranges[0].unit === 'paragraph' ? `${eol}${eol}` : eol;
    output = `${output.slice(0, insertion)}${api.formatOrderedReferenceListMarker({ id: listId, mode, locale: input.locale || 'und' })}${separator}${output.slice(insertion)}`;
    return { kind: 'ordered-reference-list-create-v1', content: output, listId, mode, itemCount: ranges.length, warnings };
  }

  function validateItemUnit(text, item) {
    const bounds = item.unit === 'paragraph' ? paragraphBounds(text, item.fullStart) : lineBounds(text, item.fullStart);
    return bounds.start === item.fullStart && bounds.end === item.fullEnd;
  }

  function inspectOrderedReferenceList(content, listId, options = {}) {
    const api = dependencies();
    const text = String(content == null ? '' : content);
    const parsed = api.parseOrderedReferenceLists(text);
    const list = parsed.lists.find((item) => item.id === listId);
    if (!list) throw new Error(`Ordered Reference List not found: ${listId}.`);
    const items = parsed.items.filter((item) => item.listId === listId).sort((left, right) => left.fullStart - right.fullStart);
    const diagnostics = [...parsed.diagnostics];
    const currentValues = options.currentValues instanceof Map ? options.currentValues : new Map(Object.entries(options.currentValues || {}));
    for (const item of items) {
      const references = api.parseReferenceMarkers(item.content);
      const uses = references.occurrences.filter((occurrence) => occurrence.role === 'use');
      if (references.diagnostics.length || uses.length !== 1 || uses[0] && uses[0].id !== item.refId) diagnostics.push({ kind: 'invalid_item_reference', itemId: item.id, message: 'Ordered Item must contain exactly its declared Reference Object use.' });
      if (!validateItemUnit(text, item)) diagnostics.push({ kind: 'invalid_item_unit', itemId: item.id, message: `Ordered Item does not occupy exactly one ${item.unit}.` });
      const expected = currentValues.get(item.refId);
      item.sortValue = expected == null ? uses[0] && uses[0].value || '' : String(expected);
      item.freshness = expected == null ? 'unresolved' : uses[0] && uses[0].value === String(expected) ? 'current' : 'stale';
      if (item.freshness !== 'current') diagnostics.push({ kind: 'stale_ordered_reference_use', itemId: item.id, refId: item.refId, message: `Ordered Item ${item.id} has a ${item.freshness} Reference Object use.` });
    }
    const signatures = new Set(items.map((item) => containerSignature(item.content)));
    if (signatures.size > 1) diagnostics.push({ kind: 'incompatible_item_containers', listId, message: 'Ordered Items use incompatible Markdown container prefixes.' });
    return { kind: 'ordered-reference-list-inspection-v1', list, items, diagnostics, blocked: diagnostics.length > 0 };
  }

  function comparatorFor(list, options = {}) {
    const locale = list.locale === 'und' ? undefined : list.locale;
    if (list.mode === 'number') return (left, right) => {
      const a = String(left.sortValue).match(/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))/);
      const b = String(right.sortValue).match(/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))/);
      if (!a || !b) { const error = new Error('Number ordering requires every current Reference Object value to start with a number.'); error.kind = 'ordered_number_guard'; throw error; }
      return Number(a[1]) - Number(b[1]);
    };
    if (list.mode === 'alphabetical') {
      const collator = new Intl.Collator(locale, { numeric: false, sensitivity: 'base' });
      return (left, right) => collator.compare(String(left.sortValue), String(right.sortValue));
    }
    if (list.mode === 'custom') {
      const order = Array.isArray(options.customOrder) ? options.customOrder.map(String) : [];
      if (!order.length) throw new Error('Custom ordering requires an explicit ordered list of exact current values; executable comparator code is not accepted.');
      const ranks = new Map();
      order.forEach((value, index) => { if (!ranks.has(value)) ranks.set(value, index); });
      return (left, right) => {
        if (!ranks.has(String(left.sortValue)) || !ranks.has(String(right.sortValue))) { const error = new Error('Custom ordering must include every exact current Reference Object value.'); error.kind = 'ordered_custom_guard'; throw error; }
        const a = ranks.get(String(left.sortValue));
        const b = ranks.get(String(right.sortValue));
        return a - b;
      };
    }
    const collator = new Intl.Collator(locale, { numeric: true, sensitivity: 'base' });
    return (left, right) => collator.compare(String(left.sortValue), String(right.sortValue));
  }

  function orderOrderedReferenceList(content, listId, options = {}) {
    const text = String(content == null ? '' : content);
    const inspection = inspectOrderedReferenceList(text, listId, options);
    if (inspection.blocked) { const error = new Error('Ordered Reference List has stale, unresolved or structurally invalid items. Refresh/repair them before ordering.'); error.kind = 'ordered_list_blocked'; error.diagnostics = inspection.diagnostics; throw error; }
    const compare = comparatorFor(inspection.list, options);
    const ranked = inspection.items.map((item, index) => ({ item, index }));
    for (const entry of ranked) compare(entry.item, entry.item);
    ranked.sort((left, right) => compare(left.item, right.item) || left.index - right.index);
    const blocks = ranked.map(({ item }) => text.slice(item.fullStart, item.fullEnd));
    let output = text;
    for (let index = inspection.items.length - 1; index >= 0; index -= 1) {
      const slot = inspection.items[index];
      output = `${output.slice(0, slot.fullStart)}${blocks[index]}${output.slice(slot.fullEnd)}`;
    }
    return { kind: 'ordered-reference-list-order-v1', content: output, listId, mode: inspection.list.mode, itemCount: inspection.items.length, changed: output !== text };
  }

  return { orderedReferenceUnitRange, createOrderedReferenceList, inspectOrderedReferenceList, orderOrderedReferenceList, orderedReferenceContainerSignature: containerSignature };
});
