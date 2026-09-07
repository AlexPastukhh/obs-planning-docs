# Reusable Guidance Model

Status: recommended reusable-guidance framework
Process authority: [`../documentation-use-cases.md`](../documentation-use-cases.md)
Reusable content owner: this file

This file defines common reusable-guidance semantics. It is not product/application Requirement authority.

## Recommended guidance semantics

In this methodology, `recommended` means:

```text
preferred ready-made model
→ consult when relevant
→ adopt by default when it fits
→ adapt or replace when a better context-specific solution is justified
→ never auto-promote into durable owner Requirement authority
```

This distinction is important:

```text
process rule
→ may require consulting/evaluating relevant reusable guidance

reusable content
→ remains recommended guidance, not a must-hold product Requirement
```

A materially different alternative should be surfaced through the normal proposal process with its decision criteria, complexity delta and trade-offs.

## Reusable guidance consumption model

Reusable guidance uses a shared semantic vocabulary so they do not accidentally create a second Requirement authority.

## Reusable Question

A recurring question that helps discover whether a material implementation constraint or design decision exists.

Example:

```text
What state must remain mutually consistent after one semantic operation?
```

A question may produce:

- no special Requirement;
- one owner-local Requirement;
- a design alternative;
- an Aggregate boundary change;
- a Slice boundary change;
- a proof obligation;
- an OPEN product/technical question.

## Reusable Requirement

A reusable Requirement is a fully formed generic constraint that is useful across multiple owners/problems.

Example:

```text
A semantic consistency boundary should have one authoritative owner
for invariant-preserving mutation.
```

Its wording may already be complete enough to adopt locally without rewriting.

But reusable does **not** mean globally mandatory.

A reusable Requirement becomes a durable owner-local Implementation Requirement only when:

```text
the local behavior/problem makes it relevant
+
its applicability is confirmed
+
the owner selects/adopts that constraint
```

The consuming owner may:
- adopt it substantially as written;
- narrow it to the owner's actual context;
- combine it with another requirement;
- reject it as unnecessary;
- satisfy its intent only through code without creating a durable owner Requirement when no durable constraint needs to be recorded.

## Reusable Requirement Candidate

A reusable Requirement Candidate is less settled: a recurring possible constraint that Discovery should evaluate.

It may be question-derived, context-dependent or intentionally incomplete.

It is never imported automatically into a consuming owner.

## Reusable Solution / Pattern

A ready-to-consider implementation shape that may satisfy one or more requirement candidates.

Example:

```text
Aggregate Root
Application Service
Slice Module
Entry Adapter
Shared Capability
Result<T,E>
immutable Value Object
idempotency key
transaction
outbox
reconciliation loop
```

A reusable solution is never selected merely because it is listed.

## Local Decision

The selected answer for one Feature/Slice/Aggregate/Shared owner.

The local decision belongs in:

- Feature Implementation Concern while Feature feasibility/boundary is still being understood;
- non-persistent Slice/Aggregate plan while implementation is being designed;
- durable owner Requirement/Decision section when the decision has long-lived value;
- ADR only when the decision itself has cross-owner/long-lived architectural value.

The reusable guidance file should not be edited to record project-specific local decisions.

A reusable guidance entry may be consumed in several valid ways:

```text
Reusable Question / Reusable Requirement / Requirement Candidate / Principle / Pattern
→ local reasoning
→ one of:
   - derive a new owner-specific Implementation Requirement;
   - refine/replace/retire an existing owner-specific Requirement;
   - select a code-level realization/decision with no durable documentation;
   - select a documented Decision because durable rationale/risk/question/problem exists;
   - decide that nothing should change;
   - reopen behavior/boundary/domain ownership if the issue is upstream.
```

Therefore reusable guidance may contain:
- questions that help derive local Requirements;
- ready reusable Requirement Candidates;
- ready fuller Requirements that are commonly applicable but still require local applicability selection;
- one or several solution variants;
- principle explanations embodied as one or more solution variants;
- trade-offs, risks, problems, limitations and follow-up questions for each solution;
- cases where consciously **not** applying a principle is a valid option.

The consuming owner records only what becomes durable local meaning.
A code-level decision that is clear in source and carries no durable rationale/risk/question/problem does not need a documentation record.

---


## Reusable Guidance Group and reusable Requirement identity

Reusable guidance should be referenceable by stable semantic group identity so a consuming owner can say which reusable reasoning was applied without copying the group.

Reusable Requirements inside those groups should also have stable readable IDs when they are intended for repeated reference/adoption.

Recommended families:

