# Documentation Reusable Layer Index

Status: active reusable documentation layer index
Doc version: v0.5.0-command-planning-projection
Scope: reusable documentation architecture, application-planning guidance, update workflows, command planning, field kits, examples, parallel-work staging, Tampermonkey command projection and reusable helper/tool files copied into the OBS planning layer.

## 1. Purpose

This folder is the reusable documentation layer:

```text
planning/documentation/
```

It owns reusable process rules and templates. It does not own OBS-specific plans, conspect state or concrete command routing after the OBS root files exist.

Concrete OBS routing and local application live outside this folder:

```text
planning/README.md
planning/planning-use-case-map.md
planning/workflow-activation-map.md
planning/root-source-sync-register.md
planning/areas/
```

## 2. Core Rule

```text
planning/documentation/ = reusable process layer
planning/planning-use-case-map.md = OBS runtime command router and canonical English-name owner
planning/areas/ = OBS local applications of reusable processes
```

Do not use field kits as runtime routers after OBS root files exist. Field kits are bootstrap/setup tools.

Do not treat examples as rule owners. Examples demonstrate behavior and must link back to owner workflows/templates.

Do not treat Tampermonkey helper files as command authority. Tampermonkey is projection only.

## 3. Active Structure

Core reusable documentation files:

```text
planning/documentation/planning-docs-architecture-principles.md
planning/documentation/documentation-responsibility-map.md
planning/documentation/documentation-principles-read-workflow.md
planning/documentation/documentation-update-workflow.md
planning/documentation/documentation-update-plan-workflow.md
planning/documentation/documentation-responsibility-zone-review-workflow.md
planning/documentation/use-case-map-workflow.md
planning/documentation/USE-CASE-MAP-TEMPLATE.md
planning/documentation/reviewable-agent-output-and-commands-workflow.md
planning/documentation/command-planning-workflow.md
planning/documentation/tampermonkey-command-projection-workflow.md
planning/documentation/example-coverage-workflow.md
planning/documentation/file-update-overview-workflow.md
planning/documentation/FILE-UPDATE-OVERVIEW-TEMPLATE.md
```

Reusable field kits:

```text
planning/documentation/field-kits/root-use-case-map-field-kit.md
planning/documentation/field-kits/status-reconciliation-field-kit.md
planning/documentation/field-kits/shared-visibility-map-field-kit.md
planning/documentation/field-kits/source-usage-cascade-field-kit.md
```

Reusable profiles:

```text
planning/documentation/profiles/scenario-domain-slice-docs-profile.md
planning/documentation/profiles/scenario-domain-slice-use-case-field-kit.md
```

Reusable parallel-work owners:

```text
planning/documentation/parallel-work/README.md
planning/documentation/parallel-work/parallel-workflow.md
planning/documentation/parallel-work/parallel-sync-workflow.md
planning/documentation/parallel-work/PARALLEL-WORKSPACE-TEMPLATE.md
planning/documentation/parallel-work/PARALLEL-SYNC-PLAN-TEMPLATE.md
```

Reusable application-planning family:

```text
planning/documentation/application-planning/README.md
planning/documentation/application-planning/application-planning-responsibility-map.md
planning/documentation/application-planning/application-planning-principles.md
planning/documentation/application-planning/application-planning-drafting-workflow.md
planning/documentation/application-planning/templates/
planning/documentation/application-planning/drafts/
```

Reusable full Tampermonkey helper/tool:

```text
planning/documentation/tools/tampermonkey/README.md
planning/documentation/tools/tampermonkey/chat-command-palette.user.js
```

Examples index:

```text
planning/documentation/examples/README.md
```

Portable one-time adaptation guide:

```text
planning/documentation/PORTABLE-STARTER-KIT.md
```

## 4. Bootstrap Mode vs Runtime Mode

### Bootstrap Mode

Use bootstrap mode only when the project root planning files do not exist yet or are being created:

```text
1. planning/documentation/PORTABLE-STARTER-KIT.md
2. planning/documentation/field-kits/root-use-case-map-field-kit.md
3. other field kits as needed
```

Bootstrap mode creates project-specific root files. It is not the normal runtime router after those files exist.

### Runtime Mode

For normal OBS planning/documentation work after root files exist, start from:

