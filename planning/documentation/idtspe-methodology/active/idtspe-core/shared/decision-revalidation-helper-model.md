# Decision Revalidation Helper

Status: active generic helper model  
Role: preserve the minimum decision-oriented signals needed to notice when an accepted Decision may have become worse, invalid, or worth reopening.

This is a helper/projection attached to an accepted material Decision.

It is not a new semantic authority and not a new Decision type.

---

# 1. Why

An accepted Decision should not preserve only:

```text
what we selected
```

It should preserve enough to answer later:

```text
what did this Decision depend on?
what did we expect it to achieve?
which known weaknesses did we accept?
what new Evidence would make us reconsider?
which symptoms suggest it is becoming worse?
which alternative/branch should we compare again?
```

---

# 2. Literal Shape

```text
Decision Revalidation Helper

Decision Ref

Decision Subject

Selected Value

Accepted Basis
  Source refs
  decisive Evidence
  decisive assumptions

Expected Result / Benefit

Accepted Tradeoffs

Residual Q/R/P

Watch Signals
  qualitative leading indicators / symptoms

Evidence Sources
  where future Evidence may appear

Reconsider Events / Thresholds
  event / condition / qualitative threshold

Re-open Level
  ANSWER
  QUESTION_SET
  TARGET_SCOPE
  UPSTREAM

Fallback / Saved Alternatives
  Idea refs
  Branch refs

Related WEUC
  expected/accepted impact when material
  observed evidence when available

Last Revalidation Result
  optional

Notes
```

---

# 3. Residual Q/R/P Drives The Helper

Residual Question:

```text
what remains unknown?
what evidence can answer it?
what answer would strengthen/weaken/reopen?
```

Residual Risk:

```text
risk hypothesis
leading indicators
evidence source
reconsider event/threshold
fallback
```

Residual Problem:

```text
known problem
why acceptable now
severity/tolerance
remediation/reopen condition
```

No material residual Q/R/P:

```text
do not invent fake watch signals
```

---

# 4. Branch-Aware Revalidation

When a Decision was selected after Branch Comparison:

```text
Branch Comparison Coordinator Ref
Selected Branch Ref
Rejected/Deferred Branch refs
```

can be preserved.

Later degradation can reopen comparison:

```text
selected Decision signal worsens
↓
load old sibling Branch summaries
↓
refresh only changed Sources/Evidence/WEUC
↓
compare again
```

No need to replan every branch from zero.

---

# 5. WEUC

If the Decision materially changes Workspace work:

```text
Expected / Accepted WEUC Impact
```

belongs in the helper by reference or concise projection.

Later:

```text
Observed WEUC Evidence
```

can strengthen or weaken the Decision.

If WEUC is not applicable:

```text
N/A
```

is valid.

Never invent Workspace impact merely to fill the field.

---

# 6. Ownership

Semantic authority remains with:

```text
accepted Decision
+
canonical Sources
+
Q/R/P owner
+
actual Evidence owners
```

The helper may be:

```text
embedded with Decision
or
stored as a bounded companion when reused/reviewed independently
```

Artifact/File Pack decides physical representation.

---

# 7. Validator

`Decision Revalidation Readiness Validator` checks:

```text
material residual Q/R/P has usable future Evidence/reopen contract?
accepted basis identifiable?
watch signals proportional?
saved alternatives/branches available when useful?
re-open level explicit?
```

---

# 8. Key Invariant

```text
accepted Decision
≠ frozen forever

residual Q/R/P
+ watch signals
+ Evidence hooks
= future reconsideration contract
```
