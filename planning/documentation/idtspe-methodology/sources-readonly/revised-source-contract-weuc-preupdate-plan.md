# Revised Planning Capture — Idea-Driven Target-State Planning Source Contract, WEUC and Dependency-Aware Pre-Update

Status: planning capture / no repository mutation  
Revision intent: replace the earlier premature graph decision with an explicit question; make Sources, Source Contract and WEUC relevance first-class reusable parts of the `собери идеи` shell.

# 1. Selected Core Direction

Use one reusable planning engine:

**Idea-Driven Target-State Planning Engine**

Its job is not to own Scenario/Domain/Slice/Documentation semantics.

Its reusable contract is:

```text
New Ideas
+ Target Contract
+ Source Contract
+ Mode: CREATE | INTEGRATE
↓
Idea Review
↓
Concern Groups / Q/R/P
↓
Variants / Decisions
↓
Projected Target State
↓
Dependency / reuse impact
↓
WEUC relevance / architecture handoff
↓
Pre-Update
```

Target-specific workflows/templates remain semantic owners of valid target state.

# 2. Why "Source Contract" Is Required

`собери идеи + Target` must never silently invent the context from which it plans.

Every material invocation should identify the canonical sources it actually uses.

A Source Contract answers:

```text
What information is allowed to influence this Target?
Which source is authoritative for which kind of meaning?
Which source is evidence only?
Which source is a delivery constraint?
Which source is the Current Target baseline?
Which source represents Workspace evolution / WEUC pressure?
Which source must be reviewed if another source changes?
```

The Source Contract is reusable shell infrastructure.

The target-specific owner decides which source types are required/proportional.

# 3. Source Roles

Do not treat every input as the same kind of "source".

Minimum reusable roles:

## `IDEA_SOURCE`

New Ideas / discussion / returned review / observation that triggered planning.

## `CANONICAL_SEMANTIC_SOURCE`

Current semantic truth owned elsewhere.

Examples:

- Need / Current Reality;
- Real-Life Scenario;
- Application Scenario;
- Behavior Item;
- DATA Object;
- Requirement;
- Screen;
- Domain Entity / Value Object / Aggregate / Root / Policy / invariant;
- Workspace Use Case;
- current documentation Use Case;
- current Direction/registry owner.

## `CURRENT_TARGET`

Existing canonical target baseline for INTEGRATE.

Examples:

- Current Scenario;
- Current Domain;
- Current Slice;
- current documentation workflow/model/template/registry state.

## `PRACTICAL_EVIDENCE`

Evidence from actual use/implementation/testing/operations.

Examples:

- executed tests;
- implementation result;
- runtime incident;
- ReviewDiff;
- user acceptance result;
- observed maintenance cost.

Evidence can require correction, but it does not silently become upstream semantic authority.

## `ARCHITECTURE_EVOLUTION_SOURCE`

Workspace architecture/evolution evidence.

Examples:

- current Workspace UCs;
- contextual WEUC Instances;
- Workspace Change Paths;
- Change Pressure;
- Change Axes;
- Architecture Decisions;
- important understanding/mutation/verification/runtime paths.

## `DELIVERY_CONSTRAINT`

Examples:

- deadline;
- milestone;
- release order;
- capacity;
- external dependency;
- operational limitation.

Delivery constraints may change decomposition/order, not silently rewrite semantic truth.

## `PLANNING_STATE_SOURCE`

Existing:

- Concern Groups;
- Q/R/P;
- Decisions;
- deferred/carry-forward Items;
- selected variants.

## `DEPENDENCY_SOURCE`

Existing relation/freshness information relevant to the target:

- semantic owner dependencies;
- Linked Notes Reference Objects;
- Reference Object dependent fragments;
- whole-file Review Dependencies;
- ordinary canonical links;
- generated/indexed dependency information when available.

# 4. Source Contract Record

A reusable source record should conceptually contain:

