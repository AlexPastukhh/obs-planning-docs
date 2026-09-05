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

### LOG-RPKG-014 — Practical feedback retires separate Existing Work UI/Scenario and exposes ownership-diagnostic gap

**Type:** PRACTICAL REALIZATION FEEDBACK / SCENARIO BOUNDARY CORRECTION  
**Updates:** `LOG-RPKG-008..013`  
**Source:** live Swing/package Apply use after the documentation correction

**Material Finding / selected correction:**
- the first-pass `Existing work` button/dialog duplicates the already-existing ChangeSet selector and does not represent a separately meaningful user outcome; the user intent is “select the ChangeSet context needed for the next operation,” not “complete a discovery workflow”;
- retire `SCN-RPKG-FIND-EXISTING-WORK` as a current Scenario. Its valid meaning moves to shared `BI-RPKG-SELECT-EXISTING-WORK-CONTEXT` and `SL-RPKG-07 Select Existing Work Context`; the application has three current target user-world Scenarios;
- the main `ChangeSet` dropdown becomes the only existing-work selector. Default scope is current Repository Target; `All repositories` expands the same dropdown across registered targets; `Show history` adds Finalized within the selected scope;
- selecting a global ChangeSet switches to that exact registered Repository Target + ChangeSet, with same-origin clones kept distinct and no operation side effect from selection;
- live use reproduced the removed/unregistered-target failure: one orphan ChangeSet caused `[REPOSITORY_MISMATCH]` and aborted the separate Existing Work dialog. Query lookup therefore becomes nullable/non-throwing while strict operational lookup remains fail-closed; unavailable work must not abort or silently retarget the selector;
- a subsequent Apply attempt also exposed poor ownership diagnostics: `Dirty unowned path cannot be adopted` names the path but not the Repository Target, applying work or the fact that **no owner exists**. Selected correction: ownership/adoptability failures state exact target/path/applying ChangeSet and explicitly say `Unowned` when there is no unfinished owner; real ownership conflicts state owner label/status/ID;
- the first package for this independent implementation work (`bbe7157c-0382-4430-8e87-677cc4f628c7`) was rejected by exact base preflight because `chatgpt-bridge-extension/manifest.json` in the local working tree was already version `0.2.1` with `clipboardWrite`, while the package expected different base bytes. The user supplied local snapshot `915325d4d1f1d67330b21565136ee7a4b2d1ee22`; this correction package uses that snapshot's complete touched files as exact base and keeps the same logical ChangeSet identity.

**Implementation relation:** the same correction package implements the already-selected SL-06 direct composer insertion/state-boundary change and SL-08 current/actionable External Interaction projection, because those documentation corrections were approved but code had not yet been updated. The prior SL-01 package re-read TOCTOU remains an accepted low-frequency risk.

### LOG-RPKG-015 — Apply unified ChangeSet selector, browser interaction and ownership-diagnostics correction

**Type:** APPLIED  
**Applied From:** `LOG-RPKG-014` plus approved `LOG-RPKG-012/013` target meaning  
**ChangeSet:** `3aad2fc7-bba0-4a2e-94b1-15d0eb72667d`  
**Package:** `0f68fa45-6f47-41ce-bf65-cdba7ea935fa`

**Target-State Result:** after successful Apply of this exact package:
- current Scenario inventory is three user-world Scenarios; retired Find Existing Work remains only a historical planning note;
- `Existing work` button/dialog is removed; `ChangeSet` has `All repositories` + `Show history` scope controls and exact-target switching; unavailable Repository Target query state cannot abort the whole selector or silently substitute a clone;
- SL-06 ReviewDiff delivery uses direct composer/editor insertion without browser Clipboard API/foreground-focus dependency and reaches `Preparing` only after expected content is verified;
- SL-08 user list shows only active/actionable interactions plus `UnknownAfterSend`; ordinary terminal rows disappear and retries create new identities; source + exact destination key are visible;
- SL-01 ownership/adoptability failures identify exact path, Repository Target and applying ChangeSet; dirty-unowned state explicitly says no unfinished ChangeSet owns the path, while ownership conflicts show owner label/status/ID;
- automated Java tests cover nullable unavailable-target query, interaction projection/identity and owner/unowned diagnostic content; live Swing/Edge practical acceptance remains required;
- this package uses the supplied local snapshot as exact base after the prior package's base mismatch and does not treat that failed attempt as applied;
- the package changes documentation, Java and extension sources but does not commit or push.

**Rationale:** carry approved implementation corrections into one coherent post-Apply state while incorporating concrete selector, unavailable-target, ownership-diagnostic and local-base feedback.

### LOG-RPKG-016 — Live small-ReviewDiff test isolates stale Send-control reference

**Type:** PRACTICAL REALIZATION FEEDBACK / IMPLEMENTATION DEFECT
**Updates:** `LOG-RPKG-012..015`
**Source:** live Replacement Package App / Microsoft Edge smoke test using a two-line ReviewDiff

**Material Finding / selected correction:**
- after reloading the unpacked extension, a small ReviewDiff was successfully claimed and inserted into the intended ChatGPT composer, and ChatGPT exposed an enabled Send control; automatic delivery nevertheless did not send;
- manually querying the current Send control in DevTools and calling `.click()` sent the already-prepared ReviewDiff, proving direct preparation and synthetic click were both viable for the small case;
- `chatgpt-adapter.js` retained the Send button found before the asynchronous `stageSend()` / `SendClicked` bridge round-trip and clicked that old reference afterwards. ChatGPT may rerender the control during that gap, leaving the retained element disconnected/stale;
- selected correction: wait for readiness before staging, record `SendClicked`, then synchronously reacquire a currently connected/enabled Send control and click that fresh element with no further `await` between lookup and click. Post-send confirmation similarly reacquires the live composer/root rather than depending on pre-send DOM references;
- the earlier large-diff hang is **not yet** accepted as proof of a size/composer limit because the send-path defect and stale extension load contaminated that observation. Keep the current no-threshold direct-text target until it is retested after this fix.

**Resulting Meaning:** no Scenario/Slice/domain boundary changes. This is a DOM-adapter implementation correction inside SL-06 plus stronger live acceptance evidence.

### LOG-RPKG-017 — Apply fresh Send-control correction

**Type:** APPLIED TARGET
**Applied From:** `LOG-RPKG-016`
**ChangeSet:** `3aad2fc7-bba0-4a2e-94b1-15d0eb72667d`
**Package:** `42d5c3bf-360f-4ab8-b3a0-f27ee77f3b24`

**Target-State Result:** after successful Apply of this correction package:
- extension version is `0.2.3`;
- direct ReviewDiff preparation remains unchanged;
- after semantic `SendClicked` staging, the adapter reacquires and validates the live Send control, then clicks it without another asynchronous gap;
- outgoing confirmation reads the current composer/root rather than stale pre-send DOM references;
- automated source-contract coverage guards the staging→fresh-control→click order and live-composer confirmation;
- small and large live Edge tests remain required after extension reload; no size threshold or attachment fallback is introduced by this correction.

**Rationale:** correct the concrete live Send-path defect without changing already-selected delivery semantics or prematurely redesigning large-diff handling.


### LOG-RPKG-018 — Live direct-text retest selects ReviewDiff attachment + configurable Send retry

**Type:** PRACTICAL REALIZATION FEEDBACK / IMPLEMENTATION CORRECTION  
**Updates:** `LOG-RPKG-016..017`  
**Source:** live Replacement Package App / Microsoft Edge testing after extension reload and the fresh-Send-control correction

**Material Finding / selected correction:**
- the small ReviewDiff direct-text path can prepare content in the intended composer, but automatic Send remained unreliable even after the stale-control correction; manually executing a page-world Send click in DevTools sent the prepared content;
- the large ReviewDiff direct-text path can block/freeze the whole ChatGPT tab while the rich-text editor processes the inserted diff. This is now sufficient practical evidence to supersede the prior no-threshold direct-text target;
- the existing browser file-input attachment mechanics already work in practice. All non-empty ReviewDiffs therefore use one exact `.diff` attachment path through a reusable low-level attachment primitive; no small-text/large-attachment threshold is selected;
- ReviewDiff and Repository Snapshot may share that technical attachment primitive, but Snapshot remains attach-only/no-Send in this correction. Snapshot product/cancel/retry semantics are intentionally deferred for separate review rather than changed implicitly here;
- after the exact ReviewDiff attachment is visible and upload-ready, technical `SendClicked` is projected to the user as `Sending`. The extension may repeat guarded Send-control attempts only while the same exact attachment remains prepared in the same exact conversation;
- Send attempts execute in the ChatGPT page MAIN world because live DevTools/page-world `.click()` succeeded while prior content-script automation did not reliably send;
- repeated clicks while the same attachment remains prepared are dispatch attempts inside one nonterminal External Interaction, not retries of terminal interaction identity. Confirmed outgoing user turn becomes `Sent`; attachment disappearance without confirmation becomes `UnknownAfterSend` and stops automation;
- Send retry timing is not hardcoded in the extension. `reviewDiffSendRetrySeconds` is persisted application Settings, default `6`, valid range `1..60`; a new ReviewDiff task captures the current value so changing Settings does not retime an in-flight interaction.

**Resulting Meaning:** Scenario identity is unchanged. SL-06 realization changes from direct rich-text insertion to exact attachment delivery plus configurable guarded Send attempts, while SL-08 terminal-attempt identity rules remain intact and Snapshot semantics remain explicitly unchanged except for technical primitive reuse.

### LOG-RPKG-019 — Apply ReviewDiff attachment + configurable send-retry correction

**Type:** APPLIED TARGET  
**Applied From:** `LOG-RPKG-018`  
**ChangeSet:** `3aad2fc7-bba0-4a2e-94b1-15d0eb72667d`  
**Package:** `e3ca82f7-23c8-4977-ba0e-6e0c232167e8`

**Target-State Result:** after successful Apply of this exact package:
- extension version is `0.2.4` and every non-empty ReviewDiff is prepared as one exact `.diff` attachment rather than inserted into the ChatGPT rich-text editor;
- ReviewDiff and snapshot use one reusable low-level browser attachment primitive, while snapshot remains attach-only/no-Send and its broader product semantics are not redesigned by this package;
- exact attachment visibility/upload readiness is required before `Preparing`; pre-preparation failure is `FailedBeforeSend`, later pre-Send failure is `PreparedUnsent`;
- technical `SendClicked` is projected semantically as `Sending`; guarded MAIN-world Send-control attempts may repeat at the task's configured interval only while the same exact attachment remains prepared in the same conversation;
- confirmed outgoing user turn becomes `Sent`; attachment disappearance without confirmation becomes `UnknownAfterSend` and ends automatic sending rather than triggering blind resend;
- `settings.json` advances to schema 3 with `reviewDiffSendRetrySeconds` (default 6, valid 1–60), editable in Swing/CLI and captured per newly queued ReviewDiff task;
- automated proof covers Settings persistence/range/default, per-task interval freezing, attachment-only ReviewDiff source behavior, MAIN-world send-attempt routing and semantic `Sending`; live Edge practical acceptance remains required;
- package bases come from the supplied Local Repository Snapshot at commit `5157a90db48138b0530d7a7128aa82569c2c0ef1`; no local Apply, commit or push is performed by package production.

**Rationale:** incorporate concrete live-browser evidence into one coherent documentation + implementation correction without conflating ReviewDiff delivery with the separately deferred Snapshot interaction redesign.

### LOG-RPKG-020 — Live attachment success exposes late retry-contract validation / runtime compatibility gap

**Type:** PRACTICAL REALIZATION FEEDBACK / SLICE IDEA INTEGRATION / IMPLEMENTATION CORRECTION  
**Updates:** `LOG-RPKG-018..019`  
**Source:** live Replacement Package App / Microsoft Edge test after the ReviewDiff attachment + configurable send-retry package, followed by `собери идеи слайса` for `SL-RPKG-06`

**Material Finding / selected correction:**
- the new ReviewDiff attachment path worked in the real ChatGPT composer: the `.diff` was attached without the prior large-rich-text freeze;
- immediately after preparation the application reported `UnknownAfterSend · Invalid ReviewDiff send retry interval.` The implementation validates `task.sendRetryIntervalMs` only inside the send loop, after technical `SendClicked` has already been staged, so a deterministic local contract/configuration error can be mislabeled as external send uncertainty;
- a stale/older Java process is a strong practical explanation because current Java source supplies a frozen retry interval, but the exact running-process version was not independently proven. Do not encode that hypothesis as fact; instead remove the whole ambiguity class with an explicit Java ↔ extension runtime contract;
- `SL-RPKG-06` remains the same Slice/Scenario realization. The claimed task becomes bridge protocol `2`: `/v1/health` and every claim advertise the protocol, and extension `0.2.5` requires it;
- before payload fetch or composer mutation, the extension validates protocol compatibility plus deterministic task prerequisites (kind, exact destination, artifact metadata/payload URL, auto-send semantics and ReviewDiff retry interval). A safely claimed incompatible/malformed task becomes actionable `FailedBeforeSend` with restart/update + extension-reload guidance;
- content execution independently repeats deterministic task validation before attachment preparation. The validated retry interval is then carried across the later `SendClicked` boundary; invalid interval discovery is removed from the post-`SendClicked` send loop;
- `UnknownAfterSend` is therefore reserved for actual external ambiguity after the possible-Send boundary, not for version/configuration/task-shape failures;
- a generic single-instance/stale-process subsystem remains deferred unless further practical evidence shows fixed-port process collision is a recurring problem after explicit protocol negotiation is present.

**Resulting Meaning:** product/Scenario priority is unchanged: reliably deliver the exact current change. Technical sequence is fail-fast runtime compatibility → exact attachment preparation → guarded Sending. Snapshot continues to reuse the low-level attachment primitive and remains attach-only; this correction does not redesign snapshot product semantics.

### LOG-RPKG-021 — Apply bridge protocol preflight / truthful pre-Send failure correction

**Type:** APPLIED TARGET  
**Applied From:** `LOG-RPKG-020`  
**ChangeSet:** `3aad2fc7-bba0-4a2e-94b1-15d0eb72667d`  
**Package:** `b53b563a-383e-4c38-8b29-9970c03aea33`

**Target-State Result:** after successful Apply of this exact package:
- extension version is `0.2.5`; Java health and claimed-task responses advertise bridge protocol `2`;
- extension Options checks protocol compatibility and reports actionable app-restart/update + extension-reload guidance when the running Java bridge is incompatible;
- every claimed task is validated before content delivery/external preparation; a version/task/send-contract mismatch is recorded as `FailedBeforeSend` when the task can be safely identified, rather than released into repeated partial execution or mislabeled `UnknownAfterSend`;
- ReviewDiff content execution validates the deterministic task contract before payload fetch/attachment mutation and computes the retry interval before `Preparing`/`SendClicked`; the send loop receives that already-validated interval and performs no late retry-interval validation;
- exact `.diff` attachment delivery, configurable per-task Send interval, MAIN-world guarded attempts, current/actionable External Interaction projection and snapshot attach-only semantics remain otherwise unchanged;
- automated bridge/source-contract proof covers protocol advertisement, claim/content preflight ordering, pre-Send failure classification and absence of the old late `Invalid ReviewDiff send retry interval` path; live Edge acceptance still must retest current-current delivery and intentional version skew;
- package bases come from the supplied Local Repository Snapshot at commit `ca768b61b2c84d6cda6c27b4ace7c4fc87d404e7`; no local Apply, commit or push is performed by package production.

**Rationale:** integrate the material live failure and Slice-idea review into one coherent post-Apply state while keeping real post-Send uncertainty distinct from deterministic local runtime incompatibility.

### LOG-RPKG-022 — SL-RPKG-01 ChangeSet label continuity correction

**Type:** APPLIED TARGET-STATE / IMPLEMENTATION CORRECTION  
**ChangeSet:** `ecb7f86b-6875-48b1-ac98-1b0deeebf71a`  
**Package:** `91183492-4723-4d0b-a368-c6330d8e157c`

**Material finding:** live Apply of a valid continuation package exposed that `Core.applyInternal` treated a differing `PACKAGE.json.changeSetLabel` as `STATE_DIVERGED` even when the exact existing `changeSetId`, persisted Repository Target and repository identity matched. This made presentation metadata an accidental second continuation credential and rejected safe work before base preflight/mutation.

**Selected correction / SL-RPKG-01 target state:**
- exact `changeSetId` remains the logical continuation identity; existing persisted Repository Target + repository identity remain hard Apply guards;
- producer packages should keep `changeSetLabel` stable, but an existing ChangeSet's persisted label is presentation authority; a differing package label is diagnostic-only, never overwrites the stored label and does not by itself block Apply;
- successful label-mismatch continuation records a readable Apply diagnostic;
- regression and manual proof cover exact-ID continuation with stale/different package label while preserving all repository/source/ownership preflight guarantees;
- Scenario/Domain meaning is unchanged because current owners already define exact `changeSetId` as continuation authority and UI label as non-authoritative; this correction fixes downstream SL-RPKG-01 Apply/state realization only; the shared producer package rule that labels stay stable remains unchanged.

**APPLIED relation:** if package `91183492-4723-4d0b-a368-c6330d8e157c` applies successfully, these source/docs/tests become the coherent current SL-RPKG-01 state for this correction.

### LOG-RPKG-023 — Surface ChangeSet label diagnostic and reconcile SL-RPKG-01 current state

**Type:** APPLIED TARGET-STATE / REVIEW CORRECTION  
**ChangeSet:** `ecb7f86b-6875-48b1-ac98-1b0deeebf71a`  
**Package:** `0353f444-3a7a-466c-ad65-4a5b0bd3fe95`

**Review findings addressed:**
- the label-mismatch continuation diagnostic was persisted in `ApplicationAttempt.message` but the normal Swing Apply success path did not surface it, so manual acceptance promised a visible diagnostic that implementation did not provide;
- `slices.md` still listed label mismatch as a Current divergence in the same target state that already corrected it.

**Selected correction / SL-RPKG-01 target state:**
- `ApplyResult` exposes the non-blocking continuation diagnostic explicitly while the persisted ApplicationAttempt keeps the same diagnostic trace;
- Swing Apply prints that diagnostic as a warning after successful Apply, without changing success/failure semantics or weakening repository/target/source/ownership guards;
- the label-mismatch item leaves `Current divergences`; SL-RPKG-01 verification explicitly requires the successful Swing result to surface the diagnostic;
- regression proof checks the explicit ApplyResult diagnostic plus retained attempt trace; live Swing acceptance remains the practical proof for presentation/readability.

**APPLIED relation:** if package `0353f444-3a7a-466c-ad65-4a5b0bd3fe95` applies successfully, these source/docs/tests become the coherent current SL-RPKG-01 state for this follow-up review correction.

### LOG-RPKG-024 — ReviewDiff exact-Send integrity finding + deferred in-flight restart risk

**Type:** REVIEWDIFF FINDING / USER DECISION / IMPLEMENTATION CORRECTION  
**Updates:** `LOG-RPKG-020..021`  
**Source:** review of the supplied Local Repository Snapshot at commit `46ee341cef4b6c581dc1e461f21cd1e11755abb7`, rechecked against the current cumulative SL-RPKG-01 ReviewDiff after packages `91183492-4723-4d0b-a368-c6330d8e157c` and `0353f444-3a7a-466c-ad65-4a5b0bd3fe95`, followed by explicit user scope decision

**Material Finding / selected correction:**
- current browser confirmation can treat any increase in ChatGPT user-message count plus prepared-attachment disappearance as `Sent`; an unrelated user turn can therefore falsely confirm this ReviewDiff;
- composer emptiness is proven before ReviewDiff preparation but not held as an invariant through the final page-world Send click; text entered after upload-ready can otherwise be mixed into the automatic outgoing turn;
- technical `SendClicked` is currently staged before a real click, so a deterministic pre-click failure can cross the possible-Send truth boundary and be mislabeled `UnknownAfterSend`;
- selected correction gives each ReviewDiff delivery a browser-visible task-specific `.diff` filename, rechecks composer text and exact attachment presence immediately before MAIN-world click, establishes the possible-Send boundary only when an actual click occurs, and confirms `Sent` only from a post-baseline outgoing user turn carrying that task-specific filename;
- attachment loss or composer contamination before any actual click remains pre-Send truth (`PreparedUnsent` after preparation); attachment loss after a possible click without task-specific outgoing confirmation remains `UnknownAfterSend`;
- the previously identified runtime-generation gap for an **already claimed/in-flight** task across extension/service-worker restart, tab close or mid-task version replacement remains a known accepted/deferred risk by explicit user decision. Do not expand this correction into runtime-epoch/lifecycle hardening;
- Snapshot handoff remains attach-only. No direct-text ReviewDiff path is reintroduced.

**Resulting Meaning:** exact ReviewDiff delivery now requires exact payload + exact destination + task-specific attachment identity + composer-clean pre-click state + task-specific outgoing confirmation. Protocol-v2 preflight for new claims remains unchanged; already in-flight runtime-generation continuity is retained as an explicit residual risk rather than presented as solved.

### LOG-RPKG-025 — Apply task-specific ReviewDiff Send-integrity correction in a new post-finalize ChangeSet

**Type:** APPLIED TARGET  
**Applied From:** `LOG-RPKG-024`  
**ChangeSet:** `389f1130-dc28-4432-82fe-19d2b2dc8884`  
**Package:** `a24f3bd7-458d-427e-ad25-10d4343107fe`

**Target-State Result:** after successful Apply of this exact package:
- extension version is `0.2.6`; bridge protocol remains `2` because no new wire field is required;
- each queued ReviewDiff delivery uses a `.diff` filename containing the delivery task short ID while preserving the exact canonical ReviewDiff bytes/fingerprint;
- content-side send readiness and the MAIN-world click guard stop automatic Send if unrelated composer text appears after attachment preparation;
- the first actual click establishes the possible-Send boundary; technical `SendClicked` is persisted after that click rather than before it, with a narrow `Preparing → UnknownAfterSend` fallback available only to preserve truth if click happened before `SendClicked` persistence completed;
- `Sent` requires a post-baseline outgoing user turn that carries this task-specific filename; unrelated user turns cannot confirm the task;
- disappearance before any actual automatic click is `PreparedUnsent`; disappearance after a possible click without task-specific confirmation is `UnknownAfterSend` and stops further automation;
- the already-applied SL-RPKG-01 ChangeSet-label continuity and visible-diagnostic state is preserved in every overlapping documentation file; this package is rebased over that current state rather than restoring the older bases from package `87b3e810-1e47-4d92-887f-ce21f504536c`;
- automated source/state proof passes: `CoreTests` 55/0, `ChatBridgeTests` 38/0, `WindowsLauncherInstallerTests` 5/0; JavaScript syntax checks pass for adapter/content/background. Live Edge/ChatGPT acceptance is still required for DOM/runtime behavior;
- the accepted/deferred already-in-flight restart/version-transition risk remains explicitly documented and is not implemented by this package;
- Snapshot semantics remain attach-only; no repository Apply, ReviewDiff finalization, commit or push is performed by package production;
- exact package bases come from the current checked local state represented by snapshot `46ee341cef4b6c581dc1e461f21cd1e11755abb7` plus the supplied current cumulative SL-RPKG-01 ReviewDiff.

**APPLIED relation:** if package `a24f3bd7-458d-427e-ad25-10d4343107fe` applies successfully, this SL-RPKG-06 correction becomes the coherent current state in the new ChangeSet without undoing the already-applied SL-RPKG-01 corrections.

**Rationale:** correct the two active exact-delivery defects and the pre-click truth boundary while preserving independently applied SL-RPKG-01 work. The earlier rebased package was not applied because its historical SL-RPKG-06 ChangeSet was already Finalized; this package therefore starts a new ChangeSet for the same still-unapplied target correction. The separately deferred in-flight runtime-generation problem remains out of scope.

### LOG-RPKG-026 — Use `.diff` attachment surface for post-Send proof; defer second-attachment hardening

**Type:** REVIEWDIFF CORRECTION / USER DECISION / APPLIED TARGET  
**Updates:** `LOG-RPKG-024..025`  
**ChangeSet:** `f3fdbbf8-7ef2-4af4-90da-daa964af4ade`  
**Package:** `7ef754e7-984c-4a54-967e-0c7a6b23c45b`

