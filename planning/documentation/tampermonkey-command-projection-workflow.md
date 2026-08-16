# Tampermonkey Planning Surface Projection Workflow

Status: active reusable documentation-layer workflow
Doc version: v1.3.1-authoritative-chat-recovery
Scope: reusable rules for projecting accepted project Orientation, semantic Direction/Use-Case registries and planning-command routes into the Tampermonkey/ChatGPT helper while keeping user-authored local commands/prompts in a separate non-authoritative helper library.

## 1. Core Rule

Tampermonkey is projection only.

```text
Orientation authority:
  planning/README.md
  planning/direction-registry.md

Direction authority:
  root/local Direction Registries

Use-Case authority:
  reusable-family/local Use-Case Registries

Command-system entry/global policy:
  planning/planning-use-case-map.md

Concrete command authority:
  planning/commands/*.command.md

Behavior authority:
  linked owner workflow/template/area docs

Projection implementation source/build:
  planning/documentation/tools/tampermonkey/chat-command-palette/

Generated install artifact:
  planning/documentation/tools/tampermonkey/chat-command-palette.user.js

Helper local-library contract:
  planning/helper-library/README.md

Helper local-library repository records:
  planning/helper-library/commands/*.helper-command.md
  planning/helper-library/prompts/*.prompt.md
```

The helper must not invent command meaning, permission boundaries, aliases or English display names. It parses accepted repository command definitions and generates runtime bodies from them.

The root UCM is the mandatory command-system entry/global-policy owner. The selected direct command definition owns the concrete route fields and points to the files needed for understanding. Neither file needs to encode which read/refinement button the user chose for one palette insertion.

## 2. Before Adding Or Updating A Command

Check:

