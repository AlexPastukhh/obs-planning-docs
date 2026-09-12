# Domain / Aggregate Modeling Supporting Template

Status: active supporting template; legacy filename retained for compatibility.
Canonical durable semantic owner: `TM-DOMAIN-OWNER`. `TM-DOMAIN-DISCOVERY` is transient Source/discovery only. Use this template only when a human-readable durable Domain representation is independently useful.

Use only when a human-readable Domain artifact is independently useful. Code/types/tests may remain the durable Domain representation.

## RU-DOWN-01 — Domain Semantic Contract

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
