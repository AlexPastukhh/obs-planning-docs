# Study Tab Launcher — Evolution Steps Map

Status: canonical current navigation for unrealized transitions and compact
realized lineage. The map owns Step registry, position, dependency and
readiness; each Step owns its own target-state meaning.

## RU-EVOMAP-01 — Step Registry

**Methodology:** [RU-EVOMAP-01 Unit Definition](../../../../../target-modules/TM-EVOLUTION-STEPS-MAP.md#ru-evomap-01--registry--routing).

### Unrealized Steps

| Step | Planning Position | Change Surface / Role | Principal Target Owners / Target Resolution | Enters From | Step-wide Implementation Concerns | Planning Completeness | Realization Start Readiness |
|---|---|---|---|---|---|---|---|
| [EVO-STL-CLOSE-SUPERSEDED-PROJECT-WINDOWS](evolution/unrealized/close-superseded-project-windows.md) | `SELECTED — ACTIVE / nearest` | Expansion: optional exact post-open retirement of declared predecessor project windows. | Complete Target bodies: `F-STL-APPLY-PROJECT-SUCCESSION`, `D-STL-PROJECT-SUCCESSION-MANIFEST`, `SL-STL-APPLY-PROJECT-SUCCESSION`; replace four project-opening Scenarios; revalidate current prepared-handoff Shared owner. | [`EVO-STL-FOCUS-COORDINATOR-OWNER`](evolution/realized/focus-coordinator-owner-before-confirmation.md) | [`P-STL-HANDOFF-01`](shared/prepared-project-handoff.md#p-stl-handoff-01); authenticated instance/root binding; replacement continuity; dirty-window authority; bounded truthful aggregation. | `COMPLETE` for selected first increment | `READY`; separate implementation authority is required for execution, and the current Problem blocks proof/materialization, not start |

There are no additional concrete unrealized Steps in the current registry.
The `unrealized/` directory is a lifecycle grouping, not evidence that every
contained Step is selected; Planning Position remains explicit in this map and
inside each Step.

### Realized lineage

| Step | Entering From | Materialized current owners | Remaining live evidence boundary |
|---|---|---|---|
| [EVO-STL-FOCUS-COORDINATOR-OWNER](evolution/realized/focus-coordinator-owner-before-confirmation.md) | `EVO-STL-ACTIVATE-VSCODE-BEFORE-PROJECT-LAUNCH` | project/trusted-copy Features and Scenarios | installed multi-window modal/focus observation; canonical handoff Problem remains open |
| [EVO-STL-ACTIVATE-VSCODE-BEFORE-PROJECT-LAUNCH](evolution/realized/activate-vscode-before-project-launch.md) | `EVO-STL-REUSE-EXISTING-TRUSTED-PROJECT` | project/trusted-copy Features and Scenarios | Windows/browser foreground behavior remains host-owned |
| [EVO-STL-REUSE-EXISTING-TRUSTED-PROJECT](evolution/realized/reuse-existing-trusted-project.md) | `EVO-STL-DEFER-VSCODE-HANDOFF` | trusted-copy Feature and Scenario | installed existing-child observation |
| [EVO-STL-DEFER-VSCODE-HANDOFF](evolution/realized/defer-vscode-handoff.md) | `EVO-STL-PROJECT-ARRIVAL-POLLING` | project/trusted-copy Features and Scenarios | installed browser-to-extension observation |
| [EVO-STL-PROJECT-ARRIVAL-POLLING](evolution/realized/project-arrival-polling.md) | `EVO-STL-TRUSTED-PROJECT-COPY` | project/trusted-copy Features and Scenarios | installed delayed-arrival observation |
| [EVO-STL-TRUSTED-PROJECT-COPY](evolution/realized/trusted-project-copy.md) | none | trusted-copy Feature and Scenario | Workspace Trust remains user/VS Code-owned live evidence |

Realized Steps retain only transition identity, predecessor relation,
materialized-owner navigation and still-relevant evidence boundaries. Current
Feature/Scenario/Domain/Slice/Shared meaning belongs to those current owners,
not to historical Step bodies.

## RU-EVOMAP-03 — Application Intent / Benefit Driver Coverage

**Methodology:** [RU-EVOMAP-03 Unit Definition](../../../../../target-modules/TM-EVOLUTION-STEPS-MAP.md#ru-evomap-03--application-intent--benefit-driver-coverage).

| Accepted Application driver | Current realized coverage | Concrete planned transition / remaining gap |
|---|---|---|
| [AB-STL-01](application-definition.md#ab-stl-01--open-selected-file-context) | Current file-context Feature/Scenario owners | No additional concrete Step established |
| [AB-STL-02](application-definition.md#ab-stl-02--open-a-local-project-source) | Current project/folder/archive Feature/Scenario owners | [EVO-STL-CLOSE-SUPERSEDED-PROJECT-WINDOWS](evolution/unrealized/close-superseded-project-windows.md) retains replacement opening as the primary result |
| [AB-STL-03](application-definition.md#ab-stl-03--publish-under-a-chosen-parent) | Current trusted-child publication Feature/Scenario owners | No invented later Step; host-owned Workspace Trust remains an evidence boundary |
| [AB-STL-04](application-definition.md#ab-stl-04--retire-superseded-project-windows) | No current close behavior | The selected unrealized Step owns optional exact predecessor-window retirement; implementation/proof/materialization remain pending |

Later horizon: `UNESTABLISHED`; this does not force a vague Step row. Benefit coverage here is a Map projection, not a copy of target Scenario/Feature bodies or a claim of realized AB-STL-04 behavior.

## RU-EVOMAP-02 — Relations / Readiness / Planning Horizon

**Methodology:** [RU-EVOMAP-02 Unit Definition](../../../../../target-modules/TM-EVOLUTION-STEPS-MAP.md#ru-evomap-02--semantic-relations--concerns--planning-completeness--start-readiness).

```text
TRUSTED-PROJECT-COPY
→ PROJECT-ARRIVAL-POLLING
→ DEFER-VSCODE-HANDOFF
→ REUSE-EXISTING-TRUSTED-PROJECT
→ ACTIVATE-VSCODE-BEFORE-PROJECT-LAUNCH
→ FOCUS-COORDINATOR-OWNER
→ CLOSE-SUPERSEDED-PROJECT-WINDOWS (SELECTED — ACTIVE, unrealized)
```

The active Step is downstream of the current focus coordinator because it must
first establish the replacement project result and then coordinate optional
bounded work with other participating instances.

Planning-depth policy selected for this repository:

- the nearest selected Step is a pre-implementation plan and therefore carries
  complete Target bodies for every owner it will create or replace;
- any later concrete Step is impact-first: it records material evolution
  impacts on every affected current or prior target owner deeply enough to
  support planning of the nearer Step, without inventing premature full bodies;
- every current owner includes a reverse `RU-*-Evolution Impact` reference for
  each concrete unrealized Step that materially affects it, or an explicit
  `OMITTED` disposition when the reviewed Step does not change that owner;
- realization moves the Step to `evolution/realized/`, materializes current
  owner truth and compacts obsolete future bodies out of lineage.

The active Step is planning-complete and realization-ready for its first
increment. Implementation, closure of the canonical handoff Problem,
deterministic proof, installed multi-window evidence and target-owner
materialization remain pending.
