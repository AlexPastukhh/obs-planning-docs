(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const START = '<!-- obs-linked-note:v1';
  const END = '-->';

  function safeJson(value) {
    return JSON.stringify(value).replace(/--/g, '\\u002d\\u002d');
  }

  function escapeHeading(value) {
    return String(value || '').replace(/\r?\n/g, ' ').trim();
  }

  function metadataFor(note, body) {
    return {
      schemaVersion: 1,
      id: note.id,
      title: note.title || '',
      bodyLength: body.length,
      links: Array.isArray(note.links) ? note.links.map((link) => ({
        id: link.id,
        type: link.type,
        label: link.label || '',
        target: { ...(link.target || {}) }
      })) : [],
      extra: note.codecExtra && typeof note.codecExtra === 'object' ? note.codecExtra : {}
    };
  }

  function visiblePrefix(title) {
    const heading = escapeHeading(title);
    return heading ? `\n# ${heading}\n\n` : '\n';
  }

  function encodeNoteMarkdown(note) {
    if (!note || !note.id) throw new TypeError('Note with stable id is required.');
    const body = typeof note.body === 'string' ? note.body : '';
    if (/obs-pending-image:[A-Za-z0-9._~-]+/.test(body)) {
      throw new Error('Note contains unresolved pending image references. Upload and verify the images before encoding remote Markdown.');
    }
    const metadata = metadataFor(note, body);
    const marker = `${START} ${safeJson(metadata)} ${END}`;
    const trailer = body.endsWith('\n') ? '' : '\n';
    return `${marker}${visiblePrefix(note.title)}${body}${trailer}`;
  }

  function parseMarker(markdown) {
    const text = String(markdown || '').replace(/^\uFEFF/, '');
    const firstLineEnd = text.indexOf('\n');
    const firstLine = (firstLineEnd === -1 ? text : text.slice(0, firstLineEnd)).trim();
    if (!firstLine.startsWith(START) || !firstLine.endsWith(END)) {
      throw new Error('Missing obs-linked-note:v1 metadata marker.');
    }
    const jsonText = firstLine.slice(START.length, -END.length).trim();
    let metadata;
    try {
      metadata = JSON.parse(jsonText);
    } catch (error) {
      throw new Error(`Invalid linked-note metadata JSON: ${error.message}`);
    }
    if (!metadata || metadata.schemaVersion !== 1 || typeof metadata.id !== 'string' || !metadata.id.trim()) {
      throw new Error('Unsupported or incomplete linked-note metadata.');
    }
    return { metadata, rest: firstLineEnd === -1 ? '' : text.slice(firstLineEnd) };
  }

  function decodeBody(metadata, rest) {
    const prefix = visiblePrefix(typeof metadata.title === 'string' ? metadata.title : '');
    if (!rest.startsWith(prefix)) {
      throw new Error('Linked-note visible title/body prefix does not match metadata.');
    }
    const content = rest.slice(prefix.length);
    if (Number.isInteger(metadata.bodyLength) && metadata.bodyLength >= 0) {
      if (metadata.bodyLength > content.length) {
        throw new Error('Linked-note bodyLength exceeds available content.');
      }
      const body = content.slice(0, metadata.bodyLength);
      const trailer = content.slice(metadata.bodyLength);
      if (trailer !== '' && trailer !== '\n') {
        throw new Error('Unexpected linked-note content after the literal body.');
      }
      return body;
    }
    // Compatibility for the initial v1 prototype files created before bodyLength existed.
    return content.replace(/\n$/, '');
  }

  function decodeNoteMarkdown(markdown) {
    const { metadata, rest } = parseMarker(markdown);
    const title = typeof metadata.title === 'string' ? metadata.title : '';
    return {
      id: metadata.id,
      title,
      body: decodeBody(metadata, rest),
      links: Array.isArray(metadata.links) ? metadata.links.map((link) => ({
        id: String(link.id || ''),
        type: String(link.type || ''),
        label: String(link.label || ''),
        target: link.target && typeof link.target === 'object' ? { ...link.target } : {},
        resolution: 'unchecked',
        resolutionMessage: ''
      })) : [],
      codecExtra: metadata.extra && typeof metadata.extra === 'object' ? { ...metadata.extra } : {},
      schemaVersion: 1
    };
  }

  function isLinkedNoteMarkdown(markdown) {
    try {
      parseMarker(markdown);
      return true;
    } catch (error) {
      return false;
    }
  }

  return {
    LINKED_NOTE_MARKER: START,
    encodeNoteMarkdown,
    decodeNoteMarkdown,
    isLinkedNoteMarkdown
  };
});
