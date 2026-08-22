# Implementation Slice Draft Template

Status: active reusable recommended template
Purpose: plan one selected separately deliverable/checkable vertical implementation increment after enough current Scenario/Requirement/Domain meaning is understood.

Canonical workflow: [`../slice-planning-workflow.md`](../slice-planning-workflow.md)
Cross-cutting context: [`../requirements-and-change-context.md`](../requirements-and-change-context.md)
Generic Architecture Lens / path semantics: [`../../architecture-planning/README.md`](../../architecture-planning/README.md)
Application Realization workflow: [`../application-realization-workflow.md`](../application-realization-workflow.md)
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

A simple Slice may keep all implementation planning in `slice.md`. Split frontend/server/other files only when independent responsibility/review value justifies them; those implementation-part plans are not separate planning Use Cases by default.

## Slice

| Field | Value |
|---|---|
| Slice ID | <stable ID> |
| Product-facing label | <optional human/feature label> |
| Status | preliminary / reviewed / accepted-current / needs-review |
| Deliverable/checkable result | <vertical result> |
| Related Slice Strategy | <link when one exists> |
| Covered Scenarios | <links> |
| Covered Behavior Items | <links> |
| Requirements implemented | <links> |
| Requirements constraining implementation | <links> |
| Relevant Domain owners | <links when applicable> |
| Relevant Domain verification meaning | <links/examples when applicable> |
| Relevant Application Realization findings | <links when material> |
| Relevant Change Axes / Change Pressure | <links when material> |

### Vertical Boundary
<What end-to-end behavior/technical responsibility this Slice delivers and what remains outside.>

### Behavior Coverage
<List the selected Behavior Items / acceptance / invariant obligations implemented by this Slice. Keep this distinct from file/task scope and from test names.>

### Related Behavior Explicitly Out Of Scope — When Material

| Related behavior | Owner / destination | Why not this Slice |
|---|---|---|
| <behavior> | <owner / later Slice> | <boundary reason> |

### Dependencies / Handoffs
<Only material dependencies.>

### Integrated Implementation Plan
<Current integrated implementation meaning. Keep this at delivery-boundary level; split deeper responsibility plans when useful.>

### Implementation-Part Plans — When Useful
<Link `frontend.md`, `server.md` or other real responsibility-specific plans. These do not replace the integrated Slice owner.>

### Screen / Frontend Requirement Handoff — When Applicable
<Link selected Screen spatial requirements and Scenario behavior that frontend work must realize. Screen owns zones/layout/placement/visual states; Scenario/Behavior owns when/why actions are available and what they mean; this Slice owns implementation mechanism.>

### Change-Axis / Coupling Review — When Material
<Which evidence-backed likely changes were considered, which seams are justified now, and which speculative abstractions are intentionally deferred.>

### Implementation Complexity Lens — When Material
<Use the Architecture Planning path concepts proportionally. Record only what materially helps evaluate whether this Slice is genuinely local/vertical.>

```text
Expected Runtime Path
→ calls / state changes / queries / remote calls
→ branches / transaction / concurrency
→ algorithm / data-volume concerns

Implementation Path
→ Domain work / orchestration / persistence
→ adapters / integrations / API/UI
→ configuration / migrations / verification

Workspace Change Impact
→ existing owners touched
→ new owners introduced
→ cross-Slice/shared changes

Risks
→ coupling / performance / operations / migration / testability
```

### Implementation-Scoped Ideas
<Link candidate generic Ideas considered. Mark promoted/rejected; selected meaning belongs in this Slice plan rather than remaining only in the Idea.>

### Visual Planning
<Link `visual/` material when presentation/implementation explanation belongs to this Slice. This does not replace canonical Screen spatial ownership.>

### Verification Target
<What must be demonstrably true for this Slice to count as delivered.>

### Verification Evidence / Test Coverage — When Useful
<Link `verification.md` and derive evidence from Scenario Acceptance + Behavior Items + Requirements + Domain invariants/verification meaning + Slice target. Keep `Scope`, `Behavior Coverage` and `Test Coverage` distinct. When proof design is material, route/build a Behavior-to-Test Trace through sibling Testing Planning `UC-PLAN-TEST-DESIGN`; a test name or `covered by integration tests` note is not sufficient proof planning.>

## Cross-File Dependencies / Reference Object Candidates — When Material

| Source Owner | Meaning Used Here | Use Here | Usage Mode | RO Candidate | Materialized RO |
|---|---|---|---|---|---|
| <owner> | <canonical fragment/reference> | <Slice/verification use> | semantic link / paraphrase / exact-literal candidate | yes / no | no / existing `ro_*` |

A consumer-side candidate note does not redefine Scenario/Requirement/Domain/other source meaning. Use ordinary links by default.

## Current Decisions
<Use the shared detailed-planning Current Decisions contract.>

## Questions / Risks / Problems
<Each real unit includes Current Draft Plan + Finding + Relation / Impact On Current Draft Plan. When Related Idea(s) exist, apply the shared Idea ↔ Q/R/P mirror/reference rule.>

If none: `No material unresolved issues identified.`

## Potential Simplifications / Better Routes — When Material
<Only unselected changes to the current Slice draft.>

## Boundary Rules

- Slice does not redefine Scenario, Screen, Requirement or Domain meaning merely for implementation convenience.
- `Feature` is not a required extra semantic layer; an Application Concept Feature is a concept-scoped capability hypothesis and does not create a mandatory Feature → Scenario → Slice chain.
- Change Axes are reasons to evaluate coupling, not automatic requirements for extension points.
- Tests/verification provide evidence and do not become semantic authority for behavior by themselves.

## Target Dependencies / Practical Acceptance

Add when material:

```markdown
### Target Dependencies
- semantic dependency / handoff
- consumer/source meaning
- exact tracking mechanism only when selected

### Practical Acceptance — When useful
- target property / negative guarantee
- operator: human | AI | E2E/tool
- setup / action / observable evidence
- pass/fail rule
- planned vs executed evidence state
```
