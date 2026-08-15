import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
require('../src/reference-object-markers.js');
require('../src/ordered-reference-list-markers.js');
const ordered = require('../src/ordered-reference-list-core.js');
const api = globalThis.ObsLinkedNotes;

const ids = ['111111111111', '222222222222', '333333333333'];
function randomSource() { return ids.shift(); }

test('creation wraps whole selected lines and keeps uses nested inside ordered items', () => {
  const content = `Beta <!-- obs-ref:use id="ro_bbbbbbbbbbbb" -->Beta<!-- /obs-ref:use -->\nAlpha <!-- obs-ref:use id="ro_aaaaaaaaaaaa" -->Alpha<!-- /obs-ref:use -->\n`;
  const uses = api.parseReferenceMarkers(content).occurrences.filter((item) => item.role === 'use');
  const result = ordered.createOrderedReferenceList({ content, selectedUses: uses.map((use) => ({ fullStart: use.fullStart, unit: 'line', freshness: 'current' })), mode: 'alphabetical', randomSource });
  const parsed = api.parseOrderedReferenceLists(result.content);
  assert.equal(parsed.lists.length, 1);
  assert.equal(parsed.items.length, 2);
  assert.equal(parsed.diagnostics.length, 0);
  assert.ok(parsed.items.every((item) => api.parseReferenceMarkers(item.content).occurrences.filter((use) => use.role === 'use').length === 1));
});

test('paragraph creation preserves neighboring paragraphs and is immediately structurally valid', () => {
  const content = `Before\n\nPara start <!-- obs-ref:use id="ro_aaaaaaaaaaaa" -->A<!-- /obs-ref:use -->\ncontinued line\n\nAfter\n`;
  const use = api.parseReferenceMarkers(content).occurrences.find((item) => item.role === 'use');
  const generated = ['444444444444', '555555555555'];
  const result = ordered.createOrderedReferenceList({ content, selectedUses: [{ fullStart: use.fullStart, unit: 'paragraph', freshness: 'current' }], mode: 'natural', randomSource: () => generated.shift() });
  const parsed = api.parseOrderedReferenceLists(result.content);
  assert.equal(parsed.items.length, 1);
  assert.equal(parsed.items[0].content, `Para start <!-- obs-ref:use id="ro_aaaaaaaaaaaa" -->A<!-- /obs-ref:use -->\ncontinued line`);
  assert.ok(result.content.startsWith('Before\n\n<!-- obs-order:list'));
  assert.ok(result.content.includes('locale="und" -->\n\n<!-- obs-order:item'));
  assert.ok(result.content.endsWith('\n\nAfter\n'));
  const inspection = ordered.inspectOrderedReferenceList(result.content, result.listId, { currentValues: { ro_aaaaaaaaaaaa: 'A' } });
  assert.equal(inspection.blocked, false);
  assert.equal(inspection.diagnostics.length, 0);
  assert.doesNotThrow(() => ordered.orderOrderedReferenceList(result.content, result.listId, { currentValues: { ro_aaaaaaaaaaaa: 'A' } }));
});

test('natural ordering uses current object values and preserves stable ties', () => {
  const list = 'orl_111111111111';
  const a = api.formatOrderedReferenceItem({ id: 'ori_222222222222', list, unit: 'line', ref: 'ro_bbbbbbbbbbbb' }, `B <!-- obs-ref:use id="ro_bbbbbbbbbbbb" -->item 10<!-- /obs-ref:use -->`);
  const b = api.formatOrderedReferenceItem({ id: 'ori_333333333333', list, unit: 'line', ref: 'ro_aaaaaaaaaaaa' }, `A <!-- obs-ref:use id="ro_aaaaaaaaaaaa" -->item 2<!-- /obs-ref:use -->`);
  const content = `${api.formatOrderedReferenceListMarker({ id: list, mode: 'natural' })}\n${a}\n${b}\n`;
  const result = ordered.orderOrderedReferenceList(content, list, { currentValues: { ro_bbbbbbbbbbbb: 'item 10', ro_aaaaaaaaaaaa: 'item 2' } });
  assert.ok(result.content.indexOf('item 2') < result.content.indexOf('item 10'));
});

test('ordering is blocked for stale uses and number mode requires a leading number', () => {
  const list = 'orl_111111111111';
  const item = api.formatOrderedReferenceItem({ id: 'ori_222222222222', list, unit: 'line', ref: 'ro_aaaaaaaaaaaa' }, `A <!-- obs-ref:use id="ro_aaaaaaaaaaaa" -->old<!-- /obs-ref:use -->`);
  const natural = `${api.formatOrderedReferenceListMarker({ id: list, mode: 'natural' })}\n${item}\n`;
  assert.throws(() => ordered.orderOrderedReferenceList(natural, list, { currentValues: { ro_aaaaaaaaaaaa: 'new' } }), (error) => error.kind === 'ordered_list_blocked');
  const numeric = natural.replace('mode="natural"', 'mode="number"').replace('old', 'alpha');
  assert.throws(() => ordered.orderOrderedReferenceList(numeric, list, { currentValues: { ro_aaaaaaaaaaaa: 'alpha' } }), (error) => error.kind === 'ordered_number_guard');
});
