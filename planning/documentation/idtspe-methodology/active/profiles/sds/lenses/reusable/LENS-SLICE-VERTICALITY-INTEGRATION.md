# LENS-SLICE-VERTICALITY-INTEGRATION — Slice Verticality / Result / Integration

Lens ID: `LENS-SLICE-VERTICALITY-INTEGRATION`  
Activation: `TARGET_PROFILE_REUSABLE`

## Purpose

Keep a Slice as one bounded useful/checkable vertical result and preserve upstream semantics while planning integrated realization.

## Applicability Gate

Primary for Slice Strategy/Implementation Slice; supporting for Frontend/Cross-Cutting integration.

## Target Inputs / Evidence

Primary Scenario, Scenario DATA, Behavior Items, must-hold conditions, Screen when UI, Domain meaning and current implementation/workspace.



## Analysis Surface

### Primary Result Units / Semantic Selectors

- `TM-SLICE-STRATEGY`: `RU-SSTRAT-01..RU-SSTRAT-04`
- `TM-IMPLEMENTATION-SLICE`: `RU-SLICE-01..RU-SLICE-04`

### Conditional Result Units / Semantic Selectors

- `TM-IMPLEMENTATION-SLICE`: `RU-SLICE-05` when a Focused Part Plan exists
- Frontend/Cross-Cutting result meaning when used in supporting mode

### Relevant State Units

```text
Questions
Ideas / Planning Branches when comparison is material
Q/R/P
Decisions
Evidence / Evidence Needs
Revalidation state
```

### Context

- Primary Scenario / Scenario DATA / Behavior
- requirements/invariants
- Screen meaning
- Domain meaning
- current implementation/workspace
- related Decisions / QRP / Evidence

Context availability does not mean this Lens audits all context. The deliberate focus remains the Result/State meaning named above.

## Supported Operations

```text
ANALYZE
CHECK
REFINE
CHALLENGE
```

- `ANALYZE` inspects the Analysis Surface through this Lens perspective.
- `CHECK` evaluates current meaning against this Lens's criteria/guards.
- `REFINE` surfaces a proposal for more precise/missing meaning where the semantic destination is already understood.
- `CHALLENGE` surfaces reasons selected/accepted meaning may be weak, stale, unsupported or wrong.

`REOPEN`, State-Unit creation/refinement, cross-owner handoff and Result Unit update after resolution are Core Finding-Disposition/lifecycle consequences, not Lens methods.

## Useful Vertical Result Integrity

Normal Slice → one Primary Scenario → one bounded useful/checkable result. Reject horizontal-only decomposition unless an exceptional evidence-backed prerequisite is itself independently useful/checkable.

## Initial vs Extending Vertical

```text
INITIAL_VERTICAL
  first useful vertical baseline

EXTENDING_VERTICAL
  adds another useful end-to-end result
  while preserving accepted baseline guarantees
```

## Semantic Obligation Decomposition

```text
Behavior Obligations
DATA Obligations
Requirement / Invariant Obligations
Screen Obligations — when UI
Domain Obligations / Elements Used
```

These are the exact semantics to realize, not coverage scores.

## Implemented / Delegated / Later / Outside

Make responsibility boundaries explicit and prevent scope creep.

## Owner / Delegation

Shared concern applicability does not transfer canonical ownership.

## Dependency vs Source

Technical dependency/handoff is not automatically a semantic Source.

## Runtime Path vs Codebase Integration Path

```text
Runtime Path
= descriptive running-system path

Codebase Integration Path
= pre-implementation codebase call-level picture:
  concrete existing/planned owners + significant calls + order + responsibility
```

The full call-level template belongs in `TM-IMPLEMENTATION-SLICE`; this Lens checks integrity between views.

## Part-Plan Escalation

Mostly understood local call/responsibility → lightweight Part Plan. Material unresolved algorithm/state/integration/architecture choice space → Finding Candidate first; Core Finding Disposition decides whether accepted meaning becomes/refines Question / Idea / Q/R/P / Decision input. When independently substantial, Core disposition may surface a Target Formation candidate; Target Formation decides reuse/handoff/new bounded Target.

## Typical Findings

