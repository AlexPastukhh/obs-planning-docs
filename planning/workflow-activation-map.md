# OBS Workflow Activation Map

Status: active project-specific root planning router
Doc version: v0.5.0-planning-item-reconciliation-command
Scope: decide which reusable workflow / local area docs to read before answering or editing in OBS planning work.

## 1. Default Rule

Do not invent local workflow rules when a reusable documentation-layer workflow applies.

Start from root UCM, then read owner docs for the route.

## 2. Activation Table

| User asks / task type | Read first | Then read | Notes |
|---|---|---|---|
| Command behavior / accepted command | `planning/planning-use-case-map.md` | Owner workflow/doc named in route | Root UCM owns concrete routing and canonical English names. |
| Read documentation principles | `planning/planning-use-case-map.md` | `planning/documentation/documentation-principles-read-workflow.md`, then the root/documentation/task-specific owners required by that workflow | Read-only preflight. No edits, archive, commit or push. |
| Plan command | `planning/planning-use-case-map.md` | `planning/documentation/documentation-principles-read-workflow.md`, file-update overview workflow/template, `planning/documentation/command-planning-workflow.md`, use-case-map workflow/template and example coverage owners | `спланируй команду` / `plan command` is plan-only. Tampermonkey projection uses the same canonical names and does not authorize implementation. |
| Planning Item reconciliation | `planning/planning-use-case-map.md` | `planning/documentation/application-planning/application-planning-drafting-workflow.md`, the selected item source, relevant canonical owner files and available source-linked origins | `сверь айтемы` / `reconcile planning items` is read-only. Show existing coverage, relations, conflicts, explicit old-to-new semantic effects and unresolved choices; do not edit files or item registers. |
| Tampermonkey command helper/profile/body | `planning/planning-use-case-map.md` | `planning/documentation/tampermonkey-command-projection-workflow.md`, `planning/documentation/tools/tampermonkey/README.md` | Command helper is projection only; copy the canonical English name from the root UCM. |
| Dashboard planning data / sync | `planning/documentation/tools/tampermonkey/local-planning-dashboard-viewer.user.js` | Dashboard Help, exported JSON and current repository source | Dashboard runtime owns its single schema/help, JSON import/export and repo Markdown round-trip. No Dashboard-planning UCM command is required. |
| Replacement archive / package | `planning/planning-use-case-map.md` | `planning/documentation/reviewable-agent-output-and-commands-workflow.md`, relevant package workflow, owner docs and target files | Resolve source selection and local-base verification first. Output full replacement archive, not patches/snippets. |
| Documentation update | `planning/documentation/README.md` | `planning/documentation/documentation-principles-read-workflow.md`, then `documentation-update-workflow.md` or `documentation-update-plan-workflow.md` | Plan-first for broad docs updates. |
| Conspects | `planning/areas/conspects/README.md` | local conspect docs when created | Conspects area is local application, not reusable rule source. |
| Parallel work | `planning/documentation/parallel-work/parallel-workflow.md` | workspace template | Staging only; no aggregate sync before sync-candidate. |

## 3. Evidence Boundary

When a command/task requires source reads, state what was read and what was not checked. Do not treat planning docs as proof of runtime/code state.
