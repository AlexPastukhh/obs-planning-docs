# Testing Planning

Status: active project-local/supporting proof-planning family; **not** SDS Target-family authority

Purpose: provide project-local proof coordination/design guidance without transferring semantic authority from Feature, Scenario, Domain, Slice, Shared or other natural owners. Generic methodology proof evaluation is owned by Core `LENS-TEST-PROOF-EVIDENCE`; literal test realization belongs to Exact/code; `TM-PRACTICAL-TEST` is used only when evidence requires the real implemented subject/environment.

## Read Order

```text
use-case-registry.md
→ testing-planning-principles-and-terminology.md
→ testing-planning-responsibility-map.md
→ selected workflow/template
```

This supporting area may retain project-local Testing Strategy/Test Design coordination capabilities where independently useful. They are **not** baseline IDTSPE/SDS Targets. Current generic routing is natural-owner proof need → Core Test-Proof Lens → transient owner-local proof planning when non-trivial → Exact literal tests; Practical Test is a separate real-subject Evidence capability. Test layers are techniques/responsibility zones, not semantic owners.

## Supporting Guidance

- `api-integration-test-guidance.md` — public API/integration proof, read vs command behavior, persistence/no-mutation.
- `e2e-testing-guidance.md` — critical cross-layer actor-path proof.
- `test-object-patterns.md` — Page/Component Object boundaries without hiding Scenario outcomes.

## Testing Plan / Practical Acceptance

Use [`templates/TESTING-PLAN-TEMPLATE.md`](templates/TESTING-PLAN-TEMPLATE.md) as the lightweight project-local baseline. `UC-PLAN-TEST-PLAN` owns the independently useful practical operated-plan result; it composes current Strategy/Design meaning and hands executed evidence to Coverage rather than replacing those UCs. Practical Acceptance is a planned operated proof route for properties/negative guarantees that are most credibly verified by human/AI/E2E operation.
