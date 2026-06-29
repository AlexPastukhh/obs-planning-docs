# Root Use-Case Map Field Kit

Status: active reusable documentation-layer field kit
Doc version: v0.4.0-canonical-plan-command
Scope: one-time / rare setup guidance for deriving a single project root use-case map

## 1. Purpose

This field kit helps a project create or restructure one concrete root use-case map.

A project should usually have exactly one root use-case map.

Example: in Enman, the concrete project instance is:

```text
planning/planning-use-case-map.md
```

This field kit is not a second use-case map and should not be used at runtime instead of the project root map.

## 2. Responsibility Split

| Owner | Owns |
|---|---|
| Project root use-case map | Concrete routes for one project: user wording, traversal, read sources, activated workflows, expected output and permission boundaries. |
| This field kit | Setup choices for creating/adapting the project root use-case map, including common command clusters. |
| Use-case-map workflow | Repeated maintenance process after the project map exists. |
| Use-case-map template | Exact reusable Markdown shape for a concrete map. |
| Profile-specific field kits | Optional route clusters for project classes, such as scenario/domain/slice projects. |

## 3. Core Rule

```text
One project -> one concrete root use-case map.
```

Do not create a generic reusable use-case map inside the documentation layer.

Reusable docs should provide:

```text
- field kits for setup;
- workflows for maintenance;
- templates for shape;
- examples for demonstration.
```

The concrete project map should remain the only runtime router.

## 4. Setup Questions

Before creating or restructuring a root use-case map, answer:

```text
1. What is the project entrypoint README?
2. What is the root workflow activation map?
3. What is the root responsibility map?
4. Which repeated user commands need stable routing?
5. What canonical English display name does each command family use?
6. Which project-specific task families need primary use-case rows?
7. Which source modes exist: conversation, GitHub/repo, archive, uploaded files, canvas?
8. Which output modes exist: answer, draft, plan, diff, package, direct edit?
9. Which actions require explicit user permission?
10. Which docs layer files own reusable workflow/template logic?
11. Which profile-specific route kits apply to this project?
12. Which profile-specific reusable examples appear to fit this project type, workflow style or route family?
```

## 4A. Profile-Specific Example Fit Check

When a field kit is used to create or restructure a concrete project root use-case map:

```text
1. Read `planning/documentation/examples/README.md`.
2. Identify fully reusable and profile-specific reusable examples that appear to match the project type, workflow style, route families or output modes.
3. Show those candidate examples to the user.
4. Ask whether the user considers them a fit for this project.
5. Only user/project-accepted examples may be referenced from the concrete root use-case map or detailed traces.
6. Keep examples demonstration-only.
```

Do not silently decide that a profile-specific reusable example matches the project's spirit. Example fit is a project/user decision.

## 5. Common Command Clusters

Most command-heavy assistant projects need some subset of these reusable command clusters.

| Cluster | Typical commands | Purpose |
|---|---|---|
| Draft continuation | `драфт`, `давай драфт`, `обнови драфт`, `отличия драфта` | Continue or compare the active draft without starting a new one. |
| Answer shape | `кп`, `без кп`, `саммари`, `без саммари`, `итог`, `без итога`, `полный конец` | Control key points, contextual summary and file/update overview blocks. |
| Recheck/context | `обс`, `перепроверь`, `проверь`, `recheck` | Re-check prior discussion, active answer, sources or applied changes. |
| Source mode | `арх`, `из архива`, `учти файл X`, `без изм` | Decide whether to use archive/uploaded file/current context and traversal depth. |
| Output package | `давай архив`, `собери архив`, `replacement package` | Produce manual replacement archive/package output. |
| Permission boundary | `без изм`, package vs direct edit wording | Prevent silent repository changes or output-mode substitution. |

A project can localize aliases and wording. Keep active-context behavior explicit.

## 5A. Common Root Command Seed Rows

Use these rows as reusable starter rows when creating a new project's `planning/planning-use-case-map.md`.

These rows are not runtime authority while they remain inside this field kit. After the project root UCM exists, the project root UCM owns the concrete routing.