```text
RG-DDD-<SEMANTIC-TOPIC>          reusable DDD guidance group
RG-VS-<SEMANTIC-TOPIC>           reusable Vertical Slice guidance group
RG-PRG-<SEMANTIC-TOPIC>          reusable Programming Principles guidance group

RR-DDD-<SEMANTIC-REQUIREMENT>    reusable DDD Requirement
RR-VS-<SEMANTIC-REQUIREMENT>     reusable Vertical Slice Requirement
RR-PRG-<SEMANTIC-REQUIREMENT>    reusable Programming Principle Requirement
```

Requirement Candidates receive stable `RRC-*` IDs only when they are sufficiently stable/reference-worthy
that other guidance or review material benefits from referencing them.

Ordinary discovery questions, prompts, heuristics and tentative ideas remain unnumbered.

Do not assign IDs mechanically merely because an entry exists in a reusable guidance file.

Examples:

```text
RG-DDD-CONSISTENCY-BOUNDARY
RR-DDD-ONE-AUTHORITY-PER-SEMANTIC-CONSISTENCY-BOUNDARY

RG-VS-SIDE-EFFECT-RECOVERY
RR-VS-RECONCILE-UNCERTAIN-NON-IDEMPOTENT-SIDE-EFFECT-BEFORE-RETRY

RG-PRG-DEPENDENCY-DIRECTION
RR-PRG-DEPEND-ON-STABLE-SEMANTIC-CONTRACT-WHEN-A-REAL-BOUNDARY-NEEDS-A-SEAM
```

When a reusable Requirement is adopted by a concrete owner:

```text
Reusable Requirement RR-...
→ discovery source/reference

Owner-local IR-...
→ natural owner canonical Requirement for this application context
```

The owner-local Requirement may adopt the reusable wording as-is or specialize it.

The recommended model is: **do not use live normative inheritance from `RR-*` into an owner.**

This is the preferred safe default because it prevents later reusable-guidance edits from silently changing already selected owner meaning. A different inheritance model may be proposed only when its authority/update semantics are made explicit and are stronger for the current context.

That means an owner must not define its current requirement only as:

```text
IR-... = obey RR-...
```

because a later reusable-guidance edit would silently change already approved product/application truth.

Instead:

```text
IR-...
Requirement:
<the locally approved current constraint>

Reusable source:
RR-...
```

The `RR-*` remains reusable guidance authority;
the `IR-*` is independently approved product/application owner authority.

Changing `RR-*` later does not change an existing `IR-*`.
It may create review pressure to reconsider affected owners, but every owner Requirement change still needs explicit user approval.

Changing the canonical wording of an `RR-*` itself is a **reusable-guidance change**, not a product/application durable Requirement change.

It still requires a proposal and user confirmation because reusable guidance is maintained through proposal-first methodology governance.
The reason is preservation of the recommended reusable model, not automatic promotion of `RR-*` into owner-local Requirement authority.

Recommended identity families:

```text
RG-DDD-<SEMANTIC-TOPIC>
RG-VS-<SEMANTIC-TOPIC>
RG-PRG-<SEMANTIC-TOPIC>
```

Examples:

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
RG-PRG-ERROR-SEMANTICS
RG-PRG-CONCURRENCY
RG-PRG-AUTHORITY-AND-TRUST
RG-PRG-TESTABILITY
```

A durable owner should **omit `Applied reusable guidance` by default**.

A selected owner-local Requirement should normally be understandable from:

```text
its own canonical Requirement text
+
natural owner semantics
+
optional durable Decision/Risk/Question/Problem when needed
```

Keep an `RG-*` / `RR-*` source reference only when it has continuing value for later discovery,
for example when the reusable group contains a substantial option/trade-off space likely to be re-opened.

If retained, a reference such as:

```text
Reusable discovery source:
- RG-VS-SIDE-EFFECT-RECOVERY
- RR-PRG-...
```

means only:

> this reusable material remains useful context for future discovery.

It does **not** mean:

> the owner live-inherits the current or future contents of that reusable group/Requirement.

The owner-local `IR-*` text remains independently approved authority.
Changing `RG-*` / `RR-*` later never silently changes the owner.

Do not retain reusable-guidance references merely as historical provenance.
If the owner is fully understandable without them, omit them.

A guidance group may contain any useful combination of:

```text
questions
requirement candidates
decision heuristics
solution/pattern options
applicability conditions
risks / downsides / known problem classes
follow-up questions
proof implications
Evolution implications
```

The group is reusable discovery guidance, not a package of requirements to inherit.

## Reusable guidance content ownership

Reusable questions, principle explanations, solution variants, risks/downsides,
follow-up questions and reusable Requirements are not ownerless.

Their natural methodology owner is the corresponding reusable guidance file and `RG-*` group:

```text
methodology-guidance/reusable-ddd-domain-discovery.md
→ owns RG-DDD-* reusable DDD discovery content

methodology-guidance/reusable-vertical-slice-discovery.md
→ owns RG-VS-* reusable Vertical Slice discovery content