```text
1. planning/README.md
2. planning/planning-use-case-map.md
3. planning/workflow-activation-map.md
4. planning/root-source-sync-register.md
5. relevant command and area owner docs
6. relevant planning/documentation/... owner workflows/templates
7. Dashboard userscript/runtime help when local planning data is in scope
```

## 5. Task Read Orders

For root use-case map or command-routing work:

```text
1. planning/planning-use-case-map.md
2. planning/documentation/documentation-principles-read-workflow.md
3. planning/documentation/planning-docs-architecture-principles.md
4. planning/documentation/documentation-responsibility-map.md
5. planning/documentation/field-kits/root-use-case-map-field-kit.md, only for route shape / seed-row guidance
6. planning/documentation/use-case-map-workflow.md
7. planning/documentation/USE-CASE-MAP-TEMPLATE.md
8. planning/documentation/command-planning-workflow.md, when a command route is planned or changed
9. planning/documentation/example-coverage-workflow.md and examples index when coverage is relevant
10. planning/documentation/tampermonkey-command-projection-workflow.md, only when helper projection is separately in scope
```

For documentation-principles preflight and broad documentation updates:

```text
1. planning/planning-use-case-map.md
2. planning/README.md
3. planning/workflow-activation-map.md
4. planning/root-source-sync-register.md
5. planning/documentation/README.md
6. planning/documentation/documentation-principles-read-workflow.md
7. planning/documentation/planning-docs-architecture-principles.md
8. planning/documentation/documentation-responsibility-map.md
9. planning/documentation/documentation-update-plan-workflow.md, for plan-first broad changes
10. planning/documentation/documentation-update-workflow.md, for approved edits
11. planning/documentation/documentation-responsibility-zone-review-workflow.md, when ownership/classification is non-trivial
12. other owner workflows/templates named by the route or task
```

Use a full preflight when the route has not been read in the current chat, is not remembered, or documentation ownership/boundaries are uncertain. Use a targeted refresh only after a current full pass.

For replacement archive/package work:

```text
1. planning/planning-use-case-map.md
2. planning/documentation/reviewable-agent-output-and-commands-workflow.md
3. relevant package workflow, such as planning/documentation/documentation-update-workflow.md
4. relevant owner docs and target files
5. relevant example only when the route requires example confirmation
```

For scenario planning workspace work:

```text
1. planning/planning-use-case-map.md
2. planning/areas/planning-system/README.md
3. planning/areas/planning-system/scenario-planning-workspace-workflow.md
4. planning/areas/planning-system/scenario-planning-workspace-template.md
```

For application discovery, Product Legend, solution overview or prototype planning:

```text
1. planning/documentation/application-planning/README.md
2. planning/documentation/application-planning/application-planning-responsibility-map.md
3. planning/documentation/application-planning/application-planning-principles.md
4. planning/documentation/application-planning/application-planning-drafting-workflow.md
5. the relevant template under planning/documentation/application-planning/templates/
6. the corresponding draft skeleton or project-local draft
```

For conspect work:

```text
1. planning/planning-use-case-map.md
2. planning/areas/conspects/README.md
3. local conspect docs when they are created
```

For parallel-agent workspace or aggregate sync work:

```text
1. planning/documentation/parallel-work/README.md
2. planning/documentation/parallel-work/parallel-workflow.md, for one staging workspace
3. planning/documentation/parallel-work/parallel-sync-workflow.md, for aggregate sync from sync-candidate workspaces
4. relevant templates under planning/documentation/parallel-work/
```

## 6. Do Not

```text
- Do not create a second reusable-candidate folder.
- Do not put OBS-specific plans, conspect state or command routing inside reusable docs.
- Do not create a second generic root use-case map inside this folder.
- Do not use examples as rule owners.
- Do not treat field kits as runtime routers after root files exist.
- Do not treat parallel-work workspace copies as canonical documentation.
- Do not create aggregate sync before at least one workspace is a sync-candidate.
- Do not keep a second tracked project-local Tampermonkey helper while reusable-only placement is active.
- Do not treat any Tampermonkey userscript as command authority.
- Do not leave reusable Tampermonkey projection rules only in local tools or workstream files.
- Do not keep a deprecated prompt as a competing owner after its workflow has been renamed.
```
