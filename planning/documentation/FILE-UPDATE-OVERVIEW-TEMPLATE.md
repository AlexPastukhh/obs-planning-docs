# File Update Overview Template

Status: active reusable output template
Doc version: v0.7.0-route-specific-package-reporting
Scope: exact reusable Markdown structure for `План файл-обновление`.

Use with:

```text
planning/documentation/file-update-overview-workflow.md
```

## Template

```markdown
## План файл-обновление

**Статус:** <planned / package created / review checked / blocked / other route-owned state>

### Command metadata

Include only when a command route is in scope.

| Field | Value |
|---|---|
| Canonical command | `<command>` |
| English name | `<canonical English display name>` |
| Permission mode | `<route-owned permission mode>` |

### Target

<What repository/documentation state this update should produce.>

### Checked sources

- `<source actually checked>`

### Update Step <ID> — <name>

**Objective:** <what this step accomplishes>

**Input state / dependencies:** <required prior state or earlier steps>

**Expected resulting state:** <state after this step passes>

#### Actions

1. <first concrete action>
2. <next concrete action>
3. <review, migration gate or explicit deferral when applicable>

#### Files changed in this step

| Change | File | R | Что меняется на этом шаге | Почему на этом шаге |
|---|---|---|---|---|
| New | `<path>` | <responsibility> | <complete planned addition> | <reason> |
| Updated | `<path>` | <responsibility> | <complete planned change> | <reason> |
| Renamed | `<old>` → `<new>` | <responsibility> | <move/change> | <why now> |
| Deleted | `<path>` | <former responsibility> | <removal> | <why safe now> |

**Step boundaries:**

- <not changed or deferred in this step>

**Checks / exit criteria:**

- <check>

**Next dependent step:** <next step or none>

### Update Step <next ID> — <name>

<Repeat only when another ordered step is useful.>

### Aggregate file matrix — Optional

| File | Steps | Final planned state | Responsibility | Remaining check |
|---|---|---|---|---|
| `<path>` | `<step IDs>` | `<new/updated/renamed/deleted>` | <R> | <check/none> |

### Global boundaries

| Type | File / artifact | R | Почему |
|---|---|---|---|
| Not changed | `<path>` | <responsibility> | <reason> |
| Not created | `<path>` | <future responsibility> | <reason> |

### Source and delivery check

Use this section only when package/source/delivery classification is relevant. Select rows that match the concrete command route; omit irrelevant rows.

| Check | Result |
|---|---|
| Selected source snapshot | <current repository / explicitly selected archive or snapshot / unresolved / not applicable> |
| Source identity | <repo ref / archive identity / unavailable / not applicable> |
| Source certainty / exact base | <verified / partial / blocked / not applicable> |
| Package/output owner | <command/owner workflow / not applicable> |
| Package delivery | <created / planned / blocked / not applicable> |
| Application responsibility | <this route / external consumer / user/manual / not applicable> |
| Review responsibility | <this route / external consumer / not applicable> |
| Finalization responsibility | <this route / external consumer / out of scope / not applicable> |
| Route-specific base verification | <pending / passed / blocked / not applicable> |
| Route-specific review artifact | <pending / available / reviewed / not applicable> |
| Commit/push permission | <not granted / route-owned explicit state / not applicable> |

### Следующее действие

<next concrete action>
```

## Rules

```text
- Use normal Markdown in chat output, not an outer code fence.
- Keep table cells short.
- Ordered steps are primary when dependencies or migration order matter.
- Numbered Actions state what is done and in what order.
- The per-step file table retains the old changed-file view:
  path, responsibility, change and reason for that step.
- Do not force the reader to infer the action sequence from table row order.
- Keep Actions and file-table rows synchronized without duplicating every sentence.
- A one-step update may use one step only.
- A small step may use one action and one file row.
- The aggregate matrix is optional and derived from step tables.
- Omit Command metadata for non-command updates.
- Omit source/delivery rows when not relevant.
- Add legacy diff/clipboard/paste-review details only when the selected command route explicitly requires them.
- Do not use this block as a generic conclusion.
```