methodology-guidance/reusable-programming-principles.md
→ owns RG-PRG-* reusable programming-principle discovery content
```

This is **methodology guidance ownership**, not product/application Requirement ownership.

Example:

```text
RG-PRG-DEPENDENCY-DIRECTION
→ may own reusable questions, RR-PRG-..., solution options and trade-offs

SL-RPKG-...
→ may consume that guidance
→ owns only the locally approved IR-SLICE-... Requirement(s), if any
```

Therefore the reusable guide owns the reusable material itself,
while concrete Slice/Domain/Shared owners own only their selected local durable Requirements.

### Reusable guidance change approval

Reusable guidance is durable methodology content even when it is not product authority.

AI must request user confirmation before materially changing reusable guidance in a way that can alter future discovery or selected implementation direction, including:

```text
adding/removing a materially important discovery question
changing applicability of a principle
adding/removing/changing a Reusable Requirement
changing a Requirement Candidate in a materially stronger/weaker direction
adding/removing a solution option when that changes the realistic design space
changing risks/downsides/trade-offs in a way that could change selection
changing Feature/Slice boundary heuristics
changing DDD ownership/consistency guidance
changing generic programming-principle interpretation
```

Even semantic-preserving editorial improvements to reusable guidance follow proposal-first execution.
They can be proposed as low-risk cleanup, but are not applied without user confirmation.

The same applies to minor non-material additions.
The user may approve them quickly without deep inspection; AI still asks first.



## Flexible reasoning forms

Reusable files should use a flexible family of forms rather than one mandatory schema.

Common semantic pieces:

```text
Question / trigger
Requirement candidate
Decision / selected direction
Solution options when useful
Questions / risks / problems / downsides
Proof consequences
Evolution consequences
```

The entry may start from different places.

## Question-first form

```markdown
### <topic>

Question:
<what must be understood?>

Possible reusable requirement:
<general constraint that may follow if applicable>

Candidate solutions:
- A — ...
- B — ...

For each candidate:
- useful when:
- benefits:
- risks / downsides:
- follow-up questions:
- proof consequences:
- known Evolution consequences:

Local decision:
<recorded by the consuming owner, not in this reusable file>
```

## Requirement-first form

```markdown
### <topic>

Reusable requirement candidate:
<general constraint>

Why / when it matters:
<applicability>

Questions to resolve locally:
- ...

Common solution options:
- ...

Risks if over-applied:
- ...

Risks if ignored:
- ...
```

## Solution-options-first form

```markdown
### <problem family>

Question:
<what problem is being solved?>

Requirement candidates:
- ...

Options:

#### Option A — <pattern>
Useful when:
...
Advantages:
...
Risks / problems:
...
Questions before selecting:
...
Proof implications:
...
Evolution implications:
...

#### Option B — <pattern>
...
```

## Consuming-owner decision form

```markdown
### Decision — <semantic problem>

Source:
<Feature Step / BR / SR / Evolution / Evidence>

Question:
...

Reusable guidance:
<DDD / Vertical Slice / Programming Principle topic>

Applicable requirement candidate:
...

Selected decision:
<selected direction | OPEN>

Why:
...

Rejected / deferred alternatives:
- ...

Risks / problems / trade-offs accepted:
- ...

Open questions:
- ...

Proof obligations:
- ...

Known Evolution consequences:
- ...
```

This is recommended, not mandatory.

---



## Cross-guide composition

The three reusable guides have different responsibility:

```text
Vertical Slice guidance
= end-to-end use-case realization and Slice boundary/change locality

DDD guidance
= semantic Domain object/identity/consistency/lifecycle ownership

Programming Principles guidance
= generic implementation-quality questions across owners/styles
```

Examples:

```text
“Is this a separate Feature/Slice or a branch?”
→ Vertical Slice

“Is this thing an Entity or Value Object?”
→ DDD

“Should this dependency be behind an interface?”
→ Programming Principles first,
  then Vertical Slice/DDD only if the boundary has Slice/Domain meaning

“How do we prevent checked external identity
from changing before an irreversible side effect?”
→ Programming Principles: authority/TOCTOU
→ Vertical Slice: side-effect/recovery boundary
→ selected Shared Capability if reuse is real
```

A consuming decision may reference more than one reusable guide.

---

## Evolution integration

All three reusable guidance files must use the existing common rule:

```text
current selected meaning
+
relevant known Evolution Steps
+
implementation/proof Evidence
→ local Discovery
```

They must not create a second Evolution roadmap.

Reusable guides should ask:

```text
Does a known Step change this decision?
Would this decision create avoidable Forced Migration?
Can known Expansion stay local?
Is a Refactoring seam justified now?
Is future detail still OPEN?
```

Selected future behavior remains owned by canonical Evolution Step / target Feature/Scenario/owner.

---
