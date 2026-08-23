# Detailed Application Planning Workspaces

Status: active reusable canonical workflow
Scope: current detailed application planning after meaningful Scenario boundaries exist: Scenario Draft workspaces, shared/local supporting meaning, Requirements/dependencies, spatial Screen planning, optional Domain, Slice Strategy / Implementation Slice drafts, integrated Variants, current decisions and Current-Draft-relative review state.

Parent family: [`../README.md`](../README.md)

Shared Planning Concern / generic Decision trace owner: [`../../planning-concerns-and-decisions-model.md`](../../planning-concerns-and-decisions-model.md)

## 1. Purpose

Detailed planning keeps semantic owners explicit without returning to a generic `Planning Draft` layer.

```text
Scenario / Screen / Domain / Slice
= semantic planning owner

Requirement
= must-hold condition owned by its narrowest real semantic owner

Slice Strategy
= optional decomposition/order planning result before individual Slices

workspace folder
= physical organization around that owner
≠ new semantic entity
≠ automatic parallel-work scope
≠ automatic action log
```

No `current-draft.md` type exists. The current draft is the currently selected semantic owner/file for that planning unit.

Prototype planning is upstream of this canonical current-behavior layer. `PSCN-*` Prototype Scenarios and `PSCR-*` Prototype Screens are provisional evidence/design and must not remain competing current owners after selected meaning is promoted into `SCN-*` / `SCR-*`. See [`../prototype-planning-workflow.md`](../prototype-planning-workflow.md).

When a project benefits from physical separation, [`../requirements-and-change-context.md`](../requirements-and-change-context.md) recommends `solution-and-application/` for solution/concept/prototype/current Scenario/Screen/Requirement work and `domain-and-implementation/` for Domain/Slice work. Folder placement is organization only, not semantic ownership or registered scope creation.

## 2. Shared Draft-State Contract

A detailed planning owner keeps current meaning in its normal semantic body and may finish with the following shared state sections:

```text
Current semantic body
+
Current Decisions
+
Area Concern Register — inline or separate when material
+
Planning Concerns / Q/R/P + Concern Groups
  active/residual relative to Current Draft Plan
+
Retained Concern/Decision trace — when material
+
Potential Simplifications / Better Routes
  relative to Current Draft Plan
```

### Current Decisions

Use the generic Decision trace contract from `planning-concerns-and-decisions-model.md` for material selected choices whose rationale/traceability remains useful.

A Decision does not replace the semantic body. Selected meaning must be integrated into the Scenario, Screen, Domain or Slice itself.

Recommended fields when material:

```text
Decision
Rationale
Integrated Into
Affected Owners
Addresses Concerns
Introduced / Exposed Concerns
Related Idea / Variant / Evidence
Reconsider When
```

Only `Decision/Rationale/Integrated Into` are commonly useful; concern relations and other trace fields are proportional. `Affected Owners` means review/integration impact, not silent rewrite authority.

### Area Concern Register / Physical Storage

When this planning area has material persistent/distributed concerns, maintain one logical Area Concern Register. The current physical profile decides where it lives:

```text
small / Mini
→ section in the same owner/application-plan file

Modular / Full / larger owner collection
→ area-root register/concerns file when useful
→ detailed Concern/Group bodies stay next to the real Scenario/Domain/Slice/etc owner
```

Register fields: Concern/Group ID, title, owner, Stored At, Priority, Concern Category, Status, Decision refs when material, Residual state. It is an index/state surface, not the full semantic body.

One logical Concern/Group has one primary detailed storage location. Other Ideas/owners reference the same ID/location rather than copying the full body.

### Planning Concerns / Questions / Risks / Problems

Use the shared Concern model. Active Q/R/P is current-plan delta, while material retained answer/rationale/Decision trace may remain after closure.

A single material Concern states proportionally:

```text
ID / Type
Priority: P0/Critical | P1/High | P2/Normal | P3/Low
Concern Category
Status
Owner / affected meaning
Origin / Provenance
Current Draft Plan
Finding / Relation / Impact
Concern Group when related
AI Comment
Recommendation when justified
Answer / Evidence when applicable
Decision refs when selected/material
Residual state / treatment when applicable
Stored At when cross-file
```

`AI Comment` is useful interpretation, not autonomous user-decision authority. It should separate what Current Plan/evidence implies from what depends on unrecorded user Need/preference/feeling/business priority/risk tolerance. Recommendation is optional; Decision exists only after actual selection.

Group related Q/R/P when they substantially share one answer/evidence/Decision resolution surface. Grouping never erases member Type/Priority/Concern Category/Status.

