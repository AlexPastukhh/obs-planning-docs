# Current Workflow And Problem Analysis Draft Template

Status: provisional reusable recommended template
Purpose: compact initial representation for current workflow and user-experience capture, with optional progressive expansion.

## 1. How To Use This Template

Start with the compact form. Keep related information together and use only headings that contain meaningful material.

```text
Required semantic core:
- purpose and capture boundary;
- understandable current workflow sequence;
- stable step IDs and names;
- what happens at each step;
- why each step exists;
- user experience and comments for each step;
- current strengths, experienced problems, suspected risks,
  workarounds, existing user ideas and unknowns when present;
- current descriptive conclusion;
- important questions.

Recommended initial presentation:
- prose and headings rather than a table;
- all high-level steps in one continuous overview;
- categorized experience inside each step;
- no empty sections;
- no separate large section for one small item.

Optional expansion:
- detailed records for selected steps;
- cross-step records;
- tables only for repeated structured items;
- separate linked detail artifacts when one document becomes too crowded.
```

This is a recommended starting representation, not the only valid form. A free or specialized Markdown structure is valid when it preserves the required semantic core, remains readable and respects the first-stage boundary.

## 2. Purpose And Capture Boundary

### Purpose

<Why the current workflow is being captured.>

### Included

<What current activity is included.>

### Excluded

<What is outside this capture. Omit when no exclusion is needed.>

### Start And End

**Start:** <Where the current workflow begins.>

**End:** <Where the current workflow ends.>

## 3. Current Workflow Overview

Describe the complete current workflow directly through its steps. Do not add a separate step-index table by default.

### WF-01 — <Current step name>

#### What Happens

<Describe the current step as closely as possible to the user's original meaning and level of detail.>

#### Reason / Purpose

<Why this step currently exists or what it is trying to accomplish.>

#### User Experience And Comments

Use only the applicable subheadings below. Preserve the user's original wording or close meaning. Categorize before attempting to summarize or reinterpret.

##### Strengths / What Works

<What already works, feels useful, convenient or satisfactory.>

##### Difficulties / Friction

<What is inconvenient, effortful, confusing or cognitively heavy.>

##### Experienced Problems

<Concrete undesirable situations that have actually happened.>

##### Risks / Doubts

<Suspected weaknesses, fears, theoretical concerns or uncertain future failures.>

##### Current Workarounds

<What the user currently does to compensate.>

##### Thoughts / Observations

<Current comments, intuitions, explanations or hypotheses supplied by the user.>

##### Existing Ideas

<User-provided ideas recorded without evaluation or acceptance.>

##### Unknowns

<Important information that is missing or not known.>

---

### WF-02 — <Current step name>

#### What Happens

<Current description.>

#### Reason / Purpose

<Current reason or purpose.>

#### User Experience And Comments

<Use only the applicable categorized subheadings from WF-01.>

Repeat the compact step block until the high-level end-to-end workflow is understandable.

## 4. Cross-Step Observations — Optional

Add this section only when an experience, problem, risk, workaround, idea or unknown genuinely affects several steps and repeating it inside every step would reduce clarity.

### CX-01 — <Cross-step observation name>

**Affected steps:** <stable step IDs>

**Current description:** <what recurs across the workflow>

**Category:** <strength / experience / experienced problem / suspected risk / workaround / existing idea / unknown>

**Evidence status:** <user-reported / checked / inferred / unknown>

Do not use this section to formulate improvement targets or a final root-cause taxonomy.

## 5. Detailed Step Expansion — Optional

Do not create detailed step sections by default. Add one only when the compact step has become too crowded, contains several internal paths, needs repeated structured records or is difficult to reason about.

Keep the compact step in Section 3. The detailed record is drill-down behind that high-level abstraction.

### Detail For WF-XX — <Step name>

#### Trigger

<What starts the step.>

#### Current Actions

1. <Current action>
2. <Current action>

#### Inputs

<Current inputs, when useful.>

#### Outputs

<Current outputs, when useful.>

#### Tools And Environments

<Current tools and environments, when useful.>

#### Dependencies

<Information, decisions or previous steps this depends on.>

#### Exceptions And Alternative Current Paths

<Current exceptions or alternatives.>

#### Frequency And Current Impact

<Frequency, cost, consequence or impact when known.>

#### Structured Experience Records

Use prose by default. Introduce a small table only when several records share the same fields and the table is easier to scan than repeated headings.

Possible repeated-record fields:

```text
stable ID;
category;
current situation or comment;
context / trigger;
experienced consequence;
current response / workaround;
evidence status;
related steps;
unknowns.
```

## 6. Current Descriptive Conclusion

<Concise description of the current workflow and current user experience. Do not formulate improvement targets, candidate changes, target workflow or product requirements.>

## 7. Questions

Ask only questions that materially improve the current-state record or prevent an unsafe assumption.

### Q-01 — <Question>

**Priority:** <high / medium / low>

**Blocking:** <yes / no>

**Status:** <open / answered / deferred>

**Answer:** <user-confirmed answer when available>

## 8. Record Issues, Answers And Scope Decisions — Optional

Use only when needed.

### Critical Remarks About The Record

<Record contradictions, unsupported current-state claims, mixed current/future descriptions or incomplete boundaries.>

### User Answers

<Answers not already placed next to their questions.>

### Decisions About Scope Or Terminology

<Record explicit accepted drafting-boundary or terminology decisions with rationale.>

## 9. Representation Growth Guide

Keep the compact form when:

```text
- the workflow is understandable in one pass;
- each step has a manageable amount of categorized experience;
- repeated records are rare;
- navigation within the file is easy;
- the user can think with the document without hunting across sections.
```

Add local drill-down when:

```text
- one step contains several internal activities or branches;
- one category contains many separate records;
- stable references are needed for repeated situations;
- a table becomes clearer than repeated prose;
- the compact step remains useful but cannot hold all detail comfortably.
```

Use a specialized or substantially different representation when:

```text
- the information type no longer fits the compact step model;
- the current structure obscures important relationships;
- several views of the same semantic records are needed;
- a diagram, cards, linked details or free Markdown is more intuitive.
```

Even after expansion or representation change:

```text
- preserve the required semantic core;
- retain a simple high-level workflow view;
- do not silently lose user wording, meaning or evidence status;
- do not make optional detail mandatory for every step;
- do not treat the existence of another template as a requirement to migrate.
```
