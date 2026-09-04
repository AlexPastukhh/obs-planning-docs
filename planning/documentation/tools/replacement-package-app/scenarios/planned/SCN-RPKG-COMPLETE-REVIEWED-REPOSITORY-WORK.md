# SCN-RPKG-COMPLETE-REVIEWED-REPOSITORY-WORK — Complete Reviewed Repository Work

Status: planned future Scenario owner

This owner defines selected future application behavior only. It is not evidence that reviewed-result confirmation, integration PR handling, target integration or final Issue completion are implemented, and it does not preselect the future Domain/Slice owner for those requirements.

## Application Benefit / Desired Result

Realize one exact already-reviewed replacement package in the exact repository work, preserve durable work identity and truthful recovery state, prove that the published repository result is exactly the reviewed result, and—when explicitly requested—integrate only that approved result and close the durable work record.

The ordinary route must not require the user to manually reconstruct internal Git stages. Manual/advanced continuation remains available, but it must use the same behavioral authority and recovery truth.

The reviewed handoff may arrive through the existing/manual transport or through an additional one-click local-action transport. Both transports enter the same semantic Apply Package intake and must not create transport-specific repository mutation semantics.

## Process Specification

### Scenario Process / Feature Interaction Map

```text
reviewed Builder handoff
├─ existing/manual transport
│    OBS-ACTION/1 + exact archive
│
└─ local-action transport
     LOCAL-ACTION/1
     command = replacement.applyPackage
     → explicit local activation
     → rpkg://handoff/<opaque-token>
          ↓
same semantic reviewed-handoff intake
↓
FI-RPKG-ESTABLISH-REPOSITORY-WORK-INTENT
↓
FI-RPKG-REALIZE-REVIEWED-PACKAGE
├─ Apply Only → Applied / uncommitted → STOP
└─ publication requested
     ↓
   published exact revision
     ↓
FI-RPKG-CONFIRM-REVIEWED-PUBLISHED-REVISION
├─ Apply And Publish → reviewed published result confirmed → STOP pre-integration
└─ Apply And Finalize
     ↓
FI-RPKG-ENSURE-INTEGRATION-PULL-REQUEST
↓
FI-RPKG-FINALIZE-REVIEWED-WORK
├─ integrated unchanged reviewed result
│    ↓
│  Final Work Record persisted
│    ↓
│  managed Issue closed
│    ↓
│  Finalized
└─ integration/reconciliation would change reviewed result
     ↓
   approval becomes stale
     ↓
   return to correction/review flow
```

### Handoff entry transport extension

Handoff transport is orthogonal to Scenario/FI decomposition. The selected extension adds a one-click local activation path while preserving the existing `OBS-ACTION/1 + archive` path.

```text
existing/manual transport
OBS-ACTION/1 + exact archive
        \
         → same reviewed semantic handoff
        /
local-action transport
LOCAL-ACTION/1
→ external Local Actions surface
→ explicit user activation
→ rpkg://handoff/<opaque-token>
```

The generic Local Actions surface, including any Tampermonkey/Shadow-DOM presentation, is outside Replacement Package App Scenario authority. Its role is to present/transport a machine-readable action, not to authorize repository mutation independently.

For the selected replacement-package action, the machine-readable handoff identifies semantic command `replacement.applyPackage` and authoritative arguments / exact artifact identity. Human-facing `display` metadata is presentation only.

The selected Windows activation shape is deliberately narrow:

```text
rpkg://handoff/<opaque-token>
```

The URI does not expose a generic execute/shell/path surface. The token is only an external handoff-resolution identity. Any `rpkg://` activation is treated as untrusted external input: the application must strictly parse the allowed shape, resolve the exact staged handoff/package, validate it, and then enter the same existing semantic command / package validation pipeline used by the established transport.

A repeated click, browser retry, URI relaunch or secondary process activation must not create a second logical Apply authority. Existing package/ChangeSet identity and recovery semantics remain authoritative.

Behavior Items:

#### BI-RPKG-HANDOFF-TRANSPORT-ADDITIVE — Local Action extends rather than replaces existing handoff
Requirement:
The local-action/URI transport must be added without removing or invalidating the existing `OBS-ACTION/1 + archive` transport.

