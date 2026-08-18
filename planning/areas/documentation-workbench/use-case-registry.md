# Documentation Workbench Use-Case Registry

Status: active project-local semantic registry
Parent Direction: [`direction-registry.md`](direction-registry.md)

## `UC-DW-DOC-REF` — Repository Documentation Change And Reference Review

**Status:** active current
**Parent Direction:** `DIR-DOCUMENTATION-WORKBENCH`

**Trigger / input:** repository file/folder/stable section is selected for direct documentation work or accepted planning meaning is ready for materialization.

**Purpose:** change repository documentation while preserving stable navigation/reference meaning and affected-use review.

**Result:** complete changed Markdown/docs with validated stable links and explicit affected-use review state, or an explicit unresolved/deferred result.

**Boundaries:** documentation/reference review does not accept unrelated application behavior or grant repository write/commit permission beyond the selected update route.

**Owner route:** `repository-documentation-change-and-reference-review-workflow.md` + [`SCN-DW-DOC-REF`](scenarios/SCN-DW-DOC-REF.md).

## `UC-DW-PLANNING-TO-REPOSITORY` — Planning Meaning To Repository

**Status:** active current
**Parent Direction:** `DIR-DOCUMENTATION-WORKBENCH`

**Trigger / input:** selected source/current owners/Ideas/current conclusions require integration and repository file handoff.

**Purpose:** turn selected current planning meaning into a reviewable repository/file-update transition.

**Result:** reconciled current planning meaning plus explicit File Update Plan/repository handoff or unresolved/deferred state.

**Boundaries:** selected meaning is integrated into real current owners; no Planning Item/Planning Draft/current-planning-meaning intermediate artifact is created automatically.

**Owner route:** `planning-meaning-to-repository-workflow.md` + shared Idea/file-update owners + [`SCN-DW-PLANNING-TO-REPOSITORY`](scenarios/SCN-DW-PLANNING-TO-REPOSITORY.md).

Historical Planning Item-era IDs such as `UC-DW-ITEM-FULL-PICTURE` are provenance/compatibility only and are not current Use Cases. `UC-DW-PLANNING-TO-REPOSITORY` above is the current semantic identity.
