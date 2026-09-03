# Replacement Package Workflow — Behavior Realization Map

Status: active derived current/target navigation
Scope: Replacement Package Builder + Replacement Package App.

This file is **not** behavior authority and does not redefine BIs. Canonical BI meaning remains in Scenario owners.

It records current realization/analogues, known migration pressure and proof needs. For planned behavior, it must not invent a future Aggregate/Slice owner before Domain/Slice implementation planning selects one.

Status meanings:

- `CURRENT` — current implementation capability already corresponds to the selected BI meaning.
- `PARTIAL` — a real current capability/analogue exists, but the full target BI/Scenario meaning is not implemented.
- `PLANNED TARGET` — selected future behavior; do not treat as implemented.
- `PLANNED TARGET transition` — current legacy behavior exists, but its selected future semantic role changes.
- `PLANNED TARGET; legacy analogue exists` — a legacy operation exists but does not satisfy target semantics.

A proof-responsibility entry says where proof belongs/exists; it is **not** a claim that tests passed for the currently reviewed commit.

## Builder BI → realization map

The current producer remains primarily a documented command/use-case/workflow. Do **not** invent a Builder Aggregate or Slice merely to mirror the App model.

| Behavior Item | State | Current realization / analogue | Target implementation allocation / proof |
|---|---|---|---|
| `BI-BLDR-START-WORK-CREATES-NEW-ISSUE` | PARTIAL | current App Work Intent has exact Issue create/recovery mechanics | **TBD implementation owner**; prove one new exact Issue + uncertain-create reconciliation |
| `BI-BLDR-START-WORK-CREATES-NEW-WORK-BRANCH` | PARTIAL | current App workspace mechanics create isolated Git work | **TBD implementation owner**; prove new branch is bound to exact source/work identity |
| `BI-BLDR-WORK-SOURCE-IS-EXACT` | PARTIAL | exact-source mechanics exist in current producer/App | **TBD implementation owner**; prove target HEAD is resolved once to immutable source identity |
| `BI-BLDR-WORK-CONTEXT-IS-DURABLE` | PARTIAL | current App persists related Issue/workspace facts | **TBD implementation owner**; prove repository/target/source/work branch are durably recoverable |
| `BI-BLDR-HANDOFF-INTENT-IS-DURABLE` | PLANNED TARGET | no current canonical Handoff Intent field | **TBD implementation owner**; prove durable semantic continuity |
| `BI-BLDR-EXACT-BUILD-SOURCE` | CURRENT | current producer exact readable-source boundary | current workflow/package validation proof |
| `BI-BLDR-NO-GUESSED-TOUCHED-BASE` | CURRENT | current producer + package protocol | current package validation proof |
| `BI-BLDR-PACKAGE-IS-COMPLETE` | CURRENT | package materialization + `PACKAGE-PROTOCOL.md` | current package validation proof |
| `BI-BLDR-NEW-ZIP-NEW-PACKAGE-ID` | CURRENT | package materialization + protocol | current package identity proof |
| `BI-BLDR-PACKAGE-CARRIES-EXACT-APPLICABILITY` | CURRENT | package materialization + protocol | current applicability proof |
| `BI-BLDR-REVIEW-EXACT-SAME-PACKAGE` | PLANNED TARGET | no current Builder replay/review implementation owner selected | **TBD implementation owner**; exact package replay/handoff identity proof |
| `BI-BLDR-REPLAY-EXACT-EXPECTED-SOURCE` | PLANNED TARGET | no selected target owner | **TBD implementation owner**; exact clean-source proof |
| `BI-BLDR-REPLAY-FRESH-WORKSPACE` | PLANNED TARGET | no selected target owner | **TBD implementation owner**; contamination/isolation proof |
| `BI-BLDR-REPLAY-USES-CANONICAL-PACKAGE-SEMANTICS` | PLANNED TARGET | current producer/consumer share protocol semantics, not a selected implementation owner | **TBD implementation shape**; conformance must prove replay and real Apply do not drift |
| `BI-BLDR-REVIEW-FULL-RESULT` | PLANNED TARGET | no selected target owner | **TBD implementation owner**; full resulting repository inspection proof |
| `BI-BLDR-CORRECTION-REQUIRES-NEW-PACKAGE` | PARTIAL | current new-ZIP/new-packageId rule exists | **TBD review-loop owner**; correction/review invalidation proof |
| `BI-BLDR-NO-REBUILD-AFTER-APPROVAL` | PLANNED TARGET | no selected target owner | **TBD implementation owner**; exact approved-package continuity proof |
| `BI-BLDR-APPROVAL-BINDS-EXACT-RESULT` | PLANNED TARGET | no selected target owner | **TBD implementation owner**; repository-work/package/source/result binding proof |
| `BI-BLDR-HANDOFF-VALUES-COME-FROM-REVIEW` | PLANNED TARGET | no selected target owner | **TBD implementation owner**; prove technical handoff values originate from exact Review Result |

### Builder Domain / Slice boundary

No full Builder Aggregate, Slice portfolio or durable DI/SI set is selected by the Scenario migration alone.

