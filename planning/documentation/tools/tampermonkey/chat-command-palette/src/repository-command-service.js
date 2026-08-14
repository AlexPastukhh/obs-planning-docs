(function (root, factory) {
  const api = factory(root.ObsPlanningHelper || (typeof require === 'function' ? Object.assign({}, require('./command-definition-codec.js'), require('./command-catalog.js')) : {}));
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsPlanningHelper = Object.assign(root.ObsPlanningHelper || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function (deps) {
  'use strict';
  const COMMANDS_PATH = deps.COMMANDS_PATH || 'planning/commands';
  const COMMAND_FILE_PATTERN = /^[a-z0-9][a-z0-9._-]*\.command\.md$/;

  function conflict(message) { const error = new Error(message); error.kind = 'conflict'; return error; }
  function sameSnapshot(left, right) { return JSON.stringify(left) === JSON.stringify(right); }
  function repositorySourceKey(identity) { return `${identity.owner.toLowerCase()}/${identity.repo.toLowerCase()}@${identity.branch}`; }

  class RepositoryCommandService {
    constructor(client, options = {}) {
      this.client = client;
      this.commandsPath = options.commandsPath || COMMANDS_PATH;
      if (this.commandsPath !== COMMANDS_PATH) throw new TypeError(`Command writes are confined to ${COMMANDS_PATH}.`);
    }
    _target(file) { if (!COMMAND_FILE_PATTERN.test(String(file || ''))) throw new TypeError('Invalid command filename.'); return `${this.commandsPath}/${file}`; }
    _repositoryIdentity() {
      const identity={ owner:String(this.client?.owner || '').trim(), repo:String(this.client?.repo || '').trim(), branch:String(this.client?.branch || '').trim() };
      if (!identity.owner || !identity.repo || !identity.branch) throw new TypeError('Repository client identity is incomplete.');
      return { ...identity, sourceKey:repositorySourceKey(identity) };
    }
    _normalizeRepositoryIdentity(value) {
      if (!value || typeof value!=='object') throw new TypeError('Preview plan is missing repository identity.');
      const identity={ owner:String(value.owner || '').trim(), repo:String(value.repo || '').trim(), branch:String(value.branch || '').trim() };
      if (!identity.owner || !identity.repo || !identity.branch) throw new TypeError('Preview repository identity is incomplete.');
      const sourceKey=repositorySourceKey(identity);
      if (String(value.sourceKey || '') !== sourceKey) throw new TypeError('Preview repository source key does not match its owner/repository/branch identity.');
      return { ...identity, sourceKey };
    }
    _snapshotFromDefinitions(definitions) { return (definitions || []).map((definition) => ({ path:definition.__path || this._target(definition.file), sha:String(definition.__sha || '') })).sort((a,b) => a.path.localeCompare(b.path)); }
    async _readCatalogSnapshot() { const entries=await this.client.listDirectory(this.commandsPath); return entries.filter((entry)=>entry.type==='file'&&COMMAND_FILE_PATTERN.test(entry.name)).map((entry)=>({path:entry.path,sha:String(entry.sha||'')})).sort((a,b)=>a.path.localeCompare(b.path)); }
    async loadCatalog(options = {}) {
      const entries = await this.client.listDirectory(this.commandsPath);
      const commandFiles = entries.filter((entry) => entry.type === 'file' && COMMAND_FILE_PATTERN.test(entry.name)).sort((a,b) => a.name.localeCompare(b.name));
      const definitions = [];
      for (const entry of commandFiles) {
        const file = await this.client.read(entry.path);
        const definition = deps.parseCommandDefinitionDocument(file.content, { path:entry.path });
        definitions.push({ ...definition, __sha:file.sha, __path:entry.path });
      }
      deps.validateCommandCatalog(definitions);
      if (!definitions.length && !options.allowEmpty) throw new TypeError('Repository command catalog contains no direct .command.md definitions.');
      return definitions;
    }
    async _validateReferencedOwners(incoming) {
      const paths = new Set();
      for (const definition of incoming || []) for (const path of deps.commandReferencePaths(definition)) paths.add(path);
      for (const path of [...paths].sort()) await this.client.read(path);
    }
    _normalizePreviewPlan(plan) {
      if (!plan || typeof plan !== 'object' || !Array.isArray(plan.items) || !Array.isArray(plan.catalogSnapshot)) throw new TypeError('A repository command Preview plan is required before Save.');
      if (!plan.items.length) throw new TypeError('Preview plan contains no command definitions.');
      const repository=this._normalizeRepositoryIdentity(plan.repository);
      const items = plan.items.map((item, index) => {
        if (!item || typeof item !== 'object') throw new TypeError(`Preview item ${index} is invalid.`);
        const definition = deps.normalizeCommandDefinition(item.definition);
        const path = this._target(definition.file);
        if (String(item.path || '') !== path) throw new TypeError(`Preview target changed for ${definition.file}. Run Parse & Preview again.`);
        const action = String(item.action || '');
        const baseSha = String(item.baseSha || '');
        if (action === 'create' && baseSha) throw new TypeError(`Create preview unexpectedly contains a base SHA for ${path}.`);
        if (action === 'update' && !baseSha) throw new TypeError(`Update preview is missing its base SHA for ${path}.`);
        if (action !== 'create' && action !== 'update') throw new TypeError(`Unknown preview action for ${path}.`);
        return { definition, path, action, baseSha };
      });
      deps.validateCommandCatalog(items.map((item) => item.definition));
      if (new Set(items.map((item) => item.path)).size !== items.length) throw new TypeError('Preview plan contains duplicate command targets.');
      const catalogSnapshot = plan.catalogSnapshot.map((item, index) => {
        if (!item || typeof item !== 'object') throw new TypeError(`Catalog snapshot item ${index} is invalid.`);
        const path = String(item.path || '');
        const prefix = `${this.commandsPath}/`;
        const file = path.startsWith(prefix) ? path.slice(prefix.length) : '';
        if (!COMMAND_FILE_PATTERN.test(file) || path !== this._target(file)) throw new TypeError(`Catalog snapshot contains an invalid command path: ${path || '<empty>'}.`);
        const sha = String(item.sha || '');
        if (!sha) throw new TypeError(`Catalog snapshot is missing SHA for ${path}.`);
        return { path, sha };
      }).sort((a,b) => a.path.localeCompare(b.path));
      if (new Set(catalogSnapshot.map((item) => item.path)).size !== catalogSnapshot.length) throw new TypeError('Catalog snapshot contains duplicate command paths.');
      return { repository, items, catalogSnapshot };
    }
    async previewDefinitions(incoming) {
      deps.validateCommandCatalog(incoming);
      const current = await this.loadCatalog({ allowEmpty:true });
      const currentByFile = new Map(current.map((definition) => [definition.file, definition]));
      const merged = deps.replaceDefinitionsByFile(current, incoming);
      deps.validateCommandCatalog(merged);
      await this._validateReferencedOwners(incoming);
      return {
        repository:this._repositoryIdentity(),
        items: incoming.map((definition) => ({ definition, path:this._target(definition.file), action:currentByFile.has(definition.file) ? 'update' : 'create', baseSha:currentByFile.get(definition.file)?.__sha || '' })),
        catalogSnapshot: this._snapshotFromDefinitions(current)
      };
    }
    async savePreviewPlan(plan) {
      const preview = this._normalizePreviewPlan(plan);
      const currentRepository=this._repositoryIdentity();
      if (currentRepository.sourceKey !== preview.repository.sourceKey) throw conflict(`Repository target changed since Preview (${preview.repository.sourceKey} -> ${currentRepository.sourceKey}). Nothing was written; run Parse & Preview again.`);
      await this._validateReferencedOwners(preview.items.map((item) => item.definition));
      const currentSnapshot = await this._readCatalogSnapshot();
      if (!sameSnapshot(currentSnapshot, preview.catalogSnapshot)) throw conflict('Repository command catalog changed since Preview. Nothing was written; run Parse & Preview again.');
      const results = [];
      for (const item of preview.items) {
        const content = deps.renderCommandDefinitionDocument(item.definition);
        try {
          const write = await this.client.saveVerified({ path:item.path, content, baseSha:item.baseSha, message:`${item.action === 'create' ? 'Add' : 'Update'} planning command ${item.definition.command}` });
          results.push({ ok:true, action:item.action, path:item.path, command:item.definition.command, sha:write.sha, recoveredAfterUnknownWrite:Boolean(write.recoveredAfterUnknownWrite) });
        } catch (error) {
          results.push({ ok:false, action:item.action, path:item.path, command:item.definition.command, error:error && error.message ? error.message : String(error), kind:error && error.kind ? error.kind : 'error' });
          return { ok:false, results, remaining:preview.items.slice(results.length).map((rest) => rest.path) };
        }
      }
      return { ok:true, results, remaining:[] };
    }
  }

  return { RepositoryCommandService, repositorySourceKey };
});