**Review finding / user decision:**
- review found that post-Send confirmation searched the whole new user-message `innerText`/`textContent` for the full task-specific filename. That mixes ordinary message text with file evidence and may also fail if ChatGPT truncates the browser-visible filename;
- selected correction does **not** inject ReviewDiff text or markers into the composer. It keeps exact task-specific filename identity for preparation/pre-click checks, but after the prepared attachment leaves the composer it confirms `Sent` only from a post-baseline user turn whose file/attachment-like DOM surface exposes `.diff`; ordinary user-message text is not proof;
- full untruncated task-specific filename matching after Send is intentionally deferred until live Edge/ChatGPT DOM inspection shows which file-card metadata (`textContent`, `title`, `aria-label`, link/download metadata or another stable surface) actually survives truncation;
- the separately identified case where a user adds a **second unrelated attachment** after ReviewDiff upload-ready but before automatic click is explicitly accepted/deferred for now. Current guards still reject later unrelated text and require the intended ReviewDiff attachment, but do not claim single-attachment ownership through click;
- extension patch version advances to `0.2.7`; bridge protocol remains `2` because no wire contract changes.

**Target-State Result:** post-Send proof is narrower than generic message-text matching and deliberately aligned to what can be verified in the live ChatGPT file-card DOM. Live acceptance must record whether `.diff` and/or the full task-specific filename is actually exposed after Send before strengthening the proof further. Existing possible-Send, `PreparedUnsent` / `UnknownAfterSend`, Snapshot attach-only and deferred runtime-generation semantics remain unchanged.

**APPLIED relation:** if package `7ef754e7-984c-4a54-967e-0c7a6b23c45b` applies successfully, this becomes the coherent current SL-RPKG-06 ReviewDiff confirmation state for the active ChangeSet.

### LOG-RPKG-027 — Fix no-task claim NPE found during live bridge acceptance

**Type:** PRACTICAL REALIZATION FEEDBACK / REVIEWDIFF CORRECTION / APPLIED TARGET  
**Updates:** `LOG-RPKG-026`  
**ChangeSet:** `f3fdbbf8-7ef2-4af4-90da-daa964af4ade`  
**Package:** `7abed6c0-4460-48c0-b620-058af9c21bfd`

**Live finding / selected correction:**
- live Edge/extension readiness polling exposed `Tab ... readiness/claim: java.lang.NullPointerException` before ReviewDiff delivery;
- root cause is the Java `/v1/tasks/claim` HTTP handler's normal no-work branch: `service.claim(...)` correctly returns an empty map, but the handler attempted `Map.of("task", null)`. Java `Map.of` rejects null values, so the intended `200 {"task":null}` response became HTTP 500;
- replace that response construction with a nullable `LinkedHashMap` payload so no pending task is a successful, explicit `task: null` poll result;
- add loopback HTTP regression coverage that registers a valid conversation, claims with no pending task and requires HTTP 200 plus a present `task` field whose value is null;
- bridge protocol remains `2` and extension version remains `0.2.7`; this is a Java server implementation correction, not a wire-contract change. Existing `.diff` attachment-surface confirmation and accepted/deferred risks from `LOG-RPKG-026` remain unchanged.

**Target-State Result:** normal extension readiness/claim polling no longer produces an internal Java exception when there is no task to deliver. A no-work claim is represented by the already-expected nullable task response, while real protocol mismatch remains a separate fail-fast condition.

**APPLIED relation:** if package `7abed6c0-4460-48c0-b620-058af9c21bfd` applies successfully, this no-task claim correction becomes part of the current SL-RPKG-06 ChangeSet without altering the ReviewDiff Send proof or its accepted/deferred risks.

### LOG-RPKG-028 — Expand post-Send proof from message node to complete user turn after live false uncertainty

**Type:** PRACTICAL REALIZATION FEEDBACK / REVIEWDIFF CORRECTION / APPLIED TARGET  
**Updates:** `LOG-RPKG-026..027`  
**ChangeSet:** `f3fdbbf8-7ef2-4af4-90da-daa964af4ade`  
**Package:** `1954b615-b13a-4dbc-b1a9-539c2744b42c`

**Live finding / selected correction:**
- after rebuilding and running the current Java app plus reloading the extension, live ReviewDiff delivery task `44181531` uploaded and sent the intended `.diff` into the bound ChatGPT conversation, but the application still terminated that External Interaction as `UnknownAfterSend` because the outgoing-turn proof did not find the delivered file surface;
- the current adapter scopes attachment lookup to descendants of `[data-message-author-role="user"]`. Live delivery demonstrates that this boundary is too narrow for the real ChatGPT sent-turn structure: the user turn can contain a delivered file card that is not found by the message-node-only search;
- preserve the existing post-baseline and attachment-surface rules, including the decision that ordinary message text containing `.diff` is not proof. Resolve each post-baseline user message to its nearest complete ChatGPT conversation-turn container (with a bounded ancestor fallback) and inspect file/attachment-like descendants there for `.diff`;
- keep the exact task-specific filename for prepared/composer identity checks. Full exact filename matching after Send remains deferred until a stable untruncated file-card metadata surface is directly established;
- align `Sent` / `UnknownAfterSend` diagnostics with the implemented `.diff` turn-surface proof and advance the extension patch version to `0.2.8`; bridge protocol remains `2` because no Java/extension wire field changes;
- the separately accepted/deferred second-attachment and already-in-flight runtime-generation risks remain unchanged and are not part of this correction.

**Target-State Result:** a successfully sent ReviewDiff can be confirmed from the file card anywhere in the complete post-baseline user turn instead of only below the message-author node, while ordinary user text remains excluded from delivery proof. A real click with no qualifying post-baseline `.diff` attachment surface still terminates as `UnknownAfterSend` and automatic resend remains stopped.

**APPLIED relation:** if package `1954b615-b13a-4dbc-b1a9-539c2744b42c` applies successfully, this complete-user-turn confirmation correction becomes the current SL-RPKG-06 post-Send proof for the active ChangeSet.

### LOG-RPKG-029 — Bound post-Send fallback to the current authored turn

**Type:** REVIEWDIFF CORRECTION / APPLIED TARGET  
**Updates:** `LOG-RPKG-028`  
**ChangeSet:** `f3fdbbf8-7ef2-4af4-90da-daa964af4ade`  
**Package:** `0240dc48-db44-47f9-93c1-78f00638c23d`

**Review finding / selected correction:**
- Review of the complete-turn correction found that its six-level fallback returned the first ancestor containing any `.diff` attachment candidate. If the explicit ChatGPT turn selector were unavailable, that ancestor could grow wide enough to include a neighboring turn and incorrectly convert another turn’s `.diff` into this task’s `Sent` proof;
- preserve the positive live requirement from task `44181531`: a file card may be a sibling of `[data-message-author-role="user"]` and still belong to the same outgoing user turn;
- make the fallback turn-bounded: climb only while the candidate ancestor contains exactly the current `[data-message-author-role]` node and stop before an ancestor that contains any additional authored message. Attachment candidates are evaluated only inside that resulting surface;
- acceptance/proof now covers both directions explicitly: a same-turn sibling `.diff` file card is eligible, while a `.diff` in a neighboring authored turn is not;
- extension patch version advances to `0.2.9`; bridge protocol remains `2`. Exact filename preparation/pre-click identity, possible-Send boundary, no-task claim NPE correction, Snapshot attach-only behavior and the accepted/deferred second-attachment/runtime-generation risks remain unchanged.

**Target-State Result:** post-Send confirmation may expand beyond the message-author node enough to see a same-turn sibling file card, but it cannot use the fallback to cross an authored-turn boundary. A neighboring turn’s `.diff` therefore cannot create false `Sent`.

**APPLIED relation:** if package `0240dc48-db44-47f9-93c1-78f00638c23d` applies successfully, this turn-bounded fallback becomes the current SL-RPKG-06 post-Send proof for the active ChangeSet.

### LOG-RPKG-030 — Guard preferred turn containers and materialize DOM regression

**Type:** REVIEWDIFF CORRECTION / APPLIED TARGET  
**Updates:** `LOG-RPKG-029`  
**ChangeSet:** `f3fdbbf8-7ef2-4af4-90da-daa964af4ade`  
**Package:** `ccc14d75-3ae1-4049-9909-13e1b66a6f4b`

**Review finding / selected correction:**
- review of the turn-bounded fallback found that the preferred `conversation-turn-*` / generic `article` branch returned its closest container without applying the same authored-turn ownership guard, so a broad `article` could still span neighboring authored turns and bypass the fallback protection;
- require every preferred container candidate, including generic `article`, to contain exactly the current authored message node before it is eligible. If that check fails, continue through the already bounded ancestor fallback rather than accepting the wide container;
- replace the prior proof gap with an executable Node DOM regression that loads the real `chatgpt-adapter.js` against a minimal fake DOM and proves three behaviors: a same-turn sibling `.diff` file card confirms, a broad `article` containing a neighboring authored turn's `.diff` does not confirm the current task, and ordinary message text containing `.diff` is not attachment proof;
- wire that DOM regression into `run-tests.cmd` so the standard application test run executes it, while retaining the Java source-contract checks as complementary guardrails;
- expose only the two confirmation helpers under a frozen adapter `__test` hook for regression access; production delivery semantics are unchanged;
- extension patch version advances to `0.2.10`; bridge protocol remains `2`. Exact prepared/composer identity, possible-Send boundary, no-task claim correction, Snapshot attach-only behavior and the accepted/deferred second-attachment/runtime-generation risks remain unchanged.

**Target-State Result:** both preferred and fallback turn-surface resolution enforce the same authored-turn boundary, and the standard test suite now executes behavioral DOM proof for the positive same-turn sibling case and the negative neighboring-turn / ordinary-text cases.

**APPLIED relation:** if package `ccc14d75-3ae1-4049-9909-13e1b66a6f4b` applies successfully, this guarded-container + executable DOM regression correction becomes the current SL-RPKG-06 post-Send proof for the active ChangeSet.

### LOG-RPKG-031 — Improve work/interactions layout and suppress equivalent actionable handoffs

**Type:** PRACTICAL REALIZATION FEEDBACK / UI CORRECTION / INTERACTION CORRECTION / APPLIED TARGET  
**ChangeSet:** `5d882d10-056b-483b-84a9-411829d0f4d5`  
**Package:** `537c80cf-7526-42ae-995d-5f5c39a9f208`

**Practical feedback / selected correction:**
- live Swing use showed that ChangeSet rows make repository context too easy to miss: in global scope the repository name appears after work/status and in local scope it is omitted entirely. Every row now begins with the Repository Target display name so the user identifies repository before work/status/ID;
- `All repositories` / `Show history` currently consume the far-right side of the ChangeSet row. Move those filters to a compact row directly below the full-width ChangeSet selector;
- `Refresh interactions` / `Cancel interaction` currently sit to the right of a long External Interaction selector and can be clipped outside the useful visible area. Give the selector the full row and place both actions directly below it;
- repeated queue requests for the same still-actionable handoff should not create indistinguishable Pending rows. Reuse one task/External Interaction while kind + exact source identity/artifact + destination and applicable ChangeSet/ReviewDiff identity match and the task remains Pending/Claimed/Preparing/SendClicked. Materially different payloads remain independent; after a terminal result, an explicit retry gets a new interaction identity;
- the previous SL-RPKG-06 ReviewDiff review also exposed a documentation-only setup gap: `run-tests.cmd` now executes the Node DOM regression, so README must state `node` on PATH as a test prerequisite instead of claiming only JDK/Git are required.

**Target-State Result:** the two long selectors keep the horizontal space for their content, their related filters/actions remain reachable immediately below them, repository context is the first ChangeSet-row information, and equivalent active ChatGPT handoffs project as one semantic interaction instead of duplicate Pending entries. Terminal retry/new payload semantics remain distinct.

**APPLIED relation:** if package `537c80cf-7526-42ae-995d-5f5c39a9f208` applies successfully, these selector-layout, repository-prefix, interaction-deduplication and Node-prerequisite corrections become the current implementation state of ChangeSet `5d882d10-056b-483b-84a9-411829d0f4d5`.

### LOG-RPKG-032 — Align actionable-interaction authority and make layout proof line-ending-neutral

**Type:** REVIEWDIFF CORRECTION / APPLIED TARGET  
**Updates:** `LOG-RPKG-031`  
**ChangeSet:** `5d882d10-056b-483b-84a9-411829d0f4d5`  
**Package:** `2094ca09-4c76-404b-8fff-deb9632b450b`

**Review finding / selected correction:**
- ReviewDiff of the first UX package confirmed the repository-first selector layout and actionable handoff deduplication implementation, but found a semantic-owner mismatch: `application-plan.md` still said a later user retry always creates a new External Interaction even though the selected implementation intentionally reuses an equivalent still-actionable interaction;
- clarify the canonical `BI-RPKG-EXTERNAL-INTERACTION` / `REQ-RPKG-20` boundary: repeating the same exact source/payload → destination intent while the current interaction remains actionable reuses that interaction identity; materially different source/payload or destination remains independent; only a retry after terminal outcome creates a new identity;
- keep the existing Java dedupe implementation unchanged;
- make the Swing source-layout regression independent of Windows CRLF versus LF checkout representation by normalizing line endings before the multiline source assertions. Production Swing layout is unchanged.

**Target-State Result:** canonical Application behavior, Slice/manual/test meaning and implemented handoff deduplication now express the same interaction-identity rule, and the layout regression remains valid on Windows CRLF or LF working trees without weakening the asserted below-selector arrangement.

**APPLIED relation:** if package `2094ca09-4c76-404b-8fff-deb9632b450b` applies successfully, this authority/proof correction becomes the current SL-RPKG-UX-01 state for ChangeSet `5d882d10-056b-483b-84a9-411829d0f4d5`.

### LOG-RPKG-033 — Add action-assisted Review-chat binding hint to existing SL-RPKG-06

**Type:** LATER CLARIFICATION / SLICE EXTENSION / SHARED-PROTOCOL CORRECTION / APPLIED TARGET  
**ChangeSet:** `513ddd04-b455-4870-a1d8-abfb4ba7de63`  
**Package:** `e5620ae7-454f-4253-9854-eac2441c0599`

**User clarification / selected integration path:**
- keep this work inside existing `SL-RPKG-06 — Deliver Current Change To ChatGPT`; it is not a new Slice. The new behavior only adds a second entry path for establishing the already-existing Review-chat destination binding;
- preserve the manual `Refresh chats` / `Bind Review chat` method. Add optional `OBS-ACTION/1` field `chatTabTitle` so a producer that has been explicitly given the exact intended ChatGPT title can carry that hint with the package handoff;
- manual and action-assisted paths must converge on the same existing services: current ChatGPT conversation inventory → persisted `ChatBridgeService.bind(...)` → existing `enqueueReviewIfBound(...)` → the existing SL-RPKG-06 queue/attachment/send/confirmation path. Do not create a parallel automatic delivery/binding subsystem;
- resolve the title hint only after repository Apply succeeds and the ChangeSet/current ReviewDiff exist. If a persisted Review-chat binding already exists, keep it authoritative and ignore the hint for rebinding;
- if no binding exists, require exactly one current ordinary ChatGPT conversation whose inventory title exactly equals `chatTabTitle`. One match uses the normal persisted binding service; zero or multiple matches never guess a destination, never roll back/relabel successful Apply and surface an actionable manual-binding warning;
- `chatTabTitle` is a binding hint rather than package/Repository/ChangeSet identity and does not select a physical duplicate browser tab. A conversation opened in several duplicate tabs remains one conversation binding and existing conversation-key claim serialization decides which tab performs delivery;
- old `OBS-ACTION/1` envelopes without `chatTabTitle` remain valid and keep existing behavior. The ChatGPT-side producer must omit the optional field unless the exact intended title was explicitly supplied/selected for that archive invocation; it must not infer a browser title from topic/ChangeSet prose;
- synchronize the canonical shared protocol definition and its producer-workflow materialized use in the same package. No ZIP schema, package identity, repository-operation authority, ReviewDiff handling setting, extension protocol or browser delivery primitive changes are selected.

**Proof / acceptance:**
- automated Core proof covers legacy action compatibility, unique exact-title auto-binding + normal ReviewDiff queueing, existing-binding priority, zero-match fallback and ambiguous-title fallback;
- manual acceptance keeps the existing binding/delivery campaign and adds unique-title action binding, missing/duplicate-title no-guess behavior and existing manual-binding priority;
- `.linked-notes/reference-objects.json` remains the unchanged single definition/use route for `ro_replacement_package_shared_protocol`.

**Target-State Result:** `SL-RPKG-06` has one persisted Review-chat binding and one downstream delivery implementation, with two ways to establish a missing destination: explicit manual selection or an optional exact action title hint. Repository Apply remains independent of browser-title availability/ambiguity, and existing binding/delivery safety semantics remain unchanged.

**APPLIED relation:** if package `e5620ae7-454f-4253-9854-eac2441c0599` applies successfully, this action-assisted binding/protocol extension becomes the current implementation state of new ChangeSet `513ddd04-b455-4870-a1d8-abfb4ba7de63`.

### LOG-RPKG-034 — Prepare Apply before mutation, make Review-chat title matching configurable, and require explicit rebind approval

**Type:** LATER CLARIFICATION / SLICE EXTENSION / APPLY-LIFECYCLE CORRECTION / UI-RESPONSIVENESS CORRECTION / SHARED-PROTOCOL CORRECTION / APPLIED TARGET  
**ChangeSet:** `11b02ff6-b591-4e3b-81a7-dd68b6572680`  
**Package:** `6a896ea7-34da-4d64-907d-a597cd105ce5`

**User clarification / selected integration path:**
- keep the action-assisted Review-chat destination inside existing `SL-RPKG-06`; manual and action-assisted binding still converge on the existing persisted `ChatBridgeService.bind(...)` + `enqueueReviewIfBound(...)` delivery path rather than creating a parallel automatic subsystem;
- add local application setting `Review title ignores`: a user-editable literal set of Unicode characters removed from both the action-supplied title and current inventory title before comparison. Default is empty, preserving current literal behavior; matching remains case-sensitive and non-fuzzy, with no regex or hidden punctuation/case rules;
- parse/resolve `OBS-ACTION`, package, Repository Target, current ChangeSet, current Review-chat binding and title-hint candidates before repository mutation into one prepared operation context. The prepared unique conversation key is reused after successful Apply instead of reparsing/rematching the title after Apply;
- treat no-match / ambiguous-title and related preparation warnings as ordinary operation Output, not confirmation dialogs. Blocking action/package errors still stop preparation; confirmation UI is reserved for choices that require user authority;
- when an existing binding differs from the uniquely prepared action destination, ask before mutation whether to **Apply without rebind**, **Apply and rebind**, or **Cancel**. If current ChatGPT delivery state makes rebind unsafe, the rebind choice is unavailable while keep/cancel remain;
- an authorized rebind is performed only after successful repository Apply and current ReviewDiff persistence, through the existing binding service. Failed repository Apply leaves binding unchanged. Before mutation, frozen ChangeSet/binding assumptions needed by the selected plan are revalidated; stale prepared state blocks with no repository mutation and requires preparation again;
- keep title-normalization configuration consumer-local: it does not enter `OBS-ACTION`, package identity, ZIP schema, browser-extension protocol or loopback bridge protocol;
- remove heavy Core/Git/ZIP/filesystem work from the Swing Event Dispatch Thread. Apply now has background Prepare and Execute phases with dialogs/rendering on EDT; Refresh Review, Finalize, Retry Push and Repository Snapshot export use the same background-worker boundary so the application remains repaintable/responsive during long work.

**Proof / acceptance:**
- Core tests cover settings-schema migration/default, code-point-aware ignored-character normalization, case sensitivity, unique prepared destination, keep/rebind decisions, post-Apply use of the prepared conversation key, and stale binding rejection before repository mutation;
- ChatBridge tests cover non-mutating rebind-safety assessment relative to the persisted binding and refusal while unsafe composer preparation/Send work is in flight;
- Swing source-level regression requires `SwingWorker` background dispatch for Prepare Apply, Execute Apply, Refresh Review, Finalize and Repository Snapshot export; manual acceptance requires the window to stay responsive while these operations run and keeps warnings in Output while rebind authority remains an explicit modal choice;
- the canonical `OBS-ACTION/1` protocol definition and the producer-workflow materialized use are synchronized. `.linked-notes/reference-objects.json` keeps the same definition/use route; the reusable-documentation scope records only a cross-scope reference to this canonical entry.

**Target-State Result:** after successful Apply of this exact package, action-driven Review-chat selection is prepared once before mutation using persisted user-configurable title normalization, conflicts with an existing binding require explicit pre-Apply user authorization, and successful post-Apply binding/rebinding uses the already prepared conversation identity through the existing SL-RPKG-06 services. Preparation warnings remain visible in Output without unnecessary dialogs, stale prepared authority fails closed before mutation, and the major Git/ZIP/Review operations no longer block Swing EDT responsiveness.

**APPLIED relation:** if package `6a896ea7-34da-4d64-907d-a597cd105ce5` applies successfully, this prepared-Apply/title-matching/rebind-approval/EDT correction becomes the current state of ChangeSet `11b02ff6-b591-4e3b-81a7-dd68b6572680`.


### LOG-RPKG-035 — ReviewDiff correction: remove pre-Prepare ZIP read from EDT and record accepted rebind/CLI limits

**Type:** REVIEWDIFF CORRECTION / ACCEPTED-RISK RECORD / UI-RESPONSIVENESS CORRECTION / SHARED-PROTOCOL CORRECTION / APPLIED TARGET  
**Updates:** `LOG-RPKG-034`  
**ChangeSet:** `11b02ff6-b591-4e3b-81a7-dd68b6572680`  
**Package:** `fa609eea-034c-4975-894d-e82b86e4801e`

**ReviewDiff findings / user decisions:**
- the first prepared-Apply package moved Core Prepare/Execute to `SwingWorker`, but `MainWindow.beginArchiveOutputSession()` still called `core.readPackage(...)` synchronously before `runBackground("Prepare Apply", ...)`. A large selected ZIP could therefore still block the Swing Event Dispatch Thread before the new progress stage appeared. Correct this real P1 by making archive Output-session setup passive UI bookkeeping only: no ZIP/package/filesystem read is allowed there; authoritative package parsing remains exclusively in background Prepare;
- Review identified a separate race after the existing pre-mutation stale check: if the user authorizes prepared rebind A→B, then manually binds/unbinds while background Execute is already running, the successful post-Apply prepared bind to B can overwrite that later manual choice. The user explicitly accepts this as a known risk for the current revision; do not add mid-Execute binding serialization/compare-and-swap in this ChangeSet. Operational boundary: do not manually change Review-chat binding while Apply Execute is active;
- Review also identified that non-interactive CLI `apply --action-file` cannot present Swing keep/rebind/cancel confirmation. Current compatibility behavior defaults an existing-binding conflict to keep-existing/no action-driven rebind. The user explicitly accepts this as a known CLI divergence for now; do not add CLI rebind options or interactive prompting in this ChangeSet;
- synchronize the shared `OBS-ACTION/1` definition/use so explicit rebind authorization is stated as interactive Swing behavior, while the accepted non-interactive CLI divergence and mid-Execute manual-rebind race are not falsely presented as solved guarantees.

**Proof / acceptance:**
- strengthen the existing Swing source-level regression so the `beginArchiveOutputSession()` method body must contain neither `core.readPackage(...)` nor `Files.*`; the same test still requires Prepare/Execute, Refresh Review, Finalize and Repository Snapshot export to dispatch through the shared `SwingWorker` runner;
- manual acceptance now starts the responsiveness check with a deliberately large ZIP and requires Output/progress to appear without pre-Prepare ZIP validation on EDT;
- existing Core compatibility behavior for CLI keep-existing and existing pre-Execute stale-binding proof remain intentionally unchanged; the newly recorded accepted risks are not promoted into false automated guarantees.

**Target-State Result:** after successful Apply of this exact correction package, clicking Apply performs only passive/string-level archive Output-session setup on EDT and dispatches all ZIP opening/validation to background Prepare before heavy package work. Interactive Swing rebind confirmation semantics remain as selected, while two explicit accepted boundaries are documented truthfully: a manual binding change during already-running Execute may be overwritten by the prepared post-success rebind, and non-interactive CLI action Apply keeps an existing binding rather than obtaining rebind authorization.

