# Replacement Package App — Documentation Templates

Status: active recommended forms
Authority: [`documentation-use-cases.md`](documentation-use-cases.md)

## Template rule

These forms are **recommended examples, not schemas**. Choose the smallest representation that preserves selected meaning. Use, omit, combine, reorder or reshape sections when another form is clearer; do not copy headings mechanically or write `N/A` merely to satisfy a template. The semantic authority/boundary questions still need answers where they are material.

Target semantic types are `Feature`, `Behavior Requirement`, `Scenario Requirement`, Production Requirement and Proof Requirement. Existing product owners may still use legacy `FI-*`, `BI-*`, `DI-*`, `SI-*` and `TST-*` labels until separately migrated; templates do not require bulk renaming.

---

## Template — Feature planning

A Feature is the primary behavioral authority for its use-case boundary. Prefer an independently referenceable Feature owner/section. Keep normative `BR-*` text here; downstream planning references IDs only.

Use the smallest form that preserves meaning. A compact target shape is:

```markdown
# F-RPKG-<SEMANTIC-NAME> — <readable Feature name>

## Intent

<one application/user intent>

## Principal Result

<one meaningful Result / Result family>

## Expected application behavior

### Data

| Kind | Data |
|---|---|
| Input | <semantic input/state> |
| Result | <semantic result identity/state> |

### Main path

| Behavior step | Requirement(s) |
|---|---|
| **1. <semantic behavior step>.** | `BR-RPKG-...` — `<compact normative statement>` |
| **2. <semantic behavior step>.** | `BR-RPKG-...`, `BR-RPKG-...` — `<compact normative statements>` |

Decision after Step 2: **<one exact question>?**

| Path A | Path B | Path C |
|---|---|---|
| <action A1> | <action B1> | <action C1> |
| <action A2> | <action B2> | <action C2> |
| → Step 3 | → Step 3 | Stop |

### Main path — continued

| Behavior step | Requirement(s) |
|---|---|
| **3. <common semantic behavior>.** | `BR-RPKG-...` — `<compact normative statement>` |

## Feature Implementation Concerns

<only material feasibility / dependency / recovery / proof / Domain / Shared /
Evolution / Feature-Slice boundary reasoning>

## Feature / Slice Boundary Decision

Intent / Principal Result:
<evidence>

Semantic Entry:
<semantic invocation vs transport/adapter>

Realization Cohesion / Shared Structure:
<shared path vs localized variation>

Development / Proof / Evolution Fitness:
<change locality, proof locality, known Evolution Steps>

Boundary hypothesis:
<one Feature ↔ one Slice | module/branch/entry adapter | separate Feature | OPEN>
```

Rules:

- one Main-path row = one semantic behavior step;
- the second column may contain one or several stable `BR-*`;
- keep each canonical normative Requirement statement beside the behavior it constrains;
- Data stays compactly inside `Expected application behavior`; do not create a detached Data catalog by default;
- if order itself is required, state that order normatively;
- one exact branch decision/question owns one column per path; paths may span several rows and explicitly converge;
- do not create persistent `Behavior Step`, `BS-*`, branch Item or requirement-group ontology merely for discovery;
- actor/user/AI wording or choice belongs in Scenario when the application simply consumes it;
- exact classes/methods remain downstream.

---

## Template — Scenario / real user journey

Use only the fields that carry journey meaning. `Actor` and `Actor interaction / decision` are optional/recommended when actor identity or choice affects input, authority, interpretation or continuity.

