# SDS Worked Flow Reference — Research Capture

Status: active compact semantic example

This is a current **orientation example**, not a mandatory phase sequence, automatic depth ladder or prescribed project file tree. Runtime composition still starts from the Methodology Use-Case Registry Map and applicable IDTSPE Use Cases.

The example demonstrates the SDS temporal-authority boundary:

```text
current natural owners
= realized truth

Evolution Step
= unrealized future planning truth

Exact + Evidence
→ Target Owner Materialization
→ updated current owners
```


> **Unit-inventory reminder:** every formed Target shown here has its complete Module-defined Unit inventory. Example excerpts may abbreviate `OMITTED` Units for readability only when their heading/disposition is explicitly preserved or the excerpt says it is partial; an omitted Unit never means a non-existent Unit.
> **Representation reminder:** sections that say `partial semantic excerpt` intentionally focus on cross-owner composition rather than reproducing every Unit body/`Methodology:` annotation. Full authored Unit representations still bind the exact reusable Unit owner before substantive content.

## 1. Start Lightweight

```text
USER concern:
  preserve useful research material without losing reading context

current software:
  none

UC-IDTSPE-COMPOSE-CURRENT-WORK
→ Broad Discussion is initially sufficient
```

No Target, Lens or Checkpoint is created merely because SDS is installed.

Because no application is implemented yet, `absence` is valid current state. Planning the first application is therefore future-state planning rather than current-owner truth.

## 2. Ground material Proposals before presenting them

Suppose the USER asks for proposals about the solution.

AI first uses available Sources and low-cost research. If a material USER-only preference can change the candidate materially, ask only that minimum question before presenting the affected Proposal.

```text
AI can establish from Sources:
  existing bookmarks/notes create context-switching friction

material USER-only question:
  must long-term knowledge management be inside the new application,
  or should it stay in the existing notes system?

USER:
  keep long-term knowledge management outside
```

The answer is intake/classified once and is not re-asked. No formal Q/R/P Question is required merely because the conversational clarification occurred.

## 3. Create one concrete Evolution Step for the first implemented state

A coherent candidate future transition becomes addressable:

```text
Evolution Step: EVO-INITIAL-CAPTURE

Entering From: None

Driver:
  reduce interruption while preserving material + source context

Current downstream state:
  no current Feature / Scenario / Screen / Domain / Slice owner exists

Upstream Application Definition:
  selected need/contribution may already be stated before realization
```

The Step is the semantic owner of the future **downstream** target state. Application Definition is refined upstream and may drive the Step; supporting downstream SDS modules shape Target Owner Bodies **inside this Step**.

## 4. Application Definition driver — only when own-software proposition is material

Existing alternatives are compared proportionally:

```text
bookmarks
read-later / notes tools
manual copy
small own capture application
```

Suppose the selected application proposition is:

```text
Application Concept:
  very fast temporary capture + later review/triage

Own-Application Justification / Key Behavior Focus:
  KBF-CAPTURE-FAST — preserve selected material + source context
  without forcing the actor out of the active reading flow;
  existing manual/general-note routes do not satisfy that focus well enough.

Realization Feasibility / Early Implementation Planning:
  capture needs a low-friction entry path and durable acceptance boundary;
  exact transport/storage/UI topology remains downstream.
```

`TM-APPLICATION-DEFINITION` is refined directly. `EVO-INITIAL-CAPTURE` may reference `KBF-CAPTURE-FAST` as a precise driver, but does not copy Application Definition into a Target Application Body.

A real-life Scenario may also be formed first from Need/workflow evidence and later revalidate this Application Definition; the direction is not a mandatory phase order.

## 5. Scenario → Feature / Screen target bodies

Supporting peer planning may produce the following **partial semantic excerpts** of complete Target Scenario/Feature/Screen Bodies:

```text
Target Scenario Body: SCN-CAPTURE-THEN-REVIEW

  Scenario Path:
    SPS-CAP-01 — actor identifies useful material while reading
    SPS-CAP-02 — actor invokes application capture entry
    SPS-CAP-03 — application accepts selected material + source context
    SPS-CAP-04 — actor continues reading
    SPS-CAP-05 — actor later opens review
    SPS-CAP-06 — application presents the captured item for triage

  Step-attached SR:
    SR-CAP-01 — SPS-CAP-03 must not report success before durable acceptance

  Scenario-wide SR:
    SR-CAP-G-01 — capture/review continuity preserves the same captured-item identity

Target Feature Body: FEAT-CAPTURE-ITEM
  Scenario Realization:
    Preceding / Trigger Context:
      SPS-CAP-01
    Realized Scenario Steps:
      SPS-CAP-02
      SPS-CAP-03
    Realized Scenario Requirements:
      SR-CAP-01

  Principal Result:
    selected material + source context is durably accepted
    and the application returns a truthful success/failure result

  BR-CAP-01:
    success is returned only after durable acceptance

Target Feature Body: FEAT-REVIEW-ITEM
  Scenario Realization:
    Realized Scenario Steps:
      SPS-CAP-05
      SPS-CAP-06
    Realized Scenario-wide Requirements:
      SR-CAP-G-01

  Principal Result:
    a previously captured item can be reviewed and triaged

Target Screen Body: SCREEN-REVIEW
  Scenario: SCN-CAPTURE-THEN-REVIEW
    SPS-CAP-05
      Step-local Screen Requirements: SCR-REV-01
      Screen participation / spatial presentation:
        review entry exposes the captured-item list/detail path
    SPS-CAP-06
      Step-local Screen Requirements: —
      Screen participation / spatial presentation:
        selected captured-item meaning and triage actions are presented

  Step-local Screen Requirement:
    SCR-REV-01 — review entry keeps the selected captured-item context visible

  Screen-wide Requirement:
    SCR-G-REV-01 — list/detail navigation preserves selected-item context
```

`SPS-*` is itself normative Scenario meaning and may be a downstream realization obligation even with no attached `SR-*`. One Feature may realize several Scenario steps; one Scenario step may require several Features. Actor/external-only steps normally remain preceding/trigger context rather than being claimed as Feature-realized.

Scenario `SR-*` remains Scenario authority. Feature and Screen record their realization/participation without copying that authority. Visuality alone does not make a must-hold Screen-owned: a visual Scenario requirement may be behaviorally realized by Feature, spatially supported by Screen, or both.

Feature/Scenario/Screen remain peer owner families. Their **future bodies** are Step-owned until the application is actually realized.

## 6. Domain discovery → Evolution Impact → Target Domain Body when justified

Capture behavior exposes semantic pressure around:

```text
CaptureItem
  stable identity
  durable content
  source context
  accepted/reviewed lifecycle
```

Use `TM-DOMAIN-DISCOVERY` only if concrete discovery is useful.

If durable post-Step Domain responsibility is justified:

```text
Target Domain Body: CaptureItem
  RU-DOWN-01 — RESOLVED — Domain Semantic Contract
  RU-DOWN-02 — OMITTED — no independent Domain-owned IR/PFR is established in this example
  RU-DOWN-03 — OMITTED — current-owner reverse Evolution Impact is not applicable inside the Step-owned future body
```

The future `IR-DOMAIN-*` lives in this Target Domain Body. There is still no current Domain owner because nothing is implemented yet.

## 7. Slice discovery → Evolution Impact → Target Slice Body when justified

`TM-IMPLEMENTATION-SLICE` may discover:

```text
capture request
→ semantic application entry
→ CaptureItem validation/creation
→ persistence
→ truthful result mapping
```

If independently durable end-to-end responsibility is useful after the Step is realized:

```text
Target Slice Body: SL-CAPTURE
  RU-SOWN-01 — RESOLVED — durable Slice responsibility/boundary
  RU-SOWN-02 — OMITTED — no independent durable Slice-local IR/PFR is established in this example
  RU-SOWN-03 — OMITTED — current-owner reverse Evolution Impact is not applicable inside the Step-owned future body
```

Slice Discovery remains working methodology. Selected Result Content with continuing pre-realization value may be retained in the Step Slice Evolution Impact; the Target Slice Body is future durable Slice meaning. Neither is current implementation truth yet.

## 8. Shared capability uses the target-state consumer set, not imaginary current consumers

Suppose future Capture and Review bodies both need one coherent audit-context capability.

Inside the Step, `TM-SHARED-IMPLEMENTATION-CAPABILITY` may form:

```text
Target Shared Body: SH-AUDIT-CONTEXT
  RU-SHARED-01 — RESOLVED — coherent reusable audit-context responsibility
  RU-SHARED-02 — RESOLVED — future consumers:
    Target Slice Body SL-CAPTURE
    Target Slice Body SL-REVIEW
  RU-SHARED-03 — OMITTED — no independent Shared-owned durable implementation constraint is established in this example
  RU-SHARED-04 — OMITTED — current-owner reverse Evolution Impact is not applicable inside the Step-owned future body
```