**APPLIED relation:** if package `fa609eea-034c-4975-894d-e82b86e4801e` applies successfully, this ReviewDiff correction and accepted-risk clarification become the current state of open ChangeSet `11b02ff6-b591-4e3b-81a7-dd68b6572680`.

### LOG-RPKG-036 — Route visible Output by ChangeSet instead of package/archive identity

**Type:** REVIEWDIFF CORRECTION / LATER CLARIFICATION / OUTPUT-MODEL CORRECTION / TRACEABILITY CLARIFICATION / APPLIED TARGET  
**Updates:** `LOG-RPKG-035`  
**ChangeSet:** `11b02ff6-b591-4e3b-81a7-dd68b6572680`  
**Package:** `0d6ba173-95c2-497a-a9fd-c18fd40d2fbd`

**ReviewDiff finding / user clarification:**
- the previous EDT correction removed synchronous ZIP reads from `beginArchiveOutputSession()`, but its remaining archive/package-oriented Output key could no longer distinguish two ZIP-only packages that reuse one filesystem path. Review initially classified that as a package-identity Output-routing P2;
- the user rejected package/archive identity as the correct Output axis and selected the logical ChangeSet instead: the Output currently shown in Swing belongs to `changeSetId`. Initial/retry/correction packages for one open ChangeSet accumulate in that work's session Output; a different ChangeSet has independent Output even when the physical filename/path is reused; selecting another ChangeSet switches the visible buffer;
- preserve `packageId`, but narrow its role: it remains exact concrete-package correlation/traceability and the `OBS-ACTION.packageId == PACKAGE.json.packageId` verification guard. It does not own visible Output. Archive filename/path remains a physical display/location hint. An action cannot silently authorize a different package merely because the filename is similar or receives a browser `(1)` suffix;
- before background Prepare has successfully produced a valid package/ChangeSet identity, immediate progress or failure is general/unresolved Output. Once `PreparedApply` exists, the UI uses its manifest `changeSetId` before prepare notices, user decisions and Execute.

**Implementation / proof:**
- replace `outputArchiveKey`, `outputChangeSetId`, ReviewDiff-attempt membership and pending-chat-event routing with session-only `changeSetId -> StringBuilder` Output buffers plus one general/unresolved buffer;
- keep a per-ChangeSet Apply-attempt counter and print exact `packageId` plus physical ZIP filename in each Apply attempt header for traceability without making either value a routing key;
- ChangeSet selection renders that ChangeSet buffer. Apply/Refresh/Finalize/Retry callbacks append by the captured ChangeSet identity so a later selector change cannot redirect asynchronous output; Chat bridge events append directly by `ChatEvent.changeSetId`;
- source-level regression requires ChangeSet Output buffers, selector switching, PreparedApply manifest routing and direct chat-event routing, and requires the removed archive/review-attempt/pending-event routing fields to stay absent;
- standard automated suite remains green: Core `63/0`, ChatBridge `43/0`, Windows launcher `5/0`, Node DOM turn-boundary regression PASS. The two accepted risks from `LOG-RPKG-035` (manual rebind during already-running Execute and non-interactive CLI keep-existing behavior) remain unchanged.

**Target-State Result:** after successful Apply of this exact package, visible Swing Output is organized around the same logical work axis as Review/binding/lifecycle: one session buffer per ChangeSet, with continuation/correction package attempts and late ChangeSet/Chat events returning to that buffer. `packageId` remains package/action verification plus traceability only, and reused filenames/paths cannot define or merge Output ownership.

**APPLIED relation:** if package `0d6ba173-95c2-497a-a9fd-c18fd40d2fbd` applies successfully, this ChangeSet-scoped Output correction becomes the current state of still-open ChangeSet `11b02ff6-b591-4e3b-81a7-dd68b6572680`.


### LOG-RPKG-037 — Keep background Refresh scoped to its ChangeSet and remove general Output history

**Type:** REVIEWDIFF CORRECTION / LATER CLARIFICATION / UI-STATE OWNERSHIP CORRECTION / OUTPUT-MODEL CORRECTION / APPLIED TARGET  
**Updates:** `LOG-RPKG-036`  
**ChangeSet:** `11b02ff6-b591-4e3b-81a7-dd68b6572680`  
**Package:** `e1991eee-6ac0-48b4-9954-8e16882c2997`

**ReviewDiff findings / user clarification:**
- Review of the first ChangeSet-scoped Output revision found that background `Refresh Review` captured ChangeSet X correctly in Core but its Swing success callback still assigned `selectedChangeSet`, `currentReview`, `reviewState` and chat-delivery presentation. If the user navigated X → Y while Refresh X was running, completion could therefore make internal selection state X while the visible selector remained Y, creating unsafe UI/state divergence before a later action such as Finalize;
- the user selected the simpler ownership rule: Refresh completion changes persisted Review state for the ChangeSet captured when Refresh started and records its result against that ChangeSet, but it does not own current Swing navigation/presentation. User selection remains selector-owned;
- Review also found that the newly introduced `generalOutput` made non-ChangeSet operations and pre-Prepare failures a second Output history and could still blur the selected ChangeSet boundary. The user explicitly selected no general Output: only concrete `changeSetId` values own Output buffers. Pre-Prepare, repository/settings/launcher/snapshot and other non-ChangeSet progress/errors use a separate transient `Operation` status plus existing notification/Technical Diagnostics paths rather than becoming Output history.

**Implementation / proof:**
- remove `generalOutput`; `outputByChangeSet` contains only non-null ChangeSet keys. With no ChangeSet selected the Output text surface is empty. `Preparing Apply…` is displayed through the transient `Operation` field until `PreparedApply` yields the manifest `changeSetId`, after which notices/decisions/Execute use that ChangeSet Output;
- route generic non-ChangeSet messages through `Operation`; keep Review-chat bind/unbind, Review Copy/Open, Apply/Refresh/Finalize and Chat bridge results explicitly routed to their known ChangeSet Output;
- `refreshReview()` captures ChangeSet/repository identity, runs `core.refreshReview(cs)` in the worker and on completion only appends success/failure to Output `cs`; it no longer assigns `selectedChangeSet`, `Review` fields or chat-delivery presentation from the callback;
- remove the mutable `currentReview` UI cache. Review Copy/Open/Send gating resolves the latest persisted ChangeSet/currentReview when invoked, so a completed background Refresh is immediately authoritative without requiring the callback to rewrite navigation state;
- source-level regressions require no `generalOutput`/`appendToOutput(null,...)`, require transient `Operation` pre-Prepare status, and isolate `refreshReview()` to prove no selection/Review/chat-presentation assignment while still routing completion by captured ChangeSet;
- standard automated suite remains green: Core `63/0`, ChatBridge `44/0`, Windows launcher `5/0`, Node DOM turn-boundary regression PASS. Accepted manual-rebind-during-Execute and non-interactive CLI keep-existing boundaries from `LOG-RPKG-035` remain unchanged.

**Target-State Result:** after successful Apply of this exact package, visible Output has exactly one ownership axis: concrete `changeSetId`. There is no generic Output history. Operations without ChangeSet authority report transiently, while every ChangeSet-owned asynchronous result returns to its captured work buffer. Background Refresh updates only the captured ChangeSet's persisted Review state and cannot silently change the user's current ChangeSet selection; Review actions read the latest persisted Review on demand.

**APPLIED relation:** if package `e1991eee-6ac0-48b4-9954-8e16882c2997` applies successfully, this Refresh/UI-ownership and no-general-Output correction becomes the current state of still-open ChangeSet `11b02ff6-b591-4e3b-81a7-dd68b6572680`.

### LOG-RPKG-038 — Simplify ChatGPT tab-agent lifecycle to one injector and generation fence

**Type:** USER-OBSERVED DEFECT / LATER CLARIFICATION / BROWSER-LIFECYCLE CORRECTION / DELIVERY-STATUS CORRECTION / APPLIED TARGET  
**ChangeSet:** `c822293f-093f-44bb-b06e-e1eeccb202c6`  
**Package:** `9b6cadcd-9a40-43bc-8195-c2f70bdb6d2e`

**Observed defect / selected scope:**
- live use showed intermittent ReviewDiff delivery after extension/tab reload: Java successfully persisted a ReviewDiff task and reported it queued, while the bound ChatGPT page could remain unable to claim/execute it; extension diagnostics repeatedly showed `Extension context invalidated` from the old `content.js` timer and could also show runtime listener access against an invalidated context;
- the existing browser side had two content-agent creation paths at once: manifest `content_scripts` auto-injection plus background `ensureContentScript(...)` fallback injection. The user selected the minimal simplification discussed in review rather than a full new agent-poll protocol: one injection owner, explicit current-agent fencing, deterministic shutdown of invalidated agents and truthful Pending presentation;
- keep Java `ChatBridgeService` as task-state authority and keep the existing protocol-2 inventory/claim/task/attachment/send state machine. Do **not** merge the bridge into Planning Helper, redesign Review-chat binding, change Send proof, change Snapshot attach-only semantics or introduce the larger single `/agent/poll` protocol in this ChangeSet.

**Implementation / invariants:**
- remove ChatGPT `content_scripts` from the extension manifest. The Manifest V3 service worker/background becomes the sole injector of `chatgpt-adapter.js` + `content.js`; bootstrap plus tab create/update/inventory reconciliation covers already-open and newly navigated ordinary `/c/...` tabs;
- add one extension-session `runtimeGeneration` in `chrome.storage.session`. It survives ordinary MV3 service-worker suspension/restart but rotates on extension reload/update/browser-session replacement. Every injected tab agent has an `agentInstanceId`; background pings, task dispatch, task-control messages and payload-stream start are fenced by the current generation/agent instance so stale agents cannot control current delivery;
- make a tab agent replaceable instead of guarded forever by `__OBS_CHAT_BRIDGE_CONTENT__`. A fresh same-context injection disposes the prior agent/listener/timer; extension-context invalidation deactivates the old agent and clears its 2-second heartbeat timer instead of producing an endless error loop;
- preserve task truth across the boundary: no transparent resume is claimed once an external interaction is already `Preparing`/possible-Send. Existing `PreparedUnsent` / `UnknownAfterSend` boundaries remain authoritative for interrupted in-flight work;
- queue persistence is no longer presented as delivery success. `Pending` projects as `Waiting for ChatGPT tab`, `Claimed` as `Delivering`, and manual `Send current ReviewDiff` records a `WAITING ... waiting for the bound ChatGPT tab to claim it` line instead of `SUCCESS ReviewDiff queued...`.

**Proof / acceptance:**
- automated source-level bridge regression requires no manifest `content_scripts`, background-only injection, session generation, per-tab instance fencing, replaceable-agent disposal, heartbeat timer cleanup on invalidation and removal of the old one-shot content guard;
- behavioral bridge proof requires `Pending → Waiting for ChatGPT tab` and `Claimed → Delivering`, plus absence of the old false-success Swing queue message;
- standard suite after the correction: Core `63/0`, ChatBridge `46/0`, Windows launcher `5/0`, Node ChatGPT DOM turn-boundary regression PASS; Java 21 compile and extension JavaScript syntax checks pass;
- manual SL-RPKG-06 acceptance is strengthened with an explicit migration boundary: when moving from a pre-`0.2.11` tab agent, refresh that ChatGPT tab once because already-invalidated legacy code cannot retroactively learn disposal; after the current replaceable agent is present, leave a ReviewDiff Pending and reload the unpacked extension without another page refresh, require a fresh agent to be injected/accepted, the stale current-version agent to stop erroring, and the Pending task to become claimable. Ordinary MV3 service-worker restart must keep the same session generation. Already-prepared in-flight runtime replacement remains outside transparent-resume acceptance.

**Target-State Result:** after successful Apply, the ChatGPT bridge has one browser tab-agent lifecycle owner and one explicit current-agent fence. Extension reload/update no longer depends on whichever of two injection paths wins, stale same-page agents cannot keep driving current work, current-version invalidated agents stop their heartbeat loop, and a durable but unclaimed ReviewDiff is visibly waiting rather than falsely reported as successful delivery. A one-time refresh is documented when upgrading a tab from pre-`0.2.11` code.

**APPLIED relation:** if package `9b6cadcd-9a40-43bc-8195-c2f70bdb6d2e` applies successfully, this minimal bridge lifecycle simplification becomes the current state of new ChangeSet `c822293f-093f-44bb-b06e-e1eeccb202c6` (`SL-RPKG-06 — single-owner ChatGPT tab agent lifecycle`).

### LOG-RPKG-039 — Close ReviewDiff races in agent readiness and repeated-send acknowledgement

**Type:** REVIEWDIFF CORRECTION / BROWSER-LIFECYCLE RACE CORRECTION / DELIVERY-STATUS CORRECTION / APPLIED TARGET  
**ChangeSet:** `c822293f-093f-44bb-b06e-e1eeccb202c6`  
**Package:** `b4067e99-f944-45c4-801c-1c5c3f0fbbe2`

**ReviewDiff findings / selected correction:**
- review of package `9b6cadcd-9a40-43bc-8195-c2f70bdb6d2e` found that `ensureContentScript(...)` still injected inside its readiness loop. Because injected `content.js` registers asynchronously before installing its ping listener, a registration round trip longer than the 150 ms poll interval could cause the next iteration to inject a replacement agent, dispose the still-registering prior agent and repeat; this preserved a timing-dependent lifecycle failure inside the simplification intended to remove such races;
- the same review found that manual `Send current ReviewDiff` always emitted a `WAITING ... waiting ... to claim it` acknowledgement even when `enqueueReview(...)` correctly reused the same already-actionable interaction in `Claimed`, `Preparing` or `SendClicked`;
- keep the same ChangeSet and target architecture. This is a correction of the still-open ChangeSet, not a new delivery model.

**Implementation / invariants:**
- one `ensureContentScript(tabId)` reconciliation now performs at most one `chrome.scripting.executeScript(...)` injection. After that injection it only polls the generation-aware ping until readiness timeout; it cannot reinject merely because asynchronous agent registration has not completed within one poll interval;
- later independent reconciliation may inject again only after the previous readiness attempt has ended and no current agent answers, preserving background as the sole lifecycle owner without an inject/dispose livelock;
- manual ReviewDiff acknowledgement is derived from the actual `ChatTaskInfo.status()` returned by the authoritative enqueue/reuse operation: `Pending → WAITING`, `Claimed → DELIVERING`, `Preparing → DELIVERING / preparing in ChatGPT`, `SendClicked → SENDING`. Reusing an existing actionable interaction therefore cannot be mislabeled as still waiting for claim;
- no Java task-state transition, bridge protocol version, attachment/send proof, binding semantics, Snapshot behavior or larger `/agent/poll` redesign changes here.

**Proof / acceptance:**
- source regression isolates `ensureContentScript(...)`, requires exactly one injection call inside that function and requires the readiness loop to occur after that single injection rather than containing it;
- behavioral regression reuses one exact manual ReviewDiff interaction through `Pending → Claimed → Preparing → SendClicked` and checks the Swing acknowledgement projection for each state;
- the prior ChangeSet acceptance requirements remain cumulative, including one-time refresh only when migrating a tab from pre-`0.2.11` code and no claim of transparent resume after external preparation.

**Target-State Result:** after successful Apply, the minimal single-owner bridge no longer contains a readiness-loop reinjection race, and manual repeat-send acknowledgement cannot contradict the authoritative actionable task state.

**APPLIED relation:** if package `b4067e99-f944-45c4-801c-1c5c3f0fbbe2` applies successfully, these ReviewDiff corrections become the current state of still-open ChangeSet `c822293f-093f-44bb-b06e-e1eeccb202c6` (`SL-RPKG-06 — single-owner ChatGPT tab agent lifecycle`).

### LOG-RPKG-040 — Confirm observed Send without requiring unstable attachment-card DOM and allow uncertainty acknowledgement

**Type:** PRACTICAL REALIZATION FEEDBACK / SL-RPKG-06 SEND-CONFIRMATION CORRECTION / SL-RPKG-08 INTERACTION-USABILITY CORRECTION / APPLIED TARGET  
**ChangeSet:** `5b0bd778-4064-4adf-bf36-85421abac5fe`  
**Package:** `cf10d575-b5ab-40a4-b516-f3432b333bff`

**Observed defect / selected correction:**
- live use again showed the intended ReviewDiff visibly arriving in ChatGPT while the persisted External Interaction became `UnknownAfterSend`. The current proof still required a post-baseline turn-local `.diff` attachment/file-card surface after the prepared attachment had already left the composer; ChatGPT can complete the Send without exposing stable attachment metadata that matches those selectors, so the stronger DOM proof remains useful evidence but is too strict as the mandatory success gate;
- the same live session showed that intentionally retained `UnknownAfterSend` rows accumulate in the External Interactions selector. They cannot truthfully be cancelled because a Send may already have happened, but there was no separate acknowledgement/removal operation, so resolved-by-human uncertainty permanently polluted the working list;
- keep the existing task-state authority, protocol `2`, exact pre-Send attachment preparation, MAIN-world clean-composer guard, possible-Send boundary, lifecycle generation fencing and immutable terminal truth. This is not a retry/state-machine redesign.

**Implementation / invariants:**
- after the exact prepared ReviewDiff attachment leaves the composer, a new user turn after the captured pre-send baseline is sufficient to confirm `Sent`. The adapter still performs its bounded current-authored-turn `.diff` file/attachment-surface lookup and reports that as stronger proof when available, but absence of stable attachment-card metadata no longer converts an otherwise observed Send into false `UnknownAfterSend`; the missing-attachment observation grace follows the current retry interval with a 10-second cap instead of hard-stopping after 2 seconds;
- `UnknownAfterSend` remains reserved for the narrower real ambiguity: a possible Send occurred / the prepared attachment disappeared, but no post-baseline user turn could be confirmed. Attachment disappearance before any possible Send remains `PreparedUnsent`;
- add a persisted optional `dismissedAt` acknowledgement to terminal handoff task state. `Dismiss interaction` is allowed only for terminal `UnknownAfterSend`; it never changes `status`, message, source, destination or task identity, and it does not delete the task record. The External Interactions projection omits acknowledged uncertainty across restart;
- keep `Cancel interaction` limited to truthfully cancellable nonterminal states. Active work cannot be dismissed, and possible-Send uncertainty cannot be rewritten to `Cancelled`.

**Proof / acceptance:**
- extension regression keeps the bounded `.diff` turn proof tests and adds the practical fallback: with the prepared attachment gone, a new post-baseline user turn confirms `Sent` even without a recognized `.diff` surface; without that new turn the state remains missing/uncertain;
- bridge regression requires `UnknownAfterSend` to survive restart before acknowledgement, rejects Dismiss on active work, then persists Dismiss, removes the row across restart and proves the underlying task still reads `UnknownAfterSend`;
- Swing exposes `Dismiss interaction` beside Refresh/Cancel, and extension patch version advances to `0.2.12`; live acceptance must repeat a real ReviewDiff Send where ChatGPT does not expose stable attachment-card metadata and verify `Sent`, then create an intentional uncertainty and verify Dismiss removes only its attention row.

**Target-State Result:** after successful Apply, successful ReviewDiff delivery is no longer downgraded solely because ChatGPT omitted unstable post-Send `.diff` card metadata, while genuine post-click ambiguity still remains `UnknownAfterSend`. Terminal uncertainty remains preserved in the ledger but becomes user-acknowledgeable, so External Interactions stays a working/attention list instead of permanent uncertainty history.

**APPLIED relation:** if package `cf10d575-b5ab-40a4-b516-f3432b333bff` applies successfully, this practical SL-RPKG-06/08 correction becomes the current state of new ChangeSet `5b0bd778-4064-4adf-bf36-85421abac5fe` (`SL-RPKG-06/08 — sent confirmation fallback and uncertainty dismissal`).

### LOG-RPKG-041 — Accept click-baseline fallback risk and restore application/screen owner coherence

**Type:** REVIEWDIFF CORRECTION / KNOWN-RISK ACCEPTANCE / OWNER-DOCUMENT COHERENCE / APPLIED TARGET  
**ChangeSet:** `5b0bd778-4064-4adf-bf36-85421abac5fe`  
**Package:** `85c077e0-f938-459d-9bc9-be38fcacc212`

**ReviewDiff findings / user decision:**
- ReviewDiff of package `cf10d575-b5ab-40a4-b516-f3432b333bff` found that the weak `Sent` fallback counts user turns from the attachment-preparation baseline. An unrelated same-conversation user turn created after preparation but before this task's actual possible-Send click could therefore already satisfy the count increase and, if the prepared attachment later disappears after an ineffective/ambiguous click, could falsely satisfy the weak fallback;
- the user explicitly accepts that click-baseline concurrency window as a **known risk** for this revision rather than selecting implementation hardening now. No source/runtime/test behavior changes for that finding are made in this correction; future hardening remains a per-click user-turn baseline captured immediately before the actual MAIN-world Send click;
- the same ReviewDiff found owner-document drift: `application-plan.md` still described External Interactions as Cancel-only/current-actionable state and retained the older generic send-confirmation wording, while `screens.md` still described only Refresh/Cancel controls and untreated `UnknownAfterSend` attention rows despite the implemented `Dismiss interaction` behavior. This correction updates those owners to the already-selected/implemented semantics.

**Owner/document correction:**
- `application-plan.md` now owns the selected External Interaction behavior as active/actionable/unacknowledged-attention state with truth-preserving `Dismiss interaction` for terminal `UnknownAfterSend`, updates the delivery-preparation wording to the current prepared-attachment-departure + post-baseline user-turn fallback, updates `REQ-RPKG-20`, and records `R-RPKG-SL06-POST-BASELINE-FOREIGN-TURN` under Accepted Low-Frequency Implementation Risks;
- `screens.md` now owns the actual three-button interaction row (`Refresh interactions` / `Cancel interaction` / `Dismiss interaction`), unacknowledged `UnknownAfterSend` working-list semantics, and the current visible send-confirmation boundary;
- `CHATGPT-BRIDGE.md` records the accepted preparation-baseline vs click-baseline concurrency risk next to the active send-confirmation contract, without changing protocol `2`, extension `0.2.12`, task states or browser implementation.

**Target-State Result:** after successful Apply, the implemented SL-RPKG-06/08 behavior and its application/screen/integration owners are coherent: successful delivery still uses the selected post-baseline user-turn fallback, terminal uncertainty can be dismissed without rewriting truth, and the remaining cross-tab/cross-turn weak-fallback edge is explicitly documented as accepted rather than silently presented as solved.

**APPLIED relation:** if package `85c077e0-f938-459d-9bc9-be38fcacc212` applies successfully, this owner-document correction and known-risk acceptance become the current state of still-open ChangeSet `5b0bd778-4064-4adf-bf36-85421abac5fe` (`SL-RPKG-06/08 — sent confirmation fallback and uncertainty dismissal`).

### LOG-RPKG-042 — Select Snapshot ChatGPT destination before export and freeze it per operation

**Type:** PRACTICAL UX CORRECTION / SL-RPKG-04 EXPORT FLOW / SL-RPKG-05 SNAPSHOT HANDOFF / APPLIED TARGET  
**ChangeSet:** `3859732c-bd93-415f-b016-2d8b7290b761`  
**Package:** `a2a981dd-1fd2-4ef9-bb35-74d741944219`

**Observed usability issue / selected behavior:**
- current Swing Snapshot flow exports first and only then offers `Attach to ChatGPT`, opening a second dialog that asks for the destination conversation after the artifact already exists. In practice this makes destination a late mutable choice and makes it easier to attach repository context to the wrong chat;
- selected correction is destination-first without adding a toggle/state machine: one Repository Snapshot dialog exposes `Export only` and `Export + Attach`. For the combined path the user sees/selects the ordinary ChatGPT conversation before export begins;
- avoid unnecessary persistence and coupling: Snapshot chat choice is per operation, not a new setting and not the ChangeSet Review-chat binding. Title is presentation only; exact `conversationKey` is frozen before background export.

