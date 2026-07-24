# Documentation Workbench Reference Link Experiment

Status: active experiment / not a canonical scenario owner

Purpose: test ordinary GitHub Markdown navigation between files and exact fragments before deciding how much custom Documentation Workbench tooling is justified.

## Link Modes Under Test

- **File link:** opens another Markdown file.
- **Fragment link:** opens an explicit anchor inside another Markdown file.
- **Planning Item link:** opens the canonical Planning Item register; exact stable item anchors still need a dedicated convention.
- **Dependency candidate:** ordinary Markdown link plus hidden metadata for later dependency analysis.
- **AI expansion candidate:** ordinary Markdown link plus `expand=allow`; GitHub ignores it, a future script may use it.

Example:

```md
[DATA-DW-09-02 — Affected Use Review Queue](
  scenarios/data-objects.md#data-dw-09-02
)<!-- ref: relation=depends-on; expand=allow -->
```

## Current Application Scenarios

`SCN-DW-01`–`SCN-DW-04` are excluded because they describe AI/repository planning workflows rather than Documentation Workbench application behavior.

### SCN-DW-05 — Open A Documentation Work Scope

- Scenario: [complete file](scenarios/SCN-DW-05-open-documentation-work-scope.md)
- Planning Items: [ITEM-34B](planning-item-register.md), [ITEM-32B](planning-item-register.md), [ITEM-31B](planning-item-register.md)
- DATA:
  - [DATA-DW-05-01 — Documentation Scope Selection](scenarios/data-objects.md#data-dw-05-01)
  - [DATA-DW-05-02 — Loaded Markdown Content](scenarios/data-objects.md#data-dw-05-02)
  - [DATA-DW-05-03 — Recognition And Conflict State](scenarios/data-objects.md#data-dw-05-03)
- Behavior:
  - [BI-DW-05-01 — Select documentation scope](scenarios/behavior-items.md#bi-dw-05-01)
  - [BI-DW-05-02 — Load complete source content](scenarios/behavior-items.md#bi-dw-05-02)
  - [BI-DW-05-03 — Recognize existing and proposed regions](scenarios/behavior-items.md#bi-dw-05-03)
  - [BI-DW-05-04 — Keep proposal conflicts visible](scenarios/behavior-items.md#bi-dw-05-04)

Main flow:
1. Load the selected repository/file/folder/Markdown scope.
2. Recognize ordinary text, known objects, references and possible proposed-object regions.
3. Keep ambiguity and identity conflicts visible.
4. Expose the loaded scope for the next documentation action.

### SCN-DW-06 — Create Or Confirm A Reference Object

- Scenario: [complete file](scenarios/SCN-DW-06-create-or-confirm-reference-object.md)
- Planning Items: [ITEM-22B](planning-item-register.md), [ITEM-87](planning-item-register.md), [ITEM-31B](planning-item-register.md), [ITEM-86](planning-item-register.md), [ITEM-23B](planning-item-register.md), [ITEM-108](planning-item-register.md), [ITEM-91](planning-item-register.md)
- DATA:
  - [DATA-DW-06-01 — Reference Object Entry Meaning](scenarios/data-objects.md#data-dw-06-01)
  - [DATA-DW-06-02 — Object Confirmation Decision](scenarios/data-objects.md#data-dw-06-02)
  - [DATA-DW-06-03 — Object Ownership And Location Choice](scenarios/data-objects.md#data-dw-06-03)

Main flow:
1. Review a proposed boundary or existing managed identity.
2. Reuse an already managed object.
3. Require explicit confirmation for portable meanings, fragments and parsed proposals.
4. Establish canonical owner, definition location and optional home.
5. Expose the object for authoring and references.

### SCN-DW-07 — Author Canonical Documentation Or Object Content

- Scenario: [complete file](scenarios/SCN-DW-07-author-canonical-content.md)
- Planning Items: [ITEM-93](planning-item-register.md), [ITEM-90](planning-item-register.md), [ITEM-103](planning-item-register.md), [ITEM-106](planning-item-register.md), [ITEM-97](planning-item-register.md)
- DATA:
  - [DATA-DW-07-01 — Canonical Text Content](scenarios/data-objects.md#data-dw-07-01)
  - [DATA-DW-07-02 — Object Fields And Category Guidance](scenarios/data-objects.md#data-dw-07-02)

Main flow:
1. Edit text at the canonical owner.
2. Add or change valid fields.
3. Show category guidance or conflicts.
4. Keep content ready for save and Markdown round trip.

### SCN-DW-08 — Create And Use A Managed Reference

- Scenario: [complete file](scenarios/SCN-DW-08-create-and-use-managed-reference.md)
- Planning Items: [ITEM-114](planning-item-register.md), [ITEM-101](planning-item-register.md), [ITEM-88](planning-item-register.md), [ITEM-73](planning-item-register.md), [ITEM-83](planning-item-register.md), [ITEM-105](planning-item-register.md), [ITEM-90](planning-item-register.md)
- DATA:
  - [DATA-DW-08-01 — Reference Target Selection](scenarios/data-objects.md#data-dw-08-01)
  - [DATA-DW-08-02 — Reference Meaning And Representation Choice](scenarios/data-objects.md#data-dw-08-02)
  - [DATA-DW-08-03 — Managed Reference Occurrence](scenarios/data-objects.md#data-dw-08-03)

Main flow:
1. Select a target.
2. Choose relation meaning separately from target type.
3. Choose full-text or bare representation when applicable.
4. Place the reference.
5. Open the target and available contexts.

### SCN-DW-09 — Save Markdown And Review Affected Uses

- Scenario: [complete file](scenarios/SCN-DW-09-save-and-review-affected-uses.md)
- Planning Items: [ITEM-34B](planning-item-register.md), [ITEM-32B](planning-item-register.md), [ITEM-29B](planning-item-register.md), [ITEM-89](planning-item-register.md), [ITEM-16B](planning-item-register.md)
- DATA:
  - [DATA-DW-09-01 — Saved Markdown Result](scenarios/data-objects.md#data-dw-09-01)
  - [DATA-DW-09-02 — Affected Use Review Queue](scenarios/data-objects.md#data-dw-09-02)<!-- ref: relation=depends-on; expand=allow -->
  - [DATA-DW-09-03 — Affected Use Review Decision](scenarios/data-objects.md#data-dw-09-03)

Main flow:
1. Produce complete Markdown.
2. Detect dependent files, fields and scenario artifacts.
3. Mark affected uses review-needed while preserving old reviewed content.
4. Refresh, confirm, remove or replace each dependency.
5. Reach diff-ready or explicit Pending Review state.

### SCN-DW-10 — Create And Work With A Standalone Note

- Scenario: [complete file](scenarios/SCN-DW-10-work-with-standalone-note.md)
- Planning Items: [ITEM-124](planning-item-register.md), [ITEM-91](planning-item-register.md), [ITEM-103](planning-item-register.md), [ITEM-106](planning-item-register.md), [ITEM-118](planning-item-register.md)
- DATA:
  - [DATA-DW-10-01 — Standalone Note Details](scenarios/data-objects.md#data-dw-10-01)
  - [DATA-DW-10-02 — All Notes Entry](scenarios/data-objects.md#data-dw-10-02)

Main flow:
1. Start standalone Note creation.
2. Optionally provide a title.
3. Provide or edit Note text.
4. Find the same Note among Notes.
5. Open and edit it independently.

### SCN-DW-11 — Add And Work With A Note For An Object

- Scenario: [complete file](scenarios/SCN-DW-11-work-with-note-for-object.md)
- Planning Items: [ITEM-124](planning-item-register.md), [ITEM-103](planning-item-register.md), [ITEM-106](planning-item-register.md), [ITEM-114](planning-item-register.md), [ITEM-118](planning-item-register.md)
- DATA:
  - [DATA-DW-11-01 — Selected Note Target](scenarios/data-objects.md#data-dw-11-01)
  - [DATA-DW-11-02 — Object-Linked Note Details](scenarios/data-objects.md#data-dw-11-02)
  - [DATA-DW-11-03 — Note Visibility Contexts](scenarios/data-objects.md#data-dw-11-03)

Main flow:
1. Start Note creation for a selected object.
2. Optionally provide title and text.
3. Expose the Note for the selected object.
4. Expose the same Note among all Notes.
5. Open and edit it independently.

### SCN-DW-12 — Navigate Planning And Documentation Context

- Scenario: [complete file](scenarios/SCN-DW-12-navigate-planning-and-documentation-context.md)
- Planning Items: [ITEM-35B](planning-item-register.md), [ITEM-111](planning-item-register.md), [ITEM-95](planning-item-register.md), [ITEM-104](planning-item-register.md), [ITEM-96](planning-item-register.md), [ITEM-118](planning-item-register.md)
- DATA:
  - [DATA-DW-12-01 — Navigation Target](scenarios/data-objects.md#data-dw-12-01)
  - [DATA-DW-12-02 — Related Context View](scenarios/data-objects.md#data-dw-12-02)

Main flow:
1. Open a selected related target.
2. Show its file/object/home/occurrence/item/source/review context.
3. Filter related context where supported.
4. Continue work in the opened context.

### SCN-DW-13 — Produce An AI-Expanded Transfer Copy

- Scenario: [complete file](scenarios/SCN-DW-13-produce-ai-expanded-transfer-copy.md)
- Planning Items: [ITEM-107](planning-item-register.md)
- DATA:
  - [DATA-DW-13-01 — Selected File And Reference State](scenarios/data-objects.md#data-dw-13-01)
  - [DATA-DW-13-02 — Expanded Transfer Copy](scenarios/data-objects.md#data-dw-13-02)<!-- ref: relation=includes; expand=allow -->

Main flow:
1. Request an expanded transfer copy.
2. Include resolvable referenced content.
3. Preserve identity and boundaries.
4. Keep unresolved targets explicit.
5. Produce output without changing saved Markdown.

### SCN-DW-14 — Change A Configurable Application Convention

- Scenario: [complete file](scenarios/SCN-DW-14-change-configurable-application-convention.md)
- Planning Items: [ITEM-123](planning-item-register.md)
- DATA:
  - [DATA-DW-14-01 — Configurable Convention Choice](scenarios/data-objects.md#data-dw-14-01)
  - [DATA-DW-14-02 — Controlled Convention Update Result](scenarios/data-objects.md#data-dw-14-02)

Main flow:
1. Select a configurable value.
2. Provide the intended value.
3. Apply a controlled update rather than blind replacement.
4. Preserve a project-readable current value for AI routes.

## Next Experiment Steps

1. Add this file to `planning/areas/documentation-workbench/reference-link-experiment.md`.
2. Open file and fragment links in GitHub.
3. Change visible content inside a linked DATA or Behavior definition without changing its explicit anchor.
4. Confirm that the original link still resolves.
5. Rename a heading while retaining its explicit anchor and test again.
6. Prototype dependency warnings for `depends-on` and `includes`.
7. Prototype `expand=allow` content expansion into a generated output file.

## Boundary

This file demonstrates standard Markdown/GitHub navigation and records experimental metadata. It does not prove dependency invalidation, semantic Reference Object lifecycle or AI expansion until those tools are implemented and tested.