```markdown
# SCN-RPKG-<SEMANTIC-NAME> — <readable Scenario name>

Status: <current | planned target | migration>

## Need / Application Benefit

<what useful result this journey closes>

## Starting context

<where the journey starts>

## Main journey

| Journey step | Actor / interaction | Feature / visible behavior | Result / continuity | Requirement(s) |
|---|---|---|---|---|
| **1. <journey step>** | <human / ChatGPT / application / external system + material choice> | `F-RPKG-...` — <only visible behavior needed for composition> | <Feature Result + exact continuity> | `SR-RPKG-...` when genuinely cross-Feature |
| **2. <journey step>** | <decision/interpretation if material> | `F-RPKG-...` | <Result / continuity> | — |

Decision after Step 2: **<one exact journey question>?**

| Path A | Path B | Path C |
|---|---|---|
| <actor/Feature action A1> | <actor/Feature action B1> | <actor/Feature action C1> |
| <action A2> | <action B2> | <action C2> |
| → Step 3 | → Step 3 | Stop |

### Main journey — continued

| Journey step | Actor / interaction | Feature / visible behavior | Result / continuity | Requirement(s) |
|---|---|---|---|---|
| **3. <common journey step>** | ... | `F-RPKG-...` | ... | `SR-RPKG-...` if needed |

## Terminal Result / Benefit closure

<why the composed Features satisfy the intended Benefit>

## E2E Proof Intent

<what journey truth must be proven end to end>

## Relevant Evolution Steps

- `EVO-RPKG-...`
```

Boundary reminder:

```text
Scenario / actor
= why and what the user/AI decides to pass/use/interpret

Feature
= what the application does with already-supplied input
```

Feature owners remain authoritative for Feature-local Data, branches, recovery and `BR-*`. Scenario may repeat a Feature Result or summarize visible behavior only to make composition/continuity understandable.

---

## Template — Slice Discovery + non-persistent Slice Planning

This is a **working implementation-planning artifact**, not a durable Slice owner.

````markdown
# <Feature> — Slice Discovery + Non-Persistent Slice Planning

Status: working implementation plan
Persistence: non-persistent by default
Semantic authority: Feature / Scenario owners

## Whole-Slice candidate class map

| Kind | Candidate class | Role |
|---|---|---|
| UI / entry | ... | ... |
| Application service | ... | ... |
| Feature-local | ... | ... |
| Domain | ... | ... |
| Repository / persistence | ... | ... |
| Shared | ... | ... |
| Cross-cutting | ... | ... |
| Presentation | ... | ... |

## Application-service entry

```text
SemanticFeatureService.semanticOperation(
    <typed semantic arguments>
) -> <typed Feature Result>
```

## Step-by-step realization

| Feature Step / BR | Candidate realization calls | Layer / responsibility |
|---|---|---|
| **Step 1** — `BR-...` | `Entry.read()` → `Service.semanticOperation(...)` → ... | ... |
| **Step 2** — `BR-...`, `BR-...` | ... | ... |

## Feature integration tests

```text
test("<expected Feature behavior/result>") {
    // Arrange
    <real application service + real Domain where practical>
    <fake/in-memory expensive external boundaries>

    // Act
    let result = service.semanticOperation(...)

    // Assert — Feature Result
    ...

    // Assert — exact external effect
    ...

    // Assert — forbidden effect / continuity / recovery
    ...
}
```

## Future / Evolution planning

Canonical Evolution: `EVO-...` when selected.

- `FUTURE FEATURE` / `FUTURE EXTENSION`: ...
- `BLOCKED BY OPEN PRODUCT DETAIL`: <what concrete method/test must not be invented>
````

Rules:

- map the Feature end to end, including UI/entry, simple application service, Domain, persistence, Shared, cross-cutting and presentation where material;
- show concrete candidate calls by Feature Step;
- no `CommandBus`, dispatcher or generic `execute(command)` requirement;
- Domain calls may appear, but Domain unit tests do not;
- integration tests exercise the whole meaningful Feature path through the application-service boundary;
- test names describe expected behavior/result, not internal methods;
- after implementation/proof, delete the work-item planning artifact by default;
- if durable Slice/Shared/ADR/Production↔Proof documentation is useful later, create/update that separate owner.

---

## Template — Aggregate Planning (non-persistent)

This is a **working Domain-design artifact**, not the durable Aggregate owner.

