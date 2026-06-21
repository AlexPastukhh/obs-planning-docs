# File Update Overview Template

Status: active reusable output template
Doc version: v0.2.0-obs-cleanup
Scope: exact reusable Markdown structure for `План файл-обновление`.

Use with:

```text
planning/documentation/file-update-overview-workflow.md
```

## Template

```markdown
## План файл-обновление

**Статус:** <planned / archive created / diff checked / can commit / blocked>

### Change group: <logical group>

| Change | File | R | Что | Почему |
|---|---|---|---|---|
| New | `<path>` | <file responsibility> | <what is added/planned> | <why> |
| Updated | `<path>` | <file responsibility> | <what changes/planned> | <why> |

### Boundaries

| Type | File / artifact | R | Почему |
|---|---|---|---|
| Not changed | `<path>` | <responsibility> | <why excluded> |
| Not created | `<path>` | <future responsibility> | <why not created> |

### Проверка

| Check | Result |
|---|---|
| Delivery safety classified | <yes/no> |
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
- Use this block only for file/change/update/archive context.
- Do not use it as a generic conclusion.
```