```text
Source:
  identity/path: <stable id and/or canonical path>
  role: <IDEA_SOURCE | CANONICAL_SEMANTIC_SOURCE | ...>
  relationToTarget: <covers / derived-from / uses / constrains / informs / baseline / evidence-for / ...>
  authority:
    canonical | evidence | constraint | planning-state | projection
  requiredness:
    required | proportional | optional
  freshness:
    current-required | best-available | historical-evidence
  reviewObligation:
    none | explicit-review-dependency | reference-object-dependency
  reason:
    <why this source matters to this target>
```

This is a conceptual contract first.

Exact repository syntax/markers are not yet selected.

# 5. Source Contract Rule For The Idea Shell

The reusable Idea shell owns this algorithm:

```text
resolve Target Type
↓
resolve CREATE / INTEGRATE
↓
ask Target owner for Source Contract requirements
↓
resolve concrete sources
↓
show/record which sources were actually used
↓
Idea Review
↓
Target integration
```

The shell must not hard-code the complete Scenario/Domain/Slice source taxonomy.

The target owner supplies it.

# 6. CREATE vs INTEGRATE

## CREATE

```text
CURRENT_TARGET = none

New Ideas
+ canonical upstream sources
+ architecture/evolution sources where material
+ delivery constraints
+ planning state
↓
Projected Initial Target
```

## INTEGRATE

```text
CURRENT_TARGET = canonical existing target

New Ideas
+ Current Target
+ same canonical upstream sources
+ practical evidence
+ architecture/evolution sources
+ constraints
+ existing planning state
↓
Projected Updated Target
+ Delta
+ Preserved Existing Meaning
```

INTEGRATE preserves valid existing meaning unless a material reason changes it.

# 7. Directed SDS Source Contracts

The direction remains:

```text
Real-Life Need / Reality / Real-Life Scenario
↓
Application Scenario
↓
Behavior Items + DATA
↓
Requirements / Screens
↓
Domain
↓
Slice Strategy / Slices
↓
Implementation / Test Evidence
```

Each lower layer consumes the current canonical identities of the upper layers.

It does not recreate their full semantic bodies.

# 8. Scenario Source Contract

Typical sources:

```text
IDEA_SOURCE:
  new Scenario-related Ideas

CANONICAL_SEMANTIC_SOURCE:
  Need
  Current Reality
  Real-Life Scenario
  selected Solution/Application responsibility

CURRENT_TARGET:
  selected Scenario when INTEGRATE

PRACTICAL_EVIDENCE:
  prototype/user evidence when material

PLANNING_STATE_SOURCE:
  Scenario-attached Q/R/P / Decisions
```

Result remains owned by Scenario workflow/template:

```text
Scenario
+ Behavior Items
+ DATA Objects
+ Requirements/Screens when material
```

# 9. Domain Source Contract

Typical sources:

```text
IDEA_SOURCE:
  new Domain-related Ideas

CANONICAL_SEMANTIC_SOURCE:
  Application Scenarios
  Behavior Items
  DATA Objects
  Requirements when material

CURRENT_TARGET:
  Current Domain when INTEGRATE

PRACTICAL_EVIDENCE:
  implementation/test evidence when it reveals actual invariant/lifecycle pressure

PLANNING_STATE_SOURCE:
  Domain concerns / Decisions
```

The Domain layer canonicalizes:

- Entities;
- Value Objects;
- Aggregates / Roots;
- policies;
- invariants;
- lifecycle;
- ownership/reference rules.

# 10. Slice Source Contract

Typical sources:

## Semantic

- Application Scenario(s);
- Behavior Items;
- DATA Objects;
- Requirements;
- Screens;
- canonical Domain owners.

## Architecture / evolution

- current Workspace UCs;
- contextual WEUC Instances;
- Workspace Change Paths;
- Change Pressure / Change Axes;
- existing Architecture Decisions.

## Delivery

- deadlines;
- milestones;
- dependencies;
- release/order constraints;
- capacity.

## Idea

- New Slice Ideas.

## INTEGRATE additional

- Current Slice;
- implementation history;
- executed test evidence;
- operational evidence;
- observed change/maintenance cost.

