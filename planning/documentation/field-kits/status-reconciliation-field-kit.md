# Status Reconciliation Field Kit

Status: active reusable setup field kit
Doc version: v0.2.0-obs-cleanup
Scope: bootstrap guidance for creating a project-specific status/evidence profile if the project needs one.

## Purpose

Use this only when setting up a project-specific status/evidence file.

After the project profile exists, runtime work should read the project root route/profile, not this field kit.

## Suggested Output

```text
planning/status-evidence-profile.md, if the project chooses to create it.
```

## Minimal Profile Fields

```text
- status claim;
- evidence source;
- checked date/context;
- stale risk;
- next verification action.
```

## Do Not

```text
- Do not copy another project's profile as active configuration.
- Do not use this field kit as runtime source of truth.
```
