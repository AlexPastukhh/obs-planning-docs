# Practical Example — UC-Centric `собери идеи`

Status: current demonstration only
Scope: compact practical example of the current `собери идеи` output contract after Standard Idea Review is integrated with affected useful-result planning. This file demonstrates; canonical rules remain in the Idea and Workspace Planning owners.

## Example source

User discussion proposes:

> When planning a material documentation change, organize the result by the Workspace Use Cases being changed, preserve one cross-cutting Idea instead of copying it into every UC, and review the end-to-end file surface before implementation.

The example assumes current repository owners were checked and no material source fact is being invented.

# Current Plan Snapshot

```text
- keep the generic Idea entity and Standard Idea Review;
- use Workspace UC / Application Scenario as the primary integrated planning unit;
- for documentation, review Step 1 + Step 2 by default once the UC boundary is grounded;
- include Step 3 when exact realization is requested/grounded;
- keep Current / Target / Transition separate;
- minimize cross-Slice overlap and shared coordination owners.
```

# Questions / Risks / Problems

No material unresolved issues identified in this example.

# Cross-Cutting Ideas

## IDEA-EXAMPLE-01 — Plan documentation changes by affected useful result

**Problem / Need:** a file-first plan can show what to edit without making the useful capability/result or combined architecture clear.

**Proposed Answer:** route the selected change to affected Workspace UCs, integrate all Ideas for one UC into one Target UC, review semantic rules and then plan the vertical realization/file surface.

**Affected UCs:** `UC-DOC-PLAN-UPDATE`, `UC-DOC-MAINTAIN-REGISTRIES`.

**Current Conclusion:** selected for this example.

Mandatory Necessity/Refinement/Consistency checks were performed; no additional material finding is printed merely to populate fields.

# UC / Scenario Groups

## `UC-DOC-PLAN-UPDATE` — Plan A Documentation Update

### Current State

Current owner route is the documentation Use-Case Registry + `documentation-update-plan-workflow.md`. Assume those owners currently describe a conceptual/owner plan with a later concrete file-plan handoff.

### Planned Change — High Level

Plan the documentation change around the affected Workspace UC first, then review rules/owners and finally the end-to-end vertical realization. The result should be understandable at high level without reading every Idea, and implementation should not need to invent missing semantic decisions.

### Related Ideas

- `IDEA-EXAMPLE-01` — local impact: make the UC plan own the integrated semantic target before files.

### Planning Depth

- Step 1: reviewed
- Step 2: reviewed
- Step 3: reviewed for this example

### Step 1 — Target Use Case

**Purpose:** plan one material documentation change as a coherent change to a useful documentation capability.
**Trigger / Input:** selected documentation change intent/Ideas.
**Result / End State:** one coherent Target UC plan rather than independent file edits per Idea.
**Boundaries:** planning does not mutate files or grant package/commit permission.
**Relations / handoffs:** may use registry/navigation maintenance and Architecture Planning proportionally.

### Step 2 — Target Domain / Rules

```text
- UC identity remains owned by the Use-Case Registry;
- workflow owns orchestration;
- focused Model owner is optional and requires real state/lifecycle/invariant responsibility;
- template owns representation shape;
- Current state is summarized + linked;
- Target changed/new meaning is explicit;
- Transition explains what/why separately.
```

### Step 3 — Target Vertical Realization

**Deliverable result:** the documentation planning UC can produce an end-to-end reviewed target with a concrete file surface.

**Expected Workspace Change Path:** resolve UC → read current owners → integrate Ideas → review rules → trace path/architecture → identify exact files → verify.

**Architecture review:** prefer local semantic owners; shared registry/navigation touches are allowed only for genuine routing/discovery responsibility.

#### Affected Files — illustrative

| Change | File | Role in UC | Local / Shared | Why |
|---|---|---|---|---|
| Updated | `documentation-update-plan-workflow.md` | UC orchestration | Local | make UC-centric planning the default semantic route |
| Updated | `use-case-registry.md` | UC contract/route | Shared routing | expose the changed result/owner route |
| Checked unchanged | `file-update-overview-workflow.md` | explicit ordered file-plan capability | Separate | still active; not automatically retired |

### Target Semantic Owners

The target workflow should be written as a complete planned future semantic body when the review is sufficiently grounded. It should not merely say “update the workflow later.”

### Transition Review

| Responsibility | Current | Target | Why |
|---|---|---|---|
| Primary planning axis | conceptual owners → later file steps | affected UC → rules → vertical realization | make useful result and architecture visible earlier |
| File plan | primary concrete downstream representation | optional explicit ordered plan when still useful | avoid duplicate planning surfaces |

## `UC-DOC-MAINTAIN-REGISTRIES` — Maintain Directions And Use Cases

### Current State

Registry maintenance owns complete semantic Direction/UC entries and routing, not workflow bodies or command permissions.

### Planned Change — High Level

No change to registry authority. The cross-cutting Idea only requires that UC-centric planning update the registry contract/route when the planned capability meaning actually changes.

### Related Ideas

- `IDEA-EXAMPLE-01` — local impact: registry changes remain narrow routing/identity consequences, not the main planning unit.

### Step 1 — Target Use Case

Keep the same independently useful registry-maintenance result.

### Step 2 — Target Domain / Rules

Keep the existing generic UC contract authority; do not create a second Use-Case model owner.

### Step 3 — Target Vertical Realization

Only the affected registry row/file is changed when semantic routing really changes. This shared orchestration overlap is explicit and should remain minimal.

# Resolved UC Graph

```text
UC-DOC-PLAN-UPDATE
→ uses/hands off to → UC-DOC-MAINTAIN-REGISTRIES when registry meaning changes
```

The relation is semantic; mere co-editing of a file would not be enough to invent it.

# Cross-UC / Cross-Slice Architecture Review

- `use-case-registry.md` is shared routing/identity surface and therefore justified shared coordination, but should stay thin.
- UC-local workflow meaning remains local to `UC-DOC-PLAN-UPDATE`.
- If two independent UC slices repeatedly require the same capability-local workflow/model file to change, review the UC/owner boundary instead of normalizing the overlap.

# Current Overall Conclusions

The example demonstrates that `собери идеи` is no longer only a flat Idea list: Standard Idea Review remains intact, while selected change meaning is integrated into affected UC/Scenario plans to the requested/justified depth. Cross-cutting Ideas are defined once, Q/R/P stays near the beginning, and Step 1/2/3 remain inside each affected UC.

# Potential Simplifications / Better Routes

None in this example. An already selected simplification would belong in Current Conclusions rather than this section.
