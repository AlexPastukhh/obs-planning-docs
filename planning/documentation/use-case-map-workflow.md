# Use-Case Map Workflow

Status: active reusable documentation-layer workflow
Doc version: v0.5.0-delegated-command-registry
Scope: creation and maintenance of concrete project route maps/UCMs for commands and user-visible actions, with explicit separation from semantic Direction and Use-Case Registries.

## 1. Naming Boundary

The historical file/workflow name `Use-Case Map` is retained for compatibility.

In current architecture:

```text
project UCM / planning-use-case-map.md
  → mandatory command-system entry and shared/global routing policy;

optional project command registry such as planning/commands/
  → direct per-command routes, reads, outputs, permissions and canonical English names;

Direction Registry
  → broad semantic work directions;

Use-Case Registry
  → semantic independently useful use cases and owner routes.
```

A UCM may link to a semantic use case. It does not own the complete semantic registry entry.

## 2. Purpose

Use this workflow for:

- creating a project route map;
- creating or maintaining an optional delegated command registry;
- updating command/continuation definitions;
- adding canonical English command names;
- changing active-context behavior;
- changing traversal/read-source rules;
- linking owner workflows/templates;
- changing expected outputs or permission boundaries;
- linking a command route to a semantic use case when registries exist.

Exact route-map shape:

```text
USE-CASE-MAP-TEMPLATE.md
```

Setup field kit:

```text
field-kits/root-use-case-map-field-kit.md
```

## 3. Setup vs Maintenance

```text
Field kit
  → one-time/rare project UCM setup;

this workflow
  → repeated UCM maintenance;

template
  → recommended exact UCM row shape;

project root UCM
  → mandatory command-system entry/global rules;

project command registry, when selected
  → direct concrete command/action definitions.
```

A project normally has one root UCM.

Do not create a second generic UCM under the reusable layer.

## 4. Root UCM And Delegated Command Ownership

Every project keeps one root UCM as the mandatory command-system entry. It owns shared routing/global policy and points to the concrete command representation.

A smaller project may keep concrete command rows directly in the UCM. A command-heavy project may instead delegate individual routes to one direct command-registry directory. In that model each command definition owns:

```text
user trigger / aliases;
canonical English name;
task/route meaning;
active-context behavior;
traversal/read mode;
activated owners / required reads;
expected output;
permission boundary;
projection metadata.
```

The root UCM and command files together are one routing system. They must not contain competing copies of the same concrete route.

## 5. What The UCM Does Not Own

```text
full workflow algorithm;
template body;
responsibility map;
semantic Direction definition;
semantic Use-Case body/topology;
Idea review/planning workflow logic;
general task/action log;
application state.
```

When long algorithmic instructions appear, link/create a workflow owner.

When exact shape is needed, link a template.

When semantic Direction/use-case identity is needed, use the active registry workflow/templates.

## 6. Command vs Use-Case Activation Semantics

### Command

A command requests immediate execution and a defined output under explicit permission boundaries.

It needs:

```text
canonical trigger/aliases;
canonical English name;
owner route;
required reads;
output;
permissions.
```

### Semantic Use Case

A semantic use case establishes documented workflow context.

It may explain:

```text
purpose;
trigger;
inputs;
result;
topology;
current stage;
next actor/action;
owner route.
```

The first action may belong to the user, AI or another tool.

A use-case activation does not automatically execute the entire workflow.

Semantic registry owners are `direction-and-use-case-registry-workflow.md`, `DIRECTION-REGISTRY-TEMPLATE.md` and `USE-CASE-REGISTRY-TEMPLATE.md`.

## 7. When To Create Or Update A UCM

Create when repeated user-visible actions need stable routing.

Update when:

- recurring command/action appears;
- aliases or canonical English name change;
- expected output changes;
- required reads/owner route change;
- permissions change;
- active-context behavior changes;
- route points to the wrong owner;
- repeated confusion shows routing must be explicit;
- a semantic use case becomes command-related after registry adoption.

Do not update for implementation detail changes that do not change routing.

## 8. Route Addition / Update Workflow

