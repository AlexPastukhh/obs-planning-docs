# Documentation Responsibility Map

Status: active reusable documentation-layer responsibility map
Doc version: v0.4.0-documentation-preflight
Scope: routes reusable documentation-layer information and preflight processes to the correct owner file inside `planning/documentation/`.

## 1. Purpose

Use this file after it is clear that information belongs to the reusable documentation layer.

It answers:

```text
Where inside planning/documentation/ should this information go?
Which reusable owner file should contain the rule/process/template/profile/example?
What should remain project-specific outside documentation/ ?
```

For concrete project command routing, use:

```text
planning/planning-use-case-map.md
```

For project entry/read order, use:

```text
planning/README.md
```

## 2. Owner Table

| Information type | Owner file | Notes |
|---|---|---|
| Architecture invariants | `planning-docs-architecture-principles.md` | Stable reusable layer/source-of-truth boundaries. |
| Documentation principles/read preflight | `documentation-principles-read-workflow.md` | Full/targeted read order, checked/not-checked reporting and task-specific owner expansion before documentation planning or changes. |
| Documentation update process | `documentation-update-workflow.md` | How to perform approved documentation edits. |
| Documentation update plan | `documentation-update-plan-workflow.md` | How to plan broad docs changes before editing. |
| Responsibility-zone review | `documentation-responsibility-zone-review-workflow.md` | How to classify existing text into owner zones. |
| Use-case-map workflow | `use-case-map-workflow.md` | How to create/update concrete UCMs. |
| Use-case-map template | `USE-CASE-MAP-TEMPLATE.md` | Exact reusable UCM and command-route shapes. |
| Command planning | `command-creation-workflow.md` | Plan-only workflow for command routes, required English names and projection decisions. |
| Reviewable answer/output commands | `reviewable-agent-output-and-commands-workflow.md` | Answer levels, response-level commands, archive source selection and package review boundary. |
| File update overview process | `file-update-overview-workflow.md` | When/how to produce file update overview and report selected package source. |
| File update overview shape | `FILE-UPDATE-OVERVIEW-TEMPLATE.md` | Exact Markdown block shape. |
| Example coverage | `example-coverage-workflow.md` | When examples are needed. |
| Examples index | `examples/README.md` | Demonstration navigation only. |
| Root setup field kit | `field-kits/root-use-case-map-field-kit.md` | Bootstrap seed guidance only. |
| Status/shared/source field kits | `field-kits/*.md` | Optional setup guidance for projects that create those root files. |
| Scenario/domain/slice profile | `profiles/scenario-domain-slice-*.md` | Optional reusable profile/route setup guidance. |
| Parallel work | `parallel-work/*` | Reusable staging/sync workflow and templates. |
| Tampermonkey projection | `tampermonkey-command-projection-workflow.md` | Reusable projection-only helper rules. |
| Tampermonkey full helper | `tools/tampermonkey/*` | Reusable helper implementation; not command authority. |

## 3. Placement Checks

Before adding reusable documentation-layer information, check:

```text
1. Is the information reusable, or project-specific?
2. Is it a principle, workflow, template, field kit, profile, example or tool note?
3. Is there already an owner file above?
4. Would adding it duplicate another owner?
5. Does README.md need a navigation/read-order update?
6. Does the project root UCM need a concrete route or canonical English-name update instead?
7. Does Tampermonkey projection need to be updated, or is it out of scope?
```

## 4. Conflict Rules

```text
- Architecture principles win for stable reusable invariants.
- Documentation principles/read workflow wins for reusable preflight/read-order behavior.
- This responsibility map wins for reusable docs-layer placement.
- Workflow files win for their own repeated process.
- Templates win for exact output/file shape.
- Field kits win only for setup mode, not runtime routing.
- Project root UCM wins for concrete command routing and canonical English names.
- Area docs win for local project application details.
- Examples do not override owners.
- Tampermonkey projection workflow wins for helper projection rules.
```

## 5. Do Not

```text
- Do not put concrete project state into reusable docs.
- Do not create new reusable files without updating README when discoverability matters.
- Do not make examples or helper scripts rule owners.
- Do not leave reusable rules only in local project folders.
- Do not reference project-specific support files unless the target project has them.
- Do not keep a deprecated prompt as a competing owner after its workflow has been renamed.
```