# 11. WEUC As A First-Class Source Class

WEUC state is not just an optional Architecture appendix.

It is an `ARCHITECTURE_EVOLUTION_SOURCE` for a concrete development/change process.

The question it contributes is:

> Given the current/future work developers repeatedly perform in this workspace, what realization makes the selected Target cheaper, safer and more local to evolve?

WEUC never owns user/Application behavior.

Correct relationship:

```text
Scenario / Behavior / Domain
→ what must be true for the product

Workspace UC / WEUC / Change Path
→ what developers repeatedly need to understand/change/verify

both
→ realization / architecture / Slice / documentation-maintenance choices
```

# 12. Mandatory WEUC Relevance Check

Every **material** target-state planning operation that can change repository/documentation/implementation structure should run a WEUC relevance check.

The check is mandatory.

A material WEUC finding is not mandatory.

Output:

```text
WEUC Relevance Check:
  affected Workspace UCs:
    <ids / none>

  relevant current WEUC instances:
    <ids / none>

  recurring change/understanding/verification paths affected:
    <paths / none>

  new/change-pressure evidence:
    <finding / none>

  architecture handoff:
    required | not material

  WEUC maintenance handoff:
    establish/update candidate | none
```

Thus even a valid result can be:

```text
WEUC relevance checked
→ no material WEUC/architecture impact
```

# 13. Canonical WEUC Maintenance For Documentation

Documentation changes are Workspace evolution too.

The methodology should permanently require:

```text
material documentation change
↓
resolve affected documentation/Workspace UC(s)
↓
WEUC relevance check
↓
does this change alter a recurring documentation-development operation?
  no → record no material WEUC impact
  yes
    ↓
  reuse current WEUC if it already owns the change pattern
  or
  hand off to WEUC discovery/establishment
↓
if path/work-cost materially changes
→ Change Pressure / Architecture review
```

Examples of recurring documentation-development work that may be architecture-relevant:

- add/change a planning command;
- add/change a current UC;
- update a semantic owner and its dependents;
- create/change a reusable template/workflow/model;
- introduce a new dependency relation;
- review stale dependents after owner change;
- build/review package transitions;
- maintain generated Helper/Linked Notes projections.

These are not automatically separate WEUCs; current WEUC discovery rules still decide independent usefulness and architecture relevance.

# 14. `собери идеи документации`

A dedicated high-level command is justified as a reusable shortcut over the generic Idea shell.

Proposed command:

```text
собери идеи документации
```

Meaning:

```text
New documentation/methodology/tooling Ideas
+
current documentation Target(s)
+
documentation governance
+
affected Workspace/documentation UCs
+
dependency/reuse state
+
WEUC relevance state
+
existing concerns/decisions
↓
Idea Review
↓
Projected Documentation Target State
↓
Q/R/P / Decisions
↓
dependency impact
↓
WEUC/architecture handoff
↓
explicit Pre-Update continuation
```

It should not become a new semantic documentation authority.

It orchestrates existing documentation/Workspace UCs.

# 15. Documentation Idea Source Contract

Typical sources:

```text
IDEA_SOURCE:
  new documentation Ideas

CANONICAL_SEMANTIC_SOURCE:
  affected Direction / UC / Scenario
  current reusable/project owner
  documentation architecture/governance owner
  current template/workflow/model/registry as applicable

CURRENT_TARGET:
  current documentation target for INTEGRATE

DEPENDENCY_SOURCE:
  current semantic dependencies
  Review Dependencies
  Reference Objects / dependent fragments
  generated projections

ARCHITECTURE_EVOLUTION_SOURCE:
  affected Workspace UCs
  relevant WEUC instances
  Change Paths / Change Pressure

PRACTICAL_EVIDENCE:
  ReviewDiff
  validation/test output
  actual usage problems
  navigation/discoverability evidence

PLANNING_STATE_SOURCE:
  current Q/R/P / Concern Groups / Decisions

DELIVERY_CONSTRAINT:
  release/deadline/scope constraints when material
```