Reason:
One-click activation is an additional handoff convenience, not a replacement of the established intake contract.

#### BI-RPKG-HANDOFF-TRANSPORT-SAME-SEMANTICS — All handoff transports enter one Apply authority
Requirement:
Regardless of transport, the resolved reviewed handoff must enter the same `replacement.applyPackage` semantic command, identity checks, route selection, package validation and recovery behavior.

Reason:
Transport choice must not create an alternative repository mutation mechanism.

#### BI-RPKG-URI-HANDOFF-STRICT-SHAPE — URI activation is a narrow handoff entry
Requirement:
The selected URI activation surface must accept only the product-owned handoff shape equivalent to `rpkg://handoff/<opaque-token>` and must not expose arbitrary command execution, shell invocation or arbitrary local-path execution.

Reason:
A custom URI can be invoked by callers other than the intended browser helper and must not become a generic local execution surface.

#### BI-RPKG-URI-HANDOFF-UNTRUSTED-INPUT — External URI input never bypasses application validation
Requirement:
Receipt of an `rpkg://` activation must not itself prove package validity, repository applicability or authorization to mutate repository state. The resolved handoff/package must pass the normal strict application validation before repository mutation.

Reason:
Browser/Tampermonkey/Windows activation transports are not repository authority.

#### BI-RPKG-HANDOFF-ACTIVATION-REPLAY-SAFE — Repeated activation uses existing logical-work recovery
Requirement:
Repeated activation of the same exact handoff must resolve to the same package/ChangeSet work and use existing idempotency/recovery truth rather than starting independent duplicate Apply execution.

Reason:
Double-clicks, browser retries, cold/warm activation races and secondary-process launches are ordinary transport failure/retry modes.

#### BI-RPKG-LOCAL-ACTION-DISPLAY-NONAUTHORITATIVE — Display metadata does not drive Apply
Requirement:
Local-action presentation metadata must not determine semantic command dispatch, package identity, Repository Target, target branch or other authoritative Apply input.

Reason:
Presentation may change independently of the exact action being executed.


Optional pre-publish support interaction:

```text
Copy Diff
```

`Copy Diff` is available only while exact local ChangeSet work is known not to be published. It copies a Git-derived diff to the clipboard for inspection/manual continuation; it is not semantic approval, does not attach/send anything to ChatGPT, and is not required by the ordinary reviewed-result route.

### Command composition routes

Commands are user entry/composition surfaces; Feature Interactions are semantic behavioral units. A command may stop inside one FI or compose several FIs without creating different repository semantics.

#### Route — Apply Only

```text
Apply Only
→ establish/resume exact Work Intent and repository work
→ apply exact reviewed package against exact expected source
→ stop with exact applied/uncommitted state
```

This route deliberately does not commit, publish, create an integration PR, integrate, write the Final Work Record or close the Issue. While the exact applied work is still known to be unpublished, the user may invoke `Copy Diff` as a local support action before later manual continuation.

#### Route — Apply And Publish

```text
Apply And Publish
→ everything required to realize the exact reviewed package
→ commit
→ publish
→ prove actual published result == reviewed predicted result
→ stop before integration
```

This route deliberately stops **pre-integration**. It does not require an integration PR to exist merely to report successful publication/reviewed-result confirmation.

#### Route — Apply And Finalize

