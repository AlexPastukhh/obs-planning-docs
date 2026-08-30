# Domain / Aggregate Modeling Supporting Template

Status: active supporting template; legacy filename retained for compatibility.
Canonical semantic owner: `TM-DOMAIN-DISCOVERY` / Domain / Aggregate Modeling.

Use only when a human-readable Domain artifact is independently useful. Code/types/tests may remain the durable Domain representation.

## RU-DOM-01 — Selected Domain / Aggregate Model

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

These are Resolution techniques/selected model meaning, not mandatory separate Result Units. A shallow supporting use inside Slice Strategy may remain inline and does not require this file.
