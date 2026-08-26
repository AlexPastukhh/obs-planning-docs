# Decision Persistence / WEUC Full-Picture — Compatibility Pointer

Status: superseded active model; retained only as navigation to current owners

The former combined file mixed two concerns that now have separate canonical owners.

## Durable IDTSPE Decisions

Current owners:

```text
PLANNING-GOVERNANCE.md
  → three durable Decision types

shared/decision-revalidation-helper-model.md
  → residual Q/R/P → revalidation helpers/signals

shared/user-input-decision-and-answer-intake-rule.md
  → user authority / accepted input handling

IDTSPE-SHELL.md
  → generic Decision / QRP / persistence ports
```

## Workspace Evolution / WEUC

The former `Contextual WEUC Instance` / `WEUC Instance Register` model is **retired**.

Current owners:

```text
TM-WEUC
  → create/refine/extend/reconcile
    SDS-PLANNING-STATE/SDS-WORKSPACE-EVOLUTION.md
  → own Current Global Architecture Position

LENS-WORKSPACE-EVOLUTION-ARCHITECTURE / L5
  → consume the current Workspace Evolution Map
    inside Domain/Slice/Frontend/etc.
  → or evaluate whole Workspace architecture through
    TM-WEUC / WORKSPACE_ARCHITECTURE_POSITION

<owner>.evolution.md
  → optional local future-evolution companion
```

There is no mandatory separate WEUC-instance/register schema.

Historical full text is preserved under:

```text
sources-readonly/superseded-models-20260825/
  decision-persistence-and-weuc-full-picture-pre-tm-weuc.md
```
