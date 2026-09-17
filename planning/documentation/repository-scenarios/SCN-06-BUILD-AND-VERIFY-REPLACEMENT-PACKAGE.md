# SCN-06 — Изменение готово — хочу собрать и проверить replacement package

Status: active canonical TOOL / REPOSITORY working Scenario.

This Scenario is current repository workflow presentation owned outside the retired Builder target corpus. It composes existing semantic owners; it does not make command IDs or legacy Builder Feature drafts authoritative.

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
