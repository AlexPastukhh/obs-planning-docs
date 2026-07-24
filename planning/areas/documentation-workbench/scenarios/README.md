# Documentation Workbench Scenario Draft

Status: preliminary item-backed Scenario workspace
Scope: clean Scenario Reference Objects derived from the accepted Documentation Workbench Planning Items and Full Pictures, with separate Scenario DATA and Behavior Item Reference Objects.

## 1. Ownership

```text
this file:
  scenario catalog and navigation;

one file per Scenario Object:
  complete clean Scenario specification;

data-objects.md:
  separate Scenario DATA Reference Object definitions;

behavior-items.md:
  separate Behavior Item Reference Object definitions;

planning-item-register.md:
  canonical complete Planning Item bodies.
```

## 2. Traceability And Change Review

Every Scenario uses one or more typed `derived from` relations to contributing Planning Items. Scenario files contain references, not copied canonical item bodies.

```text
Planning Item changes
  → linked Scenario/DATA/Behavior objects and files become review-needed
  → previous reviewed content remains
  → explicit refresh / confirm current / remove-or-replace relation.
```

Downstream scenario work does not update Planning Items automatically.

## 3. Scenario Inventory

| Scenario | Title | Actor/context | Goal | Planning Items | Status |
|---|---|---|---|---|---|
| [`SCN-DW-01`](SCN-DW-01-structured-planning-input.md) | Structure A Long Planning Message | Documentation Workbench user — structured message context | Prepare one addressable long planning message without losing literal wording. | `ITEM-121`, `ITEM-122` | preliminary |
| [`SCN-DW-02`](SCN-DW-02-form-and-review-planning-items.md) | Form And Review Planning Items From Source | Documentation Workbench user — Planning Item review context | Turn selected source material into complete reviewable Planning Items. | `ITEM-94`, `ITEM-110`, `ITEM-120`, `ITEM-112`, `ITEM-122`, `ITEM-41`, `ITEM-98` | preliminary |
| [`SCN-DW-03`](SCN-DW-03-maintain-item-backed-full-picture.md) | Maintain An Item-Backed Full Picture | Documentation Workbench user — Planning Draft / Full Picture context | Maintain a readable trigger-to-result plan backed by Planning Items and explicit concern/deep-work state. | `ITEM-41`, `ITEM-98`, `ITEM-119`, `ITEM-113`, `ITEM-118` | preliminary |
| [`SCN-DW-04`](SCN-DW-04-reconcile-and-handoff-planning-meaning.md) | Reconcile Planning Meaning And Hand It Off | Documentation Workbench user — repository reconciliation context | Reconcile selected Planning Items with current repository owners and hand accepted meaning to documentation work. | `ITEM-98`, `ITEM-41`, `ITEM-112`, `ITEM-22B` | preliminary |
| [`SCN-DW-05`](SCN-DW-05-open-documentation-work-scope.md) | Open A Documentation Work Scope | Documentation Workbench user — repository/file/folder/Markdown context | Open a selected documentation scope as a reviewable work context. | `ITEM-34B`, `ITEM-32B`, `ITEM-31B` | preliminary |
| [`SCN-DW-06`](SCN-DW-06-create-or-confirm-reference-object.md) | Create Or Confirm A Reference Object | Documentation Workbench user — object proposal/materialization context | Create or confirm an independently managed Reference Object from a supported entry path. | `ITEM-22B`, `ITEM-87`, `ITEM-31B`, `ITEM-86`, `ITEM-23B`, `ITEM-108`, `ITEM-91` | preliminary |
| [`SCN-DW-07`](SCN-DW-07-author-canonical-content.md) | Author Canonical Documentation Or Object Content | Documentation Workbench user — canonical authoring context | Create or change canonical document/object content at its owning location. | `ITEM-93`, `ITEM-90`, `ITEM-103`, `ITEM-106`, `ITEM-97` | preliminary |
| [`SCN-DW-08`](SCN-DW-08-create-and-use-managed-reference.md) | Create And Use A Managed Reference | Documentation Workbench user — document/object reference context | Place a managed reference to an existing target and retain navigation to it. | `ITEM-114`, `ITEM-101`, `ITEM-88`, `ITEM-73`, `ITEM-83`, `ITEM-105`, `ITEM-90` | preliminary |
| [`SCN-DW-09`](SCN-DW-09-save-and-review-affected-uses.md) | Save Markdown And Review Affected Uses | Documentation Workbench user — save/diff/dependency-review context | Save complete Markdown and review uses affected by a changed referenced source. | `ITEM-34B`, `ITEM-32B`, `ITEM-29B`, `ITEM-89`, `ITEM-16B` | preliminary |
| [`SCN-DW-10`](SCN-DW-10-work-with-standalone-note.md) | Create And Work With A Standalone Note | Documentation Workbench user — Notes context | Create a standalone Note and continue working with it without selecting another object. | `ITEM-124`, `ITEM-91`, `ITEM-103`, `ITEM-106`, `ITEM-118` | preliminary |
| [`SCN-DW-11`](SCN-DW-11-work-with-note-for-object.md) | Add And Work With A Note For An Object | Documentation Workbench user — selected object / Notes context | Add a Note to a selected object and find the same Note from object-specific and general Note contexts. | `ITEM-124`, `ITEM-103`, `ITEM-106`, `ITEM-114`, `ITEM-118` | preliminary |
| [`SCN-DW-12`](SCN-DW-12-navigate-planning-and-documentation-context.md) | Navigate Planning And Documentation Context | Documentation Workbench user — multi-tab navigation and related-view context | Move between related files, objects, Planning Items, sources, homes, occurrences and review targets. | `ITEM-35B`, `ITEM-111`, `ITEM-95`, `ITEM-104`, `ITEM-96`, `ITEM-118` | preliminary |
| [`SCN-DW-13`](SCN-DW-13-produce-ai-expanded-transfer-copy.md) | Produce An AI-Expanded Transfer Copy | Documentation Workbench user — selected documentation file / AI transfer context | Produce a selected-file transfer copy with referenced object contents expanded without changing saved Markdown. | `ITEM-107` | preliminary |
| [`SCN-DW-14`](SCN-DW-14-change-configurable-application-convention.md) | Change A Configurable Application Convention | Documentation Workbench user — application settings / project-convention context | Change an exposed configurable convention through a controlled update rather than blind global replacement. | `ITEM-123` | preliminary |

## 4. Separate Scenario-Layer Object Owners

- [`data-objects.md`](data-objects.md) — Scenario DATA Reference Objects.
- [`behavior-items.md`](behavior-items.md) — Behavior Item Reference Objects.

## 5. Selection Rule

A peer Scenario requires a coherent actor/context + user goal + observable result. Internal steps, views, rules and object-model details remain Behavior Items, DATA, invariants or supporting Planning Items unless they gain their own independently useful goal/result.

## 6. Deliberate Exclusions

- Chat/AI/Work-State remains provisional because its complete trigger-to-result lifecycle is not yet accepted.
- No domain model, aggregates, API, database, UI-component architecture or implementation Slices are created.
- No prototype plan is created.
- Implementation Ideas do not become clean Scenario/DATA/Behavior source relations unless they contribute accepted behavioral meaning.
- No unprovided DATA, errors, permissions or acceptance criteria are invented.
