# Replacement Package App — Documentation Templates

Status: active recommended forms
Process authority: [`documentation-use-cases.md`](documentation-use-cases.md) + the relevant Documentation Use Case group/owner

## Template rule

These forms are preferred ready-made models, not schemas and not product Requirements.

```text
relevant form
→ consult/evaluate
→ use by default when it fits
→ omit/combine/reshape when a clearer context-specific form is justified
```

Do not copy headings mechanically or manufacture `N/A`.

Target semantic types include `Feature`, `Behavior Requirement`, `Scenario Requirement`, `Implementation Requirement` and optional `Proof Requirement (PFR)`. Existing product owners may keep legacy `FI-*`, `BI-*`, `DI-*`, `SI-*`, `PRD-*` and `TST-*` labels until separately migrated.

## Template — Feature planning

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
| **1. <semantic behavior step>.** | `BR-RPKG-...` — <compact normative statement> |
| **2. <semantic behavior step>.** | `BR-RPKG-...` — <compact normative statement> |

Decision after Step 2: **<one exact question>?**

| Path A | Path B |
|---|---|
| <action A1> | <action B1> |
| → Step 3 | Stop |

## Feature Implementation Concerns
<only material feasibility/dependency/recovery/proof/Domain/Shared/Evolution/boundary reasoning>

## Feature / Slice Boundary Decision
<reference the reusable Vertical Slice method; record only material evidence + selected hypothesis>
```

## Template — Scenario / real user journey

```markdown
# SCN-RPKG-<SEMANTIC-NAME> — <readable Scenario name>

Status: <current | planned target | migration>

## Need / Application Benefit
...

## Starting context
...

## Main journey
| Journey step | Actor / interaction | Feature / visible behavior | Result / continuity | Requirement(s) |
|---|---|---|---|---|
| **1. ...** | ... | `F-RPKG-...` | ... | `SR-RPKG-...` when genuinely cross-Feature |

## Terminal Result / Benefit closure
...

## E2E Proof Intent
...

## Relevant Evolution Steps
- `EVO-RPKG-...`
```

## Template — Screen owner

```markdown
# Replacement Package App — Screens

## Screen Map
...

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

## Template — Feature Implementation Concern

```markdown
### Implementation Concern — <readable concern>

Behavior / Requirement affected:
...

Question / risk:
...

Known capability / constraints:
- ...

Candidate approaches:
- A — ...
- B — ...

Evidence / prototype:
- ...

Selected direction / current conclusion:
...

Boundary / durable-Requirement implications:
...

Downstream attention:
...
```

A concern is not automatically an Implementation Requirement.

## Template — Feature/Slice boundary decision note

```markdown
### Boundary decision — <candidate behavior>

Reusable guidance:
`methodology-guidance/reusable-vertical-slice-discovery.md`

Material evidence:
- Intent / Result: ...
- Semantic entry: ...
- Realization cohesion: ...
- Development / proof / evolution fitness: ...

Decision:
<same Feature/Slice | module | branch | entry adapter | separate Feature/Slice>

Revalidation trigger:
...
```

The full question library is owned by the reusable Vertical Slice guide.

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

## Template — selected methodology exception

```markdown
### Selected exception — <name>

Recommended / default model:
...

Selected alternative:
...

Why it is better in this context:
...

Decision priorities:
1. ...
2. ...

Complexity delta / trade-off:
...

Semantic / owner boundaries preserved:
...

Proof / Evolution consequences:
- ...
```

The form records why a materially different solution is better here; it does not turn the recommended model into a Requirement.

## Template — durable Slice owner

```markdown
# SL-RPKG-<SEMANTIC-NAME> — <readable Slice name>

## Responsibility
<end-to-end implementation responsibility>

## Feature realized
`F-RPKG-...`

Relevant Behavior Requirements:
- `BR-...` (reference only; do not copy canonical prose)

## Domain owners used
- ...

## Shared Capability owners used
- ...

## Relevant discovery / decisions
<only durable/useful references; do not preserve a working plan by default>

## Implementation Requirements
### IR-SLICE-<OWNER>-<REQUIREMENT>
Requirement:
...

Reason:
...

Optional durable Decision / Question / Risk / Known Problem:
...

## Proof Requirements
### PFR-<OWNER>-<REQUIREMENT>
Requirement:
...
<omit this section when no durable non-obvious proof-realization constraint exists>

## Evolution Impact
...
```