| Command / trigger | English name | Meaning | Active-context behavior | Traversal/read mode | Sources / owner files | Expected output |
|---|---|---|---|---|---|---|
| `давай архив`, `собери архив`, `give arch`, `replacement package` | `build replacement archive` | Produce a full replacement archive/package. This is output-package mode, not archive read-source mode. | Use active approved scope. An earlier-message archive is not current automatically. A same-message source archive is current for the invocation. Otherwise use fully readable current repository files and request a fresh archive only when size/tool limits prevent reliable reading. The apply stage must still verify exact local base blobs and stop before changes on mismatch. | Targeted/full depending on touched files and source certainty. | Project root UCM, `reviewable-agent-output-and-commands-workflow.md`, relevant package workflow, owner docs and target files. | Full replacement archive plus apply/diff commands in chat. Record selected source identity. No patches/patch files/scripts as primary apply mechanism. Do not commit or push. |
| `давай архив с review diff file`, `give arch rev dif`, `archive with review diff file` | `build archive with review diff` | Produce a replacement archive and repo-stored review diff when explicitly requested. | Use only when review-diff-file transfer is approved. Apply the same source-selection and local-base verification rules as `давай архив`. | Targeted/full depending on touched files. | Project root UCM, `reviewable-agent-output-and-commands-workflow.md`, review-diff-file workflow if present, relevant package workflow and target files. | Archive plus `_ai-review-diffs/last-archive.diff` flow if the project uses that convention. Record selected source identity. Do not commit/push generated package changes without review. |
| `арх`, `из архива`, `added arch`, `use archive` | `use archive` | Treat an explicitly selected archive as a read-source snapshot. | Do not silently treat an earlier-message archive as current. | Archive read-source mode; targeted/full depending on question. | Project root UCM and relevant target files from the selected archive. | Answer/review/plan based on the selected archive. Do not create replacement archive unless separately requested. |
| `синх карта`, `sync map`, `goal map sync` | `sync goal map` | Synchronize living Goal Map state with accepted repo/chat state. | Use active Goal Map/workstream if clear; otherwise ask target. | Targeted/full by Goal Map scope. | Project root UCM, Goal Map workflow/template, active Goal Map, relevant owner docs. | Goal Map Brief and/or map-sync package only when requested. Do not start next functional slice unless asked. |
| `план файл-обновление`, `спланируй обновление файлов`, `спланируй архив`, `plan file update`, `archive plan` | `plan file update` | Produce a concrete file/docs/code/archive update plan. | Ask target/scope if unclear. | Reuse/targeted/full by update risk. | Project root UCM, relevant workflows/templates, target files. | Plan with files, responsibilities, what/why/boundaries/checks/next action. Does not edit files or create archive unless separately requested. |
| `крит`, `crit`, `critical review` | `critical review` | Critically evaluate target/diff/plan/claim as hypothesis, not accepted truth. | Use provided target; ask only if target is missing. | Targeted/full by risk and evidence needs. | Project root UCM, target docs/diff/files, relevant owner docs. | Honest verdict with strengths/weaknesses/risks/assumptions/alternatives. No edits/archive/commit/push unless separately requested. |
| `кц`, `gm brief`, `goal map brief` | `goal map brief` | Produce compact Goal Map Brief for the active workstream/slice. | Use active Goal Map if clear; otherwise ask target. | Targeted read of active Goal Map and required source files. | Project root UCM, Goal Map workflow/template, active Goal Map. | Compact current goal/current slice/done/now/next/after state. No file edits. |
| `обс`, `chat rech`, `recheck` | `recheck context` | Recheck prior answer/context/sources/diff before continuing. | Use current conversation target; ask if unclear. | Targeted/full by risk. | Project root UCM, prior chat context, target source files, owner docs. | Corrected answer/review. State uncertainty and do not invent evidence. |
| `положняк`, `polozh`, `current state` | `current state` | Report current operational repo/chat/slice state. | Use active workstream/slice if clear. | Targeted repo/Goal Map/source checks for state claims. | Project root UCM, active Goal Map, source register, relevant repo files. | Concise current state: what is in repo, what is local/unknown, next safe action. |
| `планируй`, `plan now` | `plan now` | Plan the next concrete step now from active context. | Use active Goal Map/context if available; otherwise ask for target. | Reuse/targeted by uncertainty. | Project root UCM, active Goal Map/workstream, relevant owner docs. | Concrete next step/scope/boundary/evidence/next action. No archive/edit unless separately requested. |
| `прочитай принципы документации`, `прочти принципы документации`, `read documentation principles`, `documentation principles`, `docs principles` | `read documentation principles` | Perform the reusable documentation architecture/ownership/update preflight. | Use active documentation task when clear; otherwise report the read path. | Full when not read/remembered or uncertain; targeted refresh only after a current full pass. | Project root UCM, `documentation-principles-read-workflow.md`, root/documentation/task-specific owners. | Read-only authority/owner/read-path report. No edits, archive, commit or push. |
| `спланируй команду`, `plan command` | `plan command` | Plan a command route and its documentation changes. This route is plan-only. | Ask which command if target is unclear. | Documentation-principles preflight, then targeted/full command-route reads. | Project root UCM, documentation-principles owner, file-update plan owner/template, `command-planning-workflow.md`, UCM workflow/template, examples index and projection workflow only when separately in scope. | Command family/type/English name/owner/UCM row/example/projection plan plus `План файл-обновление`. No file creation/edit/archive/commit/push. |
| `начни параллельную работу`, `start parallel work`, `parallel workspace` | `start parallel work` | Start or plan one staging-only parallel workspace. | Ask scope if no concrete agent/workstream target. | Targeted/full by workspace scope. | Project root UCM, `planning/documentation/parallel-work/parallel-workflow.md`, workspace template. | Parallel workspace plan/package when requested. Do not edit canonical docs directly; do not create aggregate sync until a sync-candidate workspace exists. |

