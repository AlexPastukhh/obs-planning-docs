# OBS Linked Notes Known Issues

Status: active implementation issue register
Scope: current observed gaps/fragilities that should survive chat/context turnover. This file records problem state and evidence needs; it does not silently choose the implementation solution.

## Issue Record Rules

Each issue should keep:

```text
ID
Status
Priority
Observed / confirmed
Expected / desired direction
Evidence still needed
Likely owner/subsystem
Next investigation
Resolution evidence
```

Only checked facts or explicit user reports belong under `Observed / confirmed`. Hypotheses belong under investigation/notes.

## CHAT-001 — ChatGPT message acquisition depends on rendered DOM

**Status:** active architectural fragility
**Priority:** high

### Observed / confirmed

Current `Open in Reader` derives Markdown from the rendered assistant-message DOM and labels that result `derived`. Exact pasted Markdown remains the stable fallback. No private ChatGPT API is part of the current contract.

### Risk

ChatGPT DOM is external and may change independently of this repository. DOM-to-Markdown derivation can also differ from the original model/source representation even when extraction succeeds.

### Desired direction

Decouple Reader from the ChatGPT acquisition mechanism through a message-source abstraction and evaluate more reliable source acquisition before expanding the DOM parser further.

### Evidence still needed

- whether the ChatGPT UI's own Copy-response path exposes a stable, safely usable content source;
- what data/format can be obtained without private/internal API dependence;
- failure/accuracy comparison between candidate sources and current semantic DOM derivation.

### Likely subsystem

`src/chat-response-reader.js`, `src/chat-response-reader-runtime.js` and a future source-adapter layer.

### Next investigation

See Direction 1 in [`linked-notes-prototype-roadmap.md`](../../../../areas/documentation-workbench/linked-notes-prototype-roadmap.md).

## COPY-001 — No coherent user-facing Note/File content/context export

**Status:** missing capability
**Priority:** high

### Observed / confirmed

The application currently has several unrelated clipboard/export actions:

- Reader `Copy Markdown`;
- repository heading/file-link copy actions;
- Reference Object marker/value actions;
- Full App State diagnostic JSON export.

Full App State is a diagnostic state snapshot, not a normal user-facing copy of one Note/file or a curated multi-document chat handoff.

### Desired direction

Provide consistent content copy for Notes and Files, including a Chat-context projection that carries the literal content plus enough repository/identity metadata to be useful in another chat.

### Evidence still needed

- exact first-slice output formats;
- content-size bounds and behavior for large files/Notes;
- whether selection/multi-document `Context Basket` is justified after single-item copy is proven useful.

### Likely subsystem

Notes/File UI actions plus new pure formatting/projection helpers. Do not implement this by repurposing Full App State.

### Next investigation

See Direction 2 in the roadmap.

## GITHUB-001 — GitHub save reliability problems require systematic investigation

**Status:** active investigation required
**Priority:** high

### Observed / confirmed

The user reports problems when saving to GitHub.

Existing documented write workflows already require important safety mechanisms such as explicit write triggers, path validation, target absence/SHA protection where relevant and read-back verification. The exact failing save scenario(s) are not yet documented here.

### Unknown / do not assume

The repository evidence checked for this documentation reset does **not** establish whether the reported failures are caused by:

- the GitHub Contents API itself;
- stale SHA/base handling;
- feature-specific orchestration;
- local-state transitions after partial/unknown writes;
- category/image/Reference Object multi-step sequencing;
- permissions/token scope;
- network behavior;
- UI feedback/retry behavior;
- another cause.

### Evidence required for each reproduced failure

```text
operation type
workspace/repository/branch
selected target path(s)
phase at failure
expected absence/SHA/base
intended bytes/hash when available
HTTP/result/error classification
which writes completed and verified
read-back result
local state after failure
retry/recovery action taken
```

Never include the raw GitHub credential.

### Desired direction

Audit every repository write entrypoint and derive one common operation/failure vocabulary before selecting a unified write engine or changing GitHub APIs.

### Likely subsystems

`src/github-contents-client.js` plus feature-specific orchestration in Notes, Files, Categories, assets/transfer and Reference Objects.

### Next investigation

See Direction 3 in the roadmap.

## DOC-001 — Documentation was fragmented across feature history and large entry files

**Status:** addressed by documentation reset; monitor for regression
**Priority:** medium

### Observed / confirmed

Before this documentation reset, the main Linked Notes README mixed current behavior, storage, module mapping, setup and version history, while project-local navigation also contained stale prototype-version labels.

### Desired state

Current-state entry docs should remain short and route into dedicated current product, architecture, data/state, known-issue and roadmap owners. Changelog/history must not become current-state authority.

### Regression check

When adding a feature, update the smallest current owner and navigation links rather than appending another large feature-history block to `README.md`.
