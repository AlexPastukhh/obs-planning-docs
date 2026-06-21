# Documentation Update Workflow

Status: active reusable documentation-layer workflow
Doc version: v0.2.0-obs-cleanup
Scope: safe process for applying approved documentation updates in a project that uses `planning/documentation/`.

## 1. Purpose

Use this workflow when documentation changes are approved or when producing a replacement archive/package for documentation files.

## 2. Update Algorithm

```text
1. Identify the concrete target and active project root.
2. Read project root route: planning/planning-use-case-map.md.
3. Read relevant area docs under planning/areas/ if the update is local.
4. Read reusable owner workflows/templates under planning/documentation/.
5. Classify changed files by responsibility.
6. Change only the approved files.
7. Avoid duplicating owner rules across files.
8. Include apply commands and diff-to-clipboard commands when creating an archive.
9. Ask user to paste diff before commit.
10. Do not commit or push unless explicitly instructed after review.
```

## 3. Source Boundary

```text
- Project root files own project routing and state.
- Reusable docs own reusable process only.
- Area files own local application details.
- Examples are supporting artifacts only.
```

## 4. Replacement Archive Rule

When producing a replacement archive:

```text
- include replacement-files/<repo-relative-path>;
- include MANIFEST.md and APPLY.md;
- give PowerShell apply commands in chat;
- use git add -N for new files before diff capture;
- copy diff with git diff -- <paths> | Set-Clipboard;
- request pasted diff before commit.
```

## 5. Do Not

```text
- Do not use patches as primary application mechanism.
- Do not create scripts as primary application mechanism.
- Do not hide apply commands only inside the archive.
- Do not put project-specific state into reusable docs.
- Do not treat Tampermonkey helper or examples as authority.
```
