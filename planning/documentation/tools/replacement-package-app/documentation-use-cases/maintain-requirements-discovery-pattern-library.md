# DOC-UC-14 — Maintain Requirements Discovery and reusable Pattern Library

### Goal

Keep reusable Implementation/Proof Requirements Discovery questions and known candidate Pattern answers explicit, navigable, extensible and non-mandatory, without copying project-specific Items into methodology or turning recurring patterns into automatic architecture.

### Process

1. Maintain the [Requirements Discovery entry point](requirements-discovery/README.md) as the normative derivation/cross-discovery/grouping rule used by DOC-UC-02/03/04/05/12.
2. When a recurring realization/proof gap appears, decide whether an existing question already covers it. Refine/narrow an existing question when that preserves one coherent inquiry; split/add a question when distinct concerns need independent routing.
3. Keep concrete question sets in their natural scope: common implementation, Domain, Slice, Shared Implementation or Proof Requirements Discovery. A question may link to related questions in the other channel.
4. When a reusable candidate answer recurs, add/refine one Pattern definition and one [Pattern Registry](patterns/REGISTRY.md) entry. Give each Pattern one canonical physical home; use metadata/cross-links for other focuses/scopes rather than duplicating definitions.
5. Pattern metadata should identify focus (`implementation`, `proof`, `implementation+proof`), applicable scopes, related discovery questions, possible Item types and related Patterns.
6. A Pattern is a candidate answer, not an Item and not mandatory architecture. Concrete owner-local Items must state the selected durable requirement in context; Pattern references are optional rationale/navigation.
7. Keep the derivation invariant explicit: every material selected answer becomes the appropriate Item type(s); `N/A`, no-additional-requirement/discarded candidates create none.
8. Keep cross-discovery explicit: Proof answers may create Implementation Items; implementation answers may create Test Items. When those Items are coupled parts of one decision, group them.
9. Keep Item Group semantics explicit: a material change to any member triggers review of the whole group, not automatic invalidation. Preserve `Related` as weaker navigation only.
10. Remove/merge obsolete or duplicate questions/Patterns when one canonical definition communicates the reusable guidance better. Use DOC-UC-13 for physical decomposition and DOC-UC-10 for semantic-owner questions.
11. Do not copy source-specific implementation mechanics, one-off project decisions or rejected exploration into the reusable Pattern Library. Promote only recurring reusable guidance.

### Principles

- Requirements Discovery asks what durable requirements the concrete realization/proof needs.
- Pattern = reusable candidate answer; Item = selected concrete durable requirement.
- Question sets and Pattern Registry are methodology content, not copied into every Domain/Slice/Shared owner.
- The Pattern Registry is one canonical registry even when Patterns have different implementation/proof/domain/slice focuses.
- Cross-discovery and grouping rules are part of the mechanism, not optional advice.
- The library grows incrementally from recurring useful gaps; it is not an exhaustive architecture/testing encyclopedia.

### Owners used by this process

- `requirements-discovery/` and `patterns/` as physical parts of the same Documentation Use Cases methodology authority;
- concrete Domain/Slice/Shared owners only as consumers/producers of project-specific Items, not as Pattern authority.

---
