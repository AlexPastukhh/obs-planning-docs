// ==UserScript==
// @name         OBS Local Planning Dashboard Viewer
// @namespace    https://github.com/AlexPastukhh/obs/planning-dashboard
// @version      0.4.9
// @description  Local-first read-only planning dashboard with offline snapshot cache, pending sessions, and reviewed batch export.
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
    rawMode: false,
    settingsOpen: false,
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
      color: #94a3b8;
      font-size: 11px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
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
    const label = state.sourceMode === 'live' ? 'Live localhost'
      : state.sourceMode === 'offline-cache' ? 'Offline cache'
      : 'No data';
    node.textContent = state.snapshotSavedAt ? `${label} · ${new Date(state.snapshotSavedAt).toLocaleString()}` : label;
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

  function scenarioKind(title) {
    const normalized = normalizeHeading(title);
    if (normalized.includes('minimum')) return 'minimum';
    if (normalized === 'base' || normalized.includes(' base')) return 'base';
    if (normalized.includes('desired')) return 'desired';
    if (normalized.includes('max') || normalized.includes('very wide')) return 'max';
    return 'other';
  }

  function renderPlanCore(section) {
    const wrapper = document.createDocumentFragment();
    wrapper.appendChild(el('div', { class: 'obs-pd-section-title', text: section.title }));

    if (trimBlankLines(section.lines).length) {
      const intro = el('div', { class: 'obs-pd-card' });
      intro.appendChild(renderMarkdownLines(section.lines));
      wrapper.appendChild(intro);
    }

    const grid = el('div', { class: 'obs-pd-grid' });
    section.subsections.forEach((subsection) => {
      const card = el('div', { class: 'obs-pd-scenario-card', 'data-scenario': scenarioKind(subsection.title) });
      card.appendChild(el('h3', { text: subsection.title }));
      card.appendChild(renderMarkdownLines(subsection.lines));
      grid.appendChild(card);
    });

    if (section.subsections.length) wrapper.appendChild(grid);
    return wrapper;
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

  function scoreCard(label, value, tone) {
    const card = el('div', { class: 'obs-pd-score-card', 'data-tone': tone || 'neutral' });
    card.appendChild(el('div', { class: 'obs-pd-score-label', text: label }));
    card.appendChild(el('div', { class: 'obs-pd-score-value', text: value || '—' }));
    return card;
  }

  function extractSupportMetric(documentModel, pattern) {
    const match = documentModel.raw.match(pattern);
    return match ? cleanCell(match[1]) : '';
  }

  function renderSessionOverview(documentModel, file) {
    const summarySubsection = findSubsection(documentModel, 'work score summary');
    const summaryTable = summarySubsection ? parseFirstTable(summarySubsection.lines) : null;
    const values = tableToKeyValue(summaryTable);

    const workPointsText = pickKeyValue(values, ['Work Points']);
    const incomingDebt = carryoverDebtValue(documentModel, values);
    const pendingSessions = activePendingSessions(file);
    const pendingPoints = pendingSessions.reduce((sum, session) => sum + parseNumber(session.points), 0);
    const cards = [
      ['Work Points', workPointsText, 'neutral'],
      ...(pendingSessions.length ? [
        ['Pending Points', formatNumber(pendingPoints), 'warn'],
        ['Preview Work Points', formatNumber(parseNumber(workPointsText) + pendingPoints), 'good']
      ] : []),
      ['Penalties', pickKeyValue(values, ['Penalties', 'Penalties / planned carryover']), 'bad'],
      ['Net Work Score', pickKeyValue(values, ['Net Work Score']), 'good'],
      ['Incoming Debt', incomingDebt, 'violet'],
      ['Net After Debt', pickKeyValue(values, ['Net score after carryover', 'Net after debt']), 'warn'],
      ['Current-Day Score', pickKeyValue(values, ['Current-day score', 'Remaining current-day score']), 'warn']
    ].filter(([, value]) => value);

    if (!cards.length) return null;

    const wrapper = document.createDocumentFragment();
    wrapper.appendChild(el('div', { class: 'obs-pd-section-title', text: 'Session Overview' }));
    const grid = el('div', { class: 'obs-pd-score-grid' });
    cards.forEach(([label, value, tone]) => grid.appendChild(scoreCard(label, value, tone)));
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

  function renderDayComposite(body) {
    const day = state.files.day;
    const sessionDay = state.files.sessionDay;

    if (state.rawMode) {
      if (day) body.appendChild(renderRawSource(day, 'Planning Day'));
      if (sessionDay) body.appendChild(renderRawSource(sessionDay, 'Operational Session Day'));
      if (!sessionDay) body.appendChild(el('div', { class: 'obs-pd-note', text: 'No active_session_day is linked. The planning day remains available; session state is not inferred.' }));
      return;
    }

    const layout = el('div', { class: 'obs-pd-two-column' });
    const planningPane = el('div', { class: 'obs-pd-pane' });
    const sessionPane = el('div', { class: 'obs-pd-pane' });

    if (day) {
      if (day.error) {
        planningPane.appendChild(sourceBar(day.path, 'Planning Day'));
        planningPane.appendChild(el('div', { class: 'obs-pd-error', text: day.error }));
      } else {
        planningPane.appendChild(renderFormattedDocument(day.path, day.text, 'Planning Day'));
      }
    } else {
      planningPane.appendChild(el('div', { class: 'obs-pd-note', text: 'No active planning day is linked.' }));
    }

    if (sessionDay) {
      sessionPane.appendChild(renderSessionLedger(sessionDay));
    } else {
      sessionPane.appendChild(el('div', { class: 'obs-pd-note', text:
        'No operational session day is linked.\n\nAdd a real matching path as active_session_day in planning/dashboard/index.md when the detailed file exists. D/F, support, penalties and debt are not inferred from the planning file.'
      }));
    }

    layout.appendChild(planningPane);
    layout.appendChild(sessionPane);
    body.appendChild(layout);
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
      if (kind === 'group') return (state.groups[key] || []).length > 0;
      if (kind === 'day') return Boolean(state.files.day || state.files.sessionDay);
      return Boolean(state.files[key]);
    });
  }

  function currentPrimaryFile() {
    if (state.activeTab === 'day') return state.files.day || state.files.sessionDay || null;
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
    body.appendChild(runtimeStatusNode());
    updateHeaderStatus();
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
          render();
        }
      }));
    });

    if (state.activeTab === 'day') {
      renderDayComposite(body);
      return;
    }

    const group = state.groups[state.activeTab];
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
    panel.setAttribute('data-open', String(Boolean(open)));
    if (!open) return;
    if (!state.indexText) await refresh();
    state.activeTab = preferredOpenTab();
    render();
  }

  async function toggleDashboardPanel() {
    const panel = document.querySelector('#obs-planning-dashboard-panel');
    if (!panel) return;
    await setDashboardOpen(panel.getAttribute('data-open') !== 'true');
  }

  function closeDashboardPanel() {
    const panel = document.querySelector('#obs-planning-dashboard-panel');
    if (panel?.getAttribute('data-open') === 'true') panel.setAttribute('data-open', 'false');
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
        closeDashboardPanel();
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
      el('button', { class: 'obs-pd-btn', text: 'Open', onclick: openCurrentSource }),
      el('button', { class: 'obs-pd-btn', text: 'Copy AI prompt', onclick: copyUpdatePrompt }),
      el('button', { class: 'obs-pd-btn', text: 'Copy pending', onclick: copyPendingJson }),
      el('button', { class: 'obs-pd-btn', text: 'Download pending', onclick: downloadPendingJson }),
      el('button', {
        id: 'obs-planning-dashboard-mode',
        class: 'obs-pd-btn',
        text: 'Raw',
        onclick: () => {
          state.rawMode = !state.rawMode;
          render();
        }
      }),
      el('button', {
        class: 'obs-pd-btn',
        text: '⚙',
        onclick: () => {
          state.settingsOpen = !state.settingsOpen;
          render();
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
