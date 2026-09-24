# APP-STL — Study Tab Launcher Application Definition

Status: selected upstream application intent. This owner may state selected or
possible Application Benefits before downstream realization. Current Feature,
Scenario, Screen, Domain, Slice and Shared owners retain realized meaning;
selected unrealized downstream meaning remains inside its Evolution Step.

**Need / upstream driver refs:** trusted explicit user intent in this repository: reduce repeated local navigation while preserving explicit user authority. The Benefit-local boundaries below state the detailed promises and constraints.

## RU-APP-05 — Application Concept

**Methodology:** [RU-APP-05 Unit Definition](../../../../../target-modules/TM-APPLICATION-DEFINITION.md#application-concept).

**Summary:** Study Tab Launcher is a small local bridge that removes repeated
navigation between an externally selected file/project reference and the
corresponding VS Code context while preserving explicit user and host
authority.

**How it roughly works:** an optional browser helper turns copied plain paths or one
project selector into one of a small fixed set of actions. The VS Code
extension validates local authority, performs the selected safe file/project
operation and reports what actually happened. Optional future post-open
cleanup may coordinate only exact participating superseded project windows.

The contribution stays limited to explicitly selected local context; choosing work, inspecting study content, scheduling study or mutating planning state is outside it. Detailed authority and safety constraints remain with the [Application Benefits](#ru-app-03--application-benefits).

## RU-APP-02 — Existing-solution / reference position

**Methodology:** [RU-APP-02 Unit Definition](../../../../../target-modules/TM-APPLICATION-DEFINITION.md#existing-solutions--market--reference-research).

Disposition: resolved and kept in this owner; a separate comparison artifact
would add no current decision value for this local utility.

The selected contribution composes browser clipboard access, VS Code extension
URIs, a loopback-only coordinator and VS Code's own file/window/trust
facilities. Each existing facility covers part of the route, but none alone
preserves the complete explicit selection-to-local-context handoff. A small
integration therefore remains justified; replacing VS Code, ChatGPT or their
native trust/dirty-editor authority does not.

<a id="ru-app-03--application-benefits"></a>
## RU-APP-03 — Application Benefits

**Methodology:** [RU-APP-03 Unit Definition](../../../../../target-modules/TM-APPLICATION-DEFINITION.md#application-benefits).

Each Benefit owns its own boundary and Benefit-specific constraints. Links to
a Benefit may target an exact boundary/constraint anchor when a downstream
owner realizes only part of the Benefit.

<a id="ab-stl-01--open-selected-file-context"></a>
### AB-STL-01 — Open selected file context

**Planning position:** `Selected`.

**User Need:** after selecting one local file or an ordered file set in an
external context, avoid locating the same files manually in VS Code and retain
the intended order and action choice.

**User Receives:** one explicit action establishes the selected file context in
a receiving VS Code window under a button-selected tab policy and reports the
actual result.

**Responsibility Boundary / Constraints:**

- <a id="ab-stl-01-boundary-owned-handoff"></a>**Application-owned
  contribution:** preserve the explicit target set/order, validate eligible
  local files, apply the selected one/set and tab-policy action, hand the
  request to VS Code and report completion or non-success truthfully.
- <a id="ab-stl-01-boundary-external-authority"></a>**External authority:**
  the user/external producer chooses the file context; VS Code owns dirty-file
  decisions, editor associations and physical tab layout; browser/OS policy
  may govern visible foreground transfer.
- <a id="ab-stl-01-constraint-explicit-selection"></a>**Benefit constraint —
  explicit selection only:** the application does not discover, rank, infer or
  inspect files to choose the user's context, and copied text cannot select an
  arbitrary command or hidden policy.
- <a id="ab-stl-01-constraint-local-file-scope"></a>**Benefit constraint —
  local-file scope:** an explicitly addressed existing regular local file may
  be outside this repository; directories, missing/remote targets and an
  invalid member of a requested set do not produce a falsely complete result.

<a id="ab-stl-02--open-a-local-project-source"></a>
### AB-STL-02 — Open a local project source

**Planning position:** `Selected`.

**User Need:** open a downloaded or otherwise known local project without
manually determining whether its usable source is an existing directory or a
ZIP that has arrived or will arrive shortly.

**User Receives:** one explicit project action resolves the exact permitted
source, waits for bounded delayed arrival when requested, and opens the folder
or a safely materialized ZIP project in a project window with a truthful
result.

**Responsibility Boundary / Constraints:**

- <a id="ab-stl-02-boundary-selector-resolution"></a>**Application-owned
  contribution — selector continuity:** preserve one explicit selector,
  resolve only its permitted folder/ZIP candidates, optionally await pure
  absence for the configured bound and keep the browser-to-VS Code operation
  correlated through completion.
- <a id="ab-stl-02-boundary-folder-branch"></a>**Application-owned
  contribution — folder branch:** validate the resolved local directory and
  request that VS Code open it as a project without replacing the previous
  workspace.
- <a id="ab-stl-02-boundary-archive-branch"></a>**Application-owned
  contribution — archive branch:** preserve the ZIP, safely reuse an existing
  eligible sibling or publish a complete bounded extraction, then request that
  VS Code open the final directory.
- <a id="ab-stl-02-boundary-external-authority"></a>**External authority:**
  the user/external producer supplies the selector and chooses the action; the
  user configures browser search/wait preferences; VS Code and the OS retain
  final window, foreground, dirty-editor and Workspace Trust authority.
- <a id="ab-stl-02-constraint-exact-bounded-discovery"></a>**Benefit
  constraint — exact bounded discovery:** search is neither recursive nor
  fuzzy and does not widen beyond the exact selector and its single permitted
  implicit `.zip` candidate.
- <a id="ab-stl-02-constraint-safe-project-effect"></a>**Benefit constraint —
  safe project effect:** extraction does not merge/overwrite or escape its
  bounded destination, opening does not grant Workspace Trust, and preparation
  or focus acceptance alone is not reported as a completed project open.

<a id="ab-stl-03--publish-under-a-chosen-parent"></a>
### AB-STL-03 — Publish under a chosen parent

**Planning position:** `Selected`.

**User Need:** preserve a downloaded folder/ZIP source while obtaining a
separate usable project child below a locally chosen parent.

**User Receives:** an existing safe child is reopened unchanged, or an absent
child is explicitly confirmed, completely published and opened, with the final
path and actual outcome retained when useful.

**Responsibility Boundary / Constraints:**

- <a id="ab-stl-03-boundary-owned-publication"></a>**Application-owned
  contribution:** resolve the selected source, derive one child below the
  machine-configured parent, obtain publication confirmation when the child is
  absent, safely reuse or publish it, open the final child and report the
  actual disposition.
- <a id="ab-stl-03-boundary-external-authority"></a>**External authority:**
  the user selects the source, configures the parent in VS Code and confirms
  absent-child publication; the user and VS Code remain authoritative for
  whether that location is trusted and for dirty/window decisions.
- <a id="ab-stl-03-constraint-destination-authority"></a>**Benefit constraint
  — destination authority:** browser/request/workspace input cannot override
  the machine-configured parent, derived child or trust policy.
- <a id="ab-stl-03-constraint-source-preservation"></a>**Benefit constraint —
  source preservation:** publication preserves the source, never merges or
  overwrites the child and reuses only an exact safe existing directory
  unchanged.
- <a id="ab-stl-03-constraint-trust-neutrality"></a>**Benefit constraint —
  trust neutrality:** the application neither grants nor claims Workspace
  Trust; inherited trust-by-location remains a VS Code/user decision.

<a id="ab-stl-04--retire-superseded-project-windows"></a>
### AB-STL-04 — Retire superseded project windows

**Planning position:** `Selected`.

**User Need:** after successfully opening a replacement project package, avoid
manually finding and closing exact older project windows that the replacement
declares obsolete.

**User Receives:** when exact eligible participating windows exist, the user
can explicitly choose whether to retain them or request bounded close attempts,
while the replacement remains open and partial cleanup stays truthful.

**Responsibility Boundary / Constraints:**

- <a id="ab-stl-04-boundary-manifest-candidates"></a>**Application-owned
  contribution — bounded candidates:** read only the fixed declaration in the
  final project root, normalize exact sibling project names and match only
  eligible participating VS Code windows.
- <a id="ab-stl-04-boundary-confirmed-coordination"></a>**Application-owned
  contribution — confirmed coordination:** after successful replacement open,
  show exact matches, honor Open Only/dismissal, and coordinate authenticated
  close attempts only after explicit Open and Close Previous confirmation.
- <a id="ab-stl-04-boundary-external-authority"></a>**External authority:**
  the package author may declare exact sibling names but cannot close windows;
  the user chooses whether cleanup proceeds, and each target VS Code instance
  owns root revalidation and dirty/save confirmation.
- <a id="ab-stl-04-constraint-no-general-close"></a>**Benefit constraint — no
  general close authority:** declarations cannot name arbitrary paths,
  commands, non-participating windows, remote/multi-root contexts or a
  different target at callback time.
- <a id="ab-stl-04-constraint-secondary-cleanup"></a>**Benefit constraint —
  secondary cleanup:** failed current-project handoff closes nothing; absent or
  invalid metadata, no matches, dismissal and partial close failure do not turn
  a successful replacement open into failure.
- <a id="ab-stl-04-constraint-trust-neutrality"></a>**Benefit constraint —
  trust neutrality:** succession metadata grants neither Workspace Trust nor
  authority to delete archives/files.

**Additional Info:** downstream realization is not current. Its complete
target state remains in
[EVO-STL-CLOSE-SUPERSEDED-PROJECT-WINDOWS](evolution/unrealized/close-superseded-project-windows.md)
until implementation and proof justify materialization.

## RU-APP-04 — Representative Real-Life Scenarios

**Methodology:** [RU-APP-04 Unit Definition](../../../../../target-modules/TM-APPLICATION-DEFINITION.md#representative-real-life-scenarios).

<a id="rls-stl-01"></a>
### RLS-STL-01 — Continue from a selected file context

**Actor / real-world situation:** a user receives one Markdown path or an
ordered group in a chat and wants to inspect that exact context locally.

1. The user selects and copies the intended path text.
2. **[Target contribution]** The user chooses one explicit file-context action;
   the application validates and exposes the selected context in VS Code.
   **[[AB-STL-01](#ab-stl-01--open-selected-file-context) manifests/closes
   for this invocation.]**
3. The user continues work or corrects a visible non-success.

<a id="rls-stl-02"></a>
### RLS-STL-02 — Open an arriving downloaded project

**Actor / real-world situation:** a user knows the name/path of a downloaded
folder or ZIP, which may still be arriving.

1. The user supplies the selector and chooses project opening.
2. **[Target contribution]** The application checks or boundedly waits for the
   exact source, opens the folder or safely materializes and opens the ZIP.
   **[[AB-STL-02](#ab-stl-02--open-a-local-project-source)
   manifests/closes on an actual open.]**
3. The user continues in the project while the previous context remains under
   VS Code control.

<a id="rls-stl-03"></a>
### RLS-STL-03 — Establish a separate working child

**Actor / real-world situation:** a user wants to retain a downloaded source
but work from a child below a locally configured parent.

1. The user selects the source and has already configured the parent in VS
   Code.
2. **[Target contribution]** The application reuses a safe existing child or
   asks before publishing an absent child, then opens the final directory.
   **[[AB-STL-03](#ab-stl-03--publish-under-a-chosen-parent)
   manifests/closes on an actual open.]**
3. VS Code exposes its actual Workspace Trust state; the application does not
   claim to have granted trust.

<a id="rls-stl-04"></a>
### RLS-STL-04 — Replace a versioned project and optionally retire predecessors

**Actor / real-world situation:** a newly downloaded project version declares
exact earlier sibling projects that it supersedes.

1. **[Target contribution]** The application first opens the replacement under
   the ordinary project Benefit.
   **[[AB-STL-02](#ab-stl-02--open-a-local-project-source) manifests.]**
2. **[Future Target contribution]** If exact participating previous windows
   match, the application offers Open Only or confirmed bounded close attempts.
   **[[AB-STL-04](#ab-stl-04--retire-superseded-project-windows)
   manifests/closes after the user's choice and truthful result.]**
3. The replacement stays open regardless of optional cleanup outcome.

This final RLS demonstrates selected future value; it does not state current
Feature or Scenario behavior.


## RU-APP-07 — Realization Feasibility

**Methodology:** [RU-APP-07 Unit Definition](../../../../../target-modules/TM-APPLICATION-DEFINITION.md#realization-feasibility).

Current extension/userscript representation supplies downstream realization
for the file, folder, ZIP, adaptive-project and trusted-publication Benefits,
with substantial automated coverage. Browser external-protocol confirmation,
Windows foreground policy, VS Code multi-window routing and Workspace Trust
remain host-owned constraints requiring live observation through
[`PTEST-STL-INSTALLED-HANDOFF`](practical-tests/installed-browser-vscode-handoff.md).

Current coordinator proof exposes the canonical
[`P-STL-HANDOFF-01 — Coordinator acknowledgement/redemption race`](shared/prepared-project-handoff.md#p-stl-handoff-01),
so deterministic prepared-handoff realization remains an explicit
correction/proof obligation rather than a blanket green claim.

The selected superseded-window Benefit is plausibly realizable only through
bounded cooperation between participating extension instances. It is not
represented as current behavior before its implementation, deterministic
proof and installed multi-window observation exist.

## Owner routes

- Current Features: [file context](features/open-linked-file-context.md),
  [project selection](features/open-local-project.md),
  [folder branch](features/open-linked-folder-window.md),
  [ZIP branch](features/extract-open-archive.md), and
  [trusted-copy publication](features/copy-trusted-project.md).
- Current Scenarios: [file](scenarios/open-selected-study-files.md),
  [project](scenarios/open-selected-project.md),
  [folder](scenarios/open-selected-folder.md),
  [ZIP](scenarios/open-downloaded-archive.md), and
  [trusted copy](scenarios/copy-trusted-project.md).
- Current Screen: [ChatGPT launcher widget](screens/chatgpt-launcher-widget.md).
- Current value semantics: [FileTarget](domain/local-file-target.md),
  [FolderTarget](domain/local-folder-target.md),
  [ZipArchiveTarget](domain/local-zip-archive-target.md), and
  [ProjectSelector](domain/local-project-selector.md).
- Current durable Slices: [file context](slices/open-linked-file-context.md),
  [folder](slices/open-linked-folder-window.md),
  [archive](slices/extract-open-archive.md),
  [adaptive project](slices/open-local-project.md), and
  [trusted copy](slices/copy-trusted-project.md).
- Current Shared capabilities:
  [local-path authority](shared/local-path-authority.md),
  [safe project publication](shared/safe-project-publication.md), and
  [prepared project handoff](shared/prepared-project-handoff.md).
- Future transition and realized lineage: [Evolution Steps Map](evolution-steps.md).

Exact wire formats, parsing, path normalization and executable evidence remain
implementation-native. This Application Definition owns application-level
need, Benefits and Benefit-local boundary/constraint meaning, not those literal
details or downstream realized behavior.
