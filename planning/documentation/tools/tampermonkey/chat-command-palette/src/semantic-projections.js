(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsPlanningHelper = Object.assign(root.ObsPlanningHelper || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const SURFACES = Object.freeze({ ORIENTATION: 'Orientation', DIRECTIONS: 'Directions', USE_CASES: 'Use Cases', COMMANDS: 'Commands' });
  const MODE = Object.freeze({ ADAPTIVE: 'adaptive', FULL: 'full' });

  const ORIENTATION_DEFINITIONS = [{
    id: 'OBS-PLANNING-ORIENTATION', label: 'OBS Planning Orientation', description: 'architecture and context selection',
    sources: ['planning/README.md', 'planning/direction-registry.md'],
    instruction: 'Explain the current planning architecture, distinguish Directions, Use Cases and Commands, and help select the relevant context. Do not execute unrelated commands.',
    target: '<what planning context should be oriented>'
  }];

  const DIRECTION_DEFINITIONS = [
    { id:'DIR-PLAN-SOLUTION', label:'Plan A Solution Or Workflow', description:'solution/workflow planning', sources:['planning/direction-registry.md','planning/documentation/application-planning/direction-registry.md','planning/documentation/application-planning/use-case-registry.md'], instruction:'Establish this Direction as current context. Explain optional topology and the relevant Use Cases. Do not execute every branch automatically.', target:'<solution or workflow target>' },
    { id:'DIR-DETAILED-SDS', label:'Perform Detailed Scenario/Domain/Slice Planning', description:'profile-limited detailed planning', sources:['planning/direction-registry.md','planning/documentation/application-planning/direction-registry.md','planning/documentation/application-planning/use-case-registry.md','planning/documentation/profiles/scenario-domain-slice-docs-profile.md'], instruction:'Establish this profile-limited Direction. Explain Scenario/Domain/Slice topology and current owner boundaries. Do not invent prototype-depth methodology.', target:'<scenario/domain/slice target>' },
    { id:'DIR-MAINTAIN-DOCS-ROUTES', label:'Maintain Documentation, Use Cases And Commands', description:'documentation and routing', sources:['planning/direction-registry.md','planning/documentation/direction-and-use-case-registry-workflow.md','planning/planning-use-case-map.md'], instruction:'Establish documentation/registry/command maintenance context and keep registries, UCM, command definitions, workflows, templates and projection authority distinct.', target:'<documentation or routing target>' },
    { id:'DIR-DOCUMENTATION-WORKBENCH', label:'Develop And Maintain Documentation Workbench', description:'project-local product direction', sources:['planning/direction-registry.md','planning/areas/documentation-workbench/direction-registry.md','planning/areas/documentation-workbench/use-case-registry.md','planning/areas/documentation-workbench/planning-draft.md'], instruction:'Establish the Documentation Workbench Direction, current Planning Draft, accepted workflows, proposed Linked Notes workflow and deferred model boundary. Do not claim runtime implementation or accept pending item transitions.', target:'<Documentation Workbench target>' }
  ];

  const USE_CASE_DEFINITIONS = [
    { id:'UC-AP-REALITY', label:'Understand Current Workflow And Reality', description:'current reality capture', sources:['planning/documentation/application-planning/use-case-registry.md','planning/documentation/application-planning/application-planning-drafting-workflow.md'], instruction:'Establish descriptive current-reality context. Reconstruct actors, triggers, sequence, strengths, problems, risks, workarounds and unknowns without accepting future architecture.', target:'<current workflow/reality target>' },
    { id:'UC-AP-FORM-ITEMS', label:'Form Planning Items From Discussion', description:'open accepted form-items command', commandId:'planning_items.form' },
    { id:'UC-AP-FULL-PICTURE', label:'Build Or Review An Item-Backed Planning Draft', description:'item-backed planning synthesis', sources:['planning/documentation/application-planning/use-case-registry.md','planning/documentation/application-planning/application-planning-drafting-workflow.md','planning/documentation/application-planning/templates/PLANNING-DRAFT-TEMPLATE.md'], instruction:'Establish item-backed Planning Draft context. Require complete Key Scenarios and one Full Picture Matrix while preserving canonical item ownership and traceability.', target:'<Planning Draft target>' },
    { id:'UC-AP-RECONCILE', label:'Reconcile Planning Items', description:'open existing command', commandId:'planning_items.reconcile' },
    { id:'UC-AP-RESEARCH', label:'Research Existing Solutions And Alternative Workflows', description:'provisional proportional research', sources:['planning/documentation/application-planning/use-case-registry.md','planning/documentation/application-planning/application-planning-drafting-workflow.md'], instruction:'Establish provisional proportional research context. Compare checked options, coverage, strengths, limitations and disposition without creating an oversized specialized methodology.', target:'<solutions or alternative workflows to research>' },
    { id:'UC-AP-SCENARIO', label:'Draft Detailed Scenario', description:'profile-limited scenario', sources:['planning/documentation/application-planning/use-case-registry.md','planning/documentation/profiles/scenario-domain-slice-docs-profile.md'], instruction:'Establish detailed Scenario context using current profile and project-specific owners. Do not invent a new project command or prototype-depth method.', target:'<scenario target>' },
    { id:'UC-AP-DOMAIN', label:'Draft Or Review Domain', description:'profile-limited domain', sources:['planning/documentation/application-planning/use-case-registry.md','planning/documentation/profiles/scenario-domain-slice-docs-profile.md'], instruction:'Establish Domain review context for conceptual model, language and boundaries using current owners.', target:'<domain target>' },
    { id:'UC-AP-SLICE', label:'Plan Implementation Slice', description:'profile-limited slice', sources:['planning/documentation/application-planning/use-case-registry.md','planning/documentation/profiles/scenario-domain-slice-docs-profile.md'], instruction:'Establish Implementation Slice context for one separately deliverable/checkable increment aligned with accepted scenario/domain meaning.', target:'<slice target>' },
    { id:'UC-AP-SDS-CONSISTENCY', label:'Review Scenario/Domain/Slice Consistency', description:'cross-artifact consistency', sources:['planning/documentation/application-planning/use-case-registry.md','planning/documentation/profiles/scenario-domain-slice-docs-profile.md'], instruction:'Establish cross-artifact consistency review context and expose required upstream/downstream corrections.', target:'<scenario/domain/slice artifacts>' },
    { id:'UC-DW-DOC-REF', label:'Repository Documentation Change And Reference Review', description:'accepted Documentation Workbench End-To-End Workflow', sources:['planning/areas/documentation-workbench/use-case-registry.md','planning/areas/documentation-workbench/planning-draft.md','planning/areas/documentation-workbench/repository-documentation-change-and-reference-review-workflow.md'], instruction:'Establish the accepted repository documentation workflow. Keep stable navigation, explicit review-on-change meaning, bounded AI transfer and pending item clarifications distinct.', target:'<repository documentation/reference-review target>' },
    { id:'UC-DW-ITEM-FULL-PICTURE', label:'Planning Meaning To Repository', description:'accepted Documentation Workbench End-To-End Workflow', sources:['planning/areas/documentation-workbench/use-case-registry.md','planning/areas/documentation-workbench/planning-draft.md','planning/areas/documentation-workbench/planning-meaning-to-repository-workflow.md'], instruction:'Establish the full Planning Meaning To Repository workflow. Treat `сверь айтемы` as one read-only reconciliation stage rather than the whole use case.', target:'<planning meaning/repository handoff target>' },
    { id:'UC-DW-STRUCTURED-MESSAGE', label:'Structured User Message Composer', description:'supporting input capability', sources:['planning/areas/documentation-workbench/use-case-registry.md','planning/areas/documentation-workbench/planning-item-register.md','planning/planning-input-conventions.md'], instruction:'Establish structured-message composition context while preserving literal wording and free-form input. Do not make every fragment a Planning Item.', target:'<message/composition target>' }
  ];

  function markerFor(kind) {
    if (kind === 'orientation') return 'PLANNING_ORIENTATION';
    if (kind === 'direction') return 'PLANNING_DIRECTION';
    return 'PLANNING_USE_CASE';
  }

  function readRule(mode, kind) {
    if (mode === MODE.FULL) return [`Full ${kind} reading is required for this invocation.`, 'Read every listed source and the complete relevant owner route even if it was read earlier in this chat.', 'Read the relevant parent/root entry when needed.', 'Do not expand into unrelated repository families.', 'Full changes read depth only; it does not expand permissions.'];
    return [`Use current remembered ${kind} context only while it is clearly sufficient.`, 'Read the listed source and owner route when it was not read in this chat, is forgotten/uncertain, may have changed, or verification is requested.', 'Do not rely on this compact prompt when ownership, status or boundaries are uncertain.'];
  }

  function buildSemanticBody(kind, definition, mode) {
    const marker = markerFor(kind);
    const idField = kind === 'use_case' ? 'use_case_id' : `${kind}_id`;
    return [
      `[${marker}]`, `${idField}:`, `  ${definition.id}`, '', `${kind}:`, `  ${definition.label}`, '', 'mode:', `  ${mode}`, '', 'source_of_truth:',
      ...(definition.sources || []).map((source) => `  - \`${source}\``), '', 'read_rule:', ...readRule(mode, kind).map((line) => `  ${line}`), '', 'instruction:', `  ${definition.instruction}`, '', 'user_target:', `  ${definition.target}`, `[/${marker}]`
    ].join('\n');
  }

  function buildSemanticEntries() {
    return {
      [SURFACES.ORIENTATION]: ORIENTATION_DEFINITIONS.map((d) => ({ ...d, adaptiveBody: buildSemanticBody('orientation', d, MODE.ADAPTIVE), fullBody: buildSemanticBody('orientation', d, MODE.FULL) })),
      [SURFACES.DIRECTIONS]: DIRECTION_DEFINITIONS.map((d) => ({ ...d, adaptiveBody: buildSemanticBody('direction', d, MODE.ADAPTIVE), fullBody: buildSemanticBody('direction', d, MODE.FULL) })),
      [SURFACES.USE_CASES]: USE_CASE_DEFINITIONS.map((d) => d.commandId ? { ...d } : ({ ...d, adaptiveBody: buildSemanticBody('use_case', d, MODE.ADAPTIVE), fullBody: buildSemanticBody('use_case', d, MODE.FULL) }))
    };
  }

  return { SURFACES, ORIENTATION_DEFINITIONS, DIRECTION_DEFINITIONS, USE_CASE_DEFINITIONS, buildSemanticBody, buildSemanticEntries };
});