```text
Apply And Finalize
→ everything required by Apply And Publish
→ ensure one correct/current integration PR when the selected integration route needs one
→ integrate only the currently approved reviewed result
→ prove final target result preserves the reviewed content
→ append `## Final Work Record` to the exact managed Issue
→ close that Issue
→ Finalized
```

This is the explicit end-to-end route. It must satisfy the same exact source, published-result identity and integration preconditions as modular/manual continuation; convenience composition cannot weaken correctness.

#### Manual / advanced continuation

Manual controls may enter/resume individual stages such as Apply, `Copy Diff`, Commit, Publish, reviewed-result verification, PR/integration and Finalize. `Copy Diff` is a local clipboard support action available only in exact states where the current package work is known not to be published; it does not create a delivery/review route. These controls do not create separate Scenario meaning. Any retry or continuation resumes from the latest proven persisted Scenario truth rather than restarting established side effects.

### Cross-FI Behavior Items — route composition

#### BI-RPKG-COMPOSED-AND-MODULAR-ROUTES-SHARE-SEMANTICS — Composed and modular routes share one authority
Requirement:
Composed and modular routes must invoke the same authoritative behavior, identity checks, state transitions and recovery rules rather than implementing different meanings for the same repository work.

Reason:
Convenience must not make repository correctness route-dependent.

#### BI-RPKG-COMMANDS-DO-NOT-DEFINE-FI-BOUNDARIES — Commands do not define Feature Interaction boundaries
Requirement:
The existence of a separately invokable command must not by itself create a separate Feature Interaction, and one composed command may cross several Feature Interaction boundaries.

Reason:
Feature Interactions decompose Scenario behavior; commands are interaction/composition entries.

#### BI-RPKG-COMPOSED-RETRY-RESUMES-ACROSS-FIS — Retry resumes across established Feature Interactions
Requirement:
Retrying a composed route must continue from the latest proven persisted Scenario state, including unsatisfied later FIs, rather than restarting already-established earlier behavior.

Reason:
A later failure must not force the user to recreate earlier successful repository work.

#### BI-RPKG-APPLY-ONLY-STOPS-UNCOMMITTED — Apply Only stops after exact application
Requirement:
`Apply Only` must stop after the exact reviewed package is applied and represented as truthful applied/uncommitted work; it must not implicitly commit, publish or integrate.

Reason:
Apply-only is an intentional mutation boundary for inspection/recovery/manual continuation.

#### BI-RPKG-APPLY-AND-PUBLISH-STOPS-PRE-INTEGRATION — Apply And Publish stops after reviewed-result confirmation
Requirement:
`Apply And Publish` must stop after the exact published repository result is proven equal to the reviewed predicted result; it must not implicitly integrate into the target branch, write the final work record or close the Issue.

Reason:
Publishing reviewed work and integrating/finalizing it are distinct user-authorized completion boundaries.

#### BI-RPKG-APPLY-AND-FINALIZE-USES-SAME-PRECONDITIONS — Apply And Finalize uses the same exact preconditions
Requirement:
`Apply And Finalize` may compose end-to-end completion, but it must satisfy the same package/source/result/integration preconditions required by the equivalent modular continuation.

Reason:
One-command completion must not weaken correctness or approval boundaries.

---

### FI-RPKG-ESTABLISH-REPOSITORY-WORK-INTENT — Establish durable repository-work identity

Scenario Role / Local Purpose:
Ensure one durable semantic repository-work identity exists independently of transient Builder/Chat invocation state.

Context / Preconditions:
A reviewed handoff identifies the repository, logical `changeSetId` and Work Intent.

Required Inputs:
Repository identity, `changeSetId`, Title, Goal, Why and Acceptance.

Interaction Process:
The application resolves the exact Repository Target and ensures one exact managed Issue represents the logical work. Existing exact work is resumed; conflicting/ambiguous identity fails closed.

Outcomes:
- one exact durable Work Intent exists → continue;
- identity conflict/unverifiable target → no repository mutation.

Result:
One durable Work Intent / managed Issue identity exists for the exact logical work.

Outputs:
Exact logical work identity and managed Issue reference.

Next Interactions:
`FI-RPKG-REALIZE-REVIEWED-PACKAGE`.

Behavior Items:

This FI preserves the current Scenario definitions:
- [`BI-RPKG-WORK-INTENT-ONE-EXACT-ISSUE`](../SCN-RPKG-COMPLETE-REPOSITORY-WORK.md#bi-rpkg-work-intent-one-exact-issue--one-exact-managed-issue)
- [`BI-RPKG-WORK-INTENT-DURABLE`](../SCN-RPKG-COMPLETE-REPOSITORY-WORK.md#bi-rpkg-work-intent-durable--work-intent-survives-interruption)

---

### FI-RPKG-REALIZE-REVIEWED-PACKAGE — Realize exact reviewed package

Scenario Role / Local Purpose:
Progress one exact reviewed package from its exact expected source to the route-requested realization boundary while preserving truthful recovery state.

Context / Preconditions:
Exact repository work and Work Intent are established; the package identifies exact operations and expected source.

Required Inputs:
Exact reviewed package, exact expected source, exact repository work and selected route.

Interaction Process:
The application proves the package/source/work identity before relevant mutation, applies the exact package, and then stops or continues according to the selected route. If commit/publication is requested, already-established stages are proven and resumed rather than blindly repeated. Uncertain external publication is reconciled before later package work proceeds.

Outcomes:
- `Apply Only` → exact applied/uncommitted result;
- publication route → exact published revision;
- deterministic fail-closed source/identity result;
- truthful recoverable/uncertain partial state.

Result:
The exact reviewed package is realized up to the requested route boundary without losing established repository truth.

Outputs:
Exact applied/published result identity and recovery state needed by later interactions.

Next Interactions:
Apply Only → terminal pre-publication result. Publication route → `FI-RPKG-CONFIRM-REVIEWED-PUBLISHED-REVISION`.

Behavior Items:

#### BI-RPKG-APPLY-EXACT-REPOSITORY-TARGET — Execute only against the exact Repository Target
Requirement:
Repository mutation must remain bound to the exact registered Repository Target selected for this work.

Reason:
Repository identity alone does not identify one concrete local work target.

#### BI-RPKG-APPLY-EXACT-PACKAGE — Realize only the exact reviewed package
Requirement:
Repository-file mutation must use the exact reviewed package operations and payload bytes rather than an equivalent reconstruction.

Reason:
The reviewed package/result identity is the approval input.

#### BI-RPKG-APPLY-EXACT-EXPECTED-SOURCE — Prove expected source before mutation
Requirement:
Each source-sensitive package operation must prove the exact expected source/equivalent protocol state before replacing or deleting content.

Reason:
A reviewed package must not overwrite source state it was not reviewed against.

#### BI-RPKG-ORDINARY-APPLY-COMPOSES-INTERNAL-ACTIONS — Ordinary routes compose internal actions
Requirement:
The ordinary composed routes must not require the user to manually reproduce internal workspace/apply/commit/publish stages needed for the requested route boundary.

Reason:
Internal orchestration is not the application Benefit.

#### BI-RPKG-RETRY-RESUMES — Retry resumes proven work
Requirement:
Retry/continuation must prove established effects and resume from the latest known state instead of restarting the logical package operation.

Reason:
Repository/Git/remote effects can cross durable boundaries.

#### BI-RPKG-PARTIAL-STATE-TRUTHFUL — Partial execution remains truthful
Requirement:
If an earlier stage succeeds and a later stage fails, the successful state must remain visible/persisted rather than being represented as if it never happened.

Reason:
Safe recovery depends on exact established truth.

#### BI-RPKG-NO-NEXT-PACKAGE-WHILE-PUBLICATION-UNCERTAIN — Publication uncertainty blocks the next package
Requirement:
When publication outcome is uncertain, no later package may proceed until exact remote publication truth is reconciled.

Reason:
The expected source for later work cannot be known until the previous publication boundary is known.

---

### FI-RPKG-CONFIRM-REVIEWED-PUBLISHED-REVISION — Confirm published result equals reviewed result

Scenario Role / Local Purpose:
Turn exact published repository truth into consumer-side proof that the published result is exactly what was semantically reviewed before Apply.

Context / Preconditions:
The reviewed package/result identity is available and one exact published revision exists for the ChangeSet.

Required Inputs:
Reviewed expected-result identity and exact actual published revision/tree identity.

Interaction Process:
The application compares the authoritative actual published result with the exact reviewed predicted result and relevant execution identity. Similarity is insufficient. A mismatch preserves evidence and fails closed; it does not silently rewrite publication or invent approval.

Outcomes:
- exact equality/current identity proven → reviewed published result confirmed;
- mismatch/unprovable identity → approval unavailable, evidence preserved.

Result:
The published result is either proven to be the reviewed result or explicitly not approved.

Outputs:
Reviewed-result confirmation/currentness state.

Next Interactions:
Apply And Publish → terminal pre-integration result. Apply And Finalize → `FI-RPKG-ENSURE-INTEGRATION-PULL-REQUEST`.

Behavior Items:

#### BI-RPKG-PUBLISHED-TREE-EQUALS-REVIEWED-TREE — Published tree equals reviewed predicted tree
Requirement:
Approval may proceed only when the authoritative published repository tree/result is exactly equal to the Builder-reviewed predicted result identity.

Reason:
Semantic review occurred before real Apply; consumer confirmation closes the identity gap.

#### BI-RPKG-VERIFY-EXECUTION-IDENTITY — Verification binds the same logical work
Requirement:
Reviewed-result confirmation must bind the exact package/work/source/published identities for the same logical ChangeSet rather than comparing unrelated equal-looking trees.

Reason:
Content equality without execution identity can approve the wrong work stream.

#### BI-RPKG-NO-SECOND-SEMANTIC-REVIEW-WHEN-IDENTITY-PROVEN — Exact proof avoids a second semantic review
Requirement:
When exact reviewed-result identity is proven, the consumer must not require a second semantic review of equivalent content merely because Apply happened in the real repository.

Reason:
The Builder already reviewed the predicted result; the consumer must prove identity, not repeat the same review.

#### BI-RPKG-VERIFY-FAILS-CLOSED — Unprovable reviewed identity does not become approval
Requirement:
If exact reviewed-result identity cannot be proven, the published revision must not become approved merely because it appears similar.

Reason:
Approval is bound to exact reviewed content/result identity.

#### BI-RPKG-VERIFY-MISMATCH-PRESERVES-EVIDENCE — Mismatch preserves published evidence
Requirement:
A published revision that fails reviewed-result identity proof must remain available as exact ChangeSet evidence and must not be automatically reverted/rewritten by verification.

Reason:
Mismatch is information needed for correction/review and should not be hidden by an automatic compensating mutation.

---

### FI-RPKG-ENSURE-INTEGRATION-PULL-REQUEST — Ensure one correct integration Pull Request

Scenario Role / Local Purpose:
Ensure the integration path represents the exact currently approved ChangeSet result and intended target before integration.

Context / Preconditions:
The exact published result is currently proven equal to the reviewed result and the selected integration path requires a Pull Request.

Required Inputs:
Exact work identity, approved published revision/head and intended target branch.

Interaction Process:
The application ensures one correct/current integration Pull Request or reports a truthful blocking/recovery result. PR failure does not roll back the already-published reviewed result.

Outcomes:
- one correct/current PR exists → continue;
- create/update/currentness failure → published result preserved, no integration.

Result:
The integration route references the exact approved work and intended target.

Outputs:
Current integration PR identity/readiness.

Next Interactions:
`FI-RPKG-FINALIZE-REVIEWED-WORK`.

Behavior Items:

#### BI-RPKG-ONE-CORRECT-PR — One correct/current integration PR
Requirement:
The work must not proceed to PR-based integration with duplicate, stale or wrong-head/wrong-target Pull Request identity.

Reason:
Integration review/merge must refer to the same approved repository result.

#### BI-RPKG-PR-FAILURE-DOES-NOT-ROLL-BACK-PUBLISHED-REVISION — PR failure preserves published work
Requirement:
Failure to establish/refresh the integration PR must not erase or rewrite the already-proven published ChangeSet revision.

Reason:
PR management is a later external boundary than package publication.

#### BI-RPKG-PR-HEAD-MUST-REPRESENT-CURRENT-CHANGESET — PR head represents current approved work
Requirement:
The integration PR head/currentness must correspond to the exact currently approved ChangeSet result before integration.

Reason:
A stale PR must not authorize integration of a different result.

---

### FI-RPKG-FINALIZE-REVIEWED-WORK — Integrate approved result and close durable work

Scenario Role / Local Purpose:
Integrate only the exact currently approved reviewed result, preserve approval semantics across target movement/reconciliation, and close the logical work only after final repository truth and durable final record are proven.

Context / Preconditions:
The published result is currently approved; any required integration PR is correct/current; the target integration state can be inspected.

Required Inputs:
Approved reviewed-result identity, exact current ChangeSet result, target branch/integration context, managed Issue identity.

Interaction Process:
The application integrates only when the final target result can be proven to preserve the approved reviewed content. Target movement that does not change the reviewed result need not automatically stale approval; any reconciliation that changes the reviewed result must stale approval and return to correction/review. Only after successful integration proof is a final durable work record written and the managed Issue closed.

Outcomes:
- approved content integrated unchanged → Final Work Record persisted → Issue closed → Finalized;
- integration blocked/retryable without changing approved result;
- required reconciliation changes reviewed result → approval stale, return to correction/review.

Result:
The exact approved result is integrated and durable work is closed, or work remains open with truthful approval/recovery state.

Outputs:
Final target result identity, final work record / Issue closure state, or explicit stale/recovery state.

Next Interactions:
Finalized → terminal. Stale approval → Builder correction/review flow using the same logical work until a new reviewed result is produced.

Behavior Items:

#### BI-RPKG-FINALIZE-ONLY-APPROVED-PUBLISHED-REVISION — Integrate only a currently approved published result
Requirement:
Finalize must integrate only a published result whose reviewed-result identity is currently valid.

Reason:
Integration must not bypass semantic approval.

#### BI-RPKG-FINALIZE-PRESERVES-REVIEWED-CONTENT — Final target result preserves reviewed content
Requirement:
The final target result accepted as successful completion must contain the same reviewed ChangeSet content/result rather than a silently changed reconciliation result.

Reason:
Approval applies to the reviewed result, not merely to the intent to merge something.

#### BI-RPKG-TARGET-MOVEMENT-NOT-AUTOMATIC-STALE — Target movement alone need not stale approval
Requirement:
Movement of the target branch must not automatically invalidate approval when integration can still be proven to preserve the exact reviewed result.

Reason:
Approval is about result content/identity, not incidental target-tip identity alone.

#### BI-RPKG-CONTENT-CHANGING-RECONCILIATION-STALES-APPROVAL — Content-changing reconciliation stales approval
Requirement:
If integration requires producing a ChangeSet result different from the currently reviewed result, existing approval must become stale before that changed result can be integrated.

Reason:
A materially different result has not been semantically reviewed.

#### BI-RPKG-FINAL-WORK-RECORD-BEFORE-ISSUE-CLOSE — Persist Final Work Record before closing Issue
Requirement:
After integration is proven and before the managed Issue is closed, the application must append one final durable Issue comment headed `## Final Work Record` that identifies the completed repository work/result sufficiently for later continuity/audit.

