# Screen / Spatial Supporting Template

Status: active supporting template; canonical semantic contract is SDS `TM-SCREEN`.

Purpose: represent one application Screen/surface or a small Screen set as spatial/navigation composition without duplicating Feature behavior or Scenario journey meaning.

Canonical owner:
`../../idtspe-methodology/active/profiles/sds/target-modules/TM-SCREEN.md`

## RU-SCREEN-01 — Screen Map

Use when cross-Screen inventory/routes/participation/global spatial constraints are material.

```text
Screen / surface
  purpose
  participating Features
  Scenario journey role(s)
  routes / transitions / re-entry
  global spatial constraints
```

## RU-SCREEN-02 — Screen Draft Set

Use only for Screens/zones that need independent spatial detail:

```text
Screen ID / name
purpose / Scenario role(s)
zones / hierarchy
Feature presence / actions / results visible here
context visible/input/editable here
entry / exit / route relations
screen-specific accessibility/platform/spatial constraints
```

Do not copy canonical Feature behavior into Screen drafts. Reference Feature/`BR-*` identities when addressability helps. Scenario references describe journey participation, not behavioral ownership.

## Ownership Boundary

```text
Feature  → behavior / principal result
Scenario → actor-to-Benefit journey composition
Screen   → spatial/navigation composition, Feature presence and screen-specific constraints
```

Changing where a Feature is exposed usually changes Screen composition, not Feature behavior identity.

## Representation

A dedicated Screen file/folder is optional. Use Core Representation/Addressability rules and omit any structure that adds no material review/handoff value.
