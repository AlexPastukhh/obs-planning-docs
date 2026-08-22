# Practical Example — Accumulating UCDS `собери идеи`

Status: current demonstration only
Scope: compact example of the current `собери идеи` output contract using Key Points, Review Priority, an accumulating current plan and Mini UCDS. Canonical rules remain in the Idea, Workspace Planning and AI reviewability owners.

## Example Source

User discussion proposes a documentation-quality refinement:

> When a practical example becomes stale after its canonical owner changes, identify the authoritative owner, state the stale meaning precisely, and update only the example/navigation surfaces that need change.

Assume current repository owners were checked and an existing Mini UCDS plan is already the selected current plan.

## Source / Baseline

- selected source: the discussion above;
- current plan: the existing documentation-quality Mini UCDS;
- current canonical examples owner: `example-coverage-workflow.md`;
- examples demonstrate current owners and do not become semantic authority.

## Key Points

- **KP-1 — Example authority boundary — High** — stale examples must be corrected against canonical owners; the example itself never defines current methodology.
- **KP-2 — Current-plan continuity — High** — integrate this selected change into the existing UCDS rather than creating a second command-result plan.
- **KP-3 — Realization locality — Normal** — only the affected example/index surfaces should change when canonical semantics are already correct.

## Current Plan Snapshot

```text
UC-DOC-REVIEW-EXAMPLES
→ current example review capability
→ existing canonical owner remains correct
→ target change is a narrow example-coverage refinement
```

## Questions / Risks / Problems

No material unresolved issues identified.

## Cross-Cutting Ideas

### IDEA-EXAMPLE-01 — Keep stale-example correction narrow

**Problem / Need:** an example can remain plausible while demonstrating retired terminology.

**Proposed Answer:** compare it with the canonical owner, state the stale demonstrated meaning and update/remove only the example/navigation surfaces that are actually stale.

**Affected Workspace UCs:** `UC-DOC-REVIEW-EXAMPLES`; navigation maintenance only when discoverability is affected.

**Current Conclusion:** selected. Necessity/Better-Route and consistency checks found no simpler route than correcting the stale demonstration directly.

# Workspace UC Groups

## `UC-DOC-REVIEW-EXAMPLES` — Review Practical Example Coverage

### Current State

Current reusable owners already state that examples demonstrate but do not own semantic rules.

### Planned Change — High Level

Make stale-example review identify the canonical owner, stale demonstrated meaning and narrow correction surface.

### Related Ideas

- `IDEA-EXAMPLE-01` — local impact: strengthen stale-example review/correction clarity.

### Planning State

- Step 1 — Use Case: reviewed
- Step 2 — Domain / Rules: reviewed
- Step 3 — Vertical Realization: reviewed for this bounded change

### Step 1 — Target Use Case

**Purpose:** review whether reusable examples adequately and truthfully demonstrate current canonical meaning.
**Trigger / Input:** example coverage or staleness is questioned after a canonical owner changes.
**Result / End State:** explicit keep/update/remove/add-example conclusion with canonical owner reference and precise stale/current demonstration meaning when applicable.
**Behavior / useful capability:** reviewers can distinguish stale demonstration from a defect in the canonical owner.
**Boundaries:** examples remain demonstration-only and this UC grants no mutation permission.
**Relations / handoffs:** selected corrections hand to the normal documentation update/package route.

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
```

### Step 3 — Target Vertical Realization

**Deliverable UC result:** corrected current example coverage with no duplicate semantic owner.
**Expected Workspace Change Path:** canonical owner → examples index/example body → example verification.
**Architecture review:** local reusable-documentation change; no new shared coordination owner justified.
**Slice(s):** one local example-coverage slice.
**Dependencies:** current canonical owner meaning must already be selected.
**Verification:** reread changed example/index against the canonical owner and confirm retired terminology is not presented as current.

## Execution Order

```text
confirm canonical owner
→ correct stale example body/index
→ verify discoverability and terminology
```

## Current Overall Conclusions

The selected Idea is integrated into the existing UCDS current plan. No second competing current plan or append-only `собери идеи` ledger is created.

## Potential Simplifications / Better Routes

No material unselected better route identified.
