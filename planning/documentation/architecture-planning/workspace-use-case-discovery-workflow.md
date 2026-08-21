# Workspace Use-Case Discovery Workflow

Main owner for `UC-PLAN-ARCH-WORKSPACE-USES`.

Status: active reusable Use-Case owner workflow
Scope: resolve current canonical Workspace UCs and discover architecture-relevant candidate useful results needed by Architecture Planning without becoming canonical UC establishment/change authority or inventing a mandatory exhaustive UC catalogue.

Generic UC identity/contract: [`../direction-and-use-case-registry-workflow.md`](../direction-and-use-case-registry-workflow.md)
Architecture-input semantics: [`workspace-use-cases-and-change-pressure.md`](workspace-use-cases-and-change-pressure.md)
Canonical Workspace UC establishment/change/topology planning: [`../workspace-planning/direction-registry.md`](../workspace-planning/direction-registry.md)

## 1. Purpose

Architecture cannot be evaluated only by components/patterns. First resolve relevant current canonical UCs and identify what additional useful-result candidates people/agents may need from the Workspace for architecture reasoning.

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

## 3. Resolve Current UCs And Discover Candidate Useful Results

Read applicable current Use-Case Registries/owners first. Then ask what additional users/agents may need to do with the Workspace, including:

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

## 4. Separate Canonical UCs, Candidates And Change Cases

```text
current canonical Workspace UC
→ consume as architecture input

independently useful result not yet canonical
→ keep as Workspace-UC candidate for architecture reasoning
→ hand to Workspace Planning when canonical establishment/change is required

rare/one-off architecture-relevant change
→ may remain a Workspace Change Case
```

Do not promote a discovered candidate into canonical UC identity merely because Architecture Planning needs to reason about it. Frequency/relevance are analysis characteristics, not UC identity authority.

## 5. Expand Extensions Into Expected Work

For each Planned/Likely Extension, ask proportionally:

```text
What candidate future useful results / Workspace UCs appear?
Which current canonical Workspace UCs may change?
What Application Scenarios / Requirements appear when applicable?
```

Do not manufacture detail beyond available evidence.

## 6. Select Material Architecture Inputs

Keep the current canonical UCs, changes and explicit candidates that materially affect current Architecture State, path analysis, Change Pressure or a pending Architecture Decision. An exhaustive canonical registry is not produced by this Architecture capability.

## 7. Exit Result

Useful result:

```text
Important Current Canonical Workspace UCs
Architecture-relevant candidate useful results / future Workspace-UC candidates
Relevant frequency/current relevance where useful
Related Extensions / constraints
Workspace Change Cases kept separate
Canonical establish/change/topology handoff when needed
```

A separate file/artifact is optional; the result may be inline input to another Architecture Planning owner. When architecture analysis identifies a candidate or changed UC that must become canonical planning meaning, route that question to current Workspace Planning rather than editing UC identity from this workflow.
