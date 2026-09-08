# Portable Planning Starter Kit

Status: active reusable bootstrap guidance
Scope: establish the minimum natural-navigation + semantic-owner architecture in another repository without imposing specialized methodology ontology.

## Create First

```text
README.md
planning/README.md
planning/AI-WORKING-CONTRACT.md          # when AI/chat work is used
planning/use-case-registry.md             # optional repository-specific operational UCs
planning/command-routing.md                # only when executable commands exist
planning/commands/                         # only when commands exist
```

For each substantial generic Documentation/repository capability family:

```text
README.md                                  # structural navigation when useful
use-case-registry.md                       # scoped functional navigation
actual Use-Case / Principles / Process / current owners
```

A specialized methodology/application owns its own semantic navigation. This generic Documentation starter kit does not prescribe another methodology's semantic types or ontology.

## Invariants

- every current Use-Case Registry covers all current Use Cases in its declared functional scope;
- every registered Use Case points to one canonical owner;
- neighboring scopes are reached structurally through README/navigation rather than copied into one global registry;
- every active operational Documentation methodology/supporting owner is reachable from at least one current Use Case, except deliberate README/independent-Theory exceptions;
- commands are optional shortcuts and do not become semantic authority;
- README/index routes rather than duplicating owner bodies;
- examples/projections are never authority;
- specialized methodologies own their own navigation and semantic types;
- bootstrap/setup guidance hands off to the current owners once those owners exist.

## External Reusable-Methodology Declaration

When another repository uses reusable methodology maintained elsewhere, put a short declaration near that repository's mandatory natural entry (normally root README / planning entry). The declaration should identify the external repository and its reusable documentation entry without copying the methodology locally.

For this methodology:

```text
Reusable methodology repository:
  https://github.com/AlexPastukhh/obs-planning-docs

Reusable documentation entry:
  planning/documentation/README.md
```

The local repository owns its project/current meaning. The linked repository owns reusable methodology.
