# Requirements And Change Context

Status: active reusable canonical owner
Scope: cross-cutting application-planning semantics for Requirements, expected stability, Future Scenario Ideas, application-specific Change-Axis evidence/placement and early implementation-scoped Ideas used across solution/application and domain/implementation planning. Generic Workspace Change Pressure / Change Axis semantics are owned by sibling Architecture Planning.

## 1. Purpose

Application planning needs explicit conditions that must hold without turning every requirement into a Scenario or every early technical thought into architecture.

```text
Need
= why a user/actor needs something

Scenario
= coherent user/actor-visible behavior that reaches an independently meaningful observable result

Requirement
= a condition/property/constraint the selected solution must satisfy

Change Axis
= generic evidence-backed Workspace variability/pressure concept owned by sibling Architecture Planning; application planning contributes Scenario/Requirement/prototype evidence and records application impact

implementation-scoped Idea
= an ordinary Idea about a possible implementation route
  that is not current implementation truth until selected and integrated
```

These meanings are related but not interchangeable.

## 2. Requirement

A `Requirement` states something the selected solution/application/design **must satisfy**.

Examples include:

```text
behavioral requirement
informational / DATA requirement
spatial / visual requirement
domain / invariant requirement
technical / implementation requirement
integration requirement
operational / non-functional requirement
external constraint
```

The labels are optional classification aids, not a mandatory taxonomy.

A Requirement is not automatically a Scenario. For example, `authentication must use organization SSO` may be a confirmed technical/external Requirement while no independent user Need/result boundary exists that would justify an SSO Scenario.

### Recommended Requirement shape

Use only fields that materially help:

```text
Requirement ID
Statement
Status
Source / rationale
Related Need / Scenario / Screen / Domain / Slice when applicable
Expected Stability
Evidence / confidence when material
Current owner
```

Recommended statuses:

```text
candidate
confirmed-current
rejected
needs-evidence
```

Recommended stability states:

```text
stable
likely-variable
unknown
```

`confirmed-current` means required for the current selected solution. It does not mean immutable forever.

## 3. Requirement Placement And Ownership

Use the narrowest real canonical owner:

```text
application-wide/shared or not-yet-localized Requirement
→ shared application Requirements owner/registry

true only for one Scenario
→ Scenario-local Requirement or linked requirement owner

spatial meaning true only for one Screen
→ Screen owner

Domain invariant
→ Domain owner

implementation-only constraint true for one Slice
→ Slice/implementation owner
```

A Requirement may be referenced from many consumers but has one current definition. Consumer links do not create duplicate requirement authority.

One Requirement may use one file or several Requirements may share a registry. Stable addressability does not require one file per Requirement.

## 4. Prototype And Requirement Lifecycle

Prototype work may discover candidate Requirements.

```text
prototype observation
→ candidate Requirement
→ evidence/review
→ confirmed-current / rejected / needs-evidence
→ promote selected meaning to its real canonical owner
```

Do not promote every prototype observation into a Requirement. A useful prototype finding may instead become a Scenario boundary, DATA item, Behavior Item, Screen hypothesis, Change Axis, Idea or rejected assumption.

## 5. Future Scenario Ideas

A `Future Scenario Idea` is an Idea about behavior the application might later need. It is not a current Scenario and not a Requirement merely because it is plausible.

Classify future meaning honestly:

```text
Current Requirement
→ must be supported now

Likely Evolution
→ there is material evidence/reason to expect the change

Speculative Possibility
→ plausible thought with weak/no decision-grade evidence
```

Future Scenario Ideas are useful inputs to Change-Axis reasoning but must not silently expand current scope.

## 6. Change Axis

Generic `Change Axis`, Workspace Use Case / Work Path, Extension and Change Pressure semantics are canonical in sibling [`../architecture-planning/workspace-use-cases-and-change-pressure.md`](../architecture-planning/workspace-use-cases-and-change-pressure.md).

Application Planning contributes evidence such as:

```text
current / candidate Requirements
Scenarios / Behavior Items
prototype findings
Future Scenario Ideas
selected/plausible application Extensions
provider/integration constraints
observed application change history
```

Application-local axis records may still live in project `solution-and-application/change-axes/` or another useful local zone. They should record the generic axis identity/evidence/confidence plus affected application Requirements / Scenarios / Domain / Slices when known.

Critical invariant remains:

```text
Change Axis
→ reason to evaluate adaptability/coupling where the axis actually crosses

Change Axis
≠ Requirement to generalize now
≠ instruction to build an extension point
```

Domain/Slice planning consumes high-confidence material change pressure through the Architecture Planning contract while rejecting abstractions justified only by speculation.

## 7. Implementation-Scoped Ideas

Do not create a separate `Implementation Idea` ontology. Use the generic reusable `Idea` concept with implementation scope/placement.

Examples:

```text
use a provider adapter
keep a separate read model
use an event log
derive status from lifecycle state
use optimistic UI
```

Before selection these are candidate answers, not architecture truth.

Recommended lightweight metadata when useful:

```text
Idea ID
Scope: implementation
Related Requirement / Scenario / Change Axis / Domain / Slice
Status: raw / candidate / promoted / rejected
Reason / evidence / test need
Current promoted owner when applicable
```

Promotion rule:

```text
early implementation-scoped Idea
→ reviewed during Domain/Slice work
→ rejected
or
→ selected meaning integrated into Domain / Slice Strategy / Slice / other real owner
→ original Idea may retain provenance/status/link
→ promoted Idea is no longer a second current implementation owner
```

## 8. Recommended Two-Zone Project-Local Topology

When a project benefits from a physical separation between application meaning and implementation design, use two broad planning zones:

```text
solution-and-application/
├── README.md
├── ideas/
├── requirements/
├── implementation-ideas/
├── change-axes/
├── solution/
├── concept/
├── prototype/
│   ├── scenarios/
│   └── screens/
├── scenarios/
└── screens/

domain-and-implementation/
├── README.md
├── ideas/
├── domain/
└── slices/
```

This topology is recommended organization, not mandatory ontology.

```text
solution-and-application
→ why / what / user-visible behavior / spatial requirements / product requirements / prototype evidence / expected evolution / early implementation thoughts

domain-and-implementation
→ stable conceptual structure / variation boundaries / implementation decomposition / delivery / verification
```

A physical folder is not automatically a registered parallel-work scope or semantic owner.

### Root intake rule

Root `ideas/`, `implementation-ideas/`, `requirements/` and `change-axes/` may temporarily hold meaning before its narrowest owner is known. Once meaning is understood and promoted, the structured canonical owner wins; the root intake record may retain provenance/link/status but must not remain a competing current truth.

## 9. Cross-Zone Contract

```text
first-zone semantic owners
→ are requirements/inputs for Domain and Slice planning

second-zone planning
→ may discover upstream problems/constraints
→ must return them as explicit findings/review needs
→ must not silently redefine Scenario/Screen/Requirement/Application Concept meaning
```

Typical flow:

```text
Scenario / Screen / Requirement / Change Axis
→ consumed by Domain / Slice planning

Domain / Slice finding
→ explicit upstream review
→ Requirement / Scenario / Screen / Concept / Change Axis may change
→ downstream owners are then reviewed again
```

This is progressive planning, not one-way waterfall.

## 10. Reference Object Boundary

Requirement/Change-Axis identity and ordinary dependencies use normal repository links by default. A literal Requirement or other canonical fragment becomes a `Reference Object Candidate` only when exact materialized copies and stale-copy checking are genuinely valuable under the existing Linked Notes contract.
