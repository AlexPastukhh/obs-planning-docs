# Expanded Planning Capture — Dependency, Reuse, File and Graph Plan

Status: planning capture / no repository mutation  
Context: continuation of Idea-driven Target-State Planning discussion  
Primary direction: make reusable ownership, single-source-of-truth dependencies, composition and impact review explicit across planning UCs, commands, documentation and Linked Notes.

# 1. Current Selected Direction

The methodology should converge on four independent operations:

```text
SHOW CURRENT
CREATE FROM IDEAS
INTEGRATE IDEAS
PLAN TARGET
```

`собери идеи + Target` remains a reusable Idea Review shell, not a second Scenario/Domain/Slice methodology.

The main missing layer is now broader than Idea Review:

```text
semantic target state
+
dependency/reuse model
+
file realization plan
+
freshness/review obligations
+
queryable graph projection
```

The system should make it difficult to:

- recreate upstream truth downstream;
- skip a required semantic/planning step;
- lose already-produced Scenario/Behavior/DATA/Domain work;
- create a second owner for the same meaning;
- miss consumers that require review after an owner changes;
- maintain a second hand-written graph merely for discoverability.

# 2. Directed SDS Dependency Backbone

The primary Application planning direction remains:

```text
Real-Life Need / Current Reality / Real-Life Scenarios
↓
Application Responsibility / Concept
↓
Application Scenarios
↓
Behavior Items + DATA Objects
↓
Requirements / Screens when material
↓
Domain Discovery
↓
Domain Candidates
↓
Canonical Domain
  Entities
  Value Objects
  Aggregates / Roots
  invariants
  policies
  lifecycle
  ownership / references
↓
Slice Strategy
↓
Independent / Deliverable / Testable Slices
↓
Implementation + Practical Test Evidence
↓
explicit upstream correction only when evidence requires it
```

Downstream planning consumes upstream canonical identities and owners instead of reconstructing their bodies.

# 3. Relation Classes Must Be Separated

Do not collapse every relation into one generic "dependency".

## 3.1 Semantic derivation / consumption

Examples:

```text
Scenario DERIVED_FROM Real-Life Scenario
BehaviorItem OWNED_BY Scenario
BehaviorItem USES_DATA DataObject
DomainCandidate DERIVED_FROM BehaviorItem / DATA
Slice REALIZES Scenario
Slice COVERS BehaviorItem
Slice USES_DOMAIN Aggregate / Entity / Policy
Slice CONSTRAINED_BY Requirement
```

These are semantic/planning relations.

## 3.2 Composition / reuse

Examples:

```text
UC-PLAN-SLICE REUSES Slice Planning Workflow
Collect Slice Ideas REUSES Idea Review Shell
Collect Slice Ideas INTEGRATES_INTO Slice
Slice Planning CONSUMES WEUC evidence when material
```

This graph answers:

> From which reusable components does this UC/command/workflow obtain its result?

## 3.3 Freshness / review obligation

Current Linked Notes already owns this class:

```text
whole source file
→ consumer file
→ semantic review required after source meaning changes
```

through `.linked-notes/review-dependencies.json`.

A semantic relation must not automatically become a Review Dependency. Add a Review Dependency only when a source change should create an explicit downstream review obligation.

## 3.4 Literal synchronized value

Current Linked Notes Reference Objects already own:

```text
canonical literal value
→ materialized uses
```

and bounded semantic fragments depending on one canonical value.

## 3.5 Ordering

Ordered Reference Lists own ordering based on Reference Object values.

## 3.6 Navigation-only relation

A link/reference with no synchronization or review obligation remains a normal semantic/navigation relation.

This is important because current Linked Notes contracts explicitly distinguish generic semantic links from Reference Objects and Review Dependencies.

# 4. Do We Need A Separate Graph Registry?

## Decision

Do **not** introduce a manually maintained "graph file per UC/command".

That would create:

```text
canonical workflow/registry
+
manual graph registry
=
two descriptions of the same composition
```

and eventually drift.

Instead:

```text
canonical owner / registry / command
→ declares only the relations it actually owns
→ graph index is generated / rebuildable
→ per-UC / per-command graphs are projections
```

## Desired model

```text
Canonical declarations
  Scenario owners
  Domain owners
  Slice owners
  UC registries/workflows
  command definitions
  dependency/relation markers
          ↓
Graph builder / indexer
          ↓
Repository semantic graph projection
          ↓
Linked Notes graph/query UI
          ↓
Chat/agent context queries
```

