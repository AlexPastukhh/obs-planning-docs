# Repository Target

Status: active current Domain Object owner

## Responsibility / Meaning

Represent one stable registered local repository target identity. A Repository Target has one logical Repository Identity and one mutable registered filesystem location; two same-origin clones remain distinct targets unless the user explicitly changes the registered location of the same target.

## Behavior Items implemented

- `BI-RPKG-CURRENT-EXACT-REPOSITORY-TARGET`
- supports `BI-RPKG-SNAPSHOT-EXACT-SOURCE`
- planned target `BI-RPKG-APPLY-EXACT-REPOSITORY-TARGET`

## Identity / Relationships / Invariants

- stable target ID is distinct from repository origin identity;
- current registered location must validate as the same intended Git repository before it grants repository-operation authority;
- same-origin clone convenience does not substitute another Repository Target;
- changing visible UI selection does not change an already-captured operation's target authority.

## Domain Implementation Items

### DI-RPKG-REPOSITORY-TARGET-STABLE-IDENTITY — Resolve execution from stable target identity
Requirement:
Repository execution authority must resolve through the persisted Repository Target identity plus revalidated location/repository identity, not through whichever same-origin clone/current checkout is convenient.

Reason:
Exact repository work and Snapshot source truth must not drift when several local clones or locations exist.

Derived from:
`BI-RPKG-CURRENT-EXACT-REPOSITORY-TARGET`.

## Tests

Current repository/integration proof is mainly exercised through Slice tests that resolve/mutate/export against Repository Target. Independent local Domain tests are optional unless target identity rules become easier to prove separately.

## Evolution Impact

### EVO-RPKG-ADOPT-REVIEWED-RESULT-WORKFLOW
The planned reviewed-result Scenario still depends on exact Repository Target identity. Any additional target-related requirement must be derived through downstream Requirements Discovery; this Evolution Impact does not assign unrelated reviewed-result/integration ownership here.
