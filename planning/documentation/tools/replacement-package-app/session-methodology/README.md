# Replacement Package App — Session Methodology

Status: active normative detailed AI/session procedure
Process owner: [`../documentation-use-cases/ai-session-work.md`](../documentation-use-cases/ai-session-work.md)

The Session Methodology realizes `DOC-UC-15..19`. It governs planning/proposal/finding/exact-realization workflow, not product behavior.

## Procedure map

- [`progressive-planning.md`](progressive-planning.md) — `DOC-UC-15`;
- [`proposal-and-approval.md`](proposal-and-approval.md) — `DOC-UC-16`;
- [`review-findings.md`](review-findings.md) — `DOC-UC-17`;
- [`exact-implementation-planning.md`](exact-implementation-planning.md) — `DOC-UC-18`;
- [`implementation-workflows.md`](implementation-workflows.md) — `DOC-UC-19`.

## Shared authority boundary

Working session artifacts may contain plans, alternatives, proposals, findings and literal candidate content. They are not Feature/Scenario/Domain/Slice/Shared semantic authority merely because they exist or are persisted.

Selected durable meaning is promoted only through proposal/approval into its natural owner.

## Persistence boundary

Long-lived working-session persistence is outside this app-local methodology migration.

```text
chat/session state
| local temporary file
| future separate session repository
```

are possible working persistence locations.

Do not introduce an app-local `session-work/` directory as product/methodology authority. Persistence alone never promotes working content into durable semantic authority.

## Stable session identities

```text
PL-L0-BEHAVIOR-AND-OWNER
PL-L1-IMPLEMENTATION-REQUIREMENTS
PL-L2-IMPLEMENTATION-ARCHITECTURE
PL-L3-EXACT-IMPLEMENTATION-PLAN
PL-L4-LITERAL-CODE-AND-PACKAGE

SWF-CHATGPT-LOCAL-IMPLEMENT-TEST-REVIEW-THEN-PACKAGE
SWF-BUILDER-WORK-BUILD-REPLAY-REVIEW-HANDOFF-AND-CONSUMER-VERIFY

SCP-FINAL-LITERAL-CANDIDATE-APPROVED
```

These are session-methodology identities, not durable product state.
