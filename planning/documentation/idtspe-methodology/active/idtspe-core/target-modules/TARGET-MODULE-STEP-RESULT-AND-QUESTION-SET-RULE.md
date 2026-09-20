# Target Module Step-Result Contract And Question-Set Rule

Status: active generic Target Module rule

## Core Resolution State vs Unit Result Content

Every concrete Target may have generic Core Resolution State such as Sources, Questions, Proposals, Q/R/P, Branches, Decisions, Evidence, Revalidation and relations. Those semantics remain Core-owned and attach to the smallest correct subject.

The target-specific work surface is composed from Units:

```text
Target Step Result
→ Module-defined / target-local Units
→ Unit Resolution
→ Current Result Content
```

A Target Module must not duplicate generic Core state as Result Content fields merely to make it visible. Unit Result Content is the normalized target-specific answer; Resolution State explains/maintains the decision space when useful.

## Broad Discussion And Integration Checkpoint

The Step-Result contract is a semantic integration contract, not a requirement to render the full schema in every conversational reply.

```text
Broad Discussion
→ may span many messages
→ uses Key Points to structure material logical discussion parts
→ may carry explicit material Proposals + related Q/R/P/Evidence inline
→ does not require a per-response Intake Summary or block-owner record

Integration Checkpoint
→ situationally reconciles accumulated discussion/current Sources when a coherent whole-state view is useful
→ renders coherent applicable Generic State
→ renders the complete Module-defined Target Result Unit inventory with resolved / OPEN / explicit-omission dispositions
→ applies relevant Lens/consistency checks
→ preserves unresolved alternatives
```

A Target Module invocation may serve as an Integration Checkpoint. It does not end discussion and does not imply physical persistence. Canonical owner: [`planning/documentation/idtspe-methodology/active/idtspe-core/representation/interaction/BROAD-DISCUSSION-AND-INTEGRATION-CHECKPOINT-PROJECTION.md`](../representation/interaction/BROAD-DISCUSSION-AND-INTEGRATION-CHECKPOINT-PROJECTION.md).

## Target Module / Unit Contract

A reusable Target Module should explain proportionally:

```text
Purpose / recurring Target family
Target formation / scope / shared Source archetype where useful
Unit Contract inventory / dependencies
for each Module-defined Unit:
  Result Responsibility
  Applicability / Materiality / Disposition
  exact reusable methodology owner / stable Unit Contract anchor
for each material Unit:
  Inputs / Source needs
  Drivers
  Knowledge Basis / guidance when useful
  Proposal discovery aids when useful
  Lens triggers
  Result Content Contract
  Validators / consumers / revalidation / representation
Target-level validators / handoff / representation where genuinely cross-Unit
```

The runtime may additionally form Contextual Units under the Core rule. Their conclusion has an explicit destination and does not automatically create a durable Result section.

## Complete Unit Inventory / Proportional Content Rule

```text
Target Module Step-Result Contract
= complete Module-defined Unit inventory

Concrete Target Step Result
= every Module-defined Unit declared
+ resolved / OPEN / explicit omission disposition
+ substantive depth only where material
```

A declared Unit/field does not imply:

```text
every Unit must receive substantive work
every optional field must be populated
every Unit must persist separately
every Unit must be equally detailed
an omitted/non-material Unit needs a bare N/A placeholder
```

A non-material Module-defined Unit uses a concise omission reason. Optional fields **inside** a Unit may remain absent when their field contract allows that. Contextual Units remain contextual and are not predeclared.

## Methodology Binding In Produced Target Results

The Core [Opening Unit Checkpoint](../runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#opening-unit-checkpoint) owns methodology-owner binding before substantive Unit resolution. When a Target representation is authored, this representation contract renders that already-resolved binding using the Documentation [Methodology / Contextual Annotation Principle](../../../../principles-and-terminology.md#methodology--contextual-annotation-principle) before the Unit's substantive content. It does not redefine lookup, ambiguity handling or smallest-sufficient-scope semantics.

## Proposal Target Result Representation

Candidate Target Instance authority/lifecycle is owned by the Core [Proposal/Decision lifecycle](../resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md#3b-proposal-target-result--candidate-target-instance-under-proposal-authority) and [Target Instance model](../runtime/target-work/TARGET-CONTRACT-INSTANCE-SOURCE-RELATION-MODEL.md#candidate-target-instance). This file owns only the representation consequence:

```text
candidate Target Instance body
→ render through the ordinary active Target Module / Local Target Contract
→ use ordinary Target/Unit names and normal result-content shape
→ do not repeat Proposal/Candidate status on every nested Unit/Requirement/row
```

Local nested status is written only when it materially differs from the enclosing candidate boundary. Representation never upgrades candidate authority or grants realization permission.

## Output Schema / Template Compatibility

`Output Schema` and `Target-specific Output Template` remain valid technical/compatibility terms for one projection shape of the Step-Result Contract.

They are not the primary semantic definition of the Target result.

During staged profile migration, existing module output headings are interpreted as Result Units/fields by meaning even when the file does not yet use explicit `Result Unit` labels.

## Knowledge Basis When Theory Adds Value

A reusable Target Module may contain or reference a Knowledge Basis when reusable theory/reference knowledge materially helps plan or evaluate that recurring Target family. The shared [`Knowledge Basis guidance`](../knowledge-bases/KNOWLEDGE-BASIS-CONTRACT.md) does not require one fixed section shape.

```text
Upstream Source Contract
= current Target-instance input/evidence/constraint archetype

Knowledge Basis
= reusable principles/rules/theory/pattern knowledge
  used to plan this recurring Target family
```

Knowledge may be inline, referenced from files/folders/sections/external sources, separated into its own applied Knowledge Basis, or combined. Existing mode labels are optional representation only. Read deeper theory proportionally when it helps the current work.

Do not duplicate reusable Lens evaluation knowledge inside a Target Module merely because the module uses that Lens.

## Decision-Driver Examples Are Non-Exhaustive

Unit Contracts may seed reusable Question/Problem drivers; Target Module level may seed genuinely Target-wide formation drivers. These are non-exhaustive and not automatic USER questions.

Concrete runtime Questions/Problems from Sources, previous steps/checkpoints, Broad Discussion, user/AI input, Findings or earlier Units are accepted on equal Core footing. Current Questions may be added, removed, split, merged or reopened through normal Core question-set/Unit Resolution work as the actual situation changes; Module presets are not a closed questionnaire.

`TF-06 QUESTION_SET` coordinates the current Target-level view rather than owning Unit-local question meaning. An independently useful **new Goal / Desired Outcome** changes scope/Target responsibility and therefore goes through normal Scope / Target Formation rather than being silently introduced as a generic State item or ordinary local Unit driver.

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

A Lens does not define target-specific Result Units/fields. It may contribute Broad Discussion analysis/Key Points without creating a Unit; material meaning requiring State/lifecycle/owner disposition surfaces as a Finding Candidate, and Core Finding Disposition resolves its destination, and normal authority/resolution may later update already-declared Result Units.

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
