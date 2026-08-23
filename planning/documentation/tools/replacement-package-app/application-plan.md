# Replacement Package App — Application Plan

Status: selected target plan / implementation pending
Profile: Modular / Medium SDS
Direction: `DIR-REPLACEMENT-PACKAGE-APP`

## Planning State

| Step | State | Current owner/result |
|---|---|---|
| Step 0 — Why / Solution Discovery | reviewed for the existing application responsibility | The local Replacement Package App remains the selected solution responsibility; this revision changes application behavior, not the overall solution choice. |
| Step 1 — Scenario | selected target | [`scenarios/`](scenarios/) + shared DATA/Behavior/Requirements below |
| Step 2 — Domain | selected target working model | [`domain-draft.md`](domain-draft.md) |
| Step 3 — Slices / Realization | selected target + explicit current realization | [`slices.md`](slices.md) |
| Step 4 — Practical Realization Feedback | target proof planned; current evidence remains separate | [`testing-plan.md`](testing-plan.md), automated tests, [`MANUAL-ACCEPTANCE.md`](MANUAL-ACCEPTANCE.md) |

Planning may describe selected target behavior before code exists. Downstream implementation/contracts must distinguish **current implementation** from **selected target** and must not claim target proof until it exists.

## Step 0 — Application Responsibility

Replacement Package App is a local Java 21/Swing application responsible for:
- applying deterministic replacement packages to explicitly registered local Git repositories;
- keeping one logical ChangeSet coherent across package continuations, current-change inspection and publication/recovery;
- letting the user find/open existing work across registered repositories;
- exporting portable Local/Committed repository context;
- optionally handing exact repository/change context to ordinary ChatGPT conversations through a local browser companion;
- reporting meaningful operation outcomes without turning notifications/navigation into repository-operation authority.

Producer command semantics remain outside the application. Git commands, persistence records, UI widgets and browser task mechanics remain downstream realization unless a Scenario/Domain rule explicitly depends on their meaning.

## Step 1 — Target Scenario Inventory

| Scenario | Need / motivation | Independently meaningful observable result | Target implementation status |
|---|---|---|---|
| [`SCN-RPKG-COMPLETE-REPOSITORY-WORK`](scenarios/SCN-RPKG-COMPLETE-REPOSITORY-WORK.md) | Safely bring prepared work into the correct local repository and finish that logical work without losing/capturing unrelated work. | Intended work is applied and either finalized/published or left in a truthful recoverable publication-pending state; unrelated work is preserved. | current Scenario partly implemented; selected target expands Apply/readiness/source-state behavior |
| [`SCN-RPKG-FIND-EXISTING-WORK`](scenarios/SCN-RPKG-FIND-EXISTING-WORK.md) | Understand what repository work already exists across registered repositories and open the work the user wants to continue. | The selected ChangeSet and its exact concrete Repository Target become the current work context, or an unavailable target is shown truthfully. | selected target; not implemented as a repository-independent work surface |
| [`SCN-RPKG-PROVIDE-CURRENT-CHANGE`](scenarios/SCN-RPKG-PROVIDE-CURRENT-CHANGE.md) | Give the intended ChatGPT conversation the exact current change for one logical work item without manual large-diff handling. | The exact current change reaches the intended conversation once, or a truthful safe/failed/uncertain/cancelled result is retained without changing repository-work authority. | core delivery exists; selected target adds common External Interaction management |
| [`SCN-RPKG-PROVIDE-REPOSITORY-CONTEXT`](scenarios/SCN-RPKG-PROVIDE-REPOSITORY-CONTEXT.md) | Produce exact portable repository context and optionally make it ready in the intended ChatGPT conversation without changing repository work. | A valid Repository Snapshot exists; optional attachment is ready in the intended conversation and is never auto-sent. | current export/attach exists; selected target adds readiness/common interaction management |

Scenario identity remains bidirectionally independent from Slice identity. A new/changed UI, operation, recovery branch or implementation Slice is not a Scenario unless it has its own real-life Need/result; a Scenario change does not mechanically require a new Slice.

## Shared Scenario DATA

These are user/scenario-relevant meanings, not Java DTO/persistence schemas.

