# APP-STL — Study Tab Launcher Application Definition

Status: selected upstream Application intent. This owner may lead downstream realization; current Feature/Scenario/Screen/Domain/Slice/Shared owners remain realized truth, and selected unrealized succession meaning remains in its Evolution Step. This is a dated independent copied example, not live Launcher authority.

**Need / trusted intent:** reduce repeated navigation from one explicitly selected local file/project reference to its VS Code context while preserving user, host and external-producer authority.

## RU-APP-05 — Application Concept

**Methodology:** [Application Concept](../../../../../target-modules/TM-APPLICATION-DEFINITION.md#application-concept).

**Summary:** Study Tab Launcher is a small local bridge between an externally selected file/project reference and its corresponding VS Code context; it removes repeated navigation without choosing the person's work.

**How it roughly works:** an optional browser helper turns copied plain paths or a project selector into a small fixed set of explicit actions. The VS Code extension validates local authority, performs the selected safe operation and reports what happened. A selected but unrealized future transition may coordinate exact superseded project windows only after a replacement opens.

Choosing work, inspecting study content, scheduling study and mutating planning state remain outside the Application.

## RU-APP-02 — Existing-Solution / Reference Position

**Methodology:** [Existing-Solution / Reference Position](../../../../../target-modules/TM-APPLICATION-DEFINITION.md#existing-solutions--market--reference-research).

The selected contribution composes browser clipboard access, VS Code extension URIs, a loopback-only coordinator and VS Code's file/window/trust facilities. Each covers part of the route; none alone preserves the explicit selection-to-local-context handoff described here. A small integration remains justified without replacing ChatGPT, VS Code, its native trust/dirty-editor authority or the user's selection. This is the existing local utility's evidence-backed position, not a general market-uniqueness claim.

<a id="own-application-justification-key-behavior-focus"></a>
## RU-APP-08 — Own-Application Justification / Key Behavior Focus

**Methodology:** [Own-Application Justification / Key Behavior Focus](../../../../../target-modules/TM-APPLICATION-DEFINITION.md#own-application-justification-key-behavior-focus).

**Own-Application Justification:** the actor already selects useful local context elsewhere but repeated navigation, ambiguous folder/ZIP state and safe local handoff require coordination across browser, OS and VS Code facilities. The small own Application contributes exact, explicit and truthful handoff while leaving file choice and host decisions outside it. Its future succession coordination is a selected extension of the same bounded local-context purpose, not current behavior.

<a id="kbf-stl-selected-local-context-01"></a>
### KBF-STL-SELECTED-LOCAL-CONTEXT-01 — Establish explicitly selected local context

The central selected contribution is to carry one externally chosen file or ordered file set, folder or ZIP project selector through a user-chosen action to the intended VS Code context with a truthful outcome. The Application does not infer or rank files, choose an arbitrary command from clipboard text, widen exact bounded source discovery, grant Workspace Trust, decide dirty-editor policy or guarantee OS foreground. [File](scenarios/open-selected-study-files.md), [project](scenarios/open-selected-project.md), [folder](scenarios/open-selected-folder.md) and [archive](scenarios/open-downloaded-archive.md) Scenarios own the distinct normative paths; their Features own detailed behavior.

<a id="kbf-stl-safe-project-publication-02"></a>
### KBF-STL-SAFE-PROJECT-PUBLICATION-02 — Preserve a source while publishing a chosen child

For a separately selected trusted-copy action, reuse an exact safe existing child unchanged or require visible user confirmation before publishing a complete child below a locally configured parent, then open that result truthfully. The source stays intact; browser/request data cannot choose the parent or trust state; no merge/overwrite or implicit trust grant occurs. [Copy trusted project](scenarios/copy-trusted-project.md) owns the journey and its Feature/Shared/Domain owners own realization.

<a id="kbf-stl-bounded-succession-03"></a>
### KBF-STL-BOUNDED-SUCCESSION-03 — Optional post-open predecessor-window retirement

Selected upstream intent permits a user, after a replacement project has opened, to retain exact eligible participating predecessor windows or explicitly request bounded close attempts. The replacement remains open and partial cleanup remains truthful. Package authors may declare exact sibling candidates but cannot close arbitrary windows; user and each VS Code instance retain confirmation, root/dirty-state authority. This focus is **unrealized**: its complete future Scenario/Feature/Domain/Slice Target Bodies remain in [EVO-STL-CLOSE-SUPERSEDED-PROJECT-WINDOWS](evolution/unrealized/close-superseded-project-windows.md). It does not create a current close capability.

These three focuses explain why this own Application is retained; they do not predetermine Feature boundaries. The former `AB-STL-01..04` source clauses were re-expressed into these focuses and the linked natural downstream owners (file + project → KBF-01; trusted-copy publication → KBF-02; selected future succession → KBF-03). Former Benefit IDs/anchors are dated source history, not current Application drivers or a duplicate Benefit catalog. Detailed path/branch/continuity and independently needed `SR-*` belong to the Scenario owners. Driver coverage belongs to the [Evolution Steps Map](evolution-steps.md#ru-evomap-03--application-driver-coverage), not an `RU-APP-04` Unit.

## RU-APP-07 — Realization Feasibility / Early Implementation Planning

**Methodology:** [Realization Feasibility](../../../../../target-modules/TM-APPLICATION-DEFINITION.md#realization-feasibility).

Current extension/userscript representation demonstrates file, folder, ZIP, adaptive-project and trusted-publication realization with substantial automated coverage. Browser external-protocol confirmation, Windows foreground policy, VS Code multi-window routing and Workspace Trust remain host-owned constraints requiring [installed observation](practical-tests/installed-browser-vscode-handoff.md).

The current coordinator proof exposes [P-STL-HANDOFF-01 — Coordinator acknowledgement/redemption race](shared/prepared-project-handoff.md#p-stl-handoff-01). Deterministic prepared-handoff realization remains an explicit correction/proof obligation, not blanket green status. Bounded future succession appears plausible through cooperating extension instances, but implementation, deterministic proof and installed multi-window evidence are pending; no future Target Body becomes current by selection alone.

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
Concept, own-Application justification, key behavior focus and feasibility meaning, not those literal
details or downstream realized behavior.
