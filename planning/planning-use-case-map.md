# OBS Planning Use-Case Map

Status: active project-specific root command router
Doc version: v0.2.1-runtime-contract
Scope: concrete OBS command routing. Dashboard planning is performed in the Dashboard UI and is not exposed as a command family.

## 1. Authority Model

```text
This file owns concrete OBS command routing.
Reusable workflow docs own reusable behavior.
Area docs own local application details.
Tampermonkey is projection only.
```

Do not use `planning/documentation/field-kits/root-use-case-map-field-kit.md` as a runtime router after this file exists.

## 2. Explicit-Input Rule For Planning Responses

For `план файл-обновление`, `планируй` and planning parts of `положняк`:

```text
- Treat only explicit user statements and checked source facts as confirmed.
- Do not silently turn an unanswered decision into a user decision.
- When an important planning detail is missing, show a compact question table ordered by impact and uncertainty.
- Each unanswered question may include one conservative fallback instruction.
- A displayed fallback is temporary for the current output and can be overridden by the user.
- A fallback never authorizes commit, push, deletion, destructive action, unrelated files, scope expansion, invented deadlines or invented acceptance criteria.
```

## 3. Common Commands

| Command / trigger | Meaning | Active-context behavior | Traversal/read mode | Sources / owner files | Expected output |
|---|---|---|---|---|---|
| `давай архив`, `give arch`, `replacement package` | Produce a full replacement archive/package. This is output-package mode, not archive read-source mode. | Use active approved scope; ask only blocking scope questions. | Targeted/full depending on touched files and source certainty. | This UCM, `planning/documentation/reviewable-agent-output-and-commands-workflow.md`, relevant owner docs and target files. | Full replacement archive plus apply/diff commands in chat. No patches/patch files/scripts as primary apply mechanism. Do not commit or push. |
| `давай архив с review diff file`, `give arch rev dif`, `archive with review diff file` | Produce a replacement archive and repo-stored review diff when explicitly requested. | Use only when review-diff-file transfer is approved. | Targeted/full depending on touched files. | This UCM, `planning/documentation/reviewable-agent-output-and-commands-workflow.md`, `planning/documentation/review-diff-file-workflow.md`, relevant target files. | Archive plus optional `_ai-review-diffs/last-archive.diff` flow only when explicitly requested. Do not commit/push real package changes without reviewed diff approval. |
| `арх`, `added arch`, `use archive` | Treat provided/latest archive as read-source snapshot. | Use current uploaded/archive source; state freshness limits. | Archive read-source mode; targeted/full depending on question. | This UCM and relevant target files from archive. | Answer/review/plan based on archive. Do not create replacement archive unless separately requested. |
| `план файл-обновление`, `plan file update`, `archive plan` | Produce a concrete file/docs/code/archive update plan. | Ask target/scope if unclear. | Reuse/targeted/full by update risk. | This UCM, `planning/documentation/file-update-overview-workflow.md`, `planning/documentation/FILE-UPDATE-OVERVIEW-TEMPLATE.md`, relevant owner docs and target files. | Plan with files, responsibilities, what/why/boundaries/checks/next action. Does not edit files or create archive unless separately requested. |
| `крит`, `crit`, `critical review` | Critically evaluate target/diff/plan/claim as hypothesis, not accepted truth. | Use provided target; ask only if target is missing. | Targeted/full by risk and evidence needs. | This UCM, target docs/diff/files, relevant owner docs. | Honest verdict with strengths/weaknesses/risks/assumptions/alternatives. No edits/archive/commit/push unless separately requested. |
| `обс`, `chat rech`, `recheck` | Recheck prior answer/context/sources/diff before continuing. | Use current conversation target; ask if unclear. | Targeted/full by risk. | This UCM, prior chat context, target source files, owner docs. | Corrected answer/review. State uncertainty and do not invent evidence. |
| `положняк`, `polozh`, `current state` | Report current operational repo/chat/planning state. | Use active area/work item if clear. | Targeted source checks for state claims. | This UCM, `planning/root-source-sync-register.md`, relevant repo files. | Concise current state: what is in repo, what is local/unknown, next safe action. |
| `планируй`, `plan now` | Plan the next concrete step now from active context. | Use active context if available; otherwise ask for target. | Reuse/targeted by uncertainty. | This UCM, relevant area docs, owner workflows. | Concrete next step/scope/boundary/evidence/next action. No archive/edit unless separately requested. |
| `создай команду`, `create command`, `new command` | Plan or create a command route by rules/template. | Ask which command if target command is unclear. | Targeted/full by command scope. | This UCM, `planning/documentation/command-creation-workflow.md`, examples index and Tampermonkey projection workflow when in scope. | Command family/type/owner/UCM row/example/projection plan. Does not edit/create archive unless separately requested. |
| `начни параллельную работу`, `start parallel work`, `parallel workspace` | Start or plan one staging-only parallel workspace. | Ask scope if no concrete agent/workstream target. | Targeted/full by workspace scope. | This UCM, `planning/documentation/parallel-work/README.md`, `planning/documentation/parallel-work/parallel-workflow.md`, workspace template. | Parallel workspace plan/package when requested. Do not edit canonical docs directly; do not create aggregate sync until a sync-candidate workspace exists. |

## 4. OBS Operational Command

| Command / trigger | Meaning | Active-context behavior | Traversal/read mode | Sources / owner files | Expected output |
|---|---|---|---|---|---|
| `конец`, `конец сессии`, `end session` | Add exactly one completed normal session to the existing active operational day. | Read `planning/dashboard/index.md`; require an existing `active_session_day`; require matching `active_day` and operational dates; ask only for missing final D/F/Points. | Targeted: index → active operational day → end-session workflow → Day File Template → Real Reward Work Loop Workflow. | `planning/areas/planning-system/end-session-command-workflow.md`, `planning/dashboard/index.md`, `-Planning/Templates/Day File Template.md`, `-Planning/Workflows/Real Reward Work Loop Workflow.md`. | When inputs and checks pass, produce a full replacement archive containing only the active operational-day file plus apply/diff commands. User pastes diff before commit. Do not commit or push. |

Dashboard planning itself is not a UCM command. Day/week/month/period/year/goal planning is entered in the Dashboard manually or transported through its single-version JSON import/export, generated repo Markdown round-trip and sync prompt.

## 5. Tampermonkey Projection Rule

If a command is projected into Tampermonkey, use:

```text
planning/documentation/tampermonkey-command-projection-workflow.md
planning/documentation/tools/tampermonkey/README.md
planning/documentation/tools/tampermonkey/chat-command-palette.user.js
```

Projection requirements:

```text
- helper remains projection-only;
- root UCM owns command route;
- owner workflow owns behavior;
- profile has englishName;
- inserted body has english_name;
- button label is <englishName> · <label>.
```

## 6. Source Notes

Sources:
  Format/process:
    - `planning/documentation/field-kits/root-use-case-map-field-kit.md`
    - `planning/documentation/command-creation-workflow.md`
    - `planning/documentation/reviewable-agent-output-and-commands-workflow.md`
  Content:
    - User-confirmed operational commands and Dashboard runtime boundaries.
  Not checked:
    - Full existing OBS vault taxonomy beyond GitHub spot checks.
