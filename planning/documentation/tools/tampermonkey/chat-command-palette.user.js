// ==UserScript==
// @name         Reusable Chat Command Helper
// @namespace    https://github.com/AlexPastukhh/obs/reusable-docs
// @version      0.14.0-traceable-item-transformations
// @description  Reusable projection-only command helper with canonical command names, adaptive/full route reading and compact owner-read refinements.
// @author       Reusable docs layer
// @match        https://chatgpt.com/*
// @match        https://chat.openai.com/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

/*
TM-OBS-REUSE source sync:
  Source-of-truth:
    - planning/planning-use-case-map.md
    - planning/documentation/tampermonkey-command-projection-workflow.md
    - planning/documentation/tools/tampermonkey/README.md

  Boundary:
    - This userscript is a reusable documentation-layer helper projection.
    - It is not command source of truth.
    - Command semantics remain owned by the project root use-case map and linked owner workflow/template/area files.
    - The command set below is trimmed to accepted OBS root UCM routes.
    - This helper performs UI projection and composer insertion only; it does not write to the repo or call external services.
    - The default command button keeps adaptive route reading.
    - The Full button forces a fresh read of the command's complete required route for that invocation.
    - Optional refinement buttons only list owner docs to reread; they do not duplicate owner rules.

  Implementation note:
    - Multiline command bodies are assembled with Array.join("\n") so the userscript remains valid JavaScript.
*/

