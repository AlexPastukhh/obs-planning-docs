<a id="testing-methodology-integrity"></a>
# Methodology Integrity Testing Contract

Responsibility ID: `TESTING.METHODOLOGY-INTEGRITY`

Status: active Core testing contract

## Purpose

Own the reusable rules for **hard integrity tests that protect methodology declarations, routing, references and derived projections without becoming a second semantic authority**.

This contract applies to repository tests such as:

```text
canonical owner / registry / command declaration
→ typed relationship or declared inventory
→ generated catalog / Helper consumer / bootstrap route
→ hard integrity test
```

It does not decide what the methodology *should* mean. The canonical owner does that.

## Authority Direction

```text
canonical semantic owner / registry / command declaration
  = authority

generated catalog / Helper projection
  = projection or consumer

integrity test
  = consistency guard
  ≠ semantic owner
```

A failing integrity test means consistency must be investigated. It does **not** automatically mean the intended methodology change is wrong.

## Hard Integrity Eligibility

Use a hard-failing test only when the expected fact can be derived deterministically from an existing canonical contract, for example:

```text
repository-local path exists with exact case
explicit/Markdown anchor resolves
Responsibility/semantic-owner ID + path identify the same canonical owner, while the relation-specific anchor role is also valid
registry-declared item routes to an existing owner
canonical typed declarations exactly match their projection
command typed binding satisfies its declared surface contract
no duplicate identity/reference exists where the canonical model requires uniqueness
```

Do not hard-fail on subjective architecture quality such as "too many files", "bootstrap feels large", naming preference, wording preference or a prose interpretation that is not structurally declared.

Those concerns belong to Lens/review/lint Findings unless a canonical owner first promotes them to an explicit machine-checkable invariant.

## No Second Authority

Expected meaning must be **derived**, not manually restated.

Avoid tests such as:

```js
assert.equal(profileCount, 3)
assert.equal(lensCount, 28)
assert.equal(edgeCount, 101)
```

unless that exact cardinality is itself an intentional canonical contract.

Prefer:

```text
current registry inventory
→ derive expected identities
→ compare consumer/projection exactly
```

A legitimate registry addition/removal must therefore be able to pass without editing a frozen count in the test.

## Typed Relations Stay Distinct

Shared reference mechanics do not merge semantic relation types.

```text
Semantic Owner Dependency
≠ Unit → Lens Attachment
≠ command ownerRef
≠ bootstrap read/reference
≠ ordinary Markdown navigation link
```

The relations may reuse the same repository path/anchor/identity resolver, but each relation keeps its own parser, authority and projection semantics.

Ordinary Markdown links remain navigation unless a canonical typed contract explicitly gives them stronger meaning.

## Canonical Owner Identity And Anchor Role

When a reference claims a semantic owner, validate the owner identity and the anchor role separately rather than overclaiming what the document structure proves.

Canonical owner identity is:

```text
Responsibility ID / semantic component ID
+ repository path
```

The `anchor` is relation-specific:

```text
command ownerRef
  → read entrypoint inside the canonical owner file

Semantic Owner Dependency
  → canonical owner anchor of the declared Responsibility ID

Unit → Lens Attachment
  → canonical Lens owner anchor

bootstrap/navigation read
  → valid declared read entrypoint according to that relation's contract
```

For a command `ownerRef`, the anchor must exist explicitly in the canonical owner file and must not be the canonical owner anchor of a different Responsibility declared in that same file. Do **not** infer stronger subsection ownership from physical Markdown placement unless the owner formally declares such a mapping.

For a typed `Semantic Owner Dependency`, the owner link must use the canonical owner anchor for the declared Responsibility. If a narrower explanatory subsection is useful for prose navigation, keep that ordinary navigation link separate from the typed dependency declaration.

A valid Responsibility ID combined with another owner's path is invalid. A relation-specific anchor that violates its declared role is also invalid.

Exact-case repository path checks are part of this integrity boundary where the repository treats path casing as significant.

## Consumer Direction During Transition

The standing Unit/Lens Attachment Map and Target Module/Lens Dependency Map were retired. An AI audit command may assemble a temporary table from current owner declarations; that table is not a stored projection, semantic authority or automated integrity proof. A command's `ownerRefs` are declared in its command file. For command cards, Helper presents that direct list without adding owner-internal dependency or attachment links. Generic semantic-component cards without a direct command may still show their own semantic owner.

Other generated consumers remain subject to their own product/build contracts. The wider methodology-integrity-test architecture in this document is pending separate retirement under the on-demand audit decision; do not infer that a green test suite validates an AI-produced relation table.

## Command Owner Boundary

`command.ownerRefs` is the source of the command's direct owner list. Included commands retain their own owners; dependencies and Unit attachments inside owner documents do not become command owners. The Helper does not display those internal relations on command cards.

