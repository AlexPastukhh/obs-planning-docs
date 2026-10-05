# OBS Command Routing

Status: active project-specific root command-system router
Scope: mandatory executable-command entry and shared command routing/global policy. Semantic repository meaning is discovered through README/navigation and the selected area's own current semantic route.

<a id="planning-command-routing"></a>
## Authority

Responsibility ID: `COMMAND.ROOT-ROUTING`

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [`Planning Command Definition Contract`](commands/README.md#planning-command-definition-contract) — `COMMAND.DEFINITION-CONTRACT`
> - `CONTEXTUALIZES` [`IDTSPE Command Surface`](documentation/idtspe-methodology/active/idtspe-core/commands/IDTSPE-COMMAND-SURFACE-CONTRACT.md#idtspe-command-surface) — `IDTSPE.COMMAND-SURFACE`
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

Planning Commands are a USER↔AI invocation surface. The AI follows methodology owners/references/handoffs directly during methodology work. Within a USER-selected command invocation, declared `processCalls` guarantee traversal at the referenced owner points under [the Process Call contract](commands/README.md#planning-command-process-calls); the AI does not invent command calls as an alternative methodology runtime. Command composition exists to make a USER-requested traversal reproducible/mandatory, not to create methodology meaning.

## Command Resolution

```text
1. Start here for an explicit command and resolve the direct `planning/commands/*.command.md` definition whose `commandFamily` contains the trigger. Command recognition does not require Session State, a Turn Work Record or a DIRECT/SHELL route selector.
2. Fully expand all selected roots and transitive `includes`; discover reachable `processCalls` as deferred owner-point calls. Validate paths and mixed cycles, merge/deduplicate the include DAG and collect pre-execution contributions before any command semantic action.
3. Establish dependencies-first order. Execute only the prerequisites actually declared by the selected command composition. Ordinary commands do not inherit a mandatory Session/Work-Record prefix.
4. Follow the selected command's current canonical owner/read route proportionally. Refresh reusable governance only as required by the existing Governance Preflight rule.
5. When an explicit IDTSPE/Shell surface is selected, compose current methodology work and refresh/reaffirm the Port Requirement Set through the canonical IDTSPE owners before admitted Shell capabilities execute. This Shell entry is independent from Session State/Work Record tooling.
6. Execute dependencies before dependents. At each reached `processCalls` owner point evaluate its gate, bind current subject/scope/operation/basis, execute/reuse the complete child composition, then resume the caller.
7. Respect real USER/permission/Proposal/Decision gates from their natural owners. There is no generic preparation archive pause or automatic global Question sweep before command execution.
8. If the USER separately activated Session State, Work Record, Manifest, Question-sweep or archive prompts, synchronize only those explicitly active facilities according to their optional contracts; they are not command prerequisites.
```

Do not reconstruct commands from memory, Helper output, examples or historical files when the command definition is readable.

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

Current command/Helper responsibility routing starts at [`planning/commands/RESPONSIBILITY-MAP.md`](commands/RESPONSIBILITY-MAP.md). Generic IDTSPE invocation semantics are owned by [`IDTSPE.COMMAND-SURFACE`](documentation/idtspe-methodology/active/idtspe-core/commands/IDTSPE-COMMAND-SURFACE-CONTRACT.md#idtspe-command-surface); the installed SDS profile extends that surface through [`SDS.COMMAND-SURFACE`](documentation/idtspe-methodology/active/profiles/sds/commands/SDS-COMMAND-SURFACE-EXTENSION.md#sds-command-surface).

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
- commands include only prerequisites material to their own invocation route; there is no mandatory Session State / Work Record / DIRECT-vs-SHELL prefix. Methodology-use recheck may remain a shared prerequisite where the command actually needs methodology orientation;
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

## Example reading on the selected owner route

For methodology work, apply [DOC.EXAMPLE-READING](documentation/principles-and-terminology.md#doc-example-reading) to relevant inline/linked examples before producing the selected owner's result. The explicit [read-methodology-examples command](commands/read-methodology-examples.command.md) offers the same bounded read operation without Target formation. Reading guidance does not add a hidden includes edge or expand the selected root's permission.

<a id="work-runtime-command-order"></a>
## Command execution order

```text
raw USER input / explicit command
→ resolve direct command root(s)
→ fully expand/validate transitive includes + inventory deferred processCalls
→ collect effective composition contributions
→ execute declared dependencies first
→ follow current semantic owners
→ if explicit/current operation enters IDTSPE Shell:
     compose current work
     → refresh Port Requirement Set
     → execute admitted capabilities
→ execute selected root action
→ synchronize optional Session/Work-Record tooling only when separately activated
```

Session State, Work Records, Current Work Manifest, the global session Question sweep and any portable Session archive are optional explicit facilities. They are not prerequisites for ordinary commands or for Shell composition. Component-local readiness/question checks remain owned by their components.