(function () {
  'use strict';

  const INSTANCE_DISPOSE_KEY = '__obsCommandHelperDisposeV1';
  const previousDispose = window[INSTANCE_DISPOSE_KEY];
  if (typeof previousDispose === 'function') {
    try {
      previousDispose();
    } catch (error) {
      // A stale previous instance must not block a clean mount.
    }
  }

  const ROUTE_READ_MODE = Object.freeze({
    ADAPTIVE: 'adaptive',
    FORCE_FULL: 'force-full'
  });

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
      description: 'complete-picture + traceable item transformations',
      englishName: 'reconcile planning items',
      family: '`сверь айтемы` / `сверь айтемы с документацией` / `проверь айтемы по репозиторию` / `reconcile planning items` / `reconcile items`',
      reminders: [
        'Reconcile the selected working, local or unprocessed Planning Items with relevant current repository documentation.',
        'Choose the primary complete picture from what the items actually change: usually a whole workflow, or an active Planning Draft/Full Picture, Functional Workflow, branch, detail, model or other coherent object.',
        'Review each primary picture before and after the proposed change; show changed and preserved parts, purpose, boundaries, conflicts and unresolved choices.',
        'For each primary picture, show the current canonical item set, incoming meanings with short semantic names and IDs only as secondary traceability, proposed item actions, and the resulting canonical item set.',
        'For every non-trivial item transformation, show the original/current item or items, each incoming/expanding/correcting item or meaning, and the resulting item or items separately in one small transformation table; add rows as needed, use — where a field does not apply, and do not show only the result.',
        'Do not assume one incoming item becomes one new canonical item: it may keep or update an existing item, rename it, add, merge, split, move, link, defer, supersede, remove or reject meaning.',
        'Use principles, terminology, templates, canonical owners, source-linked origins and dependent artifacts as supporting consistency sources unless one is itself the primary changed object.',
        'When several primary pictures change, review each separately and then check cross-picture and resulting-item-set consistency.',
        'Do not edit files, update item registers, create an archive, commit or push.'
      ],
      target: '<which items or item source should be reconciled>'
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

  function getRouteReadBlock(mode) {
    if (mode === ROUTE_READ_MODE.FORCE_FULL) {
      return [
        'source_of_truth:',
        '  Start from `planning/planning-use-case-map.md`.',
        '  Follow the complete required route for this command.',
        '',
        'route_read_rule:',
        '  Full route reading is required for this invocation.',
        '  Read the relevant command entry in `planning/planning-use-case-map.md`.',
        '  Then read every owner, workflow, template and example file required by that command route for complete understanding.',
        '  Do this even if the command was previously used in this chat.',
        '  Do not execute the command from memory or from this compact prompt alone.',
        '  Do not expand into unrelated repository files outside the command route.'
      ];
    }

    return [
      'source_of_truth:',
      '  Start from `planning/planning-use-case-map.md`.',
      '  Then read the owner / linked files for this command route.',
      '',
      'route_read_rule:',
      '  If you have not read this command route and its linked owner/example files in this chat, read them before answering.',
      '  If you have read them but do not remember the required behavior, boundaries or key points, reread from `planning/planning-use-case-map.md` before answering.',
      '  Do not rely only on this prompt when command behavior is uncertain.'
    ];
  }

  function buildCommandBody(definition, routeReadMode) {
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
      ...getRouteReadBlock(routeReadMode),
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

  function buildCommandRefinementBody(definition, refinement) {
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

  const COMMANDS = COMMAND_DEFINITIONS.map((definition) => ({
    ...definition,
    adaptiveBody: buildCommandBody(definition, ROUTE_READ_MODE.ADAPTIVE),
    fullRouteBody: buildCommandBody(definition, ROUTE_READ_MODE.FORCE_FULL),
    refinementBodies: (definition.refinements || []).map((refinement) => ({
      ...refinement,
      body: buildCommandRefinementBody(definition, refinement)
    }))
  }));

  const HOST_ID = 'obs-command-helper-host';
  const STORAGE_KEY = 'obs-command-helper-position-v1';
  const existing = document.getElementById(HOST_ID);
  if (existing) existing.remove();

  const host = document.createElement('div');
  host.id = HOST_ID;
  document.documentElement.appendChild(host);

  const root = host.attachShadow({ mode: 'open' });
  const savedPosition = readSavedPosition();
  let isOpen = false;
  let dashboardOpen = document.documentElement.dataset.obsPlanningDashboardOpen === 'true';
  let lastCommandsToggleToken = document.documentElement.dataset.obsPlanningCommandsToggle || '';
  let left = savedPosition.left ?? Math.max(12, window.innerWidth - 470);
  let top = savedPosition.top ?? Math.max(12, window.innerHeight - 620);
  let statusTimerId = null;

  root.innerHTML = `
    <style>
      :host { all: initial; }
      * { box-sizing: border-box; }
      .launcher {
        position: fixed;
        right: 18px;
        bottom: 22px;
        z-index: 2147483647;
        border: 1px solid rgba(148, 163, 184, .42);
        border-radius: 999px;
        padding: 9px 13px;
        background: #111827;
        color: #f8fafc;
        font: 700 12px/1 system-ui, sans-serif;
        cursor: pointer;
        box-shadow: 0 8px 24px rgba(0, 0, 0, .35);
      }
      .panel {
        position: fixed;
        left: ${left}px;
        top: ${top}px;
        z-index: 2147483647;
        width: min(460px, calc(100vw - 24px));
        max-height: min(76vh, 760px);
        display: none;
        flex-direction: column;
        overflow: hidden;
        border: 1px solid rgba(148, 163, 184, .35);
        border-radius: 14px;
        background: #0b1220;
        color: #f8fafc;
        box-shadow: 0 20px 60px rgba(0, 0, 0, .5);
        font: 13px/1.4 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      .panel[data-open="true"] { display: flex; }
      .header {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px;
        background: #111b2e;
        border-bottom: 1px solid rgba(148, 163, 184, .2);
        cursor: grab;
        user-select: none;
      }
      .header:active { cursor: grabbing; }
      .title { flex: 1; min-width: 0; }
      .title-main { font-weight: 800; }
      .title-sub { color: #94a3b8; font-size: 11px; }
      button {
        border: 1px solid rgba(148, 163, 184, .3);
        border-radius: 8px;
        background: #17243a;
        color: #f8fafc;
        font: inherit;
        cursor: pointer;
      }
      button:hover, button:focus-visible {
        background: #243750;
        outline: none;
      }
      .close { width: 30px; height: 30px; }
      .search-wrap {
        padding: 9px;
        border-bottom: 1px solid rgba(148, 163, 184, .16);
      }
      .search {
        width: 100%;
        border: 1px solid rgba(148, 163, 184, .3);
        border-radius: 8px;
        padding: 8px 9px;
        background: #020817;
        color: #f8fafc;
        font: inherit;
      }
      .body { overflow: auto; padding: 8px; }
      .group-title {
        padding: 7px 6px 4px;
        color: #94a3b8;
        font-size: 10px;
        font-weight: 800;
        letter-spacing: .08em;
        text-transform: uppercase;
      }
      .row {
        width: 100%;
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        align-items: stretch;
        gap: 7px;
        margin: 3px 0;
      }
      .actions {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        align-items: stretch;
        gap: 7px;
      }
      .insert {
        min-width: 0;
        padding: 8px;
        text-align: left;
      }
      .row-label {
        display: block;
        font-weight: 750;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .row-meta {
        display: block;
        color: #94a3b8;
        font-size: 11px;
      }
      .full-route {
        min-width: 54px;
        padding: 5px 8px;
        align-self: stretch;
        border-color: rgba(96, 165, 250, .5);
        color: #bfdbfe;
      }
      .refinement {
        min-width: 64px;
        padding: 5px 8px;
        align-self: stretch;
        border-color: rgba(167, 139, 250, .5);
        color: #ddd6fe;
      }
      .copy {
        padding: 5px 7px;
        align-self: stretch;
      }
      .status {
        margin: 0 8px 8px;
        padding: 8px;
        border-radius: 8px;
        background: rgba(37, 99, 235, .18);
        color: #bfdbfe;
        white-space: pre-wrap;
      }
      .empty {
        padding: 18px;
        color: #94a3b8;
        text-align: center;
      }
    </style>
    <button class="launcher" type="button">Commands</button>
    <section class="panel" data-open="false" aria-label="OBS command helper">
      <div class="header">
        <div class="title">
          <div class="title-main">OBS Command Helper</div>
          <div class="title-sub">Command = adaptive. Full = full route. Cmd fmt = reread format docs.</div>
        </div>
        <button class="close" type="button" title="Close">×</button>
      </div>
      <div class="search-wrap">
        <input class="search" type="search" placeholder="Search commands…" autocomplete="off">
      </div>
      <div class="body"></div>
    </section>
  `;

  const launcher = root.querySelector('.launcher');
  const panel = root.querySelector('.panel');
  const header = root.querySelector('.header');
  const closeButton = root.querySelector('.close');
  const searchInput = root.querySelector('.search');
  const body = root.querySelector('.body');

  function setOpen(nextOpen) {
    isOpen = Boolean(nextOpen);
    panel.dataset.open = String(isOpen);
    launcher.style.display = isOpen || dashboardOpen ? 'none' : 'block';

    if (isOpen) {
      keepPanelInViewport();
      renderCommands(searchInput.value);
      window.setTimeout(() => searchInput.focus(), 0);
    }
  }

  function handleGlobalShortcut(event) {
    if (event.repeat) return;
    const key = String(event.key || '');

    if (event.altKey && !event.ctrlKey && !event.metaKey && key === 'F2') {
      event.preventDefault();
      event.stopPropagation();
      setOpen(!isOpen);
      return;
    }

    if (key === 'Escape' && isOpen) {
      event.preventDefault();
      event.stopPropagation();
      setOpen(false);
    }
  }

  function renderCommands(query) {
    const normalizedQuery = String(query || '').trim().toLowerCase();
    const filtered = COMMANDS.filter((command) => {
      const haystack = [
        command.label,
        command.englishName,
        command.description,
        command.group,
        'full route adaptive',
        ...(command.refinementBodies || []).flatMap((refinement) => [
          refinement.label,
          refinement.description,
          refinement.id,
          ...refinement.readRequired
        ])
      ].join(' ').toLowerCase();

      return !normalizedQuery || haystack.includes(normalizedQuery);
    });

    body.textContent = '';

    if (!filtered.length) {
      const empty = document.createElement('div');
      empty.className = 'empty';
      empty.textContent = 'No matching commands.';
      body.appendChild(empty);
      return;
    }

    ['Commands'].forEach((groupName) => {
      const commands = filtered.filter((command) => command.group === groupName);
      if (!commands.length) return;

      const heading = document.createElement('div');
      heading.className = 'group-title';
      heading.textContent = groupName;
      body.appendChild(heading);

      commands.forEach((command) => {
        const row = document.createElement('div');
        row.className = 'row';

        const insertButton = document.createElement('button');
        insertButton.type = 'button';
        insertButton.className = 'insert';
        insertButton.title = 'Insert command body with adaptive route reading';

        const label = document.createElement('span');
        label.className = 'row-label';
        label.textContent = `${command.englishName} · ${command.label}`;

        const meta = document.createElement('span');
        meta.className = 'row-meta';
        meta.textContent = command.description;
        insertButton.append(label, meta);

        const fullRouteButton = document.createElement('button');
        fullRouteButton.type = 'button';
        fullRouteButton.className = 'full-route';
        fullRouteButton.textContent = 'Full';
        fullRouteButton.title = 'Insert the same command and force a fresh read of its complete required route';

        const refinementButtons = (command.refinementBodies || []).map((refinement) => {
          const button = document.createElement('button');
          button.type = 'button';
          button.className = 'refinement';
          button.textContent = refinement.label;
          button.title = refinement.description;

          button.addEventListener('click', () => {
            const inserted = insertIntoComposer(refinement.body);
            showStatus(
              inserted
                ? `Inserted refinement: ${command.label} · ${refinement.label}`
                : 'Composer was not found. Click the ChatGPT input and try again.'
            );
          });

          return button;
        });

        const copyButton = document.createElement('button');
        copyButton.type = 'button';
        copyButton.className = 'copy';
        copyButton.textContent = 'Copy';
        copyButton.title = 'Copy the adaptive command body';

        insertButton.addEventListener('click', () => {
          const inserted = insertIntoComposer(command.adaptiveBody);
          showStatus(
            inserted
              ? `Inserted: ${command.label} · adaptive route read`
              : 'Composer was not found. Click the ChatGPT input and try again.'
          );
        });

        fullRouteButton.addEventListener('click', () => {
          const inserted = insertIntoComposer(command.fullRouteBody);
          showStatus(
            inserted
              ? `Inserted: ${command.label} · forced full route read`
              : 'Composer was not found. Click the ChatGPT input and try again.'
          );
        });

        copyButton.addEventListener('click', async () => {
          const copied = await copyText(command.adaptiveBody);
          showStatus(copied ? `Copied: ${command.label} · adaptive route read` : 'Clipboard copy failed.');
        });

        const actions = document.createElement('div');
        actions.className = 'actions';
        actions.append(fullRouteButton, ...refinementButtons, copyButton);

        row.append(insertButton, actions);
        body.appendChild(row);
      });
    });
  }

  function findComposer() {
    const selectors = [
      '#prompt-textarea[contenteditable="true"]',
      '[data-testid="composer-textarea"][contenteditable="true"]',
      'textarea[data-testid="composer-textarea"]',
      'textarea[placeholder]',
      '[contenteditable="true"][role="textbox"]'
    ];

    const candidates = [];

    for (const selector of selectors) {
      document.querySelectorAll(selector).forEach((element) => {
        if (candidates.includes(element)) return;

        const rect = element.getBoundingClientRect();
        const style = window.getComputedStyle(element);

        if (rect.width <= 0 || rect.height <= 0) return;
        if (style.display === 'none' || style.visibility === 'hidden') return;

        candidates.push(element);
      });
    }

    candidates.sort((a, b) => b.getBoundingClientRect().bottom - a.getBoundingClientRect().bottom);
    return candidates[0] || null;
  }

  function insertIntoComposer(commandBody) {
    const composer = findComposer();
    if (!composer) return false;

    composer.focus();
    const currentText = getComposerText(composer);
    const hasExistingText = currentText.trim().length > 0;
    const textToInsert = hasExistingText ? `\n\n${commandBody}` : commandBody;

    if (composer instanceof HTMLTextAreaElement || composer instanceof HTMLInputElement) {
      const nextValue = hasExistingText ? `${currentText}\n\n${commandBody}` : commandBody;
      const prototype = composer instanceof HTMLTextAreaElement
        ? HTMLTextAreaElement.prototype
        : HTMLInputElement.prototype;
      const setter = Object.getOwnPropertyDescriptor(prototype, 'value')?.set;

      if (setter) setter.call(composer, nextValue);
      else composer.value = nextValue;

      dispatchInputEvents(composer, textToInsert);
      return true;
    }

    moveCaretToEnd(composer);
    let inserted = false;

    try {
      inserted = document.execCommand('insertText', false, textToInsert);
    } catch (error) {
      inserted = false;
    }

    if (!inserted) {
      const nextValue = hasExistingText ? `${currentText}\n\n${commandBody}` : commandBody;
      composer.textContent = nextValue;
      dispatchInputEvents(composer, textToInsert);
    }

    return true;
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

  function getComposerText(element) {
    if (element instanceof HTMLTextAreaElement || element instanceof HTMLInputElement) {
      return element.value || '';
    }

    return element.innerText || element.textContent || '';
  }

  function dispatchInputEvents(element, data) {
    try {
      element.dispatchEvent(new InputEvent('input', {
        bubbles: true,
        composed: true,
        inputType: 'insertText',
        data
      }));
    } catch (error) {
      element.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    }

    element.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
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
      try {
        copied = document.execCommand('copy');
      } finally {
        textarea.remove();
      }

      return copied;
    }
  }

  function showStatus(message) {
    root.querySelector('.status')?.remove();

    if (statusTimerId !== null) {
      window.clearTimeout(statusTimerId);
      statusTimerId = null;
    }

    const status = document.createElement('div');
    status.className = 'status';
    status.textContent = message;
    panel.appendChild(status);

    statusTimerId = window.setTimeout(() => {
      status.remove();
      statusTimerId = null;
    }, 3500);
  }

  function keepPanelInViewport() {
    const rect = panel.getBoundingClientRect();
    const width = rect.width || 460;
    const height = rect.height || 560;

    left = clamp(left, 8, Math.max(8, window.innerWidth - width - 8));
    top = clamp(top, 8, Math.max(8, window.innerHeight - height - 8));

    panel.style.left = `${left}px`;
    panel.style.top = `${top}px`;
  }

  function enableDragging() {
    let pointerId = null;
    let startX = 0;
    let startY = 0;
    let startLeft = 0;
    let startTop = 0;

    function handlePointerDown(event) {
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

    function handlePointerMove(event) {
      if (pointerId !== event.pointerId) return;

      const width = panel.offsetWidth || 460;
      const height = panel.offsetHeight || 560;

      left = clamp(startLeft + event.clientX - startX, 8, Math.max(8, window.innerWidth - width - 8));
      top = clamp(startTop + event.clientY - startY, 8, Math.max(8, window.innerHeight - height - 8));

      panel.style.left = `${left}px`;
      panel.style.top = `${top}px`;
      event.preventDefault();
    }

    function finishDrag(event) {
      if (pointerId === null) return;

      try {
        header.releasePointerCapture(pointerId);
      } catch (error) {
        // Ignore a pointer that the browser already released.
      }

      pointerId = null;
      savePosition(left, top);
      event.preventDefault();
    }

    header.addEventListener('pointerdown', handlePointerDown);
    header.addEventListener('pointermove', handlePointerMove);
    header.addEventListener('pointerup', finishDrag);
    header.addEventListener('pointercancel', finishDrag);

    return function disableDragging() {
      header.removeEventListener('pointerdown', handlePointerDown);
      header.removeEventListener('pointermove', handlePointerMove);
      header.removeEventListener('pointerup', finishDrag);
      header.removeEventListener('pointercancel', finishDrag);
    };
  }

  function readSavedPosition() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      return {
        left: Number.isFinite(parsed.left) ? parsed.left : null,
        top: Number.isFinite(parsed.top) ? parsed.top : null
      };
    } catch (error) {
      return { left: null, top: null };
    }
  }

  function savePosition(nextLeft, nextTop) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        left: nextLeft,
        top: nextTop
      }));
    } catch (error) {
      // Position persistence is optional.
    }
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function syncDashboardVisibilityFromDom() {
    dashboardOpen = document.documentElement.dataset.obsPlanningDashboardOpen === 'true';
    launcher.style.display = isOpen || dashboardOpen ? 'none' : 'block';
  }

  function consumeCommandsToggle(token) {
    const nextToken = String(token || '');
    if (!nextToken || nextToken === lastCommandsToggleToken) return;

    lastCommandsToggleToken = nextToken;
    setOpen(!isOpen);
  }

  function handleDashboardVisibility(event) {
    dashboardOpen = Boolean(event?.detail?.open);
    launcher.style.display = isOpen || dashboardOpen ? 'none' : 'block';
  }

  function handleCommandsToggle(event) {
    consumeCommandsToggle(
      event?.detail?.token || document.documentElement.dataset.obsPlanningCommandsToggle
    );
  }

  function handleLauncherClick() {
    setOpen(true);
  }

  function handleCloseClick() {
    setOpen(false);
  }

  function handleSearchInput() {
    renderCommands(searchInput.value);
  }

  function handleWindowResize() {
    keepPanelInViewport();
  }

  const planningDomObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.attributeName === 'data-obs-planning-dashboard-open') {
        syncDashboardVisibilityFromDom();
      }

      if (mutation.attributeName === 'data-obs-planning-commands-toggle') {
        consumeCommandsToggle(document.documentElement.dataset.obsPlanningCommandsToggle);
      }
    }
  });

  planningDomObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: [
      'data-obs-planning-dashboard-open',
      'data-obs-planning-commands-toggle'
    ]
  });

  window.addEventListener('obs-planning-dashboard-visibility', handleDashboardVisibility);
  window.addEventListener('obs-planning-commands-toggle', handleCommandsToggle);
  launcher.addEventListener('click', handleLauncherClick);
  closeButton.addEventListener('click', handleCloseClick);
  searchInput.addEventListener('input', handleSearchInput);
  window.addEventListener('resize', handleWindowResize);
  window.addEventListener('keydown', handleGlobalShortcut, true);

  const disableDragging = enableDragging();

  function dispose() {
    if (statusTimerId !== null) {
      window.clearTimeout(statusTimerId);
      statusTimerId = null;
    }

    planningDomObserver.disconnect();
    disableDragging();

    window.removeEventListener('obs-planning-dashboard-visibility', handleDashboardVisibility);
    window.removeEventListener('obs-planning-commands-toggle', handleCommandsToggle);
    window.removeEventListener('resize', handleWindowResize);
    window.removeEventListener('keydown', handleGlobalShortcut, true);

    launcher.removeEventListener('click', handleLauncherClick);
    closeButton.removeEventListener('click', handleCloseClick);
    searchInput.removeEventListener('input', handleSearchInput);

    host.remove();

    if (window[INSTANCE_DISPOSE_KEY] === dispose) {
      delete window[INSTANCE_DISPOSE_KEY];
    }
  }

  window[INSTANCE_DISPOSE_KEY] = dispose;

  renderCommands('');
})();
