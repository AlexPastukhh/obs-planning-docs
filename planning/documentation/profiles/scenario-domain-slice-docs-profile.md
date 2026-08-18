# Scenario / Domain / Slice Docs Profile

Status: active reusable specialized profile
Doc version: v0.5.0-detailed-workspace-aligned
Scope: optional reusable guidance for projects that activate a structured Scenario/Domain/Slice documentation family after application/solution planning is sufficiently stable for detailed behavior work.

Core detailed-planning contract:

[`../application-planning/detailed-planning/README.md`](../application-planning/detailed-planning/README.md)

## 1. Purpose

Use this profile when a project benefits from explicit Scenario workspaces, separately addressable Scenario DATA / Behavior Items, optional Domain owners and Implementation Slices.

This is a specialized profile, not a universal planning stage. An optional Spine Scenario may precede stable Scenario boundaries.

When selected, the dependency direction is:

```text
current application planning / selected application meaning
  → optional Spine while boundaries are unclear
  → detailed Scenario workspaces
  → Scenario DATA / Behavior Items
  → optional Screen spatial owners
  → optional Domain work
  → optional Implementation Slice planning
  → verification / consistency review proportionally
```

## 2. Core Split

```text
Scenario:
  one coherent motivated actor/context + Need/Goal + meaningful observable result;
  pure user-facing and verifiable behavior;
  no implementation design.

Scenario DATA:
  user-visible or scenario-relevant values that the actor enters,
  selects, sees, filters/searches, attaches, reviews or receives;
  not a domain model, DTO, API contract, database schema or UI-component state.

Behavior Item:
  one stable addressable unit of required behavior inside a Scenario;
  precondition, entry, step, include, branch, invariant,
  postcondition, acceptance or observable outcome;
  not an implementation task or Slice.

Screen:
  spatial / visual owner for an application surface;
  may map related Scenarios to zones/states;
  does not own Scenario behavior or duplicate Scenario DATA/Behavior.

Domain:
  conceptual model, language, lifecycle, rules and boundaries
  discovered after scenario behavior is understood.

Slice:
  separately deliverable/checkable integrated implementation increment
  planned after enough Scenario/relevant Domain meaning is understood.
```

## 3. Scenario Workspace Contract

A detailed Scenario uses a folder workspace:

```text
SCN-X/
├── README.md
├── scenario.md
├── ideas/
├── data/
├── behavior/
└── visual/
```

The parent Scenario collection also provides shared `ideas/`, `data/`, `behavior/` and `visual/` areas for meaning that genuinely applies to several Scenarios.

Use neutral `.gitkeep` placeholders for empty required structural directories. Keep the canonical folder semantics in the detailed-planning owner instead of duplicating explanatory README text throughout project trees.

The current selected Scenario owner/Variant owns current detailed behavior. While the root design is selected, that owner is the root Scenario file; if a nested integrated Variant becomes selected, that Variant's Scenario file becomes the current behavioral owner. `README.md` owns workspace navigation/topology and routes to exactly one current selected Scenario owner/Variant.

Recommended Scenario content includes:

```text
Scenario ID and title
actor / application context
starting situation / motivational trigger
Need / motivation
goal
Actor Understanding / Plan when material
entry points / preconditions
main flow
runtime branches / invariants
postconditions / acceptance / observable outcomes
Scenario DATA references
Behavior Item references
visual / Screen references
Current Decisions
Questions / Risks / Problems relative to Current Draft Plan
Potential Better Routes when material
source / Idea provenance references when useful
```

## 4. Addressable Planning Objects And Reference Object Candidates

Scenario, Scenario DATA and Behavior Items are independently addressable planning objects/owners where that improves review/linking/change impact.

They are **not automatically live Linked Notes Reference Objects**.

A canonical literal value from one of these owners is a `Reference Object Candidate` when:

```text
- one defining file/context canonically establishes the value;
- the value is the result of real planning/reasoning/decision work there;
- other files may need to reproduce that exact literal value;
- those consumers should not silently drift into independent approximations;
- if the definition changes, identifying stale materialized copies would be useful.
```

Ordinary semantic relationships use ordinary repository links. A candidate is materialized through Linked Notes only when literal synchronization/stale-copy checking is genuinely needed.

Repository-facing Linked Notes route:

