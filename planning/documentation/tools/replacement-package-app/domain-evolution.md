# Replacement Package App — Domain Evolution Impact Map

Status: active optional cross-owner Domain-change view; integration pending
Scope: cross-owner Domain semantic changes caused by Scenario-owned Evolution Steps when one coherent shared view is clearer than duplicated local notes.

## Purpose

This file is **not**:

- the owner of Evolution Steps;
- the Evolution Steps Map;
- the primary Domain model;
- a class registry;
- mandatory for every Domain Object or application change.

Canonical Scenario-owned Evolution Steps describe **what application behavior changes**. Domain/Aggregate/Object owners describe their own future delta under `Evolution Impact` and hold durable current architecture constraints in `DI-*` items.

This cross-owner view exists only when one Evolution Step changes shared Domain meaning across several owners and a combined semantic transition is materially clearer.

Documentation workflow: DOC-UC-02, DOC-UC-05 and DOC-UC-10. Recommended local form: [`Template — Evolution Impact`](documentation-templates.md#template-evolution-impact).

## When to write here

Use this file when one canonical Evolution Step causes a shared semantic transition such as:

- the same invariant changing across several Domain/Slice owners;
- identity/state authority moving between owners;
- one concept becoming shared/retired/replaced across several owners;
- compatibility/transitional semantics that must be interpreted consistently;
- duplicated local notes would make the intended transition ambiguous.

Do not create an entry merely because several owners reference the same Evolution Step. If each owner can communicate its own Impact clearly, keep the change there.

## Cross-owner change form

```text
## EVO-RPKG-<SEMANTIC-NAME> — <readable application change>
Canonical Scenario step:
<link>

Affected owners:
- ...

Shared Domain transition:
Current meaning:
...
Future meaning:
...

Owner Evolution Impact:
- <owner> → Expansion / Refactoring / Forced Migration summary

Cross-owner compatibility / architecture decision:
<only when material>
```

The local owner's `DI-*` requirements remain authoritative for how current Domain architecture must be shaped. Do not duplicate their Requirement/Reason here.

## Evolution-aware architecture boundary

Known cross-owner evolution may expose pressure for a stable identity, ownership rule, consistency boundary or semantic port now. Record the durable constraint in the appropriate Domain owner as a `DI-*`; this file may reference it to explain the shared transition.

Known future behavior does not justify implementing that future behavior prematurely. Prefer current boundaries that allow later Expansion/composition; treat avoidable Forced Migration as architecture pressure rather than the normal target shape.

## Promotion after implementation

When the canonical Evolution Step is implemented:

1. update current Scenario behavior;
2. update affected Domain current semantics;
3. update affected Slice/Screen/shared current responsibility where applicable;
4. remove obsolete compatibility rules only when implementation compatibility is actually gone;
5. retain this cross-owner note only when it still materially explains current semantics.

## Current integration state

No step-specific Domain impact entries are populated by this methodology package. Later Scenario/Domain/Slice integration should derive them from canonical Scenario-owned Evolution Steps and actual Domain discovery rather than guessing owners/class boundaries in advance.
