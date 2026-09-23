# EVO-RPKG-INTRODUCE-REPOSITORY-SNAPSHOT-WORKFLOW — Introduce Repository Snapshot Workflow

[← Evolution Steps Map](../navigation/EVOLUTION-STEPS-MAP.md)

Planning Position: **Selected / Planned**  
Target Resolution: **Partial Target**
Change Surface: **Mixed**  

## Driven By Application Definition
- [Review AI Work Efficiently](../application-definition.md#ab-rpkg-review-ai-work-efficiently-05)
- [Delegate Mechanical Repository Work](../application-definition.md#ab-rpkg-delegate-mechanical-repository-work-04)

## Entering From
- current realized downstream owner state; Snapshot is semantically independent of Work-orchestration ownership transfer

## Current-state correction
This proposal assumes **no current realized Snapshot capability**. Existing repository files that describe Snapshot as active are stale/conflicting representation and must not be used as current semantic/realization proof. Therefore this Step is `NEW`, not `CHANGED` from a current Snapshot Feature.

## Realization Prerequisite
- [`Standardize Typed Operation Results`](EVO-RPKG-STANDARDIZE-OPERATION-RESULTS.md)

## Step Purpose
Let AI/user quickly choose an active repository branch, immediately prepare the future Snapshot archive path for ChatGPT/file-attachment handoff, and asynchronously create an exact Snapshot of the selected branch state at that same reserved path.

## Target Terms Introduced In This Step

These terms are Step-owned future vocabulary until this Step is realized/materialized; stale Snapshot documentation does not make them current.

| Term ID | Canonical term | Plain definition | Natural semantic owner/reference | Avoid / aliases |
|---|---|---|---|---|
| <a id="term-rpkg-active-branch-15"></a>`TERM-RPKG-ACTIVE-BRANCH-15` | Active Branch | Branch with `ahead(main, branch) > 0`; a positive behind count does not make it inactive while ahead remains positive. | Snapshot Scenario | recently touched branch |
| <a id="term-rpkg-snapshot-source-commit-16"></a>`TERM-RPKG-SNAPSHOT-SOURCE-COMMIT-16` | Snapshot Source Commit | Exact immutable commit resolved once from the selected branch for one Snapshot generation. | Snapshot Feature | mutable branch as archive authority |
| <a id="term-rpkg-snapshot-reservation-17"></a>`TERM-RPKG-SNAPSHOT-RESERVATION-17` | Snapshot Reservation | Frozen unique future archive path reserved before archive generation completes and safe to expose for attachment handoff. | Snapshot Feature | provisional filename that may later change |

## Scenario Impact — Provide Repository Snapshot To AI — NEW

### Scenario Requirements
| SR | Type | Plain meaning | QRPE / Examples |
|---|---|---|---|
| <a id="sr-rpkg-snapshot-show-active-branches-01"></a>**Show Only Active Branches**<br><code>SR-RPKG-SNAPSHOT-SHOW-ACTIVE-BRANCHES-01</code> | Selection / Relevance | For a selected repository or all registered repositories, show only branches with at least one commit ahead of that repository's `main`: `ahead(main, branch) > 0`. | Target Good Example: branch `+2/-5` is shown because it still has two unique commits.<br>Problem Example: old merged branch `+0/-7` is shown as active. |
| <a id="sr-rpkg-snapshot-expose-ahead-behind-02"></a>**Expose Ahead/Behind Context**<br><code>SR-RPKG-SNAPSHOT-EXPOSE-AHEAD-BEHIND-02</code> | Visibility | Active branch selection makes repository + branch + ahead/behind context understandable. `behind > 0` does not by itself hide a branch. | Target Good Example: `repo A / work-x / +3 -4`. |
| <a id="sr-rpkg-snapshot-freeze-selected-branch-03"></a>**Freeze Selected Branch State**<br><code>SR-RPKG-SNAPSHOT-FREEZE-SELECTED-BRANCH-03</code> | Identity / Consistency | Once Snapshot generation starts, later movement of the branch cannot change the Snapshot being produced. | Problem Example: branch advances after selection and archive silently contains the newer commit. |
| <a id="sr-rpkg-snapshot-begin-handoff-before-export-04"></a>**Begin Attachment Handoff Before Export Completes**<br><code>SR-RPKG-SNAPSHOT-BEGIN-HANDOFF-BEFORE-EXPORT-04</code> | Efficiency / Waiting | User can obtain/paste the exact future archive path without waiting for ZIP generation to finish. | Target Good Example: path is already in clipboard while archive is still being produced. |
| <a id="sr-rpkg-snapshot-reserved-path-stable-05"></a>**Keep Reserved Snapshot Path Stable**<br><code>SR-RPKG-SNAPSHOT-RESERVED-PATH-STABLE-05</code> | Identity / Handoff | After future archive path is exposed, successful Snapshot publication occurs at exactly that path and never overwrites an existing/reserved file. | Problem Example: collision causes generation to silently switch to a different filename after user pasted the first path. |
| <a id="sr-rpkg-snapshot-failure-not-misleading-06"></a>**Do Not Leave Misleading Final Snapshot**<br><code>SR-RPKG-SNAPSHOT-FAILURE-NOT-MISLEADING-06</code> | Outcome / Truthfulness | Failed generation does not leave a final-looking archive that could be mistaken for successful Snapshot. | — |
| <a id="sr-rpkg-snapshot-require-main-baseline-07"></a>**Require Exact Main Baseline For Active-Branch View**<br><code>SR-RPKG-SNAPSHOT-REQUIRE-MAIN-BASELINE-07</code> | Selection / Truthfulness | Active-branch filtering compares against that repository's exact `main`. If `main` cannot be resolved, the application does not silently substitute another branch; that repository/source view is unavailable with a truthful reason until configured/resolved. | Problem Example: repository has no `main`, so UI silently compares against `master` and labels branches "active" under a different rule. |

### Complete Target Scenario Body — Provide Repository Snapshot To AI

<a id="scn-rpkg-provide-repository-snapshot-to-ai"></a>
# SCN-RPKG-PROVIDE-REPOSITORY-SNAPSHOT-TO-AI — Provide Repository Snapshot To AI

Realizes:
- [Delegate Mechanical Repository Work](../application-definition.md#ab-rpkg-delegate-mechanical-repository-work-04)
- [Review AI Work Efficiently](../application-definition.md#ab-rpkg-review-ai-work-efficiently-05)

| SPS | Actor/application interaction | Screen/context | Feature used | Result |
|---|---|---|---|---|
| <a id="sps-rpkg-browse-active-branches-01"></a>**Browse Active Branches**<br><code>SPS-RPKG-BROWSE-ACTIVE-BRANCHES-01</code> | User chooses one repository view or all-repository view and sees only `ahead(main)>0` branches with ahead/behind context. | Snapshot source selection | Screen/scenario selection logic | candidate active branch set |
| <a id="sps-rpkg-select-snapshot-branch-02"></a>**Select Snapshot Branch**<br><code>SPS-RPKG-SELECT-SNAPSHOT-BRANCH-02</code> | User selects exact Repository + Branch. | source selection | Create Repository Snapshot | selected mutable branch identity |
| <a id="sps-rpkg-reserve-snapshot-handoff-03"></a>**Reserve Snapshot Handoff Path**<br><code>SPS-RPKG-RESERVE-SNAPSHOT-HANDOFF-03</code> | Application resolves exact commit, reserves unique future archive path, copies exact path to clipboard immediately. | Snapshot progress surface | Create Repository Snapshot | frozen commit + reserved path |
| <a id="sps-rpkg-start-attachment-and-generation-04"></a>**Start Attachment And Generation In Parallel**<br><code>SPS-RPKG-START-ATTACHMENT-AND-GENERATION-04</code> | User can paste already-known path into ChatGPT file attachment while application generates archive. | ChatGPT/file picker external context + Snapshot progress | actor + Snapshot Feature | attachment preparation + in-progress export |
| <a id="sps-rpkg-complete-snapshot-05"></a>**Complete Snapshot**<br><code>SPS-RPKG-COMPLETE-SNAPSHOT-05</code> | Application publishes exact archive at the reserved path or reports truthful failure. | progress/outcome surface | Create Repository Snapshot | ready archive or failure |

Selected order is a Scenario solution. `Begin Attachment Handoff Before Export Completes` is the Requirement that motivates reserve/copy-before-generation completion.

## Feature Impact — Create Repository Snapshot — NEW

### Complete Target Feature Body
<a id="f-rpkg-create-repository-snapshot"></a>
# F-RPKG-CREATE-REPOSITORY-SNAPSHOT — Create Repository Snapshot

## Realizes Upstream Meaning
- `SR-RPKG-SNAPSHOT-FREEZE-SELECTED-BRANCH-03`
- `SR-RPKG-SNAPSHOT-BEGIN-HANDOFF-BEFORE-EXPORT-04`
- `SR-RPKG-SNAPSHOT-RESERVED-PATH-STABLE-05`
- `SR-RPKG-SNAPSHOT-FAILURE-NOT-MISLEADING-06`

Branch browsing/filtering/placement may remain Scenario/Screen responsibility; the Feature receives the selected repository/branch and owns exact Snapshot production.

### Feature Data
- selected Repository identity;
- selected Branch identity;
- frozen exact commit identity;
- reserved Snapshot archive identity/path;
- Snapshot result/archive identity.

### Global BR
| BR | Type | Plain behavior | QRPE / Examples |
|---|---|---|---|
| <a id="br-rpkg-snapshot-resolve-branch-once-01"></a>**Resolve Selected Branch Once**<br><code>BR-RPKG-SNAPSHOT-RESOLVE-BRANCH-ONCE-01</code> | Identity | Resolve selected branch to one exact commit before reading Snapshot bytes; branch movement later has no effect. | Target Good Example: branch moves while generation runs but archive stays on frozen commit. |
| <a id="br-rpkg-snapshot-reserve-unique-output-02"></a>**Reserve Unique Snapshot Output**<br><code>BR-RPKG-SNAPSHOT-RESERVE-UNIQUE-OUTPUT-02</code> | Safety / Identity | Generate unique archive code/path, prove candidate path not existing/reserved, regenerate on collision, then freeze that path before exposure. | Problem Example: existing download is overwritten. |
| <a id="br-rpkg-snapshot-publish-to-exposed-path-03"></a>**Publish To Exposed Path**<br><code>BR-RPKG-SNAPSHOT-PUBLISH-TO-EXPOSED-PATH-03</code> | Continuity | Success publishes exactly to the already-exposed reserved path. | — |
| <a id="br-rpkg-snapshot-no-misleading-final-file-04"></a>**No Misleading Final File**<br><code>BR-RPKG-SNAPSHOT-NO-MISLEADING-FINAL-FILE-04</code> | Outcome | Failure before successful final publication leaves no valid-looking final Snapshot archive. | — |

### Main Path
| FBS | Required action |
|---|---|
| <a id="fbs-rpkg-snapshot-freeze-source-01"></a>**Freeze Snapshot Source**<br><code>FBS-RPKG-SNAPSHOT-FREEZE-SOURCE-01</code> | Resolve Repository + selected Branch to exact commit. |
| <a id="fbs-rpkg-snapshot-reserve-archive-path-02"></a>**Reserve Snapshot Archive Path**<br><code>FBS-RPKG-SNAPSHOT-RESERVE-ARCHIVE-PATH-02</code> | Generate unique code/path; collision → regenerate; reserve exact future path. |
| <a id="fbs-rpkg-snapshot-expose-archive-path-03"></a>**Expose Snapshot Archive Path**<br><code>FBS-RPKG-SNAPSHOT-EXPOSE-ARCHIVE-PATH-03</code> | Copy exact reserved future path to clipboard for immediate handoff. |
| <a id="fbs-rpkg-snapshot-build-archive-04"></a>**Build Snapshot Archive**<br><code>FBS-RPKG-SNAPSHOT-BUILD-ARCHIVE-04</code> | Create exact Snapshot from frozen commit asynchronously relative to user attachment preparation. |
| <a id="fbs-rpkg-snapshot-publish-archive-05"></a>**Publish Snapshot Archive**<br><code>FBS-RPKG-SNAPSHOT-PUBLISH-ARCHIVE-05</code> | Atomically/fail-closed publish to reserved path; return ready/failure result. |

## Screen / Adapter Impact
Screen must support selected-repository and all-repository active-branch browsing. Exact visual layout remains Screen/Scenario solution. Clipboard is the selected initial path-exposure adapter.

A browser/Tampermonkey helper that consumes the reserved path automatically is **not required by this Step**; it is retained as probable candidate `EVO-RPKG-AUTOMATE-SNAPSHOT-ATTACHMENT`.

## Notification relation
This Step exposes ready/failure result in application truth. OS/background notification is owned by separate [Add Operation Notifications](EVO-RPKG-ADD-OPERATION-NOTIFICATIONS.md) Step and may compose later.

## Materialization Set
- Snapshot Scenario — `CREATE`;
- Create Repository Snapshot Feature — `CREATE`;
- Snapshot source-selection Screen/interaction composition — impact identified but **not yet in the Materialization Set**; add `CREATE`/`REPLACE` only after a complete Target Screen/owner body is selected;
- natural Domain/Slice/Shared owners — unresolved impacts, **not yet in the Materialization Set**; add `CREATE`/`REPLACE` only after discovery resolves durable responsibilities and complete Target Owner Bodies.

## Step Readiness

Readiness: **NOT_READY**

Typed Operation Results is not yet realized and Screen/Domain/Slice/Shared realization ownership remains unresolved.

### Step Q/R/P
- Q [BLOCKING]: resolve durable owner(s) for Snapshot storage/materialization and source-selection interaction where independently material.
- P [BLOCKING]: add CREATE/REPLACE entries only after complete corresponding Target Owner Bodies exist.
