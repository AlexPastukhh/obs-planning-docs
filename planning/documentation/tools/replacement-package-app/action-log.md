# Scope Action Log

Scope: `SCOPE-REPLACEMENT-PACKAGE-APP`
Status: active cumulative high-level log

Logging starts only after explicit user instruction; no pre-start history is reconstructed automatically.

## Entries

### XREF-001 — Registered scope/log architecture bootstrap

**Type:** CROSS-SCOPE REFERENCE  
**Canonical Log:** `planning/documentation/action-log.md`  
**Entry:** `LOG-DOC-005`  
**Reason:** this scope/log was established as part of the cross-scope registered-scope/log migration. Full rationale and application history are owned by the canonical entry.

### LOG-RPKG-001 — Replacement Package App SDS planning review

**Type:** IDEA REVIEW  
**Source:** current Replacement Package App planning conversation  
**Current Conclusions / selected meaning:** migrate application documentation to Modular / Medium SDS; define application behavior from user-world Need/result Scenarios before Domain and realization; preserve DATA, Behavior, Visual/Screen and Requirement meaning; treat current implementation operations as downstream Slices rather than Scenario identity.

### LOG-RPKG-002 — Scenario, Domain, Slice and testing clarifications

**Type:** IDEA CLARIFICATION  
**Updates:** `LOG-RPKG-001`  
**Clarification / resulting meaning:** `Apply`, `Review`, `Finalize`, snapshot export/attach and ReviewDiff delivery are not Scenarios merely because they are separate commands/capabilities. Current Scenario inventory is regrouped around complete repository work, repository-context handoff and current-change handoff. Domain discovery keeps a small ChangeSet/repository/ownership/lifecycle semantic core and records `Repository Work` as an aggregate candidate rather than deriving entities from Java classes. Current implementation is represented through six separately checkable Slices. Automated E2E is not selected; cross-Slice proof uses automated component/integration tests plus a manual practical-testing plan for real Swing/Windows/Edge/ChatGPT behavior.

### LOG-RPKG-003 — Apply SDS documentation migration

**Type:** APPLIED  
**Applied From:** `LOG-RPKG-001`, `LOG-RPKG-002`  
**Target-State Result:** after successful package Apply, Replacement Package App documentation routes through Modular SDS owners: application-plan → user-world Scenarios/visual meaning → Domain draft → implementation Slices → testing strategy, while legacy operation-shaped UC/Scenario paths remain compatibility-only and existing implementation contracts/source/tests remain downstream evidence.  
**Rationale:** make semantic ownership match reusable SDS methodology without pretending current implementation or manual browser acceptance changed.  
**ChangeSet:** `763133c4-b4fa-4d54-a72c-d7e9b9c370fc`

### LOG-RPKG-004 — ReviewDiff correction for SDS ownership, Slice dependencies and manual proof

**Type:** REVIEW DIFF  
**Reviewed:** ChangeSet `763133c4-b4fa-4d54-a72c-d7e9b9c370fc` / package `5a91cc08-9655-4ad5-af80-ee07b790b263`  
**Material Finding / selected correction:** root `DIR-REPLACEMENT-PACKAGE-APP` still routed to the legacy Application Use-Case index; the Slice graph incorrectly made current-change delivery look downstream of Finalize; two operation-time safety rules were represented as Domain invariants; and the new testing strategy described Slice-oriented manual practical testing without yet materializing that structure in `MANUAL-ACCEPTANCE.md`.  
**Resulting Current Meaning:** route the Application Direction directly to the Scenario Catalog; branch `SL-RPKG-03` and `SL-RPKG-06` independently from `SL-RPKG-02`; keep repository revalidation/full-applicability rules in Application Behavior/Requirements rather than Domain identity; organize manual practical testing as `PA-SL01..PA-SL06` while preserving shared Windows/launcher/output checks.

### LOG-RPKG-005 — Apply SDS ReviewDiff correction

**Type:** APPLIED  
**Applied From:** `LOG-RPKG-004`  
**Target-State Result:** after successful package Apply, root semantic navigation, Domain/Slice ownership boundaries and manual practical-testing structure are coherent with the Modular SDS plan; the same six implementation Slices remain current realization and live Edge/ChatGPT success still requires executed manual evidence.  
**Rationale:** correct material semantic/traceability defects without changing application implementation or pretending planned proof has executed.  
**ChangeSet:** `763133c4-b4fa-4d54-a72c-d7e9b9c370fc`  
**Package:** `942b4acd-e43f-49ca-9f01-7ea47ef3b040`

### LOG-RPKG-006 — ReviewDiff correction for Direction semantic name

