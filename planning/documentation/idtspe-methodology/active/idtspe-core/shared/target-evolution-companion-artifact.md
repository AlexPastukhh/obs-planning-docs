# Target Evolution Companion — Representation Guidance

Status: generic representation guidance

## Purpose

Explain how evolution meaning already owned by a natural semantic owner may be
represented physically when it becomes too large or independently reviewable for
the owner's main artifact.

This guide does not define evolution semantics and does not make a Lens the owner
of evolution meaning.

## Ownership

Evolution meaning belongs to the natural Target/result owner that defines it.
Profiles may define owner-local evolution result surfaces, for example Scenario
future/change meaning or Slice/Cross-Cutting Evolution Steps.

## Default

Keep small evolution meaning embedded in the same owner:

```text
owner
  current meaning
  Evolution Steps / future-change section
```

## Split Under Pressure

A companion file is justified only when evolution meaning is large, independently
reviewed/reused, changes at a distinct editorial cadence or materially harms main
owner readability.

```text
<owner>
<owner>.evolution.md
```

Both remain representations of the same semantic owner.

## Guard

```text
companion file ≠ second semantic owner
Lens finding ≠ companion semantics
file split ≠ new Target
```

Documentation / Representation + P-14 / TF-10 decide actual placement.
