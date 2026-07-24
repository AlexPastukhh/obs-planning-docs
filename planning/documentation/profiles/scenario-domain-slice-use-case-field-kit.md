# Scenario / Domain / Slice Use-Case Field Kit

Status: active reusable profile-specific field kit
Doc version: v0.3.0-item-backed-scenario-output
Scope: setup guidance for adding scenario/domain/slice route families to a concrete project root UCM when commands are explicitly desired.

## 1. Purpose

Use this only when the target project wants scenario/domain/slice command routes. A project may use the profile and create Scenario artifacts without creating any root command.

## 2. Route Families

```text
scenario plan:
  create/update an item-backed Scenario workspace;
  output Scenario Reference Objects, Scenario DATA Reference Objects
  and Behavior Item Reference Objects;
  preserve Planning Item source links and review-needed dependency state.

domain review:
  align terms/model/lifecycle/rules/boundaries from reviewed scenarios
  and Behavior Items without redesigning the scenarios as implementation.

slice planning:
  split accepted Scenario/Behavior coverage into checkable increments
  after relevant domain boundaries are sufficiently understood.
```

## 3. Scenario Route Expectations

A concrete scenario route should identify:

```text
selected Planning Draft / Full Picture;
selected contributing Planning Items;
Scenario catalog/index owner;
Scenario object definition files;
Scenario DATA object owner(s);
Behavior Item owner(s);
review-needed behavior when an upstream Planning Item changes;
permission boundary.
```

The route must not invent DATA, acceptance criteria, command names or project storage architecture.

## 4. Do Not

```text
- Do not create a second UCM inside the reusable layer.
- Do not copy project-specific route rows as active configuration.
- Do not treat this field kit as runtime router after root UCM rows exist.
- Do not require a command merely because Scenario artifacts exist.
- Do not make Domain or Slice details part of the clean Scenario output.
```
