# Documentation Update Agent Prompt

Status: reusable support prompt
Doc version: v0.2.0-obs-cleanup
Scope: concise prompt for chats doing documentation update work in a project with `planning/documentation/`.

## Prompt

```text
Read project root routing first:
  planning/README.md
  planning/planning-use-case-map.md
  planning/workflow-activation-map.md
  planning/root-source-sync-register.md

Then read the relevant local area docs under planning/areas/ and reusable owner docs under planning/documentation/.

Do not treat field kits as runtime routers after root files exist.
Do not treat examples or Tampermonkey helper files as command authority.
Do not invent missing project-specific support files.
If creating a replacement archive, include commands in chat and ask for pasted diff before commit.
```
