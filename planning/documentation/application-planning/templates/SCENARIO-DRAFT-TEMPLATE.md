# Scenario Draft Template

Status: active supporting template; canonical semantic contract is SDS `TM-SCENARIO-PLANNING`.

Use this shape only when a human-readable Scenario representation is useful. A Scenario owns one real-life actor/external/Application journey, normative `SPS-*` path meaning, Application Contributions and independently useful `SR-*` must-holds. It can be formed with zero resolved Features.

Canonical owner:
`../../idtspe-methodology/active/profiles/sds/target-modules/TM-SCENARIO-PLANNING.md`

## Scenario context

```text
Scenario ID / name
Actor / external participants
Context / entry when material
Optional Application Definition source: KBF-* / RU-APP-07 refs when actually useful
Represented real-life path / family boundary
Application Contributions
Feature Resolution: OPEN | RESOLVED(ref)
```

## Scenario Path

```text
Scenario Path Step
| Required action / interaction
| Participant
| Screen / Surface
| Application Contribution / Feature
| Data / result / continuity
| Attached Scenario Requirements
| Related Application expected errors
| QRPE / Examples
```

`SPS-*` is normative Scenario meaning and may itself be a downstream realization obligation. One SPS may have zero, one or several attached `SR-*`; Scenario-wide SRs are not forced onto a single SPS. Actor/external-only SPS normally have no Application expected errors. When useful, separate an external event SPS from the Application trigger/entry SPS.

## Scenario Requirements

Step-attached:

```text
Scenario Requirement | Type | Plain required Scenario meaning | Attached Scenario Steps | QRPE / Examples
```

Scenario-wide:

```text
Scenario-wide Requirement | Type | Plain required Scenario meaning | QRPE / Examples
```

A visual `SR-*` remains Scenario-owned when its natural subject is the journey/result; Feature and/or Screen may participate in its realization without copying authority.

## Path Examples

Keep concise useful examples inline. When examples are numerous/large/reused, use the optional post-table `COL-SCEN-PATH-EXAMPLES` collection and reference stable `EX-*` items from path rows. Do not manufacture examples when none are material.
