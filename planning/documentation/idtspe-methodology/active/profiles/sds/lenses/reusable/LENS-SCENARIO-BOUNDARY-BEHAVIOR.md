# LENS-SCENARIO-BOUNDARY-BEHAVIOR — Scenario Boundary / DATA / Behavior Completeness

Lens ID: `LENS-SCENARIO-BOUNDARY-BEHAVIOR`  
Activation: `TARGET_PROFILE_REUSABLE`

## Purpose

Keep Scenario identity tied to one independently meaningful Need/result while making behavior, semantic DATA, failures, invariants and acceptance complete enough for downstream planning.

## Applicability Gate

Primary for Scenario Discovery/Draft; selected sublenses support Screen/Slice/Test.

## Target Inputs / Evidence

```text
Application Definition
Refined Core Real-Life Scenario when present
Step-02 fallback
Prototype Evidence
existing Scenario/must-hold owners
```



## Analysis Surface

### Primary Result Units / Semantic Selectors

- `TM-SCENARIO-DISCOVERY`: `RU-SDISC-01..RU-SDISC-02`
- `TM-SCENARIO-DRAFT`: `RU-SCEN-01..RU-SCEN-04`

### Conditional Result Units / Semantic Selectors

- `TM-SCREEN`: `RU-SCREEN-01` only for reversible spatial relation checks

### Relevant State Units

```text
Questions
Ideas / Planning Branches when comparison is material
Q/R/P
Decisions
Evidence / Evidence Needs
Revalidation state
```

### Context

- Application Definition
- Need / real-life scenario Sources
- Prototype Evidence
- Screen ideas without treating them as Scenario authority

Context availability does not mean this Lens audits all context. The deliberate focus remains the Result/State meaning named above.

## Supported Operations

```text
ANALYZE
CHECK
REFINE
CHALLENGE
```

- `ANALYZE` inspects the Analysis Surface through this Lens perspective.
- `CHECK` evaluates current meaning against this Lens's criteria/guards.
- `REFINE` surfaces a proposal for more precise/missing meaning where the semantic destination is already understood.
- `CHALLENGE` surfaces reasons selected/accepted meaning may be weak, stale, unsupported or wrong.

`REOPEN`, State-Unit creation/refinement, cross-owner handoff and Result Unit update after resolution are Core Finding-Disposition/lifecycle consequences, not Lens methods.

## Independent Need / Result Boundary

```text
independent actor/user Need?
observable/useful result?
button/command/API/backend operation only? → not enough
split/merge/inside-parent candidate?
```

## Scenario Scope Split / Merge

If decomposition exposes another independently meaningful Need/result, surface a Scenario-scope challenge/revalidation finding. Core disposition/lifecycle decides whether Scenario Scope is reopened; DATA/Behavior addressability alone does not create another Scenario.

## Behavior Completeness

Check main, alternate, failure/rejection, no-mutation and information-presentation behavior proportionally.

## Scenario DATA Meaning / Authority

```text
What does the information mean in Scenario terms?
Why is it needed/produced?
Where does truth come from?
When is it available?
Who consumes/produces/changes it?
Local/shared/external owner?
```

DTO/DB/component state does not define Scenario DATA.

## Behavior Item Addressability

Create an addressable Behavior Item only when stable reference/reuse/review value exists.

Allowed behavior kinds include action/response, state transition, decision/policy, validation/rule, invariant, failure/rejection, no-mutation and information derivation/presentation.

## Requirement / Invariant Exposure

Keep must-hold meaning visible. Natural layer owns it by default; standalone `TM-REQUIREMENT` is exceptional.

## Acceptance / Observable Proof

Scenario result must be concrete enough that later proof can observe it without prescribing test implementation.

## Screen Placement Reversibility

Screen placement may realize behavior but should not define Behavior/DATA identity. Compose with UI pack.

## Domain-Clue Sublens

Expose identity/lifecycle/value/rule/consistency clues without prematurely choosing DDD patterns.

## Typical Findings

```text
Scenario split/merge/boundary
Behavior completeness
DATA owner/authority
Behavior Item addressability
must-hold/acceptance meaning
Screen relation clues
Domain clues
Q/R/P
```



## Finding Contract

The items above are `Finding Candidates`, not Lens-owned State Unit kinds or direct Result mutations.

A material finding may expose proportionally:

```text
Meaning
Affected Unit(s) / fields — when known
Evidence / rationale
Materiality hint — optional
Likely semantic owner — optional hint
Suggested lifecycle consequence — optional hint
```

Core [`Finding Disposition`](../../../../idtspe-core/shared/finding-disposition-contract.md) resolves the actual State/lifecycle/owner destination. Normal authority/resolution must occur before accepted Result Unit meaning changes.

This Lens does not define new Result Units or target-result fields. If repeated findings reveal missing target-result meaning, revise the appropriate Target Module/Local Target Contract or let Core disposition the finding to another owner.

## Typical Consumers

Scenario Discovery/Draft, Screen, Domain Discovery, Slice and Test Design.

## Artifact / File Implications

`NONE_DIRECT / NO_DISTINCT_SUPPORTING_ARTIFACT`. Core Finding Disposition may resolve Scenario meaning back to the current Scenario Target; this Lens does not perform that semantic return.

Scenario semantics, Scenario DATA/Behavior addressability and preliminary Screen ideas discovered while resolving the Scenario are represented through the owning Scenario Target/Target Module (`AP-SCN-*`). This Lens owns the boundary/behavior evaluation, not a parallel Scenario artifact contract.

A Lens finding that becomes independently material may suggest a Target Formation candidate; Core Finding Disposition first resolves the likely owner/State consequence, and Target Formation decides reuse/handoff/new Target when needed.

## Guards

Scenario ≠ Screen/command/API/task. DATA/Behavior remain internal Scenario contracts unless another real owner exists.

## Composition

UI pack owns spatial reasoning; Domain pack owns DDD choices; Test pack owns proof design.

## Escalation / Revalidation

Material new Need/result challenges Scenario scope and may trigger Core revalidation/reopen disposition; implementation difficulty alone does not redefine behavior.

## High-Level Example — Self-Contained Walkthrough

### Situation

A team proposes a new “Scenario”:

```text
POST /captures
```

### Why This Lens

Scenario identity must come from an independently meaningful actor Need/result, not from a technical operation.

### Walkthrough

Ask:

```text
Who needs what?
In what context?
What observable useful result ends the Scenario?
```

This may reveal:

```text
Actor:
  person reading an article

Need:
  preserve one useful fragment now

Observable Result:
  material is durably available for later review
```

Now the Lens can inspect:

```text
main/failure behavior
Scenario DATA
negative guarantees
acceptance
split/merge boundary
```

### Result

The technical operation is repositioned as one possible implementation detail inside a correctly bounded Scenario.

### Boundary / Lesson

Scenario is not a Screen, button, endpoint, background job or method.

## Knowledge Basis

Mode: `INLINE`

**Embedded Principles / Rules / Theory:**

- Scenario identity is grounded in an independently useful observable result and coherent behavior boundary.
- Scenario DATA and Behavior are addressable internal meaning, not automatically separate Targets/owners.

**Referenced Knowledge Owners:**

- `NONE`

**Reference Load Policy:**

No external knowledge body is required for normal use.

**Operationalization Notes:**

Behavioral/source facts are Target Inputs; the Scenario boundary/completeness evaluation is owned here.

## Provenance

Restores pre-Lens Need/Result, Behavior Completeness, DATA Meaning/Authority, Behavior Item Addressability, Failure/No-Mutation, Split/Merge, Screen Reversibility and Domain-Clue lenses.
