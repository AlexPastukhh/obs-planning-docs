# LENS-LINKED-NOTES-USAGE-JUSTIFICATION — Linked Notes Possible Usage / Justification

Lens ID: `LENS-LINKED-NOTES-USAGE-JUSTIFICATION`  
Activation: `TARGET_PROFILE_REUSABLE`

## Purpose

Decide whether **Linked Notes behavior is actually justified** for a selected Target/artifact/owner set without creating a second semantic owner, duplicate content, or a new `notes/` persistence tree.

```text
Linked Notes
= linking / backlink / query / cross-owner navigation behavior
  over already existing canonical owners and addressable objects

Linked Notes ≠ semantic owner
Linked Notes ≠ Target Module
Linked Notes ≠ separate planning artifact family
Linked Notes ≠ default physical storage
```

The default result is **NOT_JUSTIFIED** until a concrete navigation/review/query need is shown.

## Applicability Gate

Use when someone proposes or implicitly needs one of these:

```text
cross-owner backlink/navigation
"show me everything related to X"
query/view over distributed owners
one concept/Decision/QRP referenced from several places
relationship discovery without copying source bodies
review traversal across several current owners
```

Do not activate merely because two Markdown files can link to each other.

## Target Inputs / Evidence

```text
current semantic owners
existing stable IDs/links
consumer/reviewer navigation needs
Q/R/P and Decision relations
Dependency/Change findings
Artifact Boundary findings
existing indexes/registries/generated projections
Reference Object requirements when exact synchronization is suspected
```

## Reusable Command Surface

Methodology surface key: `lenscmd.linked-notes.justify`  
Canonical user intent: `проверь оправданы ли linked notes <target>`

This is a direct Lens invocation over an existing Target/owner set. It does not create a Linked Notes Target or a `notes/` persistence family.

```text
When To Use:
  several existing owners/Decisions/QRP items may need backlinks, query, relationship
  discovery or repeated cross-owner review traversal.

What You Get:
  JUSTIFIED / NOT_JUSTIFIED / ROUTE_TO_REFERENCE_OBJECT + concrete navigation job +
  owners/relations involved + cheapest sufficient mechanism.
```

## Core Questions

### 1. What concrete job would Linked Notes perform?

```text
navigation?
backlinks?
relationship discovery?
query/filter?
review traversal?
trace from Decision → Q/R/P → affected owners?
```

If the answer is only "it may be useful later", Linked Notes are not justified.

### 2. Are canonical owners already clear?

Linked Notes may connect existing owners. They must not be used to avoid deciding where truth belongs.

```text
unclear owner
→ resolve L2 / Target Formation first
→ do not create a Linked Note as hidden owner
```

### 3. Is an ordinary direct link enough?

Prefer the cheapest sufficient mechanism:

```text
one consumer → one owner
→ ordinary link/reference usually sufficient

several distributed owners + material traversal/query need
→ Linked Notes may be justified
```

### 4. Would Linked Notes duplicate semantic content?

Hard guard:

```text
canonical body stays in its owner
Linked Notes expose relations/views only
```

If the proposed implementation copies explanatory/current semantic bodies into a separate note, reject or redesign it.

### 5. Is this actually a Reference Object problem?

If exact materialized equality/staleness synchronization matters:

```text
not a Linked Notes justification question
→ route to Reference Object candidate/gate
```

Linked Notes may point at Reference Objects or use their registry technically, but they do not replace Reference Object semantics.

### 6. Does the navigation value justify the extra system surface?

Count the cost:

```text
IDs/metadata required
index/query maintenance
review complexity
possible stale relation data
helper/tooling dependency
additional cognitive concepts
```

Linked Notes should reduce total navigation/review cost, not merely add another representation.

## Possible Outcomes

```text
NOT_JUSTIFIED
  existing owner + ordinary link/navigation is enough

JUSTIFIED_LINKED_NOTES
  cross-owner relation/backlink/query behavior has material value
  and no semantic body is duplicated

USE_EXISTING_INDEX_OR_QUERY
  need is real, but an existing registry/index/query already solves it

ROUTE_TO_ARTIFACT_BOUNDARY
  addressability/representation is the real unresolved question

ROUTE_TO_REFERENCE_OBJECT
  exact-copy/equality/staleness obligation is the real problem

RESOLVE_OWNER_FIRST
  proposal is hiding unclear semantic ownership
```

## Physical Storage Rule

Linked Notes do **not** introduce a methodology file tree such as:

```text
notes/
linked-notes/
<owner>-notes.md
```

There is no SDS placement rule for such files.

Canonical semantic content stays in existing Target owners/artifacts. A Linked Notes implementation is normally a relation/query/navigation capability over those existing objects.

