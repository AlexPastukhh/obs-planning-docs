(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  function targetAssetFolder(targetPath) {
    const path = String(targetPath || '').replace(/\\/g, '/');
    if (!/\.md$/i.test(path)) throw new Error('Transfer target must be a Markdown file.');
    return `${path.replace(/\.md$/i, '')}.assets`;
  }

  function leafName(path) {
    const value = String(path || '').replace(/\\/g, '/');
    return value.slice(value.lastIndexOf('/') + 1) || 'image';
  }

  function visibleNoteMarkdown(note) {
    const title = String(note && note.title || '').trim();
    const body = String(note && note.body || '');
    return `${title ? `# ${title}\n\n` : ''}${body}${body.endsWith('\n') || !body ? '' : '\n'}`;
  }

  function buildImageAwareTransferPlan(options = {}) {
    const api = options.api;
    if (!api || typeof api.parseMarkdownImages !== 'function' || typeof api.classifyImageReference !== 'function') throw new TypeError('Image reference APIs are required.');
    const sourcePath = String(options.sourcePath || '');
    const targetPath = String(options.targetPath || '');
    const sourceMarkdown = String(options.sourceMarkdown || '');
    const targetMarkdown = String(options.targetMarkdown || '');
    const mode = options.mode === 'append' ? 'append' : 'create';
    const references = api.parseMarkdownImages(sourceMarkdown).map((ref) => api.classifyImageReference(ref, sourcePath, api));
    const assets = [];
    const seen = new Map();
    const diagnostics = [];
    const folder = targetAssetFolder(targetPath);
    for (const ref of references) {
      if (ref.targetType === 'repository') {
        if (!seen.has(ref.path)) {
          const desiredPath = `${folder}/${leafName(ref.path)}`;
          const entry = { sourcePath: ref.path, desiredPath, references: [] };
          seen.set(ref.path, entry); assets.push(entry);
        }
        seen.get(ref.path).references.push(ref.source);
      } else if (ref.targetType === 'invalid' || ref.targetType === 'pending') {
        diagnostics.push({ status: 'blocked', source: ref.source, message: ref.message || 'Unresolved pending/invalid image cannot be transferred.' });
      } else if (ref.targetType === 'external') {
        diagnostics.push({ status: 'preserved', source: ref.source, message: 'External image URL is preserved and is not downloaded.' });
      }
    }
    const separator = targetMarkdown && !targetMarkdown.endsWith('\n') ? '\n\n' : (targetMarkdown ? '\n' : '');
    const intendedMarkdown = mode === 'append' ? `${targetMarkdown}${separator}${sourceMarkdown}` : sourceMarkdown;
    return { sourcePath, targetPath, mode, sourceMarkdown, targetMarkdown, intendedMarkdown, assets, diagnostics, blocked: diagnostics.some((item) => item.status === 'blocked') };
  }

  function finalizeImageAwareTransfer(plan, actualPaths, api) {
    const replacements = new Map();
    for (const asset of plan.assets || []) {
      const actual = actualPaths instanceof Map ? actualPaths.get(asset.sourcePath) : actualPaths && actualPaths[asset.sourcePath];
      if (!actual) continue;
      const relative = api.repositoryRelativePath(plan.targetPath, actual);
      const encoded = api.encodeMarkdownPath ? api.encodeMarkdownPath(relative) : relative;
      for (const original of asset.references || []) replacements.set(original, encoded);
    }
    const transferredSource = api.rewriteImageReferences(plan.sourceMarkdown, replacements);
    const separator = plan.targetMarkdown && !plan.targetMarkdown.endsWith('\n') ? '\n\n' : (plan.targetMarkdown ? '\n' : '');
    return plan.mode === 'append' ? `${plan.targetMarkdown}${separator}${transferredSource}` : transferredSource;
  }

  return { targetAssetFolder, visibleNoteMarkdown, buildImageAwareTransferPlan, finalizeImageAwareTransfer };
});
