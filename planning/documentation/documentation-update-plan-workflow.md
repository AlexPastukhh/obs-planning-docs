# Documentation Update Plan Workflow

Status: active reusable documentation-layer workflow
Scope: plan-first route for non-trivial documentation/ownership/navigation migrations.

## Sources

Start from natural navigation and the selected Documentation Use Case, then read architecture/responsibility owners, task-specific owners and exact current target files. For an explicit command, resolve `planning/command-routing.md` + the direct command definition separately.

## Plan

Use `file-update-overview-workflow.md` / `FILE-UPDATE-OVERVIEW-TEMPLATE.md` for concrete file transitions. Keep conceptual Idea Variants separate from file actions.

Plan dependencies in safe order:

```text
semantic owner decisions
→ new/current canonical owners
→ incoming navigation/Use-Case/Scenario routes
→ consumer/projection updates
→ stale-owner cleanup / physical rename/delete
→ coverage + link + build/test checks
```

## Replacement Package Planning

When the selected later action is `давай архив`, plan the V0.1 producer contract:

```text
PACKAGE.json
base-files/<replace|delete paths>
replacement-files/<add|replace paths>
```

Renames are represented as delete + add. Exact base bytes are required for replace/delete. Do not plan legacy `MANIFEST.md` / `APPLY.md` / pasted-diff mechanics unless the selected concrete legacy command explicitly owns them.

Planning never authorizes edits, package creation, commit or push.
