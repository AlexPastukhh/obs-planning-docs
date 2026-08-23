# Lightweight Testing Plan Template

Status: active reusable template
Scope: proportional project-local testing plan owned as a practical operated-plan result by `UC-PLAN-TEST-PLAN` and consumed alongside Testing Strategy / Design / Coverage. It is not product-behavior authority.

```markdown
# Testing Plan

## Target / Basis
- Scenario / Requirement / Domain / Slice owners:
- Review Currency / source state:

## Testing Strategy — When shared/cross-Slice meaning matters
- layer responsibilities:
- shared harness/data/isolation:
- E2E / integration boundary:

## Behavior-To-Proof Map
| Behavior / guarantee | Planned proof | Layer / operator | Key assertion/evidence | State |
|---|---|---|---|---|

States distinguish: planned proof | implemented test | executed evidence.

## Practical Acceptance — When useful
### PA-<ID> — <property / negative guarantee>
- **Target property:**
- **Operator:** human | AI | E2E/tool
- **Setup:**
- **Action:**
- **Observable evidence:**
- **Pass / fail rule:**
- **Execution state:** planned | executed-pass | executed-fail | stale

## Campaign — When repeated coverage matters
- variants / environments / representative cases:
- minimum evidence set:
- stop / pass criteria:

## Coverage Review
- proven/current:
- missing/weak/stale:
- wrong-layer/duplicated:
- next useful checks:

## Planning Concerns / Q/R/P — When Material
- Concern / Group ID:
- Priority / Concern Category / Status:
- Owner / affected meaning:
- AI Comment:
- Recommendation / Decision refs / residual state — when applicable:
- Stored At / Area Concern Register — when applicable:

```

Rules:
- do not create one test per field or one Practical Acceptance card per trivial assertion;
- use the strongest proportional proof for selected behavior;
- preserve negative guarantees explicitly;
- a planned card is not executed evidence;
- Testing Planning never redefines Scenario/Requirement/Domain/Slice meaning.
