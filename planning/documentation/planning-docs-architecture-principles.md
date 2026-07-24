# Planning Docs Architecture Principles

Status: active reusable architecture principles
Doc version: v1.0.0-unified-concept-owner
Scope: stable reusable boundaries for projects that use `planning/documentation/` as a portable process layer.

## 1. Layer Boundary

```text
planning/documentation/
  = reusable process layer;

planning/README.md
  = project planning entry and orientation;

planning/planning-use-case-map.md
  = concrete project command route map / UCM;

project Direction/Use-Case registries
  = semantic navigation and owner routes;

planning/areas/
  = project-specific plans, applications and state.
```

Reusable docs do not own concrete project state, schedules, implementation status, project commands or accepted product architecture.

## 2. Source-Of-Truth Rules

```text
- One project root UCM owns command routing
  and canonical English names.
- Semantic registries own Direction and Use-Case entries.
- Workflow files own repeated process.
- Principles/terminology owners own reusable concept contracts.
- A cohesive methodology may combine definitions and stable principles
  in one owner when separation would duplicate or fragment meaning.
- Templates own recommended exact shape.
- Profiles own optional specialized approaches.
- Field kits own bootstrap/setup only.
- Area docs own concrete project-local state.
- Examples demonstrate; they do not own rules.
- Tampermonkey projects accepted owners;
  it owns neither commands nor registries.
```

Do not maintain two active owners for the same definition/principle contract merely to preserve a terminology/principles file split.

## 3. Planning Item Owner Boundary

```text
application-planning/planning-item-formation-workflow.md
  → selected source to reviewed Planning Items;

application-planning/application-planning-drafting-workflow.md
  → Planning Draft, workflow integrity, reconciliation,
    questions, risks, alternatives and evidence revision;

project-local register/area
  → concrete accepted items, sources and current state.
```

Do not duplicate Planning Item formation in the drafting workflow.

A reviewed Planning Item remains a semantic planning meaning. Reusable methodology does not require it to become a managed application object.

Repository placement, import, storage or application integration are separate project-local decisions.

## 4. Portable Baseline

The reusable planning baseline is:

```text
readable Markdown or equivalent reviewable content;
complete source context;
explicit review;
traceable Planning Items;
separate authorization for repository updates.
```

Reusable methodology must not claim an application-native runtime, managed-object creation, database, storage model or automatic dependency mechanism unless that behavior has an explicit implemented owner.

## 5. Optional Specialized Profiles

A profile may define a more specialized representation, such as Scenario/Domain/Slice planning.

Rules:

```text
- selecting a profile is explicit;
- a profile does not become a universal planning stage;
- not selecting the profile does not make a sufficient Planning Draft incomplete;
- simple and non-application work may remain in the Planning Draft;
- project-specific profile application remains project-local.
```

## 6. Bootstrap Vs Runtime

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
relevant planning/documentation owners.
```

Field kits stop being routers after runtime files exist.

## 7. No Silent Promotion

```text
raw source
  ≠ accepted Planning Item;

proposed item meaning
  ≠ separate Candidate entity
  ≠ accepted item;

AI assumption
  ≠ user decision;

implementation idea
  ≠ architecture;

risk
  ≠ evidence of failure;

example
  ≠ authority;

local mapping
  ≠ reusable principle;

full-message source
  ≠ normalized item body;

view or projection
  ≠ canonical state;

profile
  ≠ mandatory project route.
```

## 8. Progressive Complexity

Use the smallest owner and representation that preserve the required meaning.

```text
semantic core
  → compact representation
  → local expansion
  → separate artifact or specialized profile when justified.
```

Do not create files, folders, schemas, object types or planning stages in advance.

## 9. Command Vs Semantic Registry Authority

Concrete command behavior:

```text
1. project root UCM;
2. linked owner workflow/template/area docs;
3. examples only as demonstrations;
4. Tampermonkey projection after the route exists.
```

Semantic registries provide identities and routes. Activating a registry entry does not grant command or repository permissions.

## 10. Update Safety

Broad reusable changes require:

```text
documentation architecture preflight;
owner classification;
file-update plan;
complete replacement files when packaged;
exact local base verification;
diff review before commit or push.
```

A planned update or replacement archive does not authorize commit or push.
