# Scenario Journey Supporting Template

Status: active supporting template; canonical semantic contract is SDS `TM-SCENARIO-PLANNING`.

Use this shape only when a human-readable Scenario representation is useful. A Scenario owns **actor-to-Benefit journey composition across selected Feature results**. It does not own Feature behavior, Feature semantic data, implementation topology or Domain semantics.

Canonical owner:
`../../idtspe-methodology/active/profiles/sds/target-modules/TM-SCENARIO-PLANNING.md`

## RU-SCEN-01 — Journey Composition

Represent proportionally:

```text
Scenario ID / name
Actor / external participants
Context / entry when material
Terminal Benefit

Participating Feature results
  FEAT-* / BR-* references as useful

Journey
  Feature result
  → actor/external linking action
  → next Feature result
  ├─ material branch
  └─ alternate branch
  → convergence / re-entry
  → terminal Benefit

Continuity
  <what result/context must survive between steps>

Screen / external-system participation
  <only when journey-significant>

Journey must-holds
  <only constraints naturally owned by the whole journey;
   do not copy Feature BR-*>

E2E Proof Intent
  <optional; only when whole-journey proof has independent value>
```

Blank sections are not requirements. One broad RU is intentional because actor participation, Feature links, branch/re-entry, continuity and Benefit closure jointly define one journey graph.

## Peer Ownership

```text
Feature  → behavior + principal result semantics
Scenario → journey composition across Feature results
Screen   → spatial/navigation composition + Feature presence
```

A finding in the journey may challenge Feature or Screen meaning through normal Proposal/Finding/revalidation mechanics; the Scenario does not mutate peers directly.

## Evolution / Proof

Known future change is routed through Evolution Step/Map; do not create a durable Scenario Change Outlook roadmap. Whole-journey proof questions may invoke Core `LENS-TEST-PROOF-EVIDENCE`; executed evidence remains Evidence, not Scenario authority.

## Representation

A dedicated Scenario file/folder is optional. Use Core Representation/Addressability rules; stable identity does not imply a mandatory artifact tree.