## Shared Resolver, Independent Semantic Adapters

Reuse low-level mechanics where doing so removes inconsistent path/anchor implementations:

```text
repository-local path resolution
exact-case validation
anchor resolution
Responsibility/semantic-owner identity resolution
duplicate-reference detection
```

Keep dependency, attachment, command-owner and bootstrap adapters separate.

Do not build one untyped "everything links to everything" graph.

## Parser / Oracle Independence

A shared parser/resolver can create correlated false confidence if the projection producer and the test oracle both trust the same unproved bug.

Therefore:

1. low-level shared parsers/resolvers receive focused contract tests/fixtures;
2. supported declaration forms receive positive fixtures;
3. wrong target/path/anchor/identity and malformed/duplicate forms receive negative fixtures where material;
4. any retained consumer-parity test may reuse a verified resolver, but must not claim to prove an AI-produced audit table.

## Positive And Negative Controls

Hard-integrity test quality requires both directions.

Negative controls demonstrate that material breakage is caught, for example:

```text
broken path/anchor → FAIL
Responsibility ID/path mismatch or relation-specific anchor-role violation → FAIL
projection row removed/added without authority change → FAIL
duplicate declared identity → FAIL
invalid typed command binding → FAIL
```

Positive controls demonstrate that the guard does not overreach, for example:

```text
harmless prose rewrite → PASS
legitimate registry growth/shrink → PASS
consistent canonical owner rename + dependent-reference update → PASS
reordering that preserves declared semantics → PASS
```

A test that catches breakage but blocks these legitimate changes is not yet a high-quality hard-integrity test.

## Escape Risk And Refactor Risk

Apply the normal Test Proof Lens questions to the integrity guard itself:

```text
Escape Risk:
  can the declared relationship be wrong while this test stays green?

Refactor Risk:
  can the declared relationship remain correct while a harmless prose/layout/refactor change makes this test fail?
```

Prefer structural declarations over prose regex matching when a structural source exists.

## Delegated / Not-Proved-Here Boundary

When useful, record what a test intentionally does **not** prove because another owner/layer proves it.

Example:

```text
this test proves canonical owner identity plus the declared relation-specific anchor rule
it does not prove that the owner's semantic rule is substantively correct
semantic review/Lens evaluation owns that question
```

This boundary prevents duplicate proof and false confidence. It does not transfer semantic authority.

## Shared / Cross-Owner Proof Coordination

When several methodology projections/consumers need the same reference mechanics, coordinate only what is truly shared:

```text
resolver/identity rules
fixture conventions
negative/positive control conventions
failure diagnostic format
```

Do not centralize relation-specific semantics merely to maximize reuse.

When shared test data, fixture, reset, environment or concurrency/isolation policy is material, make that policy explicit and avoid redundant re-proof at every layer.

## Failure Diagnostic Contract

Hard-integrity failures should tell the maintainer/AI what the failure *means* and where to investigate.

Preferred diagnostic shape:

```text
[Methodology Integrity]
Invariant: <stable invariant code>
Source: <owner/test subject>
Problem: <precise inconsistency>

What this usually means:
  Something may have been added, removed, renamed, moved or rebound
  without updating all dependent declarations/projections.

What to check:
  1. Was the canonical methodology change intentional?
  2. Is the canonical owner/declaration correct?
  3. Are dependent projections/consumers updated consistently?
  4. If the change was accidental, restore the intended declaration.

Do not update/weaken the test merely to make it pass.
```

Tests should also contain a short source comment explaining this repair protocol.

## Change Protocol

When an integrity test fails after a methodology change:

```text
1. identify the canonical owner/declaration first
2. decide whether the semantic change was intentional
3. if accidental → restore the intended declaration
4. if intentional → update affected typed references/projections/consumers
5. change the invariant/test itself only when the canonical integrity contract changed
6. rerun focused controls + broader repository verification
```

Never treat "make the test green" as the primary objective.

## Practical Campaign Sufficiency

When an integrity proof requires repeated runs/environments rather than a single deterministic check, define proportionally:

```text
representative variants/environments
minimum sufficient Evidence set
stop/pass criterion
conditions that expand the campaign
```

Planned campaign scope is not executed Evidence.

## Boundary

```text
hard integrity test
≠ semantic review
≠ architecture taste checker
≠ frozen inventory snapshot by default
≠ projection authority
≠ excuse to encode prose wording as contract
```

The normal [`LENS-TEST-PROOF-EVIDENCE`](../../lenses/reusable/LENS-TEST-PROOF-EVIDENCE.md#lens-test-proof-evidence) remains the evaluation Lens for proof quality. This contract specializes how that proof-quality reasoning is applied to methodology integrity guards.
