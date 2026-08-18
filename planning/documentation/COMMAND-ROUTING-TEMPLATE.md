# Command Routing Template

Status: active reusable template
Scope: recommended project root command-routing file shape.

```markdown
# <Project> Command Routing

Status: active project command-system router

## Authority
- `command-routing.md` → shared command policy
- `commands/*.command.md` → concrete commands
- Direction/Use-Case Registries → semantic capabilities
- workflows/templates/current owners → complete meaning

## Resolution
1. resolve direct command definition;
2. read owner files;
3. keep permission boundary;
4. use related Use Case for semantic context only.

## Shared Rules
<only cross-command rules that genuinely apply to several commands>
```

Do not place a semantic Use-Case catalogue in this file.
