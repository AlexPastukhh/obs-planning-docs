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
use-case-registry.md                       # Workspace/methodology family
scenarios/README.md                        # Application behavioral catalog
actual principles/workflow/current owners
```

Use the registry shape that matches the Direction: Workspace/methodology capabilities use Use Cases; Application behavior uses Scenarios. Do not add an Application Use-Case alias merely for file-type symmetry.

## Invariants

- every independently useful supported Workspace/methodology capability is discoverable as a current Use Case;
- Application behavioral identity is discoverable through its Scenario Catalog and Scenario owners;
- every active canonical owner is reachable from its current semantic registry/owner route;
- Use-Case Registry owns Workspace/methodology Use-Case identity; Scenario Catalog/Scenario owners own Application behavior;
- commands are optional shortcuts;
- README/index routes rather than duplicating owner bodies;
- examples/projections are never authority;
- bootstrap/setup guidance hands off to the current runtime owners once those owners exist.


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
