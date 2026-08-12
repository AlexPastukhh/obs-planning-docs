import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const markers = require('../src/reference-object-markers.js');

test('exact candidate search numbers identical same-line matches left-to-right', () => {
  const text = 'Damage 25 / minimum 25 / fallback 25\nNext 25';
  const found = markers.findExactReferenceObjectCandidates(text, '25');
  assert.deepEqual(found.map((item) => [item.line, item.lineOccurrence, item.column]), [
    [1, 1, 8], [1, 2, 21], [1, 3, 35], [2, 1, 6]
  ]);
});

test('definition wrapper changes only the selected exact occurrence', () => {
  const text = 'Damage 25 / minimum 25 / fallback 25';
  const found = markers.findExactReferenceObjectCandidates(text, '25');
  const output = markers.wrapReferenceDefinitionAtCandidate(text, found[1], 'ro_damage1');
  assert.equal(output, 'Damage 25 / minimum <!-- obs-ref:def id="ro_damage1" -->25<!-- /obs-ref:def --> / fallback 25');
  const parsed = markers.parseReferenceMarkers(output);
  assert.equal(parsed.diagnostics.length, 0);
  assert.equal(parsed.occurrences.length, 1);
  assert.equal(parsed.occurrences[0].value, '25');
});

test('candidate search supports exact multiline Markdown and excludes existing markers', () => {
  const block = '| Damage | 25 |\n| Speed | 3 |';
  const text = `${block}\n\n${markers.formatReferenceUse('ro_test1', block)}\n\n${block}`;
  const found = markers.findExactReferenceObjectCandidates(text, block);
  assert.equal(found.length, 2);
  assert.equal(found[0].line, 1);
  assert.ok(found[1].line > found[0].line);
});

test('parser reports malformed, nested, mismatched and duplicate-line uses deterministically', () => {
  const text = [
    '<!-- obs-ref:use id="ro_xxx1" -->a<!-- /obs-ref:use --> <!-- obs-ref:use id="ro_xxx1" -->b<!-- /obs-ref:use -->',
    '<!-- obs-ref:def id="bad" -->x<!-- /obs-ref:def -->',
    '<!-- obs-ref:def id="ro_xxx2" --><!-- obs-ref:use id="ro_xxx2" -->x<!-- /obs-ref:use --><!-- /obs-ref:def -->',
    '<!-- obs-ref:use id=ro_missing_quotes -->x<!-- /obs-ref:use -->'
  ].join('\n');
  const parsed = markers.parseReferenceMarkers(text);
  const uses = parsed.occurrences.filter((item) => item.role === 'use' && item.id === 'ro_xxx1');
  assert.deepEqual(uses.map((item) => item.lineOccurrence), [1, 2]);
  assert.ok(parsed.diagnostics.some((item) => item.kind === 'invalid_id'));
  assert.ok(parsed.diagnostics.some((item) => item.kind === 'nested_marker'));
  assert.ok(parsed.diagnostics.some((item) => item.kind === 'malformed_marker'));
});

test('replaceReferenceOccurrenceValues updates only marker inner values', () => {
  const text = `A ${markers.formatReferenceUse('ro_xxx1', 'old')} B ${markers.formatReferenceUse('ro_xxx1', 'old')}`;
  const parsed = markers.parseReferenceMarkers(text);
  const output = markers.replaceReferenceOccurrenceValues(text, parsed.occurrences.map((item) => ({ contentStart: item.contentStart, contentEnd: item.contentEnd, value: 'new' })));
  assert.equal(output, `A ${markers.formatReferenceUse('ro_xxx1', 'new')} B ${markers.formatReferenceUse('ro_xxx1', 'new')}`);
});

test('generated Reference Object ids are stable-format ids', () => {
  assert.equal(markers.createReferenceObjectId(() => 'ABCDEF012345FFFF'), 'ro_abcdef012345');
  assert.equal(markers.normalizeReferenceObjectId('ro_abcdef012345'), 'ro_abcdef012345');
});

test('markers and exact candidates inside fenced or inline code are ignored', () => {
  const literal = markers.formatReferenceDefinition('ro_code1', '25');
  const text = [
    'Real 25',
    '',
    '```text',
    literal,
    '25',
    '```',
    '',
    `Inline \`${literal}\` and \`25\`.`
  ].join('\n');
  const parsed = markers.parseReferenceMarkers(text);
  assert.equal(parsed.occurrences.length, 0);
  assert.equal(parsed.diagnostics.length, 0);
  const found = markers.findExactReferenceObjectCandidates(text, '25');
  assert.deepEqual(found.map((item) => [item.line, item.lineOccurrence]), [[1, 1]]);
});

test('definition wrapping and use replacement preserve CRLF outside exact changed ranges', () => {
  const source = 'Header\r\nDamage 25\r\nTail\r\n';
  const found = markers.findExactReferenceObjectCandidates(source, '25');
  const wrapped = markers.wrapReferenceDefinitionAtCandidate(source, found[0], 'ro_crlf1');
  assert.equal(wrapped, 'Header\r\nDamage <!-- obs-ref:def id="ro_crlf1" -->25<!-- /obs-ref:def -->\r\nTail\r\n');
  const useSource = 'Header\r\nValue <!-- obs-ref:use id="ro_crlf1" -->old<!-- /obs-ref:use -->\r\nTail\r\n';
  const parsed = markers.parseReferenceMarkers(useSource);
  const replaced = markers.replaceReferenceOccurrenceValues(useSource, [{ contentStart: parsed.occurrences[0].contentStart, contentEnd: parsed.occurrences[0].contentEnd, value: 'new' }]);
  assert.equal(replaced, 'Header\r\nValue <!-- obs-ref:use id="ro_crlf1" -->new<!-- /obs-ref:use -->\r\nTail\r\n');
});
