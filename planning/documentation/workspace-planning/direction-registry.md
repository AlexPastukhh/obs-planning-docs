# Workspace Planning Direction Registry

Status: active reusable-family semantic Direction Registry
Scope: establish, review and plan realization of useful capabilities in evolving Workspaces.

Parent: [`../../direction-registry.md`](../../direction-registry.md)
Child Use-Case Registry: [`use-case-registry.md`](use-case-registry.md)

## `DIR-PLAN-WORKSPACE` — Plan / Review Workspace Capabilities

**Purpose:** establish and review useful Workspace capabilities, then plan each selected capability change from target Use-Case meaning through rules/models/representations to a low-coupled vertical realization.

**Workspace scope:** codebases, documentation/planning repositories, automation projects, data pipelines, knowledge/workspace systems and other evolving engineered artifacts.

**Topology:** the family exposes independently useful Use Cases for establishing one Workspace Use Case, reviewing/changing one existing Workspace Use Case and reviewing several Workspace Use Cases/topology together when that multi-UC result is itself useful. Inside one selected UC plan, Step 1 (UC meaning), Step 2 (Domain/rules/models/representations) and Step 3 (vertical realization/files/verification) are planning depths of that same UC, not peer Use Cases merely because they are separate reasoning responsibilities.

**Boundaries:** Application actor-visible behavior remains owned by Application Scenarios. Generic Architecture Lens/Path semantics remain owned by sibling [`../architecture-planning/`](../architecture-planning/). This Direction does not mutate repository files, grant command permissions or create a separate Use-Case model authority beside the reusable Direction/Use-Case registry methodology.
