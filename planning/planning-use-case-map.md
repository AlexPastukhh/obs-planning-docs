# OBS Planning Use-Case Map

Status: active project-specific root command router
Doc version: v0.6.0-planning-item-reconciliation-command
Scope: concrete OBS command routing. Dashboard planning is performed in the Dashboard UI and is not exposed as a command family.

## 1. Authority Model

```text
This file owns concrete OBS command routing and each command family's canonical English name.
Reusable workflow docs own reusable behavior.
Area docs own local application details.
Tampermonkey is projection only.
```

Do not use `planning/documentation/field-kits/root-use-case-map-field-kit.md` as a runtime router after this file exists.

## 2. Explicit-Input Rule For Planning Responses

For `план файл-обновление`, `планируй`, `спланируй команду` and planning parts of `положняк`:

```text
- Treat only explicit user statements and checked source facts as confirmed.
- Do not silently turn an unanswered decision into a user decision.
- When an important planning detail is missing, show a compact question table ordered by impact and uncertainty.
- Each unanswered question may include one conservative fallback instruction.
- A displayed fallback is temporary for the current output and can be overridden by the user.
- A fallback never authorizes commit, push, deletion, destructive action, unrelated files, scope expansion, invented deadlines or invented acceptance criteria.
```

## 3. Command Naming Rule

```text
- Every command family has one canonical Russian command and one canonical English name.
- The English name is stable display/projection metadata; aliases remain triggers only.
- Tampermonkey copies the English name from this UCM instead of inventing or shortening it.
```

## 4. Common Commands

| Command / trigger | English name | Meaning | Active-context behavior | Traversal/read mode | Sources / owner files | Expected output |
|---|---|---|---|---|---|---|
| `давай архив`, `собери архив`, `give arch`, `replacement package` | `build replacement archive` | Produce a full replacement archive/package. This is output-package mode, not archive read-source mode. | Use active approved scope. An archive from an earlier message is not current automatically. An archive attached with this command is the selected current source snapshot for this invocation. Otherwise use fully readable current repository files. A package apply stage must still verify the local HEAD/base blobs and stop before changes if they differ. | Targeted/full depending on touched files and source certainty. | This UCM, `planning/documentation/reviewable-agent-output-and-commands-workflow.md`, relevant package workflow, owner docs and target files. | Full replacement archive plus apply/diff commands in chat. Record selected source identity. Use complete replacement files, not patches as the primary mechanism. Do not commit or push before reviewed diff approval. |
| `давай архив с review diff file`, `give arch rev dif`, `archive with review diff file` | `build archive with review diff` | Produce a replacement archive and repo-stored review diff when explicitly requested. | Use only when review-diff-file transfer is approved. Apply the same source-selection and local-base verification rules as `давай архив`. | Targeted/full depending on touched files. | This UCM, `planning/documentation/reviewable-agent-output-and-commands-workflow.md`, `planning/documentation/review-diff-file-workflow.md`, relevant package workflow and target files. | Archive plus optional `_ai-review-diffs/last-archive.diff` flow only when explicitly requested. Record selected source identity. Do not commit or push before reviewed diff approval. |
| `арх`, `из архива`, `added arch`, `use archive` | `use archive` | Treat a provided archive as a read-source snapshot. | Use the archive explicitly selected for this invocation and state available identity/freshness limits. Do not silently treat an earlier-message archive as current. | Archive read-source mode; targeted/full depending on question. | This UCM and relevant target files from the selected archive. | Answer/review/plan based on the selected archive. Do not create a replacement archive unless separately requested. |
| `сверь айтемы`, `сверь айтемы с документацией`, `проверь айтемы по репозиторию`, `reconcile planning items`, `reconcile items` | `reconcile planning items` | Reconcile selected working, local or unprocessed Planning Items with relevant current repository documentation, existing items, canonical owners and available source-linked origins. | Use the clearly active item set or a same-message attached item source. Ask which item source to use only when it is missing or ambiguous; do not silently select an older local file. | Targeted/full by item scope: selected item source → semantic matches → canonical owners → available source-linked origins → potentially affected documentation. | This UCM, `planning/documentation/application-planning/application-planning-drafting-workflow.md`, the selected item source and relevant current owner files. | Read-only reconciliation review with checked/not-checked sources, existing coverage, relation to current meaning, same-problem solutions, conflicts, explicit old-to-new semantic effects, proposed item/documentation actions and unresolved choices. No file edit, item-register update, archive, commit or push. |
| `план файл-обновление`, `спланируй обновление файлов`, `спланируй архив`, `plan file update`, `archive plan` | `plan file update` | Produce a concrete file/docs/code/archive update plan. | Ask target/scope only when active context does not make it clear. | Reuse/targeted/full by update risk. | This UCM, `planning/documentation/file-update-overview-workflow.md`, `planning/documentation/FILE-UPDATE-OVERVIEW-TEMPLATE.md`, relevant owner docs and target files. | Plan with files, responsibilities, what/why/boundaries/checks/next action. Does not edit files or create archive unless separately requested. |
| `крит`, `crit`, `critical review` | `critical review` | Critically evaluate target/diff/plan/claim as hypothesis, not accepted truth. | Use provided target; ask only if target is missing. | Targeted/full by risk and evidence needs. | This UCM, target docs/diff/files, relevant owner docs. | Honest verdict with strengths/weaknesses/risks/assumptions/alternatives. No edits/archive/commit/push unless separately requested. |
| `обс`, `chat rech`, `recheck` | `recheck context` | Recheck prior answer/context/sources/diff before continuing. | Use current conversation target; ask if unclear. | Targeted/full by risk. | This UCM, prior chat context, target source files, owner docs. | Corrected answer/review. State uncertainty and do not invent evidence. |
| `обн`, `upd` | `revise returned files` | Review user-edited returned Markdown, documentation or planning-draft files and produce new complete versions from those edits. | Files attached in the same message are the selected working versions. Compare them with clearly matching prior versions when available, evaluate what changed, preserve deliberate user edits, merge same-message clarifications and repair visual Markdown structure when useful. | Full read of every returned file; targeted read of matching prior versions, relevant templates, drafting workflows and owner docs. | This UCM, `planning/documentation/reviewable-agent-output-and-commands-workflow.md`, relevant drafting workflow/templates, returned files and clearly matching prior versions. | Complete revised affected files plus a compact summary of significant adjustments and unresolved conflicts. No repository edit, archive, commit or push unless separately requested. |
| `положняк`, `polozh`, `current state` | `current state` | Report current operational repo/chat/planning state. | Use active area/work item if clear. | Targeted source checks for state claims. | This UCM, `planning/root-source-sync-register.md`, relevant repo files. | Concise current state: what is in repo, what is local/unknown, next safe action. |
| `планируй`, `plan now` | `plan now` | Plan the next concrete step now from active context. | Use active context if available; otherwise ask for target. | Reuse/targeted by uncertainty. | This UCM, relevant area docs, owner workflows. | Concrete next step/scope/boundary/evidence/next action. No archive/edit unless separately requested. |
| `прочитай принципы документации`, `прочти принципы документации`, `принципы документации`, `read documentation principles`, `documentation principles`, `docs principles` | `read documentation principles` | Perform the documentation architecture/ownership/update preflight before planning or changing documentation. | Use the active documentation task if clear; otherwise report the reusable documentation read path and ask only for the target when needed. | Full when this route has not been read in the chat, is not remembered, or ownership/boundaries are uncertain; targeted refresh only after a current full pass. | This UCM, `planning/documentation/documentation-principles-read-workflow.md`, root planning files, documentation architecture/responsibility/update owners and task-specific owners. | Read-only report of checked/not-checked sources, authority, correct owner zone, required read path and boundaries. No edits, archive, commit or push. |
| `спланируй команду`, `plan command` | `plan command` | Plan a command route and its documentation changes. This command is plan-only and never authorizes implementation. | Ask which command only if the target command is unclear. | First run the documentation-principles preflight when required; then targeted/full command-route reads by scope. | This UCM, `planning/documentation/documentation-principles-read-workflow.md`, `planning/documentation/file-update-overview-workflow.md`, `planning/documentation/FILE-UPDATE-OVERVIEW-TEMPLATE.md`, `planning/documentation/command-planning-workflow.md`, `planning/documentation/use-case-map-workflow.md`, `planning/documentation/USE-CASE-MAP-TEMPLATE.md`, example coverage owners, and Tampermonkey projection owners only when separately in scope. | Command family/type/canonical English name/owner/UCM-row/example/projection plan followed by `План файл-обновление`. No file creation or edits, no archive, no commit or push. |
| `начни параллельную работу`, `start parallel work`, `parallel workspace` | `start parallel work` | Start or plan one staging-only parallel workspace. | Ask scope if no concrete agent/workstream target. | Targeted/full by workspace scope. | This UCM, `planning/documentation/parallel-work/README.md`, `planning/documentation/parallel-work/parallel-workflow.md`, workspace template. | Parallel workspace plan/package when requested. Do not edit canonical docs directly; do not create aggregate sync until a sync-candidate workspace exists. |

