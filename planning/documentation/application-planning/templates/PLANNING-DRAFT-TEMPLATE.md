# Planning Draft Template

Status: active reusable recommended template
Doc version: v1.1.1-branch-workflow-language
Purpose: one item-backed high-level plan for a problem, goal, workflow, algorithm, solution direction or no-change decision.

Use only optional sections that improve the current work. This is not a universal rigid schema, but every sufficient Planning Draft must contain complete Key Scenario coverage and one Full Picture Matrix.

A Planning Draft groups, orders, summarizes and links Planning Items. Complete item meanings remain at their canonical item owners.

A separate `Planning Full Picture` artifact is not required. One Full Picture Matrix is required inside this file.

## 1. Draft Identity

| Field | Value |
|---|---|
| Draft ID | <ID when useful> |
| Title | <title> |
| Status | exploratory / active / accepted-current / selected / rejected / deferred |
| Planning direction | <problem, goal, workflow, algorithm or solution direction> |
| Source/current-context references | <references> |
| Current documentation state | Working / Needs Documentation / Documented/Integrated / unresolved |

## 2. Desired Result

<Current candidate desired result, including no-change when that is a real option.>

**Status:** candidate / confirmed / needs evidence / rejected / superseded

## 3. Acceptance Criteria — Optional

| ID | Criterion | Status | Evidence/source | Related Planning Item/workflow/test |
|---|---|---|---|---|
| AC-01 | <criterion> | candidate | <reference> | <reference> |

Do not invent criteria merely to fill the table.

## 4. Boundaries And Non-Goals

### Included

<Scope currently included.>

### Excluded / Non-Goals

<Scope deliberately not promised.>

## 5. Current Reality — Optional

<Reference or summarize checked current reality without introducing accepted future design.>

Use a separate Current Reality Capture only when independent descriptive depth improves review.

## 6. Planning Item Map

Order links so a reader can understand the planning direction without reading an unrelated ledger first.

| Order / group | Planning Item | Role in this draft | Related Implementation Ideas | Status / note |
|---|---|---|---|---|
| <order/group> | <link to canonical item body> | <workflow, constraint, question, risk, decision, acceptance, other> | <links or none> | <state/compact context> |

Rules:

```text
- link to canonical item bodies;
- do not copy complete item bodies into this draft;
- keep separate Implementation Ideas as linked Planning Items;
- significant statements without an item identify
  source, inference, question or decision status;
- preserve source and item-to-draft traceability;
- use grouping only when it improves the reading route.
```

## 7. Key Scenario Coverage — Required

Identify Key Scenarios through explicit review. Do not promote existing summary rows or planning commands automatically.

| Scenario | Why key | Actor/context | Goal | Observable result | Planning Items | Complete owner |
|---|---|---|---|---|---|---|
| <scenario> | core value / risk / differentiation / viability / other | <context> | <goal> | <result> | <links> | complete inline / linked complete owner |

`Key Scenario` is a role of Scenario, not a separate entity type. A Key Scenario cannot remain only a summary.

Repeat this complete block for every Key Scenario:

### <Key Scenario name>

**Why key:** <reason>

**Actor/context:** <context>

**Goal:** <goal>

**Observable result:** <result>

**Entry / preconditions:** <supported content>

**Main flow:**

1. <observable behavior>

**Branches / alternatives / failures:** <supported content>

**Invariants / postconditions / acceptance / outcomes:** <supported content>

**Important Scenario DATA:** <only when behavior depends on it>

**Questions / risks / evidence needs:** <supported content>

**Planning Items:** <links>

**Implementation Ideas:** <links only; do not copy accepted behavior into an idea>

When the direction has no behavioral Scenario, state that explicitly and explain why.

### Other Scenarios — Optional

| Scenario | Actor/context | Goal | Observable result | Planning Items | Current depth |
|---|---|---|---|---|---|
| <scenario> | <context> | <goal> | <result> | <links> | summary / complete inline / linked detail |

A non-key Scenario may be complete inside this Planning Draft when a separate artifact would add more coordination than value.

## 8. Full Picture Matrix — Required

Use this compact view to cross-link behavior, implementation thinking and validation.

| Flow point | Scenario view | Implementation view | Questions / risks / validation | Status / follow-up |
|---|---|---|---|---|
| <point> | <concise meaning + item links> | <Implementation Idea links> | <question/risk/prototype links> | <state/action> |

Rules:

```text
- keep cells concise;
- link to complete Planning Items and other owners;
- allow many-to-many links;
- do not copy complete question, risk, prototype
  or implementation bodies into the table;
- treat the matrix as a view, not a canonical artifact.
```

## 9. Valuable Behaviors / Functional Workflows — Optional

| ID / link | Behavior or outcome | Why valuable | Independent trigger/result? | Related criteria/items | Status |
|---|---|---|---|---|---|
| FW-01 | <behavior> | <value> | yes / no / unresolved | <references> | candidate |

Create a separate Functional Workflow Draft only when independent review, reuse or testing value justifies it.

A Functional Workflow is not automatically a branch, an End-To-End Workflow or an implementation Slice.

## 10. End-To-End Workflow — Optional

Use this section only when the planned result includes a process whose continuity must be reviewed.

### Trigger / Accepted Input

<trigger/input>

### Preconditions

<preconditions>

### Mandatory Workflow

#### STEP-01 — <name>

**Intended result:** <result>

**Current planned behavior/actions:** <behavior>

**Questions / risks / assumptions:** <when present>

**Ideas / alternatives:** <when present>

