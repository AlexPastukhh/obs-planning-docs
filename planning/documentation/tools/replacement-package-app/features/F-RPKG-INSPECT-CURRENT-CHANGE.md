# F-RPKG-INSPECT-CURRENT-CHANGE — Inspect Current Change

## Identity

`F-RPKG-INSPECT-CURRENT-CHANGE`

## Intent

Produce an exact diagnostic current-change projection without mutating repository truth.

## Principal Result

Either the explicitly defined diagnostic projection is produced, or inspection fails without presenting another diff as that projection.

## Expected application behavior

| State | Behavior |
|---|---|
| legacy work | preserve current legacy ReviewDiff semantics while compatibility exists |
| target Git-backed work | **OPEN target detail**: exact `from`, `to`, projection identity and currentness are not selected yet |
| any mode | read-only; not approval/finalization authority |

Until target endpoints are selected, implementation must not silently define Current Change as current checkout diff, target-branch diff, local dirty diff, or published-branch diff.

## Scenario role

Optional diagnostic/support only.

---
