# File Update Overview Template

Status: active reusable output template
Doc version: v0.5.0-ordered-update-steps
Scope: exact reusable Markdown structure for `План файл-обновление`.

Use with:

```text
planning/documentation/file-update-overview-workflow.md
```

## Template

```markdown
## План файл-обновление

**Статус:** <planned / archive created / diff checked / can commit / blocked>

### Command metadata

Include only when a command route is in scope.

| Field | Value |
|---|---|
| Canonical command | `<command>` |
| English name | `<canonical English display name>` |
| Permission mode | `<plan-only / package / other explicit mode>` |

### Target

<What repository/documentation state this update should produce.>

### Checked sources

- `<source actually checked>`

### Update Step <ID> — <name>

**Objective:** <what this step accomplishes>

**Input state / dependencies:** <required prior state or earlier steps>

**Expected resulting state:** <state after this step passes>

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

Use archive rows only when package/source classification is relevant.

| Check | Result |
|---|---|
| Selected source snapshot | <current repository / same-message archive / unresolved / not applicable> |
| Source identity | <repo ref / archive identity / unavailable / not applicable> |
| Earlier-message archive reused automatically | <no / not applicable> |
| Fresh source archive required | <yes/no/not applicable + reason> |
| Delivery/source safety | <repo-readable / archive-current / blocked / not applicable> |
| Local base verification | <pending / passed / blocked / not applicable> |
| New files visible in diff | <yes/no/not needed> |
| Diff copied to clipboard | <yes/no> |
| User must paste diff before commit | <yes/no> |
| Commit/push permission | <not granted / granted explicitly> |

### Следующее действие

<next concrete action>
```

## Rules

```text
- Use normal Markdown in chat output, not an outer code fence.
- Keep table cells short.
- Ordered steps are primary when dependencies or migration order matter.
- A one-step update may use one step only.
- The aggregate matrix is optional and derived from step tables.
- Omit Command metadata for non-command updates.
- Omit package/source rows when not relevant.
- Do not use this block as a generic conclusion.
```
