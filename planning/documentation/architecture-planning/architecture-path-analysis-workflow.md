# Architecture Path Analysis Workflow

Status: active reusable workflow
Scope: trace/evaluate one material Workspace Understanding Path, Workspace Change Path or Runtime Realization Path.

Canonical semantics: [`workspace-use-cases-and-change-pressure.md`](workspace-use-cases-and-change-pressure.md)
Recommended shape: [`templates/ARCHITECTURE-PATH-ANALYSIS-TEMPLATE.md`](templates/ARCHITECTURE-PATH-ANALYSIS-TEMPLATE.md)

## 1. Select Path Source

Start from one concrete result:

```text
Workspace UC
Workspace Change Case
Extension-derived future UC
Application Scenario (Runtime path)
```

State the desired result/end state before tracing steps.

## 2. Trace The Real Current / Expected Path

Record only material steps/boundaries. For Workspace paths identify what must be found, understood, changed, verified, migrated or operated. For Runtime paths identify state/rules/calls/coordination required by the Scenario.

## 3. Inspect Architecture-Relevant Boundaries

Look proportionally at:

```text
semantic owners / canonical authorities touched
state owners
boundaries crossed
synchronized edits
external dependencies / remote calls
DB reads/writes / transaction boundaries when runtime-relevant
failure / retry / security boundaries
migrations
verification surface
operational consequences
branches / algorithm / data-volume concerns
```

## 4. Inspect Understanding Cost

For Workspace Understanding/Change work ask:

```text
Can the relevant owner be discovered directly?
Are names/terms stable and meaningful?
What unrelated implementation detail must be understood?
What must be remembered simultaneously to avoid mistakes?
Are important constraints explicit or hidden in conventions/locations?
```

High incidental Working-Context Load is an Architecture Flag even when the raw file/line change is small.

## 5. Evaluate Qualitatively

Use only meaningful dimensions; do not fabricate scores:

```text
Locality
Coupling
Change Surface
Discoverability
Comprehension Cost
Working-Context Load
Verification Cost
Migration Risk
Operational Risk
Reversibility
```

## 6. Findings / Handoff

A path may produce:

```text
no material architecture concern
Architecture Flag
Change-Pressure evidence
Maintainability Risk candidate
input to one Architecture Decision
input to Architecture State/Evolution review
```

Path evidence does not automatically authorize refactoring or abstraction.
