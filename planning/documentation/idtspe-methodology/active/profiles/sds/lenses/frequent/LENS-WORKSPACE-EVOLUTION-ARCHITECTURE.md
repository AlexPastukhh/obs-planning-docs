# LENS-WORKSPACE-EVOLUTION-ARCHITECTURE — Evolution / Change Isolation

Compatibility Lens ID/path: `LENS-WORKSPACE-EVOLUTION-ARCHITECTURE`  
Legacy short alias: `L5`  
Semantic name: **Evolution / Change Isolation**  
Activation: `FREQUENT_CONDITIONAL`

## Purpose

Evaluate accepted/planned/probable future changes and owner-local Evolution Steps
against the current Target/implementation so related evolution remains feasible
and unrelated change directions do not become accidentally coupled.

This Lens no longer consumes or owns a canonical Workspace Evolution Map and does
not own a Current Global Architecture Position.

## Applicability Gate

Activate when:

- Scenario `RU-SCEN-03` materially affects current design;
- Strategy has material `May Change / Extend` or planned future Slices;
- Slice/Cross-Cutting Evolution Steps exist;
- a candidate introduces/prepares a seam/port/variation mechanism for future use;
- future changes may collide through shared Domain/Cross-Cutting/dependency surfaces;
- an accepted future assumption may have become stale.

Do not activate merely because any software may change someday.

## Target Inputs / Evidence

Use proportionally:

```text
Scenario RU-SCEN-03
Strategy RU-SSTRAT-01 May Change / planned future Slice
Strategy RU-SSTRAT-02 Slice → Domain use
Strategy RU-SSTRAT-03 owner bridge
Slice RU-SLICE-04 Evolution Steps
Cross-Cutting RU-XC-05 Evolution Steps
current implementation / code Evidence
accepted Decisions
L4 current dependency/change findings
L6 proof/operation findings when relevant
```

## Analysis Surface

Primary:
- material owner-local future-change projections/Evolution Steps;
- candidate Ideas/Decisions whose current structure is justified by future change.

Conditional:
- Slice→Domain map;
- Cross-Cutting applicability;
- current implementation dependency/change surface.

Relevant Core State:
Questions, Ideas/Branches, Q/R/P, Decisions, Evidence, Revalidation.

## Supported Operations

```text
ANALYZE
CHECK
REFINE
CHALLENGE
```

Lens operations remain evaluation/discovery. Target result mutation and lifecycle
consequences remain Core Finding Disposition/Resolution responsibilities.

## Operational Evaluation

For each material future change / Evolution Step ask:

1. What accepted future behavior/change is this based on?
2. Which current semantic owners legitimately need to change?
3. Which Domain objects/operations used by this Slice are involved?
4. Which other Slices use those same Domain objects?
5. Would this change force unrelated Slice changes? Why?
6. Which Cross-Cutting owners are involved, and which shared changes belong there?
7. Does this Step truly depend on another named Evolution Step?
8. Can independent future changes remain independent?
9. Is a seam/port/type-variation boundary needed now?
10. If such a seam already exists, does this planned change actually reuse it?
11. Is preparation needed now, or is future change cheap enough to defer?
12. Does an abstraction support accepted/planned variants or only an imagined future?

## Change Isolation Test

For suspicious coupling ask:

> If future change X happens, why must owner Y change?

A valid reason should be semantic/architectural, not accidental code placement.

### Domain pressure query

```text
affected Domain object
→ Strategy RU-SSTRAT-02 finds all Slices using it
→ inspect those Slice Evolution Steps
→ compare expected changes
```

This makes Domain future pressure derivable without a second canonical Domain
Evolution Map.

## Prepared Seam / Port Check

A prepared seam may be justified even with one current implementation variant when
an accepted/planned Evolution Step resolves that preparation as useful.

Check:

```text
which named future Step it serves
how that Step is expected to use it
what current complexity/tax it adds
whether the same future change is already cheap without it
what should remain on the current/simple side of the seam
```

Reject speculative frameworks that have no accepted/planned user.

