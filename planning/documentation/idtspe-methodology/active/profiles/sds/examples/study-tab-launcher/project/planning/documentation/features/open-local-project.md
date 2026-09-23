# F-STL-OPEN-LOCAL-PROJECT — Resolve and open one local project source

Status: current realized Feature owner for repository version 0.15.0. Automated
coverage exists; live Tampermonkey/VS Code foreground evidence remains pending.
The separately materialized trusted-copy action is not part of this Feature.

## RU-FEAT-01 — Identity / Intent / Principal Result / Semantic Entry

**Methodology:** [RU-FEAT-01 Unit Definition](../idtspe-methodology/active/profiles/sds/target-modules/TM-FEATURE.md#ru-feat-01--identity--intent--principal-result--semantic-entry).

Feature ID: `F-STL-OPEN-LOCAL-PROJECT`.

Intent: let one explicit application action open a ready local project
directory or safely extract and open its ZIP when the supplied project
selector may omit `.zip`.

Principal result: exactly one resolved directory or safely materialized ZIP
destination is submitted to VS Code under forced-new-window policy, or the
Feature returns a truthful non-success result without claiming that a project
was opened.

Semantic entry:

```text
studyTabLauncher.openProject(OpenProjectRequest) -> OpenProjectOutcome
```

Important context and preconditions:

- a browser adapter may convert a copied relative name into one absolute
  `ProjectSelector` using its configured search root;
- the extension, not ChatGPT or the browser, resolves directory versus ZIP;
- direct command/URI callers and the browser-coordinated handoff are transport
  variants of the same semantic operation;
- Workspace Trust and final window placement remain owned by VS Code and the
  user.

Application Benefit contribution: this Feature is the primary realization of
[`AB-STL-02`](../application-definition.md#ab-stl-02--open-a-local-project-source).
It owns the Benefit's [selector-continuity
contribution](../application-definition.md#ab-stl-02-boundary-selector-resolution)
and [exact bounded discovery
constraint](../application-definition.md#ab-stl-02-constraint-exact-bounded-discovery),
then composes the separately owned [folder
branch](../application-definition.md#ab-stl-02-boundary-folder-branch) or
[archive branch](../application-definition.md#ab-stl-02-boundary-archive-branch)
while preserving the [safe-project-effect
constraint](../application-definition.md#ab-stl-02-constraint-safe-project-effect).

## RU-FEAT-02 — Semantic Data

**Methodology:** [RU-FEAT-02 Unit Definition](../idtspe-methodology/active/profiles/sds/target-modules/TM-FEATURE.md#ru-feat-02--semantic-data).

`ProjectSelector` validity and resolution semantics belong to
[D-STL-LOCAL-PROJECT-SELECTOR](../domain/local-project-selector.md). This
Feature owns the behavior-facing request, prepared-launch authority and result
objects without duplicating filesystem or persistence schemas.

| Feature Data Object | Meaning | Semantic content |
|---|---|---|
| <a id="fdo-stl-project-open-request"></a>`FDO-STL-PROJECT-OPEN-REQUEST` | One request to resolve and open a project | version `1`; one `ProjectSelector`; optional integer `waitSeconds` in `0..300`, where omission is equivalent to `0` for direct callers |
| <a id="fdo-stl-prepared-project-launch"></a>`FDO-STL-PREPARED-PROJECT-LAUNCH` | Bounded authority proving that one browser-coordinated source was found and may proceed through foreground handoff | opaque, short-lived, single-use authority bound to the prepared operation; it carries no browser-visible project path, destination or trust choice |
| <a id="fdo-stl-project-open-outcome"></a>`FDO-STL-PROJECT-OPEN-OUTCOME` | Truthful terminal result of the semantic operation | status `opened`, `rejected` or `failed`; explanatory message; source `folder`, `archive` or `none`; extraction `extracted`, `reusedExisting` or `none` |

The browser's saved search root and wait preference are adapter presentation
state. They are not fields that grant the Feature filesystem or trust
authority beyond the resulting validated request.

## RU-FEAT-03 — Feature Behavior

**Methodology:** [RU-FEAT-03 Unit Definition](../idtspe-methodology/active/profiles/sds/target-modules/TM-FEATURE.md#ru-feat-03--feature-behavior).

Correctness-critical order is normative for the browser-coordinated path. A
direct VS Code command/URI caller enters with VS Code already active and may
skip the external foreground-transfer steps, but it must preserve the same
resolution, branch-safety and result semantics.

### Main Path

| Feature Behavior Step | Required action | Attached Behavior Requirements | Related behavior expected errors | QRPE / Examples |
|---|---|---|---|---|
| <a id="fbs-stl-project-01"></a>`FBS-STL-PROJECT-01 — Accept and validate the request` | Accept only the declared semantic entry or supported entry-adapter route and validate the complete versioned request, selector and wait bound before project effects. | [`BR-STL-PROJECT-01`](#br-stl-project-01), [`BR-STL-PROJECT-02`](#br-stl-project-02), [`BR-STL-PROJECT-09`](#br-stl-project-09) | [`ERR-BEH-STL-PROJECT-REQUEST-INVALID-01`](#err-beh-stl-project-request-invalid-01) | Example: copied `bridge-planning-proposals-v2` becomes one absolute selector before entering the extension. |
| <a id="fbs-stl-project-02"></a>`FBS-STL-PROJECT-02 — Resolve or await the exact source` | Check the exact selector immediately; choose an existing directory or exact ZIP, or check exactly one implicit `.zip` candidate. Poll only while every permitted candidate is absent and only until the accepted bound. | [`BR-STL-PROJECT-02`](#br-stl-project-02), [`BR-STL-PROJECT-03`](#br-stl-project-03), [`BR-STL-PROJECT-04`](#br-stl-project-04), [`BR-STL-PROJECT-07`](#br-stl-project-07) | [`ERR-BEH-STL-PROJECT-SOURCE-WAIT-TIMED-OUT-02`](#err-beh-stl-project-source-wait-timed-out-02); [`ERR-BEH-STL-PROJECT-SOURCE-NOT-ELIGIBLE-03`](#err-beh-stl-project-source-not-eligible-03) | Example: directory `project` wins over `project.zip`; explicit `project.zip` selects the ZIP. |
| <a id="fbs-stl-project-03"></a>`FBS-STL-PROJECT-03 — Prepare one launch authority` | On the browser-coordinated route, create one opaque bounded authority only after a source is found; do not launch the project during preparation. Direct callers continue under their already-active VS Code context. | [`BR-STL-PROJECT-06`](#br-stl-project-06), [`BR-STL-PROJECT-08`](#br-stl-project-08) | [`ERR-BEH-STL-PROJECT-HANDOFF-NOT-ESTABLISHED-04`](#err-beh-stl-project-handoff-not-established-04) | Evidence boundary: prepared authority contains no project/destination/trust data exposed through the focus URI. |
| <a id="fbs-stl-project-04"></a>`FBS-STL-PROJECT-04 — Transfer foreground to the coordinator owner` | For browser coordination, invoke the token-only focus route; the URI-selected host activates VS Code, signals the coordinator owner, and the owner focuses its own window and acknowledges the live authority. | [`BR-STL-PROJECT-06`](#br-stl-project-06), [`BR-STL-PROJECT-08`](#br-stl-project-08) | [`ERR-BEH-STL-PROJECT-HANDOFF-NOT-ESTABLISHED-04`](#err-beh-stl-project-handoff-not-established-04) | Risk: OS/browser foreground policy can still prevent the desired visible focus and needs live observation. |
| <a id="fbs-stl-project-05"></a>`FBS-STL-PROJECT-05 — Redeem the prepared operation once` | Permit launch redemption only after owner-focus acknowledgement and consume the authority at most once. Repeated or late redemption must not repeat extraction/opening. | [`BR-STL-PROJECT-06`](#br-stl-project-06), [`BR-STL-PROJECT-08`](#br-stl-project-08) | [`ERR-BEH-STL-PROJECT-HANDOFF-NOT-ESTABLISHED-04`](#err-beh-stl-project-handoff-not-established-04) | Current automated evidence exposes an intermittent duplicate-focus/redemption race; see [`RU-FEAT-04`](#ru-feat-04). |
| <a id="fbs-stl-project-06"></a>`FBS-STL-PROJECT-06 — Execute the resolved source branch` | For a directory, compose the current folder-opening behavior. For a ZIP, compose bounded safe extraction/reuse before opening its final directory. In both branches use forced-new-window policy and never grant Workspace Trust. | [`BR-STL-PROJECT-05`](#br-stl-project-05) | [`ERR-BEH-STL-PROJECT-SOURCE-BRANCH-REJECTED-05`](#err-beh-stl-project-source-branch-rejected-05); [`ERR-BEH-STL-PROJECT-OPEN-FAILED-06`](#err-beh-stl-project-open-failed-06) | References: [folder Feature](open-linked-folder-window.md), [archive Feature](extract-open-archive.md). |
| <a id="fbs-stl-project-07"></a>`FBS-STL-PROJECT-07 — Return the terminal result` | Report the actual selected source, extraction disposition and terminal status to the invoking channel available to that entry path. Do not convert cleanup, focus or handoff failure into success. | [`BR-STL-PROJECT-09`](#br-stl-project-09) | [`ERR-BEH-STL-PROJECT-OPEN-FAILED-06`](#err-beh-stl-project-open-failed-06) | Browser token redemption receives a structured result; direct VS Code entry also presents non-success locally. |

### Behavior Requirements

| Behavior Requirement | Type | Plain required behavior | Related behavior expected errors | QRPE / Examples |
|---|---|---|---|---|
| <a id="br-stl-project-01"></a>`BR-STL-PROJECT-01 — One adaptive project action` | Scope | The browser exposes one folder/ZIP project action; folder/ZIP selection is not split into caller-selected operations. File/tab actions and trusted-copy remain separate Features. | [`ERR-BEH-STL-PROJECT-REQUEST-INVALID-01`](#err-beh-stl-project-request-invalid-01) | Keeps ChatGPT output free of extension-specific branch logic. |
| <a id="br-stl-project-02"></a>`BR-STL-PROJECT-02 — Extension-owned source selection` | Authority, Scope | The extension resolves the local filesystem type from one `ProjectSelector`; the browser neither inspects local paths nor supplies a source-type flag. | [`ERR-BEH-STL-PROJECT-REQUEST-INVALID-01`](#err-beh-stl-project-request-invalid-01); [`ERR-BEH-STL-PROJECT-SOURCE-NOT-ELIGIBLE-03`](#err-beh-stl-project-source-not-eligible-03) | Folder/ZIP identity is established from the real local source. |
| <a id="br-stl-project-03"></a>`BR-STL-PROJECT-03 — Optional ZIP suffix` | Context | An extensionless selector may try exactly one same-path `.zip` candidate only when the exact selector is absent. No other extension or name is inferred. | [`ERR-BEH-STL-PROJECT-SOURCE-WAIT-TIMED-OUT-02`](#err-beh-stl-project-source-wait-timed-out-02); [`ERR-BEH-STL-PROJECT-SOURCE-NOT-ELIGIBLE-03`](#err-beh-stl-project-source-not-eligible-03) | `project` may select `project.zip`; `project.tar` is never inferred. |
| <a id="br-stl-project-04"></a>`BR-STL-PROJECT-04 — Deterministic precedence` | Safety | An exact existing directory wins over an implicit sibling ZIP. An exact non-ZIP file is a collision and blocks implicit fallback. | [`ERR-BEH-STL-PROJECT-SOURCE-NOT-ELIGIBLE-03`](#err-beh-stl-project-source-not-eligible-03) | Prevents a different package from being opened merely because the exact path is unusable. |
| <a id="br-stl-project-05"></a>`BR-STL-PROJECT-05 — Preserve branch safety` | Safety, Effect Scope | Folder locality, ZIP entry safety, bounded extraction, atomic/no-overwrite publication, forced-new-window behavior and the prohibition on automatic Workspace Trust remain composed. | [`ERR-BEH-STL-PROJECT-SOURCE-BRANCH-REJECTED-05`](#err-beh-stl-project-source-branch-rejected-05); [`ERR-BEH-STL-PROJECT-OPEN-FAILED-06`](#err-beh-stl-project-open-failed-06) | Existing sibling extraction directories are reused unchanged by the archive Feature. |
| <a id="br-stl-project-06"></a>`BR-STL-PROJECT-06 — Separate foreground transfer from project authority` | Authority, Safety | The external focus URI carries only opaque prepared authority. Its receiving host cannot select another project, destination, command or trust policy; only the coordinator owner may launch after acknowledgement. | [`ERR-BEH-STL-PROJECT-HANDOFF-NOT-ESTABLISHED-04`](#err-beh-stl-project-handoff-not-established-04) | The URI-selected window may activate VS Code but cannot redirect the prepared operation. |
| <a id="br-stl-project-07"></a>`BR-STL-PROJECT-07 — Bounded source-arrival wait` | Continuity, Scope | The accepted wait is `0..300` seconds; `0` performs one immediate check. Polling retries only absence, does not widen candidates and produces at most one terminal launch. | [`ERR-BEH-STL-PROJECT-SOURCE-WAIT-TIMED-OUT-02`](#err-beh-stl-project-source-wait-timed-out-02); [`ERR-BEH-STL-PROJECT-SOURCE-NOT-ELIGIBLE-03`](#err-beh-stl-project-source-not-eligible-03) | Browser preference defaults to 30 seconds; direct omission remains immediate. |
| <a id="br-stl-project-08"></a>`BR-STL-PROJECT-08 — Deferred application transition` | Continuity, Safety | Browser invocation must not activate VS Code while the source is absent. After discovery, preparation, focus acknowledgement and redemption are bounded, expiring and single-use. | [`ERR-BEH-STL-PROJECT-HANDOFF-NOT-ESTABLISHED-04`](#err-beh-stl-project-handoff-not-established-04) | Prevents switching to VS Code merely to continue waiting for a download. |
| <a id="br-stl-project-09"></a>`BR-STL-PROJECT-09 — Truthful result` | Visibility | `opened` is returned only after the resolved branch has handed the final directory to VS Code. Rejection and accepted-operation failure remain distinguishable and include material source/extraction context. | [All Feature-owned Expected Errors](#expected-errors), especially [`ERR-BEH-STL-PROJECT-OPEN-FAILED-06`](#err-beh-stl-project-open-failed-06). | Host foreground success is not inferred solely from command acceptance. |

<a id="expected-errors"></a>
### Expected Errors

These are behavior-level errors because the application must continue to
distinguish them even if the coordinator, filesystem or VS Code gateway
mechanism changes. An Expected Error is not itself a Requirement; the tables
above reference the error identities where handling is behaviorally relevant.

| Expected Error | Type | Plain expected error meaning |
|---|---|---|
| <a id="err-beh-stl-project-request-invalid-01"></a>`ERR-BEH-STL-PROJECT-REQUEST-INVALID-01 — Project request invalid` | Input / Scope | The supplied operation cannot be normalized to one complete supported project-open request. |
| <a id="err-beh-stl-project-source-wait-timed-out-02"></a>`ERR-BEH-STL-PROJECT-SOURCE-WAIT-TIMED-OUT-02 — Project source wait timed out` | Availability / Time bound | Neither permitted exact source candidate appeared within the accepted wait bound. |
| <a id="err-beh-stl-project-source-not-eligible-03"></a>`ERR-BEH-STL-PROJECT-SOURCE-NOT-ELIGIBLE-03 — Project source not eligible` | Eligibility / Conflict | The exact source exists but is an unsupported object, an exact non-ZIP collision, inaccessible for required resolution, or otherwise cannot serve as the selected project source. |
| <a id="err-beh-stl-project-handoff-not-established-04"></a>`ERR-BEH-STL-PROJECT-HANDOFF-NOT-ESTABLISHED-04 — Project handoff not established` | Continuity / Authority | The browser-to-owning-VS-Code handoff did not establish live authorized launch continuity, so no project effect may begin. |
| <a id="err-beh-stl-project-source-branch-rejected-05"></a>`ERR-BEH-STL-PROJECT-SOURCE-BRANCH-REJECTED-05 — Project source branch rejected` | Safety / Eligibility | The resolved folder or ZIP branch rejects the source or would violate its locality, extraction, collision, publication or trust boundary. |
| <a id="err-beh-stl-project-open-failed-06"></a>`ERR-BEH-STL-PROJECT-OPEN-FAILED-06 — Project open failed` | Outcome / Effect | An accepted eligible operation could not complete extraction/publication or hand the final directory to VS Code, so `opened` cannot be reported. |

<a id="ru-feat-04"></a>
## RU-FEAT-04 — Implementation Concerns

**Methodology:** [RU-FEAT-04 Unit Definition](../idtspe-methodology/active/profiles/sds/target-modules/TM-FEATURE.md#ru-feat-04--implementation-concerns).

Current realized concern: the canonical
[`P-STL-HANDOFF-01 — Coordinator acknowledgement/redemption race`](../shared/prepared-project-handoff.md#p-stl-handoff-01)
can make owner-focus acknowledgement non-deterministic under concurrent
redemption. At this Feature boundary the consequence is a failed handoff rather
than a duplicate project effect; correction must preserve single-use launch
authority.

Live evidence remains necessary for browser external-protocol confirmation,
Windows foreground behavior, existing-versus-new target-window selection and
modal placement. Exact endpoints, token durations, retry delays, classes and
test mechanics remain implementation-native rather than Feature semantics.

## RU-FEAT-05 — Feature / Slice Boundary

**Methodology:** [RU-FEAT-05 Unit Definition](../idtspe-methodology/active/profiles/sds/target-modules/TM-FEATURE.md#ru-feat-05--feature--slice-boundary).

Selected boundary: one adaptive project-opening Feature composes the existing
folder and archive Features. It owns source selection, bounded arrival,
prepared foreground handoff, branch dispatch and the truthful combined result;
it does not absorb folder path validity, ZIP extraction policy, trusted-copy
publication or Workspace Trust.

The current durable owner is
[SL-STL-OPEN-LOCAL-PROJECT](../slices/open-local-project.md). It composes the
ProjectSelector/folder/ZIP Domain owners and selected publication/handoff
capabilities across one end-to-end operation. The selected future cross-window
succession responsibility remains behaviorally and operationally separate in
its Evolution Step rather than widening this current Feature/Slice boundary.

## RU-FEAT-06 — Evolution Impact

**Methodology:** [RU-FEAT-06 Unit Definition](../idtspe-methodology/active/profiles/sds/target-modules/TM-FEATURE.md#ru-feat-06--evolution-impact).

Disposition: `OMITTED`.

Reason: the selected
[EVO-STL-CLOSE-SUPERSEDED-PROJECT-WINDOWS](../evolution/unrealized/close-superseded-project-windows.md)
adds a peer post-open Feature after this Feature's successful result. It does
not change this Feature's selector, arrival, branch, handoff or outcome
semantics. The affected project-opening Scenarios carry the future journey
impact; no Feature-local reverse projection is material here.
