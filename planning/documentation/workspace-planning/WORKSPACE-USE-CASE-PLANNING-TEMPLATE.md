# Workspace Use-Case Planning Template

Status: active reusable template
Scope: recommended integrated shape for planning one or several Workspace UCs through Step 1/2/3. Use proportionally; omit inapplicable detail rather than manufacturing content.

Use with:

- `workspace-planning-principles-and-terminology.md`
- `establish-workspace-use-case-workflow.md`
- `review-change-workspace-use-case-workflow.md`
- `review-workspace-use-case-topology-workflow.md`
- shared Idea owners when Ideas are the source of change.

## Template

```markdown
# Current Integrated Workspace Plan

## Source / Baseline

<selected source/current owner baseline>

## Current Plan Snapshot

<short selected/current meaning and current planning depth>

## Questions / Risks / Problems

<only material unresolved/adverse delta relative to Current Plan; if none, say so briefly>

## Cross-Cutting Ideas — When material

### IDEA-...
**Problem / Need:** ...
**Proposed Answer:** ...
**Affected Workspace UCs:** ...
**Current Conclusion:** ...

<print other Standard Idea Review fields only when they contain material supported findings>

# Workspace UC Groups

## <UC-ID> — <name>

### Current State
<high-level summary + direct current-owner links>

### Planned Change — High Level
<compact complete description of the planned UC change>

### Related Ideas — When material

#### Local Ideas
<full local review only where useful>

#### Cross-Cutting Idea References
- `IDEA-X` — <UC-specific impact only>

### Planning Depth
- Step 1: <reviewed / partial / not selected>
- Step 2: <reviewed / partial / not selected>
- Step 3: <reviewed / partial / not selected>

### Step 1 — Target Use Case
**Purpose:** ...
**Trigger / Input:** ...
**Result / End State:** ...
**Behavior / useful capability:** ...
**Boundaries:** ...
**Relations / handoffs:** ...

### Carry-Forward Context — When useful
<known later-layer meaning that is preserved but not yet final at that later depth>

### Step 2 — Target Domain / Rules — When selected
**Concepts:** ...
**State / lifecycle:** ...
**Relationships:** ...
**Rules / invariants / policies:** ...
**Model / template / representation needs:** ...
**Semantic ownership:** ...
**Verification meaning:** ...

### Carry-Forward Context — When useful
<known realization/file/verification implications>

### Step 3 — Target Vertical Realization — When selected
**Deliverable UC result:** ...
**Expected Workspace Change Path:** ...
**Architecture review / reused Architecture findings:** ...
**Slice(s):** ...
**Local semantic owners:** ...
**Shared semantic owners:** ...
**Orchestration / routing / projections:** ...
**Dependencies:** ...
**Verification:** ...

#### Affected Files
| Change | File | Role in UC | Local / Shared | Why |
|---|---|---|---|---|

#### Checked But Unchanged
| File | Why unchanged |
|---|---|

### Target Semantic Owners

#### Future Registry Meaning
<complete target UC registry contract when changed/new>

#### Future Workflow
<full planned future semantic body when sufficiently reviewed>

#### Future Model(s) / Template(s) — When changed/new
<complete target meaning/shape; do not create owners merely for template symmetry>

### Transition Review
| Responsibility | Current | Current owner | Target | Target owner | Why |
|---|---|---|---|---|---|

# Resolved UC Graph — When several UCs are involved

<uses / depends on / includes when applicable / hands off / reviews / produces input for>

# Cross-UC / Cross-Slice Architecture Review — When several UCs/Slices are involved

## Combined architecture effect
...

## Overlap / shared coordination review
...

## UC / owner-boundary findings
...

# Current Overall Conclusions

<selected integrated meaning>

# Potential Simplifications / Better Routes — When material

<only not-yet-selected candidate changes to Current Plan>
```

## Rules

- Primary planning unit is the Workspace UC, not the Idea or file.
- Keep Q/R/P near the beginning as review-attention delta to Current Plan.
- Keep cross-cutting Ideas compact and define them once; affected UCs reference them and state local impact.
- Several Ideas affecting one UC converge into one Target UC.
- Step 1/2/3 belong inside the same selected UC plan; deeper sections are proportional.
- Preserve earlier later-step knowledge as Carry-Forward Context rather than discarding or silently finalizing it.
- Current State normally summarizes and links current owners; do not duplicate complete current bodies.
- Target changed/new owner meaning must be complete enough to avoid semantic blind spots; when a changed/new primary workflow is sufficiently reviewed at the selected depth, include its complete planned future workflow body rather than an approximate summary or TODO.
- Keep Transition Review separate from the clean Target state.
- Step 3 traces expected paths and uses the current Architecture Lens before exact files when architecture is material.
- Do not optimize raw step/file count; prefer the lowest-cost correct, local, independently verifiable path.
- Review every material cross-Slice overlap and the number/necessity of shared coordination owners.
