# Planning Docs Architecture Principles

Status: active reusable architecture principles
Doc version: v0.3.0-obs-cleanup
Scope: stable reusable invariants for projects that use `planning/documentation/` as a portable process layer.

## 1. Layer Boundary

```text
planning/documentation/ = reusable process layer
planning/README.md = project planning entry point
planning/planning-use-case-map.md = project command/use-case router
planning/areas/ = project-specific applications of reusable workflows
```

Reusable docs must not own concrete project state, local schedules, conspect progress, implementation status or accepted command routing after project root files exist.

## 2. Source Of Truth Rules

```text
- A concrete project has one root use-case map for command routing.
- Workflow files own repeated process.
- Templates own exact shape.
- Field kits own bootstrap/setup guidance only.
- Area docs own local application details.
- Examples demonstrate behavior; they do not own rules.
- Tampermonkey helper files are projection only; they do not own command semantics.
```

## 3. Bootstrap vs Runtime

Bootstrap mode exists only while creating project-root planning files.

```text
Bootstrap sources:
  planning/documentation/PORTABLE-STARTER-KIT.md
  planning/documentation/field-kits/*

Runtime sources:
  planning/README.md
  planning/planning-use-case-map.md
  planning/workflow-activation-map.md
  planning/root-source-sync-register.md
  planning/areas/*
  relevant planning/documentation owner workflows/templates
```

After runtime files exist, field kits are no longer routers.

## 4. No Silent Promotion

```text
Raw ideas do not become plan core automatically.
AI assumptions do not become user input.
Examples do not become authority.
Local project mappings do not become reusable principles.
```

## 5. Command Authority

Concrete command behavior must be derived in this order:

```text
1. project root UCM route;
2. linked owner workflow/template/area docs;
3. examples only as demonstrations;
4. Tampermonkey projection only after the command route exists.
```

## 6. Portable Copy Rule

When this layer is copied to another project:

```text
- keep reusable docs under planning/documentation/;
- create fresh project root files;
- keep project-specific examples clearly demonstration-only;
- do not copy another project's local state as active configuration;
- adapt Tampermonkey COMMANDS to accepted routes only.
```

## 7. Do Not

```text
- Do not create a second generic use-case map inside documentation/.
- Do not put project-specific state into reusable docs.
- Do not make helper scripts command authority.
- Do not create aggregate sync before at least one parallel workspace is a sync-candidate.
- Do not rely on absent project-specific support files; either create them or route around them.
```
