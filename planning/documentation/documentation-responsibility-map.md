# Documentation Responsibility Map

Status: active reusable documentation-layer responsibility map
Doc version: v1.0.0-unified-planning-owner
Scope: routes reusable documentation-layer information and preflight processes to the correct immediate owner or responsibility zone inside `planning/documentation/`.

## 1. Purpose

Use this map after information is classified as reusable documentation-layer material.

```text
parent responsibility map
  → routes into an owner family or zone;

nested responsibility map
  → routes between files inside that zone;

README
  → owns navigation and read order.
```

Concrete project command routing:

```text
planning/planning-use-case-map.md
```

Concrete project entry:

```text
planning/README.md
```

Semantic Direction/Use-Case registries remain separate from the command UCM.

## 2. Owner Table

| Information type | Owner file / zone | Notes |
|---|---|---|
| Architecture, layer and source-of-truth invariants | `planning-docs-architecture-principles.md` | Stable reusable boundaries |
| Documentation preflight | `documentation-principles-read-workflow.md` | Full/targeted read order and checked reporting |
| Documentation update process | `documentation-update-workflow.md` | Approved edits and replacement packages |
| Documentation update plan | `documentation-update-plan-workflow.md` | Plan-first broad updates |
| Responsibility-zone review | `documentation-responsibility-zone-review-workflow.md` | Existing content/owner classification |
| Project UCM maintenance | `use-case-map-workflow.md` | Commands and permissions, not semantic registry ownership |
| Direction/Use-Case registry methodology | `direction-and-use-case-registry-workflow.md` | Semantic hierarchy, topology and owner routes |
| Direction Registry shape | `DIRECTION-REGISTRY-TEMPLATE.md` | Recommended registry representation |
| Use-Case Registry shape | `USE-CASE-REGISTRY-TEMPLATE.md` | Recommended registry representation |
| UCM template | `USE-CASE-MAP-TEMPLATE.md` | Recommended command-route shape |
| Command planning | `command-planning-workflow.md` | Plan-only command route changes |
| Reviewable outputs/packages | `reviewable-agent-output-and-commands-workflow.md` | Answer/package/source-selection boundaries |
| File-update overview process | `file-update-overview-workflow.md` | Ordered update planning/reporting |
| File-update overview shape | `FILE-UPDATE-OVERVIEW-TEMPLATE.md` | Exact recommended Markdown shape |
| Example coverage | `example-coverage-workflow.md` | When examples are useful |
| Examples | `examples/README.md` | Demonstration navigation only |
| Root setup field kit | `field-kits/root-use-case-map-field-kit.md` | Bootstrap only |
| Other field kits | `field-kits/*.md` | Optional setup guidance |
| Scenario/Domain/Slice specialization | `profiles/scenario-domain-slice-*.md` | Optional profile, not a universal route |
| Parallel work | `parallel-work/*` | Staging/sync workflows/templates |
| Tampermonkey projection | `tampermonkey-command-projection-workflow.md` | Projection-only rules |
| Tampermonkey helper | `tools/tampermonkey/*` | Implementation, not authority |
| Solution/workflow planning family | `application-planning/README.md` | Family lifecycle and read order |
| Internal solution/workflow planning owners | `application-planning/application-planning-responsibility-map.md` | Unified concepts/principles, formation, drafting and templates |

## 3. Nested Responsibility Map

Current nested map:

```text
application-planning/application-planning-responsibility-map.md
```

The parent map does not duplicate its complete internal owner table.

It routes reusable solution/workflow-planning concepts, principles and processes into the application-planning zone. The nested map chooses the immediate owner.

## 4. Principles And Terminology Ownership

A methodology family may use one combined owner for definitions, distinctions and stable principles when:

```text
- definitions require rules to be understood correctly;
- a separate terminology file would repeat principles;
- a separate principles file would use terms without enough context;
- the concepts form one cohesive methodology boundary.
```

Current application-planning owner:

```text
application-planning/application-planning-principles-and-terminology.md
```

Do not recreate separate competing application-planning terminology and principles owners.

## 5. Solution / Workflow Planning Placement

```text
Reusable methodology:
  planning/documentation/application-planning/

Concrete Planning Items, source contributions, Planning Drafts,
workflows, scenarios, concerns, decisions and prototype state:
  planning/areas/<project-area>/ or another project-local owner.
```

Generated explanation is a reading/proposal view, not a canonical owner automatically.

Reusable solution/workflow planning does not own a concrete application runtime or managed-object schema.

## 6. Route Map Vs Semantic Registries

```text
project root UCM / planning-use-case-map.md
  → commands, active-context behavior, reads,
    outputs and permissions;

Direction Registry
  → broad work directions and topology;

Use-Case Registry
  → independently useful use cases
    and owner routes.
```

Do not add semantic registry bodies to the UCM.

The reusable registry workflow/templates are active. Concrete project registries remain project-specific owners.

## 7. Placement Checks

```text
1. Reusable or project-specific?
2. Concept/principle, workflow, template, profile, field kit,
   example or tool note?
3. Immediate owner or zone?
4. Nested map present?
5. Would this duplicate a nested owner?
6. Does README/navigation need update?
7. Is this command routing, semantic Direction/Use-Case identity,
   or neither?
8. Does projection need a later update?
9. Is concrete object/schema/state being misplaced?
10. Is a separate file independently useful?
11. Does the proposal assume an application/runtime
    that has not been accepted or implemented?
```

## 8. Conflict Rules

```text
- Architecture principles win for stable layer/source-of-truth boundaries.
- Documentation preflight wins for reusable read behavior.
- This map wins for routing between immediate documentation zones.
- Nested maps win inside their families.
- Concept/principle owners win for reusable definitions and invariants.
- Workflow files win for repeated process.
- Templates win for recommended shape only.
- Profiles win only within their explicit optional scope.
- Project root UCM wins for commands and canonical English names.
- Semantic registries win for Direction/Use-Case entries.
- Project areas win for concrete state.
- Examples and helper scripts do not override owners.
```

## 9. Do Not

```text
- Do not duplicate the nested internal owner table.
- Do not place project-specific application state in reusable docs.
- Do not route project commands through reusable registries.
- Do not treat profiles as universal planning stages.
- Do not maintain competing terminology and principles owners
  for one cohesive methodology without independent value.
```
