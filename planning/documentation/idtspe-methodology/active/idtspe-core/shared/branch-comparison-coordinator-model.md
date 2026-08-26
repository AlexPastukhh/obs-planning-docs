# Branch Comparison Coordinator

Status: active generic planning-owner model  
Scope: one material divergence at one Root Resolution Slot / Decision point.  
Purpose: coordinate sibling counterfactual Planning Branches so they are explored and compared against the same baseline rather than drifting into incomparable narratives.

---

# 1. One Coordinator Per Divergence

Example:

```text
Root Target:
  RC-ROUTE-01

Root Resolution Slot:
  selected capture route

Candidates:
  Existing Clipping Tool
  Own Lightweight Capture
```

Create:

```text
BRANCH-COMP-RC-ROUTE01
```

The coordinator owns **comparison state**, not branch semantics.

---

# 2. Coordinator Owns

```text
Branch Comparison Identity

Root Target
Root Resolution Slot / RQ

Comparison Objective

Canonical Baseline Sources
  shared by all sibling branches

Candidate Values

Sibling Branch refs

Common Exploration Depth / Stop Rule

Common Comparison Dimensions

Evidence Plan / Evidence Confidence

Per-Branch normalized summaries

Cross-Branch comparison matrix

WEUC comparison
  when material

Cross-Branch Q/R/P

Decision recommendation/proposal
  optional AI proposal only

Root Answer Decision ref
  once actually selected

Decision Revalidation Helper ref

Status
```

---

# 3. Coordinator Does Not Own

Do not make it owner of:

```text
branch-local Target semantics
branch-local Decisions
canonical root Decision meaning
canonical Application/Domain/Architecture meaning
actual Evidence
```

Those remain in their real owners.

---

# 4. Sibling Branch Owners

Each material branch can have its own bounded owner:

```text
Branch ID
Root candidate
ASSUMED_FOR_BRANCH
branch-local Sources
branch-local Target instances
branch-local Decisions
projected consequences
actual Evidence refs
Q/R/P
normalized Branch Summary
```

The coordinator references these owners.

---

# 5. Common Baseline Is Mandatory

All sibling branches start from the same accepted baseline unless a branch explicitly adds a branch-specific Source.

Baseline can include:

```text
Need
accepted upstream Decisions
constraints
current reality
same root Target scope
same root Question Set
```

Branch-specific assumption:

```text
Candidate Value
→ BRANCH_ASSUMPTION_SOURCE
```

with hypothetical authority.

---

# 6. Comparison Dimensions

Choose proportional dimensions.

Core candidates:

```text
Need / Outcome Fit
Scope Coverage
Existing Capability Reuse
New Responsibilities
Dependencies / Handoffs
Complexity / Coordination
Evidence Confidence
Key Q/R/P
Reversibility
Delivery / migration implications
Verification / observability / operability
Future options enabled/closed
```

---

# 7. WEUC / Architecture Lens Comparison

When a branch materially changes Workspace work, activate:

```text
LENS-WORKSPACE-EVOLUTION-ARCHITECTURE
```

and compare contextual WEUC/change/runtime findings using the same scope/dimensions.

For each branch, capture proportionally:

```text
expected/current Workspace work paths
areas/owners touched
understanding cost
mutation/evolution cost
verification/diagnosis/operation cost
dependency/change surface
preparation-now cost
deferred/rework cost
architectural tax
material future demand supported/blocked
confidence
```

Then coordinator can show:

```text
Branch A WEUC
Branch B WEUC
Branch C WEUC
```

A branch that does not create relevant Workspace work can legitimately say:

```text
WEUC:
  N/A / negligible for current workspace
```

Do not invent WEUC to make matrices symmetrical.

---

# 8. Other Comparison Factors

The coordinator can activate contextual dimensions from applicable Lenses. Cross-cutting quality dimensions are selected through:

```text
LENS-QUALITY-RISK-MATERIALITY
```

Typical dimensions include security, privacy, performance, reliability, safety, compliance, UX/accessibility and business/economic cost. Domain correctness remains grounded in Domain/Scenario semantics rather than a generic quality checklist.

Only material dimensions.

---

# 9. Root Q/R/P

The divergence itself can have:

```text
Q:
  insufficient Evidence to distinguish branches

R:
  comparing branches at unequal depth biases selection

P:
  one branch violates accepted constraint
```

These are attached to the root Decision/comparison.

Each branch still has local Q/R/P separately.

---

# 10. Coordinator Decision Surface

After enough exploration:

```text
Candidate A
  summary

Candidate B
  summary

Candidate C
  summary
```

The coordinator may produce:

```text
AI Recommendation:
  Candidate B

Why:
  ...
```

But:

```text
AI Recommendation
≠ Root Answer Decision
```

The user/authorized decision path selects.

---

# 11. Root Selection

When selected:

```text
Root Answer Decision
```

is persisted in the root Target owner.

Coordinator records only:

```text
Decision Ref
selected candidate
comparison rationale refs
```

Then:

```text
selected branch
→ Branch Promotion / Consistency Check
```

before canonical promotion of branch-local downstream state.

---

# 12. Revalidation

Coordinator is a valuable future comparison helper.

Decision Revalidation Helper can reference it.

When a watch signal fires:

```text
reload baseline
refresh changed Sources/Evidence
refresh affected branch summaries
refresh WEUC if material
recompare
```

This makes branch work reusable rather than disposable.

---

# 13. Physical Owner Direction

Logical owner:

```text
one Branch Comparison Coordinator
per material root divergence
```

Physical options:

```text
embedded in root Target owner
or
separate coordinator file
```

Prefer a separate file when:

```text
2+ durable sibling branches
material WEUC/evidence comparison
independent future revalidation value
large comparison matrix
```

Artifact/File Pack decides final path.

---

# 14. Key Invariants

```text
one divergence
→ one comparison coordinator

coordinator
≠ semantic owner of sibling branches

same baseline
+ comparable depth
+ normalized dimensions
→ fairer root Decision

WEUC compared when material

AI recommendation
≠ selected Decision

branch-local state
≠ canonical until promotion
```
