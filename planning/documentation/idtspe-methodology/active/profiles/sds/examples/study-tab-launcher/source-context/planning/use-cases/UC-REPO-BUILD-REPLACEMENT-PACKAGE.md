# UC-REPO-BUILD-REPLACEMENT-PACKAGE — Build Replacement Package

## Situation

An intended repository transition is sufficiently resolved to transport as a Replacement Package and exact current base state for every `replace` / `delete` operation is available.

## Result

One protocol-valid Replacement Package ZIP exists with a new package identity, the correct ChangeSet identity, exact required base/replacement payloads, and a short `OBS-ACTION` handoff.

## Process

1. Resolve the active intended operations and the exact current source state.
2. Fail closed rather than guessing base content or path state.
3. Create/reuse ChangeSet identity according to the current open/finalized ChangeSet boundary; always create a new package ID.
4. Materialize `PACKAGE.json`, exact `base-files/`, and complete `replacement-files/` according to the package protocol.
5. Reopen and validate the ZIP, including manifest/payload correspondence and path constraints.
6. Return the package plus the route-owned `OBS-ACTION`; do not Apply, finalize, commit, or push.

## Related

- [`../commands/build-replacement-archive.command.md`](../commands/build-replacement-archive.command.md) — current `давай архив` executable route and permission boundary.
- [`../documentation/build-replacement-archive-workflow.md`](../documentation/build-replacement-archive-workflow.md) — current extracted detailed producer Process.
