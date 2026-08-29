# IDTSPE Lens Library / Registry

Status: active generic Lens registry + installed-profile index  
Model: [`LENS-MODEL.md`](LENS-MODEL.md)

## 1. Required Core Lenses

Every material IDTSPE uses the required Core Pack proportionally. L1–L3 check material choice surfaces; the Documentation / Representation Lens is a required **materialization-stage** check when an iteration has material output. Any required check may resolve with no material finding.

| Lens | Role / applicability summary | Current KB representation |
|---|---|---|
| [`LENS-NEED-VALUE-SCOPE`](required/LENS-NEED-VALUE-SCOPE.md) | L1 — Need/value/right bounded Target | `INLINE` |
| [`LENS-AUTHORITY-SOT-REUSE`](required/LENS-AUTHORITY-SOT-REUSE.md) | L2 — canonical owner/Source/reuse/no duplicate truth | `INLINE` |
| [`LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY`](required/LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY.md) | L3 — assumptions/Evidence/reversibility/cost of being wrong | `INLINE` |
| [`LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY`](required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md) | Documentation / Representation — persist or not; code vs prose; existing owner vs dedicated artifact; consolidate vs split; handoff to P-14; direct surface `lenscmd.documentation.representation.check` | `HYBRID` |

## 2. Generic Frequent Conditional Lenses

| Lens | Applicability summary | Current KB representation |
|---|---|---|
| [`LENS-DEPENDENCY-CHANGE-IMPACT`](frequent/LENS-DEPENDENCY-CHANGE-IMPACT.md) | L4 — dependency/change surface/consumers/blast radius | `INLINE` |
| [`LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY`](frequent/LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY.md) | L6 — proof/observation/diagnosis/operation | `INLINE` |
| [`LENS-QUALITY-RISK-MATERIALITY`](frequent/LENS-QUALITY-RISK-MATERIALITY.md) | material quality/risk categories | `INLINE` |

## 3. Generic Reusable Lenses

| Lens | Typical use / applicability summary | Current KB representation |
|---|---|---|
| [`LENS-SHARED-CROSS-CUTTING-RESPONSIBILITY`](reusable/LENS-SHARED-CROSS-CUTTING-RESPONSIBILITY.md) | shared ownership / applicability / local integration | `INLINE` |
| [`LENS-TEST-PROOF-EVIDENCE`](reusable/LENS-TEST-PROOF-EVIDENCE.md) | proof-layer/evidence quality | `HYBRID` → detailed testing theory on demand |
| [`LENS-PRACTICAL-EVIDENCE`](reusable/LENS-PRACTICAL-EVIDENCE.md) | minimum practical experiment / observed Evidence | `HYBRID` |
| [`LENS-LINKED-NOTES-USAGE-JUSTIFICATION`](reusable/LENS-LINKED-NOTES-USAGE-JUSTIFICATION.md) | justify linked-note/backlink/query behavior without creating notes storage or duplicate semantic authority; direct surface `lenscmd.linked-notes.justify` | `INLINE` |

These lenses are not SDS-specific and may be reused by future profiles.

Specific Lens shortcut commands are exceptional, but **every registered Lens is explicitly reachable** through the generic Lens operations:

```text
idtspe.lenses.select
→ подбери линзы <target/context>
→ run the proportional TF-06A Lens Applicability Scan

idtspe.lens.apply
→ примени линзу <lens> к <target/context>
→ apply one selected registered Lens inside/reusing the natural IDTSPE Target context
```

The existing Documentation / Representation and Linked Notes commands remain convenience shortcuts for stable recurring intents. The generic operations do not create Lens-owned Targets and do not turn all Lens registry entries into separate command files.

## 4. Installed Profile Lens Packs

### SDS

Profile registry: [`../../profiles/sds/lenses/README.md`](../../profiles/sds/lenses/README.md)

Current SDS-specific pack (**7**):

```text
Application Boundary / Feasibility
Scenario Boundary / Behavior
Domain Modeling / DDD
UI / Spatial / Frontend Realization
Slice Verticality / Integration
WEUC / Workspace Evolution / Architecture Fitness + Workspace work-cost
Simplicity / Implementation Economy / Evolution-Safe Simplification
```