````markdown
# <Domain class> — Aggregate Planning

Status: working Domain plan
Persistence: non-persistent by default
Authority: Feature `BR-*`
Scope: Domain classes only

Kind: <Aggregate Root | child Entity | Value Object | Domain Object>

## Responsibility

<semantic identity / state / lifecycle / consistency>

## High-level state / fields

```text
field: SemanticType
...
```

## Candidate semantic methods and local unit tests

### Method — `semanticMethod`

```text
semanticMethod(
    input: SemanticType
) -> ResultType
```

#### Unit tests for this method

```text
test("<expected Domain behavior/result>") {
    // Arrange
    ...

    // Act
    let result = domain.semanticMethod(...)

    // Assert
    ...
}
```

### Method — `anotherSemanticMethod`

```text
anotherSemanticMethod(...) -> ResultType
```

#### Unit tests for this method

```text
test("<expected Domain behavior/result>") {
    ...
}
```

## Future / Evolution planning

Canonical Evolution: `EVO-...` when selected.

- `FUTURE FEATURE` / `FUTURE EXTENSION`: ...
- `BLOCKED BY OPEN PRODUCT DETAIL`: <do not invent missing semantics>
````

Rules:

- start from exact Feature Step + attached `BR-*`;
- do not copy canonical Requirement text;
- keep UI/application-service/Git/GitHub/filesystem/browser mechanics out;
- put each literal Domain unit-test group immediately after the method it proves;
- invariant preservation belongs in exact assertions rather than a detached `Preserved invariants` section;
- test names describe expected Domain behavior/result, not class/method names;
- future planning may be equally deep only where semantic behavior is selected;
- after implementation/proof, delete the planning artifact by default;
- durable Domain/architecture/Production↔Proof documentation, when useful, is a separate owner.

---

## Template — behavioral / Screen design alternative

```markdown
### <candidate / variant name>

Status: candidate | selected | rejected

Behavior / journey / Screen change:
...

Strengths / problems / complexity / risks / questions:
- ...

Effect on Feature/Slice boundary:
- ...

Reason selected/rejected:
...
```

A design alternative is not a current runtime branch and is not automatically an Evolution Step.

---

## Template — Feature Implementation Concern

Use only for material implementation-aware uncertainty/decision memory.

```markdown
### Implementation Concern — <readable concern>

Behavior / Requirement affected:
<Feature / BR / SR reference>

Question / risk:
<what may make planned behavior/boundary difficult or invalid>

Known capability / constraints:
- ...

Candidate approaches:
- A — ...
- B — ...

Evidence / prototype:
- ...

Selected direction / current conclusion:
<if selected>

Implementation dependencies:
- ...

Boundary implications:
<Aggregate / Shared / Slice module/branch/new Feature signal>

Downstream attention:
<what later Requirements Discovery must inspect>
```

The concern is not automatically a Production Requirement.

---

## Template — Feature/Slice boundary decision note

```markdown
### Boundary decision — <candidate behavior>

Intent / Result:
<evidence>

Semantic entry:
<evidence>

Realization cohesion:
<evidence>

Development / proof / evolution fitness:
<change locality, testability, known Evolution Steps>

Decision:
<same Feature/Slice | extension module | branch | entry adapter | separate Feature/Slice>

Revalidation trigger:
<what later Evidence would justify reopening this decision>
```

These are signals, not a numeric score.

---

## Template — selected methodology exception

```markdown
### Selected exception — <name>

Preferred principle:
<what methodology normally favors>

Selected exception:
<what is intentionally different>

Reason:
<why the exception is worth it>

Boundaries preserved:
<what must not be reinterpreted because of this convenience>

Downstream consequences / proof obligations:
- ...
```

Example class: one convenience activation may compose two separate Features/Slices without merging their intents/results.

---

## Template — Evolution Step

Early/shallow form is valid:

