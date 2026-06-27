# Goal Map - Planning Dashboard

Status: active
Doc version: v0.3.1
Scope Type: goal-map
Scope Anchor: planning-dashboard

## Current Target Scenario

```text
A local repo-backed planning dashboard shows active time scopes, goal maps, backlog and operational session-day data from Markdown files.

When the local server is available, the dashboard reads the latest repository files and refreshes its browser snapshot.

When the local server is unavailable, the dashboard remains usable from the latest browser snapshot instead of showing a blocking load error.

During the day, completed sessions can be recorded immediately in browser storage, displayed as pending local sessions and synchronized with repository Markdown later as one reviewed batch.
```

## Plan Core

### Minimum

```text
The dashboard reads:

- dashboard index;
- active year;
- active period;
- active week;
- active day;
- active operational session day;
- active goal maps;
- deferred work;
- deferred ideas.

After every successful localhost load, the dashboard stores the latest readable snapshot in browser storage.

When localhost is unavailable:

- the last snapshot is loaded;
- the dashboard remains readable;
- the interface clearly shows that cached data is being used;
- the last successful synchronization time is visible.

A blocking error appears only when neither localhost data nor a browser snapshot exists.
```

### Base

```text
Planning Pattern Capture can finish the current session with one action.

Finish Session:

- calculates final D;
- calculates final F;
- calculates final Points;
- creates one pending session record;
- stores it in shared browser storage;
- advances to the next session;
- lets the user continue working immediately.

The dashboard shows:

- sessions already present in repository Markdown;
- pending local sessions;
- repository Work Points;
- pending Points;
- preview Work Points after pending sessions.

Pending local records never modify repository files directly.
```

### Desired

```text
The user can copy or download all unsynchronized session changes as one versioned JSON payload.

The exported payload includes:

- export schema version;
- operational-day path;
- date;
- source snapshot identity;
- expected last repository session number;
- expected repository Work Points;
- stable event IDs;
- all pending session records.

The payload can be provided to ChatGPT and converted into one full replacement archive for the operational-day Markdown file.

After the archive is applied locally and localhost reads the updated repository file, the dashboard reconciles repository sessions with pending records.

Confirmed records are marked synced or removed from the pending outbox.

Conflicting or unmatched records remain visible for review.
```

### Max / Very Wide

```text
The same local-first change architecture may later support:

- support-fact append;
- penalty-event append;
- day-close updates;
- goal status changes;
- goal-map edits;
- time-scope edits;
- backlog updates.

Version 1 supports only completed-session capture and synchronization.

Repository Markdown remains the durable source of truth.
Browser storage remains a working cache and pending-change layer.
```

## Architecture Contract

```text
Repository Markdown files
  = durable source of truth

Localhost server
  = live read access to the local repository

Browser snapshot
  = last successfully loaded readable state

Pending session outbox
  = unsynchronized local session changes

Export JSON
  = transport format for batch repository updates

Replacement archive
  = reviewed mechanism for updating local repository files
```

Rules:

```text
- Cached data must never silently appear as live repository data.
- Snapshot data and pending changes must be stored separately.
- Refreshing repository data must not delete pending changes.
- Exporting pending changes must not mark them synced.
- Pending changes are cleared only after reconciliation or explicit user action.
- Stable event IDs identify browser-side pending records and exports.
- Event IDs are not stored in the current Finished Sessions Markdown table.
- Repository duplicate protection uses the source operational-file SHA-256, source row count, and the ordered appended session sequence.
- Version 1 must not directly edit repository files from Tampermonkey.
- Version 1 must not locally edit year, period, week, day or goal-map content.
- Repository totals and pending preview totals must be displayed separately.
```

## Acceptance Criteria

| AC | Criterion | Source | Verifiable Result | Status |
|---|---|---|---|---|
| AC1 | Dashboard files exist | user / ai suggestion | index, year, period, week, day, goal-map and backlog files exist | done |
| AC2 | Viewer reads live local files | existing implementation | dashboard loads Markdown through localhost | done |
| AC3 | Operational session day is rendered | existing implementation | Finished Sessions and Work Score Summary are displayed | done |
| AC4 | Successful loads create a snapshot | user | loaded index and linked files are stored with synchronization metadata | todo |
| AC5 | Viewer has offline fallback | user | localhost failure loads the latest snapshot without a blocking error | todo |
| AC6 | Data source is visible | user / ai suggestion | UI shows Live, Offline cache or No data | todo |
| AC7 | Snapshot time is visible | ai suggestion | offline mode shows the last successful load time | todo |
| AC8 | Pending outbox exists | user | completed sessions can be stored without modifying repository files | todo |
| AC9 | Session completion takes one action | user | Finish Session stores the session and advances to the next session | todo |
| AC10 | Pending sessions appear in dashboard | user | pending rows are shown with a local/pending marker | todo |
| AC11 | Totals remain distinguishable | ai suggestion | repository, pending and preview Points are displayed separately | todo |
| AC12 | Pending changes can be copied | user | one button copies a versioned JSON payload | todo |
| AC13 | Pending changes can be downloaded | ai suggestion | one button downloads the same payload as JSON | todo |
| AC14 | Export contains conflict guards | ai suggestion | payload includes date, path, source operational-file SHA-256, source last session and expected totals | todo |
| AC15 | Pending records have local identity | existing workflow | every pending session has a stable browser-side event ID | todo |
| AC16 | Repository duplicate protection is deterministic | existing workflow / ai suggestion | apply checks source SHA-256, source row count and the complete ordered append sequence | todo |
| AC17 | Batch repository update is reviewable | existing workflow | exported sessions can produce one replacement archive and diff | todo |
| AC18 | Export does not clear data | user / ai suggestion | records remain pending after copy/download | todo |
| AC19 | Reconciliation confirms synchronization | user | records clear only after the updated repository file contains the complete expected appended sequence | todo |
| AC20 | Conflicts are preserved | ai suggestion | partial, reordered, changed or unmatched sequences remain visible and are not silently discarded | todo |
| AC21 | Version 1 remains session-only | user | no local editing of goals or time scopes is introduced | todo |
| AC22 | Storage implementation is isolated | ai suggestion | snapshot/outbox logic is behind a small storage adapter | todo |
| AC23 | Viewer does not write files or run git | safety boundary | Tampermonkey remains browser-side only | done |

