# Start Day Workflow

Status: active workflow.

Purpose: start or update a date-based day file without inventing missing planning content.

## Uses

- `Workflows/Use Day File Workflow.md`
- `Current Plan State.md`
- `Days/YYYY/YYYY-MM-DD.md`
- `Templates/Day File Template.md`
- `Templates/Planning State Output Template.md`
- `Templates/Default Dashboard Template.md`
- `Examples/Start Day Missing Input Example.md`

## Date rule

AI must not infer current day automatically.

The user provides the date or establishes an active conversation day date.

If no date is available, ask for the date.

## Missing input rule

When starting a day, AI must not invent missing planning content.

Do not invent:

- 🎯 Цель дня;
- 🌅 Desired;
- 🌑 Undesired;
- Active Promises;
- external target;
- measurable output.

Missing target is not a target.

Missing Desired is not a Desired.

Missing promise is not a promise.

If the user did not provide enough information, mark the field as missing and surface what must be defined.

## Steps

1. Identify the date.
2. Resolve or create day file using `Workflows/Use Day File Workflow.md`.
3. Read `Current Plan State.md`.
4. Fill Result Tracking with actual user values or missing markers.
5. Include 3–5 nearest/relevant global goals inside Result Tracking.
6. Do not create Active Promises by default.
7. Initialize Finished Sessions and Support Facts as empty if new.
8. Keep Support Score as not calculated.
9. Render Mnemonic Emoji Table.
10. Render compact Planning State Output with Result Tracking, Point 6, Active Promises, Finished Sessions.

## Required response

Return:

- day file path;
- what was updated;
- what remains missing;
- whether Active Promises were created or not;
- Mnemonic Emoji Table;
- compact Planning State Output.

Support Facts are not shown by default unless relevant/requested.

Do not render full Dashboard Core by default.
