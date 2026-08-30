# LENS-DEPENDENCY-CHANGE-IMPACT — Dependency / Change Surface / Blast Radius

Lens ID: `LENS-DEPENDENCY-CHANGE-IMPACT`  
Legacy alias: `L4`  
Activation: `FREQUENT_CONDITIONAL`

## Purpose

Evaluate structural dependency topology and concrete impact surface created by a choice.

## Applicability Gate

Activate when a Target/Idea changes a structured system with meaningful dependency/consumer/change relations:

```text
repository/documentation
codebase/modules/packages
API/schema/messages
files/artifacts
data/storage
integration graph
generated projections
```

## Target Inputs / Evidence

```text
current owner/dependency graph
consumers
current code/docs/files
candidate responsibility/seam
migration/compatibility constraints
review/reference relations
```

## Dependency Facet

```text
Which owners/components depend on which?
What dependency direction changes?
Does coupling increase/decrease?
Are independent change paths tied together?
Which consumers need compatibility/migration/review?
```

## Change Surface Facet

Inspect affected files/artifacts/modules/classes/interfaces/methods/schemas/persisted state/tests/generated projections/runtime components.

## Freshness / Review Facet

```text
Which dependent truly needs review?
Which relation is only navigation?
Which relation creates a material backlink/query/navigation need that should be checked through the Linked Notes Usage Lens?
Which needs exact Reference Object synchronization instead?
Which needs bounded-fragment vs whole-file review?
```

## Blast-Radius / Migration Facet

```text
How many owners/consumers are affected?
What synchronized edits are required?
What rollout/migration/rollback surface appears?
```

## Principle / Pattern Heuristics

DRY/SRP/OCP/cohesion/coupling/DIP are risk detectors, not laws:

```text
observe structural problem
→ surface a Finding Candidate carrying an optional structural-pattern proposal
→ Core Finding Disposition resolves whether accepted meaning becomes/refines Idea / Q/R/P / Decision input or another State/lifecycle consequence
→ re-evaluate the accepted candidate through L4 when needed
→ add L5 when recurring Workspace work/evolution matters
```

## Findings / Outputs

```text
dependency graph subset
change surface
consumer impact
freshness/review obligations
migration/rollback concerns
projected structural change impact
Q/R/P
```

## Typical Consumers

Application/workspace review, Domain, Slice, Frontend, Cross-Cutting, Artifact/File, API/schema and documentation planning.

## Artifact / File Implications

### Structured Artifact / File Guidance

These records describe conditional placement guidance produced by this Lens. They never create semantic ownership by themselves.

```text
ARTIFACT_GUIDANCE
ID: AG-L4-01
CONTENT_KIND: DEPENDENCY_CHANGE_FINDING
WHEN: dependency/change surface materially affects a Decision
GUIDANCE: ADVISORY_PREFERRED
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: current Target when Core Finding Disposition resolves the accepted dependency/change finding there; otherwise resolved owner
REPRESENTATION: EMBED_CURRENT_TARGET_PLANNING_STATE
FILE_OR_ARTIFACT: <current-idtspe-owner>
CONTENT: affected owners/consumers/change surface/migration obligations
GUIDANCE_SOURCE: LENS
RESOLVER: P-14 / TF-10
```

```text
ARTIFACT_GUIDANCE
ID: AG-L4-02
CONTENT_KIND: LARGE_REUSABLE_DEPENDENCY_MAP
WHEN: dependency graph/change map is large or independently reused
GUIDANCE: ADVISORY_OPTIONAL
PERSISTENCE_GUIDANCE: OPTIONAL
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: semantic owner resolved by Core Finding Disposition (often current Target); a supporting artifact has no separate semantic authority
REPRESENTATION: SUPPORTING_ARTIFACT
FILE_OR_ARTIFACT: <dependency-or-change-impact-artifact>
CONTENT: bounded dependency/change-surface evidence; referenced by current Target
GUIDANCE_SOURCE: LENS
RESOLVER: P-14 / TF-10
```


Shell placement semantics: [`artifact-placement-and-idtspe-response-contract.md`](../../shared/artifact-placement-and-idtspe-response-contract.md).

Normally **NO_DISTINCT_SUPPORTING_ARTIFACT**: dependency/change output is a Finding Candidate; when Core Finding Disposition resolves accepted Decision/plan meaning to the current Target, its ordinary representation carries it.

**PREFERRED separate supporting map/plan** only when the dependency/change surface is large, reused by several Targets, or needs independent migration/review lifecycle.

**PREFERRED full Artifact Pack** when findings imply file split/merge/retirement/generated-index changes.

Do not make a dependency map semantic authority for the things it references.

## Guards

Structural dependency ≠ semantic authority. Semantic relation ≠ automatic whole-file review dependency.

## Composition

L2 evaluates semantic-authority/SOT/reuse questions. L5 evaluates planned/probable future-change interaction and change isolation. L6 evaluates proof/operation implications. None of these Lenses owns the resulting project semantic authority/State; Core Finding Disposition resolves accepted meaning/owner/lifecycle consequences.

## Escalation / Revalidation

A large independently substantial migration/dependency finding may surface a Target Formation candidate through Core Finding Disposition. Target Formation decides whether a separate bounded Target is warranted.

## High-Level Example — Self-Contained Walkthrough

### Situation

A team proposes changing the response contract returned by a capture API.

They know the change is small in one server file but do not know the real system impact.

### Why This Lens

L4 looks at concrete dependency topology, consumers and blast radius.

### Walkthrough

Trace affected structure:

```text
server endpoint
→ response DTO
→ frontend gateway
→ response mapper
→ review Screen
→ capture-result Screen
→ integration tests
→ fixtures
```

Now compare two alternatives:

```text
change shared response directly
vs
introduce a compatible translation at one boundary
```

The dependency/change surface becomes decision evidence.

### Result

L4 can produce:

```text
affected consumers
change surface
migration/compatibility obligations
blast-radius risk
```

### Boundary / Lesson

L4 says what depends on what.

It does not decide the semantic meaning of the response; that remains with the proper owner.

## Knowledge Basis

Mode: `INLINE`

**Embedded Principles / Rules / Theory:**

- Dependencies matter when they create real consumer/change/blast-radius consequences, not merely because references exist.
- A dependency relation does not automatically establish Source or semantic-owner authority.

**Referenced Knowledge Owners:**

- `NONE`

**Reference Load Policy:**

No external knowledge body is required for normal use.

**Operationalization Notes:**

Workspace dependency facts are Target Inputs/Evidence; the impact evaluation is owned here.

## Provenance

Restores Complete Picture v6 L4 and the older Dependency/Reuse/Impact + Change Surface merge.
