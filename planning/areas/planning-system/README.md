# OBS Planning Runtime Area

Status: active minimal OBS runtime index
Doc version: v1.1.0-runtime-contract
Scope: technical entry points that remain outside the self-describing Dashboard runtime.

## Runtime model

```text
Dashboard userscript/UI
  owns local planning field meanings, scope/level help, local browser storage, JSON export/import, Dashboard-generated repo Markdown round-trip and the self-contained repo-sync prompt.

Repository Markdown
  remains durable source of truth after reviewed synchronization.

Tampermonkey
  does not write repository files, run git, commit or push.
```

Day/week/month/period/year/goal planning is not a UCM command family. Open the Dashboard and enter data manually, or copy/export its JSON and sync prompt for ChatGPT-assisted repository synchronization.

## Active files

```text
planning/documentation/tools/tampermonkey/local-planning-dashboard-viewer.user.js
  self-describing local planning UI and the single versioned storage/JSON/repo-Markdown contract

planning/documentation/tools/tampermonkey/planning-pattern-capture.user.js
  session timer, D/F capture and pending operational-session outbox

planning/areas/planning-system/end-session-command-workflow.md
  owner of the real `конец` operational command

planning/dashboard/index.md
  active repository source registry
```

The deleted scenario/workspace/idea/AC command files are not runtime authorities and must not be recreated merely because a Dashboard field or planning principle exists.
