(function (root, factory) {
  const api = factory(root.ObsPlanningHelper || (typeof require === 'function' ? require('./helper-library-codec.js') : {}));
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsPlanningHelper = Object.assign(root.ObsPlanningHelper || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function (deps) {
  'use strict';

  const KEYS = Object.freeze({
    settings:'obsPlanningHelper:v1:repositorySettings',
    token:'obsPlanningHelper:v1:githubToken',
    cache:'obsPlanningHelper:v1:commandCatalogCache',
    localLibrary:'obsPlanningHelper:v1:localLibrary',
    repositoryLibraryCache:'obsPlanningHelper:v1:repositoryLibraryCache'
  });
  const POSITION_KEY='obs-planning-helper-position-v2';
  const DEFAULT_SETTINGS=Object.freeze({owner:'AlexPastukhh',repo:'obs-planning-docs',branch:'main'});

  function gmGetFn(){return typeof GM_getValue==='function'?GM_getValue:null;}
  function gmSetFn(){return typeof GM_setValue==='function'?GM_setValue:null;}
  async function gmGet(key,fallback){const fn=gmGetFn();return fn?await fn(key,fallback):fallback;}
  async function gmSet(key,value){const fn=gmSetFn();if(!fn)throw new Error('Tampermonkey GM_setValue is unavailable; reinstall the generated Planning Helper userscript and accept its GM grants.');await fn(key,value);}

  function normalizeSettings(value){const input=value&&typeof value==='object'?value:{};return{owner:String(input.owner==null?'':input.owner).trim(),repo:String(input.repo==null?'':input.repo).trim(),branch:String(input.branch==null?'':input.branch).trim()};}
  function validateRepositorySettings(value){const settings=normalizeSettings(value);if(!settings.owner||!settings.repo||!settings.branch)throw new TypeError('Owner, repository and branch are required and cannot be replaced by defaults when saving settings.');for(const[field,text]of Object.entries(settings)){if(/[\r\n\u0000-\u001f\u007f]/.test(text))throw new TypeError(`${field} contains unsafe control characters.`);}return settings;}
  function repositorySourceKey(settings){const value=validateRepositorySettings(settings);return`${value.owner.toLowerCase()}/${value.repo.toLowerCase()}@${value.branch}`;}
  async function loadRepositorySettings(){const stored=await gmGet(KEYS.settings,null);return stored==null?{...DEFAULT_SETTINGS}:validateRepositorySettings(stored);}
  async function saveRepositorySettings(settings){const value=validateRepositorySettings(settings);await gmSet(KEYS.settings,value);return value;}
  async function loadGitHubToken(){return String(await gmGet(KEYS.token,'')||'').trim();}
  async function saveGitHubToken(token){const value=String(token||'').trim();await gmSet(KEYS.token,value);return Boolean(value);}
  async function loadCommandCatalogCache(settings){const value=await gmGet(KEYS.cache,null);if(!value||typeof value!=='object'||value.schemaVersion!==1)return null;return value.sourceKey===repositorySourceKey(settings)?value:null;}
  async function saveCommandCatalogCache(definitions,settings){await gmSet(KEYS.cache,{schemaVersion:1,sourceKey:repositorySourceKey(settings),savedAt:new Date().toISOString(),definitions});}

  async function loadLocalHelperLibrary(){const value=await gmGet(KEYS.localLibrary,null);if(value==null)return[];if(!value||value.schemaVersion!==1||!Array.isArray(value.items))throw new TypeError('Unsupported Planning Helper local-library schema.');return deps.normalizeHelperLibraryCollection(value.items);}
  async function saveLocalHelperLibrary(items){const normalized=deps.normalizeHelperLibraryCollection(items);const payload={schemaVersion:1,items:normalized};await gmSet(KEYS.localLibrary,payload);const checked=await gmGet(KEYS.localLibrary,null);if(!checked||checked.schemaVersion!==1||JSON.stringify(checked.items)!==JSON.stringify(normalized))throw new Error('Planning Helper local-library write-back verification failed.');return normalized;}
  async function upsertLocalHelperLibraryItem(value){const item=deps.normalizeHelperLibraryItem(value);const current=await loadLocalHelperLibrary();const key=`${item.kind}:${item.id}`;const next=[...current.filter((entry)=>`${entry.kind}:${entry.id}`!==key),item];return{item,items:await saveLocalHelperLibrary(next)};}
  async function removeLocalHelperLibraryItem(kind,id){const current=await loadLocalHelperLibrary();const key=`${kind}:${id}`;const next=current.filter((entry)=>`${entry.kind}:${entry.id}`!==key);return saveLocalHelperLibrary(next);}
  async function loadRepositoryHelperLibraryCache(settings){const value=await gmGet(KEYS.repositoryLibraryCache,null);if(!value||value.schemaVersion!==1||!Array.isArray(value.items)||value.sourceKey!==repositorySourceKey(settings))return null;return{...value,items:deps.normalizeHelperLibraryCollection(value.items)};}
  async function saveRepositoryHelperLibraryCache(items,settings){const normalized=deps.normalizeHelperLibraryCollection(items.map((item)=>{const copy={...item};delete copy.__sha;delete copy.__path;return copy;}));await gmSet(KEYS.repositoryLibraryCache,{schemaVersion:1,sourceKey:repositorySourceKey(settings),savedAt:new Date().toISOString(),items:normalized});}

  async function migrateLegacyLocalCommandProjections(){let raw='';try{raw=typeof localStorage!=='undefined'?localStorage.getItem(deps.LEGACY_LOCAL_STORAGE_KEY)||'':'';}catch(_){}if(!raw)return{added:0,warning:null};let legacy;try{legacy=deps.parseLegacyProjectionRegistry(raw);}catch(error){return{added:0,warning:`Legacy local commands were not migrated: ${error.message||String(error)}`};}if(!legacy.length)return{added:0,warning:null};const current=await loadLocalHelperLibrary();const keys=new Set(current.map((item)=>`${item.kind}:${item.id}`));const additions=legacy.filter((item)=>!keys.has(`${item.kind}:${item.id}`));if(additions.length)await saveLocalHelperLibrary([...current,...additions]);return{added:additions.length,warning:null};}

  function readPanelPosition(){try{const parsed=JSON.parse(localStorage.getItem(POSITION_KEY)||'{}');return{left:Number.isFinite(parsed.left)?parsed.left:null,top:Number.isFinite(parsed.top)?parsed.top:null};}catch(_){return{left:null,top:null};}}
  function savePanelPosition(position){try{localStorage.setItem(POSITION_KEY,JSON.stringify({left:position.left,top:position.top}));}catch(_){}}

  return { PLANNING_HELPER_STATE_KEYS:KEYS, PLANNING_HELPER_DEFAULT_SETTINGS:DEFAULT_SETTINGS, normalizeSettings, validateRepositorySettings, repositorySourceKey, loadRepositorySettings, saveRepositorySettings, loadGitHubToken, saveGitHubToken, loadCommandCatalogCache, saveCommandCatalogCache, loadLocalHelperLibrary, saveLocalHelperLibrary, upsertLocalHelperLibraryItem, removeLocalHelperLibraryItem, loadRepositoryHelperLibraryCache, saveRepositoryHelperLibraryCache, migrateLegacyLocalCommandProjections, readPanelPosition, savePanelPosition };
});
