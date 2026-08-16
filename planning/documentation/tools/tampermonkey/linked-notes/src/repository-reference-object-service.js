(function (root, factory) {
  const api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function (root) {
  'use strict';

  const DEFAULT_SCAN_MAX_DIRECTORIES = 80;
  const DEFAULT_SCAN_MAX_FILES = 300;
  const DEFAULT_SCAN_MAX_BYTES = 4 * 1024 * 1024;
  const DEFAULT_SCAN_MAX_FILE_BYTES = 512 * 1024;

  function core() {
    const api = root.ObsLinkedNotes || {};
    const required = ['parseReferenceMarkers', 'replaceReferenceOccurrenceValues', 'decodeReferenceObjectRegistry', 'encodeReferenceObjectRegistry', 'referenceObjectById', 'replaceReferenceObjectUses'];
    for (const name of required) if (typeof api[name] !== 'function') throw new Error(`Reference Object dependency is unavailable: ${name}.`);
    return api;
  }

  function errorText(error) {
    return String(error && error.message || error || 'Unknown error');
  }

  function isNotFound(error) {
    return Boolean(error && error.kind === 'not_found');
  }

  function supportedReferenceTextPath(path) {
    return /\.(?:md|markdown|mdown|txt)$/i.test(String(path || ''));
  }

  function overlayMap(overlays) {
    const map = new Map();
    for (const item of Array.isArray(overlays) ? overlays : []) {
      if (!item || !item.path) continue;
      if (item.payloadKind === 'binary') continue;
      map.set(String(item.path), { path: String(item.path), baseSha: String(item.baseSha || ''), content: String(item.content == null ? '' : item.content), local: true });
    }
    return map;
  }

  function decodeUtf8(bytes, path) {
    try { return new TextDecoder('utf-8', { fatal: true }).decode(bytes); }
    catch (error) { throw new Error(`Reference Object scan cannot decode ${path} as strict UTF-8.`); }
  }

  async function readTextFile(client, path, options = {}) {
    const maxBytes = Number(options.maxBytes) > 0 ? Number(options.maxBytes) : DEFAULT_SCAN_MAX_FILE_BYTES;
    if (client && typeof client.readBytes === 'function') {
      const file = await client.readBytes(path, { maxBytes });
      return { path: file.path || path, sha: String(file.sha || ''), size: Number(file.size || (file.bytes && file.bytes.byteLength) || 0), content: decodeUtf8(file.bytes, path), local: false };
    }
    if (client && typeof client.read === 'function') {
      const file = await client.read(path);
      const content = String(file.content == null ? '' : file.content);
      const bytes = new TextEncoder().encode(content).byteLength;
      if (bytes > maxBytes) throw new Error(`Reference Object file exceeds ${maxBytes} bytes: ${path}.`);
      return { path: file.path || path, sha: String(file.sha || ''), size: bytes, content, local: false };
    }
    throw new Error('GitHub client has no bounded text-file reader.');
  }

  async function readRegistrySnapshot(client, registryPath, overlays) {
    const api = core();
    const local = overlayMap(overlays).get(registryPath);
    if (local) {
      return { path: registryPath, sha: local.baseSha, content: local.content, registry: api.decodeReferenceObjectRegistry(local.content), local: true };
    }
    try {
      const file = await readTextFile(client, registryPath, { maxBytes: DEFAULT_SCAN_MAX_FILE_BYTES });
      return { path: registryPath, sha: file.sha, content: file.content, registry: api.decodeReferenceObjectRegistry(file.content), local: false };
    } catch (error) {
      if (!isNotFound(error)) throw error;
      return { path: registryPath, sha: '', content: '', registry: api.emptyReferenceObjectRegistry ? api.emptyReferenceObjectRegistry() : { schemaVersion: 1, objects: [] }, local: false, missing: true };
    }
  }

  async function scanRepositoryReferenceObjects(options = {}) {
    const api = core();
    const client = options.client;
    if (!client || typeof client.listDirectory !== 'function') throw new Error('Reference Object scan requires a repository directory client.');
    const registryPath = String(options.registryPath || api.DEFAULT_REFERENCE_OBJECT_REGISTRY_PATH || '.linked-notes/reference-objects.json');
    const localOverlays = overlayMap(options.overlays);
    const maxDirectories = Number(options.maxDirectories) > 0 ? Number(options.maxDirectories) : DEFAULT_SCAN_MAX_DIRECTORIES;
    const maxFiles = Number(options.maxFiles) > 0 ? Number(options.maxFiles) : DEFAULT_SCAN_MAX_FILES;
    const maxBytes = Number(options.maxBytes) > 0 ? Number(options.maxBytes) : DEFAULT_SCAN_MAX_BYTES;
    const maxFileBytes = Number(options.maxFileBytes) > 0 ? Number(options.maxFileBytes) : DEFAULT_SCAN_MAX_FILE_BYTES;
    const queue = [''];
    const visited = new Set();
    const files = [];
    const fileByPath = new Map();
    const diagnostics = [];
    let totalBytes = 0;
    let scannedFiles = 0;
    let incomplete = false;
    let truncationReason = '';

    while (queue.length) {
      const path = queue.shift();
      if (visited.has(path)) continue;
      if (visited.size >= maxDirectories) {
        incomplete = true;
        truncationReason = `directory limit ${maxDirectories}`;
        break;
      }
      visited.add(path);
      let entries;
      try { entries = await client.listDirectory(path, { maxEntries: 200 }); }
      catch (error) {
        diagnostics.push({ kind: 'directory_read_error', path, message: errorText(error) });
        incomplete = true;
        continue;
      }
      for (const entry of Array.isArray(entries) ? entries : []) {
        if (entry && entry.type === 'dir') {
          if (!visited.has(entry.path)) queue.push(entry.path);
          continue;
        }
        if (!entry || entry.type !== 'file' || !supportedReferenceTextPath(entry.path) || entry.path === registryPath) continue;
        if (scannedFiles >= maxFiles) {
          incomplete = true;
          truncationReason = `file limit ${maxFiles}`;
          queue.length = 0;
          break;
        }
        scannedFiles += 1;
        const local = localOverlays.get(entry.path);
        try {
          let snapshot;
          if (local) {
            const size = new TextEncoder().encode(local.content).byteLength;
            if (size > maxFileBytes) throw new Error(`Local draft exceeds ${maxFileBytes} bytes.`);
            snapshot = { path: entry.path, sha: local.baseSha || String(entry.sha || ''), baseSha: local.baseSha || String(entry.sha || ''), size, content: local.content, local: true };
          } else {
            if (Number(entry.size || 0) > maxFileBytes) throw new Error(`File exceeds ${maxFileBytes} bytes.`);
            const file = await readTextFile(client, entry.path, { maxBytes: maxFileBytes });
            snapshot = { ...file, baseSha: file.sha, local: false };
          }
          totalBytes += snapshot.size;
          if (totalBytes > maxBytes) {
            incomplete = true;
            truncationReason = `aggregate byte limit ${maxBytes}`;
            queue.length = 0;
            break;
          }
          const parsed = api.parseReferenceMarkers(snapshot.content);
          const record = { ...snapshot, markers: parsed.occurrences, markerDiagnostics: parsed.diagnostics };
          files.push(record);
          fileByPath.set(record.path, record);
          for (const diagnostic of parsed.diagnostics) diagnostics.push({ ...diagnostic, path: record.path });
        } catch (error) {
          diagnostics.push({ kind: 'file_scan_error', path: entry.path, message: errorText(error) });
          incomplete = true;
        }
      }
    }

    for (const local of localOverlays.values()) {
      if (local.path === registryPath || !supportedReferenceTextPath(local.path) || fileByPath.has(local.path)) continue;
      const size = new TextEncoder().encode(local.content).byteLength;
      if (size > maxFileBytes || files.length >= maxFiles || totalBytes + size > maxBytes) {
        incomplete = true;
        truncationReason = truncationReason || 'local overlay scan limit';
        diagnostics.push({ kind: 'local_overlay_skipped', path: local.path, message: 'Local Reference Object draft could not be included within scan bounds.' });
        continue;
      }
      const parsed = api.parseReferenceMarkers(local.content);
      const record = { path: local.path, sha: local.baseSha, baseSha: local.baseSha, size, content: local.content, local: true, markers: parsed.occurrences, markerDiagnostics: parsed.diagnostics };
      files.push(record);
      fileByPath.set(record.path, record);
      totalBytes += size;
      for (const diagnostic of parsed.diagnostics) diagnostics.push({ ...diagnostic, path: record.path });
    }

    files.sort((left, right) => left.path.localeCompare(right.path));
    return {
      registryPath,
      files,
      diagnostics,
      incomplete,
      truncationReason,
      scannedDirectories: visited.size,
      scannedFiles: files.length,
      totalBytes
    };
  }

  function actualUseIndex(uses) {
    return (Array.isArray(uses) ? uses : []).map((use) => ({ path: use.path, line: use.line, lineOccurrence: use.lineOccurrence })).sort((left, right) => left.path.localeCompare(right.path) || left.line - right.line || left.lineOccurrence - right.lineOccurrence);
  }

  function sameUsageIndex(left, right) {
    return JSON.stringify(actualUseIndex(left)) === JSON.stringify(actualUseIndex(right));
  }


  function indexedReferenceRoutes(objects) {
    const routes = new Map();
    const ensure = (path) => {
      const value = String(path || '').trim();
      if (!value) return null;
      if (!routes.has(value)) routes.set(value, { path: value, definitionIds: new Set(), useIds: new Set(), expectedUses: [] });
      return routes.get(value);
    };
    const source = Array.isArray(objects) ? objects : [];
    for (const object of source) {
      const route = ensure(object && object.definition && object.definition.path);
      if (route) route.definitionIds.add(String(object.id || ''));
    }
    for (const object of source) {
      const id = String(object && object.id || '');
      for (const use of Array.isArray(object && object.uses) ? object.uses : []) {
        const route = ensure(use && use.path);
        if (!route) continue;
        route.useIds.add(id);
        route.expectedUses.push({ objectId: id, path: route.path, line: Number(use && use.line) || 0, lineOccurrence: Number(use && use.lineOccurrence) || 0 });
      }
    }
    return [...routes.values()];
  }

  async function readIndexedReferenceObjectState(options, registrySnapshot, objects) {
    const api = core();
    const client = options && options.client;
    const localOverlays = overlayMap(options && options.overlays);
    const maxFiles = Number(options && options.maxFiles) > 0 ? Number(options.maxFiles) : DEFAULT_SCAN_MAX_FILES;
    const maxBytes = Number(options && options.maxBytes) > 0 ? Number(options.maxBytes) : DEFAULT_SCAN_MAX_BYTES;
    const maxFileBytes = Number(options && options.maxFileBytes) > 0 ? Number(options.maxFileBytes) : DEFAULT_SCAN_MAX_FILE_BYTES;
    const routes = indexedReferenceRoutes(objects);
    const files = [];
    const fileByPath = new Map();
    const diagnostics = [];
    let totalBytes = 0;
    let incomplete = false;
    let truncationReason = '';
    const selected = routes.slice(0, maxFiles);
    if (routes.length > maxFiles) {
      incomplete = true;
      truncationReason = `indexed file limit ${maxFiles}`;
      diagnostics.push({ kind: 'indexed_file_limit', path: registrySnapshot.path, message: `Definitions File routes ${routes.length} unique files; only ${maxFiles} can be checked in one operation.` });
    }
    for (const route of selected) {
      if (!supportedReferenceTextPath(route.path)) {
        incomplete = true;
        diagnostics.push({ kind: 'indexed_path_unsupported', path: route.path, message: 'Definitions File points to a path outside the supported Reference Object text-file set.' });
        continue;
      }
      try {
        const local = localOverlays.get(route.path);
        let snapshot;
        if (local) {
          const size = new TextEncoder().encode(local.content).byteLength;
          if (size > maxFileBytes) throw new Error(`Local pending file exceeds ${maxFileBytes} bytes.`);
          snapshot = { path: route.path, sha: local.baseSha, baseSha: local.baseSha, size, content: local.content, local: true };
        } else {
          const file = await readTextFile(client, route.path, { maxBytes: maxFileBytes });
          snapshot = { ...file, baseSha: file.sha, local: false };
        }
        if (totalBytes + snapshot.size > maxBytes) {
          incomplete = true;
          truncationReason = truncationReason || `indexed aggregate byte limit ${maxBytes}`;
          diagnostics.push({ kind: 'indexed_byte_limit', path: route.path, message: `Definitions File routed reads exceed the ${maxBytes}-byte aggregate bound.` });
          break;
        }
        totalBytes += snapshot.size;
        const parsed = api.parseReferenceMarkers(snapshot.content);
        const record = { ...snapshot, markers: parsed.occurrences, markerDiagnostics: parsed.diagnostics, route };
        files.push(record);
        fileByPath.set(record.path, record);
        for (const diagnostic of parsed.diagnostics) diagnostics.push({ ...diagnostic, path: record.path });
      } catch (error) {
        incomplete = true;
        diagnostics.push({ kind: 'indexed_file_read_error', path: route.path, message: errorText(error) });
      }
    }
    return {
      registryPath: registrySnapshot.path,
      files,
      fileByPath,
      diagnostics,
      incomplete,
      truncationReason,
      indexedPaths: routes.length,
      readFiles: files.length,
      totalBytes
    };
  }

  async function checkReferenceObjectUses(options = {}) {
    const api = core();
    const id = api.normalizeReferenceObjectId(options.objectId);
    const registryPath = String(options.registryPath || api.DEFAULT_REFERENCE_OBJECT_REGISTRY_PATH || '.linked-notes/reference-objects.json');
    const registrySnapshot = await readRegistrySnapshot(options.client, registryPath, options.overlays);
    const object = api.referenceObjectById(registrySnapshot.registry, id);
    if (!object) throw new Error(`Reference Object not found in Definitions File: ${id}.`);
    const routed = await readIndexedReferenceObjectState(options, registrySnapshot, [object]);
    const diagnostics = [...routed.diagnostics];
    const definitionFile = routed.fileByPath.get(String(object.definition && object.definition.path || ''));
    const definitions = definitionFile ? definitionFile.markers.filter((marker) => marker.role === 'def' && marker.id === id).map((marker) => ({ ...marker, path: definitionFile.path, fileSha: definitionFile.baseSha || definitionFile.sha || '', local: Boolean(definitionFile.local) })) : [];
    if (definitions.length !== 1) diagnostics.push({ kind: definitions.length ? 'duplicate_definition_at_path' : 'definition_missing', path: object.definition.path, objectId: id, message: definitions.length ? `Definitions File target contains ${definitions.length} definitions for ${id}.` : `Definition marker ${id} was not found at ${object.definition.path}.` });
    const definition = definitions.length === 1 ? definitions[0] : null;
    const currentValue = definition ? definition.value : '';
    const indexedUsePaths = new Set((Array.isArray(object.uses) ? object.uses : []).map((use) => String(use && use.path || '')).filter(Boolean));
    const uses = [];
    for (const path of indexedUsePaths) {
      const file = routed.fileByPath.get(path);
      if (!file) continue;
      for (const marker of file.markers) if (marker.role === 'use' && marker.id === id) uses.push({ ...marker, path: file.path, fileSha: file.baseSha || file.sha || '', local: Boolean(file.local) });
    }
    const classifiedUses = uses.sort((left, right) => left.path.localeCompare(right.path) || left.fullStart - right.fullStart).map((use) => ({ ...use, status: definition && use.value === currentValue ? 'current' : definition ? 'stale' : 'unresolved' }));
    const index = actualUseIndex(classifiedUses);
    const indexDrift = !sameUsageIndex(object.uses, index);
    if (indexDrift) diagnostics.push({ kind: 'usage_index_drift', objectId: id, path: registryPath, message: `Definitions File usage index differs from the markers found in its ${indexedUsePaths.size} routed use file(s). Run Deep validate repo to discover uses in unindexed files.` });
    const blocked = !definition;
    return {
      kind: 'reference-object-check-v1',
      object,
      objectId: id,
      registryPath,
      registrySnapshot,
      definition,
      currentValue,
      uses: classifiedUses,
      usageIndex: index,
      indexDrift,
      diagnostics,
      incomplete: routed.incomplete,
      truncationReason: routed.truncationReason,
      blocked,
      files: routed.files,
      scanSummary: { mode: 'indexed', directories: 0, files: routed.readFiles, bytes: routed.totalBytes, indexedPaths: routed.indexedPaths }
    };
  }

  function buildReferenceObjectLocalUpdate(check) {
    const api = core();
    if (!check || check.kind !== 'reference-object-check-v1') throw new Error('Check Reference Object uses before updating.');
    if (check.blocked) throw new Error('Reference Object definition is unresolved or duplicated; usages cannot be updated safely.');
    if (check.incomplete) throw new Error(`Reference Object check is incomplete${check.truncationReason ? ` (${check.truncationReason})` : ''}; usages cannot be updated safely.`);
    const staleByPath = new Map();
    for (const use of check.uses.filter((item) => item.status === 'stale')) {
      const group = staleByPath.get(use.path) || [];
      group.push(use);
      staleByPath.set(use.path, group);
    }
    const filePlans = [];
    const contentByPath = new Map(check.files.map((file) => [file.path, file.content]));
    for (const [path, stale] of staleByPath.entries()) {
      const file = check.files.find((item) => item.path === path);
      if (!file) throw new Error(`Checked use file is unavailable: ${path}.`);
      const content = api.replaceReferenceOccurrenceValues(file.content, stale.map((use) => ({ contentStart: use.contentStart, contentEnd: use.contentEnd, value: check.currentValue })));
      contentByPath.set(path, content);
      filePlans.push({ path, baseSha: String(file.baseSha || file.sha || ''), content, localBase: Boolean(file.local) });
    }
    const uses = [];
    for (const file of check.files) {
      const content = contentByPath.get(file.path);
      const parsed = api.parseReferenceMarkers(content);
      for (const marker of parsed.occurrences) if (marker.role === 'use' && marker.id === check.objectId) uses.push({ path: file.path, line: marker.line, lineOccurrence: marker.lineOccurrence });
    }
    uses.sort((left, right) => left.path.localeCompare(right.path) || left.line - right.line || left.lineOccurrence - right.lineOccurrence);
    const registry = api.replaceReferenceObjectUses(check.registrySnapshot.registry, check.objectId, uses);
    return { kind: 'reference-object-local-update-v1', objectId: check.objectId, files: filePlans, uses, registry, registryContent: api.encodeReferenceObjectRegistry(registry), staleCount: check.uses.filter((item) => item.status === 'stale').length };
  }

  async function proveExpectedBase(client, path, baseSha) {
    if (baseSha) {
      const metadata = await client.readMetadata(path);
      if (String(metadata && metadata.sha || '') !== String(baseSha)) throw new Error(`Remote base changed for ${path}. Expected ${baseSha}; found ${metadata && metadata.sha || '(none)'}.`);
      return metadata;
    }
    try {
      const metadata = await client.readMetadata(path);
      throw new Error(`Expected new path is no longer absent: ${path}${metadata && metadata.sha ? ` (${metadata.sha})` : ''}.`);
    } catch (error) {
      if (isNotFound(error)) return null;
      throw error;
    }
  }

  async function updateReferenceObjectUsesRemote(options = {}) {
    const api = core();
    const client = options.client;
    if (!client || typeof client.saveVerified !== 'function' || typeof client.readMetadata !== 'function') throw new Error('Remote Reference Object update requires verified text writes and metadata reads.');
    const check = await checkReferenceObjectUses({ ...options, overlays: [] });
    const plan = buildReferenceObjectLocalUpdate(check);
    const registryNeedsWrite = check.indexDrift || plan.staleCount > 0;
    for (const file of plan.files) await proveExpectedBase(client, file.path, file.baseSha);
    if (registryNeedsWrite) await proveExpectedBase(client, check.registryPath, check.registrySnapshot.sha);
    const results = [];
    for (const file of plan.files) {
      try {
        const saved = await client.saveVerified({ path: file.path, content: file.content, baseSha: file.baseSha, message: `Refresh materialized Reference Object ${check.objectId} in ${file.path}` });
        results.push({ target: file.path, status: 'completed', sha: String(saved && saved.sha || ''), message: 'Stale materialized uses updated and exact read-back verified.' });
      } catch (error) {
        results.push({ target: file.path, status: 'failed', message: errorText(error) });
        const partial = new Error(`Reference Object remote update stopped after ${results.filter((item) => item.status === 'completed').length} verified file(s). Completed writes remain.`);
        partial.kind = 'partial_reference_object_update';
        partial.partialResults = results;
        throw partial;
      }
    }
    if (registryNeedsWrite) {
      try {
        const saved = await client.saveVerified({ path: check.registryPath, content: plan.registryContent, baseSha: check.registrySnapshot.sha, message: `Refresh Reference Object usage index for ${check.objectId}` });
        results.push({ target: check.registryPath, status: 'completed', sha: String(saved && saved.sha || ''), message: 'Definitions File usage index updated and verified.' });
      } catch (error) {
        results.push({ target: check.registryPath, status: 'failed', message: errorText(error) });
        const partial = new Error('Materialized uses may already be updated, but the Definitions File index update failed. Validate tags before retrying.');
        partial.kind = 'partial_reference_object_update';
        partial.partialResults = results;
        throw partial;
      }
    }
    return { kind: 'reference-object-remote-update-result-v1', objectId: check.objectId, staleCount: plan.staleCount, results, registry: plan.registry };
  }

  function referenceValidationFromFiles(registrySnapshot, files, sourceDiagnostics, options = {}) {
    const diagnostics = [...(Array.isArray(sourceDiagnostics) ? sourceDiagnostics : [])];
    const definitionsById = new Map();
    const usesById = new Map();
    for (const file of Array.isArray(files) ? files : []) {
      for (const marker of Array.isArray(file && file.markers) ? file.markers : []) {
        const target = marker.role === 'def' ? definitionsById : usesById;
        const group = target.get(marker.id) || [];
        group.push({ ...marker, path: file.path });
        target.set(marker.id, group);
      }
    }
    const objects = Array.isArray(registrySnapshot && registrySnapshot.registry && registrySnapshot.registry.objects) ? registrySnapshot.registry.objects : [];
    const registeredIds = new Set(objects.map((object) => object.id));
    for (const [id, definitions] of definitionsById.entries()) {
      if (definitions.length > 1) diagnostics.push({ kind: 'duplicate_definition', objectId: id, path: definitions[0].path, message: `${id} has ${definitions.length} definitions in the files read by this validation.` });
      if (!registeredIds.has(id)) diagnostics.push({ kind: 'unregistered_definition', objectId: id, path: definitions[0].path, message: `${id} has a definition marker but no Definitions File record.` });
    }
    for (const object of objects) {
      const definitions = definitionsById.get(object.id) || [];
      if (!definitions.some((item) => item.path === object.definition.path)) diagnostics.push({ kind: 'registry_definition_missing', objectId: object.id, path: object.definition.path, message: 'Definitions File target does not contain the expected definition marker.' });
      if (definitions.some((item) => item.path !== object.definition.path)) diagnostics.push({ kind: 'registry_definition_wrong_path', objectId: object.id, path: object.definition.path, message: 'Definition marker also exists outside the recorded definition path among the files read by this validation.' });
      const uses = actualUseIndex(usesById.get(object.id) || []);
      if (!sameUsageIndex(object.uses, uses)) diagnostics.push({ kind: 'usage_index_drift', objectId: object.id, path: registrySnapshot.path, message: `Definitions File usage index differs from ${uses.length} use marker(s) found in the files read by this validation.` });
    }
    for (const [id, uses] of usesById.entries()) if (!registeredIds.has(id)) diagnostics.push({ kind: 'unknown_use_id', objectId: id, path: uses[0].path, message: `${uses.length} use marker(s) refer to an unknown Reference Object id.` });
    const scope = options.scope === 'repository' ? 'repository' : 'indexed';
    const incomplete = Boolean(options.incomplete);
    if (incomplete) {
      diagnostics.push({
        kind: scope === 'repository' ? 'scan_incomplete' : 'indexed_validation_incomplete',
        path: '',
        message: scope === 'repository'
          ? `Deep Reference Object validation is incomplete${options.truncationReason ? `: ${options.truncationReason}` : '.'}`
          : `Indexed Reference Object validation is incomplete${options.truncationReason ? `: ${options.truncationReason}` : '.'}`
      });
    }
    const valid = diagnostics.length === 0 && !incomplete;
    return {
      kind: 'reference-object-validation-v1',
      scope,
      globalIntegrity: scope === 'repository' && valid,
      registryPath: registrySnapshot.path,
      diagnostics,
      valid,
      incomplete,
      counts: {
        objects: objects.length,
        definitions: [...definitionsById.values()].reduce((sum, group) => sum + group.length, 0),
        uses: [...usesById.values()].reduce((sum, group) => sum + group.length, 0),
        files: Array.isArray(files) ? files.length : 0
      },
      registrySnapshot,
      scanSummary: { ...(options.scanSummary || {}) }
    };
  }

  async function validateReferenceObjectTags(options = {}) {
    const api = core();
    const registryPath = String(options.registryPath || api.DEFAULT_REFERENCE_OBJECT_REGISTRY_PATH || '.linked-notes/reference-objects.json');
    const registrySnapshot = await readRegistrySnapshot(options.client, registryPath, options.overlays);
    const objects = Array.isArray(registrySnapshot.registry.objects) ? registrySnapshot.registry.objects : [];
    if (!objects.length) {
      return referenceValidationFromFiles(registrySnapshot, [], [], {
        scope: 'indexed',
        incomplete: false,
        scanSummary: { mode: 'indexed', directories: 0, files: 0, bytes: 0, indexedPaths: 0 }
      });
    }
    const routed = await readIndexedReferenceObjectState(options, registrySnapshot, objects);
    return referenceValidationFromFiles(registrySnapshot, routed.files, routed.diagnostics, {
      scope: 'indexed',
      incomplete: routed.incomplete,
      truncationReason: routed.truncationReason,
      scanSummary: { mode: 'indexed', directories: 0, files: routed.readFiles, bytes: routed.totalBytes, indexedPaths: routed.indexedPaths }
    });
  }

  async function deepValidateReferenceObjectTags(options = {}) {
    const api = core();
    const registryPath = String(options.registryPath || api.DEFAULT_REFERENCE_OBJECT_REGISTRY_PATH || '.linked-notes/reference-objects.json');
    const registrySnapshot = await readRegistrySnapshot(options.client, registryPath, options.overlays);
    const scan = await scanRepositoryReferenceObjects({ ...options, registryPath });
    return referenceValidationFromFiles(registrySnapshot, scan.files, scan.diagnostics, {
      scope: 'repository',
      incomplete: scan.incomplete,
      truncationReason: scan.truncationReason,
      scanSummary: { mode: 'repository', directories: scan.scannedDirectories, files: scan.scannedFiles, bytes: scan.totalBytes }
    });
  }

  async function diagnoseReferenceObjectFreshness(options = {}) {
    const api = core();
    const registryPath = String(options.registryPath || api.DEFAULT_REFERENCE_OBJECT_REGISTRY_PATH || '.linked-notes/reference-objects.json');
    const registrySnapshot = await readRegistrySnapshot(options.client, registryPath, options.overlays);
    const objects = Array.isArray(registrySnapshot.registry.objects) ? registrySnapshot.registry.objects : [];
    if (!objects.length) {
      return {
        kind: 'reference-object-freshness-v1',
        files: [],
        uses: [],
        staleCount: 0,
        unresolvedCount: 0,
        incomplete: false,
        truncationReason: '',
        diagnostics: [],
        registrySnapshot,
        scanSummary: { mode: 'indexed', directories: 0, files: 0, bytes: 0, indexedPaths: 0 }
      };
    }
    const routed = await readIndexedReferenceObjectState(options, registrySnapshot, objects);
    const diagnostics = [...routed.diagnostics];
    const currentValueById = new Map();
    for (const object of objects) {
      const path = String(object.definition && object.definition.path || '');
      const file = routed.fileByPath.get(path);
      const definitions = file ? file.markers.filter((marker) => marker.role === 'def' && marker.id === object.id) : [];
      if (definitions.length === 1) currentValueById.set(object.id, definitions[0].value);
      else diagnostics.push({ kind: definitions.length ? 'duplicate_definition_at_path' : 'definition_missing', objectId: object.id, path, message: definitions.length ? `Definitions File target contains ${definitions.length} definitions for ${object.id}.` : `Definition marker ${object.id} was not found at ${path}.` });
    }
    const uses = [];
    for (const object of objects) {
      const expectedByPath = new Map();
      for (const expected of Array.isArray(object.uses) ? object.uses : []) {
        const path = String(expected && expected.path || '');
        if (!path) continue;
        const group = expectedByPath.get(path) || [];
        group.push(expected);
        expectedByPath.set(path, group);
      }
      const actualForObject = [];
      for (const [path, expected] of expectedByPath.entries()) {
        const file = routed.fileByPath.get(path);
        if (!file) {
          for (const item of expected) actualForObject.push({ path, objectId: object.id, line: Number(item.line) || 0, lineOccurrence: Number(item.lineOccurrence) || 0, value: '', currentValue: currentValueById.get(object.id) || '', status: 'unresolved', indexedMissing: true });
          continue;
        }
        const actual = file.markers.filter((marker) => marker.role === 'use' && marker.id === object.id).map((marker) => ({ path: file.path, objectId: object.id, line: marker.line, lineOccurrence: marker.lineOccurrence, value: marker.value, currentValue: currentValueById.get(object.id) || '', status: currentValueById.has(object.id) ? (marker.value === currentValueById.get(object.id) ? 'current' : 'stale') : 'unresolved' }));
        actualForObject.push(...actual);
        const missingCount = Math.max(0, expected.length - actual.length);
        for (let index = 0; index < missingCount; index += 1) {
          const item = expected[index] || {};
          actualForObject.push({ path, objectId: object.id, line: Number(item.line) || 0, lineOccurrence: Number(item.lineOccurrence) || 0, value: '', currentValue: currentValueById.get(object.id) || '', status: 'unresolved', indexedMissing: true });
        }
      }
      const actualIndex = actualUseIndex(actualForObject.filter((item) => !item.indexedMissing));
      if (!sameUsageIndex(object.uses, actualIndex)) diagnostics.push({ kind: 'usage_index_drift', objectId: object.id, path: registryPath, message: `Definitions File usage index differs from markers in the indexed use paths for ${object.id}. Run Deep validate repo for a repository-wide integrity check.` });
      uses.push(...actualForObject);
    }
    uses.sort((left, right) => left.path.localeCompare(right.path) || left.line - right.line || left.lineOccurrence - right.lineOccurrence || left.objectId.localeCompare(right.objectId));
    const fileMap = new Map();
    for (const use of uses) {
      const group = fileMap.get(use.path) || [];
      group.push(use);
      fileMap.set(use.path, group);
    }
    const files = [...fileMap.entries()].sort((left, right) => left[0].localeCompare(right[0])).map(([path, fileUses]) => ({ path, current: fileUses.filter((item) => item.status === 'current').length, stale: fileUses.filter((item) => item.status === 'stale').length, unresolved: fileUses.filter((item) => item.status === 'unresolved').length, uses: fileUses }));
    return {
      kind: 'reference-object-freshness-v1',
      files,
      uses,
      staleCount: uses.filter((item) => item.status === 'stale').length,
      unresolvedCount: uses.filter((item) => item.status === 'unresolved').length,
      incomplete: routed.incomplete,
      truncationReason: routed.truncationReason,
      diagnostics,
      registrySnapshot,
      scanSummary: { mode: 'indexed', directories: 0, files: routed.readFiles, bytes: routed.totalBytes, indexedPaths: routed.indexedPaths }
    };
  }

  return {
    DEFAULT_REFERENCE_SCAN_MAX_DIRECTORIES: DEFAULT_SCAN_MAX_DIRECTORIES,
    DEFAULT_REFERENCE_SCAN_MAX_FILES: DEFAULT_SCAN_MAX_FILES,
    DEFAULT_REFERENCE_SCAN_MAX_BYTES: DEFAULT_SCAN_MAX_BYTES,
    DEFAULT_REFERENCE_SCAN_MAX_FILE_BYTES: DEFAULT_SCAN_MAX_FILE_BYTES,
    supportedReferenceTextPath,
    readReferenceObjectRegistrySnapshot: readRegistrySnapshot,
    scanRepositoryReferenceObjects,
    checkReferenceObjectUses,
    buildReferenceObjectLocalUpdate,
    updateReferenceObjectUsesRemote,
    validateReferenceObjectTags,
    deepValidateReferenceObjectTags,
    diagnoseReferenceObjectFreshness,
    proveReferenceObjectExpectedBase: proveExpectedBase
  };
});
