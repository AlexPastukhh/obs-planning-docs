# Workspace Use-Case Planning Template

Status: active reusable template
Scope: recommended Mini/Modular UCDS representation for one or several Workspace UCs through Step 1/2/3. Use proportionally; omit inapplicable detail rather than manufacturing content.

Use with `workspace-planning-principles-and-terminology.md`, current Establish/Change/Topology workflows, shared Idea owners and AI reviewability principles.

## Mini UCDS

A small bounded change may stay in one file:

```markdown
# Current Integrated Workspace Plan

## Source / Baseline
## Key Points
<material conclusions + Critical / High / Normal / Low Review Priority>

## Current Plan Snapshot
## Questions / Risks / Problems
## Shared / Cross-Cutting Ideas — When material

# Workspace UC Groups

## <UC-ID> — <name>
### Current State
### Planned Change — High Level
### Related Ideas

### Planning State
- Step 1 — Use Case: <reviewed / partial / not selected>
- Step 2 — Domain / Rules: <reviewed / partial / not selected>
- Step 3 — Vertical Realization: <reviewed / partial / not selected>

### Step 1 — Target Use Case
**Purpose:** ...
**Trigger / Input:** ...
**Result / End State:** ...
**Behavior / useful capability:** ...
**Boundaries:** ...
**Relations / handoffs:** ...

### Carry-Forward Context — When useful

### Step 2 — Target Domain / Rules — When selected
**Concepts / relationships / state:** ...
**Rules / invariants / policies:** ...
**Model / template / representation needs:** ...
**Semantic ownership:** ...
**Verification meaning:** ...

### Carry-Forward Context — When useful

### Step 3 — Target Vertical Realization — When selected
**Deliverable UC result:** ...
**Expected Workspace Change Path:** ...
**Architecture review:** ...
**Slice(s):** ...
**Local/shared owners:** ...
**Dependencies:** ...
**Verification:** ...

#### Affected Files — When exact realization is selected
| Change | File | Role in UC | Local / Shared | Why |
|---|---|---|---|---|

### Target Semantic Owners
### Transition Review

# Execution Order — When material
<partial order; show parallel groups and real dependencies rather than forcing total order>

# Resolved UC Graph — When material
# Cross-UC / Cross-Slice Architecture Review — When material
# Current Overall Conclusions
# Potential Simplifications / Better Routes — When material
```

## Modular UCDS

When the Mini plan becomes expensive to scan/review, split physical owners while preserving one current plan. A typical shape may be:

```text
planning/
├── execution-order.md
├── shared-ideas/
├── use-cases/
├── rules-and-owners/
└── realization/
```

This shape is illustrative, not mandatory folder ontology. Existing canonical owners may remain elsewhere and be linked rather than copied.

## Execution Order

Execution order is a projection/part of the selected realization, not a semantic owner of UC/rules. It may express:

```text
Slice A
→ Slice B || Slice C
→ Slice D after B+C
```

Track completion/current-next position only when useful; do not create history inside the current plan.

## Rules

- UCDS = **UC** (Use Case) → **D** (Domain/Rules) → **S** (Vertical Slice/Realization); Step 1/2/3 remain depths of the selected Workspace UC planning.
- Mini and Modular have the same semantic correctness; Modular is a review/navigation split.
- A later `собери идеи` pass updates the clearly selected current plan rather than appending a parallel result ledger.
- Keep shared Ideas once; affected UCs reference local impact.
- Stabilize upstream meaning before dependent downstream planning; later-step insight may be Carry-Forward context but not silent upstream authority.
- Keep Planning State explicit enough to distinguish reviewed upstream meaning from partial/not-selected downstream depth; Execution Order does not replace this state.
- Keep Q/R/P as unresolved/adverse current-plan delta only.
- Current State summarizes/links current owners; Target changed/new owner meaning must be complete enough for implementation not to invent decisions.
- Step 3 traces expected paths and Architecture Lens before exact files when material.
- Review cross-Slice overlap/shared coordination tax.
- Step 4 is downstream realization feedback + semantic ReviewDiff of actual change, not another required pre-implementation template section.
