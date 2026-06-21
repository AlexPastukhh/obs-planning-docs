# Use Day File Workflow

Status: active workflow.

Purpose: resolve, create, read, and update date-based day files.

## Uses

- `Days/README.md`
- `Templates/Day File Template.md`
- `Templates/Planning State Output Template.md`
- `Templates/Default Dashboard Template.md`
- `Current Plan State.md`
- `Emoji Notation Map.md`

## Core rule

AI must not infer the current day automatically.

The user provides the date or establishes an active conversation day date.

If no date is provided and no active conversation day date exists, ask for the date.

Do not use `Today State.md` as the current day pointer.

## Path rule

For date `YYYY-MM-DD`, use:

`Days/YYYY/YYYY-MM-DD.md`

Example:

`Days/2026/2026-05-30.md`

## Steps

1. Identify the date from the user message or active conversation day date.
2. Resolve path: `Days/YYYY/YYYY-MM-DD.md`.
3. If the file exists, read and update it.
4. If the file does not exist, create it from `Templates/Day File Template.md`.
5. If creating a new file:
   - replace `YYYY-MM-DD` in the heading with the date;
   - keep missing-field markers when the user did not provide values;
   - initialize Finished Sessions empty;
   - initialize Work Score Summary as 0;
   - initialize Support Facts empty;
   - keep Support Score as not calculated.
6. Update only the relevant section.
7. Render Mnemonic Emoji Table when planning-state output is relevant.
8. Render compact Planning State Output.

## Do not

Do not create or update `Today State.md` for active day state.

Do not write detailed day sessions to `Session Log.md` by default.

Do not calculate Support Score during the day unless the user explicitly asks for a premature estimate.

Do not infer a date from system date.
