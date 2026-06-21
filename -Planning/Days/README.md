# Date-based Day Files

Status: active storage guide.

Purpose: explain how active and completed day records are stored.

## Core rule

AI must not infer the current day from calendar date, `Today State.md`, or memory.

The user provides the date or establishes an active conversation day date.

AI works with:

`-Planning/Days/YYYY/YYYY-MM-DD.md`

If the file does not exist, AI creates it from:

`-Planning/Templates/Day File Template.md`

While the user keeps working with the same date in the conversation, AI may keep using that established day file.

When the user switches date, AI switches to the day file for the new date.

Completed day files remain in the same `Days/YYYY/` folder.

## Naming

Use ISO dates:

`YYYY-MM-DD.md`

Examples:

`Days/2026/2026-05-30.md`
`Days/2026/2026-05-31.md`

## What day files own

Each day file owns the concrete state for one date:

- 🎯 Result Tracking;
- 🏁📊 Point 6 — Short D/F/K/P Race;
- 🧵📜>🧪 Active Promises;
- 🧾 Finished Sessions;
- Work Score Summary;
- 🧯 Between-session / Support Facts;
- 🌙 Day Close / Next-Morning Support Review;
- 🧾 Final Day Summary;
- Notes.

## What day files do not own

Day files do not own reusable layout rules.

Reusable layout is owned by templates:

- `Templates/Day File Template.md`;
- `Templates/Planning State Output Template.md`;
- `Templates/Support Facts Table Template.md`;
- `Templates/Support Score Review Template.md`.

Support scoring rules are owned by:

`Support Score Guide.md`

## Legacy files

`Today State.md` is legacy.

`Session Log.md` is legacy / optional index.

Detailed sessions and day summaries now live in date-based day files.