`Current Draft Plan` is the relevant currently selected baseline of this draft. It may reference a section/range rather than copy the whole draft.

If no material active concern exists, write exactly:

```text
No material unresolved issues identified.
```

Residual Risk/Problem remains active when material even after a related Question is answered. Resolved trivial items leave active Q/R/P. Preserve retained trace only when rationale/decision/residual meaning is materially useful.

### Potential Simplifications / Better Routes

Keep only material unselected candidate changes to the current draft.

Each real unit states:

```text
Related Idea when applicable
Current Draft Plan
Candidate Better Route
Change To Current Draft Plan
Why Potentially Better
Tradeoff / Evidence when material
Status
```

Once selected, the route leaves this section and becomes current semantic meaning + a Current Decision when the choice is material enough to preserve.

### Lifecycle

```text
concern appears
→ group with related Q/R/P when one resolution surface exists
→ scoped Idea / evidence / analysis when useful
→ AI Comment + optional Recommendation
→ answer/evidence and/or one route selected
→ selected meaning integrated into current draft
→ material Decision trace recorded when useful
→ answered/resolved/eliminated item leaves active Q/R/P
→ residual Risk/Problem remains active when material
→ retained trace remains only when useful
→ Area Concern Register/status/storage updated
→ selected route no longer remains Potential Better Route
```

`unapplied` does not mean `unresolved`: once one correction/route is selected, it is current selected meaning even before repository mutation.

## 3. Scenario Draft Workspaces

A detailed Scenario Draft uses a folder workspace with four standard supporting areas:

```text
SCN-X/
├── README.md
├── scenario.md
├── ideas/
├── data/
├── behavior/
└── visual/
```

The four directories are structural areas of Scenario planning:

- `ideas/` — answer-seeking work scoped to this Scenario;
- `data/` — Scenario DATA owners/registries;
- `behavior/` — stable addressable Behavior Items/registries;
- `visual/` — Scenario-specific journey/flow/annotation/visualization material.

When an area has no content yet, a neutral `.gitkeep` placeholder is preferred over repeated explanatory README files. Canonical folder semantics live here, not in duplicated local link text.

The current selected Scenario owner/Variant owns current detailed behavior. While the root design is selected, that owner is the root Scenario file; if a nested integrated Variant becomes selected, that Variant's Scenario file becomes the current behavioral owner. `README.md` owns local navigation/topology/status and routes to exactly one current selected Scenario owner/Variant.

Scenario identity is behavioral rather than command-/UI-/implementation-shaped:

```text
meaningful user-world Need
+ user/actor-visible behavior or information interaction
+ independently meaningful observable result
→ Scenario candidate
```

A read-only/informational flow may be a valid Scenario when obtaining reliable information or understanding is itself an independently meaningful result. A command, button, Screen, API call, database mutation, backend operation or technical procedure is not a Scenario merely because it is addressable. Such actions/operations remain inside a parent Scenario unless the Need/result boundary independently justifies a separate Scenario.

### Shared Scenario-Draft Areas

Meaning shared by several Scenario Drafts belongs at the Scenario collection level rather than being copied into each Scenario:

```text
scenario-drafts/
├── README.md
├── ideas/
├── data/
├── behavior/
├── visual/
├── SCN-A/
└── SCN-B/
```

Placement rule:

```text
true only for one Scenario
→ that Scenario workspace

true for several Scenario Drafts
→ shared scenario-drafts area

owned by another semantic responsibility
→ link the real canonical owner
```

Within `data/` or `behavior/`, one object may be a dedicated file or several objects may share a registry file. Separate logical/addressable ownership does not require one physical file per item.

### Requirements In Detailed Scenario Work

A Scenario should make relevant must-hold conditions discoverable without turning Requirement identity into Scenario identity.

```text
Scenario Need / Result
→ why/what meaningful behavior exists

Related Requirements
→ conditions/constraints that current behavior must satisfy
```

A Requirement true only for this Scenario may be owned locally; shared/application Requirements link their canonical owner. A technical mechanism remains a Requirement/implementation constraint rather than a Scenario merely because it is mandatory. Apply [`../requirements-and-change-context.md`](../requirements-and-change-context.md).

## 4. Scoped Ideas

Use the generic Idea methodology inside `ideas/`.

Do not create an Idea file for every small question. A question may remain in Q/R/P until real answer-seeking work is useful.

Placement follows where the question is actually true:

```text
application-wide question
→ application-level ideas/

shared Scenario question
→ scenario-drafts/ideas/

Scenario-specific question
→ SCN-X/ideas/

Variant-specific question
→ that Variant's ideas/
```

