# Scenario / Domain / Slice Use-Case Field Kit

Status: active reusable profile-specific field kit
Doc version: v1.0.1-profile-contract-aligned
Scope: setup guidance for adding Scenario/Domain/Slice route families to a concrete project root UCM when the specialized profile and commands are explicitly selected.

## 1. Purpose

Use this field kit only when both are true:

```text
1. the project explicitly selected the specialized
   Scenario/Domain/Slice profile;
2. the project explicitly wants one or more related root commands.
```

A project may use the profile without commands. A project may keep Scenario meaning inside its Planning Draft and omit the profile entirely.

This file is setup guidance, not a runtime router.

## 2. Route Families

Create only the route families the project actually needs.

```text
scenario plan:
  create or update the selected detailed Scenario workspace;
  output separate logical Scenario Reference Objects,
  supported Scenario DATA Reference Objects
  and Behavior Item Reference Objects;
  preserve source / Idea / current-owner traceability when useful;
  identify manual review needs when upstream meaning changes;

domain review:
  align terms, model, lifecycle, rules and boundaries
  from reviewed Scenario and Behavior Item meaning
  when a separate Domain owner is useful;

slice planning:
  split accepted Scenario and Behavior Item coverage
  into separately deliverable and checkable increments
  when Slice planning is justified;

consistency review:
  review contradictions only across Scenario, Domain
  and Slice artifacts that actually exist.
```

The profile requires separate logical object ownership for its detailed Scenario output. Those objects may share one registry file; separate logical objects do not require separate physical files.

A project that does not benefit from this representation should keep Scenario meaning in the Planning Draft instead of activating the specialized route.

## 3. Scenario Route Expectations

A concrete Scenario route should identify:

```text
selected Planning Draft / application planning;
optional Spine Scenario origin when used;
related source / Idea / current-owner references when useful;
Scenario catalog/index owner;
Scenario Reference Object definition owner or owners;
Scenario DATA Reference Object owner or owners,
  or explicit none when no supported Scenario DATA exists;
Behavior Item Reference Object owner or owners;
selected physical storage representation
  such as shared registry or separate files;
manual review behavior when related upstream meaning changes;
permission boundary.
```

Do not require one physical file per object. Require an unambiguous definition owner for every logical object that exists.

The route must not invent DATA, acceptance criteria, command names, project storage architecture or automatic dependency runtime.

## 4. Domain Route Expectations — When Selected

Identify:

```text
selected reviewed Scenario and Behavior Item meaning;
Domain owner;
terms, lifecycle, rules and boundaries in scope;
open conflicts with behavior;
permission boundary.
```

Do not create a Domain route merely because Scenario artifacts exist.

## 5. Slice Route Expectations — When Selected

Identify:

```text
selected accepted Scenario and Behavior Item coverage;
relevant Domain boundaries when they exist;
deliverable and checkable Slice boundary;
dependencies and verification target;
permission boundary.
```

Do not require Slice planning for one-step work, a narrow script, a process change or another solution that does not benefit from separate increments.

## 6. Do Not

```text
- Do not create a second UCM inside the reusable layer.
- Do not copy project-specific route rows as active configuration.
- Do not treat this field kit as a runtime router
  after root UCM rows exist.
- Do not require a command merely because Scenario artifacts exist.
- Do not activate the specialized profile merely because
  a Planning Draft contains Scenarios.
- Do not require one physical file per logical Reference Object.
- Do not require contributing Planning Items or a Planning Item layer.
- Do not introduce a permanent Spine Unit.
- Do not make Domain or Slice details part of clean Scenario behavior.
- Do not infer repository edit, archive, commit or push permission.
```
