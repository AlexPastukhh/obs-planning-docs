# OBS Tampermonkey Tools

Status: active reusable/project planning tool index
Doc version: v0.6.2
Scope: tracked Tampermonkey scripts used by the OBS planning system, including reusable command projection and project planning runtime tools.

## 1. Tracked scripts

```text
planning/documentation/tools/tampermonkey/chat-command-palette.user.js
  reusable command projection only; command meaning stays in owner documentation.
  Its floating launcher hides while Dashboard is open; Alt+F2 and Tools -> Commands remain available.

planning/documentation/tools/tampermonkey/local-planning-dashboard-viewer.user.js
  read-only local-first dashboard projection; opens on Day -> Plan by default,
  uses a compact planning-first shell with Plan / Sessions / Summary subtabs,
  moves diagnostics, exports, Raw, settings and local sync into a closed-by-default Tools drawer,
  keeps a source-bound IndexedDB snapshot, displays pending local sessions and exports reviewed JSON.

planning/documentation/tools/tampermonkey/planning-pattern-capture.user.js
  local D/F pattern capture with a docked launcher above Planning/Commands,
  a centered draggable/resizable work panel and Alt+F1 toggle.
  Its floating launcher hides while Dashboard is open; Alt+F1 and Tools -> Capture remain available.
  It also provides the one-click 10/20/30-minute session timer, sound/system notifications,
  and one-click finished-session capture into the shared pending outbox.
```

Do not create competing tracked copies of the same script.

## 2. Authority boundary

```text
Repo Markdown files are durable source of truth.
Tampermonkey scripts are browser-side capture/projection tools.
They do not write repo files, run git, commit or push.
A pending-session JSON export becomes repo state only after a reviewed replacement archive is applied.
Tampermonkey command projection does not define command meaning.
```

Command semantics must come from:

```text
planning/planning-use-case-map.md
planning/documentation/command-creation-workflow.md
planning/documentation/tampermonkey-command-projection-workflow.md
other linked command owner workflows/examples
```

## 3. Storage boundary

```text
Pattern Capture private GM storage:
  planningPatternCapture:v2:settings
  planningPatternCapture:v2:active
  planningPatternCapture:v2:events
  planningPatternCapture:v2:timer

Shared page localStorage:
  obsPlanning:sessionContext:v1
  obsPlanning:sessionOutbox:v1

Dashboard IndexedDB:
  database: obsPlanningCache
  store: snapshots
  record: dashboard:v1
```

Rules:

```text
- Raw Capture events, timer state and UI state remain in GM storage.
- Only completed pending sessions are written to the shared outbox.
- Dashboard snapshot and pending outbox remain separate.
- Cached snapshots are accepted only for the current normalized Base URL and Index path.
- Transient refresh and _obs_cache_bust parameters are excluded from Index identity so manual cache-bypass cleanup does not orphan the compatible snapshot.
- Legacy snapshots recompute source identity from their stored Base URL and Index path when those fields exist, instead of trusting an older pre-normalized sourceKey.
- Exporting does not clear pending records.
- Pending records clear only after reviewed repository application plus reconciliation, or explicit user action.
- Conflict records block additional Finish actions until resolved.
- chatgpt.com and chat.openai.com are different storage origins; use chatgpt.com as the canonical V1 origin.
```

## 4. Local server

Run from repository root:

```powershell
python -m http.server 8765
```

The dashboard reads:

```text
http://127.0.0.1:8765/planning/dashboard/index.md
```

A successful live load remains usable even if snapshot writing fails. When the index request fails, the viewer uses only a compatible snapshot and labels it `Offline cache`.

Formatted operational-day UI contract:

