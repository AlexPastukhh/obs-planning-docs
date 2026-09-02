# Replacement Package Builder — Behavior Realization Map

Status: active derived current/target migration map

Canonical BI meaning remains in the planned Builder Scenario. This file only maps selected target BIs to current capability, planned realization ownership and proof gaps.

## Domain boundary decision

Do **not** invent a full Builder Aggregate model yet. The current producer is primarily a documented workflow rather than a selected code-backed application Domain. One likely future consistency concept is an immutable **Candidate Package Revision** (`Pn` + exact expected source + predicted result identity + review decision), but its Aggregate status remains a design decision for implementation planning.

## BI → realization map

| Behavior Item | State | Realization owner | Candidate DI/SI | Proof state/responsibility |
|---|---|---|---|---|
| `BI-BLDR-EXACT-BUILD-SOURCE` | CURRENT capability | Current builder workflow / exact source boundary | `SI-BLDR-EXACT-SOURCE-FAIL-CLOSED` | workflow validation; no new replay proof yet |
| `BI-BLDR-NO-GUESSED-TOUCHED-BASE` | CURRENT capability | Current builder workflow + package protocol | `SI-BLDR-EXACT-SOURCE-FAIL-CLOSED` | workflow/package validation responsibility |
| `BI-BLDR-CANDIDATE-USES-EXACT-SOURCE` | CURRENT/PARTIAL | Builder workflow | `SI-BLDR-EXACT-SOURCE-FAIL-CLOSED` | current exact-source rule exists; target candidate owner not yet canonical |
| `BI-BLDR-CANDIDATE-CHANGE-INVALIDATES-REVIEW` | PLANNED TARGET | Builder review orchestration | `DI-BLDR-CANDIDATE-REVISION-IDENTITY` | new state/proof required |
| `BI-BLDR-PACKAGE-IS-COMPLETE` | CURRENT capability | Package materialization + PACKAGE-PROTOCOL | `SI-BLDR-DETERMINISTIC-PACKAGE-MATERIALIZATION` | current package validation contract |
| `BI-BLDR-NEW-ZIP-NEW-PACKAGE-ID` | CURRENT capability | Package materialization + PACKAGE-PROTOCOL | `DI-BLDR-CANDIDATE-REVISION-IDENTITY` | current package protocol rule |
| `BI-BLDR-PACKAGE-CARRIES-EXACT-APPLICABILITY` | CURRENT capability | Package materialization + PACKAGE-PROTOCOL | `SI-BLDR-DETERMINISTIC-PACKAGE-MATERIALIZATION` | current package validation contract |
| `BI-BLDR-REVIEW-EXACT-SAME-PACKAGE` | PLANNED TARGET | Replay/review orchestration | `DI-BLDR-CANDIDATE-REVISION-IDENTITY` | new replay/review proof required |
| `BI-BLDR-REPLAY-EXACT-EXPECTED-SOURCE` | PLANNED TARGET | Replay orchestration | `SI-BLDR-CLEAN-EXACT-REPLAY` | new replay proof required |
| `BI-BLDR-REPLAY-FRESH-WORKSPACE` | PLANNED TARGET | Replay orchestration | `SI-BLDR-CLEAN-EXACT-REPLAY` | new contamination/reconstruction proof required |
| `BI-BLDR-REVIEW-LATEST-AND-CUMULATIVE` | PLANNED TARGET | Review orchestration | — | new review-material proof required |
| `BI-BLDR-REVIEW-FULL-RESULT` | PLANNED TARGET | Review orchestration | — | new full-result inspection boundary required |
| `BI-BLDR-CORRECTION-REQUIRES-NEW-PACKAGE` | PARTIAL | Candidate revision + package materialization | `DI-BLDR-CANDIDATE-REVISION-IDENTITY` | new review invalidation proof; packageId rule already exists |
| `BI-BLDR-NO-REBUILD-AFTER-APPROVAL` | PLANNED TARGET | Candidate revision + handoff | `DI-BLDR-CANDIDATE-REVISION-IDENTITY` | new approval→handoff identity proof required |
| `BI-BLDR-HANDOFF-REVIEWED-PACKAGE` | PARTIAL | Current handoff + planned review binding | `DI-BLDR-CANDIDATE-REVISION-IDENTITY` | exact ZIP handoff exists; reviewed identity proof missing |
| `BI-BLDR-HANDOFF-RESULT-IDENTITY` | PLANNED TARGET | Builder↔consumer handoff contract | `DI-BLDR-CANDIDATE-REVISION-IDENTITY` | schema/proof contract still open by target document |

## Candidate implementation constraints

- `SI-BLDR-EXACT-SOURCE-FAIL-CLOSED` — exact source/touched base must be readable and identified before package semantics are claimed.
- `SI-BLDR-DETERMINISTIC-PACKAGE-MATERIALIZATION` — package payload/manifest identity must be materialized deterministically from selected exact inputs.
- `SI-BLDR-CLEAN-EXACT-REPLAY` — target review replay uses the exact package from its exact expected source in a fresh isolated workspace.
- `DI-BLDR-CANDIDATE-REVISION-IDENTITY` — if selected during implementation design, approval and handoff bind to one immutable candidate/package/result identity; material correction ends that review identity.

These are implementation-planning candidates, not independent behavior authority. Promote a candidate into a durable implementation item only when implementation design makes that constraint necessary.
