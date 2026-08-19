# Architecture Change-Pressure Workflow

Status: active reusable workflow
Scope: establish/review Workspace Change Pressure and derive evidence-backed Change Axes / Change Hot Paths.

Canonical semantics: [`workspace-use-cases-and-change-pressure.md`](workspace-use-cases-and-change-pressure.md)
Supporting discovery: [`workspace-use-case-discovery-workflow.md`](workspace-use-case-discovery-workflow.md)
Recommended shape: [`templates/CHANGE-PRESSURE-REVIEW-TEMPLATE.md`](templates/CHANGE-PRESSURE-REVIEW-TEMPLATE.md)

## 1. Collect Current Workspace Work

Start with important Workspace UCs. Include read/understand/inspect/diagnose/verify capabilities, not only mutation.

For each material UC record current relevance/frequency when useful and obtain/reuse a representative Workspace Work Path.

## 2. Collect Important Concrete Changes

Include rare/one-off architecture-relevant changes when material. Record importance/probability and expected Change Path instead of forcing them into stable UC identity.

## 3. Collect Extensions

For each Planned/Likely/Possible/Speculative Extension:

```text
confidence/status
expected future Workspace UCs
current UCs affected
Application Scenarios / Requirements when applicable
expected Workspace Work Paths
```

Higher-confidence selected future work creates more pressure than a generic `might someday` possibility.

## 4. Add Constraints / History

Use Requirements, external constraints and observed repeated change/history when available.

## 5. Locate Pressure

Inspect where important work repeatedly creates:

```text
large synchronized Change Surface
poor locality
high Working-Context Load / low discoverability
repeated state/semantic boundary crossings
high verification/migration/operational cost
external volatility / failure pressure
```

## 6. Derive / Revalidate Change Axes

Generalize only when evidence supports a recurring/material dimension of variation. State evidence/confidence and the owners/boundaries actually crossed.

Existing axes must be revalidated against current UCs/paths; preserve, refine, downgrade or remove stale unsupported meaning.

## 7. Identify Change Hot Paths

Mark areas crossed by many important/frequent UCs and/or high-confidence axes. These areas deserve especially strong locality/understandability review.

## 8. Exit Result

```text
Change Pressure picture
Evidence-backed Change Axes + confidence
Workspace Change Hot Paths
Material Architecture Flags/findings
```

Do not translate an axis mechanically into an interface/extension point.
