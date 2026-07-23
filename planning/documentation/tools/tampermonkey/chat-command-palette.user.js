// ==UserScript==
// @name         Reusable Chat Planning Helper
// @namespace    https://github.com/AlexPastukhh/obs/reusable-docs
// @version      0.17.1-form-items-responsive-insertion
// @description  Projection-only Orientation, Directions, Use Cases and Commands helper with Adaptive/Full owner reading.
// @author       Reusable docs layer
// @match        https://chatgpt.com/*
// @match        https://chat.openai.com/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const INSTANCE_DISPOSE_KEY = '__obsPlanningHelperDisposeV2';
  const LEGACY_DISPOSE_KEYS = ['__obsCommandHelperDisposeV1'];

  for (const key of [INSTANCE_DISPOSE_KEY, ...LEGACY_DISPOSE_KEYS]) {
    const previousDispose = window[key];
    if (typeof previousDispose === 'function') {
      try {
        previousDispose();
      } catch (error) {
        // A stale previous instance must not block a clean mount.
      }
    }
  }

  const MODE = Object.freeze({ ADAPTIVE: 'adaptive', FULL: 'full' });
  const SURFACES = Object.freeze({
    ORIENTATION: 'Orientation',
    DIRECTIONS: 'Directions',
    USE_CASES: 'Use Cases',
    COMMANDS: 'Commands'
  });

  const ORIENTATION_DEFINITIONS = [
  {
    "id": "OBS-PLANNING-ORIENTATION",
    "label": "OBS Planning Orientation",
    "description": "architecture and context selection",
    "sources": [
      "planning/README.md",
      "planning/direction-registry.md"
    ],
    "instruction": "Explain the current planning architecture, distinguish Directions, Use Cases and Commands, and help select the relevant context. Do not execute unrelated commands.",
    "target": "<what planning context should be oriented>"
  }
];
  const DIRECTION_DEFINITIONS = [
  {
    "id": "DIR-PLAN-SOLUTION",
    "label": "Plan A Solution Or Workflow",
    "description": "solution/workflow planning",
    "sources": [
      "planning/direction-registry.md",
      "planning/documentation/application-planning/direction-registry.md",
      "planning/documentation/application-planning/use-case-registry.md"
    ],
    "instruction": "Establish this Direction as current context. Explain optional topology and the relevant Use Cases. Do not execute every branch automatically.",
    "target": "<solution or workflow target>"
  },
  {
    "id": "DIR-DETAILED-SDS",
    "label": "Perform Detailed Scenario/Domain/Slice Planning",
    "description": "profile-limited detailed planning",
    "sources": [
      "planning/direction-registry.md",
      "planning/documentation/application-planning/direction-registry.md",
      "planning/documentation/application-planning/use-case-registry.md",
      "planning/documentation/profiles/scenario-domain-slice-docs-profile.md"
    ],
    "instruction": "Establish this profile-limited Direction. Explain Scenario/Domain/Slice topology and current owner boundaries. Do not invent prototype-depth methodology.",
    "target": "<scenario/domain/slice target>"
  },
  {
    "id": "DIR-MAINTAIN-DOCS-ROUTES",
    "label": "Maintain Documentation, Use Cases And Commands",
    "description": "documentation and routing",
    "sources": [
      "planning/direction-registry.md",
      "planning/documentation/direction-and-use-case-registry-workflow.md",
      "planning/planning-use-case-map.md"
    ],
    "instruction": "Establish documentation/registry/command maintenance context and keep registries, UCM, workflows, templates and projection authority distinct.",
    "target": "<documentation or routing target>"
  },
  {
    "id": "DIR-DOCUMENTATION-WORKBENCH",
    "label": "Develop And Maintain Documentation Workbench",
    "description": "project-local product direction",
    "sources": [
      "planning/direction-registry.md",
      "planning/areas/documentation-workbench/direction-registry.md",
      "planning/areas/documentation-workbench/use-case-registry.md",
      "planning/areas/documentation-workbench/full-picture.md"
    ],
    "instruction": "Establish the Documentation Workbench Direction, accepted Complete Pictures, supporting model and provisional boundaries. Do not claim runtime implementation.",
    "target": "<Documentation Workbench target>"
  }
];
  const USE_CASE_DEFINITIONS = [
  {
    "id": "UC-AP-REALITY",
    "label": "Understand Current Workflow And Reality",
    "description": "current reality capture",
    "sources": [
      "planning/documentation/application-planning/use-case-registry.md",
      "planning/documentation/application-planning/application-planning-drafting-workflow.md"
    ],
    "instruction": "Establish descriptive current-reality context. Reconstruct actors, triggers, sequence, strengths, problems, risks, workarounds and unknowns without accepting future architecture.",
    "target": "<current workflow/reality target>"
  },
  {
    "id": "UC-AP-FORM-ITEMS",
    "label": "Form Planning Items From Discussion",
    "description": "open accepted form-items command",
    "commandId": "planning_items.form"
  },
  {
    "id": "UC-AP-FULL-PICTURE",
    "label": "Build Or Review An Item-Backed Full Picture",
    "description": "item-backed synthesis",
    "sources": [
      "planning/documentation/application-planning/use-case-registry.md",
      "planning/documentation/application-planning/application-planning-drafting-workflow.md",
      "planning/documentation/application-planning/templates/PLANNING-DRAFT-TEMPLATE.md"
    ],
    "instruction": "Establish item-backed Full Picture context. Preserve canonical item ownership and trace significant statements to items/source/inference/question.",
    "target": "<Full Picture target>"
  },
  {
    "id": "UC-AP-RECONCILE",
    "label": "Reconcile Planning Items",
    "description": "open existing command",
    "commandId": "planning_items.reconcile"
  },
  {
    "id": "UC-AP-RESEARCH",
    "label": "Research Existing Solutions And Alternative Workflows",
    "description": "provisional proportional research",
    "sources": [
      "planning/documentation/application-planning/use-case-registry.md",
      "planning/documentation/application-planning/application-planning-drafting-workflow.md"
    ],
    "instruction": "Establish provisional proportional research context. Compare checked options, coverage, strengths, limitations and disposition without creating an oversized specialized methodology.",
    "target": "<solutions or alternative workflows to research>"
  },
  {
    "id": "UC-AP-SCENARIO",
    "label": "Draft Detailed Scenario",
    "description": "profile-limited scenario",
    "sources": [
      "planning/documentation/application-planning/use-case-registry.md",
      "planning/documentation/profiles/scenario-domain-slice-docs-profile.md"
    ],
    "instruction": "Establish detailed Scenario context using current profile and project-specific owners. Do not invent a new project command or prototype-depth method.",
    "target": "<scenario target>"
  },
  {
    "id": "UC-AP-DOMAIN",
    "label": "Draft Or Review Domain",
    "description": "profile-limited domain",
    "sources": [
      "planning/documentation/application-planning/use-case-registry.md",
      "planning/documentation/profiles/scenario-domain-slice-docs-profile.md"
    ],
    "instruction": "Establish Domain review context for conceptual model, language and boundaries using current owners.",
    "target": "<domain target>"
  },
  {
    "id": "UC-AP-SLICE",
    "label": "Plan Implementation Slice",
    "description": "profile-limited slice",
    "sources": [
      "planning/documentation/application-planning/use-case-registry.md",
      "planning/documentation/profiles/scenario-domain-slice-docs-profile.md"
    ],
    "instruction": "Establish Implementation Slice context for one separately deliverable/checkable increment aligned with accepted scenario/domain meaning.",
    "target": "<slice target>"
  },
  {
    "id": "UC-AP-SDS-CONSISTENCY",
    "label": "Review Scenario/Domain/Slice Consistency",
    "description": "cross-artifact consistency",
    "sources": [
      "planning/documentation/application-planning/use-case-registry.md",
      "planning/documentation/profiles/scenario-domain-slice-docs-profile.md"
    ],
    "instruction": "Establish cross-artifact consistency review context and expose required upstream/downstream corrections.",
    "target": "<scenario/domain/slice artifacts>"
  },
  {
    "id": "UC-DW-DOC-REF",
    "label": "Documentation And Reference Object End-To-End Workflow",
    "description": "accepted Documentation Workbench Complete Picture",
    "sources": [
      "planning/areas/documentation-workbench/use-case-registry.md",
      "planning/areas/documentation-workbench/full-picture.md",
      "planning/areas/documentation-workbench/documentation-and-reference-object-end-to-end-workflow.md"
    ],
    "instruction": "Establish this accepted trigger-to-result workflow. Preserve the managed Planning Item boundary and do not repeat object creation for an already managed item.",
    "target": "<documentation/reference-object target>"
  },
  {
    "id": "UC-DW-ITEM-FULL-PICTURE",
    "label": "Planning Item And Full Picture End-To-End Workflow",
    "description": "accepted Documentation Workbench Complete Picture",
    "sources": [
      "planning/areas/documentation-workbench/use-case-registry.md",
      "planning/areas/documentation-workbench/full-picture.md",
      "planning/areas/documentation-workbench/complete-pictures/planning-items-and-full-picture/full-picture.md"
    ],
    "instruction": "Establish the full Planning Item/Full Picture workflow. Treat `сверь айтемы` as one reconciliation stage rather than the whole use case.",
    "target": "<Planning Item/Full Picture target>"
  },
  {
    "id": "UC-DW-STRUCTURED-MESSAGE",
    "label": "Structured User Message Composer",
    "description": "supporting input capability",
    "sources": [
      "planning/areas/documentation-workbench/use-case-registry.md",
      "planning/areas/documentation-workbench/planning-item-register.md",
      "planning/planning-input-conventions.md"
    ],
    "instruction": "Establish structured-message composition context while preserving literal wording and free-form input. Do not make every fragment a Planning Item.",
    "target": "<message/composition target>"
  }
];
  const COMMAND_DEFINITIONS = [
    {
      id: 'replacement_archive.create',
      group: 'Commands',
      label: 'давай архив',
      description: 'output package',
      englishName: 'build replacement archive',
      family: '`давай архив` / `собери архив` / `give arch` / `replacement package`',
      reminders: [
        'Output-package mode, not archive read-source mode.',
        'An earlier-message archive is not current automatically.',
        'A source archive attached with this command is current for this invocation.',
        'Otherwise use fully readable current repository files.',
        'Request a fresh archive only when size/tool limits prevent reliable reading.',
        'The apply stage must still verify exact local base blobs before changes.',
        'Produce a full replacement archive.',
        'Give apply/diff commands in chat.',
        'Use git add -N for new files before diff capture.',
        'Ask user to paste diff before commit.',
        'Do not commit or push.'
      ],
      target: '<what archive/package should include>',
      refinements: [
        {
          id: 'archive_command_format',
          label: 'Cmd fmt',
          description: 'reread archive command-format docs',
          readRequired: [
            'planning/planning-use-case-map.md',
            'planning/documentation/reviewable-agent-output-and-commands-workflow.md',
            'planning/documentation/documentation-update-workflow.md'
          ],
          instruction: 'Reread these files, validate every user-facing PowerShell Git command in the current answer against their archive command-format rules, and rewrite any non-compliant command.'
        }
      ]
    },
    {
      id: 'archive_source.use',
      group: 'Commands',
      label: 'арх',
      description: 'archive source',
      englishName: 'use archive',
      family: '`арх` / `из архива` / `added arch` / `use archive`',
      reminders: [
        'Read-source mode, not output-package mode.',
        'Use only the archive explicitly selected for this invocation.',
        'Do not silently treat an earlier-message archive as current.',
        'Do not create replacement archive unless separately requested.',
        'State archive freshness/source limits when relevant.'
      ],
      target: '<what should be checked from archive>'
    },
    {
      id: 'planning_items.reconcile',
      group: 'Commands',
      label: 'сверь айтемы',
      description: 'end-to-end Complete Picture + traceable item transformations',
      englishName: 'reconcile planning items',
      family: '`сверь айтемы` / `сверь айтемы с документацией` / `проверь айтемы по репозиторию` / `reconcile planning items` / `reconcile items`',
      reminders: [
        'Reconcile the selected working, local or unprocessed Planning Items with relevant current repository documentation.',
        'Select one end-to-end Complete Picture for each genuinely independent workflow: trace trigger, preconditions, mandatory stages, branches/loops, review gates and result/end state.',
        'Do not split one mandatory workflow into parallel peer Complete Pictures. If a peer owns a missing mandatory stage, combine the slices or reclassify them as supporting artifacts.',
        'Treat models, views, terminology, root summaries and capability/detail slices as supporting or non-workflow primary review objects unless they have an independent trigger-to-result lifecycle.',
        'Review several Complete Pictures separately only when each is independently traversable; then check cross-workflow and resulting-item-set consistency.',
        'Show the complete before/after workflow or review object, including changed and preserved parts, purpose, boundaries, conflicts and unresolved choices.',
        'For each selected workflow/review object, show the current canonical item set, incoming meanings with semantic names and IDs only as secondary traceability, proposed actions and the resulting canonical item set.',
        'For every non-trivial transformation, show original/current item(s), every incoming/expanding/correcting meaning and resulting item(s) separately in one small variable-row table; use — where a field does not apply and do not show only the result.',
        'Do not assume one incoming item becomes one new canonical item: it may keep, update, rename, add, merge, split, move, link, defer, supersede, remove or reject meaning.',
        'Preserve relevant hypothesis, risk, key-situation and prototype/test context through item transformations; report a compact prototype/risk follow-up without creating a prototype or accepting architecture.',
        'Do not edit files, update item registers, create an archive, commit or push.'
      ],
      target: '<which items or item source should be reconciled>'
    },
    {
      id: 'planning_items.form',
      group: 'Commands',
      label: 'сформируй айтемы',
      description: 'full-message Planning Item formation',
      englishName: 'form items',
      family: '`сформируй айтемы` / `form items`',
      reminders: [
        'Use the explicitly selected or clearly active current source; do not silently select an earlier archive, ledger or message.',
        'Preserve complete source messages, accumulating item meanings and typed Source Contributions.',
        'Perform a proportional current-owner check and show Current, Incoming and Resulting meanings for non-trivial transformations.',
        'Preserve optional relation-backed Implementation Ideas as separate Planning Items rather than copied text.',
        'Explicit review remains required.',
        'Do not edit repository files, create an archive, commit or push.'
      ],
      target: '<source/discussion to form items from>'
    },
    {
      id: 'file_update.plan',
      group: 'Commands',
      label: 'план файл-обновление',
      description: 'file plan',
      englishName: 'plan file update',
      family: '`план файл-обновление` / `спланируй обновление файлов` / `спланируй архив` / `plan file update` / `archive plan`',
      reminders: [
        'Plan file/docs/code/archive update only.',
        'Treat only explicit user statements and checked source facts as confirmed.',
        'For important unknowns, show prioritized questions with one conservative fallback instruction.',
        'End with `План файл-обновление` in planned mode.',
        'Do not edit files.',
        'Do not create archive unless separately requested.'
      ],
      target: '<what update/archive should be planned>'
    },
    {
      id: 'critical_review.apply',
      group: 'Commands',
      label: 'крит',
      description: 'critical review',
      englishName: 'critical review',
      family: '`крит` / `crit` / `critical review`',
      reminders: [
        'Treat target as hypothesis, not accepted truth.',
        'Give honest verdict with risks and assumptions.',
        'Do not edit files, create archives, commit or push.'
      ],
      target: '<what should be critically reviewed>'
    },
    {
      id: 'context_recheck.apply',
      group: 'Commands',
      label: 'обс',
      description: 'context recheck',
      englishName: 'recheck context',
      family: '`обс` / `chat rech` / `recheck`',
      reminders: [
        'Re-check relevant prior discussion.',
        'Preserve accepted decisions and constraints.',
        'State what was checked and what remains unavailable.'
      ],
      target: '<what discussion/context should be rechecked>'
    },
    {
      id: 'current_state.report',
      group: 'Commands',
      label: 'положняк',
      description: 'current state',
      englishName: 'current state',
      family: '`положняк` / `polozh` / `current state`',
      reminders: [
        'Report current repo/chat/planning state.',
        'Separate known, local, unknown and not checked.',
        'Do not present an unstated future plan as confirmed; show important open questions and conservative fallbacks.',
        'Do not edit or archive unless separately requested.'
      ],
      target: '<state target>'
    },
    {
      id: 'plan.now',
      group: 'Commands',
      label: 'планируй',
      description: 'plan now',
      englishName: 'plan now',
      family: '`планируй` / `plan now`',
      reminders: [
        'Plan the next concrete step now.',
        'Treat only explicit user statements and checked source facts as confirmed.',
        'For important unknowns, show prioritized questions with one conservative fallback instruction.',
        'State scope, boundary, evidence and next action.',
        'Do not edit files or create archive unless separately requested.'
      ],
      target: '<what should be planned>'
    },
    {
      id: 'documentation_principles.read',
      group: 'Commands',
      label: 'прочитай принципы документации',
      description: 'documentation preflight',
      englishName: 'read documentation principles',
      family: '`прочитай принципы документации` / `прочти принципы документации` / `принципы документации` / `read documentation principles` / `documentation principles` / `docs principles`',
      reminders: [
        'Read-only documentation architecture, ownership and update preflight.',
        'Use full mode when the route has not been read, is not remembered, or ownership/boundaries are uncertain.',
        'Use targeted refresh only after a current full pass.',
        'Report Checked, Not checked, Authority/layer, Correct owner zone, Required route read and Boundaries.',
        'Do not edit files, create an archive, commit or push.'
      ],
      target: '<documentation task or owner question>'
    },
    {
      id: 'command.plan',
      group: 'Commands',
      label: 'спланируй команду',
      description: 'plan command',
      englishName: 'plan command',
      family: '`спланируй команду` / `plan command`',
      reminders: [
        'Plan a command route only.',
        'Run the documentation-principles preflight.',
        'Produce a file-update plan and read command-specific owners.',
        'Tampermonkey is projection, not source of truth.',
        'Do not edit files, create an archive, commit or push.'
      ],
      target: '<what command route should be planned>'
    },
    {
      id: 'parallel_workspace.start',
      group: 'Commands',
      label: 'начни параллельную работу',
      description: 'parallel workspace',
      englishName: 'start parallel work',
      family: '`начни параллельную работу` / `start parallel work` / `parallel workspace`',
      reminders: [
        'Start one staging-only workspace only for a concrete target.',
        'Do not edit shared canonical docs directly from workspace phase.',
        'Do not create aggregate sync until a sync-candidate workspace exists.'
      ],
      target: '<parallel agent/workstream target>'
    }
  ];

  function readRule(mode, kind) {
    if (mode === MODE.FULL) {
      return [
        `Full ${kind} reading is required for this invocation.`,
        'Read every listed source and the complete relevant owner route even if it was read earlier in this chat.',
        'Read the relevant parent/root entry when needed.',
        'Do not expand into unrelated repository families.',
        'Full changes read depth only; it does not expand permissions.'
      ];
    }
    return [
      `Use current remembered ${kind} context only while it is clearly sufficient.`,
      'Read the listed source and owner route when it was not read in this chat, is forgotten/uncertain, may have changed, or verification is requested.',
      'Do not rely on this compact prompt when ownership, status or boundaries are uncertain.'
    ];
  }

  function buildSemanticBody(kind, definition, mode) {
    const tag = kind === 'orientation'
      ? 'PLANNING_ORIENTATION'
      : kind === 'direction'
        ? 'PLANNING_DIRECTION'
        : 'PLANNING_USE_CASE';
    const nameKey = kind === 'orientation' ? 'orientation' : kind === 'direction' ? 'direction' : 'use_case';
    const idKey = `${kind}_id`;
    return [
      `[${tag}]`,
      `${idKey}:`,
      `  ${definition.id}`,
      '',
      `${nameKey}:`,
      `  ${definition.label}`,
      '',
      'mode:',
      `  ${mode}`,
      '',
      'source_of_truth:',
      ...definition.sources.map((source) => `  - \`${source}\``),
      '',
      'read_rule:',
      ...readRule(mode, kind).map((line) => `  ${line}`),
      '',
      'instruction:',
      `  ${definition.instruction}`,
      '',
      'user_target:',
      `  ${definition.target}`,
      `[/${tag}]`
    ].join('\n');
  }

  function commandReadBlock(mode) {
    if (mode === MODE.FULL) {
      return [
        'source_of_truth:',
        '  Start from `planning/planning-use-case-map.md`.',
        '  Follow the complete required route for this command.',
        '',
        'route_read_rule:',
        '  Full route reading is required for this invocation.',
        '  Read the relevant UCM entry and every required owner/workflow/template/example.',
        '  Do this even if the command was previously used in this chat.',
        '  Do not expand into unrelated repository files.',
        '  Full does not expand permissions.'
      ];
    }
    return [
      'source_of_truth:',
      '  Start from `planning/planning-use-case-map.md`.',
      '  Then read the linked owner files for this command route.',
      '',
      'route_read_rule:',
      '  Read or reread the route when it is not current, remembered or certain.',
      '  Do not rely only on this compact prompt when command behavior is uncertain.'
    ];
  }

  function buildCommandBody(definition, mode) {
    return [
      '[PLANNING_COMMAND]',
      'Read this whole command body before answering.',
      'Do not ignore `key_reminders`.',
      '',
      'command:',
      `  ${definition.label}`,
      '',
      'english_name:',
      `  ${definition.englishName}`,
      '',
      'command_family:',
      `  ${definition.family}`,
      '',
      ...commandReadBlock(mode),
      '',
      'key_reminders:',
      ...definition.reminders.map((item) => `  - ${item}`),
      '',
      'user_target:',
      `  ${definition.target}`,
      '',
      '[/PLANNING_COMMAND]'
    ].join('\n');
  }

  function buildRefinementBody(definition, refinement) {
    return [
      '[PLANNING_COMMAND_REFINEMENT]',
      'command:',
      `  ${definition.label}`,
      '',
      'refinement:',
      `  ${refinement.id}`,
      '',
      'read_required:',
      ...refinement.readRequired.map((path) => `  - \`${path}\``),
      '',
      'instruction:',
      `  ${refinement.instruction}`,
      '',
      '[/PLANNING_COMMAND_REFINEMENT]'
    ].join('\n');
  }

  const semanticEntries = {
    [SURFACES.ORIENTATION]: ORIENTATION_DEFINITIONS.map((definition) => ({
      ...definition,
      adaptiveBody: buildSemanticBody('orientation', definition, MODE.ADAPTIVE),
      fullBody: buildSemanticBody('orientation', definition, MODE.FULL)
    })),
    [SURFACES.DIRECTIONS]: DIRECTION_DEFINITIONS.map((definition) => ({
      ...definition,
      adaptiveBody: buildSemanticBody('direction', definition, MODE.ADAPTIVE),
      fullBody: buildSemanticBody('direction', definition, MODE.FULL)
    })),
    [SURFACES.USE_CASES]: USE_CASE_DEFINITIONS.map((definition) => definition.commandId
      ? { ...definition }
      : {
          ...definition,
          adaptiveBody: buildSemanticBody('use_case', definition, MODE.ADAPTIVE),
          fullBody: buildSemanticBody('use_case', definition, MODE.FULL)
        })
  };

  const commandEntries = COMMAND_DEFINITIONS.map((definition) => ({
    ...definition,
    adaptiveBody: buildCommandBody(definition, MODE.ADAPTIVE),
    fullBody: buildCommandBody(definition, MODE.FULL),
    refinementBodies: (definition.refinements || []).map((refinement) => ({
      ...refinement,
      body: buildRefinementBody(definition, refinement)
    }))
  }));

  const HOST_ID = 'obs-planning-helper-host';
  const STORAGE_KEY = 'obs-planning-helper-position-v2';
  document.getElementById(HOST_ID)?.remove();
  document.getElementById('obs-command-helper-host')?.remove();

  const host = document.createElement('div');
  host.id = HOST_ID;
  document.documentElement.appendChild(host);
  const root = host.attachShadow({ mode: 'open' });

  const saved = readSavedPosition();
  let left = saved.left ?? Math.max(12, window.innerWidth - 510);
  let top = saved.top ?? Math.max(12, window.innerHeight - 700);
  let activeSurface = SURFACES.ORIENTATION;
  let isOpen = false;
  let dashboardOpen = document.documentElement.dataset.obsPlanningDashboardOpen === 'true';
  let lastToggleToken = document.documentElement.dataset.obsPlanningCommandsToggle || '';
  let statusTimer = null;
  let focusCommandId = null;
  let insertionInProgress = false;

  root.innerHTML = `
    <style>
      :host { all: initial; }
      * { box-sizing: border-box; }
      button, input { font: inherit; }
      .launcher {
        position: fixed; right: 18px; bottom: 22px; z-index: 2147483647;
        border: 1px solid rgba(148,163,184,.42); border-radius: 999px;
        padding: 9px 13px; background: #111827; color: #f8fafc;
        font: 700 12px/1 system-ui,sans-serif; cursor: pointer;
        box-shadow: 0 8px 24px rgba(0,0,0,.35);
      }
      .panel {
        position: fixed; left: ${left}px; top: ${top}px; z-index: 2147483647;
        width: min(500px, calc(100vw - 24px)); max-height: min(82vh, 820px);
        display: none; flex-direction: column; overflow: hidden;
        border: 1px solid rgba(148,163,184,.35); border-radius: 14px;
        background: #0b1220; color: #f8fafc;
        box-shadow: 0 20px 60px rgba(0,0,0,.5);
        font: 13px/1.4 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
      }
      .panel[data-open="true"] { display: flex; }
      .header {
        display: flex; align-items: center; gap: 8px; padding: 10px;
        background: #111b2e; border-bottom: 1px solid rgba(148,163,184,.2);
        cursor: grab; user-select: none;
      }
      .header:active { cursor: grabbing; }
      .title { flex: 1; min-width: 0; }
      .title-main { font-weight: 800; }
      .title-sub { color: #94a3b8; font-size: 11px; }
      button {
        border: 1px solid rgba(148,163,184,.3); border-radius: 8px;
        background: #17243a; color: #f8fafc; cursor: pointer;
      }
      button:hover, button:focus-visible { background: #243750; outline: none; }
      button:disabled { opacity: .55; cursor: wait; }
      .close { width: 30px; height: 30px; }
      .tabs { display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; padding: 7px; border-bottom: 1px solid rgba(148,163,184,.16); }
      .tab { padding: 7px 4px; font-size: 11px; }
      .tab[aria-selected="true"] { background: #1d4ed8; border-color: #60a5fa; }
      .search-wrap { padding: 8px; border-bottom: 1px solid rgba(148,163,184,.16); }
      .search { width: 100%; padding: 8px 9px; border: 1px solid rgba(148,163,184,.3); border-radius: 8px; background: #020817; color: #f8fafc; }
      .body { overflow: auto; padding: 8px; }
      .row { display: grid; grid-template-columns: minmax(0,1fr) auto; gap: 7px; margin: 4px 0; }
      .insert { min-width: 0; padding: 8px; text-align: left; }
      .row-label { display: block; font-weight: 750; overflow: hidden; text-overflow: ellipsis; }
      .row-meta { display: block; color: #94a3b8; font-size: 11px; }
      .actions { display: flex; flex-wrap: wrap; gap: 6px; justify-content: flex-end; }
      .full, .refinement, .copy, .open-command { padding: 5px 8px; }
      .full { color: #bfdbfe; border-color: rgba(96,165,250,.5); }
      .refinement { color: #ddd6fe; border-color: rgba(167,139,250,.5); }
      .open-command { color: #bbf7d0; border-color: rgba(74,222,128,.5); }
      .status { margin: 0 8px 8px; padding: 8px; border-radius: 8px; background: rgba(37,99,235,.18); color: #bfdbfe; white-space: pre-wrap; }
      .empty { padding: 18px; color: #94a3b8; text-align: center; }
    </style>
    <button class="launcher" type="button">Planning</button>
    <section class="panel" data-open="false" aria-label="OBS planning helper">
      <div class="header">
        <div class="title">
          <div class="title-main">OBS Planning Helper</div>
          <div class="title-sub">Adaptive · Full · Copy. Commands keep UCM permissions.</div>
        </div>
        <button class="close" type="button" title="Close">×</button>
      </div>
      <div class="tabs" role="tablist">
        ${Object.values(SURFACES).map((surface) => `<button class="tab" type="button" role="tab" data-surface="${surface}" aria-selected="false">${surface}</button>`).join('')}
      </div>
      <div class="search-wrap"><input class="search" type="search" placeholder="Search current surface…" autocomplete="off"></div>
      <div class="body"></div>
    </section>
  `;

  const launcher = root.querySelector('.launcher');
  const panel = root.querySelector('.panel');
  const header = root.querySelector('.header');
  const closeButton = root.querySelector('.close');
  const searchInput = root.querySelector('.search');
  const body = root.querySelector('.body');
  const tabButtons = [...root.querySelectorAll('.tab')];

  function entriesForSurface(surface) {
    return surface === SURFACES.COMMANDS ? commandEntries : semanticEntries[surface] || [];
  }

  function switchSurface(surface, commandId = null) {
    activeSurface = surface;
    focusCommandId = commandId;
    searchInput.value = '';
    tabButtons.forEach((button) => button.setAttribute('aria-selected', String(button.dataset.surface === surface)));
    renderEntries('');
  }

  function setOpen(next) {
    isOpen = Boolean(next);
    panel.dataset.open = String(isOpen);
    launcher.style.display = isOpen || dashboardOpen ? 'none' : 'block';
    if (isOpen) {
      keepPanelInViewport();
      switchSurface(activeSurface);
      window.setTimeout(() => searchInput.focus(), 0);
    }
  }

  function renderEntries(query) {
    const normalized = String(query || '').trim().toLowerCase();
    const entries = entriesForSurface(activeSurface).filter((entry) => {
      const parts = [entry.id, entry.label, entry.description, entry.englishName || '', entry.family || '', ...(entry.sources || [])];
      return !normalized || parts.join(' ').toLowerCase().includes(normalized);
    });

    body.textContent = '';
    if (!entries.length) {
      const empty = document.createElement('div');
      empty.className = 'empty';
      empty.textContent = 'No matching entries.';
      body.appendChild(empty);
      return;
    }

    entries.forEach((entry) => {
      const row = document.createElement('div');
      row.className = 'row';
      if (entry.id === focusCommandId) row.dataset.focus = 'true';

      const main = document.createElement('button');
      main.type = 'button';
      main.className = 'insert';

      const label = document.createElement('span');
      label.className = 'row-label';
      label.textContent = activeSurface === SURFACES.COMMANDS
        ? `${entry.englishName} · ${entry.label}`
        : entry.label;

      const meta = document.createElement('span');
      meta.className = 'row-meta';
      meta.textContent = entry.description || entry.id;
      main.append(label, meta);

      const actions = document.createElement('div');
      actions.className = 'actions';

      if (entry.commandId) {
        main.title = 'Open the related accepted command';
        main.addEventListener('click', () => switchSurface(SURFACES.COMMANDS, entry.commandId));
        const open = document.createElement('button');
        open.type = 'button';
        open.className = 'open-command';
        open.textContent = 'Open Commands';
        open.addEventListener('click', () => switchSurface(SURFACES.COMMANDS, entry.commandId));
        actions.append(open);
      } else {
        main.title = 'Insert Adaptive body';
        main.addEventListener('click', () => insertAndReport(entry.adaptiveBody, `Inserted: ${entry.label} · Adaptive`, entry.id));

        const full = document.createElement('button');
        full.type = 'button';
        full.className = 'full';
        full.textContent = 'Full';
        full.title = 'Insert Full body';
        full.addEventListener('click', () => insertAndReport(entry.fullBody, `Inserted: ${entry.label} · Full`, entry.id));
        actions.append(full);

        if (activeSurface === SURFACES.COMMANDS) {
          for (const refinement of entry.refinementBodies || []) {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'refinement';
            button.textContent = refinement.label;
            button.title = refinement.description;
            button.addEventListener('click', () => insertAndReport(refinement.body, `Inserted refinement: ${entry.label} · ${refinement.label}`, `${entry.id}:${refinement.id}`));
            actions.append(button);
          }
        }

        const copy = document.createElement('button');
        copy.type = 'button';
        copy.className = 'copy';
        copy.textContent = 'Copy';
        copy.title = 'Copy Adaptive body';
        copy.addEventListener('click', async () => showStatus(await copyText(entry.adaptiveBody) ? `Copied: ${entry.label} · Adaptive` : 'Clipboard copy failed.'));
        actions.append(copy);
      }

      row.append(main, actions);
      body.appendChild(row);

      if (entry.id === focusCommandId) {
        window.setTimeout(() => {
          main.focus();
          row.scrollIntoView({ block: 'nearest' });
          focusCommandId = null;
        }, 0);
      }
    });
  }

  function nextAnimationFrame() {
    return new Promise((resolve) => window.requestAnimationFrame(() => resolve()));
  }

  function setInsertionBusy(busy) {
    insertionInProgress = busy;
    root.querySelectorAll('.insert, .full, .refinement, .open-command').forEach((button) => {
      button.disabled = busy;
    });
  }

  async function insertAndReport(text, success, commandId = null) {
    if (insertionInProgress) {
      showStatus('Insertion is already in progress.');
      return;
    }

    setInsertionBusy(true);
    try {
      await nextAnimationFrame();
      const result = insertIntoComposer(text, commandId);
      if (result.ok) {
        showStatus(success);
        return;
      }

      const copied = await copyText(text);
      showStatus(copied
        ? `Direct insertion failed (${result.reason}). Copied to clipboard — paste manually.`
        : `Direct insertion failed (${result.reason}) and clipboard copy also failed.`);
    } finally {
      setInsertionBusy(false);
    }
  }

  function isVisibleComposer(element) {
    if (!element) return false;
    return element.getClientRects().length > 0 && !element.hasAttribute('disabled');
  }

  function findComposer() {
    const exactSelectors = [
      '#prompt-textarea[contenteditable="true"]',
      '[data-testid="composer-textarea"][contenteditable="true"]',
      'textarea[data-testid="composer-textarea"]'
    ];

    for (const selector of exactSelectors) {
      const element = document.querySelector(selector);
      if (isVisibleComposer(element)) return { element, selector, fallback: false };
    }

    const fallbackSelectors = [
      'textarea[placeholder]',
      '[contenteditable="true"][role="textbox"]'
    ];

    for (const selector of fallbackSelectors) {
      for (const element of document.querySelectorAll(selector)) {
        if (isVisibleComposer(element)) return { element, selector, fallback: true };
      }
    }

    return { element: null, selector: null, fallback: true };
  }

  function getComposerText(element) {
    if (element instanceof HTMLTextAreaElement || element instanceof HTMLInputElement) return element.value || '';
    return element.textContent || '';
  }

  function moveCaretToEnd(element) {
    const selection = window.getSelection();
    if (!selection) return;
    const range = document.createRange();
    range.selectNodeContents(element);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  function dispatchInputEvent(element, data) {
    try {
      element.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true, inputType: 'insertText', data }));
    } catch (error) {
      element.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    }
  }

  function insertIntoComposer(text, commandId = null) {
    const startedAt = performance.now();
    const found = findComposer();
    const foundAt = performance.now();
    const composer = found.element;

    if (!composer) {
      console.debug('[OBS Planning Helper insertion]', {
        commandId,
        ok: false,
        reason: 'composer-not-found',
        findMs: Number((foundAt - startedAt).toFixed(2)),
        bodyLength: text.length
      });
      return { ok: false, reason: 'composer-not-found' };
    }

    try {
      composer.focus();
      const current = getComposerText(composer);
      const readAt = performance.now();
      const hasText = current.trim().length > 0;
      const addition = hasText ? `\n\n${text}` : text;

      if (composer instanceof HTMLTextAreaElement || composer instanceof HTMLInputElement) {
        const next = hasText ? `${current}\n\n${text}` : text;
        const proto = composer instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
        const setter = Object.getOwnPropertyDescriptor(proto, 'value')?.set;
        if (setter) setter.call(composer, next); else composer.value = next;
        dispatchInputEvent(composer, addition);
      } else {
        moveCaretToEnd(composer);
        let inserted = false;
        try { inserted = document.execCommand('insertText', false, addition); } catch (error) { inserted = false; }
        if (!inserted) {
          const rejectedAt = performance.now();
          console.debug('[OBS Planning Helper insertion]', {
            commandId,
            ok: false,
            reason: 'contenteditable-insert-rejected',
            selector: found.selector,
            fallbackSelector: found.fallback,
            draftLength: current.length,
            bodyLength: text.length,
            findMs: Number((foundAt - startedAt).toFixed(2)),
            readMs: Number((readAt - foundAt).toFixed(2)),
            insertMs: Number((rejectedAt - readAt).toFixed(2)),
            totalMs: Number((rejectedAt - startedAt).toFixed(2))
          });
          return { ok: false, reason: 'contenteditable-insert-rejected' };
        }
      }

      const finishedAt = performance.now();
      console.debug('[OBS Planning Helper insertion]', {
        commandId,
        ok: true,
        selector: found.selector,
        fallbackSelector: found.fallback,
        draftLength: current.length,
        bodyLength: text.length,
        findMs: Number((foundAt - startedAt).toFixed(2)),
        readMs: Number((readAt - foundAt).toFixed(2)),
        insertMs: Number((finishedAt - readAt).toFixed(2)),
        totalMs: Number((finishedAt - startedAt).toFixed(2))
      });
      return { ok: true };
    } catch (error) {
      const failedAt = performance.now();
      console.debug('[OBS Planning Helper insertion]', {
        commandId,
        ok: false,
        reason: error instanceof Error ? error.message : String(error),
        selector: found.selector,
        bodyLength: text.length,
        totalMs: Number((failedAt - startedAt).toFixed(2))
      });
      return { ok: false, reason: 'composer-mutation-failed' };
    }
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      let copied = false;
      try { copied = document.execCommand('copy'); } finally { textarea.remove(); }
      return copied;
    }
  }

  function showStatus(message) {
    root.querySelector('.status')?.remove();
    if (statusTimer !== null) window.clearTimeout(statusTimer);
    const status = document.createElement('div');
    status.className = 'status';
    status.textContent = message;
    panel.appendChild(status);
    statusTimer = window.setTimeout(() => {
      status.remove();
      statusTimer = null;
    }, 3500);
  }

  function keepPanelInViewport() {
    const width = panel.offsetWidth || 500;
    const height = panel.offsetHeight || 650;
    left = Math.min(Math.max(left, 8), Math.max(8, window.innerWidth - width - 8));
    top = Math.min(Math.max(top, 8), Math.max(8, window.innerHeight - height - 8));
    panel.style.left = `${left}px`;
    panel.style.top = `${top}px`;
  }

  function enableDragging() {
    let pointerId = null;
    let startX = 0, startY = 0, startLeft = 0, startTop = 0;

    function down(event) {
      if (event.button !== 0 || event.target === closeButton) return;
      pointerId = event.pointerId;
      startX = event.clientX;
      startY = event.clientY;
      const rect = panel.getBoundingClientRect();
      startLeft = rect.left;
      startTop = rect.top;
      header.setPointerCapture(pointerId);
      event.preventDefault();
    }
    function move(event) {
      if (pointerId !== event.pointerId) return;
      left = startLeft + event.clientX - startX;
      top = startTop + event.clientY - startY;
      keepPanelInViewport();
      event.preventDefault();
    }
    function finish(event) {
      if (pointerId === null) return;
      try { header.releasePointerCapture(pointerId); } catch (error) {}
      pointerId = null;
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ left, top })); } catch (error) {}
      event.preventDefault();
    }
    header.addEventListener('pointerdown', down);
    header.addEventListener('pointermove', move);
    header.addEventListener('pointerup', finish);
    header.addEventListener('pointercancel', finish);
    return () => {
      header.removeEventListener('pointerdown', down);
      header.removeEventListener('pointermove', move);
      header.removeEventListener('pointerup', finish);
      header.removeEventListener('pointercancel', finish);
    };
  }

  function readSavedPosition() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      return { left: Number.isFinite(parsed.left) ? parsed.left : null, top: Number.isFinite(parsed.top) ? parsed.top : null };
    } catch (error) {
      return { left: null, top: null };
    }
  }

  function handleShortcut(event) {
    if (event.repeat) return;
    if (event.altKey && !event.ctrlKey && !event.metaKey && event.key === 'F2') {
      event.preventDefault();
      event.stopPropagation();
      setOpen(!isOpen);
    } else if (event.key === 'Escape' && isOpen) {
      event.preventDefault();
      event.stopPropagation();
      setOpen(false);
    }
  }

  function syncDashboardVisibility() {
    dashboardOpen = document.documentElement.dataset.obsPlanningDashboardOpen === 'true';
    launcher.style.display = isOpen || dashboardOpen ? 'none' : 'block';
  }

  function consumeToggle(token) {
    const next = String(token || '');
    if (!next || next === lastToggleToken) return;
    lastToggleToken = next;
    setOpen(!isOpen);
  }

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.attributeName === 'data-obs-planning-dashboard-open') syncDashboardVisibility();
      if (mutation.attributeName === 'data-obs-planning-commands-toggle') consumeToggle(document.documentElement.dataset.obsPlanningCommandsToggle);
    }
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-obs-planning-dashboard-open', 'data-obs-planning-commands-toggle']
  });

  tabButtons.forEach((button) => button.addEventListener('click', () => switchSurface(button.dataset.surface)));
  launcher.addEventListener('click', () => setOpen(true));
  closeButton.addEventListener('click', () => setOpen(false));
  searchInput.addEventListener('input', () => renderEntries(searchInput.value));
  window.addEventListener('resize', keepPanelInViewport);
  window.addEventListener('keydown', handleShortcut, true);
  function handleDashboardVisibility(event) {
    dashboardOpen = Boolean(event?.detail?.open);
    launcher.style.display = isOpen || dashboardOpen ? 'none' : 'block';
  }

  function handleCommandsToggle(event) {
    consumeToggle(event?.detail?.token);
  }

  window.addEventListener('obs-planning-dashboard-visibility', handleDashboardVisibility);
  window.addEventListener('obs-planning-commands-toggle', handleCommandsToggle);

  const disableDragging = enableDragging();
  switchSurface(SURFACES.ORIENTATION);

  function dispose() {
    if (statusTimer !== null) window.clearTimeout(statusTimer);
    observer.disconnect();
    disableDragging();
    window.removeEventListener('resize', keepPanelInViewport);
    window.removeEventListener('keydown', handleShortcut, true);
    window.removeEventListener('obs-planning-dashboard-visibility', handleDashboardVisibility);
    window.removeEventListener('obs-planning-commands-toggle', handleCommandsToggle);
    host.remove();

    if (window[INSTANCE_DISPOSE_KEY] === dispose) {
      delete window[INSTANCE_DISPOSE_KEY];
    }

    for (const key of LEGACY_DISPOSE_KEYS) {
      if (window[key] === dispose) delete window[key];
    }
  }

  window[INSTANCE_DISPOSE_KEY] = dispose;
})();
