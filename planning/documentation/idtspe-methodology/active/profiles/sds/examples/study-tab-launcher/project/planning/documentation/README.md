# Study Tab Launcher — Documentation

Status: current semantic-owner and future-transition navigation.

Methodology bindings in the owner files resolve to the pinned
[IDTSPE/SDS snapshot `(100)`](idtspe-methodology/SNAPSHOT-PROVENANCE.md)
copied from the user-supplied archive. The snapshot is reference governance;
application meaning remains in the owners listed here.

> Semantic Owner Dependency
> Type: `CONTEXTUALIZES`
> Owner: [Application Definition](application-definition.md),
> [selected Evolution Step](evolution/unrealized/close-superseded-project-windows.md),
> [SDS Application Definition method](idtspe-methodology/active/profiles/sds/target-modules/TM-APPLICATION-DEFINITION.md),
> [SDS Evolution Step method](idtspe-methodology/active/profiles/sds/target-modules/TM-EVOLUTION-STEP.md)

The Application Definition owns application need, selected/possible Benefits,
contribution and Benefit-local responsibility boundaries/constraints. Current
Feature, Scenario, Screen, Domain, Slice and Shared files describe only
realized downstream meaning. Materially selected but unrealized behavior stays
in an Evolution Step until implementation and proof justify owner
materialization.