## 5. OBS Operational Command

| Command / trigger | English name | Meaning | Active-context behavior | Traversal/read mode | Sources / owner files | Expected output |
|---|---|---|---|---|---|---|
| `конец`, `конец сессии`, `end session` | `end session` | Add exactly one completed normal session to the existing active operational day. | Read `planning/dashboard/index.md`; require an existing `active_session_day`; require matching `active_day` and operational dates; ask only for missing final D/F/Points. | Targeted: index → active operational day → end-session workflow → Day File Template → Real Reward Work Loop Workflow. | `planning/areas/planning-system/end-session-command-workflow.md`, `planning/dashboard/index.md`, `-Planning/Templates/Day File Template.md`, `-Planning/Workflows/Real Reward Work Loop Workflow.md`. | When inputs and checks pass, produce a full replacement archive containing only the active operational-day file plus apply/diff commands. User pastes diff before commit. Do not commit or push. |

Dashboard planning itself is not a UCM command. Day/week/month/period/year/goal planning is entered in the Dashboard manually or transported through its single-version JSON import/export, generated repo Markdown round-trip and sync prompt.

## 6. Tampermonkey Projection Rule

If a command is projected into Tampermonkey, use:

```text
planning/documentation/tampermonkey-command-projection-workflow.md
planning/documentation/tools/tampermonkey/README.md
planning/documentation/tools/tampermonkey/chat-command-palette.user.js
```

Projection requirements:

```text
- helper remains projection-only;
- root UCM owns command route and canonical English name;
- owner workflow owns behavior;
- profile.englishName exactly matches the UCM English name;
- inserted body has the same english_name;
- button label is <englishName> · <label>.
```

## 7. Source Notes

Sources:
  Format/process:
    - `planning/documentation/field-kits/root-use-case-map-field-kit.md`
    - `planning/documentation/command-planning-workflow.md`
    - `planning/documentation/reviewable-agent-output-and-commands-workflow.md`
  Content:
    - User-confirmed operational commands, command-planning boundaries, archive source-selection rules, returned-file revision behavior and Dashboard runtime boundaries.
  Not checked:
    - Full existing OBS vault taxonomy beyond the current repository target files.
