
# Target Module / Local Contract, Target Instance, Source, And Target Relation Model

Status: active generic methodology owner

## 1. Distinct Concepts

### Target Module

Reusable methodology contract for a recurring Target family.

Examples:

```text
TM-SCENARIO-PLANNING
TM-DOMAIN-DISCOVERY / Domain-Aggregate Modeling
TM-IMPLEMENTATION-SLICE
```

### Local Target Contract

A one-off Target form created through Target Formation when no reusable Target Module fits well enough.

It is a **first-class IDTSPE route**, not an error/fallback that requires inventing a module. It receives the same Scope/Source/Question/Lens/Proposal/Decision/Artifact/Handoff lifecycle as a module-backed Target. `TF-06A` may scan/apply any registered Lens whose applicability gate fits the local Target.

It may later be promoted into a Target Module only if repetition justifies reuse.

### Target Instance

One concrete bounded planning owner.

A Target Instance is the semantic/planning responsibility, not a file. Its current working composition may include a Source Set, Target Work Units, Target-level Core State Units and Target Relations/Handoffs. One bounded IDTSPE work step over that Target produces/refines a `Target Step Result` from applicable Target Work Unit Current Result Content.

Examples:

```text
SCN-CAPTURE
DOMAIN-RESEARCH-CAPTURE
SL-CAP-01
```

### Source / Source Subject

A **Source** is accepted semantic truth, Evidence, constraint or accepted planning state actually used by the current consumer. The authoritative meaning being consumed is the **Source Subject**.

Typical Source Subjects include current semantic owners, accepted Target Step Results or Target Work Unit results, Decisions, Evidence, authoritative external documents and exact USER provenance when that statement itself is materially consumed.

### Source State Unit / Source Unit

A **Source State Unit** is the consumer-side typed Core State Unit/binding from the current Target or Target Work Unit to a Source Subject. Short form `Source Unit` is acceptable where Core State context is clear.

The Source State Unit owns the consumer relationship — such as role, consumer scope, authority, requiredness, freshness and review/revalidation obligation — not a copied second body of the Source Subject.

### Source Set

The actual runtime `Source Set` for one Target is the proportional set of Source State Units/bindings that the Target currently consumes. A Source State Unit may be Target-shared, Unit-local or apply to a declared subset of Target Work Units.

### Target Relation

Topology relation between Target Instances.

```text
Target Relation
≠ Source relation
```


## 2. Target Instance Composition / Target Step Result Relation

```text
Target Instance
├─ Identity / Purpose / Scope / Contract
├─ Source Set
│  └─ Source State Units / bindings
│     ├─ Target-shared
│     ├─ Unit-local
│     └─ multi-Unit as applicable
├─ Target Work Units
│  ├─ Module-defined
│  └─ Contextual
│     each:
│       Result Responsibility
│       + Unit Resolution ↔ applicable Core State Units
│       + Current Result Content
├─ Target-level Core State Units
├─ Target Relations / Handoffs
└─ Target Step Result
   = composition/projection of applicable
     Target Work Unit Current Result Content
```

Important:

```text
one Target
≠ one Target Work Unit
≠ one Core State Unit
≠ one file
```

Target Module/Local Target Contract defines the target-specific Work Unit/Result Unit kinds. Generic Source/Question/Proposal/Q/R/P/Decision/Evidence/Revalidation state uses Core State Unit semantics and may be Unit-local, Target-level, cross-Target or Work-Context-level. Core State Units do not become extra Target Step Result Units merely because they participate in Unit Resolution.

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

`Consumer Scope` may be the whole Target, one Target Work Unit, or a declared subset of Work Units. A trivial/obvious Source relation may remain embedded/implicit rather than gaining a persisted identity.

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