The WEUC Lens is SDS-profile specific in the current package because it consumes the SDS Workspace Evolution / global architecture owner.

## 5. Composition / Applicability Scan Rule

`TF-06A LENS_SET` performs the proportional Lens Applicability Scan before resolving the active Lens Set. It combines required Core checks, the active Target Module Lens Profile when any, plausible Core/profile conditional Lenses and explicit user/agent Lens selection. Full Lens/Knowledge-Basis bodies are read only for selected or plausibly applicable candidates.

```text
P-06 Lens Port
→ TF-06A Lens Applicability Scan
→ required Core Pack
  L1/L2/L3 at material choices
  + Documentation / Representation at materialization
+ Target Module Lens Profile
+ applicable generic conditional/reusable lenses
+ applicable profile-specific lenses
+ exceptional local-only lens
```

A Lens analyzes an explicit/implicit Analysis Surface through reusable operations such as `ANALYZE / CHECK / REFINE / CHALLENGE` and surfaces findings. Generic Core Finding Disposition resolves those findings into the appropriate State/lifecycle/owner destination; accepted resolution may later update already-declared Result Units. A Lens does not define State Unit kinds, Target Result Unit kinds, target output schema or semantic authority.

## 6. Knowledge Basis And Artifact / File Implications

A reusable Lens may contain or reference a Knowledge Basis when reusable theory/reference knowledge materially helps the evaluation. Target Modules use the same theory/current-state boundary while retaining a different operational role.

The `INLINE / REFERENCED / HYBRID` values in the tables above describe the current files only; they are not Generic conformance modes. `Target Inputs / Evidence` are current planning inputs. `Knowledge Basis` is reusable theory selected/interpreted for the evaluation and may be represented inline, in separate files, through broad/narrow references, or any useful combination.

A Lens may contribute **zero or more** `AG-*` records. No AG record is required when Core Finding Disposition resolves the current Target as the semantic owner, the Target Module/local contract already owns representation of the accepted Target meaning, and no distinct supporting artifact is useful. AG records are reserved for Lens-produced supporting / artifact-placement meaning; semantic owner/handoff/reopen consequences remain Core Finding Disposition concerns, and AG must not duplicate a Target Module AP for the same Target result.

The Documentation / Representation Lens is required before final P-14 placement whenever material output may persist. The Lens never creates semantic authority by itself; `P-14 / TF-10` resolves physical placement.


## 6A. Analysis Surface / Operations / Findings

Canonical rule: [`LENS-MODEL.md`](LENS-MODEL.md) + [`../shared/idtspe-unit-and-target-step-result-model.md`](../shared/idtspe-unit-and-target-step-result-model.md) + [`../shared/finding-disposition-contract.md`](../shared/finding-disposition-contract.md).

New or materially revised Lenses should make explicit:

```text
Analysis Surface
  Primary / Conditional Result Units or semantic selectors
  Relevant State Units
  Context

Supported Operations
  ANALYZE
  CHECK
  REFINE
  CHALLENGE

Typical Findings / Finding Contract
```

The Lens produces findings; Core Finding Disposition resolves their ownership/State/lifecycle destination. `REOPEN`, Result Unit update after resolution, cross-owner handoff and Target Formation are Core consequences rather than Lens operations.

The 7 SDS-specific Lens bodies conform literally after the SDS migration. Existing generic Core Lens bodies remain migration-compatible until a separate literal Core-Lens conformance pass is useful.

## 7. Maintenance

- [`LENS-MODEL.md`](LENS-MODEL.md)
- [`../shared/lens-creation-and-integration-use-case.md`](../shared/lens-creation-and-integration-use-case.md)
- [`LENS-AUDIT.md`](LENS-AUDIT.md)
- [`LENS-MIGRATION-COMPLETENESS-AUDIT.md`](LENS-MIGRATION-COMPLETENESS-AUDIT.md)

Example standard: [`../HIGH-LEVEL-EXAMPLE-GUIDE.md`](../HIGH-LEVEL-EXAMPLE-GUIDE.md).
