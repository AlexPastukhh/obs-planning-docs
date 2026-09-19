# LENS-PROPOSAL-DECISION-RESOLUTION-CONTEXT — Proposal / Decision Resolution Context

Lens ID: `LENS-PROPOSAL-DECISION-RESOLUTION-CONTEXT`  
Activation: `REQUIRED_CORE` on a material Proposal / Decision surface

## Purpose

Operationally evaluate one material Proposal/Decision resolution context through the existing Core lifecycle owners without creating a second Proposal, Decision, Q/R/P or Evidence lifecycle.

## Authority Boundary

Canonical semantic/lifecycle owners remain:

- [`proposal-and-decision-lifecycle-contract.md`](../../shared/proposal-and-decision-lifecycle-contract.md) — Proposal/Decision identity, candidate/selection/integration/retention semantics;
- [`qrp-lifecycle-and-review-contract.md`](../../shared/qrp-lifecycle-and-review-contract.md) — Question/Risk/Problem lifecycle;
- [`user-input-decision-and-answer-intake-rule.md`](../../shared/user-input-decision-and-answer-intake-rule.md) — USER-input classification;
- [`decision-revalidation-helper-model.md`](../../shared/decision-revalidation-helper-model.md) — accepted-Decision revalidation helper/projection;
- Evidence remains ordinary Core Evidence State.

This Lens owns only the reusable **operational evaluation** of a concrete Proposal/Decision context.

## Applicability Gate

```text
material Proposal / material Decision surface exists
→ REQUIRED_CORE check

no material Proposal/Decision surface
→ Lens not selected merely for ceremony
```

Ordinary Target Modules reach this Lens through Opening/In-Unit/Closing registry scans. A Target Module should not directly attach this Lens mechanically unless recurring specialized value justifies it.

## QRPE View

`QRPE` is a compact view, **not** a new Core State kind:

```text
Proposal / Decision
└─ related QRPE — all optional
   Q — related Question
   R — related Risk
   P — related Problem
   E — related Evidence
```

The obligation is to check applicability. `none material` is a valid result; do not force an empty four-field form.

## Analysis Surface

```text
Proposal identity / subject / driver
candidate Result Meaning
candidate Resolution / Realization Route when material
actual/claimed Decision selection
related Q/R/P + Evidence
natural owner / affected owners
accepted Result / current temporal-host meaning
residual/revalidation context
```

## Supported Operations

```text
ANALYZE
CHECK
REFINE
CHALLENGE
```

### Proposal Operation

Check proportionally:

```text
Proposal identity / subject / driver
candidate Result Meaning
candidate route when material
related QRPE applicability
material unknowns / assumptions / evidence basis
material risk / problem consequence
affected owners / integration surface
selection readiness / unresolved USER authority
```

Then return to the lifecycle owner for canonical Proposal Semantic Change Impact Review and selection handling. A newly discovered contradiction/unsupported assumption/owner conflict becomes a Finding Candidate rather than Lens-owned State.

### Decision Qualification / Integration Operation

Operationalize existing lifecycle rules:

```text
actual material selection exists?
→ if no: not a Decision

selection made under applicable authority?
→ if no: not accepted Decision meaning

exact selected meaning identifiable?
→ required

where is selected meaning integrated?
→ natural Unit / Target / temporal owner

would a separate retained Decision trace preserve independent future value?
→ retain proportionally
```

### Proposal → Decision QRPE Disposition

Selection does not copy Proposal QRPE mechanically. For each material related item:

```text
Question → answered/closed or residual Question?
Risk → eliminated / mitigated / accepted residual / still open?
Problem → resolved / deferred / accepted limitation / still open?
Evidence → still material to accepted basis/revalidation?
Decision → exposes any new Q/R/P?
```

Surviving open/deferred/residual items remain with their canonical lifecycle/natural owners and may be projected into [`Resolution Carry-Forward`](../../shared/resolution-carry-forward-projection-contract.md) when continuation value is material.

## Composition With Existing Lenses

Reuse peer Lens theory rather than copying it:

- `LENS-AUTHORITY-SOT-REUSE` — owner/authority/duplicate-truth questions;
- `LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY` — assumptions, Evidence need, defer/reversibility, cost of being wrong;
- `LENS-DEPENDENCY-CHANGE-IMPACT` — affected owners/consumers/blast radius;
- `LENS-QUALITY-RISK-MATERIALITY` — material risk dimensions.

This Lens coordinates the Proposal/Decision context; peer Lenses retain their own evaluation authority.

## Findings / Outputs

```text
reviewed Proposal/Decision context
related QRPE applicability/disposition
Decision qualification finding
owner/integration finding
residual/revalidation finding
Finding Candidate when a new contradiction/authority problem is discovered
```

## Artifact / File Implications

This Lens creates no dedicated artifact by default. Material accepted semantic consequences remain with canonical lifecycle/natural owners. When review state or surviving residual context needs persistence, use ordinary Documentation / Representation + P-14 and, when applicable, the Resolution Carry-Forward projection rather than a Lens-owned semantic body.

## Guards

```text
QRPE ≠ new Core State kind
Lens ≠ Proposal/Decision lifecycle owner
Lens ≠ Q/R/P/Evidence lifecycle owner
AI recommendation ≠ selection
reviewed candidate Target Instance ≠ canonical integration / realization authority
```

## Revalidation

Re-run only when the material Proposal/Decision surface, decisive Evidence, related QRPE, authority, integration owner or reconsider context changes materially.

## Knowledge Basis

Mode: `REFERENCED`

This Lens intentionally references rather than copies the Proposal/Decision lifecycle, Q/R/P lifecycle, USER-input intake, Decision Revalidation Helper and peer Lenses. Those owners remain the reusable semantic/evaluation knowledge authorities for their respective responsibilities.
