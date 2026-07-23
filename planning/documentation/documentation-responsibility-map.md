# Documentation Responsibility Map

Status: active reusable documentation-layer responsibility map
Doc version: v0.8.0-semantic-registry-routing
Scope: routes reusable documentation-layer information and preflight processes to the correct immediate owner or responsibility zone inside `planning/documentation/`.

## 1. Purpose

Use after information is classified as reusable documentation-layer material.

```text
parent responsibility map
  → routes into an owner family/zone;

nested responsibility map
  → routes between files inside that zone;

README
  → owns navigation/read order.
```

Concrete project command routing:

```text
planning/planning-use-case-map.md
```

Concrete project entry:

```text
planning/README.md
```

Semantic Direction/Use-Case registries are separate from the command UCM. Their reusable workflow/templates are active owners.

## 2. Owner Table

| Information type | Owner file / zone | Notes |
|---|---|---|
| Architecture/layer/source-of-truth invariants | `planning-docs-architecture-principles.md` | Stable reusable boundaries. |
| Documentation principles/read preflight | `documentation-principles-read-workflow.md` | Full/targeted read order and checked/not-checked reporting. |
| Documentation update process | `documentation-update-workflow.md` | Approved edits and replacement packages. |
| Documentation update plan | `documentation-update-plan-workflow.md` | Plan-first broad updates. |
| Responsibility-zone review | `documentation-responsibility-zone-review-workflow.md` | Classification of existing text/owners. |
| Project route-map/UCM maintenance | `use-case-map-workflow.md` | Command/action routing, not semantic registry ownership. |
| Direction/Use-Case registry methodology | `direction-and-use-case-registry-workflow.md` | Semantic hierarchy, topology, activation and owner routes. |
| Direction Registry shape | `DIRECTION-REGISTRY-TEMPLATE.md` | Exact recommended registry representation. |
| Use-Case Registry shape | `USE-CASE-REGISTRY-TEMPLATE.md` | Exact recommended registry representation. |
| UCM template | `USE-CASE-MAP-TEMPLATE.md` | Exact route-map shape. |
| Command planning | `command-planning-workflow.md` | Plan-only command names/routes/projection decisions. |
| Reviewable outputs/packages | `reviewable-agent-output-and-commands-workflow.md` | Answer/package/source-selection boundaries. |
| File-update overview process | `file-update-overview-workflow.md` | Ordered file-update planning/reporting. |
| File-update overview shape | `FILE-UPDATE-OVERVIEW-TEMPLATE.md` | Exact Markdown shape. |
| Example coverage | `example-coverage-workflow.md` | When examples are useful. |
| Examples | `examples/README.md` | Demonstration navigation only. |
| Root setup field kit | `field-kits/root-use-case-map-field-kit.md` | Bootstrap only. |
| Other field kits | `field-kits/*.md` | Optional setup guidance. |
| Scenario/domain/slice profile | `profiles/scenario-domain-slice-*.md` | Reusable profile; prototype-depth adaptation separate. |
| Parallel work | `parallel-work/*` | Staging/sync workflows/templates. |
| Tampermonkey projection | `tampermonkey-command-projection-workflow.md` | Projection-only rules. |
| Tampermonkey helper | `tools/tampermonkey/*` | Implementation, not authority. |
| Solution/workflow planning family | `application-planning/README.md` | Family lifecycle/read order. |
| Internal planning owners | `application-planning/application-planning-responsibility-map.md` | Terminology, principles, formation, drafting/reconciliation and templates. |

## 3. Nested Responsibility Map

Current nested map:

```text
application-planning/application-planning-responsibility-map.md
```

The parent map does not duplicate its complete internal owner table.

It routes reusable source-to-item formation into the application-planning zone; the nested map chooses the dedicated formation workflow/template.

## 4. Solution / Workflow Planning Placement

```text
Reusable methodology:
  planning/documentation/application-planning/

Concrete items, source contributions, Full Pictures, workflows,
concerns, decisions and prototype state:
  planning/areas/<project-area>/ or another project-local owner
```

Generated explanation is a reading/proposal view, not a canonical owner automatically.

## 5. Route Map vs Semantic Registries

```text
project root UCM / planning-use-case-map.md
  → commands, active-context behavior, reads, outputs, permissions;

future Direction Registry
  → broad work directions and topology;

future Use-Case Registry
  → semantic independently useful use cases and owner routes.
```

Do not add semantic registry bodies to the UCM.

The reusable registry workflow/templates are active. Concrete project registries remain project-specific owners.

## 6. Placement Checks

```text
1. Reusable or project-specific?
2. Principle, terminology, workflow, template, field kit, profile, example or tool note?
3. Immediate owner/zone?
4. Nested map present?
5. Would this duplicate a nested owner?
6. Does README/navigation need update?
7. Is this command routing, semantic Direction/Use-Case identity, or neither?
8. Does Tampermonkey projection need a later update?
9. Is concrete object/schema/state being misplaced?
10. Is a separate file independently useful?
```

## 7. Conflict Rules

```text
- Architecture principles win for stable layer/source-of-truth boundaries.
- Documentation preflight wins for reusable read behavior.
- This map wins for routing between immediate documentation owners/zones.
- Nested map wins inside its area.
- Workflow files win for repeated process.
- Templates win for recommended shape only.
- Project root UCM wins for commands/canonical English names.
- Semantic registries win for Direction/Use-Case entries.
- Project areas win for concrete state.
- Examples/helper scripts do not override owners.
```

## 8. Do Not

```text
- Do not duplicate the nested internal owner table.
- Do not put concrete project state into reusable docs.
- Do not create reusable files without navigation/ownership.
- Do not make examples or helper scripts owners.
- Do not leave reusable rules only in project-local files.
- Do not reference absent project-specific support files as if present.
- Do not put app-specific storage/schema decisions in reusable principles.
- Do not treat generated explanations as canonical automatically.
- Do not copy complete local registry entries into root/reference owners.
```
