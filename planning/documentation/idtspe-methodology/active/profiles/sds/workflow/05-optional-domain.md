
# Phase 05 — Optional Domain — Generic

Status: active module-driven navigation family

> Chronological direction is owned by `../shared/directed-methodology-workflow-and-next-step-resolution.md`; numeric Phase 05 is not a rule that all testing waits until Phase 09.

## Candidate Target Modules

```text
TM-DOMAIN-DISCOVERY
TM-DOMAIN-DRAFT
TM-TEST-DESIGN — immediately after an individual Domain owner when isolated proof is material
TM-APPLICATION-DEFINITION — optional comparative Evidence / revalidation
```

## Sources

Direct Domain Sources:

```text
selected Scenarios
Scenario DATA
Behavior Items
local/shared must-hold conditions / invariants / negative guarantees
```

Inherited lineage:

```text
Need / selected real-world solution
Application Definition
```

Conditional Evidence/constraints:

```text
Prototype / bounded technical feasibility Evidence
SDS-WORKSPACE-EVOLUTION.md
existing Domain/implementation Evidence
```

## IDTSPE Rule

Domain Discovery and Domain selection are different useful results. Discovery may remain inline for simple cases; material Domain selection uses full IDTSPE.

Valid Answer:

```text
no separate Domain owner
```

Each selected Domain owner may be its own repeatable IDTSPE Target/artifact.

```text
TM-DOMAIN-DRAFT / CaptureItem
→ create/update CaptureItem owner
→ TM-TEST-DESIGN / CaptureItem
   when isolated rule/invariant proof is material
```

Domain Test Design can therefore precede all Slice planning.

## Domain Proof Gate Before Shared Test Strategy

For the current selected Domain set, material isolated proof responsibilities should be:

```text
PLANNED
or NOT_APPLICABLE
or explicitly DEFERRED
```

before shared `TM-TEST-STRATEGY` is opened later.

## Specialized Methodology

`TM-DOMAIN-DISCOVERY` links to `../lenses/reusable/LENS-DOMAIN-MODELING-DDD.md`.

DDD patterns are candidate reasoning aids, not decisions.

## Exit / Direction

Use the Domain→Slice gate in `../shared/scenario-domain-slice-module-coverage-contract.md`.

Typical next step:

```text
current Domain owner incomplete
→ REFINE current Domain Target

Domain owner selected + isolated proof material
→ TM-TEST-DESIGN for this Domain owner

all selected Domain owners/proof obligations ready
→ TM-SLICE-STRATEGY or direct Slice formation
```
