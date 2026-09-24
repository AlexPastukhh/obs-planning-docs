# Proposal And Decision Lifecycle Contract

Status: active generic IDTSPE Core owner
Purpose: define the canonical candidate-to-selection semantics for material Proposals and Decisions without coupling that lifecycle to any one conversation surface, Target Module, Lens, compatibility vocabulary or persistence representation.

<a id="resolution-proposal-decision-lifecycle"></a>
## 1. Ownership Boundary

Responsibility ID: `RESOLUTION.PROPOSAL-DECISION-LIFECYCLE`

```text
Proposal / Decision lifecycle
= this contract

Broad Discussion / Integration Checkpoint
= how lifecycle meaning may be surfaced and integrated conversationally

User-input intake
= how natural-language USER input is classified into Source / Proposal / Decision / answer meaning

Target Module
= reusable Proposal discovery aids for one Target family

Lens / Finding Disposition
= may surface candidate meaning; does not select it

Q/R/P lifecycle
= separate Core owner; Q/R/P may drive, constrain or be exposed by Proposals/Decisions

Session Runtime
= Generic AI Proposal (GIP) interaction/authorization boundary for intended AI action/direction and actual mutation
```

An `IDTSPE Proposal` (short form `Proposal` inside Core) is candidate Core State. It is not accepted product/methodology authority merely because it was suggested, formalized, analyzed, recommended or selected by an AI-only heuristic.

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [`Need Candidate Disposition`](../needs/NEED-CANDIDATE-DISPOSITION.md#resolution-need-candidate-disposition) — `RESOLUTION.NEED-CANDIDATE-DISPOSITION`
> - `CONTEXTUALIZES` [`Finding Disposition`](../findings/FINDING-DISPOSITION.md#resolution-finding-disposition) — `RESOLUTION.FINDING-DISPOSITION`
> - `CONTEXTUALIZES` [`Q/R/P Lifecycle`](../qrp/QRP-LIFECYCLE-AND-REVIEW.md#resolution-qrp-lifecycle) — `RESOLUTION.QRP-LIFECYCLE`

This lifecycle may receive drivers/findings/Q/R/P from those owners, but candidate selection and Decision integration remain owned here.

## 2. Legacy Idea Compatibility

`Idea` is the **legacy methodology term for the current IDTSPE Proposal concept**, not a second current candidate ontology.

```text
legacy Idea
→ current Proposal

legacy Idea Review / Idea Variant / Current Selected Variant
→ interpret through this Proposal / Decision lifecycle
```

Compatibility rules:

- ordinary natural-language use of the word “idea” is fine;
- a legacy command/file may still say `Idea` for historical/user-facing compatibility;
- current formal methodology must not create a separate Idea State kind, Idea lifecycle, Idea Decision type or Idea-owned Current Plan;
- selected legacy Idea meaning becomes authoritative only through the same Decision / Target Result / natural-owner path as any Proposal;
- a historical `IDEA-*` identity may be retained as provenance/compatibility identity when migration value exists, without making `Idea` a current semantic type.

## 3. Proposal Identity And Drivers

A material formal Proposal is an explicit candidate answer/solution/approach that preserves the decision driver it addresses.

```text
Proposal
→ addresses → current Target Goal / Desired Outcome context
             | Question
             | Risk
             | Problem
             | Finding / correction driver
```

For approval-relevant formal Proposals, the motivating Question and/or Problem must be visible explicitly, inline or by reference. A missing material driver is an unresolved planning gap rather than a free-floating Proposal.

The Target Goal / Desired Outcome is Target/scope context; this contract does not introduce a separate Generic Goal State Unit. A `Need Candidate` may be the intake/disposition subject that establishes or refines that desired-outcome context before a concrete candidate answer exists. When disposition yields a real candidate answer, this Proposal lifecycle takes over; the Proposal may retain the Need/Source reference as driver provenance without copying a parallel Need-owned semantic result.

A Generic AI Proposal (GIP) is the lightweight Session interaction surface for an AI-suggested action/direction/candidate. It may remain purely interaction-level when formal addressability/lifecycle adds no value. If the candidate **semantic resolution** carried by a GIP needs Core lifecycle/addressability, represent that meaning as an IDTSPE Proposal; the GIP may present/reference that Proposal. Promotion never selects it.

Source material is not automatically a Proposal. Facts, constraints, accepted Decisions, Questions, corrections, Evidence and provenance keep their own meaning unless an actual candidate answer is present.

## 3AA. GIP / IDTSPE Proposal Boundary

```text
Generic AI Proposal (GIP)
= interaction-level AI suggestion of what to do/change/produce next

IDTSPE Proposal
= addressable candidate semantic resolution owned by this lifecycle

Recommendation
= analytical/methodology recommendation; when AI explicitly presents it as the proposed next action, the interaction surface may be a GIP
```

A GIP can exist with no IDTSPE Proposal. An IDTSPE Proposal can exist without being presented through a GIP. When both exist, keep one semantic candidate authority: the GIP references/presents the IDTSPE Proposal rather than duplicating its payload.

### Finding-to-Proposal Handoff

[`Finding Disposition`](../findings/FINDING-DISPOSITION.md#resolution-finding-disposition) owns whether a Finding is deterministic/local, needs revalidation, or establishes a material semantic-change surface. For every **material Finding** that reaches disposition, the AI MUST form or refine at least one linked IDTSPE Proposal under this lifecycle so the candidate correction/result/realization route is explicit and addressable in the current Work Context. Preserve the Finding as driver/provenance and target the smallest natural affected owner/subject.

```text
material Finding
→ Finding Disposition / RE-* classification
→ linked IDTSPE Proposal
→ proportional Proposal review appropriate to its current state

RE-0
→ deterministic-correction Proposal
→ accepted semantic meaning is already fixed; Proposal records the repair/result route

RE-1
→ local-realization Proposal(s)
→ compare/select only when local alternatives materially differ

RE-2 / RE-4
→ formal semantic-change Proposal at the affected owner
→ Proposal Semantic Change Impact Review
→ normal selection / Decision authority before semantic integration

RE-3
→ revalidation-gated Proposal
→ BLOCKED_BY_REVALIDATION / not selectable
→ upstream revalidation refines or reclassifies it before selection

GIP, if useful
→ presents/references the linked IDTSPE Proposal
→ never substitutes for it
```

This handoff does not make every Finding a new Decision surface. A deterministic `RE-0` Proposal can record an already-implied correction without requiring semantic selection; `RE-3` can carry a blocked candidate direction without pretending the upstream change is already known. The Proposal lifecycle supplies candidate identity/review/addressability; Finding Disposition still owns RE classification.

A formal or linked IDTSPE Proposal does **not** imply physical persistence. It may exist only in current Work Context/conversation. Retention beyond the immediate turn and any dedicated file/register representation remain separate proportional decisions under this lifecycle and Representation / P-14.

## 3A. Proposal Payload And Unit Resolution

A Proposal is a **candidate resolution** for a material planning subject. It may carry:

```text
Proposed Result Meaning
  candidate meaning that could become part of affected Unit/owner Result Content

Proposed Resolution / Realization Route
  candidate way to obtain/prove/realize the result when the route itself is material
```

Either part may exist alone; complex Proposals may contain both. Proposal payload is candidate meaning, not Current Result Content.

> Semantic Owner Dependency
> Type: `CONTEXTUALIZES`
> Responsibility: `TWU.SUBJECT-REFERENCE`
> Owner: [Target Work Subject Reference Contract](../../runtime/target-work/TARGET-WORK-SUBJECT-REFERENCE-CONTRACT.md#target-work-subject-reference)

When a Proposal concerns a Target Work Collection/item/Slot, relate it to the smallest natural subject and use the canonical Target Work Subject Reference. This prevents one item-local Proposal from accidentally targeting the common role or broader Collection. Other Unit-local Proposals relate to the affected parent Unit Resolution. Cross-Unit/Target-wide Proposals remain valid when their natural subject spans several items/Slots/Units or the Target itself.

## 3B. Proposal Target Result — Candidate Target Instance Under Proposal Authority

> Semantic Owner Dependency
> Type: `CONTEXTUALIZES`
> Responsibility: `TARGET.CANDIDATE-INSTANCE`
> Owner: [Candidate Target Instance](../../runtime/target-work/TARGET-CONTRACT-INSTANCE-SOURCE-RELATION-MODEL.md#target-candidate-instance)

When the USER/current process asks for a **Proposal of a Target Result** (for example a proposed Feature Definition, Scenario Journey Composition or another Target Module result), form an ordinary **candidate Target Instance** through the normal Target Module/Local Target Contract. Candidate Target Instance structure is owned by the canonical Target contract above; this Proposal contract owns the enclosing candidate authority/lifecycle.

```text
enclosing Proposal / Planning Branch
→ owns candidate authority/status
→ contains candidate Target Instance

candidate Target Instance
→ ordinary Target identity / relations / Source Set
→ complete Module-defined Unit inventory when a Target Module Instance exists
→ applicable Core-defined Units
→ Contextual Units only when actually formed
→ ordinary Unit / Requirement / object identities and fields
→ ordinary Target Step Result shape
```

Do not write `Proposed Feature`, `candidate BR`, `if approved this Unit...` or similar status noise inside ordinary child content when the enclosing Proposal/branch already makes candidate authority unambiguous. A child item gets its own explicit status only when it materially differs from the enclosing status or has an independent lifecycle.

Formation of the candidate Target Instance does **not** select it. Until normal selection/integration occurs, its target-shaped meaning remains Proposal/branch-scoped candidate meaning rather than canonical `Current Result Content`/current-owner authority. Actual selection/authority requirements still govern canonical integration, current-owner mutation, materialization and realization execution.

When a Target Module uses `selected` / `accepted` wording only to describe the **complete shape** of its target state, an explicitly requested Proposal Target Result may form the same complete candidate Target Instance before semantic selection. If the Proposal is accepted, promote/integrate that same Target meaning through normal Decision/natural-owner/temporal-host semantics rather than regenerating a separately shaped "final" version.

A single candidate Target Instance does not require a Planning Branch. Use a Planning Branch when counterfactual downstream exploration beyond that proposed Target is materially useful for comparison.

## 3C. Smallest Sufficient Planning-State Boundary

`Proposal`, `Selected`, `Current` and analogous planning authority are written at the smallest enclosing scope that makes the contained meaning unambiguous.

```text
enclosing Proposal / selected Step route / current owner body
→ contained meaning inherits that planning status
→ unless a nested item has a materially different explicit status/lifecycle
```

Inherited planning status does not transfer semantic ownership. Repeat status metadata only when it resolves a real ambiguity such as mixed accepted/candidate content, partial selection, independent nested Proposal lifecycle or another materially different authority boundary.

## 4. Proposal Identity, Refinement And Alternative Proposals

Do not create a second `Proposal Variant` ontology merely to preserve the former Idea-Variant shape.

```text
same candidate identity
+ clarification / narrowing / strengthening / simplification / bounded amendment
→ refine or REVISE the same Proposal

materially different answer that could be selected independently
→ another Proposal
→ relate through competes-with / complements / requires / conflicts-with when useful
```

A fallback remains an unselected/conditional Proposal unless explicitly selected. Calling something a fallback does not make it the current Decision.

One driver may have zero, one or many candidate Proposals. Preserve real alternatives rather than flattening them into one answer.

Useful lightweight relations include:

```text
Proposal ↔ competes-with ↔ Proposal
Proposal ↔ complements ↔ Proposal
Proposal → requires → Proposal
Proposal ↔ conflicts-with ↔ Proposal
Proposal → part-of-candidate-bundle → Candidate Bundle / Option Group
```

A Candidate Bundle / Option Group groups compatible Proposals for comparison. It is a projection by default, not a new mandatory State Unit, semantic owner, Target or Planning Branch.

Use a Planning Branch only when an alternative needs a materially deep downstream counterfactual planning network.

Several merely related Proposals do not require a named group. Use ordinary relations/review grouping unless a compatible candidate bundle actually represents one selectable approach.

<a id="resolution-recursive-proposal-qrp"></a>
## Recursive Proposal / Q/R/P Resolution Graph

A subject may have `0..N` Proposals; a Proposal may expose or address `0..N` Questions/Risks/Problems; each Q/R/P may in turn be addressed by `0..N` Proposals, recursively. Keep links and driver provenance at the smallest meaningful subject. The graph does not require a new ProposalTree/ResolutionGraph State kind or Planning Branch for every recursion. Selection may accept one Proposal, multiple mutually compatible Proposals, or a compatible subgraph/Candidate Bundle. Check dependencies and conflicting candidates before selection; never infer acceptance for adjacent nodes merely because one branch was accepted.

A Proposal file may be a completely ordinary candidate Target Instance at its intended final path. The enclosing Proposal/PRS state determines authority, down to a Target, Unit or Unit Slot where one file contains mixed statuses; physical persistence alone determines neither Proposal status nor acceptance.

## 4A. Proposal Grounding Before Presentation

A material Proposal should not be presented as adequately formed when a missing **material USER-only fact, preference, constraint or USER-owned choice** can materially change the candidate itself.

Canonical interaction boundary:

```text
inspect available Sources / Evidence
+ perform proportionate authorized investigation
↓
can a responsible material candidate be stated?
  yes → present/review Proposal
  no, because material USER input/authority is required
     → ask the minimum useful USER question
     → classify/intake the answer
     → then form/refine the Proposal
```

Do not ask the USER to restate facts that trustworthy Sources already establish. Do not require a question before every Proposal. Non-blocking assumptions/unknowns may remain explicit in the Proposal when they do not prevent useful candidate review.

An interaction clarification is not automatically a formal Core `Question`/Q-R-P State Unit. Formalize it only when independent lifecycle/addressability/review value exists. The canonical USER-input intake rule owns how the answer is classified.

Grounding does not authorize selection: a well-grounded IDTSPE Proposal is still unselected until normal authority selects it. A GIP that presents/references that Proposal does not change its selection state.

## 5. Candidate Review / Resolution Context Handoff

This lifecycle owner defines **what** Proposal/Decision states and selection outcomes mean. Reusable operational evaluation of one concrete material Proposal/Decision context is owned by [`LENS-PROPOSAL-DECISION-RESOLUTION-CONTEXT`](../../lenses/required/LENS-PROPOSAL-DECISION-RESOLUTION-CONTEXT.md).

```text
material Proposal / Decision surface
→ normal Unit/Lens-registry applicability path
→ Resolution Context Lens
→ optional related QRPE applicability/disposition
→ return here for canonical Semantic Change Impact / selection / integration / retention semantics
```

The Lens may compose L2/L3/L4/Quality-Risk checks and may surface a Finding Candidate, but it does not select the Proposal, define Decision semantics or replace this lifecycle contract. Do not duplicate the Lens's detailed operational question set here.

A material Proposal remains unselected even after a thorough Lens review or AI recommendation.

### Retained Proposal Review Provenance

When a **material Proposal itself is retained beyond the immediate review turn** — because it remains OPEN/DEFERRED, is intentionally retained after rejection/supersession, or is retained as part of a Decision trace — retain enough review provenance to make later review/handoff/revalidation understandable.

Minimum retained provenance is proportional but must expose:

```text
Review Provenance
  Resolution Context Lens / operation — REQUIRED for a reviewed material Proposal
  Other materially applied Lenses / operations — when they affected review
  Applied-to subject/scope — when not obvious from the Proposal identity
  Recheck trigger / unresolved review state — when material
```

The provenance records **which reusable evaluators were applied**, not their full analysis transcript. It may be stored inline with the retained Proposal or referenced from an applicable `Methodology Usage State`; do not maintain competing copies.

A retained material Proposal whose required review has not yet happened must remain visibly unresolved (for example `Review Provenance: pending required Resolution Context review`) rather than looking reviewed by omission. Routine transient conversational Proposals that are not retained do not need durable Lens provenance.

<a id="proposal-semantic-change-impact-review"></a>
## 5A. Proposal Semantic Change Impact Review

Every **material Proposal** receives a proportional semantic-impact review as part of Candidate Review, regardless of whether it came from a Finding, USER input, AI reasoning, Target Module discovery aid or ordinary Unit Resolution.

Check upstream and downstream consequence applicability for every material Proposal, including deterministic corrections. Expand only material dimensions; a bounded, supported no-change conclusion is valid, while an unknown or uninspected consequence remains explicit:

```text
Affected Unit / semantic subject
Affected current owner(s)
Most-upstream potentially affected owner
Which accepted meaning would change, if any
Requirement consequence under the active profile/owner
Source / Evidence consequence
Downstream consumer consequence
Revalidation consequence
Temporal-host consequence when current vs unrealized meaning differs
Whether the selection deserves explicit retained Decision trace
```

Do not create a second `RE-*` scale for Proposals. `Resolution Escalation RE-0..RE-4` belongs to Finding Disposition only.

Proposal review may use applicable Lenses as evaluators. Lenses may contribute analysis or surface a new Finding Candidate; they do not own the Proposal lifecycle or impact conclusion.

```text
Proposal review
→ known intended owner/upstream change already stated by Proposal
   = Proposal impact, not a new Finding automatically

Proposal review
→ newly discovers a material contradiction/unsupported assumption/owner conflict
   = Finding Candidate
   → Finding Disposition
```

A Proposal does not "rewrite a Source". It may conflict with a Source, require additional Evidence, challenge Source authority/currentness, or propose changing upstream semantic owner meaning whose later accepted result becomes a downstream Source.

<a id="resolution-claim-grounding"></a>
### Evidence-backed resolution conclusions

Material resolution conclusions presented to the USER MUST carry an inspectable basis and a concise public rationale. This applies to Proposal impact/selection conclusions and to Finding classification/consequence conclusions through [Finding Disposition](../findings/FINDING-DISPOSITION.md#finding-classification-consequence-basis). The supporting reference and the argument play different roles:

```text
checked reference / explicit USER statement
→ the specific accepted meaning or observed fact it supports
→ concise explanation connecting that basis to this candidate/conclusion
→ conclusion, bounded scope and any material uncertainty
```

Use a direct document section/anchor, Requirement/Decision/Source subject, relevant Evidence, or an identifiable USER statement. For a USER statement, cite an existing message/permalink/log entry when available; otherwise reproduce the relevant exact excerpt with enough conversation context to identify it. Do not invent message IDs, links or logs, and do not create a log merely to satisfy this rule. A shared basis reference may support several conclusions when each connection is clear. Retained conclusions preserve enough of that basis to be recovered later, without requiring a new file or copying whole documents.

A methodology rule proves which evaluation criterion applies; it does not by itself prove the affected project's accepted meaning or dependency facts. An AI recommendation, prior AI assertion, unselected Proposal or the changed draft being justified cannot establish its own prior acceptance. A rationale is not independent Evidence. If USER instruction and current documentation differ, expose their scope/order and the selected authority; do not silently claim they already agree.

For upstream consequences, identify the accepted owner meaning/Requirement/Decision that is preserved, challenged or proposed to change, with its basis. For downstream consequences, identify the affected consumers/results and the dependency that requires preservation, update, revalidation or invalidation. Distinguish the current defect/exposure from the conditional effects of each candidate if selected. A no-impact conclusion names the inspected boundary and the reason it holds there; absence of a found reference is not proof of absence of impact.

Claims such as **"no new semantic decision is needed"**, **"already implied"**, **"continues the USER's direction"** or **"no upstream/downstream consequence"** MUST satisfy this same basis rule. Cite what already determines the meaning and explain why the candidate stays within it. General intent alone does not establish a unique implementation route; distinguish no new semantic selection from any remaining local realization choice. No new semantic selection is also distinct from whether an existing Decision trace should be retained and whether actual mutation is authorized.

When support is missing, mark the particular conclusion provisional/unknown and state the smallest source check, Evidence need or USER-only clarification required. Do not present unsupported certainty as review completion or manufacture a new approval gate when current authority is already established. Impact review may reuse a supplied Finding's checked diagnosis by reference; candidate-specific or changed-basis consequences still require their own review.

<a id="resolution-decision-retention"></a>
## Decision retention and integration

Accepted selected meaning flows to its natural owner. A durable Decision trace may remain there for useful rationale, history or an explicit USER retention request. Active coordination membership is narrower: [Planning Resolution State / Resolution Carry-Forward](../../target-modules/TM-PLANNING-RESOLUTION-STATE.md#ru-prs-02--tracked-decisions) includes a Decision only with one or more qualifying related Q/R/P. Removing a completed active entry preserves accepted content and any historical trace.

Planning Resolution State and Carry-Forward are names for one bounded result. Its Target Module owns membership, linked context, ordering and continuation materialization. Selection and integration remain owned here.

## 6. Selection Outcomes

Material Proposal review may lead to:

```text
APPROVE
REJECT
REVISE
DEFER
```

These are working lifecycle outcomes; they do not require persisted status metadata on every Proposal. Likewise, merely forming a Finding-linked or explicitly requested Proposal does not require a dedicated Proposal file or register entry.

Selection is exact and partial when necessary:

```text
partial approval
→ only explicitly accepted meaning flows forward

USER amendment
→ re-evaluate the affected Proposal meaning and dependencies
→ preserve unrelated accepted meaning
```

An AI recommendation is not selection. A Lens Finding, Evidence item, validator result or Finding Disposition is not selection by itself.

## 7. Answer / Recommendation / Proposal / Decision / Result Boundary

Keep these meanings distinct:

```text
Answer / Evidence
= factual or interpretive resolution of a Question/evidence gap

Proposal
= candidate resolution: proposed Result Meaning and/or Resolution/Realization Route

Recommendation
= recommendation for a Proposal/route; not selection

Decision semantics
= actual material selection under applicable authority

explicit/durable Decision State / retained trace
= addressable record retained when selection/rationale/revalidation value is independently useful

Current Result Content
= normalized current answer/output of the affected Unit after selected or safely derived meaning is integrated
```

A Question may be answered and integrated into Result Content without any Decision when no material choice remains. A material Proposal cannot become current selected meaning merely by being recommended; if it is materially selected, Decision semantics occurred even if no separate durable Decision record is retained.

## 8. Decision Formation, Integration And Trace

Accepted material selection becomes authoritative for the planning/semantic state being represented through normal Decision semantics and integration into the affected Unit/Target/natural owner. Selection never implies realization when the active profile has a temporal-host boundary.

A separate explicit/durable Decision record is proportional. Retain it whenever the USER asks or the selection has useful coordination/history value, even without residual Q/R/P; that natural-owner/history record does not qualify for active PRS/RCF membership by itself. Examples of useful retained context:

```text
why a non-obvious choice was made
material alternative/trade-off
accepted/residual Risk or Problem
intentional deviation from default methodology/principle
cross-owner selection consequence
concrete reconsider/revalidation trigger
protection against a later "correction" that would unknowingly reverse an intentional choice
```

A retained Decision may include `Addresses`, selected Proposal/bundle, concise rationale, `Integrated Into`, affected owners, Evidence/Q/R/P refs, exposed Q/R/P and `Reconsider When`.

Decision↔Q/R/P relations remain many-to-many: one Decision may address several Q/R/P; one Q/R/P group may require several Decisions; one Decision may expose new Q/R/P.

`Rationale / Why` is not Evidence. Evidence is independently sourced/supporting meaning; rationale explains why the available meaning led to the selection.

```text
Decision trace
≠ Result Content
```

Result Content should remain understandable as the current normalized answer. Decision trace explains the material selection history/revalidation basis when preserving that history adds value.

## 9. Retention

Accepted material Decisions are retained in integrated semantic state by default when later work, review, handoff or revalidation benefits from knowing what was selected.

Retain Proposal/alternative context proportionally:

```text
selected Proposal(s) / bundle needed to understand the Decision
→ retain enough semantic trace

material rejected / deferred / superseded alternative likely to recur
  or whose non-selection reason prevents predictable rework
→ recommend retaining the alternative/reason

trivial transient alternative
→ may remain conversational
```

Retention of material non-selected/deferred/rejected/superseded alternatives is USER-controlled. When retention would prevent predictable future rework or preserve a recurring trade-off, recommend retaining it and ask proportionally whether the alternative/reason should survive.

When a material Proposal is retained, preserve the proportional **Review Provenance** defined in Candidate Review so later consumers can distinguish reviewed candidate meaning from merely captured candidate meaning and can re-run the right Lenses when context changes.

If a new material Decision lacks a rationale that would help future review/revalidation, the interaction layer may ask whether a short rationale should be retained. These optional retention choices are not blocking approval gates unless the missing meaning itself is needed to resolve ambiguity.

Semantic retention does not imply a dedicated file. Physical persistence is resolved separately by Representation / P-14.

A useful Proposal discovered outside the current Target does not require a global Idea/Future-Idea ontology or mandatory inbox. When retaining it has independent continuation/review value, keep it as ordinary Proposal State with enough context to recover its driver/provenance and let Documentation / Representation choose a natural owner, existing register/inbox, another selected owner, or no physical persistence. A register is navigation/retention infrastructure only; it does not select the Proposal or make it backlog/product authority.

### Carry-Forward / Planning Resolution State Integration

Open/deferred Proposals and their Q/R/P, unresolved subjects awaiting candidate work, and accepted Decisions with qualifying related Q/R/P feed the single [PRS/RCF result](../../target-modules/TM-PLANNING-RESOLUTION-STATE.md#tm-planning-resolution-state) when continuation value is material. Carry their material Evidence and resolution relations together. The Target Module owns active membership and representation shape; Proposal/Decision semantic bodies remain owned here and by their natural owners.

## 10. Durable Decision Protection Under Proposal Review

A code-only/transient Decision does not need durable documentation merely because it existed during planning. But when an existing **durable** Decision preserves material risk, Question/Problem, trade-off, trust/support assumption, reconsideration trigger or cross-owner maintenance reasoning, a Proposal that would replace, materially reinterpret or remove it must make visible:

- what becomes obsolete;
- what remains materially relevant;
- residual Risk/Problem;
- affected downstream meaning / revalidation consequence.

Do not silently erase durable Decision rationale through lower-level realization.

## 11. Revalidation

Re-evaluate affected Proposal/Decision meaning when material inputs change, including:

- USER amendment or redirect;
- new Evidence or a Finding challenging a selected assumption;
- owner/Target boundary change;
- selected upstream Decision change;
- known Evolution becoming concrete enough to alter the decision basis.

Preserve unaffected accepted meaning. Do not reopen the entire decision space merely because one dependent item changed.

## 12. Interaction And Mutation Boundary

This contract owns candidate/selection semantics, not repository/application mutation authorization.

```text
accepted Proposal/Decision meaning
≠ automatic mutation authorization
```

Actual mutation follows the ambient Session proposal-first/authorization rules and the applicable repository/application authority contract.

## 13. Key Invariants

```text
legacy Idea = current Proposal compatibility meaning, not a second ontology
Generic AI Proposal (GIP) ≠ accepted material selection / Decision semantics
formal Proposal ≠ authority
Finding ≠ selection
candidate refinement ≠ automatically a new Proposal
materially different selectable answer → separate Proposal
Candidate Bundle ≠ Planning Branch
fallback ≠ current Decision unless selected
Rationale ≠ Evidence
selected meaning ≠ automatic persistence
accepted semantic change ≠ automatic repository mutation
selected future meaning ≠ realized/current-owner truth unless the active owner contract says realization has occurred
```
