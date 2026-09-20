# Command Helper Usage Metadata Extension

Status: **RETIRED — compatibility / provenance only**
Scope: historical contract for `helperPresentation.whenToUse` / `helperPresentation.whatYouGet`; not a current Helper semantic owner.

## Current Replacement

The current Planning Helper no longer maintains a separate Helper-only explanatory prose layer.

```text
semantic owner (UC / TM / Lens / General / Tool)
  = capability meaning

direct command definition / generic dispatcher
  = invocation body / aliases / permissions

canonical working Scenario
  = when / why / composition example

Planning Helper
  = Run + Body + Scenarios N projection
```

Canonical Scenarios are command-free: they point to semantic owners, not command IDs or trigger phrases. Helper derives Scenario command equivalents and the reverse `Scenarios N` index from those semantic references.

Current semantic command labels include their semantic classification and canonical ID, for example:

```text
План обновления · Core TM · TM-PRE-UPDATE-PLAN
Исследовать Domain · SDS TM · TM-DOMAIN-DISCOVERY
Domain Modeling / DDD · SDS Lens · LENS-DOMAIN-MODELING-DDD
```

## Compatibility Rule

Older cached or historical schema-v1 command definitions may still contain:

```json
{
  "helperPresentation": {
    "whenToUse": "...",
    "whatYouGet": "...",
    "navigation": {}
  }
}
```

The command codec may continue to parse this metadata so old caches/archives remain readable. It is not required on current command definitions, does not drive current semantic navigation and must not be regenerated as current explanatory authority.

Current navigation is derived from semantic identity (`USE_CASE`, `TARGET_MODULE`, `LENS`, `GENERAL`, `TOOL`) plus scope/profile. Current user-facing usage explanation comes from canonical Scenario prose.

## Migration Invariants

- do not add new `helperPresentation.whenToUse` / `whatYouGet` prose to current commands;
- do not derive current navigation from legacy `helperPresentation.navigation`;
- preserve old metadata only when reading historical/local cached content requires it;
- do not copy historical Helper prose into Scenario owners;
- if a material rule existed only in Helper presentation, move/fix it at the real semantic owner before removing the old projection;
- generated/generic semantic cards never pretend to be direct command files.

## Current Owner Route

- direct command contract: [`planning/commands/README.md`](../../../commands/README.md);
- command routing: [`planning/command-routing.md`](../../../command-routing.md);
- semantic command/Scenario projection: [`planning/documentation/tools/tampermonkey/chat-command-palette/README.md`](../../tools/tampermonkey/chat-command-palette/README.md);
- canonical methodology working Scenarios: [`planning/documentation/idtspe-methodology/active/idtspe-core/evaluation/USE-CASE-SCENARIO-MAP.md`](../active/idtspe-core/evaluation/USE-CASE-SCENARIO-MAP.md); repository/tool Scenario ownership remains with its repository workflow/scenario owners.
