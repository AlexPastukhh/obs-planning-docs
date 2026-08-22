# Documentation Reusable Layer Index

Status: active reusable documentation layer index
Scope: reusable documentation governance, planning methodology, command routing, templates/profiles/examples and tool projection.

## Natural Entry

```text
planning/README.md
→ planning/direction-registry.md
→ planning/documentation/direction-registry.md
→ planning/documentation/use-case-registry.md
→ selected documentation owner
```

For AI/chat work also read `planning/AI-WORKING-CONTRACT.md` and `ai-reviewability-and-directed-planning-principles.md` for material planning/development output.

## Core Owners

```text
planning-docs-architecture-principles.md
documentation-responsibility-map.md
documentation-principles-read-workflow.md
ai-reviewability-and-directed-planning-principles.md
documentation-responsibility-zone-review-workflow.md
direction-registry.md
use-case-registry.md
direction-and-use-case-registry-workflow.md
DIRECTION-REGISTRY-TEMPLATE.md
USE-CASE-REGISTRY-TEMPLATE.md
repository-navigation-and-use-case-coverage-review-workflow.md
command-routing-workflow.md
COMMAND-ROUTING-TEMPLATE.md
command-planning-workflow.md
prompt-maintenance-workflow.md
reviewable-agent-output-and-commands-workflow.md
documentation-update-plan-workflow.md
documentation-update-workflow.md
file-update-overview-workflow.md
FILE-UPDATE-OVERVIEW-TEMPLATE.md
build-replacement-archive-workflow.md
parallel-work-scope-and-action-log-workflow.md
status-reconciliation-workflow.md
example-coverage-workflow.md
review-dependency-planning-workflow.md
testing-planning/
workspace-planning/
```

Shared Idea owners remain at this reusable root. Solution/application planning lives under `application-planning/`. Reusable Workspace capability planning lives under `workspace-planning/`; Universal Workspace Architecture Planning lives under `architecture-planning/`.

ReviewDiff semantic correctness review is owned by `review-diff-review-workflow.md`; `review-diff-file-workflow.md` is only an optional legacy transfer/capture route.

## AI Reviewability / Directed Planning

`ai-reviewability-and-directed-planning-principles.md` owns Key Points, Review Priority (`Critical / High / Normal / Low`), upstream→downstream planning dependency direction, built-in recheck and evidence-driven backflow. `крит` remains optional explicit adversarial review. Former answer Levels 1/2/3 and `обс` are not current reviewability architecture.

## Workspace Planning / UCDS

Workspace/documentation planning may use Mini or Modular **UCDS** representation:

```text
Use Case
→ Domain / Rules
→ Vertical Slice / Realization
```

Mini/Modular are physical/reviewability choices around existing Workspace planning owners, not new semantic entities or weaker correctness. Execution order may be a section or separate current projection and may express parallel work/dependencies.

The generic UC identity/contract owner remains `direction-and-use-case-registry-workflow.md`; Workspace Planning does not create a second Use-Case model authority.

## Solution / Application Planning / SDS

See `application-planning/README.md`. Application change planning may use Mini/Modular/Full **SDS** representation:

```text
Scenario
→ Domain / Rules
→ Slice Strategy / Slices
```

Profile family: `profiles/sds-planning-profiles.md`. Full SDS is the rich detailed planning profile. Mini/Modular can also plan a bounded application change rather than an entire app. A current SDS/UCDS plan may accumulate selected results from repeated `собери идеи`.

## File-Type Rule

README/index owns navigation; registries own semantic identities; Scenario owns application behavior; principles/workflows/templates/profiles/examples/commands keep their existing narrow roles. Current planning projections do not become second authorities over Scenario/UC/Domain/Slice meaning.

## Workspace Architecture Planning

See `architecture-planning/README.md`. Architecture Planning derives evidence-backed path/change pressure/axes and evaluates architecture proportionally rather than targeting patterns.

## Application / Tool Roots

Current application subtrees maintain their own Direction Registry + Scenario Catalog + Scenario owners and link implementation/tests as supporting evidence. Workspace/methodology families use Use-Case Registries.

## Parallel Work / Action Logs

Reusable semantics are owned by `parallel-work-scope-and-action-log-workflow.md`. Current planning files are current/forward selected meaning; action logs remain material history/rationale.

## Testing Planning

Sibling reusable family: `testing-planning/` owns Testing Strategy, behavior-specific Test Design and Current Test Coverage/Evidence Review.

## Dependency Management / Review Dependencies

`review-dependency-planning-workflow.md` owns the selected reusable dependency-management family:

- `UC-DOC-ESTABLISH-DEPENDENCY`;
- `UC-DOC-CONFIGURE-REVIEW-DEPENDENCIES`;
- `UC-DOC-REVIEW-DEPENDENTS`;
- `UC-DOC-MAINTAIN-SHARED-EXACT-MEANING`;
- `UC-DOC-REVIEW-DEPENDENCY-COVERAGE`.

Semantic dependency intent comes first. Linked Notes is the downstream implementation mechanism when explicit review tracking or exact synchronization is actually required; ordinary Markdown relations remain navigation only.

## Current Review And Consistency Owners

Selected reusable owners added by the current planning contract:

- `progressive-plan-refinement-workflow.md` — `UC-REPO-REFINE-CURRENT-PLAN`;
- `review-audit-workflow.md` — `UC-REPO-AUDIT-REVIEW`;
- `planning-findings-review-workflow.md` — `UC-REPO-REVIEW-PLANNING-FINDINGS`;
- `current-semantic-consistency-review-workflow.md` — `UC-DOC-REVIEW-CURRENT-CONSISTENCY`.

These capabilities remain reachable through semantic registries; no new command is required merely for a lens/filter/depth modifier.
