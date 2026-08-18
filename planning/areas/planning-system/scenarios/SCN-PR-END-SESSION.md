# SCN-PR-END-SESSION — End Active Planning Session

Status: active current Scenario owner
Related Use Case: `UC-PR-END-SESSION`

## Starting Situation
An active operational planning session/day has work state that must be closed consistently.

## Main Flow
1. Read the active operational session/day state required by the existing workflow.
2. Apply the bounded end-session sequence.
3. Preserve required log/current-state outputs.
4. Return the completed/remaining/next operational state.

## Observable Result
The current session is closed according to the existing runtime contract without silently expanding into unrelated planning/documentation changes.

Repeated process owner: `../end-session-command-workflow.md`.
