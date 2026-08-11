(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const DEFAULT_STRUCTURE_MAX_NODES = 100;
  const DEFAULT_COPY_MAX_FILES = 100;
  const DEFAULT_COPY_MAX_BYTES = 10 * 1024 * 1024;

  function normalizeSlashPath(value, options = {}) {
    const allowRoot = options.allowRoot !== false;
    const raw = String(value == null ? '' : value).replace(/\\/g, '/').trim();
    if (/^[a-zA-Z]:\//.test(raw) || raw.startsWith('/') || raw.startsWith('//') || /^file:\/\//i.test(raw) || raw.includes('://')) {
      throw new TypeError(`${options.label || 'Repository path'} must be repository-relative.`);
    }
    const text = raw.replace(/\/+$/g, '');
    if (!text) {
      if (allowRoot) return '';
      throw new TypeError(`${options.label || 'Repository path'} is required.`);
    }
    if (/[?#\u0000-\u001f\u007f]/.test(text)) throw new TypeError(`${options.label || 'Repository path'} contains unsupported syntax.`);
    const parts = text.split('/');
    if (parts.some((part) => !part || part === '.' || part === '..')) throw new TypeError(`${options.label || 'Repository path'} contains an empty, . or .. segment.`);
    return parts.join('/');
  }

  function joinRepositoryPath(parent, child) {
    const left = normalizeSlashPath(parent, { allowRoot: true });
    const right = normalizeSlashPath(child, { allowRoot: false });
    return left ? `${left}/${right}` : right;
  }

  function repositoryPathName(path) {
    const normalized = normalizeSlashPath(path, { allowRoot: false });
    return normalized.slice(normalized.lastIndexOf('/') + 1);
  }

  function repositoryPathParent(path) {
    const normalized = normalizeSlashPath(path, { allowRoot: false });
    const slash = normalized.lastIndexOf('/');
    return slash < 0 ? '' : normalized.slice(0, slash);
  }

  function folderIndexCandidate(path) {
    const normalized = normalizeSlashPath(path, { allowRoot: true });
    if (!normalized) return '';
    return `${normalized}/${repositoryPathName(normalized)}.md`;
  }

  function encodeRepositoryRootPath(path) {
    return normalizeSlashPath(path, { allowRoot: false }).split('/').map((segment) => encodeURIComponent(segment).replace(/[!'()*]/g, (character) => `%${character.charCodeAt(0).toString(16).toUpperCase()}`)).join('/');
  }

  function escapeMarkdownLinkLabel(value) {
    return String(value == null ? '' : value).replace(/\\/g, '\\\\').replace(/\[/g, '\\[').replace(/\]/g, '\\]');
  }

  function repositoryRootFileTarget(path) {
    return `/${encodeRepositoryRootPath(path)}`;
  }

  function repositoryRootFileMarkdownLink(path, label) {
    const normalized = normalizeSlashPath(path, { allowRoot: false });
    const display = String(label == null ? '' : label).trim() || repositoryPathName(normalized);
    return `[${escapeMarkdownLinkLabel(display)}](${repositoryRootFileTarget(normalized)})`;
  }

  function workspaceFilesPreferenceKey(workspace) {
    if (!workspace || !workspace.owner || !workspace.repo || !workspace.branch) throw new TypeError('Workspace repository identity is required.');
    const workspaceId = String(workspace.id || '').trim() || 'workspace';
    const owner = String(workspace.owner).trim().toLowerCase();
    const repo = String(workspace.repo).trim().replace(/\.git$/i, '').toLowerCase();
    const branch = String(workspace.branch || 'main').trim() || 'main';
    return `obsLinkedNotesPrototype:v2:filesWorkspace:${encodeURIComponent(workspaceId)}:${encodeURIComponent(owner)}:${encodeURIComponent(repo)}:${encodeURIComponent(branch)}`;
  }

  function slugId(value, fallback = 'preset') {
    const slug = String(value == null ? '' : value).trim().toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-+|-+$/g, '');
    return slug || fallback;
  }

  function normalizeFolderShortcut(input) {
    const name = String(input && input.name || '').trim();
    if (!name) throw new TypeError('Folder shortcut name is required.');
    const path = normalizeSlashPath(input && input.path, { allowRoot: false, label: 'Folder shortcut path' });
    return { id: String(input && input.id || '').trim() || slugId(`${name}-${path}`, 'folder'), name, path };
  }

  function normalizeDocumentPreset(input) {
    const name = String(input && input.name || '').trim();
    if (!name) throw new TypeError('Document preset name is required.');
    const categoryId = String(input && input.categoryId || '').trim();
    if (!categoryId) throw new TypeError('Document preset category ID is required.');
    const templatePath = normalizeSlashPath(input && input.templatePath, { allowRoot: false, label: 'Template path' });
    return { id: String(input && input.id || '').trim() || slugId(name, 'document'), name, categoryId, templatePath };
  }

  function normalizeFilesWorkspacePreferences(value) {
    const source = value && typeof value === 'object' ? value : {};
    const shortcuts = [];
    const shortcutIds = new Set();
    for (const raw of Array.isArray(source.folderShortcuts) ? source.folderShortcuts : []) {
      try {
        const item = normalizeFolderShortcut(raw);
        if (!shortcutIds.has(item.id)) { shortcutIds.add(item.id); shortcuts.push(item); }
      } catch (error) { /* invalid local preference is ignored */ }
    }
    const presets = [];
    const presetIds = new Set();
    for (const raw of Array.isArray(source.documentPresets) ? source.documentPresets : []) {
      try {
        const item = normalizeDocumentPreset(raw);
        if (!presetIds.has(item.id)) { presetIds.add(item.id); presets.push(item); }
      } catch (error) { /* invalid local preference is ignored */ }
    }
    return { schemaVersion: 1, folderShortcuts: shortcuts, documentPresets: presets };
  }

  function upsertPreferenceItem(items, next) {
    const output = Array.isArray(items) ? items.map((item) => ({ ...item })) : [];
    const index = output.findIndex((item) => item.id === next.id);
    if (index < 0) output.push(next); else output[index] = next;
    return output;
  }

  function parseRepositoryStructure(text, options = {}) {
    const maxNodes = Number(options.maxNodes) > 0 ? Number(options.maxNodes) : DEFAULT_STRUCTURE_MAX_NODES;
    const basePath = normalizeSlashPath(options.basePath || '', { allowRoot: true });
    const records = [];
    const seen = new Map();
    const lines = String(text == null ? '' : text).replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
    for (let index = 0; index < lines.length; index += 1) {
      const raw = lines[index].trim();
      if (!raw || raw.startsWith('#')) continue;
      const folder = raw.endsWith('/');
      const relative = normalizeSlashPath(folder ? raw.slice(0, -1) : raw, { allowRoot: false, label: `Structure line ${index + 1}` });
      const path = basePath ? `${basePath}/${relative}` : relative;
      const type = folder ? 'folder' : 'file';
      if (seen.has(path) && seen.get(path) !== type) throw new Error(`Structure path is both file and folder: ${relative}.`);
      if (seen.has(path)) continue;
      seen.set(path, type);
      records.push({ type, relativePath: relative, path, line: index + 1 });
      if (records.length > maxNodes) throw new Error(`Structure contains more than ${maxNodes} unique nodes.`);
    }
    if (!records.length) throw new Error('Structure is empty.');
    for (const record of records) {
      const parts = record.relativePath.split('/');
      for (let i = 1; i < parts.length; i += 1) {
        const relative = parts.slice(0, i).join('/');
        const path = basePath ? `${basePath}/${relative}` : relative;
        const known = seen.get(path);
        if (known === 'file') throw new Error(`Structure places content below a file: ${relative}.`);
        if (!known) {
          seen.set(path, 'folder');
          records.push({ type: 'folder', relativePath: relative, path, line: record.line, implicit: true });
          if (records.length > maxNodes) throw new Error(`Structure contains more than ${maxNodes} nodes including implicit folders.`);
        }
      }
    }
    records.sort((a, b) => a.path.localeCompare(b.path) || a.type.localeCompare(b.type));
    const filePaths = new Set(records.filter((record) => record.type === 'file').map((record) => record.path));
    const folderPaths = records.filter((record) => record.type === 'folder').map((record) => record.path);
    const leafFolders = folderPaths.filter((folderPath) => {
      const prefix = `${folderPath}/`;
      return !records.some((record) => record.path !== folderPath && record.path.startsWith(prefix));
    });
    return { basePath, records, files: [...filePaths].sort(), folders: [...new Set(folderPaths)].sort(), leafFolders: [...new Set(leafFolders)].sort(), source: String(text == null ? '' : text) };
  }

  function copyDestinationPath(sourceRoot, destinationRoot, sourcePath) {
    const source = normalizeSlashPath(sourceRoot, { allowRoot: false, label: 'Copy source root' });
    const destination = normalizeSlashPath(destinationRoot, { allowRoot: false, label: 'Copy destination root' });
    const target = normalizeSlashPath(sourcePath, { allowRoot: false, label: 'Copy source path' });
    if (target !== source && !target.startsWith(`${source}/`)) throw new Error(`Copy source path is outside source root: ${target}.`);
    const suffix = target === source ? '' : target.slice(source.length + 1);
    return suffix ? `${destination}/${suffix}` : destination;
  }

  function clampPopoverRect(anchorRect, containerRect, options = {}) {
    const margin = Number(options.margin) >= 0 ? Number(options.margin) : 8;
    const gap = Number(options.gap) >= 0 ? Number(options.gap) : 6;
    const maxWidth = Number(options.maxWidth) > 0 ? Number(options.maxWidth) : 520;
    const maxHeight = Number(options.maxHeight) > 0 ? Number(options.maxHeight) : 380;
    const availableWidth = Math.max(160, containerRect.width - margin * 2);
    const width = Math.min(maxWidth, availableWidth);
    const availableHeight = Math.max(140, containerRect.height - margin * 2);
    const height = Math.min(maxHeight, availableHeight);
    let left = anchorRect.left;
    left = Math.max(containerRect.left + margin, Math.min(left, containerRect.right - margin - width));
    let top = anchorRect.bottom + gap;
    if (top + height > containerRect.bottom - margin) top = Math.max(containerRect.top + margin, anchorRect.top - gap - height);
    return { left: Math.round(left), top: Math.round(top), width: Math.round(width), maxHeight: Math.round(height) };
  }

  return {
    DEFAULT_STRUCTURE_MAX_NODES,
    DEFAULT_COPY_MAX_FILES,
    DEFAULT_COPY_MAX_BYTES,
    normalizeFilesWorkspacePath: normalizeSlashPath,
    joinRepositoryFilesWorkspacePath: joinRepositoryPath,
    repositoryFilesWorkspacePathName: repositoryPathName,
    repositoryFilesWorkspacePathParent: repositoryPathParent,
    folderIndexCandidate,
    repositoryRootFileTarget,
    repositoryRootFileMarkdownLink,
    workspaceFilesPreferenceKey,
    normalizeFolderShortcut,
    normalizeDocumentPreset,
    normalizeFilesWorkspacePreferences,
    upsertFilesWorkspacePreferenceItem: upsertPreferenceItem,
    parseRepositoryStructure,
    copyDestinationPath,
    clampRepositoryLinkPopoverRect: clampPopoverRect
  };
});
