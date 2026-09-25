# IDTSPE Lens Registry

Status: active generic Lens registry + installed-profile index
Model: [`LENS-MODEL.md`](LENS-MODEL.md#lens-meta-model)

<a id="lens-discovery-registry"></a>
## Registry Scan Guide

Responsibility ID: `LENS.DISCOVERY`

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [`Lens Meta-Model`](LENS-MODEL.md#lens-meta-model) — `LENS.META-MODEL`
> - `CONTEXTUALIZES` [`Knowledge Basis Contract`](../knowledge-bases/KNOWLEDGE-BASIS-CONTRACT.md#knowledge-basis-contract) — `KNOWLEDGE.BASIS`

The Core Lens Registry is the normal universal registry entry point.

```text
current material Unit / bounded Analysis Surface + active profile context
→ inherit Core Lens Pack
→ load predictable Unit attachments when a Unit is active
→ scan Generic Lens Registry
→ scan every active-profile Lens Registry
→ include explicit Lens requests
→ open only plausible concrete Lens
→ evaluate the concrete Lens's own checkpoint trigger / applicability
→ execute only required/applicable Lens Applications
```

A registry row is lightweight candidate-routing metadata. Selecting a row does not itself execute the Lens, create a Finding or create a Unit attachment. A scan may select zero additional Lenses.

## 1. Inherited Core Lens Pack

Membership in this section — not a concrete Lens `Activation:` field — defines automatic Core inheritance.

Every material Unit inherits this pack. Core-pack membership guarantees that each Core Lens is considered through the Unit applicability lifecycle; actual application follows that concrete Core Lens's own applicability / temporal trigger contract. A check may resolve with no material Finding.

| Lens | Role / applicability summary | Current KB representation |
|---|---|---|
| [`LENS-NEED-VALUE-SCOPE`](required/LENS-NEED-VALUE-SCOPE.md) | L1 — Need/value/right bounded Target | `INLINE` |
| [`LENS-AUTHORITY-SOT-REUSE`](required/LENS-AUTHORITY-SOT-REUSE.md) | L2 — canonical owner/Source/reuse/no duplicate truth | `INLINE` |
| [`LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY`](required/LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY.md) | L3 — assumptions/Evidence/reversibility/cost of being wrong | `INLINE` |
| [`LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY`](required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md) | Documentation / Representation — persist or not; code vs prose; existing owner vs dedicated artifact; consolidate vs split; handoff to P-14 | `HYBRID` |
| [`LENS-PROPOSAL-DECISION-RESOLUTION-CONTEXT`](required/LENS-PROPOSAL-DECISION-RESOLUTION-CONTEXT.md) | Proposal / Decision Resolution Context — material Proposal/Decision qualification/disposition evaluator, not lifecycle owner | `INLINE` |

## 2. Generic Lens Registry

These generic Core Lens are discoverable from the Core registry and may also be predictably attached by Unit Definitions. Registry presence alone does not imply attachment or application.

| Lens | Discovery / applicability summary | Current KB representation |
|---|---|---|
| [`LENS-DEPENDENCY-CHANGE-IMPACT`](frequent/LENS-DEPENDENCY-CHANGE-IMPACT.md) | dependency/change surface/consumers/blast radius | `INLINE` |
| [`LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY`](frequent/LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY.md) | proof/observation/diagnosis/operation | `INLINE` |
| [`LENS-QUALITY-RISK-MATERIALITY`](frequent/LENS-QUALITY-RISK-MATERIALITY.md) | material quality/risk categories | `INLINE` |
| [`LENS-TARGET-RESOLUTION-COVERAGE`](frequent/LENS-TARGET-RESOLUTION-COVERAGE.md) | Target scope/Requirement/Unit coverage sufficiency; prepared vs contextual completion | `INLINE` |
| [`LENS-SHARED-CROSS-CUTTING-RESPONSIBILITY`](reusable/LENS-SHARED-CROSS-CUTTING-RESPONSIBILITY.md) | shared ownership / applicability / local integration | `INLINE` |
| [`LENS-TEST-PROOF-EVIDENCE`](reusable/LENS-TEST-PROOF-EVIDENCE.md) | proof-layer/evidence quality | `HYBRID` → detailed testing theory on demand |
| [`LENS-PRACTICAL-EVIDENCE`](reusable/LENS-PRACTICAL-EVIDENCE.md) | minimum practical experiment / observed Evidence | `HYBRID` |

Specific Lens shortcut commands are exceptional, but every registered Lens remains explicitly reachable through the generic Lens operations. Registry discovery remains Analysis-Surface-first and does not create Lens-owned Targets.

## 3. Generic `idtspe` Lens Aliases

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
```

Use `idtspe lens <alias> <target>` when explicit Lens selection is intended.

## 4. Installed / Active Profile Lens Registries

### SDS

Profile registry: [`../../profiles/sds/registries/LENS-REGISTRY.md`](../../profiles/sds/registries/LENS-REGISTRY.md)

### 2D Visual Production

Profile registry: [`../../profiles/visual-production-2d/registries/LENS-REGISTRY.md`](../../profiles/visual-production-2d/registries/LENS-REGISTRY.md)

### Reference Knowledge

Profile registry: [`../../profiles/reference-knowledge/registries/LENS-REGISTRY.md`](../../profiles/reference-knowledge/registries/LENS-REGISTRY.md)

Each profile registry owns its current profile Lens inventory and discovery summaries. Core indexes the registries but does not duplicate mutable profile Lens counts/lists or encode profile-specific Analysis Surface assumptions here. When a profile is active, its Lens Registry MUST be included in checkpoint discovery in addition to the inherited/generic Core Lens. A profile registry adds candidates; it never replaces Core registry content and never becomes Unit attachment authority.

## 5. Composition / Applicability Scan Rule

At a Unit checkpoint, Lens applicability combines four sources without collapsing their ownership:

```text
Unit checkpoint
→ inherited Core Lens Pack
+ Unit REQUIRED / TRIGGERED Lens Attachments
+ Generic Core registry candidates
+ every active-profile registry candidate
+ explicit Lens requests
→ concrete Lens-owned applicability / temporal-trigger evaluation
→ selected Lens Applications
```

`REQUIRED [phase]` attachments execute unconditionally at the named phase. `TRIGGERED` attachments carry no local condition logic and delegate the apply/skip decision to the concrete Lens checkpoint trigger. Unlisted Lens remain discoverable.

A Lens analyzes an explicit/implicit Analysis Surface through reusable operations such as `ANALYZE / CHECK / REFINE / CHALLENGE` and surfaces Findings. Generic Core Finding Disposition resolves those Findings into the appropriate State/lifecycle/owner destination; accepted resolution may later update already-declared Result Units. A Lens does not define State Unit kinds, Target Result Unit kinds, target output schema or semantic authority.

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
