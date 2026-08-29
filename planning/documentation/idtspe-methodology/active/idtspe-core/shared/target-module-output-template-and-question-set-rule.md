# Target Module Step-Result Contract And Question-Set Rule

Status: active generic Target Module rule

## Generic IDTSPE State vs Target Step Result

Every concrete Target may have generic Core State Units:

```text
Sources
Questions
Ideas
Q/R/P
Planning Branch state
Decisions
Evidence / Evidence Needs
Revalidation Signals
Relations / Handoff state
```

A Target Module must not duplicate those generic units merely as target-specific result fields.

The target-specific result is:

```text
Target Step Result
→ one or more Target Step Result Units
→ target-specific fields/substructure
```

Canonical model: [`idtspe-unit-and-target-step-result-model.md`](idtspe-unit-and-target-step-result-model.md).

## Target Module Result Contract

A reusable Target Module should explain proportionally:

```text
Purpose / recurring Target family

Target Step-Result Contract
  useful Step Result family
  Result Units
  Unit purpose/boundary
  possible fields/substructure
  Unit relations
  validation/completeness meaning
  handoff/consumers
  representation guidance

Resolution / Production Method
  Source archetype
  Question candidates
  Idea/pattern aids
  branch/escalation triggers
  Internal Object Contracts/shared methods when useful

Knowledge Basis
Lens Profile
Validators
Handoff / revalidation
Artifact / File Contract
```

"One result family" does not mean one field, one Unit, one entity or one file.

## Proportional / Sparse Projection Rule

```text
Target Module Step-Result Contract
= possible/addressable semantic surface

Concrete Target Step Result
= only supported/applicable/material projection
```

A declared Unit/field does not imply:

```text
it must be asked
it must be answered
it must persist
it must be equally detailed
its absence is automatically an unresolved Decision
```

Therefore:

```text
blank optional field
≠ unresolved Decision
```

Only supported/material meaning is projected.

## Output Schema / Template Compatibility

`Output Schema` and `Target-specific Output Template` remain valid technical/compatibility terms for one projection shape of the Step-Result Contract.

They are not the primary semantic definition of the Target result.

During staged profile migration, existing module output headings are interpreted as Result Units/fields by meaning even when the file does not yet use explicit `Result Unit` labels.

## Knowledge Basis When Theory Adds Value

A reusable Target Module may contain or reference a Knowledge Basis when reusable theory/reference knowledge materially helps plan or evaluate that recurring Target family. The shared [`Knowledge Basis guidance`](knowledge-basis-contract.md) does not require one fixed section shape.

```text
Upstream Source Contract
= current Target-instance input/evidence/constraint archetype

Knowledge Basis
= reusable principles/rules/theory/pattern knowledge
  used to plan this recurring Target family
```

Knowledge may be inline, referenced from files/folders/sections/external sources, separated into its own applied Knowledge Basis, or combined. Existing mode labels are optional representation only. Read deeper theory proportionally when it helps the current work.

Do not duplicate reusable Lens evaluation knowledge inside a Target Module merely because the module uses that Lens.

## Question Set Examples Are Non-Exhaustive

Any module question list means:

```text
examples / preset candidates
≠ exhaustive list
≠ automatic interview
≠ fixed sequence
```

The current Target may add, remove, split, merge or reopen Questions through normal Core question-set resolution.

Concrete Questions are Core State Units. The Target Module supplies reusable candidates/generation rules.

## Result Unit / Field Explanation Rule

Every non-obvious Result Unit and important target-specific field must be explained.

Compact form:

```text
Result Unit / Field — short meaning / what belongs here
```

Preferred for important/ambiguous meaning:

```text
## Unit / Field Name

Purpose / Meaning:
...

Write here:
...

Do not put here:
...

Examples:
...
```

Examples are particularly important when domain wording contains terms such as `Result` that could be confused with `Target Step Result`.

Unexplained label-only schemas are not enough for a reusable Target Module.

## Lenses

Reusable Lens knowledge belongs in the canonical Core/profile Lens owners, not inside whichever Target Module happened to use it first.

A module stores only:

```text
Lens Profile
  reusable Lens IDs
  target-specific applicability gates
  known Result Units/fields that are natural Lens Analysis Surface candidates when useful
  local-only Lens prompts when genuinely non-reusable
```

A Lens does not define target-specific Result Units/fields. It surfaces Finding Candidates; Core Finding Disposition resolves their State/lifecycle/owner destination, and normal authority/resolution may later update already-declared Result Units.

If a local Lens becomes useful across multiple Target families, promote it into the Lens Library.

## Artifact / File Contract Remains Required During Current Migration

Every active Target Module declares representation expectations for its own target-specific meaning.

At minimum it states:

```text
REQUIRED persistence/output owners
PREFERRED separate artifacts/companions/registers
what remains embedded by default
what must be routed to another owner
when placement may remain UNRESOLVED
```

This remains profile guidance consumed by current `TF-10 / P-14`; it does not itself mutate files and does not imply one-file-per-Target.

Ordinary representation guidance may later be expressed more directly at Result Unit granularity, but the current AP/P-14 compatibility contract remains active until separately changed.
