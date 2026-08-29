# Recommended IDTSPE Instance Decomposition

Status: active working decision

## Core Rule

Do not equate:

```text
high-level SDS Phase
=
one IDTSPE instance
```

Prefer:

```text
one independently selectable/revalidatable Target
=
one IDTSPE instance
```

This gives narrower Sources, Decisions, residual Q/R/P and re-open boundaries.

## Phase Mapping

| Phase | Recommended instance structure |
|---|---|
| 00 Invocation | orchestration only; chooses next instance |
| 01 Need/Reality | one Need/Reality target when not already trusted |
| 02 Solution Space | zero/one/many dynamically formed real-life route/scope Targets; composition Target only when composition itself is material |
| 03 Application Definition | one `TM-APPLICATION-DEFINITION` Target; Prototype is optional evidence Target |
| 04 Scenario System | one Scenario Discovery target + one target per detailed Scenario; Screen target only when material |
| 05 Domain | Domain Discovery plus zero/one/many Domain Draft Targets; each material Domain owner may hand off immediately to its own `TM-TEST-DESIGN` before Slice planning |
| 06 Delivery Shaping | Slice Strategy is a separate Target only when decomposition/order itself matters; its selected Slice portfolio becomes a Source for shared Test Strategy when material |
| 07 Workspace Evolution / Architecture | `TM-WEUC` creates/refreshes the global Workspace Evolution Map and Current Global Architecture Position; L5 checks concrete Targets or the whole Workspace architecture; local architecture stays an Answer Decision unless independently substantial work yields a Target Formation candidate and Target Formation selects a bounded local Target |
| 08 Slice | one Target per vertical Slice; each Slice has its own `TM-TEST-DESIGN` after semantic obligations stabilize, or interleaved through TDD; independently material Frontend/Cross-Cutting work may yield a Target Formation candidate, and Target Formation decides reuse/handoff/new bounded Target |
| 09 Consistency/Verification | navigation family only: Domain Test Design may already have run before Slice Strategy; conditional Test Strategy normally follows Domain proof planning + Slice portfolio; per-Slice Test Design follows/interleaves each Slice |
| 10 Realization | execution, not planning instance by default |
| 11 Reconciliation | lifecycle; Core Finding Disposition selects revalidation/reopen only for the narrowest challenged target instance when warranted |

## Why

```text
narrow Target
→ narrower Source set
→ clearer three Decision levels
→ clearer residual Q/R/P ownership/attachment
→ cheaper selective revalidation
→ less accidental re-planning
```

## Counter-rule

Do not over-fragment.

If two choices:

```text
always require the same Sources
always change/revalidate together
have no independent useful output
```

they may belong to one IDTSPE target rather than artificial micro-instances.


## High-Level Example — Phase 02 Can Be Several Instances

```text
Need:
  complete an on-site service request

Phase 02 Targets:
  T-INTAKE
  T-APPOINTMENT
  T-VISIT
  T-ACCEPTANCE
```

Each has an independently useful real-life result, so each may be its own IDTSPE instance.

If the accepted results combine mechanically:

```text
no composition Target
```

If two materially different whole-solution combinations remain:

```text
surface a composition Target Formation candidate
→ Target Formation decides whether a dynamic composition Target is actually needed
```


## Directed Workflow Rule

This file defines **instance boundaries**, not chronological phase order.

Canonical sequencing/readiness is owned by:

```text
shared/directed-methodology-workflow-and-next-step-resolution.md
```

In particular:

```text
Domain Draft per owner
→ Domain Test Design per owner when material
→ Slice Strategy / Slice portfolio
→ Test Strategy when shared coordination is material
→ Implementation Slice ↔ Slice Test Design
```

Each IDTSPE invocation also reports its likely next methodology step and may recommend repeating the current Target when its Exit Gate is not yet satisfied.