## Version 1 Data Contracts

### Dashboard Snapshot

```json
{
  "schema": "obs-dashboard-snapshot-v1",
  "savedAt": "2026-06-18T12:00:00.000Z",
  "baseUrl": "http://127.0.0.1:8765/",
  "indexPath": "planning/dashboard/index.md",
  "indexText": "...",
  "files": {
    "planning/dashboard/years/2026.md": {
      "text": "...",
      "sha256": "...",
      "loadedAt": "2026-06-18T12:00:00.000Z"
    }
  }
}
```

### Pending Session Outbox

```json
{
  "schema": "obs-session-outbox-v1",
  "days": {
    "2026-06-18": {
      "operationalPath": "-Planning/Days/2026/2026-06-18.md",
      "source": {
        "snapshotSavedAt": "2026-06-18T12:00:00.000Z",
        "operationalFileSha256": "...",
        "lastSessionNumber": 2,
        "workPoints": 5.4
      },
      "sessions": [
        {
          "eventId": "evt_1718712000000_ab12cd",
          "createdAt": "2026-06-18T14:30:00.000Z",
          "session": "S3",
          "time": "",
          "d": 1.5,
          "f": 1.2,
          "points": 2.7,
          "goals": "",
          "progressSignal": "",
          "result": "",
          "status": "pending"
        }
      ]
    }
  }
}
```

### Batch Export

```json
{
  "schema": "obs-session-sync-v1",
  "exportedAt": "2026-06-18T20:00:00.000Z",
  "date": "2026-06-18",
  "operationalPath": "-Planning/Days/2026/2026-06-18.md",
  "source": {
    "snapshotSavedAt": "2026-06-18T12:00:00.000Z",
    "operationalFileSha256": "...",
    "lastSessionNumber": 2,
    "workPoints": 5.4
  },
  "sessions": [
    {
      "eventId": "evt_1718712000000_ab12cd",
      "session": "S3",
      "time": "",
      "d": 1.5,
      "f": 1.2,
      "points": 2.7,
      "goals": "",
      "progressSignal": "",
      "result": ""
    }
  ]
}
```

### Reconciliation Contract

```text
- eventId exists only in browser storage and export payloads in version 1.
- Finished Sessions Markdown does not store eventId.
- Application is allowed only when the current operational file SHA-256 matches source.operationalFileSha256.
- source.lastSessionNumber identifies the repository row boundary before the batch.
- Exported sessions are appended in payload order.
- After localhost reload, reconciliation inspects the repository rows immediately after source.lastSessionNumber.
- All appended rows must match every exported session in the same order using the fields represented by the operational table.
- Only a complete ordered match marks the corresponding browser eventIds as synced.
- Partial, reordered, changed, missing or extra rows remain conflicts and must not be cleared automatically.
- Repeated sessions with identical D/F/Points are valid; position inside the guarded ordered sequence distinguishes them.
```

## Implementation Phases

### Phase 1 - Goal Map and Contracts

```text
- extend this goal map;
- define snapshot schema;
- define pending outbox schema;
- define export schema;
- define reconciliation rules;
- keep userscript behavior unchanged until the contract is reviewed.
```

### Phase 2 - Dashboard Snapshot Fallback

```text
- save successful localhost loads;
- load snapshot when localhost is unavailable;
- show Live / Offline cache / No data;
- show the last synchronization time;
- keep pending data separate.
```

### Phase 3 - Finish Session

```text
- add the reviewed Planning Pattern Capture userscript to the repository or document its canonical local source;
- add Finish Session to Planning Pattern Capture;
- calculate final D/F/Points;
- write one pending session;
- advance to the next session;
- reset only the next-session draft state;
- preserve prior session history.
```

### Phase 4 - Pending Dashboard Overlay

```text
- read shared pending outbox;
- show repository sessions and pending sessions together;
- add Pending local badges;
- calculate repository, pending and preview totals separately.
```

