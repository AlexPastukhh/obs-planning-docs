# OBS Command Routing

Status: active project-specific root command-system router
Scope: mandatory executable-command entry and shared command routing/global policy. Semantic repository meaning is discovered through README/navigation and the applicable primary semantic registry: Workspace/methodology Use-Case Registries, Application Scenario Catalogs or specialized semantic owners.

## Authority

```text
planning/command-routing.md
  = shared command-system entry/global policy;

planning/commands/*.command.md
  = one concrete command route each;

planning/use-case-registry.md + local Use-Case Registries
  = semantic independently useful Workspace/methodology capabilities; registry groups are navigation only;

Application Scenario Catalogs + Scenario owners
  = independently meaningful Application behavior;

workflow/template/project owners
  = complete repeated process or current meaning;

Planning Helper
  = projection only.
```

A command may link to the applicable semantic entry (Workspace/methodology Use Case or Application Scenario), but never owns or replaces that semantic entry.

## Command Resolution

```text
1. Start here for an explicit command.
2. Resolve the direct planning/commands/*.command.md whose commandFamily contains the trigger.
3. Read that complete command definition.
4. Follow its ownerFiles/read-mode requirements.
5. Preserve its permission boundary.
6. Use the related semantic entry (Workspace/methodology Use Case or Application Scenario) only for purpose/context/owner navigation; semantic-entry activation does not grant command permission.
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

The current material-planning command surface is defined by [`planning/documentation/idtspe-methodology/active/profiles/sds/shared/idtspe-command-surface-contract.md`](documentation/idtspe-methodology/active/profiles/sds/shared/idtspe-command-surface-contract.md).

```text
IDTSPE Core surfaces
+ SDS Target Module/focused surfaces
+ explicit Lens surfaces
+ orchestration/validator surfaces
= invocation projection only
```

Generic Core command semantics/host-target policies are owned by the Core command-surface contract; profile contracts extend rather than redefine them. The canonical direct user entry is `idtspe`: bare invocation enters ordinary work, while `idtspe <TM-ID|LENS-ID|registry alias> <context>` dispatches through current registries. Repository command IDs/legacy tmcmd keys remain implementation/compatibility details. SDS commands still run the IDTSPE Shell. `idtspe.lenses.select` resolves the contextual `TF-06A LENS_SET`; `idtspe.lens.apply` dispatches to one selected registered Lens without becoming that Lens authority. Fixed Lens shortcuts still resolve/reuse a host Target and never create a Lens-owned Target. A Local Target Contract may use the same Lens registry when no reusable Target Module fits. The Planning Helper methodology views are navigation projections only.

## Explicit-Meaning Rule

For planning commands:

```text
explicit user statement / checked source fact
  → may be treated as confirmed;

unresolved material choice
  → keep explicit as question / alternative / Idea Variant;

Current Selected Variant
  → use when one current meaning is selected;

fallback
  → use only when genuinely a fallback,
    never merely because a question is unanswered.
```

No unresolved choice or fallback authorizes destructive actions, unrelated scope expansion, commit or push.

## Command Registry Rules

- one direct `*.command.md` file = one concrete command;
- canonical command, English name and aliases are unique;
- `commandFamily` includes the canonical trigger exactly;
- command files own output, active-context behavior, reads and permissions;
- reusable workflows own algorithms instead of being copied into command bodies;
- commands are optional shortcuts: repository semantic discovery must remain possible through README/navigation and the applicable current Use-Case Registry, Scenario Catalog or specialized semantic owner;
- a retired/legacy compatibility command may preserve an old ID/alias for callers, but its `meaning`, `ownerFiles`, active-context behavior and expected output must route to current semantic/methodology authority. `palette:false` alone is not semantic retirement and must never keep an obsolete runtime alive.

## Permission Boundary

Command permission is explicit and local to the selected command. Semantic-entry activation never expands it. No command implies Git commit/push unless its direct definition explicitly owns that behavior.

## Planning Helper Boundary

The helper projects commands from direct definitions. Orientation/Use Cases project semantic navigation from current README/registry owners. Generated helper artifacts never become command or semantic authority.
