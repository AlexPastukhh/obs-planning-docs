# Replacement Package Workflow — Behavior Realization Map

Status: active derived current/target navigation
Scope: Replacement Package Builder + Replacement Package App.

This file is **not** behavior authority and does not redefine BIs. Canonical BI meaning remains in Scenario owners. It answers: where is each selected BI realized now, where will it be realized, and what proof responsibility exists?

Status meanings:

- `CURRENT` — current implementation capability already corresponds to the selected BI meaning.
- `PARTIAL` — a real current capability/analogue exists, but the full target BI/Scenario meaning is not implemented.
- `PLANNED TARGET` — selected future behavior; do not treat as implemented.
- `PLANNED TARGET transition` — current legacy behavior exists, but its selected future semantic role changes.
- `PLANNED TARGET; legacy analogue exists` — a legacy operation exists but does not satisfy target semantics.

A proof-responsibility entry says where proof belongs/exists; it is **not** a claim that tests passed for the currently reviewed commit.

## Builder BI → realization map

The current producer remains primarily a documented command/use-case/workflow. Do **not** invent a Builder Aggregate merely to mirror the App Domain model.

| Behavior Item | State | Current / planned realization responsibility | Future owner delta / proof responsibility |
|---|---|---|---|
| `BI-BLDR-START-WORK-CREATES-NEW-ISSUE` | PARTIAL | current App Work Intent has exact Issue creation/recovery mechanics; planned Builder Start Work owns the new producer-side interaction | Builder-side exact create/recovery proof required; implementation owner still to be selected |
| `BI-BLDR-START-WORK-CREATES-NEW-WORK-BRANCH` | PARTIAL | current App workspace capability creates deterministic isolated Git work; planned Builder Start Work moves this result before development | Builder-side exact branch/source/work mapping proof required |
| `BI-BLDR-WORK-SOURCE-IS-EXACT` | PARTIAL | exact-source rules exist in current producer/App mechanics | planned Start Work must bind target HEAD once to immutable source identity |
| `BI-BLDR-WORK-CONTEXT-IS-DURABLE` | PARTIAL | exact Issue/workspace facts exist across current App owners | planned Builder workflow must make repository/target/source/work branch recoverable from the repository work |
| `BI-BLDR-HANDOFF-INTENT-IS-DURABLE` | PLANNED TARGET | no current canonical Handoff Intent field | new durable semantic Issue context/proof required |
| `BI-BLDR-EXACT-BUILD-SOURCE` | CURRENT | current producer exact readable-source boundary | current workflow/package validation responsibility |
| `BI-BLDR-NO-GUESSED-TOUCHED-BASE` | CURRENT | current producer + package protocol | current package validation responsibility |
| `BI-BLDR-PACKAGE-IS-COMPLETE` | CURRENT | package materialization + `PACKAGE-PROTOCOL.md` | current package validation contract |
| `BI-BLDR-NEW-ZIP-NEW-PACKAGE-ID` | CURRENT | package materialization + protocol | current package identity rule |
| `BI-BLDR-PACKAGE-CARRIES-EXACT-APPLICABILITY` | CURRENT | package materialization + protocol | current source-applicability contract |
| `BI-BLDR-REVIEW-EXACT-SAME-PACKAGE` | PLANNED TARGET | planned Builder replay/review | exact package replay/handoff identity proof required |
| `BI-BLDR-REPLAY-EXACT-EXPECTED-SOURCE` | PLANNED TARGET | planned Builder replay | exact clean-source proof required |
| `BI-BLDR-REPLAY-FRESH-WORKSPACE` | PLANNED TARGET | planned Builder replay | contamination/isolation proof required |
| `BI-BLDR-REPLAY-USES-CANONICAL-PACKAGE-SEMANTICS` | PLANNED TARGET | shared producer/consumer package semantics boundary | implementation/conformance design must prove Builder replay and App Apply do not drift |
| `BI-BLDR-REVIEW-FULL-RESULT` | PLANNED TARGET | planned Builder review material | full resulting repository inspection boundary/proof required |
| `BI-BLDR-CORRECTION-REQUIRES-NEW-PACKAGE` | PARTIAL | current new-ZIP/packageId rule exists; review invalidation flow does not | new review-loop proof required |
| `BI-BLDR-NO-REBUILD-AFTER-APPROVAL` | PLANNED TARGET | planned review→handoff boundary | exact approved package continuity proof required |
| `BI-BLDR-APPROVAL-BINDS-EXACT-RESULT` | PLANNED TARGET | planned review identity | exact repository-work/package/source/result binding proof required |
| `BI-BLDR-HANDOFF-VALUES-COME-FROM-REVIEW` | PLANNED TARGET | planned Review Result → ChatGPT handoff rendering | handoff technical values must be proven to originate from exact review result |

### Builder Domain / Slice boundary

No full Builder Aggregate, Slice portfolio or durable DI/SI set is selected by the Scenario migration alone.