**Type:** REVIEW DIFF  
**Reviewed:** ChangeSet `763133c4-b4fa-4d54-a72c-d7e9b9c370fc` / package `942b4acd-e43f-49ca-9f01-7ea47ef3b040`  
**Material Finding / selected correction:** `DIR-REPLACEMENT-PACKAGE-APP` already routes to user-world Scenarios and covers repository work plus repository/change-context handoff, but its remaining semantic name `Apply / Review / Finalize Replacement Packages` still describes three internal operations and understates the Direction scope.  
**Resulting Current Meaning:** preserve stable Direction ID `DIR-REPLACEMENT-PACKAGE-APP` and rename its semantic name to `Use Replacement Package App` in both the root registry and application Direction owner. The existing Purpose and Scenario route remain unchanged.

### LOG-RPKG-007 — Apply Direction semantic-name correction

**Type:** APPLIED  
**Applied From:** `LOG-RPKG-006`  
**Target-State Result:** after successful package Apply, `DIR-REPLACEMENT-PACKAGE-APP` is named `Use Replacement Package App` consistently at root and application scope, so Direction identity expresses the application responsibility rather than the internal Apply/Review/Finalize operations.  
**Rationale:** complete the SDS semantic-ownership correction without changing Direction ID, Scenario boundaries, implementation or testing state.  
**ChangeSet:** `763133c4-b4fa-4d54-a72c-d7e9b9c370fc`  
**Package:** `55948837-d778-41d3-9268-baafea4933d8`

### LOG-RPKG-008 — Resolve target SDS behavior before application implementation

**Type:** IDEA CLARIFICATION / INTEGRATED CONSISTENCY REVIEW  
**Updates:** `LOG-RPKG-001..007`  
**Source:** accumulated Replacement Package App planning discussion after the Modular SDS migration and its ReviewDiff corrections

**Clarification / Resulting Meaning:**
- documentation-first gate is selected: canonical SDS semantics, downstream contracts/state/architecture and practical-testing plans are updated/reviewed before Java/Swing/extension implementation changes;
- target Scenario inventory is four user-world Scenarios: Complete Prepared Repository Work, Find And Open Existing Repository Work, Provide Current Change, and Provide Repository Context; Scenario and Slice boundaries remain bidirectionally independent;
- `Repository Work` remains the core aggregate candidate; Repository Target has stable Target ID, logical Repository Identity and mutable Repository Location; explicit `Change repository location` validates Git work tree + matching origin, updates the same target and preserves every ChangeSet, while automatic clone substitution is forbidden;
- `External Interaction` becomes a strong separate aggregate candidate for one exact payload/artifact → one exact ChatGPT conversation; `User Operation` remains Application process/outcome state rather than a Domain aggregate;
- target Apply keeps package/action input passive, resolves/captures exact repository context only on Apply, honors stored target for existing ChangeSet continuation, does not guess among same-identity clones, keeps an auto-selected repository current after later preflight failure, and reports Repository Not Ready for baseline-dependent operations on repositories without a first commit;
- expected source-state protection is clarified as stale/out-of-band-change protection separate from Path Ownership: raw exact base/current equality passes; otherwise selected target compares expected and actual bytes through Git path-specific clean/filter semantics (binary-safe Git canonical identity, design equivalent to `git hash-object --stdin --path=<path>`); Git-equivalent representation passes while changed/unverifiable source fails closed; no naive LF/CRLF conversion or separate tracked/HEAD-equality requirement is selected;
- global Existing Work target defaults to Active + Publication Pending + any failed-latest ChangeSet, history adds remaining Finalized, failed-latest sorts first, and selection establishes exact Repository Target + ChangeSet navigation only; when `Show History` is enabled and an exact Finalized ChangeSet is selected, the UI exposes explicit `Reopen ChangeSet` without reopening on selection;
- explicit Reopen is a recovery branch inside Complete Repository Work, not a new Scenario/Slice: it preserves the same ChangeSet identity and historical finalization evidence, revalidates the exact Repository Target, and returns Finalized→Active only when historical path ownership can be reacquired without stealing sibling unfinished ownership or silently adopting unrelated dirty/unowned state; conflict leaves lifecycle/ownership unchanged;
- each ChangeSet persists a compact latest relevant operation outcome/reason/timestamp for restart error-marker presentation; later relevant success clears the marker while publication lifecycle stays independent; no generic persistent operation-history list is selected;
- tracked meaningful User Operations include Apply, Finalize, Retry Push, explicit Reopen ChangeSet, Repository Snapshot export, ChatGPT handoffs and Change Repository Location; terminal success always notifies, failure/action-required always notifies with concise reason; notification click foregrounds/selects exact Repository Target only and never auto-selects ChangeSet or invokes the operation;
- common External Interaction list includes current-change and snapshot handoffs only (not pairing/heartbeat/claim/lease/tab mechanics), shows active/actionable + current-session terminal history, and persists across restart only safety/recovery/idempotency-critical state;
- Cancel never automatically deletes already-prepared ChatGPT text/attachment: before possible Send it stops future automation and may report `Cancelled — prepared content retained`; once Send may have happened, Sent/uncertain truth is preserved;
- target Slice strategy keeps current SL-01..06 explicit and adds SL-07 Discover/Open Existing Work, SL-08 Manage External Interactions and SL-09 Notify Operation Outcomes; repository-location editing and clean technical diagnostics remain cross-Slice Behavior;
- testing remains automated component/integration + Manual Practical Testing; no automated Swing/Edge E2E layer is selected.

