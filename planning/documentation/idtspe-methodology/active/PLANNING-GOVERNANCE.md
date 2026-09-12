# Planning Governance — Compatibility / Provenance Map

Status: compatibility/provenance only; **not a current semantic owner**
Purpose: preserve links to earlier global `G-*` governance decisions while routing their useful current meaning to dedicated Session / Documentation / IDTSPE owners.

The former file mixed runtime composition, Proposal/Idea semantics, USER authority, question policy, methodology-usage visibility, future-candidate retention and artifact planning. Those responsibilities are now intentionally separated.

## Current Owners

```text
IDTSPE proportional composition / Targets
→ idtspe-core/shared/compose-current-work-use-case.md
→ idtspe-core/shared/contextual-methodology-application-contract.md

Decision type / Target Formation resolution mechanics
→ idtspe-core/shared/resolution-slot-and-target-formation-resolution-set.md

Proposal candidate / selection / Decision lifecycle
→ idtspe-core/shared/proposal-and-decision-lifecycle-contract.md

USER input / Question Policy / conditional Decision Gate
→ idtspe-core/shared/user-input-decision-and-answer-intake-rule.md

Q/R/P semantics and lifecycle
→ idtspe-core/shared/qrp-lifecycle-and-review-contract.md

methodology activation/usage state when retention is material
→ idtspe-core/shared/idtspe-unit-and-target-step-result-model.md#methodology-usage-state

artifact/file representation and P-14
→ idtspe-core/shared/artifact-placement-and-idtspe-response-contract.md

interaction / mutation authority
→ planning/session/session-runtime-contract.md
→ planning/AI-WORKING-CONTRACT.md
```

## Legacy `G-*` Mapping

| Legacy decision | Current interpretation / owner |
|---|---|
| `G-01` high-level planning direction | Work Context + Target Formation are proportional; no fixed SDS phase runtime |
| `G-02` first user-facing workflow | historical working direction; current functional entry is the Methodology Use-Case Registry Map + applicable Use Case |
| `G-03` three durable Decision types | Resolution-slot / Target Formation owner |
| `G-04` AI Proposal is an Idea | superseded vocabulary: legacy `Idea = current Proposal`; Proposal remains unselected until normal authority selects it |
| `G-05` USER authority guard | Session / AI Working Contract + Proposal lifecycle interaction boundary |
| `G-06` question-type distinction | Resolution-slot, Lens, Q/R/P and USER-intake owners keep these meanings separate |
| `G-07` USER Question Policy | `user-input-decision-and-answer-intake-rule.md` |
| `G-08` User Decision Gate | conditional interaction Guard/Rule in USER-intake owner; not a new State/module type |
| `G-09` activated methodology visibility | optional `Methodology Usage State` when retention/review/revalidation value exists |
| `G-10` future/unassigned Ideas | ordinary retained Proposal State when useful; no separate Idea State/inbox authority |
| `G-11` README navigation boundary | Documentation Principles & Terminology / README ownership rules |
| `G-12` Artifact/File realization | Artifact Placement / P-14; independent and conditional |

The former `Q-GOV-*` items are historical open questions/provenance, not current global Q/R/P. Current unresolved material questions must be represented through the normal Core Q/R/P/Decision owners when they are still relevant.

## Compatibility Rule

Do not add new planning semantics here. New work links the dedicated owner directly. If historical `G-*` wording conflicts with a current owner, the current owner wins.
