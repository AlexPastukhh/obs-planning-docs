# Prototype Result Template

> **Compatibility vocabulary boundary.** This supporting file preserves older application-planning discovery/workspace heuristics. Terms such as `Scenario DATA`, `Behavior Items`, standalone `Requirement`, or `Slice Strategy` below do not define current SDS owner identities. Current authority is the active SDS Target/Lens registries: Feature owns behavior/semantic data, Scenario owns actor-to-Benefit journey composition, requirements stay with natural Feature/Domain/Slice/Shared owners, and Slice Strategy is not an active Target family. Use older terms only as supporting heuristics where they do not conflict with current owners.


Status: active reusable recommended template
Purpose: record prototype evidence and promote only supported meaning into the real current owners.

Canonical workflow: [`../prototype-planning-workflow.md`](../prototype-planning-workflow.md)
Cross-cutting context: [`../requirements-and-change-context.md`](../requirements-and-change-context.md)

## Prototype Identity / Plan

| Field | Value |
|---|---|
| Prototype ID | <ID> |
| Related Prototype Plan | <link> |
| Mode | interaction/workflow / technical feasibility spike / other |
| Related Concept / application context | <link> |

## Hypothesis / Question
<What was tested.>

## Actual Setup
<What was real/simulated and how the prototype was run.>

## Observed Results
<Observed behavior/evidence, not desired behavior rewritten as observation.>

## Evidence

| Evidence | Observation | Reliability / limitation |
|---|---|---|
| <evidence> | <observation> | <limitation> |

## Unexpected Findings / Limitations
<Material only.>

## Result

```text
supported / rejected / inconclusive
```

## Prototype Scenario Findings — When Applicable

| Prototype Scenario | Finding | Disposition |
|---|---|---|
| <PSCN-X> | <boundary/flow/result finding> | promote / split / merge / reject / needs evidence |

## Prototype Screen Findings — When Applicable

| Prototype Screen | Finding | Disposition |
|---|---|---|
| <PSCR-X> | <spatial/layout finding> | promote / merge / split / reject / needs evidence |

## Requirement / DATA / Behavior Findings

### Requirements
| Candidate Requirement | Evidence-backed disposition | Current/promotion owner |
|---|---|---|
| <REQ-X> | confirmed-current / rejected / needs-evidence | <owner/link> |

### Scenario DATA / Behavior
<What provisional meaning should be promoted/reviewed in Scenario/shared Scenario owners.>

## Future Scenario Proposals / Change Axes
<Preserve justified evolution context and confidence. Do not convert it into current Requirements automatically.>

## Implementation-Scoped Proposals
<Which Proposals were created/refined/selected/rejected/deferred. Selected implementation meaning must live in its Domain/Slice/other owner.>

## Affected Planning Owners

| Affected owner | Previous/current relation | Evidence-backed update/review need | Resulting/proposed state |
|---|---|---|---|
| <owner> | <relation> | <need> | <state> |

Use the smallest complete owners that actually depend on the evidence.

## Promotion / Handoff

```text
Prototype Scenario findings
→ Application Scenario refinement / Scenario Discovery / detailed Scenario Drafts

Prototype Screen findings
→ canonical Screen owners when useful

Requirements
→ narrowest real canonical owner

DATA / Behavior
→ Scenario/shared Scenario owner

Change Axes / Future Scenario Proposals
→ cross-cutting change context
```

Prototype artifacts do not remain a hidden second authority after selected meaning is promoted.

## Upstream Impact — When Material
<Concept / whole-solution / application-boundary assumptions that must be reviewed.>

## Follow-Up Experiment — When Material
<Only if another evidence gap genuinely warrants it.>

## Current Decisions
<Selected evidence-backed conclusions; use shared Decision trace fields when material and integrate selected semantic meaning into its real owner.>

## Q/R/P
<Use the Core Q/R/P lifecycle contract. An experiment may answer a Question while leaving a residual Risk/Problem active; retain material answer/Decision trace when useful. AI review must distinguish evidence from user-owned preference. If none: `No material unresolved issues identified.`>

This template does not authorize repository edits, archive creation, commit or push.
