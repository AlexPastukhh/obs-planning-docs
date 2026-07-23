# OBS Root Direction Registry

Status: active project-specific root semantic Direction Registry
Doc version: v0.3.0-form-items-command
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

Accepted command-related semantic Use Cases:

```text
Reconcile Planning Items
  ↔ `сверь айтемы`;

Form Planning Items From Discussion
  ↔ `сформируй айтемы` / `form items`.
```

Both commands remain bounded by their root UCM permissions.

## 7A. Helper Projection

The Tampermonkey **Directions** surface projects the four accepted entries in this registry:

```text
DIR-PLAN-SOLUTION
DIR-DETAILED-SDS
DIR-MAINTAIN-DOCS-ROUTES
DIR-DOCUMENTATION-WORKBENCH
```

Adaptive:

```text
reuse clearly current context;
reread the selected registry entry and owner route when uncertain.
```

Full:

```text
always reread the complete selected entry and relevant owner route;
do not expand into unrelated Direction families.
```

Direction activation establishes context only. It does not execute commands or grant repository permissions.

The helper redirects both `Form Planning Items From Discussion` and `Reconcile Planning Items` from Use Cases to their accepted command routes.

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
| Coordinate Parallel Work as a root Direction | not accepted | Keep parallel-work workflow discoverable without root promotion. |
| Chat/AI/Work-State as an accepted local Use Case | provisional | Keep as candidate until trigger-to-result review. |
| Prototype-depth SDS method | deferred | Keep profile-limited entries and avoid invented methodology. |