When implementation planning discovers a durable Builder Domain/Slice/shared responsibility, add it under the same canonical `domain/`, `slices/` or `shared-implementation/` owner catalogs in this directory. Do not recreate a parallel `replacement-package-builder/` planning tree.

## App BI → realization map

| Behavior Item | State | Domain / Slice realization owner | Future/current owner delta | Proof responsibility |
|---|---|---|---|---|
| `BI-RPKG-HANDOFF-ROUTE-CONTROLS-AUTOMATIC-STOP` | PLANNED TARGET | Application composition + ChangeSet | concrete reviewed handoff route selects Apply-only / publish / finalize stopping point | route dispatch/resume proof required |
| `BI-RPKG-AUTOMATIC-AND-MANUAL-STAGES-SHARE-SEMANTICS` | PARTIAL | Application composition + `SL-RPKG-01` / target Finalize Slice | current modular/composed Apply subset exists; three-route target incomplete | prove identical state transitions across automatic/manual entry |
| `BI-RPKG-APPLY-ONLY-STOPS-UNCOMMITTED` | PARTIAL | `SL-RPKG-01` | current manual Apply analogue exists; reviewed-handoff route missing | prove no Commit/Push/PR/Finalize side effects |
| `BI-RPKG-APPLY-AND-PUBLISH-STOPS-BEFORE-INTEGRATION` | PARTIAL | `SL-RPKG-01` + Confirm Slice | current Apply→Commit→Publish exists; reviewed confirmation/route stop missing | published reviewed-result + open-Issue/no-PR stop proof |
| `BI-RPKG-APPLY-AND-FINALIZE-COMPLETES-WORK` | PLANNED TARGET | Application composition + ChangeSet + PR/Finalize Slices | full route not implemented | end-to-end resume/finalization proof |
| `BI-RPKG-SEMANTIC-STAGE-INPUT-FOLLOWS-ROUTE` | PLANNED TARGET | Application composition + Screen + Commit/Finalize Slices | handoff/UI semantic-input parity not implemented | input provenance + retry persistence proof |
| `BI-RPKG-PUSH-CONTINUES-TO-REVIEWED-CONFIRMATION` | PLANNED TARGET | Application composition + `SL-RPKG-01` + Confirm Slice | no separate ordinary Verify user step | prove successful publish dispatches deterministic confirmation and stops ReviewedPublished only after proof |
| `BI-RPKG-COMPOSED-RETRY-RESUMES-PERSISTED-INTENT` | PARTIAL | ChangeSet + application composition | current Git retry exists; route semantic-input/finalization tail missing | uncertain external side-effect recovery proof |
| `BI-RPKG-WORK-INTENT-ONE-EXACT-ISSUE` | CURRENT | Work Intent + `SL-RPKG-10` | current App create/recovery; target creation moves to Builder | current CoreTests; migration verification/adoption proof later |
| `BI-RPKG-WORK-INTENT-DURABLE` | CURRENT | Work Intent + `SL-RPKG-10` | current App persistence remains until migration | current CoreTests |
| `BI-RPKG-APPLY-EXACT-REPOSITORY-WORK` | PLANNED TARGET | ChangeSet + `SL-RPKG-01` + workspace migration | consume Builder-established Issue/workBranch/source/target; no competing work creation | exact handoff/work adoption + no-substitution proof |
| `BI-RPKG-APPLY-EXACT-PACKAGE` | PARTIAL | ChangeSet + `SL-RPKG-01` | exact package exists current; reviewed-package binding missing | reviewed package identity proof |
| `BI-RPKG-APPLY-EXACT-EXPECTED-SOURCE` | CURRENT/PARTIAL | ChangeSet + `SL-RPKG-01` | current source proof exists; target must bind Builder source/work branch | current CoreTests + target integration proof |
| `BI-RPKG-RETRY-RESUMES` | PARTIAL | ChangeSet + `SL-RPKG-01` | current Apply/Commit/Publish recovery; later FIs missing | route resume proof |
| `BI-RPKG-PARTIAL-STATE-TRUTHFUL` | CURRENT/PARTIAL | ChangeSet | current Git partial state exists; final logging/closure tail new | current CoreTests + target tail proof |
| `BI-RPKG-NO-NEXT-PACKAGE-WHILE-PUBLICATION-UNCERTAIN` | CURRENT | ChangeSet + `SL-RPKG-01` | reusable current rule | current CoreTests |
| `BI-RPKG-PUBLISHED-TREE-EQUALS-REVIEWED-TREE` | PLANNED TARGET | ChangeSet + Confirm Slice | reviewed-result identity expansion | exact Git tree equality proof |
| `BI-RPKG-VERIFY-EXECUTION-IDENTITY` | PLANNED TARGET | ChangeSet + Confirm Slice | bind tree equality to intended work/package/source | negative/mismatch proof |
| `BI-RPKG-NO-SECOND-SEMANTIC-REVIEW-WHEN-IDENTITY-PROVEN` | PLANNED TARGET | Confirm Slice | new semantic boundary | workflow proof |
| `BI-RPKG-VERIFY-FAILS-CLOSED` | PLANNED TARGET | ChangeSet + Confirm Slice | new | negative proof |
| `BI-RPKG-VERIFY-MISMATCH-PRESERVES-EVIDENCE` | PLANNED TARGET | ChangeSet + Confirm Slice | new | mismatch/recovery proof |
| `BI-RPKG-ONE-CORRECT-PR` | PLANNED TARGET | ChangeSet + Ensure PR Slice | PR now required only when Finalize requested | GitHub PR identity/currentness proof |
| `BI-RPKG-PR-HEAD-MUST-REPRESENT-CURRENT-WORK` | PLANNED TARGET | ChangeSet + Ensure PR Slice | new target work identity naming | stale-head negative proof |
| `BI-RPKG-PR-SEMANTIC-RECORD-IS-DURABLE` | PLANNED TARGET | Ensure PR Slice | semantic PR record from handoff/UI + system exact context | create/update/readback proof |
| `BI-RPKG-PR-FAILURE-DOES-NOT-ROLL-BACK-PUBLISHED-REVISION` | PLANNED TARGET | ChangeSet + Ensure PR Slice | reusable publication truth principle | recovery proof |
| `BI-RPKG-FINALIZE-ONLY-APPROVED-PUBLISHED-REVISION` | PLANNED TARGET; legacy analogue exists | ChangeSet + `SL-RPKG-03` target evolution | reviewed-result Finalize | precondition proof |
| `BI-RPKG-FINALIZE-PRESERVES-REVIEWED-CONTENT` | PLANNED TARGET | ChangeSet + target Finalize | new integration proof | moved-target/conflict cases |
| `BI-RPKG-TARGET-MOVEMENT-NOT-AUTOMATIC-STALE` | PLANNED TARGET | ChangeSet + target Finalize | new approval currentness | unchanged-result moved-target proof |
| `BI-RPKG-CONTENT-CHANGING-RECONCILIATION-STALES-APPROVAL` | PLANNED TARGET | ChangeSet + target Finalize | new | changed-result staleness proof |
| `BI-RPKG-FINAL-WORK-RECORD-PRECEDES-ISSUE-CLOSE` | PLANNED TARGET | `SL-RPKG-03` target evolution + Issue interaction | immutable final Issue comment before close | external ordering/recovery proof |
| `BI-RPKG-FINAL-WORK-RECORD-BINDS-PROVEN-RESULT` | PLANNED TARGET | ChangeSet + target Finalize | exact facts system-derived | exact content/readback proof |
| `BI-RPKG-FINAL-WORK-RECORD-NOT-DUPLICATED-BY-RETRY` | PLANNED TARGET | target Finalize recovery | new external comment reconciliation | lost-response/idempotency proof |
| `BI-RPKG-FINALIZED-WORK-IS-CLOSED` | PLANNED TARGET; legacy lifecycle differs | ChangeSet + target Finalize | Issue closure after final record | closure/new-work continuity proof |
| `BI-RPKG-SNAPSHOT-READ-ONLY` | CURRENT | Repository Snapshot + Export Slice | — | current CoreTests |
| `BI-RPKG-SNAPSHOT-EXACT-SOURCE` | CURRENT | Repository Snapshot + Repository Target | — | current CoreTests |
| `BI-RPKG-SNAPSHOT-NO-MIXED-CAPTURE` | CURRENT | Repository Snapshot + Export Slice | — | current CoreTests |
| `BI-RPKG-SNAPSHOT-HANDOFF-EXACT-ARTIFACT` | CURRENT | Repository Snapshot + External Interaction | — | current ChatBridge/Core proof |
| `BI-RPKG-SNAPSHOT-HANDOFF-FROZEN-DESTINATION` | CURRENT | External Interaction | — | current proof |
| `BI-RPKG-SNAPSHOT-DELIVERY-DOES-NOT-CHANGE-REVIEW-BINDING` | CURRENT | External Interaction + navigation | — | current proof |
| `BI-RPKG-SNAPSHOT-DELIVERY-FAILURE-DOES-NOT-INVALIDATE-EXPORT` | CURRENT | External Interaction + Repository Snapshot | — | current proof |
| `BI-RPKG-CURRENT-CHANGE-GIT-DERIVED` | PLANNED TARGET | ChangeSet diagnostic projection + Inspect Slice | legacy ReviewDiff → Git-derived target | new proof |
| `BI-RPKG-CURRENT-CHANGE-NOT-APPROVAL` | PLANNED TARGET transition | Inspect Slice + reviewed-result binding | diagnostic only | semantic boundary proof |
| `BI-RPKG-CURRENT-CHANGE-DIAGNOSTIC` | PLANNED TARGET transition | Inspect Slice | ordinary target flow independent of manual Current Change | workflow proof |

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

Builder replay and App Apply share one behavioral package-semantics requirement, but this map does not prematurely select a shared library vs another proved implementation shape.
