# Directed Workflow / Example Consistency Audit

Status: **PASS**

Scope: methodology state after adding canonical directed Target sequencing, repeated IDTSPE invocation over persistent artifacts, Methodology Direction/next-step projection, and refreshing the Research Capture worked example.

## Canonical Workflow

- `shared/directed-methodology-workflow-and-next-step-resolution.md` exists as the cross-module chronology/readiness owner: **PASS**
- numeric `generic/00..11` files are navigation families rather than chronological authority: **PASS**
- invocation modes `CREATE | REFINE | EXTEND | REVALIDATE | REPAIR` are explicit: **PASS**
- same Target identity may be revisited against already-created owner artifacts: **PASS**
- IDTSPE is described as a planning viewport over Target artifacts, not a methodology Lens type: **PASS**
- every material response exposes Methodology Direction / recommended next step: **PASS**
- next-step algorithm supports repeat-current, forward handoff, conditional alternatives and narrow backward reopen: **PASS**

## Testing Direction

```text
Domain Draft per owner
→ per-Domain Test Design when material
→ Slice Strategy / selected Slice portfolio
→ conditional Test Strategy
→ per-Slice Implementation Slice ↔ per-Slice Test Design
→ realization / execution
→ Test Coverage
```

Checks:

- Domain Test Design can occur before Slice planning: **PASS**
- shared Test Strategy waits until current Domain proof responsibilities are planned/not-applicable/deferred: **PASS**
- Test Strategy also requires a known Slice portfolio; it does not invent Slices: **PASS**
- isolated complex Domain/business logic defaults to unit proof: **PASS**
- Slice orchestration/multi-owner vertical collaboration defaults to integration proof: **PASS**
- standard Slice→Test Design route is represented: **PASS**
- TDD interleave `Slice semantic pass → Test Design → same Slice REFINE` is represented: **PASS**
- Test Design remains downstream of accepted semantics and never becomes behavior authority: **PASS**

## WEUC / Artifact Placement Preservation

- `TM-WEUC` still owns `SDS-WORKSPACE-EVOLUTION.md`: **PASS**
- L5 remains a consumer/evaluator of that map: **PASS**
- stale `L5 owns WEUC+Architecture / no Target` text removed from `IDTSPE-INSTANCE-MAP.md`: **PASS**
- AP source records: **38**: **PASS**
- AG source records: **36**: **PASS**
- all **74** source IDs unique: **PASS**
- all 74 records retain normalized `PERSISTENCE_GUIDANCE` / `PLACEMENT_DIRECTIVE`: **PASS**
- registry rows = 74 and field-for-field match sources: **PASS**
- all 74 AP/AG record bodies are unchanged from the pre-workflow baseline: **PASS**

## Research Capture Example Refresh

The worked example now physically contains persistent owners for:

```text
Need
Application Definition / Prototype
Scenario Catalog / Scenario owners
Screen Map
Domain Discovery / Domain owners / evolution companions
per-Domain Test Designs
Slice Strategy
shared Test Strategy
per-Slice owners / per-Slice Test Designs
Practical Test plan
Test Coverage
SDS Evolution / Workspace Evolution
```

Checks:

- required worked artifact tree exists: **PASS**
- `TM-REQUIREMENT` is not activated for local Capture Scenario guarantees: **PASS**
- `CaptureItem` and `SourceContext` each get Domain Test Design before Slice Strategy: **PASS**
- Test Strategy explicitly consumes those planned Domain proof dispositions plus `SL-RC-01/02` portfolio: **PASS**
- `SL-RC-01` demonstrates standard Slice→integration-Test-Design flow: **PASS**
- `SL-RC-02` demonstrates TDD and repeated IDTSPE over the same Slice artifact: **PASS**
- `SDS-EVOLUTION-MAP.md` now actually contains the EV-RC items interpreted by `SDS-WORKSPACE-EVOLUTION.md`: **PASS**
- phase 09 example explicitly states it is not the chronological start of testing: **PASS**

## Mechanical Checks

- active Target Modules = **17**: **PASS**
- reusable Lenses = **16**: **PASS**
- relative Markdown links resolve: **PASS**
- Markdown fences balanced: **PASS**
- no retired WEUC-discovery module routing, old handoff relation, obsolete proof-target routing, or old Lens-only WEUC ownership claim remains active: **PASS**

## Result

The directed workflow, testing order, repeated-IDTSPE artifact model and refreshed examples are internally consistent with the current Target/Lens/WEUC/Artifact Placement methodology.
