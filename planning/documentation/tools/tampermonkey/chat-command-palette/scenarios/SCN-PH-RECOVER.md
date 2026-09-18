# SCN-PH-RECOVER — Recover GitHub-Backed Local Catalog State

Status: active current behavior owner
Scope: canonical detailed application behavior owner for restoring durable repository-backed Helper state after local loss/drift or when repository state should become the local baseline again.

**Trigger/input:** explicit `Hard Reload GitHub`; or pasted complete repository marker evidence when direct GitHub recovery is unavailable.

**Successful result — Hard Reload:**

```text
current GitHub planning/commands/*.command.md
+ current seed/use-cases.json
+ current seed/semantic-components.json
+ current seed/scenarios.json
+ current catalog-order.json (order + presentation groups)
→ validate
→ replace local direct-command + semantic + scenario projections and local order/groups
→ remove local/legacy command rows absent from GitHub authority
→ restore locally hidden repository-backed catalog rows
→ prune Favorite IDs that no longer resolve
→ preserve local Prompt content
```

The UI confirms before replacement because unsaved local direct Command drafts and legacy/local command rows absent from GitHub are intentionally discarded. Prompt-library content remains separate and is preserved.

**Boundary:** Hard Reload is explicit and performs repository reads only after confirmation. It does not mutate GitHub, does not overwrite local Prompt content and does not imply commit/push. Generated use-case/semantic/scenario seeds are build-verified repository projections; canonical meaning remains in current methodology/repository owners.

**Traceability:**

- **Product / behavior:** [`README.md#hard-reload-github`](../README.md#hard-reload-github), [`README.md#source--cache-model`](../README.md#source--cache-model).
- **Primary implementation:** [`src/repository-catalog-service.js`](../src/repository-catalog-service.js), [`src/repository-command-service.js`](../src/repository-command-service.js), [`src/chat-recovery.js`](../src/chat-recovery.js), [`src/planning-helper-runtime.js`](../src/planning-helper-runtime.js), [`src/planning-helper-state.js`](../src/planning-helper-state.js), [`src/planning-helper-ui.js`](../src/planning-helper-ui.js).
- **Automated evidence:** [`tests/planning-helper-runtime.test.mjs`](../tests/planning-helper-runtime.test.mjs), [`tests/planning-helper-state.test.mjs`](../tests/planning-helper-state.test.mjs), [`tests/chat-recovery.test.mjs`](../tests/chat-recovery.test.mjs), [`tests/semantic-navigation.test.mjs`](../tests/semantic-navigation.test.mjs).
- **Manual acceptance:** [`MANUAL-ACCEPTANCE.md#scn-ph-recover`](../MANUAL-ACCEPTANCE.md#scn-ph-recover).
