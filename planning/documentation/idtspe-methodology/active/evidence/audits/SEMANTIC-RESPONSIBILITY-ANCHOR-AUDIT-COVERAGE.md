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

## Explicit Exclusions / Future Zones

`CLOSED` above does **not** mean these areas have received a dedicated responsibility/anchor audit:

- broader Resolution lifecycle ownership beyond direct `TWU.SUBJECT-REFERENCE` consumers;
- Lens registries/libraries beyond direct subject-reference consumers;
- profile-level Target Module semantic ownership (SDS / 2D / Reference Knowledge); profile files touched only for audited stable-anchor link migration remain semantically unaudited;
- representation/persistence ownership outside direct Target Work template/reference consumers;
- knowledge-base/theory ownership;
- Helper/command composition implementation.

When a later zone is audited, append or update one row here rather than inferring coverage from package history alone.
