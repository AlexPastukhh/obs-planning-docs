# Current Reality Capture Draft Template

Status: provisional reusable recommended template
Path note: the legacy filename is retained temporarily during semantic migration.
Purpose: compact capture of current user-reported reality before evaluation or future-solution planning.

## 1. Use

Start with the smallest form that makes the current workflow understandable.

Required semantic core:

```text
- capture purpose and boundary;
- current workflow sequence;
- what happens at each meaningful step;
- current intended explanation for the step;
- user experience and comments;
- strengths, experienced problems, suspected risks,
  workarounds, existing ideas and unknowns when present;
- important record questions.
```

Do not formulate target outcomes, accepted criteria, solution comparison or architecture.

## 2. Purpose And Boundary

### Purpose

<Why the current reality is being captured.>

### Included

<Current activity included.>

### Excluded

<Current activity outside the capture, when useful.>

### Start And End

**Start:** <current starting point>

**End:** <current ending point>

## 3. Current Workflow

### WF-01 — <step name>

#### What Happens

<Current actions and observable situation.>

#### Current Intended Explanation

<Why the user currently believes this step exists or what it currently attempts to accomplish. Do not validate the underlying need here.>

#### User Experience And Comments

Use only categories with meaningful content.

##### Strengths / What Works

<current satisfactory behavior>

##### Friction / Difficulties

<effort, confusion or cognitive burden>

##### Experienced Problems

<undesirable situations that actually occurred>

##### Risks / Doubts

<suspected or theoretical failures>

##### Current Workarounds

<what currently compensates>

##### Thoughts / Observations

<current interpretation or comment>

##### Existing Ideas

<user-provided ideas recorded without evaluation>

##### Unknowns

<missing or uncertain current-state information>

---

### WF-02 — <step name>

<Repeat the compact step form.>

## 4. Cross-Step Observations — Optional

Add only when repetition across steps is harder to understand locally.

### CX-01 — <name>

**Affected steps:** <IDs>

**Category:** <strength / experience / experienced problem / risk / workaround / idea / unknown>

**Current description:** <what recurs>

**Evidence status:** <user-reported / checked / inferred / unknown>

Do not use this section as a final root-cause taxonomy.

## 5. Detailed Step Expansion — Optional

Keep the compact step above.

### Detail For WF-XX — <name>

**Trigger:** <current trigger>

**Actions:**

1. <action>

**Inputs:** <when useful>

**Outputs:** <when useful>

**Tools/environments:** <when useful>

**Dependencies:** <when useful>

**Exceptions/current alternatives:** <when useful>

**Frequency/current impact:** <when known>

Use stable records or tables only when several items share fields.

## 6. Current Descriptive Conclusion

<Describe current workflow and experience without proposing a future solution.>

## 7. Questions

### Q-01 — <question>

**Priority:** <high / medium / low>

**Blocking:** <yes / no>

**Status:** <open / answered / deferred>

**Answer:** <confirmed answer when available>

## 8. Record Issues — Optional

Capture:

```text
contradictions;
unsupported current-state claims;
mixed current/future descriptions;
incomplete boundaries;
classification uncertainty.
```

## 9. Representation Growth

Keep the compact form while it remains easy to understand.

Expand only when:

```text
- one step contains several internal activities;
- repeated records need stable IDs;
- cross-step relationships are hidden;
- the user must hunt across the file;
- linked detail or another view is clearly easier.
```

Preserve the high-level workflow after expansion.
