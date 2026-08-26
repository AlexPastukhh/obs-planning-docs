# Enman Slice / Frontend / Cross-Cutting Findings

Status: source-grounded methodology note

Checked:
- current Enman routing example;
- current reusable Slice workflow;
- application-planning principles;
- Scenario/Domain/Slice profile;
- Requirements/Change Context.

## Enman Evidence

The Enman file is routing/demo only. It distinguishes:

```text
slice
server/backend/API
client sidecar
```

This supports independent client/server planning surfaces but does not define a canonical frontend-architecture methodology.

## Cross-Cutting Evidence

Current reusable Slice workflow explicitly defines:

```text
shared/cross-cutting rule applies here
≠ this Slice owns the whole concern
```

and asks for canonical owner, local integration, delegated/shared remainder and local proof obligation.

## Frontend Evidence

Current principles state:

```text
Screen owns spatial requirements
Scenario owns behavior
frontend Slice planning owns implementation mechanism
```

The current profile allows focused `frontend.md` / `server.md` part plans while the integrated Slice remains authority.

## Methodology Extension

```text
TM-IMPLEMENTATION-SLICE
  normal one-Scenario vertical Slice

TM-FRONTEND-SLICE
  specialized frontend realization/architecture Target

TM-CROSS-CUTTING-CONCERN
  shared non-vertical implementation Target
```

These exact Target Modules are a deliberate methodology extension, not existing Enman canonical owners.
