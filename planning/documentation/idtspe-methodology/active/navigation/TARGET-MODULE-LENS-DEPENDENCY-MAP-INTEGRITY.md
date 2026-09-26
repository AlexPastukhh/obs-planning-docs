<a id="idtspe-tm-lens-dependency-projection-integrity"></a>
# Target Module / Lens Dependency Map Integrity

Status: active cross-Core/profile integrity / audit contract

Responsibility ID: `IDTSPE.TM-LENS-DEPENDENCY-PROJECTION-INTEGRITY`

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [Semantic Owner Dependency](../../../principles-and-terminology.md#doc-semantic-owner-dependency) — `DOC.SEMANTIC-OWNER-DEPENDENCY`.
> - `CONTEXTUALIZES` [Target Module / Lens Dependency Map](TARGET-MODULE-LENS-DEPENDENCY-MAP.md#idtspe-tm-lens-dependency-map) — `IDTSPE.TM-LENS-DEPENDENCY-PROJECTION`.
> - `CONTEXTUALIZES` [Target Module Maintenance](../idtspe-core/use-cases/maintain-target-module/UC-IDTSPE-MAINTAIN-TARGET-MODULE.md#uc-idtspe-maintain-target-module) — component-maintenance process.
> - `CONTEXTUALIZES` [Lens Maintenance](../idtspe-core/use-cases/maintain-lens/UC-IDTSPE-MAINTAIN-LENS.md#uc-idtspe-maintain-lens) — component-maintenance process.

## Purpose

Prove that the active Target Module / Lens Dependency Map is an exact projection of the **declared Semantic Owner Dependencies** of every current Target Module and Lens across Core and installed profiles.

This contract owns parity/audit mechanics only. It does not create dependency semantics and does not turn ordinary Markdown links into dependency edges.

## Authority Direction

```text
TM/Lens owner passage
+ explicit Semantic Owner Dependency declaration
→ normative dependency edge for that consumer
→ projected into TARGET-MODULE-LENS-DEPENDENCY-MAP

ordinary Markdown link
→ navigation/addressability only
→ not projected as dependency

Dependency Map
↛ semantic authority
```

When the map disagrees with a component declaration, repair the map unless the component dependency itself is intentionally changing through its natural maintenance route.

## Audit Basis

Use the current active semantic component inventory and read:

```text
current Core + installed-profile Target Module owners
current Core + installed-profile Lens owners
DOC.SEMANTIC-OWNER-DEPENDENCY
TARGET-MODULE-LENS-DEPENDENCY-MAP
```

The current component inventory is the same active registry-driven inventory used by methodology/Helper projection. Retired/historical/example-only components are excluded.

## Integrity Algorithm

1. Resolve the exact current active Target Module and Lens inventory across Core and installed profiles.
2. For every component owner, parse every explicit `Semantic Owner Dependency` declaration, including all supported current/compatibility forms:
   - compact `> - TYPE [Owner](path#anchor) — Responsibility` rows;
   - structured multiline `Type / Responsibility / Owner` blocks;
   - compact structured `> - Type: ...; Responsibility: ...; Owner: ...` rows.
   Parsing form is syntax only: all three forms produce the same edge identity.
3. Accept only dependency types owned by `DOC.SEMANTIC-OWNER-DEPENDENCY`: `RESTATES`, `CONTEXTUALIZES`, `EXTENDS`, `REPRESENTS`, `MIGRATES`.
4. Resolve every dependency owner path relative to the consumer file. Reject paths outside the repository, missing owner files and missing explicit Markdown anchors when a fragment is declared.
5. Preserve the declared Responsibility ID when present. A dependency whose canonical owner is itself a current Target Module/Lens may additionally project that component identity. Do not manufacture a Responsibility ID when none is declared.
6. Derive one exact edge identity from:
   ```text
   consumer component
   + dependency type
   + declared Responsibility ID (or empty)
   + resolved canonical owner path
   + explicit anchor/fragment (or empty)
   ```
7. Reject duplicate exact dependency declarations inside one consumer; repeated dependence on the same responsibility is allowed only when it intentionally points to distinct owner anchors/subjects.
8. Compare the complete forward map to the derived declarations: no missing edge, extra edge, wrong type, wrong Responsibility ID, stale owner path/anchor or wrong target-component projection.
9. Require every current Target Module and Lens to appear in the complete forward projection even when it currently declares zero dependencies.
10. Verify the compact direct `TM/Lens → TM/Lens` topology is exactly the filtered subset whose resolved owner path is another current component owner.
11. Enforce the component-coupling guard: every concrete Lens has exactly one `EXTENDS LENS.META-MODEL`; every concrete Target Module has exactly one `EXTENDS TARGET-MODULE.META-MODEL`; generic consumers do not depend on `TM-PLANNING-RESOLUTION-STATE` merely for Carry-Forward semantics; `TM-FEATURE` reaches Evolution readiness/materialization through `SDS.SEMANTIC-COMPOSITION-READINESS`; direct concrete-component dependencies remain exceptional and owner-justified.
12. Keep Unit→Lens attachment/applicability relations out of this map; they belong to their attachment owners/projections.
13. Keep ordinary Markdown links out of this dependency graph. If a link materially depends on owner semantics, the consumer must first declare a real Semantic Owner Dependency beside the dependent passage.

## Result Contract

A clean audit returns:

```text
PASS — Target Module / Lens dependency projection matches current component declarations.
components: <count>
Target Modules: <count>
Lenses: <count>
dependency edges: <count>
components with dependencies: <count>
components with no declared dependency: <count>
direct TM/Lens → TM/Lens edges: <count>
```

Any drift returns precise records:

```text
DRIFT
Consumer: <TM-* | LENS-*>
Owner: <component path>
Expected declaration: <type / responsibility / owner path#anchor>
Projected: <map row or missing>
Defect: missing-edge | extra-edge | wrong-type | wrong-responsibility | stale-owner | stale-anchor | wrong-target-component | missing-component-row | duplicate-edge | invalid-dependency-type | missing-meta-model-extension | redundant-generic-dependency | concrete-component-coupling-drift
```

Use `BLOCKED` only when a required current component owner/map cannot be read reliably.

## Recheck Conditions

Re-run when any of the following changes materially:

- a Target Module or Lens is added, retired, renamed or moved;
- a Target Module/Lens adds, removes or changes a `Semantic Owner Dependency` declaration;
- a dependency owner path, explicit anchor or Responsibility ID changes;
- the semantic dependency contract changes;
- this dependency projection changes.

The trigger is the **Semantic Owner Dependency declaration**, not mere addition/removal of an ordinary Markdown link.

## Automated Evidence

Repository verification implements exact parity in:

[`planning/documentation/tools/tampermonkey/chat-command-palette/tests/tm-lens-dependency-map-integrity.test.mjs`](../../../tools/tampermonkey/chat-command-palette/tests/tm-lens-dependency-map-integrity.test.mjs)

The automated check is current-repository evidence. This file remains the human-readable integrity owner.

## Boundaries

Do not:

- infer semantic dependence from every Markdown link;
- use the map as a second Source of Truth;
- copy depended-on owner semantics into the map;
- mix Unit→Lens attachment/application topology into semantic-owner dependency topology;
- hide a material semantic dependency as an ordinary link merely to avoid revalidation;
- treat a dependency edge as runtime execution order unless its natural owner separately defines such order.
