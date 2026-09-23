# EVO-STL-CLOSE-SUPERSEDED-PROJECT-WINDOWS — Close superseded project windows after opening a replacement

Status: selected active Evolution Step. Planning is complete for the selected
first implementation increment; realization and proof are pending. Nothing in
this Step is current Feature, Scenario, Domain, Slice or Shared behavior.

## RU-EVO-01 — Step Frame / Semantic Relations

**Methodology:** [RU-EVO-01 Unit Definition](../../idtspe-methodology/active/profiles/sds/target-modules/TM-EVOLUTION-STEP.md#ru-evo-01--step-frame--semantic-relations).

Step kind: `Expansion`.

Driven By: [`AB-STL-04 — Retire superseded project
windows`](../../application-definition.md#ab-stl-04--retire-superseded-project-windows),
specifically its [bounded-candidate
boundary](../../application-definition.md#ab-stl-04-boundary-manifest-candidates),
[confirmed-coordination
boundary](../../application-definition.md#ab-stl-04-boundary-confirmed-coordination),
[no-general-close
constraint](../../application-definition.md#ab-stl-04-constraint-no-general-close),
[secondary-cleanup
constraint](../../application-definition.md#ab-stl-04-constraint-secondary-cleanup)
and [trust-neutrality
constraint](../../application-definition.md#ab-stl-04-constraint-trust-neutrality).

Entering From:
[EVO-STL-FOCUS-COORDINATOR-OWNER](../realized/focus-coordinator-owner-before-confirmation.md),
the direct realized semantic predecessor.

Transition boundary: after an ordinary current project-opening Feature has
successfully handed the final root to VS Code, optionally interpret one fixed
project-owned succession declaration and coordinate explicitly confirmed close
attempts against exact eligible participating sibling windows. Current project
opening remains the primary result; cleanup is secondary and cannot widen file,
path, command, trust or window authority.

Changed post-Step owner composition:

- one new complete [Target Feature Body](#target-feature-stl-apply-project-succession),
  `F-STL-APPLY-PROJECT-SUCCESSION`;
- one new [Target Domain Body](#target-domain-stl-project-succession-manifest),
  `D-STL-PROJECT-SUCCESSION-MANIFEST`;
- one new [Target Slice Body](#target-slice-stl-apply-project-succession),
  `SL-STL-APPLY-PROJECT-SUCCESSION`;
- four replacement Target Scenario Bodies for the current project-opening
  journeys: [selected project](#target-scenario-stl-open-selected-project),
  [folder](#target-scenario-stl-open-selected-folder),
  [archive](#target-scenario-stl-open-downloaded-archive), and
  [trusted copy](#target-scenario-stl-copy-trusted-project);
- one bounded `RU-EVO-02` revalidation Impact on current
  `SH-STL-PREPARED-PROJECT-HANDOFF`; its durable contract remains unchanged.

Current project/folder/ZIP/trusted-copy Features remain unchanged peer owners.
The file-context Feature/Scenario and ChatGPT widget are unaffected.

<a id="target-feature-stl-apply-project-succession"></a>
## Target Feature Body — F-STL-APPLY-PROJECT-SUCCESSION

Planning authority: selected Step-owned future Feature meaning. It becomes a
current Feature owner only after implementation, proof and materialization.

### RU-FEAT-01 — Identity / Intent / Principal Result / Semantic Entry

**Methodology:** [RU-FEAT-01 Unit Definition](../../idtspe-methodology/active/profiles/sds/target-modules/TM-FEATURE.md#ru-feat-01--identity--intent--principal-result--semantic-entry).

Feature ID: `F-STL-APPLY-PROJECT-SUCCESSION`.

Intent: after one project root is successfully opened, offer a bounded way to
retain or retire participating windows for exact earlier sibling projects
declared by that final root.

Principal result: the replacement project remains open; each confirmed
eligible previous window is either closed by its own extension instance or
retained with a truthful reason, and optional cleanup never rewrites the
successful current-project result.

Semantic entry:

```text
studyTabLauncher.applyProjectSuccession(ApplyProjectSuccessionRequest)
  -> ProjectSuccessionOutcome
```

The entry is composed only after a successful current project open. It is not
an external URI route and accepts no caller-supplied manifest path, close list,
command name or trust choice.

Application Benefit contribution: this Feature is the selected behavioral
realization of the [bounded-candidate
boundary](../../application-definition.md#ab-stl-04-boundary-manifest-candidates)
and [confirmed-coordination
boundary](../../application-definition.md#ab-stl-04-boundary-confirmed-coordination)
of [`AB-STL-04`](../../application-definition.md#ab-stl-04--retire-superseded-project-windows),
under its exact-close-authority, secondary-cleanup and trust-neutrality
constraints.

### RU-FEAT-02 — Semantic Data

**Methodology:** [RU-FEAT-02 Unit Definition](../../idtspe-methodology/active/profiles/sds/target-modules/TM-FEATURE.md#ru-feat-02--semantic-data).

Manifest value semantics belong to the Target Domain Body below.

| Feature Data Object | Meaning | Semantic content |
|---|---|---|
| <a id="fdo-stl-succession-request"></a>`FDO-STL-SUCCESSION-REQUEST` | One eligible post-open succession attempt | final canonical single local project root; successful primary open result; originating operation identity |
| <a id="fdo-stl-succession-candidates"></a>`FDO-STL-SUCCESSION-CANDIDATES` | Exact eligible previous-window set presented for decision | ordered unique declared project names; exact canonical sibling roots; live participating registration identity |
| <a id="fdo-stl-succession-outcome"></a>`FDO-STL-SUCCESSION-OUTCOME` | Truthful secondary cleanup result | disposition `notApplicable`, `openOnly`, `completed`, `partial` or `failed`; per-target `closed`, `retained`, `unavailable` or `unknown`; warnings; replacement root |

The secondary disposition is determined by the first applicable terminal
stage; it never changes the primary `opened` result:

| Disposition | Exact meaning |
|---|---|
| `notApplicable` | The fixed manifest is absent or valid but empty, or it yields no eligible live sibling; no close decision or request occurs. |
| `openOnly` | Eligible siblings were shown, but the user chose Open Only or dismissed the decision; no close request occurs. |
| `failed` | Invalid metadata or replacement/coordination failure prevents confirmed target processing from beginning; no predecessor close request occurs. Report the warning and retain the replacement. |
| `completed` | Confirmed target processing finishes with every selected target confirmed `closed`; a later refocus warning does not erase those closes. |
| `partial` | Confirmed target processing begins and at least one selected target is `retained`, `unavailable` or `unknown`, including when zero targets are confirmed closed. Preserve every confirmed `closed` result. |

After confirmed target processing begins, `completed` or `partial` is determined
from the actual per-target results; a later infrastructure, dirty-window or
refocus problem cannot relabel completed closes as `failed`. No succession
outcome object is created for a failed primary project open.

### RU-FEAT-03 — Feature Behavior

**Methodology:** [RU-FEAT-03 Unit Definition](../../idtspe-methodology/active/profiles/sds/target-modules/TM-FEATURE.md#ru-feat-03--feature-behavior).

#### Main Path

| Feature Behavior Step | Required action | Attached Behavior Requirements | Related behavior expected errors | QRPE / Examples |
|---|---|---|---|---|
| <a id="fbs-stl-succession-01"></a>`FBS-STL-SUCCESSION-01 — Accept only successful post-open context` | Start only after one current project Feature reports a successful final-root handoff; preserve that primary result. | [`BR-STL-SUCCESSION-01`](#br-stl-succession-01), [`BR-STL-SUCCESSION-09`](#br-stl-succession-09) | [`ERR-BEH-STL-SUCCESSION-CONTEXT-INELIGIBLE-01`](#err-beh-stl-succession-context-ineligible-01) | File-context opening and failed project handoff never enter this Feature. |
| <a id="fbs-stl-succession-02"></a>`FBS-STL-SUCCESSION-02 — Read and validate the fixed declaration` | Read only `<final-root>/.study-tab-launcher.json`; absence/empty is a no-op and invalid content produces a warning with no cleanup. | [`BR-STL-SUCCESSION-02`](#br-stl-succession-02), [`BR-STL-SUCCESSION-03`](#br-stl-succession-03) | [`ERR-BEH-STL-SUCCESSION-MANIFEST-INVALID-02`](#err-beh-stl-succession-manifest-invalid-02) | Never search recursively or accept browser metadata. |
| <a id="fbs-stl-succession-03"></a>`FBS-STL-SUCCESSION-03 — Resolve exact sibling candidates` | Normalize valid names to direct sibling roots and match only live participating single-root local VS Code instances. | [`BR-STL-SUCCESSION-03`](#br-stl-succession-03), [`BR-STL-SUCCESSION-04`](#br-stl-succession-04) | [`ERR-BEH-STL-SUCCESSION-NO-ELIGIBLE-TARGET-03`](#err-beh-stl-succession-no-eligible-target-03) | Exclude current, stale, remote and multi-root windows. |
| <a id="fbs-stl-succession-04"></a>`FBS-STL-SUCCESSION-04 — Obtain the user's cleanup decision` | When matches exist, display exact names/paths in VS Code and offer **Open and Close Previous** or **Open Only**; dismissal is Open Only. | [`BR-STL-SUCCESSION-05`](#br-stl-succession-05) | none; Open Only is a successful user-owned disposition | Package metadata cannot authorize closing. |
| <a id="fbs-stl-succession-05"></a>`FBS-STL-SUCCESSION-05 — Establish replacement-window continuity` | Before close requests, wait boundedly for the replacement root's own participating instance; retain prior windows on timeout. | [`BR-STL-SUCCESSION-06`](#br-stl-succession-06), [`BR-STL-SUCCESSION-08`](#br-stl-succession-08) | [`ERR-BEH-STL-SUCCESSION-REPLACEMENT-UNAVAILABLE-04`](#err-beh-stl-succession-replacement-unavailable-04) | Prevent the initiating coordinator from disappearing before result ownership transfers. |
| <a id="fbs-stl-succession-06"></a>`FBS-STL-SUCCESSION-06 — Coordinate bounded target-owned close attempts` | Bind authenticated expiring requests to each registration/root; every target revalidates itself and invokes only VS Code's fixed close-window operation in its own window. | [`BR-STL-SUCCESSION-06`](#br-stl-succession-06), [`BR-STL-SUCCESSION-07`](#br-stl-succession-07), [`BR-STL-SUCCESSION-08`](#br-stl-succession-08) | [`ERR-BEH-STL-SUCCESSION-TARGET-UNAVAILABLE-05`](#err-beh-stl-succession-target-unavailable-05), [`ERR-BEH-STL-SUCCESSION-PARTIAL-06`](#err-beh-stl-succession-partial-06) | VS Code owns dirty/save confirmation; cancellation retains that window. |
| <a id="fbs-stl-succession-07"></a>`FBS-STL-SUCCESSION-07 — Refocus and report secondary truth` | Refocus the replacement when permitted and report per-target/aggregate cleanup without changing the successful open result. | [`BR-STL-SUCCESSION-09`](#br-stl-succession-09) | [`ERR-BEH-STL-SUCCESSION-PARTIAL-06`](#err-beh-stl-succession-partial-06) | Host focus failure remains a warning, not primary-open failure. |

#### Behavior Requirements

| Behavior Requirement | Type | Plain required behavior | Related behavior expected errors | QRPE / Examples |
|---|---|---|---|---|
| <a id="br-stl-succession-01"></a>`BR-STL-SUCCESSION-01 — Cleanup follows actual successful open` | Ordering, Effect Scope | No succession inspection or close effect begins unless the current project root has successfully completed its ordinary open handoff. | [`ERR-BEH-STL-SUCCESSION-CONTEXT-INELIGIBLE-01`](#err-beh-stl-succession-context-ineligible-01) | Open failure closes nothing. |
| <a id="br-stl-succession-02"></a>`BR-STL-SUCCESSION-02 — Fixed bounded manifest authority` | Authority, Safety | Only the fixed bounded file in the final root may declare exact sibling names; browser/request input and recursive discovery cannot supply candidates. | [`ERR-BEH-STL-SUCCESSION-MANIFEST-INVALID-02`](#err-beh-stl-succession-manifest-invalid-02) | Missing/empty remains no-op. |
| <a id="br-stl-succession-03"></a>`BR-STL-SUCCESSION-03 — Exact sibling-name semantics` | Identity, Safety | Each declaration denotes one valid direct sibling name; optional `.zip` normalizes only to its extracted folder stem, normalized folder identities must be unique under ordinal case-insensitive Windows comparison, and no declaration authorizes archive deletion. | [`ERR-BEH-STL-SUCCESSION-MANIFEST-INVALID-02`](#err-beh-stl-succession-manifest-invalid-02) | `project` and `project.zip` in one manifest are invalid aliases, not two targets. No paths, globs or traversal. |
| <a id="br-stl-succession-04"></a>`BR-STL-SUCCESSION-04 — Participating local windows only` | Scope, Authority | Candidates must be live registered instances with exactly one canonical local workspace root equal to a declared sibling; current, remote, multi-root, stale and mismatched windows are excluded. | [`ERR-BEH-STL-SUCCESSION-NO-ELIGIBLE-TARGET-03`](#err-beh-stl-succession-no-eligible-target-03) | Window title/PID heuristics are not authority. |
| <a id="br-stl-succession-05"></a>`BR-STL-SUCCESSION-05 — Explicit exact-candidate confirmation` | User Decision, Visibility | Close attempts require an explicit VS Code decision after exact candidates are shown; dismissal/Open Only retains all previous windows. | none | Manifest presence alone never closes. |
| <a id="br-stl-succession-06"></a>`BR-STL-SUCCESSION-06 — Authenticated bounded coordination` | Authority, Safety | Registration and callbacks are loopback-only, random-secret/token bound, expiring and limited to the fixed succession operations. | [`ERR-BEH-STL-SUCCESSION-REPLACEMENT-UNAVAILABLE-04`](#err-beh-stl-succession-replacement-unavailable-04), [`ERR-BEH-STL-SUCCESSION-TARGET-UNAVAILABLE-05`](#err-beh-stl-succession-target-unavailable-05) | No arbitrary command/filesystem route. |
| <a id="br-stl-succession-07"></a>`BR-STL-SUCCESSION-07 — Target self-revalidation and dirty authority` | Safety, User Decision | Each target revalidates exact canonical root immediately before its own fixed close command; VS Code retains save/discard/cancel authority. | [`ERR-BEH-STL-SUCCESSION-TARGET-UNAVAILABLE-05`](#err-beh-stl-succession-target-unavailable-05), [`ERR-BEH-STL-SUCCESSION-PARTIAL-06`](#err-beh-stl-succession-partial-06) | Callback cannot redirect to another window. |
| <a id="br-stl-succession-08"></a>`BR-STL-SUCCESSION-08 — Replacement continuity before retirement` | Continuity, Safety | Confirmed cleanup starts only after the replacement root has a live participating instance capable of retaining/result-owning the operation. | [`ERR-BEH-STL-SUCCESSION-REPLACEMENT-UNAVAILABLE-04`](#err-beh-stl-succession-replacement-unavailable-04) | Timeout retains all predecessors. |
| <a id="br-stl-succession-09"></a>`BR-STL-SUCCESSION-09 — Secondary truthful outcome` | Truthfulness, Recovery | Absence, invalid metadata, no matches, Open Only, cancellation, unavailable targets, partial failure and refocus failure never rewrite a successful replacement open into failure. | [Feature-owned Expected Errors](#succession-expected-errors) | Report exact retained/closed/unknown results. |

<a id="succession-expected-errors"></a>
#### Expected Errors

| Expected Error | Type | Plain expected error meaning |
|---|---|---|
| <a id="err-beh-stl-succession-context-ineligible-01"></a>`ERR-BEH-STL-SUCCESSION-CONTEXT-INELIGIBLE-01 — Succession context ineligible` | Scope / Ordering | No successful eligible final-project handoff exists, so cleanup cannot start. |
| <a id="err-beh-stl-succession-manifest-invalid-02"></a>`ERR-BEH-STL-SUCCESSION-MANIFEST-INVALID-02 — Succession manifest invalid` | Input / Safety | The fixed declaration exists but violates size, schema, count, name or containment semantics; the replacement remains open and cleanup is disabled. |
| <a id="err-beh-stl-succession-no-eligible-target-03"></a>`ERR-BEH-STL-SUCCESSION-NO-ELIGIBLE-TARGET-03 — No eligible previous window` | Eligibility | Valid declared siblings have no exact live participating window; cleanup completes as a no-op. |
| <a id="err-beh-stl-succession-replacement-unavailable-04"></a>`ERR-BEH-STL-SUCCESSION-REPLACEMENT-UNAVAILABLE-04 — Replacement participant unavailable` | Continuity | The opened replacement does not register within the bound; previous windows are retained. |
| <a id="err-beh-stl-succession-target-unavailable-05"></a>`ERR-BEH-STL-SUCCESSION-TARGET-UNAVAILABLE-05 — Previous target unavailable` | Authority / Recovery | A selected target registration expires, mismatches or rejects revalidation before close; that window is retained. |
| <a id="err-beh-stl-succession-partial-06"></a>`ERR-BEH-STL-SUCCESSION-PARTIAL-06 — Succession cleanup partial` | Outcome / Recovery | Confirmed target processing began, but at least one selected target is retained, cancelled, unavailable or unknown; zero confirmed closes is possible, and the successful replacement open remains valid. |

### RU-FEAT-04 — Implementation Concerns

**Methodology:** [RU-FEAT-04 Unit Definition](../../idtspe-methodology/active/profiles/sds/target-modules/TM-FEATURE.md#ru-feat-04--implementation-concerns).

Feature-local concern: candidate discovery and cleanup outcome must remain
secondary to the current project-opening result. The coordinator's existing
acknowledgement/redemption race is owned by
[`P-STL-HANDOFF-01`](../../shared/prepared-project-handoff.md#p-stl-handoff-01)
and must not be widened by succession work.

### RU-FEAT-05 — Feature / Slice Boundary

**Methodology:** [RU-FEAT-05 Unit Definition](../../idtspe-methodology/active/profiles/sds/target-modules/TM-FEATURE.md#ru-feat-05--feature--slice-boundary).

Selected boundary: one peer post-open Feature and one end-to-end succession
Slice. Current project Features own source resolution/extraction/publication
and successful opening. The succession Feature owns manifest-driven candidate
meaning, explicit cleanup decision and truthful secondary result. The Slice
owns cross-window coordination and fixed effects; the manifest Domain owner
owns declaration validity/name semantics.

### RU-FEAT-06 — Evolution Impact

**Methodology:** [RU-FEAT-06 Unit Definition](../../idtspe-methodology/active/profiles/sds/target-modules/TM-FEATURE.md#ru-feat-06--evolution-impact).

Disposition: `OMITTED`.

Reason: this is a future Target Feature Body inside its owning Step; current-
owner reverse projection is not applicable until materialization.

## RU-EVO-02 — Evolution Impacts

**Methodology:** [RU-EVO-02 Unit Definition](../../idtspe-methodology/active/profiles/sds/target-modules/TM-EVOLUTION-STEP.md#ru-evo-02--evolution-impacts).

The collection contains one bounded subject: revalidation of the current
prepared-handoff Shared owner. The seven complete CREATE/REPLACE Target Owner
Bodies are independently addressable below, outside this Impact collection.

### Impact 1 — SH-STL-PREPARED-PROJECT-HANDOFF revalidation

Current state: the Shared capability owns browser-originated source waiting,
opaque focus-owner acknowledgement and at-most-once project dispatch.

Future consequence: its loopback server process is also a realization host for
new succession registry/callback endpoints. Its existing capability contract,
consumer bindings and current project token meaning remain unchanged. Recheck
ingress isolation, token namespaces, coordinator ownership and disposal under
the added load; do not make succession a third current consumer binding.

<a id="dec-stl-succession-shared-boundary-01"></a>
**Decision `DEC-STL-SUCCESSION-SHARED-BOUNDARY-01 — Keep succession outside
the prepared-handoff Shared contract`.**

- Status: `ACCEPTED`.
- Addresses: whether reusing the same loopback server requires replacing
  `SH-STL-PREPARED-PROJECT-HANDOFF`.
- Decision: the new succession Slice owns registration/callback semantics; the
  existing Shared capability is revalidated but not replaced.
- Rationale: process/port reuse is implementation topology, while source
  arrival/focus/redemption and post-open cross-window retirement have different
  semantic consumers and lifecycle.
- Integrated Into: Target Slice Body, this Shared Impact and `RU-EVO-04`.
- Reconsider When: succession must change current prepared-token meaning,
  current consumer bindings or the durable Shared capability contract.
- Review Provenance: resolved while reconstructing the selected Step during
  the SDS documentation audit on 2026-09-23.

Materialization consequence: none for the current Shared owner.

## Target Owner Bodies

These seven bodies remain Step-owned future meaning until proof and
materialization; their current-state and materialization notes do not make
them RU-EVO-02 Impact items.

<a id="target-domain-stl-project-succession-manifest"></a>
### Target Domain Body — D-STL-PROJECT-SUCCESSION-MANIFEST

Current state: no durable manifest Domain owner exists.

Future consequence: `CREATE` one Value Object/policy owner for the fixed
project succession declaration and exact sibling-name semantics.

#### RU-DOWN-01 — Domain Semantic Contract

**Methodology:** [RU-DOWN-01 Unit Definition](../../idtspe-methodology/active/profiles/sds/target-modules/TM-DOMAIN-OWNER.md#ru-down-01--domain-semantic-contract).

`ProjectSuccessionManifest` is the bounded value read only from
`<final-project-root>/.study-tab-launcher.json`:

```text
ProjectSuccessionManifest {
  schemaVersion: 1
  supersedes: ordered unique SuccessionProjectName[0..100]
}

SuccessionProjectName { exactChildName, normalizedFolderName }
```

Invariants:

- UTF-8 JSON size is at most 16 KiB and top level is an exact closed object;
- `schemaVersion` is exactly `1` and unknown top-level fields are rejected;
- `supersedes` has 0–100 strings; both the supplied child names and their
  normalized folder identities are unique under ordinal case-insensitive
  Windows comparison;
- a name is one child name, optionally suffixed `.zip`; separators, absolute
  paths, `.`, `..`, URI/glob/control syntax, trailing dot/space and reserved
  Windows device names are invalid;
- `.zip` only normalizes to the corresponding extracted folder stem;
- `project` and `project.zip`, including case variants, therefore cannot both
  occur: the manifest is invalid rather than deduplicated or attempted twice;
- candidate roots remain direct canonical children of the final root's
  canonical parent after filesystem resolution.

The manifest does not prove a project is trusted, open, participating or
eligible to close and grants no archive/file deletion authority.

##### Feature behavior realization

| Upstream behavior | Degree | Domain realization | Consuming Slice |
|---|---|---|---|
| [`FBS-STL-SUCCESSION-02`](#fbs-stl-succession-02), [`BR-STL-SUCCESSION-02`](#br-stl-succession-02) | FULL | Owns fixed closed manifest validity, version/count and missing/empty/invalid distinctions. | [`SL-STL-APPLY-PROJECT-SUCCESSION`](#target-slice-stl-apply-project-succession) |
| [`FBS-STL-SUCCESSION-03`](#fbs-stl-succession-03), [`BR-STL-SUCCESSION-03`](#br-stl-succession-03) | JOINT | Owns exact name normalization and direct sibling candidate identity; live participant matching remains Slice-owned. | [`SL-STL-APPLY-PROJECT-SUCCESSION`](#target-slice-stl-apply-project-succession) |

#### RU-DOWN-02 — Domain Implementation Requirements

**Methodology:** [RU-DOWN-02 Unit Definition](../../idtspe-methodology/active/profiles/sds/target-modules/TM-DOMAIN-OWNER.md#ru-down-02--domain-implementation-requirements).

| Domain Implementation Requirement | Type | Plain implementation requirement | Realizes | Related expected errors | QRPE / Examples |
|---|---|---|---|---|---|
| <a id="ir-domain-stl-succession-01"></a>`IR-DOMAIN-STL-SUCCESSION-01 — Closed bounded manifest parsing` | Safety, Scope | Read only the fixed file, enforce the byte bound before unbounded parsing and reject every field/value outside schema version 1. | [`FBS-STL-SUCCESSION-02`](#fbs-stl-succession-02), [`BR-STL-SUCCESSION-02`](#br-stl-succession-02) | [`ERR-BEH-STL-SUCCESSION-MANIFEST-INVALID-02`](#err-beh-stl-succession-manifest-invalid-02) | Missing file and empty list are valid no-op states. |
| <a id="ir-domain-stl-succession-02"></a>`IR-DOMAIN-STL-SUCCESSION-02 — Exact safe sibling-name normalization` | Identity, Safety | Normalize only one allowed child name/optional ZIP stem and reject path, ambiguous Windows or duplicate normalized folder identities under ordinal case-insensitive comparison. | [`BR-STL-SUCCESSION-03`](#br-stl-succession-03) | [`ERR-BEH-STL-SUCCESSION-MANIFEST-INVALID-02`](#err-beh-stl-succession-manifest-invalid-02) | `project` plus `project.zip` is invalid; no fuzzy or recursive candidate discovery. |
| <a id="ir-domain-stl-succession-03"></a>`IR-DOMAIN-STL-SUCCESSION-03 — Canonical direct-child containment` | Authority, Safety | Candidate resolution proves each normalized root remains a direct real child of the final root's real parent. | [`FBS-STL-SUCCESSION-03`](#fbs-stl-succession-03), [`BR-STL-SUCCESSION-03`](#br-stl-succession-03) | [`ERR-BEH-STL-SUCCESSION-MANIFEST-INVALID-02`](#err-beh-stl-succession-manifest-invalid-02) | Link redirection cannot widen authority. |

#### RU-DOWN-03 — Evolution Impact

**Methodology:** [RU-DOWN-03 Unit Definition](../../idtspe-methodology/active/profiles/sds/target-modules/TM-DOMAIN-OWNER.md#ru-down-03--evolution-impact).

Disposition: `OMITTED`; current-owner reverse projection is not applicable
inside this future Target Domain Body.

Materialization consequence: `CREATE` after parser/normalizer and boundary
proof establish the represented body.

<a id="target-slice-stl-apply-project-succession"></a>
### Target Slice Body — SL-STL-APPLY-PROJECT-SUCCESSION

Current state: no durable succession Slice exists.

Future consequence: `CREATE` one end-to-end Slice for the post-open manifest,
decision, participating-window coordination and truthful secondary result.

#### RU-SOWN-01 — Slice Responsibility / Boundary Contract

**Methodology:** [RU-SOWN-01 Unit Definition](../../idtspe-methodology/active/profiles/sds/target-modules/TM-SLICE-OWNER.md#ru-sown-01--slice-responsibility--boundary-contract).

Responsibility: realize one succession operation from successful final-root
context through manifest interpretation, exact participant matching, explicit
decision, replacement continuity, target-owned close attempts and result.

Entry/result: [`FDO-STL-SUCCESSION-REQUEST`](#fdo-stl-succession-request) to
[`FDO-STL-SUCCESSION-OUTCOME`](#fdo-stl-succession-outcome).

| Upstream behavior | Degree | Slice realization | Domain / Shared / external owner |
|---|---|---|---|
| [`FBS-STL-SUCCESSION-01`](#fbs-stl-succession-01) | FULL | Gates succession on the actual successful current-project result. | current project Feature/Slice result |
| [`FBS-STL-SUCCESSION-02`](#fbs-stl-succession-02), [`FBS-STL-SUCCESSION-03`](#fbs-stl-succession-03) | JOINT | Reads the fixed declaration, resolves Domain candidates and matches exact registrations. | [Target Domain Body](#target-domain-stl-project-succession-manifest); local filesystem |
| [`FBS-STL-SUCCESSION-04`](#fbs-stl-succession-04) | FULL | Shows exact candidates and obtains the owning VS Code decision. | user / VS Code modal authority |
| [`FBS-STL-SUCCESSION-05`](#fbs-stl-succession-05), [`FBS-STL-SUCCESSION-06`](#fbs-stl-succession-06) | FULL | Maintains authenticated expiring registration/callback state, waits for replacement ownership and aggregates fixed target-owned close attempts. | loopback server process; VS Code close-window boundary |
| [`FBS-STL-SUCCESSION-07`](#fbs-stl-succession-07) | FULL | Refocuses when possible and preserves per-target/aggregate secondary truth. | VS Code focus/presentation boundary |
| all Target Scenario `SR-*` below | JOINT | Appends cleanup without breaking each current source/open journey or primary Benefit closure. | four current project Scenarios and their Feature/Slice owners |

Whole-Slice proof targets authentication/root binding, replacement continuity,
no-effect gates, exact close authority, dirty cancellation and partial-result
truthfulness rather than private call order.

#### RU-SOWN-02 — Slice Implementation Requirements

**Methodology:** [RU-SOWN-02 Unit Definition](../../idtspe-methodology/active/profiles/sds/target-modules/TM-SLICE-OWNER.md#ru-sown-02--slice-implementation-requirements).

| Slice Implementation Requirement | Type | Plain implementation requirement | Realizes | Related expected errors | QRPE / Examples |
|---|---|---|---|---|---|
| <a id="ir-slice-stl-succession-01"></a>`IR-SLICE-STL-SUCCESSION-01 — Post-open effect fence` | Ordering, Safety | Accept only a successful final-root result and complete manifest/candidate validation before prompting or sending callbacks. | [`FBS-STL-SUCCESSION-01`](#fbs-stl-succession-01), [`FBS-STL-SUCCESSION-02`](#fbs-stl-succession-02), [`FBS-STL-SUCCESSION-03`](#fbs-stl-succession-03) | context/manifest/no-target Expected Errors above | Invalid or absent metadata closes nothing. |
| <a id="ir-slice-stl-succession-02"></a>`IR-SLICE-STL-SUCCESSION-02 — Bounded authenticated participant registry` | Authority, Resource Bound | Bind canonical single local roots to random instance secrets, heartbeat TTL and disposal; reject remote/multi-root/stale registrations and expose no arbitrary command/search. | [`BR-STL-SUCCESSION-04`](#br-stl-succession-04), [`BR-STL-SUCCESSION-06`](#br-stl-succession-06) | target/replacement unavailable Expected Errors | Registry is process-local, bounded and non-durable. |
| <a id="ir-slice-stl-succession-03"></a>`IR-SLICE-STL-SUCCESSION-03 — Exact local confirmation and replacement continuity` | User Decision, Continuity | Show exact candidates, treat dismissal as Open Only and require a live replacement participant before any predecessor callback. | [`FBS-STL-SUCCESSION-04`](#fbs-stl-succession-04), [`FBS-STL-SUCCESSION-05`](#fbs-stl-succession-05) | replacement unavailable Expected Error | Old coordinator never closes itself before result ownership transfers. |
| <a id="ir-slice-stl-succession-04"></a>`IR-SLICE-STL-SUCCESSION-04 — Target-bound fixed close callback` | Authority, Safety | Bind operation token, expected canonical root, target registration and expiry; target revalidates root and invokes only the fixed close-window command locally. | [`FBS-STL-SUCCESSION-06`](#fbs-stl-succession-06), [`BR-STL-SUCCESSION-07`](#br-stl-succession-07) | target unavailable/partial Expected Errors | No PID/title matching or process killing. |
| <a id="ir-slice-stl-succession-05"></a>`IR-SLICE-STL-SUCCESSION-05 — Bounded truthful aggregation` | Recovery, Truthfulness | Bound callback waits/retries, record closed/retained/unavailable/unknown per target, refocus the replacement when permitted and never rewrite primary success. | [`FBS-STL-SUCCESSION-07`](#fbs-stl-succession-07), [`BR-STL-SUCCESSION-09`](#br-stl-succession-09) | [`ERR-BEH-STL-SUCCESSION-PARTIAL-06`](#err-beh-stl-succession-partial-06) | Partial cleanup is an expected secondary outcome. |

#### RU-SOWN-03 — Evolution Impact

**Methodology:** [RU-SOWN-03 Unit Definition](../../idtspe-methodology/active/profiles/sds/target-modules/TM-SLICE-OWNER.md#ru-sown-03--evolution-impact).

Disposition: `OMITTED`; current-owner reverse projection is not applicable
inside this future Target Slice Body.

Materialization consequence: `CREATE` after authenticated multi-window Slice
and whole-path proof establish the represented body.

<a id="target-scenario-stl-open-selected-project"></a>
### Target Scenario Body — SCN-STL-OPEN-SELECTED-PROJECT

#### RU-SCEN-01 — Journey Composition

**Methodology:** [RU-SCEN-01 Unit Definition](../../idtspe-methodology/active/profiles/sds/target-modules/TM-SCENARIO-PLANNING.md#ru-scen-01-processing-envelope), [Journey Shape](../../idtspe-methodology/active/profiles/sds/target-modules/TM-SCENARIO-PLANNING.md#journey-shape).

Actor/context: the user opens one selected folder/ZIP project and may then
choose whether exact declared participating predecessor windows remain open.

Benefit references: current `AB-STL-02` primary opening followed by selected
[`AB-STL-04`](../../application-definition.md#ab-stl-04--retire-superseded-project-windows)
secondary cleanup.

The `SPS-STL-PROJECT-01..06` and `SR-STL-PROJECT-01..03` rows retain the current
source, handoff and primary-open journey as post-Step meaning.
`SPS-STL-PROJECT-06` ends non-success or branches from `opened` into the
optional succession suffix and final user continuation. Links to current
Features are participant dependencies, not a mutable import of current
Scenario authority.

| Scenario Path Step | Actor / application interaction | Feature / participant | Data/result | Benefit manifestation / closure | Attached SR | QRPE / Examples |
|---|---|---|---|---|---|---|
| <a id="sps-stl-project-01"></a>`SPS-STL-PROJECT-01 — Supply one project selector` | ChatGPT emits one project name/relative path or one absolute local selector; the user copies it. | External producer / user | Plain selector text; `.zip` optional | Benefit not yet manifested | [`SR-STL-PROJECT-01`](#sr-stl-project-01) | No extension URI or source-type flag is required. |
| <a id="sps-stl-project-02"></a>`SPS-STL-PROJECT-02 — Invoke adaptive project opening` | The user selects **Папка / ZIP · открыть**; the Screen combines the copied value with the saved root and wait preference. | [Screen](../../screens/chatgpt-launcher-widget.md); user | [`FDO-STL-PROJECT-OPEN-REQUEST`](../../features/open-local-project.md#fdo-stl-project-open-request) | Benefit not yet manifested | [`SR-STL-PROJECT-01`](#sr-stl-project-01), [`SR-STL-PROJECT-02`](#sr-stl-project-02) | The browser cannot inspect the local filesystem. |
| <a id="sps-stl-project-03"></a>`SPS-STL-PROJECT-03 — Remain in ChatGPT while the source is awaited` | The application checks immediately and, when configured, waits for pure absence while the browser stays foreground; discovery prepares one correlated launch. | [Project source-resolution step](../../features/open-local-project.md#fbs-stl-project-02) and [preparation step](../../features/open-local-project.md#fbs-stl-project-03) | Source-found preparation or visible timeout/rejection | Benefit not yet manifested | [`SR-STL-PROJECT-02`](#sr-stl-project-02) | Collision/I/O failure does not masquerade as waiting. |
| <a id="sps-stl-project-04"></a>`SPS-STL-PROJECT-04 — Cross the browser-to-VS Code boundary` | Once found, the browser invokes the prepared token-only focus link; browser/OS may confirm the external protocol, and VS Code establishes the owning-window handoff before single redemption. | Browser/OS; [focus-transfer step](../../features/open-local-project.md#fbs-stl-project-04) and [redemption step](../../features/open-local-project.md#fbs-stl-project-05); VS Code | [`FDO-STL-PREPARED-PROJECT-LAUNCH`](../../features/open-local-project.md#fdo-stl-prepared-project-launch) | Benefit not yet manifested | [`SR-STL-PROJECT-01`](#sr-stl-project-01), [`SR-STL-PROJECT-02`](#sr-stl-project-02) | Prepared retry/copy controls preserve recoverability. |
| <a id="sps-stl-project-05"></a>`SPS-STL-PROJECT-05 — Open the selected project branch` | The acknowledged operation opens the directory or safely reuses/extracts the ZIP destination under project-window policy and returns the actual result. | [Project execution step](../../features/open-local-project.md#fbs-stl-project-06); folder/archive branch Feature; VS Code | [`FDO-STL-PROJECT-OPEN-OUTCOME`](../../features/open-local-project.md#fdo-stl-project-open-outcome) | [`AB-STL-02`](../../application-definition.md#ab-stl-02--open-a-local-project-source) manifests on `opened`; non-success remains visible | [`SR-STL-PROJECT-03`](#sr-stl-project-03) | Workspace Trust remains user/VS Code-owned. |
| <a id="sps-stl-project-06"></a>`SPS-STL-PROJECT-06 — Branch on the primary project result` | The application reports the actual selected/new project result. On non-success the user corrects or retries; on `opened` the previous workspace remains available until any separately confirmed succession close and the optional suffix follows. | User; VS Code | Opened project context or actionable non-success | Primary `AB-STL-02` manifests on `opened`; non-success ends this invocation, while `opened` enters the optional suffix before final continuation. | [`SR-STL-PROJECT-03`](#sr-stl-project-03) | Final foreground/placement is host-owned. |
| <a id="sps-stl-project-succession-01"></a>`SPS-STL-PROJECT-SUCCESSION-01 — Enter optional post-open succession` | Only an actual `opened` final-root result enters the succession Feature; a non-success ends without inspecting metadata or closing predecessors. | current project result; succession Feature | Eligible final-root context or no succession operation. | `AB-STL-02` is already manifested; `AB-STL-04` is not yet manifested. | [`SR-STL-PROJECT-SUCCESSION-01`](#sr-stl-project-succession-01) | Failed primary handoff issues no predecessor close request. |
| <a id="sps-stl-project-succession-02"></a>`SPS-STL-PROJECT-SUCCESSION-02 — Inspect the final root` | After `opened`, validate its fixed manifest and match exact live sibling participants. | succession Feature/Domain/Slice | Valid declared sibling identities and exact live matches, or absent/empty/invalid/no-match result. | `AB-STL-04` remains optional; absent, invalid or unmatched declaration closes no predecessor. | [`SR-STL-PROJECT-SUCCESSION-02`](#sr-stl-project-succession-02) | Manifest comes from the actual final root. |
| <a id="sps-stl-project-succession-03"></a>`SPS-STL-PROJECT-SUCCESSION-03 — Decide and coordinate` | No matches finishes; otherwise user selects Open Only or confirmed close attempts after replacement registration. | user; succession Feature/Slice; VS Code targets | Open Only/no-op or bounded per-target close results. | `AB-STL-04` manifests when exact eligible candidates are offered for choice; confirmed close attempts may retire them, while Open Only retains them. | [`SR-STL-PROJECT-SUCCESSION-02`](#sr-stl-project-succession-02), [`SR-STL-PROJECT-SUCCESSION-03`](#sr-stl-project-succession-03) | A dirty target may cancel after another target has closed. |
| <a id="sps-stl-project-succession-04"></a>`SPS-STL-PROJECT-SUCCESSION-04 — Continue in replacement` | Replacement remains open and presents exact secondary outcome. | user / VS Code | Primary opened result plus truthful `notApplicable`, `openOnly`, `completed`, `partial` or `failed` secondary disposition. | `AB-STL-02` remains satisfied; `AB-STL-04` closes truthfully after an eligible choice/result. Absent, invalid or unmatched declarations end this invocation without manifesting `AB-STL-04`. | [`SR-STL-PROJECT-SUCCESSION-03`](#sr-stl-project-succession-03) | Partial cleanup does not retroactively fail opening. |

| Scenario Requirement | Type | Plain required interaction/journey meaning | QRPE / Examples |
|---|---|---|---|
| <a id="sr-stl-project-01"></a>`SR-STL-PROJECT-01 — Preserve selected-project correlation` | Continuity, Identity | The copied selector, action-created request, prepared authority and redeemed operation must remain one correlated journey; no intermediate participant may substitute another project. | References Feature authority requirements rather than redefining token mechanics. |
| <a id="sr-stl-project-02"></a>`SR-STL-PROJECT-02 — Preserve recoverable deferred handoff` | Continuity, Visibility | While the source is absent the user remains in browser context; after discovery, blocked protocol automation retains explicit retry/copy state and never claims that VS Code completed the operation. | Covers the browser/application boundary, not polling implementation. |
| <a id="sr-stl-project-03"></a>`SR-STL-PROJECT-03 — Preserve project-window continuity` | Continuity, Visibility | Primary opening leaves the previous workspace available and identifies the resulting project branch/outcome. Only the later, separate, explicitly confirmed succession decision may close an exact eligible predecessor; non-target windows stay available. Command acceptance does not guarantee OS foreground or Workspace Trust. | Existing and newly created target windows both need live observation. |
| <a id="sr-stl-project-succession-01"></a>`SR-STL-PROJECT-SUCCESSION-01 — Preserve primary project continuity` | Continuity | Existing selector/handoff/open meaning remains authoritative and any non-success closes nothing. | Failed primary handoff never enters succession. |
| <a id="sr-stl-project-succession-02"></a>`SR-STL-PROJECT-SUCCESSION-02 — Keep the post-open decision distinct` | Continuity, User Decision | After the primary browser-to-VS Code journey has opened the replacement, the owning VS Code interaction presents the optional cleanup decision separately from the original browser action; [Feature authority](#br-stl-succession-04) and [confirmation](#br-stl-succession-05) determine candidate and close eligibility. | Missing/invalid manifest, no match and Open Only issue no close request. |
| <a id="sr-stl-project-succession-03"></a>`SR-STL-PROJECT-SUCCESSION-03 — Preserve replacement and secondary truth` | Recovery, Visibility | Replacement remains open and partial/dismissed/cancelled cleanup is reported without changing primary success. | One target closes; a later dirty target cancels and is reported retained. |

E2E Proof Intent: current project journey plus two installed participating
previous windows, including one dirty cancellation and partial-result display.

#### RU-SCEN-02 — Evolution Impact

**Methodology:** [RU-SCEN-02 Unit Definition](../../idtspe-methodology/active/profiles/sds/target-modules/TM-SCENARIO-PLANNING.md#ru-scen-02--evolution-impact).

Disposition: `OMITTED`; this is the future replacement body owned by the Step.

#### RU-SCEN-03 — Journey Realization Concerns

**Methodology:** [RU-SCEN-03 Unit Definition](../../idtspe-methodology/active/profiles/sds/target-modules/TM-SCENARIO-PLANNING.md#ru-scen-03--journey-realization-concerns).

Live proof must correlate browser handoff, replacement-window registration,
modal placement, target self-revalidation, dirty prompts and final focus.

<a id="target-scenario-stl-open-selected-folder"></a>
### Target Scenario Body — SCN-STL-OPEN-SELECTED-FOLDER

#### RU-SCEN-01 — Journey Composition

**Methodology:** [RU-SCEN-01 Unit Definition](../../idtspe-methodology/active/profiles/sds/target-modules/TM-SCENARIO-PLANNING.md#ru-scen-01-processing-envelope), [Journey Shape](../../idtspe-methodology/active/profiles/sds/target-modules/TM-SCENARIO-PLANNING.md#journey-shape).

Actor/context: the user opens an exact selected local directory and optionally
retires declared exact participating sibling project windows afterward.

The `SPS-STL-FOLDER-01..06` and `SR-STL-FOLDER-01..03` rows retain the current
folder source, handoff and primary-open journey as post-Step meaning.
`SPS-STL-FOLDER-06` ends non-success or branches from `opened` into the
optional succession suffix and final user continuation.

| Scenario Path Step | Actor / application interaction | Feature / participant | Data/result | Benefit manifestation / closure | Attached SR | QRPE / Examples |
|---|---|---|---|---|---|---|
| <a id="sps-stl-folder-01"></a>`SPS-STL-FOLDER-01 — Supply one folder selector` | ChatGPT emits a folder name/relative path under the configured root or one absolute local directory path; the user copies it. | External producer / user | Plain selector text | Benefit not yet manifested | [`SR-STL-FOLDER-01`](#sr-stl-folder-01) | The value contains no VS Code policy. |
| <a id="sps-stl-folder-02"></a>`SPS-STL-FOLDER-02 — Invoke the adaptive action` | The user selects **Папка / ZIP · открыть**; the Screen combines the text with saved root/wait context. | [Screen](../../screens/chatgpt-launcher-widget.md); user | [`FDO-STL-PROJECT-OPEN-REQUEST`](../../features/open-local-project.md#fdo-stl-project-open-request) | Benefit not yet manifested | [`SR-STL-FOLDER-01`](#sr-stl-folder-01), [`SR-STL-FOLDER-02`](#sr-stl-folder-02) | Same-origin tabs share current Screen preferences. |
| <a id="sps-stl-folder-03"></a>`SPS-STL-FOLDER-03 — Await and prepare the directory source` | The application checks/polls only absence while ChatGPT stays foreground; a found directory produces prepared handoff authority. | [Project source-resolution step](../../features/open-local-project.md#fbs-stl-project-02) and [preparation step](../../features/open-local-project.md#fbs-stl-project-03) | Prepared folder-source handoff or visible non-success | Benefit not yet manifested | [`SR-STL-FOLDER-02`](#sr-stl-folder-02) | A regular-file collision fails rather than waiting. |
| <a id="sps-stl-folder-04"></a>`SPS-STL-FOLDER-04 — Cross into VS Code` | The browser invokes the token-only focus URI and VS Code establishes coordinator-owner continuity before single redemption. | Browser/OS; [focus-transfer step](../../features/open-local-project.md#fbs-stl-project-04) and [redemption step](../../features/open-local-project.md#fbs-stl-project-05); VS Code | [`FDO-STL-PREPARED-PROJECT-LAUNCH`](../../features/open-local-project.md#fdo-stl-prepared-project-launch) | Benefit not yet manifested | [`SR-STL-FOLDER-01`](#sr-stl-folder-01), [`SR-STL-FOLDER-02`](#sr-stl-folder-02) | Retry/copy remains available if automatic launch is blocked. |
| <a id="sps-stl-folder-05"></a>`SPS-STL-FOLDER-05 — Open the directory project` | The folder branch validates the final directory and hands it to VS Code under forced-new-window policy. | [Folder Main Path](../../features/open-linked-folder-window.md#fbs-stl-folder-01); VS Code | [`FDO-STL-FOLDER-OPEN-OUTCOME`](../../features/open-linked-folder-window.md#fdo-stl-folder-open-outcome) composed into project outcome | The [`AB-STL-02` folder contribution](../../application-definition.md#ab-stl-02-boundary-folder-branch) manifests on `opened` | [`SR-STL-FOLDER-03`](#sr-stl-folder-03) | Directory content is unchanged. |
| <a id="sps-stl-folder-06"></a>`SPS-STL-FOLDER-06 — Branch on the primary folder result` | The application reports the actual folder-open result. On non-success the user corrects or retries; on `opened` the prior workspace remains available until any separately confirmed succession close and the optional suffix follows. | User; VS Code | Opened folder project or actionable non-success | Primary `AB-STL-02` manifests on `opened`; non-success ends this invocation, while `opened` enters the optional suffix before final continuation. | [`SR-STL-FOLDER-03`](#sr-stl-folder-03) | Final window placement/foreground remains external. |
| <a id="sps-stl-folder-succession-01"></a>`SPS-STL-FOLDER-SUCCESSION-01 — Enter optional post-open succession` | Only an actual `opened` canonical folder root enters the succession Feature; non-success issues no metadata inspection or predecessor close request. | current folder/project result; succession Feature | Eligible final-root context or no succession operation. | `AB-STL-02` is already manifested; `AB-STL-04` is not yet manifested. | [`SR-STL-FOLDER-SUCCESSION-01`](#sr-stl-folder-succession-01) | Failed folder validation closes nothing. |
| <a id="sps-stl-folder-succession-02"></a>`SPS-STL-FOLDER-SUCCESSION-02 — Inspect actual opened root` | Only after success, read its fixed manifest and match exact participating siblings. | succession Feature/Domain/Slice | Valid declaration and exact live matches, or absent/empty/invalid/no-match result. | `AB-STL-04` remains optional; invalid or absent declaration yields no close effect. | [`SR-STL-FOLDER-SUCCESSION-02`](#sr-stl-folder-succession-02) | Browser text cannot substitute for final-root metadata. |
| <a id="sps-stl-folder-succession-03"></a>`SPS-STL-FOLDER-SUCCESSION-03 — Choose retention or cleanup` | User sees exact matches and chooses Open Only/dismiss or confirmed close attempts. | user / VS Code; succession Slice | Retention decision or bounded per-target close results after replacement registration. | `AB-STL-04` manifests when exact eligible candidates are offered for choice; confirmed close attempts may retire them, while Open Only retains them. | [`SR-STL-FOLDER-SUCCESSION-02`](#sr-stl-folder-succession-02), [`SR-STL-FOLDER-SUCCESSION-03`](#sr-stl-folder-succession-03) | Dirty cancellation retains that target. |
| <a id="sps-stl-folder-succession-04"></a>`SPS-STL-FOLDER-SUCCESSION-04 — Continue in directory project` | The opened folder remains available and exact secondary results are shown. | user / VS Code | Primary opened result and truthful secondary disposition with per-target outcomes. | `AB-STL-02` remains satisfied; `AB-STL-04` closes truthfully after an eligible choice/result. Absent, invalid or unmatched declarations end this invocation without manifesting `AB-STL-04`. | [`SR-STL-FOLDER-SUCCESSION-03`](#sr-stl-folder-succession-03) | Earlier confirmed closes remain real after a later failure. |

| Scenario Requirement | Type | Plain required interaction/journey meaning | QRPE / Examples |
|---|---|---|---|
| <a id="sr-stl-folder-01"></a>`SR-STL-FOLDER-01 — Preserve folder-selector correlation` | Continuity, Identity | The copied folder selector, prepared authority and redeemed directory operation remain one correlated journey without source substitution. | Feature-owned selector/focus authority remains canonical. |
| <a id="sr-stl-folder-02"></a>`SR-STL-FOLDER-02 — Keep delayed-folder handoff recoverable` | Continuity, Visibility | Waiting occurs without premature application switching; blocked browser protocol automation retains explicit retry/copy state and no false completion. | Covers browser/application continuity rather than polling mechanics. |
| <a id="sr-stl-folder-03"></a>`SR-STL-FOLDER-03 — Preserve workspace continuity` | Continuity | Primary folder opening leaves the previous workspace available and keeps file contents, Workspace Trust and placement under their existing authorities. Only later, separate, explicitly confirmed succession may close an exact eligible predecessor; non-target windows remain. | Observe both new and already-open target windows. |
| <a id="sr-stl-folder-succession-01"></a>`SR-STL-FOLDER-SUCCESSION-01 — Preserve folder-open continuity` | Continuity | Current folder source/handoff/window semantics complete before succession and remain the primary outcome. | No succession on a failed folder open. |
| <a id="sr-stl-folder-succession-02"></a>`SR-STL-FOLDER-SUCCESSION-02 — Use only the actual opened root` | Identity, Authority | Metadata and sibling resolution derive from the final opened root, never clipboard/browser substitutes. | The exact canonical final folder is the manifest base. |
| <a id="sr-stl-folder-succession-03"></a>`SR-STL-FOLDER-SUCCESSION-03 — Keep prior-window cleanup recoverable` | Recovery | Open Only, dirty cancellation and partial failure retain windows truthfully without closing the replacement. | Report each closed/retained/unknown target separately. |

E2E Proof Intent: installed exact directory opening with absent/invalid/valid
manifest, no-match, Open Only, successful and dirty-cancelled target branches.

#### RU-SCEN-02 — Evolution Impact

**Methodology:** [RU-SCEN-02 Unit Definition](../../idtspe-methodology/active/profiles/sds/target-modules/TM-SCENARIO-PLANNING.md#ru-scen-02--evolution-impact).

Disposition: `OMITTED`; this is the future replacement body owned by the Step.

#### RU-SCEN-03 — Journey Realization Concerns

**Methodology:** [RU-SCEN-03 Unit Definition](../../idtspe-methodology/active/profiles/sds/target-modules/TM-SCENARIO-PLANNING.md#ru-scen-03--journey-realization-concerns).

Host existing-window selection and foreground/modal placement require live
multi-window observation.

<a id="target-scenario-stl-open-downloaded-archive"></a>
### Target Scenario Body — SCN-STL-OPEN-DOWNLOADED-ARCHIVE

#### RU-SCEN-01 — Journey Composition

**Methodology:** [RU-SCEN-01 Unit Definition](../../idtspe-methodology/active/profiles/sds/target-modules/TM-SCENARIO-PLANNING.md#ru-scen-01-processing-envelope), [Journey Shape](../../idtspe-methodology/active/profiles/sds/target-modules/TM-SCENARIO-PLANNING.md#journey-shape).

Actor/context: the user opens a downloaded ZIP project, then may retire exact
participating predecessors declared by the actual reused/extracted final root.

The `SPS-STL-ARCHIVE-01..06` and `SR-STL-ARCHIVE-01..03` rows retain the
current ZIP source, handoff and primary-open journey as post-Step meaning.
`SPS-STL-ARCHIVE-06` ends non-success or branches from `opened` into the
optional succession suffix and final user continuation.

| Scenario Path Step | Actor / application interaction | Feature / participant | Data/result | Benefit manifestation / closure | Attached SR | QRPE / Examples |
|---|---|---|---|---|---|---|
| <a id="sps-stl-archive-01"></a>`SPS-STL-ARCHIVE-01 — Supply one archive selector` | ChatGPT emits a ZIP stem/name/relative path under the configured root or an absolute ZIP path; the user copies it. | External producer / user | Plain selector text; `.zip` optional | Benefit not yet manifested | [`SR-STL-ARCHIVE-01`](#sr-stl-archive-01) | No extraction destination or trust flag is supplied. |
| <a id="sps-stl-archive-02"></a>`SPS-STL-ARCHIVE-02 — Invoke adaptive project opening` | The user selects **Папка / ZIP · открыть**; the Screen applies saved root/wait context. | [Screen](../../screens/chatgpt-launcher-widget.md); user | [`FDO-STL-PROJECT-OPEN-REQUEST`](../../features/open-local-project.md#fdo-stl-project-open-request) | Benefit not yet manifested | [`SR-STL-ARCHIVE-01`](#sr-stl-archive-01), [`SR-STL-ARCHIVE-02`](#sr-stl-archive-02) | The browser does not inspect the ZIP. |
| <a id="sps-stl-archive-03"></a>`SPS-STL-ARCHIVE-03 — Await and prepare the ZIP source` | The application checks exact/implicit ZIP candidates and polls only absence while ChatGPT remains foreground; a found ZIP produces prepared handoff authority. | [Project source-resolution step](../../features/open-local-project.md#fbs-stl-project-02) and [preparation step](../../features/open-local-project.md#fbs-stl-project-03) | Prepared archive-source handoff or visible non-success | Benefit not yet manifested | [`SR-STL-ARCHIVE-02`](#sr-stl-archive-02) | Unsafe/ineligible existing sources fail rather than waiting. |
| <a id="sps-stl-archive-04"></a>`SPS-STL-ARCHIVE-04 — Cross into VS Code` | Browser/OS protocol handling activates VS Code and establishes coordinator-owner continuity before single redemption. | Browser/OS; [focus-transfer step](../../features/open-local-project.md#fbs-stl-project-04) and [redemption step](../../features/open-local-project.md#fbs-stl-project-05); VS Code | [`FDO-STL-PREPARED-PROJECT-LAUNCH`](../../features/open-local-project.md#fdo-stl-prepared-project-launch) | Benefit not yet manifested | [`SR-STL-ARCHIVE-01`](#sr-stl-archive-01), [`SR-STL-ARCHIVE-02`](#sr-stl-archive-02) | Retry/copy remains available if automatic protocol launch is blocked. |
| <a id="sps-stl-archive-05"></a>`SPS-STL-ARCHIVE-05 — Materialize and open the project directory` | The archive branch reuses an existing sibling unchanged or safely stages/publishes extraction, then hands the final directory to VS Code. | [Archive Main Path](../../features/extract-open-archive.md#fbs-stl-archive-01); filesystem; VS Code | [`FDO-STL-ARCHIVE-OPEN-OUTCOME`](../../features/extract-open-archive.md#fdo-stl-archive-open-outcome) composed into project outcome | The [`AB-STL-02` archive contribution](../../application-definition.md#ab-stl-02-boundary-archive-branch) manifests on `opened` | [`SR-STL-ARCHIVE-03`](#sr-stl-archive-03) | Source ZIP remains intact; Workspace Trust is unchanged. |
| <a id="sps-stl-archive-06"></a>`SPS-STL-ARCHIVE-06 — Branch on the primary archive result` | The application reports the actual reused/published project result. On non-success the user corrects or retries; on `opened` the prior workspace remains available until any separately confirmed succession close and the optional suffix follows. | User; VS Code | Project context or actionable non-success | Primary `AB-STL-02` manifests on `opened`; non-success ends this invocation, while `opened` enters the optional suffix before final continuation. | [`SR-STL-ARCHIVE-03`](#sr-stl-archive-03) | Extraction disposition remains visible. |
| <a id="sps-stl-archive-succession-01"></a>`SPS-STL-ARCHIVE-SUCCESSION-01 — Enter optional post-open succession` | Only an actually opened reused/published final directory enters the succession Feature; ZIP or handoff non-success issues no cleanup. | current archive/project result; succession Feature | Eligible actual final-root context or no succession operation. | `AB-STL-02` is already manifested; `AB-STL-04` is not yet manifested. | [`SR-STL-ARCHIVE-SUCCESSION-01`](#sr-stl-archive-succession-01) | Reused-child metadata remains authoritative. |
| <a id="sps-stl-archive-succession-02"></a>`SPS-STL-ARCHIVE-SUCCESSION-02 — Read metadata from final directory` | After success, inspect only the actual reused or newly published final root. | succession Feature/Domain | Manifest value from the final directory and valid match/no-op/invalid result. | `AB-STL-04` remains optional; invalid or absent final-root metadata causes no close effect. | [`SR-STL-ARCHIVE-SUCCESSION-02`](#sr-stl-archive-succession-02) | Reused child retains its existing manifest. |
| <a id="sps-stl-archive-succession-03"></a>`SPS-STL-ARCHIVE-SUCCESSION-03 — Decide and coordinate exact cleanup` | Match registrations, present exact targets and honor Open Only/dismiss or confirmed close attempts. | user; succession Slice; VS Code targets | Exact live candidates, user decision and bounded per-target results. | `AB-STL-04` manifests when exact eligible candidates are offered for choice; confirmed close attempts may retire them, while Open Only retains them. | [`SR-STL-ARCHIVE-SUCCESSION-03`](#sr-stl-archive-succession-03) | A later target can cancel after an earlier confirmed close. |
| <a id="sps-stl-archive-succession-04"></a>`SPS-STL-ARCHIVE-SUCCESSION-04 — Continue in archive project` | Source ZIP/final directory remain and secondary outcome is shown. | user / VS Code | Primary opened result plus actual secondary disposition; source/archive remain intact. | `AB-STL-02` remains satisfied; `AB-STL-04` closes truthfully after an eligible choice/result. Absent, invalid or unmatched declarations end this invocation without manifesting `AB-STL-04`. | [`SR-STL-ARCHIVE-SUCCESSION-03`](#sr-stl-archive-succession-03) | Partial cleanup does not delete the ZIP or fail the opened project. |

| Scenario Requirement | Type | Plain required interaction/journey meaning | QRPE / Examples |
|---|---|---|---|
| <a id="sr-stl-archive-01"></a>`SR-STL-ARCHIVE-01 — Preserve archive-selector correlation` | Continuity, Identity | The copied selector, prepared authority, selected ZIP and final project outcome remain one correlated journey without destination/source substitution. | The Feature owners remain canonical for candidate and extraction rules. |
| <a id="sr-stl-archive-02"></a>`SR-STL-ARCHIVE-02 — Keep delayed archive handoff recoverable` | Continuity, Visibility | Waiting occurs without premature application switching; blocked protocol automation retains retry/copy state and never claims extraction/opening completed. | Covers external journey continuity, not coordinator internals. |
| <a id="sr-stl-archive-03"></a>`SR-STL-ARCHIVE-03 — Preserve source and project-window continuity` | Safety, Continuity | The source ZIP remains available and the primary open leaves the previous workspace available while exposing extracted versus reused outcome. Only later, separate, explicitly confirmed succession may close an exact eligible predecessor; non-target windows remain. Workspace Trust/final placement stay with VS Code and the user. | Reused destination is not refreshed from the ZIP. |
| <a id="sr-stl-archive-succession-01"></a>`SR-STL-ARCHIVE-SUCCESSION-01 — Preserve archive safety and primary result` | Safety, Continuity | Succession cannot weaken source preservation, bounded publication/reuse or truthful archive-open result. | Source ZIP and final directory survive optional cleanup. |
| <a id="sr-stl-archive-succession-02"></a>`SR-STL-ARCHIVE-SUCCESSION-02 — Existing destination metadata remains authoritative` | Identity, Consistency | A reused destination is not overwritten/refreshed from the ZIP; the manifest actually present in the final root is used. | Embedded ZIP metadata cannot replace reused-child metadata. |
| <a id="sr-stl-archive-succession-03"></a>`SR-STL-ARCHIVE-SUCCESSION-03 — Cleanup remains secondary and explicit` | User Decision, Recovery | Candidate close attempts require confirmation and cannot delete archives or invalidate successful opening. | Open Only and dirty cancellation preserve the replacement result. |

E2E Proof Intent: installed explicit/implicit ZIP paths through new extraction
and reuse, verifying manifest source, preservation and partial cleanup.

#### RU-SCEN-02 — Evolution Impact

**Methodology:** [RU-SCEN-02 Unit Definition](../../idtspe-methodology/active/profiles/sds/target-modules/TM-SCENARIO-PLANNING.md#ru-scen-02--evolution-impact).

Disposition: `OMITTED`; this is the future replacement body owned by the Step.

#### RU-SCEN-03 — Journey Realization Concerns

**Methodology:** [RU-SCEN-03 Unit Definition](../../idtspe-methodology/active/profiles/sds/target-modules/TM-SCENARIO-PLANNING.md#ru-scen-03--journey-realization-concerns).

Live proof must show final-root identity remains correct across extraction,
existing-directory reuse and new-window routing.

<a id="target-scenario-stl-copy-trusted-project"></a>
### Target Scenario Body — SCN-STL-COPY-TRUSTED-PROJECT

#### RU-SCEN-01 — Journey Composition

**Methodology:** [RU-SCEN-01 Unit Definition](../../idtspe-methodology/active/profiles/sds/target-modules/TM-SCENARIO-PLANNING.md#ru-scen-01-processing-envelope), [Journey Shape](../../idtspe-methodology/active/profiles/sds/target-modules/TM-SCENARIO-PLANNING.md#journey-shape).

Actor/context: the user publishes/reuses a final child below the configured
parent and optionally retires exact participating predecessors declared by
that final child.

The `SPS-STL-TRUST-01..07` and `SR-STL-TRUST-01..03` rows retain the current
trusted-copy source, handoff and primary-open journey as post-Step meaning.
`SPS-STL-TRUST-07` ends non-success or branches from `opened` into the
optional succession suffix and final user continuation.

| Scenario Path Step | Actor / application interaction | Feature / participant | Data/result | Benefit manifestation / closure | Attached SR | QRPE / Examples |
|---|---|---|---|---|---|---|
| <a id="sps-stl-trust-01"></a>`SPS-STL-TRUST-01 — Supply one project selector` | ChatGPT emits one project name/relative path or one absolute local selector; the user copies it. | External producer / user | Plain selector text; `.zip` optional | Benefit not yet manifested | [`SR-STL-TRUST-01`](#sr-stl-trust-01) | No destination, trust flag or extension URI is required from ChatGPT. |
| <a id="sps-stl-trust-02"></a>`SPS-STL-TRUST-02 — Invoke trusted-copy opening` | The user selects **Скопировать в доверенные · открыть**; the Screen combines the copied selector with saved source-root/wait preferences while the destination remains machine-configured in VS Code. | [Screen](../../screens/chatgpt-launcher-widget.md); user | [`FDO-STL-PROJECT-OPEN-REQUEST`](../../features/open-local-project.md#fdo-stl-project-open-request) plus trusted-copy action identity | Benefit not yet manifested | [`SR-STL-TRUST-01`](#sr-stl-trust-01), [`SR-STL-TRUST-02`](#sr-stl-trust-02) | Browser input cannot override the destination parent or trust policy. |
| <a id="sps-stl-trust-03"></a>`SPS-STL-TRUST-03 — Await and prepare the exact source` | The application checks or boundedly awaits the folder/ZIP and prepares one correlated launch only after discovery while ChatGPT remains foreground. | [Trusted-copy source step](../../features/copy-trusted-project.md#fbs-stl-trust-01); [ProjectSelector Domain](../../domain/local-project-selector.md); [prepared handoff Shared capability](../../shared/prepared-project-handoff.md) | Eligible resolved source and opaque prepared authority, or truthful rejection/timeout | Benefit not yet manifested | [`SR-STL-TRUST-01`](#sr-stl-trust-01), [`SR-STL-TRUST-03`](#sr-stl-trust-03) | Collision or I/O failure does not masquerade as waiting. |
| <a id="sps-stl-trust-04"></a>`SPS-STL-TRUST-04 — Cross into the owning VS Code window` | The browser invokes the token-only focus link; browser/OS may confirm the protocol, and VS Code establishes the owning-window handoff before single redemption. | Browser/OS; [trusted-copy Feature](../../features/copy-trusted-project.md#fbs-stl-trust-01); [prepared handoff Shared capability](../../shared/prepared-project-handoff.md); VS Code | Acknowledged single-use authority or visible recoverable handoff failure | Benefit not yet manifested | [`SR-STL-TRUST-01`](#sr-stl-trust-01), [`SR-STL-TRUST-03`](#sr-stl-trust-03) | Retry/copy controls preserve the same prepared operation without exposing project data in the URI. |
| <a id="sps-stl-trust-05"></a>`SPS-STL-TRUST-05 — Establish destination and publication decision` | VS Code derives the child below its configured parent. An existing safe child proceeds unchanged; an absent child requires the user to confirm the displayed canonical source, destination and trust warning. | [Destination step](../../features/copy-trusted-project.md#fbs-stl-trust-02) and [decision step](../../features/copy-trusted-project.md#fbs-stl-trust-03); user | [`FDO-STL-TRUSTED-DESTINATION`](../../features/copy-trusted-project.md#fdo-stl-trusted-destination) and confirm/cancel decision where applicable | Benefit not yet manifested; cancellation closes without publication | [`SR-STL-TRUST-02`](#sr-stl-trust-02), [`SR-STL-TRUST-03`](#sr-stl-trust-03) | Safe existing-child reuse skips the copy-specific confirmation because no publication occurs. |
| <a id="sps-stl-trust-06"></a>`SPS-STL-TRUST-06 — Reuse or publish and open the child` | VS Code leaves a safe-existing child unchanged or publishes a complete folder/ZIP-derived child, then hands that final directory to a forced project window. | [Publication step](../../features/copy-trusted-project.md#fbs-stl-trust-04) and [window step](../../features/copy-trusted-project.md#fbs-stl-trust-05); VS Code | [`FDO-STL-TRUSTED-PROJECT-OUTCOME`](../../features/copy-trusted-project.md#fdo-stl-trusted-project-outcome) | [`AB-STL-03`](../../application-definition.md#ab-stl-03--publish-under-a-chosen-parent) manifests on `opened`; retained path remains visible after window failure | [`SR-STL-TRUST-02`](#sr-stl-trust-02), [`SR-STL-TRUST-03`](#sr-stl-trust-03) | The source remains intact; no merge, overwrite or automatic trust grant occurs. |
| <a id="sps-stl-trust-07"></a>`SPS-STL-TRUST-07 — Branch on the primary final-child result` | The application reports the actual final-child result and VS Code's trust state. On non-success the user acts on truthful cancellation/rejection/failure; on `opened` the prior workspace remains until any separately confirmed succession close and the optional suffix follows. | User; VS Code Workspace Trust | Final child context and visible primary result | Primary `AB-STL-03` manifests on `opened`; non-success ends this invocation, while `opened` enters the optional suffix before final continuation. | [`SR-STL-TRUST-03`](#sr-stl-trust-03) | Parent trust configuration and final foreground placement remain user/host-owned. |
| <a id="sps-stl-trust-succession-01"></a>`SPS-STL-TRUST-SUCCESSION-01 — Enter optional post-open succession` | Only an actually opened final child enters the succession Feature; failed publication, reuse or handoff closes no predecessor. | current trusted-copy result; succession Feature | Eligible final-child context or no succession operation. | `AB-STL-03` is already manifested; `AB-STL-04` is not yet manifested. | [`SR-STL-TRUST-SUCCESSION-01`](#sr-stl-trust-succession-01) | Publication consent remains distinct from cleanup consent. |
| <a id="sps-stl-trust-succession-02"></a>`SPS-STL-TRUST-SUCCESSION-02 — Inspect the final child` | After success, read only the manifest actually present in the published/reused child. | succession Feature/Domain | Existing final-child manifest and valid match/no-op/invalid result. | `AB-STL-04` remains optional; reused-child metadata controls its candidate boundary. | [`SR-STL-TRUST-SUCCESSION-02`](#sr-stl-trust-succession-02) | No metadata refresh from the source package. |
| <a id="sps-stl-trust-succession-03"></a>`SPS-STL-TRUST-SUCCESSION-03 — Choose retention or bounded cleanup` | Exact live siblings are displayed; user chooses Open Only/dismiss or confirmed close attempts. | user; succession Slice; VS Code | Exact candidates, separate cleanup decision and bounded per-target results. | `AB-STL-04` manifests when exact eligible candidates are offered for choice; confirmed close attempts may retire them, while Open Only retains them. | [`SR-STL-TRUST-SUCCESSION-03`](#sr-stl-trust-succession-03) | A dirty predecessor may cancel closing. |
| <a id="sps-stl-trust-succession-04"></a>`SPS-STL-TRUST-SUCCESSION-04 — Continue in final child` | Final child remains open, actual Workspace Trust stays VS Code-owned and secondary result is shown. | user / VS Code | Primary opened result, actual Workspace Trust state and truthful secondary disposition. | `AB-STL-03` remains satisfied; `AB-STL-04` closes truthfully after an eligible choice/result. Absent, invalid or unmatched declarations end this invocation without manifesting `AB-STL-04`. | [`SR-STL-TRUST-SUCCESSION-03`](#sr-stl-trust-succession-03) | Partial cleanup cannot invalidate the final-child opening. |

| Scenario Requirement | Type | Plain required interaction/journey meaning | QRPE / Examples |
|---|---|---|---|
| <a id="sr-stl-trust-01"></a>`SR-STL-TRUST-01 — Preserve source and action correlation` | Continuity, Identity, Authority | The copied selector, trusted-copy action, resolved source, prepared authority and redeemed operation must remain one journey; the browser may supply neither destination authority nor a trust decision. | References Feature authority mechanics instead of restating token implementation. |
| <a id="sr-stl-trust-02"></a>`SR-STL-TRUST-02 — Keep publication authority locally visible` | User Decision, Visibility | Before an absent child can be published, the owning VS Code interaction must show the actual canonical source and destination and obtain explicit confirmation; safe-existing reuse must remain visibly no-copy. | A browser-side click alone never authorizes filesystem publication. |
| <a id="sr-stl-trust-03"></a>`SR-STL-TRUST-03 — Preserve recoverable project continuity` | Continuity, Safety, Visibility | The source remains intact and primary opening leaves the prior workspace available; deferred handoff is recoverable and the result identifies the retained/reused child. Only later, separate, explicitly confirmed succession may close an exact eligible predecessor; non-target windows remain. Opening by location never grants Workspace Trust or guaranteed foreground. | Covers the complete cross-system journey rather than one Feature implementation branch. |
| <a id="sr-stl-trust-succession-01"></a>`SR-STL-TRUST-SUCCESSION-01 — Preserve publication/trust authority` | Authority, Continuity | Succession starts only after final-child success and cannot change source, destination, confirmation or Workspace Trust meaning. | Workspace Trust remains VS Code/user-owned. |
| <a id="sr-stl-trust-succession-02"></a>`SR-STL-TRUST-SUCCESSION-02 — Use final-child metadata without refresh` | Consistency | A safely reused child remains unchanged; its existing manifest is authoritative for optional cleanup. | Source metadata cannot overwrite the reused child. |
| <a id="sr-stl-trust-succession-03"></a>`SR-STL-TRUST-SUCCESSION-03 — Keep cleanup explicit and secondary` | User Decision, Recovery | Exact close confirmation is independent of publication confirmation and partial cleanup cannot invalidate final-child opening. | Open Only and partial cleanup both keep final child open. |

E2E Proof Intent: installed absent-child publication and safe-existing reuse,
including separate publication/cleanup decisions, Workspace Trust UI and dirty
previous-window cancellation.

#### RU-SCEN-02 — Evolution Impact

**Methodology:** [RU-SCEN-02 Unit Definition](../../idtspe-methodology/active/profiles/sds/target-modules/TM-SCENARIO-PLANNING.md#ru-scen-02--evolution-impact).

Disposition: `OMITTED`; this is the future replacement body owned by the Step.

#### RU-SCEN-03 — Journey Realization Concerns

**Methodology:** [RU-SCEN-03 Unit Definition](../../idtspe-methodology/active/profiles/sds/target-modules/TM-SCENARIO-PLANNING.md#ru-scen-03--journey-realization-concerns).

Live proof must distinguish publication confirmation, Workspace Trust and the
later optional cleanup confirmation across the correct VS Code windows.

## RU-EVO-03 — Step-wide Implementation Concerns

**Methodology:** [RU-EVO-03 Unit Definition](../../idtspe-methodology/active/profiles/sds/target-modules/TM-EVOLUTION-STEP.md#ru-evo-03--step-wide-implementation-concerns).

- Recheck how the existing acknowledgement/redemption ownership Problem
  [`P-STL-HANDOFF-01`](../../shared/prepared-project-handoff.md#p-stl-handoff-01)
  affects token isolation, coordinator ownership and at-most-once behavior
  under the added succession operation.
- Coordinate the succession Slice's [registration](#ir-slice-stl-succession-02)
  and [callback](#ir-slice-stl-succession-04) boundaries
  with the [Shared handoff's opaque authority](../../shared/prepared-project-handoff.md#ir-shared-stl-handoff-03)
  on their common loopback host. The two owner-local token contracts and the
  existing race make integration ordering and proof material.
- Recheck cross-owner result composition when target cancellation or
  unavailability follows successful project opening; the durable secondary
  outcome belongs to [the succession Feature](#br-stl-succession-09), and
  transition proof is held in [TO-STL-SUCCESSION-01](#to-stl-succession-01).
- Literal endpoint/class/config/test topology remains Core Exact territory.

## RU-EVO-04 — Target Owner Materialization Set

**Methodology:** [RU-EVO-04 Unit Definition](../../idtspe-methodology/active/profiles/sds/target-modules/TM-EVOLUTION-STEP.md#ru-evo-04--target-owner-materialization-set).

| Operation | Target owner | Materialize only when |
|---|---|---|
| CREATE | [Target Feature](#target-feature-stl-apply-project-succession) | behavior implementation and deterministic whole-Feature proof pass |
| CREATE | [Target Domain](#target-domain-stl-project-succession-manifest) | parser/normalizer/containment proof pass |
| CREATE | [Target Slice](#target-slice-stl-apply-project-succession) | authenticated multi-window whole-Slice proof pass |
| REPLACE | [SCN-STL-OPEN-SELECTED-PROJECT](#target-scenario-stl-open-selected-project) | composed current-project plus succession journey is implemented/revalidated |
| REPLACE | [SCN-STL-OPEN-SELECTED-FOLDER](#target-scenario-stl-open-selected-folder) | composed folder plus succession journey is implemented/revalidated |
| REPLACE | [SCN-STL-OPEN-DOWNLOADED-ARCHIVE](#target-scenario-stl-open-downloaded-archive) | composed ZIP plus succession journey is implemented/revalidated |
| REPLACE | [SCN-STL-COPY-TRUSTED-PROJECT](#target-scenario-stl-copy-trusted-project) | composed trusted-copy plus succession journey is implemented/revalidated |

Application Definition/navigation maintenance and Step compaction follow
realization but are not semantic materialization operations. The current
prepared-handoff Shared owner is revalidated, not replaced.

## RU-EVO-05 — Transition / Proof Obligations

**Methodology:** [RU-EVO-05 Unit Definition](../../idtspe-methodology/active/profiles/sds/target-modules/TM-EVOLUTION-STEP.md#ru-evo-05--transition--proof-obligations).

| Obligation | Transition-wide must-hold |
|---|---|
| <a id="to-stl-succession-01"></a>`TO-STL-SUCCESSION-01 — No primary-open regression` | Every current folder/ZIP/trusted branch retains its accepted opening behavior. Before successful final-root opening, valid manifest/candidate resolution and explicit close confirmation, no predecessor close request is issued. Once confirmed requests begin, a later cleanup failure cannot erase already completed closes; report the actual partial secondary outcome without manufacturing or rewriting primary success/failure. |
| `TO-STL-SUCCESSION-02 — Exact bounded authority` | Manifest parsing, sibling resolution, registration matching, confirmation and callbacks never widen beyond exact declared participating local single-root windows. |
| `TO-STL-SUCCESSION-03 — Replacement continuity` | No predecessor close request is sent until the replacement root has a live instance able to retain operation/result continuity. |
| `TO-STL-SUCCESSION-04 — Target-owned close and dirty decision` | Each target revalidates its root and VS Code retains save/discard/cancel authority; cancellation is a retained-window outcome. |
| `TO-STL-SUCCESSION-05 — Truthful bounded aggregation` | Expiry, replay, stale/wrong-root callbacks, timeout and partial failure yield bounded per-target results without indefinite retry or duplicate effects. |
| `TO-STL-SUCCESSION-06 — Real installed proof` | Installed multi-window observation includes absent/invalid manifest, no match, Open Only, successful close, dirty cancellation, partial failure, replacement focus and Workspace Trust neutrality. |
| `TO-STL-SUCCESSION-07 — Resolve prepared-handoff proof dependency` | Before Step proof and owner materialization pass, resolve [`P-STL-HANDOFF-01`](../../shared/prepared-project-handoff.md#p-stl-handoff-01) against its Shared-owner closure conditions while preserving at-most-once authority. |

Literal test cases/files belong to Core Exact. Real-environment collection is
planned by
[`PTEST-STL-PROJECT-SUCCESSION-MULTI-WINDOW`](../../practical-tests/project-succession-multi-window.md).

## RU-EVO-06 — Planning Completeness / Realization Start Readiness

**Methodology:** [RU-EVO-06 Unit Definition](../../idtspe-methodology/active/profiles/sds/target-modules/TM-EVOLUTION-STEP.md#ru-evo-06--planning-completeness--realization-start-readiness).

Planning Completeness: `COMPLETE` for the selected first increment.

Basis: `RU-EVO-01` resolves the boundary, direct predecessor and seven-body
index; `RU-EVO-02` retains one bounded Shared revalidation Impact; `RU-EVO-03`
resolves cross-owner implementation concerns; `RU-EVO-04` names seven
`CREATE`/`REPLACE` transitions; `RU-EVO-05` states transition/proof obligations;
and this `RU-EVO-06` records separate planning and start conclusions. The full
Target Feature, Domain, Slice and four Scenario Bodies are present in this Step, and
the Shared boundary Decision is accepted. The open Shared-owner
[`P-STL-HANDOFF-01`](../../shared/prepared-project-handoff.md#p-stl-handoff-01)
has an explicit `TO-STL-SUCCESSION-07` proof/materialization gate; it does not
block planning or realization start. Remote/multi-root/cross-platform case
policy and automatic unconfirmed cleanup remain deliberately outside scope.

Realization Start Readiness: `READY`.

The predecessor is realized/materialized. The open Shared-owner
`P-STL-HANDOFF-01` is routed through `TO-STL-SUCCESSION-07`: realization can
start with its deterministic ownership correction, but Step proof and owner
materialization cannot pass while the Problem remains open. `READY` does not
mean implemented, proved or realized. Actual realization execution still
requires the enclosing route's separate implementation authority.
