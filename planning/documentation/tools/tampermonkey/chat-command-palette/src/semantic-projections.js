(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsPlanningHelper = Object.assign(root.ObsPlanningHelper || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const SURFACES = Object.freeze({ COMMANDS:'Commands', USE_CASES:'Use Cases', PROMPTS:'Prompts' });
  const MODE = Object.freeze({ ADAPTIVE:'adaptive', FULL:'full' });

  const ORIENTATION_DEFINITIONS=[{
    id:'OBS-PLANNING-ORIENTATION',label:'OBS Planning Orientation',description:'repository → Direction → semantic registry/owner',
    sources:['planning/README.md','planning/AI-WORKING-CONTRACT.md','planning/direction-registry.md','planning/use-case-registry.md'],
    instruction:'Explain the current repository architecture and help select a Direction / semantic capability / canonical owner. Workspace methodology uses Use Cases; Applications use Scenario Catalogs. Commands are optional shortcuts.',target:'<repository/planning context>'
  }];

  const DIRECTION_DEFINITIONS=[
    {id:'DIR-REPOSITORY',label:'Orient In And Work With The Repository',description:'root repository capabilities',sources:['planning/direction-registry.md','planning/use-case-registry.md'],instruction:'Establish repository-wide semantic context and select the relevant Use Case.',target:'<repository task>'},
    {id:'DIR-PLAN-SOLUTION',label:'Plan A Solution / Workflow / Application',description:'whole solution → concept/prototype → current behavior → domain/delivery',sources:['planning/direction-registry.md','planning/documentation/application-planning/direction-registry.md','planning/documentation/application-planning/use-case-registry.md'],instruction:'Plan the whole solution first; when own Application responsibility exists, use the current selected planning Use Case such as Prototype, Scenario, Domain, Slice Strategy or one Slice. Rough walkthroughs are ordinary discovery techniques.',target:'<solution/application target>'},
    {id:'DIR-PLAN-WORKSPACE',label:'Plan / Review Workspace Capabilities',description:'Workspace UC → rules → vertical realization',sources:['planning/direction-registry.md','planning/documentation/workspace-planning/direction-registry.md','planning/documentation/workspace-planning/use-case-registry.md'],instruction:'Plan evolving Workspace capability changes through the selected Workspace Use Case. Keep Step 1/2/3 inside that UC, reuse generic UC identity and Architecture owners, and do not treat the Helper as semantic authority.',target:'<Workspace capability target>'},
    {id:'DIR-PLAN-ARCHITECTURE',label:'Plan / Review Workspace Architecture',description:'architecture state, paths, pressure, decisions and evolution',sources:['planning/direction-registry.md','planning/documentation/architecture-planning/direction-registry.md','planning/documentation/architecture-planning/use-case-registry.md'],instruction:'Use Architecture Planning to review current architecture, paths/change pressure and material decisions from canonical Workspace UCs and architecture-relevant candidates. Do not treat architecture-input discovery as canonical Workspace UC establishment/change authority.',target:'<Workspace architecture target>'},
    {id:'DIR-PLAN-TESTING',label:'Plan / Review Verification And Testing',description:'testing strategy, proof design and actual evidence review',sources:['planning/direction-registry.md','planning/documentation/testing-planning/direction-registry.md','planning/documentation/testing-planning/use-case-registry.md'],instruction:'Select Testing Strategy, Test Design or Current Test Coverage/Evidence Review. Tests remain evidence, not semantic authority.',target:'<testing target>'},
    {id:'DIR-DOCUMENTATION',label:'Use And Maintain Repository Documentation',description:'documentation governance',sources:['planning/direction-registry.md','planning/documentation/direction-registry.md','planning/documentation/use-case-registry.md'],instruction:'Select the documentation Use Case and follow reusable documentation governance/owner rules.',target:'<documentation target>'},
    {id:'DIR-DOCUMENTATION-WORKBENCH',label:'Develop And Maintain Documentation Workbench',description:'project-local documentation workbench',sources:['planning/direction-registry.md','planning/areas/documentation-workbench/direction-registry.md','planning/areas/documentation-workbench/use-case-registry.md'],instruction:'Establish current Workbench Use Case / Scenario context; historical Planning Item/Draft sources are provenance only.',target:'<workbench target>'},
    {id:'DIR-PLANNING-RUNTIME',label:'Use The OBS Planning Runtime',description:'dashboard/session runtime',sources:['planning/direction-registry.md','planning/areas/planning-system/direction-registry.md','planning/areas/planning-system/use-case-registry.md'],instruction:'Establish current planning-runtime capability without conflating runtime mechanics with reusable methodology.',target:'<planning runtime target>'},
    {id:'DIR-PLANNING-HELPER',label:'Use And Maintain Planning Helper',description:'helper application',sources:['planning/direction-registry.md','planning/documentation/tools/tampermonkey/chat-command-palette/direction-registry.md','planning/documentation/tools/tampermonkey/chat-command-palette/scenarios/README.md'],instruction:'Use the Planning Helper Scenario Catalog and Scenario owners; helper remains projection/runtime, not planning authority.',target:'<Planning Helper target>'},
    {id:'DIR-LINKED-NOTES',label:'Use And Maintain Linked Notes',description:'Linked Notes application',sources:['planning/direction-registry.md','planning/documentation/tools/tampermonkey/linked-notes/direction-registry.md','planning/documentation/tools/tampermonkey/linked-notes/scenarios/README.md'],instruction:'Use the Linked Notes Scenario Catalog and detailed Scenario owners.',target:'<Linked Notes target>'},
    {id:'DIR-REPLACEMENT-PACKAGE-APP',label:'Apply / Review / Finalize Replacement Packages',description:'replacement package consumer app',sources:['planning/direction-registry.md','planning/documentation/tools/replacement-package-app/direction-registry.md','planning/documentation/tools/replacement-package-app/USE-CASE-REGISTRY.md'],instruction:'Use Replacement Package App Use Cases and detailed Scenario owners; do not redefine producer command semantics.',target:'<replacement package app target>'}
  ];

  // BEGIN GENERATED CURRENT USE CASE PROJECTIONS
  const USE_CASE_DEFINITIONS=[
    {
      "id": "UC-DOC-BUILD-REPLACEMENT-PACKAGE",
      "label": "Build Replacement Package",
      "description": "package an approved exact file transition for a local consumer",
      "sources": [
        "planning/documentation/use-case-registry.md"
      ],
      "instruction": "Resolve UC-DOC-BUILD-REPLACEMENT-PACKAGE in the current canonical registry and follow its current owner route (build-replacement-archive-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Build Replacement Package target>",
      "directionId": "DIR-DOCUMENTATION",
      "manualInvocation": true,
      "trigger": "approved file transition + exact touched base",
      "result": "protocol-valid ZIP + OBS-ACTION",
      "commandId": "replacement_archive.create"
    },
    {
      "id": "UC-DOC-BUILD-REVIEWABLE-ARCHIVE",
      "label": "Build Legacy Review-Diff Archive Route",
      "description": "support the explicitly selected legacy repo-stored/clipboard diff-transfer package route",
      "sources": [
        "planning/documentation/use-case-registry.md"
      ],
      "instruction": "Resolve UC-DOC-BUILD-REVIEWABLE-ARCHIVE in the current canonical registry and follow its current owner route (reviewable-agent-output-and-commands-workflow.md + review-diff-file-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Build Legacy Review-Diff Archive Route target>",
      "directionId": "DIR-DOCUMENTATION",
      "manualInvocation": true,
      "trigger": "user explicitly selects legacy review-diff package mode",
      "result": "route-owned archive + transfer/capture instructions",
      "commandId": "replacement_archive.review_diff.create"
    },
    {
      "id": "UC-DOC-CONFIGURE-REVIEW-DEPENDENCIES",
      "label": "Configure Required Dependency Reviews",
      "description": "register semantic source→consumer relationships whose source changes must signal explicit downstream review",
      "sources": [
        "planning/documentation/use-case-registry.md"
      ],
      "instruction": "Resolve UC-DOC-CONFIGURE-REVIEW-DEPENDENCIES in the current canonical registry and follow its current owner route (review-dependency-planning-workflow.md + Linked Notes mechanism when available). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Configure Required Dependency Reviews target>",
      "directionId": "DIR-DOCUMENTATION",
      "manualInvocation": true,
      "trigger": "a meaningful dependency should not rely on human memory to notice downstream impact",
      "result": "explicit Review Dependency with source, consumer(s), reason/scope and freshness/review tracking route"
    },
    {
      "id": "UC-DOC-ESTABLISH-DEPENDENCY",
      "label": "Establish Semantic Dependency",
      "description": "decide/classify one meaningful semantic dependency and its owner/handoff",
      "sources": [
        "planning/documentation/use-case-registry.md"
      ],
      "instruction": "Resolve UC-DOC-ESTABLISH-DEPENDENCY in the current canonical registry and follow its current owner route (review-dependency-planning-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Establish Semantic Dependency target>",
      "directionId": "DIR-DOCUMENTATION",
      "manualInvocation": true,
      "trigger": "one owner/result materially depends on another",
      "result": "selected semantic dependency intent/classification + affected owners + realization need when any"
    },
    {
      "id": "UC-DOC-FIND-OWNER",
      "label": "Determine Where Information Belongs",
      "description": "place meaning in the narrowest non-duplicated owner zone",
      "sources": [
        "planning/documentation/use-case-registry.md"
      ],
      "instruction": "Resolve UC-DOC-FIND-OWNER in the current canonical registry and follow its current owner route (documentation-responsibility-zone-review-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Determine Where Information Belongs target>",
      "directionId": "DIR-DOCUMENTATION",
      "manualInvocation": true,
      "trigger": "content/file responsibility is unclear",
      "result": "reusable/project classification + narrow canonical owner"
    },
    {
      "id": "UC-DOC-MAINTAIN-COMMAND",
      "label": "Create / Maintain Planning Command",
      "description": "create or change a registered executable shortcut without turning it into semantic authority",
      "sources": [
        "planning/documentation/use-case-registry.md"
      ],
      "instruction": "Resolve UC-DOC-MAINTAIN-COMMAND in the current canonical registry and follow its current owner route (command-planning-workflow.md + command-routing-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Create / Maintain Planning Command target>",
      "directionId": "DIR-DOCUMENTATION",
      "manualInvocation": true,
      "trigger": "a new command is useful or an existing command route/definition must change",
      "result": "validated current planning/commands/*.command.md definition + correct semantic-entry/owner route + explicit output/permission boundary",
      "commandId": "command.plan"
    },
    {
      "id": "UC-DOC-MAINTAIN-NAVIGATION",
      "label": "Maintain Repository Documentation Navigation",
      "description": "maintain natural README/index/Direction-to-applicable-semantic-entry discovery routes without duplicating semantic bodies",
      "sources": [
        "planning/documentation/use-case-registry.md"
      ],
      "instruction": "Resolve UC-DOC-MAINTAIN-NAVIGATION in the current canonical registry and follow its current owner route (architecture principles + responsibility map + affected README/index/navigation owners; validate with coverage-review workflow). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Maintain Repository Documentation Navigation target>",
      "directionId": "DIR-DOCUMENTATION",
      "manualInvocation": true,
      "trigger": "a capability/behavior/owner is added, moved, renamed, retired or otherwise changes how readers should discover current meaning",
      "result": "affected navigation/read-order owners lead naturally to current Direction → primary semantic registry → Workspace/methodology Use Case or Application Scenario → canonical owner routes"
    },
    {
      "id": "UC-DOC-MAINTAIN-PROMPT",
      "label": "Create / Maintain Reusable Prompt",
      "description": "create/review/change reusable AI bootstrap/diagnostic/helper insertion text that navigates current owners without becoming authority",
      "sources": [
        "planning/documentation/use-case-registry.md"
      ],
      "instruction": "Resolve UC-DOC-MAINTAIN-PROMPT in the current canonical registry and follow its current owner route (prompt-maintenance-workflow.md + planning/helper-library/README.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Create / Maintain Reusable Prompt target>",
      "directionId": "DIR-DOCUMENTATION",
      "manualInvocation": true,
      "trigger": "a reusable prompt is needed or an existing prompt is stale/duplicative/misrouting",
      "result": "valid current prompt with explicit profile, owner-navigation boundary and proportional output/evidence contract"
    },
    {
      "id": "UC-DOC-MAINTAIN-REGISTRIES",
      "label": "Maintain Directions And Use Cases",
      "description": "keep semantic Direction/Use-Case capability contracts current and complete",
      "sources": [
        "planning/documentation/use-case-registry.md"
      ],
      "instruction": "Resolve UC-DOC-MAINTAIN-REGISTRIES in the current canonical registry and follow its current owner route (direction-and-use-case-registry-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Maintain Directions And Use Cases target>",
      "directionId": "DIR-DOCUMENTATION",
      "manualInvocation": true,
      "trigger": "semantic capability/direction meaning changes",
      "result": "complete current registry entries + correct semantic parent/owner/handoff links"
    },
    {
      "id": "UC-DOC-MAINTAIN-SHARED-EXACT-MEANING",
      "label": "Maintain Shared Exact Meaning",
      "description": "preserve one exact literal/shared definition across consumers when exact synchronization is truly required",
      "sources": [
        "planning/documentation/use-case-registry.md"
      ],
      "instruction": "Resolve UC-DOC-MAINTAIN-SHARED-EXACT-MEANING in the current canonical registry and follow its current owner route (review-dependency-planning-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Maintain Shared Exact Meaning target>",
      "directionId": "DIR-DOCUMENTATION",
      "manualInvocation": true,
      "trigger": "repeated exact text/definition must remain synchronized",
      "result": "canonical exact meaning + synchronized consumers through the narrowest suitable mechanism"
    },
    {
      "id": "UC-DOC-ORIENT",
      "label": "Bootstrap Reusable Documentation Governance",
      "description": "load reusable documentation methodology and resolve the applicable documentation capability/owners",
      "sources": [
        "planning/documentation/use-case-registry.md"
      ],
      "instruction": "Resolve UC-DOC-ORIENT in the current canonical registry and follow its current owner route (documentation-principles-read-workflow.md + architecture principles + responsibility map + this registry). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Bootstrap Reusable Documentation Governance target>",
      "directionId": "DIR-DOCUMENTATION",
      "manualInvocation": true,
      "trigger": "a new chat/session starts documentation work, reusable documentation principles are explicitly requested, or ownership/governance is uncertain",
      "result": "reusable principles loaded + applicable UC-DOC-* and canonical reusable/current owners identified + permission boundary understood",
      "commandId": "documentation_principles.read"
    },
    {
      "id": "UC-DOC-PLAN-FILE-UPDATE",
      "label": "Plan Concrete File / Docs / Code Update",
      "description": "translate selected meaning into one concrete ordered file transition",
      "sources": [
        "planning/documentation/use-case-registry.md"
      ],
      "instruction": "Resolve UC-DOC-PLAN-FILE-UPDATE in the current canonical registry and follow its current owner route (file-update-overview-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Plan Concrete File / Docs / Code Update target>",
      "directionId": "DIR-DOCUMENTATION",
      "manualInvocation": true,
      "trigger": "selected meaning needs concrete file transition",
      "result": "ordered File Update Plan",
      "commandId": "file_update.plan"
    },
    {
      "id": "UC-DOC-PLAN-UPDATE",
      "label": "Plan A Documentation Update",
      "description": "plan a material documentation change through the affected Workspace UC(s), semantic rules/owners and vertical realization before execution",
      "sources": [
        "planning/documentation/use-case-registry.md"
      ],
      "instruction": "Resolve UC-DOC-PLAN-UPDATE in the current canonical registry and follow its current owner route (documentation-update-plan-workflow.md → workspace-planning/ as needed → file-update workflow only when an explicit ordered concrete file plan is selected). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Plan A Documentation Update target>",
      "directionId": "DIR-DOCUMENTATION",
      "manualInvocation": true,
      "trigger": "material docs change needs integrated semantic/owner/realization review",
      "result": "checked UC-centric documentation target plan to the selected depth, including exact affected-file surface when Step 3 is selected"
    },
    {
      "id": "UC-DOC-RECONCILE-STATUS",
      "label": "Reconcile Documentation / Owner Status",
      "description": "resolve inconsistent active/current/deferred/retired state",
      "sources": [
        "planning/documentation/use-case-registry.md"
      ],
      "instruction": "Resolve UC-DOC-RECONCILE-STATUS in the current canonical registry and follow its current owner route (status-reconciliation-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Reconcile Documentation / Owner Status target>",
      "directionId": "DIR-DOCUMENTATION",
      "manualInvocation": true,
      "trigger": "owner/status labels or routes may disagree",
      "result": "explicit reconciled status + owner route"
    },
    {
      "id": "UC-DOC-REVIEW-COVERAGE",
      "label": "Review Repository Navigation / Semantic Coverage",
      "description": "verify that Workspace/methodology capabilities, Application behavior and canonical owners are naturally discoverable through the correct semantic registry",
      "sources": [
        "planning/documentation/use-case-registry.md"
      ],
      "instruction": "Resolve UC-DOC-REVIEW-COVERAGE in the current canonical registry and follow its current owner route (repository-navigation-and-use-case-coverage-review-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Review Repository Navigation / Semantic Coverage target>",
      "directionId": "DIR-DOCUMENTATION",
      "manualInvocation": true,
      "trigger": "repository discoverability/semantic coverage may be incomplete",
      "result": "uncovered Workspace/methodology UCs, uncovered Application Scenarios, orphan owners, broken routes and incomplete semantic contracts identified with maintenance/planning handoffs"
    },
    {
      "id": "UC-DOC-REVIEW-CURRENT-CONSISTENCY",
      "label": "Review Current Semantic Consistency",
      "description": "verify that current reusable/project owners, registries, templates and projections agree on selected meaning",
      "sources": [
        "planning/documentation/use-case-registry.md"
      ],
      "instruction": "Resolve UC-DOC-REVIEW-CURRENT-CONSISTENCY in the current canonical registry and follow its current owner route (current-semantic-consistency-review-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Review Current Semantic Consistency target>",
      "directionId": "DIR-DOCUMENTATION",
      "manualInvocation": true,
      "trigger": "a material methodology change or consistency concern may leave stale/duplicated/conflicting current semantics",
      "result": "checked contradictions/stale duplicates/orphan routes + selected corrective owner updates"
    },
    {
      "id": "UC-DOC-REVIEW-DEPENDENCY-COVERAGE",
      "label": "Review Dependency Coverage",
      "description": "determine whether material semantic dependencies that must not rely on memory are represented/reviewable",
      "sources": [
        "planning/documentation/use-case-registry.md"
      ],
      "instruction": "Resolve UC-DOC-REVIEW-DEPENDENCY-COVERAGE in the current canonical registry and follow its current owner route (review-dependency-planning-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Review Dependency Coverage target>",
      "directionId": "DIR-DOCUMENTATION",
      "manualInvocation": true,
      "trigger": "completeness of dependency handling materially affects correctness",
      "result": "missing/weak/duplicate dependency findings + treatment route"
    },
    {
      "id": "UC-DOC-REVIEW-DEPENDENTS",
      "label": "Review Semantic Dependents",
      "description": "review known consumers/dependents after material upstream change",
      "sources": [
        "planning/documentation/use-case-registry.md"
      ],
      "instruction": "Resolve UC-DOC-REVIEW-DEPENDENTS in the current canonical registry and follow its current owner route (review-dependency-planning-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Review Semantic Dependents target>",
      "directionId": "DIR-DOCUMENTATION",
      "manualInvocation": true,
      "trigger": "selected source meaning changed or dependency review is explicitly requested/needed for correctness",
      "result": "checked affected dependents + stale/current findings + required repairs"
    },
    {
      "id": "UC-DOC-REVIEW-DIFF",
      "label": "Semantically Review A Repository ReviewDiff",
      "description": "determine whether an applied/proposed repository transition is correct, necessary and integrated",
      "sources": [
        "planning/documentation/use-case-registry.md"
      ],
      "instruction": "Resolve UC-DOC-REVIEW-DIFF in the current canonical registry and follow its current owner route (review-diff-review-workflow.md + affected current owners + shared Idea owners). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Semantically Review A Repository ReviewDiff target>",
      "directionId": "DIR-DOCUMENTATION",
      "manualInvocation": true,
      "trigger": "ReviewDiff is pasted/attached/delivered/selected for review",
      "result": "checked findings + selected corrective plan when needed + Current-Plan-relative Q/R/P + ReviewDiff verdict",
      "commandId": "critical_review.apply"
    },
    {
      "id": "UC-DOC-REVIEW-EXAMPLES",
      "label": "Review Practical Example Coverage",
      "description": "decide whether reusable meaning needs a demonstration and where it belongs",
      "sources": [
        "planning/documentation/use-case-registry.md"
      ],
      "instruction": "Resolve UC-DOC-REVIEW-EXAMPLES in the current canonical registry and follow its current owner route (example-coverage-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Review Practical Example Coverage target>",
      "directionId": "DIR-DOCUMENTATION",
      "manualInvocation": true,
      "trigger": "reusable method/template needs demonstration review",
      "result": "example need / owner / boundary decision"
    },
    {
      "id": "UC-DOC-REVISE-RETURNED-FILES",
      "label": "Reconcile User-Returned Files",
      "description": "reconcile externally edited/reviewed files into complete current artifacts",
      "sources": [
        "planning/documentation/use-case-registry.md"
      ],
      "instruction": "Resolve UC-DOC-REVISE-RETURNED-FILES in the current canonical registry and follow its current owner route (reviewable-agent-output-and-commands-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Reconcile User-Returned Files target>",
      "directionId": "DIR-DOCUMENTATION",
      "manualInvocation": true,
      "trigger": "user returns edited files for revision",
      "result": "complete reconciled files",
      "commandId": "returned_files.revise"
    },
    {
      "id": "UC-DOC-UPDATE",
      "label": "Perform An Approved Documentation Update",
      "description": "apply already selected documentation meaning to current owners",
      "sources": [
        "planning/documentation/use-case-registry.md"
      ],
      "instruction": "Resolve UC-DOC-UPDATE in the current canonical registry and follow its current owner route (documentation-update-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Perform An Approved Documentation Update target>",
      "directionId": "DIR-DOCUMENTATION",
      "manualInvocation": true,
      "trigger": "selected meaning is authorized for docs change",
      "result": "current owners updated consistently"
    },
    {
      "id": "UC-DW-DOC-REF",
      "label": "Repository Documentation Change And Reference Review",
      "description": "change repository documentation while preserving stable navigation/reference meaning and affected-use review.",
      "sources": [
        "planning/areas/documentation-workbench/use-case-registry.md"
      ],
      "instruction": "Resolve UC-DW-DOC-REF in the current canonical registry and follow its current owner route (repository-documentation-change-and-reference-review-workflow.md + [SCN-DW-DOC-REF](scenarios/SCN-DW-DOC-REF.md).). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Repository Documentation Change And Reference Review target>",
      "directionId": "DIR-DOCUMENTATION-WORKBENCH",
      "manualInvocation": true,
      "trigger": "repository file/folder/stable section is selected for direct documentation work or accepted planning meaning is ready for materialization.",
      "result": "complete changed Markdown/docs with validated stable links and explicit affected-use review state, or an explicit unresolved/deferred result."
    },
    {
      "id": "UC-DW-PLANNING-TO-REPOSITORY",
      "label": "Planning Meaning To Repository",
      "description": "turn selected current planning meaning into a reviewable repository realization/handoff without forcing a duplicate planning layer.",
      "sources": [
        "planning/areas/documentation-workbench/use-case-registry.md"
      ],
      "instruction": "Resolve UC-DW-PLANNING-TO-REPOSITORY in the current canonical registry and follow its current owner route (planning-meaning-to-repository-workflow.md + shared Idea/Workspace-planning owners + File Update owners only when that explicit route is selected + [SCN-DW-PLANNING-TO-REPOSITORY](scenarios/SCN-DW-PLANNING-TO-REPOSITORY.md).). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Planning Meaning To Repository target>",
      "directionId": "DIR-DOCUMENTATION-WORKBENCH",
      "manualInvocation": true,
      "trigger": "selected source/current owners/Ideas/current conclusions require integration and repository file handoff.",
      "result": "reconciled current planning meaning plus a concrete reviewable repository realization/handoff surface to the selected depth; an ordered File Update Plan is included only when that separate capability is selected/useful, otherwise an explicit unresolved/deferred state is allowed."
    },
    {
      "id": "UC-PLAN-APP-CONCEPT",
      "label": "Plan / Review Application Concept",
      "description": "evaluate whether/how own application behavior would simplify the real-world workflow before detailed application planning",
      "sources": [
        "planning/documentation/application-planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-PLAN-APP-CONCEPT in the current canonical registry and follow its current owner route (planning principles + whole-solution workflow + Concept template). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Plan / Review Application Concept target>",
      "directionId": "DIR-PLAN-SOLUTION",
      "manualInvocation": true,
      "trigger": "custom application is a material candidate, or application creation is confirmed but concept/value/feasibility is not grounded",
      "result": "reviewed Application Concept + Concept Features + feasibility/rough effort/maintenance picture + viable-alternative comparison + current worth-it conclusion",
      "commandId": "application_concept.plan"
    },
    {
      "id": "UC-PLAN-APPLICATION",
      "label": "Establish Application Responsibility",
      "description": "establish the exact application boundary when the selected whole solution includes own application behavior or that responsibility is already confirmed",
      "sources": [
        "planning/documentation/application-planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-PLAN-APPLICATION in the current canonical registry and follow its current owner route (planning principles + whole-solution workflow). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Establish Application Responsibility target>",
      "directionId": "DIR-PLAN-SOLUTION",
      "manualInvocation": true,
      "trigger": "selected solution/Concept includes own application behavior, or external context already confirms it",
      "result": "explicit application responsibility/boundary",
      "commandId": "application_responsibility.establish"
    },
    {
      "id": "UC-PLAN-ARCH-DECISION",
      "label": "Plan / Review One Material Architecture Decision",
      "description": "select/review one architecture choice by its correctness and effects on important current/future Workspace paths",
      "sources": [
        "planning/documentation/architecture-planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-PLAN-ARCH-DECISION in the current canonical registry and follow its current owner route (architecture-decision-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Plan / Review One Material Architecture Decision target>",
      "directionId": "DIR-PLAN-ARCHITECTURE",
      "manualInvocation": true,
      "trigger": "one material architecture pressure/problem/choice is ready for explicit comparison",
      "result": "selected Architecture Decision + Intent + affected-path conclusion + Rejected Complexity + Revisit Trigger when useful",
      "commandId": "architecture_decision.plan"
    },
    {
      "id": "UC-PLAN-ARCH-DISCOVER-WEUC",
      "label": "Discover Contextual Workspace Evolution Use Cases",
      "description": "discover bounded future Workspace-evolution work instances against a concrete current/target owner/change surface",
      "sources": [
        "planning/documentation/architecture-planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-PLAN-ARCH-DISCOVER-WEUC in the current canonical registry and follow its current owner route (workspace-evolution-use-case-discovery-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Discover Contextual Workspace Evolution Use Cases target>",
      "directionId": "DIR-PLAN-ARCHITECTURE",
      "manualInvocation": true,
      "trigger": "explicit WEUC/evolvability discovery is requested, Architecture planning needs contextual future-change evidence, or Application SDS Step 3 needs architecture-driving future-change evidence",
      "result": "contextual WEUC Types/instances + likelihood/value/timing + expected Workspace Change Paths + friction/fan-out/migration/verification risk + architecture-handoff yes/no",
      "commandId": "architecture_weuc.discover"
    },
    {
      "id": "UC-PLAN-ARCH-EVOLUTION",
      "label": "Plan / Review Workspace Architecture Evolution",
      "description": "select a coherent target architecture change when several related decisions/risks must move together",
      "sources": [
        "planning/documentation/architecture-planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-PLAN-ARCH-EVOLUTION in the current canonical registry and follow its current owner route (architecture-evolution-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Plan / Review Workspace Architecture Evolution target>",
      "directionId": "DIR-PLAN-ARCHITECTURE",
      "manualInvocation": true,
      "trigger": "current Architecture State and accumulated pressure require coordinated multi-decision evolution",
      "result": "selected target architecture/evolution direction + boundaries/transition constraints + routed downstream realization work"
    },
    {
      "id": "UC-PLAN-ARCH-PATH",
      "label": "Trace / Evaluate Architecture-Relevant Path",
      "description": "understand what must actually be understood, changed or executed for one material result and expose architecture cost/pressure",
      "sources": [
        "planning/documentation/architecture-planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-PLAN-ARCH-PATH in the current canonical registry and follow its current owner route (architecture-path-analysis-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Trace / Evaluate Architecture-Relevant Path target>",
      "directionId": "DIR-PLAN-ARCHITECTURE",
      "manualInvocation": true,
      "trigger": "one Workspace UC, important Workspace Change Case, Extension-derived future UC or Application Scenario needs path analysis",
      "result": "checked Workspace Understanding Path, Workspace Change Path or Runtime Realization Path + qualitative architecture findings",
      "commandId": "architecture_path.trace"
    },
    {
      "id": "UC-PLAN-ARCH-PRESSURE",
      "label": "Establish / Review Workspace Change Pressure",
      "description": "determine where important current/future work creates architecture pressure and which generalized Change Axes are evidence-backed",
      "sources": [
        "planning/documentation/architecture-planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-PLAN-ARCH-PRESSURE in the current canonical registry and follow its current owner route (architecture-change-pressure-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Establish / Review Workspace Change Pressure target>",
      "directionId": "DIR-PLAN-ARCHITECTURE",
      "manualInvocation": true,
      "trigger": "Workspace architecture must account for important UCs, Workspace Change Cases, Extensions, constraints or observed history",
      "result": "Change Pressure picture + evidence-backed Change Axes/confidence + Change Hot Paths + material architecture findings",
      "commandId": "architecture_pressure.review"
    },
    {
      "id": "UC-PLAN-ARCH-STATE",
      "label": "Understand / Review Workspace Architecture State",
      "description": "establish an inspectable current architecture baseline and identify material architecture/maintainability concerns relative to important Workspace work",
      "sources": [
        "planning/documentation/architecture-planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-PLAN-ARCH-STATE in the current canonical registry and follow its current owner route (architecture-state-review-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Understand / Review Workspace Architecture State target>",
      "directionId": "DIR-PLAN-ARCHITECTURE",
      "manualInvocation": true,
      "trigger": "current Workspace architecture needs orientation/review or an architecture baseline is needed before further work",
      "result": "current Architecture State + Architecture Intent where known + intentional/accidental/speculative/legacy complexity findings + Maintainability Risks / revisit triggers when material"
    },
    {
      "id": "UC-PLAN-ARCH-WORKSPACE-USES",
      "label": "Discover / Review Workspace Use Cases",
      "description": "establish the architecture-relevant current-work picture from canonical Workspace UCs plus explicit candidate useful results without taking canonical UC lifecycle authority",
      "sources": [
        "planning/documentation/architecture-planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-PLAN-ARCH-WORKSPACE-USES in the current canonical registry and follow its current owner route (workspace-use-case-discovery-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Discover / Review Workspace Use Cases target>",
      "directionId": "DIR-PLAN-ARCHITECTURE",
      "manualInvocation": true,
      "trigger": "explicit important-work picture is needed or current/future Workspace work has materially changed",
      "result": "important current canonical Workspace UCs + architecture-relevant candidate useful results/future UC candidates + relevance/frequency evidence when useful + canonical Workspace Planning handoff when establishment/change/topology is required"
    },
    {
      "id": "UC-PLAN-COLLECT-IDEAS",
      "label": "Collect And Review Ideas From Selected Source",
      "description": "extract/review answer-seeking Ideas while preserving non-Idea context",
      "sources": [
        "planning/documentation/application-planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-PLAN-COLLECT-IDEAS in the current canonical registry and follow its current owner route (shared Idea owners). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Collect And Review Ideas From Selected Source target>",
      "directionId": "DIR-PLAN-SOLUTION",
      "manualInvocation": true,
      "trigger": "selected source contains answer-seeking Ideas",
      "result": "reviewed Ideas + Q/R/P + conclusions",
      "commandId": "ideas.collect"
    },
    {
      "id": "UC-PLAN-CONSISTENCY",
      "label": "Review Cross-Scenario / Screen / Requirement / Domain / Slice Consistency",
      "description": "detect contradictions/change impact across current behavioral/spatial/requirement/conceptual/delivery owners",
      "sources": [
        "planning/documentation/application-planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-PLAN-CONSISTENCY in the current canonical registry and follow its current owner route (complete selected owners + detailed-planning contract). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Review Cross-Scenario / Screen / Requirement / Domain / Slice Consistency target>",
      "directionId": "DIR-PLAN-SOLUTION",
      "manualInvocation": true,
      "trigger": "multiple owners may conflict or one owner changed materially",
      "result": "explicit contradictions/corrections/review state"
    },
    {
      "id": "UC-PLAN-DOMAIN",
      "label": "Plan / Review Domain",
      "description": "compare/refine/select/review the simplest explicit conceptual language/lifecycle/rules/boundaries that supports current meaning and cheap justified evolution",
      "sources": [
        "planning/documentation/application-planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-PLAN-DOMAIN in the current canonical registry and follow its current owner route (domain-planning-workflow.md + Domain template). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Plan / Review Domain target>",
      "directionId": "DIR-PLAN-SOLUTION",
      "manualInvocation": true,
      "trigger": "Domain candidates/meaning are sufficiently understood and separate Domain ownership materially improves clarity/consistency/change cost",
      "result": "selected Domain meaning + current Scenario/Requirement coverage + justified variation/invariant decisions + verification meaning + draft-state review",
      "commandId": "application_domain.plan"
    },
    {
      "id": "UC-PLAN-DOMAIN-DISCOVERY",
      "label": "Discover Domain Evidence / Candidates",
      "description": "discover evidence-backed concepts/identity/lifecycle/rules/invariants/policies/consistency candidates before selecting a current Domain model",
      "sources": [
        "planning/documentation/application-planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-PLAN-DOMAIN-DISCOVERY in the current canonical registry and follow its current owner route (domain-discovery-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Discover Domain Evidence / Candidates target>",
      "directionId": "DIR-PLAN-SOLUTION",
      "manualInvocation": true,
      "trigger": "current Scenario/DATA/Behavior/Requirements contain enough semantic complexity that explicit discovery materially helps",
      "result": "Domain evidence + candidates + invariant/policy findings + integrated Domain Variants when material",
      "commandId": "application_domain.discover"
    },
    {
      "id": "UC-PLAN-PROTOTYPE",
      "label": "Prototype Application Experience / Workflow",
      "description": "cheaply test/refine provisional user interaction, Scenario boundaries, Screens and Requirements before canonical detailed behavior/spatial ownership",
      "sources": [
        "planning/documentation/application-planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-PLAN-PROTOTYPE in the current canonical registry and follow its current owner route (prototype-planning-workflow.md + Prototype Plan/Result templates). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Prototype Application Experience / Workflow target>",
      "directionId": "DIR-PLAN-SOLUTION",
      "manualInvocation": true,
      "trigger": "Application Concept/responsibility exists but important interaction/workflow/spatial uncertainty remains",
      "result": "reviewed Prototype Plan/Result with Prototype Scenarios/Screens + evidence-backed candidate Requirements/DATA/Behavior/Change-Axis findings and handoff",
      "commandId": "application_prototype.plan"
    },
    {
      "id": "UC-PLAN-REALITY",
      "label": "Understand Current Workflow And Reality",
      "description": "establish checked present reality before solution selection when it matters",
      "sources": [
        "planning/documentation/application-planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-PLAN-REALITY in the current canonical registry and follow its current owner route (solution-and-scenario-planning-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Understand Current Workflow And Reality target>",
      "directionId": "DIR-PLAN-SOLUTION",
      "manualInvocation": true,
      "trigger": "current context materially affects solution choice",
      "result": "descriptive checked Current Reality",
      "commandId": "application_reality.review"
    },
    {
      "id": "UC-PLAN-REALIZATION",
      "label": "Review / Compare High-Level Application Realization",
      "description": "provide bounded realization evidence for representative selected meaning or serious candidate Domain variants when technical feasibility/cost/performance/consistency can materially affect selection",
      "sources": [
        "planning/documentation/application-planning/use-case-registry.md"
      ],
      "instruction": "Resolve this exact canonical Use-Case entry and follow application-realization-workflow.md. Review or compare representative realization paths when material, including pre-Domain comparative evidence, without letting implementation convenience or this projection become Domain authority.",
      "target": "<Review / Compare High-Level Application Realization target>",
      "directionId": "DIR-PLAN-SOLUTION",
      "manualInvocation": true,
      "trigger": "current application/Domain meaning needs a high-level stress check, or grounded Domain candidates cannot be selected confidently without comparative realization evidence",
      "result": "high-level realization picture or candidate comparison + representative Runtime/Implementation Paths + material feasibility/cost/constraint/upstream findings",
      "commandId": "application_realization.review"
    },
    {
      "id": "UC-PLAN-RESEARCH",
      "label": "Research Existing Solutions / Alternatives",
      "description": "reduce a material evidence gap affecting whole-solution choice",
      "sources": [
        "planning/documentation/application-planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-PLAN-RESEARCH in the current canonical registry and follow its current owner route (selected solution/current owner + checked sources). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Research Existing Solutions / Alternatives target>",
      "directionId": "DIR-PLAN-SOLUTION",
      "manualInvocation": true,
      "trigger": "material evidence gap affects solution choice",
      "result": "checked options/evidence/disposition",
      "commandId": "application_research.research"
    },
    {
      "id": "UC-PLAN-SCENARIO",
      "label": "Draft / Review Detailed Scenario",
      "description": "own detailed observable behavior and local/shared supporting planning for one meaningful current Scenario",
      "sources": [
        "planning/documentation/application-planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-PLAN-SCENARIO in the current canonical registry and follow its current owner route (detailed-planning/README.md + Scenario template). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Draft / Review Detailed Scenario target>",
      "directionId": "DIR-PLAN-SOLUTION",
      "manualInvocation": true,
      "trigger": "one Scenario boundary is meaningful enough for detail",
      "result": "current Scenario workspace with behavior owner + relevant Ideas/DATA/Behavior/Visual/Requirements + draft-state review",
      "commandId": "application_scenario.plan"
    },
    {
      "id": "UC-PLAN-SCENARIO-DISCOVERY",
      "label": "Discover Application Scenarios",
      "description": "identify independently meaningful user-visible Need/result behavior boundaries for the selected Application responsibility",
      "sources": [
        "planning/documentation/application-planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-PLAN-SCENARIO-DISCOVERY in the current canonical registry and follow its current owner route (planning workflow + prototype workflow when used). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Discover Application Scenarios target>",
      "directionId": "DIR-PLAN-SOLUTION",
      "manualInvocation": true,
      "trigger": "selected Application responsibility or prototype findings need current behavioral boundaries",
      "result": "current Scenario inventory/boundaries + material Future Scenario Ideas/Change Axes when discovered",
      "commandId": "application_scenarios.discover"
    },
    {
      "id": "UC-PLAN-SLICE",
      "label": "Plan / Review One Implementation Slice",
      "description": "plan one selected separately deliverable/checkable implementation increment",
      "sources": [
        "planning/documentation/application-planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-PLAN-SLICE in the current canonical registry and follow its current owner route (slice-planning-workflow.md + Implementation Slice template). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Plan / Review One Implementation Slice target>",
      "directionId": "DIR-PLAN-SOLUTION",
      "manualInvocation": true,
      "trigger": "one Slice boundary is selected and behavior/domain meaning is understood enough",
      "result": "integrated Slice plan + optional implementation-part/visual/verification plans",
      "commandId": "application_slice.plan"
    },
    {
      "id": "UC-PLAN-SLICE-STRATEGY",
      "label": "Plan / Review Slice Strategy",
      "description": "select implementation decomposition/order into useful vertical separately deliverable/checkable increments",
      "sources": [
        "planning/documentation/application-planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-PLAN-SLICE-STRATEGY in the current canonical registry and follow its current owner route (slice-planning-workflow.md + Slice Strategy template). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Plan / Review Slice Strategy target>",
      "directionId": "DIR-PLAN-SOLUTION",
      "manualInvocation": true,
      "trigger": "implementation is large/uncertain enough that decomposition/order materially matters",
      "result": "selected Slice decomposition/order + dependencies + delivery/learning/risk rationale",
      "commandId": "application_slice_strategy.plan"
    },
    {
      "id": "UC-PLAN-SOLUTION",
      "label": "Plan / Review Whole Solution Or Workflow",
      "description": "select/evaluate the best integrated whole answer before assuming custom application work",
      "sources": [
        "planning/documentation/application-planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-PLAN-SOLUTION in the current canonical registry and follow its current owner route (solution-and-scenario-planning-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Plan / Review Whole Solution Or Workflow target>",
      "directionId": "DIR-PLAN-SOLUTION",
      "manualInvocation": true,
      "trigger": "Need requires integrated answer",
      "result": "current whole Solution/Workflow Variant + integration conclusion",
      "commandId": "application_solution.plan"
    },
    {
      "id": "UC-PLAN-TEST-COVERAGE",
      "label": "Review Current Test Coverage / Evidence",
      "description": "check whether actual current tests/evidence really prove current selected meaning",
      "sources": [
        "planning/documentation/testing-planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-PLAN-TEST-COVERAGE in the current canonical registry and follow its current owner route (test-coverage-review-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Review Current Test Coverage / Evidence target>",
      "directionId": "DIR-PLAN-TESTING",
      "manualInvocation": true,
      "trigger": "current tests/evidence must be trusted, changed or audited",
      "result": "behavior→actual-evidence mapping + missing/weak/stale/duplicated/wrong-layer findings",
      "commandId": "test_coverage.review"
    },
    {
      "id": "UC-PLAN-TEST-DESIGN",
      "label": "Plan / Review Verification For Selected Behavior",
      "description": "decide how selected Scenario/Requirement/Domain/Slice behavior will be convincingly proved",
      "sources": [
        "planning/documentation/testing-planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-PLAN-TEST-DESIGN in the current canonical registry and follow its current owner route (test-design-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Plan / Review Verification For Selected Behavior target>",
      "directionId": "DIR-PLAN-TESTING",
      "manualInvocation": true,
      "trigger": "selected behavior is understood enough to design proof",
      "result": "Behavior-to-Test Trace + selected layers + concrete assertions + risk/boundary decisions",
      "commandId": "test_design.plan"
    },
    {
      "id": "UC-PLAN-TEST-PLAN",
      "label": "Plan Practical Testing / Acceptance",
      "description": "assemble a practical operated proof plan for one meaningful application/change result across selected behaviors",
      "sources": [
        "planning/documentation/testing-planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-PLAN-TEST-PLAN in the current canonical registry and follow its current owner route (practical-testing-plan-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Plan Practical Testing / Acceptance target>",
      "directionId": "DIR-PLAN-TESTING",
      "manualInvocation": true,
      "trigger": "selected behavior/proof choices are grounded enough that a real practical verification pass or campaign is useful",
      "result": "Practical Testing Plan with acceptance cards, operator/environment/setup/actions/evidence/pass-fail and campaign scope when needed",
      "commandId": "practical_testing.plan"
    },
    {
      "id": "UC-PLAN-TEST-STRATEGY",
      "label": "Establish / Review Testing Strategy",
      "description": "establish shared/cross-Slice proof responsibilities and avoid duplicated/missing coverage",
      "sources": [
        "planning/documentation/testing-planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-PLAN-TEST-STRATEGY in the current canonical registry and follow its current owner route (testing-strategy-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Establish / Review Testing Strategy target>",
      "directionId": "DIR-PLAN-TESTING",
      "manualInvocation": true,
      "trigger": "testing responsibility spans several Slices/layers or shared harness/data/isolation/E2E policy materially matters",
      "result": "current testing strategy + layer responsibilities + shared proof/data/isolation boundaries",
      "commandId": "testing_strategy.plan"
    },
    {
      "id": "UC-PLAN-WORKSPACE-CHANGE-UC",
      "label": "Review / Change Workspace Use Case",
      "description": "integrate all currently selected change meaning for one existing Workspace UC into one coherent Target UC and realization plan.",
      "sources": [
        "planning/documentation/workspace-planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-PLAN-WORKSPACE-CHANGE-UC in the current canonical registry and follow its current owner route ([review-change-workspace-use-case-workflow.md](review-change-workspace-use-case-workflow.md) + [workspace-planning-principles-and-terminology.md](workspace-planning-principles-and-terminology.md)). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Review / Change Workspace Use Case target>",
      "directionId": "DIR-PLAN-WORKSPACE",
      "manualInvocation": true,
      "trigger": "Ideas, requirements, evidence, corrections or change pressure materially affect a current Workspace Use Case.",
      "result": "the current UC is intentionally unchanged, or one integrated Target UC plan is established to the selected planning depth: Target UC meaning at Step 1, plus Step-2 semantic rules and Step-3 vertical realization/file surface only when those depths are selected and reviewed."
    },
    {
      "id": "UC-PLAN-WORKSPACE-ESTABLISH-UC",
      "label": "Establish Workspace Use Case",
      "description": "determine whether a useful Workspace result needs a new Use Case and, when justified, establish one coherent target UC contract and owner route.",
      "sources": [
        "planning/documentation/workspace-planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-PLAN-WORKSPACE-ESTABLISH-UC in the current canonical registry and follow its current owner route ([establish-workspace-use-case-workflow.md](establish-workspace-use-case-workflow.md) + [workspace-planning-principles-and-terminology.md](workspace-planning-principles-and-terminology.md)). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Establish Workspace Use Case target>",
      "directionId": "DIR-PLAN-WORKSPACE",
      "manualInvocation": true,
      "trigger": "a Need, Idea, Extension or observed Workspace result is not clearly owned by a current Workspace Use Case.",
      "result": "either an existing UC is confirmed as the correct owner and work hands off to UC-PLAN-WORKSPACE-CHANGE-UC, or one justified new Target UC contract + graph placement is established, with Step-2 semantic meaning and Step-3 vertical realization/file surface included only when those depths are selected and reviewed."
    },
    {
      "id": "UC-PLAN-WORKSPACE-REVIEW-TOPOLOGY",
      "label": "Review Workspace Use-Case Topology",
      "description": "produce a coherent graph/boundary model when several Workspace Use Cases must be reviewed together.",
      "sources": [
        "planning/documentation/workspace-planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-PLAN-WORKSPACE-REVIEW-TOPOLOGY in the current canonical registry and follow its current owner route ([review-workspace-use-case-topology-workflow.md](review-workspace-use-case-topology-workflow.md) + [workspace-planning-principles-and-terminology.md](workspace-planning-principles-and-terminology.md)). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Review Workspace Use-Case Topology target>",
      "directionId": "DIR-PLAN-WORKSPACE",
      "manualInvocation": true,
      "trigger": "overlap, split/merge/extraction pressure, changed dependencies/handoffs, or a cross-cutting Idea that creates a material boundary/relationship question affects several UCs and makes coherent topology review independently useful.",
      "result": "coherent selected UC boundaries + semantic relationships + one local Target UC projection for every affected UC, with Step-2/Step-3 meaning and cross-UC/cross-Slice architecture findings included only to the selected/reviewed depth."
    },
    {
      "id": "UC-PR-END-SESSION",
      "label": "End Active Planning Session",
      "description": "close the active operational planning session/day consistently and expose the resulting next state.",
      "sources": [
        "planning/areas/planning-system/use-case-registry.md"
      ],
      "instruction": "Resolve UC-PR-END-SESSION in the current canonical registry and follow its current owner route ([end-session-command-workflow.md](end-session-command-workflow.md) + [SCN-PR-END-SESSION](scenarios/SCN-PR-END-SESSION.md).). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<End Active Planning Session target>",
      "directionId": "DIR-PLANNING-RUNTIME",
      "manualInvocation": true,
      "trigger": "user explicitly ends the active session/day workflow.",
      "result": "current operational session state is closed/logged according to the runtime workflow and next state is explicit.",
      "commandId": "session.end"
    },
    {
      "id": "UC-REPO-AUDIT-REVIEW",
      "label": "Audit Review Coverage And Quality",
      "description": "report what was actually reviewed, how sufficient it was and what a repeat review added",
      "sources": [
        "planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-REPO-AUDIT-REVIEW in the current canonical registry and follow its current owner route (documentation/review-audit-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Audit Review Coverage And Quality target>",
      "directionId": "DIR-REPOSITORY",
      "manualInvocation": true,
      "trigger": "user asks what was checked / to recheck, or a broad coverage/quality claim needs evidence",
      "result": "checked files/semantic units + quality/sufficiency + partial/unchecked + review delta + next useful checks"
    },
    {
      "id": "UC-REPO-CRITICAL-REVIEW",
      "label": "Critically Review A Claim / Plan / Diff",
      "description": "truth-seek against a target instead of accepting it as given",
      "sources": [
        "planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-REPO-CRITICAL-REVIEW in the current canonical registry and follow its current owner route (shared Idea owners + selected target/current owners + documentation/review-diff-review-workflow.md when target is ReviewDiff). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Critically Review A Claim / Plan / Diff target>",
      "directionId": "DIR-REPOSITORY",
      "manualInvocation": true,
      "trigger": "target should be tested as hypothesis",
      "result": "supported strengths/issues/counterevidence/conclusion; material corrective Ideas reviewed proportionally",
      "commandId": "critical_review.apply"
    },
    {
      "id": "UC-REPO-CURRENT-STATE",
      "label": "Report Current Repository / Planning State",
      "description": "report checked current state without inventing certainty",
      "sources": [
        "planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-REPO-CURRENT-STATE in the current canonical registry and follow its current owner route (this registry → documentation/status-reconciliation-workflow.md → selected current owners). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Report Current Repository / Planning State target>",
      "directionId": "DIR-REPOSITORY",
      "manualInvocation": true,
      "trigger": "state/status question",
      "result": "checked known/local/unknown state + next safe action",
      "commandId": "current_state.report"
    },
    {
      "id": "UC-REPO-DEFINE-PARALLEL-SCOPES",
      "label": "Define / Maintain Fixed Parallel-Work Scopes",
      "description": "establish stable repository areas that can be worked independently in parallel",
      "sources": [
        "planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-REPO-DEFINE-PARALLEL-SCOPES in the current canonical registry and follow its current owner route (../parallel-work-scope-registry.md + documentation/parallel-work-scope-and-action-log-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Define / Maintain Fixed Parallel-Work Scopes target>",
      "directionId": "DIR-REPOSITORY",
      "manualInvocation": true,
      "trigger": "repository scope boundaries/log locations need initial definition or explicit structural change",
      "result": "current root Scope Registry + canonical log at every active scope root"
    },
    {
      "id": "UC-REPO-ORIENT",
      "label": "Orient In Repository And Resolve Work Route",
      "description": "find the correct semantic route before material work",
      "sources": [
        "planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-REPO-ORIENT in the current canonical registry and follow its current owner route (README.md → planning/README.md → registries). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Orient In Repository And Resolve Work Route target>",
      "directionId": "DIR-REPOSITORY",
      "manualInvocation": true,
      "trigger": "new/uncertain repository task",
      "result": "relevant Direction, Use Case, owners and governance identified",
      "commandId": "governance.development"
    },
    {
      "id": "UC-REPO-PARALLEL-WORK",
      "label": "Work In Registered Parallel Scope(s)",
      "description": "run one workstream using already registered independent scope boundaries",
      "sources": [
        "planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-REPO-PARALLEL-WORK in the current canonical registry and follow its current owner route (../parallel-work-scope-registry.md + documentation/parallel-work-scope-and-action-log-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Work In Registered Parallel Scope(s) target>",
      "directionId": "DIR-REPOSITORY",
      "manualInvocation": true,
      "trigger": "work should proceed in parallel or scope ownership matters",
      "result": "selected registered scope(s), canonical scope log, cross-scope references when needed",
      "commandId": "parallel_workspace.start"
    },
    {
      "id": "UC-REPO-PLAN-NEXT",
      "label": "Plan The Next Concrete Step",
      "description": "select one justified next action from current context",
      "sources": [
        "planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-REPO-PLAN-NEXT in the current canonical registry and follow its current owner route (selected Direction/Use Case/current owners). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Plan The Next Concrete Step target>",
      "directionId": "DIR-REPOSITORY",
      "manualInvocation": true,
      "trigger": "active context needs immediate next planning step",
      "result": "one justified next step + unresolved blockers",
      "commandId": "plan.now"
    },
    {
      "id": "UC-REPO-REFINE-CURRENT-PLAN",
      "label": "Refine The Current Plan",
      "description": "integrate material clarification/change into one accumulating current plan through the selected semantic owner",
      "sources": [
        "planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-REPO-REFINE-CURRENT-PLAN in the current canonical registry and follow its current owner route (documentation/progressive-plan-refinement-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Refine The Current Plan target>",
      "directionId": "DIR-REPOSITORY",
      "manualInvocation": true,
      "trigger": "current planning meaning needs refinement, deeper review or directed continuation",
      "result": "updated current semantic owner(s) + truthful reviewed/partial/unchecked state + attached Q/R/P only when material"
    },
    {
      "id": "UC-REPO-REVIEW-PLANNING-FINDINGS",
      "label": "Review Planning Findings / Q/R/P Completeness",
      "description": "detect/deduplicate material unresolved deltas attached to current semantic owners",
      "sources": [
        "planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-REPO-REVIEW-PLANNING-FINDINGS in the current canonical registry and follow its current owner route (documentation/planning-findings-review-workflow.md). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Review Planning Findings / Q/R/P Completeness target>",
      "directionId": "DIR-REPOSITORY",
      "manualInvocation": true,
      "trigger": "completeness of current planning findings materially matters",
      "result": "owner-attached active findings + missing/duplicate/obsolete finding corrections"
    },
    {
      "id": "UC-REPO-USE-ARCHIVE-SOURCE",
      "label": "Use An Explicit Archive As Read Source",
      "description": "establish a bounded readable source snapshot",
      "sources": [
        "planning/use-case-registry.md"
      ],
      "instruction": "Resolve UC-REPO-USE-ARCHIVE-SOURCE in the current canonical registry and follow its current owner route (selected archive + applicable owners). Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Use An Explicit Archive As Read Source target>",
      "directionId": "DIR-REPOSITORY",
      "manualInvocation": true,
      "trigger": "user selects archive/snapshot for reading",
      "result": "checked source identity/coverage + source-bounded work context",
      "commandId": "archive_source.use"
    },
    {
      "id": "UC-RPKG-APPLY",
      "label": "Apply Verified Replacement Package",
      "description": "Apply Verified Replacement Package",
      "sources": [
        "planning/documentation/tools/replacement-package-app/USE-CASE-REGISTRY.md"
      ],
      "instruction": "Resolve UC-RPKG-APPLY in the current canonical registry and follow its current owner route. Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Apply Verified Replacement Package target>",
      "directionId": "",
      "manualInvocation": true,
      "trigger": "",
      "result": ""
    },
    {
      "id": "UC-RPKG-ATTACH-SNAPSHOT",
      "label": "Attach Repository Snapshot to ChatGPT",
      "description": "Attach Repository Snapshot to ChatGPT",
      "sources": [
        "planning/documentation/tools/replacement-package-app/USE-CASE-REGISTRY.md"
      ],
      "instruction": "Resolve UC-RPKG-ATTACH-SNAPSHOT in the current canonical registry and follow its current owner route. Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Attach Repository Snapshot to ChatGPT target>",
      "directionId": "",
      "manualInvocation": true,
      "trigger": "",
      "result": ""
    },
    {
      "id": "UC-RPKG-DELIVER-REVIEW",
      "label": "Deliver Current ReviewDiff to ChatGPT",
      "description": "Deliver Current ReviewDiff to ChatGPT",
      "sources": [
        "planning/documentation/tools/replacement-package-app/USE-CASE-REGISTRY.md"
      ],
      "instruction": "Resolve UC-RPKG-DELIVER-REVIEW in the current canonical registry and follow its current owner route. Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Deliver Current ReviewDiff to ChatGPT target>",
      "directionId": "",
      "manualInvocation": true,
      "trigger": "",
      "result": ""
    },
    {
      "id": "UC-RPKG-EXPORT-REPOSITORY",
      "label": "Export Repository Snapshot ZIP",
      "description": "Export Repository Snapshot ZIP",
      "sources": [
        "planning/documentation/tools/replacement-package-app/USE-CASE-REGISTRY.md"
      ],
      "instruction": "Resolve UC-RPKG-EXPORT-REPOSITORY in the current canonical registry and follow its current owner route. Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Export Repository Snapshot ZIP target>",
      "directionId": "",
      "manualInvocation": true,
      "trigger": "",
      "result": ""
    },
    {
      "id": "UC-RPKG-FINALIZE",
      "label": "Finalize Current ChangeSet",
      "description": "Finalize Current ChangeSet",
      "sources": [
        "planning/documentation/tools/replacement-package-app/USE-CASE-REGISTRY.md"
      ],
      "instruction": "Resolve UC-RPKG-FINALIZE in the current canonical registry and follow its current owner route. Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Finalize Current ChangeSet target>",
      "directionId": "",
      "manualInvocation": true,
      "trigger": "",
      "result": ""
    },
    {
      "id": "UC-RPKG-REVIEW",
      "label": "Inspect Current ChangeSet Review State",
      "description": "Inspect Current ChangeSet Review State",
      "sources": [
        "planning/documentation/tools/replacement-package-app/USE-CASE-REGISTRY.md"
      ],
      "instruction": "Resolve UC-RPKG-REVIEW in the current canonical registry and follow its current owner route. Preserve its boundaries and permission model; this Helper projection is invocation/navigation only.",
      "target": "<Inspect Current ChangeSet Review State target>",
      "directionId": "",
      "manualInvocation": true,
      "trigger": "",
      "result": ""
    }
  ];
  // END GENERATED CURRENT USE CASE PROJECTIONS

  function directionIdForUseCase(definition){
    const id=String(definition?.id||'');
    if(id.startsWith('UC-REPO-'))return 'DIR-REPOSITORY';
    if(id.startsWith('UC-PLAN-WORKSPACE-'))return 'DIR-PLAN-WORKSPACE';
    if(id.startsWith('UC-PLAN-ARCH-'))return 'DIR-PLAN-ARCHITECTURE';
    if(id.startsWith('UC-PLAN-TEST-'))return 'DIR-PLAN-TESTING';
    if(id.startsWith('UC-PLAN-'))return 'DIR-PLAN-SOLUTION';
    if(id.startsWith('UC-DOC-'))return 'DIR-DOCUMENTATION';
    if(id.startsWith('UC-DW-'))return 'DIR-DOCUMENTATION-WORKBENCH';
    if(id.startsWith('UC-PR-'))return 'DIR-PLANNING-RUNTIME';
    if(id.startsWith('UC-RPKG-'))return 'DIR-REPLACEMENT-PACKAGE-APP';
    return '';
  }

  function directionIdForOwnerPath(path){
    const value=String(path||'');
    if(value.includes('planning/documentation/tools/tampermonkey/chat-command-palette/'))return 'DIR-PLANNING-HELPER';
    if(value.includes('planning/documentation/tools/tampermonkey/linked-notes/'))return 'DIR-LINKED-NOTES';
    if(value.includes('planning/documentation/tools/replacement-package-app/'))return 'DIR-REPLACEMENT-PACKAGE-APP';
    if(value.includes('planning/documentation/application-planning/'))return 'DIR-PLAN-SOLUTION';
    if(value.includes('planning/documentation/workspace-planning/'))return 'DIR-PLAN-WORKSPACE';
    if(value.includes('planning/documentation/architecture-planning/'))return 'DIR-PLAN-ARCHITECTURE';
    if(value.includes('planning/documentation/testing-planning/'))return 'DIR-PLAN-TESTING';
    if(value.includes('planning/areas/documentation-workbench/'))return 'DIR-DOCUMENTATION-WORKBENCH';
    if(value.includes('planning/areas/planning-system/')||value.includes('planning/dashboard/')||value.startsWith('-Planning/'))return 'DIR-PLANNING-RUNTIME';
    if(value.includes('planning/documentation/'))return 'DIR-DOCUMENTATION';
    if(value.startsWith('planning/')||value==='parallel-work-scope-registry.md')return 'DIR-REPOSITORY';
    return '';
  }

  for(const definition of USE_CASE_DEFINITIONS)definition.directionId=directionIdForUseCase(definition);

  function directionIdsForCommand(definition){
    const linked=[...new Set(USE_CASE_DEFINITIONS.filter((item)=>item.commandId===definition?.id).map((item)=>item.directionId).filter(Boolean))];
    if(linked.length)return linked;
    const inferred=[];
    for(const path of definition?.ownerFiles||[]){const id=directionIdForOwnerPath(path);if(id&&!inferred.includes(id))inferred.push(id);}
    return inferred.length?inferred:['DIR-REPOSITORY'];
  }

  function markerFor(kind){if(kind==='orientation')return'PLANNING_ORIENTATION';if(kind==='direction')return'PLANNING_DIRECTION';return'PLANNING_USE_CASE';}
  function readRule(mode,kind){
    if(mode===MODE.FULL)return [`Full ${kind} reading is required for this invocation.`,'Read every listed source, resolve the selected current entry and follow the complete relevant owner route.','Read materially defining principles/workflows/templates/integration rules reached by that route.','Do not expand into unrelated families.','Full changes read depth only; it does not expand permissions.'];
    return [`Use remembered ${kind} context only while clearly sufficient.`,'Resolve/read listed sources and the current owner route when not current, uncertain, changed or challenged.','Do not rely only on this compact prompt when ownership/status/boundaries are uncertain.'];
  }
  function buildSemanticBody(kind,definition,mode){
    const marker=markerFor(kind),idField=kind==='use_case'?'use_case_id':`${kind}_id`;
    const lines=[`[${marker}]`,`${idField}:`,`  ${definition.id}`,'',`${kind}:`,`  ${definition.label}`,'','mode:',`  ${mode}`];
    if(kind==='use_case')lines.push('','semantic_owner:','  Work in this Use Case as the current semantic planning unit. Neighboring responsibilities are inputs/integration context unless the selected owner route explicitly requires them.');
    lines.push('','source_of_truth:',...(definition.sources||[]).map(s=>`  - \`${s}\``));
    if(kind==='use_case')lines.push('','route_resolution:','  Resolve this exact current Use-Case entry. Follow its current Main Owner / Owner Route and then the current owner links/read-order to every principle, workflow, template and integration rule materially defining this Use Case. Do not treat this Helper body as a frozen list of all future owner paths.');
    lines.push('','read_rule:',...readRule(mode,kind).map(x=>`  ${x}`),'','instruction:',`  ${definition.instruction}`);
    if(kind==='use_case')lines.push('','permission:','  Semantic planning/read context only. Use-Case activation does not grant executable-command, repository-mutation, archive, commit or push permission.');
    lines.push('','user_target:',`  ${definition.target}`,`[/${marker}]`);
    return lines.join('\n');
  }
  function buildSemanticEntries(){return {[SURFACES.USE_CASES]:USE_CASE_DEFINITIONS.map(d=>({...d,adaptiveBody:buildSemanticBody('use_case',d,MODE.ADAPTIVE),fullBody:buildSemanticBody('use_case',d,MODE.FULL)}))};}
  return {SURFACES,ORIENTATION_DEFINITIONS,DIRECTION_DEFINITIONS,USE_CASE_DEFINITIONS,directionIdForUseCase,directionIdsForCommand,buildSemanticBody,buildSemanticEntries};
});
