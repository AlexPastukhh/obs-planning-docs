# OBS Linked Notes Prototype

Status: preliminary implementation prototype / browser and remote smoke testing pending
Version: `0.7.2-prototype`
Scope: local-first Tampermonkey repository documentation prototype with Notes, Files, Categories, repository templates, materialized Reference Objects, Chat Response Reader, Full App State diagnostics and explicit verified GitHub actions.

This directory is implementation/prototype material. Canonical Planning Items and project-local workflow owners remain under `planning/areas/documentation-workbench/`; this userscript does not silently define production architecture.

## 1. Read This First

For a new AI/chat or a new implementation session, read in this order:

1. [`APP-OVERVIEW.md`](APP-OVERVIEW.md) — what the application currently does and which surface owns which user action.
2. [`ARCHITECTURE.md`](ARCHITECTURE.md) — runtime layers, module families, build order and GitHub boundary.
3. [`DATA-AND-STATE.md`](DATA-AND-STATE.md) — repository truth, local persistence, runtime state, caches and secrets.
4. [`KNOWN-ISSUES.md`](KNOWN-ISSUES.md) — current implementation problems and evidence gaps.
5. [`linked-notes-prototype-roadmap.md`](../../../../areas/documentation-workbench/linked-notes-prototype-roadmap.md) — current project-local development directions.
6. Only then read the detailed workflow/mapping relevant to the task.

Do not infer current behavior from [`CHANGELOG.md`](CHANGELOG.md) alone. The changelog records how the prototype reached the current state; the current-state owners above take precedence.

## 2. Current Surfaces

```text
Workspace management
Notes
Files
Categories
Repository templates
Reference Objects
Chat Response Reader
App State
```

Short current behavior is owned by [`APP-OVERVIEW.md`](APP-OVERVIEW.md). Detailed behavior remains split across the project-local workflow owners and focused implementation mappings.

## 3. Detailed Owners And Mappings

Project-local workflow owners:

- [`linked-notes-end-to-end-workflow.md`](../../../../areas/documentation-workbench/linked-notes-end-to-end-workflow.md) — Note lifecycle, reconciliation and verified save;
- [`repository-file-browser-and-categories-workflow.md`](../../../../areas/documentation-workbench/repository-file-browser-and-categories-workflow.md) — Files and Categories lifecycle;
- [`files-centric-repository-workspace-extension.md`](../../../../areas/documentation-workbench/files-centric-repository-workspace-extension.md) — Files-centric navigation, structure/copy and repository-template integration;
- [`image-aware-markdown-transfer-workflow.md`](../../../../areas/documentation-workbench/image-aware-markdown-transfer-workflow.md) — copy a verified Note and its repository images;
- [`reference-object-definition-and-materialized-use-workflow.md`](../../../../areas/documentation-workbench/reference-object-definition-and-materialized-use-workflow.md) — repository-native Reference Object definitions and materialized uses;
- [`chat-response-reader-workflow.md`](../../../../areas/documentation-workbench/chat-response-reader-workflow.md) — local response Reader and source-accuracy contract;
- [`full-app-state-export-workflow.md`](../../../../areas/documentation-workbench/full-app-state-export-workflow.md) — diagnostic full local application-state export.

Focused implementation mappings/checks:

- [`REFERENCE-OBJECTS-PROTOTYPE.md`](REFERENCE-OBJECTS-PROTOTYPE.md);
- [`CHAT-RESPONSE-READER.md`](CHAT-RESPONSE-READER.md);
- [`CHAT-RESPONSE-READER-CHECKLIST.md`](CHAT-RESPONSE-READER-CHECKLIST.md);
- [`FULL-APP-STATE-EXPORT.md`](FULL-APP-STATE-EXPORT.md);
- [`PROTOTYPE-CHECKLIST.md`](PROTOTYPE-CHECKLIST.md).

Repository-facing conventions consumed by the prototype live under the repository root `.linked-notes/`; they are separate from this application documentation.

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

Current write paths use the GitHub Contents API and are intended to protect against blind overwrite through path validation, absence/SHA checks and read-back verification. The application never runs local Git, commit or push.

Current reliability concerns and the planned write-path audit are tracked in [`KNOWN-ISSUES.md`](KNOWN-ISSUES.md) and the project-local roadmap.

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

- current product map: [`APP-OVERVIEW.md`](APP-OVERVIEW.md);
- runtime architecture: [`ARCHITECTURE.md`](ARCHITECTURE.md);
- data/state ownership: [`DATA-AND-STATE.md`](DATA-AND-STATE.md);
- implementation issues: [`KNOWN-ISSUES.md`](KNOWN-ISSUES.md);
- history: [`CHANGELOG.md`](CHANGELOG.md);
- future directions: [`linked-notes-prototype-roadmap.md`](../../../../areas/documentation-workbench/linked-notes-prototype-roadmap.md).

## 10. Core Safety Invariants

- Do not claim remote success before required verification completes.
- Do not overwrite a changed remote SHA blindly.
- Do not treat local IndexedDB/GM state as repository truth.
- Do not expose the GitHub credential in Markdown, repository files, DOM URLs, exported diagnostics or logs.
- Do not run two repository operations concurrently when the application policy blocks them.
- Do not turn Reader open/render/copy into repository persistence.
- Do not treat Full App State as normal content export; it is a diagnostic snapshot.
- Do not treat this prototype as accepted production architecture.
- Do not update canonical Planning Items from prototype code or this documentation alone.
