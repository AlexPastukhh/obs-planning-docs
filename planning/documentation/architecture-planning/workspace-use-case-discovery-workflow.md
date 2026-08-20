# Workspace Use-Case Discovery Workflow

Main owner for `UC-PLAN-ARCH-WORKSPACE-USES`.

Status: active reusable Use-Case owner workflow
Scope: discover the material current/future Workspace Use Cases needed by Architecture Planning without inventing a mandatory exhaustive UC catalogue.

Canonical semantics: [`workspace-use-cases-and-change-pressure.md`](workspace-use-cases-and-change-pressure.md)

## 1. Purpose

Architecture cannot be evaluated only by components/patterns. First establish what people/agents actually need to obtain from the Workspace.

This workflow primarily supports `UC-PLAN-ARCH-PRESSURE`, and may be reused by State/Path/Decision work.

## 2. Establish Workspace Context

Read proportionally:

```text
Workspace purpose / lifetime / expected breadth
current users / developers / agents
Current Workspace Reality
known Requirements / Constraints
planned/likely Extensions
```

## 3. Discover Independently Useful Results

Ask what users/agents need to do with the Workspace, including:

```text
change/write
read/understand
find/navigate
inspect/review
trace impact
operate/diagnose
verify/check
```

Do not assume useful work mutates the Workspace.

## 4. Separate Stable UCs From Concrete Significant Changes

A stable useful capability belongs in the Workspace UC set. A rare/one-off but architecture-relevant change may remain an Workspace Change Case rather than being forced into UC identity.

Frequency/relevance are analysis characteristics, not the UC definition.

## 5. Expand Extensions Into Expected Work

For each Planned/Likely Extension, ask proportionally:

```text
What future Workspace UCs appear?
Which existing Workspace UCs change?
What Application Scenarios / Requirements appear when applicable?
```

Do not manufacture detail beyond available evidence.

## 6. Select Material Architecture Inputs

Keep the UCs/changes/future UCs that materially affect current Architecture State, path analysis, Change Pressure or a pending Architecture Decision. An exhaustive registry is not required.

## 7. Exit Result

Useful result:

```text
Important Current Workspace UCs
Important Future Workspace UC candidates
Relevant frequency/current relevance where useful
Related Extensions / constraints
Workspace Change Cases kept separate
```

A separate file/artifact is optional; the result may be inline input to another Architecture Planning owner.
