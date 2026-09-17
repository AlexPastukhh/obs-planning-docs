# Replacement Package Reviewed Realization Composition

Status: active app-specific/external composition owner  
Scope: Replacement Package Builder + package protocol + Replacement Package App  
Not authority for: generic IDTSPE runtime, SDS Target semantics, Builder internal behavior, App internal behavior, package schema.

## Purpose

Compose the repository-wide IDTSPE realization/revalidation mechanics with the concrete Replacement Package producer/consumer applications without turning an R2 app-local workflow into a second generic runtime.

This guide answers only the app-specific question:

```text
when an exact repository result is ready to be realized,
how can that exact result be carried through the available
Replacement Package tooling without changing its approved meaning?
```

Generic methodology-use composition remains owned by the current Use-Case Registry Map and IDTSPE Use Cases. Exact artifact production remains owned by `TM-EXACT-REALIZATION`. Findings/re-entry remain Core responsibility.

## Authority stack

Use the owners in this order for their own meaning:

```text
methodology-use / current work composition
→ idtspe-methodology/active/idtspe-core/shared/compose-current-work-use-case.md

exact directly-integrable candidate
→ idtspe-methodology/active/idtspe-core/target-modules/TM-EXACT-REALIZATION.md

finding / stale-meaning re-entry
→ idtspe-methodology/active/idtspe-core/shared/finding-disposition-contract.md
→ idtspe-methodology/active/idtspe-core/shared/revalidate-current-work-use-case.md

current package producer
→ use-cases/UC-REPO-BUILD-REPLACEMENT-PACKAGE.md
→ build-replacement-archive-workflow.md

selected future Builder product semantics
→ tools/replacement-package-app/evolution-steps/EVO-RPKG-ESTABLISH-REPLACEMENT-PACKAGE-CONSTRUCTION.md
→ later EVO-RPKG-ADD-LOCAL-PACKAGE-VERIFICATION.md

package seam
→ tools/replacement-package-app/PACKAGE-PROTOCOL.md

current consumer realization behavior
→ tools/replacement-package-app/scenarios/SCN-RPKG-COMPLETE-REPOSITORY-WORK.md

planned future reviewed-result / PR / Finalize behavior
→ tools/replacement-package-app/scenarios/planned/SCN-RPKG-COMPLETE-REVIEWED-REPOSITORY-WORK.md
```

This composition file may say **which owner is consumed next**. It must not copy the detailed Behavior Requirements of those owners.

## Entry / applicability

Use this composition only when all material conditions hold:

```text
IDTSPE work is already active
+ upstream meaning is sufficient for exact realization
+ a bounded exact repository result/package candidate is useful
+ Replacement Package tooling is the selected realization transport
```

Do not invoke it merely because the repository happens to contain the Builder/App tools.

If Broad Discussion is still enough, remain there. If upstream behavior/Domain/Slice/architecture meaning is unresolved, resolve that meaning through the natural IDTSPE/SDS owner first.

## Fundamental approval boundary

A replacement package is an **execution/transport artifact**, not an approval mechanism for new durable meaning.

```text
material semantic change discovered
→ Proposal / natural-owner resolution
→ USER approval when required by current governance
→ current exact realization updated
→ only then package/build/apply that approved meaning
```

Package construction must stop if it exposes a previously unapproved material semantic change. `Apply Package` must never become the first approval opportunity for a durable Requirement/Decision/product/methodology change.

Mechanical archive metadata, package checksum or manifest details do not reopen semantic approval by themselves when they do not change source/result meaning.

## Route A — local exact realization, proof, then package

Use when the exact realization can be produced and meaningfully checked in the current working environment before package construction.

```text
current IDTSPE work
→ TM-EXACT-REALIZATION produces current RU-REAL-01
→ perform useful local integration/build/test/proof as authorized
→ Findings, if any, use Core Finding Disposition / targeted revalidation
→ revise RU-REAL-01 until current exact result is accepted/reviewable
→ USER review/approval at the normal governance boundary when material
→ build replacement package mechanically from that exact result
→ verify package payload corresponds to the reviewed exact result
→ hand package to current Replacement Package App route
```

The package is intentionally late in this route. Do not use package application as the discovery environment when the exact candidate can be reproduced and proven before packaging.

Useful pre-package checks, proportionally:

```text
literal result matches current RU-REAL-01
accepted owner/Requirement meaning has not drifted
relevant proof Evidence is current
add/replace/delete scope is exact
no unreviewed material semantic delta exists
```

These are checks over current Core/owner meaning, not a new app-local planning level.

## Route B — current package-producer transport with explicit semantic review