**Questions / Risks / Problems:** no unresolved product/UX question remains for this target documentation revision. Git source-state canonical comparison and live Windows/Edge behavior remain implementation/proof work, not product-choice blockers.

### LOG-RPKG-009 — Apply selected target SDS documentation revision

**Type:** APPLIED  
**Applied From:** `LOG-RPKG-008`  
**ChangeSet:** `d41911d6-4e3f-4035-a46b-b95775b5eee0`  
**Package:** `568de348-d577-4644-808c-27c3d6b259de`

**Target-State Result:** after successful Apply of this documentation package:
- Replacement Package App semantic owners express the four selected target Scenarios, stable Repository Target identity/location model, Repository Work + External Interaction aggregate candidates and User Operation application-process boundary;
- application-plan/scenarios/screens/domain/slices/testing consistently express passive package input, Apply-time target resolution, Repository Not Ready, repository-scoped ownership, Git path-semantic expected-source proof, explicit repository-location change, global work discovery/latest-operation marker, explicit guarded Finalized→Active Reopen, common External Interaction cancel/history, always-on terminal operation notifications and separate technical diagnostics;
- `slices.md` and testing docs explicitly preserve six current implementation Slices while describing target SL-01..09 and target proof cards without claiming target Java/extension behavior already exists;
- downstream state/architecture/package/snapshot/bridge/manual/README docs contain explicit selected-target deltas while retaining current implementation contracts; active V0.1 shared package literal is **not** prematurely changed before consumer implementation, so current producer/consumer compatibility remains truthful;
- no Java/extension/source implementation, commit, push or operational acceptance is performed by this package.

**Rationale:** make the complete selected SDS target internally coherent and implementation-ready, including the newly selected manual Reopen recovery behavior, while preserving an explicit current-vs-target boundary before application code changes.

### LOG-RPKG-010 — ReviewDiff correction for work-history markers and exact continuation identity

**Type:** REVIEW DIFF / IDEA CLARIFICATION  
**Reviewed:** ChangeSet `d41911d6-4e3f-4035-a46b-b95775b5eee0` / package `568de348-d577-4644-808c-27c3d6b259de`  
**Material Finding / selected correction:**
- Existing Work default visibility must represent unfinished work only: Active + Publication Pending. `Show History` adds all Finalized work; a failure must not pull Finalized history into the default list.
- persistent latest-operation error markers belong to unfinished work. Failed `Reopen ChangeSet` remains Finalized and is surfaced through the operation result, Windows notification and diagnostics, without a persistent Finalized-row marker;
- current package semantics already make `PACKAGE.json.changeSetId` the exact logical continuation identity. Documentation/testing now states explicitly that UI-selected, same-label, recent or another Active ChangeSet cannot substitute; an exact Finalized ID blocks Apply and requires explicit Reopen rather than auto-reopen;
- SL-RPKG-03 target deliverable explicitly includes its guarded Finalized→Active lifecycle-recovery result, while SL-RPKG-07 owns only history discovery/Reopen entry presentation;
- no dedicated `Paste OBS-ACTION` clipboard button/Behavior is selected; ordinary OBS-ACTION field insertion remains sufficient.

**Resulting Meaning:** lifecycle visibility, error attention, Apply identity authority and Reopen recovery are independent: Finalized stays history until successful explicit Reopen; unfinished failures may carry a persistent marker; package identity cannot be retargeted by UI navigation.

### LOG-RPKG-011 — Apply ReviewDiff consistency correction

**Type:** APPLIED  
**Applied From:** `LOG-RPKG-010`  
**ChangeSet:** `d41911d6-4e3f-4035-a46b-b95775b5eee0`  
**Package:** `8c3affba-f4ad-40b1-be04-8afe8bb16f32`

