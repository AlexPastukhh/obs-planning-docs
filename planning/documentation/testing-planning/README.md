# Testing Planning

Status: historical compatibility / provenance area; **not** active methodology authority

Purpose: preserve legacy project-local proof-planning workflows/templates and provenance after their useful reusable semantics were absorbed by the active Core Test-Proof / Testing Knowledge contracts. Generic proof evaluation is owned by the [Core Test-Proof Lens](../idtspe-methodology/active/idtspe-core/lenses/reusable/LENS-TEST-PROOF-EVIDENCE.md#lens-test-proof-evidence); literal test realization belongs to the applicable realization owner — under SDS, [Code Realization](../idtspe-methodology/active/profiles/sds/target-modules/TM-CODE-REALIZATION.md#tm-code-realization), otherwise a narrower active-profile owner when defined or Core [Exact Realization](../idtspe-methodology/active/idtspe-core/target-modules/TM-EXACT-REALIZATION.md#tm-exact-realization) as fallback; [Practical Test](../idtspe-methodology/active/profiles/sds/target-modules/TM-PRACTICAL-TEST.md#tm-practical-test) is used only when evidence requires the real implemented subject/environment.

## Current Route

Do not bootstrap or route current methodology work through this folder. Use:

1. [Core Test-Proof Lens](../idtspe-methodology/active/idtspe-core/lenses/reusable/LENS-TEST-PROOF-EVIDENCE.md#lens-test-proof-evidence).
2. [Testing Knowledge Basis](../idtspe-methodology/active/idtspe-core/knowledge-bases/testing/README.md#knowledge-testing-basis).
3. Applicable Exact Realization / Practical Evidence owner for literal realization or real-subject Evidence.

The files below remain compatibility/provenance material only. They do not own current Testing Strategy, Test Design, Coverage, Testing Plan or methodology-integrity semantics.

Historical project-local Testing Strategy/Test Design material may still be useful as provenance or examples, but current routing is natural-owner proof need → Core Test-Proof Lens → transient owner-local proof planning when non-trivial → applicable literal/test realization owner; under SDS that is `TM-CODE-REALIZATION`, while Core `TM-EXACT-REALIZATION` remains the generic fallback. Practical Test is a separate real-subject Evidence capability. Test layers are techniques/responsibility zones, not semantic owners.

## Supporting Guidance

- [API / integration guidance](api-integration-test-guidance.md) — public API/integration proof, read vs command behavior, persistence/no-mutation.
- [E2E guidance](e2e-testing-guidance.md) — critical cross-layer actor-path proof.
- [Test Object patterns](test-object-patterns.md) — Page/Component Object boundaries without hiding Scenario outcomes.

## Historical Testing Plan / Practical Acceptance

[`templates/TESTING-PLAN-TEMPLATE.md`](templates/TESTING-PLAN-TEMPLATE.md) and [`UC-PLAN-TEST-PLAN`](practical-testing-plan-workflow.md) are retained only as historical compatibility/provenance material. They do not own a current methodology result. For current practical operated proof, use the active Test-Proof / Practical Evidence route above.
