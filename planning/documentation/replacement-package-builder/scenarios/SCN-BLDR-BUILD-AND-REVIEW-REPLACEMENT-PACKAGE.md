# SCN-BLDR-BUILD-AND-REVIEW-REPLACEMENT-PACKAGE — Build And Review Replacement Package

## Identity

`SCN-BLDR-BUILD-AND-REVIEW-REPLACEMENT-PACKAGE`

## Application Benefit

Produce one exact package whose exact predicted result was semantically reviewed, then emit the exact consumer handoff/URI for that approved package.

## Starting context

Human user gives ChatGPT:
- repository/work goal;
- target branch;
- when relevant, desired future App invocation meaning: handoff vs URI, Apply extent, automatic vs manual Finalize.

ChatGPT is the actor using Builder Features. Builder does not parse those workflow instructions from Issue prose.

## Journey / expected application behavior

### Main path

| # | Actor / Feature | Behavior | Result / continuity | Requirement |
|---:|---|---|---|---|
| 1 | Human → ChatGPT | Human gives work + eventual consumer intent. ChatGPT chooses ordinary Issue title/body wording. | actor-owned work text exists | — |
| 2 | `F-BLDR-START-REPOSITORY-WORK` | ChatGPT sends selected Issue text; Builder creates exact branch + Issue + managed identity. | exact `changeSetId`, Issue, workBranch, targetBranch, startBaseCommit | `SR-BLDR-WORK-REFERENCE-CONTINUITY`, `SR-BLDR-WORK-BRANCH-CONTINUITY` |
| 3 | ChatGPT / repository work context | Derive/prepare the desired resulting file content and deletions for this logical work without advancing the recorded `workBranch`. | desired resulting bytes/deletions | — |
| 4 | `F-BLDR-BUILD-REPLACEMENT-PACKAGE` | Build exact package. | exact `packageId`, `expectedSource`, package bytes | `SR-BLDR-EXPECTED-SOURCE-SHA-CONTINUITY` |
| 5 | `F-BLDR-APPLY-PACKAGE-FOR-REVIEW` | Reconstruct exact package result. | exact predicted tree + review artifacts | `SR-BLDR-PACKAGE-TO-REVIEW-CONTINUITY`, `SR-BLDR-REVIEW-DOES-NOT-ADVANCE-WORK-BRANCH` |
| 6 | ChatGPT semantic review | Review exact package/source/result against current Issue goal/acceptance. | `NEEDS_CORRECTION` or `APPROVABLE` | — |

Decision after Journey Step 6: **What is the semantic review decision?**

| `NEEDS_CORRECTION` | `APPROVABLE` |
|---|---|
| ChatGPT chooses concrete finding text including the exact reviewed `packageId`. | Freeze this exact package/source/result tuple. |
| `F-BLDR-ADD-ISSUE-REVIEW-COMMENT` confirms it on exact Issue. | No mandatory empty approval comment. |
| Correct the desired resulting file content / candidate inputs without moving the recorded `workBranch` or changing `expectedSource`. | Do not rebuild this `changeSetId`. |
| Build a new package → Review again. | → Common approved path |
| Requirements: `SR-BLDR-CORRECTION-INVALIDATES-PACKAGE-REVIEW`, `SR-BLDR-REVIEW-FINDINGS-ARE-DURABLE-WHEN-MATERIAL` | Requirements: `SR-BLDR-APPROVED-PACKAGE-IS-HANDOFF-PACKAGE`, `SR-BLDR-NO-MANDATORY-EMPTY-APPROVAL-COMMENT` |

**OPEN target detail — review-decision persistence/authority.** The Scenario decision `NEEDS_CORRECTION` / `APPROVABLE` is selected semantic truth. Whether the application persists that decision, where it persists it, and how Build obtains current `APPROVABLE` authority for its no-rebuild guard are not selected. Do not invent `ReviewDecision`/approval persistence until that owner is chosen.

### Common approved path

| # | Actor | Behavior | Requirement |
|---:|---|---|---|
| 7 | ChatGPT | Re-read current Work Issue. Actor prose supplies workflow meaning; managed text supplies exact work identifiers. | `SR-BLDR-ISSUE-TEXT-SOURCES-HANDOFF-SELECTION` |
| 8 | ChatGPT | If actor prose names a target branch, require it to equal managed target branch. | `SR-BLDR-ACTOR-TARGET-TEXT-MUST-MATCH-MANAGED-TARGET` |
| 9 | ChatGPT | Emit exact handoff **or** URI for the exact approved package/source/result/work identity. | `SR-BLDR-HANDOFF-BINDS-REVIEWED-RESULT` |

Decision after Journey Step 9: **How is the same semantic consumer command represented?**

