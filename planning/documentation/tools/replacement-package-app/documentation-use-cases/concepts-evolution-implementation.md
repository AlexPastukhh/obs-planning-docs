# Shared Concepts — Evolution and Implementation

Status: physically separated part of the Replacement Package App documentation methodology.
Authority: this file remains part of the same documentation-methodology authority.

### Evolution Step

An Evolution Step is one coherent **change in application behavior** owned canonically by a Scenario.

It answers **what changes** for the application/user process. It may add/remove/replace/compose/split Feature Interactions, change interaction contracts/branches/outcomes, add/change/remove Behavior Items or UI requirements, affect selected Screen realization, extend a Scenario, or link a full planned future replacement Scenario when the change is too broad to remain readable as a local delta.

The canonical step does **not** describe Domain/Slice/Screen/test implementation delta. Those consequences belong to `Evolution Impact` in affected lower owners.

Each step has one canonical Scenario owner. If it affects several Scenarios, choose the Scenario where the user/application behavioral change is most naturally authoritative; other Scenario owners reference the same step rather than copying it.

Use a stable semantic ID/name rather than an ordinal that pretends to define roadmap order, for example:

```text
EVO-RPKG-GIT-DERIVED-CURRENT-CHANGE — Derive Current Change from Git revision boundaries
```

A step may carry semantic/planning intent such as `URGENT`, `PLANNED` or `POSSIBLE` when useful. Intent does not own exact sequence, rough horizon, likelihood/confidence, dependency or readiness; those planning relationships belong to the Evolution Steps Map.

When a step is accepted as implemented, resulting behavior becomes current Scenario truth. The step need not remain as an active future item; retain historical rationale only when it still materially explains current meaning.
### Planned future Scenario

A future independently meaningful user-world Scenario may be documented as a full Scenario owner before it is current.

Use the same Scenario form with a clear status such as `planned future Scenario owner`. Do not hide a complete future Scenario inside another Scenario's Evolution Step.

A current Scenario's Evolution Step may link `Replacement Scenario` when planned change is so broad that a separate full future Scenario communicates the target meaning better than a large local delta.
### Evolution Steps Map

[`evolution-steps-map.md`](../evolution-steps-map.md) is the planning owner for **when, in what dependency/order and with what rough planning likelihood/readiness selected evolution is intended to happen**.

It may show:

- rough horizon or relative timing;
- likelihood/planning confidence when useful;
- dependencies/prerequisites and what a step enables;
- parallelizable steps;
- conditional/optional branches;
- implementation readiness when material;
- planned future Scenarios reached/replaced by steps;
- a materially independent local `Evolution Impact` item when its timing/likelihood differs enough from the parent step to deserve explicit planning visibility.

The map references canonical Scenario-owned Evolution Steps and lower-owner impacts; it does not redefine their behavioral or implementation delta. Step identity remains semantic and stable while map planning changes.
### Evolution Impact

A Domain, Slice, Screen or Shared Implementation Capability does **not** own Evolution Steps.

When a canonical Scenario-owned step affects that owner, `Evolution Impact` records **what changes in this owner when the step is realized**. It is future owner delta, not a duplicate list of current architecture requirements.

Use three change kinds when they add meaning:

- **Expansion** — preferred additive change: extend capability, compose another implementation/consumer, add behavior through a stable port/boundary, or add corresponding proof;
- **Refactoring** — behavior-preserving structural improvement for readability, cohesion, testability or easier extension;
- **Forced Migration** — existing logic/authority/representation must be moved or substantially reworked because the current structure cannot realize the selected evolution through reasonable expansion/composition.

`Forced Migration` is an architecture-pressure signal, not the preferred evolution mechanism. Analysis should strive to discover avoidable forced migration early and express the needed current boundary/port/composition constraint as an Implementation Item. Do not duplicate that Implementation Item's `Requirement + Reason` inside `Evolution Impact`; reference it only when needed to make the future delta understandable.

A materially independent impact may be referenced by the Evolution Steps Map when it has different timing, likelihood or dependency meaning from the parent Evolution Step.

When Tests are embedded in the affected owner, material test-suite change is part of that same owner's `Evolution Impact`: adding proof is normally Expansion and behavior-preserving suite/fixture reorganization is Refactoring. Do not create a parallel test-evolution owner merely because tests change; most Evolution Steps need no separate test-suite impact note.
### Domain Implementation Item

A Domain Implementation Item (`DI-*`) is an optional durable requirement governing how a Domain owner must be shaped.

A `DI-*` may be needed for:

- correct implementation of current BI/invariants;
- semantic consistency, authority, identity or one-owner rules;
- implementation quality such as cohesion/testability when it is durable and non-trivial;
- materially known `Evolution Impact` that should be realizable later through high-quality expansion/composition rather than avoidable Forced Migration.

A known future Evolution Step may therefore justify a stable semantic boundary, identity or ownership rule now even when the current BI alone would not require that exact structure. It does **not** justify prematurely implementing the future behavior itself.

A Domain owner may need no `DI-*` items. A good item survives ordinary implementation refactoring and does not become a method/field/call trace.
### Slice Implementation Item

A Slice Implementation Item (`SI-*`) is an optional durable requirement governing how a Slice realizes selected behavior using Domain and infrastructure.

It may cover current orchestration/separation/recovery/composition, a stable port/boundary, concrete reuse/non-duplication pressure, testability/observability or materially known `Evolution Impact` that should later be realizable through additive composition rather than avoidable Forced Migration.

A known future capability may justify a port or composition seam now; it does not justify implementing that future capability before its Evolution Step is selected for realization.

A good `SI-*` survives ordinary refactoring and does not describe current method/service wiring.
### Shared Implementation Capability

A Shared Implementation Capability is an optional owner for one real reusable implementation responsibility consumed by several Slices and substantial enough to need one semantic implementation owner.

It may represent reuse, a cross-cutting concern, or both. `Cross-cutting` is a characteristic, not a second owner type.

Do not create one merely because several Slices share a slogan, helper shape or generic engineering principle. Prefer local Slice ownership until one coherent shared responsibility/contract/consumer relationship is actually useful.

A Shared Implementation Capability may own durable local Implementation Items, local Tests/Test Items and `Evolution Impact` in the same way a Slice does.
