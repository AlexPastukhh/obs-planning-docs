# Documentation Layer Examples Index

Status: active reusable examples index
Doc version: v0.2.0-obs-cleanup
Scope: navigation for reusable examples and project-specific demonstration examples.

## 1. Rule

Examples demonstrate behavior. They do not own command semantics, workflows, routes, templates or permission boundaries.

Owner docs live in:

```text
planning/documentation/*-workflow.md
planning/documentation/*-template.md
planning/planning-use-case-map.md
planning/areas/*
```

## 2. Generic Examples

Generic examples may be used as demonstrations only:

```text
planning/documentation/examples/STATUS-RECONCILIATION-SCENARIO-PROJECT-EXAMPLE.md
planning/documentation/examples/SHARED-VISIBILITY-SCENARIO-PROJECT-EXAMPLE.md
planning/documentation/examples/SOURCE-USAGE-CASCADE-GENERIC-EXAMPLE.md
```

## 3. Project-Specific Examples

Project-specific examples, if present, are reference examples only:

```text
planning/documentation/examples/project-specific/
```

Do not copy their routes/state as active configuration for another project.

## 4. Do Not

```text
- Do not use examples as rule owners.
- Do not keep stale example references in the root UCM.
- Do not require absent project-specific files just because an example mentions them.
```