**Implementation / invariants:**
- `MainWindow.exportRepositorySnapshot()` captures the exact Repository Target/path plus Snapshot mode/ref/output and, for `Export + Attach`, the selected `conversationKey` before `runBackground(...)` starts;
- Snapshot ZIP creation still completes first and remains independently successful. Only after successful export does the same background operation call the existing `Core.attachSnapshotToChat(...)` / `ChatBridgeService.enqueueSnapshot(...)` path with the frozen key and exact created ZIP, keeping snapshot ZIP inspection/fingerprinting off the Swing EDT;
- the legacy post-export `Attach to ChatGPT` destination dialog is removed. Export completion never re-reads the main Review-chat selection and never substitutes another conversation;
- if the frozen conversation is no longer open at enqueue time, existing bridge validation rejects enqueue before task creation. The app reports `Snapshot exported, but ChatGPT attachment was not started`, preserves the ZIP, creates no orphan interaction and leaves Review-chat binding unchanged;
- Snapshot remains attach-only/never Send. Existing bridge task identity, exact artifact validation, External Interaction dedupe/cancel semantics and browser attachment implementation are unchanged.

**Proof / acceptance:**
- bridge regression requires missing frozen destination to fail without creating an External Interaction, then proves an available exact key is retained and `autoSend=false`;
- Swing source regression requires the two explicit actions, chat selector, key capture before background export, use of the frozen key for enqueue and absence of the old post-export destination chooser;
- manual acceptance covers two open chats, changing Review-chat selection during export, closing the frozen destination before enqueue, Export-only with no visible chats and real attach-only Edge/ChatGPT behavior.

**Target-State Result:** after successful Apply, Repository Snapshot handoff has one explicit destination choice before work starts: `Export only` remains browser-independent, while `Export + Attach` freezes the user's chosen conversation before export and can attach the resulting ZIP only there without changing Review binding or weakening independent snapshot success.

**APPLIED relation:** if package `a2a981dd-1fd2-4ef9-bb35-74d741944219` applies successfully, this destination-first Snapshot export/handoff behavior becomes the current state of new ChangeSet `3859732c-bd93-415f-b016-2d8b7290b761` (`SL-RPKG-04/05 — preselected snapshot ChatGPT destination`).


### LOG-RPKG-043 — Bound Snapshot attachment confirmation instead of close-tab freshness handshake

**Type:** REVIEWDIFF CORRECTION / USER CLARIFICATION / SL-RPKG-05 TASK LIFECYCLE / APPLIED TARGET  
**ChangeSet:** `3859732c-bd93-415f-b016-2d8b7290b761`  
**Package:** `b4ae74c3-8fc7-4ce5-9a91-0028f65ab947`

**ReviewDiff finding / later clarification:**
- Review of package `a2a981dd-1fd2-4ef9-bb35-74d741944219` found that the documented promise “close frozen Chat A before enqueue → no Pending task” was stronger than the implementation: Java inventory can be stale, so `enqueueSnapshot(...)` may still create a Pending task after the physical tab has already closed;
- rather than add a special post-export fresh-inventory handshake or treat tab closure as a separate business event, the selected correction keeps the simpler frozen-destination flow and bounds the attachment interaction itself;
- exact destination authority is unchanged: `Export + Attach` freezes one `conversationKey` before export, never substitutes another chat and never mutates Review-chat binding.

**Implementation / truth boundary:**
- `ChatBridgeService` adds one fixed 10-minute absolute Snapshot confirmation deadline from task creation. The deadline is independent of claim/heartbeat lease renewal, so stale inventory or a live-but-stuck agent cannot keep a Snapshot interaction actionable forever;
- expiry in `Pending` or `Claimed` becomes terminal `Cancelled` because external preparation was never confirmed;
- expiry in `Preparing` becomes terminal `PreparedUnsent`, preserving that an attachment may already remain in the composer; Snapshot remains attach-only and Send is never attempted;
- ordinary inventory validation still rejects a destination already known unavailable at enqueue, but no additional fresh-inventory/close-tab handshake is required. Successful ZIP export remains successful for every downstream browser outcome.

**Proof / correction coverage:**
- bridge regression ages a queued frozen-destination Snapshot beyond the absolute deadline while inventory still contains that conversation and requires it to become `Cancelled` and unclaimable, covering the stale-inventory case that the prior test missed;
- a second regression ages a `Preparing` Snapshot and requires `PreparedUnsent`, proving timeout does not falsely claim clean cancellation after external preparation;
- Scenario/Application/Screen/Slice/testing/manual/integration owners now describe bounded confirmation rather than the superseded “closed chat always means no task” promise.

**Target-State Result:** after successful Apply, destination-first Snapshot handoff remains simple and exact: choose Chat A before export, use only Chat A, create the ZIP first, then either confirm `Attached` or reach bounded truthful terminal state without a fresh tab-closure handshake or indefinite Pending/Claimed/Preparing accumulation.

**APPLIED relation:** if package `b4ae74c3-8fc7-4ce5-9a91-0028f65ab947` applies successfully, this timeout correction becomes the current state of still-open ChangeSet `3859732c-bd93-415f-b016-2d8b7290b761` (`SL-RPKG-04/05 — preselected snapshot ChatGPT destination`) and supersedes only the stronger no-task-on-close wording from `LOG-RPKG-042`; the destination-first selection itself remains unchanged.

### LOG-RPKG-044 — Make the Snapshot confirmation deadline an actual Java-owned wake-up

**Type:** REVIEWDIFF CORRECTION / SL-RPKG-05 TASK LIFECYCLE / APPLIED TARGET  
**ChangeSet:** `3859732c-bd93-415f-b016-2d8b7290b761`  
**Package:** `fcf08940-57b1-4ad1-9ffa-e37f03c5256c`

**ReviewDiff finding / correction decision:**
- ReviewDiff of package `b4ae74c3-8fc7-4ce5-9a91-0028f65ab947` found that the selected 10-minute Snapshot confirmation budget was only checked lazily inside `expireClaims()`. If no bridge/UI/service call occurred after the deadline, a persisted `Pending`/`Claimed`/`Preparing` Snapshot interaction could therefore remain nonterminal past ten minutes despite the owner documents promising a fixed bounded lifecycle;
- keep the selected simple product model: do not add a fresh-inventory/close-tab handshake and do not make tab closure a separate business event. Instead Java task authority owns one real scheduled deadline from task creation; claim/heartbeat activity cannot extend it;
- the same review noted wording drift in the `Preparing` timeout message: it said “10 minutes after preparation began” even though the deadline is measured from task creation. The correction uses task-confirmation-window wording and keeps the existing truth boundary.

**Implementation / truth boundary:**
- `ChatBridgeService` now arms a daemon single-thread scheduled wake-up for every active Snapshot task at `createdAt + 10 minutes`. The callback reloads current persisted task state under the same synchronized service authority and is idempotent with the existing lazy normalization backstop;
- at deadline, `Pending` or `Claimed` becomes terminal `Cancelled`; `Preparing` becomes terminal `PreparedUnsent`, because the attachment may already remain in the composer. Any already-terminal task is left unchanged and its scheduled future is cancelled/removed;
- service construction restores active Snapshot deadlines after restart: already-overdue records are normalized immediately, while still-active records are re-armed for their remaining absolute time. A claim lease reset or heartbeat never moves the Snapshot confirmation deadline;
- exact frozen `conversationKey`, no destination substitution, independent successful ZIP export, attach-only/never-Send behavior and Review-chat binding independence remain unchanged.

**Proof / correction coverage:**
- bridge regression uses a short test-only deadline and waits on persisted task state without invoking an expiration-bearing inventory/enqueue/interaction call, proving the scheduled wake-up itself turns unprepared work into `Cancelled`;
- a second scheduled test reaches `Preparing` before the deadline and proves automatic `PreparedUnsent` plus corrected task-window wording;
- restart regression proves both re-arming of a still-live persisted deadline and immediate normalization of an already-overdue Snapshot task; testing-plan ownership now explicitly requires scheduled wake-up behavior independent of later requests and restart recovery.

**Target-State Result:** after successful Apply, a destination-first Snapshot interaction cannot remain actionable past its selected confirmation budget merely because browser/UI traffic stopped. Java owns the absolute ten-minute deadline and restores it across app restart while preserving truthful `Cancelled` vs `PreparedUnsent` semantics and avoiding any fresh tab-closure handshake.

**APPLIED relation:** if package `fcf08940-57b1-4ad1-9ffa-e37f03c5256c` applies successfully, this scheduler correction becomes the current state of still-open ChangeSet `3859732c-bd93-415f-b016-2d8b7290b761` (`SL-RPKG-04/05 — preselected snapshot ChatGPT destination`) and supersedes only the lazy-expiration implementation from `LOG-RPKG-043`; its destination-first and bounded-truth decisions remain unchanged.

### LOG-RPKG-045 — Preserve restart-normalized Snapshot terminal events until UI sink registration

**Type:** REVIEWDIFF CORRECTION / SL-RPKG-05 EVENT SURFACING / RESTART LIFECYCLE / APPLIED TARGET  
**ChangeSet:** `3859732c-bd93-415f-b016-2d8b7290b761`  
**Package:** `14a882bf-51f3-4b66-98a3-28cc20cfd3a0`

**ReviewDiff finding / correction decision:**
- ReviewDiff of package `fcf08940-57b1-4ad1-9ffa-e37f03c5256c` confirmed that the Java-owned Snapshot deadline now fires autonomously and restores across restart, but found one startup ordering hole: `ChatBridgeService` normalized overdue persisted work in its constructor while `eventSink` was still the default no-op. A task could therefore become terminal and disappear from the actionable External Interactions projection before Swing registered its listener, with the terminal event never reaching Output/notification;
- keep the selected scheduler, absolute task-creation deadline, frozen destination and truth boundary unchanged. The correction is event-surfacing lifecycle only: terminal truth may be established during service construction, but its event must survive until the first real UI sink is installed.

**Implementation / invariants:**
- `ChatBridgeService` now keeps a FIFO of `ChatEvent` values emitted before `setEventSink(...)` installs a concrete sink. Startup normalization still occurs in the constructor under Java task authority; only notification delivery is deferred;
- registering the sink flushes those deferred events exactly once and then ordinary events are delivered directly. Replacing the sink later does not replay already-surfaced startup events; explicitly setting a null sink retains the prior no-op/discard meaning rather than accumulating unbounded history;
- task status, persisted message, scheduler deadline, `Cancelled` vs `PreparedUnsent`, External Interaction projection and Snapshot attach-only behavior are unchanged. No browser freshness handshake or new task state is introduced.

**Proof / correction coverage:**
- restart regression persists an overdue Snapshot, constructs a new service that normalizes it before any sink exists, then registers a sink and requires exactly one event for the same task with terminal `Cancelled` truth; a second sink registration must receive no replay and the terminal task must already be absent from the actionable interaction list;
- testing-plan ownership now explicitly requires restart-normalized terminal events to survive constructor/sink ordering and be surfaced exactly once, in addition to the existing autonomous wake-up and restart re-arm checks.

**Target-State Result:** after successful Apply, an overdue Snapshot restored at application startup can no longer vanish silently between task normalization and Swing listener registration. Java still owns the fixed deadline and terminal truth, while Output/notification receives the corresponding startup terminal event exactly once after the UI sink becomes available.

**APPLIED relation:** if package `14a882bf-51f3-4b66-98a3-28cc20cfd3a0` applies successfully, this event-surfacing correction becomes the current state of still-open ChangeSet `3859732c-bd93-415f-b016-2d8b7290b761` (`SL-RPKG-04/05 — preselected snapshot ChatGPT destination`) and supersedes only the startup no-op event-loss edge in `LOG-RPKG-044`; its destination-first and scheduled-deadline decisions remain unchanged.

### LOG-RPKG-046 — Add separate bounded wait-for-ZIP Apply wrapper

**Type:** USER CLARIFICATION / SL-RPKG-01 APPLY UX / DOWNLOAD-ARRIVAL POLLING / APPLIED TARGET  
**ChangeSet:** `42f661ae-ab2f-4fdc-854f-bf95e3407c2f`  
**Package:** `b2b60d56-1d23-4179-8136-694b793f98db`

**Selected behavior:**
- ordinary `Apply` stays unchanged and continues to invoke one immediate asynchronous Prepare;
- a new separate `Apply (wait for ZIP)` button exists for the narrow browser-download race where the action/archive reference is already present but the ZIP has not reached its final path yet;
- this is deliberately a wrapper over the existing Apply path, not another validator/resolver/executor. It freezes the click-time Archive ZIP field, OBS-ACTION text and current Repository Target ID, calls the same `core.prepareApply(...)` immediately and retries only `PACKAGE_NOT_FOUND` every 2 seconds for at most 12 seconds;
- any non-`PACKAGE_NOT_FOUND` Prepare result stops polling immediately. The first successful Prepare is passed once to the existing `continuePreparedApply(...)` decision/authorization/Execute path. Polling performs no repository mutation and never retries Execute.

**Implementation / UX boundary:**
- the complete polling loop runs inside the existing background-operation runner, so the Swing EDT is never slept and another heavyweight operation cannot start in parallel during the bounded wait;
- the expected attempt points are approximately click-time, +2s, +4s, +6s, +8s, +10s and the final +12s opportunity. If the package is still absent, the wrapper returns terminal `PACKAGE_NOT_FOUND` with explicit 12-second timeout meaning;
- editing Archive ZIP, OBS-ACTION or repository selection after the wait button was clicked cannot retarget that in-flight wait. Ordinary `Apply` remains available as the non-polling action and all existing packageId/repository/applicability/Review-chat decisions remain owned by Prepare/Execute.

**Proof / acceptance:**
- source regression requires two distinct buttons, preserves the original direct `Apply → core.prepareApply(...)` path, proves the wait action freezes inputs before background work, encodes 2000 ms / 12000 ms bounds, retries only `PACKAGE_NOT_FOUND`, calls the same Prepare and contains no `executeApply(...)`;
- manual acceptance covers package appearance during the window, full timeout with no mutation, immediate stop on another Prepare error, and mutation only through the existing successful Prepare continuation.

**Target-State Result:** after successful Apply of this package, users can explicitly choose a short bounded wait when the replacement ZIP may still be downloading without weakening normal Apply semantics or creating a second repository-operation implementation.

**APPLIED relation:** if package `b2b60d56-1d23-4179-8136-694b793f98db` applies successfully, this separate bounded wait-for-ZIP convenience becomes the current state of new ChangeSet `42f661ae-ab2f-4fdc-854f-bf95e3407c2f` (`SL-RPKG-01 — bounded wait-for-ZIP Apply wrapper`).


### LOG-RPKG-047 — Reuse one generic attachment/optional-Send engine for Snapshot and ReviewDiff

**Type:** USER CLARIFICATION / SL-RPKG-04/05/06 / GENERIC ATTACHMENT DELIVERY / APPLIED TARGET  
**ChangeSet:** `bb052e95-56aa-4cce-b25d-82aabb19a248`  
**Package:** `5e407a72-1ca1-4c03-ad06-c53868d3f0b3`

**Selected behavior:**
- Repository Snapshot keeps one destination-first dialog but now exposes three explicit outcomes: `Export only`, `Export + Attach`, and `Export + Attach + Send`. Either automatic handoff freezes the selected ordinary ChatGPT `conversationKey` plus send intent before background export; the exact ZIP must still succeed before any browser interaction is queued;
- `Export only` keeps the existing post-export result dialog with exact path / Copy path / Open folder. If either ChatGPT handoff was selected up front, that second modal is suppressed: export success and downstream handoff state are surfaced through Operation, External Interactions and notifications instead of asking again what to do with the path;
- Snapshot destination remains per-operation only: no later/current chat substitution, no Review-chat binding mutation and no special close-tab freshness handshake. Successful ZIP creation remains successful independently of downstream browser availability.

**Generic delivery implementation / truth boundary:**
- ReviewDiff and Repository Snapshot now consume one generic browser attachment/optional-Send engine rather than parallel kind-specific implementations. The shared attachment primitive verifies the exact queued bytes/fingerprint, constructs the exact `fileName`, drives the ChatGPT file input and waits for upload readiness. The shared auto-send tail requires a clean composer, performs guarded MAIN-world Send attempts for that exact attachment, records `SendClicked` only after a possible click and resolves `Sent` / `UnknownAfterSend` from prepared-attachment departure plus the existing post-baseline user-turn fallback; a turn-local file/attachment surface exposing the exact queued filename is stronger optional proof for either `.diff` or `.zip`;
- ReviewDiff remains `text/x-diff` with `autoSend=true`. Snapshot remains a validated Repository Snapshot ZIP and freezes either `autoSend=false` (terminal `Attached`) or `autoSend=true` (the same guarded Send lifecycle). Attach-only and attach+Send for the same Snapshot/destination are distinct interaction intents; exact same artifact/destination/mode still dedupes while actionable;
- Java and extension task-contract validation move to bridge protocol `3`; extension version moves to `0.3.0`. `sendRetryIntervalMs` is supplied for every auto-send task, using the existing persisted Review send retry setting rather than introducing a second retry control. Java `SendClicked`/result transitions are generic for authorized auto-send tasks instead of being ReviewDiff-only;
- the existing Java-owned fixed Snapshot confirmation deadline still owns `Pending` / `Claimed` / `Preparing`: expiry is `Cancelled` before preparation or `PreparedUnsent` after preparation begins. When an auto-send Snapshot reaches `SendClicked`, its Snapshot deadline is cancelled and ordinary possible-Send uncertainty takes over, so later timeout normalization cannot rewrite possible-Send truth;
- the previously accepted post-baseline foreign-turn confirmation risk is inherited by Snapshot auto-send because both kinds now deliberately share the same confirmation module. No new claim is made that the fallback is click-baseline hardened.

**Proof / acceptance:**
- Java regression covers attach-only backward compatibility, Snapshot auto-send retry-contract capture, `Preparing → SendClicked → Sent`, mode-sensitive actionable dedupe, and preservation of `SendClicked` beyond the Snapshot confirmation deadline; source-level Swing regression requires all three dialog outcomes, frozen send mode and suppression of the second result modal only for automatic handoff;
- extension source regression requires one generic attachment module plus one generic optional-Send module, removes ReviewDiff-only Send runtime identifiers and validates protocol `3`; DOM regression proves exact-filename same-turn stronger proof for both `.diff` and `.zip`, no cross-turn proof borrowing, ordinary filename text is not attachment proof, and the existing post-baseline fallback remains available;
- manual owners require `Export + Attach` to stop at a ready unsent ZIP and `Export + Attach + Send` to traverse the same guarded attachment+Send engine as ReviewDiff in the frozen selected conversation, with export-only retaining manual path controls.

**Target-State Result:** after successful Apply, Snapshot export no longer asks a second modal question after an automatic ChatGPT handoff was already selected. Attach-only Snapshot and auto-send Snapshot both reuse the same attachment machinery as current-change delivery; auto-send additionally reuses the same guarded Send/confirmation machinery, while Snapshot-specific destination, ZIP validation and fixed pre-confirmation deadline semantics remain intact.

**APPLIED relation:** if package `5e407a72-1ca1-4c03-ad06-c53868d3f0b3` applies successfully, this generic attachment/optional-Send realization becomes the current state of new ChangeSet `bb052e95-56aa-4cce-b25d-82aabb19a248` (`SL-RPKG-04/05/06 — generic attachment and optional Send delivery`). Historical LOG-RPKG-042..045 attach-only wording remains history of the earlier selected state and is superseded for current Snapshot behavior by this entry.


### LOG-RPKG-048 — Authorize guarded Send before browser click to close the Snapshot deadline race

**Type:** REVIEWDIFF CORRECTION / SL-RPKG-05/06 SEND AUTHORIZATION / POSSIBLE-SEND TRUTH / APPLIED TARGET  
**ChangeSet:** `bb052e95-56aa-4cce-b25d-82aabb19a248`  
**Package:** `7ec80a95-a379-4efb-a553-eec2cb5dfa83`

**ReviewDiff finding / correction:**
- the first generic attachment+Send package still let the browser perform the MAIN-world Send click before Java persisted `SendClicked`. For Snapshot auto-send, the independent Java-owned 10-minute confirmation scheduler could therefore win the narrow interval after a real click but before `stageSendClicked(...)`, terminalize `Preparing → PreparedUnsent`, and make later click/result persistence fail. That could falsely report unsent truth after a message may already have left the composer;
- the correction keeps the generic attachment/send engine and introduces one generic pre-click authorization state, `SendArmed`, for every `autoSend=true` task. Before each MAIN-world click attempt the content agent asks Java to enter `SendArmed`. Java synchronously normalizes expiry, requires the task to still be `Preparing`, requires auto-send, and for Snapshot thereby proves the original absolute confirmation deadline is still live before atomically cancelling its scheduled wake-up and returning authorization;
- only after `SendArmed` succeeds may the extension request the guarded MAIN-world click. A browser `clicked` result advances `SendArmed → SendClicked`; if the click outcome/transport becomes uncertain while armed, task/tab/lease loss resolves as `UnknownAfterSend` because a click may already have happened. Cancellation is refused in both `SendArmed` and `SendClicked`;
- a definitive MAIN-world no-click result uses `SendNotClicked` to disarm. ReviewDiff returns to `Preparing`; Snapshot returns to `Preparing` only while its original task-creation deadline is still live and re-arms that same absolute deadline. If the deadline elapsed during the guarded no-click attempt, the result is `PreparedUnsent`; authorization therefore closes the click race without extending the Snapshot confirmation budget;
- bridge protocol advances to `4` and extension version to `0.3.1` so a pre-correction protocol-3 extension cannot continue using the click-before-Java-authority ordering against the corrected app.

**Proof / acceptance:**
- Java regression proves a Snapshot can enter `SendArmed` before its deadline, remain protected from the Snapshot scheduler while the browser-click window crosses that deadline, then advance to `SendClicked`/possible-Send truth;
- a second regression proves a definitive no-click after the same crossing becomes `PreparedUnsent` instead of silently extending the original deadline;
- generic extension source proof requires `onSendArmed()` before `OBS_ATTACHMENT_SEND_ATTEMPT`, explicit `SendNotClicked` handling for every non-click response, and `SendClicked` only after `clicked`; full Java tests, Core tests, launcher tests and DOM regression remain green.

**Target-State Result:** after successful Apply, the generic ReviewDiff/Snapshot attachment+Send module has a Java-owned authorization boundary before browser Send. Snapshot's fixed deadline can no longer race a real application-controlled click into false `PreparedUnsent`, while a confirmed no-click still respects the original task-creation deadline.

**APPLIED relation:** if package `7ec80a95-a379-4efb-a553-eec2cb5dfa83` applies successfully, this correction supersedes only the click-before-Java-authority race in `LOG-RPKG-047`; the generic attachment/optional-Send design, three-way Snapshot UI, frozen destination/send intent and post-baseline confirmation policy remain unchanged.


### LOG-RPKG-049 — Keep guarded retries inside SendClicked after the first possible click

**Type:** REVIEWDIFF CORRECTION / SL-RPKG-05/06 GUARDED SEND RETRY / PROTOCOL DOC CONSISTENCY / APPLIED TARGET  
**ChangeSet:** `bb052e95-56aa-4cce-b25d-82aabb19a248`  
**Package:** `ad4a5817-b604-4cc7-81b7-9b42da140b1b`

**ReviewDiff finding / correction:**
- the `SendArmed` race correction correctly moved Java authority before the first application-controlled browser click, but the generic content retry loop then tried to enter `SendArmed` again before every later guarded attempt. After the first real `clicked` result Java is already in `SendClicked`, so a still-prepared attachment could not reach its configured later retry: the second `SendArmed` request was rejected because only `Preparing → SendArmed` is legal;
- the corrected loop uses `SendArmed` only while no possible Send has yet been recorded. A definitive no-click before that boundary still calls `SendNotClicked` and returns to `Preparing`; once a real possible click establishes `SendClicked`, later guarded attempts for the same exact prepared attachment remain in that existing possible-Send lifecycle and do not re-arm or disarm;
- this preserves both selected truths at once: Snapshot's fixed confirmation deadline cannot race the first application-controlled click, and the already-existing configurable guarded retry behavior continues after an ineffective first possible click;
- current owner documentation is synchronized to bridge protocol `4` and to the one-time pre-click authorization boundary. Historical action-log entries that accurately describe earlier protocol-3 packages remain historical rather than being rewritten; extension patch version advances to `0.3.2` with no wire-contract change.

**Proof / acceptance:**
- source regression requires `if (!possibleSendRecorded) await onSendArmed()` and the matching conditional `SendNotClicked`, while retaining the single generic `OBS_ATTACHMENT_SEND_ATTEMPT` path;
- manual/testing owners require an ineffective first possible click with the exact attachment still prepared to produce a later guarded attempt from `SendClicked` without a second `SendArmed`;
- `ARCHITECTURE.md` and `CHATGPT-BRIDGE.md` no longer advertise current protocol `3`; current contract is protocol `4`.

