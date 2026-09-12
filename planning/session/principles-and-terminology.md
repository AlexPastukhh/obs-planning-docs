# Session Interaction Principles & Terminology

This file defines stable **generic USER↔AI interaction** semantics. Planning/methodology semantics are owned by Documentation + IDTSPE Core and active profiles.

## Ambient Interaction Contract

The **ambient interaction contract** is the small set of Session rules that governs USER↔AI interaction across the current working context once loaded at session bootstrap or context restoration.

It is inherited by commands and methodology work; it is not a semantic owner and is not a mandatory navigation hop. Commands route directly to their current semantic owners while remaining subject to these interaction rules.

## Session

A **Session** is the current bounded interactive context between USER and AI.

A Session is not a planning ontology and does not imply a second `Session State`, `Session Workflow`, or `Session Checkpoint` beside the active methodology.

## Work Step

A **work step** is a temporal/action segment selected by AI inside work the USER already requested.

It answers proportionally:

```text
what meaningful thing is AI doing now?
what useful result should this step establish?
what was established?
what remains unresolved?
what is the next natural step?
```

A work step is not a planning level, Target, State Unit or Checkpoint.

For substantial work, numbered steps are useful. Completing an ordinary step does not create an approval gate; AI continues automatically while the next step remains inside the authorized task and no real gate exists.

## Progress Update

A **progress update** is a transient interaction signal used during a long-running step so the USER can see meaningful partial progress and redirect when useful.

It is not semantic State, Evidence, a Checkpoint, a Proposal, or an approval request.

Do not narrate every tool call/file read. Report meaningful methodology/work progress only.

## USER Steering

The USER may redirect, amend, narrow, broaden, stop, change desired depth, answer several open items together, or select/reject/defer material choices within their authority.

AI re-evaluates affected methodology work rather than forcing an earlier path after the situation changed.

## AI Proposal

An **AI Proposal** is the lightweight conversational surface used to make an intended AI change/action explicit before execution when proposal-first visibility is useful or required.

An AI Proposal is not automatically a formal IDTSPE Proposal State Unit and is never accepted merely because AI proposed it.

When material candidate meaning needs addressability/lifecycle/review, IDTSPE Core may represent/promote that meaning as a formal `Proposal` State Unit.

## Real Gate

A **real gate** is a condition that requires USER input/approval before AI may continue the affected branch.

Typical real gates include:

- a material USER-owned semantic choice that cannot be resolved from existing authority;
- required authorization before repository/file/application/methodology mutation;
- a newly discovered branch outside the USER-authorized task scope;
- an explicit USER-requested stop/review/approval boundary.

These are **not** gates by themselves:

- starting the next ordinary work step;
- moving between planning depths;
- creating a Target or State Unit when the current Use Case/component contract makes it appropriate;
- performing a situational Integration Checkpoint when it is already inside authorized planning work;
- scanning a registry or applying an already-authorized methodology component.

## Authorization Boundary

The USER's instruction authorizes the ordinary analysis/planning work needed to satisfy that instruction, including natural internal work-step progression.

Actual mutation must stay inside the authorized mutation scope. A methodology recommendation never grants mutation permission by itself.

## Relationship To IDTSPE

IDTSPE is the always-active planning/resolution shell in this methodology environment, but it is proportional:

```text
IDTSPE active
≠ Target required
≠ State Unit required
≠ Lens required
≠ Target Module required
≠ Checkpoint required
≠ persistence required
```

The active IDTSPE Use Cases and component applicability/materiality contracts decide what structure is useful now.