Reason:
Closed work needs one durable completion record independent of transient application/session state.

#### BI-RPKG-FINALIZED-WORK-IS-CLOSED — Finalized work is closed logical work
Requirement:
After successful final integration/recording/Issue closure, later independent changes must use new logical work identity rather than silently extending the finalized ChangeSet.

Reason:
Completed approved work must remain a stable historical boundary.

## Supporting interaction — Copy Current Diff

Status: supporting / local pre-publish action; not a primary approval path.

Purpose:
Let the user obtain an exact Git-derived diff in the clipboard when the current ChangeSet has local package work that is known not to be published, for inspection, debugging or manual continuation without creating another Scenario or ChatGPT handoff.

The selected target has no standalone Current Change delivery Scenario and no `Send Diff to ChatGPT` behavior.

Behavior Items:

#### BI-RPKG-CURRENT-CHANGE-GIT-DERIVED — Copied diff is Git-derived
Requirement:
The copied target diff must derive from authoritative Git/workspace revision boundaries for the exact selected ChangeSet rather than recreating legacy persisted ReviewDiff/Path Ownership authority.

Reason:
Target work already has authoritative Git identity boundaries.

#### BI-RPKG-CURRENT-CHANGE-NOT-APPROVAL — Copying diff does not approve
Requirement:
Copying the diff must not create semantic approval or independently authorize Publish, integration or Finalize.

