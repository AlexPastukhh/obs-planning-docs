# Knowledge Basis Contract — Shared IDTSPE Knowledge Dependency Model

Status: active generic methodology contract  
Purpose: define one reusable `Knowledge Basis` shape shared by Target Modules and Lenses while keeping reusable theory/knowledge distinct from current Target Sources, current Target inputs/evidence, project truth and Decisions.

## 1. Core Definition

A `Knowledge Basis` is the reusable principles/rules/theory/pattern knowledge used by an operational methodology contract.

```text
Target Module
= Operational Target Contract
+ Knowledge Basis

Lens
= Operational Evaluation Contract
+ Knowledge Basis
```

The shared shape is symmetrical; the operational role is not.

```text
Target Module Knowledge Basis
→ reusable knowledge used to form, resolve, validate and represent
  one recurring Target/result family

Lens Knowledge Basis
→ reusable knowledge used to evaluate a Target
  from one recurring perspective
```

## 2. Literal Shared Contract

Every reusable Target Module and every reusable Lens contains exactly one explicit `## Knowledge Basis` section with one mode:

```text
INLINE
  the operational owner itself contains the material reusable knowledge needed
  for its normal use

REFERENCED
  the operational owner stays thin and points to separate canonical knowledge owner(s)

HYBRID
  a small stable operationalized core stays inline while deeper/detail knowledge
  is loaded conditionally from referenced owner(s)
```

Recommended shape:

```text
Mode: INLINE | REFERENCED | HYBRID

Embedded Principles / Rules / Theory:
  <small reusable knowledge actually owned here>

Referenced Knowledge Owners:
  <canonical principle/theory/reference owners or NONE>

Reference Load Policy:
  <when referenced bodies should actually be read>

Operationalization Notes:
  <how referenced/raw knowledge is constrained/applied by this owner>
```

## 3. Authority / Source Boundary

```text
Knowledge Basis
≠ Target Source
≠ current Target input/evidence
≠ Target result
≠ project truth
≠ Decision
```

A knowledge owner may explain **how to reason about** a recurring Target family or evaluation perspective. It does not become evidence that a current project state is true.

### Target Module example

```text
TM-APPLICATION-DEFINITION

Upstream Target Sources:
  current Need
  selected real-world solution direction
  current repository/application reality

Knowledge Basis:
  reusable application-definition market/reference research guide

Current research result:
  competitor X already covers Need Y
```

Therefore:

```text
research guide
→ Knowledge Basis

competitor X + checked evidence about it
→ current Target Source / Evidence

selected build/buy/adapt conclusion
→ Target result / Decision
```

### Lens example

```text
LENS-DOMAIN-MODELING-DDD

Target Inputs / Evidence:
  current Domain candidate / code / behavior

Knowledge Basis:
  reusable DDD principles/rules/theory

Finding:
  current aggregate boundary mixes two independent invariants
```

## 4. Referenced Knowledge Owners

A referenced knowledge owner may be:

```text
canonical principle/theory owner
reusable methodology/deep guide
Theoretical Module
worked/reference knowledge package
other stable reusable knowledge owner
```

A `REFERENCED` or `HYBRID` relation is a **knowledge dependency/load policy**, not a Target Source relation and not automatic authority for the referenced body.

```text
operational Target Module / Lens
→ owns applicability/use/result or findings contract

referenced knowledge owner
→ owns the referenced reusable knowledge
```

Raw or broader theory cannot silently override the processed operational contract. A conflict is methodology-refinement input.

## 5. Lazy Loading

Bootstrap/navigation should know:

```text
Target Module registry + KB mode/summary
Lens registry + KB mode/summary
Theoretical Module / referenced-knowledge registries when any
```

It should not automatically read every referenced knowledge body.

```text
selected Target Module
→ read module body
→ load referenced module Knowledge Basis only according to its load policy

selected/plausibly applicable Lens
→ read Lens body
→ load referenced Lens Knowledge Basis only according to its load policy
```

`INLINE` means no extra knowledge body is required by the Knowledge Basis itself.

## 6. No Knowledge Duplication By Symmetry

Symmetry of the contract does **not** mean Target Modules absorb reusable Lens knowledge.

```text
knowledge about forming/resolving/representing a recurring Target result
→ Target Module Knowledge Basis when reusable there

reusable cross-Target evaluation perspective
→ Lens + Lens Knowledge Basis
```

If the same reusable evaluation knowledge is useful across Target families, keep/promote it in the Lens Library and let Target Modules reference the Lens through `Lens Profile` instead of copying that evaluation theory into their own Knowledge Basis.

## 7. Theoretical Module Boundary

A Theoretical Module remains useful when knowledge is worth preserving but its operational placement/timing is not yet stable.

It may later become a referenced Knowledge Owner for:

```text
Target Module Knowledge Basis
Lens Knowledge Basis
or both
```

without becoming a Target, Lens or project semantic authority itself.

## 8. Maintenance Invariant

For every reusable Target Module and Lens:

```text
exactly one ## Knowledge Basis
Mode ∈ INLINE | REFERENCED | HYBRID
REFERENCED/HYBRID → explicit knowledge owner(s) + explicit load policy
Knowledge Basis remains distinct from current Target Sources / Target Inputs / Evidence
operationalization notes preserve the owner boundary
```
