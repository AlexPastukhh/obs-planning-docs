import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const templates = require('../src/repository-file-templates.js');

test('template path must be a direct *.template.md child of the repository template root', () => {
  assert.equal(templates.isRepositoryFileTemplatePath('.linked-notes/templates/character.template.md'), true);
  assert.equal(templates.isRepositoryFileTemplatePath('.linked-notes/templates/README.md'), false);
  assert.equal(templates.isRepositoryFileTemplatePath('.linked-notes/templates/nested/character.template.md'), false);
  assert.equal(templates.isRepositoryFileTemplatePath('other/character.template.md'), false);
  assert.throws(() => templates.normalizeRepositoryFileTemplateCandidatePath('../character.template.md'), /repository-relative|segment/i);
});

test('parser strips only obs-template metadata and preserves literal Markdown body', () => {
  const source = '<!-- obs-template\nname: Character\n-->\n---\ntype: character\nstatus: draft\n---\n\n# Name\n';
  const parsed = templates.parseRepositoryFileTemplate(source, { path: '.linked-notes/templates/character.template.md', sha: 'abc' });
  assert.equal(parsed.name, 'Character');
  assert.equal(parsed.sha, 'abc');
  assert.equal(parsed.body, '---\ntype: character\nstatus: draft\n---\n\n# Name\n');
});

test('parser preserves CRLF and Reference Object markers inside the body exactly', () => {
  const body = '---\r\ntype: combat\r\n---\r\nDamage: <!-- obs-ref:use id="ro_damage" -->25<!-- /obs-ref:use -->\r\n';
  const source = `<!-- obs-template\r\nname: Combat record\r\n-->\r\n${body}`;
  const parsed = templates.parseRepositoryFileTemplate(source, { path: '.linked-notes/templates/combat.template.md' });
  assert.equal(parsed.body, body);
});

test('parser accepts a UTF-8 BOM before metadata but does not copy the BOM into the new document', () => {
  const parsed = templates.parseRepositoryFileTemplate('\uFEFF<!-- obs-template\nname: BOM template\n-->\n# Body\n', { path: '.linked-notes/templates/bom.template.md' });
  assert.equal(parsed.name, 'BOM template');
  assert.equal(parsed.body, '# Body\n');
});

test('malformed or extended v1 metadata is rejected explicitly', () => {
  assert.throws(() => templates.parseRepositoryFileTemplate('# not a template', { path: '.linked-notes/templates/a.template.md' }), /must start/i);
  assert.throws(() => templates.parseRepositoryFileTemplate('<!-- obs-template\n-->\nbody', { path: '.linked-notes/templates/a.template.md' }), /name/i);
  assert.throws(() => templates.parseRepositoryFileTemplate('<!-- obs-template\nname: A\nname: B\n-->\nbody', { path: '.linked-notes/templates/a.template.md' }), /duplicate/i);
  assert.throws(() => templates.parseRepositoryFileTemplate('<!-- obs-template\nname: A\ndescription: x\n-->\nbody', { path: '.linked-notes/templates/a.template.md' }), /unsupported/i);
  assert.throws(() => templates.parseRepositoryFileTemplate('<!-- obs-template name: A -->\nbody', { path: '.linked-notes/templates/a.template.md' }), /followed by a newline/i);
});

test('duplicate display names are omitted from usable templates and reported', () => {
  const result = templates.finalizeRepositoryFileTemplates([
    { path: '.linked-notes/templates/a.template.md', name: 'Character', body: 'a', sha: '1' },
    { path: '.linked-notes/templates/b.template.md', name: 'character', body: 'b', sha: '2' },
    { path: '.linked-notes/templates/c.template.md', name: 'Project', body: 'c', sha: '3' }
  ]);
  assert.deepEqual(result.templates.map((item) => item.name), ['Project']);
  assert.equal(result.diagnostics.length, 2);
  assert.ok(result.diagnostics.every((item) => item.kind === 'duplicate_name'));
});
