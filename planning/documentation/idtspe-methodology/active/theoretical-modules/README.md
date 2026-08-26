# Theoretical Modules — Temporary Raw / Not-Yet-Operationalized Knowledge

Status: active methodology staging package  
Scope: preserve useful theory/reference knowledge that is not yet mature enough to become a Target Module or Lens.

## Why This Type Exists

```text
Target Module
→ processed recurring Target/output family
→ known entry/exit boundary
→ known planning timing / handoff

Lens
→ processed reusable evaluation/check
→ known applicability trigger
→ known finding/output behavior

Theoretical Module
→ useful knowledge/principles worth preserving
→ may still be raw, broad or internally mixed
→ timing/applicability may not yet be stable
→ not executable methodology authority by itself
```

A Theoretical Module prevents two bad choices:

1. deleting useful repository knowledge merely because its old workflow shell is obsolete;
2. prematurely converting raw theory into a Lens/Target Module before we understand how it should be used.

## Authority Boundary

A Theoretical Module is **reference material**, not a semantic Target owner, not a Lens and not an automatic workflow step.

```text
processed Target/Lens/Core contract
→ current operational methodology authority

theoretical module
→ supporting theory / candidate principles / raw detail
→ may expose a gap or proposal
→ cannot silently override the processed methodology
```

If a Theoretical Module conflicts with a current Target/Lens/Core rule, surface the conflict for explicit methodology refinement. Do not silently choose the older/raw rule.

## Bootstrap / Navigation Rule

Whole-methodology bootstrap reads this registry so the assistant knows which theoretical knowledge packages exist. It does **not** automatically read every raw body.

A theoretical package may be opened when:

- a concrete Target/Lens reaches a topic whose processed guidance is insufficient;
- the user explicitly asks to reason from that theory;
- methodology maintenance is deciding whether part of the theory should become a normal Target Module/Lens/Core rule.

A Lens may reference a theoretical package from its explicit `Knowledge Basis` using `REFERENCED` or `HYBRID` mode. That reference defines a **knowledge dependency/load policy**, not a Target Source relation and not automatic authority for the raw theory. The Lens remains owner of applicability/evaluation/findings; the theoretical package remains owner of the referenced raw/detail knowledge.

Unclear timing is allowed. That is one reason the material remains theoretical.

## Lifecycle

```text
IMPORTED_RAW
→ UNDER_REVIEW
→ selected knowledge promoted into Core / Target Module / Lens / other stable owner
→ source theoretical module marked PARTIALLY_PROMOTED or SUPERSEDED
→ eventually RETIRED when no unique useful knowledge remains
```

Promotion copies **meaning**, not necessarily old file structure or old workflow ontology.

## Current Registry

| ID | Package | State | Source | Notes |
|---|---|---|---|---|
| `THM-TESTING-DETAIL-CA768B61` | [`testing/`](testing/README.md) | `IMPORTED_RAW` | repository snapshot `ca768b61...` | detailed Testing principles/guidance preserved byte-for-byte until better operationalization is chosen |
