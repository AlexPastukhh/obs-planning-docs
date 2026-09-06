# Repository Target

Status: active current Value Object owner

## Responsibility / Meaning

Represent one exact registered repository target value as `(RepositoryIdentity, RegisteredRepositoryPath)`.

`RepositoryTarget` has no independent Domain identity or lifecycle. Equality is structural across the complete value. A same-origin clone at another canonical path is therefore a different `RepositoryTarget` value even though `RepositoryIdentity` is equal.

A UI/persistence registration key may still identify a saved selection slot or navigation record, but that key is not `RepositoryTarget` Entity identity. Changing a registered repository location validates the new repository/path and replaces the stored `RepositoryTarget` value rather than mutating an identity-bearing Domain object.

## Behavior Items implemented

- `BI-RPKG-CURRENT-EXACT-REPOSITORY-TARGET`
- supports `BI-RPKG-SNAPSHOT-EXACT-SOURCE`
- planned target `BI-RPKG-APPLY-EXACT-REPOSITORY-TARGET`

## Value / Relationships / Invariants

- `RepositoryTarget = (repositoryIdentity, registeredPath)`;
- whole-value equality determines whether two targets are the same Domain value;
- same-origin clones at different canonical paths remain distinct values;
- current registered location must validate as the intended Git repository before it grants repository-operation authority;
- changing visible UI selection does not change an already-captured operation's exact target value;
- replacing a saved location is an application/persistence update that installs a newly validated `RepositoryTarget` value; it does not mutate Value Object identity.

## Domain Implementation Items

### DI-RPKG-REPOSITORY-TARGET-EXACT-VALUE — Resolve execution from the exact registered target value
Requirement:
Repository execution authority must use the exact captured `RepositoryTarget(repositoryIdentity, registeredPath)` and revalidate that path/repository relation rather than substituting whichever same-origin clone/current checkout is convenient.

Reason:
Exact repository work and Snapshot source truth must not drift when several local clones or locations exist.

Derived from:
`BI-RPKG-CURRENT-EXACT-REPOSITORY-TARGET`.

## Tests

Local Domain proof should cover structural equality, same-origin/different-path inequality and canonical-path revalidation. Slice tests continue to prove actual repository resolution and filesystem/Git behavior.

## Evolution Impact

### EVO-RPKG-ADOPT-REVIEWED-RESULT-WORKFLOW
The reviewed-result workflow continues to capture and use one exact `RepositoryTarget` value. No selected target requires turning this Value Object into an Entity/Aggregate.
