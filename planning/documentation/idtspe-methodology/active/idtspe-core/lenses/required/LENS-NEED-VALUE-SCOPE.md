# LENS-NEED-VALUE-SCOPE — Need / Value / Scope

Lens ID: `LENS-NEED-VALUE-SCOPE`  
Legacy alias: `L1`  
Activation: `REQUIRED_CORE`

## Purpose

Keep planning tied to a real Need/useful result and choose the right bounded Target/question/answer rather than allowing a proposed solution to justify itself.

## Applicability Gate

Always check for a material IDTSPE choice. Trusted upstream Need/scope may satisfy it without reopening.

## Target Inputs / Evidence

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
WHEN: L1 surfaces a material Target/Scope reframe/split/merge/defer Finding Candidate
GUIDANCE: ADVISORY_REQUIRED_TO_PERSIST_IF_ACCEPTED
PERSISTENCE_GUIDANCE: REQUIRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: current Target only when Core Finding Disposition resolves the accepted scope correction there; otherwise UNRESOLVED_OWNER
REPRESENTATION: EMBED_CURRENT_TARGET_PLANNING_STATE
FILE_OR_ARTIFACT: <current-idtspe-owner>
CONTENT: accepted scope/value correction and rationale; no separate Lens file
GUIDANCE_SOURCE: LENS
RESOLVER: P-14 / TF-10
```


Shell placement semantics: [`artifact-placement-and-idtspe-response-contract.md`](../../shared/artifact-placement-and-idtspe-response-contract.md).

Normally **NO_DISTINCT_SUPPORTING_ARTIFACT**: an L1 Finding Candidate is not persisted as Lens output; when Core Finding Disposition resolves accepted Scope/Decision state to the current Target, that Target's normal representation carries it.

**REQUIRED/PREFERRED update** only when an L1 Finding Candidate is dispositioned/accepted as establishing or reopening a canonical Need/Scope owner that must persist beyond the current Target.

Do not create a separate “L1 findings” file. After Core Finding Disposition resolves/accepts the semantic owner, `P-14` places the material scope/need change in that already-resolved owner.

## Guards

Do not re-litigate trusted upstream Need merely because L1 is required.

## Composition

Often paired with L2 at Target/Source boundaries and L3 when Need/scope assumptions are weak.

## Escalation / Revalidation

A material contradiction is a Finding Candidate. Core Finding Disposition may select Target-Scope or upstream-Need revalidation/reopen when warranted; L1 itself does not perform the lifecycle transition.

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

The finding may therefore, after Core disposition/normal resolution, reframe the Target around the useful result or leave the repository as a later implementation Decision concern.

### Result

L1 produces a scope/value finding:

```text
current Target is implementation-shaped too early
reframe around durable capture result
```

### Boundary / Lesson

L1 does not ban repositories.

It prevents an implementation proposal from becoming the Need merely because someone mentioned it first.

## Knowledge Basis

Mode: `INLINE`

**Embedded Principles / Rules / Theory:**

- A Target exists to resolve a useful bounded outcome, not merely to create an artifact or follow a phase label.
- Scope should be the smallest boundary that preserves the material Need/result and ownership clarity.

**Referenced Knowledge Owners:**

- `NONE`

**Reference Load Policy:**

No external knowledge body is required for normal use.

**Operationalization Notes:**

These principles are already operationalized by this Lens; outside product/domain knowledge enters as Target Inputs/Evidence, not as Lens authority.

## Provenance

Normalized from IDTSPE `Need / Scope Validity` and later `Need / Value / Scope` L1 models.
