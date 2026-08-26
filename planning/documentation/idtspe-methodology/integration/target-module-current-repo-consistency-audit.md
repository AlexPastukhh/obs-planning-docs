# Target Module Consistency Audit — Current Repository Planning Families

Status: supporting prior-snapshot integration audit; not proof of current repository state  
Repository basis: `github:AlexPastukhh/obs-planning-docs` snapshot at `915325d4...`  
Purpose: identify which current UC/workflow/template families already form strong Target Modules and where module contracts are missing or mixed.

| Current methodology owner / reusable unit | Current repository owners | Assessment | Main correction / integration need |
|---|---|---|---|
| Application Definition | `UC-PLAN-APP-CONCEPT` + `UC-PLAN-APPLICATION` + proportional `UC-PLAN-REALIZATION` evidence | current repo splits one boundary across several families | integrated as `TM-APPLICATION-DEFINITION`; concept/responsibility/feasibility are views of one selected Application Definition |
| Prototype | `UC-PLAN-PROTOTYPE` + workflow/templates | strong evidence module | `TM-PROTOTYPE`; provisional findings never canonical automatically |
| Scenario Discovery | `UC-PLAN-SCENARIO-DISCOVERY` + solution workflow | strong | `TM-SCENARIO-DISCOVERY` |
| Detailed Scenario | `UC-PLAN-SCENARIO` + detailed-planning + Scenario template | very strong composite | `TM-SCENARIO-DRAFT`; Scenario DATA/Behavior are internal object contracts; Requirement/Screen supporting when material |
| Requirement | `requirements-and-change-context.md` + templates | strong cross-cutting concept | `TM-REQUIREMENT`, usually zero/attached instances; independent Target only when material |
| Screen | `SCREEN-DRAFT-TEMPLATE.md` + detailed-planning | strong supporting owner | `TM-SCREEN`, conditional spatial owner |
| Domain Discovery | `UC-PLAN-DOMAIN-DISCOVERY` + workflow | very strong | `TM-DOMAIN-DISCOVERY` + reusable `LENS-DOMAIN-MODELING-DDD` |
| Domain Draft | `UC-PLAN-DOMAIN` + workflow/template | very strong | `TM-DOMAIN-DRAFT`; no-Domain remains valid |
| Slice Strategy | `UC-PLAN-SLICE-STRATEGY` + workflow/template | very strong | `TM-SLICE-STRATEGY` + reusable Slice/Architecture Lens profiles |
| Implementation Slice | `UC-PLAN-SLICE` + workflow/template | very strong | `TM-IMPLEMENTATION-SLICE`; vertical integrated realization without semantic redefinition |
| Frontend realization | client/server planning evidence + current Screen/Scenario boundaries | useful recurring extension | `TM-FRONTEND-SLICE`; reusable UI/Frontend Lens Pack |
| Shared cross-cutting realization | Slice shared-applicability rules + architecture/change evidence | recurring when one shared responsibility exists | `TM-CROSS-CUTTING-CONCERN`; reusable Shared/Cross-Cutting Lens Pack |
| Testing Strategy | `UC-PLAN-TEST-STRATEGY` + workflow/template | strong | `TM-TEST-STRATEGY` + reusable Test Proof/Evidence Lens Pack |
| Test Design | `UC-PLAN-TEST-DESIGN` + workflow/template | very strong | `TM-TEST-DESIGN` |
| Practical Testing | `UC-PLAN-TEST-PLAN` + workflow/template | strong | `TM-PRACTICAL-TEST` + reusable Practical Evidence Lens Pack |
| Test Coverage Review | `UC-PLAN-TEST-COVERAGE` + workflow/template | strong review | `TM-TEST-COVERAGE` |
| Cross-owner Consistency | `UC-PLAN-CONSISTENCY` + detailed-planning | strong review capability | `UC-IDTSPE-REVIEW-CONSISTENCY`; not a Target Module by default |
| WEUC / Architecture | Architecture Planning WEUC/work-cost/decision workflows | strong reusable reasoning across many Targets | split into `TM-WEUC` global map/current architecture-position ownership + reusable `LENS-WORKSPACE-EVOLUTION-ARCHITECTURE`; local architecture is ordinary Answer Decision, project-global conclusions promote to TM-WEUC, whole-Workspace architecture is a TM-WEUC scope, bounded independent architecture only on generic escalation |
---

# Key Consistency Findings

## A. Scenario → Domain readiness is mostly present but implicit

Current Scenario owners already cover:

```text
Need / result / actor / flow
Scenario DATA references
Behavior Item references
Requirements
Invariants
Acceptance
Screen relations
Scenario ↔ DATA ↔ Behavior iterative discovery
```

Missing reusable module-level guarantee was not separate modules, but explicit **internal Scenario object contracts**:

```text
Scenario DATA object contract inside TM-SCENARIO-DRAFT
Behavior Item object contract inside TM-SCENARIO-DRAFT
explicit Scenario Draft readiness gate for Domain Discovery
```

## B. Domain → Slice readiness is strong

Current Domain workflow/template already provides:

```text
concepts/identity
lifecycle/state
invariants/policies
Value Object candidates
Aggregate/root ownership candidates
outside/external references
cross-aggregate coordination
change-axis stress
Domain Verification Meaning
```

This is suitable as Target Module semantics with reusable `LENS-DOMAIN-MODELING-DDD`.

## C. Slice module is already close to full IDTSPE output

Current Slice contract already binds:

```text
vertical result
Scenario/Behavior/Requirement coverage
Domain meaning
implemented/delegated/later/outside
implementation plan
dependencies/handoffs
Useful Vertical Result Definition / proof handoff
change-axis / complexity review
```

Main integration work is generic IDTSPE Decisions/QRP/branches/revalidation.

## D. Tests should remain sibling proof modules

Domain may emit:

```text
Domain Verification Meaning
```

but Test modules consume:

```text
Scenario Acceptance
Behavior Items
Requirements
Domain invariants
Slice target
```

and design Evidence.

This preserves:

```text
Tests = Evidence / proof planning
≠ Domain/Scenario semantic authority
```

## E. Planning Unit Variant needs one ontology story

Current repo `Planning Unit Variant` is an integrated alternative design representation.

New generic methodology has `Planning Branch` networks.

Recommended relation:

```text
Planning Branch
→ exploration of alternative downstream planning states

Target Module Variant projection
→ representation of a materially distinct integrated candidate/current design
```

Do not maintain separate competing alternative-selection algorithms.


---

# Use Case vs Target Module Boundary

Do **not** mechanically rename/remove current reusable UCs.

```text
Use Case
= capability / trigger / useful result / boundary / owner-route contract

Target Module
= reusable IDTSPE methodology used to plan a recurring Target/output
```

Recommended future repository integration:

```text
UC-PLAN-SCENARIO
→ invokes/uses TM-SCENARIO-DRAFT

UC-PLAN-DOMAIN
→ invokes/uses TM-DOMAIN-DRAFT

UC-PLAN-SLICE
→ invokes/uses TM-IMPLEMENTATION-SLICE
```

Commands route to UCs/module entry points but remain invocation only.

`UC-IDTSPE-MAINTAIN-TARGET-MODULE` is the proposed capability for creating/reviewing/integrating reusable modules themselves.
