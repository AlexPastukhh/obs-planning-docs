<a id="template-target-instance"></a>
# <Target ID / Name>

Target Module: `<TM-ID>`
Invocation: `CREATE | REFINE | EXTEND | REVALIDATE | REPAIR`
Status: `<working/current status>`

## Target / Scope

<bounded target identity, intended result and material in/out scope>

## Relations / Handoffs

<material Target relations/handoffs>

## Source Set

```text
SRC-...
Source Subject: <owner/result/material ref>
Role: <for this Target/Unit>
Consumer Scope: <Target / RU subset>
Authority: <consumer-side authority>
Requiredness: <if material>
Freshness / Revalidation: <if material>
```

## Candidate Unit Selection

At initial Target formation, include one entry for **every candidate Unit heading from the active Target Module**.

### <Unit Semantic Name> (`<RU-ID>`)

AI recommendation: `<INCLUDE | INCLUDE — LIGHT/SOURCE-DERIVED | OMIT | OPEN>`

Situation / goal:
<current Target facts/requested change that matter to this Unit>

Relevant reference / Source coverage:
<which accepted Sources/references cover this Unit responsibility and how;
or `none / not relevant` with the reason>

Reason:
<why the Unit remains useful, may be thin, should be omitted, or remains open>

USER selection:
`<INCLUDE | OMIT | OPEN>`

State refs:
<Proposal / Decision / Finding / Revalidation refs only when useful>

For an `OMIT` recommendation, `Reason` must explicitly explain why **no independently useful unresolved result responsibility remains** after considering the situation and relevant Source/reference coverage. Do not remove the heading from this section after omission is selected.

<repeat for every module-defined candidate Unit>

## Current Target Work Units

Only USER-selected/material Units appear here.

### <RU-ID> — <Name>

<free-form Current Result Content appropriate to this Unit>

<material Source / State / artifact refs when useful>

## Target-level / Cross-Unit State

<only state whose natural subject is broader than one Unit>

## Target Step Result

<projection/composition of Current Result Content from actual selected/material Units>

## Artifact Placement

<resolved/material placement state>
