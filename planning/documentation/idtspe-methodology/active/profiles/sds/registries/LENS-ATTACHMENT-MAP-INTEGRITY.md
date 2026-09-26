<a id="sds-lens-attachment-projection-integrity"></a>
# SDS Lens Attachment Map Integrity

Status: active profile integrity / audit contract

Responsibility ID: `SDS.LENS-ATTACHMENT-PROJECTION-INTEGRITY`

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [SDS Lens Attachment Map](LENS-ATTACHMENT-MAP.md#sds-lens-attachment-map) — projection under audit.
> - `CONTEXTUALIZES` [Core Lens Registry](../../../idtspe-core/lenses/LENS-REGISTRY.md#lens-discovery-registry) — inherited/generic Lens discovery authority.
> - `CONTEXTUALIZES` [SDS Lens Registry](LENS-REGISTRY.md#sds-lens-discovery) — SDS Lens discovery authority.
> - `CONTEXTUALIZES` [Target Module Maintenance](../../../idtspe-core/use-cases/maintain-target-module/UC-IDTSPE-MAINTAIN-TARGET-MODULE.md#uc-idtspe-maintain-target-module) — normative Unit-local attachment placement rule.

## Purpose

Prove that the SDS [`LENS-ATTACHMENT-MAP`](LENS-ATTACHMENT-MAP.md#sds-lens-attachment-map) is an exact current **projection** of predictable Lens attachments declared by the concrete current Core + SDS Target Module Unit owners.

This contract owns the parity/audit method only. It does not own attachment semantics, Lens applicability, trigger logic, Target Module Unit meaning or Core Lens Pack membership.

## Authority Direction

```text
concrete Target Module Unit owner / Lens Attachments block
→ normative predictable attachment
→ projected into LENS-ATTACHMENT-MAP

LENS-ATTACHMENT-MAP
↛ normative attachment authority
```

When the map disagrees with a Unit owner, repair the map unless the owner itself is intentionally being changed through its natural maintenance process.

## Audit Basis

Use the current repository basis and read proportionally:

```text
Core Target Module Registry + current Core TM owners
SDS Target Module Registry + current SDS TM owners
Core Lens Registry
SDS Lens Registry
SDS LENS-ATTACHMENT-MAP
```

The audit scope is the current Core+SDS Target Module composition represented by the map. Other installed profiles keep their own attachment/registry semantics and are not silently folded into this SDS projection.

## Integrity Algorithm

1. Resolve the current Core and SDS Target Module inventories from their canonical registries/current semantic projection.
2. For every current Core+SDS Target Module owner, derive its complete Module-defined `RU-*` inventory from the owner itself.
3. Locate exactly one normative `Lens Attachments` block for every projected `RU-*`.
4. Require `Core Lens Pack: INHERITED` for every projected Unit.
5. Read additional predictable relationships only from the Unit owner:
   - `REQUIRED [CLOSING]` → map column `R`;
   - `TRIGGERED` → map column `T`.
6. Normalize every attachment to its canonical `LENS-*` identity. Reject duplicates inside one Unit/strength and reject the same Lens being projected simultaneously as both `R` and `T` for one Unit.
7. Resolve every projected attachment Lens through the current Core or SDS Lens Registry. An unknown/retired Lens is drift even when the map and owner repeat the same stale ID.
8. Compare exact module coverage: no missing current Core/SDS Target Module section and no extra/retired module section in the map.
9. Compare exact Unit coverage per module: no missing Unit row, no extra/retired Unit row and no duplicate Unit row.
10. Compare the exact `R` and `T` Lens sets for every Unit. Ordering is presentation-only; membership and strength must match exactly.
11. Check the Unit attachment block remains declarative: `TRIGGERED` contains Lens references only and does not copy Lens-owned applicability/temporal-trigger conditions into the Unit.
12. Check the map remains projection-only and does not acquire Lens applicability logic, Core-pack authority or Target Module semantics.

## Result Contract

A clean audit returns:

```text
PASS — Lens attachment projection matches current Core+SDS Unit owners and registered Lenses.
modules: <count>
units: <count>
required attachments: <count>
triggered attachments: <count>
```

Any drift returns one or more precise records:

```text
DRIFT
Target Module: <TM-*>
Result Unit: <RU-* | module-level>
Owner: <path>
Expected from owner: <R/T canonical Lens IDs or structural expectation>
Projected: <R/T canonical Lens IDs or structural state>
Defect: missing | extra | wrong-strength | duplicate | unknown-lens | missing-core-pack | copied-trigger-logic | projection-authority-drift
```

Use `BLOCKED` only when a required current owner/registry/map cannot be read reliably. Do not convert missing evidence into `PASS`.

## Recheck Conditions

Re-run this integrity check when any of the following changes materially:

- a Core or SDS Target Module Unit inventory;
- any Unit-local `Lens Attachments` block;
- Core Lens Pack membership;
- Core or SDS Lens registry membership/identity;
- the SDS Lens Attachment Map itself;
- Target Module/Lens maintenance rules governing predictable attachments.

## Automated Evidence

Repository verification implements the structural parity invariant in:

[`planning/documentation/tools/tampermonkey/chat-command-palette/tests/lens-attachment-map-integrity.test.mjs`](../../../../../tools/tampermonkey/chat-command-palette/tests/lens-attachment-map-integrity.test.mjs)

The automated check is evidence for the current repository bytes. This contract remains the human-readable audit owner and defines what a manual explicit check must report.

## Boundaries

Do not:

- repair Unit owners from the map without independent semantic justification;
- treat map membership as Lens applicability or proof that a Lens actually ran;
- copy Lens trigger conditions into `TRIGGERED` Unit attachments;
- add non-SDS profile Target Modules merely because they are installed;
- create a second attachment vocabulary beyond `Core Lens Pack: INHERITED`, `REQUIRED [phase]` and `TRIGGERED`;
- report parity from counts alone when concrete Unit/Lens membership differs.