One question has one primary Idea workspace. Other affected owners link it rather than maintain duplicate Idea copies.

When a detailed-draft Concern/Q/R/P relates to Idea(s), use the shared Concern storage rule:

```text
one logical Concern / Concern Group
→ one primary detailed storage location

Related Idea(s)
→ reference Concern/Group ID + location + useful relation/provenance

If the Idea is itself the selected detailed storage owner
→ full concern body may live there
```

Do not maintain the former full same-ID mirror in both an aggregate/owner and one Idea. The Area Concern Register provides durable discoverability when concerns are distributed.

## 5. Planning Unit Variants

A Planning Unit Variant is an integrated alternative design of the whole relevant Scenario, Screen, Domain or Slice.

It is not:

```text
runtime Branch
Idea Variant answering one local question
small implementation alternative
ordinary document revision
```

### Activate Variants Only When A Second Integrated Design Exists

With one design, do not create `VAR-A` ceremony:

```text
SCN-X/
├── scenario.md
├── ideas/
├── data/
├── behavior/
└── visual/
```

The root draft is the implicit first/default integrated design.

When a materially distinct second design appears, the existing root draft may be assigned an explicit `VAR-A` identity and the alternative becomes `VAR-B`.

A practical physical form is:

```text
SCN-X/
├── README.md
├── scenario--VAR-A--selected.md
├── ideas/
├── data/
├── behavior/
├── visual/
└── variants/
    └── VAR-B-candidate/
        ├── scenario.md
        ├── ideas/
        ├── data/
        ├── behavior/
        └── visual/
```

The first Variant does not have to be moved under `variants/`. For evaluation, root VAR-A and nested VAR-B are semantic peers even when their physical layouts differ.

Selection state must be explicit in workspace navigation and should be visible in Variant file/folder naming using the repository's consistent `selected`, `not-selected` and `candidate` convention. Do not rely on filename alone: the workspace `README.md` routes to the one current selected Variant.

If a non-root Variant becomes selected, update the selected/not-selected markers and the workspace route. Physical relocation of the old first Variant is optional.

Exactly one integrated Variant is current-selected at a time.

### Variant Supporting Meaning

Do not copy all parent material into every Variant.

Resolve supporting meaning in this order:

```text
1. Variant-local owner, when it exists;
2. Scenario-local owner;
3. shared scenario-drafts owner;
4. other real canonical owner via link.
```

Variant-local `ideas/`, `data/`, `behavior/` or `visual/` represents material that differs for that Variant. Shared unchanged meaning stays shared.

A Variant may become self-contained when that materially improves review, but duplication is never required merely for visual symmetry.

### Evaluation

A material Variant is evaluated both locally and integratively:

```text
Local Evaluation
→ does this design work for this planning unit?

Integrated Evaluation
→ effect on neighboring Scenarios / Screens / Domain / Slices
→ effect on whole Application / Whole Solution when material
```

Best local Variant is not automatically best integrated solution.

## 6. Screens: Spatial / Visual Owners

`screens/` is a sibling spatial/visual application-planning area when the selected Application responsibility has screen/surface UI.

```text
screens/
├── README.md
├── ideas/
├── visual/
└── SCR-X/
    ├── README.md
    ├── screen.md
    ├── ideas/
    └── visual/
```

Screen responsibility is deliberately narrow:

```text
Scenario
→ behavioral composition / actor understanding / result / acceptance

Screen
→ spatial boundary / zones / composition / visual states
```

A Screen may list which Scenarios use it and which spatial areas those Scenarios occupy. That relation does not transfer behavioral authority to the Screen.

Every material Scenario ↔ Screen relation must be discoverable from both owners:

```text
Scenario
→ Screen + role in Scenario + relevant flow/behavior range

Screen
→ Scenario + Screen role / zones / visual states used
```

This is reciprocal navigation/traceability, not duplicated behavioral ownership. An application-level Scenario × Screen coverage matrix may be maintained when useful, but it is a derived projection rather than a third canonical owner of the relationship. A one-sided material relation is a consistency finding.

Do not create Screen-local `data/` or `behavior/` folders. DATA/Behavior meaning stays with Scenario/shared Scenario owners or another real semantic owner.

`visual/` under a Screen may contain wireframes, annotated mockups, layout/state maps, responsive arrangements and spatial hierarchy.

`Scenario/visual/` remains distinct: it visualizes a Scenario journey/flow/transition and may reference canonical Screen owners.