## Template — durable Domain owner

```markdown
# <Domain owner>

## Responsibility / Meaning
...

## Semantic Model
Identity:
...

State / lifecycle:
...

Invariants / consistency boundary:
...

Semantic operations / rules:
...

## Behavior Requirements realized
- `BR-...`

## Relevant reusable guidance / durable decisions
<optional provenance / rationale only when useful>

Optional durable Question / Risk / Known Problem:
...

## Implementation Requirements
### IR-DOMAIN-<OWNER>-<REQUIREMENT>
Requirement:
...

## Proof Requirements
### PFR-<OWNER>-<REQUIREMENT>
Requirement:
...
<omit when not needed>

## Evolution Impact
...
```

Do not require a specific Java/package topology. The recommended generalized owner-centered model lives in `methodology-guidance/reusable-ddd-domain-discovery.md`.

## Template — Shared Implementation Capability

```markdown
# <semantic Shared Capability name>

## Responsibility
...

## Consumers
- `SL-RPKG-...`

## Contract / boundary
...

## Implementation Requirements
### IR-SHARED-<OWNER>-<REQUIREMENT>
...

Optional durable Decision / Question / Risk / Known Problem:
...

## Proof Requirements
### PFR-<OWNER>-<REQUIREMENT>
...
<omit when not needed>

## Evolution Impact
...
```

## Template — owner-local Requirements Discovery note

Use only material headings. This is a decision-centered recommended form, not a six-section questionnaire.

```markdown
## Requirements Discovery

Material problem:
...

Source / affected current authority:
...

Question:
...

Relevant reusable guidance:
...

Candidate(s):
- ...

Behavioral Necessity / Relevance:
<which behavior/invariant/proof risk requires this; what breaks without it; ownership/complexity check>

Selected decision:
<selected direction | OPEN>

Selected Implementation Requirements:
- `IR-...` only when durable + selected

Selected Proof Requirements:
- `PFR-...` only for a durable non-obvious proof-realization constraint

Risk / Known Problem / Trade-off:
- ...

Open questions:
- ...

Evolution consequence:
...

No durable Requirement:
<state when the selected result is intentionally code/working-plan only>
```

The 3×2 Implementation/Proof reasoning lens is optional reusable structure, not mandatory output fields.

## Template — Evolution Step

Early form:

```markdown
### EVO-RPKG-<SEMANTIC-NAME> — <readable qualitative change>

Application capability / journey / documentation-architecture change:
...

Evolution Kinds:
- <Introduction | Expansion | Refactoring | Forced Migration | Retirement>

Likely affected:
- Benefit: ...
- Feature(s): ...
- Scenario(s): ...

Known tension / open boundary question:
- ...
```

Full target form may use `[EXISTING] / [NEW] / [CHANGED] / [REMOVED]` where useful.

## Template — Evolution Impact

<a id="template-evolution-impact"></a>

```markdown
## Evolution Impact

### EVO-RPKG-<SEMANTIC-NAME> — <readable Step>

Evolution Kinds for this owner:
- <Expansion | Refactoring | Forced Migration | Retirement>

[EXISTING] ...
[NEW] ...
[CHANGED] ...
[REMOVED] ...

Requirement consequences:
<reference owner IR/PFR only when actually selected>
```

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
...
```

## Template — Test Strategy / Proof allocation

```markdown
# Replacement Package App — Test Strategy

## Cross-owner proof decisions
<only genuinely shared decisions>

## Proof allocation
| Behavior / Requirement | Owner | Proof layer | Evidence |
|---|---|---|---|

## Shared Test Capabilities
- ...
```

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

## Delegated working forms

Full exact Slice/Aggregate planning is not duplicated here.

Use:
- `DOC-UC-02` / `DOC-UC-03` for Domain/Slice-specific discovery;
- [`session-methodology/exact-implementation-planning.md`](session-methodology/exact-implementation-planning.md) for generic exact classes/methods/files/call/data/state/test/edit planning;
- [`methodology-guidance/reusable-ddd-domain-discovery.md`](methodology-guidance/reusable-ddd-domain-discovery.md) for recommended Domain ownership/layout reasoning.

Generated implementation traces remain derived/disposable navigation, not semantic authority.
