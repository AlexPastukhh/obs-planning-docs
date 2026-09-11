# Reusable Guidance Model — SDS Shared Contract

Role: common methodology-guidance semantics for reusable SDS lenses/knowledge bases

This contract defines how reusable questions, reusable requirements/candidates, principles and solution patterns are consumed without becoming a second product/application Requirement authority.

## Recommended means

```text
preferred ready-made model
→ consult when relevant
→ adopt by default when it fits
→ adapt/replace when a better context-specific option is justified
→ never auto-promote into durable owner Requirement authority
```

A process rule may require consulting relevant guidance. The reusable content itself remains recommended guidance until local applicability and owner selection are established.

## Reusable semantic forms

### Reusable Question

A recurring question that helps discover whether a material constraint, ownership issue or design decision exists. It may produce no change, an owner-local Requirement, a design alternative, boundary/owner change, proof obligation or OPEN question.

### Reusable Requirement — `RR-*`

A reusable, substantially formed generic constraint that may be adopted locally when relevant. Reusable does not mean globally mandatory.

Stable families when reference-worthy:

```text
RR-DDD-*
RR-VS-*
RR-PRG-*
```

### Reusable Requirement Candidate — `RRC-*`

A recurring possible constraint that still requires contextual discovery. Assign a stable ID only when the candidate is stable/reference-worthy; do not number every prompt or heuristic.

### Reusable Guidance Group — `RG-*`

Stable semantic group identity for a reusable reasoning cluster:

```text
RG-DDD-*
RG-VS-*
RG-PRG-*
```

A group may contain questions, requirements/candidates, heuristics, pattern/solution options, applicability, risks, proof implications and Evolution implications.


Recommended stable semantic examples:

```text
RG-DDD-IDENTITY
RG-DDD-CONSISTENCY-BOUNDARY
RG-DDD-LIFECYCLE
RG-DDD-DOMAIN-PROOF

RG-VS-FEATURE-SLICE-BOUNDARY
RG-VS-END-TO-END-REALIZATION
RG-VS-SIDE-EFFECT-RECOVERY
RG-VS-CHANGE-LOCALITY
RG-VS-FEATURE-PROOF

RG-PRG-SEMANTIC-CONTRACTS
RG-PRG-DEPENDENCY-DIRECTION
RG-PRG-FAILURE-SEMANTICS
RG-PRG-CONCURRENCY
RG-PRG-AUTHORITY-TRUST
RG-PRG-TESTABILITY
```

Do not number ordinary prompts, heuristics or tentative candidates merely because they appear in a guide.

### Reusable Solution / Pattern

A ready-to-consider implementation shape that may satisfy one or more selected needs. Listing a pattern never selects it.

### Local Decision

The selected answer belongs to the natural consuming owner/context, not to this reusable file. It may remain code-native, live temporarily in discovery, become an owner-local Requirement/Decision, or become an ADR only when cross-owner/long-lived architectural rationale warrants it.

## Local adoption / authority rule

A reusable Requirement becomes durable owner-local meaning only when:

```text
local problem makes it relevant
+ applicability is confirmed
+ the natural owner selects/adopts it
```

The consuming owner may adopt wording, narrow it, combine it, reject it, satisfy the intent without durable documentation, or discover that the issue belongs upstream.

Valid local outcomes include:
- derive a new owner-local IR/PFR;
- refine/replace/retire an existing owner Requirement;
- select code-level realization with no durable documentation;
- select a durable Decision because rationale/risk/question/problem must survive;
- decide that nothing should change;
- reopen behavior/boundary/Domain ownership when the issue is upstream.

### No live normative inheritance

Do **not** define current owner truth as:

```text
IR-... = obey RR-...
```

Instead, when provenance remains useful:

```text
IR-...
Requirement:
  <independently approved local must-hold constraint>

Reusable discovery source: optional
  RR-... / RG-...
```

Changing reusable guidance later does not silently change accepted owner Requirements. It may create review pressure only; owner changes remain proposal/user-approval governed.

Durable owners should omit reusable-source references by default. Keep them only when the reusable option/trade-off space has continuing discovery value, not merely as historical provenance.

## Flexible reasoning forms

No single mandatory schema. Valid entry shapes include:

```text
Question-first
Requirement-candidate-first
Solution-options-first
```

Useful semantic pieces include:

```text
Question / trigger
Requirement candidate
selected/local decision or OPEN
solution options when useful
applicability
risks / downsides / problem classes
follow-up questions
proof consequences
known Evolution consequences
```

### Consuming-owner decision form

When durable review value exists, an owner may use this proportional form:

```text
Decision — <semantic problem>
Source: <Feature/BR / Scenario must-hold / Evolution / Evidence>
Question: ...
Reusable guidance: <DDD / Vertical Slice / Programming topic>
Applicable reusable requirement/candidate: optional
Selected decision: <direction | OPEN>
Why: ...
Rejected/deferred alternatives: ...
Risks/problems/trade-offs accepted: ...
Open questions: ...
Proof obligations: ...
Known Evolution consequences: ...
```

This is recommended, not mandatory, and it remains with the consuming owner/context.

## Cross-guide composition

```text
Vertical Slice
= end-to-end use-case realization, Feature/Slice boundary, change locality, proof

DDD
= Domain semantic ownership, identity, consistency, lifecycle, Domain proof

Programming Principles
= generic implementation-quality reasoning across owners/styles

Implementation Requirements Discovery
= asks whether reasoning should become a durable owner-local IR/PFR and routes it
```

One local decision may use several guides. The thematic guide explains the concern; Requirements Discovery decides whether a durable must-hold constraint should be selected and where it belongs.

## Reusable guidance ownership / change rule

Reusable content is durable methodology guidance owned by its guide/knowledge group, not product authority.

```text
reusable DDD guide
→ owns RG-DDD-* questions/RR/RRC/patterns/trade-offs

reusable Vertical Slice guide
→ owns RG-VS-* questions/RR/RRC/patterns/trade-offs

[`programming-principles/README.md`](programming-principles/README.md) + selected detail entries
→ own RG-PRG-* questions/RR/RRC/patterns/trade-offs as reusable knowledge, not Lens operations
```

Concrete Feature/Domain/Slice/Shared owners own only their independently selected local meaning. Material edits that can change future discovery direction are proposal-first, including applicability changes, new/removed RR/RRC, materially changed solution space/trade-offs, Feature/Slice boundary heuristics, DDD ownership rules or programming-principle interpretation.



### Programming Principles registry boundary

The complete 22-group Programming Principles corpus is indexed by [`programming-principles/README.md`](programming-principles/README.md). Scan compact triggers first, open only materially matched `RG-PRG-*` detail entries, then apply them through a natural Target/Lens evaluator. `NO_MATERIAL_PRINCIPLE_ENTRY` is valid. The registry and knowledge entries do not create Findings or owner-local Requirements by themselves.

## Evolution integration

Reusable guidance consumes current selected meaning + relevant selected Evolution Steps + implementation/proof Evidence. It does not create another Evolution roadmap.

Ask proportionally whether known change affects the decision, causes avoidable Forced Migration, can remain local, justifies a seam now, or should remain OPEN.
