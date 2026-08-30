# SDS Profile Command Surface Extension

Status: active SDS command/routing contract

## Purpose

Define the user-facing SDS invocation surface layered on generic IDTSPE Core.
Commands route to Target/Lens owners; command identity never becomes semantic
authority and never creates a new Target type merely because it has a shortcut.
Generic IDTSPE Core surfaces are owned separately by the Core command-surface contract; this file only extends that surface with SDS-specific routing.

## Core + SDS Composition

Canonical methodology surface inventory:

```text
3 framework/bootstrap/work surfaces
2 generic Core Target Module surfaces
12 canonical SDS Target Module surfaces
10 focused Target-Module shortcuts
5 specialized direct Lens shortcuts
5 orchestration/validator surfaces
= 37 methodology invocation surfaces
```

This is a methodology-semantic count, not a requirement for exactly 37 repository
command files. Several phrases/aliases may route to one surface.

## Runtime Invariant

```text
user command
→ resolve semantic surface
→ normal Target Formation / Target invocation / Lens applicability
→ IDTSPE Core owns actual State/Resolution/lifecycle
```

Invocation mode (`CREATE / REFINE / EXTEND / REVALIDATE / REPAIR`) is a separate
dimension, not a new command family.

## Canonical SDS Target Module Surfaces — 12

| Module | Surface key | Example intent |
|---|---|---|
| `TM-APPLICATION-DEFINITION` | `tmcmd.application.definition` | define/review the own Application contribution |
| `TM-PROTOTYPE` | `tmcmd.prototype` | plan a bounded prototype experiment |
| `TM-SCENARIO-PLANNING` | `tmcmd.scenario.plan` | plan/review one Scenario |
| `TM-REQUIREMENT` | `tmcmd.requirement` | form/review an exceptional shared must-hold owner |
| `TM-SCREEN` | `tmcmd.screen` | plan/review spatial Screen meaning |
| `TM-DOMAIN-DISCOVERY` | `tmcmd.domain.model` | model/review a Domain/Aggregate problem |
| `TM-SLICE-STRATEGY` | `tmcmd.slice.strategy` | derive/review Slice portfolio + Slice→Domain map |
| `TM-IMPLEMENTATION-SLICE` | `tmcmd.slice.plan` | plan/review one vertical Slice |
| `TM-CROSS-CUTTING-CONCERN` | `tmcmd.crosscut` | plan/review one shared non-vertical concern |
| `TM-TEST-STRATEGY` | `tmcmd.test.strategy` | plan shared proof policy when justified |
| `TM-TEST-DESIGN` | `tmcmd.test.design` | design non-trivial proof for one owner/property |
| `TM-PRACTICAL-TEST` | `tmcmd.test.practical` | plan/run practical Evidence inquiry |

Retired Target families are not canonical surfaces:

```text
TM-DOMAIN-DRAFT
TM-WEUC
TM-FRONTEND-SLICE
```

Compatibility aliases may still accept old user phrases, but they must route to
current semantics:

```text
old Domain Draft intent → unified Domain / Aggregate Modeling
old WEUC evaluation phrase → L5 Evolution / Change Isolation or normal Target Formation
old frontend planning phrase → current Slice / Local Target Formation as appropriate
```

## Focused Target-Module Shortcuts — 10

A focused shortcut is justified only when it represents a stable user intent with
a useful narrower entry/exit gate while remaining the same Target family.

Suggested canonical focused surfaces:

| Surface | Route |
|---|---|
| `tmcmd.application.concept` | `TM-APPLICATION-DEFINITION` concept/contribution focus |
| `tmcmd.application.references` | `TM-APPLICATION-DEFINITION` existing-solution/reference focus |
| `tmcmd.prototype.feasibility` | `TM-PROTOTYPE` feasibility inquiry |
| `tmcmd.scenario.boundary` | `TM-SCENARIO-PLANNING` boundary focus |
| `tmcmd.scenario.change` | `TM-SCENARIO-PLANNING / RU-SCEN-03` future/change focus |
| `tmcmd.screen.map` | `TM-SCREEN / RU-SCREEN-01` |
| `tmcmd.screen.detail` | `TM-SCREEN / RU-SCREEN-02` |
| `tmcmd.domain.owner` | unified `TM-DOMAIN-DISCOVERY / Domain-Aggregate Modeling` bounded deep focus |
| `tmcmd.slice.evolution` | `TM-IMPLEMENTATION-SLICE / RU-SLICE-04` |
| `tmcmd.test.design.property` | `TM-TEST-DESIGN` focused proof-property design |

The useful historical “plan Domain owner” intent is preserved through the unified
Domain Modeling module rather than by keeping `TM-DOMAIN-DRAFT` alive.

## Generic Lens Operations

Generic Core operations remain available:

```text
подбери линзы
примени линзу <lens> к <target>
```

## Specialized Direct Lens Shortcuts — 5

| Lens | Surface | Example intent |
|---|---|---|
| L5 Evolution / Change Isolation | `lenscmd.weuc.check` compatibility alias | check planned evolution/change isolation |
| Simplicity / Implementation Economy | `lenscmd.simplicity.check` | simplify current implementation plan |
| Documentation / Representation | `lenscmd.documentation.check` | check owner/file representation |
| Linked Notes Usage / Justification | `lenscmd.linked-notes.justify` | check linked-notes use |
| Test Proof / Evidence | `lenscmd.test.coverage` | review actual proof/evidence coverage |

`lenscmd.weuc.check` may remain as a compatibility key, but its semantic Lens is
Evolution / Change Isolation and it does not imply a WEUC Target or global map.

## Conditional Module Gates

### Requirement

Use standalone `TM-REQUIREMENT` only when a must-hold condition is genuinely
shared and no natural Scenario/Domain/Screen/Cross-Cutting/application owner is
better.

### Cross-Cutting

Use `TM-CROSS-CUTTING-CONCERN` only when one shared non-vertical guarantee/mechanism
has independent multi-consumer value. Repeated code is insufficient.

### Test Strategy

Use `TM-TEST-STRATEGY` only when cross-owner proof coordination itself is
independently useful.

### Frontend-specific work

There is no installed Frontend Target family. Keep ordinary frontend reasoning in
the Slice and UI Lens; independently substantial unresolved work goes through
normal Target Formation / Local Target Contract.

## Orchestration / Validator Surfaces — 5

```text
idtspe.next
idtspe.continue
idtspe.review_consistency
sds.bootstrap
sds.validate.current
```

They orchestrate/select/check methodology state; they do not own product semantics.

## Next-Step Semantics

SDS commands use the canonical directed workflow:
[`directed-methodology-workflow-and-next-step-resolution.md`](directed-methodology-workflow-and-next-step-resolution.md).

The workflow is not inferred from old numeric phases.

## Repository Compatibility

Repository commands/helpers may temporarily preserve legacy phrases/keys during
migration. Compatibility must not:

- recreate retired Target semantics;
- count an alias as a new canonical methodology surface;
- bypass Target Formation/Generic authority;
- silently mutate upstream owners.
