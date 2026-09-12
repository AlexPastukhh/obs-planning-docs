# Detailed Application Planning Workspaces

Status: legacy/supporting detailed-planning workspace guidance; **not** canonical SDS semantic authority
Scope: legacy/supporting detailed application planning after meaningful Feature/Scenario boundaries exist: owner workspaces, shared/local supporting meaning, natural-owner requirements/dependencies, spatial Screen planning, optional Domain, transient Implementation Slice discovery, optional derived Slice coordination views, integrated Variants, current decisions and Current-Draft-relative review state.

Parent family: [`../README.md`](../README.md)

> **Current SDS boundary.** Feature is the primary behavior owner; Scenario owns actor-to-Benefit journey composition; Screen owns spatial/navigation composition; Domain/Slice use transient Discovery plus optional durable Owner modules; requirements are natural-owner `BR-*` / `IR-*` / rare `PFR-*`; there is no active Slice Strategy Target. When this older workspace guidance conflicts with current IDTSPE/SDS owners, the current Target Module/Lens registries and contracts win.


Q/R/P lifecycle owner: [`../../idtspe-methodology/active/idtspe-core/shared/qrp-lifecycle-and-review-contract.md`](../../idtspe-methodology/active/idtspe-core/shared/qrp-lifecycle-and-review-contract.md)
Proposal / Decision owner: [`../../idtspe-methodology/active/idtspe-core/shared/proposal-and-decision-lifecycle-contract.md`](../../idtspe-methodology/active/idtspe-core/shared/proposal-and-decision-lifecycle-contract.md)

## 1. Purpose

Detailed planning keeps semantic owners explicit without returning to a generic `Planning Draft` layer.

```text
Feature / Scenario / Screen / Domain / Slice / Shared
= current semantic owners at their natural boundaries

Requirement
= must-hold meaning owned by its natural Feature/Domain/Slice/Shared owner

Slice coordination view
= optional derived/non-authoritative decomposition/order support; never a Target-family prerequisite

workspace folder
= physical organization around that owner
≠ new semantic entity
```

No `current-draft.md` type exists. The current draft is the currently selected semantic owner/file for that planning unit.

Prototype planning is upstream of this canonical current-behavior layer. `PSCN-*` Prototype Scenarios and `PSCR-*` Prototype Screens are provisional evidence/design and must not remain competing current owners after selected meaning is promoted into `SCN-*` / `SCR-*`. See [`../prototype-planning-workflow.md`](../prototype-planning-workflow.md).

When a project benefits from physical separation, [`../requirements-and-change-context.md`](../requirements-and-change-context.md) recommends `solution-and-application/` for solution/concept/prototype/current Scenario/Screen/Requirement work and `domain-and-implementation/` for Domain/Slice work. Folder placement is organization only, not semantic ownership.

## 2. Current State / Review Compatibility Boundary

This legacy/supporting workspace guidance does **not** own a second draft-state, concern or decision lifecycle. When these older workspaces expose planning state, use the current Core owners directly:

```text
material candidate answer / alternative
→ Proposal / Proposal relations
→ proposal-and-decision-lifecycle-contract.md

material Question / Risk / Problem
→ Q/R/P / optional Q/R/P Group
→ qrp-lifecycle-and-review-contract.md

accepted material choice
→ Decision / Target Result / natural owner meaning

review presentation
→ active AI Reviewability peer

physical persistence / register / index
→ Artifact Placement / P-14
```

Legacy labels such as `Planning Concern`, `Concern Group`, `Concern Category`, `Area Concern Register`, `Idea`, and `Current Selected Variant` do not define current semantic types here. Where old workspace material still contains them, interpret them through the compatibility mappings in the canonical Core contracts rather than creating parallel state.

A supporting workspace may keep a compact Q/R/P index when distributed durable Q/R/P would otherwise be difficult to navigate, but the index is a projection over natural owners and does not own the Q/R/P bodies. Likewise, a selected Proposal/Decision is integrated into the actual Scenario/Screen/Domain/Slice/etc owner rather than retained as a second current-plan authority.

Potential simplifications/better routes are simply unselected alternative Proposals when material. Once selected, they leave the alternative surface and become Decision / Target Result / natural-owner meaning through the normal lifecycle.

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

## 4. Scoped Proposals

Use the canonical Proposal lifecycle. Legacy `ideas/` folders are compatibility representation only; new work does not require a dedicated Proposal folder.

Do not create a Proposal file for every small question. A Question may remain Q/R/P until a material candidate answer actually exists.

Placement follows where the question is actually true:

```text
application-wide question
→ application-level ideas/

shared Scenario question
→ scenario-drafts/ideas/

Scenario-specific question
→ SCN-X/ideas/

Variant-specific candidate answer
→ that Variant's Proposal context/representation when materially useful
```

One material Proposal has one semantic identity. Other affected owners reference it rather than maintain duplicate candidate bodies.

When detailed-draft Q/R/P relates to Proposal(s), use the canonical Q/R/P representation rule:

```text
one logical Q/R/P item / Q/R/P Group
→ one primary detailed storage location when durable representation is useful

Related Proposal(s)
→ reference Q/R/P ID + location + useful relation/provenance

If the Proposal is represented with that owner
→ the Q/R/P body may be colocated there without creating a second authority
```

Do not maintain the former full same-ID mirror in both an aggregate/owner and one Proposal copy. An optional Q/R/P register/index may provide durable discoverability when items are distributed.

