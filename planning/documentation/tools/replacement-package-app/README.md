# OBS Replacement Package App

Status: active current documentation
Runtime: Java 21 / Swing with optional Microsoft Edge ChatGPT bridge
Scope: local consumer for replacement packages, repository-work review/finalization/publication, Repository Snapshot export and optional ChatGPT handoff.

## Documentation model

This application intentionally uses a small asymmetric documentation set whose durable owners require explicit **use-case coverage**. Documentation-process owners are justified by Documentation Use Cases; application semantic/contract/proof owners may be justified by the application Scenario, Slice, testing or acceptance process that needs them.

1. [`direction-registry.md`](direction-registry.md) — application route.
2. [`documentation-use-cases.md`](documentation-use-cases.md) — documentation-process authority: Scenario Process design/maintenance, Scenario-owned Application Evolution Steps, evolution sequencing, Domain/Slice implementation changes by those steps, semantic readability/naming, use-case-driven owner creation and generated implementation traces.
3. [`documentation-templates.md`](documentation-templates.md) — recommended starting forms used directly by those Documentation Use Cases. Templates are guidance, not schemas.
4. [`scenarios/README.md`](scenarios/README.md) and Scenario owners — detailed current user/application behavior. **As this documentation model is integrated**, current Scenario owners will be migrated to complete Process Specifications plus canonically owned Application Evolution Steps describing **what application behavior changes**. Planned future Scenario owners may then be added when future user-world behavior is independently meaningful or a replacement target is clearer than a large delta.
5. [`evolution-steps-map.md`](evolution-steps-map.md) — planning map for **when/in what dependency/order** selected Scenario-owned Application Evolution Steps are intended to happen. The map references steps; it does not redefine their behavior.
6. [`slices.md`](slices.md) — Slice Implementation Strategy/current implementation map; as the model is integrated, Slices reference BI they realize, Domain they use, optional durable `SI-*`, and `Changes by Application Evolution Step` describing **how the Slice must change** to realize Scenario-owned application evolution. Feature Interaction is behavioral decomposition and Slice is implementation decomposition; no 1:1 mapping is required.
7. [`domain-evolution.md`](domain-evolution.md) — optional cross-owner view of Domain changes caused by one Scenario-owned Application Evolution Step when several Domain/Slice owners need one coherent semantic transition view. It is not the Application Evolution Step owner, primary Domain model or class registry.
8. Focused contracts only where the integration is independently substantial:
   - [`PACKAGE-PROTOCOL.md`](PACKAGE-PROTOCOL.md)
   - [`REPOSITORY-SNAPSHOT.md`](REPOSITORY-SNAPSHOT.md)
   - [`CHATGPT-BRIDGE.md`](CHATGPT-BRIDGE.md)
9. [`testing-plan.md`](testing-plan.md) — compact automated-proof strategy and Slice-to-proof map.
10. [`MANUAL-ACCEPTANCE.md`](MANUAL-ACCEPTANCE.md) — practical Windows/Edge/ChatGPT evidence checklist.
11. Current source and automated tests — realized mechanics and automated proof.

Scenario owners remain the primary detailed business/application-behavior layer. **The target form as this documentation model is integrated** is:

- complete Process Specifications for selected/current behavior;
- Feature Interactions for meaningful local behavioral transformations and their contracts/outcomes;
- stable Scenario Behavior Items consumed by Domain discovery;
- intentional UI Requirements as a separate presentation/interaction requirement class;
- Scenario-owned Application Evolution Steps saying **what** behavior is expected to change/expand;
- lower implementation owners saying **how** they must change through `Changes by Application Evolution Step` rather than defining another copy of the step.

The existing Scenario owners are not claimed to have already been migrated to this target form by the documentation-model package.

Application evolution is therefore intentionally separated:

```text
Scenario Evolution Step = WHAT changes
Evolution Steps Map = WHEN / order / dependency
Domain/Slice change-by-step = HOW implementation/semantics change
```

The model also supports explicit design exploration before behavior becomes authoritative: candidate Feature Interaction and full Scenario Process variants may be compared by inputs, Results/Outputs, composition, strengths, problems, neutral complexity placement, risks and questions. A candidate/rejected alternative is not current truth or an Application Evolution Step merely because it was considered. Optional visual/interactive walkthrough may help select behavior, but no simulator is required by the documentation architecture.

Documentation entities should be understandable by name. Technical IDs remain useful stable references, but human-readable names carry semantic meaning and arbitrary numeric suffixes do not define Scenario/Slice/Evolution order. The Evolution Steps Map owns roadmap sequence.

Documentation presentation should optimize for semantic readability without semantic loss: expose multiple conditions/branches/consequences structurally when that improves comprehension, while keeping one coherent thought as prose when prose is clearer. Do not shorten away conditions or create list noise merely for formatting consistency.