Benefit-reference convention: downstream owners link the complete `AB-*` when
they realize or manifest the whole relevant Benefit contribution. When they
realize only a branch or must preserve one particular limit, they additionally
link the exact `Responsibility Boundary / Constraints` anchor in the
[Application Definition](application-definition.md#ru-app-03--application-benefits).
Benefit-local boundary/constraint meaning is required by the pinned SDS
[`TM-APPLICATION-DEFINITION`](idtspe-methodology/active/profiles/sds/target-modules/TM-APPLICATION-DEFINITION.md#sds-application-benefit-boundary-constraints).
The additional exact-anchor linking convention is local representation
practice for this repository.

## Canonical current owners

- [APP-STL — Application Definition](application-definition.md)
- Features:
  [file context](features/open-linked-file-context.md),
  [folder window](features/open-linked-folder-window.md),
  [ZIP extraction](features/extract-open-archive.md),
  [adaptive project open](features/open-local-project.md), and
  [trusted-copy publication](features/copy-trusted-project.md)
- Scenarios:
  [file context](scenarios/open-selected-study-files.md),
  [folder](scenarios/open-selected-folder.md),
  [ZIP](scenarios/open-downloaded-archive.md),
  [adaptive project](scenarios/open-selected-project.md), and
  [trusted copy](scenarios/copy-trusted-project.md)
- Screen:
  [ChatGPT launcher widget](screens/chatgpt-launcher-widget.md)
- Domain Value Objects:
  [FileTarget](domain/local-file-target.md),
  [FolderTarget](domain/local-folder-target.md),
  [ZipArchiveTarget](domain/local-zip-archive-target.md), and
  [ProjectSelector](domain/local-project-selector.md)
- Durable Slices:
  [file context](slices/open-linked-file-context.md),
  [folder window](slices/open-linked-folder-window.md),
  [ZIP extraction](slices/extract-open-archive.md),
  [adaptive project open](slices/open-local-project.md), and
  [trusted-copy publication](slices/copy-trusted-project.md)
- Shared Implementation Capabilities:
  [local-path authority](shared/local-path-authority.md),
  [safe project publication](shared/safe-project-publication.md), and
  [prepared project handoff](shared/prepared-project-handoff.md)

<a id="current-realization-ownership-map"></a>
## Current realization ownership map

This table is navigation/coordination, not a second owner of behavior or
implementation requirements.

| Feature | Durable Slice | Domain owners | Shared capabilities |
|---|---|---|---|
| [File context](features/open-linked-file-context.md) | [File-context Slice](slices/open-linked-file-context.md) | [FileTarget](domain/local-file-target.md) | [Local-path authority](shared/local-path-authority.md) |
| [Folder window](features/open-linked-folder-window.md) | [Folder Slice](slices/open-linked-folder-window.md) | [FolderTarget](domain/local-folder-target.md) | [Local-path authority](shared/local-path-authority.md) |
| [ZIP extraction/opening](features/extract-open-archive.md) | [Archive Slice](slices/extract-open-archive.md) | [ZipArchiveTarget](domain/local-zip-archive-target.md), [FolderTarget](domain/local-folder-target.md) | [Local-path authority](shared/local-path-authority.md), [safe project publication](shared/safe-project-publication.md) |
| [Adaptive project open](features/open-local-project.md) | [Project Slice](slices/open-local-project.md) | [ProjectSelector](domain/local-project-selector.md), [FolderTarget](domain/local-folder-target.md), [ZipArchiveTarget](domain/local-zip-archive-target.md) | [Local-path authority](shared/local-path-authority.md), [safe project publication](shared/safe-project-publication.md), [prepared handoff](shared/prepared-project-handoff.md) |
| [Trusted-copy publication](features/copy-trusted-project.md) | [Trusted-copy Slice](slices/copy-trusted-project.md) | [ProjectSelector](domain/local-project-selector.md), [FolderTarget](domain/local-folder-target.md), [ZipArchiveTarget](domain/local-zip-archive-target.md) | [Local-path authority](shared/local-path-authority.md), [safe project publication](shared/safe-project-publication.md), [prepared handoff](shared/prepared-project-handoff.md) |

## Evolution navigation

- [Evolution Steps Map](evolution-steps.md) owns Step registry, relations and
  readiness navigation.
- [EVO-STL-CLOSE-SUPERSEDED-PROJECT-WINDOWS](evolution/unrealized/close-superseded-project-windows.md)
  is the selected, unrealized next transition. Its future Feature, Domain,
  Slice and replacement Scenario bodies must not be read as current behavior.
- `evolution/unrealized/` contains concrete future Step owners;
  `evolution/realized/` contains compact lineage whose current meaning has
  already moved to the owners above. Directory membership does not replace the
  Planning Position in the map/Step.

## Resolution and practical evidence navigation

- [Resolution Carry-Forward](resolution-carry-forward.md) projects open Q/R/P,
  Practical Test needs and durable accepted Decision links without becoming a
  competing owner.
- [Installed browser-to-VS Code handoff](practical-tests/installed-browser-vscode-handoff.md)
  owns the current real-system evidence plan/result.
- [Installed superseded-window cleanup](practical-tests/project-succession-multi-window.md)
  owns the future Step's real multi-window evidence plan/result.
- [SDS documentation audit](sds-documentation-audit.md) records conformance
  review and repair history against methodology snapshot `(94)`; it is working
  evidence, not current methodology status or application semantic authority.
- [Current SDS methodology conformance review](sds-methodology-conformance-review.md)
  records Findings and repair dispositions against snapshot `(100)`.

Accepted design selections formerly held in standalone provenance drafts now
live as `DEC-*` blocks in their natural Feature, Domain, Slice or Shared owners
and are projected by Carry-Forward. The retired Slice Strategy artifact is not
part of the current SDS document set.

## Representation boundary

Application, Feature, Scenario and Screen meaning remains human-readable for
review outside literal code. The four current Domain owners retain distinct,
non-obvious value validity rules. Exact request schemas, parsing, path
normalization, coordinator protocol, DOM/CSS and executable proof remain
implementation-native.

The selected succession transition justifies its own future Domain and Slice
owners because manifest semantics and authenticated cross-window coordination
are new target-state contracts. Those files are created only when the Step is
realized; current Slice/Shared owners expose reverse revalidation links without
materializing the future owners early.

No Aggregate Root or generic Test Strategy owner is currently justified.

## Implementation representation layout

Code mirrors the durable documentation ownership without making the filesystem
a second semantic authority:

- `src/features/<feature>/` contains end-to-end Feature orchestration and its
  feature-specific VS Code gateways;
- `src/domain/<domain-owner>/` contains target identity/validity/resolution;
- `src/shared/<capability>/` contains reusable path, publication and prepared
  handoff mechanisms; common wire/request parsing remains
  `src/shared/contracts.ts`;
- `src/extension.ts` is the application composition root.

Tests mirror the responsibility they primarily prove under `test/features`,
`test/domain` and `test/shared`; extension wiring belongs to
`test/application`, while the userscript Screen belongs to `test/screens`.
This placement is navigation only: Feature/Domain/Shared meaning remains owned
by the documentation artifacts above.
