# EVO-RPKG-OPEN-BRANCH-SNAPSHOT-IN-VSCODE — Open Branch Snapshot In VS Code

[← Evolution Steps Map](../navigation/EVOLUTION-STEPS-MAP.md)

Planning Position: **Selected / Planned**  
Target Resolution: **Impact Identified**
Change Surface: **Mixed**  

## Driven By Application Definition
- [Review AI Work Efficiently](../application-definition.md#ab-rpkg-review-ai-work-efficiently-05)
- [Delegate Mechanical Repository Work](../application-definition.md#ab-rpkg-delegate-mechanical-repository-work-04)

## Entering From
Both predecessor target states must be **realized/materialized**:
- [Introduce Repository Snapshot Workflow](EVO-RPKG-INTRODUCE-REPOSITORY-SNAPSHOT-WORKFLOW.md);
- [Open Repository Folder In VS Code](EVO-RPKG-OPEN-REPOSITORY-FOLDER-IN-VSCODE.md).

The first provides exact active-branch Snapshot semantics; the second provides reusable exact-folder → VS Code handoff behavior/realization.

## Realization Prerequisite
- [`Standardize Typed Operation Results`](EVO-RPKG-STANDARDIZE-OPERATION-RESULTS.md)

## Step Purpose
Add an outgoing action for a selected active branch that creates an exact Snapshot of that branch and then opens the **materialized Snapshot folder** in VS Code. The Step must compose/reuse the two predecessor capabilities rather than implement a second Snapshot algorithm or a second VS Code-launch algorithm.

This Step is intentionally less resolved than its predecessors: the exact representation/lifetime of the materialized Snapshot folder (temporary workspace, retained extracted copy, archive-adjacent materialization, cleanup policy) remains OPEN.

## Owner Impacts

### Snapshot Feature Impact — CHANGED or composed, OPEN boundary
The exact selected branch/frozen commit and Snapshot truth must be reused. Do not re-resolve the mutable branch after Snapshot creation merely for VS Code opening.

Whether the Snapshot Feature itself gains a folder-result variant or a separate materialization Feature consumes its exact Snapshot result is still an owner-boundary question.

### Open Folder In VS Code Feature Impact — UNCHANGED
Reuse the predecessor Feature for the exact materialized Snapshot folder. Do not add Snapshot semantics to the generic folder-opening Feature.

### Scenario / Screen Impact — CHANGED
From the active-branch browsing surface, a selected action may compose:

```text
selected active Repository + Branch
→ freeze exact commit under Snapshot semantics
→ create exact Snapshot
→ establish exact local Snapshot folder representation
→ Open Folder In VS Code
```

A button/placement is selected Screen solution, not a Requirement by existence.

### Shared / materialization owner — OPEN
A bounded owner must establish an exact local folder representation corresponding to the same frozen Snapshot source. Its persistence/cleanup policy must be resolved before materialization is claimed.

## Candidate must-holds for owner resolution

These are target pressures to route to natural owners, not yet a complete owner body:

- the folder opened in VS Code must represent the **same frozen branch commit** as the Snapshot operation;
- the action must not silently fall back to the live mutable repository/branch when Snapshot materialization fails;
- Snapshot generation semantics must be reused rather than copied;
- VS Code exact-folder opening semantics/mechanism must be reused rather than copied;
- failure to materialize/open must preserve any already-proven Snapshot result truthfully.

## Materialization Set
None yet. This Step has selected intent and concrete prerequisites, but Target Resolution is only **Impact Identified**. Add `CREATE/REPLACE` consequences only after the Snapshot-folder owner boundary and complete affected Target Bodies are resolved.

## Step Readiness

Readiness: **NOT_READY**

Both semantic predecessors are unrealized and Snapshot-folder representation/lifetime plus affected owner bodies remain open.

### Step Q/R/P
- Q [BLOCKING]: what exact materialized Snapshot-folder representation/lifetime is opened?
- P [BLOCKING]: preserve the same frozen branch commit and reuse both predecessor capabilities without duplicate algorithms.