**Target-State Result:** after successful Apply, Java authorization protects the first possible-Send boundary, then `SendClicked` remains the stable possible-Send state for repeated guarded attempts until `Sent`, `UnknownAfterSend`, attachment loss or another terminal condition. No retry tries to transition `SendClicked → SendArmed`.

**APPLIED relation:** if this correction package applies successfully, it supersedes the retry-loop/doc inconsistency found in the cumulative ReviewDiff for package `7ec80a95-a379-4efb-a553-eec2cb5dfa83` while keeping ChangeSet `bb052e95-56aa-4cce-b25d-82aabb19a248` open for review.

### LOG-RPKG-050 — Resolve invocation-scoped chatContextToken asynchronously without blocking Apply

**Type:** USER CLARIFICATION / CROSS-SCOPE SLICE EXTENSION / SHARED-PROTOCOL CHANGE / APPLIED TARGET  
**ChangeSet:** `10ce3e4a-4b24-42d4-9b63-b7fee8b8c655`  
**ChangeSet Label:** `Planning Helper / RPKG — invocation-scoped chatContextToken binding`  
**Package:** `9ba85d44-3853-4452-92ba-e96495d302d4`

**Selected meaning:**
- keep the already-finalized generic Planning Helper side-effect seam, but make `capture-chat-context` an explicit one-shot invocation option instead of automatic behavior for every `replacement_archive.create`; ordinary Insert/Full/Copy stays byte-for-byte canonical and produces no token, while explicit `Bind + Insert` / `Bind + Copy` / `Bind + Full` produces one fresh token;
- the bind invocation captures `{chatContextToken, conversationKey, observedTitle, capturedAt}` in the current ChatGPT tab's `sessionStorage`; captures are not consumed/deleted after first lookup in this revision, repeated bind invocations produce distinct tokens, and an old token never gets reinterpreted from a later tab URL;
- the side-effect body requires the exact token in `OBS-ACTION/1.chatContextToken` for **this invocation only** and explicitly forbids carry-forward. Later ordinary archive commands omit it; `packageId`, `changeSetId` and `chatContextToken` remain separate identities;
- when an action carries a token, Replacement Package App starts/reuses an asynchronous token lookup during authorized Execute. Bridge protocol 5 returns pending token requests with inventory; extension background fans them out to live ChatGPT tab agents; agents answer only from their own session capture store and background returns aggregated captures. Same-conversation duplicate answers deduplicate; different conversation keys for one token conflict and never guess;
- token presence takes precedence over legacy `chatTabTitle` matching. Legacy title behavior remains backward compatible when no token is present. A resolved token may establish a missing Review-chat binding or confirm the same existing binding, but it never silently rebinds a ChangeSet already bound to a different conversation;
- repository Apply does not wait for token resolution. The successful Apply/current ReviewDiff point is the delivery cutoff: resolved/safe before cutoff binds and queues normally; pending/conflict/different-binding keeps Apply successful but skips automatic delivery of that Apply's ReviewDiff and emits a separate notification. Late resolution may persist a missing binding for future deliveries and emits a second binding notification, but never retroactively sends the skipped ReviewDiff;
- this changes `SL-RPKG-01` Apply cutoff behavior, `SL-RPKG-06` destination binding/delivery entry and `SL-RPKG-09` outcome notification. Token lookup mechanics are internal destination resolution and are **not** a new `SL-RPKG-08` External Interaction. Planning Helper `SCN-PH-USE` owns the explicit invocation variant.

**Implementation / proof:**
- shared `OBS-ACTION/1` accepts optional UUID `chatContextToken`; consumer rejects carrying the same token into a different package/ChangeSet request;
- Java persists `chat-context-lookups/<token>.json`, exposes pending lookups through `/v1/inventory`, accepts `/v1/chat-context/result`, and keeps binding/delivery truth separate from repository Apply truth;
- extension `0.4.0` / bridge protocol `5` implements tab-agent lookup without adding a clipboard permission or a new External Interaction kind;
- automated Core/bridge proof covers optional parsing, token precedence, pending-before-cutoff skip + late bind/no retro-send, resolved-before-cutoff queueing, duplicate-tab dedupe, token carry-forward rejection and protocol source wiring; Planning Helper proof covers ordinary side-effect-free invocation, explicit capture persistence, fresh repeated tokens and fail-closed non-chat binding.

**Target-State Result:** an explicit bound `давай архив` invocation can establish the exact Review-chat destination through an opaque one-invocation token without exposing `conversationKey` to the package producer, while ordinary repeated archive commands remain non-binding and existing title/manual flows remain compatible.

**APPLIED relation:** successful Apply of package `9ba85d44-3853-4452-92ba-e96495d302d4` makes this cross-scope token-binding design the current state of new ChangeSet `10ce3e4a-4b24-42d4-9b63-b7fee8b8c655`; later corrections before final APPROVABLE review keep this ChangeSet identity, while work after accepted APPROVABLE review must start a new ChangeSet.

### LOG-RPKG-051 — Correct protocol marker and late chat-context conflict notification

**Type:** REVIEWDIFF CORRECTION / PROTOCOL DOC CONSISTENCY / SL-RPKG-09 NOTIFICATION TRUTH / APPLIED TARGET  
**Updates:** `LOG-RPKG-050`  
**ChangeSet:** `10ce3e4a-4b24-42d4-9b63-b7fee8b8c655`  
**Package:** `c5ab203b-2494-4060-b222-c3998cf7b281`

**ReviewDiff findings / selected correction:**
- the token-binding implementation and protocol wiring are on bridge protocol `5`, but `CHATGPT-BRIDGE.md` retained one current-contract sentence saying `/v1/health` requires protocol `4`; correct that remaining current marker to `5` without rewriting historical protocol-4 entries;
- a token conflict discovered after an earlier pending-at-cutoff skip emits the distinct `ContextBindingConflict` event, but Swing's chat-context notification classifier did not include that terminal attention status in its failure set. Include it so the Windows notification uses the failure/attention channel consistently with the UI title and conflict semantics;
- extend the existing late-conflict regression with a source assertion that the notification classifier contains `ContextBindingConflict`.

**Target-State Result:** current bridge documentation consistently identifies protocol `5`, and a late conflicting chat-context resolution remains separate from the already-emitted skipped-delivery event while surfacing as an attention/failure notification rather than a non-failure success-style notification. No token lookup, Apply cutoff, binding, delivery, or carry-forward semantics change.

**APPLIED relation:** successful Apply of package `c5ab203b-2494-4060-b222-c3998cf7b281` corrects the two ReviewDiff P2 findings inside still-open ChangeSet `10ce3e4a-4b24-42d4-9b63-b7fee8b8c655`; the ChangeSet remains open for cumulative ReviewDiff review.

### LOG-RPKG-052 — Make chatContextToken resolution request-driven and suspend lookup after failed Apply

**Type:** REVIEWDIFF CORRECTION / REQUEST-DRIVEN BRIDGE LOOKUP / APPLY-FAILURE LIFECYCLE / APPLIED TARGET  
**Updates:** `LOG-RPKG-050`, `LOG-RPKG-051`  
**ChangeSet:** `10ce3e4a-4b24-42d4-9b63-b7fee8b8c655`  
**ChangeSet Label:** `Planning Helper / RPKG — invocation-scoped chatContextToken binding`  
**Package:** `fc282f3d-8dfd-4b4b-97f4-f04089350512`

**ReviewDiff findings / selected correction:**
- the first token-binding package transported pending lookup work only inside the next `/v1/inventory` response, making the pre-ReviewDiff binding race depend on unrelated inventory timing. Replace that initial transport with a separate bounded `/v1/chat-context/wait` request channel: Java revisions/wakes the pending snapshot when lookup state changes and extension background immediately fans returned tokens to live tab agents. Inventory remains conversation/task reconciliation only;
- retain unresolved tokens in extension memory only while Java reports `Pending` / `WaitingAfterCutoff`, and retry them on relevant tab lifecycle events. A service-worker restart rehydrates pending work from the Java request snapshot rather than from browser title/URL inference;
- when repository Apply fails before the Review delivery cutoff, transition that package-scoped lookup to `ApplyFailed`, remove it from the agent-facing pending snapshot and ignore late in-flight lookup results. Retrying the exact same package/ChangeSet/token may reopen the request; if a conversation capture already resolved before the failed Apply, reuse that capture as `Resolved`, otherwise reopen as `Pending`. Token reuse by a different package/ChangeSet remains rejected;
- bump the unpacked extension to `0.4.1` while keeping bridge protocol `5`; this is a correction inside the still-open protocol-5 ChangeSet, not a new semantic protocol generation.

**Implementation / proof:**
- `ChatBridgeServer` adds authenticated protocol-5 `POST /v1/chat-context/wait` and returns lookup result status from `/v1/chat-context/result`; `/v1/inventory` no longer carries `contextLookups`;
- `ChatBridgeService` owns a revisioned wait/notify channel, persists `ApplyFailed`, wakes on pending-set changes and supports exact-request reopen without exposing failed work to agents;
- the Core Apply failure path suspends a token lookup only while no successful repository Apply attempt has been persisted, without changing the repository failure result;
- extension background holds one bounded wait loop, remembers the authoritative pending snapshot, fans out immediately on Java wake and retries unresolved remembered requests on tab create/update events;
- automated verification after the correction: Core tests `67/67`, ChatBridge tests `59/59`, DOM regression PASS, Windows launcher tests `5/5`, and `node --check` for `background.js` PASS.

**Target-State Result:** receiving a token-bearing authorized Apply creates a request-driven chat-context lookup that can resolve immediately without waiting for inventory polling. Repository Apply still never waits for lookup completion. A failed Apply cannot leave an indefinitely agent-visible Pending lookup, while an exact retry can safely resume the same invocation token.

**APPLIED relation:** successful Apply of package `fc282f3d-8dfd-4b4b-97f4-f04089350512` corrects the request-trigger and failed-Apply lifecycle findings inside still-open ChangeSet `10ce3e4a-4b24-42d4-9b63-b7fee8b8c655`; the ChangeSet remains open for cumulative ReviewDiff review.

### LOG-RPKG-053 — Do not re-fan chat-context agents on unchanged long-poll timeout

**Type:** REVIEWDIFF CORRECTION / EVENT-DRIVEN LOOKUP RETRY / EXTENSION PATCH / APPLIED TARGET  
**Updates:** `LOG-RPKG-050`, `LOG-RPKG-052`  
**ChangeSet:** `10ce3e4a-4b24-42d4-9b63-b7fee8b8c655`  
**ChangeSet Label:** `Planning Helper / RPKG — invocation-scoped chatContextToken binding`  
**Package:** `b1e51dbe-2380-47f4-90f8-15296f79b5f7`

**ReviewDiff finding / selected correction:**
- the request-driven `/v1/chat-context/wait` channel was bounded correctly, but extension background treated every 20-second timeout response as a fresh lookup event even when Java returned the same revision. An unresolved token could therefore re-fan to every live ChatGPT agent periodically, contradicting the selected event-driven retry semantics;
- keep the bounded long-poll for service-worker-friendly wake-up/reconnect behavior, but compare each response revision with the previously observed revision. An unchanged revision is timeout/keepalive only: renew the wait without replacing the remembered snapshot and without agent fan-out. A changed revision still refreshes the authoritative snapshot and fans out immediately; tab create/update remains an explicit retry trigger for remembered pending tokens;
- bump the unpacked extension to `0.4.2` while retaining bridge protocol `5`, and add source regression proof that the same-revision branch continues the wait before `resolveContextLookups` can run.

**Implementation / proof:**
- extension background stores the previous wait revision, updates the observed revision, and immediately continues the loop when the response revision is unchanged; only a revision change refreshes the authoritative pending snapshot and calls the remembered-token retry path;
- automated verification after the correction: Core tests `67/67`, ChatBridge tests `59/59`, DOM regression PASS, Windows launcher tests `5/5`, and `node --check` for `background.js` PASS.

**Target-State Result:** pending `chatContextToken` lookup is request-driven rather than periodic agent polling. Java revision changes and relevant tab lifecycle events are the retry triggers; a bounded `/v1/chat-context/wait` timeout by itself causes no `OBS_CHAT_CONTEXT_LOOKUP` fan-out. Apply/binding/delivery cutoff, `ApplyFailed`, token carry-forward, notification and External Interaction semantics are unchanged.

**APPLIED relation:** successful Apply of package `b1e51dbe-2380-47f4-90f8-15296f79b5f7` corrects the remaining ReviewDiff event-driven lookup finding inside still-open ChangeSet `10ce3e4a-4b24-42d4-9b63-b7fee8b8c655`; the ChangeSet remains open for cumulative ReviewDiff review.

### LOG-RPKG-054 — Make chatContextToken direct bind/rebind authority on resolution

**Type:** USER CLARIFICATION / BINDING AUTHORITY CORRECTION / NEW CHANGESET / APPLIED TARGET  
**Supersedes Current Meaning From:** `LOG-RPKG-050`–`LOG-RPKG-053` only where they intentionally prevented token-driven rebind or coupled unresolved token lifetime to repository Apply failure  
**ChangeSet:** `9baa3cc4-1d24-4613-b074-83e98496fa3e`  
**ChangeSet Label:** `Replacement Package App — chatContextToken direct bind/rebind authority`  
**Package:** `84a3ccd8-d9bf-4881-a228-e59c006e612f`

**User clarification / selected meaning:**
- the previously accepted invocation-token implementation treated a resolved token as safe destination discovery only: it could bind missing work or confirm the same binding, but a different existing binding became `DifferentBinding` and required some later explicit rebind path. That is not the intended meaning of the Helper action labelled `Bind`;
- `chatContextToken` now means explicit **bind/rebind authority**. The user already grants that authority by choosing `Bind + Insert` / `Bind + Copy` / `Bind + Full`; successful unique resolution must immediately make the captured conversation the persisted Review chat for the token's ChangeSet. Missing binding binds, same binding confirms/refreshes, different binding rebinds with no second prompt;
- token binding truth is independent of repository Apply truth. Authorized Execute still starts lookup, but repository Apply does not wait for it and repository failure does not cancel/suspend the token request or roll back a resolved bind/rebind. The successful-Apply/current-ReviewDiff point remains only a delivery cutoff: if token binding is already resolved, queue that ReviewDiff to the bound/rebound destination; if lookup is Pending/Conflict, skip only that Apply's automatic ReviewDiff delivery. Late resolution still binds/rebinds for future delivery and never retro-sends the skipped ReviewDiff;
- legacy `chatTabTitle` and manual binding keep their existing safety/confirmation semantics. Token authority is intentionally stronger because it comes only from the explicit invocation-side-effect action, not from inferred title metadata;
- when token rebind changes destination, safely cancellable older `Pending`/`Claimed` Review tasks are cancelled. An already `Preparing` / `SendArmed` / `SendClicked` interaction keeps its frozen original destination and is not rewritten by the new binding; delivery status therefore reports the task's frozen conversation rather than falsely projecting the new persisted binding onto old in-flight work;
- one token reported for more than one conversation remains a capture conflict and never guesses. Token carry-forward to a different package/ChangeSet remains rejected. The existing request-driven `/v1/chat-context/wait` transport, protocol `5`, no-timeout-refan behavior and extension runtime remain unchanged.

**Implementation / proof:**
- `ChatBridgeService.acceptContextLookupResult(...)` applies the persisted bind/rebind immediately on unique resolution and emits `BoundFromToken` / `ReboundFromToken` or late equivalents; `DifferentBinding` and `ApplyFailed` token states are removed from current behavior;
- `Core` no longer suspends token lookup when repository Apply fails; the Apply path only uses `bindContextAtReviewCutoff(...)` to decide whether this exact successful Apply ReviewDiff can be queued;
- token rebind bypasses the legacy/manual unsafe-rebind gate because it must update the future persisted destination at resolution, while existing externally prepared interactions retain their own frozen destination. `deliveryStatus(...)` reports that task destination truthfully;
- Swing token notifications distinguish `Review chat bound`, `Review chat rebound`, skipped-current-delivery and capture-conflict outcomes without folding them into repository Apply truth;
- Core/bridge regression covers resolved-before-cutoff rebind A→B, failed-Apply lookup continuing to bind, immediate token rebind while an older delivery is already Preparing, frozen old-task destination, request-channel wake/conflict and no retro-send behavior. Shared protocol, RPKG Scenario/Slice/data/acceptance docs and Planning Helper Bind semantics are synchronized; verification passes Core `68/68`, ChatBridge `60/60`, DOM turn-boundary regression PASS, Windows launcher `5/5`, plus extension background/content JavaScript syntax checks.

**Target-State Result:** `Bind + ...` is semantically literal. Its invocation-scoped token is one-time explicit authority to make that captured conversation the ChangeSet Review-chat destination as soon as the bridge resolves it, including replacing another persisted destination. Repository Apply success/failure is a separate axis. Review delivery for a successful Apply still obeys the resolution cutoff and never retro-sends a skipped ReviewDiff.

**APPLIED relation:** successful Apply of package `84a3ccd8-d9bf-4881-a228-e59c006e612f` establishes this direct token bind/rebind contract as the current state of new ChangeSet `9baa3cc4-1d24-4613-b074-83e98496fa3e`. The earlier token-binding ChangeSet `10ce3e4a-4b24-42d4-9b63-b7fee8b8c655` was already accepted APPROVABLE and is not reused.

### LOG-RPKG-055 — Restore Review delivery after typed Apply receipt handoff

**Type:** REVIEWDIFF CORRECTION / TRANSITIONAL APPLY HANDOFF / SL-RPKG-01/06 / APPLIED TARGET  
**ChangeSet:** `00cafbec-f66f-4854-ad6a-8e25768de3b3`  
**ChangeSet Label:** `Replacement Package App - typed Apply result clipboard receipt`  
**Package:** `72b2ade2-0273-469a-98e9-a3f03d73fe92`

**ReviewDiff finding / selected correction:**
- the typed `OBS-APPLY-RESULT/1` work intentionally changed successful Apply handoff ordering so the technical receipt is copied first and canonical ReviewDiff is published afterward; with `Clipboard`/`Both` this restores ReviewDiff as the final clipboard content, while failed/uncertain Apply keeps the typed receipt;
- that refactor accidentally removed the existing successful-Apply Review-chat cutoff/queue mechanics: token-bearing Apply no longer called `bindContextAtReviewCutoff(...)`, and eligible bound ReviewDiff was no longer passed to `enqueueReviewIfBound(...)`;
- it also removed the existing `Refresh Review` auto-queue for an already bound ChangeSet, contradicting current Scenario/bridge behavior and existing regression proof;
- restore only those delivery mechanics. Keep the new receipt → ReviewDiff clipboard ordering, stable typed failure/uncertain receipts, `RepoDiffFile`/`Both` behavior, package protocol, Builder boundary and the wider Git-backed migration unchanged;
- synchronize `APPLY-RESULT.md`: Refresh does not republish clipboard/repo-file handoff automatically, but a refreshed ReviewDiff still queues to the persisted Review chat when bound.

**Proof target:**
- existing Core regression covers token pending-at-cutoff skip/no retro-send, resolved-before-cutoff queue, token rebind-before-cutoff and ordinary bound Apply delivery;
- existing ChatBridge regression requires `Refresh Review` to auto-queue only after the ChangeSet is bound;
- ApplyReceipt regression continues to prove successful receipt formatting/clipboard behavior and failed/uncertain receipt semantics.

**Target-State Result:** successful Apply preserves both transitional handoff needs at once: typed receipt is established first, canonical ReviewDiff remains the final clipboard content for `Clipboard`/`Both`, and eligible Review-chat delivery still occurs through the existing cutoff/binding queue. `Refresh Review` again queues the refreshed artifact for a bound Review chat without changing clipboard/repo-file handling.

**APPLIED relation:** successful Apply of package `72b2ade2-0273-469a-98e9-a3f03d73fe92` corrects the accidentally removed Review delivery mechanics inside still-open ChangeSet `00cafbec-f66f-4854-ad6a-8e25768de3b3`; the ChangeSet remains open for cumulative ReviewDiff review.


### LOG-RPKG-056 — Start one Git-backed ChangeSet workspace slice

**Type:** TARGET MIGRATION / SL-RPKG-11 START CHANGESET WORKSPACE / NEW CHANGESET / APPLIED TARGET  
**ChangeSet:** `fd338fb5-2f18-48a9-a300-fdd0fbf1eb57`  
**ChangeSet Label:** `Replacement Package App - Git-backed ChangeSet workspace`  
**Package:** `94d1730a-dd1d-4f8d-bcc0-c4c2ec8c1762`

**Selected migration step:**
- after accepting the typed-Apply-receipt ChangeSet as APPROVABLE, start a new ChangeSet and migrate only one independently useful capability instead of mixing the whole Git-backed redesign into one package;
- implement `SL-RPKG-11 Start ChangeSet Workspace` first: selected Repository Target + new exact `changeSetId` + stable label + local target branch resolve to exact `C0`, deterministic `changeset/<changeSetId>` and an isolated app-owned worktree;
- persist the new workspace facts on ChangeSet: `targetBranch`, `branch`, `worktree`, `baseCommit`, `publishedTip`, and execution `Ready`, while retaining legacy ChangeSet fields for still-unmigrated work;
- do not acquire Path Ownership for this workspace. Isolation is the Git worktree/branch; legacy Path Ownership remains unchanged for legacy ChangeSets until their slices migrate.

**Idempotency / recovery boundary:**
- before the first branch/worktree mutation, persist an exact workspace journal under app state with repository target/identity, target branch, deterministic branch/worktree and pinned `baseCommit`;
- an ordinary repeat of an already persisted `Ready` workspace verifies same Git common repository, expected branch, exact HEAD/branch tip and clean worktree, then returns already satisfied;
- if a crash leaves journal-owned partial Git state, retry may reconcile only that exact journal intent; a deterministic branch/worktree collision without the durable journal fails closed instead of being adopted;
- movement of the target branch after successful creation does not rewrite the ChangeSet's pinned `baseCommit/publishedTip`.

**Transitional safety boundary:**
- expose **Start workspace** as a Swing action and show `Active · Ready @ <tip>` in ChangeSet state;
- do not migrate `SL-RPKG-01` Apply, `SL-RPKG-02` Current Change, Commit/Publish, Issue/PR, ReviewDecision or Finalize in this package;
- legacy Apply and legacy owned-path Refresh Review explicitly reject a Git-backed workspace ChangeSet, preventing accidental mutation or projection through the Repository Target main workspace before those slices migrate;
- keep package protocol, Builder, existing legacy ChangeSets and their Apply/Finalize behavior unchanged.

**Implementation / proof:**
- `Core` owns workspace creation/reconciliation and ChangeSet schema extension; `StateStore` owns deterministic worktree/journal paths; `MainWindow` exposes the single user action; existing source contracts are updated without adding a new test runner;
- new Core regression proves exact isolated Ready creation, repeat/idempotency after target movement, branch-only crash recovery from durable journal, refusal of unjournaled collision, and fail-closed legacy Apply/Review for the new workspace;
- verification on the candidate: shared `PackageStateApplierTests` PASS, `CoreTests` `72/72`, `ApplyReceiptTests` PASS, `ChatBridgeTests` `60/60`, ChatGPT adapter DOM regression PASS, Windows launcher tests `5/5`.

**Target-State Result:** the App now has one explicit Git-backed workspace capability: a new ChangeSet can be durably established as `Active · Ready(C0)` on `changeset/<id>` in its own exact worktree without changing the Repository Target working tree. The rest of the execution pipeline remains deliberately legacy and fenced from this workspace until the next slice migration.

**APPLIED relation:** successful Apply of package `94d1730a-dd1d-4f8d-bcc0-c4c2ec8c1762` establishes this first App-first Git-backed migration slice as new ChangeSet `fd338fb5-2f18-48a9-a300-fdd0fbf1eb57`. Any correction selected from its ReviewDiff while still open keeps this ChangeSet identity; work after accepted APPROVABLE review starts another new ChangeSet.

### LOG-RPKG-057 — Recover journal-owned partial worktree creation

