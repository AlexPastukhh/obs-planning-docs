# Planning Docs Architecture Principles

Status: active reusable architecture principles
Doc version: v0.4.0-command-registry-formation-boundaries
Scope: stable reusable invariants for projects that use `planning/documentation/` as a portable process layer.

## 1. Layer Boundary

```text
planning/documentation/
  = reusable process layer;

planning/README.md
  = project planning entry/orientation;

planning/planning-use-case-map.md
  = concrete project command route map/UCM;

future project Direction/Use-Case registries
  = semantic navigation and owner routes;

planning/areas/
  = project-specific applications and state.
```

Reusable docs do not own concrete project state, schedules, implementation status or accepted command routes.

## 2. Source-Of-Truth Rules

```text
- One project root UCM owns command routing/canonical English names.
- Semantic registries, when present, own Direction/Use-Case entries.
- Workflow files own repeated process.
- Terminology files own conceptual distinctions.
- Principles own stable invariants.
- Templates own recommended exact shape.
- Field kits own bootstrap/setup only.
- Area docs own concrete project-local application state.
- Examples demonstrate; they do not own rules.
- Tampermonkey projects accepted owners; it owns neither commands nor registries.
```

## 3. Planning Item Owner Boundary

```text
planning-item-formation-workflow.md
  → selected source to reviewed/accepted Planning Items;

application-planning-drafting-workflow.md
  → Planning Draft/Full Picture, Complete Picture integrity,
    reconciliation, concerns, branches and evidence revision;

project-local register/area
  → concrete accepted items, sources and current state.
```

Do not duplicate item formation in the drafting workflow.

One semantic Planning Item may move through portable, managed and documented states.

A confirmed application-native Planning Item is a managed Reference Object immediately.

## 4. Bootstrap vs Runtime

Bootstrap:

```text
PORTABLE-STARTER-KIT.md
field-kits/*
```

Runtime:

```text
planning/README.md
planning/planning-use-case-map.md
planning/workflow-activation-map.md
planning/root-source-sync-register.md
planning/areas/*
relevant planning/documentation owners
```

Field kits stop being routers after runtime files exist.

## 5. No Silent Promotion

```text
raw source
  ≠ accepted Planning Item;

proposed item meaning
  ≠ separate Candidate entity
  ≠ accepted item;

AI assumption
  ≠ user decision;

example
  ≠ authority;

local mapping
  ≠ reusable principle;

full-message source
  ≠ normalized item body;

view/projection
  ≠ canonical state.
```

## 6. Command vs Semantic Registry Authority

Concrete command behavior:

```text
1. project root UCM;
2. linked owner workflow/template/area docs;
3. examples only as demonstrations;
4. Tampermonkey projection after the route exists.
```

Direction/use-case context:

```text
1. semantic registry entry;
2. linked owner route;
3. UCM only when an executable command is related;
4. Tampermonkey projection after registries exist.
```

Do not make the UCM the semantic owner merely because the historic file name contains “use-case map”.

## 7. Portable Copy Rule

When copied to another project:

- keep reusable docs under `planning/documentation/`;
- create fresh project root files;
- do not copy another project's local state as active configuration;
- keep portable Planning Item review available;
- adapt command profiles only to accepted routes;
- create semantic registries only when the target project adopts them.

## 8. Progressive Ownership

Create a separate owner only when independent responsibility, lifecycle, repeated use or review justifies it.

Do not create one file per item, question, field or UI surface.

Parent summaries route to child owners; they do not duplicate full bodies.

## 9. Do Not

```text
- Do not create a second generic UCM inside documentation/.
- Do not put project-specific state into reusable docs.
- Do not make helper scripts authority.
- Do not conflate command routes with semantic registries.
- Do not create Source Idea or a Planning Item Candidate entity.
- Do not remove portable review because managed mode exists.
- Do not choose project storage/wrapper architecture here.
- Do not rely on absent project support files as if present.
```