Reason:
Approval belongs to exact reviewed-result identity established by Builder review and consumer result confirmation.

#### BI-RPKG-CURRENT-CHANGE-DIAGNOSTIC — Ordinary completion does not depend on Copy Diff
Requirement:
The ordinary reviewed-result Scenario must not require `Copy Diff` or any manual Current Change handoff for semantic review.

Reason:
The reviewed result was already semantically reviewed before Apply.

#### BI-RPKG-CURRENT-CHANGE-COPY-ONLY-WHILE-UNPUBLISHED — Copy Diff is a pre-publish support boundary
Requirement:
`Copy Diff` is available only when the application can prove that the exact current local package work represented by the diff has not been published. Once publication is established, ordinary inspection/verification uses authoritative Git revision/result identity instead of a local diff-copy step.

Reason:
The support action exists for incomplete/manual application states; it must not become a second post-publish review workflow.

#### BI-RPKG-CURRENT-CHANGE-COPY-STOPS-AT-CLIPBOARD — Copy Diff has no ChatGPT delivery side effect
Requirement:
The target `Copy Diff` action must stop after placing the exact diff text in the clipboard. It must not attach a `.diff`, target a conversation or trigger browser/extension Send behavior.

Reason:
Diff copying is local support inside package realization, while reviewed-result approval and external ChatGPT delivery are separate concerns.

