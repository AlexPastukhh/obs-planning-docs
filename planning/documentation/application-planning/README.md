# Application Planning Documentation Index

Status: provisional reusable documentation-family index
Scope: pre-detailed application planning from opportunity research through Product Legend, core value scenarios, solution overview and prototype learning.

## 1. Purpose

This folder defines a reusable planning process for deciding whether an application should be created, what makes it worth testing, which scenarios express its core value, which implementation directions are plausible and what should be learned through prototypes before detailed planning.

The intended progression is:

```text
opportunity and ecosystem research
  → Product Legend
  → core value scenarios
  → solution overview
  → prototype plan
  → prototype result
  → updated Legend/scenarios/overview
  → detailed scenario/domain/slice planning
```

The process is iterative. A prototype result may send planning back to any earlier artifact.

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
  OPPORTUNITY-AND-ECOSYSTEM-RESEARCH-DRAFT-TEMPLATE.md
  PRODUCT-LEGEND-DRAFT-TEMPLATE.md
  SOLUTION-OVERVIEW-DRAFT-TEMPLATE.md
  PROTOTYPE-PLAN-TEMPLATE.md
  PROTOTYPE-RESULT-TEMPLATE.md

drafts/
  opportunity-and-ecosystem-research.md
  product-legend.md
  solution-overview.md
  prototype-plan.md
  prototype-result.md
```

The files under `drafts/` are deliberately empty starter skeletons. They do not contain accepted requirements for a concrete product.

## 4. Responsibility Boundary

```text
principles
  own stable reusable rules;

workflow
  owns the repeated user + AI drafting process;

templates
  own the provisional exact shape of each artifact;

drafts
  are empty working instances and do not own reusable rules;

scenario templates and scenario drafts
  remain separate and are used after Product Legend produces candidate value scenarios.
```

Concrete product state should normally live in a project area or another explicit project-local location. The starter drafts here exist only to make the workflow immediately usable and reviewable.

## 5. Current Deliberate Exclusions

This first documentation batch does not define:

```text
- artifact version-control rules;
- activity logging;
- source/dependency governance between planning files;
- JSON contracts;
- command routes;
- automatic research or source verification;
- a mandatory architecture such as standalone, extension or shared core;
- detailed scenario/domain/slice planning.
```

Those topics may be designed separately after the basic planning artifacts and workflow are exercised.

## 6. Example Coverage

Example coverage is `deferred`.

Reason:

```text
The templates are intentionally provisional,
and the user requested empty draft skeletons rather than a filled example.
Add a working example after the first complete real planning cycle stabilizes the shapes.
```

## 7. Do Not

```text
- Do not treat AI suggestions as confirmed user requirements.
- Do not force a build decision before alternatives and uncertainty are visible.
- Do not turn Product Legend into a feature list or architecture document.
- Do not perform detailed planning before the core value and major risks are understood well enough.
- Do not create local responsibility maps inside templates/ or drafts/ unless their internal ownership becomes genuinely ambiguous.
```