verticality correction, initial/extending role, obligation gaps, implemented/delegated/later/outside map, runtime-vs-call-path inconsistency, Part Plan/Target-Formation-candidate finding and Q/R/P-related finding.



## Finding Contract

The items above are `Finding Candidates`, not Lens-owned State Unit kinds or direct Result mutations.

A material finding may expose proportionally:

```text
Meaning
Affected Unit(s) / fields — when known
Evidence / rationale
Materiality hint — optional
Likely semantic owner — optional hint
Suggested lifecycle consequence — optional hint
```

Core [`Finding Disposition`](../../../../idtspe-core/shared/finding-disposition-contract.md) resolves the actual State/lifecycle/owner destination. Normal authority/resolution must occur before accepted Result Unit meaning changes.

This Lens does not define new Result Units or target-result fields. If repeated findings reveal missing target-result meaning, revise the appropriate Target Module/Local Target Contract or let Core disposition the finding to another owner.

## Typical Consumers

Slice Strategy, Implementation Slice, Frontend Slice, Cross-Cutting integration.

## Artifact / File Implications

`NONE_DIRECT / NO_DISTINCT_SUPPORTING_ARTIFACT`. Core Finding Disposition may resolve current Slice meaning back to the Slice Target. A future-evolution Finding Candidate may call for WEUC/L5 evaluation; only suspected project-global meaning may carry `TM-WEUC` as a likely-owner hint, and Core resolves the actual handoff/owner consequence.

The selected Useful Vertical Result, Runtime Path, Codebase Integration Path and lightweight Part Plan are represented through `TM-IMPLEMENTATION-SLICE / AP-SLICE-01..02`. This Lens evaluates verticality/integration but does not duplicate Slice-result persistence. A material future Slice path first becomes a WEUC/L5 Finding Candidate; Core Finding Disposition resolves any accepted local evolution meaning/owner, after which `AG-L5-02` may propose an Evolution section or `<slice-owner>.evolution.md` supporting representation. Documentation / Representation + P-14 / TF-10 decide whether it is actually materialized.

## Guards

Slice cannot redefine Scenario/DATA/Domain/Screen truth for convenience.

## Composition

L4 dependencies/change surface; L5 WEUC/architecture; L6 proof/operation; UI pack frontend realization.

## Escalation / Revalidation

Implementation Evidence that challenges upstream meaning surfaces a challenge/revalidation finding; Core Finding Disposition/lifecycle decides whether the upstream owner is reopened.

## High-Level Example — Self-Contained Walkthrough

### Situation

A team wants to deliver a new capture capability and proposes:

```text
Sprint/Slice 1:
  database tables

Slice 2:
  backend API

Slice 3:
  frontend UI
```

### Why This Lens

A normal implementation Slice should deliver a bounded useful/checkable vertical result, not just one technical layer.

### Walkthrough

Reframe:

```text
SL-01:
  user can durably capture selected material

SL-02:
  user can additionally preserve source context
  while SL-01 guarantees remain true
```

For SL-01, check:

```text
one Primary Scenario
Useful Vertical Result
Behavior/DATA obligations
Runtime Path
Codebase Integration Path
implemented/delegated/later/outside
```

### Result

The Lens produces verticality/integration findings and exposes missing obligations or fake horizontal slicing.

### Boundary / Lesson

A technical prerequisite may occasionally be a legitimate Target, but it must be justified explicitly rather than mislabeled as a normal user-facing vertical Slice.

## Knowledge Basis

Mode: `INLINE`

**Embedded Principles / Rules / Theory:**

- A Slice is justified by one useful vertical result and must keep semantic obligations connected through runtime/integration planning.
- Part plans and implementation details do not become separate Targets automatically. If they gain independent planning value, surface a Target Formation candidate and let Target Formation decide whether a separate Target is warranted.

**Referenced Knowledge Owners:**

- `NONE`

**Reference Load Policy:**

No external knowledge body is required for normal use.

**Operationalization Notes:**

Current code/domain/scenario facts are Target Inputs; verticality/integration evaluation is owned here.

## Provenance

Preserves pre-Lens Useful Result, obligation completeness, owner/delegation, runtime/call-path and Part Plan semantics.
