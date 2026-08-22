# Review Dependencies Repository Contract

Status: active repository-facing contract
Scope: semantic whole-file dependencies that require explicit downstream review after source meaning changes. This contract is intended to be executable by OBS Linked Notes, humans and AI agents working directly with repository files.

## Core model

A Review Dependency is one explicit relation:

```text
source file
→ consumer file
→ reason / meaning consumed
→ optional review scope
```

The registry is `.linked-notes/review-dependencies.json`. It stores routing and relation meaning. It does not store source content or the reviewed fingerprint.

Each consumer relation has one live marker in the recorded consumer file:

```text
<!-- obs-review:dependency id="rd_example1" against="sha256:<64 lowercase hex>" -->
```

A newly created relation may omit `against` until its first review:

```text
<!-- obs-review:dependency id="rd_example1" -->
```

Marker-looking text inside fenced code blocks or inline code is example/code content, not a live Review Dependency marker.

## Fingerprint contract

`against` means: **this consumer relation was explicitly reviewed against this source-file state**.

The current source fingerprint is computed from the effective source text:

1. use pending local text when one exists; otherwise use the current repository text;
2. remove live `obs-review:dependency` bookkeeping comments outside Markdown code/example ranges; when such a marker occupies its own otherwise-empty line, remove that bookkeeping-only line separator too;
3. normalize `CRLF` and bare `CR` line endings to `LF`;
4. do not trim or collapse any other whitespace;
5. encode as UTF-8;
6. compute SHA-256;
7. render as `sha256:<64 lowercase hex>`.

Dependency bookkeeping comments are excluded so completing review for `A → B` does not by itself change the semantic fingerprint of B and falsely stale `B → C`.

## Status

```text
against == current source fingerprint
→ CURRENT

against missing
→ NEEDS REVIEW

against != current source fingerprint
→ NEEDS REVIEW

source / consumer / registry / marker cannot be resolved safely
→ UNRESOLVED
```

Changing `reason` or `reviewScope` does not acknowledge review.

## Registry schema

Schema version 1:

```json
{
  "schemaVersion": 1,
  "dependencies": [
    {
      "id": "rd_example1",
      "sourcePath": "docs/source.md",
      "consumerPath": "docs/consumer.md",
      "reason": "Depends on this source file.",
      "reviewScope": "Optional explanation of what should be checked."
    }
  ]
}
```

Rules:

- `id` is stable and matches `rd_[A-Za-z0-9][A-Za-z0-9_-]{2,63}`;
- paths are safe repository-relative paths;
- source and consumer are different files;
- one source/consumer pair has at most one Review Dependency relation;
- `reason` belongs to the individual relation and is required; when no more specific meaning is supplied, use `Depends on this source file.`;
- `reviewScope` is optional and should state what specifically needs checking when useful;
- the consumer file contains exactly one live marker for the registered relation ID.

## Review workflow

When a source fingerprint no longer matches `against`:

```text
read source
→ read consumer
→ read reason / optional reviewScope
→ perform semantic review
→ update consumer meaning when needed
→ only after review is complete, write current source fingerprint into against
```

Linked Notes exposes `Review complete` as the convenience action. That button does not perform semantic review; it records the current fingerprint after the user has completed it.

An AI agent may perform the same operation directly: calculate the fingerprint by this contract and replace the relation marker's `against` value only after the review is actually complete.

If the source is currently a pending local file, `against` may intentionally refer to that pending source state. Publish the source change together with the acknowledgement when the remote repository is expected to remain current after publication.

## Cascade rule

For `A → B → C`:

- A content change makes A→B `NEEDS REVIEW`;
- reviewing B without changing B semantic content changes only its bookkeeping marker, which is excluded from B's fingerprint, so B→C remains current;
- if B semantic content changes during review, B's fingerprint changes and B→C becomes `NEEDS REVIEW`.

Do not create blind transitive review avalanches and do not mutate consumers automatically.

## Reference Object boundary

Review Dependencies do not replace Reference Objects. A materialized `obs-ref:use` remains literal-content based: it is stale when its content differs from canonical `obs-ref:def`. A bounded `obs-ref:depend` fragment is a different Reference Object relation: its semantic review acknowledgement is stored under that object in `.linked-notes/reference-objects.json` and becomes `NEEDS REVIEW` when either the exact canonical-value fingerprint or the exact reviewed-fragment fingerprint changes. Use whole-file Review Dependencies only when the review obligation is source-file → consumer-file rather than Reference-Object-value → bounded fragment. Do not duplicate either relation merely to express an ordinary semantic link.
