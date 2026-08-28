# Replacement Package App — Testing Strategy

Status: selected target cross-Slice strategy / current evidence tracked separately
Owner responsibility: `UC-PLAN-TEST-STRATEGY`
Related Slices: [`slices.md`](slices.md)

## Strategy

Use three proof responsibilities:

```text
1. Automated component/domain-style proof
2. Automated integration proof with real temporary Git/filesystem/state boundaries
3. Manual practical testing of real Swing/Windows/Edge/ChatGPT behavior
```

No automated browser/desktop E2E layer is selected. Selenium/Playwright/Swing-driving automation is not required merely to reproduce operated paths. Planned target proof, implemented tests and executed/current evidence remain distinct states.

## Layer Responsibilities

### Automated component/domain-style proof

Use for deterministic semantic/application rules:
- ChangeSet publication lifecycle, explicit Finalized→Active Reopen and repository-scoped ownership;
- Repository Target stable ID vs mutable location data rules;
- local/global ChangeSet-selector projection ordering/filtering from persisted lifecycle plus unfinished-work latest outcome and unavailable-target query state;
- latest unfinished ChangeSet outcome replacement/persistence and no Finalized marker after failed Reopen;
- User Operation outcome→notification request mapping;
- External Interaction identity/semantic cancellation/terminal truth/current-actionable projection and new-attempt identity after terminal work;
- parser/path validation and pure helpers.

### Automated integration proof

Use real temporary Git repositories/bare remotes/filesystems/state stores where boundaries matter:
- exact `PACKAGE.json.changeSetId` continuation resolution plus Apply target resolution/preflight/mutation/rollback;
- repository-scoped ownership across multiple repositories/clones;
- expected source-state comparison using real Git path semantics;
- Current ReviewDiff temporary-index isolation;
- Finalize/commit/push/publication recovery and guarded Reopen ownership reacquisition;
- repository location update + later operation revalidation;
- Repository Snapshot construction/stability/readiness;
- loopback bridge/service integration without claiming real browser success;
- persistence/restart of latest unfinished ChangeSet outcome and safety-critical External Interaction state.

For selected source-state design, integration tests must exercise a binary-safe Git canonical comparison equivalent to:

```text
expected bytes → git hash-object --stdin --path=<path> → canonical identity A
actual bytes   → git hash-object --stdin --path=<path> → canonical identity B
A == B → equivalent
```

Raw equality may short-circuit Git comparison. Git command/filter failure is fail-closed (`SOURCE_STATE_UNVERIFIABLE`/equivalent), not fallback to guessed normalization.

### Manual practical testing

Use actual application/environment for:
- Swing context/navigation/state presentation;
- local/global ChangeSet selector scope UX, repository-first row identity, below-selector filters and exact-target switching;
- explicit repository location change;
- Windows launcher/clipboard/notifications;
- notification-click repository routing;
- dedicated technical diagnostics copy surface;
- Microsoft Edge extension pairing/reload;
- ordinary ChatGPT conversation discovery, including configurable ignored-character title matching, unique/no-match/ambiguous action resolution, explicit existing-binding rebind confirmation and manual fallback;
- real current-change small/large `.diff` attachment preparation, configurable Send retry behavior, intentional app/extension protocol skew rejection and snapshot attachment readiness;
- External Interaction full-width selector + below-selector actions, equivalent actionable dedupe and prepared-content-retained Cancel behavior;
- duplicate tabs/composer protection, snapshot no-auto-send, and no blind retry after ReviewDiff attachment disappearance/uncertainty.

[`MANUAL-ACCEPTANCE.md`](MANUAL-ACCEPTANCE.md) is the operated proof surface, not an automated E2E suite.

## Shared Harness / Data / Isolation

