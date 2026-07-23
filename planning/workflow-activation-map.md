# OBS Workflow Activation Map

Status: active project-specific root planning/task router
Doc version: v0.12.0-form-items-command
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
| Planning Item formation / `сформируй айтемы` | Root UCM | Application-planning Use-Case Registry, formation workflow, review template, input conventions, selected source and current item owners | `form items`; reviewable output only, no repository edit. |
| Planning Item reconciliation | Root UCM | Application-planning registry, drafting workflow, selected items and complete owners | `сверь айтемы` remains read-only. |
| Item-backed Full Picture | Application-planning Use-Case Registry | Drafting workflow, Planning Draft template and current local owners | Full Picture does not replace item bodies. |
| Planning Item / Full Picture product workflow | Documentation Workbench Use-Case Registry | Local Full Picture, accepted workflow, register, model and downstream workflow | Reusable method and registries synchronized. |
| Documentation / Reference Object workflow | Documentation Workbench Use-Case Registry | Local Full Picture, workflow, model and affected items | Managed items do not repeat confirmation. |
| Current reality | Application-planning Use-Case Registry | Drafting workflow, current-reality template and current owner | Descriptive; no future architecture acceptance. |
| Detailed Scenario/Domain/Slice | Application-planning registries | SDS profile/field kit and project owners | Profile-limited; prototype-depth adaptation deferred. |
| Maintain registries | Root Direction Registry | Registry workflow/templates, affected registries and navigation owners | UCM changes only for executable commands. |
| Plan command | Root UCM | Documentation preflight, command workflow, UCM owner/template and related registry entry | Plan-only; helper decision separate. |
| Replacement archive | Root UCM | Reviewable-output workflow, documentation-update workflow, relevant owners/targets | Full replacements, exact base validation, one-line apply/diff command. |
| Tampermonkey helper | `planning/README.md` for Orientation; registries for Directions/Use Cases; UCM for Commands | Projection workflow, tools README and userscript | Projection only; Adaptive/Full changes read depth, not permissions. |
| Documentation update | `planning/documentation/README.md` | Documentation preflight and update workflows | Plan-first for broad changes. |
| Documentation Workbench planning | Local registries | Area README, Full Picture, affected owner and targeted sources | Local concrete state. |
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