The graph projection is never semantic authority.

# 5. Reusable Dependency / Composition Owner

## New canonical methodology owner

Proposed:

`planning/documentation/planning-dependency-and-composition-model.md`

Responsibilities:

- relation taxonomy;
- owner/source-of-truth rules;
- directionality;
- composition/reuse semantics;
- distinction between semantic relation vs review obligation;
- target Dependency Context contract;
- graph-projection rules;
- impact traversal semantics;
- cycle rules;
- stale/unresolved/broken relation meanings;
- boundary with Linked Notes tool implementation.

It should **not** contain the complete graph.

# 6. Target Dependency Context

Each target-specific workflow owns its required/proportional source set.

The shared Idea workflow asks the target owner:

```text
What canonical sources and reusable planning components are required
to understand/create/integrate this Target?
```

Then it resolves those sources.

General contract:

```text
Target Dependency Context
=
upstream semantic sources
+ reusable planning workflows
+ constraints
+ architecture/workspace-evolution evidence when material
+ delivery constraints when material
+ Current Target when INTEGRATE
+ practical evidence when available
```

# 7. Scenario Dependency Context

The Scenario owner should make explicit:

```text
Real-Life Need
Current Reality
Real-Life Scenario / user goal
Application responsibility
Solution / Prototype evidence when material
New Ideas when Idea-driven
Current Scenario when INTEGRATE
```

Output remains Scenario-owned:

```text
Scenario
+ DATA Objects
+ Behavior Items
+ material Requirements / Screens
```

# 8. Domain Dependency Context

Domain planning should explicitly consume:

```text
Application Scenarios
Behavior Items
DATA Objects
Requirements when material
existing Domain meaning when INTEGRATE
evidence of state/lifecycle/rules/invariants
New Ideas when Idea-driven
practical evidence when available
```

Output:

```text
Domain candidates
→ selected/canonical concepts
→ Entities / VOs / Aggregates / Roots when justified
→ rules / invariants / lifecycle / policies / ownership
```

No noun/table/ORM re-derivation may bypass Behavior/DATA evidence.

# 9. Slice Dependency Context

For Slice creation/integration, resolve when material:

## Semantic inputs

- Scenario(s)
- Behavior Items
- DATA Objects
- Requirements
- Screens
- Canonical Domain entities/value objects/aggregates/roots/policies/invariants/lifecycle

## Architecture/evolution inputs

- Architecture Decisions/evidence
- Workspace Use Cases / WEUC
- Change Axes / Change Pressure
- recurring codebase operations
- expected evolution/maintenance work-cost

## Delivery inputs

- deadlines
- milestones
- ordering constraints
- dependencies
- capacity

## Idea-driven input

- New Ideas

## INTEGRATE-only

- Current Slice
- previous implementation/release behavior
- test evidence
- operational evidence
- observed maintenance/change cost

Output:

```text
Slice Strategy / Slice candidates
→ selected independently useful/testable vertical Slice
→ explicit coverage/delegation/later/outside map
→ dependencies
→ realization implications
→ proof obligations
→ Projected Slice Target
```

# 10. Idea Review Shell — Revised Reusable Algorithm

```text
Source / New Ideas
↓
resolve Target Type
↓
resolve Mode: CREATE | INTEGRATE
↓
resolve Target Dependency Context
↓
read canonical sources / Current Target
↓
Idea Review
↓
Concern Groups / Q/R/P
↓
Variants / refinements
↓
selected Decisions
↓
Projected Target State
↓
Delta + Preserved Existing Meaning for INTEGRATE
↓
Dependency impact / downstream handoffs
↓
explicit Pre-Update continuation
```

Durable Q/R/P and Decision trace survive incorporation of Idea meaning into Target when still material.

# 11. Expand Pre-Update Into Dependency + File Planning

Current Pre-Update already plans files/actions/dependencies, but the dependency part is too implicit.

The desired sequence:

```text
Selected semantic Target State
↓
PRE-UPDATE

1. Owner / Reuse Plan
2. Semantic Dependency Plan
3. File / Artifact Relation Plan
4. Freshness / Review-Dependency Plan
5. Generated Projection / Index Plan
6. Ordered File Update Plan
7. Checks / Impact Closure
↓
still plan-only
```

## 11.1 Owner / Reuse Plan

For each planned meaning:

| Planned meaning | Canonical owner to reuse | New owner needed? | Why |
|---|---|---:|---|

Required checks:

- can existing owner be reused?
- would a new file duplicate an existing semantic body?
- is this a projection/index/template/workflow/model/registry?
- which file is authoritative after the change?

