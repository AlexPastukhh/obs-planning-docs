# Target Module Output Template And Question-Set Rule

Status: active generic Target Module rule

## Generic IDTSPE Envelope vs Target-Specific Template

Every concrete Target already has generic IDTSPE state:

```text
Target Formation Resolution Set
Target-Scope Decision
Question-Set Decision
Ideas
Q/R/P
Planning Branches
Answer Decisions
Residual Q/R/P
Decision Revalidation Helpers
Sources / Relations / Handoff
```

A Target Module must not duplicate those fields inside its own target-specific template.

Target Module files should contain:

```text
purpose
upstream source contract
question-set examples
Lens Profile / reusable Lens refs / local pattern aids
target-specific output template
field explanations
explicit Artifact / File Contract
module-specific validators / handoffs
```

## Question Set Examples Are Non-Exhaustive

Any module question list means:

```text
examples / preset candidates
≠ exhaustive list
≠ automatic interview
≠ fixed sequence
```

The current Target may add, remove, split, merge or reopen questions through normal `TF-06 QUESTION_SET`.

## Field Explanation Rule

Every target-specific output field must be explained either:

```text
Field — short meaning / what belongs here
```

or, preferably for important fields:

```text
## Field Name

Meaning:
...

Write here:
...

Do not put here:
...

Examples:
...
```

Unexplained label-only schemas are not enough for a reusable Target Module.

## Lenses

Reusable Lens knowledge belongs in `../lenses/`, not inside whichever Target Module happened to use it first.

A module stores only:
```text
Lens Profile
  reusable Lens IDs
  applicability gates specific to this Target profile
  local-only Lens prompts when genuinely non-reusable
```

Lens findings feed normal generic:
```text
Idea Q/R/P
Evidence
Branch comparison
Answer Decisions
```

The Lens itself is not an output-template field. If a local Lens becomes useful across multiple Target families, promote it into the Lens Library.

## Artifact / File Contract Is Required In Every Target Module

Every active Target Module declares representation expectations for its own target-specific content.

At minimum it must state:

```text
REQUIRED persistence/output owners
PREFERRED separate artifacts/companions/registers
what remains embedded by default
what must be routed to another owner
when placement may remain UNRESOLVED
```

This is profile guidance consumed by `TF-10` / `P-14`; it does not itself mutate files.

