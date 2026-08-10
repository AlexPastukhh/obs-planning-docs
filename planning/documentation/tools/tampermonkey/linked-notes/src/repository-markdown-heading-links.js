(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  function normalizeMarkdownText(value) {
    return String(value == null ? '' : value).replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  }

  const BASIC_NAMED_ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" };

  function decodeNumericCharacterReference(match, code, radix) {
    const numeric = parseInt(code, radix);
    if (!Number.isFinite(numeric) || numeric === 0 || numeric > 0x10FFFF || (numeric >= 0xD800 && numeric <= 0xDFFF)) return '\uFFFD';
    try { return String.fromCodePoint(numeric); } catch { return '\uFFFD'; }
  }

  function decodeHeadingEntities(value, options = {}) {
    const text = String(value == null ? '' : value);
    const documentLike = options.documentLike || (typeof document !== 'undefined' ? document : null);
    if (documentLike && typeof documentLike.createElement === 'function') {
      const textarea = documentLike.createElement('textarea');
      if (textarea) {
        textarea.innerHTML = text;
        if (typeof textarea.value === 'string') return textarea.value;
        if (typeof textarea.textContent === 'string') return textarea.textContent;
      }
    }
    return text
      .replace(/&#x([0-9a-f]{1,6});/gi, (match, code) => decodeNumericCharacterReference(match, code, 16))
      .replace(/&#([0-9]{1,7});/g, (match, code) => decodeNumericCharacterReference(match, code, 10))
      .replace(/&(amp|lt|gt|quot|apos);/gi, (match, name) => BASIC_NAMED_ENTITIES[name.toLowerCase()] || match);
  }

  function codeSpanPlaceholder(index) {
    return `\uE000obs-code-span-${index}\uE001`;
  }

  function normalizeCodeSpanContent(value) {
    let text = normalizeMarkdownText(value).replace(/\n/g, ' ');
    if (/^ .* $/.test(text) && /[^ ]/.test(text)) text = text.slice(1, -1);
    return text;
  }

  function protectCodeSpans(value) {
    const source = String(value == null ? '' : value);
    const spans = [];
    let output = '';
    let index = 0;

    while (index < source.length) {
      if (source[index] !== '`') {
        output += source[index++];
        continue;
      }

      let openingEnd = index + 1;
      while (openingEnd < source.length && source[openingEnd] === '`') openingEnd += 1;
      const openingLength = openingEnd - index;
      let cursor = openingEnd;
      let closingStart = -1;
      let closingEnd = -1;

      while (cursor < source.length) {
        if (source[cursor] !== '`') {
          cursor += 1;
          continue;
        }
        let runEnd = cursor + 1;
        while (runEnd < source.length && source[runEnd] === '`') runEnd += 1;
        if (runEnd - cursor === openingLength) {
          closingStart = cursor;
          closingEnd = runEnd;
          break;
        }
        cursor = runEnd;
      }

      if (closingStart < 0) {
        output += source.slice(index, openingEnd);
        index = openingEnd;
        continue;
      }

      const token = codeSpanPlaceholder(spans.length);
      spans.push(normalizeCodeSpanContent(source.slice(openingEnd, closingStart)));
      output += token;
      index = closingEnd;
    }

    return { text: output, spans };
  }

  function restoreCodeSpans(value, spans) {
    let text = String(value == null ? '' : value);
    for (let index = 0; index < spans.length; index += 1) {
      text = text.split(codeSpanPlaceholder(index)).join(spans[index]);
    }
    return text;
  }

  function stripInlineMarkdown(value, options = {}) {
    const protectedCode = protectCodeSpans(String(value == null ? '' : value).trim());
    let text = protectedCode.text;
    text = text.replace(/[ \t]+#+[ \t]*$/, '').trim();
    text = text.replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1');
    text = text.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');
    text = text.replace(/!\[([^\]]*)\]\[[^\]]*\]/g, '$1');
    text = text.replace(/\[([^\]]+)\]\[[^\]]*\]/g, '$1');
    text = text.replace(/<[^>]+>/g, '');
    text = decodeHeadingEntities(text, options);
    text = text.replace(/\\([!"#$%&'()*+,\-./:;<=>?@[\]^_`{|}~\\])/g, '$1');
    text = text.replace(/[~*_]+/g, '');
    text = restoreCodeSpans(text, protectedCode.spans);
    return text.replace(/[ \t\n]+/g, ' ').trim();
  }

  function githubHeadingBaseAnchor(value, options = {}) {
    const text = stripInlineMarkdown(value, options).toLowerCase();
    return text
      .trim()
      .replace(/ /g, '-')
      .replace(/[^\p{L}\p{N}\p{M}_-]/gu, '');
  }

  function uniqueHeadingAnchor(base, used) {
    if (!base) return '';
    let candidate = base;
    let suffix = 1;
    while (used.has(candidate)) candidate = `${base}-${suffix++}`;
    used.add(candidate);
    return candidate;
  }

  function leadingSpaces(value) {
    const match = String(value || '').match(/^ */);
    return match ? match[0].length : 0;
  }

  function stripBlockQuotePrefix(line) {
    let rest = String(line == null ? '' : line);
    let depth = 0;
    while (true) {
      const match = rest.match(/^ {0,3}>[ \t]?/);
      if (!match) break;
      rest = rest.slice(match[0].length);
      depth += 1;
    }
    return { rest, depth };
  }

  function scanContainerLine(rawLine, state) {
    const quote = stripBlockQuotePrefix(rawLine);
    if (quote.depth !== state.quoteDepth) state.listIndents = [];
    state.quoteDepth = quote.depth;
    const rest = quote.rest;
    const blank = !rest.trim();
    if (blank) {
      return { content: '', key: `q${quote.depth}/l${state.listIndents.join('.')}`, blank: true, indentedCode: false };
    }

    const indent = leadingSpaces(rest);
    while (state.listIndents.length && indent < state.listIndents[state.listIndents.length - 1]) state.listIndents.pop();
    const base = state.listIndents.length ? state.listIndents[state.listIndents.length - 1] : 0;
    const afterBase = rest.slice(Math.min(base, rest.length));
    const list = afterBase.match(/^( {0,3})((?:[*+-])|(?:\d{1,9}[.)]))([ \t]{1,4})(.*)$/);
    if (list) {
      const contentIndent = base + list[1].length + list[2].length + list[3].length;
      state.listIndents.push(contentIndent);
      return {
        content: list[4],
        key: `q${quote.depth}/l${state.listIndents.join('.')}`,
        blank: !list[4].trim(),
        indentedCode: false
      };
    }

    if (!state.listIndents.length && indent >= 4) {
      return { content: rest, key: `q${quote.depth}/l`, blank: false, indentedCode: true };
    }

    return {
      content: state.listIndents.length ? rest.slice(base) : rest,
      key: `q${quote.depth}/l${state.listIndents.join('.')}`,
      blank: false,
      indentedCode: false
    };
  }

  function isThematicBreak(content) {
    const text = String(content || '').trim();
    if (!text) return false;
    return /^(?:\*\s*){3,}$/.test(text) || /^(?:_\s*){3,}$/.test(text) || /^(?:-\s*){3,}$/.test(text);
  }

  function canStartSetextParagraph(content) {
    const text = String(content || '');
    if (!text.trim()) return false;
    if (/^ {0,3}(?:`{3,}|~{3,})/.test(text)) return false;
    if (/^ {0,3}#{1,6}(?:[ \t]+|$)/.test(text)) return false;
    if (/^ {0,3}\[[^\]]+\]:/.test(text)) return false;
    if (/^ {0,3}<(?:address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul)(?:[ \t/>]|$)/i.test(text)) return false;
    if (isThematicBreak(text)) return false;
    return true;
  }

  function canLazyContinueContainerParagraph(rawLine) {
    const text = String(rawLine == null ? '' : rawLine);
    if (!text.trim() || /^(?: {4}|\t)/.test(text)) return false;
    if (/^ {0,3}>/.test(text)) return false;
    if (/^ {0,3}(?:`{3,}|~{3,})/.test(text)) return false;
    if (/^ {0,3}#{1,6}(?:[ \t]+|$)/.test(text)) return false;
    if (/^ {0,3}(?:(?:[*+-])|(?:\d{1,9}[.)]))(?:[ \t]+|$)/.test(text)) return false;
    if (/^ {0,3}(?:=+|-+)[ \t]*$/.test(text)) return false;
    if (/^ {0,3}\[[^\]]+\]:/.test(text)) return false;
    if (isThematicBreak(text)) return false;
    return canStartSetextParagraph(text);
  }

  function extractRepositoryMarkdownHeadings(markdown, options = {}) {
    const text = normalizeMarkdownText(markdown);
    const headings = [];
    const used = new Set();
    const state = { quoteDepth: 0, listIndents: [] };
    let fence = null;
    let paragraph = null;

    const appendHeading = (level, rawText) => {
      const displayText = stripInlineMarkdown(rawText, options);
      const base = githubHeadingBaseAnchor(rawText, options);
      const anchor = uniqueHeadingAnchor(base, used);
      if (!displayText || !anchor) return;
      headings.push({ level, text: displayText, anchor });
    };

    for (const rawLine of text.split('\n')) {
      const stateBeforeScan = { quoteDepth: state.quoteDepth, listIndents: [...state.listIndents] };
      let scanned = scanContainerLine(rawLine, state);
      if (paragraph && scanned.key !== paragraph.key && canLazyContinueContainerParagraph(rawLine)) {
        state.quoteDepth = stateBeforeScan.quoteDepth;
        state.listIndents = stateBeforeScan.listIndents;
        scanned = { content: String(rawLine).trim(), key: paragraph.key, blank: false, indentedCode: false };
      }
      const line = scanned.content;
      const opening = !scanned.indentedCode && line.match(/^ {0,3}(`{3,}|~{3,})(.*)$/);
      if (fence) {
        const closing = !scanned.indentedCode && scanned.key === fence.key && line.match(/^ {0,3}(`{3,}|~{3,})[ \t]*$/);
        if (closing && closing[1][0] === fence.char && closing[1].length >= fence.length) fence = null;
        paragraph = null;
        continue;
      }
      if (opening) {
        fence = { char: opening[1][0], length: opening[1].length, key: scanned.key };
        paragraph = null;
        continue;
      }
      if (scanned.indentedCode) {
        paragraph = null;
        continue;
      }
      if (scanned.blank) {
        paragraph = null;
        continue;
      }

      const atx = line.match(/^ {0,3}(#{1,6})(?:[ \t]+|$)(.*)$/);
      if (atx) {
        appendHeading(atx[1].length, atx[2]);
        paragraph = null;
        continue;
      }

      const setext = line.match(/^ {0,3}(=+|-+)[ \t]*$/);
      if (setext && !(setext[1] === '-')) {
        if (paragraph && paragraph.key === scanned.key && paragraph.lines.length) {
          appendHeading(setext[1][0] === '=' ? 1 : 2, paragraph.lines.join(' '));
        }
        paragraph = null;
        continue;
      }

      if (!canStartSetextParagraph(line)) {
        paragraph = null;
        continue;
      }
      if (paragraph && paragraph.key === scanned.key) paragraph.lines.push(line.trim());
      else paragraph = { key: scanned.key, lines: [line.trim()] };
    }
    return headings;
  }

  function normalizeRepositoryHeadingPath(path) {
    const text = String(path == null ? '' : path).replace(/\\/g, '/').trim().replace(/^\/+/, '');
    if (!text) throw new TypeError('Repository Markdown path is required.');
    if (/[?#\u0000-\u001f\u007f]/.test(text)) throw new TypeError('Repository Markdown path contains unsupported syntax.');
    const parts = text.split('/');
    if (parts.some((segment) => !segment || segment === '.' || segment === '..')) throw new TypeError('Repository Markdown path must remain inside the repository root.');
    return parts.join('/');
  }

  function encodeRepositoryRootPath(path) {
    return normalizeRepositoryHeadingPath(path).split('/').map((segment) => encodeURIComponent(segment).replace(/[!'()*]/g, (character) => `%${character.charCodeAt(0).toString(16).toUpperCase()}`)).join('/');
  }

  function escapeMarkdownLinkLabel(value) {
    return String(value == null ? '' : value).replace(/\\/g, '\\\\').replace(/\[/g, '\\[').replace(/\]/g, '\\]');
  }

  function repositoryRootHeadingTarget(path, anchor) {
    const normalizedAnchor = String(anchor == null ? '' : anchor).trim();
    if (!normalizedAnchor || /[\s#\u0000-\u001f\u007f]/.test(normalizedAnchor)) throw new TypeError('Repository heading anchor is invalid.');
    return `/${encodeRepositoryRootPath(path)}#${normalizedAnchor}`;
  }

  function repositoryRootHeadingMarkdownLink(path, heading) {
    if (!heading || !heading.text || !heading.anchor) throw new TypeError('Repository heading is required.');
    const target = repositoryRootHeadingTarget(path, heading.anchor);
    return `[${escapeMarkdownLinkLabel(heading.text)}](${target})`;
  }

  function repositoryHeadingLinksForPreview(preview, options = {}) {
    if (!preview || preview.kind !== 'text' || typeof preview.content !== 'string' || !/\.md(?:own)?$/i.test(String(preview.path || ''))) return [];
    return extractRepositoryMarkdownHeadings(preview.content, options).map((heading) => {
      const target = repositoryRootHeadingTarget(preview.path, heading.anchor);
      return { ...heading, target, markdown: repositoryRootHeadingMarkdownLink(preview.path, heading) };
    });
  }

  function writeTampermonkeyClipboardText(value, options = {}) {
    const writer = options.gmSetClipboard || (typeof GM_setClipboard === 'function' ? GM_setClipboard : null);
    const timeoutMs = Number.isFinite(Number(options.timeoutMs)) ? Math.max(1, Number(options.timeoutMs)) : 2000;
    const setTimeoutFn = options.setTimeoutFn || ((fn, ms) => setTimeout(fn, ms));
    const clearTimeoutFn = options.clearTimeoutFn || ((id) => clearTimeout(id));
    if (typeof writer !== 'function') return Promise.reject(new Error('GM_setClipboard is unavailable.'));

    return new Promise((resolve, reject) => {
      let settled = false;
      let timer = null;
      const finish = (error) => {
        if (settled) return;
        settled = true;
        if (timer != null) clearTimeoutFn(timer);
        if (error) reject(error);
        else resolve();
      };
      try {
        timer = setTimeoutFn(() => finish(new Error('Clipboard write was not confirmed.')), timeoutMs);
        writer(String(value == null ? '' : value), 'text', () => finish(null));
      } catch (error) {
        finish(error instanceof Error ? error : new Error(String(error)));
      }
    });
  }

  return {
    normalizeRepositoryHeadingPath,
    decodeRepositoryHeadingEntities: decodeHeadingEntities,
    stripRepositoryHeadingMarkdown: stripInlineMarkdown,
    githubHeadingBaseAnchor,
    extractRepositoryMarkdownHeadings,
    repositoryRootHeadingTarget,
    repositoryRootHeadingMarkdownLink,
    repositoryHeadingLinksForPreview,
    writeTampermonkeyClipboardText
  };
});
