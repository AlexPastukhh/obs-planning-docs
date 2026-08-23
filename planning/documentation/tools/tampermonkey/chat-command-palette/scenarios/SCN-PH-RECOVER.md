# SCN-PH-RECOVER — Recover GitHub-Backed Local Catalog State

Status: active current behavior owner
Scope: canonical detailed application behavior owner for restoring durable repository-backed Helper state after local loss/drift or when repository state should become the local baseline again.

**Trigger/input:** explicit `Hard Reload GitHub`; or pasted complete repository marker evidence when direct GitHub recovery is unavailable.

**Successful result — Hard Reload:**

```text
current GitHub planning/commands/*.command.md
+ current seed/directions.json
+ current seed/use-cases.json
+ current catalog-order.json
→ validate
→ replace local Direction + Command + Use-Case catalogs and local order
→ restore locally hidden repository catalog rows
→ preserve local Prompt content and Favorites
```

The UI confirms before replacement because unsaved local Command drafts are intentionally discarded.

**Boundary:** Hard Reload is explicit and performs repository reads only after confirmation. It does not mutate GitHub, does not overwrite local Prompt content and does not imply commit/push. Generated direction/use-case seeds are build-verified repository projections; canonical semantic meaning remains in registries.

**Traceability:**

- **Product / behavior:** [`README.md#hard-reload-github`](../README.md#hard-reload-github), [`README.md#source--cache-model`](../README.md#source--cache-model).
- **Primary implementation:** [`src/repository-catalog-service.js`](../src/repository-catalog-service.js), [`src/repository-command-service.js`](../src/repository-command-service.js), [`src/chat-recovery.js`](../src/chat-recovery.js), [`src/planning-helper-runtime.js`](../src/planning-helper-runtime.js), [`src/planning-helper-state.js`](../src/planning-helper-state.js), [`src/planning-helper-ui.js`](../src/planning-helper-ui.js).
- **Automated evidence:** [`tests/planning-helper-runtime.test.mjs`](../tests/planning-helper-runtime.test.mjs), [`tests/planning-helper-state.test.mjs`](../tests/planning-helper-state.test.mjs), [`tests/chat-recovery.test.mjs`](../tests/chat-recovery.test.mjs), [`tests/semantic-navigation.test.mjs`](../tests/semantic-navigation.test.mjs).
- **Manual acceptance:** [`MANUAL-ACCEPTANCE.md#scn-ph-recover`](../MANUAL-ACCEPTANCE.md#scn-ph-recover).
