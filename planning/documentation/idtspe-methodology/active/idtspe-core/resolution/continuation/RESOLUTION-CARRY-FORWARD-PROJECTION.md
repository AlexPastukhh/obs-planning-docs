# Resolution Carry-Forward Projection Contract

Status: active Core projection/navigation contract

<a id="resolution-carry-forward"></a>
## Purpose

Responsibility ID: `RESOLUTION.CARRY-FORWARD`

Provide one discoverable continuation/handoff projection for material resolution state that must not be forgotten after local Proposal/Decision/Unit work.

`Resolution Carry-Forward` is a **projection / aggregate navigation owner**, not the semantic owner of underlying Proposal, Decision, Question, Risk, Problem, Evidence or Result meaning.

> Semantic Owner Dependencies
> - `REPRESENTS` [`Proposal / Decision Lifecycle`](../proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md#resolution-proposal-decision-lifecycle) — `RESOLUTION.PROPOSAL-DECISION-LIFECYCLE`
> - `REPRESENTS` [`Q/R/P Lifecycle`](../qrp/QRP-LIFECYCLE-AND-REVIEW.md#resolution-qrp-lifecycle) — `RESOLUTION.QRP-LIFECYCLE`
> - `REPRESENTS` [`Decision Revalidation Projection`](../proposal-decision/DECISION-REVALIDATION.resolution-projection.md#resolution-decision-revalidation-projection) — `RESOLUTION.DECISION-REVALIDATION-PROJECTION`

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
material accepted Decision reference when it anchors surviving unresolved/residual/reconsiderable state or handoff orientation
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

### Durable Coordination Materialization Threshold

A discoverable durable Carry-Forward representation is **REQUIRED** for a coordination scope when all of the following are true:

```text
the Work Context is expected to survive the immediate conversation/session
AND
multiple material qualifying items must survive for continuation/handoff/re-entry
AND
those items are not already discoverable together through one existing canonical coordination representation
```

This is especially expected when surviving state spans several natural owners or combines OPEN/DEFERRED Proposal, accepted Decision anchors, residual QRPE, deferred Problems/Risks, Evidence Needs or reconsider triggers.

The requirement is for **one discoverable coordination representation**, not for a second semantic owner. Prefer an existing canonical coordination artifact/register when it already provides the right scope; otherwise materialize a dedicated Carry-Forward artifact for that scope. Do not create several hand-maintained registers for the same surviving state.

A single local item that is already obvious at its natural owner, or transient state that will not survive the current context, does not cross this threshold.

## Readiness / Handoff Use

Carry-Forward improves discoverability; it is not automatically a work queue, priority owner or readiness authority. Consumers still interpret blocking/materiality through the owning lifecycle/Target contracts.

## Representation / Persistence

Physical representation is chosen by [`planning/documentation/idtspe-methodology/active/idtspe-core/representation/ARTIFACT-PLACEMENT-AND-IDTSPE-RESPONSE-CONTRACT.md`](../../representation/ARTIFACT-PLACEMENT-AND-IDTSPE-RESPONSE-CONTRACT.md). Valid outcomes include inline checkpoint subsection, existing coordination artifact/register, generated projection or no separate persistence when continuation value is transient.

When the **Durable Coordination Materialization Threshold** is crossed, `no separate persistence` is no longer valid: P-14 must select one durable discoverable artifact/register/view whose location is stable enough for re-entry. If no suitable existing coordination artifact exists, use a dedicated artifact (default descriptive name `RESOLUTION-CARRY-FORWARD.md`, or a profile/workspace equivalent that preserves the same semantic role).

## Guards

```text
Carry-Forward ≠ semantic owner
Carry-Forward ≠ Proposal/Decision/Q/R/P/Evidence lifecycle
Carry-Forward ≠ mandatory global backlog
durable multi-item coordination scope ≠ optional undiscoverable prose
one coordination scope ≠ several competing hand-maintained aggregates
closed trivial state ≠ permanent history entry
```
