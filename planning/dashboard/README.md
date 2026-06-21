# Local Planning Dashboard

Status: active local dashboard root
Doc version: v0.2.0
Scope: repo-backed local planning dashboard rendered by Tampermonkey.

## 1. Source Of Truth

```text
Repo markdown files are source of truth.
Tampermonkey is a read-only viewer.
Manual edits happen in repo / Obsidian / VS Code.
AI can help rewrite/update, but chat output is not source of truth until saved into files.
```

## 2. Structure

```text
planning/dashboard/
├─ index.md
├─ years/
├─ periods/
├─ weeks/
├─ days/
├─ goals/
└─ backlog/
```

## 3. Model

```text
Time scopes:
  years / periods / weeks / days

Goal maps:
  concrete goals/results that can span time scopes

Backlog:
  deferred work and deferred ideas
```

## 4. Viewer

Run from repository root:

```powershell
python -m http.server 8765
```

Tampermonkey reads:

```text
http://127.0.0.1:8765/planning/dashboard/index.md
```
