# Practical Scenario Example — Build And Review Replacement Package

Status: methodology example only; not a second Scenario authority.

This example demonstrates a linear journey interrupted by a semantic decision whose columns continue separate paths and then converge. The product authority is the Builder Scenario owner.

---

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
