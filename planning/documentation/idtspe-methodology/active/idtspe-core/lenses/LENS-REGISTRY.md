# IDTSPE Lens Registry

Status: active generic Lens registry + installed-profile index
Model: [`LENS-MODEL.md`](LENS-MODEL.md#lens-meta-model)

<a id="lens-discovery-registry"></a>
## Registry Scan Guide

Responsibility ID: `LENS.DISCOVERY`

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [`Lens Meta-Model`](LENS-MODEL.md#lens-meta-model) — `LENS.META-MODEL`
> - `CONTEXTUALIZES` [`Knowledge Basis Contract`](../knowledge-bases/KNOWLEDGE-BASIS-CONTRACT.md#knowledge-basis-contract) — `KNOWLEDGE.BASIS`


The Lens Registry is normally reached from an applicable Use-Case Process (especially `UC-IDTSPE-COMPOSE-CURRENT-WORK`) when current meaning may benefit from evaluation/check/refinement/challenge.

```text
current Work Context / Target / State surface
→ scan registry applicability summaries
→ include required Core perspectives whose material surface exists
→ include only plausible conditional/profile candidates
→ open concrete Lens body
→ confirm its local Applicability Gate + supported operation
→ execute Lens
```

A registry scan may select **zero additional Lenses**. Selecting a row does not itself execute the Lens or create a Finding. Recheck only when the Lens's Analysis Surface, relevant Decisions/Evidence, active Target/profile or declared revalidation conditions change materially.

## 1. Required Core Lenses

The required Core Pack is part of every material IDTSPE lifecycle **when its corresponding material surface exists**, but it is not rerun ceremonially on every conversational turn. L1–L3 check material choice surfaces; the Documentation / Representation Lens is a required materialization-stage check when material output may persist. Any required check may resolve with no material finding.

| Lens | Role / applicability summary | Current KB representation |
|---|---|---|
| [`LENS-NEED-VALUE-SCOPE`](required/LENS-NEED-VALUE-SCOPE.md) | L1 — Need/value/right bounded Target | `INLINE` |
| [`LENS-AUTHORITY-SOT-REUSE`](required/LENS-AUTHORITY-SOT-REUSE.md) | L2 — canonical owner/Source/reuse/no duplicate truth | `INLINE` |
| [`LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY`](required/LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY.md) | L3 — assumptions/Evidence/reversibility/cost of being wrong | `INLINE` |
| [`LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY`](required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md) | Documentation / Representation — persist or not; code vs prose; existing owner vs dedicated artifact; consolidate vs split; handoff to P-14; direct surface `lenscmd.documentation.representation.check` | `HYBRID` |
| [`LENS-PROPOSAL-DECISION-RESOLUTION-CONTEXT`](required/LENS-PROPOSAL-DECISION-RESOLUTION-CONTEXT.md) | Proposal / Decision Resolution Context — required when a material Proposal/Decision surface exists; operational QRPE/qualification/disposition evaluator, not lifecycle owner | `INLINE` |

## 2. Generic Frequent Conditional Lenses

| Lens | Applicability summary | Current KB representation |
|---|---|---|
| [`LENS-DEPENDENCY-CHANGE-IMPACT`](frequent/LENS-DEPENDENCY-CHANGE-IMPACT.md) | L4 — dependency/change surface/consumers/blast radius | `INLINE` |
| [`LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY`](frequent/LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY.md) | L6 — proof/observation/diagnosis/operation | `INLINE` |
| [`LENS-QUALITY-RISK-MATERIALITY`](frequent/LENS-QUALITY-RISK-MATERIALITY.md) | material quality/risk categories | `INLINE` |
| [`LENS-TARGET-RESOLUTION-COVERAGE`](frequent/LENS-TARGET-RESOLUTION-COVERAGE.md) | Target scope/Requirement/Unit coverage sufficiency; prepared vs contextual completion | `INLINE` |

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
→ run the proportional Lens Applicability Scan through P-06

idtspe.lens.apply
→ примени линзу <lens> к <target/context>
→ apply one selected registered Lens inside/reusing the natural IDTSPE Target context
```

The existing Documentation / Representation and Linked Notes commands remain convenience shortcuts for stable recurring intents. The generic operations do not create Lens-owned Targets and do not turn all Lens registry entries into separate command files.

## 3A. Generic `idtspe` Lens Aliases

Canonical semantic identity remains the `LENS-*` ID. The dispatcher accepts exact IDs and these unique short aliases:

```text
need             → LENS-NEED-VALUE-SCOPE
authority        → LENS-AUTHORITY-SOT-REUSE
uncertainty      → LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY
representation   → LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY
proposal-decision → LENS-PROPOSAL-DECISION-RESOLUTION-CONTEXT
dependency       → LENS-DEPENDENCY-CHANGE-IMPACT
operability      → LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY
quality-risk     → LENS-QUALITY-RISK-MATERIALITY
shared-crosscut  → LENS-SHARED-CROSS-CUTTING-RESPONSIBILITY
test-proof       → LENS-TEST-PROOF-EVIDENCE
practical-evidence → LENS-PRACTICAL-EVIDENCE
linked-notes     → LENS-LINKED-NOTES-USAGE-JUSTIFICATION
```

Use `idtspe lens <alias> <target>` when explicit Lens selection is intended.

## 4. Installed Profile Lens Packs

### SDS

Profile registry: [`../../profiles/sds/registries/LENS-REGISTRY.md`](../../profiles/sds/registries/LENS-REGISTRY.md)

### 2D Visual Production

Profile registry: [`../../profiles/visual-production-2d/registries/LENS-REGISTRY.md`](../../profiles/visual-production-2d/registries/LENS-REGISTRY.md)

### Reference Knowledge

Profile registry: [`../../profiles/reference-knowledge/registries/LENS-REGISTRY.md`](../../profiles/reference-knowledge/registries/LENS-REGISTRY.md)

Each profile registry owns its current Lens inventory, names and attachment policy. Core indexes the registries but does not duplicate mutable profile Lens counts/lists or encode profile-specific Analysis Surface assumptions here.

## 5. Composition / Applicability Scan Rule

Lens applicability performs the proportional Lens Applicability Scan before selecting/applying active Lenses. It combines required Core checks, the active Target Module Lens Profile when any, plausible Core/profile conditional Lenses and explicit user/agent Lens selection. Full Lens/Knowledge-Basis bodies are read only for selected or plausibly applicable candidates.

```text
P-06 Lens Port
→ Lens Applicability Scan
→ required Core Pack
  L1/L2/L3 at material choices
  + Proposal / Decision Resolution Context when a material Proposal/Decision surface exists
  + Documentation / Representation at materialization
+ Target Module Lens Profile
+ applicable generic conditional/reusable lenses
+ applicable profile-specific lenses
+ exceptional local-only lens
```

A Lens analyzes an explicit/implicit Analysis Surface through reusable operations such as `ANALYZE / CHECK / REFINE / CHALLENGE` and surfaces findings. Generic Core Finding Disposition resolves those findings into the appropriate State/lifecycle/owner destination; accepted resolution may later update already-declared Result Units. A Lens does not define State Unit kinds, Target Result Unit kinds, target output schema or semantic authority.

## 6. Knowledge / Representation Metadata Boundary

This registry carries only summary-level routing metadata for those concerns. Canonical semantics are owned elsewhere:

- Knowledge Basis / theory-current-state boundary → [`../knowledge-bases/RESPONSIBILITY-MAP.md`](../knowledge-bases/RESPONSIBILITY-MAP.md);
- Lens Analysis Surface / supported operations / Finding contract → [`LENS-MODEL.md`](LENS-MODEL.md#lens-meta-model);
- Finding lifecycle/disposition → [`../resolution/RESPONSIBILITY-MAP.md`](../resolution/RESPONSIBILITY-MAP.md);
- artifact guidance / P-14 placement interface → [`../representation/RESPONSIBILITY-MAP.md`](../representation/RESPONSIBILITY-MAP.md).

The `INLINE / REFERENCED / HYBRID` values in the registry tables describe current Lens-file representation only; they are not Generic conformance modes. Likewise, a registry summary may mention `AG-*`, Analysis Surface or supported operations to aid discovery, but this file does not define those contracts. Open the selected Lens and the routed owner when the detail is material.

Profile registries may impose their own literal conformance requirements on profile Lens files; this Core registry does not turn such profile-maintenance rules into generic Lens semantics.

## 7. Maintenance

- [`LENS-MODEL.md`](LENS-MODEL.md)
- [`../use-cases/maintain-lens/UC-IDTSPE-MAINTAIN-LENS.md`](../use-cases/maintain-lens/UC-IDTSPE-MAINTAIN-LENS.md)

Audit/check evidence is retained under [`../../evidence/audits/`](../../evidence/audits/) and does not participate in Lens registry authority.

Example standard: [`../examples/HIGH-LEVEL-EXAMPLE-AUTHORING-GUIDANCE.md`](../examples/HIGH-LEVEL-EXAMPLE-AUTHORING-GUIDANCE.md).

### LENS-TARGET-RESOLUTION-COVERAGE — Target Resolution Coverage

Path: [`frequent/LENS-TARGET-RESOLUTION-COVERAGE.md`](frequent/LENS-TARGET-RESOLUTION-COVERAGE.md)

Use when a Target needs a reusable check that its current scope/Requirements are sufficiently covered by direct state, prepared Module/Core Units and contextual work without manufacturing duplicate owners. This Lens surfaces Findings only; Target Formation/Resolution owns composition changes.
