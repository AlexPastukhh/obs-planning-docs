# Target Module Upstream Source Map

Status: active navigation projection  
Authority: detailed Source contracts live in each `TM-*.md`; reusable Lens Sources/Evidence are defined under `../lenses/`.

| Target Module | Primary direct upstream Sources | Important inherited / conditional Sources |
|---|---|---|
| `TM-APPLICATION-DEFINITION` | Fundamental Need; selected Step-02 real-world route/result + own-software contribution; surrounding responsibilities; viable existing/manual/buy/adapt/integrate routes | market/reference Evidence; Prototype/current implementation Evidence; material constraints |
| `TM-PROTOTYPE` | material uncertainty/question + affected owner/Decision; relevant Application/Scenario/Screen/Slice/etc meaning | prior research/current-state Evidence; experiment/participant/environment/data constraints |
| `TM-SCENARIO-PLANNING` | Application Definition/responsibility; relevant Need/real-life route; known current/planned behavior; existing Scenario when refining; accepted shared constraints when any | Prototype/practical/user/current-system Evidence; Generic Q/R/P/Evidence/Decisions; downstream findings that challenge Scenario behavior |
| `TM-REQUIREMENT` | exceptional shared condition spanning several owners, after natural-owner check | external/user/regulatory/contractual/operational Evidence/constraints |
| `TM-SCREEN` | Scenarios; Behavior Items; Scenario DATA whose spatial presentation matters; spatial/accessibility local/shared must-hold conditions | Application Definition; Prototype/UX Evidence; platform constraints |
| `TM-DOMAIN-DISCOVERY` | Scenarios; Scenario DATA; Behavior Items; local/shared must-hold conditions/invariants | Need/solution/Application lineage; Prototype/current implementation Evidence; dispositioned change-path State / accepted evolution constraints |
| `TM-DOMAIN-DRAFT` | Domain Discovery candidates; Scenarios; Scenario DATA; Behavior Items; local/shared must-hold conditions/invariants | Need/solution/Application lineage; current Domain/implementation Evidence; `SDS-WORKSPACE-EVOLUTION.md` / change-path constraints when material |
| `TM-WEUC` | `SDS-EVOLUTION-MAP.md`; Application Definition / Scenario direction; current accepted architecture/workspace owners when available | observed past changes; local `<owner>.evolution.md`; current Domain/Slice/Frontend/Cross-Cutting owners; migration/compatibility constraints |
| `TM-SLICE-STRATEGY` | Scenario Behavior/Requirements; Behavior Items; Scenario DATA; Scenario Development/Change Outlook; must-hold conditions; relevant Screen/Cross-Cutting meaning; existing Domain meaning when present | Need/solution/Application lineage; current code/implementation as current technical/domain realization truth; Prototype/implemented practical Evidence; dependency/integration facts; accepted deeper Domain/evolution/architecture Decisions when material |
| `TM-IMPLEMENTATION-SLICE` | selected Slice semantic identity/addressability + Useful Vertical Result; one Primary Scenario; DATA/Behavior/must-hold conditions; Domain meaning; Screens for UI/full-stack | Target Formation resolution selecting/reusing the bounded Slice Target; Slice Strategy; current implementation; `SDS-WORKSPACE-EVOLUTION.md` + dispositioned L4/L5/L6-derived State / accepted architecture Decisions; Cross-Cutting/delivery constraints |
| `TM-FRONTEND-SLICE` | parent Useful Vertical Result; one Primary Scenario; Screens; Scenario DATA/Behavior; frontend-relevant must-hold conditions | current client code/evidence; `SDS-WORKSPACE-EVOLUTION.md` + dispositioned L4/L5/L6-derived State / accepted architecture Decisions; design/accessibility/Cross-Cutting constraints |
| `TM-CROSS-CUTTING-CONCERN` | repeated/shared Requirement/responsibility across consumers; affected Slice/implementation owners | current implementation/runtime Evidence; dispositioned architecture/WEUC-derived State / accepted Decisions; quality constraints |
| `TM-TEST-STRATEGY` | selected properties/owners whose shared proof coordination is independently material; Slice portfolio when relevant | current test infrastructure/Evidence; shared environment/data/isolation/cost constraints |
| `TM-TEST-DESIGN` | exact selected semantic property whose proof method is independently non-trivial | current failures/tests Evidence; selected Test Strategy; environment/harness/Practical-Evidence constraints |
| `TM-PRACTICAL-TEST` | intended implemented subject/boundary + acceptance/learning question; actual version/build becomes required when Evidence is collected; relevant Scenario/Behavior/DATA/Requirement/Test Design when applicable | Prototype continuity; real users/operators/data/environment; telemetry/analytics/logs/support/performance Evidence when relevant |

## Core SDS Lineage

```text
Need / Desired Outcome
↓
selected real-world solution scope/result
↓
Application Definition
↓
Scenario
  ↔ internal Scenario DATA
  ↔ internal Behavior Items
  ↔ local/shared must-hold conditions / Screens
↓
Domain — optional
↓
Slice
↓
Test / Evidence
```

Cross-cutting planning lineage:

```text
SDS-EVOLUTION-MAP
→ TM-WEUC
→ SDS-WORKSPACE-EVOLUTION
→ WEUC Lens inside Domain/Slice/Frontend/etc.
→ local evolution/architecture Finding Candidate(s)
→ Core Finding Disposition resolves accepted local State/Decision/owner consequence
→ optional map/global-architecture Finding Candidate + likely TM-WEUC owner hint when project-global meaning is suspected
→ Core Finding Disposition resolves actual global owner/handoff
```

For Slice implementation planning, `TM-SLICE-STRATEGY / RU-SSTRAT-02` is the planning-level Domain/Aggregate realization view: it may begin from broad identity/invariant/consistency clues and is refined toward the Domain elements actually used by selected Slices. Current code remains authoritative for current technical/domain realization; the map keeps only planning-relevant boundaries and relations.

This is planning-state lineage, not a replacement for semantic Need→Scenario→Domain→Slice lineage.
