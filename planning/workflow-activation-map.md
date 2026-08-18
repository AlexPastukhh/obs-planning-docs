# OBS Workflow Activation Map

Status: active project-specific root planning/task router
Doc version: v0.14.0-replacement-package-route
Scope: decide which semantic registry, reusable workflow and project-local owner to read before answering or editing in OBS planning work.

## 1. Default Rule

```text
command:
  planning/planning-use-case-map.md → owner route;

orientation / Direction:
  planning/README.md → planning/direction-registry.md → selected Direction Registry;

semantic Use Case:
  selected Use-Case Registry → complete owner route;

other non-command task:
  this activation map → relevant area/reusable owner.
```

Registry activation does not grant repository permissions.

## 2. Activation Table

| User asks / task type | Read first | Then read | Notes |
|---|---|---|---|
| Orientation / directions | `planning/README.md` | `planning/direction-registry.md`, relevant local Direction Registry | Explain architecture/capabilities; do not execute commands. |
| Activate/select Direction | `planning/direction-registry.md` | Complete local Direction entry, child Use-Case Registry and owner route | Use Adaptive/Full semantics. |
| Activate/select Use Case | Relevant `use-case-registry.md` | Complete selected workflow/template/area and required current sources | Establish context/result/next actor; no command permission. |
| Command behavior | `planning/planning-use-case-map.md` | Owner named in route | UCM owns trigger, English name, output and permissions. |
| Idea collection / `собери идеи` | Root UCM | Generic Idea principles/workflow/template, selected source and current owners when integration review needs them | `collect ideas`; reviewable output only, no repository edit. |
| Idea review / deeper planning | Generic Idea owners | Relevant parent/current owner and evidence only when material | Standard Review or Deep Idea Planning; no separate reconciliation command. |
| Planning Draft | Application-planning Use-Case Registry | Drafting workflow, Planning Draft template and current local owners | May begin before stable Scenario coverage; sufficiency is claimed only when the selected planning stage has adequate coverage. No Planning Item layer is required. |
| Planning Meaning To Repository workflow | Documentation Workbench Use-Case Registry | Local Planning Draft, accepted workflow, register and downstream workflow | Reusable method and registries synchronized. |
| Repository documentation/reference review workflow | Documentation Workbench Use-Case Registry | Local Planning Draft, current workflow and affected current owners/uses | Stable links and explicit relation meanings remain distinct. |
| Current reality | Application-planning Use-Case Registry | Drafting workflow, current-reality template and current owner | Descriptive; no future architecture acceptance. |
| Detailed Scenario/Domain/Slice | Application-planning registries | SDS profile/field kit and project owners | Profile-limited; prototype-depth adaptation deferred. |
| Maintain registries | Root Direction Registry | Registry workflow/templates, affected registries and navigation owners | UCM changes only for executable commands. |
| Plan command | Root UCM | Documentation preflight, command workflow, UCM owner/template and related registry entry | Plan-only; helper decision separate. |
| Replacement package / archive command | Root UCM | Selected concrete command definition and its ownerFiles | Package/application/review lifecycle is route-specific; `давай архив` is producer-only ZIP + OBS-ACTION, while legacy routes may explicitly retain apply/diff. |
| Replacement Package App implementation/use | `planning/documentation/tools/replacement-package-app/README.md` | Use-Case Map/Registry, PACKAGE-PROTOCOL, focused architecture/state/source/tests | Local consumer owns apply/history/ReviewDiff/Finalize; command protocol does not expand into runtime internals. |
| Tampermonkey helper | `planning/README.md` for Orientation; registries for Directions/Use Cases; UCM for Commands | Projection workflow, tools README and userscript | Projection only; Adaptive/Full changes read depth, not permissions. |
| Documentation update | `planning/documentation/README.md` | Documentation preflight and update workflows | Plan-first for broad changes. |
| Documentation Workbench planning | Local registries | Area README, Planning Draft, affected workflow/model owner and targeted sources | Local concrete state. |
| Conspects | `planning/areas/conspects/README.md` | Local owners | Local application. |
| Parallel work | Parallel workflow | Workspace template | Not promoted to root Direction without explicit decision. |

## 3. Boundaries

```text
semantic registries → context, identity, topology and owner routes;
root UCM → executable triggers, output and permissions;
reusable workflow → repeated method;
project-local owner → accepted concrete state;
Tampermonkey → projection only.
```

## 3A. Helper-Surface Behavior

```text
Orientation:
  explain architecture and help select context;

Direction:
  explain topology/optionality and relevant Use Cases;

Use Case:
  explain trigger/input, result, current stage and next actor/action;

Command:
  request immediate execution only under the UCM route;

Adaptive:
  reuse context only while clearly sufficient;

Full:
  reread the complete selected entry/route without expanding permissions;

Open Commands:
  redirect a command-related Use Case instead of creating duplicate execution.
```

## 4. Evidence Boundary

State checked/not-checked sources for non-trivial work. Planning documentation proves documented state, not runtime implementation.