**Type:** REVIEWDIFF CORRECTION / SL-RPKG-11 START CHANGESET WORKSPACE / RECOVERY HARDENING / APPLIED TARGET  
**ChangeSet:** `fd338fb5-2f18-48a9-a300-fdd0fbf1eb57`  
**ChangeSet Label:** `Replacement Package App - Git-backed ChangeSet workspace`  
**Package:** `175b2932-c0d0-42ff-9045-0a65ee6e8c12`

**ReviewDiff finding / selected correction:**
- the first SL-RPKG-11 package durably journaled workspace intent before Git mutation and recovered the branch-only crash state, but `reconcileWorkspace(...)` treated any existing deterministic worktree path as already complete and immediately required `verifyReadyWorkspace(...)`;
- a crash or kill inside `git worktree add` can therefore leave the durable journal plus an invalid/partial deterministic directory or stale exact worktree registration, making retry fail permanently despite the journal still proving the intended branch/path/base;
- harden only this recovery boundary. Do not widen the slice into Apply/Commit/Publish, Issue/PR, Current Change or Finalize migration.

**Selected recovery semantics:**
- if the deterministic path is already a valid Git worktree, keep the existing strict Ready verification: exact common repository, exact branch/base HEAD and clean state; mismatch or dirt still fails closed;
- if the journal-owned path exists but is not a usable Git worktree, first require any Git worktree registration for that exact path to match the journal's exact branch and base commit;
- preserve the entire invalid partial directory under deterministic app-state `workspace-recovery/<changeSetId>` instead of deleting unknown bytes, then clear only the exact matching stale worktree registration and recreate the deterministic worktree from the journal;
- if the deterministic path and its preserved recovery path both already exist, or a registration points to another branch/head, fail closed rather than guessing ownership;
- if the path is missing but an exact stale registration remains, clear only that matching registration and continue normal branch/worktree reconciliation.

**Proof target:**
- existing workspace regressions continue to prove exact Ready creation, target-movement idempotency, branch-only journal recovery, unjournaled collision refusal and legacy Apply/Review fencing;
- new regression creates a non-empty invalid journal-owned worktree with a stale exact Git registration, proves its bytes are preserved in `workspace-recovery/<changeSetId>`, proves the deterministic worktree is recreated clean on the exact branch/base, and proves the journal is cleared only after persisted `Ready`;
- candidate verification: shared `PackageStateApplierTests` PASS, `CoreTests` `73/73`, `ApplyReceiptTests` PASS, `ChatBridgeTests` `60/60`, ChatGPT adapter DOM regression PASS, Windows launcher tests `5/5`.

**Target-State Result:** `SL-RPKG-11 Start ChangeSet Workspace` now has retry semantics for the material crash window inside worktree creation, not only for branch-only partial state. Recovery uses the durable journal as authority, preserves invalid partial bytes instead of deleting them, clears only exact matching stale registration, and still fails closed on ambiguous/dirty/diverged workspace state.

**APPLIED relation:** successful Apply of package `175b2932-c0d0-42ff-9045-0a65ee6e8c12` corrects the partial-worktree recovery finding inside still-open ChangeSet `fd338fb5-2f18-48a9-a300-fdd0fbf1eb57`; the ChangeSet remains open for cumulative ReviewDiff review.

### LOG-RPKG-058 — Preserve successive partial workspace recovery attempts

**Type:** REVIEWDIFF CORRECTION / SL-RPKG-11 START CHANGESET WORKSPACE / IDEMPOTENT RECOVERY / APPLIED TARGET  
**ChangeSet:** `fd338fb5-2f18-48a9-a300-fdd0fbf1eb57`  
**ChangeSet Label:** `Replacement Package App - Git-backed ChangeSet workspace`  
**Package:** `d8500326-c7f9-4e07-8fd5-f665936570fb`

**ReviewDiff finding / selected correction:**
- the first partial-worktree recovery correction preserved one invalid journal-owned directory at fixed `workspace-recovery/<changeSetId>`, but then failed closed whenever both that preserved path and a later invalid deterministic worktree existed;
- a second crash inside the same retried `git worktree add` could therefore strand an otherwise still-authoritative workspace journal even when the later worktree registration again matched the exact durable branch/base intent;
- keep the same SL-RPKG-11 boundary and make preservation multi-attempt rather than widening into Apply/Commit/Publish or other target slices.

**Selected correction:**
- treat `workspace-recovery/<changeSetId>` as an append-only recovery root and preserve each invalid journal-owned deterministic worktree in the next unused `partial-NNNNNN` child;
- never overwrite or delete an earlier preserved partial attempt; a non-directory recovery root still fails closed;
- before every preservation/registration cleanup, retain the existing exact registration check against the journal branch and base commit; divergent registration remains `STATE_DIVERGED`;
- a repeated crash may therefore leave another partial deterministic worktree and the same journal, and the next retry can preserve that new partial independently and continue exact reconciliation.

**Proof target:**
- existing partial recovery regression now proves the first preserved directory is `partial-000001`;
- new regression starts with an earlier preserved `partial-000001`, supplies another invalid deterministic worktree with exact stale registration, and proves retry preserves it as `partial-000002`, retains the first artifact unchanged, recreates a clean exact worktree and reaches persisted `Ready`;
- candidate verification must keep the existing SL-RPKG-11, Apply receipt, bridge/DOM, launcher and shared mutation regressions green.

**Target-State Result:** SL-RPKG-11 recovery remains fail-closed on ambiguous/diverged ownership but is now idempotent across repeated crashes in the same worktree-creation boundary: every journal-owned invalid partial attempt is preserved separately while the durable journal continues to authorize exact branch/worktree reconciliation.

**APPLIED relation:** successful Apply of package `d8500326-c7f9-4e07-8fd5-f665936570fb` corrects the repeated-crash recovery finding inside still-open ChangeSet `fd338fb5-2f18-48a9-a300-fdd0fbf1eb57`; the ChangeSet remains open for cumulative ReviewDiff review.

### LOG-RPKG-059 — Apply package files inside Git-backed ChangeSet worktree

**Type:** TARGET MIGRATION / SL-RPKG-01 APPLY REPLACEMENT WORK / GIT-BACKED APPLY FILES / NEW CHANGESET / APPLIED TARGET  
**ChangeSet:** `e628a2c4-9e7a-403a-add3-847460b5d383`  
**ChangeSet Label:** `Replacement Package App - Git-backed Apply package files`  
**Package:** `4920173f-c62d-42e2-9788-fd39259c332c`

**Selected migration step:**
- after accepting SL-RPKG-11 as APPROVABLE, start a new ChangeSet and migrate the next narrow execution boundary instead of combining Apply/Commit/Publish/Review/Finalize at once;
- extend `SL-RPKG-01` only through **Apply package files** for an already established Git-backed ChangeSet workspace;
- from `Ready(C0)`, apply package operations only inside the persisted isolated worktree and persist `AppliedUncommitted(P1)` while branch HEAD and `publishedTip` remain `C0`;
- do not acquire legacy Path Ownership and do not mutate the Repository Target main workspace.

**Durable Apply / retry semantics:**
- before first file mutation, persist an Apply journal with exact `changeSetId`, `packageId`, archive SHA-256, repository identity, branch/worktree, `baseHead` and per-operation exact actual prior existence/bytes plus exact intended result existence/bytes;
- same-package retry in `AppliedUncommitted` proves the worktree still equals the intended journal result and returns already satisfied without a second mutation;
- if a crash leaves state at `Ready` while all package paths already equal intended bytes, retry promotes the ChangeSet to `AppliedUncommitted` without reapplying;
- if crash state is a mixture of exact durable prior/intended package-path states, restore exact prior bytes and apply once again; if a journal-owned package path contains other partial-write bytes, preserve those current bytes as app-state recovery evidence before exact prior restoration and retry; unrelated dirty paths still fail closed;
- a different package cannot advance the same ChangeSet while one package is still `AppliedUncommitted`; the journal remains available for later Commit/Abort migration.

**Transitional boundary:**
- Git-backed SL-RPKG-02 Current Change is not migrated in this package, so successful Git-backed Apply has no legacy owned-path ReviewDiff yet and the typed Apply receipt remains the final clipboard handoff;
- legacy ChangeSets keep their existing Apply → cumulative ReviewDiff behavior;
- Git-backed legacy Refresh Review and Finalize remain fail-closed; Commit/Publish, PR, ReviewDecision and integration Finalize are later migrations;
- package protocol and Builder remain unchanged.

**Proof target:**
- Core regression proves worktree-only add/replace mutation, unchanged Repository Target main workspace, unchanged branch HEAD/`publishedTip`, no Path Ownership, persisted Apply journal and `AppliedUncommitted`;
- regression proves same-package idempotency, different-package blocking, fully-intended crash recovery, mixed prior/intended restore+reapply, preserved unknown partial-write recovery, unrelated-dirt refusal and legacy Review/Finalize fencing;
- existing legacy Apply/Review/Finalize, SL-RPKG-11 workspace recovery, receipt, bridge/DOM, launcher and shared file-mutation regressions remain required.

**Target-State Result:** the App now realizes the first execution transition after workspace creation: `Ready(C0) → AppliedUncommitted(P1)` for one exact replacement package inside the ChangeSet worktree, with durable exact file-state recovery and no main-workspace or Path Ownership fallback. Commit/Publish and Git-derived review remain intentionally pending.

**APPLIED relation:** successful Apply of package `4920173f-c62d-42e2-9788-fd39259c332c` establishes this SL-RPKG-01 Git-backed Apply-files migration as new ChangeSet `e628a2c4-9e7a-403a-add3-847460b5d383`. Corrections selected from its ReviewDiff while still open keep this ChangeSet identity; work after accepted APPROVABLE review starts another new ChangeSet.

### LOG-RPKG-060 — Preserve exact Unicode package-path identity during Git-backed Apply

**Type:** REVIEWDIFF CORRECTION / SL-RPKG-01 APPLY REPLACEMENT WORK / GIT PATH IDENTITY / APPLIED TARGET  
**ChangeSet:** `e628a2c4-9e7a-403a-add3-847460b5d383`  
**ChangeSet Label:** `Replacement Package App - Git-backed Apply package files`  
**Package:** `d00c3e94-f6b5-4af0-9107-5d65dae244ed`

**ReviewDiff finding / selected correction:**
- the first Git-backed Apply-files migration compared raw journal package paths directly with ordinary line-oriented `git diff --name-only` / `git ls-files --others` output;
- Git's default human-readable path output may quote and octal-escape non-ASCII repository paths, so a correct Unicode package path could be misclassified as unrelated dirt after mutation and force rollback;
- keep the same SL-RPKG-01 `Ready → AppliedUncommitted` boundary and correct only dirty-path identity acquisition. Do not widen into Commit/Publish, Git-derived Review or Finalize.

**Selected correction:**
- collect tracked and untracked dirty paths from Git using `-z` NUL-delimited byte output rather than quoted line output;
- decode each raw Git path as strict UTF-8 and compare that exact repository-relative string with the durable journal path;
- keep unrelated-path refusal, exact prior/intended journal recovery and all existing execution-state semantics unchanged.

**Proof target:**
- new Core regression applies one package that replaces `каталог/замена.txt` and adds `каталог/добавка.txt`, proving both Unicode paths reach `AppliedUncommitted` in the isolated worktree while the Repository Target main workspace stays unchanged;
- existing same-package idempotency, crash recovery, partial-write evidence, unrelated-dirt fencing, SL-RPKG-11, legacy Apply/Review/Finalize, receipt, bridge/DOM, launcher and shared mutation regressions remain required;
- candidate verification: shared `PackageStateApplierTests` PASS, `CoreTests` `80/80`, `ApplyReceiptTests` PASS, `ChatBridgeTests` `60/60`, ChatGPT adapter DOM regression PASS, Windows launcher tests `5/5`.

**Target-State Result:** Git-backed Apply dirty-path verification now compares package/journal paths against exact raw Git path identities instead of presentation-quoted names, so supported Unicode repository paths participate in the same worktree-only and recovery invariants as ASCII paths.

**APPLIED relation:** successful Apply of package `d00c3e94-f6b5-4af0-9107-5d65dae244ed` corrects the Unicode dirty-path identity finding inside still-open ChangeSet `e628a2c4-9e7a-403a-add3-847460b5d383`; the ChangeSet remains open for cumulative ReviewDiff review.


### LOG-RPKG-061 — Commit applied package inside Git-backed ChangeSet worktree

**Type:** TARGET MIGRATION / SL-RPKG-01 APPLY REPLACEMENT WORK / GIT-BACKED COMMIT / NEW CHANGESET / APPLIED TARGET  
**ChangeSet:** `a871a837-3d1a-4b61-b83a-4f1cc30816ec`  
**ChangeSet Label:** `Replacement Package App - Git-backed Commit applied package`  
**Package:** `efcb39f1-fff1-4584-825e-ac69a42bf02b`

**Selected migration step:**
- the prior Git-backed Apply-files ChangeSet `e628a2c4-9e7a-403a-add3-847460b5d383` was accepted APPROVABLE, so this continuation starts a new producer ChangeSet while extending the same target `SL-RPKG-01` rather than inventing a separate Commit slice;
- add only `commit-applied-package` semantics after the already migrated `Ready(C0) → AppliedUncommitted(P1)` boundary; Publish, Git-derived Current Change, PR/ReviewDecision and integration Finalize remain later extensions;
- represent `CommittedUnpublished(P1,C1)` with existing exact fields: `publishedTip=C0`, `lastPackageId=P1`, `commitSha=C1`, `executionState=CommittedUnpublished`, avoiding a duplicate persisted previous-tip field.

**Commit semantics / recovery:**
- from `AppliedUncommitted`, re-prove exact Repository Target/common repository, deterministic branch/worktree, `HEAD/branch=C0`, durable Apply journal identity and exact intended package bytes; staged paths outside the journal fail closed;
- stage only durable package paths using NUL-delimited pathspec input, forcing only those explicit package paths so an intentionally packaged ignored add can still become tracked, and create one local commit with exact `Package-Id: P1` and `ChangeSet-Id: X` trailers; commit signing and repository hooks are disabled for this application-owned deterministic commit boundary;
- leave `publishedTip=C0` after local commit and persist `CommittedUnpublished(P1,C1)` only after verifying exact branch/worktree tip, single parent `C0`, trailers, package-only changed paths, exact intended bytes and clean index/worktree;
- retry tolerates a journal-only staged index and re-stages exact package paths; if a crash already created `C1` before ledger persistence, recover only when the same exact proofs hold. A moved/foreign head is never adopted;
- repeated Commit and same-package Apply at proven `CommittedUnpublished` are already satisfied and do not create a second commit. The Apply journal remains available for the still-unmigrated Abort/Publish progression.

**UI / transitional boundary:**
- expose **Commit applied** next to the ChangeSet workspace action and show `CommittedUnpublished` as published-tip → local-commit state; the old free-form commit-message field is relabeled as legacy Finalize-only;
- successful Git-backed Commit still has no legacy ReviewDiff and does not publish a remote branch; legacy Review/Finalize remain fail-closed for the Git-backed ChangeSet.

**Proof target:**
- Core regression proves package-only commit, exact parent/trailers, unchanged Repository Target main HEAD/bytes, unchanged `publishedTip`, clean worktree and no Path Ownership;
- regressions prove an explicitly packaged ignored add is committed, journal-only staged retry, failed Git Commit leaves `AppliedUncommitted` and later retries without reapplying files, repeat Commit, same-package Apply after commit, exact crash recovery after Git commit before state persistence, and fail-closed refusal of a moved HEAD without exact package trailers;
- existing Apply journal/recovery/Unicode, SL-RPKG-11 workspace recovery, legacy Apply/Review/Finalize, receipt, bridge/DOM, launcher and shared mutation regressions remain required.
- candidate verification: shared `PackageStateApplierTests` PASS, `CoreTests` `87/87`, `ApplyReceiptTests` PASS, `ChatBridgeTests` `60/60`, ChatGPT adapter DOM regression PASS, Windows launcher tests `5/5`.

**Target-State Result:** the expanded SL-RPKG-01 now realizes `Ready(C0) → AppliedUncommitted(P1) → CommittedUnpublished(P1,C1)` as separate idempotent actions inside one isolated ChangeSet worktree. `C1` is locally authoritative for the committed package intent but is not yet the published ChangeSet tip; Publish remains the next modular extension.

**APPLIED relation:** successful Apply of package `efcb39f1-fff1-4584-825e-ac69a42bf02b` establishes this Git-backed Commit extension as new ChangeSet `a871a837-3d1a-4b61-b83a-4f1cc30816ec`. Corrections selected from its ReviewDiff while still open keep this ChangeSet identity; work after accepted APPROVABLE review starts another new ChangeSet.


### LOG-RPKG-062 — Isolate authoritative Git trailers from ChangeSet label text

**Type:** REVIEWDIFF CORRECTION / SL-RPKG-01 APPLY REPLACEMENT WORK / GIT-BACKED COMMIT / TRAILER AUTHORITY / APPLIED TARGET  
**ChangeSet:** `a871a837-3d1a-4b61-b83a-4f1cc30816ec`  
**ChangeSet Label:** `Replacement Package App - Git-backed Commit applied package`  
**Package:** `ea696a49-4c17-4d1f-bcd4-a1ef64280742`

**ReviewDiff finding / selected correction:**
- the first Commit extension verified `Package-Id` / `ChangeSet-Id` by scanning every line of the complete commit message;
- because a valid ChangeSet label becomes the commit subject and labels are not prohibited from beginning with those strings, label/body text could be mistaken for authority trailers and make the application reject its own already-created `C1` on both the initial post-commit proof and recovery retry;
- keep the existing `AppliedUncommitted(P1) → CommittedUnpublished(P1,C1)` boundary and correct only commit-identity proof. Publish and later stages remain excluded.

**Selected correction:**
- parse only Git's canonical terminal trailer block with `git interpret-trailers --parse` and derive package/ChangeSet authority exclusively from that parsed block;
- require exactly one canonical `Package-Id: P1` and exactly one canonical `ChangeSet-Id: X`; trailer-like subject/body text is not identity authority;
- keep exact parent, branch/worktree tip, package-only changed paths, exact intended bytes, clean index/worktree, moved-head refusal and all existing Commit recovery semantics unchanged.

**Proof target:**
- new Core regression uses the valid ChangeSet label `Package-Id: unrelated label`, proves the label is preserved in the commit subject, proves the actual terminal authority trailers still establish `C1`, and proves repeat Commit returns the same already-satisfied commit;
- existing Commit package-only staging/ignored-add, staged-index retry, failed-Commit retry, post-commit pre-ledger recovery, foreign moved-head refusal, Apply journal/recovery/Unicode and all legacy/bridge/launcher regressions remain required;
- candidate verification: shared `PackageStateApplierTests` PASS, `CoreTests` `88/88`, `ApplyReceiptTests` PASS, `ChatBridgeTests` `60/60`, ChatGPT adapter DOM regression PASS, Windows launcher tests `5/5`.

**Target-State Result:** Git-backed Commit identity is now proven only by Git's authoritative terminal trailer block, so arbitrary valid ChangeSet label/body text cannot poison commit verification or make an application-created exact package commit permanently unrecoverable.

**APPLIED relation:** successful Apply of package `ea696a49-4c17-4d1f-bcd4-a1ef64280742` corrects trailer authority inside still-open ChangeSet `a871a837-3d1a-4b61-b83a-4f1cc30816ec`; the ChangeSet remains open for cumulative ReviewDiff review.


### LOG-RPKG-063 — Publish exact Git-backed package commit and reconcile remote outcome

**Type:** TARGET MIGRATION / SL-RPKG-01 APPLY REPLACEMENT WORK / GIT-BACKED PUBLISH / NEW CHANGESET / APPLIED TARGET  
**ChangeSet:** `99afb73e-00f0-411e-8c01-ceb23493267f`  
**ChangeSet Label:** `Replacement Package App - Git-backed Publish applied commit`  
**Package:** `ed771c4a-414b-4ed1-9364-88fb1b3e80a1`

**Selected migration step:**
- the prior Git-backed Commit ChangeSet `a871a837-3d1a-4b61-b83a-4f1cc30816ec` was accepted APPROVABLE, so this continuation starts a new producer ChangeSet while extending the same target `SL-RPKG-01` rather than inventing a separate Publish slice;
- add only `publish-applied-commit(X,C1)` after the established `Ready(C0) → AppliedUncommitted(P1) → CommittedUnpublished(P1,C1)` actions; Git-derived Current Change, PR/ReviewDecision and integration Finalize remain later migration work;
- successful Publish returns the same ChangeSet execution pipeline to `Ready(C1)` and advances `publishedTip` only after exact remote proof.

**Publish semantics / recovery:**
- from `CommittedUnpublished(P1,C1)`, re-prove Repository Target/common repository, durable Apply journal identity, exact local `C1`, parent=`publishedTip=C0`, authoritative package/ChangeSet trailers, package-only changed paths, intended bytes and clean worktree/index before remote mutation;
- inspect only exact remote `refs/heads/changeset/<id>`: absence or exact previous `publishedTip` permits publication; exact `C1` is already satisfied; any other observed tip returns `REMOTE_BRANCH_DIVERGED` without overwrite;
- publish exact `C1` with an explicit commit refspec and exact `--force-with-lease` expectation, then query the remote branch again. Only observed `remote=C1` persists `Ready(C1)` / `publishedTip=C1`;
- if push fails and the remote is proven absent/unchanged at the previous tip, remain `CommittedUnpublished` with `PUBLISH_FAILED`; if a push was attempted but post-push remote truth cannot be observed, persist `PublicationUncertain` with `PUBLICATION_UNCERTAIN`;
- retry from `PublicationUncertain` first inspects remote and never blind-resends: `remote=C1` recovers already-satisfied `Ready(C1)`, absent/previous tip may retry the exact leased push, and another tip fails `REMOTE_BRANCH_DIVERGED`;
- an explicit `remote.origin.pushurl`, when configured, must resolve to the same logical repository identity as the registered origin before Publish can use it.

**Latest package boundary / continuation:**
- retain the completed Apply journal after Publish so it still proves the latest package boundary `C0 → C1` for the future Git-derived Current Change migration;
- when P2 starts from `Ready(C1)`, the old journal is not mistaken for an interrupted P2: first prove it exactly describes the published `C1`, then overwrite it with the new P2 journal at `baseHead=C1`;
- repeated Publish from persisted `Ready(C1)` is proof-only and succeeds only while the exact remote branch still equals recorded `publishedTip`; remote movement after proven publication is divergence, not an automatic repair push.

**UI / transitional boundary:**
- expose **Publish** beside Start workspace / Commit applied; `CommittedUnpublished` invites Publish and `PublicationUncertain` invites Publish reconciliation;
- after proven publication the selected ChangeSet displays ordinary `Ready @ C1`, making the next package stage available;
- Git-backed Current Change/ReviewDecision/Finalize remain fail-closed and no legacy ReviewDiff is generated by Apply/Commit/Publish.

**Proof target:**
- Core regression proves missing-remote publication to exact C1, unchanged Repository Target main HEAD, repeated Publish already-satisfied semantics, retained journal, then a second package P2 that replaces the completed P1 journal and publishes exact C2;
- regressions prove crash-after-push/pre-ledger recovery from remote C1, a push transport failure whose unchanged remote is proven and later retried, `PublicationUncertain` when remote observation disappears after the push boundary followed by reconcile-before-retry, and refusal to overwrite an unexpected remote ChangeSet tip;
- existing Apply journal/recovery/Unicode, Commit package-only/trailer/recovery, SL-RPKG-11 workspace recovery, legacy Apply/Review/Finalize, receipt, bridge/DOM, launcher and shared mutation regressions remain required;
- candidate verification: shared `PackageStateApplierTests` PASS, `CoreTests` `93/93`, `ApplyReceiptTests` PASS, `ChatBridgeTests` `60/60`, ChatGPT adapter DOM regression PASS, Windows launcher tests `5/5`.

**Target-State Result:** expanded SL-RPKG-01 now realizes the complete package revision progression `Ready(C0) → AppliedUncommitted(P1) → CommittedUnpublished(P1,C1) → Ready(C1)` with an explicit `PublicationUncertain` recovery state. Publication authority is the exact observed remote ChangeSet branch tip, never the push command exit alone.

