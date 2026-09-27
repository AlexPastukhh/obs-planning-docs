# Scenario Journey Supporting Template

Status: active supporting template; canonical semantic contract is SDS `TM-SCENARIO-PLANNING`.

Use this shape only when a human-readable Scenario representation is useful. A Scenario owns one **real-life actor/external/Application journey and its Application Contributions**, including Benefit manifestation/closure points. It can be formed with zero resolved Features. While Feature ownership is `OPEN`, bounded provisional behavior planning stays in the Step-owned Scenario Target Body. After resolution, detailed behavior and semantic data belong to the Feature; the Scenario retains its journey, contributions and Feature/result references. Upstream Benefit, implementation topology and Domain meaning retain their natural owners.

Canonical owner:
`../../idtspe-methodology/active/profiles/sds/target-modules/TM-SCENARIO-PLANNING.md`

Every formed Scenario Target keeps all three Module-defined Units below. Use `RESOLVED`, `OPEN`, or `OMITTED — <concise reason>` at each heading; do not delete a Unit because its substantive work is not material.

## RU-SCEN-01 — Journey Composition

**Methodology:** [TM-SCENARIO-PLANNING](../../idtspe-methodology/active/profiles/sds/target-modules/TM-SCENARIO-PLANNING.md)

Disposition: `RESOLVED | OPEN | OMITTED — <reason>`

Represent proportionally:

```text
Scenario ID / name
Actor / external participants
Context / entry when material
Benefit refs / manifestation-closure (`AB-*`, one or several when material)
Represented real-life path / family boundary when material

Application Contributions
  required Application outcome and Feature Resolution: OPEN | RESOLVED(ref)
  while OPEN: bounded provisional behavior/failure/continuity pressure
  when RESOLVED: Feature/result refs; no copied detailed Feature behavior

Journey
  actor/external action
  → Application Contribution [OPEN or resolved Feature/result]
  → actor/external linking action
  → next Application Contribution when material
  ├─ material branch
  └─ alternate branch
  → convergence / re-entry
  → Benefit manifestation / closure

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

Blank sections are not requirements. One broad RU is intentional because actor/external/Application participation, contributions, branch/re-entry, continuity and Benefit closure jointly define one journey graph. Equivalent recurring instances may share one representative Scenario family only when their path, experience, contribution and resolved Feature participation do not materially differ; retain the coverage rationale/Decision at the natural owner.

## Peer Ownership

```text
Feature  → canonical behavior + principal result semantics once resolved
Scenario → real-life journey + Application Contributions;
           provisional behavior planning only while Feature OPEN
Screen   → spatial/navigation composition + Feature presence
```

A finding in the journey may challenge Feature or Screen meaning through normal Proposal/Finding/revalidation mechanics; the Scenario does not mutate peers directly.

## RU-SCEN-02 — Evolution Impact

**Methodology:** [TM-SCENARIO-PLANNING](../../idtspe-methodology/active/profiles/sds/target-modules/TM-SCENARIO-PLANNING.md)

Disposition: `RESOLVED | OPEN | OMITTED — <reason>`

When material, reference concrete unrealized Evolution Steps that affect this current realized Scenario. In a future Target Scenario Body this Unit remains present but is `OMITTED` because reverse current-owner projection is not applicable there.

## RU-SCEN-03 — Journey Realization Concerns

**Methodology:** [TM-SCENARIO-PLANNING](../../idtspe-methodology/active/profiles/sds/target-modules/TM-SCENARIO-PLANNING.md)

Disposition: `RESOLVED | OPEN | OMITTED — <reason>`

Keep only journey-wide realization/proof/integration pressure whose natural subject is the Scenario; reference owner-local concerns instead of copying them.

## Evolution / Proof

Known future change is routed through Evolution Step/Map; do not create a durable Scenario Change Outlook roadmap. Whole-journey proof questions may invoke Core `LENS-TEST-PROOF-EVIDENCE`; executed evidence remains Evidence, not Scenario authority.

## Representation

A dedicated Scenario file/folder is optional. Use Core Representation/Addressability rules; stable identity does not imply a mandatory artifact tree.
