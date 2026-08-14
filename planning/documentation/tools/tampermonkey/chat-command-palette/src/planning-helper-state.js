(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsPlanningHelper = Object.assign(root.ObsPlanningHelper || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const KEYS = Object.freeze({
    settings:'obsPlanningHelper:v1:repositorySettings',
    token:'obsPlanningHelper:v1:githubToken',
    cache:'obsPlanningHelper:v1:commandCatalogCache'
  });
  const POSITION_KEY = 'obs-planning-helper-position-v2';
  const DEFAULT_SETTINGS = Object.freeze({ owner:'AlexPastukhh', repo:'obs-planning-docs', branch:'main' });

  function getGm(name) { return typeof globalThis !== 'undefined' && typeof globalThis[name] === 'function' ? globalThis[name] : null; }
  async function gmGet(key, fallback) { const fn=getGm('GM_getValue'); return fn ? await fn(key, fallback) : fallback; }
  async function gmSet(key, value) { const fn=getGm('GM_setValue'); if (!fn) throw new Error('Tampermonkey GM_setValue is unavailable.'); await fn(key, value); }

  function normalizeSettings(value) {
    const input=value && typeof value==='object' ? value : {};
    return {
      owner:String(input.owner == null ? '' : input.owner).trim(),
      repo:String(input.repo == null ? '' : input.repo).trim(),
      branch:String(input.branch == null ? '' : input.branch).trim()
    };
  }

  function validateRepositorySettings(value) {
    const settings=normalizeSettings(value);
    if (!settings.owner || !settings.repo || !settings.branch) throw new TypeError('Owner, repository and branch are required and cannot be replaced by defaults when saving settings.');
    for (const [field, text] of Object.entries(settings)) {
      if (/[\r\n\u0000-\u001f\u007f]/.test(text)) throw new TypeError(`${field} contains unsafe control characters.`);
    }
    return settings;
  }

  function repositorySourceKey(settings) { const value=validateRepositorySettings(settings); return `${value.owner.toLowerCase()}/${value.repo.toLowerCase()}@${value.branch}`; }
  async function loadRepositorySettings() { const stored=await gmGet(KEYS.settings, null); return stored == null ? { ...DEFAULT_SETTINGS } : validateRepositorySettings(stored); }
  async function saveRepositorySettings(settings) { const value=validateRepositorySettings(settings); await gmSet(KEYS.settings, value); return value; }
  async function loadGitHubToken() { return String(await gmGet(KEYS.token, '') || '').trim(); }
  async function saveGitHubToken(token) { const value=String(token || '').trim(); await gmSet(KEYS.token, value); return Boolean(value); }
  async function loadCommandCatalogCache(settings) { const value=await gmGet(KEYS.cache, null); if (!value || typeof value!=='object' || value.schemaVersion!==1) return null; return value.sourceKey===repositorySourceKey(settings) ? value : null; }
  async function saveCommandCatalogCache(definitions, settings) { await gmSet(KEYS.cache, { schemaVersion:1, sourceKey:repositorySourceKey(settings), savedAt:new Date().toISOString(), definitions }); }

  function readPanelPosition() {
    try { const parsed=JSON.parse(localStorage.getItem(POSITION_KEY) || '{}'); return { left:Number.isFinite(parsed.left) ? parsed.left : null, top:Number.isFinite(parsed.top) ? parsed.top : null }; }
    catch (_) { return { left:null, top:null }; }
  }
  function savePanelPosition(position) { try { localStorage.setItem(POSITION_KEY, JSON.stringify({ left:position.left, top:position.top })); } catch (_) {} }

  return { PLANNING_HELPER_STATE_KEYS:KEYS, PLANNING_HELPER_DEFAULT_SETTINGS:DEFAULT_SETTINGS, normalizeSettings, validateRepositorySettings, repositorySourceKey, loadRepositorySettings, saveRepositorySettings, loadGitHubToken, saveGitHubToken, loadCommandCatalogCache, saveCommandCatalogCache, readPanelPosition, savePanelPosition };
});
