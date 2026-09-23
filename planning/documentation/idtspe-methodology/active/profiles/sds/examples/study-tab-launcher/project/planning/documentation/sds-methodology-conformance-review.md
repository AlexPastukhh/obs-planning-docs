# SDS methodology conformance review — 2026-09-24

Status: final methodology QA and repair record. `PROP-METH-01..14` were
applied as documentation corrections on 2026-09-24. This file is not a
semantic owner and does not materialize the selected Evolution Step or change
current implemented behavior.

## Basis and scope

- Reviewed the working-tree `planning/documentation/` representation against the user-supplied `obs-planning-docs-main (100).zip` methodology snapshot (SHA-256 `C3188D0857C6A759092DA5D085DC398EF041520F7D660BB708306E2FACBA2311`). Governing paths in that archive are relative to `planning/documentation/idtspe-methodology/active/`.
- Primary method owners: [Evolution Step](idtspe-methodology/active/profiles/sds/target-modules/TM-EVOLUTION-STEP.md), [Scenario Planning](idtspe-methodology/active/profiles/sds/target-modules/TM-SCENARIO-PLANNING.md), [Screen](idtspe-methodology/active/profiles/sds/target-modules/TM-SCREEN.md), [Application Definition](idtspe-methodology/active/profiles/sds/target-modules/TM-APPLICATION-DEFINITION.md), [Core Unit/Target Step Result Model](idtspe-methodology/active/idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md), [Finding Disposition](idtspe-methodology/active/idtspe-core/resolution/findings/FINDING-DISPOSITION.md) and [Proposal/Decision Lifecycle](idtspe-methodology/active/idtspe-core/resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md). These links target the pinned copy of the user-supplied snapshot, not a second application semantic owner.
- Focus: Application Definition, current Feature/Scenario/Slice/Screen connections, the selected future Step, and documentation traceability. This is a semantic documentation review, not implementation or installed-behavior proof. All positions refer to the working tree on the date above, including files not yet committed.
- Route labels record the applied `RE-0` disposition for deterministic representation corrections or completion of already selected meaning. No new unresolved semantic choice was needed for these repairs.

## Confirmed boundaries and checks