## Screen references

Current selected Screen owner: [`../../screens.md`](../../screens.md). Future spatial details are intentionally not selected by this planned Scenario.

## Realization Dependencies / Questions / Candidates

These entries preserve only Scenario-relevant feasibility questions. They do **not** assign future Domain/Slice/Shared ownership or create Implementation/Test Items; downstream Requirements Discovery selects durable HOW and its natural owner.

### Windows URI activation can enter the existing handoff pipeline
Relevant Scenario / FI behavior:
`BI-RPKG-HANDOFF-TRANSPORT-SAME-SEMANTICS`, `BI-RPKG-URI-HANDOFF-STRICT-SHAPE`, `BI-RPKG-URI-HANDOFF-UNTRUSTED-INPUT`, `BI-RPKG-HANDOFF-ACTIVATION-REPLAY-SAFE`.

Dependency / Question:
Can Replacement Package App register a stable Windows URI handler and receive one exact external handoff activation both when the application is stopped and when an instance is already running, without creating a second Apply authority or duplicate execution?

Current assumption / candidate realization:
Windows custom URI activation for a normal desktop application is considered feasible. Candidate realization is per-user `rpkg` protocol registration under `HKCU\Software\Classes\rpkg`, with the URL-protocol marker and `shell\open\command` targeting one stable installed application launcher. Cold launch passes the URI into application startup. If a primary application instance is already running, a secondary activation forwards the URI to that primary instance, activates/focuses the existing application as needed, and exits. The target launcher should have one stable installed path rather than depend on `java` in `PATH`, the current JDK, working directory or a development `.cmd`; a development registration command may still be useful for a spike. Exact installed-launcher packaging, registration lifecycle and local IPC mechanism remain downstream HOW.