## Prepare Now vs Defer

Possible valid conclusions include:

```text
prepare a narrow seam now
reuse an existing seam
keep variation local to one owner
move shared change to Cross-Cutting owner
change Domain boundary
explicitly defer preparation
nothing special is needed
```

These are Lens findings/evaluation conclusions until normal Resolution accepts a
Target-specific consequence.

## Resolution Boundary / Implementation Outlook

The Lens does **not** write:

```text
Evolution Step
Implementation Outlook
Generic Decision
Workspace Evolution Map
```

Typical flow:

```text
Evolution Step / future-change driver
→ material Question/Problem
→ Ideas where alternatives exist
→ L5 + L4 + Simplicity + Evidence evaluation
→ Core Decision/derivation/direct accepted answer as appropriate
→ Target Step Result projection
→ Implementation Outlook
```

`Implementation Outlook` is resolved target-specific meaning owned by the Slice or
Cross-Cutting Step, not Lens output.

## Workspace-Wide Architecture

A genuinely workspace-wide architecture question does not require a permanent
WEUC Target.

```text
Finding Candidate
→ Core Finding Disposition
→ keep local Decision with natural owner
  OR
→ Target Formation creates/reuses a bounded Local Target Contract when the
   cross-owner architecture problem has independent useful/revalidatable depth
```

Documentation / Representation may persist a compact cross-owner artifact if that
meaning genuinely needs shared human-readable addressability. No global file is
created merely because the question is architectural.

## Typical Findings

```text
change-axis leakage
accidental cross-Slice coupling
shared Domain change with multi-Slice blast radius
misplaced Cross-Cutting evolution
missing variation point
unjustified prepared seam
premature abstraction
real Evolution Step dependency
stale future assumption / revalidation signal
prepare-now vs defer conclusion
```

## Finding Contract

A material finding may expose:

```text
future change / Step
current affected owners
Evidence / rationale
change-isolation problem or opportunity
candidate consequence / likely owner hint
revalidation signal when relevant
```

Core Finding Disposition resolves accepted State/owner/lifecycle consequences.

## Artifact / File Implications

`NONE_DIRECT / NO_DISTINCT_SUPPORTING_ARTIFACT`.

Evolution meaning is represented by its natural owner:

```text
Scenario future/change meaning
Slice Evolution Steps
Cross-Cutting Evolution Steps
```

A physically separate `<owner>.evolution.md` is a Documentation / Representation
choice for the same owner under real pressure, not Lens-owned semantics.

## Composition

```text
L4 → current dependency/change surface
L5 → planned/probable future change interaction/isolation
Simplicity → minimum sufficient current structure
L6 → proof/observation/diagnosis/operation
```

## Guards

```text
future possibility alone ≠ architecture justification
Lens finding ≠ Decision
Lens ≠ evolution semantic owner
no mandatory global evolution map
no mandatory global architecture owner
prepared seam must pay for accepted/planned evolution
```

## High-Level Example

Scenario says additional capture sources are planned.

Strategy shows:

```text
SL-CAPTURE
  Uses CaptureItem
  Uses SourceContext

SL-REVIEW
  Uses CaptureItem
```

Candidate A puts source-specific branching inside `CaptureItem` everywhere.
Candidate B keeps source acquisition/normalization near `SL-CAPTURE` while
preserving stable `CaptureItem` meaning.

L5 asks whether adding PDF capture should force `SL-REVIEW` or unrelated
`CaptureItem` behavior to change. If not, it surfaces change-leakage pressure and
a narrow local variation-boundary candidate. Simplicity then challenges whether a
new abstraction is actually needed now. The accepted result may be a small seam,
reuse of an existing boundary, or explicit defer/no-preparation.

## Knowledge Basis

Reusable theory:

- change isolation follows accepted/planned change axes, not generic “future-proofing”;
- shared semantic ownership and current dependencies remain separate evaluation dimensions;
- prepare-now/defer decisions are evidence/plan dependent;
- evolution assumptions are revalidated when actual Evidence changes them.
