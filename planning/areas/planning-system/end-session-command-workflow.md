# End Session Command Workflow

Status: active OBS area workflow
Doc version: v0.1.1-runtime-cleanup
Scope: exact behavior of `конец` / `конец сессии` / `end session` for adding one normal Finished Session to an existing active operational day.

## 1. Purpose

Use this workflow to turn explicit final session values into one reviewable operational-day update.

```text
Input:
  final D
  final F
  final Points
  optional explicit session context

Output:
  full replacement archive containing only the active operational-day file
  plus apply/diff commands in chat
```

This workflow does not commit or push.

## 2. Authorities

```text
Root command route:
  planning/planning-use-case-map.md

Active source registry:
  planning/dashboard/index.md

Operational day shape:
  -Planning/Templates/Day File Template.md

Scoring and session semantics:
  -Planning/Workflows/Real Reward Work Loop Workflow.md
```

The operational-day file is the only mutable source for this command.

## 3. Command Family

```text
конец
конец сессии
end session
```

The command means:

```text
Add exactly one completed normal session to the existing active operational day.
```

It does not mean day close, support close, penalty creation or planning completion.

## 4. Input Contract

Required final values:

```text
D
F
Points
```

Rules:

```text
- All three required values must be explicitly provided.
- Values must be unambiguous finite numeric values.
- Treat them as final values.
- Do not derive Points inside this command.
- A separate calculation may be shown when explicitly requested, but it does not become command input until the user explicitly confirms the final Points value.
- Do not accept Base, Adj, parenthetical score deltas or other calculation internals as Finished Session fields.
```

Optional context, only when explicitly provided:

```text
Time
Session
Goal(s)
Progress Signal
Result
```

Optional-field rules:

```text
- Omitted optional cells remain blank.
- Do not write `not provided`, `—` or fallback text into omitted cells.
- Do not copy Session into Result.
- Do not infer Goal(s) from planning files.
- Preserve every explicitly named goal.
```

Unsupported input:

```text
Plan Unit
```

If `Plan Unit` is supplied, explain that planning-to-operational linkage is deferred.
Do not add the field and do not update planning Scope Units.

## 5. Missing-Input Behavior

If D, F or Points is missing:

```text
- stop;
- do not edit files;
- do not create an archive;
- ask only for the missing required values.
```

Do not ask for optional fields.

## 6. Active Source Resolution

Resolve the target in this order:

```text
1. Read planning/dashboard/index.md.
2. Read active_day.
3. Read active_session_day.
4. Require both values to be real repository paths.
5. Require both files to exist.
6. Extract YYYY-MM-DD from both paths.
7. Require date(active_day) == date(active_session_day).
8. Read the existing active operational-day file.
```

Stop without edits when:

```text
- active_day is absent or not provided;
- active_session_day is absent or not provided;
- either referenced file is missing;
- the dates do not match;
- a path is ambiguous;
- the operational-day structure cannot be parsed safely.
```

Do not:

```text
- infer the current date from the clock;
- choose another day;
- create an operational day automatically;
- change planning/dashboard/index.md;
- change active_day or active_session_day.
```

## 7. Structural Preflight

Before mutation, require exactly one recognizable instance of:

```text
- Finished Sessions table;
- Work Score Summary table;
- Final Day Summary table.
```

Finished Sessions must expose these columns:

```text
#
Time
Session
Goal(s)
D/F
Points
Progress Signal
Result
```

Stop when required structures are missing, duplicated or ambiguous.
Do not rewrite the file into a new template merely to make parsing easier.

## 8. Duplicate Guard

Compare the proposed session with the last Finished Session using:

```text
D
F
Points
Time
Session
Goal(s)
Progress Signal
Result
```

Comparison rules:

```text
- Normalize surrounding whitespace only.
- Unprovided optional fields compare as blank.
- Do not ignore differences in explicitly provided optional values.
```

If all fields match:

```text
- stop;
- report a possible repeated application;
- require explicit confirmation before allowing a duplicate row.
```

After explicit duplicate confirmation, rerun the same source and date checks before producing the archive.

## 9. Row Append

Append one row to the end of the Finished Sessions table.

Numbering:

```text
- read numeric values from the # column;
- new number = current maximum + 1;
- if there are no numeric rows, new number = 1.
```

Mutation rules:

```text
- append exactly one row;
- do not reorder existing rows;
- do not rewrite old session values;
- do not add a Penalty Event;
- do not change Support Facts or Support Marks.
```

## 10. Score Recalculation

After the append:

```text
Finished Session points =
  sum of final numeric Points in all Finished Sessions.

Manual closure points =
  only explicit numeric manual-closure entries stored in a recognized owner-defined source.

Work Points =
  Finished Session points + Manual closure points.

Penalties =
  sum of explicit numeric Total penalty values in Penalty Events.

Net Work Score =
  Work Points + Penalties.
```

Safety rules:

```text
- Do not infer manual closure points from a difference in an existing summary.
- If a legacy manual closure contribution is implied but has no traceable source, stop instead of overwriting it.
- Blank Penalty Events mean Penalties = 0.
- Low D or low F alone never creates a Penalty Event.
- Preserve source numeric precision needed to reproduce the totals.
```

Update only these fields in both applicable summaries:

```text
Work Points
Penalties
Net Work Score
```

Do not update:

```text
Previous-day carryover debt
Net score after carryover
Old baseline
Full closure
Carryover status
Main course movement
Progress
Support Score
Support Penalty
Final Day Score
Day class
Carryover to next day
day-close status
```

If carryover or support inputs are unavailable, their dependent values remain unchanged, normally `not calculated`.

## 11. Planning Boundary

This command may change only:

```text
-Planning/Days/YYYY/YYYY-MM-DD.md
```

It must not change:

```text
planning/dashboard/index.md
planning/dashboard/days/
planning/dashboard/weeks/
planning/dashboard/months/
planning/dashboard/periods/
planning/dashboard/years/
```

Do not copy D/F, Points, support, penalties or the operational session row into planning sources.

## 12. Output Package

When every input and safety check passes:

```text
1. Produce a full replacement archive.
2. Include exactly one repository replacement file:
   the active operational-day file.
3. Include package MANIFEST.md and APPLY.md.
4. Give apply/diff commands in chat.
5. The apply flow must capture a full UTF-8 diff.
6. The user pastes the diff before commit.
7. Review the diff and only then provide commit + push commands.
```

Do not use a patch file or writer script as the primary apply mechanism.
Do not commit or push during package creation.

## 13. Review Checklist

```text
- command route and owner workflow were read;
- D/F/Points are explicit;
- optional context is explicit or blank;
- active_day exists;
- active_session_day exists;
- source dates match;
- operational-day file exists;
- Finished Sessions structure is unique;
- proposed row is not an unconfirmed duplicate;
- exactly one row is appended;
- no old row is changed;
- Work Points is reproducible;
- Penalties comes only from Penalty Events;
- Net Work Score is reproducible;
- both summaries agree;
- support/carryover/day-close fields are unchanged;
- planning files are unchanged;
- Plan Unit is absent;
- archive contains one repository replacement file;
- diff is reviewed before commit;
- no commit or push occurred.
```

## 14. Tampermonkey Decision

```text
defer
```

Do not project this command into the helper until:

```text
- the root route is committed;
- this workflow is committed;
- one real application has passed diff review;
- the Tampermonkey projection is included in a separately approved UI batch.
```
