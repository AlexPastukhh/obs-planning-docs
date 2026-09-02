# OBS Replacement Package App

Status: active current documentation
Runtime: Java 21 / Swing with optional Microsoft Edge ChatGPT bridge
Scope: local consumer for replacement packages, repository-work review/finalization/publication, Repository Snapshot export and optional ChatGPT handoff.

## Documentation model

This application intentionally uses a small asymmetric documentation set.

1. [`direction-registry.md`](direction-registry.md) — application route.
2. [`documentation-use-cases.md`](documentation-use-cases.md) — maintenance workflow for Scenario Process design/specification, Feature Interactions, Behavior Items, intentional UI Requirements, Domain discovery, Domain/Slice implementation requirements, evolution-aware architecture and generated implementation traces.
3. [`documentation-templates.md`](documentation-templates.md) — recommended starting forms for Scenario Process/Feature Interaction design, Evolution, Domain, Slice and cross-cutting owners. Templates are guidance, not schemas; documentation use cases link directly to the relevant form at the step where it is used.
4. [`scenarios/README.md`](scenarios/README.md) and the three Scenario owners — detailed current user/business behavior. As the model is integrated, each Scenario will carry a complete Process Specification whose Feature Interactions expose the current behavioral process, core `BI-RPKG-*` requirements and intentional UI Requirements, plus only still-unimplemented Migration Delta.
5. [`slices.md`](slices.md) — Slice Implementation Strategy and current implementation map; as the model is integrated, Slices reference the BI they realize, Domain they use, durable implementation requirements where needed, and their `Evolution Steps`. Feature Interaction is behavioral decomposition and Slice is implementation decomposition; no 1:1 mapping is required.
6. [`domain-evolution.md`](domain-evolution.md) — cross-owner evolution map only when one Evolution Step changes shared Domain semantics across several owners. It is not the primary Domain model or a class registry.
7. Focused contracts only where the integration is independently substantial:
   - [`PACKAGE-PROTOCOL.md`](PACKAGE-PROTOCOL.md)
   - [`REPOSITORY-SNAPSHOT.md`](REPOSITORY-SNAPSHOT.md)
   - [`CHATGPT-BRIDGE.md`](CHATGPT-BRIDGE.md)
8. [`testing-plan.md`](testing-plan.md) — compact automated-proof strategy and Slice-to-proof map.
9. [`MANUAL-ACCEPTANCE.md`](MANUAL-ACCEPTANCE.md) — practical Windows/Edge/ChatGPT evidence checklist.
10. Current source and automated tests — realized mechanics and automated proof.

Scenario owners remain the primary detailed business-behavior layer. Their Process Specifications describe the selected behavior completely; Feature Interactions structure meaningful local behavioral transformations and their branches/contracts. Scenario `BI-RPKG-*` Behavior Items remain the stable application/business requirements consumed by Domain discovery, while intentional UI Requirements remain a separate presentation/interaction requirement class. Domain owners reference the BI they directly implement; Slices reference the BI they realize using that Domain. Optional `DI-*` / `SI-*` items hold only durable implementation/architecture requirements that should survive ordinary refactoring.

The model also supports explicit design exploration before behavior becomes authoritative: candidate Feature Interaction and full Scenario Process variants may be compared by inputs, results/outputs, composition, strengths, problems, neutral complexity placement, risks and questions. A candidate/rejected alternative is not current truth or Migration Delta merely because it was considered. Optional visual/interactive walkthrough may help select behavior, but no simulator is required by the documentation architecture.

Normative documentation does not manually duplicate method/service call chains, Java field inventories, code-shape traces or accidental current UI layout. Source remains implementation authority; generated implementation traces may later provide a disposable, source-revision-bound view of code mechanics. Aggregate owners are preferred when shared consistency/invariants make one domain boundary clearer, while separate Domain Object owners remain valid when independently useful.

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
