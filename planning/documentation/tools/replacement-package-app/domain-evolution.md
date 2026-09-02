# Replacement Package App — Domain Changes by Application Evolution Step

Status: active optional cross-owner Domain-change map; step integration pending
Scope: cross-owner Domain semantic/implementation changes required by Scenario-owned Application Evolution Steps when one coherent shared view is clearer than duplicated local notes.

## Purpose

This file is **not**:

- the owner of Application Evolution Steps;
- the primary Domain model;
- a registry of classes;
- mandatory for every Domain Object or every application change.

Canonical Application Evolution Steps live in Scenario owners and describe **what application behavior changes**.

Domain/Aggregate/Object owners describe **how their semantics/implementation must change** under `Changes by Application Evolution Step`.

This file exists only when one Scenario-owned step changes shared Domain meaning across several owners and one cross-owner view materially improves understanding of that implementation transition.

The documentation workflow and terminology are owned by [`documentation-use-cases.md`](documentation-use-cases.md), especially DOC-UC-02, DOC-UC-05 and DOC-UC-10. Recommended lower-owner change form: [`Template — Changes by Application Evolution Step`](documentation-templates.md#template-changes-by-application-evolution-step).

## When to write here

Use this cross-owner map when one canonical Application Evolution Step causes a shared semantic transition such as:

- the same invariant changing across several Domain/Slice owners;
- identity/state authority moving between owners;
- one concept becoming shared/retired/replaced across several owners;
- compatibility/transitional semantics that must be interpreted consistently across owners;
- duplicated local notes would make the intended semantic transition ambiguous.

Do **not** create an entry here merely because several owners reference the same Application Evolution Step.

If each owner can state its own change clearly, keep the change only in that owner's `Changes by Application Evolution Step` section.

## Cross-owner change form

Reference the exact canonical Scenario-owned step; do not redefine it here.

Example:

```text
## EVO-RPKG-<SEMANTIC-NAME> — <readable application change>
Canonical Scenario step:
<link to Scenario-owned Application Evolution Step>

Affected Domain/Slice owners:
- <owner>
- ...

### <shared Domain concept / invariant / authority>

Current meaning:
...

Required Domain change:
...

Compatibility / transition:
<only when material>

Owner responsibilities:
- <owner> → <change>
- ...

Architecture decision:
<only when the shared transition needs one explicit decision>
```

Only include fields that add useful information.

## Behavior Items and implementation items

The authoritative Behavior Item remains in its Scenario Process Specification. UI Requirements also remain Scenario/UI design requirements rather than being promoted into Domain semantics merely because they appear near the same interaction.

Domain owners reference BI they implement. Slice owners reference BI they realize using Domain. `DI-*` / `SI-*` remain in corresponding owners.

This file may reference those items when needed to explain a shared transition, but it must not become a second owner of BI, DI, SI, Feature Interaction behavior or Application Evolution Step meaning.

## Promotion after implementation

When the canonical Application Evolution Step is accepted as implemented:

1. Scenario current Process Specification / Feature Interactions / BI / UI requirements are updated as applicable;
2. affected Domain current semantics are updated;
3. affected Slice current responsibility/composition is updated;
4. obsolete compatibility/transitional rules are removed only when implementation compatibility is actually gone;
5. this cross-owner note may remain only when it still materially explains why current Domain semantics are shaped this way.

## Current integration state

No step-specific Domain change entries are populated by this documentation-model refinement package.

The next Scenario/Domain/Slice integration step should derive them from canonical Scenario-owned Application Evolution Steps rather than guessing Domain owners, Feature-Interaction-to-Slice mapping or class boundaries in advance.