### Phase 5 - Batch Export

```text
- add Copy pending JSON;
- add Download pending JSON;
- validate export schema;
- preserve pending records after export;
- support multiple sessions in one payload.
```

### Phase 6 - Repository Update Workflow

```text
- provide exported JSON to ChatGPT;
- verify the operational-file SHA-256, source last session and expected totals;
- append all valid sessions in payload order;
- recalculate operational-day summaries;
- produce one full replacement archive;
- review one combined diff.
```

### Phase 7 - Reconciliation

```text
- reload updated Markdown through localhost;
- inspect rows immediately after the guarded source last-session boundary;
- compare the complete appended sequence with exported sessions in the same order;
- mark browser event IDs synced only after a complete ordered match;
- retain partial, reordered, changed or unmatched sequences as conflicts;
- provide Clear synced action.
```

### Phase 8 - Future Local Changes

```text
- evaluate typed local operations;
- support changes beyond sessions only after session synchronization is stable;
- preserve repository-first conflict checks.
```

## Ideas Inbox

### Desired Ideas

```text
- Finish a session in one click.
- Continue the next session immediately.
- Avoid one GitHub permission prompt per session.
- Keep the dashboard usable when localhost is not running.
- Accumulate several sessions locally and synchronize them once.
- Keep repository Markdown as recoverable long-term storage.
- Restore browser state from repository files after browser storage loss.
```

### Other Ideas

```text
- Use localStorage for settings and the small pending outbox.
- Use IndexedDB for larger Markdown snapshots.
- Add Export cache and Import cache later.
- Add a storage adapter so localStorage can be replaced without rewriting the UI.
- Add operation types beyond sessions only after version 1 is stable.
- Later consider automatic local-file writing through a separate trusted local service.
```

## Idea Evaluation

```text
Idea:
Use a local-first browser layer between the live local repository and delayed reviewed repository synchronization.

Source:
user + ai suggestion

Benefit:
Session completion becomes nearly instant, offline dashboard reading remains possible, and repository updates can be batched.

Risks:
- stale cached data may be mistaken for live data;
- pending records may be exported twice;
- pending records may be cleared too early;
- browser storage may be deleted;
- repository state may change before batch application;
- two userscripts may not share isolated Tampermonkey storage.

Protections:
- explicit Live / Offline cache status;
- stable event IDs;
- separate snapshot and outbox;
- source operational-file SHA-256 and row boundary in export;
- no clearing after export;
- ordered positional reconciliation after repository reload;
- shared storage contract;
- one-version session-only boundary.

Decision:
Implement incrementally through explicit phases and acceptance criteria.
```

## Done / Evidence

```text
- Dashboard index, active time scopes, goal maps and backlog exist.
- Dashboard Viewer reads local Markdown through localhost.
- Dashboard Viewer renders operational Finished Sessions.
- Dashboard Viewer renders Work Score Summary.
- A local Planning Pattern Capture userscript stores D/F adjustment events.
- The local Planning Pattern Capture userscript calculates final D, F and Total.
- The local Planning Pattern Capture userscript can copy an end-session command.
- A canonical repository path for Planning Pattern Capture has not yet been created.
- Operational-day Markdown and end-session workflow exist.
- Two completed sessions are already recorded in the current operational day.
```

## Still Needed

```text
Immediate:
- review this corrected expanded goal map;
- commit only after corrected diff approval.

First implementation:
- snapshot fallback;
- source-status indicator;
- shared pending outbox;
- Finish Session;
- pending overlay;
- batch export;
- reconciliation.

Tests:
- server available;
- server unavailable with snapshot;
- server unavailable without snapshot;
- browser refresh;
- browser restart;
- several pending sessions;
- duplicate export;
- repeated identical sessions in one ordered batch;
- changed repository base or operational-file SHA-256;
- archive application;
- reconciliation;
- browser-storage deletion and restoration from repository.

Deferred:
- direct goal editing;
- direct time-scope editing;
- penalty/support synchronization;
- day-close synchronization;
- automatic repository writes.
```

## Links

```text
Parent Time Scope: planning/dashboard/years/2026.md
Related Time Scopes:
  - planning/dashboard/periods/2026-05-06-diploma-return-to-rails.md
  - planning/dashboard/weeks/2026-W25.md
  - planning/dashboard/days/2026-06-17.md
Related Goal Maps: not provided
Dashboard Index: planning/dashboard/index.md
Dashboard Viewer: planning/documentation/tools/tampermonkey/local-planning-dashboard-viewer.user.js
Pattern Capture: local Tampermonkey userscript; canonical repository path not yet created
End Session Workflow: planning/areas/planning-system/end-session-command-workflow.md
Dashboard Planning Contract / JSON / Repo Markdown Round-Trip: planning/documentation/tools/tampermonkey/local-planning-dashboard-viewer.user.js
Operational Day Template: -Planning/Templates/Day File Template.md
Deferred Work: planning/dashboard/backlog/deferred-work.md
Deferred Ideas: planning/dashboard/backlog/deferred-ideas.md
```
