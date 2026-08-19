# Application Realization Workflow

Status: active reusable workflow
Scope: optional high-level realization/stress review between grounded application semantics/Domain and detailed Slice planning.

Generic Architecture Lens: [`../architecture-planning/README.md`](../architecture-planning/README.md)
Runtime path workflow: [`../architecture-planning/architecture-path-analysis-workflow.md`](../architecture-planning/architecture-path-analysis-workflow.md)

## 1. Purpose

`UC-PLAN-REALIZATION` answers:

> Can representative current Scenarios and selected/candidate Domain meaning be realized reasonably under current technical Requirements before detailed Slice planning?

It is optional and proportional. It is not detailed file/task/Slice decomposition.

## 2. Inputs

```text
representative current Scenarios
selected/candidate Domain Variant when present
confirmed technical/operational Requirements
relevant Architecture Decisions
existing implementation/persistence/integration evidence when available
```

## 3. Trace Representative Runtime Realization Paths

For material Scenarios inspect proportionally:

```text
Domain interactions
state reads/writes
invariant enforcement
persistence shape
transaction / atomicity assumptions
concurrency
integration boundaries / remote calls
failure/retry boundaries
important algorithms / data volume
verification seams
```

## 4. Realization Sanity Checks

Ask:

```text
Can representative current Scenarios be realized reasonably?
Can required invariants be enforced at the required consistency level?
Does persistence require pathological mapping/coordination?
Does ordinary behavior require loading unrelated huge graphs?
Does the design force unacceptable distributed transactions?
Does expected data volume make an obvious algorithm unreasonable?
Does it violate a hard technical Requirement?
Can important rules be verified without breaking semantic ownership?
```

Threshold:

```text
slightly more code
≠ reason to reject semantically correct Domain meaning

required invariant cannot reasonably be enforced
without unacceptable distributed coordination
→ material reason to review Domain Variant / upstream meaning
```

## 5. Persistence Boundary

Persistence is stress evidence, not Domain authority. Compare Domain identity/lifecycle/relationships/invariant boundaries with persistence identity/representation/query/transaction needs without allowing ORM convenience to dictate Domain truth.

## 6. Authority / Feedback

```text
Scenario / DATA / Behavior / Requirements
→ Domain semantics
→ realization
```

Implementation convenience does not outrank Domain correctness. A real technical/correctness/performance/consistency impossibility is valid upstream evidence and must be returned as an explicit finding.

## 7. Exit Result

```text
High-Level Realization picture
representative Runtime Realization Paths
material feasibility / persistence / transaction / algorithm / integration findings
verification seams
upstream review findings when required
```

Detailed Slice Strategy/Slice planning remains downstream.