Technical implementation may require metadata/index infrastructure. In particular, a future Reference Object mechanism may maintain a technical Reference Object registry. Such technical registry/index files are infrastructure, not Linked Note semantic artifacts and do not become methodology owners.

## Findings / Outputs

```text
usage justification: YES / NO
concrete navigation/query job
owners/objects to connect
why ordinary links are insufficient (when YES)
required stable IDs/relations
anti-duplication guard
implementation/tooling assumptions
Reference Object handoff when relevant
revalidation trigger
```

## Typical Consumers

```text
Artifact / File planning
P-14 / TF-10 representation decisions
Decision/QRP review navigation
Dependency/change review
SDS planning-context navigation
future helper/query tooling
Reference Object technical design when linked traversal consumes its registry
```

## Guards / Anti-Patterns

```text
NO dedicated notes tree by default
NO second semantic owner
NO copied canonical bodies
NO Linked Notes merely because backlinks sound convenient
NO use as substitute for L2 ownership
NO use as substitute for Reference Object synchronization
NO automatic loading of every linked object into every IDTSPE invocation
```

Linked relation availability does not imply mandatory Source loading. The current Target/Source contract still decides what must be read.

## Composition

```text
L2 Authority / SoT / Reuse
→ establishes canonical owners

Artifact Boundary Lens
→ establishes addressability/representation need

L4 Dependency / Change Impact
→ may expose material cross-owner traversal/review need

Linked Notes Usage Lens
→ decides whether linked-note behavior is worth introducing

Reference Object gate (when exact equality matters)
→ separate responsibility
```

## Escalation / Revalidation

Revalidate when:

```text
number of linked owners changes materially
ordinary links become sufficient again
query/index maintenance cost grows
owner boundaries change
Reference Object synchronization becomes necessary
Linked Notes begin carrying copied semantic bodies
```

## Artifact / File Implications

### Structured Artifact / File Guidance

This Lens does not create a Linked Notes artifact family.

```text
ARTIFACT_GUIDANCE
ID: AG-LINKNOTE-01
CONTENT_KIND: LINKED_NOTES_USAGE_DECISION
WHEN: Linked Notes usage is materially considered for a Target/artifact/owner set
GUIDANCE: EMBED_DECISION_ONLY
PERSISTENCE_GUIDANCE: OPTIONAL
PLACEMENT_DIRECTIVE: ROUTE
SEMANTIC_OWNER: current Target / current artifact-representation decision
REPRESENTATION: EMBED_CURRENT_TARGET_PLANNING_STATE
FILE_OR_ARTIFACT: <current-idtspe-owner>
CONTENT: justified/not-justified result; concrete navigation/query job; connected owners; anti-duplication guard; Reference Object handoff if relevant; no separate notes artifact
GUIDANCE_SOURCE: LENS
RESOLVER: P-14 / TF-10
```

If the result is `NOT_JUSTIFIED` and no material Decision/revalidation value exists, no durable output is required.

## Knowledge Basis

Mode: `INLINE`

**Embedded Principles / Rules / Theory:**

- Linked Notes are justified by concrete traversal/query/backlink value over existing canonical owners, not by a desire for another storage tree.
- Navigation projections must not copy canonical semantic bodies or become a hidden second owner.

**Referenced Knowledge Owners:**

- `NONE`

**Reference Load Policy:**

No external knowledge body is required for normal use.

**Operationalization Notes:**

Linked Notes implementation details are not needed unless the usage decision is already justified.

## High-Level Example — Decision/QRP Navigation

### Situation

Several Slice and Domain owners reference Decisions and Q/R/P items. A reviewer wants to answer:

```text
Which active Risks are connected to Decision D-17?
Which owners does D-17 affect?
Which Questions were addressed by it?
```

### Why This Lens

Creating `notes/D-17.md` and copying the Decision/Risks there would create duplicate truth. But manually following many unrelated links may make review expensive.

### Walkthrough

Canonical owners remain unchanged:

```text
Slice owner
  D-17
  Addresses: Q-04, P-02
  Exposes: R-09

Domain / other Target owners
  related Q/R/P or Decisions
```

Options:

```text
A. ordinary direct links only
B. create a copied D-17 Linked Note file
C. Linked Notes query/view over existing IDs/relations
```

The Lens rejects B because it copies canonical meaning.

If the cross-owner review need is frequent/material and ordinary links are too costly, C is justified:

```text
JUSTIFIED_LINKED_NOTES
job:
  query/traverse D-17 ↔ Q/R/P ↔ affected owners

storage:
  no Linked Note semantic file

truth:
  remains in current owners
```

If this traversal is rarely needed, outcome is instead:

```text
NOT_JUSTIFIED
→ keep ordinary links
```

## Boundary / Lesson

Linked Notes are a **usage capability justified by navigation/query value**, not a new place to store methodology or SDS content.
