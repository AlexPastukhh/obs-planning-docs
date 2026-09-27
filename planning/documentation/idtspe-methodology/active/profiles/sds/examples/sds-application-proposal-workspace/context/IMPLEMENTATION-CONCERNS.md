# Implementation Concerns — Structured Knowledge / Hybrid B

Semantic role: implementation/feasibility exploration supporting the Application Definition; **not** an additional `TM-APPLICATION-DEFINITION` Result Unit.

Related:
- [Application Definition](../application/APPLICATION-DEFINITION.md)
- [Planning Resolution State](../planning/PRS.md)

Benefit mapping:
- `AB-01` — controlled structured knowledge without losing Markdown;
- `AB-02` — reliable AI inspection and verification;
- `AB-03` — deterministic composition of AI commands.

Derived views, validation, reverse dependencies, rendering, and similar items below are implementation mechanisms or scenario enablers, not additional Application Benefits.

## Trial direction for evidence

For the first spike, use **Hybrid B**:

```text
structured fields / identities / refs / derived values
→ CUE

long-form authored prose
→ Markdown-oriented fragments

CUE evaluation + validation
+ thin renderer
→ ordinary Markdown documents

ordinary Markdown documents
→ GitHub / human / AI consumption
```

The goal is to change the implementation beneath the documentation without materially changing the documentation experience.

## IC-01 — Canonical ownership split

We need an explicit rule for which content is authored in CUE and which content is authored as Markdown fragments.

Initial bias:

- CUE: IDs, kinds/types, fixed fields, relations, Lens Attachments, command dependencies, canonical refs, enum-like state, derivation inputs, validation constraints.
- Markdown fragments: substantial explanatory prose, rationale, examples, long guidance where rigid structure adds little value.
- Generated full Markdown documents: read/consume/review surface; not hand-edited when their content is generated.

Risk: if the split is unclear, the system can recreate the same “two sources of truth” problem it is intended to remove.

## IC-02 — Preserve the existing Markdown shape

Generated documents should retain familiar:

- headings;
- anchors;
- relative links;
- code blocks;
- prose order;
- navigation behavior;
- GitHub readability.

The first spike should demonstrate that a real existing-style Target Module can be projected with little or no visible presentation degradation.

## IC-03 — Stable semantic addresses

References should target semantic identity rather than physical line numbers or fragile Markdown headings.

Desired conceptual shape:

```text
TM-FEATURE.lens_attachments
TM-FEATURE.units.RU-FEAT-03.result_contract
```

Open implementation detail: whether the address is represented directly by CUE paths, by explicit stable IDs, or by a small convention combining both.

Moving a source file should ideally not invalidate semantic references.

## IC-04 — Reference semantics

Different behaviors may be needed:

- live reference to canonical current value;
- derived value/query over a set of objects;
- historical/pinned snapshot for evidence or past execution;
- relation that points to another object without copying its content.

Do not overload one `$ref` concept until the required semantics are clear.

## IC-05 — Derived Markdown views (supports AB-01 / AB-02)

The first useful derived view should be the Lens Attachment Map:

```text
all Target Modules
→ read canonical lens_attachments
→ generate one Markdown map
```

Later candidates:

- Lens → Target Modules using it;
- Target Module → Units;
- Command → includes;
- Command → effective canonical refs;
- registries and navigation indices.

Derived views must be visibly generated/read-only and must not become semantic owners.

## IC-06 — Renderer boundary

CUE can produce structured/concrete data, but the full Markdown rendering layer should remain thin and replaceable.

Open choice:

- simple custom TypeScript renderer;
- Handlebars/Nunjucks-like templates;
- another minimal deterministic template mechanism;
- CUE text rendering only for very small cases.

Domain logic should stay out of templates where possible.

## IC-07 — Build and validation pipeline (supports AB-01)

Expected baseline:

```text
edit structured/prose sources
→ CUE validate/evaluate
→ render Markdown
→ compare/check generated output
→ CI pass/fail
```

GitHub Actions can later enforce that committed Markdown projections are synchronized with their sources.

Useful failure classes:

- missing required field;
- invalid type/value;
- broken semantic reference;
- invalid structured relation;
- generation failure;
- generated Markdown out of date.

## IC-08 — Authoring ergonomics

A technically correct model is insufficient if editing becomes much harder than Markdown.

The spike should test:

- whether common edits remain obvious;
- whether AI can make safe changes to the structured source;
- whether prose authors can mostly stay in Markdown fragments;
- whether error messages identify the real semantic location;
- whether one normal change touches a reasonable number of source files.

## IC-09 — Reverse dependencies / impact analysis (supports AB-01 / AB-02)

CUE provides evaluation and validation primitives, but our desired UX may eventually require an additional index for questions such as:

```text
who depends on TM-FEATURE.lens_attachments?
what generated views will change?
which commands consume this contract?
```

Do not build this upfront. First establish whether the structured model exposes enough stable dependency information to derive it cheaply.

## IC-10 — AI inspection / consumption (supports AB-02)

The baseline AI path should remain:

```text
GitHub
→ Markdown navigation
→ owner document / generated view
```

Optional later additions:

- normalized JSON export;
- dependency/index JSON;
- MCP/API tools such as `get_field`, `find_references`, or `impact_analysis`.

These are enhancements, not prerequisites for the first useful repository.

## IC-11 — Command composition is a later consumer of the same substrate (supports AB-03)

Command Composition should reuse the same structured identity/reference foundation but remain a distinct implementation area.

Expected future behavior:

```text
selected commands
→ recursively expand includes
→ deduplicate shared nodes
→ topological order
→ merge typed contributions
→ validate conflicts
→ emit one effective AI command
```

NixOS module-system semantics are a useful architectural reference for typed composition/merge behavior, but no command technology is selected yet.

## IC-12 — Incremental migration

Avoid a big-bang rewrite.

A sensible first migration slice:

1. define minimal CUE schemas for `TargetModule` and `Lens`;
2. migrate two or three real objects;
3. keep their long prose as Markdown fragments;
4. generate one normal owner Markdown file;
5. generate Lens Attachment Map;
6. validate through CI;
7. compare generated output and authoring ergonomics with the current repository.

Only expand the structured surface when that experiment demonstrates clear value.

## IC-13 — Reproducibility and generated-file policy

If generated Markdown is committed, the build must be deterministic enough that identical sources produce identical files.

Need to define:

- tool/runtime version pinning;
- generated-file headers;
- stable ordering;
- newline/format policy;
- CI check for stale generated content.

This matters because noisy generated diffs would reduce the usefulness of Git review.

## Current implementation conclusion

Do not build a database, full UI, custom language, or general-purpose semantic engine yet.

Prove:

```text
CUE + Markdown fragments
→ validated structured source
→ same-quality Markdown
→ one live derived view
```

If that works comfortably, extend the substrate. If it does not, reassess CUE or the source split before building more layers.
