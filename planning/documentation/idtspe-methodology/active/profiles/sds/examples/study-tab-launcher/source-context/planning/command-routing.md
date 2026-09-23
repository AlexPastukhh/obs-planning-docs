# OBS Command Routing

Status: active project-specific root command-system router
Scope: mandatory executable-command entry and shared command routing/global policy. Semantic repository meaning is discovered through README/navigation and the selected area's own current semantic route.

<a id="planning-command-routing"></a>
## Authority

Responsibility ID: `COMMAND.ROOT-ROUTING`

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [`Planning Command Definition Contract`](commands/README.md#planning-command-definition-contract) — `COMMAND.DEFINITION-CONTRACT`
> - `CONTEXTUALIZES` [`IDTSPE Command Surface`](../../project/planning/documentation/idtspe-methodology/active/idtspe-core/commands/IDTSPE-COMMAND-SURFACE-CONTRACT.md#idtspe-command-surface) — `IDTSPE.COMMAND-SURFACE`
> - `CONTEXTUALIZES` [`Planning Helper Semantic Projection`](documentation/tools/tampermonkey/chat-command-palette/README.md#planning-helper-semantic-projection) — `HELPER.SEMANTIC-PROJECTION`

Cross-system responsibility routing: [`commands/RESPONSIBILITY-MAP.md`](commands/RESPONSIBILITY-MAP.md).

```text
planning/command-routing.md
  = shared command-system entry/global policy;

planning/commands/*.command.md
  = one concrete command route each;

planning/documentation/use-case-registry-map.md + mapped methodology Use-Case Registries
  = functional methodology-use entry/navigation for repository methodology work; the map selects current scoped registries and registry groups remain navigation only;

other project/area Use-Case registries
  = independently useful project-specific capabilities within their declared scope when explicitly reached from that area's current navigation; they are not automatically projected as methodology Use Cases;

selected area/methodology semantic owners
  = current meaning outside those Use-Case scopes according to that area's own navigation;

workflow/template/project owners
  = complete repeated process or current meaning when routed by the applicable owner;

Planning Helper
  = projection only.
```

A command may link to the applicable semantic entry/current owner defined by the selected area, but never owns or replaces that meaning.

Planning Commands are a USER↔AI invocation surface. The AI follows methodology owners/references/handoffs directly during methodology work and does not invoke Planning Commands as an internal execution mechanism. Command composition exists to make a USER-requested traversal reproducible/mandatory, not to create methodology meaning.

## Command Resolution

```text
1. Start here for an explicit command.
2. Resolve the direct `planning/commands/*.command.md` whose `commandFamily` contains the trigger.
3. Read that complete command definition and **fully expand all selected command/component roots and every registered transitive `includes` command-file path edge before semantic execution begins**.
4. Merge one dependency DAG, reject unresolved command paths/cycles, deduplicate shared nodes, and collect declarative contributions (explicit capability requirements, selected semantic components, trace configuration, target/context selectors, permission constraints) from every node.
5. Establish the dependencies-first execution plan. Included command actions are dependencies, not recursive independent passes; each selected root action executes only after its dependencies completed or were validly `REUSED`.
6. For normal IDTSPE work, establish/reuse the one P-02 working trace early enough to record the following composition events incrementally.
7. Run/reaffirm the command at `planning/commands/recheck-methodology-use-cases.command.md`, which applies `UC-DOC-RESOLVE-CURRENT-USE-CASES` plus its mandatory `UC-IDTSPE-AI-WORKING-BOUNDARY` companion, for **every Planning Command invocation**. This is a compact fundamental authority/applicability pass, not execution of every Use Case.
8. For normal IDTSPE Shell work, refresh/reaffirm the Port Requirement Set before P-01 through `IDTSPE.PORT-COMPOSITION-REFRESH`, using the already-collected explicit leaf requirements.
9. Execute the resulting DAG dependencies before dependents while following each node's own `ownerRefs` / `ownerFiles` and current selected Use-Case owners. References inherited through included commands need not be repeated on the dependent command.
10. Preserve the selected root command permission boundary. Semantic-entry activation or included command traversal never expands mutation/commit/push permission.
```

Do not reconstruct commands from memory, helper output, examples or historical files when the command definition is readable.

## Governance Preflight / Read-Reuse Rule

A result-producing command may assume reusable governance that is owned outside its compact command definition. Before executing such a command, preserve the requested result while refreshing only as much governance as correctness requires.

```text
relevant governance current + confidently remembered
  → reuse it; do not reread the complete bootstrap route;

relevant owner/route/rule may be stale or a newly relevant zone was not read deeply
  → targeted refresh of the affected governance owners;

no reliable prior governance pass / ownership cannot be reconstructed confidently / governance architecture materially changed
  → perform the required full bootstrap/preflight internally, then continue the requested command.
```

A new snapshot, commit, branch or repository identity **does not by itself** invalidate remembered governance. Refresh only when the changed or uncertain source can materially affect the selected command route, semantic ownership, reusable rules or permission boundary. Elapsed chat time/message count alone is also not a freshness rule.

When bootstrap/preflight is internal to another command, do not require the user to invoke a bootstrap command separately and do not return the bootstrap assimilation instead of the requested command result. Explicit bootstrap commands still return their own bootstrap result.

Canonical reusable algorithm: `planning/documentation/command-routing-workflow.md`; family-specific bootstrap owners may refine the read set without weakening this rule.


## Current IDTSPE Command Family

Current command/Helper responsibility routing starts at [`planning/commands/RESPONSIBILITY-MAP.md`](commands/RESPONSIBILITY-MAP.md). Generic IDTSPE invocation semantics are owned by [`IDTSPE.COMMAND-SURFACE`](../../project/planning/documentation/idtspe-methodology/active/idtspe-core/commands/IDTSPE-COMMAND-SURFACE-CONTRACT.md#idtspe-command-surface); the installed SDS profile extends that surface through [`SDS.COMMAND-SURFACE`](../../project/planning/documentation/idtspe-methodology/active/profiles/sds/commands/SDS-COMMAND-SURFACE-EXTENSION.md#sds-command-surface).

```text
current methodology Use Cases
+ current Target Modules
+ current Lenses
+ General / Tool direct commands
= semantic Command projection only
```

Generic Core command semantics/host-target policies are owned by the Core command-surface contract; profile contracts extend rather than redefine them. IDTSPE is already active. The canonical direct `idtspe` trigger is therefore a convenience request to refresh/reaffirm current Use-Case-driven composition, while `idtspe <TM-ID|LENS-ID|registry alias> <context>` supplies explicit selection context and still passes current Use-Case/context plus component-local applicability/materiality. Repository command IDs/legacy tmcmd keys remain implementation/compatibility details. SDS commands stay inside the same IDTSPE Work Context. `idtspe.lenses.select` resolves current Lens applicability/selection for a bounded Analysis Surface through the Lens capability and Lens Meta-Model; there is no fixed Target Lens Set field. `idtspe.lens.apply` dispatches one selected registered Lens over that bounded Analysis Surface without becoming Lens authority. Generic Lens operations are not Target-bound and must not create a Target merely to host analysis; Target context is resolved/reused only when the natural Analysis Surface belongs to Target work. Fixed Lens shortcuts may retain Target host policy when their own semantic surface naturally requires it. A Local Target Contract may use the same Lens registry when no reusable Target Module fits. The Planning Helper command classifications are navigation projections only. One current UC/TM/Lens capability projects to one primary semantic Command card; direct/focused aliases do not create peer semantic owners.

## Explicit-Meaning Rule

For planning commands:

```text
explicit user statement / checked source fact
  → may be treated as confirmed;

unresolved material choice
  → keep explicit as Question / alternative Proposal;

selected Proposal / Decision
  → use when one current meaning is actually selected;

fallback
  → use only when genuinely a fallback,
    never merely because a question is unanswered.
```

No unresolved choice or fallback authorizes destructive actions, unrelated scope expansion, commit or push.

## Command Registry Rules

- one direct `*.command.md` file = one concrete command;
- every concrete command composes the methodology Use-Case registry applicability recheck, directly or transitively;
- canonical command, English name and aliases are unique;
- `commandFamily` includes the canonical trigger exactly;
- command files own output, active-context behavior, reads and permissions;
- reusable workflows own algorithms instead of being copied into command bodies;
- `includes` may guarantee traversal through canonical repository paths to registered command definitions, but must not copy algorithms, point directly to methodology files, or persist a parallel numeric Shell-port topology;
- commands are optional shortcuts: repository semantic discovery must remain possible through README/navigation and the selected area's own current semantic route;
- a retired/legacy compatibility command may preserve an old ID/alias for callers, but its `meaning`, `ownerFiles`, active-context behavior and expected output must route to current semantic/methodology authority. `palette:false` alone is not semantic retirement and must never keep an obsolete runtime alive.

## Permission Boundary

Command permission is explicit and local to the selected command. Semantic-entry activation never expands it. No command implies Git commit/push unless its direct definition explicitly owns that behavior.

## Archive Read-Source Boundary

An explicitly selected archive may be used as a **read-source snapshot** for the current invocation. This source-selection boundary is distinct from replacement-package production and application.

```text
USER explicitly selects archive as source
  → verify/select that archive for current read context
  → state identity/freshness limits when material
  → answer/review/plan from that source
  → do not infer package production or application
```

An archive from an earlier message is not automatically current. `archive read-source` does not imply `build replacement package`, and a produced replacement package does not automatically become the next read source.

## Planning Helper Boundary

The Helper is a **semantic command projection**, not a semantic owner. Its primary command catalog combines current methodology Use Cases, Target Modules and Lenses with General/Tool direct commands plus the generic `IDTSPE Pass` command-composition surface. Methodology Use Cases start from `planning/documentation/use-case-registry-map.md` and only the current scoped registries mapped there; Target Modules/Lenses come from their current registries/owners. Project/area Use Cases remain reachable through their own declared routes unless explicitly projected.

Canonical working Scenarios are presentation/integration examples owned outside the Helper. They contain semantic owner references, not command IDs/triggers. Helper derives command equivalents and the reverse `Scenarios N` index from those semantic references; Helper must not maintain separate `When To Use` / `What You Get` semantic prose.

Projection freshness is a downstream maintenance consequence: when a current UC/TM/Lens owner, direct invocation route, canonical Scenario semantic reference, alias/provenance or projected source changes materially, regenerate/revalidate the affected Helper projection. This does **not** create a separate methodology Use Case for Helper maintenance.

Generated Helper artifacts, semantic card labels, scenario-command mappings and UI groupings never become command or methodology authority.