## 11.2 Semantic Dependency Plan

Plan relation changes before file edits.

| Source identity/owner | Relation | Consumer/target | Reason | Current / New / Removed |
|---|---|---|---|---|

Example:

```text
BI-14
  → COVERS
SL-06

AGG-ChatHandoff
  → USED_BY
SL-06

WEUC-AddDeliveryMechanism
  → INFORMS
SL-06 realization
```

## 11.3 File / Artifact Relation Plan

Map semantic changes to repository paths.

| Source file | Consumer file | Relation purpose | Representation |
|---|---|---|---|

Representation can be:

- direct Markdown link / stable ID reference;
- target-owned dependency section;
- Reference Object use;
- Reference Object dependent fragment;
- whole-file Review Dependency;
- Ordered Reference List;
- generated graph/index projection;
- no explicit file relation required.

## 11.4 Freshness / Review Plan

For every changed canonical owner ask:

```text
Which consumers must be reviewed?
Which literal uses can become stale?
Which bounded depend fragments require review?
Which whole-file Review Dependencies become NEEDS REVIEW?
Which generated projections must rebuild?
Which ordinary links may become broken/unresolved?
```

Output:

| Changed source | Impacted consumer/index | Mechanism | Required action |
|---|---|---|---|

## 11.5 Expected Graph After Update

Pre-Update should include a compact target-state graph for non-trivial relation changes:

```text
<source>
├─ relation → <consumer>
├─ relation → <consumer>
└─ review-required → <consumer>
```

This graph is a **plan projection**, not another stored authority.

# 12. File Plan — Reusable Methodology

## A. New

### `planning/documentation/planning-dependency-and-composition-model.md`

New canonical relation/dependency/composition semantics.

## B. Update

### `planning/documentation/idea-planning-principles-and-terminology.md`

Add canonical concepts:

- Idea-driven Target-State Planning;
- CREATE / INTEGRATE;
- Projected Target State;
- Current Target;
- Preserved Existing Meaning;
- Delta From Current;
- Target Dependency Context.

### `planning/documentation/idea-review-and-planning-workflow.md`

Change collect-ideas orchestration to:

```text
Ideas
→ target/mode resolution
→ Target Dependency Context
→ current/upstream owner resolution
→ review/QRP/Decision
→ complete Projected Target
→ dependency impact
→ Pre-Update
```

### `planning/documentation/IDEA-REVIEW-TEMPLATE.md`

Add:

- Target Mode;
- Target Dependency Context;
- Current Target;
- Projected Target State;
- Delta From Current;
- Preserved Existing Meaning;
- Concern Groups;
- Dependency / Handoff impact.

### `planning/documentation/file-update-overview-workflow.md`

Expand Pre-Update with explicit:

- Owner/Reuse Plan;
- Semantic Dependency Plan;
- File Relation Plan;
- Linked Notes freshness/review plan;
- generated projection/index plan;
- expected post-update graph.

### `planning/documentation/FILE-UPDATE-OVERVIEW-TEMPLATE.md`

Add structured dependency/reuse tables before Ordered Update Steps.

### `planning/commands/plan-file-update.command.md`

Update expected output/key reminders so `пред-апдейт` means:

```text
dependency/reuse-aware concrete file plan
```

not merely a changed-file list.

# 13. File Plan — Application SDS Owners

## Update

### `planning/documentation/application-planning/solution-and-scenario-planning-workflow.md`

Own Scenario Dependency Context and explicit Real-Life → Application Scenario derivation.

### `planning/documentation/application-planning/templates/SCENARIO-DRAFT-TEMPLATE.md`

Expose source/trace relations to Real-Life basis and explicit DATA/Behavior identities without copying downstream meaning.

### `planning/documentation/application-planning/domain-discovery-workflow.md`

Make Scenario/Behavior/DATA evidence dependencies explicit.

### `planning/documentation/application-planning/domain-planning-workflow.md`

Own canonical Domain Dependency Context and preservation rules for INTEGRATE.

### `planning/documentation/application-planning/templates/DOMAIN-DRAFT-TEMPLATE.md`

Add/normalize typed source trace:

- derived from Scenarios;
- Behavior/DATA evidence;
- Requirements;
- replaced/superseded Domain meaning when relevant.

### `planning/documentation/application-planning/slice-planning-workflow.md`

Strengthen Target Dependencies into the canonical Slice Dependency Context, including:

- Scenario;
- Behavior Items;
- DATA;
- Requirements;
- Domain;
- Screens;
- WEUC/Change Pressure;
- architecture evidence;
- delivery constraints;
- Current Slice/practical evidence for INTEGRATE.

### `planning/documentation/application-planning/templates/SLICE-STRATEGY-DRAFT-TEMPLATE.md`

Expose source coverage and dependency/order reasoning.

### `planning/documentation/application-planning/templates/IMPLEMENTATION-SLICE-DRAFT-TEMPLATE.md`

Normalize typed links/references for:

- realizes Scenario;
- covers Behavior Items;
- uses DATA;
- constrained by Requirements;
- uses/governed by Domain owners;
- informed by WEUC/Architecture;
- depends on Slices;
- verified by testing owners.

# 14. File Plan — SHOW / CREATE / INTEGRATE Commands

## Reuse existing semantic UCs where possible

Do not create one new semantic UC per command merely for palette convenience.

### Existing commands become explicit INTEGRATE shortcuts

- `collect-scenario-ideas.command.md`
- `collect-domain-ideas.command.md`
- `collect-slice-ideas.command.md`

They should say:

```text
selected Current Target required/expected when available
+ new Ideas
→ Projected Updated Target
```

If no Current Target exists, do not silently pretend an INTEGRATE baseline exists.

### Add explicit CREATE shortcuts

Potential command files:

- `collect-new-scenario-ideas.command.md`
- `collect-new-domain-ideas.command.md`
- `collect-new-slice-ideas.command.md`
- `collect-new-slice-strategy-ideas.command.md` when justified

These reuse the same Idea workflow with Mode=CREATE.

### Add SHOW CURRENT capability

Prefer one reusable semantic owner/UC with parameterized target type, then command shortcuts:

- `show-current-scenario.command.md`
- `show-current-domain.command.md`
- `show-current-slice.command.md`
- `show-current-slice-strategy.command.md`

Proposed reusable workflow:

`planning/documentation/application-planning/current-planning-target-read-workflow.md`

It owns only:

```text
resolve target identity
→ resolve canonical current owner files
→ read target + dependencies required for correct representation
→ render current state through canonical template
→ do not invent missing meaning
```

# 15. Graphs For Use Cases And Commands

The goal is valid:

> make it harder to miss a reusable stage and easier to inspect what a UC/command is made from.

But implement it as generated projection.

## Per-UC graph example

```text
UC-PLAN-SLICE
├─ consumes → Scenario owners
├─ consumes → Behavior Items
├─ consumes → Requirements
├─ consumes → Domain owners
├─ optionally consumes → WEUC / Change Pressure
├─ reuses → Slice Planning Workflow
└─ hands off → Testing Planning
```

## Per-command graph example

```text
собери идеи слайса
├─ invokes/reuses → Idea Review Shell
├─ mode → INTEGRATE
├─ target owner → UC-PLAN-SLICE / Slice workflow
├─ consumes → Current Slice
├─ consumes → Slice Dependency Context
├─ concerns → Planning Concern model
├─ decisions → Decision trace
└─ continuation → Pre-Update
```

The command graph does not own those algorithms.

# 16. How To Store Composition Without A Second Authority

Preferred order:

## 1. Derive automatically where possible

Examples:

- command → ownerFiles;
- command → related UC;
- UC → main owner;
- registry → Direction;
- Scenario Catalog → Scenario owner.

## 2. Add explicit relation declarations only where derivation is not possible

For example, an orchestration owner may declare:

```text
reuses Idea Review Shell
consumes Current Target
consumes Target Dependency Context
hands off to Pre-Update
```

## 3. Generate graph/index

Potential generated artifact:

`planning/semantic-composition-graph.generated.json`

Name/location should be decided during implementation review.

It must state/generatedFrom and be rebuildable.

Do not hand-edit it.

# 17. Linked Notes Extension — Semantic Relations / Graph

Current Linked Notes already provides:

- Reference Objects;
- bounded Reference Object dependencies;
- whole-file Review Dependencies;
- Ordered Reference Lists;
- Deep validate repo.

The missing capability is generic typed semantic relations and graph queries.

## Proposed repository-facing contract

Potential:

`.linked-notes/SEMANTIC-RELATIONS.md`

Owns tool-facing representation rules only.

Semantic relation meanings remain owned by:

`planning/documentation/planning-dependency-and-composition-model.md`

## Desired capability

Linked Notes should be able to:

