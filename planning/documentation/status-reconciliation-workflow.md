# Status Reconciliation Workflow

Status: active reusable workflow
Doc version: v0.2.0-obs-cleanup
Scope: checking whether documentation status claims match available evidence.

## Purpose

Use when a doc says something is current/done/active and that claim needs evidence.

## Algorithm

```text
1. Identify the status claim.
2. Identify evidence sources actually available.
3. Check whether evidence supports the claim.
4. Mark current / stale / unknown.
5. State what was checked and what was not checked.
6. Suggest a correction only if requested or clearly needed.
```

## Do Not

```text
- Do not invent evidence.
- Do not claim full coverage beyond checked sources.
- Do not depend on another project's status profile.
```