Automated tests should prefer:
- disposable per-test/per-group repository roots and isolated `StateStore` roots;
- temporary bare remotes for publication behavior;
- explicit fixture packages/snapshots/reviews/interactions/operation outcomes;
- repositories with configurable `core.autocrlf` and `.gitattributes`;
- no dependence on user's real repository/clipboard/browser profile/%LOCALAPPDATA% except tests specifically intended for those external boundaries;
- cleanup that never performs destructive operations against non-test repositories.

For repository-scope tests include:
- two unfinished ChangeSets in same concrete target;
- two different concrete targets with same relative path;
- two clones sharing one Repository Identity;
- one target location moved/changed explicitly to a matching-origin work tree.

## Target Cross-Slice Proof Map

| Slice | Automated responsibility | Manual practical responsibility |
|---|---|---|
| `SL-RPKG-01` Apply Replacement Work | passive input, prepared/authorized Apply context + stale-context revalidation, exact-ID continuation with persisted-label authority, label-mismatch diagnostic-only behavior, target resolver, readiness, ownership + owner/unowned diagnostic detail, source-state Git equivalence, rollback/result; separate wait-for-ZIP wrapper freezes inputs and retries only `PACKAGE_NOT_FOUND` at 2s cadence for max 12s before reusing the same Prepare/Execute path | real responsive ordinary Apply plus `Apply (wait for ZIP)` arrival/timeout/non-retry behavior, Prepare → decision → Execute flow, target switch/preflight/result/reason readability including label-mismatch continuation and exact owner/unowned truth |
| `SL-RPKG-02` Inspect Current Change | cumulative ReviewDiff, persistence, corruption/stale detection, real-index isolation | responsive background Refresh + Copy/Open/restart/current-state presentation |
| `SL-RPKG-03` Finalize And Publish Work | owned-only commit, lifecycle, publication pending, safe recovery, guarded Finalized→Active Reopen, failed-Reopen no-marker rule | responsive background Finalize/Retry plus real Reopen/remote-ahead UX/truthful state + notification on failed Reopen |
| `SL-RPKG-04` Export Repository Snapshot | exact/stable ZIP, readiness, index/output safety + source-level destination freeze before background export | responsive destination-first dialog with `Export only` / `Export + Attach`, Repository Not Ready, destination/clipboard/open-folder |
| `SL-RPKG-05` Attach Snapshot | exact artifact/task integration; frozen conversationKey required; Java-owned fixed 10-minute confirmation deadline with scheduled wake-up + restart restore; startup-normalized terminal event survives until UI sink registration; Pending/Claimed timeout→Cancelled, Preparing timeout→PreparedUnsent | real preselected destination, no late re-selection/substitution, exported-ZIP success survives unavailable/failed handoff, bounded terminal outcome when unconfirmed, attachment ready + Send untouched |
| `SL-RPKG-06` Deliver Current Change | manual/action-assisted binding convergence; ignored-character matcher persistence; prepared unique/no-match/ambiguous/same/different-binding plans; keep-vs-rebind authorization + stale binding guard; exact delivery integration/dedupe/uncertainty + task-specific attachment identity + post-preparation composer guard + actual-click possible-Send boundary + per-task retry interval; single background-owned tab-agent injection with session generation/per-tab instance fencing; truthful Pending→Waiting / Claimed→Delivering presentation | real manual binding plus configured title matching, unique auto-bind/manual fallback, pre-Apply keep/rebind/cancel choice and unsafe-rebind handling; small/large `.diff` attachment delivery with ChatGPT foreground and non-foreground; after one upgrade refresh from any pre-0.2.11 agent, extension reload while the bound tab stays open must replace the current stale agent without another page refresh or repeated invalid-context errors; upload-ready/task-specific prepared-filename verification; post-Send prepared-attachment departure + post-baseline user-turn confirmation, with turn-local `.diff` surface as optional stronger proof; unrelated composer/user-turn negatives; configured guarded MAIN-world Send retries; send/uncertainty outcome |
| `SL-RPKG-07` Select Existing Work Context | local/global ChangeSet projection, history filter/order, unfinished latest outcome, nullable unavailable-target query, exact target/set selection, history-only Reopen entry | real `All repositories` + `Show history` selector behavior, unavailable target, exact repo+set navigation, Reopen control |
| `SL-RPKG-08` Manage External Interactions | semantic identity/state/cancel/dismiss/current-actionable-attention projection/persistence boundary | real list/select/cancel/dismiss; ordinary terminal rows disappear; unacknowledged uncertainty can be dismissed without truth rewrite and stays hidden after restart; retry creates new interaction; prepared content retained; uncertainty truth |
| `SL-RPKG-09` Notify Operation Outcomes | User Operation result→one notification request; unfinished latest-outcome persistence; failed-Reopen notification without Finalized marker | real Windows success/failure notifications and click repository routing |

