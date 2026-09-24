
# Target Module Model / Instance / Local Contract, Target Instance, Source, And Target Relation Model

Status: active generic methodology owner

<a id="target-instance-source-relation-contract"></a>
## 1. Distinct Concepts

Responsibility ID: `TARGET.INSTANCE-SOURCE-RELATION`

### Target Module Model

One concrete reusable `TM-*` methodology contract for a recurring Target family. Its generic definition/application rules are owned by the Target Module Meta-Model in [`../../target-modules/TARGET-MODULE-MODEL.md`](../../target-modules/TARGET-MODULE-MODEL.md#target-module-meta-model). Short form `Target Module` remains acceptable where the Model role is obvious.

Examples:

```text
TM-SCENARIO-PLANNING
TM-DOMAIN-DISCOVERY / Domain-Aggregate Modeling
TM-IMPLEMENTATION-SLICE
```

### Target Module Instance

One model-defined portion of one concrete Target Instance after a Target Module Model is actually applied to that Target. It is not a second Target and does not replace the Target identity.

```text
Target Module Model
+ concrete Target Instance
→ Target Module Instance inside that Target
```

It contains the instantiated Module-defined Unit inventory, Unit dispositions/result content, model-specific composition/validators and the module-defined Target Step Result structure. Concrete Source bindings, Target Relations and broader Core State remain parts of the Target Instance according to their natural owners even when the Model supplies reusable archetypes/guidance for them.

A Target Instance may contain `0..N` Target Module Instance portions when `0..N` reusable Models are actually applied to that same bounded Target. One applied Model contributes one current portion for that Target/basis. Merely consulting a Model as reusable guidance does not create an Instance portion. If a supporting Model exposes a genuinely separate bounded responsibility/natural owner, Target Formation routes that responsibility to the appropriate Target instead of hiding it as another portion of the current Target.

### Local Target Contract

A one-off Target-level governing/result-composition contract formed through Target Formation when no reusable Target Module fits well enough.

It is a **first-class IDTSPE route**, not an error/fallback that requires inventing a module. It receives the same Target Resolution Requirement, Source, Lens, Proposal, Decision, Artifact and Handoff machinery as a module-backed Target. `P-06 Lens` may scan/apply any registered Lens whose applicability gate fits the local Target.

It does not create Module-defined Unit kinds or a Module-defined Unit inventory. It may instantiate applicable Core-defined Units and define Contextual Units for uncovered bounded target-local responsibilities. A recurring Contextual pattern may later be promoted into reusable methodology only after explicit review.

### Target Instance

One concrete bounded planning responsibility/owner. It is broader than any Target Module Instance portion nested within it.

A Target Instance is the semantic/planning responsibility, not a file. Its current working composition may include applicable/open Target Resolution Requirements with recoverable coverage refs, a Source Set, Target Work Units, Target-level Core State Units and Target Relations/Handoffs. One bounded IDTSPE work step over that Target produces/refines a `Target Step Result` from all Target Module Instance contributions actually present, plus applicable Core-defined Unit contributions and any Contextual Units that actually formed. Under a Local Target Contract there is no Module-defined Unit inventory; target-local bounded work is covered by applicable Core-defined Units and Contextual Units.

Examples:

```text
SCN-CAPTURE
DOMAIN-RESEARCH-CAPTURE
SL-CAP-01
```

<a id="target-candidate-instance"></a>
#### Candidate Target Instance

Responsibility ID: `TARGET.CANDIDATE-INSTANCE`

A **candidate Target Instance** is an ordinary Target Instance formed under enclosing Proposal or Planning-Branch authority before canonical selection/integration. `candidate` is planning authority/status, not a second Target type.

```text
Proposal / Planning Branch
→ candidate Target Instance
→ ordinary Target Module Model / Target Module Instance path OR Local Target Contract path
→ Module-defined Unit inventory only when a Target Module Instance exists
→ applicable Core-defined Units
→ Contextual Units only when actually formed
→ ordinary Target Step Result shape

candidate Target Instance
≠ canonical selected/current Target authority
≠ realization authorization
```

The candidate Target Instance uses normal Target/Unit identities, methods, validators and representation. Its child content inherits the enclosing candidate authority unless a nested item has a materially different status/lifecycle. After selection, normal promotion/integration reuses the same Target meaning rather than regenerating a differently shaped "final" Target.

<a id="target-source-subject"></a>
### Source / Source Subject

A **Source** is accepted semantic truth, Evidence, constraint or accepted planning state actually used by the current consumer. The authoritative meaning being consumed is the **Source Subject**.

Typical Source Subjects include current semantic owners, accepted Target Step Results or Target Work Unit results, Decisions, Evidence, authoritative external documents and exact USER provenance when that statement itself is materially consumed.

### Source State Unit / Source Unit

A **Source State Unit** is the consumer-side typed Core State Unit/binding from the current Target or Target Work Unit to a Source Subject. Short form `Source Unit` is acceptable where Core State context is clear.

The Source State Unit owns the consumer relationship — such as role, consumer scope, authority, requiredness, freshness and review/revalidation obligation — not a copied second body of the Source Subject.

### Source Set

The actual runtime `Source Set` for one Target is the proportional set of Source State Units/bindings that the Target currently consumes. A Source State Unit may be Target-shared, Unit-local, Collection-local, Collection-item-local, Unit-Resolution-Slot-local, or apply to a declared subset.

> Semantic Owner Dependency
> Type: `CONTEXTUALIZES`
> Responsibility: `TWU.SUBJECT-REFERENCE`
> Owner: [Target Work Subject Reference Contract](TARGET-WORK-SUBJECT-REFERENCE-CONTRACT.md#target-work-subject-reference)

When `Consumer Scope` points into Target Work, preserve the smallest selected Unit / Collection / item / Slot subject through the canonical Target Work Subject Reference rather than defining a Source-specific address grammar.

<a id="target-relation"></a>
### Target Relation

Topology relation between Target Instances.

```text
Target Relation
≠ Source relation
```


## 2. Target Instance Composition / Target Step Result Relation

```text
Target Instance
├─ Identity / Purpose / Scope / governing contract
├─ applicable Target Resolution Requirements
│  ├─ Status: OPEN | PARTIAL | COVERED | NOT_APPLICABLE | BLOCKED | DEFERRED
│  └─ recoverable `Covered By` refs when material/non-obvious
├─ Source Set
│  └─ Source State Units / bindings
│     ├─ Target-shared
│     ├─ Unit/Collection/item/Slot-local through the canonical Target Work Subject Reference
│     └─ declared subset of Units / Collections / items / Slots as applicable
├─ 0..N Target Module Instance portions when reusable Target Module Models are actually applied
│  └─ each applied Model portion
│     ├─ complete instantiated Module-defined Unit inventory
│     │    └─ each Unit: RESOLVED / OPEN / explicit omission + proportional content
│     ├─ model-specific validators / composition rules
│     └─ module-defined Target Step Result contribution
├─ applicable Core-defined Units
│  instantiated only when applicable
├─ Contextual Units only when actually formed
├─ each material Target Work Unit, regardless of definition authority, may carry:
│    Unit Definition: Responsibility + Purpose + Result Content Contract
│    + direct Unit Resolution or one Unit Resolution Set when composite
│      └─ terminal Unit Resolution Slots (prepared/contextual as applicable; UNIT_WIDE roles are Unit-owned, PER_ITEM roles are owned by exactly one declared Collection; runtime state follows that ownership/scope)
│    + applicable Core State attached to the smallest natural Unit/Slot subject
│    + Current Result Content when sufficiently resolved
├─ Target-level Core State Units
├─ Target Relations / Handoffs
└─ Target Step Result
   = Target Module Instance contribution(s) actually present
     + applicable Core-defined Unit contributions through their Result Destinations
     + any Contextual Units that actually formed
```

Important:

```text
one Target
≠ one Target Work Unit
≠ one Core State Unit
≠ one file
```

A Target Module Model defines reusable Module-defined Work Unit/Result Unit kinds and, when actually applied to a Target, instantiates the complete module inventory through its Target Module Instance portion. Target composition is responsibility-based: peer Target Work Units represent distinct bounded Unit-level contracts, not repeated homogeneous items. When `0..N` values share one Unit Responsibility/Result Content Contract, that collection belongs inside the Unit's Current Result Content. Core may separately instantiate applicable Core-defined Target Work Units. A Local Target Contract does not create Module-defined kinds; uncovered **distinct** bounded target-local responsibilities may be defined as Contextual Units. Generic Source/Question/Proposal/Q/R/P/Decision/Evidence/Revalidation state uses Core State Unit semantics and may be Unit-local, Target-level, cross-Target or Work-Context-level. Core State Units do not become extra Target Step Result Units merely because they participate in Unit Resolution.

A Target Work Unit result may be the precise downstream **Source Subject** when another Target depends only on that accepted meaning. The downstream Target still establishes its own explicit Source State Unit/binding; Source authority is never inferred from topology alone.

## 3. Working Target Relation Vocabulary

```text
PART_OF
PARALLEL_WITH
PRECEDES
FLOW_TO
OVERLAPS_WITH
ALTERNATIVE_TO
CONTRIBUTES_TO
```

### PART_OF

One Target is a bounded part of a larger semantic/planning result.

### PARALLEL_WITH

Targets can be planned independently against overlapping/shared Sources.

### PRECEDES

One Target occurs earlier in a real-world/planning sequence.

Precedence does not automatically make its output a Source.

### FLOW_TO

The real-world/planning result of one Target flows into another.

```text
A FLOW_TO B
```

means topology:

```text
result/state from A is followed by / enters B
```

It does **not** grant semantic authority.

If B actually depends on the accepted meaning produced by A, B separately declares that accepted output in its Source Set.

### OVERLAPS_WITH

Targets cover partly overlapping meaning and need duplicate/conflict review.

### ALTERNATIVE_TO

Targets/forms represent mutually alternative routes/scopes.

### CONTRIBUTES_TO

A Target contributes to a broader result/composition without implying that a dedicated composition Target must exist.

## 4. Source Relation Remains Separate

Conceptual Source State Unit/binding:

```text
Source State Unit
  identity when useful
  Source Subject / ref
  Consumer Scope
  role
  authority
  requiredness
  freshness
  review / revalidation obligation
  reason
```

`Consumer Scope` may be the whole Target, one Target Work subject referenced through `TWU.SUBJECT-REFERENCE`, or a declared subset of such subjects. A trivial/obvious Source relation may remain embedded/implicit rather than gaining a persisted identity.

Conceptual Target relation:

```text
TargetRelation
  fromTarget
  relation type
  toTarget
  reason
```

Do not overload one structure to mean both.

## 5. Another Target's Output Becomes A Source Only Explicitly

Example:

```text
SCN-CAPTURE accepted result:
  captured material becomes durably available for later review
```

Later:

```text
SCN-REVIEW
  Source State Unit:
    Source Subject:
      accepted output of SCN-CAPTURE
    Consumer Scope:
      relevant Scenario Work Unit(s) / Target
    role:
      startingStateFrom
```

Separately:

```text
SCN-CAPTURE FLOW_TO SCN-REVIEW
```

The first is the consumer-side semantic Source authority binding; the accepted output of `SCN-CAPTURE` remains the Source Subject. The second is topology.

## 6. Step-02 Is Not A Fixed Target Type

Real-life solution planning may dynamically form one or more Targets.

Possible shapes:

```text
one bounded real-life route comparison
one constraint/evidence Target
several parallel real-life scopes
one material whole-solution composition Target
no extra Target when accepted Sources already resolve the issue
```

Names such as `RLS-01` are example instance labels, not a mandatory global Target Type.

## 7. Composition Boundary

Several Targets may all `CONTRIBUTE_TO` one downstream source package without creating another Target.

Create a composition Target only when composition itself contains material unresolved choices, for example:

```text
which selected routes can coexist?
who owns the handoff?
what order/composition produces the desired real-world result?
which combination should be accepted?
```

If composition is mechanical:

```text
accepted Target outputs
→ downstream Source package
```

with no new semantic owner.

## 8. High-Level Example — Research Capture

```text
NEED-01
  preserve useful research material without breaking current work
```

Step-02 dynamically forms two useful planning Targets:

```text
T-ROUTE-CAPTURE
  compare:
    bookmark
    note app
    custom low-friction capture

T-ROUTE-LATER-USE
  compare:
    organize immediately
    temporary holding then later review
```

Topology:

```text
T-ROUTE-CAPTURE FLOW_TO T-ROUTE-LATER-USE
```

Both consume the accepted `NEED-01` meaning through their own Source State Unit/binding when explicit Source addressability is material.

If the later-use Target also depends on the accepted property:

```text
captured material remains durably reviewable
```

then that accepted output is additionally declared as a Source.

If the two accepted routes combine mechanically, no composition Target is created.

If there are two materially different whole-solution combinations, a normal dynamically formed composition Target may compare them.

## 9. Why This Separation Matters

It preserves:

```text
one semantic owner per accepted meaning
narrow Source contracts
parallel Target planning
explicit topology
selective revalidation
```

without making every flow relation into semantic authority.
