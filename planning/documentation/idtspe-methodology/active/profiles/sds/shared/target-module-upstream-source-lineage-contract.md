# Target Module Upstream Source Lineage Contract

Status: active generic IDTSPE / Target Module contract  
Purpose: make the accepted upstream truth required by each Target Module explicit without turning a phase handoff into a closed Source whitelist.

---

# 1. Why

Every recurring Target Module should answer:

```text
what accepted planning truth should normally already exist?
which nearest owners directly constrain this Target?
which older decisions must remain traceable?
which Evidence/current-state/constraint sources are conditional?
what accepted output does this module produce for downstream Targets?
```

This prevents:

```text
Scenario planning from forgetting the selected real-world solution/Need

Domain planning from inventing behavior because Scenario DATA/Behavior were omitted

Slice planning from reducing upstream semantics to "Domain only"

Test planning from proving an implementation detail instead of selected behavior
```

---

# 2. Four Source-Lineage Classes

## Direct Semantic Sources

Nearest accepted semantic owners whose current meaning directly constrains the Target.

Example for Domain:

```text
Scenarios
Scenario DATA
Behavior Items
local/shared must-hold conditions / invariants
```

These are the most important upstream Sources.

---

## Inherited Lineage

Older accepted planning basis that should remain traceable but usually does not need to be copied into the current Target body.

Example for a Slice:

```text
Need
selected real-world solution
Application Definition / Responsibility Boundary
```

usually remains reachable through:

```text
Scenario / Behavior / Domain refs
```

Use direct references when a current Decision actually depends on the older owner.

Invariant:

```text
transitive lineage
≠ every ancestor is an equal direct Source
```

---

## Evidence / Current-State Sources

Observed/researched/prototyped/current implementation/workspace facts used to test or shape Decisions.

Examples:

```text
Prototype Evidence
Application feasibility / Prototype findings
current implementation state
Observed WEUC
actual tests
runtime evidence
```

Evidence does not become semantic authority.

---

## Constraint / Planning-State Sources

Accepted constraints or orchestration decisions that shape the Target.

Examples:

```text
local/shared must-hold condition
Slice Strategy
accepted architecture Answer Decision
selected Branch result
external/regulatory constraint
planning profile
```

The semantic role/authority must remain explicit.

---

# 3. Module Source Contract Shape

Every reusable Target Module should contain:

```text
Upstream Source Contract

Direct Semantic Sources
  REQUIRED / PROPORTIONAL / CONDITIONAL

Inherited Lineage
  root/higher-level accepted basis that must remain traceable

Evidence / Current-State Sources
  conditional evidence inputs

Constraint / Planning-State Sources
  accepted constraints/route/state

Source Discovery Rule
  this archetype is not a closed whitelist
```

A module may omit an empty category only when the meaning is obvious.

---

# 4. Scenario Lineage

Typical lineage:

```text
Need / Desired Outcome
↓
selected Step-02 real-world solution scope / route / result
↓
own-software contribution
↓
Application Definition
  concept
  responsibility boundary
  optional Refined Core Real-Life Scenario
↓
Scenario Discovery
↓
Scenario Draft
  ↔ internal Scenario DATA
  ↔ internal Behavior Items
```

For Scenario Discovery/Draft, the accepted Need and selected real-world solution result remain explicit lineage Sources.

This prevents:

```text
Application Scenario
becoming a UI/use-case invented only from Application internals
```

---

# 5. Domain Lineage

Typical direct semantic Sources:

```text
selected Scenarios
Scenario DATA
Behavior Items
local/shared must-hold conditions / invariants
```

Optional/contextual:

```text
Application Definition
Screens — only where spatial state carries semantic evidence
Prototype/realization Evidence
Change Axes
existing Domain/current implementation Evidence when reviewing
```

Domain must derive conceptual meaning from selected behavior/information truth, not from nouns/files/tables.

---

# 6. Slice Lineage

Typical direct semantic Sources:

```text
selected Scenarios
Scenario DATA
Behavior Items
Requirements
Screens when applicable
selected Domain meaning:
  Entities/concepts
  Value Objects
  Aggregates/Roots
  lifecycle/state
  invariants
  policies
  external references/coordination
  Domain Verification Meaning
```

Planning/current-state Sources:

```text
Slice Strategy
accepted architecture Answer Decisions
contextual L4/L5/L6 / WEUC findings
Application feasibility / current implementation findings
existing implementation state
```

Inherited lineage should retain:

```text
Need
selected real-world solution
Application Definition
```

normally through Scenario/Domain traceability.

---

# 7. Testing Lineage

Proof modules should consume selected semantic truth:

```text
Scenario Acceptance
Behavior Items
Scenario DATA relevant to setup/observation
Requirements
Domain invariants / verification meaning
Slice Useful Vertical Result Definition / implemented boundary
```

plus:

```text
Testing Strategy
environment/operator constraints
actual test/evidence state
```

They never become semantic owners of the behavior they prove.

---

# 8. Source Discovery Rule

The module contract is an archetype, not a legal whitelist.

During `TF-04 SOURCE_SET`:

```text
module expected Sources
+
current user input
+
trusted canonical owners
+
Evidence/current state
+
accepted output of related Targets when truly constraining
↓
typed Source Contract for this Target Instance
```

If a recurring missing Source is repeatedly discovered:

```text
review/update the Target Module
```

through the Target Module maintenance Use Case.

---

# 9. Handoff Symmetry

When module A declares:

```text
Accepted Output → typical Source for Module B
```

Module B should normally list that output/class in its Upstream Source Contract.

This is a consistency rule, not automatic authority.

---

# 9A. Workspace Evolution Planning-State Lineage

Workspace evolution is a cross-cutting planning-state lineage:

```text
SDS-EVOLUTION-MAP
+ Application/Scenario/current Workspace Sources
↓
TM-WEUC
↓
SDS-WORKSPACE-EVOLUTION.md
↓
WEUC Lens inside Domain / Slice / Frontend / Cross-Cutting / etc.
↓
local evolution implications / architecture Answer Decisions
↓
optional <owner>.evolution.md
↓
map update candidate when global interpretation changes
→ TM-WEUC
```

`SDS-WORKSPACE-EVOLUTION.md` is not semantic authority over Scenario/Domain/etc. Its `Current Global Architecture Position` is project-global architecture authority/default guidance only; its future sections are planning-state Sources used to evaluate how current choices behave under accepted/plausible evolution.

---

# 10. Validator

`Target Module Source-Lineage Validator` checks:

```text
direct Sources include the nearest semantic owners needed for correctness
Need/real-world-solution lineage is not lost before Scenario planning
Domain includes Scenario DATA + Behavior, not only Scenario prose
Slice includes Scenario/DATA/Behavior + Domain meaning, not only implementation constraints
tests include selected behavior/requirements, not only code/test files
Evidence is not mislabeled as semantic authority
ancestor lineage is traceable without copying every ancestor into every Target
module Source archetype is not treated as a closed whitelist
handoff/source symmetry is reasonable
```
