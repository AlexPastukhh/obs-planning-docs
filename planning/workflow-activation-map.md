# OBS Workflow Activation Map

Status: active project-specific root planning router
Doc version: v0.9.0-planning-item-full-picture-workflow
Scope: decide which reusable workflow and local area owners to read before answering or editing in OBS planning work.

## 1. Default Rule

Do not invent local workflow rules when a reusable or project-local owner applies.

Start from the root UCM for commands, then read the owner route. For non-command work, use this activation map and the relevant area/reusable owner.

## 2. Activation Table

| User asks / task type | Read first | Then read | Notes |
|---|---|---|---|
| Command behavior / accepted command | `planning/planning-use-case-map.md` | Owner workflow/doc named in route | Root UCM owns concrete routing and canonical English names. |
| Read documentation principles | `planning/planning-use-case-map.md` | `planning/documentation/documentation-principles-read-workflow.md`, then root/documentation/task-specific owners required by that workflow | Read-only preflight. No edits, archive, commit or push. |
| Plan command | `planning/planning-use-case-map.md` | Documentation-principles preflight, file-update plan owners, `command-planning-workflow.md`, UCM workflow/template and example coverage owners | `спланируй команду` is plan-only. Tampermonkey projection uses the same canonical names and does not authorize implementation. |
| Planning Item reconciliation | `planning/planning-use-case-map.md` | `planning/documentation/application-planning/application-planning-drafting-workflow.md`, selected item source, complete current owners of each primary changed picture, current item owners, relevant supporting owners and available source-linked origins | `сверь айтемы` is read-only. Show complete before/after pictures and Current/Incoming/Resulting item transformations. |
| Planning Item / Full Picture product workflow | `planning/areas/documentation-workbench/README.md` | `planning/areas/documentation-workbench/full-picture.md`, `planning/areas/documentation-workbench/complete-pictures/planning-items-and-full-picture/full-picture.md`, affected items/full sources in `planning-item-register.md`, Reference Object model and downstream Documentation/Reference workflow when handoff matters | This is the accepted product-local trigger-to-result workflow. Reusable formation workflow/template synchronization is pending the next batch. |
| Documentation / Reference Object workflow | `planning/areas/documentation-workbench/README.md` | `planning/areas/documentation-workbench/full-picture.md`, `documentation-and-reference-object-end-to-end-workflow.md`, `reference-object-model-and-lifecycle.md`, affected register items/sources | Already managed Planning Item Reference Objects do not repeat object creation confirmation. |
| Tampermonkey command helper/profile/body | `planning/planning-use-case-map.md` | `planning/documentation/tampermonkey-command-projection-workflow.md`, `planning/documentation/tools/tampermonkey/README.md` | Command helper is projection only; copy the canonical English name from the root UCM. |
| Dashboard planning data / sync | `planning/documentation/tools/tampermonkey/local-planning-dashboard-viewer.user.js` | Dashboard Help, exported JSON and current repository source | Dashboard runtime owns its schema/help, JSON import/export and repo Markdown round trip. |
| Replacement archive / package | `planning/planning-use-case-map.md` | `planning/documentation/reviewable-agent-output-and-commands-workflow.md`, relevant package workflow, owner docs and target files | Resolve source selection and local-base verification first. Output full replacement archive, not patches/snippets. |
| Documentation update | `planning/documentation/README.md` | `planning/documentation/documentation-principles-read-workflow.md`, then `documentation-update-workflow.md` or `documentation-update-plan-workflow.md` | Plan-first for broad docs updates. |
| Documentation Workbench planning | `planning/areas/documentation-workbench/README.md` | `planning/areas/documentation-workbench/full-picture.md`, affected accepted Complete Picture/model, targeted register items/sources, then relevant reusable owners | The area owns project-local product/planning state. Reusable family owns repeated method, terminology, principles and templates. |
| Conspects | `planning/areas/conspects/README.md` | local conspect docs when created | Conspects area is local application, not reusable rule source. |
| Parallel work | `planning/documentation/parallel-work/parallel-workflow.md` | workspace template | Staging only; no aggregate sync before sync-candidate. |

## 3. Important Boundaries

```text
Planning Item And Full Picture workflow:
  source-linked planning meaning, acceptance, item-backed synthesis,
  concern/deepening loops and repository reconciliation;

Documentation And Reference Object workflow:
  managed identity/state/home, document/object authoring,
  references, dependency review, navigation and diff-ready output;

reusable application-planning family:
  repeated planning method and exact recommended shapes;

root UCM:
  command trigger and permission routing only.
```

## 4. Evidence Boundary

When a command/task requires source reads, state what was read and what was not checked. Do not treat planning docs as proof of runtime/code state.
