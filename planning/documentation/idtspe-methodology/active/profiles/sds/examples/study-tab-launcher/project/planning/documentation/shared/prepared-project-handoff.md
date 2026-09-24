# SH-STL-PREPARED-PROJECT-HANDOFF — Deferred project arrival and owner handoff

Status: active realized/current Shared Implementation Capability consumed by
ordinary and trusted project opening. A known coordinator concurrency concern
remains visible below.

## RU-SHARED-01 — Shared Capability Contract

**Methodology:** [RU-SHARED-01 Unit Definition](../../../../../../target-modules/TM-SHARED-IMPLEMENTATION-CAPABILITY.md#ru-shared-01--shared-capability-contract).

Capability ID: `SH-STL-PREPARED-PROJECT-HANDOFF`.

Responsibility: coordinate a browser-originated project operation from bounded
source-arrival waiting through opaque preparation, VS Code owner focus
acknowledgement and at-most-once redemption, without exposing local project,
destination or trust authority in the external focus URI.

The capability provides:

- immediate source check plus bounded polling of pure absence;
- loopback-only preparation for a fixed supported operation identity;
- a random, expiring, single-use authority bound to that prepared operation;
- token-only VS Code focus transfer and coordinator-owner acknowledgement;
- bounded redemption only after acknowledgement;
- fixed dispatch to the selected current consumer operation.

`D-STL-LOCAL-PROJECT-SELECTOR` owns exact source candidates and absence versus
ineligible meaning. Consumer Slices own their project/trusted destination,
publication, window and result policies. The Shared capability owns neither
Feature behavior nor Workspace Trust.

## RU-SHARED-02 — Consumer Requirement Bindings

**Methodology:** [RU-SHARED-02 Unit Definition](../../../../../../target-modules/TM-SHARED-IMPLEMENTATION-CAPABILITY.md#ru-shared-02--consumer-requirement-bindings).

| Consumer Slice | Consumer requirement | Role | Participation |
|---|---|---|---|
| [`SL-STL-OPEN-LOCAL-PROJECT`](../slices/open-local-project.md) | [`IR-SLICE-STL-PROJECT-02`](../slices/open-local-project.md#ir-slice-stl-project-02) | SATISFIES | Waits for the selected source, prepares the ordinary-project operation, transfers focus to the coordinator owner and permits one acknowledged dispatch. |
| [`SL-STL-COPY-TRUSTED-PROJECT`](../slices/copy-trusted-project.md) | [`IR-SLICE-STL-TRUST-04`](../slices/copy-trusted-project.md#ir-slice-stl-trust-04) | SATISFIES | Performs the same continuity protocol while binding authority to the distinct trusted-project operation; destination/trust data remains local to VS Code. |

## RU-SHARED-03 — Shared Capability Implementation Requirements

**Methodology:** [RU-SHARED-03 Unit Definition](../../../../../../target-modules/TM-SHARED-IMPLEMENTATION-CAPABILITY.md#ru-shared-03--shared-capability-implementation-requirements).

| Shared Implementation Requirement | Type | Plain implementation requirement | Realizes / protects | Related expected errors | QRPE / Examples |
|---|---|---|---|---|---|
| <a id="ir-shared-stl-handoff-01"></a>`IR-SHARED-STL-HANDOFF-01 — Bounded local ingress` | Safety, Authority | Browser coordination accepts only bounded marked JSON requests from allowed ChatGPT origins through the fixed loopback host/port and fixed operation routes, with request/concurrency/body limits. | [`BR-STL-PROJECT-06`](../features/open-local-project.md#br-stl-project-06), [`BR-STL-PROJECT-08`](../features/open-local-project.md#br-stl-project-08), [`BR-STL-TRUST-08`](../features/copy-trusted-project.md#br-stl-trust-08) | [`ERR-BEH-STL-PROJECT-HANDOFF-NOT-ESTABLISHED-04`](../features/open-local-project.md#err-beh-stl-project-handoff-not-established-04), [`ERR-BEH-STL-TRUST-HANDOFF-NOT-ESTABLISHED-09`](../features/copy-trusted-project.md#err-beh-stl-trust-handoff-not-established-09) | No externally reachable listener or arbitrary command surface is provided. |
| <a id="ir-shared-stl-handoff-02"></a>`IR-SHARED-STL-HANDOFF-02 — Poll only pure absence` | Recovery, Scope | Source waiting checks immediately, remains within the accepted deadline/candidate set and retries only the Domain's pure-absence result; collision, invalidity and I/O failure terminate immediately. | [`FBS-STL-PROJECT-02`](../features/open-local-project.md#fbs-stl-project-02), [`BR-STL-PROJECT-07`](../features/open-local-project.md#br-stl-project-07), [`FBS-STL-TRUST-01`](../features/copy-trusted-project.md#fbs-stl-trust-01) | [`ERR-BEH-STL-PROJECT-SOURCE-WAIT-TIMED-OUT-02`](../features/open-local-project.md#err-beh-stl-project-source-wait-timed-out-02), [`ERR-BEH-STL-TRUST-SOURCE-NOT-ELIGIBLE-02`](../features/copy-trusted-project.md#err-beh-stl-trust-source-not-eligible-02) | A wait of zero performs one immediate check. |
| <a id="ir-shared-stl-handoff-03"></a>`IR-SHARED-STL-HANDOFF-03 — Opaque correlated launch authority` | Identity, Authority | Preparation creates authority only after source discovery; the external URI carries only one opaque token bound to the fixed consumer operation/request and cannot override project, destination or trust policy. | [`FBS-STL-PROJECT-03`](../features/open-local-project.md#fbs-stl-project-03), [`BR-STL-PROJECT-06`](../features/open-local-project.md#br-stl-project-06), [`FBS-STL-TRUST-01`](../features/copy-trusted-project.md#fbs-stl-trust-01), [`BR-STL-TRUST-08`](../features/copy-trusted-project.md#br-stl-trust-08) | [`ERR-BEH-STL-PROJECT-HANDOFF-NOT-ESTABLISHED-04`](../features/open-local-project.md#err-beh-stl-project-handoff-not-established-04), [`ERR-BEH-STL-TRUST-HANDOFF-NOT-ESTABLISHED-09`](../features/copy-trusted-project.md#err-beh-stl-trust-handoff-not-established-09) | Prepared authority is short-lived and process-local. |
| <a id="ir-shared-stl-handoff-04"></a>`IR-SHARED-STL-HANDOFF-04 — Focus acknowledgement before at-most-once effect` | Continuity, Safety | Redemption cannot dispatch before the coordinator owner acknowledges focus; expired, unknown or consumed authority produces no project effect, and concurrency cannot dispatch the consumer operation more than once. | [`FBS-STL-PROJECT-04`](../features/open-local-project.md#fbs-stl-project-04), [`FBS-STL-PROJECT-05`](../features/open-local-project.md#fbs-stl-project-05), [`BR-STL-PROJECT-08`](../features/open-local-project.md#br-stl-project-08), [`FBS-STL-TRUST-01`](../features/copy-trusted-project.md#fbs-stl-trust-01), [`BR-STL-TRUST-08`](../features/copy-trusted-project.md#br-stl-trust-08) | [`ERR-BEH-STL-PROJECT-HANDOFF-NOT-ESTABLISHED-04`](../features/open-local-project.md#err-beh-stl-project-handoff-not-established-04), [`ERR-BEH-STL-TRUST-HANDOFF-NOT-ESTABLISHED-09`](../features/copy-trusted-project.md#err-beh-stl-trust-handoff-not-established-09) | Duplicate acknowledgement/redemption ordering is the current revalidation concern below. |

<a id="p-stl-handoff-01"></a>
### P-STL-HANDOFF-01 — Coordinator acknowledgement/redemption race

| Q/R/P field | Current value |
|---|---|
| Type / status / priority | `Problem` / `OPEN` / `P1` |
| Owning requirement | [`IR-SHARED-STL-HANDOFF-04`](#ir-shared-stl-handoff-04) |
| Observed evidence | A duplicate focus acknowledgement can receive HTTP `422` after concurrent redemption has consumed the same authority. On 2026-09-23 the audit-start 20-run sample produced 9 passes/11 failures and the post-repair documentation revalidation sample produced 11 passes/9 failures. On 2026-09-24 a further 10-run sample produced 5 passes/5 failures; the failure expected `200` and observed `422`. No duplicate project effect was observed. |
| Required treatment | Make acknowledgement/redemption state transition deterministic and serialized or atomic while preserving expiry, owner-focus gating and at-most-once consumer dispatch. |
| Blocking relation | Does not block planning or realization start for the selected succession Step; it blocks deterministic proof and owner materialization for that Step and keeps current handoff proof non-green. |
| Closure evidence | Repeated focused concurrency proof and the full suite are deterministic, retain at-most-once effects and preserve rejection of expired/unknown/consumed authority. |

This is an owner-local realization Problem, not another behavior requirement.
Consumer Features and Scenarios link here only for the consequence at their
own boundary.

<a id="dec-stl-prepared-handoff-01"></a>
### DEC-STL-PREPARED-HANDOFF-01 — Keep browser focus transfer token-only and owner-acknowledged

- **Status:** `ACCEPTED`.
- **Decision:** the browser-visible focus route carries only opaque prepared
  authority. The coordinator-owning VS Code instance acknowledges focus before
  one at-most-once redemption dispatches the fixed prepared operation.
- **Addresses:** browser-selected foreground transfer without granting the
  receiving URI host project, destination, command or trust authority.
- **Rationale:** putting project data or a general command in the external URI
  would widen browser authority; dispatch before owner acknowledgement would
  allow prompts/effects in the wrong window.
- **Integrated Into:** [`IR-SHARED-STL-HANDOFF-03`](#ir-shared-stl-handoff-03),
  [`IR-SHARED-STL-HANDOFF-04`](#ir-shared-stl-handoff-04) and both current
  consumer Slice bindings.
- **Related Q/R/P:** [P-STL-HANDOFF-01](#p-stl-handoff-01) remains `OPEN` against the accepted acknowledgement/redemption guarantee; its evidence and closure condition stay at that Problem owner.
- **Reconsider when:** the browser-to-installed-application focus boundary or
  the single coordinator-owner topology is intentionally replaced.
- **Review provenance:** accepted conclusions from the former project-opening
  design-selection record, revalidated by the SDS documentation audit on
  2026-09-23.

## RU-SHARED-04 — Evolution Impact

**Methodology:** [RU-SHARED-04 Unit Definition](../../../../../../target-modules/TM-SHARED-IMPLEMENTATION-CAPABILITY.md#ru-shared-04--evolution-impact).

The selected
[EVO-STL-CLOSE-SUPERSEDED-PROJECT-WINDOWS](../evolution/unrealized/close-superseded-project-windows.md)
plans to extend the local coordinator with authenticated multi-window
registration/callback work while preserving the current handoff authority.
Revalidate this capability's ingress, token identity, owner focus and current
consumer bindings, and resolve the concurrency concern before or as part of
that Step's proof. The Step's new succession Slice remains future Step-owned;
it is not a current third consumer binding here.

## Proof / representation

Focused proof covers immediate/delayed arrival, timeout, origin/marker/body
rejection, preparation without effects, expiry, acknowledgement gating and
single redemption. Consumer Slice proof covers the actual ordinary/trusted
operation. Live browser/Windows/VS Code foreground observation remains
external evidence owned by
[`PTEST-STL-INSTALLED-HANDOFF`](../practical-tests/installed-browser-vscode-handoff.md).
Current executable representation is centered in
[`src/shared/prepared-project-handoff/projectArrivalPolling.ts`](../../../src/shared/prepared-project-handoff/projectArrivalPolling.ts),
[`src/shared/prepared-project-handoff/projectArrivalServer.ts`](../../../src/shared/prepared-project-handoff/projectArrivalServer.ts)
and
[`src/shared/prepared-project-handoff/projectOwnerFocusClient.ts`](../../../src/shared/prepared-project-handoff/projectOwnerFocusClient.ts).
