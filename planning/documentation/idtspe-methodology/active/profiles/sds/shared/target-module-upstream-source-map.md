# Target Module Upstream Source Map

Status: active navigation projection  
Authority: detailed Source contracts live in each `TM-*.md`; reusable Lens Sources/Evidence are defined under `../lenses/`.

| Target Module | Primary direct upstream Sources | Important inherited / conditional Sources |
|---|---|---|
| `TM-APPLICATION-DEFINITION` | Fundamental Need; selected Step-02 real-world route/result + own-software contribution; surrounding responsibilities; viable existing/manual/buy/adapt/integrate routes | market/reference Evidence; Prototype/current implementation Evidence; material constraints |
| `TM-PROTOTYPE` | material uncertainty/affected Decision; Refined Core Real-Life Scenario when present else Step-02 result; Application Definition or candidate Scenario/interaction hypothesis | existing market/usability/technical Evidence; experiment constraints |
| `TM-SCENARIO-DISCOVERY` | Refined Core Real-Life Scenario when present else Step-02 result; Application Definition/responsibility; selected Step-02 route/result Sources | Need/solution lineage; Prototype Evidence; local/shared must-hold conditions |
| `TM-SCENARIO-DRAFT` | selected Scenario boundary; Application Definition; local/shared must-hold conditions; current shared Scenario DATA/Behavior internal contracts; Screens when selected | Need/solution lineage; Prototype Evidence; residual QRP |
| `TM-REQUIREMENT` | exceptional shared condition spanning several owners, after natural-owner check | external/user/regulatory/contractual/operational Evidence/constraints |
| `TM-SCREEN` | Scenarios; Behavior Items; Scenario DATA whose spatial presentation matters; spatial/accessibility local/shared must-hold conditions | Application Definition; Prototype/UX Evidence; platform constraints |
| `TM-DOMAIN-DISCOVERY` | Scenarios; Scenario DATA; Behavior Items; local/shared must-hold conditions/invariants | Need/solution/Application lineage; Prototype/current implementation Evidence; dispositioned change-path State / accepted evolution constraints |
| `TM-DOMAIN-DRAFT` | Domain Discovery candidates; Scenarios; Scenario DATA; Behavior Items; local/shared must-hold conditions/invariants | Need/solution/Application lineage; current Domain/implementation Evidence; `SDS-WORKSPACE-EVOLUTION.md` / change-path constraints when material |
| `TM-WEUC` | `SDS-EVOLUTION-MAP.md`; Application Definition / Scenario direction; current accepted architecture/workspace owners when available | observed past changes; local `<owner>.evolution.md`; current Domain/Slice/Frontend/Cross-Cutting owners; migration/compatibility constraints |
| `TM-SLICE-STRATEGY` | Scenarios; Scenario DATA; Behavior; local/shared must-hold conditions; Screens; Domain meaning | Need/solution/Application lineage; current implementation; `SDS-WORKSPACE-EVOLUTION.md` + dispositioned WEUC-derived State / accepted architecture Decisions; delivery/dependency constraints |
| `TM-IMPLEMENTATION-SLICE` | selected Useful Vertical Result Definition; one Primary Scenario; DATA/Behavior/must-hold conditions; Domain meaning; Screens for UI/full-stack | Slice Strategy; current implementation; `SDS-WORKSPACE-EVOLUTION.md` + dispositioned L4/L5/L6-derived State / accepted architecture Decisions; Cross-Cutting/delivery constraints |
| `TM-FRONTEND-SLICE` | parent Useful Vertical Result; one Primary Scenario; Screens; Scenario DATA/Behavior; frontend-relevant must-hold conditions | current client code/evidence; `SDS-WORKSPACE-EVOLUTION.md` + dispositioned L4/L5/L6-derived State / accepted architecture Decisions; design/accessibility/Cross-Cutting constraints |
| `TM-CROSS-CUTTING-CONCERN` | repeated/shared Requirement/responsibility across consumers; affected Slice/implementation owners | current implementation/runtime Evidence; dispositioned architecture/WEUC-derived State / accepted Decisions; quality constraints |
| `TM-TEST-STRATEGY` | Scenario Acceptance; Behavior; local/shared must-hold conditions; Domain verification meaning; Slice Useful Vertical Results | current test Evidence; correctness/environment constraints |
| `TM-TEST-DESIGN` | Scenario Acceptance; Behavior Items; Scenario DATA; must-hold conditions; Domain Verification Meaning; Slice Useful Vertical Result Definition / implemented boundary | current failures/tests Evidence; Test Strategy; Practical Evidence constraints |
| `TM-PRACTICAL-TEST` | Evidence Question; implemented Scenario/result/Behavior/DATA/must-hold/Slice subject | Prototype continuity; environment/operator state; Test Strategy |
| `TM-TEST-COVERAGE` | current Scenario/DATA/Behavior/must-hold/Domain/Slice/Test owners | actual executed tests/checks/practical Evidence; freshness/runtime Evidence |

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

This is planning-state lineage, not a replacement for semantic Need→Scenario→Domain→Slice lineage.