| DATA | Meaning |
|---|---|
| `DATA-RPKG-REPOSITORY-TARGET` | One concrete registered local repository target with stable target identity. |
| `DATA-RPKG-REPOSITORY-IDENTITY` | Logical GitHub repository identity such as `github:owner/repo`; several concrete targets/clones may share it. |
| `DATA-RPKG-REPOSITORY-LOCATION` | Mutable local filesystem location of one stable Repository Target. |
| `DATA-RPKG-REPLACEMENT-PACKAGE` | Prepared immutable change input/provenance for creating or continuing logical work. |
| `DATA-RPKG-CHANGESET` | One logical repository-work item with stable identity, readable label and publication lifecycle. |
| `DATA-RPKG-APPLICABILITY` | Whether the requested transition can be performed safely now; includes blocking reason when not. |
| `DATA-RPKG-CURRENT-CHANGE` | Current cumulative work belonging to one ChangeSet. |
| `DATA-RPKG-REPOSITORY-SNAPSHOT` | Exact portable repository-context artifact. |
| `DATA-RPKG-CHAT-CONVERSATION` | Intended ordinary ChatGPT destination. |
| `DATA-RPKG-EXTERNAL-INTERACTION` | One user-significant attempt to transfer one exact payload/artifact to one exact ChatGPT conversation. |
| `DATA-RPKG-USER-OPERATION` | Application-process record for a meaningful explicit user operation whose terminal outcome matters; not a Domain aggregate. |
| `DATA-RPKG-OPERATION-RESULT` | Semantic success/failure/action-required/uncertain result, concise reason and link to session diagnostics when relevant. |

`ApplicationAttempt`, JSON filenames, Git index, commit graph, task leases/tab IDs and hash fields remain downstream realization unless a Scenario requires their meaning directly.

## Shared Behavior Items

### `BI-RPKG-REVALIDATE-TARGET`
Repository operations capture/resolve one exact Repository Target and revalidate that exact target at invocation/execution time rather than trusting mutable UI selection.

### `BI-RPKG-PASSIVE-PACKAGE-INPUT`
Supplying/pasting/selecting a package or OBS-ACTION is passive. Repository resolution/applicability/mutation authority starts only when the user explicitly invokes Apply.

### `BI-RPKG-APPLY-TARGET-RESOLUTION`
At Apply time:
- `PACKAGE.json.changeSetId` is the exact logical-work identity. If that exact ChangeSet exists and is Active, only that ChangeSet may be continued; current UI selection, label, recency or another Active ChangeSet in the repository cannot substitute for it. If the exact ID is Finalized, Apply blocks and explicit Reopen is required before a later continuation package;
- continuation of an existing ChangeSet uses that ChangeSet's stored concrete Repository Target as authority;
- for new work, a matching current target is kept, exactly one other matching registered target may be selected automatically, several matching clones require concrete user selection, and no match blocks before mutation;
- automatic context switch remains selected even if later preflight fails;
- package Repository Identity never silently re-homes an existing ChangeSet.

### `BI-RPKG-PRESERVE-OTHER-WORK`
One logical work item must not silently adopt, commit, overwrite or release another unfinished work item's paths or unrelated local changes. Exclusive ownership is scoped by **concrete Repository Target + repository-relative path**, not by relative path globally and not by Repository Identity alone.

### `BI-RPKG-EXPECTED-SOURCE-STATE`
For `replace`/`delete`, Apply proves that the current touched content still represents the source state from which the package was prepared:

```text
raw expected-base bytes == actual bytes
→ source match

otherwise compare expected-base and actual content
through this repository/path's Git clean/filter semantics
→ Git-equivalent: source match
→ different: source changed, block
→ cannot verify safely: block
```

No global LF/CRLF replacement and no separate `tracked?` semantic prerequisite is selected. `add` continues to use path-absence/adoptability rules. Local Snapshot is the normal way to intentionally give the producer current manual/local content, but it does not replace Apply-time freshness proof.

### `BI-RPKG-REPOSITORY-LOCATION`
`Repository Target identity ≠ filesystem location`. `Change Repository Location` is an explicit operation/button: require a valid Git work tree and matching Repository Identity/origin, then update the mutable location while preserving Target ID and all ChangeSet associations. Automatic clone substitution is forbidden.