**Decisions:** <when present>

**Prototype/test need and evidence:** <when present>

**Contributing Planning Items:** <links>

---

#### STEP-02 — <name>

<Repeat only as needed.>

### Decisions, Branches And Loops

<decision points, loops, optional paths and return paths>

### Review Gates

| Gate | Review object | Required evidence/choice | Resulting status |
|---|---|---|---|
| <gate> | <object> | <evidence/choice> | <status> |

### Failure / Unresolved Paths

| Situation | Visible result / recovery |
|---|---|
| <situation> | <behavior> |

### End Condition

<understandable result or explicit unresolved/deferred state>

A peer workflow must not supply a missing mandatory stage of this workflow.

## 11. Existing Solutions And Alternatives — Optional

| Option | What it covers | Strengths | Limitations | Checked status | Current disposition |
|---|---|---|---|---|---|
| <option> | <coverage> | <strengths> | <limits> | checked / not checked | open / selected / rejected / defer |

Research existing solutions remains optional and proportional. Include no change, simplification or use of an existing tool when they are real alternatives.

## 12. Shared Concepts, Integrations And Constraints — Optional

<Concepts, environment, integration boundaries and constraints shared by the plan.>

Supporting models do not replace workflow continuity.

## 13. Questions, Risks And Assumptions — Optional

### Questions

| ID / item | Question | Priority | Blocking | Status | Answer/source |
|---|---|---:|---:|---|---|
| Q-01 | <question> | high | no | open | <answer> |

### Risks And Assumptions

| ID / item | Meaning | Type | Evidence state | Decision/work affected | Follow-up |
|---|---|---|---|---|---|
| <link> | <meaning> | risk / assumption | reported / inferred / checked | <reference> | <action> |

Keep complete bodies at their Planning Item owners when they exist.

## 14. Concerns And Derived Observability — Optional

### Suggestions / Applied Work

| Target | Concern | Stage/status | Concrete record/work target | Result/next review |
|---|---|---|---|---|
| <target> | <definition> | Pending Review / Open / Deferred / Resolved | <reference> | <result> |

### Derived Observability

| Indicator | Count/status | Drill-down target |
|---|---:|---|
| Open questions | <n> | <references> |
| Risks/assumptions needing evidence | <n> | <references> |
| Prototype/test needs | <n> | <references> |
| Deferred/blocked work | <n> | <references> |

Do not replace concrete records with one opaque quality score.

## 15. Tests, Prototypes And Evidence — Optional

| ID / link | Uncertainty or key situation | Minimum test/research | Success/failure/inconclusive criteria | Decision affected | Status/result |
|---|---|---|---|---|---|
| P-01 | <uncertainty> | <test> | <criteria> | <decision> | proposed |

Observed evidence may update several affected owners. Do not turn a technical result into an accepted solution or architecture automatically.

## 16. Branch Analysis — Optional

Create a separate branch only when an alternative needs independent planning or testing.

### Decision Point

<What decision may require branches.>

### Why Branching Is Justified

<Why alternatives need independent work.>

### Evidence Gap

<Why options cannot yet be selected or rejected.>

### Branch Inventory

| Branch | Summary | Selection criteria | Rejection criteria | Evidence/status |
|---|---|---|---|---|
| <branch> | <summary> | <criteria> | <criteria> | <status> |

### Comparison And Current Preference

<Comparison without hiding uncertainty.>

For a separate Branch Planning Draft, record its parent decision, inherited source/version and stop/reject condition inside that branch. Do not create a special child workflow type solely because the branch has its own Planning Draft.

## 17. Decisions

| ID / item | Decision | Rationale/source | Status | Reconsider when |
|---|---|---|---|---|
| D-01 | <decision> | <rationale> | proposed / accepted / rejected | <condition> |

## 18. Selected Planning Depth

| Layer / representation | Selected? | Current form or owner | Why sufficient / why deeper work is needed | Escalation or reconsideration signal |
|---|---|---|---|---|
| Planning Items | yes | <owners> | <reason> | <signal> |
| Scenario depth | summary / inline / separate / not used | <form> | <reason> | <signal> |
| Full Picture Matrix | yes | this draft | required compact cross-view link structure | <signal to revise granularity> |
| Domain | yes / no | <owner or none> | <reason> | <signal> |
| Slice | yes / no | <owner or none> | <reason> | <signal> |
| Prototype/research detail | embedded / separate / none | <owner> | <reason> | <signal> |

Do not treat an omitted layer as missing work when its meaning is already sufficiently covered.

## 19. Optional Detailed-Planning Route

Use only after the specialized profile is explicitly selected:

```text
planning/documentation/profiles/scenario-domain-slice-docs-profile.md
planning/documentation/application-planning/templates/SCENARIO-DRAFT-TEMPLATE.md
```

Record the selected representation and project-local owners. Do not infer separate DATA, Behavior, Domain or Slice artifacts merely because this draft contains Scenarios.

## 20. Repository / Documentation Handoff — Optional

```text
accepted items and Planning Draft
  → repository semantic reconciliation
  → owner placement
  → File Update Plan
  → replacement files and diff review.
```

| Meaning | Current owner | Resulting owner/action | Dependency impact | Status |
|---|---|---|---|---|
| <meaning> | <owner> | <action> | <impact> | <status> |

This template does not authorize repository edits, archive creation, commit or push.

## 21. Current Conclusion

<What is currently understood, selected or still uncertain.>

## 22. Next Action

<Next concrete planning, research, prototype, reconciliation or review action.>
