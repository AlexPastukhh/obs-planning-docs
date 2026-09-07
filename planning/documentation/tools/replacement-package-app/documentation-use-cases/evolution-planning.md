# Replacement Package App — Documentation Use Cases: Evolution Planning

Status: active normative Documentation Use Case group
Root authority: [`../documentation-use-cases.md`](../documentation-use-cases.md)

<a id="doc-uc-08--plan-and-refine-evolution-steps"></a>
## DOC-UC-08 — Plan and refine Evolution Steps

### Goal

Represent meaningful future application evolution early enough to influence current boundaries, then progressively refine each Step into a complete usable target state.

### Process

1. Capture a new Evolution Step as soon as a material future capability/journey/migration change is known. Early representation may be shallow.
2. Record affected Benefits/Features/Scenarios as they become known and classify material transition nature with one or more Evolution Kinds: Introduction, Expansion, Refactoring, Forced Migration, Retirement.
3. Use the Step during every relevant Discovery rather than waiting for late architecture review.
4. Represent a new Feature directly as Introduction in the Step target; do not invent a pre-existing Evolution Impact merely to explain its creation.
5. When an existing Feature changes and enough detail is known, show the full target Feature with `[EXISTING]`, `[NEW]`, `[CHANGED]`, `[REMOVED]` (or equivalent) rather than only a detached delta.
6. If Feature composition, ordering, cross-Feature Data/context or Screen journey changes, include the target Scenario.
7. Include as many Feature/Slice changes and migration actions as needed for the Step to end in a complete internally consistent usable application/documentation state.
8. Several implementation packages/commits may realize one Evolution Step; intermediate code progress is not automatically a separate application Evolution Step.
9. Record owner-local Evolution Impact in affected existing Slice/Aggregate/Shared/Screen/proof owners when those owners are migrated/maintained; use the same Evolution Kinds locally.
10. Keep migration planning in this canonical Step machinery; never create an independent competing migration roadmap for the same transition.

### Principles

- Evolution Step boundary follows complete application capability/state transition, not Feature count.
- Evolution Kinds are composable, not a single exclusive enum.
- A Step may consist of two or more Features when only their completed composition creates a usable Scenario.
- A Step may enable later Steps but must not depend on the next Step merely to become internally consistent.
- Known evolution is strong Feature/Slice boundary evidence.
- Migration is a form of Evolution; Forced Migration is one Evolution Kind, not a separate planning system.

## Evolution Steps Map relationship

[`../evolution-steps-map.md`](../evolution-steps-map.md) owns rough horizon / likelihood / dependency / order / readiness relationships between known Evolution Steps. The canonical Evolution Step owns the qualitative target change itself.

The map does not redefine Feature/Scenario/Evolution meaning and is not changed automatically by every methodology edit.

## Evolution representation guidance

- Early/shallow representation is valid.
- When enough detail is known, prefer complete target meaning.
- `[EXISTING] / [NEW] / [CHANGED] / [REMOVED]` is target-state accounting; Evolution Kinds describe the nature of transition.
- See [`../documentation-templates.md`](../documentation-templates.md) for recommended forms.
