# Solution / Application Planning Supporting Knowledge

Status: active supporting knowledge index; **not** the canonical SDS profile

## Purpose

This area preserves reusable pre-Application discovery/research/prototype knowledge and older application-planning workflows that can support IDTSPE Resolution. Canonical SDS semantic ownership is elsewhere:

- [`../idtspe-methodology/active/profiles/sds/README.md`](../idtspe-methodology/active/profiles/sds/README.md)
- [`../idtspe-methodology/active/profiles/sds/shared/directed-methodology-workflow-and-next-step-resolution.md`](../idtspe-methodology/active/profiles/sds/shared/directed-methodology-workflow-and-next-step-resolution.md)
- [`../idtspe-methodology/active/profiles/sds/target-modules/README.md`](../idtspe-methodology/active/profiles/sds/target-modules/README.md)

This directory must not define a parallel Domain Draft / frontend/server Slice / WEUC SDS lifecycle.

## Upstream Discovery

When there is no trusted explicit own-Application intent, use generic Need / Real-Life Solution Discovery:

[`../idtspe-methodology/active/idtspe-core/shared/solution-discovery-workflow.md`](../idtspe-methodology/active/idtspe-core/shared/solution-discovery-workflow.md)

Useful supporting owners here include current-reality review, whole-solution comparison, existing-solution research, Application Concept/prototype knowledge and selected detailed-planning references. Their output becomes Source/Evidence/Resolution input for canonical IDTSPE/SDS owners; it does not establish a second Scenario/Domain/Slice authority.

## Canonical Handoff

```text
optional Need / Solution Discovery
→ TM-APPLICATION-DEFINITION when an own-Application boundary is material
→ optional TM-PROTOTYPE
→ TM-FEATURE as primary behavior owner
→ TM-SCENARIO-PLANNING when actor-to-Benefit journey composition is independently useful
→ TM-SCREEN when spatial/navigation composition is independently useful
→ TM-DOMAIN-DISCOVERY → optional TM-DOMAIN-OWNER
↔ TM-IMPLEMENTATION-SLICE → optional TM-SLICE-OWNER
→ TM-SHARED-IMPLEMENTATION-CAPABILITY only under genuine reuse pressure
→ Exact Realization / Evidence; Practical Test only when a real implemented subject/environment is required
```

Screens are conditional as defined by the current Target Module registry. There is no standalone Requirement, Cross-Cutting, Test Design or Test Strategy baseline Target: durable requirements stay in their natural Feature/Domain/Slice/Shared owner, shared implementation responsibility uses `TM-SHARED-IMPLEMENTATION-CAPABILITY`, and proof routes through the Core Test-Proof Lens / Exact / Practical Test as applicable.

## Representation

Mini/Modular/Full terminology is legacy compatibility only. Current SDS representation examples are LIGHT / MIXED / COMPLEX in:

[`../idtspe-methodology/active/profiles/sds/ARTIFACT-PLACEMENT-MAP.md`](../idtspe-methodology/active/profiles/sds/ARTIFACT-PLACEMENT-MAP.md)

Those examples are not schemas or mandatory file trees.

## Older Detailed Workflows

Files under this directory may remain useful as supporting theory/examples where they do not contradict current Target Module/Lens contracts. When wording conflicts, the active IDTSPE Core + SDS profile owners above win. New SDS semantics must be added to those canonical owners rather than extended here.