```text
1. The root UCM is present as the command-system entry.
2. The selected direct `planning/commands/*.command.md` definition exists and validates.
3. The definition has one canonical English name and unique aliases.
4. Owner docs for the route exist.
5. Permission boundary is explicit.
6. Inserted body points back to the root UCM, selected command definition and owner docs.
7. Projected englishName exactly matches the command-definition English name.
8. Button label uses <englishName> · <label>.
9. Adaptive and forced-full variants are generated from the same command definition.
10. A command-specific refinement, when present, only points to route/owner docs to reread and states the validation action.
```

If the bundled generated userscript is older than the accepted repository command catalog, recover the current catalog through ChatGPT: copy the helper recovery request, let ChatGPT read the repository, and paste the complete returned marker set into local Restore. Restore treats that complete set as authoritative for repository-backed local records, removing stale repository-backed records that are absent while preserving local-only/unbacked records. The helper itself does not refresh/read GitHub. Rebuild/reinstall only when helper source/runtime changes; do not edit the generated artifact to match command data.

## 3. Shared Inserted Body Contract

Use a project-neutral marker, not an Enman-specific marker.

```text
[PLANNING_COMMAND]
Read this whole command body before answering.
Do not ignore `key_reminders`.

command:
  <canonical command from selected command definition>

english_name:
  <canonical English name from selected command definition>

command_family:
  `<canonical command>` / `<alias 1>` / `<English alias>`

<route read block selected by the palette action>

key_reminders:
  - <command-specific reminder>
  - <permission boundary>
  - <evidence/source requirement>
  - <what not to do>

user_target:
  <placeholder>

[/PLANNING_COMMAND]
```

Command meaning, aliases, English name, reminders and target stay identical between read variants. Only the source/read block changes.

## 4. Adaptive Route-Read Variant

The normal command button uses adaptive behavior.

```text
source_of_truth:
  Start from `planning/planning-use-case-map.md`.
  Then read the selected `planning/commands/*.command.md` definition.
  Then read its owner / linked files.

route_read_rule:
  If you have not read this command route and its linked owner/example files in this chat, read them before answering.
  If you have read them but do not remember the required behavior, boundaries or key points, reread from `planning/planning-use-case-map.md` before answering.
  Do not rely only on this prompt when command behavior is uncertain.
```

This variant leaves the freshness decision to the chat. Recently verified context may be reused only while behavior, boundaries and key points remain clear.

## 5. Forced Full Route-Read Variant

A separate `Full` action inserts the same command with an explicit fresh-read requirement.

```text
source_of_truth:
  Start from `planning/planning-use-case-map.md`.
  Then read the selected `planning/commands/*.command.md` definition.
  Follow that definition's complete required owner route.

route_read_rule:
  Full route reading is required for this invocation.
  Read the root UCM, then the selected command definition in `planning/commands/`.
  Then read every owner, workflow, template and example file required by that command route for complete understanding.
  Do this even if the command was previously used in this chat.
  Do not execute the command from memory or from this compact prompt alone.
  Do not expand into unrelated repository files outside the command route.
```

`Full` means the complete required path of that command, not a broad read of the entire repository.

## 6. UI Contract

Each command row uses sibling controls:

```text
<englishName> · <label>:
  insert adaptive command body

Full:
  insert forced-full command body

Cmd fmt:
  for `давай архив` only;
  reread the route and archive command-format/source-selection owners,
  validate every PowerShell Git command in the current answer
  and rewrite any non-compliant command

Copy:
  copy adaptive command body
```

Do not nest buttons inside another button. Do not duplicate the whole command definition to create another read variant.

## 7. Owner-Read Refinement Contract

A refinement button must stay compact and only point to the documentation that should be reread.

General shape:

```text
[PLANNING_COMMAND_REFINEMENT]
command:
  <canonical command>

refinement:
  <refinement id>

read_required:
  - `<owner path>`

instruction:
  Reread these files and apply their owner rules to the current answer.

[/PLANNING_COMMAND_REFINEMENT]
```

Do not duplicate owner rules inside the userscript or refinement body.

### Standalone documentation-principles command

Project the accepted repository command definition as its own command profile:

```text
id:
  documentation_principles.read

command:
  прочитай принципы документации

englishName:
  read documentation principles

commandFamily:
  `прочитай принципы документации` / `прочти принципы документации` / `принципы документации` / `read documentation principles` / `documentation principles` / `docs principles`
```

The row uses the normal adaptive, `Full` and `Copy` controls. Do not add a separate `Docs` refinement to `спланируй команду`; the standalone command already owns that user-facing route, while the plan-command owner still requires the preflight internally.

### Canonical plan-command projection

```text
id:
  command.plan

command:
  спланируй команду

englishName:
  plan command

commandFamily:
  `спланируй команду` / `plan command`
```

Do not retain creation-wording IDs, labels or aliases after the accepted repository command definition removes them.

### Archive command-format refinement

Approved for `давай архив`:

```text
[PLANNING_COMMAND_REFINEMENT]
command:
  давай архив

refinement:
  archive_command_format

read_required:
  - `planning/planning-use-case-map.md`
  - `planning/documentation/reviewable-agent-output-and-commands-workflow.md`
  - `planning/documentation/documentation-update-workflow.md`

instruction:
  Reread these files, validate every user-facing PowerShell Git command in the current answer against their archive command-format and source-selection rules, and rewrite any non-compliant command.

[/PLANNING_COMMAND_REFINEMENT]
```

## 8. English Name Synchronization

```text
- The root UCM is the mandatory command-system entry/global-policy owner.
- The selected command definition is authoritative for its canonical English name.
- Projected englishName must exactly match that command definition.
- inserted english_name must use the same value.
- button label must use the same value.
- aliases may differ and remain in command_family.
- do not abbreviate, transliterate or normalize an English name only inside the helper.
```

A repository command-definition change is not fetched by the installed helper. To update a browser-local command set, use the ChatGPT recovery/import flow and paste the returned exact command blocks. Rebuilding/reinstalling is required only when helper source/runtime changes or when the bundled offline fallback itself must be refreshed.

## 9. Archive Source Reminder Projection

When `давай архив` is projected, its reminders should include the compact owner-derived rule:

```text
An earlier-message archive is not current automatically.
A source archive attached with this command is current for this invocation.
Otherwise use fully readable current repository files.
Request a fresh archive only when size/tool limits prevent reliable reading.
The apply stage must still verify exact local base blobs before changes.
```

The full source-selection algorithm remains in `reviewable-agent-output-and-commands-workflow.md`.

## 9A. Four Planning Surfaces

```text
Orientation:
  explain planning architecture and select context;

Directions:
  project broad semantic Directions, topology and owner routes;

Use Cases:
  project independently useful supported capabilities;

Commands:
  project accepted repository command definitions reachable from the root UCM and their immediate execution permissions.
```

Only Commands request immediate execution.

## 9B. Shared Semantic Body Contract

Orientation:

```text
[PLANNING_ORIENTATION]
orientation_id:
  <ID>

orientation:
  <name>

mode:
  adaptive / full

source_of_truth:
  - `<root owner>`

read_rule:
  <adaptive/full>

instruction:
  <context-selection instruction>

user_target:
  <placeholder>
[/PLANNING_ORIENTATION]
```

Directions and Use Cases use the corresponding markers:

```text
[PLANNING_DIRECTION] ... [/PLANNING_DIRECTION]
[PLANNING_USE_CASE] ... [/PLANNING_USE_CASE]
```

Each body identifies the registry entry and complete owner route.

## 9C. Shared Adaptive / Full Semantics

Adaptive:

```text
reuse current remembered context only while clearly sufficient;
reread entry/owner when not read, forgotten, uncertain,
possibly changed or explicitly requested.
```

Full:

```text
always reread the complete selected entry and relevant owner route;
read relevant parent/root entry when needed;
do not expand into unrelated repository families;
do not expand permissions.
```

One semantic definition generates both variants.

## 9D. Duplicate Use-Case / Command Boundary

```text
command is the practical entry point:
  Use Cases surface shows Open Commands;
  no duplicate execution-like prompt;

command covers only one stage of a broader use case:
  retain the broader Use Case context entry;
  state the limited command relationship.
```

Current application:

```text
Reconcile Planning Items
  → Open Commands / `сверь айтемы`;

Form Planning Items From Discussion
  → Open Commands / `сформируй айтемы`;

Planning Meaning To Repository
  → remains a broader Use Case;
  → `сверь айтемы` covers only its reconciliation stage.
```

## 9E. Item-Formation Boundary

`Form Planning Items From Discussion` is linked to the accepted repository command definition:

```text
сформируй айтемы
English name: form items
```

The Use Cases surface uses **Open Commands** rather than inserting a duplicate execution-like prompt.

## 9F. Initial Semantic Inventory

Directions:

```text
DIR-PLAN-SOLUTION
DIR-DETAILED-SDS
DIR-MAINTAIN-DOCS-ROUTES
DIR-DOCUMENTATION-WORKBENCH
```

Use Cases:

```text
UC-AP-REALITY
UC-AP-FORM-ITEMS → Commands redirect
UC-AP-FULL-PICTURE
UC-AP-RECONCILE → Commands redirect
UC-AP-RESEARCH
UC-AP-SCENARIO
UC-AP-DOMAIN
UC-AP-SLICE
UC-AP-SDS-CONSISTENCY
UC-DW-DOC-REF
UC-DW-ITEM-FULL-PICTURE
UC-DW-STRUCTURED-MESSAGE
```

Chat/AI/Work-State remains provisional and is not projected as accepted.

## 9G. Multi-Surface UI Contract

```text
tabs:
  Orientation;
  Directions;
  Use Cases;
  Commands;

search:
  current surface only;

entry controls:
  main button = Adaptive insert;
  Full = Full insert;
  Copy = Adaptive copy;

command-related Use Case:
  Open Commands;

command refinement:
  Cmd fmt for `давай архив`.
```

Preserve the draggable panel, `Alt+F2`, Dashboard toggle/launcher coordination, composer insertion, clipboard fallback and single-instance behavior.

## 9H. Non-Reentrant Composer Insertion

A command click must remain responsive and produce at most one insertion.

Normal path:

```text
exact ChatGPT composer selector
  → one animation-frame yield
  → one direct insertion attempt
  → success status;
```

Fallback path:

```text
exact selector unavailable or insertion fails
  → copy the command body once
  → report manual-paste fallback
  → do not retry composer mutation in a loop.
```

Required invariants:

- exact selectors are tried before broad compatibility selectors;
- broad fallback does not sort candidates through repeated layout reads;
- `textContent` or native input value is preferred over `innerText` for reading current draft state;
- one shared busy lock disables insertion controls during mutation;
- rapid double clicks cannot duplicate the body;
- timing diagnostics record command ID, selector path, draft/body length and find/read/insert durations in the console;
- diagnostics remain local and perform no external network call;
- modular composer insertion preserves success, composer-not-found, contenteditable-rejected and mutation-exception timing/reason diagnostics without adding retry loops;
- a static fix is not considered live resolution until browser testing confirms the reported freeze is gone.

## 9I. Local Command Snapshot And Create-Only Backup

```text
bundled catalog
  = valid planning/commands/*.command.md files at build time;

local snapshot / RAM
  = normal Planning Helper runtime data source;

ChatGPT recovery
  = ChatGPT reads repository files and returns the complete current marker set;
  = helper Restore reconciles repository-backed local records to that complete pasted set;
  = stale repository-backed records absent from the complete set are removed locally;
  = local-only/unbacked records are preserved;
  = Restore performs zero GitHub requests;

Import from ChatGPT
  = existing local records update locally only;
  = locally new/unbacked records may attempt one create-only repository PUT.
```

Planning Helper has no repository Refresh/Sync/read operation. A create-only backup does not list/read the target first, does not read it back after the PUT, and never falls through to update/delete. An already-existing path is a conflict and leaves local state intact. Repository settings/token exist only for create-only backup and for generating the ChatGPT recovery request. Local Git, commit and push remain outside this surface.

The GitHub token belongs only to Planning Helper GM secret state and never to command definitions, generated userscript content or the local snapshot.

## 10. Placement

The reusable helper source/build lives at:

```text
planning/documentation/tools/tampermonkey/chat-command-palette/
```

The generated install artifact lives at:

```text
planning/documentation/tools/tampermonkey/chat-command-palette.user.js
```

Do not edit the generated userscript manually and do not create a competing tracked helper copy.

## 11. Do Not

```text
- Do not project commands without an accepted repository command definition reachable from the root UCM.
- Do not make Orientation, Direction or Use-Case activation execute a command or grant permissions.
- Do not duplicate a command-related Use Case as an execution action.
- Do not project provisional Chat/AI/Work-State as accepted.
- Do not make source modules, the generated userscript or the local/remote catalog cache a command or English-name source of truth.
- Do not put per-invocation read-mode policy into the root UCM.
- Do not create separate command-definition copies for adaptive, full or refinement variants.
- Do not put owner or archive-format rules into refinement bodies; only list route/owner docs and the requested validation action.
- Do not keep competing tracked helper copies by default.
- Do not silently change command meaning while adding UI controls.
- Do not treat Full as permission to read unrelated repository files.
- Do not recreate a `Docs` refinement when the standalone documentation-principles command is projected.
- Do not retain removed creation-wording IDs, labels or aliases for `спланируй команду`.
```

## Local Helper Commands And Prompts

The planning-command projection and helper local library remain separate surfaces.

```text
Commands
  → repository planning-command definitions as semantic authority;
  → browser-local snapshot/RAM at runtime;

Local Cmds
  → exact user-authored insertion text;
  → browser-local snapshot/RAM at runtime;

Prompts
  → arbitrary exact prompt text;
  → browser-local snapshot/RAM at runtime.
```

A helper command/prompt never becomes a registered planning command merely because a repository backup file exists. `Import from ChatGPT` can create an append-only/cold repository backup only when the item is locally new/unbacked; later edits remain local. `Restore from GitHub copy` is a pasted-text local restore that reconciles the repository-backed portion to the complete GitHub-derived set, preserves local-only/unbacked records, and performs no network request.

The modular helper may migrate legacy page-local/GM command-library caches into `obsPlanningHelper:v2:localSnapshot`. Migration does not delete legacy keys and does not contact GitHub.

Every Insert starts copying the exact body to the system clipboard before composer mutation and inserts that same exact RAM string. If direct insertion fails, the clipboard already contains the body for manual paste. Browser synthetic clipboard paste is not relied on.
