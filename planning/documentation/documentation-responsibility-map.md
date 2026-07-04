# Documentation Responsibility Map

Status: active reusable documentation-layer responsibility map
Doc version: v0.6.1-nested-responsibility-maps
Scope: routes reusable documentation-layer information and preflight processes to the correct immediate owner or responsibility zone inside `planning/documentation/`.

## 1. Purpose

Use this file after it is clear that information belongs to the reusable documentation layer.

It answers:

```text
Which immediate owner or responsibility zone inside planning/documentation/
should receive this information?
Which nested responsibility map should be read next?
What should remain project-specific outside planning/documentation/?
```

Layered responsibility rule:

```text
parent responsibility map:
  routes information into a documentation area or owner family;

area responsibility map:
  routes information between files and subfolders inside that area;

README:
  owns navigation and read order, not detailed ownership.
```

This map should not duplicate the complete internal owner table of an area that has its own responsibility map.

For concrete project command routing, use:

```text
planning/planning-use-case-map.md
```

For project entry/read order, use:

```text
planning/README.md
```

## 2. Owner Table

| Information type | Owner file / zone | Notes |
|---|---|---|
| Architecture invariants | `planning-docs-architecture-principles.md` | Stable reusable layer/source-of-truth boundaries. |
| Documentation principles/read preflight | `documentation-principles-read-workflow.md` | Full/targeted read order, checked/not-checked reporting and task-specific owner expansion. |
| Documentation update process | `documentation-update-workflow.md` | How to perform approved documentation edits and replacement packages. |
| Documentation update plan | `documentation-update-plan-workflow.md` | How to plan broad documentation changes before editing. |
| Responsibility-zone review | `documentation-responsibility-zone-review-workflow.md` | How to classify existing text into owner zones. |
| Use-case-map workflow | `use-case-map-workflow.md` | How to create/update concrete UCMs. |
| Use-case-map template | `USE-CASE-MAP-TEMPLATE.md` | Exact reusable UCM and command-route shapes. |
| Command planning | `command-planning-workflow.md` | Plan-only workflow for command routes, English names and projection decisions. |
| Reviewable answer/output commands | `reviewable-agent-output-and-commands-workflow.md` | Answer levels, archive source selection, package and review boundaries. |
| File-update overview process | `file-update-overview-workflow.md` | Ordered file-update planning and reporting. |
| File-update overview shape | `FILE-UPDATE-OVERVIEW-TEMPLATE.md` | Exact Markdown block shape. |
| Example coverage | `example-coverage-workflow.md` | When examples are needed. |
| Examples index | `examples/README.md` | Demonstration navigation only. |
| Root setup field kit | `field-kits/root-use-case-map-field-kit.md` | Bootstrap seed guidance only. |
| Status/shared/source field kits | `field-kits/*.md` | Optional setup guidance. |
| Scenario/domain/slice profile | `profiles/scenario-domain-slice-*.md` | Optional reusable class-of-project guidance. |
| Parallel work | `parallel-work/*` | Reusable staging/sync workflow and templates. |
| Tampermonkey projection | `tampermonkey-command-projection-workflow.md` | Reusable projection-only rules. |
| Tampermonkey full helper | `tools/tampermonkey/*` | Helper implementation; not command authority. |
| Solution/workflow planning family entry and read order | `application-planning/README.md` | Family lifecycle, artifact overview and navigation. |
| Internal ownership inside solution/workflow planning | `application-planning/application-planning-responsibility-map.md` | Routes rules, workflows, templates and migration sources inside `application-planning/`. |

## 3. Nested Responsibility Maps

A nested responsibility map is justified when an area contains several files or subfolders with distinct responsibilities.

Current nested map:

```text
planning/documentation/application-planning/application-planning-responsibility-map.md
```

Ownership boundary:

```text
documentation-responsibility-map.md:
  decides that reusable solution/workflow-planning information belongs
  in the application-planning responsibility zone;

application-planning/application-planning-responsibility-map.md:
  decides which file or subfolder inside that zone owns it.
```

Do not bypass the nested map by maintaining a second complete list of its internal owners here.

Do not create a responsibility map in every small subfolder mechanically.

## 4. Solution/Workflow Planning Placement

```text
Reusable methodology:
  planning/documentation/application-planning/

Concrete Current Reality Capture, root plan, functional workflows,
branches, details and prototype state:
  planning/areas/<project-area>/ or another project-local owner
```

Deprecated opportunity, Product Legend and solution-overview templates are transition aids, not active owners.

A generated AI explanation is a reading view, not a canonical owner.

## 5. Placement Checks

Before adding reusable documentation-layer information, check:

```text
1. Is the information reusable or project-specific?
2. Is it a principle, workflow, template, field kit, profile, example or tool note?
3. Which immediate owner or responsibility zone above should receive it?
4. Does that zone have its own responsibility map?
5. Would adding the rule here duplicate a nested owner?
6. Does README.md need a navigation/read-order update?
7. Does the project root UCM need a concrete route or canonical English-name update instead?
8. Does Tampermonkey projection need to be updated, or is it out of scope?
9. Is the material concrete object/schema state that belongs in a project draft?
10. Is a separate file genuinely necessary?
```

## 6. Conflict Rules

```text
- Architecture principles win for stable reusable invariants.
- Documentation principles/read workflow wins for reusable preflight/read-order behavior.
- This map wins for routing between immediate owners and responsibility zones in planning/documentation/.
- A nested responsibility map wins for placement inside its own area.
- Workflow files win for their repeated process.
- Templates win for exact recommended shape only.
- Field kits win only for setup mode, not runtime routing.
- Project root UCM wins for command routing and canonical English names.
- Project-area owners win for concrete project state.
- Examples and helper scripts do not override owners.
- Deprecated templates do not compete with active owners.
```

## 7. Do Not

```text
- Do not duplicate a nested responsibility map's complete internal owner table here.
- Do not put concrete project state into reusable docs.
- Do not create new reusable files without navigation when discoverability matters.
- Do not make examples or helper scripts rule owners.
- Do not leave reusable rules only in local project folders.
- Do not reference project-specific support files unless the target project has them.
- Do not keep a deprecated prompt as a competing owner after its workflow has been renamed.
- Do not put application-specific class, storage or serialization decisions in reusable principles.
- Do not treat generated explanations as canonical documentation.
```