Registration belongs to installation/setup/diagnostics rather than each Apply operation. Setup should be able to verify the effective registration; uninstall/removal must not blindly delete a registration that no longer belongs to the same installation.

Investigate during:
Application bootstrap/installation Implementation Requirements Discovery + URI activation/recovery Proof Requirements Discovery.

Scenario impact if invalidated:
The one-click local-action transport would need another local activation mechanism, but existing/manual handoff and the authoritative Apply semantics remain unchanged.

### Exact reviewed artifact can be resolved from opaque handoff activation
Relevant Scenario / FI behavior:
`BI-RPKG-HANDOFF-TRANSPORT-SAME-SEMANTICS`, `BI-RPKG-URI-HANDOFF-UNTRUSTED-INPUT`, `BI-RPKG-HANDOFF-ACTIVATION-REPLAY-SAFE`, `BI-RPKG-APPLY-EXACT-PACKAGE`.

Dependency / Question:
How does the one-click transport make the exact ChatGPT/Builder-produced package bytes plus machine-readable handoff available locally before or during `rpkg://handoff/<opaque-token>` activation, without manual archive discovery and without allowing the token to resolve to a different/later artifact?

Current assumption / candidate realization:
The external local-action transport can stage or otherwise make resolvable one exact handoff/artifact identity before activation, while the URI carries only an opaque token. The application resolves that token to exact local handoff/package material and proves package identity/fingerprint before entering the normal Apply intake. Candidate evidence may include `packageId` plus a cryptographic artifact fingerprint such as SHA-256. Exact download/staging location, completion signaling, token store and race-handling mechanism remain downstream HOW.