```text
- Every new Dashboard open starts at `Day -> Plan`; Index is fallback only when no Day source exists.
- Dashboard uses a compact header and compact global navigation so planning content appears without initial scrolling on a short viewport.
- The long offline/cache error line is removed from the planning surface and remains available in Tools -> Status & diagnostics.
- A compact Live / Offline / No data badge remains visible in the Dashboard title and exposes snapshot/error detail through its tooltip.
- Day identity, status, source path and the primary always-visible Open action are rendered in one compact row.
- Day keeps `Plan / Sessions / Summary` subtabs.
- Plan primary metrics are only Work Points, Net Work Score and Sessions.
- Pending Points and Preview Work Points are secondary local-sync data, never primary Plan or Session Overview cards.
- Local sync is available in Tools and as one collapsed technical block inside Sessions.
- Current Target Scenario remains open by default and preserves every source line.
- Plan Core remains open by default and preserves the exact Minimum / Base / Desired / Max or Very Wide structure.
- Scenario cards show a short source-derived preview while collapsed, hide that preview while expanded, and expose the complete original content without duplicated preview lines.
- Scope Units and Acceptance Criteria are collapsed by default with counts; expansion shows their full original table/list.
- Repository and local pending/conflict sessions are rendered in one session list.
- Local sessions remain visible even when the repository Finished Sessions table has zero rows.
- Pending session Time, Progress Signal and Result remain available in row details.
- Penalty rules, carryover breakdown, final summary and extended operational sections remain collapsed by default.
- Support compact view shows the live average and every numeric Support Mark row (`Category`, `Score`, `Reason`).
- Support average and Support Penalty are not duplicated in Session Overview.
- Support facts, penalty, interpretation and facts-used remain source data available through Raw/Open.
- Carryover / Debt exposes Incoming debt and Net after debt before details are expanded.
- Empty placeholders such as `not provided` do not block a real Carryover amount.
- Dedicated Support sections are excluded from More operational details.
- A local outbox/path mismatch is shown as a diagnostic warning.
- Finished-session display resolves exact headers and Markdown table parsing preserves escaped `\|` characters.
- Tools is closed by default, removed from pointer and keyboard interaction while closed, and owns diagnostics, source paths, local sync, exports, Raw, settings, Capture and Commands.
- Plan / Sessions / Summary preserve separate scroll positions while the current Dashboard instance remains open; every new Dashboard open resets to Day -> Plan at the top.
- Day subtabs expose tab roles, selected state and Left/Right Arrow keyboard switching; Tools exposes expanded/hidden state and returns focus to its trigger when closed.
- Floating Capture and Commands launchers hide while Dashboard is open and return when Dashboard closes.
- Capture remains available through Alt+F1 or Tools -> Capture; Commands through Alt+F2 or Tools -> Commands.
- Capture opens centered, remains draggable/resizable, persists width/height and recenters on each new open.
- Hotkeys: `Alt+F1` Capture, `Alt+F2` Commands, `Alt+F3` Planning.
```

Live Markdown reads intentionally bypass the browser/Tampermonkey HTTP cache:

```text
- every localhost request receives a unique _obs_cache_bust query value;
- request headers use no-cache / no-store directives;
- the IndexedDB snapshot remains the only intentional offline fallback;
- compatible legacy snapshots survive cleanup of a temporary refresh query suffix because their source identity is recalculated from stored Base URL and Index path;
- the Index setting should remain planning/dashboard/index.md;
- temporary manual refresh and _obs_cache_bust query parameters are removed from the saved Index setting.
```

## 5. V1 finished-session flow

```text
1. Open/refresh the Dashboard Viewer to publish the active operational-day context.
2. Set the Capture Date field to the same YYYY-MM-DD date shown by Dashboard.
3. Work in Planning Pattern Capture.
4. Use Auto session numbering or enter a manual session label such as S4.
5. Press Finish.
6. Capture stores one pending session, preserves its session label and advances to the next session ID.
7. Dashboard displays repository sessions plus pending/conflict local sessions.
8. Pending totals include only status=pending records; conflicts are shown separately and block export/Finish.
9. At the end of the day, press Copy pending or Download pending.
10. Paste/upload the JSON for one reviewed replacement archive.
11. Apply the archive and refresh localhost.
12. Reconciliation requires the exact row count and complete ordered appended sequence.
```

`Copy End` remains as a manual fallback and does not write the shared outbox.


## 6. Pattern Capture session timer

```text
1. Confirm the active date and session label in Pattern Capture.
2. Press Start <session> · 30m once.
3. The session clock creates focus milestones at 10, 20 and 30 minutes.
4. The same Pause all / Resume all action freezes or resumes every pending milestone.
5. Use −1 min to reduce remaining time or +1 min to add remaining time while running, paused or expired.
6. A manual adjustment that crosses 10, 20 or 30 minutes emits the same sound, system notification and in-panel notice as natural elapsed time.
7. Each naturally reached milestone also produces an in-panel notice, a Tampermonkey system notification and an audible Web Audio signal when sound is enabled.
8. The 30-minute milestone marks the timer expired but never calls Finish automatically.
9. D/F review and Finish remain explicit user actions.
10. A successful Finish clears the timer only when the timer belongs to that same date/session.
```

Timer rules:

```text
- Timer source of truth is elapsed real time from stored timestamps, not decrementing interval ticks.
- Timer state survives panel collapse, page reload and temporary background throttling.
- The 500 ms display ticker updates only timer text nodes; it does not rebuild buttons while the user is clicking them.
- Timer persistence uses the dedicated timer writer; unrelated UI/event saves do not overwrite timer state.
- Manual −1/+1 minute adjustments preserve reached milestone history, so moving backward and crossing the same point again does not duplicate its alarm.
- Adding time after expiry reopens the clock without rearming the already-sent 30-minute alarm.
- Start replaces another running/paused timer only after confirmation.
- A date/session mismatch is shown explicitly; a timer is never silently transferred to another session.
- If several milestones become due while the page is suspended, earlier due milestones are marked reached and the latest due notification is emitted to avoid an alarm burst.
- Sound can be toggled and tested from the timer controls.
- Browser autoplay rules may require the Start or Test button to prime Web Audio after a page reload.
- Timer expiration does not create a pending session, score or repository change.
```

## 7. Installation/update

```text
1. Open the tracked .user.js file.
2. Copy the complete source into its matching Tampermonkey script.
3. Save in Tampermonkey.
4. Reload ChatGPT.
5. Use https://chatgpt.com for the shared V1 localStorage origin.
```


## 8. Keyboard controls

```text
Alt+F1  open/close Planning Pattern Capture.
Alt+F2  open/close Command Palette.
Alt+F3  open/close Planning Dashboard.
Escape  close Tools first, then the active Dashboard/Capture/Command panel without clearing state.
Ctrl+Alt+P  emergency show/reset for Pattern Capture.
```

Command Palette owns Alt+F2, Pattern Capture owns Alt+F1 and Planning Dashboard owns Alt+F3.
While Dashboard is open, the floating Capture and Commands launchers are hidden to avoid covering planning content; the hotkeys and Tools drawer actions still work.
Ctrl+Alt+P remains the explicit emergency show/reset path. Legacy persistent hidden state is cleared by v0.4.2.
Its Date field is a native `YYYY-MM-DD` date input stored in `planningPatternCapture:v2:active`. Finish requires this Capture date to match the published Dashboard session date. Changing the date switches the visible Capture events and pending count to that day; it does not silently move an existing timer to another date.
Its Session field supports `S1`, `S2`, `S3` and later positive integer labels. Valid input is stored immediately without rebuilding the panel, so the first click on `Finish`, `Auto`, or a D/F action is not lost. `Enter` validates and refreshes the score view. `Auto` restores the next label derived from the repository row boundary plus pending records.

## 9. Command Palette reusable contract

The reusable Command Palette provides:

- an explicit projection-only boundary: the root UCM and linked owner files remain command authority;
- separate sibling controls for command insertion and copying, avoiding nested interactive elements;

```text
- draggable helper panel;
- command search/list;
- one-click insertion into the ChatGPT prompt editor;
- button labels rendered as <englishName> · <label>;
- complete command bodies with command, english_name, command_family,
  source_of_truth, route_read_rule, key_reminders and user_target;
- no repo writes, network calls, commits or pushes.
```

## 10. Command Palette adaptation rule

Before enabling or adapting the reusable helper for another project, verify:

```text
1. The project root UCM exists.
2. Each projected command exists in the project root UCM or is created in the same approved batch.
3. Commands that do not apply to the target project are removed.
4. source_of_truth points to the target project's real route/owner docs.
5. @name and @namespace change only for an intentional fork or rebrand.
6. The helper remains projection-only.
7. No second tracked project-local command-helper copy is created by default.
```

## 11. Safety checks

```text
- Dashboard remains read-only toward the repo.
- Live localhost Markdown requests bypass HTTP cache; IndexedDB snapshot fallback remains separate and explicit.
- Pattern Capture requires a published operational path and SHA-256 before Finish.
- Capture Date must be a valid YYYY-MM-DD value matching the published Dashboard session date before Finish.
- Pattern Capture owns the session timer; Dashboard may only mirror it in a future read-only projection.
- Timer completion never calls Finish or writes the shared outbox automatically.
- Manual session labels are separate from the expected sequential Markdown row number.
- A changed source hash blocks extending an existing pending batch.
- A conflict batch blocks additional Finish actions and batch export.
- Event IDs identify browser records only; Finished Sessions Markdown does not store them.
- Duplicate protection uses source SHA-256, source row boundary, exact resulting row count and ordered appended sequence.
- Reconciliation resolves contract columns by exact header names; fuzzy display matching cannot confuse `Session` with `Session #` or `#` with another column.
- Do not treat Command Palette as command authority.
- Do not add project-only command semantics without a UCM route.
- Do not use any helper to write to the repo or perform external network calls.
```