## 5. Planning Unit Variants

A Planning Unit Variant is an integrated alternative design of the whole relevant Scenario, Screen, Domain or Slice.

It is not:

```text
runtime Branch
separate Proposal answering one local question
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

A speculative future possibility does not justify an abstraction by itself. Relevant implementation-scoped Proposals remain candidate meaning until selected and integrated into Domain current meaning.

## 8. Slice Discovery / Optional Coordination Workspaces

Current SDS authority is `TM-IMPLEMENTATION-SLICE` for transient one-Slice discovery and, only when durable independent ownership is useful, `TM-SLICE-OWNER`. This older workspace guide may additionally use [`../slice-planning-workflow.md`](../slice-planning-workflow.md) for compatible decomposition/order heuristics.

### Optional Derived Coordination View

When choosing or communicating decomposition/order across several candidate Slices has independent coordination value, a project may create a derived view using [`../templates/SLICE-STRATEGY-DRAFT-TEMPLATE.md`](../templates/SLICE-STRATEGY-DRAFT-TEMPLATE.md). `UC-PLAN-SLICE-STRATEGY` is retained only as project-local compatibility/supporting navigation. The view owns no Slice meaning, creates no `TM-SLICE-STRATEGY` Target and is not a prerequisite for Slice discovery.

### One Implementation Slice

A Slice is one bounded end-to-end realization candidate discovered through `TM-IMPLEMENTATION-SLICE`. Its applicable `RU-SLICE-01..05` projection remains sparse. If that responsibility later has independent durable ownership value, it may be promoted to `TM-SLICE-OWNER`; otherwise the transient discovery result need not become a persistent artifact.

Representation is pressure-driven rather than a fixed rich tree. A small Slice may remain inline in the current Feature/work context or another natural owner; a substantial durable Slice may use one dedicated owner file after the Slice-Owner existence gate passes. A derived coordination document may link to the Slice but never becomes its semantic owner. Further physical splitting is allowed only when Documentation / Representation finds independent addressability/lifecycle value.

The Slice remains one vertical semantic owner. SDS does not prescribe `frontend.md` / `server.md` part plans or technical-layer Slice families. UI-specific reasoning may use the UI Lens inside the same Slice; independently substantial local design may use normal Target Formation.

Presentation/implementation-support visualization is not the same as Screen spatial authority.

Change Axes may influence coupling/seams but do not automatically require generalization. Implementation-scoped Proposals selected into one Slice become selected Slice meaning; retained Proposal provenance must not duplicate current implementation authority.

`Feature` does not become a required extra semantic layer merely because a Slice has a product-facing feature name.

## 9. Verification / Testing

Local verification derives from current semantic owners:

```text
Feature behavior / BR-* and Scenario journey must-holds
+ owner-local Domain / Slice / Shared IR-* when present
+ rare owner-local PFR-* when independently useful
+ Slice proof intent / integration obligations when present
→ planned proof route / eventual Evidence
```

A Slice may use a local proof/verification representation when independently useful. If proof coordination grows across several project owners, the sibling Testing Planning family may be used as **project-local supporting coordination**, not as an SDS `TM-TEST-STRATEGY` Target. Literal tests route through Exact Realization; executed checks become Evidence only after they are actually run against the stated subject/state/environment. Tests do not redefine Feature/Scenario/Domain/Slice truth merely because a test currently expects something.

## 10. Cross-File Links And Reference Object Candidates

Ordinary semantic relationships use ordinary repository links.

Examples:

```text
Scenario → Screen
Feature / Scenario → Domain when the relation is semantically material
Slice → Feature / Domain / Shared owner
Domain / Slice / Shared → owner-local IR-* / rare PFR-* when material
legacy Scenario-DATA / Behavior-item references → supporting compatibility only, never current SDS ownership
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

- Git/history records document revision; Variant is not document revision.
- Keep ordinary semantic links distinct from literal-sync Reference Objects.
- Do not introduce `versions/` merely to store edit history.

## Cross-Owner Review Dependencies

When one owner semantically derives meaning from another and an upstream change should require explicit downstream review, configure a Review Dependency through the reusable Documentation capability. Exact synchronized canonical fragments remain Reference Objects; ordinary navigation remains an ordinary link. Do not duplicate stale tracking for a materialized Reference Object use.

## Testing Planning Handoff

Slice-local verification may remain compact, but material proof design routes to sibling `../testing-planning/` through `UC-PLAN-TEST-DESIGN`. Shared/cross-Slice test architecture routes to `UC-PLAN-TEST-STRATEGY`; checking whether actual current tests prove selected meaning routes to `UC-PLAN-TEST-COVERAGE`. Tests remain evidence, never Scenario/Requirement/Domain semantic authority.

## Q/R/P Handoff

`Questions / Risks / Problems` inside detailed planning is a secondary lens over the selected Scenario/Screen/Domain/Slice owner, not a planning entity. Generic Q/R/P lifecycle/grouping/priority/category/retention is owned by `../../idtspe-methodology/active/idtspe-core/shared/qrp-lifecycle-and-review-contract.md`; Proposal/Decision semantics by the canonical Proposal lifecycle owner; AI review presentation by the active AI Reviewability peer.

A fully described Scenario/Domain/Slice does not receive another Q/R/P item merely because another question can be phrased. Conversely, a material residual Risk/Problem is not dropped merely because the Question that exposed it has been answered.
