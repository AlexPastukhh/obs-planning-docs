# Documentation Update Workflow

Status: active reusable documentation-layer workflow
Scope: apply already selected documentation meaning to the correct owners. Package production and repository finalization are separate routes.

## Preconditions

- applicable Documentation Use Case and canonical owner route are resolved;
- reusable documentation principles were read proportionally;
- conceptual uncertainty is resolved or explicitly retained;
- edit/package permission comes from the selected concrete route.

## Update Algorithm

```text
selected current meaning
→ identify narrow canonical owners
→ update complete affected owner bodies
→ synchronize Direction / Use-Case / Scenario/navigation references when responsibility changed
→ validate links / duplicate authority / status
→ use File Update Plan when change is broad or dependency-sensitive
→ use replacement-package producer only when that concrete route is requested
```

Do not maintain an example, README, projection, historical artifact or command body as a competing semantic owner.

## Package Boundary

The current replacement-package producer contract is owned by `build-replacement-archive-workflow.md` and the selected direct command definition. A documentation update does not automatically imply a package, local apply, ReviewDiff, Finalize, commit or push lifecycle.

Legacy review-diff/package commands may explicitly use their own linked owners. Do not generalize those mechanics to all documentation updates.

## Checks

- changed meaning is in the correct owner;
- reusable vs project-local boundary is preserved;
- Direction/Use-Case/Scenario routes remain reachable;
- no active duplicate authority was created;
- examples/projections are synchronized only when affected;
- repository permission was not inferred from documentation planning alone.

## Registered Scope / Log Consistency

When an approved documentation update will mutate repository files and logging is active:

1. resolve affected fixed scopes from the root Scope Registry;
2. choose one canonical scope log for cross-scope work;
3. preserve material Idea Review / later material clarification / material ReviewDiff correction meaning as required by the reusable scope-log workflow;
4. ensure any replacement package contains complete coherent post-apply log/reference state together with the documentation files.

A documentation update does not retroactively reconstruct pre-start log history.
