
# Target Module / Local Contract, Target Instance, Source, And Target Relation Model

Status: active generic methodology owner

## 1. Distinct Concepts

### Target Module

Reusable methodology contract for a recurring Target family.

Examples:

```text
TM-SCENARIO-DRAFT
TM-DOMAIN-DRAFT
TM-IMPLEMENTATION-SLICE
```

### Local Target Contract

A one-off Target form created through Target Formation when no reusable Target Module fits well enough.

It may later be promoted into a Target Module only if repetition justifies reuse.

### Target Instance

One concrete bounded planning owner.

Examples:

```text
SCN-CAPTURE
DOMAIN-RESEARCH-CAPTURE
SL-CAP-01
```

### Source

Accepted semantic truth, Evidence, constraint or accepted planning state actually used by the current Target.

### Target Relation

Topology relation between Target Instances.

```text
Target Relation
≠ Source relation
```

## 2. Working Target Relation Vocabulary

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

## 3. Source Relation Remains Separate

Conceptual Source entry:

```text
Source
  identity / owner
  role
  relationToTarget
  authority
  requiredness
  freshness
  review obligation
  reason
```

Conceptual Target relation:

```text
TargetRelation
  fromTarget
  relation type
  toTarget
  reason
```

Do not overload one structure to mean both.

## 4. Another Target's Output Becomes A Source Only Explicitly

Example:

```text
SCN-CAPTURE accepted result:
  captured material becomes durably available for later review
```

Later:

```text
SCN-REVIEW
  Source:
    accepted output of SCN-CAPTURE
    relationToTarget:
      startingStateFrom
```

Separately:

```text
SCN-CAPTURE FLOW_TO SCN-REVIEW
```

The first is semantic Source authority. The second is topology.

## 5. Step-02 Is Not A Fixed Target Type

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

## 6. Composition Boundary

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

## 7. High-Level Example — Research Capture

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

Both consume `NEED-01` as Source.

If the later-use Target also depends on the accepted property:

```text
captured material remains durably reviewable
```

then that accepted output is additionally declared as a Source.

If the two accepted routes combine mechanically, no composition Target is created.

If there are two materially different whole-solution combinations, a normal dynamically formed composition Target may compare them.

## 8. Why This Separation Matters

It preserves:

```text
one semantic owner per accepted meaning
narrow Source contracts
parallel Target planning
explicit topology
selective revalidation
```

without making every flow relation into semantic authority.
