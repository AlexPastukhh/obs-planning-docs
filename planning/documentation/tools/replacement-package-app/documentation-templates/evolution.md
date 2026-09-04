# Templates — Evolution

Status: physically separated part of the recommended-template owner. Templates remain recommended forms, not schemas.

<a id="template-evolution-step"></a>
## Template — Evolution Step

Use only in the canonical Scenario owner. The entry describes **what changes in application/Scenario behavior**, not Domain/Slice/Screen/test implementation delta.

```text
### EVO-RPKG-<SEMANTIC-NAME> — <readable application change>
Intent: URGENT | PLANNED | POSSIBLE <only when useful>

Change:
<what changes for the user/application process>

Scenario Process / Feature Interaction impact:
<added/removed/replaced/composed/split behavior when material>

Contract / Behavior Item / local UI impact:
<only selected behavioral requirement changes>

Affected Screen realization:
<references when useful; detailed Screen delta stays in Screen Evolution Impact>

Related / Replacement Scenario:
<references only when useful>
```

Intent does not define exact roadmap timing/likelihood/order; the Evolution Steps Map owns those planning relations.

---
<a id="template-evolution-impact"></a>
## Template — Evolution Impact

Use inside Domain, Slice, Screen or Shared Implementation Capability owners to describe **future owner delta** caused by a canonical Scenario-owned Evolution Step.

```text
## Evolution Impact

### EVO-RPKG-<SEMANTIC-NAME> — <readable application change>
Canonical Scenario step:
<link / Scenario owner>

Expansion:
<additive capability/composition/port/consumer/test-proof delta, only when present>

Refactoring:
<behavior-preserving implementation or test-suite structural improvement, only when useful>

Forced Migration:
<existing logic/authority/representation that must move because additive realization is not practical; only when real>
```

Omit empty kinds. `Evolution Impact` does not repeat current `DI-*` / `SI-*` / shared Implementation Item `Requirement + Reason`. Those items shape the owner now; reference them only when needed to understand the future delta.

When Tests are embedded in the owner, material test-suite change belongs in the same `Evolution Impact` and may be an Expansion or Refactoring; do not create a parallel test-evolution owner merely to say tests change. Most Evolution Steps need no separate test-suite note.

---
<a id="template-evolution-steps-map-entry"></a>
## Template — Evolution Steps Map entry

```text
### <readable Evolution Step name>
Evolution Step:
<link to canonical Scenario-owned EVO>

Rough horizon / likelihood:
<only when useful>

Depends on:
- ...

Enables:
- ...

Can run in parallel with:
- ...

Readiness / gate:
<only when useful>

Materially independent local impact timing:
- <lower-owner Evolution Impact reference> — <before/with/after/conditional/rough likelihood>
```

Keep WHAT behavior/owner delta in the canonical owners; this entry is planning relationships only.

---