```markdown
### EVO-RPKG-<SEMANTIC-NAME> — <readable qualitative change>

Application capability / journey / documentation-architecture change:
<what becomes possible or changes>

Evolution Kinds:
- <Introduction | Expansion | Refactoring | Forced Migration | Retirement>

Likely affected:
- Benefit: ...
- Feature(s): ...
- Scenario(s): ...

Known tension / open boundary question:
- ...
```

When enough detail is known, prefer complete target meaning:

```markdown
### EVO-RPKG-<SEMANTIC-NAME> — <readable qualitative change>

Evolution Kinds:
- <Introduction | Expansion | Refactoring | Forced Migration | Retirement>

Resulting usable application/documentation state:
<what is complete after this Step>

#### Target Feature: F-RPKG-...
Intent:
[UNCHANGED] ...

Result:
[UNCHANGED] ...

Behavior:
[EXISTING] ...
[CHANGED] ...
[NEW] ...
[REMOVED] ...

Slice outlook:
[UNCHANGED] ...
[NEW] module / branch / entry adapter / separate Slice ...

Migration:
<semantic/product/architecture/documentation migration work intrinsic to this Step, when any>

Forced Migration:
<only when this Evolution Kind is real>

#### Target Scenario
<include when cross-Feature / cross-Screen composition changes>

#### Owner impacts
- Aggregate: ...
- Shared: ...
- Screen: ...
- Proof: ...
```

Exact notation is flexible. Evolution Kinds are composable, not a single exclusive enum. `[EXISTING] / [NEW] / [CHANGED] / [REMOVED]` is target-state accounting, while Evolution Kinds describe the nature of the transition. The important rule is that a completed Step leaves a coherent usable application/documentation state and does not require the next Step merely for completeness. Migration is part of Evolution Step machinery rather than a competing roadmap.

---

<a id="template-evolution-impact"></a>
## Template — Evolution Impact

Use this owner-local form when one canonical Evolution Step materially changes an **existing** Aggregate, Slice, Shared Capability, Screen or proof owner. It is future delta, not a second current Requirement list and not a separate migration roadmap.

```markdown
## Evolution Impact

### EVO-RPKG-<SEMANTIC-NAME> — <readable Step>

Evolution Kinds for this owner:
- <Expansion | Refactoring | Forced Migration | Retirement>

[EXISTING] <meaning that remains>
[NEW] <new owner responsibility / module / branch / proof>
[CHANGED] <changed owner meaning>
[REMOVED] <meaning intentionally removed>

Forced Migration:
<what must move/replace because healthy additive evolution is not credible; only when real>

Requirement consequences:
<reference current/new Production or Proof Requirements when they are actually selected; do not duplicate them here>
```

A newly introduced Feature/owner is normally represented as `Introduction` directly in the canonical Step target rather than through a fictitious impact on something that did not exist. When enough detail is known, prefer showing the complete target owner state rather than only an isolated delta.

---

## Template — Evolution Steps Map entry

```markdown
### EVO-RPKG-<SEMANTIC-NAME> — <readable Step>

Rough horizon / likelihood:
...

Depends on:
- ...

Enables:
- ...

Readiness / blocking evidence:
- ...

Canonical Step owner:
<Feature/Scenario/evolution owner link>
```

The map records rough planning relationships; it does not redefine the Step's qualitative behavior.

---

## Template — durable Aggregate / Domain owner

```markdown
# <Aggregate / Domain Object>

## Responsibility / Meaning
<semantic identity/state/lifecycle/invariant responsibility>

## Behavior / Data served
- Feature / Behavior Requirement references
- Feature Data concepts

## Semantic model
Identity:
...

State / lifecycle:
...

Invariants / consistency boundary:
...

Semantic operations / rules:
...

## Relevant upstream Implementation Concerns
- ...

## Production Requirements
### PRD-RPKG-... — <readable requirement>
Requirement:
...

Reason:
...

## Proof Requirements
### PFR-RPKG-... — <readable proof requirement>
Requirement:
...

## Evolution Impact
### EVO-RPKG-...
[EXISTING] ...
[NEW/CHANGED/REMOVED] ...
```

