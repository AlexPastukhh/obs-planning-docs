# OBS Replacement Package App

Status: active current documentation
Runtime: Java 21 / Swing with optional Microsoft Edge ChatGPT bridge
Scope: local consumer for replacement packages, repository-work review/finalization/publication, Repository Snapshot export and optional ChatGPT handoff.

## Documentation model

This application uses a small asymmetric documentation set whose durable owners require explicit **use-case/process coverage**. The target model is integrated incrementally; this methodology package does not claim that current Scenario/Slice/testing owners already use every target form.

1. [`direction-registry.md`](direction-registry.md) — application route.
2. [`documentation-use-cases.md`](documentation-use-cases.md) — documentation-process authority for Scenario+Screen design, Domain/Slice/shared implementation ownership, evolution-aware architecture, proof/TDD, readability and owner coverage.
3. [`documentation-templates.md`](documentation-templates.md) — recommended forms, not schemas.
4. Scenario owners — selected Feature Interaction compositions that realize application Benefits / desired results in an application interaction context. Target form: complete Process Specifications with Scenario Process maps, FI Interaction Processes, BI, FI/component-local UI Requirements and Scenario-owned **Evolution Steps** describing WHAT behavior changes.
5. Selected Screen model — target owner is normally one `screens.md` when real Screen planning exists; it owns Screen Map, Scenario×Screen/FI×Screen, routes and Screen Behavior Items for durable spatial/window/UI meaning. This methodology update does not create an empty Screen owner.
6. [`evolution-steps-map.md`](evolution-steps-map.md) — WHEN / rough horizon / likelihood / dependency / order / readiness for selected Evolution Steps and materially independent local impacts. It does not redefine their delta.
7. Domain owners — BI-first Aggregate/Object semantics, optional `DI-*`, local Tests/Test Items and `Evolution Impact` as integration proceeds.
8. [`slices.md`](slices.md) — current Slice Implementation Strategy/portfolio map. Target focused Slice owners reference BI/Domain, optional `SI-*`, local Tests/Test Items and `Evolution Impact`. Feature Interaction and Slice decompositions are not 1:1.
9. Optional **Shared Implementation Capability** owners — one real reusable implementation responsibility consumed by several Slices; `cross-cutting` is a characteristic, not a separate owner type.
10. [`domain-evolution.md`](domain-evolution.md) — optional cross-owner Domain Evolution Impact view only for materially shared semantic transitions.
11. Focused contracts only where integration is independently substantial: [`PACKAGE-PROTOCOL.md`](PACKAGE-PROTOCOL.md), [`REPOSITORY-SNAPSHOT.md`](REPOSITORY-SNAPSHOT.md), [`CHATGPT-BRIDGE.md`](CHATGPT-BRIDGE.md).
12. [`testing-plan.md`](testing-plan.md) — current automated-proof strategy and Slice→proof map; target role after local owner migration is shared **Test Strategy** (proof-layer allocation/non-duplication/shared environment/critical E2E/Practical boundaries).
13. Optional **Shared Test Capability** owners — reusable test machinery/behavior only when several suites genuinely share one responsibility.
14. [`MANUAL-ACCEPTANCE.md`](MANUAL-ACCEPTANCE.md) — current practical checklist/evidence owner; target semantics explicitly separate Acceptance Plan from executed Evidence Campaigns.
15. Current production/test source — exact realized mechanics and executable proof realization.

The target semantic flow is:

```text
Application Benefit / Desired Result
→ Scenario = selected FI composition in an application interaction context
   ├─ Scenario Process = FI ordering / transitions / cross-FI branches
   └─ Feature Interactions
      ├─ Interaction Process
      ├─ BI
      └─ FI/component UI requirements
↔ selected Screen model
→ Domain / Slice / Shared Implementation Capability
   ├─ Implementation Items → production source
   └─ local Tests / Test Items → test source
→ executed Evidence
```

This is an authority/realization map, not chronological TDD order: failing proof may be written before production code while tests remain verification rather than behavioral authority.

Evolution responsibilities are deliberately separate:

```text
Scenario Evolution Step
→ WHAT application behavior changes

Evolution Steps Map
→ WHEN / likelihood / dependency / readiness

Lower-owner Evolution Impact
→ WHAT changes in that owner
   Expansion | Refactoring | Forced Migration

DI / SI / Shared Implementation Items
→ HOW current implementation must be shaped for current correctness/quality
  and materially known future evolution
```

Known evolution should influence current boundaries when that makes later changes additive/compositional: stable ports, composition seams, identities/ownership rules or shared capabilities may be justified now. Future behavior itself must not be implemented prematurely merely because it is known. `Forced Migration` is the exceptional signal that current structure forces movement/rewrite of existing logic/authority rather than reasonable expansion/composition.

Local Tests normally live with Aggregate/Slice/shared implementation owners. A **Test Item** is only a durable additional requirement on proof quality (for example no-mutation, public-boundary, persisted-state, isolation, false-positive or refactor/evolution resilience); it is not a second product/architecture requirement. When selected meaning and a credible executable proof boundary are known, target development flow is test-first. Experiments/prototypes are for genuinely unresolved feasibility/design/proof questions, after which production realization returns to test-first. Real-environment properties may require planned Practical Acceptance followed by executed Evidence.

Design exploration starts from the application Benefit / desired result and iterates `candidate FI composition ↔ FI Interaction Process ↔ candidate BI`, together with Screen Set/Screen variants. FI boundaries should not be finalized before enough internal process is understood to judge them, but candidate FIs should not be fully specified before the high-level composition is stable enough to justify that detail. Candidate/rejected alternatives remain design material, not current truth or Evolution Steps by default. Optional visual/interactive walkthrough can help design but no simulator is required by the documentation architecture.

Documentation entities should carry readable semantic names; technical IDs are navigation, not meaning or roadmap order. Documentation optimizes for semantic readability without semantic loss. Source/test mechanics remain source authority; generated traces are derived/disposable.

No durable owner exists merely because information seems useful. Documentation-process artifacts require explicit DOC-UC coverage; application semantic/contract/proof owners may instead be justified by the Scenario/Slice/testing/acceptance process that needs them. Existing Scenario/Domain/Slice/testing/acceptance owners remain current until separately reconciled to this target model.

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

Scenario documentation defines the application Benefit / desired result plus the selected FI composition and current user-visible behavior that realizes it. Focused contracts define exact package/snapshot/browser boundaries. `testing-plan.md` maps automated proof responsibility without redefining behavior. Source defines current implementation mechanics. Automated tests prove only executed cases. `MANUAL-ACCEPTANCE.md` is the current practical-verification owner; the target model distinguishes planned acceptance from executed Evidence.
