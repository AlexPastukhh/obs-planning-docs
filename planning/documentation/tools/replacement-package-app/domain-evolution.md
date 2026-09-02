# Replacement Package App — Domain Evolution

Status: active shared domain-evolution map; step integration pending
Scope: cross-owner semantic changes driven by Scenario Evolution Steps when more than one Domain/Slice owner benefits from one coherent evolution view.

## Purpose

This file is **not** the primary Domain model, not a registry of classes and not a mandatory owner for every Domain Object.

Current Domain documentation should be created through Domain discovery from Scenario Behavior Items. Feature Interaction context can explain where those BI arise, but Feature Interaction boundaries are not automatically Domain boundaries. Prefer an Aggregate owner when related Domain Objects share one consistency/invariant boundary; create a separate Domain Object owner when independent semantics, lifecycle, reuse or rule volume make that clearer.

This file exists only as an evolution map when one `EVO-RPKG-*` changes shared Domain meaning across several owners and duplicating that change in each owner would make the transition ambiguous.

The documentation workflow and minimal terminology are owned by [`documentation-use-cases.md`](documentation-use-cases.md). The recommended focused evolution form is [`Template — Evolution Step entry`](documentation-templates.md#template-evolution-step).

## When to write here

Write an Evolution Step here when:

- the same semantic change is consumed by multiple Domain/Slice owners;
- duplicating the changing invariant/identity/state authority would create ambiguity;
- the evolution introduces/removes a shared invariant or materially moves semantic authority;
- one cross-owner view materially improves understanding of the transition.

Keep the evolution only in its natural Scenario/Domain/Slice owner when the change is local and small.

## Evolution Step form

Use the same `EVO-RPKG-*` ID that originates in a Scenario Migration Delta.

A step may be written freely. Use the linked Evolution Step template when its fields improve clarity. At minimum, make the shared semantic change and affected owners understandable.

Example:

```text
## EVO-RPKG-NNN — <Scenario evolution change>
Status: URGENT | PLANNED | POSSIBLE | IMPLEMENTED
Scenario: <Scenario owner>
Feature Interaction / BI context: <only when useful>
Affected Domain/Slice owners: <owners>

### <Domain concept / invariant>
Current meaning:
...

Change:
...

Transitional / compatibility rule:
...

Architecture decision:
...
```

Only include fields that add useful information.

## Behavior Items and implementation items

The authoritative Behavior Item remains in its Scenario Process Specification. UI Requirements also remain Scenario/UI design requirements rather than being promoted into Domain semantics merely because they appear near the same interaction.

Domain owners reference the BI they implement. Slice owners reference the BI they realize using Domain. `DI-*` / `SI-*` remain in the corresponding owner unless one shared evolution note is genuinely needed here.

Do not turn this file into a second copy of Feature Interaction behavior, BI, Domain owner or Slice owner content.

## Promotion after implementation

When an Evolution Step is accepted:

1. Scenario current Process Specification / Feature Interactions / BI / UI requirements are updated as applicable;
2. affected Domain current semantics are updated;
3. affected Slice current responsibility is updated;
4. obsolete transitional rules are removed only when compatibility is actually gone;
5. the Evolution Step reference may remain where it still helps explain why the current invariant exists.

## Current integration state

No step-specific Domain evolution entries are populated by this documentation-model refinement package.

The next Scenario/Domain/Slice integration step should derive them from accepted current/target behavior rather than guessing Domain owners, Feature-Interaction-to-Slice mapping or class boundaries in advance.
