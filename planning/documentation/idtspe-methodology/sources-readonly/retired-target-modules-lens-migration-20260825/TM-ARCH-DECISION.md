# TM-ARCH-DECISION — Architecture Decision

Entry Point: `tm.architecture.decision`  
Role: primary Target Module

## Purpose

Select one material architecture answer as a current testable hypothesis about important Workspace/runtime/change paths.

## Upstream Source Contract

### Direct Semantic Sources
```text
affected Scenarios / Behavior Items / local-shared Requirements
Domain invariants/ownership boundaries when present
Slice/runtime/implementation responsibilities affected
contextual WEUC instances / important Workspace work paths
```

### Inherited Lineage
```text
Fundamental Need / selected real-world solution / Application Definition
```

### Evidence / Current-State Sources
```text
current architecture/workspace baseline
representative runtime/codebase paths
observed WEUC / implementation Evidence
```

### Constraint / Planning-State Sources
```text
Slice/delivery constraints
accepted/candidate Evolution Items admitted through WEUC
operability/performance/reliability constraints when material
```

### Source Discovery Rule
Expected archetype only; current `TF-04 SOURCE_SET` remains authority.

## Question Set Examples — Non-Exhaustive

Examples only. Current `TF-06 QUESTION_SET` may add/remove/split/merge questions.

```text
Which important work/runtime/change path is expensive/risky?
What simpler direct route remains viable?
Which architecture alternatives materially change that path?
How does each candidate change understanding/mutation/verification/operation cost?
What runtime cost/tradeoff appears?
Which accepted/credible WEUC is improved and at what architectural tax?
Which loose future idea is too weak to justify preparation now?
```

## Specialized Lenses

```text
Workspace Work-Cost Lens
Dependency / Change-Surface Lens
Runtime Path Lens
Architectural Tax Lens
Prepare-Now vs Defer Lens
Verification / Diagnosis / Operation Lens
Evolution-Evidence Strength Lens
```

Architecture alternatives use generic IDTSPE Ideas/Branches; they are not duplicated as architecture-specific output fields.

## Target-Specific Output Template

Generic IDTSPE state is not repeated here.

**Architecture Decision Scope** — exact responsibility/work/change path whose architecture is being decided.  
**Selected Architecture Meaning** — accepted responsibility/seam/dependency/state/coordination meaning at architecture level.  
**Affected Owners** — Scenarios/Domain/Slices/Cross-Cutting/Workspace owners whose realization is constrained.  
**Runtime Impact** — material change to runtime path/performance/reliability/operation.  
**Workspace / Change-Path Impact** — how important work paths become cheaper/more expensive.  
**Accepted WEUC Impact** — which concrete WEUC benefits/costs justify the answer.  
**Accepted Tradeoffs / Architectural Tax** — explicit costs and limitations being accepted.  
**Migration / Compatibility Boundary — when material** — how current architecture transitions without smuggling implementation tasks into the Decision.

## Guard

Architecture reasoning does not steal Scenario/Domain/Slice semantic authority. Loose Ideas alone do not justify preparation-now architecture.