1. [`../../../.linked-notes/AGENT-GUIDE.md`](../../../.linked-notes/AGENT-GUIDE.md)
2. [`../../../.linked-notes/REFERENCE-OBJECTS.md`](../../../.linked-notes/REFERENCE-OBJECTS.md)
3. inspect [`../../../.linked-notes/reference-objects.json`](../../../.linked-notes/reference-objects.json) only when current live registry state matters.

## 5. Scenario DATA Rules

Add DATA only when supported by explicit source or checked current facts and needed for Scenario behavior, validation, selection, filtering/search, access/security behavior or observable results.

Do not add fields merely because they are common in applications. Keep unknown DATA absent or explicit as an unresolved finding.

Within `data/`, one DATA item may use a dedicated file or multiple items may share one registry. Separate addressable ownership does not require one file per object.

Meaning shared by several Scenarios belongs in the parent `scenario-drafts/data/` area rather than being copied into every Scenario.

## 6. Behavior Item Rules

Behavior Items are separately addressable planning objects. Each one normally has:

```text
Behavior Item ID
parent/shared Scenario scope
type
required observable behavior
Scenario DATA references when applicable
related Idea/source provenance when useful
current review/status markers when supported
```

Responsibility-layer classification is later analysis. Do not put controllers, handlers, repositories, tables, framework components, storage mechanisms or exact implementation seams into clean Behavior Items.

Meaning shared by several Scenarios belongs in the shared Scenario `behavior/` area.

## 7. Variants

Do not create an explicit first Variant while only one integrated design exists.

When a second materially different Scenario/Screen/Domain/Slice design appears, the current/root design may be identified as VAR-A while the second becomes VAR-B. The first Variant does not have to be moved physically under `variants/`.

Variant selection must be explicit (`selected`, `not-selected`, `candidate`) in workspace navigation and should be mirrored in filenames/folder names using the project's consistent convention.

Variant-local Ideas/DATA/Behavior/Visual represent real differences only. Unchanged meaning continues to resolve to parent/shared owners.

Runtime Branches and Idea Variants are not automatically whole Planning Unit Variants.

## 8. Domain / Slice Boundaries

Domain workspaces use a Domain owner + `ideas/`, with `variants/` only when a second integrated Domain design exists. Domain does not need a default `visual/` area.

Slice workspaces keep one integrated Slice owner plus `ideas/` and `visual/`. A simple Slice may stay one implementation file; a richer Slice may split responsibility plans such as `frontend.md`, `server.md` and `verification.md` without losing the integrated Slice owner.

Do not treat Behavior Items as Slices. Do not add a mandatory Feature layer between behavior and Slice.

## 9. Current Draft State

Detailed planning owners use the shared contract from the core detailed-planning workflow:

```text
Current Decisions
Questions / Risks / Problems
  → Current Draft Plan
  → Finding
  → Relation / Impact On Current Draft Plan
Potential Simplifications / Better Routes when material
```

Resolved findings leave aggregate Q/R/P. Selected Better Routes leave the candidate section and become current draft meaning.

## 10. Source / Idea / Current-Owner Traceability

Preserve links only where they materially improve provenance/change review.

```text
- do not copy complete Idea/source bodies into Scenario owners;
- one question has one primary Idea workspace;
- later Domain/Slice artifacts reference Scenario/Behavior identity instead of copying whole Scenario flow;
- a related source/Idea/current-owner change creates review need, not automatic rewrite.
```

## 11. Boundaries

```text
- Do not force this profile on projects that do not use Scenario/Domain/Slice planning.
- Do not turn every view, button, rule or workflow step into a peer Scenario.
- Do not use one Need alone as a Scenario boundary; require a meaningful observable result.
- Do not treat Scenario DATA as Domain/persistence design.
- Do not treat Behavior Items as Slices.
- Do not treat Screen owners as behavioral owners.
- Do not create Screen-local DATA/Behavior copies.
- Do not update upstream Ideas/current owners automatically from downstream deep planning.
- Do not make source changes silently rewrite dependent owners.
- Do not treat ordinary semantic links as Linked Notes Reference Objects.
- Do not require one physical file per addressable DATA/Behavior object.
- Do not create per-workspace action logs unless a real registered parallel-work scope exists.
- Keep project-specific routes in the project root Command Routing.
- Keep reusable route setup in the field kit.
```

Related setup kit:

`planning/documentation/profiles/scenario-domain-slice-use-case-field-kit.md`
