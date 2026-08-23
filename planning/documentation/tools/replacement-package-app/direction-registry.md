# Replacement Package App Direction Registry

Status: active application Direction Registry
Parent root registry: [`planning/direction-registry.md`](../../../direction-registry.md)
Current Scenario Catalog: [`scenarios/README.md`](scenarios/README.md)
Current Modular SDS plan: [`application-plan.md`](application-plan.md)

## `DIR-REPLACEMENT-PACKAGE-APP` — Use Replacement Package App

Purpose: provide safe local application of prepared repository changes, observable repository-work state, portable repository/change context, and optional ChatGPT handoff.

## Semantic Route

```text
DIR-REPLACEMENT-PACKAGE-APP
→ application-plan.md
→ scenarios/README.md
→ current Scenario owner
→ domain-draft.md when shared conceptual rules matter
→ slices.md for implementation decomposition/current realization
→ testing-plan.md for cross-Slice proof strategy
→ implementation contracts/source/tests
```

Application Scenario owners define user-world Need/result and detailed observable behavior. Commands, buttons, Git procedures, persistence records and implementation Slices do not become Scenarios merely because they are separately addressable.

`USE-CASE-REGISTRY.md` is retained only as a legacy capability-ID compatibility index for existing links/history; it is not the current application semantic registry.