| Copyable handoff | URI |
|---|---|
| Emit exact semantic App command as handoff text. | Encode the same exact semantic App command as URI. |
| Requirement: `SR-BLDR-HANDOFF-AND-URI-PRESERVE-SAME-MODULARITY` | Requirement: `SR-BLDR-HANDOFF-AND-URI-PRESERVE-SAME-MODULARITY` |

Both transports preserve the same:
`repositoryIdentity`, `changeSetId`, Issue, workBranch, targetBranch, `packageId` + exact package archive identity/location hint, expectedSource, reviewed tree, Apply extent, automatic-Finalize choice.

## Benefit closure

Exact reviewed package + exact consumer invocation are available.

---

## `SCN-06` TOOL / REPOSITORY — Изменение готово — хочу собрать и проверить replacement package

**Type:** TOOL / REPOSITORY continuation  
**Entry assumption:** semantic/exact changes already exist in a selected working snapshot/branch. This is not a mandatory IDTSPE stage. This presentation Scenario is owned here with the replacement-package workflow rather than by IDTSPE Core.

### Step `SCN-06-S1` — optionally review the intended file transition

**Trigger / Situation:** The repository delta is material enough that a separate intended-change plan would improve review.  
**AI Action:** Optionally use the Core Pre-Update Target; skip it for an obvious already-reviewed transition.  
**Why This Step:** Repository packaging should not force another planning ceremony.  
**Method / Mechanics:** Bound add/replace/delete intent and preservation/verification without mutation.  
**Possible Result:** Optional reviewed intended-change plan.  
**Derived From / Owners:** `TM-PRE-UPDATE-PLAN`.

### Step `SCN-06-S1A` — use an explicitly selected archive as read source when requested

**Trigger / Situation:** The USER explicitly selects an archive/snapshot as the source to read for the current review/planning/package work.  
**AI Action:** Use that selected archive as the bounded read-source snapshot after checking identity/freshness limits relevant to the task.  
**Why This Step:** Archive source selection is useful when the USER supplies a concrete snapshot, but it must not become an automatic continuation of package production.  
**Method / Mechanics:** Apply the archive read-source boundary only for the explicit selection; do not infer that an earlier archive is current, and do not infer package production/application from this source-selection step.  
**Possible Result:** A bounded current read source for the requested work.  
**Derived From / Owners:** `planning/command-routing.md#archive-read-source-boundary`.

### Step `SCN-06-S2` — produce a replacement package without applying it

**Trigger / Situation:** The USER explicitly requests a replacement package/archive from the selected source snapshot.  
**AI Action:** Build the package according to the repository package protocol, include exact base/replacement bytes, validate the manifest/payload, and stop.  
**Why This Step:** Package production and package application are different authorities.  
**Method / Mechanics:** Use the current package producer owner; do not apply/commit/push.  
**Possible Result:** Valid replacement package + machine-readable apply instruction.  
**Derived From / Owners:** `planning/use-cases/UC-REPO-BUILD-REPLACEMENT-PACKAGE.md`, `planning/documentation/build-replacement-archive-workflow.md`.

### Step `SCN-06-S3` — verify applied result separately when/if another authority applies it

**Trigger / Situation:** A package has later been applied in an authorized target workspace.  
**AI Action:** Review/consistency-check the resulting current state as appropriate; do not infer promotion-to-main permission.  
**Why This Step:** A valid package or successful apply does not itself authorize promotion.  
**Method / Mechanics:** Verify exact delta and semantic consistency; route findings normally.  
**Possible Result:** Verified target state or bounded Findings; promotion remains a separate explicit authorization.  
**Derived From / Owners:** `planning/documentation/review-diff-review-workflow.md`, `planning/documentation/idtspe-methodology/active/idtspe-core/shared/consistency-review-use-case.md`.

[WORKING_SCENARIO]
{"id":"SCN-06","type":"TOOL_REPOSITORY","title":"Изменение готово — хочу собрать и проверить replacement package","entryRoute":"Tool/repository continuation after semantic/exact work","assumptions":["Selected source snapshot/branch is explicit","Package production does not authorize apply/commit/push/promotion"],"steps":[{"id":"SCN-06-S1","title":"Optionally review the intended file transition","semanticRefs":["TM-PRE-UPDATE-PLAN"]},{"id":"SCN-06-S1A","title":"Use an explicitly selected archive as read source when requested","semanticRefs":["planning/command-routing.md#archive-read-source-boundary"]},{"id":"SCN-06-S2","title":"Produce a replacement package without applying it","semanticRefs":["planning/use-cases/UC-REPO-BUILD-REPLACEMENT-PACKAGE.md","planning/documentation/build-replacement-archive-workflow.md"]},{"id":"SCN-06-S3","title":"Verify applied result separately when authorized","semanticRefs":["planning/documentation/review-diff-review-workflow.md","planning/documentation/idtspe-methodology/active/idtspe-core/shared/consistency-review-use-case.md"]}]}
[/WORKING_SCENARIO]
