# Semantic Responsibility / Anchor Audit Coverage

Status: non-normative audit coverage evidence

> Semantic Owner Dependency
> Type: `REPRESENTS`
> Responsibility: `DOC.RESPONSIBILITY-ANCHOR-AUDIT-COVERAGE`
> Owner: [Responsibility / Anchor Audit Coverage](../../../../principles-and-terminology.md#doc-responsibility-anchor-audit-coverage)

Purpose: record which methodology areas have received an explicit responsibility-ownership, Responsibility Map, stable-anchor and inbound-link audit so future work can distinguish **audited/closed zones** from areas that still need a dedicated pass. This file is evidence only; it does not own any semantic responsibility or routing rule.

## Coverage Rules

A zone may be marked `CLOSED` only when the scoped pass has checked, proportionally:

- canonical semantic owner uniqueness for material responsibilities in scope;
- non-owner normative-looking repetition and tracked `Semantic Owner Dependency` use;
- Responsibility Map presence/repair where ownership routing materially benefits from one;
- explicit stable anchors required by real section-level consumers;
- inbound references to those anchors, including migration from reviewed generated-heading fragments;
- broken/stale/misdirected links in the audited scope;
- direct navigation/registry/README projections that route the audited responsibilities;
- intentional exclusions, so `CLOSED` is not mistaken for a whole-repository audit.

## Audited Zones

| Zone | Scope | Responsibility / map audit | Anchor / link audit | Result | Closeout package |
|---|---|---|---|---|---|
| `DOC-OWNERSHIP-RULES` | Documentation Semantic DRY, Responsibility Map, explicit anchors, Semantic Owner Dependency, fundamental Use-Case applicability resolver, IDTSPE port-composition refresh ownership and direct consumers | canonical owners/consumer dependencies checked; direct routing ownership repaired | explicit anchors created only for real consumers; reviewed generated fragments migrated; inbound refs checked | `CLOSED` | `8d1b5bfa-3719-4d45-95d3-5ae5b35f39f4` |
| `CORE-TARGET-WORK-MODULES` | Core Target Work + Generic Resolution Slot boundary + Target Formation + Target Module Meta-Model/Registry/supporting projection + Core concrete Target Modules + canonical Target Work subject reference; direct Core orchestration/lifecycle consumers touched by these contracts; inbound fragment links to audited owner sections | local Responsibility Maps established; Unit/Formation/Module/reference responsibilities separated; Target Module Registry reduced to routing; supporting Step/Result rule demoted to contextual projection; Compose/Maintain-Target-Module stopped redefining Unit internals; subject-reference grammar extracted to one owner | stable anchors added only for real cross-file consumers; reviewed old generated fragments replaced; all cross-file fragment refs into the audited Core zone resolve to explicit anchors; reverse refs/link integrity checked | `CLOSED` | `f82f32c1-d9a5-4b35-a078-bb8bad9b1a3e` |
| `CORE-RESOLUTION-LIFECYCLES` | Core Need Candidate, Finding Disposition/Resolution Escalation, Q/R/P, Proposal/Decision, accepted-Decision revalidation projection, counterfactual Planning Branch, Branch Comparison, Resolution Carry-Forward; direct Core orchestration/evaluation/intake/review/representation/Target-Work consumers touched by these contracts; inbound fragment links to audited owner sections | local `resolution/RESPONSIBILITY-MAP.md` established; parent Methodology/Core maps and Core README route through it; lifecycle vs projection vs orchestration boundaries made explicit; direct Core consumers track contextual/representation dependencies instead of silently restating owner rules | explicit stable owner anchors added only for real cross-file consumers; existing `#resolution-escalation` semanticRefs now resolve to an explicit anchor; cross-file fragment refs into the audited resolution subtree contain no generated-heading targets; reverse refs/link integrity checked | `CLOSED` | `1fb1d687-f207-4377-8ee9-80d5d0e9c605` |
| `CORE-LENS-SYSTEM` | Core Lens Meta-Model, Core Lens discovery/activation-class registry, concrete generic Lens operational-owner routing, Knowledge Basis/Finding/representation boundaries and direct Core consumers touched by those contracts; profile Lens semantics excluded | local `lenses/RESPONSIBILITY-MAP.md` established; `LENS.META-MODEL` and `LENS.DISCOVERY` owners separated; concrete generic Lens files remain canonical through unique `Lens ID`; parent maps/README route through the child map; concrete Evidence/Artifact Lenses track their Knowledge/Representation dependencies | stable owner anchors added for Meta-Model/Registry because the new map and direct consumers address those responsibilities; reviewed links resolve; no generated-heading migration was required because the audited Lens subtree had no pre-existing cross-file fragment links | `CLOSED` | `a66483ba-acba-4db8-a456-8a6f9966e73b` |
| `CORE-SOURCE-EVIDENCE-KNOWLEDGE` | Generic Knowledge Basis/theory selection and applied interpretation, Practical Evidence method, Core Testing Knowledge Basis, shared terminology, and the boundary from reusable theory to current Source/Evidence authority; full Core State/Work Context lifecycle remains reserved for the runtime pass | local `knowledge-bases/RESPONSIBILITY-MAP.md` established; `KNOWLEDGE.BASIS`, `KNOWLEDGE.PRACTICAL-EVIDENCE`, `KNOWLEDGE.TESTING`, `KNOWLEDGE.UBIQUITOUS-LANGUAGE` owners separated; Source State routes to the existing Target/Source owner and Evidence/Evidence Need route to the existing Core State boundary rather than gaining duplicate Knowledge owners | stable anchors added for reusable Knowledge owners and the existing Core-State boundary consumed by the map; Testing Knowledge Basis README routes the preserved imported leaf guidance without rewriting those source bodies; theory/current-state and Evidence-storage/authority boundaries checked | `CLOSED` | `a66483ba-acba-4db8-a456-8a6f9966e73b` |
| `CORE-REPRESENTATION-PERSISTENCE` | Generic artifact placement/persistence-sensitive response, Broad Discussion/Integration Checkpoint projection, deep artifact-boundary/file-realization method, Target Evolution companion representation guidance, and direct Lens/runtime/Resolution boundaries; profile representation semantics excluded | local `representation/RESPONSIBILITY-MAP.md` established; placement vs checkpoint projection vs deep realization method vs companion guidance separated as `REPRESENTATION.*` responsibilities; semantic-owner selection stays upstream and P-14 remains the runtime bridge rather than a second semantic owner | stable owner anchors added for routed representation responsibilities; direct Artifact Boundary Lens dependencies point to canonical placement/method owners; parent maps/README route through the child map and reviewed links resolve | `CLOSED` | `a66483ba-acba-4db8-a456-8a6f9966e73b` |

## Remaining Audit Plan

The rows below are **planning only**. `NEXT` / `PLANNED` does not confer audit coverage and MUST NOT be interpreted as partial closure. A pass may close several independently named zones, but each closed zone is recorded separately in `Audited Zones` with its own scope/result statement and the common closeout package when applicable.

| Pass | Status | Audit zones expected to close | Scope | Explicit boundary before closure |
|---|---|---|---|---|
| `PASS-1-CORE-LENS-EVIDENCE-REPRESENTATION` | `CLOSED` | `CORE-LENS-SYSTEM`; `CORE-SOURCE-EVIDENCE-KNOWLEDGE`; `CORE-REPRESENTATION-PERSISTENCE` | Core Lens Meta-Model/application semantics, Core Lens registries/libraries and selection/routing; reusable Knowledge Basis/theory and Source/Evidence authority boundary; generic representation, artifact placement and persistence ownership; direct dependencies on already-closed Target Work and Resolution owners | profile-specific Lens/knowledge/representation semantics remain for the profile pass; full Core State/Work Context lifecycle remains for Pass 2; already-closed Target Work/Target Module/Resolution semantics were touched only for direct dependency/anchor routing |
| `PASS-2-CORE-RUNTIME-ORCHESTRATION` | `NEXT` | `CORE-STATE-WORK-CONTEXT`; `CORE-RUNTIME-ORCHESTRATION` | Current Work / Work Context / Core State boundaries; runtime composition and integration routing; `UC-IDTSPE-*` orchestration ownership; Core Use-Case registry/README/map projections; separation of orchestration from semantic-owner contracts | Helper/command implementation remains deferred; profile-specific orchestration remains with profile audit where semantically owned there |
| `PASS-3-ALL-PROFILES` | `PLANNED` | `PROFILE-SDS`; `PROFILE-VISUAL-2D`; `PROFILE-REFERENCE-KNOWLEDGE` | For each profile: Target Module ownership, profile Lens ownership/routing, registries, profile-specific contracts, knowledge/theory semantics, representation/templates and dependencies on canonical Core owners | each profile is a distinct audit zone even when one package closes all three; Core owners are consumed/repaired by dependency/link only and are not silently redefined |
| `PASS-4-HELPER-COMMANDS-GLOBAL-CLOSEOUT` | `PLANNED` | `HELPER-COMMAND-COMPOSITION`; `GLOBAL-METHODOLOGY-ROUTING-CLOSEOUT` | Helper/command composition and command-to-Use-Case/owner/port routing; top-level/local Responsibility Map parity; README/registry/navigation projections; stale/broken/misdirected links; generated-fragment cleanup; duplicate Responsibility IDs; final active-methodology dependency/anchor/link consistency review | global closeout covers the active methodology and its direct Documentation/Session/Helper projections, not unrelated repository/application semantic ownership outside that methodology surface |

### Planned-Pass Rules

- Do not mark a planned zone `CLOSED` merely because files in it were touched by another pass. Link/anchor/dependency repair into an unaudited zone remains supporting work only.
- When a pass closes several zones, add one `Audited Zones` row per semantic zone and use the same closeout package ID where they were delivered together.
- Re-open a `CLOSED` zone only when a later change directly alters its owned semantics, Responsibility Map boundary, stable owner anchors or tracked dependency contract; ordinary inbound-link repair does not by itself reopen the zone.
- Keep package history as implementation evidence, but use this ledger—not ZIP chronology—as the durable statement of audit coverage.

## Current Explicit Exclusions

Until the planned passes above are actually closed, `CLOSED` currently does **not** claim:

- full Core State / Work Context lifecycle ownership or Core runtime/Use-Case orchestration as a dedicated audited zone; the Knowledge pass routes existing Source/Evidence boundaries but does not close that broader state namespace;
- profile-level semantic ownership for SDS, Visual Production 2D or Reference Knowledge, including profile-specific Lens/Knowledge/representation semantics; profile files previously touched only for stable-anchor migration/direct Core dependency remain semantically unaudited;
- Helper/command composition implementation ownership;
- whole-active-methodology routing/link/dependency closeout.

When a later zone is audited, append or update one row in `Audited Zones` and advance this plan rather than inferring coverage from package history alone.
