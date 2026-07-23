# OBS Root Direction Registry

Status: active project-specific root semantic Direction Registry
Doc version: v0.1.0-initial-direction-hierarchy
Scope: OBS root orientation across broad semantic work Directions and references to complete reusable-family/project-local registries.

## 1. Authority

```text
This file:
  → owns root Direction orientation and root-owned Direction entries;
  → references complete local/reusable-family Direction entries;
  → links local Use-Case Registries;

planning/planning-use-case-map.md:
  → owns executable commands, aliases, English names, outputs and permissions;

local/reusable registries:
  → own complete Direction and Use-Case entries;

workflow/area owners:
  → own complete behavior and concrete state;

Tampermonkey:
  → projection only.
```

## 2. Registry Index

| Direction ID | Semantic name | Status | Complete owner | Use-Case Registry |
|---|---|---|---|---|
| `DIR-PLAN-SOLUTION` | Plan A Solution Or Workflow | active | [`planning/documentation/application-planning/direction-registry.md`](documentation/application-planning/direction-registry.md) | [`planning/documentation/application-planning/use-case-registry.md`](documentation/application-planning/use-case-registry.md) |
| `DIR-DETAILED-SDS` | Perform Detailed Scenario/Domain/Slice Planning | active / profile-limited | [`planning/documentation/application-planning/direction-registry.md`](documentation/application-planning/direction-registry.md) | [`planning/documentation/application-planning/use-case-registry.md`](documentation/application-planning/use-case-registry.md) |
| `DIR-MAINTAIN-DOCS-ROUTES` | Maintain Documentation, Use Cases And Commands | active | this file | local registries, root UCM and reusable documentation owners |
| `DIR-DOCUMENTATION-WORKBENCH` | Develop And Maintain Documentation Workbench | active project-local | [`planning/areas/documentation-workbench/direction-registry.md`](areas/documentation-workbench/direction-registry.md) | [`planning/areas/documentation-workbench/use-case-registry.md`](areas/documentation-workbench/use-case-registry.md) |

## 3. Referenced Direction — Plan A Solution Or Workflow

Complete owner:

```text
planning/documentation/application-planning/direction-registry.md
```

Root orientation:

```text
understand current reality when needed
  → form/review source-linked Planning Items
  → build/review an item-backed Full Picture
  → reconcile accepted meaning with current owners
  → optional alternatives/research/prototypes/tests
  → optional detailed planning handoff.
```

This is supported topology, not one mandatory sequence.

## 4. Referenced Direction — Perform Detailed Scenario/Domain/Slice Planning

Complete owner:

```text
planning/documentation/application-planning/direction-registry.md
```

Root orientation:

```text
Detailed Scenario
  ↔ Domain model/language
  → checkable Implementation Slice
  → cross-artifact consistency review.
```

The current reusable profile is active. Prototype-depth adaptation remains deferred.

## 5. Root-Owned Direction — Maintain Documentation, Use Cases And Commands

### Purpose

Maintain discoverable, non-duplicated documentation ownership and executable routes.

### Supported Use Cases

```text
read documentation principles/orientation;
maintain documentation architecture and responsibility maps;
create/update Direction and Use-Case Registries;
create/update command routes in the root UCM;
review example/navigation coverage;
plan/review replacement archives and diffs;
project accepted owners into Tampermonkey separately.
```

### Boundaries

- registries own semantic entries;
- root UCM owns commands;
- workflows own repeated behavior;
- templates own recommended shape;
- helper scripts own projection only;
- repository changes still require their command/update permissions.

### Activation

**Adaptive**

```text
Use current remembered architecture when clearly sufficient.
Reread planning/README.md, this registry and the relevant owner route when uncertain.
```

**Full**

```text
Read planning/README.md, this complete entry,
the relevant local/reusable registry and the complete owner route.
```

## 6. Local Registry Inventory

| Registry | Scope | Status |
|---|---|---|
| [`planning/documentation/application-planning/direction-registry.md`](documentation/application-planning/direction-registry.md) | Reusable solution/workflow planning Directions | active |
| [`planning/documentation/application-planning/use-case-registry.md`](documentation/application-planning/use-case-registry.md) | Reusable solution/workflow planning Use Cases | active |
| [`planning/areas/documentation-workbench/direction-registry.md`](areas/documentation-workbench/direction-registry.md) | Documentation Workbench local Directions | active |
| [`planning/areas/documentation-workbench/use-case-registry.md`](areas/documentation-workbench/use-case-registry.md) | Documentation Workbench local Use Cases | active |

## 7. Command Boundary

Related command router:

```text
planning/planning-use-case-map.md
```

Existing command-related semantic Use Case:

```text
Reconcile Planning Items
  ↔ `сверь айтемы`
```

Accepted semantic capability without a command route yet:

```text
Form Planning Items From Discussion
```

The item-formation command is not added until its canonical Russian command, canonical English name and aliases are explicitly selected.

## 8. Orientation Read Order

```text
1. planning/README.md
2. planning/direction-registry.md
3. relevant local/reusable Direction Registry
4. relevant Use-Case Registry
5. complete owner workflow/area
6. planning/planning-use-case-map.md only when a command is involved
7. planning/workflow-activation-map.md for task activation details.
```

## 9. Open Decisions

| Decision | Status | Conservative fallback |
|---|---|---|
| Item-formation command names | unresolved | Keep semantic use case active; do not add UCM/helper profile. |
| Coordinate Parallel Work as a root Direction | not accepted | Keep parallel-work workflow discoverable without root promotion. |
| Chat/AI/Work-State as an accepted local Use Case | provisional | Keep as candidate until trigger-to-result review. |
| Prototype-depth SDS method | deferred | Keep profile-limited entries and avoid invented methodology. |
