# Pattern Capture Import Workflow

Status: active workflow.

Purpose: import Tampermonkey Pattern Capture exports into date-based day files.

## Core rule

Pattern Capture exports are raw event data.

They do not calculate Work Score.

They do not calculate Support Score.

They should be imported into the relevant date-based day file.

## Steps

1. Identify date from the export header or user message.
2. Resolve day file using `Workflows/Use Day File Workflow.md`.
3. Parse `Work Pattern Events`.
4. Parse `Support Facts`.
5. Import support facts into `Between-session / Support Facts`.
6. Import work-pattern events into Notes / session review hints / pattern review section / relevant session note.
7. Handle `👁️🚫🥊🎭➡️🕳️ No-resistance known drift` specially.
8. Do not change D/F/K/P unless the user explicitly asks to revise session scoring.
9. Do not calculate Support Score during day import.
10. Preserve raw event meaning and time.

## Penalty event handling

If imported event is `👁️🚫🥊🎭➡️🕳️ No-resistance known drift`, do not silently import it as a normal note only.

If penalty fields are missing, ask whether to create a Penalty Event.

Create a Penalty Event only when user confirms:

1. the user understood the action was wrong / off-scope / damaging;
2. the user did not fight, stop, mark, recover, or create a promise;
3. the user normalized it as okay;
4. damage or time loss happened.

Minimum base penalty: `-10`.

If time loss is known, add time-loss penalty.

If time loss is unclear, record base penalty and mark time-loss as `needs estimate`.

## Recovery event handling

If imported event is `📉📈 Fast recovery after slip`, preserve it as recovery context.

It may reduce interpretation damage from a slip and can prevent a slip from becoming `No-resistance known drift`.

Do not convert it into positive Work Score automatically.

## Support fact handling

Support facts map into:

| # | Time / After | Type | Fact | Effect on next work |
|---|---|---|---|---|

Emoji belongs in `Type`.

## Output

Return date, day file path, imported work-pattern count, imported support fact count, imported penalty candidate count, ambiguous rows, and reminder that Support Score is calculated at close/next morning.
