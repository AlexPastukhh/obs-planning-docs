# Documentation Reusable Layer Index

Status: active reusable documentation layer index
Doc version: v1.1.0-command-registry-navigation
Scope: reusable documentation architecture, solution/workflow planning, Planning Item formation, update workflows, command planning, profiles, field kits, examples, parallel work and helper projection.

## 1. Purpose

```text
planning/documentation/
```

owns reusable process rules, principles, terminology, workflows, profiles and templates.

Concrete project routing and state remain outside:

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
  → reusable workflows, concept/principle owners,
    profiles and templates;

planning/planning-use-case-map.md
  → mandatory project command-system entry/global policy;

optional project command registry
  → concrete command definitions and canonical English names;

semantic Direction/Use-Case registries
  → semantic identities and owner routes;

planning/areas/
  → concrete project-local plans, items,
    workflows, decisions and models;

Tampermonkey
  → projection only.
```

A cohesive methodology family may use one combined `Principles And Terminology` owner when definitions and their stable rules would otherwise duplicate or fragment meaning.

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
direction-and-use-case-registry-workflow.md
DIRECTION-REGISTRY-TEMPLATE.md
USE-CASE-REGISTRY-TEMPLATE.md
reviewable-agent-output-and-commands-workflow.md
command-planning-workflow.md
tampermonkey-command-projection-workflow.md
example-coverage-workflow.md
file-update-overview-workflow.md
FILE-UPDATE-OVERVIEW-TEMPLATE.md
```

### Solution / Workflow Planning Family

```text
application-planning/README.md
application-planning/application-planning-responsibility-map.md
application-planning/application-planning-principles-and-terminology.md
application-planning/planning-item-formation-workflow.md
application-planning/application-planning-drafting-workflow.md
application-planning/direction-registry.md
application-planning/use-case-registry.md

temporary compatibility pointers:
  application-planning/application-planning-principles.md
  application-planning/terminology-and-planning-items.md

application-planning/templates/
  CURRENT-WORKFLOW-AND-PROBLEM-ANALYSIS-DRAFT-TEMPLATE.md
  PLANNING-ITEM-REVIEW-TEMPLATE.md
  PLANNING-DRAFT-TEMPLATE.md
  SCENARIO-DRAFT-TEMPLATE.md
  FUNCTIONAL-WORKFLOW-DRAFT-TEMPLATE.md
  PROTOTYPE-PLAN-TEMPLATE.md
  PROTOTYPE-RESULT-TEMPLATE.md
```

Legacy opportunity, Product Legend and Solution Overview templates remain migration aids.

New concrete state does not belong under `application-planning/drafts/`.

### Reusable Profiles

```text
profiles/scenario-domain-slice-docs-profile.md
profiles/scenario-domain-slice-use-case-field-kit.md
```

These are optional specialized profiles. They are not universal planning stages.

### Reusable Field Kits

```text
field-kits/root-use-case-map-field-kit.md
field-kits/status-reconciliation-field-kit.md
field-kits/shared-visibility-map-field-kit.md
field-kits/source-usage-cascade-field-kit.md
```

### Parallel Work

```text
parallel-work/README.md
parallel-work/parallel-workflow.md
parallel-work/parallel-sync-workflow.md
parallel-work/PARALLEL-WORKSPACE-TEMPLATE.md
parallel-work/PARALLEL-SYNC-PLAN-TEMPLATE.md
```

### Tampermonkey Tool

```text
tools/tampermonkey/README.md
tools/tampermonkey/chat-command-palette/README.md
tools/tampermonkey/chat-command-palette.user.js  # generated install artifact
```

The helper is not command or semantic-registry authority.

### Examples And Portable Setup

```text
examples/README.md
PORTABLE-STARTER-KIT.md
```

## 4. Bootstrap Vs Runtime

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
5. relevant project-local owner
6. relevant planning/documentation owner
7. Dashboard runtime help when local planning data is in scope.
```

## 5. Task Read Orders

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
documentation-responsibility-zone-review-workflow.md
task-specific owners.
```

### Command / Root Route Work

```text
planning/planning-use-case-map.md
planning/commands/README.md and selected command definition when the project uses a delegated registry
documentation-principles-read-workflow.md
planning-docs-architecture-principles.md
documentation-responsibility-map.md
use-case-map-workflow.md
USE-CASE-MAP-TEMPLATE.md
command-planning-workflow.md when a command is planned
example-coverage-workflow.md when example fit matters
tampermonkey-command-projection-workflow.md only when projection is in scope.
```

The root UCM is the mandatory command-system entry. A project command registry may own individual command definitions. Neither is the semantic Direction/Use-Case Registry.

### Replacement Archive / Package

```text
planning/planning-use-case-map.md
reviewable-agent-output-and-commands-workflow.md
documentation-update-workflow.md
relevant owner and target files.
```

### Planning Item Formation

```text
application-planning/README.md
application-planning/application-planning-responsibility-map.md
application-planning/application-planning-principles-and-terminology.md
application-planning/planning-item-formation-workflow.md
application-planning/templates/PLANNING-ITEM-REVIEW-TEMPLATE.md
project input conventions when present
selected source
relevant current items/owners
project-local Planning Draft or item owner when reconciliation requires it.
```

### Planning Item Reconciliation / Planning Draft Work

```text
application-planning/README.md
application-planning/application-planning-responsibility-map.md
application-planning/application-planning-principles-and-terminology.md
application-planning/application-planning-drafting-workflow.md
selected items/source
complete current project-local owners
relevant templates and formation owner.
```

### Current Reality / Workflow / Branch / Prototype Planning

```text
application-planning/README.md
application-planning/application-planning-responsibility-map.md
application-planning/application-planning-principles-and-terminology.md
application-planning/application-planning-drafting-workflow.md
relevant recommended template
project-local artifact.
```

### Optional Scenario / Domain / Slice Planning

```text
application-planning/README.md
application-planning/application-planning-principles-and-terminology.md
profiles/scenario-domain-slice-docs-profile.md
profiles/scenario-domain-slice-use-case-field-kit.md when setup is needed
current project-local owner.
```

Use this route only after the specialized profile is selected.

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
relevant templates.
```

## 6. Semantic Registry Owners

```text
direction-and-use-case-registry-workflow.md
DIRECTION-REGISTRY-TEMPLATE.md
USE-CASE-REGISTRY-TEMPLATE.md

application-planning/direction-registry.md
application-planning/use-case-registry.md
```

Concrete root/local registries remain project-specific owners.

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
- Do not create concrete product drafts in the reusable family.
- Do not split one methodology concept between competing
  principles and terminology owners when one cohesive owner is clearer.
```
