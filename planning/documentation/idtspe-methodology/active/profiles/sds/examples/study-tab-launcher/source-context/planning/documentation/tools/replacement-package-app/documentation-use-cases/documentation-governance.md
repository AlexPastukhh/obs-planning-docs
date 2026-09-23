# Replacement Package App — Documentation Use Cases: Documentation Governance

Status: active normative Documentation Use Case group
Root authority: [`../documentation-use-cases.md`](../documentation-use-cases.md)

<a id="doc-uc-09--communicate-documentation-meaning-clearly"></a>
## DOC-UC-09 — Communicate documentation meaning clearly

### Goal

Make durable documentation easy to scan and accurately understand without simplifying away conditions, exceptions, boundaries, rationale or current/planned distinctions.

### Process

1. Identify the main semantic claim of each block before formatting it.
2. Keep one connected idea as prose when prose communicates it best; use bullets/tables/process maps when they reveal independently meaningful structure.
3. Make meaningful contrasts explicit when useful: current vs planned, success vs failure vs uncertainty, Feature vs Scenario, runtime branch vs design alternative, current Requirement vs Evolution Impact.
4. Re-read structured wording against source meaning and verify no condition, exception, reason, authority boundary or outcome disappeared.
5. Give Feature, Scenario, Requirement, Slice, Aggregate, Shared Capability, Evolution Step and other durable entities intuitive semantic names; technical IDs remain stable navigation aids, not meaning.
6. Apply the same semantic-readability rule to templates and examples.

### Principles

- Optimize for semantic readability without semantic compression.
- Shorter is not better when it removes required meaning.
- Technical identifiers are navigation, not architecture or roadmap order.

---

<a id="doc-uc-10--maintain-use-case-driven-documentation-ownership"></a>
## DOC-UC-10 — Maintain use-case-driven documentation ownership

### Goal

Prevent orphan documentation owners whose purpose, authority or maintenance process is unclear while keeping each durable meaning with the narrowest correct owner.

### Process

1. Before creating or retaining a durable documentation owner, identify the process/use case that creates, maintains or consumes it.
2. Distinguish documentation-process artifacts from application semantic/contract/proof owners; do not invent meta use cases merely to justify product owners.
3. Ask whether the information can remain inside its natural existing owner without losing clarity.
4. Create a separate owner only when independent/shared complexity, review, reuse or authority pressure makes separate ownership materially clearer.
5. Link/reference existing authority instead of copying it into neighboring files.
6. Keep templates because concrete Documentation Use Cases consume them; treat them as recommended adaptable forms, not schemas that create authority by being copied.
7. Keep migration planning with the canonical Evolution Step owner and affected Evolution Impacts; create a separate migration document only when it is clearly the selected canonical/subordinate owner rather than a competing semantic roadmap.
8. For every durable owner, be able to answer what is authoritative here, what is referenced/derived, who updates it and what process needs it.
9. Merge/retire an owner when its independent use-case/process coverage disappears.
10. Audit newly introduced and materially retained methodology owners for compatibility references during methodology changes.

### Principles

- No orphan documentation owner.
- A useful fact does not automatically justify a separate file.
- Use-case coverage does not mean one Documentation Use Case per product file.
- Compatibility identifiers/anchors are part of the documentation interface when existing owners depend on them.

## Recommended-form semantics

In this methodology:

```text
recommended
= preferred ready-made model
= consult/evaluate when relevant
= use by default when it fits
= adapt/replace when a better context-specific solution is justified
≠ product Requirement
≠ permission to silently ignore relevant guidance
```

Canonical adaptable forms live in [`../documentation-templates.md`](../documentation-templates.md).
