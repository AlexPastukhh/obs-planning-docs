# SCN-LN-WORKSPACE — Configure And Select Repository Workspace

Status: active current behavior owner
Scope: detailed application behavior and traceability for `UC-LN-WORKSPACE`.

Related Application Use Case: [`UC-LN-WORKSPACE`](../USE-CASE-REGISTRY.md)

**Trigger/input:** the user opens workspace management, creates/edits/deletes a local workspace, stores the shared GitHub credential, or explicitly selects a workspace for the current stable chat.

**Successful result:** Linked Notes has an explicit reusable owner/repository/branch/Notes-folder/Categories-folder context and, when selected for a stable chat, a local chat-to-workspace binding.

**Key behavior:**

- workspace configuration is local application state;
- merely editing/selecting a workspace performs no repository write;
- a stable chat acquires a workspace binding only after explicit selection;
- switching current chat workspace does not silently retarget an already verified Note remote binding;
- credentials remain secret local state and are not repository content or exportable diagnostic plaintext.

**Traceability:**

- **Product / behavior:** [`APP-OVERVIEW.md#3-workspace-model`](../APP-OVERVIEW.md#3-workspace-model), [`DATA-AND-STATE.md#8-identity-separation`](../DATA-AND-STATE.md#8-identity-separation), [`ARCHITECTURE.md#workspacecontext`](../ARCHITECTURE.md#workspacecontext).
- **Focused / repository contract:** no separate repository-content contract; workspace selection/configuration is local application state.
- **Primary implementation:** [`src/workspace-context.js`](../src/workspace-context.js), [`src/workspace-store.js`](../src/workspace-store.js), with application integration in [`src/linked-notes-app.js`](../src/linked-notes-app.js).
- **Automated evidence:** [`tests/workspace-context.test.mjs`](../tests/workspace-context.test.mjs), [`tests/workspace-store.test.mjs`](../tests/workspace-store.test.mjs), workspace integration cases in [`tests/linked-notes-app-policy.test.mjs`](../tests/linked-notes-app-policy.test.mjs).
- **Manual acceptance:** [`PROTOTYPE-CHECKLIST.md#5-workspace-creation-and-shared-token`](../PROTOTYPE-CHECKLIST.md#5-workspace-creation-and-shared-token), [`PROTOTYPE-CHECKLIST.md#6-per-chat-workspace-memory`](../PROTOTYPE-CHECKLIST.md#6-per-chat-workspace-memory), [`PROTOTYPE-CHECKLIST.md#8-workspace-deletion-and-migration`](../PROTOTYPE-CHECKLIST.md#8-workspace-deletion-and-migration), [`PROTOTYPE-CHECKLIST.md#12-secret-and-storage-inspection`](../PROTOTYPE-CHECKLIST.md#12-secret-and-storage-inspection).
