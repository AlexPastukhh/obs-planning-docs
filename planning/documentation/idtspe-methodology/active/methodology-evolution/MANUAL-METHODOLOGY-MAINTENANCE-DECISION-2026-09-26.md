# Manual Methodology Maintenance Decision — 2026-09-26

Status: historical proposal superseded by [`ON-DEMAND-RELATION-AUDITS-DECISION-2026-09-26.md`](ON-DEMAND-RELATION-AUDITS-DECISION-2026-09-26.md). Its manual stored-map and nested-owner design was never adopted. The later on-demand audit and direct-owner design is implemented. This decision superseded the earlier parser/fixture/generator proposal in `METHODOLOGY-INTEGRITY-TEST-AUDIT-2026-09-26.md`.

## Decision

Stop maintaining automated tests that judge the current methodology's owners, dependencies, attachments, registry inventories, bootstrap read sets, map parity or prose. Maintain the dependency and attachment maps by hand. Maintain command owner lists and the links shown under each owner by hand. Planning Helper displays those declarations; it does not discover semantic relations by parsing methodology files.

This removes the need for a production methodology relation parser, parser fixtures and generated maps. A saved map is a human-maintained navigation aid, not a mechanically certified complete or current inventory. The declarations in the actual owner/Unit files continue to express the methodology's meaning; a reviewer reconciles their changes with the maps and command cards.

## Command card model

Each command keeps its explicit `ownerRefs` list. For each direct owner, the command author may manually record typed navigation links to that owner's dependencies and attachments. Store those links with the matching owner entry, rather than in a separate unkeyed command-wide list. Do not infer an owner or a relation from ordinary Markdown links.

```text
Command
  Direct owner A (manual)
    dependency links (manual)
    attachment links (manual)
  Direct owner B (manual)
    dependency links (manual)
    attachment links (manual)
```

The exact command-file syntax remains an implementation choice. A Target Module may group attachments by Unit; a Lens may list Units that attach it. The command card labels each relationship by type and keeps the links under the owner to which they belong. Owners inherited through `includes`, if displayed, remain in a separate section with their source command identified. An owner's dependency is not automatically an additional owner of the command.

Helper renders only the explicit data. Changing an owner file does **not** automatically update commands or maps. Changing a command does **not** automatically update an owner file or a map. The same link may need a human edit in several places.

## Automated checks retained and removed

Retain ordinary product checks for command-file decoding and serialization, valid field shape, safe rendering, includes behavior, UI state, build output and executable code. Synthetic UI examples may assert that the Helper places a supplied link under the supplied owner. These checks do not inspect current methodology content or claim that a displayed semantic link is correct.

Remove or narrow repository-specific methodology assertions: canonical owner identity checks, dependency/attachment extraction and map parity, current inventory/count snapshots, bootstrap read-set parity, and prose/architecture assertions that reject changes to methodology documents. Review mixed test files assertion by assertion so product behavior is preserved while repository-specific methodology judgments are removed. Retire the active methodology-integrity-test UC/Contract/Process and map-integrity instructions, or rewrite them as a clearly manual review procedure, in the implementation changeset. Do not leave a mandatory automated integrity claim after those tests are removed.

Basic codec validation of a path string is product input validation, not proof that the referenced methodology owner or relation is correct. Any repository-wide file-existence check that remains in a product verifier must be explicitly described as such; it cannot be presented as methodology integrity.

## Manual change procedure

When a methodology owner, Unit attachment or dependency changes, the editor reviews affected maps and command cards, edits every relevant copy, and records the review in the change description. Reviewers follow the links and compare the listed relationships with the changed source documents. There is no automated guarantee of completeness, currentness or link correctness, and a green product suite must never be reported as such a guarantee.

## Implementation order

1. Introduce the per-owner manual relation fields in command definitions and render them in Helper. Migrate existing commands deliberately; do not fabricate links by scraping Markdown or maps.
2. Keep the two committed maps editable by hand, and remove the proposed generation/parity architecture.
3. Remove or narrow methodology-specific assertions across the mixed test suite; retain and run product tests.
4. Retire or rewrite active methodology-integrity UC/Contract/Process and map-integrity wording so documentation matches the new manual policy.
5. Review the legacy `testing-planning/` statuses and bootstrap proportionality as separate editorial tasks. Run build and product checks, then prepare a cumulative repository changeset from a freshly verified base.

The former v44 audit remains evidence of what the old tests protected and a checklist for selective removal. Its parser/fixture phases are no longer the implementation plan.
