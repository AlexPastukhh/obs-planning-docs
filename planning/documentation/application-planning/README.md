# Application Planning Documentation Index

Status: provisional reusable documentation-family index
Scope: pre-detailed application planning from current-workflow and user-experience capture through ecosystem research, Product Legend, core value scenarios, solution overview and prototype learning.

## 1. Purpose

This folder defines a reusable planning process for understanding the current workflow before deciding whether an application should be created, what makes it worth testing, which scenarios express its core value, which implementation directions are plausible and what should be learned through prototypes before detailed planning.

The intended progression is:

```text
current workflow and user-experience capture
  → opportunity and ecosystem research
  → Product Legend
  → core value scenarios
  → solution overview
  → prototype plan
  → prototype result
  → updated research/Legend/scenarios/overview
  → detailed scenario/domain/slice planning
```

The process is iterative. Later evidence may revise later-stage artifacts and may correct the current-state record only when it reveals that the recorded current workflow was incomplete or inaccurate.

## 2. Read Order

```text
1. application-planning-responsibility-map.md
2. application-planning-principles.md
3. application-planning-drafting-workflow.md
4. the relevant template under templates/
5. the corresponding draft skeleton under drafts/ or a project-local copy
```

## 3. Files

```text
README.md
application-planning-responsibility-map.md
application-planning-principles.md
application-planning-drafting-workflow.md

templates/
  CURRENT-WORKFLOW-AND-PROBLEM-ANALYSIS-DRAFT-TEMPLATE.md
  OPPORTUNITY-AND-ECOSYSTEM-RESEARCH-DRAFT-TEMPLATE.md
  PRODUCT-LEGEND-DRAFT-TEMPLATE.md
  SOLUTION-OVERVIEW-DRAFT-TEMPLATE.md
  PROTOTYPE-PLAN-TEMPLATE.md
  PROTOTYPE-RESULT-TEMPLATE.md

drafts/
  current-workflow-and-problem-analysis.md
  opportunity-and-ecosystem-research.md
  product-legend.md
  solution-overview.md
  prototype-plan.md
  prototype-result.md
```

The files under `drafts/` are working instances. They may be empty starters or filled drafts, but they never own reusable rules.

## 4. Responsibility Boundary

```text
principles
  own stable reusable rules;

workflow
  owns the repeated user + AI drafting process;

templates
  own the provisional exact shape of each artifact;

drafts
  are working instances and do not own reusable rules;

current workflow analysis
  owns the present activity, workflow steps, user experience,
  current strengths, problem situations, workarounds, existing user ideas
  and unresolved current-state information;

opportunity research
  owns formulated improvement targets, external alternatives and ways
  to keep, simplify, remove, integrate, automate or build after the
  current workflow is understood;

scenario templates and scenario drafts
  remain separate and are used after Product Legend produces candidate value scenarios.
```

A filled draft under `drafts/` owns only its entered working content. Stable reusable rules remain in principles, workflow and templates.

## 5. Current Deliberate Exclusions

This documentation family does not yet define:

```text
- artifact version-control rules;
- activity logging;
- source/dependency governance between planning files;
- JSON contracts;
- command routes;
- automatic research or source verification;
- a mandatory architecture such as standalone, extension or shared core;
- a fixed universal problem taxonomy;
- detailed scenario/domain/slice planning.
```

Those topics may be designed separately after the basic planning artifacts and workflow are exercised.

## 6. Example Coverage

Reusable example coverage is `deferred`.

The filled current-workflow draft is active working material, not a reusable example or a source of stable methodology rules.

## 7. Do Not

```text
- Do not treat AI suggestions as confirmed user requirements.
- Do not require the user to know the problem, desired improvement or solution before the current workflow is captured.
- Do not formulate improvement targets or future workflow changes inside the current-workflow capture stage.
- Do not treat descriptive problem groupings as a final problem taxonomy.
- Do not force a build decision before alternatives and uncertainty are visible.
- Do not turn Product Legend into a feature list or architecture document.
- Do not perform detailed planning before the core value and major risks are understood well enough.
- Do not create local responsibility maps inside templates/ or drafts/ unless their internal ownership becomes genuinely ambiguous.
```