- index semantic relation declarations;
- resolve source/target identities;
- show outgoing/incoming relations;
- render a local dependency graph;
- distinguish generic relation from Review Dependency;
- show relation-linked Review Dependency freshness;
- find broken/unresolved targets;
- show dependents of a changed owner;
- build impact sets;
- deep-validate relation declarations/index drift.

## Important boundary

```text
semantic relation
≠ automatically stale when target content changes

Review Dependency
= explicit semantic review obligation after source-file change
```

Do not turn the entire repository graph into one permanent stale-warning cascade.

# 18. Linked Notes Application Planning Impact

If Semantic Relations becomes independently useful application behavior, it should receive its own current Scenario owner rather than being hidden as a button/helper.

Potential Scenario:

`SCN-LN-SEMANTIC-RELATIONS — Inspect Repository Semantic Relations And Impact`

Possible user results:

```text
select owner/file/identity
→ see dependencies/dependents
→ see broken/unresolved relations
→ see attached freshness obligations
→ inspect affected graph
```

Exact scenario split should be reviewed against existing Reference Object / Review Dependency scenarios before implementation.

# 19. ChatGPT / Agent Query Surface

Do not design the semantic model around a ChatGPT integration first.

First make graph/query semantics stable and testable inside repository + Linked Notes.

Then expose a read-only agent surface.

Desired operations:

```text
resolve(id | path)
dependencies(id | path, relationTypes?, depth?)
dependents(id | path, relationTypes?, depth?)
composition(ucId | commandId)
impact(changedIds | changedPaths)
stale(id | path)
unresolved(scope?)
contextBundle(ucId | commandId | targetId)
validateGraph(scope?)
```

`contextBundle` is especially useful:

```text
command / UC
→ canonical route
→ reusable components
→ required Target Dependency Context
→ current target owners
→ stale/review-needed relations
→ minimal file set to read
```

This can directly support the existing governance read-reuse rule and reduce repeated broad reading.

# 20. Possible ChatGPT Integration Stages

## Stage A — no new external tool

Linked Notes UI can produce/copy a structured Dependency Context report.

User or helper sends it to ChatGPT.

Low complexity.

## Stage B — browser/helper integration

Planning Helper/Linked Notes can insert a structured query/result into the current chat.

Still explicit user action.

## Stage C — local read-only tool/API

Expose graph queries through a local bridge/MCP-like interface so ChatGPT can request:

```text
contextBundle(command)
impact(paths)
stale(target)
```

Only after query semantics and security boundaries are stable.

Do not give this tool repository mutation permission merely because read queries are useful.

# 21. Validation / Tests

Repository-level tests should eventually prove:

## Semantic identity

- every relation source/target resolves;
- no relation points to retired semantic authority as current without explicit historical relation;
- one semantic identity has one current owner.

## Composition

- every composite command/UC resolves all declared reusable components;
- no command graph contains copied algorithm bodies;
- generated graph matches canonical declarations.

## SDS derivation

- Slice dependency context can resolve Scenario/Behavior/Domain inputs when declared;
- Domain dependencies route to Scenario/Behavior/DATA owners;
- downstream docs do not maintain duplicate full bodies of upstream semantic owners.

## Linked Notes

- generic semantic relation is not mistaken for Review Dependency;
- Review Dependency freshness remains fingerprint-based;
- Reference Object freshness remains separate;
- relation index can rebuild;
- broken/unresolved relations are detected;
- impact traversal is deterministic and bounded.

## Pre-Update

- dependency-sensitive plan includes Owner/Reuse + Dependency + Freshness sections;
- expected graph agrees with planned file actions;
- generated projections are listed as rebuild/check outputs, not authorities.

# 22. Concern Groups

## CG-DEPENDENCY-AUTHORITY — Semantic ownership and duplication

Shared resolution surface:
canonical ownership + Target Dependency Context + typed relations.

Members:

- **P-DEP-01 — Downstream duplicate truth.**
  Scenario/Behavior/Domain meaning can be recreated inside Slice/command docs.

- **R-DEP-02 — Idea shell becomes second target methodology.**
  `собери идеи X` may silently own Target semantics.

- **R-DEP-03 — Graph registry becomes second authority.**
  A hand-maintained graph can drift from owner workflows/registries.

- **Q-DEP-04 — Where should relation declarations live?**
  Need a canonical declaration rule that allows generation without duplicating meaning.

Current recommendation:
owner-local declarations + generated graph projection.

## CG-PREUPDATE-IMPACT — File and dependency planning completeness

Shared resolution surface:
dependency-aware Pre-Update.

