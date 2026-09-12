# Implementation Slice Supporting Template

Status: active supporting template; canonical semantic contract is `TM-IMPLEMENTATION-SLICE`.

Use only when a human-readable transient Slice Discovery representation is useful under Documentation / Representation. This template does not create a separate frontend/backend planning family, a Slice Strategy Target, or a durable Slice owner automatically.

Canonical owners:

- `../../idtspe-methodology/active/profiles/sds/target-modules/TM-IMPLEMENTATION-SLICE.md`
- `../../idtspe-methodology/active/profiles/sds/target-modules/TM-SLICE-OWNER.md` when durable Slice responsibility is independently justified
- `../../idtspe-methodology/active/profiles/sds/ARTIFACT-PLACEMENT-MAP.md`

## Suggested Current Shape

```text
# <Slice ID / useful end-to-end result>

Feature / BR-* source

RU-SLICE-01 — Whole-Slice Responsibility / Candidate Structure
  <what one end-to-end realization is responsible for; candidate structure only as useful>

RU-SLICE-02 — Semantic Application Entry / Result Boundary
  <where application semantics enter this Slice and what semantic result leaves it>

RU-SLICE-03 — Step-by-Step End-to-End Realization
  <material UI/application/domain/shared/persistence/external/effect/recovery path>

RU-SLICE-04 — Feature Integration Proof
  <what must be observed to show the selected Feature behavior is integrated end-to-end>

RU-SLICE-05 — Evolution / OPEN Slice Pressure
  <only known selected evolution or unresolved pressure that materially affects the Slice>
```

All Result Units are sparse. Omit a Unit or internal detail when it is not material; do not write `N/A` merely because the template shows the possible surface.

## Ownership Boundary

```text
Feature
→ behavior / BR-* authority

TM-IMPLEMENTATION-SLICE
→ transient whole-Slice discovery

optional TM-SLICE-OWNER
→ durable end-to-end Slice responsibility + owner-local IR-SLICE-*

Domain / Shared
→ their own semantic/implementation responsibility
```

A material finding against Feature/Domain/Shared meaning returns through Core Finding/Proposal/revalidation mechanics. Slice planning does not silently rewrite upstream owners.

## Proof Boundary

`RU-SLICE-04` states integration-proof intent/meaning for the Slice result. Non-trivial proof allocation is evaluated through Core `LENS-TEST-PROOF-EVIDENCE`; literal tests belong to Exact/code. `TM-PRACTICAL-TEST` is used only when evidence requires the real implemented subject/environment.

## Representation

```text
transient Slice Discovery
≠ dedicated Markdown file
≠ durable Slice owner
```

A small Slice may remain in current Work Context/Checkpoint representation. Persist this supporting file only when review/handoff/addressability value justifies it. Exact classes/methods/call graphs remain code authority.
