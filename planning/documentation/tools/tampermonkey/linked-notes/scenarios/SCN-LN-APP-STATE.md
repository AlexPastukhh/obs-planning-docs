# SCN-LN-APP-STATE — Export Diagnostic Application State

Status: active current behavior owner
Scope: detailed application behavior and traceability for `UC-LN-APP-STATE`.

Related Application Use Case: [`UC-LN-APP-STATE`](../USE-CASE-REGISTRY.md)

**Trigger/input:** the user opens `App state`, refreshes a snapshot, copies the ChatGPT-oriented projection or copies FULL JSON.

**Successful result:** one versioned diagnostic snapshot captures application-owned GM/IndexedDB/runtime state that is safe to expose, with GitHub credentials redacted and unsupported/non-serializable values represented diagnostically rather than crashing export.

**Boundary:** App State is diagnostic export, not normal Note/File content copy, not repository truth and not a restore/import mechanism in the current slice. Export itself performs no GitHub request or application-state mutation.

**Traceability:**

- **Product / behavior:** [`APP-OVERVIEW.md#10-app-state`](../APP-OVERVIEW.md#10-app-state), [`FULL-APP-STATE-EXPORT.md`](../FULL-APP-STATE-EXPORT.md), [`DATA-AND-STATE.md#9-full-app-state-export`](../DATA-AND-STATE.md#9-full-app-state-export), [`ARCHITECTURE.md#full-app-state`](../ARCHITECTURE.md#full-app-state).
- **Focused / repository contract:** none; this is a local diagnostic projection, not repository content or a restore contract. Current copy limitations are tracked in [`KNOWN-ISSUES.md`](../KNOWN-ISSUES.md).
- **Primary implementation:** [`src/full-app-state-export.js`](../src/full-app-state-export.js), [`src/full-app-state-runtime.js`](../src/full-app-state-runtime.js).
- **Automated evidence:** [`tests/full-app-state-export.test.mjs`](../tests/full-app-state-export.test.mjs), [`tests/full-app-state-runtime.test.mjs`](../tests/full-app-state-runtime.test.mjs).
- **Manual acceptance:** user-flow/security expectations in [`FULL-APP-STATE-EXPORT.md#user-flow`](../FULL-APP-STATE-EXPORT.md#user-flow) and [`FULL-APP-STATE-EXPORT.md#security-boundary`](../FULL-APP-STATE-EXPORT.md#security-boundary); browser acceptance remains pending where stated by the registry.

## 15. Supporting Capabilities That Do Not Get Separate UC IDs

| Capability | Parent Use Case(s) | Why it is supporting rather than separate |
|---|---|---|
| Repository templates | `UC-LN-FILES` | seeds the normal New File flow; selection alone has no independent durable result |
| `Locations` / folder shortcuts / direct path open | `UC-LN-FILES` | navigation to another working target |
| whole-file / heading-link copy | `UC-LN-FILES` | bounded copy/navigation aid |
| Files stale badges | `UC-LN-REFERENCE-OBJECTS`, `UC-LN-FILES` | diagnostic projection of checked reference state |
| common pending queue | `UC-LN-FILES`, `UC-LN-CATEGORIES`, `UC-LN-REFERENCE-OBJECTS`, `UC-LN-ORDERED-REFERENCE-LISTS`, `UC-LN-PUBLISH` | persistence/integration mechanism, not a user outcome by itself |
| safe rich Markdown renderer | Notes / Files / Reader | shared rendering infrastructure |
| panel center/drag/edge-peek and shared top-popup behavior | all panel surfaces | UI accessibility/ergonomics infrastructure |
| activity/progress/cancel for bounded reads | repository-reading UCs | operation lifecycle support |

## 16. Current Gaps And Future Semantics

Future priorities live in [`ROADMAP.md`](../ROADMAP.md) and observed gaps in [`KNOWN-ISSUES.md`](../KNOWN-ISSUES.md).

A roadmap item is not automatically a new Use Case. When an implemented capability creates a new independently useful trigger-to-result lifecycle, update this map and [`USE-CASE-REGISTRY.md`](../USE-CASE-REGISTRY.md) in the same reviewed change.

Current high-priority gaps include:

- supported explicit ChatGPT-to-Linked-Notes response handoff;
- coherent normal Note/File content and Chat-context copy, separate from diagnostic App State;
- real-GitHub/browser reliability acceptance across all write entrypoints.

## 17. Legacy Documentation Boundary

Earlier Linked Notes planning/workflow files remain under `planning/areas/documentation-workbench/` for history and compatibility. They are not the current entry/owner route after this migration.

Old `UC-DW-*` Linked Notes IDs are compatibility aliases only. Their mapping to current IDs is recorded in [`USE-CASE-REGISTRY.md`](../USE-CASE-REGISTRY.md).