If a seed command is projected into Tampermonkey, use:

```text
planning/documentation/tampermonkey-command-projection-workflow.md
```

Projection requirements:

```text
- root UCM row has one canonical English name;
- profile.englishName exactly matches that UCM value;
- inserted body has the same english_name;
- button label is <englishName> · <label>;
- helper stays projection-only and does not own command meaning.
```


## 6. Root Use-Case Map Sections

A concrete root map should normally include:

```text
- purpose;
- relationship to root files;
- universal algorithm;
- principle/workflow/source references;
- active context rule;
- accepted command/no-reinvention rule;
- traversal depth;
- read source modes;
- output modes;
- source model/delta rules;
- repeated/continuation commands table;
- primary use case table;
- detailed traces for high-risk routes.
```

Exact shape belongs to:

```text
planning/documentation/USE-CASE-MAP-TEMPLATE.md
```

## 7. Row Creation Checklist

For each command or use case row:

```text
1. Capture canonical user wording and aliases.
2. Assign one required canonical English name for each command family.
3. Decide whether active context changes behavior.
4. Choose traversal depth.
5. Choose read source mode.
6. Name activated workflows/templates.
7. Name required reads.
8. Name source of obligation.
9. Describe expected output briefly.
10. Define permission boundary.
11. Link owner files instead of copying their logic.
```

Maintenance workflow:

```text
planning/documentation/use-case-map-workflow.md
```

## 8. Profile-Specific Route Kits

If a project has a specialized structure, use a profile-specific field kit to derive route rows.

For scenario/domain/slice projects, use:

```text
planning/documentation/profiles/scenario-domain-slice-use-case-field-kit.md
```

The profile kit suggests route families. The project root map still owns the concrete rows.

## 9. Do Not

```text
- Do not create a second generic use-case map inside the documentation layer.
- Do not move concrete project routes out of the root map into this field kit.
- Do not put full workflow steps into root map rows.
- Do not hide scenario/domain/slice command setup in a deep folder where project maintainers will not find it.
- Do not silently change command meaning when extracting reusable setup logic.
- Do not make canonical English names optional or let helper code invent them.
- Do not duplicate full archive source-selection logic in seed rows; link the owner workflow.
- Do not silently decide that a profile-specific reusable example fits a concrete project. Show candidates and ask the user/project to accept fit before wiring them into the concrete root map.
```
