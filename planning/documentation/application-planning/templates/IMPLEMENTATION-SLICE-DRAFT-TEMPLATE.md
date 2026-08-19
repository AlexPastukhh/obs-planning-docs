# Implementation Slice Draft Template

Status: active reusable recommended template
Purpose: plan one separately deliverable/checkable vertical implementation increment after enough Scenario/Domain meaning is understood.

Detailed workspace contract: [`../detailed-planning/README.md`](../detailed-planning/README.md)

## Workspace Shape

```text
SL-X/
├── README.md
├── slice.md
├── ideas/
├── visual/
├── frontend.md       # optional implementation-part plan
├── server.md         # optional implementation-part plan
├── verification.md   # optional local verification plan
└── variants/         # only when a second integrated Slice design exists
```

A simple Slice may keep all implementation planning in `slice.md`. Split frontend/server/other files only when independent responsibility/review value justifies them.

## Slice

| Field | Value |
|---|---|
| Slice ID | <stable ID> |
| Product-facing label | <optional human/feature label> |
| Status | preliminary / reviewed / accepted-current / needs-review |
| Deliverable/checkable result | <vertical result> |
| Covered Scenarios | <links> |
| Covered Behavior Items | <links> |
| Relevant Domain owners | <links when applicable> |

### Vertical Boundary
<What end-to-end behavior/technical responsibility this Slice delivers and what remains outside.>

### Dependencies / Handoffs
<Only material dependencies.>

### Integrated Implementation Plan
<Current integrated implementation meaning. Keep this at delivery-boundary level; split deeper responsibility plans when useful.>

### Implementation-Part Plans — When Useful
<Link `frontend.md`, `server.md` or other real responsibility-specific plans. These do not replace the integrated Slice owner.>

### Visual Planning
<Link `visual/` material when presentation/visual meaning belongs to this Slice. Visual planning is not the same as frontend code planning.>

### Verification Target
<What must be demonstrably true for this Slice to count as delivered.>

### Verification Evidence — When Useful
<Link `verification.md` and derive evidence from Scenario Acceptance + Behavior Items + Domain invariants + Slice target.>

## Cross-File Dependencies / Reference Object Candidates — When Material

| Source Owner | Meaning Used Here | Use Here | Usage Mode | RO Candidate | Materialized RO |
|---|---|---|---|---|---|
| <owner> | <canonical fragment/reference> | <Slice/verification use> | semantic link / paraphrase / exact-literal candidate | yes / no | no / existing `ro_*` |

A consumer-side candidate note does not redefine Scenario/Domain/other source meaning. Use ordinary links by default.

## Current Decisions
<Use the shared detailed-planning Current Decisions contract.>

## Questions / Risks / Problems
<Each real unit includes Current Draft Plan + Finding + Relation / Impact On Current Draft Plan. When Related Idea(s) exist, apply the shared Idea ↔ Q/R/P mirror/reference rule.>

## Potential Simplifications / Better Routes — When Material
<Only unselected changes to the current Slice draft.>

## Boundary Rules

- Slice does not redefine Scenario or Domain meaning merely for implementation convenience.
- `Feature` is not a required extra semantic layer; an Application Concept Feature is a concept-scoped capability hypothesis and does not create a mandatory Feature → Scenario → Slice chain. A Slice may still have a product-facing feature label.
- Tests/verification provide evidence and do not become semantic authority for behavior by themselves.
