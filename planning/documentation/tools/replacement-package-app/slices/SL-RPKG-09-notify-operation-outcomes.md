# SL-RPKG-09 — Present Operation Outcomes

Status: proposed current Slice owner for **in-application outcome presentation/navigation only**.

This current Slice does **not** establish realized OS/background notification capability. The selected future [`Add Operation Notifications`](../evolution-steps/EVO-RPKG-ADD-OPERATION-NOTIFICATIONS.md) Step adds that distinct user-attention behavior.

## Realizes Upstream Scenario Requirement
- [Keep Terminal Outcome Understandable](../scenarios/SCN-RPKG-COMPLETE-REPOSITORY-WORK.md#sr-rpkg-keep-terminal-outcome-understandable-03)

## RU-SOWN-01 — Behavior Realization Contract
Responsibility: project an already-resolved top-level terminal/recovery outcome into current application feedback/navigation without becoming behavior/error semantic authority.

| Subject | Realization | IR-SLICE | QRPE / Examples |
|---|---|---|---|
| top-level success | current in-app presentation | `IR-SLICE-RPKG-PRESENT-ONLY-PROVEN-SUCCESS` | Problem Example: Publish is uncertain but UI says “Published”. |
| expected failure | consume Feature/Domain/Slice typed outcome | `IR-SLICE-RPKG-PRESENT-EXPECTED-MEANING` | — |
| unexpected boundary failure | presentation + diagnostics | `IR-SLICE-RPKG-PRESENT-UNEXPECTED-SEPARATE` | Do not relabel unknown exception as known semantic failure. |
| presentation activation | navigation only | `IR-SLICE-RPKG-PRESENTATION-NO-MUTATION` | Problem Example: opening an outcome surface retries Publish. |

## RU-SOWN-03 — Evolution Impact
| Evolution Step | Why this Slice changes |
|---|---|
| [Add Operation Notifications](../evolution-steps/EVO-RPKG-ADD-OPERATION-NOTIFICATIONS.md) | Adds a distinct background/OS attention channel while preserving current result truth and no-mutation presentation semantics. |

The Slice does not own semantic meaning of behavior errors and does not make notification delivery proof of the underlying operation result.