**Target-State Result:** after successful Apply of this correction package:
- canonical SDS owners and downstream target-aware docs use Active + Publication Pending as the default Existing Work projection, with all Finalized work behind `Show History`;
- persistent latest-operation error markers are limited to unfinished work; failed Reopen remains Finalized and is communicated through notification/result/diagnostics without a Finalized marker;
- Apply documentation/proof explicitly preserves exact `PACKAGE.json.changeSetId` continuation authority independently from mutable UI ChangeSet selection;
- SL-RPKG-03 deliverable includes guarded Reopen recovery consistently with Scenario, Domain, state, UI and testing documents;
- the revision remains documentation-only: no Java/extension implementation, commit, push or operational acceptance is performed by this package.

**Rationale:** correct the ReviewDiff-level consistency issues before application implementation while preserving the same logical documentation ChangeSet.

### LOG-RPKG-012 — Practical feedback correction for SL-06 delivery preparation and SL-08 interaction projection

**Type:** PRACTICAL REALIZATION FEEDBACK / IDEA CLARIFICATION  
**Updates:** `LOG-RPKG-008..011`  
**Source:** live Replacement Package App / Microsoft Edge testing after the first target implementation pass

**Material Finding / selected correction:**
- real current-change handoff failed before composer mutation because the browser Clipboard API rejected `navigator.clipboard.writeText(...)` when the intended ChatGPT document was not focused (`Document is not focused`); the current delivery staging could nevertheless classify that pre-mutation failure as `PreparedUnsent`;
- selected SL-06 target therefore prepares ReviewDiff text by direct ChatGPT composer/editor insertion through the DOM adapter, independent of foreground/document focus and Clipboard API write permission, verifies the expected content before semantic `Preparing`, uses `FailedBeforeSend` before confirmed composer mutation, `PreparedUnsent` only after confirmed preparation, and preserves `UnknownAfterSend` after possible Send;
- the same direct text path is selected initially for ReviewDiff content regardless of size. Native large-paste→attachment behavior is not a target requirement; a separate fallback is deferred until practical evidence demonstrates a real composer limit;
- practical SL-08 use showed that current-session terminal rows (especially repeated `Cancelled`) form useless history. The External Interactions UI is now a current/actionable projection: active/cancellable work plus attention-requiring `UnknownAfterSend`; ordinary terminal `Cancelled`, `Sent`, `Attached`, `NoChanges`, `FailedBeforeSend` and `PreparedUnsent` leave the list after Output/notification reports the result;
- terminal/tombstone technical records may still be retained for safety, uncertainty, idempotency or duplicate prevention, but retrying user intent always creates a new External Interaction identity rather than restoring a cancelled/terminal one;
- two rare implementation findings are recorded as accepted non-blocking Slice risks: SL-01 package re-read between target resolution and Apply execution, and SL-07 Finalized history whose registered Repository Target was later removed. Future hardening is documented, but neither is selected for the current code correction.

**Resulting Meaning:** the four Scenario boundaries remain unchanged. This is practical-realization feedback that corrects SL-06 preparation evidence/state boundaries and SL-08 list projection while explicitly deferring two low-frequency hardening cases.

### LOG-RPKG-013 — Apply SL-06/SL-08 practical SDS correction

**Type:** APPLIED  
**Applied From:** `LOG-RPKG-012`  
**ChangeSet:** `7cd4c79a-0bf8-402b-92e6-cedad79bd7ed`  
**Package:** `cf3d89cd-e45e-4bb3-8635-8f48d1fde668`

**Target-State Result:** after successful Apply of this documentation package:
- SL-06 target delivery no longer requires browser clipboard/native paste or foreground focus; direct composer/editor insertion is verified before `Preparing`, with `FailedBeforeSend` / `PreparedUnsent` / `UnknownAfterSend` boundaries tied to real external evidence;
- no large-review attachment fallback is selected without practical evidence of a composer limit;
- SL-08 External Interactions list contains current/actionable work and attention-requiring uncertainty rather than accumulating ordinary terminal session history; terminal retries are new interaction identities;
- application/domain/state/architecture/screens/testing/manual owners express the same corrected meaning;
- SL-01 package re-read and SL-07 removed-target history behavior are documented as accepted low-frequency risks for later hardening rather than current blockers;
- this package changes documentation only and performs no Java/extension mutation, operational acceptance, commit or push.

**Rationale:** incorporate concrete practical feedback into the SDS before the next implementation correction without changing user-world Scenario identity or expanding current code scope to rare risks.