That is a valid future shared capability candidate/selection.

It does **not** mean a current Shared owner already exists. A future consumer never counts as a current implemented consumer merely because the Step is selected.

## 9. Alternative Step routes and uncertainty

Suppose source capture has two materially different routes:

```text
Proposal A:
  browser extension captures selected text directly

Proposal B:
  OS share action captures text/URL
```

If shallow comparison is enough, keep them as ordinary Proposals. If downstream UI/architecture consequences materially differ, use Planning Branches:

```text
Branch A
  ASSUMED_FOR_BRANCH: Proposal A
  Target Screen/Feature/Slice consequences...

Branch B
  ASSUMED_FOR_BRANCH: Proposal B
  Target Screen/Feature/Slice consequences...
```

Branch planning remains non-canonical until root selection.

Example uncertainty:

```text
Need for low-interruption capture:
  confidence basis: direct USER need + observed current workflow

Browser extension permissions:
  uncertainty: material
  basis: docs only; no real prototype yet

Selected route:
  still unresolved
```

Selection, confidence and realization remain separate.

## 10. Select one route without pretending it exists

Suppose the USER selects Proposal A.

```text
Decision:
  browser extension route selected
```

The affected Target Bodies are reconciled to the selected route.

But:

```text
selected
≠ implemented
≠ current owner authority
```

The Step remains the future-state semantic owner.

## 11. Code Realization / Evidence

When the selected Step meaning is sufficient:

```text
EVO-INITIAL-CAPTURE selected target state
+ actual destination codebase/project state
→ TM-CODE-REALIZATION
→ literal code/tests/config/result
```

With authorization, integration/build/test execution produces actual Evidence.

If Evidence reveals a material semantic contradiction, revalidate the affected Step Target Body/Decision rather than silently weakening the target meaning in code.

If the real implemented subject/environment must be observed:

```text
TM-PRACTICAL-TEST
→ actual practical Evidence
```

## 12. Target Owner Materialization

The Step carries a semantic materialization plan such as:

```text
Application Definition
  no Step materialization; it already owns upstream intent

CREATE current Feature owners
  FEAT-CAPTURE-ITEM
  FEAT-REVIEW-ITEM

CREATE current Scenario owner
  SCN-CAPTURE-THEN-REVIEW

CREATE current Screen owner/model
  from Target Screen Body

CREATE current Domain owner
  CaptureItem

CREATE current Slice owners
  as actually realized

CREATE current Shared owner
  only if the realized implementation actually establishes that reusable capability/bindings
```

After implementation + required proof/revalidation succeeds, materialize only what was actually established.

If the implementation materially differs from the planned target body, do not blindly copy the planned body into current owners; surface/reconcile the mismatch first.

Physical file create/update/split/merge is resolved separately by Documentation / Representation + P-14.

## 13. A later change starts from current truth and creates another Step

After `EVO-INITIAL-CAPTURE` is realized/materialized, the canonical Feature/Scenario/Domain/Slice/etc owners now describe the implemented state.

A later future change such as PDF source support becomes another Step:

```text
Evolution Step: EVO-PDF-SOURCE

Entering From:
  EVO-INITIAL-CAPTURE

Target Feature Body:
  complete post-Step FEAT-CAPTURE-ITEM meaning

Target Domain Body:
  complete post-Step SourceContext/CaptureItem meaning if materially affected

Target Slice Body:
  complete post-Step capture responsibility if materially affected
```

Unchanged owners are referenced rather than copied.

## 14. What this example demonstrates

```text
IDTSPE always active
≠ full ceremony always active

current natural owners
= implemented/realized truth

Evolution Step
= canonical unrealized future target-state planning owner

natural SDS Target Modules
= reusable production contracts
  that may shape current-owner review
  OR future Target Owner Bodies inside a Step

Proposal / Planning Branch / Decision
= alternative/selection lifecycle
  without a Step-specific variant ontology

uncertainty / confidence basis
= Evidence/assumption property
  distinct from selection and realization

Exact / Evidence
= literal realization + what actually happened

Target Owner Materialization
= future Step target body becomes current owner authority
  only after implementation + required proof/revalidation
```

Physical owner/file placement is proportional; see [`../representation/ARTIFACT-PLACEMENT-MAP.md`](../representation/ARTIFACT-PLACEMENT-MAP.md).
