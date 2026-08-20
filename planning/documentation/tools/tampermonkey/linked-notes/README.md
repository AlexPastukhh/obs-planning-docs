# OBS Linked Notes Prototype

Status: preliminary implementation prototype / browser and remote smoke testing pending
Version: `0.8.0-prototype`
Scope: local-first Tampermonkey repository documentation prototype with Notes, Files, Categories, repository templates, materialized Reference Objects, Ordered Reference Lists, stale-use diagnostics, Chat Response Reader, Full App State diagnostics and explicit verified GitHub actions.

This directory is the **current Linked Notes semantic/product/implementation documentation root**. Current application semantic identities are owned by the Scenario owners routed through [`scenarios/README.md`](scenarios/README.md). `planning/areas/documentation-workbench/` remains useful for broader planning/history/compatibility, but its Linked Notes-specific workflow files are no longer current behavior or Scenario authority.

The Tampermonkey prototype remains implementation evidence rather than accepted production architecture. Repository Markdown/files remain durable owners where the current contracts say they are.

## 1. Choose The Chat Role First

### Developer / implementation chat

If the task is to change, debug, understand or design Linked Notes itself, read in this order:

1. [`scenarios/README.md`](scenarios/README.md) — canonical Scenario Catalog and routes to current `SCN-LN-*` behavior owners with exact traceability.
2. [`APP-OVERVIEW.md`](APP-OVERVIEW.md) — current surfaces/actions and concise current behavior.
3. [`ARCHITECTURE.md`](ARCHITECTURE.md) — runtime layers, module families, build order and GitHub boundary.
4. [`DATA-AND-STATE.md`](DATA-AND-STATE.md) — repository truth, local persistence, runtime state, caches and secrets.
5. [`KNOWN-ISSUES.md`](KNOWN-ISSUES.md) — current implementation problems and evidence gaps.
6. [`ROADMAP.md`](ROADMAP.md) — future implementation directions, not current semantic authority.
7. Only then read the focused mapping/source/tests relevant to the task.

Do not infer current behavior from [`CHANGELOG.md`](CHANGELOG.md) alone. The changelog records how the prototype reached the current state.

### Repository-working / application-context chat

If the task is to work with repository files/content **inside a context where Linked Notes may consume that content**, do not read implementation architecture by default. Start at the repository-facing route:

1. [`.linked-notes/README.md`](../../../../../.linked-notes/README.md);
2. [`.linked-notes/AGENT-GUIDE.md`](../../../../../.linked-notes/AGENT-GUIDE.md);
3. only the applicable detailed agent-facing contract.

That route owns application-aware authoring rules such as Reference Objects, Ordered Reference Lists, repository templates and Reader-target response formatting.

## 2. Current Surfaces

```text
Workspace management
Notes
Files
Categories
Repository templates
Reference Objects
Ordered Reference Lists
Chat Response Reader
App State
```

The semantic relationship between these surfaces and current Scenarios is routed through [`scenarios/README.md`](scenarios/README.md); detailed behavior lives in the linked Scenario owners. Short current behavior is in [`APP-OVERVIEW.md`](APP-OVERVIEW.md).

## 3. Current Semantic And Detailed Owners

Current semantic/detail owners:

- [`scenarios/README.md`](scenarios/README.md) — canonical Scenario Catalog and navigation to detailed current Scenario behavior/traceability owners;
- [`APP-OVERVIEW.md`](APP-OVERVIEW.md) — current surface/product map.

Focused implementation mappings/checks:

- [`REFERENCE-OBJECTS-PROTOTYPE.md`](REFERENCE-OBJECTS-PROTOTYPE.md);
- [`CHAT-RESPONSE-READER.md`](CHAT-RESPONSE-READER.md);
- [`CHAT-RESPONSE-READER-CHECKLIST.md`](CHAT-RESPONSE-READER-CHECKLIST.md);
- [`FULL-APP-STATE-EXPORT.md`](FULL-APP-STATE-EXPORT.md);
- [`PROTOTYPE-CHECKLIST.md`](PROTOTYPE-CHECKLIST.md).

Repository-facing conventions consumed by the prototype live under the repository root [`.linked-notes/`](../../../../../.linked-notes/README.md). Content-working chats should enter through its `AGENT-GUIDE.md`; those contracts are separate from this developer/application documentation.

Former Linked Notes workflow documents under `planning/areas/documentation-workbench/` are retained as legacy planning/compatibility context. Do not route current Linked Notes semantics through them.

