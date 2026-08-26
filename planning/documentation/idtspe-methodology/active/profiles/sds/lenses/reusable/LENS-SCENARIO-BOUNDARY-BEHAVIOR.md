# LENS-SCENARIO-BOUNDARY-BEHAVIOR — Scenario Boundary / DATA / Behavior Completeness

Lens ID: `LENS-SCENARIO-BOUNDARY-BEHAVIOR`  
Activation: `TARGET_PROFILE_REUSABLE`

## Purpose

Keep Scenario identity tied to one independently meaningful Need/result while making behavior, semantic DATA, failures, invariants and acceptance complete enough for downstream planning.

## Applicability Gate

Primary for Scenario Discovery/Draft; selected sublenses support Screen/Slice/Test.

## Typical Sources / Evidence

```text
Application Definition
Refined Core Real-Life Scenario when present
Step-02 fallback
Prototype Evidence
existing Scenario/must-hold owners
```

## Independent Need / Result Boundary

```text
independent actor/user Need?
observable/useful result?
button/command/API/backend operation only? → not enough
split/merge/inside-parent candidate?
```

## Scenario Scope Split / Merge

If decomposition exposes another independently meaningful Need/result, reopen Scenario Scope. DATA/Behavior addressability alone does not create another Scenario.

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

## Findings / Outputs

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

## Typical Consumers

Scenario Discovery/Draft, Screen, Domain Discovery, Slice and Test Design.

## Artifact / File Implications

### Structured Artifact / File Guidance

These records describe conditional placement guidance produced by this Lens. They never create semantic ownership by themselves.

```text
ARTIFACT_GUIDANCE
ID: AG-SCN-01
CONTENT_KIND: SCENARIO_SEMANTICS
WHEN: Scenario behavior/DATA finding is accepted
GUIDANCE: PROFILE_DEFAULT
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: Scenario Target
REPRESENTATION: EMBED_CURRENT_OWNER
FILE_OR_ARTIFACT: <scenario-owner>
CONTENT: Scenario behavior; DATA; acceptance; failures; negative guarantees
GUIDANCE_SOURCE: LENS
RESOLVER: P-14 / TF-10
```

```text
ARTIFACT_GUIDANCE
ID: AG-SCN-02
CONTENT_KIND: SCENARIO_DATA_BEHAVIOR_ADDRESSABILITY
WHEN: DATA/Behavior needs IDs but not independent ownership
GUIDANCE: PROFILE_DEFAULT
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: Scenario Target
REPRESENTATION: EMBED_CURRENT_OWNER
FILE_OR_ARTIFACT: <scenario-owner>
CONTENT: addressable internal objects remain embedded by default
GUIDANCE_SOURCE: LENS
RESOLVER: P-14 / TF-10
```

```text
ARTIFACT_GUIDANCE
ID: AG-SCN-03
CONTENT_KIND: SCREEN_IDEA
WHEN: unselected Screen/window idea appears
GUIDANCE: ROUTE_PREFERRED
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: ROUTE
SEMANTIC_OWNER: UNRESOLVED until Screen owner selects
REPRESENTATION: REGISTER_ENTRY
FILE_OR_ARTIFACT: SDS-PLANNING-STATE/ideas/scenario/IDEAS.md
CONTENT: preliminary Screen/window idea
GUIDANCE_SOURCE: LENS
RESOLVER: P-14 / TF-10
```


Shell placement semantics: [`artifact-placement-and-idtspe-response-contract.md`](../../../../idtspe-core/shared/artifact-placement-and-idtspe-response-contract.md).

Selected Scenario meaning projects into the canonical Scenario owner.

Scenario DATA and Behavior Items **stay embedded by default**, even when addressable by IDs.

Separate DATA/Behavior artifacts are only preferred after Artifact Boundary evidence shows independent reuse/review/size/addressability value.

Preliminary Screen ideas route to the global Scenario Ideas register rather than Screen truth.

## Guards

Scenario ≠ Screen/command/API/task. DATA/Behavior remain internal Scenario contracts unless another real owner exists.

## Composition

UI pack owns spatial reasoning; Domain pack owns DDD choices; Test pack owns proof design.

## Escalation / Revalidation

Material new Need/result reopens Scenario scope; implementation difficulty alone does not redefine behavior.

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

## Provenance

Restores pre-Lens Need/Result, Behavior Completeness, DATA Meaning/Authority, Behavior Item Addressability, Failure/No-Mutation, Split/Merge, Screen Reversibility and Domain-Clue lenses.
