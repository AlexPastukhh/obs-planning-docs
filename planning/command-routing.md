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
1. Start here for an explicit command. For substantive work, bootstrap/reuse the ambient Session State and S0 kernel before semantic command execution; recognize current input/command roots after S0 and record these observations under WR-1.
2. Resolve the direct planning/commands/*.command.md definition whose commandFamily contains the trigger.
3. Fully expand all selected roots and transitive includes; discover reachable processCalls as deferred point calls. Validate paths and mixed cycles, merge/deduplicate the include DAG and collect pre-execution contributions before any command action.
4. Establish dependencies-first order. Execute the deepest methodology Use-Case recheck, then early session.work.maintain activation, WR-1 confirmation, automatic WR-2 triage, WR-3 subject and WR-4 execution route before the ordinary selected leaf.
5. At WR-5, before affected execution of a tentative current Manifest task, perform/reuse the contextual session-task Question sweep and repeat after material candidate/route change until readiness or a real gate. This is semantic current-work behavior, not a universal early command include or a second WR-2. If WR-4=SHELL, reaffirm the subject-specific Use Cases and Port Requirement Set, then execute idtspe.work and admitted capabilities; DIRECT follows its selected direct owner and escalates to SHELL if the sweep reveals material ambiguity. NO_EXECUTION preserves the actual gate. A selected SDS Evolution Step has an additional Step-owned readiness sweep at its realization handoff.
6. At each reached processCalls owner point evaluate the gate, bind the current basis and execute/reuse the complete child composition before resuming. Keep one Work Context and root permission boundary.
7. After the selected root's WR-5 work, follow the fundamental current-work Use Case through WR-6 synchronization and WR-7 Work Record/archive closure. WR-6/WR-7 are not prerequisite includes of the leaf action.
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
- every ordinary substantive command composes the early current-work chain `WR-4 → WR-3 → WR-1 → session.work.maintain → methodology.use_cases.recheck` directly or transitively; fundamental commands in that same chain are valid partial roots; the recheck remains deepest;
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
## Work Runtime command order

```text
raw USER input
→ bootstrap/reuse Session State and its archive identity
→ create Turn Work Record S0 with WR-1…WR-7 kernel and authority/methodology refs
→ WR-1 classify input + recognize command roots/aliases
→ expand/merge include DAG + collect declarative contributions; record graph under WR-1
→ Use-Case applicability
→ WR-2 automatic Manifest/PRS/context triage (no direct command)
→ WR-3 primary subject
→ WR-4 DIRECT | SHELL | NO_EXECUTION
→ WR-5 contextual session-task Question sweep before affected Manifest execution; repeat after material change
→ if SHELL: reaffirm task-specific Use Cases + Port Requirement Set
→ execute dependency/semantic actions beneath WR-5
→ WR-6 / WR-7 through the current-work Use Case after the selected root action
```

P-02 is not a command-global bootstrap dependency. Command graph discovery is observable WR-1 work and does not itself require Shell.
