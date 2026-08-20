# SCN-LN-APP-STATE — Export Diagnostic Application State

Status: active current behavior owner
Scope: canonical detailed application behavior owner; this Scenario owns its trigger/context/behavior/result/boundaries and traceability.

**Trigger/input:** the user opens `App state`, refreshes a snapshot, copies the ChatGPT-oriented projection or copies FULL JSON.

**Successful result:** one versioned diagnostic snapshot captures application-owned GM/IndexedDB/runtime state that is safe to expose, with GitHub credentials redacted and unsupported/non-serializable values represented diagnostically rather than crashing export.

**Boundary:** App State is diagnostic export, not normal Note/File content copy, not repository truth and not a restore/import mechanism in the current slice. Export itself performs no GitHub request or application-state mutation.

**Traceability:**

- **Product / behavior:** [`APP-OVERVIEW.md#10-app-state`](../APP-OVERVIEW.md#10-app-state), [`FULL-APP-STATE-EXPORT.md`](../FULL-APP-STATE-EXPORT.md), [`DATA-AND-STATE.md#9-full-app-state-export`](../DATA-AND-STATE.md#9-full-app-state-export), [`ARCHITECTURE.md#full-app-state`](../ARCHITECTURE.md#full-app-state).
- **Focused / repository contract:** none; this is a local diagnostic projection, not repository content or a restore contract. Current copy limitations are tracked in [`KNOWN-ISSUES.md`](../KNOWN-ISSUES.md).
- **Primary implementation:** [`src/full-app-state-export.js`](../src/full-app-state-export.js), [`src/full-app-state-runtime.js`](../src/full-app-state-runtime.js).
- **Automated evidence:** [`tests/full-app-state-export.test.mjs`](../tests/full-app-state-export.test.mjs), [`tests/full-app-state-runtime.test.mjs`](../tests/full-app-state-runtime.test.mjs).
- **Manual acceptance:** user-flow/security expectations in [`FULL-APP-STATE-EXPORT.md#user-flow`](../FULL-APP-STATE-EXPORT.md#user-flow) and [`FULL-APP-STATE-EXPORT.md#security-boundary`](../FULL-APP-STATE-EXPORT.md#security-boundary); browser acceptance remains pending where stated by current owners.

