# Replacement Package App — Documentation Templates

Status: active recommended-template owner
Scope: recommended starting forms for Scenario, Evolution, Domain, Slice, Cross-cutting Capability and generated implementation-trace documentation.

## Template rule

These templates are **recommended forms, not schemas**.

A concrete document should contain the information needed to understand its owner. Sections may be omitted, combined, renamed, reordered or supplemented when another structure communicates the same meaning more clearly.

Do not add empty sections merely to conform to a template. Do not turn template headings into a new bureaucracy or validation taxonomy.

The documentation process and terminology are owned by [`documentation-use-cases.md`](documentation-use-cases.md).

---

## Template — Scenario owner

```text
# SCN-RPKG-... — <Scenario>

## User Goal
<user/business result>

## Current flow
<current accepted main flow and important branches>

## Stage — <meaningful stage>

### Stage Goal
<why this stage exists, when useful>

### Behavior Items

#### BI-RPKG-..-...
Requirement:
<implementation-independent business behavior / invariant / rule>

Reason:
<Scenario/Stage goal, prevented bug/class of bugs, dependent behavior,
 business invariant or other reason this requirement exists>

## Migration Delta

### EVO-RPKG-... — <user-visible change>
Status: URGENT | PLANNED | POSSIBLE

Change:
<what changes for the user/business process>

Behavior Items:
- adds: BI-...
- changes: BI-...
- removes: BI-...

Affected owners:
<only when already known/useful>
```

Notes:

- Behavior Items are the business specification; do not put implementation mechanisms there merely because the current target design uses them.
- `Reason` is required in meaning, but it may be written compactly or merged into prose when that reads better.
- Migration Delta contains only still-unimplemented behavior.

---

## Template — Evolution Step entry

Use when an `EVO-*` needs a focused representation inside an owner.

```text
### EVO-RPKG-... — <change>
Status: URGENT | PLANNED | POSSIBLE | IMPLEMENTED
Scenario: <SCN / Stage>

User/business change:
...

Behavior Items:
adds / changes / removes ...

Owner impact:
<Domain / Slice / cross-cutting impact relevant to this owner>

Implementation requirements:
<DI/SI references only when they exist>

Architecture decision:
<only when material>
```

Omit any field that adds no information.

---

## Template — Aggregate Domain owner

Use an Aggregate owner by default when several Domain concepts share one consistency/invariant boundary.

```text
# <Aggregate>

## Responsibility
<business/domain responsibility and consistency boundary>

## Behavior Items implemented
- BI-...

## Domain Concepts
<semantic identities, states, relationships and business operations needed
 to understand the Aggregate; not a class/field inventory>

## Invariants
<domain invariants not already clear from BI references>

## Domain Implementation Items

### DI-...
Requirement:
<durable domain architecture requirement>

Reason:
<why it is needed>

Derived from:
<BI / EVO / invariant / concrete architecture pressure, when useful>

## Evolution Steps
### EVO-...
...
```

`Domain Implementation Items` are optional. A Domain owner that can be understood completely from its BI and invariants does not need artificial `DI-*` entries.

---

## Template — Domain Object owner

Use a separate Domain Object file only when independent semantics, identity/lifecycle, cross-owner reuse or rule volume make it clearer than keeping the object in its Aggregate owner.

```text
# <Domain Object>

## Responsibility / Meaning
...

## Behavior Items implemented
- BI-...

## Identity / Relationships
<only semantic facts that matter>

## Invariants
...

## Domain Implementation Items
### DI-...
Requirement:
...
Reason:
...
Derived from:
...

## Evolution Steps
...
```

A separate source class is not by itself a reason to create this file.

---

## Template — Slice owner

```text
# SL-RPKG-... — <Slice>

## Result / Responsibility
<application capability/result this Slice owns>

## Behavior Items realized
- BI-...

## Domain used
- <Aggregate / Domain capability>

## Slice Implementation Items

### SI-...
Requirement:
<durable orchestration/composition/recovery/architecture requirement>

Reason:
<why this implementation constraint matters>

Derived from:
<BI / EVO / Domain constraint / concrete architecture concern, when useful>

## Evolution Steps
### EVO-...
Behavior contribution:
...
Domain impact:
...
Implementation Items:
...
Architecture decision:
...
```

`Slice Implementation Items` are optional. Do not put current method names, service call chains, Java fields or adapter routing here just to describe the code.

---

## Template — Cross-cutting Capability owner

Use only when one real shared implementation responsibility spans several Slices.

```text
# CC-RPKG-... — <Cross-cutting Capability>

## Responsibility
...

## Behavior Items realized
- BI-...

## Domain used
...

## Implementation Items
### <local implementation item>
Requirement:
...
Reason:
...
Derived from:
...

## Consumers
- SL-...

## Evolution Steps
...
```

A common principle such as DRY, logging or composition is not by itself a Cross-cutting Capability.

---

## Recommended generated implementation-trace output

Generated traces are derived artifacts, not normative owners. Their exact generator/output format may evolve.

Recommended discoverability fields when tooling supports them:

```text
Generated: yes
Source revision: <commit SHA>
Root symbol: <symbol>

Calls / callers:
...

Fields read / written:
...

Referenced types:
...

External boundaries:
...

Branches / results:
<only when derivable with confidence>
```

Recommended location when a generator is introduced:

```text
planning/documentation/tools/replacement-package-app/generated/implementation-traces/
```

Regenerate these artifacts instead of manually maintaining them. They never replace Scenario BI, Domain invariants, Slice implementation requirements or source authority.