**APPLIED relation:** successful Apply of package `ed771c4a-414b-4ed1-9364-88fb1b3e80a1` establishes this Git-backed Publish extension as new ChangeSet `99afb73e-00f0-411e-8c01-ceb23493267f`. Corrections selected from its ReviewDiff while still open keep this ChangeSet identity; work after accepted APPROVABLE review starts another new ChangeSet.


### LOG-RPKG-064 — Prove effective Git remote identity before Publish

**Type:** REVIEWDIFF CORRECTION / SL-RPKG-01 APPLY REPLACEMENT WORK / GIT-BACKED PUBLISH / REMOTE IDENTITY / APPLIED TARGET  
**ChangeSet:** `99afb73e-00f0-411e-8c01-ceb23493267f`  
**ChangeSet Label:** `Replacement Package App - Git-backed Publish applied commit`  
**Package:** `92b8f704-2dd5-4fa3-b400-da8f8659ad74`

**ReviewDiff finding / selected correction:**
- the first Publish extension checked the persisted/raw origin identity and raw `remote.origin.pushurl`, but Git may rewrite the URL actually used by `ls-remote` / `push` through `url.*.insteadOf` or `url.*.pushInsteadOf`;
- therefore a raw GitHub-looking origin could still resolve to another effective destination and cross the remote side-effect boundary outside the registered repository identity;
- keep the existing `CommittedUnpublished(P1,C1) → Ready(C1)` Publish state machine and correct only its remote-identity preflight. Git-derived Current Change, PR/ReviewDecision and integration Finalize remain excluded.

**Selected correction:**
- before any remote observation or push, resolve Git's effective origin fetch URLs with `git remote get-url --all origin` and effective push URLs with `git remote get-url --push --all origin`;
- require every resolved destination to map to the persisted logical `repositoryIdentity`; an unsupported, empty or rewritten destination that cannot prove that identity returns `REPOSITORY_MISMATCH` before `ls-remote` / push;
- keep exact local-commit proof, remote-tip state classification, force-with-lease, `PublicationUncertain`, reconcile-before-retry and completed-journal rollover unchanged.

**Proof target:**
- Publish transport tests no longer rely on production `insteadOf` identity bypass: they use a GitHub-looking SSH origin plus a local fake-SSH transport, so Git's effective URL still proves `github:example/testrepo` while network effects remain local;
- regressions prove `insteadOf` rewriting the effective fetch destination and `pushInsteadOf` rewriting only the effective push destination both fail with `REPOSITORY_MISMATCH` before either the registered test remote or a foreign remote is mutated;
- existing Publish success/repeat/P2 rollover, crash-before-ledger recovery, proven push failure, `PublicationUncertain`, divergent remote, Apply/Commit/workspace, legacy, receipt, bridge/DOM and launcher regressions remain required;
- candidate verification: shared `PackageStateApplierTests` PASS, `CoreTests` `95/95`, `ApplyReceiptTests` PASS, `ChatBridgeTests` `60/60`, ChatGPT adapter DOM regression PASS, Windows launcher tests `5/5`.

**Target-State Result:** Publish authority now includes the effective Git transport destination, not only raw remote configuration: URL rewriting cannot redirect exact ChangeSet publication outside the registered repository identity without failing closed before remote side effects.

**APPLIED relation:** successful Apply of package `92b8f704-2dd5-4fa3-b400-da8f8659ad74` corrects effective remote identity proof inside still-open ChangeSet `99afb73e-00f0-411e-8c01-ceb23493267f`; the ChangeSet remains open for cumulative ReviewDiff review.

### LOG-RPKG-065 — Compose one-command automatic Git-backed Apply Package

**Type:** TARGET MIGRATION / SL-RPKG-01 APPLY REPLACEMENT WORK + SL-RPKG-11 WORKSPACE COMPOSITION / NEW CHANGESET / APPLIED TARGET  
**ChangeSet:** `ab56b822-4191-4ac5-8bdf-cd61fa9cd33f`  
**ChangeSet Label:** `Replacement Package App - Automatic Apply Package composition`  
**Package:** `56fe83dc-a8bc-4d5f-9525-ff5d8e20b078`

**Selected migration step:**
- the prior Publish ChangeSet `99afb73e-00f0-411e-8c01-ceb23493267f` was accepted APPROVABLE, so this package starts a new producer ChangeSet;
- keep SL-RPKG-11 workspace creation and SL-RPKG-01 Apply / Commit / Publish as separate idempotent domain actions, but finish the ordinary user operation that composes those already-established actions;
- one pasted `OBS-ACTION/1` with explicit `targetBranch` is now sufficient for ordinary Git-backed package execution: existing package intake resolves the exact ZIP and Repository Target, package metadata supplies `changeSetId` / label / repository identity, missing workspace is ensured automatically, and the same call continues through Apply → Commit → Publish;
- Git-derived Current Change, PR/ReviewDecision and integration Finalize remain later migration work and are not pulled into this package.

**Automatic composition / compatibility semantics:**
- extend OBS-ACTION with compatibility-optional `targetBranch`; its presence opts into automatic Git-backed Apply Package and it is never inferred from the Repository Target's currently checked-out branch;
- after the existing Prepare/Authorize boundary and exact Repository Target resolution, a missing package ChangeSet invokes SL-RPKG-11 from package `changeSetId` / `changeSetLabel` plus explicit `targetBranch`; an existing Git-backed ChangeSet must prove the same target/label/target-branch identity;
- dispatch from persisted execution truth: `Ready` applies or proves the same published package, `AppliedUncommitted` resumes Commit, `CommittedUnpublished` resumes Publish, and `PublicationUncertain` reconciles Publish before any further package action; top-level success is returned only at a proven published `Ready` tip;
- failures after a successful internal boundary keep that established state, so repeating the same command resumes instead of restarting or requiring the user to press the next internal control;
- an existing legacy ChangeSet is never converted in place when `targetBranch` is supplied. Actions without `targetBranch` retain the legacy/manual compatibility path, allowing already-open legacy producer ChangeSets (including this migration package if applied by the pre-composition app) to continue safely;
- the separate Start workspace / Commit applied / Publish controls remain as diagnostic/recovery/migration surfaces, not ordinary required user steps.

**Protocol / handoff boundary:**
- update the shared producer/consumer protocol and package-producer command guidance so future **new independent target-mode** archives carry explicit `targetBranch`; a continuation of an already-existing legacy ChangeSet may omit it;
- the success `OBS-APPLY-RESULT/1` for automatic Git-backed Apply Package is emitted only after the composed operation reaches/proves published `Ready`; Commit/Publish failure returns the failure receipt while preserving the resumable execution state;
- fix the CLI `apply` compatibility output so Git-backed success no longer dereferences a null legacy ReviewDiff.

**Proof target:**
- Core regression proves one action automatically creates a workspace from explicit `targetBranch=main` while the Repository Target is checked out on another branch, mutates only the isolated worktree, commits/publishes exact C1 and leaves the current checkout untouched;
- regressions prove repeated one-command satisfaction, resume from `AppliedUncommitted`, `PublicationUncertain` reconcile-before-retry, legacy action compatibility without `targetBranch`, and fail-closed refusal to reinterpret an existing legacy ChangeSet;
- existing workspace crash recovery, Apply journal/recovery/Unicode, Commit package-only/trailer/recovery, Publish effective-remote/lease/reconciliation, legacy Apply/Review/Finalize, receipt, bridge/DOM, launcher and shared mutation regressions remain required;
- candidate verification target: shared `PackageStateApplierTests` PASS, `CoreTests` `101/101`, `ApplyReceiptTests` PASS, `ChatBridgeTests` `60/60`, ChatGPT adapter DOM regression PASS and Windows launcher tests `5/5`.

**Target-State Result:** ordinary target package execution no longer requires manual ChangeSet ID/label/branch entry or manual Start workspace → Apply → Commit → Publish sequencing. One exact command can establish/resume the same Git-backed package revision through a proven published `Ready` state while retaining the separate domain-action recovery boundaries.

**APPLIED relation:** successful Apply of package `56fe83dc-a8bc-4d5f-9525-ff5d8e20b078` establishes one-command automatic Apply Package composition as new ChangeSet `ab56b822-4191-4ac5-8bdf-cd61fa9cd33f`. Corrections selected from its ReviewDiff while this producer ChangeSet remains open keep the same ChangeSet identity; work after accepted APPROVABLE review starts another new ChangeSet.


### LOG-RPKG-066 — Migrate SL-RPKG-10 Git-backed Work Intent

**Type:** TARGET MIGRATION / SL-RPKG-10 MANAGE REPOSITORY WORK INTENT / NEW CHANGESET / APPLIED TARGET  
**ChangeSet:** `40ce50dd-c0d3-42ae-b6b7-9ea0e9b78f91`  
**ChangeSet Label:** `Replacement Package App - Git-backed Work Intent`  
**Package:** `8ff0a660-2678-4c4a-b4eb-62e2afe2c7a9`

**Selected migration step:**
- the automatic Apply Package composition ChangeSet `ab56b822-4191-4ac5-8bdf-cd61fa9cd33f` was accepted and finalized, so this package starts a new producer ChangeSet;
- implement target SL-RPKG-10 before extending to PR/Review/Finalize: one durable semantic GitHub Issue exists independently of Chat context and Git workspace execution;
- support two user entry modes over the same Work Intent ensure semantics: standalone Issue-only creation and automatic Work Intent → workspace → Apply → Commit → Publish composition.

**External OBS-ACTION command boundary:**
- make `action:` a typed external user-operation discriminator without turning every modular Core method into a command bus;
- current external routes are exactly `create-work-intent` and `apply-package`;
- `create-work-intent` resolves a standalone Work Intent JSON by filename + exact `changeSetId`, ensures the GitHub Issue, and stops without branch/worktree/package mutation;
- `apply-package` continues to use archive/package identity; when explicit `targetBranch` selects target mode it now requires `PACKAGE.json.workIntent`, ensures that Issue first, then invokes the already-migrated SL-11 + SL-01 composition;
- Start workspace, manual Apply, Commit applied, Publish, Review/Refresh, Finalize, Retry Push, Reopen and other recovery/diagnostic actions remain direct Swing/Core controls and are deliberately not OBS-ACTION values.

**Work Intent authority / recovery:**
- Work Intent schema 1 contains exact `changeSetId`, `repositoryIdentity`, Issue title, Goal, Why and non-empty Acceptance criteria;
- the GitHub Issue contains an App-managed block with exact machine marker `ChangeSet-Id: X`;
- persist `work-intents/<X>.json` with Issue number/URL, semantic fields and fingerprint; persist a durable create journal before the first Issue-create side effect;
- before create, enumerate repository Issues and match the exact marker: one match is adopted/verified, more than one fails closed; if create reports failure, reconcile by exact marker before another create is allowed, and preserve `WORK_INTENT_UNCERTAIN` when the side-effect truth cannot be inspected;
- existing managed content may be updated on the same Issue and must be read back exactly; no duplicate logical Issue is intentionally created for retry/correction;
- ChangeSet schema advances to 4 with `issueNumber` / `issueUrl`; standalone Work Intent can later attach to an existing ChangeSet, while a newly created SL-11 workspace inherits the persisted Issue reference.

**GitHub integration:**
- add `GitHubClient` as a GitHub-specific boundary separate from GitClient/shared exact mutation core;
- production transport is authenticated GitHub CLI `gh api`; missing CLI/authentication fails before automatic workspace or repository mutation;
- GitHub Issue behavior is injected behind a small interface for deterministic Core tests; future SL-RPKG-12 PR support can reuse the GitHub integration boundary without moving GitHub behavior into the shared mutation core.

**Protocol / producer:**
- extend schema-1 `PACKAGE.json` compatibly with optional `workIntent`; it becomes required whenever explicit `targetBranch` selects a new automatic target-mode Apply Package, while legacy/manual packages remain readable without it;
- future new independent target-mode replacement packages carry exact Work Intent semantic metadata plus explicit target branch;
- this SL-RPKG-10 migration archive itself is an explicit bootstrap exception: its OBS-ACTION omits `targetBranch` so the pre-SL10 installed App can apply it through the still-available legacy ReviewDiff/Finalize integration path. Target Git-backed integration Finalize is not migrated yet, so using target mode for this consumer-changing package would strand the accepted revision on `changeset/X` instead of integrating it into `main`;
- that bootstrap exception is transitional producer mechanics only. After this feature is installed, ordinary target-mode packages use `workIntent + targetBranch`;
- standalone `create-work-intent` uses its own small JSON file because it can exist before any replacement ZIP exists.

**Proof target:**
- Core regressions cover the exact two-route OBS-ACTION surface, standalone create/repeat without ChangeSet creation, lost-create-response reconciliation, duplicate-marker fail-closed behavior, automatic Work Intent-before-workspace composition and Issue reference propagation;
- all existing Git-backed workspace/Apply/Commit/Publish/recovery, legacy Apply/Review/Finalize, receipt, bridge/DOM, launcher and shared mutation regressions remain required;
- candidate automated target: `CoreTests` 106/106, `ApplyReceiptTests` PASS, `ChatBridgeTests` 60/60, Windows launcher 5/5 plus shared mutation and DOM suites PASS.

**Target-State Result:** SL-RPKG-10 is available independently and as the first stage of automatic Apply Package. The ordinary external command path can now establish durable semantic GitHub work before Git execution, while internal modular recovery actions remain buttons/Core APIs instead of proliferating OBS-ACTION command values.

**APPLIED relation:** successful Apply of package `8ff0a660-2678-4c4a-b4eb-62e2afe2c7a9` establishes Git-backed SL-RPKG-10 for ChangeSet `40ce50dd-c0d3-42ae-b6b7-9ea0e9b78f91`. Corrections selected while this producer ChangeSet remains open keep the same ChangeSet identity; work after accepted APPROVABLE review starts another new ChangeSet.

### LOG-RPKG-067 — Establish documentation evolution use cases and owners

**Type:** DOCUMENTATION ARCHITECTURE / EVOLUTION OPERATING MODEL / SAME OPEN CHANGESET / APPLIED TARGET  
**ChangeSet:** `40ce50dd-c0d3-42ae-b6b7-9ea0e9b78f91`  
**ChangeSet Label:** `Replacement Package App - Git-backed Work Intent`  
**Package:** `cd066c6f-28b2-45db-9b45-77eec0eb1dcf`

**Selected documentation step:**
- before rewriting current Scenario/Slice migration content, establish the minimal documentation form that will own that integration;
- add one documentation-use-case owner describing the actual maintenance workflows: keep current Scenario truth plus only still-unimplemented Migration Delta, propagate one Scenario Evolution Step into affected Slice `Evolution Steps`, centralize only genuinely shared Domain Object evolution, and use that trace to make evolution-aware architecture decisions without speculative over-design;
- keep the terminology small and local to the use-case owner rather than introducing a separate abstract methodology/terminology file.

**Owner split / anti-overcomplication boundary:**
- add `documentation-use-cases.md` as the process owner for current truth, Migration Delta, `EVO-RPKG-*` steps, Slice evolution and architecture-decision placement;
- add `domain-evolution.md` only because shared Domain Object changes can cross several slices; it is explicitly not a general class/domain registry and remains empty of step-specific claims until the next integration pass derives them from accepted Scenario/Slice material;
- small/local terminology, invariants and decisions remain inside the relevant use case, Scenario or Slice. A new focused owner is created only when independent/shared complexity actually justifies it.

**Deferred integration boundary:**
- do not rewrite `scenarios/*` or `slices.md` in this package;
- a following documentation-integration step will reconcile accepted current behavior with target/migration material, assign stable Evolution Step IDs, classify remaining Scenario delta as URGENT / PLANNED / POSSIBLE, add per-Slice `Evolution Steps`, and populate shared Domain Object evolution only where multiple slices consume the same changed semantics;
- this step changes documentation governance/navigation only and makes no runtime, package-protocol, Git/GitHub or application-state behavior claim.

**Target-State Result:** Replacement Package App documentation has a minimal explicit workflow for tracing user-experience evolution into Slice changes, shared Domain Object changes and material architecture decisions, while keeping current implemented truth primary and possible future evolution visibly non-binding.

**APPLIED relation:** successful Apply of package `cd066c6f-28b2-45db-9b45-77eec0eb1dcf` adds the documentation-evolution owners inside still-open ChangeSet `40ce50dd-c0d3-42ae-b6b7-9ea0e9b78f91`. The subsequent integration of actual Scenario/Slice/domain evolution remains a separate package step in the same open ChangeSet unless review closes it first.

### LOG-RPKG-068 — Refine documentation requirements layers and templates

**Type:** DOCUMENTATION ARCHITECTURE / BEHAVIOR-DOMAIN-SLICE REQUIREMENTS / SAME OPEN CHANGESET / APPLIED TARGET  
**ChangeSet:** `40ce50dd-c0d3-42ae-b6b7-9ea0e9b78f91`  
**ChangeSet Label:** `Replacement Package App - Git-backed Work Intent`  
**Package:** `f19471a0-1e9b-4dc3-9b95-16d969bf5df8`

**Selected documentation step:**
- refine the previously established evolution form before migrating actual Scenario/Slice content;
- make Scenario `Behavior Items` the stable business requirements layer: each BI describes implementation-independent application behavior plus the reason that behavior exists;
- use those BI as input for Domain discovery, then let Domain owners reference the BI they directly implement and Slices reference the same BI they realize by orchestrating the provided Domain;
- allow optional `Domain Implementation Items` and `Slice Implementation Items` only for durable architecture/implementation requirements that should survive ordinary refactoring and may be derived from BI, invariants, Evolution Steps or concrete composition/DRY pressure.

**Domain / Slice ownership model:**
- Domain boundaries are discovered from behavior and consistency/invariant boundaries rather than current Java classes;
- prefer an Aggregate owner when several Domain Objects share one consistency boundary, while explicitly allowing separate Domain Object files when independent semantics, lifecycle, reuse or rule volume make them clearer;
- a Domain/Slice may implement/realize BI without any extra implementation-item entries; `DI-*` / `SI-*` are not mandatory taxonomy;
- concrete DRY/composition requirements are documented only when they protect one real semantic rule from duplicate implementations, not as generic slogans.

**Code-duplication boundary:**
- normative Scenario/Domain/Slice documentation does not manually maintain current method/service call chains, Java field inventories or adapter routing that can change under ordinary refactoring while behavior remains stable;
- source remains exact implementation authority; a future generated implementation-trace tool may emit disposable source-revision-bound traces (calls/callers/field use/types/external boundaries) under a fixed generated path, but this package does not claim such a generator is implemented;
- manual runtime/call-flow sections are therefore not a required default owner section.

**Templates:**
- add `documentation-templates.md` as the single recommended-template owner;
- templates cover Scenario, Evolution Step, Aggregate Domain owner, separate Domain Object owner, Slice, Cross-cutting Capability and recommended generated-trace output;
- templates are starting forms, not schemas: concrete owners may omit/combine/rename/reorder/add sections when that communicates the required meaning more clearly.

**Evolution integration boundary:**
- keep one `EVO-RPKG-*` identity across Scenario → Domain → Slice impact;
- Evolution Steps may add/change/remove BI and may also create `DI-*` / `SI-*` requirements without changing BI when selected future behavior creates architecture pressure;
- clarify `domain-evolution.md` as a cross-owner evolution map, not the primary Domain model or class registry;
- do not rewrite `scenarios/*`, `slices.md` or runtime code in this package. Actual BI/EVO/domain/slice integration remains the next documentation step.

**Target-State Result:** Replacement Package App documentation has a stable requirements hierarchy: Scenario BI own business behavior and reasons; Domain owners implement BI and optionally carry durable domain architecture requirements; Slices realize the same BI using Domain and optionally carry durable orchestration requirements; code-level mechanics stay in source or future generated traces; recommended templates guide documentation without becoming mandatory schemas.

**APPLIED relation:** successful Apply of package `f19471a0-1e9b-4dc3-9b95-16d969bf5df8` refines the documentation operating model inside still-open ChangeSet `40ce50dd-c0d3-42ae-b6b7-9ea0e9b78f91`. Actual migration of Scenario BI, Domain owners, Slice BI mappings and Evolution Steps remains a separate following package unless review closes the ChangeSet first.

### LOG-RPKG-069 — Establish Scenario behavioral-design documentation process

**Type:** DOCUMENTATION ARCHITECTURE / SCENARIO PROCESS + FEATURE INTERACTIONS / NEW CHANGESET / APPLIED TARGET  
**ChangeSet:** `5288db44-37ea-445b-b3e8-90f564b6cdd7`  
**ChangeSet Label:** `Replacement Package App - Scenario Behavioral Design Documentation`  
**Package:** `b07b856d-a761-4bb7-8cce-f0aef809a38c`

**Selected documentation step:**
- replace ambiguous Scenario `Stage` decomposition with a complete `Scenario Process Specification` whose Scenario-local `Feature Interactions` expose meaningful context/inputs, observable behavior, outcomes, Result/Outputs and transitions;
- keep `Behavior Items` as the stable Scenario-owned business/application requirements (`Requirement + Reason`) consumed by Domain discovery, while introducing `UI Requirements` as a separate intentional presentation/interaction requirement class rather than allowing layout details to inflate BI;
- make `Goal`, `Scenario Role` and `Why This Interaction Design` explicit separate meanings, and distinguish Context/Preconditions from Required Inputs plus meaningful Result from reusable Outputs;
- require Scenario completeness checks so BI/UI requirements formalize behavior visible in the Process Specification instead of becoming a hidden second source of Scenario truth.

**Behavioral design exploration:**
- add `DOC-UC-07` for comparing candidate Feature Interaction and complete Scenario Process variants before authoritative maintenance;
- allow alternatives to change inputs, process, Result/Outputs and whole composition, including explicit `Compose`, `Split` and `Replace` decisions;
- compare both interaction internals and contracts/boundaries between interactions, including whether stronger outputs remove later manual inputs/interactions or whether composition removes a useful control/recovery point;
- preserve `Strengths`, known `Problems`, neutral `Complexity`/complexity placement, `Risks` and open `Questions` only when they materially explain a design choice;
- keep optional mental/visual/interactive walkthrough as a design technique for deciding how the Scenario should work, not as a required documentation dependency or a substitute for Scenario authority.

**Authority / evolution boundaries:**
- candidate/rejected alternatives do not become current truth, Migration Delta, Evolution Steps or architecture requirements automatically;
- selected-but-unimplemented behavior is classified as `URGENT`/`PLANNED`; plausible useful future remains explicitly non-binding `POSSIBLE`; accepted implementation is promoted into current Process Specification;
- Evolution Steps may change Process composition, Feature Interactions/contracts, BI and UI Requirements while remaining coherent user-visible/application behavioral changes rather than implementation refactors;
- Domain remains BI-first and Aggregate/consistency-boundary driven; Feature Interaction names do not dictate Domain objects/aggregates;
- Feature Interaction is behavioral decomposition and Slice is implementation decomposition; no 1:1 mapping is required.

**Template/process integration:**
- rebuild the Scenario template around Process Specification + Feature Interaction entries and add reusable forms for Feature Interaction, Feature Interaction Variant, Scenario Process Variant and UI Requirements;
- update the Evolution Step form for process/FI/contract/BI/UI impact;
- keep existing Aggregate, Domain Object, Slice, Cross-cutting Capability and generated-trace forms while adding direct anchors;
- make every documentation use case link directly to the exact recommended template at the process step where it is needed; retain templates as flexible starting forms, not schemas;
- align `README.md`, `domain-evolution.md` and the bottom integration rule with the same terminology without migrating actual Scenario, Slice or Domain owners in this package.

**Preserved boundaries:**
- no actual `scenarios/*`, `slices.md`, Domain owner, testing, protocol or runtime/source behavior is changed by this documentation-model package;
- DI/SI remain optional durable architecture requirements; Cross-cutting Capability remains conditional; generated implementation traces remain source-derived/non-authoritative; normative documentation still does not duplicate code call graphs or accidental current UI layout.

**Target-State Result:** Replacement Package App documentation can now first explore competing behavioral designs, then maintain a selected Scenario as one complete Process Specification composed of Feature Interactions with explicit contracts, BI/Reasons and intentional UI Requirements, and finally feed stable BI into Domain/Slice architecture. Templates are operationally linked from the corresponding documentation workflows, while candidate design alternatives and optional visual simulation remain clearly outside current truth until selected/classified.