### `BI-RPKG-REPOSITORY-READY`
When an operation genuinely requires committed baseline/HEAD/ref semantics and the Git repository has no first commit, report `Repository Not Ready` with actionable guidance to create an initial commit and retry; do not invent an empty-tree fallback.

### `BI-RPKG-GLOBAL-WORK-NAVIGATION`
A repository-independent work projection lets the user find/open persisted work. It is navigation/query state only and never becomes mutation authority. Default visibility contains unfinished work only: Active + Publication Pending. `Show History` adds all Finalized records. Within unfinished work, error-marked items sort first and the remainder sorts by recent activity; an error never pulls Finalized history into the default list.

### `BI-RPKG-LAST-CHANGESET-OUTCOME`
For Active or Publication Pending work, persist a compact latest relevant outcome summary (`success/failure`, concise reason, timestamp) for the unfinished-work error marker. Latest failure shows the marker/reason and a later relevant success clears it. Finalized history does not carry a persistent ChangeSet error marker; in particular, a failed Reopen remains Finalized and is surfaced through the operation result, Windows notification and diagnostics.

### `BI-RPKG-REOPEN-FINALIZED-CHANGESET`
A Finalized ChangeSet may be returned to Active only through an explicit user recovery action. Reopen preserves the same ChangeSet identity and historical finalization evidence, revalidates the exact Repository Target and may reacquire the ChangeSet's historical paths only when no unfinished sibling owns them and no unrelated dirty/unowned state would be silently adopted. Any conflict blocks before lifecycle/ownership mutation. Reopen never occurs implicitly from package Apply or history selection. A failed Reopen leaves the ChangeSet Finalized, emits the normal failed-operation notification/result/diagnostics and does not create a persistent ChangeSet error marker.

### `BI-RPKG-EXTERNAL-INTERACTION`
External Interaction is user-significant payload-to-conversation work, not pairing/heartbeat/claim/lease/tab mechanics. The application exposes a common interaction list with selection/state and Cancel when truthful.

Cancel semantics:
- before external preparation: `Cancelled`, no further automation;
- prepared unsent content: `Cancelled — prepared content retained`; do not automatically delete composer text/attachment and do not continue/send;
- once Send may have happened, preserve truthful `Sent`/uncertain outcome rather than rewriting it to `Cancelled`.

The user-facing interaction list is a current/actionable projection, not a terminal-attempt history. Show interactions that can still progress/cancel plus `UnknownAfterSend` (or equivalent uncertainty that still requires attention). Ordinary terminal `Cancelled`, `Sent`, `Attached`, `NoChanges`, `FailedBeforeSend` and `PreparedUnsent` results leave this list after their result is surfaced through Output/notification. Technical terminal/tombstone state may persist only where recovery, uncertainty, idempotency or duplicate prevention requires it. A later user retry is a new External Interaction; a cancelled interaction is never restored/reused.

### `BI-RPKG-CURRENT-CHANGE-DELIVERY-PREPARATION`
Current-change delivery must be able to prepare the intended ChatGPT composer without requiring the ChatGPT document/tab to be foreground-focused and without depending on browser Clipboard API write permission. The selected realization direction is direct composer/editor insertion through the ChatGPT DOM adapter for ReviewDiff text of any size, followed by verification that the expected content is actually prepared.

Delivery state follows externally meaningful evidence:
- before confirmed composer mutation, failure is `FailedBeforeSend`;
- only after the expected ReviewDiff is confirmed prepared may the interaction enter `Preparing`;
- failure after confirmed preparation but before possible Send is `PreparedUnsent`;
- after `SendClicked`, unconfirmed delivery remains `UnknownAfterSend`.

No size-threshold/native-large-paste attachment branch is selected up front. If practical evidence later establishes a real ChatGPT composer size limit, an explicit fallback may be designed separately.

### `BI-RPKG-OPERATION-NOTIFICATION`
Track meaningful nontrivial user operations, including Apply, Finalize, Retry Push, explicit Reopen ChangeSet, Repository Snapshot export, ChatGPT handoff interactions and Change Repository Location. Terminal success always produces a simple Windows notification; failure/action-required always produces a notification with concise reason. Passive navigation and trivial Copy/Open actions are excluded.

