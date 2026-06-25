// ==UserScript==
// @name         OBS Local Planning Dashboard Viewer
// @namespace    https://github.com/AlexPastukhh/obs/planning-dashboard
// @version      0.8.2
// @description  Local-first planning dashboard with normalized exclusive session-or-time planning, pending-session score, and Goal Maps.
// @author       OBS planning-system
// @match        https://chatgpt.com/*
// @match        https://chat.openai.com/*
// @run-at       document-idle
// @grant        GM_xmlhttpRequest
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_setClipboard
// @grant        GM_addStyle
// @connect      127.0.0.1
// @connect      localhost
// ==/UserScript==

(function () {
  'use strict';

  const DEFAULT_BASE_URL = 'http://127.0.0.1:8765/';
  const DEFAULT_INDEX_PATH = 'planning/dashboard/index.md';
  const OPTIONAL_EMPTY_VALUES = new Set(['', '-', 'none', 'null', 'not provided', 'n/a']);
  const OUTBOX_KEY = 'obsPlanning:sessionOutbox:v1';
  const CONTEXT_KEY = 'obsPlanning:sessionContext:v1';
  const LOCAL_PLAN_KEY = 'obsPlanning:localDayPlan:v1';
  const LOCAL_PLAN_SCHEMA = 'obs-local-day-plan-v1';
  let localPlanningAssignmentMigrationDone = false;
  let localPlanningAssignmentMigrationFallback = null;
  const CACHE_DB_NAME = 'obsPlanningCache';
  const CACHE_DB_VERSION = 1;
  const CACHE_STORE = 'snapshots';
  const CACHE_KEY = 'dashboard:v1';

  const state = {
    baseUrl: GM_getValue('obsPlanningDashboard.baseUrl', DEFAULT_BASE_URL),
    indexPath: normalizeIndexPathSetting(GM_getValue('obsPlanningDashboard.indexPath', DEFAULT_INDEX_PATH)),
    indexText: '',
    files: {},
    groups: {},
    activeTab: 'day',
    daySubtab: 'plan',
    rawMode: false,
    settingsOpen: false,
    toolsOpen: false,
    planCoreOpen: true,
    currentTargetOpen: true,
    scopeUnitsOpen: false,
    acceptanceCriteriaOpen: false,
    expandedScenarios: {},
    activeLocalGoalMapId: null,
    dayScrollTops: {
      plan: 0,
      sessions: 0,
      summary: 0
    },
    loading: false,
    sourceMode: 'none',
    snapshotSavedAt: null,
    lastLoadError: null
  };

  GM_addStyle(`
    #obs-planning-dashboard-btn,
    #obs-planning-dashboard-panel,
    #obs-planning-dashboard-panel * {
      box-sizing: border-box;
    }

    #obs-planning-dashboard-btn {
      position: fixed;
      right: 18px;
      bottom: 90px;
      z-index: 2147483647;
      border: 1px solid rgba(148, 163, 184, .38);
      border-radius: 999px;
      padding: 9px 14px;
      background: #111827;
      color: #f8fafc;
      font: 600 13px/1.2 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      cursor: pointer;
      box-shadow: 0 8px 24px rgba(0, 0, 0, .32);
    }

    #obs-planning-dashboard-panel {
      position: fixed;
      inset: 18px;
      z-index: 2147483647;
      display: none;
      flex-direction: column;
      min-width: 320px;
      background: #08111f;
      color: #e5edf8;
      border: 1px solid rgba(148, 163, 184, .32);
      border-radius: 16px;
      box-shadow: 0 24px 80px rgba(0, 0, 0, .52);
      overflow: hidden;
      font: 13px/1.45 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }

    #obs-planning-dashboard-panel[data-open="true"] {
      display: flex;
    }

    .obs-pd-header {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 12px;
      border-bottom: 1px solid rgba(148, 163, 184, .22);
      background: #101b2d;
    }

    .obs-pd-title {
      min-width: 0;
      margin-right: auto;
    }

    .obs-pd-title-main {
      font-size: 14px;
      font-weight: 760;
      color: #f8fafc;
    }

    .obs-pd-title-sub {
      display: inline-flex;
      align-items: center;
      width: fit-content;
      max-width: 100%;
      margin-top: 2px;
      border-radius: 999px;
      padding: 2px 7px;
      background: rgba(30, 41, 59, .9);
      color: #94a3b8;
      font-size: 10px;
      font-weight: 720;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .obs-pd-title-sub[data-mode="live"] {
      background: rgba(6, 78, 59, .68);
      color: #a7f3d0;
    }

    .obs-pd-title-sub[data-mode="offline-cache"] {
      background: rgba(120, 53, 15, .66);
      color: #fde68a;
    }

    .obs-pd-title-sub[data-mode="none"] {
      background: rgba(127, 29, 29, .58);
      color: #fecaca;
    }

    .obs-pd-btn {
      border: 1px solid rgba(148, 163, 184, .34);
      background: #18263a;
      color: #edf4ff;
      border-radius: 8px;
      padding: 6px 9px;
      cursor: pointer;
      font: inherit;
      white-space: nowrap;
    }

    .obs-pd-btn:hover,
    .obs-pd-btn:focus-visible {
      outline: none;
      background: #243750;
      border-color: rgba(147, 197, 253, .56);
    }

    .obs-pd-btn[data-emphasis="true"] {
      background: #1d4ed8;
      border-color: #60a5fa;
    }

    .obs-pd-settings {
      display: none;
      grid-template-columns: 92px minmax(0, 1fr);
      gap: 8px;
      padding: 10px 12px;
      border-bottom: 1px solid rgba(148, 163, 184, .18);
      background: #0d1728;
    }

    .obs-pd-settings[data-open="true"] {
      display: grid;
    }

    .obs-pd-settings label {
      align-self: center;
      color: #9fb0c6;
      font-size: 12px;
    }

    .obs-pd-input {
      width: 100%;
      min-width: 0;
      background: #030a16;
      color: #eef6ff;
      border: 1px solid rgba(148, 163, 184, .32);
      border-radius: 7px;
      padding: 6px 8px;
      font: 12px/1.35 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    }

    .obs-pd-tabs {
      display: flex;
      gap: 5px;
      padding: 8px 10px;
      border-bottom: 1px solid rgba(148, 163, 184, .18);
      background: #0b1525;
      overflow-x: auto;
      scrollbar-width: thin;
    }

    .obs-pd-tab {
      padding: 5px 10px;
      border-radius: 999px;
      background: #101b2d;
    }

    .obs-pd-tab[data-active="true"] {
      background: #1d4ed8;
      border-color: #60a5fa;
      color: white;
    }

    .obs-pd-body {
      flex: 1;
      min-height: 0;
      overflow: auto;
      padding: 12px;
      background:
        radial-gradient(circle at 20% 0%, rgba(37, 99, 235, .08), transparent 34%),
        #08111f;
    }

    .obs-pd-source-bar {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 9px;
      padding: 7px 9px;
      border: 1px solid rgba(148, 163, 184, .2);
      border-radius: 9px;
      background: rgba(15, 28, 48, .82);
    }

    .obs-pd-source-label {
      color: #93c5fd;
      font-weight: 700;
      white-space: nowrap;
    }

    .obs-pd-path {
      min-width: 0;
      flex: 1;
      color: #9fb6d4;
      font: 11px/1.35 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .obs-pd-document-header,
    .obs-pd-card,
    .obs-pd-scenario-card,
    .obs-pd-session-panel,
    .obs-pd-note,
    .obs-pd-error {
      border: 1px solid rgba(148, 163, 184, .22);
      border-radius: 11px;
      background: rgba(15, 28, 48, .92);
    }

    .obs-pd-document-header {
      padding: 12px;
      margin-bottom: 10px;
    }

    .obs-pd-document-header h1 {
      margin: 0 0 8px;
      color: #f8fafc;
      font-size: 18px;
      line-height: 1.25;
    }

    .obs-pd-badges {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .obs-pd-badge,
    .obs-pd-goal-chip,
    .obs-pd-status-chip {
      display: inline-flex;
      align-items: center;
      max-width: 100%;
      border: 1px solid rgba(148, 163, 184, .26);
      border-radius: 999px;
      padding: 3px 7px;
      background: #17243a;
      color: #cbd8e9;
      font-size: 11px;
      line-height: 1.2;
    }

    .obs-pd-badge[data-kind="status"] {
      background: rgba(5, 150, 105, .18);
      border-color: rgba(52, 211, 153, .34);
      color: #a7f3d0;
    }

    .obs-pd-badge[data-kind="scope"] {
      background: rgba(109, 40, 217, .2);
      border-color: rgba(167, 139, 250, .36);
      color: #ddd6fe;
    }

    .obs-pd-section-title {
      margin: 14px 0 7px;
      color: #dbeafe;
      font-size: 14px;
      font-weight: 760;
    }

    .obs-pd-card {
      padding: 10px;
      margin-bottom: 9px;
    }

    .obs-pd-card h2,
    .obs-pd-card h3,
    .obs-pd-card h4 {
      margin: 0 0 7px;
      color: #c7ddff;
      font-size: 13px;
    }

    .obs-pd-card p {
      margin: 0 0 7px;
      color: #d9e4f2;
    }

    .obs-pd-card p:last-child {
      margin-bottom: 0;
    }

    .obs-pd-card ul,
    .obs-pd-card ol {
      margin: 5px 0 5px 20px;
      padding: 0;
      color: #d9e4f2;
    }

    .obs-pd-card li + li {
      margin-top: 3px;
    }

    .obs-pd-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 9px;
      margin-bottom: 9px;
    }

    .obs-pd-scenario-card {
      padding: 10px;
      min-width: 0;
    }

    .obs-pd-scenario-card h3 {
      margin: 0 0 6px;
      color: #bfdbfe;
      font-size: 12px;
    }

    .obs-pd-scenario-card[data-scenario="minimum"] {
      border-color: rgba(96, 165, 250, .35);
    }

    .obs-pd-scenario-card[data-scenario="base"] {
      border-color: rgba(45, 212, 191, .34);
    }

    .obs-pd-scenario-card[data-scenario="desired"] {
      border-color: rgba(251, 191, 36, .42);
      background: rgba(69, 52, 12, .32);
    }

    .obs-pd-scenario-card[data-scenario="max"] {
      border-color: rgba(74, 222, 128, .34);
    }

    .obs-pd-code,
    .obs-pd-raw {
      margin: 0;
      padding: 9px;
      border-radius: 8px;
      background: #020817;
      color: #d7e5f8;
      white-space: pre-wrap;
      overflow: auto;
      font: 12px/1.45 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    }

    .obs-pd-table-wrap {
      width: 100%;
      overflow-x: auto;
      border: 1px solid rgba(148, 163, 184, .18);
      border-radius: 9px;
    }

    .obs-pd-table {
      width: 100%;
      border-collapse: collapse;
      min-width: 560px;
      color: #dbe7f5;
      font-size: 12px;
    }

    .obs-pd-table th,
    .obs-pd-table td {
      padding: 7px 8px;
      border-bottom: 1px solid rgba(148, 163, 184, .16);
      border-right: 1px solid rgba(148, 163, 184, .12);
      text-align: left;
      vertical-align: top;
      white-space: pre-line;
    }

    .obs-pd-table th {
      background: #17243a;
      color: #eaf2ff;
      font-weight: 720;
      position: sticky;
      top: 0;
      z-index: 1;
    }

    .obs-pd-table tr:last-child td {
      border-bottom: 0;
    }

    .obs-pd-table th:last-child,
    .obs-pd-table td:last-child {
      border-right: 0;
    }

    .obs-pd-two-column {
      display: grid;
      grid-template-columns: minmax(300px, .78fr) minmax(520px, 1.7fr);
      gap: 12px;
      align-items: start;
    }

    .obs-pd-pane {
      min-width: 0;
    }

    .obs-pd-score-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(126px, 1fr));
      gap: 8px;
      margin-bottom: 10px;
    }

    .obs-pd-score-card {
      min-width: 0;
      padding: 9px;
      border: 1px solid rgba(96, 165, 250, .25);
      border-radius: 9px;
      background: rgba(13, 28, 49, .96);
    }

    .obs-pd-score-label {
      color: #9fb3cd;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: .04em;
    }

    .obs-pd-score-value {
      margin-top: 3px;
      color: #bfdbfe;
      font-size: 20px;
      font-weight: 760;
      line-height: 1.15;
      overflow-wrap: anywhere;
    }

    .obs-pd-score-card[data-tone="good"] .obs-pd-score-value {
      color: #86efac;
    }

    .obs-pd-score-card[data-tone="bad"] .obs-pd-score-value {
      color: #fca5a5;
    }

    .obs-pd-score-card[data-tone="warn"] .obs-pd-score-value {
      color: #fcd34d;
    }

    .obs-pd-score-card[data-tone="violet"] .obs-pd-score-value {
      color: #c4b5fd;
    }

    .obs-pd-session-panel {
      overflow: hidden;
      margin-bottom: 10px;
    }

    .obs-pd-session-head,
    .obs-pd-session-summary {
      display: grid;
      grid-template-columns: 28px 72px 76px 108px minmax(160px, 1fr) 112px;
      gap: 8px;
      align-items: center;
    }

    .obs-pd-session-head {
      padding: 7px 9px;
      background: #17243a;
      color: #b9c9dc;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: .035em;
    }

    .obs-pd-session-record {
      border-top: 1px solid rgba(148, 163, 184, .14);
      background: rgba(9, 20, 36, .82);
    }

    .obs-pd-session-record:first-of-type,
    .obs-pd-session-head + .obs-pd-session-record {
      border-top: 0;
    }

    .obs-pd-session-record summary,
    .obs-pd-session-record-static .obs-pd-session-summary {
      padding: 8px 9px;
    }

    .obs-pd-session-record summary {
      list-style: none;
      cursor: pointer;
    }

    .obs-pd-session-record-static .obs-pd-session-summary {
      cursor: default;
    }

    .obs-pd-session-record summary::-webkit-details-marker {
      display: none;
    }

    .obs-pd-session-record[open] summary {
      background: rgba(30, 64, 175, .16);
    }

    .obs-pd-chevron {
      color: #93c5fd;
      transition: transform .15s ease;
    }

    .obs-pd-session-record[open] .obs-pd-chevron {
      transform: rotate(90deg);
    }

    .obs-pd-session-id {
      color: #f8fafc;
      font-weight: 750;
    }

    .obs-pd-session-score {
      color: #93c5fd;
      font-size: 16px;
      font-weight: 760;
    }

    .obs-pd-session-worked {
      min-width: 0;
      color: #d8e5f5;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .obs-pd-session-details {
      padding: 0 10px 10px 10px;
    }

    .obs-pd-detail-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 7px;
    }

    .obs-pd-detail-item {
      padding: 7px 8px;
      border: 1px solid rgba(148, 163, 184, .17);
      border-radius: 7px;
      background: rgba(15, 28, 48, .75);
    }

    .obs-pd-detail-label {
      color: #93a8c2;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: .04em;
    }

    .obs-pd-detail-value {
      margin-top: 3px;
      color: #e2ebf7;
      white-space: pre-line;
    }

    .obs-pd-goal-list {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
    }

    .obs-pd-note,
    .obs-pd-error {
      padding: 10px;
      margin-bottom: 9px;
      white-space: pre-wrap;
    }

    .obs-pd-note {
      color: #bfdbfe;
      background: rgba(30, 64, 175, .13);
      border-color: rgba(96, 165, 250, .28);
    }

    .obs-pd-error {
      color: #fecaca;
      background: rgba(127, 29, 29, .34);
      border-color: rgba(248, 113, 113, .46);
    }

    .obs-pd-empty {
      color: #91a3ba;
      font-style: italic;
    }

    .obs-pd-link-row {
      display: flex;
      align-items: center;
      gap: 7px;
      padding: 5px 0;
      border-bottom: 1px solid rgba(148, 163, 184, .12);
    }

    .obs-pd-link-row:last-child {
      border-bottom: 0;
    }

    .obs-pd-link-key {
      color: #9fb3ca;
      min-width: 126px;
    }

    .obs-pd-link-value {
      color: #93c5fd;
      overflow-wrap: anywhere;
    }

    .obs-pd-raw-group + .obs-pd-raw-group {
      margin-top: 12px;
    }


    .obs-pd-runtime-status {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 7px;
      margin-bottom: 9px;
      padding: 7px 9px;
      border: 1px solid rgba(148, 163, 184, .22);
      border-radius: 9px;
      background: rgba(15, 28, 48, .86);
      color: #cbd8e9;
    }

    .obs-pd-runtime-status[data-mode="live"] { border-color: rgba(52, 211, 153, .42); }
    .obs-pd-runtime-status[data-mode="offline-cache"] { border-color: rgba(251, 191, 36, .5); }
    .obs-pd-runtime-status[data-mode="none"] { border-color: rgba(248, 113, 113, .48); }

    .obs-pd-runtime-pill,
    .obs-pd-pending-pill {
      display: inline-flex;
      align-items: center;
      border-radius: 999px;
      padding: 3px 7px;
      font-size: 10px;
      font-weight: 760;
      line-height: 1.2;
    }

    .obs-pd-runtime-pill { background: #17243a; color: #bfdbfe; }
    .obs-pd-pending-pill { background: rgba(180, 83, 9, .32); color: #fde68a; border: 1px solid rgba(251, 191, 36, .4); }
    .obs-pd-session-record[data-pending="true"] { background: rgba(120, 53, 15, .18); }
    .obs-pd-session-record[data-conflict="true"] { background: rgba(127, 29, 29, .2); }

    .obs-pd-section-panel {
      overflow: hidden;
      margin-bottom: 10px;
      border: 1px solid rgba(148, 163, 184, .22);
      border-radius: 11px;
      background: rgba(15, 28, 48, .92);
    }

    .obs-pd-day-subtabs {
      display: flex;
      gap: 7px;
      margin-bottom: 10px;
      padding: 7px;
      border: 1px solid rgba(148, 163, 184, .22);
      border-radius: 11px;
      background: rgba(15, 28, 48, .92);
    }

    .obs-pd-day-subtab {
      min-width: 92px;
      padding: 7px 14px;
      border: 1px solid rgba(148, 163, 184, .28);
      border-radius: 8px;
      background: #101b2d;
      color: #cbd8e9;
      cursor: pointer;
      font: inherit;
      font-weight: 720;
    }

    .obs-pd-day-subtab:hover,
    .obs-pd-day-subtab:focus-visible {
      outline: none;
      background: #243750;
      border-color: rgba(147, 197, 253, .56);
    }

    .obs-pd-day-subtab[data-active="true"] {
      background: #1d4ed8;
      border-color: #60a5fa;
      color: white;
    }

    .obs-pd-day-content {
      min-width: 0;
    }

    .obs-pd-section-bar,
    .obs-pd-compact-row {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 9px;
      padding: 9px 10px;
    }

    .obs-pd-section-bar {
      border-bottom: 1px solid rgba(148, 163, 184, .14);
      background: rgba(9, 20, 36, .82);
    }

    .obs-pd-section-name,
    .obs-pd-compact-label {
      color: #e8f1ff;
      font-weight: 760;
    }

    .obs-pd-section-meta {
      min-width: 0;
      margin-left: auto;
      color: #9fb3ca;
      font-size: 11px;
      text-align: right;
    }

    .obs-pd-compact-row {
      min-height: 42px;
      border-bottom: 1px solid rgba(148, 163, 184, .12);
    }

    .obs-pd-compact-row:last-child {
      border-bottom: 0;
    }

    .obs-pd-compact-value {
      margin-left: auto;
      color: #bfdbfe;
      font-size: 16px;
      font-weight: 760;
      text-align: right;
      overflow-wrap: anywhere;
    }

    .obs-pd-compact-value[data-tone="good"] { color: #86efac; }
    .obs-pd-compact-value[data-tone="bad"] { color: #fca5a5; }
    .obs-pd-compact-value[data-tone="warn"] { color: #fcd34d; }
    .obs-pd-compact-value[data-tone="violet"] { color: #c4b5fd; }

    .obs-pd-inline-details,
    .obs-pd-block-details {
      min-width: 0;
    }

    .obs-pd-inline-details[open] {
      flex-basis: 100%;
      width: 100%;
    }

    .obs-pd-block-details > summary .obs-pd-disclosure-button {
      margin-left: auto;
    }

    .obs-pd-inline-details > summary,
    .obs-pd-block-details > summary {
      list-style: none;
      cursor: pointer;
    }

    .obs-pd-inline-details > summary::-webkit-details-marker,
    .obs-pd-block-details > summary::-webkit-details-marker {
      display: none;
    }

    .obs-pd-disclosure-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: 1px solid rgba(148, 163, 184, .34);
      border-radius: 7px;
      padding: 5px 8px;
      background: #18263a;
      color: #edf4ff;
      font-size: 11px;
      font-weight: 700;
      white-space: nowrap;
    }

    details[open] > .obs-pd-disclosure-button {
      background: #243750;
      border-color: rgba(147, 197, 253, .56);
    }

    .obs-pd-disclosure-body {
      padding: 9px 10px 10px;
      border-top: 1px solid rgba(148, 163, 184, .13);
      background: rgba(7, 17, 31, .62);
    }

    .obs-pd-empty-state {
      padding: 10px;
      color: #91a3ba;
      font-style: italic;
    }

    .obs-pd-section-warning {
      margin-bottom: 9px;
      padding: 9px 10px;
      border: 1px solid rgba(251, 191, 36, .4);
      border-radius: 9px;
      background: rgba(120, 53, 15, .2);
      color: #fde68a;
      white-space: pre-wrap;
    }

    .obs-pd-status-pill {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      max-width: 100%;
      border: 1px solid rgba(148, 163, 184, .3);
      border-radius: 999px;
      padding: 3px 7px;
      background: #17243a;
      color: #cbd8e9;
      font-size: 10px;
      font-weight: 760;
      line-height: 1.2;
      white-space: nowrap;
    }

    .obs-pd-status-pill[data-kind="pending"] {
      border-color: rgba(251, 191, 36, .4);
      background: rgba(180, 83, 9, .32);
      color: #fde68a;
    }

    .obs-pd-status-pill[data-kind="conflict"] {
      border-color: rgba(248, 113, 113, .45);
      background: rgba(127, 29, 29, .38);
      color: #fecaca;
    }

    @media (max-width: 980px) {
      #obs-planning-dashboard-panel {
        inset: 8px;
      }

      .obs-pd-header {
        flex-wrap: wrap;
      }

      .obs-pd-title {
        flex-basis: 100%;
      }

      .obs-pd-two-column,
      .obs-pd-grid {
        grid-template-columns: 1fr;
      }

      .obs-pd-session-head,
      .obs-pd-session-summary {
        grid-template-columns: 24px 60px 60px 92px minmax(110px, 1fr) 98px;
      }

      .obs-pd-session-details {
        padding-left: 10px;
      }
    }

    @media (max-width: 620px) {
      .obs-pd-body {
        padding: 8px;
      }

      .obs-pd-header .obs-pd-btn {
        flex: 1;
      }

      .obs-pd-detail-grid,
      .obs-pd-score-grid {
        grid-template-columns: 1fr;
      }

      .obs-pd-session-head {
        display: none;
      }

      .obs-pd-session-summary {
        grid-template-columns: 22px 48px 50px 68px minmax(0, 1fr) 82px;
      }

      .obs-pd-section-bar,
      .obs-pd-compact-row {
        align-items: flex-start;
        flex-wrap: wrap;
      }

      .obs-pd-section-meta,
      .obs-pd-compact-value {
        margin-left: 0;
        flex-basis: 100%;
        text-align: left;
      }
    }

    /* v0.7.0 local planning workspace */
    #obs-planning-dashboard-panel { inset: 8px; border-radius: 12px; }
    .obs-pd-header { min-height: 42px; gap: 6px; padding: 5px 8px; }
    .obs-pd-title-main { font-size: 13px; }
    .obs-pd-title-sub { font-size: 10px; }
    .obs-pd-btn { padding: 5px 8px; border-radius: 7px; }
    .obs-pd-tabs {
      min-height: 34px; gap: 4px; padding: 4px 8px; white-space: nowrap;
    }
    .obs-pd-tab { padding: 4px 8px; font-size: 12px; }
    .obs-pd-body { padding: 8px; }
    .obs-pd-day-subtabs { gap: 4px; margin-bottom: 7px; padding: 4px; }
    .obs-pd-day-subtab { min-width: 78px; padding: 5px 10px; font-size: 12px; }
    .obs-pd-document-header { margin-bottom: 7px; padding: 8px 10px; }
    .obs-pd-document-header h1 { display: inline; margin: 0; font-size: 16px; }
    .obs-pd-score-grid {
      grid-template-columns: repeat(3, minmax(110px, 1fr));
      gap: 6px; margin-bottom: 7px;
    }
    .obs-pd-score-card { padding: 6px 8px; }
    .obs-pd-score-value { margin-top: 1px; font-size: 17px; }
    .obs-pd-section-title { margin: 8px 0 5px; }
    .obs-pd-card, .obs-pd-scenario-card { padding: 8px; margin-bottom: 7px; }
    .obs-pd-grid { gap: 7px; margin-bottom: 7px; }
    .obs-pd-runtime-status { display: none; }

    .obs-pd-compact-day-header {
      display: flex; align-items: center; flex-wrap: wrap; gap: 8px;
      margin-bottom: 7px; padding: 8px 10px;
      border: 1px solid rgba(148, 163, 184, .22);
      border-radius: 10px; background: rgba(15, 28, 48, .92);
    }
    .obs-pd-compact-day-title { color: #f8fafc; font-size: 16px; font-weight: 780; }
    .obs-pd-compact-day-path {
      min-width: 100px; flex: 1; color: #9fb6d4;
      font: 11px/1.3 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    }

    .obs-pd-plan-disclosure {
      margin-bottom: 7px; overflow: hidden;
      border: 1px solid rgba(148, 163, 184, .22);
      border-radius: 10px; background: rgba(15, 28, 48, .92);
    }
    .obs-pd-plan-summary {
      display: flex; align-items: center; gap: 8px; min-height: 36px;
      padding: 7px 9px; cursor: pointer; list-style: none;
      color: #dbeafe; font-weight: 760;
    }
    .obs-pd-plan-summary::-webkit-details-marker { display: none; }
    .obs-pd-plan-summary::before {
      content: "›"; color: #93c5fd; font-size: 18px;
      transform: rotate(0deg); transition: transform .12s ease;
    }
    .obs-pd-plan-disclosure[open] > .obs-pd-plan-summary::before { transform: rotate(90deg); }
    .obs-pd-plan-meta { margin-left: auto; color: #94a3b8; font-size: 10px; font-weight: 600; }
    .obs-pd-plan-body { padding: 0 9px 9px; border-top: 1px solid rgba(148, 163, 184, .12); }
    .obs-pd-plan-body .obs-pd-code { padding: 6px; font-size: 11px; }

    .obs-pd-scenario-disclosure {
      min-width: 0; overflow: hidden;
      border: 1px solid rgba(148, 163, 184, .2);
      border-radius: 9px; background: rgba(9, 20, 36, .72);
    }
    .obs-pd-scenario-disclosure > summary {
      display: flex; align-items: flex-start; gap: 7px; min-height: 38px;
      padding: 7px 8px; cursor: pointer; list-style: none;
      color: #c7ddff; font-weight: 720;
    }
    .obs-pd-scenario-disclosure > summary::-webkit-details-marker { display: none; }
    .obs-pd-scenario-disclosure > summary::after {
      content: "Expand"; flex: 0 0 auto; margin-left: auto; color: #93c5fd; font-size: 10px;
    }
    .obs-pd-scenario-disclosure[open] > summary::after { content: "Collapse"; }
    .obs-pd-scenario-summary-copy { min-width: 0; flex: 1; }
    .obs-pd-scenario-title { color: #c7ddff; font-weight: 720; }
    .obs-pd-scenario-preview {
      margin-top: 4px; color: #aebed1; font-size: 11px; font-weight: 500; white-space: pre-line;
    }
    .obs-pd-scenario-disclosure[open] > summary .obs-pd-scenario-preview { display: none; }
    .obs-pd-scenario-full { padding: 8px; border-top: 1px solid rgba(148, 163, 184, .12); }

    .obs-pd-tools {
      position: absolute; top: 0; right: 0; bottom: 0; z-index: 6;
      width: min(340px, calc(100vw - 28px)); display: flex; flex-direction: column;
      padding: 10px; background: #0b1525;
      border-left: 1px solid rgba(148, 163, 184, .28);
      box-shadow: -18px 0 50px rgba(0,0,0,.38);
      transform: translateX(105%); overflow: auto;
      visibility: hidden; pointer-events: none;
      transition: transform .16s ease, visibility 0s linear .16s;
    }
    .obs-pd-tools[data-open="true"] {
      transform: translateX(0); visibility: visible; pointer-events: auto;
      transition-delay: 0s;
    }
    .obs-pd-tools-head { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
    .obs-pd-tools-head h2 { margin: 0 auto 0 0; font-size: 15px; }
    .obs-pd-tools-section {
      margin-bottom: 8px; padding: 8px;
      border: 1px solid rgba(148, 163, 184, .2);
      border-radius: 9px; background: rgba(15, 28, 48, .86);
    }
    .obs-pd-tools-section h3 { margin: 0 0 6px; font-size: 12px; color: #bfdbfe; }
    .obs-pd-tools-row {
      display: flex; align-items: flex-start; gap: 8px; margin: 5px 0;
      color: #cbd8e9; font-size: 11px; overflow-wrap: anywhere;
    }
    .obs-pd-tools-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
    .obs-pd-tools-indicator {
      display: inline-flex; align-items: center; justify-content: center;
      min-width: 18px; height: 18px; border-radius: 999px;
      background: rgba(180, 83, 9, .35); color: #fde68a; font-size: 10px; font-weight: 800;
    }

    .obs-pd-score-meta {
      margin-top: 2px; color: #8fa5c2; font-size: 10px; line-height: 1.25;
    }

    .obs-pd-plan-workspace {
      display: grid; grid-template-columns: minmax(300px, .9fr) minmax(0, 1.35fr);
      gap: 8px; align-items: start; margin-bottom: 8px;
    }
    .obs-pd-workspace-column {
      min-width: 0; padding: 8px;
      border: 1px solid rgba(148, 163, 184, .22);
      border-radius: 10px; background: rgba(15, 28, 48, .92);
    }
    .obs-pd-workspace-head {
      display: flex; align-items: center; flex-wrap: wrap; gap: 6px;
      margin-bottom: 7px;
    }
    .obs-pd-workspace-head h2 { margin: 0; font-size: 14px; color: #e5efff; }
    .obs-pd-local-only {
      margin-left: auto; color: #a7f3d0; font-size: 9px; font-weight: 760;
      letter-spacing: .04em; text-transform: uppercase;
    }
    .obs-pd-workspace-hint {
      width: 100%; color: #8fa5c2; font-size: 10px; line-height: 1.35;
    }

    .obs-pd-plan-level {
      --level-color: #64748b;
      margin-bottom: 7px; overflow: hidden;
      border: 1px solid rgba(148, 163, 184, .18);
      border-left: 4px solid var(--level-color);
      border-radius: 9px; background: rgba(8, 18, 32, .72);
    }
    .obs-pd-plan-level[data-level="minimum"] { --level-color: #fb7185; }
    .obs-pd-plan-level[data-level="base"] { --level-color: #60a5fa; }
    .obs-pd-plan-level[data-level="desired"] { --level-color: #c084fc; }
    .obs-pd-plan-level[data-level="max"] { --level-color: #fbbf24; }
    .obs-pd-plan-level[data-level="acceptance"] { --level-color: #2dd4bf; }
    .obs-pd-plan-level[data-level="done"] { --level-color: #34d399; }
    .obs-pd-plan-level-head {
      display: flex; align-items: center; gap: 7px; padding: 7px 8px;
      border-bottom: 1px solid rgba(148, 163, 184, .12);
    }
    .obs-pd-plan-level-head h3 { margin: 0; font-size: 12px; color: #dbeafe; }
    .obs-pd-level-badge {
      border-radius: 999px; padding: 2px 6px;
      background: color-mix(in srgb, var(--level-color) 24%, transparent);
      color: var(--level-color); font-size: 9px; font-weight: 800;
    }
    .obs-pd-plan-items { display: grid; gap: 5px; padding: 6px; }
    .obs-pd-plan-item {
      border: 1px solid rgba(148, 163, 184, .15);
      border-radius: 8px; background: rgba(15, 23, 42, .72);
    }
    .obs-pd-plan-item-main {
      display: grid; grid-template-columns: auto minmax(0, 1fr) auto;
      align-items: start; gap: 7px; padding: 7px;
    }
    .obs-pd-plan-check { margin-top: 2px; accent-color: var(--level-color); }
    .obs-pd-plan-item-copy { min-width: 0; }
    .obs-pd-plan-item-id { color: var(--level-color); font-size: 10px; font-weight: 800; }
    .obs-pd-plan-item-text { color: #e5edf8; font-size: 12px; line-height: 1.35; }
    .obs-pd-plan-item[data-done="true"] .obs-pd-plan-item-text {
      color: #9fb2ca; text-decoration: line-through;
    }
    .obs-pd-plan-item-source { margin-top: 2px; color: #7186a2; font-size: 9px; }
    .obs-pd-plan-item-details { border-top: 1px solid rgba(148, 163, 184, .12); }
    .obs-pd-plan-item-details > summary {
      padding: 5px 7px; cursor: pointer; color: #9fb6d4; font-size: 10px;
    }
    .obs-pd-plan-item-editor { display: grid; gap: 6px; padding: 0 7px 7px; }
    .obs-pd-field-label { display: block; color: #9fb6d4; font-size: 10px; }
    .obs-pd-local-textarea,
    .obs-pd-local-select,
    .obs-pd-local-time {
      width: 100%; min-width: 0; margin-top: 3px;
      border: 1px solid rgba(148, 163, 184, .28); border-radius: 7px;
      background: #050d1a; color: #e8f1ff; padding: 6px 7px; font: inherit;
    }
    .obs-pd-local-textarea { min-height: 62px; resize: vertical; font-size: 11px; }
    .obs-pd-local-time { padding: 4px 5px; font-size: 10px; }
    .obs-pd-local-select { padding: 5px 6px; font-size: 10px; }
    .obs-pd-local-textarea[data-saved="true"],
    .obs-pd-local-time[data-saved="true"],
    .obs-pd-local-select[data-saved="true"] { border-color: rgba(52, 211, 153, .7); }
    .obs-pd-local-textarea[data-save-error="true"] { border-color: rgba(248, 113, 113, .85); }
    .obs-pd-item-actions { display: flex; flex-wrap: wrap; gap: 5px; }
    .obs-pd-item-actions .obs-pd-btn { padding: 4px 6px; font-size: 10px; }
    .obs-pd-plan-mode {
      display: grid; grid-template-columns: minmax(150px, .65fr) minmax(0, 1.35fr);
      gap: 7px; align-items: end; margin-bottom: 8px; padding: 8px;
      border: 1px solid rgba(96, 165, 250, .24); border-radius: 9px;
      background: rgba(8, 25, 48, .76);
    }
    .obs-pd-plan-mode-copy { color: #9fb6d4; font-size: 10px; line-height: 1.35; }
    .obs-pd-local-planner {
      display: grid; gap: 7px; margin-bottom: 8px;
      padding: 8px; border: 1px solid rgba(96, 165, 250, .2);
      border-radius: 9px; background: rgba(8, 18, 32, .72);
    }
    .obs-pd-local-planner-head {
      display: flex; align-items: center; gap: 7px; flex-wrap: wrap;
    }
    .obs-pd-local-planner-head h3 { margin: 0; color: #dbeafe; font-size: 12px; }
    .obs-pd-local-planner-head .obs-pd-btn { margin-left: auto; }
    .obs-pd-local-session {
      padding: 7px; border: 1px solid rgba(148, 163, 184, .17);
      border-left: 4px solid #60a5fa; border-radius: 8px;
      background: rgba(15, 23, 42, .74);
    }
    .obs-pd-local-session-head {
      display: grid; grid-template-columns: auto minmax(0, 1fr) auto;
      gap: 7px; align-items: center;
    }
    .obs-pd-session-label {
      min-width: 34px; text-align: center; padding: 4px 6px; border-radius: 7px;
      background: rgba(37, 99, 235, .32); color: #bfdbfe; font-weight: 820;
    }
    .obs-pd-session-linked { margin-top: 5px; color: #9fb6d4; font-size: 10px; line-height: 1.35; }
    .obs-pd-session-linked strong { color: #dbeafe; }
    .obs-pd-time-plan-list { display: grid; gap: 5px; }
    .obs-pd-time-plan-row {
      display: grid; grid-template-columns: 92px minmax(0, 1fr); gap: 7px;
      padding: 6px 7px; border: 1px solid rgba(148, 163, 184, .15);
      border-radius: 7px; background: rgba(15, 23, 42, .68);
    }
    .obs-pd-time-plan-time { color: #93c5fd; font-weight: 760; font-size: 10px; }
    .obs-pd-time-plan-item { color: #dbeafe; font-size: 10px; }
    .obs-pd-assignment {
      display: grid; gap: 6px; padding: 7px;
      border: 1px solid rgba(96, 165, 250, .18); border-radius: 7px;
      background: rgba(8, 25, 48, .48);
    }
    .obs-pd-assignment-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
    .obs-pd-assignment-pill {
      align-self: start; border-radius: 999px; padding: 2px 6px;
      background: rgba(37, 99, 235, .24); color: #bfdbfe;
      font-size: 9px; font-weight: 800;
    }
    .obs-pd-local-item-badge {
      border-radius: 999px; padding: 2px 6px; background: rgba(52, 211, 153, .18);
      color: #a7f3d0; font-size: 9px; font-weight: 800;
    }
    .obs-pd-repository-scope { margin-top: 8px; }
    .obs-pd-linked-material {
      padding: 7px; border: 1px solid rgba(45, 212, 191, .2);
      border-radius: 7px; background: rgba(8, 47, 50, .34);
    }
    .obs-pd-linked-material h4 { margin: 0 0 5px; color: #99f6e4; font-size: 10px; }
    .obs-pd-linked-material-list { display: grid; gap: 4px; }
    .obs-pd-linked-material-item { color: #c8d8e8; font-size: 10px; line-height: 1.35; }
    .obs-pd-legacy-material {
      margin-top: 7px; overflow: hidden;
      border: 1px dashed rgba(148, 163, 184, .28);
      border-radius: 9px; background: rgba(9, 18, 31, .62);
    }
    .obs-pd-legacy-material > summary {
      padding: 7px 8px; cursor: pointer; color: #aebed1; font-size: 10px;
    }
    .obs-pd-legacy-material-body { display: grid; gap: 6px; padding: 0 8px 8px; }
    .obs-pd-legacy-entry {
      display: grid; grid-template-columns: auto minmax(0, 1fr) minmax(150px, .7fr);
      align-items: start; gap: 6px; padding: 6px;
      border: 1px solid rgba(148, 163, 184, .14); border-radius: 7px;
      background: rgba(15, 23, 42, .66);
    }
    .obs-pd-legacy-entry-copy { color: #c8d8e8; font-size: 10px; line-height: 1.35; }
    .obs-pd-legacy-entry-source { margin-top: 2px; color: #7186a2; font-size: 9px; }

    .obs-pd-scope-unit {
      --level-color: #64748b;
      margin-bottom: 6px; padding: 7px;
      border: 1px solid rgba(148, 163, 184, .17);
      border-left: 4px solid var(--level-color);
      border-radius: 8px; background: rgba(8, 18, 32, .72);
    }
    .obs-pd-scope-unit[data-level="minimum"] { --level-color: #fb7185; }
    .obs-pd-scope-unit[data-level="base"] { --level-color: #60a5fa; }
    .obs-pd-scope-unit[data-level="desired"] { --level-color: #c084fc; }
    .obs-pd-scope-unit[data-level="max"] { --level-color: #fbbf24; }
    .obs-pd-scope-unit[data-level="acceptance"] { --level-color: #2dd4bf; }
    .obs-pd-scope-title-row { display: flex; align-items: center; gap: 6px; margin-bottom: 5px; }
    .obs-pd-scope-title { min-width: 0; flex: 1; color: #e5edf8; font-size: 12px; font-weight: 760; }
    .obs-pd-scope-status { color: #9fb6d4; font-size: 9px; }
    .obs-pd-scope-source { color: #8fa5c2; font-size: 10px; line-height: 1.35; }
    .obs-pd-deadline-grid {
      display: grid; grid-template-columns: repeat(4, minmax(64px, 1fr));
      gap: 4px; margin-top: 6px;
    }
    .obs-pd-deadline-grid .obs-pd-field-label { font-size: 9px; }
    .obs-pd-scope-source-details { margin-top: 6px; }
    .obs-pd-scope-source-details > summary { cursor: pointer; color: #8fa5c2; font-size: 9px; }
    .obs-pd-scope-source-grid { display: grid; gap: 3px; margin-top: 5px; color: #9fb6d4; font-size: 10px; }
    .obs-pd-day-note { margin-top: 8px; padding-top: 7px; border-top: 1px solid rgba(148, 163, 184, .12); }

    .obs-pd-local-goal-map {
      margin-bottom: 8px; overflow: hidden;
      border: 1px solid rgba(45, 212, 191, .28); border-radius: 10px;
      background: rgba(7, 29, 38, .78);
    }
    .obs-pd-local-goal-map > summary {
      display: flex; align-items: center; gap: 7px; padding: 8px 9px;
      cursor: pointer; color: #ccfbf1; font-weight: 760;
    }
    .obs-pd-goal-map-body { display: grid; gap: 7px; padding: 0 9px 9px; }
    .obs-pd-goal-map-meta { color: #8fa5c2; font-size: 10px; overflow-wrap: anywhere; }
    .obs-pd-goal-map-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
    .obs-pd-goal-map-grid .obs-pd-field-label[data-wide="true"] { grid-column: 1 / -1; }

    @media (max-width: 980px) {
      .obs-pd-plan-workspace { grid-template-columns: 1fr; }
      .obs-pd-plan-mode { grid-template-columns: 1fr; }
    }

    @media (max-height: 780px) {
      .obs-pd-header { min-height: 36px; padding: 3px 6px; }
      .obs-pd-title-main { font-size: 12px; }
      .obs-pd-title-sub { font-size: 9px; }
      .obs-pd-btn { padding: 4px 7px; font-size: 11px; }
      .obs-pd-tabs { min-height: 30px; padding: 3px 6px; }
      .obs-pd-tab { padding: 3px 7px; font-size: 11px; }
      .obs-pd-body { padding: 6px; }
      .obs-pd-day-subtabs { margin-bottom: 5px; padding: 3px; }
      .obs-pd-day-subtab { min-width: 68px; padding: 4px 8px; }
      .obs-pd-compact-day-header { margin-bottom: 5px; padding: 6px 8px; }
      .obs-pd-score-card { padding: 5px 7px; }
      .obs-pd-score-value { font-size: 15px; }
      .obs-pd-plan-summary { min-height: 32px; padding: 5px 7px; }
    }
    @media (max-width: 760px) {
      .obs-pd-score-grid { grid-template-columns: repeat(3, minmax(96px, 1fr)); overflow-x: auto; }
      .obs-pd-grid { grid-template-columns: 1fr; }
    }

  `);

  function el(tag, attrs = {}, children = []) {
    const node = document.createElement(tag);
    for (const [key, value] of Object.entries(attrs)) {
      if (key === 'text') {
        node.textContent = value;
      } else if (key.startsWith('on') && typeof value === 'function') {
        node.addEventListener(key.slice(2).toLowerCase(), value);
      } else if (value !== undefined && value !== null) {
        node.setAttribute(key, String(value));
      }
    }
    for (const child of children) {
      if (child) node.appendChild(child);
    }
    return node;
  }

  function normalizeBaseUrl(url) {
    return String(url || DEFAULT_BASE_URL).replace(/\/?$/, '/');
  }

  function normalizeIndexPathSetting(value) {
    const text = String(value || DEFAULT_INDEX_PATH).trim() || DEFAULT_INDEX_PATH;
    try {
      const url = new URL(text, 'http://obs-dashboard.local/');
      url.searchParams.delete('refresh');
      url.searchParams.delete('_obs_cache_bust');
      const query = url.searchParams.toString();
      return `${url.pathname.replace(/^\/+/, '')}${query ? `?${query}` : ''}${url.hash || ''}`;
    } catch {
      return text;
    }
  }

  function normalizeOptionalPath(value) {
    const text = String(value || '').trim();
    return OPTIONAL_EMPTY_VALUES.has(text.toLowerCase()) ? '' : text;
  }

  function buildLocalUrl(path) {
    const cleanPath = String(path || '').replace(/^\/+/, '');
    return encodeURI(normalizeBaseUrl(state.baseUrl) + cleanPath);
  }

  function fetchText(path) {
    const url = new URL(buildLocalUrl(path));
    url.searchParams.set('_obs_cache_bust', `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`);
    const requestUrl = url.toString();

    return new Promise((resolve, reject) => {
      GM_xmlhttpRequest({
        method: 'GET',
        url: requestUrl,
        headers: {
          'Cache-Control': 'no-cache, no-store, max-age=0',
          Pragma: 'no-cache'
        },
        timeout: 8000,
        onload: (response) => {
          if (response.status >= 200 && response.status < 300) {
            resolve(response.responseText || '');
          } else {
            reject(new Error(`HTTP ${response.status} for ${requestUrl}`));
          }
        },
        onerror: () => reject(new Error(`Request failed for ${requestUrl}`)),
        ontimeout: () => reject(new Error(`Request timed out for ${requestUrl}`))
      });
    });
  }

  function readSharedJson(key, fallback) {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      console.warn('OBS dashboard shared read failed', key, error);
      return fallback;
    }
  }

  function writeSharedJson(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.warn('OBS dashboard shared write failed', key, error);
      return false;
    }
  }

  function readOutbox() {
    const value = readSharedJson(OUTBOX_KEY, { schema: 'obs-session-outbox-v1', days: {} });
    return value && value.schema === 'obs-session-outbox-v1' && typeof value.days === 'object'
      ? value
      : { schema: 'obs-session-outbox-v1', days: {} };
  }

  function emptyLocalPlanningStore() {
    return {
      schema: LOCAL_PLAN_SCHEMA,
      updatedAt: null,
      days: {},
      goalMaps: {}
    };
  }

  function readLocalPlanningStore() {
    const value = localPlanningAssignmentMigrationFallback
      || readSharedJson(LOCAL_PLAN_KEY, emptyLocalPlanningStore());
    if (!value || value.schema !== LOCAL_PLAN_SCHEMA || typeof value.days !== 'object') {
      return emptyLocalPlanningStore();
    }
    if (!value.goalMaps || typeof value.goalMaps !== 'object') value.goalMaps = {};
    if (!localPlanningAssignmentMigrationDone) {
      const changed = normalizeLocalPlanningStoreAssignments(value);
      localPlanningAssignmentMigrationDone = true;
      if (changed && !writeLocalPlanningStore(value)) {
        localPlanningAssignmentMigrationFallback = value;
        console.warn('OBS local planning assignment migration could not be persisted.');
      }
    }
    return value;
  }

  function writeLocalPlanningStore(store) {
    store.schema = LOCAL_PLAN_SCHEMA;
    store.updatedAt = new Date().toISOString();
    const saved = writeSharedJson(LOCAL_PLAN_KEY, store);
    if (saved) localPlanningAssignmentMigrationFallback = null;
    return saved;
  }

  function isValidClockTime(value) {
    return /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(String(value || ''));
  }

  function clearExecutionAssignment(item) {
    let changed = false;
    for (const [key, value] of [
      ['executionMode', ''],
      ['sessionId', ''],
      ['timeStart', ''],
      ['timeEnd', '']
    ]) {
      if (item[key] !== value) {
        item[key] = value;
        changed = true;
      }
    }
    return changed;
  }

  function normalizeExecutionAssignment(item, localSessions = {}) {
    if (!item || typeof item !== 'object') return false;
    const mode = String(item.executionMode || '');
    let changed = false;

    if (mode === 'sessions') {
      const sessionId = String(item.sessionId || '');
      if (item.timeStart !== '') {
        item.timeStart = '';
        changed = true;
      }
      if (item.timeEnd !== '') {
        item.timeEnd = '';
        changed = true;
      }
      if (!sessionId || !localSessions?.[sessionId]) {
        changed = clearExecutionAssignment(item) || changed;
      } else if (item.sessionId !== sessionId) {
        item.sessionId = sessionId;
        changed = true;
      }
      return changed;
    }

    if (mode === 'hours') {
      const timeStart = String(item.timeStart || '');
      const timeEnd = String(item.timeEnd || '');
      if (item.sessionId !== '') {
        item.sessionId = '';
        changed = true;
      }
      if (!isValidClockTime(timeStart) || !isValidClockTime(timeEnd) || timeEnd <= timeStart) {
        changed = clearExecutionAssignment(item) || changed;
      } else {
        if (item.timeStart !== timeStart) {
          item.timeStart = timeStart;
          changed = true;
        }
        if (item.timeEnd !== timeEnd) {
          item.timeEnd = timeEnd;
          changed = true;
        }
      }
      return changed;
    }

    return clearExecutionAssignment(item);
  }

  function normalizeLocalPlanningStoreAssignments(store) {
    let changed = false;
    const now = new Date().toISOString();
    for (const day of Object.values(store?.days || {})) {
      if (!day || typeof day !== 'object') continue;
      if (Object.prototype.hasOwnProperty.call(day, 'planningMode')) {
        delete day.planningMode;
        changed = true;
      }
      const sessions = day.localSessions && typeof day.localSessions === 'object'
        ? day.localSessions
        : {};
      for (const item of Object.values(day.planItems || {})) {
        if (normalizeExecutionAssignment(item, sessions)) {
          item.updatedAt = now;
          day.updatedAt = now;
          changed = true;
        }
      }
    }
    return changed;
  }

  function stableHash(value) {
    let hash = 2166136261;
    for (const char of String(value || '')) {
      hash ^= char.charCodeAt(0);
      hash = Math.imul(hash, 16777619);
    }
    return (hash >>> 0).toString(36);
  }

  function planningDayIdentity(file = state.files.day) {
    const path = String(file?.path || '').trim();
    const date = path.match(/(\d{4}-\d{2}-\d{2})\.md(?:$|[?#])/)?.[1]
      || parseMarkdownDocument(file?.text || '').title.match(/(\d{4}-\d{2}-\d{2})/)?.[1]
      || 'undated';
    return {
      date,
      path,
      key: `${date}::${path || 'no-path'}`
    };
  }

  function ensureLocalDayState(store, file = state.files.day) {
    const identity = planningDayIdentity(file);
    if (!store.days[identity.key]) {
      store.days[identity.key] = {
        key: identity.key,
        date: identity.date,
        planningPath: identity.path,
        dayNote: '',
        localPlanItems: {},
        localSessions: {},
        scopeUnits: {},
        planItems: {},
        legacyLinks: {},
        goalMapIds: [],
        updatedAt: null
      };
    }
    const day = store.days[identity.key];
    if (!day.localPlanItems || typeof day.localPlanItems !== 'object') day.localPlanItems = {};
    if (!day.localSessions || typeof day.localSessions !== 'object') day.localSessions = {};
    if (!day.scopeUnits || typeof day.scopeUnits !== 'object') day.scopeUnits = {};
    if (!day.planItems || typeof day.planItems !== 'object') day.planItems = {};
    if (!day.legacyLinks || typeof day.legacyLinks !== 'object') day.legacyLinks = {};
    if (!Array.isArray(day.goalMapIds)) day.goalMapIds = [];
    day.date = identity.date;
    day.planningPath = identity.path;
    return day;
  }

  function readLocalDayState(file = state.files.day) {
    const store = readLocalPlanningStore();
    const identity = planningDayIdentity(file);
    return store.days[identity.key] || {
      key: identity.key,
      date: identity.date,
      planningPath: identity.path,
      dayNote: '',
      localPlanItems: {},
      localSessions: {},
      scopeUnits: {},
      planItems: {},
      legacyLinks: {},
      goalMapIds: []
    };
  }

  function updateLocalDayState(file, updater) {
    const store = readLocalPlanningStore();
    const day = ensureLocalDayState(store, file);
    updater(day, store);
    day.updatedAt = new Date().toISOString();
    if (!writeLocalPlanningStore(store)) {
      throw new Error('Could not save local planning state.');
    }
    return day;
  }

  function bindDebouncedLocalInput(node, save, delay = 350) {
    let timer = null;
    node.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        try {
          save(node.value);
          node.dataset.saved = 'true';
          setTimeout(() => { delete node.dataset.saved; }, 900);
        } catch (error) {
          console.warn('OBS local planning save failed', error);
          node.dataset.saveError = 'true';
        }
      }, delay);
    });
    node.addEventListener('change', () => {
      clearTimeout(timer);
      try {
        save(node.value);
        node.dataset.saved = 'true';
        setTimeout(() => { delete node.dataset.saved; }, 900);
      } catch (error) {
        console.warn('OBS local planning save failed', error);
        node.dataset.saveError = 'true';
      }
    });
    return node;
  }

  function localGoalMaps() {
    return Object.values(readLocalPlanningStore().goalMaps || {})
      .filter((map) => map && map.id)
      .sort((a, b) => String(b.updatedAt || b.createdAt || '').localeCompare(String(a.updatedAt || a.createdAt || '')));
  }

  function dateFromOperationalPath(path) {
    return String(path || '').match(/(\d{4}-\d{2}-\d{2})\.md(?:$|[?#])/)?.[1] || '';
  }

  function pendingDayForFile(file) {
    if (!file?.path) return null;
    const date = dateFromOperationalPath(file.path);
    const day = readOutbox().days?.[date];
    if (!day || day.operationalPath !== file.path || !Array.isArray(day.sessions)) return null;
    return day;
  }

  function activePendingSessions(file) {
    const day = pendingDayForFile(file);
    return day ? day.sessions.filter((session) => session.status === 'pending') : [];
  }

  function visibleLocalSessions(file) {
    const day = pendingDayForFile(file);
    return day ? day.sessions.filter((session) => session.status !== 'synced') : [];
  }


  function localOutboxDiagnostic(file) {
    if (!file?.path) return null;
    const date = dateFromOperationalPath(file.path);
    const day = readOutbox().days?.[date];
    if (!day || !Array.isArray(day.sessions) || !day.sessions.some((session) => session.status !== 'synced')) return null;
    if (day.operationalPath === file.path) return null;
    const count = day.sessions.filter((session) => session.status !== 'synced').length;
    return {
      count,
      expectedPath: day.operationalPath || 'not provided',
      actualPath: file.path,
      message: `${count} local session(s) exist for ${date}, but their operationalPath does not match the active Dashboard file.
Outbox: ${day.operationalPath || 'not provided'}
Dashboard: ${file.path}`
    };
  }

  function parseNumber(value) {
    const normalized = String(value ?? '').replace(',', '.').match(/[+-]?\d+(?:\.\d+)?/)?.[0];
    const number = Number(normalized);
    return Number.isFinite(number) ? number : 0;
  }

  function formatNumber(value) {
    const rounded = Math.round(Number(value) * 1000) / 1000;
    return Number.isFinite(rounded) ? String(rounded).replace(/\.0+$/, '') : '0';
  }

  async function sha256Text(text) {
    const bytes = new TextEncoder().encode(String(text || ''));
    const digest = await crypto.subtle.digest('SHA-256', bytes);
    return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
  }

  function openCacheDb() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(CACHE_DB_NAME, CACHE_DB_VERSION);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(CACHE_STORE)) db.createObjectStore(CACHE_STORE);
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error || new Error('Could not open IndexedDB cache'));
    });
  }

  async function writeSnapshot(snapshot) {
    const db = await openCacheDb();
    try {
      await new Promise((resolve, reject) => {
        const tx = db.transaction(CACHE_STORE, 'readwrite');
        tx.objectStore(CACHE_STORE).put(snapshot, CACHE_KEY);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error || new Error('Could not write dashboard snapshot'));
        tx.onabort = () => reject(tx.error || new Error('Dashboard snapshot write aborted'));
      });
    } finally {
      db.close();
    }
  }

  async function readSnapshot() {
    const db = await openCacheDb();
    try {
      return await new Promise((resolve, reject) => {
        const tx = db.transaction(CACHE_STORE, 'readonly');
        const request = tx.objectStore(CACHE_STORE).get(CACHE_KEY);
        request.onsuccess = () => resolve(request.result || null);
        request.onerror = () => reject(request.error || new Error('Could not read dashboard snapshot'));
      });
    } finally {
      db.close();
    }
  }

  function cloneFile(file) {
    if (!file) return null;
    return {
      path: file.path,
      text: file.text || '',
      error: file.error || null,
      sha256: file.sha256 || null,
      loadedAt: file.loadedAt || null
    };
  }

  function cacheSourceKey(baseUrl = state.baseUrl, indexPath = state.indexPath) {
    return `${normalizeBaseUrl(baseUrl)}|${normalizeIndexPathSetting(indexPath).replace(/^\/+/, '')}`;
  }

  function snapshotFromState(savedAt) {
    const files = {};
    Object.entries(state.files || {}).forEach(([key, file]) => { files[key] = cloneFile(file); });
    return {
      schema: 'obs-dashboard-snapshot-v1',
      sourceKey: cacheSourceKey(),
      savedAt,
      baseUrl: state.baseUrl,
      indexPath: state.indexPath,
      indexText: state.indexText,
      files,
      groups: { goalMaps: (state.groups.goalMaps || []).map(cloneFile) }
    };
  }

  function restoreSnapshot(snapshot) {
    if (!snapshot || snapshot.schema !== 'obs-dashboard-snapshot-v1') throw new Error('No compatible browser snapshot');
    const expectedSourceKey = cacheSourceKey();
    const snapshotSourceKey = (
      snapshot.baseUrl != null && snapshot.indexPath != null
        ? cacheSourceKey(snapshot.baseUrl, snapshot.indexPath)
        : snapshot.sourceKey
    );
    if (snapshotSourceKey !== expectedSourceKey) {
      throw new Error(`Browser snapshot belongs to another source: ${snapshotSourceKey}`);
    }
    state.indexText = snapshot.indexText || snapshot.files?.index?.text || '';
    state.files = snapshot.files || {};
    state.groups = snapshot.groups || { goalMaps: [] };
    state.snapshotSavedAt = snapshot.savedAt || null;
    state.sourceMode = 'offline-cache';
  }

  function sessionSourceContext(file) {
    if (!file || file.error || !file.text || !file.sha256) return null;
    const model = parseMarkdownDocument(file.text);
    const section = findSection(model, 'finished sessions') || findSection(model, 'sessions');
    const table = section ? parseFirstTable(section.lines) : null;
    const rows = table?.rows || [];
    const lastSessionNumber = rows.reduce((max, row, index) => {
      const raw = exactRowValue(row, table, ['#', 'Session #']);
      const number = Number(String(raw || '').replace(/\D/g, ''));
      return Math.max(max, Number.isFinite(number) && number > 0 ? number : index + 1);
    }, 0);
    const summary = findSubsection(model, 'work score summary');
    const values = tableToKeyValue(summary ? parseFirstTable(summary.lines) : null);
    return {
      schema: 'obs-session-context-v1',
      publishedAt: new Date().toISOString(),
      sourceMode: state.sourceMode,
      snapshotSavedAt: state.snapshotSavedAt,
      date: dateFromOperationalPath(file.path),
      operationalPath: file.path,
      operationalFileSha256: file.sha256,
      lastSessionNumber,
      sessionRowCount: rows.length,
      workPoints: parseNumber(pickKeyValue(values, ['Work Points']))
    };
  }

  function clearSessionContext(reason) {
    try {
      window.localStorage.removeItem(CONTEXT_KEY);
    } catch (error) {
      console.warn('OBS dashboard session context clear failed', error);
    }
    try {
      window.dispatchEvent(new CustomEvent('obs-planning-session-context-updated', {
        detail: { schema: 'obs-session-context-v1', available: false, reason: reason || 'unavailable' }
      }));
    } catch {}
  }

  function publishSessionContext() {
    const context = sessionSourceContext(state.files.sessionDay);
    if (!context?.date) {
      clearSessionContext('active operational session day is unavailable');
      return;
    }
    writeSharedJson(CONTEXT_KEY, { ...context, available: true });
    try { window.dispatchEvent(new CustomEvent('obs-planning-session-context-updated', { detail: context })); } catch {}
  }


  function sessionRowMatchesPending(row, table, session) {
    const dfText = exactRowValue(row, table, ['D/F', 'D / F', 'D/F/K/P']);
    const d = parseNumber(dfText.match(/\bD\s*([+-]?\d+(?:[.,]\d+)?)/i)?.[1]);
    const f = parseNumber(dfText.match(/\bF\s*([+-]?\d+(?:[.,]\d+)?)/i)?.[1]);
    const points = parseNumber(exactRowValue(row, table, ['Points', 'Score', 'Total']));
    const normalized = (value) => cleanCell(value || '');
    const optionalColumnMatches = (aliases, expected) => {
      const index = exactHeaderIndex(table, aliases);
      return index < 0 || normalized(row[index]) === normalized(expected);
    };
    const rowNumber = parseNumber(exactRowValue(row, table, ['#', 'Session #']));
    const expectedRowNumber = parseNumber(session.expectedRowNumber);
    return Math.abs(d - parseNumber(session.d)) < 0.0001
      && Math.abs(f - parseNumber(session.f)) < 0.0001
      && Math.abs(points - parseNumber(session.points)) < 0.0001
      && (!expectedRowNumber || !rowNumber || rowNumber === expectedRowNumber)
      && optionalColumnMatches(['Time'], session.time)
      && optionalColumnMatches(['Session'], session.session)
      && optionalColumnMatches(['Goal(s)', 'Goals', 'Goal', 'Worked On (Goals)', 'Worked On', 'Related Goals', 'Goal Maps', 'Target'], session.goals)
      && optionalColumnMatches(['Progress Signal'], session.progressSignal)
      && optionalColumnMatches(['Result', 'Result (short)'], session.result);
  }

  function reconcileOutboxWithLiveFile(file) {
    if (state.sourceMode !== 'live' || !file || file.error || !file.text) return;
    const date = dateFromOperationalPath(file.path);
    const outbox = readOutbox();
    const day = outbox.days?.[date];
    if (!day || day.operationalPath !== file.path || !Array.isArray(day.sessions)) return;
    const unsynced = day.sessions.filter((session) => session.status !== 'synced');
    if (!unsynced.length) return;

    if (file.sha256 === day.source?.operationalFileSha256) return;

    const model = parseMarkdownDocument(file.text);
    const section = findSection(model, 'finished sessions') || findSection(model, 'sessions');
    const table = section ? parseFirstTable(section.lines) : null;
    if (!table) return;

    const boundary = Number(day.source?.sessionRowCount ?? day.source?.lastSessionNumber ?? 0);
    const expectedRowCount = boundary + unsynced.length;
    const appended = table.rows.slice(boundary);
    const complete = table.rows.length === expectedRowCount
      && appended.length === unsynced.length
      && unsynced.every((session, index) => sessionRowMatchesPending(appended[index], table, session));

    if (complete) {
      const syncedAt = new Date().toISOString();
      unsynced.forEach((session) => {
        session.status = 'synced';
        session.syncedAt = syncedAt;
        session.syncedFileSha256 = file.sha256;
      });
      day.reconciledAt = syncedAt;
      day.reconciledFileSha256 = file.sha256;
    } else {
      unsynced.forEach((session) => { session.status = 'conflict'; });
      day.conflictAt = new Date().toISOString();
      day.conflictFileSha256 = file.sha256;
    }

    outbox.updatedAt = new Date().toISOString();
    writeSharedJson(OUTBOX_KEY, outbox);
    try { window.dispatchEvent(new CustomEvent('obs-planning-outbox-updated', { detail: { date } })); } catch {}
  }

  function runtimeStatusNode() {
    const labels = {
      live: 'Live localhost',
      'offline-cache': 'Offline cache',
      none: 'No data'
    };
    const node = el('div', { class: 'obs-pd-runtime-status', 'data-mode': state.sourceMode || 'none' });
    node.appendChild(el('span', { class: 'obs-pd-runtime-pill', text: labels[state.sourceMode] || labels.none }));
    const timestamp = state.snapshotSavedAt ? new Date(state.snapshotSavedAt).toLocaleString() : 'not available';
    node.appendChild(el('span', { text: `Snapshot: ${timestamp}` }));
    if (state.lastLoadError && state.sourceMode === 'offline-cache') node.appendChild(el('span', { text: `Localhost unavailable: ${state.lastLoadError}` }));
    return node;
  }

  function updateHeaderStatus() {
    const node = document.querySelector('#obs-planning-dashboard-source-status');
    if (!node) return;
    const label = state.sourceMode === 'live' ? '● Live'
      : state.sourceMode === 'offline-cache' ? '● Offline'
      : '● No data';
    const snapshot = state.snapshotSavedAt ? new Date(state.snapshotSavedAt).toLocaleString() : 'not available';
    node.setAttribute('data-mode', state.sourceMode || 'none');
    node.textContent = label;
    node.title = [
      `Mode: ${state.sourceMode || 'none'}`,
      `Snapshot: ${snapshot}`,
      state.lastLoadError ? `Last error: ${state.lastLoadError}` : ''
    ].filter(Boolean).join('\n');
  }

  function currentPendingExport() {
    const file = state.files.sessionDay;
    const date = dateFromOperationalPath(file?.path);
    const day = pendingDayForFile(file);
    if (!file || !date || !day) return null;
    const conflicts = day.sessions.filter((session) => session.status === 'conflict');
    if (conflicts.length) return { conflict: true, count: conflicts.length };
    const sessions = day.sessions.filter((session) => session.status === 'pending');
    if (!sessions.length) return null;
    return {
      schema: 'obs-session-sync-v1',
      exportedAt: new Date().toISOString(),
      date,
      operationalPath: day.operationalPath,
      source: day.source,
      sessions: sessions.map(({ status, ...session }) => session)
    };
  }

  function copyText(text) {
    try {
      if (typeof GM_setClipboard === 'function') GM_setClipboard(text);
      else navigator.clipboard.writeText(text);
      return true;
    } catch {
      navigator.clipboard.writeText(text).catch(() => {});
      return false;
    }
  }

  function copyPendingJson() {
    const payload = currentPendingExport();
    if (!payload) return alert('No pending sessions for the active operational day.');
    if (payload.conflict) return alert(`${payload.count} local session(s) are in conflict. Resolve or restore the guarded source before export.`);
    copyText(JSON.stringify(payload, null, 2));
    alert(`Copied ${payload.sessions.length} pending session(s). Export does not clear the outbox.`);
  }

  function downloadPendingJson() {
    const payload = currentPendingExport();
    if (!payload) return alert('No pending sessions for the active operational day.');
    if (payload.conflict) return alert(`${payload.count} local session(s) are in conflict. Resolve or restore the guarded source before export.`);
    const blob = new Blob([JSON.stringify(payload, null, 2) + '\n'], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `obs-session-sync-${payload.date}.json`;
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function getIndexBlock(text) {
    return String(text || '').match(/```text\s*([\s\S]*?)```/i)?.[1] || String(text || '');
  }

  function parseListAfter(block, key) {
    const lines = String(block || '').split(/\r?\n/);
    const output = [];
    let collecting = false;

    for (const line of lines) {
      if (!collecting) {
        if (line.match(new RegExp(`^${escapeRegExp(key)}:\\s*$`, 'i'))) collecting = true;
        continue;
      }

      if (/^\S/.test(line) && !/^\s*-\s+/.test(line)) break;
      const item = line.match(/^\s*-\s+(.+?)\s*$/)?.[1];
      if (item) output.push(item.trim());
    }

    return output;
  }

  function parseScalar(block, key) {
    return String(block || '').match(new RegExp(`^${escapeRegExp(key)}:\\s*(.*)$`, 'mi'))?.[1]?.trim() || '';
  }

  function parseIndex(text) {
    const block = getIndexBlock(text);
    return {
      previousYear: normalizeOptionalPath(parseScalar(block, 'previous_year')),
      year: normalizeOptionalPath(parseScalar(block, 'active_year')),
      period: normalizeOptionalPath(parseScalar(block, 'active_period')),
      week: normalizeOptionalPath(parseScalar(block, 'active_week')),
      day: normalizeOptionalPath(parseScalar(block, 'active_day')),
      sessionDay: normalizeOptionalPath(parseScalar(block, 'active_session_day')),
      goalMaps: parseListAfter(block, 'active_goal_maps').map(normalizeOptionalPath).filter(Boolean),
      deferredWork: normalizeOptionalPath(parseScalar(block, 'deferred_work')),
      deferredIdeas: normalizeOptionalPath(parseScalar(block, 'deferred_ideas'))
    };
  }

  function escapeRegExp(value) {
    return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function normalizeHeading(value) {
    return String(value || '')
      .toLowerCase()
      .replace(/[—–]/g, '-')
      .replace(/[^a-z0-9а-яё/ -]+/gi, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function parseMarkdownDocument(markdown) {
    const text = String(markdown || '').replace(/\r\n?/g, '\n');
    const lines = text.split('\n');
    const documentModel = {
      raw: text,
      title: 'Untitled',
      metadata: {},
      sections: [],
      preamble: []
    };

    let currentSection = null;
    let currentSubsection = null;
    let inFence = false;

    for (const line of lines) {
      if (/^```/.test(line.trim())) inFence = !inFence;

      const h1 = !inFence ? line.match(/^#\s+(.+?)\s*$/) : null;
      const h2 = !inFence ? line.match(/^##\s+(.+?)\s*$/) : null;
      const h3 = !inFence ? line.match(/^###\s+(.+?)\s*$/) : null;

      if (h1) {
        documentModel.title = h1[1].trim();
        continue;
      }

      if (h2) {
        currentSection = { title: h2[1].trim(), lines: [], subsections: [] };
        documentModel.sections.push(currentSection);
        currentSubsection = null;
        continue;
      }

      if (h3 && currentSection) {
        currentSubsection = { title: h3[1].trim(), lines: [] };
        currentSection.subsections.push(currentSubsection);
        continue;
      }

      if (!currentSection) {
        const metadata = !inFence ? line.match(/^([A-Za-zА-Яа-яЁё][A-Za-zА-Яа-яЁё0-9 _/-]{1,40}):\s*(.+?)\s*$/) : null;
        if (metadata) {
          documentModel.metadata[metadata[1].trim()] = metadata[2].trim();
        } else if (line.trim()) {
          documentModel.preamble.push(line);
        }
      } else if (currentSubsection) {
        currentSubsection.lines.push(line);
      } else {
        currentSection.lines.push(line);
      }
    }

    return documentModel;
  }

  function findSection(documentModel, query) {
    const normalizedQuery = normalizeHeading(query);
    return documentModel.sections.find((section) => normalizeHeading(section.title).includes(normalizedQuery)) || null;
  }

  function findSubsection(documentModel, query) {
    const normalizedQuery = normalizeHeading(query);
    for (const section of documentModel.sections) {
      const found = section.subsections.find((subsection) => normalizeHeading(subsection.title).includes(normalizedQuery));
      if (found) return found;
    }
    return null;
  }

  function trimBlankLines(lines) {
    const output = [...(lines || [])];
    while (output.length && !output[0].trim()) output.shift();
    while (output.length && !output[output.length - 1].trim()) output.pop();
    return output;
  }

  function stripOuterFence(lines) {
    const output = trimBlankLines(lines);
    if (output.length >= 2 && /^```/.test(output[0].trim()) && /^```\s*$/.test(output[output.length - 1].trim())) {
      return output.slice(1, -1);
    }
    return output;
  }

  function cleanCell(value) {
    return String(value || '')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/^\s+|\s+$/g, '')
      .replace(/^\*\*(.*?)\*\*$/s, '$1')
      .trim();
  }

  function splitTableRow(line) {
    const normalized = String(line || '').trim().replace(/^\|/, '').replace(/\|$/, '');
    const cells = [];
    let current = '';

    for (let index = 0; index < normalized.length; index += 1) {
      const char = normalized[index];
      if (char === '\\' && normalized[index + 1] === '|') {
        current += '|';
        index += 1;
        continue;
      }
      if (char === '|') {
        cells.push(cleanCell(current));
        current = '';
        continue;
      }
      current += char;
    }

    cells.push(cleanCell(current));
    return cells;
  }

  function isTableSeparator(line) {
    const cells = splitTableRow(line);
    return cells.length > 0 && cells.every((cell) => /^:?-{3,}:?$/.test(cell.replace(/\s/g, '')));
  }

  function parseFirstTable(lines) {
    const source = trimBlankLines(lines);
    for (let index = 0; index < source.length - 1; index += 1) {
      if (!source[index].includes('|') || !isTableSeparator(source[index + 1])) continue;

      const headers = splitTableRow(source[index]);
      const rows = [];
      let cursor = index + 2;
      while (cursor < source.length && source[cursor].includes('|') && source[cursor].trim()) {
        rows.push(splitTableRow(source[cursor]));
        cursor += 1;
      }
      return { headers, rows, start: index, end: cursor };
    }
    return null;
  }

  function appendInline(parent, value) {
    const text = String(value || '').replace(/<br\s*\/?>/gi, '\n');
    const tokenPattern = /(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
    let cursor = 0;
    let match;

    while ((match = tokenPattern.exec(text)) !== null) {
      appendPlainWithBreaks(parent, text.slice(cursor, match.index));
      const token = match[0];

      if (token.startsWith('`')) {
        parent.appendChild(el('code', { text: token.slice(1, -1) }));
      } else if (token.startsWith('**')) {
        parent.appendChild(el('strong', { text: token.slice(2, -2) }));
      } else {
        const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (linkMatch) {
          const anchor = el('a', { href: linkMatch[2], text: linkMatch[1], target: '_blank', rel: 'noopener noreferrer' });
          anchor.style.color = '#93c5fd';
          parent.appendChild(anchor);
        }
      }
      cursor = match.index + token.length;
    }

    appendPlainWithBreaks(parent, text.slice(cursor));
  }

  function appendPlainWithBreaks(parent, value) {
    const parts = String(value || '').split('\n');
    parts.forEach((part, index) => {
      if (index > 0) parent.appendChild(document.createElement('br'));
      if (part) parent.appendChild(document.createTextNode(part));
    });
  }

  function renderTable(table) {
    const wrapper = el('div', { class: 'obs-pd-table-wrap' });
    const tableNode = el('table', { class: 'obs-pd-table' });
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    table.headers.forEach((header) => {
      headerRow.appendChild(el('th', { text: header }));
    });
    thead.appendChild(headerRow);
    tableNode.appendChild(thead);

    const tbody = document.createElement('tbody');
    table.rows.forEach((row) => {
      const tr = document.createElement('tr');
      table.headers.forEach((_, index) => {
        const td = document.createElement('td');
        appendInline(td, row[index] || '');
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    tableNode.appendChild(tbody);
    wrapper.appendChild(tableNode);
    return wrapper;
  }

  function renderMarkdownLines(lines) {
    const container = document.createDocumentFragment();
    const source = stripOuterFence(lines);
    let index = 0;

    while (index < source.length) {
      const line = source[index];
      if (!line.trim()) {
        index += 1;
        continue;
      }

      if (/^```/.test(line.trim())) {
        const codeLines = [];
        index += 1;
        while (index < source.length && !/^```\s*$/.test(source[index].trim())) {
          codeLines.push(source[index]);
          index += 1;
        }
        if (index < source.length) index += 1;
        container.appendChild(el('pre', { class: 'obs-pd-code', text: codeLines.join('\n') }));
        continue;
      }

      if (index + 1 < source.length && line.includes('|') && isTableSeparator(source[index + 1])) {
        const table = parseFirstTable(source.slice(index));
        if (table) {
          container.appendChild(renderTable(table));
          index += table.end;
          continue;
        }
      }

      const minorHeading = line.match(/^####\s+(.+?)\s*$/);
      if (minorHeading) {
        container.appendChild(el('h4', { text: minorHeading[1] }));
        index += 1;
        continue;
      }

      if (/^\s*[-*]\s+/.test(line)) {
        const list = document.createElement('ul');
        while (index < source.length && /^\s*[-*]\s+/.test(source[index])) {
          const li = document.createElement('li');
          appendInline(li, source[index].replace(/^\s*[-*]\s+/, ''));
          list.appendChild(li);
          index += 1;
        }
        container.appendChild(list);
        continue;
      }

      if (/^\s*\d+\.\s+/.test(line)) {
        const list = document.createElement('ol');
        while (index < source.length && /^\s*\d+\.\s+/.test(source[index])) {
          const li = document.createElement('li');
          appendInline(li, source[index].replace(/^\s*\d+\.\s+/, ''));
          list.appendChild(li);
          index += 1;
        }
        container.appendChild(list);
        continue;
      }

      const paragraphLines = [line];
      index += 1;
      while (
        index < source.length &&
        source[index].trim() &&
        !/^```/.test(source[index].trim()) &&
        !/^####\s+/.test(source[index]) &&
        !/^\s*[-*]\s+/.test(source[index]) &&
        !/^\s*\d+\.\s+/.test(source[index]) &&
        !(index + 1 < source.length && source[index].includes('|') && isTableSeparator(source[index + 1]))
      ) {
        paragraphLines.push(source[index]);
        index += 1;
      }

      const paragraph = document.createElement('p');
      appendInline(paragraph, paragraphLines.join('\n'));
      container.appendChild(paragraph);
    }

    if (!source.length) {
      container.appendChild(el('div', { class: 'obs-pd-empty', text: 'not provided' }));
    }

    return container;
  }

  function metadataValue(documentModel, ...keys) {
    const entries = Object.entries(documentModel.metadata);
    for (const key of keys) {
      const normalizedKey = normalizeHeading(key);
      const found = entries.find(([candidate]) => normalizeHeading(candidate) === normalizedKey);
      if (found) return found[1];
    }
    return '';
  }

  function renderDocumentHeader(documentModel) {
    const header = el('div', { class: 'obs-pd-document-header' });
    header.appendChild(el('h1', { text: documentModel.title }));

    const badges = el('div', { class: 'obs-pd-badges' });
    const status = metadataValue(documentModel, 'Status');
    const scopeType = metadataValue(documentModel, 'Scope Type');
    const scopeAnchor = metadataValue(documentModel, 'Scope Anchor');
    const version = metadataValue(documentModel, 'Doc version');

    if (status) badges.appendChild(el('span', { class: 'obs-pd-badge', 'data-kind': 'status', text: status }));
    if (scopeType) badges.appendChild(el('span', { class: 'obs-pd-badge', 'data-kind': 'scope', text: scopeType }));
    if (scopeAnchor) badges.appendChild(el('span', { class: 'obs-pd-badge', text: scopeAnchor }));
    if (version) badges.appendChild(el('span', { class: 'obs-pd-badge', text: version }));

    for (const [key, value] of Object.entries(documentModel.metadata)) {
      if (['status', 'scope type', 'scope anchor', 'doc version'].includes(normalizeHeading(key))) continue;
      badges.appendChild(el('span', { class: 'obs-pd-badge', text: `${key}: ${value}` }));
    }

    if (badges.childNodes.length) header.appendChild(badges);
    return header;
  }

  const PLAN_LEVEL_DEFINITIONS = [
    ['minimum', 'Minimum', 'M'],
    ['base', 'Base', 'B'],
    ['desired', 'Desired', 'D'],
    ['max', 'Max / Very Wide', 'X']
  ];

  function scenarioKind(title) {
    const normalized = normalizeHeading(title);
    if (normalized.includes('minimum')) return 'minimum';
    if (normalized === 'base' || normalized.includes(' base')) return 'base';
    if (normalized.includes('desired')) return 'desired';
    if (normalized.includes('max') || normalized.includes('very wide')) return 'max';
    return 'other';
  }

  function isPlanningContentLine(line) {
    const text = String(line || '').trim();
    return Boolean(text)
      && !/^```/.test(text)
      && !/^USER INPUT:?$/i.test(text)
      && !/^AI ASSUMPTIONS(?:\s*\/\s*SUGGESTIONS)?:?$/i.test(text)
      && !/^\|?\s*:?-+/.test(text)
      && !OPTIONAL_EMPTY_VALUES.has(text.toLowerCase());
  }

  function meaningfulLineCount(lines) {
    return trimBlankLines(lines).filter(isPlanningContentLine).length;
  }

  function planningItemsFromLines(lines) {
    const items = [];
    let source = 'source';
    let inFence = false;
    for (const rawLine of lines || []) {
      const text = String(rawLine || '').trim();
      if (/^USER INPUT:?$/i.test(text)) {
        source = 'user';
        continue;
      }
      if (/^AI ASSUMPTIONS(?:\s*\/\s*SUGGESTIONS)?:?$/i.test(text)) {
        source = 'ai';
        continue;
      }
      if (/^```/.test(text)) {
        inFence = !inFence;
        continue;
      }
      if (!text || OPTIONAL_EMPTY_VALUES.has(text.toLowerCase())) continue;
      if (/^\|/.test(text) || /^:?-{3,}/.test(text)) continue;
      const bullet = text.match(/^[-*]\s+(.+?)\s*$/)?.[1];
      if (bullet) {
        items.push({ text: bullet, source });
      } else if (inFence && !/:\s*$/.test(text)) {
        items.push({ text, source });
      }
    }
    return items;
  }

  function planDisclosure(section, key, defaultOpen, bodyFactory, metaText) {
    const details = el('details', { class: 'obs-pd-plan-disclosure' });
    details.open = state[key] ?? defaultOpen;
    const summary = el('summary', { class: 'obs-pd-plan-summary' });
    summary.appendChild(el('span', { text: section.title }));
    if (metaText) summary.appendChild(el('span', { class: 'obs-pd-plan-meta', text: metaText }));
    details.appendChild(summary);
    const body = el('div', { class: 'obs-pd-plan-body' });
    body.appendChild(bodyFactory());
    details.appendChild(body);
    details.addEventListener('toggle', () => { state[key] = details.open; });
    return details;
  }

  function renderPlanCore(section) {
    return planDisclosure(section, 'planCoreOpen', true, () => {
      const fragment = document.createDocumentFragment();
      if (trimBlankLines(section.lines).length) fragment.appendChild(renderMarkdownLines(section.lines));
      section.subsections.forEach((subsection) => {
        const level = scenarioKind(subsection.title);
        const block = el('section', { class: 'obs-pd-plan-level', 'data-level': level });
        block.appendChild(el('div', { class: 'obs-pd-plan-level-head' }, [
          el('span', { class: 'obs-pd-level-badge', text: level.toUpperCase() }),
          el('h3', { text: subsection.title })
        ]));
        const body = el('div', { class: 'obs-pd-plan-items' });
        body.appendChild(renderMarkdownLines(subsection.lines));
        block.appendChild(body);
        fragment.appendChild(block);
      });
      return fragment;
    }, `${section.subsections.length} levels`);
  }

  function renderSectionBodyOnly(section) {
    const fragment = document.createDocumentFragment();
    if (trimBlankLines(section.lines).length) fragment.appendChild(renderMarkdownLines(section.lines));
    section.subsections.forEach((subsection) => {
      fragment.appendChild(el('h3', { text: subsection.title }));
      fragment.appendChild(renderMarkdownLines(subsection.lines));
    });
    if (!trimBlankLines(section.lines).length && !section.subsections.length) {
      fragment.appendChild(el('div', { class: 'obs-pd-empty', text: 'not provided' }));
    }
    return fragment;
  }

  function normalizedPlanItemText(text) {
    return String(text || '').trim().toLowerCase().replace(/\s+/g, ' ');
  }

  function parsePlanItemIdentity(text, fallbackId) {
    const originalText = String(text || '').trim();
    const match = originalText.match(/^\s*(?:\[\s*)?([MBDX]\d+)(?:\s*\])?\s*(?:[:.)\-–—]\s*)?(.+)$/i);
    if (match?.[2]?.trim()) {
      return {
        id: match[1].toUpperCase(),
        text: match[2].trim(),
        explicitId: true,
        originalText
      };
    }
    return {
      id: fallbackId,
      text: originalText,
      explicitId: false,
      originalText
    };
  }

  function planItemKey(item) {
    if (item.explicitId) return `plan:${item.level}:id:${item.id.toUpperCase()}`;
    return `plan:${item.level}:text:${stableHash(normalizedPlanItemText(item.text))}`;
  }

  function planItemLegacyKeys(item) {
    const aliases = [
      `${item.kind}:${item.fallbackId || item.id}:${stableHash(item.originalText || item.text)}`
    ];
    if (item.explicitId) aliases.push(`plan:${item.level}:${item.id}`);
    return [...new Set(aliases.filter(Boolean))];
  }

  function localPlanItemRecord(localDay, item) {
    const items = localDay?.planItems || {};
    if (items[item.key]) return { key: item.key, value: items[item.key] };
    for (const alias of item.legacyKeys || []) {
      if (items[alias]) return { key: alias, value: items[alias] };
    }
    if (item.explicitId) {
      const matches = Object.entries(items).filter(([, value]) => (
        value?.sourceItemExplicitId === true
        && value?.sourceItemId === item.id
        && value?.sourceLevel === item.level
      ));
      if (matches.length === 1) return { key: matches[0][0], value: matches[0][1] };
    }
    return { key: null, value: {} };
  }


  function createLocalEntityId(prefix) {
    const randomId = globalThis.crypto?.randomUUID?.()
      || `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
    return `${prefix}-${randomId}`;
  }

  function planLevelPrefix(level) {
    return PLAN_LEVEL_DEFINITIONS.find(([key]) => key === level)?.[2] || 'L';
  }

  function nextLocalPlanItemLabel(day, level) {
    const prefix = `${planLevelPrefix(level)}L`;
    const used = new Set(Object.values(day.localPlanItems || {}).map((item) => String(item?.label || '').toUpperCase()));
    let number = 1;
    while (used.has(`${prefix}${number}`.toUpperCase())) number += 1;
    return `${prefix}${number}`;
  }

  function createLocalPlanItem(file, level) {
    const text = String(prompt(`New ${level} plan item`, '') || '').trim();
    if (!text) return null;
    let created = null;
    updateLocalDayState(file, (day) => {
      const id = createLocalEntityId('plan');
      const now = new Date().toISOString();
      created = {
        id,
        label: nextLocalPlanItemLabel(day, level),
        level,
        text,
        order: Object.keys(day.localPlanItems || {}).length + 1,
        createdAt: now,
        updatedAt: now
      };
      day.localPlanItems[id] = created;
    });
    render();
    return created;
  }

  function updateLocalPlanDefinition(file, item, patch) {
    if (!item.localId) return;
    updateLocalDayState(file, (day) => {
      const current = day.localPlanItems[item.localId];
      if (!current) throw new Error('Local plan item no longer exists.');
      day.localPlanItems[item.localId] = { ...current, ...patch, updatedAt: new Date().toISOString() };
    });
  }

  function editLocalPlanItem(file, item) {
    const text = String(prompt(`Edit ${item.id}`, item.text) || '').trim();
    if (!text || text === item.text) return;
    updateLocalPlanDefinition(file, item, { text });
    render();
  }

  function deleteLocalPlanItem(file, item) {
    if (!item.localId || !confirm(`Delete local plan item ${item.id}? Linked Goal Maps are kept as local drafts.`)) return;
    updateLocalDayState(file, (day) => {
      delete day.localPlanItems[item.localId];
      delete day.planItems[item.key];
      Object.values(day.scopeUnits || {}).forEach((unit) => {
        if (unit.targetItemKey === item.key) {
          unit.targetItemKey = '';
          unit.targetItemId = '';
          unit.targetItemLevel = '';
          unit.targetItemExplicitId = false;
        }
      });
      Object.values(day.legacyLinks || {}).forEach((link) => {
        if (link.targetItemKey === item.key) {
          link.targetItemKey = '';
          link.targetItemId = '';
          link.targetItemLevel = '';
          link.targetItemExplicitId = false;
        }
      });
    });
    render();
  }

  function sortedLocalSessions(localDay) {
    return Object.values(localDay?.localSessions || {})
      .filter((session) => session && session.id)
      .sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0) || String(a.label || '').localeCompare(String(b.label || '')));
  }

  function nextLocalSessionLabel(day) {
    const used = new Set(Object.values(day.localSessions || {}).map((session) => String(session?.label || '').toUpperCase()));
    let number = 1;
    while (used.has(`S${number}`)) number += 1;
    return `S${number}`;
  }

  function createLocalSession(file) {
    let created = null;
    updateLocalDayState(file, (day) => {
      const id = createLocalEntityId('session');
      const label = nextLocalSessionLabel(day);
      const now = new Date().toISOString();
      created = {
        id,
        label,
        title: `Session ${label}`,
        expectedResult: '',
        note: '',
        order: Object.keys(day.localSessions || {}).length + 1,
        createdAt: now,
        updatedAt: now
      };
      day.localSessions[id] = created;
    });
    render();
    return created;
  }

  function updateLocalSession(file, sessionId, patch) {
    updateLocalDayState(file, (day) => {
      const current = day.localSessions?.[sessionId];
      if (!current) throw new Error('Local session no longer exists.');
      day.localSessions[sessionId] = { ...current, ...patch, updatedAt: new Date().toISOString() };
    });
  }

  function deleteLocalSession(file, sessionId) {
    const session = readLocalDayState(file).localSessions?.[sessionId];
    if (!session || !confirm(`Delete ${session.label}? Plan items assigned to it will become unassigned.`)) return;
    updateLocalDayState(file, (day) => {
      delete day.localSessions[sessionId];
      const now = new Date().toISOString();
      Object.values(day.planItems || {}).forEach((item) => {
        if (item.executionMode === 'sessions' && item.sessionId === sessionId) {
          item.executionMode = '';
          item.sessionId = '';
          item.timeStart = '';
          item.timeEnd = '';
          item.updatedAt = now;
        }
      });
    });
    render();
  }

  function normalizedScopeUnitText(text) {
    return String(text || '').trim().toLowerCase().replace(/\s+/g, ' ');
  }

  function parseScopeUnitIdentity(row, table, index) {
    const rawUnit = cleanCell(exactRowValue(row, table, ['Unit'])) || `Scope Unit ${index + 1}`;
    const separateId = cleanCell(exactRowValue(row, table, ['ID']));
    const idPattern = /^[A-Z][A-Z0-9_-]*\d+$/i;
    const prefixed = rawUnit.match(/^\s*(?:\[\s*)?([A-Z][A-Z0-9_-]*\d+)(?:\s*\])?\s*(?:(?:[:.)\-–—])\s*(.*))?$/i);

    let authoredId = '';
    let unitText = rawUnit;
    if (separateId && idPattern.test(separateId)) {
      authoredId = separateId.toUpperCase();
      unitText = rawUnit && rawUnit.toUpperCase() !== authoredId ? rawUnit : authoredId;
    } else if (prefixed && idPattern.test(prefixed[1])) {
      authoredId = prefixed[1].toUpperCase();
      unitText = String(prefixed[2] || prefixed[1]).trim();
    }

    const fallbackId = `SU${index + 1}`;
    const explicitId = Boolean(authoredId);
    const id = authoredId || fallbackId;
    const textValue = unitText || rawUnit || fallbackId;
    const key = explicitId
      ? `scope:id:${id}`
      : `scope:text:${stableHash(normalizedScopeUnitText(textValue))}`;

    return {
      id,
      fallbackId,
      explicitId,
      text: textValue,
      originalUnit: rawUnit,
      key,
      legacyKeys: []
    };
  }

  function scopeUnitLegacyKeys(unit, row, table, index) {
    const rawUnit = exactRowValue(row, table, ['Unit', 'ID']);
    const windowValue = exactRowValue(row, table, ['Window']);
    const goals = exactRowValue(row, table, ['Goal(s)', 'Goals', 'Goal', 'Target']);
    const aliases = [
      `SU${index + 1}:${stableHash(`${rawUnit}|${windowValue}|${goals}`)}`
    ];
    if (unit.explicitId) aliases.push(`scope:${unit.id}`);
    return [...new Set(aliases.filter(Boolean))];
  }

  function localScopeUnitRecord(localDay, unit) {
    const units = localDay?.scopeUnits || {};
    if (units[unit.key]) return { key: unit.key, value: units[unit.key] };
    for (const alias of unit.legacyKeys || []) {
      if (units[alias]) return { key: alias, value: units[alias] };
    }
    if (unit.explicitId) {
      const matches = Object.entries(units).filter(([, value]) => (
        value?.sourceUnitExplicitId === true
        && value?.sourceUnitId === unit.id
      ));
      if (matches.length === 1) return { key: matches[0][0], value: matches[0][1] };
    }
    return { key: null, value: {} };
  }

  function legacyMaterialKey(kind, id, text) {
    return `legacy:${kind}:${String(id || 'item').toUpperCase()}:${stableHash(normalizedPlanItemText(text))}`;
  }

  function collectPlanWorkspaceModel(documentModel, localDay = {}) {
    const levels = Object.fromEntries(PLAN_LEVEL_DEFINITIONS.map(([key, label, prefix]) => [key, { key, label, prefix, items: [] }]));
    const planCore = findSection(documentModel, 'plan core');
    if (planCore) {
      for (const subsection of planCore.subsections) {
        const level = scenarioKind(subsection.title);
        if (!levels[level]) continue;
        planningItemsFromLines(subsection.lines).forEach((sourceItem, index) => {
          const fallbackId = `${levels[level].prefix}${index + 1}`;
          const identity = parsePlanItemIdentity(sourceItem.text, fallbackId);
          const entry = {
            kind: 'plan',
            id: identity.id,
            fallbackId,
            explicitId: identity.explicitId,
            originalText: identity.originalText,
            level,
            text: identity.text,
            source: sourceItem.source,
            sourceDone: false
          };
          entry.key = planItemKey(entry);
          entry.legacyKeys = planItemLegacyKeys(entry);
          levels[level].items.push(entry);
        });
      }
    }

    const legacyAcceptance = [];
    const acceptanceSection = findSection(documentModel, 'acceptance criteria');
    const acceptanceTable = acceptanceSection ? parseFirstTable(acceptanceSection.lines) : null;
    (acceptanceTable?.rows || []).filter(isMeaningfulDataRow).forEach((row, index) => {
      const id = cleanCell(exactRowValue(row, acceptanceTable, ['AC', 'ID'])) || `AC${index + 1}`;
      const criterion = cleanCell(exactRowValue(row, acceptanceTable, ['Criterion', 'Criteria', 'Goal']));
      const verifiable = cleanCell(exactRowValue(row, acceptanceTable, ['Verifiable Result', 'Result', 'Expected Result']));
      const status = cleanCell(exactRowValue(row, acceptanceTable, ['Status']));
      const text = verifiable && !OPTIONAL_EMPTY_VALUES.has(verifiable.toLowerCase()) ? verifiable : criterion;
      if (!text || OPTIONAL_EMPTY_VALUES.has(text.toLowerCase())) return;
      legacyAcceptance.push({
        kind: 'acceptance',
        id,
        text,
        source: criterion && criterion !== text ? criterion : 'repository Acceptance Criteria',
        sourceDone: /^(done|complete|completed|passed|met|yes)$/i.test(status),
        key: legacyMaterialKey('acceptance', id, text)
      });
    });

    const legacyEvidence = [];
    const doneSection = findSection(documentModel, 'done / evidence') || findSection(documentModel, 'done evidence');
    planningItemsFromLines(doneSection?.lines || []).forEach((sourceItem, index) => {
      const id = `E${index + 1}`;
      legacyEvidence.push({
        kind: 'evidence',
        id,
        text: sourceItem.text,
        source: 'repository Done / Evidence',
        sourceDone: true,
        key: legacyMaterialKey('evidence', id, sourceItem.text)
      });
    });

    const scopeSection = findSection(documentModel, 'scope units');
    const scopeTable = scopeSection ? parseFirstTable(scopeSection.lines) : null;
    const scopeRows = (scopeTable?.rows || []).filter(isMeaningfulDataRow);
    const scopeUnits = scopeRows.map((row, index) => {
      const identity = parseScopeUnitIdentity(row, scopeTable, index);
      identity.legacyKeys = scopeUnitLegacyKeys(identity, row, scopeTable, index);
      return { row, index, identity };
    });
    const generatedIdentityCounts = new Map();
    scopeUnits.forEach(({ identity }) => {
      if (identity.explicitId) return;
      generatedIdentityCounts.set(identity.key, (generatedIdentityCounts.get(identity.key) || 0) + 1);
    });
    scopeUnits.forEach(({ identity }) => {
      identity.ambiguous = !identity.explicitId && (generatedIdentityCounts.get(identity.key) || 0) > 1;
    });

    Object.values(localDay.localPlanItems || {})
      .filter((item) => item && levels[item.level] && String(item.text || '').trim())
      .sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0) || String(a.label || '').localeCompare(String(b.label || '')))
      .forEach((definition) => {
        const entry = {
          kind: 'local',
          localId: definition.id,
          local: true,
          id: definition.label || `${planLevelPrefix(definition.level)}L`,
          fallbackId: definition.label || `${planLevelPrefix(definition.level)}L`,
          explicitId: false,
          originalText: definition.text,
          level: definition.level,
          text: definition.text,
          source: 'local plan item',
          sourceDone: false,
          key: `local-plan:${definition.id}`,
          legacyKeys: []
        };
        levels[definition.level].items.push(entry);
      });

    const targetItems = PLAN_LEVEL_DEFINITIONS.flatMap(([key]) => levels[key].items);

    return {
      levels,
      legacyAcceptance,
      legacyEvidence,
      targetItems,
      scopeSection,
      scopeTable,
      scopeRows,
      scopeUnits
    };
  }

  function resolveLinkedPlanItem(targetItems, link) {
    if (!link) return null;
    const exact = targetItems.find((item) => (
      item.key === link.targetItemKey
      || (item.legacyKeys || []).includes(link.targetItemKey)
    ));
    if (exact) return exact;
    if (link.targetItemExplicitId === true) {
      return targetItems.find((item) => (
        item.explicitId
        && item.id === link.targetItemId
        && item.level === link.targetItemLevel
      )) || null;
    }
    return null;
  }

  function legacyMaterialForPlanItem(workspace, localDay, item) {
    const linked = (entry) => {
      const link = localDay?.legacyLinks?.[entry.key];
      const target = resolveLinkedPlanItem(workspace.targetItems, link);
      return target?.key === item.key;
    };
    return {
      acceptance: workspace.legacyAcceptance.filter(linked),
      evidence: workspace.legacyEvidence.filter(linked)
    };
  }

  function updateLegacyMaterialLink(file, entry, target) {
    updateLocalDayState(file, (day) => {
      if (!day.legacyLinks || typeof day.legacyLinks !== 'object') day.legacyLinks = {};
      if (!target) {
        delete day.legacyLinks[entry.key];
        return;
      }
      day.legacyLinks[entry.key] = {
        targetItemKey: target.key,
        targetItemId: target.id,
        targetItemLevel: target.level,
        targetItemExplicitId: Boolean(target.explicitId),
        updatedAt: new Date().toISOString()
      };
    });
  }

  function updateLocalPlanItem(file, item, patch) {
    updateLocalDayState(file, (day) => {
      const record = localPlanItemRecord(day, item);
      day.planItems[item.key] = {
        ...(record.value || {}),
        ...patch,
        sourceItemId: item.id,
        sourceLevel: item.level,
        sourceItemExplicitId: Boolean(item.explicitId),
        sourceText: item.text,
        sourceTextHash: stableHash(normalizedPlanItemText(item.text)),
        updatedAt: new Date().toISOString()
      };
      if (record.key && record.key !== item.key) delete day.planItems[record.key];
    });
  }

  function localGoalMapForItem(file, item) {
    const store = readLocalPlanningStore();
    const day = store.days[planningDayIdentity(file).key];
    const record = localPlanItemRecord(day, item);
    const goalMapId = record.value?.goalMapId;
    return goalMapId ? store.goalMaps?.[goalMapId] || null : null;
  }

  function ensureLocalGoalMap(file, item) {
    const store = readLocalPlanningStore();
    const day = ensureLocalDayState(store, file);
    const record = localPlanItemRecord(day, item);
    const itemState = record.value || {};
    let map = itemState.goalMapId ? store.goalMaps[itemState.goalMapId] : null;
    if (!map) {
      const identity = planningDayIdentity(file);
      const id = `GM-${identity.date}-${item.id}-${stableHash(`${identity.path}:${item.key}`).slice(0, 6)}`;
      const now = new Date().toISOString();
      map = {
        id,
        title: `Goal Map — ${item.id}`,
        goal: item.text,
        sourceDay: identity.date,
        sourcePath: identity.path,
        sourceItemId: item.id,
        sourceItemKey: item.key,
        sourceLevel: item.level,
        sourceItemExplicitId: Boolean(item.explicitId),
        status: 'local draft',
        why: '',
        success: '',
        currentState: '',
        unknowns: '',
        approaches: '',
        steps: '',
        checks: '',
        risks: '',
        resultsEvidence: '',
        createdAt: now,
        updatedAt: now
      };
      store.goalMaps[id] = map;
      day.planItems[item.key] = {
        ...itemState,
        goalMapId: id,
        sourceItemId: item.id,
        sourceLevel: item.level,
        sourceItemExplicitId: Boolean(item.explicitId),
        sourceText: item.text,
        sourceTextHash: stableHash(normalizedPlanItemText(item.text)),
        updatedAt: now
      };
      if (record.key && record.key !== item.key) delete day.planItems[record.key];
      if (!day.goalMapIds.includes(id)) day.goalMapIds.push(id);
      day.updatedAt = now;
      if (!writeLocalPlanningStore(store)) {
        throw new Error('Could not save the new local Goal Map.');
      }
    } else {
      const now = new Date().toISOString();
      const sourceChanged = map.sourceItemKey !== item.key
        || map.sourceItemId !== item.id
        || map.sourceLevel !== item.level
        || map.sourceItemExplicitId !== Boolean(item.explicitId);
      const recordNeedsMigration = record.key && record.key !== item.key;
      if (sourceChanged || recordNeedsMigration) {
        map = {
          ...map,
          title: `Goal Map — ${item.id}`,
          sourceItemId: item.id,
          sourceItemKey: item.key,
          sourceLevel: item.level,
          sourceItemExplicitId: Boolean(item.explicitId),
          updatedAt: now
        };
        store.goalMaps[map.id] = map;
        day.planItems[item.key] = {
          ...itemState,
          goalMapId: map.id,
          sourceItemId: item.id,
          sourceLevel: item.level,
          sourceItemExplicitId: Boolean(item.explicitId),
          sourceText: item.text,
          sourceTextHash: stableHash(normalizedPlanItemText(item.text)),
          updatedAt: now
        };
        if (recordNeedsMigration) delete day.planItems[record.key];
        day.updatedAt = now;
        if (!writeLocalPlanningStore(store)) {
          throw new Error('Could not update the local Goal Map source identity.');
        }
      }
    }
    state.activeLocalGoalMapId = map.id;
    state.activeTab = 'goalMaps';
    render();
    window.requestAnimationFrame(() => {
      document.querySelector(`[data-local-goal-map-id="${map.id}"]`)?.scrollIntoView({ block: 'start' });
    });
    return map;
  }

  function renderLinkedRepositoryMaterial(attached) {
    if (!attached.acceptance.length && !attached.evidence.length) return null;
    const block = el('section', { class: 'obs-pd-linked-material' });
    if (attached.acceptance.length) {
      block.appendChild(el('h4', { text: 'Linked repository acceptance' }));
      const list = el('div', { class: 'obs-pd-linked-material-list' });
      attached.acceptance.forEach((entry) => list.appendChild(el('div', {
        class: 'obs-pd-linked-material-item',
        text: `${entry.id}: ${entry.text}`
      })));
      block.appendChild(list);
    }
    if (attached.evidence.length) {
      block.appendChild(el('h4', { text: 'Repository evidence' }));
      const list = el('div', { class: 'obs-pd-linked-material-list' });
      attached.evidence.forEach((entry) => list.appendChild(el('div', {
        class: 'obs-pd-linked-material-item',
        text: `${entry.id}: ${entry.text}`
      })));
      block.appendChild(list);
    }
    return block;
  }

  function planAssignmentSummary(localDay, workspace, item) {
    const local = localPlanItemRecord(localDay, item).value || {};
    if (local.executionMode === 'sessions' && local.sessionId) {
      const session = localDay.localSessions?.[local.sessionId];
      return session ? session.label : 'missing session';
    }
    if (local.executionMode === 'hours' && (local.timeStart || local.timeEnd)) {
      return `${local.timeStart || '…'}–${local.timeEnd || '…'}`;
    }
    return '';
  }

  function renderPlanAssignmentEditor(file, item, localDay, workspace) {
    const local = localPlanItemRecord(localDay, item).value || {};
    const mode = ['sessions', 'hours'].includes(local.executionMode) ? local.executionMode : '';
    const block = el('section', { class: 'obs-pd-assignment' });
    const modeSelect = el('select', { class: 'obs-pd-local-select', 'aria-label': `Planning type for ${item.id}` });
    modeSelect.appendChild(el('option', { value: '', text: 'Not assigned' }));
    modeSelect.appendChild(el('option', { value: 'sessions', text: 'Session number · S1, S2…' }));
    modeSelect.appendChild(el('option', { value: 'hours', text: 'Time · clock range' }));
    modeSelect.value = mode;
    modeSelect.addEventListener('change', () => {
      const nextMode = modeSelect.value;
      const patch = { executionMode: nextMode };
      if (nextMode === 'sessions') {
        patch.timeStart = '';
        patch.timeEnd = '';
      } else if (nextMode === 'hours') {
        patch.sessionId = '';
      } else {
        patch.sessionId = '';
        patch.timeStart = '';
        patch.timeEnd = '';
      }
      updateLocalPlanItem(file, item, patch);
      render();
    });
    block.appendChild(el('label', { class: 'obs-pd-field-label', text: 'Plan this item by · local only' }, [modeSelect]));

    if (mode === 'sessions') {
      const sessions = sortedLocalSessions(localDay);
      const row = el('div', { class: 'obs-pd-assignment-grid' });
      const select = el('select', { class: 'obs-pd-local-select', 'aria-label': `Session for ${item.id}` });
      select.appendChild(el('option', { value: '', text: 'Choose session number' }));
      sessions.forEach((session) => select.appendChild(el('option', {
        value: session.id,
        text: `${session.label} · ${session.title || `Session ${session.label}`}`
      })));
      select.value = sessions.some((session) => session.id === local.sessionId) ? local.sessionId : '';
      select.addEventListener('change', () => {
        updateLocalPlanItem(file, item, {
          executionMode: 'sessions',
          sessionId: select.value,
          timeStart: '',
          timeEnd: ''
        });
        render();
      });
      row.appendChild(el('label', { class: 'obs-pd-field-label', text: 'Session' }, [select]));
      row.appendChild(el('button', { class: 'obs-pd-btn', text: '+ Add session', onclick: () => createLocalSession(file) }));
      block.appendChild(row);
      if (!sessions.length) block.appendChild(el('div', { class: 'obs-pd-workspace-hint', text: 'Create S1, S2… and assign this item to one numbered session.' }));
      return block;
    }

    if (mode === 'hours') {
      const row = el('div', { class: 'obs-pd-assignment-grid' });
      const start = el('input', { class: 'obs-pd-local-time', type: 'time', 'aria-label': `Start time for ${item.id}` });
      const end = el('input', { class: 'obs-pd-local-time', type: 'time', 'aria-label': `End time for ${item.id}` });
      start.value = local.timeStart || '';
      end.value = local.timeEnd || '';
      row.appendChild(el('label', { class: 'obs-pd-field-label', text: 'Start time' }, [start]));
      row.appendChild(el('label', { class: 'obs-pd-field-label', text: 'End time' }, [end]));
      block.appendChild(row);
      block.appendChild(el('div', { class: 'obs-pd-item-actions' }, [
        el('button', {
          class: 'obs-pd-btn',
          text: 'Apply time',
          onclick: () => {
            const timeStart = start.value;
            const timeEnd = end.value;
            if (!timeStart || !timeEnd) {
              alert('Choose both start and end time.');
              return;
            }
            if (timeEnd <= timeStart) {
              alert('End time must be later than start time.');
              return;
            }
            updateLocalPlanItem(file, item, {
              executionMode: 'hours',
              sessionId: '',
              timeStart,
              timeEnd
            });
            render();
          }
        }),
        el('button', {
          class: 'obs-pd-btn',
          text: 'Clear time',
          onclick: () => {
            updateLocalPlanItem(file, item, {
              executionMode: '',
              sessionId: '',
              timeStart: '',
              timeEnd: ''
            });
            render();
          }
        })
      ]));
      return block;
    }

    block.appendChild(el('div', { class: 'obs-pd-workspace-hint', text: 'Choose whether this item is planned on a numbered session or directly on time.' }));
    return block;
  }

  function renderPlanItem(file, item, localDay, workspace) {
    const local = localPlanItemRecord(localDay, item).value || {};
    const attached = legacyMaterialForPlanItem(workspace, localDay, item);
    const repositoryDone = item.sourceDone
      || attached.evidence.length > 0
      || attached.acceptance.some((entry) => entry.sourceDone);
    const done = repositoryDone || Boolean(local.done);
    const card = el('article', {
      class: 'obs-pd-plan-item',
      'data-level': item.level,
      'data-plan-item-key': item.key,
      'data-plan-item-explicit-id': String(Boolean(item.explicitId)),
      'data-done': String(done)
    });
    const main = el('div', { class: 'obs-pd-plan-item-main' });
    const checkbox = el('input', {
      class: 'obs-pd-plan-check',
      type: 'checkbox',
      'aria-label': `Mark ${item.id} complete`
    });
    checkbox.checked = done;
    checkbox.disabled = repositoryDone;
    checkbox.addEventListener('change', () => {
      updateLocalPlanItem(file, item, { done: checkbox.checked });
      card.dataset.done = String(checkbox.checked);
    });
    main.appendChild(checkbox);

    const copy = el('div', { class: 'obs-pd-plan-item-copy' });
    copy.appendChild(el('div', { class: 'obs-pd-plan-item-id', text: `${item.id} · ${item.level}` }));
    copy.appendChild(el('div', { class: 'obs-pd-plan-item-text', text: item.text }));
    if (item.source) copy.appendChild(el('div', { class: 'obs-pd-plan-item-source', text: item.source }));
    main.appendChild(copy);
    const assignmentSummary = planAssignmentSummary(localDay, workspace, item);
    if (assignmentSummary) main.appendChild(el('span', { class: 'obs-pd-assignment-pill', text: assignmentSummary }));
    else if (item.local) main.appendChild(el('span', { class: 'obs-pd-local-item-badge', text: 'local' }));
    else if (repositoryDone) main.appendChild(el('span', { class: 'obs-pd-status-pill', 'data-kind': 'repository', text: 'done from source' }));
    card.appendChild(main);

    const details = el('details', { class: 'obs-pd-plan-item-details' });
    const linkedMap = localGoalMapForItem(file, item);
    const sourceMeta = [
      attached.acceptance.length ? `${attached.acceptance.length} acceptance` : '',
      attached.evidence.length ? `${attached.evidence.length} evidence` : ''
    ].filter(Boolean).join(' · ');
    details.appendChild(el('summary', {
      text: [
        'Planning · Note · Evidence',
        sourceMeta,
        linkedMap ? `Goal Map ${linkedMap.id}` : 'Goal Map'
      ].filter(Boolean).join(' · ')
    }));
    const editor = el('div', { class: 'obs-pd-plan-item-editor' });

    const linkedMaterial = renderLinkedRepositoryMaterial(attached);
    if (linkedMaterial) editor.appendChild(linkedMaterial);

    editor.appendChild(renderPlanAssignmentEditor(file, item, localDay, workspace));

    const note = el('textarea', {
      class: 'obs-pd-local-textarea',
      placeholder: 'Local note for this plan item…',
      'aria-label': `Local note for ${item.id}`
    });
    note.value = local.note || '';
    bindDebouncedLocalInput(note, (value) => updateLocalPlanItem(file, item, { note: value }));
    editor.appendChild(el('label', { class: 'obs-pd-field-label', text: 'Local note · local only' }, [note]));

    const evidence = el('textarea', {
      class: 'obs-pd-local-textarea',
      placeholder: 'Evidence, links, session IDs or result notes…',
      'aria-label': `Evidence for ${item.id}`
    });
    evidence.value = local.evidence || '';
    bindDebouncedLocalInput(evidence, (value) => updateLocalPlanItem(file, item, { evidence: value }));
    editor.appendChild(el('label', { class: 'obs-pd-field-label', text: 'Local evidence · local only' }, [evidence]));

    const actions = el('div', { class: 'obs-pd-item-actions' });
    actions.appendChild(el('button', {
      class: 'obs-pd-btn',
      text: linkedMap ? 'Open Goal Map' : 'Expand to Goal Map',
      onclick: () => {
        try {
          ensureLocalGoalMap(file, item);
        } catch (error) {
          console.warn('OBS Goal Map create/open failed', error);
          alert(error?.message || 'Could not create the local Goal Map.');
        }
      }
    }));
    if (item.local) {
      actions.appendChild(el('button', { class: 'obs-pd-btn', text: 'Edit item', onclick: () => editLocalPlanItem(file, item) }));
      actions.appendChild(el('button', { class: 'obs-pd-btn', text: 'Delete item', onclick: () => deleteLocalPlanItem(file, item) }));
    }
    if (linkedMap) actions.appendChild(el('span', { class: 'obs-pd-plan-item-source', text: `${linkedMap.id} · ${linkedMap.status || 'local draft'}` }));
    editor.appendChild(actions);
    details.appendChild(editor);
    card.appendChild(details);
    return card;
  }

  function renderPlanLevel(file, level, localDay, workspace) {
    const block = el('section', { class: 'obs-pd-plan-level', 'data-level': level.key });
    const head = el('div', { class: 'obs-pd-plan-level-head' }, [
      el('span', { class: 'obs-pd-level-badge', text: level.prefix }),
      el('h3', { text: level.label }),
      el('span', { class: 'obs-pd-plan-meta', text: `${level.items.length} item(s)` })
    ]);
    head.appendChild(el('button', {
      class: 'obs-pd-btn',
      text: '+ Add local item',
      onclick: () => createLocalPlanItem(file, level.key)
    }));
    block.appendChild(head);
    const items = el('div', { class: 'obs-pd-plan-items' });
    if (!level.items.length) items.appendChild(el('div', { class: 'obs-pd-empty', text: 'not provided' }));
    level.items.forEach((item) => items.appendChild(renderPlanItem(file, item, localDay, workspace)));
    block.appendChild(items);
    return block;
  }

  function updateLocalScopeUnit(file, unit, patch) {
    if (unit.ambiguous) {
      throw new Error('Duplicate unlabelled Scope Unit names require explicit stable IDs before local planning can be saved safely.');
    }
    updateLocalDayState(file, (day) => {
      const record = localScopeUnitRecord(day, unit);
      day.scopeUnits[unit.key] = {
        ...(record.value || {}),
        ...patch,
        sourceUnitId: unit.id,
        sourceUnitExplicitId: Boolean(unit.explicitId),
        sourceUnitText: unit.text,
        sourceUnitTextHash: stableHash(normalizedScopeUnitText(unit.text)),
        updatedAt: new Date().toISOString()
      };
      if (record.key && record.key !== unit.key) delete day.scopeUnits[record.key];
    });
  }

  function resolveScopeTarget(workspace, local) {
    if (!local) return null;
    const exact = workspace.targetItems.find((item) => (
      item.key === local.targetItemKey
      || (item.legacyKeys || []).includes(local.targetItemKey)
    ));
    if (exact) return exact;
    if (local.targetItemExplicitId === true) {
      return workspace.targetItems.find((item) => (
        item.explicitId
        && item.id === local.targetItemId
        && item.level === local.targetItemLevel
      )) || null;
    }
    return null;
  }

  function renderScopeUnit(file, workspace, row, index, localDay, unit) {
    const table = workspace.scopeTable;
    const record = localScopeUnitRecord(localDay, unit);
    const local = record.value || {};
    const target = resolveScopeTarget(workspace, local);
    const level = target?.level || 'unassigned';
    const unitName = unit.explicitId && normalizedScopeUnitText(unit.text) !== normalizedScopeUnitText(unit.id)
      ? `${unit.id} · ${unit.text}`
      : unit.text;
    const status = cleanCell(exactRowValue(row, table, ['Status'])) || 'not provided';
    const goals = cleanCell(exactRowValue(row, table, ['Goal(s)', 'Goals', 'Goal', 'Target']));
    const windowValue = cleanCell(exactRowValue(row, table, ['Window']));
    const required = cleanCell(exactRowValue(row, table, ['Required by end', 'Required', 'Result']));

    const card = el('article', {
      class: 'obs-pd-scope-unit',
      'data-level': level,
      'data-scope-unit-key': unit.key,
      'data-scope-unit-explicit-id': String(Boolean(unit.explicitId)),
      'data-scope-unit-ambiguous': String(Boolean(unit.ambiguous))
    });
    const titleRow = el('div', { class: 'obs-pd-scope-title-row' });
    titleRow.appendChild(el('div', { class: 'obs-pd-scope-title', text: unitName }));
    titleRow.appendChild(el('span', { class: 'obs-pd-level-badge', text: target ? `${target.id} · ${target.level}` : 'unassigned' }));
    titleRow.appendChild(el('span', { class: 'obs-pd-scope-status', text: status }));
    card.appendChild(titleRow);
    if (goals) card.appendChild(el('div', { class: 'obs-pd-scope-source', text: goals }));
    if (windowValue) card.appendChild(el('div', { class: 'obs-pd-scope-source', text: `Window: ${windowValue}` }));
    if (unit.ambiguous) {
      card.appendChild(el('div', {
        class: 'obs-pd-section-warning',
        text: 'Duplicate unlabelled Scope Unit name. Add an explicit stable ID such as SU1: ... before saving local deadlines, links or notes.'
      }));
    }

    const targetSelect = el('select', { class: 'obs-pd-local-select', 'aria-label': `Target plan item for ${unitName}` });
    targetSelect.appendChild(el('option', { value: '', text: 'Unassigned plan item' }));
    workspace.targetItems.forEach((item) => {
      targetSelect.appendChild(el('option', { value: item.key, text: `[${item.id}] ${item.text}` }));
    });
    targetSelect.value = target?.key || '';
    targetSelect.disabled = Boolean(unit.ambiguous);
    targetSelect.addEventListener('change', () => {
      const nextTarget = workspace.targetItems.find((item) => item.key === targetSelect.value) || null;
      updateLocalScopeUnit(file, unit, {
        targetItemKey: nextTarget?.key || '',
        targetItemId: nextTarget?.id || '',
        targetItemLevel: nextTarget?.level || '',
        targetItemExplicitId: Boolean(nextTarget?.explicitId)
      });
      render();
    });
    card.appendChild(el('label', { class: 'obs-pd-field-label', text: 'Linked Plan Core item · local only' }, [targetSelect]));

    const deadlines = el('div', { class: 'obs-pd-deadline-grid' });
    [
      ['maxTime', 'Max'],
      ['desiredTime', 'Desired'],
      ['baseTime', 'Base'],
      ['minimumTime', 'Minimum']
    ].forEach(([field, label]) => {
      const input = el('input', { class: 'obs-pd-local-time', type: 'time', 'aria-label': `${label} target for ${unitName}` });
      input.value = local[field] || '';
      input.disabled = Boolean(unit.ambiguous);
      bindDebouncedLocalInput(input, (value) => updateLocalScopeUnit(file, unit, { [field]: value }), 0);
      deadlines.appendChild(el('label', { class: 'obs-pd-field-label', text: label }, [input]));
    });
    card.appendChild(deadlines);

    const note = el('textarea', {
      class: 'obs-pd-local-textarea',
      placeholder: unit.ambiguous ? 'Add an explicit stable Scope Unit ID before saving a local note.' : 'Local note for this scope unit…',
      'aria-label': `Local note for ${unitName}`
    });
    note.value = local.note || '';
    note.disabled = Boolean(unit.ambiguous);
    bindDebouncedLocalInput(note, (value) => updateLocalScopeUnit(file, unit, { note: value }));
    card.appendChild(el('label', { class: 'obs-pd-field-label', text: 'Unit note · local only' }, [note]));

    const sourceDetails = el('details', { class: 'obs-pd-scope-source-details' });
    sourceDetails.appendChild(el('summary', { text: 'Repository source details' }));
    const sourceGrid = el('div', { class: 'obs-pd-scope-source-grid' });
    table.headers.forEach((header, cellIndex) => {
      const value = cleanCell(row[cellIndex]);
      if (value) sourceGrid.appendChild(el('div', { text: `${header}: ${value}` }));
    });
    if (required && !table.headers.some((header) => normalizeHeading(header).includes('required'))) {
      sourceGrid.appendChild(el('div', { text: `Required by end: ${required}` }));
    }
    sourceDetails.appendChild(sourceGrid);
    card.appendChild(sourceDetails);
    return card;
  }

  function renderLegacyMaterialLinker(file, workspace, localDay) {
    const entries = [...workspace.legacyAcceptance, ...workspace.legacyEvidence];
    if (!entries.length) return null;
    const assigned = new Map(entries.map((entry) => [
      entry.key,
      resolveLinkedPlanItem(workspace.targetItems, localDay.legacyLinks?.[entry.key])
    ]));
    const unassignedAcceptance = workspace.legacyAcceptance.filter((entry) => !assigned.get(entry.key)).length;
    const unassignedEvidence = workspace.legacyEvidence.filter((entry) => !assigned.get(entry.key)).length;

    const details = el('details', { class: 'obs-pd-legacy-material' });
    details.appendChild(el('summary', {
      text: `Repository material links · ${unassignedAcceptance} unassigned acceptance · ${unassignedEvidence} unassigned evidence`
    }));
    const body = el('div', { class: 'obs-pd-legacy-material-body' });
    body.appendChild(el('div', {
      class: 'obs-pd-workspace-hint',
      text: 'Legacy Acceptance Criteria and Done / Evidence are not duplicated as plan items. Link a source row to a Plan Core item only when the relationship is explicit.'
    }));

    entries.forEach((entry) => {
      const row = el('div', { class: 'obs-pd-legacy-entry' });
      row.appendChild(el('span', {
        class: 'obs-pd-level-badge',
        text: entry.kind === 'acceptance' ? entry.id : 'EVIDENCE'
      }));
      const copy = el('div');
      copy.appendChild(el('div', { class: 'obs-pd-legacy-entry-copy', text: entry.text }));
      copy.appendChild(el('div', { class: 'obs-pd-legacy-entry-source', text: entry.source || entry.kind }));
      row.appendChild(copy);

      const select = el('select', {
        class: 'obs-pd-local-select',
        'aria-label': `Linked Plan Core item for ${entry.id}`
      });
      select.appendChild(el('option', { value: '', text: 'Leave unassigned' }));
      workspace.targetItems.forEach((item) => {
        select.appendChild(el('option', { value: item.key, text: `[${item.id}] ${item.text}` }));
      });
      select.value = assigned.get(entry.key)?.key || '';
      select.disabled = !workspace.targetItems.length;
      select.addEventListener('change', () => {
        const target = workspace.targetItems.find((item) => item.key === select.value) || null;
        updateLegacyMaterialLink(file, entry, target);
        render();
      });
      row.appendChild(select);
      body.appendChild(row);
    });

    details.appendChild(body);
    return details;
  }

  function renderPlanningModeControl(file, localDay, workspace) {
    const wrapper = el('section', { class: 'obs-pd-plan-mode' });
    wrapper.appendChild(el('div', { class: 'obs-pd-field-label', text: 'Two separate local planning routes' }));
    wrapper.appendChild(el('div', {
      class: 'obs-pd-plan-mode-copy',
      text: 'Each Plan Item chooses its own route: assign it to a numbered session (S1, S2…) or directly to a clock-time range. Session Planning and Time Planning are displayed separately below.'
    }));
    return wrapper;
  }

  function renderSessionPlanner(file, workspace, localDay) {
    const planner = el('section', { class: 'obs-pd-local-planner' });
    const head = el('div', { class: 'obs-pd-local-planner-head' }, [
      el('h3', { text: 'Session Planning' }),
      el('span', { class: 'obs-pd-local-only', text: 'local only' })
    ]);
    head.appendChild(el('button', { class: 'obs-pd-btn', text: '+ Add session', onclick: () => createLocalSession(file) }));
    planner.appendChild(head);
    const sessions = sortedLocalSessions(localDay);
    if (!sessions.length) planner.appendChild(el('div', { class: 'obs-pd-empty', text: 'No local sessions. Add S1, then assign one or several plan items to it.' }));
    sessions.forEach((session) => {
      const card = el('article', { class: 'obs-pd-local-session', 'data-local-session-id': session.id });
      const title = el('input', { class: 'obs-pd-local-select', value: session.title || `Session ${session.label}`, 'aria-label': `Title for ${session.label}` });
      bindDebouncedLocalInput(title, (value) => updateLocalSession(file, session.id, { title: value }));
      card.appendChild(el('div', { class: 'obs-pd-local-session-head' }, [
        el('span', { class: 'obs-pd-session-label', text: session.label }),
        title,
        el('button', { class: 'obs-pd-btn', text: 'Delete', onclick: () => deleteLocalSession(file, session.id) })
      ]));
      const linked = workspace.targetItems.filter((item) => localPlanItemRecord(localDay, item).value?.executionMode === 'sessions' && localPlanItemRecord(localDay, item).value?.sessionId === session.id);
      card.appendChild(el('div', {
        class: 'obs-pd-session-linked',
        text: linked.length
          ? `Linked items: ${linked.map((item) => `${item.id} ${item.text}`).join(' · ')}`
          : 'Linked items: none'
      }));
      const result = el('textarea', { class: 'obs-pd-local-textarea', placeholder: 'Expected result of this session…', 'aria-label': `Expected result for ${session.label}` });
      result.value = session.expectedResult || '';
      bindDebouncedLocalInput(result, (value) => updateLocalSession(file, session.id, { expectedResult: value }));
      const details = el('details', { class: 'obs-pd-scope-source-details' });
      details.appendChild(el('summary', { text: 'Session result and notes' }));
      details.appendChild(el('label', { class: 'obs-pd-field-label', text: 'Expected result' }, [result]));
      const note = el('textarea', { class: 'obs-pd-local-textarea', placeholder: 'Session note…', 'aria-label': `Note for ${session.label}` });
      note.value = session.note || '';
      bindDebouncedLocalInput(note, (value) => updateLocalSession(file, session.id, { note: value }));
      details.appendChild(el('label', { class: 'obs-pd-field-label', text: 'Session note' }, [note]));
      card.appendChild(details);
      planner.appendChild(card);
    });
    return planner;
  }

  function renderTimePlanner(workspace, localDay) {
    const planner = el('section', { class: 'obs-pd-local-planner' });
    planner.appendChild(el('div', { class: 'obs-pd-local-planner-head' }, [
      el('h3', { text: 'Time Planning' }),
      el('span', { class: 'obs-pd-local-only', text: 'local only' })
    ]));
    const rows = workspace.targetItems
      .map((item) => ({ item, local: localPlanItemRecord(localDay, item).value || {} }))
      .filter(({ local }) => local.executionMode === 'hours' && (local.timeStart || local.timeEnd))
      .sort((a, b) => String(a.local.timeStart || '99:99').localeCompare(String(b.local.timeStart || '99:99')));
    if (!rows.length) {
      planner.appendChild(el('div', { class: 'obs-pd-empty', text: 'No timed items. Open a Plan Core item and set its start/end time.' }));
      return planner;
    }
    const list = el('div', { class: 'obs-pd-time-plan-list' });
    rows.forEach(({ item, local }) => list.appendChild(el('div', { class: 'obs-pd-time-plan-row' }, [
      el('div', { class: 'obs-pd-time-plan-time', text: `${local.timeStart || '…'}–${local.timeEnd || '…'}` }),
      el('div', { class: 'obs-pd-time-plan-item', text: `${item.id} · ${item.text}` })
    ])));
    planner.appendChild(list);
    return planner;
  }

  function renderLocalExecutionPlanner(file, workspace, localDay) {
    const fragment = document.createDocumentFragment();
    fragment.appendChild(renderPlanningModeControl(file, localDay, workspace));
    fragment.appendChild(renderSessionPlanner(file, workspace, localDay));
    fragment.appendChild(renderTimePlanner(workspace, localDay));
    return fragment;
  }

  function renderPlanWorkspace(documentModel, file) {
    const localDay = readLocalDayState(file);
    const workspace = collectPlanWorkspaceModel(documentModel, localDay);
    const wrapper = el('div', { class: 'obs-pd-plan-workspace' });

    const left = el('section', { class: 'obs-pd-workspace-column' });
    left.appendChild(el('div', { class: 'obs-pd-workspace-head' }, [
      el('h2', { text: 'Local Execution Planner' }),
      el('span', { class: 'obs-pd-local-only', text: 'local planning' }),
      el('div', { class: 'obs-pd-workspace-hint', text: 'Assign each Plan Item either to a numbered session (S1, S2…) or directly to a clock-time range. The two plans stay visibly separated.' })
    ]));
    left.appendChild(renderLocalExecutionPlanner(file, workspace, localDay));
    const dayNote = el('textarea', {
      class: 'obs-pd-local-textarea',
      placeholder: 'Local planning notes for this day…',
      'aria-label': 'Local day planning notes'
    });
    dayNote.value = localDay.dayNote || '';
    bindDebouncedLocalInput(dayNote, (value) => updateLocalDayState(file, (day) => { day.dayNote = value; }));
    left.appendChild(el('div', { class: 'obs-pd-day-note' }, [
      el('label', { class: 'obs-pd-field-label', text: 'Day planning notes · local only' }, [dayNote])
    ]));

    if (workspace.scopeUnits.length) {
      const repositoryScope = el('details', { class: 'obs-pd-legacy-material obs-pd-repository-scope' });
      repositoryScope.appendChild(el('summary', { text: `Repository Scope Units · ${workspace.scopeUnits.length}` }));
      const repositoryBody = el('div', { class: 'obs-pd-legacy-material-body' });
      repositoryBody.appendChild(el('div', { class: 'obs-pd-workspace-hint', text: 'Source projection kept for compatibility. Local session/time planning above is the editable working plan.' }));
      workspace.scopeUnits.forEach(({ row, index, identity }) => repositoryBody.appendChild(renderScopeUnit(file, workspace, row, index, localDay, identity)));
      repositoryScope.appendChild(repositoryBody);
      left.appendChild(repositoryScope);
    }
    wrapper.appendChild(left);

    const right = el('section', { class: 'obs-pd-workspace-column' });
    right.appendChild(el('div', { class: 'obs-pd-workspace-head' }, [
      el('h2', { text: 'Plan Items / Plan Core' }),
      el('div', { class: 'obs-pd-workspace-hint', text: 'Repository items stay visible. Add as many local items as needed, then choose Session or Time separately for each item.' })
    ]));
    PLAN_LEVEL_DEFINITIONS.forEach(([key]) => right.appendChild(renderPlanLevel(file, workspace.levels[key], localDay, workspace)));

    const legacyLinker = renderLegacyMaterialLinker(file, workspace, localDay);
    if (legacyLinker) right.appendChild(legacyLinker);
    wrapper.appendChild(right);
    return wrapper;
  }

  function renderPlanningSection(section) {
    const normalized = normalizeHeading(section.title);
    if (normalized.includes('current target scenario')) {
      const sourceLineCount = meaningfulLineCount(section.lines)
        + section.subsections.reduce((sum, subsection) => sum + meaningfulLineCount(subsection.lines), 0);
      return planDisclosure(section, 'currentTargetOpen', true, () => {
        const fragment = document.createDocumentFragment();
        if (trimBlankLines(section.lines).length) fragment.appendChild(renderMarkdownLines(section.lines));
        section.subsections.forEach((subsection) => {
          fragment.appendChild(el('h3', { text: subsection.title }));
          fragment.appendChild(renderMarkdownLines(subsection.lines));
        });
        return fragment;
      }, `${sourceLineCount} source line(s)`);
    }
    if (
      normalized.includes('plan core')
      || normalized.includes('scope unit')
      || normalized.includes('acceptance criteria')
      || normalized.includes('done / evidence')
      || normalized.includes('done evidence')
      || normalized.includes('still needed')
    ) return null;
    return planDisclosure(section, `plan:${normalized}`, false, () => renderSectionBodyOnly(section), '');
  }

  function renderLinksSection(section) {
    const card = el('div', { class: 'obs-pd-card' });
    card.appendChild(el('h2', { text: section.title }));
    const lines = stripOuterFence(section.lines);
    let renderedAny = false;

    for (const line of lines) {
      const match = line.match(/^([^:]+):\s*(.*)$/);
      if (!match) continue;
      renderedAny = true;
      const row = el('div', { class: 'obs-pd-link-row' });
      row.appendChild(el('div', { class: 'obs-pd-link-key', text: match[1].trim() }));
      row.appendChild(el('div', { class: 'obs-pd-link-value', text: match[2].trim() || 'not provided' }));
      card.appendChild(row);
    }

    if (!renderedAny) card.appendChild(renderMarkdownLines(section.lines));
    return card;
  }

  function renderGenericSection(section) {
    if (normalizeHeading(section.title).includes('plan core')) return renderPlanCore(section);
    if (normalizeHeading(section.title) === 'links') return renderLinksSection(section);

    const card = el('div', { class: 'obs-pd-card' });
    card.appendChild(el('h2', { text: section.title }));
    if (trimBlankLines(section.lines).length) card.appendChild(renderMarkdownLines(section.lines));

    section.subsections.forEach((subsection) => {
      card.appendChild(el('h3', { text: subsection.title }));
      card.appendChild(renderMarkdownLines(subsection.lines));
    });

    if (!trimBlankLines(section.lines).length && !section.subsections.length) {
      card.appendChild(el('div', { class: 'obs-pd-empty', text: 'not provided' }));
    }

    return card;
  }

  function sourceBar(path, label) {
    const bar = el('div', { class: 'obs-pd-source-bar' });
    bar.appendChild(el('div', { class: 'obs-pd-source-label', text: label }));
    bar.appendChild(el('div', { class: 'obs-pd-path', text: path || 'not provided' }));
    if (path) {
      bar.appendChild(el('button', {
        class: 'obs-pd-btn',
        text: 'Open',
        onclick: () => window.open(buildLocalUrl(path), '_blank', 'noopener,noreferrer')
      }));
    }
    return bar;
  }

  function renderFormattedDocument(path, markdown, label) {
    const wrapper = el('div');
    wrapper.appendChild(sourceBar(path, label));
    const model = parseMarkdownDocument(markdown);
    wrapper.appendChild(renderDocumentHeader(model));

    if (trimBlankLines(model.preamble).length) {
      const preambleCard = el('div', { class: 'obs-pd-card' });
      preambleCard.appendChild(renderMarkdownLines(model.preamble));
      wrapper.appendChild(preambleCard);
    }

    if (!model.sections.length) {
      wrapper.appendChild(el('div', { class: 'obs-pd-note', text: 'Known dashboard sections were not found. Use Raw mode to inspect the source.' }));
      return wrapper;
    }

    model.sections.forEach((section) => wrapper.appendChild(renderGenericSection(section)));
    return wrapper;
  }

  function renderRawSource(file, label) {
    const wrapper = el('div', { class: 'obs-pd-raw-group' });
    wrapper.appendChild(sourceBar(file.path, label));
    if (file.error) {
      wrapper.appendChild(el('div', { class: 'obs-pd-error', text: `Could not load:\n${file.path}\n\n${file.error}` }));
    } else {
      wrapper.appendChild(el('pre', { class: 'obs-pd-raw', text: file.text }));
    }
    return wrapper;
  }

  function normalizeExactHeader(value) {
    return String(value || '')
      .toLowerCase()
      .replace(/\u00a0/g, ' ')
      .replace(/[—–]/g, '-')
      .replace(/[`*_]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function exactHeaderIndex(table, aliases) {
    const exactAliases = new Set(aliases.map(normalizeExactHeader).filter(Boolean));
    return table.headers.findIndex((header) => exactAliases.has(normalizeExactHeader(header)));
  }

  function exactRowValue(row, table, aliases) {
    const index = exactHeaderIndex(table, aliases);
    return index >= 0 ? (row[index] || '') : '';
  }

  function normalizedHeaderIndex(table, aliases) {
    const normalizedAliases = aliases.map(normalizeHeading).filter(Boolean);
    return table.headers.findIndex((header) => normalizedAliases.some((alias) => normalizeHeading(header) === alias || normalizeHeading(header).includes(alias)));
  }

  function rowValue(row, table, aliases) {
    const index = normalizedHeaderIndex(table, aliases);
    return index >= 0 ? (row[index] || '') : '';
  }

  function tableToKeyValue(table) {
    const output = {};
    if (!table || table.headers.length < 2) return output;
    table.rows.forEach((row) => {
      const key = cleanCell(row[0]);
      if (key) output[normalizeHeading(key)] = cleanCell(row[1]);
    });
    return output;
  }

  function pickKeyValue(map, aliases) {
    const keys = Object.keys(map);
    for (const alias of aliases) {
      const normalizedAlias = normalizeHeading(alias);
      const exact = keys.find((key) => key === normalizedAlias);
      if (exact) return map[exact];
      const partial = keys.find((key) => key.includes(normalizedAlias));
      if (partial) return map[partial];
    }
    return '';
  }

  function providedMetricValue(value) {
    const cleaned = cleanCell(value);
    return OPTIONAL_EMPTY_VALUES.has(cleaned.toLowerCase()) ? '' : cleaned;
  }

  function carryoverDebtValue(documentModel, summaryValues) {
    const carryoverSection = findSection(documentModel, 'carryover');
    const carryoverValues = tableToKeyValue(carryoverSection ? parseFirstTable(carryoverSection.lines) : null);
    return providedMetricValue(pickKeyValue(summaryValues, ['Previous-day carryover debt', 'Incoming debt']))
      || providedMetricValue(pickKeyValue(carryoverValues, ['Carryover amount']))
      || 'not provided';
  }

  function scoreCard(label, value, tone, meta = '') {
    const card = el('div', { class: 'obs-pd-score-card', 'data-tone': tone || 'neutral' });
    card.appendChild(el('div', { class: 'obs-pd-score-label', text: label }));
    card.appendChild(el('div', { class: 'obs-pd-score-value', text: value || '—' }));
    if (meta) card.appendChild(el('div', { class: 'obs-pd-score-meta', text: meta }));
    return card;
  }

  function displayedScoreSummary(documentModel, file) {
    const summarySubsection = findSubsection(documentModel, 'work score summary');
    const summaryTable = summarySubsection ? parseFirstTable(summarySubsection.lines) : null;
    const values = tableToKeyValue(summaryTable);
    const pendingSessions = activePendingSessions(file);
    const pendingPoints = pendingSessions.reduce((sum, session) => sum + parseNumber(session.points), 0);
    const repositoryWorkPoints = parseNumber(pickKeyValue(values, ['Work Points']));
    const repositoryNetScore = parseNumber(pickKeyValue(values, ['Net Work Score']));
    return {
      values,
      pendingSessions,
      pendingCount: pendingSessions.length,
      pendingPoints,
      repositoryWorkPoints,
      repositoryNetScore,
      displayedWorkPoints: repositoryWorkPoints + pendingPoints,
      displayedNetScore: repositoryNetScore + pendingPoints
    };
  }

  function extractSupportMetric(documentModel, pattern) {
    const match = documentModel.raw.match(pattern);
    return match ? cleanCell(match[1]) : '';
  }

  function renderSessionOverview(documentModel, file) {
    const score = displayedScoreSummary(documentModel, file);
    const values = score.values;
    const incomingDebt = carryoverDebtValue(documentModel, values);
    const pendingMeta = score.pendingCount
      ? `repo ${formatNumber(score.repositoryWorkPoints)} + ${score.pendingCount} pending sync (${formatNumber(score.pendingPoints)})`
      : '';
    const netMeta = score.pendingCount
      ? `includes ${score.pendingCount} completed local session(s)`
      : '';
    const cards = [
      ['Work Points', formatNumber(score.displayedWorkPoints), 'neutral', pendingMeta],
      ['Penalties', pickKeyValue(values, ['Penalties', 'Penalties / planned carryover']), 'bad', ''],
      ['Net Work Score', formatNumber(score.displayedNetScore), 'good', netMeta],
      ['Incoming Debt', incomingDebt, 'violet', ''],
      ['Net After Debt', pickKeyValue(values, ['Net score after carryover', 'Net after debt']), 'warn', 'repository value'],
      ['Current-Day Score', pickKeyValue(values, ['Current-day score', 'Remaining current-day score']), 'warn', 'repository value']
    ].filter(([, value]) => value !== '' && value !== null && value !== undefined);

    if (!cards.length) return null;

    const wrapper = document.createDocumentFragment();
    wrapper.appendChild(el('div', { class: 'obs-pd-section-title', text: 'Session Overview' }));
    const grid = el('div', { class: 'obs-pd-score-grid' });
    cards.forEach(([label, value, tone, meta]) => grid.appendChild(scoreCard(label, value, tone, meta)));
    wrapper.appendChild(grid);
    return wrapper;
  }

  function splitGoalValues(value) {
    const source = cleanCell(value);
    if (!source) return [];
    return source
      .split(/\n|;|\s+\+\s+/)
      .map((item) => item.replace(/^[-*]\s*/, '').trim())
      .filter(Boolean);
  }


  function renderPlanningDayMetrics(file) {
    if (!file || file.error) return null;
    const documentModel = parseMarkdownDocument(file.text);
    const score = displayedScoreSummary(documentModel, file);
    const sessionsSection = findSection(documentModel, 'finished sessions') || findSection(documentModel, 'sessions');
    const sessionTable = sessionsSection ? parseFirstTable(sessionsSection.lines) : null;
    const repositoryCount = countMeaningfulRows(sessionTable);
    const localSessions = visibleLocalSessions(file);
    const pendingMeta = score.pendingCount
      ? `repo ${formatNumber(score.repositoryWorkPoints)} + ${score.pendingCount} pending sync (${formatNumber(score.pendingPoints)})`
      : '';
    const cards = [
      ['Work Points', formatNumber(score.displayedWorkPoints), 'neutral', pendingMeta],
      ['Net Work Score', formatNumber(score.displayedNetScore), 'good', score.pendingCount ? 'completed local sessions included' : ''],
      ['Sessions', String(repositoryCount + localSessions.length), 'violet', score.pendingCount ? `${score.pendingCount} pending sync` : '']
    ];
    const grid = el('div', { class: 'obs-pd-score-grid' });
    cards.forEach(([label, value, tone, meta]) => grid.appendChild(scoreCard(label, value, tone, meta)));
    return grid;
  }

  function compactSessionName(row, table) {
    const number = exactRowValue(row, table, ['#', 'Session #']);
    const sessionText = exactRowValue(row, table, ['Session']);
    const explicitId = sessionText.match(/\bS\d+\b/i)?.[0];
    if (explicitId) return explicitId.toUpperCase();
    if (number) return `S${number}`;
    return sessionText || '';
  }

  function sessionGoalsValue(row, table) {
    return exactRowValue(row, table, [
      'Goal(s)', 'Goals', 'Goal', 'Worked On (Goals)', 'Worked On',
      'Related Goals', 'Goal Maps', 'Target'
    ]);
  }

  function sessionDfForDisplay(value) {
    return cleanCell(value)
      .replace(/\s*\(\s*[+-]?\d+(?:[.,]\d+)?\s*\)/g, '')
      .replace(/\s*\/\s*/g, ' / ')
      .replace(/[ \t]+(?=\n|$)/g, '')
      .trim();
  }

  function renderGoalChips(value) {
    const goals = splitGoalValues(value);
    if (!goals.length) return null;
    const wrapper = el('div', { class: 'obs-pd-goal-list' });
    goals.forEach((goal) => wrapper.appendChild(el('span', { class: 'obs-pd-goal-chip', text: goal })));
    return wrapper;
  }

  function isMeaningfulDataRow(row) {
    return row.some((value, index) => {
      const cleaned = cleanCell(value);
      if (!cleaned) return false;
      if (index === 0 && /^\d+$/.test(cleaned)) return false;
      return true;
    });
  }

  function countMeaningfulRows(table) {
    if (!table) return 0;
    return table.rows.filter(isMeaningfulDataRow).length;
  }

  function linesOutsideFirstTable(lines) {
    const source = [...(lines || [])];
    const table = parseFirstTable(source);
    if (!table) return source;
    return [...source.slice(0, table.start), ...source.slice(table.end)];
  }

  function splitRulesLines(lines) {
    const source = trimBlankLines(lines || []);
    const ruleIndex = source.findIndex((line) => normalizeHeading(line.replace(/:\s*$/, '')) === 'rules');
    if (ruleIndex < 0) return { bodyLines: source, ruleLines: [] };
    return {
      bodyLines: trimBlankLines(source.slice(0, ruleIndex)),
      ruleLines: trimBlankLines(source.slice(ruleIndex + 1))
    };
  }

  function disclosureButton(label, bodyNode, className = 'obs-pd-inline-details') {
    const details = el('details', { class: className });
    details.appendChild(el('summary', { class: 'obs-pd-disclosure-button', text: label }));
    if (bodyNode) {
      const body = el('div', { class: 'obs-pd-disclosure-body' });
      body.appendChild(bodyNode);
      details.appendChild(body);
    }
    return details;
  }

  function rulesDisclosure(ruleLines, label = 'Show rules') {
    if (!trimBlankLines(ruleLines || []).length) return null;
    return disclosureButton(label, renderMarkdownLines(ruleLines));
  }

  function statusPill(text, kind) {
    return el('span', { class: 'obs-pd-status-pill', 'data-kind': kind || 'repository', text });
  }

  function compactValue(value, tone) {
    return el('div', { class: 'obs-pd-compact-value', 'data-tone': tone || 'neutral', text: value || 'not provided' });
  }

  function sessionSectionHeader(panel, repoCount, localSessions, ruleLines) {
    const pendingCount = localSessions.filter((session) => session.status === 'pending').length;
    const conflictCount = localSessions.filter((session) => session.status === 'conflict').length;
    const bar = el('div', { class: 'obs-pd-section-bar' });
    bar.appendChild(el('div', { class: 'obs-pd-section-name', text: 'Sessions' }));
    if (pendingCount) bar.appendChild(statusPill(`${pendingCount} pending`, 'pending'));
    if (conflictCount) bar.appendChild(statusPill(`${conflictCount} conflict`, 'conflict'));
    bar.appendChild(el('div', { class: 'obs-pd-section-meta', text: `Repository: ${repoCount} · Local: ${localSessions.length}` }));
    const rules = rulesDisclosure(ruleLines);
    if (rules) bar.appendChild(rules);
    panel.appendChild(bar);
  }

  function appendDetailItem(grid, label, value) {
    const cleaned = cleanCell(value);
    if (!cleaned) return;
    const item = el('div', { class: 'obs-pd-detail-item' });
    item.appendChild(el('div', { class: 'obs-pd-detail-label', text: label }));
    item.appendChild(el('div', { class: 'obs-pd-detail-value', text: cleaned }));
    grid.appendChild(item);
  }

  function appendRepositorySession(panel, row, table, goalAliases) {
    const sessionId = compactSessionName(row, table);
    const score = exactRowValue(row, table, ['Points', 'Score', 'Total']);
    const df = sessionDfForDisplay(exactRowValue(row, table, ['D/F', 'D / F', 'D/F/K/P']));
    const goals = sessionGoalsValue(row, table);

    const detailArea = el('div', { class: 'obs-pd-session-details' });
    const goalChips = renderGoalChips(goals);
    if (goalChips) detailArea.appendChild(goalChips);

    const grid = el('div', { class: 'obs-pd-detail-grid' });
    const preferredFields = [
      ['Time', ['Time']],
      ['Result', ['Result', 'Result (short)']],
      ['Progress Signal', ['Progress Signal']]
    ];

    const usedIndexes = new Set();
    const markUsedIndex = (aliases) => {
      const index = exactHeaderIndex(table, aliases);
      if (index >= 0) usedIndexes.add(index);
    };

    [
      ['#', 'Session #'],
      ['Session'],
      ['Points', 'Score', 'Total'],
      ['D/F', 'D / F', 'D/F/K/P'],
      goalAliases,
      ['Base'],
      ['Adj', 'Adjustment']
    ].forEach(markUsedIndex);

    preferredFields.forEach(([label, aliases]) => {
      const index = exactHeaderIndex(table, aliases);
      if (index < 0) return;
      usedIndexes.add(index);
      appendDetailItem(grid, label, row[index]);
    });

    table.headers.forEach((header, index) => {
      if (usedIndexes.has(index) || !cleanCell(row[index])) return;
      appendDetailItem(grid, header, row[index]);
    });

    if (grid.childNodes.length) detailArea.appendChild(grid);
    const hasDetails = Boolean(goalChips || grid.childNodes.length);
    const record = hasDetails
      ? el('details', { class: 'obs-pd-session-record' })
      : el('div', { class: 'obs-pd-session-record obs-pd-session-record-static' });
    const summary = hasDetails
      ? el('summary', { class: 'obs-pd-session-summary' })
      : el('div', { class: 'obs-pd-session-summary' });

    summary.appendChild(el('div', { class: 'obs-pd-chevron', text: hasDetails ? '›' : '' }));
    summary.appendChild(el('div', { class: 'obs-pd-session-id', text: sessionId || 'session' }));
    summary.appendChild(el('div', { class: 'obs-pd-session-score', text: score || '—' }));
    summary.appendChild(el('div', { class: 'obs-pd-detail-value', text: df || '—' }));
    summary.appendChild(el('div', { class: 'obs-pd-session-worked', text: goals.replace(/\n/g, ' · ') || 'No goals recorded' }));
    summary.appendChild(statusPill('Repository', 'repository'));
    record.appendChild(summary);
    if (hasDetails) record.appendChild(detailArea);
    panel.appendChild(record);
  }

  function appendLocalSession(panel, session) {
    const detailArea = el('div', { class: 'obs-pd-session-details' });
    const goalChips = renderGoalChips(session.goals);
    if (goalChips) detailArea.appendChild(goalChips);

    const grid = el('div', { class: 'obs-pd-detail-grid' });
    appendDetailItem(grid, 'Time', session.time);
    appendDetailItem(grid, 'Progress Signal', session.progressSignal);
    appendDetailItem(grid, 'Result', session.result);
    appendDetailItem(grid, 'Expected Row', session.expectedRowNumber);
    if (grid.childNodes.length) detailArea.appendChild(grid);

    const hasDetails = Boolean(goalChips || grid.childNodes.length);
    const kind = session.status === 'conflict' ? 'conflict' : 'pending';
    const record = hasDetails
      ? el('details', { class: 'obs-pd-session-record', 'data-pending': 'true', 'data-conflict': session.status === 'conflict' ? 'true' : null })
      : el('div', { class: 'obs-pd-session-record obs-pd-session-record-static', 'data-pending': 'true', 'data-conflict': session.status === 'conflict' ? 'true' : null });
    const summary = hasDetails
      ? el('summary', { class: 'obs-pd-session-summary' })
      : el('div', { class: 'obs-pd-session-summary' });

    summary.appendChild(el('div', { class: 'obs-pd-chevron', text: hasDetails ? '›' : '' }));
    summary.appendChild(el('div', { class: 'obs-pd-session-id', text: session.session || 'local' }));
    summary.appendChild(el('div', { class: 'obs-pd-session-score', text: formatNumber(session.points) }));
    summary.appendChild(el('div', { class: 'obs-pd-detail-value', text: `D ${formatNumber(session.d)} / F ${formatNumber(session.f)}` }));
    summary.appendChild(el('div', { class: 'obs-pd-session-worked', text: cleanCell(session.goals) || 'No goals recorded' }));
    summary.appendChild(statusPill(session.status === 'conflict' ? 'Conflict local' : 'Pending local', kind));
    record.appendChild(summary);
    if (hasDetails) record.appendChild(detailArea);
    panel.appendChild(record);
  }

  function renderSessionList(documentModel, file) {
    const sessionsSection = findSection(documentModel, 'finished sessions') || findSection(documentModel, 'sessions');
    const table = sessionsSection ? parseFirstTable(sessionsSection.lines) : null;
    const repoRows = table?.rows || [];
    const localSessions = visibleLocalSessions(file);
    if (!sessionsSection && !localSessions.length) return null;

    const outsideTable = sessionsSection ? linesOutsideFirstTable(sessionsSection.lines) : [];
    const { bodyLines, ruleLines } = splitRulesLines(outsideTable);
    const wrapper = document.createDocumentFragment();
    wrapper.appendChild(el('div', { class: 'obs-pd-section-title', text: 'Finished Sessions' }));

    const panel = el('div', { class: 'obs-pd-session-panel' });
    sessionSectionHeader(panel, repoRows.length, localSessions, ruleLines);
    panel.appendChild(el('div', { class: 'obs-pd-session-head' }, [
      el('div', { text: '' }),
      el('div', { text: 'Session' }),
      el('div', { text: 'Score' }),
      el('div', { text: 'D / F' }),
      el('div', { text: 'Goal(s)' }),
      el('div', { text: 'Status' })
    ]));

    const goalAliases = [
      'Goal(s)', 'Goals', 'Goal', 'Worked On (Goals)', 'Worked On',
      'Related Goals', 'Goal Maps', 'Target'
    ];

    repoRows.forEach((row) => appendRepositorySession(panel, row, table, goalAliases));
    localSessions.forEach((session) => appendLocalSession(panel, session));

    if (!repoRows.length && !localSessions.length) {
      panel.appendChild(el('div', { class: 'obs-pd-empty-state', text: 'No repository or local sessions.' }));
    } else if (!repoRows.length && localSessions.length) {
      panel.appendChild(el('div', { class: 'obs-pd-empty-state', text: 'No repository sessions yet. Local pending/conflict sessions are shown above.' }));
    }

    if (bodyLines.length) {
      const info = disclosureButton('Show section notes', renderMarkdownLines(bodyLines), 'obs-pd-block-details');
      const body = el('div', { class: 'obs-pd-disclosure-body' });
      body.appendChild(info);
      panel.appendChild(body);
    }

    wrapper.appendChild(panel);
    return wrapper;
  }

  function renderPenaltySection(documentModel) {
    const section = findSection(documentModel, 'penalty events');
    if (!section) return null;
    const table = parseFirstTable(section.lines);
    const outsideTable = linesOutsideFirstTable(section.lines);
    const { bodyLines, ruleLines } = splitRulesLines(outsideTable);
    const meaningfulRows = table ? table.rows.filter(isMeaningfulDataRow) : [];
    const totalPenalty = meaningfulRows.reduce((sum, row) => sum + parseNumber(exactRowValue(row, table, ['Total penalty'])), 0);

    const wrapper = document.createDocumentFragment();
    wrapper.appendChild(el('div', { class: 'obs-pd-section-title', text: 'Penalty Events' }));
    const panel = el('div', { class: 'obs-pd-section-panel' });
    const bar = el('div', { class: 'obs-pd-section-bar' });
    bar.appendChild(el('div', { class: 'obs-pd-section-name', text: 'Penalty Events' }));
    bar.appendChild(el('div', { class: 'obs-pd-section-meta', text: `${meaningfulRows.length} event(s) · ${formatNumber(totalPenalty)} pts` }));
    const rules = rulesDisclosure(ruleLines);
    if (rules) bar.appendChild(rules);
    panel.appendChild(bar);

    if (meaningfulRows.length) {
      panel.appendChild(renderTable({ ...table, rows: meaningfulRows }));
    } else {
      panel.appendChild(el('div', { class: 'obs-pd-empty-state', text: 'No penalty events.' }));
    }

    if (bodyLines.length) {
      const body = el('div', { class: 'obs-pd-disclosure-body' });
      body.appendChild(renderMarkdownLines(bodyLines));
      panel.appendChild(body);
    }

    wrapper.appendChild(panel);
    return wrapper;
  }

  function strictNumericCell(value) {
    const normalized = cleanCell(value).replace(',', '.');
    if (!/^[+-]?(?:\d+(?:\.\d+)?|\.\d+)$/.test(normalized)) return null;
    const number = Number(normalized);
    return Number.isFinite(number) ? number : null;
  }

  function supportScoreRows(source) {
    const table = source ? parseFirstTable(source.lines) : null;
    if (!table) return [];

    return table.rows.map((row, index) => {
      const score = strictNumericCell(exactRowValue(row, table, ['Mark', 'Score', 'Support Score']));
      if (score === null) return null;
      return {
        number: exactRowValue(row, table, ['#']) || String(index + 1),
        category: exactRowValue(row, table, ['Category', 'Type']) || 'not provided',
        score,
        reason: exactRowValue(row, table, ['Reason', 'Note']) || ''
      };
    }).filter(Boolean);
  }

  function renderSupportSection(documentModel) {
    const supportMarks = findSubsection(documentModel, 'support marks') || findSection(documentModel, 'support marks');
    if (!supportMarks) return null;

    const scores = supportScoreRows(supportMarks);
    const explicitAverage = extractSupportMetric(documentModel, /Support Score:\s*(?:\*\*)?([^*\n]+?)(?:\*\*)?(?=\n|$)/i);
    const average = scores.length
      ? formatNumber(scores.reduce((sum, item) => sum + item.score, 0) / scores.length)
      : providedMetricValue(explicitAverage) || 'not calculated';

    const wrapper = document.createDocumentFragment();
    wrapper.appendChild(el('div', { class: 'obs-pd-section-title', text: 'Support' }));
    const panel = el('div', { class: 'obs-pd-section-panel' });
    const bar = el('div', { class: 'obs-pd-section-bar' });
    bar.appendChild(el('div', { class: 'obs-pd-section-name', text: 'Support' }));
    bar.appendChild(compactValue(`Average: ${average}`, scores.length ? 'violet' : 'neutral'));
    bar.appendChild(el('div', { class: 'obs-pd-section-meta', text: `${scores.length} score(s)` }));
    panel.appendChild(bar);

    if (scores.length) {
      panel.appendChild(renderTable({
        headers: ['#', 'Category', 'Score', 'Reason'],
        rows: scores.map((item) => [item.number, item.category, formatNumber(item.score), item.reason])
      }));
    } else {
      panel.appendChild(el('div', { class: 'obs-pd-empty-state', text: 'No support scores recorded.' }));
    }

    wrapper.appendChild(panel);
    return wrapper;
  }

  function renderCarryoverSection(documentModel) {
    const section = findSection(documentModel, 'carryover');
    if (!section) return null;
    const summarySubsection = findSubsection(documentModel, 'work score summary');
    const summaryValues = tableToKeyValue(summarySubsection ? parseFirstTable(summarySubsection.lines) : null);
    const incomingDebt = carryoverDebtValue(documentModel, summaryValues);
    const netAfterDebt = providedMetricValue(pickKeyValue(summaryValues, ['Net score after carryover', 'Net after debt'])) || 'not calculated';

    const wrapper = document.createDocumentFragment();
    wrapper.appendChild(el('div', { class: 'obs-pd-section-title', text: 'Carryover / Debt' }));
    const panel = el('div', { class: 'obs-pd-section-panel' });
    const incoming = el('div', { class: 'obs-pd-compact-row' });
    incoming.appendChild(el('div', { class: 'obs-pd-compact-label', text: 'Incoming debt' }));
    incoming.appendChild(compactValue(incomingDebt, 'violet'));
    const details = disclosureButton('Show details', renderMarkdownLines(section.lines));
    incoming.appendChild(details);
    panel.appendChild(incoming);
    const net = el('div', { class: 'obs-pd-compact-row' });
    net.appendChild(el('div', { class: 'obs-pd-compact-label', text: 'Net after debt' }));
    net.appendChild(compactValue(netAfterDebt, 'warn'));
    panel.appendChild(net);
    wrapper.appendChild(panel);
    return wrapper;
  }

  function renderFinalSummarySection(documentModel) {
    const section = findSection(documentModel, 'final day summary');
    if (!section) return null;
    const values = tableToKeyValue(parseFirstTable(section.lines));
    const finalScore = pickKeyValue(values, ['Final Day Score']) || 'not calculated';
    const status = section.lines.map((line) => line.match(/^Status:\s*(.+?)\s*$/i)?.[1]).find(Boolean)
      || pickKeyValue(values, ['Work Score'])
      || 'not closed';

    const wrapper = document.createDocumentFragment();
    wrapper.appendChild(el('div', { class: 'obs-pd-section-title', text: 'Final Day Summary' }));
    const panel = el('div', { class: 'obs-pd-section-panel' });
    const row = el('div', { class: 'obs-pd-compact-row' });
    row.appendChild(el('div', { class: 'obs-pd-compact-label', text: 'Final day score' }));
    row.appendChild(compactValue(finalScore, finalScore === 'not calculated' ? 'warn' : 'good'));
    row.appendChild(el('div', { class: 'obs-pd-section-meta', text: `Status: ${status}` }));
    row.appendChild(disclosureButton('Show full summary', renderMarkdownLines(section.lines)));
    panel.appendChild(row);
    wrapper.appendChild(panel);
    return wrapper;
  }

  function renderMoreOperationalDetails(documentModel) {
    const excludedTitles = [
      'finished sessions', 'penalty events', 'support facts', 'support review',
      'final day summary', 'carryover'
    ];
    const dedicatedSupportSubsections = [
      'support marks', 'support penalty', 'support interpretation', 'support facts used'
    ];
    const sections = documentModel.sections.filter((section) => {
      const title = normalizeHeading(section.title);
      const excludedByTitle = excludedTitles.some((query) => title.includes(normalizeHeading(query)));
      const excludedBySupportSubsection = section.subsections.some((subsection) => {
        const subsectionTitle = normalizeHeading(subsection.title);
        return dedicatedSupportSubsections.some((query) => subsectionTitle.includes(normalizeHeading(query)));
      });
      return !excludedByTitle && !excludedBySupportSubsection;
    });
    if (!sections.length) return null;

    const wrapper = document.createDocumentFragment();
    wrapper.appendChild(el('div', { class: 'obs-pd-section-title', text: 'More operational details' }));
    const panel = el('div', { class: 'obs-pd-section-panel' });
    const details = el('details', { class: 'obs-pd-block-details' });
    const summary = el('summary', { class: 'obs-pd-compact-row' });
    summary.appendChild(el('div', { class: 'obs-pd-compact-label', text: sections.map((section) => section.title).join(' · ') }));
    summary.appendChild(el('span', { class: 'obs-pd-disclosure-button', text: 'Show' }));
    details.appendChild(summary);
    const body = el('div', { class: 'obs-pd-disclosure-body' });
    sections.forEach((section) => body.appendChild(renderGenericSection(section)));
    details.appendChild(body);
    panel.appendChild(details);
    wrapper.appendChild(panel);
    return wrapper;
  }

  function renderSessionLedger(file) {
    const wrapper = el('div');
    wrapper.appendChild(sourceBar(file.path, 'Operational Session Day'));

    if (file.error) {
      wrapper.appendChild(el('div', { class: 'obs-pd-error', text: `Could not load session day:\n${file.path}\n\n${file.error}` }));
      return wrapper;
    }

    const model = parseMarkdownDocument(file.text);
    wrapper.appendChild(renderDocumentHeader(model));

    const diagnostic = localOutboxDiagnostic(file);
    if (diagnostic) wrapper.appendChild(el('div', { class: 'obs-pd-section-warning', text: diagnostic.message }));

    const overview = renderSessionOverview(model, file);
    if (overview) wrapper.appendChild(overview);

    const sessions = renderSessionList(model, file);
    if (sessions) wrapper.appendChild(sessions);

    const penalties = renderPenaltySection(model);
    if (penalties) wrapper.appendChild(penalties);

    const support = renderSupportSection(model);
    if (support) wrapper.appendChild(support);

    const carryover = renderCarryoverSection(model);
    if (carryover) wrapper.appendChild(carryover);

    const finalSummary = renderFinalSummarySection(model);
    if (finalSummary) wrapper.appendChild(finalSummary);

    const more = renderMoreOperationalDetails(model);
    if (more) wrapper.appendChild(more);

    return wrapper;
  }

  function renderLoadedFile(body, file, label) {
    if (!file) {
      body.appendChild(el('div', { class: 'obs-pd-note', text: `${label}: not linked.` }));
      return;
    }
    if (state.rawMode) {
      body.appendChild(renderRawSource(file, label));
      return;
    }
    if (file.error) {
      body.appendChild(sourceBar(file.path, label));
      body.appendChild(el('div', { class: 'obs-pd-error', text: `Could not load:\n${file.path}\n\n${file.error}` }));
      return;
    }
    body.appendChild(renderFormattedDocument(file.path, file.text, label));
  }

  function renderCompactDayHeader(model, file) {
    const header = el('div', { class: 'obs-pd-compact-day-header' });
    header.appendChild(el('div', { class: 'obs-pd-compact-day-title', text: model.title || 'Planning Day' }));
    const status = metadataValue(model, 'Status');
    if (status) header.appendChild(el('span', { class: 'obs-pd-badge', 'data-kind': 'status', text: status }));
    header.appendChild(el('div', {
      class: 'obs-pd-compact-day-path',
      text: file?.path || 'not provided',
      title: file?.path || 'not provided'
    }));
    if (file?.path) {
      header.appendChild(el('button', {
        class: 'obs-pd-btn',
        text: 'Open',
        onclick: () => window.open(buildLocalUrl(file.path), '_blank', 'noopener,noreferrer')
      }));
    }
    return header;
  }

  function renderPlanningDayTab(day, sessionDay) {
    const wrapper = el('div', { class: 'obs-pd-day-content' });
    if (!day) {
      const metrics = renderPlanningDayMetrics(sessionDay);
      if (metrics) wrapper.appendChild(metrics);
      wrapper.appendChild(el('div', { class: 'obs-pd-note', text: 'No active planning day is linked.' }));
      return wrapper;
    }
    if (day.error) {
      wrapper.appendChild(el('div', { class: 'obs-pd-error', text: day.error }));
      return wrapper;
    }

    const model = parseMarkdownDocument(day.text);
    wrapper.appendChild(renderCompactDayHeader(model, day));
    const metrics = renderPlanningDayMetrics(sessionDay);
    if (metrics) wrapper.appendChild(metrics);

    if (trimBlankLines(model.preamble).length) {
      const preamble = el('details', { class: 'obs-pd-plan-disclosure' });
      preamble.appendChild(el('summary', { class: 'obs-pd-plan-summary', text: 'Planning metadata / notes' }));
      const preambleBody = el('div', { class: 'obs-pd-plan-body' });
      preambleBody.appendChild(renderMarkdownLines(model.preamble));
      preamble.appendChild(preambleBody);
      wrapper.appendChild(preamble);
    }

    if (!model.sections.length) {
      wrapper.appendChild(el('div', { class: 'obs-pd-note', text: 'Known planning sections were not found. Use Raw mode to inspect the source.' }));
      return wrapper;
    }

    const currentTarget = model.sections.find((section) => normalizeHeading(section.title).includes('current target scenario'));
    if (currentTarget) {
      const renderedTarget = renderPlanningSection(currentTarget);
      if (renderedTarget) wrapper.appendChild(renderedTarget);
    }

    wrapper.appendChild(renderPlanWorkspace(model, day));

    model.sections.forEach((section) => {
      if (section === currentTarget) return;
      const rendered = renderPlanningSection(section);
      if (rendered) wrapper.appendChild(rendered);
    });
    return wrapper;
  }

  function operationalDayModel(wrapper, file) {
    if (!file) {
      wrapper.appendChild(el('div', { class: 'obs-pd-note', text:
        'No operational session day is linked.\n\nAdd a real matching path as active_session_day in planning/dashboard/index.md when the detailed file exists. D/F, support, penalties and debt are not inferred from the planning file.'
      }));
      return null;
    }
    if (file.error) {
      wrapper.appendChild(el('div', { class: 'obs-pd-error', text: `Could not load session day:\n${file.path}\n\n${file.error}` }));
      return null;
    }
    const model = parseMarkdownDocument(file.text);
    wrapper.appendChild(renderCompactDayHeader(model, file));
    const diagnostic = localOutboxDiagnostic(file);
    if (diagnostic) wrapper.appendChild(el('div', { class: 'obs-pd-section-warning', text: diagnostic.message }));
    return model;
  }

  function renderLocalSyncDisclosure(file) {
    const stats = localSyncStats();
    if (!stats.pendingCount && !stats.conflictCount) return null;
    const details = el('details', { class: 'obs-pd-plan-disclosure' });
    const summary = el('summary', { class: 'obs-pd-plan-summary' });
    summary.appendChild(el('span', { text: `Local sync · ${stats.pendingCount} pending · ${stats.conflictCount} conflict(s)` }));
    summary.appendChild(el('span', { class: 'obs-pd-plan-meta', text: 'technical details' }));
    details.appendChild(summary);
    const body = el('div', { class: 'obs-pd-plan-body' });
    body.appendChild(el('div', { class: 'obs-pd-tools-row', text: `Pending points: ${formatNumber(stats.pendingPoints)}` }));
    body.appendChild(el('div', { class: 'obs-pd-tools-row', text: `Preview work points: ${formatNumber(stats.previewWorkPoints)}` }));
    body.appendChild(el('div', { class: 'obs-pd-tools-row', text: `Operational path: ${stats.operationalPath}` }));
    details.appendChild(body);
    return details;
  }

  function renderDaySessionsTab(sessionDay) {
    const wrapper = el('div', { class: 'obs-pd-day-content' });
    const model = operationalDayModel(wrapper, sessionDay);
    if (!model) return wrapper;

    const overview = renderSessionOverview(model, sessionDay);
    if (overview) wrapper.appendChild(overview);
    const localSync = renderLocalSyncDisclosure(sessionDay);
    if (localSync) wrapper.appendChild(localSync);
    const sessions = renderSessionList(model, sessionDay);
    if (sessions) wrapper.appendChild(sessions);
    const penalties = renderPenaltySection(model);
    if (penalties) wrapper.appendChild(penalties);
    if (!overview && !sessions && !penalties) {
      wrapper.appendChild(el('div', { class: 'obs-pd-note', text: 'No session data is available.' }));
    }
    return wrapper;
  }

  function renderDaySummaryTab(sessionDay) {
    const wrapper = el('div', { class: 'obs-pd-day-content' });
    const model = operationalDayModel(wrapper, sessionDay);
    if (!model) return wrapper;

    const support = renderSupportSection(model);
    if (support) wrapper.appendChild(support);
    const carryover = renderCarryoverSection(model);
    if (carryover) wrapper.appendChild(carryover);
    const finalSummary = renderFinalSummarySection(model);
    if (finalSummary) wrapper.appendChild(finalSummary);
    const more = renderMoreOperationalDetails(model);
    if (more) wrapper.appendChild(more);
    if (!support && !carryover && !finalSummary && !more) {
      wrapper.appendChild(el('div', { class: 'obs-pd-note', text: 'No summary data is available.' }));
    }
    return wrapper;
  }

  const DAY_SUBTABS = [
    ['plan', 'Plan'],
    ['sessions', 'Sessions'],
    ['summary', 'Summary']
  ];

  function rememberCurrentDayScroll() {
    const body = document.querySelector('#obs-planning-dashboard-body');
    if (!body || !state.dayScrollTops) return;
    state.dayScrollTops[state.daySubtab] = body.scrollTop;
  }

  function restoreCurrentDayScroll(focusTab = false) {
    window.requestAnimationFrame(() => {
      const body = document.querySelector('#obs-planning-dashboard-body');
      if (body) body.scrollTop = state.dayScrollTops?.[state.daySubtab] || 0;
      if (focusTab) {
        document.querySelector(`.obs-pd-day-subtab[data-day-subtab="${state.daySubtab}"]`)?.focus();
      }
    });
  }

  function switchDaySubtab(nextKey, focusTab = false) {
    if (!DAY_SUBTABS.some(([key]) => key === nextKey) || nextKey === state.daySubtab) return;
    rememberCurrentDayScroll();
    state.daySubtab = nextKey;
    render();
    restoreCurrentDayScroll(focusTab);
  }

  function renderDaySubtabs(body) {
    if (!DAY_SUBTABS.some(([key]) => key === state.daySubtab)) state.daySubtab = 'plan';
    const tabs = el('div', { class: 'obs-pd-day-subtabs', role: 'tablist', 'aria-label': 'Day views' });
    DAY_SUBTABS.forEach(([key, label], index) => {
      tabs.appendChild(el('button', {
        class: 'obs-pd-day-subtab',
        role: 'tab',
        'data-day-subtab': key,
        'data-active': String(state.daySubtab === key),
        'aria-selected': String(state.daySubtab === key),
        tabindex: state.daySubtab === key ? '0' : '-1',
        text: label,
        onclick: () => switchDaySubtab(key),
        onkeydown: (event) => {
          if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
          event.preventDefault();
          const direction = event.key === 'ArrowRight' ? 1 : -1;
          const nextIndex = (index + direction + DAY_SUBTABS.length) % DAY_SUBTABS.length;
          switchDaySubtab(DAY_SUBTABS[nextIndex][0], true);
        }
      }));
    });
    body.appendChild(tabs);
  }

  function renderDayComposite(body) {
    const day = state.files.day;
    const sessionDay = state.files.sessionDay;

    if (state.rawMode) {
      if (day) body.appendChild(renderRawSource(day, 'Planning Day'));
      if (sessionDay) body.appendChild(renderRawSource(sessionDay, 'Operational Session Day'));
      if (!sessionDay) body.appendChild(el('div', { class: 'obs-pd-note', text: 'No active_session_day is linked. The planning day remains available; session state is not inferred.' }));
      return;
    }

    renderDaySubtabs(body);
    if (state.daySubtab === 'sessions') {
      body.appendChild(renderDaySessionsTab(sessionDay));
      return;
    }
    if (state.daySubtab === 'summary') {
      body.appendChild(renderDaySummaryTab(sessionDay));
      return;
    }
    body.appendChild(renderPlanningDayTab(day, sessionDay));
  }

  async function loadOptional(path) {
    if (!path) return null;
    try {
      const text = await fetchText(path);
      return { path, text, error: null, sha256: await sha256Text(text), loadedAt: new Date().toISOString() };
    } catch (error) {
      return { path, text: '', error: error?.message || String(error), sha256: null, loadedAt: null };
    }
  }

  async function refresh() {
    if (state.loading) return;
    state.loading = true;
    const body = document.querySelector('#obs-planning-dashboard-body');
    if (body) body.textContent = 'Loading dashboard…';

    try {
      GM_setValue('obsPlanningDashboard.baseUrl', state.baseUrl);
      GM_setValue('obsPlanningDashboard.indexPath', state.indexPath);

      try {
        state.indexText = await fetchText(state.indexPath);
        const now = new Date().toISOString();
        const paths = parseIndex(state.indexText);
        state.files = {
          index: {
            path: state.indexPath,
            text: state.indexText,
            error: null,
            sha256: await sha256Text(state.indexText),
            loadedAt: now
          }
        };
        state.groups = { goalMaps: [] };

        const fileEntries = Object.entries({
          previousYear: paths.previousYear,
          year: paths.year,
          period: paths.period,
          week: paths.week,
          day: paths.day,
          sessionDay: paths.sessionDay,
          deferredWork: paths.deferredWork,
          deferredIdeas: paths.deferredIdeas
        });

        const loadedFiles = await Promise.all(fileEntries.map(async ([key, path]) => [key, await loadOptional(path)]));
        loadedFiles.forEach(([key, file]) => {
          if (file) state.files[key] = file;
        });

        const loadedGoals = await Promise.all((paths.goalMaps || []).map(loadOptional));
        state.groups.goalMaps = loadedGoals.filter(Boolean);
        const previousSnapshotSavedAt = state.snapshotSavedAt;
        state.sourceMode = 'live';
        state.lastLoadError = null;
        reconcileOutboxWithLiveFile(state.files.sessionDay);

        try {
          await writeSnapshot(snapshotFromState(now));
          state.snapshotSavedAt = now;
        } catch (cacheWriteError) {
          state.snapshotSavedAt = previousSnapshotSavedAt || null;
          console.warn('OBS dashboard snapshot write failed; live data remains active', cacheWriteError);
        }

        publishSessionContext();
        render();
        return;
      } catch (liveError) {
        state.lastLoadError = liveError?.message || String(liveError);
      }

      try {
        const snapshot = await readSnapshot();
        restoreSnapshot(snapshot);
        publishSessionContext();
        render();
      } catch (cacheError) {
        state.sourceMode = 'none';
        state.snapshotSavedAt = null;
        state.indexText = '';
        state.files = {};
        state.groups = { goalMaps: [] };
        publishSessionContext();
        updateHeaderStatus();
        if (body) {
          body.innerHTML = '';
          body.appendChild(runtimeStatusNode());
          body.appendChild(el('div', { class: 'obs-pd-error', text:
            `Could not load dashboard index or compatible browser snapshot.

Localhost: ${state.lastLoadError}
Cache: ${cacheError?.message || cacheError}

Check:
1. Run python -m http.server 8765 from repo root.
2. Confirm Base URL and Index.
3. Confirm planning/dashboard/index.md exists.`
          }));
        }
      }
    } finally {
      state.loading = false;
    }
  }

  function localSyncStats() {
    const file = state.files.sessionDay;
    const date = dateFromOperationalPath(file?.path);
    const day = date ? readOutbox().days?.[date] : null;
    const sessions = Array.isArray(day?.sessions) ? day.sessions : [];
    const pending = sessions.filter((session) => session.status === 'pending');
    const conflicts = sessions.filter((session) => session.status === 'conflict');
    const pendingPoints = pending.reduce((sum, session) => sum + parseNumber(session.points), 0);
    const summarySubsection = file && !file.error ? findSubsection(parseMarkdownDocument(file.text), 'work score summary') : null;
    const values = tableToKeyValue(summarySubsection ? parseFirstTable(summarySubsection.lines) : null);
    const workPoints = parseNumber(pickKeyValue(values, ['Work Points']));
    return {
      pendingCount: pending.length,
      conflictCount: conflicts.length,
      pendingPoints,
      previewWorkPoints: workPoints + pendingPoints,
      operationalPath: day?.operationalPath || file?.path || 'not provided',
      activePath: file?.path || 'not provided',
      pathMatch: !day?.operationalPath || !file?.path || day.operationalPath === file.path
    };
  }

  function toolsButton(label, onclick) {
    return el('button', { class: 'obs-pd-btn', text: label, onclick });
  }

  function renderTools() {
    const drawer = document.querySelector('#obs-planning-dashboard-tools');
    const toolsButtonNode = document.querySelector('#obs-planning-dashboard-tools-button');
    if (!drawer) return;
    drawer.setAttribute('data-open', String(state.toolsOpen));
    drawer.setAttribute('aria-hidden', String(!state.toolsOpen));
    drawer.toggleAttribute('inert', !state.toolsOpen);
    const stats = localSyncStats();
    if (toolsButtonNode) {
      toolsButtonNode.setAttribute('aria-expanded', String(state.toolsOpen));
      toolsButtonNode.textContent = stats.pendingCount || stats.conflictCount
        ? `Tools ${stats.pendingCount + stats.conflictCount}`
        : 'Tools';
    }
    drawer.innerHTML = '';

    const head = el('div', { class: 'obs-pd-tools-head' });
    head.appendChild(el('h2', { id: 'obs-planning-dashboard-tools-title', text: 'Tools' }));
    head.appendChild(el('button', {
      class: 'obs-pd-btn',
      text: '×',
      'aria-label': 'Close Tools',
      onclick: () => {
        state.toolsOpen = false;
        renderTools();
        toolsButtonNode?.focus();
      }
    }));
    drawer.appendChild(head);

    const statusSection = el('section', { class: 'obs-pd-tools-section' });
    statusSection.appendChild(el('h3', { text: 'Status & diagnostics' }));
    const modeLabel = state.sourceMode === 'live' ? 'Live localhost'
      : state.sourceMode === 'offline-cache' ? 'Offline cache'
      : 'No data';
    const snapshot = state.snapshotSavedAt ? new Date(state.snapshotSavedAt).toLocaleString() : 'not available';
    statusSection.appendChild(el('div', { class: 'obs-pd-tools-row', text: `Mode: ${modeLabel}` }));
    statusSection.appendChild(el('div', { class: 'obs-pd-tools-row', text: `Snapshot: ${snapshot}` }));
    statusSection.appendChild(el('div', { class: 'obs-pd-tools-row', text: `Base URL: ${state.baseUrl}` }));
    statusSection.appendChild(el('div', { class: 'obs-pd-tools-row', text: `Index: ${state.indexPath}` }));
    if (state.lastLoadError) statusSection.appendChild(el('div', { class: 'obs-pd-tools-row', text: `Last error: ${state.lastLoadError}` }));
    drawer.appendChild(statusSection);

    const sourceSection = el('section', { class: 'obs-pd-tools-section' });
    sourceSection.appendChild(el('h3', { text: 'Source & file' }));
    sourceSection.appendChild(el('div', { class: 'obs-pd-tools-row', text: `Planning: ${state.files.day?.path || 'not provided'}` }));
    sourceSection.appendChild(el('div', { class: 'obs-pd-tools-row', text: `Operational: ${state.files.sessionDay?.path || 'not provided'}` }));
    sourceSection.appendChild(el('div', { class: 'obs-pd-tools-actions' }, [
      toolsButton('Open current', openCurrentSource),
      toolsButton('Refresh', refresh)
    ]));
    drawer.appendChild(sourceSection);

    const syncSection = el('section', { class: 'obs-pd-tools-section' });
    syncSection.appendChild(el('h3', { text: 'Local sync' }));
    syncSection.appendChild(el('div', { class: 'obs-pd-tools-row' }, [
      el('span', { text: `Pending sessions: ${stats.pendingCount}` }),
      ...(stats.pendingCount ? [el('span', { class: 'obs-pd-tools-indicator', text: String(stats.pendingCount) })] : [])
    ]));
    syncSection.appendChild(el('div', { class: 'obs-pd-tools-row', text: `Pending points: ${formatNumber(stats.pendingPoints)}` }));
    syncSection.appendChild(el('div', { class: 'obs-pd-tools-row', text: `Preview work points: ${formatNumber(stats.previewWorkPoints)}` }));
    syncSection.appendChild(el('div', { class: 'obs-pd-tools-row', text: `Conflicts: ${stats.conflictCount}` }));
    syncSection.appendChild(el('div', { class: 'obs-pd-tools-row', text: `Outbox path: ${stats.operationalPath}` }));
    if (!stats.pathMatch) {
      syncSection.appendChild(el('div', { class: 'obs-pd-tools-row', text: `Active path mismatch: ${stats.activePath}` }));
    }
    drawer.appendChild(syncSection);

    const localPlanSection = el('section', { class: 'obs-pd-tools-section' });
    localPlanSection.appendChild(el('h3', { text: 'Local day planning' }));
    const localPayload = currentLocalPlanningExport();
    const localDay = localPayload?.day;
    localPlanSection.appendChild(el('div', { class: 'obs-pd-tools-row', text: `Day: ${localDay?.date || planningDayIdentity(state.files.day).date}` }));
    const localStates = Object.values(localDay?.planItems || {});
    localPlanSection.appendChild(el('div', { class: 'obs-pd-tools-row', text: `Session-planned items: ${localStates.filter((item) => item?.executionMode === 'sessions').length}` }));
    localPlanSection.appendChild(el('div', { class: 'obs-pd-tools-row', text: `Time-planned items: ${localStates.filter((item) => item?.executionMode === 'hours').length}` }));
    localPlanSection.appendChild(el('div', { class: 'obs-pd-tools-row', text: `Local plan items: ${Object.keys(localDay?.localPlanItems || {}).length}` }));
    localPlanSection.appendChild(el('div', { class: 'obs-pd-tools-row', text: `Local sessions: ${Object.keys(localDay?.localSessions || {}).length}` }));
    localPlanSection.appendChild(el('div', { class: 'obs-pd-tools-row', text: `Repository Scope Unit plans: ${Object.keys(localDay?.scopeUnits || {}).length}` }));
    localPlanSection.appendChild(el('div', { class: 'obs-pd-tools-row', text: `Plan item notes/status: ${Object.keys(localDay?.planItems || {}).length}` }));
    localPlanSection.appendChild(el('div', { class: 'obs-pd-tools-row', text: `Local Goal Maps: ${(localPayload?.goalMaps || []).length}` }));
    localPlanSection.appendChild(el('div', { class: 'obs-pd-tools-actions' }, [
      toolsButton('Copy local plan', copyLocalPlanningJson),
      toolsButton('Download local plan', downloadLocalPlanningJson),
      toolsButton('Open Goal Maps', () => {
        state.toolsOpen = false;
        state.activeTab = 'goalMaps';
        render();
      })
    ]));
    drawer.appendChild(localPlanSection);

    const actions = el('section', { class: 'obs-pd-tools-section' });
    actions.appendChild(el('h3', { text: 'Actions' }));
    actions.appendChild(el('div', { class: 'obs-pd-tools-actions' }, [
      toolsButton('Copy AI prompt', copyUpdatePrompt),
      toolsButton('Copy pending', copyPendingJson),
      toolsButton('Download pending', downloadPendingJson),
      toolsButton(state.rawMode ? 'Formatted' : 'Raw', () => { state.rawMode = !state.rawMode; state.toolsOpen = false; render(); }),
      toolsButton('Settings', () => { state.settingsOpen = !state.settingsOpen; state.toolsOpen = false; render(); }),
      toolsButton('Capture', () => {
        state.toolsOpen = false;
        renderTools();
        dispatchScriptToggle('obsPlanningCaptureToggle', 'obs-planning-capture-toggle');
      }),
      toolsButton('Commands', () => {
        state.toolsOpen = false;
        renderTools();
        dispatchScriptToggle('obsPlanningCommandsToggle', 'obs-planning-commands-toggle');
      })
    ]));
    drawer.appendChild(actions);
  }

  function dispatchDashboardVisibility(open) {
    document.documentElement.dataset.obsPlanningDashboardOpen = open ? 'true' : 'false';
    try {
      window.dispatchEvent(new CustomEvent('obs-planning-dashboard-visibility', { detail: { open: Boolean(open) } }));
    } catch {}
  }


  function dispatchScriptToggle(datasetKey, eventName) {
    const token = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    document.documentElement.dataset[datasetKey] = token;
    try { window.dispatchEvent(new CustomEvent(eventName, { detail: { token } })); } catch {}
  }

  function updateLocalGoalMap(goalMapId, patch) {
    const store = readLocalPlanningStore();
    const current = store.goalMaps?.[goalMapId];
    if (!current) return null;
    store.goalMaps[goalMapId] = { ...current, ...patch, updatedAt: new Date().toISOString() };
    if (!writeLocalPlanningStore(store)) {
      throw new Error('Could not save the local Goal Map.');
    }
    return store.goalMaps[goalMapId];
  }

  function localGoalMapMarkdown(map) {
    const section = (title, value) => `\n## ${title}\n\n${String(value || 'not provided').trim() || 'not provided'}\n`;
    return [
      `# ${map.title || `Goal Map — ${map.sourceItemId || map.id}`}`,
      '',
      `Status: ${map.status || 'local draft'}`,
      `Source Day: ${map.sourceDay || 'not provided'}`,
      `Source Path: ${map.sourcePath || 'not provided'}`,
      `Source Item: ${map.sourceItemId || 'not provided'}`,
      `Source Level: ${map.sourceLevel || 'not provided'}`,
      section('Goal', map.goal),
      section('Why', map.why),
      section('Success', map.success),
      section('Current State', map.currentState),
      section('Unknowns', map.unknowns),
      section('Approaches', map.approaches),
      section('Steps', map.steps),
      section('Checks', map.checks),
      section('Risks / Constraints', map.risks),
      section('Results / Evidence', map.resultsEvidence)
    ].join('\n').replace(/\n{3,}/g, '\n\n').trim() + '\n';
  }

  function deleteLocalGoalMap(goalMapId) {
    const store = readLocalPlanningStore();
    const map = store.goalMaps?.[goalMapId];
    if (!map || !confirm(`Delete local Goal Map ${goalMapId}? Repository files are not affected.`)) return;
    delete store.goalMaps[goalMapId];
    Object.values(store.days || {}).forEach((day) => {
      day.goalMapIds = (day.goalMapIds || []).filter((id) => id !== goalMapId);
      Object.values(day.planItems || {}).forEach((item) => {
        if (item.goalMapId === goalMapId) delete item.goalMapId;
      });
    });
    if (!writeLocalPlanningStore(store)) {
      throw new Error('Could not delete the local Goal Map.');
    }
    if (state.activeLocalGoalMapId === goalMapId) state.activeLocalGoalMapId = null;
    render();
  }

  function renderLocalGoalMaps(body) {
    const maps = localGoalMaps();
    const heading = el('div', { class: 'obs-pd-workspace-head' }, [
      el('h2', { text: 'Local Goal Maps' }),
      el('span', { class: 'obs-pd-local-only', text: 'local only' }),
      el('div', { class: 'obs-pd-workspace-hint', text: 'Detailed local planning created from a Plan Core item. Nothing is written to the repository automatically.' })
    ]);
    body.appendChild(heading);
    if (!maps.length) {
      body.appendChild(el('div', { class: 'obs-pd-note', text: 'No local Goal Maps yet. Use “Expand to Goal Map” on a plan item.' }));
      return;
    }

    const fieldDefinitions = [
      ['goal', 'Goal', true],
      ['why', 'Why', false],
      ['success', 'Success', false],
      ['currentState', 'Current State', false],
      ['unknowns', 'Unknowns', false],
      ['approaches', 'Approaches', false],
      ['steps', 'Steps', true],
      ['checks', 'Checks', false],
      ['risks', 'Risks / Constraints', false],
      ['resultsEvidence', 'Results / Evidence', true]
    ];

    maps.forEach((map) => {
      const details = el('details', {
        class: 'obs-pd-local-goal-map',
        'data-local-goal-map-id': map.id
      });
      details.open = state.activeLocalGoalMapId === map.id;
      details.addEventListener('toggle', () => {
        if (details.open) state.activeLocalGoalMapId = map.id;
      });
      details.appendChild(el('summary', { text: `${map.id} · ${map.goal || map.title || 'Goal Map'}` }));
      const mapBody = el('div', { class: 'obs-pd-goal-map-body' });
      mapBody.appendChild(el('div', {
        class: 'obs-pd-goal-map-meta',
        text: `${map.status || 'local draft'} · ${map.sourceDay || 'undated'} · ${map.sourceItemId || 'item'} · ${map.sourceLevel || 'unassigned'}\n${map.sourcePath || ''}`
      }));

      const status = el('select', { class: 'obs-pd-local-select', 'aria-label': `Status for ${map.id}` });
      ['local draft', 'active', 'resolved'].forEach((value) => status.appendChild(el('option', { value, text: value })));
      status.value = map.status || 'local draft';
      status.addEventListener('change', () => {
        try {
          updateLocalGoalMap(map.id, { status: status.value });
        } catch (error) {
          console.warn('OBS Goal Map status save failed', error);
          status.value = map.status || 'local draft';
          alert(error?.message || 'Could not save the local Goal Map status.');
        }
      });
      mapBody.appendChild(el('label', { class: 'obs-pd-field-label', text: 'Status' }, [status]));

      const grid = el('div', { class: 'obs-pd-goal-map-grid' });
      fieldDefinitions.forEach(([field, label, wide]) => {
        const input = el('textarea', {
          class: 'obs-pd-local-textarea',
          placeholder: `${label}…`,
          'aria-label': `${label} for ${map.id}`
        });
        input.value = map[field] || '';
        bindDebouncedLocalInput(input, (value) => updateLocalGoalMap(map.id, { [field]: value }));
        grid.appendChild(el('label', { class: 'obs-pd-field-label', 'data-wide': String(Boolean(wide)), text: label }, [input]));
      });
      mapBody.appendChild(grid);

      const actions = el('div', { class: 'obs-pd-item-actions' });
      actions.appendChild(el('button', {
        class: 'obs-pd-btn',
        text: 'Copy as Markdown',
        onclick: () => copyText(localGoalMapMarkdown(readLocalPlanningStore().goalMaps[map.id] || map))
      }));
      actions.appendChild(el('button', {
        class: 'obs-pd-btn',
        text: 'Delete local draft',
        onclick: () => {
          try {
            deleteLocalGoalMap(map.id);
          } catch (error) {
            console.warn('OBS Goal Map delete failed', error);
            alert(error?.message || 'Could not delete the local Goal Map.');
          }
        }
      }));
      mapBody.appendChild(actions);
      details.appendChild(mapBody);
      body.appendChild(details);
    });
  }

  function currentLocalPlanningExport() {
    const store = readLocalPlanningStore();
    const identity = planningDayIdentity(state.files.day);
    const day = store.days[identity.key];
    if (!day) return null;
    const goalMaps = (day.goalMapIds || []).map((id) => store.goalMaps[id]).filter(Boolean);
    return {
      schema: LOCAL_PLAN_SCHEMA,
      exportedAt: new Date().toISOString(),
      day,
      goalMaps
    };
  }

  function copyLocalPlanningJson() {
    const payload = currentLocalPlanningExport();
    if (!payload) return alert('No local planning data for the active day.');
    copyText(JSON.stringify(payload, null, 2));
  }

  function downloadLocalPlanningJson() {
    const payload = currentLocalPlanningExport();
    if (!payload) return alert('No local planning data for the active day.');
    const blob = new Blob([JSON.stringify(payload, null, 2) + '\n'], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `obs-local-day-plan-${payload.day.date || 'undated'}.json`;
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function tabDefinitions() {
    return [
      ['index', 'Index', 'file'],
      ['previousYear', 'Previous Year', 'file'],
      ['year', 'Year', 'file'],
      ['period', 'Period', 'file'],
      ['week', 'Week', 'file'],
      ['day', 'Day', 'day'],
      ['goalMaps', 'Goal Maps', 'group'],
      ['deferredWork', 'Deferred Work', 'file'],
      ['deferredIdeas', 'Deferred Ideas', 'file']
    ].filter(([key, , kind]) => {
      if (kind === 'group') {
        if (key === 'goalMaps') return (state.groups[key] || []).length > 0 || localGoalMaps().length > 0;
        return (state.groups[key] || []).length > 0;
      }
      if (kind === 'day') return Boolean(state.files.day || state.files.sessionDay);
      return Boolean(state.files[key]);
    });
  }

  function currentPrimaryFile() {
    if (state.activeTab === 'day') {
      return state.daySubtab === 'plan'
        ? (state.files.day || state.files.sessionDay || null)
        : (state.files.sessionDay || state.files.day || null);
    }
    const group = state.groups[state.activeTab];
    if (group?.length) return group[0];
    return state.files[state.activeTab] || null;
  }

  function render() {
    const tabs = document.querySelector('#obs-planning-dashboard-tabs');
    const body = document.querySelector('#obs-planning-dashboard-body');
    const modeButton = document.querySelector('#obs-planning-dashboard-mode');
    const settings = document.querySelector('#obs-planning-dashboard-settings');
    if (!tabs || !body) return;

    tabs.innerHTML = '';
    body.innerHTML = '';
    updateHeaderStatus();
    renderTools();
    if (modeButton) modeButton.textContent = state.rawMode ? 'Formatted' : 'Raw';
    if (settings) settings.setAttribute('data-open', String(state.settingsOpen));

    const definitions = tabDefinitions();
    if (!definitions.some(([key]) => key === state.activeTab)) state.activeTab = definitions[0]?.[0] || 'index';

    definitions.forEach(([key, label]) => {
      tabs.appendChild(el('button', {
        class: 'obs-pd-btn obs-pd-tab',
        'data-active': String(state.activeTab === key),
        text: label,
        onclick: () => {
          state.activeTab = key;
          if (key === 'day') state.daySubtab = 'plan';
          render();
        }
      }));
    });

    if (state.activeTab === 'day') {
      renderDayComposite(body);
      return;
    }

    const group = state.groups[state.activeTab];
    if (state.activeTab === 'goalMaps') {
      renderLocalGoalMaps(body);
      if (group?.length) {
        body.appendChild(el('div', { class: 'obs-pd-section-title', text: 'Repository Goal Maps' }));
        group.forEach((file, index) => renderLoadedFile(body, file, `Repository Goal Map ${index + 1}`));
      }
      return;
    }
    if (group) {
      if (!group.length) body.appendChild(el('div', { class: 'obs-pd-note', text: 'No files loaded for this group.' }));
      group.forEach((file, index) => renderLoadedFile(body, file, `Goal Map ${index + 1}`));
      return;
    }

    const file = state.files[state.activeTab];
    renderLoadedFile(body, file, state.activeTab === 'index' ? 'Dashboard Index' : 'Source');
  }

  function activeFileOrGroupText() {
    if (state.activeTab === 'day') {
      const files = [state.files.day, state.files.sessionDay].filter(Boolean);
      return files.map((file) => `path: ${file.path}\n\n${file.error ? `LOAD ERROR: ${file.error}` : file.text}`).join('\n\n---\n\n');
    }

    const group = state.groups[state.activeTab];
    if (group?.length) {
      return group.map((file) => `path: ${file.path}\n\n${file.error ? `LOAD ERROR: ${file.error}` : file.text}`).join('\n\n---\n\n');
    }

    const file = state.files[state.activeTab];
    if (!file) return '';
    return `path: ${file.path}\n\n${file.error ? `LOAD ERROR: ${file.error}` : file.text}`;
  }

  function copyUpdatePrompt() {
    const current = activeFileOrGroupText();
    if (!current) return;

    const dayRule = state.activeTab === 'day'
      ? [
          'The planning-day file and operational session-day file have separate ownership.',
          'Do not copy or invent D/F, support, penalties or debt inside the planning-day file.',
          'Preserve every referenced goal when a session worked on several goals.'
        ]
      : [];

    const prompt = [
      '[PLANNING_DASHBOARD_UPDATE]',
      'Update the supplied local planning source content using its owner templates and workflows.',
      'Preserve source-of-truth boundaries.',
      'Do not invent user facts.',
      'Use not provided for unknown planning fields.',
      'Mark unclear work explicitly instead of treating it as progress.',
      ...dayRule,
      '',
      'current_content:',
      '```markdown',
      current,
      '```',
      '[/PLANNING_DASHBOARD_UPDATE]'
    ].join('\n');

    navigator.clipboard.writeText(prompt).catch(() => {});
  }

  function openCurrentSource() {
    const file = currentPrimaryFile();
    if (!file) return;
    window.open(buildLocalUrl(file.path), '_blank', 'noopener,noreferrer');
  }

  function preferredOpenTab() {
    return state.files.day || state.files.sessionDay ? 'day' : 'index';
  }

  async function setDashboardOpen(open) {
    const panel = document.querySelector('#obs-planning-dashboard-panel');
    if (!panel) return;
    const nextOpen = Boolean(open);
    panel.setAttribute('data-open', String(nextOpen));
    dispatchDashboardVisibility(nextOpen);
    if (!nextOpen) {
      state.toolsOpen = false;
      return;
    }
    state.toolsOpen = false;
    if (!state.indexText) await refresh();
    state.activeTab = preferredOpenTab();
    state.daySubtab = 'plan';
    state.dayScrollTops = { plan: 0, sessions: 0, summary: 0 };
    render();
    const body = document.querySelector('#obs-planning-dashboard-body');
    if (body) body.scrollTop = 0;
  }

  async function toggleDashboardPanel() {
    const panel = document.querySelector('#obs-planning-dashboard-panel');
    if (!panel) return;
    await setDashboardOpen(panel.getAttribute('data-open') !== 'true');
  }

  function closeDashboardPanel() {
    const panel = document.querySelector('#obs-planning-dashboard-panel');
    if (panel?.getAttribute('data-open') === 'true') {
      panel.setAttribute('data-open', 'false');
      state.toolsOpen = false;
      dispatchDashboardVisibility(false);
    }
  }

  function handleDashboardShortcut(event) {
    if (event.repeat) return;
    const key = String(event.key || '');
    if (event.altKey && !event.ctrlKey && !event.metaKey && key === 'F3') {
      event.preventDefault();
      event.stopPropagation();
      toggleDashboardPanel();
      return;
    }
    if (key === 'Escape') {
      const panel = document.querySelector('#obs-planning-dashboard-panel');
      if (panel?.getAttribute('data-open') === 'true') {
        event.preventDefault();
        event.stopPropagation();
        if (state.toolsOpen) {
          state.toolsOpen = false;
          renderTools();
          document.querySelector('#obs-planning-dashboard-tools-button')?.focus();
        } else {
          closeDashboardPanel();
        }
      }
    }
  }

  function buildUI() {
    if (document.querySelector('#obs-planning-dashboard-btn')) return;

    const openButton = el('button', { id: 'obs-planning-dashboard-btn', text: 'Planning' });
    const panel = el('div', { id: 'obs-planning-dashboard-panel', 'data-open': 'false' });

    const title = el('div', { class: 'obs-pd-title' }, [
      el('div', { class: 'obs-pd-title-main', text: 'OBS Local Planning Dashboard' }),
      el('div', { id: 'obs-planning-dashboard-source-status', class: 'obs-pd-title-sub', text: 'No data' })
    ]);

    const header = el('div', { class: 'obs-pd-header' }, [
      title,
      el('button', { class: 'obs-pd-btn', text: 'Refresh', onclick: refresh }),
      el('button', {
        id: 'obs-planning-dashboard-tools-button',
        class: 'obs-pd-btn',
        text: 'Tools',
        'aria-controls': 'obs-planning-dashboard-tools',
        'aria-expanded': 'false',
        onclick: () => {
          state.toolsOpen = !state.toolsOpen;
          renderTools();
          if (state.toolsOpen) {
            window.requestAnimationFrame(() => {
              document.querySelector('#obs-planning-dashboard-tools button')?.focus();
            });
          }
        }
      }),
      el('button', { class: 'obs-pd-btn', text: '×', onclick: closeDashboardPanel })
    ]);

    const baseInput = el('input', {
      class: 'obs-pd-input',
      value: state.baseUrl,
      onchange: (event) => { state.baseUrl = event.target.value; }
    });
    const indexInput = el('input', {
      class: 'obs-pd-input',
      value: state.indexPath,
      onchange: (event) => {
        state.indexPath = normalizeIndexPathSetting(event.target.value);
        event.target.value = state.indexPath;
      }
    });

    const settings = el('div', { id: 'obs-planning-dashboard-settings', class: 'obs-pd-settings', 'data-open': 'false' }, [
      el('label', { text: 'Base URL' }),
      baseInput,
      el('label', { text: 'Index' }),
      indexInput
    ]);

    panel.appendChild(header);
    panel.appendChild(settings);
    panel.appendChild(el('div', { id: 'obs-planning-dashboard-tabs', class: 'obs-pd-tabs' }));
    panel.appendChild(el('div', { id: 'obs-planning-dashboard-body', class: 'obs-pd-body' }));
    panel.appendChild(el('aside', {
      id: 'obs-planning-dashboard-tools',
      class: 'obs-pd-tools',
      'data-open': 'false',
      'aria-hidden': 'true',
      inert: '',
      'aria-labelledby': 'obs-planning-dashboard-tools-title'
    }));

    openButton.addEventListener('click', toggleDashboardPanel);

    document.body.appendChild(openButton);
    document.body.appendChild(panel);
  }

  window.addEventListener('obs-planning-outbox-updated', () => {
    if (state.indexText) render();
  });
  window.addEventListener('storage', (event) => {
    if (event.key === OUTBOX_KEY && state.indexText) render();
  });

  buildUI();
  window.addEventListener('keydown', handleDashboardShortcut, true);
})();
