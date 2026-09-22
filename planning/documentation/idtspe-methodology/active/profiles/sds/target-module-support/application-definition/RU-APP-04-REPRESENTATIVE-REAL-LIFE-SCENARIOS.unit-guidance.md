# Application Definition — Representative Real-Life Scenario Guide

Status: active supporting guidance; **not** a semantic/schema owner

Canonical `Application Benefit` and `Representative Real-Life Scenario` semantics are owned by [`TM-APPLICATION-DEFINITION`](../../target-modules/TM-APPLICATION-DEFINITION.md), specifically `RU-APP-03` and `RU-APP-04`. This guide supplies reusable refinement questions only; if it conflicts with the Target Module, the Target Module wins.

## Purpose

Help produce a small number of truthful representative real-world examples whose primary job is to make one or several Application Benefits understandable through concrete situations, while also exposing boundary pressure without turning those examples into Application Scenario behavior or a second Benefit/boundary owner.

## Refinement Questions

```text
Who is the actor and what real-world situation are they in?
What happens before the bounded Application contribution?
What exact bounded contribution does the Application make?
Which AB-* items manifest/close at that point, if useful to mark?
What happens afterward in the larger real-world workflow?
Does any surrounding step accidentally imply selected Application responsibility?
```

## Boundary Guard

```text
Representative RLS
→ real-world example
→ may contain surrounding human/manual/external-system steps

[Target contribution]
→ only bounded selected Application contribution

Feature behavior / Screen / Domain / internal handoff / architecture / exact mechanism
→ downstream owner
→ do not decompose here
```

Many-to-many relations are normal: one Benefit may appear in several RLS and one RLS may demonstrate several Benefits. The RLS references Benefits; it does not own them.
