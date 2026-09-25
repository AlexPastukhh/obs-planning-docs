# Testing Planning

Status: active project-local/supporting proof-planning family; **not** SDS Target-family authority

Purpose: provide project-local proof coordination/design guidance without transferring semantic authority from Feature, Scenario, Domain, Slice, Shared or other natural owners. Generic methodology proof evaluation is owned by the [Core Test-Proof Lens](../idtspe-methodology/active/idtspe-core/lenses/reusable/LENS-TEST-PROOF-EVIDENCE.md#lens-test-proof-evidence); literal test realization belongs to the applicable realization owner — under SDS, [Code Realization](../idtspe-methodology/active/profiles/sds/target-modules/TM-CODE-REALIZATION.md#tm-code-realization), otherwise a narrower active-profile owner when defined or Core [Exact Realization](../idtspe-methodology/active/idtspe-core/target-modules/TM-EXACT-REALIZATION.md#tm-exact-realization) as fallback; [Practical Test](../idtspe-methodology/active/profiles/sds/target-modules/TM-PRACTICAL-TEST.md#tm-practical-test) is used only when evidence requires the real implemented subject/environment.

## Read Order

1. [Use-Case Registry](use-case-registry.md).
2. [Testing Principles And Terminology](testing-planning-principles-and-terminology.md).
3. [Responsibility Map](testing-planning-responsibility-map.md), then the applicable workflow/template linked there.

This supporting area may retain project-local Testing Strategy/Test Design coordination capabilities where independently useful. They are **not** baseline IDTSPE/SDS Targets. Current generic routing is natural-owner proof need → Core Test-Proof Lens → transient owner-local proof planning when non-trivial → applicable literal/test realization owner; under SDS that is `TM-CODE-REALIZATION`, while Core `TM-EXACT-REALIZATION` remains the generic fallback. Practical Test is a separate real-subject Evidence capability. Test layers are techniques/responsibility zones, not semantic owners.

## Supporting Guidance

- [API / integration guidance](api-integration-test-guidance.md) — public API/integration proof, read vs command behavior, persistence/no-mutation.
- [E2E guidance](e2e-testing-guidance.md) — critical cross-layer actor-path proof.
- [Test Object patterns](test-object-patterns.md) — Page/Component Object boundaries without hiding Scenario outcomes.

## Testing Plan / Practical Acceptance

Use [`templates/TESTING-PLAN-TEMPLATE.md`](templates/TESTING-PLAN-TEMPLATE.md) as the lightweight project-local baseline. [`UC-PLAN-TEST-PLAN`](practical-testing-plan-workflow.md) owns the independently useful practical operated-plan result; it composes current Strategy/Design meaning and hands executed evidence to Coverage rather than replacing those UCs. Practical Acceptance is a planned operated proof route for properties/negative guarantees that are most credibly verified by human/AI/E2E operation.
