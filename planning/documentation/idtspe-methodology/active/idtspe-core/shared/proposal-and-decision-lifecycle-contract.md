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

The Target Goal / Desired Outcome is Target/scope context; this contract does not introduce a separate Generic Goal State Unit.

A lightweight conversational AI proposal may remain informal when formal addressability/lifecycle adds no value. If formalized, it becomes the same candidate Proposal role and remains unselected.

Source material is not automatically a Proposal. Facts, constraints, accepted Decisions, Questions, corrections, Evidence and provenance keep their own meaning unless an actual candidate answer is present.

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

## 7. Answer / Recommendation / Proposal / Decision Boundary

Keep these meanings distinct:

```text
Answer / Evidence
= factual or interpretive resolution of a Question/evidence gap

Proposal
= candidate answer/solution/approach that may be selected

Recommendation
= AI/other recommendation for a Proposal/route; not selection

Decision
= actually selected material meaning under the applicable authority
```

A Question can be answered while a separate Decision is still needed. A recommendation can be strong without being selected. A Proposal can remain viable without being recommended.

## 8. Decision Formation And Trace

Accepted material meaning becomes authoritative only through the normal Decision / Target Result / natural-owner path.

A material Decision may retain useful trace:

```text
Decision

Addresses
  Target Goal context / Question / Problem / Q/R/P when useful

Selected
  Proposal / compatible Proposal set / Candidate Bundle when useful

Rationale / Why
  optional concise selection reasoning

Integrated Into
  natural semantic owner / Result meaning when useful

Affected Owners
  owners requiring review/revalidation; not silent rewrite authority

Evidence / Q/R/P / alternative references
  only when useful

Exposes
  newly material Question / Risk / Problem when the selection reveals one

Reconsider When
  concrete revalidation trigger when useful
```

Relations are many-to-many: one Decision may address several Q/R/P; one Q/R/P group may require several Decisions; one Decision may expose new Q/R/P.

`Rationale / Why` is not Evidence. Evidence is independently sourced/supporting meaning; rationale explains why available meaning led to the selection.

Decision trace is explanatory/revalidation metadata, not a new Decision type.

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
AI Proposal ≠ accepted Decision
formal Proposal ≠ authority
Finding ≠ selection
candidate refinement ≠ automatically a new Proposal
materially different selectable answer → separate Proposal
Candidate Bundle ≠ Planning Branch
fallback ≠ current Decision unless selected
Rationale ≠ Evidence
selected meaning ≠ automatic persistence
accepted semantic change ≠ automatic repository mutation
```