Normative documentation does not manually duplicate method/service call chains, Java field inventories, code-shape traces or accidental current UI layout. Source remains implementation authority; generated implementation traces may later provide a disposable, source-revision-bound view of code mechanics. Aggregate owners are preferred when shared consistency/invariants make one Domain boundary clearer, while separate Domain Object owners remain valid when independently useful.

No durable documentation owner should exist without explicit use-case coverage that explains why the information exists and how it is maintained/consumed. Documentation-process artifacts such as templates, terminology/principles or the Evolution Steps Map require a Documentation Use Case; application semantic/contract/proof owners may instead be justified by the application Scenario, Slice, testing or acceptance process that consumes them. Small terms/principles remain inside their natural process owner instead of becoming orphan terminology/principle files.

The documentation model is integrated incrementally. Existing Scenario owners, Domain boundaries and `slices.md` are not automatically reconciled merely because these process/template owners exist.

Ordinary replacement-package production remains outside this application route:

`planning/command-routing.md` → `planning/commands/build-replacement-archive.command.md` → `planning/documentation/build-replacement-archive-workflow.md`.

## Current Scenario set

- [`SCN-RPKG-COMPLETE-REPOSITORY-WORK`](scenarios/SCN-RPKG-COMPLETE-REPOSITORY-WORK.md)
- [`SCN-RPKG-PROVIDE-REPOSITORY-CONTEXT`](scenarios/SCN-RPKG-PROVIDE-REPOSITORY-CONTEXT.md)
- [`SCN-RPKG-PROVIDE-CURRENT-CHANGE`](scenarios/SCN-RPKG-PROVIDE-CURRENT-CHANGE.md)

`Run OBS Action` is the external automation entry. Its current `action:` surface is intentionally only `create-work-intent` and `apply-package`; `Apply Package` is the ordinary package-operation composition; `Start workspace`, manual Apply/Commit/Publish, Current Change refresh/copy/open, Finalize, Retry Push, Reopen, repository selection/location change, Snapshot export, binding, Attach/Send, External Interaction management and notifications are actions/branches/Slices. They are not separate Scenarios merely because they have separate controls.

## Current implementation boundary

Current source/tests realize legacy `SL-RPKG-01..09`, Git-backed `SL-RPKG-10 Manage Repository Work Intent`, `SL-RPKG-11 Start ChangeSet Workspace`, and the modular Git-backed **Apply / Commit / Publish** actions inside expanded `SL-RPKG-01`, and the ordinary top-level **Apply Package** composition that drives those actions automatically. An `OBS-ACTION/1` carrying explicit `targetBranch` now resolves the exact ZIP and Repository Target, requires `PACKAGE.json.workIntent`, ensures/reconciles the exact GitHub Issue by `ChangeSet-Id`, automatically ensures the missing Git-backed workspace from package `changeSetId` / `changeSetLabel`, then dispatches by persisted execution state through `Ready(C0) → AppliedUncommitted(P1) → CommittedUnpublished(P1,C1) → Ready(C1)`. Repeating the same command resumes/proves the same work, including `PublicationUncertain` reconciliation, rather than requiring manual Start workspace / Commit / Publish. Actions without `targetBranch` retain legacy/manual compatibility so already-open legacy ChangeSets are not silently reinterpreted. Git-derived Current Change, PR/ReviewDecision and integration Finalize are not migrated yet, so Git-backed ChangeSets remain intentionally fenced from legacy Review/Finalize.

`OBS-ACTION/1` is not the serialization format for every internal action. Current external routes are exactly `create-work-intent` (Issue only) and `apply-package` (Work Intent → workspace → Apply → Commit → Publish). Start workspace / Commit applied / Publish / Review / Finalize / recovery remain direct UI/Core actions.

Implementation existence is not live acceptance. Real Windows/Swing/Edge/ChatGPT behavior is established only by current practical evidence.

## Build / run

Windows requirements:

- JDK 21 (`java`, `javac`, `jar`, `jpackage`);
- authenticated GitHub CLI (`gh`) for Git-backed Work Intent / later GitHub operations;
- Git on PATH;
- Node.js on PATH for the extension DOM regression in `run-tests.cmd`;
- Microsoft Edge only for optional live bridge use/acceptance.

```cmd
run-tests.cmd
run-app.cmd
```

`build.cmd` produces `build\\replacement-package-app.jar`.

The Swing app also exposes **Windows launcher → Install / update** for the stable pinnable launcher under `%LOCALAPPDATA%\\OBS\\ReplacementPackageApp\\launcher\\...`.

## Authority boundary

Scenario documentation defines current user-visible behavior. Focused contracts define exact package/snapshot/browser boundaries. `testing-plan.md` maps automated proof responsibility without redefining behavior. Source defines current implementation mechanics. Automated tests prove only executed cases. Manual acceptance records operated environment evidence.