## Critical Negative Guarantees

The strategy must preserve explicit proof that:
- passive package input and any failed preflight cause no target mutation;
- wait-for-ZIP Apply does not become a second Apply implementation: ordinary Apply remains immediate, the wrapper freezes click-time inputs, retries only `PACKAGE_NOT_FOUND` every 2 seconds for at most 12 seconds off EDT, and hands the first successful Prepare to the existing continuation exactly once;
- one ChangeSet cannot capture sibling same-target ownership; another concrete repository does not conflict merely because relative paths match;
- ownership/adoptability failures never leave the user guessing who owns a path: exact target/path/applying ChangeSet are shown, with either explicit `Unowned` or concrete owner label/status/ID;
- real manual/out-of-band source change is not accepted merely because Git-controlled EOL/filter representations differ;
- Git-equivalent representation is not false-rejected;
- inability to prove source equivalence fails closed;
- repository without required first commit receives product-level Repository Not Ready rather than unsafe fallback;
- global work/navigation/notification click never becomes mutation authority or silent clone substitution;
- explicit location change preserves Target ID/ChangeSets and checks only selected registration contract, while later operations keep their normal guards;
- stale Current Change cannot be finalized;
- publication failure preserves successful local commit/work;
- selecting Finalized history never reopens automatically; explicit Reopen preserves identity/history, reacquires only safe historical ownership and fails with no partial transition on sibling-owner or unrelated dirty/unowned conflict;
- snapshot export does not mutate repository/index;
- Snapshot `Export + Attach` freezes one explicitly selected conversation before export, creates no attach task before ZIP success, never substitutes a later/current chat, never changes Review-chat binding and preserves successful export across browser unavailability; no special fresh-inventory handshake is required, and a Java-owned scheduled wake-up must terminate any queued unconfirmed Snapshot interaction at the fixed deadline even when no later browser/UI/service request occurs, as `Cancelled` before preparation or `PreparedUnsent` after preparation began; service restart must normalize overdue work and re-arm remaining active deadlines, and any terminal event produced during construction before the Swing sink is registered must be deferred and surfaced exactly once after sink registration rather than silently disappearing from the working list;
- External Interaction Cancel never auto-deletes prepared ChatGPT content and possible-send uncertainty is not rewritten; terminal uncertainty uses separate Dismiss acknowledgement rather than false cancellation;
- ordinary terminal External Interactions do not accumulate as user-facing history; dismissed uncertainty stays hidden across restart while task truth remains, and retries never reuse terminal/cancelled/dismissed interaction identity;
- current-change preparation does not require foreground/document focus, Clipboard API write success or direct rich-text insertion, and `PreparedUnsent` is impossible before the exact `.diff` attachment is confirmed upload-ready;
- browser failure never rolls back/authorizes repository work;
- ReviewDiff Send-control retries occur only while the same task-specific attachment remains prepared and the composer contains no unrelated text;
- unrelated composer text added after upload-ready must stop before a Send click and remain pre-Send truth (`PreparedUnsent`), not `UnknownAfterSend`;
- after the prepared attachment leaves the composer, `Sent` requires a new post-baseline user turn; a turn-local file/attachment-like DOM surface exposing `.diff` is stronger optional proof, not a mandatory success gate; strong proof lookup remains bounded to the current authored turn and cannot cross into a neighboring authored message;
- technical `SendClicked` is not persisted before an actual possible-Send click; if a real click occurs before that persistence completes, uncertainty may be preserved rather than downgraded to pre-Send truth;
- attachment disappearance after a possible-Send click without any post-baseline user-turn confirmation becomes uncertainty and stops automation;
- snapshot attachment never sends even though it reuses the same low-level attachment primitive;
- notification delivery never repeats/executes the operation.

