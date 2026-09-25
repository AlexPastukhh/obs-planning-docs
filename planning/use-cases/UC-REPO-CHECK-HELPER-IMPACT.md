<a id="uc-repo-check-helper-impact"></a>
# UC-REPO-CHECK-HELPER-IMPACT — Check Documentation Change Impact On Planning Helper

Responsibility ID: `HELPER.CHANGE-IMPACT`
Status: active repository Use Case

## Situation

Documentation/methodology is being added, changed, moved or removed in a repository that uses Planning Helper, or the user explicitly asks to check a proposed/applied change's Helper impact. This includes ordinary direct corrections without a separate Pre-Update Target. The calling flow must assess applicability before handoff; an editorial change can close cheaply with evidence of no projection impact.

## Result

One bounded impact assessment tied to the proposed or actual change basis: affected command/component/reference/generated surfaces and necessary updates, useful command candidates, or an evidenced no-change result. Planning and applied verification remain distinguishable. Unknown basis/coverage is unresolved, not a clean result. This Use Case checks/plans; it does not grant permission to edit, publish or rebuild.

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [Planning Command Maintenance](UC-REPO-MAINTAIN-PLANNING-COMMAND.md#command-maintenance) — `COMMAND.MAINTENANCE`.
> - `CONTEXTUALIZES` [Helper Semantic Projection](../documentation/tools/tampermonkey/chat-command-palette/README.md#planning-helper-semantic-projection) — `HELPER.SEMANTIC-PROJECTION`.
> - `CONTEXTUALIZES` [Command Definition Contract](../commands/README.md#planning-command-definition-contract) — `COMMAND.DEFINITION-CONTRACT`.

## Process

1. Identify changed/proposed files, semantic identities, paths/anchors and relevant before/after basis. State whether assessing a plan or verifying an applied change. If a necessary source is absent, report the unresolved basis.
2. Compare changes to the actual Helper input routes: direct commands, mapped Use-Case registries, Core/profile TM/Lens registries, canonical scenarios and their projected owners. For a small editorial correction, establish whether projected text/paths/meaning remain unchanged; if so, finish with a concise no-impact explanation. Otherwise inspect only affected consumers.
3. Check existing `ownerRefs` (identity/path/anchor/role/readMode/why), `ownerFiles`, methodology bindings, includes, processCalls (target, point anchor, applicability/context, deferred child composition) and derived reverse/dependencies-first projections. Validate point meaning and planned/applied basis through the [Process Call contract](../commands/README.md#planning-command-process-calls). A valid path alone does not prove the referenced meaning or required-read explanation remains correct. Ordinary links remain navigation evidence, not semantic ownership.
4. Check discovery of NEW capabilities/owners as well as existing inbound links. Determine whether the existing generic dispatcher and generated component card provide sufficient reachability. Propose a new or revised direct command only when a recurring invocation has independent value; record the intended trigger, owner route and why existing commands are insufficient. Do not manufacture one command per document.
5. Assess which generated catalogs, card explanations, scenario relations, editable categories/grouping and caches are affected. Use [Helper Projection Workflow](../documentation/tampermonkey-command-projection-workflow.md) for exact synchronization mechanics; do not duplicate those mechanics here or edit generated files manually.
6. Return bounded proposed operations and checks, or no-impact evidence. Route actual command work to [Planning Command Maintenance](UC-REPO-MAINTAIN-PLANNING-COMMAND.md#command-maintenance); route semantic contradictions to their natural owners. Link rather than copy the prior assessment when a current plan already contains it.
7. After authorized realization, compare actual changes to the assessed basis. Verify affected paths/anchors, command/catalog composition and built projections. Reuse unchanged analysis; reopen only changed impact. A planned check is not executed verification. Failed or pending checks remain explicit at handoff.

## Invocation / Ordering / Reuse

Documentation change planning, repository update planning and semantic-owner revalidation call this Use Case by an explicit process link. The Helper projection workflow calls it for actual post-change verification. Ordinary natural-language documentation work reaches the same check through the repository registry/applicability routing; it does not depend on a command invocation or separate planning Target.

This is a result-dependent process step, not a prerequisite `includes` edge on documentation mutation commands. A caller may additionally bind the standalone check command with `processCalls` at the same semantic point; this reinforces traversal and preserves the evidence-based reuse boundary. The standalone check command references this owner; any normal command bootstrap includes only its existing base route. Reuse one assessment per bounded change/basis across callers. Checking this assessment or its own supporting files does not recursively spawn another assessment; include those changed surfaces in the same scope and finish when required checks close.

## Guards

- Required impact assessment does not mean required Helper change, new command, rebuild or full test run for every edit.
- No-impact must identify the changed surface and the relevant projection basis; missing data cannot count as no impact.
- Helper is a repository integration concern; Core methodology does not depend on this tool.
- Preserve semantic ownership and permission boundaries. Suggestions do not grant mutation or publication authority.
