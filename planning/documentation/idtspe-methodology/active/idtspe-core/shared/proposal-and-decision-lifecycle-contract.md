# Proposal And Decision Lifecycle Contract

Status: active generic IDTSPE Core owner
Purpose: define the canonical candidate-to-selection semantics for material Proposals and Decisions without coupling that lifecycle to any one conversation surface, Target Module, Lens, compatibility vocabulary or persistence representation.

## 1. Ownership Boundary

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
= interaction/authorization boundary for actual mutation
```

A Proposal is candidate Core State. It is not accepted product/methodology authority merely because it was suggested, formalized, analyzed, recommended or selected by an AI-only heuristic.

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
             | Problem
```

For approval-relevant formal Proposals, the motivating Question and/or Problem must be visible explicitly, inline or by reference. A missing material driver is an unresolved planning gap rather than a free-floating Proposal.

The Target Goal / Desired Outcome is Target/scope context; this contract does not introduce a separate Generic Goal State Unit. A `Need Candidate` may be the intake/disposition subject that establishes or refines that desired-outcome context before a concrete candidate answer exists. When disposition yields a real candidate answer, this Proposal lifecycle takes over; the Proposal may retain the Need/Source reference as driver provenance without copying a parallel Need-owned semantic result.

A lightweight conversational AI proposal may remain informal when formal addressability/lifecycle adds no value. If formalized, it becomes the same candidate Proposal role and remains unselected.

Source material is not automatically a Proposal. Facts, constraints, accepted Decisions, Questions, corrections, Evidence and provenance keep their own meaning unless an actual candidate answer is present.

## 3A. Proposal Payload And Unit Resolution

A Proposal is a **candidate resolution** for a material planning subject. It may carry:

```text
Proposed Result Meaning
  candidate meaning that could become part of affected Unit/owner Result Content

Proposed Resolution / Realization Route
  candidate way to obtain/prove/realize the result when the route itself is material
```

Either part may exist alone; complex Proposals may contain both. Proposal payload is candidate meaning, not Current Result Content.

When a Proposal is Unit-local, relate it to the affected Unit Resolution. Cross-Unit/Target-wide Proposals remain valid when their natural subject spans several Units or the Target itself.

## 3B. Proposal Target Result — Candidate Target Instance Under Proposal Authority

When the USER/current process asks for a **Proposal of a Target Result** (for example a proposed Feature Definition, Scenario Journey Composition or another Target Module result), form an ordinary **candidate Target Instance** through the normal Target Module/Local Target Contract. Candidate Target Instance structure is owned by the canonical [Target Instance model](target-type-instance-source-and-relation-model.md#candidate-target-instance); this Proposal contract owns the enclosing candidate authority/lifecycle.

```text
enclosing Proposal / Planning Branch
→ owns candidate authority/status
→ contains candidate Target Instance

candidate Target Instance
→ ordinary Target identity / relations / Source Set
→ complete Module-defined Unit inventory
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

Grounding does not authorize selection: a well-grounded AI Proposal is still unselected until normal authority selects it.

## 5. Candidate Review

AI may autonomously inspect, compare, challenge, refine and recommend candidate Proposals inside the authorized work scope.

For a material Proposal under review, perform the useful checks proportionally. The check is required when the corresponding question is material; empty output is not required when no issue is found.

```text
Driver / Need fit
  does the Proposal actually answer the Goal / Question / Problem?

Necessity / Better Route
  can it be omitted?
  can the underlying problem be removed/avoided?
  does an existing mechanism already cover the need?
  is a smaller/simpler route sufficient?

Refinement
  can the same candidate be clarified, narrowed, simplified, strengthened,
  split/combined or made conditional without becoming a different answer?

Local consistency
  is the candidate internally coherent for its scoped owner/driver?

Integrated consistency
  does it fit affected upstream/downstream/current owners and accepted meaning?

Combination evaluation
  when several Proposals are meant to coexist, does their combination remain coherent?
```

Review should expose proportionally what is useful for the current decision, such as:

```text
what is proposed
driver / problem being addressed
source/provenance when useful
affected current owner/authority
expected effect / benefit
material benefits / downsides / risks
constraints / must-preserve meaning
important unknowns / assumptions
durable Requirement / Decision / owner consequence when any
proof consequence
known Evolution consequence
what remains unchanged
AI recommendation when useful
what that recommendation sacrifices
reconsider trigger when useful
```

Do not manufacture competing alternatives or objections merely for symmetry. When several real options remain, make the situational decision priorities visible when that materially helps review.

Complexity or other comparison dimensions are review aids, not mandatory Proposal schema fields unless a consuming owner explicitly requires them. When a compact complexity comparison helps, it may use:

```text
Complexity delta: REDUCES | ROUGHLY-NEUTRAL | ADDS
Complexity consequence: <relevant semantic / ownership / structural / state / coupling / maintenance / proof / operational / migration / evolution effect>
```

Do not equate fewer classes/lines with lower total system complexity.

## 5A. Proposal Semantic Change Impact Review

Every **material Proposal** receives a proportional semantic-impact review as part of Candidate Review, regardless of whether it came from a Finding, USER input, AI reasoning, Target Module discovery aid or ordinary Unit Resolution.

Resolve only the dimensions that are material:

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

## 6. Selection Outcomes

Material Proposal review may lead to:

```text
APPROVE
REJECT
REVISE
DEFER
```

These are working lifecycle outcomes; they do not require persisted status metadata on every Proposal.

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

A separate explicit/durable Decision record is proportional. Retain it when removing the Decision and keeping only Result Content would lose material future value, for example:

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

If a new material Decision lacks a rationale that would help future review/revalidation, the interaction layer may ask whether a short rationale should be retained. These optional retention choices are not blocking approval gates unless the missing meaning itself is needed to resolve ambiguity.

Semantic retention does not imply a dedicated file. Physical persistence is resolved separately by Representation / P-14.

A useful Proposal discovered outside the current Target does not require a global Idea/Future-Idea ontology or mandatory inbox. When retaining it has independent continuation/review value, keep it as ordinary Proposal State with enough context to recover its driver/provenance and let Documentation / Representation choose a natural owner, existing register/inbox, another selected owner, or no physical persistence. A register is navigation/retention infrastructure only; it does not select the Proposal or make it backlog/product authority.

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
AI Proposal ≠ accepted material selection / Decision semantics
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
