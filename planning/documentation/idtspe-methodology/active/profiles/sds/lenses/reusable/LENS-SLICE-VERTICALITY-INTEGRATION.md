# LENS-SLICE-VERTICALITY-INTEGRATION — Slice Verticality / Result / Integration

Lens ID: `LENS-SLICE-VERTICALITY-INTEGRATION`  
Activation: `TARGET_PROFILE_REUSABLE`

## Purpose

Keep a Slice as one bounded useful/checkable vertical result and preserve upstream semantics while planning integrated realization.

## Applicability Gate

Primary for Slice Strategy/Implementation Slice; supporting for Frontend/Cross-Cutting integration.

## Typical Sources / Evidence

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

### Structured Artifact / File Guidance

These records describe conditional placement guidance produced by this Lens. They never create semantic ownership by themselves.

```text
ARTIFACT_GUIDANCE
ID: AG-SLICE-01
CONTENT_KIND: CURRENT_SLICE_PLAN
WHEN: Slice result/runtime/integrated plan is selected
GUIDANCE: PROFILE_DEFAULT
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: Implementation Slice Target
REPRESENTATION: EMBED_CURRENT_OWNER
FILE_OR_ARTIFACT: <slice-owner>
CONTENT: Useful Vertical Result; obligations; Runtime Path; Integrated Plan
GUIDANCE_SOURCE: LENS
RESOLVER: P-14 / TF-10
```

```text
ARTIFACT_GUIDANCE
ID: AG-SLICE-02
CONTENT_KIND: LIGHTWEIGHT_PART_PLAN
WHEN: one selected local call/responsibility needs detail
GUIDANCE: PROFILE_DEFAULT
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: parent Slice Target
REPRESENTATION: EMBED_CURRENT_OWNER
FILE_OR_ARTIFACT: <slice-owner>
CONTENT: Part Plan section/child unless independent Target is needed
GUIDANCE_SOURCE: LENS
RESOLVER: P-14 / TF-10
```

```text
ARTIFACT_GUIDANCE
ID: AG-SLICE-03
CONTENT_KIND: SLICE_EVOLUTION
WHEN: material future path applies to Slice/implementation area
GUIDANCE: ADVISORY_PREFERRED
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: base Slice owner remains current truth
REPRESENTATION: COMPANION_ARTIFACT
FILE_OR_ARTIFACT: <slice-owner>.evolution.md
CONTENT: future extension/change path; prepared seams; tests; triggers
GUIDANCE_SOURCE: LENS
RESOLVER: P-14 / TF-10
```


Shell placement semantics: [`artifact-placement-and-idtspe-response-contract.md`](../../../../idtspe-core/shared/artifact-placement-and-idtspe-response-contract.md).

Selected current Slice result/Runtime/Integrated Plan belongs in the canonical Slice owner.

Lightweight Part Plans **embed by default**.

**PREFERRED `<slice-owner>.evolution.md` companion** for material planned/probable future change paths.

Promoted child/Frontend Targets receive their own canonical owners only after Target Formation selects them.

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

## Provenance

Preserves pre-Lens Useful Result, obligation completeness, owner/delegation, runtime/call-path and Part Plan semantics.
