# Reviewable Agent Output And Commands Workflow

Status: active reusable documentation-layer workflow
Doc version: v0.2.0-obs-cleanup
Scope: answer levels, reviewable outputs and response-level command behavior for projects using the reusable documentation layer.

## 1. Answer Levels

```text
Level 1:
  concise answer, no broad source pass.

Level 2:
  reviewable answer with sources/checked/not-checked/boundaries.

Level 3:
  artifact/package/diff-sensitive answer with explicit apply/review boundary.
```

Use Level 2 or Level 3 for non-trivial file/docs/code/archive changes.

## 2. Response-Level Commands

```text
крит / crit:
  critically review target as hypothesis; do not edit unless separately asked.

обс / recheck:
  recheck prior chat/context/sources before continuing.

план файл-обновление:
  produce file update plan; do not edit unless separately asked.

давай архив:
  create full replacement archive and include apply/diff commands in chat.

арх:
  use provided archive as read-source, not output-package mode.
```

Concrete command routing belongs in the project root UCM.

## 3. Source Reporting

For reviewable answers, include when useful:

```text
Checked:
  <files/sources actually checked>

Not checked:
  <relevant sources not checked>

Boundary:
  <what this answer did not do>
```

## 4. Archive Output Boundary

```text
- Creating an archive does not approve commit.
- User applies locally and pastes diff.
- Assistant reviews diff and says commit OK or do not commit.
- Do not push unless explicitly instructed.
```

## 5. Do Not

```text
- Do not pretend to have checked files not checked.
- Do not treat examples/helper scripts as authority.
- Do not omit apply/diff commands when giving an archive.
- Do not commit or push from a command body alone.
```