Investigate during:
Local handoff transport Implementation Requirements Discovery + package-intake/activation Proof Requirements Discovery.

Scenario impact if invalidated:
The one-click transport contract or activation ordering must change; existing/manual handoff remains available and Apply semantics do not change.

### Reviewed predicted-result identity can be consumed exactly
Relevant Scenario / FI behavior:
`FI-RPKG-CONFIRM-REVIEWED-PUBLISHED-REVISION`, `BI-RPKG-PUBLISHED-TREE-EQUALS-REVIEWED-TREE`.

Dependency / Question:
What exact Builder/package identity is sufficient for the consumer to derive/replay the reviewed predicted result and compare it with the authoritative published repository result without a second semantic review?

Current assumption / candidate realization:
The package/handoff can carry or deterministically derive enough immutable source/result identity for exact consumer proof. Exact representation and implementation owner remain downstream decisions.

Investigate during:
Package-protocol design + Domain/Slice Requirements Discovery + proof design.

Scenario impact if invalidated:
The confirmation FI or the no-second-review promise may need revision.

### Route state survives interruption without route-dependent semantics
Relevant Scenario / FI behavior:
All three routes and `BI-RPKG-COMPOSED-RETRY-RESUMES-ACROSS-FIS`.

Dependency / Question:
Can the consumer persist/prove enough exact execution state to distinguish applied/uncommitted, committed/unpublished, publication uncertainty, reviewed-result confirmation, integration readiness and finalization without restarting prior successful work?

Current assumption / candidate realization:
Existing current repository-work execution identity is reusable as a candidate foundation, but future owner shape is not selected here.

Investigate during:
Domain/Slice Requirements Discovery and recovery/proof design.

Scenario impact if invalidated:
Route boundaries or retry semantics may need behavioral revision.

### Integration can preserve reviewed result across target movement
Relevant Scenario / FI behavior:
`FI-RPKG-FINALIZE-REVIEWED-WORK`, target-movement and content-changing reconciliation BIs.

Dependency / Question:
Can integration distinguish harmless target movement from reconciliation that changes the reviewed ChangeSet result and deterministically stale approval only in the latter case?

Current assumption / candidate realization:
Exact Git/result identities should make this distinguishable; specific merge/rebase/update strategy and owner are deliberately unselected.

Investigate during:
Git/integration spike + Implementation Requirements Discovery + Proof Requirements Discovery.

Scenario impact if invalidated:
Finalize behavior may need a stricter user review/reapproval boundary.

### One correct integration PR can remain current to the approved result
Relevant Scenario / FI behavior:
`FI-RPKG-ENSURE-INTEGRATION-PULL-REQUEST`.

Dependency / Question:
Can PR identity/currentness be related to exact logical work, target and currently approved published result so stale/duplicate/wrong-head PRs fail closed?

Current assumption / candidate realization:
GitHub PR identity is available; exact persistence/ownership strategy is downstream HOW.

Investigate during:
Integration Slice/Domain Requirements Discovery and GitHub proof design.

Scenario impact if invalidated:
The PR FI or selected integration flow may need revision.

### Final durable work record and Issue closure are recoverable
Relevant Scenario / FI behavior:
`FI-RPKG-FINALIZE-REVIEWED-WORK`, `BI-RPKG-FINAL-WORK-RECORD-BEFORE-ISSUE-CLOSE`.

Dependency / Question:
Can final integration proof, one exact `## Final Work Record` comment and Issue closure be made idempotent/recoverable so interruption never closes work without its final record or duplicates completion semantics?

Current assumption / candidate realization:
The managed Issue is already the durable Work Intent identity; exact final-record persistence/reconciliation mechanism remains downstream HOW.

Investigate during:
Work Intent / integration Requirements Discovery + external-side-effect Proof Requirements Discovery.

Scenario impact if invalidated:
Finalization completion/closure boundary must be revised.

## Scenario Process Alternatives

No retained alternative changes the selected three-route contract. Individual UI buttons/commands may evolve as long as they preserve the same route results, FI authority and recovery semantics.

## Evolution Steps

No child Evolution Step is selected inside this planned target owner yet. Promotion to current truth happens only after implementation/proof reconciliation; the current Scenario remains canonical for implemented behavior until then.
