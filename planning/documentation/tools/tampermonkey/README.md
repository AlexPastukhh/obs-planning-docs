# OBS Tampermonkey Tools

Status: active reusable/project planning tool index
Doc version: v0.30.0-command-catalog-refresh
Scope: tracked Tampermonkey scripts used by the OBS planning system, including reusable projection/runtime tools and one explicitly bounded project-local repository documentation prototype.

## 1. Tracked scripts

```text
planning/documentation/tools/tampermonkey/chat-command-palette.user.js
  generated install artifact for the modular Orientation / Directions / Use Cases / Commands helper;
  source/build/tests live under `chat-command-palette/`;
  planning-command definitions live under `planning/commands/`;
  user-authored local helper commands/prompts use one browser-local snapshot with explicit GitHub check/save/sync;
  its floating Planning launcher hides while Dashboard is open;
  Alt+F2 and Tools -> Commands remain available.

planning/documentation/tools/tampermonkey/local-planning-dashboard-viewer.user.js
  repository-read-only, local-editable and self-describing dashboard runtime; opens on Day -> Plan by default,
  uses a compact planning-first shell with Plan / Sessions / Summary subtabs,
  keeps repository Plan Core visible while allowing multiple local plan items,
  separates numbered-session planning from direct clock-time planning per item,
  stores local sessions, assignments, notes, completion/evidence and detailed local Goal Maps,
  embeds one schema version in UI help, local storage, JSON export/import, Dashboard-generated repo Markdown and the self-contained repo-sync prompt,
  moves diagnostics, exports, Raw, settings and local sync into a closed-by-default Tools drawer,
  keeps a source-bound IndexedDB snapshot, displays completed pending-sync sessions, imports/exports reviewed JSON and round-trips Dashboard-generated repo Markdown.

planning/documentation/tools/tampermonkey/planning-pattern-capture.user.js
  local D/F pattern capture with a docked launcher above Planning/Commands,
  a centered draggable/resizable work panel and Alt+F1 toggle.
  Its floating launcher hides while Dashboard is open; Alt+F1 and Tools -> Capture remain available.
  It also provides the one-click 10/20/30-minute session timer, sound/system notifications,
  and one-click finished-session capture into the shared pending outbox.

planning/documentation/tools/tampermonkey/linked-notes/linked-notes-prototype.user.js
  project-local `0.8.0-prototype` repository documentation helper generated from linked-notes/src/**;
  currently includes Workspaces, Notes, Files, Categories, repository templates, materialized Reference Objects, Ordered Reference Lists, stale-use diagnostics, Chat Response Reader and Full App State diagnostics;
  ordinary Files/Categories/Reference Object/Ordered List changes are local-first and publish through explicit Update current / one-commit Update all boundaries, while compound Note/image transfer flows retain their documented paths;
  never runs local git, commit or push and does not accept a production architecture.
```

Linked Notes current semantics/product state/implementation documentation are intentionally owned inside its own directory instead of being duplicated in this shared tools index:

```text
planning/documentation/tools/tampermonkey/linked-notes/README.md
  → scenarios/README.md
  → use-case-registry.md
  → APP-OVERVIEW.md
  → ARCHITECTURE.md
  → DATA-AND-STATE.md
  → KNOWN-ISSUES.md
  → ROADMAP.md
```

`planning/areas/documentation-workbench/` remains broader planning/history/compatibility context for Linked Notes, not its current semantic owner.

Do not create competing tracked copies of the same script.

## 2. Authority boundary

