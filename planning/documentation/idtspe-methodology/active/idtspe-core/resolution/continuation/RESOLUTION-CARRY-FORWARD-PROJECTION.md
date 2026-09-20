# Resolution Carry-Forward Projection Contract

Status: active Core projection/navigation contract

## Purpose

Provide one discoverable continuation/handoff projection for material resolution state that must not be forgotten after local Proposal/Decision/Unit work.

`Resolution Carry-Forward` is a **projection / aggregate navigation owner**, not the semantic owner of underlying Proposal, Decision, Question, Risk, Problem, Evidence or Result meaning.

```text
canonical underlying item
→ keeps semantic/lifecycle authority at its natural owner

Resolution Carry-Forward
→ compact routing/status/reference entry
→ one canonical projection per useful coordination scope
```

## Qualifying State

Include proportionally when material to continuation, handoff or re-entry:

```text
OPEN / DEFERRED Proposal
retained rejected/superseded Proposal only when explicit retention has future value
open Question materially related to active resolution
open Risk / accepted or mitigated residual Risk
open/deferred Problem / accepted limitation
material Decision reconsider/revalidation trigger
material residual QRPE around accepted Decision
material Evidence Need / watch relation affecting active resolution/revalidation
```

Do not retain trivial closed state such as answered trivial Questions, eliminated Risks, resolved Problems with no independent future value, transient rejected Proposals or routine Evidence with no continuation value.

## Entry Shape

```text
ID / Ref
Kind
Subject / natural owner
Related Proposal / Decision — when useful
Current disposition/status
Blocking / non-blocking — when useful
Why carried forward / reconsider condition — when useful
Canonical location / link
```

The entry may expose related IDs/refs but does not copy the detailed semantic body.

## Lifecycle Integration

```text
Resolution Context Lens
→ discovers/checks surviving material open/deferred/residual state

Proposal / Decision / Q/R/P / Evidence lifecycle owners
→ establish actual identity/status/disposition

UC-IDTSPE-MAINTAIN-CURRENT-WORK-STATE
→ maintains distributed canonical state
→ refreshes qualifying Carry-Forward membership when materially changed

UC-IDTSPE-INTEGRATE-CURRENT-WORK
→ reconciles entries at useful checkpoint/handoff

UC-IDTSPE-COMPOSE-CURRENT-WORK
→ consumes applicable Carry-Forward on re-entry/orientation
```

Refresh membership after material lifecycle boundaries, not every conversational turn. Closed/obsolete items leave the projection; residual/reconsider items remain only while materially useful.

## Scope / Cardinality

Use the smallest useful coordination scope: Target-local, area/Application-level or current Work Context. Do not maintain competing aggregates for the same scope. A broader projection references narrower canonical items instead of copying their full bodies.

## Readiness / Handoff Use

Carry-Forward improves discoverability; it is not automatically a work queue, priority owner or readiness authority. Consumers still interpret blocking/materiality through the owning lifecycle/Target contracts.

## Representation / Persistence

Physical representation is chosen by [`planning/documentation/idtspe-methodology/active/idtspe-core/representation/ARTIFACT-PLACEMENT-AND-IDTSPE-RESPONSE-CONTRACT.md`](../../representation/ARTIFACT-PLACEMENT-AND-IDTSPE-RESPONSE-CONTRACT.md). Valid outcomes include inline checkpoint subsection, existing coordination artifact/register, generated projection or no separate persistence when continuation value is transient.

## Guards

```text
Carry-Forward ≠ semantic owner
Carry-Forward ≠ Proposal/Decision/Q/R/P/Evidence lifecycle
Carry-Forward ≠ mandatory global backlog
one coordination scope ≠ several competing hand-maintained aggregates
closed trivial state ≠ permanent history entry
```
