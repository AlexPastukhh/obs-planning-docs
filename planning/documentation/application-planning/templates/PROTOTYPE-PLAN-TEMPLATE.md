# Prototype Plan Template

Status: active reusable recommended template
Purpose: plan the minimum prototype/experiment needed to reduce a material uncertainty, with explicit support for interaction/workflow Prototype Scenarios and Prototype Screens.

Canonical workflow: [`../prototype-planning-workflow.md`](../prototype-planning-workflow.md)
Cross-cutting context: [`../requirements-and-change-context.md`](../requirements-and-change-context.md)

Blank sections are not requirements. A small feasibility spike may remain embedded in Application Concept/Idea work; use a separate file when evidence/setup/lifecycle deserves independent addressability.

## Prototype Identity

| Field | Value |
|---|---|
| Prototype ID | <stable ID when useful> |
| Title | <title> |
| Prototype mode | interaction/workflow / technical feasibility spike / integration / value / other |
| Status | proposed / ready / running / completed / cancelled |
| Related Application Concept / decision | <link> |
| Related Application responsibility / Use Cases | <when applicable> |
| Related Ideas / Requirements | <when applicable> |

## Question / Hypothesis

### Question Being Tested
<What material uncertainty should this prototype reduce?>

### Hypothesis
<Current proposition being tested.>

### Why Test This Now
<Why evidence can change a current planning decision.>

## Scope

### Included
<Minimum useful prototype scope.>

### Excluded
<What is intentionally simulated/omitted.>

### What Is Real
<Actual behavior/data/integration/user involvement.>

### What Is Simulated
<Mocks/stubs/manual stand-ins/fake data.>

## Spine Pass / Walkthrough — Interaction/Workflow Prototype

Use only as a discovery method when helpful:

```text
concrete actor situation
→ meaningful Need
→ plausible surfaces / information / actions
→ application responses
→ meaningful result
```

Record the walkthrough; do not call it a Scenario owner.

## Prototype Scenarios — When Applicable

### PSCN-<ID> — <provisional scenario>

**Provisional Need / motivation:** <why>

**Starting situation:** <context>

**Approximate interaction:** <rough user-visible behavior>

**Approximate meaningful result:** <result>

**Candidate Screens:** <PSCR links>

**Candidate Requirements:** <REQ candidates/links>

**Candidate DATA / Behavior:** <provisional items>

**Questions / evidence need:** <what must be learned>

Prototype Scenario identity is provisional and may split/merge/disappear before canonical Scenario discovery.

## Prototype Screens — When Applicable

### PSCR-<ID> — <provisional screen>

**Purpose / Prototype Scenarios supported:** <links>

**Approximate zones / hierarchy:** <layout hypothesis>

**Information / control placement:** <what should be immediately/secondarily visible and where major controls approximately live>

**Material visual/layout states:** <states>

**Candidate spatial Requirements:** <REQ candidates/links>

**Visual reference:** <wireframe/mockup when useful>

Prototype Screen identity is provisional and does not create canonical Screen authority.

## Candidate Requirements / DATA / Behavior / Change Context

### Candidate Requirements
| ID | Statement | Source / evidence sought | Expected stability | Status |
|---|---|---|---|---|
| <REQ-X> | <must-hold candidate> | <source/test> | stable / likely-variable / unknown | candidate |

### Candidate Scenario DATA / Behavior
<What information/rules appear necessary; do not promote implementation schemas mechanically.>

### Future Scenario Ideas / Change Axes — When Material
<Only evidence-backed likely evolution or clearly marked speculative Ideas. A Change Axis does not mandate generalization.>

### Implementation-Scoped Ideas — When Material
<Link ordinary generic Ideas about possible implementation routes. They are not architecture truth.>

## Execution / Evidence

### Required Inputs
<inputs>

### Execution Steps
1. <step>

### Evidence To Collect
| Evidence | Collection method | Why it matters |
|---|---|---|
| <evidence> | <method> | <decision impact> |

### Interpretation Criteria

**Supported:** <what evidence supports current hypothesis>

**Rejected:** <what evidence rejects it>

**Inconclusive:** <what remains unknown>

### Timebox
<when useful>

## Expected Planning Impact

| Possible result | Affected owner | Expected update/review |
|---|---|---|
| supported / rejected / inconclusive | <Concept / UC / Scenario candidate / Screen candidate / Requirement / other> | <impact> |

Prototype evidence updates only owners that actually depend on the tested uncertainty.

## Code / Artifact Fate

```text
throwaway / evolutionary / non-code / not applicable
```

## Current Decisions
<Selected prototype-plan choices when material.>

## Questions / Risks / Problems
<Use Current Plan + Finding + Relation / Impact. If none: `No material unresolved issues identified.`>

## Potential Simplifications / Better Routes — When Material
<Only unselected changes to this prototype plan.>

This template does not authorize implementation, repository edits, archive creation, commit or push.
