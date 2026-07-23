# Solution And Workflow Planning Use-Case Registry

Status: active reusable-family semantic Use-Case Registry
Doc version: v0.2.0-form-items-command
Scope: complete semantic Use-Case entries for reusable solution/workflow planning.

Parent Direction Registry: [`direction-registry.md`](direction-registry.md)

## 1. Registry Index

| Use-Case ID | Semantic name | Status | Direction | Main owner | Related command |
|---|---|---|---|---|---|
| `UC-AP-REALITY` | Understand Current Workflow And Reality | active | `DIR-PLAN-SOLUTION` | `application-planning-drafting-workflow.md` | none |
| `UC-AP-FORM-ITEMS` | Form Planning Items From Discussion | active | `DIR-PLAN-SOLUTION` | `planning-item-formation-workflow.md` | `сформируй айтемы` |
| `UC-AP-FULL-PICTURE` | Build Or Review An Item-Backed Full Picture | active | `DIR-PLAN-SOLUTION` | `application-planning-drafting-workflow.md` | none |
| `UC-AP-RECONCILE` | Reconcile Planning Items | active | `DIR-PLAN-SOLUTION` | `application-planning-drafting-workflow.md` | `сверь айтемы` |
| `UC-AP-RESEARCH` | Research Existing Solutions And Alternative Workflows | provisional supported | `DIR-PLAN-SOLUTION` | current Planning Draft / checked sources | none |
| `UC-AP-SCENARIO` | Draft Detailed Scenario | active supported / profile-limited | `DIR-DETAILED-SDS` | SDS profile/project owner | none |
| `UC-AP-DOMAIN` | Draft Or Review Domain | active supported / profile-limited | `DIR-DETAILED-SDS` | SDS profile/project owner | none |
| `UC-AP-SLICE` | Plan Implementation Slice | active supported / profile-limited | `DIR-DETAILED-SDS` | SDS profile/project owner | none |
| `UC-AP-SDS-CONSISTENCY` | Review Scenario/Domain/Slice Consistency | active supported / profile-limited | `DIR-DETAILED-SDS` | complete selected artifacts | none |

## 2. `UC-AP-REALITY` — Understand Current Workflow And Reality

**Purpose:** reconstruct checked/reported present reality before planning a change when current context matters.

**Trigger/input:** user describes current work, experience, problems, risks, workarounds, strengths, outcomes or unknowns; or planning requires a checked current-state baseline.

**Result:** descriptive Current Reality Capture or equivalent checked understanding with actors, triggers, inputs, sequence, explanations, strengths, problems, risks, workarounds, outcomes and unresolved contradictions.

**Boundary:** does not accept a future solution, architecture or build decision.

**Owner route:**

```text
application-planning-drafting-workflow.md
templates/CURRENT-WORKFLOW-AND-PROBLEM-ANALYSIS-DRAFT-TEMPLATE.md when useful
current project-local reality/planning owner.
```

## 3. `UC-AP-FORM-ITEMS` — Form Planning Items From Discussion

**Purpose:** transform selected source into complete, reviewable Planning Item meanings while preserving full source context and transformation choices.

**Result:** reviewed proposed/accepted item set in portable or application-native mode, with complete meanings, full supporting user messages, typed Source Contributions and Current/Incoming/Resulting transformations.

**Owner route:**

```text
planning-item-formation-workflow.md
templates/PLANNING-ITEM-REVIEW-TEMPLATE.md
planning/planning-input-conventions.md
relevant current project-local item owners.
```

**Command:**

```text
сформируй айтемы
English name: form items
authority: planning/planning-use-case-map.md
```

The command forms and presents reviewable items. It does not authorize repository edits, archive creation, commit or push.

## 4. `UC-AP-FULL-PICTURE` — Build Or Review An Item-Backed Full Picture

**Purpose:** synthesize reviewed Planning Items into a readable current planning picture without creating a second item-body owner.

**Result:** item-backed Planning Draft / Full Picture with traceable statements, valid child Complete Pictures, concern coverage, decisions, alternatives/evidence and next action.

**Owner route:**

```text
application-planning-drafting-workflow.md
templates/PLANNING-DRAFT-TEMPLATE.md
current project-local Full Picture/Complete Picture owners.
```

## 5. `UC-AP-RECONCILE` — Reconcile Planning Items

**Purpose:** compare selected incoming/working Planning Items with complete repository owners and design a coherent canonical item-set transition.

**Result:** read-only before/after owner review, Complete Picture integrity verdicts, Current/Incoming/Resulting transformations, resulting item set and unresolved choices.

**Command:**

```text
сверь айтемы
English name: reconcile planning items
authority: planning/planning-use-case-map.md
```

No file update, archive, commit or push.

## 6. `UC-AP-RESEARCH` — Research Existing Solutions And Alternative Workflows

Status: **provisional supported use case**

**Purpose:** compare existing products/tools and alternative keep/simplify/remove/integrate/automate/build workflows proportionally.

**Result:** checked/not-checked option inventory, coverage, strengths, limitations, evidence quality, disposition and questions requiring further research.

**Boundary:** no large specialized research methodology is accepted yet. Use current Planning Draft structure and checked sources until repeated use reveals stable owner needs.

## 7. Detailed Scenario/Domain/Slice Use Cases

- `UC-AP-SCENARIO` — Detailed target behavior/use case with acceptance criteria.
- `UC-AP-DOMAIN` — Aligned conceptual model, language and boundaries.
- `UC-AP-SLICE` — Separately deliverable/checkable increment aligned with scenario/domain meaning.
- `UC-AP-SDS-CONSISTENCY` — Explicit cross-artifact consistency findings and required corrections.

Owner boundary:

```text
planning/documentation/profiles/scenario-domain-slice-docs-profile.md
planning/documentation/profiles/scenario-domain-slice-use-case-field-kit.md
current project-specific scenario/domain/slice owners.
```

These entries do not claim prototype-depth adaptation or project command routes.

## 8. Activation Rules

Adaptive: use remembered context when clearly sufficient; reread this entry and owner when unknown, forgotten or uncertain.

Full: always reread the complete selected entry, parent Direction and complete relevant owner route.

Use-case activation does not execute related commands automatically.
