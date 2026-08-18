# Solution And Workflow Planning Use-Case Registry

Status: active reusable-family semantic Use-Case Registry
Doc version: v1.0.0-planning-draft-owner
Scope: complete semantic Use-Case entries for reusable solution/workflow planning.

Parent Direction Registry: [`direction-registry.md`](direction-registry.md)

## 1. Registry Index

| Use-Case ID | Semantic name | Status | Direction | Main owner | Related command |
|---|---|---|---|---|---|
| `UC-AP-REALITY` | Understand Current Workflow And Reality | active | `DIR-PLAN-SOLUTION` | `application-planning-drafting-workflow.md` | none |
| `UC-AP-COLLECT-IDEAS` | Collect And Review Ideas From Selected Source | active | `DIR-PLAN-SOLUTION` | generic Idea owners | `собери идеи` |
| `UC-AP-FULL-PICTURE` | Build Or Review A Planning Draft | active; legacy ID retained | `DIR-PLAN-SOLUTION` | `application-planning-drafting-workflow.md` | none |
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

## 3. `UC-AP-COLLECT-IDEAS` — Collect And Review Ideas From Selected Source

**Purpose:** extract coherent Ideas from the selected source, preserve material non-Idea context and perform the shared Standard Idea Review without inventing criticism/refinements.

**Result:** reviewed Ideas / Idea Groups with Current Conclusions, mandatory aggregate `Questions / Risks / Problems`, Related Idea ID traceability and material `Potential Simplifications / Better Routes` when found.

**Owner route:**

```text
../idea-planning-principles-and-terminology.md
../idea-review-and-planning-workflow.md
../IDEA-REVIEW-TEMPLATE.md
```

**Command:**

```text
собери идеи
English name: collect ideas
```

The command is read-only toward repository files. Facts, constraints, decisions and Existing Reality are not forced into Idea entities.

## 4. `UC-AP-FULL-PICTURE` — Build Or Review A Planning Draft

**Purpose:** organize current Problem/Need, candidate solution/workflow alternatives, selected conclusions, risks and application/Scenario meaning into one readable current direction without creating a parallel semantic ledger.

**Result:** a Planning Draft that proportionally contains current meaning, candidate/selected solution or Workflow Variants, Scenario/flow coverage where applicable, whole-plan integration view, questions/risks/evidence, decisions and next action.

**Owner route:**

```text
application-planning-drafting-workflow.md
templates/PLANNING-DRAFT-TEMPLATE.md when useful
current project-local Planning Draft owner.
```

**Boundary:** an in-progress Draft may exist before Scenario boundaries are stable. Historical ITEM-* IDs may remain provenance only; no Planning Item layer is required.

## 5. Historical Planning Item Reconciliation Boundary

`UC-AP-RECONCILE` and the `сверь айтемы` command are retired from the target methodology. Current incoming meaning is integrated through scoped Idea/current-owner review in `application-planning-drafting-workflow.md`. Historical ITEM-* records remain provenance/migration sources only.

## 6. `UC-AP-RESEARCH` — Research Existing Solutions And Alternative Workflows

Status: **provisional supported use case**

**Purpose:** compare existing products, tools and alternative keep/simplify/remove/integrate/automate/build workflows proportionally.

**Result:** checked/not-checked option inventory, coverage, strengths, limitations, evidence quality, disposition and questions requiring further research.

**Boundary:** no large specialized research methodology is accepted yet. Use the current Planning Draft and checked sources until repeated use reveals a stable owner need.

Research does not imply that a custom application must be built.

## 7. Optional Detailed Scenario / Domain / Slice Use Cases

These use cases apply only after the optional specialized profile is selected.

### `UC-AP-SCENARIO` — Draft Detailed Scenario

**Trigger/input:** sufficiently stable application planning after the project explicitly selects the specialized Scenario/Domain/Slice profile; an optional Spine Scenario may be used first when Scenario boundaries are unclear.

**Result:** a Scenario catalog plus clean Scenario Reference Objects, separate Scenario DATA Reference Objects and separate Behavior Item Reference Objects, or explicit unresolved/deferred state.

**Core behavior:**

```text
select current application planning
  → identify coherent motivated actor/context + Need/Goal + meaningful observable result
  → optionally use a temporary Spine Scenario to discover boundaries
  → create one Scenario Reference Object per coherent scenario
  → attach source/Idea/current-owner links when useful
  → create only supported Scenario DATA objects
  → create stable addressable Behavior Items
  → review clean behavior without Domain/Slice implementation detail.
```

**Change contract:** a later related source/Idea/current-owner change creates an explicit review need for dependent Scenario/DATA/Behavior objects. No automatic rewrite or automatic downstream-to-upstream mutation occurs.

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
