# Testing Planning

Status: active reusable planning family

Purpose: plan and review how selected behavior/correctness is proved without transferring semantic authority from Scenario, Requirement, Domain or Slice owners.

## Read Order

```text
direction-registry.md
→ use-case-registry.md
→ testing-planning-principles-and-terminology.md
→ testing-planning-responsibility-map.md
→ selected workflow/template
```

Four independently useful capabilities are supported: shared Testing Strategy, behavior-specific Test Design, Practical Testing / Acceptance Plan, and Current Test Coverage/Evidence Review. Test layers are techniques/responsibility zones inside these capabilities, not separate Use Cases.

## Supporting Guidance

- `api-integration-test-guidance.md` — public API/integration proof, read vs command behavior, persistence/no-mutation.
- `e2e-testing-guidance.md` — critical cross-layer actor-path proof.
- `test-object-patterns.md` — Page/Component Object boundaries without hiding Scenario outcomes.

## Testing Plan / Practical Acceptance

Use [`templates/TESTING-PLAN-TEMPLATE.md`](templates/TESTING-PLAN-TEMPLATE.md) as the lightweight project-local baseline. `UC-PLAN-TEST-PLAN` owns the independently useful practical operated-plan result; it composes current Strategy/Design meaning and hands executed evidence to Coverage rather than replacing those UCs. Practical Acceptance is a planned operated proof route for properties/negative guarantees that are most credibly verified by human/AI/E2E operation.
