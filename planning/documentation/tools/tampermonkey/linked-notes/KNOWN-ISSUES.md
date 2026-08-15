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

## CHAT-001 — No accepted explicit ChatGPT-to-Linked-Notes response handoff

**Status:** active integration gap
**Priority:** high

### Observed / confirmed

- Reader safe Markdown rendering is implemented, including the supported narrow `<details>/<summary>` form.
- Manual Paste Markdown is the current reliable explicit exact-source transfer into Reader.
- Current `Open in Reader` derives Markdown from the rendered assistant-message DOM and labels that result `derived`; it is existing prototype implementation evidence.
- The project does not select programmatic extraction from the ChatGPT page/UI, including programmatic activation of UI Copy as an extraction mechanism, as the target transport architecture.
- A supported automatic handoff in which ChatGPT/integration supplies the response content to Linked Notes is not implemented yet.

### Risk

The current DOM-derived path depends on an external page representation, cannot claim original-source fidelity and is not a suitable long-term contract for automatic response transfer.

### Desired direction

Separate Reader rendering from response transport. Keep manual Paste as the reliable exact fallback while investigating an explicit supported integration boundary that supplies response content without Linked Notes scraping it from the ChatGPT UI.

### Evidence still needed

- which supported integration mechanism can provide the required explicit handoff;
- what content representation/fidelity that mechanism can supply;
- user-action/confirmation and local-delivery boundaries;
- failure/retry semantics when the handoff cannot be completed.

The concrete mechanism may involve an app/plugin/action/MCP/API or another supported integration, but no option is selected by this issue record.

### Likely subsystem

`src/chat-response-reader.js`, `src/chat-response-reader-runtime.js` and a future transport/source-adapter boundary.

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

**Status:** common local-first/current/all publication implementation complete; real-GitHub acceptance still required
**Priority:** high

### Observed / confirmed

The user reports problems when saving to GitHub.

The `0.8.0-prototype` now routes ordinary Files, structure/copy, Categories and Reference Object/Ordered List changes through one local pending-file queue. It exposes a one-path Contents/read-back action and an all-path Git Data action using blobs/tree/commit, one non-force ref update and tree verification. Automated transport tests cover changed-base blocking and prove there is no sequential Contents fallback.

The exact originally reported real-GitHub failure scenario(s) and browser acceptance evidence are still not documented here.

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

### Implemented direction and remaining evidence

Run the browser/real-GitHub matrix for both scopes, including permissions, branch races, network-unknown ref updates, large/mixed text-binary pending sets and post-publication refresh. Compound Note/image/transfer writes retain their established workflow and still require separate reliability evidence.

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

Keep two explicit documentation routes:

- developer/implementation chats enter through the application README and dedicated product/architecture/data/issues/roadmap owners;
- repository-working/application-context chats enter through `.linked-notes/AGENT-GUIDE.md` and read only the agent-facing contracts that affect content authoring.

Changelog/history must not become current-state authority.

### Regression check

When adding a feature, update the smallest current owner rather than appending another large feature-history block to `README.md`. Add the feature to `AGENT-GUIDE.md` only when it changes how a content-working AI/chat should author repository content or a Reader-targeted response.
