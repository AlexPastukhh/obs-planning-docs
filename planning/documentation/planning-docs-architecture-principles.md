# Planning Docs Architecture Principles

Status: active reusable architecture principles
Doc version: v1.1.0-delegated-command-registry
Scope: stable reusable boundaries for projects that use `planning/documentation/` as a portable process layer.

## 1. Layer Boundary

```text
planning/documentation/
  = reusable process layer;

planning/README.md
  = project planning entry and orientation;

planning/planning-use-case-map.md
  = mandatory project command-system entry / root UCM;

optional project command registry such as planning/commands/
  = delegated direct concrete command definitions;

project Direction/Use-Case registries
  = semantic navigation and owner routes;

planning/areas/
  = project-specific plans, applications and state.
```

Reusable docs do not own concrete project state, schedules, implementation status, project commands or accepted product architecture.

## 2. Source-Of-Truth Rules

```text
- One project root command-routing system owns commands.
  The root UCM owns mandatory entry/global routing policy.
  When a delegated command registry exists, each direct command file
  owns its concrete route and canonical English name.
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

## 3. Idea And Current-Owner Boundary

```text
idea-planning-principles-and-terminology.md
  → shared Idea / Idea Variant / review-depth semantics;

idea-review-and-planning-workflow.md
  → selected source to reviewed Ideas when answer-seeking work is material;

application-planning/application-planning-drafting-workflow.md
  → Planning Draft, workflow integrity, questions, risks, alternatives and evidence revision;

project-local owner/area
  → accepted current project meaning and state.
```

Do not create a universal intermediate semantic atom between source material and real planning owners. An Idea is answer-seeking work, not a replacement for facts, constraints, decisions, Scenarios, workflow steps or other owners.

Historical Planning Item registers may remain as provenance/migration sources, but reusable target methodology does not route new work through them.

Repository placement, import, storage or application integration remain separate project-local decisions.

## 4. Portable Baseline

The reusable planning baseline is:

```text
readable Markdown or equivalent reviewable content;
complete source context;
explicit review;
traceable Ideas/current conclusions when answer-seeking work is material;
direct routing to real current owners;
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
  ≠ accepted Idea or current decision;

proposed Idea
  ≠ separate Candidate entity
  ≠ accepted current meaning;

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
  ≠ normalized Idea/current-owner meaning;

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
1. project root UCM for command-system entry/global policy;
2. selected delegated command definition when the project uses a command registry;
3. linked owner workflow/template/area docs;
4. examples only as demonstrations;
5. Tampermonkey projection after the route exists.
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
