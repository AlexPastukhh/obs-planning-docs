# Replacement Package App — Behavior Realization Map

Status: active derived current/target navigation

This file is **not** behavior authority and does not redefine BIs. Canonical BI meaning remains in Scenario owners. It answers one migration question: **where is each selected BI realized now, where will it be realized, and what proof responsibility exists?**

Status meanings:

- `CURRENT` — current implementation capability already corresponds to the selected BI meaning.
- `PARTIAL` — a real current capability exists, but the full target BI/Scenario meaning is not implemented.
- `PLANNED TARGET` — selected future behavior; do not treat as implemented.
- `PLANNED TARGET transition` — current legacy behavior exists, but its selected future semantic role changes.
- `PLANNED TARGET; legacy analogue exists` — a legacy operation exists but does not satisfy the target reviewed-result semantics.

A proof-responsibility entry says where proof belongs/exists; it is **not** a claim that tests passed for the currently reviewed commit.

## BI → realization map

| Behavior Item | State | Current realization / downstream routing | Current DI/SI or planned requirement status | Proof state/responsibility |
|---|---|---|---|---|
| `BI-RPKG-COMPOSED-AND-MODULAR-ROUTES-SHARE-SEMANTICS` | PARTIAL | Application composition / Slice | — | current subset in CoreTests; later FI chain missing |
| `BI-RPKG-COMMANDS-DO-NOT-DEFINE-FI-BOUNDARIES` | PARTIAL | Application composition / docs | — | documentation + composition review; not a standalone runtime proof |
| `BI-RPKG-COMPOSED-RETRY-RESUMES-ACROSS-FIS` | PARTIAL | Application composition + ChangeSet | `SI-RPKG-RETRY-BY-PROOF-NOT-RESTART` | current WorkIntent/workspace/apply/publish resume proof; later FIs missing |
| `BI-RPKG-APPLY-ONLY-STOPS-UNCOMMITTED` | PLANNED TARGET | downstream Requirements Discovery; current modular Apply is only a partial analogue | owner/Item TBD | new route-boundary proof required |
| `BI-RPKG-APPLY-AND-PUBLISH-STOPS-PRE-INTEGRATION` | PLANNED TARGET | downstream Requirements Discovery; current target-mode publish is only a partial analogue | owner/Item TBD | reviewed-result-confirmation + stop-boundary proof required |
| `BI-RPKG-APPLY-AND-FINALIZE-USES-SAME-PRECONDITIONS` | PLANNED TARGET | downstream Requirements Discovery | owner/Item TBD | new target proof required |
| `BI-RPKG-WORK-INTENT-ONE-EXACT-ISSUE` | CURRENT | Work Intent Aggregate | `SI-RPKG-WORK-INTENT-DURABLE-CREATE-RECOVERY` | CoreTests responsibility exists |
| `BI-RPKG-WORK-INTENT-DURABLE` | CURRENT | Work Intent Aggregate | `SI-RPKG-WORK-INTENT-DURABLE-CREATE-RECOVERY` | CoreTests responsibility exists |
| `BI-RPKG-APPLY-EXACT-REPOSITORY-TARGET` | CURRENT | Repository Target + ChangeSet | `DI-RPKG-REPOSITORY-TARGET-STABLE-IDENTITY` | CoreTests responsibility exists |
| `BI-RPKG-APPLY-EXACT-PACKAGE` | PARTIAL | ChangeSet + Realize Reviewed Package Slice | `DI-RPKG-CHANGESET-PINNED-GIT-BOUNDARY` | exact current package proof exists; reviewed-package binding missing |
| `BI-RPKG-APPLY-EXACT-EXPECTED-SOURCE` | CURRENT | ChangeSet + Realize Reviewed Package Slice | `DI-RPKG-CHANGESET-PINNED-GIT-BOUNDARY` | CoreTests package/base proof responsibility exists |
| `BI-RPKG-ORDINARY-APPLY-COMPOSES-INTERNAL-ACTIONS` | PARTIAL | Application composition + ChangeSet | `SI-RPKG-RETRY-BY-PROOF-NOT-RESTART` | current workspace/apply/commit/publish composition proved; later FIs missing |
| `BI-RPKG-RETRY-RESUMES` | PARTIAL | ChangeSet + realization Slice | `SI-RPKG-RETRY-BY-PROOF-NOT-RESTART` | current execution states proved; target Confirm/PR/Finalize resume missing |
| `BI-RPKG-PARTIAL-STATE-TRUTHFUL` | CURRENT | ChangeSet | `SI-RPKG-APPLY-JOURNAL-BEFORE-MUTATION` | CoreTests responsibility exists |
| `BI-RPKG-NO-NEXT-PACKAGE-WHILE-PUBLICATION-UNCERTAIN` | CURRENT | ChangeSet | `SI-RPKG-RETRY-BY-PROOF-NOT-RESTART` | CoreTests publication uncertainty responsibility exists |
| `BI-RPKG-PUBLISHED-TREE-EQUALS-REVIEWED-TREE` | PLANNED TARGET | TBD by downstream Requirements Discovery | planned requirement; owner/Item TBD | new proof required |
| `BI-RPKG-VERIFY-EXECUTION-IDENTITY` | PLANNED TARGET | TBD by downstream Requirements Discovery | planned requirement; owner/Item TBD | new proof required |
| `BI-RPKG-NO-SECOND-SEMANTIC-REVIEW-WHEN-IDENTITY-PROVEN` | PLANNED TARGET | TBD by downstream Requirements Discovery | planned requirement; owner/Item TBD | new proof required |
| `BI-RPKG-VERIFY-FAILS-CLOSED` | PLANNED TARGET | TBD by downstream Requirements Discovery | planned requirement; owner/Item TBD | negative proof required |
| `BI-RPKG-VERIFY-MISMATCH-PRESERVES-EVIDENCE` | PLANNED TARGET | TBD by downstream Requirements Discovery | planned requirement; owner/Item TBD | negative/recovery proof required |
| `BI-RPKG-ONE-CORRECT-PR` | PLANNED TARGET | TBD by downstream Requirements Discovery | — | new GitHub/PR integration proof required |
| `BI-RPKG-PR-FAILURE-DOES-NOT-ROLL-BACK-PUBLISHED-REVISION` | PLANNED TARGET | TBD by downstream Requirements Discovery | — | new recovery proof required |
| `BI-RPKG-PR-HEAD-MUST-REPRESENT-CURRENT-CHANGESET` | PLANNED TARGET | TBD by downstream Requirements Discovery | planned requirement; owner/Item TBD | new currentness proof required |
| `BI-RPKG-FINALIZE-ONLY-APPROVED-PUBLISHED-REVISION` | PLANNED TARGET; legacy analogue exists | TBD by downstream Requirements Discovery | planned requirement; owner/Item TBD | new target Finalize proof required |
| `BI-RPKG-FINALIZE-PRESERVES-REVIEWED-CONTENT` | PLANNED TARGET; legacy analogue exists | TBD by downstream Requirements Discovery | planned requirement; owner/Item TBD | new integration proof required |
| `BI-RPKG-TARGET-MOVEMENT-NOT-AUTOMATIC-STALE` | PLANNED TARGET | TBD by downstream Requirements Discovery | planned requirement; owner/Item TBD | new moved-target unchanged-result proof required |
| `BI-RPKG-CONTENT-CHANGING-RECONCILIATION-STALES-APPROVAL` | PLANNED TARGET | TBD by downstream Requirements Discovery | planned requirement; owner/Item TBD | new changed-result staleness proof required |
| `BI-RPKG-FINAL-WORK-RECORD-BEFORE-ISSUE-CLOSE` | PLANNED TARGET | TBD by downstream Requirements Discovery | owner/Item TBD | integration + external Issue side-effect recovery proof required |
| `BI-RPKG-FINALIZED-WORK-IS-CLOSED` | PLANNED TARGET; legacy lifecycle differs | TBD by downstream Requirements Discovery | — | new closure/new-ChangeSet continuity proof required |
| `BI-RPKG-SNAPSHOT-READ-ONLY` | CURRENT | Repository Snapshot + Export Slice | `SI-RPKG-SNAPSHOT-CONSISTENCY-PROOF` | CoreTests responsibility exists |
| `BI-RPKG-SNAPSHOT-EXACT-SOURCE` | CURRENT | Repository Snapshot + Repository Target | `SI-RPKG-SNAPSHOT-CONSISTENCY-PROOF` | CoreTests responsibility exists |
| `BI-RPKG-SNAPSHOT-NO-MIXED-CAPTURE` | CURRENT | Repository Snapshot + Export Slice | `SI-RPKG-SNAPSHOT-CONSISTENCY-PROOF` | CoreTests responsibility exists |
| `BI-RPKG-SNAPSHOT-HANDOFF-EXACT-ARTIFACT` | CURRENT | Repository Snapshot + External Interaction | `SI-RPKG-HANDOFF-FROZEN-DESTINATION` | ChatBridge/Core proof responsibility exists |
| `BI-RPKG-SNAPSHOT-HANDOFF-FROZEN-DESTINATION` | CURRENT | External Interaction | `SI-RPKG-HANDOFF-FROZEN-DESTINATION` | ChatBridge/Core proof responsibility exists |
| `BI-RPKG-SNAPSHOT-DELIVERY-DOES-NOT-CHANGE-REVIEW-BINDING` | CURRENT | External Interaction + ChangeSet navigation | `SI-RPKG-HANDOFF-FROZEN-DESTINATION` | current bridge/source contract responsibility exists |
| `BI-RPKG-SNAPSHOT-DELIVERY-FAILURE-DOES-NOT-INVALIDATE-EXPORT` | CURRENT | External Interaction + Repository Snapshot | — | ChatBridge/Core separation proof responsibility exists |
| `BI-RPKG-CURRENT-CHANGE-GIT-DERIVED` | PLANNED TARGET | TBD by downstream Requirements Discovery | planned requirement; owner/Item TBD | legacy ReviewDiff proof exists; Git-derived target proof missing |
| `BI-RPKG-CURRENT-CHANGE-NOT-APPROVAL` | PLANNED TARGET transition | TBD by downstream Requirements Discovery | — | new semantic boundary proof required |
| `BI-RPKG-CURRENT-CHANGE-DIAGNOSTIC` | PLANNED TARGET transition | TBD by downstream Requirements Discovery | — | ordinary target workflow proof must not depend on manual handoff |

## Aggregate summary

```text
Repository Target
  → exact local repository identity

Work Intent Aggregate
  → durable semantic work / exact managed Issue

Repository Work / ChangeSet Aggregate
  → base/published Git identity
  → current execution truth
  → package realization/recovery
  → PLANNED: reviewed-result binding
  → PLANNED: PR currentness
  → PLANNED: approval staleness + Finalize/integration closure

External Interaction Aggregate
  → exact source/artifact + exact destination + delivery uncertainty

Repository Snapshot Domain Object
  → exact immutable exported context artifact
```

No rule requires one Aggregate per BI. Cross-FI command BIs remain application-composition responsibilities where no Domain invariant is needed.
