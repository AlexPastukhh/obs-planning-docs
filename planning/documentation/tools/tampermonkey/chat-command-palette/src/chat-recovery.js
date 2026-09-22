(function (root, factory) {
  const api = factory(root.ObsPlanningHelper || (typeof require === 'function' ? Object.assign({}, require('./command-definition-codec.js'), require('./command-catalog.js'), require('./helper-library-codec.js')) : {}));
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsPlanningHelper = Object.assign(root.ObsPlanningHelper || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function (deps) {
  'use strict';

  const PATCH_START='[PLANNING_HELPER_PATCH]',PATCH_END='[/PLANNING_HELPER_PATCH]';
  const PATCH_COLLECTIONS=Object.freeze(['commands','helperItems','useCases','semanticComponents','scenarios']);

  function normalizePatchSection(value,label){const input=value==null?{}:value;if(!input||typeof input!=='object'||Array.isArray(input))throw new TypeError(`${label} must be an object.`);for(const key of Object.keys(input))if(!PATCH_COLLECTIONS.includes(key))throw new TypeError(`Unsupported ${label} field: ${key}`);const out={};for(const key of PATCH_COLLECTIONS){const items=input[key]==null?[]:input[key];if(!Array.isArray(items))throw new TypeError(`${label}.${key} must be an array.`);out[key]=items;}return out;}
  function parsePlanningHelperPatch(source){const blocks=[...String(source||'').matchAll(/\[PLANNING_HELPER_PATCH\]\s*([\s\S]*?)\s*\[\/PLANNING_HELPER_PATCH\]/g)];if(blocks.length>1)throw new TypeError('Only one PLANNING_HELPER_PATCH block is allowed per import.');if(!blocks.length)return null;let raw;try{raw=JSON.parse(blocks[0][1]);}catch(error){throw new TypeError(`Invalid PLANNING_HELPER_PATCH JSON: ${error.message||String(error)}`);}if(!raw||typeof raw!=='object'||Array.isArray(raw))throw new TypeError('PLANNING_HELPER_PATCH must contain one JSON object.');if(Number(raw.schemaVersion)!==1)throw new TypeError(`Unsupported PLANNING_HELPER_PATCH schemaVersion: ${raw.schemaVersion}`);for(const key of Object.keys(raw))if(!['schemaVersion','upsert','delete','catalogOrder'].includes(key))throw new TypeError(`Unsupported PLANNING_HELPER_PATCH field: ${key}`);const upsert=normalizePatchSection(raw.upsert,'upsert'),del=normalizePatchSection(raw.delete,'delete');for(const key of PATCH_COLLECTIONS)for(const item of del[key])if(typeof item!=='string'||!item.trim())throw new TypeError(`delete.${key} must contain non-empty string keys.`);return{schemaVersion:1,upsert,delete:del,catalogOrder:raw.catalogOrder==null?null:raw.catalogOrder};}

  function parseChatImport(text) {
    const source=String(text || '');
    const definitions=source.includes('[PLANNING_COMMAND_DEFINITION]') ? deps.parseCommandDefinitionBatch(source) : [];
    const helperItems=source.includes('[PLANNING_HELPER_LIBRARY_ITEM]') ? deps.parseHelperLibraryBatch(source) : [];
    const patch=source.includes(PATCH_START)?parsePlanningHelperPatch(source):null;
    if(!definitions.length&&!helperItems.length&&!patch)throw new TypeError('No planning-command definitions, helper-library items or Planning Helper patch found.');
    if(definitions.length)deps.validateCommandCatalog(definitions,{allowMissingIncludes:true});
    return { definitions, helperItems, patch };
  }

  function buildRecoveryRequest(settings) {
    const owner=String(settings?.owner || '').trim();
    const repo=String(settings?.repo || '').trim();
    const branch=String(settings?.branch || '').trim();
    if(!owner||!repo||!branch)throw new TypeError('Repository settings are required for a recovery request.');
    return [
      'I need to restore my OBS Planning Helper local snapshot from GitHub.',
      `Read the current repository ${owner}/${repo} on branch ${branch}.`,
      'Read every direct planning/commands/*.command.md file.',
      'Also read every direct planning/helper-library/commands/*.helper-command.md file and every direct planning/helper-library/prompts/*.prompt.md file that exists.',
      'This must be the complete current repository recovery set. Planning Helper Restore will reconcile its repository-backed local records to this pasted set while preserving local-only unbacked records.',
      'Return only the exact marker blocks needed by Planning Helper Restore:',
      '- every complete [PLANNING_COMMAND_DEFINITION] ... [/PLANNING_COMMAND_DEFINITION] block, unchanged;',
      '- every complete [PLANNING_HELPER_LIBRARY_ITEM] ... [/PLANNING_HELPER_LIBRARY_ITEM] block, unchanged.',
      'Do not summarize, omit, rename, reformat or wrap the result in Markdown fences. Do not invent missing items. Do not include files that no longer exist in the repository.',
      'The browser helper will restore this text locally and will not fetch GitHub itself.'
    ].join('\n');
  }

  return { PATCH_START, PATCH_END, parsePlanningHelperPatch, parseChatImport, buildRecoveryRequest };
});
