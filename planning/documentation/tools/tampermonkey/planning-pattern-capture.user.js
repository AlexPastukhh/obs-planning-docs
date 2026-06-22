// ==UserScript==
// @name         Planning Pattern Capture v0.4.7
// @namespace    planning-pattern-capture
// @version      0.4.7
// @description  ChatGPT-only capture panel with D/F scoring, one-click session timer milestones, finished-session outbox, and reviewed batch sync
// @match        *://chatgpt.com/*
// @match        *://*.chatgpt.com/*
// @match        *://chat.openai.com/*
// @match        *://*.chat.openai.com/*
// @include      https://chatgpt.com/*
// @include      https://*.chatgpt.com/*
// @include      https://chat.openai.com/*
// @include      https://*.chat.openai.com/*
// @run-at       document-idle
// @noframes
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_setClipboard
// @grant        GM_addValueChangeListener
// @grant        GM_notification
// ==/UserScript==

(function () {
  "use strict";
  if (window.top !== window.self) return;

  const KEY_SETTINGS = "planningPatternCapture:v2:settings";
  const KEY_ACTIVE = "planningPatternCapture:v2:active";
  const KEY_EVENTS = "planningPatternCapture:v2:events";
  const KEY_TIMER = "planningPatternCapture:v2:timer";

  // Shared page-origin storage used by both Pattern Capture and Dashboard Viewer.
  const OUTBOX_KEY = "obsPlanning:sessionOutbox:v1";
  const CONTEXT_KEY = "obsPlanning:sessionContext:v1";
  const OUTBOX_SCHEMA = "obs-session-outbox-v1";

  // Backward-compatible import keys from v1.
  const KEY_SETTINGS_V1 = "planningPatternCapture:v1:settings";
  const KEY_ACTIVE_V1 = "planningPatternCapture:v1:active";
  const KEY_EVENTS_V1 = "planningPatternCapture:v1:events";

  const PLAYBOOK = "Workflows/Real Reward Pattern Playbook.md";
  const WORKFLOW_SOURCE = "Workflows/Real Reward Work Loop Workflow.md#compact-read-only-workflow";

  const BASE_TOTAL_SCORE = 3.5;
  const BASE_DIM_SCORE = BASE_TOTAL_SCORE / 2;
  const DF_STEP = 0.1;
  const SETTINGS_VERSION = "0.4.7";
  const TIMER_SCHEMA = "planning-pattern-session-timer-v1";
  const TIMER_TOTAL_MS = 30 * 60 * 1000;
  const TIMER_MILESTONES = [
    { minutes: 10, label: "10m focus", title: "10 минут прошло", text: "Проверь направление и фокус: работа всё ещё двигает цель сессии?" },
    { minutes: 20, label: "20m focus", title: "20 минут прошло", text: "Последние 10 минут: верни максимум D/F и доведи видимый результат." },
    { minutes: 30, label: "30m end", title: "30 минут прошло", text: "Сегмент завершён: оцени D/F и зафиксируй результат через Finish." },
  ];

  const CAPTURE_DOCK_RIGHT = 18;
  const CAPTURE_DOCK_COLLAPSED_BOTTOM = 158;
  const CAPTURE_VIEWPORT_MARGIN = 12;

  const DEFAULT_SETTINGS = {
    scriptVersion: SETTINGS_VERSION,
    collapsed: true,
    hidden: false,
    x: 80,
    y: 120,
    width: 410,
    height: 720,
    timerSoundEnabled: true,
    timerVolume: 0.65,
  };
  const DEFAULT_ACTIVE = { date: localDate(), session: "S1", sessionMode: "auto", selectedPatternIds: [], shownPatternIds: [] };

  const workflowSteps = [
    {
      mark: "🧠🤫💰",
      short: "Тишина",
      full: "Тишина в голове: конц мышл, они мани.",
      questions: [
        "В голове тише или я разгоняю внутренний диалог?",
        "Я сейчас двигаю действие или покупаю мыслительный процесс?",
        "Это конц мышл, они мани, или я снова плачу вниманием за лишнее думание?",
      ],
    },
    {
      mark: "📚🛤️",
      short: "Доки",
      full: "Опора на доки: всё уже подумано; доказывать хороший день.",
      questions: [
        "Я сейчас опираюсь на доки или снова самодеятельно думаю?",
        "Это доказывает хороший день?",
        "Детали дня не важны, дней много — я не пытаюсь идеально прожить один день?",
      ],
    },
    {
      mark: "🚨",
      short: "Слив = слив",
      full: "Если похоже на слив — считать сливом без самодеятельности.",
      questions: [
        "Это похоже на слив?",
        "Если похоже на слив, я уже отношусь к этому как к сливу?",
        "Я не придумываю исключение / оправдание / самодеятельность?",
      ],
    },
    {
      mark: "🧲⚡🧱😣🚀",
      short: "Летящая клетка",
      full: "Ограждён от лёгких стимулов/чувств; неприятно возможно, но лечу к Desired.",
      questions: [
        "Какие лёгкие стимулы/чувства сейчас ограждены клеткой?",
        "Какие неприятные ощущения могут быть в процессе?",
        "Вижу ли я реально желанный результат?",
        "Вижу ли я реально нежеланный результат / цену слива?",
        "Какое маленькое действие прямо сейчас летит к Desired?",
      ],
    },
    {
      mark: "🧵📜🟢🔴",
      short: "Пришить образ",
      full: "Пришить нужные стимулы/чувства через действие, promise и чёткое представление зелёного/красного результата.",
      questions: [
        "🟢 Зелёный результат: что реально желанно, что должно стать видимым/доказанным?",
        "🔴 Красный результат: что реально нежеланно, как выглядит слив / потеря дня / потеря направления?",
        "Что нужно навязать действием прямо сейчас?",
        "Нужен ли promise, если pull/resistance сильный?",
      ],
    },
    {
      mark: "✅D",
      short: "D max-vs-usual",
      full: "Представить максимальный D и обычный D; биться за максимум и расширять его границы.",
      questions: [
        "Как бы выглядел наилучший D для этого сегмента?",
        "Как лучше менеджить работу, чтобы она была полезной?",
        "Какой желанный или видимый результат должен появиться?",
        "Как будущий я хотел бы, чтобы было?",
        "Какие нужные стимулы и чувства надо насадить для цели?",
        "Как выглядит обычный D-результат?",
        "Как побить обычный D и расширить границы максимального D?",
      ],
    },
    {
      mark: "⚡F",
      short: "F max-vs-usual",
      full: "Представить максимальный F и обычный F; биться за максимум и расширять его границы.",
      questions: [
        "Как бы выглядел наилучший F для этого сегмента?",
        "Как лучше менеджить фокус?",
        "Как увеличить количество полезных действий в единицу времени?",
        "Какие нужные стимулы и чувства надо насадить для исполнения?",
        "Как выглядит обычное F-выполнение?",
        "Как побить обычный F и расширить границы максимального F?",
      ],
    },
    {
      mark: "🏁⏱️📊",
      short: "Deadline race",
      full: "Короткий deadline-сегмент, где D/F максимум навязывается действием.",
      questions: [
        "Deadline виден?",
        "Цель видна?",
        "Обычный D/F понятен?",
        "Максимальный D/F представлен?",
        "Есть попытка побить обычный D/F?",
        "Есть попытка расширить границы максимального D/F?",
        "Race is not panic-speed — я не путаю гонку с паникой?",
      ],
    },
    {
      mark: "🧾",
      short: "Log",
      full: "Log session / penalty event / support facts when relevant.",
      questions: [
        "D/F score зафиксирован?",
        "Selected patterns отражают то, что реально проверялось?",
        "Penalty/support facts нужно записать?",
      ],
    },
  ];

  function makePattern(id, label, full, extra) {
    return { id, label, full, source: `${PLAYBOOK}#${id}`, ...(extra || {}) };
  }

  const fundamentalPatterns = [
    makePattern("course_time_management", "🛤️🌅➡️🎯💎📊|⏱️🧠", "🛤️🌅➡️🎯💎📊|⏱️🧠 Движение по курсу, тайм менеджмент", {
      source: "Tampermonkey local override",
      maxScore: 4,
      maxLabel: "allows 4",
      details: [
        "🛤️🌅➡️ Движение по курсу, правильному в текущей ситуации. Есть минимальные и максимальный варианты; без базы максимального не будет никогда.",
        "✅|🤑💰 Разделить базовый профит + какое-то удовольствие от жизни от max возможного профитного сценария, который приходит на ум с идеями, доступными тебе сейчас.",
        "Нельзя проиграть регулярному профиту здесь и сейчас; если есть неоднозначные вещи, нужно тщательно продумывать их.",
        "🥹 📉or📈? Избегать слишком много надежды на непонятно что, больших прыжков, невидимых результатов.",
        "Тайм менеджмент:",
        "🧺🧺😎 Планировать всегда чтобы с запасом, и чем больше тем лучше.",
        "📉🌀🥹 🟢yes|🔴no — Не доверять «ещё чуть-чуть осталось»; нужно тестировать, насколько много времени занимает что-то.",
        "📉📉 Не претендовать на знание того, сколько что займёт времени, если ты не протестировал / не прошёлся базово хотя бы.",
      ],
    }),
    makePattern("session_frame_visible_target", "⏱️🚂", "⏱️🚂🛤️➡️🎯 Session frame / visible target", {
      maxScore: 3.5,
      maxLabel: "allows 3.5",
      details: [
        "F grows when there is a session frame, visible target, timer/short segment, score awareness, and clear end.",
        "Start a session, name target, make target visible, use timer/frame, log after.",
      ],
    }),
    makePattern("short_distance_self_competition", "🏁⏱️📊", "🏁⏱️📊 Deadline race", {
      maxScore: 4.5,
      maxLabel: "allows 4.5",
      details: [
        "Короткий deadline-сегмент, где D/F максимум навязывается действием.",
        "🏁 Deadline виден?",
        "🎯 Цель видна?",
        "✅ Обычный D/F понятен?",
        "🤑 Максимальный D/F представлен?",
        "🤡 Соревнуешься с кем-то, самим собой или другим противником?",
      ],
    }),
    makePattern("low_cost_stimulus_cage_desired", "🤑🚫📉🧱|🧲⚡🧱😣🚀", "🤑🚫📉🧱 | 🧲⚡🧱😣🚀 Грамотное расширение профита без коллапса фундамента | Летящая клетка", {
      maxScore: 5.5,
      maxLabel: "allows 5.5",
      details: [
        "Ограждён от лёгких стимулов/чувств; неприятно возможно, но лечу к Desired.",
        "🤑🚫📉🧱 Не расширять, когда нет чёткой базы + регулярности и когда есть более приоритетные вещи/дедлайны; иначе всё развалится, придётся перестраивать, держа на горбу все эти расширения. Применимо абсолютно ко всему в жизни.",
        "Максимум:",
        "🔇➡️ тишина, концепт мышл, фокус от внутр наружу.",
        "🥹 📝 Будущий я — как ему лучше, удобнее? Как хотел прошлый я? Как доказать будущему себе, что это был хороший день.",
        "⚡ Какие лёгкие стимулы/чувства сейчас ограждены клеткой?",
        "🧪 Какие неприятные ощущения могут быть в процессе?",
        "🟢 Вижу ли я реально желанный результат?",
        "🔴 Вижу ли я реально нежеланный результат?",
        "🤑💰🚀📈🧺🧺 Ощущение прогресса к цели или в желаемом результате, набора пользы.",
        "🧵📜🟢🟢 Пришивание ситуации, где для тебя нормально делать то что нужно,не должно быть проблемой делать то, что сейчас нужно. Промис на цель, желанный результат. Питаешься только им.",
      ],
    }),
  ];

  const frequentPatterns = [
    makePattern("no_resistance_known_drift", "👁️🚫🥊🎭🕳️", "👁️🚫🥊🎭➡️🕳️ No-resistance known drift", {
      penalty: true,
      maxLabel: "penalty",
      details: [
        "🚫➡️🕳️ Если минус здоровье осознанное — сразу минус full day; на следующий день тоже минус.",
      ],
    }),
    makePattern("automatic_rails_result_forgotten", "🚂🛤️⚠️🎯", "🚂🛤️⚠️🎯 Automatic rails but Result forgotten", {
      maxLabel: "situational",
      details: [
        "Ты на рельсах, но нужно ещё дрова в двигатель подкидывать.",
        "Pause briefly, name Desired / useful result, ask what should become more real, add timer/score/visible progress, continue rails with result pressure.",
      ],
    }),
    makePattern("complex_problem_easy_stimulation", "🧩🪜⚠️➡️🧲⚡", "🧩🪜⚠️➡️🧲⚡ Complex multi-level problem → easy stimulation", {
      maxLabel: "situational",
      details: [
        "The problem is not decomposed enough; mind escapes from unclear analytical pressure into easier stimulation.",
        "Name the real blocker, write 3–5 small points, pick first layer, make first analytical move tiny, use target-related stimulation.",
      ],
    }),
  ];

  const situationalPatterns = [
    makePattern("fast_recovery_after_slip", "📉📈", "📉📈 Fast recovery after slip", {
      details: ["Slip/collapse followed by quick recovery; can prevent a slip from becoming a penalty event."],
    }),
    makePattern("public_anxiety_inner_dialogue_slowdown", "🏙️🧠🔁⏳", "🏙️🧠🔁⏳ Public anxiety → inner-dialogue slowdown", {
      details: ["Public/crowded-place anxiety turns into internal dialogue loop and slows physical action. Replacement is external next action."],
    }),
    makePattern("unactionable_out_of_scope_worry", "🧠🌪️🚫🎯", "🧠🌪️🚫🎯 Unactionable out-of-scope worry", {
      details: ["If worry cannot become action now, it is not planning; it is an unactionable loop that steals focus and leaves residue."],
    }),
    makePattern("promise_may_be_needed", "🧵📜", "🧵📜 Promise may be needed", {
      source: `${PLAYBOOK}#promise_may_be_needed`,
      details: ["Use promise when pull/resistance is strong enough that reasoning may be overwritten."],
    }),
  ];

  const dfButtons = [
    { label: "✅D+", dimension: "D", delta: DF_STEP, effect: "positive D adjustment" },
    { label: "✅D-", dimension: "D", delta: -DF_STEP, effect: "negative D adjustment" },
    { label: "⚡F+", dimension: "F", delta: DF_STEP, effect: "positive F adjustment" },
    { label: "⚡F-", dimension: "F", delta: -DF_STEP, effect: "negative F adjustment" },
  ];

  const supportButtons = [
    { label: "🍽️ ok", supportType: "🍽️ food", fact: "Не объелся", effect: "helped continue" },
    { label: "🍽️ over", supportType: "🍽️ food", fact: "Объелся", effect: "worsened F / sleep risk" },
    { label: "🏃 moved", supportType: "🏃 movement / sport", fact: "Двигался", effect: "restored energy" },
    { label: "🛌 try", supportType: "🛌 sleep / sleep attempt", fact: "Пытался заснуть", effect: "valid sleep attempt" },
    { label: "🧲⚡ drift", supportType: "🧲⚡ stimulus control", fact: "Stimulus drift", effect: "hurt readiness" },
    { label: "🔋 rec", supportType: "🔋 recovery / readiness", fact: "Восстановился", effect: "helped continue" },
    { label: "🔁 back", supportType: "🔁 transition", fact: "Вернулся к следующей сессии", effect: "helped continue" },
    { label: "🩺 health", supportType: "🩺 health", fact: "Сделал доп. время для здоровья", effect: "supported day" },
  ];

  let settings = normalizeSettings(loadSettings());
  let active = normalizeActive(loadWithMigration(KEY_ACTIVE, KEY_ACTIVE_V1, DEFAULT_ACTIVE));
  let events = loadEventsFromStorage();
  let timer = normalizeTimer(load(KEY_TIMER, emptyTimer()));
  let timerTicker = null;
  let timerAudioContext = null;
  let panelHiddenForPage = false;
  let dashboardOpen = document.documentElement.dataset.obsPlanningDashboardOpen === "true";
  let lastCaptureToggleToken = document.documentElement.dataset.obsPlanningCaptureToggle || "";
  let workflowPinned = false;
  let root = null;
  let didDragCollapsed = false;
  let didDragExpanded = false;
  let resizeObserver = null;
  let resizeSaveTimer = null;
  let openPanelPosition = null;

  // Migrate the old persistent close state: closing is page-local from v0.4.2 onward.
  save(KEY_SETTINGS, settings);

  alignActiveSessionWithContext();
  boot();
  setupStorageListeners();
  startTimerTicker();
  window.addEventListener("focus", () => { processTimerMilestones(); updateTimerUi(); });
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) { processTimerMilestones(); updateTimerUi(); }
  });
  window.addEventListener("obs-planning-session-context-updated", () => {
    alignActiveSessionWithContext();
    refresh();
  });

  function syncDashboardVisibilityFromDom() {
    const nextOpen = document.documentElement.dataset.obsPlanningDashboardOpen === "true";
    if (nextOpen === dashboardOpen) return;
    dashboardOpen = nextOpen;
    refresh();
  }

  function consumeCaptureToggle(token) {
    const nextToken = String(token || "");
    if (!nextToken || nextToken === lastCaptureToggleToken) return;
    lastCaptureToggleToken = nextToken;
    toggleCapturePanel();
  }

  window.addEventListener("obs-planning-dashboard-visibility", (event) => {
    dashboardOpen = Boolean(event?.detail?.open);
    refresh();
  });
  window.addEventListener("obs-planning-capture-toggle", (event) => {
    consumeCaptureToggle(event?.detail?.token || document.documentElement.dataset.obsPlanningCaptureToggle);
  });

  const planningDomObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.attributeName === "data-obs-planning-dashboard-open") syncDashboardVisibilityFromDom();
      if (mutation.attributeName === "data-obs-planning-capture-toggle") {
        consumeCaptureToggle(document.documentElement.dataset.obsPlanningCaptureToggle);
      }
    }
  });
  planningDomObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-obs-planning-dashboard-open", "data-obs-planning-capture-toggle"]
  });

  function boot() {
    try {
      waitForBodyAndRender();
      window.addEventListener("keydown", handleGlobalShortcut, true);
      window.addEventListener("resize", () => {
        settings = normalizeSettings(settings);
        save(KEY_SETTINGS, settings);
        refresh();
      }, { passive: true });
    } catch (err) {
      console.error("Planning Pattern Capture failed to boot", err);
      showFallbackError(err);
    }
  }

  function handleGlobalShortcut(event) {
    if (event.repeat) return;
    const key = String(event.key || '');

    if (event.altKey && !event.ctrlKey && !event.metaKey && key === 'F1') {
      event.preventDefault();
      event.stopPropagation();
      toggleCapturePanel();
      return;
    }

    if (key === 'Escape' && !settings.collapsed) {
      event.preventDefault();
      event.stopPropagation();
      closeCapturePanel();
      return;
    }

    if (event.ctrlKey && event.altKey && key.toLowerCase() === 'p') {
      event.preventDefault();
      event.stopPropagation();
      forceShowPanel();
    }
  }

  function centeredOpenPanelPosition() {
    settings = normalizeSettings(settings);
    const width = Math.min(settings.width, Math.max(280, window.innerWidth - CAPTURE_VIEWPORT_MARGIN * 2));
    const height = Math.min(settings.height, Math.max(260, window.innerHeight - CAPTURE_VIEWPORT_MARGIN * 2));
    return {
      x: Math.max(CAPTURE_VIEWPORT_MARGIN, Math.round((window.innerWidth - width) / 2)),
      y: Math.max(CAPTURE_VIEWPORT_MARGIN, Math.round((window.innerHeight - height) / 2))
    };
  }

  function clampOpenPanelPosition(position) {
    const fallback = centeredOpenPanelPosition();
    if (!position) return fallback;
    const maxX = Math.max(CAPTURE_VIEWPORT_MARGIN, window.innerWidth - settings.width - CAPTURE_VIEWPORT_MARGIN);
    const maxY = Math.max(CAPTURE_VIEWPORT_MARGIN, window.innerHeight - settings.height - CAPTURE_VIEWPORT_MARGIN);
    return {
      x: Math.min(Math.max(CAPTURE_VIEWPORT_MARGIN, Number(position.x) || fallback.x), maxX),
      y: Math.min(Math.max(CAPTURE_VIEWPORT_MARGIN, Number(position.y) || fallback.y), maxY)
    };
  }

  function openCapturePanel() {
    panelHiddenForPage = false;
    settings.collapsed = false;
    openPanelPosition = centeredOpenPanelPosition();
    save(KEY_SETTINGS, settings);
    refresh();
  }

  function closeCapturePanel() {
    panelHiddenForPage = false;
    settings.collapsed = true;
    openPanelPosition = null;
    save(KEY_SETTINGS, settings);
    refresh();
  }

  function toggleCapturePanel() {
    if (settings.collapsed || panelHiddenForPage) openCapturePanel();
    else closeCapturePanel();
  }

  function hidePanel() {
    closeCapturePanel();
  }

  function waitForBodyAndRender() {
    let attempts = 0;
    const attempt = () => {
      attempts += 1;
      injectStyles();
      if (document.body) {
        render();
        setTimeout(ensureRenderedAndVisible, 500);
        setTimeout(ensureRenderedAndVisible, 2000);
        setTimeout(ensureRenderedAndVisible, 5000);
        return;
      }
      if (attempts < 80) setTimeout(attempt, 250);
      else console.warn("Planning Pattern Capture: document.body was not available");
    };
    attempt();
  }

  function ensureRenderedAndVisible() {
    if (!document.body || panelHiddenForPage) return;
    const el = document.getElementById("ppc-root");
    if (!el || !el.children.length) {
      render();
      return;
    }
    const rect = el.getBoundingClientRect();
    const offscreen = rect.width === 0 || rect.height === 0 || rect.right < 0 || rect.bottom < 0 || rect.left > window.innerWidth || rect.top > window.innerHeight;
    if (offscreen) forceShowPanel();
  }

  function forceShowPanel() {
    panelHiddenForPage = false;
    settings = normalizeSettings({ ...DEFAULT_SETTINGS, collapsed: false });
    openPanelPosition = centeredOpenPanelPosition();
    save(KEY_SETTINGS, settings);
    refresh();
    toast("PPC shown/reset");
  }

  function normalizeSettings(value) {
    const merged = { ...DEFAULT_SETTINGS, ...(value || {}) };
    merged.x = clampNumber(merged.x, 0, Math.max(0, window.innerWidth - 60), DEFAULT_SETTINGS.x);
    merged.y = clampNumber(merged.y, 0, Math.max(0, window.innerHeight - 40), DEFAULT_SETTINGS.y);
    merged.width = clampNumber(merged.width, 280, Math.max(280, window.innerWidth - 12), DEFAULT_SETTINGS.width);
    merged.height = clampNumber(merged.height, 260, Math.max(260, window.innerHeight - 12), DEFAULT_SETTINGS.height);
    merged.collapsed = Boolean(merged.collapsed);
    merged.hidden = false;
    merged.timerSoundEnabled = merged.timerSoundEnabled !== false;
    merged.timerVolume = clampNumber(merged.timerVolume, 0, 1, DEFAULT_SETTINGS.timerVolume);
    merged.scriptVersion = SETTINGS_VERSION;
    return merged;
  }

  function normalizeActive(value) {
    const rawSelected = value && Array.isArray(value.selectedPatternIds) ? value.selectedPatternIds : [];
    const rawShown = value && Array.isArray(value.shownPatternIds) ? value.shownPatternIds : [];
    return {
      ...DEFAULT_ACTIVE,
      ...(value || {}),
      date: normalizeDateValue((value && value.date) || DEFAULT_ACTIVE.date) || DEFAULT_ACTIVE.date,
      session: normalizeSessionName((value && value.session) || DEFAULT_ACTIVE.session) || DEFAULT_ACTIVE.session,
      sessionMode: value && value.sessionMode === "manual" ? "manual" : "auto",
      selectedPatternIds: migratePatternIds(rawSelected),
      shownPatternIds: migratePatternIds(rawShown),
    };
  }

  function normalizeDateValue(value) {
    const text = String(value || "").trim();
    const match = text.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!match) return "";

    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);
    const date = new Date(Date.UTC(year, month - 1, day));

    if (
      date.getUTCFullYear() !== year ||
      date.getUTCMonth() !== month - 1 ||
      date.getUTCDate() !== day
    ) return "";

    return text;
  }

  function emptyTimer() {
    return {
      schema: TIMER_SCHEMA,
      status: "idle",
      date: "",
      session: "",
      startedAt: null,
      runStartedAt: null,
      elapsedMs: 0,
      pausedAt: null,
      expiredAt: null,
      notifiedMinutes: [],
      lastNotice: null,
    };
  }

  function normalizeTimer(value) {
    if (!value || value.schema !== TIMER_SCHEMA) return emptyTimer();
    const validStatuses = new Set(["idle", "running", "paused", "expired"]);
    const normalized = { ...emptyTimer(), ...value };
    normalized.status = validStatuses.has(normalized.status) ? normalized.status : "idle";
    normalized.date = String(normalized.date || "");
    normalized.session = normalizeSessionName(normalized.session) || "";
    normalized.startedAt = normalized.startedAt == null || !Number.isFinite(Number(normalized.startedAt)) ? null : Number(normalized.startedAt);
    normalized.runStartedAt = normalized.runStartedAt == null || !Number.isFinite(Number(normalized.runStartedAt)) ? null : Number(normalized.runStartedAt);
    normalized.elapsedMs = clampNumber(normalized.elapsedMs, 0, TIMER_TOTAL_MS, 0);
    normalized.pausedAt = normalized.pausedAt == null || !Number.isFinite(Number(normalized.pausedAt)) ? null : Number(normalized.pausedAt);
    normalized.expiredAt = normalized.expiredAt == null || !Number.isFinite(Number(normalized.expiredAt)) ? null : Number(normalized.expiredAt);
    normalized.notifiedMinutes = Array.from(new Set(
      (Array.isArray(normalized.notifiedMinutes) ? normalized.notifiedMinutes : [])
        .map(Number)
        .filter((minutes) => TIMER_MILESTONES.some((milestone) => milestone.minutes === minutes))
    )).sort((a, b) => a - b);
    if (normalized.status === "running" && !normalized.runStartedAt) {
      normalized.runStartedAt = Date.now();
    }
    if (normalized.status !== "running") normalized.runStartedAt = null;
    return normalized;
  }

  function normalizeSessionName(value) {
    const text = String(value || '').trim().toUpperCase();
    return /^S[1-9]\d*$/.test(text) ? text : '';
  }

  function migratePatternIds(rawIds) {
    const migrated = [];
    for (const rawId of (Array.isArray(rawIds) ? rawIds : []).map(String)) {
      if (rawId === "useful_result_min_losses" || rawId === "stable_visible_profit_base_now" || rawId === "stable_visible_profit_no_foundation_collapse") {
        migrated.push("course_time_management");
        continue;
      }
      if (rawId === "course_desired_connection" || rawId === "course_time_profit_no_foundation_collapse") {
        migrated.push("course_time_management");
        continue;
      }
      if (rawId === "targeted_stimuli_chemistry_only" || rawId === "value_left_after_attention") continue;
      migrated.push(rawId);
    }
    return Array.from(new Set(migrated));
  }

  function clampNumber(value, min, max, fallback) {
    const n = Number(value);
    if (!Number.isFinite(n)) return fallback;
    return Math.max(min, Math.min(max, n));
  }

  function localDate() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }

  function localTime() {
    const d = new Date();
    return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  }

  function id() {
    return `evt_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`;
  }

  function load(key, fallback) {
    try {
      if (typeof GM_getValue === "function") return GM_getValue(key, fallback);
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }

  function loadWithMigration(key, legacyKey, fallback) {
    const current = load(key, undefined);
    if (current !== undefined) return current;
    return load(legacyKey, fallback);
  }

  function loadSettings() {
    const current = load(KEY_SETTINGS, null);
    if (!current) return { ...DEFAULT_SETTINGS };
    return {
      ...DEFAULT_SETTINGS,
      ...current,
      hidden: false,
      scriptVersion: SETTINGS_VERSION
    };
  }

  function save(key, value) {
    try {
      if (typeof GM_setValue === "function") GM_setValue(key, value);
      else localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.warn("Planning Pattern Capture save failed", key, err);
    }
  }

  function saveAll() {
    save(KEY_SETTINGS, settings);
    save(KEY_ACTIVE, active);
    save(KEY_EVENTS, events);
  }

  function saveTimer() {
    timer = normalizeTimer(timer);
    save(KEY_TIMER, timer);
  }

  function readSharedJson(key, fallback) {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (err) {
      console.warn("Planning Pattern Capture shared read failed", key, err);
      return fallback;
    }
  }

  function writeSharedJson(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (err) {
      console.warn("Planning Pattern Capture shared write failed", key, err);
      return false;
    }
  }

  function emptyOutbox() {
    return { schema: OUTBOX_SCHEMA, updatedAt: null, days: {} };
  }

  function loadOutbox() {
    const value = readSharedJson(OUTBOX_KEY, emptyOutbox());
    if (!value || value.schema !== OUTBOX_SCHEMA || typeof value.days !== "object") return emptyOutbox();
    return value;
  }

  function currentSessionContext() {
    const context = readSharedJson(CONTEXT_KEY, null);
    return context && context.schema === "obs-session-context-v1" && context.available !== false ? context : null;
  }

  function pendingCountForDate(date) {
    const day = loadOutbox().days?.[date];
    return Array.isArray(day?.sessions)
      ? day.sessions.filter((session) => session.status !== "synced").length
      : 0;
  }

  function nextSessionName(value) {
    const match = String(value || "").match(/^(.*?)(\d+)$/);
    if (!match) return "S1";
    return `${match[1] || "S"}${Number(match[2]) + 1}`;
  }

  function expectedRepositorySession(context, outbox) {
    const day = outbox.days?.[active.date];
    const pending = Array.isArray(day?.sessions)
      ? day.sessions.filter((session) => session.status === "pending").length
      : 0;
    const last = Number(context?.lastSessionNumber || 0);
    return `S${last + pending + 1}`;
  }

  function alignActiveSessionWithContext() {
    if (active.sessionMode !== "auto") return;
    const context = currentSessionContext();
    if (!context || context.date !== active.date) return;
    const hasCurrentSessionEvents = currentDateEvents().some((event) => event.session === active.session);
    if (hasCurrentSessionEvents) return;
    const expected = expectedRepositorySession(context, loadOutbox());
    if (expected !== active.session) {
      active = normalizeActive({ ...active, session: expected });
      save(KEY_ACTIVE, active);
    }
  }

  function setCaptureDate(value, options = {}) {
    const normalized = normalizeDateValue(value);
    const input = options.input || null;

    if (!normalized) {
      if (input) {
        input.classList.add("ppc-session-input-invalid");
        input.setAttribute("aria-invalid", "true");
      }
      if (options.showAlert !== false) alert("Choose a valid Capture date.");
      return null;
    }

    active = normalizeActive({ ...active, date: normalized });

    if (active.sessionMode === "auto") {
      const context = currentSessionContext();
      if (context && context.date === active.date) {
        active = normalizeActive({
          ...active,
          session: expectedRepositorySession(context, loadOutbox()),
        });
      }
    }

    save(KEY_ACTIVE, active);

    if (input) {
      input.value = normalized;
      input.classList.remove("ppc-session-input-invalid");
      input.setAttribute("aria-invalid", "false");
    }

    if (options.refresh === true) refresh();
    return normalized;
  }

  function setManualSession(value, options = {}) {
    const normalized = normalizeSessionName(value);
    const input = options.input || null;
    const mode = options.mode || null;

    if (!normalized) {
      if (input) {
        input.classList.add('ppc-session-input-invalid');
        input.setAttribute('aria-invalid', 'true');
      }
      if (mode) mode.textContent = 'Invalid';
      if (options.showAlert !== false) alert('Session must use the format S1, S2, S3...');
      return null;
    }

    active = normalizeActive({ ...active, session: normalized, sessionMode: 'manual' });
    save(KEY_ACTIVE, active);

    if (input) {
      input.value = normalized;
      input.classList.remove('ppc-session-input-invalid');
      input.setAttribute('aria-invalid', 'false');
    }
    if (mode) mode.textContent = 'Manual';
    if (options.refresh === true) refresh();
    return normalized;
  }

  function captureDateForAction() {
    const input = root?.querySelector('.ppc-date-input');
    const normalized = normalizeDateValue(input?.value || active.date);

    if (!normalized) {
      alert('Choose a valid Capture date.');
      input?.focus();
      return null;
    }

    if (normalized !== active.date) {
      const committed = setCaptureDate(normalized, {
        input,
        showAlert: true,
        refresh: false,
      });
      if (!committed) return null;
    }

    return active.date;
  }

  function sessionNameForAction() {
    const input = root?.querySelector('.ppc-session-input');
    if (input?.getAttribute('aria-invalid') === 'true') {
      alert('Enter a valid session name in the format S1, S2, S3...');
      input.focus();
      return null;
    }

    const normalized = normalizeSessionName(active.session);
    if (!normalized) {
      alert('Enter a valid session name in the format S1, S2, S3...');
      input?.focus();
      return null;
    }
    return normalized;
  }

  function useAutoSession() {
    const context = currentSessionContext();
    if (!context || context.date !== active.date) {
      alert('Open the Planning Dashboard and press Refresh before enabling Auto session.');
      return;
    }
    active = normalizeActive({
      ...active,
      sessionMode: 'auto',
      session: expectedRepositorySession(context, loadOutbox())
    });
    save(KEY_ACTIVE, active);
    refresh();
  }

  function dispatchOutboxUpdated(detail) {
    try {
      window.dispatchEvent(new CustomEvent("obs-planning-outbox-updated", { detail }));
    } catch {}
  }

  function loadEventsFromStorage() {
    const latest = loadWithMigration(KEY_EVENTS, KEY_EVENTS_V1, []);
    return Array.isArray(latest) ? latest : [];
  }

  function appendEventToStorage(event) {
    const latest = loadEventsFromStorage();
    latest.push(event);
    events = latest;
    save(KEY_EVENTS, events);
    save(KEY_ACTIVE, active);
  }

  function syncFromStorage(showToast) {
    settings = normalizeSettings(loadWithMigration(KEY_SETTINGS, KEY_SETTINGS_V1, DEFAULT_SETTINGS));
    active = normalizeActive(loadWithMigration(KEY_ACTIVE, KEY_ACTIVE_V1, DEFAULT_ACTIVE));
    events = loadEventsFromStorage();
    timer = normalizeTimer(load(KEY_TIMER, emptyTimer()));
    processTimerMilestones();
    refresh();
    if (showToast) toast("Synced from storage");
  }

  function setupStorageListeners() {
    if (typeof GM_addValueChangeListener !== "function") return;
    GM_addValueChangeListener(KEY_EVENTS, function (_name, _oldValue, newValue, remote) {
      if (!remote) return;
      events = Array.isArray(newValue) ? newValue : [];
      refresh();
    });
    GM_addValueChangeListener(KEY_ACTIVE, function (_name, _oldValue, newValue, remote) {
      if (!remote) return;
      active = normalizeActive(newValue);
      refresh();
    });
    GM_addValueChangeListener(KEY_TIMER, function (_name, _oldValue, newValue, remote) {
      if (!remote) return;
      timer = normalizeTimer(newValue);
      processTimerMilestones();
      refresh();
    });
  }

  function timerElapsedMs(now = Date.now()) {
    const base = clampNumber(timer.elapsedMs, 0, TIMER_TOTAL_MS, 0);
    const running = timer.status === "running" && timer.runStartedAt
      ? Math.max(0, now - timer.runStartedAt)
      : 0;
    return Math.max(0, Math.min(TIMER_TOTAL_MS, base + running));
  }

  function formatTimerClock(ms) {
    const totalSeconds = Math.max(0, Math.ceil(Number(ms || 0) / 1000));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  function timerBelongsTo(date = active.date, session = active.session) {
    return timer.status !== "idle" && timer.date === date && timer.session === session;
  }

  function timerStatusLabel() {
    if (timer.status === "running") return "running";
    if (timer.status === "paused") return "paused";
    if (timer.status === "expired") return "time ended";
    return "idle";
  }

  function nextTimerMilestone() {
    const elapsed = timerElapsedMs();
    return TIMER_MILESTONES.find((milestone) => elapsed < milestone.minutes * 60 * 1000) || TIMER_MILESTONES[TIMER_MILESTONES.length - 1];
  }

  function startSessionTimer() {
    if (!captureDateForAction()) return;
    const sessionName = sessionNameForAction();
    if (!sessionName) return;

    if (timer.status === "running" || timer.status === "paused") {
      const owner = `${timer.date || "unknown"} ${timer.session || "session"}`;
      if (!confirm(`A timer is already ${timer.status} for ${owner}. Replace it and start ${active.date} ${sessionName}?`)) return;
    }

    const now = Date.now();
    timer = normalizeTimer({
      ...emptyTimer(),
      status: "running",
      date: active.date,
      session: sessionName,
      startedAt: now,
      runStartedAt: now,
    });
    saveTimer();
    primeTimerAudio();
    playTimerSound("start");
    refresh();
    toast(`Started ${sessionName} · checks at 10/20/30m`);
  }

  function pauseSessionTimer() {
    if (timer.status !== "running") return;
    const now = Date.now();
    timer = normalizeTimer({
      ...timer,
      status: "paused",
      elapsedMs: timerElapsedMs(now),
      runStartedAt: null,
      pausedAt: now,
    });
    saveTimer();
    refresh();
    toast(`Paused ${timer.session}`);
  }

  function resumeSessionTimer() {
    if (timer.status !== "paused") return;
    if (!timerBelongsTo()) {
      const owner = `${timer.date || "unknown"} ${timer.session || "session"}`;
      if (!confirm(`Resume timer for ${owner} while Capture is on ${active.date} ${active.session}?`)) return;
    }
    timer = normalizeTimer({
      ...timer,
      status: "running",
      runStartedAt: Date.now(),
      pausedAt: null,
    });
    saveTimer();
    primeTimerAudio();
    refresh();
    toast(`Resumed ${timer.session}`);
  }

  function adjustTimerRemaining(minutes) {
    if (timer.status === "idle") return;

    const remainingDeltaMs = Number(minutes) * 60 * 1000;
    if (!Number.isFinite(remainingDeltaMs) || remainingDeltaMs === 0) return;

    const now = Date.now();
    const currentElapsed = timerElapsedMs(now);
    const nextElapsed = Math.max(0, Math.min(TIMER_TOTAL_MS, currentElapsed - remainingDeltaMs));
    if (nextElapsed === currentElapsed) {
      toast(minutes > 0 ? "Timer is already at the start" : "Timer is already at 30:00");
      return;
    }

    let nextStatus = timer.status;
    if (timer.status === "expired" && nextElapsed < TIMER_TOTAL_MS) nextStatus = "running";

    timer = normalizeTimer({
      ...timer,
      status: nextStatus,
      elapsedMs: nextElapsed,
      runStartedAt: nextStatus === "running" ? now : null,
      pausedAt: nextStatus === "paused" ? (timer.pausedAt || now) : null,
      expiredAt: nextStatus === "expired" ? timer.expiredAt : null,
    });

    saveTimer();
    primeTimerAudio();
    const milestoneHandled = processTimerMilestones({ allowPaused: true });
    if (!milestoneHandled) refresh();
    toast(`${minutes > 0 ? "+" : "−"}${Math.abs(minutes)} min remaining · ${timer.session}`);
  }

  function stopSessionTimer(options = {}) {
    if (timer.status === "idle") return;
    if (options.confirm !== false && !confirm(`Stop and clear the timer for ${timer.date} ${timer.session}?`)) return;
    const stoppedSession = timer.session;
    timer = emptyTimer();
    saveTimer();
    refresh();
    if (options.toast !== false) toast(`Timer stopped${stoppedSession ? ` · ${stoppedSession}` : ""}`);
  }

  function restartSessionTimer() {
    if (timer.status === "running" || timer.status === "paused") {
      if (!confirm(`Restart the 30-minute timer for ${active.date} ${active.session}?`)) return;
    }
    timer = emptyTimer();
    saveTimer();
    startSessionTimer();
  }

  function dismissTimerNotice() {
    if (!timer.lastNotice) return;
    timer = normalizeTimer({ ...timer, lastNotice: null });
    saveTimer();
    refresh();
  }

  function toggleTimerSound() {
    settings.timerSoundEnabled = !settings.timerSoundEnabled;
    save(KEY_SETTINGS, settings);
    if (settings.timerSoundEnabled) {
      primeTimerAudio();
      playTimerSound("test");
      toast("Timer sound on");
    } else {
      toast("Timer sound off");
    }
    refresh();
  }

  function testTimerSound() {
    primeTimerAudio();
    playTimerSound("test");
    toast(settings.timerSoundEnabled ? "Timer sound test" : "Sound is off");
  }

  function primeTimerAudio() {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      if (!timerAudioContext) timerAudioContext = new AudioContextClass();
      if (timerAudioContext.state === "suspended") timerAudioContext.resume().catch(() => {});
    } catch (err) {
      console.warn("Planning Pattern Capture audio prime failed", err);
    }
  }

  function playTimerSound(kind) {
    if (!settings.timerSoundEnabled) return;
    primeTimerAudio();
    if (!timerAudioContext) return;

    const patterns = {
      start: [{ frequency: 520, duration: 0.08 }],
      test: [{ frequency: 660, duration: 0.10 }, { frequency: 820, duration: 0.12 }],
      10: [{ frequency: 660, duration: 0.12 }],
      20: [{ frequency: 660, duration: 0.10 }, { frequency: 660, duration: 0.10 }],
      30: [{ frequency: 880, duration: 0.16 }, { frequency: 660, duration: 0.16 }, { frequency: 880, duration: 0.22 }],
    };
    const sequence = patterns[kind] || patterns.test;

    Promise.resolve(timerAudioContext.resume()).then(() => {
      let cursor = timerAudioContext.currentTime + 0.02;
      for (const tone of sequence) {
        const oscillator = timerAudioContext.createOscillator();
        const gain = timerAudioContext.createGain();
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(tone.frequency, cursor);
        gain.gain.setValueAtTime(0.0001, cursor);
        gain.gain.exponentialRampToValueAtTime(Math.max(0.0001, settings.timerVolume * 0.24), cursor + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, cursor + tone.duration);
        oscillator.connect(gain);
        gain.connect(timerAudioContext.destination);
        oscillator.start(cursor);
        oscillator.stop(cursor + tone.duration + 0.02);
        cursor += tone.duration + 0.10;
      }
    }).catch((err) => console.warn("Planning Pattern Capture timer sound failed", err));
  }

  function revealCaptureForTimer() {
    panelHiddenForPage = false;
    settings.collapsed = false;
    save(KEY_SETTINGS, settings);
    try { window.focus(); } catch {}
    refresh();
  }

  function showTimerNotification(milestone) {
    const title = `${milestone.title} · ${timer.session || "session"}`;
    const text = milestone.text;
    const onClick = () => revealCaptureForTimer();

    try {
      if (typeof GM_notification === "function") {
        GM_notification({ title, text, timeout: 15000, onclick: onClick });
        return;
      }
    } catch (err) {
      console.warn("Planning Pattern Capture GM notification failed", err);
    }

    try {
      if ("Notification" in window && Notification.permission === "granted") {
        const notification = new Notification(title, { body: text });
        notification.onclick = onClick;
      }
    } catch (err) {
      console.warn("Planning Pattern Capture browser notification failed", err);
    }
  }

  function processTimerMilestones(options = {}) {
    const allowPaused = options.allowPaused === true;
    const processable = timer.status === "running" || (allowPaused && timer.status === "paused");
    if (!processable) return false;

    const elapsed = timerElapsedMs();
    const alreadyNotified = new Set(timer.notifiedMinutes);
    const due = TIMER_MILESTONES.filter((milestone) =>
      elapsed >= milestone.minutes * 60 * 1000 && !alreadyNotified.has(milestone.minutes)
    );
    const reachedEnd = elapsed >= TIMER_TOTAL_MS;
    const now = Date.now();

    if (!due.length) {
      if (!reachedEnd) return false;
      timer = normalizeTimer({
        ...timer,
        status: "expired",
        elapsedMs: TIMER_TOTAL_MS,
        runStartedAt: null,
        pausedAt: null,
        expiredAt: timer.expiredAt || now,
      });
      saveTimer();
      refresh();
      return true;
    }

    const latest = due[due.length - 1];
    timer = normalizeTimer({
      ...timer,
      status: reachedEnd ? "expired" : timer.status,
      elapsedMs: reachedEnd ? TIMER_TOTAL_MS : timer.elapsedMs,
      runStartedAt: reachedEnd ? null : timer.runStartedAt,
      pausedAt: reachedEnd ? null : timer.pausedAt,
      expiredAt: reachedEnd ? now : timer.expiredAt,
      notifiedMinutes: Array.from(new Set([...timer.notifiedMinutes, ...due.map((milestone) => milestone.minutes)])),
      lastNotice: { minutes: latest.minutes, at: new Date(now).toISOString(), text: latest.text },
    });
    saveTimer();
    playTimerSound(String(latest.minutes));
    showTimerNotification(latest);
    refresh();
    toast(`${latest.minutes}m · ${timer.session}`);
    return true;
  }

  function startTimerTicker() {
    if (timerTicker) clearInterval(timerTicker);
    timerTicker = setInterval(() => {
      processTimerMilestones();
      updateTimerUi();
    }, 500);
    processTimerMilestones();
  }

  function currentDateEvents() {
    if (!Array.isArray(events)) events = loadEventsFromStorage();
    return events.filter((e) => e.date === active.date);
  }

  function isDfAdjustment(e) {
    return e.kind === "df-score-adjustment" || e.kind === "dfkp-score-adjustment" || e.kind === "dfkp-marker";
  }

  function isDfDimension(dimension) {
    return dimension === "D" || dimension === "F";
  }

  function eventDelta(e) {
    if (typeof e.delta === "number") return e.delta;
    if (e.outcome === "+") return DF_STEP;
    if (e.outcome === "-") return -DF_STEP;
    return 0;
  }

  function addDfEvent(def) {
    const sessionName = sessionNameForAction();
    if (!sessionName) return;
    const event = {
      id: id(),
      createdAt: new Date().toISOString(),
      date: active.date,
      time: localTime(),
      session: sessionName,
      kind: "df-score-adjustment",
      dimension: def.dimension,
      delta: def.delta,
      outcome: def.delta > 0 ? "+" : "-",
      effect: def.effect,
      note: "",
    };
    appendEventToStorage(event);
    const nextScore = scoreForSession(sessionName);
    toast(`${def.dimension} ${fmtSigned(def.delta)} · Total ${fmt(nextScore.total)}`);
    refresh();
  }

  function addSupportEvent(def) {
    const sessionName = sessionNameForAction();
    if (!sessionName) return;
    const event = {
      id: id(),
      createdAt: new Date().toISOString(),
      date: active.date,
      time: localTime(),
      session: `after ${sessionName}`,
      kind: "support",
      supportType: def.supportType,
      fact: def.fact,
      effect: def.effect,
      note: "",
    };
    appendEventToStorage(event);
    toast(`Support: ${def.label}`);
    refresh();
  }

  function undoLast() {
    events = loadEventsFromStorage();
    const dateEvents = currentDateEvents();
    if (!dateEvents.length) return;
    const last = dateEvents[dateEvents.length - 1];
    events = events.filter((e) => e.id !== last.id);
    saveAll();
    refresh();
  }

  function clearDate() {
    if (!confirm(`Clear all Pattern Capture events for ${active.date}?`)) return;
    events = loadEventsFromStorage().filter((e) => e.date !== active.date);
    saveAll();
    refresh();
  }

  function resetPanelPosition() {
    settings = { ...DEFAULT_SETTINGS, collapsed: true };
    panelHiddenForPage = false;
    openPanelPosition = null;
    saveAll();
    refresh();
  }

  function scoreForSession(session) {
    const adj = { D: 0, F: 0 };
    for (const e of currentDateEvents()) {
      if (!isDfAdjustment(e) || e.session !== session || !isDfDimension(e.dimension)) continue;
      adj[e.dimension] += eventDelta(e);
    }
    const eligible = eligibleMaxScore();
    const baseDim = eligible.value / 2;
    const dims = {
      D: baseDim + adj.D,
      F: baseDim + adj.F,
    };
    const totalAdj = adj.D + adj.F;
    return { session, base: eligible.value, baseDim, eligibleMax: eligible.value, eligibleLabel: eligible.label, eligiblePatternId: eligible.patternId, adj, dims, totalAdj, total: dims.D + dims.F };
  }

  function eligibleMaxScore() {
    const selected = selectedPatternDefs();
    let best = { value: BASE_TOTAL_SCORE, label: "base 3.5", patternId: "base" };
    for (const p of selected) {
      if (p.penalty || typeof p.maxScore !== "number") continue;
      if (p.maxScore > best.value) best = { value: p.maxScore, label: p.maxLabel || `allows ${fmt(p.maxScore)}`, patternId: p.id };
    }
    return best;
  }

  function patternMaxText(patternDef) {
    if (!patternDef) return "";
    if (patternDef.penalty) return patternDef.maxLabel || "penalty";
    if (patternDef.maxLabel) return patternDef.maxLabel;
    if (typeof patternDef.maxScore === "number") return `allows ${fmt(patternDef.maxScore)}`;
    return "context";
  }

  function sessionNamesForExport() {
    const names = new Set([active.session]);
    for (const e of currentDateEvents()) {
      if (e.session && !String(e.session).startsWith("after ")) names.add(e.session);
    }
    return Array.from(names).sort(naturalSessionSort);
  }

  function naturalSessionSort(a, b) {
    const na = Number(String(a).replace(/\D/g, ""));
    const nb = Number(String(b).replace(/\D/g, ""));
    if (!Number.isNaN(na) && !Number.isNaN(nb) && na !== nb) return na - nb;
    return String(a).localeCompare(String(b));
  }

  function exportMarkdown() {
    const dayEvents = currentDateEvents();
    const dfEvents = dayEvents.filter((e) => isDfAdjustment(e) && isDfDimension(e.dimension));
    const supportEvents = dayEvents.filter((e) => e.kind === "support");
    const counts = countMetrics(dayEvents);
    const sessions = sessionNamesForExport();
    const selected = selectedPatternDefs();

    let md = "";
    md += `## Pattern Capture Export — ${active.date}\n\n`;
    md += `Source: Tampermonkey Pattern Capture v${SETTINGS_VERSION}\n\n`;
    md += `### Workflow Check Questions\n\nSource: ${WORKFLOW_SOURCE}\n\n`;
    for (const step of workflowSteps) {
      md += `#### ${step.mark} ${step.short}\n\n`;
      md += `${step.full}\n\n`;
      for (const q of step.questions) md += `- ${q}\n`;
      md += `\n`;
    }

    md += `### Selected Patterns\n\n`;
    if (!selected.length) {
      md += `none\n\n`;
    } else {
      for (const p of selected) md += `- ${safe(p.id)} — ${safe(p.full)}\n`;
      md += `\n`;
    }

    md += `### Session Score Drafts\n\n| Session | Base | D | F | Adj | Total |\n|---|---:|---:|---:|---:|---:|\n`;
    for (const session of sessions) {
      const s = scoreForSession(session);
      md += `| ${safe(session)} | ${fmt(s.base)} | ${fmt(s.dims.D)} | ${fmt(s.dims.F)} | ${fmtSigned(s.totalAdj)} | ${fmt(s.total)} |\n`;
    }

    md += `\n### D/F Score Adjustments\n\n| Time | Session | Dimension | Delta | Effect | Note |\n|---|---|---|---:|---|---|\n`;
    for (const e of dfEvents) {
      md += `| ${safe(e.time)} | ${safe(e.session)} | ${safe(e.dimension)} | ${fmtSigned(eventDelta(e))} | ${safe(e.effect)} | ${safe(e.note)} |\n`;
    }

    md += `\n### Support Facts\n\n| # | Time / After | Type | Fact | Effect on next work |\n|---|---|---|---|---|\n`;
    supportEvents.forEach((e, i) => {
      md += `| ${i + 1} | ${safe(e.session)} ${safe(e.time)} | ${safe(e.supportType)} | ${safe(e.fact)} | ${safe(e.effect)} |\n`;
    });

    md += `\n### Raw Counts\n\n| Metric | Count |\n|---|---:|\n`;
    md += `| D/F adjustments | ${counts.df} |\n| D+ | ${counts.dPlus} |\n| D- | ${counts.dMinus} |\n`;
    md += `| F+ | ${counts.fPlus} |\n| F- | ${counts.fMinus} |\n| Selected patterns | ${selected.length} |\n`;
    md += `| Support facts | ${counts.support} |\n| Legacy ignored K/P adjustments | ${counts.legacyKp} |\n`;

    copy(md);
    toast("Markdown copied");
  }

  function exportJson() {
    copy(JSON.stringify({
      exportedAt: new Date().toISOString(),
      date: active.date,
      active,
      workflowSource: WORKFLOW_SOURCE,
      workflowSteps,
      selectedPatterns: selectedPatternDefs().map((p) => ({ id: p.id, label: p.label, full: p.full, source: p.source || "" })),
      playbookSource: PLAYBOOK,
      scoreModel: { defaultBaseTotal: BASE_TOTAL_SCORE, selectedPatternBase: eligibleMaxScore(), dimensions: ["D", "F"], rule: "selected non-penalty pattern maxScore becomes current base; D/F buttons adjust around it" },
      sessionScoreDrafts: sessionNamesForExport().map(scoreForSession),
      events: currentDateEvents(),
    }, null, 2));
    toast("JSON copied");
  }

  function copyEndScore() {
    const sessionName = sessionNameForAction();
    if (!sessionName) return;
    const s = scoreForSession(sessionName);
    const text = [
      "конец",
      "Base",
      fmt(s.base),
      "✅D",
      `${fmt(s.dims.D)} (${fmtSigned(s.adj.D)})`,
      "⚡F",
      `${fmt(s.dims.F)} (${fmtSigned(s.adj.F)})`,
      "Adj",
      fmtSigned(s.totalAdj),
      "Total",
      fmt(s.total),
    ].join("\n");
    copy(text);
    toast("End score copied");
  }


  function finishSession() {
    if (!captureDateForAction()) return;
    const context = currentSessionContext();
    if (!context) {
      alert("Open the Planning Dashboard and press Refresh first. A repository/cache session context is required before Finish Session.");
      return;
    }
    if (context.date !== active.date) {
      alert(`Dashboard session date ${context.date || "unknown"} does not match Capture date ${active.date}. Set the Capture Date field to the Dashboard date.`);
      return;
    }
    if (!context.operationalPath || !context.operationalFileSha256) {
      alert("The dashboard context has no operational file path/hash. Refresh the dashboard while the operational day is available.");
      return;
    }

    const outbox = loadOutbox();
    const existingDay = outbox.days[active.date];
    const existingSessions = Array.isArray(existingDay?.sessions) ? existingDay.sessions : [];
    const conflicts = existingSessions.filter((session) => session.status === "conflict");
    if (conflicts.length) {
      alert(`${conflicts.length} local session(s) are in conflict. Resolve the guarded batch before finishing another session.`);
      return;
    }

    const activePending = existingSessions.filter((session) => session.status === "pending");
    if (
      existingDay &&
      activePending.length &&
      existingDay.source?.operationalFileSha256 &&
      existingDay.source.operationalFileSha256 !== context.operationalFileSha256
    ) {
      alert("The repository/cache source changed while pending sessions exist. Export or resolve the current pending batch before finishing another session.");
      return;
    }

    const sessionName = sessionNameForAction();
    if (!sessionName) return;

    const expectedRowNumber = Number(context.sessionRowCount || context.lastSessionNumber || 0) + activePending.length + 1;
    const duplicate = activePending.some((session) => normalizeSessionName(session.session) === sessionName);
    if (duplicate && !confirm(`${sessionName} already exists in the pending batch. Store another record with the same session label?`)) return;

    const s = scoreForSession(sessionName);
    const matchingTimerActive = timerBelongsTo(active.date, sessionName) && (timer.status === "running" || timer.status === "paused");
    const timerSummary = matchingTimerActive
      ? `\nTimer ${timer.status} at ${formatTimerClock(timerElapsedMs())}; it will stop after Finish.`
      : "";
    const summary = `${active.date} row #${expectedRowNumber} · ${sessionName}\nD ${fmt(s.dims.D)} / F ${fmt(s.dims.F)}\nPoints ${fmt(s.total)}${timerSummary}`;
    if (!confirm(`Finish and store this session locally?\n\n${summary}`)) return;

    const eventId = id();
    const capturedAt = new Date();
    const capturedAtIso = capturedAt.toISOString();
    const capturedLocalTime = `${String(capturedAt.getHours()).padStart(2, "0")}:${String(capturedAt.getMinutes()).padStart(2, "0")}`;
    const record = {
      eventId,
      createdAt: capturedAtIso,
      expectedRowNumber,
      session: sessionName,
      time: "",
      d: Number(fmt(s.dims.D)),
      f: Number(fmt(s.dims.F)),
      points: Number(fmt(s.total)),
      goals: "",
      progressSignal: "",
      result: "",
      status: "pending",
    };

    if (!existingDay || !activePending.length) {
      outbox.days[active.date] = {
        operationalPath: context.operationalPath,
        source: {
          snapshotSavedAt: context.snapshotSavedAt || null,
          operationalFileSha256: context.operationalFileSha256,
          lastSessionNumber: Number(context.lastSessionNumber || 0),
          sessionRowCount: Number(context.sessionRowCount || context.lastSessionNumber || 0),
          workPoints: Number(context.workPoints || 0),
        },
        sessions: [],
      };
    }

    outbox.days[active.date].sessions.push(record);
    outbox.updatedAt = capturedAtIso;
    if (!writeSharedJson(OUTBOX_KEY, outbox)) {
      alert("Could not write the shared session outbox. No session was finished.");
      return;
    }

    appendEventToStorage({
      id: id(),
      createdAt: capturedAtIso,
      date: active.date,
      time: capturedLocalTime,
      session: sessionName,
      kind: "session-finished-local",
      outboxEventId: eventId,
      d: record.d,
      f: record.f,
      points: record.points,
      note: "stored in obsPlanning:sessionOutbox:v1",
    });

    if (timerBelongsTo(active.date, sessionName)) {
      timer = emptyTimer();
      saveTimer();
    }

    active = normalizeActive({
      ...active,
      session: nextSessionName(sessionName),
      sessionMode: active.sessionMode,
      selectedPatternIds: [],
      shownPatternIds: [],
    });
    save(KEY_ACTIVE, active);
    dispatchOutboxUpdated({ date: active.date, eventId });
    toast(`Finished ${record.session} · ${fmt(record.points)} points · next ${active.session}`);
    refresh();
  }

  function countMetrics(list) {
    const df = list.filter((e) => isDfAdjustment(e) && isDfDimension(e.dimension));
    const legacyKp = list.filter((e) => isDfAdjustment(e) && (e.dimension === "K" || e.dimension === "P"));
    const countDim = (dimension, positive) => df.filter((e) => e.dimension === dimension && (positive ? eventDelta(e) > 0 : eventDelta(e) < 0)).length;
    return {
      df: df.length,
      dPlus: countDim("D", true),
      dMinus: countDim("D", false),
      fPlus: countDim("F", true),
      fMinus: countDim("F", false),
      support: list.filter((e) => e.kind === "support").length,
      legacyKp: legacyKp.length,
    };
  }

  function safe(value) {
    return String(value ?? "").replace(/\|/g, "\\|").replace(/\n/g, " ");
  }

  function safeHtml(value) {
    return String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function fmt(value) {
    const rounded = Math.round(Number(value) * 1000) / 1000;
    return rounded.toFixed(3).replace(/\.?0+$/, "");
  }

  function fmtSigned(value) {
    const n = Math.round(Number(value) * 1000) / 1000;
    if (Object.is(n, -0) || n === 0) return "0";
    return `${n > 0 ? "+" : ""}${fmt(n)}`;
  }

  function copy(text) {
    try {
      if (typeof GM_setClipboard === "function") GM_setClipboard(text);
      else navigator.clipboard.writeText(text);
    } catch {
      navigator.clipboard.writeText(text);
    }
  }

  function render() {
    const existing = document.getElementById("ppc-root");
    if (existing) existing.remove();
    root = document.createElement("div");
    root.id = "ppc-root";
    document.body.appendChild(root);
    refresh();
  }

  function refresh() {
    try {
      if (!root) return;
      const previousBody = root.querySelector(".ppc-body");
      const previousScrollTop = previousBody ? previousBody.scrollTop : null;
      if (resizeObserver) { resizeObserver.disconnect(); resizeObserver = null; }
      settings = normalizeSettings(settings);
      root.innerHTML = "";
      if (settings.collapsed) {
        root.style.left = "auto";
        root.style.top = "auto";
        root.style.right = `${CAPTURE_DOCK_RIGHT}px`;
        root.style.bottom = `${CAPTURE_DOCK_COLLAPSED_BOTTOM}px`;
      } else {
        openPanelPosition = clampOpenPanelPosition(openPanelPosition);
        root.style.right = "auto";
        root.style.bottom = "auto";
        root.style.left = `${openPanelPosition.x}px`;
        root.style.top = `${openPanelPosition.y}px`;
      }
      const hideLauncherForDashboard = dashboardOpen && settings.collapsed;
      root.style.display = panelHiddenForPage || hideLauncherForDashboard ? "none" : "block";
      if (panelHiddenForPage || hideLauncherForDashboard) return;
      if (settings.collapsed) {
        root.style.width = "170px";
        root.style.height = "auto";
        renderCollapsed();
        return;
      }
      root.style.width = "auto";
      root.style.height = "auto";
      renderExpanded();
      if (previousScrollTop !== null) {
        requestAnimationFrame(() => {
          const newBody = root.querySelector(".ppc-body");
          if (newBody) newBody.scrollTop = previousScrollTop;
        });
      }
    } catch (err) {
      console.error("Planning Pattern Capture render failed", err);
      showFallbackError(err);
    }
  }

  function showFallbackError(err) {
    if (!root) return;
    root.innerHTML = "";
    root.style.left = "20px";
    root.style.top = "20px";
    const box = document.createElement("div");
    box.className = "ppc-error";
    box.textContent = "PPC error: " + (err && err.message ? err.message : String(err));
    root.appendChild(box);
  }

  function renderCollapsed() {
    const el = document.createElement("div");
    el.className = "ppc-collapsed";
    el.textContent = collapsedCaptureLabel();
    el.title = "Open Capture · Alt+F1";
    el.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      openCapturePanel();
    });
    root.appendChild(el);
  }

  function renderExpanded() {
    const wrap = document.createElement("div");
    wrap.className = "ppc-panel";
    wrap.style.width = `${settings.width}px`;
    wrap.style.height = `${settings.height}px`;

    const header = document.createElement("div");
    header.className = "ppc-header";
    header.title = "Click to collapse. Drag to move.";

    const headerTitle = document.createElement("div");
    headerTitle.className = "ppc-header-title";
    headerTitle.textContent = `🧲 Capture (${currentDateEvents().length}) · pending ${pendingCountForDate(active.date)}`;

    const headerHint = document.createElement("div");
    headerHint.className = "ppc-header-hint";
    headerHint.textContent = "click collapse";

    const controls = document.createElement("div");
    controls.className = "ppc-header-controls";
    controls.append(
      button("−", "ppc-mini", closeCapturePanel),
      button("×", "ppc-mini", closeCapturePanel)
    );

    header.addEventListener("click", (e) => {
      if (e.target.closest(".ppc-header-controls")) return;
      if (didDragExpanded) { didDragExpanded = false; return; }
      e.preventDefault();
      e.stopPropagation();
      closeCapturePanel();
    });

    header.append(headerTitle, headerHint, controls);
    makeDraggable(header, false);

    const body = document.createElement("div");
    body.className = "ppc-body";
    body.appendChild(topActionBar());
    body.appendChild(sessionControlBox());
    body.appendChild(sessionTimerBox());
    body.appendChild(sectionTitle("Session Score"));
    body.appendChild(scoreBox(active.session));
    body.appendChild(sectionTitle("D/F Quick"));
    body.appendChild(dfGrid());
    body.appendChild(sectionTitle("Active Workflow"));
    body.appendChild(workflowBox());
    body.appendChild(sectionTitle("Fundamental"));
    body.appendChild(buttonGrid(fundamentalPatterns));
    body.appendChild(sectionTitle("Situational"));
    body.appendChild(buttonGrid(frequentPatterns));
    body.appendChild(patternDetailBox());
    body.appendChild(selectedBox());
    body.appendChild(sectionTitle("More Situational"));
    body.appendChild(situationalPicker());
    body.appendChild(sectionTitle("Support"));
    body.appendChild(supportGrid());

    const lastLine = document.createElement("div");
    lastLine.className = "ppc-last";
    lastLine.textContent = lastEventText();
    body.appendChild(lastLine);
    body.appendChild(recentList());

    wrap.append(header, body);
    root.appendChild(wrap);
    attachResizeObserver(wrap);
  }

  function topActionBar() {
    const bar = document.createElement("div");
    bar.className = "ppc-footer ppc-top-actions";
    bar.append(
      button("Undo", "ppc-action", undoLast),
      button("Copy MD", "ppc-action", exportMarkdown),
      button("Finish", "ppc-action ppc-finish", finishSession),
      button("Copy End", "ppc-action", copyEndScore),
      button("JSON", "ppc-action", exportJson),
      button("Sync", "ppc-action", () => syncFromStorage(true)),
      button("Reset UI", "ppc-action", resetPanelPosition),
      button("Clear date", "ppc-danger", clearDate)
    );
    return bar;
  }

  function sessionControlBox() {
    const box = document.createElement('div');
    box.className = 'ppc-session-control';

    const dateLabel = document.createElement('label');
    dateLabel.className = 'ppc-session-label';
    dateLabel.textContent = 'Date';

    const dateInput = document.createElement('input');
    dateInput.className = 'ppc-session-input ppc-date-input';
    dateInput.type = 'date';
    dateInput.value = active.date;
    dateInput.setAttribute('aria-label', 'Capture date');
    dateInput.setAttribute('aria-invalid', 'false');

    const commitDate = (showAlert) => {
      const committed = setCaptureDate(dateInput.value, {
        input: dateInput,
        showAlert,
        refresh: false,
      });
      if (committed) refresh();
    };

    dateInput.addEventListener('input', () => {
      setCaptureDate(dateInput.value, {
        input: dateInput,
        showAlert: false,
        refresh: false,
      });
    });
    dateInput.addEventListener('change', () => commitDate(true));
    dateInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        commitDate(true);
      }
    });

    const label = document.createElement('label');
    label.className = 'ppc-session-label';
    label.textContent = 'Session';

    const input = document.createElement('input');
    input.className = 'ppc-session-input';
    input.type = 'text';
    input.value = active.session;
    input.placeholder = 'S1';
    input.setAttribute('aria-label', 'Session name');
    input.setAttribute('aria-invalid', 'false');

    const mode = document.createElement('span');
    mode.className = 'ppc-session-mode';
    mode.textContent = active.sessionMode === 'auto' ? 'Auto' : 'Manual';

    input.addEventListener('input', () => {
      const upper = String(input.value || '').trim().toUpperCase();
      if (input.value !== upper) input.value = upper;
      setManualSession(input.value, {
        input,
        mode,
        showAlert: false,
        refresh: false,
      });
    });
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        const committed = setManualSession(input.value, {
          input,
          mode,
          showAlert: true,
          refresh: false,
        });
        if (committed) refresh();
      }
    });

    const auto = button('Auto', 'ppc-action', useAutoSession);
    box.append(dateLabel, dateInput, label, input, mode, auto);
    return box;
  }

  function collapsedCaptureLabel() {
    if (timer.status === "idle") return `🧲 Capture (${currentDateEvents().length})`;
    const next = nextTimerMilestone();
    const remaining = Math.max(0, next.minutes * 60 * 1000 - timerElapsedMs());
    const stateMark = timer.status === "paused" ? "⏸" : timer.status === "expired" ? "⏰" : "▶";
    return `${stateMark} ${timer.session || "Timer"} · ${formatTimerClock(remaining)}`;
  }

  function sessionTimerBox() {
    const box = document.createElement("div");
    box.className = "ppc-timer-box";
    populateSessionTimerBox(box);
    return box;
  }

  function populateSessionTimerBox(box) {
    if (!box) return;
    box.innerHTML = "";

    const elapsed = timerElapsedMs();
    const ownerSession = timer.status === "idle" ? active.session : timer.session;
    const ownerDate = timer.status === "idle" ? active.date : timer.date;

    const head = document.createElement("div");
    head.className = "ppc-timer-head";
    const title = document.createElement("div");
    title.className = "ppc-timer-title";
    title.textContent = `⏱ Session timer · ${ownerSession || "session"}`;
    const status = document.createElement("div");
    status.className = `ppc-timer-status ppc-timer-status-${timer.status}`;
    status.textContent = timerStatusLabel();
    head.append(title, status);

    const identity = document.createElement("div");
    identity.className = "ppc-timer-identity";
    identity.dataset.timerIdentity = "true";
    identity.textContent = `${ownerDate || active.date} · elapsed ${formatTimerClock(elapsed)} / 30:00`;

    if (timer.status !== "idle" && !timerBelongsTo()) {
      const mismatch = document.createElement("div");
      mismatch.className = "ppc-timer-mismatch";
      mismatch.textContent = `Timer belongs to ${timer.date} ${timer.session}; Capture is on ${active.date} ${active.session}.`;
      box.append(head, identity, mismatch);
    } else {
      box.append(head, identity);
    }

    const milestones = document.createElement("div");
    milestones.className = "ppc-timer-milestones";
    const notified = new Set(timer.notifiedMinutes);
    for (const milestone of TIMER_MILESTONES) {
      const row = document.createElement("div");
      row.className = "ppc-timer-milestone";
      const label = document.createElement("span");
      label.textContent = milestone.label;
      const value = document.createElement("strong");
      value.dataset.timerMinute = String(milestone.minutes);
      const thresholdMs = milestone.minutes * 60 * 1000;
      value.textContent = timer.status === "idle"
        ? formatTimerClock(thresholdMs)
        : notified.has(milestone.minutes)
          ? "✓"
          : formatTimerClock(Math.max(0, thresholdMs - elapsed));
      row.append(label, value);
      milestones.appendChild(row);
    }
    box.appendChild(milestones);

    if (timer.lastNotice) {
      const notice = document.createElement("div");
      notice.className = "ppc-timer-notice";
      const noticeText = document.createElement("div");
      noticeText.textContent = `${timer.lastNotice.minutes}m: ${timer.lastNotice.text}`;
      notice.append(noticeText, button("Dismiss", "ppc-mini", dismissTimerNotice));
      box.appendChild(notice);
    }

    const controls = document.createElement("div");
    controls.className = "ppc-timer-controls";
    if (timer.status === "idle") {
      controls.append(button(`▶ Start ${active.session} · 30m`, "ppc-action ppc-timer-start", startSessionTimer));
    } else if (timer.status === "running") {
      controls.append(
        button("⏸ Pause all", "ppc-action ppc-timer-pause", pauseSessionTimer),
        button("■ Stop", "ppc-danger", stopSessionTimer)
      );
    } else if (timer.status === "paused") {
      controls.append(
        button("▶ Resume all", "ppc-action ppc-timer-start", resumeSessionTimer),
        button("↻ Restart", "ppc-action", restartSessionTimer),
        button("■ Stop", "ppc-danger", stopSessionTimer)
      );
    } else {
      controls.append(
        button(`↻ Restart ${active.session}`, "ppc-action ppc-timer-start", restartSessionTimer),
        button("Clear", "ppc-danger", () => stopSessionTimer({ confirm: false }))
      );
    }
    if (timer.status !== "idle") {
      controls.append(
        button("−1 min", "ppc-action", () => adjustTimerRemaining(-1)),
        button("+1 min", "ppc-action", () => adjustTimerRemaining(1))
      );
    }
    controls.append(
      button(settings.timerSoundEnabled ? "🔊 Sound" : "🔇 Sound", "ppc-action", toggleTimerSound),
      button("Test", "ppc-action", testTimerSound)
    );
    box.appendChild(controls);
  }

  function updateTimerUi() {
    if (!root) return;

    const elapsed = timerElapsedMs();
    const ownerDate = timer.status === "idle" ? active.date : timer.date;
    const identity = root.querySelector('[data-timer-identity="true"]');
    if (identity) {
      identity.textContent = `${ownerDate || active.date} · elapsed ${formatTimerClock(elapsed)} / 30:00`;
    }

    const notified = new Set(timer.notifiedMinutes);
    for (const milestone of TIMER_MILESTONES) {
      const value = root.querySelector(`[data-timer-minute="${milestone.minutes}"]`);
      if (!value) continue;
      const thresholdMs = milestone.minutes * 60 * 1000;
      value.textContent = timer.status === "idle"
        ? formatTimerClock(thresholdMs)
        : notified.has(milestone.minutes)
          ? "✓"
          : formatTimerClock(Math.max(0, thresholdMs - elapsed));
    }

    const collapsed = root.querySelector(".ppc-collapsed");
    if (collapsed) collapsed.textContent = collapsedCaptureLabel();
  }

  function workflowBox() {
    const box = document.createElement("div");
    box.className = "ppc-workflow-box";

    const head = document.createElement("div");
    head.className = "ppc-workflow-head";

    const label = document.createElement("div");
    label.className = "ppc-workflow-label";
    label.textContent = "Flying Cage Workflow";

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "ppc-workflow-toggle";
    toggle.textContent = workflowPinned ? "hide" : "show";
    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      workflowPinned = !workflowPinned;
      setWorkflowExpanded(box, workflowPinned);
      toggle.textContent = workflowPinned ? "hide" : "show";
    });

    head.append(label, toggle);

    const line = document.createElement("div");
    line.className = "ppc-workflow-line";
    line.textContent = workflowSteps.map((s) => s.mark).join(" → ");

    const hint = document.createElement("div");
    hint.className = "ppc-workflow-hint";
    hint.textContent = "show: questions";

    const details = document.createElement("div");
    details.className = "ppc-workflow-details";
    for (const step of workflowSteps) {
      const stepEl = document.createElement("div");
      stepEl.className = "ppc-workflow-step";

      const title = document.createElement("div");
      title.className = "ppc-workflow-step-title";
      title.textContent = `${step.mark} ${step.short}`;
      stepEl.appendChild(title);

      const full = document.createElement("div");
      full.className = "ppc-workflow-step-full";
      full.textContent = step.full;
      stepEl.appendChild(full);

      for (const q of step.questions) {
        const question = document.createElement("div");
        question.className = "ppc-workflow-question";
        question.textContent = q;
        stepEl.appendChild(question);
      }

      details.appendChild(stepEl);
    }

    box.append(head, line, hint, details);
    setWorkflowExpanded(box, workflowPinned);
    return box;
  }

  function setWorkflowExpanded(box, expanded) {
    box.classList.toggle("ppc-workflow-expanded", Boolean(expanded));
  }

  function scoreBox(session) {
    const s = scoreForSession(session);
    const box = document.createElement("div");
    box.className = "ppc-score-box";
    box.innerHTML = `
      <div class="ppc-score-title">Session Score — ${safeHtml(session)}</div>
      <div class="ppc-score-line"><span>Pattern max</span><strong>${fmt(s.eligibleMax)} <em>${safeHtml(s.eligibleLabel)}</em></strong></div>
      <div class="ppc-score-line"><span>Base</span><strong>${fmt(s.base)}</strong></div>
      <div class="ppc-score-line"><span>✅D</span><strong>${fmt(s.dims.D)} <em>(${fmtSigned(s.adj.D)})</em></strong></div>
      <div class="ppc-score-line"><span>⚡F</span><strong>${fmt(s.dims.F)} <em>(${fmtSigned(s.adj.F)})</em></strong></div>
      <div class="ppc-score-total"><span>Adj</span><strong>${fmtSigned(s.totalAdj)}</strong></div>
      <div class="ppc-score-total"><span>Total</span><strong>${fmt(s.total)}</strong></div>`;
    return box;
  }

  function attachResizeObserver(panel) {
    if (resizeObserver) resizeObserver.disconnect();
    if (typeof ResizeObserver !== "function") return;
    resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry || settings.collapsed) return;
      const rect = entry.contentRect;
      clearTimeout(resizeSaveTimer);
      resizeSaveTimer = setTimeout(() => {
        settings.width = Math.round(rect.width);
        settings.height = Math.round(rect.height);
        save(KEY_SETTINGS, settings);
      }, 150);
    });
    resizeObserver.observe(panel);
  }

  function sectionTitle(text) {
    const div = document.createElement("div");
    div.className = "ppc-section";
    div.textContent = text;
    return div;
  }

  function dfGrid() {
    const grid = document.createElement("div");
    grid.className = "ppc-df-grid";
    for (const d of dfButtons) {
      const b = button(d.label, d.delta > 0 ? "ppc-df-plus" : "ppc-df-minus", () => addDfEvent(d));
      b.title = `${d.dimension} ${fmtSigned(d.delta)} = ${d.effect}`;
      grid.appendChild(b);
    }
    return grid;
  }

  function buttonGrid(patterns) {
    const grid = document.createElement("div");
    grid.className = "ppc-grid";
    for (const p of patterns) {
      const wrap = document.createElement("div");
      wrap.className = "ppc-pattern-wrap";

      const label = p.maxScore ? `${p.label}` : p.label;
      const b = button(label, "ppc-pattern ppc-pattern-main", () => togglePatternSelection(p));
      b.title = patternDetailPlainText(p);
      if (isPatternSelected(p.id)) b.classList.add("ppc-selected");

      const show = button(isPatternShown(p.id) ? "hide" : "show", "ppc-pattern-show", () => togglePatternDetails(p));
      show.title = `Show/hide details for ${p.full}`;
      if (isPatternShown(p.id)) show.classList.add("ppc-pattern-show-on");

      wrap.append(b, show);
      grid.appendChild(wrap);
    }
    return grid;
  }

  function patternDetailPlainText(patternDef) {
    if (!patternDef) return "";
    const lines = [patternDef.full, patternMaxText(patternDef)];
    if (Array.isArray(patternDef.details)) lines.push(...patternDef.details);
    if (patternDef.source) lines.push(patternDef.source);
    return lines.filter(Boolean).join("\n");
  }

  function patternDetailBox() {
    const box = document.createElement("div");
    box.id = "ppc-pattern-detail";
    box.className = "ppc-pattern-detail-box";
    renderShownPatternDetailsInto(box);
    return box;
  }

  function renderShownPatternDetailsInto(box) {
    if (!box) return;
    const shown = shownPatternDefs();
    if (!shown.length) {
      box.innerHTML = `<div class="ppc-pattern-detail-empty">Pattern details: press <strong>show</strong> on one or several patterns.</div>`;
      return;
    }
    box.innerHTML = shown.map((patternDef) => renderPatternDetailsHtml(patternDef)).join("");
  }

  function renderPatternDetailsHtml(patternDef) {
    const details = Array.isArray(patternDef.details) ? patternDef.details : [];
    return `
      <div class="ppc-pattern-detail-card">
        <div class="ppc-pattern-detail-title">${safeHtml(patternDef.full)}</div>
        <div class="ppc-pattern-detail-max">${safeHtml(patternMaxText(patternDef))}</div>
        ${details.map((line) => `<div class="ppc-pattern-detail-line">${safeHtml(line)}</div>`).join("")}
      </div>
    `;
  }

  function allPatternDefs() {
    return [...fundamentalPatterns, ...frequentPatterns, ...situationalPatterns];
  }

  function isPatternSelected(patternId) {
    return Array.isArray(active.selectedPatternIds) && active.selectedPatternIds.includes(patternId);
  }

  function isPatternShown(patternId) {
    return Array.isArray(active.shownPatternIds) && active.shownPatternIds.includes(patternId);
  }

  function selectedPatternDefs() {
    const ids = Array.isArray(active.selectedPatternIds) ? active.selectedPatternIds : [];
    const defs = allPatternDefs();
    return ids.map((pid) => defs.find((p) => p.id === pid)).filter(Boolean);
  }

  function shownPatternDefs() {
    const ids = Array.isArray(active.shownPatternIds) ? active.shownPatternIds : [];
    const defs = allPatternDefs();
    return ids.map((pid) => defs.find((p) => p.id === pid)).filter(Boolean);
  }

  function togglePatternDetails(patternDef) {
    active = normalizeActive(active);
    const ids = new Set(active.shownPatternIds || []);
    if (ids.has(patternDef.id)) ids.delete(patternDef.id);
    else ids.add(patternDef.id);
    active.shownPatternIds = Array.from(ids);
    save(KEY_ACTIVE, active);
    toast(`${ids.has(patternDef.id) ? "Showing" : "Hidden"} ${patternDef.label}`);
    refresh();
  }

  function togglePatternSelection(patternDef) {
    active = normalizeActive(active);
    const ids = new Set(active.selectedPatternIds || []);
    if (ids.has(patternDef.id)) ids.delete(patternDef.id);
    else ids.add(patternDef.id);
    active.selectedPatternIds = Array.from(ids);
    save(KEY_ACTIVE, active);
    const eligible = eligibleMaxScore();
    toast(`${ids.has(patternDef.id) ? "Selected" : "Unselected"} ${patternDef.label} · Base ${fmt(eligible.value)}`);
    refresh();
  }

  function situationalPicker() {
    const row = document.createElement("div");
    row.className = "ppc-situational-row";

    const select = document.createElement("select");
    select.className = "ppc-select";
    for (const p of situationalPatterns) {
      const opt = document.createElement("option");
      opt.value = p.id;
      opt.textContent = `${p.label} ${p.full.replace(p.label, "").trim()}`;
      select.appendChild(opt);
    }

    const toggle = button("Toggle", "ppc-action", () => {
      const p = situationalPatterns.find((x) => x.id === select.value);
      if (p) togglePatternSelection(p);
    });

    const show = button("Show", "ppc-action ppc-situational-show", () => {
      const p = situationalPatterns.find((x) => x.id === select.value);
      if (p) togglePatternDetails(p);
    });

    function updateShowButton() {
      const p = situationalPatterns.find((x) => x.id === select.value);
      show.textContent = p && isPatternShown(p.id) ? "Hide" : "Show";
    }
    select.addEventListener("change", updateShowButton);
    updateShowButton();

    row.append(select, toggle, show);
    return row;
  }

  function selectedBox() {
    const wrap = document.createElement("div");
    wrap.className = "ppc-selected-box";
    const selected = selectedPatternDefs();
    const eligible = eligibleMaxScore();
    const maxLine = document.createElement("div");
    maxLine.className = "ppc-selected-max";
    maxLine.textContent = `Current pattern base score: ${fmt(eligible.value)} (${eligible.label})`;
    wrap.appendChild(maxLine);
    if (!selected.length) {
      const empty = document.createElement("div");
      empty.textContent = "Selected patterns: none";
      wrap.appendChild(empty);
      return wrap;
    }
    const title = document.createElement("div");
    title.className = "ppc-selected-title";
    title.textContent = "Selected patterns";
    wrap.appendChild(title);
    for (const p of selected) {
      const line = document.createElement("div");
      line.className = "ppc-selected-line";
      line.textContent = `${p.full} — ${patternMaxText(p)}`;
      line.addEventListener("mouseenter", () => showPatternDetails(p));
      wrap.appendChild(line);
    }
    return wrap;
  }

  function supportGrid() {
    const grid = document.createElement("div");
    grid.className = "ppc-grid";
    for (const s of supportButtons) {
      const b = button(s.label, "ppc-support", () => addSupportEvent(s));
      b.title = `${s.supportType}: ${s.fact} → ${s.effect}`;
      grid.appendChild(b);
    }
    return grid;
  }

  function recentList() {
    const div = document.createElement("div");
    div.className = "ppc-recent";
    const recent = currentDateEvents().slice(-10).reverse();
    if (!recent.length) {
      div.textContent = "No events yet";
      return div;
    }
    for (const e of recent) {
      const line = document.createElement("div");
      line.className = "ppc-recent-line";
      if (isDfAdjustment(e) && isDfDimension(e.dimension)) line.textContent = `${e.time} ${e.session} ${e.dimension} ${fmtSigned(eventDelta(e))}`;
      else if (isDfAdjustment(e)) line.textContent = `${e.time} legacy ${e.dimension} ignored`;
      else if (e.kind === "support") line.textContent = `${e.time} ${e.session} ${e.supportType} ${e.fact}`;
      else line.textContent = `${e.time || ""} ${e.kind || "event"}`;
      div.appendChild(line);
    }
    return div;
  }

  function lastEventText() {
    const dayEvents = currentDateEvents();
    if (!dayEvents.length) return "Last: none";
    const e = dayEvents[dayEvents.length - 1];
    if (isDfAdjustment(e) && isDfDimension(e.dimension)) return `Last: ${e.time} ${e.session} ${e.dimension} ${fmtSigned(eventDelta(e))}`;
    if (isDfAdjustment(e)) return `Last: legacy ${e.dimension} ignored`;
    if (e.kind === "support") return `Last: ${e.time} ${e.supportType} ${e.fact}`;
    return `Last: ${e.time || ""} ${e.kind || "event"}`;
  }

  function button(text, cls, onClick) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = cls;
    b.textContent = text;
    b.addEventListener("click", (e) => { e.stopPropagation(); onClick(); });
    return b;
  }

  function makeDraggable(handle, isCollapsed) {
    let startX = 0, startY = 0, originX = 0, originY = 0, nextX = 0, nextY = 0;
    let dragging = false, moved = false, rafId = null;
    handle.addEventListener("mousedown", (e) => {
      if (e.button !== 0 || isCollapsed) return;
      const rect = root.getBoundingClientRect();
      dragging = true;
      moved = false;
      startX = e.clientX;
      startY = e.clientY;
      originX = Math.round(rect.left);
      originY = Math.round(rect.top);
      nextX = originX;
      nextY = originY;
      openPanelPosition = { x: originX, y: originY };
      root.style.willChange = "transform";
      root.style.left = `${originX}px`;
      root.style.top = `${originY}px`;
      root.style.transform = "translate3d(0, 0, 0)";
      document.addEventListener("mousemove", onMove, { passive: true });
      document.addEventListener("mouseup", onUp, { once: true });
      e.preventDefault();
    });
    function onMove(e) {
      if (!dragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      if (Math.abs(dx) + Math.abs(dy) > 3) moved = true;
      const maxX = Math.max(CAPTURE_VIEWPORT_MARGIN, window.innerWidth - settings.width - CAPTURE_VIEWPORT_MARGIN);
      const maxY = Math.max(CAPTURE_VIEWPORT_MARGIN, window.innerHeight - settings.height - CAPTURE_VIEWPORT_MARGIN);
      nextX = Math.min(Math.max(CAPTURE_VIEWPORT_MARGIN, originX + dx), maxX);
      nextY = Math.min(Math.max(CAPTURE_VIEWPORT_MARGIN, originY + dy), maxY);
      if (rafId === null) rafId = requestAnimationFrame(applyDragTransform);
    }
    function applyDragTransform() {
      rafId = null;
      if (!dragging) return;
      root.style.transform = `translate3d(${nextX - originX}px, ${nextY - originY}px, 0)`;
    }
    function onUp() {
      dragging = false;
      if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
      openPanelPosition = { x: nextX, y: nextY };
      root.style.left = `${nextX}px`;
      root.style.top = `${nextY}px`;
      root.style.transform = "";
      root.style.willChange = "";
      if (moved) {
        didDragExpanded = true;
        setTimeout(() => { didDragExpanded = false; }, 0);
      }
      document.removeEventListener("mousemove", onMove);
    }
  }

  function toast(text) {
    const div = document.createElement("div");
    div.className = "ppc-toast";
    div.textContent = text;
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 1200);
  }

  function injectStyles() {
    if (document.getElementById("ppc-style")) return;
    const style = document.createElement("style");
    style.id = "ppc-style";
    style.textContent = `
      #ppc-root { position: fixed; z-index: 2147483647; font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; font-size: 13px; color: #f5f5f5; }
      #ppc-root * { box-sizing: border-box; }
      .ppc-session-control { display: grid; grid-template-columns: auto minmax(80px, 1fr) auto auto; align-items: center; gap: 6px; padding: 8px; margin-bottom: 8px; border: 1px solid rgba(255,255,255,0.14); border-radius: 8px; background: rgba(255,255,255,0.04); }
      .ppc-session-label { color: #cbd5e1; font-size: 11px; font-weight: 700; }
      .ppc-session-input { min-width: 0; width: 100%; padding: 5px 7px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.2); background: #0b1220; color: #f8fafc; font: 600 12px/1.2 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
      .ppc-session-input-invalid { border-color: #f87171; box-shadow: 0 0 0 1px rgba(248,113,113,.35); }
      .ppc-date-input { grid-column: 2 / 5; color-scheme: dark; }
      .ppc-session-mode { color: #93c5fd; font-size: 10px; }
      .ppc-timer-box { margin-bottom: 8px; padding: 8px; border: 1px solid rgba(96,165,250,0.30); border-radius: 9px; background: rgba(30,64,175,0.10); }
      .ppc-timer-head { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
      .ppc-timer-title { font-weight: 900; color: #dbeafe; }
      .ppc-timer-status { padding: 2px 7px; border-radius: 999px; font-size: 10px; font-weight: 800; text-transform: uppercase; }
      .ppc-timer-status-idle { background: rgba(148,163,184,0.18); color: #cbd5e1; }
      .ppc-timer-status-running { background: rgba(34,197,94,0.18); color: #86efac; }
      .ppc-timer-status-paused { background: rgba(250,204,21,0.18); color: #fde047; }
      .ppc-timer-status-expired { background: rgba(239,68,68,0.20); color: #fca5a5; }
      .ppc-timer-identity { margin-top: 4px; color: #bfdbfe; font: 600 11px/1.3 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
      .ppc-timer-mismatch { margin-top: 6px; padding: 5px 7px; border-radius: 7px; background: rgba(245,158,11,0.15); color: #fcd34d; font-size: 11px; }
      .ppc-timer-milestones { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 5px; margin-top: 8px; }
      .ppc-timer-milestone { display: flex; flex-direction: column; gap: 2px; min-width: 0; padding: 6px; border-radius: 7px; background: rgba(255,255,255,0.055); color: #cbd5e1; font-size: 10px; text-align: center; }
      .ppc-timer-milestone strong { color: #f8fafc; font: 800 14px/1.2 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
      .ppc-timer-controls { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 8px; }
      .ppc-timer-start { background: #14532d; color: #dcfce7; border-color: #22c55e; font-weight: 800; }
      .ppc-timer-pause { background: #713f12; color: #fef3c7; border-color: #f59e0b; font-weight: 800; }
      .ppc-timer-notice { display: flex; justify-content: space-between; align-items: center; gap: 8px; margin-top: 8px; padding: 7px; border: 1px solid rgba(248,113,113,0.38); border-radius: 8px; background: rgba(127,29,29,0.35); color: #fee2e2; font-size: 11px; line-height: 1.35; }
      .ppc-collapsed { background: #1f2937; border: 1px solid rgba(255,255,255,0.25); border-radius: 8px; padding: 8px 10px; cursor: pointer; user-select: none; box-shadow: 0 8px 24px rgba(0,0,0,0.25); text-align: center; white-space: nowrap; }
      .ppc-collapsed::after { content: "  Alt+F1"; opacity: 0.45; font-size: 10px; }
      .ppc-panel { background: #111827; border: 1px solid rgba(255,255,255,0.22); border-radius: 12px; overflow: hidden; box-shadow: 0 16px 40px rgba(0,0,0,0.35); max-width: calc(100vw - 12px); max-height: calc(100vh - 12px); min-width: 280px; min-height: 260px; display: flex; flex-direction: column; position: relative; resize: both; }
      .ppc-panel::after { content: ""; position: absolute; right: 5px; bottom: 5px; width: 12px; height: 12px; border-right: 2px solid rgba(255,255,255,0.35); border-bottom: 2px solid rgba(255,255,255,0.35); pointer-events: none; }
      .ppc-header { display: grid; grid-template-columns: minmax(0, 1fr) auto auto; align-items: center; gap: 8px; background: #1f2937; padding: 7px 8px; cursor: move; user-select: none; font-weight: 700; flex: 0 0 auto; min-width: 0; }
      .ppc-header-title { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .ppc-header-hint { opacity: 0.45; font-size: 10px; font-weight: 600; white-space: nowrap; }
      .ppc-header-controls { display: flex; gap: 4px; flex: 0 0 auto; }
      .ppc-body { padding: 10px; overflow-y: auto; flex: 1 1 auto; min-height: 0; scrollbar-width: thin; padding-bottom: 18px; }
      .ppc-body::-webkit-scrollbar, .ppc-recent::-webkit-scrollbar { width: 8px; }
      .ppc-body::-webkit-scrollbar-thumb, .ppc-recent::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.25); border-radius: 999px; }
      .ppc-body::-webkit-scrollbar-track, .ppc-recent::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); }
      .ppc-section { margin-top: 10px; margin-bottom: 5px; color: #cbd5e1; font-weight: 700; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; }
      .ppc-score-box, .ppc-workflow-box { background: rgba(255,255,255,0.055); border: 1px solid rgba(255,255,255,0.10); border-radius: 9px; padding: 8px; }
      .ppc-score-title, .ppc-workflow-label { font-weight: 800; color: #e5e7eb; }
      .ppc-workflow-head { display: flex; justify-content: space-between; align-items: center; gap: 8px; margin-bottom: 6px; }
      .ppc-workflow-toggle { border: 1px solid rgba(255,255,255,0.18); border-radius: 7px; background: #1e293b; color: #f5f5f5; padding: 2px 7px; cursor: pointer; font-size: 11px; }
      .ppc-workflow-line { font-size: 13px; line-height: 1.35; word-break: break-word; }
      .ppc-workflow-hint { margin-top: 5px; font-size: 10px; color: #cbd5e1; opacity: 0.65; }
      .ppc-workflow-details { display: none; margin-top: 8px; border-top: 1px solid rgba(255,255,255,0.10); padding-top: 7px; }
      .ppc-workflow-expanded .ppc-workflow-details { display: block; }
      .ppc-workflow-step { padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.06); }
      .ppc-workflow-step:last-child { border-bottom: none; }
      .ppc-workflow-step-title { font-weight: 800; color: #e5e7eb; }
      .ppc-workflow-step-full { font-size: 11px; color: #cbd5e1; opacity: 0.85; margin-top: 2px; }
      .ppc-workflow-question { font-size: 11px; line-height: 1.35; margin-top: 4px; color: #f3f4f6; }
      .ppc-score-line, .ppc-score-total { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 2px 0; font-size: 12px; }
      .ppc-score-line em { color: #cbd5e1; opacity: 0.8; font-style: normal; font-weight: 600; }
      .ppc-score-total { border-top: 1px solid rgba(255,255,255,0.09); margin-top: 4px; padding-top: 5px; font-weight: 800; }
      .ppc-grid, .ppc-df-grid { display: flex; flex-wrap: wrap; gap: 5px; }
      .ppc-pattern, .ppc-pattern-show, .ppc-support, .ppc-action, .ppc-danger, .ppc-mini, .ppc-df-plus, .ppc-df-minus { border: 1px solid rgba(255,255,255,0.18); border-radius: 7px; background: #243044; color: #f5f5f5; padding: 5px 7px; cursor: pointer; font-size: 12px; }
      .ppc-pattern:hover, .ppc-pattern-show:hover, .ppc-support:hover, .ppc-action:hover, .ppc-mini:hover, .ppc-df-plus:hover, .ppc-df-minus:hover, .ppc-workflow-toggle:hover { background: #334155; }
      .ppc-df-plus { background: #173323; font-weight: 800; }
      .ppc-df-minus { background: #3a1d1d; font-weight: 800; }
      .ppc-pattern-wrap { display: inline-flex; align-items: stretch; gap: 3px; }
      .ppc-pattern-main { border-top-right-radius: 4px; border-bottom-right-radius: 4px; }
      .ppc-pattern-show { background: #172033; padding-left: 6px; padding-right: 6px; font-size: 10px; border-top-left-radius: 4px; border-bottom-left-radius: 4px; opacity: 0.9; }
      .ppc-pattern-show-on { background: #1d4ed8; font-weight: 900; opacity: 1; }
      .ppc-selected { outline: 2px solid #93c5fd; }
      .ppc-select { width: 100%; min-width: 0; background: #0b1220; border: 1px solid rgba(255,255,255,0.18); color: #f5f5f5; border-radius: 7px; padding: 6px 7px; }
      .ppc-situational-row { display: grid; grid-template-columns: minmax(0, 1fr) auto auto; gap: 6px; align-items: center; }
      .ppc-selected-box { margin-top: 8px; padding: 7px; border-radius: 8px; background: rgba(255,255,255,0.06); color: #e5e7eb; line-height: 1.3; }
      .ppc-selected-title { font-weight: 800; margin-bottom: 4px; }
      .ppc-selected-line { font-size: 12px; padding: 2px 0; border-bottom: 1px solid rgba(255,255,255,0.05); cursor: help; }
      .ppc-selected-max { font-weight: 800; color: #f8fafc; margin-bottom: 6px; }
      .ppc-pattern-detail-box { margin-top: 8px; padding: 8px; border-radius: 9px; background: rgba(147,197,253,0.08); border: 1px solid rgba(147,197,253,0.24); color: #e5e7eb; }
      .ppc-pattern-detail-card { padding: 7px 0; border-bottom: 1px solid rgba(147,197,253,0.18); }
      .ppc-pattern-detail-card:first-child { padding-top: 0; }
      .ppc-pattern-detail-card:last-child { border-bottom: none; padding-bottom: 0; }
      .ppc-pattern-detail-empty { font-size: 11px; color: #cbd5e1; opacity: 0.9; }
      .ppc-pattern-detail-title { font-weight: 900; margin-bottom: 3px; }
      .ppc-pattern-detail-max { display: inline-block; margin: 2px 0 5px; padding: 2px 6px; border-radius: 999px; background: rgba(255,255,255,0.08); color: #bfdbfe; font-size: 11px; font-weight: 800; }
      .ppc-pattern-detail-line { font-size: 11px; line-height: 1.35; margin-top: 4px; }
      .ppc-last { margin-top: 10px; color: #d1d5db; background: rgba(255,255,255,0.05); padding: 6px; border-radius: 7px; }
      .ppc-recent { margin-top: 8px; max-height: 120px; overflow: auto; background: rgba(0,0,0,0.16); border-radius: 7px; padding: 6px; scrollbar-width: thin; }
      .ppc-recent-line { color: #e5e7eb; font-size: 12px; padding: 2px 0; border-bottom: 1px solid rgba(255,255,255,0.06); }
      .ppc-footer { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; }
      .ppc-top-actions { margin-top: 0; margin-bottom: 10px; padding: 6px; background: rgba(255,255,255,0.045); border: 1px solid rgba(255,255,255,0.08); border-radius: 9px; }
      .ppc-action { background: #1e293b; }
      .ppc-finish { background: #166534; color: #dcfce7; border-color: #22c55e; font-weight: 800; }
      .ppc-finish:hover { background: #15803d; }
      .ppc-danger { background: #4c1d1d; }
      .ppc-danger:hover { background: #7f1d1d; }
      .ppc-mini { padding: 2px 7px; min-width: 24px; line-height: 1.2; }
      .ppc-toast, .ppc-error { position: fixed; right: 20px; bottom: 20px; z-index: 2147483647; background: #111827; color: #fff; border: 1px solid rgba(255,255,255,0.25); border-radius: 10px; padding: 10px 14px; box-shadow: 0 10px 30px rgba(0,0,0,0.35); font-family: system-ui, sans-serif; }
      .ppc-error { left: 20px; right: auto; bottom: auto; top: 20px; background: #4c1d1d; }
    `;
    document.head.appendChild(style);
  }
})();
