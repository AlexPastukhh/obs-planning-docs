# Solution And Workflow Planning Use-Case Registry

Status: active reusable-family semantic Use-Case Registry
Doc version: v1.0.0-planning-draft-owner
Scope: complete semantic Use-Case entries for reusable solution/workflow planning.

Parent Direction Registry: [`direction-registry.md`](direction-registry.md)

## 1. Registry Index

| Use-Case ID | Semantic name | Status | Direction | Main owner | Related command |
|---|---|---|---|---|---|
| `UC-AP-REALITY` | Understand Current Workflow And Reality | active | `DIR-PLAN-SOLUTION` | `application-planning-drafting-workflow.md` | none |
| `UC-AP-FORM-ITEMS` | Form Planning Items From Discussion | active | `DIR-PLAN-SOLUTION` | `planning-item-formation-workflow.md` | `сформируй айтемы` |
| `UC-AP-FULL-PICTURE` | Build Or Review An Item-Backed Planning Draft | active; legacy ID retained | `DIR-PLAN-SOLUTION` | `application-planning-drafting-workflow.md` | none |
| `UC-AP-RECONCILE` | Reconcile Planning Items | active | `DIR-PLAN-SOLUTION` | `application-planning-drafting-workflow.md` | `сверь айтемы` |
| `UC-AP-RESEARCH` | Research Existing Solutions And Alternative Workflows | provisional supported | `DIR-PLAN-SOLUTION` | current Planning Draft / checked sources | none |
| `UC-AP-SCENARIO` | Draft Detailed Scenario | active supported / optional profile-limited | `DIR-DETAILED-SDS` | SDS profile/project owner | none |
| `UC-AP-DOMAIN` | Draft Or Review Domain | active supported / optional profile-limited | `DIR-DETAILED-SDS` | SDS profile/project owner | none |
| `UC-AP-SLICE` | Plan Implementation Slice | active supported / optional profile-limited | `DIR-DETAILED-SDS` | SDS profile/project owner | none |
| `UC-AP-SDS-CONSISTENCY` | Review Scenario/Domain/Slice Consistency | active supported / optional profile-limited | `DIR-DETAILED-SDS` | complete selected artifacts | none |

The legacy ID `UC-AP-FULL-PICTURE` remains stable for route compatibility. Its current semantic owner is the Planning Draft; no separate Full Picture artifact is required.

## 2. `UC-AP-REALITY` — Understand Current Workflow And Reality

**Purpose:** reconstruct checked or reported present reality before planning a change when current context matters.

**Trigger/input:** the user describes current work, experience, problems, risks, workarounds, strengths, outcomes or unknowns; or planning requires a checked current-state baseline.

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

**Result:** a portable reviewable Planning Item set with:

```text
complete meanings;
complete supporting user messages;
visibly highlighted relevant spans;
typed Source Contributions;
Current/Incoming/Resulting transformations;
separate relation-backed Implementation Ideas;
unresolved choices;
explicit review state.
```

**Owner route:**

```text
planning-item-formation-workflow.md
templates/PLANNING-ITEM-REVIEW-TEMPLATE.md
planning/planning-input-conventions.md when present
relevant current project-local owners.
```

**Command:**

```text
сформируй айтемы
English name: form items
authority: planning/planning-use-case-map.md
```

The command forms and presents reviewable items. It does not authorize repository edits, archive creation, commit or push.

The reusable use case does not promise an application-native managed-object result.

## 4. `UC-AP-FULL-PICTURE` — Build Or Review An Item-Backed Planning Draft

**Purpose:** organize reviewed Planning Items into a readable current planning direction without creating a second item-body owner.

**Result:** an item-backed Planning Draft that may include:

```text
Planning Item Map;
Key Scenarios;
other Scenario summaries;
Full Picture Matrix;
questions, risks and validation links;
Implementation Idea links;
alternatives and existing-solution findings;
decisions;
selected planning depth;
current conclusion and next action.
```

**Owner route:**

```text
application-planning-drafting-workflow.md
templates/PLANNING-DRAFT-TEMPLATE.md when useful
current project-local Planning Draft owner.
```

**Boundary:**

