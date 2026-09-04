# DOC-UC-13 — Maintain documentation representation and decomposition

### Goal

Keep durable documentation physically readable and maintainable without confusing file boundaries with semantic authority or creating competing copies of meaning.

### Process

1. Identify the logical documentation owner whose representation is being reviewed and the use cases/readers that consume it.
2. Treat file size only as a signal. Review physical decomposition when one file mixes independently consumable bodies of detail, catalog/index navigation, shared concepts/principles, independent procedures, templates, migration material or other sections that can be read/maintained separately.
3. Distinguish **physical decomposition** from **semantic decomposition**:
   - physical decomposition keeps one logical authority and moves its parts into clearer files/directories;
   - semantic decomposition creates independently maintained authorities and therefore requires DOC-UC-10 justification.
4. Split physical representation when it improves focused reading/review/maintenance without forcing readers to load unrelated detail. Keep each authoritative detail in one canonical place.
5. Use an index/README/navigation file to expose the logical owner and its parts when useful. Navigation summarizes/routes; it must not become a second copy of detailed authority.
6. Preserve stable entry paths/anchors with compatibility navigation when existing consumers materially rely on them and the cost is reasonable. Update internal links to point directly at the new canonical detail files.
7. Do not split mechanically by line count. Prefer cohesion, independent consumption and maintenance boundaries over arbitrary size thresholds.
8. Avoid the opposite failure as well: if physical fragmentation makes one coherent idea harder to recover, merge related parts while preserving the same semantic authority.
9. After restructuring, verify that a reader can identify the logical owner, find each canonical part, and distinguish authority from navigation/reference without reading unrelated files.

### Principles

- One logical documentation owner does not require one physical file.
- One physical file does not automatically define one semantic owner.
- Physical decomposition should improve progressive disclosure without duplicating authority.
- File size is evidence to inspect cohesion, not an automatic split rule.
- Semantic-owner creation/retirement remains governed by DOC-UC-10.

### Owners used by this process

- any durable documentation owner whose physical representation is being reviewed;
- `documentation-use-cases.md` and `documentation-templates.md` as immediate self-application targets for this methodology.
