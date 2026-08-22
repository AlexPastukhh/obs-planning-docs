# Repository Navigation And Semantic Coverage Review

Status: active reusable documentation-layer workflow
Scope: verify that a repository can be understood from natural navigation and that supported capabilities/behavior/owners are reachable through the correct current semantic registry. This workflow is review-only and hands identified defects to the appropriate maintenance/planning owner.

## Review

```text
for each current Direction:
  current local owner + applicable primary semantic registry reachable?
    Workspace / methodology Direction → Use-Case Registry
    Application Direction → Scenario Catalog

for each current Workspace/methodology Use Case:
  stable ID/name/status?
  recognizable trigger/input?
  purpose explicitly stated in the registry entry?
  meaningful result/end state?
  boundaries explicitly stated in the registry entry?
  owner route explicitly stated in the registry entry?
  semantic UC relations/handoffs when material?

for each current Application Scenario:
  stable ID/name/status?
  Need/context + actor-visible behavior + meaningful observable result?
  boundaries/current owner route?
  reachable from the current Scenario Catalog?

for each active canonical owner:
  reachable from the applicable current semantic entry
  or explicit supporting-owner route?

for each natural navigation entry:
  does README/index/Direction navigation reach the intended current semantic registry,
  semantic entry and owner without duplicating its semantic body?

for each executable command:
  related current semantic capability/behavior when the command represents an independently useful shortcut?
```

## Defects

- active owner with no incoming semantic/navigation route = orphan owner;
- current navigation path to a missing/retired owner = broken route;
- independently useful supported Workspace/methodology capability with no current Use Case = UC coverage gap;
- independently meaningful Application behavior with no current Scenario/Scenario-Catalog route = Scenario coverage gap;
- complete semantic Use-Case or Scenario body maintained in two active authorities = duplicate authority;
- capability/behavior discoverable only by command/filename/helper/prior-chat knowledge = discoverability defect;
- Application Direction forced through a parallel Application-Use-Case layer merely for file-type symmetry = semantic-boundary defect.

Mechanical checks can validate paths, IDs, required fields and reachability. Independent usefulness and correct Scenario/Use-Case boundaries require semantic review.

## Maintenance Handoffs

```text
natural README/index/read-order defect
→ UC-DOC-MAINTAIN-NAVIGATION;

Direction / Workspace-methodology Use-Case registry contract defect
→ UC-DOC-MAINTAIN-REGISTRIES;

Application Scenario identity/behavior/catalog-content defect
→ current Application Planning / Scenario owner route;

executable command-route defect
→ UC-DOC-MAINTAIN-COMMAND;

owner-placement uncertainty
→ UC-DOC-FIND-OWNER.
```

The review reports the defect and appropriate handoff. It does not silently perform maintenance or gain mutation permission.

## Current Coverage Checks

Coverage review now also verifies:

- every selected reusable UC has one semantic registry identity and reachable owner route;
- Application behavior remains Scenario-owned; Workspace/methodology behavior remains UC-owned;
- a Q/R/P is never treated as a free-standing planning owner;
- `Review Order` remains a lens/projection rather than navigation authority;
- dedicated `UC-PLAN-ARCH-DISCOVER-WEUC` is reachable without replacing broad `UC-PLAN-ARCH-WORKSPACE-USES`;
- Testing Plan / Practical Acceptance remains reachable from Testing Planning without becoming product-behavior authority.