```text
Full Picture Matrix:
  optional view inside the Planning Draft;

separate Planning Full Picture artifact:
  not required.
```

A simple application or non-application solution may finish planning in this artifact before implementation.

## 5. `UC-AP-RECONCILE` — Reconcile Planning Items

**Purpose:** compare selected incoming or working Planning Items with complete current repository owners and design a coherent canonical item-set transition.

**Result:** read-only owner review containing:

```text
selected review-object/workflow integrity verdicts;
Current/Incoming/Resulting transformations;
resulting item set;
source/provenance effects;
preserved validation context;
unresolved choices.
```

**Command:**

```text
сверь айтемы
English name: reconcile planning items
authority: planning/planning-use-case-map.md
```

No file update, archive, commit or push.

## 6. `UC-AP-RESEARCH` — Research Existing Solutions And Alternative Workflows

Status: **provisional supported use case**

**Purpose:** compare existing products, tools and alternative keep/simplify/remove/integrate/automate/build workflows proportionally.

**Result:** checked/not-checked option inventory, coverage, strengths, limitations, evidence quality, disposition and questions requiring further research.

**Boundary:** no large specialized research methodology is accepted yet. Use the current Planning Draft and checked sources until repeated use reveals a stable owner need.

Research does not imply that a custom application must be built.

## 7. Optional Detailed Scenario / Domain / Slice Use Cases

These use cases apply only after the optional specialized profile is selected.

### `UC-AP-SCENARIO` — Draft Detailed Scenario

**Trigger/input:** a sufficiently stable item-backed Planning Draft and selected contributing Planning Items, after the project explicitly selects the specialized Scenario/Domain/Slice profile.

**Result:** a Scenario catalog plus clean Scenario Reference Objects, separate Scenario DATA Reference Objects and separate Behavior Item Reference Objects, or explicit unresolved/deferred state.

**Core behavior:**

```text
select Planning Draft
  → identify coherent actor/context + goal + observable result
  → create one Scenario Reference Object per coherent scenario
  → attach typed derived-from links to contributing Planning Items
  → create only supported Scenario DATA objects
  → create stable addressable Behavior Items
  → review clean behavior without Domain/Slice implementation detail.
```

**Change contract:** a later Planning Item change marks dependent scenario objects/files review-needed. No automatic rewrite or automatic downstream-to-upstream mutation occurs.

**Owner route:**

```text
application-planning-drafting-workflow.md
templates/SCENARIO-DRAFT-TEMPLATE.md
planning/documentation/profiles/scenario-domain-slice-docs-profile.md
current project-local scenario owners.
```

**Boundary:** this is an optional specialized route. A simple application or non-application solution may keep Scenario meaning in the Planning Draft and omit separate DATA/Behavior artifacts. Absence of this use case does not make a sufficient Planning Draft incomplete.

### `UC-AP-DOMAIN` — Draft Or Review Domain

**Purpose:** define or review conceptual language, rules, lifecycle and boundaries when a separate domain model materially improves implementation planning.

**Boundary:** optional for simple applications and normally unnecessary for non-application solutions unless the solution genuinely has a reusable conceptual domain.

### `UC-AP-SLICE` — Plan Implementation Slice

**Purpose:** plan a separately deliverable and checkable implementation increment after enough behavior and relevant concepts are understood.

**Boundary:** not required for a small one-step implementation, script, process change or non-application solution.

### `UC-AP-SDS-CONSISTENCY` — Review Scenario/Domain/Slice Consistency

**Purpose:** find contradictions across separately created Scenario, Domain and Slice artifacts.

**Boundary:** activate only when those artifact types actually exist.

Owner boundary:

```text
planning/documentation/profiles/scenario-domain-slice-docs-profile.md
planning/documentation/profiles/scenario-domain-slice-use-case-field-kit.md
current project-specific owners.
```

These entries do not create project commands automatically.

## 8. Activation Rules

Adaptive: reuse remembered context only while it is clearly sufficient; reread the selected entry and owner when unknown, forgotten or uncertain.

Full: reread the complete selected entry, parent Direction and complete relevant owner route.

Use-Case activation does not execute related commands automatically.
