# Requirement Ownership And Exceptional Standalone Target Rule

Status: active generic rule

## Default

A must-hold condition should normally live with the semantic owner whose meaning it constrains.

```text
Scenario / Behavior
  behavioral rule, rejection, failure, no-mutation guarantee

Screen
  spatial/interaction/accessibility requirement

Domain
  domain invariant, lifecycle/value-integrity rule

Application Definition
  application-level responsibility/constraint

current architecture Answer Decision / Cross-Cutting owner
  selected architecture constraint/quality boundary

Slice
  implementation/delivery-local obligation
```

Therefore:

```text
Requirement
≠ automatically separate Target
≠ automatically separate file
```

## Local Requirement Object

A layer may keep an addressable local must-hold object when traceability is useful:

```text
Requirement ID — optional until addressability matters
Statement
Owner
Source / rationale
Applies to
Expected stability
Evidence
Related behavior/invariant/negative guarantee
Consumers — when another layer must consume it
```

The local object's authority remains the owning layer.

## When TM-REQUIREMENT May Be Used

`TM-REQUIREMENT` is an exceptional escape hatch, not a normal planning step.

Use it only when one condition is independently worth owning because, for example:

```text
the same must-hold condition spans several semantic owners

one external/regulatory/contractual rule must remain canonical
instead of being copied into several layers

the condition has its own material scope/questions/evidence/revalidation

several downstream owners need one stable shared reference
and no existing semantic owner is naturally authoritative
```

Even then, first ask whether Application Definition, Domain, current architecture Answer Decision/Cross-Cutting owner, Screen or another existing owner is the better canonical owner.

## Anti-Duplication Rule

Do not create two equal authorities for the same meaning.

Example:

```text
Behavior Item owns:
  failed persistence must not report success

other layers reference it
```

Do not create a separate Requirement with the same statement unless a real shared canonical owner adds distinct value.

## Expected Frequency

For many projects:

```text
TM-REQUIREMENT Target count
= 0
```

This is valid and expected.
