
# High-Level Example Guide

Status: active methodology explanation standard

## Purpose

High-level examples exist to make a methodology file understandable to a reader or another chat that has **not** seen the design conversation.

An example is not sufficient merely because every statement in it is true.

A useful example must explain:

```text
Situation
→ why this Target Module / Lens is relevant
→ what inputs are available
→ what choices/questions are considered
→ how the methodology is applied
→ what result is produced
→ what remains owned elsewhere / what happens next
```

## Required Shape

Every main high-level example should contain these explanatory parts.

### Situation

Describe the real problem/context in plain language.

The reader should not need to know IDs such as `SCN-CAPTURE` beforehand.

### Why This Module / Lens

Explain why this particular methodology element is being used and why a neighboring element is not enough.

### Walkthrough

Show a small realistic reasoning flow.

Prefer concrete examples such as:

```text
user wants to preserve a research fragment
team needs one audit rule across several Slices
frontend must decide where remote state lives
```

Then show how Sources, Questions, Lenses, Proposals or Decisions participate.

### Result

Show the artifact/decision/finding produced.

### Artifact Placement

When the example produces material content that should survive, show where it would go or explicitly show that persistence/placement remains unresolved.

Example:

```text
Feature behavior / semantic data
→ canonical Feature owner representation

Scenario journey composition
→ canonical Scenario owner representation

unselected Screen Proposal
→ inline/existing Generic Proposal State representation when useful, otherwise ephemeral

architecture concern
→ Persistence REQUIRED, Destination UNRESOLVED
```

### Boundary / Lesson

Explain what the example does **not** imply.

Typical boundaries:

```text
Screen placement does not redefine Feature behavior or Scenario journey meaning
Lens finding does not become semantic authority
Part Plan does not replace child IDTSPE when real choices remain
competitor behavior does not become our Requirement
```

## Good Example Style

Good:

```text
Situation:
  A user reading an article wants to save one useful fragment
  without interrupting reading, then continue into later review.

Why Scenario Planning:
  Feature owners already define the capture and review behaviors/results,
  but the actor-to-benefit journey between those Feature results is not yet owned.

Walkthrough:
  select participating Feature results;
  define actor/external linking actions;
  preserve context continuity;
  make branch/re-entry/terminal Benefit explicit;
  add only journey-level must-holds that are not copied Feature BRs.

Result:
  one Scenario Journey Composition referencing the current Feature owners.

Boundary:
  Feature behavior remains Feature authority;
  no Screen or implementation Slice is selected merely by composing the journey.
```

Weak:

```text
SCN-CAPTURE
→ DATA
→ Behavior
```

The weak version may be technically correct but teaches almost nothing to a new reader.

## Examples Are Explanatory, Not Prescriptive

Example names, owners, classes, methods, screens and patterns are illustrative.

```text
example
≠ required naming
≠ required architecture
≠ required decomposition
```

The reusable rules remain in the owning Target Module/Lens/Shell.
