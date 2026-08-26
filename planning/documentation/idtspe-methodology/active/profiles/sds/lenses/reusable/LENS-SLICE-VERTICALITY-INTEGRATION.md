# LENS-SLICE-VERTICALITY-INTEGRATION — Slice Verticality / Result / Integration

Lens ID: `LENS-SLICE-VERTICALITY-INTEGRATION`  
Activation: `TARGET_PROFILE_REUSABLE`

## Purpose

Keep a Slice as one bounded useful/checkable vertical result and preserve upstream semantics while planning integrated realization.

## Applicability Gate

Primary for Slice Strategy/Implementation Slice; supporting for Frontend/Cross-Cutting integration.

## Target Inputs / Evidence

Primary Scenario, Scenario DATA, Behavior Items, must-hold conditions, Screen when UI, Domain meaning and current implementation/workspace.

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

## Runtime Path vs Integrated Implementation Plan

```text
Runtime Path
= descriptive running-system path

Integrated Implementation Plan
= pre-implementation codebase call-level picture:
  concrete existing/planned owners + significant calls + order + responsibility
```

The full call-level template belongs in `TM-IMPLEMENTATION-SLICE`; this Lens checks integrity between views.

## Part-Plan Escalation

Mostly understood local call/responsibility → lightweight Part Plan. Material unresolved algorithm/state/integration/architecture choice space → child IDTSPE Target.

## Findings / Outputs

verticality correction, initial/extending role, obligation gaps, implemented/delegated/later/outside map, runtime-vs-call-path inconsistency, Part Plan/child-target recommendation and Q/R/P.

## Typical Consumers

Slice Strategy, Implementation Slice, Frontend Slice, Cross-Cutting integration.

## Artifact / File Implications

`NONE_DIRECT / RETURN_TO_TARGET_OWNER`, except that future-evolution findings are handed to L5/WEUC when that perspective is active.

The selected Useful Vertical Result, Runtime Path, Integrated Plan and lightweight Part Plan are represented through `TM-IMPLEMENTATION-SLICE / AP-SLICE-01..02`. This Lens evaluates verticality/integration but does not duplicate Slice-result persistence. A material future Slice path is represented only through `LENS-WORKSPACE-EVOLUTION-ARCHITECTURE / AG-L5-02` after Documentation / Representation decides whether an Evolution section or `<slice-owner>.evolution.md` companion is justified.

## Guards

Slice cannot redefine Scenario/DATA/Domain/Screen truth for convenience.

## Composition

L4 dependencies/change surface; L5 WEUC/architecture; L6 proof/operation; UI pack frontend realization.

## Escalation / Revalidation

Implementation Evidence that challenges upstream meaning reopens the upstream owner.

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
Integrated call-level implementation path
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
- Part plans and implementation details do not become separate Targets unless they gain independent planning value.

**Referenced Knowledge Owners:**

- `NONE`

**Reference Load Policy:**

No external knowledge body is required for normal use.

**Operationalization Notes:**

Current code/domain/scenario facts are Target Inputs; verticality/integration evaluation is owned here.

## Provenance

Preserves pre-Lens Useful Result, obligation completeness, owner/delegation, runtime/call-path and Part Plan semantics.