The selected `AB-STL-04` in the [Application Definition](application-definition.md#ab-stl-04--retire-superseded-project-windows) is valid upstream intent. The [selected succession Step](evolution/unrealized/close-superseded-project-windows.md) keeps its unimplemented target behavior separate from current owners. No finding below asks to materialize that Step early.

Identifier coverage checks found all **31 current `FBS-*`** identifiers in their corresponding current Slice files and all **15 current `SR-*`** identifiers in at least one current Slice. These are link-presence checks, not proof of complete semantic realization. The expected `RU-*` heading inventory was present in the reviewed owner types. A path-only scan of 738 relative Markdown links under `planning/documentation/` found no missing target files; it did not validate fragments. No succession implementation signal was found in the scanned source/test paths, which is consistent with the future-Step boundary.

The second review's four concerns about Target Bodies, Scenario table shapes, partial cleanup, and normalized manifest identity are confirmed. Its proposed relocation of the handoff Problem's proof condition is also supported. The Screen mapping concern adds a current-owner finding. This review additionally carries forward methodology-binding and stale-methodology-status findings from the first pass.

## Finding and Proposal register

| Finding | Priority | Applied route | Natural correction owner | Linked Proposal | Repair status |
|---|---|---|---|---|---|
| `F-METH-01` Full bodies are nested as `RU-EVO-02` Impacts | High | RE-0 | selected Step | `PROP-METH-01` | APPLIED |
| `F-METH-02` Four future Scenario Bodies use shortened required tables | High | RE-0 | selected Step's Scenario Bodies | `PROP-METH-02` | APPLIED |
| `F-METH-03` `TO-STL-SUCCESSION-01` contradicts permitted partial cleanup | High | RE-0 | selected Step, `RU-EVO-05` | `PROP-METH-03` | APPLIED |
| `F-METH-04` Domain invariant does not reject duplicate normalized folder targets | Medium | RE-0 | selected Step's Domain Body | `PROP-METH-04` | APPLIED |
| `F-METH-05` Current Screen map omits explicit Feature and Scenario participation | Medium | RE-0 | current Screen owner | `PROP-METH-05` | APPLIED |
| `F-METH-06` Handoff Problem proof gate is placed in implementation concerns | Medium | RE-0 | selected Step, `RU-EVO-03/05` | `PROP-METH-06` | APPLIED |
| `F-METH-07` Authored Unit content lacks exact Methodology bindings | Medium | RE-0 | affected working representations | `PROP-METH-07` | APPLIED |
| `F-METH-08` README/audit describe adopted method as an unadopted local refinement | Low | RE-0 | documentation navigation and audit status | `PROP-METH-08` | APPLIED |
| `F-METH-09` Future replacement Scenarios omit the current journey content | High | RE-0 | selected Step's four Target Scenario Bodies | `PROP-METH-09` | APPLIED |
| `F-METH-10` Trusted-copy journey and Slice borrow ordinary-project handoff ownership | Medium | RE-0 | current trusted Feature/Scenario/Slice and Shared owner | `PROP-METH-10` | APPLIED |
| `F-METH-11` Succession aggregate dispositions overlap or lack terminal meanings | Medium | RE-0 | selected Target Feature and Target Scenarios | `PROP-METH-11` | APPLIED |
| `F-METH-12` Step implementation concerns repeat owner-local must-holds | Low | RE-0 | selected Step `RU-EVO-03` | `PROP-METH-12` | APPLIED |
| `F-METH-13` Step readiness mixes method status with external authorization | Low | RE-0 | selected Step `RU-EVO-06` and Steps Map | `PROP-METH-13` | APPLIED |
| `F-METH-14` Shared ingress QRPE denies its own loopback listener | Low | RE-0 | current prepared-handoff Shared owner | `PROP-METH-14` | APPLIED |

Repair evidence: the [selected Step](evolution/unrealized/close-superseded-project-windows.md) now has one bounded `RU-EVO-02` Impact, seven independently addressable Target Bodies, four seven-column path tables and four four-column SR tables with the retained current paths and Requirements, a stage-correct `TO-01`, explicit normalized-identity uniqueness and `TO-07` for the Shared Problem. Its five secondary dispositions have distinct stage/result meanings, and each replacement Scenario separates primary-open closure from optional post-open cleanup. The [Screen owner](screens/chatgpt-launcher-widget.md) maps its actions to current Features and Scenarios; the [trusted-copy owners](features/copy-trusted-project.md) and [Shared handoff](shared/prepared-project-handoff.md) now trace the trusted browser route to its own Feature authority. The [Application Definition](application-definition.md), [README](README.md) and [historical audit](sds-documentation-audit.md) distinguish adopted Benefit-local boundary governance from local linking practice. The user-supplied methodology is pinned as a [local reference snapshot](idtspe-methodology/SNAPSHOT-PROVENANCE.md); 131 persisted `RU-*` sections have exact `**Methodology:**` bindings, and all 146 links in those bindings resolve to a copied method file and heading/anchor.

Post-repair structural checks: all four future Scenario path tables have seven columns and all four SR tables have four; the final independent project-local scan found 998 resolving relative Markdown file links and 1,016 resolving fragments across 38 project Markdown files, with 108 unique explicit IDs in the selected Step. These checks do not replace semantic or installed-system proof.

## Findings and applied Proposals

Evidence paragraphs record the pre-repair state observed on 2026-09-24. The
register above and the repair evidence paragraph state the current disposition.

### F-METH-01 — Complete Target Bodies inside the Impact collection

**Evidence.** In the [selected Step](evolution/unrealized/close-superseded-project-windows.md), `RU-EVO-02` calls itself a seven-item collection. Items 1–6 contain a full Target Domain Body, Target Slice Body, and four Target Scenario Bodies; item 7 is the bounded revalidation of the current Shared handoff owner. The Target Feature Body already has a separate address. Snapshot `TM-EVOLUTION-STEP.md`, `RU-EVO-02` and **Target Owner Bodies** (lines 236–310), makes complete `CREATE`/`REPLACE` bodies peer Step-owned bodies. An Impact may reference a complete body only if a distinct bounded impact still has a purpose. Location inside one Step file does not make a full body an Impact item.

**PROP-METH-01 — APPLIED (RE-0).** Reorganize this Step so its Target Feature, Domain, Slice and four Scenario Bodies are independently addressable Step-owned sections or linked files. Keep one `RU-EVO-02` collection for actual bounded Impacts, including Shared revalidation if its distinct consequence remains material; omit the Unit with a reason if none remain. Update `RU-EVO-01` body index, `RU-EVO-04` references, and any anchor links while preserving the future/current authority boundary. Then independently re-evaluate the `RU-EVO-06` `COMPLETE` and `READY` explanations against all six Step Unit dispositions, seven full bodies, owner transitions and material Q/R/P; do not carry the prior labels forward by assumption.

**Semantic change impact.** Expected representation-only: no new upstream Benefit, current-owner behavior or materialization operation. If separating an Impact reveals an unresolved owner, body, or transition, record that as a new Finding and revalidate completeness/readiness. **Acceptance:** each `CREATE`/`REPLACE` row resolves to exactly one ordinary complete Target Body; no full body is counted as an Impact item; body links and `RU-EVO-06` rationale remain truthful.

### F-METH-02 — Incomplete ordinary Scenario Body table shape

**Evidence.** The four future Scenario Bodies in the [Step](evolution/unrealized/close-superseded-project-windows.md#target-scenario-stl-open-selected-project) have four-column path tables (`Benefit / Attached SR` merged) and three-column Scenario Requirement tables. Snapshot `TM-SCENARIO-PLANNING.md` (lines 201–215 and 233) specifies seven path columns — `Scenario Path Step`, `Actor / application interaction`, `Feature / participant`, `Data/result`, `Benefit manifestation / closure`, `Attached SR`, `QRPE / Examples` — and four Requirement columns ending in `QRPE / Examples`. The current realized Scenario files use the full forms. Presence of `SPS-*`, `SR-*`, and three Scenario Unit headings alone does not establish a complete ordinary post-Step Body.

**PROP-METH-02 — APPLIED (RE-0).** For all four future Scenarios, split the combined field and complete the prescribed seven-column path and four-column Requirement tables. State the actual data/result and Benefit closure per path step; keep `QRPE / Examples` separate and use a justified empty/not-applicable entry where no example is material. Preserve existing `SPS-*`/`SR-*` identities and check every Scenario's `RU-SCEN-02/03` disposition and current-journey continuity. Do not invent a result merely to fill a cell.

**Semantic change impact.** Expected completion of existing selected journey meaning, with no new Feature behavior. An inability to state a material result or closure is an unresolved semantic issue, requiring a new Finding and Step readiness recheck. **Acceptance:** all four bodies meet the ordinary Scenario schema, each path has traceable SR and Benefit relation, and partial/cancelled cleanup remains a secondary truthful outcome.

### F-METH-03 — `TO-01` says any cleanup failure closes nothing

**Evidence.** [`TO-STL-SUCCESSION-01`](evolution/unrealized/close-superseded-project-windows.md) says “open failure, invalid metadata and cleanup failure close nothing.” The same Step permits per-target partial cleanup in `TO-STL-SUCCESSION-05`, the Target Feature outcome, and `BR-STL-SUCCESSION-09`: some confirmed predecessors may close before a later target fails or cancels. The blanket cleanup-failure clause therefore conflicts with the selected outcome model.

**PROP-METH-03 — APPLIED (RE-0).** Rewrite `TO-01` as two stage-specific invariants: before successful final-root opening, valid manifest/candidate validation and user confirmation, no predecessor close request is issued; once confirmed close attempts begin, each completed close remains a real effect and later failure/cancellation produces a truthful `partial` secondary result without changing primary open success. Align `TO-05` wording and proof cases to the same stage boundary.

**Semantic change impact.** Clarifies the already selected Feature/transition meaning; it does not authorize new close targets. **Acceptance:** no sentence requires “zero closed” after a later cleanup failure; tests/proof can distinguish no-effect gate failure from partial post-confirmation completion.

### F-METH-04 — Duplicate manifest identities after `.zip` normalization

**Evidence.** The [Target Domain contract](evolution/unrealized/close-superseded-project-windows.md#target-domain-stl-project-succession-manifest) says `supersedes` raw strings are unique under case-insensitive Windows comparison and permits optional `.zip` normalization to a folder stem. Its `IR-DOMAIN-STL-SUCCESSION-02` requires rejection of duplicate identities. `project` and `project.zip` are different raw strings but resolve to the same normalized folder target.

**PROP-METH-04 — APPLIED (RE-0).** Add an invariant requiring unique **normalized direct-child folder identities** under the same Windows case-insensitive comparison, after optional `.zip` suffix removal. State that aliases such as `project`/`project.zip` (including case variants) invalidate the manifest instead of causing duplicate match/close attempts. Align the Domain IR, the Feature's manifest-validation behavior reference, and QRPE/proof examples without relaxing containment or cardinality bounds.

**Semantic change impact.** Makes the existing “reject duplicate identities” requirement explicit at its Domain owner; no new manifest field or discovery policy. If the intended policy is instead alias deduplication, that is a different semantic choice and needs explicit resolution before editing. **Acceptance:** one canonical folder target maps to at most one declaration entry, and malformed aliases cannot trigger repeated effects.

### F-METH-05 — Screen actions lack explicit Feature/Scenario map

**Evidence.** [`RU-SCREEN-01`](screens/chatgpt-launcher-widget.md) lists widget controls and actions but does not identify participating Feature owners or Scenario roles. Snapshot `TM-SCREEN.md` (lines 14–22, 64–82, 121–135, 187–194) assigns material Feature presence/availability and Scenario × Screen participation to the Screen map/draft. The widget is the only current browser Screen, so this relation is compact and material.

**PROP-METH-05 — APPLIED (RE-0).** Add a small table in the current Screen owner mapping the four file buttons to [file-context Feature](features/open-linked-file-context.md) and [study-files Scenario](scenarios/open-selected-study-files.md); the adaptive project action to the [project Feature](features/open-local-project.md) and [project Scenario](scenarios/open-selected-project.md), with its folder/ZIP branches linked where visible; and the trusted-copy action to the [trusted-copy Feature](features/copy-trusted-project.md) and [trusted-copy Scenario](scenarios/copy-trusted-project.md). Describe settings, collapse and retry as Screen-local affordances linked to participating journeys where material. Refer to Feature/Scenario owners for action and journey semantics rather than copying them.

**Semantic change impact.** Adds current-owner relationship visibility, with no new widget action or future succession control. **Acceptance:** a reader can follow each material widget action to the existing Feature and Scenario and can see which journeys use the Screen; mappings agree with current owner and implementation evidence.

### F-METH-06 — Handoff Problem condition in the wrong Step Unit

**Evidence.** [`RU-EVO-03`](evolution/unrealized/close-superseded-project-windows.md) says the current Shared owner's open [`P-STL-HANDOFF-01`](shared/prepared-project-handoff.md#p-stl-handoff-01) must be closed before Step proof passes. `RU-EVO-06` repeats that gate, while `RU-EVO-05` owns transition/proof obligations. The Problem's own Shared file is its natural condition owner.

**PROP-METH-06 — APPLIED (RE-0).** Keep in `RU-EVO-03` the cross-owner analysis: how unresolved handoff ownership could affect token isolation, acknowledgement and at-most-once behavior. Put the Step proof gate in `RU-EVO-05`, referencing the Shared Problem and its natural closure conditions rather than restating those conditions. Make `RU-EVO-06` cite that proof obligation when explaining readiness/completeness.

**Semantic change impact.** Moves an existing condition to the responsible Step Unit; it does not close the Problem or change Shared authority. **Acceptance:** the Problem has one natural condition owner, the Step has one explicit proof dependency, and `READY` is not represented as proof complete.

### F-METH-07 — Missing exact Methodology bindings on persisted Unit content

**Evidence.** Snapshot Core `UNIT-AND-TARGET-STEP-RESULT-MODEL.md` (lines 1105–1126) says to write a concise `**Methodology:**` link to the exact governing reusable Unit Definition before substantive Unit content when an authorized working representation is authored. A text scan of the 37 Markdown files under `planning/documentation/` found 131 `RU-*` headings and no `**Methodology:**` bindings. This is a traceability/representation gap; the scan alone does not show that the Unit content is semantically wrong. The files were prepared against an earlier methodology snapshot.

**PROP-METH-07 — APPLIED (RE-0).** Establish the stable method-reference route for this repository, then add exact per-Unit bindings to material persisted Unit content as those owners are reviewed, with a systematic pass for the remaining current and future bodies. Link the governing Unit Definition anchor, not merely the module root; do not paste methodology text into owner bodies. If a required reusable owner or stable address is absent, record an OPEN methodology-owner Finding instead of fabricating a link. Check material non-owner normative summaries for direct Semantic Owner Dependency references to their natural owners as part of the same traceability pass.

**Semantic change impact.** Representation only; owner semantics and selected choices stay where they are. **Acceptance:** every authored material Unit has a resolvable exact primary Methodology binding, omitted Units retain a clear disposition, and non-owner policy restatements have owner dependencies or are removed.

### F-METH-08 — Audit/README methodology status is stale against snapshot `(100)`

**Evidence.** The [documentation README](README.md) and [historical SDS audit](sds-documentation-audit.md) treat Benefit-local `Responsibility Boundary / Benefit Constraints` as a local forward refinement still awaiting methodology adoption (`AUD-09`, `AUD-DIR-06`). Snapshot `TM-APPLICATION-DEFINITION.md` (lines 323–366) already requires Benefit-local `Responsibility Boundary / Constraints`; its heading differs from the local combined label. The historical audit's other forward directions must also be checked against the newer Step contract before being presented as current method status.

**PROP-METH-08 — APPLIED (RE-0).** Preserve the `(94)` audit as a dated record but add a clearly dated supersession note for its current-status claims. Update the README's method-status language to distinguish the now-adopted Benefit-local requirement from any truly local exact-anchor convention; align the local Benefit slot label with the governing contract or document a justified local alias. Reassess `AUD-DIR-01/02` against the snapshot's horizon and Target Body rules and avoid claiming either as a universal fixed workflow.

**Semantic change impact.** Navigation/provenance correction only; `AB-*` content and selected Benefit boundary remain owned by the Application Definition. **Acceptance:** a reader starting at the README can tell which rule is current SDS governance, which is local representation, and which assertions belong solely to the older audit.

### F-METH-09 — Replacement Scenarios omitted their retained journeys

**Evidence.** After the first table-shape repair, each of the four `REPLACE`
[Target Scenario Bodies](evolution/unrealized/close-superseded-project-windows.md#target-scenario-stl-open-selected-project)
still summarized the current journey in one generic row. The current bodies
contain 25 addressable `SPS-*` and 12 `SR-*` rows in total. Snapshot
`TM-EVOLUTION-STEP` requires a complete ordinary post-Step Body for each
`REPLACE` owner; a 7/4 table shape alone cannot preserve current journey
continuity. A verbatim carry-forward would also have contradicted the new
optional close: the current continuity Requirements say the previous workspace
remains available, while confirmed succession may close an exact predecessor.

**PROP-METH-09 — APPLIED (RE-0).** Bring all 25 current `SPS-*` and 12 `SR-*`
identities and their substantive path meaning into the four Step-owned bodies.
At each primary result row, branch non-success to termination and `opened` to
the optional suffix; reserve final user continuation for the suffix terminal
row. Qualify the carried continuity Requirements by stage: primary opening
leaves previous windows available; only later, separately confirmed, exact
eligible predecessors may close. Show when `AB-STL-04` manifests through the
eligible retain/close choice and when absent/invalid/no-match terminates
without that Benefit. Current Scenario files retain current authority.

**Acceptance:** each replacement body is a coherent complete post-Step
journey, and neither path ordering nor carried Requirements promise unconditional
previous-window retention after confirmed cleanup.

### F-METH-10 — Trusted-copy handoff trace used ordinary-project authority

**Evidence.** The current [trusted-copy Scenario](scenarios/copy-trusted-project.md)
listed the ordinary adaptive-project Feature as a participant and linked its
handoff rows to ordinary-project `FBS-*`. The trusted Slice's prepared-handoff
IR related to the ordinary-project handoff Expected Error. The distinct
[trusted-copy Feature](features/copy-trusted-project.md) owned publication and
window behavior but lacked an explicit browser owner-handoff gate and related
Expected Error. The Shared owner has both current consumers.

**PROP-METH-10 — APPLIED (RE-0).** Point trusted journey participation and
`SPS-TRUST-03/04` to the trusted Feature, ProjectSelector Domain and prepared
handoff Shared owner. State the trusted Feature's browser handoff gate in its
existing `FBS-STL-TRUST-01`, own `BR-STL-TRUST-08` and
`ERR-BEH-STL-TRUST-HANDOFF-NOT-ESTABLISHED-09`, and align the trusted Slice
IR/proof and Shared IR trace with those identities. Keep ordinary request data
as an explicitly referenced shared input, not as ordinary Feature participation.

**Acceptance:** the trusted browser route has one Feature authority, its Slice
realizes that authority, and the Shared contract traces both consumers without
copying the Shared token mechanics into a Feature.

### F-METH-11 — Secondary cleanup dispositions were underdefined

**Evidence.** The Target Feature's
[`FDO-STL-SUCCESSION-OUTCOME`](evolution/unrealized/close-superseded-project-windows.md#fdo-stl-succession-outcome)
listed `notApplicable`, `openOnly`, `completed`, `partial` and `failed` without
disjoint terminal conditions. `partial` could mean zero or some confirmed closes;
`failed` could accidentally overwrite already completed target effects.

**PROP-METH-11 — APPLIED (RE-0).** Define the disposition by stage and
per-target result: absent/empty/no match is `notApplicable`; explicit or
dismissed retention is `openOnly`; invalid declaration or pre-processing
coordination failure is `failed`; all selected targets confirmed closed is
`completed`; confirmed processing with a retained/unavailable/unknown target is
`partial`, even if zero closes were confirmed. A later failure or refocus
warning cannot erase a confirmed close or change primary `opened`.

**Acceptance:** the five statuses are mutually exclusive and preserve
per-target truth, including cancellation after one earlier close.

### F-METH-12 — Step-wide concerns repeated durable owner requirements

**Evidence.** The selected Step's `RU-EVO-03` directly restated token
isolation, Windows path equality and primary/secondary result requirements.
Those steady-state must-holds already belong to the Target Slice, Domain and
Feature. Snapshot `TM-EVOLUTION-STEP`, `RU-EVO-03`, assigns this Unit the
cross-owner integration/proof pressure, not a second normative copy.

**PROP-METH-12 — APPLIED (RE-0).** Keep the Shared Problem and common host
as cross-owner integration concerns, link the Slice's registration/callback
IRs and Shared authority IR, and reference the Feature's truthful outcome plus
`RU-EVO-05` proof obligation. Remove duplicate owner-local must-hold prose.

**Acceptance:** `RU-EVO-03` explains why integration/revalidation is material;
durable owner-local rules and transition proof each have one natural owner.

### F-METH-13 — `READY` was conditioned on external permission

**Evidence.** The selected Step and Steps Map said Realization Start Readiness
was `READY once actual implementation authority is given`. Snapshot
`TM-EVOLUTION-STEP`, `RU-EVO-06`, treats `READY` as an internal planning
conclusion; actual selection/authorization remains a separate enclosing-route
condition.

**PROP-METH-13 — APPLIED (RE-0).** Record the Step and map as `READY`, then
state separately that execution requires actual implementation authority.
Keep the open Shared Problem's proof/materialization gate, and do not imply
that `READY` means realized or proved.

**Acceptance:** `COMPLETE`, `READY`, selected status, external authority and
proof/materialization are separately legible.

### F-METH-14 — Shared ingress QRPE denied its loopback listener

**Evidence.** The current Shared owner's
[`IR-SHARED-STL-HANDOFF-01`](shared/prepared-project-handoff.md#ir-shared-stl-handoff-01)
requires requests through a fixed loopback host/port, but its QRPE previously
said no “network-listening” surface was provided. A loopback HTTP listener is
still a listener.

**PROP-METH-14 — APPLIED (RE-0).** Narrow the QRPE to “No externally
reachable listener or arbitrary command surface is provided.” Keep the
loopback and fixed-route ingress requirement unchanged.

**Acceptance:** the Shared contract no longer negates its own transport.

## Final exemplar-quality QA — 2026-09-24

**Methodology conformance.** The project-local SDS owner set and selected
future Step have no remaining confirmed *documentation-contract* blocker in
the areas audited. An independent semantic pass rechecked all four complete
Target Scenario Bodies, 25 retained current `SPS-*`, 12 retained current
`SR-*`, optional suffixes, stage-specific window retention, Benefit closure,
the five secondary statuses and `RU-EVO-03/05/06`. Exact bindings and
structural links were also checked. This is suitable as a worked example of
the current/future owner boundary and explicit Q/R/P treatment, with the
limitations below visible to readers.

**Evidence and limits.** `npm.cmd test` completed with 86 passed, one skipped
and zero failed in the full run. The separate 2026-09-24 ten-run focused
acknowledgement/redemption sample passed five times and failed five times
(expected HTTP `200`, observed `422`). The natural
[`P-STL-HANDOFF-01`](shared/prepared-project-handoff.md#p-stl-handoff-01)
remains `OPEN`/`P1`; installed browser/VS Code and Workspace Trust proof is
still planned, and the selected succession Step is unimplemented. Thus the
documents illustrate truthful method governance, not a fully proved product
or permission to execute the Step.

**Reference snapshot limitation and proposal.** All 279 copied methodology
files are byte-identical to the supplied archive and all 146 Unit-binding
targets resolve. The copied subtree itself has 63 relative-link occurrences
to 15 surrounding source-repository files that were not copied, so it is not
a standalone full methodology bootstrap. If this example must work without
the source archive, place an isolated source-repository mirror alongside the
project and redirect method navigation/bindings after checking the recursive
link closure; copying those files into project `planning/` would collide with
the project's README. The source `MANIFEST.json` also projects 12 SDS Target
Modules while its authoritative registry enumerates 13. Keep the pinned copy
unchanged and use the registry as authority until an upstream snapshot update
fixes that projection. These are source/reference limitations, not current
application-owner contradictions.

## Repair sequence and remaining evidence

1. Clarified the transition and Domain invariants (`PROP-METH-03/04`).
2. Completed the four Scenario schemas, separated Target Bodies from the Impact collection, and moved the Shared Problem proof gate (`PROP-METH-02/01/06`). Rechecked `RU-EVO-04/06` after the bodies were stable.
3. Added current Screen relations (`PROP-METH-05`) without materializing the future Step.
4. Updated the Application Definition heading, README and dated audit status (`PROP-METH-08`).
5. Pinned the user-supplied method snapshot and added exact Unit bindings (`PROP-METH-07`). Methodology files copied from the source retain some links to surrounding source-repository files outside the copied subtree, as noted in snapshot provenance. Future methodology revision requires a separate review of affected bindings and application owner content.
6. Restored the four full post-Step Scenario journeys and their explicit primary/secondary branches (`PROP-METH-09`), then aligned the trusted handoff owner chain (`PROP-METH-10`).
7. Defined disjoint secondary dispositions and clarified Step-wide concerns and readiness (`PROP-METH-11..13`). Rechecked all four Scenario Bodies against the selected Step and Scenario Target Modules.
8. Corrected the current Shared ingress QRPE so its loopback listener and external exposure boundary agree (`PROP-METH-14`).

The applied RE-0 Proposals record documentation repair. The separate test
observations above are evidence for the still-open Shared Problem; they do
not grant implementation authority or permission to materialize the selected
Step.
