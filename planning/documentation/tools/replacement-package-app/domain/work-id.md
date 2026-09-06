# WorkId

Status: selected target shared identity Value Object

## Responsibility / Meaning

Represent the stable correlation identity of one logical work stream. One Work corresponds to one semantic Work Intent / managed Issue and one active Git work branch/worktree for current repository execution.

`WorkId` does not own package, Git, review, publication or finalization state. Those facts belong to their natural owners and are correlated by this identity.

Schema-1 transport still calls this value `changeSetId`, and the managed Issue marker remains `ChangeSet-Id` until protocol evolution. Those names are compatibility aliases, not a target `ChangeSet` Aggregate.

## Invariants

- one exact WorkId identifies one logical work stream;
- title/label similarity, recency and UI selection are never identity authority;
- one WorkId maps to one managed Work Intent / Issue;
- current Git execution has one deterministic work branch for the WorkId;
- package realizations reference WorkId rather than owning/copying Work Intent or workspace identity.

## Tests

`WorkAggregateTests` proves exact WorkId validation and its use as the only work-correlation identity in the new Domain model.