Members:

- **P-PU-01 — File plan can miss semantic relation changes.**
- **P-PU-02 — Changed owner can leave stale consumers unreviewed.**
- **R-PU-03 — New files can duplicate reusable owners.**
- **Q-PU-04 — Which relation mechanism is appropriate per dependency?**
  direct link vs Reference Object vs Review Dependency vs generated projection.

Current recommendation:
make Owner/Reuse, Semantic Dependency, File Relation and Freshness plans explicit before ordered file actions.

## CG-GRAPH-COMPOSITION — UC/command step completeness

Shared resolution surface:
generated composition graph + validation.

Members:

- **P-GR-01 — Composite commands can omit a reusable stage.**
- **R-GR-02 — ownerFiles alone do not express role/order clearly enough.**
- **Q-GR-03 — Which composition edges require explicit declaration vs automatic derivation?**
- **R-GR-04 — too much graph metadata can make simple UCs harder to maintain.**

Current recommendation:
derive simple edges automatically; require explicit composition only for non-obvious orchestration.

## CG-LINKED-NOTES-GRAPH — Tool support and agent access

Shared resolution surface:
semantic graph index/query capability.

Members:

- **P-LN-01 — Current Linked Notes lacks a generic semantic relation graph.**
- **R-LN-02 — abusing Review Dependencies for generic links would create false stale cascades.**
- **Q-LN-03 — which relation markers/index schema should Linked Notes consume?**
- **Q-LN-04 — when is a direct ChatGPT query tool worth the added bridge/security complexity?**

Current recommendation:
build read-only graph/query capability first; add direct ChatGPT tool only after repository contract stabilizes.

# 23. Current Decisions

## D-01 — Dependency planning becomes first-class Pre-Update work

Selected direction.

Pre-Update should plan semantic/file/freshness dependencies before exact file actions.

## D-02 — Do not maintain hand-written per-command/per-UC graph files

Selected direction.

Use generated projections from canonical declarations.

## D-03 — Add one reusable dependency/composition semantic owner

Selected direction.

A reusable model owns relation semantics, not graph contents.

## D-04 — Extend target-specific workflows with Target Dependency Context

Selected direction.

Scenario, Domain and Slice own their own source/dependency contracts.

## D-05 — Reuse Linked Notes Reference Objects and Review Dependencies instead of replacing them

Selected direction.

Generic Semantic Relations becomes a distinct feature/class.

## D-06 — Linked Notes graph index must be projection, not semantic authority

Selected direction.

## D-07 — ChatGPT graph tool is a later interface layer

Selected direction.

First stabilize repository relation model, queries and tests.

# 24. Recommended Implementation Order

```text
STEP 1
Reusable dependency/composition model
+ Idea CREATE/INTEGRATE model
+ Concern/Decision integration

STEP 2
Scenario / Domain / Slice Target Dependency Context
+ canonical templates

STEP 3
Pre-Update Dependency Plan
+ File Update workflow/template/command

STEP 4
SHOW CURRENT + explicit CREATE/INTEGRATE command family
+ Helper projections/tests

STEP 5
Generated semantic/composition graph prototype
+ repository validation

STEP 6
Linked Notes Semantic Relations / graph UI
+ impact/stale integration with existing Review Dependencies/Reference Objects

STEP 7
Read-only ChatGPT/agent query surface
+ contextBundle / impact / stale / graph
```

This order prevents Linked Notes implementation from becoming the place where the semantic model is invented.

# 25. Desired End State

A user or AI should eventually be able to ask:

```text
"собери идеи слайса SL-06"
```

and the system can resolve:

```text
command
→ Idea Review reusable shell
→ INTEGRATE mode
→ Current SL-06 owner
→ Scenario(s)
→ Behavior Items
→ DATA
→ Requirements
→ Domain owners
→ WEUC / architecture evidence
→ delivery constraints
→ existing practical evidence
→ active Concern Groups / Decisions
```

without reading unrelated files and without reconstructing upstream truth.

Then:

```text
Projected Updated SL-06
→ dependency impact
→ explicit Pre-Update
→ Owner/Reuse Plan
→ relation changes
→ stale/review impact
→ exact files/actions
```

And graph tooling can answer:

```text
what does this command reuse?
what does this Slice depend on?
what depends on this Behavior Item?
which consumers need review after this owner changes?
which links are broken/unresolved?
which files are the minimal context bundle for this UC?
```

while canonical semantic truth remains in the actual Scenario/Domain/Slice/UC/workflow owners.
