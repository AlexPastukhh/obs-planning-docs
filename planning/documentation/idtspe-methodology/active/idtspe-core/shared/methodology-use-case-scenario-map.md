# Methodology Use-Case Scenario Map

Status: active **design / evaluation / orientation** artifact; non-authoritative at runtime

Purpose: provide realistic scenarios of **working with the methodology itself**, decompose them into current Use Cases, and test whether the Use-Case topology is complete, non-duplicative and efficient.

Do not confuse these methodology-use scenarios with the SDS `Scenario` semantic/Target family.

## 1. Role

```text
realistic methodology-use scenario
→ decompose into existing Use Cases
→ inspect registry/process/component transitions
→ detect missing / overlapping / awkward responsibilities
→ improve Use Cases / registry guides / component contracts
→ rerun scenario as coverage/effectiveness test
```

A scenario is useful for:

1. **Use-Case discovery/design** — identify recurring methodology-use situations with independently useful Results.
2. **Integration testing** — verify that existing Use Cases compose without gaps/duplication.
3. **AI orientation** — show the overall shape of likely work so the system understands common transitions/re-entry without treating the scenario as a script.

A scenario is **not** runtime routing authority. If a scenario conflicts with a current Use Case/component contract, the current normative owner wins.

## 2. Evaluation Questions

For each scenario ask:

```text
Can the scenario be completed using only current Use Cases + reachable components?
Is any Use Case doing specialized planning work that belongs to TM/Lens/profile owners?
Is the same methodology action duplicated by several UCs?
Does a UC have an independently useful Result?
Can Broad Discussion remain lightweight when deeper structure is not useful?
Are registry scans targeted/lazy rather than exhaustive?
Are State/Result Units instantiated only when material?
Are re-entry/revalidation paths explicit enough without scenario-owned orchestration?
```

A rule needed only because the scenario itself says so is a warning: it may reveal a missing Use Case, missing registry guide, missing component applicability contract, or wrongly placed ownership.

## 3. Scenario Map

| ID | Methodology-use situation | Expected Use-Case decomposition | Main effectiveness check |
|---|---|---|---|
| `UCSM-01` | New work / clean context | `UC-DOC-USE-REPOSITORY-GUIDANCE` + `UC-IDTSPE-COMPOSE-CURRENT-WORK` | can work start from natural language without ceremony |
| `UCSM-02` | Resume existing planning after context/chat change | guidance UC + compose + maintain/revalidate as applicable | can current authority/state be restored without full reread |
| `UCSM-03` | Broad Discussion is enough | compose only | can always-on IDTSPE explicitly choose **no deeper structure** |
| `UCSM-04` | A bounded result/owner becomes useful | compose → Target Formation → TM registry if helpful | is Target creation usefulness-driven rather than automatic |
| `UCSM-05` | Need a reusable production method | compose → TM registry scan → selected TM | does UC route without duplicating TM production logic |
| `UCSM-06` | Need an evaluation perspective | compose → Lens registry scan → selected Lens | does UC choose perspective while Lens owns analysis/findings |
| `UCSM-07` | Need reusable engineering/theory guidance | compose → methodology/profile directory → guidance registry → detail entry | can only relevant theory be loaded rather than a mega-checklist |
| `UCSM-08` | Current meaning is distributed | `UC-IDTSPE-INTEGRATE-CURRENT-WORK` + `UC-IDTSPE-MAINTAIN-CURRENT-WORK-STATE` | is Checkpoint situational and sparse |
| `UCSM-09` | Finding/Evidence/upstream change makes work stale | revalidate (+ consistency process) | is revalidation narrow and dependency-aware |
| `UCSM-10` | Work moves toward Exact/materialization | compose → relevant readiness/TM/Lens/representation owners | is deeper work entered without a fixed phase gate |
| `UCSM-11` | Active profile contributes specialized components | compose → profile directory → profile registries | can generic IDTSPE UCs cover SDS without SDS-specific runtime UCs |
| `UCSM-12` | Change the methodology itself | Documentation maintenance UC + IDTSPE maintenance UC where component type is IDTSPE-specific | are methodology-maintenance vs planning semantics separated |

## 4. Detailed Scenario — Lightweight First, Deepen Later

### Situation

The USER begins with an ambiguous planning concern. After discussion, an implementation boundary becomes concrete and exposes failure/cancellation risk.

### Use-Case decomposition

```text
Use-Case Registry Map
→ UC-DOC-USE-REPOSITORY-GUIDANCE
→ UC-IDTSPE-COMPOSE-CURRENT-WORK

initial composition:
  Broad Discussion only
  no Target yet
  no Lens yet

later:
  bounded implementation result becomes useful
→ Target Formation
→ active SDS Target Module Registry
→ Slice Discovery TM selected

new cancellation/resource concern appears
→ SDS methodology registry directory
→ Programming Principles Registry
→ RG-PRG-RESOURCE-MANAGEMENT
 + RG-PRG-TIMEOUT-CANCELLATION-BOUNDS
→ relevant natural evaluators/Target production apply guidance

meaning becomes distributed
→ UC-IDTSPE-INTEGRATE-CURRENT-WORK
```

### What the Use Cases must **not** contain

They must not restate Slice boundary questions, cancellation semantics, resource-management theory or Lens finding criteria. They only determine **when to consult and use those owners**.

## 5. Detailed Scenario — Revalidation Without Restart

### Situation

An accepted upstream Decision changes after new Evidence. Several downstream planning results exist.

### Use-Case decomposition

```text
new Evidence
→ UC-IDTSPE-REVALIDATE-CURRENT-WORK
→ identify earliest affected owner
→ consistency review only for plausible cross-owner drift
→ rescan Use Cases/registries only where applicability changed
→ affected State/Result Units reopened/revised
→ unaffected Decisions preserved
→ optional Integration Checkpoint when whole-state view becomes useful
```

### Effectiveness criterion

If the method requires rereading all registries, all Lenses or rebuilding all Targets, revalidation is too coarse.

## 6. Detailed Scenario — Methodology Maintenance

### Situation

Repeated usage shows that Target Module registry selection is ambiguous.

```text
UC-DOC-REVIEW-DOCUMENTATION
→ finding: routing summaries insufficient
→ UC-DOC-PLAN-DOCUMENTATION-CHANGE
→ if TM contract itself changes: UC-IDTSPE-MAINTAIN-TARGET-MODULE
→ update registry scan guide / summaries
→ rerun UCSM-04/UCSM-05 as tests
```

The scenario tests the Use Cases; it does not become the maintenance workflow owner.

## 7. SDS-Specific Use-Case Test

Current conclusion: no separate SDS methodology-use Use Case is justified.

The following are **not** documentation-methodology Use Cases:

```text
Plan Feature
Compose Scenario
Plan Screen
Discover Domain
Discover/plan Slice
Plan Shared Capability
Plan Evolution
Prototype
Practical Test
```

They are profile Target/Lens capabilities reached from generic IDTSPE Use Cases.

Create an SDS-specific Use Case only if a future scenario exposes a distinct independently useful Result about **how SDS methodology documentation is used**, not merely a new SDS planning result.

## 8. Maintenance Rule

When Use Cases/components change materially, rerun affected scenarios and update this map if it no longer represents realistic methodology use. The map may evolve as an explanatory/test corpus without becoming runtime authority.
