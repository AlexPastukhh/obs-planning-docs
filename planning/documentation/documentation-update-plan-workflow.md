# Documentation Update Plan Workflow

Status: active reusable documentation-layer workflow
Doc version: v0.2.0-obs-cleanup
Scope: plan-first workflow for non-trivial documentation changes.

## 1. Purpose

Use this before broad documentation changes, command-routing changes, template changes or reusable-layer cleanup.

## 2. Plan Shape

```text
Target:
  <what docs area/change is being planned>

Sources to read:
  <root UCM / area docs / reusable owner workflows / target files>

Proposed changed files:
  - <path>: <what/why>

Boundaries:
  - <files/areas intentionally not changed>

Risks:
  - <routing/source-of-truth/duplication/stale-reference risk>

Apply mode:
  direct edit / replacement archive / no artifact yet

Next action:
  <concrete next step>
```

## 3. Rules

```text
- Do not edit files during a plan-only pass.
- Do not invent target project files that do not exist.
- Prefer root UCM + area docs + reusable owner workflows as sources.
- For replacement archives, include apply and diff-to-clipboard commands in chat.
- Ask for diff review before commit.
```
