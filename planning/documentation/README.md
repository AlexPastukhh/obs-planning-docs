# Documentation Reusable Layer Index

Status: active reusable documentation layer index
Doc version: v0.7.0-planning-item-formation-owner
Scope: reusable documentation architecture, solution/workflow planning, Planning Item formation, update workflows, command planning, field kits, examples, parallel-work staging, Tampermonkey projection and reusable helper/tool files copied into the OBS planning layer.

## 1. Purpose

```text
planning/documentation/
```

owns reusable process rules and templates.

Concrete project routing/state remains outside:

```text
planning/README.md
planning/planning-use-case-map.md
planning/workflow-activation-map.md
planning/root-source-sync-register.md
planning/areas/
```

## 2. Core Authority Split

```text
planning/documentation/
  → reusable workflows, principles, terminology and templates;

planning/planning-use-case-map.md
  → concrete project command routes and canonical English names;

future semantic Direction/Use-Case registries
  → semantic work/use-case identities and owner routes;

planning/areas/
  → concrete project-local plans, items, workflows and models;

Tampermonkey
  → projection only.
```

Do not use field kits as runtime routers after project root files exist.

Examples demonstrate behavior; they do not own rules.

## 3. Active Structure

### Core Reusable Documentation Owners

```text
planning-docs-architecture-principles.md
documentation-responsibility-map.md
documentation-principles-read-workflow.md
documentation-update-workflow.md
documentation-update-plan-workflow.md
documentation-responsibility-zone-review-workflow.md
use-case-map-workflow.md
USE-CASE-MAP-TEMPLATE.md
reviewable-agent-output-and-commands-workflow.md
command-planning-workflow.md
tampermonkey-command-projection-workflow.md
example-coverage-workflow.md
file-update-overview-workflow.md
FILE-UPDATE-OVERVIEW-TEMPLATE.md
```

### Reusable Field Kits

```text
field-kits/root-use-case-map-field-kit.md
field-kits/status-reconciliation-field-kit.md
field-kits/shared-visibility-map-field-kit.md
field-kits/source-usage-cascade-field-kit.md
```

### Reusable Profiles

```text
profiles/scenario-domain-slice-docs-profile.md
profiles/scenario-domain-slice-use-case-field-kit.md
```

Prototype-depth adaptation of scenario/domain/slice planning is a separate future task.

### Parallel Work

```text
parallel-work/README.md
parallel-work/parallel-workflow.md
parallel-work/parallel-sync-workflow.md
parallel-work/PARALLEL-WORKSPACE-TEMPLATE.md
parallel-work/PARALLEL-SYNC-PLAN-TEMPLATE.md
```

### Solution / Workflow Planning Family

```text
application-planning/README.md
application-planning/application-planning-responsibility-map.md
application-planning/terminology-and-planning-items.md
application-planning/application-planning-principles.md
application-planning/planning-item-formation-workflow.md
application-planning/application-planning-drafting-workflow.md

application-planning/templates/
  CURRENT-WORKFLOW-AND-PROBLEM-ANALYSIS-DRAFT-TEMPLATE.md
  PLANNING-ITEM-REVIEW-TEMPLATE.md
  PLANNING-DRAFT-TEMPLATE.md
  FUNCTIONAL-WORKFLOW-DRAFT-TEMPLATE.md
  PROTOTYPE-PLAN-TEMPLATE.md
  PROTOTYPE-RESULT-TEMPLATE.md
```

Legacy opportunity/Product Legend/Solution Overview templates remain migration aids.

New concrete state does not belong under `application-planning/drafts/`.

### Tampermonkey Tool

```text
tools/tampermonkey/README.md
tools/tampermonkey/chat-command-palette.user.js
```

The helper is not command or semantic-registry authority.

### Examples And Portable Setup

```text
examples/README.md
PORTABLE-STARTER-KIT.md
```

## 4. Bootstrap vs Runtime

### Bootstrap

Use only while project root planning files do not exist:

```text
PORTABLE-STARTER-KIT.md
field-kits/root-use-case-map-field-kit.md
other field kits as needed
```

### Runtime

