# Planning Draft Template

Status: active reusable recommended template
Doc version: v0.2.0-item-backed-full-picture
Purpose: one candidate item-backed end-to-end plan/Full Picture for achieving a result. It may serve as a root draft or a competing branch draft.

Use only sections that improve the current work. This is not a mandatory schema.

## 1. Draft Identity

| Field | Value |
|---|---|
| Draft ID | <ID> |
| Title | <title> |
| Draft type | root / child Complete Picture / branch / other |
| Status | exploratory / active / accepted-current / selected / rejected / deferred |
| Parent Full Picture / draft | <reference or none> |
| Semantic home | <reference or none/unresolved> |
| Definition location | <path/location> |
| Source reality | <references> |
| Current documentation state | Working / Needs Documentation / Documented/Integrated / unresolved |

## 2. Planning Item Basis

### Contributing Planning Items

| Item | Complete meaning owner | Role in this picture | Source/evidence link | Documentation state |
|---|---|---|---|---|
| <item reference> | <canonical item owner> | <role> | <source/provenance> | <state> |

Rules:

- link to canonical item bodies;
- do not copy item bodies into a second independently edited owner;
- significant statements without an item must identify source, inference or question status;
- preserve item-to-picture traceability.

### Child Full Pictures — Optional

| Child picture | Independent trigger/result | Semantic home | Parent summary/relationship | Status |
|---|---|---|---|---|
| <reference> | <why independently traversable> | <home> | <summary> | <status> |

The child owns complete local meaning. The parent owns coordination and a readable route.

## 3. What Needs To Be Achieved

<Current candidate desired result.>

**Status:** candidate / confirmed / needs evidence / rejected / superseded

## 4. Acceptance Criteria

| ID | Criterion | Status | Evidence/source | Related item/workflow/test |
|---|---|---|---|---|
| AC-01 | <criterion> | candidate | <reference> | <reference> |

Do not invent criteria merely to fill the table.

## 5. Boundaries And Non-Goals

### Included

<scope>

### Excluded / Non-Goals

<scope deliberately not promised>

## 6. Current Reality — Optional

<Reference or summarize checked current reality without introducing accepted future design.>

## 7. Candidate End-To-End Complete Picture

### Trigger / Accepted Input

<trigger/input>

### Preconditions

<preconditions>

### Mandatory Workflow

#### STEP-01 — <name>

**Intended result:** <result>

**Current plan/behavior:** <actions or behavior>

**Questions:** <when present>

**Problems:** <when present>

**Risks/assumptions:** <when present>

**Ideas/alternatives:** <when present>

**Decisions:** <when present>

**Prototype/test need:** <when present>

**Evidence:** <when present>

**Reconsider when:** <optional invalidation condition>

**Contributing items:** <references>

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

A peer Complete Picture must not supply a missing mandatory stage.

## 8. Existing Solutions And Alternative Workflows — Optional

| Option | What it covers | Strengths | Limitations | Checked status | Current disposition |
|---|---|---|---|---|---|
| <option> | <coverage> | <strengths> | <limits> | checked / not checked | open / selected / rejected / defer |

Research Existing Solutions remains optional and proportional.

## 9. Valuable Behaviors / Functional Workflows — Optional

| ID | Behavior/outcome | Why valuable | Independent trigger/result? | Related criteria/items | Status |
|---|---|---|---|---|---|
| FW-01 | <behavior> | <value> | yes/no | <references> | candidate |

Create a separate Functional Workflow Draft only when independently useful/testable. It is not automatically a Complete Picture.

## 10. Shared Concepts, Integrations And Constraints — Optional

<Concepts, environment, integration boundaries and constraints shared by the plan.>

Supporting models do not replace workflow continuity.

## 11. Concern Coverage And Observability — Optional

### Suggestions / Applied Concerns

| Target | Concern | Stage/status | Concrete record/work target | Result/next review |
|---|---|---|---|---|
| <target> | <definition> | Pending Review / Open / Deferred / Resolved | <reference> | <result> |

### Derived Observability

| Indicator | Count/status | Drill-down target |
|---|---:|---|
| Unreviewed suggestions | <n> | <references> |
| Open questions | <n> | <references> |
| Risks/assumptions needing evidence | <n> | <references> |
| Prototype/test needs | <n> | <references> |
| Deferred/blocked work | <n> | <references> |

Do not replace concrete records with one opaque quality score.

## 12. Tests And Prototypes — Optional

| ID | Uncertainty/key situation | Minimum test | Success/failure/inconclusive criteria | Decision affected | Status |
|---|---|---|---|---|---|
| P-01 | <uncertainty> | <test> | <criteria> | <decision> | proposed |

## 13. Branch Analysis — Parent Only

### Decision Point

<What decision may require branches.>

### Why Branching Is Justified

<Why alternatives need independent work.>

### Evidence Gap

<Why options cannot yet be selected/rejected.>

### Branch Inventory

| Branch | Summary | Selection criteria | Rejection criteria | Evidence/status |
|---|---|---|---|---|
| <branch> | <summary> | <criteria> | <criteria> | <status> |

### Comparison And Current Preference

<comparison without hiding uncertainty>

## 14. Branch Metadata — Branch Only

| Field | Value |
|---|---|
| Divergence point | <parent decision/step> |
| Inherited source/version | <reference> |
| Why this branch exists | <reason> |
| Upstream-change status | aligned / proposes parent change / snapshot |
| Stop/reject condition | <condition> |

## 15. Questions

| ID | Question | Priority | Blocking | Status | Answer/source |
|---|---|---:|---:|---|---|
| Q-01 | <question> | high | no | open | <answer> |

## 16. Decisions

| ID | Decision | Rationale/source | Status | Reconsider when |
|---|---|---|---|---|
| D-01 | <decision> | <rationale> | proposed / accepted / rejected | <condition> |

## 17. Repository / Documentation Handoff — Optional

```text
accepted items/picture
  → repository semantic reconciliation
  → owner placement
  → File Update Plan
  → replacement files/diff review.
```

| Meaning | Current owner | Resulting owner/action | Dependency impact | Status |
|---|---|---|---|---|
| <meaning> | <owner> | <action> | <impact> | <status> |

This template does not authorize repository edits, commit or push.

## 18. Current Conclusion

<What is currently understood, selected or still uncertain.>

## 19. Next Action

<Next concrete planning, research, prototype, reconciliation or review action.>
