# Repository Navigation And Use-Case Coverage Review

Status: active reusable documentation-layer workflow
Scope: verify that a repository can be understood from natural navigation and that supported capabilities/owners are reachable. This workflow is review-only and hands identified defects to the appropriate maintenance Use Case.

## Review

```text
for each current Direction:
  current local owner + Use-Case Registry reachable?

for each current Use Case:
  stable ID/name/status?
  recognizable trigger/input?
  purpose explicitly stated in the registry entry?
  meaningful result/end state?
  boundaries explicitly stated in the registry entry?
  owner route explicitly stated in the registry entry?
  related Scenario when detailed application behavior exists?

for each active canonical owner:
  reachable from a current Use Case or explicit supporting-owner route?

for each natural navigation entry:
  does README/index/Direction navigation reach the intended current Use Case/owner
  without duplicating its semantic body?

for each executable command:
  related current semantic Use Case when the command represents an independently useful capability?
```

## Defects

- active owner with no incoming semantic/navigation route = orphan owner;
- current navigation path to a missing/retired owner = broken route;
- independently useful supported capability with no Use Case = coverage gap;
- complete semantic Use-Case body maintained in two active files = duplicate authority;
- capability discoverable only by command/filename/helper/prior-chat knowledge = discoverability defect.

Mechanical checks can validate paths, IDs, required fields and reachability. Independent usefulness and correct Scenario/Use-Case boundaries require semantic review.

## Maintenance Handoffs

```text
natural README/index/read-order defect
→ UC-DOC-MAINTAIN-NAVIGATION;

Direction / Use-Case semantic contract defect
→ UC-DOC-MAINTAIN-REGISTRIES;

executable command-route defect
→ UC-DOC-MAINTAIN-COMMAND;

owner-placement uncertainty
→ UC-DOC-FIND-OWNER.
```

The review reports the defect and appropriate handoff. It does not silently perform maintenance or gain mutation permission.