```text
1. planning/README.md
2. planning/planning-use-case-map.md
3. planning/workflow-activation-map.md
4. planning/root-source-sync-register.md
5. relevant area owner
6. relevant planning/documentation owner workflows/templates
7. Dashboard runtime help when local planning data is in scope
```

## 5. Task Read Orders

### Command / Root Route Work

```text
planning/planning-use-case-map.md
documentation-principles-read-workflow.md
planning-docs-architecture-principles.md
documentation-responsibility-map.md
field-kits/root-use-case-map-field-kit.md only for setup/shape guidance
use-case-map-workflow.md
USE-CASE-MAP-TEMPLATE.md
command-planning-workflow.md when command route is planned
example-coverage-workflow.md when example fit matters
tampermonkey-command-projection-workflow.md only when projection is in scope
```

The root UCM is a command route map. It is not the future semantic Direction/Use-Case Registry.

### Documentation Preflight / Broad Update

```text
planning/planning-use-case-map.md
planning/README.md
planning/workflow-activation-map.md
planning/root-source-sync-register.md
planning/documentation/README.md
documentation-principles-read-workflow.md
planning-docs-architecture-principles.md
documentation-responsibility-map.md
documentation-update-plan-workflow.md
documentation-update-workflow.md
documentation-responsibility-zone-review-workflow.md when classification is non-trivial
other task owners
```

### Replacement Archive / Package

```text
planning/planning-use-case-map.md
reviewable-agent-output-and-commands-workflow.md
relevant package workflow
relevant owners and complete target files
relevant example only when required
```

### Planning Item Formation

```text
application-planning/README.md
application-planning/application-planning-responsibility-map.md
application-planning/terminology-and-planning-items.md
application-planning/application-planning-principles.md
application-planning/planning-item-formation-workflow.md
application-planning/templates/PLANNING-ITEM-REVIEW-TEMPLATE.md
project input conventions when present
selected source
relevant current items/owners
project-local item register/Full Picture owner
```

This read order does not itself create a project command. Command naming/routing is a later project-root update.

### Planning Item Reconciliation / Full Picture Work

```text
application-planning/README.md
application-planning/application-planning-responsibility-map.md
application-planning/terminology-and-planning-items.md
application-planning/application-planning-principles.md
application-planning/application-planning-drafting-workflow.md
selected items/source
complete current project-local owners
relevant templates and formation owner
```

### Current Reality / Workflow / Branch / Prototype Planning

```text
application-planning/README.md
application-planning/application-planning-responsibility-map.md
application-planning/application-planning-principles.md
application-planning/application-planning-drafting-workflow.md
relevant recommended template
project-local artifact
```

### Scenario Planning Workspace

```text
planning/planning-use-case-map.md
planning/areas/planning-system/README.md
planning/areas/planning-system/scenario-planning-workspace-workflow.md
planning/areas/planning-system/scenario-planning-workspace-template.md
```

### Conspects

```text
planning/planning-use-case-map.md
planning/areas/conspects/README.md
local conspect docs
```

### Parallel Work

```text
parallel-work/README.md
parallel-work/parallel-workflow.md
parallel-work/parallel-sync-workflow.md when sync candidates exist
relevant templates
```

## 6. Planned But Not Present In This Batch

```text
direction-and-use-case-registry-workflow.md
DIRECTION-REGISTRY-TEMPLATE.md
USE-CASE-REGISTRY-TEMPLATE.md
```

These are Batch 4 owners. Do not pretend they already exist.

## 7. Do Not

```text
- Do not create a second reusable-candidate folder.
- Do not place project state or command routing in reusable docs.
- Do not treat the root UCM as semantic Direction/Use-Case authority.
- Do not create a second generic root UCM here.
- Do not use field kits as runtime routers.
- Do not use examples as owners.
- Do not treat parallel staging copies as canonical.
- Do not create aggregate sync before a sync candidate exists.
- Do not keep a second tracked project-local Tampermonkey helper by default.
- Do not treat helper scripts as command/registry authority.
- Do not keep deprecated templates as competing owners.
- Do not create new concrete product drafts in the reusable family.
- Do not duplicate Planning Item formation rules in the drafting workflow.
```
