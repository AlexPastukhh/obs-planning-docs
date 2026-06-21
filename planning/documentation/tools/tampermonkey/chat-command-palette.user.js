// ==UserScript==
// @name         Reusable Chat Command Helper
// @namespace    https://github.com/AlexPastukhh/obs/reusable-docs
// @version      0.6.5-projection-contract
// @description  Reusable projection-only draggable command helper for inserting structured command prompt bodies into ChatGPT.
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

  Implementation note:
    - Multiline command bodies are assembled with Array.join("\n") so the userscript remains valid JavaScript.
*/

(function () {
  'use strict';

  const COMMAND_DEFINITIONS = [
    {
      id: 'replacement_archive.create',
      group: 'MVP-1',
      label: 'давай архив',
      description: 'output package',
      englishName: 'give arch',
      family: '`давай архив` / `собери архив` / `replacement package`',
      reminders: [
        'Output-package mode, not archive read-source mode.',
        'Produce a full replacement archive.',
        'Give apply/diff commands in chat.',
        'Use git add -N for new files before diff capture.',
        'Ask user to paste diff before commit.',
        'Do not commit or push.'
      ],
      target: '<what archive/package should include>'
    },
    {
      id: 'archive_source.use',
      group: 'MVP-1',
      label: 'арх',
      description: 'archive source',
      englishName: 'added arch',
      family: '`арх` / `из архива` / `use archive`',
      reminders: [
        'Read-source mode, not output-package mode.',
        'Use provided/latest archive as source snapshot.',
        'Do not create replacement archive unless separately requested.',
        'State archive freshness/source limits when relevant.'
      ],
      target: '<what should be checked from archive>'
    },
    {
      id: 'file_update.plan',
      group: 'MVP-1',
      label: 'план файл-обновление',
      description: 'file plan',
      englishName: 'plan file update',
      family: '`план файл-обновление` / `спланируй обновление файлов` / `спланируй архив`',
      reminders: [
        'Plan file/docs/code/archive update only.',
        'End with `План файл-обновление` in planned mode.',
        'Do not edit files.',
        'Do not create archive unless separately requested.'
      ],
      target: '<what update/archive should be planned>'
    },
    {
      id: 'critical_review.apply',
      group: 'MVP-1',
      label: 'крит',
      description: 'critical review',
      englishName: 'crit',
      family: '`крит` / `критически оцени` / `critical review`',
      reminders: [
        'Treat target as hypothesis, not accepted truth.',
        'Give honest verdict with risks and assumptions.',
        'Do not edit files, create archives, commit or push.'
      ],
      target: '<what should be critically reviewed>'
    },
    {
      id: 'context_recheck.apply',
      group: 'MVP-1',
      label: 'обс',
      description: 'context recheck',
      englishName: 'chat rech',
      family: '`обс` / `перепроверь обсуждение` / `context recheck`',
      reminders: [
        'Re-check relevant prior discussion.',
        'Preserve accepted decisions and constraints.',
        'State what was checked and what remains unavailable.'
      ],
      target: '<what discussion/context should be rechecked>'
    },
    {
      id: 'current_state.report',
      group: 'MVP-1',
      label: 'положняк',
      description: 'current state',
      englishName: 'polozh',
      family: '`положняк` / `текущий положняк` / `current state`',
      reminders: [
        'Report current repo/chat/planning state.',
        'Separate known, local, unknown and not checked.',
        'Do not edit or archive unless separately requested.'
      ],
      target: '<state target>'
    },
    {
      id: 'plan.now',
      group: 'MVP-1',
      label: 'планируй',
      description: 'plan now',
      englishName: 'plan now',
      family: '`планируй` / `распланируй` / `plan`',
      reminders: [
        'Plan the next concrete step now.',
        'State scope, boundary, evidence and next action.',
        'Do not edit files or create archive unless separately requested.'
      ],
      target: '<what should be planned>'
    },
    {
      id: 'command.create',
      group: 'MVP-1',
      label: 'создай команду',
      description: 'new command',
      englishName: 'create command',
      family: '`создай команду` / `создай новую команду` / `добавь команду` / `new command` / `create command`',
      reminders: [
        'Create command semantics in UCM/owner docs first.',
        'Tampermonkey is projection, not source of truth.',
        'Define family, type, owner files, output and permission boundary.',
        'Do not edit/create archive unless separately requested.'
      ],
      target: '<what command should be created or planned>'
    },
    {
      id: 'parallel_workspace.start',
      group: 'MVP-1',
      label: 'начни параллельную работу',
      description: 'parallel workspace',
      englishName: 'start parallel work',
      family: '`начни параллельную работу` / `старт параллельной работы` / `parallel workspace` / `start parallel workflow`',
      reminders: [
        'Start one staging-only workspace only for a concrete target.',
        'Do not edit shared canonical docs directly from workspace phase.',
        'Do not create aggregate sync until a sync-candidate workspace exists.'
      ],
      target: '<parallel agent/workstream target>'
    },
    {
      id: 'scenario_plan.workspace',
      group: 'MVP-2',
      label: 'план сценария',
      description: 'scenario workspace',
      englishName: 'scenario plan',
      family: '`план сценария` / `scenario plan` / `workspace plan` / `шаблон планирования`',
      reminders: [
        'Use OBS planning-system owner docs.',
        'Fill only explicit user input by default.',
        'Unknown fields are `not provided`.',
        'AI assumptions/suggestions must be separate.'
      ],
      target: '<scenario target and provided inputs>'
    },
    {
      id: 'idea.evaluate',
      group: 'MVP-2',
      label: 'оцени идею',
      description: 'idea eval',
      englishName: 'idea eval',
      family: '`оцени идею` / `idea eval` / `оценка идеи`',
      reminders: [
        'Evaluate the provided idea against Minimum/Base/Desired/Max.',
        'Do not promote idea to Plan Core automatically.',
        'Use `not provided` when evidence is missing.'
      ],
      target: '<idea to evaluate>'
    },
    {
      id: 'acceptance.plan',
      group: 'MVP-2',
      label: 'AC план',
      description: 'acceptance criteria',
      englishName: 'acceptance plan',
      family: '`AC план` / `acceptance plan` / `критерии готовности`',
      reminders: [
        'Convert explicit user goals into Acceptance Criteria.',
        'Do not invent criteria unless user asks for suggestions.',
        'AC must have a verifiable result or `not provided`.'
      ],
      target: '<goals to convert into AC>'
    },
    {
      id: 'planning_commands.review',
      group: 'MVP-2',
      label: 'команды планирования',
      description: 'planning commands',
      englishName: 'planning commands',
      family: '`команды планирования` / `planning commands`',
      reminders: [
        'Use command-creation workflow before treating a command as accepted.',
        'No Tampermonkey projection unless explicitly in scope.',
        'Do not edit files/create archive unless separately requested.'
      ],
      target: '<planning command target>'
    }
  ];

  function buildCommandBody(definition) {
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
      'source_of_truth:',
      '  Start from `planning/planning-use-case-map.md`.',
      '  Then read the owner / linked files for this command route.',
      '',
      'route_read_rule:',
      '  If you have not read this command route and its linked owner/example files in this chat, read them before answering.',
      '  If you have read them but do not remember the required behavior, boundaries or key points, reread from `planning/planning-use-case-map.md` before answering.',
      '  Do not rely only on this prompt when command behavior is uncertain.',
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

  const COMMANDS = COMMAND_DEFINITIONS.map((definition) => ({
    ...definition,
    body: buildCommandBody(definition)
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
  let left = savedPosition.left ?? Math.max(12, window.innerWidth - 420);
  let top = savedPosition.top ?? Math.max(12, window.innerHeight - 620);

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
        width: min(410px, calc(100vw - 24px));
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
      button:hover, button:focus-visible { background: #243750; outline: none; }
      .close { width: 30px; height: 30px; }
      .search-wrap { padding: 9px; border-bottom: 1px solid rgba(148, 163, 184, .16); }
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
      .insert {
        min-width: 0;
        padding: 8px;
        text-align: left;
      }
      .row-label { display: block; font-weight: 750; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .row-meta { display: block; color: #94a3b8; font-size: 11px; }
      .copy { padding: 5px 7px; align-self: stretch; }
      .status {
        margin: 0 8px 8px;
        padding: 8px;
        border-radius: 8px;
        background: rgba(37, 99, 235, .18);
        color: #bfdbfe;
        white-space: pre-wrap;
      }
      .empty { padding: 18px; color: #94a3b8; text-align: center; }
    </style>
    <button class="launcher" type="button">Commands</button>
    <section class="panel" data-open="false" aria-label="OBS command helper">
      <div class="header">
        <div class="title">
          <div class="title-main">OBS Command Helper</div>
          <div class="title-sub">Click a row to insert. Drag this header to move.</div>
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
      const haystack = [command.label, command.englishName, command.description, command.group].join(' ').toLowerCase();
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

    ['MVP-1', 'MVP-2'].forEach((groupName) => {
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
        insertButton.title = 'Insert command body into ChatGPT';

        const label = document.createElement('span');
        label.className = 'row-label';
        label.textContent = `${command.englishName} · ${command.label}`;
        const meta = document.createElement('span');
        meta.className = 'row-meta';
        meta.textContent = command.description;
        insertButton.append(label, meta);

        const copyButton = document.createElement('button');
        copyButton.type = 'button';
        copyButton.className = 'copy';
        copyButton.textContent = 'Copy';
        copyButton.title = 'Copy command body';

        insertButton.addEventListener('click', () => {
          const inserted = insertIntoComposer(command.body);
          showStatus(inserted ? `Inserted: ${command.label}` : 'Composer was not found. Click the ChatGPT input and try again.');
        });

        copyButton.addEventListener('click', async () => {
          const copied = await copyText(command.body);
          showStatus(copied ? `Copied: ${command.label}` : 'Clipboard copy failed.');
        });

        row.append(insertButton, copyButton);
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
    const existingText = getComposerText(composer).trim();
    const textToInsert = existingText ? `\n\n${commandBody}` : commandBody;

    if (composer instanceof HTMLTextAreaElement || composer instanceof HTMLInputElement) {
      const nextValue = existingText ? `${getComposerText(composer)}\n\n${commandBody}` : commandBody;
      const prototype = composer instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
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
      const nextValue = existingText ? `${getComposerText(composer)}\n\n${commandBody}` : commandBody;
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
      const copied = document.execCommand('copy');
      textarea.remove();
      return copied;
    }
  }

  function showStatus(message) {
    root.querySelector('.status')?.remove();
    const status = document.createElement('div');
    status.className = 'status';
    status.textContent = message;
    panel.appendChild(status);
    window.setTimeout(() => status.remove(), 3500);
  }

  function keepPanelInViewport() {
    const rect = panel.getBoundingClientRect();
    const width = rect.width || 410;
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

    header.addEventListener('pointerdown', (event) => {
      if (event.button !== 0 || event.target === closeButton) return;
      pointerId = event.pointerId;
      startX = event.clientX;
      startY = event.clientY;
      const rect = panel.getBoundingClientRect();
      startLeft = rect.left;
      startTop = rect.top;
      header.setPointerCapture(pointerId);
      event.preventDefault();
    });

    header.addEventListener('pointermove', (event) => {
      if (pointerId !== event.pointerId) return;
      const width = panel.offsetWidth || 410;
      const height = panel.offsetHeight || 560;
      left = clamp(startLeft + event.clientX - startX, 8, Math.max(8, window.innerWidth - width - 8));
      top = clamp(startTop + event.clientY - startY, 8, Math.max(8, window.innerHeight - height - 8));
      panel.style.left = `${left}px`;
      panel.style.top = `${top}px`;
      event.preventDefault();
    });

    const finishDrag = (event) => {
      if (pointerId === null) return;
      try { header.releasePointerCapture(pointerId); } catch (error) { /* ignore */ }
      pointerId = null;
      savePosition(left, top);
      event.preventDefault();
    };

    header.addEventListener('pointerup', finishDrag);
    header.addEventListener('pointercancel', finishDrag);
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
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ left: nextLeft, top: nextTop }));
    } catch (error) {
      // Position persistence is optional.
    }
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  window.addEventListener('obs-planning-dashboard-visibility', (event) => {
    dashboardOpen = Boolean(event?.detail?.open);
    launcher.style.display = isOpen || dashboardOpen ? 'none' : 'block';
  });
  window.addEventListener('obs-planning-commands-toggle', () => setOpen(!isOpen));

  launcher.addEventListener('click', () => setOpen(true));
  closeButton.addEventListener('click', () => setOpen(false));
  searchInput.addEventListener('input', () => renderCommands(searchInput.value));
  window.addEventListener('resize', keepPanelInViewport);
  window.addEventListener('keydown', handleGlobalShortcut, true);

  enableDragging();
  renderCommands('');
})();
