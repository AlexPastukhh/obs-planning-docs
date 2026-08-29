# IDTSPE Response Example — Questions, Decisions, Output And Artifact Placement

Status: active explanatory example

## Situation

The current Target is one Scenario Planning:

```text
SCN-CAPTURE
```

Accepted upstream Sources already establish that the Application should let a user preserve useful research material without disrupting current reading.

The current planning task is to finish Scenario behavior/semantic DATA.

## 1. Current Target / Scope / Sources

```text
Invocation mode:
  REFINE

Current artifact context:
  existing scenarios/SCN-CAPTURE.md
  expected canonical owner from AP-SCN-01/AP-SCN-02

Target:
  SCN-CAPTURE

Module:
  TM-SCENARIO-PLANNING

Inside:
  capture behavior
  semantic information required by capture
  truthful success/failure

Outside:
  Screen placement
  Domain implementation
  repository/API design

Sources:
  Application Definition
  Refined Core Real-Life Scenario
  Prototype Evidence
```

## 2. Resolved Questions / Answers

```text
RQ:
  What is observable success?

Answer:
  selected material is durably available for later review
  and success is reported truthfully.

RQ:
  Which semantic DATA is needed?

Answer:
  Selected Material
  Source Context
  optional Short Thought
  Capture Result
```

## 3. Unresolved Material Questions / Decisions

```text
Question:
  Is Short Thought part of the initial current Scenario
  or deferred to a later extension?

Decision needed:
  Answer Decision
```

The assistant should not hide this unresolved choice by filling the output template as if it had been accepted.

## 4. Lens Finding + Core State / Idea / Q/R/P

Built-in Scenario Evaluation finding candidate:

```text
failed persistence must never produce success feedback
```

Core Finding Disposition determines whether this refines an existing Question/Risk/Decision input or requires another owner; the Lens does not route/reopen by itself.

UI/Spatial Idea:

```text
maybe show capture in a floating mini-window
```

The mini-window is an Idea, not selected Screen truth.

## 5. Target Step Result Preview

```text
Scenario:
  SCN-CAPTURE

Need:
  preserve useful material now

Observable Result:
  material is durably available later

DATA:
  Selected Material
  Source Context
  Short Thought — pending Decision
  Capture Result

Behavior:
  accept capture
  preserve required context
  report durable success
  report failure
  never report false success
```

## 6. Artifact Placement View

| Content | Placement status | Semantic owner | Persistence | Representation / destination | Action | Guidance source(s) | Why / unresolved |
|---|---|---|---|---|---|---|---|
| Scenario contract + DATA + Behavior | RESOLVED | `SCN-CAPTURE` | REQUIRED | `EMBED_CURRENT_OWNER` → `<SCN-CAPTURE canonical artifact>` | UPDATE | `AP-SCN-01`, `AP-SCN-02` | DATA/Behavior are internal Scenario objects |
| Floating mini-window Idea | RESOLVED | none selected | PREFERRED | `REGISTER_ENTRY` → `SDS-PLANNING-STATE/ideas/scenario/IDEAS.md` | UPDATE | `AP-SCN-03` | preserve Idea without creating Screen authority |
| Short Thought current-vs-later status | UNRESOLVED_PLACEMENT | `SCN-CAPTURE` if selected; otherwise future planning state | REQUIRED | Destination UNRESOLVED until Answer Decision | UNRESOLVED | `AP-SCN-01`; final meaning/placement depends on current Answer Decision | placement depends on current-vs-deferred Decision |
| Prototype raw timing scratch | UNRESOLVED_PERSISTENCE | Prototype Evidence context | UNRESOLVED | UNRESOLVED | NONE | `AG-L3-01`; no applicable persistence proposal yet | persist only if it materially supports the Decision |

This table is present even though the current turn does **not** mutate files. `Guidance source(s)` makes the placement provenance explicit; `P-14 / TF-10` remains the resolver.

## 7. Methodology Direction View

```text
Current node / Target:
  TM-SCENARIO-PLANNING / SCN-CAPTURE

Invocation mode:
  REFINE

Exit Gate:
  BLOCKED until Short Thought current-vs-later Answer Decision resolves

Recommended next:
  REFINE current SCN-CAPTURE Target first

Why:
  the same Scenario owner still has one material unresolved semantic choice

Conditional next after Exit Gate:
  TM-SCREEN if spatial ownership is material
  TM-WEUC EARLY_INTERPRETATION if enough future direction exists
  TM-DOMAIN-DISCOVERY when Domain readiness is satisfied

Backward-reopen trigger:
  later Prototype/implementation Evidence contradicts current capture semantics
```

The next-step recommendation does not execute those Targets automatically.

## 8. Handoff / Downstream Sources

Once the Short Thought Decision resolves:

```text
accepted Scenario
→ Source for Screen
→ Source for Domain Discovery
→ Source for Slice planning
→ Source for Test Design
```

## 9. Residual Q/R/P / Revalidation

```text
Q:
  whether source context later needs richer structured provenance

Route:
  future Scenario/Domain evolution;
  do not design it now unless current Sources make it material
```

## Lesson

A useful IDTSPE response shows four different states simultaneously:

```text
semantic content already accepted
material Decisions still unresolved
artifact placement already known or still unresolved
methodology continuation / whether to repeat the current Target
```

It does not force all three to become “complete” at the same time.