```text
Repo Markdown files are durable source of truth.
Tampermonkey scripts are browser-side capture, projection or explicitly bounded prototype tools.
By default they do not write repository files or perform external network calls. Linked Notes remains an explicitly bounded repository client. Planning Helper normal runtime is RAM/local-only; GitHub access is limited to explicit Check GitHub, Sync missing and Save GitHub actions for its bounded repository-backed entities.
The repository documentation prototype is the narrow test-only exception: after explicit user actions it may perform bounded GitHub operations under the current Linked Notes contracts. Ordinary pending repository-file changes use `Update current file` for one Contents-API path or `Update all` for one Git Data tree/commit/ref transition with verification; compound Note/image-transfer paths retain their documented verified behavior.
The Linked Notes Prototype never runs local git, commit or push. Runtime code does not define command meaning, and current application semantic entries are owned by `linked-notes/USE-CASE-REGISTRY.md` and detailed behavior/traceability by `linked-notes/scenarios/README.md`, not inferred from implementation alone.
A pending-session JSON export becomes repo state only after a reviewed replacement archive is applied.
Tampermonkey command projection does not define command meaning. The root Command Routing is the command-system entry and direct `planning/commands/*.command.md` files own individual commands.
Dashboard planning field meanings and the local JSON contract are owned by the Dashboard userscript/UI, not by Command Routing commands.
```

Planning-helper semantics must come from:

```text
Orientation:
  planning/README.md
  planning/direction-registry.md

Directions:
  root/local Direction Registries

Use Cases:
  reusable-family/local Use-Case Registries

Commands:
  planning/command-routing.md
  planning/commands/README.md
  selected planning/commands/*.command.md
  planning/documentation/command-planning-workflow.md

Projection behavior:
  planning/documentation/tampermonkey-command-projection-workflow.md
  other linked owner workflows/templates/areas
```

## 3. Storage boundary

```text
Pattern Capture private GM storage:
  planningPatternCapture:v2:settings
  planningPatternCapture:v2:active
  planningPatternCapture:v2:events
  planningPatternCapture:v3:timer
  planningPatternCapture:v3:timerMigration
  planningPatternCapture:v3:timerNotification

Legacy timer migration/suppression only:
  planningPatternCapture:v2:timer

Shared page localStorage:
  obsPlanning:sessionContext:v1
  obsPlanning:sessionOutbox:v1
  obsPlanning:localDayPlan:v1

Dashboard IndexedDB:
  database: obsPlanningCache
  store: snapshots
  record: dashboard:v1

Planning Helper private GM storage:
  obsPlanningHelper:v2:localSnapshot  # unified planning-command/helper-command/prompt working snapshot
  obsPlanningHelper:v1:repositorySettings  # explicit repository-action target + recovery request
  obsPlanningHelper:v1:githubToken          # explicit repository-action credential only

Planning Helper legacy migration inputs only:
  obsPlanningHelper:v1:commandCatalogCache
  obsPlanningHelper:v1:localLibrary
  obsPlanningHelper:v1:repositoryLibraryCache

Linked Notes Prototype private GM storage:
  see linked-notes/DATA-AND-STATE.md for current application-owned GM namespaces and persistence ownership.

Linked Notes Prototype IndexedDB:
  database: obsLinkedNotesPrototype
  store: notes

  database: obsLinkedNotesPrototypeAssets
  store: assets
```

Rules:

```text
- Raw Capture events, timer state and UI state remain in GM storage.
- `planningPatternCapture:v3:timer` is the one canonical timer shared by updated Capture instances across ChatGPT tabs.
- The old `planningPatternCapture:v2:timer` key is read once for migration and then neutralized so older tabs cannot replace the current timer.
- Updated tabs elect one startup migration writer through `planningPatternCapture:v3:timerMigration`; the Capture UI and timer actions start only after that election resolves.
- The elected writer rechecks V3 both before and after reading V2, immediately before writing, and all other tabs accept the actual V3 winner; an idle migration candidate cannot replace an active timer created during migration.
- Start and Restart capture the canonical `timerId` and revision before confirmation and replace only if both are still current, so a stale confirmation cannot overwrite a newer timer from another tab.
- Only completed pending sessions are written to the shared outbox.
- Dashboard snapshot, pending outbox and local day planning remain separate.
- Local day planning stores local plan-item definitions, numbered sessions, per-item session-or-time assignments, optional Scope Unit notes/deadlines, completion/evidence and local Goal Map drafts; it never writes repository files automatically.
- Local planning JSON exports/imports use `PLANNING_SCHEMA_VERSION = 1`; legacy `obs-local-day-plan-v1` state is migrated in place on read.
- The same contract lists actual day/item/session/assignment/note/completion/evidence/Goal Map fields and scope/level help.
- Dashboard-generated Day and Goal Markdown embed a round-trip JSON marker; Import repo Markdown reads that representation back without guessing.
- Local planning JSON exports include field help, repository targets, generated repository documents and sync boundaries.
- Copy sync prompt is self-contained and must not depend on deleted scenario/workspace/idea/AC planning templates.
- Cached snapshots are accepted only for the current normalized Base URL and Index path.
- Transient refresh and _obs_cache_bust parameters are excluded from Index identity so manual cache-bypass cleanup does not orphan the compatible snapshot.
- Legacy snapshots recompute source identity from their stored Base URL and Index path when those fields exist, instead of trusting an older pre-normalized sourceKey.
- Exporting does not clear pending records.
- Pending records clear only after reviewed repository application plus reconciliation, or explicit user action.
- Conflict records block additional Finish actions until resolved.
- Planning Helper warm startup reads one unified GM snapshot, then search/Insert/Copy/edit/import operate from RAM/local state. GitHub reads/writes occur only after explicit Check GitHub, Sync missing or Save GitHub actions; Sync missing never overwrites a same-path local record.
- Linked Notes current storage/state ownership is documented in `linked-notes/DATA-AND-STATE.md`; this shared tools index does not duplicate the complete application persistence contract.
- chatgpt.com and chat.openai.com are different IndexedDB origins; use chatgpt.com as the canonical Linked Notes IndexedDB origin.
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
- Plan primary metrics are Work Points, Net Work Score and Sessions.
- Completed local status=pending sessions already contribute to displayed Work Points and Net Work Score; pending means pending repository sync, not unfinished work.
- Conflict sessions remain visible but are not added to displayed score until resolved.
- Local sync count remains secondary metadata rather than a separate primary score card.
- Local sync is available in Tools and as one collapsed technical block inside Sessions.
- Current Target Scenario remains open by default and preserves every source line.
- Plan keeps the existing two-column workspace: Local Execution Planner on the left and Plan Items / Plan Core on the right; narrow viewports stack the columns.
- Minimum / Base / Desired / Max remain ordered top-to-bottom and are color-linked to locally assigned Scope Units.
- Every Plan Core level has `+ Add local item`; local items can be created repeatedly, edited, deleted, completed, annotated and expanded into Goal Maps without changing repository Markdown.
- Each plan item independently chooses exactly one local execution route: a numbered session (`S1`, `S2`...) or a direct start/end clock range. Switching routes clears incompatible hidden assignment fields, and v0.8.0/v0.8.1 local records are normalized once on load.
- Session Planning and Time Planning are rendered as separate blocks at the same time, so session-assigned items and direct-time items are not visually conflated. Direct time ranges are saved through an explicit Apply time action so entering the start value does not replace the editor before the end value is entered.
- One numbered session may contain several plan items; deleting the session clears the complete assignment state so linked items become fully unassigned instead of being deleted.
- Repository Scope Units remain available in one collapsed secondary source block and do not replace the editable local session/time plan.
- Legacy standalone Acceptance Criteria and Done / Evidence never become duplicate active plan items. They stay in one closed repository-material linker until the user explicitly attaches them to a Plan Core item.
- Linked legacy Acceptance text is shown inside the target item as repository acceptance; linked Done / Evidence marks that target item complete and is shown inside it as repository evidence. Unlinked source material stays visible only in the closed linker.
- Still Needed is not rendered because unchecked Plan Core items already represent remaining work.
- Each plan item supports local completion, a short local note, local evidence, a Session-or-Time assignment and an optional “Expand to Goal Map” action.
- Explicit stable IDs such as M1, B2, D1 and X1 are preferred in Markdown. When they are absent, the Dashboard uses only a level + normalized-text fingerprint for identity; auto-number labels are display positions and never act as a fallback identity.
- Plan-item state, Scope Unit links, repository-material links and Goal Map source links resolve exact keys first. ID-based fallback is allowed only for explicitly authored stable IDs, so inserting a new unlabelled item above an existing item does not move notes, completion, evidence or links to the new position.
- Existing v0.7.0/v0.7.1 text-fingerprint aliases remain readable; unmatched local records stay unassigned rather than being guessed onto another item.
- Scope Units use an explicitly authored Unit ID such as `S1`, `H1` or `SU1: Name` when present; otherwise identity is based only on normalized Unit text. Row position, Window, Goal(s) and Status never define local identity.
- Existing v0.7.0-v0.7.2 row-content keys remain readable while the repository row is unchanged and migrate to the stable key on the next local edit. Unmatched old records remain unassigned rather than moving to another unit.
- Duplicate unlabelled Scope Unit names are treated as ambiguous: local links, deadlines and notes are disabled until explicit stable IDs are added.
- Each Scope Unit supports a local link to a plan item, optional Max / Desired / Base / Minimum HH:mm targets and a local unit note.
- One local day-planning note is available under the local execution planner.
- Local Goal Maps provide detailed fields for goal, why, success, current state, unknowns, approaches, steps, checks, risks and results/evidence; they are local drafts until explicitly copied/exported.
- Goal Map create/update/delete operations verify localStorage persistence and surface a save error instead of reporting a false successful save.
- Assignment migration removes stale session IDs, stale time fields, missing-session links and incomplete/invalid time ranges; unassigned items retain no hidden execution route.
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
- Floating Capture and Commands launchers hide while Dashboard is open and return when Dashboard closes; shared DOM attributes plus MutationObserver provide a sandbox-resistant fallback to CustomEvent coordination.
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
8. A completed status=pending local session immediately contributes to displayed Work Points and Net Work Score; reconciliation removes it from the local contribution after the exact repository row is detected.
9. Conflicts are shown separately, are excluded from displayed score, and block export/Finish.
10. At the end of the day, press Copy pending or Download pending.
11. Paste/upload the JSON for one reviewed replacement archive.
12. Apply the archive and refresh localhost.
13. Reconciliation requires the exact row count and complete ordered appended sequence.
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
- Every wake, foreground event, ticker pass and timer action rereads the canonical V3 timer before processing.
- Each active timer has a `timerId`, revision, update timestamp and writer ID; a stale tab cannot save over a different newer timer identity.
- The 500 ms display ticker updates only timer text nodes; it does not rebuild buttons while the user is clicking them.
- Timer persistence uses the dedicated guarded timer writer; unrelated UI/event saves do not overwrite timer state.
- Manual −1/+1 minute adjustments preserve reached milestone history, so moving backward and crossing the same point again does not duplicate its alarm.
- Adding time after expiry reopens the clock without rearming the already-sent 30-minute alarm.
- Start replaces another running/paused timer only after confirmation.
- A date/session mismatch is shown explicitly; a timer is never silently transferred to another session.
- If several milestones become due while the page is suspended, earlier due milestones are marked reached and the latest due notification is emitted to avoid an alarm burst.
- A short shared notification claim elects one Capture instance per milestone, so multiple open tabs produce one system notification and one milestone sound.
- Sound can be toggled and tested from the timer controls.
- Browser autoplay rules may require the Start or Test button to prime Web Audio after a page reload.
- Timer expiration does not create a pending session, score or repository change.
```

## 7. Installation/update

For the Planning Helper, source changes are built and verified first:

```text
cd planning/documentation/tools/tampermonkey/chat-command-palette
npm run verify
```

Then install the generated `../chat-command-palette.user.js`. Do not edit that generated artifact manually. Other standalone Tampermonkey tools continue to use their tracked `.user.js` source.

```text
1. Open the matching generated/standalone .user.js file.
2. Copy the complete userscript into Tampermonkey.
3. Save in Tampermonkey.
4. Save the userscript, then reload or close every already-open ChatGPT tab once so no old Capture instance remains active.
5. Reopen ChatGPT and verify that all tabs show the same current timer.
6. Use https://chatgpt.com for the shared V1 localStorage origin.
```

## 8. Keyboard controls

```text
Alt+F1  open/close Planning Pattern Capture.
Alt+F2  open/close Command Palette.
Alt+F3  open/close Planning Dashboard.
Escape  close Tools first, then the active Dashboard/Capture/Command panel without clearing state; an idle Linked Notes panel also persists its current draft and closes, while an active remote operation remains visible.
Ctrl+Alt+P  emergency show/reset for Pattern Capture.
```

Command Palette owns Alt+F2, Pattern Capture owns Alt+F1 and Planning Dashboard owns Alt+F3.
While Dashboard is open, the floating Capture and Commands launchers are hidden to avoid covering planning content; the hotkeys and Tools drawer actions still work.
Ctrl+Alt+P remains the explicit emergency show/reset path. Legacy persistent hidden state is cleared by v0.4.2.
Its Date field is a native `YYYY-MM-DD` date input stored in `planningPatternCapture:v2:active`. Finish requires this Capture date to match the published Dashboard session date. Changing the date switches the visible Capture events and pending count to that day; it does not silently move an existing timer to another date.
Its Session field supports `S1`, `S2`, `S3` and later positive integer labels. Valid input is stored immediately without rebuilding the panel, so the first click on `Finish`, `Auto`, or a D/F action is not lost. `Enter` validates and refreshes the score view. `Auto` restores the next label derived from the repository row boundary plus pending records.

## 9. Command Palette reusable contract

The reusable Command Palette provides:

- an explicit authority boundary: the root Command Routing is the command-system entry, direct `planning/commands/*.command.md` files own individual commands, and linked owner files own behavior;
- separate sibling controls for adaptive insertion, forced-full route insertion, approved owner-read refinements and copying, avoiding nested interactive elements;
- one repository command definition generates both insertion variants, so command semantics and reminders cannot drift;
- a standalone `read documentation principles · прочитай принципы документации` row with adaptive, `Full` and `Copy`;
- a canonical `plan command · спланируй команду` row with adaptive, `Full` and `Copy`;
- a read-only `collect ideas · собери идеи` row with adaptive, `Full` and `Copy`, whose command route uses the generic Idea methodology and preserves read-only repository permissions;
- no creation-wording command IDs, labels or aliases for the plan-command route;

```text
- draggable helper panel;
- command search/list;
- normal command control inserts the adaptive route-read body;
- Full inserts the same command with mandatory fresh reading of the complete required command route;
- command-specific refinement controls appear only when the selected direct command definition declares them; current `давай архив` has no refinement because it no longer emits local PowerShell apply/diff commands;
- Copy copies the adaptive route-read body;
- Full is limited to Command Routing and owner/workflow/template/example files required by that command route;
- Full does not authorize reading unrelated repository files;
- button labels rendered as <englishName> · <label>;
- complete command bodies with command, english_name, command_family,
  source_of_truth, route_read_rule, key_reminders and user_target;
- no separate Command Routing-only mode;
- refinement bodies, when present, stay compact and route only to the explicit owner files named by the command definition;
- no `Docs` refinement for `спланируй команду`; the standalone documentation-principles command covers that user-facing route;
- retired Planning Item formation/reconciliation commands are absent from the active generated command catalog; historical local snapshot entries may require explicit local reconciliation after repository migration;
- no other command-specific refinement buttons until another concrete need and owner-doc paths are approved;
- normal insertion/copy/import is RAM-first and performs no repository read/write; explicit Check GitHub / Sync missing / Save GitHub operate only on bounded command/helper-library paths and never run local Git, commit or push.
```

## 9A. Orientation / Directions / Use Cases / Commands

The reusable planning helper has four tabs:

```text
Orientation
Directions
Use Cases
Commands
```

Authority:

```text
Orientation → root documentation;
Directions  → Direction Registries;
Use Cases   → Use-Case Registries;
Commands    → root Command Routing → direct repository command definitions.
```

Controls:

```text
main row:
  Adaptive insert;

Full:
  mandatory complete entry/owner reread;

Copy:
  Adaptive body copy;

Open Commands:
  redirect a command-related Use Case without duplicate execution;

Refinement:
  shown only when the selected direct command definition currently declares one.
```

Projected Directions:

```text
Plan A Solution Or Workflow
Use And Maintain Repository Documentation
Use And Maintain Repository Documentation
Develop And Maintain Documentation Workbench
```

Projected Use Cases:

```text
Understand Current Workflow And Reality
Collect And Review Ideas From Selected Source → Commands
Plan / Review Whole Solution Or Workflow
Research Existing Solutions And Alternative Workflows
Draft Detailed Scenario
Draft Or Review Domain
Plan Implementation Slice
Review Scenario/Domain/Slice Consistency
Repository Documentation Change And Reference Review
Planning Meaning To Repository
```

`Collect And Review Ideas From Selected Source` opens the accepted `собери идеи / collect ideas` command. Retired Planning Item formation/reconciliation routes and the item-owned Structured User Message Composer are not projected as active Use Cases.

Chat/AI/Work-State remains unprojected as accepted. Current Linked Notes `UC-LN-*` identities live in the Linked Notes-local semantic registry and are not automatically projected as Planning Helper commands merely because the application implements them.

## 9B. Responsive Command Insertion And Diagnostics

The helper uses:

```text
exact composer lookup first;
one in-progress insertion lock;
one animation-frame yield before mutation;
local timing diagnostics;
clipboard fallback instead of mutation retries.
```

Browser verification matrix:

```text
short chat + empty draft;
long chat + empty draft;
short chat + large draft;
long chat + large draft;
Adaptive and Full commands;
rapid double click;
navigation between chats before insertion.
```

Acceptance:

- one click inserts at most one body;
- opening Commands never mutates the composer;
- normal exact-selector path performs no global candidate sort;
- failure copies once and reports the fallback;
- console timing identifies the selector and expensive phase;
- normal insertion introduces no network/write behavior; it first prepares the exact clipboard body, then inserts the same exact string into the composer; repository reads/refreshes are not part of Planning Helper runtime.

## 9C. Modular Planning Helper / Repository Commands

Developer/build entry:

```text
planning/documentation/tools/tampermonkey/chat-command-palette/README.md
```

Repository command entry:

```text
planning/command-routing.md
  → planning/commands/README.md
  → selected direct *.command.md
```

The generated userscript bundles a valid command catalog only as an offline fallback. Normal helper use stays RAM/local-only. `Check GitHub` lists direct metadata and compares counts/path-name sets for planning commands, helper commands and prompts without mutating local state. `Sync missing` downloads only repository paths absent locally and never overwrites a same-path local record. Per-row `Save GitHub` creates, no-ops or SHA-updates one local entity with exact read-back verification; planning-command save validates the complete direct remote command catalog before writing. `Import from ChatGPT` remains local-only. `Copy recovery request` + pasted Restore remains an offline/manual fallback. Blank owner/repository/branch settings are rejected and explicit repository operations share one serialized lock.

Planning Helper keeps repository settings/token in the existing `obsPlanningHelper:v1:*` secret/config keys and keeps runtime command/helper content in the unified `obsPlanningHelper:v2:localSnapshot`. Old v1 command/library cache keys are migration inputs only. The token is secret state and is never written into planning-command files, helper-library files or the local snapshot. Local Cmds and Prompts remain convenience text, not planning-command authority; optional repository copies live only under `planning/helper-library/`. Application semantic identity is owned by `chat-command-palette/USE-CASE-REGISTRY.md`; current behavior/traceability is owned by `chat-command-palette/scenarios/README.md`.

## 10. Command Palette adaptation rule

Before enabling or adapting the reusable helper for another project, verify:

```text
1. The project root Command Routing exists and points to the project command registry when that model is used.
2. Each projected command has one accepted direct repository command definition or is created in the same approved batch.
3. Commands that do not apply to the target project are removed.
4. source_of_truth points to the target project's real route/owner docs.
5. @name and @namespace change only for an intentional fork or rebrand.
6. Normal command execution remains projection/insertion only; explicit command management is confined to the repository command registry.
7. Adaptive and forced-full bodies are generated from the same command definition.
8. Refinements contain route/owner paths and the requested validation action, not duplicated owner logic.
9. Standalone command rows use the exact canonical label and English name from the selected repository command definition.
10. Removed aliases and internal IDs are not retained for compatibility unless the selected repository command definition still accepts them.
11. No second tracked project-local command-helper copy is created by default.
```

## 11. Safety checks

```text
- Dashboard remains read-only toward the repo; local planning edits stay in browser localStorage until explicitly copied or downloaded.
- Live localhost Markdown requests bypass HTTP cache; IndexedDB snapshot fallback remains separate and explicit.
- Pattern Capture requires a published operational path and SHA-256 before Finish.
- Capture Date must be a valid YYYY-MM-DD value matching the published Dashboard session date before Finish.
- Pattern Capture owns the session timer; Dashboard may only mirror it in a future read-only projection.
- The canonical timer and notification claim remain in private GM storage and are shared across updated Capture instances.
- Timer completion never calls Finish or writes the shared outbox automatically.
- Manual session labels are separate from the expected sequential Markdown row number.
- A changed source hash blocks extending an existing pending batch.
- A conflict batch blocks additional Finish actions and batch export.
- Event IDs identify browser records only; Finished Sessions Markdown does not store them.
- Duplicate protection uses source SHA-256, source row boundary, exact resulting row count and ordered appended sequence.
- Reconciliation resolves contract columns by exact header names; fuzzy display matching cannot confuse `Session` with `Session #` or `#` with another column.
- Do not treat the Planning Helper runtime, cache or generated artifact as Orientation, Direction, Use-Case or command authority.
- Do not let Direction/Use-Case activation execute commands or grant permissions.
- Project `собери идеи` only from its accepted repository command definition and generic Idea owner route.
- Do not add project-only command semantics outside the Command-Routing-reachable `planning/commands/*.command.md` registry.
- Do not reintroduce retired Planning Item formation/reconciliation projections. Preserve semantic Use-Case boundaries, keep broader workflows distinct from commands, and do not treat historical ITEM-* registers as current command targets.
- Do not duplicate archive command-format rules inside the helper refinement body.
- Do not add a `Docs` refinement when the standalone documentation-principles command exists.
- Do not retain removed creation-wording command IDs, labels or aliases.
- Do not use Full to expand reading beyond the command's required route.
- Except for the explicitly documented Linked Notes boundary and Planning Helper explicit repository-action boundary, do not use helpers to write repository files or perform external network calls. Planning Helper GitHub access is limited to explicit Check GitHub, Sync missing and Save GitHub over direct `planning/commands/*.command.md`, `planning/helper-library/commands/*.helper-command.md` and `planning/helper-library/prompts/*.prompt.md` targets; normal insertion/import remains network-independent.
- Linked Notes semantic entries are owned under `linked-notes/USE-CASE-REGISTRY.md`; detailed behavior/traceability is owned by `linked-notes/scenarios/README.md` plus focused current-state docs; legacy Documentation Workbench Linked Notes workflows are compatibility/planning history only.
```


## Planning Helper Local Library / Prompts

Developer/runtime details remain under `chat-command-palette/`; application semantic identity is owned by `chat-command-palette/USE-CASE-REGISTRY.md` and behavior/traceability by `chat-command-palette/scenarios/README.md`. The repository format for local helper commands and prompts is `planning/helper-library/README.md`. Local Save/Edit/Delete and ChatGPT import remain local-only. The generated userscript uses granted `GM_getValue`/`GM_setValue` for the unified local snapshot and `GM_xmlhttpRequest` only after explicit Check GitHub, Sync missing or Save GitHub actions. If browser-local state is lost, direct Sync missing can restore repository-only records, while ChatGPT marker Restore remains an offline/manual fallback.
