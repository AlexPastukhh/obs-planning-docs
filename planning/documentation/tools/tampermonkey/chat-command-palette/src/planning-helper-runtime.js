(function (root, factory) {
  const api = factory(root.ObsPlanningHelper || {});
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsPlanningHelper = Object.assign(root.ObsPlanningHelper || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function (deps) {
  'use strict';

  const INSTANCE_DISPOSE_KEY='__obsPlanningHelperDisposeV2';
  const LEGACY_DISPOSE_KEYS=['__obsCommandHelperDisposeV1'];

  function cleanDefinitions(definitions){return definitions.map((definition)=>deps.stripRuntimeCommandMetadata(definition))}

  function createRepositoryOperationLock() {
    let active='';
    return {
      isBusy:()=>Boolean(active),
      active:()=>active,
      async run(label, task) {
        const next=String(label || 'repository operation');
        if (active) { const error=new Error(`Repository operation already in progress: ${active}.`); error.kind='busy'; throw error; }
        active=next;
        try { return await task(); }
        finally { active=''; }
      }
    };
  }

  async function startPlanningHelper(options={}) {
    for(const key of [INSTANCE_DISPOSE_KEY,...LEGACY_DISPOSE_KEYS]){const previous=globalThis[key];if(typeof previous==='function'){try{previous()}catch(_){}}}
    const bundled=Array.isArray(options.bundledCommands)?options.bundledCommands:[];deps.validateCommandCatalog(bundled);
    const semanticEntries=deps.buildSemanticEntries();
    const initialSettings=await deps.loadRepositorySettings();
    const repositoryLock=createRepositoryOperationLock();
    let currentDefinitions=bundled;
    try{const cache=await deps.loadCommandCatalogCache(initialSettings);if(cache&&Array.isArray(cache.definitions)){deps.validateCommandCatalog(cache.definitions);currentDefinitions=cache.definitions}}catch(error){console.warn('[OBS Planning Helper] Ignoring invalid command cache:',error)}

    function commandEntries(){return deps.buildCommandEntries(currentDefinitions)}
    async function makeService(){const settings=await deps.loadRepositorySettings();const token=await deps.loadGitHubToken();if(typeof GM_xmlhttpRequest!=='function')throw new Error('GM_xmlhttpRequest is unavailable; reinstall the generated Planning Helper userscript.');const transport=deps.createGmTransport(GM_xmlhttpRequest);const client=new deps.GitHubContentsClient({...settings,token,transport});return {service:new deps.RepositoryCommandService(client,{commandsPath:deps.COMMANDS_PATH}),settings}}
    async function refreshRemoteUnlocked(){const {service,settings}=await makeService();const definitions=await service.loadCatalog();const clean=cleanDefinitions(definitions);deps.validateCommandCatalog(clean);currentDefinitions=clean;await deps.saveCommandCatalogCache(clean,settings);return{commandEntries:commandEntries(),count:clean.length,visible:clean.filter((definition)=>definition.palette).length}}

    let ui;
    async function refreshRemote(){return repositoryLock.run('Refresh repository commands',refreshRemoteUnlocked)}
    async function previewDefinitions(definitions){return repositoryLock.run('Preview repository commands',async()=>{const {service}=await makeService();return service.previewDefinitions(definitions)})}
    async function saveDefinitions(previewPlan){return repositoryLock.run('Save repository commands',async()=>{const {service}=await makeService();const result=await service.savePreviewPlan(previewPlan);try{const refreshed=await refreshRemoteUnlocked();return{...result,commandEntries:refreshed.commandEntries}}catch(error){return{...result,refreshError:error.message||String(error),commandEntries:commandEntries()}}})}
    async function onInsert(text,success,id){await new Promise((resolve)=>requestAnimationFrame(resolve));const result=deps.insertIntoComposer(text,id);if(result.ok)return success;const copied=await deps.copyText(text);return copied?`Direct insertion failed (${result.reason}). Copied to clipboard — paste manually.`:`Direct insertion failed (${result.reason}) and clipboard copy also failed.`}
    async function loadSettings(){return{settings:await deps.loadRepositorySettings(),token:await deps.loadGitHubToken()}}
    async function saveSettings(settings,token){return repositoryLock.run('Save repository settings',async()=>{const previous=await deps.loadRepositorySettings();const next=await deps.saveRepositorySettings(settings);await deps.saveGitHubToken(token);const sourceChanged=deps.repositorySourceKey(previous)!==deps.repositorySourceKey(next);if(sourceChanged){currentDefinitions=bundled;return{sourceChanged:true,commandEntries:commandEntries()}}return{sourceChanged:false}})}

    ui=deps.createPlanningHelperUi({surfaces:deps.SURFACES,semanticEntries,commandEntries:commandEntries(),position:deps.readPanelPosition(),onSavePosition:deps.savePanelPosition,onInsert,onCopy:deps.copyText,onRefreshCommands:refreshRemote,parseDefinitions:deps.parseCommandDefinitionBatch,onPreviewDefinitions:previewDefinitions,onSaveDefinitions:saveDefinitions,onLoadSettings:loadSettings,onSaveSettings:saveSettings});
    function dispose(){ui?.dispose();if(globalThis[INSTANCE_DISPOSE_KEY]===dispose)delete globalThis[INSTANCE_DISPOSE_KEY];for(const key of LEGACY_DISPOSE_KEYS)if(globalThis[key]===dispose)delete globalThis[key]}
    globalThis[INSTANCE_DISPOSE_KEY]=dispose;
    return {dispose,refreshRemote,getDefinitions:()=>[...currentDefinitions],getRepositoryOperation:()=>repositoryLock.active()};
  }

  return { startPlanningHelper, createRepositoryOperationLock };
});