Do not force one Aggregate per Feature/Requirement.

This durable owner is distinct from the non-persistent Aggregate Planning artifact above. Create/maintain it only when durable Domain meaning/requirements need an independent owner.

---

## Template — durable Slice owner

```markdown
# SL-RPKG-<SEMANTIC-NAME> — <readable Slice name>

## Feature realized
`F-RPKG-...`

Intent / principal Result:
...

## End-to-end responsibility
<semantic entry → application/domain/infrastructure path → meaningful Result>

## Modules / Branches / Entry Adapters
- [EXISTING] ...
- [NEW] ...

## Domain / Shared owners used
- ...

## Relevant Feature Implementation Concerns / dependencies
- ...

## Boundary recheck
Intent / Result: ...
Semantic entry: ...
Realization cohesion: ...
Development / proof / evolution fitness: ...
Decision: ...

## Production Requirements
### PRD-RPKG-...
Requirement:
...

## Proof Requirements
### PFR-RPKG-...
Requirement:
...

## Evolution Impact
### EVO-RPKG-...
...
```

A Slice may depend on Aggregate/Shared/external owners. Judge isolation by change locality, not dependency absence.

This durable owner is distinct from non-persistent Slice Discovery/Planning. Do not keep a working Slice plan merely to satisfy this template.

---

## Template — Shared Implementation Capability

```markdown
# <semantic Shared Capability name>

## Responsibility
<reusable non-end-to-end implementation meaning>

## Consumers
- `SL-RPKG-...`

## Contract / boundary
<input/output/result/failure semantics>

## Production Requirements
- ...

## Proof Requirements
- ...

## Evolution Impact
- ...
```

---

## Template — owner-local Requirements Discovery note

Use headings only when the reasoning is material.

```markdown
## Requirements Discovery

### Correct Realization
<what production must satisfy>

### Correct Proof
<what convincingly proves it>

### Maintainability / Local Reasoning
<cohesion, semantic contracts, local changeability>

### Proof Maintainability / Local Reasoning
<readability, diagnostics, low incidental coupling>

### Evolution Fitness
<known Evolution Steps and current production implications>

### Proof Evolution Fitness
<how proof stays valid or must evolve>
```

The six headings are not mandatory form fields. Group-level questions are the authority; use a smaller form when enough.

---

## Template — Screen owner

```markdown
# Replacement Package App — Screens

## Screen Map
<durable Screen/window topology>

## Scenario × Screen
| Scenario | Screen/context | Role |
|---|---|---|

## Feature × Screen
| Feature | Screen/context | Interaction role |
|---|---|---|

## <Screen readable name>
Responsibility:
...

Screen-owned behavior / UI constraints:
- ...

## Evolution Impact
- ...
```

Screen is spatial/window authority, not a frontend Slice.

---

## Template — Test Strategy / Proof allocation

```markdown
# Replacement Package App — Test Strategy

## Cross-owner proof decisions
<only decisions genuinely shared across owners>

## Proof allocation
| Behavior / Requirement | Owner | Proof layer | Evidence |
|---|---|---|---|

## Shared Test Capabilities
- ...
```

Local tests normally stay with their owning Slice/Aggregate/Shared implementation.

---

## Template — Practical Acceptance plan and Evidence

```markdown
## Acceptance Plan
Environment / build identity:
...

Procedure:
1. ...

Expected observable result:
...

## Executed Evidence
Executed at:
...

Exact build/source identity:
...

Observed result:
...

Status:
PASS | FAIL | INCONCLUSIVE
```

Planned acceptance is not Evidence until executed.

---

## Recommended generated implementation-trace output

Generated traces are derived/disposable navigation, never semantic authority.

```text
Feature / Requirement
→ Slice / Aggregate / Shared owner
→ source symbols/files
→ test/proof symbols/files
→ last verified source identity
```
