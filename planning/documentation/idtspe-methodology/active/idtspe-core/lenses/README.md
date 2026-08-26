# IDTSPE Lens Library / Registry

Status: active generic Lens registry + installed-profile index  
Model: [`LENS-MODEL.md`](LENS-MODEL.md)

## 1. Required Core Lenses

Every material IDTSPE uses the required Core Pack proportionally. L1–L3 check material choice surfaces; the Documentation / Representation Lens is a required **materialization-stage** check when an iteration has material output. Any required check may resolve with no material finding.

| Lens | Role |
|---|---|
| [`LENS-NEED-VALUE-SCOPE`](required/LENS-NEED-VALUE-SCOPE.md) | L1 — Need/value/right bounded Target |
| [`LENS-AUTHORITY-SOT-REUSE`](required/LENS-AUTHORITY-SOT-REUSE.md) | L2 — canonical owner/Source/reuse/no duplicate truth |
| [`LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY`](required/LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY.md) | L3 — assumptions/Evidence/reversibility/cost of being wrong |
| [`LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY`](required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md) | Documentation / Representation — persist or not; code vs prose; existing owner vs dedicated artifact; consolidate vs split; handoff to P-14; direct surface `lenscmd.documentation.representation.check` |

## 2. Generic Frequent Conditional Lenses

| Lens | Applicability |
|---|---|
| [`LENS-DEPENDENCY-CHANGE-IMPACT`](frequent/LENS-DEPENDENCY-CHANGE-IMPACT.md) | L4 — dependency/change surface/consumers/blast radius |
| [`LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY`](frequent/LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY.md) | L6 — proof/observation/diagnosis/operation |
| [`LENS-QUALITY-RISK-MATERIALITY`](frequent/LENS-QUALITY-RISK-MATERIALITY.md) | material quality/risk categories |

## 3. Generic Reusable Lenses

| Lens | Typical use |
|---|---|
| [`LENS-SHARED-CROSS-CUTTING-RESPONSIBILITY`](reusable/LENS-SHARED-CROSS-CUTTING-RESPONSIBILITY.md) | shared ownership / applicability / local integration |
| [`LENS-TEST-PROOF-EVIDENCE`](reusable/LENS-TEST-PROOF-EVIDENCE.md) | proof-layer/evidence quality |
| [`LENS-PRACTICAL-EVIDENCE`](reusable/LENS-PRACTICAL-EVIDENCE.md) | minimum practical experiment / observed Evidence |
| [`LENS-LINKED-NOTES-USAGE-JUSTIFICATION`](reusable/LENS-LINKED-NOTES-USAGE-JUSTIFICATION.md) | justify linked-note/backlink/query behavior without creating notes storage or duplicate semantic authority; direct surface `lenscmd.linked-notes.justify` |

These lenses are not SDS-specific and may be reused by future profiles.

Direct Lens commands are exceptional, not automatic. In the current Core pack, the required Documentation / Representation Lens has a justified direct surface because “how should this material be represented, if at all?” is a stable recurring user intent, and `LENS-LINKED-NOTES-USAGE-JUSTIFICATION` has one because “do we need Linked Notes here?” is likewise stable. Other generic Lenses remain activated through Target/Lens composition unless a similarly stable intent is established.

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

## 5. Composition Rule

```text
P-06 Lens Port
→ required Core Pack
  L1/L2/L3 at material choices
  + Documentation / Representation at materialization
+ Target Module Lens Profile
+ applicable generic conditional/reusable lenses
+ applicable profile-specific lenses
+ exceptional local-only lens
```

A Lens finding feeds Questions/Ideas/Evidence/Q-R-P/Answer Decisions. It does not become semantic authority and does not define a Target output schema.

## 6. Artifact / File Implications

Every reusable Lens contains exactly one `## Artifact / File Implications` section. Generic and profile-specific Lens records may contribute `AG-*` guidance to the active profile's Artifact Materialization tree/resolver. The Documentation / Representation Lens is required before final P-14 placement whenever material output may persist.

The Lens never creates semantic authority by itself; `P-14 / TF-10` resolves physical placement.

## 7. Maintenance

- [`LENS-MODEL.md`](LENS-MODEL.md)
- [`../shared/lens-creation-and-integration-use-case.md`](../shared/lens-creation-and-integration-use-case.md)
- [`LENS-AUDIT.md`](LENS-AUDIT.md)
- [`LENS-MIGRATION-COMPLETENESS-AUDIT.md`](LENS-MIGRATION-COMPLETENESS-AUDIT.md)

Example standard: [`../HIGH-LEVEL-EXAMPLE-GUIDE.md`](../HIGH-LEVEL-EXAMPLE-GUIDE.md).
