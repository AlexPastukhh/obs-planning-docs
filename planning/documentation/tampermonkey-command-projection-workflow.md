# Tampermonkey Planning Surface Projection Workflow

Status: active reusable documentation-layer workflow
Doc version: v1.5.0-command-owned-refinements
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
  planning/command-routing.md

Concrete command authority:
  planning/commands/*.command.md

Behavior authority:
  linked owner workflow/template/area docs

Projection implementation source/build:
  planning/documentation/tools/tampermonkey/chat-command-palette/

Planning Helper application semantics:
  planning/documentation/tools/tampermonkey/chat-command-palette/scenarios/README.md
  → planning/documentation/tools/tampermonkey/chat-command-palette/scenarios/README.md

Generated install artifact:
  planning/documentation/tools/tampermonkey/chat-command-palette.user.js

Helper local-library contract:
  planning/helper-library/README.md

Helper local-library repository records:
  planning/helper-library/commands/*.helper-command.md
  planning/helper-library/prompts/*.prompt.md
```

The helper must not invent command meaning, permission boundaries, aliases or English display names. It parses accepted repository command definitions and generates runtime bodies from them.

The root Command Routing is the mandatory command-system entry/global-policy owner. The selected direct command definition owns the concrete route fields and points to the files needed for understanding. Neither file needs to encode which read/refinement button the user chose for one palette insertion.

## 2. Before Adding Or Updating A Command

Check:

```text
1. The root Command Routing is present as the command-system entry.
2. The selected direct `planning/commands/*.command.md` definition exists and validates.
3. The definition has one canonical English name and unique aliases.
4. Owner docs for the route exist.
5. Permission boundary is explicit.
6. Inserted body points back to the root Command Routing, selected command definition and owner docs.
7. Projected englishName exactly matches the command-definition English name.
8. Button label uses <englishName> · <label>.
9. Adaptive and forced-full variants are generated from the same command definition.
10. A command-specific refinement, when present, only points to route/owner docs to reread and states the validation action.
```

If the browser-local snapshot is missing repository records, use the explicit `Check GitHub` / `Sync missing` application actions to compare direct path/name inventories and download only repository-only records. The ChatGPT recovery request + pasted Restore flow remains an offline/manual fallback. Rebuild/reinstall is required only when helper source/runtime changes or when the bundled fallback itself must be refreshed; do not edit the generated artifact to match command data.

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
  Start from `planning/command-routing.md`.
  Then read the selected `planning/commands/*.command.md` definition.
  Then read its owner / linked files.

route_read_rule:
  If you have not read this command route and its linked owner/example files in this chat, read them before answering.
  If you have read them but do not remember the required behavior, boundaries or key points, reread from `planning/command-routing.md` before answering.
  Do not rely only on this prompt when command behavior is uncertain.
```

This variant leaves the freshness decision to the chat. Recently verified context may be reused only while behavior, boundaries and key points remain clear.

## 5. Forced Full Route-Read Variant

A separate `Full` action inserts the same command with an explicit fresh-read requirement.

```text
source_of_truth:
  Start from `planning/command-routing.md`.
  Then read the selected `planning/commands/*.command.md` definition.
  Follow that definition's complete required owner route.

route_read_rule:
  Full route reading is required for this invocation.
  Read the root Command Routing, then the selected command definition in `planning/commands/`.
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

Refinement control:
  render only when the selected direct command definition declares a refinement;
  use that definition's compact label/readRequired/instruction;
  current `давай архив` declares no refinement because its producer route does not emit local PowerShell apply/diff commands

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

### Reusable documentation bootstrap command

Project the accepted repository command definition as one command profile with stable ID:

```text
id:
  documentation_principles.read

command:
  бутстреп документации

englishName:
  bootstrap reusable documentation principles

commandFamily includes:
  `бутстреп документации` / `бутстреп принципов документации` / `режим документации` / `прочитай принципы документации` / `read documentation principles` / `documentation governance mode`
```

The row uses the normal adaptive, `Full` and `Copy` controls. Do not create a second governance/bootstrap command identity for the same capability. Do not add a separate `Docs` refinement to `спланируй команду`; the bootstrap command already owns that user-facing route, while the plan-command owner still requires the preflight internally.

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
  - `planning/command-routing.md`
  - `planning/documentation/reviewable-agent-output-and-commands-workflow.md`
  - `planning/documentation/documentation-update-workflow.md`

instruction:
  Reread these files, validate every user-facing PowerShell Git command in the current answer against their archive command-format and source-selection rules, and rewrite any non-compliant command.

[/PLANNING_COMMAND_REFINEMENT]
```

## 8. English Name Synchronization

```text
- The root Command Routing is the mandatory command-system entry/global-policy owner.
- The selected command definition is authoritative for its canonical English name.
- Projected englishName must exactly match that command definition.
- inserted english_name must use the same value.
- button label must use the same value.
- aliases may differ and remain in command_family.
- do not abbreviate, transliterate or normalize an English name only inside the helper.
```

Repository command definitions are not fetched automatically. An explicit `Check GitHub` compares inventory metadata; `Sync missing` downloads only repository command paths absent locally; `Save GitHub` explicitly creates/updates one local command with current remote state/SHA validation. Same-path local records are not overwritten by Sync missing. Rebuilding/reinstalling is required only when helper source/runtime changes or when the bundled offline fallback itself must be refreshed.

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
  project accepted repository command definitions reachable from the root Command Routing and their immediate execution permissions.
```

Only Commands request immediate execution.

A Use-Case insertion **activates semantic focus**, not command permission. The inserted body must let a new chat resolve the exact current registry entry and then follow that entry's current owner route instead of depending on a historical hard-coded owner list embedded in the Helper. Neighboring planning responsibilities are inputs/integration context unless the selected Use Case routes into them.

Semantic projection is a derived helper view. The canonical registries remain authority. Repository verification must check exact-case source paths and registry parity so every current canonical Use Case is projected and no helper-only semantic UC appears.

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

Directions use the corresponding marker:

```text
[PLANNING_DIRECTION] ... [/PLANNING_DIRECTION]
```

A non-command semantic Use Case uses this focused contract:

```text
[PLANNING_USE_CASE]
use_case_id:
  <stable canonical UC ID>

use_case:
  <current semantic name>

mode:
  adaptive / full

focus:
  Work in this Use Case. Neighboring responsibilities are inputs/integration
  context unless the selected owner route explicitly requires them.

source_of_truth:
  - `<canonical Use-Case registry>`

route_resolution:
  Resolve this exact current Use-Case entry. Follow its current Main Owner /
  Owner Route and then the current owner links/read-order to every principle,
  workflow, template and integration rule materially defining this Use Case.
  Do not treat this Helper body as a frozen list of all future owner paths.

read_rule:
  <adaptive/full semantics>

instruction:
  <UC-specific compact instruction>

permission:
  Semantic planning/read context only. Use-Case activation does not grant
  executable-command, repository-mutation, archive, commit or push permission.

user_target:
  <placeholder>
[/PLANNING_USE_CASE]
```

Each semantic body identifies the stable registry entry and tells the chat to resolve the **current** complete owner route.

## 9C. Shared Adaptive / Full Semantics

Adaptive:

```text
reuse current remembered context only while clearly sufficient;
resolve/reread the selected registry entry and owner route when not read,
forgotten, uncertain, possibly changed or explicitly requested;
keep the selected Use Case as the active focus.
```

Full:

```text
always reread the complete selected registry entry;
follow the current complete owner route through materially defining
principles/workflows/templates/integration rules;
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
Collect And Review Ideas From Selected Source
  → Open Commands / `собери идеи`;

Planning Meaning To Repository
  → remains a broader Use Case;
  → uses generic Idea review when material, not an item-reconciliation command.
```

## 9E. Idea-Collection Boundary

`Collect And Review Ideas From Selected Source` is linked to the accepted repository command definition:

```text
собери идеи
English name: collect ideas
```

The Use Cases surface uses **Open Commands** rather than inserting a duplicate execution-like prompt. The command routes to the generic Idea methodology and does not recreate a Planning Item formation layer.

## 9F. Semantic Inventory Source

The helper semantic inventory is a projection of the current canonical Direction/Use-Case Registries. Do not maintain a second hand-written list here.

Required invariant:

```text
canonical registries
→ semantic-projections.js
→ tests verify exact projected UC set and exact-case source paths
```

`UC-DOC-ORIENT` projects to the stable command ID `documentation_principles.read`; `UC-DOC-MAINTAIN-NAVIGATION` is a normal semantic Use Case without a direct command.

Workspace/methodology semantic projection must follow the current canonical Use-Case Registries exactly. Application Directions are navigation-only on the helper semantic surfaces and route to their Scenario Catalogs; their application Scenarios do not become Workspace Use Cases. New canonical Workspace UCs appear through parity checks, while ordinary discovery techniques are not projected as UCs merely because documentation names them.

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
  optional and command-definition-owned; absent when `refinements` is empty.
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

## 9I. RAM-First Snapshot And Explicit Repository Sync

```text
bundled catalog
  = valid planning/commands/*.command.md files at build time;

local snapshot / RAM
  = normal Planning Helper runtime data source;
  = startup/search/tab/Insert/Copy/edit/delete/import do not read GitHub;

Check GitHub
  = explicit repository metadata listing;
  = compare local/GitHub counts and deterministic path/name sets for planning commands, helper commands and prompts; same-path is inventory overlap, not content equality;
  = no local mutation;

Sync missing
  = explicit repository read;
  = GET only GitHub paths that do not exist locally;
  = parse/validate and add them to the local snapshot;
  = never overwrite a same-path local record;

Save GitHub
  = explicit one-record persistence;
  = create when target is absent;
  = no-op when exact rendered content already matches;
  = update with current remote SHA when different;
  = exact read-back verification after write;

ChatGPT recovery
  = manual/offline fallback that returns the complete current marker set;
  = pasted Restore performs zero GitHub requests.
```

Planning-command Save GitHub validates the complete direct remote command catalog before writing. Helper-command/prompt Save GitHub is confined to its deterministic helper-library path. Repository deletion is not implemented; local Delete remains local-only. All GitHub operations share one serialized explicit-operation lock and remain outside composer insertion.

The GitHub token belongs only to Planning Helper GM secret state and never to command definitions, helper-library files, generated userscript content or the local snapshot.

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
- Do not project commands without an accepted repository command definition reachable from the root Command Routing.
- Do not make Orientation, Direction or Use-Case activation execute a command or grant permissions.
- Do not duplicate a command-related Use Case as an execution action.
- Do not project provisional Chat/AI/Work-State as accepted.
- Do not make source modules, the generated userscript or the local/remote catalog cache a command or English-name source of truth.
- Do not put per-invocation read-mode policy into the root Command Routing.
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

A helper command/prompt never becomes a registered planning command merely because a repository file exists. `Import from ChatGPT` remains local-only. `Check GitHub`, `Sync missing` and per-row `Save GitHub` are explicit application actions defined by `chat-command-palette/scenarios/README.md`; repository Delete is not implemented. `Restore from GitHub copy` remains a pasted-text local fallback that performs no network request.

The modular helper may migrate legacy page-local/GM command-library caches into `obsPlanningHelper:v2:localSnapshot`. Migration does not delete legacy keys and does not contact GitHub.

Every Insert starts copying the exact body to the system clipboard before composer mutation and inserts that same exact RAM string. If direct insertion fails, the clipboard already contains the body for manual paste. Browser synthetic clipboard paste is not relied on.

Testing Planning Workspace UCs and `UC-DOC-CONFIGURE-REVIEW-DEPENDENCIES` are valid semantic projections. Planning Helper and Linked Notes application behavior is routed through their Scenario Catalogs rather than projected as Workspace Use Cases. Replacement Package App remains an explicit unmigrated exception until separately selected.
