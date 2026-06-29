# File Update Overview Template

Status: active reusable output template
Doc version: v0.4.0-command-and-source-metadata
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

Include this section only when the update concerns a command route.

| Field | Value |
|---|---|
| Canonical command | `<command>` |
| English name | `<required canonical English display name>` |
| Permission mode | `<plan-only / package / other explicit mode>` |

### Change group: <logical group>

| Change | File | R | Что | Почему |
|---|---|---|---|---|
| New | `<path>` | <file responsibility> | <what is added/planned> | <why> |
| Updated | `<path>` | <file responsibility> | <what changes/planned> | <why> |
| Renamed | `<old path>` → `<new path>` | <file responsibility> | <what moves/changes> | <why> |
| Deleted | `<path>` | <former responsibility> | <what is removed> | <why safe> |

### Boundaries

| Type | File / artifact | R | Почему |
|---|---|---|---|
| Not changed | `<path>` | <responsibility> | <why excluded> |
| Not created | `<path>` | <future responsibility> | <why not created> |

### Проверка

| Check | Result |
|---|---|
| Selected source snapshot | <current repository / same-message archive / unresolved / not applicable> |
| Source identity | <repo ref / archive filename + hash/ref / not available / not applicable> |
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
- Omit Command metadata for non-command updates.
- Use source rows only when source/package classification is relevant.
- Use this block only for file/change/update/archive context.
- Do not use it as a generic conclusion.
```
