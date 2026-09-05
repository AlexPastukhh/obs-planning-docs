# Replacement Package App — Documentation Templates

Status: active recommended forms
Authority: [`documentation-use-cases.md`](documentation-use-cases.md)

## Template rule

These forms are **recommended examples, not schemas**. Choose the smallest representation that preserves selected meaning. Use, omit, combine, reorder or reshape sections when another form is clearer; do not copy headings mechanically or write `N/A` merely to satisfy a template. The semantic authority/boundary questions still need answers where they are material.

Target semantic types are `Feature`, `Behavior Requirement`, `Scenario Requirement`, Production Requirement and Proof Requirement. Existing product owners may still use legacy `FI-*`, `BI-*`, `DI-*`, `SI-*` and `TST-*` labels until separately migrated; templates do not require bulk renaming.

---

## Template — Feature planning

A Feature is the primary behavioral authority for its use-case boundary. Prefer an independently referenceable Feature owner/section; physical co-location with another document is acceptable only when Feature authority remains unambiguous and separate maintenance pressure does not justify another file.

```markdown
### F-RPKG-<SEMANTIC-NAME> — <readable Feature name>

Intent:
<one application/user intent>

Application Benefit / contribution:
<why this Feature matters>

Principal Result / Result family:
<meaningful application/user result>

Behavior:
<context / input>
→ <ordered application-visible step>
→ <meaningful semantic state/effect>
→ <branch / validation / retry / recovery when material>
→ <principal Result / resulting state>

Behavior may name semantically relevant ecosystem concepts (branch, Issue, package, commit, PR, persisted work identity, external result) when they are part of what the application must establish; keep exact classes/methods/private code paths downstream.

#### Behavior Requirements

##### BR-RPKG-<SEMANTIC-NAME> — <readable requirement>
Requirement:
<rule / invariant / algorithm / protocol / state-machine fragment / contract>

Reason:
<why it must hold, when useful>

#### Feature Data
- `<semantic concept>` — <meaning / role>

#### Feature Implementation Concerns
- Feasibility: ...
- Candidate / rejected approaches: ...
- Implementation dependencies: ...
- Platform / external constraints: ...
- Partial-state / recovery concern: ...
- Aggregate / Shared signals: ...
- Proof concern: ...
- Slice boundary observation: ...
- Known Evolution / Evolution Kind / Forced Migration pressure: ...

Free form is preferred when a list/table would distort the reasoning.

#### Feature / Slice Boundary Check

1. Intent / principal Result:
   <same vs distinct intent/result evidence>
2. Semantic entry:
   <new semantic invocation vs transport/adapter>
3. Realization cohesion / shared structure:
   <shared path, module/branch/adapter vs separate path>
4. Development / proof / evolution fitness:
   <change locality, proof locality, known Evolution Steps>

Boundary hypothesis:
<one existing/new Feature ↔ one Slice; module/branch/adapter; or unresolved>
```

A compact Feature may need only intent, Result, short behavior and one implementation/boundary note.

---

## Template — Scenario / real user journey

Use as much of this form as the journey needs. A compact process/table is often enough; use step sections when visible behavior, Result/continuity or Screen context needs explanation.

```markdown
# SCN-RPKG-<SEMANTIC-NAME> — <readable Scenario name>

Status: <current | planned target | migration>

## Need / Application Benefit
<what user/application need this journey satisfies>

## Starting context
<where the journey begins>

## Journey

### Step — <readable journey step>

Feature:
`F-RPKG-<FEATURE-A>`

Input / starting context:
<what enters this Feature from the journey>

Expected / visible behavior:
<only the Feature behavior needed to understand this Scenario step; do not copy Feature internals>

Resulting state / Result:
<what becomes true after this Feature; not limited to an outbound payload>

Continuity to next step:
<identity / Data / context relied on later>

Screen / external context:
<where the step happens>

Scenario-specific conditions:
<cross-Feature / cross-Screen / cross-context meaning only>

### Step — <next Feature or external-context step>
...

Branches / retry / re-entry:
- <journey-level branch only when useful>

## Scenario Requirements

### SR-RPKG-<SEMANTIC-NAME> — <readable cross-Feature requirement>
Requirement:
<cross-Feature / cross-Screen / context-continuity rule>

Reason:
<why journey correctness needs it>

## Terminal Result / Benefit closure
<why the composed Features satisfy the intended Benefit>

## E2E Proof Intent
<what must be proven end-to-end; exact tests remain downstream proof>

## Relevant Evolution Steps
- `EVO-RPKG-...`
```

Feature owners remain authoritative for detailed Feature behavior. Scenario may intentionally repeat a Feature Result or summarize visible behavior because Result/visible effect is the Feature's semantic interface with the journey; it should not reproduce the internal path that produces that Result.

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

## Template — Aggregate / Domain owner

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

---

## Template — Slice owner

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
