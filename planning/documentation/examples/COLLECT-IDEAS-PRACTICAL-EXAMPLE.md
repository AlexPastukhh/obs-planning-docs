# Practical Example — UC-Centric `собери идеи`

Status: current demonstration only
Scope: compact practical example of the current `собери идеи` output contract after Standard Idea Review is integrated with affected useful-result planning. This file demonstrates; canonical rules remain in the Idea and Workspace Planning owners.

## Example source

User discussion proposes a hypothetical documentation-quality refinement:

> When a practical example becomes stale after its canonical owner changes, the review should identify the authoritative owner, state the stale meaning precisely, and update only the example/navigation surfaces that actually need change. The example must remain demonstration-only.

The example assumes current repository owners were checked. UC-centric planning, optional File Update Plan handoff and the Workspace/Application semantic boundary are already current baseline; they are not changes being introduced by this example.

# Current Plan Snapshot

```text
- Standard Idea Review is current;
- documentation changes route through affected Workspace UCs;
- Step 1 / Step 2 / Step 3 are proportional depths inside one selected Workspace UC;
- Application actor-visible behavior remains Scenario-owned;
- complete Step-3 file surface may hand directly to a separately authorized update/package route;
- an ordered File Update Plan remains a separate optional capability;
- examples demonstrate current owners and never become semantic authority.
```

# Questions / Risks / Problems

No material unresolved issues identified in this example.

# Cross-Cutting Ideas

## IDEA-EXAMPLE-01 — Make stale-example review explicit without promoting examples to authority

**Problem / Need:** after a canonical owner changes, an example may still look plausible while demonstrating outdated meaning or navigation.

**Proposed Answer:** make example review state the current canonical owner, the exact stale demonstration meaning and the narrow example/navigation surface that requires correction.

**Affected Workspace UCs:** `UC-DOC-REVIEW-EXAMPLES`, `UC-DOC-MAINTAIN-NAVIGATION` only when discoverability/read-order is materially affected.

**Current Conclusion:** selected for this hypothetical example.

Mandatory Necessity/Refinement/Consistency checks were performed; no additional material finding is printed merely to populate fields.

# UC / Scenario Groups

## `UC-DOC-REVIEW-EXAMPLES` — Review Practical Example Coverage

### Current State

Current reusable owners already state that examples demonstrate but do not own semantic rules. Example review decides whether a demonstration is needed and whether current examples still match canonical meaning.

### Planned Change — High Level

Refine the review result so a stale example finding identifies the canonical semantic owner, the stale demonstration meaning and the narrow correction surface instead of treating the example itself as the source of truth.

### Related Ideas

- `IDEA-EXAMPLE-01` — local impact: strengthen stale-example finding/result semantics.

### Planning Depth

- Step 1: reviewed
- Step 2: reviewed
- Step 3: reviewed for this example

### Step 1 — Target Use Case

**Purpose:** review whether practical examples adequately and truthfully demonstrate current canonical reusable meaning.
**Trigger / Input:** example coverage or staleness is questioned after a canonical owner changes.
**Result / End State:** explicit keep/update/remove/add-example conclusion with canonical owner reference and precise stale/current demonstration meaning when applicable.
**Boundaries:** examples remain demonstration-only; this UC does not redefine the canonical workflow/principle/registry or grant mutation permission.

### Step 2 — Target Domain / Rules

```text
canonical owner
→ authoritative current meaning

example
→ demonstration only

stale-example finding
→ canonical owner reference
→ stale demonstrated meaning
→ current meaning that should be demonstrated
→ narrow affected example/navigation surface

example mismatch
≠ reason to rewrite canonical owner when that owner is already correct
```

### Step 3 — Target Vertical Realization

**Deliverable result:** the example-review capability can produce a reviewable exact realization path for one stale demonstration without broad documentation churn.

**Expected Workspace Change Path:** resolve example-review UC → read canonical owner + current example → classify semantic mismatch → check whether navigation is affected → identify exact example/index files → verify links and demonstration-only boundary.

**Architecture review:** keep semantic authority local to the canonical owner; do not create a shared “example model” or duplicate workflow rules inside the example.

#### Affected Files — illustrative

| Change | File | Role in UC | Local / Shared | Why |
|---|---|---|---|---|
| Updated | `example-coverage-workflow.md` | UC workflow/supporting review rules | Local | make stale-example finding explicit |
| Updated | `examples/<affected-example>.md` | demonstration | Local | align demonstration with current canonical meaning |
| Checked unchanged | canonical workflow/principle owner | semantic authority | Separate | verify current meaning rather than rewrite it |
| Conditional | README/index | navigation | Shared routing | only when discovery/read-order actually changes |

### Target Semantic Owners

When sufficiently reviewed, the target workflow meaning is written completely enough that implementation does not need to invent what qualifies as a stale example or which owner wins.

### Transition Review

| Responsibility | Current | Target | Why |
|---|---|---|---|
| Example authority | demonstration-only | unchanged | preserve owner boundary |
| Stale-example result | example coverage conclusion | explicit owner + stale/current demonstration delta + narrow surface | make correction reviewable |
| Navigation | changed only when needed | unchanged rule | avoid incidental shared edits |

## `UC-DOC-MAINTAIN-NAVIGATION` — Maintain Repository Documentation Navigation

### Current State

Navigation owns discovery/read order only and routes readers to current semantic owners.

### Planned Change — High Level

No automatic change. This UC is affected only when the stale example also changes which example/index route should be discoverable.

### Related Ideas

- `IDEA-EXAMPLE-01` — local impact is conditional; do not edit navigation merely because an example body changed.

### Planning Depth

- Step 1: reviewed
- Step 2: reviewed
- Step 3: conditional / not selected unless a real navigation delta exists

### Step 1 — Target Use Case

Keep the current independently useful navigation-maintenance result.

### Step 2 — Target Domain / Rules

```text
example body changed
≠ automatic navigation change

example added / removed / moved / discovery role changed
→ review navigation delta
```

# Resolved UC Graph

```text
UC-DOC-REVIEW-EXAMPLES
→ hands off to → UC-DOC-MAINTAIN-NAVIGATION only when discovery/read-order meaning changes
```

The relation is semantic and conditional; co-editing files alone would not justify it.

# Cross-UC / Cross-Slice Architecture Review

- canonical semantic owners remain unchanged and are checked rather than copied into example files;
- example-review meaning stays local to its workflow/example surface;
- navigation is shared coordination surface and is touched only for a real discovery delta;
- no new Model/shared abstraction is justified.

# Current Overall Conclusions

The example demonstrates the current `собери идеи` contract without pretending UC-centric planning itself is still a pending transition: Standard Idea Review feeds affected Workspace UC planning, Q/R/P appears early, Step 1/2/3 remain inside each selected UC, cross-cutting meaning is defined once, and exact files appear only after semantic/work-path review.

# Potential Simplifications / Better Routes

None in this example. An already selected simplification would belong in Current Overall Conclusions rather than this section.