Traceability rule: do not leave a canonical `SCN-LN-*` with only shorthand such as “source/tests”. Its map entry should name the primary concrete files that currently implement and verify that user outcome. The list may be intentionally non-exhaustive when shared shell/infrastructure is already identified as cross-cutting.

## 4. Durable And Local Boundary

The short rule is:

```text
repository Markdown/files
  = durable repository truth;

IndexedDB / GM storage
  = recoverable local working/config/cache state;

runtime UI state
  = current browser-session state;

rendered HTML / indexes / caches
  = derived projections;

GitHub token
  = private secret, never repository content.
```

See [`DATA-AND-STATE.md`](DATA-AND-STATE.md) for the complete current map.

## 5. Remote-Action Boundary

Repository reads/writes are explicit. Ordinary page load, ChatGPT route changes and local Reader/App State actions do not authorize repository writes.

Repository business actions in Files, Categories, Reference Objects and Ordered Reference Lists stage complete intended file state locally. `Update current file` publishes exactly the open pending path through the Contents API with exact read-back. `Update all` publishes every pending path as one commit through the Git Data API, with per-path base checks, one non-force ref update and tree verification. There is no sequential bulk fallback.

Linked Note `Save GitHub` and image-aware Note transfer retain their own compound workflows; they are not silently collapsed into the common publisher. The application never runs local Git, commit or push.

Current reliability concerns and acceptance gaps are tracked in [`KNOWN-ISSUES.md`](KNOWN-ISSUES.md) and [`ROADMAP.md`](ROADMAP.md).

## 6. Build And Verification

Requirements:

```text
Node.js 20 or later recommended
no npm install
no third-party runtime or test dependency
```

From this directory:

```powershell
node build-linked-notes.mjs
node verify-linked-notes.mjs
```

`linked-notes-prototype.user.js` is generated. Do not edit it by hand; edit `src/**`, rebuild and verify.

## 7. Install / Update

1. Build and verify.
2. Open `linked-notes-prototype.user.js`.
3. Copy the complete generated source into the matching Tampermonkey script.
4. Save and reload ChatGPT.
5. Open the `Docs` / Linked Notes launcher.

Matched pages:

```text
https://chatgpt.com/*
https://chat.openai.com/*
```

Use `https://chatgpt.com` as the canonical local IndexedDB origin for the prototype because the two hosts are different browser origins.

## 8. First Workspace Setup

1. Open Linked Notes.
2. Open `Manage workspaces`.
3. Create a workspace with name, GitHub repository, branch, Notes folder and Categories folder.
4. Store the shared fine-grained GitHub token locally.
5. Explicitly refresh the repository data you need.

A workspace may be reused by many chats. A stable ChatGPT chat remembers a workspace only after explicit selection on that stable chat. Workspace selection does not silently move a verified Note to another repository target.

## 9. Development Documentation

- semantic entry: [`scenarios/README.md`](scenarios/README.md);
- detailed Scenario navigation: [`scenarios/README.md`](scenarios/README.md);
- current product map: [`APP-OVERVIEW.md`](APP-OVERVIEW.md);
- runtime architecture: [`ARCHITECTURE.md`](ARCHITECTURE.md);
- data/state ownership: [`DATA-AND-STATE.md`](DATA-AND-STATE.md);
- implementation issues: [`KNOWN-ISSUES.md`](KNOWN-ISSUES.md);
- future directions: [`ROADMAP.md`](ROADMAP.md);
- history: [`CHANGELOG.md`](CHANGELOG.md).

## 10. Core Safety Invariants

- Do not claim remote success before required verification completes.
- Do not overwrite a changed remote SHA/base blindly.
- Do not replace the first verified base SHA when a pending local file is edited again.
- Do not implement feature-specific GitHub publication actions for common pending-file flows; use `SCN-LN-PUBLISH` / Update current file / Update all.
- Do not treat local IndexedDB/GM state as repository truth.
- Do not expose the GitHub credential in Markdown, repository files, DOM URLs, exported diagnostics or logs.
- Do not run two repository operations concurrently when the application policy blocks them.
- Do not turn Reader open/render/copy into repository persistence.
- Do not treat Full App State as normal content export; it is a diagnostic snapshot.
- Do not treat this prototype as accepted production architecture.
- Do not use legacy Documentation Workbench Linked Notes workflow files as current semantic authority.