Use when a protocol-valid package is the selected transport but the future Builder Feature/Scenario model has not yet been realized/materialized.

```text
current IDTSPE work resolves the desired exact result
→ AI/human owns semantic work context and review decision
→ current package producer mechanically builds a protocol-valid package
→ exact package/source/result evidence is reviewed

NEEDS_CORRECTION
→ Finding Candidate
→ Core disposition / targeted revalidation
→ correct desired exact result
→ build a NEW package identity
→ review again

APPROVABLE
→ freeze the exact reviewed package/result intended for handoff
→ AI emits the exact consumer handoff
→ current Replacement Package App realizes the package
→ stop at the CURRENT App Scenario boundary
```

Do not attribute Issue creation, semantic branch creation or review authority to the retained legacy Builder target drafts. Those documents are Source/Evidence only.

Future Builder package-construction/verification product semantics become consumable here only after:

```text
EVO-RPKG-ESTABLISH-REPLACEMENT-PACKAGE-CONSTRUCTION
→ Exact Realization + proof/materialization
→ later EVO-RPKG-ADD-LOCAL-PACKAGE-VERIFICATION
```

Until then the current generic producer route remains the transport authority.

## Review checkpoints must remain distinct

Do not conflate these two facts:

```text
PRE-HANDOFF SEMANTIC REVIEW
= exact intended package/result was reviewed before consumer mutation
= currently owned by AI/human review over package/repository Evidence
= may later consume realized Builder verification behavior after its Evolution Steps materialize

POST-REALIZATION CONSUMER IDENTITY VERIFICATION
= actual authoritative published result is proven identical
  to the Builder-reviewed predicted result
= Replacement Package App product behavior
```

The first is valid now without assigning review authority to the legacy Builder target drafts. Future realized Builder verification may strengthen its mechanical proof without taking semantic review ownership from AI/human.

The second is **not implemented by the current App Scenario merely because the R2 workflow describes the intended composition**. Current App authority stops after exact package commit publication is proven.

## Current vs planned consumer boundary

### Current

```text
exact reviewed or otherwise approved package handoff
→ WorkId / Repository Target resolution
→ GitWorkspace
→ Apply
→ Commit
→ Publish / Retry Publish
→ exact package commit publication proven
→ STOP
```

Owner: `tools/replacement-package-app/scenarios/SCN-RPKG-COMPLETE-REPOSITORY-WORK.md`.

### Planned future

When the planned reviewed-result Scenario is actually implemented/promoted, the composition may continue:

```text
current published result
→ prove actual authoritative result identity
   == reviewed predicted result identity
→ ensure PR readiness
→ explicit Finalize under its own product preconditions
```

Until then, these steps remain planned/dependent product behavior. Do not report them as current Evidence.

## Identity invariant

The intended end-to-end invariant is stronger than visual/diff similarity:

```text
reviewed exact tuple
(package identity + expected source/result evidence as available)
→ exact handoff
→ real consumer realization
→ when supported by current product behavior:
   actual authoritative published result identity
   == reviewed predicted result identity
```

“Looks like the same diff” is not equivalent identity proof.

## Re-entry / invalidation

Any Evidence after review/package/application that materially changes the intended code/test/doc/result meaning invalidates the current exact candidate/handoff claim:

```text
new material Evidence/Finding
→ Core Finding Disposition
→ UC-IDTSPE-REVALIDATE-CURRENT-WORK when affected meaning may be stale
→ reopen the narrowest natural owner / exact realization
→ produce/review a new exact result
→ build a new package and review the new exact result again
```

Do not restart unrelated methodology or unaffected Targets.

## Optional depth

Neither route is a rigid script.

Use only the steps/components that are material in the current situation. Examples:

```text
small exact documentation replacement already reviewed
→ no new Target Module beyond Exact may be needed
→ package mechanically

non-trivial code change with available local tests
→ Exact + local proof before package may be useful

consumer-sensitive file transformation
→ package replay/verification Evidence may be useful, but current semantic review remains AI/human-owned until the selected Builder verification Step is materialized
```

The composition adapts to context; it does not replace the always-active proportional IDTSPE Use-Case loop.

## R2 lineage

This file is the Pass-12 destination for the app-specific remainder of:

- `documentation-use-cases/ai-session-work.md` / `DOC-UC-19` execution-workflow variants;
- `session-methodology/proposal-and-approval.md` / Replacement package proposal boundary;
- `session-methodology/implementation-workflows.md` / final literal candidate and Workflow A/B package composition.

Reusable generic semantics from those R2 blocks are already owned by current Documentation/IDTSPE/SDS methodology. Their remaining Builder/App/package composition stays here rather than being promoted into Core or SDS.
