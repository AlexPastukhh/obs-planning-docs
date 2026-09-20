# Target Evolution Companion — Representation Guidance

Status: generic representation guidance

## Purpose

Explain how evolution/future-transition meaning **already owned by the active methodology/profile** may be represented physically when it becomes too large or independently reviewable for its primary semantic owner artifact.

This guide does not define evolution semantics, does not choose the evolution semantic owner and does not make a companion file a second semantic owner.

## Semantic-Owner Boundary

The active profile/Target contract decides where future meaning is semantically owned.

```text
profile says future meaning is owner-local
→ companion may remain another representation of that same owner

profile defines a dedicated future-transition owner
→ companion/Step artifact represents that dedicated owner
→ do not copy the same future semantic authority into current natural-owner artifacts
```

For SDS specifically, materially planned unrealized target state is owned by `TM-EVOLUTION-STEP`; canonical natural owners describe realized/current truth. Therefore an SDS `<owner>.evolution.md` file must not be treated as owner-local future authority merely because this generic companion pattern exists.

## Default Representation Rule

Keep the smallest representation that preserves the semantic owner's identity, authority, addressability and reviewability.

Examples:

```text
small owner-local evolution meaning under a profile that permits it
→ embed in that owner

substantial dedicated Evolution Step under SDS
→ dedicated Step artifact or suitable shared Step artifact/section

registry/navigation need
→ Steps Map / generated projection as defined by the profile
```

## Split Under Representation Pressure

A companion/split artifact is justified only when the **same already-resolved semantic owner** has material size, independent review/reuse, lifecycle or editorial-cadence pressure.

```text
<semantic-owner main representation>
<semantic-owner companion representation>
```

Both remain representations of that semantic owner. The filename suffix `.evolution.md` has no universal semantic meaning by itself.

## Physical vs Semantic Promotion

Physical split/merge or embedded→dedicated promotion/demotion is a Documentation / Representation + P-14/TF-10 concern.

It must not be confused with profile-specific semantic transitions such as SDS `Target Owner Materialization`, where realized future meaning becomes current natural-owner authority.

## Guards

```text
companion file ≠ second semantic owner
filename pattern ≠ semantic-owner selection
Lens finding ≠ companion semantics
file split ≠ new Target
physical representation promotion ≠ semantic future→current materialization
profile-specific future-owner rule overrides generic owner-local examples
```
