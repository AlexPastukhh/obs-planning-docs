(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function escapeAttribute(value) { return escapeHtml(value).replace(/`/g, '&#96;'); }
  function isExternalHttp(value) {
    try { const url = new URL(String(value || '')); return (url.protocol === 'http:' || url.protocol === 'https:') && Boolean(url.hostname); }
    catch (error) { return false; }
  }
  function isUnsafeScheme(value) { return /^\s*(?:javascript|vbscript|file|filesystem|chrome|data|blob):/i.test(String(value || '')); }
  function normalizeTarget(value) {
    const target = String(value == null ? '' : value).trim();
    if (!target || /[\u0000-\u001f\u007f]/.test(target) || isUnsafeScheme(target)) return '';
    if (/^obs-pending-image:[A-Za-z0-9._~-]+$/.test(target)) return target;
    if (/^[a-z][a-z0-9+.-]*:/i.test(target) && !isExternalHttp(target)) return '';
    return target;
  }
  function parseTitleTarget(raw) {
    const text = String(raw || '').trim();
    const angle = text.match(/^<([^>]+)>(?:\s+["']([^"']*)["'])?$/);
    if (angle) return { target: angle[1], title: angle[2] || '' };
    const quoted = text.match(/^(.*?)(?:\s+["']([^"']*)["'])?$/);
    return { target: quoted ? quoted[1].trim() : text, title: quoted && quoted[2] || '' };
  }
  function parseImgAttributes(source) {
    const allowed = {};
    const text = String(source || '');
    const attrPattern = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
    let match;
    while ((match = attrPattern.exec(text))) {
      const name = match[1].toLowerCase();
      const value = match[2] !== undefined ? match[2] : match[3] !== undefined ? match[3] : match[4] !== undefined ? match[4] : '';
      if (name === 'src' || name === 'alt' || name === 'title') allowed[name] = value;
      else if (name === 'loading' && /^(?:lazy|eager)$/i.test(value)) allowed.loading = value.toLowerCase();
      else if ((name === 'width' || name === 'height') && /^\d{1,4}$/.test(value)) {
        const number = Number(value);
        if (number >= 1 && number <= 4096) allowed[name] = String(number);
      }
    }
    return allowed;
  }

  function renderRichMarkdown(markdown, options = {}) {
    const source = String(markdown == null ? '' : markdown).replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    const resources = [];
    const links = [];
    let imageCounter = 0;
    let linkCounter = 0;

    function imageHtml(src, alt, title, attrs = {}) {
      const target = normalizeTarget(src);
      if (!target) return `<span class="obs-md-invalid">[blocked image: ${escapeHtml(alt || src)}]</span>`;
      const id = `image-${++imageCounter}`;
      const external = isExternalHttp(target);
      resources.push({ id, type: 'image', target, external, alt: String(alt || ''), title: String(title || ''), width: attrs.width || '', height: attrs.height || '', loading: attrs.loading || 'lazy' });
      const dimensions = `${attrs.width ? ` width="${escapeAttribute(attrs.width)}"` : ''}${attrs.height ? ` height="${escapeAttribute(attrs.height)}"` : ''}`;
      return `<img data-obs-image-id="${id}" data-obs-image-target="${escapeAttribute(target)}" alt="${escapeAttribute(alt || '')}"${title ? ` title="${escapeAttribute(title)}"` : ''}${dimensions} loading="${escapeAttribute(attrs.loading || 'lazy')}" class="obs-md-image obs-md-image-pending">`;
    }

    function linkHtml(targetRaw, label, title) {
      const target = normalizeTarget(targetRaw);
      if (!target) return `<span class="obs-md-invalid">${escapeHtml(label)}</span>`;
      const id = `link-${++linkCounter}`;
      const external = isExternalHttp(target);
      links.push({ id, target, external, title: String(title || ''), label: String(label || '') });
      return `<a href="#" data-obs-link-id="${id}" data-obs-link-target="${escapeAttribute(target)}"${title ? ` title="${escapeAttribute(title)}"` : ''}>${label}</a>`;
    }

    function inline(value) {
      let text = String(value == null ? '' : value);
      const tokens = [];
      function token(html) { const key = `\u0000${tokens.length}\u0000`; tokens.push(html); return key; }
      text = text.replace(/`([^`\n]+)`/g, (_, code) => token(`<code>${escapeHtml(code)}</code>`));
      text = text.replace(/<img\b([^>]*)>/gi, (_, attrsText) => {
        const attrs = parseImgAttributes(attrsText);
        return token(imageHtml(attrs.src || '', attrs.alt || '', attrs.title || '', attrs));
      });
      text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, raw) => {
        const parsed = parseTitleTarget(raw);
        return token(imageHtml(parsed.target, alt, parsed.title));
      });
      text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, raw) => {
        const parsed = parseTitleTarget(raw);
        return token(linkHtml(parsed.target, inline(label), parsed.title));
      });
      text = escapeHtml(text);
      text = text.replace(/\*\*([^*\n]+)\*\*/g, '<strong>$1</strong>');
      text = text.replace(/__([^_\n]+)__/g, '<strong>$1</strong>');
      text = text.replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, '<em>$1</em>');
      text = text.replace(/(?<!_)_([^_\n]+)_(?!_)/g, '<em>$1</em>');
      text = text.replace(/~~([^~\n]+)~~/g, '<del>$1</del>');
      text = text.replace(/\u0000(\d+)\u0000/g, (_, index) => tokens[Number(index)] || '');
      return text;
    }

    const lines = source.split('\n');
    const output = [];
    let index = 0;
    let paragraph = [];
    function flushParagraph() {
      if (!paragraph.length) return;
      output.push(`<p>${inline(paragraph.join('\n')).replace(/\n/g, '<br>')}</p>`);
      paragraph = [];
    }
    function isTableDivider(line) { return /^\s*\|?(?:\s*:?-{3,}:?\s*\|)+\s*:?-{3,}:?\s*\|?\s*$/.test(line); }
    function cells(line) { return line.trim().replace(/^\||\|$/g, '').split('|').map((cell) => cell.trim()); }

    while (index < lines.length) {
      const line = lines[index];
      if (/^```/.test(line)) {
        flushParagraph();
        const language = line.slice(3).trim().replace(/[^a-zA-Z0-9_+-]/g, '');
        const code = [];
        index += 1;
        while (index < lines.length && !/^```/.test(lines[index])) code.push(lines[index++]);
        if (index < lines.length) index += 1;
        output.push(`<pre><code${language ? ` class="language-${escapeAttribute(language)}"` : ''}>${escapeHtml(code.join('\n'))}</code></pre>`);
        continue;
      }
      const heading = line.match(/^(#{1,6})\s+(.+)$/);
      if (heading) { flushParagraph(); const level = heading[1].length; output.push(`<h${level}>${inline(heading[2])}</h${level}>`); index += 1; continue; }
      if (line.startsWith('>')) {
        flushParagraph(); const quoted = [];
        while (index < lines.length && /^>\s?/.test(lines[index])) quoted.push(lines[index++].replace(/^>\s?/, ''));
        output.push(`<blockquote>${quoted.map((item) => `<p>${inline(item)}</p>`).join('')}</blockquote>`); continue;
      }
      if (/^\s*[-*+]\s+/.test(line)) {
        flushParagraph(); const items = [];
        while (index < lines.length && /^\s*[-*+]\s+/.test(lines[index])) {
          const raw = lines[index++].replace(/^\s*[-*+]\s+/, '');
          const task = raw.match(/^\[([ xX])\]\s+(.*)$/);
          items.push(task ? `<li class="task"><input type="checkbox" disabled ${task[1].toLowerCase() === 'x' ? 'checked' : ''}> ${inline(task[2])}</li>` : `<li>${inline(raw)}</li>`);
        }
        output.push(`<ul>${items.join('')}</ul>`); continue;
      }
      if (/^\s*\d+[.)]\s+/.test(line)) {
        flushParagraph(); const items = [];
        while (index < lines.length && /^\s*\d+[.)]\s+/.test(lines[index])) items.push(`<li>${inline(lines[index++].replace(/^\s*\d+[.)]\s+/, ''))}</li>`);
        output.push(`<ol>${items.join('')}</ol>`); continue;
      }
      if (line.includes('|') && index + 1 < lines.length && isTableDivider(lines[index + 1])) {
        flushParagraph(); const header = cells(line); index += 2; const rows = [];
        while (index < lines.length && lines[index].includes('|') && lines[index].trim()) rows.push(cells(lines[index++]));
        output.push(`<table><thead><tr>${header.map((cell) => `<th>${inline(cell)}</th>`).join('')}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${inline(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table>`); continue;
      }
      if (/^\s*(?:---+|___+|\*\*\*+)\s*$/.test(line)) { flushParagraph(); output.push('<hr>'); index += 1; continue; }
      if (!line.trim()) { flushParagraph(); index += 1; continue; }
      paragraph.push(line); index += 1;
    }
    flushParagraph();
    return { html: output.join('\n'), resources, links, sourceLength: source.length, safe: true, options: { allowRawImg: options.allowRawImg !== false } };
  }

  return { renderRichMarkdown, escapeRichMarkdownHtml: escapeHtml, normalizeRichMarkdownTarget: normalizeTarget, parseRichMarkdownImgAttributes: parseImgAttributes };
});
