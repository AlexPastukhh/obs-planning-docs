(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsPlanningHelper = Object.assign(root.ObsPlanningHelper || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const MODE = Object.freeze({ ADAPTIVE: 'adaptive', FULL: 'full' });

  function commandReadBlock(definition, mode) {
    const path = `planning/commands/${definition.file}`;
    if (mode === MODE.FULL) {
      return [
        'source_of_truth:',
        '  Start from `planning/command-routing.md`.',
        `  Then read \`${path}\` and follow its complete owner route.`,
        '',
        'route_read_rule:',
        '  Full route reading is required for this invocation.',
        '  Read the root command-system entry, this command definition and every owner/workflow/template/example required by the definition.',
        '  Do this even if the command was previously used in this chat.',
        '  Do not expand into unrelated repository files.',
        '  Full does not expand permissions.'
      ];
    }
    return [
      'source_of_truth:',
      '  Start from `planning/command-routing.md`.',
      `  Then read \`${path}\` and its linked owner files for this command route.`,
      '',
      'route_read_rule:',
      '  Read or reread the route when it is not current, remembered or certain.',
      '  Do not rely only on this compact prompt when command behavior is uncertain.'
    ];
  }

  function formatFamily(family) { return (family || []).map((item) => `\`${item}\``).join(' / '); }

  function ownerRefLines(definition){const refs=definition.ownerRefs||[];if(!refs.length)return['  - none'];return refs.flatMap((ref)=>{const target=`${ref.path}${ref.anchor?'#'+ref.anchor:''}`;return[`  - ${ref.responsibilityId} → \`${target}\``,`    role: ${ref.role}; read: ${ref.readMode}; why: ${ref.why}`];});}

  function contributionLines(definition){const items=definition.compositionContributions||[];if(!items.length)return['  - none'];return items.map((item)=>`  - ${item.kind}: ${item.value} | why: ${item.why}`);}

  function compositionLines(definition,definitions){if(!Array.isArray(definitions)||!definitions.length)return[];try{const byId=new Map(definitions.map((d)=>[String(d.id),d])),seen=new Set(),order=[];function visit(id){if(seen.has(id))return;const current=byId.get(id);if(!current)throw new Error(`Unknown included command: ${id}`);for(const included of current.includes||[])visit(included);seen.add(id);order.push(id);}visit(String(definition.id));return order.map((id,index)=>`  ${index+1}. ${id}${id===definition.id?'  ← selected/root action':''}`);}catch(_){return[];}}

  function buildCommandBody(definition, mode = MODE.ADAPTIVE, options = {}) {
    return [
      '[PLANNING_COMMAND]',
      'Read this whole command body before answering.',
      'Do not ignore `key_reminders`.',
      '',
      'command:',
      `  ${definition.command}`,
      '',
      'english_name:',
      `  ${definition.englishName}`,
      '',
      'command_family:',
      `  ${formatFamily(definition.commandFamily)}`,
      '',
      'command_definition:',
      `  planning/commands/${definition.file}`,
      '',
      'context:',
      `  ${definition.activeContextBehavior}`,
      '',
      'result:',
      `  ${definition.expectedOutput}`,
      '',
      'essence:',
      `  ${definition.meaning}`,
      '',
      'command_includes:',
      ...((definition.includes||[]).length?(definition.includes||[]).map((id)=>`  - ${id}`):['  - none']),
      '  Expand ALL selected roots and transitive includes before semantic execution. Merge them into one DAG, reject cycles, deduplicate shared nodes, collect declarative contributions from every node, then execute dependencies before dependents. The selected/root command action runs last on its branch.',
      '',
      'composition_contributions_pre_execution:',
      ...contributionLines(definition),
      '  Contributions from ALL expanded DAG nodes are collected before the first semantic command action.',
      '',
      'expanded_composition_dependencies_first:',
      ...(compositionLines(definition,options.definitions).length?compositionLines(definition,options.definitions):['  - resolve from current command catalog before execution']),
      '',
      'own_canonical_refs:',
      ...ownerRefLines(definition),
      '  These are references added by THIS command only; references inherited through included commands are intentionally not repeated.',
      '',
      ...commandReadBlock(definition, mode),
      '',
      'key_reminders:',
      ...(definition.keyReminders || []).map((item) => `  - ${item}`),
      '',
      'user_target:',
      `  ${definition.userTarget}`,
      '',
      '[/PLANNING_COMMAND]'
    ].join('\n');
  }

  function buildRefinementBody(definition, refinement) {
    return [
      '[PLANNING_COMMAND_REFINEMENT]',
      'command:',
      `  ${definition.command}`,
      '',
      'command_definition:',
      `  planning/commands/${definition.file}`,
      '',
      'refinement:',
      `  ${refinement.id}`,
      '',
      'read_required:',
      ...(refinement.readRequired || []).map((path) => `  - \`${path}\``),
      '',
      'instruction:',
      `  ${refinement.instruction}`,
      '',
      '[/PLANNING_COMMAND_REFINEMENT]'
    ].join('\n');
  }

  function buildUseCaseInvocationBody(genericDefinition,useCase,mode=MODE.ADAPTIVE){
    const full=mode===MODE.FULL;
    return [
      '[PLANNING_COMMAND]',
      'Read this whole command body before answering.',
      'Do not ignore `key_reminders`.',
      '',
      'command:',
      `  ${useCase.label}`,
      '',
      'english_name:',
      `  invoke use case · ${useCase.label}`,
      '',
      'command_definition:',
      `  planning/commands/${genericDefinition.file}`,
      '',
      'use_case_id:',
      `  ${useCase.id}`,
      '',
      'source_of_truth:',
      '  Start from `planning/command-routing.md`.',
      `  Then read \`planning/commands/${genericDefinition.file}\` and resolve \`${useCase.id}\` in \`${useCase.sources[0]}\`.`,
      '  Follow the current UC owner route; the Helper projection is not semantic authority.',
      '',
      'route_read_rule:',
      `  ${full?'Read the complete relevant current owner route for this UC.':'Read or reread the selected UC route when it is not current, remembered or certain.'}`,
      '  Do not expand permissions merely because the UC is selected.',
      '',
      'key_reminders:',
      ...genericDefinition.keyReminders.map((item)=>`  - ${item}`),
      `  - Current UC result: ${useCase.description||useCase.label}`,
      '',
      'user_target:',
      `  ${useCase.target||'<current target>'}`,
      '',
      '[/PLANNING_COMMAND]'
    ].join('\n');
  }

  function useCaseInvocationCommandId(useCaseId){return `uc.invoke.${String(useCaseId||'').toLowerCase()}`;}
  function buildUseCaseInvocationEntry(genericDefinition,useCase){return{id:useCaseInvocationCommandId(useCase.id),entityType:'use-case-invocation-command',useCaseId:useCase.id,label:useCase.label,command:useCase.label,englishName:`invoke use case · ${useCase.label}`,description:`Manual invocation of ${useCase.id} through its current canonical owner route`,adaptiveBody:buildUseCaseInvocationBody(genericDefinition,useCase,MODE.ADAPTIVE),fullBody:buildUseCaseInvocationBody(genericDefinition,useCase,MODE.FULL),refinementBodies:[],stateLabel:'Generated UC invocation · canonical registry remains authority'};}

  function buildCommandEntry(definition,definitions) {
    return {
      ...definition,
      label: definition.command,
      adaptiveBody: buildCommandBody(definition, MODE.ADAPTIVE,{definitions}),
      fullBody: buildCommandBody(definition, MODE.FULL,{definitions}),
      refinementBodies: (definition.refinements || []).map((refinement) => ({ ...refinement, body: buildRefinementBody(definition, refinement) }))
    };
  }

  function buildCommandEntries(definitions) { const all=definitions||[]; return all.filter((definition) => definition.palette === true).map((definition)=>buildCommandEntry(definition,all)); }

  return { MODE, commandReadBlock, buildCommandBody, buildRefinementBody, buildUseCaseInvocationBody, useCaseInvocationCommandId, buildUseCaseInvocationEntry, buildCommandEntry, buildCommandEntries };
});
