(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const CHAT_RESPONSE_READER_SCHEMA_VERSION = 1;
  const READER_SOURCE_KINDS = new Set(['paste', 'chat-dom']);
  const READER_SOURCE_ACCURACY = new Set(['exact', 'derived']);

  function normalizeReaderSourceKind(value) {
    return READER_SOURCE_KINDS.has(String(value || '')) ? String(value) : 'paste';
  }

  function normalizeReaderSourceAccuracy(value, sourceKind = 'paste') {
    const kind = normalizeReaderSourceKind(sourceKind);
    if (kind === 'chat-dom') return 'derived';
    return 'exact';
  }

  function createChatResponseReaderState(input = {}) {
    const sourceKind = normalizeReaderSourceKind(input.sourceKind);
    return {
      schemaVersion: CHAT_RESPONSE_READER_SCHEMA_VERSION,
      open: Boolean(input.open),
      mode: input.mode === 'rendered' ? 'rendered' : 'paste',
      sourceKind,
      sourceAccuracy: normalizeReaderSourceAccuracy(input.sourceAccuracy, sourceKind),
      conversationKey: String(input.conversationKey || ''),
      messageKey: String(input.messageKey || ''),
      markdown: String(input.markdown == null ? '' : input.markdown),
      capturedAt: String(input.capturedAt || ''),
      status: String(input.status || ''),
      renderDiagnostics: Array.isArray(input.renderDiagnostics) ? input.renderDiagnostics.map((item) => ({ ...item })) : []
    };
  }

  function childNodes(node) {
    return node && node.childNodes ? Array.from(node.childNodes) : [];
  }

  function childElements(node) {
    return childNodes(node).filter((item) => item && Number(item.nodeType) === 1);
  }

  function tagName(node) {
    return String(node && (node.tagName || node.nodeName) || '').toLowerCase();
  }

  function attribute(node, name) {
    if (!node || typeof node.getAttribute !== 'function') return '';
    const value = node.getAttribute(name);
    return value == null ? '' : String(value);
  }

  function textContent(node) {
    return String(node && node.textContent != null ? node.textContent : '');
  }

  function maxBacktickRun(value) {
    let maximum = 0;
    for (const match of String(value || '').matchAll(/`+/g)) maximum = Math.max(maximum, match[0].length);
    return maximum;
  }

  function inlineCode(value) {
    const text = String(value == null ? '' : value);
    const fence = '`'.repeat(Math.max(1, maxBacktickRun(text) + 1));
    const padded = /^\s|\s$/.test(text) ? ` ${text} ` : text;
    return `${fence}${padded}${fence}`;
  }

  function safeHref(value) {
    const href = String(value || '').trim();
    if (!href || href === '#') return '';
    if (/^(?:javascript|vbscript|data|blob|file|filesystem|chrome):/i.test(href)) return '';
    return href;
  }

  function markdownTableCell(value) {
    return String(value == null ? '' : value).replace(/\|/g, '\\|').replace(/\s*\n\s*/g, ' ').trim();
  }

  function descendantRows(table) {
    const rows = [];
    const walk = (node) => {
      for (const child of childElements(node)) {
        if (tagName(child) === 'tr') rows.push(child);
        else walk(child);
      }
    };
    walk(table);
    return rows;
  }

  function serializeChatResponseDom(rootNode) {
    const diagnostics = [];

    function note(kind, detail = {}) {
      diagnostics.push({ kind, ...detail });
    }

    function serializeChildren(node, context = {}) {
      return childNodes(node).map((child) => serializeNode(child, context)).join('');
    }

    function serializeList(node, ordered) {
      const items = childElements(node).filter((child) => tagName(child) === 'li');
      return `${items.map((item, index) => {
        const body = serializeChildren(item, { listItem: true }).trim();
        const prefix = ordered ? `${index + 1}. ` : '- ';
        const lines = body.split('\n');
        return `${prefix}${lines[0] || ''}${lines.slice(1).map((line) => `\n  ${line}`).join('')}`;
      }).join('\n')}\n\n`;
    }

    function serializeTable(node) {
      const rows = descendantRows(node).map((row) => childElements(row).filter((cell) => ['th', 'td'].includes(tagName(cell))).map((cell) => markdownTableCell(serializeChildren(cell).trim())));
      if (!rows.length) return '';
      const width = Math.max(...rows.map((row) => row.length));
      const normalized = rows.map((row) => [...row, ...Array(Math.max(0, width - row.length)).fill('')]);
      const header = normalized[0];
      const body = normalized.slice(1);
      return `| ${header.join(' | ')} |\n| ${header.map(() => '---').join(' | ')} |\n${body.map((row) => `| ${row.join(' | ')} |`).join('\n')}${body.length ? '\n' : ''}\n`;
    }

    function serializeDetails(node) {
      const children = childElements(node);
      const summary = children.find((child) => tagName(child) === 'summary');
      if (!summary) {
        note('details-without-summary');
        return serializeChildren(node);
      }
      const summaryMarkdown = serializeChildren(summary).trim() || textContent(summary).trim();
      const body = childNodes(node)
        .filter((child) => child !== summary)
        .map((child) => serializeNode(child, {}))
        .join('')
        .trim();
      const open = Boolean(node && (node.open === true || (typeof node.hasAttribute === 'function' && node.hasAttribute('open'))));
      return `<details${open ? ' open' : ''}>\n<summary>${summaryMarkdown}</summary>\n\n${body}\n\n</details>\n\n`;
    }

    function serializeNode(node, context = {}) {
      if (!node) return '';
      if (Number(node.nodeType) === 3) return String(node.nodeValue != null ? node.nodeValue : textContent(node));
      if (Number(node.nodeType) !== 1) return '';
      if (typeof node.hasAttribute === 'function' && node.hasAttribute('data-obs-chat-response-reader-action')) return '';
      const tag = tagName(node);
      if (!tag) return '';

      if (['script', 'style', 'svg', 'canvas', 'noscript', 'template'].includes(tag)) {
        note('omitted-element', { tag });
        return '';
      }
      if (tag === 'br') return '\n';
      if (tag === 'hr') return '\n---\n\n';
      if (/^h[1-6]$/.test(tag)) return `${'#'.repeat(Number(tag.slice(1)))} ${serializeChildren(node).trim()}\n\n`;
      if (tag === 'p') return `${serializeChildren(node).trim()}\n\n`;
      if (tag === 'strong' || tag === 'b') return `**${serializeChildren(node)}**`;
      if (tag === 'em' || tag === 'i') return `*${serializeChildren(node)}*`;
      if (tag === 'del' || tag === 's' || tag === 'strike') return `~~${serializeChildren(node)}~~`;
      if (tag === 'code' && tagName(node.parentNode) !== 'pre') return inlineCode(textContent(node));
      if (tag === 'pre') {
        const codeChild = childElements(node).find((child) => tagName(child) === 'code');
        const content = textContent(codeChild || node).replace(/\n$/, '');
        const className = String(codeChild && codeChild.className || '');
        const languageMatch = className.match(/(?:^|\s)language-([A-Za-z0-9_+-]+)/);
        const ticks = '`'.repeat(Math.max(3, maxBacktickRun(content) + 1));
        return `${ticks}${languageMatch ? languageMatch[1] : ''}\n${content}\n${ticks}\n\n`;
      }
      if (tag === 'blockquote') {
        const body = serializeChildren(node).trim();
        return `${body.split('\n').map((line) => `> ${line}`).join('\n')}\n\n`;
      }
      if (tag === 'ul') return serializeList(node, false);
      if (tag === 'ol') return serializeList(node, true);
      if (tag === 'li') return serializeChildren(node, { listItem: true });
      if (tag === 'a') {
        const label = serializeChildren(node).trim() || textContent(node).trim();
        const href = safeHref(attribute(node, 'href'));
        if (!href) return label;
        return `[${label}](${href})`;
      }
      if (tag === 'img') {
        const alt = attribute(node, 'alt');
        const src = safeHref(attribute(node, 'src'));
        if (!src) {
          if (alt) return alt;
          note('image-without-portable-source');
          return '';
        }
        return `![${alt}](${src})`;
      }
      if (tag === 'table') return serializeTable(node);
      if (tag === 'details') return serializeDetails(node);
      if (tag === 'summary') return serializeChildren(node);
      if (tag === 'button') return '';
      if (['div', 'span', 'article', 'section', 'main', 'header', 'footer'].includes(tag)) return serializeChildren(node, context);

      note('unrecognized-element', { tag });
      return serializeChildren(node, context);
    }

    const raw = serializeNode(rootNode, {});
    const markdown = String(raw || '')
      .replace(/\u00a0/g, ' ')
      .replace(/[ \t]+\n/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
    if (!markdown) note('empty-derived-markdown');
    return { markdown, diagnostics };
  }

  return {
    CHAT_RESPONSE_READER_SCHEMA_VERSION,
    normalizeReaderSourceKind,
    normalizeReaderSourceAccuracy,
    createChatResponseReaderState,
    serializeChatResponseDom,
    inlineCode
  };
});
