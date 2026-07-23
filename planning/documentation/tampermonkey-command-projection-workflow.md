# Tampermonkey Planning Surface Projection Workflow

Status: active reusable documentation-layer workflow
Doc version: v1.0.0-form-items-and-nonblocking-insertion
Scope: reusable rules for projecting accepted project Orientation, semantic Direction/Use-Case registries, command routes and owner-read refinements into the Tampermonkey/ChatGPT planning helper UI.

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

Command routing and canonical English name authority:
  planning/planning-use-case-map.md

Behavior authority:
  linked owner workflow/template/area docs

Projection implementation:
  planning/documentation/tools/tampermonkey/chat-command-palette.user.js
```

The helper must not invent command meaning, permission boundaries, aliases or English display names.

The root UCM owns the complete route and points to the files needed for understanding. It does not need to encode which read/refinement button the user chose for one palette insertion.

## 2. Before Adding Or Updating A Command

Check:

```text
1. The command route exists in the project root UCM.
2. The route has one canonical English name.
3. Owner docs for the route exist.
4. Permission boundary is explicit.
5. Inserted body points back to the root UCM and owner docs.
6. profile.englishName exactly matches the UCM English name.
7. Button label uses <englishName> · <label>.
8. Adaptive and forced-full variants are generated from the same command definition.
9. A command-specific refinement, when present, only points to route/owner docs to reread and states the validation action.
```

If the userscript has an older label/name than the accepted UCM route, treat the userscript as stale projection and plan a separate implementation update. Do not change the UCM back to match stale helper code.

## 3. Shared Inserted Body Contract

Use a project-neutral marker, not an Enman-specific marker.

```text
[PLANNING_COMMAND]
Read this whole command body before answering.
Do not ignore `key_reminders`.

command:
  <canonical command from root UCM>

english_name:
  <canonical English name from root UCM>

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
  Then read the owner / linked files for this command route.

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
  Follow the complete required route for this command.

route_read_rule:
  Full route reading is required for this invocation.
  Read the relevant command entry in `planning/planning-use-case-map.md`.
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

Project the accepted UCM route as its own command profile:

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

Do not retain creation-wording IDs, labels or aliases after the root UCM removes them.

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
- Root UCM is authoritative.
- profile.englishName must exactly match the UCM English name.
- inserted english_name must use the same value.
- button label must use the same value.
- aliases may differ and remain in command_family.
- do not abbreviate, transliterate or normalize an English name only inside the helper.
```

A batch that changes a UCM English name but defers userscript implementation must report the helper as a known stale projection until the follow-up batch is applied.

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
  project accepted UCM routes and immediate execution permissions.
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

Planning Item And Full Picture End-To-End Workflow
  → remains a broader Use Case;
  → `сверь айтемы` covers only reconciliation.
```

## 9E. Item-Formation Boundary

`Form Planning Items From Discussion` is linked to the accepted root UCM command:

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
- a static fix is not considered live resolution until browser testing confirms the reported freeze is gone.

## 10. Placement

The reusable full helper lives at:

```text
planning/documentation/tools/tampermonkey/chat-command-palette.user.js
```

Do not create a tracked local `tools/tampermonkey/` copy by default.

## 11. Do Not

```text
- Do not add helper commands without UCM routes.
- Do not make Orientation, Direction or Use-Case activation execute a command or grant permissions.
- Do not duplicate a command-related Use Case as an execution action.
- Do not project provisional Chat/AI/Work-State as accepted.
- Do not make the userscript a command or English-name source of truth.
- Do not put per-invocation read-mode policy into the root UCM.
- Do not create separate command-definition copies for adaptive, full or refinement variants.
- Do not put owner or archive-format rules into refinement bodies; only list route/owner docs and the requested validation action.
- Do not keep competing tracked helper copies by default.
- Do not silently change command meaning while adding UI controls.
- Do not treat Full as permission to read unrelated repository files.
- Do not recreate a `Docs` refinement when the standalone documentation-principles command is projected.
- Do not retain removed creation-wording IDs, labels or aliases for `спланируй команду`.
```
