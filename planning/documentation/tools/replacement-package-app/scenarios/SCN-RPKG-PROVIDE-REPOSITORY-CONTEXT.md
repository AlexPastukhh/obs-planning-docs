# SCN-RPKG-PROVIDE-REPOSITORY-CONTEXT — Provide Repository Context For Further Work

## Identity

`SCN-RPKG-PROVIDE-REPOSITORY-CONTEXT`

Suggested name: **Provide Repository Snapshot For Further Work**.

## Application Benefit

Create one trustworthy portable representation of an exact repository source state and optionally deliver that exact artifact to one selected ChatGPT conversation.

## Starting context

Registered Repository Target + source mode + output directory + delivery mode + destination conversation when delivery is requested.

## Journey / expected application behavior

### Main path

| Journey step | Requirement(s) |
|---|---|
| **1. Select exact Snapshot source mode.** | `SR-RPKG-SNAPSHOT-SOURCE-MODE-IS-EXACT` |

Decision after Journey Step 1: **Which source path is selected?**

| `Working Local Tree + Diff` | `Commit Snapshot` |
|---|---|
| Export actual machine working-tree files. | Export exact resolved commit state. |
| Include frozen HEAD + diff for the same coherent Local capture. | Ignore local dirty/index/untracked state. |
| Requirements: `SR-RPKG-SNAPSHOT-LOCAL-MEANS-MACHINE-FILES`, `SR-RPKG-SNAPSHOT-LOCAL-DIFF-USES-SAME-CAPTURE`, `SR-RPKG-SNAPSHOT-NO-MIXED-LOCAL-CAPTURE` | Requirement: `SR-RPKG-SNAPSHOT-COMMIT-IS-IMMUTABLE-SOURCE` |
| → Common Journey Step 2 | → Common Journey Step 2 |

### Main path — converged

| Journey step | Requirement(s) |
|---|---|
| **2. Exact Snapshot ZIP exists. Decide delivery mode.** | `SR-RPKG-SNAPSHOT-DELIVERY-FAILURE-DOES-NOT-ERASE-EXPORT`, `SR-RPKG-SNAPSHOT-DESTINATION-DOES-NOT-CHANGE-REVIEW-BINDING` |

Decision after Journey Step 2: **How should the exact Snapshot be delivered?**

| Export only | Export + Attach | Export + Attach + Send |
|---|---|---|
| Keep the exact exported ZIP. | Attach that exact ZIP to the frozen conversation. | Attach that exact ZIP to the frozen conversation. |
| Stop successfully. | Stop after confirmed attachment. | Send only after the exact attachment is established. |
| — | Requirement: `SR-RPKG-SNAPSHOT-DELIVERY-EXACT-ARTIFACT` | Requirement: `SR-RPKG-SNAPSHOT-DELIVERY-EXACT-ARTIFACT` |

Delivery failure/cancellation/uncertainty never erases successful export.  
Selecting a destination never changes Repository Work review binding.

## Benefit closure

Export closes the portable-context Benefit; optional delivery additionally closes the selected conversation-delivery intent.

---