## Manual Practical Campaign Shape

```text
PA-SL01 Apply Replacement Work
PA-SL02 Inspect Current Change
PA-SL03 Finalize And Publish Work
PA-SL04 Export Repository Snapshot
PA-SL05 Attach Repository Snapshot To ChatGPT
PA-SL06 Deliver Current Change To ChatGPT
PA-SL07 Select Existing Work Context
PA-SL08 Manage External Interactions
PA-SL09 Notify Operation Outcomes
```

Cross-Slice repository-location and technical-diagnostics checks remain shared cards unless future delivery complexity justifies a separate Slice.

Each material manual card records target property/negative guarantee, environment/setup/data, action/path, observable evidence, pass/fail rule and execution state `planned | executed-pass | executed-fail | stale`.

## Evidence State / Operational Acceptance

Current source/tests only prove implemented responsibilities. Documentation of selected SL-07/08/09 and selected deltas in SL-01/04 does not make them implemented.

Automated `failed=0` is necessary for implemented automated responsibilities but does not establish live Edge/ChatGPT/Windows notification success. A Slice requiring real UI/browser/notification proof is operationally accepted only when relevant manual cards have current `executed-pass` evidence in intended environment.

## Selected Engineering/Proof Gates Before Target Acceptance

- source-state canonical Git comparison: `.gitattributes`, `core.autocrlf`, custom clean filters, binary files, dirty/manual content, continuing owned ChangeSet content, filter failure;
- live Edge/ChatGPT acceptance for SL-05/06/08;
- real Windows notification delivery/click for SL-09;
- repository-location change against same folder moved and explicit different matching-origin clone;
- Finalized ChangeSet Reopen with clean/safe historical paths, sibling-owner conflict, unrelated dirty/unowned conflict and restart/history UI entry conditions;
- restart persistence of compact latest ChangeSet operation outcome and safety-critical interaction state;
- Settings persistence/default/range for ReviewDiff send retry interval and per-task freezing of that interval; schema-4 persistence/default/Unicode-code-point behavior for `reviewChatTitleIgnoredCharacters`.
- bridge protocol/version advertisement in health + claim responses; claimed-task contract preflight before content delivery/external preparation; deterministic compatibility/interval failure remains `FailedBeforeSend` and cannot cross the possible-Send boundary.
- task-specific ReviewDiff preparation identity; post-upload composer guard in content + MAIN world; actual click before `SendClicked`; prepared-attachment departure + post-baseline user-turn confirmation, while bounded turn-local `.diff` file/attachment-surface detection remains optional stronger evidence rather than a mandatory success gate.
- equivalent actionable ChatGPT handoff requests do not create duplicate Pending interaction identities: same ReviewDiff attempt/source + ChangeSet + destination and same snapshot artifact + destination reuse the current task; terminal retry gets a new identity and materially different source remains independent.
- Swing Snapshot source-level proof requires `Export only` / `Export + Attach` actions in the same dialog, freezes the selected snapshot `conversationKey` before `runBackground("Repository Snapshot",...)`, contains no legacy post-export Attach-to-ChatGPT chooser, and performs exact-ZIP validation/enqueue with only that frozen key inside the background operation after successful export. Bridge source/test proof additionally requires a fixed 10-minute Snapshot confirmation deadline independent of claim heartbeats, an actual Java scheduled wake-up that fires without a later normalization request, restart normalization/re-arm, deferred exactly-once delivery of a restart-normalized terminal event after event-sink registration, with `Pending`/`Claimed` expiry → `Cancelled` and `Preparing` expiry → `PreparedUnsent`.
- optional `OBS-ACTION.chatTabTitle` parsing is backward compatible and happens during Prepare; configurable ignored-character normalization is deterministic/case-sensitive; unique unbound candidate freezes a `conversationKey`; interactive Swing conflict flow requires explicit keep/rebind authorization before Execute; stale binding change before Execute blocks before mutation; zero/ambiguous matches produce prepare Output warnings without guessing.
- Swing source-level layout/display proof keeps repository context at the beginning of every ChangeSet row, puts ChangeSet filters below that selector, and puts External Interaction actions below their selector so long list content cannot consume action space; source-level worker proof requires Apply Prepare/Execute, Refresh Review, Finalize and Repository Snapshot export to dispatch through the shared `SwingWorker` runner rather than execute heavy Core work directly on EDT. The Apply UI entry contains no `core.readPackage(...)` before background Prepare. Source-level Output proof requires per-`changeSetId` buffers, ChangeSet-selector switching, prepared Apply routing by manifest `changeSetId`, direct ChatEvent routing by `changeSetId`, packageId-only attempt traceability, transient `Operation` status before ChangeSet resolution, and absence of general/archive/review-attempt pending Output state.
- Refresh UI-ownership proof isolates `refreshReview()`: it captures one ChangeSet, calls `core.refreshReview(cs)` and routes completion to Output `cs` without assigning `selectedChangeSet` or rewriting selected Review/chat presentation. Review Copy/Open resolve the latest persisted ChangeSet/currentReview on invocation rather than depending on callback cache.
- ChangeSet Output manual proof covers same-ChangeSet multiple packages, different ChangeSets reusing one archive path/name, selector restoration, pre-Prepare transient failure without Output attribution, Refresh X completing after selection moves to Y, and late ChatGPT event isolation. Output buffers remain session-only and are not ledger/persistence proof.
- Node DOM regression loads the real `chatgpt-adapter.js` with a minimal fake DOM and proves: same-turn sibling `.diff` file-card → confirmation; broad generic `article` spanning neighboring authored turns → no cross-turn confirmation; ordinary `.diff` message text → no attachment proof. `run-tests.cmd` executes this regression as part of the standard suite.
- extension tab-agent lifecycle proof requires one injector owner (background only), session-scoped runtime generation, per-tab agent-instance fencing, replaceable same-document agent disposal and invalid-context heartbeat shutdown. Manual proof first refreshes once when migrating from a pre-`0.2.11` tab agent, then reloads the unpacked current extension while that bound tab remains open and a task is Pending; it requires fresh injection/claim without another page refresh and no repeated `Extension context invalidated` loop. Transparent continuation of an already `Preparing`/possible-Send interaction across reload/tab close remains deferred; existing truth-preserving terminal/uncertain states are still the acceptance boundary.
- a second unrelated attachment added after ReviewDiff upload-ready remains an explicitly accepted/deferred composer-integrity risk; current automated proof does not claim single-attachment ownership through click.
- accepted prepared-rebind concurrency risk: manual Bind/Unbind after background Execute starts may be overwritten by the previously authorized post-success prepared destination; no automated acceptance claim serializes this window in the current ChangeSet.
- accepted CLI divergence: non-interactive `apply --action-file` cannot obtain Swing keep/rebind/cancel authorization; on an existing-binding conflict it keeps the existing binding/no action-driven rebind. Automated Core compatibility proof may retain that behavior, but it is not evidence of interactive rebind authorization.

Revisit automated E2E only if repeated practical proof becomes materially expensive/unreliable and a real automation route can prove the same outcomes without excessive brittleness.
