# Session Interaction Runtime

Generic reusable guidance for USER↔AI interaction during repository work.

The Session layer is intentionally **thin**. It does not own planning semantics, methodology navigation, State ontology, Checkpoints, Targets, Lenses, or methodology-use scenarios.

## Bootstrap

When the primary bootstrap reaches this package, read:

1. this `README.md`;
2. [`principles-and-terminology.md`](principles-and-terminology.md);
3. [`session-runtime-contract.md`](session-runtime-contract.md).

After these reads, the Session interaction contract remains ambient across ordinary work. It is **not** a routing hop that every command, Use Case or methodology component must traverse. Reload it only when the interaction context is missing/stale or its steering/authorization/progress semantics cannot be reconstructed safely.

## Contents

- [`principles-and-terminology.md`](principles-and-terminology.md) — Session interaction vocabulary: work step, progress update, USER steering, AI Proposal, real gate and authorization boundary.
- [`session-runtime-contract.md`](session-runtime-contract.md) — clean-chat interaction, automatic work-step progression, progress visibility, steering and mutation/choice gates.
- [`use-case-registry.md`](use-case-registry.md) — compatibility routes from the former Session Use Cases to their current Documentation/IDTSPE owners.
- [`methodological-working-scenarios.md`](methodological-working-scenarios.md) — compatibility route to the IDTSPE Methodology Use-Case Scenario Map.

## Ownership Boundary

```text
Documentation methodology
= Use Case / Process / Principles & Terminology / Registry / Template / Example semantics
  and functional navigation for working with methodology documentation

Session
= generic USER↔AI interaction/runtime only

IDTSPE Core
= always-active proportional planning/resolution work model:
  Broad Discussion, Work Context, State Units, Targets, Target Modules, Lenses,
  Proposal/Q-R-P/Decision/Evidence/Finding/Revalidation and Integration Checkpoint

Profile methodology such as SDS
= profile-specific Target Modules, Lenses, semantic owners, knowledge and planning rules
```

A natural-language USER request is sufficient. The USER does not need to enable IDTSPE, select a scenario, choose a Target, or approve ordinary AI work-step transitions merely to begin work.
## Deferred Workspace Evolution

A richer chat-sandbox/workspace operating model is intentionally deferred. The current Session meta-files remain ambient bootstrap material and are **not** given current Session Use Cases merely because they participate in bootstrap. Future design topics—local methodology cache/mirror, repository snapshots and freshness, work-directory lifecycle, MUST-READ bootstrap files and work handoff—are tracked in [`../documentation/idtspe-methodology/active/METHODOLOGY-EVOLUTION-STEPS.md`](../documentation/idtspe-methodology/active/METHODOLOGY-EVOLUTION-STEPS.md).

