# TM-REQUIREMENT — RETIRED Compatibility Route

Status: **RETIRED — not an active SDS Target Module**

This compatibility path must not be instantiated as a current Requirement Target.

Current routing:

```text
Feature behavior                 → TM-FEATURE / BR-*
Domain implementation constraint → TM-DOMAIN-OWNER / IR-DOMAIN-*
Slice implementation constraint  → TM-SLICE-OWNER / IR-SLICE-*
Shared implementation constraint → TM-SHARED-IMPLEMENTATION-CAPABILITY / IR-SHARED-*
rare proof-realization constraint → owner-local PFR-*
other owner-local must-hold       → natural owner / Core Decision as appropriate
```

Natural ownership rule:
[`../shared/requirement-ownership-and-exception-rule.md`](../shared/requirement-ownership-and-exception-rule.md).

Discovery:
[`../lenses/reusable/LENS-IMPLEMENTATION-REQUIREMENTS-DISCOVERY.md`](../lenses/reusable/LENS-IMPLEMENTATION-REQUIREMENTS-DISCOVERY.md).

No Result Units, Production Method or durable authority are owned by this retired file.

This file is intentionally retained only as a stable compatibility route. It is excluded from the active SDS Target Module registry, must never be scanned or instantiated as an active Target Module, and may be physically removed only during a later repository-cleanup pass after proving that no live command, helper, document, or external consumer still depends on the path.
