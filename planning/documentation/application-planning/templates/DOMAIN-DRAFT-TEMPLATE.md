# Domain / Aggregate Modeling Supporting Template

Status: active supporting template; legacy filename retained for compatibility.
Canonical durable semantic owner: `TM-DOMAIN-OWNER`. `TM-DOMAIN-DISCOVERY` is transient Source/discovery only. Use this template only when a human-readable durable Domain representation is independently useful.

Use only when a human-readable Domain artifact is independently useful. Code/types/tests may remain the durable Domain representation.

Every formed durable Domain Owner Target keeps `RU-DOWN-01..03`. Use `RESOLVED`, `OPEN`, or `OMITTED — <concise reason>` at each heading; if no durable Domain owner is justified, do not form the Target at all.

## RU-DOWN-01 — Domain Semantic Contract

**Methodology:** [TM-DOMAIN-OWNER](../../idtspe-methodology/active/profiles/sds/target-modules/TM-DOMAIN-OWNER.md)

Disposition: `RESOLVED | OPEN`

Represent proportionally:

```text
identity / important concepts
material state / lifecycle / conditions
state-condition matrix when useful
valid / impossible combinations
invariants / policies
transitions
consistency / Aggregate boundary
Domain-owned behavior vs application/external coordination
useful public/semantic Domain operations
```

These are Resolution techniques/selected model meaning, not mandatory separate Result Units. Transient discovery may remain inline/working-only and does not require this file. If no independently durable Domain owner is justified, do not create a durable Domain artifact merely to fill the template.

## RU-DOWN-02 — Domain Implementation Requirements

**Methodology:** [TM-DOMAIN-OWNER](../../idtspe-methodology/active/profiles/sds/target-modules/TM-DOMAIN-OWNER.md)

Disposition: `RESOLVED | OPEN | OMITTED — <reason>`

Record only durable Domain-owned implementation/proof requirements; `OMITTED` is valid when no Domain-local `IR/PFR` is needed.

## RU-DOWN-03 — Evolution Impact

**Methodology:** [TM-DOMAIN-OWNER](../../idtspe-methodology/active/profiles/sds/target-modules/TM-DOMAIN-OWNER.md)

Disposition: `RESOLVED | OPEN | OMITTED — <reason>`

For a current realized Domain owner, reference concrete unrealized Evolution Steps that materially affect its semantics/responsibility. In a future Target Domain Body keep the Unit present but `OMITTED` because current-owner reverse projection is not applicable there.