# 16. Dependency-Aware Pre-Update

Expand Pre-Update into:

```text
Projected Target State
↓
1. Owner / Reuse Plan
2. Source / Dependency Plan
3. WEUC / Workspace Evolution Impact
4. File / Artifact Relation Plan
5. Freshness / Review-Dependency Plan
6. Generated Projection / Index Plan
7. Ordered File Update Plan
8. Validation / Closure Plan
```

## Owner / Reuse Plan

For each planned meaning:

```text
meaning
→ existing owner to reuse?
→ new owner justified?
→ projection only?
```

## Source / Dependency Plan

For every changed target:

```text
which Source Contract edges are added/changed/removed?
```

## WEUC Impact

Explicit mandatory check described above.

## File Relation Plan

Choose the narrowest suitable representation:

- stable ID / Markdown link;
- ordinary semantic relation;
- Reference Object;
- Reference Object dependent fragment;
- Review Dependency;
- Ordered Reference List;
- generated projection/index.

# 17. Linked Notes Direction

The desired direction is to make **all Source Contract source classes queryable/resolvable through Linked Notes-like infrastructure**.

This does not mean Linked Notes becomes their semantic owner.

Linked Notes should ideally be able to resolve and expose:

```text
Target
→ canonical semantic sources
→ current target
→ practical evidence
→ architecture/WEUC sources
→ constraints
→ planning state
→ dependency/freshness state
```

# 18. Possible Linked Notes Extension — Typed Source / Semantic Relations

Question, not selected implementation.

Potential capability:

```text
Typed Source Relations
```

Could support:

- source identity;
- target identity;
- source role;
- relation type;
- authority class;
- owner path;
- current/historical state;
- optional associated Review Dependency;
- optional Reference Object relation.

Queries:

```text
sources(target)
targets(source)
context(target)
dependents(source)
reviewRequired(source)
weucContext(target)
```

# 19. IMPORTANT: Graphs Are An Open Question

The previous plan prematurely selected generated UC/command graphs.

Replace that with:

## `Q-GRAPH-01 — Do explicit/generated UC/command composition graphs provide enough value to justify the extra model/index?`

Status: **open question**.

Potential benefits:

- easier inspection of reusable stages;
- harder to omit an orchestration step;
- better ChatGPT context bundles;
- easier impact/navigation review.

Potential costs:

- more metadata/schema;
- false sense that projection is authority;
- graph complexity for simple commands/UCs;
- need for generation/validation tooling;
- possible duplication of information already derivable from ownerFiles/registries/workflows.

Current rule:

```text
Do not make current Source Contract / Pre-Update / WEUC work depend on graph support.
```

Prototype graph projection only after typed sources/dependencies are stable.

# 20. Composition Inspection Without A Graph Registry

Before deciding Q-GRAPH-01, use derivable information:

```text
command
→ semantic UC / Direction
→ ownerFiles
→ reusable workflow owners
→ Target Contract
→ Source Contract
→ handoffs
```

If this is sufficient for completeness checks, no new graph registry is needed.

If not, test a generated projection.

Never maintain a second hand-written graph authority.

# 21. ChatGPT / Agent Tool Direction

Also not required for the first methodology step.

Desired later read-only interface:

```text
resolveTarget(...)
sources(target)
contextBundle(target | uc | command)
weucContext(target)
dependencyImpact(changedSources)
reviewState(target)
validateSources(target)
```

`contextBundle` should return the **minimal canonical set** needed for the requested operation.

Example:

```text
contextBundle("собери идеи документации")
→ Idea shell owners
→ affected documentation UCs
→ current targets
→ canonical semantic sources
→ dependency state
→ WEUC state
→ Q/R/P / Decisions
→ stale/review-needed sources
```

This can support command governance reuse without rereading unrelated files.

# 22. Concern Groups

## `CG-SOURCE-CONTRACT` — Correct inputs to target planning

Shared resolution surface:
typed Source Contract.

Members:

- `P-SRC-01` — planning may silently omit an upstream canonical source.
- `P-SRC-02` — planning may use duplicated/non-authoritative source text.
- `Q-SRC-03` — exact required/proportional source types per Target.
- `Q-SRC-04` — repository representation of Source Contract declarations.
- `R-SRC-05` — too rigid a source schema could force irrelevant reads.

## `CG-WEUC-DOCS` — Workspace evolution evidence for documentation

Shared resolution surface:
mandatory proportional WEUC relevance check.

Members:

- `P-WEUC-01` — documentation changes may ignore recurring workspace work-cost.
- `R-WEUC-02` — every documentation edit could incorrectly create a new WEUC.
- `Q-WEUC-03` — where project-local/documentation WEUC instances are persistently owned.
- `Q-WEUC-04` — when a documentation change is material enough to update WEUC/Change Pressure evidence.

Current direction:
always check; update/create only when material and justified.

## `CG-LN-SOURCES` — Linked Notes source/dependency representation

Shared resolution surface:
typed relation/query support over existing Reference Object/Review Dependency mechanisms.

Members:

- `P-LN-01` — current mechanisms do not represent every Source Contract role as a queryable relation.
- `R-LN-02` — making every semantic link a Review Dependency would create false stale cascades.
- `Q-LN-03` — whether typed semantic/source relations belong in Linked Notes repository state.
- `Q-LN-04` — exact relation schema and stable identity model.
- `Q-LN-05` — whether ChatGPT needs direct tool access or copied context bundles are sufficient.

## `CG-GRAPH-VALUE` — Is a generated composition graph worth it?

Shared resolution surface:
evidence/prototype, not current implementation.

Members:

- `Q-GRAPH-01` — does a graph materially reduce missed stages?
- `Q-GRAPH-02` — which edges are not already derivable?
- `R-GRAPH-03` — projection may become mistaken for authority.
- `R-GRAPH-04` — extra schema/tooling may outweigh benefits.

No Decision yet.

# 23. Current Decisions

## D-01 — Introduce Source Contract as reusable Idea-shell concept

Selected direction.

## D-02 — Require named/typed sources for material Idea-driven integration

Selected direction.

The exact file syntax is still open.

## D-03 — Treat WEUC/Workspace evolution state as a source class

Selected direction.

## D-04 — Make WEUC relevance check mandatory and proportional for material repository/documentation target-state changes

Selected direction.

"No material WEUC impact" is a valid result.

## D-05 — Add a high-level `собери идеи документации` command

Selected at command-planning level, subject to exact command/UC route review.

It should reuse the generic Idea shell and current documentation/Workspace semantic owners.

## D-06 — Expand Pre-Update with Source/Dependency and WEUC impact planning

Selected direction.

## D-07 — Extend Linked Notes direction toward typed source/dependency queries

Selected as a capability direction, not yet as a specific schema/Scenario implementation.

## D-08 — Graph registry / generated per-UC/per-command graphs are NOT selected

Reclassified as open question `Q-GRAPH-01`.

# 24. File Plan — Methodology

## New proposed owner

`planning/documentation/planning-source-and-dependency-contract.md`

Preferred narrower name than a generic graph model.

Owns:

- Source Contract;
- Source roles;
- authority classes;
- dependency relation semantics;
- freshness/review distinction;
- Source Context resolution;
- WEUC as architecture-evolution source;
- boundary with Linked Notes implementation.

Alternative: merge these concepts into the existing dependency planning owner if that remains coherent after review.

This ownership choice is still a planning decision to verify.

## Update

- `planning/documentation/idea-planning-principles-and-terminology.md`
- `planning/documentation/idea-review-and-planning-workflow.md`
- `planning/documentation/IDEA-REVIEW-TEMPLATE.md`
- `planning/documentation/file-update-overview-workflow.md`
- `planning/documentation/FILE-UPDATE-OVERVIEW-TEMPLATE.md`
- `planning/commands/plan-file-update.command.md`

# 25. File Plan — WEUC / Architecture

