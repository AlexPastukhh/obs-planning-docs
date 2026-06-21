# Pattern Capture Export Template

Status: active template.

Purpose: expected markdown export shape from the Tampermonkey Pattern Capture tool.

Owner tool docs:

`Tools/Pattern Capture/Export Format.md`

Import workflow:

`Workflows/Pattern Capture Import Workflow.md`

## Export shape

```markdown
## Pattern Capture Export — YYYY-MM-DD

Source: Tampermonkey Pattern Capture

### Work Pattern Events

| Time | Session | Pattern | Effect | Note |
|---|---|---|---|---|
| 14:22 | S3 | 🧩🪜⚠️➡️🧲⚡ Complex multi-level problem → easy stimulation | returned | hard analysis |

### Support Facts

| # | Time / After | Type | Fact | Effect on next work |
|---|---|---|---|---|
| 1 | after S5 | 🏃 movement / sport | 15 минут ходьбы | restored energy |
| 2 | after S6 | 🍽️ food | Объелся | worsened F / sleep risk |

### Raw Counts

| Metric | Count |
|---|---:|
| Work-pattern events | 1 |
| Support facts | 2 |
| Stimulus drift | 0 |
| Returned | 1 |
```

## Rules

The export is raw capture data.

It is not a score.

It should not include Work Score or Support Score.

Support Facts use the same columns as `Templates/Support Facts Table Template.md`.

Work Pattern Events are imported for review/context, not as automatic session score changes.