Screen owns selected **spatial requirements** such as zone hierarchy, placement, visibility/arrangement and material layout/visual states. Scenario/Behavior owns the behavioral condition/meaning of actions and transitions. A frontend Slice plan owns how those selected requirements are implemented; it must not become a second Screen/Scenario requirements authority.

Screen Variants use the same second-integrated-design rule when materially different spatial designs exist.

Applications without screen/surface UI do not create meaningless `screens/` structure.

## 7. Domain Workspaces

Create a separate Domain only when conceptual language/lifecycle/rules/boundaries materially benefit from independent ownership.

Canonical planning algorithm: [`../domain-planning-workflow.md`](../domain-planning-workflow.md).

Recommended rich shape:

```text
DOM-X/
├── README.md
├── domain.md
├── ideas/
└── variants/       # only when a second integrated Domain design exists
```

Domain does not need `visual/` by default.

`domain.md` owns concepts, relationships, lifecycle, rules/invariants, policy/variation distinctions and conceptual boundaries. It references Scenario/Behavior/Requirement meaning that motivated the Domain without copying Scenario behavior as Domain truth.

Domain planning reads current Requirements/Scenarios first, then uses evidence-backed Change Axes to test change propagation. The target is:

```text
simplest correct current model
+ cheap justified evolution
≠ maximum theoretical extensibility
```

A speculative future possibility does not justify an abstraction by itself. Relevant implementation-scoped Ideas remain Ideas until selected and integrated into Domain current meaning.

## 8. Slice Strategy / Implementation Slice Workspaces

Canonical planning algorithm: [`../slice-planning-workflow.md`](../slice-planning-workflow.md).

### Slice Strategy — When Useful

Use `UC-PLAN-SLICE-STRATEGY` when choosing decomposition/order is itself material. The strategy owns the selected set/order of vertical increments, dependencies and delivery/learning/risk rationale. It is not required for trivial work.

Recommended shape may use [`../templates/SLICE-STRATEGY-DRAFT-TEMPLATE.md`](../templates/SLICE-STRATEGY-DRAFT-TEMPLATE.md).

### One Implementation Slice

A Slice is one separately deliverable/checkable integrated increment after enough behavior/domain meaning is understood.

Recommended rich shape:

```text
SL-X/
├── README.md
├── slice.md
├── ideas/
├── visual/
├── frontend.md       # optional implementation-part plan
├── server.md         # optional implementation-part plan
├── verification.md   # optional local verification plan
└── variants/         # when a second integrated Slice design exists
```

`slice.md` owns the integrated vertical delivery boundary/result. It links covered Scenarios/Behavior, Requirements, Domain meaning and the selected Slice Strategy when present.

A simple Slice may keep the implementation plan entirely in `slice.md`. A richer Slice may split implementation-part plans such as `frontend.md`, `server.md` or another real responsibility-specific file while `slice.md` remains the integrated owner. These implementation-part plans are not separate planning Use Cases by default.

`visual/` is presentation/implementation-support visualization and is not the same as Screen spatial authority or frontend implementation planning.

Change Axes may influence coupling/seams but do not automatically require generalization. Implementation-scoped Ideas promoted into one Slice become selected Slice meaning; the originating Idea may retain provenance but not duplicate current implementation authority.

`Feature` does not become a required extra semantic layer merely because a Slice has a product-facing feature name.

## 9. Verification / Testing

Local verification derives from current semantic owners:

```text
Scenario Acceptance
+ Behavior Items
+ Requirements
+ Domain invariants when present
+ Slice verification target
→ planned verification evidence
```

A Slice may use `verification.md`. If testing grows into an independent cross-Slice responsibility, route shared strategy through sibling Testing Planning (`UC-PLAN-TEST-STRATEGY`) and materialize a project-local testing owner/workspace when useful. Tests provide evidence; they do not redefine Scenario/Domain truth merely because a test currently expects something.

## 10. Cross-File Links And Reference Object Candidates

Ordinary semantic relationships use ordinary repository links.

Examples:

```text
Scenario → Screen
Scenario → Requirement
Scenario → Domain
Slice → Requirement / Behavior Item
Domain → Scenario DATA / Change Axis
```

These relations alone are not Linked Notes Reference Objects.

### Reference Object Candidate

A `Reference Object Candidate` is canonical literal meaning/value that:

1. is established in one defining file and that file's semantic context;
2. is the result of real planning/reasoning/decision work there;
3. may need to be materially reproduced in one or more other files;
4. consumers need to rely on exactly that canonical literal value rather than an independently rewritten approximation; and
5. if the definition changes, it is useful to identify which materialized copies may now be stale and require explicit review/update.

Practical test:

