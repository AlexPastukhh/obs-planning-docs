# Repository Use-Case Registry

Status: active project-specific functional registry
Scope: repository-specific operational capabilities that are not owned more narrowly by Session, Documentation, IDTSPE/SDS, or another specialized methodology/area.

Groups are navigation only. Compact `Situation` / `Result` summaries below are routing metadata so a chat can scan applicability without opening every owner. Detailed `Situation`, `Result`, and `Process` meaning lives in each Use-Case owner.

Runtime rule:

```text
repository-specific operational request
→ scan this registry
→ select zero or more plausible UC-REPO-* capabilities from Situation/Result
→ open only selected owners
→ follow their Process / supporting owners
```

A scan does not execute a Use Case. Reuse current registry metadata while trustworthy; reread only when the repository route may have changed or the applicable capability is uncertain.

## Repository Update / Delivery / Maintenance

| ID | Use Case | Situation summary | Result summary | Owner |
|---|---|---|---|---|
| `UC-REPO-PLAN-UPDATE` | Plan Repository Update | selected semantic meaning needs a concrete repository/file transition before mutation, or an explicit Pre-Update is useful | concrete update plan with affected owners/paths, operations, ordering, preservation boundaries and verification | [`use-cases/UC-REPO-PLAN-UPDATE.md`](use-cases/UC-REPO-PLAN-UPDATE.md) |
| `UC-REPO-BUILD-REPLACEMENT-PACKAGE` | Build Replacement Package | an intended transition is resolved enough to transport and exact touched base state is available | protocol-valid Replacement Package ZIP with correct identities, payloads and handoff | [`use-cases/UC-REPO-BUILD-REPLACEMENT-PACKAGE.md`](use-cases/UC-REPO-BUILD-REPLACEMENT-PACKAGE.md) |
| `UC-REPO-REVIEW-DIFF` | Review Repository ReviewDiff | a ReviewDiff for a proposed/applied repository transition is selected for semantic review | grounded `APPROVABLE` / `NEEDS CORRECTION` / `BLOCKED BY MATERIAL DECISION` verdict with material findings | [`use-cases/UC-REPO-REVIEW-DIFF.md`](use-cases/UC-REPO-REVIEW-DIFF.md) |
| `UC-REPO-MAINTAIN-PLANNING-COMMAND` | Maintain Planning Command | a stable executable Planning Command is useful, or an existing trigger/route/output/presentation/permission boundary is stale | valid direct `planning/commands/*.command.md` route to current semantic/supporting owners without command-owned semantics | [`use-cases/UC-REPO-MAINTAIN-PLANNING-COMMAND.md`](use-cases/UC-REPO-MAINTAIN-PLANNING-COMMAND.md) |
| `UC-REPO-MAINTAIN-PROMPT` | Maintain Reusable Prompt | reusable insertion text would improve repeated AI interaction, or an existing prompt is stale/duplicative/misrouted | concise reusable prompt that defers semantics and permission to current owners/routes | [`use-cases/UC-REPO-MAINTAIN-PROMPT.md`](use-cases/UC-REPO-MAINTAIN-PROMPT.md) |

Session ambient interaction rules are established through [`session/README.md`](session/README.md); Session currently owns no methodology-use UC family. Generic Documentation capabilities are discovered through [`documentation/`](documentation/) and its scoped registry. IDTSPE/SDS and other specialized areas own their own current semantic navigation and are not aggregated here.

The exact pre-fundamental repository registry remains at [`legacy/use-case-registry.pre-fundamental-uc.md`](legacy/use-case-registry.pre-fundamental-uc.md) as provenance only.
