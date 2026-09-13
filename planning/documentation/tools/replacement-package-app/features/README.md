# Replacement Package App — Features

Status: current target Feature catalog

Replacement-package realization:
- `F-RPKG-APPLY-REPLACEMENT-PACKAGE.md` — one current Feature realized through explicit Apply, Commit and Publish/Retry modules.

Separate current capability:
- `F-RPKG-EXPORT-REPOSITORY-SNAPSHOT.md`

Planned future capability:
- `F-RPKG-FINALIZE-REPOSITORY-WORK.md` — separate Finalize Feature; not part of the current target executable path.

Legacy-source Feature documents for old Current Change/Finalize behavior are not current target runtime authority. The already-deployed old executable owns those old workflows.

`Apply`, `Commit` and `Publish` are module/operation boundaries of one replacement-package Apply Feature. Their independent operation Results do not create three product Features. Current automatic `OBS-ACTION apply-package` composes Start workspace → Apply → Commit → Publish; future command parameterization is owned by `../evolution-steps-map.md` until implemented.
