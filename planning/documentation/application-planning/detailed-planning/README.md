# Detailed Application Planning Workspaces

Status: active reusable canonical workflow
Scope: detailed application planning after meaningful Scenario boundaries exist: Scenario Draft workspaces, shared/local supporting meaning, spatial Screen planning, Domain and Implementation Slice drafts, integrated Variants, current decisions and Current-Draft-relative review state.

Parent family: [`../README.md`](../README.md)

## 1. Purpose

Detailed planning keeps semantic owners explicit without returning to a generic `Planning Draft` layer.

```text
Scenario / Screen / Domain / Slice
= semantic planning owner

workspace folder
= physical organization around that owner
≠ new semantic entity
≠ automatic parallel-work scope
≠ automatic action log
```

No `current-draft.md` type exists. The current draft is the currently selected semantic owner/file for that planning unit.

## 2. Shared Draft-State Contract

A detailed planning owner keeps current meaning in its normal semantic body and may finish with the following shared state sections:

```text
Current semantic body
+
Current Decisions
+
Questions / Risks / Problems
  relative to Current Draft Plan
+
Potential Simplifications / Better Routes
  relative to Current Draft Plan
```

### Current Decisions

Use `Current Decisions` for material selected choices whose rationale/traceability remains useful.

A Decision does not replace the semantic body. Selected meaning must be integrated into the Scenario, Screen, Domain or Slice itself.

Recommended fields when material:

```text
Decision
Rationale
Related Idea / Variant
Integrated Into
Affected Owners
Reconsider When
```

`Affected Owners` means review/integration impact. It does not silently rewrite another owner.

### Questions / Risks / Problems

Only material unresolved/adverse findings relative to the current draft belong here.

Each real unit states at minimum:

```text
ID / Type
Related Idea when applicable
Current Draft Plan
Finding
Relation / Impact On Current Draft Plan
```

Add `Needed Resolution / Treatment`, `Fallback`, `Fallback Relation` and `Blocking` only when useful.

`Current Draft Plan` is the relevant currently selected baseline of this draft. It may reference a section/range rather than copy the whole draft.

Example:

```text
Current Draft Plan:
`scenario.md` → Main Flow 4–7:
customer confirms one visit slot before final technician assignment.

Finding:
Some jobs cannot expose a reliable slot before technician availability is known.

Relation / Impact On Current Draft Plan:
The selected ordering may fail for technician-dependent scheduling.
```

If no material unresolved issue exists, write exactly:

```text
No material unresolved issues identified.
```

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
finding appears
→ scoped Idea / analysis when useful
→ candidate route(s)
→ one route selected
→ selected meaning integrated into current draft
→ material choice recorded in Current Decisions when useful
→ finding no longer remains Q/R/P
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

When a detailed-draft Q/R/P references Idea(s), use the generic Idea ↔ Q/R/P discoverability rule:

```text
exactly one Related Idea
→ one logical finding / one stable Finding ID
→ keep the full aggregate Current-Draft-relative finding
→ mirror the full same-ID Q/R/P inside that Idea

several Related Ideas
→ keep one full cross-Idea aggregate finding
→ list every Related Idea
→ add a lightweight same-ID reference inside every affected Idea
→ do not copy the complete finding into every Idea
```

The Idea-side mirror/reference is a projection of the same finding, not a second semantic owner. Resolution removes the aggregate representation and every Idea-side mirror/reference together.

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

Screen Variants use the same second-integrated-design rule when materially different spatial designs exist.

Applications without screen/surface UI do not create meaningless `screens/` structure.

## 7. Domain Workspaces

Create a separate Domain only when conceptual language/lifecycle/rules materially benefit from independent ownership.

Recommended rich shape:

```text
DOM-X/
├── README.md
├── domain.md
├── ideas/
└── variants/       # only when a second integrated Domain design exists
```

Domain does not need `visual/` by default.

`domain.md` owns concepts, relationships, lifecycle, rules/invariants and conceptual boundaries. It references Scenario/Behavior meaning that motivated the Domain without copying Scenario behavior as Domain truth.

## 8. Implementation Slice Workspaces

A Slice is a separately deliverable/checkable integrated increment after enough behavior/domain meaning is understood.

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

`slice.md` owns the integrated vertical delivery boundary/result.

A simple Slice may keep the implementation plan entirely in `slice.md`. A richer Slice may split implementation-part plans such as `frontend.md`, `server.md` or another real responsibility-specific file while `slice.md` remains the integrated owner.

`visual/` is presentation/visual planning and is not the same as frontend implementation planning.

`Feature` does not become a required extra semantic layer merely because a Slice has a product-facing feature name.

## 9. Verification / Testing

Local verification derives from current semantic owners:

```text
Scenario Acceptance
+ Behavior Items
+ Domain invariants when present
+ Slice verification target
→ planned verification evidence
```

A Slice may use `verification.md`. If testing grows into an independent cross-Slice responsibility, it may get a project-local testing owner/workspace. Tests provide evidence; they do not redefine Scenario/Domain truth merely because a test currently expects something.

## 10. Cross-File Links And Reference Object Candidates

Ordinary semantic relationships use ordinary repository links.

Examples:

```text
Scenario → Screen
Scenario → Domain
Slice → Behavior Item
Domain → Scenario DATA
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
local Scenario / Screen / Domain / Slice conclusion
→ identify affected owners
→ review them explicitly
→ confirm unchanged or update their current meaning
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
