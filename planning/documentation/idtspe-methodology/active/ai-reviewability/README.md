# AI Reviewability — Peer Cross-Cutting Concern

Status: active independent cross-cutting concern  
Scope: make material AI outputs easy to review without becoming a semantic planning authority.

## Position In The Methodology

AI Reviewability is a **peer concern beside IDTSPE**, not a Target Module, not a Lens and not an SDS profile.

```text
AI Reviewability
→ how material AI output is exposed for human review

IDTSPE
→ how bounded planning Targets are formed, reasoned about, decided and handed off

SDS
→ one concrete planning profile on IDTSPE
```

IDTSPE/SDS may consume AI Reviewability presentation rules, but AI Reviewability does not own Target meaning or planning direction.

## Key Points Contract

Preserved generic principle:

> A material answer/output exposes its major material content as `Key Points` proportionally.

`Key Points` are a review/navigation projection over the body, not a second semantic owner. They should let a reader scan the material result quickly while the reasoning, evidence, examples and nuance remain in the surrounding text.

Key Points are not limited to final conclusions. Depending on the output, they may capture:

- current conclusions;
- alternatives and trade-offs;
- unresolved tension or uncertainty;
- material changes since the previous state;
- the key content of a logical discussion part.

Stable `KP-*` IDs are optional and mainly useful for long-lived review/discussion.

## Broad Discussion Specialization

In IDTSPE Broad Discussion, Key Points are the normal way to structure **material logical parts** of the conversational prose.

```text
logical discussion part
  explanatory reasoning / examples / trade-offs
  Key Points
    concise key content of this part

next logical discussion part
  ...
  Key Points
    ...
```

This is a specialization of the generic Key Points contract, not a replacement for it. Broad Discussion does not need a separate `block owner`, semantic-anchor record or per-response intake object merely to make the prose reviewable. The subject of a logical part should be understandable from the normal heading/content and from any explicit IDTSPE Question/Problem/Idea/Decision/Result references it contains.

An IDTSPE Integration Checkpoint may additionally include an optional **Broad Discussion Summary** describing what the accumulated discussion since the previous checkpoint materially established or changed.

```text
Key Points
= local review structure for material logical parts

Broad Discussion Summary
= optional checkpoint-level retrospective summary of accumulated discussion
```

Neither becomes semantic planning authority or persistence by default. Canonical IDTSPE interaction semantics live in [`../idtspe-core/shared/broad-discussion-and-integration-checkpoint-model.md`](../idtspe-core/shared/broad-discussion-and-integration-checkpoint-model.md).

## Boundary

```text
Key Points
= proportional key-content review projection
≠ second semantic owner
≠ replacement for evidence/reasoning/body
≠ mandatory new persistence object
```

Do not manufacture Key Points for trivial/non-material replies. Use them proportionally for material outputs; within Broad Discussion, use them to make the material logical parts easy to scan.

## Source Provenance

This contract selectively preserves the useful `Key Points` concept from:

```text
planning/documentation/ai-reviewability-and-directed-planning-principles.md
repository base ca768b61b2c84d6cda6c27b4ace7c4fc87d404e7
```

Other old AI-reviewability rules are not automatically imported merely because they shared that source file.
