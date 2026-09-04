# DOC-UC-10 — Maintain use-case-driven documentation ownership

### Goal

Prevent orphan documentation files/sections whose purpose, maintenance process or authority is unclear by ensuring every durable documentation owner has explicit **use-case coverage**. Documentation-process artifacts are justified by Documentation Use Cases; application semantic/contract/proof owners may be justified by the application Scenario, Slice, testing or acceptance process that needs their information.

### Process

1. Before creating or retaining a durable **semantic documentation owner**, identify the explicit use case/process that creates, maintains or consumes it. Do not treat every physical file as a separate semantic owner.
2. Classify the coverage correctly:
   - **documentation-process artifact** (for example templates, terminology/principles, Evolution Steps Map, generated documentation tooling/output) → an explicit Documentation Use Case must justify it;
   - **application semantic/contract/proof owner** (for example focused protocol, Scenario/Slice/Screen/shared support contract, testing plan, Shared Test Capability or manual acceptance evidence owner) → the application Scenario, Slice, testing or acceptance process that requires the information may justify it without inventing an artificial Documentation Use Case.
3. Ask whether the information belongs to its natural existing semantic owner. If that owner is physically difficult to read or maintain, keep the same semantic authority and use DOC-UC-13 to decompose its representation.
4. Create a separate focused **semantic owner** only when:
   - explicit use-case/process coverage exists;
   - independent/shared complexity makes separate ownership clearer;
   - authority and maintenance responsibility can be stated without duplicating another owner.
5. Shared concepts/principles may live in physically separate methodology files when that improves consumption/maintenance. Physical separation alone does not create a new semantic owner; keep one clear methodology authority and navigation route.
6. Keep templates because concrete Documentation Use Cases link to/use them at specific process steps; do not grow a passive template catalog disconnected from use.
7. For every durable owner, be able to answer:
   - which use case/process needs this owner?
   - if it is a documentation-process artifact, which Documentation Use Case owns that process?
   - what information is authoritative here?
   - what information is only referenced/derived?
   - when is this owner updated?
8. When an owner no longer has use-case/process coverage or its information becomes fully natural in another semantic owner, merge/retire the semantic owner rather than preserving ceremony. This is different from merging/splitting physical files inside one owner.
9. During documentation-model changes, audit newly introduced and materially retained owners for use-case coverage before package completion.

### Principles

- No orphan documentation owner.
- **Use-case coverage does not mean Documentation Use Case for every file.** Documentation-process artifacts require DOC-UC coverage; application semantic/contract/proof owners may be covered by the application/testing/acceptance process they serve.
- A useful fact does not automatically justify a separate semantic owner.
- Physical file boundaries are representation decisions, not semantic-owner boundaries.
- Terms and principles are not separate semantic owner types by default; they may be physically separated when the same methodology authority remains explicit.
- Navigation/index files are valid when discoverability itself is required by a use case/process, but they must not become competing semantic authority.

### Owners used by this process

- `documentation-use-cases.md` plus its linked detailed files as one documentation-process authority;
- `documentation-templates.md` plus its linked detailed files as process-used recommended forms;
- README/catalog/map and other documentation-process owners only when a concrete Documentation Use Case justifies them;
- focused application semantic/contract/proof owners only when the application Scenario/Slice/testing/acceptance process they serve gives them explicit use-case coverage.

---