When implementation planning discovers a durable Builder Domain/Slice/shared responsibility, add it under the same canonical `domain/`, `slices/` or `shared-implementation/` catalogs. Do not recreate a parallel `replacement-package-builder/` planning tree.

## App BI → realization map

For target-only BIs, the final Domain/Slice owner is intentionally left **TBD**. Current analogues are listed only as migration evidence, not as automatic future ownership.

| Behavior Item | State | Current realization / analogue | Target implementation allocation / proof |
|---|---|---|---|
| `BI-RPKG-HANDOFF-ROUTE-CONTROLS-AUTOMATIC-STOP` | PLANNED TARGET | no current three-route contract | **TBD**; route dispatch/resume proof required |
| `BI-RPKG-AUTOMATIC-AND-MANUAL-STAGES-SHARE-SEMANTICS` | PARTIAL | current App has modular/composed Apply/Commit/Publish mechanics | **TBD**; prove identical authoritative stage transitions across entry paths |
| `BI-RPKG-APPLY-ONLY-STOPS-UNCOMMITTED` | PARTIAL | current manual Apply can establish uncommitted applied state | **TBD**; prove no Commit/Push/PR/Finalize side effects |
| `BI-RPKG-APPLY-AND-PUBLISH-STOPS-BEFORE-INTEGRATION` | PARTIAL | current App has Apply→Commit→Publish | **TBD**; add reviewed confirmation + open-Issue/no-integration stop proof |
| `BI-RPKG-APPLY-AND-FINALIZE-COMPLETES-WORK` | PLANNED TARGET | no full current analogue | **TBD**; end-to-end resume/finalization proof |
| `BI-RPKG-SEMANTIC-STAGE-INPUT-FOLLOWS-ROUTE` | PLANNED TARGET | planned Screen semantics selected; execution owner not selected | **TBD**; input provenance + retry persistence proof |
| `BI-RPKG-PUSH-CONTINUES-TO-REVIEWED-CONFIRMATION` | PLANNED TARGET | current Push exists, reviewed confirmation does not | **TBD**; prove deterministic confirmation after publish |
| `BI-RPKG-COMPOSED-RETRY-RESUMES-PERSISTED-INTENT` | PARTIAL | current Git execution retry state exists | **TBD**; uncertain external side-effect + semantic-input recovery proof |
| `BI-RPKG-WORK-INTENT-ONE-EXACT-ISSUE` | CURRENT | Work Intent + `SL-RPKG-10` | current proof remains; target creation ownership migrates and target verification allocation is **TBD** |
| `BI-RPKG-WORK-INTENT-DURABLE` | CURRENT | Work Intent + `SL-RPKG-10` | current proof remains; target lower-owner allocation **TBD** |
| `BI-RPKG-APPLY-EXACT-REPOSITORY-WORK` | PLANNED TARGET | current ChangeSet/workspace mechanics provide related identity checks | **TBD**; exact Builder-established work adoption/no-substitution proof |
| `BI-RPKG-APPLY-EXACT-PACKAGE` | PARTIAL | current `SL-RPKG-01` applies exact package identity | **TBD**; reviewed-package binding proof |
| `BI-RPKG-APPLY-EXACT-EXPECTED-SOURCE` | CURRENT/PARTIAL | current ChangeSet + `SL-RPKG-01` prove package source applicability | **TBD target allocation**; add Builder-source/work binding proof |
| `BI-RPKG-RETRY-RESUMES` | PARTIAL | current ChangeSet + `SL-RPKG-01` recover Apply/Commit/Publish | **TBD target allocation**; extend proof across selected target stages |
| `BI-RPKG-PARTIAL-STATE-TRUTHFUL` | CURRENT/PARTIAL | current ChangeSet has truthful Git partial states | **TBD target allocation**; final integration/logging tail proof |
| `BI-RPKG-NO-NEXT-PACKAGE-WHILE-PUBLICATION-UNCERTAIN` | CURRENT | current ChangeSet + `SL-RPKG-01` | reusable current rule/proof; future owner need not be assumed |
| `BI-RPKG-PUBLISHED-TREE-EQUALS-REVIEWED-TREE` | PLANNED TARGET | no reviewed-result confirmation owner selected | **TBD**; exact Git tree equality proof |
| `BI-RPKG-VERIFY-EXECUTION-IDENTITY` | PLANNED TARGET | no selected target owner | **TBD**; negative/mismatch execution-identity proof |
| `BI-RPKG-NO-SECOND-SEMANTIC-REVIEW-WHEN-IDENTITY-PROVEN` | PLANNED TARGET | no selected target owner | **TBD**; workflow proof |
| `BI-RPKG-VERIFY-FAILS-CLOSED` | PLANNED TARGET | no selected target owner | **TBD**; negative proof |
| `BI-RPKG-VERIFY-MISMATCH-PRESERVES-EVIDENCE` | PLANNED TARGET | no selected target owner | **TBD**; mismatch/recovery proof |
| `BI-RPKG-ONE-CORRECT-PR` | PLANNED TARGET | no current target PR owner | **TBD**; GitHub PR identity/currentness proof |
| `BI-RPKG-PR-HEAD-MUST-REPRESENT-CURRENT-WORK` | PLANNED TARGET | no selected target owner | **TBD**; stale-head negative proof |
| `BI-RPKG-PR-SEMANTIC-RECORD-IS-DURABLE` | PLANNED TARGET | Screen/handoff semantics selected, persistence owner not selected | **TBD**; create/update/readback proof |
| `BI-RPKG-PR-FAILURE-DOES-NOT-ROLL-BACK-PUBLISHED-REVISION` | PLANNED TARGET | current publication recovery provides a related truth-preservation principle | **TBD**; PR failure recovery proof |
| `BI-RPKG-FINALIZE-ONLY-APPROVED-PUBLISHED-REVISION` | PLANNED TARGET; legacy analogue exists | legacy `SL-RPKG-03` has freshness/finalize guards but not reviewed-result semantics | **TBD**; target precondition proof |
| `BI-RPKG-FINALIZE-PRESERVES-REVIEWED-CONTENT` | PLANNED TARGET | no selected target owner | **TBD**; moved-target/conflict integration proof |
| `BI-RPKG-TARGET-MOVEMENT-NOT-AUTOMATIC-STALE` | PLANNED TARGET | no selected target owner | **TBD**; unchanged-result moved-target proof |
| `BI-RPKG-CONTENT-CHANGING-RECONCILIATION-STALES-APPROVAL` | PLANNED TARGET | no selected target owner | **TBD**; changed-result staleness proof |
| `BI-RPKG-FINAL-WORK-RECORD-PRECEDES-ISSUE-CLOSE` | PLANNED TARGET | no selected target owner | **TBD**; external ordering/recovery proof |
| `BI-RPKG-FINAL-WORK-RECORD-BINDS-PROVEN-RESULT` | PLANNED TARGET | no selected target owner | **TBD**; exact system-derived content/readback proof |
| `BI-RPKG-FINAL-WORK-RECORD-NOT-DUPLICATED-BY-RETRY` | PLANNED TARGET | current external-operation journaling offers related recovery patterns | **TBD**; lost-response/idempotency proof |
| `BI-RPKG-FINALIZED-WORK-IS-CLOSED` | PLANNED TARGET; legacy lifecycle differs | legacy lifecycle has finalization but not target Issue-close semantics | **TBD**; closure/new-work continuity proof |
| `BI-RPKG-SNAPSHOT-READ-ONLY` | CURRENT | Repository Snapshot + current export realization | current CoreTests |
| `BI-RPKG-SNAPSHOT-EXACT-SOURCE` | CURRENT | Repository Snapshot + Repository Target | current CoreTests |
| `BI-RPKG-SNAPSHOT-NO-MIXED-CAPTURE` | CURRENT | Repository Snapshot + current export realization | current CoreTests |
| `BI-RPKG-SNAPSHOT-HANDOFF-EXACT-ARTIFACT` | CURRENT | Repository Snapshot + External Interaction | current ChatBridge/Core proof |
| `BI-RPKG-SNAPSHOT-HANDOFF-FROZEN-DESTINATION` | CURRENT | External Interaction | current proof |
| `BI-RPKG-SNAPSHOT-DELIVERY-DOES-NOT-CHANGE-REVIEW-BINDING` | CURRENT | External Interaction + navigation | current proof |
| `BI-RPKG-SNAPSHOT-DELIVERY-FAILURE-DOES-NOT-INVALIDATE-EXPORT` | CURRENT | External Interaction + Repository Snapshot | current proof |
| `BI-RPKG-CURRENT-CHANGE-GIT-DERIVED` | PLANNED TARGET | legacy/current ChangeSet inspection provides a migration analogue | **TBD**; Git-derived target diagnostic proof |
| `BI-RPKG-CURRENT-CHANGE-NOT-APPROVAL` | PLANNED TARGET transition | current Inspect Slice exposes legacy ReviewDiff | **TBD target allocation**; semantic-boundary proof |
| `BI-RPKG-CURRENT-CHANGE-DIAGNOSTIC` | PLANNED TARGET transition | current Inspect Slice is a legacy analogue | **TBD target allocation**; ordinary target-flow independence proof |

## Aggregate / Ownership Summary

```text
CURRENT APP
Repository Target
Work Intent
Repository Work / ChangeSet
External Interaction
Repository Snapshot

PLANNED CROSS-MODULE OWNERSHIP
Builder
  → creates repository-work Issue + work branch/source context
  → package/replay/review

App
  → consumes/verifies exact existing repository work
  → Apply/Commit/Push/Confirm
  → PR/Finalize
  → Final Work Record + Issue close
```

Current App Aggregates are not automatically reclassified as Builder Aggregates because planning is colocated.

No full Builder Aggregate/Slice model is selected yet.

The App target Domain/Slice decomposition is also intentionally not selected by this map. Current App owners are migration evidence, not automatic future owners.

Builder replay and App Apply share one behavioral package-semantics requirement, but this map does not prematurely select a shared library vs another proved implementation shape.