Notification click opens/foregrounds the application and, when the result has a Repository Target, selects that exact repository context only. It does not auto-select a ChangeSet and never retries/mutates/finalizes.

### `BI-RPKG-TECHNICAL-DIAGNOSTICS`
Semantic result is concise and authoritative. Complete useful non-secret technical command/error detail is separately accessible in a clean copyable/PowerShell-friendly session diagnostic surface. Diagnostics never gate Apply/Finalize/Retry or become operation authority.

## Shared Requirements

- `REQ-RPKG-01` — no target-file mutation before all required package/repository/path/source-state preconditions pass.
- `REQ-RPKG-02` — unfinished path ownership is scoped by concrete Repository Target + repository-relative path.
- `REQ-RPKG-03` — independent work receives independent ChangeSet identity; `PACKAGE.json.changeSetId` is the exact continuation identity and UI selection/label/recency cannot substitute another ChangeSet.
- `REQ-RPKG-04` — user-visible inspection actions are not Finalize approval gates and no user SHA entry is required.
- `REQ-RPKG-05` — finalization commits only selected logical work and releases ownership only when truly Finalized.
- `REQ-RPKG-06` — successful local commit followed by publication failure preserves one recoverable Publication Pending logical work item.
- `REQ-RPKG-07` — repository snapshot export is read-only relative to repository work and does not become ledger/mutation authority.
- `REQ-RPKG-08` — snapshot attachment never auto-sends the ChatGPT message.
- `REQ-RPKG-09` — current-change delivery must not blindly duplicate send after post-Send uncertainty.
- `REQ-RPKG-10` — real Swing/Windows/Edge/ChatGPT behavior requires manual practical evidence; automated bridge/component tests alone do not establish live-browser success.
- `REQ-RPKG-11` — Git-controlled representation differences must not cause false source-state mismatch, while true source change or unverifiable equivalence blocks before mutation.
- `REQ-RPKG-12` — Repository Target identity survives explicit repository-location change; all associated ChangeSets remain attached to that target.
- `REQ-RPKG-13` — existing-work discovery is repository-independent navigation and cannot silently substitute another concrete clone for an unavailable target.
- `REQ-RPKG-14` — External Interaction cancellation never implies automatic cleanup of already-prepared external content and never rewrites possible-send uncertainty.
- `REQ-RPKG-15` — tracked meaningful User Operations notify on terminal success/failure; notification navigation has no operation authority.
- `REQ-RPKG-16` — a compact latest ChangeSet-linked operation outcome survives restart for error-marker/reason presentation without requiring a generic persistent operation-history list.
- `REQ-RPKG-17` — baseline/ref-dependent operations report actionable Repository Not Ready when no first commit exists.
- `REQ-RPKG-18` — explicit Reopen may transition a selected Finalized ChangeSet back to Active without changing its identity/history, but only after exact-target revalidation and safe path-ownership/unowned-work checks; no implicit reopen is allowed.
- `REQ-RPKG-19` — current-change preparation must not require foreground/document focus or successful Clipboard API write; `Preparing` is reached only after the intended ReviewDiff has actually been prepared in the composer.
- `REQ-RPKG-20` — External Interactions terminal ordinary results do not accumulate in the user-facing list; a retry creates a new interaction identity, while uncertainty requiring attention remains visible.

## Current Implementation Divergences / Target Work

