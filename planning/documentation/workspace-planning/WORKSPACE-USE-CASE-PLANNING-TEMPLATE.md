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
## Shared / Cross-Cutting Ideas / Provenance — When material
## Area Concern Register — When material
<Inline or link current area register: Concern/Group ID, owner, Stored At, Priority, Concern Category, Status, Decision refs/residual state.>

## Review Order Lens — When material active concerns exist

# Workspace UC Groups

## <UC-ID> — <name>
### Real-Life Basis
**Status:** known | partial | unknown
**Need / situation / desired result:** ... # when known/material

### Current State
### Planned Change — High Level
### Related Ideas / Provenance

### Attached Planning Concerns / Q/R/P — When material
**Concern / Group ID:** ...
**Type:** Question / Risk / Problem
**Priority:** P0/Critical | P1/High | P2/Normal | P3/Low
**Concern Category:** ...
**Status:** ...
**Origin / Provenance:** ...
**Current / Target meaning affected:** ...
**Finding / Shared Resolution Surface:** ...
**AI Comment:** <known/options/justified recommendation/user-owned unknown/minimum useful question>
**Recommendation / Decision refs / Residual state:** <when material>
**Stored At:** <when routed elsewhere>

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
**Target Dependencies:** ...
**Dependency realization/mechanism:** ... # only when selected/useful
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
- Use the shared Planning Concern model: active/residual Q/R/P stays owner-attached; one-resolution-surface concerns are grouped; material retained answer/Decision trace may survive closure; no concrete owner/current planned state means no active concern.
- Keep Priority and Concern Category distinct; AI Comment does not invent user-owned Need/preferences/risk tolerance; Recommendation is optional and Decision requires actual selection.
- One logical Concern/Group has one detailed storage location; the Area Concern Register preserves addressability.
- Review Order is derived from concern priority + dependency/blocking/blast-radius/timing, never the primary planning queue.
- Current State summarizes/links current owners; Target changed/new owner meaning must be complete enough for implementation not to invent decisions.
- Step 3 traces expected paths and Architecture Lens before exact files when material.
- Review cross-Slice overlap/shared coordination tax.
- Step 4 is downstream realization feedback + semantic ReviewDiff of actual change, not another required pre-implementation template section.