Review/update current owners rather than create parallel WEUC methodology:

- `planning/documentation/architecture-planning/workspace-use-cases-and-change-pressure.md`
- `planning/documentation/architecture-planning/workspace-evolution-use-case-discovery-workflow.md`
- `planning/documentation/architecture-planning/workspace-use-case-discovery-workflow.md`
- `planning/documentation/architecture-planning/architecture-change-pressure-workflow.md`
- Architecture Planning UC registry

Add/clarify:

```text
material documentation/repository target change
→ mandatory WEUC relevance check
→ no impact / reuse existing WEUC / handoff to discover/update WEUC
```

# 26. File Plan — Documentation Idea Command

Proposed:

`planning/commands/collect-documentation-ideas.command.md`

Canonical command:

```text
собери идеи документации
```

Potential aliases:

```text
идеи документации
collect documentation ideas
documentation ideas
```

Owner route should include:

- generic Idea owners;
- documentation Direction/UC registry;
- Workspace Planning registry;
- dependency/review workflow;
- architecture WEUC owners;
- affected current semantic owners dynamically.

No new semantic authority in the command.

# 27. File Plan — Target-Specific Source Contracts

Update target owners/templates so the source requirements are explicit:

## Scenario

- solution/scenario planning workflow;
- Scenario template.

## Domain

- domain discovery workflow;
- domain planning workflow;
- Domain template.

## Slice

- slice planning workflow;
- Slice Strategy template;
- Implementation Slice template.

Each should expose:

```text
Required Sources
Proportional Sources
Current Target baseline rule
Evidence boundary
WEUC relevance requirement when realization is material
```

# 28. File Plan — Linked Notes

Do not implement immediately.

First review current Linked Notes scenarios/contracts and decide whether a new independently useful capability is justified:

Possible capability:

```text
Inspect / Resolve Typed Planning Sources And Dependencies
```

Potential implementation surface:

- source/relation registry or markers;
- resolver/index;
- inbound/outbound source queries;
- context bundle;
- WEUC context;
- stale/review integration;
- validation.

Existing Reference Objects and Review Dependencies remain separate mechanisms and should be reused where they are the correct relation type.

# 29. Recommended Order

```text
1. Canonical Source Contract semantics
2. Idea shell CREATE/INTEGRATE uses Source Contract
3. Scenario/Domain/Slice Source Contracts
4. WEUC relevance contract for repository/documentation changes
5. dependency-aware Pre-Update
6. `собери идеи документации`
7. validate on real documentation + Slice cases
8. review Linked Notes typed-source capability
9. only then answer Q-GRAPH-01 with a prototype if needed
10. only after stable query semantics consider direct ChatGPT tool access
```

# 30. Desired Example

User:

```text
собери идеи документации
```

The command should eventually resolve:

```text
NEW IDEAS
  <selected discussion/source>

TARGET
  Documentation planning methodology / affected UC(s)

MODE
  INTEGRATE

SOURCE CONTRACT

CANONICAL_SEMANTIC_SOURCE
  Documentation Direction
  affected documentation UCs
  current workflow/template/model owners

CURRENT_TARGET
  current selected owner files

DEPENDENCY_SOURCE
  current semantic dependencies
  Review Dependencies
  Reference Objects
  generated projections

ARCHITECTURE_EVOLUTION_SOURCE
  affected Workspace UC(s)
  relevant WEUC instances
  change paths / pressure

PRACTICAL_EVIDENCE
  current ReviewDiff/tests/navigation defects when material

PLANNING_STATE_SOURCE
  active Concern Groups / Q/R/P / Decisions
```

Then:

```text
Idea Review
↓
Projected Documentation Target State
↓
Concern Groups / Decisions
↓
Dependency Impact
↓
WEUC Relevance Check
↓
Pre-Update
  Owner/Reuse
  Sources/Dependencies
  WEUC impact
  File relations
  Freshness/review
  exact files/actions
```

This makes the reusable shell explicit while preserving single-source-of-truth ownership in the actual documentation/SDS owners.