| ID | Current finding | Selected target | Priority / Slice |
|---|---|---|---|
| `P-RPKG-OWNERSHIP-SCOPE` | Core can conflict equal relative paths across different repositories. | Scope ownership by concrete Repository Target. | P0 / SL-01 |
| `P-RPKG-BASE-MISMATCH` | Current raw-byte base comparison false-fails Git-equivalent checkout representations. | Raw exact match or Git path-semantic equivalence; different/unverifiable source blocks. | P0 / SL-01 |
| `P-RPKG-MANUAL-PACKAGE-TARGETING` | Apply assumes repository context is selected first. | Package input passive; resolve concrete target on Apply. | P0 / SL-01 |
| `P-RPKG-BROWSER-ACCEPTANCE` | Bridge/state-machine tests do not prove live Edge/ChatGPT operation. | Manual practical evidence remains required. | P0 proof / SL-05,06,08 |
| `P-RPKG-UNBORN-LOW-LEVEL-ERROR` | Missing first commit can surface low-level HEAD/Git failure. | Repository Not Ready with initial-commit guidance when baseline/ref is required. | P1 / SL-01,04 |
| `P-RPKG-NO-GLOBAL-WORK-DISCOVERY` | ChangeSet navigation is repository-first. | Global persisted work projection + exact work opening. | P0 / SL-07 |
| `P-RPKG-NO-REPOSITORY-LOCATION-EDIT` | Registered target path cannot be explicitly changed while preserving target identity/work. | Dedicated Change Repository Location action. | P1 behavior |
| `P-RPKG-BROWSER-UNFOCUSED-PREPARATION` | Live Edge evidence shows Clipboard API ReviewDiff preparation can fail with `Document is not focused`, and current staging can then overstate `PreparedUnsent` before composer mutation. | Direct composer/editor insertion independent of foreground focus; confirm preparation before `Preparing`. | P0 practical correction / SL-06 |
| `P-RPKG-NO-UNIFIED-EXTENSION-INTERACTION-LIST` | Bridge tasks are implementation mechanics, not one user-facing interaction surface; terminal cancelled attempts can accumulate as useless list history. | Semantic current/actionable External Interaction list + truthful Cancel; ordinary terminal results leave the list and retries create new interactions. | P1 / SL-08 |
| `P-RPKG-NO-OPERATION-NOTIFICATIONS` | No Windows terminal-result notification layer. | Notify tracked operations on every terminal success/failure. | P1 / SL-09 |
| `P-RPKG-NO-DEDICATED-DIAGNOSTIC-SURFACE` | Existing Output/Copy is not the selected clean technical diagnostic surface. | Cross-Slice session diagnostic surface. | P1 behavior |
| `P-RPKG-NO-FINALIZED-REOPEN` | Current lifecycle treats Finalized as terminal in normal UI; no explicit recovery action returns the same logical ChangeSet to Active. | `Reopen ChangeSet` on explicitly selected Finalized history work, with exact-target + ownership/unowned-work safety guards. | P1 / SL-03 + SL-07 entry |

## Accepted Low-Frequency Implementation Risks

These are known implementation-hardening risks, not blockers for the current revision:

- `R-RPKG-SL01-PACKAGE-RE-READ` — current Apply realization may resolve target/work from one ZIP read and read the package again for actual Apply, including after explicit choice among same-identity Repository Targets. An externally replaced ZIP in that short interval could differ from the resolved input. Accepted for now; future hardening is one captured immutable/prepared Apply context or an exact package fingerprint recheck before mutation.
- `R-RPKG-SL07-REMOVED-TARGET-HISTORY` — Finalized history can retain a Repository Target association after that target is removed from the registry; the current query path may fail instead of projecting a truthful unavailable row. Accepted for now; future hardening is a nullable/query target lookup separated from strict operational lookup.

## Selected Engineering Direction / Proof Requirement

No product/UX question remains open in this revision.

Source-state equivalence implementation is selected to use Git's own path semantics rather than manual newline conversion. The target architecture should first accept raw equality, then use a binary-safe Git operation equivalent to `git hash-object --stdin --path=<repo-relative-path>` for expected and actual content and compare the resulting canonical blob identities. Failure to establish equivalence fails closed. Automated integration proof must cover `.gitattributes`, `core.autocrlf`, custom filters, binary content, dirty/manual changes and continuation ChangeSets before implementation is accepted.

## Current Conclusions

- Four user-world Scenarios define target application meaning; explicit Finalized→Active Reopen is a recovery branch inside Complete Repository Work, not a fifth Scenario.
- `Repository Work` remains the strong core aggregate candidate; `External Interaction` is a second strong integration aggregate candidate; `User Operation` remains Application process/outcome state.
- Current code still realizes six Slices; target planning adds SL-07/08/09 and expands selected existing Slices without pretending implementation already exists.
- Testing remains automated component/integration proof plus Manual Practical Testing; no full Swing/Edge browser E2E layer is selected.
