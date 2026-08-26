# LENS-NEED-VALUE-SCOPE — Need / Value / Scope

Lens ID: `LENS-NEED-VALUE-SCOPE`  
Legacy alias: `L1`  
Activation: `REQUIRED_CORE`

## Purpose

Keep planning tied to a real Need/useful result and choose the right bounded Target/question/answer rather than allowing a proposed solution to justify itself.

## Applicability Gate

Always check for a material IDTSPE choice. Trusted upstream Need/scope may satisfy it without reopening.

## Typical Sources / Evidence

```text
Trigger
Need / Current Reality
accepted upstream Decisions
current Target/Scope
candidate Target/RQ/Idea
user-world result
```

## At Need Grounding

```text
What real-world/useful result is needed?
What is the current gap?
Is the Trigger only a proposed implementation?
Is this still worth solving?
```

## At Target / Scope

```text
What exact result should this Target own?
Is scope too broad or too narrow?
Are independent concerns mixed?
Could an existing Target be reused/extended?
What is explicitly outside?
```

## At RQ Discovery

```text
Does this question materially help resolve the Target?
Is it already answered by trusted Sources/Decisions?
Is it implementation detail too early for this Target?
```

## At Idea / Branch Evaluation

```text
What expected effect on the Need does this Idea produce?
Is there a simpler/better route?
Does it merely make implementation convenient?
What opportunity cost/responsibility creep appears?
```

## Findings / Outputs

```text
Need/value basis
scope correction
split/merge/defer candidate
inside/outside clarification
unnecessary RQ finding
unsupported-solution finding
Q/R/P when material
```

## Typical Consumers

All material Targets and all three generic choice levels.

## Artifact / File Implications

### Structured Artifact / File Guidance

These records describe conditional placement guidance produced by this Lens. They never create semantic ownership by themselves.

```text
ARTIFACT_GUIDANCE
ID: AG-L1-01
CONTENT_KIND: TARGET_SCOPE_DECISION
WHEN: L1 finds Target/Scope must be reframed/split/merged/deferred
GUIDANCE: ADVISORY_REQUIRED_TO_PERSIST_IF_ACCEPTED
PERSISTENCE_GUIDANCE: REQUIRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: current Target/Target-Scope Decision
REPRESENTATION: EMBED_CURRENT_TARGET_PLANNING_STATE
FILE_OR_ARTIFACT: <current-idtspe-owner>
CONTENT: accepted scope/value correction and rationale; no separate Lens file
GUIDANCE_SOURCE: LENS
RESOLVER: P-14 / TF-10
```


Shell placement semantics: [`artifact-placement-and-idtspe-response-contract.md`](../../shared/artifact-placement-and-idtspe-response-contract.md).

Normally **NONE independently**: L1 findings stay in current Target Scope/Decision state.

**REQUIRED/PREFERRED update** only when L1 establishes/reopens a canonical Need/Scope owner that must persist beyond the current Target.

Do not create a separate “L1 findings” file. `P-14` routes material scope/need changes to the real owner.

## Guards

Do not re-litigate trusted upstream Need merely because L1 is required.

## Composition

Often paired with L2 at Target/Source boundaries and L3 when Need/scope assumptions are weak.

## Escalation / Revalidation

A material contradiction can reopen Target Scope or an upstream Need owner through normal revalidation.

## High-Level Example — Self-Contained Walkthrough

### Situation

A team opens a planning session with the proposed Target:

```text
"design a repository layer"
```

No user/business result is mentioned.

### Why This Lens

L1 checks whether planning is attached to the real Need/value and whether the current Target is bounded at the right level.

### Walkthrough

Ask:

```text
What useful result requires this repository?
Who benefits?
What current gap exists?
Could the same result be achieved without this layer?
```

The answer reveals:

```text
Need:
  user must be able to durably preserve selected material

Repository:
  only one possible implementation Idea
```

The Target may therefore be reframed around the useful result or routed to a later implementation decision.

### Result

L1 produces a scope/value finding:

```text
current Target is implementation-shaped too early
reframe around durable capture result
```

### Boundary / Lesson

L1 does not ban repositories.

It prevents an implementation proposal from becoming the Need merely because someone mentioned it first.

## Provenance

Normalized from IDTSPE `Need / Scope Validity` and later `Need / Value / Scope` L1 models.
