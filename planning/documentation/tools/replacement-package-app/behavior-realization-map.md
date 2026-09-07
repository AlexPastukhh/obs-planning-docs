# Replacement Package App — Behavior Realization Map

Status: active derived current navigation

This map is not behavior authority. It points selected current behavior to its natural owner/proof after Work-centered runtime cutover.

| Behavior | Current owner | Proof responsibility |
|---|---|---|
| exact Work correlation | WorkId | WorkAggregateTests + package/action identity tests |
| exact local repository target | RepositoryTarget + GitWorkspace | Start workspace / publication identity integration tests |
| durable semantic intent / exact Issue | Work Intent | Work Intent integration/Core transport tests where exercised |
| exact workspace pinning/recovery | GitWorkspace + workspace journal | target Feature/Scenario integration |
| exact package bytes / no archive TOCTOU | Apply Feature + package journal | immutable captured archive test |
| no second unfinished package | ReplacementPackageState + per-Work lock | WorkAggregate concurrency tests |
| file Apply only | Apply Feature | target Feature integration |
| package-only exact Commit + crash recovery | Commit Feature + package journal | target Feature integration |
| exact remote confirmation / no blind retry | Publish Feature + PublicationObservation | target Feature integration |
| unexpected remote tip blocks before push | Publish Feature | target Feature integration |
| automatic route shares Feature semantics | AutomaticPackageRealization | automatic composition/idempotence tests |
| operation Result distinct from durable state | Feature Result types + Aggregate state | Domain/Feature tests |
| Repository Snapshot read-only export | Repository Snapshot | separate snapshot tests/acceptance |

## Aggregate summary

```text
RepositoryTarget
WorkId
WorkIntent
GitWorkspace
ReplacementPackageState*
```

`Core.ChangeSet` and External Interaction are not target runtime Aggregates. Legacy source/docs that still describe old Review/Finalize behavior are historical compatibility material owned by the previous deployed executable.

Future reviewed-result/PR/Finalize work must introduce the narrowest natural owners for its own invariants rather than expanding WorkId or recreating ChangeSet.
