# Direction And Use-Case Registry Workflow

Status: active reusable documentation-layer workflow
Doc version: v0.1.0-semantic-registry-hierarchy
Scope: reusable rules for creating and maintaining semantic Direction Registries and Use-Case Registries without conflating them with project command route maps/UCMs.

## 1. Purpose

This workflow owns:

```text
broad semantic Direction identity
  → local/root hierarchy
  → independently useful Use-Case identity
  → owner route
  → topology and optionality
  → command relationship when one exists
  → Adaptive/Full context activation
  → registry review and synchronization.
```

It does not own concrete command triggers, aliases, English names, command permissions, complete workflow bodies, project state, helper implementation or repository finalization.

## 2. Core Entities

### Direction

A broad semantic work direction that groups independently useful use cases around one result, responsibility zone or planning intent.

A Direction may contain sequential, partly sequential, optional, conditional, alternative, repeatable or independently triggered use cases. It is not one mandatory universal workflow.

### Use Case

An independently useful supported capability with a recognizable trigger or accepted input, purpose, understandable result or explicit unresolved end, owner route and boundaries.

A mandatory internal step is not promoted mechanically into a peer use case.

### Command

A user trigger requesting immediate execution and a defined output under explicit permissions. A command may relate to a use case but does not replace its semantic entry.

## 3. Authority Split

```text
root Direction Registry
  → root orientation and aggregation by reference;

local/reusable-family Direction Registry
  → complete local Direction entries;

local/reusable-family Use-Case Registry
  → complete semantic Use-Case entries;

project root UCM
  → executable commands, aliases, English names,
    reads, outputs and permissions;

workflow/template/area owner
  → complete behavior or concrete project state;

Tampermonkey
  → projection only.
```

Do not copy complete local registry bodies into the root registry.

## 4. Registry Hierarchy

Recommended shape:

```text
planning/direction-registry.md
  → references reusable-family/local Direction Registries;

planning/documentation/<family>/direction-registry.md
  → owns reusable-family Direction entries;

planning/documentation/<family>/use-case-registry.md
  → owns reusable-family Use-Case entries;

planning/areas/<area>/direction-registry.md
  → owns project-local Direction specialization;

planning/areas/<area>/use-case-registry.md
  → owns project-local Use-Case entries.
```

A global root Use-Case Registry is optional when local registries and the root Direction Registry provide clear routing.

## 5. Direction Entry Contract

Each Direction entry provides:

```text
stable semantic ID and name;
status;
purpose;
boundaries/non-goals;
complete owner registry and owner route;
parent/root relationship;
topology;
child use-case references;
related Directions;
Adaptive and Full activation;
open decisions.
```

## 6. Use-Case Entry Contract

Each Use-Case entry provides:

```text
stable semantic ID and name;
status;
parent Direction;
purpose;
trigger/accepted input;
result/end state;
boundaries/non-goals;
topology/optionality;
workflow/template/area owner route;
required supporting reads;
related command when one exists;
Adaptive and Full activation;
dependencies/handoffs;
open decisions.
```

## 7. Independently Useful Criterion

Create a separate use case when it has an independently useful trigger, result, owner route, review/lifecycle, repeated activation or branch/alternative choice.

Do not create a peer use case merely because a workflow has another step, a file has another heading, a UI has another button, a topic can be named separately or a supporting model/view exists.

## 8. Supported Capabilities, Not Mandatory Stages

A registry describes supported capabilities. It does not imply that every use case runs in every session, listed order is mandatory, every concern/research/prototype branch is required or activating a Direction executes it automatically.

Use topology fields to show actual ordering, optionality, conditions, repetition and handoffs.

## 9. Command And Use-Case Activation

### Use-Case Activation

Establishes purpose, trigger/input, expected result, current stage, next actor/action and owner route. The next action may belong to the user, AI or another tool. Activation grants no repository permission.

### Command Activation

Requests an operation under its root UCM route. The UCM owns canonical command, aliases, canonical English name, active-context behavior, reads, output and permissions.

A use case may exist without a command. Do not invent a command name from a semantic use-case name.

## 10. Adaptive And Full Modes

### Adaptive

Use remembered current context only when clearly sufficient. Reread the selected entry and owner route when not read in the current chat, forgotten, uncertain, potentially changed, explicitly challenged or high impact.

### Full

Always reread the selected registry entry, complete relevant owner route, relevant parent/root entry and required current project-local owner. Do not expand into unrelated Direction families.

## 11. Auxiliary Solution Principle

When a solution introduces an auxiliary documentation system, planning system, framework, automation layer, developer tool, codebase workflow or integration service, treat it proportionally as a user-facing solution with its own use-case inventory rather than hiding all behavior as implementation detail.

## 12. Status Model

Recommended statuses:

```text
active;
accepted;
provisional;
deferred;
superseded;
retired.
```

Registry status does not prove runtime implementation. State method/documentation/command/runtime status separately.

## 13. Update Algorithm

```text
1. Identify the semantic Direction or Use Case.
2. Check current root/local registries and owner workflows.
3. Confirm independent usefulness and correct scope.
4. Choose root aggregation versus local complete ownership.
5. Assign stable semantic ID/name.
6. Record purpose, trigger/result, topology and boundaries.
7. Link complete owner route without copying it.
8. Link a command only when its UCM route exists.
9. Add Adaptive/Full activation text.
10. Update root/navigation/responsibility/activation owners.
11. Consider Tampermonkey projection separately.
12. Validate links, duplication, status and permissions.
```

## 14. No-Copy Rule

```text
root registry:
  short summary + local registry reference;

local registry:
  complete semantic entry + owner route;

workflow:
  complete repeated process;

UCM:
  executable route only;

Tampermonkey:
  compact projection only.
```

## 15. Input Convention Relationship

Input conventions may affect accepted input but do not own use-case meaning. A Planning Item delimiter can mark a proposed semantic boundary; it does not create or accept an item and does not create a Candidate entity.

## 16. Projection Boundary

Registry implementation does not authorize helper changes. When projected later:

```text
Orientation → root documentation + root Direction Registry;
Directions  → Direction Registries;
Use Cases   → Use-Case Registries;
Commands    → root UCM.
```

## 17. Validation Checklist

- one complete owner per entry;
- root aggregation references rather than copies;
- each use case has independent value/trigger/result;
- mandatory internal steps stay inside workflows;
- topology/optionality is explicit;
- command relation exists only when UCM route exists;
- activation implies no command permission;
- Adaptive/Full prompts share one semantic entry;
- provisional/deferred status is honest;
- links and IDs are unique;
- navigation/responsibility owners are synchronized;
- no Source Idea or Planning Item Candidate entity.

## 18. Do Not

```text
- Do not make the UCM the semantic registry owner.
- Do not make the root registry a copy of every local entry.
- Do not turn every workflow step into a use case.
- Do not imply all supported use cases are mandatory.
- Do not invent command names from semantic use-case names.
- Do not create Tampermonkey profiles before accepted source owners exist.
- Do not let registry activation authorize edit/archive/commit/push.
- Do not claim runtime behavior merely because a registry entry exists.
```
