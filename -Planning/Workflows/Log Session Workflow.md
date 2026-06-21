# Log Session Workflow

Status: active workflow.

Purpose: log work sessions and penalty events into date-based day files and update Work Score Summary.

## Uses

- `Workflows/Use Day File Workflow.md`
- `Days/YYYY/YYYY-MM-DD.md`
- `Current Plan State.md`
- `Work Rails Principles.md`
- `Workflows/Real Reward Pattern Playbook.md`
- `Templates/Planning State Output Template.md`
- `Templates/Default Dashboard Template.md`

## Date rule

AI must not infer current day automatically.

Use the date provided by the user or the active conversation day date established by the user.

If no date is available, ask for the date.

## Normal session steps

1. Identify date and day file.
2. Extract duration, goal, and done.
3. Check course alignment.
4. Assign or preserve D/F/K/P.
5. Add flags only when needed.
6. Add Progress Signal.
7. Append/update row in `Finished Sessions` inside the day file.
8. Update `Work Score Summary`:
   - Work Points;
   - Penalties;
   - Net Work Score;
   - Old baseline using Net Work Score when penalties exist;
   - Full closure using Net Work Score when penalties exist;
   - Main course movement;
   - Progress.
9. Refresh Active Promises if needed.
10. Do not calculate Support Score.
11. Render Mnemonic Emoji Table.
12. Render compact Planning State Output with Point 6 included.

## Penalty event handling

If the user reports `👁️🚫🥊🎭➡️🕳️ No-resistance known drift`, do not hide it inside F0/Koff only.

Create a Penalty Event when all are true:

1. the user understood the action was wrong / off-scope / damaging;
2. the user did not fight, stop, mark, recover, or create a promise;
3. the user normalized it as okay;
4. damage or time loss happened.

Minimum penalty: `-10`.

Additional time-loss penalty: proportional to lost session-equivalent time.

Example: base `-10`; lost 2 sessions about `-7.5`; total `-17.5`.

Update:

- `Penalty Events`;
- `Work Score Summary`;
- `Penalties`;
- `Net Work Score`;
- Old baseline / Full closure status.

## Penalty safety rule

Do not apply penalty automatically from vague negativity.

Do not apply penalty when the user merely slipped and quickly recovered.

Use `📉📈 Fast recovery after slip` when the user slipped but recovered quickly.

Ask for clarification if the required penalty condition is not clear.

## Work baselines

35 Work Points = close old 4y2m baseline.

70 Work Points = close old baseline + current day.

When there are no penalties, Work Points and Net Work Score are the same.

When penalties exist, baseline closure is evaluated from Net Work Score.

Support Score never closes 35 / 70.

## Support facts

If the user reports food, sleep, movement, recovery, stimulus drift, or between-session facts, do not log them as work sessions.

Add them to `Between-session / Support Facts` in the same day file.

Do not calculate Support Score during the day.

## Required response after logging

Return:

- logged D/F/K/P or penalty event;
- points or penalty amount;
- Progress Signal when it was a normal session;
- Work Score Summary;
- Mnemonic Emoji Table;
- updated compact Planning State Output.