**APPLIED relation:** successful Apply of package `b07b856d-a761-4bb7-8cce-f0aef809a38c` establishes this documentation process for new ChangeSet `5288db44-37ea-445b-b3e8-90f564b6cdd7`. Migration of the three actual Scenario owners and downstream Domain/Slice mappings remains a separate following change after this documentation-model update is reviewed.

### LOG-RPKG-070 — Correct preserved Domain/Slice principles and cross-interaction BI ownership

**Type:** REVIEW DIFF / DOCUMENTATION MODEL CORRECTION / APPLIED TARGET  
**Reviewed ChangeSet:** `5288db44-37ea-445b-b3e8-90f564b6cdd7`  
**Corrects Package:** `b07b856d-a761-4bb7-8cce-f0aef809a38c`  
**Correction Package:** `973485bf-8470-4797-8ae1-65576fcdc060`

**Review finding / selected correction:**
- restore the previously accepted Domain rule that a generic DRY slogan is not itself a useful `DI-*`; a durable Domain implementation requirement must identify the concrete duplicated semantic rule that needs one owner and why;
- restore the previously accepted Slice rules that an existing Slice may evolve through internal modular expansion/composition and that a separate supporting Slice requires an independently meaningful capability/result or recovery/composition boundary rather than implementation size alone;
- make the agreed boundary-BI case explicit: when one Scenario BI constrains several Feature Interactions, keep one authoritative `Requirement + Reason` and reference the same BI identity from each relevant interaction instead of duplicating/rewording the requirement; mirror that rule in the Feature Interaction template notes.

**Preserved scope:**
- no Scenario owner, `slices.md`, Domain owner, protocol, test or runtime/source behavior changes in this correction;
- the Scenario Process / Feature Interaction / UI Requirement / design-variant model from `LOG-RPKG-069` remains unchanged; this package only restores semantic rules that were unintentionally lost or left implicit during that rewrite.

**Target-State Result:** the new Scenario behavioral-design documentation model preserves the earlier BI→Domain→Slice architecture rules without ambiguity: Domain `DI-*` remains concrete rather than slogan-driven, Slice boundaries remain capability/recovery driven rather than size-driven, and one BI may constrain multiple Feature Interactions without creating duplicate BI authority.

**APPLIED relation:** successful Apply of package `973485bf-8470-4797-8ae1-65576fcdc060` corrects the still-open ChangeSet `5288db44-37ea-445b-b3e8-90f564b6cdd7` after ReviewDiff `NEEDS_CORRECTION`; ChangeSet identity/label and Work Intent remain unchanged.

### LOG-RPKG-071 — Clarify Application Evolution ownership and documentation quality

**Type:** DOCUMENTATION ARCHITECTURE / APPLICATION EVOLUTION OWNERSHIP / NAMING + READABILITY / NEW CHANGESET / APPLIED TARGET  
**ChangeSet:** `ef0f38fa-aa0d-4b56-89cc-8c1fe6677fff`  
**ChangeSet Label:** `Replacement Package App - Evolution Ownership and Documentation Clarity`  
**Package:** `a42a0294-91cd-44a8-87a9-367220761003`

**Rebased source boundary:**
- the first prepared package for this ChangeSet (`5beda125-8c8e-41c2-a70c-46beaf4bd0a6`) was not applied because the local documentation source had advanced; the exact supplied local-base snapshot already contains the reviewed `LOG-RPKG-069` / `LOG-RPKG-070` Scenario Process / Feature Interaction / BI / UI / design-variant model;
- this rebased package uses that local state as its exact replacement base and adds only the evolution-ownership / naming / readability / use-case-driven-owner refinement described below;
- actual Scenario owners, `slices.md`, Domain owners, protocol, tests and runtime/source behavior remain outside this package.

**Application Evolution ownership:**
- make one `Application Evolution Step` a canonical Scenario-owned change that says **what application behavior changes**;
- remove the implication that Domain, Slice or Cross-cutting Capability owners own the same Evolution Step; those owners instead maintain `Changes by Application Evolution Step`, describing **how that owner changes** to realize the Scenario-owned step;
- retain `DI-*` / `SI-*` as optional durable implementation requirements derived from BI, invariants, selected application evolution or concrete architecture pressure;
- clarify `domain-evolution.md` as an optional cross-owner view of Domain changes caused by a Scenario-owned step rather than an Evolution Step owner.

**Evolution planning:**
- add `evolution-steps-map.md` as the dedicated planning owner for **when / dependency / order / enablement / parallelism** of selected Scenario-owned Application Evolution Steps;
- add `DOC-UC-08` so the map is explicitly justified and maintained by a Documentation Use Case rather than becoming an orphan planning file;
- keep step identity semantic and stable across roadmap reorder: prefer names such as `EVO-RPKG-GIT-DERIVED-CURRENT-CHANGE` instead of ordinal `EVO-RPKG-001` when the number has no independent meaning;
- allow planned future Scenario owners and allow a broad replacement Evolution Step to link a `Replacement Scenario` instead of embedding an unreadably large future Scenario delta in the current owner.

**Readable naming / information transmission:**
- add `DOC-UC-09` for semantic readability without semantic compression;
- require intuitive human-readable names for Scenario, Feature Interaction, BI, UI Requirement, Evolution Step, Slice, Aggregate/Object and other durable documentation entities; technical IDs remain reference aids, not the primary carrier of meaning;
- do not treat arbitrary `01/02/03` numbering as Scenario/Slice/FI/BI/EVO architecture or roadmap order;
- structure dense text according to meaning: keep one coherent thought as prose, expose multiple independent facts/conditions/exceptions/consequences as bullets/sub-bullets or another explicit structure, and make branches/contracts/current-vs-future/before-vs-after distinctions visually recoverable without deleting conditions for brevity;
- update templates to demonstrate the same readable semantic naming and presentation rules.

**Use-case-driven documentation ownership:**
- add `DOC-UC-10` and the explicit `No orphan documentation owner` principle;
- every durable documentation owner must be needed by at least one explicit Documentation Use Case that explains why it exists and how it is created/maintained/consumed;
- small terms/principles stay inside their natural use-case/process owner when no independent owner is justified; do not create generic `terms.md`, `principles.md`, `notes.md` files merely because the information appears generally useful;
- templates remain valid because concrete Documentation Use Cases link to/use them at process steps; the new Evolution Steps Map is valid because DOC-UC-08 owns its maintenance process.

**Scenario migration boundary:**
- current Scenario owners continue unchanged in this package and therefore still use their existing prose until the later Scenario migration;
- the future migration should describe current Scenario truth without calling the Scenario “transitional”, move known application changes into Scenario-owned semantically named Evolution Steps, create planned future Scenario owners where useful, then populate the Evolution Steps Map from those canonical steps;
- lower Domain/Slice/cross-cutting documentation should migrate from `Evolution Steps` wording to `Changes by Application Evolution Step` when those owners are actually integrated.

**Target-State Result:** documentation now has an unambiguous evolution responsibility split: Scenario owns **WHAT** application behavior changes, `evolution-steps-map.md` owns **WHEN / dependency / order**, and Domain/Slice/Cross-cutting owners document **HOW** they change to realize the canonical step. Naming/presentation rules prioritize readable meaning without semantic loss, and no durable documentation owner is created without an explicit Documentation Use Case.

**APPLIED relation:** successful Apply of rebased package `a42a0294-91cd-44a8-87a9-367220761003` establishes this refined documentation model in new ChangeSet `ef0f38fa-aa0d-4b56-89cc-8c1fe6677fff`. Actual Scenario/Slice/Domain migration remains separate work after review of this documentation-model ChangeSet.

### LOG-RPKG-072 — Correct documentation use-case coverage and migration-state wording

**Type:** REVIEW DIFF / DOCUMENTATION MODEL CORRECTION / APPLIED TARGET  
**Reviewed ChangeSet:** `ef0f38fa-aa0d-4b56-89cc-8c1fe6677fff`  
**Corrects Package:** `a42a0294-91cd-44a8-87a9-367220761003`  
**Correction Package:** `6e40b9bc-4643-454a-aacf-8b7c59d52cf5`

**Review finding / selected correction:**
- correct README wording that prematurely described current Scenario owners as already migrated to complete Process Specifications + canonical Application Evolution Steps; the documentation model is target form, while existing Scenario owners remain unchanged until the separate Scenario migration;
- refine `No orphan documentation owner` from the over-broad rule “every file needs a Documentation Use Case” into explicit **use-case coverage**:
  - documentation-process artifacts such as templates, terminology/principles, Evolution Steps Map and generated-documentation process/output require an explicit Documentation Use Case;
  - application semantic/contract/proof owners may instead be justified by the application Scenario, Slice, testing or acceptance process that needs their information, without creating artificial meta Documentation Use Cases;
- keep the core rule unchanged: no durable owner exists merely because information seems generally useful; every owner must still have a clear consumer/process, authority boundary and maintenance reason.

**Preserved scope:**
- Scenario-owned Application Evolution Step = WHAT, Evolution Steps Map = WHEN/order/dependency, and lower-owner `Changes by Application Evolution Step` = HOW remain unchanged;
- semantic naming, non-ordinal identity and semantic-readability rules remain unchanged;
- `evolution-steps-map.md`, templates, `domain-evolution.md`, actual Scenario/Slice/Domain owners, focused contracts, tests and runtime/source behavior are not modified by this correction.

**Target-State Result:** the documentation model now distinguishes target documentation form from current unmigrated Scenario files and enforces use-case-driven ownership without forcing artificial Documentation Use Cases onto application contracts/proof owners. Documentation-process artifacts still require explicit DOC-UC ownership, while all durable owners retain explicit use-case/process coverage.

**APPLIED relation:** successful Apply of correction package `6e40b9bc-4643-454a-aacf-8b7c59d52cf5` corrects the still-open ChangeSet `ef0f38fa-aa0d-4b56-89cc-8c1fe6677fff` after ReviewDiff `NEEDS_CORRECTION`; ChangeSet identity/label and Work Intent remain unchanged.

### LOG-RPKG-073 — Extend documentation model with Screen ownership, proof/TDD and evolution-aware implementation requirements

**Type:** DOCUMENTATION ARCHITECTURE / SCREEN + PROOF + EVOLUTION-AWARE IMPLEMENTATION / NEW CHANGESET / APPLIED TARGET  
**ChangeSet:** `a52e9adc-a72d-467b-b1d8-d3a2a5a801b6`  
**ChangeSet Label:** `Replacement Package App - Screen, Proof and Evolution-Aware Documentation`  
**Package:** `13b5a188-bfe9-4b78-b05e-06e70a0ce3f5`

**Screen design / ownership:**
- extend behavioral exploration so Scenario Process/FI variants and Screen Set/individual Screen variants can be designed together and feed back into each other before selection;
- keep Scenario authority for application behavior, keep FI/component-local UI requirements near their interaction, and place canonical Screen/spatial/window meaning in a selected Screen owner only when real Screen planning exists;
- define one `screens.md` as the default selected Screen Map/Scenario×Screen/FI×Screen/routes owner, with split Screen files only when independent depth/review/reuse justifies them; do not create an empty Screen owner in this methodology package.

**Evolution responsibility refinement:**
- simplify canonical Scenario terminology from `Application Evolution Step` to `Evolution Step` while preserving the same WHAT-behavior-change authority and optional `URGENT`/`PLANNED`/`POSSIBLE` intent;
- rename lower-owner `Changes by Application Evolution Step` to `Evolution Impact`, whose only job is future owner delta;
- use `Expansion`, `Refactoring` and `Forced Migration` as meaningful optional impact kinds: Expansion is preferred additive/compositional change, Refactoring is behavior-preserving structural improvement, Forced Migration signals that current structure forces movement/rewrite of existing logic/authority;
- enrich the Evolution Steps Map with rough horizon/likelihood/readiness and allow references to materially independent local impacts when their timing/likelihood differs from the parent step, without duplicating behavioral or implementation delta.

**Implementation Items as evolution-enabling requirements:**
- strengthen `DI-*`, `SI-*` and shared implementation items so they may be derived not only from current BI/invariants but also from durable implementation-quality pressure and materially known Evolution Impact;
- allow known evolution to justify stable ports, composition seams, identities/ownership rules or shared boundaries now when that makes later realization additive and avoids avoidable Forced Migration;
- explicitly forbid using known future evolution as permission to implement the future capability itself prematurely;
- keep `Evolution Impact` free of duplicated Implementation Item `Requirement + Reason`; Impact describes future delta, Implementation Items constrain current implementation.

**Shared implementation ownership:**
- replace the owner type `Cross-cutting Capability` with `Shared Implementation Capability` for one real reusable implementation responsibility consumed by several Slices; cross-cutting remains a characteristic rather than a second taxonomy;
- keep `slices.md` as portfolio/composition strategy while a Shared Implementation Capability owns actual reusable responsibility, local requirements/tests and impact when such an owner is genuinely useful.

**Proof / TDD:**
- make local Tests part of Aggregate/Slice/Shared Implementation Capability ownership by default; separate test owners remain optional only for independent depth/reuse/review;
- define `Test Item` only as a non-obvious durable proof-quality requirement (boundary, no-mutation, persisted observation, isolation, false-confidence, refactor/evolution resilience), never as a second semantic/production requirement;
- make test-first production realization the default once selected meaning and a credible executable proof boundary are known; pure Refactoring keeps proof green, and experiments/prototypes remain an exception for genuinely unresolved feasibility/design/proof questions before returning to test-first production work;
- distinguish shared `Test Strategy` policy from an optional reusable `Shared Test Capability`; preserve the current `testing-plan.md` Slice→proof map until later local-owner migration rather than pretending that migration already happened;
- document the target distinction between Practical Acceptance Plan and executed Evidence without changing the current `MANUAL-ACCEPTANCE.md` in this methodology package.

**Preserved integration boundary:**
- actual `scenarios/*`, `slices.md`, `testing-plan.md`, `MANUAL-ACCEPTANCE.md`, focused contracts, runtime/source and executable tests are not migrated/changed by this package;
- later integration will create selected Screen documentation only when real Screen design exists, then reconcile Domain/Slice local proof and shared strategies incrementally;
- templates remain recommended forms, not schemas, and no-orphan/use-case-coverage/readability rules remain in force.

**Target-State Result:** the documentation methodology now cleanly separates Scenario Evolution Step (WHAT behavior changes), Evolution Steps Map (WHEN/likelihood/dependency/readiness), lower-owner Evolution Impact (WHAT future delta occurs), and Implementation Items (HOW current implementation must be shaped for current correctness/quality and materially known future evolution). Screen design/ownership and proof/TDD fit the same ownership model without making Screens or tests a duplicate authority.

**APPLIED relation:** successful Apply of package `13b5a188-bfe9-4b78-b05e-06e70a0ce3f5` establishes this methodology refinement in new ChangeSet `a52e9adc-a72d-467b-b1d8-d3a2a5a801b6`. Migration of actual Scenario/Screen/Domain/Slice/testing/acceptance owners remains separate later work after this documentation-model ChangeSet is reviewed.


### LOG-RPKG-074 — Correct template linkage, Screen variant guidance and preserved package-production boundary

**Type:** REVIEW DIFF / DOCUMENTATION MODEL CORRECTION / APPLIED TARGET  
**Reviewed ChangeSet:** `a52e9adc-a72d-467b-b1d8-d3a2a5a801b6`  
**Corrects Package:** `13b5a188-bfe9-4b78-b05e-06e70a0ce3f5`  
**Correction Package:** `05ee98dd-3f1e-46b4-bb27-1d1515c110c8`

**Review finding / selected correction:**
- restore the README boundary that ordinary replacement-package production remains outside the Replacement Package App route and is governed by `planning/command-routing.md` → `planning/commands/build-replacement-archive.command.md` → `planning/documentation/build-replacement-archive-workflow.md`; the methodology rewrite had accidentally removed that operational routing statement;
- restore direct DOC-UC → template links throughout Scenario, Domain, Slice, Shared Implementation, evolution planning, Screen and proof workflows so the retained rule “Documentation Use Cases use concrete recommended forms” is true rather than only asserted;
- add a recommended Screen Set / Screen Variant analysis form so DOC-UC-07 can plan whole Screen topology and individual Screen alternatives with the same explicit design-medium support already available for Scenario Process/FI variants;
- clarify that when Tests are embedded in an Aggregate/Slice/shared owner, material test-suite change belongs in that same owner’s `Evolution Impact` as Expansion or Refactoring when useful; do not create a parallel test-evolution owner and do not force a test-impact note when nothing material changes;
- clarify Test Item evolution resilience: proof should remain stable while the property it proves remains unchanged, while a genuine semantic change may legitimately change/replace the corresponding Test Item/test.

**Preserved architecture meaning:**
- Scenario Evolution Step = WHAT application behavior changes;
- Evolution Steps Map = WHEN / likelihood / dependency / readiness;
- lower-owner Evolution Impact = WHAT future owner delta occurs through Expansion / Refactoring / exceptional Forced Migration;
- DI/SI/shared Implementation Items = HOW current implementation is constrained for correctness/quality and materially known future evolution;
- Test Items remain proof-quality requirements only and never become product/architecture authority;
- actual Scenario/Screen/Domain/Slice/testing/acceptance owners remain unmigrated by this correction.

**Target-State Result:** the Screen/proof/evolution methodology retains the agreed architecture while restoring the operational package-production boundary, making use-case/template linkage internally true, giving Screen variants an explicit recommended design form and making material test-suite evolution part of the natural owner rather than a duplicated evolution hierarchy.

**APPLIED relation:** successful Apply of correction package `05ee98dd-3f1e-46b4-bb27-1d1515c110c8` corrects the still-open ChangeSet `a52e9adc-a72d-467b-b1d8-d3a2a5a801b6` after ReviewDiff `NEEDS_CORRECTION`; ChangeSet identity/label and Work Intent remain unchanged.


### LOG-RPKG-075 — Refactor local documentation methodology around Feature/Slice planning

**Type:** DOCUMENTATION METHODOLOGY TARGET / APPLIED TARGET  
**ChangeSet:** `9263c08f-6172-4541-b47e-317c5d32d36a`  
**Package:** `e7cfd159-fa57-4249-bf6f-d07ae018de4a`

**Selected methodology correction:**
- make **Feature** the primary behavioral planning unit after application Benefits while keeping Scenario as the real user/application journey and cross-Feature/cross-Screen consistency owner rather than a mandatory upstream parent of every Feature;
- define Feature and Slice as two sides of the same use-case boundary: Feature owns coherent observable behavior under one intent/principal Result family; Slice owns its end-to-end realization; there is no separate mandatory Slice Discovery phase;
- require Feature Planning to include Behavior Requirements ↔ Feature Data plus free-form **Feature Implementation Concerns** for feasibility, implementation dependencies, candidate/rejected approaches, platform/external constraints, Aggregate/Shared signals, proofability and Slice-boundary/module/branch observations; downstream discovery must inspect those concerns instead of restarting feasibility reasoning from zero;
- replace atomic Item ontology with structured **Requirement** semantics: Requirements may be algorithms, invariants, state machines, protocols, ordered processes or contracts, and Production ↔ Proof discovery uses the common Correctness / Local Reasoning / Evolution Fitness backbone;
- define the four-group Feature/Slice Boundary Check: (1) intent/principal Result, (2) semantic entry vs transport, (3) realization cohesion/shared structure, (4) development/proof/evolution fitness including change locality and Slice isolation; repeat the same check later with stronger implementation Evidence;
- define Slice independence as locality of responsibility/change rather than dependency absence and preserve normal Slice evolution through ordinary change, Module, Branch, Entry Adapter and Shared Capability extraction;
- keep Scenario planning bidirectional with Features/Screens, add Scenario Requirements for genuine cross-Feature/cross-Screen journey constraints, and treat Scenario as behavioral authority for E2E proof rather than test code;
- make relevant known Evolution Steps Sources for every material Discovery; allow shallow early Steps, but require a completed Step to end in a coherent usable application state, show full target Feature state when mature, and include target Scenario when cross-Feature journey composition changes;
- allow explicitly selected exceptions to preferred methodology principles only when the contradiction, reason, preserved boundaries and downstream proof/implementation consequences are recorded.

**Preserved current-product boundary:**
- this package updates only the Replacement Package App **local documentation methodology** and its scope action log/navigation; it does not modify the separate main/reusable SDS/IDTSPE methodology;
- current Scenario/FI/BI/Screen/Domain/Slice/testing/contract owners remain byte-for-byte outside this package and keep their existing product truth until separately migrated; legacy FI/BI/DI/SI/TST labels are compatibility representation, not restored target ontology;
- `evolution-steps-map.md`, `slices.md`, `screens.md`, Scenario files, Domain files, Slice files, `testing-plan.md`, contracts and source/tests are not operations in this package.

**Source basis:** user-supplied Local Snapshot `obs-planning-docs-local-base-90ec47d6-20260905-152150.zip`, repository `github:AlexPastukhh/obs-planning-docs`, base commit `90ec47d6099d8631e4b70953ef689bd530d28cc6`, branch `main`. Expected-source bytes for every replace operation come directly from `snapshot/`; no later branch/diff bytes are mixed into the package.

**Target-State Result:** after successful Apply, `documentation-use-cases.md` is the active Feature-centered local methodology authority, `documentation-templates.md` provides matching non-schema forms, `README.md` routes readers through the new model with an explicit legacy-product migration guard, and this log records the selected target without changing product Scenario/Slice meaning.

**APPLIED relation:** successful Apply of package `e7cfd159-fa57-4249-bf6f-d07ae018de4a` establishes this new independent ChangeSet `9263c08f-6172-4541-b47e-317c5d32d36a` from the supplied `main` snapshot source; later product-document migration must be a separate selected change and must re-evaluate old FI/BI decomposition rather than mechanically rename it.


### LOG-RPKG-076 — Correct stable methodology identities and compatibility anchors

**Type:** REVIEW DIFF / LOCAL METHODOLOGY CORRECTION / APPLIED TARGET  
**Reviewed ChangeSet:** `9263c08f-6172-4541-b47e-317c5d32d36a`  
**Corrects Package:** `e7cfd159-fa57-4249-bf6f-d07ae018de4a`  
**Correction Package:** `0665ab3f-ff1f-4f25-9968-886bf59fbc75`

**Review finding / selected correction:**
- preserve the accepted Feature/Slice methodology model from LOG-RPKG-075, but restore stable `DOC-UC-01..12` semantic identity lineage instead of reusing old IDs for unrelated new processes;
- keep `DOC-UC-01` for Scenario/journey behavioral specification, `02` Domain/Aggregate, `03` Slice, `04` Shared Capability, `05` evolution-aware architecture, `06` implementation inspection, `07` design exploration, `08` Evolution Step planning, `09` semantic readability, `10` documentation ownership, `11` Screen model and `12` proof;
- assign genuinely new target processes `DOC-UC-13` (Feature planning + Feature/Slice boundary hypothesis) and `DOC-UC-14` (owner-local Production ↔ Proof Requirements Discovery);
- restore compatibility anchors `doc-uc-evolution-steps-map`, `doc-uc-semantic-readability`, `doc-uc-documentation-ownership` and `template-evolution-impact`; the Evolution Impact template now expresses the new target model while preserving the stable link target used by unchanged owners such as `domain-evolution.md`;
- remove the accidental leading `\` presentation line from `documentation-use-cases.md` and `documentation-templates.md`.

**Preserved methodology meaning:**
- Feature remains the primary behavioral planning unit under one intent/principal Result family and Slice remains the end-to-end implementation side of that same boundary;
- the four-group Feature/Slice Boundary Check, Feature Implementation Concerns, Scenario Requirements, change-locality definition of Slice isolation, structured Requirement semantics, Production ↔ Proof discovery and Evolution Step completeness rules remain unchanged;
- current Scenario/Screen/Domain/Slice/testing/contracts/source remain outside this correction and are not semantically migrated.

**Compatibility result:** unchanged `domain-evolution.md` references `DOC-UC-02`, `DOC-UC-05`, `DOC-UC-10` again resolve to Domain discovery, evolution-aware implementation architecture and documentation ownership respectively, and `documentation-templates.md#template-evolution-impact` resolves again without editing the product owner.

**APPLIED relation:** successful Apply of correction package `0665ab3f-ff1f-4f25-9968-886bf59fbc75` corrects the still-open ChangeSet `9263c08f-6172-4541-b47e-317c5d32d36a` after semantic review `NEEDS_CORRECTION`; ChangeSet identity/intent remain unchanged.