```text
If I change this definition here tomorrow,
could several other files silently keep an old literal copy,
and would I want tooling to tell me exactly which copies need review?

Yes → strong Reference Object Candidate.
No  → ordinary link or context-specific prose is usually better.
```

A whole Scenario/Data/Behavior object is not automatically a live Reference Object. Often only one stable literal fragment is a useful candidate.

A context-specific paraphrase may intentionally differ and should not be forced into literal synchronization.

### Consumer-Side Candidate Discovery

A consuming file may be the first place where exact cross-file reuse becomes visible. When useful, record the dependency proportionally:

```text
Source Owner:
  <canonical semantic owner>

Canonical Meaning / Fragment:
  <identify the source meaning; do not redefine it here>

Use Here:
  <why this owner consumes it>

Usage Mode:
  semantic link / intentional paraphrase / exact-literal candidate

Reference Object Candidate:
  yes / no

Materialized Linked Notes RO:
  no / existing ro_* when actually applicable
```

A consumer-side candidate note does not create a second canonical definition. Prefer an ordinary link or intentional paraphrase unless exact literal equality and stale-copy review are genuinely valuable.

### Linked Notes Materialization

When a candidate genuinely needs literal stale-copy detection/synchronization, it may be materialized with the repository Linked Notes Reference Object mechanism.

Read only the repository-facing contract unless Linked Notes development itself is in scope:

1. [`../../../../.linked-notes/AGENT-GUIDE.md`](../../../../.linked-notes/AGENT-GUIDE.md)
2. [`../../../../.linked-notes/REFERENCE-OBJECTS.md`](../../../../.linked-notes/REFERENCE-OBJECTS.md)
3. inspect [`../../../../.linked-notes/reference-objects.json`](../../../../.linked-notes/reference-objects.json) only when current live registry state matters.

Minimal marker syntax:

```html
<!-- obs-ref:def id="ro_example" -->VALUE<!-- /obs-ref:def -->
<!-- obs-ref:use id="ro_example" -->VALUE<!-- /obs-ref:use -->
```

The definition inner text is the canonical literal value. Use inner text is a materialized literal copy. Definition changes do not auto-update uses; Check identifies stale copies and update is separate/explicit. The registry stores routing/index metadata, not the canonical literal value.

Do not invent an ID for an existing object or create a new live RO without the one-definition + registry contract.

## 11. Integration And Change Review

```text
local Scenario / Screen / Requirement / Domain / Slice conclusion
→ identify affected owners
→ review them explicitly
→ confirm unchanged or update their current meaning
→ preserve/review Change Axes when evidence about likely evolution changes
→ revisit selected Application Concept when value/feasibility/cost assumptions change materially
→ revisit the real-world workflow / whole-solution choice when material
```

An upstream change does not silently rewrite downstream owners, and a downstream finding does not automatically redefine upstream meaning.

## 12. Repository Boundaries

- Workspace folder creation does not create a registered parallel-work scope.
- Do not add `action-log.md` per Scenario/Screen/Domain/Slice unless that folder is separately registered as a real scope.
- Git/history records document revision; Variant is not document revision.
- Keep ordinary semantic links distinct from literal-sync Reference Objects.
- Do not introduce `versions/` merely to store edit history.

## Cross-Owner Review Dependencies

When one owner semantically derives meaning from another and an upstream change should require explicit downstream review, configure a Review Dependency through the reusable Documentation capability. Exact synchronized canonical fragments remain Reference Objects; ordinary navigation remains an ordinary link. Do not duplicate stale tracking for a materialized Reference Object use.

## Testing Planning Handoff

Slice-local verification may remain compact, but material proof design routes to sibling `../testing-planning/` through `UC-PLAN-TEST-DESIGN`. Shared/cross-Slice test architecture routes to `UC-PLAN-TEST-STRATEGY`; checking whether actual current tests prove selected meaning routes to `UC-PLAN-TEST-COVERAGE`. Tests remain evidence, never Scenario/Requirement/Domain semantic authority.

## Planning Concern / Q/R/P Handoff

`Questions / Risks / Problems` inside detailed planning is a secondary lens over the selected Scenario/Screen/Domain/Slice owner, not a planning entity. Generic semantics, Concern Groups, Priority, Concern Category, Status, AI Comment/Recommendation/Decision boundary, residual lifecycle, retention and Area Concern Register behavior are owned by `../../planning-concerns-and-decisions-model.md`.

A fully described Scenario/Domain/Slice does not receive another concern merely because another question can be phrased. Conversely, a material residual Risk/Problem is not dropped merely because the Question that exposed it has been answered.
