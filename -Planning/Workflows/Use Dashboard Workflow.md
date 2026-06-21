# Use Dashboard Workflow

Status: active workflow.

Purpose: explain how AI should use the compact Planning State Output together with the Mnemonic Emoji Table and the on-demand full Dashboard Core.

## Uses

- `Templates/Planning State Output Template.md`
- `Templates/Default Dashboard Template.md`
- `Work Rails Principles.md`
- `Workflows/Use Day File Workflow.md`
- relevant `Days/YYYY/YYYY-MM-DD.md`
- examples as reference only

## Source precedence

When rendering the Mnemonic Emoji Table or full Dashboard Core, use:

`Templates/Default Dashboard Template.md`

When rendering compact Planning State Output, use:

`Templates/Planning State Output Template.md`

Source values from the relevant date-based day file:

`Days/YYYY/YYYY-MM-DD.md`

## Default output contract

In normal planning/state/session-control answers, after the normal work/update answer, output the Default Daily Template Pack when state/action guidance is relevant:

1. Mnemonic Emoji Table.
2. Compact Planning State Output:
   - 🎯 Result Tracking;
   - 🏁📊 Point 6 — Short D/F/K/P Race;
   - 🧵📜>🧪 Active Promises;
   - 🧾 Finished Sessions.

Support Facts are shown only when relevant, requested, or during day close / support review.

Do not render full Dashboard Core by default.

Render full Dashboard Core only when the user explicitly asks.

## Steps

1. Identify whether state/action guidance is relevant.
2. If day-state is involved, identify the date from the user or active conversation day date.
3. Read the relevant date-based day file.
4. Load `Templates/Default Dashboard Template.md` for the mnemonic.
5. Render compact Planning State Output with Point 6 included.
6. Do not calculate Support Score unless support review / day close was requested.

## Output rule

Do not output only the normal answer after a planning-state update.

Do not render full Dashboard Core by default.

For narrow technical answers, file checks, archive/package delivery, or when the user explicitly asks for a short answer, AI may omit the Default Daily Template Pack.
