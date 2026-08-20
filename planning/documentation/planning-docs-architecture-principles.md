# Planning Docs Architecture Principles

Status: active reusable architecture principles
Scope: stable reusable boundaries for repository planning/documentation systems.

## Layer Boundary

```text
planning/documentation/
  = reusable methodology;

repository/root navigation
  = project orientation;

Direction Registries
  = broad semantic work areas;

Use-Case Registries
  = independently useful supported capabilities and owner routes;

Scenario owners
  = detailed application behavior;

command-routing + command definitions
  = optional executable shortcuts;

project/application owners
  = concrete current state/behavior/implementation.
```

## Repository Discoverability Invariant

A new reader/AI knowing only the repository root must be able to discover:

1. repository purpose;
2. major work Directions;
3. a matching Use Case for a concrete intent;
4. why/when it is used and what result it produces;
5. canonical owner(s) and required reusable principles;
6. supporting implementation/tests/examples when relevant;
7. historical/optional/deferred/retired boundaries.

No required owner may depend solely on a command, helper UI, prior conversation or knowing a filename in advance.

## Source-Of-Truth Rules

- one complete semantic owner per responsibility;
- Use-Case Registry owns semantic Use-Case identity/trigger/result/boundaries/owner route;
- Direction Registry owns broad semantic grouping/topology;
- Scenario owns detailed application behavior;
- workflow owns repeated process;
- principles/terminology own reusable concept contracts;
- template owns recommended shape;
- profile owns optional deeper specialization;
- example demonstrates only;
- command definition owns executable trigger/output/read/permission route;
- generated/tool projections are not authority.

## Capability Coverage, Not File Coverage

```text
every independently useful supported capability
→ current Use Case

every active canonical owner
→ reachable from a current Use Case
  or explicit supporting-owner route

every file
≠ separate Use Case
```

## Planning Boundary

Planning Item, Planning Draft and Full Picture Matrix are not required target ontology/stages. Historical records may remain provenance.

Application planning uses:

```text
Need / desired result
→ solution/workflow selection
→ Application responsibility when justified
→ Scenario discovery
→ Scenario Drafts
→ DATA / Behavior Items
→ Domain / Slice when useful
```


## Bootstrap Vs Runtime

Bootstrap/setup guidance exists to establish current repository owners. Once README/index navigation, registries, command routing and task-specific owners exist, runtime work follows those current owners directly. Do not preserve a separate bootstrap-only routing layer after the real owners exist.

## No Silent Promotion

```text
raw source ≠ decision
Idea ≠ accepted current meaning
implementation idea ≠ architecture
risk ≠ evidence of failure
example ≠ authority
projection/view ≠ canonical state
profile ≠ mandatory route
historical record ≠ current ontology
```

## Progressive Complexity

Use the smallest owner/representation that preserves required meaning. Create new files, schemas, objects, maps or stages only when independent responsibility/review/reuse/navigation/change ownership justifies them.


## Direction / Parallel-Scope Relationship

Direction and parallel-work scope answer different questions:

```text
Direction
→ what broad semantic work / family of Use Cases exists?

registered scope
→ what fixed repository root can be independently coordinated and logged?
```

Scope architecture should normally be informed by Directions and Use-Case families, because an independently coordinated scope is easiest to understand when it follows a coherent broad work responsibility. This is an affinity, not a required 1:1 mapping: do not split or merge physical scopes merely to mirror the Direction Registry mechanically.

Use Cases in different Directions may have explicit dependencies, integrations or handoffs. Such relationships keep their semantic owners in their own Directions. When a concrete work item crosses registered physical roots, use the cross-scope logging/package rules rather than merging semantic ownership.

## Fixed Parallel-Work Scope / Log Invariant

```text
project root Scope Registry
→ canonical fixed parallel-work boundaries
→ one action-log.md at each registered scope root
```

Normal chats select existing registered scopes; they do not repartition the repository ad hoc. For nested registered roots, a path belongs to the deepest active registered root containing it.

Scope logs own material high-level work history/rationale for their scope and participate in coherent replacement-package target state. There is no implicit repository-wide aggregate action log. Cross-scope work has one full canonical log record plus reference-only entries in other affected logs.

Logging begins only after explicit user instruction and does not reconstruct earlier history automatically.
