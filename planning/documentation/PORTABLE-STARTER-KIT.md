# Portable Planning Starter Kit

Status: active reusable bootstrap guidance
Scope: establish the minimum natural-navigation + semantic-owner architecture in another repository.

## Create First

```text
README.md
planning/README.md
planning/AI-WORKING-CONTRACT.md          # when AI/chat work is used
planning/direction-registry.md
planning/use-case-registry.md             # optional root cross-family UCs
planning/command-routing.md                # only when executable commands exist
planning/commands/                         # only when commands exist
```

For each substantial family/application:

```text
direction-registry.md
use-case-registry.md
scenarios/                                 # when detailed application behavior exists
actual principles/workflow/current owners
```

## Invariants

- every independently useful supported capability is discoverable as a current Use Case;
- every active canonical owner is reachable from a current Use Case or supporting-owner route;
- Use-Case Registry is the semantic authority;
- Scenario owns detailed application behavior;
- commands are optional shortcuts;
- README/index routes rather than duplicating owner bodies;
- examples/projections are never authority;
- bootstrap field kits stop routing once runtime owners exist.

Use `field-kits/root-command-routing-field-kit.md` only when setting up command routing before runtime files exist.

## External Reusable-Methodology Declaration

When another repository uses reusable methodology maintained elsewhere, put a short declaration near that repository's mandatory natural entry (normally root README / planning entry). The declaration should identify the external repository and its reusable documentation entry without copying the methodology locally.

For this methodology:

```text
Reusable methodology repository:
  https://github.com/AlexPastukhh/obs-planning-docs

Reusable documentation entry:
  planning/documentation/README.md
```

The local repository owns its project/current meaning. The linked repository owns reusable methodology.

## Fixed Parallel-Work Scopes

When parallel work is supported, create a mandatory root `parallel-work-scope-registry.md` (or equivalent root registry) and one `action-log.md` at every registered scope root. Establish the initial boundaries explicitly once; normal chats read them rather than repartitioning the repository ad hoc. Use `parallel-work-scope-and-action-log-workflow.md` for reusable semantics.
