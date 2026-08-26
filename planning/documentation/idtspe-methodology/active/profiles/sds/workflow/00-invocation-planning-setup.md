# Phase 00 — Invocation / Planning Setup — Generic

Status: active working file  
Role: one deep-dive unit in the generic SDS / IDTSPE action map.  
Source provenance: derived from `sources-readonly/` captures; this file is the active place for future refinement.

## Purpose

Resolve requested operation, canonical IDTSPE Target invocation mode, current context, target family/profile, permission boundary, and reusable planning state before semantic work begins.

## Recommended IDTSPE Instance Boundary

Normally orchestration, not a semantic IDTSPE Target by itself. It selects which IDTSPE instance should run next.

Important:

```text
one Phase
≠ automatically one IDTSPE instance

one independently selected Target / choice surface
→ one IDTSPE instance is usually the better boundary
```

## High-Level Actions

- Resolve Trigger and requested operation.
- Resolve two separate dimensions:

  ```text
  Requested operation / outer workflow intent
    examples: SHOW / REVIEW / RECONCILIATION / PRE-UPDATE / REALIZATION

  IDTSPE Target invocation mode
    CREATE / REFINE / EXTEND / REVALIDATE / REPAIR
  ```

  Do not mix them into one enum. `INTEGRATE` is normally an outer/request intent or result-integration action, not a canonical Target invocation mode.
- Resolve current Target family / Planning Topology stage.
- Resolve Mini / Modular / Full as physical profile only.
- Load current reusable Sources/Decisions proportionally.
- Resolve permission and initial Rule Pack.

## Applicable Lenses — Current High-Level Map

Core Pack — checked for every material IDTSPE choice:
- [`LENS-NEED-VALUE-SCOPE`](../../../idtspe-core/lenses/required/LENS-NEED-VALUE-SCOPE.md) — L1; normally reuses trusted Need/value/scope unless current choice challenges it.
- [`LENS-AUTHORITY-SOT-REUSE`](../../../idtspe-core/lenses/required/LENS-AUTHORITY-SOT-REUSE.md) — L2; current owners/Sources/reuse/no duplicate truth.
- [`LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY`](../../../idtspe-core/lenses/required/LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY.md) — L3; required check may resolve immediately as `no material uncertainty`.

Frequent conditional:
- [`LENS-DEPENDENCY-CHANGE-IMPACT`](../../../idtspe-core/lenses/frequent/LENS-DEPENDENCY-CHANGE-IMPACT.md) — L4 when a structured dependency/change surface is material.
- [`LENS-WORKSPACE-EVOLUTION-ARCHITECTURE`](../lenses/frequent/LENS-WORKSPACE-EVOLUTION-ARCHITECTURE.md) — L5 when Workspace evolution/WEUC/architecture pressure is material.
- [`LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY`](../../../idtspe-core/lenses/frequent/LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY.md) — L6 when proof/observation/diagnosis/operation is material.
- [`LENS-QUALITY-RISK-MATERIALITY`](../../../idtspe-core/lenses/frequent/LENS-QUALITY-RISK-MATERIALITY.md) — only quality/risk dimensions capable of changing the answer.

## Main Outputs

- Invocation Contract
- selected next semantic Target family/stage
- permission mode
- initial Source context
- initial Rule/Pack composition

## Command Surface Owner

The user-level command architecture is now owned by:

[`../shared/idtspe-command-surface-contract.md`](../shared/idtspe-command-surface-contract.md)

Current repository command mapping remains in:

[`integration/target-module-entrypoints-and-command-readiness.md`](../../../../integration/target-module-entrypoints-and-command-readiness.md)

Commands compose generic IDTSPE by routing to Target Module semantic entry points; command identity never becomes Target/Lens authority.

## Deep-Dive TODO Template

Future passes should fill:

```text
1. entry conditions
2. exact user/Tampermonkey UX
3. current repo candidates + consistency audit
4. Target candidates + Target-Scope Decision
5. required/proportional Sources
6. RQ discovery + Question-Set Decision
7. each applicable Lens:
   exact prompts/actions/evidence
8. Ideas/Variants
9. Q/R/P + admission gate
10. Answer Decisions
11. residual Q/R/P + revalidation hooks
12. target output contract
13. Validators / Guards / Rules
14. persistence
15. optional Artifact/File Pack implications
16. exit criteria / next-phase handoff
17. re-open paths
18. full worked example
19. anti-patterns
```
