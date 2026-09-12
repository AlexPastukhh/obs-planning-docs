# Proposal And Decision Lifecycle Contract

Status: active generic IDTSPE Core owner  
Purpose: define the canonical candidate-to-selection semantics for material Proposals and Decisions without coupling that lifecycle to any one conversation surface, Target Module, Lens, or persistence representation.

## 1. Ownership Boundary

```text
Proposal / Decision lifecycle
= this contract

Broad Discussion / Integration Checkpoint
= how lifecycle meaning may be surfaced and integrated conversationally

User-input intake
= how natural-language USER input is classified into Source / Proposal / Decision / answer meaning

Target Module
= reusable Proposal/variant discovery aids for one Target family

Lens / Finding Disposition
= may surface candidate meaning; does not select it

Session Runtime
= interaction/authorization boundary for actual mutation
```

A Proposal is candidate Core State. It is not accepted product/methodology authority merely because it was suggested, formalized, analyzed, or recommended.

## 2. Proposal Identity And Drivers

A material formal Proposal is an explicit candidate answer/solution/approach that preserves the decision driver it addresses.

```text
Proposal
→ addresses → current Target Goal / Desired Outcome context
             | Question
             | Problem
```

For approval-relevant formal Proposals, the motivating Question and/or Problem must be visible explicitly, inline or by reference. A missing material driver is an unresolved planning gap rather than a free-floating Proposal.

The Target Goal / Desired Outcome is Target/scope context; this contract does not introduce a separate Generic Goal State Unit.

A lightweight conversational AI Proposal may remain informal when formal addressability/lifecycle adds no value. If formalized, it becomes the same candidate Proposal role and remains unselected.

## 3. Proposal Space And Relations

One driver may have zero, one or many candidate Proposals. Preserve real alternatives rather than flattening them into one answer.

Useful lightweight relations include:

```text
Proposal ↔ competes-with ↔ Proposal
Proposal ↔ complements ↔ Proposal
Proposal → requires → Proposal
Proposal ↔ conflicts-with ↔ Proposal
Proposal → part-of-candidate-bundle → Candidate Bundle / Option Group
```

A Candidate Bundle / Option Group groups compatible Proposals for comparison. It is a projection by default, not a new mandatory State Unit, semantic owner, Target, or Planning Branch.

Use a Planning Branch only when an alternative needs a materially deep downstream counterfactual planning network.

## 4. Candidate Review

AI may autonomously inspect, compare, challenge, refine and recommend candidate Proposals inside the authorized work scope. Review should expose proportionally what is useful for the current decision, such as:

```text
what is proposed
driver / problem being addressed
affected current owner/authority
material benefits / downsides / risks
durable Requirement / Decision / owner consequence when any
proof consequence
known Evolution consequence
what remains unchanged
AI recommendation when useful
what that recommendation sacrifices
```

Do not manufacture competing alternatives merely for symmetry. When several real options remain, make the situational decision priorities visible when that materially helps review, together with the AI recommendation and what that recommendation sacrifices.

Complexity or other comparison dimensions are review aids, not mandatory Proposal schema fields unless a consuming owner explicitly requires them. When a compact complexity comparison helps, it may use:

```text
Complexity delta: REDUCES | ROUGHLY-NEUTRAL | ADDS
Complexity consequence: <relevant semantic / ownership / structural / state / coupling / maintenance / proof / operational / migration / evolution effect>
```

Do not equate fewer classes/lines with lower total system complexity.

## 5. Selection Outcomes

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

An AI recommendation is not selection. A Lens Finding, Evidence item, validator result, or Finding Disposition is not selection by itself.

## 6. Decision Formation And Trace

Accepted material meaning becomes authoritative only through the normal Decision / Target Result / natural-owner path.

A material Decision may retain useful trace:

```text
Decision

Addresses
  Target Goal context / Question / Problem / Q-R-P when useful

Selected
  Proposal / compatible Proposal set / Candidate Bundle when useful

Rationale / Why
  optional concise selection reasoning

Evidence / Risk / Problem / alternative references
  only when useful

Exposes
  newly material Question / Risk / Problem when the selection reveals one
```

`Rationale / Why` is not Evidence. Evidence is independently sourced/supporting meaning; rationale explains why available meaning led to the selection.

Decision trace is explanatory/revalidation metadata, not a new Decision type.

## 7. Retention

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

## 8. Durable Decision Protection Under Proposal Review

A code-only/transient Decision does not need durable documentation merely because it existed during planning. But when an existing **durable** Decision preserves material risk, Question/Problem, trade-off, trust/support assumption, reconsideration trigger or cross-owner maintenance reasoning, a Proposal that would replace, materially reinterpret or remove it must make visible:

- what becomes obsolete;
- what remains materially relevant;
- residual Risk/Problem;
- affected downstream meaning / revalidation consequence.

Do not silently erase durable Decision rationale through lower-level realization.

## 9. Revalidation

Re-evaluate affected Proposal/Decision meaning when material inputs change, including:

- USER amendment or redirect;
- new Evidence or a Finding challenging a selected assumption;
- owner/Target boundary change;
- selected upstream Decision change;
- known Evolution becoming concrete enough to alter the decision basis.

Preserve unaffected accepted meaning. Do not reopen the entire decision space merely because one dependent item changed.

## 10. Interaction And Mutation Boundary

This contract owns candidate/selection semantics, not repository/application mutation authorization.

```text
accepted Proposal/Decision meaning
≠ automatic mutation authorization
```

Actual mutation follows the ambient Session proposal-first/authorization rules and the applicable repository/application authority contract.

## 11. Key Invariants

```text
AI Proposal ≠ accepted Decision
formal Proposal ≠ authority
Finding ≠ selection
Candidate Bundle ≠ Planning Branch
Rationale ≠ Evidence
selected meaning ≠ automatic persistence
accepted semantic change ≠ automatic repository mutation
```
