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

## 6.1 Architecture Cost Handoff — When Material

Application Realization owns concrete runtime feasibility/cost evidence for selected/candidate Scenario/Domain meaning. When architecture choices are affected, hand off only that evidence to Architecture Planning:

```text
Scenario / Runtime Path
→ latency / waiting / throughput / remote hops
→ consistency / transaction / failure / retry effects
→ resource / operational / user-effort effects
→ Architecture Work-Cost trade-off input
```

Architecture Planning may trade runtime payoff against Workspace understanding/change/verification cost, but it does not redefine Scenario priority or behavior.

## 7. Exit Result

```text
High-Level Realization picture
representative Runtime Realization Paths
material feasibility / persistence / transaction / algorithm / integration findings
verification seams
upstream review findings when required
```

Detailed Slice Strategy/Slice planning remains downstream.

## Actor / Verification Effects

For representative Runtime Realization Paths, record user-visible latency/wait/retry/confirmation/eventual-consistency effects that materially increase Scenario actor effort. Also identify verification seams and hand off material proof-design questions to sibling Testing Planning; realization does not make tests semantic authority.

## Candidate-Domain Comparative Mode

The workflow has two proportional modes:

1. **selected/current meaning stress check** before Slice planning;
2. **candidate-Domain comparison** before final Domain selection when realization evidence is genuinely decision-relevant.

For candidate comparison, trace only representative paths/dependencies deeply enough to discriminate material feasibility/cost/performance/consistency differences. Do not fully design every Slice Variant. Return evidence upstream to `UC-PLAN-DOMAIN`; do not silently select Domain meaning here.