```text
1. Identify canonical user trigger and aliases.
2. Decide whether this is an executable command/action route.
3. For commands, choose one canonical English name.
4. Identify active-context behavior.
5. Decide traversal depth and source mode.
6. Identify owner workflow/template/area.
7. Identify required reads.
8. Identify expected output and permission boundary.
9. If the project has a delegated command registry, create/update exactly one direct command definition there.
10. Otherwise create/update the compact root-UCM row.
11. Update root UCM only when registry navigation or shared/global command policy changes.
12. Link related semantic Direction/Use Case when present.
13. Check that owner logic is linked, not copied.
```

Do not invent a command name from a semantic Use Case. Exact command identities remain owned by concrete command definitions.

## 9. Idea Collection Route Boundary

Reusable owners:

```text
idea-planning-principles-and-terminology.md
idea-review-and-planning-workflow.md
IDEA-REVIEW-TEMPLATE.md
```

A project command may expose Idea collection/review when that is a repeated user-visible action. The semantic capability and registry entry may exist before a project command.

The route must not recreate a universal Planning Item layer or invent an Idea marker syntax.

## 10. Owner Linking Pattern

```text
Activated owners:
  workflow/template/area paths;

Required reads:
  current source/owner files;

Source of obligation:
  router/principle/workflow requiring the behavior;

Expected output:
  short reviewable description;

Permission boundary:
  explicit no-edit/edit/archive/commit/push behavior.
```

Keep long instructions in owners.

## 11. Expected Output Rule

Good:

```text
reviewed Idea/current-conclusion blocks using the selected reusable representation;
read-only reconciliation with before/after pictures and current-owner / Idea transitions;
replacement package with MANIFEST/APPLY/complete files;
draft update with complete returned files.
```

Bad:

```text
workflow copied into route row;
template body embedded in UCM;
permission rules hidden in prose;
semantic registry body copied into route.
```

## 12. Command Alias / Continuation Rule

Every command family records:

- canonical command;
- aliases;
- one canonical English display name;
- active/no-active-context behavior;
- traversal/source mode;
- owner/reads;
- output;
- permissions.

Aliases/name changes do not silently change permissions.

## 13. Setup-Time Example Fit

For initial/substantial UCM restructuring:

1. read `examples/README.md`;
2. identify clearly reusable examples;
3. show profile-specific candidates before wiring them;
4. record accepted examples only;
5. keep examples demonstration-only.

Ordinary maintenance does not reread every example by default.

## 14. Synchronization

When adding/changing a route or reusable route owner:

- update relevant navigation;
- update responsibility map when a new owner exists;
- consider example coverage;
- consider Tampermonkey projection only when relevant; a modular helper may discover an accepted command file without a per-command source-code edit;
- synchronize related semantic registry references when they exist;
- preserve project action-log requirements when an owner exists.

## 14A. Delegated Command Registry Contract

When a project uses a registry such as `planning/commands/`:

```text
root UCM
  → must link the registry and remain the first route entry;

registry README
  → owns discovery/format/navigation rules, not a second hand-maintained command list;

direct *.command.md
  → one concrete command each;

reusable workflows/templates
  → continue to own algorithms and exact reusable output shapes.
```

Do not maintain the same concrete command row in both the UCM and a command file.

## 15. Checks

- concrete trigger exists;
- every command has one canonical English name;
- active-context behavior is clear;
- required reads are proportional;
- owners are linked, not copied;
- expected output is reviewable;
- permission boundary is explicit;
- command route and semantic registry roles are distinct;
- command name was not invented from semantic Use-Case wording;
- navigation/responsibility/example/projection updates were considered.

## 16. Do Not

```text
- Do not use the UCM as a full workflow.
- Do not copy template bodies into rows.
- Do not duplicate responsibility maps.
- Do not hide permission changes.
- Do not make command English names optional.
- Do not let aliases silently become canonical names.
- Do not make the UCM semantic Direction/Use-Case authority.
- Do not add semantic registries inside the UCM.
- Do not invent project command names from reusable capability names.
- Do not create ad hoc source-version fields before governance exists.
```
