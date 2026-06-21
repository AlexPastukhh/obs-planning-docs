# Scenario / Domain / Slice Use-Case Field Kit

Status: active reusable profile-specific field kit
Doc version: v0.2.0-obs-cleanup
Scope: setup guidance for adding scenario/domain/slice route families to a concrete project root UCM.

## Purpose

Use this only when the target project wants scenario/domain/slice command routes.

## Route Families

```text
scenario plan:
  create/update target scenario workspace.

domain review:
  align terms/model/boundaries.

slice planning:
  split accepted scenario work into checkable increments.
```

## Do Not

```text
- Do not create a second UCM inside the reusable layer.
- Do not copy project-specific route rows as active configuration.
- Do not treat this field kit as runtime router after root UCM rows exist.
```
